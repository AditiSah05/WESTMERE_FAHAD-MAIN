import 'server-only'
import type { LicenseState } from '@/lib/license-shared'
import { db } from './schema'

export type License = { id: string; key: string; productId: string; product: string; customer: string; email: string; type: string; max: number; used: number; state: LicenseState; created: string; expires: string | null; daysLeft: number | null; orderId: string | null }
export type Pkg = { id: string; productId: string; product: string; name: string; format: string; url: string; size: string; availability: string; published: boolean; version: string; downloads: number }
export type Version = { id: string; packageId: string; package: string; product: string; version: string; notes: string; date: string; status: 'Published' | 'Scheduled'; latest: boolean }
const num = (v: unknown) => Number(v ?? 0)

const STATE = `CASE WHEN l.revoked THEN 'Revoked' WHEN l.expires_at IS NOT NULL AND l.expires_at < now() THEN 'Expired' WHEN (SELECT count(*) FROM shop_license_activations a WHERE a.license_id = l.id) = 0 THEN 'Pending' ELSE 'Active' END`

export async function listLicenses(where = '', params: unknown[] = []): Promise<License[]> {
  const rows = await (await db()).query<Record<string, unknown>>(`SELECT l.id::text, l.license_key AS key, l.product_id AS "productId", p.name AS product, COALESCE(NULLIF(u.name, ''), u.email) AS customer, u.email, l.license_type AS type, l.max_activations AS max,
    (SELECT count(*) FROM shop_license_activations a WHERE a.license_id = l.id)::int AS used, ${STATE} AS state, to_char(l.created_at, 'YYYY-MM-DD') AS created, to_char(l.expires_at, 'YYYY-MM-DD') AS expires,
    CASE WHEN l.expires_at IS NULL THEN NULL ELSE ceil(extract(epoch FROM (l.expires_at - now())) / 86400)::int END AS "daysLeft", l.order_id::text AS "orderId"
    FROM shop_licenses l JOIN shop_products p ON p.id = l.product_id JOIN shop_users u ON u.id = l.user_id ${where} ORDER BY l.id DESC`, params)
  return rows as unknown as License[]
}

export async function licenseOverview() {
  const { query } = await db()
  const all = await listLicenses()
  const [d] = await query<Record<string, number>>(`SELECT
    count(*) FILTER (WHERE status = 'Success' AND created_at > date_trunc('month', now()))::int AS month, count(*) FILTER (WHERE status = 'Success')::int AS total FROM shop_downloads`)
  const [g] = await query<Record<string, number>>(`SELECT count(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS new30, count(*) FILTER (WHERE created_at <= now() - interval '30 days' AND created_at > now() - interval '60 days')::int AS prev30 FROM shop_licenses`)
  const live = all.filter((l) => l.state === 'Active' || l.state === 'Pending')
  const soon = (n: number) => live.filter((l) => l.daysLeft !== null && l.daysLeft >= 0 && l.daysLeft <= n)
  const days = Array.from({ length: 30 }, (_, i) => new Date(Date.now() - (29 - i) * 864e5).toISOString().slice(0, 10))
  const act = new Map((await query<{ d: string; n: number }>(`SELECT to_char(created_at, 'YYYY-MM-DD') AS d, count(*)::int AS n FROM shop_license_activations WHERE created_at > now() - interval '30 days' GROUP BY 1`)).map((r) => [r.d, r.n]))
  const made = new Map((await query<{ d: string; n: number }>(`SELECT to_char(created_at, 'YYYY-MM-DD') AS d, count(*)::int AS n FROM shop_licenses WHERE created_at > now() - interval '30 days' GROUP BY 1`)).map((r) => [r.d, r.n]))
  return {
    licenses: all,
    stats: {
      total: all.length, active: live.length, activated: live.filter((l) => l.used > 0).length, pending: all.filter((l) => l.state === 'Pending').length,
      expiring30: soon(30).length, expiring7: soon(7).length, expired: all.filter((l) => l.state === 'Expired').length, revoked: all.filter((l) => l.state === 'Revoked').length,
      downloadsMonth: d.month, downloadsTotal: d.total, new30: g.new30, prev30: g.prev30, lifetime: live.filter((l) => l.expires === null).length,
    },
    dayLabels: days.map((x) => `${Number(x.slice(8))}/${Number(x.slice(5, 7))}`), activations: days.map((x) => act.get(x) ?? 0), created: days.map((x) => made.get(x) ?? 0),
  }
}

export async function licenseDetail(id: string) {
  const { query } = await db()
  const activations = await query<{ device: string; ip: string; at: string }>(`SELECT device, ip, to_char(created_at, 'YYYY-MM-DD HH24:MI') AS at FROM shop_license_activations WHERE license_id = $1 ORDER BY id DESC`, [id])
  const events = await query<{ event: string; note: string; at: string }>(`SELECT event, note, to_char(created_at, 'YYYY-MM-DD HH24:MI') AS at FROM shop_license_events WHERE license_id = $1 ORDER BY id DESC LIMIT 50`, [id])
  return { activations, events }
}

