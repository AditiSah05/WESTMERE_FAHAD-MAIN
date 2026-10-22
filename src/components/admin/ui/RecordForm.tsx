'use client'

import type { ChangeEvent } from 'react'
import type { Cell, Field, Row } from '@/lib/admin/types'
import { cn } from '@/lib/cn'

const input =
  'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 text-sm font-medium text-navy-deep outline-none transition placeholder:font-normal placeholder:text-[#a0aec0] focus:border-blue-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(74,123,247,0.08)] disabled:opacity-60'

type Props = { fields: Field[]; value: Row; onChange: (next: Row) => void; readOnly?: boolean }

export default function RecordForm({ fields, value, onChange, readOnly }: Props) {
  const set = (name: string, v: Cell) => onChange({ ...value, [name]: v })
  const handle = (f: Field) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    set(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)

  return (
    <div className="flex flex-col gap-4">
      {fields.map((f) => {
        const off = readOnly || f.readOnly
        const v = value[f.name]
        return (
          <label key={f.name} className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">{f.label}{f.required && '*'}</span>
            {f.type === 'select' ? (
              <select value={String(v ?? '')} onChange={handle(f)} disabled={off} className={cn(input, 'cursor-pointer')}>
                <option value="" disabled>Select…</option>
                {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea rows={4} value={String(v ?? '')} onChange={handle(f)} disabled={off} placeholder={f.placeholder} className={cn(input, 'resize-y')} />
            ) : f.type === 'toggle' ? (
              <button type="button" disabled={off} onClick={() => set(f.name, !v)} aria-pressed={!!v} className={cn('relative h-6 w-11 rounded-full transition-colors', v ? 'bg-gold' : 'bg-[#cbd5e1]')}>
                <span className={cn('absolute top-0.5 size-5 rounded-full bg-white shadow transition-all', v ? 'left-[22px]' : 'left-0.5')} />
              </button>
            ) : (
              <input type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'} value={String(v ?? '')} onChange={handle(f)} disabled={off} placeholder={f.placeholder} className={input} />
            )}
          </label>
        )
      })}
    </div>
  )
}
