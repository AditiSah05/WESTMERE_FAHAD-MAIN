import { Pencil, Star } from 'lucide-react'
import { money } from '@/lib/admin/format'
import { cn } from '@/lib/cn'
import { btn } from '../ui/PageHeader'
import StatusBadge from '../ui/StatusBadge'
import type { Product } from './ProductForm'
import Thumb from './Thumb'

type Props = { rows: Product[]; write: boolean; selected: Set<string>; onToggle: (id: string) => void; onEdit: (p: Product) => void }

/** Grid view: the same products as cards. */
export default function ProductCards({ rows, write, selected, onToggle, onEdit }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-3">
      {rows.map((p) => (
        <div key={p.id} className={cn('flex flex-col gap-3 rounded-[10px] border border-line p-4', selected.has(p.id) && 'border-gold bg-gold/5')}>
          <div className="flex items-start gap-3">
            <Thumb p={p} />
            <div className="min-w-0 flex-1"><p className="truncate font-semibold text-navy-deep">{p.name}</p><p className="text-xs font-medium text-muted">{p.category} · {p.pricing}</p></div>
            {p.featured && <Star size={16} className="fill-gold text-gold" aria-label="Featured" />}
            {write && <input type="checkbox" checked={selected.has(p.id)} onChange={() => onToggle(p.id)} aria-label={`Select ${p.name}`} className="size-4" />}
          </div>
          <p className="line-clamp-2 text-xs font-medium text-muted">{p.description || 'No description yet'}</p>
          <div className="mt-auto flex items-center justify-between gap-2"><b className="text-lg text-navy-deep">{money(p.price)}</b><span className="text-xs font-medium text-muted">{p.sold} sold</span><StatusBadge value={p.status} /></div>
          {write && <button type="button" onClick={() => onEdit(p)} className={`${btn.ghost} justify-center !py-1.5 text-xs`}><Pencil size={13} />Edit</button>}
        </div>
      ))}
    </div>
  )
}
