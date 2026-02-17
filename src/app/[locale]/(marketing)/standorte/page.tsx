import { Metadata } from 'next'
import NextLink from 'next/link'
import { MapPin, Phone, Mail, ArrowRight, Globe, Building2, Users, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, getLocationUrl, getSchemaUrl, getContactUrl } from '@/lib/utils'
import { getLocationsOverviewPage, type SupportedLocale } from '@/lib/payload'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const locationsPage = await getLocationsOverviewPage(locale)
   
  const cp = locationsPage as Record<string, any> | null
  const hreflangAlternates = getHreflangAlternates('/standorte')

  const titles: Record<string, string> = {
    de: 'Standorte | Wien · Dubai · California',
    en: 'Locations | Vienna · Dubai · California',
    ru: 'Офисы | Вена · Дубай · Калифорния',
  }
  const descriptions: Record<string, string> = {
    de: 'GoldenWing Creative Studios mit Büros in Wien (Österreich), Dubai (UAE) und California (USA). Persönliche Beratung an allen Standorten.',
    en: 'GoldenWing Creative Studios with offices in Vienna (Austria), Dubai (UAE) and California (USA). Personal consultation at all locations.',
    ru: 'GoldenWing Creative Studios с офисами в Вене (Австрия), Дубае (ОАЭ) и Калифорнии (США). Личные консультации во всех локациях.',
  }
  const title = cp?.seo?.metaTitle || titles[locale] || titles.en
  const description = cp?.seo?.metaDescription || descriptions[locale] || descriptions.en

  const keywords: Record<string, string[]> = {
    de: ['Kreativagentur Wien', 'Web Design Dubai', 'Creative Agency California', 'GoldenWing Standorte'],
    en: ['Creative Agency Vienna', 'Web Design Dubai', 'Creative Agency California', 'GoldenWing Locations'],
    ru: ['Креативное агентство Вена', 'Веб-дизайн Дубай', 'Креативное агентство Калифорния', 'GoldenWing офисы'],
  }
  const ogTitles: Record<string, string> = {
    de: 'Unsere Standorte | GoldenWing Creative Studios',
    en: 'Our Locations | GoldenWing Creative Studios',
    ru: 'Наши офисы | GoldenWing Creative Studios',
  }

  return {
    title,
    description,
    keywords: keywords[locale] || keywords.en,
    openGraph: {
      title: ogTitles[locale] || ogTitles.en,
      description,
    },
    alternates: {
      canonical: getCanonicalUrl('/standorte', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

// Generate JSON-LD Schema for Organization + LocalBusiness
function generateSchemas(locale: string) {
  const schemaDescriptions: Record<string, string> = {
    de: 'Internationale Kreativagentur mit Standorten in Wien, Dubai und California.',
    en: 'International creative agency with locations in Vienna, Dubai and California.',
    ru: 'Международное креативное агентство с офисами в Вене, Дубае и Калифорнии.',
  }
  const breadcrumbLocations: Record<string, string> = { de: 'Standorte', en: 'Locations', ru: 'Офисы' }

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://goldenwing.at/#organization',
    name: 'GoldenWing Creative Studios',
    url: 'https://goldenwing.at',
    logo: 'https://goldenwing.at/logo.png',
    description: schemaDescriptions[locale] || schemaDescriptions.en,
    location: [
      {
        '@type': 'Place',
        name: 'GoldenWing Creative Studios Vienna',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Czeikestrasse 4/21',
          addressLocality: 'Vienna',
          postalCode: '1100',
          addressCountry: 'AT',
        },
        telephone: '+43 664 543 96 81',
      },
      {
        '@type': 'Place',
        name: 'GoldenWing Creative Studios Dubai',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'DAMAC Executive Bay Tower B, Office 1406',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        telephone: '+971 58 514 4360',
      },
      {
        '@type': 'Place',
        name: 'GoldenWing Creative Studios Roseville',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '2700 N Hayden Pkwy',
          addressLocality: 'Roseville',
          addressRegion: 'CA',
          postalCode: '95747',
          addressCountry: 'US',
        },
        telephone: '+1 916 667 4629',
      },
    ],
  }

  // LocalBusiness Schemas (important for Local SEO)
  const localBusinessSchemas = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://goldenwing.at/#localbusiness-vienna',
        name: 'GoldenWing Creative Studios Wien',
        image: 'https://goldenwing.at/og-image.jpg',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Czeikestrasse 4/21',
          addressLocality: 'Wien',
          postalCode: '1100',
          addressCountry: 'AT',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 48.1676, longitude: 16.3795 },
        telephone: '+43-664-543-96-81',
        email: 'office@goldenwing.at',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://goldenwing.at/#localbusiness-dubai',
        name: 'GoldenWing Creative Studios Dubai',
        image: 'https://goldenwing.at/og-image.jpg',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'DAMAC Executive Bay Tower B, Office 1406',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        telephone: '+971-58-514-4360',
        email: 'dubai@goldenwing.at',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://goldenwing.at/#localbusiness-roseville',
        name: 'GoldenWing Creative Studios Roseville',
        image: 'https://goldenwing.at/og-image.jpg',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '2700 N Hayden Pkwy',
          addressLocality: 'Roseville',
          addressRegion: 'CA',
          postalCode: '95747',
          addressCountry: 'US',
        },
        telephone: '+1-916-667-4629',
        email: 'usa@goldenwing.at',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '17:00',
        },
      },
    ],
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: getSchemaUrl('/', locale) },
      { '@type': 'ListItem', position: 2, name: breadcrumbLocations[locale] || breadcrumbLocations.en, item: getSchemaUrl('/standorte', locale) },
    ],
  }

  return { organizationSchema, localBusinessSchemas, breadcrumbSchema }
}

