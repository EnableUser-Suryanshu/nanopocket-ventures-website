'use client'

import { useRef } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { cn } from '@/lib/cn'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'

type Props = {
  text: string
  as?: Tag
  className?: string
  /** Granularity of the reveal. */
  by?: 'lines' | 'words' | 'chars'
  delay?: number
  stagger?: number
  duration?: number
  /** Hero text waits for the preloader instead of a scroll trigger. */
  waitForIntro?: boolean
  start?: string
  id?: string
}

/**
 * Masked text reveal (words/lines slide up from behind a mask) — the signature prokit motion.
 * Screen readers get one clean copy of the text; the animated copy is aria-hidden.
 */
export function SplitReveal({
  text,
  as: Tag = 'div',
  className,
  by = 'words',
  delay = 0,
  stagger,
  duration = 1.1,
  waitForIntro = false,
  start = 'top 88%',
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const { reduced, introDone } = useMotion()

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced) return
      if (waitForIntro && !introDone) return
      const visual = root.querySelector<HTMLElement>('[data-split-visual]')
      if (!visual) return

      SplitText.create(visual, {
        type: by === 'chars' ? 'words,chars' : by === 'lines' ? 'lines' : 'words',
        mask: by === 'lines' ? 'lines' : 'words',
        wordsClass: 'split-word',
        linesClass: 'split-line',
        charsClass: 'split-char',
        autoSplit: true,
        aria: 'none',
        onSplit(self) {
          const targets = by === 'chars' ? self.chars : by === 'lines' ? self.lines : self.words
          gsap.set(root, { opacity: 1 })
          return gsap.from(targets, {
            yPercent: 115,
            rotate: by === 'lines' ? 0 : 4,
            duration,
            delay,
            ease: 'expo.out',
            stagger: stagger ?? (by === 'chars' ? 0.018 : by === 'words' ? 0.05 : 0.09),
            scrollTrigger: waitForIntro ? undefined : { trigger: root, start, once: true },
          })
        },
      })
    },
    { scope: ref, dependencies: [reduced, introDone, text], revertOnUpdate: true },
  )

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)} id={id} data-animate="">
      <span className="sr-only">{text}</span>
      <span data-split-visual="" aria-hidden="true" style={{ display: 'block' }}>
        {text}
      </span>
    </Tag>
  )
}
