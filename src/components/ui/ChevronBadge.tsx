import { cn } from '@/lib/cn'

const Chevron = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 6 10" fill="none" className={cn('h-2.5 w-1.5', flip && '-scale-x-100')} aria-hidden>
    <path d="M1 1l4 4-4 4" stroke="#52607A" strokeWidth="1.2" />
  </svg>
)

export default function ChevronBadge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border border-line bg-white px-2.5 py-[7px]',
        'text-xs font-semibold uppercase leading-none tracking-[0.15em] text-slate',
        'shadow-[inset_0_0_5px_rgba(27,42,74,0.08)]',
        className,
      )}
    >
      <Chevron />
      {children}
      <Chevron flip />
    </span>
  )
}
