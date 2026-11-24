import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import Card from './Card'

type Props = {
  label: string
  value: string
  delta?: number
  icon: LucideIcon
  accent?: 'gold' | 'blue' | 'navy' | 'green' | 'purple'
  spark?: number[] | boolean
  sparkStroke?: string
  note?: string
  unit?: string
  vs?: string
  sub?: string
  isNew?: boolean
  comparePrevious?: boolean
}

const accents = {
  gold: 'bg-gold/12 text-gold',
  blue: 'bg-blue/10 text-blue',
  navy: 'bg-navy/10 text-navy',
  green: 'bg-[#10b981]/10 text-[#10b981]',
  purple: 'bg-[#7c3aed]/10 text-[#7c3aed]',
}

const defaultSparkColor = {
  gold: '#c4943d',
  blue: '#2563eb',
  navy: '#7c3aed',
  green: '#10b981',
  purple: '#7c3aed',
}

/** Tiny trend line from real figures or subtle baseline curve when values are zero. */
function Spark({ values, color }: { values?: number[] | boolean; color: string }) {
  if (!values) return null
  const arr = Array.isArray(values) && values.length >= 2 ? values : [2, 4, 3, 5, 4, 6, 5, 8]
  const isAllZero = arr.every((v) => v === 0)
  const pts = isAllZero ? [2, 3, 5, 4, 6, 5, 7, 8] : arr
  const max = Math.max(...pts, 1)
  const polyPoints = pts
    .map(
      (v, i) =>
        `${((i / (pts.length - 1)) * 100).toFixed(1)},${(26 - (v / max) * 22).toFixed(1)}`
    )
    .join(' ')

  return (
    <svg
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      className="h-8 w-24 flex-none"
      aria-hidden
    >
      <polyline
        points={polyPoints}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = 'blue',
  spark,
  sparkStroke,
  note,
  unit = '%',
  vs,
  sub,
  isNew,
  comparePrevious = true,
}: Props) {
  const up = (delta ?? 0) >= 0
  const chosenSparkColor = sparkStroke || defaultSparkColor[accent]

  return (
    <Card
      className={cn(
        'relative p-4 transition',
        isNew
          ? 'border-2 border-[#c4943d]/80 bg-white shadow-xs hover:border-[#c4943d]'
          : 'border border-line bg-white'
      )}
    >
      {/* NEW Pill Badge */}
      {isNew && (
        <span className="absolute -top-2.5 left-4 rounded-full bg-[#c4943d] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
          NEW
        </span>
      )}

      <div className="flex items-center gap-3">
        <span
          className={cn(
            'flex size-11 flex-none items-center justify-center rounded-xl',
            accents[accent]
          )}
        >
          <Icon size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block text-[13px] font-semibold leading-tight text-navy-deep">
            {label}
          </span>
          <div className="mt-0.5 flex items-end justify-between gap-2">
            <p className="text-[24px] font-semibold leading-tight tracking-[-0.03em] text-navy-deep">
              {value}
            </p>
            {spark && <Spark values={spark} color={chosenSparkColor} />}
          </div>
        </div>
      </div>

      {comparePrevious && delta !== undefined ? (
        <p
          className={cn(
            'mt-2.5 flex items-center gap-1 text-[12.5px] font-semibold',
            up ? 'text-[#047857]' : 'text-[#b91c1c]'
          )}
        >
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(delta)}
          {unit} <span className="font-medium text-muted">{vs ?? 'vs previous 30 days'}</span>
        </p>
      ) : note ? (
        <p className="mt-2.5 text-[12.5px] font-medium text-muted">{note}</p>
      ) : null}

      {sub && <p className="mt-0.5 text-[12.5px] font-medium text-muted">{sub}</p>}
    </Card>
  )
}
