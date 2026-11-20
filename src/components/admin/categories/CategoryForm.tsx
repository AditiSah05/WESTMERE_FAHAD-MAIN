'use client'

import { useActionState, useState } from 'react'
import { saveCategory } from '@/app/admin/category-actions'
import type { Category } from '@/lib/server/categories'
import { btn } from '../ui/PageHeader'

const input = 'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const lab = 'flex flex-col gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

/** Add or edit a category. Renaming moves its products too. */
export default function CategoryForm({ c, mains, onDone }: { c?: Category; mains: Category[]; onDone: () => void }) {
  const [state, action, pending] = useActionState(async (prev: Awaited<ReturnType<typeof saveCategory>>, fd: FormData) => {
    const r = await saveCategory(prev, fd)
    if (!r) onDone()
    return r
  }, undefined)
  const [t, setT] = useState(c?.seoTitle ?? '')
  const [d, setD] = useState(c?.seoDescription ?? '')
  return (
    <form action={action} className="flex flex-col gap-4">
      {c && <input type="hidden" name="id" value={c.id} />}
      <label className={lab}>Name<input name="name" required minLength={2} maxLength={40} defaultValue={c?.name} className={input} /></label>
      <label className={lab}>Description<textarea name="description" maxLength={200} rows={3} defaultValue={c?.description} placeholder="Shown to your team; one or two lines" className={input} /></label>
      <div className="grid grid-cols-2 gap-3">
        <label className={lab}>Parent category<select name="parent" defaultValue={c?.parent ?? ''} className={input}><option value="">None (main category)</option>{mains.filter((m) => m.id !== c?.id).map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</select></label>
        <label className={lab}>Display order<input name="sort" type="number" min={0} max={999} required defaultValue={c?.sort ?? 10} className={input} /></label>
      </div>
      <fieldset className="flex flex-col gap-3 rounded-lg border border-line p-3">
        <legend className="px-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Search engine (SEO)</legend>
        <label className={lab}>Page title <span className="font-medium normal-case tracking-normal text-muted">{t.length}/60 (aim for 15 to 60)</span><input name="seoTitle" maxLength={80} value={t} onChange={(e) => setT(e.target.value)} className={input} /></label>
        <label className={lab}>Meta description <span className="font-medium normal-case tracking-normal text-muted">{d.length}/160 (aim for 50 to 160)</span><textarea name="seoDescription" maxLength={200} rows={3} value={d} onChange={(e) => setD(e.target.value)} className={input} /></label>
        {c && <p className="text-xs font-medium text-muted">Public page: /product/category/{c.id}</p>}
      </fieldset>
      <label className="flex items-center gap-2 text-sm font-semibold text-navy-deep"><input type="checkbox" name="active" defaultChecked={c ? c.active : true} className="size-4" />Active (can be picked for products)</label>
      <label className="flex items-center gap-2 text-sm font-semibold text-navy-deep"><input type="checkbox" name="featured" defaultChecked={c?.featured} className="size-4" />Featured</label>
      {state?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2 text-sm font-medium text-[#b91c1c]">{state.error}</p>}
      <button type="submit" disabled={pending} className={`${btn.gold} justify-center disabled:opacity-70`}>{pending ? 'Saving…' : c ? 'Save changes' : 'Add category'}</button>
    </form>
  )
}
