import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, CheckCircle, Palette, Layers, FileText, Eye, PenTool, Lightbulb, MessageCircle } from 'lucide-react'
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
import { ProcessLargeNumber } from '@/components/process-sections/ProcessLargeNumber'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const pageData = {
  de: {
    meta: {
      title: 'Branding Agentur Sharjah | Markenentwicklung VAE | GoldenWing',
      description: 'Professionelle Branding Agentur in Sharjah. Wir entwickeln einzigartige Markenidentitäten mit kulturellem Verständnis. ✓ Logo Design ✓ Corporate Identity ✓ Brand Guidelines',
      keywords: ['branding agentur sharjah', 'markenentwicklung sharjah', 'logo design sharjah', 'corporate identity sharjah'],
    },
    hero: {
      badge: 'Branding Agentur Sharjah',
      title: 'Branding Agentur für Sharjah',
      subtitle: 'Starke Marken. Kulturelles Feingefühl. Bleibender Eindruck.',
      description: 'GoldenWing entwickelt Markenidentitäten, die im kulturellen Zentrum der VAE resonieren. Wir verbinden europäische Design-Exzellenz mit lokalem Marktverständnis.',
      ctaPrimary: 'Kostenlose Beratung',
      ctaSecondary: 'Portfolio ansehen',
    },
    services: {
      title: 'Unsere Branding Services',
      items: [
        { icon: Lightbulb, title: 'Markenstrategie', description: 'Strategische Positionierung Ihrer Marke im Sharjah Markt.' },
        { icon: PenTool, title: 'Logo Design', description: 'Einzigartige Logos, die Ihre Marke unverwechselbar machen.' },
        { icon: Palette, title: 'Visual Identity', description: 'Konsistente visuelle Sprache für alle Touchpoints.' },
        { icon: FileText, title: 'Brand Guidelines', description: 'Umfassende Richtlinien für einheitliche Markenkommunikation.' },
        { icon: Layers, title: 'Corporate Design', description: 'Geschäftsausstattung, Visitenkarten, Präsentationen.' },
        { icon: Eye, title: 'Rebranding', description: 'Modernisierung bestehender Marken für neue Märkte.' },
      ],
    },
    pricing: {
      title: 'Branding Pakete für Sharjah',
      packages: [
        { name: 'Starter', price: 'AED 8.000', description: 'Für Startups und kleine Unternehmen', features: ['Logo Design (3 Konzepte)', 'Farbpalette', 'Typografie', 'Basis-Guidelines', 'Visitenkarten-Design'] },
        { name: 'Business', price: 'AED 18.000', description: 'Für etablierte Unternehmen', features: ['Markenstrategie Workshop', 'Logo Design (5 Konzepte)', 'Full Visual Identity', 'Brand Guidelines (20+ Seiten)', 'Geschäftsausstattung', 'Social Media Templates'], popular: true },
        { name: 'Enterprise', price: 'Auf Anfrage', description: 'Für große Organisationen', features: ['Umfassende Markenanalyse', 'Wettbewerberanalyse', 'Multi-Brand Architecture', 'Arabic & English Versions', 'Implementierungs-Support', 'Brand Training Workshops'] },
      ],
    },
    process: {
      title: 'Unser Branding Prozess',
      steps: [
        { step: '01', title: 'Discovery', description: 'Wir verstehen Ihr Unternehmen, Ihre Ziele und Ihren Markt.' },
        { step: '02', title: 'Strategie', description: 'Entwicklung der Markenpositionierung und -persönlichkeit.' },
        { step: '03', title: 'Design', description: 'Kreative Umsetzung der visuellen Identität.' },
        { step: '04', title: 'Implementierung', description: 'Rollout und Training für konsistente Anwendung.' },
      ],
    },
    faqs: [
      { question: 'Wie lange dauert ein Branding-Projekt?', answer: 'Ein typisches Branding-Projekt dauert 4-8 Wochen, abhängig vom Umfang. Ein einfaches Logo-Design kann in 2 Wochen abgeschlossen werden, während ein umfassendes Corporate Branding 12+ Wochen dauern kann.' },
      { question: 'Verstehen Sie die kulturellen Anforderungen in Sharjah?', answer: 'Ja, absolut. Sharjah ist bekannt als das kulturelle Zentrum der VAE. Wir respektieren die kulturellen Werte und gestalten Marken, die authentisch und respektvoll sind.' },
      { question: 'Können Sie zweisprachige Markenidentitäten erstellen?', answer: 'Ja, wir entwickeln Markenidentitäten, die sowohl auf Englisch als auch auf Arabisch funktionieren, mit korrekter RTL-Typografie und kulturell angemessener Bildsprache.' },
      { question: 'Was beinhalten Brand Guidelines?', answer: 'Unsere Brand Guidelines umfassen Logo-Nutzung, Farbpalette, Typografie, Bildsprache, Tone of Voice, Social Media Guidelines und praktische Anwendungsbeispiele.' },
      { question: 'Bieten Sie auch Rebranding an?', answer: 'Ja, wir helfen Unternehmen, ihre bestehende Marke zu modernisieren und für neue Märkte zu positionieren, ohne die Markenhistorie zu verlieren.' },
    ],
    cta: {
      title: 'Bereit für eine starke Marke?',
      description: 'Lassen Sie uns über Ihr Branding-Projekt in Sharjah sprechen.',
      button: 'Kostenlose Beratung',
    },
  },
  en: {
    meta: {
      title: 'Branding Agency Sharjah | Brand Development UAE | GoldenWing',
      description: 'Professional branding agency in Sharjah. We develop unique brand identities with cultural understanding. ✓ Logo Design ✓ Corporate Identity ✓ Brand Guidelines',
      keywords: ['branding agency sharjah', 'brand development sharjah', 'logo design sharjah', 'corporate identity sharjah'],
    },
    hero: {
      badge: 'Branding Agency Sharjah',
      title: 'Branding Agency for Sharjah',
      subtitle: 'Strong Brands. Cultural Sensitivity. Lasting Impressions.',
      description: 'GoldenWing develops brand identities that resonate in the cultural capital of the UAE. We combine European design excellence with local market understanding.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'View Portfolio',
    },
    services: {
      title: 'Our Branding Services',
      items: [
        { icon: Lightbulb, title: 'Brand Strategy', description: 'Strategic positioning of your brand in the Sharjah market.' },
        { icon: PenTool, title: 'Logo Design', description: 'Unique logos that make your brand unmistakable.' },
        { icon: Palette, title: 'Visual Identity', description: 'Consistent visual language across all touchpoints.' },
        { icon: FileText, title: 'Brand Guidelines', description: 'Comprehensive guidelines for uniform brand communication.' },
        { icon: Layers, title: 'Corporate Design', description: 'Business stationery, business cards, presentations.' },
        { icon: Eye, title: 'Rebranding', description: 'Modernization of existing brands for new markets.' },
      ],
    },
    pricing: {
      title: 'Branding Packages for Sharjah',
      packages: [
        { name: 'Starter', price: 'AED 8,000', description: 'For startups and small businesses', features: ['Logo design (3 concepts)', 'Color palette', 'Typography', 'Basic guidelines', 'Business card design'] },
        { name: 'Business', price: 'AED 18,000', description: 'For established businesses', features: ['Brand strategy workshop', 'Logo design (5 concepts)', 'Full visual identity', 'Brand guidelines (20+ pages)', 'Business stationery', 'Social media templates'], popular: true },
        { name: 'Enterprise', price: 'On Request', description: 'For large organizations', features: ['Comprehensive brand analysis', 'Competitor analysis', 'Multi-brand architecture', 'Arabic & English versions', 'Implementation support', 'Brand training workshops'] },
      ],
    },
    process: {
      title: 'Our Branding Process',
      steps: [
        { step: '01', title: 'Discovery', description: 'We understand your business, goals, and market.' },
        { step: '02', title: 'Strategy', description: 'Development of brand positioning and personality.' },
        { step: '03', title: 'Design', description: 'Creative implementation of visual identity.' },
        { step: '04', title: 'Implementation', description: 'Rollout and training for consistent application.' },
      ],
    },
    faqs: [
      { question: 'How long does a branding project take?', answer: 'A typical branding project takes 4-8 weeks, depending on scope. A simple logo design can be completed in 2 weeks, while comprehensive corporate branding may take 12+ weeks.' },
      { question: 'Do you understand the cultural requirements in Sharjah?', answer: 'Yes, absolutely. Sharjah is known as the cultural capital of the UAE. We respect cultural values and create brands that are authentic and respectful.' },
      { question: 'Can you create bilingual brand identities?', answer: 'Yes, we develop brand identities that work in both English and Arabic, with proper RTL typography and culturally appropriate imagery.' },
      { question: 'What do brand guidelines include?', answer: 'Our brand guidelines include logo usage, color palette, typography, imagery, tone of voice, social media guidelines, and practical application examples.' },
      { question: 'Do you offer rebranding services?', answer: 'Yes, we help companies modernize their existing brand and position it for new markets without losing brand heritage.' },
    ],
    cta: {
      title: 'Ready for a Strong Brand?',
      description: "Let's discuss your branding project in Sharjah.",
      button: 'Get Free Consultation',
    },
  },
  ru: {
    meta: {
      title: 'Брендинговое агентство Шарджа | Разработка бренда ОАЭ | GoldenWing',
      description: 'Профессиональное брендинговое агентство в Шардже. Мы создаем уникальную идентичность бренда с учетом культурных особенностей. ✓ Дизайн логотипа ✓ Корпоративный стиль ✓ Брендбук',
      keywords: ['брендинговое агентство шарджа', 'разработка бренда шарджа', 'дизайн логотипа шарджа', 'корпоративный стиль шарджа'],
    },
    hero: {
      badge: 'Брендинговое агентство Шарджа',
      title: 'Брендинговое агентство в Шардже',
      subtitle: 'Сильные бренды. Культурная чуткость. Неизгладимое впечатление.',
      description: 'GoldenWing разрабатывает идентичность брендов, которые находят отклик в культурной столице ОАЭ. Мы сочетаем европейское дизайнерское мастерство с пониманием местного рынка.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть портфолио',
    },
    services: {
      title: 'Наши услуги брендинга',
      items: [
        { icon: Lightbulb, title: 'Стратегия бренда', description: 'Стратегическое позиционирование вашего бренда на рынке Шарджи.' },
        { icon: PenTool, title: 'Дизайн логотипа', description: 'Уникальные логотипы, которые делают ваш бренд узнаваемым.' },
        { icon: Palette, title: 'Визуальная идентичность', description: 'Единый визуальный язык на всех точках контакта.' },
        { icon: FileText, title: 'Брендбук', description: 'Комплексные руководства для единообразной коммуникации бренда.' },
        { icon: Layers, title: 'Корпоративный дизайн', description: 'Деловая документация, визитки, презентации.' },
        { icon: Eye, title: 'Ребрендинг', description: 'Модернизация существующих брендов для новых рынков.' },
      ],
    },
    pricing: {
      title: 'Пакеты брендинга для Шарджи',
      packages: [
        { name: 'Starter', price: 'AED 8 000', description: 'Для стартапов и малого бизнеса', features: ['Дизайн логотипа (3 концепции)', 'Цветовая палитра', 'Типографика', 'Базовые рекомендации', 'Дизайн визитных карточек'] },
        { name: 'Business', price: 'AED 18 000', description: 'Для устоявшегося бизнеса', features: ['Воркшоп по стратегии бренда', 'Дизайн логотипа (5 концепций)', 'Полная визуальная идентичность', 'Брендбук (20+ страниц)', 'Деловая документация', 'Шаблоны для соцсетей'], popular: true },
        { name: 'Enterprise', price: 'По запросу', description: 'Для крупных организаций', features: ['Комплексный анализ бренда', 'Анализ конкурентов', 'Мультибрендовая архитектура', 'Арабская и английская версии', 'Поддержка внедрения', 'Тренинги по бренду'] },
      ],
    },
    process: {
      title: 'Наш процесс брендинга',
      steps: [
        { step: '01', title: 'Исследование', description: 'Мы изучаем ваш бизнес, цели и рынок.' },
        { step: '02', title: 'Стратегия', description: 'Разработка позиционирования и характера бренда.' },
        { step: '03', title: 'Дизайн', description: 'Креативная реализация визуальной идентичности.' },
        { step: '04', title: 'Внедрение', description: 'Запуск и обучение для последовательного применения.' },
      ],
    },
    faqs: [
      { question: 'Сколько времени занимает проект по брендингу?', answer: 'Типичный проект по брендингу занимает 4-8 недель в зависимости от объема. Простой дизайн логотипа может быть выполнен за 2 недели, тогда как комплексный корпоративный брендинг может занять 12+ недель.' },
      { question: 'Вы понимаете культурные требования в Шардже?', answer: 'Да, безусловно. Шарджа известна как культурная столица ОАЭ. Мы уважаем культурные ценности и создаем бренды, которые являются аутентичными и уважительными.' },
      { question: 'Можете ли вы создать двуязычную идентичность бренда?', answer: 'Да, мы разрабатываем идентичность брендов, которая работает как на английском, так и на арабском языке, с правильной RTL-типографикой и культурно соответствующими изображениями.' },
      { question: 'Что включает брендбук?', answer: 'Наш брендбук включает правила использования логотипа, цветовую палитру, типографику, стиль изображений, тон коммуникации, рекомендации для соцсетей и практические примеры применения.' },
      { question: 'Вы предлагаете услуги ребрендинга?', answer: 'Да, мы помогаем компаниям модернизировать их существующий бренд и позиционировать его для новых рынков, не теряя наследие бренда.' },
    ],
    cta: {
      title: 'Готовы к сильному бренду?',
      description: 'Давайте обсудим ваш проект по брендингу в Шардже.',
      button: 'Бесплатная консультация',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/sharjah/branding-sharjah', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/sharjah/branding-sharjah', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: { de: 'de_AT', en: 'en_AE', ru: 'ru_RU' }[locale],
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl('/sharjah/branding-sharjah', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function BrandingSharjahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const _isEn = locale === 'en'
  const _isRu = locale === 'ru'

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: '/' },
    { name: { de: 'Sharjah', en: 'Sharjah', ru: 'Шарджа' }[locale], url: '/sharjah' },
    { name: { de: 'Branding', en: 'Branding', ru: 'Брендинг' }[locale], url: '/sharjah/branding-sharjah' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.hero.title,
    description: data.meta.description,
    url: `https://goldenwing.at/${locale}/sharjah/branding-sharjah`,
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
    serviceType: { de: 'Markenentwicklung', en: 'Branding', ru: 'Брендинг' }[locale],
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

      {/* Process - ProcessLargeNumber Layout */}
      <ProcessLargeNumber
        title={data.process.title}
        subtitle={{ de: 'Unsere bewährte Methodik für starke Marken.', en: 'Our proven methodology for building strong brands.', ru: 'Наша проверенная методология создания сильных брендов.' }[locale]}
        steps={data.process.steps.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
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
              <NextLink href="https://wa.me/message/DTMCVZBIQJ3FH1" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
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
            <Link href="/dubai/branding-agency-dubai" className="text-muted-foreground hover:text-foreground">
              {{ de: 'Branding Dubai', en: 'Branding Dubai', ru: 'Брендинг Дубай' }[locale]}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
