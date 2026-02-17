import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, ShoppingCart, TrendingUp, Target, BarChart3, CreditCard, Package, CheckCircle, Phone, Truck, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { BreadcrumbListSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { SupportedLocale } from '@/lib/payload'
import { Container } from '@/components/ui/container'
import { ProcessExpandingRows } from '@/components/process-sections/ProcessExpandingRows'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

const iconMap: Record<string, LucideIcon> = {
  'shopping-cart': ShoppingCart,
  'trending-up': TrendingUp,
  'target': Target,
  'bar-chart-3': BarChart3,
  'credit-card': CreditCard,
  'package': Package,
  'truck': Truck,
}

// E-Commerce Agentur - Volume: 260, KD: 12 (!), CPC: €13.03
const defaultServices = {
  de: [
    { icon: 'shopping-cart', title: 'Shopify & WooCommerce', description: 'Entwicklung und Optimierung auf den fuehrenden E-Commerce-Plattformen. Themes, Apps, Customizations und Migrationen.' },
    { icon: 'target', title: 'E-Commerce SEO', description: 'Produktseiten, Kategorieseiten und technisches SEO fuer Onlineshops. Mehr organischer Traffic und bessere Rankings.' },
    { icon: 'bar-chart-3', title: 'Conversion-Optimierung', description: 'A/B-Testing, UX-Optimierung und Checkout-Verbesserung. Mehr Umsatz aus dem gleichen Traffic.' },
    { icon: 'credit-card', title: 'Google Shopping & Ads', description: 'Shopping-Kampagnen, Performance Max und Suchanzeigen speziell fuer E-Commerce. Profitabler ROAS.' },
    { icon: 'package', title: 'Produkt-Feed Management', description: 'Feed-Optimierung fuer Google, Facebook, Instagram und Marktplaetze. Mehr Sichtbarkeit fuer Ihre Produkte.' },
    { icon: 'truck', title: 'E-Commerce Automation', description: 'Automatisierte Workflows: E-Mail-Marketing, Kundenbindung, Cross-Selling und Warenwirtschaft-Integration.' },
  ],
  en: [
    { icon: 'shopping-cart', title: 'Shopify & WooCommerce', description: 'Development and optimization on leading e-commerce platforms. Themes, apps, customizations and migrations.' },
    { icon: 'target', title: 'E-Commerce SEO', description: 'Product pages, category pages and technical SEO for online shops. More organic traffic and better rankings.' },
    { icon: 'bar-chart-3', title: 'Conversion Optimization', description: 'A/B testing, UX optimization and checkout improvement. More revenue from the same traffic.' },
    { icon: 'credit-card', title: 'Google Shopping & Ads', description: 'Shopping campaigns, Performance Max and search ads specifically for e-commerce. Profitable ROAS.' },
    { icon: 'package', title: 'Product Feed Management', description: 'Feed optimization for Google, Facebook, Instagram and marketplaces. More visibility for your products.' },
    { icon: 'truck', title: 'E-Commerce Automation', description: 'Automated workflows: email marketing, customer retention, cross-selling and inventory integration.' },
  ],
  ru: [
    { icon: 'shopping-cart', title: 'Shopify & WooCommerce', description: 'Разработка и оптимизация на ведущих e-commerce платформах. Темы, приложения, кастомизации и миграции.' },
    { icon: 'target', title: 'E-Commerce SEO', description: 'Страницы товаров, категорий и техническое SEO для интернет-магазинов. Больше органического трафика и лучшие позиции.' },
    { icon: 'bar-chart-3', title: 'Оптимизация конверсии', description: 'A/B-тестирование, UX-оптимизация и улучшение checkout. Больше дохода от того же трафика.' },
    { icon: 'credit-card', title: 'Google Shopping & Ads', description: 'Shopping-кампании, Performance Max и поисковая реклама специально для e-commerce. Прибыльный ROAS.' },
    { icon: 'package', title: 'Управление продуктовыми фидами', description: 'Оптимизация фидов для Google, Facebook, Instagram и маркетплейсов. Больше видимости для ваших товаров.' },
    { icon: 'truck', title: 'E-Commerce автоматизация', description: 'Автоматизированные процессы: email-маркетинг, удержание клиентов, кросс-продажи и интеграция с учетными системами.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'E-Commerce Starter', price: '990', priceType: 'pro Monat', description: 'Fuer kleine Shops (bis 500 Produkte)', popular: false, features: ['E-Commerce SEO Grundlagen', 'Google Shopping Setup', 'Basis Feed-Optimierung', 'Monatliches Reporting', 'Technischer Support', '4 Stunden Betreuung/Monat'] },
    { name: 'E-Commerce Business', price: '1.990', priceType: 'pro Monat', description: 'Fuer wachsende Shops', popular: true, features: ['Vollstaendiges E-Commerce SEO', 'Google Shopping & Performance Max', 'Feed-Management (alle Kanaele)', 'Conversion-Optimierung', 'E-Mail-Marketing Setup', 'Bi-Weekly Strategy Calls', '8 Stunden Betreuung/Monat'] },
    { name: 'E-Commerce Premium', price: '3.990', priceType: 'pro Monat', description: 'Enterprise E-Commerce', popular: false, features: ['Enterprise SEO-Strategie', 'Multi-Channel Advertising', 'Advanced Feed-Optimierung', 'CRO & UX-Analyse', 'Marketing Automation', 'Woechentliche Strategy Calls', 'Dedizierter E-Commerce Manager', '16 Stunden Betreuung/Monat'] },
  ],
  en: [
    { name: 'E-Commerce Starter', price: '990', priceType: 'per month', description: 'For small shops (up to 500 products)', popular: false, features: ['E-commerce SEO basics', 'Google Shopping setup', 'Basic feed optimization', 'Monthly reporting', 'Technical support', '4 hours support/month'] },
    { name: 'E-Commerce Business', price: '1,990', priceType: 'per month', description: 'For growing shops', popular: true, features: ['Complete e-commerce SEO', 'Google Shopping & Performance Max', 'Feed management (all channels)', 'Conversion optimization', 'Email marketing setup', 'Bi-weekly strategy calls', '8 hours support/month'] },
    { name: 'E-Commerce Premium', price: '3,990', priceType: 'per month', description: 'Enterprise e-commerce', popular: false, features: ['Enterprise SEO strategy', 'Multi-channel advertising', 'Advanced feed optimization', 'CRO & UX analysis', 'Marketing automation', 'Weekly strategy calls', 'Dedicated e-commerce manager', '16 hours support/month'] },
  ],
  ru: [
    { name: 'E-Commerce Starter', price: '990', priceType: 'в месяц', description: 'Для небольших магазинов (до 500 товаров)', popular: false, features: ['Основы E-Commerce SEO', 'Настройка Google Shopping', 'Базовая оптимизация фидов', 'Ежемесячная отчетность', 'Техническая поддержка', '4 часа поддержки/месяц'] },
    { name: 'E-Commerce Business', price: '1 990', priceType: 'в месяц', description: 'Для растущих магазинов', popular: true, features: ['Полное E-Commerce SEO', 'Google Shopping & Performance Max', 'Управление фидами (все каналы)', 'Оптимизация конверсии', 'Настройка email-маркетинга', 'Стратегические звонки 2 раза в месяц', '8 часов поддержки/месяц'] },
    { name: 'E-Commerce Premium', price: '3 990', priceType: 'в месяц', description: 'Enterprise E-Commerce', popular: false, features: ['Enterprise SEO-стратегия', 'Многоканальная реклама', 'Продвинутая оптимизация фидов', 'CRO & UX-анализ', 'Автоматизация маркетинга', 'Еженедельные стратегические звонки', 'Персональный E-Commerce менеджер', '16 часов поддержки/месяц'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '+156%', label: 'Durchschnittliche Umsatzsteigerung', client: 'Nach 12 Monaten' },
    { metric: '3.8x', label: 'ROAS bei Shopping Ads', client: 'Durchschnitt aller Kunden' },
    { metric: '50+', label: 'E-Commerce Projekte', client: 'Erfolgreich umgesetzt' },
  ],
  en: [
    { metric: '+156%', label: 'Average revenue increase', client: 'After 12 months' },
    { metric: '3.8x', label: 'ROAS on Shopping Ads', client: 'Average across all clients' },
    { metric: '50+', label: 'E-commerce projects', client: 'Successfully implemented' },
  ],
  ru: [
    { metric: '+156%', label: 'Средний рост выручки', client: 'За 12 месяцев' },
    { metric: '3.8x', label: 'ROAS в Shopping Ads', client: 'В среднем по всем клиентам' },
    { metric: '50+', label: 'E-Commerce проектов', client: 'Успешно реализовано' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was macht eine E-Commerce Agentur?', answer: 'Eine E-Commerce Agentur spezialisiert sich auf Onlineshops: Entwicklung, Optimierung, Marketing und Wachstum. Wir verstehen die spezifischen Anforderungen von E-Commerce – von technischem SEO fuer Produktseiten bis zu Shopping-Kampagnen und Conversion-Optimierung.' },
    { question: 'Welche E-Commerce Plattformen unterstuetzt ihr?', answer: 'Wir arbeiten mit Shopify, WooCommerce, Magento und individuellen Loesungen. Shopify empfehlen wir fuer die meisten Projekte aufgrund von Skalierbarkeit und App-Oekosystem. WooCommerce ist ideal fuer WordPress-basierte Loesungen.' },
    { question: 'Was kostet E-Commerce Marketing?', answer: 'Unsere E-Commerce-Betreuung startet bei 990 Euro pro Monat fuer kleine Shops. Das Business-Paket fuer wachsende Shops kostet 1.990 Euro, das Premium-Paket fuer Enterprise-Kunden 3.990 Euro monatlich (zzgl. Werbebudget).' },
    { question: 'Wie schnell kann ich mit Umsatzsteigerungen rechnen?', answer: 'Bei Google Shopping sehen Sie oft innerhalb von 2-4 Wochen erste Verkaufssteigerungen. SEO-Verbesserungen zeigen sich nach 3-6 Monaten. Conversion-Optimierung kann sofortige Ergebnisse liefern, je nach implementierten Aenderungen.' },
    { question: 'Betreibt ihr auch unseren Shop?', answer: 'Wir bieten Marketing und Optimierung, nicht den operativen Shop-Betrieb. Fuer Fulfillment, Kundenservice und Lagerhaltung empfehlen wir spezialisierte Partner. Wir konzentrieren uns auf Traffic, Conversions und Wachstum.' },
    { question: 'Was ist der Unterschied zu einer normalen Marketing-Agentur?', answer: 'E-Commerce erfordert spezielles Know-how: Produkt-Feed-Management, Shopping-Kampagnen, Kategorie-SEO, Checkout-Optimierung. Eine spezialisierte E-Commerce Agentur kennt die Besonderheiten und Best Practices fuer Onlineshops.' },
  ],
  en: [
    { question: 'What does an e-commerce agency do?', answer: 'An e-commerce agency specializes in online shops: development, optimization, marketing and growth. We understand the specific requirements of e-commerce – from technical SEO for product pages to shopping campaigns and conversion optimization.' },
    { question: 'Which e-commerce platforms do you support?', answer: 'We work with Shopify, WooCommerce, Magento and custom solutions. We recommend Shopify for most projects due to scalability and app ecosystem. WooCommerce is ideal for WordPress-based solutions.' },
    { question: 'How much does e-commerce marketing cost?', answer: 'Our e-commerce support starts at 990 euros per month for small shops. The Business package for growing shops costs 1,990 euros, the Premium package for enterprise clients 3,990 euros monthly (plus ad budget).' },
    { question: 'How quickly can I expect revenue increases?', answer: 'With Google Shopping, you often see first sales increases within 2-4 weeks. SEO improvements show after 3-6 months. Conversion optimization can deliver immediate results, depending on implemented changes.' },
    { question: 'Do you also operate our shop?', answer: 'We offer marketing and optimization, not operational shop management. For fulfillment, customer service and warehousing, we recommend specialized partners. We focus on traffic, conversions and growth.' },
    { question: 'What\'s the difference from a normal marketing agency?', answer: 'E-commerce requires special know-how: product feed management, shopping campaigns, category SEO, checkout optimization. A specialized e-commerce agency knows the specifics and best practices for online shops.' },
  ],
  ru: [
    { question: 'Чем занимается E-Commerce агентство?', answer: 'E-Commerce агентство специализируется на интернет-магазинах: разработка, оптимизация, маркетинг и рост. Мы понимаем специфические требования e-commerce — от технического SEO для страниц товаров до shopping-кампаний и оптимизации конверсии.' },
    { question: 'Какие E-Commerce платформы вы поддерживаете?', answer: 'Мы работаем с Shopify, WooCommerce, Magento и индивидуальными решениями. Shopify рекомендуем для большинства проектов благодаря масштабируемости и экосистеме приложений. WooCommerce идеален для решений на базе WordPress.' },
    { question: 'Сколько стоит E-Commerce маркетинг?', answer: 'Наша поддержка e-commerce начинается от 990 евро в месяц для небольших магазинов. Пакет Business для растущих магазинов стоит 1 990 евро, пакет Premium для enterprise-клиентов — 3 990 евро в месяц (плюс рекламный бюджет).' },
    { question: 'Как быстро я могу ожидать роста выручки?', answer: 'В Google Shopping первые увеличения продаж часто видны в течение 2-4 недель. SEO-улучшения проявляются через 3-6 месяцев. Оптимизация конверсии может дать немедленные результаты в зависимости от внедренных изменений.' },
    { question: 'Вы также управляете нашим магазином?', answer: 'Мы предлагаем маркетинг и оптимизацию, а не операционное управление магазином. Для фулфилмента, клиентского сервиса и складского хранения мы рекомендуем специализированных партнеров. Мы фокусируемся на трафике, конверсиях и росте.' },
    { question: 'В чем отличие от обычного маркетингового агентства?', answer: 'E-commerce требует специальных знаний: управление продуктовыми фидами, shopping-кампании, SEO категорий, оптимизация checkout. Специализированное E-Commerce агентство знает особенности и лучшие практики для интернет-магазинов.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Shop-Audit', description: 'Analyse von Technik, SEO, UX und Performance' },
    { step: '02', title: 'Strategie', description: 'Roadmap fuer Traffic, Conversions und Umsatz' },
    { step: '03', title: 'Setup', description: 'Feeds, Tracking, Kampagnen einrichten' },
    { step: '04', title: 'Optimierung', description: 'Laufende Tests und Verbesserungen' },
    { step: '05', title: 'Skalierung', description: 'Profitable Kanaele ausbauen' },
  ],
  en: [
    { step: '01', title: 'Shop Audit', description: 'Analysis of tech, SEO, UX and performance' },
    { step: '02', title: 'Strategy', description: 'Roadmap for traffic, conversions and revenue' },
    { step: '03', title: 'Setup', description: 'Set up feeds, tracking, campaigns' },
    { step: '04', title: 'Optimization', description: 'Ongoing testing and improvements' },
    { step: '05', title: 'Scaling', description: 'Expand profitable channels' },
  ],
  ru: [
    { step: '01', title: 'Аудит магазина', description: 'Анализ технической части, SEO, UX и производительности' },
    { step: '02', title: 'Стратегия', description: 'Дорожная карта для трафика, конверсий и выручки' },
    { step: '03', title: 'Настройка', description: 'Настройка фидов, отслеживания, кампаний' },
    { step: '04', title: 'Оптимизация', description: 'Постоянное тестирование и улучшения' },
    { step: '05', title: 'Масштабирование', description: 'Расширение прибыльных каналов' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Onlineshop Agentur', description: 'Shop-Entwicklung und Design.', href: '/leistungen/onlineshop-agentur' },
    { title: 'Google Ads Agentur', description: 'Bezahlte Werbung fuer E-Commerce.', href: '/leistungen/google-ads-agentur' },
    { title: 'SEO Betreuung', description: 'Organische Sichtbarkeit fuer Ihren Shop.', href: '/leistungen/seo-betreuung' },
  ],
  en: [
    { title: 'Online Shop Agency', description: 'Shop development and design.', href: '/leistungen/onlineshop-agentur' },
    { title: 'Google Ads Agency', description: 'Paid advertising for e-commerce.', href: '/leistungen/google-ads-agentur' },
    { title: 'SEO Support', description: 'Organic visibility for your shop.', href: '/leistungen/seo-betreuung' },
  ],
  ru: [
    { title: 'Агентство интернет-магазинов', description: 'Разработка и дизайн магазина.', href: '/leistungen/onlineshop-agentur' },
    { title: 'Агентство Google Ads', description: 'Платная реклама для e-commerce.', href: '/leistungen/google-ads-agentur' },
    { title: 'SEO поддержка', description: 'Органическая видимость для вашего магазина.', href: '/leistungen/seo-betreuung' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const defaultUsps = {
  de: [
    { title: 'E-Commerce Spezialisten', description: '50+ erfolgreich betreute Onlineshops.' },
    { title: 'Plattform-Experten', description: 'Zertifiziert fuer Shopify und WooCommerce.' },
    { title: 'Performance-Fokus', description: 'Umsatz und ROAS, nicht nur Traffic.' },
    { title: 'Full-Funnel Betreuung', description: 'Von Traffic bis Retention.' },
  ],
  en: [
    { title: 'E-Commerce Specialists', description: '50+ successfully managed online shops.' },
    { title: 'Platform Experts', description: 'Certified for Shopify and WooCommerce.' },
    { title: 'Performance Focus', description: 'Revenue and ROAS, not just traffic.' },
    { title: 'Full-Funnel Support', description: 'From traffic to retention.' },
  ],
  ru: [
    { title: 'E-Commerce специалисты', description: '50+ успешно управляемых интернет-магазинов.' },
    { title: 'Эксперты по платформам', description: 'Сертифицированы для Shopify и WooCommerce.' },
    { title: 'Фокус на результат', description: 'Выручка и ROAS, а не только трафик.' },
    { title: 'Полная воронка', description: 'От трафика до удержания.' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = {
    de: 'E-Commerce Agentur Wien - Onlineshop Marketing & Wachstum | GoldenWing',
    en: 'E-Commerce Agency Vienna - Online Shop Marketing & Growth | GoldenWing',
    ru: 'E-Commerce агентство Вена - Маркетинг интернет-магазинов | GoldenWing',
  }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency Vienna - Online Shop Marketing & Growth | GoldenWing'

  const metaDescription = truncateMetaDescription(
    {
      de: 'E-Commerce Agentur fuer Shopify & WooCommerce. SEO, Google Shopping, Conversion-Optimierung. Durchschnittlich +156% Umsatzsteigerung. Betreuung ab 990 EUR/Monat.',
      en: 'E-commerce agency for Shopify & WooCommerce. SEO, Google Shopping, conversion optimization. Average +156% revenue increase. Support from 990 EUR/month.',
      ru: 'E-Commerce агентство для Shopify & WooCommerce. SEO, Google Shopping, оптимизация конверсии. В среднем +156% роста выручки. Поддержка от 990 EUR/месяц.',
    }[locale as 'de' | 'en' | 'ru'] ?? 'E-commerce agency for Shopify & WooCommerce. SEO, Google Shopping, conversion optimization. Average +156% revenue increase. Support from 990 EUR/month.'
  )

  const hreflangAlternates = getHreflangAlternates('/leistungen/ecommerce-agentur', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: {
      de: ['E-Commerce Agentur', 'E-Commerce Agentur Wien', 'Onlineshop Agentur', 'Shopify Agentur', 'WooCommerce Agentur', 'E-Commerce Marketing', 'Shop SEO'],
      en: ['E-Commerce Agency', 'E-Commerce Agency Vienna', 'Online Shop Agency', 'Shopify Agency', 'WooCommerce Agency', 'E-Commerce Marketing', 'Shop SEO'],
      ru: ['E-Commerce агентство', 'E-Commerce агентство Вена', 'Агентство интернет-магазинов', 'Shopify агентство', 'WooCommerce агентство', 'E-Commerce маркетинг', 'SEO магазина'],
    }[locale as 'de' | 'en' | 'ru'] ?? ['E-Commerce Agency', 'E-Commerce Agency Vienna', 'Online Shop Agency', 'Shopify Agency', 'WooCommerce Agency', 'E-Commerce Marketing', 'Shop SEO'],
    openGraph: {
      title: { de: 'E-Commerce Agentur Wien', en: 'E-Commerce Agency Vienna', ru: 'E-Commerce агентство Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency Vienna',
      description: metaDescription,
      url: getCanonicalUrl('/leistungen/ecommerce-agentur', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - E-Commerce Agentur' }],
    },
    alternates: {
      canonical: getCanonicalUrl('/leistungen/ecommerce-agentur', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function EcommerceAgenturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'common' })
  const _isEn = locale === 'en'

  const heroData = {
    badge: { de: 'E-Commerce Agentur', en: 'E-Commerce Agency', ru: 'E-Commerce агентство' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency',
    title: { de: 'E-Commerce Agentur Wien', en: 'E-Commerce Agency Vienna', ru: 'E-Commerce агентство Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency Vienna',
    subtitle: { de: 'Mehr Traffic. Mehr Conversions. Mehr Umsatz.', en: 'More Traffic. More Conversions. More Revenue.', ru: 'Больше трафика. Больше конверсий. Больше выручки.' }[locale as 'de' | 'en' | 'ru'] ?? 'More Traffic. More Conversions. More Revenue.',
    description: {
      de: 'Spezialisiertes E-Commerce Marketing fuer Onlineshops. Von SEO ueber Google Shopping bis Conversion-Optimierung – wir lassen Ihren Shop nachhaltig und profitabel wachsen.',
      en: 'Specialized e-commerce marketing for online shops. From SEO and Google Shopping to conversion optimization – we grow your shop sustainably and profitably.',
      ru: 'Специализированный E-Commerce маркетинг для интернет-магазинов. От SEO и Google Shopping до оптимизации конверсии — мы развиваем ваш магазин устойчиво и прибыльно.',
    }[locale as 'de' | 'en' | 'ru'] ?? 'Specialized e-commerce marketing for online shops. From SEO and Google Shopping to conversion optimization – we grow your shop sustainably and profitably.',
    ctaPrimary: { de: 'Kostenloses Shop-Audit', en: 'Free Shop Audit', ru: 'Бесплатный аудит магазина' }[locale as 'de' | 'en' | 'ru'] ?? 'Free Shop Audit',
    ctaSecondary: { de: 'Pakete ansehen', en: 'View Packages', ru: 'Смотреть пакеты' }[locale as 'de' | 'en' | 'ru'] ?? 'View Packages',
  }

  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const usps = defaultUsps[locale as 'de' | 'en' | 'ru'] ?? defaultUsps['en']

  const servicesTitle = { de: 'Unsere E-Commerce Leistungen', en: 'Our E-Commerce Services', ru: 'Наши E-Commerce услуги' }[locale as 'de' | 'en' | 'ru'] ?? 'Our E-Commerce Services'
  const servicesDescription = {
    de: 'Full-Service E-Commerce Marketing fuer nachhaltiges Shop-Wachstum.',
    en: 'Full-service e-commerce marketing for sustainable shop growth.',
    ru: 'Полный комплекс E-Commerce маркетинга для устойчивого роста магазина.',
  }[locale as 'de' | 'en' | 'ru'] ?? 'Full-service e-commerce marketing for sustainable shop growth.'
  const pricingTitle = { de: 'E-Commerce Pakete', en: 'E-Commerce Packages', ru: 'E-Commerce пакеты' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Packages'
  const pricingDescription = {
    de: 'Transparente Monatspreise. Alle Preise exkl. Werbebudget.',
    en: 'Transparent monthly pricing. All prices exclude ad budget.',
    ru: 'Прозрачные ежемесячные цены. Все цены без рекламного бюджета.',
  }[locale as 'de' | 'en' | 'ru'] ?? 'Transparent monthly pricing. All prices exclude ad budget.'
  const processTitle = { de: 'So lassen wir Ihren Shop wachsen', en: 'How We Grow Your Shop', ru: 'Как мы развиваем ваш магазин' }[locale as 'de' | 'en' | 'ru'] ?? 'How We Grow Your Shop'
  const processDescription = {
    de: 'Bewaehrter Prozess fuer E-Commerce Erfolg.',
    en: 'Proven process for e-commerce success.',
    ru: 'Проверенный процесс для успеха в E-Commerce.',
  }[locale as 'de' | 'en' | 'ru'] ?? 'Proven process for e-commerce success.'
  const faqTitle = { de: 'Haeufige Fragen zur E-Commerce Agentur', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale as 'de' | 'en' | 'ru'] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale as 'de' | 'en' | 'ru'] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit, Ihren Shop zu skalieren?', en: 'Ready to Grow Your Online Shop?', ru: 'Готовы масштабировать ваш магазин?' }[locale as 'de' | 'en' | 'ru'] ?? 'Ready to Grow Your Online Shop?'
  const ctaDescription = {
    de: 'Kostenloses Audit Ihres Onlineshops. Wir zeigen Ihnen Wachstumspotenziale und Quick Wins.',
    en: 'Free audit of your online shop. We show you growth potential and quick wins.',
    ru: 'Бесплатный аудит вашего интернет-магазина. Мы покажем вам потенциал роста и быстрые победы.',
  }[locale as 'de' | 'en' | 'ru'] ?? 'Free audit of your online shop. We show you growth potential and quick wins.'
  const ctaButton = { de: 'Kostenloses Audit anfordern', en: 'Request Free Audit', ru: 'Запросить бесплатный аудит' }[locale as 'de' | 'en' | 'ru'] ?? 'Request Free Audit'
  const uspsTitle = { de: 'Warum unsere E-Commerce Agentur', en: 'Why Our E-Commerce Agency', ru: 'Почему наше E-Commerce агентство' }[locale as 'de' | 'en' | 'ru'] ?? 'Why Our E-Commerce Agency'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'E-Commerce Agentur Wien', en: 'E-Commerce Agency Vienna', ru: 'E-Commerce агентство Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency Vienna',
    alternateName: { de: 'Onlineshop Marketing Agentur', en: 'Online Shop Marketing Agency', ru: 'Агентство маркетинга интернет-магазинов' }[locale as 'de' | 'en' | 'ru'] ?? 'Online Shop Marketing Agency',
    url: 'https://goldenwing.at/leistungen/ecommerce-agentur',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
    },
    areaServed: [
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    description: {
      de: 'Spezialisierte E-Commerce Agentur fuer Shopify und WooCommerce. SEO, Google Shopping, Conversion-Optimierung und E-Commerce Marketing.',
      en: 'Specialized e-commerce agency for Shopify and WooCommerce. SEO, Google Shopping, conversion optimization and e-commerce marketing.',
      ru: 'Специализированное E-Commerce агентство для Shopify и WooCommerce. SEO, Google Shopping, оптимизация конверсии и E-Commerce маркетинг.',
    }[locale as 'de' | 'en' | 'ru'] ?? 'Specialized e-commerce agency for Shopify and WooCommerce. SEO, Google Shopping, conversion optimization and e-commerce marketing.',
    offers: packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price.replace('.', '').replace(',', '').replace(' ', ''),
      priceCurrency: 'EUR',
      description: pkg.description,
    })),
  }

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale as 'de' | 'en' | 'ru'] ?? 'Home', url: 'https://goldenwing.at' },
    { name: { de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale as 'de' | 'en' | 'ru'] ?? 'Services', url: { de: 'https://goldenwing.at/leistungen', en: 'https://goldenwing.at/en/services', ru: 'https://goldenwing.at/ru/services' }[locale as 'de' | 'en' | 'ru'] ?? 'https://goldenwing.at/en/services' },
    { name: { de: 'E-Commerce Agentur', en: 'E-Commerce Agency', ru: 'E-Commerce агентство' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency', url: { de: 'https://goldenwing.at/leistungen/ecommerce-agentur', en: 'https://goldenwing.at/en/services/ecommerce-agency', ru: 'https://goldenwing.at/ru/services/ecommerce-agency' }[locale as 'de' | 'en' | 'ru'] ?? 'https://goldenwing.at/en/services/ecommerce-agency' },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BreadcrumbListSchema items={breadcrumbs} />
      <AggregateRatingSchema ratingValue={4.9} ratingCount={47} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{heroData.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{heroData.title}</h1>
            <p className="text-2xl text-primary font-medium mb-4">{heroData.subtitle}</p>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">{heroData.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {heroData.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="#preise">{heroData.ctaSecondary}</NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-16 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid md:grid-cols-3 gap-8">
            {results.map((result) => (
              <div key={result.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{result.metric}</div>
                <div className="font-medium mb-1">{result.label}</div>
                <div className="text-sm text-muted-foreground">{result.client}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* USPs */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{uspsTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {usps.map((usp) => (
              <Card key={usp.title}>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">{usp.title}</h3>
                  <p className="text-sm text-muted-foreground">{usp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="leistungen" className="py-20 bg-muted/30 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{servicesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || ShoppingCart
              return (
                <Card key={service.title}>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="preise" className="py-20 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{pricingTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{pricingDescription}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Am beliebtesten', en: 'Most Popular', ru: 'Самый популярный' }[locale as 'de' | 'en' | 'ru'] ?? 'Most Popular'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">EUR {pkg.price}</span>
                    <span className="text-muted-foreground text-sm"> {pkg.priceType}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale as 'de' | 'en' | 'ru'] ?? 'Get Started'}</NextLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process - ProcessExpandingRows Layout */}
      <ProcessExpandingRows
        title={processTitle}
        subtitle={processDescription}
        steps={process.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          title={faqTitle}
          items={faqs}
          className="bg-background"
        />
      )}

      {/* Related Services */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">{relatedServicesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedServices.map((service) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.href} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {t('learnMore')} <ArrowRight className="h-3 w-3" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <NextLink href={getContactUrl(locale)}>
                {ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
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
    </>
  )
}
