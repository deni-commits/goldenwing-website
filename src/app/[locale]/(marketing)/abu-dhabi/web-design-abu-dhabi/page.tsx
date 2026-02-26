import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import { getHreflangAlternates, getCanonicalUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { FAQSchema, BreadcrumbListSchema } from '@/components/seo/json-ld'
import { ArrowRight, CheckCircle, Globe, Smartphone, Zap, Shield, Users, Award, Code, Palette, BarChart3, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const pageData = {
  de: {
    meta: {
      title: 'Webdesign Abu Dhabi | Professionelle Webentwicklung in der Hauptstadt',
      description: 'Führende Webdesign-Agentur in Abu Dhabi. Wir erstellen moderne, responsive Websites für Regierungsbehörden, Unternehmen und Institutionen in der UAE-Hauptstadt.',
      keywords: ['webdesign abu dhabi', 'webagentur abu dhabi', 'website erstellen abu dhabi', 'webentwicklung uae hauptstadt'],
    },
    hero: {
      badge: 'Webdesign Agentur Abu Dhabi',
      title: 'Webdesign Abu Dhabi',
      subtitle: 'Professionelle Websites für die UAE-Hauptstadt',
      description: 'GoldenWing verbindet europäische Designexzellenz mit tiefem Verständnis für den Abu Dhabi Markt. Wir erstellen Websites für Regierungsbehörden, Finanzinstitute und führende Unternehmen.',
      ctaPrimary: 'Kostenloses Erstgespräch',
      ctaSecondary: 'Unsere Referenzen',
    },
    services: [
      { icon: 'Globe', title: 'Corporate Websites', description: 'Repräsentative Unternehmenswebsites für Abu Dhabi Firmen' },
      { icon: 'Shield', title: 'Government Portale', description: 'Sichere Webportale für Regierungsbehörden und öffentliche Institutionen' },
      { icon: 'Smartphone', title: 'Responsive Design', description: 'Optimiert für alle Geräte mit Arabic RTL Support' },
      { icon: 'Code', title: 'Custom Development', description: 'Maßgeschneiderte Weblösungen für komplexe Anforderungen' },
      { icon: 'Palette', title: 'UI/UX Design', description: 'Benutzerfreundliches Design nach internationalen Standards' },
      { icon: 'BarChart3', title: 'Analytics Integration', description: 'Tracking und Reporting für datenbasierte Entscheidungen' },
    ],
    features: [
      'Mehrsprachig (EN/AR/DE)',
      'RTL Arabic Support',
      'WCAG Accessibility',
      'SSL Sicherheit',
      'Cloud Hosting UAE',
      'SEO Optimiert',
      '24/7 Support',
      'CMS Integration',
    ],
    pricing: [
      {
        name: 'Corporate',
        price: 'AED 18.000',
        description: 'Für etablierte Unternehmen',
        features: ['Bis zu 10 Seiten', 'Responsive Design', 'CMS (WordPress/Payload)', 'Zweisprachig (EN/AR)', 'SEO Grundoptimierung', 'SSL Zertifikat', '6 Monate Support'],
        popular: false,
      },
      {
        name: 'Enterprise',
        price: 'AED 40.000',
        description: 'Für Konzerne & Institutionen',
        features: ['Bis zu 25 Seiten', 'Custom Design', 'Multi-Language', 'RTL Full Support', 'Advanced SEO', 'Performance Optimierung', 'Analytics Dashboard', '12 Monate Support'],
        popular: true,
      },
      {
        name: 'Government',
        price: 'AED 80.000+',
        description: 'Für Regierungsprojekte',
        features: ['Unbegrenzte Seiten', 'Security Audit', 'WCAG 2.1 AA', 'Accessibility Report', 'Dedicated Team', 'Custom Integrations', 'SLA Agreement', '24/7 Premium Support'],
        popular: false,
      },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Analyse Ihrer Ziele und Anforderungen im Abu Dhabi Kontext' },
      { step: '02', title: 'Strategie', description: 'Konzeptentwicklung mit Fokus auf lokale Bedürfnisse' },
      { step: '03', title: 'Design', description: 'UI/UX Design mit kultureller Sensibilität' },
      { step: '04', title: 'Entwicklung', description: 'Technische Umsetzung mit modernsten Standards' },
      { step: '05', title: 'Testing', description: 'Umfassende Tests inkl. Arabic RTL' },
      { step: '06', title: 'Launch', description: 'Go-Live und Übergabe' },
    ],
    faqs: [
      { question: 'Welche Branchen bedient ihr in Abu Dhabi hauptsächlich?', answer: 'Wir arbeiten mit Regierungsbehörden, Semi-Government Entities, Finanzinstituten (ADGM), Öl & Gas Unternehmen, Bildungseinrichtungen und Healthcare Organisationen in Abu Dhabi.' },
      { question: 'Bietet ihr arabische Websites mit RTL Support?', answer: 'Ja, wir entwickeln vollständig arabische Websites mit korrekter Right-to-Left Darstellung, arabischer Typografie und kulturell angepasstem Design.' },
      { question: 'Wie lange dauert ein typisches Webprojekt?', answer: 'Corporate Websites: 8-10 Wochen, Enterprise Projekte: 12-16 Wochen, Government Portale: 16-24 Wochen. Wir berücksichtigen lokale Feiertage und Geschäftszyklen.' },
      { question: 'Erfüllt ihr Government Accessibility Standards?', answer: 'Ja, wir entwickeln nach WCAG 2.1 AA Standards und können Accessibility Audits und Compliance Reports für Regierungsprojekte liefern.' },
      { question: 'Wo werden die Websites gehostet?', answer: 'Wir bieten UAE-basiertes Cloud Hosting für optimale Performance und Datensicherheit. Für Government Projekte auch On-Premise Lösungen möglich.' },
      { question: 'Bietet ihr Wartung und Support nach dem Launch?', answer: 'Ja, alle Pakete beinhalten Support. Wir bieten auch langfristige Wartungsverträge mit SLA für kritische Websites.' },
    ],
    cta: {
      title: 'Starten Sie Ihr Webprojekt in Abu Dhabi',
      description: 'Lassen Sie uns Ihre digitale Präsenz in der UAE-Hauptstadt gemeinsam aufbauen.',
      button: 'Kostenloses Erstgespräch',
    },
  },
  en: {
    meta: {
      title: 'Web Design Abu Dhabi | Professional Web Development in the Capital',
      description: 'Leading web design agency in Abu Dhabi. We create modern, responsive websites for government entities, businesses and institutions in the UAE capital.',
      keywords: ['web design abu dhabi', 'web agency abu dhabi', 'website development abu dhabi', 'web development uae capital'],
    },
    hero: {
      badge: 'Web Design Agency Abu Dhabi',
      title: 'Web Design Abu Dhabi',
      subtitle: 'Professional Websites for the UAE Capital',
      description: 'GoldenWing combines European design excellence with deep understanding of the Abu Dhabi market. We create websites for government entities, financial institutions and leading companies.',
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'Our Portfolio',
    },
    services: [
      { icon: 'Globe', title: 'Corporate Websites', description: 'Representative business websites for Abu Dhabi companies' },
      { icon: 'Shield', title: 'Government Portals', description: 'Secure web portals for government entities and public institutions' },
      { icon: 'Smartphone', title: 'Responsive Design', description: 'Optimized for all devices with Arabic RTL support' },
      { icon: 'Code', title: 'Custom Development', description: 'Tailored web solutions for complex requirements' },
      { icon: 'Palette', title: 'UI/UX Design', description: 'User-friendly design following international standards' },
      { icon: 'BarChart3', title: 'Analytics Integration', description: 'Tracking and reporting for data-driven decisions' },
    ],
    features: [
      'Multilingual (EN/AR/DE)',
      'RTL Arabic Support',
      'WCAG Accessibility',
      'SSL Security',
      'UAE Cloud Hosting',
      'SEO Optimized',
      '24/7 Support',
      'CMS Integration',
    ],
    pricing: [
      {
        name: 'Corporate',
        price: 'AED 18,000',
        description: 'For established businesses',
        features: ['Up to 10 pages', 'Responsive Design', 'CMS (WordPress/Payload)', 'Bilingual (EN/AR)', 'Basic SEO Setup', 'SSL Certificate', '6 months support'],
        popular: false,
      },
      {
        name: 'Enterprise',
        price: 'AED 40,000',
        description: 'For corporations & institutions',
        features: ['Up to 25 pages', 'Custom Design', 'Multi-Language', 'RTL Full Support', 'Advanced SEO', 'Performance Optimization', 'Analytics Dashboard', '12 months support'],
        popular: true,
      },
      {
        name: 'Government',
        price: 'AED 80,000+',
        description: 'For government projects',
        features: ['Unlimited pages', 'Security Audit', 'WCAG 2.1 AA', 'Accessibility Report', 'Dedicated Team', 'Custom Integrations', 'SLA Agreement', '24/7 Premium Support'],
        popular: false,
      },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Analysis of your goals and requirements in the Abu Dhabi context' },
      { step: '02', title: 'Strategy', description: 'Concept development focused on local needs' },
      { step: '03', title: 'Design', description: 'UI/UX design with cultural sensitivity' },
      { step: '04', title: 'Development', description: 'Technical implementation with latest standards' },
      { step: '05', title: 'Testing', description: 'Comprehensive testing including Arabic RTL' },
      { step: '06', title: 'Launch', description: 'Go-live and handover' },
    ],
    faqs: [
      { question: 'Which industries do you mainly serve in Abu Dhabi?', answer: 'We work with government entities, semi-government organizations, financial institutions (ADGM), oil & gas companies, educational institutions and healthcare organizations in Abu Dhabi.' },
      { question: 'Do you offer Arabic websites with RTL support?', answer: 'Yes, we develop fully Arabic websites with correct Right-to-Left display, Arabic typography and culturally adapted design.' },
      { question: 'How long does a typical web project take?', answer: 'Corporate websites: 8-10 weeks, Enterprise projects: 12-16 weeks, Government portals: 16-24 weeks. We consider local holidays and business cycles.' },
      { question: 'Do you meet government accessibility standards?', answer: 'Yes, we develop according to WCAG 2.1 AA standards and can deliver accessibility audits and compliance reports for government projects.' },
      { question: 'Where are the websites hosted?', answer: 'We offer UAE-based cloud hosting for optimal performance and data security. For government projects, on-premise solutions are also available.' },
      { question: 'Do you offer maintenance and support after launch?', answer: 'Yes, all packages include support. We also offer long-term maintenance contracts with SLA for critical websites.' },
    ],
    cta: {
      title: 'Start Your Web Project in Abu Dhabi',
      description: 'Let\'s build your digital presence in the UAE capital together.',
      button: 'Free Consultation',
    },
  },
  ru: {
    meta: {
      title: 'Веб-дизайн Абу-Даби | Профессиональная веб-разработка в столице ОАЭ',
      description: 'Ведущее агентство веб-дизайна в Абу-Даби. Мы создаем современные, адаптивные сайты для государственных органов, компаний и учреждений столицы ОАЭ.',
      keywords: ['веб-дизайн абу-даби', 'веб-агентство абу-даби', 'создание сайтов абу-даби', 'веб-разработка столица оаэ'],
    },
    hero: {
      badge: 'Агентство веб-дизайна Абу-Даби',
      title: 'Веб-дизайн Абу-Даби',
      subtitle: 'Профессиональные сайты для столицы ОАЭ',
      description: 'GoldenWing сочетает европейское качество дизайна с глубоким пониманием рынка Абу-Даби. Мы создаем сайты для государственных органов, финансовых институтов и ведущих компаний.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Наше портфолио',
    },
    services: [
      { icon: 'Globe', title: 'Корпоративные сайты', description: 'Представительные бизнес-сайты для компаний Абу-Даби' },
      { icon: 'Shield', title: 'Государственные порталы', description: 'Защищенные веб-порталы для государственных органов и публичных учреждений' },
      { icon: 'Smartphone', title: 'Адаптивный дизайн', description: 'Оптимизация для всех устройств с поддержкой арабского RTL' },
      { icon: 'Code', title: 'Индивидуальная разработка', description: 'Специализированные веб-решения для сложных задач' },
      { icon: 'Palette', title: 'UI/UX дизайн', description: 'Удобный дизайн по международным стандартам' },
      { icon: 'BarChart3', title: 'Интеграция аналитики', description: 'Отслеживание и отчетность для принятия решений на основе данных' },
    ],
    features: [
      'Многоязычность (EN/AR/DE)',
      'Поддержка арабского RTL',
      'Доступность WCAG',
      'SSL безопасность',
      'Облачный хостинг ОАЭ',
      'SEO оптимизация',
      'Поддержка 24/7',
      'Интеграция CMS',
    ],
    pricing: [
      {
        name: 'Corporate',
        price: 'AED 18 000',
        description: 'Для устоявшегося бизнеса',
        features: ['До 10 страниц', 'Адаптивный дизайн', 'CMS (WordPress/Payload)', 'Двуязычный (EN/AR)', 'Базовая SEO настройка', 'SSL сертификат', '6 месяцев поддержки'],
        popular: false,
      },
      {
        name: 'Enterprise',
        price: 'AED 40 000',
        description: 'Для корпораций и учреждений',
        features: ['До 25 страниц', 'Индивидуальный дизайн', 'Многоязычность', 'Полная поддержка RTL', 'Расширенное SEO', 'Оптимизация производительности', 'Панель аналитики', '12 месяцев поддержки'],
        popular: true,
      },
      {
        name: 'Government',
        price: 'AED 80 000+',
        description: 'Для государственных проектов',
        features: ['Неограниченное количество страниц', 'Аудит безопасности', 'WCAG 2.1 AA', 'Отчет о доступности', 'Выделенная команда', 'Индивидуальные интеграции', 'Соглашение SLA', 'Премиум поддержка 24/7'],
        popular: false,
      },
    ],
    process: [
      { step: '01', title: 'Исследование', description: 'Анализ ваших целей и требований в контексте Абу-Даби' },
      { step: '02', title: 'Стратегия', description: 'Разработка концепции с фокусом на местные потребности' },
      { step: '03', title: 'Дизайн', description: 'UI/UX дизайн с учетом культурных особенностей' },
      { step: '04', title: 'Разработка', description: 'Техническая реализация по современным стандартам' },
      { step: '05', title: 'Тестирование', description: 'Комплексное тестирование включая арабский RTL' },
      { step: '06', title: 'Запуск', description: 'Выход в продакшн и передача проекта' },
    ],
    faqs: [
      { question: 'Какие отрасли вы обслуживаете в Абу-Даби?', answer: 'Мы работаем с государственными органами, полугосударственными организациями, финансовыми учреждениями (ADGM), нефтегазовыми компаниями, образовательными учреждениями и организациями здравоохранения в Абу-Даби.' },
      { question: 'Вы предлагаете арабские сайты с поддержкой RTL?', answer: 'Да, мы разрабатываем полностью арабские сайты с корректным отображением справа налево, арабской типографикой и культурно адаптированным дизайном.' },
      { question: 'Сколько времени занимает типичный веб-проект?', answer: 'Корпоративные сайты: 8-10 недель, Enterprise проекты: 12-16 недель, Государственные порталы: 16-24 недели. Мы учитываем местные праздники и бизнес-циклы.' },
      { question: 'Соответствуете ли вы государственным стандартам доступности?', answer: 'Да, мы разрабатываем по стандартам WCAG 2.1 AA и можем предоставить аудиты доступности и отчеты о соответствии для государственных проектов.' },
      { question: 'Где размещаются сайты?', answer: 'Мы предлагаем облачный хостинг в ОАЭ для оптимальной производительности и безопасности данных. Для государственных проектов также доступны локальные решения.' },
      { question: 'Вы предлагаете обслуживание и поддержку после запуска?', answer: 'Да, все пакеты включают поддержку. Мы также предлагаем долгосрочные контракты на обслуживание с SLA для критически важных сайтов.' },
    ],
    cta: {
      title: 'Начните ваш веб-проект в Абу-Даби',
      description: 'Давайте вместе создадим ваше цифровое присутствие в столице ОАЭ.',
      button: 'Бесплатная консультация',
    },
  },
}

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData.en
  const _baseUrl = 'https://goldenwing.at'
  const hreflangAlternates = getHreflangAlternates('/abu-dhabi/web-design-abu-dhabi', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    alternates: {
      canonical: getCanonicalUrl('/abu-dhabi/web-design-abu-dhabi', locale),
      languages: hreflangAlternates.languages,
    },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      url: getCanonicalUrl('/abu-dhabi/web-design-abu-dhabi', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: { de: 'de_AT', en: 'en_AE', ru: 'ru_RU' }[locale as 'de' | 'en' | 'ru'] || 'en_AE',
      type: 'website',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.meta.title,
      description: data.meta.description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
  }
}

const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Globe, Smartphone, Zap, Shield, Users, Award, Code, Palette, BarChart3, MessageCircle
}

export default async function WebDesignAbuDhabiPage({ params }: Props) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const _isEn = locale === 'en'
  const _isRu = locale === 'ru'

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] || 'Home', url: '/' },
    { name: 'Abu Dhabi', url: '/abu-dhabi' },
    { name: { de: 'Webdesign Abu Dhabi', en: 'Web Design Abu Dhabi', ru: 'Веб-дизайн Абу-Даби' }[locale] || 'Web Design Abu Dhabi', url: '/abu-dhabi/web-design-abu-dhabi' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.meta.title,
    description: data.meta.description,
    provider: {
      '@type': 'Organization',
      name: 'GoldenWing 360',
      url: 'https://goldenwing.at',
    },
    areaServed: {
      '@type': 'City',
      name: 'Abu Dhabi',
    },
    serviceType: 'Web Design',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <FAQSchema items={data.faqs} />
      <BreadcrumbListSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{data.hero.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {data.hero.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-primary mb-4">
              {data.hero.subtitle}
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              {data.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/kontakt">
                  {data.hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/referenzen">{data.hero.ctaSecondary}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {{ de: 'Unsere Webdesign Services', en: 'Our Web Design Services', ru: 'Наши услуги веб-дизайна' }[locale]}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.services?.map((service, index) => {
              const Icon = IconMap[service.icon] || Globe
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <Icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {{ de: 'In jedem Projekt enthalten', en: 'Included in Every Project', ru: 'Включено в каждый проект' }[locale]}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {data.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-background rounded-full px-4 py-2 shadow-sm">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            {{ de: 'Webdesign Pakete Abu Dhabi', en: 'Web Design Packages Abu Dhabi', ru: 'Пакеты веб-дизайна Абу-Даби' }[locale]}
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            {{ de: 'Transparente Preise für professionelle Weblösungen', en: 'Transparent pricing for professional web solutions', ru: 'Прозрачные цены на профессиональные веб-решения' }[locale]}
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.pricing.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-primary border-2' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {{ de: 'Beliebteste Wahl', en: 'Most Popular', ru: 'Самый популярный' }[locale]}
                  </Badge>
                )}
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  <p className="text-3xl font-bold text-primary mb-6">{pkg.price}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <Link href="/kontakt">{{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale]}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {{ de: 'Unser Prozess', en: 'Our Process', ru: 'Наш процесс' }[locale]}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.process.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            {{ de: 'Häufig gestellte Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale]}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {data.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.cta.title}</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{data.cta.description}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/kontakt">
              {data.cta.button}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Container>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-muted/30">
        <Container variant="block">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">{{ de: 'Verwandte Services', en: 'Related Services', ru: 'Связанные услуги' }[locale]}</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/abu-dhabi" className="text-primary hover:underline">{{ de: 'Abu Dhabi Übersicht', en: 'Abu Dhabi Overview', ru: 'Обзор Абу-Даби' }[locale]}</Link>
              <Link href="/abu-dhabi/seo-abu-dhabi" className="text-primary hover:underline">SEO Abu Dhabi</Link>
              <Link href="/abu-dhabi/branding-abu-dhabi" className="text-primary hover:underline">Branding Abu Dhabi</Link>
              <Link href="/dubai" className="text-primary hover:underline">{{ de: 'Dubai Services', en: 'Dubai Services', ru: 'Услуги в Дубае' }[locale]}</Link>
              <Link href="/uae" className="text-primary hover:underline">{{ de: 'VAE Übersicht', en: 'UAE Overview', ru: 'Обзор ОАЭ' }[locale]}</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
