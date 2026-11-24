'use client'

import { useState } from 'react'
import {
  ExternalLink,
  Settings,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import type { IntegrationService, IntegrationCategory } from '@/lib/server/integrations-crm'

const CATEGORIES: { label: string; value: IntegrationCategory }[] = [
  { label: 'All', value: 'All' },
  { label: 'Payments', value: 'Payments' },
  { label: 'Email', value: 'Email' },
  { label: 'Analytics', value: 'Analytics' },
  { label: 'Automation', value: 'Automation' },
  { label: 'Forms', value: 'Forms' },
  { label: 'ChatOps', value: 'ChatOps' },
  { label: 'AI', value: 'AI' },
]

export default function IntegrationAppDirectory({
  services,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onConfigure,
  onToggleStatus,
}: {
  services: IntegrationService[]
  selectedCategory: IntegrationCategory
  onCategoryChange: (cat: IntegrationCategory) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  statusFilter: string
  onStatusFilterChange: (s: string) => void
  onConfigure: (service: IntegrationService) => void
  onToggleStatus: (id: string, newStatus: 'Connected' | 'Disconnected') => void
}) {
  return (
    <div className="space-y-4">
      {/* Category Filter Pills & Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.value
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => onCategoryChange(cat.value)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Search & Status Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search services..."
              className="w-48 sm:w-56 rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white py-1.5 px-2.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:border-amber-500 focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="Connected">Connected</option>
            <option value="Disconnected">Disconnected</option>
            <option value="Action Required">Action Required</option>
          </select>
        </div>
      </div>

      {/* Grid of Service Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => {
          const isConnected = service.status === 'Connected'
          const isActionReq = service.status === 'Action Required'

          return (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div>
                {/* Header: Icon, Name, Category & Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-sm ${service.iconBg} ${service.iconColor}`}
                    >
                      {service.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{service.name}</h3>
                      <span className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      isConnected
                        ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                        : isActionReq
                        ? 'border border-amber-200 bg-amber-50 text-amber-700'
                        : 'border border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isConnected
                          ? 'bg-emerald-500'
                          : isActionReq
                          ? 'bg-amber-500'
                          : 'bg-slate-400'
                      }`}
                    />
                    {service.status}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {service.description}
                </p>

                {/* Meta details */}
                <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50/70 p-2 text-[11px] text-slate-600">
                  <div className="truncate font-medium text-slate-700">{service.details}</div>
                  <div className="mt-0.5 text-[10px] text-slate-400">Sync: {service.lastSync}</div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                {/* Toggle Connected / Disconnected */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onToggleStatus(
                        service.id,
                        isConnected ? 'Disconnected' : 'Connected'
                      )
                    }
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isConnected ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isConnected ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-[11px] font-medium text-slate-600">
                    {isConnected ? 'Active' : 'Disabled'}
                  </span>
                </div>

                {/* Configure & Docs */}
                <div className="flex items-center gap-1.5">
                  <a
                    href={service.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="View API Docs"
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
                  >
                    <ExternalLink size={12} />
                  </a>

                  <button
                    type="button"
                    onClick={() => onConfigure(service)}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-amber-600"
                  >
                    <Settings size={12} />
                    <span>Configure</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
