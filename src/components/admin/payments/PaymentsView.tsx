'use client'

import React, { useState } from 'react'
import {
  Calendar,
  RotateCw,
  Plus,
  Upload,
  Download,
  ChevronDown,
} from 'lucide-react'
import type { PaymentsOverview } from '@/lib/server/payments'
import PaymentStatCards from './PaymentStatCards'
import RevenueOverviewChart from './RevenueOverviewChart'
import RevenueByServiceDonut from './RevenueByServiceDonut'
import PaymentGatewaysCard from './PaymentGatewaysCard'
import RecentTransactionsTable from './RecentTransactionsTable'
import { FinanceBottomCards } from './FinanceBottomCards'
import { CreateInvoiceModal, AddExpenseModal } from './FinanceModals'

interface Props {
  initialData: PaymentsOverview
  canWrite: boolean
}

const TABS = [
  'Overview',
  'Transactions',
  'Payment Gateways',
  'Settlements',
  'Refunds',
  'Invoices',
  'Expenses',
  'Revenue Reports',
  'Tax & GST',
  'Reconciliation',
]

export function PaymentsView({ initialData, canWrite }: Props) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  return (
    <div className="space-y-5 pb-12 font-sans">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Payments & Finance
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage payments, revenues, expenses, invoices, taxes and financial reconciliation from one centralised workspace.
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
            title="Refresh metrics"
            className="p-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-transform active:rotate-180"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Create Invoice Button */}
          <button
            onClick={() => setIsInvoiceModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Invoice</span>
          </button>

          {/* Add Expense Button */}
          <button
            onClick={() => setIsExpenseModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Expense</span>
          </button>

          {/* Import */}
          <button
            onClick={() => alert('Import financial statements or CSV transactions')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Import</span>
          </button>

          {/* Export */}
          <button
            onClick={() => {
              const headers = 'ID,OrderId,Customer,Product,Gateway,Method,Gross,Fee,Net,Status,Date\n'
              const rows = initialData.transactions
                .map((t) =>
                  `"${t.id}","${t.orderId}","${t.customer}","${t.product}","${t.gateway}","${t.method}","${t.grossFormatted}","${t.feeFormatted}","${t.netFormatted}","${t.status}","${t.date}"`
                )
                .join('\n')
              const blob = new Blob([headers + rows], { type: 'text/csv' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `payments_finance_report.csv`
              a.click()
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>

          {/* More Actions Dropdown */}
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs">
            <span>More Actions</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 2. Horizontal Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200/80">
        {TABS.map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* 3. Top 8 KPI Metric Cards */}
      <PaymentStatCards stats={initialData.stats} />

      {/* 4. Middle Section: Revenue Overview Chart + Revenue by Service Donut + Payment Gateways */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <RevenueOverviewChart data={initialData.revenueOverview} />
        </div>
        <div className="lg:col-span-4">
          <RevenueByServiceDonut data={initialData.serviceBreakdown} />
        </div>
        <div className="lg:col-span-3">
          <PaymentGatewaysCard gateways={initialData.gateways} />
        </div>
      </div>

      {/* 5. Recent Transactions Table */}
      <RecentTransactionsTable transactions={initialData.transactions} />

      {/* 6. Bottom 4 Cards: Pending Settlements, Recent Refunds, Expense Overview, Tax & GST Summary */}
      <FinanceBottomCards
        pendingSettlements={initialData.pendingSettlements}
        recentRefunds={initialData.recentRefunds}
        expenseOverview={initialData.expenseOverview}
        taxGstSummary={initialData.taxGstSummary}
      />

      {/* Modals */}
      <CreateInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
      />
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
      />
    </div>
  )
}
