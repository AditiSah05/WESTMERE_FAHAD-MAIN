import { Award, CalendarPlus, ExternalLink, Pencil, Plus, Repeat, Star, Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { Collection } from '@/lib/server/categories'
import Card from '../ui/Card'
import StatusBadge from '../ui/StatusBadge'

const icon = 'flex size-8 items-center justify-center rounded-lg border border-line text-slate hover:border-gold hover:text-navy-deep'
const autoIcons = [Award, CalendarPlus, Star, Repeat]
type Auto = { name: string; note: string; count: number }

/** Hand-picked collections (editable, shown on the website) next to the automatic ones. */
export default function CollectionsSection({ items, auto, write, onCreate, onEdit, onDelete }: { items: Collection[]; auto: Auto[]; write: boolean; onCreate: () => void; onEdit: (c: Collection) => void; onDelete: (c: Collection) => void }) {
  return (
    <Card className="mt-4 p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-lg font-semibold tracking-[-0.02em] text-navy-deep">Collections</h2><p className="text-[13px] font-medium text-muted">Hand-picked groups of products with their own page on the website, plus automatic ones that fill themselves.</p></div>
        {write && <button type="button" onClick={onCreate} className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-[#b3862f]"><Plus size={16} />Create Collection</button>}
      </div>
      <div className="grid grid-cols-1 gap-3 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        {items.map((c) => (
          <div key={c.id} className="flex flex-col gap-2 rounded-xl border border-line bg-white p-4">
            <div className="flex items-start justify-between gap-2"><p className="text-sm font-semibold text-navy-deep">{c.name}{c.featured && <Star size={13} className="ml-1.5 inline fill-gold text-gold" />}</p><StatusBadge value={c.active ? 'Published' : 'Draft'} /></div>
            <p className="line-clamp-2 min-h-[2.2rem] text-xs font-medium text-muted">{c.description || 'No description yet.'}</p>
            <p className="text-xs font-semibold text-navy-deep">{c.productIds.length} Product{c.productIds.length === 1 ? '' : 's'}</p>
            <div className="mt-auto flex gap-1.5 pt-1">
              <Link href={`/product/collection/${c.id}`} target="_blank" aria-label={`View ${c.name} on the website`} className={icon}><ExternalLink size={14} /></Link>
              {write && <><button type="button" onClick={() => onEdit(c)} aria-label={`Edit ${c.name}`} className={icon}><Pencil size={14} /></button><button type="button" onClick={() => onDelete(c)} aria-label={`Delete ${c.name}`} className={icon}><Trash2 size={14} /></button></>}
            </div>
          </div>
        ))}
        {auto.map((c, i) => { const I = autoIcons[i % autoIcons.length]; return (
          <div key={c.name} className="rounded-xl bg-[linear-gradient(135deg,#f6efe0,#e8eff9)] p-4 text-center"><I size={22} className="mx-auto text-gold" /><p className="mt-2 text-sm font-semibold text-navy-deep">{c.name}</p><p className="text-xs font-medium text-muted">{c.count} Product{c.count === 1 ? '' : 's'}</p><p className="mt-1 text-[11px] font-medium text-muted">Automatic · {c.note}</p></div>
        ) })}
      </div>
    </Card>
  )
}