// Translation helpers for inline text
const uiText = {
  continents: { de: '3 Kontinente, 1 Team', en: '3 Continents, 1 Team', ru: '3 континента, 1 команда' },
  locationsWorldwide: { de: 'Standorte weltweit', en: 'Locations worldwide', ru: 'Офисов по миру' },
  countriesServed: { de: 'Länder betreut', en: 'Countries served', ru: 'Стран обслужено' },
  supportAvailable: { de: 'Support möglich', en: 'Support available', ru: 'Поддержка доступна' },
  headquarters: { de: 'Hauptsitz', en: 'Headquarters', ru: 'Штаб-квартира' },
  services: { de: 'Leistungen:', en: 'Services:', ru: 'Услуги:' },
  moreAbout: { de: 'Mehr über', en: 'More about', ru: 'Подробнее о' },
  whyInternational: { de: 'Warum internationale Präsenz?', en: 'Why international presence?', ru: 'Почему международное присутствие?' },
  whyInternationalDesc: {
    de: 'Unsere globale Aufstellung ermöglicht es uns, Kunden in verschiedenen Zeitzonen zu betreuen und lokale Marktexpertise einzubringen.',
    en: 'Our global setup allows us to serve clients in different time zones and bring local market expertise.',
    ru: 'Наша глобальная структура позволяет обслуживать клиентов в разных часовых поясах и использовать локальную экспертизу рынка.',
  },
  localExpertise: { de: 'Lokale Expertise', en: 'Local Expertise', ru: 'Локальная экспертиза' },
  localExpertiseDesc: {
    de: 'Wir verstehen lokale Märkte, Kulturen und Geschäftspraktiken in DACH, MENA und Nordamerika.',
    en: 'We understand local markets, cultures, and business practices in DACH, MENA, and North America.',
    ru: 'Мы понимаем локальные рынки, культуры и бизнес-практики в DACH, MENA и Северной Америке.',
  },
  personalMeetings: { de: 'Persönliche Meetings', en: 'Personal Meetings', ru: 'Личные встречи' },
  personalMeetingsDesc: {
    de: 'Face-to-Face Meetings an allen Standorten möglich. Wir kommen auch gerne zu Ihnen.',
    en: 'Face-to-face meetings possible at all locations. We also gladly come to you.',
    ru: 'Личные встречи возможны во всех офисах. Мы также с удовольствием приедем к вам.',
  },
  timezoneCoverage: { de: 'Zeitzonenabdeckung', en: 'Timezone Coverage', ru: 'Покрытие часовых поясов' },
  timezoneCoverageDesc: {
    de: 'Von Wien bis Kalifornien – wir sind erreichbar, wenn Sie uns brauchen.',
    en: 'From Vienna to California – we are available when you need us.',
    ru: 'От Вены до Калифорнии — мы доступны, когда вы в нас нуждаетесь.',
  },
  whatWeOffer: { de: 'Was wir vor Ort bieten', en: 'What We Offer On-Site', ru: 'Что мы предлагаем на месте' },
  whatWeOfferDesc: { de: 'An jedem Standort unterstützen wir Sie mit:', en: 'At each location, we support you with:', ru: 'В каждом офисе мы поддерживаем вас:' },
  visitUs: { de: 'Besuchen Sie uns', en: 'Visit Us', ru: 'Посетите нас' },
  visitUsDesc: {
    de: 'Vereinbaren Sie ein persönliches Gespräch an einem unserer Standorte oder online.',
    en: 'Schedule a personal meeting at one of our locations or online.',
    ru: 'Запишитесь на личную встречу в одном из наших офисов или онлайн.',
  },
  scheduleAppointment: { de: 'Termin vereinbaren', en: 'Schedule Appointment', ru: 'Записаться на встречу' },
}

