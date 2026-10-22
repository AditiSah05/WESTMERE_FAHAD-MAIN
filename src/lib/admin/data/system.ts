import { c, f, select, tab, type ModuleConfig } from './helpers'

export const team: ModuleConfig = {
  title: 'Team & Permissions',
  subtitle: 'Admin users, roles, access and audit trail.',
  tabs: [
    tab({
      key: 'users', label: 'Admin users', addLabel: 'Invite user',
      columns: [c('name', 'Name'), c('email', 'Email'), c('role', 'Role', 'tag'), c('status', 'Status', 'status'), c('lastLogin', 'Last login', 'date')],
      fields: [f('name', 'Name'), f('email', 'Email'), select('role', 'Role', ['Owner', 'Admin', 'Editor', 'Support', 'Finance']), select('status', 'Status', ['Active', 'Invited', 'Suspended'])],
      rows: [{ name: 'Fahad', email: 'fahad@westmere.io', role: 'Owner', status: 'Active', lastLogin: '2026-10-23' }, { name: 'Priya', email: 'priya@westmere.io', role: 'Editor', status: 'Active', lastLogin: '2026-10-22' }, { name: 'Aman', email: 'aman@westmere.io', role: 'Support', status: 'Active', lastLogin: '2026-10-22' }, { name: 'Neha', email: 'neha@westmere.io', role: 'Finance', status: 'Invited', lastLogin: '' }],
    }),
    tab({ key: 'roles', label: 'Roles', columns: [c('role', 'Role', 'tag'), c('members', 'Members', undefined, 'right'), c('scope', 'Scope')], rows: [{ role: 'Owner', members: 1, scope: 'Everything, including billing and team' }, { role: 'Editor', members: 1, scope: 'Products, CMS, reviews' }, { role: 'Support', members: 1, scope: 'Tickets, orders (read), customers (read)' }, { role: 'Finance', members: 1, scope: 'Payments, invoices, reports' }] }),
    tab({ key: 'permissions', label: 'Permissions', columns: [c('area', 'Area'), c('owner', 'Owner', 'bool'), c('editor', 'Editor', 'bool'), c('support', 'Support', 'bool'), c('finance', 'Finance', 'bool')], rows: [{ area: 'Products', owner: true, editor: true, support: false, finance: false }, { area: 'Orders', owner: true, editor: false, support: true, finance: true }, { area: 'Payments', owner: true, editor: false, support: false, finance: true }, { area: 'Team & settings', owner: true, editor: false, support: false, finance: false }] }),
    tab({ key: 'invites', label: 'Invitations', columns: [c('email', 'Email'), c('role', 'Role', 'tag'), c('sent', 'Sent', 'date'), c('status', 'Status', 'status')], rows: [{ email: 'neha@westmere.io', role: 'Finance', sent: '2026-10-21', status: 'Invited' }] }),
    tab({ key: 'logins', label: 'Login history', columns: [c('user', 'User'), c('ip', 'IP', 'mono'), c('device', 'Device'), c('date', 'Date', 'date'), c('result', 'Result', 'status')], rows: [{ user: 'Fahad', ip: '103.21.58.12', device: 'Chrome · macOS', date: '2026-10-23', result: 'Success' }, { user: 'Aman', ip: '49.36.11.84', device: 'Safari · iOS', date: '2026-10-22', result: 'Success' }, { user: 'unknown', ip: '185.220.101.4', device: 'curl', date: '2026-10-20', result: 'Failed' }] }),
    tab({ key: 'activity', label: 'Activity logs', columns: [c('user', 'User'), c('action', 'Action'), c('target', 'Target'), c('date', 'Date', 'date')], rows: [{ user: 'Priya', action: 'Published product', target: 'Mailora v1.3', date: '2026-10-22' }, { user: 'Fahad', action: 'Issued refund', target: '#WM-1044', date: '2026-10-18' }] }),
  ],
}

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
