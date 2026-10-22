import { c, f, select, tab, type ModuleConfig } from './helpers'

const subRows = [{ customer: 'Studio North', plan: 'Mailora Team', status: 'Active', renews: '2026-11-18', amount: 1499 }, { customer: 'Aarav Mehta', plan: 'Hosted SEO Dashboard', status: 'Active', renews: '2026-11-02', amount: 999 }, { customer: 'Rohan Iyer', plan: 'Support Plus', status: 'Failed', renews: '2026-10-25', amount: 2499 }, { customer: 'Kabir Anand', plan: 'Mailora Team', status: 'Cancelled', renews: '2026-10-30', amount: 1499 }]
const subCols = [c('customer', 'Customer'), c('plan', 'Plan'), c('status', 'Status', 'status'), c('renews', 'Renews / ends', 'date'), c('amount', 'Amount', 'money', 'right')]

export const payments: ModuleConfig = {
  title: 'Payments & Finance',
  subtitle: 'Transactions, refunds, reports, invoices and reconciliation.',
  tabs: [
    tab({
      key: 'transactions', label: 'Transactions',
      columns: [c('txn', 'Transaction', 'mono'), c('orderId', 'Order', 'mono'), c('gateway', 'Gateway'), c('amount', 'Amount', 'money', 'right'), c('status', 'Status', 'status'), c('date', 'Date', 'date')],
      rows: [
        { txn: 'pay_8Kq1', orderId: '#WM-1049', gateway: 'Razorpay', amount: 499, status: 'Success', date: '2026-10-22' },
        { txn: 'pay_8Kq0', orderId: '#WM-1048', gateway: 'Stripe', amount: 1999, status: 'Success', date: '2026-10-22' },
        { txn: 'pay_8Jz9', orderId: '#WM-1046', gateway: 'Razorpay', amount: 1499, status: 'Failed', date: '2026-10-21' },
        { txn: 'pay_8Jx2', orderId: '#WM-1047', gateway: 'Razorpay', amount: 1999, status: 'Pending', date: '2026-10-21' },
      ],
    }),
    tab({
      key: 'gateways', label: 'Payment gateways', addLabel: 'Add gateway',
      columns: [c('name', 'Gateway'), c('mode', 'Mode', 'tag'), c('fee', 'Fee'), c('status', 'Status', 'status')],
      fields: [f('name', 'Gateway'), select('mode', 'Mode', ['Live', 'Test']), f('fee', 'Fee'), select('status', 'Status', ['Connected', 'Disabled'])],
      rows: [{ name: 'Razorpay', mode: 'Live', fee: '2% + GST', status: 'Connected' }, { name: 'Stripe', mode: 'Live', fee: '2.9% + ₹2', status: 'Connected' }, { name: 'PayPal', mode: 'Test', fee: '4.4%', status: 'Disabled' }],
    }),
    tab({
      key: 'refunds', label: 'Refunds', addLabel: 'Issue refund',
      columns: [c('orderId', 'Order', 'mono'), c('customer', 'Customer'), c('amount', 'Amount', 'money', 'right'), c('reason', 'Reason'), c('status', 'Status', 'status')],
      fields: [f('orderId', 'Order'), f('customer', 'Customer'), f('amount', 'Amount (₹)', 'number'), f('reason', 'Reason', 'textarea'), select('status', 'Status', ['Pending', 'Approved', 'Rejected', 'Refunded'])],
      rows: [{ orderId: '#WM-1044', customer: 'Kabir Anand', amount: 499, reason: 'Duplicate purchase', status: 'Refunded' }, { orderId: '#WM-1045', customer: 'Meera Shah', amount: 5000, reason: 'Scope reduced', status: 'Approved' }],
    }),
    tab({
      key: 'revenue', label: 'Revenue reports',
      columns: [c('period', 'Period'), c('gross', 'Gross', 'money', 'right'), c('refunds', 'Refunds', 'money', 'right'), c('net', 'Net', 'money', 'right')],
      rows: [{ period: 'Oct 2026', gross: 421000, refunds: 12400, net: 408600 }, { period: 'Sep 2026', gross: 398000, refunds: 9800, net: 388200 }, { period: 'Aug 2026', gross: 362000, refunds: 7100, net: 354900 }],
    }),
    tab({
      key: 'expenses', label: 'Expenses', addLabel: 'Add expense',
      columns: [c('item', 'Expense'), c('category', 'Category', 'tag'), c('amount', 'Amount', 'money', 'right'), c('date', 'Date', 'date')],
      fields: [f('item', 'Expense'), select('category', 'Category', ['Hosting', 'Tools', 'Marketing', 'Payroll', 'Other']), f('amount', 'Amount (₹)', 'number'), f('date', 'Date', 'date')],
      rows: [{ item: 'Vercel + storage', category: 'Hosting', amount: 8200, date: '2026-10-01' }, { item: 'Google Ads', category: 'Marketing', amount: 24000, date: '2026-10-05' }, { item: 'Design tools', category: 'Tools', amount: 5600, date: '2026-10-08' }],
    }),
    tab({
      key: 'invoices', label: 'Invoices',
      columns: [c('invoice', 'Invoice', 'mono'), c('customer', 'Customer'), c('amount', 'Amount', 'money', 'right'), c('status', 'Status', 'status'), c('date', 'Date', 'date')],
      rows: [{ invoice: 'INV-2026-0412', customer: 'Aarav Mehta', amount: 499, status: 'Paid', date: '2026-10-22' }, { invoice: 'INV-2026-0411', customer: 'Studio North', amount: 1999, status: 'Overdue', date: '2026-10-10' }],
    }),
    tab({
      key: 'tax', label: 'Tax reports',
      columns: [c('period', 'Period'), c('taxable', 'Taxable value', 'money', 'right'), c('gst', 'GST collected', 'money', 'right'), c('status', 'Filing', 'status')],
      rows: [{ period: 'Sep 2026', taxable: 388200, gst: 69876, status: 'Completed' }, { period: 'Oct 2026', taxable: 408600, gst: 73548, status: 'Pending' }],
    }),
    tab({
      key: 'reconciliation', label: 'Reconciliation',
      columns: [c('gateway', 'Gateway'), c('system', 'System total', 'money', 'right'), c('settled', 'Settled', 'money', 'right'), c('status', 'Status', 'status')],
      rows: [{ gateway: 'Razorpay', system: 232400, settled: 232400, status: 'Reconciled' }, { gateway: 'Stripe', system: 176200, settled: 174200, status: 'Unreconciled' }],
    }),
  ],
}

