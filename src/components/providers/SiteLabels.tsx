'use client'

import { createContext, useContext } from 'react'

export type SiteLabels = {
  skipToContent: string
  menuLabel: string
  closeLabel: string
  motionOnLabel: string
  motionOffLabel: string
  backToTop: string
  opensNewTab: string
  viewLabel: string
  homeLabel: string
}

const defaults: SiteLabels = {
  skipToContent: 'Skip to content',
  menuLabel: 'Menu',
  closeLabel: 'Close',
  motionOnLabel: 'Pause motion',
  motionOffLabel: 'Play motion',
  backToTop: 'Back to top',
  opensNewTab: '(opens in a new tab)',
  viewLabel: 'View',
  homeLabel: 'NanoPocket Ventures — home',
}

const LabelsContext = createContext<SiteLabels>(defaults)

export function SiteLabelsProvider({
  labels,
  children,
}: {
  labels: Partial<SiteLabels>
  children: React.ReactNode
}) {
  const merged = { ...defaults }
  for (const [k, v] of Object.entries(labels)) {
    if (typeof v === 'string' && v.trim()) merged[k as keyof SiteLabels] = v
  }
  return <LabelsContext.Provider value={merged}>{children}</LabelsContext.Provider>
}

export const useSiteLabels = () => useContext(LabelsContext)
