import { Download } from 'lucide-react'
import Card from '@/components/admin/ui/Card'
import PageHeader from '@/components/admin/ui/PageHeader'
import StatusBadge from '@/components/admin/ui/StatusBadge'
import type { customerDownloads } from '@/lib/server/licenses'

type Data = Awaited<ReturnType<typeof customerDownloads>>
const th = 'px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const h = 'mb-3 text-lg font-semibold tracking-[-0.02em] text-navy-deep'

/** Files this customer may download right now, their download history and release notes. */
export default function DownloadsPanel({ d }: { d: Data }) {
  return (
    <>
      <PageHeader title="Downloads & Files" subtitle="Files for the products you have bought. New versions and release notes appear here." />
      <Card className="overflow-hidden">
        {!d.open.length ? <p className="p-8 text-center text-sm font-medium text-muted">Nothing to download yet. Files appear here once a paid order is confirmed or a license is issued for you.</p> : (
          <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-sm">
            <thead><tr className="border-b border-line bg-[#fafbfe]"><th className={th}>File</th><th className={th}>Product</th><th className={th}>Version</th><th className={th}>Format</th><th className={th}>Size</th><th className={th} /></tr></thead>
            <tbody>{d.open.map((p) => (
              <tr key={p.id} className="border-b border-line/60 font-medium text-navy-deep last:border-0"><td className="px-3 py-3 font-semibold">{p.name}</td><td className="px-3 py-3">{p.product}</td><td className="px-3 py-3 font-mono text-[13px]">{p.version}</td><td className="px-3 py-3">{p.format}</td><td className="px-3 py-3">{p.size || '—'}</td>
                <td className="px-3 py-3 text-right"><a href={`/account/download/${p.id}`} className="inline-flex items-center gap-1.5 rounded-lg bg-navy-deep px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-gold"><Download size={14} />Download</a></td></tr>
            ))}</tbody>
          </table></div>
        )}
      </Card>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1025px]:grid-cols-2">
        <Card className="p-5"><h2 className={h}>Release Notes</h2>
          {!d.notes.length ? <p className="text-sm font-medium text-muted">No release notes yet.</p> : <ul className="flex flex-col divide-y divide-line/60">{d.notes.map((n) => <li key={n.id} className="py-2.5 text-sm font-medium text-navy-deep"><p><b>{n.product}</b> <span className="font-mono text-[13px]">{n.version}</span> <span className="text-muted">· {n.date}</span></p><p className="text-muted">{n.notes || '—'}</p></li>)}</ul>}
        </Card>
        <Card className="p-5"><h2 className={h}>Download History</h2>
          {!d.history.length ? <p className="text-sm font-medium text-muted">You have not downloaded anything yet.</p> : <ul className="flex flex-col divide-y divide-line/60">{d.history.map((r) => <li key={r.id} className="flex items-center justify-between gap-3 py-2.5 text-sm font-medium text-navy-deep"><span className="min-w-0"><span className="block truncate font-semibold">{r.file}{r.version && ` (${r.version})`}</span><span className="text-xs text-muted">{r.at}</span></span><StatusBadge value={r.status === 'Success' ? 'Success' : 'Failed'} /></li>)}</ul>}
        </Card>
      </div>
    </>
  )
}
