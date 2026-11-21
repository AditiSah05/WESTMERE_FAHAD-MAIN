'use client'

import React from 'react'
import {
  MessageSquare,
  Star,
  Clock,
  CheckCircle2,
  Flag,
  ShieldCheck,
} from 'lucide-react'
import type { ReviewsOverview } from '@/lib/server/reviews'

interface Props {
  stats: ReviewsOverview['stats']
}

export default function ReviewStatCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Total Reviews */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex items-center gap-3 hover:border-slate-300 transition-colors">
        <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-700 tracking-tight block truncate">
            {stats.totalReviews.label}
          </span>
          <div className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
            {stats.totalReviews.value}
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            {stats.totalReviews.subtext}
          </span>
        </div>
      </div>

      {/* 2. Average Rating */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex items-center gap-3 hover:border-slate-300 transition-colors">
        <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
          <Star className="w-4 h-4 fill-amber-500" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-700 tracking-tight block truncate">
            {stats.avgRating.label}
          </span>
          <div className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
            {stats.avgRating.value}
          </div>
          <div className="flex items-center gap-0.5 text-amber-400 mt-0.5">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            ))}
            <Star className="w-2.5 h-2.5 fill-amber-400/50 text-amber-400" />
          </div>
        </div>
      </div>

      {/* 3. Pending Approval */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex items-center gap-3 hover:border-slate-300 transition-colors">
        <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-700 tracking-tight block truncate">
            {stats.pendingApproval.label}
          </span>
          <div className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
            {stats.pendingApproval.value}
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            {stats.pendingApproval.subtext}
          </span>
        </div>
      </div>

      {/* 4. Published Reviews */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex items-center gap-3 hover:border-slate-300 transition-colors">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-700 tracking-tight block truncate">
            {stats.publishedReviews.label}
          </span>
          <div className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
            {stats.publishedReviews.value}
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            {stats.publishedReviews.subtext}
          </span>
        </div>
      </div>

      {/* 5. Reported Reviews */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex items-center gap-3 hover:border-slate-300 transition-colors">
        <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <Flag className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-700 tracking-tight block truncate">
            {stats.reportedReviews.label}
          </span>
          <div className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
            {stats.reportedReviews.value}
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            {stats.reportedReviews.subtext}
          </span>
        </div>
      </div>

      {/* 6. Verified Purchases */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 flex items-center gap-3 hover:border-slate-300 transition-colors">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold text-slate-700 tracking-tight block truncate">
            {stats.verifiedPurchases.label}
          </span>
          <div className="flex items-center gap-1.5 leading-tight">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              {stats.verifiedPurchases.value}
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              {stats.verifiedPurchases.badge}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            {stats.verifiedPurchases.subtext}
          </span>
        </div>
      </div>
    </div>
  )
}
