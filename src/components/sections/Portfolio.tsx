'use client'

import { useRef } from 'react'

import { Visual } from '@/components/art/Visual'
import { MARK_SEED } from '@/components/brand/logo-paths'
import { Counter } from '@/components/motion/Counter'
import { Reveal } from '@/components/motion/Reveal'
import { useMotion } from '@/components/providers/MotionProvider'
import { ArrowUpRight } from '@/components/ui/Icons'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import type { PortfolioBlock, PortfolioCompany } from '@/payload-types'

import styles from './Portfolio.module.css'
import { SectionHeader } from './SectionHeader'
import { sectionProps } from './section-props'

const N = 12
const C = 300
const R = 196

type Highlight = NonNullable<PortfolioBlock['highlights']>[number]

/** Twelve gold seeds on an orbit — one per planned investment — that light up as you scroll. */
function SeedOrbit({ highlights }: { highlights: Highlight[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { reduced } = useMotion()
  const center = highlights.find((h) => /\d/.test(h.value)) ?? highlights[0]
  const others = highlights.filter((h) => h !== center)

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced) return
      const q = gsap.utils.selector(root)
      const spokes = Array.from(root.querySelectorAll<SVGLineElement>('[data-spoke]'))
      spokes.forEach((l) => {
        const len = l.getTotalLength()
        l.style.strokeDasharray = `${len}`
        l.style.strokeDashoffset = `${len}`
      })
      // Rotate about the orbit centre with SVG’s native rotate(a cx cy) — reliable inside scaled SVGs.
      const orbit = root.querySelector('[data-orbit]') as SVGGElement
      const spin = { a: -40 }
      const applySpin = () => orbit.setAttribute('transform', `rotate(${spin.a} ${C} ${C})`)
      applySpin()
      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: 'top 85%', end: 'bottom 45%', scrub: 0.6 },
        })
        .to(spin, { a: 20, ease: 'none', duration: 1, onUpdate: applySpin }, 0)
        .fromTo(
          q('[data-seed]'),
          { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' },
          { opacity: 1, scale: 1, ease: 'back.out(2)', duration: 0.12, stagger: 0.07 },
          0.05,
        )
        .to(spokes, { strokeDashoffset: 0, ease: 'none', duration: 0.12, stagger: 0.07 }, 0.05)
      gsap.from(q('[data-tag]'), {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      })
      return () => orbit.removeAttribute('transform')
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  const seedScale = 0.07
  return (
    <div ref={ref} className={styles.orbitWrap}>
      <svg viewBox="0 0 600 600" className={styles.orbit} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="seed-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6c85e" />
            <stop offset="0.45" stopColor="#d99a00" />
            <stop offset="1" stopColor="#a86a05" />
          </linearGradient>
        </defs>
        <g className={styles.spinSlow}>
          <circle cx={C} cy={C} r="262" className={styles.ringDash} />
        </g>
        <circle cx={C} cy={C} r={R} className={styles.ring} />
        <g className={styles.spinReverse}>
          <circle cx={C} cy={C} r="118" className={styles.ringDash} />
        </g>
        <g data-orbit="">
          {Array.from({ length: N }, (_, i) => {
            // Rounded so server and browser produce identical markup (float trig differs in the last digits)
            const r2 = (n: number) => Math.round(n * 100) / 100
            const a = (i / N) * Math.PI * 2 - Math.PI / 2
            const x = r2(C + Math.cos(a) * R)
            const y = r2(C + Math.sin(a) * R)
            const ix = r2(C + Math.cos(a) * 92)
            const iy = r2(C + Math.sin(a) * 92)
            const deg = r2((a * 180) / Math.PI + 90)
            return (
              <g key={i}>
                <line x1={ix} y1={iy} x2={x} y2={y} className={styles.spoke} data-spoke="" />
                <g transform={`translate(${x} ${y}) rotate(${deg})`}>
                  <path
                    d={MARK_SEED}
                    transform={`scale(${seedScale}) translate(-295 -569)`}
                    className={styles.seedOutline}
                  />
                  <g data-seed="">
                    <path
                      d={MARK_SEED}
                      transform={`scale(${seedScale}) translate(-295 -569)`}
                      fill="url(#seed-gold)"
                    />
                  </g>
                </g>
              </g>
            )
          })}
        </g>
      </svg>
      {center && (
        <div className={styles.center}>
          <span className={styles.centerValue}>
            <Counter value={center.value} />
          </span>
          {center.label && <span className={styles.centerLabel}>{center.label}</span>}
        </div>
      )}
      {others.map((h, i) => (
        <p
          key={h.id || i}
          className={cn(styles.tag, i % 2 ? styles.tagB : styles.tagA)}
          data-tag=""
        >
          <span className={styles.tagValue}>{h.value}</span>
          {h.label && <span className={styles.tagLabel}>{h.label}</span>}
        </p>
      ))}
    </div>
  )
}

