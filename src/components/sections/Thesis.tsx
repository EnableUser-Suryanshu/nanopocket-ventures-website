'use client'

import { useEffect, useId, useRef, useState } from 'react'

import { Visual } from '@/components/art/Visual'
import { Counter } from '@/components/motion/Counter'
import { Marquee } from '@/components/motion/Marquee'
import { Reveal } from '@/components/motion/Reveal'
import { useMotion } from '@/components/providers/MotionProvider'
import { useSiteLabels } from '@/components/providers/SiteLabels'
import { Plus } from '@/components/ui/Icons'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { useMediaQuery } from '@/lib/useMediaQuery'
import type { ThesisBlock } from '@/payload-types'

import { Collapse } from './Collapse'
import { SectionHeader } from './SectionHeader'
import { sectionProps } from './section-props'
import styles from './Thesis.module.css'

type Sector = NonNullable<ThesisBlock['sectors']>[number]

/** “Where Are We Investing” — key facts, then the sector thesis as prokit’s numbered portfolio list. */
export function Thesis({ block, index }: { block: ThesisBlock; index?: number }) {
  const ref = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const { reduced } = useMotion()
  const labels = useSiteLabels()
  const uid = useId().replace(/:/g, '')
  const sectors = block.sectors || []
  const [open, setOpen] = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const headingId = `${block.anchorId}-title`

  // Cursor-following preview of the hovered sector (decorative).
  useEffect(() => {
    const el = previewRef.current
    const list = ref.current?.querySelector<HTMLElement>('[data-list]')
    if (!el || !list || !finePointer || reduced) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    const rTo = gsap.quickTo(el, 'rotate', { duration: 0.8, ease: 'power3.out' })
    let lastX = 0
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.6))
      lastX = e.clientX
    }
    list.addEventListener('pointermove', onMove)
    return () => list.removeEventListener('pointermove', onMove)
  }, [finePointer, reduced])

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced) return
      const q = gsap.utils.selector(root)
      gsap.from(q('[data-row]'), {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: q('[data-list]')[0], start: 'top 82%', once: true },
      })
      gsap.from(q('[data-row-rule]'), {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.4,
        ease: 'expo.inOut',
        stagger: 0.06,
        scrollTrigger: { trigger: q('[data-list]')[0], start: 'top 82%', once: true },
      })
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  const showPreview = finePointer && !reduced && hovered !== null && open !== hovered

  return (
    <section
      {...sectionProps(block, cn('section', styles.thesis))}
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

        {block.facts?.length ? (
          <Reveal as="dl" className={styles.facts} stagger="[data-fact]">
            {block.facts.map((f) => (
              <div key={f.id || f.label} className={styles.fact} data-fact="">
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd className={styles.factValue}>
                  <Counter value={f.value} />
                </dd>
                {f.note && <dd className={styles.factNote}>{f.note}</dd>}
              </div>
            ))}
          </Reveal>
        ) : null}

        {block.intro && (
          <Reveal>
            <p className={cn('lead', styles.intro)}>{block.intro}</p>
          </Reveal>
        )}
      </div>

      {block.listTitle && (
        <div className={styles.listHead} aria-hidden="true">
          <Marquee speed={36} scrollLinked>
            {[0, 1, 2].map((k) => (
              <span key={k} className={styles.listTitle}>
                {block.listTitle}
                <span className={styles.listStar}>✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      )}

      {block.pillars?.length ? (
        <Marquee className={styles.band} speed={40}>
          {block.pillars.map((p) => (
            <span key={p.id || p.text} className={styles.bandItem}>
              {p.text}
              <span className={styles.bandDot} aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      ) : null}

      <div className="container">
        <ul className={styles.list} data-list="" onPointerLeave={() => setHovered(null)}>
          {sectors.map((s: Sector, i) => {
            const isOpen = open === i
            const panelId = `${uid}-panel-${i}`
            return (
              <li
                key={s.id || s.name}
                className={cn(styles.row, isOpen && styles.open)}
                data-row=""
              >
                <span className={styles.rule} data-row-rule="" aria-hidden="true" />
                <h3 className={styles.rowHeading}>
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onPointerEnter={() => setHovered(i)}
                    data-cursor={
                      isOpen ? block.closeLabel || 'Close' : block.openLabel || labels.viewLabel
                    }
                  >
                    <span className={styles.meta}>
                      <span className={styles.index} aria-hidden="true">
                        ({String(i + 1).padStart(2, '0')})
                      </span>
                      {s.category && <span className={styles.category}>{s.category}</span>}
                    </span>
                    <span className={styles.name}>{s.name}</span>
                    <span className={styles.icon} aria-hidden="true">
                      <Plus />
                    </span>
                  </button>
                </h3>
                <Collapse id={panelId} open={isOpen} label={s.name} className={styles.panel}>
                  <div className={styles.panelInner}>
                    <div className={styles.panelArt}>
                      <Visual
                        image={s.image}
                        art={s.art}
                        tone="dark"
                        sizes="(max-width: 900px) 90vw, 30vw"
                      />
                    </div>
                    <div className={styles.panelBody}>
                      {s.summary && <p className={cn('lead', styles.summary)}>{s.summary}</p>}
                      {s.tags?.length ? (
                        <ul className={styles.tags}>
                          {s.tags.map((t) => (
                            <li key={t.id || t.text}>
                              <span className={styles.tagDot} aria-hidden="true" />
                              {t.text}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {s.notes?.length ? (
                        <dl className={styles.notes}>
                          {s.notes.map((n) => (
                            <div key={n.id || n.label} className={styles.note}>
                              <dt>{n.label}</dt>
                              <dd>{n.body}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        block.pendingLabel && <p className={styles.pending}>{block.pendingLabel}</p>
                      )}
                    </div>
                  </div>
                </Collapse>
              </li>
            )
          })}

          {block.other?.title && (
            <li className={cn(styles.row, styles.other)} data-row="">
              <span className={styles.rule} data-row-rule="" aria-hidden="true" />
              <div className={styles.otherInner}>
                <span className={styles.meta}>
                  <span className={styles.index}>
                    ({String(sectors.length + 1).padStart(2, '0')})
                  </span>
                </span>
                <h3 className={styles.otherTitle}>{block.other.title}</h3>
                <p className={styles.otherText}>
                  {block.other.textBefore}{' '}
                  {block.other.link?.label && block.other.link.href && (
                    <SmartLink
                      href={block.other.link.href}
                      newTab={block.other.link.newTab}
                      className={cn('text-link', styles.otherLink)}
                    >
                      {block.other.link.label}
                    </SmartLink>
                  )}{' '}
                  {block.other.textAfter}
                </p>
              </div>
            </li>
          )}
        </ul>
      </div>

      {finePointer && !reduced && (
        <div ref={previewRef} className={styles.preview} aria-hidden="true">
          <div className={cn(styles.previewCard, showPreview && styles.previewOn)}>
            {sectors.map((s, i) => (
              <div
                key={s.id || i}
                className={cn(styles.previewItem, hovered === i && styles.previewActive)}
              >
                <Visual image={s.image} art={s.art} tone="dark" sizes="320px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
