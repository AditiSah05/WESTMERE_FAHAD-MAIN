'use client'

import { Download, Eye, EyeOff, Star, StarOff, Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { bulkProducts } from '@/app/admin/shop-actions'

type Op = Parameters<typeof bulkProducts>[1]
const b = 'inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep hover:border-gold disabled:opacity-60'

/** Shows when rows are ticked. Delete only removes products with no orders and says which were kept. */
export default function BulkBar({ ids, names, onDone, onExport }: { ids: string[]; names: Record<string, string>; onDone: () => void; onExport: () => void }) {
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState('')
  const run = (op: Op) => {
    if (op === 'delete' && !window.confirm(`Delete ${ids.length} product(s)? Products that already have orders are kept. This cannot be undone.`)) return
    start(async () => {
      const r = await bulkProducts(ids, op)
      setMsg(r.skipped.length ? `${r.done} done. Kept (they have orders; hide them instead): ${r.skipped.map((i) => names[i] ?? i).join(', ')}` : `${r.done} product(s) updated.`)
      if (!r.skipped.length) onDone()
    })
  }
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-line bg-[#fafbfe] px-4 py-2.5">
      <span className="text-[13px] font-semibold text-navy-deep">{ids.length} selected</span>
      <button type="button" disabled={pending} onClick={() => run('publish')} className={b}><Eye size={13} />Publish</button>
      <button type="button" disabled={pending} onClick={() => run('unpublish')} className={b}><EyeOff size={13} />Unpublish</button>
      <button type="button" disabled={pending} onClick={() => run('feature')} className={b}><Star size={13} />Mark as Featured</button>
      <button type="button" disabled={pending} onClick={() => run('unfeature')} className={b}><StarOff size={13} />Remove Featured</button>
      <button type="button" onClick={onExport} className={b}><Download size={13} />Export</button>
      <button type="button" disabled={pending} onClick={() => run('delete')} className="inline-flex items-center gap-1.5 rounded-lg border border-[#ef4444]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#b91c1c] hover:bg-[#ef4444]/5 disabled:opacity-60"><Trash2 size={13} />Delete</button>
      {msg && <p role="status" className="w-full text-xs font-medium text-muted">{msg}</p>}
    </div>
  )
}
