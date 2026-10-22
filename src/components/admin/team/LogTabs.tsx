'use client'

import { useState, useTransition } from 'react'
import { revokeInvite } from '@/app/admin/team-actions'
import type { Column, Row } from '@/lib/admin/types'
import type { AttemptRow, AuditRow, TeamInvite } from '@/lib/server/team'
import DataTable from '../ui/DataTable'

const stamp = (iso: string) => new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

export function HistoryTab({ attempts }: { attempts: AttemptRow[] }) {
  const cols: Column[] = [{ key: 'email', header: 'Email' }, { key: 'ip', header: 'IP', kind: 'mono' }, { key: 'result', header: 'Result', kind: 'status' }, { key: 'at', header: 'When' }]
  const rows: Row[] = attempts.map((a, i) => ({ id: String(i), email: a.email, ip: a.ip, result: a.success ? 'Success' : 'Failed', at: stamp(a.at) }))
  return <DataTable columns={cols} rows={rows} empty="No sign-in attempts recorded yet." />
}

export function ActivityTab({ audit }: { audit: AuditRow[] }) {
  const cols: Column[] = [{ key: 'who', header: 'User' }, { key: 'action', header: 'Action', kind: 'tag' }, { key: 'detail', header: 'Detail' }, { key: 'ip', header: 'IP', kind: 'mono' }, { key: 'at', header: 'When' }]
  const rows: Row[] = audit.map((a, i) => ({ id: String(i), who: a.who, action: a.action, detail: a.detail, ip: a.ip, at: stamp(a.at) }))
  return <DataTable columns={cols} rows={rows} empty="No activity yet." />
}

export function InvitesTab({ invites, canWrite }: { invites: TeamInvite[]; canWrite: boolean }) {
  const [pending, start] = useTransition()
  const [note, setNote] = useState('')
  const now = Date.now()
  const cols: Column[] = [{ key: 'email', header: 'Email' }, { key: 'role', header: 'Role', kind: 'tag' }, { key: 'status', header: 'Status', kind: 'status' }, { key: 'expires', header: 'Expires' }]
  const rows: Row[] = invites.map((i) => ({ id: i.id, email: i.email, role: i.role, status: i.usedAt ? 'Completed' : new Date(i.expiresAt).getTime() < now ? 'Expired' : 'Invited', expires: stamp(i.expiresAt) }))
  return (
    <div className="flex flex-col gap-3">
      {note && <p className="text-sm font-medium text-muted">{note}</p>}
      <DataTable columns={cols} rows={rows} empty="No invitations yet." onRowClick={canWrite ? (r) => {
        if (r.status === 'Invited' && confirm(`Revoke the invitation for ${r.email}?`)) start(async () => setNote((await revokeInvite(r.id))?.ok ?? ''))
      } : undefined} />
      {canWrite && <p className="text-xs font-medium text-muted">Click a pending invitation to revoke it. {pending && 'Working…'}</p>}
    </div>
  )
}
