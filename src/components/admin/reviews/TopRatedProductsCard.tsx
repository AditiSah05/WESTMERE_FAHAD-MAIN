'use client'

import React from 'react'
import Link from 'next/link'
import {
  Trophy,
  ArrowRight,
  Send,
  Grid,
  BarChart,
  Layers,
  Zap,
  Star,
  MessageSquare,
} from 'lucide-react'
import type { TopRatedProduct } from '@/lib/server/reviews'

interface Props {
  products: TopRatedProduct[]
}

export default function TopRatedProductsCard({ products }: Props) {
  const renderIcon = (type: TopRatedProduct['iconType']) => {
    switch (type) {
      case 'plane':
        return <Send className="w-3.5 h-3.5 text-blue-500" />
      case 'grid':
        return <Grid className="w-3.5 h-3.5 text-indigo-500" />
      case 'chart':
        return <BarChart className="w-3.5 h-3.5 text-cyan-500" />
      case 'layers':
        return <Layers className="w-3.5 h-3.5 text-purple-500" />
      case 'lightning':
        return <Zap className="w-3.5 h-3.5 text-amber-500" />
      default:
        return <Send className="w-3.5 h-3.5 text-blue-500" />
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Top Rated Products</h3>
          </div>
          <Link
            href="#top-products"
            className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="mt-3 space-y-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50/70 transition-colors text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center shrink-0">
                  {renderIcon(p.iconType)}
                </div>
                <span className="font-semibold text-slate-800 truncate">
                  {p.name}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-2">
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{p.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 font-medium">
                  <MessageSquare className="w-3 h-3" />
                  <span>{p.reviewsCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
