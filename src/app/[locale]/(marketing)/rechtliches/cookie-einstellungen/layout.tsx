import { Metadata } from 'next'
import { BreadcrumbListSchema, JsonLd } from '@/components/seo/json-ld'
import { getSchemaUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Cookie-Einstellungen | Datenschutz',
  description: 'Verwalten Sie Ihre Cookie-Präferenzen für GoldenWing Creative Studios. Passen Sie Ihre Datenschutzeinstellungen individuell an.',
  keywords: ['Cookie Einstellungen', 'Datenschutz', 'Cookie Präferenzen', 'DSGVO'],
  openGraph: {
    title: 'Cookie-Einstellungen | GoldenWing',
    description: 'Verwalten Sie Ihre Cookie-Präferenzen und Datenschutzeinstellungen.',
    url: '/rechtliches/cookie-einstellungen',
    type: 'website',
  },
  alternates: {
    canonical: '/rechtliches/cookie-einstellungen',
  },
}

export default async function CookieSettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: locale === 'de' ? 'Cookie-Einstellungen' : 'Cookie Settings',
    description: locale === 'de'
      ? 'Verwalten Sie Ihre Cookie-Präferenzen für GoldenWing Creative Studios'
      : 'Manage your cookie preferences for GoldenWing Creative Studios',
    url: getSchemaUrl('/rechtliches/cookie-einstellungen', locale),
    inLanguage: locale === 'de' ? 'de-AT' : 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
  }

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: getSchemaUrl('/', locale) },
          { name: locale === 'de' ? 'Rechtliches' : 'Legal', url: getSchemaUrl('/rechtliches', locale) },
          { name: locale === 'de' ? 'Cookie-Einstellungen' : 'Cookie Settings', url: getSchemaUrl('/rechtliches/cookie-einstellungen', locale) },
        ]}
      />
      <JsonLd data={webPageSchema} />
      {children}
    </>
  )
}
