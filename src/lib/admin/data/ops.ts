import { c, f, select, tab, type ModuleConfig } from './helpers'

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
