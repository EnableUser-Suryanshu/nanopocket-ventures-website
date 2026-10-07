import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'
import { serverURL } from '../lib/server-url'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
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
          label: 'General & SEO',
          fields: [
            { name: 'siteName', type: 'text', required: true, defaultValue: 'NanoPocket Ventures' },
            {
              name: 'metaTitle',
              label: 'Browser tab / search title',
              type: 'text',
              required: true,
              defaultValue: 'NanoPocket Ventures | India DeepTech and AI Venture Fund',
            },
            { name: 'metaDescription', type: 'textarea', required: true },
            {
              name: 'ogImage',
              label: 'Social share image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: '1200 × 630 px. Falls back to a generated brand card.' },
            },
          ],
        },
        {
          label: 'Key links',
          fields: [
            {
              name: 'investorLoginUrl',
              label: 'Investor Login URL',
              type: 'text',
              defaultValue: 'https://app.ekwty.in/',
            },
            {
              name: 'investWithUsUrl',
              label: 'Invest With Us URL',
              type: 'text',
              defaultValue: 'https://nanopocketventures.decilehub.com/pacts?pid=6N0RoX8y',
            },
            {
              name: 'linkedinUrl',
              label: 'LinkedIn page',
              type: 'text',
              defaultValue: 'https://www.linkedin.com/company/nanopocket-ventures/',
            },
          ],
        },
        {
          label: 'Interface labels',
          description:
            'Small pieces of text used across the site (buttons, screen-reader labels, etc.).',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'skipToContent', type: 'text', defaultValue: 'Skip to content' },
                { name: 'menuLabel', type: 'text', defaultValue: 'Menu' },
                { name: 'closeLabel', type: 'text', defaultValue: 'Close' },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'motionOnLabel',
                  label: 'Pause animations label',
                  type: 'text',
                  defaultValue: 'Pause motion',
                },
                {
                  name: 'motionOffLabel',
                  label: 'Resume animations label',
                  type: 'text',
                  defaultValue: 'Play motion',
                },
                { name: 'backToTop', type: 'text', defaultValue: 'Back to top' },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'opensNewTab',
                  label: 'Screen-reader: opens in new tab',
                  type: 'text',
                  defaultValue: '(opens in a new tab)',
                },
                { name: 'viewLabel', label: 'Cursor label', type: 'text', defaultValue: 'View' },
                {
                  name: 'homeLabel',
                  label: 'Logo link label',
                  type: 'text',
                  defaultValue: 'NanoPocket Ventures — home',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'notFoundTitle', type: 'text', defaultValue: 'This page is still a seed.' },
                {
                  name: 'notFoundBody',
                  type: 'text',
                  defaultValue: 'The page you are looking for does not exist or has moved.',
                },
                { name: 'notFoundCta', type: 'text', defaultValue: 'Return home' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
