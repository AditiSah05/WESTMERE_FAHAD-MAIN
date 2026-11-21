'use client'

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
} from 'lucide-react'
import type { Customer } from '@/lib/server/shop-customers'

type Props = {
  customers: Customer[]
  totalCustomersCount: number
  selectedCustomer: Customer | null
  selectedIds: Set<string>
  onSelectCustomer: (c: Customer) => void
  onToggleSelectId: (id: string) => void
  onToggleAll: () => void
  page: number
  perPage: number
  onPageChange: (p: number) => void
  onPerPageChange: (n: number) => void
  onActionClick: (action: string, customer: Customer) => void
}

function StatusPill({ status }: { status: Customer['status'] }) {
  if (status === 'Active') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf5] px-2.5 py-0.5 text-xs font-semibold text-[#059669]">
        <span className="size-1.5 rounded-full bg-[#10b981]" />
        <span>Active</span>
      </span>
    )
  }
  if (status === 'Pending Verification') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fffbeb] px-2.5 py-0.5 text-xs font-semibold text-[#d97706]">
        <span className="size-1.5 rounded-full bg-[#f59e0b]" />
        <span>Pending Verification</span>
      </span>
    )
  }
  if (status === 'Blocked') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fef2f2] px-2.5 py-0.5 text-xs font-semibold text-[#dc2626]">
        <span className="size-1.5 rounded-full bg-[#ef4444]" />
        <span>Blocked</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-2.5 py-0.5 text-xs font-semibold text-[#64748b]">
      <span className="size-1.5 rounded-full bg-[#94a3b8]" />
      <span>Inactive</span>
    </span>
  )
}

export default function CustomerTable({
  customers,
  totalCustomersCount,
  selectedCustomer,
  selectedIds,
  onSelectCustomer,
  onToggleSelectId,
  onToggleAll,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  onActionClick,
}: Props) {
  const allSelected =
    customers.length > 0 && customers.every((c) => selectedIds.has(c.id))

  const totalPages = Math.max(1, Math.ceil(totalCustomersCount / perPage))

  return (
    <div className="flex flex-col justify-between rounded-xl border border-line bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-line bg-[#f8fafc]/80 text-[11px] font-bold uppercase tracking-wider text-muted">
              <th className="w-9 px-3.5 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                  className="size-3.5 rounded border-line text-gold focus:ring-gold cursor-pointer"
                />
              </th>
              <th className="px-3 py-3">CUSTOMER</th>
              <th className="px-3 py-3">CUSTOMER ID</th>
              <th className="px-3 py-3">EMAIL ADDRESS</th>
              <th className="px-3 py-3">PHONE</th>
              <th className="px-3 py-3">REGISTRATION DATE</th>
              <th className="px-3 py-3 text-center">TOTAL ORDERS</th>
              <th className="px-3 py-3 text-right">TOTAL SPENT</th>
              <th className="px-3 py-3">LAST PURCHASE</th>
              <th className="px-3 py-3">ACCOUNT STATUS</th>
              <th className="px-3.5 py-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {customers.map((c) => {
              const isSelectedRow = selectedCustomer?.id === c.id
              const isChecked = selectedIds.has(c.id)

              return (
                <tr
                  key={c.id}
                  onClick={() => onSelectCustomer(c)}
                  className={`group cursor-pointer transition-colors ${
                    isSelectedRow
                      ? 'bg-[#fffdf5] ring-1 ring-inset ring-amber-300/40'
                      : 'hover:bg-[#fafbfe]'
                  }`}
                >
                  <td
                    className="px-3.5 py-2.5"
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleSelectId(c.id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleSelectId(c.id)}
                      className="size-3.5 rounded border-line text-gold focus:ring-gold cursor-pointer"
                    />
                  </td>

                  {/* Customer Avatar & Name */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-2xs ${c.avatarColor}`}
                      >
                        {c.initials}
                      </span>
                      <span className="font-bold text-navy-deep group-hover:text-gold transition-colors whitespace-nowrap">
                        {c.name}
                      </span>
                    </div>
                  </td>

                  {/* Customer ID */}
                  <td className="px-3 py-2.5 font-mono text-[11.5px] font-medium text-navy-deep/80 whitespace-nowrap">
                    {c.custId}
                  </td>

                  {/* Email */}
                  <td className="px-3 py-2.5 font-medium text-navy-deep/80 whitespace-nowrap">
                    {c.email}
                  </td>

                  {/* Phone */}
                  <td className="px-3 py-2.5 font-mono text-[11.5px] text-muted whitespace-nowrap">
                    {c.phone}
                  </td>

                  {/* Registration Date */}
                  <td className="px-3 py-2.5 text-muted whitespace-nowrap">
                    {c.joined}
                  </td>

                  {/* Total Orders */}
                  <td className="px-3 py-2.5 text-center font-bold text-navy-deep">
                    {c.totalOrders}
                  </td>

                  {/* Total Spent */}
                  <td className="px-3 py-2.5 text-right font-bold text-navy-deep whitespace-nowrap">
                    ₹{c.totalSpent.toLocaleString('en-IN')}
                  </td>

                  {/* Last Purchase */}
                  <td className="px-3 py-2.5 text-muted whitespace-nowrap">
                    {c.lastPurchase}
                  </td>

                  {/* Status Badge */}
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <StatusPill status={c.status} />
                  </td>

                  {/* Actions */}
                  <td
                    className="px-3.5 py-2.5 text-right whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectCustomer(c)}
                        className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-medium text-navy-deep shadow-2xs hover:bg-[#f8fafc]"
                      >
                        <Eye size={12} className="text-muted" />
                        <span>View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onActionClick('menu', c)}
                        className="flex size-6 items-center justify-center rounded-md text-muted hover:bg-mist hover:text-navy-deep"
                      >
                        <MoreVertical size={14} />
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted">
        <div>
          Showing <span className="font-semibold text-navy-deep">1-8</span> of{' '}
          <span className="font-semibold text-navy-deep">{totalCustomersCount.toLocaleString()}</span> customers
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span>Rows per page:</span>
            <select
              value={perPage}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
              className="rounded-md border border-line bg-white px-2 py-0.8 text-xs font-semibold text-navy-deep shadow-2xs cursor-pointer outline-none"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white text-muted hover:bg-[#f8fafc] disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className="flex size-6 items-center justify-center rounded-md bg-gold font-bold text-white shadow-2xs"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => onPageChange(2)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white font-medium text-navy-deep hover:bg-[#f8fafc]"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => onPageChange(3)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white font-medium text-navy-deep hover:bg-[#f8fafc]"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => onPageChange(4)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white font-medium text-navy-deep hover:bg-[#f8fafc]"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => onPageChange(5)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white font-medium text-navy-deep hover:bg-[#f8fafc]"
            >
              5
            </button>
            <span className="px-1 text-muted">...</span>
            <button
              type="button"
              onClick={() => onPageChange(249)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white font-medium text-navy-deep hover:bg-[#f8fafc]"
            >
              249
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className="flex size-6 items-center justify-center rounded-md border border-line bg-white text-muted hover:bg-[#f8fafc] disabled:opacity-40"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