export async function activityLogs() {
  const { query } = await db()
  const activations = await query<{ id: string; key: string; product: string; device: string; ip: string; at: string }>(`SELECT a.id::text, l.license_key AS key, p.name AS product, a.device, a.ip, to_char(a.created_at, 'YYYY-MM-DD HH24:MI') AS at FROM shop_license_activations a JOIN shop_licenses l ON l.id = a.license_id JOIN shop_products p ON p.id = l.product_id ORDER BY a.id DESC LIMIT 200`)
  const history = await query<{ id: string; key: string; product: string; event: string; note: string; at: string }>(`SELECT e.id::text, l.license_key AS key, p.name AS product, e.event, e.note, to_char(e.created_at, 'YYYY-MM-DD HH24:MI') AS at FROM shop_license_events e JOIN shop_licenses l ON l.id = e.license_id JOIN shop_products p ON p.id = l.product_id ORDER BY e.id DESC LIMIT 200`)
  return { activations, history }
}

export async function packagesData() {
  const { query } = await db()
  const packages = await query<Pkg>(`SELECT k.id::text, k.product_id AS "productId", p.name AS product, k.name, k.format, k.file_url AS url, k.size, k.availability, k.published,
    COALESCE((SELECT version FROM shop_package_versions v WHERE v.package_id = k.id AND v.release_date <= current_date ORDER BY v.release_date DESC, v.id DESC LIMIT 1), '—') AS version,
    (SELECT count(*) FROM shop_downloads d WHERE d.package_id = k.id AND d.status = 'Success')::int AS downloads
    FROM shop_packages k JOIN shop_products p ON p.id = k.product_id ORDER BY k.id DESC`)
  const raw = await query<Omit<Version, 'status' | 'latest'> & { future: boolean }>(`SELECT v.id::text, v.package_id::text AS "packageId", k.name AS package, p.name AS product, v.version, v.notes, to_char(v.release_date, 'YYYY-MM-DD') AS date, v.release_date > current_date AS future FROM shop_package_versions v JOIN shop_packages k ON k.id = v.package_id JOIN shop_products p ON p.id = k.product_id ORDER BY v.release_date DESC, v.id DESC`)
  const seen = new Set<string>()
  const versions: Version[] = raw.map(({ future, ...v }) => { const latest = !future && !seen.has(v.packageId); if (!future) seen.add(v.packageId); return { ...v, status: future ? 'Scheduled' : 'Published', latest } })
  const downloads = await query<{ id: string; customer: string; file: string; version: string; status: string; at: string }>(`SELECT d.id::text, COALESCE(NULLIF(u.name, ''), u.email) AS customer, k.name AS file, d.version, d.status, to_char(d.created_at, 'YYYY-MM-DD HH24:MI') AS at FROM shop_downloads d JOIN shop_users u ON u.id = d.user_id JOIN shop_packages k ON k.id = d.package_id ORDER BY d.id DESC LIMIT 10`)
  return { packages, versions, downloads }
}

export const customerChoices = async () => (await db()).query<{ id: string; name: string; email: string }>(`SELECT id, COALESCE(NULLIF(name, ''), email) AS name, email FROM shop_users WHERE status = 'active' ORDER BY created_at DESC LIMIT 500`)
export const productChoicesAll = async () => (await db()).query<{ id: string; name: string }>(`SELECT id, name FROM shop_products ORDER BY name`)

/** Who may download a package: decided here, never by the page. */
export async function canDownload(userId: string, packageId: string) {
  const [r] = await (await db()).query<{ ok: boolean }>(`SELECT k.published AND (k.availability = 'All customers'
      OR (k.availability = 'After purchase' AND EXISTS (SELECT 1 FROM shop_orders o WHERE o.user_id = $1 AND o.product_id = k.product_id AND o.payment_status = 'Paid'))
      OR (k.availability = 'Licensed users' AND EXISTS (SELECT 1 FROM shop_licenses l WHERE l.user_id = $1 AND l.product_id = k.product_id AND NOT l.revoked AND (l.expires_at IS NULL OR l.expires_at > now())))) AS ok
    FROM shop_packages k WHERE k.id = $2`, [userId, packageId])
  return !!r?.ok
}

export async function customerDownloads(userId: string) {
  const { query } = await db()
  const files = (await packagesData()).packages.filter((p) => p.published)
  const open: Pkg[] = []
  for (const p of files) if (await canDownload(userId, p.id)) open.push(p)
  const history = await query<{ id: string; file: string; version: string; status: string; at: string }>(`SELECT d.id::text, k.name AS file, d.version, d.status, to_char(d.created_at, 'YYYY-MM-DD HH24:MI') AS at FROM shop_downloads d JOIN shop_packages k ON k.id = d.package_id WHERE d.user_id = $1 ORDER BY d.id DESC LIMIT 50`, [userId])
  const ids = new Set(open.map((p) => p.id))
  const notes = (await packagesData()).versions.filter((v) => v.status === 'Published' && ids.has(v.packageId))
  return { open, history, notes }
}

export const customerLicenses = (userId: string) => listLicenses('WHERE l.user_id = $1', [userId])
