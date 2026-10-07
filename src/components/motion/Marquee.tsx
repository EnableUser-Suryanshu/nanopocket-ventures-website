'use client'

import { useRef } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { cn } from '@/lib/cn'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

type Props = {
  children: React.ReactNode
  className?: string
  /** Seconds for one full loop. */
  speed?: number
  reverse?: boolean
  /** Speeds up / reverses with scroll velocity (prokit “Review” band). */
  scrollLinked?: boolean
}

/** Infinite horizontal band. Decorative copies are hidden from assistive tech; pauses on hover. */
export function Marquee({
  children,
  className,
  speed = 30,
  reverse = false,
  scrollLinked = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { reduced } = useMotion()

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>('[data-track]')
      if (!track || reduced) return
      const tween = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: speed, ease: 'none', repeat: -1 },
      )
      const root = ref.current!
      const pause = () => gsap.to(tween, { timeScale: 0, duration: 0.6, overwrite: true })
      const play = () => gsap.to(tween, { timeScale: 1, duration: 0.6, overwrite: true })
      root.addEventListener('mouseenter', pause)
      root.addEventListener('mouseleave', play)

      let st: ScrollTrigger | undefined
      if (scrollLinked) {
        st = ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate(self) {
            const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 260)
            gsap.to(tween, {
              timeScale: (self.direction === 1 ? 1 : -1) * (1 + Math.abs(v)),
              duration: 0.3,
              overwrite: true,
            })
            gsap.to(tween, { timeScale: self.direction === 1 ? 1 : -1, duration: 1.2, delay: 0.3 })
          },
        })
      }
      return () => {
        root.removeEventListener('mouseenter', pause)
        root.removeEventListener('mouseleave', play)
        st?.kill()
      }
    },
    { scope: ref, dependencies: [reduced, speed, reverse, scrollLinked], revertOnUpdate: true },
  )

  return (
    <div ref={ref} className={cn('marquee', className)} style={{ overflow: 'hidden' }}>
      <div data-track="" style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}>
        <div style={{ display: 'flex', flex: 'none' }}>{children}</div>
        <div style={{ display: 'flex', flex: 'none' }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
