import { c, f, select, tab, type ModuleConfig } from './helpers'

export const categories: ModuleConfig = {
  title: 'Categories & Collections',
  subtitle: 'Organise the catalogue, set order and SEO.',
  tabs: [
    tab({
      key: 'main', label: 'Main categories', addLabel: 'Add category',
      columns: [c('name', 'Category'), c('slug', 'Slug', 'mono'), c('image', 'Image'), c('order', 'Sort', undefined, 'right'), c('products', 'Products', undefined, 'right'), c('status', 'Status', 'status')],
      fields: [f('name', 'Name', 'text', { required: true }), f('slug', 'Slug'), f('image', 'Image URL'), f('order', 'Sort order', 'number'), select('status', 'Status', ['Active', 'Draft'])],
      rows: [
        { name: 'Websites', slug: 'websites', image: 'websites.jpg', order: 1, products: 4, status: 'Active' },
        { name: 'Applications', slug: 'applications', image: 'apps.jpg', order: 2, products: 2, status: 'Active' },
        { name: 'Software & Tools', slug: 'software-tools', image: 'tools.jpg', order: 3, products: 3, status: 'Active' },
        { name: 'Services', slug: 'services', image: 'services.jpg', order: 4, products: 1, status: 'Draft' },
      ],
    }),
    tab({
      key: 'sub', label: 'Subcategories', addLabel: 'Add subcategory',
      columns: [c('name', 'Subcategory'), c('parent', 'Parent'), c('filters', 'Filters'), c('order', 'Sort', undefined, 'right')],
      fields: [f('name', 'Name'), f('parent', 'Parent category'), f('filters', 'Filters (comma separated)'), f('order', 'Sort order', 'number')],
      rows: [
        { name: 'Business sites', parent: 'Websites', filters: 'Industry, Price', order: 1 },
        { name: 'E-commerce', parent: 'Websites', filters: 'Platform, Price', order: 2 },
        { name: 'Chrome extensions', parent: 'Software & Tools', filters: 'Browser', order: 1 },
        { name: 'Dashboards', parent: 'Applications', filters: 'Stack', order: 1 },
      ],
    }),
    tab({
      key: 'collections', label: 'Featured collections', addLabel: 'Add collection',
      columns: [c('name', 'Collection'), c('items', 'Items', undefined, 'right'), c('placement', 'Placement', 'tag'), c('status', 'Status', 'status')],
      fields: [f('name', 'Name'), f('items', 'Items', 'number'), select('placement', 'Placement', ['Homepage', 'Marketplace', 'Footer']), select('status', 'Status', ['Active', 'Draft'])],
      rows: [
        { name: 'Bestsellers', items: 6, placement: 'Homepage', status: 'Active' },
        { name: 'New this month', items: 4, placement: 'Marketplace', status: 'Active' },
        { name: 'Starter bundles', items: 3, placement: 'Homepage', status: 'Draft' },
      ],
    }),
    tab({
      key: 'seo', label: 'Category SEO', addLabel: 'Add SEO entry',
      columns: [c('category', 'Category'), c('title', 'Meta title'), c('description', 'Meta description')],
      fields: [f('category', 'Category'), f('title', 'Meta title'), f('description', 'Meta description', 'textarea')],
      rows: [
        { category: 'Websites', title: 'Ready-made websites | Westmere', description: 'Launch-ready, fast, SEO-friendly websites.' },
        { category: 'Applications', title: 'Business applications | Westmere', description: 'Dashboards and apps built for growth teams.' },
        { category: 'Software & Tools', title: 'Software & tools | Westmere', description: 'Automation and productivity tools.' },
      ],
    }),
  ],
}
