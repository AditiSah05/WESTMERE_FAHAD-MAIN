import 'server-only'

export type GoogleReview = { id: string; author: string; rating: number; text: string; when: string; link?: string }
export type GoogleReviews =
  | { state: 'unconfigured' }
  | { state: 'error'; message: string }
  | { state: 'ok'; name: string; rating: number; count: number; mapsUri?: string; reviews: GoogleReview[] }

type Place = {
  displayName?: { text?: string }
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  reviews?: { name?: string; rating?: number; relativePublishTimeDescription?: string; text?: { text?: string }; authorAttribution?: { displayName?: string; uri?: string } }[]
}

export const parsePlace = (p: Place): Extract<GoogleReviews, { state: 'ok' }> => ({
  state: 'ok',
  name: p.displayName?.text ?? 'Google Business Profile',
  rating: p.rating ?? 0,
  count: p.userRatingCount ?? 0,
  mapsUri: p.googleMapsUri,
  reviews: (p.reviews ?? []).map((r, i) => ({
    id: r.name ?? String(i),
    author: r.authorAttribution?.displayName ?? 'Google user',
    rating: r.rating ?? 0,
    text: r.text?.text ?? '',
    when: r.relativePublishTimeDescription ?? '',
    link: r.authorAttribution?.uri,
  })),
})

/**
 * Reads the business rating and its latest reviews through the Places API (New). Google returns at most
 * 5 reviews this way; the full history needs the Business Profile API (owner OAuth + Google approval).
 */
export async function googleReviews(): Promise<GoogleReviews> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const place = process.env.GOOGLE_PLACE_ID
  if (!key || !place) return { state: 'unconfigured' }
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(place)}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'displayName,rating,userRatingCount,googleMapsUri,reviews' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return { state: 'error', message: `Google returned ${res.status}. Check the API key, that Places API (New) is enabled, and the Place ID.` }
    return parsePlace((await res.json()) as Place)
  } catch {
    return { state: 'error', message: 'Could not reach Google. Try again in a moment.' }
  }
}
