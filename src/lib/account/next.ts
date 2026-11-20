/** Where to go after sign-in. Only our own checkout page is allowed, so this cannot be used as an open redirect. */
export const safeNext = (v: unknown) => (typeof v === 'string' && /^\/account\/checkout\?[\w%=&.~+'()!*-]{1,300}$/.test(v) ? v : undefined)
