'use client'

import { useEffect, useMemo, useState } from 'react'

import type { Header } from '@/payload-types'

import styles from './ScrollRail.module.css'

/** Right-edge progress rail: current section number + name and overall page progress (desktop). */
export function ScrollRail({ items }: { items: Header['navItems'] }) {
  const sections = useMemo(
    () =>
      (items || [])
        .filter((n) => n.href.startsWith('#'))
        .map((n) => ({ id: n.href.slice(1), label: n.label })),
    [items],
  )
  const [state, setState] = useState({ i: -1, progress: 0, visible: false })

  useEffect(() => {
    if (!sections.length) return
    let frame = 0
    const compute = () => {
      frame = 0
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const line = window.innerHeight * 0.45
      let i = -1
      sections.forEach((s, k) => {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) i = k
      })
      // Step aside once the footer takes over the screen
      const footer = document.querySelector('.page-shell > footer')
      const inFooter = footer
        ? footer.getBoundingClientRect().top < window.innerHeight * 0.7
        : false
      setState({
        i,
        progress: max > 0 ? y / max : 0,
        visible: y > window.innerHeight * 0.6 && !inFooter,
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [sections])

  const current = sections[state.i]
  return (
    <div
      className={styles.rail}
      data-visible={state.visible && current ? '' : undefined}
      aria-hidden="true"
    >
      <span className={styles.index}>{current ? String(state.i + 1).padStart(2, '0') : '00'}</span>
      <span className={styles.track}>
        <span className={styles.fill} style={{ transform: `scaleY(${state.progress})` }} />
      </span>
      <span className={styles.label} key={current?.id}>
        {current?.label}
      </span>
    </div>
  )
}
