'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { useRef } from 'react'

/**
 * Injects the pre-paint motion boot script and JSON-LD into the server HTML stream only.
 * React never renders these on the client, so they can’t cause hydration or “script tag” warnings.
 */
export function BootScripts({ motion, jsonLd }: { motion: string; jsonLd: string }) {
  const done = useRef(false)
  useServerInsertedHTML(() => {
    if (done.current) return null
    done.current = true
    return (
      <>
        <script id="np-motion-boot" dangerouslySetInnerHTML={{ __html: motion }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </>
    )
  })
  return null
}
