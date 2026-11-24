'use client'

import React, { useState, useMemo } from 'react'
import {
  Search,
  Star,
  Download,
  MessageSquare,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import type { ReviewItem } from '@/lib/server/reviews'

interface Props {
  reviews: ReviewItem[]
  onOpenReply: (review: ReviewItem) => void
}

export default function ReviewsTable({ reviews, onOpenReply }: Props) {
  const [search, setSearch] = useState('')
  const [ratingFilter, setRatingFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [verifiedFilter, setVerifiedFilter] = useState('All')
  const [timeFilter, setTimeFilter] = useState('All Time')
  const [sortFilter, setSortFilter] = useState('Newest')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filtered = useMemo(() => {
    return reviews.filter((rev) => {
      const matchSearch =
        search === '' ||
        rev.customerName.toLowerCase().includes(search.toLowerCase()) ||
        rev.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
        rev.productName.toLowerCase().includes(search.toLowerCase()) ||
        rev.title.toLowerCase().includes(search.toLowerCase())
      const matchRating = ratingFilter === 'All' || rev.rating === parseInt(ratingFilter, 10)
      const matchCategory = categoryFilter === 'All' || rev.productCategory.includes(categoryFilter)
      const matchStatus = statusFilter === 'All' || rev.status === statusFilter
      const matchVerified =
        verifiedFilter === 'All' ||
        (verifiedFilter === 'Verified' ? rev.isVerified : !rev.isVerified)

      return matchSearch && matchRating && matchCategory && matchStatus && matchVerified
    })
  }, [reviews, search, ratingFilter, categoryFilter, statusFilter, verifiedFilter])

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filtered.map((r) => r.id))
    }
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const clearFilters = () => {
    setSearch('')
    setRatingFilter('All')
    setCategoryFilter('All')
    setStatusFilter('All')
    setVerifiedFilter('All')
    setTimeFilter('All Time')
    setSortFilter('Newest')
  }

  const handleExportSelected = () => {
    const list = selectedIds.length > 0 ? reviews.filter((r) => selectedIds.includes(r.id)) : filtered
    const headers = 'Customer,Email,Product,Category,Rating,Title,Review,Verified,Submitted,Status\n'
    const rows = list
      .map(
        (r) =>
          `"${r.customerName}","${r.customerEmail}","${r.productName}","${r.productCategory}",${r.rating},"${r.title}","${r.contentSnippet}",${r.isVerified ? 'Yes' : 'No'},"${r.submittedDate}","${r.status}"`
      )
      .join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reviews_export.csv`
    a.click()
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Search & Filters Toolbar */}
      <div className="p-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[220px] max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer, product or review ID..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder:text-slate-400"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Rating */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Rating: All</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Category: All</option>
            <option value="Software">Software</option>
            <option value="Template">Template</option>
            <option value="CRM">CRM</option>
            <option value="SaaS">SaaS</option>
            <option value="Automation">Automation</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Status: All</option>
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
            <option value="Reported">Reported</option>
            <option value="Hidden">Hidden</option>
          </select>

          {/* Verified */}
          <select
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All">Verified: All</option>
            <option value="Verified">Verified Only</option>
            <option value="Unverified">Unverified Only</option>
          </select>

          {/* All Time */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="All Time">All Time</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>

          {/* Sort */}
          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="Newest">Sort: Newest</option>
            <option value="Highest">Highest Rating</option>
            <option value="Lowest">Lowest Rating</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="text-xs text-slate-500 hover:text-slate-800 underline px-1"
          >
            Clear Filters
          </button>

          {/* Export Selected Button */}
          <button
            onClick={handleExportSelected}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Selected</span>
          </button>
        </div>
      </div>

      {/* Reviews Table */}
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
              <th className="py-2.5 px-3">Customer</th>
              <th className="py-2.5 px-3">Product / Service</th>
              <th className="py-2.5 px-3">Rating</th>
              <th className="py-2.5 px-3 min-w-[240px]">Review</th>
              <th className="py-2.5 px-3">Verified</th>
              <th className="py-2.5 px-3">Submitted</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 pr-4 pl-3 text-center w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filtered.map((rev) => {
              const isSelected = selectedIds.includes(rev.id)

              return (
                <tr
                  key={rev.id}
                  className={`hover:bg-slate-50/70 transition-colors ${
                    isSelected ? 'bg-amber-50/30' : ''
                  }`}
                >
                  <td className="py-3 pl-4 pr-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectOne(rev.id)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                    />
                  </td>

                  {/* Customer */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          rev.avatarBg || 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {rev.avatarInitial}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 leading-tight">
                          {rev.customerName}
                        </div>
                        <div className="text-[11px] text-slate-400">{rev.customerEmail}</div>
                      </div>
                    </div>
                  </td>

                  {/* Product / Service */}
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800 leading-tight text-xs">
                      {rev.productName}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {rev.productCategory}
                    </span>
                  </td>

                  {/* Rating Stars */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Review Title & Snippet */}
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-800 leading-snug">{rev.title}</div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {rev.contentSnippet}
                    </p>
                  </td>

                  {/* Verified */}
                  <td className="py-3 px-3">
                    {rev.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <XCircle className="w-3.5 h-3.5 text-slate-300" />
                        Not Verified
                      </span>
                    )}
                  </td>

                  {/* Submitted */}
                  <td className="py-3 px-3 text-[11px] text-slate-500 whitespace-nowrap">
                    {rev.submittedDate}
                  </td>

                  {/* Status Badge with Dot */}
                  <td className="py-3 px-3 text-center">
                    {rev.status === 'Published' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Published
                      </span>
                    )}
                    {rev.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Pending
                      </span>
                    )}
                    {rev.status === 'Reported' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        Reported
                      </span>
                    )}
                    {rev.status === 'Hidden' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        Hidden
                      </span>
                    )}
                  </td>

                  {/* Actions: Reply + ... */}
                  <td className="py-3 pr-4 pl-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onOpenReply(rev)}
                        className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors shadow-2xs"
                      >
                        <MessageSquare className="w-3 h-3 text-slate-400" />
                        <span>Reply</span>
                      </button>
                      <button className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
          <span className="font-semibold text-slate-800">428</span> reviews
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
            <button className="p-1 rounded text-slate-600 hover:bg-slate-100 border border-slate-200">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
