import StatusBadge from '../ui/StatusBadge'

const th = 'px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const empty = (t: string) => <p className="p-8 text-center text-sm font-medium text-muted">{t}</p>

export function ActivationsTable({ rows }: { rows: { id: string; key: string; product: string; device: string; ip: string; at: string }[] }) {
  if (!rows.length) return empty('No activations yet. They appear when a product calls the activation API with a license key.')
  return (
    <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-sm">
      <thead><tr className="border-b border-line bg-[#fafbfe]"><th className={th}>License key</th><th className={th}>Product</th><th className={th}>Device</th><th className={th}>IP</th><th className={th}>Activated</th></tr></thead>
      <tbody>{rows.map((r) => <tr key={r.id} className="border-b border-line/60 font-medium text-navy-deep last:border-0"><td className="px-3 py-3 font-mono text-[13px]">{r.key}</td><td className="px-3 py-3">{r.product}</td><td className="px-3 py-3">{r.device}</td><td className="px-3 py-3 font-mono text-[13px] text-muted">{r.ip || '—'}</td><td className="whitespace-nowrap px-3 py-3 text-muted">{r.at}</td></tr>)}</tbody>
    </table></div>
  )
}

export function HistoryTable({ rows }: { rows: { id: string; key: string; product: string; event: string; note: string; at: string }[] }) {
  if (!rows.length) return empty('License events (created, activated, revoked, extended) appear here.')
  return (
    <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-sm">
      <thead><tr className="border-b border-line bg-[#fafbfe]"><th className={th}>When</th><th className={th}>License key</th><th className={th}>Product</th><th className={th}>Event</th><th className={th}>Details</th></tr></thead>
      <tbody>{rows.map((r) => <tr key={r.id} className="border-b border-line/60 font-medium text-navy-deep last:border-0"><td className="whitespace-nowrap px-3 py-3 text-muted">{r.at}</td><td className="px-3 py-3 font-mono text-[13px]">{r.key}</td><td className="px-3 py-3">{r.product}</td><td className="px-3 py-3"><StatusBadge value={r.event} tone={r.event === 'Revoked' ? 'red' : r.event === 'Created' || r.event === 'Restored' ? 'green' : 'blue'} /></td><td className="px-3 py-3 text-muted">{r.note || '—'}</td></tr>)}</tbody>
    </table></div>
  )
}
