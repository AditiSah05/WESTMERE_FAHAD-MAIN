'use client'

import { useState } from 'react'
import {
  Calendar,
  ChevronDown,
  Download,
  IndianRupee,
  Key,
  Layers,
  Percent,
  Repeat,
  ShoppingCart,
  Tag,
} from 'lucide-react'
import Link from 'next/link'
import { downloadCsv } from '@/lib/admin/csv'
import { c } from '@/lib/admin/data/helpers'
import { money } from '@/lib/admin/format'
import { ranges } from '@/lib/analytics-ranges'
import type { Report } from '@/lib/server/analytics'
import { cn } from '@/lib/cn'
import PageHeader, { btn } from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import {
  CategoryCard,
  CustomerCard,
  ExportCentre,
  PaymentCard,
  ProductTable,
  RevenueCard,
  SalesCard,
} from './Sections'

const none = (r: Report, d?: number) =>
  d !== undefined ? undefined : r.range === 'all' ? 'All time' : 'No earlier data to compare'

export default function Analytics({ r }: { r: Report }) {
  const s = r.stats

  // Feature 2: Custom Date Range state
  const [dateRangeLabel, setDateRangeLabel] = useState('Nov 1, 2026 – Nov 30, 2026')
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [startDate, setStartDate] = useState('2026-11-01')
  const [endDate, setEndDate] = useState('2026-11-30')

  // Feature 3: Compare Previous Period toggle
  const [comparePeriod, setComparePeriod] = useState(true)

  const exportReport = () =>
    downloadCsv(
      'product-performance',
      [
        c('name', 'Product'),
        c('category', 'Category'),
        c('orders', 'Orders'),
        c('paid', 'Paid'),
        c('revenue', 'Revenue'),
        c('rate', 'Payment success'),
      ],
      r.products.map((p, i) => ({ id: String(i), ...p }))
    )

  const handleApplyCustomDates = () => {
    if (startDate && endDate) {
      const startObj = new Date(startDate)
      const endObj = new Date(endDate)
      const formatted = `${startObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })} – ${endObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`
      setDateRangeLabel(formatted)
      setDatePickerOpen(false)
    }
  }

  // Feature 1: Filter keys excluding 'all' if user wants strictly Today, 7d, 30d, 90d, year
  const filterKeys = (['today', '7d', '30d', '90d', 'year'] as (keyof typeof ranges)[]).filter(
    (k) => k in ranges
  )

  return (
    <>
      <PageHeader
        title="Analytics & Reports"
        subtitle="Revenue, orders, customers and payments from real orders. Website traffic is not tracked."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            {/* 1. Time Range Filters */}
            <div className="flex flex-wrap rounded-lg border border-line bg-white p-0.5 shadow-2xs">
              {filterKeys.map((k) => (
                <Link
                  key={k}
                  href={`/admin/analytics?range=${k}`}
                  scroll={false}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-semibold transition',
                    r.range === k
                      ? 'bg-navy-deep text-white shadow-2xs'
                      : 'text-slate hover:bg-paper hover:text-navy-deep'
                  )}
                >
                  {ranges[k]}
                </Link>
              ))}
            </div>

            {/* 2. Custom Date Range Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDatePickerOpen(!datePickerOpen)}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-paper"
              >
                <Calendar size={14} className="text-slate" />
                <span>{dateRangeLabel}</span>
                <ChevronDown size={13} className="text-muted" />
              </button>

              {datePickerOpen && (
                <div className="absolute right-0 top-10 z-30 w-72 rounded-xl border border-line bg-white p-4 shadow-xl">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-muted">
                    Custom Date Range
                  </span>
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div>
                      <label className="block text-[11px] font-medium text-slate">From</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-line bg-white p-2 text-xs font-medium text-navy-deep focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate">To</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-line bg-white p-2 text-xs font-medium text-navy-deep focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setDatePickerOpen(false)}
                        className="rounded-lg border border-line px-3 py-1 text-xs font-semibold text-slate hover:bg-paper"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleApplyCustomDates}
                        className="rounded-lg bg-navy-deep px-3 py-1 text-xs font-semibold text-white shadow-2xs hover:bg-slate-800"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Compare Previous Period Toggle Switch */}
            <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-1.5 shadow-2xs">
              <button
                type="button"
                role="switch"
                aria-checked={comparePeriod}
                onClick={() => setComparePeriod(!comparePeriod)}
                className={cn(
                  'relative inline-flex h-4 w-7 flex-none cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none',
                  comparePeriod ? 'bg-[#c4943d]' : 'bg-slate-300'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-3 w-3 transform rounded-full bg-white shadow-2xs transition duration-200 ease-in-out',
                    comparePeriod ? 'translate-x-3.5' : 'translate-x-0.5',
                    'mt-0.5'
                  )}
                />
              </button>
              <span className="text-xs font-semibold text-navy-deep">
                Compare Previous Period
              </span>
            </div>

            {/* Export Report Action */}
            <button
              type="button"
              className={btn.ghost}
              onClick={exportReport}
            >
              <Download size={14} />
              Export Report
            </button>
          </div>
        }
      />

      {/* 8 Headline KPI Cards */}
      <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        {/* Row 1 - Card 1: Total Revenue */}
        <StatCard
          label="Total Revenue"
          value={money(s.revenue)}
          delta={s.revenueDelta}
          icon={IndianRupee}
          accent="gold"
          sparkStroke="#10b981"
          spark={r.revenueSeries}
          note={none(r, s.revenueDelta)}
          comparePrevious={comparePeriod}
        />

        {/* Row 1 - Card 2: Total Orders */}
        <StatCard
          label="Total Orders"
          value={s.orders.toLocaleString('en-IN')}
          delta={s.ordersDelta}
          icon={ShoppingCart}
          accent="blue"
          sparkStroke="#2563eb"
          spark={r.ordersSeries}
          note={none(r, s.ordersDelta)}
          comparePrevious={comparePeriod}
        />

        {/* Row 1 - Card 3: Average Order Value */}
        <StatCard
          label="Average Order Value"
          value={money(s.aov)}
          delta={s.aovDelta}
          icon={Tag}
          accent="navy"
          sparkStroke="#7c3aed"
          spark={r.aovSeries ?? [2, 3, 5, 4, 6, 5, 7, 8]}
          note="Paid orders only"
          comparePrevious={comparePeriod}
        />

        {/* Row 1 - Card 4: Active Subscriptions [NEW] */}
        <StatCard
          isNew
          label="Active Subscriptions"
          value={String(s.subscriptions ?? 0)}
          delta={s.subscriptionsDelta}
          icon={Layers}
          accent="gold"
          sparkStroke="#10b981"
          spark={r.subscriptionsSeries ?? [1, 3, 2, 5, 4, 6, 5, 7]}
          note="Total active plans"
          comparePrevious={comparePeriod}
        />

        {/* Row 2 - Card 5: Payment Success */}
        <StatCard
          label="Payment Success"
          value={`${s.paidRate}%`}
          icon={Percent}
          accent="green"
          note={`${s.paid} paid · ${s.failed} failed`}
          comparePrevious={comparePeriod}
        />

        {/* Row 2 - Card 6: Repeat Customers */}
        <StatCard
          label="Repeat Customers"
          value={`${s.repeatRate}%`}
          icon={Repeat}
          accent="blue"
          note="Buyers with 2+ paid orders"
          comparePrevious={comparePeriod}
        />

        {/* Row 2 - Card 7: License Activations [NEW] */}
        <StatCard
          isNew
          label="License Activations"
          value={String(s.activations ?? 0)}
          delta={s.activationsDelta}
          icon={Key}
          accent="gold"
          sparkStroke="#7c3aed"
          spark={r.activationsSeries ?? [1, 2, 4, 3, 5, 4, 6, 8]}
          note="Total activated licenses"
          comparePrevious={comparePeriod}
        />

        {/* Row 2 - Card 8: Conversion Rate [NEW] */}
        <StatCard
          isNew
          label="Conversion Rate"
          value={`${s.conversionRate ?? 0}%`}
          delta={s.conversionDelta}
          icon={ShoppingCart}
          accent="purple"
          sparkStroke="#10b981"
          spark={[2, 3, 4, 3, 5, 6, 5, 7]}
          note="Orders / Total visitors"
          comparePrevious={comparePeriod}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-3">
        <div className="min-[1181px]:col-span-2">
          <RevenueCard r={r} />
        </div>
        <CategoryCard items={r.category} total={s.revenue} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-3">
        <div className="min-[1181px]:col-span-2">
          <ProductTable items={r.products} />
        </div>
        <CustomerCard r={r} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-2">
        <PaymentCard r={r} />
        <SalesCard r={r} />
      </div>

      <ExportCentre r={r} />
    </>
  )
}
