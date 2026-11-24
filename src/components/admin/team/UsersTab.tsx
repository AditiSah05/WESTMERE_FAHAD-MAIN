'use client'

import { Ban, CheckCircle2, ShieldCheck, Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { changeRole, removeUser, setUserStatus, type TeamState } from '@/app/admin/team-actions'
import { ROLES, roleLabel, type Role } from '@/lib/admin/permissions'
import { shortDate } from '@/lib/admin/format'
import type { TeamUser } from '@/lib/server/team'
import Card from '../ui/Card'
import StatusBadge from '../ui/StatusBadge'
import InviteForm from './InviteForm'

type Props = { me: { id: string; role: Role }; canWrite: boolean; users: TeamUser[] }

export default function UsersTab({ me, canWrite, users }: Props) {
  const [msg, setMsg] = useState<TeamState>()
  const [pending, start] = useTransition()
  const run = (fn: () => Promise<TeamState>) => start(async () => setMsg(await fn()))

  return (
    <div className="flex flex-col gap-5">
      {canWrite && <InviteForm myRole={me.role} />}
      {msg?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{msg.error}</p>}
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead><tr className="border-b border-line bg-paper/70 text-[11px] uppercase tracking-[0.12em] text-slate">
            {['User', 'Role', 'Status', '2FA', 'Sessions', 'Joined', ''].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
          </tr></thead>
          <tbody>
            {users.map((u) => {
              const self = u.id === me.id
              const locked = !canWrite || self || (u.role === 'owner' && me.role !== 'owner')
              return (
                <tr key={u.id} className="border-b border-line/60 last:border-b-0">
                  <td className="px-4 py-3 font-medium text-navy-deep">{u.name || '—'}<span className="block text-xs text-muted">{u.email}{self && ' (you)'}</span></td>
                  <td className="px-4 py-3">
                    <select disabled={locked || pending} value={u.role} onChange={(e) => run(() => changeRole(u.id, e.target.value))} className="rounded-lg border border-line bg-white px-2 py-1.5 text-sm font-medium disabled:opacity-60">
                      {ROLES.map((r) => <option key={r} value={r} disabled={r === 'owner' && me.role !== 'owner'}>{roleLabel[r]}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3"><StatusBadge value={u.status === 'active' ? 'Active' : 'Suspended'} /></td>
                  <td className="px-4 py-3">{u.totpEnabled ? <span className="inline-flex items-center gap-1 text-[#047857]"><ShieldCheck size={15} />On</span> : <span className="text-muted">Off</span>}</td>
                  <td className="px-4 py-3 text-navy-deep">{u.sessions}</td>
                  <td className="px-4 py-3 text-muted">{shortDate(u.createdAt)}</td>
                  <td className="px-4 py-3">
                    {!locked && (
                      <div className="flex justify-end gap-1.5">
                        <button type="button" disabled={pending} title={u.status === 'active' ? 'Suspend' : 'Reactivate'} onClick={() => run(() => setUserStatus(u.id, u.status === 'active' ? 'suspended' : 'active'))} className="flex size-8 items-center justify-center rounded-lg border border-line hover:bg-paper">
                          {u.status === 'active' ? <Ban size={15} /> : <CheckCircle2 size={15} />}
                        </button>
                        <button type="button" disabled={pending} title="Remove" onClick={() => confirm(`Remove ${u.email}? This cannot be undone.`) && run(() => removeUser(u.id))} className="flex size-8 items-center justify-center rounded-lg border border-[#ef4444]/30 text-[#b91c1c] hover:bg-[#ef4444]/5"><Trash2 size={15} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
