'use client'

import React, { useState } from 'react'
import {
  Calendar,
  RotateCw,
  Plus,
  Download,
  ChevronDown,
} from 'lucide-react'
import type { SubscriptionsOverview } from '@/lib/server/subscriptions'
import SubscriptionStatCards from './SubscriptionStatCards'
import SubscribersTable from './SubscribersTable'
import SubscriptionCharts from './SubscriptionCharts'
import RenewalsAndFailures from './RenewalsAndFailures'
import SubscriptionPlansQuickView from './SubscriptionPlansQuickView'
import { CreateSubscriptionModal, CreatePlanModal } from './SubscriptionModals'

interface Props {
  initialData: SubscriptionsOverview
  canWrite: boolean
}

const TABS = [
  { id: 'Overview', label: 'Overview' },
  { id: 'All', label: 'All Subscriptions (214)' },
  { id: 'Active', label: 'Active (182)' },
  { id: 'Trialing', label: 'Trialing (12)' },
  { id: 'Renewals', label: 'Upcoming Renewals (18)' },
  { id: 'Failed', label: 'Failed Payments (6)' },
  { id: 'PastDue', label: 'Past Due (4)' },
  { id: 'Cancelled', label: 'Cancelled (14)' },
  { id: 'Upgrades', label: 'Upgrades & Downgrades (9)' },
  { id: 'Plans', label: 'Subscription Plans (12)' },
]

export default function SubscriptionsView({ initialData, canWrite }: Props) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [isSubModalOpen, setIsSubModalOpen] = useState(false)
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  return (
    <div className="space-y-5 pb-12 font-sans">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Subscription Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage SaaS plans, subscribers, recurring revenue, renewals and billing operations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Picker Button */}
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Oct 1, 2026 - Oct 31, 2026</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            title="Refresh subscription stats"
            className="p-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-transform active:rotate-180"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Create Subscription Button (Amber) */}
          <button
            onClick={() => setIsSubModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Subscription</span>
          </button>

          {/* Create Plan Button */}
          <button
            onClick={() => setIsPlanModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Plan</span>
          </button>

          {/* Export Reports Button */}
          <button
            onClick={() => {
              const headers = 'MRR,ARR,ActiveSubscribers,UpcomingRenewals,FailedRenewals,ChurnRate\n'
              const row = `"${initialData.stats.mrr.value}","${initialData.stats.arr.value}","${initialData.stats.activeSubscribers.value}","${initialData.stats.upcomingRenewals.value}","${initialData.stats.failedRenewals.value}","${initialData.stats.churnRate.value}"`
              const blob = new Blob([headers + row], { type: 'text/csv' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `subscription_reports.csv`
              a.click()
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Reports</span>
          </button>
        </div>
      </div>

      {/* 2. Top 8 KPI Metric Cards */}
      <SubscriptionStatCards stats={initialData.stats} />

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

      {/* 4. Subscribers Table */}
      <SubscribersTable subscribers={initialData.subscribers} />

      {/* 5. MRR Growth Curve + Subscription Status Donut Chart */}
      <SubscriptionCharts
        mrrGrowth={initialData.mrrGrowth}
        statusBreakdown={initialData.statusBreakdown}
      />

      {/* 6. Upcoming Renewals & Failed Payments & Recovery */}
      <RenewalsAndFailures
        upcomingRenewals={initialData.upcomingRenewals}
        failedRecoveries={initialData.failedRecoveries}
      />

      {/* 7. Subscription Plans (Quick View) */}
      <SubscriptionPlansQuickView plans={initialData.quickPlans} />

      {/* Modals */}
      <CreateSubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
      />
      <CreatePlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />
    </div>
  )
}
