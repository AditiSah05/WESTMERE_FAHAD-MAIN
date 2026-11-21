'use client'

import React from 'react'
import {
  Coins,
  BarChart3,
  Users,
  Calendar,
  AlertCircle,
  TrendingDown,
  Layers,
  Trophy,
} from 'lucide-react'
import type { SubscriptionsOverview } from '@/lib/server/subscriptions'

interface Props {
  stats: SubscriptionsOverview['stats']
}

function MiniSparkline({ data, strokeColor }: { data: number[]; strokeColor: string }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const width = 64
  const height = 24
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width
      const y = height - ((val - min) / range) * (height - 6) - 3
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

export default function SubscriptionStatCards({ stats }: Props) {
  const cards = [
    {
      label: stats.mrr.label,
      value: stats.mrr.value,
      badge: stats.mrr.badge,
      subtext: stats.mrr.subtext,
      spark: stats.mrr.spark,
      sparkColor: '#10b981',
      icon: Coins,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: stats.arr.label,
      value: stats.arr.value,
      badge: stats.arr.badge,
      subtext: stats.arr.subtext,
      spark: stats.arr.spark,
      sparkColor: '#10b981',
      icon: BarChart3,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: stats.activeSubscribers.label,
      value: stats.activeSubscribers.value,
      badge: stats.activeSubscribers.badge,
      subtext: stats.activeSubscribers.subtext,
      spark: stats.activeSubscribers.spark,
      sparkColor: '#10b981',
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      label: stats.upcomingRenewals.label,
      value: stats.upcomingRenewals.value,
      subtext: stats.upcomingRenewals.subtext,
      spark: stats.upcomingRenewals.spark,
      sparkColor: '#f59e0b',
      icon: Calendar,
      iconBg: 'bg-rose-50 text-rose-500',
    },
    {
      label: stats.failedRenewals.label,
      value: stats.failedRenewals.value,
      subtext: stats.failedRenewals.subtext,
      spark: stats.failedRenewals.spark,
      sparkColor: '#ef4444',
      icon: AlertCircle,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      label: stats.churnRate.label,
      value: stats.churnRate.value,
      badge: stats.churnRate.badge,
      subtext: stats.churnRate.subtext,
      spark: stats.churnRate.spark,
      sparkColor: '#10b981',
      icon: TrendingDown,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      label: stats.arpu.label,
      value: stats.arpu.value,
      badge: stats.arpu.badge,
      subtext: stats.arpu.subtext,
      spark: stats.arpu.spark,
      sparkColor: '#10b981',
      icon: Layers,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: stats.lifetimeRevenue.label,
      value: stats.lifetimeRevenue.value,
      badge: stats.lifetimeRevenue.badge,
      subtext: stats.lifetimeRevenue.subtext,
      spark: stats.lifetimeRevenue.spark,
      sparkColor: '#10b981',
      icon: Trophy,
      iconBg: 'bg-amber-50 text-amber-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight truncate">
                {card.label}
              </span>
            </div>

            <div className="flex items-end justify-between mt-1">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold text-slate-900 tracking-tight">
                    {card.value}
                  </span>
                  {card.badge && (
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        card.badge.startsWith('+')
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {card.badge.startsWith('+') ? '↑' : '↓'} {card.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">{card.subtext}</p>
              </div>

              <div className="shrink-0 mb-1">
                <MiniSparkline data={card.spark} strokeColor={card.sparkColor} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
