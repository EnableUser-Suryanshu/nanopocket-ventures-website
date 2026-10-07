'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

import { serverURL } from '@/lib/server-url'

/** Refreshes the page whenever an editor saves/autosaves in the CMS live-preview window. */
export function LivePreviewListener() {
  const router = useRouter()
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />
}
