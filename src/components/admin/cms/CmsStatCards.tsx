'use client'

import React from 'react'
import {
  PanelsTopLeft,
  CheckCircle2,
  FileEdit,
  PenTool,
  Image,
  Layers,
} from 'lucide-react'
import type { CmsOverview } from '@/lib/server/cms'

interface Props {
  stats: CmsOverview['stats']
}

export default function CmsStatCards({ stats }: Props) {
  const cards = [
    {
      label: stats.totalPages.label,
      value: stats.totalPages.value,
      subtext: stats.totalPages.subtext,
      icon: PanelsTopLeft,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: stats.publishedPages.label,
      value: stats.publishedPages.value,
      subtext: stats.publishedPages.subtext,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: stats.draftPages.label,
      value: stats.draftPages.value,
      subtext: stats.draftPages.subtext,
      icon: FileEdit,
      iconBg: 'bg-orange-50 text-orange-600',
    },
    {
      label: stats.blogArticles.label,
      value: stats.blogArticles.value,
      subtext: stats.blogArticles.subtext,
      icon: PenTool,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      label: stats.mediaAssets.label,
      value: stats.mediaAssets.value,
      subtext: stats.mediaAssets.subtext,
      icon: Image,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: stats.pendingChanges.label,
      value: stats.pendingChanges.value,
      subtext: stats.pendingChanges.subtext,
      icon: Layers,
      iconBg: 'bg-amber-50 text-amber-600',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex items-center gap-3 hover:border-slate-300 transition-colors"
          >
            <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0`}>
              <Icon className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight block truncate">
                {card.label}
              </span>
              <div className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                {card.value}
              </div>
              <span className="text-[10px] text-slate-400 block truncate">{card.subtext}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
