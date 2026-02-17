// Reusable Schema Components for SEO/GEO/AEO

// Helper to transform Payload CMS media URLs
// Payload returns /api/media/file/filename which redirects to /media/filename
// We transform to direct URL to avoid 301 redirects in schema markup
function transformMediaUrl(url: string): string {
  return url.replace('/api/media/file/', '/media/')
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://goldenwing.at${item.url}`,
    })),
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
  url: string
  provider?: string
  areaServed?: string
  priceRange?: string
}

export function ServiceSchema({
  name,
  description,
  url,
  provider = 'GoldenWing Creative Studios',
  areaServed = 'Wien, Österreich',
  priceRange = '$$',
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: url.startsWith('http') ? url : `https://goldenwing.at${url}`,
    provider: {
      '@type': 'Organization',
      name: provider,
      '@id': 'https://goldenwing.at/#organization',
    },
    areaServed: {
      '@type': 'Place',
      name: areaServed,
    },
    priceRange,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Vienna office provider object for Service schemas
const viennaOfficeProvider = {
  '@type': 'LocalBusiness',
  '@id': 'https://goldenwing.at/#organization',
  name: 'GoldenWing Creative Studios',
  url: 'https://goldenwing.at',
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

interface ServiceListSchemaProps {
  services: Array<{
    name: string
    description: string
    url: string
  }>
}

export function ServiceListSchema({ services }: ServiceListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: service.url.startsWith('http') ? service.url : `https://goldenwing.at${service.url}`,
        provider: viennaOfficeProvider,
        areaServed: [
          { '@type': 'Country', name: 'Austria' },
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'Switzerland' },
        ],
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

// Export the provider for use in other schemas
export { viennaOfficeProvider }

interface PersonSchemaProps {
  name: string
  jobTitle: string
  description?: string
  image?: string
  url?: string
  sameAs?: string[]
}

export function PersonSchema({
  name,
  jobTitle,
  description,
  image,
  url,
  sameAs,
}: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    ...(description && { description }),
    ...(image && { image: transformMediaUrl(image) }),
    ...(url && { url }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
    worksFor: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      '@id': 'https://goldenwing.at/#organization',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface TeamSchemaProps {
  members: Array<{
    name: string
    jobTitle: string
    description?: string
    image?: string
  }>
}

export function TeamSchema({ members }: TeamSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://goldenwing.at/#team',
    name: 'GoldenWing Creative Studios Team',
    member: members.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.jobTitle,
      ...(member.description && { description: member.description }),
      ...(member.image && { image: transformMediaUrl(member.image) }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ReviewSchemaProps {
  reviews: Array<{
    text: string
    name: string
    role?: string
    company?: string
    rating?: number
    datePublished?: string
  }>
  itemReviewed?: {
    name: string
    // Note: 'Service' is NOT valid for itemReviewed in Google's Review schema
    type?: 'Organization' | 'LocalBusiness' | 'Product'
  }
}

export function ReviewSchema({
  reviews,
  itemReviewed = { name: 'GoldenWing Creative Studios', type: 'Organization' },
}: ReviewSchemaProps) {
  const avgRating = reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length

  const schema = {
    '@context': 'https://schema.org',
    '@type': itemReviewed.type || 'Organization',
    'name': itemReviewed.name,
    '@id': 'https://goldenwing.at/#organization',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': avgRating.toFixed(1),
      'bestRating': '5',
      'worstRating': '1',
      'ratingCount': reviews.length.toString(),
      'reviewCount': reviews.length.toString(),
    },
    'review': reviews.map((review) => ({
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': (review.rating || 5).toString(),
        'bestRating': '5',
        'worstRating': '1',
      },
      'author': {
        '@type': 'Person',
        'name': review.name,
        ...(review.role && { jobTitle: review.role }),
        ...(review.company && {
          worksFor: {
            '@type': 'Organization',
            'name': review.company,
          },
        }),
      },
      'reviewBody': review.text,
      ...(review.datePublished && { datePublished: review.datePublished }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface AggregateRatingSchemaProps {
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
  itemName?: string
}

export function AggregateRatingSchema({
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1,
  itemName = 'GoldenWing Creative Studios',
}: AggregateRatingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': itemName,
    '@id': 'https://goldenwing.at/#organization',
    'url': 'https://goldenwing.at',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Czeikestrasse 4/21',
      'addressLocality': 'Wien',
      'postalCode': '1100',
      'addressCountry': 'AT',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': ratingValue.toFixed(1),
      'bestRating': bestRating.toString(),
      'worstRating': worstRating.toString(),
      'reviewCount': reviewCount.toString(),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

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

// Software Application Schema for Tools pages
interface SoftwareApplicationSchemaProps {
  name: string
  description: string
  url: string
  applicationCategory?: string
  operatingSystem?: string
  offers?: {
    price: string
    priceCurrency: string
  }
}

export function SoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory = 'WebApplication',
  operatingSystem = 'Any',
  offers = { price: '0', priceCurrency: 'EUR' },
}: SoftwareApplicationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: url.startsWith('http') ? url : `https://goldenwing.at${url}`,
    applicationCategory,
    operatingSystem,
    offers: {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
    },
    provider: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function CredentialsSchema({
  credentials,
  organizationName = 'GoldenWing Creative Studios'
}: CredentialsSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://goldenwing.at/#organization',
    name: organizationName,
    url: 'https://goldenwing.at',
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
