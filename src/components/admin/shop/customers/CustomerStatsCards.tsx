'use client'

import {
  CheckCircle2,
  Coins,
  IndianRupee,
  Layers,
  RefreshCw,
  UserMinus,
  UserPlus,
  Users,
} from 'lucide-react'
import type { ShopCustomersOverview } from '@/lib/server/shop-customers'

function MiniSparkline({ points, color }: { points: number[]; color: string }) {
  if (!points || points.length < 2) return null
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const h = 26
  const w = 90

  // SVG coordinates
  const coords = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * (w - 4) + 2
    const y = h - ((val - min) / range) * (h - 8) - 4
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-[85px] flex-none overflow-visible">
      <polyline
        points={coords.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CustomerStatsCards({ stats }: { stats: ShopCustomersOverview['stats'] }) {
  const cards = [
    {
      key: 'total',
      label: stats.totalCustomers.label,
      value: stats.totalCustomers.value,
      badge: stats.totalCustomers.badge,
      badgeType: 'green' as const,
      subtext: stats.totalCustomers.subtext,
      spark: stats.totalCustomers.spark,
      sparkColor: '#2563eb',
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    },
    {
      key: 'new',
      label: stats.newCustomers.label,
      value: stats.newCustomers.value,
      badge: stats.newCustomers.badge,
      badgeType: 'green' as const,
      subtext: stats.newCustomers.subtext,
      spark: stats.newCustomers.spark,
      sparkColor: '#10b981',
      icon: UserPlus,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'active',
      label: stats.activeCustomers.label,
      value: stats.activeCustomers.value,
      badge: stats.activeCustomers.badge,
      badgeType: 'green' as const,
      subtext: stats.activeCustomers.subtext,
      spark: stats.activeCustomers.spark,
      sparkColor: '#10b981',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    },
    {
      key: 'paying',
      label: stats.payingCustomers.label,
      value: stats.payingCustomers.value,
      badge: stats.payingCustomers.badge,
      badgeType: 'green' as const,
      subtext: stats.payingCustomers.subtext,
      spark: stats.payingCustomers.spark,
      sparkColor: '#10b981',
      icon: Coins,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'revenue',
      label: stats.totalRevenue.label,
      value: stats.totalRevenue.value,
      badge: stats.totalRevenue.badge,
      badgeType: 'green' as const,
      subtext: stats.totalRevenue.subtext,
      spark: stats.totalRevenue.spark,
      sparkColor: '#10b981',
      icon: IndianRupee,
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
    },
    {
      key: 'repeat',
      label: stats.repeatCustomers.label,
      value: stats.repeatCustomers.value,
      badge: stats.repeatCustomers.badge,
      badgeType: 'green' as const,
      subtext: stats.repeatCustomers.subtext,
      spark: stats.repeatCustomers.spark,
      sparkColor: '#06b6d4',
      icon: RefreshCw,
      iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
    },
    {
      key: 'subscribers',
      label: stats.activeSubscribers.label,
      value: stats.activeSubscribers.value,
      badge: stats.activeSubscribers.badge,
      badgeType: 'green' as const,
      subtext: stats.activeSubscribers.subtext,
      spark: stats.activeSubscribers.spark,
      sparkColor: '#06b6d4',
      icon: Layers,
      iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
    },
    {
      key: 'inactive',
      label: stats.inactiveCustomers.label,
      value: stats.inactiveCustomers.value,
      badge: stats.inactiveCustomers.badge,
      badgeType: 'red' as const,
      subtext: stats.inactiveCustomers.subtext,
      spark: stats.inactiveCustomers.spark,
      sparkColor: '#ef4444',
      icon: UserMinus,
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div
            key={c.key}
            className="flex flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`flex size-11 items-center justify-center rounded-xl shadow-xs ${c.iconBg}`}>
                  <Icon size={20} strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-[12.5px] font-semibold tracking-[-0.01em] text-navy-deep/80">{c.label}</p>
                  <p className="text-[23px] font-bold tracking-tight text-navy-deep">{c.value}</p>
                </div>
              </div>
              <div className="pt-2">
                <MiniSparkline points={c.spark} color={c.sparkColor} />
              </div>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 pt-1 text-[11.5px] font-medium text-muted">
              <span
                className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-bold ${
                  c.badgeType === 'green'
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                    : 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20'
                }`}
              >
                {c.badge}
              </span>
              <span className="truncate">{c.subtext}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
