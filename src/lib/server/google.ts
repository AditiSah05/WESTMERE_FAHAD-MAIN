import 'server-only'

export const GOOGLE_COOKIE = process.env.NODE_ENV === 'production' ? '__Host-wm_gauth' : 'wm_gauth'
export const googleConfigured = () => Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

/** Must match an "Authorised redirect URI" in the Google Cloud OAuth client. Set SITE_URL in production. */
export const redirectUri = (req: Request) => `${process.env.SITE_URL ?? new URL(req.url).origin}/account/google/callback`
