import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import Link from 'next/link'
import { statusLabel, statusTone } from '@/lib/refund-shared'
import type { Refund } from '@/lib/server/refunds'
import { btn } from '../ui/PageHeader'
import StatusBadge from '../ui/StatusBadge'

const th = 'px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const field = 'rounded-lg border border-line bg-white px-2 py-1 text-sm font-medium text-navy-deep'
const money = (n: number) => `₹${n.toLocaleString('en-IN')}`

type Props = { rows: Refund[]; selected: Set<string>; onToggle?: (id: string) => void; onToggleAll?: () => void; total: number; page: number; pages: number; per: number; onPage: (n: number) => void; onPer: (n: number) => void; onView: (r: Refund) => void }

export default function RefundTable({ rows, selected, onToggle, onToggleAll, total, page, pages, per, onPage, onPer, onView }: Props) {
  return (
    <>
      {!rows.length ? <p className="p-8 text-center text-sm font-medium text-muted">No refund requests match these filters.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-sm">
            <thead><tr className="border-b border-line bg-[#fafbfe]">{onToggle && <th className="w-10 px-3 py-3"><input type="checkbox" checked={rows.every((r) => selected.has(r.id))} onChange={onToggleAll} aria-label="Select all" className="size-4" /></th>}<th className={th}>Refund ID</th><th className={th}>Order ID</th><th className={th}>Customer</th><th className={th}>Product / service</th><th className={th}>Refund amount</th><th className={th}>Reason</th><th className={th}>Requested</th><th className={th}>Status</th><th className={th}>Method</th><th className={th}>Actions</th></tr></thead>
            <tbody>{rows.map((r) => (
              <tr key={r.id} className="border-b border-line/60 font-medium text-navy-deep last:border-0">
                {onToggle && <td className="px-3 py-3"><input type="checkbox" checked={selected.has(r.id)} onChange={() => onToggle(r.id)} aria-label={`Select RF-${r.id}`} className="size-4" /></td>}
                <td className="whitespace-nowrap px-3 py-3 font-mono text-[13px] font-semibold">RF-{r.id}</td>
                <td className="whitespace-nowrap px-3 py-3"><Link href={`/admin/orders?q=WM-${r.orderId}`} className="font-mono text-[13px] text-blue underline-offset-2 hover:underline">WM-{r.orderId}</Link></td>
                <td className="px-3 py-3"><p className="font-semibold">{r.customer}</p><p className="text-xs text-muted">{r.email}</p></td>
                <td className="min-w-[150px] px-3 py-3">{r.product}<span className="block text-xs text-muted">{r.kind}</span></td>
                <td className="whitespace-nowrap px-3 py-3 font-semibold">{money(r.amount)}{r.amount < r.orderAmount && <span className="block text-xs font-medium text-muted">of {money(r.orderAmount)}</span>}</td>
                <td className="min-w-[150px] px-3 py-3">{r.reasonType}<span className="block max-w-[200px] truncate text-xs text-muted">{r.reason}</span></td>
                <td className="whitespace-nowrap px-3 py-3 text-muted">{r.at}</td>
                <td className="px-3 py-3"><StatusBadge value={statusLabel(r.status)} tone={statusTone(r.status)} /></td>
                <td className="whitespace-nowrap px-3 py-3">{r.method}</td>
                <td className="px-3 py-3"><button type="button" onClick={() => onView(r)} className={`${btn.ghost} !px-3 !py-1.5 text-xs`}><Eye size={13} />View</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-[13px] font-medium text-muted">
        <span>Showing {total ? (page - 1) * per + 1 : 0}–{Math.min(page * per, total)} of {total} refund requests</span>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5">Rows per page<select value={per} onChange={(e) => onPer(Number(e.target.value))} className={field}>{[10, 25, 50].map((n) => <option key={n}>{n}</option>)}</select></label>
          <button type="button" onClick={() => onPage(page - 1)} disabled={page <= 1} aria-label="Previous page" className="flex size-8 items-center justify-center rounded-lg border border-line disabled:opacity-40"><ChevronLeft size={15} /></button>
          <span className="min-w-[52px] text-center text-navy-deep">{page} / {pages}</span>
          <button type="button" onClick={() => onPage(page + 1)} disabled={page >= pages} aria-label="Next page" className="flex size-8 items-center justify-center rounded-lg border border-line disabled:opacity-40"><ChevronRight size={15} /></button>
        </div>
      </div>
    </>
  )
}
