import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Palette, Globe, Search, Code, Lightbulb, FileText, Zap, Users, Award, Star, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getTranslations } from 'next-intl/server'
import { ProcessVerticalStepper } from '@/components/process-sections/ProcessVerticalStepper'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { getKreativagenturWienPage, SupportedLocale } from '@/lib/payload'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const iconMap: Record<string, LucideIcon> = {
  'palette': Palette,
  'globe': Globe,
  'search': Search,
  'code': Code,
  'lightbulb': Lightbulb,
  'file-text': FileText,
  'users': Users,
  'zap': Zap,
  'award': Award,
  'star': Star,
}

// Default content
const defaultServices = {
  de: [
    { icon: 'palette', title: 'Branding', description: 'Starke Marken durch einzigartige visuelle Identitäten.', href: '/leistungen/branding' },
    { icon: 'globe', title: 'Webdesign', description: 'Moderne Websites, die begeistern und konvertieren.', href: '/webdesign-wien' },
    { icon: 'search', title: 'SEO & Sichtbarkeit', description: 'Bessere Rankings und mehr organischer Traffic.', href: '/seo-agentur-wien' },
    { icon: 'lightbulb', title: 'Digital Marketing', description: 'Ganzheitliche Strategien für Ihren digitalen Erfolg.', href: '/leistungen/digital-marketing' },
    { icon: 'search', title: 'SEO & Content', description: 'Sichtbarkeit und überzeugende Inhalte.', href: '/leistungen/seo-content' },
    { icon: 'code', title: 'Web- & App-Entwicklung', description: 'Maßgeschneiderte Software für Ihre Anforderungen.', href: '/leistungen/web-app-entwicklung' },
  ],
  en: [
    { icon: 'palette', title: 'Branding', description: 'Strong brands through unique visual identities.', href: '/leistungen/branding' },
    { icon: 'globe', title: 'Web Design', description: 'Modern websites that inspire and convert.', href: '/webdesign-wien' },
    { icon: 'search', title: 'SEO & Visibility', description: 'Better rankings and more organic traffic.', href: '/seo-agentur-wien' },
    { icon: 'lightbulb', title: 'Digital Marketing', description: 'Holistic strategies for your digital success.', href: '/leistungen/digital-marketing' },
    { icon: 'search', title: 'SEO & Content', description: 'Visibility and compelling content.', href: '/leistungen/seo-content' },
    { icon: 'code', title: 'Web & App Development', description: 'Custom software for your requirements.', href: '/leistungen/web-app-entwicklung' },
  ],
  ru: [
    { icon: 'palette', title: 'Брендинг', description: 'Сильные бренды через уникальную визуальную идентичность.', href: '/leistungen/branding' },
    { icon: 'globe', title: 'Веб-дизайн', description: 'Современные сайты, которые вдохновляют и конвертируют.', href: '/webdesign-wien' },
    { icon: 'search', title: 'SEO и видимость', description: 'Лучшие позиции в поиске и больше органического трафика.', href: '/seo-agentur-wien' },
    { icon: 'lightbulb', title: 'Цифровой маркетинг', description: 'Комплексные стратегии для вашего цифрового успеха.', href: '/leistungen/digital-marketing' },
    { icon: 'search', title: 'SEO и контент', description: 'Видимость и убедительный контент.', href: '/leistungen/seo-content' },
    { icon: 'code', title: 'Веб- и мобильная разработка', description: 'Индивидуальное программное обеспечение под ваши требования.', href: '/leistungen/web-app-entwicklung' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ icon: string; title: string; description: string; href: StaticAppPathname }>>

const defaultStats = {
  de: [
    { value: '120+', label: 'Projekte abgeschlossen' },
    { value: '98%', label: 'Kundenzufriedenheit' },
    { value: '13+', label: 'Jahre Erfahrung' },
    { value: '3', label: 'Internationale Standorte' },
  ],
  en: [
    { value: '120+', label: 'Projects completed' },
    { value: '98%', label: 'Customer satisfaction' },
    { value: '13+', label: 'Years of experience' },
    { value: '3', label: 'International locations' },
  ],
  ru: [
    { value: '120+', label: 'Завершённых проектов' },
    { value: '98%', label: 'Удовлетворённость клиентов' },
    { value: '13+', label: 'Лет опыта' },
    { value: '3', label: 'Международных офиса' },
  ],
}

const defaultWhyUs = {
  de: [
    { icon: 'users', title: 'Persönliche Betreuung', description: 'Feste Ansprechpartner und direkter Kontakt – keine anonymen Ticket-Systeme.' },
    { icon: 'zap', title: 'Moderne Technologien', description: 'Wir setzen auf neueste Technologien wie Next.js, React und Tailwind CSS.' },
    { icon: 'award', title: 'Full-Service', description: 'Alles aus einer Hand – von der Strategie über Design bis zur Umsetzung.' },
    { icon: 'globe', title: 'International aufgestellt', description: 'Mit Büros in Wien, Dubai und California bedienen wir Kunden weltweit.' },
  ],
  en: [
    { icon: 'users', title: 'Personal Support', description: 'Dedicated contacts and direct communication – no anonymous ticket systems.' },
    { icon: 'zap', title: 'Modern Technologies', description: 'We use the latest technologies like Next.js, React and Tailwind CSS.' },
    { icon: 'award', title: 'Full-Service', description: 'Everything from one source – from strategy to design to implementation.' },
    { icon: 'globe', title: 'Internationally positioned', description: 'With offices in Vienna, Dubai and California, we serve clients worldwide.' },
  ],
  ru: [
    { icon: 'users', title: 'Персональная поддержка', description: 'Постоянные контактные лица и прямое общение — никаких анонимных тикет-систем.' },
    { icon: 'zap', title: 'Современные технологии', description: 'Мы используем новейшие технологии: Next.js, React и Tailwind CSS.' },
    { icon: 'award', title: 'Полный цикл услуг', description: 'Всё в одном месте — от стратегии и дизайна до реализации.' },
    { icon: 'globe', title: 'Международное присутствие', description: 'С офисами в Вене, Дубае и Калифорнии мы обслуживаем клиентов по всему миру.' },
  ],
}

const defaultIndustries = {
  de: ['Startups & Tech', 'E-Commerce', 'Gastronomie', 'Immobilien', 'Gesundheit', 'Finanzen', 'Industrie', 'Handel'],
  en: ['Startups & Tech', 'E-Commerce', 'Hospitality', 'Real Estate', 'Healthcare', 'Finance', 'Industry', 'Retail'],
  ru: ['Стартапы и технологии', 'Электронная коммерция', 'Гостеприимство', 'Недвижимость', 'Здравоохранение', 'Финансы', 'Промышленность', 'Розничная торговля'],
}

const defaultTestimonials = {
  de: [
    { text: 'Die beste Kreativagentur in Wien. Professionell, kreativ und zuverlässig.', author: 'Sarah M.', company: 'TechStart GmbH' },
    { text: 'Von der Strategie bis zur Umsetzung – alles aus einer Hand. Absolute Empfehlung!', author: 'Michael K.', company: 'Innovate Solutions' },
    { text: 'Endlich eine Agentur, die versteht was wir brauchen und auch liefert.', author: 'Lisa W.', company: 'Green Energy AT' },
  ],
  en: [
    { text: 'The best creative agency in Vienna. Professional, creative and reliable.', author: 'Sarah M.', company: 'TechStart GmbH' },
    { text: 'From strategy to implementation – everything from one source. Highly recommended!', author: 'Michael K.', company: 'Innovate Solutions' },
    { text: 'Finally an agency that understands what we need and delivers.', author: 'Lisa W.', company: 'Green Energy AT' },
  ],
  ru: [
    { text: 'Лучшее креативное агентство в Вене. Профессионально, креативно и надёжно.', author: 'Sarah M.', company: 'TechStart GmbH' },
    { text: 'От стратегии до реализации — всё в одном месте. Настоятельно рекомендую!', author: 'Michael K.', company: 'Innovate Solutions' },
    { text: 'Наконец-то агентство, которое понимает наши потребности и выполняет обещания.', author: 'Lisa W.', company: 'Green Energy AT' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Verstehen', description: 'Wir lernen Ihr Unternehmen und Ihre Ziele kennen.' },
    { step: '02', title: 'Planen', description: 'Gemeinsam entwickeln wir die optimale Strategie.' },
    { step: '03', title: 'Umsetzen', description: 'Unser Team setzt die Strategie kreativ um.' },
    { step: '04', title: 'Optimieren', description: 'Kontinuierliche Verbesserung für beste Ergebnisse.' },
  ],
  en: [
    { step: '01', title: 'Understand', description: 'We get to know your business and your goals.' },
    { step: '02', title: 'Plan', description: 'Together we develop the optimal strategy.' },
    { step: '03', title: 'Execute', description: 'Our team creatively implements the strategy.' },
    { step: '04', title: 'Optimize', description: 'Continuous improvement for best results.' },
  ],
  ru: [
    { step: '01', title: 'Понимание', description: 'Мы узнаём ваш бизнес и ваши цели.' },
    { step: '02', title: 'Планирование', description: 'Вместе разрабатываем оптимальную стратегию.' },
    { step: '03', title: 'Реализация', description: 'Наша команда творчески воплощает стратегию в жизнь.' },
    { step: '04', title: 'Оптимизация', description: 'Постоянное улучшение для лучших результатов.' },
  ],
}

const defaultPopularServices = {
  de: [
    { title: 'Webdesign Wien', description: 'Moderne Websites ab €2.000. Responsive, SEO-optimiert und schnell.', linkText: 'Preise & Details', href: '/webdesign-wien' },
    { title: 'SEO Agentur Wien', description: 'Bessere Google-Rankings für mehr organischen Traffic und Kunden.', linkText: 'Mehr erfahren', href: '/seo-agentur-wien' },
    { title: 'Standort Wien', description: 'Besuchen Sie uns in unserem Wiener Büro für ein persönliches Gespräch.', linkText: 'Anfahrt & Kontakt', href: '/standorte/wien' },
  ],
  en: [
    { title: 'Web Design Vienna', description: 'Modern websites from €2,000. Responsive, SEO-optimized and fast.', linkText: 'Pricing & Details', href: '/webdesign-wien' },
    { title: 'SEO Agency Vienna', description: 'Better Google rankings for more organic traffic and customers.', linkText: 'Learn more', href: '/seo-agentur-wien' },
    { title: 'Vienna Office', description: 'Visit us at our Vienna office for a personal meeting.', linkText: 'Directions & Contact', href: '/standorte/wien' },
  ],
  ru: [
    { title: 'Веб-дизайн Вена', description: 'Современные сайты от 2 000 евро. Адаптивные, SEO-оптимизированные и быстрые.', linkText: 'Цены и детали', href: '/webdesign-wien' },
    { title: 'SEO-агентство Вена', description: 'Лучшие позиции в Google для большего органического трафика и клиентов.', linkText: 'Узнать больше', href: '/seo-agentur-wien' },
    { title: 'Офис в Вене', description: 'Посетите наш офис в Вене для личной встречи.', linkText: 'Как добраться', href: '/standorte/wien' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; linkText: string; href: StaticAppPathname }>>

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'pillarPages.creative' })
  const cmsPage = await getKreativagenturWienPage(locale)

  const metaTitle = cmsPage?.seo?.metaTitle || t('title')
  const metaDescription = truncateMetaDescription(cmsPage?.seo?.metaDescription || t('heroDescription'))
  const hreflangAlternates = getHreflangAlternates('/kreativagentur-wien', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: cmsPage?.seo?.keywords?.split(',').map((k: string) => k.trim()) || [
      locale === 'de' ? 'Kreativagentur Wien' : 'Creative Agency Vienna',
      locale === 'de' ? 'Werbeagentur Wien' : 'Advertising Agency Vienna',
      locale === 'de' ? 'Full-Service Agentur Wien' : 'Full-Service Agency Vienna',
    ],
    openGraph: {
      title: `${cmsPage?.hero?.title || t('heroTitle')} | GoldenWing Creative Studios`,
      description: metaDescription,
      url: getCanonicalUrl('/kreativagentur-wien', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cmsPage?.hero?.title || t('heroTitle')} | GoldenWing Creative Studios`,
      description: metaDescription,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/kreativagentur-wien', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function KreativagenturWienPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'pillarPages.creative' })
  const common = await getTranslations({ locale, namespace: 'common' })
  const isEn = locale === 'en'

  // Fetch CMS data
  const cmsPage = await getKreativagenturWienPage(locale)

  // Build content with CMS fallback
  const heroData = {
    badge: cmsPage?.hero?.badge || (isEn ? 'Full-Service Creative Agency' : 'Full-Service Kreativagentur'),
    title: cmsPage?.hero?.title || t('heroTitle'),
    description: cmsPage?.hero?.description || t('heroDescription'),
    ctaPrimary: cmsPage?.hero?.ctaPrimary || (isEn ? 'Request Project' : 'Projekt anfragen'),
    ctaSecondary: cmsPage?.hero?.ctaSecondary || (isEn ? 'Discover Services' : 'Leistungen entdecken'),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stats = (cmsPage?.stats as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.stats as any[])
    : defaultStats[locale as 'de' | 'en'] ?? defaultStats['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const services = (cmsPage?.services as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.services as any[]).map((s: any) => ({
        icon: s.icon || 'palette',
        title: s.title,
        description: s.description,
        href: (s.href || '#') as StaticAppPathname,
      }))
    : defaultServices[locale as 'de' | 'en'] ?? defaultServices['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whyUs = (cmsPage?.whyUs as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.whyUs as any[]).map((w: any) => ({
        icon: w.icon || 'users',
        title: w.title,
        description: w.description,
      }))
    : defaultWhyUs[locale as 'de' | 'en'] ?? defaultWhyUs['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const industries = (cmsPage?.industries as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.industries as any[]).map((i: any) => i.name)
    : defaultIndustries[locale as 'de' | 'en'] ?? defaultIndustries['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testimonials = (cmsPage?.testimonials as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.testimonials as any[])
    : defaultTestimonials[locale as 'de' | 'en'] ?? defaultTestimonials['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const process = (cmsPage?.process as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.process as any[])
    : defaultProcess[locale as 'de' | 'en'] ?? defaultProcess['en']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const popularServices = (cmsPage?.popularServices as any[])?.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? (cmsPage?.popularServices as any[])
    : defaultPopularServices[locale as 'de' | 'en'] ?? defaultPopularServices['en']

  const servicesTitle = cmsPage?.servicesTitle || t('services')
  const servicesDescription = cmsPage?.servicesDescription || t('servicesDescription')
  const whyUsTitle = cmsPage?.whyUsTitle || t('whyUs')
  const whyUsDescription = cmsPage?.whyUsDescription || t('whyUsDescription')
  const industriesTitle = cmsPage?.industriesTitle || (isEn ? 'Industries We Serve' : 'Branchen, die wir betreuen')
  const industriesDescription = cmsPage?.industriesDescription || (isEn ? 'We work with companies from various industries and understand the specific requirements of each sector.' : 'Wir arbeiten mit Unternehmen aus verschiedensten Branchen zusammen und verstehen die spezifischen Anforderungen jedes Sektors.')
  const processTitle = cmsPage?.processTitle || (isEn ? 'How We Work' : 'So arbeiten wir')
  const processDescription = cmsPage?.processDescription || (isEn ? 'Our proven process for successful projects.' : 'Unser bewährter Prozess für erfolgreiche Projekte.')
  const popularServicesTitle = cmsPage?.popularServicesTitle || (isEn ? 'Popular Services' : 'Beliebte Services')
  const ctaTitle = cmsPage?.ctaTitle || (isEn ? 'Ready for Your Project?' : 'Bereit für Ihr Projekt?')
  const ctaDescription = cmsPage?.ctaDescription || (isEn ? "Let's create something great together. Free initial consultation with no obligation." : 'Lassen Sie uns gemeinsam Großes schaffen. Kostenloses Erstgespräch ohne Verpflichtung.')
  const ctaButton = cmsPage?.ctaButton || (isEn ? 'Request Project' : 'Projekt anfragen')

  // Organization Schema
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://goldenwing.at/kreativagentur-wien/#localbusiness',
    name: 'GoldenWing Creative Studios',
    alternateName: isEn ? 'Creative Agency Vienna' : 'Kreativagentur Wien',
    description: isEn
      ? 'Full-service creative agency in Vienna for branding, web design and digital marketing.'
      : 'Full-Service Kreativagentur in Wien für Branding, Webdesign und digitales Marketing.',
    url: 'https://goldenwing.at/kreativagentur-wien',
    logo: 'https://goldenwing.at/logo.png',
    image: 'https://goldenwing.at/og-image.jpg',
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
    telephone: '+43-664-543-96-81',
    email: 'office@goldenwing.at',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: ['Wien', 'Österreich', 'Deutschland', 'Schweiz'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '47',
      bestRating: '5',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{heroData.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {heroData.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              {heroData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {heroData.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="#leistungen">
                  {heroData.ctaSecondary}
                </NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat: { value: string; label: string }) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="leistungen" className="py-20 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {servicesDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: { icon: string; title: string; description: string; href: string }) => {
              const IconComponent = iconMap[service.icon] || Palette
              return (
                <Card key={service.title} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    {/* @ts-expect-error CMS data with type assertion - href is properly typed via satisfies */}
                    <Link href={service.href} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                      {common('learnMore')} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{whyUsTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {whyUsDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item: { icon: string; title: string; description: string }) => {
              const IconComponent = iconMap[item.icon] || Users
              return (
                <div key={item.title} className="text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20">
        <Container variant="block">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                {industriesTitle}
              </h2>
              <p className="text-muted-foreground mb-8">
                {industriesDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry: string) => (
                  <span key={industry} className="px-4 py-2 bg-muted rounded-full text-sm">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {testimonials.map((testimonial: { text: string; author: string; company: string }, i: number) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm mb-3">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="text-sm">
                      <span className="font-medium">{testimonial.author}</span>
                      <span className="text-muted-foreground"> · {testimonial.company}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Process - ProcessVerticalStepper Layout */}
      <ProcessVerticalStepper
        title={processTitle}
        subtitle={processDescription}
        steps={process.map((item: { step: string; title: string; description: string }) => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* Services Overview */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {popularServicesTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {popularServices.map((service: { title: string; description: string; linkText: string; href: string }) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  {/* @ts-expect-error CMS data with proper typing via satisfies */}
                  <Link href={service.href} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {service.linkText} <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contextual Internal Links — service pages */}
      <section className="py-16">
        <Container variant="block">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isEn ? 'Explore Our Services' : 'Entdecken Sie unsere Leistungen'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {(isEn ? [
                { text: 'Branding', href: '/services/branding' },
                { text: 'Web Design', href: '/services/web-design' },
                { text: 'SEO & Content', href: '/services/seo-content' },
                { text: 'Digital Marketing', href: '/services/digital-marketing' },
                { text: 'Web & App Development', href: '/services/web-app-development' },
                { text: 'IT & Cloud Services', href: '/services/it-cloud-services' },
              ] : [
                { text: 'Branding', href: '/leistungen/branding' },
                { text: 'Webdesign', href: '/leistungen/webdesign' },
                { text: 'SEO & Content', href: '/leistungen/seo-content' },
                { text: 'Digital Marketing', href: '/leistungen/digital-marketing' },
                { text: 'Web & App Entwicklung', href: '/leistungen/web-app-entwicklung' },
                { text: 'IT & Cloud Services', href: '/leistungen/it-cloud-services' },
              ]).map((link) => (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg border hover:border-primary hover:bg-muted/50 transition-colors text-sm font-medium"
                >
                  {link.text}
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {ctaTitle}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <NextLink href={getContactUrl(locale)}>
                {ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <NextLink href="tel:+436645439681">
                +43 664 543 96 81
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
