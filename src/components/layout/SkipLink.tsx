'use client'

import { useMotion } from '@/components/providers/MotionProvider'

/** WCAG 2.4.1 bypass block — moves focus to the main content without breaking smooth scroll. */
export function SkipLink({ label }: { label: string }) {
  const { scrollToTarget } = useMotion()
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(e) => {
        const main = document.getElementById('main-content')
        if (!main) return
        e.preventDefault()
        scrollToTarget(main)
      }}
    >
      {label}
    </a>
  )
}
