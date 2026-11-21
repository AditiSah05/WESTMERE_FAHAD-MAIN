'use client'

import React from 'react'
import Link from 'next/link'
import {
  Building2,
  RotateCcw,
  Receipt,
  FileSpreadsheet,
  ArrowRight,
  Clock,
  CheckCircle2,
  DollarSign,
  FileText,
  Calculator,
  TrendingUp,
} from 'lucide-react'
import type { PaymentsOverview } from '@/lib/server/payments'

interface Props {
  pendingSettlements: PaymentsOverview['pendingSettlements']
  recentRefunds: PaymentsOverview['recentRefunds']
  expenseOverview: PaymentsOverview['expenseOverview']
  taxGstSummary: PaymentsOverview['taxGstSummary']
}

export function FinanceBottomCards({
  pendingSettlements,
  recentRefunds,
  expenseOverview,
  taxGstSummary,
}: Props) {
  // SVG calculation for Expense donut
  const totalPct = expenseOverview.items.reduce((s, it) => s + it.pct, 0)
  let accumulatedPct = 0
  const donutSegments = expenseOverview.items.map((item) => {
    const startAngle = (accumulatedPct / totalPct) * 360
    accumulatedPct += item.pct
    const endAngle = (accumulatedPct / totalPct) * 360
    return { ...item, startAngle, endAngle }
  })

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent)
    const y = Math.sin(2 * Math.PI * percent)
    return [x, y]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* 1. Pending Settlements */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Pending Settlements</h3>
            </div>
            <Link
              href="#settlements"
              className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {pendingSettlements.totalFormatted}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{pendingSettlements.countText}</p>
          </div>

          <div className="mt-4 space-y-2.5">
            {pendingSettlements.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/70 border border-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded bg-white shadow-xs border border-slate-200 flex items-center justify-center font-bold text-xs">
                    {item.gateway === 'Razorpay' ? (
                      <span className="text-blue-600">R</span>
                    ) : (
                      <span className="text-indigo-600">S</span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      {item.gateway}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Expected: {item.expectedDate}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">{item.amountFormatted}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Recent Refunds */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Recent Refunds</h3>
            </div>
            <Link
              href="#refunds"
              className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {recentRefunds.totalFormatted}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{recentRefunds.countText}</p>
          </div>

          <div className="mt-4 space-y-2.5">
            {recentRefunds.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/70 border border-slate-100"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 font-mono">
                        {item.orderId}
                      </span>
                      <span className="text-xs font-medium text-slate-600">{item.customer}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">{item.amountFormatted}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Expense Overview */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Expense Overview</h3>
            </div>
            <Link
              href="#expenses"
              className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {expenseOverview.totalFormatted}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Total Expenses</p>
          </div>

          <div className="mt-4 flex items-center gap-4">
            {/* Small Donut Chart */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
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
                      strokeWidth="15"
                    />
                  )
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-slate-900 leading-tight">
                  {expenseOverview.totalShort}
                </span>
                <span className="text-[9px] text-slate-400">Expenses</span>
              </div>
            </div>

            {/* Categories Legend */}
            <div className="flex-1 space-y-1">
              {expenseOverview.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-600 truncate">{item.category}</span>
                  </div>
                  <span className="font-semibold text-slate-800 ml-1">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tax & GST Summary */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Tax & GST Summary</h3>
            </div>
            <Link
              href="#tax"
              className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View Report <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-600 font-medium">GST Collected (Output)</span>
              </div>
              <span className="text-xs font-bold text-slate-900">{taxGstSummary.gstCollected}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-100">
              <div className="flex items-center gap-2">
                <Calculator className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-600 font-medium">GST Input Credit</span>
              </div>
              <span className="text-xs font-bold text-emerald-600">
                {taxGstSummary.gstInputCredit}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-600 font-medium">Taxable Revenue</span>
              </div>
              <span className="text-xs font-bold text-slate-900">{taxGstSummary.taxableRevenue}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/40 border border-amber-200/60">
              <div className="flex items-center gap-2">
                <Receipt className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs text-amber-900 font-semibold">GST Payable (Net)</span>
              </div>
              <span className="text-xs font-bold text-amber-700">{taxGstSummary.gstPayable}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
