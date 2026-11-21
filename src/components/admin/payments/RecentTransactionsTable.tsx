'use client'

import {
  CreditCard,
  Download,
  Eye,
  Globe,
  MoreVertical,
  QrCode,
  Receipt,
  Search,
  Smartphone,
} from 'lucide-react'
import { useState } from 'react'
import { downloadCsv } from '@/lib/admin/csv'
import type { Transaction } from '@/lib/server/payments'

type Props = {
  transactions: Transaction[]
  onSelectTransaction?: (tx: Transaction) => void
}

function MethodBadge({ method }: { method: Transaction['method'] }) {
  if (method === 'UPI') {
    return (
      <span className="inline-flex items-center gap-1 font-medium text-navy-deep">
        <Smartphone size={13} className="text-muted" />
        <span>UPI</span>
      </span>
    )
  }
  if (method === 'Card') {
    return (
      <span className="inline-flex items-center gap-1 font-medium text-navy-deep">
        <CreditCard size={13} className="text-muted" />
        <span>Card</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 font-medium text-navy-deep">
      <Globe size={13} className="text-muted" />
      <span>Net Banking</span>
    </span>
  )
}

function StatusPill({ status }: { status: Transaction['status'] }) {
  if (status === 'Successful') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf5] px-2.5 py-0.5 text-xs font-semibold text-[#059669]">
        <span className="size-1.5 rounded-full bg-[#10b981]" />
        <span>Successful</span>
      </span>
    )
  }
  if (status === 'Pending') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fffbeb] px-2.5 py-0.5 text-xs font-semibold text-[#d97706]">
        <span className="size-1.5 rounded-full bg-[#f59e0b]" />
        <span>Pending</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fef2f2] px-2.5 py-0.5 text-xs font-semibold text-[#dc2626]">
      <span className="size-1.5 rounded-full bg-[#ef4444]" />
      <span>Refunded</span>
    </span>
  )
}

