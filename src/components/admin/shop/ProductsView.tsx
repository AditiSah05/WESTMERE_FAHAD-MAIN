'use client'

import { CheckCircle2, Download, EyeOff, Globe, Package, Pencil, Plus, Search, ShoppingBag } from 'lucide-react'
import { useMemo, useState } from 'react'
import { downloadCsv } from '@/lib/admin/csv'
import { c } from '@/lib/admin/data/helpers'
import { money } from '@/lib/admin/format'
import { cn } from '@/lib/cn'
import Card from '../ui/Card'
import Drawer from '../ui/Drawer'
import PageHeader, { btn } from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import StatusBadge from '../ui/StatusBadge'
import ProductForm, { type Product } from './ProductForm'
import ProductInsights from './ProductInsights'
import Thumb from './Thumb'

const kinds: Record<string, string> = { website: 'Website', software: 'Software / app', service: 'Custom project' }
const sorts = { newest: 'Default', low: 'Price: low to high', high: 'Price: high to low', sold: 'Best selling' } as const
const field = 'rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const th = 'px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const pct = (n: number, t: number) => (t ? `${Math.round((n / t) * 1000) / 10}% of all products` : '')

export default function ProductsView({ rows, write }: { rows: Product[]; write: boolean }) {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState<keyof typeof sorts>('newest')
  const [edit, setEdit] = useState<Product | 'new' | null>(null)
  const cats = ['All', ...Array.from(new Set(rows.map((p) => p.category)))]
  const count = (k: string) => (k === 'All' ? rows.length : rows.filter((p) => p.category === k).length)

  const shown = useMemo(() => {
    const list = rows.filter((p) => (cat === 'All' || p.category === cat) && (status === 'All' || p.status === status) && `${p.name} ${p.id} ${p.tech}`.toLowerCase().includes(q.trim().toLowerCase()))
    return sort === 'low' ? list.sort((a, b) => a.price - b.price) : sort === 'high' ? list.sort((a, b) => b.price - a.price) : sort === 'sold' ? list.sort((a, b) => b.sold - a.sold) : list
  }, [rows, cat, status, q, sort])
  const clear = () => { setCat('All'); setStatus('All'); setQ(''); setSort('newest') }
  const pub = rows.filter((p) => p.status === 'Published').length
  const onPage = rows.filter((p) => p.on_page === 'Shown').length
  const exportCsv = () => downloadCsv('products', [c('name', 'Product'), c('id', 'ID'), c('category', 'Category'), c('price', 'Price'), c('sold', 'Paid orders'), c('revenue', 'Revenue'), c('status', 'Status'), c('on_page', 'Public page')], shown)

  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Add products and set their prices. They appear in the customer shop, and on the public Products page when shown."
        actions={<>{write && <button type="button" className={btn.gold} onClick={() => setEdit('new')}><Plus size={16} />Add New Product</button>}<button type="button" className={btn.ghost} onClick={exportCsv}><Download size={15} />Export</button></>}
      />
      <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-5">
        <StatCard label="Total Products" value={String(rows.length)} icon={Package} accent="blue" note="In the catalogue" />
        <StatCard label="Published" value={String(pub)} icon={CheckCircle2} accent="green" note={pct(pub, rows.length)} />
        <StatCard label="Hidden" value={String(rows.length - pub)} icon={EyeOff} accent="gold" note="Cannot be bought" />
        <StatCard label="On Public Page" value={String(onPage)} icon={Globe} accent="navy" note="Shown on the website" />
        <StatCard label="Units Sold" value={String(rows.reduce((a, p) => a + p.sold, 0))} icon={ShoppingBag} accent="gold" note="Paid orders" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {cats.map((k) => <button key={k} type="button" onClick={() => setCat(k)} className={cn('rounded-lg border px-3.5 py-2 text-[13px] font-semibold', cat === k ? 'border-navy-deep bg-navy-deep text-white' : 'border-line bg-white text-navy-deep hover:border-gold')}>{k} ({count(k)})</button>)}
      </div>
      <Card className="mt-4 overflow-hidden">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-line p-4">
          <label className="relative min-w-[200px] flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products by name, ID or tech…" className={`${field} w-full pl-9`} /></label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status" className={field}>{['All', 'Published', 'Hidden'].map((s) => <option key={s} value={s}>{s === 'All' ? 'Status: All' : s}</option>)}</select>
          <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} aria-label="Sort" className={field}>{Object.entries(sorts).map(([k, l]) => <option key={k} value={k}>Sort: {l}</option>)}</select>
          <button type="button" onClick={clear} className="text-[13px] font-semibold text-gold hover:underline">Clear Filters</button>
        </div>
        {!shown.length ? <p className="p-8 text-center text-sm font-medium text-muted">{rows.length ? 'No products match these filters.' : 'No products yet.'}</p> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead><tr className="border-b border-line bg-[#fafbfe]"><th className={th}>Product</th><th className={th}>Product ID</th><th className={th}>Category</th><th className={th}>Type</th><th className={th}>Price</th><th className={th}>Sales</th><th className={th}>Status</th><th className={th}>Public page</th>{write && <th className={th}>Actions</th>}</tr></thead>
              <tbody>{shown.map((p) => (
                <tr key={p.id} className="border-b border-line/60 font-medium text-navy-deep last:border-0">
                  <td className="px-3 py-3"><div className="flex items-center gap-3"><Thumb p={p} /><div className="min-w-0"><p className="truncate font-semibold">{p.name}</p><p className="max-w-[220px] truncate text-xs text-muted">{p.description || 'No description yet'}</p></div></div></td>
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-[13px] text-muted">{p.id}</td>
                  <td className="whitespace-nowrap px-3 py-3"><span className="rounded-full bg-sky px-2.5 py-1 text-xs font-semibold text-blue">{p.category}</span></td>
                  <td className="whitespace-nowrap px-3 py-3">{kinds[p.kind] ?? p.kind}</td>
                  <td className="whitespace-nowrap px-3 py-3">{money(p.price)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{p.sold}</td>
                  <td className="px-3 py-3"><StatusBadge value={p.status} /></td>
                  <td className="px-3 py-3"><StatusBadge value={p.on_page} tone={p.on_page === 'Shown' ? 'green' : 'gray'} /></td>
                  {write && <td className="px-3 py-3"><button type="button" onClick={() => setEdit(p)} className={`${btn.ghost} !px-3 !py-1.5 text-xs`}><Pencil size={13} />Edit</button></td>}
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        <p className="border-t border-line px-4 py-3 text-[13px] font-medium text-muted">Showing {shown.length} of {rows.length} products</p>
      </Card>
      <ProductInsights rows={rows} />
      <Drawer open={edit !== null} title={edit === 'new' ? 'Add New Product' : 'Edit product'} onClose={() => setEdit(null)}>
        {edit !== null && <ProductForm key={edit === 'new' ? 'new' : edit.id} p={edit === 'new' ? undefined : edit} onDone={() => setEdit(null)} />}
      </Drawer>
    </>
  )
}
