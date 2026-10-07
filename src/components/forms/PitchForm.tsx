'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'

import { useMotion } from '@/components/providers/MotionProvider'
import { Button } from '@/components/ui/Button'
import { CheckIcon, UploadIcon } from '@/components/ui/Icons'
import { SmartLink } from '@/components/ui/SmartLink'
import { cn } from '@/lib/cn'
import { deckUploadPath } from '@/lib/forms/deck-upload'
import {
  type DpiitChoice,
  emptyPitch,
  getSteps,
  isBlocked,
  LONG_ANSWERS,
  MAX_LONG,
  MAX_SHORT,
  type PitchValues,
  questionConfig,
  type StepKey,
  TEXT_QUESTIONS,
  validateStep,
} from '@/lib/forms/pitch'
import { gsap } from '@/lib/gsap'
import type { PitchForm as PitchFormConfig } from '@/payload-types'

import styles from './Form.module.css'

const DRAFT_KEY = 'np-pitch-draft'

type Status = 'idle' | 'sending' | 'success' | 'error'

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`

/**
 * `directUpload` (set when Blob storage is configured, i.e. on Vercel): the deck goes from the browser
 * straight to storage first, because serverless functions there only accept 4.5 MB request bodies.
 */
export function PitchForm({
  config,
  directUpload = false,
}: {
  config: PitchFormConfig
  directUpload?: boolean
}) {
  const uid = useId().replace(/:/g, '')
  const { reduced } = useMotion()
  const steps = useMemo(() => getSteps(config), [config])
  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState<PitchValues>(emptyPitch)
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const startedAt = useRef(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const lastStep = useRef(0)
  const lastStatus = useRef<Status>('idle')

  const step = steps[stepIndex]
  const total = steps.length
  const blocked = isBlocked(step, values)

  // Restore an unfinished application (text answers only — never the file). sessionStorage is
  // browser-only, so this must run after hydration.
  useEffect(() => {
    startedAt.current = Date.now()
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setValues({ ...emptyPitch, ...JSON.parse(raw) })
    } catch {
      /* ignore */
    }
  }, [])
  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(values))
    } catch {
      /* ignore */
    }
  }, [values])

  // Move focus to the new step’s heading and animate it in.
  useEffect(() => {
    const stepChanged = lastStep.current !== stepIndex
    const becameSuccess = status === 'success' && lastStatus.current !== 'success'
    lastStep.current = stepIndex
    lastStatus.current = status
    if (!stepChanged && !becameSuccess) return
    headingRef.current?.focus({ preventScroll: true })
    if (!reduced && bodyRef.current) {
      gsap.fromTo(
        bodyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, status === 'success'])

  const set = useCallback(<K extends keyof PitchValues>(key: K, value: PitchValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => {
      if (!e[key as string]) return e
      const next = { ...e }
      delete next[key as string]
      return next
    })
  }, [])

  const focusFirstError = (errs: Record<string, string>) => {
    const first = Object.keys(errs)[0]
    if (!first) return
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)
      el?.focus()
    })
  }

  const fileInfo = file ? { name: file.name, size: file.size, type: file.type } : null

  const next = () => {
    const errs = validateStep(step, values, config, fileInfo)
    setErrors(errs)
    if (Object.keys(errs).length) return focusFirstError(errs)
    if (blocked) return
    setStepIndex((i) => Math.min(i + 1, total - 1))
  }

  const back = () => {
    setErrors({})
    setStepIndex((i) => Math.max(0, i - 1))
  }

  const submit = async () => {
    const errs = validateStep('deck', values, config, fileInfo)
    setErrors(errs)
    if (Object.keys(errs).length) return focusFirstError(errs)

    const data = new FormData()
    Object.entries(values).forEach(([k, v]) => data.append(k, String(v)))
    data.append('startedAt', String(startedAt.current))
    data.append(
      'company_fax',
      (formRef.current?.elements.namedItem('company_fax') as HTMLInputElement | null)?.value || '',
    )

    setStatus('sending')
    setProgress(0)
    // Share of the progress bar taken by the direct deck upload (the form post itself is then tiny)
    const uploadShare = file && directUpload ? 90 : 0
    if (file && directUpload) {
      try {
        const { upload } = await import('@vercel/blob/client')
        const blob = await upload(deckUploadPath(file.name), file, {
          access: 'public',
          handleUploadUrl: '/forms/pitch/upload',
          multipart: file.size > 8 * 1024 * 1024,
          onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage * 0.9)),
        })
        data.append('deckUrl', blob.url)
        data.append('deckName', file.name)
      } catch {
        setStatus('error')
        return
      }
    } else if (file) {
      data.append('deck', file)
    }

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/forms/pitch')
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress(uploadShare + Math.round((e.loaded / e.total) * (100 - uploadShare)))
      }
    }
    xhr.onload = () => {
      let body: { ok?: boolean; errors?: Record<string, string> } = {}
      try {
        body = JSON.parse(xhr.responseText)
      } catch {
        /* ignore */
      }
      if (xhr.status >= 200 && xhr.status < 300 && body.ok) {
        setStatus('success')
        try {
          sessionStorage.removeItem(DRAFT_KEY)
        } catch {
          /* ignore */
        }
        return
      }
      if (body.errors && Object.keys(body.errors).length) {
        setErrors(body.errors)
        const firstKey = Object.keys(body.errors)[0]
        const target = steps.findIndex((s) =>
          s === 'deck'
            ? ['deck', 'consent'].includes(firstKey)
            : (
                TEXT_QUESTIONS[s as keyof typeof TEXT_QUESTIONS] as readonly string[] | undefined
              )?.includes(firstKey) ||
              (s === 'focus' && ['sector', 'stage'].includes(firstKey)),
        )
        if (target >= 0) setStepIndex(target)
      }
      setStatus('error')
    }
    xhr.onerror = () => setStatus('error')
    xhr.send(data)
  }

  const restart = () => {
    setValues(emptyPitch)
    setFile(null)
    setErrors({})
    setStatus('idle')
    setStepIndex(0)
    startedAt.current = Date.now()
  }

  /* ------------------------------------------------------------------ */
  /* Field renderers                                                     */
  /* ------------------------------------------------------------------ */

  const fieldError = (key: string) =>
    errors[key] ? (
      <p className={styles.error} id={`${uid}-${key}-error`}>
        {errors[key]}
      </p>
    ) : null

  const choice = (
    key: 'isFounder' | 'readThesis' | 'dpiit',
    legend: string | null | undefined,
    options: Array<{ value: string; label?: string | null }>,
  ) => (
    <fieldset
      className={styles.fieldset}
      role="radiogroup"
      aria-required="true"
      aria-invalid={Boolean(errors[key]) || undefined}
      aria-describedby={errors[key] ? `${uid}-${key}-error` : undefined}
    >
      <legend className={styles.question}>
        {legend}
        <span className={styles.req} aria-hidden="true">
          {' '}
          *
        </span>
      </legend>
      <div className={styles.options}>
        {options
          .filter((o) => o.label)
          .map((o, i) => (
            <label
              key={o.value}
              className={cn(styles.option, values[key] === o.value && styles.optionOn)}
            >
              <input
                type="radio"
                name={key}
                value={o.value}
                checked={values[key] === o.value}
                onChange={() => set(key, o.value as never)}
                className={styles.radio}
                data-field={i === 0 ? key : undefined}
                required
              />
              <span className={styles.optionIndex} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.optionLabel}>{o.label}</span>
              <span className={styles.optionCheck} aria-hidden="true">
                <CheckIcon />
              </span>
            </label>
          ))}
      </div>
      {fieldError(key)}
    </fieldset>
  )

  const textField = (key: keyof PitchValues) => {
    const q = questionConfig(config, key as string)
    if (!q) return null
    const id = `${uid}-${key}`
    const long = LONG_ANSWERS.has(key as string)
    const describedBy =
      [q.help ? `${id}-help` : '', errors[key] ? `${id}-error` : ''].filter(Boolean).join(' ') ||
      undefined
    const common = {
      id,
      name: key,
      value: values[key] as string,
      placeholder: q.placeholder || undefined,
      required: Boolean(q.required),
      'aria-invalid': Boolean(errors[key]) || undefined,
      'aria-describedby': describedBy,
      'data-field': key,
      className: cn(styles.input, long && styles.textarea),
      maxLength: long ? MAX_LONG : MAX_SHORT,
    }
    const type =
      key === 'email' ? 'email' : key === 'website' ? 'url' : key === 'phone' ? 'tel' : 'text'
    const autoComplete =
      key === 'email'
        ? 'email'
        : key === 'phone'
          ? 'tel'
          : key === 'founderNames'
            ? 'name'
            : key === 'website'
              ? 'url'
              : key === 'startupName'
                ? 'organization'
                : 'off'
    return (
      <div key={key} className={styles.field}>
        <label htmlFor={id} className={styles.label}>
          {q.label}
          {q.required ? (
            <span className={styles.req} aria-hidden="true">
              {' '}
              *
            </span>
          ) : (
            <span className={styles.optional}> ({config.optionalLabel || 'Optional'})</span>
          )}
        </label>
        {q.help && (
          <p className={styles.help} id={`${id}-help`}>
            {q.help}
          </p>
        )}
        {long ? (
          <textarea
            {...common}
            rows={4}
            onChange={(e) => {
              set(key, e.target.value as never)
              e.target.style.height = 'auto'
              e.target.style.height = `${Math.min(e.target.scrollHeight, 420)}px`
            }}
          />
        ) : (
          <input
            {...common}
            type={type}
            autoComplete={autoComplete}
            onChange={(e) => set(key, e.target.value as never)}
          />
        )}
        {fieldError(key as string)}
      </div>
    )
  }

  const selectGroup = (key: 'sector' | 'stage') => {
    const cfg = config.focus?.[key]
    if (!cfg) return null
    return (
      <fieldset
        className={styles.fieldset}
        role="radiogroup"
        aria-required={cfg.required !== false || undefined}
        aria-invalid={Boolean(errors[key]) || undefined}
        aria-describedby={errors[key] ? `${uid}-${key}-error` : undefined}
      >
        <legend className={styles.question}>
          {cfg.label}
          {cfg.required !== false && (
            <span className={styles.req} aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </legend>
        <div className={styles.chips}>
          {(cfg.options || []).map((o, i) => (
            <label
              key={o.id || o.value}
              className={cn(styles.chip, values[key] === o.value && styles.chipOn)}
            >
              <input
                type="radio"
                name={key}
                value={o.value}
                checked={values[key] === o.value}
                onChange={() => set(key, o.value)}
                className={styles.radio}
                data-field={i === 0 ? key : undefined}
                required={cfg.required !== false}
              />
              <span>{o.value}</span>
            </label>
          ))}
        </div>
        {fieldError(key)}
      </fieldset>
    )
  }

  const blockedMessage = (
    message?: string | null,
    links?: Array<{ label?: string | null; href?: string | null; newTab?: boolean | null }>,
  ) =>
    blocked && message ? (
      <div className={styles.notice} role="status">
        <p>{message}</p>
        {links?.filter((l) => l.label && l.href).length ? (
          <div className={styles.noticeLinks}>
            {links
              .filter((l) => l.label && l.href)
              .map((l) => (
                <SmartLink
                  key={l.href}
                  href={l.href as string}
                  newTab={l.newTab}
                  className="line-link"
                >
                  {l.label}
                </SmartLink>
              ))}
          </div>
        ) : null}
      </div>
    ) : null

  const titles: Record<StepKey, string | null | undefined> = {
    founder: config.founder?.title,
    thesis: config.thesis?.title,
    dpiit: config.dpiit?.title,
    startup: config.startup?.title,
    focus: config.focus?.title,
    story: config.story?.title,
    proof: config.proof?.title,
    market: config.market?.title,
    plan: config.plan?.title,
    deck: config.deck?.title,
  }

  const renderStep = () => {
    switch (step) {
      case 'founder':
        return (
          <>
            {choice('isFounder', config.founder?.question, [
              { value: 'yes', label: config.founder?.yes },
              { value: 'no', label: config.founder?.no },
            ])}
            {blockedMessage(
              config.founder?.noMessage,
              config.founder?.noLink ? [config.founder.noLink] : [],
            )}
          </>
        )
      case 'thesis':
        return (
          <>
            {choice('readThesis', config.thesis?.question, [
              { value: 'yes', label: config.thesis?.yes },
              { value: 'no', label: config.thesis?.no },
            ])}
            {blockedMessage(config.thesis?.noMessage, config.thesis?.links || [])}
          </>
        )
      case 'dpiit':
        return (
          <>
            {choice(
              'dpiit',
              config.dpiit?.question,
              (['yes', 'no', 'applied', 'planned'] as DpiitChoice[]).map((value) => ({
                value,
                label: config.dpiit?.[value as 'yes' | 'no' | 'applied' | 'planned'],
              })),
            )}
            {blockedMessage(config.dpiit?.noMessage)}
          </>
        )
      case 'focus':
        return (
          <>
            {selectGroup('sector')}
            {selectGroup('stage')}
          </>
        )
      case 'deck': {
        const deck = config.deck
        const fileId = `${uid}-deck`
        return (
          <>
            <div className={styles.field}>
              <span className={styles.label} id={`${fileId}-label`}>
                {deck?.label}
                {deck?.required !== false && (
                  <span className={styles.req} aria-hidden="true">
                    {' '}
                    *
                  </span>
                )}
              </span>
              {deck?.help && (
                <p className={styles.help} id={`${fileId}-help`}>
                  {deck.help}
                </p>
              )}
              <div
                className={cn(
                  styles.drop,
                  dragOver && styles.dropOver,
                  file && styles.dropFilled,
                  errors.deck && styles.dropError,
                )}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragOver(false)
                  const f = e.dataTransfer.files?.[0]
                  if (f) {
                    setFile(f)
                    setErrors((er) => ({ ...er, deck: '' }))
                  }
                }}
              >
                <span className={styles.dropIcon} aria-hidden="true">
                  {file ? <CheckIcon /> : <UploadIcon />}
                </span>
                <div className={styles.dropText}>
                  {file ? (
                    <>
                      <strong>{file.name}</strong>
                      <span>{formatSize(file.size)}</span>
                    </>
                  ) : (
                    <>
                      <strong>{deck?.dropLabel}</strong>
                      <span>{deck?.formatsNote}</span>
                    </>
                  )}
                </div>
                <label htmlFor={fileId} className={cn('btn btn--outline btn--sm', styles.browse)}>
                  {file ? deck?.replaceLabel : deck?.browseLabel}
                </label>
                <input
                  id={fileId}
                  type="file"
                  name="deck"
                  accept=".pdf,.ppt,.pptx,.key,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  className={styles.fileInput}
                  aria-labelledby={`${fileId}-label`}
                  aria-describedby={
                    [deck?.help ? `${fileId}-help` : '', errors.deck ? `${uid}-deck-error` : '']
                      .filter(Boolean)
                      .join(' ') || undefined
                  }
                  aria-invalid={Boolean(errors.deck) || undefined}
                  data-field="deck"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null
                    setFile(f)
                    setErrors((er) => {
                      const n = { ...er }
                      delete n.deck
                      return n
                    })
                  }}
                />
              </div>
              {fieldError('deck')}
            </div>

            <fieldset className={styles.fieldset}>
              <legend className={styles.label}>{deck?.consentHeading}</legend>
              <label className={styles.consent}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={values.consent}
                  onChange={(e) => set('consent', e.target.checked)}
                  className={styles.checkbox}
                  data-field="consent"
                  aria-invalid={Boolean(errors.consent) || undefined}
                  aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
                  required
                />
                <span className={styles.checkboxBox} aria-hidden="true">
                  <CheckIcon />
                </span>
                <span>{deck?.consentLabel}</span>
              </label>
              {fieldError('consent')}
            </fieldset>
          </>
        )
      }
      default: {
        const keys = TEXT_QUESTIONS[step as keyof typeof TEXT_QUESTIONS] || []
        return (
          <div className={step === 'startup' ? styles.grid2 : undefined}>
            {keys.map((k) => textField(k as keyof PitchValues))}
          </div>
        )
      }
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon} aria-hidden="true">
          <CheckIcon />
        </span>
        <h3 className={styles.successTitle} ref={headingRef} tabIndex={-1}>
          {config.successTitle}
        </h3>
        {config.successBody && <p className={styles.successBody}>{config.successBody}</p>}
        <Button
          label={config.restartLabel || 'Submit another application'}
          variant="outline"
          onClick={restart}
        />
      </div>
    )
  }

  const isLast = stepIndex === total - 1

  return (
    <form
      ref={formRef}
      className={styles.form}
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (isLast) submit()
        else next()
      }}
      aria-labelledby={`${uid}-step-title`}
    >
      <div className={styles.progressHead}>
        <p className={styles.counter}>
          <span className="sr-only">{config.stepLabel} </span>
          <span aria-hidden="true">{config.stepLabel} </span>
          {String(stepIndex + 1).padStart(2, '0')}
          <span className={styles.counterTotal}> / {String(total).padStart(2, '0')}</span>
        </p>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${(stepIndex + 1) / total})` }} />
        </div>
      </div>

      <h3 id={`${uid}-step-title`} ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
        {titles[step]}
      </h3>

      <div ref={bodyRef} className={styles.stepBody}>
        {renderStep()}
      </div>

      {/* Honeypot — invisible to people, tempting to bots */}
      <div className={styles.hp} aria-hidden="true">
        <label>
          Fax
          <input type="text" name="company_fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {config.requiredNote && <p className={styles.requiredNote}>{config.requiredNote}</p>}

      {status === 'error' && (
        <p className={styles.formError} role="alert">
          {config.errorGeneric}
        </p>
      )}

      <div className={styles.nav}>
        {stepIndex > 0 ? (
          <Button
            label={config.backLabel || 'Back'}
            variant="outline"
            onClick={back}
            disabled={status === 'sending'}
          />
        ) : (
          <span />
        )}
        <Button
          type="submit"
          label={
            status === 'sending'
              ? `${config.submittingLabel || 'Submitting…'} ${progress ? `${progress}%` : ''}`
              : isLast
                ? config.submitLabel || 'Submit'
                : config.continueLabel || 'Continue'
          }
          disabled={blocked || status === 'sending'}
          aria-disabled={blocked || status === 'sending'}
        />
      </div>
      {status === 'sending' && (
        <div className={styles.upload} aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {status === 'sending' ? `${config.submittingLabel} ${progress}%` : ''}
      </p>
    </form>
  )
}
