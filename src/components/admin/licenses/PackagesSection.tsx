import { Pencil, Plus, Trash2 } from 'lucide-react'
import type { Pkg, Version } from '@/lib/server/licenses'
import Card from '../ui/Card'
import StatusBadge from '../ui/StatusBadge'

const h = 'text-lg font-semibold tracking-[-0.02em] text-navy-deep'
const th = 'px-3 py-2 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const icon = 'flex size-8 items-center justify-center rounded-lg border border-line text-slate hover:border-gold hover:text-navy-deep'
const add = 'inline-flex items-center gap-1.5 text-[13px] font-semibold text-gold hover:underline'
type Dl = { id: string; customer: string; file: string; version: string; status: string; at: string }

export function PackagesCard({ rows, write, onAdd, onEdit, onDelete }: { rows: Pkg[]; write: boolean; onAdd: () => void; onEdit: (p: Pkg) => void; onDelete: (p: Pkg) => void }) {
  return (
    <Card className="p-5 min-[1181px]:col-span-3">
      <div className="mb-3 flex items-center justify-between"><h2 className={h}>Digital Download Packages</h2>{write && <button type="button" onClick={onAdd} className={add}><Plus size={14} />Add Package</button>}</div>
      {!rows.length ? <p className="text-sm font-medium text-muted">Add a package: a download link for one of your products, with who may download it.</p> : (
        <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-sm">
          <thead><tr><th className={th}>Package</th><th className={th}>Format / size</th><th className={th}>Version</th><th className={th}>Availability</th><th className={th}>Status</th><th className={th}>Downloads</th>{write && <th className={th} />}</tr></thead>
          <tbody>{rows.map((p) => (
            <tr key={p.id} className="border-t border-line/60 font-medium text-navy-deep"><td className="min-w-[200px] px-3 py-2.5"><p className="font-semibold">{p.name}</p><p className="text-xs text-muted">{p.product}</p></td><td className="whitespace-nowrap px-3 py-2.5">{p.format}{p.size && <span className="text-muted"> · {p.size}</span>}</td><td className="px-3 py-2.5 font-mono text-[13px]">{p.version}</td><td className="whitespace-nowrap px-3 py-2.5">{p.availability}</td><td className="px-3 py-2.5"><StatusBadge value={p.published ? 'Published' : 'Draft'} /></td><td className="px-3 py-2.5">{p.downloads}</td>
              {write && <td className="px-3 py-2.5"><div className="flex gap-1.5"><button type="button" onClick={() => onEdit(p)} aria-label={`Edit ${p.name}`} className={icon}><Pencil size={14} /></button><button type="button" onClick={() => onDelete(p)} aria-label={`Delete ${p.name}`} className={icon}><Trash2 size={14} /></button></div></td>}</tr>
          ))}</tbody>
        </table></div>
      )}
    </Card>
  )
}

export function DownloadActivity({ rows }: { rows: Dl[] }) {
  return (
    <Card className="p-5 min-[1181px]:col-span-2">
      <h2 className={`${h} mb-3`}>Recent Download Activity</h2>
      {!rows.length ? <p className="text-sm font-medium text-muted">Downloads by customers appear here, including refused attempts.</p> : (
        <ul className="flex flex-col divide-y divide-line/60">{rows.map((r) => <li key={r.id} className="flex items-center justify-between gap-3 py-2.5 text-sm font-medium text-navy-deep"><span className="min-w-0"><span className="block truncate font-semibold">{r.customer}</span><span className="block truncate text-xs text-muted">{r.file}{r.version && ` (${r.version})`} · {r.at}</span></span><StatusBadge value={r.status === 'Success' ? 'Success' : 'Failed'} /></li>)}</ul>
      )}
    </Card>
  )
}

export function VersionsCard({ rows, write, onAdd, onDelete }: { rows: Version[]; write: boolean; onAdd: () => void; onDelete: (v: Version) => void }) {
  return (
    <Card className="mt-4 p-5">
      <div className="mb-3 flex items-center justify-between"><h2 className={h}>Version Updates</h2>{write && <button type="button" onClick={onAdd} className={add}><Plus size={14} />Add Version</button>}</div>
      {!rows.length ? <p className="text-sm font-medium text-muted">Add a version to tell customers what changed. Customers with access see these as release notes.</p> : (
        <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-sm">
          <thead><tr><th className={th}>Product / package</th><th className={th}>Version</th><th className={th}>Release date</th><th className={th}>Update notes</th><th className={th}>Status</th>{write && <th className={th} />}</tr></thead>
          <tbody>{rows.map((v) => (
            <tr key={v.id} className="border-t border-line/60 font-medium text-navy-deep"><td className="px-3 py-2.5"><p className="font-semibold">{v.product}</p><p className="text-xs text-muted">{v.package}</p></td><td className="px-3 py-2.5 font-mono text-[13px]">{v.version}{v.latest && <span className="ml-2 rounded bg-gold/15 px-1.5 text-[10px] font-bold uppercase text-[#8a6420]">Current</span>}</td><td className="whitespace-nowrap px-3 py-2.5 text-muted">{v.date}</td><td className="max-w-[360px] px-3 py-2.5 text-muted">{v.notes || '—'}</td><td className="px-3 py-2.5"><StatusBadge value={v.status} tone={v.status === 'Scheduled' ? 'blue' : 'green'} /></td>
              {write && <td className="px-3 py-2.5"><button type="button" onClick={() => onDelete(v)} aria-label={`Delete version ${v.version}`} className={icon}><Trash2 size={14} /></button></td>}</tr>
          ))}</tbody>
        </table></div>
      )}
    </Card>
  )
}
