'use client'

import {
  Calendar,
  ChevronDown,
  Download,
  MoreHorizontal,
  Plus,
  RotateCw,
  Upload,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState, useTransition } from 'react'
import {
  blockCustomer,
  bulkCustomerAction,
  deleteCustomer,
} from '@/app/admin/customer-actions'
import { downloadCsv } from '@/lib/admin/csv'
import type { Customer, ShopCustomersOverview } from '@/lib/server/shop-customers'
import BulkCustomerBar from './BulkCustomerBar'
import CustomerAnalytics from './CustomerAnalytics'
import CustomerDetailPanel from './CustomerDetailPanel'
import CustomerFiltersToolbar, { type FilterState } from './CustomerFiltersToolbar'
import {
  AddCustomerModal,
  EditCustomerModal,
  ImportModal,
  SendEmailModal,
} from './CustomerModals'
import CustomerStatsCards from './CustomerStatsCards'
import CustomerTable from './CustomerTable'

type Props = {
  data: ShopCustomersOverview
  write: boolean
}

export default function ShopCustomersView({ data, write }: Props) {
  const router = useRouter()
  const [isRefreshing, startRefresh] = useTransition()

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    tab: 'all',
    q: '',
    status: 'All',
    date: 'all',
    orders: 'all',
    spending: 'all',
    subscription: 'all',
    product: 'all',
    country: 'all',
    sort: 'recent',
  })

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  // Selection state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    data.customers[0] ?? null
  )
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(data.customers[0] ? [data.customers[0].id] : [])
  )

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalCustomer, setEditModalCustomer] = useState<Customer | null>(null)
  const [emailModalCustomer, setEmailModalCustomer] = useState<Customer | null>(null)
  const [importModalOpen, setImportModalOpen] = useState(false)

  // Date range picker toggle
  const [dateRange, setDateRange] = useState('Oct 1, 2026 - Oct 31, 2026')
  const [moreActionsOpen, setMoreActionsOpen] = useState(false)

  const handleFilterChange = <K extends keyof FilterState>(key: K, val: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: val }))
    setPage(1)
  }

  const handleClearFilters = () => {
    setFilters({
      tab: 'all',
      q: '',
      status: 'All',
      date: 'all',
      orders: 'all',
      spending: 'all',
      subscription: 'all',
      product: 'all',
      country: 'all',
      sort: 'recent',
    })
    setPage(1)
  }

  // Filtered customers logic
  const filteredCustomers = useMemo(() => {
    return data.customers.filter((c) => {
      // Tab filter
      if (filters.tab === 'new') {
        if (!c.joined.includes('Nov 2026') && !c.joined.includes('Oct 2026')) return false
      } else if (filters.tab === 'active' && c.status !== 'Active') {
        return false
      } else if (filters.tab === 'paying' && c.totalSpent <= 0) {
        return false
      } else if (filters.tab === 'repeat' && c.totalOrders < 2) {
        return false
      } else if (filters.tab === 'subscribers' && !c.subscription) {
        return false
      } else if (filters.tab === 'inactive' && c.status !== 'Inactive') {
        return false
      } else if (filters.tab === 'blocked' && c.status !== 'Blocked') {
        return false
      }

      // Search query
      if (filters.q.trim()) {
        const query = filters.q.toLowerCase()
        const match =
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.phone.toLowerCase().includes(query) ||
          c.custId.toLowerCase().includes(query) ||
          c.company.toLowerCase().includes(query)
        if (!match) return false
      }

      // Account Status
      if (filters.status !== 'All' && c.status !== filters.status) return false

      // Total orders
      if (filters.orders === '0' && c.totalOrders !== 0) return false
      if (filters.orders === '1-3' && (c.totalOrders < 1 || c.totalOrders > 3)) return false
      if (filters.orders === '4-8' && (c.totalOrders < 4 || c.totalOrders > 8)) return false
      if (filters.orders === '8+' && c.totalOrders < 8) return false

      // Total spending
      if (filters.spending === 'under20k' && c.totalSpent >= 20000) return false
      if (filters.spending === '20k-100k' && (c.totalSpent < 20000 || c.totalSpent > 100000)) return false
      if (filters.spending === 'above100k' && c.totalSpent <= 100000) return false

      // Subscription status
      if (filters.subscription === 'subscriber' && !c.subscription) return false
      if (filters.subscription === 'none' && c.subscription) return false

      // Country
      if (filters.country !== 'all' && c.country !== filters.country) return false

      return true
    }).sort((a, b) => {
      if (filters.sort === 'newest') return b.joined.localeCompare(a.joined)
      if (filters.sort === 'oldest') return a.joined.localeCompare(b.joined)
      if (filters.sort === 'spent_high') return b.totalSpent - a.totalSpent
      if (filters.sort === 'orders_high') return b.totalOrders - a.totalOrders
      return 0
    })
  }, [data.customers, filters])

  // Pagination slice
  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * perPage
    return filteredCustomers.slice(start, start + perPage)
  }, [filteredCustomers, page, perPage])

  // Toggle selection
  const toggleSelectId = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (paginatedCustomers.every((c) => selectedIds.has(c.id))) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(paginatedCustomers.map((c) => c.id)))
    }
  }

  // Export CSV function
  const handleExport = (list = filteredCustomers) => {
    downloadCsv(
      'shop-customers',
      [
        { key: 'custId', header: 'Customer ID' },
        { key: 'name', header: 'Customer Name' },
        { key: 'email', header: 'Email Address' },
        { key: 'phone', header: 'Phone' },
        { key: 'joined', header: 'Registration Date' },
        { key: 'totalOrders', header: 'Total Orders' },
        { key: 'totalSpent', header: 'Total Spent (INR)' },
        { key: 'lastPurchase', header: 'Last Purchase' },
        { key: 'status', header: 'Account Status' },
        { key: 'subscription', header: 'Active Subscription' },
        { key: 'country', header: 'Country' },
      ],
      list.map((c) => ({
        id: c.id,
        custId: c.custId,
        name: c.name,
        email: c.email,
        phone: c.phone,
        joined: c.joined,
        totalOrders: c.totalOrders,
        totalSpent: c.totalSpent,
        lastPurchase: c.lastPurchase,
        status: c.status,
        subscription: c.subscription || 'None',
        country: c.country,
      }))
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold leading-tight tracking-[-0.03em] text-navy-deep">
            Shop Customers
          </h1>
          <p className="mt-1 text-xs font-medium text-muted">
            Manage registered customer accounts, purchase history, payments, subscriptions and digital product access.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Date range picker button */}
          <button
            type="button"
            onClick={() => {
              const ranges = [
                'Oct 1, 2026 - Oct 31, 2026',
                'Nov 1, 2026 - Nov 21, 2026',
                'Last 90 Days',
                'Year to Date 2026',
              ]
              const next = ranges[(ranges.indexOf(dateRange) + 1) % ranges.length]
              setDateRange(next)
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
          >
            <Calendar size={14} className="text-muted" />
            <span>{dateRange}</span>
            <ChevronDown size={12} className="text-muted" />
          </button>

          {/* Refresh button */}
          <button
            type="button"
            onClick={() => startRefresh(() => router.refresh())}
            title="Refresh customers data"
            className="flex size-8.5 items-center justify-center rounded-lg border border-line bg-white text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
          >
            <RotateCw size={14} className={isRefreshing ? 'animate-spin text-gold' : 'text-muted'} />
          </button>

          {/* + Add Customer Button (Gold) */}
          {write && (
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#b3862f]"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>+ Add Customer</span>
            </button>
          )}

          {/* Import Customers */}
          <button
            type="button"
            onClick={() => setImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
          >
            <Upload size={13} className="text-muted" />
            <span>Import Customers</span>
          </button>

          {/* Export Customers */}
          <button
            type="button"
            onClick={() => handleExport(filteredCustomers)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
          >
            <Download size={13} className="text-muted" />
            <span>Export Customers</span>
          </button>

          {/* More Actions dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreActionsOpen(!moreActionsOpen)}
              className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe]"
            >
              <span>More Actions</span>
              <ChevronDown size={12} className="text-muted" />
            </button>

            {moreActionsOpen && (
              <div className="absolute right-0 top-full z-30 mt-1 w-44 rounded-xl border border-line bg-white p-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setMoreActionsOpen(false)
                    handleExport(data.customers)
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-navy-deep hover:bg-mist"
                >
                  Export All (CSV)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMoreActionsOpen(false)
                    alert('Syncing user database with Stripe & Razorpay webhook logs...')
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-navy-deep hover:bg-mist"
                >
                  Sync Customer Gateways
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMoreActionsOpen(false)
                    alert('Preparing bulk customer notification campaign...')
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-navy-deep hover:bg-mist"
                >
                  Broadcast Announcement
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top 8 Stat Cards */}
      <CustomerStatsCards stats={data.stats} />

      {/* Segment Tabs & Advanced Filters Toolbar */}
      <CustomerFiltersToolbar
        filters={filters}
        counts={data.counts}
        viewMode={viewMode}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
        onToggleView={setViewMode}
      />

      {/* Bulk Action Bar */}
      <BulkCustomerBar
        selectedCount={selectedIds.size}
        totalCount={data.customers.length}
        onClear={() => setSelectedIds(new Set())}
        onSendEmail={() => {
          if (selectedCustomer) setEmailModalCustomer(selectedCustomer)
        }}
        onAssignTags={() => {
          const tag = prompt('Enter tag name to assign to selected customers:', 'VIP')
          if (tag) bulkCustomerAction(Array.from(selectedIds), 'tag', tag)
        }}
        onChangeStatus={() => {
          const st = prompt('Enter new status (active, pending, inactive, blocked):', 'active')
          if (st) bulkCustomerAction(Array.from(selectedIds), st)
        }}
        onAddNote={() => {
          const note = prompt('Enter internal note for selected customers:')
          if (note && selectedCustomer) {
            alert('Note appended to selected customer records.')
          }
        }}
        onExport={() => {
          const selectedList = data.customers.filter((c) => selectedIds.has(c.id))
          handleExport(selectedList)
        }}
        onBlock={() => {
          if (confirm(`Block ${selectedIds.size} selected customer(s)?`)) {
            bulkCustomerAction(Array.from(selectedIds), 'block')
          }
        }}
        onDelete={() => {
          if (confirm(`Are you sure you want to delete ${selectedIds.size} customer(s)?`)) {
            bulkCustomerAction(Array.from(selectedIds), 'delete')
          }
        }}
      />

      {/* Main Split Content: Left Table (~75%) + Right Detail Panel (~25%) */}
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-12">
        {/* Left Side: Table of Customers */}
        <div className="xl:col-span-9">
          <CustomerTable
            customers={paginatedCustomers}
            totalCustomersCount={data.counts.all}
            selectedCustomer={selectedCustomer}
            selectedIds={selectedIds}
            onSelectCustomer={(c) => setSelectedCustomer(c)}
            onToggleSelectId={toggleSelectId}
            onToggleAll={toggleSelectAll}
            page={page}
            perPage={perPage}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
            onActionClick={(action, c) => {
              if (action === 'menu') {
                setEditModalCustomer(c)
              }
            }}
          />
        </div>

        {/* Right Side: Customer Detail Inspector */}
        <div className="xl:col-span-3 sticky top-4">
          <CustomerDetailPanel
            customer={selectedCustomer}
            onEdit={(c) => setEditModalCustomer(c)}
            onSendEmail={(c) => setEmailModalCustomer(c)}
            onResetPassword={(c) => alert(`Password reset link generated for ${c.email}`)}
            onBlock={(c) => {
              if (confirm(`Block customer ${c.name}?`)) {
                blockCustomer(c.id)
              }
            }}
            onDelete={(c) => {
              if (confirm(`Delete customer ${c.name}?`)) {
                deleteCustomer(c.id)
              }
            }}
          />
        </div>
      </div>

      {/* Bottom Analytics Section (3 Cards) */}
      <CustomerAnalytics
        growth={data.growth}
        segments={data.segments}
        activities={data.activities}
      />

      {/* Modals */}
      <AddCustomerModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <EditCustomerModal customer={editModalCustomer} onClose={() => setEditModalCustomer(null)} />
      <SendEmailModal customer={emailModalCustomer} onClose={() => setEmailModalCustomer(null)} />
      <ImportModal open={importModalOpen} onClose={() => setImportModalOpen(false)} />
    </div>
  )
}
