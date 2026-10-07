import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/sections/RenderBlocks'
import { getCollections, getGlobals, getPage } from '@/lib/queries'

export const revalidate = 3600

export default async function HomePage() {
  const [page, globals, collections] = await Promise.all([
    getPage('home'),
    getGlobals(),
    getCollections(),
  ])
  if (!page) notFound()
  return <RenderBlocks blocks={page.layout || []} globals={globals} collections={collections} />
}
