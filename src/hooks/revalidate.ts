import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * The site is small, so any published content change simply revalidates
 * every page. Skipped while seeding (no Next.js runtime) and for draft autosaves.
 */
async function revalidateEverything(logger: { warn: (msg: string) => void }) {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    logger.warn('Revalidation skipped (not running inside Next.js).')
  }
}

export const revalidateCollection: CollectionAfterChangeHook = async ({ doc, req, context }) => {
  if (context?.disableRevalidate) return doc
  if (doc && '_status' in doc && doc._status !== 'published') return doc
  await revalidateEverything(req.payload.logger)
  return doc
}

export const revalidateCollectionDelete: CollectionAfterDeleteHook = async ({
  doc,
  req,
  context,
}) => {
  if (context?.disableRevalidate) return doc
  await revalidateEverything(req.payload.logger)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req, context }) => {
  if (context?.disableRevalidate) return doc
  await revalidateEverything(req.payload.logger)
  return doc
}
