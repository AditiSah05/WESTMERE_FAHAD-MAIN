import 'server-only'
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
const STEP = 30
const DIGITS = 6

export function base32Encode(buf: Buffer): string {
  let bits = 0
  let value = 0
  let out = ''
  for (const byte of buf) {
    value = (value << 8) | byte
    bits += 8
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31]
  return out
}

export function base32Decode(s: string): Buffer {
  let bits = 0
  let value = 0
  const out: number[] = []
  for (const ch of s.replace(/=+$/, '').toUpperCase()) {
    const i = ALPHABET.indexOf(ch)
    if (i < 0) throw new Error('Bad base32')
    value = (value << 5) | i
    bits += 5
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255)
      bits -= 8
    }
  }
  return Buffer.from(out)
}

export const generateSecret = () => base32Encode(randomBytes(20))

/** RFC 6238 (HMAC-SHA1, 30 s, 6 digits) code for a given time step. */
export function codeAt(secret: string, counter: number): string {
  const msg = Buffer.alloc(8)
  msg.writeBigUInt64BE(BigInt(counter))
  const h = createHmac('sha1', base32Decode(secret)).update(msg).digest()
  const o = h[h.length - 1] & 15
  const n = ((h[o] & 127) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3]
  return String(n % 10 ** DIGITS).padStart(DIGITS, '0')
}

export const currentStep = (now = Date.now()) => Math.floor(now / 1000 / STEP)

/** Returns the matched time step (so the caller can reject replays) or null. Accepts ±1 step for clock drift. */
export function verifyCode(secret: string, input: string, after = 0, now = Date.now()): number | null {
  const code = input.replace(/\s/g, '')
  if (!/^\d{6}$/.test(code)) return null
  const base = currentStep(now)
  for (const step of [base, base - 1, base + 1]) {
    if (step <= after) continue
    const a = Buffer.from(codeAt(secret, step))
    const b = Buffer.from(code)
    if (a.length === b.length && timingSafeEqual(a, b)) return step
  }
  return null
}

export const otpauthUri = (secret: string, email: string) =>
  `otpauth://totp/${encodeURIComponent(`Westmere Admin:${email}`)}?secret=${secret}&issuer=${encodeURIComponent('Westmere Admin')}&algorithm=SHA1&digits=${DIGITS}&period=${STEP}`
