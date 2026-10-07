import type { Metadata, Viewport } from 'next'
import { Montserrat, Poppins } from 'next/font/google'

import { Cursor } from '@/components/layout/Cursor'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Magnetic } from '@/components/layout/Magnetic'
import { Preloader } from '@/components/layout/Preloader'
import { ScrollRail } from '@/components/layout/ScrollRail'
import { SkipLink } from '@/components/layout/SkipLink'
import { BootScripts } from '@/components/providers/BootScripts'
import { LivePreviewListener } from '@/components/providers/LivePreviewListener'
import { motionBootScript, MotionProvider } from '@/components/providers/MotionProvider'
import { SiteLabelsProvider } from '@/components/providers/SiteLabels'
import { getGlobals, isDraft } from '@/lib/queries'
import { serverURL } from '@/lib/server-url'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getGlobals()
  const og = site.ogImage && typeof site.ogImage === 'object' ? site.ogImage.url : undefined
  return {
    metadataBase: new URL(serverURL),
    title: { default: site.metaTitle, template: `%s · ${site.siteName}` },
    description: site.metaDescription,
    applicationName: site.siteName,
    openGraph: {
      type: 'website',
      siteName: site.siteName,
      title: site.metaTitle,
      description: site.metaDescription,
      locale: 'en_IN',
      ...(og ? { images: [{ url: og }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: site.metaTitle,
      description: site.metaDescription,
    },
    alternates: { canonical: '/' },
  }
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [{ site, header, footer }, draft] = await Promise.all([getGlobals(), isDraft()])

  const labels = {
    skipToContent: site.skipToContent || undefined,
    menuLabel: site.menuLabel || undefined,
    closeLabel: site.closeLabel || undefined,
    motionOnLabel: site.motionOnLabel || undefined,
    motionOffLabel: site.motionOffLabel || undefined,
    backToTop: site.backToTop || undefined,
    opensNewTab: site.opensNewTab || undefined,
    viewLabel: site.viewLabel || undefined,
    homeLabel: site.homeLabel || undefined,
  }

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.siteName,
    url: serverURL,
    logo: `${serverURL}/brand/logomark.svg`,
    sameAs: site.linkedinUrl ? [site.linkedinUrl] : [],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Thane',
      addressRegion: 'Maharashtra',
      postalCode: '400607',
      addressCountry: 'IN',
    },
  }

  return (
    <html
      lang="en-IN"
      className={`no-js ${poppins.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body>
        <BootScripts motion={motionBootScript} jsonLd={JSON.stringify(orgJsonLd)} />
        <SiteLabelsProvider labels={labels}>
          <MotionProvider>
            <SkipLink label={labels.skipToContent || 'Skip to content'} />
            <Preloader />
            <Header header={header} site={site} />
            <div className="page-shell">
              <main id="main-content">{children}</main>
              <Footer footer={footer} header={header} site={site} />
            </div>
            <Cursor />
            <Magnetic />
            <ScrollRail items={header.navItems} />
            {draft && <LivePreviewListener />}
          </MotionProvider>
        </SiteLabelsProvider>
      </body>
    </html>
  )
}
