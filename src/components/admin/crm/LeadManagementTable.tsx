'use client'

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  FilterX,
  MoreVertical,
  Search,
} from 'lucide-react'
import { useState } from 'react'
import type { Lead } from '@/lib/server/crm'

type Props = {
  leads: Lead[]
  onSelectLead?: (lead: Lead) => void
}

function SourceBadge({ source }: { source: Lead['source'] }) {
  if (source === 'Website') {
    return <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-semibold text-slate-800">Website</span>
  }
  if (source === 'WhatsApp') {
    return <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">WhatsApp</span>
  }
  if (source === 'LinkedIn') {
    return <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10.5px] font-semibold text-blue-700">LinkedIn</span>
  }
  if (source === 'Google Ads') {
    return <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10.5px] font-semibold text-amber-700">Google Ads</span>
  }
  if (source === 'Referral') {
    return <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10.5px] font-semibold text-purple-700">Referral</span>
  }
  return <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-semibold text-slate-700">{source}</span>
}

function StatusBadge({ status }: { status: Lead['status'] }) {
  if (status === 'Qualified' || status === 'Won') {
    return (
      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700">
        {status}
      </span>
    )
  }
  if (status === 'Contacted') {
    return (
      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10.5px] font-bold text-blue-700">
        Contacted
      </span>
    )
  }
  if (status === 'Proposal Sent') {
    return (
      <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10.5px] font-bold text-purple-700">
        Proposal Sent
      </span>
    )
  }
  if (status === 'Negotiation') {
    return (
      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10.5px] font-bold text-amber-700">
        Negotiation
      </span>
    )
  }
  return (
    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-700">
      {status}
    </span>
  )
}

