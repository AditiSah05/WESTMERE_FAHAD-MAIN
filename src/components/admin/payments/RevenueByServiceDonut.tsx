'use client'

import { PieChart } from 'lucide-react'
import type { PaymentsOverview } from '@/lib/server/payments'

type Props = {
  data: PaymentsOverview['serviceBreakdown']
}

export default function RevenueByServiceDonut({ data }: Props) {
  const r = 50
  const c = 2 * Math.PI * r
  let accumulated = 0

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-xs">
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <span className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <PieChart size={15} />
        </span>
        <h3 className="text-sm font-bold text-navy-deep">Revenue by Service</h3>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="relative flex size-[135px] shrink-0 items-center justify-center">
          <svg viewBox="0 0 130 130" className="size-full -rotate-90">
            <circle cx="65" cy="65" r={r} fill="none" stroke="#f1f5f9" strokeWidth="15" />
            {data.items.map((item) => {
              const strokeLength = (item.pct / 100) * c
              const el = (
                <circle
                  key={item.name}
                  cx="65"
                  cy="65"
                  r={r}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="15"
                  strokeDasharray={`${strokeLength - 2} ${c - strokeLength + 2}`}
                  strokeDashoffset={-accumulated}
                />
              )
              accumulated += strokeLength
              return el
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-navy-deep leading-tight">{data.totalRevenueFormatted}</span>
            <span className="text-[10px] font-medium text-muted">Total Revenue</span>
          </div>
        </div>

        {/* Breakdown Legend */}
        <div className="mt-3.5 w-full space-y-1.5 text-xs font-medium">
          {data.items.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-navy-deep">
              <div className="flex items-center gap-1.5 truncate">
                <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate text-muted">{item.name}</span>
              </div>
              <span className="font-bold">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
