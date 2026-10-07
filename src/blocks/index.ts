import type { Block, Field } from 'payload'

import {
  artField,
  blockSettings,
  imageField,
  linkFields,
  linkGroup,
  sectionHeading,
} from '../fields/shared'

const ctaArray = (name: string, label: string, max = 3): Field => ({
  name,
  label,
  type: 'array',
  maxRows: max,
  labels: { singular: 'Button', plural: 'Buttons' },
  admin: { initCollapsed: true },
  fields: [
    ...linkFields({ required: true }),
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'solid',
      options: [
        { label: 'Solid (black)', value: 'solid' },
        { label: 'Outline', value: 'outline' },
      ],
    },
  ],
})

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */
export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Hero sections' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'lineOne',
          label: 'Tagline — line 1',
          type: 'text',
          required: true,
          defaultValue: 'Where Small Bets',
        },
        {
          name: 'highlight',
          label: 'Tagline — gold word',
          type: 'text',
          required: true,
          defaultValue: 'Discover',
        },
        {
          name: 'lineTwo',
          label: 'Tagline — underlined line',
          type: 'text',
          required: true,
          defaultValue: 'India’s Big Tech.',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...artField('seed'),
          name: 'inlineArt',
          label: 'Small visual beside the gold word',
        } as Field,
        imageField('inlineImage', 'Small visual — image (optional)'),
      ],
    },
    {
      name: 'subline',
      type: 'textarea',
      admin: {
        rows: 2,
        description: 'Short supporting line beside the gold word. Leave empty to hide.',
      },
    },
    ctaArray('ctas', 'Buttons'),
    { name: 'scrollLabel', type: 'text', defaultValue: 'Scroll down' },
    {
      name: 'visual',
      label: 'Right-hand visual',
      type: 'select',
      defaultValue: 'showcase',
      options: [
        { label: 'Moving cards (tilted columns)', value: 'showcase' },
        { label: 'Globe', value: 'globe' },
      ],
    },
    {
      name: 'tiles',
      label: 'Moving cards',
      type: 'array',
      admin: {
        initCollapsed: true,
        condition: (_, sibling) => sibling?.visual !== 'globe',
        description:
          'Cards scrolling in the tilted columns. Upload an image or pick an illustration.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'meta', type: 'text' },
          ],
        },
        { type: 'row', fields: [artField('orbit'), imageField()] },
      ],
    },
    {
      type: 'collapsible',
      label: 'Globe',
      admin: { initCollapsed: true, condition: (_, sibling) => sibling?.visual === 'globe' },
      fields: [
        {
          name: 'origin',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', defaultValue: 'Mumbai' },
                { name: 'lat', type: 'number', defaultValue: 19.076 },
                { name: 'lng', type: 'number', defaultValue: 72.8777 },
              ],
            },
          ],
        },
        {
          name: 'destinations',
          type: 'array',
          labels: { singular: 'Destination', plural: 'Destinations' },
          admin: { initCollapsed: true },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'lat', type: 'number', required: true },
                { name: 'lng', type: 'number', required: true },
              ],
            },
          ],
        },
      ],
    },
    blockSettings('home'),
  ],
}

/* ------------------------------------------------------------------ */
/* 2. Statement (big pinned card over moving tiles)                    */
/* ------------------------------------------------------------------ */
export const StatementBlock: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'Statement', plural: 'Statements' },
  fields: [
    {
      name: 'lines',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Line', plural: 'Lines' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'before', label: 'Words before', type: 'text', required: true },
            {
              name: 'inline',
              label: 'In-between element',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small caption', value: 'caption' },
                { label: 'Animated arrow', value: 'arrow' },
                { label: 'Button', value: 'button' },
                { label: 'Logomark', value: 'mark' },
              ],
            },
            { name: 'after', label: 'Words after', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Used by the “Small caption” element.' },
    },
    linkGroup('button', 'Button', { description: 'Used by the “Button” element.' }),
    {
      name: 'tiles',
      label: 'Background tiles',
      type: 'array',
      admin: { initCollapsed: true, description: 'Moving tiles revealed behind the card.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'meta', type: 'text' },
          ],
        },
        { type: 'row', fields: [artField('orbit'), imageField()] },
      ],
    },
    blockSettings('statement'),
  ],
}

