'use server'

import { assertAdmin } from '@/lib/server/auth'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'
import type { Row } from '@/lib/admin/types'

const KEY = /^[a-z0-9-]{1,40}:[a-z0-9-]{1,40}$/
const MAX_ROWS = 500
const MAX_BYTES = 500_000

function validKey(key: unknown): key is string {
  return typeof key === 'string' && KEY.test(key)
}

function sanitize(rows: unknown): Row[] {
  if (!Array.isArray(rows) || rows.length > MAX_ROWS) throw new Error('Invalid rows')
  const seen = new Set<string>()
  const out = rows.map((r) => {
    if (!r || typeof r !== 'object' || Array.isArray(r)) throw new Error('Invalid row')
    const entries = Object.entries(r as Record<string, unknown>)
    const clean: Record<string, string | number | boolean> = {}
    for (const [k, v] of entries) {
      if (k.length > 60) throw new Error('Invalid field')
      if (typeof v === 'string') clean[k] = v.slice(0, 5000)
      else if (typeof v === 'number' && Number.isFinite(v)) clean[k] = v
      else if (typeof v === 'boolean') clean[k] = v
    }
    const id = clean.id
    if (typeof id !== 'string' || !id || id.length > 64 || seen.has(id)) throw new Error('Invalid id')
    seen.add(id)
    return clean as Row
  })
  if (JSON.stringify(out).length > MAX_BYTES) throw new Error('Too large')
  return out
}

/** Stored rows for a screen, or null when nothing was saved yet (caller shows its seed data). */
export async function loadRecords(key: string): Promise<Row[] | null> {
  await assertAdmin()
  if (!validKey(key)) throw new Error('Invalid key')
  const { query } = await db()
  const rows = await query<{ data: Row }>(`SELECT data FROM admin_records WHERE key = $1 ORDER BY position`, [key])
  return rows.length ? rows.map((r) => r.data) : null
}

/** Replaces all rows of a screen atomically. */
export async function writeRecords(key: string, rows: Row[]): Promise<void> {
  const admin = await assertAdmin()
  if (!validKey(key)) throw new Error('Invalid key')
  const clean = sanitize(rows)
  const { tx } = await db()
  await tx(async (q) => {
    await q(`DELETE FROM admin_records WHERE key = $1`, [key])
    for (const [i, r] of clean.entries()) await q(`INSERT INTO admin_records (key, id, position, data) VALUES ($1, $2, $3, $4)`, [key, r.id, i, JSON.stringify(r)])
  })
  await audit(admin.userId, 'records_saved', `${key} (${clean.length})`)
}

export async function resetRecords(key: string): Promise<void> {
  const admin = await assertAdmin()
  if (!validKey(key)) throw new Error('Invalid key')
  const { query } = await db()
  await query(`DELETE FROM admin_records WHERE key = $1`, [key])
  await audit(admin.userId, 'records_reset', key)
}
