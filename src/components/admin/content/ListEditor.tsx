'use client'

import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { btn } from '@/components/admin/ui/PageHeader'
import { field } from './form'

export type ListField = { key: string; label: string; max: number; multiline?: boolean }
type Row = Record<string, string>
type KeyedRow = Row & { _id: string }

/** Repeating group of inputs (named `${prefix}_${key}`) with add/remove; the parent form submits them. */
export default function ListEditor({ legend, hint, prefix, fields, initial, max, canWrite }: {
  legend: string; hint: string; prefix: string; fields: ListField[]; initial: Row[]; max: number; canWrite: boolean
}) {
  const [rows, setRows] = useState<KeyedRow[]>(initial.map((r, i) => ({ ...r, _id: String(i) })))
  const edit = (id: string, key: string, v: string) => setRows((rs) => rs.map((r) => (r._id === id ? { ...r, [key]: v } : r)))
  return (
    <fieldset className="grid gap-3 border-t border-line pt-5">
      <legend className="mb-1 px-0 text-base font-medium tracking-[-0.02em] text-navy-deep">{legend}</legend>
      <p className="-mt-2 text-sm font-medium text-muted">{hint}</p>
      {rows.map((r, i) => (
        <div key={r._id} className="grid gap-2 rounded-lg border border-line/70 bg-[#fafbfe] p-3 min-[769px]:grid-cols-[repeat(var(--n),minmax(0,1fr))_auto] min-[769px]:items-end" style={{ '--n': fields.length } as React.CSSProperties}>
          {fields.map((f) => (
            <label key={f.key} className="flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#718096]">{f.label} {i + 1}</span>
              {f.multiline
                ? <textarea name={`${prefix}_${f.key}`} value={r[f.key] ?? ''} onChange={(e) => edit(r._id, f.key, e.target.value)} maxLength={f.max} rows={2} readOnly={!canWrite} className={field} />
                : <input name={`${prefix}_${f.key}`} value={r[f.key] ?? ''} onChange={(e) => edit(r._id, f.key, e.target.value)} maxLength={f.max} readOnly={!canWrite} className={field} />}
            </label>
          ))}
          {canWrite && <button type="button" aria-label={`Remove ${legend} ${i + 1}`} onClick={() => setRows((rs) => rs.filter((x) => x._id !== r._id))} className={`${btn.ghost} !px-3`}><Trash2 size={15} /></button>}
        </div>
      ))}
      {canWrite && <div><button type="button" disabled={rows.length >= max} onClick={() => setRows((rs) => [...rs, { ...Object.fromEntries(fields.map((f) => [f.key, ''])), _id: `n${Date.now()}` }])} className={`${btn.ghost} disabled:opacity-60`}><Plus size={15} />Add</button></div>}
    </fieldset>
  )
}
