'use client'

import { useId, useRef } from 'react'

import { Visual } from '@/components/art/Visual'
import { MARK_FIELD, MARK_SEED } from '@/components/brand/logo-paths'
import { useMotion } from '@/components/providers/MotionProvider'
import { cn } from '@/lib/cn'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import type { AboutBlock } from '@/payload-types'

import styles from './About.module.css'
import { Eyebrow } from './Eyebrow'
import { sectionProps } from './section-props'

/**
 * “Who We Are” — the pocket reveal. A window in the shape of the NanoPocket mark grows from the seed
 * until it swallows the screen; then the fund’s story lights up word by word (prokit story section).
 */
export function About({ block, index }: { block: AboutBlock; index?: number }) {
  const ref = useRef<HTMLElement>(null)
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const { reduced } = useMotion()
  const headingId = `${block.anchorId}-title`

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced) return
      const q = gsap.utils.selector(root)
      const words = (q('[data-fill]') as HTMLElement[]).flatMap(
        (p) =>
          SplitText.create(p, { type: 'words', aria: 'none', wordsClass: styles.word })
            .words as HTMLElement[],
      )
      const title = SplitText.create(q('[data-title]'), {
        type: 'chars',
        mask: 'chars',
        aria: 'auto',
      }).chars
      const animated = q('[data-animate]')
      if (animated.length) gsap.set(animated, { opacity: 1 })

      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
        })
        // Elements inside <mask> have no bounding box, so scale about the seed's centroid by hand.
        const hole = root.querySelector('[data-hole]') as SVGGElement
        const ox = 248
        const oy = 592
        const grow = { s: 0.2 }
        const apply = () =>
          hole.setAttribute(
            'transform',
            `translate(${ox} ${oy}) scale(${grow.s}) translate(${-ox} ${-oy})`,
          )
        apply()
        tl.to(grow, { s: 30, duration: 0.4, ease: 'power2.in', onUpdate: apply }, 0)
          .fromTo(
            q('[data-visual]'),
            { scale: 1.35 },
            { scale: 0.8, duration: 0.5, ease: 'power2.out', force3D: true },
            0,
          )
          .to(
            q('[data-visual]'),
            { xPercent: -26, opacity: 0.32, duration: 0.24, ease: 'power2.inOut', force3D: true },
            0.3,
          )
          .from(title, { yPercent: 120, stagger: 0.012, duration: 0.14, ease: 'power3.out' }, 0.3)
          .from(q('[data-eyebrow], [data-caption]'), { opacity: 0, y: 12, duration: 0.08 }, 0.3)
          // Copy waits until the mark has stepped aside, so it never sits on top of the render
          .from(q('[data-body]'), { opacity: 0, y: 48, duration: 0.12, ease: 'power2.out' }, 0.4)
          .fromTo(
            words,
            { opacity: 0.46 },
            { opacity: 1, duration: 0.04, stagger: { amount: 0.42 } },
            0.42,
          )
          .from(q('[data-fact]'), { opacity: 0, y: 24, duration: 0.08, stagger: 0.025 }, 0.84)
          .to({}, { duration: 0.04 })
      })
      mm.add('(max-width: 899px)', () => {
        gsap.from(title, {
          yPercent: 120,
          stagger: 0.02,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: root, start: 'top 70%', once: true },
        })
        ;(q('[data-fill]') as HTMLElement[]).forEach((p) => {
          gsap.fromTo(
            p.querySelectorAll(`.${styles.word}`),
            { opacity: 0.46 },
            {
              opacity: 1,
              stagger: 0.05,
              ease: 'none',
              scrollTrigger: { trigger: p, start: 'top 85%', end: 'bottom 55%', scrub: true },
            },
          )
        })
      })
      return () => {
        mm.revert()
        q('[data-hole]')[0]?.removeAttribute('transform')
      }
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section {...sectionProps(block, styles.manifesto)} ref={ref} aria-labelledby={headingId}>
      <div className={styles.sticky}>
        <div className={styles.visual} data-visual="" aria-hidden="true">
          <div className={styles.visualInner}>
            <Visual
              image={block.image}
              art={block.art || 'darkLogo'}
              tone="dark"
              sizes="(max-width: 900px) 80vw, 40vw"
            />
          </div>
        </div>

        <div className={cn('container', styles.content)}>
          <div className={styles.head}>
            <div data-eyebrow="">
              <Eyebrow text={block.eyebrow} index={index} className={styles.eyebrow} />
            </div>
            <h2 id={headingId} className={styles.title} data-title="">
              {block.title}
            </h2>
            {block.imageCaption && (
              <p className={styles.caption} data-caption="">
                {block.imageCaption}
              </p>
            )}
          </div>
          <div className={styles.body} data-body="">
            {block.paragraphs?.map((p, i) => (
              <p key={p.id || i} className={cn(styles.paragraph, i === 0 && styles.first)}>
                {/* aria-label isn't allowed on <p>, so screen readers get a clean copy and the split one is hidden */}
                <span className="sr-only">{p.text}</span>
                <span aria-hidden="true" className={styles.fillText} data-fill="">
                  {p.text}
                </span>
              </p>
            ))}
            {block.facts?.length ? (
              <dl className={styles.facts}>
                {block.facts.map((f) => (
                  <div key={f.id || f.label} className={styles.fact} data-fact="">
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>

        {/* White world with a logomark-shaped window; the window grows until it swallows the screen */}
        <svg
          className={styles.mask}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <mask
              id={`pocket-${uid}`}
              maskUnits="userSpaceOnUse"
              x="-30000"
              y="-30000"
              width="60000"
              height="60000"
            >
              <rect x="-30000" y="-30000" width="60000" height="60000" fill="#fff" />
              <g transform={`translate(${500 - 335.66} ${500 - 400})`}>
                <g data-hole="">
                  <path d={MARK_FIELD} fill="#000" />
                  <path d={MARK_SEED} fill="#000" />
                </g>
              </g>
            </mask>
          </defs>
          <rect
            x="-30000"
            y="-30000"
            width="60000"
            height="60000"
            fill="#ffffff"
            mask={`url(#pocket-${uid})`}
          />
        </svg>
      </div>
    </section>
  )
}
