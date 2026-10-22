import { c, f, select, tab, type ModuleConfig } from './helpers'

const productRows = [
  { name: 'Mailora Chrome Extension', category: 'Software & Tools', type: 'Application', price: 499, status: 'Published', featured: true, version: '1.3.0', demoUrl: 'https://mailora.example/demo' },
  { name: 'Agency Starter Website', category: 'Websites', type: 'Ready-made Website', price: 1999, status: 'Published', featured: true, version: '2.1.0', demoUrl: 'https://starter.example' },
  { name: 'SEO Dashboard App', category: 'Applications', type: 'Application', price: 1999, status: 'Published', featured: false, version: '1.0.4', demoUrl: 'https://seo.example' },
  { name: 'E-commerce Storefront Kit', category: 'Websites', type: 'Ready-made Website', price: 2000, status: 'Draft', featured: false, version: '0.9.0', demoUrl: '' },
  { name: 'Workflow Automation Pack', category: 'Software & Tools', type: 'Software', price: 1499, status: 'Published', featured: false, version: '1.2.1', demoUrl: '' },
  { name: 'Portfolio Lite', category: 'Websites', type: 'Ready-made Website', price: 799, status: 'Archived', featured: false, version: '1.0.0', demoUrl: 'https://portfolio.example' },
  { name: 'Custom Website Build', category: 'Services', type: 'Custom Project', price: 25000, status: 'Published', featured: true, version: '—', demoUrl: '' },
]
const productCols = [c('name', 'Product'), c('category', 'Category'), c('type', 'Type', 'tag'), c('price', 'Price', 'money', 'right'), c('status', 'Status', 'status'), c('featured', 'Featured', 'bool'), c('version', 'Version', 'mono')]
const productFields = [
  f('name', 'Name', 'text', { required: true }), select('category', 'Category', ['Websites', 'Applications', 'Software & Tools', 'Services']),
  select('type', 'Type', ['Ready-made Website', 'Application', 'Software', 'Custom Project']), f('price', 'Price (₹)', 'number'),
  select('status', 'Status', ['Draft', 'Published', 'Archived']), f('featured', 'Featured', 'toggle'), f('version', 'Current version'),
  f('demoUrl', 'Demo link', 'text', { placeholder: 'https://' }),
]
const view = (key: string, label: string, filter: { key: string; value: string }) =>
  tab({ key, label, source: 'all', columns: productCols, rows: productRows, filter })

export const products: ModuleConfig = {
  title: 'Products',
  subtitle: 'Websites, applications and software you sell.',
  tabs: [
    tab({ key: 'all', label: 'All products', source: 'all', columns: productCols, rows: productRows, fields: productFields, addLabel: 'Add product' }),
    view('published', 'Published', { key: 'status', value: 'Published' }),
    view('drafts', 'Drafts', { key: 'status', value: 'Draft' }),
    view('archived', 'Archived', { key: 'status', value: 'Archived' }),
    view('featured', 'Featured', { key: 'featured', value: 'true' }),
    tab({
      key: 'versions', label: 'Versions', addLabel: 'Add version',
      columns: [c('product', 'Product'), c('version', 'Version', 'mono'), c('released', 'Released', 'date'), c('notes', 'Release notes')],
      fields: [f('product', 'Product'), f('version', 'Version'), f('released', 'Release date', 'date'), f('notes', 'Release notes', 'textarea')],
      rows: [
        { product: 'Mailora Chrome Extension', version: '1.3.0', released: '2026-09-28', notes: 'Faster CSV import, retry on failure' },
        { product: 'Mailora Chrome Extension', version: '1.2.0', released: '2026-08-02', notes: 'Template tags and previews' },
        { product: 'Agency Starter Website', version: '2.1.0', released: '2026-09-10', notes: 'Tailwind v4, new hero sections' },
        { product: 'SEO Dashboard App', version: '1.0.4', released: '2026-07-19', notes: 'Chart accessibility fixes' },
      ],
    }),
    tab({
      key: 'files', label: 'Digital files', addLabel: 'Add file',
      columns: [c('file', 'File'), c('product', 'Product'), c('size', 'Size'), c('access', 'Access', 'tag'), c('downloads', 'Downloads', undefined, 'right')],
      fields: [f('file', 'File name'), f('product', 'Product'), f('size', 'Size'), select('access', 'Access', ['Licensed', 'Public', 'Private'])],
      rows: [
        { file: 'mailora-1.3.0.zip', product: 'Mailora Chrome Extension', size: '4.2 MB', access: 'Licensed', downloads: 412 },
        { file: 'starter-website-2.1.0.zip', product: 'Agency Starter Website', size: '38 MB', access: 'Licensed', downloads: 168 },
        { file: 'seo-dashboard-1.0.4.zip', product: 'SEO Dashboard App', size: '21 MB', access: 'Licensed', downloads: 96 },
        { file: 'install-guide.pdf', product: 'All products', size: '1.1 MB', access: 'Public', downloads: 733 },
      ],
    }),
    tab({
      key: 'demos', label: 'Demo links', addLabel: 'Add demo',
      columns: [c('product', 'Product'), c('url', 'Demo URL'), c('status', 'Status', 'status')],
      fields: [f('product', 'Product'), f('url', 'Demo URL'), select('status', 'Status', ['Live', 'Draft', 'Disabled'])],
      rows: [
        { product: 'Mailora Chrome Extension', url: 'https://mailora.example/demo', status: 'Live' },
        { product: 'Agency Starter Website', url: 'https://starter.example', status: 'Live' },
        { product: 'SEO Dashboard App', url: 'https://seo.example', status: 'Live' },
        { product: 'E-commerce Storefront Kit', url: '', status: 'Draft' },
      ],
    }),
    tab({
      key: 'pricing', label: 'Pricing', addLabel: 'Add price',
      columns: [c('product', 'Product'), c('plan', 'Plan', 'tag'), c('price', 'Price', 'money', 'right'), c('billing', 'Billing')],
      fields: [f('product', 'Product'), f('plan', 'Plan'), f('price', 'Price (₹)', 'number'), select('billing', 'Billing', ['One-time', 'Monthly', 'Yearly'])],
      rows: [
        { product: 'Mailora Chrome Extension', plan: 'Personal', price: 499, billing: 'One-time' },
        { product: 'Mailora Chrome Extension', plan: 'Team', price: 1499, billing: 'Yearly' },
        { product: 'Agency Starter Website', plan: 'Single site', price: 1999, billing: 'One-time' },
        { product: 'Agency Starter Website', plan: 'Unlimited sites', price: 5999, billing: 'One-time' },
      ],
    }),
  ],
}
