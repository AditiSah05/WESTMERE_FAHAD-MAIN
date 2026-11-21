'use client'

import React, { useState } from 'react'
import { TrendingUp, ChevronDown } from 'lucide-react'

interface Props {
  ratingTrend: {
    months: string[]
    points: number[]
  }
}

export default function RatingTrendCard({ ratingTrend }: Props) {
  const [range, setRange] = useState('Last 6 Months')

  const graphWidth = 240
  const graphHeight = 90
  const minY = 4.0
  const maxY = 5.0

  const pointsSvg = ratingTrend.points.map((val, idx) => {
    const x = (idx / (ratingTrend.points.length - 1)) * graphWidth
    const y = graphHeight - ((val - minY) / (maxY - minY)) * graphHeight
    return { x, y, val }
  })

  const polylineStr = pointsSvg.map((p) => `${p.x},${p.y}`).join(' ')
  const areaPath =
    `M 0,${graphHeight} L ${pointsSvg[0].x},${pointsSvg[0].y} ` +
    pointsSvg.slice(1).map((p) => `L ${p.x},${p.y}`).join(' ') +
    ` L ${graphWidth},${graphHeight} Z`

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Rating Trend</h3>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-600 font-medium cursor-pointer border border-slate-200 rounded-lg px-2 py-1 bg-slate-50/50">
            <span>{range}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* SVG Graph */}
        <div className="flex gap-2.5 mt-3">
          {/* Y Axis scale */}
          <div className="flex flex-col justify-between text-[10px] text-slate-400 py-0.5 text-right select-none w-5 shrink-0">
            <span>5.0</span>
            <span>4.8</span>
            <span>4.6</span>
            <span>4.4</span>
            <span>4.2</span>
            <span>4.0</span>
          </div>

          {/* Graph canvas */}
          <div className="flex-1 flex flex-col">
            <div className="relative h-24 w-full">
              {/* Horizontal grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-slate-100 w-full" />
                <div className="border-b border-slate-100 w-full" />
                <div className="border-b border-slate-100 w-full" />
                <div className="border-b border-slate-100 w-full" />
                <div className="border-b border-slate-100 w-full" />
                <div className="border-b border-slate-100 w-full" />
              </div>

              <svg
                viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                className="w-full h-full overflow-visible relative z-10"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {/* Fill Area */}
                <path d={areaPath} fill="url(#trendGradient)" />

                {/* Line */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={polylineStr}
                />

                {/* Points */}
                {pointsSvg.map((p, idx) => (
                  <circle
                    key={idx}
                    cx={p.x}
                    cy={p.y}
                    r="3"
                    fill="#ffffff"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>

            {/* X Axis */}
            <div className="flex justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-100 mt-1 select-none">
              {ratingTrend.months.map((m, idx) => (
                <span key={idx}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
