'use client'

import { Copy } from 'lucide-react'
import { useActionState, useState } from 'react'
import { inviteUser } from '@/app/admin/team-actions'
import { ROLES, roleLabel, type Role } from '@/lib/admin/permissions'
import Card from '../ui/Card'
import { btn } from '../ui/PageHeader'

const input = 'rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 text-sm font-medium outline-none focus:border-blue-accent'

export default function InviteForm({ myRole }: { myRole: Role }) {
  const [state, action, pending] = useActionState(inviteUser, undefined)
  const [copied, setCopied] = useState(false)

  return (
    <Card className="p-5">
      <h2 className="mb-3 text-lg font-medium tracking-[-0.02em] text-navy-deep">Invite a team member</h2>
      <form action={action} className="flex flex-wrap items-end gap-3">
        <label className="flex min-w-[240px] flex-1 flex-col gap-1.5"><span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Email</span><input name="email" type="email" required className={input} /></label>
        <label className="flex flex-col gap-1.5"><span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Role</span>
          <select name="role" defaultValue="editor" className={input}>{ROLES.filter((r) => r !== 'owner' || myRole === 'owner').map((r) => <option key={r} value={r}>{roleLabel[r]}</option>)}</select>
        </label>
        <button type="submit" disabled={pending} className={btn.gold}>{pending ? 'Creating…' : 'Create invite link'}</button>
      </form>
      {state?.error && <p role="alert" className="mt-3 rounded-lg bg-[#ef4444]/10 px-3 py-2 text-sm font-medium text-[#b91c1c]">{state.error}</p>}
      {state?.link && (
        <div className="mt-3 rounded-lg border border-gold/30 bg-gold/10 p-3">
          <p className="mb-2 text-sm font-medium text-[#8a6420]">{state.ok}</p>
          <div className="flex items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded bg-white px-2 py-1.5 font-mono text-xs">{state.link}</code>
            <button type="button" className={btn.ghost} onClick={() => { void navigator.clipboard.writeText(state.link ?? ''); setCopied(true) }}><Copy size={14} />{copied ? 'Copied' : 'Copy'}</button>
          </div>
        </div>
      )}
    </Card>
  )
}
