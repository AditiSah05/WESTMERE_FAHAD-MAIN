'use client'

import { useState } from 'react'
import {
  Search,
  Calendar,
  ChevronDown,
  Download,
  Star,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  MoreHorizontal,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Flag,
} from 'lucide-react'
import type { VisitorRating } from '@/lib/server/visitor-ratings'

export type TabType =
  | 'all'
  | 'recent'
  | 'positive'
  | 'neutral'
  | 'negative'
  | 'flagged'
  | 'analytics'
  | 'widget'

export default function VisitorRatingsTable({
  ratings,
  activeTab,
  onSelectTab,
  onViewRating,
  onToggleVisibility,
  onFlagRating,
  onExportSelected,
}: {
  ratings: VisitorRating[]
  activeTab: TabType
  onSelectTab: (tab: TabType) => void
  onViewRating: (rating: VisitorRating) => void
  onToggleVisibility: (id: string, current: 'visible' | 'hidden') => void
  onFlagRating: (id: string, flagged: boolean) => void
  onExportSelected: (ids: string[]) => void
}) {
  const [search, setSearch] = useState('')
  const [ratingFilter, setRatingFilter] = useState('All')
  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [visibilityFilter, setVisibilityFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('Newest')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [openActionId, setOpenActionId] = useState<string | null>(null)
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter logic
  const filteredRatings = ratings.filter((r) => {
    // Tab filter
    if (activeTab === 'recent') {
      // simulate recent filter
    } else if (activeTab === 'positive') {
      if (r.rating < 4) return false
    } else if (activeTab === 'neutral') {
      if (r.rating !== 3) return false
    } else if (activeTab === 'negative') {
      if (r.rating > 2) return false
    } else if (activeTab === 'flagged') {
      if (!r.flagged && !r.reported) return false
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      const match =
        r.id.toLowerCase().includes(q) ||
        r.visitorName.toLowerCase().includes(q) ||
        r.feedback.toLowerCase().includes(q)
      if (!match) return false
    }

    // Rating filter
    if (ratingFilter !== 'All') {
      const stars = parseInt(ratingFilter)
      if (r.rating !== stars) return false
    }

    // Category filter
    if (categoryFilter !== 'All') {
      if (r.category !== categoryFilter) return false
    }

    // Visibility filter
    if (visibilityFilter !== 'All') {
      if (r.visibility !== visibilityFilter.toLowerCase()) return false
    }

    return true
  })

  const clearFilters = () => {
    setSearch('')
    setRatingFilter('All')
    setDateRange('Last 30 Days')
    setCategoryFilter('All')
    setVisibilityFilter('All')
    setSortOrder('Newest')
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRatings.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredRatings.map((r) => r.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-slate-200/90 bg-white shadow-sm">
      {/* 8 Horizontal Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 p-3 sm:px-4">
        <button
          type="button"
          onClick={() => onSelectTab('all')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            activeTab === 'all'
              ? 'bg-[#0f1b33] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          All Ratings (1,248)
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('recent')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            activeTab === 'recent'
              ? 'bg-[#0f1b33] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          Recent Ratings (100)
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('positive')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            activeTab === 'positive'
              ? 'bg-[#0f1b33] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          Positive Ratings (1,102)
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('neutral')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            activeTab === 'neutral'
              ? 'bg-[#0f1b33] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          Neutral Ratings (104)
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('negative')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            activeTab === 'negative'
              ? 'bg-[#0f1b33] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          Negative Ratings (42)
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('flagged')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            activeTab === 'flagged'
              ? 'bg-[#0f1b33] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          Flagged Ratings (7)
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('analytics')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            activeTab === 'analytics'
              ? 'bg-[#0f1b33] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <BarChart2 size={13} />
          Ratings Analytics
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('widget')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            activeTab === 'widget'
              ? 'bg-[#0f1b33] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Settings size={13} />
          Widget Settings
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative min-w-[240px] flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by Rating ID, visitor or feedback..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Rating Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by rating"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
            >
              <option value="All">Rating: All</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Date Range Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by date range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-8 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Month">This Month</option>
              <option value="All Time">All Time</option>
            </select>
            <Calendar
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
            >
              <option value="All">Category: All</option>
              <option value="General">General</option>
              <option value="Website UI">Website UI</option>
              <option value="Performance">Performance</option>
              <option value="Services">Services</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Visibility Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by visibility"
              value={visibilityFilter}
              onChange={(e) => setVisibilityFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
            >
              <option value="All">Visibility: All</option>
              <option value="Visible">Visible</option>
              <option value="Hidden">Hidden</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              aria-label="Sort ratings"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
            >
              <option value="Newest">Sort: Newest</option>
              <option value="Oldest">Sort: Oldest</option>
              <option value="Highest">Sort: Highest Rating</option>
              <option value="Lowest">Sort: Lowest Rating</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Clear Filters */}
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-medium text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
          >
            Clear Filters
          </button>
        </div>

        {/* Export Selected Button */}
        <div>
          <button
            type="button"
            onClick={() => onExportSelected(selectedIds)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#c4943d] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#b3832d]"
          >
            <Download size={13} />
            Export Selected
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-t border-slate-100 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  aria-label="Select all ratings"
                  checked={
                    selectedIds.length === filteredRatings.length &&
                    filteredRatings.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
              </th>
              <th className="px-4 py-3">Visitor</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Submission Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Device</th>
              <th className="px-4 py-3">Visibility</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRatings.slice(0, 5).map((row) => {
              const isSelected = selectedIds.includes(row.id)
              return (
                <tr
                  key={row.id}
                  className={`transition hover:bg-slate-50/60 ${
                    isSelected ? 'bg-amber-50/30' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label={`Select rating from ${row.visitorName}`}
                      checked={isSelected}
                      onChange={() => toggleSelect(row.id)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                  </td>

                  {/* Visitor */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${row.avatarBg} ${row.avatarText}`}
                      >
                        {row.visitorAvatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {row.visitorName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          #{row.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Rating Stars */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={13}
                          className={
                            s <= row.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-slate-100 text-slate-200'
                          }
                        />
                      ))}
                    </div>
                  </td>

                  {/* Feedback Snippet */}
                  <td className="max-w-xs px-4 py-3 text-slate-700">
                    <p className="line-clamp-2 leading-relaxed">{row.feedback}</p>
                  </td>

                  {/* Submission Date */}
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-700">
                    {row.submissionDate}
                  </td>

                  {/* Time */}
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                    {row.time}
                  </td>

                  {/* Device */}
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                      {row.device === 'Desktop' && (
                        <Monitor size={14} className="text-slate-400" />
                      )}
                      {row.device === 'Mobile' && (
                        <Smartphone size={14} className="text-slate-400" />
                      )}
                      {row.device === 'Tablet' && (
                        <Tablet size={14} className="text-slate-400" />
                      )}
                      {row.device}
                    </div>
                  </td>

                  {/* Visibility */}
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.visibility === 'visible' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Visible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Hidden
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <div className="relative inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewRating(row)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        <Eye size={12} className="text-slate-500" />
                        View
                      </button>

                      <button
                        type="button"
                        aria-label="More row actions"
                        onClick={() =>
                          setOpenActionId(
                            openActionId === row.id ? null : row.id
                          )
                        }
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreHorizontal size={15} />
                      </button>

                      {openActionId === row.id && (
                        <div className="absolute right-0 top-8 z-30 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                          <button
                            type="button"
                            onClick={() => {
                              onToggleVisibility(
                                row.id,
                                row.visibility === 'visible'
                                  ? 'visible'
                                  : 'hidden'
                              )
                              setOpenActionId(null)
                            }}
                            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50"
                          >
                            <EyeOff size={13} className="text-slate-400" />
                            {row.visibility === 'visible'
                              ? 'Hide Rating'
                              : 'Show Rating'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onFlagRating(row.id, !row.flagged)
                              setOpenActionId(null)
                            }}
                            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50"
                          >
                            <Flag size={13} className="text-slate-400" />
                            {row.flagged ? 'Unflag' : 'Flag Rating'}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination & Rows Footer */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
        <div className="text-xs text-slate-500">
          Showing 1-5 of 1,248 ratings
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span>Rows per page:</span>
            <div className="relative">
              <select
                aria-label="Rows per page"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(e.target.value)}
                className="appearance-none rounded border border-slate-200 bg-white py-1 pl-2 pr-6 text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className="flex h-7 w-7 items-center justify-center rounded bg-[#c4943d] font-bold text-white shadow-xs"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(4)}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(5)}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              5
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button
              type="button"
              onClick={() => setCurrentPage(125)}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              125
            </button>
            <button
              type="button"
              aria-label="Next page"
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
