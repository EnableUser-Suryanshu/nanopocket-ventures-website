import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'

import { PITCH_DECK_MIME_TYPES } from '@/collections/PitchDecks'
import { DECK_EXTENSIONS, DECK_UPLOAD_PREFIX, MAX_DECK_BYTES } from '@/lib/forms/deck-upload'
import { clientIp, rateLimited } from '@/lib/forms/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Hands the browser a short-lived token to upload one pitch deck straight to Vercel Blob. Serverless
 * functions on Vercel only accept 4.5 MB request bodies, so decks can't travel through the form post
 * there. Only used when Blob storage is configured; local and VPS installs post the file directly.
 */
export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'not_configured' }, { status: 404 })
  }
  let body: HandleUploadBody
  try {
    body = (await req.json()) as HandleUploadBody
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (rateLimited(clientIp(req))) throw new Error('rate_limited')
        if (!pathname.startsWith(DECK_UPLOAD_PREFIX) || !DECK_EXTENSIONS.test(pathname)) {
          throw new Error('invalid_file')
        }
        return {
          // Browsers often report Keynote / legacy PowerPoint loosely, so accept the generic types too;
          // the form handler checks the extension and Payload sniffs the real file type on save.
          allowedContentTypes: [...PITCH_DECK_MIME_TYPES, 'application/octet-stream'],
          maximumSizeInBytes: MAX_DECK_BYTES,
          addRandomSuffix: true,
        }
      },
      onUploadCompleted: async () => {
        // Nothing to do — the form submission picks the file up and removes the temporary copy.
      },
    })
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'upload_failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