export const subscriptions: ModuleConfig = {
  title: 'Subscriptions',
  subtitle: 'Plans, renewals and recurring revenue.',
  stats: [{ label: 'MRR', value: '₹1.86L' }, { label: 'Active subscribers', value: '214' }, { label: 'Churn (30d)', value: '2.1%' }],
  tabs: [
    tab({
      key: 'plans', label: 'Plans', addLabel: 'Add plan',
      columns: [c('name', 'Plan'), c('price', 'Price', 'money', 'right'), c('interval', 'Interval', 'tag'), c('subscribers', 'Subscribers', undefined, 'right')],
      fields: [f('name', 'Plan name'), f('price', 'Price (₹)', 'number'), select('interval', 'Interval', ['Monthly', 'Yearly']), f('subscribers', 'Subscribers', 'number', { readOnly: true })],
      rows: [{ name: 'Mailora Team', price: 1499, interval: 'Yearly', subscribers: 98 }, { name: 'Hosted SEO Dashboard', price: 999, interval: 'Monthly', subscribers: 76 }, { name: 'Support Plus', price: 2499, interval: 'Monthly', subscribers: 40 }],
    }),
    tab({
      key: 'active', label: 'Active', source: 'subs',
      columns: subCols,
      filter: { key: 'status', value: 'Active' },
      rows: subRows,
    }),
    tab({ key: 'renewals', label: 'Renewals', source: 'subs', columns: subCols, rows: subRows }),
    tab({ key: 'failed', label: 'Failed renewals', source: 'subs', columns: subCols, filter: { key: 'status', value: 'Failed' }, rows: subRows }),
    tab({ key: 'cancellations', label: 'Cancellations', source: 'subs', columns: subCols, filter: { key: 'status', value: 'Cancelled' }, rows: subRows }),
    tab({ key: 'upgrades', label: 'Upgrades', columns: [c('customer', 'Customer'), c('from', 'From'), c('to', 'To'), c('date', 'Date', 'date')], rows: [{ customer: 'Meera Shah', from: 'Support Plus', to: 'Mailora Team', date: '2026-10-12' }, { customer: 'Isha Verma', from: 'Hosted SEO Dashboard', to: 'Support Plus', date: '2026-10-03' }] }),
  ],
}

