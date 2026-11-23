import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import Card from './Card'

type Props = { label: string; value: string; delta?: number; icon: LucideIcon; accent?: 'gold' | 'blue' | 'navy' | 'green'; spark?: number[]; note?: string; unit?: string; vs?: string; sub?: string }

const accents = { gold: 'bg-gold/12 text-gold', blue: 'bg-blue/10 text-blue', navy: 'bg-navy/10 text-navy', green: 'bg-[#10b981]/10 text-[#10b981]' }

const sparkColor = { gold: '#c4943d', blue: '#2563eb', navy: '#7c3aed', green: '#10b981' }

/** Tiny trend line from real daily figures. Hidden when there is nothing to draw. */
function Spark({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values)
  if (values.length < 2 || max <= 0) return null
  const pts = values.map((v, i) => `${((i / (values.length - 1)) * 100).toFixed(1)},${(26 - (v / max) * 24).toFixed(1)}`).join(' ')
  return <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="h-8 w-24 flex-none" aria-hidden><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" /></svg>
}

export default function StatCard({ label, value, delta, icon: Icon, accent = 'blue', spark, note, unit = '%', vs, sub }: Props) {
  const up = (delta ?? 0) >= 0
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <span className={cn('flex size-11 flex-none items-center justify-center rounded-xl', accents[accent])}><Icon size={22} /></span>
        <div className="min-w-0 flex-1">
          <span className="block text-[13px] font-semibold leading-tight text-navy-deep">{label}</span>
          <div className="mt-0.5 flex items-end justify-between gap-2">
            <p className="text-[24px] font-semibold leading-tight tracking-[-0.03em] text-navy-deep">{value}</p>
            {spark && <Spark values={spark} color={sparkColor[accent]} />}
          </div>
        </div>
      </div>
      {delta !== undefined ? (
        <p className={cn('mt-2.5 flex items-center gap-1 text-[12.5px] font-semibold', up ? 'text-[#047857]' : 'text-[#b91c1c]')}>
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(delta)}{unit} <span className="font-medium text-muted">{vs ?? 'vs previous 30 days'}</span>
        </p>
      ) : note ? <p className="mt-2.5 text-[12.5px] font-medium text-muted">{note}</p> : null}
      {sub && <p className="mt-0.5 text-[12.5px] font-medium text-muted">{sub}</p>}
    </Card>
  )
}
