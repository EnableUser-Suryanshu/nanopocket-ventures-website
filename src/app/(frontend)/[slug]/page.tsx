import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SplitReveal } from '@/components/motion/SplitReveal'
import { RenderBlocks } from '@/components/sections/RenderBlocks'
import { getCollections, getGlobals, getPage, getPageSlugs } from '@/lib/queries'

import styles from '../page-shell.module.css'

export const revalidate = 3600

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const pages = await getPageSlugs()
  return pages.filter((p) => p.slug && p.slug !== 'home').map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return {}
  const meta = (page as { meta?: { title?: string | null; description?: string | null } }).meta
  return {
    title: meta?.title || page.title,
    description: meta?.description || undefined,
    alternates: { canonical: `/${slug}` },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  if (slug === 'home') notFound()
  const [page, globals, collections] = await Promise.all([
    getPage(slug),
    getGlobals(),
    getCollections(),
  ])
  if (!page) notFound()
  return (
    <>
      <header className={`container ${styles.head}`}>
        <SplitReveal as="h1" text={page.title} className="display" by="chars" />
      </header>
      <RenderBlocks blocks={page.layout || []} globals={globals} collections={collections} />
    </>
  )
}
