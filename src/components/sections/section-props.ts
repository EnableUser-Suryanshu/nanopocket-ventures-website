import { cn } from '@/lib/cn'

type BlockBase = {
  anchorId?: string | null
  theme?: 'white' | 'light' | 'dark' | null
  blockType: string
}

/** Common attributes for every page section: anchor id, theme class and scroll offset. */
export function sectionProps(block: BlockBase, className?: string) {
  return {
    id: block.anchorId || undefined,
    className: cn(`theme-${block.theme || 'white'}`, className),
    'data-section': block.blockType,
  }
}
