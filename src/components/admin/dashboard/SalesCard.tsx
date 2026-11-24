'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import BarChart from '../charts/BarChart'
import LineChart from '../charts/LineChart'
import Card from '../ui/Card'

const ranges = [{ key: '12m', label: 'Monthly' }, { key: '30d', label: 'Daily' }] as const

type Props = { monthLabels: string[]; monthly: number[]; monthlyOrders: number[]; dayLabels: string[]; daily: number[]; dailyOrders: number[] }

export default function SalesCard({ monthLabels, monthly, monthlyOrders, dayLabels, daily, dailyOrders }: Props) {
  const [range, setRange] = useState<'12m' | '30d'>('12m')
  const [metric, setMetric] = useState<'Revenue' | 'Orders'>('Revenue')

  return (
    <Card className="p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-navy-deep">Sales Analytics</h2>
          <div className="mt-2 flex gap-1.5">
            {(['Revenue', 'Orders'] as const).map((m) => <button key={m} type="button" onClick={() => setMetric(m)} className={cn('rounded-md px-3 py-1 text-[13px] font-medium', metric === m ? 'bg-navy-deep text-white' : 'text-slate hover:bg-paper')}>{m}</button>)}
          </div>
        </div>
        <div className="flex rounded-lg border border-line p-0.5">
          {ranges.map((r) => (
            <button key={r.key} type="button" onClick={() => setRange(r.key)} className={cn('rounded-md px-3 py-1.5 text-[13px] font-medium', range === r.key ? 'bg-navy-deep text-white' : 'text-slate')}>{r.label}</button>
          ))}
        </div>
      </div>
      {range === '12m' ? (
        <>
          <BarChart labels={monthLabels} series={[{ name: metric, color: '#c4943d', values: metric === 'Revenue' ? monthly : monthlyOrders }]} />
          <div className="mt-2 flex gap-5 text-[13px] font-medium text-slate">
            <span className="flex items-center gap-2"><i className="size-2.5 rounded-sm bg-gold" />{metric}</span>
          </div>
        </>
      ) : (
        <LineChart labels={dayLabels} values={metric === 'Revenue' ? daily : dailyOrders} color="#c4943d" />
      )}
    </Card>
  )
}
