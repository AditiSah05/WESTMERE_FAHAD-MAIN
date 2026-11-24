'use client'

import React from 'react'
import { Star } from 'lucide-react'
import type { RatingDistributionItem } from '@/lib/server/reviews'

interface Props {
  distribution: RatingDistributionItem[]
  totalReviews: number
}

export default function RatingDistributionCard({ distribution, totalReviews }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Rating Distribution</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">{totalReviews} Reviews</span>
        </div>

        <div className="mt-3.5 space-y-2.5">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              {/* Star label */}
              <div className="flex items-center gap-1 w-7 shrink-0 text-slate-700 font-semibold">
                <span>{item.stars}</span>
                <span className="text-amber-400">★</span>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${item.pct}%` }}
                />
              </div>

              {/* Count & Pct */}
              <div className="w-20 text-right text-slate-600 shrink-0 font-medium">
                <span>{item.count}</span>{' '}
                <span className="text-slate-400 text-[11px]">({item.pct}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
