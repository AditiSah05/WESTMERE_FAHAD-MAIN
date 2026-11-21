'use client'

import {
  Calendar,
  ChevronDown,
  Download,
  Plus,
  RotateCw,
  Search,
  Upload,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { downloadCsv } from '@/lib/admin/csv'
import type { CrmOverview } from '@/lib/server/crm'
import CrmAnalytics from './CrmAnalytics'
import { AddContactModal, AddLeadModal, CreateDealModal } from './CrmModals'
import CrmStatCards from './CrmStatCards'
import FollowUpsAndActivity from './FollowUpsAndActivity'
import LeadManagementTable from './LeadManagementTable'
import SalesPipelineKanban from './SalesPipelineKanban'

type Props = {
  data: CrmOverview
  write: boolean
}

export default function CrmView({ data, write }: Props) {
  const router = useRouter()
  const [isRefreshing, startRefresh] = useTransition()

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview')
  const [globalSearch, setGlobalSearch] = useState('')
  const [dateRange, setDateRange] = useState('Oct 1, 2026 - Oct 31, 2026')

  // Modals state
  const [addLeadOpen, setAddLeadOpen] = useState(false)
  const [addContactOpen, setAddContactOpen] = useState(false)
  const [createDealOpen, setCreateDealOpen] = useState(false)

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'leads', label: `All Leads (${data.counts.allLeads.toLocaleString()})` },
    { key: 'contacts', label: `Contacts (${data.counts.contacts})` },
    { key: 'companies', label: `Companies (${data.counts.companies})` },
    { key: 'deals', label: `Deals (${data.counts.deals})` },
    { key: 'pipeline', label: 'Sales Pipeline' },
    { key: 'followups', label: `Follow-ups (${data.counts.followUps})` },
    { key: 'tasks', label: `Tasks & Reminders (${data.counts.tasks})` },
    { key: 'notes', label: 'Notes & Activities' },
  ]

  const handleExport = () => {
    downloadCsv(
      'crm-leads',
      [
        { key: 'name', header: 'Lead Name' },
        { key: 'company', header: 'Company' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Phone' },
        { key: 'source', header: 'Source' },
        { key: 'service', header: 'Interested Service' },
        { key: 'owner', header: 'Owner' },
        { key: 'score', header: 'Lead Score' },
        { key: 'status', header: 'Status' },
        { key: 'nextFollowUp', header: 'Next Follow-up' },
        { key: 'value', header: 'Estimated Value (INR)' },
      ],
      data.leads.map((l) => ({
        id: l.id,
        name: l.name,
        company: l.company,
        email: l.email,
        phone: l.phone,
        source: l.source,
        service: l.service,
        owner: l.owner,
        score: l.score,
        status: l.status,
        nextFollowUp: l.nextFollowUp,
        value: l.value,
      }))
    )
  }

  return (
    <div className="space-y-5">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold leading-tight tracking-[-0.03em] text-navy-deep">
            Customers / CRM
          </h1>
          <p className="mt-1 text-xs font-medium text-muted">
            Manage leads, sales opportunities, business clients and follow-ups.
          </p>
        </div>

        {/* Global Search in header */}
        <div className="relative hidden w-72 md:block">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search leads, contacts, companies or deals..."
            className="w-full rounded-lg border border-line bg-white py-1.5 pl-8 pr-3 text-xs font-medium text-navy-deep placeholder:text-muted outline-none focus:border-gold"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date range */}
          <button
            type="button"
            onClick={() => {
              const ranges = ['Oct 1, 2026 - Oct 31, 2026', 'Nov 1, 2026 - Nov 21, 2026', 'Last 90 Days']
              setDateRange(ranges[(ranges.indexOf(dateRange) + 1) % ranges.length])
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
          >
            <Calendar size={14} className="text-muted" />
            <span>{dateRange}</span>
            <ChevronDown size={12} className="text-muted" />
          </button>

          {/* Refresh */}
          <button
            type="button"
            onClick={() => startRefresh(() => router.refresh())}
            title="Refresh CRM data"
            className="flex size-8.5 items-center justify-center rounded-lg border border-line bg-white text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
          >
            <RotateCw size={14} className={isRefreshing ? 'animate-spin text-gold' : 'text-muted'} />
          </button>

          {/* + Add Lead (Gold) */}
          {write && (
            <button
              type="button"
              onClick={() => setAddLeadOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#b3862f]"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>+ Add Lead</span>
            </button>
          )}

          {/* + Add Contact */}
          {write && (
            <button
              type="button"
              onClick={() => setAddContactOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
            >
              <Plus size={13} className="text-muted" />
              <span>Add Contact</span>
            </button>
          )}

          {/* Create Deal */}
          {write && (
            <button
              type="button"
              onClick={() => setCreateDealOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
            >
              <Plus size={13} className="text-muted" />
              <span>Create Deal</span>
            </button>
          )}

          {/* Import */}
          <button
            type="button"
            onClick={() => alert('Opening CSV Lead / Contact importer...')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
          >
            <Upload size={13} className="text-muted" />
            <span>Import</span>
          </button>

          {/* Export */}
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
          >
            <Download size={13} className="text-muted" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 8 Top KPI Stat Cards */}
      <CrmStatCards stats={data.stats} />

      {/* Horizontal Nav Tabs */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const active = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                active
                  ? 'bg-navy-deep text-white shadow-sm ring-1 ring-navy-deep'
                  : 'border border-line bg-white text-navy-deep/80 hover:border-navy/30 hover:bg-[#fafbfe]'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Middle Split: Left Pipeline & Table + Right Follow-ups & Activity */}
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-12">
        {/* Left Column (~73% width) */}
        <div className="space-y-4 xl:col-span-9">
          <SalesPipelineKanban stages={data.pipeline} />
          <LeadManagementTable leads={data.leads} />
        </div>

        {/* Right Column (~27% width) */}
        <div className="space-y-4 xl:col-span-3">
          <FollowUpsAndActivity
            followUps={data.todayFollowUps}
            activities={data.recentActivities}
            onActionClick={(type, item) => {
              if (type === 'call') alert(`Initiating direct call to ${item.name} (${item.company})`)
              else if (type === 'whatsapp') alert(`Opening WhatsApp chat with ${item.name}`)
              else if (type === 'email') alert(`Drafting email to ${item.name}`)
            }}
          />
        </div>
      </div>

      {/* Bottom Analytics (3 Cards) */}
      <CrmAnalytics
        trend={data.leadTrend}
        wonVsLost={data.wonVsLost}
        sources={data.leadsBySource}
      />

      {/* Modals */}
      <AddLeadModal open={addLeadOpen} onClose={() => setAddLeadOpen(false)} />
      <AddContactModal open={addContactOpen} onClose={() => setAddContactOpen(false)} />
      <CreateDealModal open={createDealOpen} onClose={() => setCreateDealOpen(false)} />
    </div>
  )
}
