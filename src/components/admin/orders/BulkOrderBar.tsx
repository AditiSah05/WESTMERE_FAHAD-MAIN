'use client'

import { Ban, CheckCircle2, Download, PackageCheck, Truck } from 'lucide-react'
import { useState, useTransition } from 'react'
import { bulkOrders, type OrderBulk } from '@/app/admin/order-actions'

const b = 'inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep hover:border-gold disabled:opacity-60'

/** Each order is checked on its own. Orders that do not qualify are counted and left alone. */
export default function BulkOrderBar({ ids, onDone, onExport }: { ids: string[]; onDone: () => void; onExport: () => void }) {
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState('')
  const run = (op: OrderBulk, label: string, confirm?: string) => {
    if (confirm && !window.confirm(confirm)) return
    start(async () => { const r = await bulkOrders(ids, op); setMsg(`${label}: ${r.done} changed${r.skipped ? `, ${r.skipped} did not qualify` : ''}.`) })
  }
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-line bg-[#fafbfe] px-4 py-2.5">
      <span className="text-[13px] font-semibold text-navy-deep">{ids.length} order{ids.length === 1 ? '' : 's'} selected</span>
      <button type="button" onClick={onDone} className="text-xs font-semibold text-gold hover:underline">Clear</button>
      <button type="button" disabled={pending} onClick={() => run('paid', 'Mark as Paid')} className={b}><CheckCircle2 size={13} />Mark as Paid</button>
      <button type="button" disabled={pending} onClick={() => run('processing', 'Mark as Processing')} className={b}><PackageCheck size={13} />Mark as Processing</button>
      <button type="button" disabled={pending} onClick={() => run('delivered', 'Mark as Delivered')} className={b}><Truck size={13} />Mark as Delivered</button>
      <button type="button" onClick={onExport} className={b}><Download size={13} />Export Selected</button>
      <button type="button" disabled={pending} onClick={() => run('cancel', 'Cancel', 'Cancel the selected orders? Only unpaid orders are cancelled; paid ones go through the refund request flow.')} className="inline-flex items-center gap-1.5 rounded-lg border border-[#ef4444]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#b91c1c] hover:bg-[#ef4444]/5 disabled:opacity-60"><Ban size={13} />Cancel Selected</button>
      {msg && <p role="status" className="w-full text-xs font-medium text-muted">{msg}</p>}
    </div>
  )
}
