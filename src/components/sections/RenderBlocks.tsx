import type { CollectionsData, SiteGlobals } from '@/lib/queries'
import type { Page, PostsBlock } from '@/payload-types'

import { About } from './About'
import { Contact } from './Contact'
import { Criteria } from './Criteria'
import { Hero } from './Hero'
import { HeroStatement } from './HeroStatement'
import { Pitch } from './Pitch'
import { Portfolio } from './Portfolio'
import { PostsGroup } from './Posts'
import { RichTextSection } from './RichTextSection'
import { Statement } from './Statement'
import { Team } from './Team'
import { Thesis } from './Thesis'

type Props = {
  blocks: NonNullable<Page['layout']>
  globals: SiteGlobals
  collections: CollectionsData
}

type Block = NonNullable<Page['layout']>[number]

/**
 * Renders the CMS “Sections” list in order. Numbered sections get a (01), (02)… label.
 * Consecutive Insights / News blocks are shown side by side in one compact section.
 */
export function RenderBlocks({ blocks, globals, collections }: Props) {
  const visible = blocks.filter((b) => !('hidden' in b && b.hidden))
  let n = 0
  const out: React.ReactNode[] = []

  for (let i = 0; i < visible.length; i++) {
    const block: Block = visible[i]
    const key = block.id || `${block.blockType}-${i}`
    const numbered = !['hero', 'statement', 'richText'].includes(block.blockType)

    if (block.blockType === 'posts') {
      const group: PostsBlock[] = [block]
      while (visible[i + 1]?.blockType === 'posts' && group.length < 2) {
        group.push(visible[++i] as PostsBlock)
      }
      const indexes = group.map(() => ++n)
      out.push(
        <PostsGroup
          key={key}
          blocks={group}
          indexes={indexes}
          insights={collections.insights}
          press={collections.press}
        />,
      )
      continue
    }

    // Hero immediately followed by a Statement → one choreographed scene (prokit hero → about hand-off)
    if (block.blockType === 'hero' && visible[i + 1]?.blockType === 'statement') {
      const statement = visible[++i]
      out.push(
        <HeroStatement
          key={key}
          hero={block}
          statement={statement.blockType === 'statement' ? statement : null}
        />,
      )
      continue
    }

    const index = numbered ? ++n : undefined
    switch (block.blockType) {
      case 'hero':
        out.push(<Hero key={key} block={block} />)
        break
      case 'statement':
        out.push(<Statement key={key} block={block} />)
        break
      case 'about':
        out.push(<About key={key} block={block} index={index} />)
        break
      case 'criteria':
        out.push(<Criteria key={key} block={block} index={index} />)
        break
      case 'thesis':
        out.push(<Thesis key={key} block={block} index={index} />)
        break
      case 'portfolio':
        out.push(
          <Portfolio key={key} block={block} index={index} companies={collections.companies} />,
        )
        break
      case 'team':
        out.push(<Team key={key} block={block} index={index} team={collections.team} />)
        break
      case 'pitch':
        out.push(
          <Pitch
            key={key}
            block={block}
            index={index}
            config={globals.pitchForm}
            // Blob storage configured (Vercel): decks upload from the browser straight to storage
            directUpload={Boolean(process.env.BLOB_READ_WRITE_TOKEN)}
          />,
        )
        break
      case 'contact':
        out.push(<Contact key={key} block={block} index={index} config={globals.enquiryForms} />)
        break
      case 'richText':
        out.push(<RichTextSection key={key} block={block} />)
        break
    }
  }

  return <>{out}</>
}
