import type { Cell, Tone } from './types'

export const money = (v: Cell) => `₹${Number(v).toLocaleString('en-IN')}`

export const shortDate = (v: Cell) => {
  const d = new Date(String(v))
  return Number.isNaN(d.getTime()) ? String(v) : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

const good = ['paid', 'active', 'published', 'delivered', 'approved', 'connected', 'success', 'verified', 'resolved', 'completed', 'live', 'sent', 'enabled', 'reconciled', 'in progress']
const warn = ['pending', 'processing', 'draft', 'on hold', 'review', 'ready for delivery', 'awaiting payment', 'scheduled', 'trial', 'open', 'partially refunded', 'unreconciled', 'invited']
const bad = ['failed', 'cancelled', 'refunded', 'revoked', 'expired', 'rejected', 'suspended', 'reported', 'overdue', 'disabled', 'archived', 'blocked', 'bounced']

export const toneFor = (v: Cell): Tone => {
  const s = String(v).toLowerCase()
  if (good.includes(s)) return 'green'
  if (warn.includes(s)) return 'amber'
  if (bad.includes(s)) return 'red'
  if (['featured', 'high', 'premium', 'admin'].includes(s)) return 'blue'
  return 'gray'
}

export const label = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
