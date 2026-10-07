'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { CheckIcon } from '@/components/ui/Icons'
import { cn } from '@/lib/cn'
import { type EnquiryFormDef, validateEnquiry } from '@/lib/forms/enquiry'
import type { EnquiryForm } from '@/payload-types'

import styles from './Form.module.css'
import tabStyles from './Tabs.module.css'

type Status = 'idle' | 'sending' | 'success' | 'error'

function SingleForm({
  form,
  messages,
  uid,
}: {
  form: EnquiryFormDef
  messages: EnquiryForm
  uid: string
}) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const startedAt = useRef(0)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateEnquiry(form, values, consent, messages)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const hp =
        (formRef.current?.elements.namedItem('company_fax') as HTMLInputElement | null)?.value || ''
      const res = await fetch('/forms/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: form.key,
          values,
          consent,
          startedAt: startedAt.current,
          company_fax: hp,
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (res.ok && body.ok) {
        setStatus('success')
        setValues({})
        setConsent(false)
      } else {
        if (body.errors) setErrors(body.errors)
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon} aria-hidden="true">
          <CheckIcon />
        </span>
        <p className={styles.successTitle} ref={successRef} tabIndex={-1}>
          {form.successMessage}
        </p>
        <Button
          label={messages.anotherLabel || 'Send another message'}
          variant="outline"
          onClick={() => {
            startedAt.current = Date.now()
            setStatus('idle')
          }}
        />
      </div>
    )
  }

  const fields = form.fields || []

  return (
    <form ref={formRef} className={styles.form} noValidate onSubmit={onSubmit}>
      {form.intro && <p className={tabStyles.intro}>{form.intro}</p>}
      <div className={tabStyles.fields}>
        {fields.map((f) => {
          const id = `${uid}-${form.key}-${f.name}`
          const err = errors[f.name]
          const describedBy = err ? `${id}-error` : undefined
          const common = {
            id,
            name: f.name,
            value: values[f.name] || '',
            required: Boolean(f.required),
            placeholder: f.placeholder || undefined,
            'aria-invalid': Boolean(err) || undefined,
            'aria-describedby': describedBy,
            'data-field': f.name,
            className: cn(styles.input, f.type === 'textarea' && styles.textarea),
            onChange: (
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
            ) => {
              const v = e.target.value
              setValues((s) => ({ ...s, [f.name]: v }))
              if (err) setErrors((s) => ({ ...s, [f.name]: '' }))
            },
          }
          const autoComplete =
            f.type === 'email'
              ? 'email'
              : f.type === 'tel'
                ? 'tel'
                : f.name === 'name'
                  ? 'name'
                  : f.name === 'organisation'
                    ? 'organization'
                    : undefined
          return (
            <div
              key={f.id || f.name}
              className={cn(styles.field, f.width === 'half' ? tabStyles.half : tabStyles.full)}
            >
              <label htmlFor={id} className={styles.label}>
                {f.label}
                {f.required ? (
                  <span className={styles.req} aria-hidden="true">
                    {' '}
                    *
                  </span>
                ) : (
                  <span className={styles.optional}> ({messages.optionalLabel || 'Optional'})</span>
                )}
              </label>
              {f.type === 'textarea' ? (
                <textarea {...common} rows={4} maxLength={4000} />
              ) : f.type === 'select' ? (
                <select {...common}>
                  <option value="">{messages.selectPlaceholder || 'Select an option'}</option>
                  {(f.options || []).map((o) => (
                    <option key={o.id || o.value} value={o.value}>
                      {o.value}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...common}
                  type={f.type || 'text'}
                  autoComplete={autoComplete}
                  maxLength={300}
                />
              )}
              {err && (
                <p className={styles.error} id={`${id}-error`}>
                  {err}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {form.consentLabel && (
        <div className={styles.field}>
          <label className={styles.consent}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked)
                if (errors.consent) setErrors((s) => ({ ...s, consent: '' }))
              }}
              className={styles.checkbox}
              data-field="consent"
              aria-invalid={Boolean(errors.consent) || undefined}
              aria-describedby={errors.consent ? `${uid}-${form.key}-consent-error` : undefined}
              required
            />
            <span className={styles.checkboxBox} aria-hidden="true">
              <CheckIcon />
            </span>
            <span>{form.consentLabel}</span>
          </label>
          {errors.consent && (
            <p className={styles.error} id={`${uid}-${form.key}-consent-error`}>
              {errors.consent}
            </p>
          )}
        </div>
      )}

      <div className={styles.hp} aria-hidden="true">
        <label>
          Fax
          <input type="text" name="company_fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <p className={styles.formError} role="alert">
          {messages.errorGeneric}
        </p>
      )}

      <div>
        <Button
          type="submit"
          label={
            status === 'sending' ? messages.sendingLabel || 'Sending…' : form.submitLabel || 'Send'
          }
          size="lg"
          disabled={status === 'sending'}
        />
      </div>
    </form>
  )
}

/** ARIA tabs (arrow-key navigation) switching between the CMS-defined enquiry forms. */
export function EnquiryForms({ config }: { config: EnquiryForm }) {
  const uid = useId().replace(/:/g, '')
  const forms = useMemo(() => config.forms || [], [config.forms])
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  // Deep links such as #enquiry-media open the matching tab.
  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#enquiry-([a-z0-9-]+)/)
      if (!m) return
      const i = forms.findIndex((f) => f.key === m[1])
      if (i >= 0) {
        setActive(i)
        window.setTimeout(() => tabRefs.current[i]?.focus({ preventScroll: true }), 1500)
      }
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [forms])

  if (!forms.length) return null

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i
    if (e.key === 'ArrowRight') next = (i + 1) % forms.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + forms.length) % forms.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = forms.length - 1
    else return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className={tabStyles.wrap}>
      {forms.map((f) => (
        <span
          key={`anchor-${f.key}`}
          id={`enquiry-${f.key}`}
          className={tabStyles.anchor}
          aria-hidden="true"
          data-no-focus=""
        />
      ))}
      <div role="tablist" aria-label={config.tabsLabel || undefined} className={tabStyles.tablist}>
        {forms.map((f, i) => (
          <button
            key={f.id || f.key}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            role="tab"
            type="button"
            id={`${uid}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${uid}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            className={cn(tabStyles.tab, active === i && tabStyles.tabOn)}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {f.tabLabel}
          </button>
        ))}
      </div>
      {forms.map((f, i) => (
        <div
          key={f.id || f.key}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className={tabStyles.panel}
        >
          <SingleForm form={f} messages={config} uid={uid} />
        </div>
      ))}
    </div>
  )
}
