'use client'

import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'

import styles from './Globe.module.css'

type Point = { label?: string | null; lat?: number | null; lng?: number | null }

type Props = {
  origin?: Point | null
  destinations?: Point[] | null
}

const toAngles = (lat: number, lng: number): [number, number] => [
  Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
  (lat * Math.PI) / 180,
]

/**
 * Gold dotted globe with arcs from Mumbai to the world — a live, razor-sharp version of the
 * LinkedIn banner globe. Drag to spin. Static when motion is paused.
 */
export function Globe({ origin, destinations }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { reduced } = useMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const o = { lat: origin?.lat ?? 19.076, lng: origin?.lng ?? 72.8777 }
    const dests = (destinations || []).filter(
      (d) => typeof d.lat === 'number' && typeof d.lng === 'number',
    ) as Array<{
      lat: number
      lng: number
    }>

    let width = canvas.offsetWidth || 600
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const [phi0] = toAngles(o.lat, o.lng)
    let phi = phi0 - 0.12
    const theta = 0.22
    let dragOffset = 0
    let dragStart: number | null = null
    let velocity = 0
    let visible = true

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width,
      height: width,
      phi,
      theta,
      dark: 0,
      diffuse: 1.25,
      mapSamples: 20000,
      mapBrightness: 7,
      mapBaseBrightness: 0.02,
      baseColor: [1, 0.985, 0.95],
      markerColor: [0.83, 0.58, 0.02],
      glowColor: [1, 0.97, 0.9],
      opacity: 0.92,
      scale: 1,
      offset: [0, 0],
      markers: [
        { location: [o.lat, o.lng], size: 0.07, color: [0.9, 0.035, 0.08] },
        ...dests.map((d) => ({ location: [d.lat, d.lng] as [number, number], size: 0.035 })),
      ],
      arcs: dests.map((d) => ({
        from: [o.lat, o.lng] as [number, number],
        to: [d.lat, d.lng] as [number, number],
      })),
      arcColor: [0.83, 0.58, 0.02],
      arcWidth: 0.7,
      arcHeight: 0.28,
      markerElevation: 0.015,
    })

    let raf = 0
    const render = () => {
      globe.update({ phi: phi + dragOffset, theta, width, height: width })
    }
    const loop = () => {
      if (visible) {
        if (dragStart === null) {
          phi += 0.0009 + velocity
          velocity *= 0.94
        }
        render()
      }
      raf = requestAnimationFrame(loop)
    }

    if (reduced) {
      render()
    } else {
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(() => {
      width = canvas.offsetWidth || width
      render()
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    const onDown = (e: PointerEvent) => {
      dragStart = e.clientX - dragOffset * 260
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }
    const onMove = (e: PointerEvent) => {
      if (dragStart === null) return
      const next = (e.clientX - dragStart) / 260
      velocity = (next - dragOffset) * 0.12
      dragOffset = next
      if (reduced) render()
    }
    const onUp = () => {
      dragStart = null
      canvas.style.cursor = 'grab'
    }
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)

    canvas.style.opacity = '1'

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      globe.destroy()
    }
  }, [origin?.lat, origin?.lng, destinations, reduced])

  return (
    <div className={styles.globe}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  )
}
