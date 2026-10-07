import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import type {
  EnquiryForm,
  Footer,
  Header,
  Insight,
  Page,
  PitchForm,
  PortfolioCompany,
  Press,
  SiteSetting,
  TeamMember,
} from '@/payload-types'

export const getPayloadClient = cache(() => getPayload({ config }))

export const isDraft = cache(async () => {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
})

export type SiteGlobals = {
  site: SiteSetting
  header: Header
  footer: Footer
  pitchForm: PitchForm
  enquiryForms: EnquiryForm
}

export const getGlobals = cache(async (): Promise<SiteGlobals> => {
  const payload = await getPayloadClient()
  const [site, header, footer, pitchForm, enquiryForms] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    payload.findGlobal({ slug: 'header', depth: 0 }),
    payload.findGlobal({ slug: 'footer', depth: 0 }),
    payload.findGlobal({ slug: 'pitch-form', depth: 0 }),
    payload.findGlobal({ slug: 'enquiry-forms', depth: 0 }),
  ])
  return { site, header, footer, pitchForm, enquiryForms }
})

export const getPage = cache(async (slug: string): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const draft = await isDraft()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
  })
  return res.docs[0] ?? null
})

export const getPageSlugs = cache(async () => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    limit: 100,
    depth: 0,
    select: { slug: true, updatedAt: true },
  })
  return res.docs
})

export type CollectionsData = {
  team: TeamMember[]
  insights: Insight[]
  press: Press[]
  companies: PortfolioCompany[]
}

export const getCollections = cache(async (): Promise<CollectionsData> => {
  const payload = await getPayloadClient()
  const draft = await isDraft()
  const [team, insights, press, companies] = await Promise.all([
    payload.find({ collection: 'team-members', limit: 50, depth: 1, sort: 'order' }),
    payload.find({
      collection: 'insights',
      limit: 24,
      depth: 1,
      sort: '-publishedAt',
      draft,
      overrideAccess: draft,
    }),
    payload.find({ collection: 'press', limit: 24, depth: 1, sort: '-publishedAt' }),
    payload.find({
      collection: 'portfolio-companies',
      limit: 50,
      depth: 1,
      sort: 'order',
      where: { published: { equals: true } },
    }),
  ])
  return { team: team.docs, insights: insights.docs, press: press.docs, companies: companies.docs }
})

export const getInsight = cache(async (slug: string): Promise<Insight | null> => {
  const payload = await getPayloadClient()
  const draft = await isDraft()
  const res = await payload.find({
    collection: 'insights',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
  })
  return res.docs[0] ?? null
})
