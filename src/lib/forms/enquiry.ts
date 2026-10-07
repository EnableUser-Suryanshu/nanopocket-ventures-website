/** Shared rules for the CMS-defined enquiry forms (Investor / Partner / Media). */
import type { EnquiryForm } from '@/payload-types'

export type EnquiryFormDef = NonNullable<EnquiryForm['forms']>[number]
export type EnquiryField = NonNullable<EnquiryFormDef['fields']>[number]

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const URL_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i
const PHONE = /^[+\d][\d\s\-().]{6,20}$/

export function validateEnquiry(
  form: EnquiryFormDef,
  values: Record<string, string>,
  consent: boolean,
  messages: EnquiryForm,
): Record<string, string> {
  const errors: Record<string, string> = {}
  const required = messages.errorRequired || 'This field is required.'
  for (const field of form.fields || []) {
    const value = (values[field.name] || '').trim()
    const max = field.type === 'textarea' ? 4000 : 300
    if (field.required && !value) errors[field.name] = required
    else if (value.length > max) errors[field.name] = required
    else if (value && field.type === 'email' && !EMAIL.test(value))
      errors[field.name] = messages.errorEmail || required
    else if (value && field.type === 'url' && !URL_RE.test(value))
      errors[field.name] = messages.errorUrl || required
    else if (value && field.type === 'tel' && !PHONE.test(value)) errors[field.name] = required
    else if (value && field.type === 'select') {
      const options = (field.options || []).map((o) => o.value)
      if (options.length && !options.includes(value)) errors[field.name] = required
    }
  }
  if (form.consentLabel && !consent) errors.consent = messages.errorConsent || required
  return errors
}
