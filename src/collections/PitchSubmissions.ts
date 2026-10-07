import type { CollectionConfig } from 'payload'

import { authenticated, serverOnly } from '../access'

const statusField = {
  name: 'status',
  type: 'select' as const,
  defaultValue: 'new',
  options: [
    { label: 'New', value: 'new' },
    { label: 'Reviewing', value: 'reviewing' },
    { label: 'Shortlisted', value: 'shortlisted' },
    { label: 'In conversation', value: 'conversation' },
    { label: 'Declined', value: 'declined' },
  ],
  admin: { position: 'sidebar' as const },
}

const answer = (name: string, label: string) => ({
  name,
  label,
  type: 'textarea' as const,
  admin: { readOnly: true },
})

export const PitchSubmissions: CollectionConfig = {
  slug: 'pitch-submissions',
  labels: { singular: 'Pitch', plural: 'Pitches' },
  admin: {
    useAsTitle: 'startupName',
    group: 'Submissions',
    defaultColumns: ['startupName', 'founderNames', 'sector', 'stage', 'status', 'createdAt'],
    description:
      'Every “Pitch To Us” application lands here. Decks are stored privately — only signed-in users can open them.',
    listSearchableFields: ['startupName', 'founderNames', 'email'],
  },
  defaultSort: '-createdAt',
  access: {
    create: serverOnly,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    statusField,
    { name: 'internalNotes', type: 'textarea', admin: { position: 'sidebar' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Startup',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'startupName', type: 'text', required: true, admin: { readOnly: true } },
                { name: 'website', type: 'text', admin: { readOnly: true } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'sector', type: 'text', admin: { readOnly: true } },
                { name: 'stage', type: 'text', admin: { readOnly: true } },
              ],
            },
            { name: 'deck', type: 'upload', relationTo: 'pitch-decks', admin: { readOnly: true } },
          ],
        },
        {
          label: 'Founders',
          fields: [
            {
              name: 'founderNames',
              label: 'Founder & co-founder names',
              type: 'text',
              admin: { readOnly: true },
            },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', admin: { readOnly: true } },
                { name: 'phone', type: 'text', admin: { readOnly: true } },
              ],
            },
          ],
        },
        {
          label: 'Answers',
          fields: [
            answer('vision', 'Vision for the business'),
            answer('superiority', 'Superiority over alternatives'),
            answer('traction', 'Users & traction'),
            answer('willingnessToPay', 'Why users pay'),
            answer('market', 'Target market & growth'),
            answer('defensibility', 'Hard-to-copy features'),
            answer('buildPlan', 'Team, knowledge & capital plan'),
          ],
        },
        {
          label: 'Eligibility',
          fields: [
            { name: 'isFounder', type: 'text', admin: { readOnly: true } },
            {
              name: 'readThesis',
              label: 'Read thesis sections',
              type: 'text',
              admin: { readOnly: true },
            },
            { name: 'dpiit', label: 'DPIIT status', type: 'text', admin: { readOnly: true } },
            { name: 'consent', type: 'checkbox', admin: { readOnly: true } },
            { name: 'userAgent', type: 'text', admin: { readOnly: true } },
          ],
        },
      ],
    },
  ],
}
