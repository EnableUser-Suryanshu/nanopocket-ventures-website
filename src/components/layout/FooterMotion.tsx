'use client'

import { useRef } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

/**
 * Footer animations: the catchphrase rises line by line, the logo block, buttons and columns fade up,
 * and the brand-colour wordmark climbs out of the bottom edge while a light band sweeps across it.
 */
export function FooterMotion() {
  const ref = useRef<HTMLSpanElement>(null)
  const { reduced } = useMotion()

  useGSAP(
    () => {
      const footer = ref.current?.closest('footer')
      if (!footer || reduced) return
      const q = gsap.utils.selector(footer)

      const statement = q('[data-f-statement]')[0] as HTMLElement | undefined
      if (statement) {
        gsap.from(statement.querySelectorAll('[data-f-line]'), {
          yPercent: 110,
          rotate: 2.5,
          duration: 1.3,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: statement, start: 'top 88%', once: true },
        })
      }

      ;(q('[data-f-reveal]') as HTMLElement[]).forEach((group) => {
        gsap.from(group.querySelectorAll('[data-f-item]'), {
          y: 36,
          opacity: 0,
          duration: 1.1,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: group, start: 'top 90%', once: true },
        })
      })

      const mark = q('[data-f-wordmark]')[0] as HTMLElement | undefined
      const svg = mark?.querySelector('svg')
      if (!mark || !svg) return
      gsap.fromTo(
        svg,
        { yPercent: 62 },
        {
          yPercent: 0,
          ease: 'none',
          force3D: true,
          scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
        },
      )
      const sheen = mark.querySelector('[data-sheen]')
      if (!sheen) return
      const sweep = gsap.fromTo(
        sheen,
        { attr: { gradientTransform: 'translate(-700 0)' } },
        {
          attr: { gradientTransform: 'translate(1500 0)' },
          duration: 2.6,
          ease: 'power2.inOut',
          repeat: -1,
          repeatDelay: 2.2,
          paused: true,
        },
      )
      // Only sweep while the wordmark is on screen
      ScrollTrigger.create({
        trigger: mark,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? sweep.play() : sweep.pause()),
      })
    },
    { dependencies: [reduced], revertOnUpdate: true },
  )

  return <span ref={ref} hidden />
}
