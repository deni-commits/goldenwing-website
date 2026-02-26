import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n-navigation'
import { getHreflangAlternates } from '@/lib/utils'
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
  Star,
  Target,
  Rocket
} from 'lucide-react'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


// Trilingual page data
const pageData = {
  de: {
    title: 'Digitalagentur VAE | Webdesign & Marketing in den Vereinigten Arabischen Emiraten',
    subtitle: 'Ihre Full-Service Digitalagentur für alle sieben Emirate',
    description: 'GoldenWing 360 ist Ihre Full-Service Digitalagentur in den VAE. Wir bieten Webdesign, Branding, SEO und digitales Marketing in Dubai, Abu Dhabi, Sharjah und allen Emiraten.',
    heroTitle: 'Digitalagentur VAE',
    heroSubtitle: 'Ihre Full-Service Agentur für Webdesign, Branding & digitales Marketing in allen sieben Emiraten der VAE',
    heroCta: 'Kostenloses Erstgespräch',
    heroSecondaryCta: 'Unsere Standorte',

    whyTitle: 'Warum GoldenWing 360 in den VAE?',
    whySubtitle: 'Europäische Expertise trifft auf lokales Marktverständnis',
    whyReasons: [
      {
        icon: 'Globe',
        title: 'Internationale Standards',
        description: 'Europäische Qualität und Best Practices kombiniert mit VAE-Marktkenntnis'
      },
      {
        icon: 'MapPin',
        title: 'VAE-weit tätig',
        description: 'Betreuung von Kunden in allen sieben Emiraten, von Dubai bis Fujairah'
      },
      {
        icon: 'Users',
        title: 'Kulturelle Kompetenz',
        description: 'Team mit deutsch, englisch und arabisch sprechenden Experten'
      },
      {
        icon: 'Shield',
        title: 'Lokale Compliance',
        description: 'Vollständige Einhaltung aller VAE-Vorschriften und kulturellen Normen'
      },
      {
        icon: 'Zap',
        title: 'Schnelle Lieferung',
        description: 'Effiziente Projektabwicklung mit VAE-Geschäftszeiten im Blick'
      },
      {
        icon: 'Award',
        title: 'Nachgewiesene Erfolge',
        description: 'Erfolgreiche Projekte für führende VAE-Unternehmen und internationale Marken'
      }
    ],

    locationsTitle: 'Unsere Standorte in den VAE',
    locationsSubtitle: 'Wir betreuen Kunden in allen sieben Emiraten',
    locations: [
      {
        name: 'Dubai',
        description: 'Handelszentrum und Hub für Innovation',
        link: '/dubai',
        areas: ['Downtown Dubai', 'DIFC', 'Dubai Marina', 'Business Bay', 'JLT']
      },
      {
        name: 'Abu Dhabi',
        description: 'Hauptstadt und Regierungszentrum',
        link: '/abu-dhabi',
        areas: ['Downtown', 'ADGM', 'Yas Island', 'Saadiyat Island', 'Masdar City']
      },
      {
        name: 'Sharjah',
        description: 'Kulturhauptstadt und Industriezentrum',
        link: '/sharjah',
        areas: ['Al Majaz', 'Sharjah Industrial', 'University City']
      },
      {
        name: 'Ajman',
        description: 'Aufstrebendes Geschäftszentrum',
        link: '/uae',
        areas: ['Ajman Free Zone', 'Al Jurf', 'Industrial Area']
      },
      {
        name: 'Ras Al Khaimah',
        description: 'Industrie und Tourismus',
        link: '/uae',
        areas: ['RAK Free Zone', 'Al Hamra', 'Industrial City']
      },
      {
        name: 'Fujairah',
        description: 'Ostküste und Hafenstadt',
        link: '/uae',
        areas: ['Fujairah Free Zone', 'Port Area']
      },
      {
        name: 'Umm Al Quwain',
        description: 'Wachsender Wirtschaftsstandort',
        link: '/uae',
        areas: ['UAQ Free Zone', 'Industrial Area']
      }
    ],

    servicesTitle: 'Unsere Services in den VAE',
    servicesSubtitle: 'Umfassende digitale Lösungen für den gesamten VAE-Markt',
    services: [
      {
        icon: 'Globe',
        title: 'Webdesign VAE',
        description: 'Professionelles Webdesign für Unternehmen in allen Emiraten. Responsive, mehrsprachig und kulturell angepasst.',
        link: '/leistungen/webdesign',
        features: ['Responsive Design', 'Arabic RTL', 'Mehrsprachig', 'CMS']
      },
      {
        icon: 'Search',
        title: 'SEO VAE',
        description: 'Suchmaschinenoptimierung für Top-Rankings in den VAE. Lokales und nationales SEO.',
        link: '/leistungen/seo-content',
        features: ['Local SEO', 'Technical SEO', 'Content', 'Analytics']
      },
      {
        icon: 'Palette',
        title: 'Branding VAE',
        description: 'Markenentwicklung und Corporate Identity für den prestigeträchtigen VAE-Markt.',
        link: '/leistungen/branding',
        features: ['Brand Strategy', 'Logo', 'Guidelines', 'Rebranding']
      },
      {
        icon: 'ShoppingCart',
        title: 'E-Commerce VAE',
        description: 'Online-Shop Entwicklung mit VAE-Zahlungsintegration und lokaler Logistik.',
        link: '/leistungen/webdesign',
        features: ['Shopify', 'WooCommerce', 'Payments', 'Logistics']
      },
      {
        icon: 'Megaphone',
        title: 'Digital Marketing VAE',
        description: 'Performance Marketing, Social Media und Lead Generation für den VAE-Markt.',
        link: '/leistungen/digital-marketing',
        features: ['PPC', 'Social Media', 'Content', 'Email']
      },
      {
        icon: 'Building2',
        title: 'App Entwicklung VAE',
        description: 'Mobile Apps und Webanwendungen für Unternehmen in den VAE.',
        link: '/leistungen/web-app-entwicklung',
        features: ['iOS', 'Android', 'Web Apps', 'Enterprise']
      }
    ],

    industriesTitle: 'Branchen in den VAE',
    industriesSubtitle: 'Spezialisiert auf die Schlüsselindustrien der Region',
    industries: [
      {
        icon: 'Building',
        title: 'Immobilien & Bau',
        description: 'Digitale Lösungen für Immobilienentwickler, Makler und Bauunternehmen.'
      },
      {
        icon: 'ShoppingCart',
        title: 'E-Commerce & Retail',
        description: 'Online-Shops und digitale Strategien für den boomenden Einzelhandel.'
      },
      {
        icon: 'Plane',
        title: 'Tourismus & Hospitality',
        description: 'Websites und Marketing für Hotels, Resorts und Tourismusunternehmen.'
      },
      {
        icon: 'Briefcase',
        title: 'Finanzdienstleistungen',
        description: 'Digitale Plattformen für Banken, Investment und Fintech.'
      },
      {
        icon: 'Banknote',
        title: 'Regierung & Öffentlich',
        description: 'E-Government Lösungen und öffentliche Portale.'
      },
      {
        icon: 'TrendingUp',
        title: 'Startups & Tech',
        description: 'MVP-Entwicklung und Skalierung für Tech-Startups.'
      }
    ],

    statsTitle: 'Unsere VAE-Zahlen',
    stats: [
      { value: '200+', label: 'Projekte weltweit' },
      { value: '20+', label: 'VAE-Kunden' },
      { value: '7', label: 'Emirate abgedeckt' },
      { value: '100%', label: 'Kundenzufriedenheit' }
    ],

    advantagesTitle: 'Vorteile der Zusammenarbeit',
    advantagesSubtitle: 'Was uns von lokalen Agenturen unterscheidet',
    advantages: [
      {
        title: 'Europäische Arbeitsweise',
        description: 'Strukturierte Projektplanung, klare Kommunikation und termintreue Lieferung nach europäischen Standards.'
      },
      {
        title: 'Faire Preisgestaltung',
        description: 'Transparente Preise ohne versteckte Kosten. Besseres Preis-Leistungs-Verhältnis als viele lokale Agenturen.'
      },
      {
        title: 'Langfristige Partnerschaft',
        description: 'Wir denken langfristig und unterstützen Sie bei Wartung, Updates und Weiterentwicklung.'
      },
      {
        title: 'Technische Exzellenz',
        description: 'Modernste Technologien und Best Practices für performante, sichere und skalierbare Lösungen.'
      }
    ],

    faqTitle: 'Häufig gestellte Fragen',
    faqSubtitle: 'Antworten auf Ihre Fragen zur Zusammenarbeit in den VAE',
    faqs: [
      {
        question: 'In welchen Emiraten bietet GoldenWing 360 Services an?',
        answer: 'Wir betreuen Kunden in allen sieben Emiraten der VAE: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah und Umm Al Quwain. Unsere Hauptpräsenz liegt in Dubai, aber wir arbeiten auch mit Kunden in den anderen Emiraten zusammen, sowohl remote als auch mit Vor-Ort-Meetings bei Bedarf.'
      },
      {
        question: 'Brauche ich eine lokale VAE-Firma, um mit Ihnen zusammenzuarbeiten?',
        answer: 'Nein, Sie brauchen keine lokale VAE-Firma. Wir arbeiten sowohl mit VAE-registrierten Unternehmen als auch mit internationalen Firmen zusammen, die in den VAE tätig werden möchten. Wir können Sie auch bei der lokalen Registrierung beraten, falls gewünscht.'
      },
      {
        question: 'Bieten Sie arabische Website-Versionen an?',
        answer: 'Ja, wir entwickeln vollständig arabische Websites mit korrekter RTL-Unterstützung (Right-to-Left), arabischer Typografie und kulturell angepasstem Design. Mehrsprachige Websites (Englisch, Arabisch, Deutsch) sind unsere Spezialität.'
      },
      {
        question: 'Wie sind die typischen Projektkosten in den VAE?',
        answer: 'Unsere Projektkosten beginnen bei etwa AED 15.000 für einfache Corporate Websites und reichen bis zu AED 200.000+ für komplexe E-Commerce-Plattformen oder individuelle Webanwendungen. Wir bieten immer transparente Festpreise nach einer detaillierten Analyse Ihrer Anforderungen.'
      },
      {
        question: 'Welche Zahlungsmethoden akzeptieren Sie?',
        answer: 'Wir akzeptieren Banküberweisung (SWIFT), Kreditkarte und auch Zahlungen in AED, EUR oder USD. Für größere Projekte bieten wir flexible Zahlungspläne an, typischerweise 40% bei Projektstart, 40% bei Design-Freigabe und 20% bei Launch.'
      },
      {
        question: 'Haben Sie Erfahrung mit VAE Free Zones?',
        answer: 'Ja, wir haben mit Unternehmen in verschiedenen VAE Free Zones zusammengearbeitet, darunter DIFC, DMCC, JAFZA, ADGM und andere. Wir verstehen die besonderen Anforderungen und Chancen, die Free Zone-Unternehmen bieten.'
      }
    ],

    ctaTitle: 'Starten Sie Ihr VAE-Projekt',
    ctaSubtitle: 'Lassen Sie uns gemeinsam Ihre digitale Präsenz in den Vereinigten Arabischen Emiraten aufbauen.',
    ctaButton: 'Kostenloses Erstgespräch vereinbaren',
    ctaPhone: '+971 50 123 4567',
    ctaEmail: 'uae@goldenwing.at',

    relatedTitle: 'Unsere VAE-Standorte',
    relatedLinks: [
      { title: 'Dubai', href: '/dubai', description: 'Digitalagentur in Dubai' },
      { title: 'Abu Dhabi', href: '/abu-dhabi', description: 'Digitalagentur in Abu Dhabi' },
      { title: 'Wien', href: '/standorte/wien', description: 'Unser Hauptsitz' }
    ]
  },
  en: {
    title: 'Digital Agency UAE | Web Design & Marketing in the United Arab Emirates',
    subtitle: 'Your Full-Service Digital Agency for All Seven Emirates',
    description: 'GoldenWing 360 is your full-service digital agency in the UAE. We offer web design, branding, SEO and digital marketing in Dubai, Abu Dhabi, Sharjah and all Emirates.',
    heroTitle: 'Digital Agency UAE',
    heroSubtitle: 'Your Full-Service Agency for Web Design, Branding & Digital Marketing Across All Seven Emirates',
    heroCta: 'Free Consultation',
    heroSecondaryCta: 'Our Locations',

    whyTitle: 'Why GoldenWing 360 in the UAE?',
    whySubtitle: 'European expertise meets local market understanding',
    whyReasons: [
      {
        icon: 'Globe',
        title: 'International Standards',
        description: 'European quality and best practices combined with UAE market knowledge'
      },
      {
        icon: 'MapPin',
        title: 'UAE-Wide Coverage',
        description: 'Serving clients across all seven Emirates, from Dubai to Fujairah'
      },
      {
        icon: 'Users',
        title: 'Cultural Competence',
        description: 'Team with German, English and Arabic speaking experts'
      },
      {
        icon: 'Shield',
        title: 'Local Compliance',
        description: 'Full adherence to all UAE regulations and cultural norms'
      },
      {
        icon: 'Zap',
        title: 'Fast Delivery',
        description: 'Efficient project management aligned with UAE business hours'
      },
      {
        icon: 'Award',
        title: 'Proven Success',
        description: 'Successful projects for leading UAE companies and international brands'
      }
    ],

    locationsTitle: 'Our Locations in the UAE',
    locationsSubtitle: 'We serve clients across all seven Emirates',
    locations: [
      {
        name: 'Dubai',
        description: 'Commercial hub and center for innovation',
        link: '/dubai',
        areas: ['Downtown Dubai', 'DIFC', 'Dubai Marina', 'Business Bay', 'JLT']
      },
      {
        name: 'Abu Dhabi',
        description: 'Capital and government center',
        link: '/abu-dhabi',
        areas: ['Downtown', 'ADGM', 'Yas Island', 'Saadiyat Island', 'Masdar City']
      },
      {
        name: 'Sharjah',
        description: 'Cultural capital and industrial center',
        link: '/sharjah',
        areas: ['Al Majaz', 'Sharjah Industrial', 'University City']
      },
      {
        name: 'Ajman',
        description: 'Emerging business center',
        link: '/uae',
        areas: ['Ajman Free Zone', 'Al Jurf', 'Industrial Area']
      },
      {
        name: 'Ras Al Khaimah',
        description: 'Industry and tourism',
        link: '/uae',
        areas: ['RAK Free Zone', 'Al Hamra', 'Industrial City']
      },
      {
        name: 'Fujairah',
        description: 'East coast and port city',
        link: '/uae',
        areas: ['Fujairah Free Zone', 'Port Area']
      },
      {
        name: 'Umm Al Quwain',
        description: 'Growing economic location',
        link: '/uae',
        areas: ['UAQ Free Zone', 'Industrial Area']
      }
    ],

    servicesTitle: 'Our Services in the UAE',
    servicesSubtitle: 'Comprehensive digital solutions for the entire UAE market',
    services: [
      {
        icon: 'Globe',
        title: 'Web Design UAE',
        description: 'Professional web design for businesses across all Emirates. Responsive, multilingual and culturally adapted.',
        link: '/leistungen/webdesign',
        features: ['Responsive Design', 'Arabic RTL', 'Multilingual', 'CMS']
      },
      {
        icon: 'Search',
        title: 'SEO UAE',
        description: 'Search engine optimization for top rankings in the UAE. Local and national SEO.',
        link: '/leistungen/seo-content',
        features: ['Local SEO', 'Technical SEO', 'Content', 'Analytics']
      },
      {
        icon: 'Palette',
        title: 'Branding UAE',
        description: 'Brand development and corporate identity for the prestigious UAE market.',
        link: '/leistungen/branding',
        features: ['Brand Strategy', 'Logo', 'Guidelines', 'Rebranding']
      },
      {
        icon: 'ShoppingCart',
        title: 'E-Commerce UAE',
        description: 'Online store development with UAE payment integration and local logistics.',
        link: '/leistungen/webdesign',
        features: ['Shopify', 'WooCommerce', 'Payments', 'Logistics']
      },
      {
        icon: 'Megaphone',
        title: 'Digital Marketing UAE',
        description: 'Performance marketing, social media and lead generation for the UAE market.',
        link: '/leistungen/digital-marketing',
        features: ['PPC', 'Social Media', 'Content', 'Email']
      },
      {
        icon: 'Building2',
        title: 'App Development UAE',
        description: 'Mobile apps and web applications for businesses in the UAE.',
        link: '/leistungen/web-app-entwicklung',
        features: ['iOS', 'Android', 'Web Apps', 'Enterprise']
      }
    ],

    industriesTitle: 'Industries in the UAE',
    industriesSubtitle: 'Specialized in the key industries of the region',
    industries: [
      {
        icon: 'Building',
        title: 'Real Estate & Construction',
        description: 'Digital solutions for property developers, agents and construction companies.'
      },
      {
        icon: 'ShoppingCart',
        title: 'E-Commerce & Retail',
        description: 'Online stores and digital strategies for the booming retail sector.'
      },
      {
        icon: 'Plane',
        title: 'Tourism & Hospitality',
        description: 'Websites and marketing for hotels, resorts and tourism companies.'
      },
      {
        icon: 'Briefcase',
        title: 'Financial Services',
        description: 'Digital platforms for banks, investment and fintech.'
      },
      {
        icon: 'Banknote',
        title: 'Government & Public',
        description: 'E-government solutions and public portals.'
      },
      {
        icon: 'TrendingUp',
        title: 'Startups & Tech',
        description: 'MVP development and scaling for tech startups.'
      }
    ],

    statsTitle: 'Our UAE Numbers',
    stats: [
      { value: '200+', label: 'Projects worldwide' },
      { value: '20+', label: 'UAE clients' },
      { value: '7', label: 'Emirates covered' },
      { value: '100%', label: 'Client satisfaction' }
    ],

    advantagesTitle: 'Advantages of Working With Us',
    advantagesSubtitle: 'What sets us apart from local agencies',
    advantages: [
      {
        title: 'European Work Style',
        description: 'Structured project planning, clear communication and on-time delivery according to European standards.'
      },
      {
        title: 'Fair Pricing',
        description: 'Transparent pricing without hidden costs. Better value than many local agencies.'
      },
      {
        title: 'Long-Term Partnership',
        description: 'We think long-term and support you with maintenance, updates and further development.'
      },
      {
        title: 'Technical Excellence',
        description: 'Cutting-edge technologies and best practices for performant, secure and scalable solutions.'
      }
    ],

    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Answers to your questions about working together in the UAE',
    faqs: [
      {
        question: 'In which Emirates does GoldenWing 360 offer services?',
        answer: 'We serve clients in all seven Emirates of the UAE: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain. Our main presence is in Dubai, but we also work with clients in other Emirates, both remotely and with on-site meetings as needed.'
      },
      {
        question: 'Do I need a local UAE company to work with you?',
        answer: 'No, you don\'t need a local UAE company. We work with both UAE-registered businesses and international companies looking to operate in the UAE. We can also advise you on local registration if desired.'
      },
      {
        question: 'Do you offer Arabic website versions?',
        answer: 'Yes, we develop fully Arabic websites with proper RTL support (Right-to-Left), Arabic typography and culturally adapted design. Multilingual websites (English, Arabic, German) are our specialty.'
      },
      {
        question: 'What are typical project costs in the UAE?',
        answer: 'Our project costs start at around AED 15,000 for simple corporate websites and go up to AED 200,000+ for complex e-commerce platforms or custom web applications. We always offer transparent fixed prices after a detailed analysis of your requirements.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept bank transfer (SWIFT), credit card and payments in AED, EUR or USD. For larger projects we offer flexible payment plans, typically 40% at project start, 40% at design approval and 20% at launch.'
      },
      {
        question: 'Do you have experience with UAE Free Zones?',
        answer: 'Yes, we have worked with companies in various UAE Free Zones, including DIFC, DMCC, JAFZA, ADGM and others. We understand the special requirements and opportunities that Free Zone companies offer.'
      }
    ],

    ctaTitle: 'Start Your UAE Project',
    ctaSubtitle: 'Let\'s build your digital presence across the United Arab Emirates together.',
    ctaButton: 'Schedule Free Consultation',
    ctaPhone: '+971 50 123 4567',
    ctaEmail: 'uae@goldenwing.at',

    relatedTitle: 'Our UAE Locations',
    relatedLinks: [
      { title: 'Dubai', href: '/dubai', description: 'Digital agency in Dubai' },
      { title: 'Abu Dhabi', href: '/abu-dhabi', description: 'Digital agency in Abu Dhabi' },
      { title: 'Vienna', href: '/standorte/wien', description: 'Our headquarters' }
    ]
  },
  ru: {
    title: 'Цифровое агентство ОАЭ | Веб-дизайн и маркетинг в Объединённых Арабских Эмиратах',
    subtitle: 'Ваше агентство полного цикла для всех семи эмиратов',
    description: 'GoldenWing 360 — ваше агентство полного цикла в ОАЭ. Мы предлагаем веб-дизайн, брендинг, SEO и цифровой маркетинг в Дубае, Абу-Даби, Шардже и всех эмиратах.',
    heroTitle: 'Цифровое агентство ОАЭ',
    heroSubtitle: 'Ваше агентство полного цикла по веб-дизайну, брендингу и цифровому маркетингу во всех семи эмиратах ОАЭ',
    heroCta: 'Бесплатная консультация',
    heroSecondaryCta: 'Наши локации',

    whyTitle: 'Почему GoldenWing 360 в ОАЭ?',
    whySubtitle: 'Европейская экспертиза в сочетании с пониманием местного рынка',
    whyReasons: [
      {
        icon: 'Globe',
        title: 'Международные стандарты',
        description: 'Европейское качество и лучшие практики в сочетании со знанием рынка ОАЭ'
      },
      {
        icon: 'MapPin',
        title: 'Охват всех ОАЭ',
        description: 'Обслуживание клиентов во всех семи эмиратах, от Дубая до Фуджейры'
      },
      {
        icon: 'Users',
        title: 'Культурная компетентность',
        description: 'Команда экспертов, говорящих на немецком, английском и арабском языках'
      },
      {
        icon: 'Shield',
        title: 'Местное соответствие',
        description: 'Полное соблюдение всех правил ОАЭ и культурных норм'
      },
      {
        icon: 'Zap',
        title: 'Быстрая доставка',
        description: 'Эффективное управление проектами с учётом рабочих часов ОАЭ'
      },
      {
        icon: 'Award',
        title: 'Доказанный успех',
        description: 'Успешные проекты для ведущих компаний ОАЭ и международных брендов'
      }
    ],

    locationsTitle: 'Наши локации в ОАЭ',
    locationsSubtitle: 'Мы обслуживаем клиентов во всех семи эмиратах',
    locations: [
      {
        name: 'Дубай',
        description: 'Коммерческий центр и хаб инноваций',
        link: '/dubai',
        areas: ['Downtown Dubai', 'DIFC', 'Dubai Marina', 'Business Bay', 'JLT']
      },
      {
        name: 'Абу-Даби',
        description: 'Столица и правительственный центр',
        link: '/abu-dhabi',
        areas: ['Downtown', 'ADGM', 'Yas Island', 'Saadiyat Island', 'Masdar City']
      },
      {
        name: 'Шарджа',
        description: 'Культурная столица и промышленный центр',
        link: '/sharjah',
        areas: ['Al Majaz', 'Sharjah Industrial', 'University City']
      },
      {
        name: 'Аджман',
        description: 'Развивающийся бизнес-центр',
        link: '/uae',
        areas: ['Ajman Free Zone', 'Al Jurf', 'Industrial Area']
      },
      {
        name: 'Рас-эль-Хайма',
        description: 'Промышленность и туризм',
        link: '/uae',
        areas: ['RAK Free Zone', 'Al Hamra', 'Industrial City']
      },
      {
        name: 'Фуджейра',
        description: 'Восточное побережье и портовый город',
        link: '/uae',
        areas: ['Fujairah Free Zone', 'Port Area']
      },
      {
        name: 'Умм-эль-Кайвайн',
        description: 'Растущий экономический центр',
        link: '/uae',
        areas: ['UAQ Free Zone', 'Industrial Area']
      }
    ],

    servicesTitle: 'Наши услуги в ОАЭ',
    servicesSubtitle: 'Комплексные цифровые решения для всего рынка ОАЭ',
    services: [
      {
        icon: 'Globe',
        title: 'Веб-дизайн ОАЭ',
        description: 'Профессиональный веб-дизайн для бизнеса во всех эмиратах. Адаптивный, многоязычный и культурно адаптированный.',
        link: '/leistungen/webdesign',
        features: ['Responsive Design', 'Arabic RTL', 'Многоязычность', 'CMS']
      },
      {
        icon: 'Search',
        title: 'SEO ОАЭ',
        description: 'Поисковая оптимизация для топовых позиций в ОАЭ. Локальное и национальное SEO.',
        link: '/leistungen/seo-content',
        features: ['Local SEO', 'Technical SEO', 'Контент', 'Аналитика']
      },
      {
        icon: 'Palette',
        title: 'Брендинг ОАЭ',
        description: 'Разработка бренда и корпоративной идентичности для престижного рынка ОАЭ.',
        link: '/leistungen/branding',
        features: ['Стратегия бренда', 'Логотип', 'Гайдлайны', 'Ребрендинг']
      },
      {
        icon: 'ShoppingCart',
        title: 'E-Commerce ОАЭ',
        description: 'Разработка интернет-магазинов с интеграцией платежей ОАЭ и локальной логистикой.',
        link: '/leistungen/webdesign',
        features: ['Shopify', 'WooCommerce', 'Платежи', 'Логистика']
      },
      {
        icon: 'Megaphone',
        title: 'Цифровой маркетинг ОАЭ',
        description: 'Performance-маркетинг, социальные сети и генерация лидов для рынка ОАЭ.',
        link: '/leistungen/digital-marketing',
        features: ['PPC', 'Соцсети', 'Контент', 'Email']
      },
      {
        icon: 'Building2',
        title: 'Разработка приложений ОАЭ',
        description: 'Мобильные приложения и веб-приложения для бизнеса в ОАЭ.',
        link: '/leistungen/web-app-entwicklung',
        features: ['iOS', 'Android', 'Web Apps', 'Enterprise']
      }
    ],

    industriesTitle: 'Отрасли в ОАЭ',
    industriesSubtitle: 'Специализация на ключевых отраслях региона',
    industries: [
      {
        icon: 'Building',
        title: 'Недвижимость и строительство',
        description: 'Цифровые решения для застройщиков, агентов и строительных компаний.'
      },
      {
        icon: 'ShoppingCart',
        title: 'E-Commerce и розничная торговля',
        description: 'Интернет-магазины и цифровые стратегии для развивающейся розничной торговли.'
      },
      {
        icon: 'Plane',
        title: 'Туризм и гостеприимство',
        description: 'Сайты и маркетинг для отелей, курортов и туристических компаний.'
      },
      {
        icon: 'Briefcase',
        title: 'Финансовые услуги',
        description: 'Цифровые платформы для банков, инвестиций и финтеха.'
      },
      {
        icon: 'Banknote',
        title: 'Государство и общество',
        description: 'Решения для электронного правительства и публичные порталы.'
      },
      {
        icon: 'TrendingUp',
        title: 'Стартапы и технологии',
        description: 'Разработка MVP и масштабирование для технологических стартапов.'
      }
    ],

    statsTitle: 'Наши показатели в ОАЭ',
    stats: [
      { value: '200+', label: 'Проектов по всему миру' },
      { value: '20+', label: 'Клиентов в ОАЭ' },
      { value: '7', label: 'Эмиратов охвачено' },
      { value: '100%', label: 'Удовлетворённость клиентов' }
    ],

    advantagesTitle: 'Преимущества работы с нами',
    advantagesSubtitle: 'Что отличает нас от местных агентств',
    advantages: [
      {
        title: 'Европейский стиль работы',
        description: 'Структурированное планирование проектов, чёткая коммуникация и своевременная доставка по европейским стандартам.'
      },
      {
        title: 'Справедливые цены',
        description: 'Прозрачное ценообразование без скрытых расходов. Лучшее соотношение цены и качества, чем у многих местных агентств.'
      },
      {
        title: 'Долгосрочное партнёрство',
        description: 'Мы думаем на перспективу и поддерживаем вас в обслуживании, обновлениях и дальнейшем развитии.'
      },
      {
        title: 'Техническое совершенство',
        description: 'Передовые технологии и лучшие практики для производительных, безопасных и масштабируемых решений.'
      }
    ],

    faqTitle: 'Часто задаваемые вопросы',
    faqSubtitle: 'Ответы на ваши вопросы о сотрудничестве в ОАЭ',
    faqs: [
      {
        question: 'В каких эмиратах GoldenWing 360 предоставляет услуги?',
        answer: 'Мы обслуживаем клиентов во всех семи эмиратах ОАЭ: Дубай, Абу-Даби, Шарджа, Аджман, Рас-эль-Хайма, Фуджейра и Умм-эль-Кайвайн. Наше основное присутствие в Дубае, но мы также работаем с клиентами в других эмиратах, как удалённо, так и с личными встречами при необходимости.'
      },
      {
        question: 'Нужна ли мне местная компания в ОАЭ для работы с вами?',
        answer: 'Нет, вам не нужна местная компания в ОАЭ. Мы работаем как с зарегистрированными в ОАЭ предприятиями, так и с международными компаниями, желающими выйти на рынок ОАЭ. Мы также можем проконсультировать вас по вопросам местной регистрации при необходимости.'
      },
      {
        question: 'Вы предлагаете арабские версии сайтов?',
        answer: 'Да, мы разрабатываем полностью арабские сайты с правильной поддержкой RTL (справа налево), арабской типографикой и культурно адаптированным дизайном. Многоязычные сайты (английский, арабский, немецкий) — наша специальность.'
      },
      {
        question: 'Какова типичная стоимость проектов в ОАЭ?',
        answer: 'Стоимость наших проектов начинается примерно от 15 000 AED за простые корпоративные сайты и доходит до 200 000+ AED за сложные e-commerce платформы или индивидуальные веб-приложения. Мы всегда предлагаем прозрачные фиксированные цены после детального анализа ваших требований.'
      },
      {
        question: 'Какие способы оплаты вы принимаете?',
        answer: 'Мы принимаем банковские переводы (SWIFT), кредитные карты и оплату в AED, EUR или USD. Для крупных проектов мы предлагаем гибкие планы оплаты, обычно 40% при старте проекта, 40% при утверждении дизайна и 20% при запуске.'
      },
      {
        question: 'Есть ли у вас опыт работы со свободными зонами ОАЭ?',
        answer: 'Да, мы работали с компаниями в различных свободных зонах ОАЭ, включая DIFC, DMCC, JAFZA, ADGM и другие. Мы понимаем особые требования и возможности, которые предоставляют компании в свободных зонах.'
      }
    ],

    ctaTitle: 'Начните ваш проект в ОАЭ',
    ctaSubtitle: 'Давайте вместе построим ваше цифровое присутствие в Объединённых Арабских Эмиратах.',
    ctaButton: 'Записаться на бесплатную консультацию',
    ctaPhone: '+971 50 123 4567',
    ctaEmail: 'uae@goldenwing.at',

    relatedTitle: 'Наши локации в ОАЭ',
    relatedLinks: [
      { title: 'Дубай', href: '/dubai', description: 'Цифровое агентство в Дубае' },
      { title: 'Абу-Даби', href: '/abu-dhabi', description: 'Цифровое агентство в Абу-Даби' },
      { title: 'Вена', href: '/standorte/wien', description: 'Наша штаб-квартира' }
    ]
  }
}

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const data = locale === 'de' ? pageData.de : locale === 'ru' ? pageData.ru : pageData.en
  const baseUrl = 'https://goldenwing.at'
  const hreflangAlternates = getHreflangAlternates('/uae', locale)

  return {
    title: data.title,
    description: data.description,
    keywords: locale === 'de'
      ? 'Digitalagentur VAE, Webdesign VAE, SEO VAE, Branding VAE, Webentwicklung Vereinigte Arabische Emirate, E-Commerce VAE, Digital Marketing VAE, Webagentur Dubai, Webagentur Abu Dhabi'
      : locale === 'ru'
      ? 'цифровое агентство ОАЭ, веб-дизайн ОАЭ, SEO ОАЭ, брендинг ОАЭ, веб-разработка Объединённые Арабские Эмираты, e-commerce ОАЭ, цифровой маркетинг ОАЭ, веб-агентство Дубай, веб-агентство Абу-Даби'
      : 'digital agency UAE, web design UAE, SEO UAE, branding UAE, web development United Arab Emirates, e-commerce UAE, digital marketing UAE, web agency Dubai, web agency Abu Dhabi',
    alternates: {
      canonical: `${baseUrl}/${locale}/uae`,
      languages: hreflangAlternates.languages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${baseUrl}/${locale}/uae`,
      siteName: 'GoldenWing 360',
      locale: locale === 'de' ? 'de_AT' : locale === 'ru' ? 'ru_RU' : 'en_AE',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/og/uae-digital-agency.jpg`,
          width: 1200,
          height: 630,
          alt: data.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description
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
  Plane,
  TrendingUp,
  Zap,
  MapPin,
  Star,
  Target,
  Rocket
}

export default async function UAEPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const data = locale === 'de' ? pageData.de : locale === 'ru' ? pageData.ru : pageData.en
  const baseUrl = 'https://goldenwing.at'

  // JSON-LD Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/${locale}/uae#business`,
    name: 'GoldenWing 360 UAE',
    description: data.description,
    url: `${baseUrl}/${locale}/uae`,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/images/og/uae-digital-agency.jpg`,
    telephone: '+971 50 123 4567',
    email: 'uae@goldenwing.at',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE'
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'United Arab Emirates',
        '@id': 'https://www.wikidata.org/wiki/Q878'
      },
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'City', name: 'Sharjah' },
      { '@type': 'City', name: 'Ajman' },
      { '@type': 'City', name: 'Ras Al Khaimah' },
      { '@type': 'City', name: 'Fujairah' },
      { '@type': 'City', name: 'Umm Al Quwain' }
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
        name: 'UAE',
        item: `${baseUrl}/${locale}/uae`
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
                <span className="text-foreground">UAE</span>
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
                  <a href="#locations">
                    {data.heroSecondaryCta}
                  </a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>7 Emirates Covered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>20+ UAE Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Multilingual Team</span>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

        {/* Locations Section */}
        <section id="locations" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.locationsTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.locationsSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {data.locations.map((location, index) => (
                <Link
                  key={index}
                  href={location.link as '/dubai'}
                  className="group bg-background border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {location.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{location.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {location.areas.slice(0, 3).map((area, aIndex) => (
                      <span key={aIndex} className="text-xs bg-muted px-2 py-1 rounded">
                        {area}
                      </span>
                    ))}
                    {location.areas.length > 3 && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        +{location.areas.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.servicesTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.servicesSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {data?.services?.map((service, index) => {
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
                      {{ de: 'Mehr erfahren', en: 'Learn more', ru: 'Подробнее' }[locale as 'de' | 'en' | 'ru'] || 'Learn more'}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.industriesTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.industriesSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.industries.map((industry, index) => {
                const Icon = IconMap[industry.icon] || Building2
                return (
                  <div key={index} className="bg-muted/30 rounded-lg p-6">
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="text-lg font-semibold mb-2">{industry.title}</h3>
                    <p className="text-muted-foreground text-sm">{industry.description}</p>
                  </div>
                )
              })}
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

        {/* Advantages Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.advantagesTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{data.advantagesSubtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {data.advantages.map((advantage, index) => (
                <div key={index} className="bg-background rounded-xl p-6 border">
                  <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
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
                {{ de: 'Erkunden Sie unsere Services', en: 'Explore Our Services', ru: 'Изучите наши услуги' }[locale as 'de' | 'en' | 'ru'] || 'Explore Our Services'}
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h3 className="font-medium mb-2">{{ de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale as 'de' | 'en' | 'ru'] || 'Services'}</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><Link href="/leistungen/webdesign" className="hover:text-primary">{{ de: 'Webdesign', en: 'Web Design', ru: 'Веб-дизайн' }[locale as 'de' | 'en' | 'ru'] || 'Web Design'}</Link></li>
                    <li><Link href="/leistungen/seo-content" className="hover:text-primary">SEO & Content</Link></li>
                    <li><Link href="/leistungen/branding" className="hover:text-primary">Branding</Link></li>
                    <li><Link href="/leistungen/web-app-entwicklung" className="hover:text-primary">{{ de: 'Web App Entwicklung', en: 'Web App Development', ru: 'Разработка веб-приложений' }[locale as 'de' | 'en' | 'ru'] || 'Web App Development'}</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{{ de: 'VAE Standorte', en: 'UAE Locations', ru: 'Локации ОАЭ' }[locale as 'de' | 'en' | 'ru'] || 'UAE Locations'}</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><Link href="/dubai" className="hover:text-primary">Dubai</Link></li>
                    <li><Link href="/abu-dhabi" className="hover:text-primary">Abu Dhabi</Link></li>
                    <li><Link href="/webdesign-dubai" className="hover:text-primary">Web Design Dubai</Link></li>
                    <li><Link href="/seo-agentur-dubai" className="hover:text-primary">SEO Dubai</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">{{ de: 'Unternehmen', en: 'Company', ru: 'Компания' }[locale as 'de' | 'en' | 'ru'] || 'Company'}</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li><Link href="/ueber-uns" className="hover:text-primary">{{ de: 'Über uns', en: 'About us', ru: 'О нас' }[locale as 'de' | 'en' | 'ru'] || 'About us'}</Link></li>
                    <li><Link href="/referenzen" className="hover:text-primary">{{ de: 'Projekte', en: 'Projects', ru: 'Проекты' }[locale as 'de' | 'en' | 'ru'] || 'Projects'}</Link></li>
                    <li><Link href="/kontakt" className="hover:text-primary">{{ de: 'Kontakt', en: 'Contact', ru: 'Контакты' }[locale as 'de' | 'en' | 'ru'] || 'Contact'}</Link></li>
                    <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
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
