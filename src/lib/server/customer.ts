import 'server-only'
import { createHash, randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { db } from './schema'

const PROD = process.env.NODE_ENV === 'production'
export const CUSTOMER_COOKIE = PROD ? '__Host-wm_customer' : 'wm_customer'
const ABSOLUTE_MS = 30 * 24 * 60 * 60 * 1000
const IDLE_MS = 7 * 24 * 60 * 60 * 1000

const sha = (s: string) => createHash('sha256').update(s).digest('hex')

export type Customer = { userId: string; email: string; name: string; sessionId: string }

export async function createCustomerSession(userId: string) {
  const token = randomBytes(32).toString('base64url')
  const { query } = await db()
  await query(`INSERT INTO shop_sessions (user_id, token_hash, expires_at) VALUES ($1, $2, now() + $3 * interval '1 millisecond')`, [userId, sha(token), ABSOLUTE_MS])
  ;(await cookies()).set(CUSTOMER_COOKIE, token, { httpOnly: true, secure: PROD, sameSite: 'lax', path: '/', maxAge: ABSOLUTE_MS / 1000 })
}

/** Validates the cookie against the database on every call (cached per request). */
export const getCustomer = cache(async (): Promise<Customer | null> => {
  const token = (await cookies()).get(CUSTOMER_COOKIE)?.value
  if (!token || token.length > 100) return null
  const { query } = await db()
  const [row] = await query<{ id: string; user_id: string; email: string; name: string }>(
    `SELECT s.id, s.user_id, u.email, u.name FROM shop_sessions s JOIN shop_users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > now() AND s.last_seen_at > now() - $2 * interval '1 millisecond' AND u.status = 'active'`,
    [sha(token), IDLE_MS],
  )
  if (!row) return null
  await query(`UPDATE shop_sessions SET last_seen_at = now() WHERE id = $1 AND last_seen_at < now() - interval '1 minute'`, [row.id])
  return { userId: row.user_id, email: row.email, name: row.name, sessionId: row.id }
})

export async function requireCustomer(): Promise<Customer> {
  const c = await getCustomer()
  if (!c) redirect('/account/login')
  return c
}

export async function destroyCustomerSession() {
  const jar = await cookies()
  const token = jar.get(CUSTOMER_COOKIE)?.value
  if (token) await (await db()).query(`DELETE FROM shop_sessions WHERE token_hash = $1`, [sha(token)])
  jar.delete(CUSTOMER_COOKIE)
}
