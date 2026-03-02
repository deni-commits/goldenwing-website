type StructuredDataProps = {
  data: Record<string, unknown>
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationSchema() {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'GoldenWing Creative Studios',
        url: 'https://goldenwing.at',
        logo: 'https://goldenwing.at/images/brand/logo.svg',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'office@goldenwing.at',
          contactType: 'customer service',
          availableLanguage: ['German', 'English'],
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Wien',
          addressCountry: 'AT',
        },
        sameAs: [],
      }}
    />
  )
}

export function LocalBusinessSchema() {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://goldenwing.at/#localbusiness',
        name: 'GoldenWing Creative Studios',
        url: 'https://goldenwing.at',
        email: 'office@goldenwing.at',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Wien',
          addressCountry: 'AT',
        },
        priceRange: '$$',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  )
}

export function ArticleSchema({
  title,
  description,
  publishedDate,
  author,
  url,
  image,
}: {
  title: string
  description?: string
  publishedDate: string
  author?: string
  url: string
  image?: string
}) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        ...(description && { description }),
        datePublished: publishedDate,
        ...(author && {
          author: {
            '@type': 'Person',
            name: author,
          },
        }),
        url,
        ...(image && { image }),
        publisher: {
          '@type': 'Organization',
          name: 'GoldenWing Creative Studios',
          logo: {
            '@type': 'ImageObject',
            url: 'https://goldenwing.at/images/brand/logo.svg',
          },
        },
      }}
    />
  )
}

export function ServiceSchema({
  name,
  description,
  url,
  provider,
}: {
  name: string
  description?: string
  url: string
  provider?: string
}) {
  return (
    <StructuredData
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        ...(description && { description }),
        url,
        provider: {
          '@type': 'Organization',
          name: provider ?? 'GoldenWing Creative Studios',
          url: 'https://goldenwing.at',
        },
      }}
    />
  )
}
