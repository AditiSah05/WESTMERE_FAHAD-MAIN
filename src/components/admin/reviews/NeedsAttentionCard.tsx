'use client'

import React from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  Flag,
  Clock,
  EyeOff,
  ChevronRight,
} from 'lucide-react'
import type { AttentionItem } from '@/lib/server/reviews'

interface Props {
  items: AttentionItem[]
}

export default function NeedsAttentionCard({ items }: Props) {
  const renderIcon = (type: AttentionItem['type']) => {
    switch (type) {
      case 'reported':
        return (
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Flag className="w-3.5 h-3.5" />
          </div>
        )
      case 'pending':
        return (
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
        )
      case 'hidden':
        return (
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <EyeOff className="w-3.5 h-3.5" />
          </div>
        )
      default:
        return (
          <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Needs Attention</h3>
          </div>
          <Link
            href="#needs-attention"
            className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="mt-3.5 space-y-2.5">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`#${item.type}`}
              className="flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                {renderIcon(item.type)}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">{item.description}</p>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
