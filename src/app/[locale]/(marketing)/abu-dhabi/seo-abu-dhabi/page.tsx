import { Metadata } from 'next'
import NextLink from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n-navigation'
import { getHreflangAlternates, getCanonicalUrl } from '@/lib/utils'
import { FAQSchema, BreadcrumbListSchema, ServiceSchema } from '@/components/seo/json-ld'
import {
  Search, TrendingUp, MapPin, Globe, BarChart3, Target,
  CheckCircle, ArrowRight, Building2, Award,
  FileText, Zap, Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


// Page data for both languages
const pageData = {
  de: {
    title: 'SEO Agentur Abu Dhabi | Suchmaschinenoptimierung UAE',
    description: 'Professionelle SEO Agentur in Abu Dhabi. Google Rankings verbessern, organischen Traffic steigern und mehr Kunden gewinnen. Lokale SEO Experten für UAE.',
    h1: 'SEO Agentur Abu Dhabi',
    subtitle: 'Höhere Google Rankings & Mehr Organischer Traffic für Ihr Unternehmen in Abu Dhabi',
    intro: 'Als führende SEO Agentur in Abu Dhabi helfen wir Unternehmen, in den Suchergebnissen ganz oben zu stehen. Unsere datengetriebenen SEO-Strategien bringen Ihnen qualifizierten Traffic und messbare Ergebnisse im UAE-Markt.',

    services: [
      {
        icon: 'MapPin',
        title: 'Local SEO Abu Dhabi',
        description: 'Dominieren Sie die lokalen Suchergebnisse in Abu Dhabi. Google Business Profile Optimierung, lokale Citations und Bewertungsmanagement.',
        features: ['Google Business Optimierung', 'Lokale Keyword-Strategie', 'NAP Konsistenz', 'Review Management']
      },
      {
        icon: 'Globe',
        title: 'Internationale SEO',
        description: 'Erreichen Sie Kunden in der gesamten UAE und im GCC-Raum mit mehrsprachiger SEO für Arabisch und Englisch.',
        features: ['Hreflang Setup', 'Arabische SEO', 'GCC Markt Expansion', 'Kulturelle Anpassung']
      },
      {
        icon: 'FileText',
        title: 'Content SEO',
        description: 'Hochwertige, SEO-optimierte Inhalte, die bei Google ranken und Ihre Zielgruppe ansprechen.',
        features: ['Keyword Research', 'Content Strategie', 'Blog Artikel', 'Landing Pages']
      },
      {
        icon: 'Zap',
        title: 'Technische SEO',
        description: 'Technische Optimierung für schnellere Ladezeiten, bessere Indexierung und höhere Rankings.',
        features: ['Core Web Vitals', 'Schema Markup', 'Site Speed', 'Mobile First']
      }
    ],

    stats: [
      { value: '150+', label: 'Erfolgreiche Projekte' },
      { value: '300%', label: 'Durchschn. Traffic-Steigerung' },
      { value: 'Top 3', label: 'Rankings für Hauptkeywords' },
      { value: '24/7', label: 'Ranking Monitoring' }
    ],

    industries: [
      'Regierung & Öffentlicher Sektor',
      'Finanzdienstleistungen',
      'Immobilien Abu Dhabi',
      'Öl & Gas Industrie',
      'Gesundheitswesen',
      'Tourismus & Hospitality',
      'Bildungssektor',
      'Technologie & Startups'
    ],

    process: [
      {
        step: '01',
        title: 'SEO Audit',
        description: 'Umfassende Analyse Ihrer Website, Konkurrenz und Keyword-Potenziale im Abu Dhabi Markt.'
      },
      {
        step: '02',
        title: 'Strategie',
        description: 'Entwicklung einer maßgeschneiderten SEO-Strategie basierend auf Ihren Zielen und Budget.'
      },
      {
        step: '03',
        title: 'Optimierung',
        description: 'On-Page und Off-Page Optimierung, technische Verbesserungen und Content-Erstellung.'
      },
      {
        step: '04',
        title: 'Monitoring',
        description: 'Kontinuierliche Überwachung, Reporting und Anpassung für nachhaltigen Erfolg.'
      }
    ],

    packages: [
      {
        name: 'Local SEO',
        price: 'ab AED 8.000',
        period: '/Monat',
        features: [
          'Google Business Optimierung',
          '20 Keywords Tracking',
          'Monatliche Reports',
          'Lokale Citations',
          'Review Monitoring',
          'Basis On-Page SEO'
        ],
        popular: false
      },
      {
        name: 'Business SEO',
        price: 'ab AED 15.000',
        period: '/Monat',
        features: [
          'Alles aus Local SEO',
          '50 Keywords Tracking',
          'Content Erstellung (4 Artikel)',
          'Technische SEO',
          'Link Building',
          'Wöchentliche Updates'
        ],
        popular: true
      },
      {
        name: 'Enterprise SEO',
        price: 'ab AED 30.000',
        period: '/Monat',
        features: [
          'Alles aus Business SEO',
          'Unbegrenzte Keywords',
          '8+ Artikel pro Monat',
          'Dedizierter SEO Manager',
          'Internationale SEO',
          'Priority Support'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'Wie lange dauert es, SEO Ergebnisse in Abu Dhabi zu sehen?',
        answer: 'SEO ist eine langfristige Strategie. Erste Verbesserungen sind oft nach 3-4 Monaten sichtbar, signifikante Ranking-Verbesserungen nach 6-12 Monaten. Der UAE-Markt ist wettbewerbsintensiv, aber mit der richtigen Strategie erreichen wir nachhaltige Top-Rankings.'
      },
      {
        question: 'Was kostet SEO in Abu Dhabi?',
        answer: 'Unsere SEO-Pakete beginnen bei AED 8.000/Monat für Local SEO. Je nach Wettbewerb, Branche und Zielen variieren die Kosten. Wir erstellen individuelle Angebote basierend auf einem kostenlosen SEO Audit.'
      },
      {
        question: 'Bietet ihr arabische SEO an?',
        answer: 'Ja, wir sind spezialisiert auf mehrsprachige SEO für den UAE-Markt. Unsere arabischen SEO-Experten optimieren Ihre Inhalte für arabischsprachige Nutzer und berücksichtigen kulturelle Besonderheiten bei der Keyword-Recherche.'
      },
      {
        question: 'Wie unterscheidet sich SEO in Abu Dhabi von anderen Märkten?',
        answer: 'Abu Dhabi hat einzigartige Suchgewohnheiten: Hoher Anteil mobiler Suchen, zweisprachige Nutzer (Arabisch/Englisch), starke lokale Suche und spezifische B2G (Business-to-Government) Anforderungen. Unsere lokale Expertise ist hier entscheidend.'
      },
      {
        question: 'Garantiert ihr Rankings?',
        answer: 'Niemand kann Top-Rankings garantieren – Google\'s Algorithmus ändert sich ständig. Was wir garantieren: transparente Arbeit, ethische White-Hat-Methoden und messbare Verbesserungen. Über 90% unserer Kunden erreichen Top-10-Rankings für ihre Hauptkeywords.'
      }
    ],

    cta: {
      title: 'Kostenloses SEO Audit',
      description: 'Erfahren Sie, wie Ihre Website in den Suchergebnissen performt und welches Potenzial Sie haben.',
      button: 'Jetzt Audit anfordern',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/seo-company-dubai', label: 'SEO Dubai' },
      { href: '/abu-dhabi', label: 'Alle Abu Dhabi Services' },
      { href: '/leistungen/seo-content', label: 'SEO Leistungen' },
      { href: '/abu-dhabi/web-design-abu-dhabi', label: 'Webdesign Abu Dhabi' }
    ]
  },

  en: {
    title: 'SEO Agency Abu Dhabi | Search Engine Optimization UAE',
    description: 'Professional SEO agency in Abu Dhabi. Improve Google rankings, increase organic traffic and win more customers. Local SEO experts for UAE businesses.',
    h1: 'SEO Agency Abu Dhabi',
    subtitle: 'Higher Google Rankings & More Organic Traffic for Your Abu Dhabi Business',
    intro: 'As a leading SEO agency in Abu Dhabi, we help businesses reach the top of search results. Our data-driven SEO strategies deliver qualified traffic and measurable results in the UAE market.',

    services: [
      {
        icon: 'MapPin',
        title: 'Local SEO Abu Dhabi',
        description: 'Dominate local search results in Abu Dhabi. Google Business Profile optimization, local citations and review management.',
        features: ['Google Business Optimization', 'Local Keyword Strategy', 'NAP Consistency', 'Review Management']
      },
      {
        icon: 'Globe',
        title: 'International SEO',
        description: 'Reach customers across the UAE and GCC region with multilingual SEO for Arabic and English.',
        features: ['Hreflang Setup', 'Arabic SEO', 'GCC Market Expansion', 'Cultural Adaptation']
      },
      {
        icon: 'FileText',
        title: 'Content SEO',
        description: 'High-quality, SEO-optimized content that ranks on Google and engages your target audience.',
        features: ['Keyword Research', 'Content Strategy', 'Blog Articles', 'Landing Pages']
      },
      {
        icon: 'Zap',
        title: 'Technical SEO',
        description: 'Technical optimization for faster loading times, better indexing and higher rankings.',
        features: ['Core Web Vitals', 'Schema Markup', 'Site Speed', 'Mobile First']
      }
    ],

    stats: [
      { value: '150+', label: 'Successful Projects' },
      { value: '300%', label: 'Avg. Traffic Increase' },
      { value: 'Top 3', label: 'Rankings for Main Keywords' },
      { value: '24/7', label: 'Ranking Monitoring' }
    ],

    industries: [
      'Government & Public Sector',
      'Financial Services',
      'Real Estate Abu Dhabi',
      'Oil & Gas Industry',
      'Healthcare',
      'Tourism & Hospitality',
      'Education Sector',
      'Technology & Startups'
    ],

    process: [
      {
        step: '01',
        title: 'SEO Audit',
        description: 'Comprehensive analysis of your website, competition and keyword potential in the Abu Dhabi market.'
      },
      {
        step: '02',
        title: 'Strategy',
        description: 'Development of a tailored SEO strategy based on your goals and budget.'
      },
      {
        step: '03',
        title: 'Optimization',
        description: 'On-page and off-page optimization, technical improvements and content creation.'
      },
      {
        step: '04',
        title: 'Monitoring',
        description: 'Continuous monitoring, reporting and adjustments for sustainable success.'
      }
    ],

    packages: [
      {
        name: 'Local SEO',
        price: 'from AED 8,000',
        period: '/month',
        features: [
          'Google Business Optimization',
          '20 Keywords Tracking',
          'Monthly Reports',
          'Local Citations',
          'Review Monitoring',
          'Basic On-Page SEO'
        ],
        popular: false
      },
      {
        name: 'Business SEO',
        price: 'from AED 15,000',
        period: '/month',
        features: [
          'Everything in Local SEO',
          '50 Keywords Tracking',
          'Content Creation (4 articles)',
          'Technical SEO',
          'Link Building',
          'Weekly Updates'
        ],
        popular: true
      },
      {
        name: 'Enterprise SEO',
        price: 'from AED 30,000',
        period: '/month',
        features: [
          'Everything in Business SEO',
          'Unlimited Keywords',
          '8+ Articles per Month',
          'Dedicated SEO Manager',
          'International SEO',
          'Priority Support'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'How long does it take to see SEO results in Abu Dhabi?',
        answer: 'SEO is a long-term strategy. Initial improvements are often visible after 3-4 months, significant ranking improvements after 6-12 months. The UAE market is competitive, but with the right strategy, we achieve sustainable top rankings.'
      },
      {
        question: 'How much does SEO cost in Abu Dhabi?',
        answer: 'Our SEO packages start at AED 8,000/month for Local SEO. Costs vary depending on competition, industry and goals. We create individual quotes based on a free SEO audit.'
      },
      {
        question: 'Do you offer Arabic SEO?',
        answer: 'Yes, we specialize in multilingual SEO for the UAE market. Our Arabic SEO experts optimize your content for Arabic-speaking users and consider cultural nuances in keyword research.'
      },
      {
        question: 'How does SEO in Abu Dhabi differ from other markets?',
        answer: 'Abu Dhabi has unique search habits: High share of mobile searches, bilingual users (Arabic/English), strong local search and specific B2G (Business-to-Government) requirements. Our local expertise is crucial here.'
      },
      {
        question: 'Do you guarantee rankings?',
        answer: 'No one can guarantee top rankings – Google\'s algorithm changes constantly. What we guarantee: transparent work, ethical white-hat methods and measurable improvements. Over 90% of our clients achieve top-10 rankings for their main keywords.'
      }
    ],

    cta: {
      title: 'Free SEO Audit',
      description: 'Find out how your website performs in search results and what potential you have.',
      button: 'Request Audit Now',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/seo-company-dubai', label: 'SEO Dubai' },
      { href: '/abu-dhabi', label: 'All Abu Dhabi Services' },
      { href: '/leistungen/seo-content', label: 'SEO Services' },
      { href: '/abu-dhabi/web-design-abu-dhabi', label: 'Web Design Abu Dhabi' }
    ]
  },

  ru: {
    title: 'SEO Агентство Абу-Даби | Поисковая Оптимизация ОАЭ',
    description: 'Профессиональное SEO агентство в Абу-Даби. Улучшение позиций в Google, увеличение органического трафика и привлечение новых клиентов. Локальные SEO эксперты для бизнеса в ОАЭ.',
    h1: 'SEO Агентство Абу-Даби',
    subtitle: 'Высокие Позиции в Google и Больше Органического Трафика для Вашего Бизнеса в Абу-Даби',
    intro: 'Как ведущее SEO агентство в Абу-Даби, мы помогаем компаниям занимать топовые позиции в результатах поиска. Наши стратегии SEO, основанные на данных, обеспечивают качественный трафик и измеримые результаты на рынке ОАЭ.',

    services: [
      {
        icon: 'MapPin',
        title: 'Локальное SEO Абу-Даби',
        description: 'Доминируйте в локальных результатах поиска в Абу-Даби. Оптимизация Google Business Profile, локальные цитирования и управление отзывами.',
        features: ['Оптимизация Google Business', 'Стратегия локальных ключевых слов', 'NAP консистентность', 'Управление отзывами']
      },
      {
        icon: 'Globe',
        title: 'Международное SEO',
        description: 'Охватите клиентов по всем ОАЭ и региону GCC с многоязычным SEO для арабского и английского языков.',
        features: ['Настройка Hreflang', 'Арабское SEO', 'Расширение на рынок GCC', 'Культурная адаптация']
      },
      {
        icon: 'FileText',
        title: 'Контентное SEO',
        description: 'Качественный SEO-оптимизированный контент, который ранжируется в Google и привлекает вашу целевую аудиторию.',
        features: ['Исследование ключевых слов', 'Контент-стратегия', 'Статьи для блога', 'Посадочные страницы']
      },
      {
        icon: 'Zap',
        title: 'Техническое SEO',
        description: 'Техническая оптимизация для быстрой загрузки, лучшей индексации и более высоких позиций.',
        features: ['Core Web Vitals', 'Schema разметка', 'Скорость сайта', 'Mobile First']
      }
    ],

    stats: [
      { value: '150+', label: 'Успешных проектов' },
      { value: '300%', label: 'Средний рост трафика' },
      { value: 'Топ 3', label: 'Позиции по основным ключевым словам' },
      { value: '24/7', label: 'Мониторинг позиций' }
    ],

    industries: [
      'Государственный и публичный сектор',
      'Финансовые услуги',
      'Недвижимость Абу-Даби',
      'Нефтегазовая индустрия',
      'Здравоохранение',
      'Туризм и гостеприимство',
      'Образовательный сектор',
      'Технологии и стартапы'
    ],

    process: [
      {
        step: '01',
        title: 'SEO Аудит',
        description: 'Комплексный анализ вашего сайта, конкурентов и потенциала ключевых слов на рынке Абу-Даби.'
      },
      {
        step: '02',
        title: 'Стратегия',
        description: 'Разработка индивидуальной SEO-стратегии на основе ваших целей и бюджета.'
      },
      {
        step: '03',
        title: 'Оптимизация',
        description: 'On-page и off-page оптимизация, технические улучшения и создание контента.'
      },
      {
        step: '04',
        title: 'Мониторинг',
        description: 'Непрерывный мониторинг, отчетность и корректировки для устойчивого успеха.'
      }
    ],

    packages: [
      {
        name: 'Локальное SEO',
        price: 'от AED 8 000',
        period: '/месяц',
        features: [
          'Оптимизация Google Business',
          'Отслеживание 20 ключевых слов',
          'Ежемесячные отчеты',
          'Локальные цитирования',
          'Мониторинг отзывов',
          'Базовое On-Page SEO'
        ],
        popular: false
      },
      {
        name: 'Бизнес SEO',
        price: 'от AED 15 000',
        period: '/месяц',
        features: [
          'Все из Локального SEO',
          'Отслеживание 50 ключевых слов',
          'Создание контента (4 статьи)',
          'Техническое SEO',
          'Линкбилдинг',
          'Еженедельные обновления'
        ],
        popular: true
      },
      {
        name: 'Корпоративное SEO',
        price: 'от AED 30 000',
        period: '/месяц',
        features: [
          'Все из Бизнес SEO',
          'Неограниченные ключевые слова',
          '8+ статей в месяц',
          'Выделенный SEO менеджер',
          'Международное SEO',
          'Приоритетная поддержка'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'Сколько времени нужно, чтобы увидеть результаты SEO в Абу-Даби?',
        answer: 'SEO — это долгосрочная стратегия. Первые улучшения обычно видны через 3-4 месяца, значительное улучшение позиций — через 6-12 месяцев. Рынок ОАЭ конкурентен, но с правильной стратегией мы достигаем устойчивых топовых позиций.'
      },
      {
        question: 'Сколько стоит SEO в Абу-Даби?',
        answer: 'Наши SEO-пакеты начинаются от AED 8 000/месяц для локального SEO. Стоимость варьируется в зависимости от конкуренции, отрасли и целей. Мы составляем индивидуальные предложения на основе бесплатного SEO аудита.'
      },
      {
        question: 'Предлагаете ли вы SEO на арабском языке?',
        answer: 'Да, мы специализируемся на многоязычном SEO для рынка ОАЭ. Наши эксперты по арабскому SEO оптимизируют ваш контент для арабоязычных пользователей и учитывают культурные нюансы при исследовании ключевых слов.'
      },
      {
        question: 'Чем SEO в Абу-Даби отличается от других рынков?',
        answer: 'Абу-Даби имеет уникальные поисковые привычки: высокая доля мобильных поисков, двуязычные пользователи (арабский/английский), сильный локальный поиск и специфические требования B2G (бизнес-государство). Наша локальная экспертиза здесь имеет решающее значение.'
      },
      {
        question: 'Гарантируете ли вы позиции?',
        answer: 'Никто не может гарантировать топовые позиции — алгоритм Google постоянно меняется. Что мы гарантируем: прозрачную работу, этичные методы белого SEO и измеримые улучшения. Более 90% наших клиентов достигают позиций в топ-10 по своим основным ключевым словам.'
      }
    ],

    cta: {
      title: 'Бесплатный SEO Аудит',
      description: 'Узнайте, как ваш сайт работает в результатах поиска и какой у вас потенциал.',
      button: 'Запросить аудит сейчас',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/seo-company-dubai', label: 'SEO Дубай' },
      { href: '/abu-dhabi', label: 'Все услуги Абу-Даби' },
      { href: '/leistungen/seo-content', label: 'SEO услуги' },
      { href: '/abu-dhabi/web-design-abu-dhabi', label: 'Веб-дизайн Абу-Даби' }
    ]
  }
}

const iconMap = {
  MapPin,
  Globe,
  FileText,
  Zap,
  Search,
  TrendingUp,
  BarChart3,
  Target
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const data = pageData[locale as 'de' | 'en' | 'ru'] || pageData.de
  const hreflangAlternates = getHreflangAlternates('/abu-dhabi/seo-abu-dhabi', locale)
  const ogLocale = { de: 'de_AT', en: 'en_AE', ru: 'ru_RU' }[locale as 'de' | 'en' | 'ru'] || 'de_AT'

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: getCanonicalUrl('/abu-dhabi/seo-abu-dhabi', locale),
      languages: hreflangAlternates.languages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: getCanonicalUrl('/abu-dhabi/seo-abu-dhabi', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: ogLocale,
      type: 'website',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
  }
}

export default async function SEOAbuDhabiPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const data = pageData[locale as 'de' | 'en' | 'ru'] || pageData.de

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale as 'de' | 'en' | 'ru'] || 'Startseite', url: '/' },
    { name: 'Abu Dhabi', url: '/abu-dhabi' },
    { name: { de: 'SEO Agentur', en: 'SEO Agency', ru: 'SEO Агентство' }[locale as 'de' | 'en' | 'ru'] || 'SEO Agentur', url: '/abu-dhabi/seo-abu-dhabi' },
  ]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'GoldenWing 360 - SEO Agency Abu Dhabi',
    description: data.description,
    url: 'https://goldenwing.at/abu-dhabi/seo-abu-dhabi',
    telephone: '+971 50 123 4567',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abu Dhabi',
      addressCountry: 'AE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.4539,
      longitude: 54.3773
    },
    areaServed: [
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'Country', name: 'United Arab Emirates' }
    ],
    priceRange: 'AED 8,000 - AED 50,000+',
    serviceType: 'Search Engine Optimization'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <BreadcrumbListSchema items={breadcrumbs} />
      <ServiceSchema
        name={{ de: 'SEO Dienstleistungen Abu Dhabi', en: 'SEO Services Abu Dhabi', ru: 'SEO Услуги Абу-Даби' }[locale as 'de' | 'en' | 'ru'] || 'SEO Dienstleistungen Abu Dhabi'}
        description={data.description}
        slug="abu-dhabi/seo-abu-dhabi"
      />
      <FAQSchema items={data.faqs} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#1a1a1a] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-gold mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Abu Dhabi, UAE</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {data.h1}
            </h1>
            <p className="text-xl md:text-2xl text-gold/80 mb-4">
              {data.subtitle}
            </p>
            <p className="text-lg text-gold/80 mb-8 max-w-2xl">
              {data.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-foreground hover:bg-muted">
                <Link href="/kontakt" className="flex items-center gap-2">
                  {data.cta.button}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="h-5 w-5 mr-2" />
                {data.cta.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'Unsere SEO Leistungen', en: 'Our SEO Services', ru: 'Наши SEO Услуги' }[locale as 'de' | 'en' | 'ru'] || 'Unsere SEO Leistungen'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ de: 'Umfassende SEO-Lösungen für den Abu Dhabi Markt', en: 'Comprehensive SEO solutions tailored for the Abu Dhabi market', ru: 'Комплексные SEO-решения для рынка Абу-Даби' }[locale as 'de' | 'en' | 'ru'] || 'Umfassende SEO-Lösungen für den Abu Dhabi Markt'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data?.services?.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Search
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <Icon className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-foreground flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {{ de: 'Branchen in Abu Dhabi', en: 'Industries We Serve in Abu Dhabi', ru: 'Отрасли, которые мы обслуживаем в Абу-Даби' }[locale as 'de' | 'en' | 'ru'] || 'Branchen in Abu Dhabi'}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {{ de: 'Als Hauptstadt der UAE hat Abu Dhabi einzigartige SEO-Anforderungen. Wir haben umfangreiche Erfahrung mit Regierungsprojekten, Finanzinstitutionen und dem Energiesektor.', en: 'As the capital of the UAE, Abu Dhabi has unique SEO requirements. We have extensive experience with government projects, financial institutions and the energy sector.', ru: 'Как столица ОАЭ, Абу-Даби имеет уникальные требования к SEO. У нас обширный опыт работы с государственными проектами, финансовыми учреждениями и энергетическим сектором.' }[locale as 'de' | 'en' | 'ru'] || 'Als Hauptstadt der UAE hat Abu Dhabi einzigartige SEO-Anforderungen. Wir haben umfangreiche Erfahrung mit Regierungsprojekten, Finanzinstitutionen und dem Energiesektor.'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {data.industries.map((industry, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Building2 className="h-5 w-5 text-foreground flex-shrink-0" />
                    <span className="text-sm font-medium">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-muted/50 to-muted/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">
                {{ de: 'Warum lokale SEO-Expertise zählt', en: 'Why Local SEO Expertise Matters', ru: 'Почему важна локальная SEO-экспертиза' }[locale as 'de' | 'en' | 'ru'] || 'Warum lokale SEO-Expertise zählt'}
              </h3>
              <ul className="space-y-4">
                {[
                  { de: 'Verständnis für zweisprachiges Suchverhalten (AR/EN)', en: 'Understanding of bilingual search behavior (AR/EN)', ru: 'Понимание двуязычного поискового поведения (AR/EN)' }[locale as 'de' | 'en' | 'ru'] || 'Verständnis für zweisprachiges Suchverhalten (AR/EN)',
                  { de: 'Kenntnis der UAE Regierungs-Ausschreibungsprozesse', en: 'Knowledge of UAE government tender processes', ru: 'Знание процессов государственных тендеров ОАЭ' }[locale as 'de' | 'en' | 'ru'] || 'Kenntnis der UAE Regierungs-Ausschreibungsprozesse',
                  { de: 'Beziehungen zu lokalen Medien und Publishern', en: 'Relationships with local media and publishers', ru: 'Связи с местными СМИ и издателями' }[locale as 'de' | 'en' | 'ru'] || 'Beziehungen zu lokalen Medien und Publishern',
                  { de: 'Kulturelle Sensibilität bei der Content-Erstellung', en: 'Cultural sensitivity in content creation', ru: 'Культурная чувствительность при создании контента' }[locale as 'de' | 'en' | 'ru'] || 'Kulturelle Sensibilität bei der Content-Erstellung',
                  { de: 'Einhaltung der UAE-Vorschriften', en: 'Compliance with UAE regulations', ru: 'Соответствие нормативам ОАЭ' }[locale as 'de' | 'en' | 'ru'] || 'Einhaltung der UAE-Vorschriften'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'Unser SEO Prozess', en: 'Our SEO Process', ru: 'Наш SEO Процесс' }[locale as 'de' | 'en' | 'ru'] || 'Unser SEO Prozess'}
            </h2>
            <p className="text-xl text-gold/80 max-w-2xl mx-auto">
              {{ de: 'Eine bewährte Methodik für nachhaltigen SEO-Erfolg', en: 'A proven methodology for sustainable SEO success', ru: 'Проверенная методология для устойчивого SEO-успеха' }[locale as 'de' | 'en' | 'ru'] || 'Eine bewährte Methodik für nachhaltigen SEO-Erfolg'}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {data.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-gold mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gold/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'SEO Pakete Abu Dhabi', en: 'SEO Packages Abu Dhabi', ru: 'SEO Пакеты Абу-Даби' }[locale as 'de' | 'en' | 'ru'] || 'SEO Pakete Abu Dhabi'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ de: 'Transparente Preise für nachhaltigen SEO-Erfolg', en: 'Transparent pricing for sustainable SEO success', ru: 'Прозрачные цены для устойчивого SEO-успеха' }[locale as 'de' | 'en' | 'ru'] || 'Transparente Preise für nachhaltigen SEO-Erfolg'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative ${pkg.popular ? 'border-primary border-2 shadow-xl' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">
                      {{ de: 'Beliebt', en: 'Most Popular', ru: 'Популярный' }[locale as 'de' | 'en' | 'ru'] || 'Beliebt'}
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-foreground">
                    {pkg.price}
                    <span className="text-lg text-gray-500 font-normal">{pkg.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-foreground flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${pkg.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    <Link href="/kontakt">
                      {{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale as 'de' | 'en' | 'ru'] || 'Jetzt starten'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8">
            {{ de: 'Alle Preise in AED, exkl. MwSt. Individuelle Pakete auf Anfrage.', en: 'All prices in AED, excluding VAT. Custom packages available on request.', ru: 'Все цены в AED, без НДС. Индивидуальные пакеты по запросу.' }[locale as 'de' | 'en' | 'ru'] || 'Alle Preise in AED, exkl. MwSt. Individuelle Pakete auf Anfrage.'}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {{ de: 'Häufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто Задаваемые Вопросы' }[locale as 'de' | 'en' | 'ru'] || 'Häufige Fragen'}
            </h2>
            <div className="space-y-6">
              {data.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.cta.title}</h2>
          <p className="text-xl text-gold/80 mb-8 max-w-2xl mx-auto">
            {data.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-foreground hover:bg-muted">
              <Link href="/kontakt" className="flex items-center gap-2">
                {data.cta.button}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Phone className="h-5 w-5 mr-2" />
              {data.cta.phone}
            </Button>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {{ de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные Услуги' }[locale as 'de' | 'en' | 'ru'] || 'Verwandte Leistungen'}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.relatedLinks.map((link, index) => (
              <NextLink
                key={index}
                href={`/${locale}${link.href}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-foreground transition-colors"
              >
                {link.label}
              </NextLink>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
