import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Team member', plural: 'Team' },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'role', 'order'],
  },
  defaultSort: 'order',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateCollectionDelete] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
      ],
    },
    { name: 'bio', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'linkedin', label: 'LinkedIn URL', type: 'text' },
        {
          name: 'order',
          type: 'number',
          defaultValue: 10,
          admin: { description: 'Lower numbers appear first.' },
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Square portrait works best. Without a photo, initials are shown.' },
    },
  ],
}
