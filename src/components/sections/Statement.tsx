'use client'

import { useRef } from 'react'

import { Logo } from '@/components/brand/Logo'
import { useMotion } from '@/components/providers/MotionProvider'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from '@/components/ui/Icons'
import { cn } from '@/lib/cn'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import type { StatementBlock } from '@/payload-types'

import { sectionProps } from './section-props'
import styles from './Statement.module.css'
import { Tile } from './Tile'

/** Prokit “We are a creative studio…” moment: a white card that shrinks to reveal a moving wall of tiles. */
export function Statement({ block }: { block: StatementBlock }) {
  const ref = useRef<HTMLElement>(null)
  const { reduced } = useMotion()
  const lines = block.lines || []
  const tiles = block.tiles || []
  const columns = Array.from({ length: 6 }, (_, c) => tiles.filter((_, i) => i % 6 === c))
  const plain = lines.map((l) => [l.before, l.after].filter(Boolean).join(' ')).join(' ')

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced) return
      const q = gsap.utils.selector(root)
      gsap.set(q('[data-animate]'), { opacity: 1 })

      const split = SplitText.create(q('[data-split]'), {
        type: 'words',
        mask: 'words',
        wordsClass: 'split-word',
        linesClass: 'split-line',
        charsClass: 'split-char',
        aria: 'none',
      })
      gsap.from(split.words, {
        yPercent: 120,
        rotate: 3,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.045,
        scrollTrigger: { trigger: root, start: 'top 72%', once: true },
      })
      gsap.from(q('[data-inline]'), {
        scale: 0.4,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.6)',
        stagger: 0.12,
        delay: 0.35,
        scrollTrigger: { trigger: root, start: 'top 72%', once: true },
      })

      const mm = gsap.matchMedia()
      mm.add('(min-width: 901px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
        })
        tl.fromTo(
          q('[data-card]'),
          { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
          { clipPath: 'inset(11% 8% 11% 8% round 32px)', ease: 'power2.inOut', duration: 0.6 },
        )
          .fromTo(
            q('[data-tiles]'),
            { scale: 1.18 },
            { scale: 1, ease: 'power2.inOut', duration: 0.6 },
            0,
          )
          .to(q('[data-text]'), { scale: 0.92, ease: 'power2.inOut', duration: 0.6 }, 0)
          .to({}, { duration: 0.4 })
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section {...sectionProps(block, styles.statement)} ref={ref}>
      <div className={styles.sticky}>
        <div className={styles.tiles} data-tiles="" aria-hidden="true">
          {columns.map((col, c) => (
            <div key={c} className={cn(styles.column, c % 2 ? styles.down : styles.up)}>
              <div className={styles.columnTrack}>
                {[...col, ...col, ...col].map((tile, i) => (
                  <Tile key={`${c}-${i}`} tile={tile} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.card} data-card="">
          <div className={cn('container', styles.text)} data-text="">
            <p className="sr-only">{plain}</p>
            <div className={styles.lines} data-animate="">
              {lines.map((line, i) => (
                <div key={line.id || i} className={styles.line}>
                  <span data-split="" aria-hidden="true">
                    {line.before}
                  </span>
                  {line.inline === 'caption' && block.caption && (
                    <span className={styles.caption} data-inline="" aria-hidden="true">
                      {block.caption}
                    </span>
                  )}
                  {line.inline === 'arrow' && (
                    <span className={styles.arrow} data-inline="" aria-hidden="true">
                      <ArrowRight />
                    </span>
                  )}
                  {line.inline === 'mark' && (
                    <span className={styles.mark} data-inline="" aria-hidden="true">
                      <Logo layout="mark" title="" />
                    </span>
                  )}
                  {line.inline === 'button' && block.button?.label && block.button.href && (
                    <span className={styles.button} data-inline="">
                      <Button
                        label={block.button.label}
                        href={block.button.href}
                        newTab={block.button.newTab}
                      />
                    </span>
                  )}
                  {line.after && (
                    <span data-split="" aria-hidden="true">
                      {line.after}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {tiles.length > 0 && (
        <div className={styles.strip} aria-hidden="true">
          <div className={styles.stripTrack}>
            {[...tiles, ...tiles].map((tile, i) => (
              <Tile key={i} tile={tile} className={styles.stripTile} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
