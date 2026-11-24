import 'server-only'
import { db } from './schema'

export type TeamUser = { id: string; email: string; name: string; role: string; status: string; totpEnabled: boolean; createdAt: string; sessions: number }
export type TeamInvite = { id: string; email: string; role: string; createdAt: string; expiresAt: string; usedAt: string | null }
export type AttemptRow = { email: string; ip: string; success: boolean; at: string }
export type AuditRow = { action: string; detail: string; who: string; ip: string; at: string }

const iso = (v: unknown) => new Date(v as string).toISOString()

export async function listUsers(): Promise<TeamUser[]> {
  const { query } = await db()
  const rows = await query<{ id: string; email: string; name: string; role: string; status: string; totp_enabled: boolean; created_at: string; sessions: string }>(
    `SELECT u.id, u.email, u.name, u.role, u.status, u.totp_enabled, u.created_at,
            (SELECT count(*) FROM admin_sessions s WHERE s.user_id = u.id AND s.expires_at > now()) AS sessions
     FROM admin_users u ORDER BY u.created_at`,
  )
  return rows.map((r) => ({ id: r.id, email: r.email, name: r.name, role: r.role, status: r.status, totpEnabled: r.totp_enabled, createdAt: iso(r.created_at), sessions: Number(r.sessions) }))
}

export async function listInvites(): Promise<TeamInvite[]> {
  const { query } = await db()
  const rows = await query<{ id: string; email: string; role: string; created_at: string; expires_at: string; used_at: string | null }>(
    `SELECT id, email, role, created_at, expires_at, used_at FROM admin_invites ORDER BY created_at DESC LIMIT 50`,
  )
  return rows.map((r) => ({ id: r.id, email: r.email, role: r.role, createdAt: iso(r.created_at), expiresAt: iso(r.expires_at), usedAt: r.used_at ? iso(r.used_at) : null }))
}

export async function recentAttempts(): Promise<AttemptRow[]> {
  const { query } = await db()
  const rows = await query<{ email: string; ip: string; success: boolean; at: string }>(`SELECT email, ip, success, at FROM login_attempts ORDER BY at DESC LIMIT 50`)
  return rows.map((r) => ({ email: r.email, ip: r.ip, success: r.success, at: iso(r.at) }))
}

export async function recentAudit(): Promise<AuditRow[]> {
  const { query } = await db()
  const rows = await query<{ action: string; detail: string | null; email: string | null; ip: string | null; at: string }>(
    `SELECT a.action, a.detail, u.email, a.ip, a.at FROM admin_audit a LEFT JOIN admin_users u ON u.id = a.user_id ORDER BY a.at DESC LIMIT 80`,
  )
  return rows.map((r) => ({ action: r.action, detail: r.detail ?? '', who: r.email ?? 'system', ip: r.ip ?? '', at: iso(r.at) }))
}
