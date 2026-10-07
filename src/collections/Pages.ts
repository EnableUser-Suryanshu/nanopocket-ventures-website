import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'
import { pageBlocks } from '../blocks'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import { serverURL } from '../lib/server-url'

const previewPath = (slug?: string | null) => (!slug || slug === 'home' ? '/' : `/${slug}`)

const previewURL = (slug?: string | null) =>
  `${serverURL}/next/preview?path=${encodeURIComponent(previewPath(slug))}&secret=${encodeURIComponent(
    process.env.PREVIEW_SECRET || '',
  )}`

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Website',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'Every section of the website. Open “Home” to edit the main page — use Live Preview to see changes as you type.',
    livePreview: { url: ({ data }) => previewURL(data?.slug as string) },
    preview: (doc) => previewURL(doc?.slug as string),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: { autosave: { interval: 400 }, schedulePublish: true },
    maxPerDoc: 30,
  },
  hooks: {
    afterChange: [revalidateCollection],
    afterDelete: [revalidateCollectionDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: '“home” is the main page. Others become /slug (e.g. /privacy).',
      },
      validate: (value: string | null | undefined) =>
        !value || /^[a-z0-9-]+$/.test(value) ? true : 'Lowercase letters, numbers and dashes only',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sections',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: pageBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
      ],
    },
  ],
}
