import type { Field, GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { linkFields } from '../fields/shared'
import { revalidateGlobal } from '../hooks/revalidate'

type QuestionDefaults = { label: string; help?: string; placeholder?: string; required?: boolean }

/** A single editable form question: label, helper text, placeholder and required flag. */
const question = (name: string, d: QuestionDefaults): Field => ({
  name,
  type: 'group',
  admin: { hideGutter: true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: d.label,
          admin: { width: '60%' },
        },
        { name: 'placeholder', type: 'text', defaultValue: d.placeholder, admin: { width: '25%' } },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: d.required ?? false,
          admin: { width: '15%', style: { alignSelf: 'flex-end' } },
        },
      ],
    },
    { name: 'help', type: 'text', defaultValue: d.help },
  ],
})

const stepTitle = (defaultValue: string): Field => ({
  name: 'title',
  label: 'Step title',
  type: 'text',
  required: true,
  defaultValue,
})

const choiceQuestion = (name: string, label: string, defaults: string[]): Field => ({
  name,
  type: 'group',
  fields: [
    { name: 'label', type: 'text', required: true, defaultValue: label },
    { name: 'required', type: 'checkbox', defaultValue: true },
    {
      name: 'options',
      type: 'array',
      minRows: 1,
      defaultValue: defaults.map((value) => ({ value })),
      fields: [{ name: 'value', label: 'Option', type: 'text', required: true }],
    },
  ],
})

