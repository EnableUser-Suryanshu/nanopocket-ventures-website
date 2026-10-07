import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

import { MARK_FIELD, MARK_SEED } from '@/components/brand/logo-paths'

export const alt = 'NanoPocket Ventures — Where Small Bets Discover India’s Big Tech'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Generated social card in the brand’s “banner” treatment. */
export default async function OpenGraphImage() {
  const fontDir = path.join(process.cwd(), 'src/assets/fonts')
  const [regular, semibold] = await Promise.all([
    readFile(path.join(fontDir, 'poppins-latin-400-normal.woff')),
    readFile(path.join(fontDir, 'poppins-latin-600-normal.woff')),
  ])
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#ffffff',
        padding: '72px 80px',
        fontFamily: 'Poppins',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <svg width="86" height="102" viewBox="0 0 671.32 800">
          <path d={MARK_FIELD} fill="#e50914" />
          <path d={MARK_SEED} fill="#d99a00" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 48, fontWeight: 400, color: '#050505', letterSpacing: -1.5 }}>
            Where Small Bets
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 600,
              color: '#a87400',
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            Discover
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 600,
              color: '#050505',
              letterSpacing: -4,
              lineHeight: 1.05,
            }}
          >
            India’s Big Tech.
          </div>
          <div
            style={{ width: 640, height: 6, background: '#e50914', borderRadius: 6, marginTop: 14 }}
          />
        </div>
        <div style={{ fontSize: 22, color: '#5d5d5d', letterSpacing: 0.5 }}>
          NanoPocket Ventures · SEBI Registered Cat-I AIF (Angel Fund)
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Poppins', data: regular, weight: 400, style: 'normal' },
        { name: 'Poppins', data: semibold, weight: 600, style: 'normal' },
      ],
    },
  )
}
