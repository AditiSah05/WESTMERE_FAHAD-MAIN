'use client'

import { useState } from 'react'
import {
  X,
  Plus,
  Send,
  Calendar,
  Layers,
  ShoppingBag,
} from 'lucide-react'
import type { SupportTicket } from '@/lib/server/support-projects'

export function CreateTicketModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (ticket: Partial<SupportTicket>) => void
}) {
  const [subject, setSubject] = useState('')
  const [client, setClient] = useState('Studio North')
  const [category, setCategory] = useState<SupportTicket['category']>('Technical Support')
  const [priority, setPriority] = useState<SupportTicket['priority']>('Medium')
  const [assignee, setAssignee] = useState('A. Khan')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim()) return

    onSubmit({
      id: `#T-${Math.floor(213 + Math.random() * 80)}`,
      client,
      clientAvatar: client.slice(0, 2).toUpperCase(),
      avatarBg: 'bg-blue-100',
      avatarText: 'text-blue-700',
      subject,
      category,
      assignee,
      assigneeInitials: assignee.slice(0, 2).toUpperCase(),
      assigneeBg: 'bg-amber-100',
      assigneeText: 'text-amber-700',
      priority,
      status: 'Open',
      updated: 'Just now',
      description,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Plus size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Create Support Ticket</h3>
              <p className="text-[11px] text-slate-500">Log client issue or technical request</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 text-xs text-slate-700">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700">Subject</label>
            <input
              type="text"
              required
              placeholder="e.g. License renewal validation issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700">Client</label>
              <select
                aria-label="Select client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
              >
                <option value="Studio North">Studio North</option>
                <option value="Zoya Khan">Zoya Khan</option>
                <option value="Aarav Mehta">Aarav Mehta</option>
                <option value="Meera Shah">Meera Shah</option>
                <option value="Kabir Anand">Kabir Anand</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700">Category</label>
              <select
                aria-label="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value as SupportTicket['category'])}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
              >
                <option value="Technical Support">Technical Support</option>
                <option value="Website Issue">Website Issue</option>
                <option value="Software Support">Software Support</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Account & Login">Account & Login</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700">Priority</label>
              <select
                aria-label="Select priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as SupportTicket['priority'])}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700">Assignee</label>
              <select
                aria-label="Select assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
              >
                <option value="A. Khan">A. Khan (Project Manager)</option>
                <option value="R. Mehta">R. Mehta (Senior Developer)</option>
                <option value="S. Kapoor">S. Kapoor (Full Stack)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700">Detailed Description</label>
            <textarea
              rows={3}
              placeholder="Provide steps to reproduce or client context..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#c4943d] px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#b3832d]"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function CreateProjectModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string, client: string, type: string) => void
}) {
  const [name, setName] = useState('')
  const [client, setClient] = useState('Studio North')
  const [type, setType] = useState('Web Development')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit(name, client, type)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Layers size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">New Client Project</h3>
              <p className="text-[11px] text-slate-500">Initiate custom design or dev delivery</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 text-xs text-slate-700">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700">Project Name</label>
            <input
              type="text"
              required
              placeholder="e.g. NextGen CRM Portal Integration"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700">Client</label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700">Project Type</label>
              <select
                aria-label="Select project type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
              >
                <option value="Web Development">Web Development</option>
                <option value="SaaS Development">SaaS Development</option>
                <option value="Design & Branding">Design & Branding</option>
                <option value="API Integration">API Integration</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#c4943d] px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#b3832d]"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function CreateCustomOrderModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (client: string, brief: string, budget: number) => void
}) {
  const [client, setClient] = useState('')
  const [brief, setBrief] = useState('')
  const [budget, setBudget] = useState('25000')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!client.trim()) return
    onSubmit(client, brief, parseInt(budget) || 0)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <ShoppingBag size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Log Custom Order</h3>
              <p className="text-[11px] text-slate-500">Add bespoke development quotation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 text-xs text-slate-700">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700">Client Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Velora Interiors"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700">Project Brief</label>
            <textarea
              rows={3}
              placeholder="Scope of work, deliverables..."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700">Agreed Budget (₹)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#c4943d] px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#b3832d]"
            >
              Save Custom Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function TicketDetailsModal({
  ticket,
  isOpen,
  onClose,
  onUpdateStatus,
}: {
  ticket: SupportTicket | null
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (id: string, status: SupportTicket['status']) => void
}) {
  const [replyText, setReplyText] = useState('')
  if (!isOpen || !ticket) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-mono font-bold text-slate-800">
              {ticket.id}
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{ticket.subject}</h3>
              <p className="text-[11px] text-slate-500">
                {ticket.client} • {ticket.category}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 p-6 text-xs text-slate-700">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
            <div>
              <span className="text-[10px] font-semibold uppercase text-slate-400">Assigned To</span>
              <div className="mt-0.5 font-bold text-slate-900">{ticket.assignee}</div>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase text-slate-400">Priority</span>
              <div className="mt-0.5 font-bold text-slate-900">{ticket.priority}</div>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase text-slate-400">Status</span>
              <div className="relative mt-0.5">
                <select
                  aria-label="Change ticket status"
                  value={ticket.status}
                  onChange={(e) =>
                    onUpdateStatus(ticket.id, e.target.value as SupportTicket['status'])
                  }
                  className="rounded border border-slate-200 bg-white py-1 pl-2 pr-6 text-xs font-semibold text-slate-800"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Awaiting Internal">Awaiting Internal</option>
                  <option value="Awaiting Client">Awaiting Client</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 p-4">
            <h4 className="text-xs font-bold text-slate-900">Ticket Description</h4>
            <p className="mt-1 leading-relaxed text-slate-700">
              {ticket.description || 'No additional details provided.'}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-semibold text-slate-700">
              Send Reply to Client
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your response here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setReplyText('')
                  onClose()
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-[#c4943d] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#b3832d]"
              >
                <Send size={13} />
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#0f1b33] px-4 py-1.5 text-xs font-semibold text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
