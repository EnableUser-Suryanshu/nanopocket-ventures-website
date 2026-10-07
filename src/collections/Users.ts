import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    defaultColumns: ['name', 'email', 'updatedAt'],
  },
  auth: true,
  fields: [{ name: 'name', type: 'text' }],
}
