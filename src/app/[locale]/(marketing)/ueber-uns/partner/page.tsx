import { Metadata } from 'next'
import Image from 'next/image'
import NextLink from 'next/link'
import { ArrowRight, ExternalLink, Handshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPartners, type SupportedLocale } from '@/lib/payload'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl, getContactUrl } from '@/lib/utils'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'

  const title = { de: 'Unsere Partner | GoldenWing Creative Studios', en: 'Our Partners | GoldenWing Creative Studios', ru: 'Наши партнёры | GoldenWing Creative Studios' }[locale] || 'Unsere Partner | GoldenWing Creative Studios'
  const description = { de: 'Starke Partnerschaften für starke Ergebnisse – Lernen Sie die Partner von GoldenWing Creative Studios kennen und profitieren Sie von unserem Netzwerk.', en: 'Strong partnerships for strong results – Meet the partners of GoldenWing Creative Studios and benefit from our network.', ru: 'Сильные партнёрства для сильных результатов – Познакомьтесь с партнёрами GoldenWing Creative Studios и воспользуйтесь преимуществами нашей сети.' }[locale] || 'Starke Partnerschaften für starke Ergebnisse – Lernen Sie die Partner von GoldenWing Creative Studios kennen und profitieren Sie von unserem Netzwerk.'
  const hreflangAlternates = getHreflangAlternates('/ueber-uns/partner', locale)

  return {
    title,
    description,
    keywords: { de: ['Agentur Partner Wien', 'GoldenWing Partnerschaften', 'Kreativagentur Netzwerk', 'Design Partner'], en: ['Agency Partners Vienna', 'GoldenWing Partnerships', 'Creative Agency Network', 'Design Partners'], ru: ['Партнёры агентства Вена', 'GoldenWing партнёрства', 'Сеть креативного агентства', 'Дизайн партнёры'] }[locale] || ['Agentur Partner Wien', 'GoldenWing Partnerschaften', 'Kreativagentur Netzwerk', 'Design Partner'],
    openGraph: {
      title,
      description: { de: 'Starke Partnerschaften für starke Ergebnisse – unser Partner-Netzwerk.', en: 'Strong partnerships for strong results – our partner network.', ru: 'Сильные партнёрства для сильных результатов – наша сеть партнёров.' }[locale] || 'Starke Partnerschaften für starke Ergebnisse – unser Partner-Netzwerk.',
    },
    alternates: {
      canonical: getCanonicalUrl('/ueber-uns/partner', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

interface Partner {
  id: string
  name: string
  description?: string
  website?: string
  category?: string
  logo: string
  featured: boolean
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const partners = await getPartners(locale) as Partner[]

  // Schema markup
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: getSchemaUrl('/', locale) },
      { '@type': 'ListItem', position: 2, name: { de: 'Über uns', en: 'About Us', ru: 'О нас' }[locale] || 'Über uns', item: getSchemaUrl('/ueber-uns', locale) },
      { '@type': 'ListItem', position: 3, name: { de: 'Partner', en: 'Partners', ru: 'Партнёры' }[locale] || 'Partner', item: getSchemaUrl('/ueber-uns/partner', locale) },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': { de: 'Unsere Partner - GoldenWing Creative Studios', en: 'Our Partners - GoldenWing Creative Studios', ru: 'Наши партнёры - GoldenWing Creative Studios' }[locale] || 'Unsere Partner - GoldenWing Creative Studios',
    'description': { de: 'Starke Partnerschaften für starke Ergebnisse – Lernen Sie die Partner von GoldenWing Creative Studios kennen und profitieren Sie von unserem Netzwerk.', en: 'Strong partnerships for strong results – Meet the partners of GoldenWing Creative Studios and benefit from our network.', ru: 'Сильные партнёрства для сильных результатов – Познакомьтесь с партнёрами GoldenWing Creative Studios и воспользуйтесь преимуществами нашей сети.' }[locale] || 'Starke Partnerschaften für starke Ergebnisse – Lernen Sie die Partner von GoldenWing Creative Studios kennen und profitieren Sie von unserem Netzwerk.',
    'url': getSchemaUrl('/ueber-uns/partner', locale),
    'publisher': {
      '@type': 'Organization',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
      'logo': 'https://goldenwing.at/logo.png',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Czeikestrasse 4/21',
        'addressLocality': 'Wien',
        'postalCode': '1100',
        'addressCountry': 'AT',
      },
    },
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
    },
  }

  const categoryLabels: Record<string, string> = {
    de: {
      technology: 'Technologie-Partner',
      agency: 'Agentur-Partner',
      strategy: 'Strategie-Partner',
      media: 'Medien-Partner',
      other: 'Sonstige Partner',
    },
    en: {
      technology: 'Technology Partners',
      agency: 'Agency Partners',
      strategy: 'Strategy Partners',
      media: 'Media Partners',
      other: 'Other Partners',
    },
    ru: {
      technology: 'Технологические партнёры',
      agency: 'Агентства-партнёры',
      strategy: 'Стратегические партнёры',
      media: 'Медиа-партнёры',
      other: 'Другие партнёры',
    },
  }[locale] || {
    technology: 'Technologie-Partner',
    agency: 'Agentur-Partner',
    strategy: 'Strategie-Partner',
    media: 'Medien-Partner',
    other: 'Sonstige Partner',
  }

  // Group partners by category
  const partnersByCategory = partners.reduce((acc, partner) => {
    const category = partner.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(partner)
    return acc
  }, {} as Record<string, Partner[]>)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Handshake className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {{ de: 'Unsere Partner', en: 'Our Partners', ru: 'Наши партнёры' }[locale] || 'Unsere Partner'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {{ de: 'Starke Partnerschaften für starke Ergebnisse. Gemeinsam mit unseren Partnern bieten wir unseren Kunden die bestmöglichen Lösungen und Services.', en: 'Strong partnerships for strong results. Together with our partners, we offer our clients the best possible solutions and services.', ru: 'Сильные партнёрства для сильных результатов. Вместе с нашими партнёрами мы предлагаем нашим клиентам лучшие решения и услуги.' }[locale] || 'Starke Partnerschaften für starke Ergebnisse. Gemeinsam mit unseren Partnern bieten wir unseren Kunden die bestmöglichen Lösungen und Services.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Partnership Philosophy */}
      <section className="py-16 bg-muted/50">
        <Container variant="block">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {{ de: 'Zusammen mehr erreichen', en: 'Achieve More Together', ru: 'Вместе достигаем большего' }[locale] || 'Zusammen mehr erreichen'}
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-8 leading-relaxed">
              {{ de: 'Wir glauben an die Kraft von Kooperationen. Unsere Partner ergänzen unsere Expertise und ermöglichen es uns, ein noch breiteres Spektrum an erstklassigen Dienstleistungen anzubieten.', en: 'We believe in the power of collaboration. Our partners complement our expertise and enable us to offer an even broader range of first-class services.', ru: 'Мы верим в силу сотрудничества. Наши партнёры дополняют нашу экспертизу и позволяют нам предлагать ещё более широкий спектр первоклассных услуг.' }[locale] || 'Wir glauben an die Kraft von Kooperationen. Unsere Partner ergänzen unsere Expertise und ermöglichen es uns, ein noch breiteres Spektrum an erstklassigen Dienstleistungen anzubieten.'}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background rounded-xl border p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">
                  {{ de: 'Aktive Partnerschaften', en: 'Active Partnerships', ru: 'Активные партнёрства' }[locale] || 'Aktive Partnerschaften'}
                </div>
              </div>
              <div className="bg-background rounded-xl border p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">
                  {{ de: 'Gemeinsame Projekte', en: 'Joint Projects', ru: 'Совместные проекты' }[locale] || 'Gemeinsame Projekte'}
                </div>
              </div>
              <div className="bg-background rounded-xl border p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">
                  {{ de: 'Zufriedenheitsrate', en: 'Satisfaction Rate', ru: 'Уровень удовлетворённости' }[locale] || 'Zufriedenheitsrate'}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Partners by Category */}
      <section className="py-20">
        <Container variant="block">
          {Object.entries(partnersByCategory).map(([category, categoryPartners]) => (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold mb-8">
                {categoryLabels[category] || ({ de: 'Partner', en: 'Partners', ru: 'Партнёры' }[locale] || 'Partner')}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="group bg-card rounded-xl border p-6 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Logo */}
                    <div className="relative h-24 mb-6 flex items-center justify-center">
                      {partner.logo ? (
                        <div className="relative h-full w-full">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      ) : (
                        <div className="text-2xl font-bold text-muted-foreground">
                          {partner.name}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>

                    {partner.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {partner.description}
                      </p>
                    )}

                    {/* Website Link */}
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                      >
                        {{ de: 'Website besuchen', en: 'Visit Website', ru: 'Посетить сайт' }[locale] || 'Website besuchen'}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {partners.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {{ de: 'Unsere Partnerliste wird in Kürze ergänzt.', en: 'Our partner list will be updated soon.', ru: 'Наш список партнёров скоро будет обновлён.' }[locale] || 'Unsere Partnerliste wird in Kürze ergänzt.'}
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/50">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {{ de: 'Vorteile unseres Partner-Netzwerks', en: 'Benefits of Our Partner Network', ru: 'Преимущества нашей сети партнёров' }[locale] || 'Vorteile unseres Partner-Netzwerks'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {{ de: 'Was unsere Partnerschaften für Sie bedeuten.', en: 'What our partnerships mean for you.', ru: 'Что наши партнёрства значат для вас.' }[locale] || 'Was unsere Partnerschaften für Sie bedeuten.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background rounded-xl border p-6">
              <h3 className="font-semibold mb-2">
                {{ de: 'Erweiterte Expertise', en: 'Extended Expertise', ru: 'Расширенная экспертиза' }[locale] || 'Erweiterte Expertise'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {{ de: 'Zugang zu Spezialwissen und Fachkompetenz in verschiedenen Bereichen.', en: 'Access to specialized knowledge and expertise in various areas.', ru: 'Доступ к специализированным знаниям и экспертизе в различных областях.' }[locale] || 'Zugang zu Spezialwissen und Fachkompetenz in verschiedenen Bereichen.'}
              </p>
            </div>
            <div className="bg-background rounded-xl border p-6">
              <h3 className="font-semibold mb-2">
                {{ de: 'Umfassende Lösungen', en: 'Comprehensive Solutions', ru: 'Комплексные решения' }[locale] || 'Umfassende Lösungen'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {{ de: 'Ganzheitliche Services aus einer Hand durch unser Partner-Netzwerk.', en: 'Holistic services from a single source through our partner network.', ru: 'Комплексные услуги из одного источника благодаря нашей сети партнёров.' }[locale] || 'Ganzheitliche Services aus einer Hand durch unser Partner-Netzwerk.'}
              </p>
            </div>
            <div className="bg-background rounded-xl border p-6">
              <h3 className="font-semibold mb-2">
                {{ de: 'Beste Technologien', en: 'Best Technologies', ru: 'Лучшие технологии' }[locale] || 'Beste Technologien'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {{ de: 'Zugriff auf führende Tools, Plattformen und Technologien.', en: 'Access to leading tools, platforms and technologies.', ru: 'Доступ к ведущим инструментам, платформам и технологиям.' }[locale] || 'Zugriff auf führende Tools, Plattformen und Technologien.'}
              </p>
            </div>
            <div className="bg-background rounded-xl border p-6">
              <h3 className="font-semibold mb-2">
                {{ de: 'Skalierbarkeit', en: 'Scalability', ru: 'Масштабируемость' }[locale] || 'Skalierbarkeit'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {{ de: 'Flexible Ressourcen für Projekte jeder Größe und Komplexität.', en: 'Flexible resources for projects of any size and complexity.', ru: 'Гибкие ресурсы для проектов любого размера и сложности.' }[locale] || 'Flexible Ressourcen für Projekte jeder Größe und Komplexität.'}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Become a Partner */}
      <section className="py-20">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'Partner werden?', en: 'Become a Partner?', ru: 'Стать партнёром?' }[locale] || 'Partner werden?'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {{ de: 'Wir sind immer auf der Suche nach starken Partnern, die unsere Werte teilen und gemeinsam mit uns wachsen möchten. Lassen Sie uns über eine mögliche Zusammenarbeit sprechen.', en: 'We are always looking for strong partners who share our values and want to grow with us. Let\'s talk about a potential collaboration.', ru: 'Мы всегда ищем сильных партнёров, которые разделяют наши ценности и хотят расти вместе с нами. Давайте обсудим возможное сотрудничество.' }[locale] || 'Wir sind immer auf der Suche nach starken Partnern, die unsere Werte teilen und gemeinsam mit uns wachsen möchten. Lassen Sie uns über eine mögliche Zusammenarbeit sprechen.'}
            </p>
            <Button size="lg" asChild>
              <NextLink href={getContactUrl(locale)}>
                {{ de: 'Partnerschaft anfragen', en: 'Request Partnership', ru: 'Запросить партнёрство' }[locale] || 'Partnerschaft anfragen'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {{ de: 'Bereit für Ihr Projekt?', en: 'Ready for Your Project?', ru: 'Готовы к вашему проекту?' }[locale] || 'Bereit für Ihr Projekt?'}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {{ de: 'Profitieren Sie von unserem starken Netzwerk und unserer umfassenden Expertise. Lassen Sie uns gemeinsam Großes schaffen.', en: 'Benefit from our strong network and comprehensive expertise. Let\'s create something great together.', ru: 'Воспользуйтесь преимуществами нашей сильной сети и обширной экспертизы. Давайте вместе создадим что-то великое.' }[locale] || 'Profitieren Sie von unserem starken Netzwerk und unserer umfassenden Expertise. Lassen Sie uns gemeinsam Großes schaffen.'}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <NextLink href={getContactUrl(locale)}>
              {{ de: 'Projekt starten', en: 'Start Project', ru: 'Начать проект' }[locale] || 'Projekt starten'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </NextLink>
          </Button>
        </Container>
      </section>
    </>
  )
}
