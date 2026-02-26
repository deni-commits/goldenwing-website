import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl } from '@/lib/utils'
import { ArrowRight, Star, Clock, Shield, Zap, Users, Award, Phone, MapPin, Globe, Briefcase, TrendingUp, ShoppingCart, Heart, Home, Landmark, Utensils, Gem, Rocket, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'


import { FAQSchema, BreadcrumbListSchema } from '@/components/seo/json-ld'
import { ProcessLargeNumber } from '@/components/process-sections/ProcessLargeNumber'
import { FAQSection } from '@/components/sections/faq-section'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const pageData = {
  de: {
    meta: {
      title: 'Digital Marketing & Webdesign Agentur Dubai | GoldenWing',
      description: 'GoldenWing ist eine führende Digital Marketing und Webdesign Agentur in Dubai. Europäische Qualität, Dubai Delivery. SEO, Branding, Webentwicklung für UAE Unternehmen.',
      keywords: ['digital marketing agentur dubai', 'webdesign dubai', 'seo dubai', 'branding agentur dubai'],
    },
    hero: {
      badge: 'Digital Marketing Agentur Dubai',
      title: 'Digital Marketing & Webdesign Agentur in Dubai',
      subtitle: 'European Quality. Dubai Innovation. Your Success.',
      description: 'GoldenWing verbindet europäische Präzision mit Middle East Innovation. Unser Team in Business Bay liefert erstklassige digitale Lösungen für Unternehmen in den VAE.',
      ctaPrimary: 'Kostenloses Beratungsgespräch',
      ctaSecondary: 'Unsere Projekte ansehen',
    },
    trustSignals: [
      { icon: Award, text: 'Google Partner' },
      { icon: Star, text: 'Clutch Top Agency' },
      { icon: Clock, text: '10+ Jahre Erfahrung' },
      { icon: Globe, text: 'Büro in Business Bay' },
    ],
    whyGoldenwing: {
      title: 'Warum GoldenWing Dubai?',
      items: [
        { icon: Shield, title: 'Europäische Präzision', description: 'Deutsche & österreichische Qualitätsstandards mit Liebe zum Detail.' },
        { icon: Zap, title: 'Moderne Technologie', description: 'Next.js, React, Headless CMS – nicht veraltete WordPress-Themes.' },
        { icon: Users, title: 'Lokales Dubai Team', description: 'Persönliche Betreuung vor Ort in Business Bay, Dubai.' },
        { icon: Globe, title: 'UAE Markt-Expertise', description: 'Wir verstehen die kulturellen Nuancen und Geschäftspraktiken.' },
        { icon: MessageCircle, title: 'Mehrsprachig', description: 'Deutsch, Englisch, Arabisch – wir sprechen Ihre Sprache.' },
      ],
    },
    services: {
      title: 'Unsere Services in Dubai',
      description: 'Umfassende digitale Lösungen für den UAE Markt – von der Strategie bis zur Umsetzung',
      items: [
        {
          title: 'Webdesign & Entwicklung',
          description: 'Premium Websites mit vollständigem RTL-Support für arabische Märkte. Responsive Design, blitzschnelle Ladezeiten und kulturell angepasste User Experience. Wir entwickeln mit Next.js, React und modernen CMS-Lösungen – keine veralteten Templates.',
          href: '/dubai/web-design-company-dubai',
          icon: Globe
        },
        {
          title: 'SEO & Digital Marketing',
          description: 'Suchmaschinenoptimierung speziell für Google.ae und den UAE Markt. Lokale SEO-Strategien, Google Ads Kampagnen, Social Media Marketing und Content Creation auf Englisch und Arabisch für maximale Sichtbarkeit.',
          href: '/dubai/seo-company-dubai',
          icon: TrendingUp
        },
        {
          title: 'Branding & Corporate Identity',
          description: 'Markenentwicklung für den anspruchsvollen Golfmarkt. Logo-Design, Corporate Identity, Markenrichtlinien und visuelles Storytelling, das arabische und westliche Ästhetik harmonisch verbindet.',
          href: '/dubai/branding-agency-dubai',
          icon: Award
        },
        {
          title: 'E-Commerce Lösungen',
          description: 'Online-Shops für den wachsenden UAE E-Commerce Markt. Shopify, WooCommerce oder maßgeschneiderte Lösungen mit lokalen Zahlungsmethoden (Apple Pay, Samsung Pay, COD) und DHL/Aramex Integration.',
          href: '/dubai/ecommerce-development-dubai',
          icon: ShoppingCart
        },
      ],
    },
    industries: {
      title: 'Branchen die wir bedienen',
      subtitle: 'Tiefes Branchenwissen für maßgeschneiderte Lösungen im Dubai-Markt',
      items: [
        { icon: Home, name: 'Immobilien & Property', description: 'Websites für Makler, Entwickler und Property Management. Virtual Tours, 3D-Visualisierungen und Lead-Generierung für den boomenden Dubai Immobilienmarkt.' },
        { icon: Utensils, name: 'Hospitality & Tourismus', description: 'Buchungssysteme, Restaurant-Websites und digitales Marketing für Hotels, Restaurants und Tourismusunternehmen in Dubai und den Emiraten.' },
        { icon: ShoppingCart, name: 'E-Commerce & Retail', description: 'Online-Shops mit lokalen Zahlungsmethoden und Logistik-Integration. Perfekt für den wachsenden Middle East E-Commerce Markt.' },
        { icon: Landmark, name: 'Finanzen & Fintech', description: 'Sichere, DFSA-konforme digitale Lösungen für Banken, Finanzberater und Fintech-Startups im Dubai International Financial Centre.' },
        { icon: Heart, name: 'Healthcare', description: 'HIPAA-konforme Websites und Patientenportale für Kliniken, Ärzte und Healthcare-Startups. Online-Terminbuchung und Telemedizin-Integration.' },
        { icon: Gem, name: 'Luxury Brands', description: 'High-End Webdesign für Luxusmarken, Juweliere und Premium-Retailer. Exklusive digitale Erlebnisse für anspruchsvolle Kundschaft.' },
        { icon: Rocket, name: 'Startups', description: 'Agile digitale Lösungen für Tech-Startups in Dubai Silicon Oasis und DIFC. MVP-Entwicklung, Landing Pages und Growth Marketing.' },
        { icon: Briefcase, name: 'Professional Services', description: 'Corporate Websites für Anwaltskanzleien, Beratungsunternehmen und Wirtschaftsprüfer. Seriöses Design, das Vertrauen schafft.' },
      ],
    },
    locations: {
      title: 'Dubai Standorte die wir bedienen',
      subtitle: 'Von unserem Büro in Business Bay aus betreuen wir Kunden in allen wichtigen Dubai Business Districts',
      areas: [
        { name: 'DIFC', fullName: 'Dubai International Financial Centre', description: 'Finanz- und Rechtsdienstleister' },
        { name: 'Business Bay', fullName: 'Business Bay', description: 'Unser Hauptstandort' },
        { name: 'Dubai Marina', fullName: 'Dubai Marina', description: 'Lifestyle & Hospitality' },
        { name: 'JLT', fullName: 'Jumeirah Lake Towers', description: 'SMEs & Startups' },
        { name: 'Downtown Dubai', fullName: 'Downtown Dubai', description: 'Retail & Luxury' },
        { name: 'Jumeirah', fullName: 'Jumeirah', description: 'Hospitality & Tourismus' },
        { name: 'Al Barsha', fullName: 'Al Barsha', description: 'Tech & IT' },
        { name: 'Deira', fullName: 'Deira', description: 'Handel & Import/Export' },
        { name: 'Dubai Silicon Oasis', fullName: 'Dubai Silicon Oasis', description: 'Tech-Startups & Freezone' },
        { name: 'Dubai Media City', fullName: 'Dubai Media City', description: 'Medien & Kreativbranche' },
      ],
    },
    process: {
      title: 'Unser Prozess',
      steps: [
        { step: '01', title: 'Discovery & Strategie', description: 'Wir analysieren Ihre Ziele und den UAE Markt.' },
        { step: '02', title: 'Design & Konzept', description: 'Kulturell sensibles Design für lokale Zielgruppen.' },
        { step: '03', title: 'Entwicklung', description: 'Professionelle Umsetzung mit RTL-Support.' },
        { step: '04', title: 'Launch & Optimierung', description: 'Go-Live und kontinuierliche Verbesserung.' },
      ],
    },
    faqs: [
      { question: 'Welche Digital Marketing Services bieten Sie in Dubai an?', answer: 'Wir bieten umfassende digitale Lösungen: Webdesign & Entwicklung, SEO (Google.ae), PPC/Google Ads, Social Media Marketing, Branding, E-Commerce Entwicklung und Content Marketing – alles speziell für den UAE Markt optimiert.' },
      { question: 'Was kostet Webdesign in Dubai?', answer: 'Unsere Webdesign-Pakete starten bei AED 15.000 für Business-Websites. Premium-Lösungen mit CMS und mehrsprachigem Support (EN/AR) beginnen bei AED 35.000. Enterprise-Lösungen werden individuell kalkuliert.' },
      { question: 'Haben Sie ein Büro in Dubai?', answer: 'Ja, unser Dubai-Team sitzt im DAMAC Executive Bay Tower B, Office 1406 in Business Bay. Sie können uns gerne für ein persönliches Meeting besuchen.' },
      { question: 'Können Sie arabische Websites erstellen?', answer: 'Absolut! Wir entwickeln zweisprachige Websites mit korrektem RTL (Right-to-Left) Support für Arabisch. Unsere Designer verstehen die kulturellen Anforderungen des arabischen Marktes.' },
      { question: 'Wie lange dauert ein Website-Projekt?', answer: 'Typische Website-Projekte dauern 4-8 Wochen. Einfache Landing Pages können in 2 Wochen fertig sein, während komplexe E-Commerce-Lösungen 12+ Wochen benötigen können.' },
    ],
    cta: {
      title: 'Bereit für Ihr Projekt in Dubai?',
      description: 'Lassen Sie uns über Ihre digitale Präsenz in den VAE sprechen.',
      button: 'Beratungsgespräch vereinbaren',
      phone: '+971 4 XXX XXXX',
      whatsapp: 'WhatsApp Chat starten',
    },
  },
  en: {
    meta: {
      title: 'Digital Marketing & Web Design Agency Dubai | GoldenWing',
      description: 'GoldenWing is a leading digital marketing and web design agency in Dubai. European quality, Dubai delivery. SEO, branding, web development for UAE businesses.',
      keywords: ['digital marketing agency dubai', 'web design dubai', 'seo dubai', 'branding agency dubai', 'web design company dubai'],
    },
    hero: {
      badge: 'Digital Marketing Agency Dubai',
      title: 'Digital Marketing & Web Design Agency in Dubai',
      subtitle: 'European Quality. Dubai Innovation. Your Success.',
      description: 'GoldenWing combines European precision with Middle East innovation. Our team in Business Bay delivers world-class digital solutions for businesses in the UAE.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'View Our Work',
    },
    trustSignals: [
      { icon: Award, text: 'Google Partner' },
      { icon: Star, text: 'Clutch Top Agency' },
      { icon: Clock, text: '10+ Years Experience' },
      { icon: Globe, text: 'Office in Business Bay' },
    ],
    whyGoldenwing: {
      title: 'Why GoldenWing Dubai?',
      items: [
        { icon: Shield, title: 'European Precision', description: 'German & Austrian quality standards with attention to detail.' },
        { icon: Zap, title: 'Modern Tech Stack', description: 'Next.js, React, Headless CMS – not outdated WordPress themes.' },
        { icon: Users, title: 'Dedicated Dubai Team', description: 'Personal service on-site in Business Bay, Dubai.' },
        { icon: Globe, title: 'UAE Market Expertise', description: 'We understand the cultural nuances and business practices.' },
        { icon: MessageCircle, title: 'Multi-lingual', description: 'German, English, Arabic – we speak your language.' },
      ],
    },
    services: {
      title: 'Our Services in Dubai',
      description: 'Comprehensive digital solutions for the UAE market – from strategy to execution',
      items: [
        {
          title: 'Web Design & Development',
          description: 'Premium websites with full RTL support for Arabic markets. Responsive design, lightning-fast load times, and culturally adapted user experience. We develop with Next.js, React, and modern CMS solutions – no outdated templates or bloated WordPress themes.',
          href: '/dubai/web-design-company-dubai',
          icon: Globe
        },
        {
          title: 'SEO & Digital Marketing',
          description: 'Search engine optimization specifically for Google.ae and the UAE market. Local SEO strategies, Google Ads campaigns, social media marketing and content creation in English and Arabic for maximum visibility and lead generation.',
          href: '/dubai/seo-company-dubai',
          icon: TrendingUp
        },
        {
          title: 'Branding & Corporate Identity',
          description: 'Brand development for the demanding Gulf market. Logo design, corporate identity, brand guidelines and visual storytelling that harmoniously blends Arabic and Western aesthetics for your target audience.',
          href: '/dubai/branding-agency-dubai',
          icon: Award
        },
        {
          title: 'E-Commerce Solutions',
          description: 'Online stores for the growing UAE e-commerce market. Shopify, WooCommerce or custom solutions with local payment methods (Apple Pay, Samsung Pay, COD) and DHL/Aramex shipping integration.',
          href: '/dubai/ecommerce-development-dubai',
          icon: ShoppingCart
        },
      ],
    },
    industries: {
      title: 'Industries We Serve',
      subtitle: 'Deep industry expertise for tailored solutions in the Dubai market',
      items: [
        { icon: Home, name: 'Real Estate & Property', description: 'Websites for agents, developers and property management. Virtual tours, 3D visualizations and lead generation for Dubai\'s booming real estate market.' },
        { icon: Utensils, name: 'Hospitality & Tourism', description: 'Booking systems, restaurant websites and digital marketing for hotels, restaurants and tourism companies in Dubai and the Emirates.' },
        { icon: ShoppingCart, name: 'E-Commerce & Retail', description: 'Online shops with local payment methods and logistics integration. Perfect for the growing Middle East e-commerce market.' },
        { icon: Landmark, name: 'Finance & Fintech', description: 'Secure, DFSA-compliant digital solutions for banks, financial advisors and fintech startups in the Dubai International Financial Centre.' },
        { icon: Heart, name: 'Healthcare', description: 'HIPAA-compliant websites and patient portals for clinics, doctors and healthcare startups. Online appointment booking and telemedicine integration.' },
        { icon: Gem, name: 'Luxury Brands', description: 'High-end web design for luxury brands, jewelers and premium retailers. Exclusive digital experiences for discerning clientele.' },
        { icon: Rocket, name: 'Startups', description: 'Agile digital solutions for tech startups in Dubai Silicon Oasis and DIFC. MVP development, landing pages and growth marketing.' },
        { icon: Briefcase, name: 'Professional Services', description: 'Corporate websites for law firms, consulting companies and auditors. Professional design that builds trust and credibility.' },
      ],
    },
    locations: {
      title: 'Dubai Locations We Serve',
      subtitle: 'From our office in Business Bay, we serve clients across all major Dubai business districts',
      areas: [
        { name: 'DIFC', fullName: 'Dubai International Financial Centre', description: 'Finance & Legal Services' },
        { name: 'Business Bay', fullName: 'Business Bay', description: 'Our Headquarters' },
        { name: 'Dubai Marina', fullName: 'Dubai Marina', description: 'Lifestyle & Hospitality' },
        { name: 'JLT', fullName: 'Jumeirah Lake Towers', description: 'SMEs & Startups' },
        { name: 'Downtown Dubai', fullName: 'Downtown Dubai', description: 'Retail & Luxury' },
        { name: 'Jumeirah', fullName: 'Jumeirah', description: 'Hospitality & Tourism' },
        { name: 'Al Barsha', fullName: 'Al Barsha', description: 'Tech & IT' },
        { name: 'Deira', fullName: 'Deira', description: 'Trade & Import/Export' },
        { name: 'Dubai Silicon Oasis', fullName: 'Dubai Silicon Oasis', description: 'Tech Startups & Freezone' },
        { name: 'Dubai Media City', fullName: 'Dubai Media City', description: 'Media & Creative Industry' },
      ],
    },
    process: {
      title: 'Our Process',
      steps: [
        { step: '01', title: 'Discovery & Strategy', description: 'We analyze your goals and the UAE market.' },
        { step: '02', title: 'Design & Concept', description: 'Culturally sensitive design for local audiences.' },
        { step: '03', title: 'Development', description: 'Professional implementation with RTL support.' },
        { step: '04', title: 'Launch & Optimize', description: 'Go-live and continuous improvement.' },
      ],
    },
    faqs: [
      { question: 'What digital marketing services do you offer in Dubai?', answer: 'We offer comprehensive digital solutions: Web design & development, SEO (Google.ae), PPC/Google Ads, Social Media Marketing, Branding, E-commerce Development, and Content Marketing – all optimized specifically for the UAE market.' },
      { question: 'How much does web design cost in Dubai?', answer: 'Our web design packages start at AED 15,000 for business websites. Premium solutions with CMS and multilingual support (EN/AR) start at AED 35,000. Enterprise solutions are priced individually.' },
      { question: 'Do you have an office in Dubai?', answer: "Yes, our Dubai team is located at DAMAC Executive Bay Tower B, Office 1406 in Business Bay. You're welcome to visit us for a personal meeting." },
      { question: 'Can you create Arabic websites?', answer: 'Absolutely! We develop bilingual websites with proper RTL (Right-to-Left) support for Arabic. Our designers understand the cultural requirements of the Arabic market.' },
      { question: 'How long does a website project take?', answer: 'Typical website projects take 4-8 weeks. Simple landing pages can be done in 2 weeks, while complex e-commerce solutions may take 12+ weeks.' },
    ],
    cta: {
      title: 'Ready for Your Project in Dubai?',
      description: "Let's discuss your digital presence in the UAE.",
      button: 'Schedule Consultation',
      phone: '+971 4 XXX XXXX',
      whatsapp: 'Start WhatsApp Chat',
    },
  },
  ru: {
    meta: {
      title: 'Агентство цифрового маркетинга и веб-дизайна в Дубае | GoldenWing',
      description: 'GoldenWing — ведущее агентство цифрового маркетинга и веб-дизайна в Дубае. Европейское качество, реализация в Дубае. SEO, брендинг, веб-разработка для компаний ОАЭ.',
      keywords: ['агентство цифрового маркетинга дубай', 'веб-дизайн дубай', 'seo дубай', 'брендинг агентство дубай', 'веб-дизайн компания дубай'],
    },
    hero: {
      badge: 'Агентство цифрового маркетинга Дубай',
      title: 'Агентство цифрового маркетинга и веб-дизайна в Дубае',
      subtitle: 'Европейское качество. Инновации Дубая. Ваш успех.',
      description: 'GoldenWing объединяет европейскую точность с инновациями Ближнего Востока. Наша команда в Business Bay предоставляет первоклассные цифровые решения для бизнеса в ОАЭ.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Наши проекты',
    },
    trustSignals: [
      { icon: Award, text: 'Партнер Google' },
      { icon: Star, text: 'Топ-агентство Clutch' },
      { icon: Clock, text: '10+ лет опыта' },
      { icon: Globe, text: 'Офис в Business Bay' },
    ],
    whyGoldenwing: {
      title: 'Почему GoldenWing Дубай?',
      items: [
        { icon: Shield, title: 'Европейская точность', description: 'Немецкие и австрийские стандарты качества с вниманием к деталям.' },
        { icon: Zap, title: 'Современные технологии', description: 'Next.js, React, Headless CMS — не устаревшие темы WordPress.' },
        { icon: Users, title: 'Команда в Дубае', description: 'Персональное обслуживание на месте в Business Bay, Дубай.' },
        { icon: Globe, title: 'Экспертиза рынка ОАЭ', description: 'Мы понимаем культурные нюансы и деловую практику.' },
        { icon: MessageCircle, title: 'Многоязычность', description: 'Немецкий, английский, арабский, русский — мы говорим на вашем языке.' },
      ],
    },
    services: {
      title: 'Наши услуги в Дубае',
      description: 'Комплексные цифровые решения для рынка ОАЭ — от стратегии до реализации',
      items: [
        {
          title: 'Веб-дизайн и разработка',
          description: 'Премиум-сайты с полной поддержкой RTL для арабских рынков. Адаптивный дизайн, молниеносная скорость загрузки и культурно адаптированный пользовательский опыт. Мы разрабатываем на Next.js, React и современных CMS-решениях — без устаревших шаблонов.',
          href: '/dubai/web-design-company-dubai',
          icon: Globe
        },
        {
          title: 'SEO и цифровой маркетинг',
          description: 'Поисковая оптимизация специально для Google.ae и рынка ОАЭ. Локальные SEO-стратегии, кампании Google Ads, маркетинг в социальных сетях и создание контента на английском и арабском языках для максимальной видимости.',
          href: '/dubai/seo-company-dubai',
          icon: TrendingUp
        },
        {
          title: 'Брендинг и корпоративная идентичность',
          description: 'Разработка бренда для требовательного рынка Персидского залива. Дизайн логотипа, корпоративная идентичность, руководства по бренду и визуальный сторителлинг, гармонично сочетающий арабскую и западную эстетику.',
          href: '/dubai/branding-agency-dubai',
          icon: Award
        },
        {
          title: 'Решения для электронной коммерции',
          description: 'Интернет-магазины для растущего рынка электронной коммерции ОАЭ. Shopify, WooCommerce или индивидуальные решения с местными способами оплаты (Apple Pay, Samsung Pay, наложенный платеж) и интеграцией DHL/Aramex.',
          href: '/dubai/ecommerce-development-dubai',
          icon: ShoppingCart
        },
      ],
    },
    industries: {
      title: 'Отрасли, которые мы обслуживаем',
      subtitle: 'Глубокая отраслевая экспертиза для индивидуальных решений на рынке Дубая',
      items: [
        { icon: Home, name: 'Недвижимость', description: 'Сайты для агентов, застройщиков и управляющих компаний. Виртуальные туры, 3D-визуализации и генерация лидов для бурно развивающегося рынка недвижимости Дубая.' },
        { icon: Utensils, name: 'Гостеприимство и туризм', description: 'Системы бронирования, сайты ресторанов и цифровой маркетинг для отелей, ресторанов и туристических компаний в Дубае и Эмиратах.' },
        { icon: ShoppingCart, name: 'Электронная коммерция и розница', description: 'Интернет-магазины с местными способами оплаты и интеграцией логистики. Идеально для растущего рынка электронной коммерции Ближнего Востока.' },
        { icon: Landmark, name: 'Финансы и финтех', description: 'Безопасные, соответствующие требованиям DFSA цифровые решения для банков, финансовых консультантов и финтех-стартапов в Дубайском международном финансовом центре.' },
        { icon: Heart, name: 'Здравоохранение', description: 'HIPAA-совместимые сайты и порталы для пациентов для клиник, врачей и медицинских стартапов. Онлайн-запись на прием и интеграция телемедицины.' },
        { icon: Gem, name: 'Люксовые бренды', description: 'Высококлассный веб-дизайн для люксовых брендов, ювелиров и премиальных ритейлеров. Эксклюзивный цифровой опыт для взыскательной клиентуры.' },
        { icon: Rocket, name: 'Стартапы', description: 'Гибкие цифровые решения для технологических стартапов в Dubai Silicon Oasis и DIFC. Разработка MVP, лендинги и маркетинг роста.' },
        { icon: Briefcase, name: 'Профессиональные услуги', description: 'Корпоративные сайты для юридических фирм, консалтинговых компаний и аудиторов. Профессиональный дизайн, вызывающий доверие.' },
      ],
    },
    locations: {
      title: 'Районы Дубая, которые мы обслуживаем',
      subtitle: 'Из нашего офиса в Business Bay мы обслуживаем клиентов во всех ключевых деловых районах Дубая',
      areas: [
        { name: 'DIFC', fullName: 'Dubai International Financial Centre', description: 'Финансы и юридические услуги' },
        { name: 'Business Bay', fullName: 'Business Bay', description: 'Наша штаб-квартира' },
        { name: 'Dubai Marina', fullName: 'Dubai Marina', description: 'Лайфстайл и гостеприимство' },
        { name: 'JLT', fullName: 'Jumeirah Lake Towers', description: 'МСП и стартапы' },
        { name: 'Downtown Dubai', fullName: 'Downtown Dubai', description: 'Розница и люкс' },
        { name: 'Jumeirah', fullName: 'Jumeirah', description: 'Гостеприимство и туризм' },
        { name: 'Al Barsha', fullName: 'Al Barsha', description: 'Технологии и IT' },
        { name: 'Deira', fullName: 'Deira', description: 'Торговля и импорт/экспорт' },
        { name: 'Dubai Silicon Oasis', fullName: 'Dubai Silicon Oasis', description: 'Технологические стартапы и свободная зона' },
        { name: 'Dubai Media City', fullName: 'Dubai Media City', description: 'Медиа и креативная индустрия' },
      ],
    },
    process: {
      title: 'Наш процесс',
      steps: [
        { step: '01', title: 'Исследование и стратегия', description: 'Мы анализируем ваши цели и рынок ОАЭ.' },
        { step: '02', title: 'Дизайн и концепция', description: 'Культурно чуткий дизайн для местной аудитории.' },
        { step: '03', title: 'Разработка', description: 'Профессиональная реализация с поддержкой RTL.' },
        { step: '04', title: 'Запуск и оптимизация', description: 'Запуск и непрерывное улучшение.' },
      ],
    },
    faqs: [
      { question: 'Какие услуги цифрового маркетинга вы предлагаете в Дубае?', answer: 'Мы предлагаем комплексные цифровые решения: веб-дизайн и разработка, SEO (Google.ae), PPC/Google Ads, маркетинг в социальных сетях, брендинг, разработка электронной коммерции и контент-маркетинг — все оптимизировано специально для рынка ОАЭ.' },
      { question: 'Сколько стоит веб-дизайн в Дубае?', answer: 'Наши пакеты веб-дизайна начинаются от 15 000 дирхамов ОАЭ для бизнес-сайтов. Премиум-решения с CMS и многоязычной поддержкой (EN/AR) начинаются от 35 000 дирхамов ОАЭ. Корпоративные решения оцениваются индивидуально.' },
      { question: 'Есть ли у вас офис в Дубае?', answer: 'Да, наша команда в Дубае находится в DAMAC Executive Bay Tower B, офис 1406 в Business Bay. Мы будем рады встретиться с вами лично.' },
      { question: 'Можете ли вы создавать сайты на арабском языке?', answer: 'Безусловно! Мы разрабатываем двуязычные сайты с правильной поддержкой RTL (справа налево) для арабского языка. Наши дизайнеры понимают культурные требования арабского рынка.' },
      { question: 'Сколько времени занимает проект по созданию сайта?', answer: 'Типичные проекты по созданию сайтов занимают 4-8 недель. Простые лендинги могут быть готовы за 2 недели, в то время как сложные решения электронной коммерции могут занять 12+ недель.' },
    ],
    cta: {
      title: 'Готовы к вашему проекту в Дубае?',
      description: 'Давайте обсудим ваше цифровое присутствие в ОАЭ.',
      button: 'Записаться на консультацию',
      phone: '+971 4 XXX XXXX',
      whatsapp: 'Начать чат в WhatsApp',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/dubai', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: locale === 'de' ? 'de_AT' : 'en_AE',
      type: 'website',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios Dubai' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.hero.title,
      description: data.meta.description,
    },
    alternates: {
      canonical: getCanonicalUrl('/dubai', locale),
      languages: {
        'en-AE': 'https://goldenwing.at/en/dubai',
        'de-AT': 'https://goldenwing.at/dubai',
        'x-default': 'https://goldenwing.at/en/dubai',
      },
    },
  }
}

export default async function DubaiHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const isEn = locale === 'en'
  const isRu = locale === 'ru'

  const breadcrumbs = [
    { name: isRu ? 'Главная' : isEn ? 'Home' : 'Startseite', url: '/' },
    { name: isRu ? 'Дубай' : 'Dubai', url: '/dubai' },
  ]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'GoldenWing Creative Studios Dubai',
    description: data.meta.description,
    url: 'https://goldenwing.at/en/dubai',
    telephone: '+971-58-514-4360',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DAMAC Executive Bay Tower B, Office 1406, 14th Floor',
      addressLocality: 'Dubai',
      addressRegion: 'Business Bay',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1783747,
      longitude: 55.2615882,
    },
    priceRange: '$$$$',
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'City', name: 'Abu Dhabi' },
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
                <Link href="/referenzen">
                  {data.hero.ctaSecondary}
                </Link>
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="mt-12 flex flex-wrap gap-6 items-center text-sm text-muted-foreground">
              {data.trustSignals.map((signal) => (
                <div key={signal.text} className="flex items-center gap-2">
                  <signal.icon className="h-5 w-5 text-primary" />
                  <span>{signal.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Why GoldenWing Dubai */}
      <section className="py-20 border-y bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.whyGoldenwing.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.whyGoldenwing.items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
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

      {/* Services in Dubai */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{data?.services?.title}</h2>
            <p className="text-muted-foreground">{data?.services?.description}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data?.services?.items.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.href as '/dubai/web-design-company-dubai'} className="text-primary inline-flex items-center gap-1 hover:gap-2 transition-all font-medium">
                    {isRu ? 'Подробнее' : isEn ? 'Learn more' : 'Mehr erfahren'} <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/dubai/digital-marketing-agency-dubai">
                {isRu ? 'Все услуги' : isEn ? 'View All Services' : 'Alle Services ansehen'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{data.industries.title}</h2>
            {'subtitle' in data.industries && (
              <p className="text-muted-foreground max-w-2xl mx-auto">{data.industries.subtitle}</p>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {data.industries.items.map((industry) => (
              <div key={industry.name} className="flex flex-col p-6 rounded-xl bg-background border hover:border-primary/50 hover:shadow-lg transition-all group">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <industry.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{industry.name}</h3>
                {'description' in industry && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{industry.description}</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Dubai Locations */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{data.locations.title}</h2>
            {'subtitle' in data.locations && (
              <p className="text-muted-foreground max-w-2xl mx-auto">{data.locations.subtitle}</p>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {data.locations.areas.map((area) => {
              const areaData = typeof area === 'string'
                ? { name: area, fullName: area, description: '' }
                : area
              return (
                <div key={areaData.name} className="p-4 bg-muted/50 rounded-xl border hover:border-primary/30 hover:bg-muted transition-all group text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">{areaData.name}</span>
                  </div>
                  {areaData.description && (
                    <p className="text-xs text-muted-foreground">{areaData.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Process - ProcessLargeNumber Layout */}
      <ProcessLargeNumber
        title={data.process.title}
        subtitle={isRu
          ? 'Как мы работаем вместе для вашего успеха.'
          : isEn
          ? 'How we work together for your success.'
          : 'So arbeiten wir gemeinsam an Ihrem Erfolg.'}
        steps={data.process.steps.map(s => ({ num: s.step, title: s.title, description: s.description }))}
      />

      {/* FAQ - Premium Design */}
      <FAQSection
        title={isRu ? 'Часто задаваемые вопросы' : isEn ? 'Frequently Asked Questions' : 'Häufig gestellte Fragen'}
        subtitle={isRu
          ? 'Ответы на часто задаваемые вопросы.'
          : isEn
          ? 'Answers to frequently asked questions.'
          : 'Antworten auf häufig gestellte Fragen.'}
        items={data.faqs}
      />

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
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
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <NextLink href="https://wa.me/message/DTMCVZBIQJ3FH1" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                {data.cta.whatsapp}
              </NextLink>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
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
          <h3 className="font-semibold mb-6">{isRu ? 'Услуги в Дубае' : isEn ? 'Dubai Services' : 'Dubai Services'}</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/dubai/web-design-company-dubai" className="text-muted-foreground hover:text-primary">
              {isRu ? 'Веб-дизайн компания Дубай' : isEn ? 'Web Design Company Dubai' : 'Webdesign Agentur Dubai'}
            </Link>
            <Link href="/dubai/seo-company-dubai" className="text-muted-foreground hover:text-primary">
              {isRu ? 'SEO компания Дубай' : isEn ? 'SEO Company Dubai' : 'SEO Agentur Dubai'}
            </Link>
            <Link href="/dubai/branding-agency-dubai" className="text-muted-foreground hover:text-primary">
              {isRu ? 'Брендинг агентство Дубай' : isEn ? 'Branding Agency Dubai' : 'Branding Agentur Dubai'}
            </Link>
            <Link href="/dubai/ecommerce-development-dubai" className="text-muted-foreground hover:text-primary">
              {isRu ? 'Разработка электронной коммерции Дубай' : isEn ? 'E-commerce Development Dubai' : 'E-Commerce Entwicklung Dubai'}
            </Link>
            <Link href="/dubai/digital-marketing-agency-dubai" className="text-muted-foreground hover:text-primary">
              {isRu ? 'Агентство цифрового маркетинга Дубай' : isEn ? 'Digital Marketing Agency Dubai' : 'Digital Marketing Agentur Dubai'}
            </Link>
            <Link href="/abu-dhabi" className="text-muted-foreground hover:text-primary">
              {isRu ? 'Услуги в Абу-Даби' : isEn ? 'Abu Dhabi Services' : 'Abu Dhabi Services'}
            </Link>
            <Link href="/sharjah" className="text-muted-foreground hover:text-primary">
              {isRu ? 'Услуги в Шардже' : isEn ? 'Sharjah Services' : 'Sharjah Services'}
            </Link>
            <Link href="/uae" className="text-muted-foreground hover:text-primary">
              {isRu ? 'Обзор ОАЭ' : isEn ? 'UAE Overview' : 'VAE Übersicht'}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
