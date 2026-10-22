import type { Cell, Column, ColumnKind, Field, Row, TabConfig } from '../types'

/** Column shorthand: c('price', 'Price', 'money') */
export const c = (key: string, header: string, kind?: ColumnKind, align?: 'right'): Column => ({ key, header, kind, align })

/** Builds rows with stable ids from plain objects. */
export const rows = (prefix: string, items: Record<string, Cell>[]): Row[] => items.map((r, i) => ({ id: `${prefix}-${i + 1}`, ...r }))

export const f = (name: string, label: string, type: Field['type'] = 'text', extra: Partial<Field> = {}): Field => ({ name, label, type, ...extra })
export const select = (name: string, label: string, options: string[]): Field => ({ name, label, type: 'select', options })

type TabInput = Omit<TabConfig, 'rows'> & { rows: Record<string, Cell>[] }

/** Tab shorthand that assigns row ids. */
export const tab = (t: TabInput): TabConfig => ({ ...t, rows: rows(t.key, t.rows) })

export type ModuleConfig = { title: string; subtitle: string; tabs: TabConfig[]; stats?: { label: string; value: string }[] }
