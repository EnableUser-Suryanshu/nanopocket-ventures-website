import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { getPayloadClient } from '@/lib/queries'

/** Entered from the CMS “Live Preview” / “Preview” buttons. Requires a signed-in editor. */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const secret = url.searchParams.get('secret')
  const path = url.searchParams.get('path') || '/'
  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview token', { status: 401 })
  }
  if (!path.startsWith('/') || path.startsWith('//')) {
    return new Response('Invalid path', { status: 400 })
  }
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return new Response('Please sign in to the CMS first', { status: 403 })

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
