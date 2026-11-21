'use client'

import { CheckCircle2, Download, Search, XCircle } from 'lucide-react'
import { useState, useTransition } from 'react'
import { bulkRefunds, type RefundBulk } from '@/app/admin/refund-actions'

const b = 'inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep hover:border-gold disabled:opacity-60'

export default function BulkRefundBar({ ids, onDone, onExport }: { ids: string[]; onDone: () => void; onExport: () => void }) {
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState('')
  const run = (op: RefundBulk, label: string, confirm?: string) => {
    if (confirm && !window.confirm(confirm)) return
    start(async () => { const r = await bulkRefunds(ids, op); setMsg(`${label}: ${r.done} changed${r.skipped ? `, ${r.skipped} could not move to that status` : ''}.`) })
  }
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-line bg-[#fafbfe] px-4 py-2.5">
      <span className="text-[13px] font-semibold text-navy-deep">{ids.length} selected</span>
      <button type="button" onClick={onDone} className="text-xs font-semibold text-gold hover:underline">Clear</button>
      <button type="button" disabled={pending} onClick={() => run('review', 'Start investigation')} className={b}><Search size={13} />Start Investigation</button>
      <button type="button" disabled={pending} onClick={() => run('approve', 'Approve', 'Approve the selected requests? A full refund cancels the order and revokes its license.')} className={b}><CheckCircle2 size={13} />Approve</button>
      <button type="button" onClick={onExport} className={b}><Download size={13} />Export Selected</button>
      <button type="button" disabled={pending} onClick={() => run('reject', 'Reject', 'Reject the selected requests?')} className="inline-flex items-center gap-1.5 rounded-lg border border-[#ef4444]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#b91c1c] hover:bg-[#ef4444]/5 disabled:opacity-60"><XCircle size={13} />Reject</button>
      {msg && <p role="status" className="w-full text-xs font-medium text-muted">{msg}</p>}
    </div>
  )
}
