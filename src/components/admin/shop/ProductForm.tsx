'use client'

import { useTransition } from 'react'
import { saveProduct } from '@/app/admin/shop-actions'
import { btn } from '../ui/PageHeader'

export type Product = { id: string; name: string; category: string; kind: string; price: number; tag: string; description: string; tech: string; image: string; pricing: string; featured: boolean; added: string; on_page: string; status: string; sold: number; revenue: number }

const CATEGORIES = ['Websites', 'Applications', 'Software & Tools', 'Custom development']
export const PRICING = ['One-time', 'Subscription', 'Custom pricing']
const KINDS = [['website', 'Ready-made website'], ['software', 'Software / app'], ['service', 'Custom project']]
const input = 'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const lab = 'flex flex-col gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

/** Add or edit one product. Price changes apply to new orders only; old orders keep what was paid. */
export default function ProductForm({ p, onDone }: { p?: Product; onDone: () => void }) {
  const [pending, start] = useTransition()
  return (
    <form action={(fd) => start(async () => { await saveProduct(fd); onDone() })} className="flex flex-col gap-4">
      {p && <input type="hidden" name="id" value={p.id} />}
      <label className={lab}>Name<input name="name" required maxLength={80} defaultValue={p?.name} className={input} /></label>
      <div className="grid grid-cols-2 gap-3">
        <label className={lab}>Category<select name="category" defaultValue={p?.category ?? CATEGORIES[0]} className={input}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label className={lab}>Type<select name="kind" defaultValue={p?.kind ?? 'website'} className={input}>{KINDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <label className={lab}>Price (₹)<input name="price" type="number" min={0} max={1000000} step={1} required defaultValue={p?.price} className={input} /></label>
        <label className={lab}>Pricing model<select name="pricing" defaultValue={p?.pricing ?? 'One-time'} className={input}>{PRICING.map((m) => <option key={m}>{m}</option>)}</select></label>
        <label className={lab}>Tag<input name="tag" maxLength={20} defaultValue={p?.tag} placeholder="Featured, New…" className={input} /></label>
      </div>
      <label className={lab}>Status<select name="status" defaultValue={p?.status ?? 'Published'} className={input}><option>Published</option><option>Hidden</option></select></label>
      <label className={lab}>Description<textarea name="description" maxLength={300} rows={3} defaultValue={p?.description} placeholder="Short description shown on the Products page" className={input} /></label>
      <label className={lab}>Tech<input name="tech" maxLength={80} defaultValue={p?.tech} placeholder="React, Node" className={input} /></label>
      <label className={lab}>Cover image link<input name="image" type="url" maxLength={400} defaultValue={p?.image} placeholder="https://… (optional)" className={input} /></label>
      <label className="flex items-center gap-2 text-sm font-semibold text-navy-deep"><input type="checkbox" name="featured" defaultChecked={p?.featured} className="size-4" />Featured (shown first, with a Featured badge)</label>
      <label className="flex items-center gap-2 text-sm font-semibold text-navy-deep"><input type="checkbox" name="listed" defaultChecked={p ? p.on_page === 'Shown' : true} className="size-4" />Show on the public Products page</label>
      <button type="submit" disabled={pending} className={`${btn.gold} justify-center disabled:opacity-70`}>{pending ? 'Saving…' : p ? 'Save changes' : 'Add product'}</button>
    </form>
  )
}
