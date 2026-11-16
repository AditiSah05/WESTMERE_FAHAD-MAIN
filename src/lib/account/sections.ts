import { Bell, BookOpen, CreditCard, Download, Heart, KeyRound, LayoutDashboard, LifeBuoy, Package, Repeat, Settings, ShoppingBag, ShoppingCart, User, type LucideIcon } from 'lucide-react'
import type { ModuleConfig } from '@/lib/admin/data/helpers'
import { payments, profileDetails, subscriptions } from './data/billing'
import { downloads, licenses, myProducts, orders } from './data/orders'
import { browse, help, notifications, support, wishlist } from './data/service'

export type Details = { title: string; subtitle: string; groups: { heading: string; items: string[][] }[] }
export type Section = { slug: string; label: string; icon: LucideIcon; table?: ModuleConfig; details?: Details; top?: boolean }

export const sections: Section[] = [
  { slug: '', label: 'Dashboard', icon: LayoutDashboard },
  { slug: 'products', label: 'Browse Products', icon: ShoppingBag, table: browse },
  { slug: 'orders', label: 'My Orders', icon: ShoppingCart, table: orders },
  { slug: 'my-products', label: 'My Products', icon: Package, table: myProducts },
  { slug: 'downloads', label: 'Downloads & Files', icon: Download, table: downloads },
  { slug: 'licenses', label: 'My Licenses', icon: KeyRound, table: licenses },
  { slug: 'billing', label: 'Payments & Billing', icon: CreditCard, table: payments },
  { slug: 'subscriptions', label: 'My Subscriptions', icon: Repeat, table: subscriptions },
  { slug: 'support', label: 'Support Center', icon: LifeBuoy, top: true, table: support },
  { slug: 'wishlist', label: 'Wishlist', icon: Heart, top: true, table: wishlist },
  { slug: 'notifications', label: 'Notifications', icon: Bell, top: true, table: notifications },
  { slug: 'help', label: 'Help Center', icon: BookOpen, top: true, table: help },
  { slug: 'profile', label: 'My Profile', icon: User, top: true, details: profileDetails.profile },
  { slug: 'settings', label: 'Account Settings', icon: Settings, details: profileDetails.settings },
]

export const bySlug = (slug: string) => sections.find((s) => s.slug === slug)
