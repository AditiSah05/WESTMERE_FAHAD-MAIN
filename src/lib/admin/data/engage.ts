import { c, f, select, tab, type ModuleConfig } from './helpers'

const reviewRows = [
  { product: 'Mailora Chrome Extension', customer: 'Aarav Mehta', rating: 5, text: 'Saved me hours every week.', status: 'Published', verified: true },
  { product: 'Agency Starter Website', customer: 'Zoya Khan', rating: 4, text: 'Clean code, easy to customise.', status: 'Pending', verified: true },
  { product: 'SEO Dashboard App', customer: 'Anon user', rating: 1, text: 'Spam link inside review.', status: 'Reported', verified: false },
  { product: 'Workflow Automation Pack', customer: 'Rohan Iyer', rating: 4, text: 'Good value.', status: 'Pending', verified: false },
]
const revCols = [c('product', 'Product'), c('customer', 'Customer'), c('rating', 'Rating', undefined, 'right'), c('text', 'Review'), c('status', 'Status', 'status'), c('verified', 'Verified', 'bool')]
const revFields = [f('product', 'Product', 'text', { readOnly: true }), f('customer', 'Customer', 'text', { readOnly: true }), f('text', 'Review', 'textarea'), select('status', 'Status', ['Published', 'Pending', 'Reported', 'Rejected'])]
const rev = (key: string, label: string, k?: string, v?: string) =>
  tab({ key, label, source: 'all', columns: revCols, rows: reviewRows, fields: revFields, filter: k ? { key: k, value: v! } : undefined })

export const reviews: ModuleConfig = {
  title: 'Reviews & Ratings',
  subtitle: 'Moderate customer feedback.',
  tabs: [
    rev('all', 'All reviews'), rev('pending', 'Pending approval', 'status', 'Pending'), rev('reported', 'Reported', 'status', 'Reported'), rev('verified', 'Verified purchases', 'verified', 'true'),
    tab({ key: 'ratings', label: 'Ratings', columns: [c('product', 'Product'), c('average', 'Average'), c('count', 'Reviews', undefined, 'right')], rows: [{ product: 'Mailora Chrome Extension', average: '4.9', count: 112 }, { product: 'Agency Starter Website', average: '4.7', count: 64 }, { product: 'SEO Dashboard App', average: '4.5', count: 31 }] }),
  ],
}

const page = (key: string, label: string, items: Record<string, string>[]) =>
  tab({ key, label, addLabel: 'Add item', columns: [c('name', 'Name'), c('detail', 'Details'), c('status', 'Status', 'status')], fields: [f('name', 'Name'), f('detail', 'Details', 'textarea'), select('status', 'Status', ['Published', 'Draft'])], rows: items })

export const cms: ModuleConfig = {
  title: 'Website / CMS',
  subtitle: 'Edit public site content, navigation, SEO and redirects.',
  tabs: [
    page('home', 'Homepage', [{ name: 'Hero headline', detail: 'We Build Digital Experiences That Drive Real Growth.', status: 'Published' }, { name: 'Process section', detail: 'Five steps, Strategy to Optimization', status: 'Published' }]),
    page('banners', 'Banners', [{ name: 'Diwali sale bar', detail: 'Top banner, ends 15 Nov', status: 'Draft' }]),
    page('nav', 'Navigation', [{ name: 'Main menu', detail: 'Home, About, Services, Product, Contact', status: 'Published' }]),
    page('footer', 'Footer', [{ name: 'Footer links', detail: 'Quick links, contact, socials', status: 'Published' }]),
    page('landing', 'Landing pages', [{ name: 'Mailora launch', detail: '/mailora', status: 'Draft' }]),
    page('blog', 'Blog', [{ name: 'Launch checklist', detail: 'Draft, 1,200 words', status: 'Draft' }, { name: 'Why speed sells', detail: 'Published 3 Oct', status: 'Published' }]),
    page('faqs', 'FAQs', [{ name: 'How do licences work?', detail: 'One key per site or device', status: 'Published' }, { name: 'Refund policy?', detail: '7 days, unused licences', status: 'Published' }]),
    page('testimonials', 'Testimonials', [{ name: 'Olivia Carter', detail: 'Brand Director: effortless and polished', status: 'Published' }]),
    page('seo', 'SEO', [{ name: 'Default title', detail: 'Westmere | Growth & Creative Agency', status: 'Published' }]),
    tab({ key: 'redirects', label: 'Redirects', addLabel: 'Add redirect', columns: [c('from', 'From', 'mono'), c('to', 'To', 'mono'), c('type', 'Type', 'tag')], fields: [f('from', 'From path'), f('to', 'To path'), select('type', 'Type', ['301', '302'])], rows: [{ from: '/starter', to: '/product', type: '301' }, { from: '/old-contact', to: '/contact', type: '301' }] }),
  ],
}

const mail = (key: string, label: string, items: Record<string, string>[]) =>
  tab({ key, label, columns: [c('name', 'Message'), c('trigger', 'Trigger'), c('status', 'Status', 'status')], rows: items })

export const notifications: ModuleConfig = {
  title: 'Notifications & Emails',
  subtitle: 'What customers and the team get, and when.',
  tabs: [
    mail('orders', 'Order emails', [{ name: 'Order confirmation', trigger: 'Payment verified', status: 'Enabled' }, { name: 'Delivery ready', trigger: 'Files released', status: 'Enabled' }]),
    mail('payments', 'Payment alerts', [{ name: 'Payment failed', trigger: 'Gateway decline', status: 'Enabled' }, { name: 'Refund issued', trigger: 'Refund approved', status: 'Enabled' }]),
    mail('customers', 'Customer notifications', [{ name: 'New version available', trigger: 'Version released', status: 'Enabled' }, { name: 'Support reply', trigger: 'Agent reply', status: 'Enabled' }]),
    tab({ key: 'templates', label: 'Email templates', addLabel: 'New template', columns: [c('name', 'Template'), c('subject', 'Subject'), c('updated', 'Updated', 'date')], fields: [f('name', 'Template'), f('subject', 'Subject'), f('body', 'Body', 'textarea')], rows: [{ name: 'Order confirmation', subject: 'Your Westmere order {orderId}', updated: '2026-09-12' }, { name: 'Licence expiry', subject: 'Your licence expires soon', updated: '2026-08-30' }] }),
    tab({ key: 'logs', label: 'Delivery logs', columns: [c('to', 'Recipient'), c('template', 'Template'), c('status', 'Status', 'status'), c('date', 'Sent', 'date')], rows: [{ to: 'aarav@example.com', template: 'Order confirmation', status: 'Sent', date: '2026-10-22' }, { to: 'rohan@example.com', template: 'Payment failed', status: 'Bounced', date: '2026-10-21' }] }),
    mail('expiry', 'Licence expiry reminders', [{ name: '30 days before', trigger: 'Licence expiry', status: 'Enabled' }, { name: '7 days before', trigger: 'Licence expiry', status: 'Enabled' }, { name: 'On expiry', trigger: 'Licence expiry', status: 'Disabled' }]),
  ],
}
