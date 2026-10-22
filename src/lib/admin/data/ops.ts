import { c, f, select, tab, type ModuleConfig } from './helpers'

const keyRows = [
  { key: 'WM-MAIL-7F3A-91C2', product: 'Mailora Chrome Extension', customer: 'Aarav Mehta', status: 'Active', activations: '1 / 1', expires: '2027-10-22' },
  { key: 'WM-STAR-2B8D-04E7', product: 'Agency Starter Website', customer: 'Zoya Khan', status: 'Active', activations: '0 / 1', expires: '2027-10-22' },
  { key: 'WM-SEO-91AA-5C10', product: 'SEO Dashboard App', customer: 'Studio North', status: 'Expired', activations: '2 / 3', expires: '2026-10-01' },
  { key: 'WM-MAIL-1D44-A0B9', product: 'Mailora Chrome Extension', customer: 'Kabir Anand', status: 'Revoked', activations: '0 / 1', expires: '2027-09-04' },
]
const keyCols = [c('key', 'Licence key', 'mono'), c('product', 'Product'), c('customer', 'Customer'), c('status', 'Status', 'status'), c('activations', 'Activations'), c('expires', 'Expires', 'date')]
const keyFields = [f('key', 'Licence key', 'text', { readOnly: true }), f('product', 'Product'), f('customer', 'Customer'), select('status', 'Status', ['Active', 'Expired', 'Revoked']), f('expires', 'Expires', 'date')]

export const licenses: ModuleConfig = {
  title: 'Licenses & Downloads',
  subtitle: 'Keys, activations, renewals and download access.',
  tabs: [
    tab({ key: 'keys', label: 'License keys', source: 'keys', columns: keyCols, rows: keyRows, fields: keyFields, addLabel: 'Generate key' }),
    tab({ key: 'revoked', label: 'Revoked licenses', source: 'keys', columns: keyCols, rows: keyRows, fields: keyFields, filter: { key: 'status', value: 'Revoked' } }),
    tab({ key: 'expiry', label: 'Expiry & renewals', source: 'keys', columns: keyCols, rows: keyRows, fields: keyFields, filter: { key: 'status', value: 'Expired' } }),
    tab({ key: 'activations', label: 'Activations', columns: [c('key', 'Licence key', 'mono'), c('domain', 'Domain / device'), c('ip', 'IP', 'mono'), c('date', 'Activated', 'date')], rows: [{ key: 'WM-MAIL-7F3A-91C2', domain: 'Chrome · MacBook Pro', ip: '103.21.58.12', date: '2026-10-22' }, { key: 'WM-SEO-91AA-5C10', domain: 'northstudio.example', ip: '49.36.11.84', date: '2025-10-01' }] }),
    tab({ key: 'access', label: 'Download access', columns: [c('customer', 'Customer'), c('file', 'File'), c('access', 'Access', 'status'), c('left', 'Downloads left', undefined, 'right')], rows: [{ customer: 'Aarav Mehta', file: 'mailora-1.3.0.zip', access: 'Active', left: 4 }, { customer: 'Studio North', file: 'seo-dashboard-1.0.4.zip', access: 'Expired', left: 0 }] }),
    tab({ key: 'logs', label: 'Download logs', columns: [c('customer', 'Customer'), c('file', 'File'), c('ip', 'IP', 'mono'), c('date', 'Date', 'date')], rows: [{ customer: 'Aarav Mehta', file: 'mailora-1.3.0.zip', ip: '103.21.58.12', date: '2026-10-22' }, { customer: 'Isha Verma', file: 'seo-dashboard-1.0.4.zip', ip: '157.34.2.7', date: '2026-10-15' }] }),
    tab({ key: 'updates', label: 'Version updates', columns: [c('product', 'Product'), c('version', 'Version', 'mono'), c('notified', 'Customers notified', undefined, 'right'), c('date', 'Released', 'date')], rows: [{ product: 'Mailora Chrome Extension', version: '1.3.0', notified: 412, date: '2026-09-28' }, { product: 'Agency Starter Website', version: '2.1.0', notified: 168, date: '2026-09-10' }] }),
  ],
}

