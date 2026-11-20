'use client'

import { CheckCircle2, ChevronLeft, ChevronRight, Download, EyeOff, Globe, LayoutGrid, List, Package, Plus, Search, ShoppingBag, Upload } from 'lucide-react'
import { useMemo, useState, useTransition } from 'react'
import { bulkProducts } from '@/app/admin/shop-actions'
import { downloadCsv } from '@/lib/admin/csv'
import { c } from '@/lib/admin/data/helpers'
import { cn } from '@/lib/cn'
import Card from '../ui/Card'
import Drawer from '../ui/Drawer'
import PageHeader, { btn } from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import BulkBar from './BulkBar'
import ImportPanel from './ImportPanel'
import ProductCards from './ProductCards'
import ProductForm, { type Product } from './ProductForm'
import ProductInsights from './ProductInsights'
import ProductTable from './ProductTable'

const sorts = { newest: 'Default', recent: 'Recently added', low: 'Price: low to high', high: 'Price: high to low', sold: 'Best selling' } as const
const field = 'rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const pct = (n: number, t: number) => (t ? `${Math.round((n / t) * 1000) / 10}% of all products` : '')

export default function ProductsView({ rows, write, initialQ = '' }: { rows: Product[]; write: boolean; initialQ?: string }) {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState(initialQ)
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState<keyof typeof sorts>('newest')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [per, setPer] = useState(10)
  const [page, setPage] = useState(1)
  const [sel, setSel] = useState<Set<string>>(new Set())
  const [edit, setEdit] = useState<Product | 'new' | null>(null)
  const [importing, setImporting] = useState(false)
  const [, start] = useTransition()
  const cats = ['All', ...Array.from(new Set(rows.map((p) => p.category)))]
  const count = (k: string) => (k === 'All' ? rows.length : rows.filter((p) => p.category === k).length)

  const shown = useMemo(() => {
    const list = rows.filter((p) => (cat === 'All' || p.category === cat) && (status === 'All' || p.status === status) && `${p.name} ${p.id} ${p.tech}`.toLowerCase().includes(q.trim().toLowerCase()))
    const by = { low: (a: Product, b: Product) => a.price - b.price, high: (a: Product, b: Product) => b.price - a.price, sold: (a: Product, b: Product) => b.sold - a.sold, recent: (a: Product, b: Product) => b.added.localeCompare(a.added) }
    return sort === 'newest' ? list : list.sort(by[sort])
  }, [rows, cat, status, q, sort])
  const pages = Math.max(1, Math.ceil(shown.length / per))
  const cur = Math.min(page, pages)
  const visible = shown.slice((cur - 1) * per, cur * per)
  const reset = <T,>(set: (v: T) => void) => (v: T) => { set(v); setPage(1) }
  const clear = () => { setCat('All'); setStatus('All'); setQ(''); setSort('newest'); setPage(1) }
  const toggle = (id: string) => setSel((s) => { const n = new Set(s); if (!n.delete(id)) n.add(id); return n })
  const toggleAll = () => setSel((s) => (visible.every((p) => s.has(p.id)) ? new Set([...s].filter((i) => !visible.some((p) => p.id === i))) : new Set([...s, ...visible.map((p) => p.id)])))
  const feature = (p: Product) => start(async () => { await bulkProducts([p.id], p.featured ? 'unfeature' : 'feature') })
  const exportRows = (list: Product[]) => downloadCsv('products', [c('name', 'Product'), c('id', 'ID'), c('category', 'Category'), c('pricing', 'Pricing'), c('price', 'Price'), c('sold', 'Paid orders'), c('revenue', 'Revenue'), c('status', 'Status'), c('on_page', 'Public page'), c('added', 'Added')], list)
  const pub = rows.filter((p) => p.status === 'Published').length

  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Add products and set their prices. They appear in the customer shop, and on the public Products page when shown."
        actions={<>{write && <button type="button" className={btn.gold} onClick={() => setEdit('new')}><Plus size={16} />Add New Product</button>}{write && <button type="button" className={btn.ghost} onClick={() => setImporting(true)}><Upload size={15} />Import</button>}<button type="button" className={btn.ghost} onClick={() => exportRows(shown)}><Download size={15} />Export</button></>}
      />
      <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-5">
        <StatCard label="Total Products" value={String(rows.length)} icon={Package} accent="blue" note="In the catalogue" />
        <StatCard label="Published" value={String(pub)} icon={CheckCircle2} accent="green" note={pct(pub, rows.length)} />
        <StatCard label="Hidden" value={String(rows.length - pub)} icon={EyeOff} accent="gold" note="Cannot be bought" />
        <StatCard label="On Public Page" value={String(rows.filter((p) => p.on_page === 'Shown').length)} icon={Globe} accent="navy" note="Shown on the website" />
        <StatCard label="Units Sold" value={String(rows.reduce((a, p) => a + p.sold, 0))} icon={ShoppingBag} accent="gold" note="Paid orders" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {cats.map((k) => <button key={k} type="button" onClick={() => reset(setCat)(k)} className={cn('rounded-lg border px-3.5 py-2 text-[13px] font-semibold', cat === k ? 'border-navy-deep bg-navy-deep text-white' : 'border-line bg-white text-navy-deep hover:border-gold')}>{k} ({count(k)})</button>)}
      </div>
      <Card className="mt-4 overflow-hidden">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-line p-4">
          <label className="relative min-w-[200px] flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input value={q} onChange={(e) => reset(setQ)(e.target.value)} placeholder="Search products by name, ID or tech…" className={`${field} w-full pl-9`} /></label>
          <select value={status} onChange={(e) => reset(setStatus)(e.target.value)} aria-label="Status" className={field}>{['All', 'Published', 'Hidden'].map((s) => <option key={s} value={s}>{s === 'All' ? 'Status: All' : s}</option>)}</select>
          <select value={sort} onChange={(e) => reset(setSort)(e.target.value as keyof typeof sorts)} aria-label="Sort" className={field}>{Object.entries(sorts).map(([k, l]) => <option key={k} value={k}>Sort: {l}</option>)}</select>
          <div className="flex rounded-lg border border-line p-0.5" role="group" aria-label="View">
            {([['list', List], ['grid', LayoutGrid]] as const).map(([k, I]) => <button key={k} type="button" onClick={() => setView(k)} aria-label={`${k} view`} aria-pressed={view === k} className={cn('flex size-8 items-center justify-center rounded-md', view === k ? 'bg-gold text-white' : 'text-slate hover:bg-paper')}><I size={16} /></button>)}
          </div>
          <button type="button" onClick={clear} className="text-[13px] font-semibold text-gold hover:underline">Clear Filters</button>
        </div>
        {write && sel.size > 0 && <BulkBar ids={[...sel]} names={Object.fromEntries(rows.map((p) => [p.id, p.name]))} onDone={() => setSel(new Set())} onExport={() => exportRows(rows.filter((p) => sel.has(p.id)))} />}
        {!visible.length ? <p className="p-8 text-center text-sm font-medium text-muted">{rows.length ? 'No products match these filters.' : 'No products yet.'}</p>
          : view === 'list' ? <ProductTable rows={visible} write={write} selected={sel} onToggle={toggle} onToggleAll={toggleAll} onEdit={setEdit} onFeature={feature} />
          : <ProductCards rows={visible} write={write} selected={sel} onToggle={toggle} onEdit={setEdit} />}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-[13px] font-medium text-muted">
          <span>Showing {shown.length ? (cur - 1) * per + 1 : 0}–{Math.min(cur * per, shown.length)} of {shown.length} products</span>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5">Rows per page<select value={per} onChange={(e) => { setPer(Number(e.target.value)); setPage(1) }} className={`${field} !py-1`}>{[10, 25, 50].map((n) => <option key={n}>{n}</option>)}</select></label>
            <button type="button" onClick={() => setPage(cur - 1)} disabled={cur <= 1} aria-label="Previous page" className="flex size-8 items-center justify-center rounded-lg border border-line disabled:opacity-40"><ChevronLeft size={15} /></button>
            <span className="min-w-[52px] text-center text-navy-deep">{cur} / {pages}</span>
            <button type="button" onClick={() => setPage(cur + 1)} disabled={cur >= pages} aria-label="Next page" className="flex size-8 items-center justify-center rounded-lg border border-line disabled:opacity-40"><ChevronRight size={15} /></button>
          </div>
        </div>
      </Card>
      <ProductInsights rows={rows} />
      <Drawer open={edit !== null} title={edit === 'new' ? 'Add New Product' : 'Edit product'} onClose={() => setEdit(null)}>
        {edit !== null && <ProductForm key={edit === 'new' ? 'new' : edit.id} p={edit === 'new' ? undefined : edit} onDone={() => setEdit(null)} />}
      </Drawer>
      <Drawer open={importing} title="Import products" onClose={() => setImporting(false)}>{importing && <ImportPanel onDone={() => setImporting(false)} />}</Drawer>
    </>
  )
}
