import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
    description:
      'Images used on the website. Always describe the image in “Alt text” for screen-reader users.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidateCollection],
    afterDelete: [revalidateCollectionDelete],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt text',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describe what the image shows (required for accessibility). Use “decorative” only for purely ornamental images.',
      },
    },
    { name: 'caption', type: 'text' },
  ],
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumb', width: 480 },
      { name: 'card', width: 960 },
      { name: 'wide', width: 1920 },
    ],
    adminThumbnail: 'thumb',
  },
}
