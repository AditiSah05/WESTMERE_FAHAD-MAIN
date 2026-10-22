# Westmere

Marketing site for Westmere, built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**,
Framer Motion, Lucide icons, and `next/font` / `next/image`.

## Scripts

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (type-checks too)
npm run start
npm run lint
```

## Layout

- `src/app` – routes (`/`, `/about`, `/services`, `/product`, `/work`, `/contact`), metadata, `sitemap.ts`, `robots.ts`, OG image.
- `src/components/<Section>` – one folder per section; files stay under 150 lines. Static parts are Server Components,
  interactive leaves are `'use client'`.
- `src/components/ui` – shared building blocks (Logo, ChevronBadge, GradientText, Reveal, buttons, social icons).
- `src/lib` – fonts, site config, motion presets, `cn` helper.
- `src/styles/animations.css` – keyframes used by Tailwind `animate-[...]` classes.

The contact form posts to Web3Forms; set `NEXT_PUBLIC_WEB3FORMS_KEY` to override the default key.

## Admin panel (`/admin`)

Protected by real authentication:

- Email + password, hashed with scrypt (per-password salt). No default account and no public sign-up.
- Sessions are random opaque tokens (only their SHA-256 is stored in the database) in an `httpOnly`,
  `SameSite=Strict`, `Secure` (`__Host-` prefixed in production) cookie. 12 h absolute / 2 h idle lifetime,
  revocable server-side. Changing the password signs out every other session.
- 5 failed sign-ins per email (20 per IP) lock logins for 15 minutes; errors are generic and timing-equalised.
- Every admin page and every server action re-checks the session against the database. `proxy.ts` only does an
  optimistic redirect and adds a per-request CSP nonce, `no-store` and anti-clickjacking headers.
- Admin data is stored in Postgres through authenticated server actions, with input validation and an audit log. Each screen has its own typed table (`rec_<module>_<screen>`), created from the screen config on first use.
- Two-factor login (authenticator app + one-time recovery codes) is enabled per user in Settings → Security. Secrets are AES-256-GCM encrypted with `AUTH_ENCRYPTION_KEY`.
- Team & Permissions: owner / admin / editor / support / finance roles, enforced on the server; invite members by single-use link.
- Login attempts are throttled per account and per client IP (only a trusted IP header is used).

### Setup

1. Create a Postgres database (e.g. Neon) and set `DATABASE_URL` in your host's environment variables.
2. Create the first admin (tables are created automatically):
   ```bash
   DATABASE_URL=... npm run admin:create      # prompts for email and a hidden password
   ```
   Running it again for the same email resets that password and clears lockouts.
3. Sign in at `/admin/login`.

Not included yet: two-factor authentication, per-role permissions (the Team screen is sample data), and moving
the individual modules from generic stored rows to dedicated tables.
