'use client'

import { useEffect, useRef, useState } from 'react'

import { RENDERS } from '@/components/art/renders'
import { Visual } from '@/components/art/Visual'
import { Logo } from '@/components/brand/Logo'
import { MotionToggle } from '@/components/layout/MotionToggle'
import { useMotion } from '@/components/providers/MotionProvider'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from '@/components/ui/Icons'
import { cn } from '@/lib/cn'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import type { HeroBlock, StatementBlock } from '@/payload-types'

import styles from './HeroStatement.module.css'
import { Tile, type TileData } from './Tile'

const COLS = 5
const PILL_SLIDES = 6
const PILL_INTERVAL = 2400

/**
 * The photo inside the headline (Prokit “photo in text”): an uploaded image, or a reel of the
 * 3D renders that wipes to the next one every few seconds. Stops when motion is paused or off-screen.
 */
function PhotoPill({ image, arts }: { image: HeroBlock['inlineImage']; arts: string[] }) {
  const ref = useRef<HTMLSpanElement>(null)
  const { reduced } = useMotion()
  const [active, setActive] = useState(0)
  const uploaded = image && typeof image === 'object'
  const count = uploaded ? 1 : arts.length

  useEffect(() => {
    const el = ref.current
    if (reduced || count < 2 || !el) return
    let timer = 0
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer)
      if (entry.isIntersecting) {
        timer = window.setInterval(() => setActive((a) => (a + 1) % count), PILL_INTERVAL)
      }
    })
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearInterval(timer)
    }
  }, [reduced, count])

  return (
    <span ref={ref} className={styles.pill} data-pill="">
      {uploaded ? (
        <Visual image={image} sizes="240px" priority />
      ) : (
        arts.map((art, i) => (
          <span
            key={art}
            className={styles.slide}
            data-state={i === active ? 'on' : i === (active - 1 + count) % count ? 'out' : 'in'}
          >
            <Visual art={art} sizes="240px" priority={i === 0} />
          </span>
        ))
      )}
    </span>
  )
}

/**
 * Prokit’s signature opening: the hero (stacked tagline + tilted moving wall) pins, slides sideways,
 * the wall swings flat and becomes the backdrop, and the white statement card glides in and shrinks.
 */
