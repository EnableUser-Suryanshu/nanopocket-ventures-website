/**
 * Shared rules for the “Pitch To Us” application — used by the browser (step-by-step)
 * and re-run on the server before anything is stored.
 */
import type { PitchForm } from '@/payload-types'

export type Choice = '' | 'yes' | 'no'
export type DpiitChoice = '' | 'yes' | 'no' | 'applied' | 'planned'

export type PitchValues = {
  isFounder: Choice
  readThesis: Choice
  dpiit: DpiitChoice
  startupName: string
  website: string
  founderNames: string
  email: string
  phone: string
  sector: string
  stage: string
  vision: string
  superiority: string
  traction: string
  willingnessToPay: string
  market: string
  defensibility: string
  buildPlan: string
  consent: boolean
}

export type FileInfo = { name: string; size: number; type: string } | null

export const emptyPitch: PitchValues = {
  isFounder: '',
  readThesis: '',
  dpiit: '',
  startupName: '',
  website: '',
  founderNames: '',
  email: '',
  phone: '',
  sector: '',
  stage: '',
  vision: '',
  superiority: '',
  traction: '',
  willingnessToPay: '',
  market: '',
  defensibility: '',
  buildPlan: '',
  consent: false,
}

export type StepKey =
  | 'founder'
  | 'thesis'
  | 'dpiit'
  | 'startup'
  | 'focus'
  | 'story'
  | 'proof'
  | 'market'
  | 'plan'
  | 'deck'

export const TEXT_QUESTIONS = {
  startup: ['startupName', 'website', 'founderNames', 'email', 'phone'],
  story: ['vision', 'superiority'],
  proof: ['traction', 'willingnessToPay'],
  market: ['market', 'defensibility'],
  plan: ['buildPlan'],
} as const

export const LONG_ANSWERS = new Set([
  'vision',
  'superiority',
  'traction',
  'willingnessToPay',
  'market',
  'defensibility',
  'buildPlan',
])

export const MAX_SHORT = 300
export const MAX_LONG = 4000

export const DECK_EXTENSIONS = ['pdf', 'ppt', 'pptx', 'key']

export function getSteps(cfg: PitchForm): StepKey[] {
  const steps: StepKey[] = []
  if (cfg.founder?.enabled !== false) steps.push('founder')
  if (cfg.thesis?.enabled !== false) steps.push('thesis')
  steps.push('dpiit', 'startup', 'focus', 'story', 'proof', 'market', 'plan', 'deck')
  return steps
}

type QuestionCfg = {
  label: string
  placeholder?: string | null
  required?: boolean | null
  help?: string | null
}

export function questionConfig(cfg: PitchForm, key: string): QuestionCfg | undefined {
  for (const group of ['startup', 'story', 'proof', 'market', 'plan'] as const) {
    const g = cfg[group] as unknown as Record<string, QuestionCfg> | undefined
    if (g && key in g) return g[key]
  }
  return undefined
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const URL_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i
const PHONE = /^[+\d][\d\s\-().]{6,20}$/

/** True when an eligibility answer means the application cannot continue. */
export function isBlocked(step: StepKey, v: PitchValues) {
  if (step === 'founder') return v.isFounder === 'no'
  if (step === 'thesis') return v.readThesis === 'no'
  if (step === 'dpiit') return v.dpiit === 'no'
  return false
}

export function validateStep(
  step: StepKey,
  v: PitchValues,
  cfg: PitchForm,
  file: FileInfo,
): Record<string, string> {
  const e: Record<string, string> = {}
  const msg = {
    required: cfg.errorRequired || 'Please answer this question.',
    choice: cfg.errorChoice || 'Please choose an option.',
    email: cfg.errorEmail || 'Please enter a valid e-mail address.',
    url: cfg.errorUrl || 'Please enter a valid web address.',
    fileMissing: cfg.errorFileMissing || 'Please attach your pitch deck.',
    fileSize: cfg.errorFileSize || 'This file is larger than the allowed size.',
    fileType: cfg.errorFileType || 'Please upload a PDF, PPT, PPTX or Keynote file.',
    consent: cfg.errorConsent || 'Please give your consent to submit.',
  }

  switch (step) {
    case 'founder':
      if (!v.isFounder) e.isFounder = msg.choice
      break
    case 'thesis':
      if (!v.readThesis) e.readThesis = msg.choice
      break
    case 'dpiit':
      if (!v.dpiit) e.dpiit = msg.choice
      break
    case 'focus': {
      const sectors = (cfg.focus?.sector?.options || []).map((o) => o.value)
      const stages = (cfg.focus?.stage?.options || []).map((o) => o.value)
      if (cfg.focus?.sector?.required !== false && !v.sector) e.sector = msg.choice
      else if (v.sector && sectors.length && !sectors.includes(v.sector)) e.sector = msg.choice
      if (cfg.focus?.stage?.required !== false && !v.stage) e.stage = msg.choice
      else if (v.stage && stages.length && !stages.includes(v.stage)) e.stage = msg.choice
      break
    }
    case 'deck': {
      const maxMB = Math.min(cfg.deck?.maxSizeMB || 25, 25)
      if (!file) {
        if (cfg.deck?.required !== false) e.deck = msg.fileMissing
      } else {
        const ext = file.name.split('.').pop()?.toLowerCase() || ''
        if (!DECK_EXTENSIONS.includes(ext)) e.deck = msg.fileType
        else if (file.size > maxMB * 1024 * 1024) e.deck = msg.fileSize
        else if (file.size === 0) e.deck = msg.fileMissing
      }
      if (!v.consent) e.consent = msg.consent
      break
    }
    default: {
      const keys = TEXT_QUESTIONS[step as keyof typeof TEXT_QUESTIONS] || []
      for (const key of keys) {
        const q = questionConfig(cfg, key)
        const value = (v[key as keyof PitchValues] as string).trim()
        const max = LONG_ANSWERS.has(key) ? MAX_LONG : MAX_SHORT
        if (q?.required && !value) e[key] = msg.required
        else if (value.length > max) e[key] = msg.required
        else if (value && key === 'email' && !EMAIL.test(value)) e[key] = msg.email
        else if (value && key === 'website' && !URL_RE.test(value)) e[key] = msg.url
        else if (value && key === 'phone' && !PHONE.test(value)) e[key] = msg.required
      }
    }
  }
  return e
}

export function validateAll(v: PitchValues, cfg: PitchForm, file: FileInfo) {
  const errors: Record<string, string> = {}
  for (const step of getSteps(cfg)) {
    if (isBlocked(step, v)) errors[step] = 'blocked'
    Object.assign(errors, validateStep(step, v, cfg, file))
  }
  return errors
}

export const dpiitLabel = (cfg: PitchForm, value: DpiitChoice) =>
  ({
    yes: cfg.dpiit?.yes,
    no: cfg.dpiit?.no,
    applied: cfg.dpiit?.applied,
    planned: cfg.dpiit?.planned,
    '': '',
  })[value] || value
