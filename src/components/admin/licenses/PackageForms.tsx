'use client'

import { addVersion, savePackage } from '@/app/admin/license-actions'
import { AVAILABILITY, FORMATS } from '@/lib/license-shared'
import type { Pkg } from '@/lib/server/licenses'
import { btn } from '../ui/PageHeader'
import { useServerForm } from '../ui/useServerForm'

const input = 'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const lab = 'flex flex-col gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const err = (m?: string) => m && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2 text-sm font-medium text-[#b91c1c]">{m}</p>

export function PackageForm({ p, products, onDone }: { p?: Pkg; products: { id: string; name: string }[]; onDone: () => void }) {
  const { onSubmit, pending, error } = useServerForm(savePackage, onDone)
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {p && <input type="hidden" name="id" value={p.id} />}
      <label className={lab}>Product<select name="product" required defaultValue={p?.productId ?? ''} className={input}><option value="" disabled>Choose a product</option>{products.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
      <label className={lab}>Package name<input name="name" required maxLength={80} defaultValue={p?.name} placeholder="Mailora Extension (Full Package)" className={input} /></label>
      <label className={lab}>Download link (https)<input name="url" type="url" required maxLength={500} defaultValue={p?.url} placeholder="https://…" className={input} /></label>
      <div className="grid grid-cols-2 gap-3">
        <label className={lab}>Format<select name="format" defaultValue={p?.format ?? 'ZIP'} className={input}>{FORMATS.map((f) => <option key={f}>{f}</option>)}</select></label>
        <label className={lab}>File size<input name="size" maxLength={20} defaultValue={p?.size} placeholder="48.6 MB" className={input} /></label>
      </div>
      <label className={lab}>Who can download<select name="availability" defaultValue={p?.availability ?? AVAILABILITY[0]} className={input}>{AVAILABILITY.map((a) => <option key={a}>{a}</option>)}</select></label>
      <label className="flex items-center gap-2 text-sm font-semibold text-navy-deep"><input type="checkbox" name="published" defaultChecked={p ? p.published : true} className="size-4" />Published</label>
      {err(error)}
      <button type="submit" disabled={pending} className={`${btn.gold} justify-center disabled:opacity-70`}>{pending ? 'Saving…' : p ? 'Save changes' : 'Add package'}</button>
    </form>
  )
}

export function VersionForm({ packages, onDone }: { packages: Pkg[]; onDone: () => void }) {
  const { onSubmit, pending, error } = useServerForm(addVersion, onDone)
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className={lab}>Package<select name="package" required defaultValue="" className={input}><option value="" disabled>Choose a package</option>{packages.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
      <div className="grid grid-cols-2 gap-3">
        <label className={lab}>Version<input name="version" required maxLength={20} placeholder="v2.5.0" className={input} /></label>
        <label className={lab}>Release date<input name="date" type="date" required defaultValue={new Date().toISOString().slice(0, 10)} className={input} /></label>
      </div>
      <label className={lab}>Update notes<textarea name="notes" rows={3} maxLength={300} placeholder="What changed in this version" className={input} /></label>
      <p className="text-xs font-medium text-muted">A future release date shows as Scheduled. The newest published version becomes the package&apos;s current version.</p>
      {err(error)}
      <button type="submit" disabled={pending} className={`${btn.gold} justify-center disabled:opacity-70`}>{pending ? 'Saving…' : 'Add version'}</button>
    </form>
  )
}
