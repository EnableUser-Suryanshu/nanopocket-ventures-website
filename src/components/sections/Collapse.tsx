'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { gsap } from '@/lib/gsap'

type Props = {
  open: boolean
  id: string
  label: string
  className?: string
  children: React.ReactNode
}

/**
 * Accessible disclosure panel with a smooth height animation (instant when motion is off).
 * `hidden` is managed imperatively after mount so the close animation can finish before hiding.
 */
export function Collapse({ open, id, label, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [initiallyOpen] = useState(open)
  const { reduced } = useMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (open) {
      el.hidden = false
      if (!reduced) {
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.9, ease: 'expo.out', overwrite: true },
        )
      }
    } else if (!el.hidden) {
      if (reduced) {
        el.hidden = true
        return
      }
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.inOut',
        overwrite: true,
        onComplete: () => {
          el.hidden = true
        },
      })
    }
  }, [open, reduced])

  return (
    <div
      ref={ref}
      id={id}
      role="region"
      aria-label={label}
      hidden={initiallyOpen ? undefined : true}
      className={className}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </div>
  )
}
