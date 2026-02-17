import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, CheckCircle, Phone, Globe, MapPin, FileText, BarChart3, Target, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Container } from '@/components/ui/container'
import { FAQSchema, BreadcrumbListSchema } from '@/components/seo/json-ld'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const pageData = {
  de: {
    meta: {
      title: 'SEO Agentur Sharjah | Suchmaschinenoptimierung VAE | GoldenWing',
      description: 'Professionelle SEO Agentur in Sharjah. Wir verbessern Ihre Google-Rankings in den VAE. ✓ Local SEO ✓ Arabisches SEO ✓ Content Marketing ✓ Technical SEO',
      keywords: ['seo agentur sharjah', 'seo sharjah', 'suchmaschinenoptimierung sharjah', 'google ranking sharjah'],
    },
    hero: {
      badge: 'SEO Agentur Sharjah',
      title: 'SEO Agentur für Sharjah',
      subtitle: 'Bessere Rankings. Mehr Traffic. Mehr Kunden.',
      description: 'GoldenWing ist Ihre SEO-Agentur für nachhaltige Suchmaschinenoptimierung in Sharjah. Wir verstehen den lokalen Markt und bringen Ihr Unternehmen auf Seite 1.',
      ctaPrimary: 'Kostenloses SEO-Audit',
      ctaSecondary: 'Referenzen ansehen',
    },
    services: {
      title: 'Unsere SEO Services',
      items: [
        { icon: MapPin, title: 'Local SEO Sharjah', description: 'Optimierung für lokale Suchanfragen in Sharjah und den VAE.' },
        { icon: Globe, title: 'Arabisches SEO', description: 'SEO für arabische Keywords mit kulturellem Verständnis.' },
        { icon: FileText, title: 'Content SEO', description: 'Strategische Content-Erstellung für bessere Rankings.' },
        { icon: Zap, title: 'Technical SEO', description: 'Technische Optimierung für maximale Performance.' },
        { icon: BarChart3, title: 'SEO Analytics', description: 'Detailliertes Tracking und Reporting Ihrer Erfolge.' },
        { icon: Target, title: 'Keyword Research', description: 'Recherche der profitabelsten Keywords für Ihren Markt.' },
      ],
    },
    pricing: {
      title: 'SEO Pakete für Sharjah',
      packages: [
        { name: 'Starter', price: 'AED 3.500/Monat', description: 'Für kleine Unternehmen', features: ['10 Keywords', 'On-Page Optimierung', 'Monatliches Reporting', 'Google Business Profile', 'Local Citations'] },
        { name: 'Growth', price: 'AED 7.500/Monat', description: 'Für wachsende Unternehmen', features: ['25 Keywords', 'Technical SEO Audit', 'Content-Erstellung (2/Monat)', 'Link Building', 'Bi-Weekly Calls', 'Competitor Analysis'], popular: true },
        { name: 'Enterprise', price: 'Auf Anfrage', description: 'Für große Unternehmen', features: ['Unbegrenzte Keywords', 'Full Technical SEO', 'Content-Strategie', 'Aggressive Link Building', 'Dedicated SEO Manager', 'Arabic & English SEO'] },
      ],
    },
    results: {
      title: 'Unsere Ergebnisse',
      stats: [
        { value: '150%', label: 'Durchschnittliche Traffic-Steigerung' },
        { value: '85%', label: 'Kunden auf Seite 1' },
        { value: '3x', label: 'ROI im ersten Jahr' },
        { value: '50+', label: 'VAE Projekte' },
      ],
    },
    faqs: [
      { question: 'Wie lange dauert es, bis SEO Ergebnisse zeigt?', answer: 'SEO ist eine langfristige Investition. Erste Verbesserungen sehen Sie typischerweise nach 3-4 Monaten, signifikante Ergebnisse nach 6-12 Monaten. Local SEO kann schnellere Ergebnisse liefern.' },
      { question: 'Optimieren Sie auch für arabische Keywords?', answer: 'Ja, wir bieten vollständiges arabisches SEO an. Unser Team versteht die Nuancen arabischer Suchanfragen und optimiert entsprechend.' },
      { question: 'Was unterscheidet SEO in Sharjah von anderen Märkten?', answer: 'Sharjah hat eine einzigartige Mischung aus Bildungs-, Kultur- und Industriesektor. Wir verstehen diese lokalen Besonderheiten und passen unsere Strategie entsprechend an.' },
      { question: 'Bieten Sie SEO Audits an?', answer: 'Ja, wir bieten kostenlose SEO-Audits für Unternehmen in Sharjah an. Dabei analysieren wir Ihre Website und zeigen Optimierungspotentiale auf.' },
      { question: 'Welche SEO-Tools verwenden Sie?', answer: 'Wir nutzen professionelle Tools wie Ahrefs, SEMrush, Screaming Frog und Google Search Console für umfassende Analysen und Tracking.' },
    ],
    cta: {
      title: 'Bereit für bessere Rankings?',
      description: 'Holen Sie sich Ihr kostenloses SEO-Audit für Sharjah.',
      button: 'Kostenloses Audit anfordern',
    },
  },
  en: {
    meta: {
      title: 'SEO Agency Sharjah | Search Engine Optimization UAE | GoldenWing',
      description: 'Professional SEO agency in Sharjah. We improve your Google rankings in the UAE. ✓ Local SEO ✓ Arabic SEO ✓ Content Marketing ✓ Technical SEO',
      keywords: ['seo agency sharjah', 'seo sharjah', 'search engine optimization sharjah', 'google ranking sharjah'],
    },
    hero: {
      badge: 'SEO Agency Sharjah',
      title: 'SEO Agency for Sharjah',
      subtitle: 'Better Rankings. More Traffic. More Customers.',
      description: 'GoldenWing is your SEO agency for sustainable search engine optimization in Sharjah. We understand the local market and get your business to page 1.',
      ctaPrimary: 'Get Free SEO Audit',
      ctaSecondary: 'View Case Studies',
    },
    services: {
      title: 'Our SEO Services',
      items: [
        { icon: MapPin, title: 'Local SEO Sharjah', description: 'Optimization for local searches in Sharjah and the UAE.' },
        { icon: Globe, title: 'Arabic SEO', description: 'SEO for Arabic keywords with cultural understanding.' },
        { icon: FileText, title: 'Content SEO', description: 'Strategic content creation for better rankings.' },
        { icon: Zap, title: 'Technical SEO', description: 'Technical optimization for maximum performance.' },
        { icon: BarChart3, title: 'SEO Analytics', description: 'Detailed tracking and reporting of your success.' },
        { icon: Target, title: 'Keyword Research', description: 'Research of the most profitable keywords for your market.' },
      ],
    },
    pricing: {
      title: 'SEO Packages for Sharjah',
      packages: [
        { name: 'Starter', price: 'AED 3,500/month', description: 'For small businesses', features: ['10 keywords', 'On-page optimization', 'Monthly reporting', 'Google Business Profile', 'Local citations'] },
        { name: 'Growth', price: 'AED 7,500/month', description: 'For growing businesses', features: ['25 keywords', 'Technical SEO audit', 'Content creation (2/month)', 'Link building', 'Bi-weekly calls', 'Competitor analysis'], popular: true },
        { name: 'Enterprise', price: 'On Request', description: 'For large businesses', features: ['Unlimited keywords', 'Full technical SEO', 'Content strategy', 'Aggressive link building', 'Dedicated SEO manager', 'Arabic & English SEO'] },
      ],
    },
    results: {
      title: 'Our Results',
      stats: [
        { value: '150%', label: 'Average traffic increase' },
        { value: '85%', label: 'Clients on page 1' },
        { value: '3x', label: 'ROI in first year' },
        { value: '50+', label: 'UAE projects' },
      ],
    },
    faqs: [
      { question: 'How long does it take for SEO to show results?', answer: 'SEO is a long-term investment. You typically see first improvements after 3-4 months, significant results after 6-12 months. Local SEO can deliver faster results.' },
      { question: 'Do you optimize for Arabic keywords?', answer: 'Yes, we offer complete Arabic SEO. Our team understands the nuances of Arabic search queries and optimizes accordingly.' },
      { question: 'What makes SEO in Sharjah different from other markets?', answer: 'Sharjah has a unique mix of education, culture, and industrial sectors. We understand these local particularities and adapt our strategy accordingly.' },
      { question: 'Do you offer SEO audits?', answer: 'Yes, we offer free SEO audits for businesses in Sharjah. We analyze your website and show optimization potentials.' },
      { question: 'What SEO tools do you use?', answer: 'We use professional tools like Ahrefs, SEMrush, Screaming Frog, and Google Search Console for comprehensive analysis and tracking.' },
    ],
    cta: {
      title: 'Ready for Better Rankings?',
      description: 'Get your free SEO audit for Sharjah.',
      button: 'Request Free Audit',
    },
  },
  ru: {
    meta: {
      title: 'SEO Агентство Шарджа | Поисковая Оптимизация ОАЭ | GoldenWing',
      description: 'Профессиональное SEO агентство в Шардже. Мы улучшаем ваши позиции в Google в ОАЭ. ✓ Локальное SEO ✓ Арабское SEO ✓ Контент-маркетинг ✓ Техническое SEO',
      keywords: ['seo агентство шарджа', 'seo шарджа', 'поисковая оптимизация шарджа', 'google рейтинг шарджа'],
    },
    hero: {
      badge: 'SEO Агентство Шарджа',
      title: 'SEO Агентство для Шарджи',
      subtitle: 'Лучшие позиции. Больше трафика. Больше клиентов.',
      description: 'GoldenWing — ваше SEO-агентство для устойчивой поисковой оптимизации в Шардже. Мы понимаем местный рынок и выводим ваш бизнес на первую страницу.',
      ctaPrimary: 'Бесплатный SEO-аудит',
      ctaSecondary: 'Смотреть кейсы',
    },
    services: {
      title: 'Наши SEO услуги',
      items: [
        { icon: MapPin, title: 'Локальное SEO Шарджа', description: 'Оптимизация для локальных поисковых запросов в Шардже и ОАЭ.' },
        { icon: Globe, title: 'Арабское SEO', description: 'SEO для арабских ключевых слов с учетом культурных особенностей.' },
        { icon: FileText, title: 'Контентное SEO', description: 'Стратегическое создание контента для улучшения позиций.' },
        { icon: Zap, title: 'Техническое SEO', description: 'Техническая оптимизация для максимальной производительности.' },
        { icon: BarChart3, title: 'SEO Аналитика', description: 'Детальное отслеживание и отчетность о ваших успехах.' },
        { icon: Target, title: 'Исследование ключевых слов', description: 'Исследование наиболее прибыльных ключевых слов для вашего рынка.' },
      ],
    },
    pricing: {
      title: 'SEO Пакеты для Шарджи',
      packages: [
        { name: 'Starter', price: 'AED 3 500/месяц', description: 'Для малого бизнеса', features: ['10 ключевых слов', 'On-page оптимизация', 'Ежемесячные отчеты', 'Google Business Profile', 'Локальные упоминания'] },
        { name: 'Growth', price: 'AED 7 500/месяц', description: 'Для растущего бизнеса', features: ['25 ключевых слов', 'Технический SEO аудит', 'Создание контента (2/месяц)', 'Линкбилдинг', 'Звонки дважды в неделю', 'Анализ конкурентов'], popular: true },
        { name: 'Enterprise', price: 'По запросу', description: 'Для крупного бизнеса', features: ['Неограниченные ключевые слова', 'Полное техническое SEO', 'Контент-стратегия', 'Агрессивный линкбилдинг', 'Выделенный SEO-менеджер', 'Арабское и английское SEO'] },
      ],
    },
    results: {
      title: 'Наши результаты',
      stats: [
        { value: '150%', label: 'Средний рост трафика' },
        { value: '85%', label: 'Клиентов на первой странице' },
        { value: '3x', label: 'ROI в первый год' },
        { value: '50+', label: 'Проектов в ОАЭ' },
      ],
    },
    faqs: [
      { question: 'Сколько времени нужно, чтобы SEO показало результаты?', answer: 'SEO — это долгосрочная инвестиция. Обычно вы видите первые улучшения через 3-4 месяца, значительные результаты — через 6-12 месяцев. Локальное SEO может дать более быстрые результаты.' },
      { question: 'Вы оптимизируете для арабских ключевых слов?', answer: 'Да, мы предлагаем полное арабское SEO. Наша команда понимает нюансы арабских поисковых запросов и оптимизирует соответственно.' },
      { question: 'Чем SEO в Шардже отличается от других рынков?', answer: 'Шарджа имеет уникальное сочетание образовательного, культурного и промышленного секторов. Мы понимаем эти местные особенности и адаптируем нашу стратегию соответственно.' },
      { question: 'Вы предлагаете SEO аудиты?', answer: 'Да, мы предлагаем бесплатные SEO-аудиты для бизнеса в Шардже. Мы анализируем ваш сайт и показываем потенциал для оптимизации.' },
      { question: 'Какие SEO-инструменты вы используете?', answer: 'Мы используем профессиональные инструменты, такие как Ahrefs, SEMrush, Screaming Frog и Google Search Console для комплексного анализа и отслеживания.' },
    ],
    cta: {
      title: 'Готовы к лучшим позициям?',
      description: 'Получите бесплатный SEO-аудит для Шарджи.',
      button: 'Запросить бесплатный аудит',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/sharjah/seo-sharjah', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/sharjah/seo-sharjah', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: locale === 'de' ? 'de_AT' : locale === 'ru' ? 'ru_RU' : 'en_AE',
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl('/sharjah/seo-sharjah', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SEOSharjahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const _isEn = locale === 'en'
  const _isRu = locale === 'ru'

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: '/' },
    { name: { de: 'Sharjah', en: 'Sharjah', ru: 'Шарджа' }[locale], url: '/sharjah' },
    { name: 'SEO', url: '/sharjah/seo-sharjah' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.hero.title,
    description: data.meta.description,
    url: `https://goldenwing.at/${locale}/sharjah/seo-sharjah`,
    provider: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'DAMAC Executive Bay Tower B, Office 1406',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Sharjah',
      containedInPlace: {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
    },
    serviceType: { de: 'Suchmaschinenoptimierung', en: 'SEO', ru: 'Поисковая оптимизация' }[locale],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FAQSchema items={data.faqs} />
      <BreadcrumbListSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50/50 to-background dark:from-[#0a0a0a]/20">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-muted text-foreground dark:bg-[#0a0a0a] dark:text-gold">{data.hero.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {data.hero.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-foreground dark:text-foreground mb-4">
              {data.hero.subtitle}
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              {data.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/kontakt">
                  {data.hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/referenzen">
                  {data.hero.ctaSecondary}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-16 bg-primary text-white">
        <Container variant="block">
          <h2 className="text-2xl font-bold mb-8 text-center">{data.results.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.results.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.services.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.items.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow hover:border-border dark:hover:border-primary">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-muted dark:bg-[#0a0a0a]/50 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-foreground dark:text-foreground" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.pricing.title}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.pricing.packages.map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-primary shadow-lg' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    {{ de: 'Beliebteste Wahl', en: 'Most Popular', ru: 'Самый популярный' }[locale]}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-foreground dark:text-foreground mt-2">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-foreground dark:text-foreground shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-6 ${pkg.popular ? 'bg-primary hover:bg-primary/90' : ''}`} variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <Link href="/kontakt">
                      {{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale]}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {{ de: 'Häufig gestellte Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale]}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {data.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.cta.title}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{data.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/kontakt">
                {data.cta.button}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10" asChild>
              <NextLink href="tel:+436645439681">
                <Phone className="mr-2 h-4 w-4" />
                +43 664 543 96 81
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* Related Links */}
      <section className="py-12 border-t">
        <Container variant="block">
          <h3 className="font-semibold mb-6">{{ de: 'Verwandte Services', en: 'Related Services', ru: 'Связанные услуги' }[locale]}</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/sharjah" className="text-muted-foreground hover:text-foreground">
              {{ de: 'Alle Sharjah Services', en: 'All Sharjah Services', ru: 'Все услуги в Шардже' }[locale]}
            </Link>
            <NextLink href={`/${locale}/sharjah/web-design-sharjah`} className="text-muted-foreground hover:text-foreground">
              {{ de: 'Webdesign Sharjah', en: 'Web Design Sharjah', ru: 'Веб-дизайн Шарджа' }[locale]}
            </NextLink>
            <NextLink href={`/${locale}/sharjah/digital-marketing-sharjah`} className="text-muted-foreground hover:text-foreground">
              Digital Marketing Sharjah
            </NextLink>
            <Link href="/dubai/seo-company-dubai" className="text-muted-foreground hover:text-foreground">
              SEO Dubai
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
