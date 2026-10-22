import type { ReactNode } from 'react'
import Card from '../ui/Card'
import StatusBadge from '../ui/StatusBadge'

export type Col = { key: string; header: string; badge?: boolean; money?: boolean; wide?: boolean }
type Data = Record<string, string | number | null>

/** Server-rendered table; `actions` renders per-row forms (server actions), shown only when the viewer can write. */
export default function ShopTable({ cols, rows, actions, empty }: { cols: Col[]; rows: Data[]; actions?: (r: Data) => ReactNode; empty: string }) {
  if (!rows.length) return <Card className="p-8 text-center text-sm font-medium text-muted">{empty}</Card>
  return (
    <Card className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-[#fafbfe] text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">
            {cols.map((c) => <th key={c.key} className="px-4 py-3">{c.header}</th>)}
            {actions && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={String(r.id)} className="border-b border-line/70 align-top last:border-0">
              {cols.map((c) => (
                <td key={c.key} className={c.wide ? 'max-w-[280px] px-4 py-3' : 'whitespace-nowrap px-4 py-3'}>
                  {c.badge ? <StatusBadge value={r[c.key] ?? ''} /> : c.money ? `₹${Number(r[c.key]).toLocaleString('en-IN')}` : String(r[c.key] ?? '—')}
                </td>
              ))}
              {actions && <td className="px-4 py-3">{actions(r)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
