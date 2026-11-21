'use client'

import { useState } from 'react'
import {
  Calendar,
  ChevronDown,
  Plus,
  MoreHorizontal,
} from 'lucide-react'

export default function SupportProjectsHeader({
  onOpenCreateTicket,
  onOpenCreateProject,
  onOpenCustomOrder,
}: {
  onOpenCreateTicket: () => void
  onOpenCreateProject: () => void
  onOpenCustomOrder: () => void
}) {
  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Title & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
            Admin
          </span>
          <span className="text-xs font-medium text-slate-500">Support & Projects</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Support & Projects
          </h1>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">
          Manage client requests, technical issues, custom development projects and team delivery.
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Date Filter Dropdown */}
        <div className="relative">
          <select
            aria-label="Filter by date range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-7 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
          >
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="This Quarter">This Quarter</option>
            <option value="All Time">All Time</option>
          </select>
          <Calendar
            size={13}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        {/* 3 Overdue Tasks pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          <span>3 Overdue Tasks</span>
        </div>

        {/* Create Ticket Primary Button */}
        <button
          type="button"
          onClick={onOpenCreateTicket}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#c4943d] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#b3832d]"
        >
          <Plus size={14} />
          Create ticket
        </button>

        {/* Create Project Button */}
        <button
          type="button"
          onClick={onOpenCreateProject}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Plus size={14} className="text-slate-500" />
          Create project
        </button>

        {/* Custom Order Button */}
        <button
          type="button"
          onClick={onOpenCustomOrder}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Plus size={14} className="text-slate-500" />
          Custom order
        </button>

        {/* More Actions Menu */}
        <div className="relative">
          <button
            type="button"
            aria-label="More actions"
            onClick={() => setMoreOpen(!moreOpen)}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-700"
          >
            <MoreHorizontal size={15} />
          </button>
          {moreOpen && (
            <div className="absolute right-0 z-30 mt-1 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="block w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
              >
                Export All Tickets
              </button>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="block w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
              >
                Team SLA Reports
              </button>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="block w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
              >
                Support Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
