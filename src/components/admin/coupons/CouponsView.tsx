'use client'

import React, { useState } from 'react'
import {
  Calendar,
  RotateCw,
  Plus,
  Download,
  ChevronDown,
} from 'lucide-react'
import type { CouponsOverview } from '@/lib/server/coupons'
import CouponStatCards from './CouponStatCards'
import CouponsTable from './CouponsTable'
import CouponPerformanceCard from './CouponPerformanceCard'
import CampaignsCard from './CampaignsCard'
import ExpiringSoonCard from './ExpiringSoonCard'
import CouponBottomCards from './CouponBottomCards'
import { CreateCouponModal, CreateCampaignModal } from './CouponModals'

interface Props {
  initialData: CouponsOverview
  canWrite: boolean
}

const TABS = [
  { id: 'Overview', label: 'Overview' },
  { id: 'All', label: 'All Coupons (28)' },
  { id: 'Active', label: 'Active (18)' },
  { id: 'Scheduled', label: 'Scheduled (6)' },
  { id: 'Expired', label: 'Expired (9)' },
  { id: 'DiscountRules', label: 'Discount Rules (7)' },
  { id: 'Campaigns', label: 'Campaigns (4)' },
  { id: 'Referral', label: 'Referral Programs (1)' },
  { id: 'Limits', label: 'Usage Limits (3)' },
  { id: 'Abandoned', label: 'Abandoned Checkouts (42)' },
]

export default function CouponsView({ initialData, canWrite }: Props) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  return (
    <div className="space-y-5 pb-12 font-sans">
      {/* 1. Page Header & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Coupons & Promotions
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create discount campaigns, manage coupon codes, reward customers and optimise digital product sales.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Last 30 days Dropdown */}
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Last 30 days</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            title="Refresh coupon metrics"
            className="p-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-transform active:rotate-180"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Export Reports */}
          <button
            onClick={() => {
              const headers = 'Code,Discount,AppliesTo,Segment,Usage,MinSpend,ExpiryDate,Status\n'
              const rows = initialData.coupons
                .map(
                  (c) =>
                    `"${c.code}","${c.discount}","${c.appliesTo}","${c.customerSegment}","${c.usageCurrent}/${c.usageLimit}","${c.minSpendFormatted}","${c.expiryDate}","${c.status}"`
                )
                .join('\n')
              const blob = new Blob([headers + rows], { type: 'text/csv' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `coupons_promotions_report.csv`
              a.click()
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export reports</span>
          </button>

          {/* Create Campaign */}
          <button
            onClick={() => setIsCampaignModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <span className="text-sm">📑</span>
            <span>Create campaign</span>
          </button>

          {/* + Create Coupon (Amber) */}
          <button
            onClick={() => setIsCouponModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create coupon</span>
          </button>
        </div>
      </div>

      {/* 2. Top 8 KPI Metric Cards */}
      <CouponStatCards stats={initialData.stats} />

      {/* 3. Horizontal Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200/80">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* 4. Coupons Table */}
      <CouponsTable coupons={initialData.coupons} />

      {/* 5. Middle 3 Cards: Coupon Performance + Campaigns + Expiring Soon */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6">
          <CouponPerformanceCard performance={initialData.performance} />
        </div>
        <div className="lg:col-span-3">
          <CampaignsCard campaigns={initialData.campaigns} />
        </div>
        <div className="lg:col-span-3">
          <ExpiringSoonCard expiringSoon={initialData.expiringSoon} />
        </div>
      </div>

      {/* 6. Bottom 4 Quick Cards */}
      <CouponBottomCards />

      {/* Modals */}
      <CreateCouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
      />
      <CreateCampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
      />
    </div>
  )
}
