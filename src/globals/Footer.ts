import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { linkFields } from '../fields/shared'
import { revalidateGlobal } from '../hooks/revalidate'
import { serverURL } from '../lib/server-url'

const linkList = (name: string, defaultHeading: string) => ({
  name,
  type: 'group' as const,
  fields: [
    { name: 'heading', type: 'text' as const, defaultValue: defaultHeading },
    { name: 'links', type: 'array' as const, fields: linkFields({ required: true }) },
  ],
})

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
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
      type: 'tabs',
      tabs: [
        {
          label: 'Top',
          fields: [
            {
              name: 'tagline',
              label: 'Line under the logo',
              type: 'textarea',
              defaultValue:
                'Investing early in NewGen Indian Start-ups & Founders that have the potential to become Big Tech',
            },
            {
              name: 'centerText',
              label: 'Large catchphrase',
              type: 'text',
              defaultValue:
                'Small Bets. Superior Solutions. Accelerated Customer Adoption. Impact at Scale.',
              admin: {
                description:
                  'Shown large at the top of the footer. Each sentence starts a new line.',
              },
            },
            {
              name: 'showButtons',
              label: 'Repeat the header buttons in the footer',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'localTime',
              label: 'Local time',
              type: 'group',
              admin: { description: 'A live clock (India Standard Time) next to the logo.' },
              fields: [
                { name: 'show', type: 'checkbox', defaultValue: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', defaultValue: 'Mumbai, India' },
                    { name: 'suffix', type: 'text', defaultValue: 'IST' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Columns',
          fields: [
            {
              name: 'fund',
              label: 'Column 2 — Investor Relations',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', defaultValue: 'Investor Relations' },
                { name: 'subheading', type: 'text', defaultValue: 'Fund Information' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'label', type: 'text', required: true },
                        { name: 'value', type: 'text', required: true },
                      ],
                    },
                  ],
                },
              ],
            },
            linkList('navigate', 'Navigate'),
            linkList('access', 'Access'),
            {
              name: 'address',
              label: 'Column 5 — Registered Address',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', defaultValue: 'Registered Address' },
                { name: 'lines', type: 'textarea' },
                { name: 'mapLabel', type: 'text', defaultValue: 'View on Google Maps' },
                { name: 'mapUrl', type: 'text' },
                { name: 'linkedinLabel', type: 'text', defaultValue: 'Follow on LinkedIn' },
              ],
            },
          ],
        },
        {
          label: 'Bottom bar',
          fields: [
            {
              name: 'copyright',
              type: 'text',
              defaultValue: '© 2026 NanoPocket Ventures. All Rights Reserved.',
            },
            { name: 'legalLinks', type: 'array', fields: linkFields({ required: true }) },
            {
              name: 'disclaimer',
              type: 'textarea',
              admin: {
                description:
                  'Regulatory disclaimer shown in small print (review with legal counsel).',
              },
            },
            {
              name: 'showWordmark',
              label: 'Show giant wordmark',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
}
