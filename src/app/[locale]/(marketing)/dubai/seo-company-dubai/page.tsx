import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, CheckCircle, Shield, Zap, Users, Award, Globe, TrendingUp, MessageCircle, BarChart3, Link2, FileText, MapPin, ShoppingCart, Building2, Briefcase, HeadphonesIcon } from 'lucide-react'
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
      title: 'SEO Agentur Dubai | Suchmaschinenoptimierung VAE | GoldenWing',
      description: 'Führende SEO-Agentur in Dubai. Datengetriebene Strategien für Google.ae. ✓ Technical SEO ✓ Local SEO ✓ Content Marketing. Bis zu 300% mehr Traffic.',
      keywords: ['seo agentur dubai', 'seo company dubai', 'seo dubai', 'seo services dubai', 'suchmaschinenoptimierung dubai'],
    },
    hero: {
      badge: 'SEO Company Dubai',
      title: 'SEO Company Dubai',
      subtitle: 'Expert Search Engine Optimization UAE',
      description: 'Datengetriebene SEO-Strategien für Dubai Unternehmen. Wir helfen Ihnen, bei Google.ae ganz oben zu ranken und qualifizierten Traffic zu generieren.',
      stat: 'Wir haben Unternehmen geholfen, ihren organischen Traffic um 300%+ zu steigern',
      ctaPrimary: 'Kostenloses SEO Audit',
      ctaSecondary: 'Case Studies ansehen',
    },
    intro: {
      title: 'Warum SEO in Dubai kritisch ist',
      stats: [
        { value: '99%', label: 'Internet-Penetration in den VAE' },
        { value: '$3-10', label: 'Durchschnittlicher CPC bei Google Ads' },
        { value: '70%', label: 'der Klicks gehen an organische Ergebnisse' },
      ],
      content: 'In Dubais wettbewerbsintensivem Markt ist SEO keine Option mehr – es ist eine Notwendigkeit. Mit 99% Internet-Penetration und teuren Google Ads (CPC $3-10) bietet organische Suche den besten ROI für nachhaltige Kundengewinnung.',
    },
    services: {
      title: 'Unsere SEO Services in Dubai',
      categories: [
        {
          title: 'Technical SEO',
          icon: Zap,
          items: ['Website Audits', 'Core Web Vitals Optimierung', 'Mobile Optimierung', 'Site Speed', 'Schema Markup', 'Crawlability & Indexing'],
        },
        {
          title: 'On-Page SEO',
          icon: FileText,
          items: ['Keyword Research (EN & AR)', 'Content Optimierung', 'Meta Tags', 'Internal Linking', 'Bild-Optimierung', 'URL-Struktur'],
        },
        {
          title: 'Off-Page SEO',
          icon: Link2,
          items: ['Link Building (UAE-fokussiert)', 'Digital PR', 'Lokale Citations', 'Brand Mentions', 'Guest Posting', 'Outreach Campaigns'],
        },
        {
          title: 'Local SEO Dubai',
          icon: MapPin,
          items: ['Google Business Profile', 'Lokale Citations', 'Review Management', 'Lokaler Content', 'Maps Optimierung', 'NAP Konsistenz'],
        },
        {
          title: 'E-Commerce SEO',
          icon: ShoppingCart,
          items: ['Produkt-Optimierung', 'Kategorie-Seiten', 'Schema für Produkte', 'Conversion Optimierung', 'Marketplace SEO', 'Wettbewerberanalyse'],
        },
        {
          title: 'Content Marketing',
          icon: FileText,
          items: ['Content-Strategie', 'Blog-Artikel (EN/AR)', 'Pillar Pages', 'Topic Clusters', 'Content Audits', 'Copywriting'],
        },
      ],
    },
    process: {
      title: 'Unser SEO-Prozess',
      steps: [
        { step: '01', title: 'Audit & Analyse', description: 'Umfassende Analyse Ihrer Website und Wettbewerber.' },
        { step: '02', title: 'Strategie-Entwicklung', description: 'Maßgeschneiderter SEO-Plan für Ihre Ziele.' },
        { step: '03', title: 'On-Page Optimierung', description: 'Technische und inhaltliche Verbesserungen.' },
        { step: '04', title: 'Content Creation', description: 'Erstellung von SEO-optimiertem Content.' },
        { step: '05', title: 'Link Building', description: 'Aufbau hochwertiger Backlinks.' },
        { step: '06', title: 'Monitoring & Reporting', description: 'Monatliche Berichte und kontinuierliche Optimierung.' },
      ],
    },
    pricing: {
      title: 'SEO Preise Dubai',
      description: 'Monatliche SEO-Pakete mit transparenter Preisgestaltung.',
      packages: [
        { name: 'Starter', price: 'AED 3,500', period: '/Monat', description: 'Für kleine Unternehmen', popular: false, features: ['10-15 Keywords', 'Monatliches Reporting', 'Technical SEO Basis', 'On-Page Optimierung', '5 Backlinks/Monat', 'Google Business Profile'] },
        { name: 'Growth', price: 'AED 7,000', period: '/Monat', description: 'Für wachsende Unternehmen', popular: true, features: ['25-30 Keywords', 'Wöchentliches Reporting', 'Full Technical SEO', 'Content Creation (2/Monat)', '10 Backlinks/Monat', 'Local SEO', 'Competitor Analysis', 'Dedicated Manager'] },
        { name: 'Enterprise', price: 'AED 15,000+', period: '/Monat', description: 'Für große Unternehmen', popular: false, features: ['50+ Keywords', 'Real-time Dashboard', 'Advanced Technical SEO', 'Content Creation (4+/Monat)', '20+ Backlinks/Monat', 'Multi-Location SEO', 'Custom Reporting', 'Strategy Meetings', '24/7 Support'] },
      ],
    },
    industries: {
      title: 'Branchen SEO in Dubai',
      items: [
        { icon: Building2, name: 'Real Estate SEO', description: 'Rankings für Properties und Developments' },
        { icon: Building2, name: 'Hotel & Hospitality SEO', description: 'Mehr Direktbuchungen durch organische Suche' },
        { icon: ShoppingCart, name: 'E-Commerce SEO', description: 'Produkt- und Kategorie-Rankings' },
        { icon: Briefcase, name: 'Professional Services SEO', description: 'Legal, Finance, Consulting' },
      ],
    },
    caseStudies: {
      title: 'SEO Erfolge',
      cases: [
        { industry: 'Real Estate', result: '+200% Traffic', detail: 'Organischer Traffic innerhalb von 6 Monaten verdreifacht.' },
        { industry: 'E-Commerce', result: '+150% Umsatz', detail: 'Umsatzsteigerung durch verbesserte Produkt-Rankings.' },
        { industry: 'Professional Services', result: 'Top 3 Rankings', detail: 'Für 15 wettbewerbsintensive Keywords in Dubai.' },
      ],
    },
    whyUs: {
      title: 'Warum GoldenWing für SEO in Dubai?',
      items: [
        { icon: Award, title: 'Bewiesene Ergebnisse', description: 'Nachweisbare Erfolge für UAE-Kunden.' },
        { icon: BarChart3, title: 'Transparentes Reporting', description: 'Monatliche Berichte mit allen KPIs.' },
        { icon: Shield, title: 'White-Hat SEO', description: 'Keine Black-Hat Techniken – nachhaltige Ergebnisse.' },
        { icon: Globe, title: 'Zweisprachig (EN/AR)', description: 'SEO für englische und arabische Märkte.' },
        { icon: Users, title: 'Full-Service Integration', description: 'SEO + Content + Development aus einer Hand.' },
        { icon: HeadphonesIcon, title: 'Lokaler Support', description: 'Persönlicher Ansprechpartner in Dubai.' },
      ],
    },
    faqs: [
      { question: 'Was kostet SEO in Dubai?', answer: 'SEO-Services in Dubai kosten typischerweise zwischen AED 3.500 und AED 15.000+ pro Monat, abhängig von Wettbewerb, Anzahl der Keywords und Umfang der Arbeit.' },
      { question: 'Wie lange dauert es, bis SEO Ergebnisse zeigt?', answer: 'Typischerweise 3-6 Monate für erste Ergebnisse, mit signifikanten Verbesserungen in 6-12 Monaten. Hochkompetitive Keywords können länger dauern.' },
      { question: 'Bieten Sie arabisches SEO an?', answer: 'Ja, wir bieten zweisprachiges SEO für Englisch und Arabisch an, inklusive Keyword-Recherche und Content-Optimierung auf Arabisch.' },
      { question: 'Was ist in Ihren SEO-Paketen enthalten?', answer: 'Unsere Pakete umfassen Technical SEO, On-Page Optimierung, Content-Strategie, Link Building, monatliches Reporting und dediziertes Account Management.' },
      { question: 'Können Sie #1 Rankings garantieren?', answer: 'Keine seriöse SEO-Agentur kann spezifische Rankings garantieren. Wir fokussieren uns auf nachhaltiges Wachstum und messbare Verbesserungen in Traffic und Conversions.' },
      { question: 'Was unterscheidet Sie von anderen SEO-Agenturen in Dubai?', answer: 'Europäische Qualitätsstandards, Full-Service Integration (SEO + Development + Content), transparentes Reporting und nachweisbare Ergebnisse für UAE-Kunden.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'SEO-optimierte Websites von Anfang an', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'Ganzheitliche Marketing-Strategie', href: '/dubai/digital-marketing-agency-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'SEO für Online-Shops', href: '/dubai/ecommerce-development-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Kostenloses SEO Audit für Ihre Website',
      description: 'Erfahren Sie, wie Sie bei Google.ae besser ranken können.',
      button: 'Jetzt Audit anfordern',
    },
  },
  en: {
    meta: {
      title: 'SEO Company Dubai | Search Engine Optimization UAE | GoldenWing',
      description: 'Leading SEO company in Dubai. Data-driven strategies for Google.ae. ✓ Technical SEO ✓ Local SEO ✓ Content Marketing. Up to 300% more traffic.',
      keywords: ['seo company dubai', 'seo agency dubai', 'seo dubai', 'seo services dubai', 'search engine optimization dubai'],
    },
    hero: {
      badge: 'SEO Company Dubai',
      title: 'SEO Company Dubai',
      subtitle: 'Expert Search Engine Optimization UAE',
      description: 'Data-driven SEO strategies for Dubai businesses. We help you rank at the top of Google.ae and generate qualified traffic that converts.',
      stat: "We've helped businesses increase organic traffic by 300%+",
      ctaPrimary: 'Get Free SEO Audit',
      ctaSecondary: 'View Case Studies',
    },
    intro: {
      title: 'Why SEO is Critical for Dubai Businesses',
      stats: [
        { value: '99%', label: 'Internet penetration in UAE' },
        { value: '$3-10', label: 'Average CPC on Google Ads' },
        { value: '70%', label: 'of clicks go to organic results' },
      ],
      content: "In Dubai's competitive market, SEO is no longer optional – it's essential. With 99% internet penetration and expensive Google Ads (CPC $3-10), organic search offers the best ROI for sustainable customer acquisition.",
    },
    services: {
      title: 'Our SEO Services in Dubai',
      categories: [
        {
          title: 'Technical SEO',
          icon: Zap,
          items: ['Website Audits', 'Core Web Vitals Optimization', 'Mobile Optimization', 'Site Speed', 'Schema Markup', 'Crawlability & Indexing'],
        },
        {
          title: 'On-Page SEO',
          icon: FileText,
          items: ['Keyword Research (EN & AR)', 'Content Optimization', 'Meta Tags', 'Internal Linking', 'Image Optimization', 'URL Structure'],
        },
        {
          title: 'Off-Page SEO',
          icon: Link2,
          items: ['Link Building (UAE-focused)', 'Digital PR', 'Local Citations', 'Brand Mentions', 'Guest Posting', 'Outreach Campaigns'],
        },
        {
          title: 'Local SEO Dubai',
          icon: MapPin,
          items: ['Google Business Profile', 'Local Citations', 'Review Management', 'Local Content', 'Maps Optimization', 'NAP Consistency'],
        },
        {
          title: 'E-Commerce SEO',
          icon: ShoppingCart,
          items: ['Product Optimization', 'Category Pages', 'Product Schema', 'Conversion Optimization', 'Marketplace SEO', 'Competitor Analysis'],
        },
        {
          title: 'Content Marketing',
          icon: FileText,
          items: ['Content Strategy', 'Blog Articles (EN/AR)', 'Pillar Pages', 'Topic Clusters', 'Content Audits', 'Copywriting'],
        },
      ],
    },
    process: {
      title: 'Our SEO Process',
      steps: [
        { step: '01', title: 'Audit & Analysis', description: 'Comprehensive analysis of your website and competitors.' },
        { step: '02', title: 'Strategy Development', description: 'Custom SEO plan tailored to your goals.' },
        { step: '03', title: 'On-Page Optimization', description: 'Technical and content improvements.' },
        { step: '04', title: 'Content Creation', description: 'SEO-optimized content creation.' },
        { step: '05', title: 'Link Building', description: 'High-quality backlink acquisition.' },
        { step: '06', title: 'Monitoring & Reporting', description: 'Monthly reports and continuous optimization.' },
      ],
    },
    pricing: {
      title: 'SEO Pricing Dubai',
      description: 'Monthly SEO packages with transparent pricing.',
      packages: [
        { name: 'Starter', price: 'AED 3,500', period: '/month', description: 'For small businesses', popular: false, features: ['10-15 keywords', 'Monthly reporting', 'Basic technical SEO', 'On-page optimization', '5 backlinks/month', 'Google Business Profile'] },
        { name: 'Growth', price: 'AED 7,000', period: '/month', description: 'For growing businesses', popular: true, features: ['25-30 keywords', 'Weekly reporting', 'Full technical SEO', 'Content creation (2/month)', '10 backlinks/month', 'Local SEO', 'Competitor analysis', 'Dedicated manager'] },
        { name: 'Enterprise', price: 'AED 15,000+', period: '/month', description: 'For large businesses', popular: false, features: ['50+ keywords', 'Real-time dashboard', 'Advanced technical SEO', 'Content creation (4+/month)', '20+ backlinks/month', 'Multi-location SEO', 'Custom reporting', 'Strategy meetings', '24/7 support'] },
      ],
    },
    industries: {
      title: 'Industry SEO in Dubai',
      items: [
        { icon: Building2, name: 'Real Estate SEO', description: 'Rankings for properties and developments' },
        { icon: Building2, name: 'Hotel & Hospitality SEO', description: 'More direct bookings through organic search' },
        { icon: ShoppingCart, name: 'E-Commerce SEO', description: 'Product and category rankings' },
        { icon: Briefcase, name: 'Professional Services SEO', description: 'Legal, Finance, Consulting' },
      ],
    },
    caseStudies: {
      title: 'SEO Success Stories',
      cases: [
        { industry: 'Real Estate', result: '+200% Traffic', detail: 'Organic traffic tripled within 6 months.' },
        { industry: 'E-Commerce', result: '+150% Revenue', detail: 'Revenue increase through improved product rankings.' },
        { industry: 'Professional Services', result: 'Top 3 Rankings', detail: 'For 15 competitive keywords in Dubai.' },
      ],
    },
    whyUs: {
      title: 'Why Choose GoldenWing for SEO in Dubai?',
      items: [
        { icon: Award, title: 'Proven Results', description: 'Demonstrable success for UAE clients.' },
        { icon: BarChart3, title: 'Transparent Reporting', description: 'Monthly reports with all KPIs.' },
        { icon: Shield, title: 'White-Hat SEO', description: 'No black-hat techniques – sustainable results.' },
        { icon: Globe, title: 'Bilingual (EN/AR)', description: 'SEO for English and Arabic markets.' },
        { icon: Users, title: 'Full-Service Integration', description: 'SEO + Content + Development from one source.' },
        { icon: HeadphonesIcon, title: 'Local Support', description: 'Personal contact in Dubai.' },
      ],
    },
    faqs: [
      { question: 'How much does SEO cost in Dubai?', answer: 'SEO services in Dubai typically range from AED 3,500 to AED 15,000+ per month, depending on competition, number of keywords, and scope of work.' },
      { question: 'How long does SEO take to show results?', answer: 'Typically 3-6 months for initial results, with significant improvements in 6-12 months. Highly competitive keywords may take longer.' },
      { question: 'Do you offer Arabic SEO?', answer: 'Yes, we offer bilingual SEO for both English and Arabic, including keyword research and content optimization in Arabic.' },
      { question: "What's included in your SEO packages?", answer: 'Our packages include technical SEO, on-page optimization, content strategy, link building, monthly reporting, and dedicated account management.' },
      { question: 'Can you guarantee #1 rankings?', answer: 'No legitimate SEO company can guarantee specific rankings. We focus on sustainable growth and measurable improvements in traffic and conversions.' },
      { question: 'What makes you different from other SEO agencies in Dubai?', answer: 'European quality standards, full-service integration (SEO + Development + Content), transparent reporting, and proven results for UAE clients.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'SEO-optimized websites from the start', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'Holistic marketing strategy', href: '/dubai/digital-marketing-agency-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'SEO for online stores', href: '/dubai/ecommerce-development-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Get Your Free SEO Audit Today',
      description: 'Discover how you can rank better on Google.ae.',
      button: 'Request Audit Now',
    },
  },
  ru: {
    meta: {
      title: 'SEO Компания Дубай | Поисковая Оптимизация ОАЭ | GoldenWing',
      description: 'Ведущая SEO-компания в Дубае. Стратегии на основе данных для Google.ae. ✓ Техническое SEO ✓ Локальное SEO ✓ Контент-маркетинг. До 300% больше трафика.',
      keywords: ['seo компания дубай', 'seo агентство дубай', 'seo дубай', 'seo услуги дубай', 'поисковая оптимизация дубай'],
    },
    hero: {
      badge: 'SEO Компания Дубай',
      title: 'SEO Компания Дубай',
      subtitle: 'Экспертная Поисковая Оптимизация ОАЭ',
      description: 'Стратегии SEO на основе данных для компаний Дубая. Мы поможем вам занять топовые позиции в Google.ae и привлечь качественный трафик, который конвертируется.',
      stat: 'Мы помогли компаниям увеличить органический трафик на 300%+',
      ctaPrimary: 'Бесплатный SEO Аудит',
      ctaSecondary: 'Смотреть Кейсы',
    },
    intro: {
      title: 'Почему SEO критически важно для бизнеса в Дубае',
      stats: [
        { value: '99%', label: 'Проникновение интернета в ОАЭ' },
        { value: '$3-10', label: 'Средняя цена клика в Google Ads' },
        { value: '70%', label: 'кликов приходится на органические результаты' },
      ],
      content: 'На конкурентном рынке Дубая SEO больше не опция – это необходимость. При 99% проникновении интернета и дорогой рекламе Google Ads (CPC $3-10) органический поиск обеспечивает лучший ROI для устойчивого привлечения клиентов.',
    },
    services: {
      title: 'Наши SEO Услуги в Дубае',
      categories: [
        {
          title: 'Техническое SEO',
          icon: Zap,
          items: ['Аудит сайта', 'Оптимизация Core Web Vitals', 'Мобильная оптимизация', 'Скорость загрузки', 'Schema разметка', 'Индексация и сканирование'],
        },
        {
          title: 'On-Page SEO',
          icon: FileText,
          items: ['Исследование ключевых слов (EN и AR)', 'Оптимизация контента', 'Мета-теги', 'Внутренняя перелинковка', 'Оптимизация изображений', 'Структура URL'],
        },
        {
          title: 'Off-Page SEO',
          icon: Link2,
          items: ['Линкбилдинг (фокус на ОАЭ)', 'Цифровой PR', 'Локальные упоминания', 'Упоминания бренда', 'Гостевые публикации', 'Аутрич-кампании'],
        },
        {
          title: 'Локальное SEO Дубай',
          icon: MapPin,
          items: ['Google Business Profile', 'Локальные упоминания', 'Управление отзывами', 'Локальный контент', 'Оптимизация карт', 'NAP консистентность'],
        },
        {
          title: 'E-Commerce SEO',
          icon: ShoppingCart,
          items: ['Оптимизация товаров', 'Страницы категорий', 'Schema для товаров', 'Оптимизация конверсии', 'SEO маркетплейсов', 'Анализ конкурентов'],
        },
        {
          title: 'Контент-маркетинг',
          icon: FileText,
          items: ['Контент-стратегия', 'Статьи для блога (EN/AR)', 'Pillar Pages', 'Тематические кластеры', 'Аудит контента', 'Копирайтинг'],
        },
      ],
    },
    process: {
      title: 'Наш SEO-процесс',
      steps: [
        { step: '01', title: 'Аудит и Анализ', description: 'Комплексный анализ вашего сайта и конкурентов.' },
        { step: '02', title: 'Разработка Стратегии', description: 'Индивидуальный SEO-план под ваши цели.' },
        { step: '03', title: 'On-Page Оптимизация', description: 'Технические и контентные улучшения.' },
        { step: '04', title: 'Создание Контента', description: 'Создание SEO-оптимизированного контента.' },
        { step: '05', title: 'Линкбилдинг', description: 'Получение качественных обратных ссылок.' },
        { step: '06', title: 'Мониторинг и Отчётность', description: 'Ежемесячные отчёты и постоянная оптимизация.' },
      ],
    },
    pricing: {
      title: 'Цены на SEO в Дубае',
      description: 'Ежемесячные SEO-пакеты с прозрачным ценообразованием.',
      packages: [
        { name: 'Стартовый', price: 'AED 3,500', period: '/месяц', description: 'Для малого бизнеса', popular: false, features: ['10-15 ключевых слов', 'Ежемесячная отчётность', 'Базовое техническое SEO', 'On-page оптимизация', '5 бэклинков/месяц', 'Google Business Profile'] },
        { name: 'Рост', price: 'AED 7,000', period: '/месяц', description: 'Для растущего бизнеса', popular: true, features: ['25-30 ключевых слов', 'Еженедельная отчётность', 'Полное техническое SEO', 'Создание контента (2/месяц)', '10 бэклинков/месяц', 'Локальное SEO', 'Анализ конкурентов', 'Персональный менеджер'] },
        { name: 'Корпоративный', price: 'AED 15,000+', period: '/месяц', description: 'Для крупного бизнеса', popular: false, features: ['50+ ключевых слов', 'Дашборд в реальном времени', 'Продвинутое техническое SEO', 'Создание контента (4+/месяц)', '20+ бэклинков/месяц', 'Multi-location SEO', 'Кастомная отчётность', 'Стратегические встречи', 'Поддержка 24/7'] },
      ],
    },
    industries: {
      title: 'Отраслевое SEO в Дубае',
      items: [
        { icon: Building2, name: 'SEO для Недвижимости', description: 'Ранжирование для объектов и застроек' },
        { icon: Building2, name: 'SEO для Отелей и Гостеприимства', description: 'Больше прямых бронирований через органический поиск' },
        { icon: ShoppingCart, name: 'SEO для E-Commerce', description: 'Ранжирование товаров и категорий' },
        { icon: Briefcase, name: 'SEO для Профессиональных Услуг', description: 'Юридические, финансовые, консалтинговые услуги' },
      ],
    },
    caseStudies: {
      title: 'Истории Успеха SEO',
      cases: [
        { industry: 'Недвижимость', result: '+200% Трафика', detail: 'Органический трафик утроился за 6 месяцев.' },
        { industry: 'E-Commerce', result: '+150% Выручки', detail: 'Рост выручки благодаря улучшенному ранжированию товаров.' },
        { industry: 'Профессиональные Услуги', result: 'Топ-3 Ранжирование', detail: 'По 15 конкурентным ключевым словам в Дубае.' },
      ],
    },
    whyUs: {
      title: 'Почему GoldenWing для SEO в Дубае?',
      items: [
        { icon: Award, title: 'Доказанные Результаты', description: 'Подтверждённый успех для клиентов из ОАЭ.' },
        { icon: BarChart3, title: 'Прозрачная Отчётность', description: 'Ежемесячные отчёты со всеми KPI.' },
        { icon: Shield, title: 'White-Hat SEO', description: 'Никаких чёрных методов – устойчивые результаты.' },
        { icon: Globe, title: 'Двуязычность (EN/AR)', description: 'SEO для английского и арабского рынков.' },
        { icon: Users, title: 'Полный Спектр Услуг', description: 'SEO + Контент + Разработка из одних рук.' },
        { icon: HeadphonesIcon, title: 'Локальная Поддержка', description: 'Персональный контакт в Дубае.' },
      ],
    },
    faqs: [
      { question: 'Сколько стоит SEO в Дубае?', answer: 'SEO-услуги в Дубае обычно стоят от AED 3,500 до AED 15,000+ в месяц, в зависимости от конкуренции, количества ключевых слов и объёма работ.' },
      { question: 'Сколько времени нужно для результатов SEO?', answer: 'Обычно 3-6 месяцев для первых результатов, со значительными улучшениями через 6-12 месяцев. Высококонкурентные ключевые слова могут требовать больше времени.' },
      { question: 'Вы предлагаете арабское SEO?', answer: 'Да, мы предлагаем двуязычное SEO для английского и арабского языков, включая исследование ключевых слов и оптимизацию контента на арабском.' },
      { question: 'Что включено в ваши SEO-пакеты?', answer: 'Наши пакеты включают техническое SEO, on-page оптимизацию, контент-стратегию, линкбилдинг, ежемесячную отчётность и персонального менеджера.' },
      { question: 'Можете ли вы гарантировать позицию #1?', answer: 'Ни одна добросовестная SEO-компания не может гарантировать конкретные позиции. Мы фокусируемся на устойчивом росте и измеримых улучшениях трафика и конверсий.' },
      { question: 'Чем вы отличаетесь от других SEO-агентств в Дубае?', answer: 'Европейские стандарты качества, полный спектр услуг (SEO + Разработка + Контент), прозрачная отчётность и доказанные результаты для клиентов из ОАЭ.' },
    ],
    relatedServices: [
      { title: 'Веб-дизайн Дубай', description: 'SEO-оптимизированные сайты с самого начала', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'Цифровой Маркетинг Дубай', description: 'Комплексная маркетинговая стратегия', href: '/dubai/digital-marketing-agency-dubai' as StaticAppPathname },
      { title: 'E-Commerce Дубай', description: 'SEO для интернет-магазинов', href: '/dubai/ecommerce-development-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Получите Бесплатный SEO Аудит Сегодня',
      description: 'Узнайте, как улучшить позиции в Google.ae.',
      button: 'Запросить Аудит',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/dubai/seo-company-dubai', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/dubai/seo-company-dubai', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: locale === 'de' ? 'de_AT' : locale === 'ru' ? 'ru_RU' : 'en_AE',
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl('/dubai/seo-company-dubai', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function SEOCompanyDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const isEn = locale === 'en'
  const isRu = locale === 'ru'

  const breadcrumbs = [
    { name: isEn ? 'Home' : isRu ? 'Главная' : 'Startseite', url: '/' },
    { name: isRu ? 'Дубай' : 'Dubai', url: '/dubai' },
    { name: isEn ? 'SEO Company Dubai' : isRu ? 'SEO Компания Дубай' : 'SEO Agentur Dubai', url: '/dubai/seo-company-dubai' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'SEO Services Dubai' : isRu ? 'SEO Услуги Дубай' : 'SEO Services Dubai',
    serviceType: 'Search Engine Optimization',
    url: 'https://goldenwing.at/en/dubai/seo-company-dubai',
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
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
              {data.hero.description}
            </p>
            <p className="text-sm text-primary font-medium mb-8 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {data.hero.stat}
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

      {/* Stats */}
      <section className="py-16 border-b">
        <Container variant="block">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{data.intro.title}</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8 max-w-3xl mx-auto">
            {data.intro.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            {data.intro.content}
          </p>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.services.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.categories.map((category) => (
              <Card key={category.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process - ProcessLargeNumber Layout */}
      <ProcessLargeNumber
        title={data.process.title}
        subtitle={isEn ? 'Our data-driven approach to SEO success.' : isRu ? 'Наш подход к SEO-успеху на основе данных.' : 'Unser datengetriebener Ansatz für SEO-Erfolg.'}
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
                    <Badge>{isEn ? 'Most Popular' : isRu ? 'Самый популярный' : 'Am beliebtesten'}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                    <span className="text-muted-foreground text-sm">{pkg.period}</span>
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
                    <Link href="/kontakt">{isEn ? 'Get Started' : isRu ? 'Начать' : 'Jetzt starten'}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.caseStudies.title}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {data.caseStudies.cases.map((case_) => (
              <Card key={case_.industry} className="text-center">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">{case_.industry}</div>
                  <div className="text-3xl font-bold text-primary mb-2">{case_.result}</div>
                  <p className="text-sm text-muted-foreground">{case_.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20 bg-muted/30">
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
      <section className="py-20">
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
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {isEn ? 'Frequently Asked Questions' : isRu ? 'Часто задаваемые вопросы' : 'Häufig gestellte Fragen'}
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
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {isEn ? 'Related Services in Dubai' : isRu ? 'Связанные услуги в Дубае' : 'Weitere Services in Dubai'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.relatedServices.map((service) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.href as '/dubai/web-design-company-dubai'} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {isEn ? 'Learn more' : isRu ? 'Подробнее' : 'Mehr erfahren'} <ArrowRight className="h-3 w-3" />
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
          <h3 className="font-semibold mb-6">{isEn ? 'More Dubai Services' : isRu ? 'Другие услуги в Дубае' : 'Weitere Dubai Services'}</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/dubai" className="text-muted-foreground hover:text-primary">Dubai Hub</Link>
            <Link href="/dubai/web-design-company-dubai" className="text-muted-foreground hover:text-primary">Web Design Dubai</Link>
            <Link href="/dubai/branding-agency-dubai" className="text-muted-foreground hover:text-primary">Branding Dubai</Link>
            <Link href="/dubai/ecommerce-development-dubai" className="text-muted-foreground hover:text-primary">E-commerce Dubai</Link>
            <Link href="/dubai/digital-marketing-agency-dubai" className="text-muted-foreground hover:text-primary">Digital Marketing Dubai</Link>
          </div>
        </Container>
      </section>
    </>
  )
}
