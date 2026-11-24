'use client'

import {
  Boxes,
  Activity,
  Zap,
  CreditCard,
  Mail,
  KeyRound,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react'
import type { IntegrationStats } from '@/lib/server/integrations-crm'

export default function IntegrationStatCards({
  stats,
  onCardClick,
}: {
  stats: IntegrationStats
  onCardClick?: (metric: string) => void
}) {
  const cards = [
    {
      id: 'connected-apps',
      label: 'Connected Apps',
      value: `${stats.connectedApps} / ${stats.totalApps}`,
      subtext: '↑ +2 this month',
      subtextColor: 'text-emerald-600',
      icon: Boxes,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      tabTarget: 'all',
    },
    {
      id: 'webhook-health',
      label: 'Webhook Health',
      value: stats.webhookHealth,
      subtext: stats.webhookDeliveries,
      subtextColor: 'text-slate-500',
      icon: Activity,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      tabTarget: 'webhooks',
    },
    {
      id: 'monthly-api-calls',
      label: 'Monthly API Calls',
      value: stats.monthlyApiCalls,
      subtext: stats.apiCallsGrowth,
      subtextColor: 'text-emerald-600',
      icon: Zap,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      tabTarget: 'logs',
    },
    {
      id: 'payment-gateways',
      label: 'Payment Gateways',
      value: `${stats.activeGateways} Active`,
      subtext: stats.gatewaysText,
      subtextColor: 'text-slate-500',
      icon: CreditCard,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      tabTarget: 'payments',
    },
    {
      id: 'email-delivery',
      label: 'Email Delivery',
      value: stats.emailDeliveryRate,
      subtext: stats.emailProvider,
      subtextColor: 'text-teal-600',
      icon: Mail,
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-600',
      tabTarget: 'email',
    },
    {
      id: 'active-keys',
      label: 'Active API Keys',
      value: `${stats.activeKeys} Keys`,
      subtext: stats.keysNote,
      subtextColor: 'text-slate-500',
      icon: KeyRound,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      tabTarget: 'keys',
    },
  ]

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.id}
            onClick={() => onCardClick?.(card.tabTarget)}
            className="group cursor-pointer rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition hover:border-amber-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500">{card.label}</span>
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${card.iconBg}`}>
                <Icon size={14} className={card.iconColor} />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600">
              {card.value}
            </div>
            <div className={`mt-1 text-[10px] font-medium ${card.subtextColor} truncate`}>
              {card.subtext}
            </div>
          </div>
        )
      })}
    </div>
  )
}
