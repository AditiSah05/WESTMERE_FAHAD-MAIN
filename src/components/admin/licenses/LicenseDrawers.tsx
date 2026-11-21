'use client'

import { Check, Copy } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { extendLicense, generateLicense, getLicenseDetail, setLicenseRevoked } from '@/app/admin/license-actions'
import { LICENSE_TYPES } from '@/lib/license-shared'
import type { License } from '@/lib/server/licenses'
import { btn } from '../ui/PageHeader'
import { useServerForm } from '../ui/useServerForm'
import StatusBadge from '../ui/StatusBadge'

const input = 'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const lab = 'flex flex-col gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const nextYear = () => new Date(Date.now() + 365 * 864e5).toISOString().slice(0, 10)

export function GenerateForm({ customers, products, onDone }: { customers: { id: string; name: string; email: string }[]; products: { id: string; name: string }[]; onDone: () => void }) {
  const { onSubmit, pending, error } = useServerForm(generateLicense, onDone)
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className={lab}>Customer<select name="customer" required defaultValue="" className={input}><option value="" disabled>Choose a customer</option>{customers.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}</select></label>
      <label className={lab}>Product<select name="product" required defaultValue="" className={input}><option value="" disabled>Choose a product</option>{products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
      <div className="grid grid-cols-2 gap-3">
        <label className={lab}>License type<select name="type" defaultValue={LICENSE_TYPES[0]} className={input}>{LICENSE_TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className={lab}>Activations allowed<input name="max" type="number" min={1} max={500} defaultValue={1} required className={input} /></label>
      </div>
      <label className={lab}>Expires on <span className="font-medium normal-case tracking-normal text-muted">(empty = lifetime)</span><input name="expires" type="date" defaultValue={nextYear()} className={input} /></label>
      {error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2 text-sm font-medium text-[#b91c1c]">{error}</p>}
      <button type="submit" disabled={pending} className={`${btn.gold} justify-center disabled:opacity-70`}>{pending ? 'Generating…' : 'Generate license'}</button>
    </form>
  )
}

type Detail = Awaited<ReturnType<typeof getLicenseDetail>>

export function LicenseDetail({ l, write, onDone }: { l: License; write: boolean; onDone: () => void }) {
  const [d, setD] = useState<Detail | null>(null)
  const [copied, setCopied] = useState(false)
  const [pending, start] = useTransition()
  useEffect(() => { getLicenseDetail(l.id).then(setD).catch(() => setD({ activations: [], events: [] })) }, [l.id, l.state])
  const copy = async () => { try { await navigator.clipboard.writeText(l.key); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* clipboard blocked */ } }
  const row = (a: string, b: React.ReactNode) => <div className="flex justify-between gap-4 border-b border-line/60 py-2 text-sm font-medium"><span className="text-muted">{a}</span><span className="text-right text-navy-deep">{b}</span></div>
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 rounded-lg bg-sky p-3"><code className="flex-1 break-all font-mono text-sm font-semibold text-navy-deep">{l.key}</code><button type="button" onClick={copy} aria-label="Copy license key" className="flex size-8 items-center justify-center rounded-lg bg-white text-slate hover:text-navy-deep">{copied ? <Check size={15} /> : <Copy size={15} />}</button></div>
      <div>{row('Status', <StatusBadge value={l.state} />)}{row('Product', l.product)}{row('Customer', `${l.customer} (${l.email})`)}{row('Type', l.type)}{row('Activations', `${l.used} / ${l.max}`)}{row('Created', l.created)}{row('Expires', l.expires ?? 'Lifetime')}{l.orderId && row('Order', `#WM-${l.orderId}`)}</div>
      {write && (
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={pending} onClick={() => start(async () => { await setLicenseRevoked(l.id, l.state !== 'Revoked'); onDone() })} className={l.state === 'Revoked' ? btn.ghost : btn.danger}>{l.state === 'Revoked' ? 'Restore license' : 'Revoke license'}</button>
          {l.expires && <><button type="button" disabled={pending} onClick={() => start(async () => { await extendLicense(l.id, 30); onDone() })} className={btn.ghost}>Extend 30 days</button><button type="button" disabled={pending} onClick={() => start(async () => { await extendLicense(l.id, 365); onDone() })} className={btn.ghost}>Extend 1 year</button></>}
        </div>
      )}
      <div><h3 className="mb-1 text-sm font-semibold text-navy-deep">Activated devices</h3>{!d ? <p className="text-sm text-muted">Loading…</p> : !d.activations.length ? <p className="text-sm font-medium text-muted">Not activated yet.</p> : <ul className="text-sm font-medium text-navy-deep">{d.activations.map((a) => <li key={a.at + a.device} className="flex justify-between border-b border-line/60 py-1.5"><span>{a.device}</span><span className="text-muted">{a.at}</span></li>)}</ul>}</div>
      <div><h3 className="mb-1 text-sm font-semibold text-navy-deep">History</h3>{!d ? null : <ul className="text-sm font-medium text-navy-deep">{d.events.map((e) => <li key={e.at + e.event} className="flex justify-between gap-3 border-b border-line/60 py-1.5"><span>{e.event}{e.note && <span className="text-muted"> · {e.note}</span>}</span><span className="flex-none text-muted">{e.at}</span></li>)}</ul>}</div>
    </div>
  )
}
