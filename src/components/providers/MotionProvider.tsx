'use client'

import Lenis from 'lenis'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { gsap, ScrollTrigger } from '@/lib/gsap'

type MotionContextValue = {
  /** True when animations are off (OS “reduce motion” or the on-page toggle). */
  reduced: boolean
  setReduced: (value: boolean) => void
  /** True once the intro/preloader has finished and hero animations may run. */
  introDone: boolean
  finishIntro: () => void
  lenis: Lenis | null
  /** Smoothly scroll to an element / id and move keyboard focus there. */
  scrollToTarget: (
    target: string | HTMLElement,
    opts?: { focus?: boolean; onDone?: () => void },
  ) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const MotionContext = createContext<MotionContextValue | null>(null)

export const MOTION_STORAGE_KEY = 'np-motion'

export function useMotion() {
  const ctx = useContext(MotionContext)
  if (!ctx) throw new Error('useMotion must be used inside <MotionProvider>')
  return ctx
}

function headerOffset() {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--header-h')
  return (parseInt(value, 10) || 80) + 8
}

/** Document offset that ignores CSS transforms (the page shell is scaled while the menu is open). */
function offsetTop(el: HTMLElement) {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

function resolveTarget(target: string | HTMLElement): HTMLElement | null {
  if (typeof target !== 'string') return target
  const id = target.replace(/^.*#/, '')
  if (!id) return null
  return document.getElementById(id)
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReducedState] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const [menuOpen, setMenuOpenState] = useState(false)
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  const apply = useCallback((value: boolean) => {
    const root = document.documentElement
    root.classList.toggle('reduce-motion', value)
    root.classList.toggle('motion', !value)
    setReducedState(value)
  }, [])

  // Adopt the preference the boot script already applied to <html> (avoids a flash), then follow OS changes.
  useEffect(() => {
    const root = document.documentElement
    ;(window as unknown as { __npReady?: boolean }).__npReady = true
    root.classList.remove('no-js')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with the pre-hydration class
    setReducedState(root.classList.contains('reduce-motion'))

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => {
      if (localStorage.getItem(MOTION_STORAGE_KEY)) return // explicit user choice wins
      apply(mq.matches)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [apply])

  const setReduced = useCallback(
    (value: boolean) => {
      try {
        localStorage.setItem(MOTION_STORAGE_KEY, value ? 'off' : 'on')
      } catch {
        /* storage unavailable */
      }
      apply(value)
      requestAnimationFrame(() => ScrollTrigger.refresh())
    },
    [apply],
  )

  // Smooth scrolling (Lenis) synced with GSAP's ticker — only when motion is on.
  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    })
    lenisRef.current = instance
    // eslint-disable-next-line react-hooks/set-state-in-effect -- exposes the external Lenis instance to consumers
    setLenis(instance)
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [reduced])

  // Keep ScrollTrigger measurements fresh once fonts & images settle.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh).catch(() => undefined)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  const scrollToTarget = useCallback<MotionContextValue['scrollToTarget']>((target, opts = {}) => {
    const el = resolveTarget(target)
    if (!el) return
    const done = () => {
      if (opts.focus !== false && !el.hasAttribute('data-no-focus')) {
        // Temporary tabindex so focus can land on a section without making it click-focusable.
        if (!el.hasAttribute('tabindex')) {
          el.setAttribute('tabindex', '-1')
          el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true })
        }
        el.focus({ preventScroll: true })
      }
      opts.onDone?.()
    }
    const top = Math.max(0, offsetTop(el) - headerOffset() + 8)
    const l = lenisRef.current
    if (l) {
      l.scrollTo(top, { duration: 1.4, force: true, onComplete: done })
    } else {
      window.scrollTo({ top, behavior: 'auto' })
      done()
    }
  }, [])

  // Arriving with a #hash: wait for layout (pins, fonts) and then jump there.
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash.length < 2) return
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh()
      scrollToTarget(hash, { focus: false })
    }, 600)
    return () => window.clearTimeout(t)
  }, [scrollToTarget])

  const setMenuOpen = useCallback((open: boolean) => {
    setMenuOpenState(open)
    document.documentElement.classList.toggle('menu-open', open)
    const l = lenisRef.current
    if (l) {
      if (open) l.stop()
      else l.start()
    }
  }, [])

  const finishIntro = useCallback(() => setIntroDone(true), [])

  const value = useMemo(
    () => ({
      reduced,
      setReduced,
      introDone,
      finishIntro,
      lenis,
      scrollToTarget,
      menuOpen,
      setMenuOpen,
    }),
    [reduced, setReduced, introDone, finishIntro, lenis, scrollToTarget, menuOpen, setMenuOpen],
  )

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}

/** Inline script placed in <head> so the motion class exists before first paint. */
export const motionBootScript = `(function(){var d=document.documentElement;d.classList.remove('no-js');try{if(!location.hash&&'scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}try{var u=localStorage.getItem('${MOTION_STORAGE_KEY}');var m=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var off=u==='off'||(u!=='on'&&m);d.classList.add(off?'reduce-motion':'motion');if(sessionStorage.getItem('np-intro'))d.classList.add('intro-seen');}catch(e){d.classList.add('motion')}setTimeout(function(){if(!window.__npReady){d.classList.add('no-js')}},4000)})();`
