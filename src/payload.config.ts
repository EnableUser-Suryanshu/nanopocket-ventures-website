import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Enquiries } from './collections/Enquiries'
import { Insights } from './collections/Insights'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { PitchDecks } from './collections/PitchDecks'
import { PitchSubmissions } from './collections/PitchSubmissions'
import { PortfolioCompanies } from './collections/PortfolioCompanies'
import { Press } from './collections/Press'
import { TeamMembers } from './collections/TeamMembers'
import { Users } from './collections/Users'
import { EnquiryForms } from './globals/EnquiryForms'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { PitchForm } from './globals/PitchForm'
import { SiteSettings } from './globals/SiteSettings'
import { serverURL } from './lib/server-url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseURL = process.env.DATABASE_URL || 'file:./data/nanopocket.db'
const usePostgres = /^postgres(ql)?:\/\//.test(databaseURL)

const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'no-reply@nanopocketventures.com',
      defaultFromName: 'NanoPocket Ventures Website',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      },
    })
  : undefined

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · NanoPocket CMS',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/brand/logomark.svg' }],
    },
    components: {
      graphics: {
        Logo: '@/components/admin/AdminLogo#AdminLogo',
        Icon: '@/components/admin/AdminIcon#AdminIcon',
      },
      beforeDashboard: ['@/components/admin/Welcome#Welcome'],
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1112 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    Pages,
    TeamMembers,
    Insights,
    Press,
    PortfolioCompanies,
    Media,
    PitchSubmissions,
    Enquiries,
    PitchDecks,
    Users,
  ],
  globals: [SiteSettings, Header, Footer, PitchForm, EnquiryForms],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // SQLite for local/VPS hosting; Postgres (with migrations, see /src/migrations) for managed hosting like Vercel
  db: usePostgres
    ? postgresAdapter({
        pool: { connectionString: databaseURL },
        migrationDir: path.resolve(dirname, 'migrations'),
      })
    : sqliteAdapter({
        client: { url: databaseURL },
        // dev uses schema push; keep SQLite away from the Postgres migrations
        migrationDir: path.resolve(dirname, 'migrations-sqlite'),
      }),
  email,
  sharp,
  upload: {
    limits: {
      fileSize: 26_214_400, // 25 MB
    },
  },
  plugins: [
    // Uploads go to Vercel Blob when a token is present (Vercel's file system is not persistent); otherwise to
    // local folders. alwaysInsertFields keeps the database schema identical in both setups.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
      alwaysInsertFields: true,
      collections: {
        media: { prefix: 'media' },
        // Pitch decks are still only served through Payload's signed-in route (never the raw blob URL)
        'pitch-decks': { prefix: 'pitch-decks' },
      },
    }),
    seoPlugin({
      collections: ['pages', 'insights'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) =>
        doc?.title ? `${doc.title} · NanoPocket Ventures` : 'NanoPocket Ventures',
      generateDescription: ({ doc }) => doc?.excerpt || '',
    }),
  ],
})
