'use client'

import { useEffect, useRef } from 'react'

import { Logo } from '@/components/brand/Logo'
import { useMotion } from '@/components/providers/MotionProvider'
import { useSiteLabels } from '@/components/providers/SiteLabels'
import { Button } from '@/components/ui/Button'
import { LinkedInIcon } from '@/components/ui/Icons'
import { RollText } from '@/components/ui/RollText'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@/lib/cn'
import { gsap } from '@/lib/gsap'
import type { Header as HeaderData, SiteSetting } from '@/payload-types'

import styles from './Menu.module.css'
import { MotionToggle } from './MotionToggle'

type Props = {
  header: HeaderData
  site: SiteSetting
  active: string
  open: boolean
  onClose: (returnFocus?: boolean) => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Left-hand drawer (blackbird.vc placement) in prokit’s dark menu style. The page slides right with it. */
export function Menu({ header, site, active, open, onClose }: Props) {
  const labels = useSiteLabels()
  const { reduced } = useMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Focus management + Escape + focus trap
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Staggered entrance of the links
  useEffect(() => {
    if (!open || reduced || !panelRef.current) return
    const items = panelRef.current.querySelectorAll('[data-menu-item]')
    const tween = gsap.fromTo(
      items,
      { x: -40, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.9, delay: 0.25, stagger: 0.035, ease: 'expo.out' },
    )
    return () => {
      tween.kill()
      gsap.set(items, { clearProps: 'all' })
    }
  }, [open, reduced])

  const navItems = header.navItems || []
  const buttons = header.buttons || []

  return (
    <div className={cn(styles.root, open && styles.open)}>
      <div className={styles.overlay} onClick={() => onClose()} aria-hidden="true" />
      <div
        ref={panelRef}
        id="site-menu"
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={labels.menuLabel}
        hidden={!open}
      >
        <div className={styles.top}>
          <button ref={closeRef} type="button" className={styles.close} onClick={() => onClose()}>
            <span className={styles.closeIcon} aria-hidden="true">
              <span />
              <span />
            </span>
            <span>{labels.closeLabel}</span>
          </button>
          <Logo variant="white" layout="mark" title="" className={styles.mark} />
        </div>

        <nav aria-label={header.menuEyebrow || labels.menuLabel} className={styles.nav}>
          {header.menuEyebrow && (
            <p className={styles.eyebrow} data-menu-item="">
              {header.menuEyebrow}
            </p>
          )}
          <ol className={styles.list}>
            {navItems.map((item, i) => {
              const id = item.href.startsWith('#') ? item.href.slice(1) : ''
              const isActive = id && id === active
              return (
                <li key={item.id || item.href} data-menu-item="">
                  <SmartLink
                    href={item.href}
                    newTab={item.newTab}
                    className={cn(styles.link, isActive && styles.active)}
                    aria-current={isActive ? 'location' : undefined}
                    onNavigate={() => onClose(false)}
                  >
                    <span className={styles.index} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <RollText>{item.label}</RollText>
                  </SmartLink>
                </li>
              )
            })}
          </ol>
        </nav>

        <div className={styles.access} data-menu-item="">
          {header.menuAccessTitle && <p className={styles.eyebrow}>{header.menuAccessTitle}</p>}
          <div className={styles.buttons}>
            {buttons.map((b) => (
              <Button
                key={b.id || b.label}
                label={b.label}
                href={b.href}
                newTab={b.newTab}
                size="sm"
                onNavigate={() => onClose(false)}
              />
            ))}
          </div>
        </div>

        <div className={styles.foot} data-menu-item="">
          {site.linkedinUrl && (
            <SmartLink href={site.linkedinUrl} newTab className={styles.social}>
              <LinkedInIcon className={styles.socialIcon} />
              <span>LinkedIn</span>
            </SmartLink>
          )}
          <MotionToggle tone="dark" />
          {header.menuNote && <p className={styles.note}>{header.menuNote}</p>}
        </div>
      </div>
    </div>
  )
}
