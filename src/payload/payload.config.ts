import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { CaseStudies } from './collections/CaseStudies'
import { LandingPages } from './collections/LandingPages'
import { Team } from './collections/Team'
import { Testimonials } from './collections/Testimonials'
import { Media } from './collections/Media'

import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-in-production',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' | GoldenWing CMS',
    },
  },
  localization: {
    locales: [
      { label: 'Deutsch', code: 'de' },
      { label: 'English', code: 'en' },
      { label: 'Русский', code: 'ru' },
    ],
    defaultLocale: 'de',
    fallback: true,
  },
  collections: [
    Pages,
    Posts,
    Services,
    CaseStudies,
    LandingPages,
    Team,
    Testimonials,
    Media,
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'select', options: ['admin', 'editor'], defaultValue: 'editor' },
      ],
    },
  ],
  globals: [SiteSettings, Navigation, Footer],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || process.env.DATABASE_URI },
    push: true,
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, '../types/payload-types.ts'),
  },
  plugins: [
    seoPlugin({
      collections: ['pages', 'posts', 'services', 'case-studies', 'landing-pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} | GoldenWing Creative Studios`,
      generateDescription: ({ doc }) => doc.excerpt || '',
      generateURL: ({ doc, collectionSlug }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'
        if (collectionSlug === 'pages') return `${base}/de/${doc.slug}`
        if (collectionSlug === 'posts') return `${base}/de/blog/${doc.slug}`
        if (collectionSlug === 'services') return `${base}/de/services/${doc.slug}`
        if (collectionSlug === 'case-studies') return `${base}/de/referenzen/${doc.slug}`
        if (collectionSlug === 'landing-pages') return `${base}/de/${doc.slug}`
        return `${base}/de/${doc.slug}`
      },
    }),
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: { media: true },
            bucket: process.env.S3_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              region: process.env.S3_REGION || 'auto',
              endpoint: process.env.S3_ENDPOINT,
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
})
