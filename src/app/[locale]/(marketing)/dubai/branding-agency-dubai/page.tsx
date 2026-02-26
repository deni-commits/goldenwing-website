import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, CheckCircle, Shield, Zap, Users, Award, Globe, MessageCircle, Palette, PenTool, BookOpen, Layers, Eye, FileText, Building2, Gem, ShoppingBag, Briefcase, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { FAQSchema, BreadcrumbListSchema } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { ProcessLargeNumber } from '@/components/process-sections/ProcessLargeNumber'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const pageData = {
  de: {
    meta: {
      title: 'Branding Agentur Dubai | Corporate Identity & Markenstrategie VAE | GoldenWing',
      description: 'Premium Branding-Agentur in Dubai. Wir entwickeln starke Marken für den Luxury-Markt der VAE. ✓ Logo Design ✓ Brand Strategy ✓ Corporate Identity.',
      keywords: ['branding agency dubai', 'branding agentur dubai', 'corporate identity dubai', 'logo design dubai', 'markenstrategie dubai'],
    },
    hero: {
      badge: 'Branding Agency Dubai',
      title: 'Branding Agency Dubai',
      subtitle: 'Corporate Identity & Brand Strategy UAE',
      description: 'In Dubais Luxury-Markt ist eine starke Marke Ihr wichtigstes Asset. Wir entwickeln Premium-Brands, die sich im wettbewerbsintensiven UAE-Markt abheben.',
      ctaPrimary: 'Kostenloses Branding-Gespräch',
      ctaSecondary: 'Portfolio ansehen',
    },
    intro: {
      title: 'Warum Premium Branding in Dubai entscheidend ist',
      content: 'Dubai ist ein Markt der Premium-Marken und Luxury-Experiences. Hier entscheidet die Markenwahrnehmung über Erfolg und Misserfolg. Bei GoldenWing verbinden wir europäische Design-Exzellenz mit tiefem Verständnis für den Gulf-Markt, um Brands zu schaffen, die sowohl lokale als auch internationale Kunden ansprechen.',
    },
    services: {
      title: 'Unsere Branding Services in Dubai',
      items: [
        { icon: PenTool, title: 'Brand Strategy', description: 'Strategische Positionierung Ihrer Marke im UAE-Markt.' },
        { icon: Eye, title: 'Visual Identity', description: 'Einzigartige visuelle Sprache, die im Gedächtnis bleibt.' },
        { icon: Palette, title: 'Logo Design', description: 'Zeitlose Logos, die Ihre Marke perfekt repräsentieren.' },
        { icon: BookOpen, title: 'Brand Guidelines', description: 'Comprehensive Styleguides für konsistente Markenführung.' },
        { icon: Layers, title: 'Rebranding', description: 'Strategische Neupositionierung bestehender Marken.' },
        { icon: FileText, title: 'Naming', description: 'Entwicklung von Marken- und Produktnamen.' },
      ],
    },
    process: {
      title: 'Unser Branding-Prozess',
      steps: [
        { step: '01', title: 'Discovery', description: 'Analyse Ihrer Marke, Zielgruppe und Wettbewerber.' },
        { step: '02', title: 'Strategy', description: 'Entwicklung der Markenpositionierung und Kernbotschaften.' },
        { step: '03', title: 'Design', description: 'Kreative Entwicklung der visuellen Identität.' },
        { step: '04', title: 'Refinement', description: 'Feedback-Runden und Feinschliff.' },
        { step: '05', title: 'Delivery', description: 'Finale Assets und Brand Guidelines.' },
      ],
    },
    pricing: {
      title: 'Branding Preise Dubai',
      description: 'Investment in Ihre Markenidentität.',
      packages: [
        { name: 'Logo Package', price: 'AED 8,000', description: 'Logo & Basics', popular: false, features: ['Logo Design', '3 Konzeptvarianten', 'Alle Dateiformate', 'Visitenkarten-Design', 'Basic Style Guide', '2 Revisionsrunden'] },
        { name: 'Brand Identity', price: 'AED 25,000', description: 'Komplette Visual Identity', popular: true, features: ['Brand Strategy Session', 'Logo Design', 'Color System', 'Typography', 'Visual Elements', 'Brand Guidelines', 'Stationery Design', 'Social Media Templates', '3 Revisionsrunden'] },
        { name: 'Full Branding', price: 'AED 50,000+', description: 'Enterprise Branding', popular: false, features: ['Brand Workshop', 'Market Research', 'Naming (optional)', 'Complete Visual Identity', 'Comprehensive Guidelines', 'Marketing Collateral', 'Packaging Design', 'Web Design Integration', 'Ongoing Support'] },
      ],
    },
    industries: {
      title: 'Branchen die wir in Dubai branden',
      items: [
        { icon: Gem, name: 'Luxury Brands', description: 'High-End Positionierung für den Premium-Markt.' },
        { icon: Building2, name: 'Real Estate', description: 'Developer und Property Branding.' },
        { icon: ShoppingBag, name: 'Retail & E-Commerce', description: 'Consumer Brands für den lokalen Markt.' },
        { icon: Briefcase, name: 'Professional Services', description: 'Finance, Legal, Consulting.' },
      ],
    },
    whyUs: {
      title: 'Warum GoldenWing für Branding in Dubai?',
      items: [
        { icon: Award, title: 'Europäische Design-Exzellenz', description: 'Deutsche Präzision und österreichische Kreativität.' },
        { icon: Globe, title: 'Gulf Market Expertise', description: 'Verständnis für kulturelle Nuancen und lokale Vorlieben.' },
        { icon: Zap, title: 'Premium-Qualität', description: 'Brands für den anspruchsvollen Dubai-Markt.' },
        { icon: Users, title: 'Full-Service', description: 'Branding + Web + Marketing aus einer Hand.' },
        { icon: HeadphonesIcon, title: 'Lokaler Support', description: 'Persönliche Betreuung in Business Bay.' },
        { icon: Shield, title: 'Langfristige Partnerschaft', description: 'Wir wachsen mit Ihrer Marke.' },
      ],
    },
    faqs: [
      { question: 'Was kostet Branding in Dubai?', answer: 'Branding-Projekte in Dubai beginnen bei AED 8.000 für ein Logo-Package und können bis zu AED 50.000+ für umfassende Enterprise-Branding-Projekte reichen.' },
      { question: 'Wie lange dauert ein Branding-Projekt?', answer: 'Ein Logo-Package dauert ca. 2-3 Wochen. Komplette Brand Identity Projekte benötigen 4-6 Wochen. Full Branding für Enterprises kann 8-12 Wochen dauern.' },
      { question: 'Versteht ihr die kulturellen Besonderheiten des arabischen Marktes?', answer: 'Absolut. Wir verstehen die kulturellen Nuancen und entwickeln Brands, die sowohl lokale als auch internationale Zielgruppen ansprechen.' },
      { question: 'Könnt ihr auch arabische Logos und Designs erstellen?', answer: 'Ja, wir arbeiten mit erfahrenen arabischen Typografen zusammen, um zweisprachige Logos und Designs zu entwickeln.' },
      { question: 'Was bekomme ich am Ende eines Branding-Projekts?', answer: 'Sie erhalten alle finalen Design-Dateien, einen umfassenden Brand Styleguide, und bei größeren Projekten auch Templates für verschiedene Anwendungen.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Ihre neue Marke digital präsentiert', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'Ihre Marke sichtbar machen', href: '/dubai/digital-marketing-agency-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Markenbekanntheit durch Suche', href: '/dubai/seo-company-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Bereit für Ihre neue Marke?',
      description: 'Lassen Sie uns über Ihr Branding-Projekt in Dubai sprechen.',
      button: 'Branding-Gespräch vereinbaren',
    },
  },
  en: {
    meta: {
      title: 'Branding Agency Dubai | Corporate Identity & Brand Strategy UAE | GoldenWing',
      description: 'Premium branding agency in Dubai. We develop strong brands for the UAE luxury market. ✓ Logo Design ✓ Brand Strategy ✓ Corporate Identity.',
      keywords: ['branding agency dubai', 'corporate identity dubai', 'logo design dubai', 'brand strategy dubai', 'branding company dubai'],
    },
    hero: {
      badge: 'Branding Agency Dubai',
      title: 'Branding Agency Dubai',
      subtitle: 'Corporate Identity & Brand Strategy UAE',
      description: "In Dubai's luxury market, a strong brand is your most valuable asset. We develop premium brands that stand out in the competitive UAE market.",
      ctaPrimary: 'Free Branding Consultation',
      ctaSecondary: 'View Portfolio',
    },
    intro: {
      title: 'Why Premium Branding is Essential in Dubai',
      content: "Dubai is a market of premium brands and luxury experiences. Here, brand perception determines success or failure. At GoldenWing, we combine European design excellence with deep understanding of the Gulf market to create brands that appeal to both local and international audiences.",
    },
    services: {
      title: 'Our Branding Services in Dubai',
      items: [
        { icon: PenTool, title: 'Brand Strategy', description: 'Strategic positioning of your brand in the UAE market.' },
        { icon: Eye, title: 'Visual Identity', description: 'Unique visual language that stays memorable.' },
        { icon: Palette, title: 'Logo Design', description: 'Timeless logos that perfectly represent your brand.' },
        { icon: BookOpen, title: 'Brand Guidelines', description: 'Comprehensive style guides for consistent brand management.' },
        { icon: Layers, title: 'Rebranding', description: 'Strategic repositioning of existing brands.' },
        { icon: FileText, title: 'Naming', description: 'Development of brand and product names.' },
      ],
    },
    process: {
      title: 'Our Branding Process',
      steps: [
        { step: '01', title: 'Discovery', description: 'Analysis of your brand, target audience, and competitors.' },
        { step: '02', title: 'Strategy', description: 'Development of brand positioning and core messages.' },
        { step: '03', title: 'Design', description: 'Creative development of visual identity.' },
        { step: '04', title: 'Refinement', description: 'Feedback rounds and fine-tuning.' },
        { step: '05', title: 'Delivery', description: 'Final assets and brand guidelines.' },
      ],
    },
    pricing: {
      title: 'Branding Pricing Dubai',
      description: 'Investment in your brand identity.',
      packages: [
        { name: 'Logo Package', price: 'AED 8,000', description: 'Logo & Basics', popular: false, features: ['Logo design', '3 concept variations', 'All file formats', 'Business card design', 'Basic style guide', '2 revision rounds'] },
        { name: 'Brand Identity', price: 'AED 25,000', description: 'Complete Visual Identity', popular: true, features: ['Brand strategy session', 'Logo design', 'Color system', 'Typography', 'Visual elements', 'Brand guidelines', 'Stationery design', 'Social media templates', '3 revision rounds'] },
        { name: 'Full Branding', price: 'AED 50,000+', description: 'Enterprise Branding', popular: false, features: ['Brand workshop', 'Market research', 'Naming (optional)', 'Complete visual identity', 'Comprehensive guidelines', 'Marketing collateral', 'Packaging design', 'Web design integration', 'Ongoing support'] },
      ],
    },
    industries: {
      title: 'Industries We Brand in Dubai',
      items: [
        { icon: Gem, name: 'Luxury Brands', description: 'High-end positioning for the premium market.' },
        { icon: Building2, name: 'Real Estate', description: 'Developer and property branding.' },
        { icon: ShoppingBag, name: 'Retail & E-Commerce', description: 'Consumer brands for the local market.' },
        { icon: Briefcase, name: 'Professional Services', description: 'Finance, Legal, Consulting.' },
      ],
    },
    whyUs: {
      title: 'Why Choose GoldenWing for Branding in Dubai?',
      items: [
        { icon: Award, title: 'European Design Excellence', description: 'German precision and Austrian creativity.' },
        { icon: Globe, title: 'Gulf Market Expertise', description: 'Understanding cultural nuances and local preferences.' },
        { icon: Zap, title: 'Premium Quality', description: 'Brands for the demanding Dubai market.' },
        { icon: Users, title: 'Full-Service', description: 'Branding + Web + Marketing from one source.' },
        { icon: HeadphonesIcon, title: 'Local Support', description: 'Personal service in Business Bay.' },
        { icon: Shield, title: 'Long-term Partnership', description: 'We grow with your brand.' },
      ],
    },
    faqs: [
      { question: 'How much does branding cost in Dubai?', answer: 'Branding projects in Dubai start at AED 8,000 for a logo package and can reach AED 50,000+ for comprehensive enterprise branding projects.' },
      { question: 'How long does a branding project take?', answer: 'A logo package takes about 2-3 weeks. Complete brand identity projects require 4-6 weeks. Full branding for enterprises can take 8-12 weeks.' },
      { question: 'Do you understand the cultural specifics of the Arabian market?', answer: 'Absolutely. We understand the cultural nuances and develop brands that appeal to both local and international audiences.' },
      { question: 'Can you create Arabic logos and designs?', answer: 'Yes, we work with experienced Arabic typographers to develop bilingual logos and designs.' },
      { question: 'What do I get at the end of a branding project?', answer: 'You receive all final design files, a comprehensive brand style guide, and for larger projects also templates for various applications.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Your new brand presented digitally', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'Make your brand visible', href: '/dubai/digital-marketing-agency-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'Brand awareness through search', href: '/dubai/seo-company-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Ready for Your New Brand?',
      description: "Let's discuss your branding project in Dubai.",
      button: 'Schedule Branding Call',
    },
  },
  ru: {
    meta: {
      title: 'Брендинговое агентство Дубай | Корпоративная идентичность и стратегия бренда ОАЭ | GoldenWing',
      description: 'Премиум брендинговое агентство в Дубае. Мы создаем сильные бренды для люксового рынка ОАЭ. ✓ Дизайн логотипа ✓ Стратегия бренда ✓ Корпоративная идентичность.',
      keywords: ['брендинговое агентство дубай', 'корпоративная идентичность дубай', 'дизайн логотипа дубай', 'стратегия бренда дубай', 'брендинг компания дубай'],
    },
    hero: {
      badge: 'Брендинговое агентство Дубай',
      title: 'Брендинговое агентство Дубай',
      subtitle: 'Корпоративная идентичность и стратегия бренда ОАЭ',
      description: 'На люксовом рынке Дубая сильный бренд - ваш самый ценный актив. Мы создаем премиальные бренды, которые выделяются на конкурентном рынке ОАЭ.',
      ctaPrimary: 'Бесплатная консультация по брендингу',
      ctaSecondary: 'Смотреть портфолио',
    },
    intro: {
      title: 'Почему премиум-брендинг важен в Дубае',
      content: 'Дубай - это рынок премиальных брендов и люксового опыта. Здесь восприятие бренда определяет успех или неудачу. В GoldenWing мы сочетаем европейское дизайнерское мастерство с глубоким пониманием рынка Персидского залива, создавая бренды, которые привлекают как местную, так и международную аудиторию.',
    },
    services: {
      title: 'Наши услуги брендинга в Дубае',
      items: [
        { icon: PenTool, title: 'Стратегия бренда', description: 'Стратегическое позиционирование вашего бренда на рынке ОАЭ.' },
        { icon: Eye, title: 'Визуальная идентичность', description: 'Уникальный визуальный язык, который запоминается.' },
        { icon: Palette, title: 'Дизайн логотипа', description: 'Вневременные логотипы, которые идеально представляют ваш бренд.' },
        { icon: BookOpen, title: 'Гайдлайны бренда', description: 'Комплексные руководства по стилю для последовательного управления брендом.' },
        { icon: Layers, title: 'Ребрендинг', description: 'Стратегическое перепозиционирование существующих брендов.' },
        { icon: FileText, title: 'Нейминг', description: 'Разработка названий брендов и продуктов.' },
      ],
    },
    process: {
      title: 'Наш процесс брендинга',
      steps: [
        { step: '01', title: 'Исследование', description: 'Анализ вашего бренда, целевой аудитории и конкурентов.' },
        { step: '02', title: 'Стратегия', description: 'Разработка позиционирования бренда и ключевых сообщений.' },
        { step: '03', title: 'Дизайн', description: 'Творческая разработка визуальной идентичности.' },
        { step: '04', title: 'Доработка', description: 'Раунды обратной связи и тонкая настройка.' },
        { step: '05', title: 'Передача', description: 'Финальные материалы и гайдлайны бренда.' },
      ],
    },
    pricing: {
      title: 'Цены на брендинг в Дубае',
      description: 'Инвестиция в идентичность вашего бренда.',
      packages: [
        { name: 'Пакет логотипа', price: 'AED 8,000', description: 'Логотип и основы', popular: false, features: ['Дизайн логотипа', '3 концептуальных варианта', 'Все форматы файлов', 'Дизайн визитных карточек', 'Базовое руководство по стилю', '2 раунда правок'] },
        { name: 'Идентичность бренда', price: 'AED 25,000', description: 'Полная визуальная идентичность', popular: true, features: ['Сессия по стратегии бренда', 'Дизайн логотипа', 'Цветовая система', 'Типографика', 'Визуальные элементы', 'Гайдлайны бренда', 'Дизайн канцелярии', 'Шаблоны для соцсетей', '3 раунда правок'] },
        { name: 'Полный брендинг', price: 'AED 50,000+', description: 'Корпоративный брендинг', popular: false, features: ['Воркшоп по бренду', 'Исследование рынка', 'Нейминг (опционально)', 'Полная визуальная идентичность', 'Комплексные гайдлайны', 'Маркетинговые материалы', 'Дизайн упаковки', 'Интеграция с веб-дизайном', 'Постоянная поддержка'] },
      ],
    },
    industries: {
      title: 'Отрасли, для которых мы создаем бренды в Дубае',
      items: [
        { icon: Gem, name: 'Люксовые бренды', description: 'Премиальное позиционирование для рынка класса люкс.' },
        { icon: Building2, name: 'Недвижимость', description: 'Брендинг девелоперов и объектов недвижимости.' },
        { icon: ShoppingBag, name: 'Розничная торговля и E-Commerce', description: 'Потребительские бренды для местного рынка.' },
        { icon: Briefcase, name: 'Профессиональные услуги', description: 'Финансы, юриспруденция, консалтинг.' },
      ],
    },
    whyUs: {
      title: 'Почему GoldenWing для брендинга в Дубае?',
      items: [
        { icon: Award, title: 'Европейское дизайнерское мастерство', description: 'Немецкая точность и австрийская креативность.' },
        { icon: Globe, title: 'Экспертиза рынка Персидского залива', description: 'Понимание культурных нюансов и местных предпочтений.' },
        { icon: Zap, title: 'Премиум-качество', description: 'Бренды для требовательного рынка Дубая.' },
        { icon: Users, title: 'Полный сервис', description: 'Брендинг + Веб + Маркетинг из одних рук.' },
        { icon: HeadphonesIcon, title: 'Локальная поддержка', description: 'Персональное обслуживание в Business Bay.' },
        { icon: Shield, title: 'Долгосрочное партнерство', description: 'Мы растем вместе с вашим брендом.' },
      ],
    },
    faqs: [
      { question: 'Сколько стоит брендинг в Дубае?', answer: 'Проекты по брендингу в Дубае начинаются от AED 8,000 за пакет логотипа и могут достигать AED 50,000+ для комплексных корпоративных проектов.' },
      { question: 'Сколько времени занимает проект по брендингу?', answer: 'Пакет логотипа занимает около 2-3 недель. Полные проекты по идентичности бренда требуют 4-6 недель. Полный брендинг для крупных компаний может занять 8-12 недель.' },
      { question: 'Вы понимаете культурную специфику арабского рынка?', answer: 'Безусловно. Мы понимаем культурные нюансы и создаем бренды, которые привлекают как местную, так и международную аудиторию.' },
      { question: 'Можете ли вы создать арабские логотипы и дизайны?', answer: 'Да, мы работаем с опытными арабскими типографами для разработки двуязычных логотипов и дизайнов.' },
      { question: 'Что я получу в конце проекта по брендингу?', answer: 'Вы получаете все финальные дизайн-файлы, комплексное руководство по стилю бренда, а для крупных проектов также шаблоны для различных применений.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Дубай', description: 'Ваш новый бренд в цифровом формате', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'Цифровой маркетинг Дубай', description: 'Сделайте ваш бренд видимым', href: '/dubai/digital-marketing-agency-dubai' as StaticAppPathname },
      { title: 'SEO Дубай', description: 'Узнаваемость бренда через поиск', href: '/dubai/seo-company-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Готовы к вашему новому бренду?',
      description: 'Давайте обсудим ваш проект по брендингу в Дубае.',
      button: 'Запланировать консультацию',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/dubai/branding-agency-dubai', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/dubai/branding-agency-dubai', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: locale === 'de' ? 'de_AT' : locale === 'ru' ? 'ru_RU' : 'en_AE',
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl('/dubai/branding-agency-dubai', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function BrandingAgencyDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const _isEn = locale === 'en'
  const _isRu = locale === 'ru'

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: '/' },
    { name: 'Dubai', url: '/dubai' },
    { name: { de: 'Branding Agentur Dubai', en: 'Branding Agency Dubai', ru: 'Брендинговое агентство Дубай' }[locale], url: '/dubai/branding-agency-dubai' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Branding Services Dubai',
    serviceType: 'Branding',
    url: 'https://goldenwing.at/en/dubai/branding-agency-dubai',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios Dubai',
      url: 'https://goldenwing.at',
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
    },
    areaServed: { '@type': 'City', name: 'Dubai' },
    description: data.meta.description,
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
                <Link href="/referenzen">
                  {data.hero.ctaSecondary}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-16 border-b">
        <Container variant="block">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{data.intro.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {data.intro.content}
            </p>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data?.services?.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data?.services?.items.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process - ProcessLargeNumber Layout */}
      <ProcessLargeNumber
        title={data.process.title}
        subtitle={{ de: 'Unsere bewährte Methodik für starke Marken.', en: 'Our proven methodology for building strong brands.', ru: 'Наша проверенная методология создания сильных брендов.' }[locale]}
        steps={data.process.steps.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* Pricing */}
      <section id="preise" className="py-20 bg-muted/30 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{data.pricing.title}</h2>
            <p className="text-muted-foreground">{data.pricing.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.pricing.packages.map((pkg) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Am beliebtesten', en: 'Most Popular', ru: 'Самый популярный' }[locale]}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <Link href="/kontakt">{{ de: 'Angebot anfordern', en: 'Get Quote', ru: 'Запросить предложение' }[locale]}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.industries.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {data.industries.items.map((industry) => (
              <Card key={industry.name}>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <industry.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">{industry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.whyUs.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.whyUs.items.map((item) => (
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

      {/* Related Services */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {{ de: 'Weitere Services', en: 'Related Services', ru: 'Сопутствующие услуги' }[locale]}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.relatedServices.map((service) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.href as '/dubai/web-design-company-dubai'} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {{ de: 'Mehr erfahren', en: 'Learn more', ru: 'Подробнее' }[locale]} <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

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
                WhatsApp
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* Internal Links */}
      <section className="py-12 border-t">
        <Container variant="block">
          <h3 className="font-semibold mb-6">{{ de: 'Weitere Dubai Services', en: 'More Dubai Services', ru: 'Другие услуги в Дубае' }[locale]}</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/dubai" className="text-muted-foreground hover:text-primary">Dubai Hub</Link>
            <Link href="/dubai/web-design-company-dubai" className="text-muted-foreground hover:text-primary">Web Design Dubai</Link>
            <Link href="/dubai/seo-company-dubai" className="text-muted-foreground hover:text-primary">SEO Dubai</Link>
            <Link href="/dubai/ecommerce-development-dubai" className="text-muted-foreground hover:text-primary">E-commerce Dubai</Link>
            <Link href="/dubai/digital-marketing-agency-dubai" className="text-muted-foreground hover:text-primary">Digital Marketing Dubai</Link>
          </div>
        </Container>
      </section>
    </>
  )
}
