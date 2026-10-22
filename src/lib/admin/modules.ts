import { categories } from './data/categories'
import { cms, notifications, reviews } from './data/engage'
import { coupons, payments, subscriptions } from './data/finance'
import { licenses, support } from './data/ops'
import { products } from './data/catalog'
import { customers, orders } from './data/sales'
import { integrations } from './data/system'
import type { ModuleConfig } from './data/helpers'

/** Table-driven admin screens, keyed by URL slug (/admin/<slug>). Analytics and Settings have their own routes. */
export const modules: Record<string, ModuleConfig> = {
  products, categories, orders, customers, payments, licenses, subscriptions, coupons, cms, reviews, support, notifications, integrations,
}
