'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Users, Search, ArrowRight } from 'lucide-react'
import type { SubscriptionsOverview } from '@/lib/server/subscriptions'

interface Props {
  plans: SubscriptionsOverview['quickPlans']
}

export default function SubscriptionPlansQuickView({ plans }: Props) {
  const renderPlanIcon = (iconType: string) => {
    switch (iconType) {
      case 'mail':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
        )
      case 'users':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
        )
      case 'search':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Search className="w-4 h-4" />
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <span className="text-base font-bold">📑</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-800">
            Subscription Plans (Quick View)
          </h3>
        </div>
        <Link
          href="#plans"
          className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
        >
          Manage Plans <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 3 Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3.5">
        {plans.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              {renderPlanIcon(p.icon)}
              <div>
                <h4 className="text-xs font-bold text-slate-800">{p.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {p.plansCount} Plans • {p.subscribersCount} Subscribers
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">From</span>
              <span className="text-xs font-bold text-slate-900">{p.startingPriceFormatted}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
