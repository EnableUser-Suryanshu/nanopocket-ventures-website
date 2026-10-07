import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const Press: CollectionConfig = {
  slug: 'press',
  labels: { singular: 'News item', plural: 'Us In News' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'outlet', 'publishedAt'],
  },
  defaultSort: '-publishedAt',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateCollectionDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'outlet', label: 'Publication', type: 'text', required: true },
        {
          name: 'publishedAt',
          type: 'date',
          required: true,
          admin: { date: { pickerAppearance: 'dayOnly' } },
        },
      ],
    },
    { name: 'url', label: 'Article URL', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
