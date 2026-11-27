import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    // Private areas stay out of search results; the secret admin path is deliberately not listed here.
    rules: { userAgent: '*', allow: '/', disallow: ['/account', '/admin', '/api'] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
