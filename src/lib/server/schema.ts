import 'server-only'
import { getDb } from './db'

// Order matters: tables first, then idempotent column additions for databases created by earlier versions.
const statements = [
  `CREATE TABLE IF NOT EXISTS admin_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    password_hash text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    password_changed_at timestamptz NOT NULL DEFAULT now()
  )`,
  `ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT ''`,
  `ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'owner'`,
  `ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active'`,
  `ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS totp_secret text`,
  `ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS totp_enabled boolean NOT NULL DEFAULT false`,
  `ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS totp_last_step bigint NOT NULL DEFAULT 0`,
  `CREATE TABLE IF NOT EXISTS admin_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    token_hash text NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    last_seen_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz NOT NULL,
    ip text,
    user_agent text
  )`,
  `CREATE TABLE IF NOT EXISTS login_attempts (
    id bigserial PRIMARY KEY,
    email text NOT NULL,
    ip text NOT NULL,
    success boolean NOT NULL,
    at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS login_attempts_email_at ON login_attempts (email, at)`,
  `CREATE INDEX IF NOT EXISTS login_attempts_ip_at ON login_attempts (ip, at)`,
  `CREATE TABLE IF NOT EXISTS admin_invites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL,
    role text NOT NULL,
    token_hash text NOT NULL UNIQUE,
    created_by uuid REFERENCES admin_users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    expires_at timestamptz NOT NULL,
    used_at timestamptz
  )`,
  `CREATE TABLE IF NOT EXISTS admin_recovery_codes (
    id bigserial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    code_hash text NOT NULL,
    used_at timestamptz
  )`,
  `CREATE TABLE IF NOT EXISTS admin_challenges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    token_hash text NOT NULL UNIQUE,
    expires_at timestamptz NOT NULL,
    attempts int NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS admin_audit (
    id bigserial PRIMARY KEY,
    user_id uuid,
    action text NOT NULL,
    detail text,
    ip text,
    at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS admin_audit_at ON admin_audit (at DESC)`,
]

const globalForSchema = globalThis as unknown as { __wmSchema?: Promise<void> }

/** Idempotent; runs once per server process before the first query. Entity tables are added by `entities.ts`. */
export function ensureSchema() {
  return (globalForSchema.__wmSchema ??= (async () => {
    const { query } = await getDb()
    for (const s of statements) await query(s)
  })())
}

export async function db() {
  await ensureSchema()
  return getDb()
}
