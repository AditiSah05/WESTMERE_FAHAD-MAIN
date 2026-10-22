import 'server-only'
import { createHash, randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { db } from './schema'

const PROD = process.env.NODE_ENV === 'production'
export const CHALLENGE_COOKIE = PROD ? '__Host-wm_admin_2fa' : 'wm_admin_2fa'
const CHALLENGE_MS = 5 * 60 * 1000
export const MAX_CHALLENGE_TRIES = 5

const sha = (s: string) => createHash('sha256').update(s).digest('hex')

/** Password was correct but a second factor is needed: a short-lived, single-purpose token, not a session. */
export async function startChallenge(userId: string) {
  const token = randomBytes(32).toString('base64url')
  const { query } = await db()
  await query(`DELETE FROM admin_challenges WHERE user_id = $1 OR expires_at < now()`, [userId])
  await query(`INSERT INTO admin_challenges (user_id, token_hash, expires_at) VALUES ($1, $2, now() + $3 * interval '1 millisecond')`, [userId, sha(token), CHALLENGE_MS])
  ;(await cookies()).set(CHALLENGE_COOKIE, token, { httpOnly: true, secure: PROD, sameSite: 'strict', path: '/', maxAge: CHALLENGE_MS / 1000 })
}

export const hasChallengeCookie = async () => !!(await cookies()).get(CHALLENGE_COOKIE)?.value

/** Counts this attempt atomically and returns the user it belongs to, or null (missing, expired, or out of tries). */
export async function useChallengeAttempt(): Promise<string | null> {
  const token = (await cookies()).get(CHALLENGE_COOKIE)?.value
  if (!token || token.length > 100) return null
  const { query } = await db()
  const [row] = await query<{ user_id: string }>(
    `UPDATE admin_challenges SET attempts = attempts + 1 WHERE token_hash = $1 AND expires_at > now() AND attempts < $2 RETURNING user_id`,
    [sha(token), MAX_CHALLENGE_TRIES],
  )
  return row?.user_id ?? null
}

export async function endChallenge() {
  const jar = await cookies()
  const token = jar.get(CHALLENGE_COOKIE)?.value
  if (token) {
    const { query } = await db()
    await query(`DELETE FROM admin_challenges WHERE token_hash = $1`, [sha(token)])
  }
  jar.delete(CHALLENGE_COOKIE)
}

const normalise = (c: string) => c.replace(/[\s-]/g, '').toUpperCase()

/** Ten readable one-time recovery codes; only hashes are stored. Replaces any existing set. */
export async function issueRecoveryCodes(userId: string): Promise<string[]> {
  const { tx } = await db()
  const codes = Array.from({ length: 10 }, () => {
    const raw = randomBytes(6).toString('hex').toUpperCase()
    return `${raw.slice(0, 6)}-${raw.slice(6)}`
  })
  await tx(async (q) => {
    await q(`DELETE FROM admin_recovery_codes WHERE user_id = $1`, [userId])
    for (const c of codes) await q(`INSERT INTO admin_recovery_codes (user_id, code_hash) VALUES ($1, $2)`, [userId, sha(normalise(c))])
  })
  return codes
}

/** Consumes a recovery code if it exists and is unused. */
export async function consumeRecoveryCode(userId: string, input: string): Promise<boolean> {
  const { query } = await db()
  const rows = await query(`UPDATE admin_recovery_codes SET used_at = now() WHERE user_id = $1 AND code_hash = $2 AND used_at IS NULL RETURNING id`, [userId, sha(normalise(input))])
  return rows.length > 0
}

export async function remainingRecoveryCodes(userId: string): Promise<number> {
  const { query } = await db()
  const [r] = await query<{ n: string }>(`SELECT count(*) AS n FROM admin_recovery_codes WHERE user_id = $1 AND used_at IS NULL`, [userId])
  return Number(r.n)
}
