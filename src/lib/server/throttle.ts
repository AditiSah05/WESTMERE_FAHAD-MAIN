import 'server-only'
import { db } from './schema'

const WINDOW = '15 minutes'
const PER_PAIR = 5 // same email from the same IP
const PER_EMAIL = 20 // hard cap across all IPs (an attacker rotating IPs still gets stopped)
const PER_IP = 20 // many emails from one IP (only when the IP is trustworthy)

const failures = async (where: string, params: unknown[]) => {
  const { query } = await db()
  const [row] = await query<{ n: string }>(`SELECT count(*) AS n FROM login_attempts WHERE success = false AND at > now() - interval '${WINDOW}' AND ${where}`, params)
  return Number(row.n)
}

/**
 * Blocks further attempts (even with the right password) once a limit is hit. Locking per (email, IP) pair means a
 * stranger cannot lock the real owner out from a different address; the per-email cap still catches IP rotation.
 */
export async function isLocked(email: string, ip: string | null): Promise<boolean> {
  const [pair, byEmail, byIp] = await Promise.all([
    failures('email = $1 AND ip = $2', [email, ip ?? 'unknown']),
    failures('email = $1', [email]),
    ip ? failures('ip = $1', [ip]) : Promise.resolve(0),
  ])
  return pair >= PER_PAIR || byEmail >= PER_EMAIL || byIp >= PER_IP
}

export async function recordAttempt(email: string, ip: string | null, success: boolean) {
  const { query } = await db()
  await query(`INSERT INTO login_attempts (email, ip, success) VALUES ($1, $2, $3)`, [email, ip ?? 'unknown', success])
  if (success) await query(`DELETE FROM login_attempts WHERE email = $1 AND ip = $2 AND success = false`, [email, ip ?? 'unknown'])
  await query(`DELETE FROM login_attempts WHERE at < now() - interval '2 days'`)
}
