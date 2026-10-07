import { useId } from 'react'

import type { ArtVariant } from '@/fields/shared'
import { cn } from '@/lib/cn'

import { MARK_FIELD, MARK_SEED } from '../brand/logo-paths'
import styles from './Art.module.css'

type Props = {
  variant?: ArtVariant | string | null
  tone?: 'dark' | 'light'
  className?: string
}

const W = 400
const H = 500
const CX = W / 2
const CY = H / 2

/** Deterministic pseudo-random generator so server and client render identical SVGs. */
function rng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const r1 = (n: number) => Math.round(n * 10) / 10

function sinePath(y: number, amp: number, freq: number, phase: number) {
  let d = `M -10 ${r1(y + Math.sin(phase) * amp)}`
  for (let x = 0; x <= W + 10; x += 10) {
    d += ` L ${x} ${r1(y + Math.sin(x * freq + phase) * amp)}`
  }
  return d
}

function Orbit() {
  return (
    <g>
      <circle cx={CX} cy={CY} r="34" className={styles.accentFill} />
      <circle cx={CX} cy={CY} r="58" className={styles.lineSoft} />
      {[-22, 18, 64].map((rot, i) => (
        <g key={rot} transform={`rotate(${rot} ${CX} ${CY})`}>
          <g
            className={cn(styles.spin, styles[`spin${i}` as 'spin0'])}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <ellipse cx={CX} cy={CY} rx={150 - i * 10} ry={48 + i * 6} className={styles.line} />
            <circle
              cx={CX + 150 - i * 10}
              cy={CY}
              r="5"
              className={i === 1 ? styles.accentFill : styles.dotFill}
            />
          </g>
        </g>
      ))}
    </g>
  )
}

function Globe() {
  const r = 150
  return (
    <g>
      <g className={styles.spinSlow} style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <ellipse
          cx={CX}
          cy={CY}
          rx={r + 30}
          ry="40"
          transform={`rotate(-16 ${CX} ${CY})`}
          className={styles.lineSoft}
        />
      </g>
      <circle cx={CX} cy={CY} r={r} className={styles.line} />
      {[-0.66, -0.33, 0, 0.33, 0.66].map((t) => {
        const y = CY + t * r
        const rx = Math.sqrt(1 - t * t) * r
        return (
          <ellipse
            key={`lat${t}`}
            cx={CX}
            cy={y}
            rx={r1(rx)}
            ry={r1(rx * 0.12)}
            className={styles.lineSoft}
          />
        )
      })}
      {[0.2, 0.45, 0.72, 0.92].map((t) => (
        <ellipse
          key={`lon${t}`}
          cx={CX}
          cy={CY}
          rx={r1(r * t)}
          ry={r}
          className={styles.lineSoft}
        />
      ))}
      <circle cx={CX + 52} cy={CY - 38} r="6" className={styles.accentFill} />
      <circle
        cx={CX + 52}
        cy={CY - 38}
        r="16"
        className={cn(styles.accentLine, styles.pulse)}
        style={{ transformOrigin: `${CX + 52}px ${CY - 38}px` }}
      />
    </g>
  )
}

function Wave() {
  return (
    <g>
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={sinePath(110 + i * 22, 26 + i * 1.6, 0.018, i * 0.42)}
          className={cn(i === 7 ? styles.accentLine : styles.line, styles.flow)}
          style={{ animationDelay: `${-i * 0.35}s` }}
        />
      ))}
    </g>
  )
}

function Radar() {
  const rand = rng(7)
  return (
    <g>
      {[40, 80, 120, 160].map((r) => (
        <circle key={r} cx={CX} cy={CY} r={r} className={styles.lineSoft} />
      ))}
      <path
        d={`M ${CX - 170} ${CY} H ${CX + 170} M ${CX} ${CY - 170} V ${CY + 170}`}
        className={styles.lineSoft}
      />
      <g className={styles.sweep} style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <path
          d={`M ${CX} ${CY} L ${CX + 160} ${CY} A 160 160 0 0 0 ${r1(CX + 160 * Math.cos(-0.55))} ${r1(CY + 160 * Math.sin(-0.55))} Z`}
          className={styles.sweepFill}
        />
        <line x1={CX} y1={CY} x2={CX + 160} y2={CY} className={styles.accentLine} />
      </g>
      {Array.from({ length: 6 }, (_, i) => {
        const a = rand() * Math.PI * 2
        const d = 40 + rand() * 110
        return (
          <circle
            key={i}
            cx={r1(CX + Math.cos(a) * d)}
            cy={r1(CY + Math.sin(a) * d)}
            r={i === 2 ? 5 : 3}
            className={i === 2 ? styles.accentFill : styles.dotFill}
          />
        )
      })}
    </g>
  )
}

