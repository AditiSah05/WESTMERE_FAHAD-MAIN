import {
  BarChart3, FolderTree, KeyRound, LayoutDashboard, LifeBuoy, Mail, Package, PanelsTopLeft,
  Plug, Repeat, Settings, ShieldCheck, ShoppingCart, Star, Tag, Users, Wallet, type LucideIcon,
} from 'lucide-react'

export type NavItem = { href: string; label: string; icon: LucideIcon }
export type NavGroup = { title: string; items: NavItem[] }

export const navGroups: NavGroup[] = [
  { title: 'Overview', items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }, { href: '/admin/analytics', label: 'Analytics & Reports', icon: BarChart3 }] },
  {
    title: 'Catalogue',
    items: [
      { href: '/admin/products', label: 'Products', icon: Package },
      { href: '/admin/categories', label: 'Categories & Collections', icon: FolderTree },
      { href: '/admin/licenses', label: 'Licenses & Downloads', icon: KeyRound },
    ],
  },
  {
    title: 'Sales',
    items: [
      { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
      { href: '/admin/customers', label: 'Customers / CRM', icon: Users },
      { href: '/admin/payments', label: 'Payments & Finance', icon: Wallet },
      { href: '/admin/subscriptions', label: 'Subscriptions', icon: Repeat },
      { href: '/admin/coupons', label: 'Coupons & Promotions', icon: Tag },
    ],
  },
  {
    title: 'Engagement',
    items: [
      { href: '/admin/cms', label: 'Website / CMS', icon: PanelsTopLeft },
      { href: '/admin/reviews', label: 'Reviews & Ratings', icon: Star },
      { href: '/admin/support', label: 'Support & Projects', icon: LifeBuoy },
      { href: '/admin/notifications', label: 'Notifications & Emails', icon: Mail },
    ],
  },
  {
    title: 'System',
    items: [
      { href: '/admin/team', label: 'Team & Permissions', icon: ShieldCheck },
      { href: '/admin/integrations', label: 'Integrations', icon: Plug },
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
]

export const flatNav = navGroups.flatMap((g) => g.items)
