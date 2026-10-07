'use client'

import { useRef } from 'react'

import { PitchForm } from '@/components/forms/PitchForm'
import { Reveal } from '@/components/motion/Reveal'
import { SplitReveal } from '@/components/motion/SplitReveal'
import { useMotion } from '@/components/providers/MotionProvider'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@/lib/cn'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import type { PitchBlock, PitchForm as PitchFormConfig } from '@/payload-types'

import { Eyebrow } from './Eyebrow'
import styles from './Pitch.module.css'
import { sectionProps } from './section-props'

/**
 * Pitch To Us — prokit’s dark “Let’s talk” section: a gold spotlight follows the cursor and the giant
 * title’s letters lift towards the pointer. Hosts the multi-step founder application.
 */
export function Pitch({
  block,
  index,
  config,
  directUpload,
}: {
  block: PitchBlock
  index?: number
  config: PitchFormConfig
  directUpload?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const { reduced } = useMotion()
  const headingId = `${block.anchorId}-title`

  useGSAP(
    () => {
      const root = ref.current
      const visual = root?.querySelector<HTMLElement>('[data-title-visual]')
      if (!root || !visual || reduced) return
      const split = SplitText.create(visual, {
        type: 'chars',
        charsClass: styles.char,
        aria: 'none',
      })
      gsap.set(root.querySelector('[data-title]'), { opacity: 1 })
      gsap.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        rotate: 8,
        duration: 1.3,
        stagger: 0.035,
        ease: 'expo.out',
        scrollTrigger: { trigger: visual, start: 'top 92%', once: true },
      })

      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
      const setters = (split.chars as HTMLElement[]).map((el) => ({
        el,
        y: gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' }),
        r: gsap.quickTo(el, 'rotate', { duration: 0.7, ease: 'power3.out' }),
      }))
      const onMove = (e: PointerEvent) => {
        const box = root.getBoundingClientRect()
        root.style.setProperty('--mx', `${e.clientX - box.left}px`)
        root.style.setProperty('--my', `${e.clientY - box.top}px`)
        setters.forEach((s) => {
          const b = s.el.getBoundingClientRect()
          const cx = b.left + b.width / 2
          const cy = b.top + b.height / 2
          const f = Math.max(0, 1 - Math.hypot(e.clientX - cx, e.clientY - cy) / 280)
          s.y(-f * 28)
          s.r((e.clientX - cx) * f * 0.05)
        })
      }
      const onLeave = () => setters.forEach((s) => (s.y(0), s.r(0)))
      root.addEventListener('pointermove', onMove)
      root.addEventListener('pointerleave', onLeave)
      return () => {
        root.removeEventListener('pointermove', onMove)
        root.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section
      {...sectionProps(block, cn('section', styles.pitch))}
      ref={ref}
      aria-labelledby={headingId}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={cn('container', styles.grid)}>
        <div className={styles.intro}>
          <Eyebrow text={block.eyebrow} index={index} />
          {block.tagline && (
            <SplitReveal as="p" text={block.tagline} className={styles.tagline} by="words" />
          )}
          <Reveal className={styles.copy} stagger="[data-item]">
            {block.intro && (
              <p className={styles.lead} data-item="">
                {block.intro}
              </p>
            )}
            {block.note && (
              <p className={styles.note} data-item="">
                {block.note}
              </p>
            )}
            {block.noteLinks?.length ? (
              <div className={styles.links} data-item="">
                {block.noteLinks.map((l) => (
                  <SmartLink
                    key={l.id || l.href}
                    href={l.href}
                    newTab={l.newTab}
                    className="line-link"
                  >
                    {l.label}
                  </SmartLink>
                ))}
              </div>
            ) : null}
          </Reveal>
          <h2 id={headingId} className={styles.title} data-title="" data-animate="">
            <span className="sr-only">{block.title}</span>
            <span aria-hidden="true" data-title-visual="" className={styles.titleVisual}>
              {block.title}
            </span>
          </h2>
        </div>

        <Reveal className={styles.formCard} y={60}>
          <PitchForm config={config} directUpload={directUpload} />
        </Reveal>
      </div>
    </section>
  )
}
