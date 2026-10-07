'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Logo } from '@/components/brand/Logo'
import { useMotion } from '@/components/providers/MotionProvider'
import { useSiteLabels } from '@/components/providers/SiteLabels'
import { Button } from '@/components/ui/Button'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@/lib/cn'
import type { Header as HeaderData, SiteSetting } from '@/payload-types'

import styles from './Header.module.css'
import { Menu } from './Menu'

type Props = { header: HeaderData; site: SiteSetting }

export function Header({ header, site }: Props) {
  const labels = useSiteLabels()
  const { menuOpen, setMenuOpen } = useMotion()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const navItems = useMemo(() => header.navItems || [], [header.navItems])
  const buttons = header.buttons || []

  // Hide on scroll down, reveal on scroll up (never while focus is inside the header).
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const focusInside = headerRef.current?.contains(document.activeElement)
        setScrolled(y > 8)
        if (!focusInside) {
          if (y > lastY + 4 && y > 240) setHidden(true)
          else if (y < lastY - 4 || y < 240) setHidden(false)
        }
        lastY = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the section currently in view inside the menu.
  useEffect(() => {
    const ids = navItems.map((n) => (n.href.startsWith('#') ? n.href.slice(1) : '')).filter(Boolean)
    if (!ids.length) return
    let frame = 0
    const compute = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    compute()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [navItems])

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          styles.header,
          scrolled && styles.scrolled,
          hidden && !menuOpen && styles.hidden,
        )}
        onFocus={() => setHidden(false)}
      >
        <div className={styles.left}>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className={styles.burger} aria-hidden="true">
              <span />
              <span />
            </span>
            <span className={styles.menuLabel}>{labels.menuLabel}</span>
          </button>
        </div>

        <SmartLink href="/" className={styles.logo} aria-label={labels.homeLabel}>
          <Logo variant="color" layout="landscape" title="" className={styles.logoSvg} />
        </SmartLink>

        <div className={styles.right}>
          {buttons.map((b) => (
            <Button
              key={b.id || b.label}
              label={b.label}
              href={b.href}
              newTab={b.newTab}
              size="sm"
              icon={false}
              className={cn(styles.cta, b.showOnMobile && styles.ctaMobile)}
            />
          ))}
        </div>
      </header>

      <Menu
        header={header}
        site={site}
        active={active}
        open={menuOpen}
        onClose={(returnFocus = true) => {
          setMenuOpen(false)
          if (returnFocus) requestAnimationFrame(() => toggleRef.current?.focus())
        }}
      />
    </>
  )
}
