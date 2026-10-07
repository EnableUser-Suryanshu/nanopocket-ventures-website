import type { MetadataRoute } from 'next'

import { getPayloadClient, getPageSlugs } from '@/lib/queries'
import { serverURL } from '@/lib/server-url'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const [pages, insights] = await Promise.all([
    getPageSlugs(),
    payload.find({
      collection: 'insights',
      limit: 500,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
  ])
  return [
    ...pages.map((p) => ({
      url: p.slug === 'home' ? serverURL : `${serverURL}/${p.slug}`,
      lastModified: p.updatedAt,
      priority: p.slug === 'home' ? 1 : 0.4,
    })),
    ...insights.docs.map((d) => ({
      url: `${serverURL}/insights/${d.slug}`,
      lastModified: d.updatedAt,
      priority: 0.6,
    })),
  ]
}
