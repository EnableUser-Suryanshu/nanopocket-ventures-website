import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const PortfolioCompanies: CollectionConfig = {
  slug: 'portfolio-companies',
  labels: { singular: 'Portfolio company', plural: 'Portfolio companies' },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'sector', 'year', 'published'],
  },
  defaultSort: 'order',
  access: {
    read: ({ req: { user } }) => (user ? true : { published: { equals: true } }),
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: { afterChange: [revalidateCollection], afterDelete: [revalidateCollectionDelete] },
  fields: [
    {
      name: 'published',
      label: 'Show on website',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Only disclose after internal approval.' },
    },
    { name: 'order', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
    { name: 'name', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'sector', type: 'text' },
        { name: 'stage', type: 'text' },
        { name: 'year', type: 'text' },
      ],
    },
    { name: 'description', type: 'textarea' },
    { name: 'website', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}
