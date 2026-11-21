'use client'

import { useActionState, useState } from 'react'
import { saveCollection } from '@/app/admin/collection-actions'
import type { Collection } from '@/lib/server/categories'
import { btn } from '../ui/PageHeader'

const input = 'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const lab = 'flex flex-col gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

/** Create or edit a hand-picked collection and choose its products. */
export default function CollectionForm({ c, products, onDone }: { c?: Collection; products: { id: string; name: string }[]; onDone: () => void }) {
  const [q, setQ] = useState('')
  const [state, action, pending] = useActionState(async (prev: Awaited<ReturnType<typeof saveCollection>>, fd: FormData) => {
    const r = await saveCollection(prev, fd)
    if (!r) onDone()
    return r
  }, undefined)
  const shown = products.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase()))
  return (
    <form action={action} className="flex flex-col gap-4">
      {c && <input type="hidden" name="id" value={c.id} />}
      <label className={lab}>Name<input name="name" required minLength={2} maxLength={40} defaultValue={c?.name} className={input} /></label>
      <label className={lab}>Description<textarea name="description" maxLength={200} rows={2} defaultValue={c?.description} className={input} /></label>
      <div className="flex flex-col gap-2">
        <span className={lab}>Products in this collection</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" aria-label="Search products" className={input} />
        <ul className="max-h-[220px] overflow-y-auto rounded-lg border border-line p-1">
          {products.map((p) => (
            <li key={p.id} hidden={!shown.includes(p)}><label className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-navy-deep hover:bg-paper"><input type="checkbox" name="product" value={p.id} defaultChecked={c?.productIds.includes(p.id)} className="size-4" />{p.name}</label></li>
          ))}
        </ul>
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold text-navy-deep"><input type="checkbox" name="active" defaultChecked={c ? c.active : true} className="size-4" />Active (visible on the website)</label>
      <label className="flex items-center gap-2 text-sm font-semibold text-navy-deep"><input type="checkbox" name="featured" defaultChecked={c?.featured} className="size-4" />Featured</label>
      {state?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2 text-sm font-medium text-[#b91c1c]">{state.error}</p>}
      <button type="submit" disabled={pending} className={`${btn.gold} justify-center disabled:opacity-70`}>{pending ? 'Saving…' : c ? 'Save changes' : 'Create collection'}</button>
    </form>
  )
}
