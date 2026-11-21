'use client'

import { Ban, CalendarClock, CalendarX, CheckCircle2, Clock, Download, KeyRound, Plus, Search, ShieldCheck } from 'lucide-react'
import { useMemo, useState, useTransition } from 'react'
import { deletePackage, deleteVersion } from '@/app/admin/license-actions'
import { downloadCsv } from '@/lib/admin/csv'
import { c } from '@/lib/admin/data/helpers'
import { LICENSE_TYPES } from '@/lib/license-shared'
import { cn } from '@/lib/cn'
import type { License, Pkg, Version, licenseOverview, packagesData } from '@/lib/server/licenses'
import Card from '../ui/Card'
import Drawer from '../ui/Drawer'
import PageHeader, { btn } from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import { ActivityCard, ExpiryCard } from './LicenseCharts'
import { GenerateForm, LicenseDetail } from './LicenseDrawers'
import LicenseTable from './LicenseTable'
import { ActivationsTable, HistoryTable } from './LogTables'
import { PackageForm, VersionForm } from './PackageForms'
import { DownloadActivity, PackagesCard, VersionsCard } from './PackagesSection'

type Overview = Awaited<ReturnType<typeof licenseOverview>>
type Pkgs = Awaited<ReturnType<typeof packagesData>>
type Logs = { activations: { id: string; key: string; product: string; device: string; ip: string; at: string }[]; history: { id: string; key: string; product: string; event: string; note: string; at: string }[] }
type Props = { o: Overview; logs: Logs; pk: Pkgs; customers: { id: string; name: string; email: string }[]; products: { id: string; name: string }[]; write: boolean }
const field = 'rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const delta = (n: number, b: number) => (b > 0 ? Math.round(((n - b) / b) * 1000) / 10 : undefined)

