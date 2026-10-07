import path from 'path'
import type { CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'

import { authenticated, serverOnly } from '../access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Payload sniffs the real file type from its bytes. Legacy .ppt files are detected as CFB containers and
 * Keynote files as zip packages, so those container types are allowed here — the form handler separately
 * restricts uploads to .pdf / .ppt / .pptx / .key extensions, and decks are never served publicly.
 */
export const PITCH_DECK_MIME_TYPES = [
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.apple.keynote',
  'application/x-iwork-keynote-sffkey',
  'application/x-cfb',
  'application/zip',
  'application/x-zip-compressed',
]

export const PitchDecks: CollectionConfig = {
  slug: 'pitch-decks',
  labels: { singular: 'Pitch deck', plural: 'Pitch decks' },
  admin: {
    group: 'Submissions',
    description: 'Private files — never publicly accessible.',
    defaultColumns: ['filename', 'startupName', 'filesize', 'createdAt'],
  },
  access: { create: serverOnly, read: authenticated, update: authenticated, delete: authenticated },
  upload: {
    staticDir: path.resolve(dirname, '../../private/pitch-decks'),
    mimeTypes: PITCH_DECK_MIME_TYPES,
    // Confidential: never let a browser or shared cache keep a copy
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'private, no-store')
      return headers
    },
  },
  fields: [{ name: 'startupName', type: 'text', admin: { readOnly: true } }],
}