function Circuit() {
  const rand = rng(11)
  const traces: string[] = []
  for (let i = 0; i < 11; i++) {
    let x = 40 + Math.floor(rand() * 8) * 40
    let y = 40
    let d = `M ${x} ${y}`
    while (y < H - 40) {
      const step = 40 + Math.floor(rand() * 3) * 20
      y = Math.min(H - 40, y + step)
      d += ` V ${y}`
      if (rand() > 0.5) {
        x = Math.max(40, Math.min(W - 40, x + (rand() > 0.5 ? 40 : -40)))
        y = Math.min(H - 40, y + 40)
        d += ` L ${x} ${y}`
      }
    }
    traces.push(d)
  }
  return (
    <g>
      {traces.map((d, i) => (
        <path
          key={i}
          d={d}
          className={i === 4 ? cn(styles.accentLine, styles.dash) : styles.line}
        />
      ))}
      {traces.map((d, i) => {
        const m = d.match(/M (\d+) (\d+)/)
        return m ? (
          <circle key={`n${i}`} cx={m[1]} cy={m[2]} r="5" className={styles.dotFill} />
        ) : null
      })}
      <rect x={CX - 46} y={CY - 46} width="92" height="92" rx="12" className={styles.chip} />
      <rect x={CX - 22} y={CY - 22} width="44" height="44" rx="6" className={styles.accentFill} />
    </g>
  )
}

function Nodes() {
  const rand = rng(23)
  const pts = Array.from(
    { length: 16 },
    () => [40 + rand() * (W - 80), 50 + rand() * (H - 100)] as const,
  )
  const edges: Array<[number, number]> = []
  pts.forEach((p, i) =>
    pts.forEach((q, j) => {
      if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 130) edges.push([i, j])
    }),
  )
  return (
    <g>
      {edges.map(([i, j]) => (
        <line
          key={`${i}-${j}`}
          x1={r1(pts[i][0])}
          y1={r1(pts[i][1])}
          x2={r1(pts[j][0])}
          y2={r1(pts[j][1])}
          className={styles.lineSoft}
        />
      ))}
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={r1(p[0])}
          cy={r1(p[1])}
          r={i === 5 ? 8 : 4}
          className={i === 5 ? styles.accentFill : styles.dotFill}
        />
      ))}
      <circle
        cx={r1(pts[5][0])}
        cy={r1(pts[5][1])}
        r="22"
        className={cn(styles.accentLine, styles.pulse)}
        style={{ transformOrigin: `${r1(pts[5][0])}px ${r1(pts[5][1])}px` }}
      />
    </g>
  )
}

function Rings() {
  return (
    <g>
      {[30, 60, 90, 120, 150, 180].map((r, i) => (
        <g
          key={r}
          className={cn(styles.spin, i % 2 ? styles.spinReverse : '')}
          style={{ transformOrigin: `${CX}px ${CY}px`, animationDuration: `${30 + i * 8}s` }}
        >
          <circle
            cx={CX}
            cy={CY}
            r={r}
            className={i === 2 ? styles.accentLine : styles.line}
            strokeDasharray={i % 2 ? '2 10' : `${r * 0.6} ${r * 0.25}`}
          />
        </g>
      ))}
      <circle cx={CX} cy={CY} r="8" className={styles.accentFill} />
    </g>
  )
}

function Terrain() {
  const lines = Array.from({ length: 16 }, (_, i) => {
    const y = 170 + i * 20
    let d = `M -10 ${y}`
    for (let x = 0; x <= W + 10; x += 8) {
      const h =
        Math.sin(x * 0.014 + i * 0.3) * 30 + Math.sin(x * 0.037 + i) * 12 + Math.cos(x * 0.006) * 24
      d += ` L ${x} ${r1(y - Math.max(0, h) * (1 - i / 22))}`
    }
    return d
  })
  return (
    <g>
      <circle cx={CX + 70} cy="120" r="42" className={styles.accentFill} />
      {lines.map((d, i) => (
        <path key={i} d={d} className={styles.line} />
      ))}
    </g>
  )
}

