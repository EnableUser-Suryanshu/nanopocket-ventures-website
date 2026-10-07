import { WORD_NANOPOCKET } from '@/components/brand/logo-paths'

import styles from './FooterWordmark.module.css'

/**
 * Oversized wordmark in the brand colours (red field → gold seed, as in the mark).
 * Decorative — the name is already in the logo and copyright. Motion lives in FooterMotion.
 */
export function FooterWordmark() {
  return (
    <div className={styles.wrap} aria-hidden="true" data-f-wordmark="">
      <svg viewBox="755 205 1410 205" className={styles.svg} preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient
            id="fw-brand"
            gradientUnits="userSpaceOnUse"
            x1="755"
            y1="205"
            x2="2165"
            y2="410"
          >
            <stop offset="0" stopColor="#fb0707" />
            <stop offset="0.34" stopColor="#e5340a" />
            <stop offset="0.66" stopColor="#faab07" />
            <stop offset="1" stopColor="#fccf58" />
          </linearGradient>
          <linearGradient id="fw-depth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.5" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.4" />
          </linearGradient>
          {/* A soft light band that sweeps across the letters */}
          <linearGradient
            id="fw-sheen"
            gradientUnits="userSpaceOnUse"
            x1="755"
            y1="0"
            x2="1085"
            y2="0"
            gradientTransform="translate(-700 0)"
            data-sheen=""
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={WORD_NANOPOCKET} fill="url(#fw-brand)" />
        <path d={WORD_NANOPOCKET} fill="url(#fw-depth)" />
        <path d={WORD_NANOPOCKET} fill="url(#fw-sheen)" />
      </svg>
    </div>
  )
}
