import type { Access, FieldAccess } from 'payload'

export const anyone: Access = () => true

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const authenticatedField: FieldAccess = ({ req: { user } }) => Boolean(user)

/** Public can read published documents; signed-in editors can also read drafts. */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

/** Nobody can create through the public API — only the site's own form handlers (overrideAccess). */
export const serverOnly: Access = () => false
