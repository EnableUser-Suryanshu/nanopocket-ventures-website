import type { Field, GroupField } from 'payload'

/** Generative illustrations available when an editor has not uploaded an image. */
export const ART_OPTIONS = [
  { label: '3D — Logomark (red & gold)', value: 'logo3d' },
  { label: '3D — Logomark (white & gold)', value: 'logoWhite' },
  { label: '3D — Logomark on black', value: 'darkLogo' },
  { label: '3D — Gold orbit rings', value: 'orbitRings' },
  { label: '3D — Orbit rings on black', value: 'darkRings' },
  { label: '3D — Spheres', value: 'spheres' },
  { label: '3D — Spheres on black', value: 'darkSpheres' },
  { label: '3D — Black ribbon', value: 'ribbon' },
  { label: '3D — Rising coins', value: 'coins' },
  { label: '3D — Monolith', value: 'monolith' },
  { label: '3D — Seed in glass', value: 'glassSeed' },
  { label: '3D — Gold lattice', value: 'lattice' },
  { label: '3D — Capsules', value: 'pills' },
  { label: 'Orbit system', value: 'orbit' },
  { label: 'Globe grid', value: 'globe' },
  { label: 'Signal wave', value: 'wave' },
  { label: 'Radar sweep', value: 'radar' },
  { label: 'Circuit lines', value: 'circuit' },
  { label: 'Network nodes', value: 'nodes' },
  { label: 'Concentric rings', value: 'rings' },
  { label: 'Terrain lines', value: 'terrain' },
  { label: 'Shield / pocket', value: 'shield' },
  { label: 'Rising bars', value: 'bars' },
  { label: 'Helix', value: 'helix' },
  { label: 'Seed', value: 'seed' },
  { label: 'Banner globe (photo)', value: 'bannerGlobe' },
] as const

export type ArtVariant = (typeof ART_OPTIONS)[number]['value']

const hrefPattern = /^(https?:\/\/|mailto:|tel:|\/|#)/

export const validateHref = (value: string | null | undefined): true | string => {
  if (!value) return true
  return hrefPattern.test(value)
    ? true
    : 'Use a full URL (https://…), a page path (/privacy) or a section link (#pitch-to-us)'
}

export const linkFields = (opts: { required?: boolean } = {}): Field[] => [
  {
    type: 'row',
    fields: [
      { name: 'label', type: 'text', required: opts.required, admin: { width: '40%' } },
      {
        name: 'href',
        label: 'Link',
        type: 'text',
        required: opts.required,
        validate: validateHref,
        admin: {
          width: '45%',
          description: 'https://…, /page or #section-id',
        },
      },
      {
        name: 'newTab',
        label: 'New tab',
        type: 'checkbox',
        admin: { width: '15%', style: { alignSelf: 'flex-end' } },
      },
    ],
  },
]

export const linkGroup = (
  name: string,
  label?: string,
  opts: { required?: boolean; description?: string } = {},
): GroupField => ({
  name,
  label,
  type: 'group',
  admin: { description: opts.description, hideGutter: true },
  fields: linkFields(opts),
})

export const anchorField = (defaultValue: string): Field => ({
  name: 'anchorId',
  label: 'Section ID',
  type: 'text',
  defaultValue,
  required: true,
  validate: (value: string | null | undefined) =>
    !value || /^[a-z0-9-]+$/.test(value) ? true : 'Lowercase letters, numbers and dashes only',
  admin: {
    description: `Used for menu links, e.g. #${defaultValue}`,
  },
})

export const themeField = (defaultValue: 'white' | 'light' | 'dark' = 'white'): Field => ({
  name: 'theme',
  label: 'Background',
  type: 'select',
  defaultValue,
  required: true,
  options: [
    { label: 'White', value: 'white' },
    { label: 'Light grey', value: 'light' },
    { label: 'Black', value: 'dark' },
  ],
})

export const hiddenField: Field = {
  name: 'hidden',
  label: 'Hide this section on the live site',
  type: 'checkbox',
  defaultValue: false,
}

export const artField = (defaultValue: ArtVariant = 'orbit'): Field => ({
  name: 'art',
  label: 'Illustration',
  type: 'select',
  defaultValue,
  options: [...ART_OPTIONS],
  admin: { description: 'Shown when no image is uploaded.' },
})

export const imageField = (name = 'image', label = 'Image (optional)'): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
})

/** Standard heading set used by every section. */
export const sectionHeading = (defaults: {
  eyebrow?: string
  title: string
  tagline?: string
}): Field[] => [
  {
    type: 'row',
    fields: [
      {
        name: 'eyebrow',
        label: 'Small label',
        type: 'text',
        defaultValue: defaults.eyebrow,
        admin: { width: '30%' },
      },
      {
        name: 'title',
        label: 'Section title',
        type: 'text',
        required: true,
        defaultValue: defaults.title,
        admin: { width: '70%' },
      },
    ],
  },
  {
    name: 'tagline',
    type: 'textarea',
    defaultValue: defaults.tagline,
    admin: { rows: 2 },
  },
]

/** Settings collapsible appended to every block. */
export const blockSettings = (
  anchor: string,
  theme: 'white' | 'light' | 'dark' = 'white',
): Field => ({
  type: 'collapsible',
  label: 'Section settings',
  admin: { initCollapsed: true },
  fields: [
    {
      type: 'row',
      fields: [anchorField(anchor), themeField(theme)],
    },
    hiddenField,
  ],
})
