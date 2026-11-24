import { getCustomer } from '@/lib/server/customer'
import { db } from '@/lib/server/schema'

export const dynamic = 'force-dynamic'

/** Everything we hold for the signed-in customer, as a JSON download. */
export async function GET() {
  const me = await getCustomer()
  if (!me) return new Response('Unauthorized', { status: 401 })
  const { query } = await db()
  const [account] = await query(`SELECT u.email, u.name, u.created_at, p.* FROM shop_users u LEFT JOIN shop_profiles p ON p.user_id = u.id WHERE u.id = $1`, [me.userId])
  const body = {
    account,
    orders: await query(`SELECT id, product_id, amount, payment_status, fulfilment, method, created_at FROM shop_orders WHERE user_id = $1`, [me.userId]),
    tickets: await query(`SELECT id, subject, type, priority, message, status, created_at FROM shop_tickets WHERE user_id = $1`, [me.userId]),
    requests: await query(`SELECT id, order_id, kind, reason, status, created_at FROM shop_requests WHERE user_id = $1`, [me.userId]),
    reviews: await query(`SELECT product_id, rating, feedback, status FROM shop_reviews WHERE user_id = $1`, [me.userId]),
    wishlist: await query(`SELECT product_id FROM shop_wishlist WHERE user_id = $1`, [me.userId]),
  }
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json', 'Content-Disposition': 'attachment; filename="westmere-account-data.json"', 'Cache-Control': 'no-store' } })
}
