/**
 * Secret admin sign-in address. Set ADMIN_LOGIN_PATH (e.g. "studio-a1b2c3d4e5") and the sign-in screen is
 * served only at that path; /admin/login then answers 404. Unset (local dev) keeps the default /admin/login.
 */
export const adminLoginSlug = (process.env.ADMIN_LOGIN_PATH ?? '').replace(/^\/+|\/+$/g, '')
export const ADMIN_LOGIN = adminLoginSlug ? `/${adminLoginSlug}` : '/admin/login'
