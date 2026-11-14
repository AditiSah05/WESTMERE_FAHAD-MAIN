'use client'

import { Plus, Trash2 } from 'lucide-react'
import { useActionState, useState } from 'react'
import { saveBooking, saveComparison, saveSocials, type SiteState } from '@/app/admin/site-actions'
import { NETWORKS, type ComparisonRow, type NetworkKey } from '@/lib/site-defaults'
import { cn } from '@/lib/cn'
import Card from '../ui/Card'
import { btn } from '../ui/PageHeader'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 text-sm font-medium text-navy-deep outline-none focus:border-blue-accent focus:bg-white'
const label = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

export const Msg = ({ s }: { s: SiteState }) => (
  <>
    {s?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{s.error}</p>}
    {s?.ok && <p role="status" className="rounded-lg bg-[#10b981]/10 px-3 py-2.5 text-sm font-medium text-[#047857]">{s.ok}</p>}
  </>
)

function Panel({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return <Card className="max-w-[760px] p-6"><h2 className="text-lg font-medium tracking-[-0.02em] text-navy-deep">{title}</h2><p className="mb-5 mt-1 text-sm font-medium text-muted">{hint}</p>{children}</Card>
}

export function SocialsForm({ values }: { values: Record<NetworkKey, string> }) {
  const [state, action, pending] = useActionState(saveSocials, undefined)
  return (
    <Panel title="Social links" hint="Shown in the footer and on the home page. Leave a network empty to hide it.">
      <form action={action} className="grid gap-4">
        {NETWORKS.map((n) => (
          <label key={n.key} className="flex flex-col gap-1.5"><span className={label}>{n.label}</span><input name={n.key} defaultValue={values[n.key]} placeholder="https://" inputMode="url" maxLength={300} className={input} /></label>
        ))}
        <Msg s={state} />
        <div><button type="submit" disabled={pending} className={cn(btn.gold, 'disabled:opacity-70')}>{pending ? 'Saving…' : 'Save links'}</button></div>
      </form>
    </Panel>
  )
}

export function BookingForm({ value }: { value: string }) {
  const [state, action, pending] = useActionState(saveBooking, undefined)
  return (
    <Panel title="Schedule a call link" hint='Where the "Schedule a call - 15 mins free" button on the home page goes (your booking page).'>
      <form action={action} className="grid gap-4">
        <label className="flex flex-col gap-1.5"><span className={label}>Booking link</span><input name="bookingUrl" defaultValue={value} placeholder="https://cal.com/your-name" inputMode="url" maxLength={300} className={input} /></label>
        <Msg s={state} />
        <div><button type="submit" disabled={pending} className={cn(btn.gold, 'disabled:opacity-70')}>{pending ? 'Saving…' : 'Save link'}</button></div>
      </form>
    </Panel>
  )
}

export function ComparisonForm({ rows }: { rows: ComparisonRow[] }) {
  const [state, action, pending] = useActionState(saveComparison, undefined)
  const [count, setCount] = useState(rows.length)
  return (
    <Panel title="Comparison lines" hint='The "Other agencies" versus "Our agency" table on the home page. Up to 8 rows. Clear both boxes of a row to remove it.'>
      <form action={action} className="grid gap-4">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="grid gap-3 rounded-xl border border-line p-4 min-[769px]:grid-cols-2">
            <label className="flex flex-col gap-1.5"><span className={label}>Other agencies, row {i + 1}</span><textarea name={`other${i}`} defaultValue={rows[i]?.other ?? ''} rows={2} maxLength={200} className={input} /></label>
            <label className="flex flex-col gap-1.5"><span className={label}>Our agency, row {i + 1}</span><textarea name={`ours${i}`} defaultValue={rows[i]?.ours ?? ''} rows={2} maxLength={200} className={input} /></label>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          {count < 8 && <button type="button" onClick={() => setCount(count + 1)} className={btn.ghost}><Plus size={15} />Add a row</button>}
          {count > 1 && <button type="button" onClick={() => setCount(count - 1)} className={btn.ghost}><Trash2 size={15} />Remove last box</button>}
        </div>
        <Msg s={state} />
        <div><button type="submit" disabled={pending} className={cn(btn.gold, 'disabled:opacity-70')}>{pending ? 'Saving…' : 'Save comparison'}</button></div>
      </form>
    </Panel>
  )
}
