'use client'

import { useRef } from 'react'

import { Visual } from '@/components/art/Visual'
import { useMotion } from '@/components/providers/MotionProvider'
import { cn } from '@/lib/cn'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import type { CriteriaBlock } from '@/payload-types'

import styles from './Criteria.module.css'
import { SectionHeader } from './SectionHeader'
import { sectionProps } from './section-props'

/**
 * “What We Are Looking For” — prokit’s sticky service cards with depth: each card slides over the
 * last, which tips back in 3D; the 3D render inside zooms into focus as its card arrives.
 */
export function Criteria({ block, index }: { block: CriteriaBlock; index?: number }) {
  const ref = useRef<HTMLElement>(null)
  const { reduced } = useMotion()
  const items = block.items || []
  const headingId = `${block.anchorId}-title`

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced) return
      const cards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-card]'))

      cards.forEach((card, i) => {
        const title = card.querySelector('[data-card-title]')
        if (title) {
          // Word splits don't depend on width, so no autoSplit — re-splitting would replay (blink) the reveal
          const { words } = SplitText.create(title, {
            type: 'words',
            mask: 'words',
            wordsClass: 'split-word',
            aria: 'auto',
          })
          gsap.from(words, {
            yPercent: 120,
            rotate: 3,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.06,
            scrollTrigger: { trigger: card, start: 'top 72%', once: true },
          })
        }
        gsap.from(card.querySelectorAll('[data-card-fade]'), {
          y: 24,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: card, start: 'top 65%', once: true },
        })
        // The render zooms into focus as its card slides up. force3D keeps these layers on the GPU for the
        // whole scroll — with 'auto' they flip between 3D and 2D at each end and re-rasterise (a visible blink).
        gsap.fromTo(
          card.querySelector('[data-media-inner]'),
          { scale: 1.3, rotate: i % 2 ? 4 : -4 },
          {
            scale: 1,
            rotate: 0,
            ease: 'none',
            force3D: true,
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 25%', scrub: true },
          },
        )

        const next = cards[i + 1]
        if (!next) return
        // The card underneath recedes: it shrinks a little and a shade fades in (opacity is GPU-cheap;
        // an animated filter repaints the whole card every frame)
        const recede = { trigger: next, start: 'top 75%', end: 'top 18%', scrub: true }
        gsap.to(card, {
          scale: 0.92,
          yPercent: -2,
          ease: 'none',
          force3D: true,
          scrollTrigger: recede,
        })
        gsap.to(card.querySelector('[data-shade]'), {
          opacity: 1,
          ease: 'none',
          scrollTrigger: recede,
        })
      })
    },
    { scope: ref, dependencies: [reduced, items.length], revertOnUpdate: true },
  )

  return (
    <section
      {...sectionProps(block, cn('section', styles.criteria))}
      ref={ref}
      aria-labelledby={headingId}
    >
      <div className="container">
        <SectionHeader
          id={headingId}
          eyebrow={block.eyebrow}
          title={block.title}
          tagline={block.tagline}
          index={index}
          ctas={block.ctas}
        />

        <ol className={styles.stack}>
          {items.map((item, i) => {
            const dark = i % 2 === 1
            return (
              <li
                key={item.id || i}
                className={styles.slot}
                style={{ '--i': i } as React.CSSProperties}
              >
                <article className={cn(styles.card, dark && styles.dark)} data-card="">
                  <span className={styles.shade} data-shade="" aria-hidden="true" />
                  <div className={styles.text}>
                    <div className={styles.top}>
                      {block.cardLabel && <p className={styles.label}>{block.cardLabel}</p>}
                      <p className={styles.count} aria-hidden="true">
                        <span>{String(i + 1).padStart(2, '0')}</span> /{' '}
                        {String(items.length).padStart(2, '0')}
                      </p>
                    </div>
                    <h3 className={styles.title} data-card-title="">
                      {item.title}
                    </h3>
                    <p className={styles.desc} data-card-fade="">
                      {item.description}
                    </p>
                  </div>
                  <div className={styles.media} aria-hidden="true">
                    <div className={styles.mediaInner} data-media-inner="">
                      <Visual
                        image={item.image}
                        art={item.art}
                        tone={dark ? 'dark' : 'light'}
                        sizes="(max-width: 900px) 90vw, 40vw"
                      />
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
