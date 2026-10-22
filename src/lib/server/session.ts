import 'server-only'
import { createHash, randomBytes } from 'node:crypto'
import { cookies, headers } from 'next/headers'
import { cache } from 'react'
import { db } from './schema'

const PROD = process.env.NODE_ENV === 'production'
/** `__Host-` pins the cookie to this exact host over HTTPS (no Domain, Path=/). Plain name on http://localhost. */
export const COOKIE = PROD ? '__Host-wm_admin' : 'wm_admin'

const ABSOLUTE_MS = 12 * 60 * 60 * 1000
const IDLE_MS = 2 * 60 * 60 * 1000

const sha = (s: string) => createHash('sha256').update(s).digest('hex')

export async function clientInfo() {
  const h = await headers()
  const ip = (h.get('x-forwarded-for')?.split(',')[0] ?? h.get('x-real-ip') ?? 'unknown').trim().slice(0, 64)
  return { ip, ua: (h.get('user-agent') ?? '').slice(0, 200) }
}

/** New opaque session. Only the SHA-256 of the token is stored, so a DB leak cannot be replayed. */
export async function createSession(userId: string) {
  const token = randomBytes(32).toString('base64url')
  const { ip, ua } = await clientInfo()
  const { query } = await db()
  await query(`INSERT INTO admin_sessions (user_id, token_hash, expires_at, ip, user_agent) VALUES ($1, $2, now() + $3 * interval '1 millisecond', $4, $5)`, [userId, sha(token), ABSOLUTE_MS, ip, ua])
  ;(await cookies()).set(COOKIE, token, { httpOnly: true, secure: PROD, sameSite: 'strict', path: '/', maxAge: ABSOLUTE_MS / 1000 })
}

export type Admin = { userId: string; email: string; sessionId: string }

/** Validates the cookie against the database on every call (cached per request). */
export const getAdmin = cache(async (): Promise<Admin | null> => {
  const token = (await cookies()).get(COOKIE)?.value
  if (!token || token.length > 100) return null
  const { query } = await db()
  const rows = await query<{ id: string; user_id: string; email: string; last_seen_at: Date }>(
    `SELECT s.id, s.user_id, u.email, s.last_seen_at FROM admin_sessions s JOIN admin_users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > now() AND s.last_seen_at > now() - $2 * interval '1 millisecond'`,
    [sha(token), IDLE_MS],
  )
  const row = rows[0]
  if (!row) return null
  if (Date.now() - new Date(row.last_seen_at).getTime() > 60_000) await query(`UPDATE admin_sessions SET last_seen_at = now() WHERE id = $1`, [row.id])
  return { userId: row.user_id, email: row.email, sessionId: row.id }
})

export async function destroySession() {
  const jar = await cookies()
  const token = jar.get(COOKIE)?.value
  if (token) {
    const { query } = await db()
    await query(`DELETE FROM admin_sessions WHERE token_hash = $1`, [sha(token)])
  }
  jar.delete(COOKIE)
}

export async function revokeOtherSessions(userId: string, keepId: string) {
  const { query } = await db()
  await query(`DELETE FROM admin_sessions WHERE user_id = $1 AND id <> $2`, [userId, keepId])
}

export async function audit(userId: string | null, action: string, detail = '') {
  const { ip } = await clientInfo()
  const { query } = await db()
  await query(`INSERT INTO admin_audit (user_id, action, detail, ip) VALUES ($1, $2, $3, $4)`, [userId, action, detail.slice(0, 300), ip])
}