function Shield() {
  // Logo mark silhouette as a containment form ("pocket forms").
  const s = 0.36
  return (
    <g>
      {[1.35, 1.15, 0.95].map((k, i) => (
        <g
          key={k}
          transform={`translate(${CX - (671 * s * k) / 2} ${CY - (800 * s * k) / 2}) scale(${s * k})`}
        >
          <path d={MARK_FIELD} className={styles.lineThin} style={{ opacity: 0.35 + i * 0.2 }} />
          <path d={MARK_SEED} className={styles.lineThin} style={{ opacity: 0.35 + i * 0.2 }} />
        </g>
      ))}
      <g
        transform={`translate(${CX - (671 * s * 0.6) / 2} ${CY - (800 * s * 0.6) / 2}) scale(${s * 0.6})`}
      >
        <path d={MARK_FIELD} className={styles.markFill} />
        <path d={MARK_SEED} className={styles.accentFill} />
      </g>
    </g>
  )
}

function Bars() {
  return (
    <g>
      <path d={`M 40 ${H - 60} H ${W - 40}`} className={styles.line} />
      {Array.from({ length: 10 }, (_, i) => {
        const h = 40 + Math.pow(i, 1.6) * 9
        const x = 52 + i * 31
        return (
          <rect
            key={i}
            x={x}
            y={H - 60 - h}
            width="18"
            height={r1(h)}
            rx="3"
            className={cn(i === 9 ? styles.accentFill : styles.barFill, styles.grow)}
            style={{ transformOrigin: `${x + 9}px ${H - 60}px`, animationDelay: `${i * 0.12}s` }}
          />
        )
      })}
      <path
        d={`M 61 ${H - 120} C 160 ${H - 150}, 260 ${H - 230}, 340 ${H - 380}`}
        className={cn(styles.accentLine, styles.dash)}
      />
    </g>
  )
}

function Helix() {
  const a: string[] = []
  const b: string[] = []
  const rungs: Array<[number, number, number]> = []
  for (let y = 40; y <= H - 40; y += 6) {
    const t = y * 0.028
    const x1 = CX + Math.sin(t) * 90
    const x2 = CX + Math.sin(t + Math.PI) * 90
    a.push(`${a.length ? 'L' : 'M'} ${r1(x1)} ${y}`)
    b.push(`${b.length ? 'L' : 'M'} ${r1(x2)} ${y}`)
    if (y % 24 === 16) rungs.push([r1(x1), r1(x2), y])
  }
  return (
    <g>
      {rungs.map(([x1, x2, y]) => (
        <line key={y} x1={x1} y1={y} x2={x2} y2={y} className={styles.lineSoft} />
      ))}
      <path d={a.join(' ')} className={styles.line} />
      <path d={b.join(' ')} className={styles.accentLine} />
    </g>
  )
}

function Seed() {
  const s = 0.36
  return (
    <g>
      {Array.from({ length: 24 }, (_, i) => {
        const ang = (i / 24) * Math.PI * 2
        return (
          <line
            key={i}
            x1={r1(CX + Math.cos(ang) * 150)}
            y1={r1(CY + Math.sin(ang) * 150)}
            x2={r1(CX + Math.cos(ang) * 190)}
            y2={r1(CY + Math.sin(ang) * 190)}
            className={styles.lineSoft}
          />
        )
      })}
      <circle
        cx={CX}
        cy={CY}
        r="130"
        className={cn(styles.lineSoft, styles.spinSlow)}
        strokeDasharray="3 9"
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
      {/* seed path bbox ≈ x 0–590, y 348–790 → centre (295, 569) */}
      <g transform={`translate(${CX - 295 * s} ${CY - 569 * s}) scale(${s})`}>
        <path d={MARK_SEED} className={styles.accentFill} />
      </g>
    </g>
  )
}

function BannerGlobe() {
  return (
    <image
      href="/brand/globe-tile.webp"
      x="0"
      y="0"
      width={W}
      height={H}
      preserveAspectRatio="xMidYMid slice"
    />
  )
}

const VARIANTS: Record<string, () => React.JSX.Element> = {
  orbit: Orbit,
  globe: Globe,
  wave: Wave,
  radar: Radar,
  circuit: Circuit,
  nodes: Nodes,
  rings: Rings,
  terrain: Terrain,
  shield: Shield,
  bars: Bars,
  helix: Helix,
  seed: Seed,
  bannerGlobe: BannerGlobe,
}

/** Brand-system illustration (orbit lines, globe grids, pocket forms, gold seed). Purely decorative. */
export function Art({ variant = 'orbit', tone = 'dark', className }: Props) {
  const Variant = VARIANTS[variant || 'orbit'] || Orbit
  const gid = `art-bg-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn(styles.art, tone === 'dark' ? styles.dark : styles.light, className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={gid} cx="70%" cy="20%" r="95%">
          <stop offset="0" className={styles.bgHi} />
          <stop offset="1" className={styles.bgLo} />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gid})`} />
      <Variant />
    </svg>
  )
}
