import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getPayload } from '@/lib/payload'

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
  const t = await getDictionary(locale as Locale)

  return {
    title: { default: t.meta.siteTitle, template: '%s | GoldenWing Creative Studios' },
    description: t.meta.siteDescription,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'de-AT': `${siteUrl}/de`,
        'en-US': `${siteUrl}/en`,
        'ru-RU': `${siteUrl}/ru`,
        'x-default': `${siteUrl}/de`,
      },
    },
    openGraph: {
      type: 'website',
      locale: t.meta.ogLocale,
      siteName: 'GoldenWing Creative Studios',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const t = await getDictionary(locale as Locale)

  let siteSettings: any = null
  let navigation: any = null
  let footerData: any = null

  try {
    const payload = await getPayload()
    const [settingsRes, navRes, footerRes] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', locale }),
      payload.findGlobal({ slug: 'navigation', locale }),
      payload.findGlobal({ slug: 'footer', locale }),
    ])
    siteSettings = settingsRes
    navigation = navRes
    footerData = footerRes
  } catch {
    // Globals may not exist yet on first build
  }

  return (
    <>
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:px-4 focus:py-2"
      >
        {t.common.skipToContent}
      </a>
      <Header locale={locale} t={t} navigation={navigation} siteSettings={siteSettings} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} t={t} footerData={footerData} siteSettings={siteSettings} />
    </>
  )
}
