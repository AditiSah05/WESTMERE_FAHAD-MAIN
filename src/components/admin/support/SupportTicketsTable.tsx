'use client'

import { useState } from 'react'
import {
  Search,
  Calendar,
  ChevronDown,
  LayoutList,
  LayoutGrid,
  Download,
  MoreHorizontal,
  Wrench,
  Globe,
  Laptop,
  CreditCard,
  User,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import type { SupportTicket } from '@/lib/server/support-projects'

export type SupportTabType =
  | 'tickets'
  | 'bugs'
  | 'custom'
  | 'projects'
  | 'milestones'
  | 'tasks'
  | 'team'

export default function SupportTicketsTable({
  tickets,
  activeTab,
  onSelectTab,
  onViewTicket,
  onExport,
  onOpenCalendar,
  onOpenActivity,
}: {
  tickets: SupportTicket[]
  activeTab: SupportTabType
  onSelectTab: (tab: SupportTabType) => void
  onViewTicket: (ticket: SupportTicket) => void
  onExport: () => void
  onOpenCalendar: () => void
  onOpenActivity: () => void
}) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [assigneeFilter, setAssigneeFilter] = useState('All')
  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [openActionId, setOpenActionId] = useState<string | null>(null)
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredTickets = tickets.filter((t) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      const match =
        t.id.toLowerCase().includes(q) ||
        t.client.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q)
      if (!match) return false
    }

    if (statusFilter !== 'All' && t.status !== statusFilter) return false
    if (priorityFilter !== 'All' && t.priority !== priorityFilter) return false
    if (assigneeFilter !== 'All' && t.assignee !== assigneeFilter) return false

    return true
  })

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTickets.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredTickets.map((t) => t.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const renderCategoryIcon = (cat: SupportTicket['category']) => {
    switch (cat) {
      case 'Technical Support':
        return <Wrench size={13} className="text-slate-400" />
      case 'Website Issue':
        return <Globe size={13} className="text-slate-400" />
      case 'Software Support':
        return <Laptop size={13} className="text-slate-400" />
      case 'Payment Issue':
        return <CreditCard size={13} className="text-slate-400" />
      case 'Account & Login':
        return <User size={13} className="text-slate-400" />
      default:
        return <Wrench size={13} className="text-slate-400" />
    }
  }

  const renderPriorityBadge = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-800">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
            Critical
          </span>
        )
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            High
          </span>
        )
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            Medium
          </span>
        )
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Low
          </span>
        )
    }
  }

  const renderStatusBadge = (status: SupportTicket['status']) => {
    switch (status) {
      case 'Open':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Open
          </span>
        )
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            In Progress
          </span>
        )
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Resolved
          </span>
        )
      case 'Awaiting Internal':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-purple-700">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            Awaiting Internal
          </span>
        )
      case 'Awaiting Client':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Awaiting Client
          </span>
        )
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-slate-200/90 bg-white shadow-sm">
      {/* 8 Horizontal Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-100 p-3 sm:px-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onSelectTab('tickets')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'tickets'
                ? 'bg-[#0f1b33] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Support Tickets (48)
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('bugs')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'bugs'
                ? 'bg-[#0f1b33] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Bug Reports (12)
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('custom')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'custom'
                ? 'bg-[#0f1b33] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Custom Orders (7)
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('projects')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'projects'
                ? 'bg-[#0f1b33] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Projects (8)
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('milestones')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'milestones'
                ? 'bg-[#0f1b33] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Milestones (16)
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('tasks')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'tasks'
                ? 'bg-[#0f1b33] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Tasks (32)
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('team')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'team'
                ? 'bg-[#0f1b33] text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Team (5)
          </button>
        </div>

        {/* Right Tab Buttons: Calendar & Activity */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCalendar}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <Calendar size={13} className="text-slate-500" />
            Calendar
          </button>

          <button
            type="button"
            onClick={onOpenActivity}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <TrendingUp size={13} className="text-slate-500" />
            Activity
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative min-w-[260px] flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by ticket ID, client, subject or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
            >
              <option value="All">Status: All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Awaiting Internal">Awaiting Internal</option>
              <option value="Awaiting Client">Awaiting Client</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Priority Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
            >
              <option value="All">Priority: All</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Assignee Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by assignee"
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
            >
              <option value="All">Assignee: All</option>
              <option value="A. Khan">A. Khan</option>
              <option value="R. Mehta">R. Mehta</option>
              <option value="S. Kapoor">S. Kapoor</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Date Filter Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-8 text-xs font-medium text-slate-700 hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
            >
              <option value="Last 30 Days">Date: Last 30 Days</option>
              <option value="Today">Date: Today</option>
              <option value="Last 7 Days">Date: Last 7 Days</option>
              <option value="All Time">Date: All Time</option>
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
        </div>

        {/* View Switchers + Export */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                viewMode === 'list'
                  ? 'bg-[#c4943d] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutList size={13} />
              List
            </button>
            <button
              type="button"
              onClick={() => setViewMode('board')}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                viewMode === 'board'
                  ? 'bg-[#c4943d] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid size={13} />
              Board
            </button>
          </div>

          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <Download size={13} className="text-slate-500" />
            Export
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
                  aria-label="Select all tickets"
                  checked={
                    selectedIds.length === filteredTickets.length &&
                    filteredTickets.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
              </th>
              <th className="px-4 py-3">Ticket</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Assignee</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTickets.slice(0, 5).map((row) => {
              const isSelected = selectedIds.includes(row.id)
              return (
                <tr
                  key={row.id}
                  onClick={() => onViewTicket(row)}
                  className={`cursor-pointer transition hover:bg-slate-50/60 ${
                    isSelected ? 'bg-amber-50/30' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td
                    className="px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      aria-label={`Select ticket ${row.id}`}
                      checked={isSelected}
                      onChange={() => toggleSelect(row.id)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                  </td>

                  {/* Ticket ID Tag */}
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-800">
                      {row.id}
                    </span>
                  </td>

                  {/* Client with Avatar */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${row.avatarBg} ${row.avatarText}`}
                      >
                        {row.clientAvatar}
                      </div>
                      <span className="whitespace-nowrap font-medium text-slate-900">
                        {row.client}
                      </span>
                    </div>
                  </td>

                  {/* Subject */}
                  <td className="px-4 py-3 font-medium text-slate-800 max-w-xs truncate">
                    {row.subject}
                  </td>

                  {/* Category with icon */}
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      {renderCategoryIcon(row.category)}
                      <span>{row.category}</span>
                    </div>
                  </td>

                  {/* Assignee */}
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ${row.assigneeBg} ${row.assigneeText}`}
                      >
                        {row.assigneeInitials}
                      </div>
                      <span className="font-medium text-slate-700">
                        {row.assignee}
                      </span>
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="whitespace-nowrap px-4 py-3">
                    {renderPriorityBadge(row.priority)}
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-4 py-3">
                    {renderStatusBadge(row.status)}
                  </td>

                  {/* Updated */}
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                    {row.updated}
                  </td>

                  {/* Actions */}
                  <td
                    className="whitespace-nowrap px-4 py-3 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative inline-flex items-center">
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
                        <div className="absolute right-0 top-7 z-30 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                          <button
                            type="button"
                            onClick={() => {
                              onViewTicket(row)
                              setOpenActionId(null)
                            }}
                            className="block w-full px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50"
                          >
                            View Ticket
                          </button>
                          <button
                            type="button"
                            onClick={() => setOpenActionId(null)}
                            className="block w-full px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50"
                          >
                            Assign Member
                          </button>
                          <button
                            type="button"
                            onClick={() => setOpenActionId(null)}
                            className="block w-full px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50"
                          >
                            Close Ticket
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

      {/* Pagination Footer */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row">
        <div className="text-xs text-slate-500">
          Showing 1-5 of 48 tickets
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