export default function LeadManagementTable({ leads, onSelectLead }: Props) {
  const [q, setQ] = useState('')
  const [sourceFilter, setSourceFilter] = useState('All')
  const [serviceFilter, setServiceFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [ownerFilter, setOwnerFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const clearFilters = () => {
    setQ('')
    setSourceFilter('All')
    setServiceFilter('All')
    setStatusFilter('All')
    setOwnerFilter('All')
    setPage(1)
  }

  const filtered = leads.filter((l) => {
    if (q) {
      const match =
        l.name.toLowerCase().includes(q.toLowerCase()) ||
        l.company.toLowerCase().includes(q.toLowerCase()) ||
        l.email.toLowerCase().includes(q.toLowerCase())
      if (!match) return false
    }
    if (sourceFilter !== 'All' && l.source !== sourceFilter) return false
    if (serviceFilter !== 'All' && !l.service.includes(serviceFilter)) return false
    if (statusFilter !== 'All' && l.status !== statusFilter) return false
    if (ownerFilter !== 'All' && l.owner !== ownerFilter) return false
    return true
  })

  const visibleLeads = filtered.slice((page - 1) * perPage, page * perPage)
  const allSelected = visibleLeads.length > 0 && visibleLeads.every((l) => selectedIds.has(l.id))

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(visibleLeads.map((l) => l.id)))
    }
  }

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selCls =
    'rounded-lg border border-line bg-white px-2 py-1 text-xs font-semibold text-navy-deep outline-none cursor-pointer'

  return (
    <div className="rounded-xl border border-line bg-white shadow-xs">
      {/* Table Header: Title + Search & Filters */}
      <div className="p-4 border-b border-line">
        <h3 className="text-sm font-bold text-navy-deep">Lead Management</h3>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5">
          {/* Search box */}
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search leads..."
              className="w-full rounded-lg border border-line bg-white py-1.5 pl-8 pr-3 text-xs font-medium text-navy-deep placeholder:text-muted outline-none focus:border-gold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className={selCls}>
              <option value="All">All Sources</option>
              <option value="Website">Website</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Referral">Referral</option>
            </select>

            <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} className={selCls}>
              <option value="All">All Services</option>
              <option value="Website">Website Development</option>
              <option value="CRM">CRM Implementation</option>
              <option value="Mailora">Mailora Subscription</option>
              <option value="Application">Custom Application</option>
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selCls}>
              <option value="All">All Statuses</option>
              <option value="Qualified">Qualified</option>
              <option value="Contacted">Contacted</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
            </select>

            <select value={ownerFilter} onChange={(e) => setOwnerFilter(e.target.value)} className={selCls}>
              <option value="All">All Owners</option>
              <option value="AK">AK</option>
              <option value="SK">SK</option>
              <option value="RS">RS</option>
              <option value="AM">AM</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-semibold text-muted hover:text-navy-deep cursor-pointer"
            >
              <FilterX size={12} />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-line bg-[#f8fafc]/80 text-[10.5px] font-bold uppercase tracking-wider text-muted">
              <th className="w-9 px-3.5 py-2.5">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="size-3.5 rounded border-line text-gold focus:ring-gold cursor-pointer"
                />
              </th>
              <th className="px-3 py-2.5">LEAD & COMPANY</th>
              <th className="px-3 py-2.5">EMAIL</th>
              <th className="px-3 py-2.5">SOURCE</th>
              <th className="px-3 py-2.5">INTERESTED SERVICE</th>
              <th className="px-3 py-2.5 text-center">OWNER</th>
              <th className="px-3 py-2.5 text-center">SCORE</th>
              <th className="px-3 py-2.5">STATUS</th>
              <th className="px-3 py-2.5">NEXT FOLLOW-UP</th>
              <th className="px-3 py-2.5 text-right">VALUE</th>
              <th className="px-3.5 py-2.5 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {visibleLeads.map((lead) => {
              const checked = selectedIds.has(lead.id)
              return (
                <tr
                  key={lead.id}
                  onClick={() => onSelectLead?.(lead)}
                  className="cursor-pointer transition-colors hover:bg-[#fafbfe]"
                >
                  <td
                    className="px-3.5 py-2.5"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleOne(lead.id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleOne(lead.id)}
                      className="size-3.5 rounded border-line text-gold focus:ring-gold cursor-pointer"
                    />
                  </td>

                  {/* Lead & Company */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-2xs ${lead.avatarColor}`}
                      >
                        {lead.initials}
                      </span>
                      <div className="min-w-0">
                        <span className="block font-bold text-navy-deep whitespace-nowrap">{lead.name}</span>
                        <span className="block text-[10.5px] font-medium text-muted whitespace-nowrap">{lead.company}</span>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-3 py-2.5 font-medium text-navy-deep/80 whitespace-nowrap">
                    {lead.email}
                  </td>

                  {/* Source */}
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <SourceBadge source={lead.source} />
                  </td>

                  {/* Interested Service */}
                  <td className="px-3 py-2.5 text-navy-deep font-medium whitespace-nowrap">
                    {lead.service}
                  </td>

                  {/* Owner */}
                  <td className="px-3 py-2.5 text-center whitespace-nowrap">
                    <span className="inline-flex size-5.5 items-center justify-center rounded-full bg-[#831843] text-[9.5px] font-bold text-white">
                      {lead.owner}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="px-3 py-2.5 text-center font-bold text-emerald-600 whitespace-nowrap">
                    {lead.score}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <StatusBadge status={lead.status} />
                  </td>

                  {/* Next Follow-up */}
                  <td className="px-3 py-2.5 text-muted whitespace-nowrap">
                    {lead.nextFollowUp}
                  </td>

                  {/* Value */}
                  <td className="px-3 py-2.5 text-right font-bold text-navy-deep whitespace-nowrap">
                    ₹{lead.value.toLocaleString('en-IN')}
                  </td>

                  {/* Actions */}
                  <td className="px-3.5 py-2.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectLead?.(lead)}
                        className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-medium text-navy-deep shadow-2xs hover:bg-[#f8fafc]"
                      >
                        <Eye size={12} className="text-muted" />
                      </button>
                      <button
                        type="button"
                        className="flex size-6 items-center justify-center rounded-md text-muted hover:bg-mist hover:text-navy-deep"
                      >
                        <MoreVertical size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-xs text-muted">
        <div>
          Showing <span className="font-semibold text-navy-deep">1-5</span> of{' '}
          <span className="font-semibold text-navy-deep">1,284</span> leads
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span>Rows per page:</span>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="rounded-md border border-line bg-white px-2 py-0.5 text-xs font-semibold text-navy-deep cursor-pointer"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white text-muted hover:bg-[#f8fafc] disabled:opacity-40"
            >
              <ChevronLeft size={13} />
            </button>
            <button
              type="button"
              onClick={() => setPage(1)}
              className="flex size-6 items-center justify-center rounded-md bg-gold font-bold text-white shadow-2xs"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white font-medium text-navy-deep hover:bg-[#f8fafc]"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white font-medium text-navy-deep hover:bg-[#f8fafc]"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => setPage(4)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white font-medium text-navy-deep hover:bg-[#f8fafc]"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => setPage(5)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white font-medium text-navy-deep hover:bg-[#f8fafc]"
            >
              5
            </button>
            <span className="px-1 text-muted">...</span>
            <button
              type="button"
              onClick={() => setPage(257)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white font-medium text-navy-deep hover:bg-[#f8fafc]"
            >
              257
            </button>
            <button
              type="button"
              disabled={page >= 257}
              onClick={() => setPage(page + 1)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white text-muted hover:bg-[#f8fafc] disabled:opacity-40"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
