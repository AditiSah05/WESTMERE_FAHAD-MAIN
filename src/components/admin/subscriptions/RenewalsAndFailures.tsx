'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, AlertTriangle, ArrowRight } from 'lucide-react'
import type { SubscriptionsOverview } from '@/lib/server/subscriptions'

interface Props {
  upcomingRenewals: SubscriptionsOverview['upcomingRenewals']
  failedRecoveries: SubscriptionsOverview['failedRecoveries']
}

export default function RenewalsAndFailures({ upcomingRenewals, failedRecoveries }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 1. Upcoming Renewals */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Upcoming Renewals</h3>
            </div>
            <Link
              href="#renewals"
              className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-2 px-1">Subscriber</th>
                  <th className="py-2 px-2">Product / Plan</th>
                  <th className="py-2 px-2">Renewal Date</th>
                  <th className="py-2 px-1 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {upcomingRenewals.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-1 font-semibold text-slate-800">
                      {item.subscriber}
                    </td>
                    <td className="py-2.5 px-2 text-slate-600">{item.productPlan}</td>
                    <td className="py-2.5 px-2 text-slate-500">{item.renewalDate}</td>
                    <td className="py-2.5 px-1 text-right font-bold text-slate-800">
                      {item.amountFormatted}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. Failed Payments & Recovery */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Failed Payments & Recovery
              </h3>
            </div>
            <Link
              href="#recovery"
              className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-2 px-1">Subscriber</th>
                  <th className="py-2 px-2">Product / Plan</th>
                  <th className="py-2 px-2">Failed Amount</th>
                  <th className="py-2 px-2">Retry Date</th>
                  <th className="py-2 px-1 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {failedRecoveries.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-1 font-semibold text-slate-800">
                      {item.subscriber}
                    </td>
                    <td className="py-2.5 px-2 text-slate-600">{item.productPlan}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-800">
                      {item.failedAmountFormatted}
                    </td>
                    <td className="py-2.5 px-2 text-slate-500">{item.retryDate}</td>
                    <td className="py-2.5 px-1 text-right">
                      {item.status === 'Retry Scheduled' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          Retry Scheduled
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                          Payment Failed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
