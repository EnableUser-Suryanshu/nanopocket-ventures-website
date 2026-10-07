import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'

export const EnquiryForms: GlobalConfig = {
  slug: 'enquiry-forms',
  label: 'Enquiry Forms',
  admin: {
    group: 'Settings',
    description:
      'The tabbed forms in “Reach Us”. Add, remove or reorder fields freely — submissions appear under Submissions → Enquiries.',
  },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'tabsLabel',
      label: 'Screen-reader label for the tabs',
      type: 'text',
      defaultValue: 'Choose an enquiry type',
    },
    {
      name: 'forms',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Form', plural: 'Forms' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'key',
              label: 'Form ID',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Short ID, e.g. investor — use #reach-us?form=investor to open it directly.',
              },
              validate: (value: string | null | undefined) =>
                !value || /^[a-z0-9-]+$/.test(value)
                  ? true
                  : 'Lowercase letters, numbers and dashes only',
            },
            { name: 'tabLabel', type: 'text', required: true },
          ],
        },
        { name: 'intro', type: 'textarea' },
        {
          name: 'fields',
          type: 'array',
          minRows: 1,
          admin: { initCollapsed: true },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  label: 'Field ID',
                  type: 'text',
                  required: true,
                  admin: { description: 'Use “name” and “email” for the sender’s name/e-mail.' },
                  validate: (value: string | null | undefined) =>
                    !value || /^[a-zA-Z0-9_]+$/.test(value)
                      ? true
                      : 'Letters, numbers and underscores only',
                },
                { name: 'label', type: 'text', required: true },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'text',
                  options: [
                    { label: 'Short text', value: 'text' },
                    { label: 'E-mail', value: 'email' },
                    { label: 'Phone', value: 'tel' },
                    { label: 'Web address', value: 'url' },
                    { label: 'Long text', value: 'textarea' },
                    { label: 'Dropdown', value: 'select' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'placeholder', type: 'text' },
                {
                  name: 'width',
                  type: 'select',
                  defaultValue: 'full',
                  options: [
                    { label: 'Full width', value: 'full' },
                    { label: 'Half width', value: 'half' },
                  ],
                },
                {
                  name: 'required',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: { style: { alignSelf: 'flex-end' } },
                },
              ],
            },
            {
              name: 'options',
              type: 'array',
              admin: { condition: (_, sibling) => sibling?.type === 'select' },
              fields: [{ name: 'value', label: 'Option', type: 'text', required: true }],
            },
          ],
        },
        { name: 'consentLabel', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'submitLabel', type: 'text', defaultValue: 'Send message' },
            {
              name: 'successMessage',
              type: 'text',
              defaultValue: 'Thank you — we will be in touch.',
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Messages',
      admin: { initCollapsed: true },
      fields: [
        { name: 'sendingLabel', type: 'text', defaultValue: 'Sending…' },
        { name: 'optionalLabel', type: 'text', defaultValue: 'Optional' },
        { name: 'selectPlaceholder', type: 'text', defaultValue: 'Select an option' },
        { name: 'errorRequired', type: 'text', defaultValue: 'This field is required.' },
        { name: 'errorEmail', type: 'text', defaultValue: 'Please enter a valid e-mail address.' },
        { name: 'errorUrl', type: 'text', defaultValue: 'Please enter a valid web address.' },
        {
          name: 'errorConsent',
          type: 'text',
          defaultValue: 'Please give your consent to send this message.',
        },
        {
          name: 'errorGeneric',
          type: 'text',
          defaultValue: 'Something went wrong while sending. Please try again in a moment.',
        },
        { name: 'anotherLabel', type: 'text', defaultValue: 'Send another message' },
      ],
    },
  ],
}
