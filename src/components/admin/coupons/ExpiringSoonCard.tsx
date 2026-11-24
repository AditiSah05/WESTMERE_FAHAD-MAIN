'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import type { ExpiringSoonItem } from '@/lib/server/coupons'

interface Props {
  expiringSoon: ExpiringSoonItem[]
}

export default function ExpiringSoonCard({ expiringSoon }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Expiring Soon</h3>
          </div>
          <Link
            href="#expiring"
            className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-2 px-1">Coupon Code</th>
                <th className="py-2 px-2">Discount</th>
                <th className="py-2 px-1 text-right">Expires In</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {expiringSoon.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2 px-1 font-mono font-bold text-slate-800 text-[11px]">
                    {item.code}
                  </td>
                  <td className="py-2 px-2 text-slate-600 font-medium">{item.discount}</td>
                  <td className="py-2 px-1 text-right">
                    {item.urgency === 'high' && (
                      <span className="font-semibold text-rose-600">{item.expiresText}</span>
                    )}
                    {item.urgency === 'medium' && (
                      <span className="font-semibold text-amber-600">{item.expiresText}</span>
                    )}
                    {item.urgency === 'normal' && (
                      <span className="font-semibold text-emerald-600">{item.expiresText}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
