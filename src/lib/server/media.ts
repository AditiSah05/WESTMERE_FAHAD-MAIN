import 'server-only'
import { imageSlots, isSlot, MAX_IMAGE_BYTES } from '@/lib/media-slots'
import { db } from './schema'

type Kind = { mime: string; ok: (b: Uint8Array) => boolean }

/** Accept only real JPEG, PNG or WebP files, judged by their first bytes and not by the file name or claimed type. */
const KINDS: Kind[] = [
  { mime: 'image/jpeg', ok: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { mime: 'image/png', ok: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { mime: 'image/webp', ok: (b) => String.fromCharCode(...b.slice(0, 4)) === 'RIFF' && String.fromCharCode(...b.slice(8, 12)) === 'WEBP' },
]

export const sniff = (bytes: Uint8Array) => KINDS.find((k) => k.ok(bytes))?.mime ?? null

/** slot -> URL for every slot, custom upload (versioned so browsers refetch) or the shipped default. */
export async function getImages(): Promise<Record<string, string>> {
  const out = Object.fromEntries(imageSlots.map((s) => [s.slot, s.fallback]))
  try {
    const rows = await (await db()).query<{ slot: string; v: string }>(`SELECT slot, (extract(epoch from updated_at) * 1000)::bigint::text AS v FROM site_media`)
    for (const r of rows) if (isSlot(r.slot)) out[r.slot] = `/media/${r.slot}/${r.v}`
  } catch {
    // table missing or DB down: show the shipped photos
  }
  return out
}

export async function readImage(slot: string): Promise<{ mime: string; data: Uint8Array } | null> {
  if (!isSlot(slot)) return null
  const [row] = await (await db()).query<{ mime: string; data: Uint8Array }>(`SELECT mime, data FROM site_media WHERE slot = $1`, [slot])
  return row ? { mime: row.mime, data: new Uint8Array(row.data) } : null
}

/** Returns an error message, or null when saved. */
export async function writeImage(slot: string, file: File): Promise<string | null> {
  if (!isSlot(slot)) return 'Unknown image slot.'
  if (!file.size) return 'Choose a picture first.'
  if (file.size > MAX_IMAGE_BYTES) return `Pictures must be under ${MAX_IMAGE_BYTES / 1024 / 1024} MB.`
  const bytes = new Uint8Array(await file.arrayBuffer())
  const mime = sniff(bytes)
  if (!mime) return 'Use a JPEG, PNG or WebP picture.'
  await (await db()).query(
    `INSERT INTO site_media (slot, mime, data) VALUES ($1, $2, $3) ON CONFLICT (slot) DO UPDATE SET mime = $2, data = $3, updated_at = now()`,
    [slot, mime, Buffer.from(bytes)],
  )
  return null
}

export const clearImage = async (slot: string) => {
  if (isSlot(slot)) await (await db()).query(`DELETE FROM site_media WHERE slot = $1`, [slot])
}