export default async function StandortePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const [t, locationsPage] = await Promise.all([
    getTranslations({ locale, namespace: 'locations' }),
    getLocationsOverviewPage(locale),
  ])
  const getText = (key: keyof typeof uiText) => uiText[key][locale as keyof typeof uiText[typeof key]] || uiText[key].en
   
  const cp = locationsPage as Record<string, any> | null

  // Generate all schemas
  const { organizationSchema, localBusinessSchemas, breadcrumbSchema } = generateSchemas(locale)

  // Services from CMS or defaults
  const defaultServicesMap: Record<string, string[]> = {
    de: ['Workshops und Kick-offs', 'Projektabstimmungen und Reviews', 'Go-Lives und Schulungen', 'Langfristige Partnerschaften'],
    en: ['Workshops and kick-offs', 'Project coordination and reviews', 'Go-lives and training', 'Long-term partnerships'],
    ru: ['Воркшопы и кик-оффы', 'Координация проектов и ревью', 'Запуски и обучение', 'Долгосрочное партнёрство'],
  }
  const defaultServices = defaultServicesMap[locale] || defaultServicesMap.en
   
  const cmsServices = cp?.services as any[] | undefined
  const services = cmsServices?.length
    ? cmsServices.map((s) => s.text)
    : defaultServices

  const countryNames: Record<string, Record<string, string>> = {
    austria: { de: 'Österreich', en: 'Austria', ru: 'Австрия' },
    uae: { de: 'UAE', en: 'UAE', ru: 'ОАЭ' },
    california: { de: 'California', en: 'California', ru: 'Калифорния' },
  }
  const hoursMap: Record<string, Record<string, string>> = {
    vienna: { de: 'Mo-Fr 09:00 - 18:00', en: 'Mon-Fri 09:00 - 18:00', ru: 'Пн-Пт 09:00 - 18:00' },
    dubai: { de: 'So-Do 09:00 - 18:00', en: 'Sun-Thu 09:00 - 18:00', ru: 'Вс-Чт 09:00 - 18:00' },
    roseville: { de: 'Mo-Fr 09:00 - 17:00 PST', en: 'Mon-Fri 09:00 - 17:00 PST', ru: 'Пн-Пт 09:00 - 17:00 PST' },
  }
  const servicesMap: Record<string, Record<string, string[]>> = {
    vienna: {
      de: ['Branding', 'Webdesign', 'SEO', 'Software-Entwicklung'],
      en: ['Branding', 'Web Design', 'SEO', 'Software Development'],
      ru: ['Брендинг', 'Веб-дизайн', 'SEO', 'Разработка ПО'],
    },
    dubai: {
      de: ['Webdesign', 'Branding', 'Digitales Marketing', 'E-Commerce'],
      en: ['Web Design', 'Branding', 'Digital Marketing', 'E-Commerce'],
      ru: ['Веб-дизайн', 'Брендинг', 'Цифровой маркетинг', 'Электронная коммерция'],
    },
    roseville: {
      de: ['Webentwicklung', 'Branding', 'UI/UX Design', 'Software-Lösungen'],
      en: ['Web Development', 'Branding', 'UI/UX Design', 'Software Solutions'],
      ru: ['Веб-разработка', 'Брендинг', 'UI/UX Дизайн', 'Программные решения'],
    },
  }

  const locations = [
    {
      city: t('vienna.title'),
      country: countryNames.austria[locale] || countryNames.austria.en,
      flag: '🇦🇹',
      isHQ: true,
      slug: 'wien',
      address: 'Czeikestrasse 4/21, 1100 Wien',
      phone: '+43 664 543 96 81',
      email: 'office@goldenwing.at',
      hours: hoursMap.vienna[locale] || hoursMap.vienna.en,
      description: t('vienna.description'),
      services: servicesMap.vienna[locale] || servicesMap.vienna.en,
    },
    {
      city: t('dubai.title'),
      country: countryNames.uae[locale] || countryNames.uae.en,
      flag: '🇦🇪',
      isHQ: false,
      slug: 'dubai',
      address: 'DAMAC Executive Bay Tower B, Office 1406, Business Bay',
      phone: '+971 58 514 4360',
      email: 'dubai@goldenwing.at',
      hours: hoursMap.dubai[locale] || hoursMap.dubai.en,
      description: t('dubai.description'),
      services: servicesMap.dubai[locale] || servicesMap.dubai.en,
    },
    {
      city: t('roseville.title'),
      country: countryNames.california[locale] || countryNames.california.en,
      flag: '🇺🇸',
      isHQ: false,
      slug: 'roseville',
      address: '2700 N Hayden Pkwy, Roseville, CA 95747',
      phone: '+1 916 667 4629',
      email: 'usa@goldenwing.at',
      hours: hoursMap.roseville[locale] || hoursMap.roseville.en,
      description: t('roseville.description'),
      services: servicesMap.roseville[locale] || servicesMap.roseville.en,
    },
  ]

  return (
    <>
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemas) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">{getText('continents')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('description')}
            </p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">{getText('locationsWorldwide')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">{getText('countriesServed')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">{getText('supportAvailable')}</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Locations Grid */}
      <section className="py-20">
        <Container variant="block">
          <div className="grid gap-8">
            {locations.map((location, index) => (
              <Card key={location.slug} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image/Map Side */}
                    <div className={`aspect-video md:aspect-auto bg-gradient-to-br from-primary/10 to-primary/5 relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-6xl mb-4 block">{location.flag}</span>
                          <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto" />
                        </div>
                      </div>
                      {location.isHQ && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                            {getText('headquarters')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Side */}
                    <div className="p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-2xl md:text-3xl font-bold">{location.city}</h2>
                        <span className="text-muted-foreground">{location.country}</span>
                      </div>

                      <p className="text-muted-foreground mb-6">
                        {location.description}
                      </p>

                      {/* Contact Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="text-sm">{location.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                          <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="text-sm hover:text-primary transition-colors">
                            {location.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                          <a href={`mailto:${location.email}`} className="text-sm hover:text-primary transition-colors">
                            {location.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
                          <span className="text-sm">{location.hours}</span>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="mb-6">
                        <div className="text-sm text-muted-foreground mb-2">{getText('services')}</div>
                        <div className="flex flex-wrap gap-2">
                          {location.services.map((service) => (
                            <span key={service} className="px-3 py-1 bg-muted rounded-full text-xs">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button asChild>
                        <NextLink href={getLocationUrl(location.slug, locale as 'de' | 'en' | 'ru')}>
                          {getText('moreAbout')} {location.city}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </NextLink>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Global */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{getText('whyInternational')}</h2>
            <p className="text-muted-foreground">
              {getText('whyInternationalDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{getText('localExpertise')}</h3>
              <p className="text-sm text-muted-foreground">
                {getText('localExpertiseDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{getText('personalMeetings')}</h3>
              <p className="text-sm text-muted-foreground">
                {getText('personalMeetingsDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{getText('timezoneCoverage')}</h3>
              <p className="text-sm text-muted-foreground">
                {getText('timezoneCoverageDesc')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Services at Locations */}
      <section className="py-20 border-t">
        <Container variant="block">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {getText('whatWeOffer')}
              </h2>
              <p className="text-muted-foreground">
                {getText('whatWeOfferDesc')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* DACH Städte Hub - Hub-and-Spoke Struktur */}
      <section className="py-20 border-t bg-muted/20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === 'de' ? 'Unsere DACH-Standorte' : locale === 'ru' ? 'Наши офисы в регионе DACH' : 'Our DACH Locations'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {locale === 'de'
                ? 'Von Wien aus betreuen wir Kunden in ganz Österreich, Deutschland und der Schweiz. Klicken Sie auf Ihre Stadt für lokale Services.'
                : locale === 'ru'
                ? 'Из Вены мы обслуживаем клиентов по всей Австрии, Германии и Швейцарии. Нажмите на ваш город для местных услуг.'
                : 'From Vienna, we serve clients across Austria, Germany, and Switzerland. Click your city for local services.'}
            </p>
          </div>

          {/* Österreich */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span>🇦🇹</span>
              {locale === 'de' ? 'Österreich' : locale === 'ru' ? 'Австрия' : 'Austria'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Wien */}
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <NextLink href="/standorte/wien" className="block">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">Wien</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{locale === 'de' ? 'Hauptsitz' : 'HQ'}</span>
                  </h4>
                </NextLink>
                <ul className="space-y-1 text-sm">
                  <li><NextLink href="/standorte/wien/webdesign" className="text-muted-foreground hover:text-foreground">Webdesign</NextLink></li>
                  <li><NextLink href="/standorte/wien/seo" className="text-muted-foreground hover:text-foreground">SEO</NextLink></li>
                  <li><NextLink href="/standorte/wien/branding" className="text-muted-foreground hover:text-foreground">Branding</NextLink></li>
                  <li><NextLink href="/standorte/wien/google-ads" className="text-muted-foreground hover:text-foreground">Google Ads</NextLink></li>
                </ul>
              </Card>
              {/* Graz */}
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <NextLink href="/standorte/graz" className="block">
                  <h4 className="font-semibold mb-2 text-primary">Graz</h4>
                </NextLink>
                <ul className="space-y-1 text-sm">
                  <li><NextLink href="/standorte/graz/webdesign" className="text-muted-foreground hover:text-foreground">Webdesign</NextLink></li>
                  <li><NextLink href="/standorte/graz/seo" className="text-muted-foreground hover:text-foreground">SEO</NextLink></li>
                  <li><NextLink href="/standorte/graz/online-marketing" className="text-muted-foreground hover:text-foreground">Online Marketing</NextLink></li>
                </ul>
              </Card>
              {/* Linz */}
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <NextLink href="/standorte/linz" className="block">
                  <h4 className="font-semibold mb-2 text-primary">Linz</h4>
                </NextLink>
                <ul className="space-y-1 text-sm">
                  <li><NextLink href="/standorte/linz/webdesign" className="text-muted-foreground hover:text-foreground">Webdesign</NextLink></li>
                  <li><NextLink href="/standorte/linz/seo" className="text-muted-foreground hover:text-foreground">SEO</NextLink></li>
                </ul>
              </Card>
              {/* Salzburg */}
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <NextLink href="/standorte/salzburg" className="block">
                  <h4 className="font-semibold mb-2 text-primary">Salzburg</h4>
                </NextLink>
                <ul className="space-y-1 text-sm">
                  <li><NextLink href="/standorte/salzburg/webdesign" className="text-muted-foreground hover:text-foreground">Webdesign</NextLink></li>
                </ul>
              </Card>
              {/* Innsbruck */}
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <NextLink href="/standorte/innsbruck" className="block">
                  <h4 className="font-semibold mb-2 text-primary">Innsbruck</h4>
                </NextLink>
                <ul className="space-y-1 text-sm">
                  <li><NextLink href="/standorte/innsbruck/webdesign" className="text-muted-foreground hover:text-foreground">Webdesign</NextLink></li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Deutschland */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span>🇩🇪</span>
              {locale === 'de' ? 'Deutschland' : locale === 'ru' ? 'Германия' : 'Germany'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* München */}
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <NextLink href="/standorte/muenchen" className="block">
                  <h4 className="font-semibold mb-2 text-primary">München</h4>
                </NextLink>
                <ul className="space-y-1 text-sm">
                  <li><NextLink href="/standorte/muenchen/webdesign" className="text-muted-foreground hover:text-foreground">Webdesign</NextLink></li>
                  <li><NextLink href="/standorte/muenchen/seo" className="text-muted-foreground hover:text-foreground">SEO</NextLink></li>
                </ul>
              </Card>
              {/* Berlin */}
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <NextLink href="/standorte/berlin" className="block">
                  <h4 className="font-semibold mb-2 text-primary">Berlin</h4>
                </NextLink>
                <ul className="space-y-1 text-sm">
                  <li><NextLink href="/standorte/berlin/webdesign" className="text-muted-foreground hover:text-foreground">Webdesign</NextLink></li>
                  <li><NextLink href="/standorte/berlin/seo" className="text-muted-foreground hover:text-foreground">SEO</NextLink></li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Schweiz */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span>🇨🇭</span>
              {locale === 'de' ? 'Schweiz' : locale === 'ru' ? 'Швейцария' : 'Switzerland'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Zürich */}
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <NextLink href="/standorte/zuerich" className="block">
                  <h4 className="font-semibold mb-2 text-primary">Zürich</h4>
                </NextLink>
                <ul className="space-y-1 text-sm">
                  <li><NextLink href="/standorte/zuerich/webdesign" className="text-muted-foreground hover:text-foreground">Webdesign</NextLink></li>
                  <li><NextLink href="/standorte/zuerich/seo" className="text-muted-foreground hover:text-foreground">SEO</NextLink></li>
                </ul>
              </Card>
            </div>
          </div>

          {/* International - Dubai */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span>🇦🇪</span>
              {locale === 'de' ? 'International' : locale === 'ru' ? 'Международный' : 'International'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Dubai */}
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <NextLink href="/standorte/dubai" className="block">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">Dubai</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{locale === 'de' ? 'Büro' : 'Office'}</span>
                  </h4>
                </NextLink>
                <p className="text-sm text-muted-foreground">
                  {locale === 'de' ? 'Webdesign, Branding, Digital Marketing für MENA Region' : 'Web Design, Branding, Digital Marketing for MENA Region'}
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {getText('visitUs')}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {getText('visitUsDesc')}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <NextLink href={getContactUrl(locale)}>
              {getText('scheduleAppointment')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </NextLink>
          </Button>
        </Container>
      </section>
    </>
  )
}
