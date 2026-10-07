/** Direct-to-Blob pitch deck uploads (used on Vercel, where function bodies are capped at 4.5 MB). */
export const DECK_UPLOAD_PREFIX = 'pitch-uploads/'
export const MAX_DECK_BYTES = 26_214_400 // 25 MB
export const DECK_EXTENSIONS = /\.(pdf|pptx?|key)$/i

/** Only temporary uploads in our own Blob store are accepted by the form handler. */
export function isTemporaryDeckUrl(value: string) {
  try {
    const url = new URL(value)
    return (
      url.protocol === 'https:' &&
      url.hostname.endsWith('.public.blob.vercel-storage.com') &&
      url.pathname.startsWith(`/${DECK_UPLOAD_PREFIX}`) &&
      DECK_EXTENSIONS.test(url.pathname)
    )
  } catch {
    return false
  }
}

/** A tidy, extension-preserving name for the temporary upload path. */
export function deckUploadPath(fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase() || 'pdf'
  const base =
    fileName
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60) || 'deck'
  return `${DECK_UPLOAD_PREFIX}${base}.${ext}`
}
