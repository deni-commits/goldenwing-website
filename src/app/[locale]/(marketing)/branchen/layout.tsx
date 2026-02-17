import { Metadata } from 'next'
import { getHreflangAlternates, getCanonicalUrl } from '@/lib/utils'

const SITE_URL = 'https://goldenwing.at'

// All industry pages for ItemList schema
const industryItems = [
  { name: 'Ärzte & Gesundheitswesen', url: '/branchen/aerzte', description: 'Digitale Lösungen für Arztpraxen und Gesundheitseinrichtungen' },
  { name: 'Rechtsanwälte & Kanzleien', url: '/branchen/rechtsanwaelte', description: 'Websites und Marketing für Anwaltskanzleien' },
  { name: 'E-Commerce & Online-Shops', url: '/branchen/ecommerce', description: 'Professionelle E-Commerce Lösungen' },
  { name: 'B2B & Industrie', url: '/branchen/b2b', description: 'Digitalisierung für B2B-Unternehmen' },
  { name: 'Startups', url: '/branchen/startups', description: 'Branding und Websites für Startups' },
  { name: 'Gastronomie & Hotels', url: '/branchen/gastronomie', description: 'Digitale Präsenz für Restaurants und Hotels' },
  { name: 'Immobilien', url: '/branchen/immobilien', description: 'Websites für Immobilienmakler und -entwickler' },
  { name: 'Dienstleister & Berater', url: '/branchen/dienstleister', description: 'Online-Marketing für Beratungsunternehmen' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const hreflangAlternates = getHreflangAlternates('/branchen', locale)
  const canonicalUrl = getCanonicalUrl('/branchen', locale)

  const titles = {
    de: 'Branchen-Lösungen | Digitalagentur für Ihre Branche',
    en: 'Industry Solutions | Digital Agency for Your Industry',
    ru: 'Отраслевые решения | Диджитал агентство для вашей отрасли',
  }

  const descriptions = {
    de: 'Maßgeschneiderte Digital-Lösungen für 8 Branchen: Ärzte, Rechtsanwälte, E-Commerce, B2B, Startups, Gastronomie, Immobilien & Dienstleister.',
    en: 'Custom digital solutions for 8 industries: Healthcare, Legal, E-Commerce, B2B, Startups, Hospitality, Real Estate & Professional Services.',
    ru: 'Индивидуальные цифровые решения для 8 отраслей: здравоохранение, юриспруденция, электронная коммерция, B2B, стартапы, гостиничный бизнес, недвижимость.',
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.de,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.de,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.de,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.de,
      url: canonicalUrl,
      type: 'website',
    },
  }
}

export default function BranchenLayout({ children }: { children: React.ReactNode }) {
  // CollectionPage + ItemList Schema for industry solutions
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Branchen-Lösungen',
    description: 'Maßgeschneiderte Digital-Lösungen für verschiedene Branchen von GoldenWing Creative Studios.',
    url: `${SITE_URL}/branchen`,
    publisher: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: industryItems.length,
      itemListElement: industryItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: item.name,
          description: item.description,
          url: `${SITE_URL}${item.url}`,
          provider: {
            '@type': 'Organization',
            name: 'GoldenWing Creative Studios',
          },
        },
      })),
    },
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Branchen', item: `${SITE_URL}/branchen` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