/** Portfolio Highlights — orbit visual, principles, optional key numbers and (when disclosed) companies. */
export function Portfolio({
  block,
  index,
  companies,
}: {
  block: PortfolioBlock
  index?: number
  companies: PortfolioCompany[]
}) {
  const headingId = `${block.anchorId}-title`
  const groups = block.numberGroups || []

  return (
    <section {...sectionProps(block, cn('section', styles.portfolio))} aria-labelledby={headingId}>
      <div className={cn('container', styles.layout)}>
        <div className={styles.left}>
          <SectionHeader
            id={headingId}
            eyebrow={block.eyebrow}
            title={block.title}
            tagline={block.tagline}
            index={index}
            ctas={block.ctas}
            align="stack"
            className={styles.header}
          />
          {block.pillars?.length ? (
            <Reveal as="ol" className={styles.pillars} stagger="[data-pillar]">
              {block.pillars.map((p, i) => (
                <li key={p.id || p.title} className={styles.pillar} data-pillar="">
                  <span className={styles.pillarIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className={styles.pillarTitle}>{p.title}</h3>
                    {p.body && <p className={styles.pillarBody}>{p.body}</p>}
                  </div>
                </li>
              ))}
            </Reveal>
          ) : null}
        </div>
        <div className={styles.right}>
          {block.highlights?.length ? <SeedOrbit highlights={block.highlights} /> : null}
        </div>
      </div>

      {block.showKeyNumbers && groups.length > 0 && (
        <div className={cn('container', styles.numbers)}>
          {groups.map((g) => (
            <Reveal key={g.id || g.title} className={styles.group} stagger="[data-num]">
              <h3 className={styles.groupTitle}>{g.title}</h3>
              <dl className={styles.groupGrid}>
                {g.items?.map((item) => (
                  <div key={item.id || item.label} className={styles.num} data-num="">
                    <dt>{item.label}</dt>
                    <dd className={cn(!item.value && styles.empty)}>
                      {item.value ? <Counter value={item.value} /> : block.emptyValue || '—'}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      )}

      {block.showCompanies && (
        <div className={cn('container', styles.companies)}>
          {block.companiesTitle && (
            <h3 className={styles.companiesTitle}>{block.companiesTitle}</h3>
          )}
          {companies.length ? (
            <Reveal as="ul" className={styles.companyGrid} stagger="[data-company]">
              {companies.map((c, i) => (
                <li key={c.id} className={styles.company} data-company="">
                  <div className={styles.companyLogo}>
                    <Visual
                      image={c.logo}
                      art={['glassSeed', 'orbitRings', 'spheres', 'lattice'][i % 4]}
                      tone="light"
                      sizes="320px"
                    />
                  </div>
                  <div className={styles.companyBody}>
                    <p className={styles.companyMeta}>
                      {[c.sector, c.stage, c.year].filter(Boolean).join(' · ')}
                    </p>
                    <h4 className={styles.companyName}>{c.name}</h4>
                    {c.description && <p className={styles.companyDesc}>{c.description}</p>}
                    {c.website && (
                      <SmartLink href={c.website} newTab className="line-link">
                        {block.visitLabel || 'Visit'} <span className="sr-only">{c.name}</span>
                        <ArrowUpRight className={styles.ext} />
                      </SmartLink>
                    )}
                  </div>
                </li>
              ))}
            </Reveal>
          ) : (
            block.emptyNote && (
              <p className={styles.emptyNote}>
                <span className={styles.emptyDot} aria-hidden="true" />
                {block.emptyNote}
              </p>
            )
          )}
        </div>
      )}
    </section>
  )
}
