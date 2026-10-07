import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Visual } from '@/components/art/Visual'
import { SplitReveal } from '@/components/motion/SplitReveal'
import { SmartLink } from '@/components/ui/SmartLink'
import { getInsight, getPayloadClient } from '@/lib/queries'

import styles from '../../page-shell.module.css'

export const revalidate = 3600

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'insights',
    limit: 200,
    depth: 0,
    select: { slug: true },
  })
  return res.docs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getInsight(slug)
  if (!post) return {}
  const meta = (post as { meta?: { title?: string | null; description?: string | null } }).meta
  return {
    title: meta?.title || post.title,
    description: meta?.description || post.excerpt,
    alternates: { canonical: `/insights/${slug}` },
  }
}

export default async function InsightPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getInsight(slug)
  if (!post) notFound()
  const date = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.publishedAt))
  return (
    <article>
      <header className={`container ${styles.head}`}>
        <div className={styles.back}>
          <SmartLink href="#insights" className="line-link">
            ← Insights
          </SmartLink>
        </div>
        <SplitReveal as="h1" text={post.title} className="h2" by="words" />
        <p className={styles.meta}>
          <time dateTime={post.publishedAt}>{date}</time>
          {post.category && <span>{post.category}</span>}
        </p>
      </header>
      <div className="container section" style={{ paddingTop: 0 }}>
        {post.cover && typeof post.cover === 'object' && (
          <div className={styles.cover}>
            <Visual image={post.cover} priority sizes="100vw" />
          </div>
        )}
        <p className="lead" style={{ maxWidth: '60ch', marginBottom: '2rem' }}>
          {post.excerpt}
        </p>
        <RichText data={post.content} className="prose" />
      </div>
    </article>
  )
}
