import { toneFor } from '@/lib/admin/format'
import type { Cell, Tone } from '@/lib/admin/types'
import { cn } from '@/lib/cn'

const tones: Record<Tone, string> = {
  green: 'bg-[#10b981]/10 text-[#047857]',
  amber: 'bg-gold/15 text-[#8a6420]',
  red: 'bg-[#ef4444]/10 text-[#b91c1c]',
  blue: 'bg-blue/10 text-blue',
  navy: 'bg-navy/10 text-navy',
  gray: 'bg-[#64748b]/10 text-[#475569]',
}

export default function StatusBadge({ value, tone }: { value: Cell; tone?: Tone }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-[3px] text-xs font-semibold', tones[tone ?? toneFor(value)])}>
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {String(value)}
    </span>
  )
}
