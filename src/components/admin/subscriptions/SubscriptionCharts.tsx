'use client'

import React, { useState } from 'react'
import { TrendingUp, PieChart } from 'lucide-react'
import type { SubscriptionsOverview } from '@/lib/server/subscriptions'

interface Props {
  mrrGrowth: SubscriptionsOverview['mrrGrowth']
  statusBreakdown: SubscriptionsOverview['statusBreakdown']
}

export default function SubscriptionCharts({ mrrGrowth, statusBreakdown }: Props) {
  const [period, setPeriod] = useState<'Daily' | 'Monthly' | 'Yearly'>('Monthly')

  // Coordinates calculation for Donut Chart
  const totalCount = statusBreakdown.totalCount
  let accumulatedPct = 0
  const donutSegments = statusBreakdown.items.map((item) => {
    const startAngle = (accumulatedPct / 100) * 360
    accumulatedPct += item.pct
    const endAngle = (accumulatedPct / 100) * 360
    return { ...item, startAngle, endAngle }
  })

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent)
    const y = Math.sin(2 * Math.PI * percent)
    return [x, y]
  }

  // MRR Graph calculations (Values: 1.0L to 2.0L)
  const minY = 1.0
  const maxY = 2.0
  const graphWidth = 460
  const graphHeight = 150

  const pointsSvg = mrrGrowth.points.map((val, idx) => {
    const x = (idx / (mrrGrowth.points.length - 1)) * graphWidth
    const y = graphHeight - ((val - minY) / (maxY - minY)) * graphHeight
    return { x, y, val }
  })

  const polylineStr = pointsSvg.map((p) => `${p.x},${p.y}`).join(' ')
  const areaPath = `M 0,${graphHeight} L ${pointsSvg[0].x},${pointsSvg[0].y} ` +
    pointsSvg.slice(1).map((p) => `L ${p.x},${p.y}`).join(' ') +
    ` L ${graphWidth},${graphHeight} Z`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* 1. MRR Growth (approx 7 columns) */}
      <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">MRR Growth</h3>
            </div>

            {/* Time Toggle */}
            <div className="flex items-center bg-slate-100/80 p-0.5 rounded-lg text-xs font-medium text-slate-600">
              <button
                onClick={() => setPeriod('Daily')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  period === 'Daily' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setPeriod('Monthly')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  period === 'Monthly' ? 'bg-amber-500 text-white shadow-2xs font-semibold' : 'hover:text-slate-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPeriod('Yearly')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  period === 'Yearly' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Current Stat */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {mrrGrowth.current}
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
              ↑ {mrrGrowth.badge}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{mrrGrowth.subtext}</p>
        </div>

        {/* SVG Area Chart */}
        <div className="mt-4 flex gap-3">
          {/* Y-Axis */}
          <div className="flex flex-col justify-between text-[10px] text-slate-400 py-1 text-right select-none w-8 shrink-0">
            <span>₹2.0L</span>
            <span>₹1.8L</span>
            <span>₹1.6L</span>
            <span>₹1.4L</span>
            <span>₹1.2L</span>
            <span>₹1.0L</span>
          </div>

          {/* Graph canvas */}
          <div className="flex-1 flex flex-col">
            <div className="relative h-36 w-full">
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
                  <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                {/* Fill Area */}
                <path d={areaPath} fill="url(#mrrGradient)" />

                {/* Line */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
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
                    r="3.5"
                    fill="#1e293b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>

            {/* X-Axis */}
            <div className="flex justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 mt-1 select-none">
              {mrrGrowth.months.map((m, idx) => (
                <span key={idx}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Subscription Status Donut (approx 5 columns) */}
      <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <PieChart className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">Subscription Status</h3>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-6 my-auto">
          {/* Donut Chart */}
          <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {donutSegments.map((segment, idx) => {
                const startPct = segment.startAngle / 360
                const endPct = segment.endAngle / 360
                const [startX, startY] = getCoordinatesForPercent(startPct)
                const [endX, endY] = getCoordinatesForPercent(endPct)
                const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0
                const pathData = [
                  `M ${50 + 38 * startX} ${50 + 38 * startY}`,
                  `A 38 38 0 ${largeArcFlag} 1 ${50 + 38 * endX} ${50 + 38 * endY}`,
                ].join(' ')

                return (
                  <path
                    key={idx}
                    d={pathData}
                    fill="transparent"
                    stroke={segment.color}
                    strokeWidth="14"
                  />
                )
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold text-slate-900 leading-tight">
                {totalCount}
              </span>
              <span className="text-[10px] text-slate-400">Total Subscriptions</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2.5 w-full sm:w-auto">
            {statusBreakdown.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-700 font-medium">{item.status}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-900">
                    {item.count}{' '}
                    <span className="text-slate-400 font-normal">({item.pct}%)</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
