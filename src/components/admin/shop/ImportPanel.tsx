'use client'

import { useState, useTransition } from 'react'
import { importProducts, type ImportRow } from '@/app/admin/shop-actions'
import { btn } from '../ui/PageHeader'

const HEAD = ['name', 'category', 'type', 'price', 'pricing', 'description', 'tech', 'status'] as const
const SAMPLE = `${HEAD.join(',')}\n"Landing Page Kit","Websites","Ready-made website",1499,"One-time","Fast one-page site","React, Tailwind","Published"\n`

/** Small CSV reader: quoted fields, commas and line breaks inside quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = [], cell = '', quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) { if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++ } else if (ch === '"') quoted = false; else cell += ch }
    else if (ch === '"') quoted = true
    else if (ch === ',') { row.push(cell); cell = '' }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cell); cell = ''; if (row.some((x) => x.trim())) rows.push(row); row = [] }
    else cell += ch
  }
  row.push(cell); if (row.some((x) => x.trim())) rows.push(row)
  return rows
}

export default function ImportPanel({ onDone }: { onDone: () => void }) {
  const [rows, setRows] = useState<ImportRow[]>([])
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [pending, start] = useTransition()

  const read = async (f: File | undefined) => {
    setErrors([]); setNote('')
    if (!f) return setRows([])
    if (f.size > 500_000) return setNote('That file is too large (500 KB max).')
    const [head, ...body] = parseCsv(await f.text())
    const idx = HEAD.map((h) => (head ?? []).findIndex((x) => x.trim().toLowerCase() === h))
    if (idx[0] < 0 || idx[3] < 0) return setNote('The first row must have at least the columns name and price.')
    setRows(body.map((r) => Object.fromEntries(HEAD.map((h, i) => [h, idx[i] >= 0 ? r[idx[i]] ?? '' : ''])) as ImportRow))
    setNote(`${body.length} row(s) ready to import.`)
  }
  const sample = () => { const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([SAMPLE], { type: 'text/csv' })), download: 'products-sample.csv' }); a.click() }

  return (
    <div className="flex flex-col gap-4 text-sm font-medium text-slate">
      <p>Upload a CSV with these columns: <b className="text-navy-deep">{HEAD.join(', ')}</b>. Only name, category and price are needed. Category must match one of your categories (see Categories &amp; Collections). Up to 200 rows.</p>
      <button type="button" onClick={sample} className={`${btn.ghost} self-start`}>Download sample CSV</button>
      <input type="file" accept=".csv,text/csv" onChange={(e) => read(e.target.files?.[0])} className="text-sm" />
      {note && <p role="status" className="text-navy-deep">{note}</p>}
      {errors.length > 0 && <ul className="list-disc rounded-lg bg-[#ef4444]/10 p-3 pl-6 text-xs text-[#b91c1c]">{errors.map((e) => <li key={e}>{e}</li>)}</ul>}
      <button type="button" disabled={!rows.length || pending} className={`${btn.gold} justify-center disabled:opacity-60`} onClick={() => start(async () => { const r = await importProducts(rows); setErrors(r.errors); setNote(`${r.added} product(s) added.`); setRows([]); if (!r.errors.length) onDone() })}>{pending ? 'Importing…' : 'Import products'}</button>
    </div>
  )
}
