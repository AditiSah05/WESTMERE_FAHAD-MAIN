import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const labelClass = 'text-xs font-semibold uppercase leading-none tracking-[0.15em] text-ink'
export const controlClass = 'block w-full bg-transparent px-4 text-base font-medium text-ink outline-none placeholder:text-muted'

/** Label + a white 8px box whose 1px ink outline is a pseudo-element, like the reference. */
export default function FormField({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)}>
      <span className={labelClass}>{label}</span>
      <span className="relative block rounded-lg bg-white after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:border after:border-ink after:transition-colors after:content-[''] focus-within:after:border-blue-accent">
        {children}
      </span>
    </label>
  )
}
