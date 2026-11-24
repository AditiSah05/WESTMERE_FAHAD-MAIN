import { Boxes, Eye, Layers, Network, Pencil, Star, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { Category } from '@/lib/server/categories'
import StatusBadge from '../ui/StatusBadge'

export type CatActions = { write: boolean; onEdit: (c: Category) => void; onFeature: (c: Category) => void; onDelete: (c: Category) => void }
const icon = 'flex size-8 items-center justify-center rounded-lg border border-line text-slate hover:border-gold hover:text-navy-deep'
const viewHref = (c: Category) => `/admin/shop/products?category=${encodeURIComponent(c.name)}`

function Buttons({ c, a }: { c: Category; a: CatActions }) {
  return (
    <div className="flex items-center gap-1.5">
      <Link href={viewHref(c)} aria-label={`View products in ${c.name}`} className={icon}><Eye size={15} /></Link>
      {a.write && <>
        <button type="button" onClick={() => a.onEdit(c)} aria-label={`Edit ${c.name}`} className={icon}><Pencil size={14} /></button>
        <button type="button" onClick={() => a.onFeature(c)} aria-label={c.featured ? `Remove ${c.name} from featured` : `Feature ${c.name}`} aria-pressed={c.featured} className={icon}><Star size={14} className={c.featured ? 'fill-gold text-gold' : ''} /></button>
        <button type="button" onClick={() => a.onDelete(c)} aria-label={`Delete ${c.name}`} className={cn(icon, 'hover:!border-[#ef4444] hover:!text-[#b91c1c]')}><Trash2 size={14} /></button>
      </>}
    </div>
  )
}

export function CategoryCards({ rows, parents, a }: { rows: Category[]; parents: Record<string, string>; a: CatActions }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 min-[701px]:grid-cols-2 min-[1181px]:grid-cols-3">
      {rows.map((c) => (
        <div key={c.id} className="flex flex-col gap-3 rounded-[10px] border border-line bg-white p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-11 flex-none items-center justify-center rounded-xl bg-sky text-blue"><Layers size={20} /></span>
            <div className="min-w-0 flex-1"><p className="truncate text-[16px] font-semibold text-navy-deep">{c.name}</p><p className="truncate text-xs font-medium text-muted">/{c.id}{c.parent ? ` · in ${parents[c.parent] ?? c.parent}` : ''}</p></div>
            <div className="flex flex-col items-end gap-1">{c.featured && <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-[#8a6420]"><Star size={11} className="fill-gold text-gold" />Featured</span>}<StatusBadge value={c.active ? 'Published' : 'Draft'} /></div>
          </div>
          <p className="line-clamp-2 min-h-[2.5rem] text-[13px] font-medium text-slate">{c.description || 'No description yet.'}</p>
          <div className="flex gap-6 text-sm font-semibold text-navy-deep"><span className="flex items-center gap-2"><Boxes size={16} className="text-muted" />{c.products}<span className="text-xs font-medium text-muted">Products</span></span><span className="flex items-center gap-2"><Network size={16} className="text-muted" />{c.children}<span className="text-xs font-medium text-muted">Subcategories</span></span></div>
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-line/60 pt-3"><span className="text-xs font-medium text-muted">Order: {c.sort} | Updated: {c.updated}</span><Buttons c={c} a={a} /></div>
        </div>
      ))}
    </div>
  )
}

export function CategoryTable({ rows, parents, a }: { rows: Category[]; parents: Record<string, string>; a: CatActions }) {
  const th = 'px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-sm">
        <thead><tr className="border-b border-line bg-[#fafbfe]"><th className={th}>Category</th><th className={th}>Parent</th><th className={th}>Products</th><th className={th}>Subcategories</th><th className={th}>Order</th><th className={th}>Status</th><th className={th}>Updated</th><th className={th}>Actions</th></tr></thead>
        <tbody>{rows.map((c) => (
          <tr key={c.id} className="border-b border-line/60 font-medium text-navy-deep last:border-0">
            <td className="px-3 py-3"><span className="font-semibold">{c.name}</span>{c.featured && <Star size={13} className="ml-1.5 inline fill-gold text-gold" />}<p className="text-xs text-muted">/{c.id}</p></td>
            <td className="px-3 py-3 text-muted">{c.parent ? parents[c.parent] ?? c.parent : '—'}</td><td className="px-3 py-3">{c.products}</td><td className="px-3 py-3">{c.children}</td><td className="px-3 py-3">{c.sort}</td>
            <td className="px-3 py-3"><StatusBadge value={c.active ? 'Published' : 'Draft'} /></td><td className="whitespace-nowrap px-3 py-3 text-muted">{c.updated}</td><td className="px-3 py-3"><Buttons c={c} a={a} /></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}
