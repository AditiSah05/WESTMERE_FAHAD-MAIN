'use client'

import {
  ArrowUpRight,
  ChevronDown,
  Download,
  PieChart,
  Repeat,
  ShoppingCart,
  User,
  UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import type { CustomerActivityItem, CustomerSegment, GrowthPoint } from '@/lib/server/shop-customers'

type Props = {
  growth: {
    period: string
    currentTotal: string
    growthBadge: string
    points: GrowthPoint[]
  }
  segments: CustomerSegment[]
  activities: CustomerActivityItem[]
}

function DonutSegmentChart({ segments, totalText }: { segments: CustomerSegment[]; totalText: string }) {
  const total = segments.reduce((acc, s) => acc + s.value, 0)
  const r = 50
  const c = 2 * Math.PI * r
  let accumulated = 0

  return (
    <div className="relative flex size-[130px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 130 130" className="size-full -rotate-90">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#f1f5f9" strokeWidth="15" />
        {segments.map((seg) => {
          const strokeLength = (seg.value / total) * c
          const el = (
            <circle
              key={seg.label}
              cx="65"
              cy="65"
              r={r}
              fill="none"
              stroke={seg.color}
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
        <span className="text-[17px] font-bold text-navy-deep leading-tight">{totalText}</span>
        <span className="text-[10px] font-medium text-muted">Total Customers</span>
      </div>
    </div>
  )
}

function GrowthLineChart({ points }: { points: GrowthPoint[] }) {
  const w = 420
  const h = 135
  const padL = 36
  const padR = 14
  const padT = 16
  const padB = 22

  const values = points.map((p) => p.value)
  const max = 2600
  const min = 1750

  const getX = (idx: number) => padL + ((w - padL - padR) * idx) / (points.length - 1)
  const getY = (val: number) => padT + (h - padT - padB) * (1 - (val - min) / (max - min))

  const pts = points.map((p, i) => [getX(i), getY(p.value)] as const)
  const linePath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L ${getX(points.length - 1)} ${h - padB} L ${getX(0)} ${h - padB} Z`

  const yLabels = ['2.6K', '2.2K', '1.8K']

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="growthAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid guide lines */}
        {[0, 0.5, 1].map((ratio, idx) => {
          const y = padT + (h - padT - padB) * ratio
          return (
            <g key={ratio}>
              <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <text x={padL - 6} y={y + 3.5} textAnchor="end" fontSize="9.5" fill="#94a3b8" fontFamily="monospace">
                {yLabels[idx]}
              </text>
            </g>
          )
        })}

        {/* Gradient fill area */}
        <path d={areaPath} fill="url(#growthAreaGrad)" />

        {/* Curve stroke */}
        <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {pts.map(([x, y], idx) => (
          <circle key={points[idx].label} cx={x} cy={y} r="3.2" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
        ))}

        {/* X axis labels */}
        {points.map((p, i) => (
          <text key={p.label} x={getX(i)} y={h - 6} textAnchor="middle" fontSize="10" fill="#718096" fontWeight="500">
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

export default function CustomerAnalytics({ growth, segments, activities }: Props) {
  const [period, setPeriod] = useState('Last 6 Months')

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* 1. Customer Growth */}
      <div className="flex flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-xs">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-deep">Customer Growth</h3>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border border-line bg-white px-2 py-1 text-xs font-semibold text-navy-deep shadow-2xs outline-none cursor-pointer"
            >
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Year">This Year</option>
            </select>
          </div>

          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-navy-deep">{growth.currentTotal}</span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-bold text-emerald-700">
              <ArrowUpRight size={13} />
              {growth.growthBadge}
            </span>
            <span className="text-xs font-medium text-muted">Total Customers</span>
          </div>
        </div>

        <div className="mt-3">
          <GrowthLineChart points={growth.points} />
        </div>
      </div>

      {/* 2. Customer Segments */}
      <div className="flex flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <PieChart size={16} className="text-gold" />
            <h3 className="text-sm font-bold text-navy-deep">Customer Segments</h3>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <DonutSegmentChart segments={segments} totalText={growth.currentTotal} />

            <ul className="flex flex-1 flex-col gap-1.5 text-xs font-medium">
              {segments.map((seg) => (
                <li key={seg.label} className="flex items-center justify-between text-navy-deep">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                    <span className="truncate text-muted">{seg.label}</span>
                  </div>
                  <div className="font-semibold">
                    <span>{seg.value.toLocaleString()}</span>{' '}
                    <span className="text-[11px] text-muted">({seg.pct})</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Recent Customer Activity */}
      <div className="flex flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-xs">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-navy-deep">Recent Customer Activity</h3>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-gold hover:underline inline-flex items-center gap-0.5"
            >
              <span>View All Activity</span>
              <span>→</span>
            </Link>
          </div>

          <div className="mt-3 space-y-2.5">
            {activities.map((act) => {
              const Icon =
                act.icon === 'user'
                  ? User
                  : act.icon === 'userPlus'
                  ? UserPlus
                  : act.icon === 'cart'
                  ? ShoppingCart
                  : act.icon === 'repeat'
                  ? Repeat
                  : Download

              const iconCls =
                act.color === 'emerald'
                  ? 'bg-emerald-50 text-emerald-600'
                  : act.color === 'purple'
                  ? 'bg-purple-50 text-purple-600'
                  : act.color === 'cyan'
                  ? 'bg-cyan-50 text-cyan-600'
                  : act.color === 'amber'
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-blue-50 text-blue-600'

              return (
                <div key={act.id} className="flex items-start justify-between gap-2.5 text-xs">
                  <div className="flex items-start gap-2">
                    <span className={`mt-0.5 flex size-5.5 shrink-0 items-center justify-center rounded-full ${iconCls}`}>
                      <Icon size={12} />
                    </span>
                    <span className="font-medium text-navy-deep leading-snug">{act.text}</span>
                  </div>
                  <span className="shrink-0 text-[11px] font-medium text-muted whitespace-nowrap">{act.time}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
