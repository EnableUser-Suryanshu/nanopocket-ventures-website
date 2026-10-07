import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { linkFields } from '../fields/shared'
import { revalidateGlobal } from '../hooks/revalidate'
import { serverURL } from '../lib/server-url'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header & Menu',
  admin: {
    group: 'Settings',
    livePreview: {
      url: () =>
        `${serverURL}/next/preview?path=/&secret=${encodeURIComponent(process.env.PREVIEW_SECRET || '')}`,
    },
  },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'buttons',
      label: 'Header buttons',
      type: 'array',
      maxRows: 3,
      admin: {
        description:
          'Black buttons on the right of the header (turn red on hover). Also repeated inside the menu.',
      },
      fields: [
        ...linkFields({ required: true }),
        {
          name: 'showOnMobile',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Keep visible in the header on small screens (only one recommended).',
          },
        },
      ],
    },
    {
      name: 'navItems',
      label: 'Menu links',
      type: 'array',
      fields: linkFields({ required: true }),
    },
    {
      type: 'row',
      fields: [
        { name: 'menuEyebrow', type: 'text', defaultValue: 'Navigate' },
        { name: 'menuAccessTitle', type: 'text', defaultValue: 'Access' },
      ],
    },
    {
      name: 'menuNote',
      type: 'textarea',
      admin: { rows: 2, description: 'Small line at the bottom of the menu.' },
    },
  ],
}
