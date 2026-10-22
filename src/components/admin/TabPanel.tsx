'use client'

import { Download, Plus, RotateCcw, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { downloadCsv } from '@/lib/admin/csv'
import type { Row, TabConfig } from '@/lib/admin/types'
import { useRecords } from '@/lib/admin/useRecords'
import RecordDrawer from './RecordDrawer'
import DataTable from './ui/DataTable'
import { btn } from './ui/PageHeader'

type Props = { module: string; tab: TabConfig }

export default function TabPanel({ module, tab }: Props) {
  const { rows, save, remove, reset } = useRecords(`westmere-admin:${module}:${tab.source ?? tab.key}`, tab.rows)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Row | null>(null)
  const [isNew, setIsNew] = useState(false)

  const visible = useMemo(() => {
    const scoped = tab.filter ? rows.filter((r) => String(r[tab.filter!.key]).toLowerCase() === tab.filter!.value.toLowerCase()) : rows
    const q = query.trim().toLowerCase()
    return q ? scoped.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(q))) : scoped
  }, [rows, tab.filter, query])

  const blank = (): Row => ({ id: `${tab.key}-${Date.now()}`, ...Object.fromEntries((tab.fields ?? []).map((f) => [f.name, f.type === 'toggle' ? false : f.type === 'number' ? 0 : ''])) })

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <label className="relative w-full max-w-[320px]">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="w-full rounded-[10px] border border-line bg-white py-2.5 pl-9 pr-3 text-sm font-medium outline-none focus:border-blue-accent" />
        </label>
        <div className="flex gap-2">
          <button type="button" className={btn.ghost} onClick={reset} title="Restore demo data"><RotateCcw size={15} /></button>
          <button type="button" className={btn.ghost} onClick={() => downloadCsv(`${module}-${tab.key}`, tab.columns, visible)}><Download size={15} />Export</button>
          {tab.fields && (
            <button type="button" className={btn.gold} onClick={() => { setSelected(blank()); setIsNew(true) }}><Plus size={16} />{tab.addLabel ?? 'Add new'}</button>
          )}
        </div>
      </div>
      <DataTable columns={tab.columns} rows={visible} onRowClick={(r) => { setSelected(r); setIsNew(false) }} />
      <RecordDrawer
        tab={tab}
        row={selected}
        isNew={isNew}
        onClose={() => setSelected(null)}
        onSave={(r) => { save(r); setSelected(null) }}
        onDelete={(id) => { remove(id); setSelected(null) }}
      />
    </>
  )
}
