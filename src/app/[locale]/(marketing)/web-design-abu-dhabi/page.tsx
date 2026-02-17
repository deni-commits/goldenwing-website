import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import {
  ArrowRight,
  Palette,
  Globe,
  Search,
  Smartphone,
  Zap,
  Building2,
  ShoppingCart,
  FileText,
  Code,
  Plane,
  Heart,
  Landmark,
  Briefcase,
  Rocket,
  Users,
  CheckCircle,
  Star,
  LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'


import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { ProcessTimeline } from '@/components/sections/process-timeline'
import { FAQSection } from '@/components/sections/faq-section'
import { SupportedLocale } from '@/lib/payload'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const iconMap: Record<string, LucideIcon> = {
  'palette': Palette,
  'globe': Globe,
  'search': Search,
  'smartphone': Smartphone,
  'zap': Zap,
  'building': Building2,
  'shopping': ShoppingCart,
  'file': FileText,
  'code': Code,
  'plane': Plane,
  'heart': Heart,
  'landmark': Landmark,
  'briefcase': Briefcase,
  'rocket': Rocket,
  'users': Users,
  'check': CheckCircle,
}

// Content
const content = {
  en: {
    badge: 'Web Design Agency Abu Dhabi',
    heroTitle: 'Web Design in Abu Dhabi',
    heroSubtitle: 'Your Partner for Digital Excellence in the UAE Capital',
    heroDescription: "Abu Dhabi is the heart of UAE's vision for the future. Your website should reflect that ambition. At GoldenWing, we create websites that don't just look stunning—they drive real business results. With teams in Vienna, Dubai, and California, we bring international expertise to Abu Dhabi's thriving business landscape.",
    ctaPrimary: 'Get Your Free Quote',
    ctaSecondary: 'Schedule a Call',
    whyChooseTitle: 'Why Choose GoldenWing for Web Design in Abu Dhabi?',
    whyChooseItems: [
      { icon: 'palette', title: 'Award-Winning Design', description: "We don't do templates. Every website is custom-crafted to reflect your brand's unique identity and appeal to your Abu Dhabi audience." },
      { icon: 'zap', title: 'Performance First', description: 'Fast loading times are critical in the UAE market. Our websites score 90+ on Google PageSpeed—every time.' },
      { icon: 'smartphone', title: 'Mobile-First Approach', description: 'With over 80% of UAE users browsing on mobile, we design for smartphones first, then scale up.' },
      { icon: 'search', title: 'SEO Built-In', description: 'Every website comes with on-page SEO optimized for the Abu Dhabi and UAE market. Be found when it matters.' },
      { icon: 'globe', title: 'Bilingual Expertise', description: 'Arabic and English? No problem. We build seamless multilingual experiences for the diverse Abu Dhabi market.' },
    ],
    servicesTitle: 'Our Web Design Services in Abu Dhabi',
    services: [
      { icon: 'building', title: 'Corporate Websites', description: 'Professional websites for established businesses looking to strengthen their digital presence in the UAE capital.' },
      { icon: 'shopping', title: 'E-Commerce Solutions', description: 'Online stores built for the Abu Dhabi market—with local payment gateways and shipping integrations.' },
      { icon: 'file', title: 'Landing Pages', description: 'High-converting landing pages designed to turn Abu Dhabi visitors into leads and customers.' },
      { icon: 'code', title: 'Web Applications', description: 'Custom web applications for businesses requiring more than a standard website.' },
    ],
    industriesTitle: 'Industries We Serve in Abu Dhabi',
    industries: [
      { icon: 'building', name: 'Real Estate & Property', description: 'Showcase properties with stunning visuals' },
      { icon: 'landmark', name: 'Finance & Banking', description: 'Secure, trustworthy digital presence' },
      { icon: 'heart', name: 'Healthcare', description: 'Patient-friendly, compliant websites' },
      { icon: 'plane', name: 'Hospitality & Tourism', description: 'Booking-optimized experiences' },
      { icon: 'briefcase', name: 'Government & Public Sector', description: 'Accessible, multilingual platforms' },
      { icon: 'rocket', name: 'Startups & Tech', description: 'Scalable solutions for growing companies' },
    ],
    processTitle: 'Our Process',
    process: [
      { step: '01', title: 'Discovery', description: 'We learn about your business, goals, and the Abu Dhabi market you\'re targeting.' },
      { step: '02', title: 'Strategy', description: 'We create a roadmap tailored to your success metrics.' },
      { step: '03', title: 'Design & Development', description: 'Our team brings your vision to life with pixel-perfect execution.' },
      { step: '04', title: 'Launch & Growth', description: 'We go live, monitor performance, and optimize continuously.' },
    ],
    testimonial: {
      text: 'GoldenWing delivered a website that perfectly captures our brand and converts visitors into clients. Their understanding of the UAE market is exceptional.',
      author: 'Ahmed K.',
      company: 'Property Investment Group, Abu Dhabi',
    },
    ctaTitle: 'Ready to Elevate Your Digital Presence in Abu Dhabi?',
    ctaDescription: "Let's discuss your project. Get a free consultation and quote within 24 hours.",
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'How much does web design cost in Abu Dhabi?', answer: 'Web design costs in Abu Dhabi vary based on complexity. Our projects typically range from AED 15,000 for landing pages to AED 100,000+ for complex e-commerce solutions. Contact us for a personalized quote.' },
      { question: 'How long does it take to build a website?', answer: 'Most websites take 4-8 weeks from concept to launch. Complex projects may take 12+ weeks. We\'ll provide a detailed timeline during our initial consultation.' },
      { question: 'Do you offer website maintenance?', answer: 'Yes, we offer ongoing maintenance packages to keep your website secure, fast, and up-to-date.' },
      { question: 'Can you redesign my existing website?', answer: 'Absolutely. We specialize in website redesigns that improve both aesthetics and performance.' },
      { question: 'Do you work with businesses outside Abu Dhabi?', answer: 'Yes, we serve clients across the UAE, including Dubai, Sharjah, and beyond.' },
    ],
    stats: [
      { value: '90+', label: 'PageSpeed Score' },
      { value: '80%', label: 'UAE Mobile Users' },
      { value: '24h', label: 'Quote Response' },
      { value: '3', label: 'Global Offices' },
    ],
  },
  de: {
    badge: 'Webdesign Agentur Abu Dhabi',
    heroTitle: 'Webdesign in Abu Dhabi',
    heroSubtitle: 'Ihr Partner für digitale Exzellenz in der Hauptstadt der VAE',
    heroDescription: 'Abu Dhabi steht für die Zukunftsvision der VAE. Ihre Website sollte diese Ambition widerspiegeln. Bei GoldenWing erstellen wir Websites, die nicht nur beeindruckend aussehen – sondern echte Geschäftsergebnisse liefern. Mit Teams in Wien, Dubai und California bringen wir internationale Expertise in Abu Dhabis florierende Geschäftswelt.',
    ctaPrimary: 'Kostenloses Angebot',
    ctaSecondary: 'Gespräch vereinbaren',
    whyChooseTitle: 'Warum GoldenWing für Webdesign in Abu Dhabi?',
    whyChooseItems: [
      { icon: 'palette', title: 'Preisgekröntes Design', description: 'Keine Templates. Jede Website wird individuell gestaltet, um Ihre Marke authentisch zu repräsentieren.' },
      { icon: 'zap', title: 'Performance First', description: 'Schnelle Ladezeiten sind im UAE-Markt entscheidend. Unsere Websites erreichen 90+ bei Google PageSpeed.' },
      { icon: 'smartphone', title: 'Mobile-First Ansatz', description: 'Über 80% der UAE-Nutzer surfen mobil. Wir designen zuerst für Smartphones.' },
      { icon: 'search', title: 'SEO Inklusive', description: 'Jede Website ist für den Abu Dhabi und UAE-Markt suchmaschinenoptimiert.' },
      { icon: 'globe', title: 'Mehrsprachig', description: 'Arabisch und Englisch? Kein Problem. Wir bauen nahtlose multilinguale Erlebnisse.' },
    ],
    servicesTitle: 'Unsere Webdesign-Services in Abu Dhabi',
    services: [
      { icon: 'building', title: 'Unternehmenswebsites', description: 'Professionelle Websites für etablierte Unternehmen in der VAE-Hauptstadt.' },
      { icon: 'shopping', title: 'E-Commerce Lösungen', description: 'Online-Shops für den Abu Dhabi Markt – mit lokalen Zahlungs- und Versandintegrationen.' },
      { icon: 'file', title: 'Landing Pages', description: 'Hochkonvertierende Landingpages die Besucher in Kunden verwandeln.' },
      { icon: 'code', title: 'Web-Applikationen', description: 'Individuelle Webanwendungen für komplexe Anforderungen.' },
    ],
    industriesTitle: 'Branchen in Abu Dhabi',
    industries: [
      { icon: 'building', name: 'Immobilien', description: 'Objekte visuell in Szene setzen' },
      { icon: 'landmark', name: 'Finanzen & Banking', description: 'Vertrauenswürdige digitale Präsenz' },
      { icon: 'heart', name: 'Gesundheitswesen', description: 'Patientenfreundliche Websites' },
      { icon: 'plane', name: 'Hospitality & Tourismus', description: 'Buchungsoptimierte Erlebnisse' },
      { icon: 'briefcase', name: 'Regierung & Öffentlicher Sektor', description: 'Barrierefreie Plattformen' },
      { icon: 'rocket', name: 'Startups & Tech', description: 'Skalierbare Lösungen' },
    ],
    processTitle: 'Unser Prozess',
    process: [
      { step: '01', title: 'Verstehen', description: 'Wir lernen Ihr Business und den Abu Dhabi Markt kennen.' },
      { step: '02', title: 'Planen', description: 'Wir erstellen eine Roadmap für Ihren Erfolg.' },
      { step: '03', title: 'Umsetzen', description: 'Unser Team setzt Ihre Vision pixelgenau um.' },
      { step: '04', title: 'Wachsen', description: 'Launch, Monitoring und kontinuierliche Optimierung.' },
    ],
    testimonial: {
      text: 'GoldenWing hat eine Website geliefert, die unsere Marke perfekt einfängt und Besucher in Kunden verwandelt. Ihr Verständnis des UAE-Marktes ist außergewöhnlich.',
      author: 'Ahmed K.',
      company: 'Property Investment Group, Abu Dhabi',
    },
    ctaTitle: 'Bereit für Ihre digitale Transformation in Abu Dhabi?',
    ctaDescription: 'Lassen Sie uns über Ihr Projekt sprechen. Kostenlose Beratung und Angebot innerhalb von 24 Stunden.',
    faqTitle: 'Häufige Fragen',
    faqs: [
      { question: 'Was kostet Webdesign in Abu Dhabi?', answer: 'Die Kosten variieren je nach Komplexität. Unsere Projekte reichen von AED 15.000 für Landingpages bis AED 100.000+ für komplexe E-Commerce-Lösungen.' },
      { question: 'Wie lange dauert die Erstellung einer Website?', answer: 'Die meisten Websites sind in 4-8 Wochen fertig. Komplexe Projekte können 12+ Wochen dauern.' },
      { question: 'Bieten Sie Website-Wartung an?', answer: 'Ja, wir bieten Wartungspakete um Ihre Website sicher und aktuell zu halten.' },
      { question: 'Können Sie meine bestehende Website neu gestalten?', answer: 'Absolut. Wir sind spezialisiert auf Redesigns die Ästhetik und Performance verbessern.' },
      { question: 'Arbeiten Sie auch mit Unternehmen außerhalb Abu Dhabis?', answer: 'Ja, wir betreuen Kunden in den gesamten VAE, einschließlich Dubai, Sharjah und darüber hinaus.' },
    ],
    stats: [
      { value: '90+', label: 'PageSpeed Score' },
      { value: '80%', label: 'UAE Mobile Nutzer' },
      { value: '24h', label: 'Angebot Antwort' },
      { value: '3', label: 'Globale Standorte' },
    ],
  },
  ru: {
    badge: 'Веб-дизайн агентство Абу-Даби',
    heroTitle: 'Веб-дизайн в Абу-Даби',
    heroSubtitle: 'Ваш партнер по цифровому совершенству в столице ОАЭ',
    heroDescription: 'Абу-Даби — сердце будущего ОАЭ. Ваш сайт должен отражать эти амбиции. В GoldenWing мы создаем сайты, которые не просто потрясающе выглядят — они приносят реальные бизнес-результаты. С командами в Вене, Дубае и Калифорнии мы привносим международный опыт в процветающий бизнес-ландшафт Абу-Даби.',
    ctaPrimary: 'Получить бесплатную оценку',
    ctaSecondary: 'Запланировать звонок',
    whyChooseTitle: 'Почему GoldenWing для веб-дизайна в Абу-Даби?',
    whyChooseItems: [
      { icon: 'palette', title: 'Отмеченный наградами дизайн', description: 'Никаких шаблонов. Каждый сайт создается индивидуально, чтобы отразить уникальность вашего бренда.' },
      { icon: 'zap', title: 'Производительность прежде всего', description: 'Быстрая загрузка критична для рынка ОАЭ. Наши сайты набирают 90+ баллов в Google PageSpeed.' },
      { icon: 'smartphone', title: 'Mobile-First подход', description: 'Более 80% пользователей ОАЭ просматривают сайты с мобильных устройств. Мы сначала проектируем для смартфонов.' },
      { icon: 'search', title: 'Встроенное SEO', description: 'Каждый сайт оптимизирован для поисковых систем рынка Абу-Даби и ОАЭ.' },
      { icon: 'globe', title: 'Многоязычность', description: 'Арабский и английский? Без проблем. Мы создаем безупречный мультиязычный опыт.' },
    ],
    servicesTitle: 'Наши услуги веб-дизайна в Абу-Даби',
    services: [
      { icon: 'building', title: 'Корпоративные сайты', description: 'Профессиональные сайты для устоявшихся компаний, стремящихся укрепить цифровое присутствие в столице ОАЭ.' },
      { icon: 'shopping', title: 'E-Commerce решения', description: 'Интернет-магазины для рынка Абу-Даби — с локальными платежными шлюзами и интеграцией доставки.' },
      { icon: 'file', title: 'Лендинги', description: 'Высококонверсионные посадочные страницы, превращающие посетителей в клиентов.' },
      { icon: 'code', title: 'Веб-приложения', description: 'Индивидуальные веб-приложения для бизнеса, требующего больше, чем стандартный сайт.' },
    ],
    industriesTitle: 'Отрасли, которые мы обслуживаем в Абу-Даби',
    industries: [
      { icon: 'building', name: 'Недвижимость', description: 'Демонстрация объектов с потрясающей визуализацией' },
      { icon: 'landmark', name: 'Финансы и банкинг', description: 'Надежное цифровое присутствие' },
      { icon: 'heart', name: 'Здравоохранение', description: 'Удобные для пациентов сайты' },
      { icon: 'plane', name: 'Гостеприимство и туризм', description: 'Оптимизированные для бронирования решения' },
      { icon: 'briefcase', name: 'Государственный сектор', description: 'Доступные мультиязычные платформы' },
      { icon: 'rocket', name: 'Стартапы и технологии', description: 'Масштабируемые решения для растущих компаний' },
    ],
    processTitle: 'Наш процесс',
    process: [
      { step: '01', title: 'Исследование', description: 'Мы изучаем ваш бизнес, цели и рынок Абу-Даби, на который вы нацелены.' },
      { step: '02', title: 'Стратегия', description: 'Мы создаем дорожную карту, адаптированную к вашим показателям успеха.' },
      { step: '03', title: 'Дизайн и разработка', description: 'Наша команда воплощает ваше видение с пиксельной точностью.' },
      { step: '04', title: 'Запуск и рост', description: 'Мы запускаем проект, отслеживаем производительность и постоянно оптимизируем.' },
    ],
    testimonial: {
      text: 'GoldenWing создал сайт, который идеально отражает наш бренд и превращает посетителей в клиентов. Их понимание рынка ОАЭ исключительно.',
      author: 'Ахмед К.',
      company: 'Property Investment Group, Абу-Даби',
    },
    ctaTitle: 'Готовы поднять ваше цифровое присутствие в Абу-Даби?',
    ctaDescription: 'Давайте обсудим ваш проект. Получите бесплатную консультацию и оценку в течение 24 часов.',
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { question: 'Сколько стоит веб-дизайн в Абу-Даби?', answer: 'Стоимость веб-дизайна в Абу-Даби варьируется в зависимости от сложности. Наши проекты обычно стоят от 15 000 AED за лендинги до 100 000+ AED за сложные e-commerce решения. Свяжитесь с нами для персонального предложения.' },
      { question: 'Сколько времени занимает создание сайта?', answer: 'Большинство сайтов занимают 4-8 недель от концепции до запуска. Сложные проекты могут занять 12+ недель. Мы предоставим детальный график на первичной консультации.' },
      { question: 'Предлагаете ли вы обслуживание сайта?', answer: 'Да, мы предлагаем пакеты обслуживания для поддержания безопасности, скорости и актуальности вашего сайта.' },
      { question: 'Можете ли вы переделать мой существующий сайт?', answer: 'Безусловно. Мы специализируемся на редизайне сайтов, улучшающем как эстетику, так и производительность.' },
      { question: 'Работаете ли вы с компаниями за пределами Абу-Даби?', answer: 'Да, мы обслуживаем клиентов по всем ОАЭ, включая Дубай, Шарджу и другие регионы.' },
    ],
    stats: [
      { value: '90+', label: 'Оценка PageSpeed' },
      { value: '80%', label: 'Мобильных пользователей ОАЭ' },
      { value: '24ч', label: 'Ответ на запрос' },
      { value: '3', label: 'Офиса по всему миру' },
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const hreflangAlternates = getHreflangAlternates('/web-design-abu-dhabi', locale)

  const metaTitle = {
    de: 'Webdesign Abu Dhabi | Preisgekrönte Agentur | GoldenWing',
    en: 'Web Design Abu Dhabi | Award-Winning Agency | GoldenWing',
    ru: 'Веб-дизайн Абу-Даби | Отмеченное наградами агентство | GoldenWing',
  }[locale] ?? 'Web Design Abu Dhabi | Award-Winning Agency | GoldenWing'

  const metaDescription = {
    de: 'Professionelles Webdesign in Abu Dhabi. Wir erstellen beeindruckende, schnelle Websites die Besucher in Kunden verwandeln. Jetzt kostenlos anfragen.',
    en: 'Professional web design in Abu Dhabi. We create stunning, fast websites that convert visitors into customers. German precision meets UAE ambition. Get a free quote today.',
    ru: 'Профессиональный веб-дизайн в Абу-Даби. Мы создаем потрясающие, быстрые сайты, которые превращают посетителей в клиентов. Получите бесплатную оценку сегодня.',
  }[locale] ?? 'Professional web design in Abu Dhabi. We create stunning, fast websites that convert visitors into customers. German precision meets UAE ambition. Get a free quote today.'

  const keywords = {
    de: ['webdesign abu dhabi', 'website design abu dhabi', 'webentwicklung abu dhabi', 'webagentur abu dhabi'],
    en: ['web design abu dhabi', 'website design abu dhabi', 'web development abu dhabi', 'web design agency abu dhabi', 'website development abu dhabi', 'best web design company abu dhabi'],
    ru: ['веб-дизайн абу-даби', 'создание сайтов абу-даби', 'разработка сайтов абу-даби', 'веб-агентство абу-даби', 'веб-дизайн оаэ'],
  }[locale] ?? ['web design abu dhabi', 'website design abu dhabi', 'web development abu dhabi']

  const ogTitle = {
    de: 'Webdesign Abu Dhabi | GoldenWing Creative Studios',
    en: 'Web Design Abu Dhabi | GoldenWing Creative Studios',
    ru: 'Веб-дизайн Абу-Даби | GoldenWing Creative Studios',
  }[locale] ?? 'Web Design Abu Dhabi | GoldenWing Creative Studios'

  const ogLocale = {
    de: 'de_AT',
    en: 'en_AE',
    ru: 'ru_RU',
  }[locale] ?? 'en_AE'

  return {
    title: metaTitle,
    description: truncateMetaDescription(metaDescription),
    keywords,
    openGraph: {
      title: ogTitle,
      description: truncateMetaDescription(metaDescription),
      url: getCanonicalUrl('/web-design-abu-dhabi', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: ogLocale,
      type: 'website',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: truncateMetaDescription(metaDescription),
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/web-design-abu-dhabi', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WebDesignAbuDhabiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = content[locale as 'de' | 'en' | 'ru'] ?? content['en']

  // Structured Data - ProfessionalService
  const structuredDataDescription = {
    de: 'Professionelle Webdesign-Dienstleistungen in Abu Dhabi, VAE',
    en: 'Professional web design services in Abu Dhabi, UAE',
    ru: 'Профессиональные услуги веб-дизайна в Абу-Даби, ОАЭ',
  }[locale] ?? 'Professional web design services in Abu Dhabi, UAE'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'GoldenWing Creative Studios - Web Design Abu Dhabi',
    description: structuredDataDescription,
    url: `https://goldenwing.at/${locale}/web-design-abu-dhabi`,
    logo: 'https://goldenwing.at/logo.png',
    image: 'https://goldenwing.at/images/web-design-abu-dhabi.jpg',
    telephone: '+971-58-514-4360',
    email: 'hello@goldenwing.at',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abu Dhabi',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '24.4539',
      longitude: '54.3773',
    },
    areaServed: [
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    serviceType: [
      'Web Design',
      'Website Development',
      'E-Commerce Development',
      'UI/UX Design',
    ],
    priceRange: 'AED 15,000 - AED 100,000+',
    openingHours: 'Mo-Fr 09:00-18:00',
    sameAs: [
      'https://www.linkedin.com/company/goldenwing-creative-studios/',
      'https://www.instagram.com/goldenwing.at',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{t.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
              {t.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {t.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="tel:+971585144360">
                  {t.ctaSecondary}
                </NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.whyChooseTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.whyChooseItems.map((item) => {
              const IconComponent = iconMap[item.icon] || CheckCircle
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.servicesTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {t.services.map((service) => {
              const IconComponent = iconMap[service.icon] || Code
              return (
                <Card key={service.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.industriesTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {t.industries.map((industry) => {
              const IconComponent = iconMap[industry.icon] || Building2
              return (
                <div key={industry.name} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{industry.name}</h3>
                    <p className="text-sm text-muted-foreground">{industry.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Process - Premium Design */}
      <ProcessTimeline
        title={t.processTitle}
        subtitle={{
          de: 'So arbeiten wir gemeinsam an Ihrem Erfolg.',
          en: 'How we work together for your success.',
          ru: 'Как мы работаем вместе для вашего успеха.',
        }[locale] ?? 'How we work together for your success.'}
        steps={t.process}
      />

      {/* Testimonial */}
      <section className="py-20">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl mb-6 italic">
              &ldquo;{t.testimonial.text}&rdquo;
            </blockquote>
            <div className="text-muted-foreground">
              <span className="font-semibold text-foreground">{t.testimonial.author}</span>
              {' · '}
              {t.testimonial.company}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ - Premium Design */}
      <FAQSection
        title={t.faqTitle}
        subtitle={{
          de: 'Antworten auf häufig gestellte Fragen.',
          en: 'Answers to frequently asked questions.',
          ru: 'Ответы на часто задаваемые вопросы.',
        }[locale] ?? 'Answers to frequently asked questions.'}
        items={t.faqs}
      />

      {/* Internal Links */}
      <section className="py-12 border-t">
        <Container variant="block">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/leistungen/webdesign" className="text-muted-foreground hover:text-primary transition-colors">
              {{ de: 'Webdesign Services', en: 'Web Design Services', ru: 'Услуги веб-дизайна' }[locale] ?? 'Web Design Services'}
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/leistungen/seo-content" className="text-muted-foreground hover:text-primary transition-colors">
              {{ de: 'SEO Services', en: 'SEO Services', ru: 'SEO услуги' }[locale] ?? 'SEO Services'}
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/leistungen/branding" className="text-muted-foreground hover:text-primary transition-colors">
              {{ de: 'Branding Services', en: 'Branding Services', ru: 'Услуги брендинга' }[locale] ?? 'Branding Services'}
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/referenzen" className="text-muted-foreground hover:text-primary transition-colors">
              {{ de: 'Unsere Projekte', en: 'Our Projects', ru: 'Наши проекты' }[locale] ?? 'Our Projects'}
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/webdesign-vae" className="text-muted-foreground hover:text-primary transition-colors">
              {{ de: 'Webdesign VAE', en: 'Web Design UAE', ru: 'Веб-дизайн ОАЭ' }[locale] ?? 'Web Design UAE'}
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <NextLink href={getContactUrl(locale)}>
                {t.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <NextLink href="tel:+971585144360">
                +971 58 514 4360
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
