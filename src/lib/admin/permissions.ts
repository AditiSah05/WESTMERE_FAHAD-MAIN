/** Role-based access. One definition shared by the UI (hide links) and the server (the real enforcement). */
export const ROLES = ['owner', 'admin', 'editor', 'support', 'finance'] as const
export type Role = (typeof ROLES)[number]

export const MODULES = [
  'dashboard', 'analytics', 'products', 'categories', 'licenses', 'orders', 'customers', 'payments', 'subscriptions',
  'coupons', 'cms', 'reviews', 'support', 'notifications', 'team', 'integrations', 'settings',
] as const
export type ModuleKey = (typeof MODULES)[number]
export type Access = 'read' | 'write'

const everything = Object.fromEntries(MODULES.map((m) => [m, 'write'])) as Record<ModuleKey, Access>

const grants: Record<Role, Partial<Record<ModuleKey, Access>>> = {
  owner: everything,
  admin: { ...everything, team: 'read', integrations: 'read' },
  editor: { dashboard: 'read', analytics: 'read', products: 'write', categories: 'write', cms: 'write', reviews: 'write', coupons: 'write', licenses: 'read' },
  support: { dashboard: 'read', orders: 'read', customers: 'read', licenses: 'read', support: 'write', reviews: 'write', notifications: 'read' },
  finance: { dashboard: 'read', analytics: 'read', payments: 'write', subscriptions: 'write', orders: 'read', customers: 'read', coupons: 'read', licenses: 'read' },
}

export const roleLabel: Record<Role, string> = { owner: 'Owner', admin: 'Admin', editor: 'Editor', support: 'Support', finance: 'Finance' }

export const roleSummary: Record<Role, string> = {
  owner: 'Everything, including team, integrations and settings.',
  admin: 'Everything except managing the team and integrations (read only).',
  editor: 'Catalogue, CMS, reviews and coupons.',
  support: 'Support, reviews, and read-only orders and customers.',
  finance: 'Payments and subscriptions, read-only orders and customers.',
}

export const isRole = (v: unknown): v is Role => typeof v === 'string' && (ROLES as readonly string[]).includes(v)
export const isModule = (v: unknown): v is ModuleKey => typeof v === 'string' && (MODULES as readonly string[]).includes(v)

export function can(role: Role, module: ModuleKey, access: Access = 'read'): boolean {
  const g = grants[role][module]
  return access === 'read' ? !!g : g === 'write'
}

export const accessOf = (role: Role, module: ModuleKey): Access | null => grants[role][module] ?? null

/** `/admin/<segment>` -> module key (dashboard for /admin). */
export const moduleForPath = (path: string): ModuleKey | null => {
  const [seg = 'dashboard', sub] = path.replace(/^\/admin\/?/, '').split('/')
  if (seg === 'shop') return shopModule[sub ?? ''] ?? null
  return isModule(seg || 'dashboard') ? ((seg || 'dashboard') as ModuleKey) : null
}

/** Staff screens over customer data (/admin/shop/<kind>) reuse the matching module's permissions. */
export const shopModule: Record<string, ModuleKey> = { orders: 'orders', requests: 'orders', tickets: 'support', reviews: 'reviews', customers: 'customers' }
