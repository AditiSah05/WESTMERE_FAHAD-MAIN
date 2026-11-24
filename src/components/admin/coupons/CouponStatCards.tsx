'use client'

import React from 'react'
import {
  Tag,
  Coins,
  BarChart3,
  BadgePercent,
  Megaphone,
  Users,
  Target,
  ShoppingCart,
} from 'lucide-react'
import type { CouponsOverview } from '@/lib/server/coupons'

interface Props {
  stats: CouponsOverview['stats']
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

export default function CouponStatCards({ stats }: Props) {
  const cards = [
    {
      label: stats.activeCoupons.label,
      value: stats.activeCoupons.value,
      badge: stats.activeCoupons.badge,
      subtext: stats.activeCoupons.subtext,
      spark: stats.activeCoupons.spark,
      sparkColor: '#10b981',
      icon: Tag,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: stats.totalRedemptions.label,
      value: stats.totalRedemptions.value,
      badge: stats.totalRedemptions.badge,
      subtext: stats.totalRedemptions.subtext,
      spark: stats.totalRedemptions.spark,
      sparkColor: '#10b981',
      icon: Coins,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: stats.promoRevenue.label,
      value: stats.promoRevenue.value,
      badge: stats.promoRevenue.badge,
      subtext: stats.promoRevenue.subtext,
      spark: stats.promoRevenue.spark,
      sparkColor: '#10b981',
      icon: BarChart3,
      iconBg: 'bg-orange-50 text-orange-600',
    },
    {
      label: stats.discountGiven.label,
      value: stats.discountGiven.value,
      subtext: stats.discountGiven.subtext,
      spark: stats.discountGiven.spark,
      sparkColor: '#10b981',
      icon: BadgePercent,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      label: stats.activeCampaigns.label,
      value: stats.activeCampaigns.value,
      subtext: stats.activeCampaigns.subtext,
      spark: stats.activeCampaigns.spark,
      sparkColor: '#f59e0b',
      icon: Megaphone,
      iconBg: 'bg-rose-50 text-rose-500',
    },
    {
      label: stats.referralConversions.label,
      value: stats.referralConversions.value,
      badge: stats.referralConversions.badge,
      subtext: stats.referralConversions.subtext,
      spark: stats.referralConversions.spark,
      sparkColor: '#10b981',
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      label: stats.couponRedemptionRate.label,
      value: stats.couponRedemptionRate.value,
      badge: stats.couponRedemptionRate.badge,
      subtext: stats.couponRedemptionRate.subtext,
      spark: stats.couponRedemptionRate.spark,
      sparkColor: '#10b981',
      icon: Target,
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      label: stats.recoveredCheckouts.label,
      value: stats.recoveredCheckouts.value,
      badge: stats.recoveredCheckouts.badge,
      subtext: stats.recoveredCheckouts.subtext,
      spark: stats.recoveredCheckouts.spark,
      sparkColor: '#10b981',
      icon: ShoppingCart,
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
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                      ↑ {card.badge}
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
