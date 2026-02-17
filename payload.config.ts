import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor, BlocksFeature, FixedToolbarFeature } from '@payloadcms/richtext-lexical'

// Blocks
import { HTMLBlock } from './src/payload/blocks/HTMLBlock'

// Collections
import { Posts } from './src/payload/collections/Posts'
import { Projects } from './src/payload/collections/Projects'
import { Services } from './src/payload/collections/Services'
import { SubServices } from './src/payload/collections/SubServices'
import { Categories } from './src/payload/collections/Categories'
import { TeamMembers } from './src/payload/collections/TeamMembers'
import { Partners } from './src/payload/collections/Partners'
import { Testimonials } from './src/payload/collections/Testimonials'
import { Resources } from './src/payload/collections/Resources'
import { Media } from './src/payload/collections/Media'
import { Users } from './src/payload/collections/Users'
import { Leads } from './src/payload/collections/Leads'
import { ToolAnalyses } from './src/payload/collections/ToolAnalyses'

// Globals - keine verwendet (Seitentexte kommen aus Translations)

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// SICHERHEIT: Stelle sicher, dass serverURL niemals localhost in Production ist
const PRODUCTION_URL = 'https://goldenwing.at'
const getServerURL = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const isProduction = process.env.NODE_ENV === 'production'

  // In Production: NIEMALS localhost verwenden
  if (isProduction) {
    if (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1')) {
      console.warn(
        '⚠️ WARNUNG: NEXT_PUBLIC_SITE_URL ist nicht gesetzt oder enthält localhost in Production!',
        `Verwende stattdessen: ${PRODUCTION_URL}`
      )
      return PRODUCTION_URL
    }
  }

  return envUrl || PRODUCTION_URL
}

export default buildConfig({
  // Server URL - mit Sicherheitsprüfung gegen localhost in Production
  serverURL: getServerURL(),

  // Localization Configuration
  localization: {
    locales: [
      {
        label: 'Deutsch',
        code: 'de',
      },
      {
        label: 'English',
        code: 'en',
      },
    ],
    defaultLocale: 'de',
    fallback: true, // Fallback to defaultLocale if translation missing
  },

  // Global Blocks Registration (required for BlocksFeature in Lexical)
  blocks: [HTMLBlock],

  // Admin Panel Einstellungen
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | GoldenWing Admin',
    },
    suppressHydrationWarning: true,
  },


  // Collections (Inhaltstypen)
  collections: [
    Users,
    Media,
    Posts,
    Projects,
    Services,
    SubServices,
    Categories,
    TeamMembers,
    Partners,
    Testimonials,
    Resources,
    Leads,
    ToolAnalyses,
  ],

  // Globals - nicht verwendet (Seitentexte kommen aus src/messages/*.json)
  globals: [],

  // Rich Text Editor mit HTML Block Feature und fixer Toolbar
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      BlocksFeature({
        blocks: ['htmlBlock'], // Reference by slug from global blocks
      }),
    ],
  }),

  // Geheimschlüssel für Authentifizierung (MUSS in .env gesetzt sein)
  secret: (() => {
    const secret = process.env.PAYLOAD_SECRET
    if (!secret) {
      throw new Error('PAYLOAD_SECRET environment variable is required')
    }
    return secret
  })(),

  // TypeScript Output
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload/payload-types.ts'),
  },

  // SQLite Datenbank
  // Use DATABASE_URL from env, or default to local file
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'goldenwing.db')}`,
    },
    push: false, // Disable automatic schema push prompts - run migrations manually
  }),

  // Plugins
  plugins: [],
})
