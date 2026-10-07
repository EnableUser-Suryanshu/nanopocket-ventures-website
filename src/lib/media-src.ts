/**
 * Payload returns absolute upload URLs (it knows its serverURL). Files served by this app are turned back
 * into root-relative paths so next/image treats them as local (see `images.localPatterns`); anything else
 * — e.g. a cloud storage bucket — is passed through and needs a `remotePatterns` entry.
 */
export function mediaSrc(url: string) {
  try {
    const { pathname, search } = new URL(url, 'http://local')
    return pathname.startsWith('/api/media/') ? pathname + search : url
  } catch {
    return url
  }
}
