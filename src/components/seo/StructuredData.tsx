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
