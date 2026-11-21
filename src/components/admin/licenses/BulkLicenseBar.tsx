'use client'

import { Ban, CalendarPlus, Download, RefreshCw, RotateCcw } from 'lucide-react'
import { useState, useTransition } from 'react'
import { bulkLicenses, type BulkOp } from '@/app/admin/license-actions'

const b = 'inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep hover:border-gold disabled:opacity-60'

/** Shows when licenses are ticked. Says how many changed and how many did not apply (for example lifetime licenses cannot be renewed). */
export default function BulkLicenseBar({ ids, onDone, onExport }: { ids: string[]; onDone: () => void; onExport: () => void }) {
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState('')
  const run = (op: BulkOp, label: string) => {
    if ((op === 'revoke') && !window.confirm(`Revoke ${ids.length} license(s)? Their products will stop activating.`)) return
    start(async () => { const r = await bulkLicenses(ids, op); setMsg(`${label}: ${r.done} changed${r.skipped ? `, ${r.skipped} did not apply` : ''}.`) })
  }
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-line bg-[#fafbfe] px-4 py-2.5">
      <span className="text-[13px] font-semibold text-navy-deep">{ids.length} selected</span>
      <button type="button" onClick={onDone} className="text-xs font-semibold text-gold hover:underline">Clear</button>
      <button type="button" disabled={pending} onClick={() => run('renew', 'Renew 1 year')} className={b}><RefreshCw size={13} />Renew 1 year</button>
      <button type="button" disabled={pending} onClick={() => run('extend30', 'Extend 30 days')} className={b}><CalendarPlus size={13} />Extend 30 days</button>
      <button type="button" disabled={pending} onClick={() => run('restore', 'Restore')} className={b}><RotateCcw size={13} />Restore</button>
      <button type="button" onClick={onExport} className={b}><Download size={13} />Export</button>
      <button type="button" disabled={pending} onClick={() => run('revoke', 'Revoke')} className="inline-flex items-center gap-1.5 rounded-lg border border-[#ef4444]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#b91c1c] hover:bg-[#ef4444]/5 disabled:opacity-60"><Ban size={13} />Revoke</button>
      {msg && <p role="status" className="w-full text-xs font-medium text-muted">{msg}</p>}
    </div>
  )
}
