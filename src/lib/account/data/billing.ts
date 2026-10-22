import { c, tab, type ModuleConfig } from '@/lib/admin/data/helpers'

export const payments: ModuleConfig = {
  title: 'Payments & Billing',
  subtitle: 'Transactions, invoices and refunds.',
  tabs: [
    tab({ key: 'history', label: 'Payment history', columns: [c('txn', 'Transaction', 'mono'), c('order', 'Order', 'mono'), c('amount', 'Amount', 'money', 'right'), c('status', 'Status', 'status'), c('method', 'Method'), c('date', 'Date', 'date')], rows: [{ txn: 'pay_8Kd2Lx', order: '#WM-1049', amount: 499, status: 'Paid', method: 'UPI', date: '2026-10-22' }, { txn: 'pay_7Hq9Zt', order: '#WM-1046', amount: 1499, status: 'Failed', method: 'Card', date: '2026-10-21' }, { txn: 'pay_6Fp3Ya', order: '#WM-1038', amount: 1999, status: 'Partially Refunded', method: 'Net banking', date: '2026-10-09' }] }),
    tab({ key: 'invoices', label: 'Invoices', columns: [c('invoice', 'Invoice', 'mono'), c('order', 'Order', 'mono'), c('amount', 'Amount', 'money', 'right'), c('date', 'Date', 'date')], rows: [{ invoice: 'INV-2026-0412', order: '#WM-1049', amount: 499, date: '2026-10-22' }, { invoice: 'INV-2026-0398', order: '#WM-1043', amount: 1999, date: '2026-10-17' }] }),
    tab({ key: 'refunds', label: 'Refunds', columns: [c('order', 'Order', 'mono'), c('amount', 'Amount', 'money', 'right'), c('status', 'Status', 'status'), c('date', 'Date', 'date')], rows: [{ order: '#WM-1038', amount: 500, status: 'Refunded', date: '2026-10-12' }] }),
  ],
}

export const subscriptions: ModuleConfig = {
  title: 'My Subscriptions',
  subtitle: 'Plans, renewals and payment methods.',
  tabs: [
    tab({ key: 'plans', label: 'Active plans', columns: [c('plan', 'Plan'), c('product', 'Product'), c('price', 'Price / month', 'money', 'right'), c('status', 'Status', 'status'), c('next', 'Next billing', 'date')], rows: [{ plan: 'Pro', product: 'SEO Dashboard App', price: 799, status: 'Past due', next: '2026-10-30' }, { plan: 'Starter', product: 'Workflow Automation Pack', price: 299, status: 'Active', next: '2026-11-04' }] }),
    tab({ key: 'renewals', label: 'Renewal history', columns: [c('plan', 'Plan'), c('amount', 'Amount', 'money', 'right'), c('date', 'Date', 'date'), c('status', 'Status', 'status')], rows: [{ plan: 'Starter', amount: 299, date: '2026-10-04', status: 'Paid' }, { plan: 'Pro', amount: 799, date: '2026-09-30', status: 'Paid' }] }),
  ],
}

export const coupons: ModuleConfig = {
  title: 'Coupons & Offers',
  subtitle: 'Discounts you can use on your next order.',
  tabs: [tab({ key: 'available', label: 'Available', columns: [c('code', 'Code', 'mono'), c('offer', 'Offer'), c('applies', 'Applies to'), c('status', 'Status', 'status'), c('expires', 'Expires', 'date')], rows: [{ code: 'WELCOME10', offer: '10% off first order', applies: 'All products', status: 'Active', expires: '2026-12-31' }, { code: 'RENEW15', offer: '15% off renewals', applies: 'Subscriptions', status: 'Active', expires: '2026-11-30' }, { code: 'DIWALI25', offer: '25% off websites', applies: 'Websites', status: 'Expired', expires: '2026-10-20' }] })],
}

export const profileDetails = {
  profile: { title: 'My Profile', subtitle: 'Your personal details, sign-in and sessions.', groups: [{ heading: 'Personal', items: [['Mobile number', '+91 98xxx xxxxx'], ['Company', '—']] }, { heading: 'Security', items: [['Password', 'Last changed 12 days ago'], ['Two-factor authentication', 'Not enabled'], ['Active sessions', '1 (this device)']] }] },
  company: { title: 'Billing & Company Details', subtitle: 'Used on your invoices.', groups: [{ heading: 'Billing address', items: [['Address', '—'], ['Country', 'India'], ['State', '—'], ['Postal code', '—']] }, { heading: 'Company', items: [['Company name', '—'], ['GSTIN', 'Not provided']] }] },
  settings: { title: 'Account Settings', subtitle: 'Preferences, privacy and your data.', groups: [{ heading: 'Preferences', items: [['Email preferences', 'Order and billing emails'], ['Notification preferences', 'Email'], ['Marketing consent', 'Not subscribed']] }, { heading: 'Privacy & data', items: [['Data export', 'Available on request'], ['Account deletion', 'Request via support']] }] },
}
