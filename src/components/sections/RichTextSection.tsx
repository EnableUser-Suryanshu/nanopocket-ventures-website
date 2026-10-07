import { RichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/cn'
import type { RichTextBlock } from '@/payload-types'

import { sectionProps } from './section-props'

export function RichTextSection({ block }: { block: RichTextBlock }) {
  return (
    <section {...sectionProps(block, 'section')} style={{ paddingTop: 0 }}>
      <div className="container">
        <RichText data={block.content} className={cn('prose')} />
      </div>
    </section>
  )
}
