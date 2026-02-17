import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, CheckCircle, Globe, Smartphone, Code, MessageCircle, Monitor, Layers, Search } from 'lucide-react'
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
      title: 'Webdesign Agentur Sharjah | Premium Website Entwicklung | GoldenWing',
      description: 'Professionelle Webdesign Agentur in Sharjah. Wir erstellen moderne, responsive Websites mit RTL-Support für arabische Märkte. ✓ Next.js ✓ React ✓ Headless CMS',
      keywords: ['webdesign sharjah', 'web design agentur sharjah', 'website entwicklung sharjah', 'responsive webdesign sharjah'],
    },
    hero: {
      badge: 'Webdesign Agentur Sharjah',
      title: 'Premium Webdesign für Sharjah',
      subtitle: 'Moderne Websites. Kulturelles Feingefühl. Technische Exzellenz.',
      description: 'GoldenWing entwickelt hochmoderne Websites für Unternehmen in Sharjah. Mit RTL-Support, blitzschneller Performance und Design, das Ihre Marke strahlen lässt.',
      ctaPrimary: 'Kostenloses Beratungsgespräch',
      ctaSecondary: 'Portfolio ansehen',
    },
    services: {
      title: 'Unsere Webdesign Services',
      items: [
        { icon: Monitor, title: 'Corporate Websites', description: 'Professionelle Unternehmenswebsites für Sharjah Firmen mit mehrsprachigem Support.' },
        { icon: Smartphone, title: 'Responsive Design', description: 'Mobile-first Designs für perfekte Darstellung auf allen Geräten.' },
        { icon: Globe, title: 'Mehrsprachige Websites', description: 'EN/AR Websites mit korrektem RTL-Support für den arabischen Markt.' },
        { icon: Layers, title: 'Headless CMS', description: 'Moderne CMS-Lösungen für einfache Content-Verwaltung.' },
        { icon: Code, title: 'Web Applications', description: 'Maßgeschneiderte Web-Apps mit React und Next.js.' },
        { icon: Search, title: 'SEO-Optimierung', description: 'Websites von Grund auf für Suchmaschinen optimiert.' },
      ],
    },
    pricing: {
      title: 'Webdesign Pakete für Sharjah',
      packages: [
        { name: 'Starter', price: 'AED 12.000', description: 'Perfekt für kleine Unternehmen', features: ['5-7 Seiten Website', 'Responsive Design', 'Basis SEO', 'Kontaktformular', '1 Sprache'] },
        { name: 'Business', price: 'AED 28.000', description: 'Für wachsende Unternehmen', features: ['10-15 Seiten Website', 'Custom Design', 'Advanced SEO', 'CMS Integration', '2 Sprachen (EN/AR)', 'RTL Support'], popular: true },
        { name: 'Enterprise', price: 'Auf Anfrage', description: 'Für große Organisationen', features: ['Unbegrenzte Seiten', 'Custom Development', 'Full SEO Suite', 'Multi-Site Setup', 'Mehrsprachig', 'Dedicated Support'] },
      ],
    },
    process: {
      title: 'Unser Webdesign Prozess',
      steps: [
        { step: '01', title: 'Discovery', description: 'Analyse Ihrer Anforderungen und Ziele.' },
        { step: '02', title: 'Design', description: 'UI/UX Design mit kulturellem Feingefühl.' },
        { step: '03', title: 'Entwicklung', description: 'Clean Code mit modernen Technologien.' },
        { step: '04', title: 'Launch', description: 'Testing, Go-Live und Training.' },
      ],
    },
    faqs: [
      { question: 'Wie lange dauert die Erstellung einer Website?', answer: 'Eine typische Business-Website dauert 4-8 Wochen. Einfache Landing Pages können in 2 Wochen fertig sein, während komplexe Projekte 12+ Wochen benötigen können.' },
      { question: 'Bieten Sie RTL-Support für arabische Websites?', answer: 'Ja, wir sind spezialisiert auf zweisprachige Websites mit korrektem RTL-Support. Alle unsere arabischen Websites werden von Native Speakern überprüft.' },
      { question: 'Welche Technologien verwenden Sie?', answer: 'Wir nutzen moderne Technologien wie Next.js, React, TypeScript und Headless CMS-Systeme. Keine veralteten WordPress-Themes.' },
      { question: 'Können Sie bestehende Websites redesignen?', answer: 'Absolut! Wir bieten Website-Redesigns und Migrationen von älteren Systemen auf moderne Technologien an.' },
      { question: 'Bieten Sie Wartung und Support an?', answer: 'Ja, wir bieten verschiedene Wartungspakete an, von monatlichen Updates bis hin zu 24/7 Support für Enterprise-Kunden.' },
    ],
    cta: {
      title: 'Bereit für Ihre neue Website?',
      description: 'Lassen Sie uns über Ihr Webdesign-Projekt in Sharjah sprechen.',
      button: 'Beratungsgespräch vereinbaren',
    },
  },
  en: {
    meta: {
      title: 'Web Design Agency Sharjah | Premium Website Development | GoldenWing',
      description: 'Professional web design agency in Sharjah. We create modern, responsive websites with RTL support for Arabic markets. ✓ Next.js ✓ React ✓ Headless CMS',
      keywords: ['web design sharjah', 'web design agency sharjah', 'website development sharjah', 'responsive web design sharjah'],
    },
    hero: {
      badge: 'Web Design Agency Sharjah',
      title: 'Premium Web Design for Sharjah',
      subtitle: 'Modern Websites. Cultural Sensitivity. Technical Excellence.',
      description: 'GoldenWing develops cutting-edge websites for businesses in Sharjah. With RTL support, lightning-fast performance, and design that makes your brand shine.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'View Portfolio',
    },
    services: {
      title: 'Our Web Design Services',
      items: [
        { icon: Monitor, title: 'Corporate Websites', description: 'Professional business websites for Sharjah companies with multilingual support.' },
        { icon: Smartphone, title: 'Responsive Design', description: 'Mobile-first designs for perfect display on all devices.' },
        { icon: Globe, title: 'Multilingual Websites', description: 'EN/AR websites with proper RTL support for the Arabic market.' },
        { icon: Layers, title: 'Headless CMS', description: 'Modern CMS solutions for easy content management.' },
        { icon: Code, title: 'Web Applications', description: 'Custom web apps with React and Next.js.' },
        { icon: Search, title: 'SEO Optimization', description: 'Websites built from ground up for search engines.' },
      ],
    },
    pricing: {
      title: 'Web Design Packages for Sharjah',
      packages: [
        { name: 'Starter', price: 'AED 12,000', description: 'Perfect for small businesses', features: ['5-7 page website', 'Responsive design', 'Basic SEO', 'Contact form', '1 language'] },
        { name: 'Business', price: 'AED 28,000', description: 'For growing businesses', features: ['10-15 page website', 'Custom design', 'Advanced SEO', 'CMS integration', '2 languages (EN/AR)', 'RTL support'], popular: true },
        { name: 'Enterprise', price: 'On Request', description: 'For large organizations', features: ['Unlimited pages', 'Custom development', 'Full SEO suite', 'Multi-site setup', 'Multilingual', 'Dedicated support'] },
      ],
    },
    process: {
      title: 'Our Web Design Process',
      steps: [
        { step: '01', title: 'Discovery', description: 'Analysis of your requirements and goals.' },
        { step: '02', title: 'Design', description: 'UI/UX design with cultural sensitivity.' },
        { step: '03', title: 'Development', description: 'Clean code with modern technologies.' },
        { step: '04', title: 'Launch', description: 'Testing, go-live, and training.' },
      ],
    },
    faqs: [
      { question: 'How long does it take to create a website?', answer: 'A typical business website takes 4-8 weeks. Simple landing pages can be done in 2 weeks, while complex projects may take 12+ weeks.' },
      { question: 'Do you offer RTL support for Arabic websites?', answer: 'Yes, we specialize in bilingual websites with proper RTL support. All our Arabic websites are reviewed by native speakers.' },
      { question: 'What technologies do you use?', answer: 'We use modern technologies like Next.js, React, TypeScript, and headless CMS systems. No outdated WordPress themes.' },
      { question: 'Can you redesign existing websites?', answer: 'Absolutely! We offer website redesigns and migrations from older systems to modern technologies.' },
      { question: 'Do you offer maintenance and support?', answer: 'Yes, we offer various maintenance packages, from monthly updates to 24/7 support for enterprise clients.' },
    ],
    cta: {
      title: 'Ready for Your New Website?',
      description: "Let's discuss your web design project in Sharjah.",
      button: 'Schedule Consultation',
    },
  },
  ru: {
    meta: {
      title: 'Веб-дизайн агентство Шарджа | Премиум разработка сайтов | GoldenWing',
      description: 'Профессиональное веб-дизайн агентство в Шардже. Создаем современные, адаптивные сайты с поддержкой RTL для арабских рынков. ✓ Next.js ✓ React ✓ Headless CMS',
      keywords: ['веб-дизайн шарджа', 'веб-дизайн агентство шарджа', 'разработка сайтов шарджа', 'адаптивный веб-дизайн шарджа'],
    },
    hero: {
      badge: 'Веб-дизайн агентство Шарджа',
      title: 'Премиум веб-дизайн для Шарджи',
      subtitle: 'Современные сайты. Культурная чуткость. Техническое совершенство.',
      description: 'GoldenWing разрабатывает передовые сайты для бизнеса в Шардже. С поддержкой RTL, молниеносной производительностью и дизайном, который выделит ваш бренд.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Посмотреть портфолио',
    },
    services: {
      title: 'Наши услуги веб-дизайна',
      items: [
        { icon: Monitor, title: 'Корпоративные сайты', description: 'Профессиональные бизнес-сайты для компаний Шарджи с многоязычной поддержкой.' },
        { icon: Smartphone, title: 'Адаптивный дизайн', description: 'Mobile-first дизайн для идеального отображения на всех устройствах.' },
        { icon: Globe, title: 'Многоязычные сайты', description: 'EN/AR сайты с корректной поддержкой RTL для арабского рынка.' },
        { icon: Layers, title: 'Headless CMS', description: 'Современные CMS-решения для удобного управления контентом.' },
        { icon: Code, title: 'Веб-приложения', description: 'Индивидуальные веб-приложения на React и Next.js.' },
        { icon: Search, title: 'SEO-оптимизация', description: 'Сайты, оптимизированные для поисковых систем с самого начала.' },
      ],
    },
    pricing: {
      title: 'Пакеты веб-дизайна для Шарджи',
      packages: [
        { name: 'Стартовый', price: 'AED 12 000', description: 'Идеально для малого бизнеса', features: ['Сайт на 5-7 страниц', 'Адаптивный дизайн', 'Базовое SEO', 'Контактная форма', '1 язык'] },
        { name: 'Бизнес', price: 'AED 28 000', description: 'Для растущих компаний', features: ['Сайт на 10-15 страниц', 'Индивидуальный дизайн', 'Продвинутое SEO', 'Интеграция CMS', '2 языка (EN/AR)', 'Поддержка RTL'], popular: true },
        { name: 'Корпоративный', price: 'По запросу', description: 'Для крупных организаций', features: ['Неограниченное число страниц', 'Индивидуальная разработка', 'Полный пакет SEO', 'Мультисайтовая настройка', 'Многоязычность', 'Выделенная поддержка'] },
      ],
    },
    process: {
      title: 'Наш процесс веб-дизайна',
      steps: [
        { step: '01', title: 'Исследование', description: 'Анализ ваших требований и целей.' },
        { step: '02', title: 'Дизайн', description: 'UI/UX дизайн с учетом культурных особенностей.' },
        { step: '03', title: 'Разработка', description: 'Чистый код на современных технологиях.' },
        { step: '04', title: 'Запуск', description: 'Тестирование, запуск и обучение.' },
      ],
    },
    faqs: [
      { question: 'Сколько времени занимает создание сайта?', answer: 'Типичный бизнес-сайт создается за 4-8 недель. Простые лендинги могут быть готовы за 2 недели, а сложные проекты могут занять 12+ недель.' },
      { question: 'Предоставляете ли вы поддержку RTL для арабских сайтов?', answer: 'Да, мы специализируемся на двуязычных сайтах с правильной поддержкой RTL. Все наши арабские сайты проверяются носителями языка.' },
      { question: 'Какие технологии вы используете?', answer: 'Мы используем современные технологии: Next.js, React, TypeScript и headless CMS-системы. Никаких устаревших WordPress-шаблонов.' },
      { question: 'Можете ли вы переделать существующий сайт?', answer: 'Конечно! Мы предлагаем редизайн сайтов и миграцию со старых систем на современные технологии.' },
      { question: 'Предоставляете ли вы техническую поддержку?', answer: 'Да, мы предлагаем различные пакеты обслуживания — от ежемесячных обновлений до круглосуточной поддержки для корпоративных клиентов.' },
    ],
    cta: {
      title: 'Готовы к новому сайту?',
      description: 'Давайте обсудим ваш проект веб-дизайна в Шардже.',
      button: 'Записаться на консультацию',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/sharjah/web-design-sharjah', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/sharjah/web-design-sharjah', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: locale === 'de' ? 'de_AT' : 'en_AE',
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl('/sharjah/web-design-sharjah', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WebDesignSharjahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const _isEn = locale === 'en'
  const _isRu = locale === 'ru'

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: '/' },
    { name: { de: 'Sharjah', en: 'Sharjah', ru: 'Шарджа' }[locale], url: '/sharjah' },
    { name: { de: 'Webdesign', en: 'Web Design', ru: 'Веб-дизайн' }[locale], url: '/sharjah/web-design-sharjah' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.hero.title,
    description: data.meta.description,
    url: `https://goldenwing.at/${locale}/sharjah/web-design-sharjah`,
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
    serviceType: { de: 'Webdesign', en: 'Web Design', ru: 'Веб-дизайн' }[locale],
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
        subtitle={{ de: 'Unsere bewährte Methodik für außergewöhnliche Websites.', en: 'Our proven methodology for delivering exceptional websites.', ru: 'Наша проверенная методология создания исключительных сайтов.' }[locale]}
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
            <NextLink href={`/${locale}/sharjah/seo-sharjah`} className="text-muted-foreground hover:text-foreground">
              SEO Sharjah
            </NextLink>
            <NextLink href={`/${locale}/sharjah/branding-sharjah`} className="text-muted-foreground hover:text-foreground">
              Branding Sharjah
            </NextLink>
            <Link href="/dubai/web-design-company-dubai" className="text-muted-foreground hover:text-foreground">
              {{ de: 'Webdesign Dubai', en: 'Web Design Dubai', ru: 'Веб-дизайн Дубай' }[locale]}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
