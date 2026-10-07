'use client'

import { Reveal } from '@/components/motion/Reveal'
import { SplitReveal } from '@/components/motion/SplitReveal'
import { ArrowUpRight } from '@/components/ui/Icons'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@/lib/cn'
import type { Insight, PostsBlock, Press } from '@/payload-types'

import { Eyebrow } from './Eyebrow'
import styles from './Posts.module.css'

type Item = {
  id: string | number
  title: string
  href: string
  external: boolean
  date?: string | null
  meta?: string | null
}

const fmt = (d?: string | null) =>
  d
    ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(
        new Date(d),
      )
    : ''

function itemsFor(block: PostsBlock, insights: Insight[], press: Press[]): Item[] {
  const limit = block.limit || 6
  return block.source === 'press'
    ? press.slice(0, limit).map((p) => ({
        id: p.id,
        title: p.title,
        href: p.url,
        external: true,
        date: p.publishedAt,
        meta: p.outlet,
      }))
    : insights.slice(0, limit).map((p) => ({
        id: p.id,
        title: p.title,
        href: `/insights/${p.slug}`,
        external: false,
        date: p.publishedAt,
        meta: p.category,
      }))
}

function Column({ block, index, items }: { block: PostsBlock; index?: number; items: Item[] }) {
  const headingId = `${block.anchorId}-title`
  return (
    <div
      id={block.anchorId || undefined}
      className={styles.column}
      aria-labelledby={headingId}
      role="region"
    >
      <div className={styles.head}>
        <Eyebrow text={block.eyebrow} index={index} />
        <SplitReveal
          as="h2"
          id={headingId}
          text={block.title}
          className={styles.title}
          by="words"
        />
      </div>

      {items.length ? (
        <Reveal as="ul" className={styles.list} stagger="[data-item]">
          {items.map((item) => (
            <li key={item.id} data-item="">
              <SmartLink
                href={item.href}
                newTab={item.external}
                className={styles.link}
                data-cursor={block.readLabel || 'view'}
              >
                <span className={styles.meta}>
                  {[item.meta, fmt(item.date)].filter(Boolean).join(' · ')}
                </span>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </SmartLink>
            </li>
          ))}
        </Reveal>
      ) : (
        <Reveal className={styles.empty}>
          <span className={styles.emptyDot} aria-hidden="true" />
          <div className={styles.emptyBody}>
            {block.emptyTitle && <p className={styles.emptyTitle}>{block.emptyTitle}</p>}
            {block.emptyBody && <p className={styles.emptyText}>{block.emptyBody}</p>}
            {block.emptyLink?.label && block.emptyLink.href && (
              <SmartLink
                href={block.emptyLink.href}
                newTab={block.emptyLink.newTab}
                className="line-link"
              >
                {block.emptyLink.label}
                <ArrowUpRight className={styles.ext} />
              </SmartLink>
            )}
          </div>
        </Reveal>
      )}
    </div>
  )
}

/** Our Insights + Us In News side by side — compact rows, quiet empty state until the first post. */
export function PostsGroup({
  blocks,
  indexes,
  insights,
  press,
}: {
  blocks: PostsBlock[]
  indexes: Array<number | undefined>
  insights: Insight[]
  press: Press[]
}) {
  const theme = blocks[0]?.theme || 'white'
  return (
    <section className={cn(`theme-${theme}`, 'section', styles.posts)} data-section="posts">
      <div className={cn('container', styles.grid, blocks.length > 1 && styles.pair)}>
        {blocks.map((b, i) => (
          <Column
            key={b.id || i}
            block={b}
            index={indexes[i]}
            items={itemsFor(b, insights, press)}
          />
        ))}
      </div>
    </section>
  )
}
