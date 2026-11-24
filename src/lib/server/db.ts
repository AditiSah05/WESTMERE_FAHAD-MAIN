import 'server-only'
import { Pool } from 'pg'

export type Query = <T = Record<string, unknown>>(text: string, params?: unknown[]) => Promise<T[]>

type Driver = { query: Query; tx: <R>(fn: (q: Query) => Promise<R>) => Promise<R> }

const globalForDb = globalThis as unknown as { __wmDriver?: Promise<Driver> }

/** Production/Vercel: DATABASE_URL (Neon or any Postgres). Local dev without it: in-process Postgres (PGlite). */
async function connect(): Promise<Driver> {
  const url = process.env.DATABASE_URL
  if (url) {
    const pool = new Pool({ connectionString: url, max: 3, idleTimeoutMillis: 10_000 })
    const query: Query = async (text, params) => (await pool.query(text, params as unknown[])).rows as never
    return {
      query,
      tx: async (fn) => {
        const client = await pool.connect()
        try {
          await client.query('BEGIN')
          const out = await fn(async (t, p) => (await client.query(t, p as unknown[])).rows as never)
          await client.query('COMMIT')
          return out
        } catch (e) {
          await client.query('ROLLBACK')
          throw e
        } finally {
          client.release()
        }
      },
    }
  }
  if (process.env.NODE_ENV === 'production') throw new Error('DATABASE_URL is required in production')

  const { PGlite } = await import('@electric-sql/pglite')
  const { mkdirSync } = await import('node:fs')
  mkdirSync('./.data', { recursive: true })
  const pg = new PGlite('./.data/pglite')
  const query: Query = async (text, params) => (await pg.query(text, params)).rows as never
  return { query, tx: (fn) => pg.transaction((t) => fn(async (text, params) => (await t.query(text, params)).rows as never)) }
}

export const getDb = () => (globalForDb.__wmDriver ??= connect())
