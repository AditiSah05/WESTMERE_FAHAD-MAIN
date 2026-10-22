import { cn } from '@/lib/cn'

type Props = { tabs: { key: string; label: string }[]; active: string; onChange: (key: string) => void }

export default function Tabs({ tabs, active, onChange }: Props) {
  return (
    <div className="mb-5 flex gap-1.5 overflow-x-auto pb-1" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          role="tab"
          aria-selected={t.key === active}
          onClick={() => onChange(t.key)}
          className={cn(
            'whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition',
            t.key === active
              ? 'border-navy bg-[linear-gradient(135deg,#1b2a4a_0%,#2f4166_60%,#c4943d_100%)] text-white'
              : 'border-line bg-white text-slate hover:border-navy/30 hover:text-navy-deep',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
