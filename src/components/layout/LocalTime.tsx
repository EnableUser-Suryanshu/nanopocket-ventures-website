'use client'

import { useSyncExternalStore } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { cn } from '@/lib/cn'

import styles from './LocalTime.module.css'

const format = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Kolkata',
})

const tick = (onChange: () => void) => {
  const id = window.setInterval(onChange, 10_000)
  return () => window.clearInterval(id)
}
const frozen = () => () => {}
// The string only changes once a minute, so the snapshot stays stable between renders.
const now = () => format.format(Date.now())
const onServer = () => ''

/**
 * Live India time next to the footer logo. Pausing motion also stops the clock
 * (WCAG 2.2.2 — auto-updating content can be paused).
 */
export function LocalTime({
  label,
  suffix,
  className,
}: {
  label?: string | null
  suffix?: string | null
  className?: string
}) {
  const { reduced } = useMotion()
  const time = useSyncExternalStore(reduced ? frozen : tick, now, onServer)
  const [hh, mm] = time ? time.split(':') : ['--', '--']

  return (
    <p className={cn(styles.clock, className)}>
      <span className={styles.dot} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.time}>
        {hh}
        <span className={styles.colon} aria-hidden="true">
          :
        </span>
        {mm}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </span>
    </p>
  )
}
