import { Pencil, Star } from 'lucide-react'
import { money } from '@/lib/admin/format'
import { cn } from '@/lib/cn'
import { btn } from '../ui/PageHeader'
import StatusBadge from '../ui/StatusBadge'
import type { Product } from './ProductForm'
import Thumb from './Thumb'

const kinds: Record<string, string> = { website: 'Website', software: 'Software / app', service: 'Custom project' }
const th = 'px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const td = 'whitespace-nowrap px-3 py-3'

type Props = { rows: Product[]; write: boolean; selected: Set<string>; onToggle: (id: string) => void; onToggleAll: () => void; onEdit: (p: Product) => void; onFeature: (p: Product) => void }

export default function ProductTable({ rows, write, selected, onToggle, onToggleAll, onEdit, onFeature }: Props) {
  const allOn = rows.length > 0 && rows.every((p) => selected.has(p.id))
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] text-sm">
        <thead><tr className="border-b border-line bg-[#fafbfe]">
          {write && <th className="w-10 px-3 py-3"><input type="checkbox" checked={allOn} onChange={onToggleAll} aria-label="Select all" className="size-4" /></th>}
          <th className={th}>Product</th><th className={th}>Product ID</th><th className={th}>Category</th><th className={th}>Type</th><th className={th}>Pricing</th><th className={th}>Price</th><th className={th}>Sales</th><th className={th}>Status</th><th className={th}>Public page</th><th className={th}>Featured</th>{write && <th className={th}>Actions</th>}
        </tr></thead>
        <tbody>{rows.map((p) => (
          <tr key={p.id} className={cn('border-b border-line/60 font-medium text-navy-deep last:border-0', selected.has(p.id) && 'bg-gold/5')}>
            {write && <td className="px-3 py-3"><input type="checkbox" checked={selected.has(p.id)} onChange={() => onToggle(p.id)} aria-label={`Select ${p.name}`} className="size-4" /></td>}
            <td className="px-3 py-3"><div className="flex items-center gap-3"><Thumb p={p} /><div className="min-w-0"><p className="truncate font-semibold">{p.name}</p><p className="max-w-[220px] truncate text-xs text-muted">{p.description || 'No description yet'}</p></div></div></td>
            <td className={`${td} font-mono text-[13px] text-muted`}>{p.id}</td>
            <td className={td}><span className="rounded-full bg-sky px-2.5 py-1 text-xs font-semibold text-blue">{p.category}</span></td>
            <td className={td}>{kinds[p.kind] ?? p.kind}</td>
            <td className={td}>{p.pricing}</td>
            <td className={td}>{money(p.price)}</td>
            <td className={td}>{p.sold}</td>
            <td className="px-3 py-3"><StatusBadge value={p.status} /></td>
            <td className="px-3 py-3"><StatusBadge value={p.on_page} tone={p.on_page === 'Shown' ? 'green' : 'gray'} /></td>
            <td className="px-3 py-3">{write ? <button type="button" onClick={() => onFeature(p)} aria-label={p.featured ? `Remove ${p.name} from featured` : `Feature ${p.name}`} aria-pressed={p.featured}><Star size={18} className={p.featured ? 'fill-gold text-gold' : 'text-[#cbd5e1] hover:text-gold'} /></button> : <Star size={18} className={p.featured ? 'fill-gold text-gold' : 'text-[#cbd5e1]'} />}</td>
            {write && <td className="px-3 py-3"><button type="button" onClick={() => onEdit(p)} className={`${btn.ghost} !px-3 !py-1.5 text-xs`}><Pencil size={13} />Edit</button></td>}
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}
