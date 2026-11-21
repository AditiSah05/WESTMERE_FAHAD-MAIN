'use client'

import {
  Ban,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  IndianRupee,
  KeyRound,
  Layers,
  Mail,
  MoreVertical,
  Pencil,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import type { Customer } from '@/lib/server/shop-customers'

type Props = {
  customer: Customer | null
  onEdit: (c: Customer) => void
  onSendEmail: (c: Customer) => void
  onResetPassword: (c: Customer) => void
  onBlock: (c: Customer) => void
  onDelete: (c: Customer) => void
}

export default function CustomerDetailPanel({
  customer,
  onEdit,
  onSendEmail,
  onResetPassword,
  onBlock,
  onDelete,
}: Props) {
  if (!customer) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border border-line bg-white p-6 text-center shadow-xs">
        <div className="flex size-12 items-center justify-center rounded-full bg-mist text-muted">
          <Eye size={22} />
        </div>
        <p className="mt-3 text-sm font-semibold text-navy-deep">No customer selected</p>
        <p className="mt-1 text-xs text-muted">Click any row in the table to view customer details.</p>
      </div>
    )
  }

  const statusColor =
    customer.status === 'Active'
      ? 'bg-[#ecfdf5] text-[#059669]'
      : customer.status === 'Pending Verification'
      ? 'bg-[#fffbeb] text-[#d97706]'
      : customer.status === 'Blocked'
      ? 'bg-[#fef2f2] text-[#dc2626]'
      : 'bg-[#f1f5f9] text-[#64748b]'

  return (
    <div className="flex flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-xs">
      <div>
        {/* Header: Avatar, Name, ID, Status, More menu */}
        <div className="flex items-start justify-between gap-2 border-b border-line pb-3.5">
          <div className="flex items-center gap-3">
            <span
              className={`flex size-11 items-center justify-center rounded-full text-sm font-bold text-white shadow-xs ${customer.avatarColor}`}
            >
              {customer.initials}
            </span>
            <div>
              <h3 className="text-base font-bold text-navy-deep">{customer.name}</h3>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-muted">{customer.custId}</span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.2 text-[10.5px] font-bold ${statusColor}`}>
                  <span className="size-1 rounded-full bg-current" />
                  <span>{customer.status}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-md text-muted hover:bg-mist hover:text-navy-deep"
          >
            <MoreVertical size={16} />
          </button>
        </div>

        {/* Contact Info List */}
        <div className="mt-3.5 space-y-2 text-xs font-medium text-navy-deep">
          <div className="flex items-center gap-2.5 text-navy-deep/90">
            <Mail size={14} className="text-muted shrink-0" />
            <span className="truncate">{customer.email}</span>
          </div>

          <div className="flex items-center gap-2.5 text-navy-deep/90">
            <Phone size={14} className="text-muted shrink-0" />
            <span className="font-mono">{customer.phone}</span>
          </div>

          <div className="flex items-center gap-2.5 text-muted">
            <Calendar size={14} className="shrink-0" />
            <span>Joined: <strong className="font-semibold text-navy-deep">{customer.joined}</strong></span>
          </div>

          <div className="flex items-center gap-2.5 text-muted">
            <Clock size={14} className="shrink-0" />
            <span>Last Login: <strong className="font-semibold text-navy-deep">{customer.lastLogin}</strong></span>
          </div>

          <div className="flex items-center gap-2.5 text-muted">
            {customer.emailVerified ? (
              <CheckCircle size={14} className="text-emerald-600 shrink-0" />
            ) : (
              <XCircle size={14} className="text-rose-500 shrink-0" />
            )}
            <span>
              Email Verified: <strong className="font-semibold text-navy-deep">{customer.emailVerified ? 'Yes' : 'No'}</strong>
            </span>
          </div>
        </div>

        {/* Highlight Stats Card */}
        <div className="mt-4 rounded-lg border border-line bg-[#f8fafc] p-3 text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-medium text-muted">
              <ShoppingCart size={13} className="text-gold" />
              <span>Total Orders</span>
            </span>
            <span className="font-bold text-navy-deep">{customer.totalOrders}</span>
          </div>

          <div className="flex items-center justify-between border-t border-line/60 pt-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-muted">
              <IndianRupee size={13} className="text-emerald-600" />
              <span>Lifetime Revenue</span>
            </span>
            <span className="font-bold text-navy-deep">₹{customer.totalSpent.toLocaleString('en-IN')}</span>
          </div>

          <div className="border-t border-line/60 pt-2">
            <span className="block text-[11px] font-medium text-muted">Active Subscription</span>
            <span className="mt-0.5 inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              {customer.subscription || 'No active plan'}
            </span>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onEdit(customer)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-line bg-white py-2 text-xs font-semibold text-navy-deep shadow-2xs hover:bg-[#f8fafc]"
          >
            <Eye size={13} className="text-muted" />
            <span>View Profile</span>
          </button>

          <Link
            href={`/admin/orders?q=${encodeURIComponent(customer.email)}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gold/40 bg-[#fffdfa] py-2 text-xs font-bold text-gold shadow-2xs hover:bg-[#fff9ed]"
          >
            <ShoppingCart size={13} />
            <span>View Orders</span>
          </Link>
        </div>
      </div>

      {/* Quick Actions List */}
      <div className="mt-5 border-t border-line pt-3.5">
        <h4 className="text-xs font-bold tracking-tight text-navy-deep">Quick Actions</h4>
        <div className="mt-2 space-y-1">
          <button
            type="button"
            onClick={() => onEdit(customer)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-navy-deep/80 hover:bg-[#f8fafc] hover:text-navy-deep text-left"
          >
            <Pencil size={13} className="text-muted" />
            <span>Edit Customer</span>
          </button>

          <button
            type="button"
            onClick={() => onSendEmail(customer)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-navy-deep/80 hover:bg-[#f8fafc] hover:text-navy-deep text-left"
          >
            <Mail size={13} className="text-muted" />
            <span>Send Email</span>
          </button>

          <button
            type="button"
            onClick={() => onResetPassword(customer)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-navy-deep/80 hover:bg-[#f8fafc] hover:text-navy-deep text-left"
          >
            <KeyRound size={13} className="text-muted" />
            <span>Reset Password</span>
          </button>

          <button
            type="button"
            onClick={() => onBlock(customer)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 text-left"
          >
            <Ban size={13} />
            <span>Block Account</span>
          </button>

          <button
            type="button"
            onClick={() => onDelete(customer)}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 text-left"
          >
            <Trash2 size={13} />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  )
}