export const coupons: ModuleConfig = {
  title: 'Coupons & Promotions',
  subtitle: 'Discounts, campaigns, referrals and cart recovery.',
  tabs: [
    tab({
      key: 'coupons', label: 'Coupons', addLabel: 'Create coupon',
      columns: [c('code', 'Code', 'mono'), c('discount', 'Discount'), c('used', 'Used', undefined, 'right'), c('limit', 'Limit', undefined, 'right'), c('expires', 'Expires', 'date'), c('status', 'Status', 'status')],
      fields: [f('code', 'Code', 'text', { required: true }), f('discount', 'Discount (e.g. 20% or ₹200)'), f('limit', 'Usage limit', 'number'), f('expires', 'Expires', 'date'), select('status', 'Status', ['Active', 'Scheduled', 'Expired', 'Disabled'])],
      rows: [{ code: 'LAUNCH20', discount: '20%', used: 100, limit: 100, expires: '2026-10-31', status: 'Expired' }, { code: 'DIWALI25', discount: '25%', used: 41, limit: 500, expires: '2026-11-15', status: 'Active' }, { code: 'WELCOME200', discount: '₹200', used: 233, limit: 1000, expires: '2026-12-31', status: 'Active' }],
    }),
    tab({ key: 'rules', label: 'Discount rules', addLabel: 'Add rule', columns: [c('name', 'Rule'), c('condition', 'Condition'), c('effect', 'Effect'), c('status', 'Status', 'status')], fields: [f('name', 'Rule'), f('condition', 'Condition'), f('effect', 'Effect'), select('status', 'Status', ['Active', 'Disabled'])], rows: [{ name: 'Bundle saver', condition: '2+ products in cart', effect: '10% off', status: 'Active' }, { name: 'First order', condition: 'New customer', effect: '₹200 off', status: 'Active' }] }),
    tab({ key: 'limits', label: 'Usage limits', columns: [c('code', 'Code', 'mono'), c('perCustomer', 'Per customer', undefined, 'right'), c('total', 'Total', undefined, 'right'), c('minCart', 'Min cart', 'money', 'right')], rows: [{ code: 'DIWALI25', perCustomer: 1, total: 500, minCart: 999 }, { code: 'WELCOME200', perCustomer: 1, total: 1000, minCart: 499 }] }),
    tab({ key: 'campaigns', label: 'Campaigns', addLabel: 'New campaign', columns: [c('name', 'Campaign'), c('channel', 'Channel', 'tag'), c('start', 'Start', 'date'), c('status', 'Status', 'status')], fields: [f('name', 'Campaign'), select('channel', 'Channel', ['Email', 'Social', 'Ads']), f('start', 'Start', 'date'), select('status', 'Status', ['Draft', 'Scheduled', 'Live'])], rows: [{ name: 'Diwali sale', channel: 'Email', start: '2026-11-01', status: 'Scheduled' }, { name: 'Launch week', channel: 'Social', start: '2026-10-10', status: 'Live' }] }),
    tab({ key: 'referrals', label: 'Referral codes', addLabel: 'Add code', columns: [c('code', 'Code', 'mono'), c('owner', 'Owner'), c('referrals', 'Referrals', undefined, 'right'), c('reward', 'Reward')], fields: [f('code', 'Code'), f('owner', 'Owner'), f('reward', 'Reward')], rows: [{ code: 'AARAV-10', owner: 'Aarav Mehta', referrals: 6, reward: '₹100 credit' }, { code: 'NORTH-STUDIO', owner: 'Studio North', referrals: 11, reward: '₹100 credit' }] }),
    tab({ key: 'carts', label: 'Abandoned carts', columns: [c('customer', 'Customer'), c('items', 'Items'), c('value', 'Cart value', 'money', 'right'), c('reminder', 'Reminder', 'status')], rows: [{ customer: 'zoya@example.com', items: 'Agency Starter Website', value: 1999, reminder: 'Sent' }, { customer: 'dev@example.com', items: '2 items', value: 3499, reminder: 'Scheduled' }] }),
  ],
}
