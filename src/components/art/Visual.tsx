import Image from 'next/image'

import type { Media } from '@/payload-types'
import { mediaSrc } from '@/lib/media-src'

import { Art } from './Art'
import { RENDERS } from './renders'

type Props = {
  image?: number | Media | null
  art?: string | null
  tone?: 'dark' | 'light'
  className?: string
  sizes?: string
  priority?: boolean
}

const fill: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' }

/** Uploaded CMS image → 3D brand render → line illustration (in that order). Renders are decorative. */
export function Visual({
  image,
  art,
  tone = 'dark',
  className,
  sizes = '(max-width: 900px) 100vw, 50vw',
  priority,
}: Props) {
  if (image && typeof image === 'object' && image.url) {
    const decorative = (image.alt || '').trim().toLowerCase() === 'decorative'
    return (
      <Image
        src={mediaSrc(image.url)}
        alt={decorative ? '' : image.alt || ''}
        width={image.width || 1600}
        height={image.height || 1200}
        sizes={sizes}
        priority={priority}
        className={className}
        style={{ ...fill, objectPosition: `${image.focalX ?? 50}% ${image.focalY ?? 50}%` }}
      />
    )
  }
  const render = art ? RENDERS[art] : undefined
  if (render) {
    return (
      <Image
        src={render.src}
        alt=""
        width={1000}
        height={1250}
        sizes={sizes}
        priority={priority}
        className={className}
        style={fill}
      />
    )
  }
  return <Art variant={art} tone={tone} className={className} />
}
