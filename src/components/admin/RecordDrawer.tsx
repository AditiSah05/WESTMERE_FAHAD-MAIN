'use client'

import { useEffect, useState } from 'react'
import { label } from '@/lib/admin/format'
import type { Row, TabConfig } from '@/lib/admin/types'
import Drawer from './ui/Drawer'
import { btn } from './ui/PageHeader'
import RecordForm from './ui/RecordForm'

type Props = { tab: TabConfig; row: Row | null; isNew: boolean; onClose: () => void; onSave: (r: Row) => void; onDelete: (id: string) => void }

/** Edit form when the tab defines fields, otherwise a read-only detail sheet. */
export default function RecordDrawer({ tab, row, isNew, onClose, onSave, onDelete }: Props) {
  const [draft, setDraft] = useState<Row | null>(row)
  useEffect(() => setDraft(row), [row])

  const editable = !!tab.fields
  const titleKeys = ['name', 'title', 'orderId', 'code', 'key', 'ticket', 'invoice', 'customer', 'product', 'from', 'email']
  const found = draft && titleKeys.find((k) => draft[k])
  const heading = isNew ? (tab.addLabel ?? 'New record') : String((draft && found && draft[found]) || 'Details')

  return (
    <Drawer
      open={!!row && !!draft}
      title={heading}
      onClose={onClose}
      footer={
        editable ? (
          <>
            {!isNew ? <button type="button" className={btn.danger} onClick={() => draft && onDelete(draft.id)}>Delete</button> : <span />}
            <div className="flex gap-2">
              <button type="button" className={btn.ghost} onClick={onClose}>Cancel</button>
              <button type="button" className={btn.gold} onClick={() => draft && onSave(draft)}>Save</button>
            </div>
          </>
        ) : undefined
      }
    >
      {draft && editable && <RecordForm fields={tab.fields!} value={draft} onChange={setDraft} />}
      {draft && !editable && (
        <dl className="flex flex-col gap-3.5">
          {Object.entries(draft).filter(([k]) => k !== 'id').map(([k, v]) => (
            <div key={k} className="border-b border-dashed border-line pb-3 last:border-b-0">
              <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">{label(k)}</dt>
              <dd className="mt-1 text-sm font-medium text-navy-deep">{String(v) || '—'}</dd>
            </div>
          ))}
        </dl>
      )}
    </Drawer>
  )
}
