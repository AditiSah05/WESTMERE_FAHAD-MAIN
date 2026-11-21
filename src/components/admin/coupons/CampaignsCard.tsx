'use client'

import React from 'react'
import Link from 'next/link'
import { Megaphone, Flame, Rocket, Gift, ArrowRight } from 'lucide-react'
import type { CampaignItem } from '@/lib/server/coupons'

interface Props {
  campaigns: CampaignItem[]
}

export default function CampaignsCard({ campaigns }: Props) {
  const renderIcon = (type: CampaignItem['iconType']) => {
    switch (type) {
      case 'lamp':
        return (
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4" />
          </div>
        )
      case 'rocket':
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Rocket className="w-4 h-4" />
          </div>
        )
      case 'gift':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Gift className="w-4 h-4" />
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
            <Megaphone className="w-4 h-4" />
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Campaigns</h3>
          </div>
          <Link
            href="#campaigns"
            className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="mt-3 space-y-3">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {renderIcon(camp.iconType)}
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{camp.name}</h4>
                  <p className="text-[11px] text-slate-400">{camp.dates}</p>
                </div>
              </div>

              <div className="text-right">
                {camp.status === 'Active' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Scheduled
                  </span>
                )}
                <span className="text-[11px] text-slate-400 block">{camp.redemptionsText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
