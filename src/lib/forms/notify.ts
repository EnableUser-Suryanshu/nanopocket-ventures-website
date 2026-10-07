import type { Payload } from 'payload'

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  )

/** E-mails the team when NOTIFY_EMAIL (and SMTP_*) are configured. Never blocks the submission. */
export async function notifyTeam(
  payload: Payload,
  subject: string,
  rows: Array<[string, string]>,
  adminPath: string,
) {
  const to = process.env.NOTIFY_EMAIL
  if (!to) return
  const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#050505">
      <h2 style="font-weight:600">${escape(subject)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) =>
              `<tr><td style="vertical-align:top;color:#5d5d5d;white-space:nowrap">${escape(k)}</td><td>${escape(v).replace(/\n/g, '<br>')}</td></tr>`,
          )
          .join('')}
      </table>
      <p><a href="${base}${adminPath}">Open in the CMS</a></p>
    </div>`
  try {
    await payload.sendEmail({ to, subject, html })
  } catch (err) {
    payload.logger.error({ err }, 'Failed to send notification e-mail')
  }
}
