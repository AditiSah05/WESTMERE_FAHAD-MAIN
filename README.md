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
