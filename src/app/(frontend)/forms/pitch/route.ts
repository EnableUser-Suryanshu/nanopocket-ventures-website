import { del, head } from '@vercel/blob'
import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

import { isTemporaryDeckUrl, MAX_DECK_BYTES } from '@/lib/forms/deck-upload'
import { clientIp, looksLikeBot, rateLimited } from '@/lib/forms/guard'
import { notifyTeam } from '@/lib/forms/notify'
import { dpiitLabel, emptyPitch, type PitchValues, validateAll } from '@/lib/forms/pitch'
import { getPayloadClient } from '@/lib/queries'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
// Copying a large deck from temporary upload into private storage can take a few seconds
export const maxDuration = 60

const MIME_BY_EXT: Record<string, string> = {
  pdf: 'application/pdf',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  key: 'application/vnd.apple.keynote',
}

export async function POST(req: Request) {
  const ip = clientIp(req)
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 })
  }

  // Bots get a polite “success” so they learn nothing.
  if (looksLikeBot(form.get('company_fax'), form.get('startedAt'))) {
    return NextResponse.json({ ok: true })
  }

  const values = { ...emptyPitch } as PitchValues
  for (const key of Object.keys(emptyPitch) as Array<keyof PitchValues>) {
    const raw = form.get(key)
    if (key === 'consent') values.consent = raw === 'true'
    else (values as Record<string, unknown>)[key] = typeof raw === 'string' ? raw.trim() : ''
  }

  // The deck arrives either as the file itself (local / VPS) or — on Vercel, where request bodies are
  // capped at 4.5 MB — as a temporary upload in Blob storage made by the browser (see ./upload).
  const deck = form.get('deck')
  const posted = deck instanceof File && deck.size > 0 ? deck : null
  const deckUrlRaw = form.get('deckUrl')
  const temporaryUrl =
    !posted &&
    process.env.BLOB_READ_WRITE_TOKEN &&
    typeof deckUrlRaw === 'string' &&
    isTemporaryDeckUrl(deckUrlRaw)
      ? deckUrlRaw
      : null
  const token = process.env.BLOB_READ_WRITE_TOKEN
  const discardTemporary = () =>
    temporaryUrl ? del(temporaryUrl, { token }).catch(() => undefined) : undefined

  let file: { name: string; size: number; type: string; read: () => Promise<Buffer> } | null = null
  if (posted) {
    file = {
      name: posted.name,
      size: posted.size,
      type: posted.type,
      read: async () => Buffer.from(await posted.arrayBuffer()),
    }
  } else if (temporaryUrl) {
    try {
      const meta = await head(temporaryUrl, { token })
      const deckName = form.get('deckName')
      file = {
        name: typeof deckName === 'string' && deckName ? deckName : meta.pathname,
        size: meta.size,
        type: meta.contentType,
        read: async () => {
          if (meta.size > MAX_DECK_BYTES) throw new Error('deck_too_large')
          const res = await fetch(temporaryUrl, { cache: 'no-store' })
          if (!res.ok) throw new Error('deck_unavailable')
          return Buffer.from(await res.arrayBuffer())
        },
      }
    } catch {
      file = null
    }
  }

  const payload = await getPayloadClient()
  const config = await payload.findGlobal({ slug: 'pitch-form' })

  const errors = validateAll(
    values,
    config,
    file ? { name: file.name, size: file.size, type: file.type } : null,
  )
  if (Object.keys(errors).length) {
    await discardTemporary()
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  try {
    let deckId: number | string | undefined
    if (file) {
      try {
        const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf'
        // Random part keeps stored file names unguessable
        const safeName = `${
          values.startupName
            .replace(/[^a-z0-9]+/gi, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 60) || 'deck'
        }-${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`
        const created = await payload.create({
          collection: 'pitch-decks',
          data: { startupName: values.startupName },
          file: {
            data: await file.read(),
            mimetype: MIME_BY_EXT[ext] || file.type || 'application/octet-stream',
            name: safeName,
            size: file.size,
          },
          overrideAccess: true,
        })
        deckId = created.id
        // stored privately now — remove the temporary browser upload
        await discardTemporary()
      } catch (err) {
        await discardTemporary()
        // Payload inspects the file bytes (e.g. corrupted PDF, disguised file type) — report it on the field.
        if ((err as { name?: string }).name === 'ValidationError') {
          return NextResponse.json(
            {
              ok: false,
              errors: {
                deck:
                  config.errorFileType || 'Please upload a valid PDF, PPT, PPTX or Keynote file.',
              },
            },
            { status: 422 },
          )
        }
        throw err
      }
    }

    const submission = await payload.create({
      collection: 'pitch-submissions',
      data: {
        status: 'new',
        startupName: values.startupName,
        website: values.website,
        sector: values.sector,
        stage: values.stage,
        deck: deckId as number | undefined,
        founderNames: values.founderNames,
        email: values.email,
        phone: values.phone,
        vision: values.vision,
        superiority: values.superiority,
        traction: values.traction,
        willingnessToPay: values.willingnessToPay,
        market: values.market,
        defensibility: values.defensibility,
        buildPlan: values.buildPlan,
        isFounder: values.isFounder || 'not asked',
        readThesis: values.readThesis || 'not asked',
        dpiit: dpiitLabel(config, values.dpiit) || values.dpiit,
        consent: values.consent,
        userAgent: req.headers.get('user-agent')?.slice(0, 300) || '',
      },
      overrideAccess: true,
    })

    await notifyTeam(
      payload,
      `New pitch: ${values.startupName}`,
      [
        ['Startup', values.startupName],
        ['Website', values.website],
        ['Founders', values.founderNames],
        ['E-mail', values.email],
        ['Phone', values.phone],
        ['Sector', values.sector],
        ['Stage', values.stage],
        ['DPIIT', dpiitLabel(config, values.dpiit)],
        ['Vision', values.vision],
      ],
      `/admin/collections/pitch-submissions/${submission.id}`,
    )

    return NextResponse.json({ ok: true })
  } catch (err) {
    payload.logger.error({ err }, 'Pitch submission failed')
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
