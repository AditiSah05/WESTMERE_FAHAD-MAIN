import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

const config: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ['@electric-sql/pglite', 'pg'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'thumbs.dreamstime.com' },
      { protocol: 'https', hostname: 'img.freepik.com' },
      { protocol: 'https', hostname: 'cdn.dribbble.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default config
