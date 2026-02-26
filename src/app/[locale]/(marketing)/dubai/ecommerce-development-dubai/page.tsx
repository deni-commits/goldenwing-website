import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, CheckCircle, Shield, Zap, Users, Award, Globe, MessageCircle, ShoppingCart, CreditCard, Truck, BarChart3, Smartphone, Package, Settings, Lock, HeadphonesIcon, Building2, Shirt, Sparkles, Utensils } from 'lucide-react'
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
      title: 'E-Commerce Entwicklung Dubai | Online Shop Agentur VAE | GoldenWing',
      description: 'E-Commerce Agentur in Dubai. Wir entwickeln Online-Shops für den UAE-Markt. ✓ Shopify ✓ WooCommerce ✓ Custom Solutions ✓ Tabby/Tamara Integration.',
      keywords: ['ecommerce development dubai', 'e-commerce agentur dubai', 'online shop dubai', 'shopify dubai', 'woocommerce dubai'],
    },
    hero: {
      badge: 'E-Commerce Development Dubai',
      title: 'E-Commerce Development Dubai',
      subtitle: 'Online Store Solutions UAE',
      description: 'Der UAE E-Commerce Markt wächst rasant. Wir entwickeln Online-Shops, die für den lokalen Markt optimiert sind – mit Payment-Integration (Tabby, Tamara), arabischer Unterstützung und lokaler Logistik.',
      ctaPrimary: 'Kostenloses Beratungsgespräch',
      ctaSecondary: 'Portfolio ansehen',
    },
    intro: {
      title: 'E-Commerce Wachstum in den VAE',
      stats: [
        { value: '$8 Mrd.', label: 'UAE E-Commerce Marktgröße 2024' },
        { value: '+20%', label: 'Jährliches Wachstum' },
        { value: '95%', label: 'Smartphone-Penetration' },
      ],
      content: 'Die VAE sind der am schnellsten wachsende E-Commerce-Markt im Nahen Osten. Mit hoher Kaufkraft und tech-affinen Verbrauchern bietet der Markt enormes Potenzial für Online-Händler.',
    },
    services: {
      title: 'Unsere E-Commerce Services',
      items: [
        { icon: ShoppingCart, title: 'Custom E-Commerce', description: 'Maßgeschneiderte Online-Shops für komplexe Anforderungen.' },
        { icon: Package, title: 'Shopify Development', description: 'Schnelle, skalierbare Shops auf Shopify Plus.' },
        { icon: Settings, title: 'WooCommerce', description: 'WordPress-basierte E-Commerce Lösungen.' },
        { icon: CreditCard, title: 'Payment Integration', description: 'Tabby, Tamara, Network, Payfort und mehr.' },
        { icon: Truck, title: 'Logistik-Integration', description: 'Aramex, DHL, lokale Courier-Services.' },
        { icon: Globe, title: 'Multi-Language', description: 'Zweisprachige Shops (EN/AR) mit RTL-Support.' },
        { icon: Smartphone, title: 'Mobile Commerce', description: 'Mobile-First Design für Smartphone-Nutzer.' },
        { icon: BarChart3, title: 'Analytics & Tracking', description: 'E-Commerce Tracking und Conversion-Optimierung.' },
      ],
    },
    platforms: {
      title: 'E-Commerce Plattformen',
      items: [
        { name: 'Shopify Plus', description: 'Enterprise E-Commerce für hohe Skalierbarkeit', features: ['Schneller Launch', 'Einfache Verwaltung', 'App-Ökosystem', 'Automatische Updates'] },
        { name: 'WooCommerce', description: 'Flexible WordPress-Lösung', features: ['Volle Kontrolle', 'Keine Transaktionsgebühren', 'Unbegrenzte Anpassung', 'SEO-optimiert'] },
        { name: 'Custom Development', description: 'Maßgeschneiderte Lösungen', features: ['Next.js Commerce', 'Headless Architecture', 'API-First', 'Maximale Performance'] },
      ],
    },
    pricing: {
      title: 'E-Commerce Preise Dubai',
      description: 'Investition in Ihren Online-Shop.',
      packages: [
        { name: 'Starter Shop', price: 'AED 20,000', description: 'Shopify/WooCommerce Basis', popular: false, features: ['Bis zu 50 Produkte', 'Standard Theme', 'Payment Integration', 'Responsive Design', 'Basis SEO', '3 Monate Support'] },
        { name: 'Professional', price: 'AED 45,000', description: 'Vollwertiger Online-Shop', popular: true, features: ['Bis zu 500 Produkte', 'Custom Design', 'Zweisprachig (EN/AR)', 'Tabby/Tamara', 'Logistik-Integration', 'Erweiterte SEO', 'Analytics Setup', '6 Monate Support'] },
        { name: 'Enterprise', price: 'AED 100,000+', description: 'Komplexe E-Commerce Lösung', popular: false, features: ['Unbegrenzte Produkte', 'Custom Development', 'Multi-Store', 'ERP Integration', 'Custom Checkout', 'B2B Features', 'Dedicated Team', '12 Monate Support'] },
      ],
    },
    payments: {
      title: 'Payment Lösungen für UAE',
      items: ['Tabby (BNPL)', 'Tamara (BNPL)', 'Network International', 'Payfort', 'Stripe', 'Apple Pay', 'Samsung Pay', 'Cash on Delivery'],
    },
    industries: {
      title: 'E-Commerce für verschiedene Branchen',
      items: [
        { icon: Shirt, name: 'Fashion & Apparel', description: 'Size Guides, Lookbooks, Returns Management' },
        { icon: Sparkles, name: 'Beauty & Cosmetics', description: 'Subscription Boxes, Loyalty Programs' },
        { icon: Building2, name: 'Electronics', description: 'Specs Comparison, Warranty Management' },
        { icon: Utensils, name: 'Food & Beverages', description: 'Subscription, Same-Day Delivery' },
      ],
    },
    whyUs: {
      title: 'Warum GoldenWing für E-Commerce?',
      items: [
        { icon: Award, title: 'UAE Markt-Expertise', description: 'Wir kennen die lokalen Präferenzen und Anforderungen.' },
        { icon: Zap, title: 'Moderne Technologie', description: 'Headless Commerce, API-First Architektur.' },
        { icon: Lock, title: 'Sichere Transaktionen', description: 'PCI-DSS compliant Payment-Integration.' },
        { icon: Users, title: 'Full-Service', description: 'Design + Development + Marketing.' },
        { icon: HeadphonesIcon, title: 'Lokaler Support', description: 'Persönliche Betreuung in Business Bay.' },
        { icon: Shield, title: 'Performance-Garantie', description: 'Schnelle Ladezeiten für beste Conversion.' },
      ],
    },
    faqs: [
      { question: 'Was kostet ein Online-Shop in Dubai?', answer: 'E-Commerce Projekte beginnen bei AED 20.000 für einfache Shops und können bis AED 100.000+ für komplexe Enterprise-Lösungen reichen.' },
      { question: 'Wie lange dauert die Entwicklung eines Online-Shops?', answer: 'Ein Standard-Shop mit Shopify dauert 4-6 Wochen. Custom E-Commerce Lösungen benötigen 8-12 Wochen oder mehr.' },
      { question: 'Welche Payment-Methoden können integriert werden?', answer: 'Wir integrieren alle gängigen UAE Payment-Methoden: Tabby, Tamara, Network International, Payfort, Stripe, Apple Pay und Cash on Delivery.' },
      { question: 'Können Sie einen mehrsprachigen Shop erstellen?', answer: 'Ja, wir erstellen zweisprachige Shops (Englisch/Arabisch) mit korrektem RTL-Support für den arabischen Markt.' },
      { question: 'Bieten Sie auch Wartung und Support an?', answer: 'Ja, alle Pakete beinhalten Support. Für laufende Betreuung bieten wir Wartungsverträge ab AED 2.000/Monat an.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Premium Website Design', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'E-Commerce SEO für bessere Rankings', href: '/dubai/seo-company-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'Traffic für Ihren Shop', href: '/dubai/digital-marketing-agency-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Starten Sie Ihren Online-Shop',
      description: 'Lassen Sie uns über Ihr E-Commerce Projekt sprechen.',
      button: 'Beratungsgespräch vereinbaren',
    },
  },
  en: {
    meta: {
      title: 'E-Commerce Development Dubai | Online Store Agency UAE | GoldenWing',
      description: 'E-commerce agency in Dubai. We develop online stores for the UAE market. ✓ Shopify ✓ WooCommerce ✓ Custom Solutions ✓ Tabby/Tamara Integration.',
      keywords: ['ecommerce development dubai', 'e-commerce agency dubai', 'online store dubai', 'shopify dubai', 'woocommerce dubai'],
    },
    hero: {
      badge: 'E-Commerce Development Dubai',
      title: 'E-Commerce Development Dubai',
      subtitle: 'Online Store Solutions UAE',
      description: "The UAE e-commerce market is growing rapidly. We develop online stores optimized for the local market – with payment integration (Tabby, Tamara), Arabic support, and local logistics.",
      ctaPrimary: 'Free Consultation',
      ctaSecondary: 'View Portfolio',
    },
    intro: {
      title: 'E-Commerce Growth in UAE',
      stats: [
        { value: '$8B', label: 'UAE E-Commerce Market Size 2024' },
        { value: '+20%', label: 'Annual Growth' },
        { value: '95%', label: 'Smartphone Penetration' },
      ],
      content: "The UAE is the fastest-growing e-commerce market in the Middle East. With high purchasing power and tech-savvy consumers, the market offers enormous potential for online retailers.",
    },
    services: {
      title: 'Our E-Commerce Services',
      items: [
        { icon: ShoppingCart, title: 'Custom E-Commerce', description: 'Tailored online stores for complex requirements.' },
        { icon: Package, title: 'Shopify Development', description: 'Fast, scalable stores on Shopify Plus.' },
        { icon: Settings, title: 'WooCommerce', description: 'WordPress-based e-commerce solutions.' },
        { icon: CreditCard, title: 'Payment Integration', description: 'Tabby, Tamara, Network, Payfort and more.' },
        { icon: Truck, title: 'Logistics Integration', description: 'Aramex, DHL, local courier services.' },
        { icon: Globe, title: 'Multi-Language', description: 'Bilingual stores (EN/AR) with RTL support.' },
        { icon: Smartphone, title: 'Mobile Commerce', description: 'Mobile-first design for smartphone users.' },
        { icon: BarChart3, title: 'Analytics & Tracking', description: 'E-commerce tracking and conversion optimization.' },
      ],
    },
    platforms: {
      title: 'E-Commerce Platforms',
      items: [
        { name: 'Shopify Plus', description: 'Enterprise e-commerce for high scalability', features: ['Fast launch', 'Easy management', 'App ecosystem', 'Automatic updates'] },
        { name: 'WooCommerce', description: 'Flexible WordPress solution', features: ['Full control', 'No transaction fees', 'Unlimited customization', 'SEO-optimized'] },
        { name: 'Custom Development', description: 'Tailored solutions', features: ['Next.js Commerce', 'Headless architecture', 'API-first', 'Maximum performance'] },
      ],
    },
    pricing: {
      title: 'E-Commerce Pricing Dubai',
      description: 'Investment in your online store.',
      packages: [
        { name: 'Starter Shop', price: 'AED 20,000', description: 'Basic Shopify/WooCommerce', popular: false, features: ['Up to 50 products', 'Standard theme', 'Payment integration', 'Responsive design', 'Basic SEO', '3 months support'] },
        { name: 'Professional', price: 'AED 45,000', description: 'Full-featured online store', popular: true, features: ['Up to 500 products', 'Custom design', 'Bilingual (EN/AR)', 'Tabby/Tamara', 'Logistics integration', 'Advanced SEO', 'Analytics setup', '6 months support'] },
        { name: 'Enterprise', price: 'AED 100,000+', description: 'Complex e-commerce solution', popular: false, features: ['Unlimited products', 'Custom development', 'Multi-store', 'ERP integration', 'Custom checkout', 'B2B features', 'Dedicated team', '12 months support'] },
      ],
    },
    payments: {
      title: 'Payment Solutions for UAE',
      items: ['Tabby (BNPL)', 'Tamara (BNPL)', 'Network International', 'Payfort', 'Stripe', 'Apple Pay', 'Samsung Pay', 'Cash on Delivery'],
    },
    industries: {
      title: 'E-Commerce for Different Industries',
      items: [
        { icon: Shirt, name: 'Fashion & Apparel', description: 'Size guides, lookbooks, returns management' },
        { icon: Sparkles, name: 'Beauty & Cosmetics', description: 'Subscription boxes, loyalty programs' },
        { icon: Building2, name: 'Electronics', description: 'Specs comparison, warranty management' },
        { icon: Utensils, name: 'Food & Beverages', description: 'Subscription, same-day delivery' },
      ],
    },
    whyUs: {
      title: 'Why GoldenWing for E-Commerce?',
      items: [
        { icon: Award, title: 'UAE Market Expertise', description: 'We know local preferences and requirements.' },
        { icon: Zap, title: 'Modern Technology', description: 'Headless commerce, API-first architecture.' },
        { icon: Lock, title: 'Secure Transactions', description: 'PCI-DSS compliant payment integration.' },
        { icon: Users, title: 'Full-Service', description: 'Design + development + marketing.' },
        { icon: HeadphonesIcon, title: 'Local Support', description: 'Personal service in Business Bay.' },
        { icon: Shield, title: 'Performance Guarantee', description: 'Fast load times for best conversion.' },
      ],
    },
    faqs: [
      { question: 'How much does an online store cost in Dubai?', answer: 'E-commerce projects start at AED 20,000 for simple stores and can reach AED 100,000+ for complex enterprise solutions.' },
      { question: 'How long does it take to develop an online store?', answer: 'A standard Shopify store takes 4-6 weeks. Custom e-commerce solutions require 8-12 weeks or more.' },
      { question: 'What payment methods can be integrated?', answer: 'We integrate all common UAE payment methods: Tabby, Tamara, Network International, Payfort, Stripe, Apple Pay, and Cash on Delivery.' },
      { question: 'Can you create a multilingual store?', answer: 'Yes, we create bilingual stores (English/Arabic) with proper RTL support for the Arabic market.' },
      { question: 'Do you offer maintenance and support?', answer: 'Yes, all packages include support. For ongoing maintenance, we offer contracts starting at AED 2,000/month.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Premium website design', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'E-commerce SEO for better rankings', href: '/dubai/seo-company-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'Traffic for your store', href: '/dubai/digital-marketing-agency-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Launch Your Online Store',
      description: "Let's discuss your e-commerce project.",
      button: 'Schedule Consultation',
    },
  },
  ru: {
    meta: {
      title: 'Разработка E-Commerce Дубай | Агентство интернет-магазинов ОАЭ | GoldenWing',
      description: 'E-commerce агентство в Дубае. Разрабатываем интернет-магазины для рынка ОАЭ. ✓ Shopify ✓ WooCommerce ✓ Индивидуальные решения ✓ Интеграция Tabby/Tamara.',
      keywords: ['разработка ecommerce дубай', 'e-commerce агентство дубай', 'интернет-магазин дубай', 'shopify дубай', 'woocommerce дубай'],
    },
    hero: {
      badge: 'E-Commerce Development Dubai',
      title: 'E-Commerce Development Dubai',
      subtitle: 'Online Store Solutions UAE',
      description: 'Рынок электронной коммерции ОАЭ стремительно растет. Мы разрабатываем интернет-магазины, оптимизированные для местного рынка — с интеграцией платежей (Tabby, Tamara), поддержкой арабского языка и локальной логистикой.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть портфолио',
    },
    intro: {
      title: 'Рост E-Commerce в ОАЭ',
      stats: [
        { value: '$8 млрд', label: 'Объем рынка E-Commerce ОАЭ 2024' },
        { value: '+20%', label: 'Ежегодный рост' },
        { value: '95%', label: 'Проникновение смартфонов' },
      ],
      content: 'ОАЭ — самый быстрорастущий рынок электронной коммерции на Ближнем Востоке. Высокая покупательная способность и технически продвинутые потребители открывают огромный потенциал для онлайн-ритейлеров.',
    },
    services: {
      title: 'Наши E-Commerce услуги',
      items: [
        { icon: ShoppingCart, title: 'Custom E-Commerce', description: 'Индивидуальные интернет-магазины для сложных задач.' },
        { icon: Package, title: 'Shopify Development', description: 'Быстрые, масштабируемые магазины на Shopify Plus.' },
        { icon: Settings, title: 'WooCommerce', description: 'E-commerce решения на базе WordPress.' },
        { icon: CreditCard, title: 'Payment Integration', description: 'Tabby, Tamara, Network, Payfort и другие.' },
        { icon: Truck, title: 'Logistics Integration', description: 'Aramex, DHL, локальные курьерские службы.' },
        { icon: Globe, title: 'Multi-Language', description: 'Двуязычные магазины (EN/AR) с RTL-поддержкой.' },
        { icon: Smartphone, title: 'Mobile Commerce', description: 'Mobile-first дизайн для пользователей смартфонов.' },
        { icon: BarChart3, title: 'Analytics & Tracking', description: 'E-commerce аналитика и оптимизация конверсии.' },
      ],
    },
    platforms: {
      title: 'E-Commerce платформы',
      items: [
        { name: 'Shopify Plus', description: 'Enterprise e-commerce для высокой масштабируемости', features: ['Быстрый запуск', 'Простое управление', 'Экосистема приложений', 'Автоматические обновления'] },
        { name: 'WooCommerce', description: 'Гибкое решение на WordPress', features: ['Полный контроль', 'Без комиссий за транзакции', 'Неограниченная кастомизация', 'SEO-оптимизация'] },
        { name: 'Custom Development', description: 'Индивидуальные решения', features: ['Next.js Commerce', 'Headless архитектура', 'API-first', 'Максимальная производительность'] },
      ],
    },
    pricing: {
      title: 'Цены на E-Commerce в Дубае',
      description: 'Инвестиции в ваш интернет-магазин.',
      packages: [
        { name: 'Starter Shop', price: 'AED 20,000', description: 'Базовый Shopify/WooCommerce', popular: false, features: ['До 50 товаров', 'Стандартная тема', 'Интеграция платежей', 'Адаптивный дизайн', 'Базовое SEO', '3 месяца поддержки'] },
        { name: 'Professional', price: 'AED 45,000', description: 'Полнофункциональный магазин', popular: true, features: ['До 500 товаров', 'Индивидуальный дизайн', 'Двуязычность (EN/AR)', 'Tabby/Tamara', 'Интеграция логистики', 'Расширенное SEO', 'Настройка аналитики', '6 месяцев поддержки'] },
        { name: 'Enterprise', price: 'AED 100,000+', description: 'Комплексное e-commerce решение', popular: false, features: ['Неограниченно товаров', 'Индивидуальная разработка', 'Мульти-магазин', 'Интеграция ERP', 'Кастомный чекаут', 'B2B функции', 'Выделенная команда', '12 месяцев поддержки'] },
      ],
    },
    payments: {
      title: 'Платежные решения для ОАЭ',
      items: ['Tabby (BNPL)', 'Tamara (BNPL)', 'Network International', 'Payfort', 'Stripe', 'Apple Pay', 'Samsung Pay', 'Наложенный платеж'],
    },
    industries: {
      title: 'E-Commerce для разных отраслей',
      items: [
        { icon: Shirt, name: 'Мода и одежда', description: 'Размерные таблицы, лукбуки, управление возвратами' },
        { icon: Sparkles, name: 'Красота и косметика', description: 'Подписочные боксы, программы лояльности' },
        { icon: Building2, name: 'Электроника', description: 'Сравнение характеристик, управление гарантией' },
        { icon: Utensils, name: 'Еда и напитки', description: 'Подписка, доставка в тот же день' },
      ],
    },
    whyUs: {
      title: 'Почему GoldenWing для E-Commerce?',
      items: [
        { icon: Award, title: 'Экспертиза рынка ОАЭ', description: 'Мы знаем местные предпочтения и требования.' },
        { icon: Zap, title: 'Современные технологии', description: 'Headless commerce, API-first архитектура.' },
        { icon: Lock, title: 'Безопасные транзакции', description: 'PCI-DSS совместимая интеграция платежей.' },
        { icon: Users, title: 'Полный сервис', description: 'Дизайн + разработка + маркетинг.' },
        { icon: HeadphonesIcon, title: 'Локальная поддержка', description: 'Персональное обслуживание в Business Bay.' },
        { icon: Shield, title: 'Гарантия производительности', description: 'Быстрая загрузка для лучшей конверсии.' },
      ],
    },
    faqs: [
      { question: 'Сколько стоит интернет-магазин в Дубае?', answer: 'E-commerce проекты начинаются от AED 20,000 для простых магазинов и могут достигать AED 100,000+ для сложных enterprise-решений.' },
      { question: 'Сколько времени занимает разработка интернет-магазина?', answer: 'Стандартный магазин на Shopify занимает 4-6 недель. Индивидуальные e-commerce решения требуют 8-12 недель или больше.' },
      { question: 'Какие способы оплаты можно интегрировать?', answer: 'Мы интегрируем все популярные способы оплаты ОАЭ: Tabby, Tamara, Network International, Payfort, Stripe, Apple Pay и наложенный платеж.' },
      { question: 'Можете ли вы создать многоязычный магазин?', answer: 'Да, мы создаем двуязычные магазины (английский/арабский) с правильной RTL-поддержкой для арабского рынка.' },
      { question: 'Предлагаете ли вы обслуживание и поддержку?', answer: 'Да, все пакеты включают поддержку. Для постоянного обслуживания мы предлагаем контракты от AED 2,000/месяц.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Премиум веб-дизайн', href: '/dubai/web-design-company-dubai' as StaticAppPathname },
      { title: 'SEO Dubai', description: 'E-commerce SEO для лучших позиций', href: '/dubai/seo-company-dubai' as StaticAppPathname },
      { title: 'Digital Marketing Dubai', description: 'Трафик для вашего магазина', href: '/dubai/digital-marketing-agency-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Запустите свой интернет-магазин',
      description: 'Давайте обсудим ваш e-commerce проект.',
      button: 'Записаться на консультацию',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/dubai/ecommerce-development-dubai', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/dubai/ecommerce-development-dubai', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: { de: 'de_AT', en: 'en_AE', ru: 'ru_RU' }[locale],
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl('/dubai/ecommerce-development-dubai', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function EcommerceDevelopmentDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: '/' },
    { name: 'Dubai', url: '/dubai' },
    { name: { de: 'E-Commerce Entwicklung Dubai', en: 'E-Commerce Development Dubai', ru: 'Разработка E-Commerce Дубай' }[locale], url: '/dubai/ecommerce-development-dubai' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'E-Commerce Development Dubai',
    serviceType: 'E-Commerce Development',
    url: 'https://goldenwing.at/en/dubai/ecommerce-development-dubai',
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
                <Link href="/projekte">
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
          <h2 className="text-3xl font-bold mb-12 text-center">{data?.services?.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Platforms */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.platforms.title}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.platforms.items.map((platform) => (
              <Card key={platform.name}>
                <CardHeader>
                  <CardTitle>{platform.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {platform.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

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
                    <Link href="/kontakt">{{ de: 'Angebot anfordern', en: 'Get Quote', ru: 'Получить предложение' }[locale]}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Payments */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">{data.payments.title}</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {data.payments.items.map((payment) => (
              <span key={payment} className="px-5 py-2 bg-muted rounded-full text-sm flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                {payment}
              </span>
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
      <section className="py-20">
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
            <Link href="/dubai/branding-agency-dubai" className="text-muted-foreground hover:text-primary">Branding Dubai</Link>
            <Link href="/dubai/digital-marketing-agency-dubai" className="text-muted-foreground hover:text-primary">Digital Marketing Dubai</Link>
          </div>
        </Container>
      </section>
    </>
  )
}
