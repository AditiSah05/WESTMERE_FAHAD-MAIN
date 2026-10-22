import { c, tab, type ModuleConfig } from '@/lib/admin/data/helpers'

export const browse: ModuleConfig = {
  title: 'Browse Products',
  subtitle: 'Websites, applications and software.',
  tabs: [
    tab({ key: 'all', label: 'All products', columns: [c('name', 'Product'), c('category', 'Category'), c('price', 'Price', 'money', 'right'), c('rating', 'Rating'), c('tag', 'Tag', 'tag')], rows: [{ name: 'Agency Starter Website', category: 'Websites', price: 1999, rating: '4.8', tag: 'Bestseller' }, { name: 'Mailora Chrome Extension', category: 'Software & Tools', price: 499, rating: '4.9', tag: 'Featured' }, { name: 'SEO Dashboard App', category: 'Applications', price: 1999, rating: '4.6', tag: 'New' }, { name: 'E-commerce Storefront Kit', category: 'Websites', price: 2000, rating: '4.7', tag: 'Featured' }] }),
    tab({ key: 'recent', label: 'Recently viewed', columns: [c('name', 'Product'), c('viewed', 'Viewed', 'date')], rows: [{ name: 'SEO Dashboard App', viewed: '2026-10-22' }] }),
  ],
}

export const support: ModuleConfig = {
  title: 'Support Center',
  subtitle: 'Tickets, installation help and bug reports.',
  tabs: [tab({ key: 'tickets', label: 'My tickets', columns: [c('id', 'Ticket', 'mono'), c('subject', 'Subject'), c('type', 'Type'), c('priority', 'Priority', 'status'), c('status', 'Status', 'status'), c('updated', 'Updated', 'date')], rows: [{ id: 'T-2041', subject: 'Install error on hosting', type: 'Installation help', priority: 'High', status: 'Open', updated: '2026-10-22' }, { id: 'T-2018', subject: 'Invoice GST number', type: 'Billing', priority: 'Low', status: 'Resolved', updated: '2026-10-14' }] })],
}

export const projects: ModuleConfig = {
  title: 'My Projects',
  subtitle: 'Custom website and app orders: milestones, revisions and delivery.',
  tabs: [
    tab({ key: 'active', label: 'Projects', columns: [c('project', 'Project'), c('team', 'Assigned team'), c('progress', 'Progress'), c('status', 'Status', 'status'), c('deadline', 'Deadline', 'date')], rows: [{ project: 'Custom Website Build', team: 'Fahad, Aditi', progress: '60%', status: 'In progress', deadline: '2026-11-20' }] }),
    tab({ key: 'milestones', label: 'Milestones', columns: [c('milestone', 'Milestone'), c('amount', 'Payment', 'money', 'right'), c('status', 'Status', 'status')], rows: [{ milestone: 'Design approval', amount: 8000, status: 'Paid' }, { milestone: 'Development complete', amount: 10000, status: 'Pending' }, { milestone: 'Final delivery', amount: 7000, status: 'Pending' }] }),
  ],
}

export const wishlist: ModuleConfig = {
  title: 'Wishlist',
  subtitle: 'Saved products.',
  tabs: [tab({ key: 'saved', label: 'Saved', columns: [c('name', 'Product'), c('price', 'Current price', 'money', 'right'), c('availability', 'Availability', 'status')], rows: [{ name: 'E-commerce Storefront Kit', price: 2000, availability: 'Available' }, { name: 'Workflow Automation Pack', price: 1499, availability: 'Available' }] })],
}

export const reviews: ModuleConfig = {
  title: 'My Reviews',
  subtitle: 'Reviews of products you purchased.',
  tabs: [tab({ key: 'mine', label: 'Reviews', columns: [c('product', 'Product'), c('rating', 'Rating'), c('feedback', 'Feedback'), c('status', 'Status', 'status')], rows: [{ product: 'Mailora Chrome Extension', rating: '5 / 5', feedback: 'Saves me hours every week.', status: 'Published' }, { product: 'SEO Dashboard App', rating: '4 / 5', feedback: 'Great, wants more exports.', status: 'Pending' }] })],
}

export const notifications: ModuleConfig = {
  title: 'Notifications',
  subtitle: 'Orders, payments, downloads, licences and support.',
  tabs: [tab({ key: 'all', label: 'All', columns: [c('type', 'Type', 'tag'), c('message', 'Message'), c('date', 'Date', 'date')], rows: [{ type: 'Order', message: 'Order #WM-1043 is ready for delivery.', date: '2026-10-22' }, { type: 'Payment', message: 'Payment for #WM-1046 failed. Retry from Payments.', date: '2026-10-21' }, { type: 'Version', message: 'Agency Starter Website 1.9.0 is available.', date: '2026-10-15' }, { type: 'Licence', message: 'SEO Dashboard App licence expired.', date: '2026-09-30' }] })],
}

export const help: ModuleConfig = {
  title: 'Help Center',
  subtitle: 'Guides, FAQs and troubleshooting.',
  tabs: [tab({ key: 'articles', label: 'Articles', columns: [c('title', 'Title'), c('kind', 'Type', 'tag'), c('product', 'Product')], rows: [{ title: 'Install the starter website', kind: 'Guide', product: 'Agency Starter Website' }, { title: 'System requirements', kind: 'Reference', product: 'All' }, { title: 'Activate your licence key', kind: 'FAQ', product: 'All' }, { title: 'Chrome extension walkthrough', kind: 'Video', product: 'Mailora Chrome Extension' }] })],
}
