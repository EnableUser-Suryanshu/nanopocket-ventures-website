/**
 * Seeds the CMS with the approved NanoPocket Ventures copy.
 *   npm run seed        → creates anything missing (safe to re-run)
 *   npm run seed:reset  → overwrites pages & globals with the defaults below
 */
import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import {
  enquiryForms,
  footer,
  header,
  homeLayout,
  legalPages,
  LINKS,
  pitchForm,
  siteSettings,
} from './content'

const reset = process.env.SEED_RESET === '1'
const ctx = { disableRevalidate: true }

type Obj = Record<string, unknown>
const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v)

const isBlank = (v: unknown): boolean =>
  v === null || v === undefined || (isObj(v) && Object.values(v).every(isBlank))

/**
 * Defaults for fields added after the first seed: groups that were never saved and checkboxes that were
 * never set. Text an editor deliberately cleared stays cleared, and lists are never touched.
 */
function missingFields(current: Obj, defaults: Obj): Obj | null {
  const patch: Obj = {}
  for (const [key, value] of Object.entries(defaults)) {
    const stored = current[key]
    const neverSavedGroup = isObj(value) && isBlank(stored)
    const unsetCheckbox = typeof value === 'boolean' && (stored === null || stored === undefined)
    if (neverSavedGroup || unsetCheckbox) patch[key] = value
  }
  return Object.keys(patch).length ? patch : null
}

async function run() {
  const payload = await getPayload({ config })
  const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

  // --- Admin user -------------------------------------------------------
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (email && password) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: { email, password, name: 'Site Admin' },
        context: ctx,
      })
      log(`Created admin user ${email}`)
    }
  }

  // --- Team -------------------------------------------------------------
  const rachna = await payload.find({
    collection: 'team-members',
    where: { name: { equals: 'Rachna Rangarajan' } },
    limit: 1,
  })
  if (rachna.totalDocs === 0) {
    await payload.create({
      collection: 'team-members',
      data: {
        name: 'Rachna Rangarajan',
        role: 'Founder & Managing Partner',
        bio: '',
        linkedin: LINKS.rachnaLinkedin,
        order: 1,
      },
      context: ctx,
    })
    log('Created team member Rachna Rangarajan')
  }

  // --- Globals ----------------------------------------------------------
  const globals = [
    ['site-settings', siteSettings],
    ['header', header],
    ['footer', footer],
    ['pitch-form', pitchForm],
    ['enquiry-forms', enquiryForms],
  ] as const

  for (const [slug, data] of globals) {
    const current = (await payload.findGlobal({ slug })) as unknown as Record<string, unknown>
    const isEmpty = !current?.updatedAt
    if (reset || isEmpty) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.updateGlobal({ slug, data: data as any, context: ctx })
      log(`Seeded global “${slug}”`)
    } else {
      const patch = missingFields(current, data as unknown as Obj)
      if (patch) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await payload.updateGlobal({ slug, data: patch as any, context: ctx })
        log(`Filled new fields in “${slug}”: ${Object.keys(patch).join(', ')}`)
      }
    }
  }

  // --- Pages ------------------------------------------------------------
  const pages = [
    { title: 'Home', slug: 'home', layout: homeLayout },
    ...legalPages.map((p) => ({
      title: p.title,
      slug: p.slug,
      layout: [{ blockType: 'richText', content: p.content, anchorId: 'content', theme: 'white' }],
    })),
  ]

  for (const page of pages) {
    const found = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      draft: true,
    })
    const data = { ...page, _status: 'published' as const }
    if (found.totalDocs === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.create({ collection: 'pages', data: data as any, context: ctx })
      log(`Created page “${page.slug}”`)
    } else if (reset) {
      await payload.update({
        collection: 'pages',
        id: found.docs[0].id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
        context: ctx,
      })
      log(`Reset page “${page.slug}”`)
    }
  }

  log('Done.')
  process.exit(0)
}

try {
  await run()
} catch (err) {
  console.error(err)
  process.exit(1)
}
