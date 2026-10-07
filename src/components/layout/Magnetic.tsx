'use client'

import { useEffect } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { gsap } from '@/lib/gsap'

/** Buttons drift towards the cursor and spring back (desktop, motion on). Delegated — no wrappers needed. */
export function Magnetic() {
  const { reduced } = useMotion()

  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const setters = new WeakMap<HTMLElement, { x: (v: number) => void; y: (v: number) => void }>()
    let current: HTMLElement | null = null

    const get = (el: HTMLElement) => {
      let s = setters.get(el)
      if (!s) {
        s = {
          x: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' }),
        }
        setters.set(el, s)
      }
      return s
    }
    const release = (el: HTMLElement) => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)', overwrite: true })
      setters.delete(el)
    }
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('.btn, [data-magnetic]')
      if (current && current !== el) {
        release(current)
        current = null
      }
      if (!el) return
      current = el
      const b = el.getBoundingClientRect()
      const s = get(el)
      s.x((e.clientX - (b.left + b.width / 2)) * 0.28)
      s.y((e.clientY - (b.top + b.height / 2)) * 0.4)
    }
    const onLeaveWindow = () => {
      if (current) release(current)
      current = null
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeaveWindow)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
    }
  }, [reduced])

  return null
}
