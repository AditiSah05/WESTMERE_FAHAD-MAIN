'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle2, AlertCircle, ArrowRight, Clock } from 'lucide-react'
import type { SeoHealthOverview, PendingContentChange } from '@/lib/server/cms'

interface Props {
  seoHealth: SeoHealthOverview
  pendingChanges: PendingContentChange[]
}

export default function SeoHealthAndPendingCard({ seoHealth, pendingChanges }: Props) {
  // SVG calculation for 92% Donut
  const strokeDashoffset = 100 - seoHealth.score

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        {/* Top: SEO Health Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">SEO Health</h3>
          </div>
          <Link
            href="#seo-manager"
            className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            Manage SEO <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* SEO Health Gauge & Breakdown */}
        <div className="flex items-center gap-3.5 mt-3 pb-3 border-b border-slate-100">
          {/* Circular Donut Gauge */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-500 ease-out"
                strokeDasharray={`${seoHealth.score}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-slate-900 leading-none">
                {seoHealth.score}%
              </span>
              <span className="text-[8px] text-slate-400 mt-0.5">Ready</span>
            </div>
          </div>

          {/* Breakdown items */}
          <div className="space-y-1 text-[11px] leading-tight">
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>{seoHealth.completePagesCount} Pages with complete SEO</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>{seoHealth.missingMetaCount} Pages missing meta description</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
              <span>{seoHealth.duplicateTitleCount} Page with duplicate meta title</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
              <span>{seoHealth.notIndexedCount} Page not indexed (draft)</span>
            </div>
          </div>
        </div>

        {/* Bottom: Pending Content Changes (7) */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <h4 className="text-xs font-bold text-slate-800">
                Pending Content Changes (7)
              </h4>
            </div>
            <Link
              href="#pending"
              className="text-[11px] font-medium text-amber-600 hover:text-amber-700"
            >
              Review All →
            </Link>
          </div>

          <div className="space-y-1.5">
            {pendingChanges.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-100 text-xs"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-slate-400">📄</span>
                  <span className="text-slate-700 truncate font-medium">{item.title}</span>
                </div>
                <button
                  onClick={() => alert(`Reviewing: ${item.title}`)}
                  className="px-2 py-0.5 text-[10px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md ml-2 shrink-0 transition-colors"
                >
                  {item.actionLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
