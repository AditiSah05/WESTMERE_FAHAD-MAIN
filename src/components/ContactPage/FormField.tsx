import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const inputClass =
  'w-full rounded-[10px] border border-line bg-[#fafbfe] px-4 py-3.5 text-[15px] font-medium text-navy-deep outline-none transition ' +
  'placeholder:font-normal placeholder:text-[#a0aec0] focus:border-blue-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(74,123,247,0.08)]'

type Props = { label: string; filled: boolean; children: ReactNode }

/** Label + control; the label turns blue while the field is focused or has a value. */
export default function FormField({ label, filled, children }: Props) {
  return (
    <label className="group relative flex flex-col gap-1.5">
      <span className={cn('text-[11px] font-bold tracking-[1px] transition-colors group-focus-within:text-blue-accent', filled ? 'text-blue-accent' : 'text-[#718096]')}>
        {label}
      </span>
      {children}
    </label>
  )
}