export const PitchForm: GlobalConfig = {
  slug: 'pitch-form',
  label: 'Pitch Form',
  admin: {
    group: 'Settings',
    description: 'All text, options and rules for the multi-step “Pitch To Us” application.',
  },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Eligibility',
          fields: [
            {
              name: 'founder',
              label: 'Step — Founder check',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Ask this question',
                },
                stepTitle('Who is applying'),
                {
                  name: 'question',
                  type: 'text',
                  defaultValue: 'Are you a Founder or Co-founder?',
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'yes', type: 'text', defaultValue: 'Yes' },
                    { name: 'no', type: 'text', defaultValue: 'No' },
                  ],
                },
                { name: 'noMessage', label: 'Message when “No”', type: 'textarea' },
                { name: 'noLink', type: 'group', fields: linkFields() },
              ],
            },
            {
              name: 'thesis',
              label: 'Step — Thesis check',
              type: 'group',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Ask this question',
                },
                stepTitle('Our thesis'),
                { name: 'question', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'yes', type: 'text', defaultValue: 'Yes' },
                    { name: 'no', type: 'text', defaultValue: 'No' },
                  ],
                },
                { name: 'noMessage', label: 'Message when “No”', type: 'textarea' },
                {
                  name: 'links',
                  type: 'array',
                  maxRows: 3,
                  fields: linkFields({ required: true }),
                },
              ],
            },
            {
              name: 'dpiit',
              label: 'Step — DPIIT registration',
              type: 'group',
              fields: [
                stepTitle('DPIIT recognition'),
                {
                  name: 'question',
                  type: 'text',
                  defaultValue: 'Is your Startup registered with DPIIT (erstwhile DIPP)?',
                },
                { name: 'yes', label: 'Option 1 — registered', type: 'text' },
                {
                  name: 'no',
                  label: 'Option 2 — not registered (blocks the application)',
                  type: 'text',
                },
                { name: 'applied', label: 'Option 3 — applied', type: 'text' },
                { name: 'planned', label: 'Option 4 — plans to register', type: 'text' },
                { name: 'noMessage', label: 'Message when “not registered”', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Questions',
          fields: [
            {
              name: 'startup',
              label: 'Step — Startup & founders',
              type: 'group',
              fields: [
                stepTitle('Startup & founders'),
                question('startupName', { label: 'Startup’s name', required: true }),
                question('website', { label: 'Startup’s website', placeholder: 'https://' }),
                question('founderNames', { label: 'Founder & Co-founder’s name', required: true }),
                question('email', { label: 'Founder or Co-founder’s e-mail', required: true }),
                question('phone', { label: 'Founder or Co-founder’s contact number' }),
              ],
            },
            {
              name: 'focus',
              label: 'Step — Sector & stage',
              type: 'group',
              fields: [
                stepTitle('Sector & stage'),
                choiceQuestion('sector', 'Sector / Themes operating in (Select One)', []),
                choiceQuestion('stage', 'Growth Stage of your Startup (Select One)', []),
              ],
            },
            {
              name: 'story',
              label: 'Step — Vision',
              type: 'group',
              fields: [
                stepTitle('Vision & edge'),
                question('vision', { label: 'What is your vision for the business?' }),
                question('superiority', {
                  label:
                    'How is your product/solution/service superior to the existing alternatives?',
                }),
              ],
            },
            {
              name: 'proof',
              label: 'Step — Traction',
              type: 'group',
              fields: [
                stepTitle('Early proof'),
                question('traction', {
                  label:
                    'Have you found users of your product/solution/service? If yes, what does the traction look like?',
                }),
                question('willingnessToPay', {
                  label:
                    'Why are these users paying or willing to pay for your product/solution/service?',
                }),
              ],
            },
            {
              name: 'market',
              label: 'Step — Market',
              type: 'group',
              fields: [
                stepTitle('Market & moat'),
                question('market', {
                  label: 'How big is your target market and what is its growth potential?',
                }),
                question('defensibility', {
                  label:
                    'When the product/solution/service gets traction, will the product/solution/service have unique features that are hard to copy? If yes, what are they?',
                }),
              ],
            },
            {
              name: 'plan',
              label: 'Step — Build plan',
              type: 'group',
              fields: [
                stepTitle('Building to scale'),
                question('buildPlan', {
                  label:
                    'How do you plan to get the team, knowledge and capital to build & scale this product/solution/service?',
                }),
              ],
            },
            {
              name: 'deck',
              label: 'Step — Deck & consent',
              type: 'group',
              fields: [
                stepTitle('Deck & consent'),
                { name: 'label', type: 'text', defaultValue: 'Pitch Deck' },
                {
                  name: 'help',
                  type: 'text',
                  defaultValue: 'Maximum 25MB. Your deck stays private.',
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'maxSizeMB', type: 'number', defaultValue: 25, min: 1, max: 25 },
                    {
                      name: 'required',
                      type: 'checkbox',
                      defaultValue: true,
                      admin: { style: { alignSelf: 'flex-end' } },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'browseLabel', type: 'text', defaultValue: 'Choose a file' },
                    { name: 'dropLabel', type: 'text', defaultValue: 'or drag and drop it here' },
                    { name: 'replaceLabel', type: 'text', defaultValue: 'Replace file' },
                  ],
                },
                { name: 'formatsNote', type: 'text', defaultValue: 'PDF, PPT, PPTX or Keynote' },
                { name: 'consentHeading', type: 'text', defaultValue: 'Consent and submission' },
                {
                  name: 'consentLabel',
                  type: 'textarea',
                  defaultValue:
                    'I consent to NanoPocket Ventures storing this submission and reviewing it with relevant team members and advisors.',
                },
              ],
            },
          ],
        },
        {
          label: 'Buttons & messages',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'stepLabel', type: 'text', defaultValue: 'Step' },
                { name: 'backLabel', type: 'text', defaultValue: 'Back' },
                { name: 'continueLabel', type: 'text', defaultValue: 'Continue' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'submitLabel', type: 'text', defaultValue: 'Submit application' },
                { name: 'submittingLabel', type: 'text', defaultValue: 'Submitting…' },
                { name: 'optionalLabel', type: 'text', defaultValue: 'Optional' },
              ],
            },
            { name: 'requiredNote', type: 'text', defaultValue: 'Fields marked * are required.' },
            { name: 'successTitle', type: 'text', defaultValue: 'Signal received.' },
            { name: 'successBody', type: 'textarea' },
            { name: 'restartLabel', type: 'text', defaultValue: 'Submit another application' },
            {
              type: 'collapsible',
              label: 'Error messages',
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'errorRequired',
                  type: 'text',
                  defaultValue: 'Please answer this question.',
                },
                { name: 'errorChoice', type: 'text', defaultValue: 'Please choose an option.' },
                {
                  name: 'errorEmail',
                  type: 'text',
                  defaultValue: 'Please enter a valid e-mail address.',
                },
                {
                  name: 'errorUrl',
                  type: 'text',
                  defaultValue: 'Please enter a valid web address.',
                },
                {
                  name: 'errorFileMissing',
                  type: 'text',
                  defaultValue: 'Please attach your pitch deck.',
                },
                {
                  name: 'errorFileSize',
                  type: 'text',
                  defaultValue: 'This file is larger than the allowed size.',
                },
                {
                  name: 'errorFileType',
                  type: 'text',
                  defaultValue: 'Please upload a PDF, PPT, PPTX or Keynote file.',
                },
                {
                  name: 'errorConsent',
                  type: 'text',
                  defaultValue: 'Please give your consent to submit.',
                },
                {
                  name: 'errorGeneric',
                  type: 'text',
                  defaultValue: 'Something went wrong while sending. Please try again in a moment.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
