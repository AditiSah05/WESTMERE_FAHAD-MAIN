import { c, tab, type ModuleConfig } from '@/lib/admin/data/helpers'

// Payment status and fulfilment status are tracked separately; failed payments are kept, never deleted.
const orderRows = [
  { orderId: '#WM-1049', product: 'Mailora Chrome Extension', amount: 499, paymentStatus: 'Paid', fulfilment: 'Delivered', method: 'UPI', date: '2026-10-22' },
  { orderId: '#WM-1046', product: 'Workflow Automation Pack', amount: 1499, paymentStatus: 'Failed', fulfilment: 'Awaiting Payment', method: 'Card', date: '2026-10-21' },
  { orderId: '#WM-1043', product: 'Agency Starter Website', amount: 1999, paymentStatus: 'Paid', fulfilment: 'Ready for Delivery', method: 'Card', date: '2026-10-17' },
  { orderId: '#WM-1038', product: 'SEO Dashboard App', amount: 1999, paymentStatus: 'Partially Refunded', fulfilment: 'On Hold', method: 'Net banking', date: '2026-10-09' },
  { orderId: '#WM-1031', product: 'E-commerce Storefront Kit', amount: 2000, paymentStatus: 'Refunded', fulfilment: 'Cancelled', method: 'UPI', date: '2026-09-28' },
]
const cols = [c('orderId', 'Order', 'mono'), c('product', 'Product'), c('amount', 'Paid', 'money', 'right'), c('paymentStatus', 'Payment', 'status'), c('fulfilment', 'Delivery', 'status'), c('method', 'Method'), c('date', 'Date', 'date')]

export const orders: ModuleConfig = {
  title: 'My Orders',
  subtitle: 'Payment and delivery are tracked separately. Failed payments stay on record.',
  tabs: [
    tab({ key: 'all', label: 'All orders', columns: cols, rows: orderRows }),
    tab({ key: 'pending', label: 'Awaiting payment', columns: cols, rows: orderRows, filter: { key: 'fulfilment', value: 'Awaiting Payment' } }),
    tab({ key: 'delivered', label: 'Delivered', columns: cols, rows: orderRows, filter: { key: 'fulfilment', value: 'Delivered' } }),
    tab({ key: 'refunds', label: 'Cancellations & refunds', columns: [c('orderId', 'Order', 'mono'), c('product', 'Product'), c('type', 'Request'), c('status', 'Status', 'status'), c('date', 'Requested', 'date')], rows: [{ orderId: '#WM-1038', product: 'SEO Dashboard App', type: 'Partial refund', status: 'Approved', date: '2026-10-11' }, { orderId: '#WM-1031', product: 'E-commerce Storefront Kit', type: 'Cancellation', status: 'Completed', date: '2026-09-29' }] }),
  ],
}

export const myProducts: ModuleConfig = {
  title: 'My Products',
  subtitle: 'Websites, applications and software you own.',
  tabs: [
    tab({ key: 'owned', label: 'Purchased', columns: [c('name', 'Product'), c('type', 'Type'), c('version', 'Version', 'mono'), c('access', 'Access', 'status'), c('update', 'Update')], rows: [{ name: 'Mailora Chrome Extension', type: 'Software', version: '2.4.1', access: 'Active', update: 'Up to date' }, { name: 'Agency Starter Website', type: 'Website', version: '1.8.0', access: 'Active', update: '1.9.0 available' }, { name: 'SEO Dashboard App', type: 'Hosted app', version: '3.2.0', access: 'Suspended', update: 'Up to date' }] }),
    tab({ key: 'docs', label: 'Documentation', columns: [c('name', 'Guide'), c('product', 'Product'), c('updated', 'Updated', 'date')], rows: [{ name: 'Installation guide', product: 'Agency Starter Website', updated: '2026-10-02' }, { name: 'User manual', product: 'SEO Dashboard App', updated: '2026-09-18' }] }),
  ],
}

export const downloads: ModuleConfig = {
  title: 'Downloads & Files',
  subtitle: 'Only products with a paid, delivered order are available here.',
  tabs: [
    tab({ key: 'files', label: 'Files', columns: [c('file', 'File', 'mono'), c('product', 'Product'), c('version', 'Version', 'mono'), c('size', 'Size'), c('status', 'Status', 'status')], rows: [{ file: 'mailora-2.4.1.zip', product: 'Mailora Chrome Extension', version: '2.4.1', size: '4.2 MB', status: 'Ready' }, { file: 'agency-starter-1.8.0.zip', product: 'Agency Starter Website', version: '1.8.0', size: '38 MB', status: 'Ready' }] }),
    tab({ key: 'history', label: 'Download history', columns: [c('file', 'File', 'mono'), c('date', 'Date', 'date'), c('device', 'Device')], rows: [{ file: 'mailora-2.4.1.zip', date: '2026-10-22', device: 'Chrome · macOS' }] }),
    tab({ key: 'notes', label: 'Release notes', columns: [c('product', 'Product'), c('version', 'Version', 'mono'), c('notes', 'Highlights'), c('date', 'Released', 'date')], rows: [{ product: 'Agency Starter Website', version: '1.9.0', notes: 'New pricing section, faster images', date: '2026-10-15' }] }),
  ],
}

export const licenses: ModuleConfig = {
  title: 'My Licenses',
  subtitle: 'Keys, activations and renewals.',
  tabs: [tab({ key: 'keys', label: 'Licenses', columns: [c('key', 'License key', 'mono'), c('product', 'Product'), c('type', 'Type'), c('status', 'Status', 'status'), c('seats', 'Activations'), c('expires', 'Expires', 'date')], rows: [{ key: 'WM-MAIL-8F2K-91QZ', product: 'Mailora Chrome Extension', type: 'Single user', status: 'Active', seats: '1 / 1', expires: '2027-10-22' }, { key: 'WM-AGNC-3D7P-20LM', product: 'Agency Starter Website', type: 'Extended', status: 'Active', seats: '2 / 5', expires: '2027-10-17' }, { key: 'WM-SEOD-6C1X-77AB', product: 'SEO Dashboard App', type: 'Subscription', status: 'Expired', seats: '0 / 3', expires: '2026-09-30' }] })],
}
