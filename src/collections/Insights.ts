import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'
import { serverURL } from '../lib/server-url'

const previewURL = (slug?: string | null) =>
  `${serverURL}/next/preview?path=${encodeURIComponent(`/insights/${slug || ''}`)}&secret=${encodeURIComponent(
    process.env.PREVIEW_SECRET || '',
  )}`

export const Insights: CollectionConfig = {
  slug: 'insights',
  labels: { singular: 'Insight', plural: 'Insights' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'publishedAt', '_status'],
    livePreview: { url: ({ data }) => previewURL(data?.slug as string) },
    preview: (doc) => previewURL(doc?.slug as string),
  },
  defaultSort: '-publishedAt',
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { drafts: { autosave: { interval: 400 } }, maxPerDoc: 20 },
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateCollectionDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      validate: (value: string | null | undefined) =>
        !value || /^[a-z0-9-]+$/.test(value) ? true : 'Lowercase letters, numbers and dashes only',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    { name: 'category', type: 'text', admin: { position: 'sidebar' } },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
  ],
}
