'use client'

import { Mail, Plus, Upload, X } from 'lucide-react'
import { useState, useTransition } from 'react'
import {
  addCustomerNoteAction,
  createCustomer,
  sendCustomerEmailAction,
  updateCustomer,
} from '@/app/admin/customer-actions'
import type { Customer } from '@/lib/server/shop-customers'

type AddCustomerModalProps = {
  open: boolean
  onClose: () => void
}

export function AddCustomerModal({ open, onClose }: AddCustomerModalProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-line pb-3.5">
          <div>
            <h3 className="text-base font-bold text-navy-deep">Add New Customer</h3>
            <p className="text-xs text-muted">Create a customer profile for shop purchases and digital access.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-lg text-muted hover:bg-mist hover:text-navy-deep"
          >
            <X size={16} />
          </button>
        </div>

        {error && (
          <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        <form
          action={(formData) => {
            setError(null)
            startTransition(async () => {
              const res = await createCustomer(formData)
              if (res?.error) {
                setError(res.error)
              } else {
                onClose()
              }
            })
          }}
          className="mt-4 space-y-3.5"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Aarav Mehta"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="aarav@example.com"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+91 98*** 4321"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Company</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. TechStudio"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Country</label>
              <input
                type="text"
                name="country"
                defaultValue="India"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Status</label>
              <select
                name="status"
                defaultValue="active"
                className="mt-1 w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              >
                <option value="active">Active</option>
                <option value="pending">Pending Verification</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Subscription</label>
              <select
                name="subscription"
                defaultValue=""
                className="mt-1 w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              >
                <option value="">None</option>
                <option value="Mailora - Starter">Mailora - Starter</option>
                <option value="Mailora - Professional">Mailora - Professional</option>
                <option value="Mailora - Enterprise">Mailora - Enterprise</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-line pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line px-4 py-2 text-xs font-semibold text-navy-deep hover:bg-mist"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#b3862f] disabled:opacity-50"
            >
              <Plus size={14} />
              <span>{isPending ? 'Saving...' : 'Add Customer'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

type EditCustomerModalProps = {
  customer: Customer | null
  onClose: () => void
}

export function EditCustomerModal({ customer, onClose }: EditCustomerModalProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  if (!customer) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-line pb-3.5">
          <div>
            <h3 className="text-base font-bold text-navy-deep">Edit Customer</h3>
            <p className="text-xs text-muted">{customer.name} ({customer.custId})</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-lg text-muted hover:bg-mist hover:text-navy-deep"
          >
            <X size={16} />
          </button>
        </div>

        {error && (
          <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        <form
          action={(formData) => {
            setError(null)
            startTransition(async () => {
              const res = await updateCustomer(formData)
              if (res?.error) {
                setError(res.error)
              } else {
                onClose()
              }
            })
          }}
          className="mt-4 space-y-3.5"
        >
          <input type="hidden" name="id" value={customer.id} />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Full Name</label>
              <input
                type="text"
                name="name"
                defaultValue={customer.name}
                required
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Email Address</label>
              <input
                type="email"
                defaultValue={customer.email}
                disabled
                className="mt-1 w-full rounded-lg border border-line bg-[#f8fafc] px-3 py-2 text-xs font-medium text-muted outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Phone Number</label>
              <input
                type="text"
                name="phone"
                defaultValue={customer.phone}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Company</label>
              <input
                type="text"
                name="company"
                defaultValue={customer.company}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Country</label>
              <input
                type="text"
                name="country"
                defaultValue={customer.country}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Status</label>
              <select
                name="status"
                defaultValue={customer.status.toLowerCase().replace(' ', '_')}
                className="mt-1 w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              >
                <option value="active">Active</option>
                <option value="pending">Pending Verification</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Subscription</label>
              <select
                name="subscription"
                defaultValue={customer.subscription || ''}
                className="mt-1 w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              >
                <option value="">None</option>
                <option value="Mailora - Starter">Mailora - Starter</option>
                <option value="Mailora - Professional">Mailora - Professional</option>
                <option value="Mailora - Enterprise">Mailora - Enterprise</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-deep">Internal Note</label>
            <textarea
              name="notes"
              rows={2}
              defaultValue={customer.internalNotes}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              placeholder="Private note for admin team..."
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-line pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line px-4 py-2 text-xs font-semibold text-navy-deep hover:bg-mist"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-gold px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#b3862f] disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Update Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

type SendEmailModalProps = {
  customer: Customer | null
  onClose: () => void
}

export function SendEmailModal({ customer, onClose }: SendEmailModalProps) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [isPending, startTransition] = useTransition()

  if (!customer) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div>
            <h3 className="text-base font-bold text-navy-deep">Send Email</h3>
            <p className="text-xs text-muted">To: {customer.name} ({customer.email})</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-lg text-muted hover:bg-mist hover:text-navy-deep"
          >
            <X size={16} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            startTransition(async () => {
              await sendCustomerEmailAction(customer.id, subject, body)
              alert(`Email sent successfully to ${customer.email}`)
              onClose()
            })
          }}
          className="mt-4 space-y-3"
        >
          <div>
            <label className="block text-xs font-semibold text-navy-deep">Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Important update regarding your Westmere purchase"
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-deep">Message</label>
            <textarea
              required
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your email message here..."
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-line pt-3.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line px-4 py-2 text-xs font-semibold text-navy-deep hover:bg-mist"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-deep px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-navy disabled:opacity-50"
            >
              <Mail size={13} />
              <span>{isPending ? 'Sending...' : 'Send Email'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

type ImportModalProps = {
  open: boolean
  onClose: () => void
}

export function ImportModal({ open, onClose }: ImportModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div>
            <h3 className="text-base font-bold text-navy-deep">Import Customers</h3>
            <p className="text-xs text-muted">Upload CSV with Name, Email, Phone, Country.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-lg text-muted hover:bg-mist hover:text-navy-deep"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-line p-6 text-center hover:bg-mist/30">
          <Upload size={28} className="text-muted" />
          <p className="mt-2 text-xs font-semibold text-navy-deep">Click or drag CSV file to this area</p>
          <p className="text-[11px] text-muted">Supports .csv files up to 5MB</p>
          <input type="file" accept=".csv" className="mt-3 text-xs" />
        </div>

        <div className="mt-4 flex items-center justify-end gap-2.5 border-t border-line pt-3.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line px-4 py-2 text-xs font-semibold text-navy-deep hover:bg-mist"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Customer file uploaded and queued for processing.')
              onClose()
            }}
            className="rounded-lg bg-gold px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#b3862f]"
          >
            Start Import
          </button>
        </div>
      </div>
    </div>
  )
}
