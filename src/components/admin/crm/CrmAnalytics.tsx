'use client'

import {
  BarChart3,
  Globe,
  PieChart,
} from 'lucide-react'
import { useState } from 'react'
import type { CrmOverview } from '@/lib/server/crm'

type Props = {
  trend: CrmOverview['leadTrend']
  wonVsLost: CrmOverview['wonVsLost']
  sources: CrmOverview['leadsBySource']
}

function LeadTrendChart({ trend }: { trend: CrmOverview['leadTrend'] }) {
  const w = 420
  const h = 130
  const padL = 32
  const padR = 14
  const padT = 12
  const padB = 22

  const max = 340
  const min = 0

  const getX = (idx: number) => padL + ((w - padL - padR) * idx) / (trend.labels.length - 1)
  const getY = (val: number) => padT + (h - padT - padB) * (1 - (val - min) / (max - min))

  const pts = trend.values.map((v, i) => [getX(i), getY(v)] as const)
  const linePath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L ${getX(trend.labels.length - 1)} ${h - padB} L ${getX(0)} ${h - padB} Z`

  const yLabels = ['320', '240', '160', '80', '0']

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible">
      <defs>
        <linearGradient id="leadAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
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

      <path d={areaPath} fill="url(#leadAreaGrad)" />
      <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

      {pts.map(([x, y], idx) => (
        <circle key={trend.labels[idx]} cx={x} cy={y} r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
      ))}

      {trend.labels.map((l, i) => (
        <text key={l} x={getX(i)} y={h - 6} textAnchor="middle" fontSize="10" fill="#718096" fontWeight="500">
          {l}
        </text>
      ))}
    </svg>
  )
}

function WonLostDonut({ wonVsLost }: { wonVsLost: CrmOverview['wonVsLost'] }) {
  const r = 50
  const c = 2 * Math.PI * r
  const wonLength = (wonVsLost.won / wonVsLost.total) * c
  const lostLength = (wonVsLost.lost / wonVsLost.total) * c

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex size-[120px] shrink-0 items-center justify-center">
        <svg viewBox="0 0 130 130" className="size-full -rotate-90">
          <circle cx="65" cy="65" r={r} fill="none" stroke="#f1f5f9" strokeWidth="16" />
          {/* Won Arc (Green) */}
          <circle
            cx="65"
            cy="65"
            r={r}
            fill="none"
            stroke="#10b981"
            strokeWidth="16"
            strokeDasharray={`${wonLength - 2} ${c - wonLength + 2}`}
            strokeDashoffset="0"
          />
          {/* Lost Arc (Red) */}
          <circle
            cx="65"
            cy="65"
            r={r}
            fill="none"
            stroke="#ef4444"
            strokeWidth="16"
            strokeDasharray={`${lostLength - 2} ${c - lostLength + 2}`}
            strokeDashoffset={-wonLength}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-lg font-bold text-navy-deep leading-tight">{wonVsLost.total}</span>
          <span className="text-[10px] font-medium text-muted">Total Deals</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 text-xs font-semibold">
        <div className="flex items-center justify-between text-navy-deep">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-emerald-500" />
            <span className="text-muted">Won Deals</span>
          </div>
          <div>
            <span>{wonVsLost.won}</span> <span className="text-[11px] text-muted">({wonVsLost.wonPct})</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-navy-deep">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-500" />
            <span className="text-muted">Lost Deals</span>
          </div>
          <div>
            <span>{wonVsLost.lost}</span> <span className="text-[11px] text-muted">({wonVsLost.lostPct})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CrmAnalytics({ trend, wonVsLost, sources }: Props) {
  const [period, setPeriod] = useState('Last 6 Months')

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* 1. Lead Acquisition Trend */}
      <div className="flex flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-xs">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-gold">
                <BarChart3 size={15} />
              </span>
              <h3 className="text-sm font-bold text-navy-deep">CRM Insights</h3>
            </div>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border border-line bg-white px-2 py-1 text-xs font-semibold text-navy-deep outline-none cursor-pointer"
            >
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Year">This Year</option>
            </select>
          </div>

          <p className="mt-2 text-xs font-bold text-navy-deep/80">Lead Acquisition Trend</p>
        </div>

        <div className="mt-3">
          <LeadTrendChart trend={trend} />
        </div>
      </div>

      {/* 2. Won vs Lost Deals */}
      <div className="flex flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <PieChart size={15} />
            </span>
            <h3 className="text-sm font-bold text-navy-deep">Won vs Lost Deals</h3>
          </div>

          <div className="mt-4">
            <WonLostDonut wonVsLost={wonVsLost} />
          </div>
        </div>
      </div>

      {/* 3. Leads by Source */}
      <div className="flex flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Globe size={15} />
            </span>
            <h3 className="text-sm font-bold text-navy-deep">Leads by Source</h3>
          </div>

          <div className="mt-3 space-y-2">
            {sources.map((s) => (
              <div key={s.source} className="flex items-center justify-between gap-3 text-xs">
                <span className="w-36 truncate font-medium text-navy-deep/90">{s.source}</span>
                <div className="h-2 flex-1 rounded-full bg-line overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                </div>
                <span className="w-10 text-right font-bold text-navy-deep">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
