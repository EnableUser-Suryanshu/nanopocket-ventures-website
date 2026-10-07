'use client'

import { useRef } from 'react'

import { Visual } from '@/components/art/Visual'
import { MotionToggle } from '@/components/layout/MotionToggle'
import { useMotion } from '@/components/providers/MotionProvider'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import type { HeroBlock } from '@/payload-types'

import { Globe } from './Globe'
import styles from './Hero.module.css'
import { sectionProps } from './section-props'
import { Tile } from './Tile'

/**
 * Prokit hero (“Think / Refine / Create” + tilted moving columns) in the brand tagline treatment:
 * black text, gold “Discover”, red curved underline only.
 */
export function Hero({ block }: { block: HeroBlock }) {
  const ref = useRef<HTMLElement>(null)
  const { reduced, introDone } = useMotion()
  const fullTagline = `${block.lineOne} ${block.highlight} ${block.lineTwo}`
  const tiles = block.tiles || []
  const columns = Array.from({ length: 4 }, (_, c) => tiles.filter((_, i) => i % 4 === c))
  const showcase = block.visual !== 'globe' && tiles.length > 0

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced || !introDone) return
      const q = gsap.utils.selector(root)
      gsap.set(q('[data-animate]'), { opacity: 1 })

      const split = (sel: string) =>
        SplitText.create(q(sel), {
          type: 'words,chars',
          mask: 'words',
          wordsClass: 'split-word',
          aria: 'none',
        })
      const one = split('[data-line-one]')
      const two = split('[data-line-two]')

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(one.chars, { yPercent: 120, duration: 1.2, stagger: 0.018 })
        .from(q('[data-pill]'), { scale: 0, duration: 1.1, ease: 'back.out(1.4)' }, '-=0.95')
        .from(q('[data-highlight] > span'), { yPercent: 120, duration: 1.25 }, '<')
        .from(two.chars, { yPercent: 120, duration: 1.2, stagger: 0.016 }, '-=1.05')
        .fromTo(
          q('[data-swoosh]'),
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut' },
          '-=0.6',
        )
        .from(q('[data-fade]'), { y: 20, opacity: 0, duration: 1, stagger: 0.07 }, '-=0.9')
        .from(q('[data-column]'), { yPercent: 40, opacity: 0, duration: 1.8, stagger: 0.1 }, 0.15)
        .from(q('[data-globe]'), { scale: 0.85, opacity: 0, duration: 1.8 }, 0.15)

      // Scroll-out: copy drifts up, the tilted wall swings and rises (prokit hero → about hand-off)
      const st = { trigger: root, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(q('[data-copy]'), { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: st })
      gsap.to(q('[data-showcase]'), {
        yPercent: -12,
        rotate: 4,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: st,
      })
    },
    { scope: ref, dependencies: [reduced, introDone], revertOnUpdate: true },
  )

  return (
    <section {...sectionProps(block, styles.hero)} ref={ref}>
      {showcase ? (
        <div className={styles.showcaseWrap} aria-hidden="true">
          <div className={styles.showcase} data-showcase="">
            {columns.map((col, c) => (
              <div
                key={c}
                className={cn(styles.column, c % 2 ? styles.down : styles.up)}
                data-column=""
              >
                <div className={styles.track}>
                  {[...col, ...col, ...col].map((tile, i) => (
                    <Tile key={`${c}-${i}`} tile={tile} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : block.visual === 'globe' ? (
        <div className={styles.globeWrap} data-globe="" data-animate="">
          <Globe origin={block.origin} destinations={block.destinations} />
        </div>
      ) : null}

      <div className={cn('container', styles.inner)} data-copy="">
        <h1 className={styles.title}>
          <span className="sr-only">{fullTagline}</span>
          <span aria-hidden="true" className={styles.lines}>
            <span className={styles.lineOne} data-line-one="" data-animate="">
              {block.lineOne}
            </span>
            <span className={styles.row}>
              <span className={styles.pill} data-pill="">
                <Visual
                  image={block.inlineImage}
                  art={block.inlineArt || 'bannerGlobe'}
                  tone="dark"
                  sizes="120px"
                />
              </span>
              <span className={styles.highlight} data-highlight="" data-animate="">
                <span className="gold-text gold-text--shimmer">{block.highlight}</span>
              </span>
            </span>
            <span className={styles.lineTwoWrap}>
              <span className={styles.lineTwo} data-line-two="" data-animate="">
                {block.lineTwo}
              </span>
              <svg
                className={styles.swoosh}
                viewBox="0 0 1000 70"
                preserveAspectRatio="none"
                data-swoosh=""
              >
                <path d="M4 52 C 230 26, 560 10, 997 8 C 999 11, 997 15, 992 16 C 610 22, 320 40, 18 68 C 7 70, 1 60, 4 52 Z" />
              </svg>
            </span>
          </span>
        </h1>

        <div className={styles.meta}>
          {block.subline && (
            <p className={styles.subline} data-fade="" data-animate="">
              {block.subline}
            </p>
          )}
          {block.ctas?.length ? (
            <div className={styles.ctas}>
              {block.ctas.map((c) => (
                <span key={c.id || c.label} data-fade="" data-animate="" className={styles.ctaItem}>
                  <Button label={c.label} href={c.href} newTab={c.newTab} variant={c.variant} />
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className={cn('container', styles.bottom)} data-fade="" data-animate="">
        <div className={styles.scroll} aria-hidden="true">
          <span>(</span>
          <span className={styles.scrollRoll}>
            <span>{block.scrollLabel}</span>
            <span>{block.scrollLabel}</span>
          </span>
          <span>)</span>
        </div>
        <MotionToggle />
      </div>
    </section>
  )
}
