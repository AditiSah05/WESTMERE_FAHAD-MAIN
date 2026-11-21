'use client'

import { useState } from 'react'
import {
  Star,
  TrendingUp,
  PieChart,
  MessageSquare,
  ArrowRight,
} from 'lucide-react'
import type {
  RatingDistributionItem,
  RatingTrendPoint,
  SentimentBreakdown,
  LatestFeedbackItem,
} from '@/lib/server/visitor-ratings'

export default function VisitorRatingAnalyticsCards({
  distribution,
  trends,
  sentiment,
  feedback,
  onViewAllFeedback,
}: {
  distribution: RatingDistributionItem[]
  trends: RatingTrendPoint[]
  sentiment: SentimentBreakdown
  feedback: LatestFeedbackItem[]
  onViewAllFeedback: () => void
}) {
  const [trendRange, setTrendRange] = useState<'daily' | 'weekly' | 'monthly'>('monthly')

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* 1. Rating Distribution */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Star size={14} className="text-amber-500 fill-amber-400" />
              Rating Distribution
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              1,248 Ratings
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-2 text-xs">
                <span className="flex w-6 items-center gap-0.5 font-medium text-slate-700">
                  {item.stars}★
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#c4943d] transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-18 text-right font-medium text-slate-600">
                  {item.count} ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Rating Trends */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <TrendingUp size={14} className="text-amber-500" />
              Rating Trends
            </div>
            <div className="flex items-center rounded-lg bg-slate-100 p-0.5 text-[10px] font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => setTrendRange('daily')}
                className={`rounded px-1.5 py-0.5 ${
                  trendRange === 'daily' ? 'bg-white shadow-xs text-slate-900' : ''
                }`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setTrendRange('weekly')}
                className={`rounded px-1.5 py-0.5 ${
                  trendRange === 'weekly' ? 'bg-white shadow-xs text-slate-900' : ''
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setTrendRange('monthly')}
                className={`rounded px-1.5 py-0.5 ${
                  trendRange === 'monthly' ? 'bg-[#c4943d] text-white shadow-xs' : ''
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* SVG Trend Chart */}
          <div className="mt-3">
            <div className="relative h-36 w-full">
              <svg viewBox="0 0 240 100" className="h-full w-full overflow-visible">
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c4943d" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#c4943d" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guide Lines */}
                {[0, 20, 40, 60, 80].map((y) => (
                  <line
                    key={y}
                    x1="28"
                    y1={y + 10}
                    x2="235"
                    y2={y + 10}
                    stroke="#f1f5f9"
                    strokeDasharray="2 2"
                  />
                ))}

                {/* Y-axis Labels */}
                <text x="5" y="14" fontSize="8" fill="#94a3b8" fontFamily="sans-serif">5.0</text>
                <text x="5" y="34" fontSize="8" fill="#94a3b8" fontFamily="sans-serif">4.8</text>
                <text x="5" y="54" fontSize="8" fill="#94a3b8" fontFamily="sans-serif">4.6</text>
                <text x="5" y="74" fontSize="8" fill="#94a3b8" fontFamily="sans-serif">4.4</text>
                <text x="5" y="94" fontSize="8" fill="#94a3b8" fontFamily="sans-serif">4.2</text>

                {/* Area Fill */}
                <path
                  d="M 35 68 Q 80 58, 125 50 T 180 55 T 230 35 L 230 90 L 35 90 Z"
                  fill="url(#trendGradient)"
                />

                {/* Line Curve */}
                <path
                  d="M 35 68 Q 80 58, 125 50 T 180 55 T 230 35"
                  fill="none"
                  stroke="#c4943d"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Data Dots */}
                <circle cx="35" cy="68" r="3" fill="#ffffff" stroke="#c4943d" strokeWidth="2" />
                <circle cx="85" cy="58" r="3" fill="#ffffff" stroke="#c4943d" strokeWidth="2" />
                <circle cx="135" cy="50" r="3" fill="#ffffff" stroke="#c4943d" strokeWidth="2" />
                <circle cx="180" cy="55" r="3" fill="#ffffff" stroke="#c4943d" strokeWidth="2" />
                <circle cx="230" cy="35" r="3.5" fill="#c4943d" stroke="#ffffff" strokeWidth="1.5" />
              </svg>

              {/* X-axis dates */}
              <div className="mt-1 flex justify-between pl-7 pr-1 text-[9px] font-medium text-slate-400">
                <span>Sep 29</span>
                <span>Oct 6</span>
                <span>Oct 13</span>
                <span>Oct 20</span>
                <span>Oct 27</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Rating Sentiment */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <PieChart size={14} className="text-amber-500" />
              Rating Sentiment
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            {/* Donut Chart */}
            <div className="relative flex h-24 w-24 flex-none items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-red-400"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="100, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-yellow-400"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="96.6, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="88.3, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-slate-900">
                  {sentiment.positivePercent}%
                </span>
                <span className="text-[9px] font-medium text-slate-500">
                  Positive
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Positive (4-5 ★)
                </span>
                <span className="font-semibold text-slate-800">
                  {sentiment.positiveCount.toLocaleString()} ({sentiment.positivePercent}%)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  Neutral (3 ★)
                </span>
                <span className="font-semibold text-slate-800">
                  {sentiment.neutralCount} ({sentiment.neutralPercent}%)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  Negative (1-2 ★)
                </span>
                <span className="font-semibold text-slate-800">
                  {sentiment.negativeCount} ({sentiment.negativePercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Latest Feedback */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <MessageSquare size={14} className="text-amber-500" />
              Latest Feedback
            </div>
            <button
              type="button"
              onClick={onViewAllFeedback}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-800"
            >
              View All
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="mt-3 space-y-2.5">
            {feedback.map((item) => (
              <div key={item.id} className="flex items-start gap-2.5">
                <div
                  className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-[10px] font-bold ${item.avatarBg} ${item.avatarText}`}
                >
                  {item.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-xs text-slate-700">
                    {item.feedback}
                  </p>
                </div>
                <span className="flex-none text-[10px] text-slate-400">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
