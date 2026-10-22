import { BadgePercent, Bell, BookOpen, Building2, CreditCard, Download, FolderKanban, Heart, KeyRound, LayoutDashboard, LifeBuoy, Package, Repeat, Settings, ShoppingBag, ShoppingCart, Star, User, type LucideIcon } from 'lucide-react'
import type { ModuleConfig } from '@/lib/admin/data/helpers'
import { coupons, payments, profileDetails, subscriptions } from './data/billing'
import { downloads, licenses, myProducts, orders } from './data/orders'
import { browse, help, notifications, projects, reviews, support, wishlist } from './data/service'

export type Details = { title: string; subtitle: string; groups: { heading: string; items: string[][] }[] }
export type Section = { slug: string; label: string; icon: LucideIcon; table?: ModuleConfig; details?: Details }

export const sections: Section[] = [
  { slug: '', label: 'Dashboard', icon: LayoutDashboard },
  { slug: 'products', label: 'Browse Products', icon: ShoppingBag, table: browse },
  { slug: 'orders', label: 'My Orders', icon: ShoppingCart, table: orders },
  { slug: 'my-products', label: 'My Products', icon: Package, table: myProducts },
  { slug: 'downloads', label: 'Downloads & Files', icon: Download, table: downloads },
  { slug: 'licenses', label: 'My Licenses', icon: KeyRound, table: licenses },
  { slug: 'billing', label: 'Payments & Billing', icon: CreditCard, table: payments },
  { slug: 'subscriptions', label: 'My Subscriptions', icon: Repeat, table: subscriptions },
  { slug: 'support', label: 'Support Center', icon: LifeBuoy, table: support },
  { slug: 'projects', label: 'My Projects', icon: FolderKanban, table: projects },
  { slug: 'wishlist', label: 'Wishlist', icon: Heart, table: wishlist },
  { slug: 'coupons', label: 'Coupons & Offers', icon: BadgePercent, table: coupons },
  { slug: 'reviews', label: 'My Reviews', icon: Star, table: reviews },
  { slug: 'notifications', label: 'Notifications', icon: Bell, table: notifications },
  { slug: 'help', label: 'Help Center', icon: BookOpen, table: help },
  { slug: 'profile', label: 'My Profile', icon: User, details: profileDetails.profile },
  { slug: 'company', label: 'Billing & Company', icon: Building2, details: profileDetails.company },
  { slug: 'settings', label: 'Account Settings', icon: Settings, details: profileDetails.settings },
]

export const bySlug = (slug: string) => sections.find((s) => s.slug === slug)
