import 'server-only'
import { db } from './schema'

const WINDOW = '15 minutes'
const MAX_PER_EMAIL = 5
const MAX_PER_IP = 20

/** Counts recent failures; blocks further attempts (even with the right password) until the window passes. */
export async function isLocked(email: string, ip: string): Promise<boolean> {
  const { query } = await db()
  const [byEmail] = await query<{ n: string }>(`SELECT count(*) AS n FROM login_attempts WHERE email = $1 AND success = false AND at > now() - interval '${WINDOW}'`, [email])
  const [byIp] = await query<{ n: string }>(`SELECT count(*) AS n FROM login_attempts WHERE ip = $1 AND success = false AND at > now() - interval '${WINDOW}'`, [ip])
  return Number(byEmail.n) >= MAX_PER_EMAIL || Number(byIp.n) >= MAX_PER_IP
}

export async function recordAttempt(email: string, ip: string, success: boolean) {
  const { query } = await db()
  await query(`INSERT INTO login_attempts (email, ip, success) VALUES ($1, $2, $3)`, [email, ip, success])
  if (success) await query(`DELETE FROM login_attempts WHERE email = $1 AND success = false`, [email])
  await query(`DELETE FROM login_attempts WHERE at < now() - interval '2 days'`)
}
