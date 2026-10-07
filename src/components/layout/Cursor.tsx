'use client'

import { useEffect, useRef, useState } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { useSiteLabels } from '@/components/providers/SiteLabels'
import { gsap } from '@/lib/gsap'
import { useMediaQuery } from '@/lib/useMediaQuery'

import styles from './Cursor.module.css'

/**
 * Decorative trailing dot (prokit). The native cursor is kept for accessibility.
 * Elements with data-cursor="view" (or a custom label) expand it into a label bubble.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const { reduced } = useMotion()
  const labels = useSiteLabels()
  const [label, setLabel] = useState('')
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const enabled = finePointer && !reduced

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })
    let visible = false

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        gsap.set(el, { x: e.clientX, y: e.clientY })
        gsap.to(el, { autoAlpha: 1, duration: 0.3 })
        visible = true
      }
      xTo(e.clientX)
      yTo(e.clientY)
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]')
      const next = target
        ? target.dataset.cursor === 'view'
          ? labels.viewLabel
          : target.dataset.cursor || ''
        : ''
      setLabel((prev) => (prev === next ? prev : next))
    }
    const onLeave = () => {
      visible = false
      gsap.to(el, { autoAlpha: 0, duration: 0.3 })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, labels.viewLabel])

  if (!enabled) return null
  return (
    <div
      ref={ref}
      className={styles.cursor}
      data-active={label ? '' : undefined}
      aria-hidden="true"
    >
      <span className={styles.label}>{label}</span>
    </div>
  )
}
