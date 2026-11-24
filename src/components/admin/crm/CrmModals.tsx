'use client'

import { Plus, Upload, X } from 'lucide-react'
import { useState, useTransition } from 'react'
import {
  createContactAction,
  createDealAction,
  createLeadAction,
} from '@/app/admin/crm-actions'

export function AddLeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div>
            <h3 className="text-base font-bold text-navy-deep">Add New Lead</h3>
            <p className="text-xs text-muted">Create a prospective sales inquiry.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-lg text-muted hover:bg-mist hover:text-navy-deep"
          >
            <X size={16} />
          </button>
        </div>

        {error && <p className="mt-2 text-xs font-semibold text-rose-600">{error}</p>}

        <form
          action={(formData) => {
            setError(null)
            startTransition(async () => {
              const res = await createLeadAction(formData)
              if (res?.error) setError(res.error)
              else onClose()
            })
          }}
          className="mt-4 space-y-3"
        >
          <div>
            <label className="block text-xs font-semibold text-navy-deep">Lead Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Aarav Mehta"
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="aarav@example.com"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Company</label>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Interested Service</label>
              <input
                type="text"
                name="service"
                placeholder="e.g. Corporate Website"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Expected Value (₹)</label>
              <input
                type="number"
                name="value"
                placeholder="35000"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-line pt-3.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line px-3.5 py-1.5 text-xs font-semibold text-navy-deep hover:bg-mist"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#b3862f] disabled:opacity-50"
            >
              <Plus size={14} />
              <span>{isPending ? 'Saving...' : 'Add Lead'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function AddContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isPending, startTransition] = useTransition()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div>
            <h3 className="text-base font-bold text-navy-deep">Add New Contact</h3>
            <p className="text-xs text-muted">Register a client or company representative.</p>
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
          action={(formData) => {
            startTransition(async () => {
              await createContactAction(formData)
              onClose()
            })
          }}
          className="mt-4 space-y-3"
        >
          <div>
            <label className="block text-xs font-semibold text-navy-deep">Contact Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Zoya Khan"
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="zoya@example.com"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="+91 99*** 1184"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-deep">Company</label>
            <input
              type="text"
              name="company"
              placeholder="Company / Organization"
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-line pt-3.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line px-3.5 py-1.5 text-xs font-semibold text-navy-deep hover:bg-mist"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-deep px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-navy disabled:opacity-50"
            >
              <span>{isPending ? 'Saving...' : 'Save Contact'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function CreateDealModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isPending, startTransition] = useTransition()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div>
            <h3 className="text-base font-bold text-navy-deep">Create Sales Deal</h3>
            <p className="text-xs text-muted">Add a new deal opportunity to your pipeline.</p>
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
          action={(formData) => {
            startTransition(async () => {
              await createDealAction(formData)
              onClose()
            })
          }}
          className="mt-4 space-y-3"
        >
          <div>
            <label className="block text-xs font-semibold text-navy-deep">Deal Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Website Redesign & Branding"
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Client / Company</label>
              <input
                type="text"
                name="company"
                placeholder="Client Name"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-deep">Deal Amount (₹)</label>
              <input
                type="number"
                name="amount"
                required
                placeholder="75000"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-deep">Pipeline Stage</label>
            <select
              name="stage"
              defaultValue="new_lead"
              className="mt-1 w-full rounded-lg border border-line bg-white px-2.5 py-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
            >
              <option value="new_lead">New Lead</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="negotiation">Negotiation</option>
              <option value="won">Won</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-line pt-3.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line px-3.5 py-1.5 text-xs font-semibold text-navy-deep hover:bg-mist"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#b3862f] disabled:opacity-50"
            >
              <span>{isPending ? 'Creating...' : 'Create Deal'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
