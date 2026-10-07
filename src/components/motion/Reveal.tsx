'use client'

import { useRef } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { gsap, useGSAP } from '@/lib/gsap'

type Props = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'ul' | 'ol' | 'dl' | 'figure' | 'p' | 'li'
  /** CSS selector for children to stagger; defaults to the element itself. */
  stagger?: string
  y?: number
  delay?: number
  start?: string
  style?: React.CSSProperties
}

/** Fade + rise on scroll. Children are visible immediately when motion is off. */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
  stagger,
  y = 40,
  delay = 0,
  start = 'top 88%',
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const { reduced } = useMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reduced) return
      const targets = stagger ? el.querySelectorAll(stagger) : el
      gsap.set(el, { opacity: 1 })
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 1.1,
        delay,
        ease: 'expo.out',
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: { trigger: el, start, once: true },
      })
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <Tag ref={ref as React.Ref<never>} className={className} data-animate="" style={style}>
      {children}
    </Tag>
  )
}
