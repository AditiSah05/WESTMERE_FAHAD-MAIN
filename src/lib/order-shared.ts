export const PAYMENT = ['Pending', 'Paid', 'Failed', 'Partially Refunded', 'Refunded'] as const
export const FULFILMENT = ['Awaiting Payment', 'Processing', 'Ready for Delivery', 'Delivered', 'On Hold', 'Cancelled'] as const
export const METHODS = ['UPI', 'Bank transfer', 'Cash', 'Card', 'Other'] as const
export type Overall = 'Completed' | 'Processing' | 'Pending' | 'Cancelled' | 'Refunded' | 'Failed'

/** One status for the whole order, from the two real ones (payment and delivery). */
export function overall(payment: string, fulfilment: string): Overall {
  if (payment === 'Failed') return 'Failed'
  if (payment === 'Refunded') return 'Refunded'
  if (fulfilment === 'Cancelled') return 'Cancelled'
  if (payment === 'Pending') return 'Pending'
  return fulfilment === 'Delivered' ? 'Completed' : 'Processing'
}

export const typeOf = (kind: string, pricing: string) => (pricing === 'Subscription' ? 'Subscription' : kind === 'website' ? 'Website' : kind === 'service' ? 'Development service' : 'Software / app')
