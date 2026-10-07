import type { MetadataRoute } from 'next'

import { serverURL } from '@/lib/server-url'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/next', '/forms'] }],
    sitemap: `${serverURL}/sitemap.xml`,
  }
}
