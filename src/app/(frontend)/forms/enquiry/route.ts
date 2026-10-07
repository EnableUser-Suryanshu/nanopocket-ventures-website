import { NextResponse } from 'next/server'

import { validateEnquiry } from '@/lib/forms/enquiry'
import { clientIp, looksLikeBot, rateLimited } from '@/lib/forms/guard'
import { notifyTeam } from '@/lib/forms/notify'
import { getPayloadClient } from '@/lib/queries'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Body = {
  form?: string
  values?: Record<string, unknown>
  consent?: boolean
  startedAt?: number
  company_fax?: string
}

export async function POST(req: Request) {
  const ip = clientIp(req)
  if (rateLimited(ip))
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })

  let body: Body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 })
  }
  if (looksLikeBot(body.company_fax, body.startedAt, 1500)) return NextResponse.json({ ok: true })

  const payload = await getPayloadClient()
  const config = await payload.findGlobal({ slug: 'enquiry-forms' })
  const form = (config.forms || []).find((f) => f.key === body.form)
  if (!form) return NextResponse.json({ ok: false, error: 'unknown_form' }, { status: 400 })

  const values: Record<string, string> = {}
  for (const field of form.fields || []) {
    const raw = body.values?.[field.name]
    values[field.name] = typeof raw === 'string' ? raw.trim() : ''
  }
  const errors = validateEnquiry(form, values, Boolean(body.consent), config)
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 })

  try {
    const answers = (form.fields || []).map((f) => ({
      question: f.label,
      answer: values[f.name] || '',
    }))
    const doc = await payload.create({
      collection: 'enquiries',
      data: {
        status: 'new',
        type: form.tabLabel,
        name: values.name || '',
        email: values.email || undefined,
        answers,
        userAgent: req.headers.get('user-agent')?.slice(0, 300) || '',
      },
      overrideAccess: true,
    })
    await notifyTeam(
      payload,
      `New enquiry (${form.tabLabel}): ${values.name || values.email || ''}`,
      answers.map((a) => [a.question, a.answer]),
      `/admin/collections/enquiries/${doc.id}`,
    )
    return NextResponse.json({ ok: true })
  } catch (err) {
    payload.logger.error({ err }, 'Enquiry submission failed')
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
