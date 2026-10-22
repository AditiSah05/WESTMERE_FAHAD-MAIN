import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import Card from './Card'

type Props = { label: string; value: string; delta?: number; icon: LucideIcon; accent?: 'gold' | 'blue' | 'navy' | 'green' }

const accents = { gold: 'bg-gold/12 text-gold', blue: 'bg-blue/10 text-blue', navy: 'bg-navy/10 text-navy', green: 'bg-[#10b981]/10 text-[#10b981]' }

export default function StatCard({ label, value, delta, icon: Icon, accent = 'blue' }: Props) {
  const up = (delta ?? 0) >= 0
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">{label}</span>
        <span className={cn('flex size-9 items-center justify-center rounded-lg', accents[accent])}><Icon size={18} /></span>
      </div>
      <p className="mt-3 text-[28px] font-medium leading-none tracking-[-0.03em] text-navy-deep">{value}</p>
      {delta !== undefined && (
        <p className={cn('mt-2 flex items-center gap-1 text-[13px] font-semibold', up ? 'text-[#047857]' : 'text-[#b91c1c]')}>
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(delta)}% <span className="font-medium text-muted">vs previous 30 days</span>
        </p>
      )}
    </Card>
  )
}
