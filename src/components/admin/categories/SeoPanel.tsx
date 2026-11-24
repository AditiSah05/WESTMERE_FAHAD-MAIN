import { Pencil } from 'lucide-react'
import { SEO_LABELS, seoHealth, seoStatus } from '@/lib/seo-health'
import type { Category } from '@/lib/server/categories'
import Card from '../ui/Card'
import Donut from '../charts/Donut'
import StatusBadge from '../ui/StatusBadge'

const colors = ['#10b981', '#c4943d', '#f97316', '#ef4444']
const tone = { Complete: 'green', 'Needs improvement': 'amber', 'Missing meta description': 'amber', 'Duplicate title': 'red' } as const

export function SeoHealth({ rows }: { rows: Category[] }) {
  const { counts, score } = seoHealth(rows)
  return (
    <Card className="p-5">
      <h2 className="mb-1 text-lg font-semibold tracking-[-0.02em] text-navy-deep">SEO Health</h2>
      <p className="mb-3 text-[13px] font-medium text-muted">Based on each category&apos;s page title and meta description.</p>
      {!rows.length ? <p className="text-sm font-medium text-muted">Add categories to see their SEO health.</p> : (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Donut parts={SEO_LABELS.map((l, i) => ({ label: l, value: counts[l], color: colors[i] })).filter((p) => p.value > 0)} center={`${score}%`} legend={false} />
          <ul className="flex min-w-[200px] flex-1 flex-col gap-2 text-sm font-medium text-navy-deep">
            {SEO_LABELS.map((l, i) => <li key={l} className="flex items-center justify-between gap-3"><span className="flex items-center gap-2"><i className="size-2.5 rounded-full" style={{ background: colors[i] }} />{l}</span><b>{counts[l]}</b></li>)}
          </ul>
        </div>
      )}
    </Card>
  )
}

/** The "Category SEO" tab: one row per category with what is missing. */
export function SeoTable({ rows, all, write, onEdit }: { rows: Category[]; all: Category[]; write: boolean; onEdit: (c: Category) => void }) {
  const th = 'px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-sm">
        <thead><tr className="border-b border-line bg-[#fafbfe]"><th className={th}>Category</th><th className={th}>Page title</th><th className={th}>Meta description</th><th className={th}>SEO status</th>{write && <th className={th}>Actions</th>}</tr></thead>
        <tbody>{rows.map((c) => { const st = seoStatus(c, all); return (
          <tr key={c.id} className="border-b border-line/60 font-medium text-navy-deep last:border-0">
            <td className="px-3 py-3 font-semibold">{c.name}</td>
            <td className="max-w-[240px] truncate px-3 py-3 text-muted">{c.seoTitle || 'Not set'} <span className="text-xs">({c.seoTitle.length})</span></td>
            <td className="max-w-[300px] truncate px-3 py-3 text-muted">{c.seoDescription || 'Not set'} <span className="text-xs">({c.seoDescription.length})</span></td>
            <td className="px-3 py-3"><StatusBadge value={st} tone={tone[st]} /></td>
            {write && <td className="px-3 py-3"><button type="button" onClick={() => onEdit(c)} aria-label={`Edit SEO for ${c.name}`} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:border-gold"><Pencil size={13} />Edit</button></td>}
          </tr>
        ) })}</tbody>
      </table>
    </div>
  )
}
