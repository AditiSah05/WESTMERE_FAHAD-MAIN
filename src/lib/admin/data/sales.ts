import { c, f, select, tab, type ModuleConfig } from './helpers'
import type { TabConfig } from '../types'

// Payment status and fulfilment status are tracked separately, as in the order spec.
const orderRows = [
  { orderId: '#WM-1049', customer: 'Aarav Mehta', product: 'Mailora Chrome Extension', amount: 499, paymentStatus: 'Paid', fulfilment: 'Delivered', method: 'UPI', date: '2026-10-22' },
  { orderId: '#WM-1048', customer: 'Zoya Khan', product: 'Agency Starter Website', amount: 1999, paymentStatus: 'Paid', fulfilment: 'Processing', method: 'Card', date: '2026-10-22' },
  { orderId: '#WM-1047', customer: 'Studio North', product: 'SEO Dashboard App', amount: 1999, paymentStatus: 'Pending', fulfilment: 'Awaiting Payment', method: 'Net banking', date: '2026-10-21' },
  { orderId: '#WM-1046', customer: 'Rohan Iyer', product: 'Workflow Automation Pack', amount: 1499, paymentStatus: 'Failed', fulfilment: 'Awaiting Payment', method: 'Card', date: '2026-10-21' },
  { orderId: '#WM-1045', customer: 'Meera Shah', product: 'Custom Website Build', amount: 25000, paymentStatus: 'Partially Refunded', fulfilment: 'On Hold', method: 'Bank transfer', date: '2026-10-19' },
  { orderId: '#WM-1044', customer: 'Kabir Anand', product: 'Mailora Chrome Extension', amount: 499, paymentStatus: 'Refunded', fulfilment: 'Cancelled', method: 'UPI', date: '2026-10-18' },
  { orderId: '#WM-1043', customer: 'Nisha Rao', product: 'Agency Starter Website', amount: 1999, paymentStatus: 'Paid', fulfilment: 'Ready for Delivery', method: 'Card', date: '2026-10-17' },
  { orderId: '#WM-1042', customer: 'Dev Patel', product: 'E-commerce Storefront Kit', amount: 2000, paymentStatus: 'Paid', fulfilment: 'Ready for Delivery', method: 'UPI', date: '2026-10-16' },
  { orderId: '#WM-1041', customer: 'Isha Verma', product: 'SEO Dashboard App', amount: 1999, paymentStatus: 'Paid', fulfilment: 'Delivered', method: 'UPI', date: '2026-10-15' },
]
const customerRows = [
  { name: 'Aarav Mehta', email: 'aarav@example.com', phone: '+91 98765 43210', segment: 'VIP', orders: 7, spent: 9890, status: 'Active', joined: '2025-11-02' },
  { name: 'Zoya Khan', email: 'zoya@example.com', phone: '+91 98220 11002', segment: 'New', orders: 1, spent: 1999, status: 'Active', joined: '2026-10-22' },
  { name: 'Studio North', email: 'hello@studionorth.example', phone: '+91 99600 33004', segment: 'VIP', orders: 12, spent: 41200, status: 'Active', joined: '2025-06-18' },
  { name: 'Rohan Iyer', email: 'rohan@example.com', phone: '+91 98900 55006', segment: 'At risk', orders: 2, spent: 998, status: 'Active', joined: '2026-02-11' },
  { name: 'Meera Shah', email: 'meera@example.com', phone: '+91 97300 77008', segment: 'VIP', orders: 3, spent: 27998, status: 'Active', joined: '2026-03-30' },
  { name: 'Kabir Anand', email: 'kabir@example.com', phone: '+91 98100 99010', segment: 'At risk', orders: 1, spent: 0, status: 'Suspended', joined: '2026-09-04' },
]
const custCols = [c('name', 'Customer'), c('email', 'Email'), c('phone', 'Phone'), c('segment', 'Segment', 'tag'), c('orders', 'Orders', undefined, 'right'), c('spent', 'Total spent', 'money', 'right'), c('status', 'Account', 'status')]
const custFields = [f('name', 'Name'), f('email', 'Email'), f('phone', 'Phone'), select('segment', 'Segment', ['VIP', 'New', 'At risk', 'Regular']), select('status', 'Account status', ['Active', 'Suspended', 'Blocked'])]
const segment = (key: string, label: string, value: string): TabConfig =>
  tab({ key, label, source: 'all', columns: custCols, rows: customerRows, fields: custFields, filter: { key: 'segment', value } })

export const customers: ModuleConfig = {
  title: 'Customers / CRM',
  subtitle: 'Profiles, purchase history, segments and notes.',
  tabs: [
    tab({ key: 'all', label: 'All customers', source: 'all', columns: custCols, rows: customerRows, fields: custFields, addLabel: 'Add customer' }),
    segment('vip', 'VIP', 'VIP'), segment('new', 'New', 'New'), segment('risk', 'At risk', 'At risk'),
    tab({
      key: 'history', label: 'Purchase history',
      columns: [c('customer', 'Customer'), c('orderId', 'Order', 'mono'), c('product', 'Product'), c('amount', 'Amount', 'money', 'right'), c('date', 'Date', 'date')],
      rows: orderRows.slice(0, 7).map((o) => ({ customer: o.customer, orderId: o.orderId, product: o.product, amount: o.amount, date: o.date })),
    }),
    tab({
      key: 'notes', label: 'Notes', addLabel: 'Add note',
      columns: [c('customer', 'Customer'), c('note', 'Note'), c('author', 'By'), c('date', 'Date', 'date')],
      fields: [f('customer', 'Customer'), f('note', 'Note', 'textarea'), f('author', 'Author')],
      rows: [
        { customer: 'Studio North', note: 'Wants enterprise licence quote', author: 'Priya', date: '2026-10-20' },
        { customer: 'Rohan Iyer', note: 'Card failed twice; offer UPI link', author: 'Aman', date: '2026-10-21' },
        { customer: 'Meera Shah', note: 'Custom project, weekly call Thursdays', author: 'Priya', date: '2026-10-19' },
      ],
    }),
  ],
}
