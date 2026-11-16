'use client'

import { Plus, Trash2 } from 'lucide-react'
import { useActionState, useState } from 'react'
import { saveComparison } from '@/app/admin/content-actions'
import Card from '@/components/admin/ui/Card'
import { btn } from '@/components/admin/ui/PageHeader'
import type { ComparisonRow } from '@/lib/server/content'
import { Msg, field } from './form'

/** One row per line on the home page: what other agencies do, and what we do. */
export default function ComparisonEditor({ initial, canWrite }: { initial: ComparisonRow[]; canWrite: boolean }) {
  const [rows, setRows] = useState(initial.map((r, i) => ({ ...r, key: i })))
  const [state, action, pending] = useActionState(saveComparison, undefined)
  const edit = (key: number, side: 'otherText' | 'ourText', v: string) => setRows((rs) => rs.map((r) => (r.key === key ? { ...r, [side]: v } : r)))

  return (
    <Card className="mb-6 max-w-[900px] p-6">
      <h2 className="mb-1 text-lg font-medium tracking-[-0.02em] text-navy-deep">Home page comparison</h2>
      <p className="mb-5 text-sm font-medium text-muted">Each row compares other agencies (left) with Westmere (right).</p>
      <form action={action} className="grid gap-4">
        {rows.map((r, i) => (
          <div key={r.key} className="grid gap-3 min-[769px]:grid-cols-[1fr_1fr_auto] min-[769px]:items-end">
            <label className="flex flex-col gap-1.5"><span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Other agencies {i + 1}</span><input name="other" value={r.otherText} onChange={(e) => edit(r.key, 'otherText', e.target.value)} maxLength={160} readOnly={!canWrite} className={field} /></label>
            <label className="flex flex-col gap-1.5"><span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Westmere {i + 1}</span><input name="our" value={r.ourText} onChange={(e) => edit(r.key, 'ourText', e.target.value)} maxLength={160} readOnly={!canWrite} className={field} /></label>
            {canWrite && <button type="button" aria-label={`Remove row ${i + 1}`} onClick={() => setRows((rs) => rs.filter((x) => x.key !== r.key))} className={`${btn.ghost} !px-3`}><Trash2 size={15} /></button>}
          </div>
        ))}
        <Msg s={state} />
        {canWrite && (
          <div className="flex flex-wrap gap-3">
            <button type="button" disabled={rows.length >= 10} onClick={() => setRows((rs) => [...rs, { otherText: '', ourText: '', key: Math.max(-1, ...rs.map((x) => x.key)) + 1 }])} className={`${btn.ghost} disabled:opacity-60`}><Plus size={15} />Add row</button>
            <button type="submit" disabled={pending} className={`${btn.gold} disabled:opacity-70`}>{pending ? 'Saving…' : 'Save changes'}</button>
          </div>
        )}
      </form>
    </Card>
  )
}
