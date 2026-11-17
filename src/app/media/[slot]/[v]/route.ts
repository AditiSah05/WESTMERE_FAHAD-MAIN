import { readImage } from '@/lib/server/media'

/** Serves an uploaded site picture. The version segment only busts caches, so the response can be cached for a year. */
export async function GET(_req: Request, { params }: { params: Promise<{ slot: string }> }) {
  const img = await readImage((await params).slot)
  if (!img) return new Response('Not found', { status: 404 })
  return new Response(img.data as BodyInit, {
    headers: { 'Content-Type': img.mime, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' },
  })
}
