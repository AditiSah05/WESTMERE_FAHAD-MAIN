'use client'

import React, { useState, useMemo } from 'react'
import {
  Search,
  Download,
  ChevronDown,
  Mail,
  Users as UsersIcon,
  Search as SearchIcon,
  Zap,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import type { SubscriberItem } from '@/lib/server/subscriptions'

interface Props {
  subscribers: SubscriberItem[]
}

export default function SubscribersTable({ subscribers }: Props) {
  const [search, setSearch] = useState('')
  const [productFilter, setProductFilter] = useState('All')
  const [planFilter, setPlanFilter] = useState('All')
  const [cycleFilter, setCycleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    return subscribers.filter((sub) => {
      const matchSearch =
        search === '' ||
        sub.name.toLowerCase().includes(search.toLowerCase()) ||
        sub.email.toLowerCase().includes(search.toLowerCase()) ||
        sub.subscriptionId.toLowerCase().includes(search.toLowerCase())
      const matchProduct = productFilter === 'All' || sub.product === productFilter
      const matchCycle = cycleFilter === 'All' || sub.billingCycle === cycleFilter
      const matchStatus = statusFilter === 'All' || sub.subscriptionStatus === statusFilter
      return matchSearch && matchProduct && matchCycle && matchStatus
    })
  }, [subscribers, search, productFilter, cycleFilter, statusFilter])

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filtered.map((s) => s.id))
    }
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const renderProductIcon = (iconType: SubscriberItem['productIcon']) => {
    switch (iconType) {
      case 'mail':
        return <Mail className="w-3.5 h-3.5 text-blue-500" />
      case 'search':
        return <SearchIcon className="w-3.5 h-3.5 text-indigo-500" />
      case 'users':
        return <UsersIcon className="w-3.5 h-3.5 text-cyan-500" />
      case 'bolt':
        return <Zap className="w-3.5 h-3.5 text-amber-500" />
      default:
        return <UsersIcon className="w-3.5 h-3.5 text-slate-500" />
    }
  }

  const handleExportCSV = () => {
    const headers =
      'Subscription ID,Name,Email,Product,Plan,Billing Cycle,Amount,Next Billing,Payment Status,Subscription Status\n'
    const rows = filtered
      .map(
        (s) =>
          `"${s.subscriptionId}","${s.name}","${s.email}","${s.product}","${s.planName}","${s.billingCycle}","${s.amountFormatted}","${s.nextBilling}","${s.paymentStatus}","${s.subscriptionStatus}"`
      )
      .join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subscribers_list.csv`
    a.click()
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Search & Filter Toolbar */}
      <div className="p-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscriber, email or subscription ID..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder:text-slate-400"
          />
        </div>

        {/* Right: Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* All Products */}
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Products</option>
            <option value="Mailora">Mailora</option>
            <option value="Hosted SEO Dashboard">Hosted SEO Dashboard</option>
            <option value="CRM Software">CRM Software</option>
            <option value="AI Automation">AI Automation</option>
          </select>

          {/* All Plans */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Plans</option>
            <option value="Starter">Starter Plan</option>
            <option value="Pro">Pro Plan</option>
            <option value="Team">Team Plan</option>
            <option value="Business">Business Plan</option>
            <option value="Enterprise">Enterprise Plan</option>
          </select>

          {/* All Billing Cycles */}
          <select
            value={cycleFilter}
            onChange={(e) => setCycleFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Billing Cycles</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>

          {/* All Statuses */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Trialing">Trialing</option>
            <option value="Past Due">Past Due</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Bulk Actions */}
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <span>Bulk Actions</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Export */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>
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
              <th className="py-2.5 px-3">Subscriber</th>
              <th className="py-2.5 px-3">Subscription ID</th>
              <th className="py-2.5 px-3">SaaS Product / Plan</th>
              <th className="py-2.5 px-3">Billing Cycle</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3">Next Billing</th>
              <th className="py-2.5 px-3 text-center">Payment Status</th>
              <th className="py-2.5 px-3 text-center">Subscription Status</th>
              <th className="py-2.5 pr-4 pl-3 text-center w-12">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filtered.map((sub) => {
              const isSelected = selectedIds.includes(sub.id)
              return (
                <tr
                  key={sub.id}
                  className={`hover:bg-slate-50/70 transition-colors ${
                    isSelected ? 'bg-amber-50/30' : ''
                  }`}
                >
                  <td className="py-3 pl-4 pr-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectOne(sub.id)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                    />
                  </td>

                  {/* Subscriber (Avatar + Name + Email) */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${sub.avatarBg}`}
                      >
                        {sub.avatarInitial}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 leading-tight">
                          {sub.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{sub.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Subscription ID */}
                  <td className="py-3 px-3 font-mono font-medium text-slate-700">
                    {sub.subscriptionId}
                  </td>

                  {/* SaaS Product / Plan */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0">
                        {renderProductIcon(sub.productIcon)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 block text-xs">
                          {sub.product}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {sub.planName}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Billing Cycle */}
                  <td className="py-3 px-3 text-slate-600 font-medium">
                    {sub.billingCycle}
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-3 font-semibold text-slate-800">
                    {sub.amountFormatted}
                  </td>

                  {/* Next Billing */}
                  <td className="py-3 px-3 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">📅</span>
                      <span>{sub.nextBilling}</span>
                    </div>
                  </td>

                  {/* Payment Status */}
                  <td className="py-3 px-3 text-center">
                    {sub.paymentStatus === 'Paid' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Paid
                      </span>
                    )}
                    {sub.paymentStatus === 'Failed' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        Failed
                      </span>
                    )}
                    {sub.paymentStatus === 'Pending' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Subscription Status */}
                  <td className="py-3 px-3 text-center">
                    {sub.subscriptionStatus === 'Active' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Active
                      </span>
                    )}
                    {sub.subscriptionStatus === 'Past Due' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        Past Due
                      </span>
                    )}
                    {sub.subscriptionStatus === 'Trialing' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
                        Trialing
                      </span>
                    )}
                    {sub.subscriptionStatus === 'Cancelled' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        Cancelled
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

      {/* Pagination Footer */}
      <div className="p-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-800">1-{filtered.length}</span> of{' '}
          <span className="font-semibold text-slate-800">214</span> subscriptions
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
            <button className="w-6 h-6 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">
              4
            </button>
            <button className="w-6 h-6 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">
              5
            </button>
            <span className="text-slate-400 px-0.5">...</span>
            <button className="w-6 h-6 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">
              22
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
