'use client'

import { useRef } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'

/**
 * Small section label: (01) • Label. Decodes from scrambled characters when it scrolls into view.
 * Always black/white text — never gold or red.
 */
export function Eyebrow({
  text,
  index,
  className,
}: {
  text?: string | null
  index?: number
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { reduced } = useMotion()

  useGSAP(
    () => {
      const el = ref.current?.querySelector<HTMLElement>('[data-scramble]')
      if (!el || !text || reduced) return
      el.textContent = ''
      gsap.to(el, {
        duration: 1.4,
        ease: 'none',
        scrambleText: {
          text,
          chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
          speed: 0.5,
          revealDelay: 0.25,
        },
        scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
      })
      return () => {
        el.textContent = text
      }
    },
    { scope: ref, dependencies: [reduced, text], revertOnUpdate: true },
  )

  if (!text) return null
  return (
    <p ref={ref} className={cn('eyebrow', className)}>
      {typeof index === 'number' && (
        <span className="eyebrow__index" aria-hidden="true">
          ({String(index).padStart(2, '0')})
        </span>
      )}
      <span className="eyebrow__dot" aria-hidden="true" />
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" data-scramble="" className="eyebrow__text">
        {text}
      </span>
    </p>
  )
}
