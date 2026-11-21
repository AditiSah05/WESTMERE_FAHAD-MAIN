'use client'

import {
  CalendarCheck,
  CheckCircle2,
  Coins,
  Layers,
  Sparkles,
  Target,
  Trophy,
  UserPlus,
  Users,
} from 'lucide-react'
import type { CrmOverview } from '@/lib/server/crm'

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

export default function CrmStatCards({ stats }: { stats: CrmOverview['stats'] }) {
  const cards = [
    {
      key: 'totalLeads',
      label: stats.totalLeads.label,
      value: stats.totalLeads.value,
      badge: stats.totalLeads.badge,
      subtext: stats.totalLeads.subtext,
      spark: stats.totalLeads.spark,
      sparkColor: '#10b981',
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    },
    {
      key: 'newLeads',
      label: stats.newLeads.label,
      value: stats.newLeads.value,
      badge: stats.newLeads.badge,
      subtext: stats.newLeads.subtext,
      spark: stats.newLeads.spark,
      sparkColor: '#10b981',
      icon: UserPlus,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'qualifiedLeads',
      label: stats.qualifiedLeads.label,
      value: stats.qualifiedLeads.value,
      badge: stats.qualifiedLeads.badge,
      subtext: stats.qualifiedLeads.subtext,
      spark: stats.qualifiedLeads.spark,
      sparkColor: '#10b981',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    },
    {
      key: 'activeDeals',
      label: stats.activeDeals.label,
      value: stats.activeDeals.value,
      badge: '',
      subtext: stats.activeDeals.subtext,
      spark: stats.activeDeals.spark,
      sparkColor: '#10b981',
      icon: Layers,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'pipelineValue',
      label: stats.pipelineValue.label,
      value: stats.pipelineValue.value,
      badge: stats.pipelineValue.badge,
      subtext: stats.pipelineValue.subtext,
      spark: stats.pipelineValue.spark,
      sparkColor: '#10b981',
      icon: Coins,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'weightedPipeline',
      label: stats.weightedPipeline.label,
      value: stats.weightedPipeline.value,
      badge: stats.weightedPipeline.badge,
      subtext: stats.weightedPipeline.subtext,
      spark: stats.weightedPipeline.spark,
      sparkColor: '#10b981',
      icon: Target,
      iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
    },
    {
      key: 'wonRevenue',
      label: stats.wonRevenue.label,
      value: stats.wonRevenue.value,
      badge: stats.wonRevenue.badge,
      subtext: stats.wonRevenue.subtext,
      spark: stats.wonRevenue.spark,
      sparkColor: '#10b981',
      icon: Trophy,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      key: 'pendingFollowUps',
      label: stats.pendingFollowUps.label,
      value: stats.pendingFollowUps.value,
      badge: stats.pendingFollowUps.badge,
      badgeType: 'red' as const,
      subtext: stats.pendingFollowUps.subtext,
      spark: stats.pendingFollowUps.spark,
      sparkColor: '#ef4444',
      icon: CalendarCheck,
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
