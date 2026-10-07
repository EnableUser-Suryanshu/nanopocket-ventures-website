/**
 * Public URL of the site. On Vercel it falls back to the project's production domain (custom domain once
 * added) — the NEXT_PUBLIC_ copy is what browser code (live preview) sees.
 */
const vercelHost =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL

export const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000')
