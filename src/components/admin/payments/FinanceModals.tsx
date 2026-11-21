'use client'

import React, { useState } from 'react'
import { X, Check, DollarSign, Receipt, Plus } from 'lucide-react'
import { createInvoiceAction, addExpenseAction } from '@/app/admin/payment-actions'

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CreateInvoiceModal({ isOpen, onClose, onSuccess }: InvoiceModalProps) {
  const [customer, setCustomer] = useState('')
  const [product, setProduct] = useState('Website Development')
  const [amount, setAmount] = useState('')
  const [gateway, setGateway] = useState<'Razorpay' | 'Stripe'>('Razorpay')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData()
    fd.append('client', customer)
    fd.append('amount', amount)
    fd.append('dueDate', dueDate || new Date().toISOString())
    const res = await createInvoiceAction(fd)
    setLoading(false)
    if (res.success) {
      onSuccess?.()
      onClose()
    } else {
      setError(res.error || 'Failed to create invoice')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Create New Invoice</h3>
              <p className="text-xs text-slate-400">Issue a payment link and bill customer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 text-xs bg-rose-50 text-rose-600 rounded-lg border border-rose-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Customer Name / Business
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Aarav Mehta (TechStudio)"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Service / Product
            </label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
            >
              <option value="Website Development">Website Development</option>
              <option value="E-commerce Website">E-commerce Website</option>
              <option value="CRM Software (Annual)">CRM Software (Annual)</option>
              <option value="Mailora SaaS Subscription">Mailora SaaS Subscription</option>
              <option value="Custom Application Dev.">Custom Application Dev.</option>
              <option value="UI Templates & Assets">UI Templates & Assets</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Amount (INR ₹)
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="₹ 50,000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Gateway
              </label>
              <select
                value={gateway}
                onChange={(e) => setGateway(e.target.value as any)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
              >
                <option value="Razorpay">Razorpay</option>
                <option value="Stripe">Stripe</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              {loading ? 'Creating...' : '+ Generate Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface ExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function AddExpenseModal({ isOpen, onClose, onSuccess }: ExpenseModalProps) {
  const [category, setCategory] = useState('Salaries')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState<'Bank Transfer' | 'Card' | 'UPI'>('Bank Transfer')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData()
    fd.append('category', category)
    fd.append('title', title)
    fd.append('amount', amount)
    fd.append('date', date || new Date().toISOString().split('T')[0])
    const res = await addExpenseAction(fd)
    setLoading(false)
    if (res.success) {
      onSuccess?.()
      onClose()
    } else {
      setError(res.error || 'Failed to add expense')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Add Business Expense</h3>
              <p className="text-xs text-slate-400">Record an operational or software expense</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 text-xs bg-rose-50 text-rose-600 rounded-lg border border-rose-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Expense Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
            >
              <option value="Salaries">Salaries & Contractor Payroll</option>
              <option value="Marketing & Ads">Marketing & Ad Campaigns (Meta/Google)</option>
              <option value="Software & Tools">Software, SaaS & Subscriptions</option>
              <option value="Hosting & Servers">Hosting, AWS, Vercel & Infrastructure</option>
              <option value="Operations">Operations & Office Expenses</option>
              <option value="Others">Others / Miscellaneous</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Title / Vendor Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AWS Cloud Server Bill - Oct 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Amount (INR ₹)
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="₹ 24,500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
              >
                <option value="Bank Transfer">Bank Transfer / NEFT</option>
                <option value="Card">Corporate Credit Card</option>
                <option value="UPI">UPI / Net Banking</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Expense Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              {loading ? 'Adding...' : '+ Record Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
