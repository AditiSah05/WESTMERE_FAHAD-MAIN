'use client'

import {
  Bookmark,
  ChevronDown,
  FilterX,
  LayoutGrid,
  List,
  Search,
} from 'lucide-react'

type TabKey = 'all' | 'new' | 'active' | 'paying' | 'repeat' | 'subscribers' | 'inactive' | 'blocked'

export type FilterState = {
  tab: TabKey
  q: string
  status: string
  date: string
  orders: string
  spending: string
  subscription: string
  product: string
  country: string
  sort: string
}

type Props = {
  filters: FilterState
  counts: {
    all: number
    newCount: number
    activeCount: number
    payingCount: number
    repeatCount: number
    subscribersCount: number
    inactiveCount: number
    blockedCount: number
  }
  viewMode: 'table' | 'grid'
  onChange: <K extends keyof FilterState>(key: K, val: FilterState[K]) => void
  onClear: () => void
  onToggleView: (mode: 'table' | 'grid') => void
}

export default function CustomerFiltersToolbar({
  filters,
  counts,
  viewMode,
  onChange,
  onClear,
  onToggleView,
}: Props) {
  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'all', label: 'All Customers', count: counts.all },
    { key: 'new', label: 'New Customers', count: counts.newCount },
    { key: 'active', label: 'Active Customers', count: counts.activeCount },
    { key: 'paying', label: 'Paying Customers', count: counts.payingCount },
    { key: 'repeat', label: 'Repeat Customers', count: counts.repeatCount },
    { key: 'subscribers', label: 'Subscribers', count: counts.subscribersCount },
    { key: 'inactive', label: 'Inactive Customers', count: counts.inactiveCount },
    { key: 'blocked', label: 'Blocked Accounts', count: counts.blockedCount },
  ]

  const selectCls =
    'inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-navy-deep shadow-xs outline-none focus:border-gold hover:bg-[#fafbfe] cursor-pointer'

  return (
    <div className="space-y-3.5">
      {/* Horizontal Segment Filter Tabs */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => {
          const active = filters.tab === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange('tab', t.key)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                active
                  ? 'bg-navy-deep text-white shadow-sm ring-1 ring-navy-deep'
                  : 'border border-line bg-white text-navy-deep/80 hover:border-navy/30 hover:bg-[#fafbfe]'
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10.5px] font-bold ${
                  active ? 'bg-white/20 text-white' : 'bg-mist text-muted'
                }`}
              >
                {t.count.toLocaleString()}
              </span>
            </button>
          )
        })}
      </div>

      {/* Search & Select Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-line bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {/* Search box */}
          <div className="relative min-w-[240px] flex-1 sm:max-w-xs">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={filters.q}
              onChange={(e) => onChange('q', e.target.value)}
              placeholder="Search name, email, phone or customer ID..."
              className="w-full rounded-lg border border-line bg-white py-1.5 pl-9 pr-3 text-xs font-medium text-navy-deep placeholder:text-muted outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
            />
          </div>

          {/* Account Status Filter */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => onChange('status', e.target.value)}
              className={selectCls}
            >
              <option value="All">Account Status</option>
              <option value="Active">Active</option>
              <option value="Pending Verification">Pending Verification</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          {/* Registration Date Filter */}
          <div className="relative">
            <select
              value={filters.date}
              onChange={(e) => onChange('date', e.target.value)}
              className={selectCls}
            >
              <option value="all">Registration Date</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="year">This year</option>
            </select>
          </div>

          {/* Total Orders Filter */}
          <div className="relative">
            <select
              value={filters.orders}
              onChange={(e) => onChange('orders', e.target.value)}
              className={selectCls}
            >
              <option value="all">Total Orders</option>
              <option value="0">0 orders</option>
              <option value="1-3">1 - 3 orders</option>
              <option value="4-8">4 - 8 orders</option>
              <option value="8+">8+ orders</option>
            </select>
          </div>

          {/* Total Spending Filter */}
          <div className="relative">
            <select
              value={filters.spending}
              onChange={(e) => onChange('spending', e.target.value)}
              className={selectCls}
            >
              <option value="all">Total Spending</option>
              <option value="under20k">Under ₹20,000</option>
              <option value="20k-100k">₹20,000 - ₹1,00,000</option>
              <option value="above100k">Above ₹1,00,000</option>
            </select>
          </div>

          {/* Subscription Status Filter */}
          <div className="relative">
            <select
              value={filters.subscription}
              onChange={(e) => onChange('subscription', e.target.value)}
              className={selectCls}
            >
              <option value="all">Subscription Status</option>
              <option value="subscriber">Active Subscribers</option>
              <option value="none">No Subscription</option>
            </select>
          </div>

          {/* Product Purchased Filter */}
          <div className="relative">
            <select
              value={filters.product}
              onChange={(e) => onChange('product', e.target.value)}
              className={selectCls}
            >
              <option value="all">Product Purchased</option>
              <option value="mailora">Mailora</option>
              <option value="website">Web Templates</option>
              <option value="software">Software Tools</option>
            </select>
          </div>

          {/* Country Filter */}
          <div className="relative">
            <select
              value={filters.country}
              onChange={(e) => onChange('country', e.target.value)}
              className={selectCls}
            >
              <option value="all">Country</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => onChange('sort', e.target.value)}
              className={selectCls}
            >
              <option value="recent">Sort: Recently Active</option>
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="spent_high">Sort: Highest Spent</option>
              <option value="orders_high">Sort: Most Orders</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button
            type="button"
            onClick={onClear}
            title="Clear all filters"
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-muted hover:border-navy/30 hover:text-navy-deep cursor-pointer"
          >
            <FilterX size={13} />
            <span>Clear Filters</span>
          </button>

          {/* Save Filter Preset */}
          <button
            type="button"
            onClick={() => alert('Filter preset saved to your preferences.')}
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-muted hover:border-navy/30 hover:text-navy-deep cursor-pointer"
          >
            <Bookmark size={13} />
            <span>Save Filter Preset</span>
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-line bg-[#f8fafc] p-0.5">
          <button
            type="button"
            onClick={() => onToggleView('grid')}
            title="Grid view"
            className={`flex size-7 items-center justify-center rounded-md transition-all ${
              viewMode === 'grid'
                ? 'bg-gold text-white shadow-xs'
                : 'text-muted hover:text-navy-deep'
            }`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            type="button"
            onClick={() => onToggleView('table')}
            title="Table view"
            className={`flex size-7 items-center justify-center rounded-md transition-all ${
              viewMode === 'table'
                ? 'bg-gold text-white shadow-xs'
                : 'text-muted hover:text-navy-deep'
            }`}
          >
            <List size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
