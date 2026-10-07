'use client'

import { useEffect, useRef, useState } from 'react'

import { MARK_FIELD, MARK_SEED } from '@/components/brand/logo-paths'
import { useMotion } from '@/components/providers/MotionProvider'
import { gsap } from '@/lib/gsap'

import styles from './Preloader.module.css'

export const INTRO_KEY = 'np-intro'

/**
 * First-visit intro (once per session): the mark is drawn in outline, liquid gold fills the seed as the
 * counter runs to 100, the field turns red — then the mark flies into its place in the header logo.
 * Skipped entirely for reduced motion.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null)
  const { finishIntro } = useMotion()
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const skip = root.classList.contains('reduce-motion') || root.classList.contains('intro-seen')
    const el = ref.current
    if (skip || !el) {
      finishIntro()
      setGone(true)
      return
    }
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* ignore */
    }

    const q = gsap.utils.selector(el)
    const mark = q('[data-mark]')[0] as HTMLElement
    const fillRect = el.querySelector<SVGRectElement>('[data-fill]')
    const countEl = q('[data-count]')[0] as HTMLElement
    const outline = Array.from(el.querySelectorAll<SVGPathElement>('[data-outline]'))
    outline.forEach((p) => {
      const len = p.getTotalLength()
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = `${len}`
    })

    const counter = { v: 0 }
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
    tl.to(outline, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12 })
      .to(
        counter,
        {
          v: 100,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            countEl.textContent = String(Math.round(counter.v)).padStart(3, '0')
            if (fillRect) fillRect.setAttribute('y', String(800 - (counter.v / 100) * 470))
          },
        },
        0.2,
      )
      .to(q('[data-field]'), { opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.15')
      .to(outline, { opacity: 0, duration: 0.3 }, '<')
      .to(q('[data-meta]'), { opacity: 0, y: 10, duration: 0.4, stagger: 0.05 }, '<')
      .add(() => {
        // Fly the mark into the header logo’s mark position (FLIP)
        const logo = document.querySelector<SVGElement>('header a[aria-label] svg')
        if (!logo) return
        const target = logo.getBoundingClientRect()
        const from = mark.getBoundingClientRect()
        gsap.to(mark, {
          x: target.left - from.left,
          y: target.top - from.top,
          scale: target.height / from.height,
          transformOrigin: '0% 0%',
          duration: 1.05,
          ease: 'expo.inOut',
        })
      })
      .to(
        el,
        { backgroundColor: 'rgba(255,255,255,0)', duration: 0.9, ease: 'power2.inOut' },
        '+=0.15',
      )
      .add(() => finishIntro(), '-=0.55')
      .to(mark, { opacity: 0, duration: 0.25 }, '+=0.05')
      .add(() => setGone(true))

    return () => {
      tl.kill()
    }
  }, [finishIntro])

  if (gone) return null

  return (
    <div ref={ref} className={styles.preloader} aria-hidden="true">
      <div className={styles.mark} data-mark="">
        <svg viewBox="0 0 671.32 800" className={styles.svg}>
          <defs>
            <linearGradient
              id="pl-field"
              x1="361.42"
              y1="746.09"
              x2="584.49"
              y2="1480.19"
              gradientTransform="translate(-103 -821)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fb0707" />
              <stop offset="1" stopColor="#c60303" />
            </linearGradient>
            <linearGradient
              id="pl-seed"
              x1="271.61"
              y1="1121.17"
              x2="482"
              y2="1625.26"
              gradientTransform="translate(-103 -821)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fccf58" />
              <stop offset=".27" stopColor="#faab07" />
              <stop offset="1" stopColor="#be6304" />
            </linearGradient>
            <clipPath id="pl-seed-clip">
              <path d={MARK_SEED} />
            </clipPath>
          </defs>
          {/* outline drawing */}
          <path d={MARK_FIELD} className={styles.outline} data-outline="" />
          <path d={MARK_SEED} className={styles.outline} data-outline="" />
          {/* field turns red at the end */}
          <path d={MARK_FIELD} fill="url(#pl-field)" className={styles.field} data-field="" />
          {/* liquid gold rising inside the seed */}
          <g clipPath="url(#pl-seed-clip)">
            <rect data-fill="" x="0" y="800" width="680" height="480" fill="url(#pl-seed)" />
          </g>
        </svg>
      </div>
      <p className={styles.count} data-meta="">
        <span data-count="">000</span>
        <span className={styles.pct}>%</span>
      </p>
      <p className={styles.brand} data-meta="">
        NanoPocket Ventures
      </p>
    </div>
  )
}
