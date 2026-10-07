/** Lightweight spam protection: honeypot, minimum fill time and per-IP rate limit (no CAPTCHA). */
const hits = new Map<string, number[]>()

export function clientIp(req: Request) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'local'
  ).trim()
}

export function rateLimited(ip: string, max = 6, windowMs = 10 * 60 * 1000) {
  const now = Date.now()
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs)
  list.push(now)
  hits.set(ip, list)
  if (hits.size > 5000) hits.clear()
  return list.length > max
}

/** Returns true when the submission looks automated. */
export function looksLikeBot(honeypot: unknown, startedAt: unknown, minMs = 2500) {
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return true
  const t = Number(startedAt)
  if (!Number.isFinite(t) || t <= 0) return true
  return Date.now() - t < minMs
}
