'use client'

import {
  AlertCircle,
  BarChart3,
  Coins,
  CreditCard,
  Hourglass,
  Landmark,
  RefreshCcw,
  Wallet,
  XCircle,
} from 'lucide-react'
import type { PaymentsOverview } from '@/lib/server/payments'

function Sparkline({ points, color }: { points: number[]; color: string }) {
  if (!points || points.length < 2) return null
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const h = 26
  const w = 85

  const coords = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * (w - 4) + 2
    const y = h - ((val - min) / range) * (h - 8) - 4
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-[80px] flex-none overflow-visible">
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

export default function PaymentStatCards({ stats }: { stats: PaymentsOverview['stats'] }) {
  const cards = [
    {
      key: 'totalRevenue',
      label: stats.totalRevenue.label,
      value: stats.totalRevenue.value,
      badge: stats.totalRevenue.badge,
      badgeType: 'green' as const,
      subtext: stats.totalRevenue.subtext,
      spark: stats.totalRevenue.spark,
      sparkColor: '#10b981',
      icon: Coins,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'netRevenue',
      label: stats.netRevenue.label,
      value: stats.netRevenue.value,
      badge: stats.netRevenue.badge,
      badgeType: 'green' as const,
      subtext: stats.netRevenue.subtext,
      spark: stats.netRevenue.spark,
      sparkColor: '#10b981',
      icon: BarChart3,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'pendingPayments',
      label: stats.pendingPayments.label,
      value: stats.pendingPayments.value,
      badge: stats.pendingPayments.badge,
      badgeType: 'amber' as const,
      subtext: stats.pendingPayments.subtext,
      spark: stats.pendingPayments.spark,
      sparkColor: '#f59e0b',
      icon: Hourglass,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'failedTransactions',
      label: stats.failedTransactions.label,
      value: stats.failedTransactions.value,
      badge: stats.failedTransactions.badge,
      badgeType: 'red' as const,
      subtext: stats.failedTransactions.subtext,
      spark: stats.failedTransactions.spark,
      sparkColor: '#ef4444',
      icon: XCircle,
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
    },
    {
      key: 'totalRefunds',
      label: stats.totalRefunds.label,
      value: stats.totalRefunds.value,
      badge: stats.totalRefunds.badge,
      badgeType: 'green' as const,
      subtext: stats.totalRefunds.subtext,
      spark: stats.totalRefunds.spark,
      sparkColor: '#10b981',
      icon: RefreshCcw,
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
    },
    {
      key: 'totalBusinessExpenses',
      label: 'Total Business Expenses',
      value: '₹11,72,400',
      badge: '+9.7%',
      badgeType: 'red' as const,
      subtext: 'Operational & business expenditures',
      spark: [10, 12, 14, 15, 17, 19, 21, 23, 25, 27],
      sparkColor: '#ef4444',
      icon: Wallet,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'gatewayFees',
      label: stats.gatewayFees.label,
      value: stats.gatewayFees.value,
      badge: stats.gatewayFees.badge,
      badgeType: 'red' as const,
      subtext: stats.gatewayFees.subtext,
      spark: stats.gatewayFees.spark,
      sparkColor: '#ef4444',
      icon: CreditCard,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'pendingSettlements',
      label: stats.pendingSettlements.label,
      value: stats.pendingSettlements.value,
      badge: stats.pendingSettlements.badge,
      badgeType: 'green' as const,
      subtext: stats.pendingSettlements.subtext,
      spark: stats.pendingSettlements.spark,
      sparkColor: '#10b981',
      icon: Landmark,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
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
                  <p className="text-[12px] font-semibold tracking-[-0.01em] text-navy-deep/80">{c.label}</p>
                  <p className="text-[23px] font-bold tracking-tight text-navy-deep">{c.value}</p>
                </div>
              </div>
              <div className="pt-2">
                <Sparkline points={c.spark} color={c.sparkColor} />
              </div>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 pt-1 text-[11px] font-medium text-muted">
              {c.badge && (
                <span
                  className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-bold ${
                    c.badgeType === 'red'
                      ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20'
                      : c.badgeType === 'amber'
                      ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20'
                      : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                  }`}
                >
                  {c.badge}
                </span>
              )}
              <span className="truncate">{c.subtext}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
