'use client'

import { useMotion } from '@/components/providers/MotionProvider'
import { useSiteLabels } from '@/components/providers/SiteLabels'
import { ArrowRight } from '@/components/ui/Icons'

export function BackToTop() {
  const { scrollToTarget } = useMotion()
  const labels = useSiteLabels()
  return (
    <button
      type="button"
      onClick={() => {
        const target = document.getElementById('main-content')
        if (target) scrollToTarget(target)
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        minHeight: 44,
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        color: '#fff',
        borderRadius: 999,
      }}
    >
      {labels.backToTop}
      <ArrowRight className="back-to-top-icon" />
    </button>
  )
}
