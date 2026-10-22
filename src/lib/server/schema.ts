import 'server-only'
import { getDb } from './db'

const statements = [
  `CREATE TABLE IF NOT EXISTS admin_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    password_hash text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    password_changed_at timestamptz NOT NULL DEFAULT now()
  )`,
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
  `CREATE TABLE IF NOT EXISTS admin_records (
    key text NOT NULL,
    id text NOT NULL,
    position int NOT NULL,
    data jsonb NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (key, id)
  )`,
  `CREATE TABLE IF NOT EXISTS admin_audit (
    id bigserial PRIMARY KEY,
    user_id uuid,
    action text NOT NULL,
    detail text,
    ip text,
    at timestamptz NOT NULL DEFAULT now()
  )`,
]

const globalForSchema = globalThis as unknown as { __wmSchema?: Promise<void> }

/** Idempotent; runs once per server process before the first query. */
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
