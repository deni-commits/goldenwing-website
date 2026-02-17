import { Metadata } from 'next'
import NextLink from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n-navigation'
import { getHreflangAlternates, getCanonicalUrl } from '@/lib/utils'
import { FAQSchema, BreadcrumbListSchema, ServiceSchema } from '@/components/seo/json-ld'
import {
  Palette, Sparkles, Eye, Target, Layers, PenTool,
  CheckCircle, ArrowRight, Building2, Award,
  Phone, Crown, MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


// Page data for all languages
const pageData = {
  de: {
    title: 'Branding Agentur Abu Dhabi | Corporate Design & Markenentwicklung',
    description: 'Premium Branding Agentur in Abu Dhabi. Corporate Identity, Logo Design und Markenstrategien für Unternehmen und Regierungsinstitutionen in der UAE.',
    h1: 'Branding Agentur Abu Dhabi',
    subtitle: 'Premium Markenentwicklung für die Hauptstadt der Vereinigten Arabischen Emirate',
    intro: 'Als spezialisierte Branding Agentur in Abu Dhabi entwickeln wir einzigartige Markenidentitäten, die im anspruchsvollen UAE-Markt herausstechen. Von Regierungsinstitutionen bis zu aufstrebenden Startups – wir gestalten Marken, die Vertrauen schaffen.',

    services: [
      {
        icon: 'Crown',
        title: 'Corporate Identity',
        description: 'Vollständige Entwicklung Ihrer Unternehmensidentität – von der Strategie bis zur Umsetzung für den UAE-Markt.',
        features: ['Markenpositionierung', 'Visual Identity', 'Brand Guidelines', 'Tone of Voice']
      },
      {
        icon: 'PenTool',
        title: 'Logo Design',
        description: 'Unverwechselbare Logos, die arabische Ästhetik mit modernem Design verbinden.',
        features: ['Konzeptentwicklung', 'Arabische Kalligraphie', 'Icon Design', 'Responsive Logos']
      },
      {
        icon: 'Layers',
        title: 'Brand Guidelines',
        description: 'Umfassende Markenbücher für konsistente Kommunikation in Arabisch und Englisch.',
        features: ['Style Guides', 'Anwendungsbeispiele', 'Digitale Assets', 'Template Systeme']
      },
      {
        icon: 'Sparkles',
        title: 'Rebranding',
        description: 'Strategische Markenneuausrichtung für etablierte Unternehmen und Institutionen.',
        features: ['Markenaudit', 'Evolutionäres Design', 'Change Management', 'Rollout Planung']
      }
    ],

    stats: [
      { value: '80+', label: 'Marken entwickelt' },
      { value: '15+', label: 'Jahre Erfahrung' },
      { value: 'A-Z', label: 'Full-Service Agentur' },
      { value: '100%', label: 'Kundenzufriedenheit' }
    ],

    industries: [
      'Regierung & Semi-Government',
      'Finanz & Banking',
      'Immobilien & Entwicklung',
      'Energie & Versorgung',
      'Luxus & Premium Brands',
      'Hospitality & Tourism',
      'Healthcare & Pharma',
      'Kultur & Heritage'
    ],

    portfolio: [
      {
        category: 'Government',
        description: 'Markenentwicklung für Abu Dhabi Government Entities mit kultureller Sensibilität'
      },
      {
        category: 'Finance',
        description: 'Premium Banking Brands, die Vertrauen und Innovation kommunizieren'
      },
      {
        category: 'Real Estate',
        description: 'Luxus-Immobilienmarken für den Abu Dhabi Property Market'
      },
      {
        category: 'Startups',
        description: 'Moderne Markenidentitäten für Tech-Unternehmen aus Hub71'
      }
    ],

    process: [
      {
        step: '01',
        title: 'Discovery',
        description: 'Tiefgehende Analyse Ihrer Marke, Zielgruppe und des UAE-Marktes.'
      },
      {
        step: '02',
        title: 'Strategie',
        description: 'Entwicklung der Markenpositionierung und kreativen Ausrichtung.'
      },
      {
        step: '03',
        title: 'Design',
        description: 'Kreative Umsetzung mit iterativen Feedback-Schleifen.'
      },
      {
        step: '04',
        title: 'Implementierung',
        description: 'Rollout aller Markenelemente und Guidelines.'
      }
    ],

    packages: [
      {
        name: 'Startup Brand',
        price: 'ab AED 25.000',
        period: 'einmalig',
        features: [
          'Logo Design (3 Konzepte)',
          'Basis Brand Guidelines',
          'Visitenkarten Design',
          'Social Media Templates',
          'Briefpapier Design',
          '2 Revisionsrunden'
        ],
        popular: false
      },
      {
        name: 'Corporate Brand',
        price: 'ab AED 60.000',
        period: 'einmalig',
        features: [
          'Markenstrategieworkshop',
          'Logo inkl. Arabisch',
          'Vollständige Brand Guidelines',
          'Stationery Suite',
          'Präsentationsvorlagen',
          'Digital Asset Library'
        ],
        popular: true
      },
      {
        name: 'Enterprise Brand',
        price: 'ab AED 150.000',
        period: 'einmalig',
        features: [
          'Vollständige Markenstrategie',
          'Multi-Brand Architecture',
          'Government-Grade Guidelines',
          'Arabic Calligraphy Logo',
          'Brand Management System',
          'Rollout Begleitung'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'Was macht eine gute Marke in Abu Dhabi aus?',
        answer: 'Eine erfolgreiche Marke in Abu Dhabi verbindet lokale kulturelle Werte mit internationaler Professionalität. Sie respektiert emiratische Traditionen, spricht Arabisch und Englisch authentisch an und vermittelt Vertrauen und Innovation gleichermaßen.'
      },
      {
        question: 'Bietet ihr arabisches Logo Design an?',
        answer: 'Ja, wir sind spezialisiert auf zweisprachige Markenidentitäten. Unsere Designer arbeiten mit arabischen Kalligraphie-Experten zusammen, um Logos zu schaffen, die in beiden Sprachen perfekt funktionieren und kulturell angemessen sind.'
      },
      {
        question: 'Wie lange dauert ein Branding-Projekt in Abu Dhabi?',
        answer: 'Ein Startup-Branding dauert typischerweise 4-6 Wochen, ein vollständiges Corporate Branding 8-12 Wochen. Enterprise-Projekte für Regierungsinstitutionen können 3-6 Monate in Anspruch nehmen, abhängig von Genehmigungsprozessen.'
      },
      {
        question: 'Arbeitet ihr mit Abu Dhabi Government Entities?',
        answer: 'Ja, wir haben umfangreiche Erfahrung mit Government und Semi-Government Entities in Abu Dhabi. Wir kennen die spezifischen Anforderungen, Protokolle und Qualitätsstandards für öffentliche Institutionen.'
      },
      {
        question: 'Was ist im Brand Guidelines Paket enthalten?',
        answer: 'Unsere Brand Guidelines umfassen: Logo-Verwendung (Arabisch/Englisch), Farbpalette, Typografie, Bildsprache, Tone of Voice, Anwendungsbeispiele für Print und Digital, Social Media Guidelines und Do\'s & Don\'ts. Alles zweisprachig aufbereitet.'
      }
    ],

    cta: {
      title: 'Kostenlose Markenberatung',
      description: 'Lassen Sie uns über Ihre Marke sprechen. Unverbindliche Erstberatung für Ihr Branding-Projekt in Abu Dhabi.',
      button: 'Beratung vereinbaren',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/branding-agency-dubai', label: 'Branding Dubai' },
      { href: '/abu-dhabi', label: 'Alle Abu Dhabi Services' },
      { href: '/leistungen/webdesign', label: 'Webdesign' },
      { href: '/abu-dhabi/web-design-abu-dhabi', label: 'Webdesign Abu Dhabi' }
    ]
  },

  en: {
    title: 'Branding Agency Abu Dhabi | Corporate Design & Brand Development',
    description: 'Premium branding agency in Abu Dhabi. Corporate identity, logo design and brand strategies for businesses and government institutions in the UAE.',
    h1: 'Branding Agency Abu Dhabi',
    subtitle: 'Premium Brand Development for the Capital of the United Arab Emirates',
    intro: 'As a specialized branding agency in Abu Dhabi, we develop unique brand identities that stand out in the demanding UAE market. From government institutions to emerging startups – we create brands that build trust.',

    services: [
      {
        icon: 'Crown',
        title: 'Corporate Identity',
        description: 'Complete development of your corporate identity – from strategy to implementation for the UAE market.',
        features: ['Brand Positioning', 'Visual Identity', 'Brand Guidelines', 'Tone of Voice']
      },
      {
        icon: 'PenTool',
        title: 'Logo Design',
        description: 'Distinctive logos that combine Arabic aesthetics with modern design.',
        features: ['Concept Development', 'Arabic Calligraphy', 'Icon Design', 'Responsive Logos']
      },
      {
        icon: 'Layers',
        title: 'Brand Guidelines',
        description: 'Comprehensive brand books for consistent communication in Arabic and English.',
        features: ['Style Guides', 'Usage Examples', 'Digital Assets', 'Template Systems']
      },
      {
        icon: 'Sparkles',
        title: 'Rebranding',
        description: 'Strategic brand repositioning for established companies and institutions.',
        features: ['Brand Audit', 'Evolutionary Design', 'Change Management', 'Rollout Planning']
      }
    ],

    stats: [
      { value: '80+', label: 'Brands Developed' },
      { value: '15+', label: 'Years Experience' },
      { value: 'A-Z', label: 'Full-Service Agency' },
      { value: '100%', label: 'Client Satisfaction' }
    ],

    industries: [
      'Government & Semi-Government',
      'Finance & Banking',
      'Real Estate & Development',
      'Energy & Utilities',
      'Luxury & Premium Brands',
      'Hospitality & Tourism',
      'Healthcare & Pharma',
      'Culture & Heritage'
    ],

    portfolio: [
      {
        category: 'Government',
        description: 'Brand development for Abu Dhabi Government Entities with cultural sensitivity'
      },
      {
        category: 'Finance',
        description: 'Premium banking brands communicating trust and innovation'
      },
      {
        category: 'Real Estate',
        description: 'Luxury property brands for the Abu Dhabi property market'
      },
      {
        category: 'Startups',
        description: 'Modern brand identities for tech companies from Hub71'
      }
    ],

    process: [
      {
        step: '01',
        title: 'Discovery',
        description: 'In-depth analysis of your brand, target audience and the UAE market.'
      },
      {
        step: '02',
        title: 'Strategy',
        description: 'Development of brand positioning and creative direction.'
      },
      {
        step: '03',
        title: 'Design',
        description: 'Creative implementation with iterative feedback loops.'
      },
      {
        step: '04',
        title: 'Implementation',
        description: 'Rollout of all brand elements and guidelines.'
      }
    ],

    packages: [
      {
        name: 'Startup Brand',
        price: 'from AED 25,000',
        period: 'one-time',
        features: [
          'Logo Design (3 concepts)',
          'Basic Brand Guidelines',
          'Business Card Design',
          'Social Media Templates',
          'Letterhead Design',
          '2 Revision Rounds'
        ],
        popular: false
      },
      {
        name: 'Corporate Brand',
        price: 'from AED 60,000',
        period: 'one-time',
        features: [
          'Brand Strategy Workshop',
          'Logo incl. Arabic',
          'Complete Brand Guidelines',
          'Stationery Suite',
          'Presentation Templates',
          'Digital Asset Library'
        ],
        popular: true
      },
      {
        name: 'Enterprise Brand',
        price: 'from AED 150,000',
        period: 'one-time',
        features: [
          'Full Brand Strategy',
          'Multi-Brand Architecture',
          'Government-Grade Guidelines',
          'Arabic Calligraphy Logo',
          'Brand Management System',
          'Rollout Support'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'What makes a good brand in Abu Dhabi?',
        answer: 'A successful brand in Abu Dhabi combines local cultural values with international professionalism. It respects Emirati traditions, speaks Arabic and English authentically, and conveys trust and innovation equally.'
      },
      {
        question: 'Do you offer Arabic logo design?',
        answer: 'Yes, we specialize in bilingual brand identities. Our designers work with Arabic calligraphy experts to create logos that work perfectly in both languages and are culturally appropriate.'
      },
      {
        question: 'How long does a branding project take in Abu Dhabi?',
        answer: 'A startup branding typically takes 4-6 weeks, a complete corporate branding 8-12 weeks. Enterprise projects for government institutions can take 3-6 months, depending on approval processes.'
      },
      {
        question: 'Do you work with Abu Dhabi Government Entities?',
        answer: 'Yes, we have extensive experience with Government and Semi-Government Entities in Abu Dhabi. We know the specific requirements, protocols and quality standards for public institutions.'
      },
      {
        question: 'What is included in the Brand Guidelines package?',
        answer: 'Our Brand Guidelines include: logo usage (Arabic/English), color palette, typography, imagery, tone of voice, usage examples for print and digital, social media guidelines and do\'s & don\'ts. All prepared bilingually.'
      }
    ],

    cta: {
      title: 'Free Brand Consultation',
      description: 'Let\'s talk about your brand. No-obligation initial consultation for your branding project in Abu Dhabi.',
      button: 'Schedule Consultation',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/branding-agency-dubai', label: 'Branding Dubai' },
      { href: '/abu-dhabi', label: 'All Abu Dhabi Services' },
      { href: '/leistungen/webdesign', label: 'Web Design' },
      { href: '/abu-dhabi/web-design-abu-dhabi', label: 'Web Design Abu Dhabi' }
    ]
  },

  ru: {
    title: 'Брендинговое агентство Абу-Даби | Корпоративный дизайн и развитие бренда',
    description: 'Премиальное брендинговое агентство в Абу-Даби. Корпоративная идентичность, дизайн логотипов и стратегии бренда для бизнеса и государственных учреждений в ОАЭ.',
    h1: 'Брендинговое агентство Абу-Даби',
    subtitle: 'Премиальное развитие бренда для столицы Объединенных Арабских Эмиратов',
    intro: 'Как специализированное брендинговое агентство в Абу-Даби, мы разрабатываем уникальные бренд-идентичности, которые выделяются на требовательном рынке ОАЭ. От государственных учреждений до развивающихся стартапов – мы создаем бренды, которые вызывают доверие.',

    services: [
      {
        icon: 'Crown',
        title: 'Корпоративная идентичность',
        description: 'Полная разработка корпоративной идентичности – от стратегии до реализации для рынка ОАЭ.',
        features: ['Позиционирование бренда', 'Визуальная идентичность', 'Руководство по бренду', 'Тон коммуникации']
      },
      {
        icon: 'PenTool',
        title: 'Дизайн логотипа',
        description: 'Уникальные логотипы, сочетающие арабскую эстетику с современным дизайном.',
        features: ['Разработка концепции', 'Арабская каллиграфия', 'Дизайн иконок', 'Адаптивные логотипы']
      },
      {
        icon: 'Layers',
        title: 'Руководство по бренду',
        description: 'Комплексные брендбуки для последовательной коммуникации на арабском и английском языках.',
        features: ['Стайл-гайды', 'Примеры использования', 'Цифровые активы', 'Системы шаблонов']
      },
      {
        icon: 'Sparkles',
        title: 'Ребрендинг',
        description: 'Стратегическое репозиционирование бренда для устоявшихся компаний и учреждений.',
        features: ['Аудит бренда', 'Эволюционный дизайн', 'Управление изменениями', 'Планирование запуска']
      }
    ],

    stats: [
      { value: '80+', label: 'Разработанных брендов' },
      { value: '15+', label: 'Лет опыта' },
      { value: 'A-Z', label: 'Агентство полного цикла' },
      { value: '100%', label: 'Удовлетворенность клиентов' }
    ],

    industries: [
      'Государственные и полугосударственные организации',
      'Финансы и банкинг',
      'Недвижимость и девелопмент',
      'Энергетика и коммунальные услуги',
      'Люксовые и премиальные бренды',
      'Гостеприимство и туризм',
      'Здравоохранение и фарма',
      'Культура и наследие'
    ],

    portfolio: [
      {
        category: 'Государственные учреждения',
        description: 'Разработка брендов для государственных структур Абу-Даби с учетом культурной специфики'
      },
      {
        category: 'Финансы',
        description: 'Премиальные банковские бренды, транслирующие доверие и инновации'
      },
      {
        category: 'Недвижимость',
        description: 'Люксовые бренды недвижимости для рынка Абу-Даби'
      },
      {
        category: 'Стартапы',
        description: 'Современные бренд-идентичности для технологических компаний из Hub71'
      }
    ],

    process: [
      {
        step: '01',
        title: 'Исследование',
        description: 'Глубокий анализ вашего бренда, целевой аудитории и рынка ОАЭ.'
      },
      {
        step: '02',
        title: 'Стратегия',
        description: 'Разработка позиционирования бренда и креативного направления.'
      },
      {
        step: '03',
        title: 'Дизайн',
        description: 'Креативная реализация с итеративными циклами обратной связи.'
      },
      {
        step: '04',
        title: 'Внедрение',
        description: 'Запуск всех элементов бренда и руководств.'
      }
    ],

    packages: [
      {
        name: 'Startup Brand',
        price: 'от AED 25 000',
        period: 'единоразово',
        features: [
          'Дизайн логотипа (3 концепции)',
          'Базовое руководство по бренду',
          'Дизайн визиток',
          'Шаблоны для соцсетей',
          'Дизайн фирменного бланка',
          '2 раунда правок'
        ],
        popular: false
      },
      {
        name: 'Corporate Brand',
        price: 'от AED 60 000',
        period: 'единоразово',
        features: [
          'Воркшоп по стратегии бренда',
          'Логотип с арабской версией',
          'Полное руководство по бренду',
          'Комплект деловой документации',
          'Шаблоны презентаций',
          'Библиотека цифровых активов'
        ],
        popular: true
      },
      {
        name: 'Enterprise Brand',
        price: 'от AED 150 000',
        period: 'единоразово',
        features: [
          'Полная стратегия бренда',
          'Мультибрендовая архитектура',
          'Руководство государственного уровня',
          'Логотип с арабской каллиграфией',
          'Система управления брендом',
          'Сопровождение запуска'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'Что делает бренд успешным в Абу-Даби?',
        answer: 'Успешный бренд в Абу-Даби сочетает местные культурные ценности с международным профессионализмом. Он уважает эмиратские традиции, аутентично говорит на арабском и английском языках и одинаково транслирует доверие и инновации.'
      },
      {
        question: 'Предлагаете ли вы дизайн логотипов на арабском?',
        answer: 'Да, мы специализируемся на двуязычных бренд-идентичностях. Наши дизайнеры работают с экспертами по арабской каллиграфии, создавая логотипы, которые идеально работают на обоих языках и соответствуют культурным нормам.'
      },
      {
        question: 'Сколько времени занимает брендинг-проект в Абу-Даби?',
        answer: 'Брендинг для стартапа обычно занимает 4-6 недель, полный корпоративный брендинг – 8-12 недель. Проекты уровня Enterprise для государственных учреждений могут занять 3-6 месяцев в зависимости от процессов согласования.'
      },
      {
        question: 'Работаете ли вы с государственными структурами Абу-Даби?',
        answer: 'Да, у нас обширный опыт работы с государственными и полугосударственными организациями в Абу-Даби. Мы знаем специфические требования, протоколы и стандарты качества для публичных учреждений.'
      },
      {
        question: 'Что входит в пакет Brand Guidelines?',
        answer: 'Наши Brand Guidelines включают: использование логотипа (арабский/английский), цветовую палитру, типографику, визуальный стиль, тон коммуникации, примеры применения для печати и digital, руководства для соцсетей и правила использования. Все подготовлено на двух языках.'
      }
    ],

    cta: {
      title: 'Бесплатная консультация по бренду',
      description: 'Давайте поговорим о вашем бренде. Бесплатная первичная консультация для вашего брендинг-проекта в Абу-Даби.',
      button: 'Записаться на консультацию',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/branding-agency-dubai', label: 'Брендинг Дубай' },
      { href: '/abu-dhabi', label: 'Все услуги Абу-Даби' },
      { href: '/leistungen/webdesign', label: 'Веб-дизайн' },
      { href: '/abu-dhabi/web-design-abu-dhabi', label: 'Веб-дизайн Абу-Даби' }
    ]
  }
}

const iconMap = {
  Crown,
  PenTool,
  Layers,
  Sparkles,
  Palette,
  Eye,
  Target
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const data = pageData[locale as 'de' | 'en' | 'ru'] || pageData.de
  const hreflangAlternates = getHreflangAlternates('/abu-dhabi/branding-abu-dhabi', locale)

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: getCanonicalUrl('/abu-dhabi/branding-abu-dhabi', locale),
      languages: hreflangAlternates.languages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: getCanonicalUrl('/abu-dhabi/branding-abu-dhabi', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: { de: 'de_AT', en: 'en_AE', ru: 'ru_RU' }[locale as 'de' | 'en' | 'ru'] || 'de_AT',
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

export default async function BrandingAbuDhabiPage({
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
    { name: { de: 'Branding Agentur', en: 'Branding Agency', ru: 'Брендинговое агентство' }[locale as 'de' | 'en' | 'ru'] || 'Branding Agentur', url: '/abu-dhabi/branding-abu-dhabi' },
  ]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'GoldenWing 360 - Branding Agency Abu Dhabi',
    description: data.description,
    url: 'https://goldenwing.at/abu-dhabi/branding-abu-dhabi',
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
    priceRange: 'AED 25,000 - AED 200,000+',
    serviceType: 'Branding and Corporate Identity'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <BreadcrumbListSchema items={breadcrumbs} />
      <ServiceSchema
        name={{ de: 'Branding Dienstleistungen Abu Dhabi', en: 'Branding Services Abu Dhabi', ru: 'Услуги брендинга Абу-Даби' }[locale as 'de' | 'en' | 'ru'] || 'Branding Dienstleistungen Abu Dhabi'}
        description={data.description}
        slug="abu-dhabi/branding-abu-dhabi"
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
              {{ de: 'Unsere Branding Leistungen', en: 'Our Branding Services', ru: 'Наши услуги брендинга' }[locale as 'de' | 'en' | 'ru'] || 'Unsere Branding Leistungen'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ de: 'Umfassende Branding-Lösungen für den Abu Dhabi Markt', en: 'Comprehensive branding solutions for the Abu Dhabi market', ru: 'Комплексные брендинговые решения для рынка Абу-Даби' }[locale as 'de' | 'en' | 'ru'] || 'Umfassende Branding-Lösungen für den Abu Dhabi Markt'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data.services.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Palette
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

      {/* Portfolio Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'Unsere Expertise', en: 'Our Expertise', ru: 'Наша экспертиза' }[locale as 'de' | 'en' | 'ru'] || 'Unsere Expertise'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ de: 'Branding-Erfahrung in den wichtigsten Abu Dhabi Sektoren', en: 'Branding experience across key Abu Dhabi sectors', ru: 'Опыт брендинга в ключевых секторах Абу-Даби' }[locale as 'de' | 'en' | 'ru'] || 'Branding-Erfahrung in den wichtigsten Abu Dhabi Sektoren'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.portfolio.map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.category}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {{ de: 'Branchen die wir bedienen', en: 'Industries We Serve', ru: 'Отрасли, которые мы обслуживаем' }[locale as 'de' | 'en' | 'ru'] || 'Branchen die wir bedienen'}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {{ de: 'Abu Dhabis Wirtschaft ist vielfältig und anspruchsvoll. Wir haben Branding-Erfahrung in allen wichtigen Sektoren, von Regierungsinstitutionen bis zu aufstrebenden Tech-Startups.', en: 'Abu Dhabi\'s economy is diverse and sophisticated. We have branding experience across all major sectors, from government institutions to emerging tech startups.', ru: 'Экономика Абу-Даби разнообразна и развита. У нас есть опыт брендинга во всех основных секторах, от государственных учреждений до развивающихся технологических стартапов.' }[locale as 'de' | 'en' | 'ru'] || 'Abu Dhabis Wirtschaft ist vielfältig und anspruchsvoll. Wir haben Branding-Erfahrung in allen wichtigen Sektoren, von Regierungsinstitutionen bis zu aufstrebenden Tech-Startups.'}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {data.industries.map((industry, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <Building2 className="h-5 w-5 text-foreground flex-shrink-0" />
                    <span className="text-sm font-medium">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-muted/50 to-muted/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">
                {{ de: 'Was Abu Dhabi Branding besonders macht', en: 'Why Abu Dhabi Branding is Unique', ru: 'Почему брендинг Абу-Даби уникален' }[locale as 'de' | 'en' | 'ru'] || 'Was Abu Dhabi Branding besonders macht'}
              </h3>
              <ul className="space-y-4">
                {[
                  { de: 'Zweisprachige Design-Anforderungen (AR/EN)', en: 'Bilingual design requirements (Arabic/English)', ru: 'Двуязычные требования к дизайну (AR/EN)' }[locale as 'de' | 'en' | 'ru'] || 'Zweisprachige Design-Anforderungen (AR/EN)',
                  { de: 'Kulturelle Sensibilität und Heritage-Respekt', en: 'Cultural sensitivity and heritage respect', ru: 'Культурная чувствительность и уважение к наследию' }[locale as 'de' | 'en' | 'ru'] || 'Kulturelle Sensibilität und Heritage-Respekt',
                  { de: 'Einhaltung von Regierungsprotokollen', en: 'Government protocol compliance', ru: 'Соблюдение государственных протоколов' }[locale as 'de' | 'en' | 'ru'] || 'Einhaltung von Regierungsprotokollen',
                  { de: 'Premium-Marktpositionierungsstandards', en: 'Premium market positioning standards', ru: 'Стандарты премиального позиционирования' }[locale as 'de' | 'en' | 'ru'] || 'Premium-Marktpositionierungsstandards',
                  { de: 'Vision 2030 Ausrichtung für Government Entities', en: 'Vision 2030 alignment for government entities', ru: 'Соответствие Vision 2030 для государственных структур' }[locale as 'de' | 'en' | 'ru'] || 'Vision 2030 Ausrichtung für Government Entities'
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
              {{ de: 'Unser Branding Prozess', en: 'Our Branding Process', ru: 'Наш процесс брендинга' }[locale as 'de' | 'en' | 'ru'] || 'Unser Branding Prozess'}
            </h2>
            <p className="text-xl text-gold/80 max-w-2xl mx-auto">
              {{ de: 'Eine bewährte Methodik für starke Marken', en: 'A proven methodology for creating powerful brands', ru: 'Проверенная методология создания сильных брендов' }[locale as 'de' | 'en' | 'ru'] || 'Eine bewährte Methodik für starke Marken'}
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'Branding Pakete', en: 'Branding Packages', ru: 'Пакеты брендинга' }[locale as 'de' | 'en' | 'ru'] || 'Branding Pakete'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ de: 'Professionelles Branding zu transparenten Preisen', en: 'Professional branding at transparent prices', ru: 'Профессиональный брендинг по прозрачным ценам' }[locale as 'de' | 'en' | 'ru'] || 'Professionelles Branding zu transparenten Preisen'}
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
                  </div>
                  <div className="text-gray-500">{pkg.period}</div>
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
                      {{ de: 'Angebot anfordern', en: 'Get Quote', ru: 'Запросить цену' }[locale as 'de' | 'en' | 'ru'] || 'Angebot anfordern'}
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {{ de: 'Häufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale as 'de' | 'en' | 'ru'] || 'Häufige Fragen'}
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {{ de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale as 'de' | 'en' | 'ru'] || 'Verwandte Leistungen'}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.relatedLinks.map((link, index) => (
              <NextLink
                key={index}
                href={`/${locale}${link.href}`}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-primary hover:text-foreground transition-colors"
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
