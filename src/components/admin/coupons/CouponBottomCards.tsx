'use client'

import React from 'react'
import Link from 'next/link'
import { Users, Layers, History, FileText, ArrowRight } from 'lucide-react'

export default function CouponBottomCards() {
  const cards = [
    {
      title: 'Referral Programme',
      desc: 'Manage referral codes, rewards and conversions',
      icon: Users,
      href: '#referral',
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Discount Rules',
      desc: 'Create conditional and product-based discounts',
      icon: Layers,
      href: '#rules',
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Redemption History',
      desc: 'View all coupon redemptions and related orders',
      icon: History,
      href: '#history',
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Reports',
      desc: 'Download coupon, campaign and promotion reports',
      icon: FileText,
      href: '#reports',
      iconBg: 'bg-amber-50 text-amber-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <Link
            key={idx}
            href={card.href}
            className="group bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex items-center justify-between hover:border-slate-300 hover:shadow-xs transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                  {card.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{card.desc}</p>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </Link>
        )
      })}
    </div>
  )
}
