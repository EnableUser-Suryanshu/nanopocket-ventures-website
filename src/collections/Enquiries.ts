import type { CollectionConfig } from 'payload'

import { authenticated, serverOnly } from '../access'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  admin: {
    useAsTitle: 'name',
    group: 'Submissions',
    defaultColumns: ['name', 'type', 'email', 'status', 'createdAt'],
    description: 'Messages from the “Reach Us” forms (investor queries, partnerships, media).',
    listSearchableFields: ['name', 'email'],
  },
  defaultSort: '-createdAt',
  access: { create: serverOnly, read: authenticated, update: authenticated, delete: authenticated },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Replied', value: 'replied' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'internalNotes', type: 'textarea', admin: { position: 'sidebar' } },
    {
      type: 'row',
      fields: [
        { name: 'type', label: 'Form', type: 'text', admin: { readOnly: true } },
        { name: 'name', type: 'text', admin: { readOnly: true } },
        { name: 'email', type: 'email', admin: { readOnly: true } },
      ],
    },
    {
      name: 'answers',
      type: 'array',
      admin: { readOnly: true },
      fields: [
        { name: 'question', type: 'text' },
        { name: 'answer', type: 'textarea' },
      ],
    },
    { name: 'userAgent', type: 'text', admin: { readOnly: true } },
  ],
}