export default function LicensesView({ o, logs, pk, customers, products, write }: Props) {
  const s = o.stats
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const [product, setProduct] = useState('All')
  const [type, setType] = useState('All')
  const [per, setPer] = useState(10)
  const [page, setPage] = useState(1)
  const [gen, setGen] = useState(false)
  const [view, setView] = useState<License | null>(null)
  const [pkg, setPkg] = useState<Pkg | 'new' | null>(null)
  const [ver, setVer] = useState(false)
  const [, start] = useTransition()
  const tabs: [string, string, number][] = [['all', 'All Licenses', s.total], ['active', 'Active', o.licenses.filter((l) => l.state === 'Active').length], ['pending', 'Pending Activation', s.pending], ['expiring', 'Expiring Soon', s.expiring30], ['expired', 'Expired', s.expired], ['revoked', 'Revoked', s.revoked], ['activations', 'Activations', logs.activations.length], ['history', 'License History', logs.history.length]]
  const isList = !['activations', 'history'].includes(tab)

  const shown = useMemo(() => o.licenses.filter((l) =>
    (tab === 'all' || (tab === 'active' && l.state === 'Active') || (tab === 'pending' && l.state === 'Pending') || (tab === 'expired' && l.state === 'Expired') || (tab === 'revoked' && l.state === 'Revoked') || (tab === 'expiring' && (l.state === 'Active' || l.state === 'Pending') && l.daysLeft !== null && l.daysLeft >= 0 && l.daysLeft <= 30))
    && (product === 'All' || l.productId === product) && (type === 'All' || l.type === type) && `${l.key} ${l.product} ${l.customer} ${l.email}`.toLowerCase().includes(q.trim().toLowerCase())), [o.licenses, tab, product, type, q])
  const pages = Math.max(1, Math.ceil(shown.length / per))
  const cur = Math.min(page, pages)
  const reset = <T,>(set: (v: T) => void) => (v: T) => { set(v); setPage(1) }
  const clear = () => { setQ(''); setProduct('All'); setType('All'); setPage(1) }
  const exportCsv = () => downloadCsv('licenses', [c('key', 'License key'), c('product', 'Product'), c('customer', 'Customer'), c('email', 'Email'), c('type', 'Type'), c('act', 'Activations'), c('state', 'Status'), c('created', 'Created'), c('expires', 'Expires')], shown.map((l) => ({ id: l.id, key: l.key, product: l.product, customer: l.customer, email: l.email, type: l.type, act: `${l.used}/${l.max}`, state: l.state, created: l.created, expires: l.expires ?? 'Lifetime' })))

  return (
    <>
      <PageHeader title="Licenses & Downloads" subtitle="Software licenses, activations, customer access, renewals and digital product delivery."
        actions={<>{write && <button type="button" className={btn.gold} onClick={() => setGen(true)}><Plus size={16} />Generate License</button>}{write && <button type="button" className={btn.ghost} onClick={() => setPkg('new')}><Download size={15} />Create Download Package</button>}<button type="button" className={btn.ghost} onClick={exportCsv}><Download size={15} />Export Data</button></>} />
      <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        <StatCard label="Total Licenses" value={s.total.toLocaleString('en-IN')} icon={KeyRound} accent="blue" delta={delta(s.new30, s.prev30)} note={`${s.new30} created in the last 30 days`} />
        <StatCard label="Active Licenses" value={String(s.active)} icon={ShieldCheck} accent="green" note={`of ${s.total} total licenses`} />
        <StatCard label="Activated Licenses" value={String(s.activated)} icon={CheckCircle2} accent="gold" note={`of ${s.active} active licenses`} />
        <StatCard label="Pending Activations" value={String(s.pending)} icon={Clock} accent="gold" note="Waiting for first activation" />
        <StatCard label="Expiring Soon" value={String(s.expiring30)} icon={CalendarClock} accent="gold" note={`Within 30 days · ${s.expiring7} in 7 days`} />
        <StatCard label="Expired Licenses" value={String(s.expired)} icon={CalendarX} accent="navy" note="Past their expiry date" />
        <StatCard label="Revoked Licenses" value={String(s.revoked)} icon={Ban} accent="navy" note="Turned off by your team" />
        <StatCard label="Total Downloads" value={String(s.downloadsTotal)} icon={Download} accent="blue" note={`${s.downloadsMonth} successful this month`} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{tabs.map(([k, l, n]) => <button key={k} type="button" onClick={() => { setTab(k); setPage(1) }} className={cn('rounded-lg border px-3.5 py-2 text-[13px] font-semibold', tab === k ? 'border-navy-deep bg-navy-deep text-white' : 'border-line bg-white text-navy-deep hover:border-gold')}>{l} ({n})</button>)}</div>
      <Card className="mt-4 overflow-hidden">
        {isList && (
          <div className="flex flex-wrap items-center gap-2.5 border-b border-line p-4">
            <label className="relative min-w-[200px] flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input value={q} onChange={(e) => reset(setQ)(e.target.value)} placeholder="Search by license key, product or customer…" className={`${field} w-full pl-9`} /></label>
            <select value={product} onChange={(e) => reset(setProduct)(e.target.value)} aria-label="Product" className={field}><option value="All">Product: All</option>{products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
            <select value={type} onChange={(e) => reset(setType)(e.target.value)} aria-label="License type" className={field}><option value="All">License type: All</option>{LICENSE_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
            <button type="button" onClick={clear} className="text-[13px] font-semibold text-gold hover:underline">Clear Filters</button>
          </div>
        )}
        {isList ? <LicenseTable rows={shown.slice((cur - 1) * per, cur * per)} total={shown.length} page={cur} pages={pages} per={per} onPage={setPage} onPer={(n) => { setPer(n); setPage(1) }} onView={setView} />
          : tab === 'activations' ? <ActivationsTable rows={logs.activations} /> : <HistoryTable rows={logs.history} />}
      </Card>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-5">
        <div className="min-[1181px]:col-span-3"><ActivityCard dayLabels={o.dayLabels} activations={o.activations} created={o.created} /></div>
        <div className="min-[1181px]:col-span-2"><ExpiryCard expiring7={s.expiring7} expiring30={s.expiring30} expired={s.expired} lifetime={s.lifetime} live={s.active} /></div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-5">
        <PackagesCard rows={pk.packages} write={write} onAdd={() => setPkg('new')} onEdit={setPkg} onDelete={(p) => { if (window.confirm(`Delete the package “${p.name}”? Its download history is removed too.`)) start(async () => { await deletePackage(p.id) }) }} />
        <DownloadActivity rows={pk.downloads} />
      </div>
      <VersionsCard rows={pk.versions as Version[]} write={write} onAdd={() => setVer(true)} onDelete={(v) => { if (window.confirm(`Delete version ${v.version}?`)) start(async () => { await deleteVersion(v.id) }) }} />
      <Drawer open={gen} title="Generate License" onClose={() => setGen(false)}>{gen && <GenerateForm customers={customers} products={products} onDone={() => setGen(false)} />}</Drawer>
      <Drawer open={view !== null} title="License details" onClose={() => setView(null)}>{view && <LicenseDetail key={view.id + view.state} l={o.licenses.find((l) => l.id === view.id) ?? view} write={write} onDone={() => setView(null)} />}</Drawer>
      <Drawer open={pkg !== null} title={pkg === 'new' ? 'Create Download Package' : 'Edit package'} onClose={() => setPkg(null)}>{pkg !== null && <PackageForm key={pkg === 'new' ? 'new' : pkg.id} p={pkg === 'new' ? undefined : pkg} products={products} onDone={() => setPkg(null)} />}</Drawer>
      <Drawer open={ver} title="Add Version" onClose={() => setVer(false)}>{ver && <VersionForm packages={pk.packages} onDone={() => setVer(false)} />}</Drawer>
    </>
  )
}