export function HeroStatement({
  hero,
  statement,
}: {
  hero: HeroBlock
  statement?: StatementBlock | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { reduced, introDone } = useMotion()
  const fullTagline = `${hero.lineOne} ${hero.highlight} ${hero.lineTwo}`
  const tiles: TileData[] = (hero.tiles?.length ? hero.tiles : statement?.tiles) || []
  // Pill reel: the chosen inline render first, then the wall's renders (photographic ones only)
  const pillArts = [hero.inlineArt, ...tiles.map((t) => t.art)]
    .filter((a): a is string => Boolean(a && RENDERS[a] && a !== 'bannerGlobe'))
    .filter((a, i, all) => all.indexOf(a) === i)
    .slice(0, PILL_SLIDES)
  const columns = Array.from({ length: COLS }, (_, c) => tiles.filter((_, i) => i % COLS === c))
  const lines = statement?.lines || []
  const plain = lines.map((l) => [l.before, l.after].filter(Boolean).join(' ')).join(' ')

  /*
   * Intro (after the preloader), as on Prokit: each line’s letters rise one by one out of the line’s
   * mask while fading in, line after line; then the photo opens in front of “Discover” and pushes it
   * along, the caption (if any) fades in and the red underline draws.
   */
  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced || !introDone) return
      const q = gsap.utils.selector(root)
      gsap.set(q('[data-animate]'), { opacity: 1 })

      // Letters rise inside per-word masks (padded for descenders — see .split-word-mask)
      const letters = (sel: string) =>
        SplitText.create(q(sel), {
          type: 'words,chars',
          mask: 'words',
          wordsClass: 'split-word',
          tag: 'span',
          aria: 'none',
        }).chars as HTMLElement[]
      const one = letters('[data-line-one]')
      const three = letters('[data-line-two]')

      // “Discover” is gold gradient text: give every letter its slice of one continuous gradient,
      // then swap back to the single shimmering word once the letters have landed.
      const word = q('[data-highlight-text]')[0] as HTMLElement | undefined
      const goldClasses = ['gold-text', 'gold-text--shimmer']
      const wordSplit = word
        ? SplitText.create(word, { type: 'chars', tag: 'span', aria: 'none' })
        : null
      const two = (wordSplit?.chars || []) as HTMLElement[]
      if (word && two.length) {
        const width = word.offsetWidth
        word.classList.remove(...goldClasses)
        two.forEach((char) => {
          char.classList.add('gold-text')
          char.style.backgroundSize = `${width * 2.2}px 100%`
          char.style.backgroundPosition = `${-char.offsetLeft}px 50%`
        })
      }

      const rise = { yPercent: 110, opacity: 0 }
      const land = (stagger: number) => ({
        yPercent: 0,
        opacity: 1,
        duration: 0.62,
        ease: 'power3.out',
        stagger,
      })
      gsap
        .timeline()
        .fromTo(one, rise, land(0.032), 0)
        .fromTo(two, rise, land(0.045), 0.5)
        .fromTo(three, rise, land(0.03), 0.82)
        .add(() => {
          // letters are home — hand “Discover” back to the single shimmering gradient word
          wordSplit?.revert()
          word?.classList.add(...goldClasses)
        }, 1.75)
        .fromTo(
          q('[data-pill]'),
          { width: 0, marginRight: 0 },
          { width: '15vw', marginRight: '0.2em', duration: 1.2, ease: 'expo.inOut' },
          1.45,
        )
        .from(q('[data-caption]'), { y: 14, opacity: 0, duration: 0.9, ease: 'power3.out' }, 2.05)
        .fromTo(
          q('[data-swoosh]'),
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut' },
          1.85,
        )
        .from(
          q('[data-fade]'),
          { y: 16, opacity: 0, duration: 0.9, stagger: 0.07, ease: 'power3.out' },
          2.1,
        )
        .from(
          q('[data-column]'),
          { yPercent: 35, opacity: 0, duration: 1.9, stagger: 0.09, ease: 'expo.out' },
          0.1,
        )
      return () => {
        if (word) word.classList.add(...goldClasses)
      }
    },
    { scope: ref, dependencies: [reduced, introDone], revertOnUpdate: true },
  )

  /* Scroll choreography (desktop) / simple reveals (mobile) */
  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced) return
      const q = gsap.utils.selector(root)
      const words = SplitText.create(q('[data-statement]'), {
        type: 'words',
        mask: 'words',
        wordsClass: 'split-word',
        aria: 'none',
      }).words
      gsap.set(q('[data-statement-wrap]'), { opacity: 1 })

      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 1 },
        })
        // force3D on the big layers: stay on the GPU for the whole scene (no 3D↔2D flip re-rasterising)
        tl.to(
          q('[data-hero]'),
          { xPercent: -45, opacity: 0, duration: 0.36, ease: 'power2.in', force3D: true },
          0,
        )
          .to(q('[data-bottom]'), { opacity: 0, y: 20, duration: 0.12 }, 0)
          // x:0 clears the pixel offset GSAP parses from the CSS start transform (no-flash state)
          .fromTo(
            q('[data-wall]'),
            { x: 0, rotate: 24, xPercent: 30, scale: 1.35 },
            {
              x: 0,
              rotate: 0,
              xPercent: 0,
              scale: 1.02,
              duration: 0.5,
              ease: 'power2.inOut',
              force3D: true,
            },
            0,
          )
          .fromTo(
            q('[data-wall-wrap]'),
            { '--fade': 1 },
            { '--fade': 0, duration: 0.42, ease: 'power1.inOut' },
            0,
          )
          .fromTo(
            q('[data-card]'),
            { x: 0, xPercent: 100 },
            { x: 0, xPercent: 0, duration: 0.3, ease: 'power3.inOut', force3D: true },
            0.3,
          )
          .from(
            words,
            { yPercent: 120, rotate: 4, duration: 0.22, stagger: 0.008, ease: 'power3.out' },
            0.5,
          )
          .from(
            q('[data-inline]'),
            { scale: 0, duration: 0.14, stagger: 0.04, ease: 'back.out(1.6)' },
            0.6,
          )
          .fromTo(
            q('[data-card]'),
            { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
            { clipPath: 'inset(11% 7% 11% 7% round 30px)', duration: 0.3, ease: 'power2.inOut' },
            0.66,
          )
          .to({}, { duration: 0.06 })
      })
      mm.add('(max-width: 1023px)', () => {
        gsap.from(words, {
          yPercent: 120,
          duration: 1.1,
          stagger: 0.04,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('[data-card]')[0], start: 'top 75%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <div ref={ref} className={styles.scene}>
      <div className={styles.sticky}>
        {/* Moving wall — tilted columns that later become the statement backdrop */}
        {tiles.length > 0 && (
          <div className={styles.wallWrap} data-wall-wrap="" aria-hidden="true">
            <div className={styles.wall} data-wall="">
              {columns.map((col, c) => (
                <div
                  key={c}
                  className={cn(styles.column, c % 2 ? styles.down : styles.up)}
                  data-column=""
                >
                  <div className={styles.track}>
                    {[...col, ...col, ...col].map((tile, i) => (
                      // the top of each column is on screen at load
                      <Tile key={`${c}-${i}`} tile={tile} priority={i < 2} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <section id={hero.anchorId || 'home'} className={styles.hero} data-hero="">
          <div className={cn('container', styles.heroInner)}>
            <h1 className={styles.title} data-title="">
              <span className="sr-only">{fullTagline}</span>
              <span aria-hidden="true" className={styles.lines}>
                <span className={styles.lineOne} data-line-one="" data-animate="">
                  {hero.lineOne}
                </span>
                <span className={styles.row}>
                  {(pillArts.length > 0 || hero.inlineImage) && (
                    <PhotoPill image={hero.inlineImage} arts={pillArts} />
                  )}
                  <span className={styles.highlight} data-highlight="" data-animate="">
                    <span className="gold-text gold-text--shimmer" data-highlight-text="">
                      {hero.highlight}
                    </span>
                  </span>
                </span>
                {/* Last line with the small caption beside it, as on Prokit (“Create — We start with ideas…”) */}
                <span className={styles.lastRow}>
                  <span className={styles.lineTwoWrap}>
                    <span className={styles.lineTwo} data-line-two="" data-animate="">
                      {hero.lineTwo}
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
                  {hero.subline && (
                    <span className={styles.heroCaption} data-caption="" data-animate="">
                      {hero.subline}
                    </span>
                  )}
                </span>
              </span>
            </h1>
            {/* the visual caption sits inside the heading's hidden layout; screen readers get it here */}
            {hero.subline && <p className="sr-only">{hero.subline}</p>}
            {hero.ctas?.length ? (
              <div className={styles.meta}>
                {hero.ctas?.length ? (
                  <div className={styles.ctas}>
                    {hero.ctas.map((c) => (
                      <span
                        key={c.id || c.label}
                        data-fade=""
                        data-animate=""
                        className={styles.ctaItem}
                      >
                        <Button
                          label={c.label}
                          href={c.href}
                          newTab={c.newTab}
                          variant={c.variant}
                        />
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        <div className={cn('container', styles.bottom)} data-bottom="" data-fade="" data-animate="">
          <div className={styles.scroll} aria-hidden="true">
            <span>(</span>
            <span className={styles.scrollRoll}>
              <span>{hero.scrollLabel}</span>
              <span>{hero.scrollLabel}</span>
            </span>
            <span>)</span>
          </div>
          <MotionToggle />
        </div>

        {statement && lines.length > 0 && (
          <section id={statement.anchorId || 'statement'} className={styles.card} data-card="">
            <div className={cn('container', styles.cardText)}>
              <p className="sr-only">{plain}</p>
              <div className={styles.statement} data-statement-wrap="" data-animate="">
                {lines.map((line, i) => (
                  <div key={line.id || i} className={styles.line}>
                    <span data-statement="" aria-hidden="true">
                      {line.before}
                    </span>
                    {line.inline === 'caption' && statement.caption && (
                      <span className={styles.caption} data-inline="" aria-hidden="true">
                        {statement.caption}
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
                    {line.inline === 'button' &&
                      statement.button?.label &&
                      statement.button.href && (
                        <span className={styles.inlineButton} data-inline="">
                          <Button
                            label={statement.button.label}
                            href={statement.button.href}
                            newTab={statement.button.newTab}
                          />
                        </span>
                      )}
                    {line.after && (
                      <span data-statement="" aria-hidden="true">
                        {line.after}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