export const support: ModuleConfig = {
  title: 'Support & Projects',
  subtitle: 'Tickets, bugs, custom orders and project delivery.',
  tabs: [
    tab({
      key: 'tickets', label: 'Support tickets', addLabel: 'New ticket',
      columns: [c('ticket', 'Ticket', 'mono'), c('customer', 'Customer'), c('subject', 'Subject'), c('priority', 'Priority', 'status'), c('status', 'Status', 'status')],
      fields: [f('ticket', 'Ticket'), f('customer', 'Customer'), f('subject', 'Subject'), select('priority', 'Priority', ['Low', 'Medium', 'High']), select('status', 'Status', ['Open', 'In progress', 'Resolved'])],
      rows: [{ ticket: 'T-212', customer: 'Studio North', subject: 'Licence expired early', priority: 'High', status: 'Open' }, { ticket: 'T-211', customer: 'Zoya Khan', subject: 'Install help', priority: 'Medium', status: 'In progress' }, { ticket: 'T-210', customer: 'Aarav Mehta', subject: 'CSV import question', priority: 'Low', status: 'Resolved' }],
    }),
    tab({ key: 'bugs', label: 'Bug reports', addLabel: 'Log bug', columns: [c('id', 'Bug', 'mono'), c('product', 'Product'), c('summary', 'Summary'), c('status', 'Status', 'status')], fields: [f('id', 'Bug ID'), f('product', 'Product'), f('summary', 'Summary', 'textarea'), select('status', 'Status', ['Open', 'In progress', 'Resolved'])], rows: [{ id: 'B-45', product: 'Mailora Chrome Extension', summary: 'Gmail compose window not detected on first load', status: 'In progress' }, { id: 'B-44', product: 'SEO Dashboard App', summary: 'Chart tooltip clipped on mobile', status: 'Open' }] }),
    tab({ key: 'custom', label: 'Custom orders', columns: [c('client', 'Client'), c('brief', 'Brief'), c('budget', 'Budget', 'money', 'right'), c('status', 'Status', 'status')], rows: [{ client: 'Meera Shah', brief: 'Brand website, 8 pages', budget: 25000, status: 'In progress' }, { client: 'Velora Interiors', brief: 'Portfolio + booking', budget: 40000, status: 'Pending' }] }),
    tab({ key: 'milestones', label: 'Project milestones', addLabel: 'Add milestone', columns: [c('project', 'Project'), c('milestone', 'Milestone'), c('due', 'Due', 'date'), c('status', 'Status', 'status')], fields: [f('project', 'Project'), f('milestone', 'Milestone'), f('due', 'Due', 'date'), select('status', 'Status', ['Pending', 'In progress', 'Completed'])], rows: [{ project: 'Shah Brand Site', milestone: 'Design approval', due: '2026-10-28', status: 'In progress' }, { project: 'Shah Brand Site', milestone: 'Development', due: '2026-11-15', status: 'Pending' }, { project: 'Shah Brand Site', milestone: 'Kickoff', due: '2026-10-19', status: 'Completed' }] }),
    tab({ key: 'team', label: 'Assigned team', columns: [c('project', 'Project'), c('member', 'Member'), c('role', 'Role', 'tag')], rows: [{ project: 'Shah Brand Site', member: 'Priya', role: 'Design' }, { project: 'Shah Brand Site', member: 'Aman', role: 'Development' }] }),
    tab({ key: 'deadlines', label: 'Deadlines', columns: [c('project', 'Project'), c('deadline', 'Deadline', 'date'), c('daysLeft', 'Days left', undefined, 'right'), c('status', 'Delivery', 'status')], rows: [{ project: 'Shah Brand Site', deadline: '2026-11-30', daysLeft: 38, status: 'In progress' }, { project: 'Velora Portfolio', deadline: '2026-12-20', daysLeft: 58, status: 'Pending' }] }),
  ],
}
