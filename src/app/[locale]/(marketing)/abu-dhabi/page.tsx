import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n-navigation'
import { getHreflangAlternates, getCanonicalUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Building2,
  Globe,
  Palette,
  Search,
  ShoppingCart,
  Megaphone,
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Award,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Briefcase,
  Building,
  Plane,
  Banknote,
  GraduationCap,
  Heart
} from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


// Trilingual page data
const pageData = {
  de: {
    title: 'Digitalagentur Abu Dhabi',
    subtitle: 'Webdesign, Branding & SEO in der Hauptstadt der VAE',
    description: 'GoldenWing 360 ist Ihre Full-Service Digitalagentur in Abu Dhabi. Wir bieten Webdesign, Branding, SEO und E-Commerce Lösungen für Unternehmen in der Hauptstadt der VAE.',
    heroTitle: 'Digitalagentur Abu Dhabi',
    heroSubtitle: 'Ihre Full-Service Agentur für Webdesign, Branding & digitales Marketing in der Hauptstadt der VAE',
    heroCta: 'Kostenloses Erstgespräch',
    heroSecondaryCta: 'Unsere Services',

    whyTitle: 'Warum GoldenWing 360 in Abu Dhabi?',
    whySubtitle: 'Wir verbinden europäische Qualitätsstandards mit tiefem Verständnis des VAE-Marktes',
    whyReasons: [
      {
        icon: 'Globe',
        title: 'Internationale Expertise',
        description: 'Europäische Qualität kombiniert mit lokalem Marktverständnis in Abu Dhabi'
      },
      {
        icon: 'Award',
        title: 'Regierungserfahrung',
        description: 'Expertise in der Zusammenarbeit mit Regierungsbehörden und Semi-Government Entities'
      },
      {
        icon: 'Users',
        title: 'Mehrsprachiges Team',
        description: 'Deutsch, Englisch und Arabisch sprechende Experten für nahtlose Kommunikation'
      },
      {
        icon: 'Shield',
        title: 'VAE-Compliance',
        description: 'Vollständige Einhaltung der lokalen Vorschriften und kulturellen Sensibilitäten'
      }
    ],

    servicesTitle: 'Unsere Services in Abu Dhabi',
    servicesSubtitle: 'Umfassende digitale Lösungen für die Hauptstadt der VAE',
    services: [
      {
        icon: 'Globe',
        title: 'Webdesign Abu Dhabi',
        description: 'Professionelles Webdesign für Unternehmen in Abu Dhabi. Corporate Websites, Portfolios und Regierungs-Portale.',
        link: '/leistungen/webdesign',
        features: ['Responsive Design', 'Arabic RTL Support', 'CMS Integration', 'Accessibility']
      },
      {
        icon: 'Search',
        title: 'SEO Abu Dhabi',
        description: 'Suchmaschinenoptimierung für Top-Rankings in Abu Dhabi. Lokales SEO und Content-Strategie.',
        link: '/leistungen/seo-content',
        features: ['Local SEO', 'Technical SEO', 'Content Strategy', 'Link Building']
      },
      {
        icon: 'Palette',
        title: 'Branding Abu Dhabi',
        description: 'Markenentwicklung und Corporate Identity für den prestigeträchtigen Abu Dhabi Markt.',
        link: '/leistungen/branding',
        features: ['Brand Strategy', 'Logo Design', 'Guidelines', 'Rebranding']
      },
      {
        icon: 'ShoppingCart',
        title: 'E-Commerce Abu Dhabi',
        description: 'Online-Shop Entwicklung mit VAE-Zahlungsintegration und lokaler Logistik.',
        link: '/leistungen/webdesign',
        features: ['Shopify', 'WooCommerce', 'Custom Solutions', 'Payment Integration']
      },
      {
        icon: 'Megaphone',
        title: 'Digital Marketing Abu Dhabi',
        description: 'Performance Marketing, Social Media und Lead Generation für Abu Dhabi.',
        link: '/leistungen/digital-marketing',
        features: ['PPC', 'Social Media', 'Content Marketing', 'Analytics']
      },
      {
        icon: 'Building2',
        title: 'App Entwicklung Abu Dhabi',
        description: 'Mobile Apps und Webanwendungen für Unternehmen und Regierungsbehörden.',
        link: '/leistungen/web-app-entwicklung',
        features: ['iOS & Android', 'Web Apps', 'Government Apps', 'Enterprise Solutions']
      }
    ],

    industriesTitle: 'Branchen in Abu Dhabi',
    industriesSubtitle: 'Spezialisiert auf die Schlüsselindustrien der Hauptstadt',
    industries: [
      {
        icon: 'Banknote',
        title: 'Regierung & Öffentlicher Sektor',
        description: 'Digitale Lösungen für Regierungsbehörden, Semi-Government Entities und öffentliche Institutionen.'
      },
      {
        icon: 'Building',
        title: 'Öl & Gas',
        description: 'Webpräsenzen und digitale Plattformen für die führende Öl- und Gasindustrie der VAE.'
      },
      {
        icon: 'Briefcase',
        title: 'Finanzdienstleistungen',
        description: 'Digitale Lösungen für ADGM-basierte Finanzinstitute und Investment-Gesellschaften.'
      },
      {
        icon: 'GraduationCap',
        title: 'Bildung & Forschung',
        description: 'Websites und Portale für Universitäten, Forschungszentren und Bildungseinrichtungen.'
      },
      {
        icon: 'Heart',
        title: 'Gesundheitswesen',
        description: 'Digitale Präsenzen für Krankenhäuser, Kliniken und Healthcare-Startups.'
      },
      {
        icon: 'Plane',
        title: 'Tourismus & Kultur',
        description: 'Websites für Hotels, Kulturinstitutionen und touristische Attraktionen.'
      }
    ],

    locationsTitle: 'Wir betreuen Kunden in ganz Abu Dhabi',
    locationsSubtitle: 'Von der Innenstadt bis zu den Industriezonen',
    locations: [
      'Downtown Abu Dhabi',
      'ADGM (Al Maryah Island)',
      'Yas Island',
      'Saadiyat Island',
      'Khalifa City',
      'Masdar City',
      'Al Reem Island',
      'Mussafah Industrial'
    ],

    processTitle: 'Unser Prozess',
    processSubtitle: 'Von der ersten Idee bis zum Go-Live',
    processSteps: [
      {
        step: '01',
        title: 'Discovery & Strategie',
        description: 'Wir analysieren Ihre Ziele, Zielgruppe und den lokalen Abu Dhabi Markt.'
      },
      {
        step: '02',
        title: 'Konzept & Design',
        description: 'Entwicklung eines maßgeschneiderten Konzepts mit kultureller Sensibilität.'
      },
      {
        step: '03',
        title: 'Entwicklung',
        description: 'Technische Umsetzung mit modernsten Technologien und Best Practices.'
      },
      {
        step: '04',
        title: 'Testing & Launch',
        description: 'Gründliche Tests und erfolgreicher Launch Ihres Projekts.'
      },
      {
        step: '05',
        title: 'Support & Optimierung',
        description: 'Kontinuierliche Betreuung und Optimierung für nachhaltigen Erfolg.'
      }
    ],

    statsTitle: 'GoldenWing 360 in Zahlen',
    stats: [
      { value: '200+', label: 'Projekte weltweit' },
      { value: '15+', label: 'VAE-Kunden' },
      { value: '100%', label: 'Kundenzufriedenheit' },
      { value: '24/7', label: 'Support verfügbar' }
    ],

    faqTitle: 'Häufig gestellte Fragen',
    faqSubtitle: 'Antworten auf Ihre Fragen zur Zusammenarbeit in Abu Dhabi',
    faqs: [
      {
        question: 'Arbeitet GoldenWing 360 mit Regierungsbehörden in Abu Dhabi?',
        answer: 'Ja, wir haben Erfahrung in der Zusammenarbeit mit Regierungsbehörden und Semi-Government Entities in Abu Dhabi. Wir verstehen die besonderen Anforderungen an Sicherheit, Compliance und Barrierefreiheit, die für öffentliche Projekte gelten.'
      },
      {
        question: 'Was unterscheidet Abu Dhabi von Dubai im digitalen Markt?',
        answer: 'Abu Dhabi ist stärker auf Regierung, Öl & Gas und Finanzdienstleistungen fokussiert, während Dubai eher handels- und tourismusorientiert ist. Wir passen unsere Strategien entsprechend an die jeweilige Marktdynamik an.'
      },
      {
        question: 'Bieten Sie arabische Website-Versionen an?',
        answer: 'Ja, wir entwickeln vollständig arabische Websites mit korrekter RTL-Unterstützung (Right-to-Left), arabischer Typografie und kulturell angepasstem Design. Dies ist besonders wichtig für den Abu Dhabi Markt.'
      },
      {
        question: 'Wie lange dauert ein typisches Webprojekt in Abu Dhabi?',
        answer: 'Je nach Projektumfang dauern unsere Projekte zwischen 6-16 Wochen. Corporate Websites typischerweise 8-10 Wochen, komplexe Portale 12-16 Wochen. Wir berücksichtigen dabei auch lokale Feiertage und Geschäftszyklen.'
      },
      {
        question: 'Haben Sie ein Büro in Abu Dhabi?',
        answer: 'Unser Hauptsitz ist in Wien, mit Präsenz in Dubai. Wir betreuen Abu Dhabi-Kunden von Dubai aus und sind für persönliche Meetings in Abu Dhabi jederzeit verfügbar. Viele Kunden schätzen unsere remote-first Arbeitsweise.'
      },
      {
        question: 'Welche Zahlungsmethoden akzeptieren Sie?',
        answer: 'Wir akzeptieren Banküberweisung (SWIFT), Kreditkarte und auch Zahlungen in AED. Für größere Projekte bieten wir flexible Zahlungspläne an, typischerweise 40% bei Projektstart, 40% bei Design-Freigabe und 20% bei Launch.'
      }
    ],

    ctaTitle: 'Starten Sie Ihr Projekt in Abu Dhabi',
    ctaSubtitle: 'Lassen Sie uns gemeinsam Ihre digitale Präsenz in der Hauptstadt der VAE aufbauen.',
    ctaButton: 'Kostenloses Erstgespräch vereinbaren',
    ctaPhone: '+971 50 123 4567',
    ctaEmail: 'abudhabi@goldenwing.at',

    relatedTitle: 'Weitere Standorte',
    relatedLinks: [
      { title: 'Dubai', href: '/dubai', description: 'Digitalagentur in Dubai' },
      { title: 'UAE', href: '/uae', description: 'VAE-weite Services' },
      { title: 'Wien', href: '/standorte/wien', description: 'Unser Hauptsitz' }
    ]
  },
  en: {
    title: 'Digital Agency Abu Dhabi',
    subtitle: 'Web Design, Branding & SEO in the UAE Capital',
    description: 'GoldenWing 360 is your full-service digital agency in Abu Dhabi. We offer web design, branding, SEO and e-commerce solutions for businesses in the UAE capital.',
    heroTitle: 'Digital Agency Abu Dhabi',
    heroSubtitle: 'Your Full-Service Agency for Web Design, Branding & Digital Marketing in the UAE Capital',
    heroCta: 'Free Consultation',
    heroSecondaryCta: 'Our Services',

    whyTitle: 'Why GoldenWing 360 in Abu Dhabi?',
    whySubtitle: 'We combine European quality standards with deep understanding of the UAE market',
    whyReasons: [
      {
        icon: 'Globe',
        title: 'International Expertise',
        description: 'European quality combined with local market understanding in Abu Dhabi'
      },
      {
        icon: 'Award',
        title: 'Government Experience',
        description: 'Expertise in working with government entities and semi-government organizations'
      },
      {
        icon: 'Users',
        title: 'Multilingual Team',
        description: 'German, English and Arabic speaking experts for seamless communication'
      },
      {
        icon: 'Shield',
        title: 'UAE Compliance',
        description: 'Full adherence to local regulations and cultural sensitivities'
      }
    ],

    servicesTitle: 'Our Services in Abu Dhabi',
    servicesSubtitle: 'Comprehensive digital solutions for the UAE capital',
    services: [
      {
        icon: 'Globe',
        title: 'Web Design Abu Dhabi',
        description: 'Professional web design for businesses in Abu Dhabi. Corporate websites, portfolios and government portals.',
        link: '/leistungen/webdesign',
        features: ['Responsive Design', 'Arabic RTL Support', 'CMS Integration', 'Accessibility']
      },
      {
        icon: 'Search',
        title: 'SEO Abu Dhabi',
        description: 'Search engine optimization for top rankings in Abu Dhabi. Local SEO and content strategy.',
        link: '/leistungen/seo-content',
        features: ['Local SEO', 'Technical SEO', 'Content Strategy', 'Link Building']
      },
      {
        icon: 'Palette',
        title: 'Branding Abu Dhabi',
        description: 'Brand development and corporate identity for the prestigious Abu Dhabi market.',
        link: '/leistungen/branding',
        features: ['Brand Strategy', 'Logo Design', 'Guidelines', 'Rebranding']
      },
      {
        icon: 'ShoppingCart',
        title: 'E-Commerce Abu Dhabi',
        description: 'Online store development with UAE payment integration and local logistics.',
        link: '/leistungen/webdesign',
        features: ['Shopify', 'WooCommerce', 'Custom Solutions', 'Payment Integration']
      },
      {
        icon: 'Megaphone',
        title: 'Digital Marketing Abu Dhabi',
        description: 'Performance marketing, social media and lead generation for Abu Dhabi.',
        link: '/leistungen/digital-marketing',
        features: ['PPC', 'Social Media', 'Content Marketing', 'Analytics']
      },
      {
        icon: 'Building2',
        title: 'App Development Abu Dhabi',
        description: 'Mobile apps and web applications for businesses and government entities.',
        link: '/leistungen/web-app-entwicklung',
        features: ['iOS & Android', 'Web Apps', 'Government Apps', 'Enterprise Solutions']
      }
    ],

    industriesTitle: 'Industries in Abu Dhabi',
    industriesSubtitle: 'Specialized in the capital\'s key industries',
    industries: [
      {
        icon: 'Banknote',
        title: 'Government & Public Sector',
        description: 'Digital solutions for government entities, semi-government organizations and public institutions.'
      },
      {
        icon: 'Building',
        title: 'Oil & Gas',
        description: 'Web presences and digital platforms for the UAE\'s leading oil and gas industry.'
      },
      {
        icon: 'Briefcase',
        title: 'Financial Services',
        description: 'Digital solutions for ADGM-based financial institutions and investment companies.'
      },
      {
        icon: 'GraduationCap',
        title: 'Education & Research',
        description: 'Websites and portals for universities, research centers and educational institutions.'
      },
      {
        icon: 'Heart',
        title: 'Healthcare',
        description: 'Digital presences for hospitals, clinics and healthcare startups.'
      },
      {
        icon: 'Plane',
        title: 'Tourism & Culture',
        description: 'Websites for hotels, cultural institutions and tourist attractions.'
      }
    ],

    locationsTitle: 'We Serve Clients Across Abu Dhabi',
    locationsSubtitle: 'From downtown to industrial zones',
    locations: [
      'Downtown Abu Dhabi',
      'ADGM (Al Maryah Island)',
      'Yas Island',
      'Saadiyat Island',
      'Khalifa City',
      'Masdar City',
      'Al Reem Island',
      'Mussafah Industrial'
    ],

    processTitle: 'Our Process',
    processSubtitle: 'From initial idea to go-live',
    processSteps: [
      {
        step: '01',
        title: 'Discovery & Strategy',
        description: 'We analyze your goals, target audience and the local Abu Dhabi market.'
      },
      {
        step: '02',
        title: 'Concept & Design',
        description: 'Development of a tailored concept with cultural sensitivity.'
      },
      {
        step: '03',
        title: 'Development',
        description: 'Technical implementation with cutting-edge technologies and best practices.'
      },
      {
        step: '04',
        title: 'Testing & Launch',
        description: 'Thorough testing and successful launch of your project.'
      },
      {
        step: '05',
        title: 'Support & Optimization',
        description: 'Continuous support and optimization for sustainable success.'
      }
    ],

    statsTitle: 'GoldenWing 360 by the Numbers',
    stats: [
      { value: '200+', label: 'Projects worldwide' },
      { value: '15+', label: 'UAE clients' },
      { value: '100%', label: 'Client satisfaction' },
      { value: '24/7', label: 'Support available' }
    ],

    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Answers to your questions about working together in Abu Dhabi',
    faqs: [
      {
        question: 'Does GoldenWing 360 work with government entities in Abu Dhabi?',
        answer: 'Yes, we have experience working with government entities and semi-government organizations in Abu Dhabi. We understand the special requirements for security, compliance and accessibility that apply to public projects.'
      },
      {
        question: 'What differentiates Abu Dhabi from Dubai in the digital market?',
        answer: 'Abu Dhabi is more focused on government, oil & gas and financial services, while Dubai is more trade and tourism oriented. We adapt our strategies accordingly to each market dynamic.'
      },
      {
        question: 'Do you offer Arabic website versions?',
        answer: 'Yes, we develop fully Arabic websites with proper RTL support (Right-to-Left), Arabic typography and culturally adapted design. This is particularly important for the Abu Dhabi market.'
      },
      {
        question: 'How long does a typical web project in Abu Dhabi take?',
        answer: 'Depending on the scope, our projects take between 6-16 weeks. Corporate websites typically 8-10 weeks, complex portals 12-16 weeks. We also consider local holidays and business cycles.'
      },
      {
        question: 'Do you have an office in Abu Dhabi?',
        answer: 'Our headquarters is in Vienna, with presence in Dubai. We serve Abu Dhabi clients from Dubai and are always available for in-person meetings in Abu Dhabi. Many clients appreciate our remote-first approach.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept bank transfer (SWIFT), credit card and also payments in AED. For larger projects we offer flexible payment plans, typically 40% at project start, 40% at design approval and 20% at launch.'
      }
    ],

    ctaTitle: 'Start Your Project in Abu Dhabi',
    ctaSubtitle: 'Let\'s build your digital presence in the UAE capital together.',
    ctaButton: 'Schedule Free Consultation',
    ctaPhone: '+971 50 123 4567',
    ctaEmail: 'abudhabi@goldenwing.at',

    relatedTitle: 'Other Locations',
    relatedLinks: [
      { title: 'Dubai', href: '/dubai', description: 'Digital agency in Dubai' },
      { title: 'UAE', href: '/uae', description: 'UAE-wide services' },
      { title: 'Vienna', href: '/standorte/wien', description: 'Our headquarters' }
    ]
  },
  ru: {
    title: 'Цифровое агентство Абу-Даби',
    subtitle: 'Веб-дизайн, брендинг и SEO в столице ОАЭ',
    description: 'GoldenWing 360 — ваше цифровое агентство полного цикла в Абу-Даби. Мы предлагаем веб-дизайн, брендинг, SEO и e-commerce решения для бизнеса в столице ОАЭ.',
    heroTitle: 'Цифровое агентство Абу-Даби',
    heroSubtitle: 'Ваше агентство полного цикла для веб-дизайна, брендинга и цифрового маркетинга в столице ОАЭ',
    heroCta: 'Бесплатная консультация',
    heroSecondaryCta: 'Наши услуги',

    whyTitle: 'Почему GoldenWing 360 в Абу-Даби?',
    whySubtitle: 'Мы сочетаем европейские стандарты качества с глубоким пониманием рынка ОАЭ',
    whyReasons: [
      {
        icon: 'Globe',
        title: 'Международная экспертиза',
        description: 'Европейское качество в сочетании с пониманием местного рынка Абу-Даби'
      },
      {
        icon: 'Award',
        title: 'Опыт работы с государством',
        description: 'Экспертиза в работе с государственными органами и полугосударственными организациями'
      },
      {
        icon: 'Users',
        title: 'Многоязычная команда',
        description: 'Специалисты, владеющие немецким, английским и арабским языками для бесперебойной коммуникации'
      },
      {
        icon: 'Shield',
        title: 'Соответствие требованиям ОАЭ',
        description: 'Полное соблюдение местных нормативных требований и культурных особенностей'
      }
    ],

    servicesTitle: 'Наши услуги в Абу-Даби',
    servicesSubtitle: 'Комплексные цифровые решения для столицы ОАЭ',
    services: [
      {
        icon: 'Globe',
        title: 'Веб-дизайн Абу-Даби',
        description: 'Профессиональный веб-дизайн для бизнеса в Абу-Даби. Корпоративные сайты, портфолио и государственные порталы.',
        link: '/leistungen/webdesign',
        features: ['Адаптивный дизайн', 'Поддержка арабского RTL', 'Интеграция CMS', 'Доступность']
      },
      {
        icon: 'Search',
        title: 'SEO Абу-Даби',
        description: 'Поисковая оптимизация для топовых позиций в Абу-Даби. Локальное SEO и контент-стратегия.',
        link: '/leistungen/seo-content',
        features: ['Локальное SEO', 'Техническое SEO', 'Контент-стратегия', 'Линкбилдинг']
      },
      {
        icon: 'Palette',
        title: 'Брендинг Абу-Даби',
        description: 'Разработка бренда и корпоративной айдентики для престижного рынка Абу-Даби.',
        link: '/leistungen/branding',
        features: ['Бренд-стратегия', 'Дизайн логотипа', 'Гайдлайны', 'Ребрендинг']
      },
      {
        icon: 'ShoppingCart',
        title: 'E-Commerce Абу-Даби',
        description: 'Разработка интернет-магазинов с интеграцией платежных систем ОАЭ и локальной логистикой.',
        link: '/leistungen/webdesign',
        features: ['Shopify', 'WooCommerce', 'Индивидуальные решения', 'Интеграция платежей']
      },
      {
        icon: 'Megaphone',
        title: 'Цифровой маркетинг Абу-Даби',
        description: 'Перформанс-маркетинг, социальные сети и лидогенерация для Абу-Даби.',
        link: '/leistungen/digital-marketing',
        features: ['PPC', 'Социальные сети', 'Контент-маркетинг', 'Аналитика']
      },
      {
        icon: 'Building2',
        title: 'Разработка приложений Абу-Даби',
        description: 'Мобильные приложения и веб-приложения для бизнеса и государственных организаций.',
        link: '/leistungen/web-app-entwicklung',
        features: ['iOS и Android', 'Веб-приложения', 'Государственные приложения', 'Корпоративные решения']
      }
    ],

    industriesTitle: 'Отрасли в Абу-Даби',
    industriesSubtitle: 'Специализация на ключевых отраслях столицы',
    industries: [
      {
        icon: 'Banknote',
        title: 'Государственный и публичный сектор',
        description: 'Цифровые решения для государственных органов, полугосударственных организаций и публичных институтов.'
      },
      {
        icon: 'Building',
        title: 'Нефть и газ',
        description: 'Веб-присутствие и цифровые платформы для ведущей нефтегазовой отрасли ОАЭ.'
      },
      {
        icon: 'Briefcase',
        title: 'Финансовые услуги',
        description: 'Цифровые решения для финансовых институтов и инвестиционных компаний, базирующихся в ADGM.'
      },
      {
        icon: 'GraduationCap',
        title: 'Образование и исследования',
        description: 'Сайты и порталы для университетов, исследовательских центров и образовательных учреждений.'
      },
      {
        icon: 'Heart',
        title: 'Здравоохранение',
        description: 'Цифровое присутствие для больниц, клиник и healthcare-стартапов.'
      },
      {
        icon: 'Plane',
        title: 'Туризм и культура',
        description: 'Сайты для отелей, культурных учреждений и туристических достопримечательностей.'
      }
    ],

    locationsTitle: 'Мы обслуживаем клиентов по всему Абу-Даби',
    locationsSubtitle: 'От центра города до промышленных зон',
    locations: [
      'Центр Абу-Даби',
      'ADGM (остров Аль-Марьях)',
      'Остров Яс',
      'Остров Саадият',
      'Халифа Сити',
      'Масдар Сити',
      'Остров Аль-Рим',
      'Муссаффа Индастриал'
    ],

    processTitle: 'Наш процесс',
    processSubtitle: 'От первоначальной идеи до запуска',
    processSteps: [
      {
        step: '01',
        title: 'Исследование и стратегия',
        description: 'Мы анализируем ваши цели, целевую аудиторию и местный рынок Абу-Даби.'
      },
      {
        step: '02',
        title: 'Концепция и дизайн',
        description: 'Разработка индивидуальной концепции с учетом культурных особенностей.'
      },
      {
        step: '03',
        title: 'Разработка',
        description: 'Техническая реализация с использованием передовых технологий и лучших практик.'
      },
      {
        step: '04',
        title: 'Тестирование и запуск',
        description: 'Тщательное тестирование и успешный запуск вашего проекта.'
      },
      {
        step: '05',
        title: 'Поддержка и оптимизация',
        description: 'Постоянная поддержка и оптимизация для устойчивого успеха.'
      }
    ],

    statsTitle: 'GoldenWing 360 в цифрах',
    stats: [
      { value: '200+', label: 'Проектов по всему миру' },
      { value: '15+', label: 'Клиентов в ОАЭ' },
      { value: '100%', label: 'Удовлетворенность клиентов' },
      { value: '24/7', label: 'Доступная поддержка' }
    ],

    faqTitle: 'Часто задаваемые вопросы',
    faqSubtitle: 'Ответы на ваши вопросы о сотрудничестве в Абу-Даби',
    faqs: [
      {
        question: 'Работает ли GoldenWing 360 с государственными органами в Абу-Даби?',
        answer: 'Да, у нас есть опыт работы с государственными органами и полугосударственными организациями в Абу-Даби. Мы понимаем особые требования к безопасности, соответствию нормативам и доступности, которые применяются к государственным проектам.'
      },
      {
        question: 'Чем Абу-Даби отличается от Дубая на цифровом рынке?',
        answer: 'Абу-Даби более ориентирован на государственный сектор, нефтегазовую отрасль и финансовые услуги, тогда как Дубай больше сфокусирован на торговле и туризме. Мы адаптируем наши стратегии в соответствии с динамикой каждого рынка.'
      },
      {
        question: 'Предлагаете ли вы арабские версии сайтов?',
        answer: 'Да, мы разрабатываем полностью арабские сайты с правильной поддержкой RTL (справа налево), арабской типографикой и культурно адаптированным дизайном. Это особенно важно для рынка Абу-Даби.'
      },
      {
        question: 'Сколько времени занимает типичный веб-проект в Абу-Даби?',
        answer: 'В зависимости от объема, наши проекты занимают от 6 до 16 недель. Корпоративные сайты обычно 8-10 недель, сложные порталы 12-16 недель. Мы также учитываем местные праздники и бизнес-циклы.'
      },
      {
        question: 'Есть ли у вас офис в Абу-Даби?',
        answer: 'Наша штаб-квартира находится в Вене, с присутствием в Дубае. Мы обслуживаем клиентов Абу-Даби из Дубая и всегда доступны для личных встреч в Абу-Даби. Многие клиенты ценят наш подход remote-first.'
      },
      {
        question: 'Какие способы оплаты вы принимаете?',
        answer: 'Мы принимаем банковский перевод (SWIFT), кредитные карты и платежи в AED. Для крупных проектов мы предлагаем гибкие планы оплаты: обычно 40% при старте проекта, 40% при утверждении дизайна и 20% при запуске.'
      }
    ],

    ctaTitle: 'Начните свой проект в Абу-Даби',
    ctaSubtitle: 'Давайте вместе создадим ваше цифровое присутствие в столице ОАЭ.',
    ctaButton: 'Записаться на бесплатную консультацию',
    ctaPhone: '+971 50 123 4567',
    ctaEmail: 'abudhabi@goldenwing.at',

    relatedTitle: 'Другие локации',
    relatedLinks: [
      { title: 'Дубай', href: '/dubai', description: 'Цифровое агентство в Дубае' },
      { title: 'ОАЭ', href: '/uae', description: 'Услуги по всем ОАЭ' },
      { title: 'Вена', href: '/standorte/wien', description: 'Наша штаб-квартира' }
    ]
  }
}

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const data = pageData[locale as 'de' | 'en' | 'ru'] || pageData.en
  const baseUrl = 'https://goldenwing.at'
  const hreflangAlternates = getHreflangAlternates('/abu-dhabi', locale)

  return {
    title: data.title,
    description: data.description,
    keywords: {
      de: 'Digitalagentur Abu Dhabi, Webdesign Abu Dhabi, SEO Abu Dhabi, Branding Abu Dhabi, Webentwicklung VAE, E-Commerce Abu Dhabi, Digital Marketing Abu Dhabi',
      en: 'digital agency Abu Dhabi, web design Abu Dhabi, SEO Abu Dhabi, branding Abu Dhabi, web development UAE, e-commerce Abu Dhabi, digital marketing Abu Dhabi',
      ru: 'цифровое агентство Абу-Даби, веб-дизайн Абу-Даби, SEO Абу-Даби, брендинг Абу-Даби, веб-разработка ОАЭ, e-commerce Абу-Даби, цифровой маркетинг Абу-Даби'
    }[locale as 'de' | 'en' | 'ru'] || 'digital agency Abu Dhabi, web design Abu Dhabi, SEO Abu Dhabi, branding Abu Dhabi, web development UAE, e-commerce Abu Dhabi, digital marketing Abu Dhabi',
    alternates: {
      canonical: getCanonicalUrl('/abu-dhabi', locale),
      languages: hreflangAlternates.languages
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: getCanonicalUrl('/abu-dhabi', locale),
      siteName: 'GoldenWing 360',
      locale: { de: 'de_AT', en: 'en_AE', ru: 'ru_RU' }[locale as 'de' | 'en' | 'ru'] || 'en_AE',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/og/abu-dhabi-digital-agency.jpg`,
          width: 1200,
          height: 630,
          alt: data.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

// Icon component mapping
const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Globe,
  Award,
  Users,
  Shield,
  Search,
  Palette,
  ShoppingCart,
  Megaphone,
  Building2,
  Building,
  Banknote,
  Briefcase,
  GraduationCap,
  Heart,
  Plane,
  TrendingUp,
  Zap
}

export default async function AbuDhabiPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const data = pageData[locale as 'de' | 'en' | 'ru'] || pageData.en
  const baseUrl = 'https://goldenwing.at'

  // JSON-LD Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/${locale}/abu-dhabi#business`,
    name: 'GoldenWing 360 Abu Dhabi',
    description: data.description,
    url: `${baseUrl}/${locale}/abu-dhabi`,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/images/og/abu-dhabi-digital-agency.jpg`,
    telephone: '+971 50 123 4567',
    email: 'abudhabi@goldenwing.at',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abu Dhabi',
      addressRegion: 'Abu Dhabi',
      addressCountry: 'AE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.4539,
      longitude: 54.3773
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Abu Dhabi',
        '@id': 'https://www.wikidata.org/wiki/Q5036'
      },
      {
        '@type': 'Country',
        name: 'United Arab Emirates'
      }
    ],
    serviceType: [
      'Web Design',
      'SEO Services',
      'Branding',
      'E-commerce Development',
      'Digital Marketing',
      'App Development'
    ],
    priceRange: 'AED 15,000 - AED 200,000',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    sameAs: [
      'https://www.linkedin.com/company/goldenwing360',
      'https://www.instagram.com/goldenwing360'
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'GoldenWing 360',
      url: 'https://goldenwing.at'
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${locale}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Abu Dhabi',
        item: `${baseUrl}/${locale}/abu-dhabi`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <span className="text-foreground">Abu Dhabi</span>
              </nav>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {data.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {data.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/kontakt">
                    {data.heroCta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <a href="#services">
                    {data.heroSecondaryCta}
                  </a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>15+ UAE Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Government Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Arabic & RTL Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why GoldenWing Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.whyTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.whySubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {data.whyReasons.map((reason, index) => {
                const Icon = IconMap[reason.icon] || Globe
                return (
                  <div key={index} className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.servicesTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.servicesSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {data.services.map((service, index) => {
                const Icon = IconMap[service.icon] || Globe
                return (
                  <div key={index} className="group bg-background border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.features.map((feature, fIndex) => (
                        <span key={fIndex} className="text-xs bg-muted px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={service.link as '/leistungen/webdesign'}
                      className="inline-flex items-center text-primary hover:underline font-medium"
                    >
                      {{ de: 'Mehr erfahren', en: 'Learn more', ru: 'Подробнее' }[locale as 'de' | 'en' | 'ru']}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.industriesTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.industriesSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.industries.map((industry, index) => {
                const Icon = IconMap[industry.icon] || Building2
                return (
                  <div key={index} className="bg-background rounded-lg p-6 border">
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="text-lg font-semibold mb-2">{industry.title}</h3>
                    <p className="text-muted-foreground text-sm">{industry.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.locationsTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.locationsSubtitle}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {data.locations.map((location, index) => (
                <div key={index} className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{location}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.processTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.processSubtitle}</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {data.processSteps.map((step, index) => (
                <div key={index} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{data.statsTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {data.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.faqTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.faqSubtitle}</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {data.faqs.map((faq, index) => (
                <div key={index} className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.ctaTitle}</h2>
              <p className="text-xl text-muted-foreground mb-8">{data.ctaSubtitle}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/kontakt">
                    {data.ctaButton}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <a href={`https://wa.me/971501234567`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center text-muted-foreground">
                <a href={`tel:${data.ctaPhone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-5 w-5" />
                  {data.ctaPhone}
                </a>
                <a href={`mailto:${data.ctaEmail}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                  {data.ctaEmail}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">{data.relatedTitle}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.relatedLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href as '/dubai'}
                  className="bg-muted hover:bg-muted/80 rounded-lg px-6 py-4 transition-colors"
                >
                  <div className="font-semibold">{link.title}</div>
                  <div className="text-sm text-muted-foreground">{link.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Linking Section */}
        <section className="py-12 bg-muted/30 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-6">
                {{ de: 'Erkunden Sie unsere Services', en: 'Explore Our Services', ru: 'Изучите наши услуги' }[locale as 'de' | 'en' | 'ru']}
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h3 className="font-medium mb-2">{{ de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale as 'de' | 'en' | 'ru']}</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><Link href="/leistungen/webdesign" className="hover:text-primary">{{ de: 'Webdesign', en: 'Web Design', ru: 'Веб-дизайн' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                    <li><Link href="/leistungen/seo-content" className="hover:text-primary">SEO & Content</Link></li>
                    <li><Link href="/leistungen/branding" className="hover:text-primary">{{ de: 'Branding', en: 'Branding', ru: 'Брендинг' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                    <li><Link href="/leistungen/web-app-entwicklung" className="hover:text-primary">{{ de: 'Web App Entwicklung', en: 'Web App Development', ru: 'Разработка веб-приложений' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{{ de: 'VAE Standorte', en: 'UAE Locations', ru: 'Локации ОАЭ' }[locale as 'de' | 'en' | 'ru']}</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><Link href="/dubai" className="hover:text-primary">{{ de: 'Dubai', en: 'Dubai', ru: 'Дубай' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                    <li><Link href="/sharjah" className="hover:text-primary">{{ de: 'Sharjah', en: 'Sharjah', ru: 'Шарджа' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                    <li><Link href="/uae" className="hover:text-primary">{{ de: 'VAE', en: 'UAE', ru: 'ОАЭ' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                    <li><Link href="/webdesign-dubai" className="hover:text-primary">{{ de: 'Web Design Dubai', en: 'Web Design Dubai', ru: 'Веб-дизайн Дубай' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{{ de: 'Unternehmen', en: 'Company', ru: 'Компания' }[locale as 'de' | 'en' | 'ru']}</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><Link href="/ueber-uns" className="hover:text-primary">{{ de: 'Über uns', en: 'About us', ru: 'О нас' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                    <li><Link href="/referenzen" className="hover:text-primary">{{ de: 'Projekte', en: 'Projects', ru: 'Проекты' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                    <li><Link href="/kontakt" className="hover:text-primary">{{ de: 'Kontakt', en: 'Contact', ru: 'Контакты' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                    <li><Link href="/blog" className="hover:text-primary">{{ de: 'Blog', en: 'Blog', ru: 'Блог' }[locale as 'de' | 'en' | 'ru']}</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
