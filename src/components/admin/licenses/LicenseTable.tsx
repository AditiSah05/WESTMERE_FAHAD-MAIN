import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import type { License } from '@/lib/server/licenses'
import { btn } from '../ui/PageHeader'
import StatusBadge from '../ui/StatusBadge'

const th = 'px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const maskKey = (k: string) => k.replace(/^(WM-\w{4})-\w{4}-(\w{4})$/, '$1-••••-$2')
const field = 'rounded-lg border border-line bg-white px-2 py-1 text-sm font-medium text-navy-deep'

type Props = { rows: License[]; total: number; page: number; pages: number; per: number; onPage: (n: number) => void; onPer: (n: number) => void; onView: (l: License) => void }

export default function LicenseTable({ rows, total, page, pages, per, onPage, onPer, onView }: Props) {
  return (
    <>
      {!rows.length ? <p className="p-8 text-center text-sm font-medium text-muted">No licenses match these filters.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead><tr className="border-b border-line bg-[#fafbfe]"><th className={th}>License key</th><th className={th}>Product</th><th className={th}>Customer</th><th className={th}>Type</th><th className={th}>Activations</th><th className={th}>Status</th><th className={th}>Created</th><th className={th}>Expires</th><th className={th}>Actions</th></tr></thead>
            <tbody>{rows.map((l) => (
              <tr key={l.id} className="border-b border-line/60 font-medium text-navy-deep last:border-0">
                <td className="whitespace-nowrap px-3 py-3 font-mono text-[13px]">{maskKey(l.key)}</td>
                <td className="px-3 py-3">{l.product}</td>
                <td className="px-3 py-3"><p className="font-semibold">{l.customer}</p><p className="text-xs text-muted">{l.email}</p></td>
                <td className="whitespace-nowrap px-3 py-3">{l.type}</td>
                <td className="whitespace-nowrap px-3 py-3">{l.used} / {l.max}</td>
                <td className="px-3 py-3"><StatusBadge value={l.state} /></td>
                <td className="whitespace-nowrap px-3 py-3 text-muted">{l.created}</td>
                <td className="whitespace-nowrap px-3 py-3 text-muted">{l.expires ?? 'Lifetime'}</td>
                <td className="px-3 py-3"><button type="button" onClick={() => onView(l)} className={`${btn.ghost} !px-3 !py-1.5 text-xs`}><Eye size={13} />View</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-[13px] font-medium text-muted">
        <span>Showing {total ? (page - 1) * per + 1 : 0}–{Math.min(page * per, total)} of {total} licenses</span>
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
