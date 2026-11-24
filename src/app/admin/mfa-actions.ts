'use server'

import { redirect } from 'next/navigation'
import QRCode from 'qrcode'
import { assertAdmin } from '@/lib/server/auth'
import { decrypt, encrypt } from '@/lib/server/crypto'
import { consumeRecoveryCode, endChallenge, issueRecoveryCodes, remainingRecoveryCodes, useChallengeAttempt } from '@/lib/server/mfa'
import { verifyPassword } from '@/lib/server/password'
import { db } from '@/lib/server/schema'
import { audit, createSession, revokeOtherSessions } from '@/lib/server/session'
import { generateSecret, otpauthUri, verifyCode } from '@/lib/server/totp'

export type MfaState = { error?: string; ok?: string; secret?: string; qr?: string; codes?: string[] } | undefined

const str = (v: FormDataEntryValue | null, max = 64) => (typeof v === 'string' && v.length <= max ? v.trim() : '')

/** Step 2 of sign-in: authenticator code or a recovery code. */
export async function verifyLogin(_p: MfaState, form: FormData): Promise<MfaState> {
  const input = str(form.get('code'), 32)
  if (!input) return { error: 'Enter your code.' }
  const userId = await useChallengeAttempt()
  if (!userId) {
    await endChallenge()
    return { error: 'This verification expired or ran out of tries. Sign in again.' }
  }
  const { query } = await db()
  const [u] = await query<{ totp_secret: string | null; totp_last_step: string; status: string }>(`SELECT totp_secret, totp_last_step, status FROM admin_users WHERE id = $1`, [userId])
  if (!u?.totp_secret || u.status !== 'active') return { error: 'Verification failed.' }

  let ok = false
  const step = verifyCode(decrypt(u.totp_secret), input, Number(u.totp_last_step))
  if (step !== null) {
    // Atomic replay guard: the same code (time step) can only be used once.
    ok = (await query(`UPDATE admin_users SET totp_last_step = $1 WHERE id = $2 AND totp_last_step < $1 RETURNING id`, [step, userId])).length > 0
  } else if (/[A-Za-z0-9]{6}-?[A-Za-z0-9]{6}/.test(input)) {
    ok = await consumeRecoveryCode(userId, input)
    if (ok) await audit(userId, 'recovery_code_used', `${await remainingRecoveryCodes(userId)} left`)
  }
  if (!ok) {
    await audit(userId, 'mfa_failed')
    return { error: 'That code is not valid.' }
  }
  await endChallenge()
  await createSession(userId)
  await audit(userId, 'login', '2fa')
  redirect('/admin')
}

export async function beginTotpSetup(): Promise<MfaState> {
  const me = await assertAdmin()
  if (me.totpEnabled) return { error: 'Two-factor authentication is already on.' }
  const secret = generateSecret()
  const { query } = await db()
  await query(`UPDATE admin_users SET totp_secret = $1, totp_enabled = false, totp_last_step = 0 WHERE id = $2`, [encrypt(secret), me.userId])
  const qr = await QRCode.toString(otpauthUri(secret, me.email), { type: 'svg', margin: 1, width: 192 })
  return { secret, qr }
}

export async function confirmTotpSetup(_p: MfaState, form: FormData): Promise<MfaState> {
  const me = await assertAdmin()
  const { query } = await db()
  const [u] = await query<{ totp_secret: string | null; totp_enabled: boolean }>(`SELECT totp_secret, totp_enabled FROM admin_users WHERE id = $1`, [me.userId])
  if (!u?.totp_secret || u.totp_enabled) return { error: 'Start the setup first.' }
  const step = verifyCode(decrypt(u.totp_secret), str(form.get('code'), 12))
  if (step === null) return { error: 'That code is not valid. Check the time on your phone and try again.' }
  await query(`UPDATE admin_users SET totp_enabled = true, totp_last_step = $1 WHERE id = $2`, [step, me.userId])
  const codes = await issueRecoveryCodes(me.userId)
  await revokeOtherSessions(me.userId, me.sessionId)
  await audit(me.userId, 'mfa_enabled')
  return { ok: 'Two-factor authentication is on. Save these recovery codes now; each works once and they will not be shown again.', codes }
}

/** Sensitive changes need the password AND a current code, so a stolen session alone cannot turn 2FA off. */
async function reauth(userId: string, password: string, code: string): Promise<string | null> {
  const { query } = await db()
  const [u] = await query<{ password_hash: string; totp_secret: string | null; totp_last_step: string }>(`SELECT password_hash, totp_secret, totp_last_step FROM admin_users WHERE id = $1`, [userId])
  if (!u?.totp_secret || !(await verifyPassword(password, u.password_hash))) return 'Password or code is incorrect.'
  const step = verifyCode(decrypt(u.totp_secret), code, Number(u.totp_last_step))
  if (step === null) return 'Password or code is incorrect.'
  await query(`UPDATE admin_users SET totp_last_step = $1 WHERE id = $2 AND totp_last_step < $1`, [step, userId])
  return null
}

export async function disableTotp(_p: MfaState, form: FormData): Promise<MfaState> {
  const me = await assertAdmin()
  const error = await reauth(me.userId, str(form.get('password'), 256), str(form.get('code'), 12))
  if (error) return { error }
  const { query } = await db()
  await query(`UPDATE admin_users SET totp_secret = NULL, totp_enabled = false, totp_last_step = 0 WHERE id = $1`, [me.userId])
  await query(`DELETE FROM admin_recovery_codes WHERE user_id = $1`, [me.userId])
  await revokeOtherSessions(me.userId, me.sessionId)
  await audit(me.userId, 'mfa_disabled')
  return { ok: 'Two-factor authentication is off.' }
}

export async function regenerateRecoveryCodes(_p: MfaState, form: FormData): Promise<MfaState> {
  const me = await assertAdmin()
  const error = await reauth(me.userId, str(form.get('password'), 256), str(form.get('code'), 12))
  if (error) return { error }
  const codes = await issueRecoveryCodes(me.userId)
  await audit(me.userId, 'recovery_codes_regenerated')
  return { ok: 'New recovery codes created. The old ones no longer work.', codes }
}

export async function recoveryCount(): Promise<number> {
  const me = await assertAdmin()
  return remainingRecoveryCodes(me.userId)
}
