import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { locales, type Locale } from '@/i18n/config'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

  const titles: Record<string, string> = {
    de: 'GoldenWing Creative Studios | Marketing & Branding Agentur Wien',
    en: 'GoldenWing Creative Studios | Marketing & Branding Agency Vienna',
    ru: 'GoldenWing Creative Studios | Маркетинговое агентство Вена',
  }

  const descriptions: Record<string, string> = {
    de: 'GoldenWing Creative Studios ist eine Wiener Marketing- und Branding-Agentur. Wir entwickeln Websites, SEO-Strategien und Markenidentitaeten.',
    en: 'GoldenWing Creative Studios is a Vienna-based marketing and branding agency. We build websites, SEO strategies, and brand identities.',
    ru: 'GoldenWing Creative Studios — маркетинговое и брендинговое агентство из Вены. Мы создаём сайты, SEO-стратегии и бренд-идентичность.',
  }

  const ogLocales: Record<string, string> = { de: 'de_AT', en: 'en_US', ru: 'ru_RU' }

  return {
    title: { default: (titles[locale] || titles.de) as string, template: '%s | GoldenWing Creative Studios' },
    description: descriptions[locale] || descriptions.de,
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: 'website',
      locale: ogLocales[locale] || 'de_AT',
      siteName: 'GoldenWing Creative Studios',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-white"
      >
        {locale === 'de' ? 'Zum Inhalt springen' : locale === 'ru' ? 'Перейти к содержанию' : 'Skip to content'}
      </a>
      <Header locale={locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
    </>
  )
}
