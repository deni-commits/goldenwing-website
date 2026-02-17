import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, CheckCircle, Users, Award, Globe, MessageCircle, TrendingUp, Target, Mail, Share2, Video, BarChart3, Megaphone, Search, Building2, ShoppingCart, Briefcase, Heart, HeadphonesIcon, PieChart } from 'lucide-react'
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

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const pageData = {
  de: {
    meta: {
      title: 'Digital Marketing Agentur Dubai | Full-Service Marketing VAE | GoldenWing',
      description: 'Führende Digital Marketing Agentur in Dubai. SEO, PPC, Social Media, Content Marketing. ✓ Datengetrieben ✓ ROI-fokussiert ✓ UAE Expertise.',
      keywords: ['digital marketing agency dubai', 'digital marketing agentur dubai', 'online marketing dubai', 'marketing agentur dubai', 'social media marketing dubai'],
    },
    hero: {
      badge: 'Digital Marketing Agency Dubai',
      title: 'Digital Marketing Agency Dubai',
      subtitle: 'Full-Service Marketing UAE',
      description: 'Ganzheitliche Digital Marketing Strategie für den UAE-Markt. Von SEO über PPC bis Social Media – wir bringen Ihre Marke zu den richtigen Kunden.',
      ctaPrimary: 'Kostenloses Marketing-Audit',
      ctaSecondary: 'Case Studies ansehen',
    },
    intro: {
      title: 'Digitales Marketing in den VAE',
      content: 'Die VAE haben eine der höchsten digitalen Penetrationsraten weltweit. Mit 99% Internet-Nutzung und hoher Social Media Aktivität bietet der Markt enormes Potenzial für digitales Marketing. GoldenWing verbindet europäische Marketing-Expertise mit tiefem Verständnis für den lokalen Markt.',
      stats: [
        { value: '99%', label: 'Internet-Penetration' },
        { value: '10M+', label: 'Social Media Nutzer in UAE' },
        { value: '$1.2 Mrd.', label: 'Digital Ad Spend UAE' },
      ],
    },
    services: {
      title: 'Unsere Digital Marketing Services',
      items: [
        { icon: Search, title: 'SEO', description: 'Organische Sichtbarkeit bei Google.ae. On-Page, Off-Page, Technical SEO.', href: '/dubai/seo-company-dubai' as StaticAppPathname },
        { icon: Target, title: 'PPC / Google Ads', description: 'Performance Marketing mit messbarem ROI. Search, Display, YouTube.' },
        { icon: Share2, title: 'Social Media Marketing', description: 'Strategie und Management für Instagram, LinkedIn, TikTok, Facebook.' },
        { icon: Mail, title: 'E-Mail Marketing', description: 'Automatisierung, Nurturing, Newsletter für bessere Conversion.' },
        { icon: Megaphone, title: 'Content Marketing', description: 'Strategischer Content, der Ihre Zielgruppe anspricht und konvertiert.' },
        { icon: Video, title: 'Video Marketing', description: 'YouTube-Optimierung, Social Video, Reels-Strategie.' },
        { icon: BarChart3, title: 'Analytics & Reporting', description: 'Datengetriebene Entscheidungen mit umfassendem Tracking.' },
        { icon: TrendingUp, title: 'Conversion Optimization', description: 'Landing Pages, A/B Testing, User Experience Verbesserung.' },
      ],
    },
    packages: {
      title: 'Marketing Pakete Dubai',
      description: 'Flexible Pakete für verschiedene Unternehmensgrößen.',
      items: [
        { name: 'Starter', price: 'AED 5,000', period: '/Monat', description: 'Für kleine Unternehmen', popular: false, features: ['SEO Basis', 'Social Media (2 Plattformen)', 'Monatliches Reporting', 'Google Analytics Setup', 'Content Calendar', 'Dedizierter Manager'] },
        { name: 'Growth', price: 'AED 12,000', period: '/Monat', description: 'Für wachsende Unternehmen', popular: true, features: ['Full SEO Package', 'PPC Management (bis AED 10k)', 'Social Media (4 Plattformen)', 'Content Creation (4/Monat)', 'E-Mail Marketing', 'Wöchentliches Reporting', 'Conversion Optimization', 'Quarterly Strategy Review'] },
        { name: 'Enterprise', price: 'AED 25,000+', period: '/Monat', description: 'Für große Unternehmen', popular: false, features: ['Full-Service Marketing', 'Unbegrenzter PPC', 'Multi-Channel Strategy', 'Video Content', 'Influencer Marketing', 'Real-time Dashboard', 'Dedicated Team', 'Weekly Strategy Calls', 'Custom Reporting'] },
      ],
    },
    channels: {
      title: 'Marketing-Kanäle für UAE',
      items: [
        { name: 'Google Ads', description: 'Search & Display für hohe Intent-Keywords', spend: 'Hoher ROI' },
        { name: 'Instagram', description: 'Visuelles Marketing, Stories, Reels', spend: '85% UAE Penetration' },
        { name: 'LinkedIn', description: 'B2B Marketing, Thought Leadership', spend: '3M+ UAE Users' },
        { name: 'TikTok', description: 'Gen Z & Millennials, Viral Content', spend: 'Schnell wachsend' },
        { name: 'YouTube', description: 'Video Marketing, Pre-Roll Ads', spend: '95% Reichweite' },
        { name: 'Facebook', description: 'Targeting, Retargeting, Lead Gen', spend: 'Mature Platform' },
      ],
    },
    industries: {
      title: 'Branchen die wir bedienen',
      items: [
        { icon: Building2, name: 'Real Estate', description: 'Lead Generation für Properties' },
        { icon: ShoppingCart, name: 'E-Commerce', description: 'Traffic & Conversion' },
        { icon: Briefcase, name: 'Professional Services', description: 'B2B Lead Generation' },
        { icon: Heart, name: 'Healthcare', description: 'Patient Acquisition' },
      ],
    },
    whyUs: {
      title: 'Warum GoldenWing für Digital Marketing?',
      items: [
        { icon: Award, title: 'Google Partner', description: 'Zertifizierte Google Ads Expertise.' },
        { icon: PieChart, title: 'Datengetrieben', description: 'Entscheidungen basieren auf Daten, nicht Vermutungen.' },
        { icon: TrendingUp, title: 'ROI-fokussiert', description: 'Messbarer Return on Investment.' },
        { icon: Globe, title: 'UAE Expertise', description: 'Verständnis für lokale Märkte und Kultur.' },
        { icon: Users, title: 'Full-Service', description: 'Marketing + Development + Design aus einer Hand.' },
        { icon: HeadphonesIcon, title: 'Lokaler Support', description: 'Persönliche Betreuung in Business Bay.' },
      ],
    },
    faqs: [
      { question: 'Was kostet Digital Marketing in Dubai?', answer: 'Digital Marketing Pakete beginnen bei AED 5.000/Monat für Basis-Services und können je nach Umfang und Kanälen AED 25.000+/Monat erreichen. Dazu kommt das Werbebudget.' },
      { question: 'Wie schnell sehen wir Ergebnisse?', answer: 'PPC zeigt sofortige Ergebnisse nach Launch. SEO benötigt 3-6 Monate für signifikante Verbesserungen. Social Media baut organisch über 2-3 Monate auf.' },
      { question: 'Arbeitet ihr mit kleinen Unternehmen?', answer: 'Ja, unser Starter-Paket ist speziell für KMUs konzipiert. Wir skalieren mit Ihrem Wachstum.' },
      { question: 'Wie wird der Erfolg gemessen?', answer: 'Wir tracken KPIs wie Traffic, Conversions, Cost per Lead, ROAS und mehr. Monatliche Reports zeigen alle wichtigen Metriken.' },
      { question: 'Können Sie auch arabische Kampagnen erstellen?', answer: 'Ja, wir erstellen zweisprachige Kampagnen (Englisch/Arabisch) für maximale Reichweite im UAE-Markt.' },
      { question: 'Was ist im monatlichen Retainer enthalten?', answer: 'Management, Optimierung, Content-Erstellung, Reporting und laufende Strategie-Beratung. Werbebudget ist separat.' },
    ],
    relatedServices: [
      { title: 'SEO Dubai', description: 'Organische Sichtbarkeit', href: '/dubai/seo-company-dubai' as StaticAppPathname },
      { title: 'Web Design Dubai', description: 'Conversion-optimierte Websites', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'Marketing für Online-Shops', href: '/dubai/ecommerce-development-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Starten Sie Ihre Marketing-Kampagne',
      description: 'Kostenloses Marketing-Audit für Ihr Unternehmen.',
      button: 'Marketing-Audit anfordern',
    },
  },
  en: {
    meta: {
      title: 'Digital Marketing Agency Dubai | Full-Service Marketing UAE | GoldenWing',
      description: 'Leading digital marketing agency in Dubai. SEO, PPC, Social Media, Content Marketing. ✓ Data-driven ✓ ROI-focused ✓ UAE Expertise.',
      keywords: ['digital marketing agency dubai', 'online marketing dubai', 'marketing agency dubai', 'social media marketing dubai', 'ppc agency dubai'],
    },
    hero: {
      badge: 'Digital Marketing Agency Dubai',
      title: 'Digital Marketing Agency Dubai',
      subtitle: 'Full-Service Marketing UAE',
      description: 'Comprehensive digital marketing strategy for the UAE market. From SEO to PPC to Social Media – we bring your brand to the right customers.',
      ctaPrimary: 'Free Marketing Audit',
      ctaSecondary: 'View Case Studies',
    },
    intro: {
      title: 'Digital Marketing in UAE',
      content: "The UAE has one of the highest digital penetration rates worldwide. With 99% internet usage and high social media activity, the market offers enormous potential for digital marketing. GoldenWing combines European marketing expertise with deep understanding of the local market.",
      stats: [
        { value: '99%', label: 'Internet Penetration' },
        { value: '10M+', label: 'Social Media Users in UAE' },
        { value: '$1.2B', label: 'Digital Ad Spend UAE' },
      ],
    },
    services: {
      title: 'Our Digital Marketing Services',
      items: [
        { icon: Search, title: 'SEO', description: 'Organic visibility on Google.ae. On-page, off-page, technical SEO.', href: '/dubai/seo-company-dubai' as StaticAppPathname },
        { icon: Target, title: 'PPC / Google Ads', description: 'Performance marketing with measurable ROI. Search, Display, YouTube.' },
        { icon: Share2, title: 'Social Media Marketing', description: 'Strategy and management for Instagram, LinkedIn, TikTok, Facebook.' },
        { icon: Mail, title: 'Email Marketing', description: 'Automation, nurturing, newsletters for better conversion.' },
        { icon: Megaphone, title: 'Content Marketing', description: 'Strategic content that engages your target audience and converts.' },
        { icon: Video, title: 'Video Marketing', description: 'YouTube optimization, social video, Reels strategy.' },
        { icon: BarChart3, title: 'Analytics & Reporting', description: 'Data-driven decisions with comprehensive tracking.' },
        { icon: TrendingUp, title: 'Conversion Optimization', description: 'Landing pages, A/B testing, user experience improvement.' },
      ],
    },
    packages: {
      title: 'Marketing Packages Dubai',
      description: 'Flexible packages for different business sizes.',
      items: [
        { name: 'Starter', price: 'AED 5,000', period: '/month', description: 'For small businesses', popular: false, features: ['Basic SEO', 'Social Media (2 platforms)', 'Monthly reporting', 'Google Analytics setup', 'Content calendar', 'Dedicated manager'] },
        { name: 'Growth', price: 'AED 12,000', period: '/month', description: 'For growing businesses', popular: true, features: ['Full SEO package', 'PPC management (up to AED 10k)', 'Social Media (4 platforms)', 'Content creation (4/month)', 'Email marketing', 'Weekly reporting', 'Conversion optimization', 'Quarterly strategy review'] },
        { name: 'Enterprise', price: 'AED 25,000+', period: '/month', description: 'For large businesses', popular: false, features: ['Full-service marketing', 'Unlimited PPC', 'Multi-channel strategy', 'Video content', 'Influencer marketing', 'Real-time dashboard', 'Dedicated team', 'Weekly strategy calls', 'Custom reporting'] },
      ],
    },
    channels: {
      title: 'Marketing Channels for UAE',
      items: [
        { name: 'Google Ads', description: 'Search & Display for high-intent keywords', spend: 'High ROI' },
        { name: 'Instagram', description: 'Visual marketing, Stories, Reels', spend: '85% UAE Penetration' },
        { name: 'LinkedIn', description: 'B2B marketing, thought leadership', spend: '3M+ UAE Users' },
        { name: 'TikTok', description: 'Gen Z & Millennials, viral content', spend: 'Fast Growing' },
        { name: 'YouTube', description: 'Video marketing, pre-roll ads', spend: '95% Reach' },
        { name: 'Facebook', description: 'Targeting, retargeting, lead gen', spend: 'Mature Platform' },
      ],
    },
    industries: {
      title: 'Industries We Serve',
      items: [
        { icon: Building2, name: 'Real Estate', description: 'Lead generation for properties' },
        { icon: ShoppingCart, name: 'E-Commerce', description: 'Traffic & conversion' },
        { icon: Briefcase, name: 'Professional Services', description: 'B2B lead generation' },
        { icon: Heart, name: 'Healthcare', description: 'Patient acquisition' },
      ],
    },
    whyUs: {
      title: 'Why GoldenWing for Digital Marketing?',
      items: [
        { icon: Award, title: 'Google Partner', description: 'Certified Google Ads expertise.' },
        { icon: PieChart, title: 'Data-Driven', description: 'Decisions based on data, not guesswork.' },
        { icon: TrendingUp, title: 'ROI-Focused', description: 'Measurable return on investment.' },
        { icon: Globe, title: 'UAE Expertise', description: 'Understanding of local markets and culture.' },
        { icon: Users, title: 'Full-Service', description: 'Marketing + development + design from one source.' },
        { icon: HeadphonesIcon, title: 'Local Support', description: 'Personal service in Business Bay.' },
      ],
    },
    faqs: [
      { question: 'How much does digital marketing cost in Dubai?', answer: 'Digital marketing packages start at AED 5,000/month for basic services and can reach AED 25,000+/month depending on scope and channels. Advertising budget is separate.' },
      { question: 'How quickly will we see results?', answer: 'PPC shows immediate results after launch. SEO requires 3-6 months for significant improvements. Social media builds organically over 2-3 months.' },
      { question: 'Do you work with small businesses?', answer: "Yes, our Starter package is specifically designed for SMEs. We scale with your growth." },
      { question: 'How is success measured?', answer: 'We track KPIs like traffic, conversions, cost per lead, ROAS, and more. Monthly reports show all important metrics.' },
      { question: 'Can you create Arabic campaigns?', answer: 'Yes, we create bilingual campaigns (English/Arabic) for maximum reach in the UAE market.' },
      { question: "What's included in the monthly retainer?", answer: 'Management, optimization, content creation, reporting, and ongoing strategy consulting. Advertising budget is separate.' },
    ],
    relatedServices: [
      { title: 'SEO Dubai', description: 'Organic visibility', href: '/dubai/seo-company-dubai' as StaticAppPathname },
      { title: 'Web Design Dubai', description: 'Conversion-optimized websites', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'Marketing for online stores', href: '/dubai/ecommerce-development-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Start Your Marketing Campaign',
      description: 'Free marketing audit for your business.',
      button: 'Request Marketing Audit',
    },
  },
  ru: {
    meta: {
      title: 'Агентство цифрового маркетинга в Дубае | Полный спектр услуг ОАЭ | GoldenWing',
      description: 'Ведущее агентство цифрового маркетинга в Дубае. SEO, PPC, социальные сети, контент-маркетинг. ✓ На основе данных ✓ Ориентация на ROI ✓ Экспертиза в ОАЭ.',
      keywords: ['агентство цифрового маркетинга дубай', 'интернет маркетинг дубай', 'маркетинговое агентство дубай', 'smm дубай', 'ppc агентство дубай'],
    },
    hero: {
      badge: 'Агентство цифрового маркетинга в Дубае',
      title: 'Агентство цифрового маркетинга в Дубае',
      subtitle: 'Полный спектр маркетинговых услуг в ОАЭ',
      description: 'Комплексная стратегия цифрового маркетинга для рынка ОАЭ. От SEO до PPC и социальных сетей – мы приводим вашу аудиторию к вашему бренду.',
      ctaPrimary: 'Бесплатный маркетинговый аудит',
      ctaSecondary: 'Посмотреть кейсы',
    },
    intro: {
      title: 'Цифровой маркетинг в ОАЭ',
      content: 'ОАЭ имеют один из самых высоких показателей цифрового проникновения в мире. С 99% использованием интернета и высокой активностью в социальных сетях рынок предлагает огромный потенциал для цифрового маркетинга. GoldenWing сочетает европейскую маркетинговую экспертизу с глубоким пониманием местного рынка.',
      stats: [
        { value: '99%', label: 'Проникновение интернета' },
        { value: '10M+', label: 'Пользователей соцсетей в ОАЭ' },
        { value: '$1.2 млрд', label: 'Расходы на цифровую рекламу в ОАЭ' },
      ],
    },
    services: {
      title: 'Наши услуги цифрового маркетинга',
      items: [
        { icon: Search, title: 'SEO', description: 'Органическая видимость в Google.ae. On-page, off-page, техническое SEO.', href: '/dubai/seo-company-dubai' as StaticAppPathname },
        { icon: Target, title: 'PPC / Google Ads', description: 'Перформанс-маркетинг с измеримым ROI. Поиск, медийная реклама, YouTube.' },
        { icon: Share2, title: 'Маркетинг в социальных сетях', description: 'Стратегия и управление Instagram, LinkedIn, TikTok, Facebook.' },
        { icon: Mail, title: 'Email-маркетинг', description: 'Автоматизация, nurturing, рассылки для лучшей конверсии.' },
        { icon: Megaphone, title: 'Контент-маркетинг', description: 'Стратегический контент, который привлекает вашу аудиторию и конвертирует.' },
        { icon: Video, title: 'Видеомаркетинг', description: 'Оптимизация YouTube, социальное видео, стратегия Reels.' },
        { icon: BarChart3, title: 'Аналитика и отчетность', description: 'Решения на основе данных с комплексным отслеживанием.' },
        { icon: TrendingUp, title: 'Оптимизация конверсии', description: 'Лендинги, A/B тестирование, улучшение пользовательского опыта.' },
      ],
    },
    packages: {
      title: 'Маркетинговые пакеты Дубай',
      description: 'Гибкие пакеты для бизнеса разного размера.',
      items: [
        { name: 'Стартовый', price: 'AED 5,000', period: '/месяц', description: 'Для малого бизнеса', popular: false, features: ['Базовое SEO', 'Социальные сети (2 платформы)', 'Ежемесячная отчетность', 'Настройка Google Analytics', 'Контент-календарь', 'Персональный менеджер'] },
        { name: 'Рост', price: 'AED 12,000', period: '/месяц', description: 'Для растущего бизнеса', popular: true, features: ['Полный пакет SEO', 'Управление PPC (до AED 10k)', 'Социальные сети (4 платформы)', 'Создание контента (4/месяц)', 'Email-маркетинг', 'Еженедельная отчетность', 'Оптимизация конверсии', 'Квартальный обзор стратегии'] },
        { name: 'Корпоративный', price: 'AED 25,000+', period: '/месяц', description: 'Для крупного бизнеса', popular: false, features: ['Полный спектр маркетинга', 'Безлимитный PPC', 'Мультиканальная стратегия', 'Видеоконтент', 'Инфлюенсер-маркетинг', 'Дашборд в реальном времени', 'Выделенная команда', 'Еженедельные стратегические звонки', 'Индивидуальная отчетность'] },
      ],
    },
    channels: {
      title: 'Маркетинговые каналы для ОАЭ',
      items: [
        { name: 'Google Ads', description: 'Поиск и медийная реклама для высокоинтентных ключевых слов', spend: 'Высокий ROI' },
        { name: 'Instagram', description: 'Визуальный маркетинг, Stories, Reels', spend: '85% проникновение в ОАЭ' },
        { name: 'LinkedIn', description: 'B2B маркетинг, лидерство мнений', spend: '3M+ пользователей в ОАЭ' },
        { name: 'TikTok', description: 'Gen Z и миллениалы, вирусный контент', spend: 'Быстрый рост' },
        { name: 'YouTube', description: 'Видеомаркетинг, pre-roll реклама', spend: '95% охват' },
        { name: 'Facebook', description: 'Таргетинг, ретаргетинг, генерация лидов', spend: 'Зрелая платформа' },
      ],
    },
    industries: {
      title: 'Отрасли, которые мы обслуживаем',
      items: [
        { icon: Building2, name: 'Недвижимость', description: 'Генерация лидов для объектов' },
        { icon: ShoppingCart, name: 'E-Commerce', description: 'Трафик и конверсия' },
        { icon: Briefcase, name: 'Профессиональные услуги', description: 'B2B генерация лидов' },
        { icon: Heart, name: 'Здравоохранение', description: 'Привлечение пациентов' },
      ],
    },
    whyUs: {
      title: 'Почему GoldenWing для цифрового маркетинга?',
      items: [
        { icon: Award, title: 'Партнер Google', description: 'Сертифицированная экспертиза Google Ads.' },
        { icon: PieChart, title: 'На основе данных', description: 'Решения основаны на данных, а не догадках.' },
        { icon: TrendingUp, title: 'Ориентация на ROI', description: 'Измеримая отдача от инвестиций.' },
        { icon: Globe, title: 'Экспертиза в ОАЭ', description: 'Понимание местных рынков и культуры.' },
        { icon: Users, title: 'Полный спектр услуг', description: 'Маркетинг + разработка + дизайн из одних рук.' },
        { icon: HeadphonesIcon, title: 'Локальная поддержка', description: 'Персональное обслуживание в Business Bay.' },
      ],
    },
    faqs: [
      { question: 'Сколько стоит цифровой маркетинг в Дубае?', answer: 'Пакеты цифрового маркетинга начинаются от AED 5,000/месяц за базовые услуги и могут достигать AED 25,000+/месяц в зависимости от объема и каналов. Рекламный бюджет оплачивается отдельно.' },
      { question: 'Как быстро мы увидим результаты?', answer: 'PPC показывает немедленные результаты после запуска. SEO требует 3-6 месяцев для значительных улучшений. Социальные сети органически растут в течение 2-3 месяцев.' },
      { question: 'Работаете ли вы с малым бизнесом?', answer: 'Да, наш Стартовый пакет специально разработан для МСП. Мы масштабируемся вместе с вашим ростом.' },
      { question: 'Как измеряется успех?', answer: 'Мы отслеживаем KPI, такие как трафик, конверсии, стоимость лида, ROAS и другие. Ежемесячные отчеты показывают все важные метрики.' },
      { question: 'Можете ли вы создавать кампании на арабском языке?', answer: 'Да, мы создаем двуязычные кампании (английский/арабский) для максимального охвата на рынке ОАЭ.' },
      { question: 'Что включено в ежемесячный ретейнер?', answer: 'Управление, оптимизация, создание контента, отчетность и постоянные стратегические консультации. Рекламный бюджет оплачивается отдельно.' },
    ],
    relatedServices: [
      { title: 'SEO Дубай', description: 'Органическая видимость', href: '/dubai/seo-company-dubai' as StaticAppPathname },
      { title: 'Веб-дизайн Дубай', description: 'Сайты, оптимизированные для конверсии', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'E-Commerce Дубай', description: 'Маркетинг для интернет-магазинов', href: '/dubai/ecommerce-development-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Запустите вашу маркетинговую кампанию',
      description: 'Бесплатный маркетинговый аудит для вашего бизнеса.',
      button: 'Запросить маркетинговый аудит',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/dubai/digital-marketing-agency-dubai', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/dubai/digital-marketing-agency-dubai', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: locale === 'de' ? 'de_AT' : locale === 'ru' ? 'ru_RU' : 'en_AE',
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl('/dubai/digital-marketing-agency-dubai', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function DigitalMarketingAgencyDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const _isEn = locale === 'en'
  const _isRu = locale === 'ru'

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: '/' },
    { name: { de: 'Dubai', en: 'Dubai', ru: 'Дубай' }[locale], url: '/dubai' },
    { name: { de: 'Digital Marketing Agentur Dubai', en: 'Digital Marketing Agency Dubai', ru: 'Агентство цифрового маркетинга Дубай' }[locale], url: '/dubai/digital-marketing-agency-dubai' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Marketing Services Dubai',
    serviceType: 'Digital Marketing',
    url: 'https://goldenwing.at/en/dubai/digital-marketing-agency-dubai',
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

      {/* Stats */}
      <section className="py-16 border-b">
        <Container variant="block">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">{data.intro.title}</h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">{data.intro.content}</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {data.intro.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.services.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.services.items.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  {service.href && (
                    <Link href={service.href as '/dubai/seo-company-dubai'} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                      {{ de: 'Mehr erfahren', en: 'Learn more', ru: 'Подробнее' }[locale]} <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Packages */}
      <section id="preise" className="py-20 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{data.packages.title}</h2>
            <p className="text-muted-foreground">{data.packages.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.packages.items.map((pkg) => (
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
                    <Link href="/kontakt">{{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale]}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Channels */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.channels.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.channels.items.map((channel) => (
              <Card key={channel.name}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{channel.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                  <Badge variant="secondary">{channel.spend}</Badge>
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
            {{ de: 'Weitere Services', en: 'Related Services', ru: 'Связанные услуги' }[locale]}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.relatedServices.map((service) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.href as '/dubai/seo-company-dubai'} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
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
            <Link href="/dubai/branding-agency-dubai" className="text-muted-foreground hover:text-primary">Branding Dubai</Link>
            <Link href="/dubai/ecommerce-development-dubai" className="text-muted-foreground hover:text-primary">E-commerce Dubai</Link>
          </div>
        </Container>
      </section>
    </>
  )
}
