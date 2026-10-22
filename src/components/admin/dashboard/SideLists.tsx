'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { money } from '@/lib/admin/format'
import { activity, pendingTasks, topProducts } from '@/lib/admin/data/dashboard'
import Card from '../ui/Card'

const title = 'mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep'

export function TopProducts() {
  const max = topProducts[0].revenue
  return (
    <Card className="p-5">
      <h2 className={title}>Top products</h2>
      <ul className="flex flex-col gap-4">
        {topProducts.map((p) => (
          <li key={p.name}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-medium text-navy-deep">
              <span className="truncate">{p.name}</span>
              <span className="flex-none text-muted">{p.sold} sold · {money(p.revenue)}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-[linear-gradient(90deg,#2563eb,#1b2a4a,#c4943d)]" style={{ width: `${(p.revenue / max) * 100}%` }} /></div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function PendingTasks() {
  const [done, setDone] = useState<string[]>([])
  return (
    <Card className="p-5">
      <h2 className={title}>Pending tasks <span className="text-sm font-medium text-muted">({pendingTasks.length - done.length} left)</span></h2>
      <ul className="flex flex-col gap-2.5">
        {pendingTasks.map((t) => {
          const on = done.includes(t)
          return (
            <li key={t}>
              <button type="button" onClick={() => setDone((d) => (on ? d.filter((x) => x !== t) : [...d, t]))} className="flex w-full items-center gap-3 text-left text-sm font-medium">
                <span className={cn('flex size-5 flex-none items-center justify-center rounded-md border', on ? 'border-gold bg-gold text-white' : 'border-line')}>{on && <Check size={13} strokeWidth={3} />}</span>
                <span className={cn(on ? 'text-muted line-through' : 'text-navy-deep')}>{t}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

export function RecentActivity() {
  return (
    <Card className="p-5">
      <h2 className={title}>Recent activity</h2>
      <ol className="relative flex flex-col gap-4 border-l border-dashed border-line pl-5">
        {activity.map((a) => (
          <li key={a.text} className="relative">
            <span className="absolute -left-[26px] top-1.5 size-2.5 rounded-full border-2 border-white bg-gold shadow-[0_0_0_1px_#e2e8f0]" />
            <p className="text-sm font-medium text-navy-deep">{a.text}</p>
            <p className="text-xs font-medium text-muted">{a.time}</p>
          </li>
        ))}
      </ol>
    </Card>
  )
}
