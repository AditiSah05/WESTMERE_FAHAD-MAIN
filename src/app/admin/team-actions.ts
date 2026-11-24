'use server'

import { createHash, randomBytes } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { isRole, type Role } from '@/lib/admin/permissions'
import { assertModule } from '@/lib/server/auth'
import { hashPassword, passwordProblem } from '@/lib/server/password'
import { siteConfig } from '@/lib/site'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'

export type TeamState = { error?: string; ok?: string; link?: string } | undefined

const sha = (s: string) => createHash('sha256').update(s).digest('hex')
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/
const INVITE_MS = 72 * 3600 * 1000

async function origin() {
  const h = await headers()
  const host = h.get('host')
  const proto = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  return host ? `${proto}://${host}` : siteConfig.url
}

/** Counts other active owners so the last owner can never be demoted, suspended or removed. */
async function otherActiveOwners(exceptId: string) {
  const { query } = await db()
  const [r] = await query<{ n: string }>(`SELECT count(*) AS n FROM admin_users WHERE role = 'owner' AND status = 'active' AND id <> $1`, [exceptId])
  return Number(r.n)
}

export async function inviteUser(_p: TeamState, form: FormData): Promise<TeamState> {
  const me = await assertModule('team', 'write')
  const email = String(form.get('email') ?? '').trim().toLowerCase()
  const role = form.get('role')
  if (!EMAIL.test(email)) return { error: 'Enter a valid email address.' }
  if (!isRole(role)) return { error: 'Choose a role.' }
  if (role === 'owner' && me.role !== 'owner') return { error: 'Only an owner can invite another owner.' }

  const { query } = await db()
  if ((await query(`SELECT 1 FROM admin_users WHERE email = $1`, [email])).length) return { error: 'That email already has an account.' }

  const token = randomBytes(32).toString('base64url')
  await query(`DELETE FROM admin_invites WHERE email = $1 AND used_at IS NULL`, [email])
  await query(`INSERT INTO admin_invites (email, role, token_hash, created_by, expires_at) VALUES ($1, $2, $3, $4, now() + $5 * interval '1 millisecond')`, [email, role, sha(token), me.userId, INVITE_MS])
  await audit(me.userId, 'invite_created', `${email} as ${role}`)
  revalidatePath('/admin/team')
  return { ok: 'Invitation created. Send this single-use link (valid 72 hours). It is shown only once.', link: `${await origin()}/admin/invite/${token}` }
}

async function mutate(userId: string, apply: (me: Awaited<ReturnType<typeof assertModule>>, target: { role: Role; status: string; email: string }) => Promise<string | void>): Promise<TeamState> {
  const me = await assertModule('team', 'write')
  if (userId === me.userId) return { error: 'You cannot change your own role or status. Ask another owner.' }
  const { query } = await db()
  const [t] = await query<{ role: string; status: string; email: string }>(`SELECT role, status, email FROM admin_users WHERE id = $1`, [userId])
  if (!t || !isRole(t.role)) return { error: 'User not found.' }
  if (t.role === 'owner' && me.role !== 'owner') return { error: 'Only an owner can change an owner.' }
  const error = await apply(me, { role: t.role, status: t.status, email: t.email })
  revalidatePath('/admin/team')
  return error ? { error } : { ok: 'Saved.' }
}

export async function changeRole(userId: string, role: string): Promise<TeamState> {
  if (!isRole(role)) return { error: 'Invalid role.' }
  return mutate(userId, async (me, t) => {
    if (role === 'owner' && me.role !== 'owner') return 'Only an owner can make an owner.'
    if (t.role === 'owner' && role !== 'owner' && (await otherActiveOwners(userId)) === 0) return 'There must be at least one active owner.'
    const { query } = await db()
    await query(`UPDATE admin_users SET role = $1 WHERE id = $2`, [role, userId])
    await query(`DELETE FROM admin_sessions WHERE user_id = $1`, [userId])
    await audit(me.userId, 'role_changed', `${t.email}: ${t.role} -> ${role}`)
  })
}

export async function setUserStatus(userId: string, status: 'active' | 'suspended'): Promise<TeamState> {
  return mutate(userId, async (me, t) => {
    if (status === 'suspended' && t.role === 'owner' && (await otherActiveOwners(userId)) === 0) return 'There must be at least one active owner.'
    const { query } = await db()
    await query(`UPDATE admin_users SET status = $1 WHERE id = $2`, [status, userId])
    if (status === 'suspended') await query(`DELETE FROM admin_sessions WHERE user_id = $1`, [userId])
    await audit(me.userId, status === 'suspended' ? 'user_suspended' : 'user_reactivated', t.email)
  })
}

export async function removeUser(userId: string): Promise<TeamState> {
  return mutate(userId, async (me, t) => {
    if (t.role === 'owner' && (await otherActiveOwners(userId)) === 0) return 'There must be at least one active owner.'
    const { query } = await db()
    await query(`DELETE FROM admin_users WHERE id = $1`, [userId])
    await audit(me.userId, 'user_removed', t.email)
  })
}

export async function revokeInvite(inviteId: string): Promise<TeamState> {
  const me = await assertModule('team', 'write')
  const { query } = await db()
  await query(`DELETE FROM admin_invites WHERE id = $1 AND used_at IS NULL`, [inviteId])
  await audit(me.userId, 'invite_revoked', inviteId)
  revalidatePath('/admin/team')
  return { ok: 'Invitation revoked.' }
}

/** Public (no session yet): consumes a single-use invite token and creates the account. */
export async function acceptInvite(token: string, _p: TeamState, form: FormData): Promise<TeamState> {
  if (!token || token.length > 100) return { error: 'This invitation is not valid.' }
  const name = String(form.get('name') ?? '').trim().slice(0, 80)
  const password = String(form.get('password') ?? '')
  const confirm = String(form.get('confirm') ?? '')
  if (!name) return { error: 'Enter your name.' }

  const { tx } = await db()
  const result = await tx(async (q) => {
    const [inv] = await q<{ id: string; email: string; role: string }>(
      `SELECT id, email, role FROM admin_invites WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now() FOR UPDATE`, [sha(token)])
    if (!inv || !isRole(inv.role)) return { error: 'This invitation is invalid, expired or already used.' } as TeamState
    const problem = passwordProblem(password, inv.email)
    if (problem) return { error: problem } as TeamState
    if (password !== confirm) return { error: 'Passwords do not match.' } as TeamState
    await q(`INSERT INTO admin_users (email, name, role, password_hash) VALUES ($1, $2, $3, $4)`, [inv.email, name, inv.role, await hashPassword(password)])
    await q(`UPDATE admin_invites SET used_at = now() WHERE id = $1`, [inv.id])
    return undefined
  })
  if (result) return result
  await audit(null, 'invite_accepted')
  redirect('/admin/login')
}
