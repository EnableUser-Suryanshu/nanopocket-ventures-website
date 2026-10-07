import { useId } from 'react'

import { MARK_FIELD, MARK_SEED, WORD_NANOPOCKET, WORD_VENTURES } from './logo-paths'

/** `reverse` = full-colour mark with a white wordmark, for dark backgrounds. */
type Variant = 'color' | 'reverse' | 'black' | 'white'
type Layout = 'landscape' | 'portrait' | 'mark'

type Props = {
  variant?: Variant
  layout?: Layout
  className?: string
  /** Accessible name. Pass an empty string when the logo sits inside a labelled link. */
  title?: string
}

/* Coordinates of the outlined wordmark in the landscape artboard (see logo-paths.ts). */
const WORD_BOX = { x1: 760.7, x2: 2158.7, y1: 215.4, y2: 551.5 }
const MARK_W = 671.32
const MARK_H = 800

function Mark({ variant, uid }: { variant: Variant; uid: string }) {
  if (variant === 'black' || variant === 'white') {
    const fill = variant === 'white' ? '#ffffff' : '#050505'
    return (
      <g fill={fill}>
        <path d={MARK_FIELD} />
        <path d={MARK_SEED} />
      </g>
    )
  }
  return (
    <g>
      <defs>
        <linearGradient
          id={`${uid}-field`}
          x1="361.42"
          y1="746.09"
          x2="584.49"
          y2="1480.19"
          gradientTransform="translate(-103 -821)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fb0707" />
          <stop offset="1" stopColor="#c60303" />
        </linearGradient>
        <linearGradient
          id={`${uid}-seed`}
          x1="271.61"
          y1="1121.17"
          x2="482"
          y2="1625.26"
          gradientTransform="translate(-103 -821)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fccf58" />
          <stop offset=".27" stopColor="#faab07" />
          <stop offset="1" stopColor="#be6304" />
        </linearGradient>
      </defs>
      <path d={MARK_FIELD} fill={`url(#${uid}-field)`} />
      <path d={MARK_SEED} fill={`url(#${uid}-seed)`} />
    </g>
  )
}

function Wordmark({ variant }: { variant: Variant }) {
  const fill = variant === 'white' || variant === 'reverse' ? '#ffffff' : '#050505'
  return (
    <g fill={fill}>
      <path d={WORD_NANOPOCKET} />
      <path d={WORD_VENTURES} />
    </g>
  )
}

export function Logo({
  variant = 'color',
  layout = 'landscape',
  className,
  title = 'NanoPocket Ventures',
}: Props) {
  const uid = useId().replace(/:/g, '')
  const labelled = title.length > 0
  const a11y = labelled
    ? { role: 'img' as const, 'aria-labelledby': `${uid}-title` }
    : { 'aria-hidden': true as const, focusable: 'false' as const }

  if (layout === 'mark') {
    return (
      <svg viewBox={`0 0 ${MARK_W} ${MARK_H}`} className={className} {...a11y}>
        {labelled && <title id={`${uid}-title`}>{title}</title>}
        <Mark variant={variant} uid={uid} />
      </svg>
    )
  }

  if (layout === 'portrait') {
    // Wordmark centred under the mark.
    const wordW = WORD_BOX.x2 - WORD_BOX.x1
    const scale = 1100 / wordW
    const width = 1100
    const markScale = 0.78
    const markX = (width - MARK_W * markScale) / 2
    const wordY = MARK_H * markScale + 70
    return (
      <svg
        viewBox={`0 0 ${width} ${wordY + (WORD_BOX.y2 - WORD_BOX.y1) * scale + 4}`}
        className={className}
        {...a11y}
      >
        {labelled && <title id={`${uid}-title`}>{title}</title>}
        <g transform={`translate(${markX} 0) scale(${markScale})`}>
          <Mark variant={variant} uid={uid} />
        </g>
        <g
          transform={`translate(${-WORD_BOX.x1 * scale} ${wordY - WORD_BOX.y1 * scale}) scale(${scale})`}
        >
          <Wordmark variant={variant} />
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 2162.8 800" className={className} {...a11y}>
      {labelled && <title id={`${uid}-title`}>{title}</title>}
      <Mark variant={variant} uid={uid} />
      <Wordmark variant={variant} />
    </svg>
  )
}
