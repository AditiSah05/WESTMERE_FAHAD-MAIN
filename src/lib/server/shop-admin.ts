import 'server-only'
import { db } from './schema'

const d = (col: string) => `to_char(${col}, 'YYYY-MM-DD')`

export const adminLists = {
  orders: async () => (await db()).query(`SELECT o.id::text AS id, '#WM-' || o.id AS ref, u.email AS customer, p.name AS product, o.amount, o.payment_status AS payment, o.fulfilment, o.method, ${d('o.created_at')} AS date FROM shop_orders o JOIN shop_users u ON u.id = o.user_id JOIN shop_products p ON p.id = o.product_id ORDER BY o.id DESC LIMIT 200`),
  requests: async () => (await db()).query(`SELECT r.id::text AS id, '#WM-' || r.order_id AS ref, u.email AS customer, p.name AS product, r.kind, r.reason, o.payment_status AS payment, r.status, ${d('r.created_at')} AS date FROM shop_requests r JOIN shop_users u ON u.id = r.user_id JOIN shop_orders o ON o.id = r.order_id JOIN shop_products p ON p.id = o.product_id ORDER BY (r.status = 'Requested') DESC, r.id DESC LIMIT 200`),
  tickets: async () => (await db()).query(`SELECT t.id::text AS id, 'T-' || t.id AS ref, u.email AS customer, t.subject, t.type, t.priority, t.message, t.status, ${d('t.created_at')} AS date FROM shop_tickets t JOIN shop_users u ON u.id = t.user_id ORDER BY (t.status IN ('Open','In progress')) DESC, t.id DESC LIMIT 200`),
  reviews: async () => (await db()).query(`SELECT r.user_id || ':' || r.product_id AS id, u.email AS customer, p.name AS product, r.rating || ' / 5' AS rating, r.feedback, r.status FROM shop_reviews r JOIN shop_users u ON u.id = r.user_id JOIN shop_products p ON p.id = r.product_id ORDER BY (r.status = 'Pending') DESC LIMIT 200`),
  customers: async () => (await db()).query(`SELECT u.id::text AS id, u.name, u.email, u.status, ${d('u.created_at')} AS joined, count(o.id) AS orders, COALESCE(sum(o.amount) FILTER (WHERE o.payment_status = 'Paid'), 0) AS spent FROM shop_users u LEFT JOIN shop_orders o ON o.user_id = u.id GROUP BY u.id ORDER BY u.created_at DESC LIMIT 200`),
}
