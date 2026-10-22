import { c, f, select, tab, type ModuleConfig } from './helpers'

const integ = (key: string, label: string, items: Record<string, string>[]) =>
  tab({ key, label, addLabel: 'Connect', columns: [c('name', 'Service'), c('detail', 'Details'), c('status', 'Status', 'status')], fields: [f('name', 'Service'), f('detail', 'Details'), select('status', 'Status', ['Connected', 'Disabled'])], rows: items })

export const integrations: ModuleConfig = {
  title: 'Integrations',
  subtitle: 'Connect payments, email, analytics and webhooks.',
  tabs: [
    integ('gateways', 'Payment gateways', [{ name: 'Razorpay', detail: 'Live keys set', status: 'Connected' }, { name: 'Stripe', detail: 'Live keys set', status: 'Connected' }]),
    integ('email', 'Email provider', [{ name: 'Resend', detail: 'Domain verified', status: 'Connected' }]),
    integ('analytics', 'Analytics', [{ name: 'Google Analytics 4', detail: 'G-XXXXXXX', status: 'Connected' }, { name: 'Search Console', detail: 'Property verified', status: 'Connected' }]),
    integ('webhooks', 'Webhooks', [{ name: 'order.paid', detail: 'https://hooks.example/orders', status: 'Connected' }, { name: 'license.expired', detail: 'https://hooks.example/licences', status: 'Disabled' }]),
    tab({ key: 'keys', label: 'API keys', addLabel: 'Create key', columns: [c('name', 'Name'), c('prefix', 'Key', 'mono'), c('created', 'Created', 'date'), c('status', 'Status', 'status')], fields: [f('name', 'Name'), select('status', 'Status', ['Active', 'Revoked'])], rows: [{ name: 'Storefront', prefix: 'wm_live_8f3a…', created: '2026-08-01', status: 'Active' }, { name: 'Zapier', prefix: 'wm_live_21bc…', created: '2026-09-14', status: 'Active' }] }),
    integ('third', 'Third-party services', [{ name: 'Web3Forms', detail: 'Contact form', status: 'Connected' }, { name: 'Cal.com', detail: 'Booking links', status: 'Connected' }]),
  ],
}
