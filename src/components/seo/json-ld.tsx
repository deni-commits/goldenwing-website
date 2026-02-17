// SEO Schema.org JSON-LD Components
// Usage: Import and use these components to add structured data to pages

import { PRODUCTION_URL } from '@/config/site'

// Site URL - Always use production URL for schema markup (search engines crawl live site)
// This ensures consistent URLs in structured data regardless of environment
const SITE_URL = PRODUCTION_URL

// Helper to transform Payload CMS media URLs
// Payload returns /api/media/file/filename which redirects to /media/filename
// We transform to direct URL to avoid 301 redirects in schema markup
function transformMediaUrl(url: string): string {
  return url.replace('/api/media/file/', '/media/')
}

// Generic JSON-LD component for any schema
interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Helper to get site URL
export function getSiteUrl(): string {
  return SITE_URL
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbListProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbListSchema({ items }: BreadcrumbListProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Author details for EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)
interface AuthorDetails {
  name: string
  url?: string
  jobTitle?: string
  description?: string
  sameAs?: string[]
}

interface BlogPostingProps {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  authorName?: string
  authorDetails?: AuthorDetails
  image?: string
  category?: string
}

export function BlogPostingSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  authorName = 'GoldenWing Creative Studios',
  authorDetails,
  image,
  category,
}: BlogPostingProps) {
  // Build enhanced author object for GEO/AEO authority signals
  const authorSchema = authorDetails
    ? {
        '@type': 'Person',
        name: authorDetails.name,
        ...(authorDetails.url && { url: authorDetails.url }),
        ...(authorDetails.jobTitle && { jobTitle: authorDetails.jobTitle }),
        ...(authorDetails.description && { description: authorDetails.description }),
        ...(authorDetails.sameAs && authorDetails.sameAs.length > 0 && { sameAs: authorDetails.sameAs }),
        worksFor: {
          '@type': 'Organization',
          name: 'GoldenWing Creative Studios',
          url: SITE_URL,
        },
      }
    : {
        '@type': 'Person',
        name: authorName,
      }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image || `${SITE_URL}/og-image.jpg`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: authorSchema,
    publisher: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
    ...(category && { articleSection: category }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ServiceSchemaProps {
  name: string
  description: string
  slug: string
  parentService?: {
    name: string
    slug: string
  }
}

// Vienna office provider object for Service schemas
const viennaOfficeProvider = {
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: 'GoldenWing Creative Studios',
  url: SITE_URL,
  telephone: '+43-664-543-96-81',
  email: 'office@goldenwing.at',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Czeikestrasse 4/21',
    addressLocality: 'Wien',
    postalCode: '1100',
    addressRegion: 'Wien',
    addressCountry: 'AT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.1676,
    longitude: 16.3795,
  },
  priceRange: '$$',
}

export function ServiceSchema({ name, description, slug, parentService }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    provider: viennaOfficeProvider,
    areaServed: [
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    url: parentService
      ? `${SITE_URL}/leistungen/${parentService.slug}/${slug}`
      : `${SITE_URL}/leistungen/${slug}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Export the provider for use in other schemas
export { viennaOfficeProvider }

// Credentials/Awards Schema for EEAT and GEO authority signals
interface Credential {
  name: string
  description?: string
  issuer?: string
  dateAwarded?: string
  url?: string
}

interface CredentialsSchemaProps {
  credentials: Credential[]
  organizationName?: string
}

export function CredentialsSchema({
  credentials,
  organizationName = 'GoldenWing Creative Studios'
}: CredentialsSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: organizationName,
    url: SITE_URL,
    hasCredential: credentials.map(cred => ({
      '@type': 'EducationalOccupationalCredential',
      name: cred.name,
      ...(cred.description && { description: cred.description }),
      ...(cred.issuer && {
        recognizedBy: {
          '@type': 'Organization',
          name: cred.issuer,
        },
      }),
      ...(cred.dateAwarded && { dateCreated: cred.dateAwarded }),
      ...(cred.url && { url: cred.url }),
    })),
    memberOf: credentials
      .filter(cred => cred.issuer)
      .map(cred => ({
        '@type': 'ProgramMembership',
        programName: cred.name,
        hostingOrganization: {
          '@type': 'Organization',
          name: cred.issuer,
        },
      })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Awards Schema for recognition and achievements
interface Award {
  name: string
  description?: string
  awardingBody?: string
  date?: string
}

interface AwardsSchemaProps {
  awards: Award[]
}

export function AwardsSchema({ awards }: AwardsSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'GoldenWing Creative Studios',
    url: SITE_URL,
    award: awards.map(a => a.name),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  items: FAQItem[]
}

export function FAQSchema({ items }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface AggregateRatingProps {
  ratingValue: number
  ratingCount: number
  reviewCount?: number
}

export function AggregateRatingSchema({
  ratingValue,
  ratingCount,
  reviewCount
}: AggregateRatingProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GoldenWing Creative Studios',
    url: SITE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toString(),
      bestRating: '5',
      worstRating: '1',
      ratingCount: ratingCount.toString(),
      ...(reviewCount && { reviewCount: reviewCount.toString() }),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Local Business with enhanced data
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'GoldenWing Creative Studios',
    image: `${SITE_URL}/og-image.jpg`,
    description: 'Kreativagentur für Branding, Webdesign und digitales Marketing in Wien.',
    url: SITE_URL,
    telephone: '+43-664-543-96-81',
    email: 'office@goldenwing.at',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Czeikestrasse 4/21',
      addressLocality: 'Wien',
      postalCode: '1100',
      addressCountry: 'AT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.1676,
      longitude: 16.3795,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/goldenwing-creative-studios/',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Kreative Dienstleistungen',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Branding & Corporate Identity',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Webdesign & Entwicklung',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO & Online Marketing',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Software-Entwicklung',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================================
// NEW SERP-FEATURE SCHEMAS
// ============================================================

// SiteNavigationElement Schema - For Google Sitelinks
interface NavigationItem {
  name: string
  url: string
}

interface SiteNavigationSchemaProps {
  items: NavigationItem[]
  locale?: string
}

export function SiteNavigationSchema({ items, locale = 'de' }: SiteNavigationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    '@id': `${SITE_URL}/${locale}/#navigation`,
    name: 'Main Navigation',
    hasPart: items.map((item) => ({
      '@type': 'SiteNavigationElement',
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// WebSite Schema with SearchAction - For Sitelinks Searchbox
interface WebSiteSchemaProps {
  locale?: string
}

export function WebSiteSchema({ locale = 'de' }: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'GoldenWing Creative Studios',
    description: locale === 'de'
      ? 'Kreativagentur für Branding, Webdesign und digitales Marketing'
      : 'Creative agency for branding, web design and digital marketing',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: locale === 'de' ? 'de-AT' : 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// SpeakableSpecification Schema - For AI Overview / Voice Search
interface SpeakableSchemaProps {
  headline: string
  summary: string
  cssSelectors?: string[]
  url: string
  locale?: string
}

export function SpeakableSchema({
  headline,
  summary,
  cssSelectors = ['article h1', 'article p:first-of-type', '.faq-answer'],
  url,
  locale = 'de',
}: SpeakableSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url.startsWith('http') ? url : `${SITE_URL}${url}`,
    name: headline,
    description: summary,
    inLanguage: locale === 'de' ? 'de-AT' : 'en',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// HowTo Schema - For Step-by-Step Process Rich Results
interface HowToStep {
  name: string
  text: string
  image?: string
  url?: string
}

interface HowToSchemaProps {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string // ISO 8601 duration format (e.g., "PT4W" for 4 weeks)
  estimatedCost?: {
    value: string
    currency: string
  }
  image?: string
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
  image,
}: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(image && { image }),
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        value: estimatedCost.value,
        currency: estimatedCost.currency,
      },
    }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// VideoObject Schema - For Video Rich Results
interface VideoSchemaProps {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string // ISO 8601 duration (e.g., "PT5M30S")
  contentUrl?: string
  embedUrl?: string
}

export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
}: VideoSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(duration && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    publisher: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ImageGallery Schema - For Image Rich Results
interface ImageItem {
  url: string
  caption?: string
  name?: string
}

interface ImageGallerySchemaProps {
  name: string
  images: ImageItem[]
}

export function ImageGallerySchema({ name, images }: ImageGallerySchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name,
    image: images.map((img) => {
      const cleanUrl = transformMediaUrl(img.url)
      return {
        '@type': 'ImageObject',
        url: cleanUrl.startsWith('http') ? cleanUrl : `${SITE_URL}${cleanUrl}`,
        ...(img.caption && { caption: img.caption }),
        ...(img.name && { name: img.name }),
      }
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================================
// AGENCY COMPARISON SCHEMA
// ============================================================
// For "beste-X-agenturen" pages - uses LocalBusiness only for GoldenWing
// (with full address), Organization for competitors (no address required)

interface ComparisonAgency {
  name: string
  rating: number
  reviews: number
  location: string
  website: string
  featured?: boolean
}

interface AgencyComparisonSchemaProps {
  title: string
  agencies: ComparisonAgency[]
  dateModified?: string
}

export function AgencyComparisonSchema({
  title,
  agencies,
  dateModified = new Date().toISOString().split('T')[0],
}: AgencyComparisonSchemaProps) {
  // GoldenWing full address (we have this data)
  const goldenwingAddress = {
    '@type': 'PostalAddress' as const,
    streetAddress: 'Czeikestrasse 4/21',
    addressLocality: 'Wien',
    postalCode: '1100',
    addressRegion: 'Wien',
    addressCountry: 'AT',
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    dateModified,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.answer-first', '.faq-answer', 'h1'],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: agencies.map((agency, index) => {
        // Only use LocalBusiness for GoldenWing (we have full address)
        // Use Organization for competitors (doesn't require address)
        const isGoldenWing = agency.name.toLowerCase().includes('goldenwing')

        if (isGoldenWing) {
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'LocalBusiness',
              '@id': `${SITE_URL}/#organization`,
              name: agency.name,
              url: `https://${agency.website}`,
              telephone: '+43-664-543-96-81',
              email: 'office@goldenwing.at',
              address: goldenwingAddress,
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 48.1676,
                longitude: 16.3795,
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: agency.rating,
                reviewCount: agency.reviews,
                bestRating: 5,
                worstRating: 1,
              },
            },
          }
        }

        // For competitors: use Organization (no address required)
        return {
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Organization',
            name: agency.name,
            url: `https://${agency.website}`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: agency.rating,
              reviewCount: agency.reviews,
              bestRating: 5,
              worstRating: 1,
            },
          },
        }
      }),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
