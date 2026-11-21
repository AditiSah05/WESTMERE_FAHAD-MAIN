'use client'

import React, { useState, useMemo } from 'react'
import {
  Search,
  ChevronDown,
  Layers,
  Mail,
  Users,
  UserPlus,
  UserCheck,
  Monitor,
  Layout,
  Calendar,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  List,
  Grid,
} from 'lucide-react'
import type { CouponItem } from '@/lib/server/coupons'

interface Props {
  coupons: CouponItem[]
}

export default function CouponsTable({ coupons }: Props) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [discountTypeFilter, setDiscountTypeFilter] = useState('All')
  const [productFilter, setProductFilter] = useState('All')
  const [segmentFilter, setSegmentFilter] = useState('All')
  const [timeFilter, setTimeFilter] = useState('All Time')
  const [sortFilter, setSortFilter] = useState('Newest')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filtered = useMemo(() => {
    return coupons.filter((c) => {
      const matchSearch =
        search === '' ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.appliesTo.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'All' || c.status === statusFilter
      const matchProduct = productFilter === 'All' || c.appliesTo.includes(productFilter)
      const matchSegment = segmentFilter === 'All' || c.customerSegment.includes(segmentFilter)
      return matchSearch && matchStatus && matchProduct && matchSegment
    })
  }, [coupons, search, statusFilter, productFilter, segmentFilter])

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filtered.map((c) => c.id))
    }
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const renderAppliesIcon = (icon: CouponItem['appliesIcon']) => {
    switch (icon) {
      case 'layers':
        return <Layers className="w-3.5 h-3.5 text-slate-500" />
      case 'mail':
        return <Mail className="w-3.5 h-3.5 text-blue-500" />
      case 'users':
        return <Users className="w-3.5 h-3.5 text-cyan-500" />
      case 'monitor':
        return <Monitor className="w-3.5 h-3.5 text-indigo-500" />
      case 'layout':
        return <Layout className="w-3.5 h-3.5 text-purple-500" />
      case 'calendar':
        return <Calendar className="w-3.5 h-3.5 text-amber-500" />
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-500" />
    }
  }

  const renderSegmentIcon = (icon: CouponItem['segmentIcon']) => {
    switch (icon) {
      case 'users':
        return <Users className="w-3.5 h-3.5 text-slate-400" />
      case 'user-plus':
        return <UserPlus className="w-3.5 h-3.5 text-emerald-500" />
      case 'user-check':
        return <UserCheck className="w-3.5 h-3.5 text-blue-500" />
      default:
        return <Users className="w-3.5 h-3.5 text-slate-400" />
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Search & Filter Bar */}
      <div className="p-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {/* Left Search */}
        <div className="relative flex-1 min-w-[220px] max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coupon code or campaign..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder:text-slate-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Exhausted">Exhausted</option>
            <option value="Scheduled">Scheduled</option>
          </select>

          {/* Discount Type */}
          <select
            value={discountTypeFilter}
            onChange={(e) => setDiscountTypeFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Discount type: All</option>
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount (₹)</option>
          </select>

          {/* Product */}
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Product: All Products</option>
            <option value="digital">All digital products</option>
            <option value="Mailora">Mailora</option>
            <option value="CRM">CRM plans</option>
            <option value="UI kits">Website UI kits</option>
            <option value="SaaS">Annual SaaS plans</option>
          </select>

          {/* Customer Segment */}
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Customer segment: All</option>
            <option value="All customers">All customers</option>
            <option value="New customers">New customers</option>
            <option value="Existing customers">Existing customers</option>
          </select>

          {/* Time */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All Time">All Time</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>

          {/* Sort */}
          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="Newest">Sort: Newest</option>
            <option value="Highest">Highest Discount</option>
            <option value="Expiring">Expiring Soon</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 ${
                viewMode === 'list'
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
              <th className="py-2.5 pl-4 pr-2 w-8">
                <input
                  type="checkbox"
                  checked={selectedIds.length > 0 && selectedIds.length === filtered.length}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                />
              </th>
              <th className="py-2.5 px-3">Coupon Code</th>
              <th className="py-2.5 px-3">Discount</th>
              <th className="py-2.5 px-3">Applies To</th>
              <th className="py-2.5 px-3">Customer Segment</th>
              <th className="py-2.5 px-3">Usage</th>
              <th className="py-2.5 px-3">Minimum Spend</th>
              <th className="py-2.5 px-3">Expiry Date</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 pr-4 pl-3 text-center w-12">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filtered.map((coupon) => {
              const isSelected = selectedIds.includes(coupon.id)
              const usagePct = Math.min(100, Math.round((coupon.usageCurrent / coupon.usageLimit) * 100))

              return (
                <tr
                  key={coupon.id}
                  className={`hover:bg-slate-50/70 transition-colors ${
                    isSelected ? 'bg-amber-50/30' : ''
                  }`}
                >
                  <td className="py-3 pl-4 pr-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectOne(coupon.id)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                    />
                  </td>

                  {/* Coupon Code */}
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs tracking-wider border border-slate-200">
                      {coupon.code}
                    </span>
                  </td>

                  {/* Discount */}
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {coupon.discount}
                  </td>

                  {/* Applies To */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      {renderAppliesIcon(coupon.appliesIcon)}
                      <span className="font-medium">{coupon.appliesTo}</span>
                    </div>
                  </td>

                  {/* Customer Segment */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      {renderSegmentIcon(coupon.segmentIcon)}
                      <span>{coupon.customerSegment}</span>
                    </div>
                  </td>

                  {/* Usage Progress Bar */}
                  <td className="py-3 px-3 min-w-[130px]">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-slate-800">
                        {coupon.usageCurrent} / {coupon.usageLimit.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          coupon.status === 'Exhausted' ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${usagePct}%` }}
                      />
                    </div>
                  </td>

                  {/* Minimum Spend */}
                  <td className="py-3 px-3 font-semibold text-slate-800">
                    {coupon.minSpendFormatted}
                  </td>

                  {/* Expiry Date */}
                  <td className="py-3 px-3 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{coupon.expiryDate}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 text-center">
                    {coupon.status === 'Active' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    )}
                    {coupon.status === 'Exhausted' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Exhausted
                      </span>
                    )}
                    {coupon.status === 'Scheduled' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Scheduled
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 pr-4 pl-3 text-center">
                    <button className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-800">1-{filtered.length}</span> of{' '}
          <span className="font-semibold text-slate-800">28</span> coupons
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span>Rows per page:</span>
            <select className="border border-slate-200 rounded px-1.5 py-0.5 text-xs bg-white text-slate-700">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled
              className="p-1 rounded text-slate-300 border border-slate-200 cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-6 h-6 rounded bg-amber-500 text-white font-semibold flex items-center justify-center">
              1
            </button>
            <button className="w-6 h-6 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">
              2
            </button>
            <button className="w-6 h-6 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">
              3
            </button>
            <span className="text-slate-400 px-0.5">...</span>
            <button className="w-6 h-6 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">
              5
            </button>
            <button className="p-1 rounded text-slate-600 hover:bg-slate-100 border border-slate-200">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
