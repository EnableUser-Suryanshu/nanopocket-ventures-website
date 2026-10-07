'use client'

import { useMotion } from '@/components/providers/MotionProvider'
import { useSiteLabels } from '@/components/providers/SiteLabels'
import { PauseIcon, PlayIcon } from '@/components/ui/Icons'
import { cn } from '@/lib/cn'

import styles from './MotionToggle.module.css'

/** WCAG 2.2.2 — lets anyone pause every moving element (marquees, globe, tiles, smooth scroll). */
export function MotionToggle({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  const { reduced, setReduced } = useMotion()
  const labels = useSiteLabels()
  return (
    <button
      type="button"
      className={cn(styles.toggle, tone === 'dark' && styles.dark, className)}
      aria-pressed={reduced}
      onClick={() => setReduced(!reduced)}
    >
      <span className={styles.icon} aria-hidden="true">
        {reduced ? <PlayIcon /> : <PauseIcon />}
      </span>
      <span>{reduced ? labels.motionOffLabel : labels.motionOnLabel}</span>
    </button>
  )
}
