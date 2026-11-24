'use client'

import {
  TrendingUp,
} from 'lucide-react'
import { useState } from 'react'
import type { PaymentsOverview } from '@/lib/server/payments'

type Props = {
  data: PaymentsOverview['revenueOverview']
}

export default function RevenueOverviewChart({ data }: Props) {
  const [timeframe, setTimeframe] = useState('Monthly')
  const timeframes = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']

  const w = 520
  const h = 180
  const padL = 36
  const padR = 12
  const padT = 16
  const padB = 24

  const maxVal = 50
  const minVal = 0

  const getX = (idx: number) => padL + ((w - padL - padR) * idx) / (data.labels.length - 1)
  const getY = (val: number) => padT + (h - padT - padB) * (1 - (val - minVal) / (maxVal - minVal))

  // Revenue path
  const revPts = data.revPoints.map((v, i) => [getX(i), getY(v)] as const)
  const revLine = revPts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const revArea = `${revLine} L ${getX(data.labels.length - 1)} ${h - padB} L ${getX(0)} ${h - padB} Z`

  // Expense path
  const expPts = data.expPoints.map((v, i) => [getX(i), getY(v)] as const)
  const expLine = expPts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')

  const yLabels = ['₹50L', '₹40L', '₹30L', '₹20L', '₹10L', '₹0']

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-xs">
      {/* Header: Title + Timeframe toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-gold">
            <TrendingUp size={15} />
          </span>
          <h3 className="text-sm font-bold text-navy-deep">Revenue Overview</h3>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-line bg-[#f8fafc] p-0.5 text-xs font-semibold">
          {timeframes.map((tf) => {
            const active = timeframe === tf
            return (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`rounded-md px-2.5 py-1 transition-all ${
                  active ? 'bg-gold text-white shadow-2xs' : 'text-muted hover:text-navy-deep'
                }`}
              >
                {tf}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Stats Summary & Dual Chart */}
      <div className="mt-3 flex flex-col gap-3">
        {/* Top Metric Indicators */}
        <div className="flex flex-wrap items-center justify-end gap-5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#1e40af]" />
            <span className="text-muted">Revenue:</span>
            <strong className="font-bold text-navy-deep">{data.revenue}</strong>
            <span className="rounded bg-emerald-50 px-1 py-0.2 text-[10.5px] font-bold text-emerald-700">
              {data.revBadge}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#d97706]" />
            <span className="text-muted">Expenses:</span>
            <strong className="font-bold text-navy-deep">{data.expenses}</strong>
            <span className="rounded bg-emerald-50 px-1 py-0.2 text-[10.5px] font-bold text-emerald-700">
              {data.expBadge}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#10b981]" />
            <span className="text-muted">Net Profit:</span>
            <strong className="font-bold text-emerald-700">{data.netProfit}</strong>
            <span className="rounded bg-emerald-50 px-1 py-0.2 text-[10.5px] font-bold text-emerald-700">
              {data.profitBadge}
            </span>
          </div>
        </div>

        {/* Dual Line SVG */}
        <div className="w-full">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, idx) => {
              const y = padT + (h - padT - padB) * ratio
              return (
                <g key={ratio}>
                  <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <text x={padL - 6} y={y + 3.5} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                    {yLabels[idx]}
                  </text>
                </g>
              )
            })}

            {/* Revenue Area & Curve */}
            <path d={revArea} fill="url(#revGrad)" />
            <path d={revLine} fill="none" stroke="#1e40af" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            {revPts.map(([x, y], idx) => (
              <circle key={`rev-${idx}`} cx={x} cy={y} r="3" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
            ))}

            {/* Expenses Curve */}
            <path d={expLine} fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" />
            {expPts.map(([x, y], idx) => (
              <circle key={`exp-${idx}`} cx={x} cy={y} r="2.8" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
            ))}

            {/* X-axis labels */}
            {data.labels.map((l, i) => (
              <text key={l} x={getX(i)} y={h - 6} textAnchor="middle" fontSize="10" fill="#718096" fontWeight="500">
                {l}
              </text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
