import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, Star, Clock, Shield, Users, Award, Phone, MapPin, Globe, Briefcase, TrendingUp, ShoppingCart, Heart, Home, Landmark, GraduationCap, Factory, BookOpen, MessageCircle } from 'lucide-react'
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
      title: 'Digital Marketing & Webdesign Agentur Sharjah | GoldenWing',
      description: 'GoldenWing ist Ihre Digital Marketing und Webdesign Agentur in Sharjah. Europäische Qualität für das Kulturzentrum der VAE. SEO, Branding, Web-Entwicklung.',
      keywords: ['digital marketing agentur sharjah', 'webdesign sharjah', 'seo sharjah', 'branding agentur sharjah'],
    },
    hero: {
      badge: 'Digital Marketing Agentur Sharjah',
      title: 'Digital Marketing & Webdesign Agentur in Sharjah',
      subtitle: 'European Quality. Cultural Excellence. Your Success.',
      description: 'GoldenWing verbindet europäische Präzision mit Sharjahs kulturellem Erbe. Wir liefern erstklassige digitale Lösungen für Unternehmen im Kulturzentrum der VAE.',
      ctaPrimary: 'Kostenloses Beratungsgespräch',
      ctaSecondary: 'Unsere Projekte ansehen',
    },
    trustSignals: [
      { icon: Award, text: 'Google Partner' },
      { icon: Star, text: 'Clutch Top Agency' },
      { icon: Clock, text: '10+ Jahre Erfahrung' },
      { icon: Globe, text: 'VAE-weit tätig' },
    ],
    whyGoldenwing: {
      title: 'Warum GoldenWing Sharjah?',
      items: [
        { icon: Shield, title: 'Europäische Präzision', description: 'Deutsche & österreichische Qualitätsstandards mit Liebe zum Detail.' },
        { icon: BookOpen, title: 'Kulturelles Verständnis', description: 'Wir respektieren Sharjahs einzigartige kulturelle Identität und Werte.' },
        { icon: Users, title: 'Persönliche Betreuung', description: 'Direkter Kontakt mit unserem Team in den VAE.' },
        { icon: Globe, title: 'Sharjah Markt-Expertise', description: 'Wir verstehen Bildung, Kultur und Industrie in Sharjah.' },
        { icon: MessageCircle, title: 'Mehrsprachig', description: 'Deutsch, Englisch, Arabisch – wir sprechen Ihre Sprache.' },
      ],
    },
    services: {
      title: 'Unsere Services in Sharjah',
      description: 'Umfassende digitale Lösungen für das Kulturzentrum der VAE',
      items: [
        { title: 'Webdesign & Entwicklung', description: 'Premium Websites mit RTL-Support für den arabischen Markt.', href: '/sharjah/web-design-sharjah', icon: Globe },
        { title: 'SEO & Digital Marketing', description: 'Suchmaschinenoptimierung für Google.ae und lokale Sichtbarkeit.', href: '/sharjah/seo-sharjah', icon: TrendingUp },
        { title: 'Branding & Corporate Identity', description: 'Markenentwicklung mit kulturellem Feingefühl.', href: '/sharjah/branding-sharjah', icon: Award },
        { title: 'E-Commerce Lösungen', description: 'Online-Shops für den wachsenden Sharjah E-Commerce Markt.', href: '/sharjah/ecommerce-sharjah', icon: ShoppingCart },
      ],
    },
    industries: {
      title: 'Branchen die wir bedienen',
      items: [
        { icon: GraduationCap, name: 'Bildung & Universitäten' },
        { icon: BookOpen, name: 'Kultur & Museen' },
        { icon: Factory, name: 'Industrie & Produktion' },
        { icon: Landmark, name: 'Regierung & Behörden' },
        { icon: Heart, name: 'Healthcare' },
        { icon: ShoppingCart, name: 'Retail & E-Commerce' },
        { icon: Home, name: 'Immobilien' },
        { icon: Briefcase, name: 'Professional Services' },
      ],
    },
    locations: {
      title: 'Sharjah Standorte die wir bedienen',
      areas: ['Al Majaz', 'Al Nahda', 'Al Khan', 'Al Qasba', 'University City', 'Industrial Area', 'Al Taawun', 'Al Mamzar', 'Sharjah Media City (Shams)', 'Hamriyah Free Zone'],
    },
    process: {
      title: 'Unser Prozess',
      steps: [
        { step: '01', title: 'Discovery & Strategie', description: 'Wir analysieren Ihre Ziele und den Sharjah Markt.' },
        { step: '02', title: 'Design & Konzept', description: 'Kulturell sensibles Design für lokale Zielgruppen.' },
        { step: '03', title: 'Entwicklung', description: 'Professionelle Umsetzung mit RTL-Support.' },
        { step: '04', title: 'Launch & Optimierung', description: 'Go-Live und kontinuierliche Verbesserung.' },
      ],
    },
    faqs: [
      { question: 'Welche Digital Marketing Services bieten Sie in Sharjah an?', answer: 'Wir bieten umfassende digitale Lösungen: Webdesign & Entwicklung, SEO (Google.ae), PPC/Google Ads, Social Media Marketing, Branding, E-Commerce Entwicklung und Content Marketing – alles speziell für den Sharjah Markt optimiert.' },
      { question: 'Was kostet Webdesign in Sharjah?', answer: 'Unsere Webdesign-Pakete starten bei AED 12.000 für Business-Websites. Premium-Lösungen mit CMS und mehrsprachigem Support (EN/AR) beginnen bei AED 28.000. Enterprise-Lösungen werden individuell kalkuliert.' },
      { question: 'Haben Sie Erfahrung mit Bildungs- und Kulturinstitutionen?', answer: 'Ja, wir haben umfangreiche Erfahrung mit Bildungseinrichtungen, Museen und Kulturinstitutionen. Wir verstehen die besonderen Anforderungen dieses Sektors in Sharjah.' },
      { question: 'Können Sie arabische Websites erstellen?', answer: 'Absolut! Wir entwickeln zweisprachige Websites mit korrektem RTL (Right-to-Left) Support für Arabisch. Unsere Designer verstehen die kulturellen Anforderungen des arabischen Marktes.' },
      { question: 'Wie lange dauert ein Website-Projekt?', answer: 'Typische Website-Projekte dauern 4-8 Wochen. Einfache Landing Pages können in 2 Wochen fertig sein, während komplexe E-Commerce-Lösungen 12+ Wochen benötigen können.' },
    ],
    cta: {
      title: 'Bereit für Ihr Projekt in Sharjah?',
      description: 'Lassen Sie uns über Ihre digitale Präsenz in Sharjah sprechen.',
      button: 'Beratungsgespräch vereinbaren',
      whatsapp: 'WhatsApp Chat starten',
    },
  },
  en: {
    meta: {
      title: 'Digital Marketing & Web Design Agency Sharjah | GoldenWing',
      description: 'GoldenWing is your digital marketing and web design agency in Sharjah. European quality for the cultural capital of the UAE. SEO, branding, web development.',
      keywords: ['digital marketing agency sharjah', 'web design sharjah', 'seo sharjah', 'branding agency sharjah', 'web design company sharjah'],
    },
    hero: {
      badge: 'Digital Marketing Agency Sharjah',
      title: 'Digital Marketing & Web Design Agency in Sharjah',
      subtitle: 'European Quality. Cultural Excellence. Your Success.',
      description: 'GoldenWing combines European precision with Sharjah\'s cultural heritage. We deliver world-class digital solutions for businesses in the cultural capital of the UAE.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'View Our Work',
    },
    trustSignals: [
      { icon: Award, text: 'Google Partner' },
      { icon: Star, text: 'Clutch Top Agency' },
      { icon: Clock, text: '10+ Years Experience' },
      { icon: Globe, text: 'UAE-wide Service' },
    ],
    whyGoldenwing: {
      title: 'Why GoldenWing Sharjah?',
      items: [
        { icon: Shield, title: 'European Precision', description: 'German & Austrian quality standards with attention to detail.' },
        { icon: BookOpen, title: 'Cultural Understanding', description: 'We respect Sharjah\'s unique cultural identity and values.' },
        { icon: Users, title: 'Personal Service', description: 'Direct contact with our team in the UAE.' },
        { icon: Globe, title: 'Sharjah Market Expertise', description: 'We understand education, culture, and industry in Sharjah.' },
        { icon: MessageCircle, title: 'Multi-lingual', description: 'German, English, Arabic – we speak your language.' },
      ],
    },
    services: {
      title: 'Our Services in Sharjah',
      description: 'Comprehensive digital solutions for the cultural capital of the UAE',
      items: [
        { title: 'Web Design & Development', description: 'Premium websites with RTL support for Arabic markets.', href: '/sharjah/web-design-sharjah', icon: Globe },
        { title: 'SEO & Digital Marketing', description: 'Search engine optimization for Google.ae and local visibility.', href: '/sharjah/seo-sharjah', icon: TrendingUp },
        { title: 'Branding & Corporate Identity', description: 'Brand development with cultural sensitivity.', href: '/sharjah/branding-sharjah', icon: Award },
        { title: 'E-Commerce Solutions', description: 'Online stores for the growing Sharjah e-commerce market.', href: '/sharjah/ecommerce-sharjah', icon: ShoppingCart },
      ],
    },
    industries: {
      title: 'Industries We Serve',
      items: [
        { icon: GraduationCap, name: 'Education & Universities' },
        { icon: BookOpen, name: 'Culture & Museums' },
        { icon: Factory, name: 'Industry & Manufacturing' },
        { icon: Landmark, name: 'Government & Public Sector' },
        { icon: Heart, name: 'Healthcare' },
        { icon: ShoppingCart, name: 'Retail & E-Commerce' },
        { icon: Home, name: 'Real Estate' },
        { icon: Briefcase, name: 'Professional Services' },
      ],
    },
    locations: {
      title: 'Sharjah Locations We Serve',
      areas: ['Al Majaz', 'Al Nahda', 'Al Khan', 'Al Qasba', 'University City', 'Industrial Area', 'Al Taawun', 'Al Mamzar', 'Sharjah Media City (Shams)', 'Hamriyah Free Zone'],
    },
    process: {
      title: 'Our Process',
      steps: [
        { step: '01', title: 'Discovery & Strategy', description: 'We analyze your goals and the Sharjah market.' },
        { step: '02', title: 'Design & Concept', description: 'Culturally sensitive design for local audiences.' },
        { step: '03', title: 'Development', description: 'Professional implementation with RTL support.' },
        { step: '04', title: 'Launch & Optimize', description: 'Go-live and continuous improvement.' },
      ],
    },
    faqs: [
      { question: 'What digital marketing services do you offer in Sharjah?', answer: 'We offer comprehensive digital solutions: Web design & development, SEO (Google.ae), PPC/Google Ads, Social Media Marketing, Branding, E-commerce Development, and Content Marketing – all optimized specifically for the Sharjah market.' },
      { question: 'How much does web design cost in Sharjah?', answer: 'Our web design packages start at AED 12,000 for business websites. Premium solutions with CMS and multilingual support (EN/AR) start at AED 28,000. Enterprise solutions are priced individually.' },
      { question: 'Do you have experience with education and cultural institutions?', answer: 'Yes, we have extensive experience with educational institutions, museums, and cultural organizations. We understand the special requirements of this sector in Sharjah.' },
      { question: 'Can you create Arabic websites?', answer: 'Absolutely! We develop bilingual websites with proper RTL (Right-to-Left) support for Arabic. Our designers understand the cultural requirements of the Arabic market.' },
      { question: 'How long does a website project take?', answer: 'Typical website projects take 4-8 weeks. Simple landing pages can be done in 2 weeks, while complex e-commerce solutions may take 12+ weeks.' },
    ],
    cta: {
      title: 'Ready for Your Project in Sharjah?',
      description: "Let's discuss your digital presence in Sharjah.",
      button: 'Schedule Consultation',
      whatsapp: 'Start WhatsApp Chat',
    },
  },
  ru: {
    meta: {
      title: 'Агентство цифрового маркетинга и веб-дизайна в Шардже | GoldenWing',
      description: 'GoldenWing — ваше агентство цифрового маркетинга и веб-дизайна в Шардже. Европейское качество для культурной столицы ОАЭ. SEO, брендинг, веб-разработка.',
      keywords: ['агентство цифрового маркетинга шарджа', 'веб-дизайн шарджа', 'seo шарджа', 'брендинг агентство шарджа', 'веб-дизайн компания шарджа'],
    },
    hero: {
      badge: 'Агентство цифрового маркетинга Шарджа',
      title: 'Агентство цифрового маркетинга и веб-дизайна в Шардже',
      subtitle: 'Европейское качество. Культурное превосходство. Ваш успех.',
      description: 'GoldenWing сочетает европейскую точность с культурным наследием Шарджи. Мы создаём цифровые решения мирового класса для бизнеса в культурной столице ОАЭ.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Посмотреть наши работы',
    },
    trustSignals: [
      { icon: Award, text: 'Партнёр Google' },
      { icon: Star, text: 'Топ-агентство Clutch' },
      { icon: Clock, text: '10+ лет опыта' },
      { icon: Globe, text: 'Работаем по всем ОАЭ' },
    ],
    whyGoldenwing: {
      title: 'Почему GoldenWing Шарджа?',
      items: [
        { icon: Shield, title: 'Европейская точность', description: 'Немецкие и австрийские стандарты качества с вниманием к деталям.' },
        { icon: BookOpen, title: 'Культурное понимание', description: 'Мы уважаем уникальную культурную идентичность и ценности Шарджи.' },
        { icon: Users, title: 'Персональный сервис', description: 'Прямой контакт с нашей командой в ОАЭ.' },
        { icon: Globe, title: 'Экспертиза рынка Шарджи', description: 'Мы понимаем образование, культуру и индустрию в Шардже.' },
        { icon: MessageCircle, title: 'Многоязычность', description: 'Немецкий, английский, арабский — мы говорим на вашем языке.' },
      ],
    },
    services: {
      title: 'Наши услуги в Шардже',
      description: 'Комплексные цифровые решения для культурной столицы ОАЭ',
      items: [
        { title: 'Веб-дизайн и разработка', description: 'Премиум-сайты с поддержкой RTL для арабского рынка.', href: '/sharjah/web-design-sharjah', icon: Globe },
        { title: 'SEO и цифровой маркетинг', description: 'Поисковая оптимизация для Google.ae и локальная видимость.', href: '/sharjah/seo-sharjah', icon: TrendingUp },
        { title: 'Брендинг и корпоративный стиль', description: 'Развитие бренда с учётом культурных особенностей.', href: '/sharjah/branding-sharjah', icon: Award },
        { title: 'E-Commerce решения', description: 'Интернет-магазины для растущего рынка электронной коммерции Шарджи.', href: '/sharjah/ecommerce-sharjah', icon: ShoppingCart },
      ],
    },
    industries: {
      title: 'Отрасли, которые мы обслуживаем',
      items: [
        { icon: GraduationCap, name: 'Образование и университеты' },
        { icon: BookOpen, name: 'Культура и музеи' },
        { icon: Factory, name: 'Промышленность и производство' },
        { icon: Landmark, name: 'Государственный сектор' },
        { icon: Heart, name: 'Здравоохранение' },
        { icon: ShoppingCart, name: 'Розничная торговля и E-Commerce' },
        { icon: Home, name: 'Недвижимость' },
        { icon: Briefcase, name: 'Профессиональные услуги' },
      ],
    },
    locations: {
      title: 'Районы Шарджи, которые мы обслуживаем',
      areas: ['Аль-Маджаз', 'Аль-Нахда', 'Аль-Хан', 'Аль-Касба', 'Университетский городок', 'Промышленная зона', 'Аль-Тааун', 'Аль-Мамзар', 'Sharjah Media City (Shams)', 'Свободная зона Хамрия'],
    },
    process: {
      title: 'Наш процесс',
      steps: [
        { step: '01', title: 'Исследование и стратегия', description: 'Мы анализируем ваши цели и рынок Шарджи.' },
        { step: '02', title: 'Дизайн и концепция', description: 'Культурно-ориентированный дизайн для местной аудитории.' },
        { step: '03', title: 'Разработка', description: 'Профессиональная реализация с поддержкой RTL.' },
        { step: '04', title: 'Запуск и оптимизация', description: 'Выход в свет и постоянное улучшение.' },
      ],
    },
    faqs: [
      { question: 'Какие услуги цифрового маркетинга вы предлагаете в Шардже?', answer: 'Мы предлагаем комплексные цифровые решения: веб-дизайн и разработка, SEO (Google.ae), PPC/Google Ads, маркетинг в социальных сетях, брендинг, разработка электронной коммерции и контент-маркетинг — всё оптимизировано специально для рынка Шарджи.' },
      { question: 'Сколько стоит веб-дизайн в Шардже?', answer: 'Наши пакеты веб-дизайна начинаются от 12 000 AED для бизнес-сайтов. Премиум-решения с CMS и многоязычной поддержкой (EN/AR) начинаются от 28 000 AED. Корпоративные решения рассчитываются индивидуально.' },
      { question: 'Есть ли у вас опыт работы с образовательными и культурными учреждениями?', answer: 'Да, у нас обширный опыт работы с образовательными учреждениями, музеями и культурными организациями. Мы понимаем особые требования этого сектора в Шардже.' },
      { question: 'Можете ли вы создать арабские сайты?', answer: 'Безусловно! Мы разрабатываем двуязычные сайты с правильной поддержкой RTL (справа налево) для арабского языка. Наши дизайнеры понимают культурные требования арабского рынка.' },
      { question: 'Сколько времени занимает проект по созданию сайта?', answer: 'Типичные проекты по созданию сайтов занимают 4-8 недель. Простые лендинги могут быть готовы за 2 недели, тогда как сложные решения для электронной коммерции могут занять 12+ недель.' },
    ],
    cta: {
      title: 'Готовы к вашему проекту в Шардже?',
      description: 'Давайте обсудим ваше цифровое присутствие в Шардже.',
      button: 'Записаться на консультацию',
      whatsapp: 'Начать чат в WhatsApp',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/sharjah', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/sharjah', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: locale === 'de' ? 'de_AT' : locale === 'ru' ? 'ru_RU' : 'en_AE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.hero.title,
      description: data.meta.description,
    },
    alternates: {
      canonical: getCanonicalUrl('/sharjah', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SharjahHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: '/' },
    { name: { de: 'Sharjah', en: 'Sharjah', ru: 'Шарджа' }[locale], url: '/sharjah' },
  ]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'GoldenWing Creative Studios Sharjah',
    description: data.meta.description,
    url: 'https://goldenwing.at/en/sharjah',
    telephone: '+43-664-543-96-81',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sharjah',
      addressRegion: 'Sharjah',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.3463,
      longitude: 55.4209,
    },
    priceRange: '$$$',
    areaServed: [
      { '@type': 'City', name: 'Sharjah' },
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    sameAs: [
      'https://www.linkedin.com/company/goldenwing-creative-studios',
      'https://www.instagram.com/goldenwing.at',
    ],
  }

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
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

            {/* Trust Signals */}
            <div className="mt-12 flex flex-wrap gap-6 items-center text-sm text-muted-foreground">
              {data.trustSignals.map((signal) => (
                <div key={signal.text} className="flex items-center gap-2">
                  <signal.icon className="h-5 w-5 text-foreground" />
                  <span>{signal.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why GoldenWing Sharjah */}
      <section className="py-20 border-y bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.whyGoldenwing.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.whyGoldenwing.items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-muted dark:bg-[#0a0a0a]/50 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-foreground dark:text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services in Sharjah */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{data.services.title}</h2>
            <p className="text-muted-foreground">{data.services.description}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data.services.items.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow hover:border-border dark:hover:border-primary">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted dark:bg-[#0a0a0a]/50 flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-foreground dark:text-foreground" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <NextLink href={`/${locale}${service.href}`} className="text-foreground dark:text-foreground inline-flex items-center gap-1 hover:gap-2 transition-all font-medium">
                    {{ de: 'Mehr erfahren', en: 'Learn more', ru: 'Подробнее' }[locale]} <ArrowRight className="h-4 w-4" />
                  </NextLink>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="border-border hover:border-primary dark:border-primary" asChild>
              <NextLink href={`/${locale}/sharjah/digital-marketing-sharjah`}>
                {{ de: 'Alle Services ansehen', en: 'View All Services', ru: 'Посмотреть все услуги' }[locale]}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.industries.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {data.industries.items.map((industry) => (
              <div key={industry.name} className="flex flex-col items-center text-center p-4 rounded-lg bg-background border hover:border-border dark:hover:border-primary transition-colors">
                <div className="h-12 w-12 rounded-full bg-muted dark:bg-[#0a0a0a]/50 flex items-center justify-center mb-3">
                  <industry.icon className="h-6 w-6 text-foreground dark:text-foreground" />
                </div>
                <span className="text-sm font-medium">{industry.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sharjah Locations */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{data.locations.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {{
                de: 'Wir betreuen Kunden in allen wichtigen Sharjah Business Districts und Free Zones.',
                en: 'We serve clients across all major Sharjah business districts and free zones.',
                ru: 'Мы обслуживаем клиентов во всех основных бизнес-районах и свободных зонах Шарджи.'
              }[locale]}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {data.locations.areas.map((area) => (
              <span key={area} className="px-4 py-2 bg-primary dark:bg-[#0a0a0a]/30 rounded-full text-sm flex items-center gap-2">
                <MapPin className="h-3 w-3 text-foreground dark:text-foreground" />
                {area}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Process - ProcessLargeNumber Layout */}
      <ProcessLargeNumber
        title={data.process.title}
        subtitle={{
          de: 'Unsere bewährte Methodik für digitalen Erfolg.',
          en: 'Our proven methodology for digital success.',
          ru: 'Наша проверенная методология для цифрового успеха.'
        }[locale]}
        steps={data.process.steps.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      />

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
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {data.cta.title}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {data.cta.description}
          </p>
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
                {data.cta.whatsapp}
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

      {/* Internal Links for SEO */}
      <section className="py-12 border-t">
        <Container variant="block">
          <h3 className="font-semibold mb-6">{{ de: 'Sharjah Services', en: 'Sharjah Services', ru: 'Услуги в Шардже' }[locale]}</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <NextLink href={`/${locale}/sharjah/web-design-sharjah`} className="text-muted-foreground hover:text-foreground">
              {{ de: 'Webdesign Agentur Sharjah', en: 'Web Design Company Sharjah', ru: 'Веб-дизайн компания Шарджа' }[locale]}
            </NextLink>
            <NextLink href={`/${locale}/sharjah/seo-sharjah`} className="text-muted-foreground hover:text-foreground">
              {{ de: 'SEO Agentur Sharjah', en: 'SEO Company Sharjah', ru: 'SEO компания Шарджа' }[locale]}
            </NextLink>
            <NextLink href={`/${locale}/sharjah/branding-sharjah`} className="text-muted-foreground hover:text-foreground">
              {{ de: 'Branding Agentur Sharjah', en: 'Branding Agency Sharjah', ru: 'Брендинг агентство Шарджа' }[locale]}
            </NextLink>
            <NextLink href={`/${locale}/sharjah/ecommerce-sharjah`} className="text-muted-foreground hover:text-foreground">
              {{ de: 'E-Commerce Entwicklung Sharjah', en: 'E-commerce Development Sharjah', ru: 'Разработка E-Commerce Шарджа' }[locale]}
            </NextLink>
            <NextLink href={`/${locale}/sharjah/digital-marketing-sharjah`} className="text-muted-foreground hover:text-foreground">
              {{ de: 'Digital Marketing Agentur Sharjah', en: 'Digital Marketing Agency Sharjah', ru: 'Агентство цифрового маркетинга Шарджа' }[locale]}
            </NextLink>
            <Link href="/dubai" className="text-muted-foreground hover:text-foreground">
              {{ de: 'Dubai Services', en: 'Dubai Services', ru: 'Услуги в Дубае' }[locale]}
            </Link>
            <Link href="/abu-dhabi" className="text-muted-foreground hover:text-foreground">
              {{ de: 'Abu Dhabi Services', en: 'Abu Dhabi Services', ru: 'Услуги в Абу-Даби' }[locale]}
            </Link>
            <Link href="/uae" className="text-muted-foreground hover:text-foreground">
              {{ de: 'VAE Übersicht', en: 'UAE Overview', ru: 'Обзор ОАЭ' }[locale]}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
