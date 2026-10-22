import type { Field, Row } from '../types'
import { f, select } from './helpers'

export type SettingsSection = { key: string; label: string; fields: Field[]; defaults: Row }

const sec = (key: string, label: string, fields: Field[], values: Record<string, string | number | boolean>): SettingsSection => ({ key, label, fields, defaults: { id: key, ...values } })

export const settingsSections: SettingsSection[] = [
  sec('company', 'Company profile', [f('name', 'Company name'), f('email', 'Contact email'), f('phone', 'Phone'), f('address', 'Address', 'textarea'), f('gstin', 'GSTIN')], { name: 'Westmere', email: 'hello@westmere.io', phone: '+91 96546 64191', address: 'New Delhi, India', gstin: '' }),
  sec('currency', 'Currency', [select('currency', 'Store currency', ['INR (₹)', 'USD ($)', 'EUR (€)']), select('format', 'Number format', ['1,23,456.00', '123,456.00'])], { currency: 'INR (₹)', format: '1,23,456.00' }),
  sec('tax', 'Tax', [f('gst', 'GST rate (%)', 'number'), f('inclusive', 'Prices include tax', 'toggle'), f('region', 'Tax region')], { gst: 18, inclusive: true, region: 'India' }),
  sec('invoice', 'Invoice settings', [f('prefix', 'Invoice prefix'), f('next', 'Next number', 'number'), f('footer', 'Invoice footer', 'textarea')], { prefix: 'INV-2026-', next: 413, footer: 'Thank you for choosing Westmere.' }),
  sec('storage', 'Storage', [select('provider', 'File storage', ['S3-compatible', 'Local disk']), f('bucket', 'Bucket / path'), f('signed', 'Signed download URLs', 'toggle')], { provider: 'S3-compatible', bucket: 'westmere-downloads', signed: true }),
  sec('backup', 'Backup', [select('schedule', 'Schedule', ['Daily', 'Weekly', 'Manual']), f('retention', 'Keep backups (days)', 'number'), f('offsite', 'Off-site copy', 'toggle')], { schedule: 'Daily', retention: 30, offsite: true }),
  sec('seo', 'SEO defaults', [f('title', 'Default title'), f('description', 'Default description', 'textarea'), f('index', 'Allow indexing', 'toggle')], { title: 'Westmere | Growth & Creative Agency', description: 'Design, tech and strategy that drive real growth.', index: true }),
  sec('system', 'System configuration', [f('maintenance', 'Maintenance mode', 'toggle'), select('timezone', 'Timezone', ['Asia/Kolkata', 'UTC']), f('debug', 'Verbose logging', 'toggle')], { maintenance: false, timezone: 'Asia/Kolkata', debug: false }),
]
