'use client'

import { useRef } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { gsap, useGSAP } from '@/lib/gsap'

/** Counts every number inside a string up from zero when scrolled into view (e.g. “₹1.5 Crores”, “10–12”). */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const { reduced } = useMotion()
  const parts = value.split(/(\d+(?:[.,]\d+)?)/)

  useGSAP(
    () => {
      if (reduced || !ref.current) return
      const nums = ref.current.querySelectorAll<HTMLElement>('[data-num]')
      nums.forEach((el) => {
        const raw = el.dataset.num || '0'
        const decimals = raw.includes('.') ? raw.split('.')[1].length : 0
        const target = parseFloat(raw.replace(/,/g, ''))
        const obj = { v: 0 }
        el.textContent = (0).toFixed(decimals)
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals)
          },
        })
      })
      return () => nums.forEach((el) => (el.textContent = el.dataset.num || ''))
    },
    { scope: ref, dependencies: [reduced, value], revertOnUpdate: true },
  )

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {parts.map((part, i) =>
          /^\d/.test(part) ? (
            <span key={i} data-num={part} style={{ fontVariantNumeric: 'tabular-nums' }}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    </span>
  )
}
