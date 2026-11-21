import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import type { Order } from '@/lib/server/orders'
import { btn } from '../ui/PageHeader'
import StatusBadge from '../ui/StatusBadge'

const th = 'px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const field = 'rounded-lg border border-line bg-white px-2 py-1 text-sm font-medium text-navy-deep'
const money = (n: number) => `₹${n.toLocaleString('en-IN')}`

type Props = { rows: Order[]; selected: Set<string>; onToggle?: (id: string) => void; onToggleAll?: () => void; total: number; page: number; pages: number; per: number; onPage: (n: number) => void; onPer: (n: number) => void; onView: (o: Order) => void }

export default function OrderTable({ rows, selected, onToggle, onToggleAll, total, page, pages, per, onPage, onPer, onView }: Props) {
  return (
    <>
      {!rows.length ? <p className="p-8 text-center text-sm font-medium text-muted">No orders match these filters.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-sm">
            <thead><tr className="border-b border-line bg-[#fafbfe]">{onToggle && <th className="w-10 px-3 py-3"><input type="checkbox" checked={rows.every((o) => selected.has(o.id))} onChange={onToggleAll} aria-label="Select all" className="size-4" /></th>}<th className={th}>Order ID</th><th className={th}>Customer</th><th className={th}>Product / service</th><th className={th}>Amount</th><th className={th}>Payment</th><th className={th}>Fulfilment</th><th className={th}>Order date</th><th className={th}>Method</th><th className={th}>Actions</th></tr></thead>
            <tbody>{rows.map((o) => (
              <tr key={o.id} className="border-b border-line/60 font-medium text-navy-deep last:border-0">
                {onToggle && <td className="px-3 py-3"><input type="checkbox" checked={selected.has(o.id)} onChange={() => onToggle(o.id)} aria-label={`Select order ${o.id}`} className="size-4" /></td>}
                <td className="whitespace-nowrap px-3 py-3 font-mono text-[13px] font-semibold">WM-{o.id}{o.manual && <span className="ml-2 rounded bg-sky px-1.5 py-0.5 font-sans text-[10px] font-bold uppercase text-blue">Manual</span>}</td>
                <td className="px-3 py-3"><p className="font-semibold">{o.customer}</p><p className="text-xs text-muted">{o.email}</p></td>
                <td className="min-w-[170px] px-3 py-3"><p>{o.product}</p><span className="mt-0.5 inline-block rounded-full bg-[#64748b]/10 px-2 py-0.5 text-[11px] font-semibold text-[#475569]">{o.type}</span></td>
                <td className="whitespace-nowrap px-3 py-3">{money(o.amount)}</td>
                <td className="px-3 py-3"><StatusBadge value={o.payment} /></td>
                <td className="px-3 py-3"><StatusBadge value={o.fulfilment} tone={o.fulfilment === 'Delivered' ? 'green' : o.fulfilment === 'Cancelled' ? 'red' : o.fulfilment === 'Ready for Delivery' ? 'blue' : 'amber'} /></td>
                <td className="whitespace-nowrap px-3 py-3 text-muted">{o.at}</td>
                <td className="whitespace-nowrap px-3 py-3">{o.method}</td>
                <td className="px-3 py-3"><button type="button" onClick={() => onView(o)} className={`${btn.ghost} !px-3 !py-1.5 text-xs`}><Eye size={13} />View</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-[13px] font-medium text-muted">
        <span>Showing {total ? (page - 1) * per + 1 : 0}–{Math.min(page * per, total)} of {total} orders</span>
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
