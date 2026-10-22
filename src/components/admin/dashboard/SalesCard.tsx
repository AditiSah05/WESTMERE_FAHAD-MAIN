'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { daily30, days30, months, profit12, revenue12 } from '@/lib/admin/data/dashboard'
import BarChart from '../charts/BarChart'
import LineChart from '../charts/LineChart'
import Card from '../ui/Card'

const ranges = [{ key: '12m', label: '12 months' }, { key: '30d', label: '30 days' }] as const

export default function SalesCard() {
  const [range, setRange] = useState<'12m' | '30d'>('12m')

  return (
    <Card className="p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium tracking-[-0.02em] text-navy-deep">Sales overview</h2>
          <p className="text-[13px] font-medium text-muted">{range === '12m' ? 'Revenue and profit by month' : 'Daily revenue, last 30 days'}</p>
        </div>
        <div className="flex rounded-lg border border-line p-0.5">
          {ranges.map((r) => (
            <button key={r.key} type="button" onClick={() => setRange(r.key)} className={cn('rounded-md px-3 py-1.5 text-[13px] font-medium', range === r.key ? 'bg-navy-deep text-white' : 'text-slate')}>{r.label}</button>
          ))}
        </div>
      </div>
      {range === '12m' ? (
        <>
          <BarChart labels={months} series={[{ name: 'Revenue', color: '#1b2a4a', values: revenue12 }, { name: 'Profit', color: '#c4943d', values: profit12 }]} />
          <div className="mt-2 flex gap-5 text-[13px] font-medium text-slate">
            <span className="flex items-center gap-2"><i className="size-2.5 rounded-sm bg-navy" />Revenue</span>
            <span className="flex items-center gap-2"><i className="size-2.5 rounded-sm bg-gold" />Profit</span>
          </div>
        </>
      ) : (
        <LineChart labels={days30} values={daily30} />
      )}
    </Card>
  )
}
