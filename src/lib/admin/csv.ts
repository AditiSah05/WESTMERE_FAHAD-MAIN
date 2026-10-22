import type { Column, Row } from './types'

/** Downloads rows as a CSV file (client only). */
export function downloadCsv(name: string, columns: Column[], rows: Row[]) {
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const body = [columns.map((c) => esc(c.header)).join(','), ...rows.map((r) => columns.map((c) => esc(r[c.key])).join(','))].join('\n')
  const url = URL.createObjectURL(new Blob([body], { type: 'text/csv;charset=utf-8' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: `${name}.csv` })
  a.click()
  URL.revokeObjectURL(url)
}