export default function RecentTransactionsTable({ transactions, onSelectTransaction }: Props) {
  const [q, setQ] = useState('')
  const [gatewayFilter, setGatewayFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [productFilter, setProductFilter] = useState('All')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const filtered = transactions.filter((tx) => {
    if (q) {
      const match =
        tx.id.toLowerCase().includes(q.toLowerCase()) ||
        tx.orderId.toLowerCase().includes(q.toLowerCase()) ||
        tx.customer.toLowerCase().includes(q.toLowerCase()) ||
        tx.product.toLowerCase().includes(q.toLowerCase())
      if (!match) return false
    }
    if (gatewayFilter !== 'All' && tx.gateway !== gatewayFilter) return false
    if (statusFilter !== 'All' && tx.status !== statusFilter) return false
    if (productFilter !== 'All' && !tx.product.toLowerCase().includes(productFilter.toLowerCase())) return false
    return true
  })

  const allSelected = filtered.length > 0 && filtered.every((tx) => selectedIds.has(tx.id))

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((tx) => tx.id)))
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

  const handleExport = () => {
    downloadCsv(
      'finance-transactions',
      [
        { key: 'id', header: 'Transaction ID' },
        { key: 'orderId', header: 'Order ID' },
        { key: 'customer', header: 'Customer' },
        { key: 'product', header: 'Product / Service' },
        { key: 'gateway', header: 'Gateway' },
        { key: 'method', header: 'Payment Method' },
        { key: 'grossFormatted', header: 'Gross Amount' },
        { key: 'feeFormatted', header: 'Gateway Fee' },
        { key: 'netFormatted', header: 'Net Amount' },
        { key: 'status', header: 'Status' },
        { key: 'date', header: 'Transaction Date' },
      ],
      filtered.map((tx) => ({
        id: tx.id,
        orderId: tx.orderId,
        customer: tx.customer,
        product: tx.product,
        gateway: tx.gateway,
        method: tx.method,
        grossFormatted: tx.grossFormatted,
        feeFormatted: tx.feeFormatted,
        netFormatted: tx.netFormatted,
        status: tx.status,
        date: tx.date,
      }))
    )
  }

  const selCls =
    'rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-semibold text-navy-deep outline-none cursor-pointer'

  return (
    <div className="rounded-xl border border-line bg-white shadow-xs">
      {/* Header: Title + Search & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-gold">
            <Receipt size={16} />
          </span>
          <h3 className="text-sm font-bold text-navy-deep">Recent Transactions</h3>
        </div>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-2.5">
          {/* Search box */}
          <div className="relative min-w-[260px] flex-1 sm:max-w-xs">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by transaction ID, order ID, customer or product..."
              className="w-full rounded-lg border border-line bg-white py-1.5 pl-8 pr-3 text-xs font-medium text-navy-deep placeholder:text-muted outline-none focus:border-gold"
            />
          </div>

          <select value={gatewayFilter} onChange={(e) => setGatewayFilter(e.target.value)} className={selCls}>
            <option value="All">All Gateways</option>
            <option value="Razorpay">Razorpay</option>
            <option value="Stripe">Stripe</option>
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selCls}>
            <option value="All">All Status</option>
            <option value="Successful">Successful</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>

          <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className={selCls}>
            <option value="All">All Products</option>
            <option value="Website">Website Development</option>
            <option value="CRM">CRM Software</option>
            <option value="Mailora">Mailora Subscription</option>
            <option value="Custom">Custom Application</option>
          </select>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#fafbfe] cursor-pointer"
          >
            <Download size={13} className="text-muted" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-line bg-[#f8fafc]/80 text-[10.5px] font-bold uppercase tracking-wider text-muted">
              <th className="w-9 px-3.5 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="size-3.5 rounded border-line text-gold focus:ring-gold cursor-pointer"
                />
              </th>
              <th className="px-3 py-3">TRANSACTION ID</th>
              <th className="px-3 py-3">ORDER ID</th>
              <th className="px-3 py-3">CUSTOMER</th>
              <th className="px-3 py-3">PRODUCT / SERVICE</th>
              <th className="px-3 py-3">GATEWAY</th>
              <th className="px-3 py-3">PAYMENT METHOD</th>
              <th className="px-3 py-3 text-right">GROSS AMOUNT</th>
              <th className="px-3 py-3 text-right">FEE</th>
              <th className="px-3 py-3 text-right">NET AMOUNT</th>
              <th className="px-3 py-3">STATUS</th>
              <th className="px-3 py-3">TRANSACTION DATE</th>
              <th className="px-3.5 py-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((tx) => {
              const checked = selectedIds.has(tx.id)
              return (
                <tr
                  key={tx.id}
                  onClick={() => onSelectTransaction?.(tx)}
                  className="cursor-pointer transition-colors hover:bg-[#fafbfe]"
                >
                  <td
                    className="px-3.5 py-2.5"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleOne(tx.id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleOne(tx.id)}
                      className="size-3.5 rounded border-line text-gold focus:ring-gold cursor-pointer"
                    />
                  </td>

                  {/* Transaction ID */}
                  <td className="px-3 py-2.5 font-mono text-[11.5px] font-medium text-navy-deep whitespace-nowrap">
                    {tx.id}
                  </td>

                  {/* Order ID */}
                  <td className="px-3 py-2.5 font-medium text-blue-600 whitespace-nowrap">
                    {tx.orderId}
                  </td>

                  {/* Customer */}
                  <td className="px-3 py-2.5 font-bold text-navy-deep whitespace-nowrap">
                    {tx.customer}
                  </td>

                  {/* Product / Service */}
                  <td className="px-3 py-2.5 text-navy-deep/90 whitespace-nowrap">
                    {tx.product}
                  </td>

                  {/* Gateway */}
                  <td className="px-3 py-2.5 font-medium text-navy-deep whitespace-nowrap">
                    {tx.gateway}
                  </td>

                  {/* Payment Method */}
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <MethodBadge method={tx.method} />
                  </td>

                  {/* Gross Amount */}
                  <td className="px-3 py-2.5 text-right font-bold text-navy-deep whitespace-nowrap">
                    {tx.grossFormatted}
                  </td>

                  {/* Fee */}
                  <td className="px-3 py-2.5 text-right text-muted whitespace-nowrap">
                    {tx.feeFormatted}
                  </td>

                  {/* Net Amount */}
                  <td className="px-3 py-2.5 text-right font-bold text-navy-deep whitespace-nowrap">
                    {tx.netFormatted}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <StatusPill status={tx.status} />
                  </td>

                  {/* Transaction Date */}
                  <td className="px-3 py-2.5 text-muted whitespace-nowrap">
                    {tx.date}
                  </td>

                  {/* Actions */}
                  <td className="px-3.5 py-2.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectTransaction?.(tx)}
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
    </div>
  )
}
