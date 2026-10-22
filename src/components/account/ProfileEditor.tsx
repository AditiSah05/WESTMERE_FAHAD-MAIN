'use client'

import { Download } from 'lucide-react'
import { useActionState } from 'react'
import { requestDeletion, saveProfile } from '@/app/account/more-actions'
import Card from '@/components/admin/ui/Card'
import PageHeader, { btn } from '@/components/admin/ui/PageHeader'
import type { PGroup } from '@/lib/account/profile-fields'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 text-sm font-medium text-navy-deep outline-none focus:border-blue-accent focus:bg-white read-only:text-muted'
const label = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

type Props = { slug: string; title: string; subtitle: string; groups: PGroup[]; values: Record<string, string | boolean> }

export default function ProfileEditor({ slug, title, subtitle, groups, values }: Props) {
  const [state, action, pending] = useActionState(saveProfile.bind(null, slug), undefined)
  const [del, ask, asking] = useActionState(requestDeletion, undefined)

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <form action={action} className="grid max-w-[720px] gap-5">
        {groups.map((g) => (
          <Card key={g.heading} className="p-6">
            <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep">{g.heading}</h2>
            <div className="grid gap-4">
              {g.fields.map((f) =>
                f.toggle ? (
                  <label key={f.name} className="flex items-center gap-3 text-sm font-medium text-navy-deep"><input type="checkbox" name={f.name} defaultChecked={Boolean(values[f.name])} className="size-4" />{f.label}</label>
                ) : (
                  <label key={f.name} className="flex flex-col gap-1.5">
                    <span className={label}>{f.label}</span>
                    {f.multiline ? <textarea name={f.name} defaultValue={String(values[f.name] ?? '')} rows={3} maxLength={300} className={input} /> : <input name={f.name} defaultValue={String(values[f.name] ?? '')} readOnly={f.readOnly} maxLength={80} className={input} />}
                  </label>
                ),
              )}
            </div>
          </Card>
        ))}
        {state?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{state.error}</p>}
        {state?.ok && <p role="status" className="rounded-lg bg-[#10b981]/10 px-3 py-2.5 text-sm font-medium text-[#047857]">{state.ok}</p>}
        <div><button type="submit" disabled={pending} className={`${btn.gold} disabled:opacity-70`}>{pending ? 'Saving…' : 'Save changes'}</button></div>
      </form>
      {slug === 'settings' && (
        <Card className="mt-5 max-w-[720px] p-6">
          <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep">Privacy & data</h2>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/account/export" className={btn.ghost}><Download size={15} />Export my data</a>
            <form action={ask}><button type="submit" disabled={asking} className={btn.danger}>Request account deletion</button></form>
          </div>
          {del?.ok && <p role="status" className="mt-3 text-sm font-medium text-[#047857]">{del.ok}</p>}
        </Card>
      )}
    </>
  )
}
