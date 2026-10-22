import 'server-only'
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

/** 32-byte key for encrypting TOTP secrets at rest. Production must set AUTH_ENCRYPTION_KEY (64 hex chars). */
function key(): Buffer {
  const env = process.env.AUTH_ENCRYPTION_KEY
  if (env) {
    const k = /^[0-9a-f]{64}$/i.test(env) ? Buffer.from(env, 'hex') : Buffer.from(env, 'base64')
    if (k.length !== 32) throw new Error('AUTH_ENCRYPTION_KEY must be 32 bytes (64 hex characters)')
    return k
  }
  if (process.env.NODE_ENV === 'production') throw new Error('AUTH_ENCRYPTION_KEY is required in production to use two-factor authentication')
  // Local development only: a random key persisted in the git-ignored ./.data folder.
  const file = './.data/dev-encryption-key'
  if (!existsSync(file)) {
    mkdirSync('./.data', { recursive: true })
    writeFileSync(file, randomBytes(32).toString('hex'), { mode: 0o600 })
  }
  return Buffer.from(readFileSync(file, 'utf8').trim(), 'hex')
}

/** AES-256-GCM: `v1.<iv>.<tag>.<ciphertext>` (base64url). */
export function encrypt(plain: string): string {
  const iv = randomBytes(12)
  const c = createCipheriv('aes-256-gcm', key(), iv)
  const data = Buffer.concat([c.update(plain, 'utf8'), c.final()])
  return ['v1', iv.toString('base64url'), c.getAuthTag().toString('base64url'), data.toString('base64url')].join('.')
}

export function decrypt(blob: string): string {
  const [v, iv, tag, data] = blob.split('.')
  if (v !== 'v1' || !iv || !tag || !data) throw new Error('Bad ciphertext')
  const d = createDecipheriv('aes-256-gcm', key(), Buffer.from(iv, 'base64url'))
  d.setAuthTag(Buffer.from(tag, 'base64url'))
  return Buffer.concat([d.update(Buffer.from(data, 'base64url')), d.final()]).toString('utf8')
}
