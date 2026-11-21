'use client'

import {
  MessageSquare,
  Star,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Users,
} from 'lucide-react'
import type { VisitorRatingsStats } from '@/lib/server/visitor-ratings'

export default function VisitorRatingStatCards({
  stats,
}: {
  stats: VisitorRatingsStats
}) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-6">
      {/* 1. Total Ratings */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <MessageSquare size={16} />
          </div>
          <span className="text-xs font-semibold text-slate-600">Total Ratings</span>
        </div>
        <div className="mt-2.5">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {stats.totalRatings.toLocaleString()}
          </span>
        </div>
        <div className="mt-1 flex items-center text-[11px] font-medium text-emerald-600">
          <span>{stats.totalGrowth}</span>
        </div>
      </div>

      {/* 2. Average Rating */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 text-yellow-500">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
          <span className="text-xs font-semibold text-slate-600">Average Rating</span>
        </div>
        <div className="mt-2.5">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {stats.averageRating}
            <span className="text-sm font-normal text-slate-500"> / 5</span>
          </span>
        </div>
        <div className="mt-1 flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={12}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
      </div>

      {/* 3. Today's Ratings */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
            <Calendar size={16} />
          </div>
          <span className="text-xs font-semibold text-slate-600">Today&apos;s Ratings</span>
        </div>
        <div className="mt-2.5">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {stats.todayRatings}
          </span>
        </div>
        <div className="mt-1 text-[11px] font-medium text-slate-500">
          {stats.todaySubtitle}
        </div>
      </div>

      {/* 4. Positive Ratings */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <ThumbsUp size={16} />
          </div>
          <span className="text-xs font-semibold text-slate-600">Positive Ratings</span>
        </div>
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {stats.positiveRatings.toLocaleString()}
          </span>
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
            {stats.positivePercent}
          </span>
        </div>
        <div className="mt-1 text-[11px] font-medium text-slate-500">
          {stats.positiveSubtitle}
        </div>
      </div>

      {/* 5. Negative Ratings */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
            <ThumbsDown size={16} />
          </div>
          <span className="text-xs font-semibold text-slate-600">Negative Ratings</span>
        </div>
        <div className="mt-2.5 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {stats.negativeRatings}
          </span>
          <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700">
            {stats.negativePercent}
          </span>
        </div>
        <div className="mt-1 text-[11px] font-medium text-slate-500">
          {stats.negativeSubtitle}
        </div>
      </div>

      {/* 6. Unique Visitors Rated */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Users size={16} />
          </div>
          <span className="text-xs font-semibold text-slate-600">Unique Visitors Rated</span>
        </div>
        <div className="mt-2.5">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {stats.uniqueVisitorsRated.toLocaleString()}
          </span>
        </div>
        <div className="mt-1 text-[11px] font-medium text-slate-500">
          {stats.uniquePercent}
        </div>
      </div>
    </div>
  )
}
