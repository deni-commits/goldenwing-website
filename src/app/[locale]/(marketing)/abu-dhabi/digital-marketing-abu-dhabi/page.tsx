import { Metadata } from 'next'
import NextLink from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n-navigation'
import { getHreflangAlternates, getCanonicalUrl } from '@/lib/utils'
import { FAQSchema, BreadcrumbListSchema, ServiceSchema } from '@/components/seo/json-ld'
import {
  Megaphone, Target, TrendingUp, Users, BarChart3, Mail,
  CheckCircle, ArrowRight, Building2, Globe,
  Smartphone, MessageCircle, Phone, MapPin, Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


// Page data for all languages
const pageData = {
  de: {
    title: 'Digital Marketing Agentur Abu Dhabi | Online Marketing UAE',
    description: 'Führende Digital Marketing Agentur in Abu Dhabi. Google Ads, Social Media Marketing, Content Marketing und Performance Marketing für den UAE-Markt.',
    h1: 'Digital Marketing Agentur Abu Dhabi',
    subtitle: 'Datengetriebenes Marketing für messbaren Erfolg in den Emiraten',
    intro: 'Als spezialisierte Digital Marketing Agentur in Abu Dhabi entwickeln wir Marketingstrategien, die im arabischen Markt funktionieren. Von Google Ads über Social Media bis Content Marketing – wir bringen Ihre Marke vor die richtige Zielgruppe.',

    services: [
      {
        icon: 'Target',
        title: 'Google Ads (PPC)',
        description: 'Hochperformante Google Ads Kampagnen für den UAE-Markt mit arabischen und englischen Keywords.',
        features: ['Search Ads', 'Display Ads', 'YouTube Ads', 'Performance Max']
      },
      {
        icon: 'Users',
        title: 'Social Media Marketing',
        description: 'Strategische Präsenz auf den relevanten Plattformen für Abu Dhabi: Instagram, LinkedIn, TikTok.',
        features: ['Content Creation', 'Community Management', 'Paid Social', 'Influencer Marketing']
      },
      {
        icon: 'Mail',
        title: 'Email Marketing',
        description: 'Personalisierte E-Mail-Kampagnen in Arabisch und Englisch für höhere Engagement-Raten.',
        features: ['Newsletter', 'Automation', 'Segmentierung', 'A/B Testing']
      },
      {
        icon: 'Video',
        title: 'Video Marketing',
        description: 'Professionelle Video-Produktion und YouTube-Marketing für maximale Reichweite.',
        features: ['Video Produktion', 'YouTube Ads', 'Reels & TikTok', 'Video SEO']
      }
    ],

    stats: [
      { value: 'AED 50M+', label: 'Ad Spend verwaltet' },
      { value: '350%', label: 'Durchschn. ROAS' },
      { value: '100+', label: 'Aktive Kunden' },
      { value: '5+', label: 'Jahre UAE Erfahrung' }
    ],

    channels: [
      { name: 'Google Ads', share: '35%', description: 'Höchste Kaufabsicht' },
      { name: 'Instagram', share: '28%', description: 'Beste Engagement-Raten in UAE' },
      { name: 'LinkedIn', share: '20%', description: 'B2B Lead Generation' },
      { name: 'TikTok', share: '17%', description: 'Schnellstes Wachstum' }
    ],

    industries: [
      'Immobilien & Entwicklung',
      'Finanzdienstleistungen',
      'Luxus & Premium Brands',
      'E-Commerce & Retail',
      'Hospitality & Tourism',
      'Healthcare & Wellness',
      'Education & Training',
      'Government & Public Sector'
    ],

    process: [
      {
        step: '01',
        title: 'Audit & Strategie',
        description: 'Analyse Ihrer aktuellen Marketing-Aktivitäten und Entwicklung einer UAE-spezifischen Strategie.'
      },
      {
        step: '02',
        title: 'Setup & Launch',
        description: 'Einrichtung aller Kampagnen, Tracking-Systeme und Reporting-Dashboards.'
      },
      {
        step: '03',
        title: 'Optimierung',
        description: 'Kontinuierliche Optimierung basierend auf Performance-Daten und A/B-Tests.'
      },
      {
        step: '04',
        title: 'Skalierung',
        description: 'Erfolgreiche Kampagnen skalieren und neue Kanäle erschließen.'
      }
    ],

    packages: [
      {
        name: 'Starter',
        price: 'ab AED 10.000',
        period: '/Monat',
        features: [
          '1-2 Kanäle (Google/Social)',
          'Bis AED 20K Ad Spend',
          'Monatliches Reporting',
          'Basis Targeting',
          'E-Mail Support',
          'Arabisch ODER Englisch'
        ],
        popular: false
      },
      {
        name: 'Growth',
        price: 'ab AED 25.000',
        period: '/Monat',
        features: [
          '3-4 Kanäle',
          'Bis AED 75K Ad Spend',
          'Wöchentliches Reporting',
          'Erweiterte Zielgruppen',
          'Dedizierter Manager',
          'Arabisch UND Englisch'
        ],
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'ab AED 50.000',
        period: '/Monat',
        features: [
          'Alle Kanäle',
          'Unbegrenzter Ad Spend',
          'Real-Time Dashboard',
          'Custom Attribution',
          'Priority Support',
          'Influencer Koordination'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'Welche Social Media Plattformen sind in Abu Dhabi am wichtigsten?',
        answer: 'Instagram ist die führende Plattform in UAE mit über 80% Penetration. LinkedIn ist essenziell für B2B. TikTok wächst am schnellsten, besonders bei der jüngeren Zielgruppe. Snapchat und X (Twitter) haben ebenfalls starke Präsenz. Die Plattformwahl hängt von Ihrer Zielgruppe ab.'
      },
      {
        question: 'Wie viel sollte ich für Digital Marketing in Abu Dhabi budgetieren?',
        answer: 'Für effektives Digital Marketing in Abu Dhabi empfehlen wir ein monatliches Budget von mindestens AED 30.000 (Agenturgebühr + Ad Spend). Premium-Marken und B2B-Unternehmen investieren oft AED 75.000-150.000+. Wir optimieren jeden AED für maximalen ROI.'
      },
      {
        question: 'Bietet ihr arabisches Social Media Marketing an?',
        answer: 'Ja, wir haben native arabische Content Creator und Copywriter im Team. Wir erstellen kultursensiblen Content, der bei arabischsprachigen Zielgruppen authentisch ankommt. Alle Kampagnen können zweisprachig (AR/EN) oder nur arabisch gefahren werden.'
      },
      {
        question: 'Wie messt ihr den Erfolg von Kampagnen?',
        answer: 'Wir setzen auf datengetriebenes Marketing mit klaren KPIs: ROAS (Return on Ad Spend), CAC (Customer Acquisition Cost), Conversion Rate, CTR und Engagement Rates. Sie erhalten transparente Dashboards mit Real-Time-Daten und monatliche Performance-Reviews.'
      },
      {
        question: 'Arbeitet ihr mit Influencern in Abu Dhabi zusammen?',
        answer: 'Ja, wir haben ein Netzwerk von verifizierten Influencern in Abu Dhabi und den gesamten Emiraten. Von Micro-Influencern bis Celebrity-Endorsements koordinieren wir die komplette Kampagne inkl. Briefing, Vertragsverhandlung und Performance-Tracking.'
      }
    ],

    cta: {
      title: 'Kostenloses Marketing Audit',
      description: 'Erfahren Sie, wie Sie Ihre digitale Präsenz in Abu Dhabi verbessern können. Kostenlose Analyse Ihrer aktuellen Marketing-Aktivitäten.',
      button: 'Audit anfordern',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/digital-marketing-agency-dubai', label: 'Digital Marketing Dubai' },
      { href: '/abu-dhabi', label: 'Alle Abu Dhabi Services' },
      { href: '/leistungen/seo-content', label: 'SEO Services' },
      { href: '/abu-dhabi/seo-abu-dhabi', label: 'SEO Abu Dhabi' }
    ]
  },

  en: {
    title: 'Digital Marketing Agency Abu Dhabi | Online Marketing UAE',
    description: 'Leading digital marketing agency in Abu Dhabi. Google Ads, social media marketing, content marketing and performance marketing for the UAE market.',
    h1: 'Digital Marketing Agency Abu Dhabi',
    subtitle: 'Data-Driven Marketing for Measurable Success in the Emirates',
    intro: 'As a specialized digital marketing agency in Abu Dhabi, we develop marketing strategies that work in the Arab market. From Google Ads to social media to content marketing – we put your brand in front of the right audience.',

    services: [
      {
        icon: 'Target',
        title: 'Google Ads (PPC)',
        description: 'High-performance Google Ads campaigns for the UAE market with Arabic and English keywords.',
        features: ['Search Ads', 'Display Ads', 'YouTube Ads', 'Performance Max']
      },
      {
        icon: 'Users',
        title: 'Social Media Marketing',
        description: 'Strategic presence on relevant platforms for Abu Dhabi: Instagram, LinkedIn, TikTok.',
        features: ['Content Creation', 'Community Management', 'Paid Social', 'Influencer Marketing']
      },
      {
        icon: 'Mail',
        title: 'Email Marketing',
        description: 'Personalized email campaigns in Arabic and English for higher engagement rates.',
        features: ['Newsletter', 'Automation', 'Segmentation', 'A/B Testing']
      },
      {
        icon: 'Video',
        title: 'Video Marketing',
        description: 'Professional video production and YouTube marketing for maximum reach.',
        features: ['Video Production', 'YouTube Ads', 'Reels & TikTok', 'Video SEO']
      }
    ],

    stats: [
      { value: 'AED 50M+', label: 'Ad Spend Managed' },
      { value: '350%', label: 'Average ROAS' },
      { value: '100+', label: 'Active Clients' },
      { value: '5+', label: 'Years UAE Experience' }
    ],

    channels: [
      { name: 'Google Ads', share: '35%', description: 'Highest purchase intent' },
      { name: 'Instagram', share: '28%', description: 'Best engagement rates in UAE' },
      { name: 'LinkedIn', share: '20%', description: 'B2B lead generation' },
      { name: 'TikTok', share: '17%', description: 'Fastest growing' }
    ],

    industries: [
      'Real Estate & Development',
      'Financial Services',
      'Luxury & Premium Brands',
      'E-Commerce & Retail',
      'Hospitality & Tourism',
      'Healthcare & Wellness',
      'Education & Training',
      'Government & Public Sector'
    ],

    process: [
      {
        step: '01',
        title: 'Audit & Strategy',
        description: 'Analysis of your current marketing activities and development of a UAE-specific strategy.'
      },
      {
        step: '02',
        title: 'Setup & Launch',
        description: 'Setup of all campaigns, tracking systems and reporting dashboards.'
      },
      {
        step: '03',
        title: 'Optimization',
        description: 'Continuous optimization based on performance data and A/B tests.'
      },
      {
        step: '04',
        title: 'Scaling',
        description: 'Scale successful campaigns and explore new channels.'
      }
    ],

    packages: [
      {
        name: 'Starter',
        price: 'from AED 10,000',
        period: '/month',
        features: [
          '1-2 Channels (Google/Social)',
          'Up to AED 20K Ad Spend',
          'Monthly Reporting',
          'Basic Targeting',
          'Email Support',
          'Arabic OR English'
        ],
        popular: false
      },
      {
        name: 'Growth',
        price: 'from AED 25,000',
        period: '/month',
        features: [
          '3-4 Channels',
          'Up to AED 75K Ad Spend',
          'Weekly Reporting',
          'Advanced Audiences',
          'Dedicated Manager',
          'Arabic AND English'
        ],
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'from AED 50,000',
        period: '/month',
        features: [
          'All Channels',
          'Unlimited Ad Spend',
          'Real-Time Dashboard',
          'Custom Attribution',
          'Priority Support',
          'Influencer Coordination'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'Which social media platforms are most important in Abu Dhabi?',
        answer: 'Instagram is the leading platform in UAE with over 80% penetration. LinkedIn is essential for B2B. TikTok is growing fastest, especially with younger audiences. Snapchat and X (Twitter) also have strong presence. Platform choice depends on your target audience.'
      },
      {
        question: 'How much should I budget for digital marketing in Abu Dhabi?',
        answer: 'For effective digital marketing in Abu Dhabi, we recommend a monthly budget of at least AED 30,000 (agency fee + ad spend). Premium brands and B2B companies often invest AED 75,000-150,000+. We optimize every AED for maximum ROI.'
      },
      {
        question: 'Do you offer Arabic social media marketing?',
        answer: 'Yes, we have native Arabic content creators and copywriters on our team. We create culturally sensitive content that resonates authentically with Arabic-speaking audiences. All campaigns can be run bilingually (AR/EN) or Arabic only.'
      },
      {
        question: 'How do you measure campaign success?',
        answer: 'We focus on data-driven marketing with clear KPIs: ROAS (Return on Ad Spend), CAC (Customer Acquisition Cost), Conversion Rate, CTR and Engagement Rates. You get transparent dashboards with real-time data and monthly performance reviews.'
      },
      {
        question: 'Do you work with influencers in Abu Dhabi?',
        answer: 'Yes, we have a network of verified influencers in Abu Dhabi and across the Emirates. From micro-influencers to celebrity endorsements, we coordinate the complete campaign including briefing, contract negotiation and performance tracking.'
      }
    ],

    cta: {
      title: 'Free Marketing Audit',
      description: 'Find out how you can improve your digital presence in Abu Dhabi. Free analysis of your current marketing activities.',
      button: 'Request Audit',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/digital-marketing-agency-dubai', label: 'Digital Marketing Dubai' },
      { href: '/abu-dhabi', label: 'All Abu Dhabi Services' },
      { href: '/leistungen/seo-content', label: 'SEO Services' },
      { href: '/abu-dhabi/seo-abu-dhabi', label: 'SEO Abu Dhabi' }
    ]
  },

  ru: {
    title: 'Агентство цифрового маркетинга Абу-Даби | Онлайн-маркетинг ОАЭ',
    description: 'Ведущее агентство цифрового маркетинга в Абу-Даби. Google Ads, маркетинг в социальных сетях, контент-маркетинг и перформанс-маркетинг для рынка ОАЭ.',
    h1: 'Агентство цифрового маркетинга Абу-Даби',
    subtitle: 'Маркетинг на основе данных для измеримого успеха в Эмиратах',
    intro: 'Как специализированное агентство цифрового маркетинга в Абу-Даби, мы разрабатываем маркетинговые стратегии, которые работают на арабском рынке. От Google Ads до социальных сетей и контент-маркетинга — мы представляем ваш бренд нужной аудитории.',

    services: [
      {
        icon: 'Target',
        title: 'Google Ads (PPC)',
        description: 'Высокоэффективные рекламные кампании Google Ads для рынка ОАЭ с арабскими и английскими ключевыми словами.',
        features: ['Search Ads', 'Display Ads', 'YouTube Ads', 'Performance Max']
      },
      {
        icon: 'Users',
        title: 'Маркетинг в социальных сетях',
        description: 'Стратегическое присутствие на актуальных платформах для Абу-Даби: Instagram, LinkedIn, TikTok.',
        features: ['Создание контента', 'Управление сообществом', 'Платная реклама', 'Инфлюенсер-маркетинг']
      },
      {
        icon: 'Mail',
        title: 'Email-маркетинг',
        description: 'Персонализированные email-кампании на арабском и английском языках для повышения вовлеченности.',
        features: ['Рассылки', 'Автоматизация', 'Сегментация', 'A/B тестирование']
      },
      {
        icon: 'Video',
        title: 'Видеомаркетинг',
        description: 'Профессиональное производство видео и YouTube-маркетинг для максимального охвата.',
        features: ['Производство видео', 'YouTube Ads', 'Reels и TikTok', 'Видео SEO']
      }
    ],

    stats: [
      { value: 'AED 50M+', label: 'Управляемый рекламный бюджет' },
      { value: '350%', label: 'Средний ROAS' },
      { value: '100+', label: 'Активных клиентов' },
      { value: '5+', label: 'Лет опыта в ОАЭ' }
    ],

    channels: [
      { name: 'Google Ads', share: '35%', description: 'Наивысшее намерение покупки' },
      { name: 'Instagram', share: '28%', description: 'Лучший показатель вовлеченности в ОАЭ' },
      { name: 'LinkedIn', share: '20%', description: 'B2B лидогенерация' },
      { name: 'TikTok', share: '17%', description: 'Самый быстрый рост' }
    ],

    industries: [
      'Недвижимость и девелопмент',
      'Финансовые услуги',
      'Люксовые и премиум-бренды',
      'E-Commerce и ритейл',
      'Гостиничный бизнес и туризм',
      'Здравоохранение и велнес',
      'Образование и обучение',
      'Государственный сектор'
    ],

    process: [
      {
        step: '01',
        title: 'Аудит и стратегия',
        description: 'Анализ ваших текущих маркетинговых активностей и разработка стратегии, специфичной для ОАЭ.'
      },
      {
        step: '02',
        title: 'Настройка и запуск',
        description: 'Настройка всех кампаний, систем отслеживания и дашбордов отчетности.'
      },
      {
        step: '03',
        title: 'Оптимизация',
        description: 'Непрерывная оптимизация на основе данных о производительности и A/B-тестов.'
      },
      {
        step: '04',
        title: 'Масштабирование',
        description: 'Масштабирование успешных кампаний и освоение новых каналов.'
      }
    ],

    packages: [
      {
        name: 'Starter',
        price: 'от AED 10 000',
        period: '/месяц',
        features: [
          '1-2 канала (Google/Social)',
          'До AED 20K рекламный бюджет',
          'Ежемесячная отчетность',
          'Базовый таргетинг',
          'Поддержка по email',
          'Арабский ИЛИ английский'
        ],
        popular: false
      },
      {
        name: 'Growth',
        price: 'от AED 25 000',
        period: '/месяц',
        features: [
          '3-4 канала',
          'До AED 75K рекламный бюджет',
          'Еженедельная отчетность',
          'Расширенные аудитории',
          'Персональный менеджер',
          'Арабский И английский'
        ],
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'от AED 50 000',
        period: '/месяц',
        features: [
          'Все каналы',
          'Неограниченный рекламный бюджет',
          'Дашборд в реальном времени',
          'Пользовательская атрибуция',
          'Приоритетная поддержка',
          'Координация инфлюенсеров'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'Какие социальные сети наиболее важны в Абу-Даби?',
        answer: 'Instagram — ведущая платформа в ОАЭ с проникновением более 80%. LinkedIn незаменим для B2B. TikTok растет быстрее всего, особенно среди молодой аудитории. Snapchat и X (Twitter) также имеют сильное присутствие. Выбор платформы зависит от вашей целевой аудитории.'
      },
      {
        question: 'Сколько нужно планировать на цифровой маркетинг в Абу-Даби?',
        answer: 'Для эффективного цифрового маркетинга в Абу-Даби мы рекомендуем ежемесячный бюджет не менее AED 30 000 (комиссия агентства + рекламный бюджет). Премиум-бренды и B2B-компании часто инвестируют AED 75 000-150 000+. Мы оптимизируем каждый дирхам для максимальной рентабельности.'
      },
      {
        question: 'Предлагаете ли вы маркетинг в социальных сетях на арабском языке?',
        answer: 'Да, в нашей команде есть носители арабского языка — контент-криейторы и копирайтеры. Мы создаем культурно адаптированный контент, который аутентично резонирует с арабоязычной аудиторией. Все кампании могут проводиться на двух языках (AR/EN) или только на арабском.'
      },
      {
        question: 'Как вы измеряете успех кампаний?',
        answer: 'Мы фокусируемся на маркетинге, основанном на данных, с четкими KPI: ROAS (возврат на рекламные расходы), CAC (стоимость привлечения клиента), коэффициент конверсии, CTR и показатели вовлеченности. Вы получаете прозрачные дашборды с данными в реальном времени и ежемесячные обзоры эффективности.'
      },
      {
        question: 'Работаете ли вы с инфлюенсерами в Абу-Даби?',
        answer: 'Да, у нас есть сеть проверенных инфлюенсеров в Абу-Даби и по всем Эмиратам. От микро-инфлюенсеров до знаменитостей — мы координируем полную кампанию, включая бриф, переговоры по контракту и отслеживание эффективности.'
      }
    ],

    cta: {
      title: 'Бесплатный маркетинговый аудит',
      description: 'Узнайте, как улучшить ваше цифровое присутствие в Абу-Даби. Бесплатный анализ ваших текущих маркетинговых активностей.',
      button: 'Запросить аудит',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/digital-marketing-agency-dubai', label: 'Цифровой маркетинг Дубай' },
      { href: '/abu-dhabi', label: 'Все услуги Абу-Даби' },
      { href: '/leistungen/seo-content', label: 'SEO-услуги' },
      { href: '/abu-dhabi/seo-abu-dhabi', label: 'SEO Абу-Даби' }
    ]
  }
}

const iconMap = {
  Target,
  Users,
  Mail,
  Video,
  Megaphone,
  TrendingUp,
  BarChart3,
  Globe,
  MessageCircle,
  Smartphone
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const data = pageData[locale as 'de' | 'en' | 'ru'] || pageData.de
  const hreflangAlternates = getHreflangAlternates('/abu-dhabi/digital-marketing-abu-dhabi', locale)

  const ogLocaleMap: Record<string, string> = {
    en: 'en_AE',
    de: 'de_AT',
    ru: 'ru_RU'
  }

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: getCanonicalUrl('/abu-dhabi/digital-marketing-abu-dhabi', locale),
      languages: hreflangAlternates.languages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: getCanonicalUrl('/abu-dhabi/digital-marketing-abu-dhabi', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: ogLocaleMap[locale] || 'de_AT',
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

export default async function DigitalMarketingAbuDhabiPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const data = pageData[locale as 'de' | 'en' | 'ru'] || pageData.de

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale as 'de' | 'en' | 'ru'] || 'Startseite', url: '/' },
    { name: { de: 'Abu Dhabi', en: 'Abu Dhabi', ru: 'Абу-Даби' }[locale as 'de' | 'en' | 'ru'] || 'Abu Dhabi', url: '/abu-dhabi' },
    { name: { de: 'Digital Marketing', en: 'Digital Marketing', ru: 'Цифровой маркетинг' }[locale as 'de' | 'en' | 'ru'] || 'Digital Marketing', url: '/abu-dhabi/digital-marketing-abu-dhabi' },
  ]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'GoldenWing 360 - Digital Marketing Agency Abu Dhabi',
    description: data.description,
    url: 'https://goldenwing.at/abu-dhabi/digital-marketing-abu-dhabi',
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
    priceRange: 'AED 10,000 - AED 100,000+/month',
    serviceType: 'Digital Marketing'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <BreadcrumbListSchema items={breadcrumbs} />
      <ServiceSchema
        name={{ de: 'Digital Marketing Abu Dhabi', en: 'Digital Marketing Abu Dhabi', ru: 'Цифровой маркетинг Абу-Даби' }[locale as 'de' | 'en' | 'ru'] || 'Digital Marketing Abu Dhabi'}
        description={data.description}
        slug="abu-dhabi/digital-marketing-abu-dhabi"
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
              {{ de: 'Unsere Digital Marketing Leistungen', en: 'Our Digital Marketing Services', ru: 'Наши услуги цифрового маркетинга' }[locale as 'de' | 'en' | 'ru']}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ de: 'Full-Funnel Digital Marketing für den UAE-Markt', en: 'Full-funnel digital marketing for the UAE market', ru: 'Полноценный цифровой маркетинг для рынка ОАЭ' }[locale as 'de' | 'en' | 'ru']}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data?.services?.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Megaphone
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

      {/* Channel Mix Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {{ de: 'UAE Digital Kanal Mix', en: 'UAE Digital Channel Mix', ru: 'Цифровой микс каналов ОАЭ' }[locale as 'de' | 'en' | 'ru']}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {{ de: 'Der richtige Kanal-Mix für Abu Dhabi hängt von Ihrer Zielgruppe ab. Unsere Experten optimieren Ihre Budget-Verteilung basierend auf Daten und Branchen-Benchmarks.', en: 'The right channel mix for Abu Dhabi depends on your target audience. Our experts optimize your budget distribution based on data and industry benchmarks.', ru: 'Правильный микс каналов для Абу-Даби зависит от вашей целевой аудитории. Наши эксперты оптимизируют распределение вашего бюджета на основе данных и отраслевых стандартов.' }[locale as 'de' | 'en' | 'ru']}
              </p>
              <div className="space-y-4">
                {data.channels.map((channel, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{channel.name}</span>
                      <span className="text-foreground font-bold">{channel.share}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: channel.share }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{channel.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-muted/50 to-muted/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">
                {{ de: 'Branchen die wir bedienen', en: 'Industries We Serve', ru: 'Отрасли, которые мы обслуживаем' }[locale as 'de' | 'en' | 'ru']}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {data.industries.map((industry, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <Building2 className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span className="text-sm">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'Unser Marketing Prozess', en: 'Our Marketing Process', ru: 'Наш маркетинговый процесс' }[locale as 'de' | 'en' | 'ru']}
            </h2>
            <p className="text-xl text-gold/80 max-w-2xl mx-auto">
              {{ de: 'Eine bewährte Methodik für Marketing-Erfolg', en: 'A proven methodology for marketing success', ru: 'Проверенная методология для маркетингового успеха' }[locale as 'de' | 'en' | 'ru']}
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
              {{ de: 'Marketing Pakete', en: 'Marketing Packages', ru: 'Маркетинговые пакеты' }[locale as 'de' | 'en' | 'ru']}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ de: 'Flexible Pakete für jedes Budget und Ziel', en: 'Flexible packages for every budget and goal', ru: 'Гибкие пакеты для любого бюджета и цели' }[locale as 'de' | 'en' | 'ru']}
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
                      {{ de: 'Beliebt', en: 'Most Popular', ru: 'Популярный' }[locale as 'de' | 'en' | 'ru']}
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
                      {{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale as 'de' | 'en' | 'ru']}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8">
            {{ de: 'Alle Preise in AED, exkl. MwSt. und Ad Spend. Individuelle Pakete auf Anfrage.', en: 'All prices in AED, excluding VAT and ad spend. Custom packages available on request.', ru: 'Все цены в AED, без учета НДС и рекламного бюджета. Индивидуальные пакеты по запросу.' }[locale as 'de' | 'en' | 'ru']}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {{ de: 'Häufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale as 'de' | 'en' | 'ru']}
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
            {{ de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale as 'de' | 'en' | 'ru']}
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
