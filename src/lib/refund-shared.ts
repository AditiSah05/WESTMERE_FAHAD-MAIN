export const REASONS = ['Product not as described', 'Technical issues', 'Duplicate purchase', 'Accidental purchase', 'Billing issue', 'Delivery issue', 'Subscription cancellation', 'Other'] as const
export const REQUEST_KINDS = ['Refund', 'Cancellation'] as const

/** Stored statuses. "Requested" is shown as Pending Review. */
export const STATUSES = ['Requested', 'Under Investigation', 'Approved', 'Processing', 'Refunded', 'Rejected', 'Failed'] as const
export type RequestStatus = (typeof STATUSES)[number]
export const statusLabel = (s: string) => (s === 'Requested' ? 'Pending Review' : s)
/** Statuses that still need someone to act. */
export const OPEN = ['Requested', 'Under Investigation', 'Approved', 'Processing', 'Failed']

/**
 * What the team can move a request to next. Money is returned by hand (bank or UPI), so Approved only means "yes";
 * Refunded is what records that the money went back. A cancellation of an unpaid order has no money to return.
 */
export function nextStatuses(status: string, orderPayment: string): RequestStatus[] {
  switch (status) {
    case 'Requested': return ['Under Investigation', 'Approved', 'Rejected']
    case 'Under Investigation': return ['Approved', 'Rejected']
    case 'Approved': return orderPayment === 'Paid' || orderPayment === 'Partially Refunded' ? ['Processing', 'Refunded', 'Failed'] : []
    case 'Processing': return ['Refunded', 'Failed']
    case 'Failed': return ['Processing', 'Refunded', 'Rejected']
    default: return []
  }
}

export const statusTone = (s: string) => ({ Requested: 'amber', 'Under Investigation': 'blue', Approved: 'navy', Processing: 'blue', Refunded: 'green', Rejected: 'red', Failed: 'red' } as const)[s as 'Requested'] ?? 'gray'
