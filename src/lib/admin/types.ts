export type Cell = string | number | boolean
export type Row = { id: string } & Record<string, Cell>

export type ColumnKind = 'text' | 'money' | 'date' | 'status' | 'mono' | 'bool' | 'tag'

export type Column = { key: string; header: string; kind?: ColumnKind; align?: 'right' }

export type FieldType = 'text' | 'number' | 'select' | 'textarea' | 'toggle' | 'date'

export type Field = {
  name: string
  label: string
  type?: FieldType
  options?: string[]
  placeholder?: string
  required?: boolean
  readOnly?: boolean
}

export type TabConfig = {
  key: string
  label: string
  columns: Column[]
  rows: Row[]
  fields?: Field[]
  addLabel?: string
  /** Tabs sharing a `source` share one record set (e.g. order status views). */
  source?: string
  /** Only show rows where `row[filterKey] === filterValue` (used for status sub-views). */
  filter?: { key: string; value: string }
}

export type Tone = 'green' | 'amber' | 'red' | 'blue' | 'gray' | 'navy'
