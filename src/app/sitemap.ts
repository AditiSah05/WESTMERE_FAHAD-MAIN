import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { listedProducts } from '@/lib/server/shop'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = (await listedProducts().catch(() => [])).map((p) => `/product/${p.id}`)
  const routes = [...new Set([...siteConfig.routes, ...products])]
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
