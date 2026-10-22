'use client'

import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { money, shortDate } from '@/lib/admin/format'
import type { Cell, Column, Row } from '@/lib/admin/types'
import { cn } from '@/lib/cn'
import Card from './Card'
import StatusBadge from './StatusBadge'

const PAGE = 8

const renderCell = (col: Column, v: Cell | undefined) => {
  if (v === undefined || v === '') return <span className="text-muted">—</span>
  switch (col.kind) {
    case 'money': return money(v)
    case 'date': return shortDate(v)
    case 'status': return <StatusBadge value={v} />
    case 'tag': return <span className="rounded bg-sky px-2 py-0.5 text-xs font-semibold text-blue-accent">{String(v)}</span>
    case 'mono': return <code className="whitespace-nowrap rounded bg-paper px-1.5 py-0.5 font-mono text-[12.5px] text-navy">{String(v)}</code>
    case 'bool': return <StatusBadge value={v ? 'Yes' : 'No'} tone={v ? 'green' : 'gray'} />
    default: return String(v)
  }
}

type Props = { columns: Column[]; rows: Row[]; onRowClick?: (row: Row) => void; empty?: string }

export default function DataTable({ columns, rows, onRowClick, empty = 'Nothing here yet.' }: Props) {
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null)
  const [page, setPage] = useState(0)

  const sorted = useMemo(() => {
    if (!sort) return rows
    return [...rows].sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : a[sort.key] < b[sort.key] ? -1 : 0) * sort.dir)
  }, [rows, sort])

  const pages = Math.max(1, Math.ceil(sorted.length / PAGE))
  const current = Math.min(page, pages - 1)
  const slice = sorted.slice(current * PAGE, current * PAGE + PAGE)

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-paper/70">
              {columns.map((c) => (
                <th key={c.key} className={cn('px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate', c.align === 'right' && 'text-right')}>
                  <button type="button" onClick={() => setSort((s) => ({ key: c.key, dir: s?.key === c.key && s.dir === 1 ? -1 : 1 }))} className="inline-flex items-center gap-1 uppercase">
                    {c.header}
                    {sort?.key === c.key && (sort.dir === 1 ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((r) => (
              <tr key={r.id} onClick={() => onRowClick?.(r)} className={cn('border-b border-line/60 last:border-b-0', onRowClick && 'cursor-pointer hover:bg-paper')}>
                {columns.map((c) => (
                  <td key={c.key} className={cn('px-4 py-3 font-medium text-navy-deep', c.align === 'right' && 'text-right')}>{renderCell(c, r[c.key])}</td>
                ))}
              </tr>
            ))}
            {slice.length === 0 && (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-muted">{empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-3 text-[13px] font-medium text-muted">
        <span>{sorted.length} record{sorted.length === 1 ? '' : 's'}</span>
        <div className="flex items-center gap-1.5">
          <button type="button" aria-label="Previous page" disabled={current === 0} onClick={() => setPage(current - 1)} className="flex size-8 items-center justify-center rounded-md border border-line disabled:opacity-40"><ChevronLeft size={15} /></button>
          <span>{current + 1} / {pages}</span>
          <button type="button" aria-label="Next page" disabled={current >= pages - 1} onClick={() => setPage(current + 1)} className="flex size-8 items-center justify-center rounded-md border border-line disabled:opacity-40"><ChevronRight size={15} /></button>
        </div>
      </div>
    </Card>
  )
}
