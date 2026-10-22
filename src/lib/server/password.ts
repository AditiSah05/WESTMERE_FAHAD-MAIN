import 'server-only'
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number, opts: { N: number; r: number; p: number; maxmem: number }) => Promise<Buffer>

const N = 16384
const R = 8
const P = 1
const KEYLEN = 64
const OPTS = { N, r: R, p: P, maxmem: 64 * 1024 * 1024 }

/** `scrypt$N$r$p$salt$hash` (base64). Per-password random salt. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const key = await scrypt(password, salt, KEYLEN, OPTS)
  return `scrypt$${N}$${R}$${P}$${salt.toString('base64')}$${key.toString('base64')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, n, r, p, salt, hash] = stored.split('$')
  if (scheme !== 'scrypt' || !salt || !hash) return false
  const expected = Buffer.from(hash, 'base64')
  const key = await scrypt(password, Buffer.from(salt, 'base64'), expected.length, { N: Number(n), r: Number(r), p: Number(p), maxmem: OPTS.maxmem })
  return key.length === expected.length && timingSafeEqual(key, expected)
}

/** Burns the same CPU as a real check so unknown emails are not distinguishable by timing. */
let dummy: Promise<string> | undefined
export async function fakeVerify(password: string) {
  dummy ??= hashPassword('not-a-real-password')
  await verifyPassword(password, await dummy)
}

const COMMON = ['password', 'passw0rd', 'qwerty', 'letmein', 'welcome', 'admin', 'westmere', 'iloveyou', '123456']

/** Returns an error message, or null when the password is acceptable. */
export function passwordProblem(password: string, email = ''): string | null {
  if (password.length < 12) return 'Use at least 12 characters.'
  if (password.length > 128) return 'Use at most 128 characters.'
  const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((re) => re.test(password)).length
  if (classes < 3) return 'Mix at least three of: lowercase, uppercase, numbers, symbols.'
  const lower = password.toLowerCase()
  if (COMMON.some((w) => lower.includes(w))) return 'That password is too easy to guess.'
  const local = email.split('@')[0]?.toLowerCase()
  if (local && local.length >= 4 && lower.includes(local)) return 'Do not include your email name in the password.'
  return null
}