/* ------------------------------------------------------------------ */
/* 3. Who we are                                                        */
/* ------------------------------------------------------------------ */
export const AboutBlock: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  labels: { singular: 'Who We Are', plural: 'Who We Are' },
  fields: [
    ...sectionHeading({ eyebrow: 'About the fund', title: 'Who We Are' }),
    {
      name: 'paragraphs',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'facts',
      type: 'array',
      labels: { singular: 'Fact', plural: 'Facts' },
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
    { type: 'row', fields: [artField('orbit'), imageField()] },
    { name: 'imageCaption', type: 'text' },
    blockSettings('who-we-are'),
  ],
}

/* ------------------------------------------------------------------ */
/* 4. What we are looking for (sticky stacked cards)                   */
/* ------------------------------------------------------------------ */
export const CriteriaBlock: Block = {
  slug: 'criteria',
  interfaceName: 'CriteriaBlock',
  labels: { singular: 'What We Are Looking For', plural: 'What We Are Looking For' },
  fields: [
    ...sectionHeading({
      eyebrow: 'Investment criteria',
      title: 'What We Are Looking For',
      tagline: 'Signals before consensus.',
    }),
    ctaArray('ctas', 'Buttons', 2),
    {
      name: 'cardLabel',
      type: 'text',
      defaultValue: 'We look for',
      admin: { description: 'Small text above each card title.' },
    },
    {
      name: 'items',
      label: 'Criteria',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Criterion', plural: 'Criteria' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { type: 'row', fields: [artField('seed'), imageField()] },
      ],
    },
    blockSettings('what-we-look-for'),
  ],
}

/* ------------------------------------------------------------------ */
/* 5. Where are we investing                                           */
/* ------------------------------------------------------------------ */
export const ThesisBlock: Block = {
  slug: 'thesis',
  interfaceName: 'ThesisBlock',
  labels: { singular: 'Where Are We Investing', plural: 'Where Are We Investing' },
  fields: [
    ...sectionHeading({ eyebrow: 'Investment thesis', title: 'Where Are We Investing' }),
    {
      name: 'pillars',
      label: 'Tag phrases (scrolling band)',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'facts',
      label: 'Key facts',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
            { name: 'note', type: 'text' },
          ],
        },
      ],
    },
    { name: 'intro', type: 'textarea' },
    { name: 'listTitle', type: 'text', defaultValue: 'Sectors' },
    {
      name: 'sectors',
      type: 'array',
      labels: { singular: 'Sector', plural: 'Sectors' },
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'category', type: 'text' },
          ],
        },
        { name: 'summary', type: 'textarea' },
        {
          name: 'tags',
          type: 'array',
          admin: { initCollapsed: true },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          name: 'notes',
          label: 'Thesis notes',
          type: 'array',
          admin: { initCollapsed: true },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'body', type: 'textarea', required: true },
          ],
        },
        { type: 'row', fields: [artField('orbit'), imageField()] },
      ],
    },
    {
      name: 'other',
      label: 'Other high-conviction themes',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Other high conviction themes' },
        { name: 'textBefore', type: 'text' },
        linkGroup('link', 'Linked words'),
        { name: 'textAfter', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'openLabel', type: 'text', defaultValue: 'Read the thesis' },
        { name: 'closeLabel', type: 'text', defaultValue: 'Close' },
        { name: 'pendingLabel', type: 'text', defaultValue: 'Detailed note coming soon' },
      ],
    },
    ctaArray('ctas', 'Buttons', 2),
    blockSettings('where-we-invest', 'white'),
  ],
}

/* ------------------------------------------------------------------ */
/* 6. Portfolio highlights                                             */
/* ------------------------------------------------------------------ */
export const PortfolioBlock: Block = {
  slug: 'portfolio',
  interfaceName: 'PortfolioBlock',
  labels: { singular: 'Portfolio Highlights', plural: 'Portfolio Highlights' },
  fields: [
    ...sectionHeading({ eyebrow: 'Portfolio', title: 'Portfolio Highlights' }),
    {
      name: 'highlights',
      label: 'Headline statements',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'pillars',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Key numbers',
      admin: { initCollapsed: true },
      fields: [
        { name: 'showKeyNumbers', type: 'checkbox', defaultValue: true },
        {
          name: 'emptyValue',
          type: 'text',
          defaultValue: '—',
          admin: { description: 'Shown where a number has not been filled in yet.' },
        },
        {
          name: 'numberGroups',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'items',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'value', type: 'text', admin: { description: 'e.g. 12, $4.5Mn' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Portfolio companies',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'showCompanies',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Lists entries from the Portfolio Companies collection.' },
        },
        { name: 'companiesTitle', type: 'text', defaultValue: 'Work With Our Portfolio' },
        {
          name: 'emptyNote',
          type: 'textarea',
          defaultValue: 'Select investments will be disclosed after internal approval.',
        },
        { name: 'visitLabel', type: 'text', defaultValue: 'Visit' },
      ],
    },
    ctaArray('ctas', 'Buttons', 2),
    blockSettings('portfolio', 'light'),
  ],
}

