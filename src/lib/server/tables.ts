import 'server-only'
import { modules } from '@/lib/admin/modules'
import { settingsSections } from '@/lib/admin/data/settings'
import type { Cell, Field, Row, TabConfig } from '@/lib/admin/types'
import { db } from './schema'
import type { Query } from './db'

type Kind = 'text' | 'double precision' | 'boolean'
export type Table = { name: string; cols: { name: string; kind: Kind }[] }

const kindOf = (field?: Field, col?: TabConfig['columns'][number], sample?: Cell): Kind => {
  if (field?.type === 'number' || col?.kind === 'money') return 'double precision'
  if (field?.type === 'toggle' || col?.kind === 'bool') return 'boolean'
  if (!field && !col && typeof sample === 'number') return 'double precision'
  return 'text'
}

/** Builds { table name, typed columns } from the screen configs, so every screen gets its own real table. */
function build(name: string, tabs: TabConfig[]): Table {
  const cols = new Map<string, Kind>()
  for (const t of tabs) {
    const sample = t.rows[0]
    for (const col of t.columns) cols.set(col.key, kindOf(t.fields?.find((x) => x.name === col.key), col, sample?.[col.key]))
    for (const fl of t.fields ?? []) cols.set(fl.name, kindOf(fl, t.columns.find((x) => x.key === fl.name)))
  }
  cols.delete('id')
  return { name, cols: [...cols].map(([n, kind]) => ({ name: n, kind })) }
}

const settingsTab = (key: string, fields: Field[]): TabConfig => ({ key, label: key, columns: [], rows: [], fields })

const registry = new Map<string, Table>()
for (const [slug, m] of Object.entries(modules)) {
  const bySource = new Map<string, TabConfig[]>()
  for (const t of m.tabs) bySource.set(t.source ?? t.key, [...(bySource.get(t.source ?? t.key) ?? []), t])
  for (const [source, tabs] of bySource) registry.set(`${slug}:${source}`, build(`rec_${slug}_${source}`.replace(/-/g, '_'), tabs))
}
for (const s of settingsSections) registry.set(`settings:${s.key}`, build(`rec_settings_${s.key}`.replace(/-/g, '_'), [settingsTab(s.key, s.fields)]))

const SAFE = /^[A-Za-z_][A-Za-z0-9_]{0,40}$/
const q = (ident: string) => {
  if (!SAFE.test(ident)) throw new Error('Unsafe identifier')
  return `"${ident}"`
}

/** The table for a storage key; unknown keys are rejected, so clients cannot create tables. */
export async function tableFor(key: string): Promise<Table> {
  const t = registry.get(key)
  if (!t) throw new Error('Invalid key')
  const { query } = await db()
  const cols = t.cols.map((c) => `${q(c.name)} ${c.kind}`).join(', ')
  await query(`CREATE TABLE IF NOT EXISTS ${q(t.name)} (id text PRIMARY KEY, _pos integer NOT NULL DEFAULT 0${cols ? ', ' + cols : ''})`)
  // Columns added to a screen's config later are added to the live table.
  for (const c of t.cols) await query(`ALTER TABLE ${q(t.name)} ADD COLUMN IF NOT EXISTS ${q(c.name)} ${c.kind}`)
  return t
}

const coerce = (v: Cell | undefined, kind: Kind) => {
  if (v === undefined) return null
  if (kind === 'double precision') return Number.isFinite(Number(v)) && v !== '' ? Number(v) : null
  if (kind === 'boolean') return v === true || v === 'true'
  return String(v)
}

export async function selectRows(t: Table): Promise<Row[]> {
  const { query } = await db()
  const rows = await query<Record<string, Cell | null>>(`SELECT * FROM ${q(t.name)} ORDER BY _pos`)
  return rows.map((r) => {
    const out: Record<string, Cell> = { id: r.id as string }
    for (const c of t.cols) if (r[c.name] !== null && r[c.name] !== undefined) out[c.name] = r[c.name] as Cell
    return out as Row
  })
}

/** Replaces the whole table inside the caller's transaction. Fields the screen does not define are dropped. */
export async function replaceRows(run: Query, t: Table, rows: Row[]) {
  await run(`DELETE FROM ${q(t.name)}`)
  const names = ['id', '_pos', ...t.cols.map((c) => c.name)].map(q).join(', ')
  const marks = Array.from({ length: t.cols.length + 2 }, (_, i) => `$${i + 1}`).join(', ')
  for (const [i, r] of rows.entries()) await run(`INSERT INTO ${q(t.name)} (${names}) VALUES (${marks})`, [r.id, i, ...t.cols.map((c) => coerce(r[c.name], c.kind))])
}

export const clearRows = async (t: Table) => (await db()).query(`DELETE FROM ${q(t.name)}`)
