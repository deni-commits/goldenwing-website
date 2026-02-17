import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, CheckCircle, Target, Users, Mail, Video, BarChart3, Phone, MessageCircle, Search } from 'lucide-react'
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
      title: 'Digital Marketing Agentur Sharjah | Online Marketing VAE | GoldenWing',
      description: 'Digital Marketing Agentur in Sharjah. Google Ads, Social Media Marketing, Content Marketing für den UAE Markt. ✓ ROI-fokussiert ✓ Mehrsprachig ✓ Datengetrieben',
      keywords: ['digital marketing sharjah', 'online marketing sharjah', 'social media marketing sharjah', 'google ads sharjah'],
    },
    hero: {
      badge: 'Digital Marketing Sharjah',
      title: 'Digital Marketing Agentur für Sharjah',
      subtitle: 'Mehr Reichweite. Mehr Leads. Mehr Umsatz.',
      description: 'GoldenWing ist Ihre Digital Marketing Agentur für den Sharjah Markt. Wir kombinieren europäische Marketing-Expertise mit lokalem Marktverständnis.',
      ctaPrimary: 'Kostenlose Strategie-Session',
      ctaSecondary: 'Referenzen ansehen',
    },
    services: {
      title: 'Unsere Digital Marketing Services',
      items: [
        { icon: Target, title: 'Google Ads', description: 'PPC-Kampagnen für Google.ae mit optimiertem ROI.' },
        { icon: Users, title: 'Social Media Marketing', description: 'Instagram, LinkedIn, TikTok Marketing für UAE Zielgruppen.' },
        { icon: Search, title: 'SEO', description: 'Suchmaschinenoptimierung für arabische und englische Keywords.' },
        { icon: Mail, title: 'Email Marketing', description: 'Personalisierte E-Mail-Kampagnen mit hohen Conversion-Rates.' },
        { icon: Video, title: 'Video Marketing', description: 'YouTube Ads und Video-Content für Social Media.' },
        { icon: BarChart3, title: 'Analytics & Reporting', description: 'Transparentes Tracking und datengetriebene Optimierung.' },
      ],
    },
    pricing: {
      title: 'Digital Marketing Pakete für Sharjah',
      packages: [
        { name: 'Starter', price: 'AED 5.000/Monat', description: 'Für kleine Unternehmen', features: ['1 Kanal (Google oder Social)', 'Bis zu AED 5.000 Ad Spend', 'Monatliches Reporting', 'Basis-Optimierung', 'Email Support'] },
        { name: 'Growth', price: 'AED 12.000/Monat', description: 'Für wachsende Unternehmen', features: ['Multi-Channel Marketing', 'Bis zu AED 15.000 Ad Spend', 'Bi-Weekly Reporting', 'A/B Testing', 'Landing Page Optimierung', 'Dedicated Account Manager'], popular: true },
        { name: 'Enterprise', price: 'Auf Anfrage', description: 'Für große Unternehmen', features: ['Full-Funnel Marketing', 'Unbegrenzter Ad Spend', 'Real-Time Dashboard', 'Marketing Automation', 'Arabic & English Campaigns', 'C-Level Reporting'] },
      ],
    },
    results: {
      title: 'Unsere Ergebnisse',
      stats: [
        { value: '300%', label: 'Durchschnittlicher ROAS' },
        { value: '-45%', label: 'Niedrigerer CPA' },
        { value: '2.5x', label: 'Mehr Qualified Leads' },
        { value: '50+', label: 'VAE Kunden' },
      ],
    },
    faqs: [
      { question: 'Welche Plattformen nutzen Sie für Digital Marketing?', answer: 'Wir nutzen Google Ads, Meta (Facebook/Instagram), LinkedIn, TikTok, YouTube und lokale Plattformen je nach Zielgruppe. Für den Sharjah Markt empfehlen wir oft eine Kombination aus Google und Social Media.' },
      { question: 'Wie hoch sollte mein Marketing-Budget sein?', answer: 'Wir empfehlen ein monatliches Minimum von AED 8.000-10.000 (inkl. Ad Spend) für messbare Ergebnisse. Größere Budgets ermöglichen mehr Tests und schnellere Skalierung.' },
      { question: 'Machen Sie auch arabische Kampagnen?', answer: 'Ja, wir erstellen zweisprachige Kampagnen (Englisch und Arabisch) mit kulturell angepassten Botschaften. Unser Team versteht die Nuancen des arabischen Marktes.' },
      { question: 'Wie schnell sehe ich Ergebnisse?', answer: 'Bei Paid Ads sehen Sie oft innerhalb von 2-4 Wochen erste Ergebnisse. Für organisches Marketing wie SEO planen Sie 3-6 Monate für signifikante Verbesserungen ein.' },
      { question: 'Wie messen Sie den Erfolg?', answer: 'Wir tracken KPIs wie ROAS, CPA, Conversion Rate und Lead Quality. Sie erhalten transparente Reports und Zugang zu unseren Dashboards.' },
    ],
    cta: {
      title: 'Bereit für mehr Wachstum?',
      description: 'Holen Sie sich Ihre kostenlose Digital Marketing Strategie-Session.',
      button: 'Strategie-Session buchen',
    },
  },
  en: {
    meta: {
      title: 'Digital Marketing Agency Sharjah | Online Marketing UAE | GoldenWing',
      description: 'Digital marketing agency in Sharjah. Google Ads, social media marketing, content marketing for the UAE market. ✓ ROI-focused ✓ Multilingual ✓ Data-driven',
      keywords: ['digital marketing sharjah', 'online marketing sharjah', 'social media marketing sharjah', 'google ads sharjah'],
    },
    hero: {
      badge: 'Digital Marketing Sharjah',
      title: 'Digital Marketing Agency for Sharjah',
      subtitle: 'More Reach. More Leads. More Revenue.',
      description: 'GoldenWing is your digital marketing agency for the Sharjah market. We combine European marketing expertise with local market understanding.',
      ctaPrimary: 'Get Free Strategy Session',
      ctaSecondary: 'View Case Studies',
    },
    services: {
      title: 'Our Digital Marketing Services',
      items: [
        { icon: Target, title: 'Google Ads', description: 'PPC campaigns for Google.ae with optimized ROI.' },
        { icon: Users, title: 'Social Media Marketing', description: 'Instagram, LinkedIn, TikTok marketing for UAE audiences.' },
        { icon: Search, title: 'SEO', description: 'Search engine optimization for Arabic and English keywords.' },
        { icon: Mail, title: 'Email Marketing', description: 'Personalized email campaigns with high conversion rates.' },
        { icon: Video, title: 'Video Marketing', description: 'YouTube Ads and video content for social media.' },
        { icon: BarChart3, title: 'Analytics & Reporting', description: 'Transparent tracking and data-driven optimization.' },
      ],
    },
    pricing: {
      title: 'Digital Marketing Packages for Sharjah',
      packages: [
        { name: 'Starter', price: 'AED 5,000/month', description: 'For small businesses', features: ['1 channel (Google or Social)', 'Up to AED 5,000 ad spend', 'Monthly reporting', 'Basic optimization', 'Email support'] },
        { name: 'Growth', price: 'AED 12,000/month', description: 'For growing businesses', features: ['Multi-channel marketing', 'Up to AED 15,000 ad spend', 'Bi-weekly reporting', 'A/B testing', 'Landing page optimization', 'Dedicated account manager'], popular: true },
        { name: 'Enterprise', price: 'On Request', description: 'For large businesses', features: ['Full-funnel marketing', 'Unlimited ad spend', 'Real-time dashboard', 'Marketing automation', 'Arabic & English campaigns', 'C-level reporting'] },
      ],
    },
    results: {
      title: 'Our Results',
      stats: [
        { value: '300%', label: 'Average ROAS' },
        { value: '-45%', label: 'Lower CPA' },
        { value: '2.5x', label: 'More qualified leads' },
        { value: '50+', label: 'UAE clients' },
      ],
    },
    faqs: [
      { question: 'Which platforms do you use for digital marketing?', answer: 'We use Google Ads, Meta (Facebook/Instagram), LinkedIn, TikTok, YouTube, and local platforms depending on the target audience. For the Sharjah market, we often recommend a combination of Google and social media.' },
      { question: 'How much should my marketing budget be?', answer: 'We recommend a monthly minimum of AED 8,000-10,000 (including ad spend) for measurable results. Larger budgets allow for more testing and faster scaling.' },
      { question: 'Do you run Arabic campaigns?', answer: 'Yes, we create bilingual campaigns (English and Arabic) with culturally adapted messaging. Our team understands the nuances of the Arabic market.' },
      { question: 'How quickly will I see results?', answer: 'With paid ads, you often see initial results within 2-4 weeks. For organic marketing like SEO, plan for 3-6 months for significant improvements.' },
      { question: 'How do you measure success?', answer: 'We track KPIs like ROAS, CPA, conversion rate, and lead quality. You receive transparent reports and access to our dashboards.' },
    ],
    cta: {
      title: 'Ready for More Growth?',
      description: 'Get your free digital marketing strategy session.',
      button: 'Book Strategy Session',
    },
  },
  ru: {
    meta: {
      title: 'Агентство цифрового маркетинга Шарджа | Онлайн-маркетинг ОАЭ | GoldenWing',
      description: 'Агентство цифрового маркетинга в Шардже. Google Ads, маркетинг в социальных сетях, контент-маркетинг для рынка ОАЭ. ✓ Ориентация на ROI ✓ Многоязычность ✓ Данные в основе',
      keywords: ['цифровой маркетинг шарджа', 'онлайн маркетинг шарджа', 'маркетинг в социальных сетях шарджа', 'google ads шарджа'],
    },
    hero: {
      badge: 'Цифровой маркетинг Шарджа',
      title: 'Агентство цифрового маркетинга для Шарджи',
      subtitle: 'Больше охвата. Больше лидов. Больше дохода.',
      description: 'GoldenWing — ваше агентство цифрового маркетинга для рынка Шарджи. Мы сочетаем европейский маркетинговый опыт с пониманием местного рынка.',
      ctaPrimary: 'Бесплатная стратегическая сессия',
      ctaSecondary: 'Посмотреть кейсы',
    },
    services: {
      title: 'Наши услуги цифрового маркетинга',
      items: [
        { icon: Target, title: 'Google Ads', description: 'PPC-кампании для Google.ae с оптимизированным ROI.' },
        { icon: Users, title: 'Маркетинг в соцсетях', description: 'Instagram, LinkedIn, TikTok маркетинг для аудитории ОАЭ.' },
        { icon: Search, title: 'SEO', description: 'Поисковая оптимизация для арабских и английских ключевых слов.' },
        { icon: Mail, title: 'Email-маркетинг', description: 'Персонализированные email-кампании с высокой конверсией.' },
        { icon: Video, title: 'Видеомаркетинг', description: 'YouTube Ads и видеоконтент для социальных сетей.' },
        { icon: BarChart3, title: 'Аналитика и отчётность', description: 'Прозрачное отслеживание и оптимизация на основе данных.' },
      ],
    },
    pricing: {
      title: 'Пакеты цифрового маркетинга для Шарджи',
      packages: [
        { name: 'Стартовый', price: 'AED 5 000/месяц', description: 'Для малого бизнеса', features: ['1 канал (Google или соцсети)', 'До AED 5 000 на рекламу', 'Ежемесячная отчётность', 'Базовая оптимизация', 'Поддержка по email'] },
        { name: 'Рост', price: 'AED 12 000/месяц', description: 'Для растущих компаний', features: ['Многоканальный маркетинг', 'До AED 15 000 на рекламу', 'Отчётность раз в 2 недели', 'A/B тестирование', 'Оптимизация посадочных страниц', 'Персональный менеджер'], popular: true },
        { name: 'Корпоративный', price: 'По запросу', description: 'Для крупных компаний', features: ['Полная воронка маркетинга', 'Неограниченный рекламный бюджет', 'Дашборд в реальном времени', 'Автоматизация маркетинга', 'Кампании на арабском и английском', 'Отчётность для руководства'] },
      ],
    },
    results: {
      title: 'Наши результаты',
      stats: [
        { value: '300%', label: 'Средний ROAS' },
        { value: '-45%', label: 'Снижение CPA' },
        { value: '2.5x', label: 'Больше качественных лидов' },
        { value: '50+', label: 'Клиентов в ОАЭ' },
      ],
    },
    faqs: [
      { question: 'Какие платформы вы используете для цифрового маркетинга?', answer: 'Мы используем Google Ads, Meta (Facebook/Instagram), LinkedIn, TikTok, YouTube и локальные платформы в зависимости от целевой аудитории. Для рынка Шарджи мы часто рекомендуем комбинацию Google и социальных сетей.' },
      { question: 'Каким должен быть мой маркетинговый бюджет?', answer: 'Мы рекомендуем минимум AED 8 000-10 000 в месяц (включая рекламные расходы) для измеримых результатов. Больший бюджет позволяет проводить больше тестов и быстрее масштабироваться.' },
      { question: 'Проводите ли вы кампании на арабском языке?', answer: 'Да, мы создаём двуязычные кампании (английский и арабский) с культурно адаптированными сообщениями. Наша команда понимает нюансы арабского рынка.' },
      { question: 'Как быстро я увижу результаты?', answer: 'С платной рекламой вы часто видите первые результаты в течение 2-4 недель. Для органического маркетинга, такого как SEO, планируйте 3-6 месяцев для значительных улучшений.' },
      { question: 'Как вы измеряете успех?', answer: 'Мы отслеживаем KPI: ROAS, CPA, коэффициент конверсии и качество лидов. Вы получаете прозрачные отчёты и доступ к нашим дашбордам.' },
    ],
    cta: {
      title: 'Готовы к росту?',
      description: 'Получите бесплатную стратегическую сессию по цифровому маркетингу.',
      button: 'Записаться на сессию',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/sharjah/digital-marketing-sharjah', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/sharjah/digital-marketing-sharjah', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: locale === 'de' ? 'de_AT' : locale === 'ru' ? 'ru_RU' : 'en_AE',
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl('/sharjah/digital-marketing-sharjah', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function DigitalMarketingSharjahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const isEn = locale === 'en'
  const isRu = locale === 'ru'

  const breadcrumbs = [
    { name: isEn ? 'Home' : isRu ? 'Главная' : 'Startseite', url: '/' },
    { name: isRu ? 'Шарджа' : 'Sharjah', url: '/sharjah' },
    { name: isRu ? 'Цифровой маркетинг' : 'Digital Marketing', url: '/sharjah/digital-marketing-sharjah' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.hero.title,
    description: data.meta.description,
    url: `https://goldenwing.at/${locale}/sharjah/digital-marketing-sharjah`,
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
    serviceType: 'Digital Marketing',
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
                    {isEn ? 'Most Popular' : isRu ? 'Самый популярный' : 'Beliebteste Wahl'}
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
                      {isEn ? 'Get Started' : isRu ? 'Начать' : 'Jetzt starten'}
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
            {isEn ? 'Frequently Asked Questions' : isRu ? 'Часто задаваемые вопросы' : 'Häufig gestellte Fragen'}
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
          <h3 className="font-semibold mb-6">{isEn ? 'Related Services' : isRu ? 'Связанные услуги' : 'Verwandte Services'}</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/sharjah" className="text-muted-foreground hover:text-foreground">
              {isEn ? 'All Sharjah Services' : isRu ? 'Все услуги в Шардже' : 'Alle Sharjah Services'}
            </Link>
            <NextLink href={`/${locale}/sharjah/seo-sharjah`} className="text-muted-foreground hover:text-foreground">
              SEO Sharjah
            </NextLink>
            <NextLink href={`/${locale}/sharjah/web-design-sharjah`} className="text-muted-foreground hover:text-foreground">
              {isEn ? 'Web Design Sharjah' : isRu ? 'Веб-дизайн Шарджа' : 'Webdesign Sharjah'}
            </NextLink>
            <Link href="/dubai/digital-marketing-agency-dubai" className="text-muted-foreground hover:text-foreground">
              Digital Marketing Dubai
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
