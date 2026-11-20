'use client'

import { CheckCircle2, Download, Layers, LayoutGrid, List, Network, PackageX, Plus, Search, Star } from 'lucide-react'
import { useMemo, useState, useTransition } from 'react'
import { deleteCategory, setCategoryFlag } from '@/app/admin/category-actions'
import { downloadCsv } from '@/lib/admin/csv'
import { c as col } from '@/lib/admin/data/helpers'
import { cn } from '@/lib/cn'
import type { Category } from '@/lib/server/categories'
import Card from '../ui/Card'
import Drawer from '../ui/Drawer'
import PageHeader, { btn } from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import CategoryForm from './CategoryForm'
import { CategoryCards, CategoryTable } from './CategoryCards'
import CategoryInsights from './CategoryInsights'

const sorts = { order: 'Display Order', name: 'Name', products: 'Most products' } as const
const field = 'rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const tabs = [['all', 'All Categories'], ['main', 'Main Categories'], ['sub', 'Subcategories'], ['featured', 'Featured']] as const
type Collections = { name: string; note: string; count: number }[]

export default function CategoriesView({ rows, unassigned, collections, write }: { rows: Category[]; unassigned: number; collections: Collections; write: boolean }) {
  const [tab, setTab] = useState<(typeof tabs)[number][0]>('all')
  const [q, setQ] = useState('')
  const [parent, setParent] = useState('All')
  const [status, setStatus] = useState('All')
  const [feat, setFeat] = useState('All')
  const [sort, setSort] = useState<keyof typeof sorts>('order')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [edit, setEdit] = useState<Category | 'new' | null>(null)
  const [err, setErr] = useState('')
  const [, start] = useTransition()
  const mains = rows.filter((r) => !r.parent)
  const names = Object.fromEntries(rows.map((r) => [r.id, r.name]))
  const subs = rows.filter((r) => r.parent).length
  const active = rows.filter((r) => r.active).length
  const inTab = (r: Category, t: string) => t === 'all' || (t === 'main' && !r.parent) || (t === 'sub' && !!r.parent) || (t === 'featured' && r.featured)

  const shown = useMemo(() => {
    const list = rows.filter((r) => inTab(r, tab) && (parent === 'All' || (parent === 'None' ? !r.parent : r.parent === parent)) && (status === 'All' || (status === 'Published') === r.active) && (feat === 'All' || (feat === 'Featured') === r.featured) && `${r.name} ${r.id}`.toLowerCase().includes(q.trim().toLowerCase()))
    return sort === 'order' ? list : list.sort(sort === 'name' ? (a, b) => a.name.localeCompare(b.name) : (a, b) => b.products - a.products)
  }, [rows, tab, parent, status, feat, q, sort])
  const clear = () => { setTab('all'); setQ(''); setParent('All'); setStatus('All'); setFeat('All'); setSort('order') }
  const actions = {
    write, onEdit: setEdit,
    onFeature: (c: Category) => start(async () => { await setCategoryFlag(c.id, 'featured', !c.featured) }),
    onDelete: (c: Category) => { if (window.confirm(`Delete “${c.name}”? This cannot be undone.`)) start(async () => { setErr((await deleteCategory(c.id)).error ?? '') }) },
  }
  const exportCsv = () => downloadCsv('categories', [col('name', 'Category'), col('id', 'Slug'), col('products', 'Products'), col('children', 'Subcategories'), col('sort', 'Order'), col('status', 'Status'), col('updated', 'Updated')], shown.map((r) => ({ id: r.id, name: r.name, products: r.products, children: r.children, sort: r.sort, updated: r.updated, status: r.active ? 'Published' : 'Draft' })))

  return (
    <>
      <PageHeader title="Categories & Collections" subtitle="Organise products into categories. Your product forms and the shop use this list."
        actions={<>{write && <button type="button" className={btn.gold} onClick={() => setEdit('new')}><Plus size={16} />Add Category</button>}<button type="button" className={btn.ghost} onClick={exportCsv}><Download size={15} />Export</button></>} />
      <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-5">
        <StatCard label="Total Categories" value={String(rows.length)} icon={Layers} accent="blue" note="Main and sub" />
        <StatCard label="Active Categories" value={String(active)} icon={CheckCircle2} accent="green" note={rows.length ? `${Math.round((active / rows.length) * 1000) / 10}% of all categories` : ''} />
        <StatCard label="Subcategories" value={String(subs)} icon={Network} accent="gold" note={`${mains.length} main categories`} />
        <StatCard label="Featured" value={String(rows.filter((r) => r.featured).length)} icon={Star} accent="navy" note="Actively showcased" />
        <StatCard label="Unassigned Products" value={String(unassigned)} icon={PackageX} accent="gold" note="Products without a category" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map(([k, l]) => <button key={k} type="button" onClick={() => setTab(k)} className={cn('rounded-lg border px-3.5 py-2 text-[13px] font-semibold', tab === k ? 'border-navy-deep bg-navy-deep text-white' : 'border-line bg-white text-navy-deep hover:border-gold')}>{l} ({rows.filter((r) => inTab(r, k)).length})</button>)}
      </div>
      <Card className="mt-4 overflow-hidden">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-line p-4">
          <label className="relative min-w-[200px] flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search categories by name or slug…" className={`${field} w-full pl-9`} /></label>
          <select value={parent} onChange={(e) => setParent(e.target.value)} aria-label="Parent" className={field}><option value="All">Parent: All</option><option value="None">Main only</option>{mains.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status" className={field}>{['All', 'Published', 'Draft'].map((s) => <option key={s} value={s}>{s === 'All' ? 'Status: All' : s}</option>)}</select>
          <select value={feat} onChange={(e) => setFeat(e.target.value)} aria-label="Featured" className={field}>{['All', 'Featured', 'Not featured'].map((s) => <option key={s} value={s}>{s === 'All' ? 'Featured: All' : s}</option>)}</select>
          <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} aria-label="Sort" className={field}>{Object.entries(sorts).map(([k, l]) => <option key={k} value={k}>Sort: {l}</option>)}</select>
          <div className="flex rounded-lg border border-line p-0.5" role="group" aria-label="View">{([['grid', LayoutGrid], ['list', List]] as const).map(([k, I]) => <button key={k} type="button" onClick={() => setView(k)} aria-label={`${k} view`} aria-pressed={view === k} className={cn('flex size-8 items-center justify-center rounded-md', view === k ? 'bg-gold text-white' : 'text-slate hover:bg-paper')}><I size={16} /></button>)}</div>
          <button type="button" onClick={clear} className="text-[13px] font-semibold text-gold hover:underline">Clear Filters</button>
        </div>
        {err && <p role="alert" className="border-b border-line bg-[#ef4444]/10 px-4 py-2.5 text-sm font-medium text-[#b91c1c]">{err}</p>}
        {!shown.length ? <p className="p-8 text-center text-sm font-medium text-muted">{rows.length ? 'No categories match these filters.' : 'No categories yet. Add the first one.'}</p>
          : view === 'grid' ? <CategoryCards rows={shown} parents={names} a={actions} /> : <CategoryTable rows={shown} parents={names} a={actions} />}
        <p className="border-t border-line px-4 py-3 text-[13px] font-medium text-muted">Showing {shown.length} of {rows.length} categories</p>
      </Card>
      <CategoryInsights rows={rows} collections={collections} />
      <Drawer open={edit !== null} title={edit === 'new' ? 'Add Category' : 'Edit category'} onClose={() => setEdit(null)}>
        {edit !== null && <CategoryForm key={edit === 'new' ? 'new' : edit.id} c={edit === 'new' ? undefined : edit} mains={mains} onDone={() => setEdit(null)} />}
      </Drawer>
    </>
  )
}
