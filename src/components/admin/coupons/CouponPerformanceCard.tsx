'use client'

import React, { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import type { CouponsOverview } from '@/lib/server/coupons'

interface Props {
  performance: CouponsOverview['performance']
}

export default function CouponPerformanceCard({ performance }: Props) {
  const [metric, setMetric] = useState<'redemptions' | 'revenue'>('redemptions')

  const graphWidth = 320
  const graphHeight = 110
  const minY = 0
  const maxY = 80

  const pointsSvg = performance.points.map((val, idx) => {
    const x = (idx / (performance.points.length - 1)) * graphWidth
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
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">Coupon Performance</h3>
        </div>

        {/* Toggles */}
        <div className="flex items-center bg-slate-100/80 p-0.5 rounded-lg text-xs font-medium text-slate-600">
          <button
            onClick={() => setMetric('redemptions')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              metric === 'redemptions'
                ? 'bg-amber-500 text-white shadow-2xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Redemptions
          </button>
          <button
            onClick={() => setMetric('revenue')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              metric === 'revenue'
                ? 'bg-amber-500 text-white shadow-2xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Revenue
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-3 my-auto">
        {/* Left Side: Stat + Area Curve Chart (7 cols) */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {performance.total}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                ↑ {performance.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{performance.subtext}</p>
          </div>

          <div className="flex gap-2.5 mt-3">
            {/* Y Axis scale */}
            <div className="flex flex-col justify-between text-[10px] text-slate-400 py-0.5 text-right select-none w-5 shrink-0">
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {/* SVG Graph */}
            <div className="flex-1 flex flex-col">
              <div className="relative h-28 w-full">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
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
                    <linearGradient id="couponCurveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  <path d={areaPath} fill="url(#couponCurveGradient)" />

                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={polylineStr}
                  />

                  {pointsSvg.map((p, idx) => (
                    <circle
                      key={idx}
                      cx={p.x}
                      cy={p.y}
                      r="3"
                      fill="#1e293b"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  ))}
                </svg>
              </div>

              {/* X Axis */}
              <div className="flex justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-100 mt-1 select-none">
                {performance.labels.map((lbl, idx) => (
                  <span key={idx}>{lbl}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Top Performing Coupons (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5">
          <h4 className="text-xs font-semibold text-slate-700 mb-3">Top Performing Coupons</h4>

          <div className="space-y-3.5">
            {performance.topCoupons.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-slate-800 text-[11px]">
                    {item.code}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">{item.count}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-slate-900 transition-all duration-300"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
