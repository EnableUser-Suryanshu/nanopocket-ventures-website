import { RENDERS } from '@/components/art/renders'
import { Visual } from '@/components/art/Visual'
import { cn } from '@/lib/cn'
import type { Media } from '@/payload-types'

import styles from './Tile.module.css'

export type TileData = {
  label: string
  meta?: string | null
  art?: string | null
  image?: number | Media | null
  id?: string | null
}

/** Image card used in the moving showcase wall. Decorative. */
export function Tile({
  tile,
  className,
  priority,
}: {
  tile: TileData
  className?: string
  /** Load immediately (tiles visible in the first screen are the page's largest images) */
  priority?: boolean
}) {
  const uploaded = tile.image && typeof tile.image === 'object'
  const tone = uploaded ? 'light' : (tile.art && RENDERS[tile.art]?.tone) || 'dark'
  return (
    <div className={cn(styles.tile, tone === 'light' && styles.light, className)}>
      <Visual
        image={tile.image}
        art={tile.art}
        tone={tone}
        sizes="(max-width: 900px) 40vw, 20vw"
        priority={priority}
      />
    </div>
  )
}