/* ------------------------------------------------------------------ */
/* 7. Team                                                             */
/* ------------------------------------------------------------------ */
export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: { singular: 'Team Responsible', plural: 'Team Responsible' },
  fields: [
    ...sectionHeading({
      eyebrow: 'People',
      title: 'Team Responsible',
      tagline: 'Founder First Focussed',
    }),
    {
      name: 'marquee',
      label: 'Scrolling phrases',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      admin: { description: 'Leave empty to show every team member in order.' },
    },
    { name: 'linkedinLabel', type: 'text', defaultValue: 'LinkedIn' },
    blockSettings('team'),
  ],
}

/* ------------------------------------------------------------------ */
/* 8. Insights / Press list                                            */
/* ------------------------------------------------------------------ */
export const PostsBlock: Block = {
  slug: 'posts',
  interfaceName: 'PostsBlock',
  labels: { singular: 'Insights / News list', plural: 'Insights / News lists' },
  fields: [
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'insights',
      options: [
        { label: 'Our Insights', value: 'insights' },
        { label: 'Us In News (press)', value: 'press' },
      ],
    },
    ...sectionHeading({ eyebrow: 'Insights', title: 'Our Insights' }),
    { name: 'limit', type: 'number', defaultValue: 6, min: 1, max: 24 },
    { name: 'readLabel', type: 'text', defaultValue: 'Read' },
    {
      type: 'collapsible',
      label: 'Empty state',
      admin: { initCollapsed: true },
      fields: [
        { name: 'emptyTitle', type: 'text', defaultValue: 'First notes arriving soon.' },
        { name: 'emptyBody', type: 'textarea' },
        linkGroup('emptyLink', 'Empty-state link'),
      ],
    },
    blockSettings('insights'),
  ],
}

/* ------------------------------------------------------------------ */
/* 9. Pitch to us (form copy lives in the “Pitch Form” global)         */
/* ------------------------------------------------------------------ */
export const PitchBlock: Block = {
  slug: 'pitch',
  interfaceName: 'PitchBlock',
  labels: { singular: 'Pitch To Us', plural: 'Pitch To Us' },
  fields: [
    ...sectionHeading({
      eyebrow: 'Founders',
      title: 'Pitch To Us',
      tagline: 'Send one clear signal.',
    }),
    { name: 'intro', type: 'textarea' },
    { name: 'note', type: 'textarea' },
    {
      name: 'noteLinks',
      type: 'array',
      maxRows: 3,
      admin: { description: 'Links shown under the note (e.g. to the thesis sections).' },
      fields: linkFields({ required: true }),
    },
    blockSettings('pitch-to-us', 'dark'),
  ],
}

/* ------------------------------------------------------------------ */
/* 10. Reach us (form copy lives in the “Enquiry Forms” global)        */
/* ------------------------------------------------------------------ */
export const ContactBlock: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  labels: { singular: 'Reach Us', plural: 'Reach Us' },
  fields: [
    ...sectionHeading({ eyebrow: 'Contact', title: 'Reach Us', tagline: 'The right path.' }),
    { name: 'intro', type: 'textarea' },
    { name: 'accessTitle', type: 'text', defaultValue: 'Quick access' },
    {
      name: 'accessLinks',
      type: 'array',
      fields: [...linkFields({ required: true }), { name: 'description', type: 'text' }],
    },
    blockSettings('reach-us'),
  ],
}

/* ------------------------------------------------------------------ */
/* 11. Rich text (legal pages, statements)                             */
/* ------------------------------------------------------------------ */
export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  labels: { singular: 'Text', plural: 'Text' },
  fields: [{ name: 'content', type: 'richText', required: true }, blockSettings('content')],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  StatementBlock,
  AboutBlock,
  CriteriaBlock,
  ThesisBlock,
  PortfolioBlock,
  TeamBlock,
  PostsBlock,
  PitchBlock,
  ContactBlock,
  RichTextBlock,
]
