import { NextResponse } from 'next/server'
import { getCustomer } from '@/lib/server/customer'
import { canDownload, packagesData } from '@/lib/server/licenses'
import { trustedIp } from '@/lib/server/ip'
import { db } from '@/lib/server/schema'

/** Download link for a signed-in customer. Every attempt is logged; access is re-checked on each click. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const me = await getCustomer()
  if (!me) return NextResponse.redirect(new URL('/account/login', req.url))
  const id = (await params).id
  if (!/^\d{1,12}$/.test(id)) return new NextResponse('Not found', { status: 404 })
  const pkg = (await packagesData()).packages.find((p) => p.id === id)
  if (!pkg) return new NextResponse('Not found', { status: 404 })
  const ok = await canDownload(me.userId, id)
  await (await db()).query(`INSERT INTO shop_downloads (user_id, package_id, version, status, ip) VALUES ($1,$2,$3,$4,$5)`, [me.userId, id, pkg.version === '—' ? '' : pkg.version, ok ? 'Success' : 'Denied', trustedIp(req.headers) ?? ''])
  return ok ? NextResponse.redirect(pkg.url) : new NextResponse('You do not have access to this file.', { status: 403 })
}
