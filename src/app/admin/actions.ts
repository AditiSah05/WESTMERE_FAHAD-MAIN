'use server'

import { redirect } from 'next/navigation'
import { assertAdmin } from '@/lib/server/auth'
import { fakeVerify, hashPassword, passwordProblem, verifyPassword } from '@/lib/server/password'
import { db } from '@/lib/server/schema'
import { audit, clientInfo, createSession, destroySession, revokeOtherSessions } from '@/lib/server/session'
import { isLocked, recordAttempt } from '@/lib/server/throttle'

export type FormState = { error?: string; ok?: string } | undefined

const GENERIC = 'Invalid email or password.'
const text = (v: FormDataEntryValue | null, max: number) => (typeof v === 'string' && v.length <= max ? v : '')

export async function login(_prev: FormState, form: FormData): Promise<FormState> {
  const email = text(form.get('email'), 254).trim().toLowerCase()
  const password = text(form.get('password'), 256)
  if (!email || !password) return { error: GENERIC }

  const { ip } = await clientInfo()
  if (await isLocked(email, ip)) {
    await fakeVerify(password)
    return { error: 'Too many failed attempts. Try again in 15 minutes.' }
  }

  const { query } = await db()
  const [user] = await query<{ id: string; password_hash: string }>(`SELECT id, password_hash FROM admin_users WHERE email = $1`, [email])
  const valid = user ? await verifyPassword(password, user.password_hash) : (await fakeVerify(password), false)

  await recordAttempt(email, ip, valid)
  if (!valid || !user) return { error: GENERIC }

  await createSession(user.id)
  await audit(user.id, 'login')
  redirect('/admin')
}

export async function logout() {
  const admin = await assertAdmin().catch(() => null)
  await destroySession()
  if (admin) await audit(admin.userId, 'logout')
  redirect('/admin/login')
}

export async function changePassword(_prev: FormState, form: FormData): Promise<FormState> {
  const admin = await assertAdmin()
  const current = text(form.get('current'), 256)
  const next = text(form.get('next'), 256)
  const confirm = text(form.get('confirm'), 256)

  if (!current) return { error: 'Enter your current password.' }
  const problem = passwordProblem(next, admin.email)
  if (problem) return { error: problem }
  if (next !== confirm) return { error: 'New passwords do not match.' }
  if (next === current) return { error: 'New password must differ from the current one.' }

  const { query } = await db()
  const [user] = await query<{ password_hash: string }>(`SELECT password_hash FROM admin_users WHERE id = $1`, [admin.userId])
  if (!user || !(await verifyPassword(current, user.password_hash))) {
    await audit(admin.userId, 'password_change_failed')
    return { error: 'Current password is incorrect.' }
  }

  await query(`UPDATE admin_users SET password_hash = $1, password_changed_at = now() WHERE id = $2`, [await hashPassword(next), admin.userId])
  await revokeOtherSessions(admin.userId, admin.sessionId)
  await audit(admin.userId, 'password_changed', 'other sessions revoked')
  return { ok: 'Password updated. You were kept signed in here; all other sessions were signed out.' }
}
