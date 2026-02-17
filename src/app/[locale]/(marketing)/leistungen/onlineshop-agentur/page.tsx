import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, ShoppingCart, Zap, TrendingUp, Package, CreditCard, Settings, CheckCircle, Phone, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { SupportedLocale } from '@/lib/payload'
import { AggregateRatingSchema } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { ProcessExpandingRows } from '@/components/process-sections/ProcessExpandingRows'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

const iconMap: Record<string, LucideIcon> = {
  'shopping-cart': ShoppingCart,
  'zap': Zap,
  'trending-up': TrendingUp,
  'package': Package,
  'credit-card': CreditCard,
  'settings': Settings,
}

// Default content for Onlineshop Agentur page
const defaultServices = {
  de: [
    { icon: 'shopping-cart', title: 'Shop-Entwicklung', description: 'Professionelle Online-Shops mit WooCommerce oder Shopify. Responsive, benutzerfreundlich und conversion-optimiert.' },
    { icon: 'settings', title: 'Shop-Optimierung', description: 'Bestehende Shops analysieren und verbessern: Performance, UX, Conversion Rate und SEO-Optimierung.' },
    { icon: 'trending-up', title: 'Shop-Marketing', description: 'Mehr Umsatz durch gezieltes Online-Marketing: Google Ads, Social Media Ads und E-Mail-Marketing.' },
    { icon: 'package', title: 'Produktmanagement', description: 'Produktdaten-Import, Kategorisierung, Varianten-Management und Bestandsverwaltung.' },
    { icon: 'credit-card', title: 'Payment-Integration', description: 'Alle gaengigen Zahlungsmethoden: Kreditkarte, PayPal, Klarna, SEPA und mehr.' },
    { icon: 'zap', title: 'Performance-Optimierung', description: 'Schnelle Ladezeiten fuer bessere Rankings und hoehre Conversion Rates.' },
  ],
  en: [
    { icon: 'shopping-cart', title: 'Shop Development', description: 'Professional online shops with WooCommerce or Shopify. Responsive, user-friendly, and conversion-optimized.' },
    { icon: 'settings', title: 'Shop Optimization', description: 'Analyze and improve existing shops: Performance, UX, conversion rate, and SEO optimization.' },
    { icon: 'trending-up', title: 'Shop Marketing', description: 'More revenue through targeted online marketing: Google Ads, social media ads, and email marketing.' },
    { icon: 'package', title: 'Product Management', description: 'Product data import, categorization, variant management, and inventory control.' },
    { icon: 'credit-card', title: 'Payment Integration', description: 'All common payment methods: Credit card, PayPal, Klarna, SEPA, and more.' },
    { icon: 'zap', title: 'Performance Optimization', description: 'Fast loading times for better rankings and higher conversion rates.' },
  ],
  ru: [
    { icon: 'shopping-cart', title: 'Разработка магазина', description: 'Профессиональные интернет-магазины на WooCommerce или Shopify. Адаптивные, удобные и оптимизированные для конверсии.' },
    { icon: 'settings', title: 'Оптимизация магазина', description: 'Анализ и улучшение существующих магазинов: производительность, UX, конверсия и SEO-оптимизация.' },
    { icon: 'trending-up', title: 'Маркетинг магазина', description: 'Увеличение продаж через целевой онлайн-маркетинг: Google Ads, реклама в соцсетях и email-маркетинг.' },
    { icon: 'package', title: 'Управление товарами', description: 'Импорт данных о товарах, категоризация, управление вариантами и складом.' },
    { icon: 'credit-card', title: 'Интеграция платежей', description: 'Все популярные способы оплаты: банковские карты, PayPal, Klarna, SEPA и другие.' },
    { icon: 'zap', title: 'Оптимизация производительности', description: 'Быстрая загрузка для лучших позиций в поиске и высокой конверсии.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Starter Shop', price: '3.990', priceType: 'ab', description: 'Perfekt fuer den Einstieg', popular: false, features: ['WooCommerce oder Shopify', 'Bis zu 50 Produkte', 'Responsive Design', 'Standard-Zahlungsarten', 'Versand-Integration', 'SSL-Zertifikat', 'Basis-SEO', 'Admin-Schulung'] },
    { name: 'Business Shop', price: '7.990', priceType: 'ab', description: 'Fuer wachsende Unternehmen', popular: true, features: ['Alles aus Starter +', 'Bis zu 500 Produkte', 'Custom Design', 'Erweiterte Zahlungsarten', 'Warenwirtschaft-Anbindung', 'Marketing-Tools', 'Performance-Optimierung', '6 Monate Support'] },
    { name: 'Enterprise Shop', price: '14.990', priceType: 'ab', description: 'Fuer grosse Sortimente', popular: false, features: ['Alles aus Business +', 'Unbegrenzte Produkte', 'Multi-Shop / Multi-Language', 'ERP-Integration', 'B2B-Funktionen', 'Individuelle Entwicklung', 'SLA-Support', 'Dedizierter Ansprechpartner'] },
  ],
  en: [
    { name: 'Starter Shop', price: '3,990', priceType: 'from', description: 'Perfect for getting started', popular: false, features: ['WooCommerce or Shopify', 'Up to 50 products', 'Responsive design', 'Standard payment methods', 'Shipping integration', 'SSL certificate', 'Basic SEO', 'Admin training'] },
    { name: 'Business Shop', price: '7,990', priceType: 'from', description: 'For growing businesses', popular: true, features: ['Everything in Starter +', 'Up to 500 products', 'Custom design', 'Extended payment methods', 'Inventory management', 'Marketing tools', 'Performance optimization', '6 months support'] },
    { name: 'Enterprise Shop', price: '14,990', priceType: 'from', description: 'For large catalogs', popular: false, features: ['Everything in Business +', 'Unlimited products', 'Multi-shop / Multi-language', 'ERP integration', 'B2B features', 'Custom development', 'SLA support', 'Dedicated contact'] },
  ],
  ru: [
    { name: 'Starter Shop', price: '3 990', priceType: 'от', description: 'Идеально для старта', popular: false, features: ['WooCommerce или Shopify', 'До 50 товаров', 'Адаптивный дизайн', 'Стандартные способы оплаты', 'Интеграция доставки', 'SSL-сертификат', 'Базовое SEO', 'Обучение администратора'] },
    { name: 'Business Shop', price: '7 990', priceType: 'от', description: 'Для растущего бизнеса', popular: true, features: ['Все из Starter +', 'До 500 товаров', 'Индивидуальный дизайн', 'Расширенные способы оплаты', 'Интеграция со складом', 'Маркетинговые инструменты', 'Оптимизация производительности', '6 месяцев поддержки'] },
    { name: 'Enterprise Shop', price: '14 990', priceType: 'от', description: 'Для больших каталогов', popular: false, features: ['Все из Business +', 'Неограниченное количество товаров', 'Мультимагазин / Мультиязычность', 'ERP-интеграция', 'B2B-функции', 'Индивидуальная разработка', 'SLA-поддержка', 'Персональный менеджер'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '150+', label: 'Online-Shops erstellt', client: 'Seit 2016' },
    { metric: '+89%', label: 'Durchschnittliche Umsatzsteigerung', client: 'Nach Relaunch' },
    { metric: '2.3s', label: 'Durchschnittliche Ladezeit', client: 'Unserer Shops' },
  ],
  en: [
    { metric: '150+', label: 'Online shops created', client: 'Since 2016' },
    { metric: '+89%', label: 'Average revenue increase', client: 'After relaunch' },
    { metric: '2.3s', label: 'Average loading time', client: 'Of our shops' },
  ],
  ru: [
    { metric: '150+', label: 'Созданных интернет-магазинов', client: 'С 2016 года' },
    { metric: '+89%', label: 'Среднее увеличение выручки', client: 'После перезапуска' },
    { metric: '2.3s', label: 'Среднее время загрузки', client: 'Наших магазинов' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'WooCommerce oder Shopify - was ist besser?', answer: 'Beide Plattformen haben Vor- und Nachteile. WooCommerce bietet mehr Flexibilitaet und keine laufenden Lizenzkosten, erfordert aber mehr technisches Know-how. Shopify ist einfacher zu bedienen, hat aber monatliche Gebuehren. Wir beraten Sie, welche Loesung fuer Ihr Geschaeft optimal ist.' },
    { question: 'Was kostet ein Online-Shop?', answer: 'Ein professioneller Online-Shop startet bei uns ab 3.990 Euro. Die genauen Kosten haengen von Funktionsumfang, Produktanzahl und Integrationen ab. Im Erstgespraech erstellen wir ein massgeschneidertes Angebot.' },
    { question: 'Wie lange dauert die Shop-Entwicklung?', answer: 'Ein Starter-Shop ist in 4-6 Wochen fertig. Business-Shops benoetigen 6-10 Wochen, Enterprise-Projekte 10-16 Wochen. Die genaue Dauer haengt von Komplexitaet und Zulieferung (Texte, Bilder) ab.' },
    { question: 'Koennen Sie auch bestehende Shops optimieren?', answer: 'Ja, wir analysieren Ihren bestehenden Shop und erstellen einen Optimierungsplan. Typische Verbesserungen sind Performance, UX, Conversion Rate und SEO. Auch Migrationen von einer Plattform zur anderen fuehren wir durch.' },
    { question: 'Welche Zahlungsarten koennen integriert werden?', answer: 'Wir integrieren alle gaengigen Zahlungsarten: Kreditkarte (Stripe, Mollie), PayPal, Klarna, SEPA-Lastschrift, Sofortüberweisung, Apple Pay, Google Pay und mehr. Die Auswahl richtet sich nach Ihren Zielmaerkten.' },
    { question: 'Bieten Sie auch laufende Betreuung an?', answer: 'Ja, wir bieten Wartungsvertraege mit regelmaessigen Updates, Backups, Sicherheitschecks und technischem Support. Auch Shop-Marketing (Google Ads, SEO) koennen wir laufend betreuen.' },
  ],
  en: [
    { question: 'WooCommerce or Shopify - which is better?', answer: 'Both platforms have pros and cons. WooCommerce offers more flexibility and no ongoing license costs but requires more technical know-how. Shopify is easier to use but has monthly fees. We advise you on which solution is optimal for your business.' },
    { question: 'How much does an online shop cost?', answer: 'A professional online shop starts at 3,990 euros with us. The exact costs depend on features, number of products, and integrations. In an initial consultation, we create a tailored quote.' },
    { question: 'How long does shop development take?', answer: 'A starter shop is ready in 4-6 weeks. Business shops take 6-10 weeks, enterprise projects 10-16 weeks. The exact duration depends on complexity and delivery (texts, images).' },
    { question: 'Can you also optimize existing shops?', answer: 'Yes, we analyze your existing shop and create an optimization plan. Typical improvements include performance, UX, conversion rate, and SEO. We also perform migrations from one platform to another.' },
    { question: 'Which payment methods can be integrated?', answer: 'We integrate all common payment methods: Credit card (Stripe, Mollie), PayPal, Klarna, SEPA direct debit, instant transfer, Apple Pay, Google Pay, and more. The selection depends on your target markets.' },
    { question: 'Do you also offer ongoing support?', answer: 'Yes, we offer maintenance contracts with regular updates, backups, security checks, and technical support. We can also manage ongoing shop marketing (Google Ads, SEO).' },
  ],
  ru: [
    { question: 'WooCommerce или Shopify - что лучше?', answer: 'Обе платформы имеют свои плюсы и минусы. WooCommerce предлагает больше гибкости и не требует постоянных лицензионных платежей, но требует больше технических знаний. Shopify проще в использовании, но имеет ежемесячную плату. Мы поможем выбрать оптимальное решение для вашего бизнеса.' },
    { question: 'Сколько стоит интернет-магазин?', answer: 'Профессиональный интернет-магазин у нас стоит от 3 990 евро. Точная стоимость зависит от функционала, количества товаров и интеграций. На первой консультации мы составим индивидуальное предложение.' },
    { question: 'Сколько времени занимает разработка магазина?', answer: 'Стартовый магазин готов за 4-6 недель. Бизнес-магазины требуют 6-10 недель, корпоративные проекты - 10-16 недель. Точные сроки зависят от сложности и предоставления материалов (тексты, изображения).' },
    { question: 'Можете ли вы оптимизировать существующий магазин?', answer: 'Да, мы анализируем ваш существующий магазин и составляем план оптимизации. Типичные улучшения включают производительность, UX, конверсию и SEO. Также выполняем миграцию с одной платформы на другую.' },
    { question: 'Какие способы оплаты можно интегрировать?', answer: 'Мы интегрируем все популярные способы оплаты: банковские карты (Stripe, Mollie), PayPal, Klarna, SEPA, мгновенные переводы, Apple Pay, Google Pay и другие. Выбор зависит от ваших целевых рынков.' },
    { question: 'Предлагаете ли вы постоянную поддержку?', answer: 'Да, мы предлагаем контракты на обслуживание с регулярными обновлениями, резервным копированием, проверками безопасности и технической поддержкой. Также можем вести маркетинг магазина (Google Ads, SEO) на постоянной основе.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Analyse', description: 'Anforderungen, Zielgruppe und Wettbewerb verstehen' },
    { step: '02', title: 'Konzept', description: 'Funktionen, Design und Technik planen' },
    { step: '03', title: 'Design', description: 'UX/UI Design fuer optimale Nutzererfahrung' },
    { step: '04', title: 'Entwicklung', description: 'Shop aufbauen und alle Features integrieren' },
    { step: '05', title: 'Launch', description: 'Testing, Go-Live und Schulung' },
  ],
  en: [
    { step: '01', title: 'Analysis', description: 'Understand requirements, target audience, and competition' },
    { step: '02', title: 'Concept', description: 'Plan features, design, and technology' },
    { step: '03', title: 'Design', description: 'UX/UI design for optimal user experience' },
    { step: '04', title: 'Development', description: 'Build shop and integrate all features' },
    { step: '05', title: 'Launch', description: 'Testing, go-live, and training' },
  ],
  ru: [
    { step: '01', title: 'Анализ', description: 'Понимание требований, целевой аудитории и конкурентов' },
    { step: '02', title: 'Концепция', description: 'Планирование функций, дизайна и технологий' },
    { step: '03', title: 'Дизайн', description: 'UX/UI дизайн для оптимального пользовательского опыта' },
    { step: '04', title: 'Разработка', description: 'Создание магазина и интеграция всех функций' },
    { step: '05', title: 'Запуск', description: 'Тестирование, запуск и обучение' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Google Ads', description: 'Mehr Shop-Besucher durch gezielte Werbung.', href: '/leistungen/google-ads-agentur' },
    { title: 'SEO', description: 'Organische Sichtbarkeit fuer Ihren Online-Shop.', href: '/leistungen/seo-content' },
    { title: 'Webdesign', description: 'Professionelles Design fuer Ihre Website.', href: '/leistungen/webdesign' },
  ],
  en: [
    { title: 'Google Ads', description: 'More shop visitors through targeted advertising.', href: '/leistungen/google-ads-agentur' },
    { title: 'SEO', description: 'Organic visibility for your online shop.', href: '/leistungen/seo-content' },
    { title: 'Web Design', description: 'Professional design for your website.', href: '/leistungen/webdesign' },
  ],
  ru: [
    { title: 'Google Ads', description: 'Больше посетителей магазина через таргетированную рекламу.', href: '/leistungen/google-ads-agentur' },
    { title: 'SEO', description: 'Органическая видимость для вашего интернет-магазина.', href: '/leistungen/seo-content' },
    { title: 'Веб-дизайн', description: 'Профессиональный дизайн для вашего сайта.', href: '/leistungen/webdesign' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const defaultUsps = {
  de: [
    { title: 'E-Commerce-Experten', description: '150+ Online-Shops erfolgreich umgesetzt.' },
    { title: 'WooCommerce & Shopify', description: 'Zertifizierte Partner beider Plattformen.' },
    { title: 'Conversion-fokussiert', description: 'Shops, die verkaufen - nicht nur gut aussehen.' },
    { title: 'Full-Service', description: 'Von Entwicklung ueber Marketing bis Support.' },
  ],
  en: [
    { title: 'E-Commerce Experts', description: '150+ online shops successfully delivered.' },
    { title: 'WooCommerce & Shopify', description: 'Certified partners of both platforms.' },
    { title: 'Conversion-Focused', description: 'Shops that sell - not just look good.' },
    { title: 'Full Service', description: 'From development to marketing to support.' },
  ],
  ru: [
    { title: 'Эксперты E-Commerce', description: '150+ успешно реализованных интернет-магазинов.' },
    { title: 'WooCommerce & Shopify', description: 'Сертифицированные партнеры обеих платформ.' },
    { title: 'Фокус на конверсию', description: 'Магазины, которые продают - а не просто красиво выглядят.' },
    { title: 'Полный сервис', description: 'От разработки через маркетинг до поддержки.' },
  ],
}

const defaultTechnologies = {
  de: ['WooCommerce', 'Shopify', 'Stripe', 'PayPal', 'Klarna', 'Mollie', 'JTL', 'Billbee', 'Shipcloud', 'Google Merchant'],
  en: ['WooCommerce', 'Shopify', 'Stripe', 'PayPal', 'Klarna', 'Mollie', 'JTL', 'Billbee', 'Shipcloud', 'Google Merchant'],
  ru: ['WooCommerce', 'Shopify', 'Stripe', 'PayPal', 'Klarna', 'Mollie', 'JTL', 'Billbee', 'Shipcloud', 'Google Merchant'],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = { de: 'Onlineshop Agentur Wien - WooCommerce & Shopify | GoldenWing', en: 'E-Commerce Agency Vienna - WooCommerce & Shopify | GoldenWing', ru: 'Агентство интернет-магазинов Вена - WooCommerce & Shopify | GoldenWing' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency Vienna - WooCommerce & Shopify | GoldenWing'

  const metaDescription = truncateMetaDescription(
    { de: 'Onlineshop Agentur aus Wien: Starter Shop ab 3.990 Euro, Business Shop ab 7.990 Euro, Enterprise ab 14.990 Euro. WooCommerce & Shopify Experten. 150+ Shops erstellt!', en: 'E-Commerce agency from Vienna: Starter shop from 3,990 euros, Business shop from 7,990 euros, Enterprise from 14,990 euros. WooCommerce & Shopify experts. 150+ shops created!', ru: 'Агентство интернет-магазинов из Вены: Starter Shop от 3 990 евро, Business Shop от 7 990 евро, Enterprise от 14 990 евро. Эксперты WooCommerce & Shopify. 150+ созданных магазинов!' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce agency from Vienna: Starter shop from 3,990 euros, Business shop from 7,990 euros, Enterprise from 14,990 euros. WooCommerce & Shopify experts. 150+ shops created!'
  )

  const hreflangAlternates = getHreflangAlternates('/leistungen/onlineshop-agentur', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: { de: ['Onlineshop Agentur', 'Onlineshop Agentur Wien', 'E-Commerce Agentur', 'WooCommerce Agentur', 'Shopify Agentur', 'Online-Shop erstellen lassen'], en: ['E-Commerce Agency', 'E-Commerce Agency Vienna', 'WooCommerce Agency', 'Shopify Agency', 'Online Shop Development'], ru: ['Агентство интернет-магазинов', 'Агентство интернет-магазинов Вена', 'E-Commerce агентство', 'WooCommerce агентство', 'Shopify агентство', 'Создание интернет-магазина'] }[locale as 'de' | 'en' | 'ru'] ?? ['E-Commerce Agency', 'E-Commerce Agency Vienna', 'WooCommerce Agency', 'Shopify Agency', 'Online Shop Development'],
    openGraph: {
      title: { de: 'Onlineshop Agentur Wien', en: 'E-Commerce Agency Vienna', ru: 'Агентство интернет-магазинов Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency Vienna',
      description: metaDescription,
      url: getCanonicalUrl('/leistungen/onlineshop-agentur', locale),
    },
    alternates: {
      canonical: getCanonicalUrl('/leistungen/onlineshop-agentur', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function OnlineshopAgenturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'common' })

  const heroData = {
    badge: { de: 'Onlineshop Agentur', en: 'E-Commerce Agency', ru: 'Агентство интернет-магазинов' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency',
    title: { de: 'Onlineshop Agentur Wien', en: 'E-Commerce Agency Vienna', ru: 'Агентство интернет-магазинов Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency Vienna',
    subtitle: { de: 'Shops, die verkaufen.', en: 'Shops that sell.', ru: 'Магазины, которые продают.' }[locale as 'de' | 'en' | 'ru'] ?? 'Shops that sell.',
    description: { de: 'Professionelle Online-Shop-Entwicklung mit WooCommerce und Shopify. Vom Starter-Shop bis zur Enterprise-Loesung - conversion-optimiert, skalierbar und zukunftssicher.', en: 'Professional online shop development with WooCommerce and Shopify. From starter shops to enterprise solutions - conversion-optimized, scalable, and future-proof.', ru: 'Профессиональная разработка интернет-магазинов на WooCommerce и Shopify. От стартовых магазинов до корпоративных решений - оптимизированы для конверсии, масштабируемы и перспективны.' }[locale as 'de' | 'en' | 'ru'] ?? 'Professional online shop development with WooCommerce and Shopify. From starter shops to enterprise solutions - conversion-optimized, scalable, and future-proof.',
    ctaPrimary: { de: 'Kostenlose Beratung', en: 'Free Consultation', ru: 'Бесплатная консультация' }[locale as 'de' | 'en' | 'ru'] ?? 'Free Consultation',
    ctaSecondary: { de: 'Pakete ansehen', en: 'View Packages', ru: 'Смотреть пакеты' }[locale as 'de' | 'en' | 'ru'] ?? 'View Packages',
  }

  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const usps = defaultUsps[locale as 'de' | 'en' | 'ru'] ?? defaultUsps['en']
  const technologies = defaultTechnologies[locale as 'de' | 'en' | 'ru'] ?? defaultTechnologies['en']

  const servicesTitle = { de: 'Unsere E-Commerce-Leistungen', en: 'Our E-Commerce Services', ru: 'Наши E-Commerce услуги' }[locale as 'de' | 'en' | 'ru'] ?? 'Our E-Commerce Services'
  const servicesDescription = { de: 'Von Shop-Entwicklung ueber Optimierung bis Marketing - alles fuer Ihren Online-Erfolg.', en: 'From shop development to optimization and marketing - everything for your online success.', ru: 'От разработки магазина до оптимизации и маркетинга - все для вашего онлайн-успеха.' }[locale as 'de' | 'en' | 'ru'] ?? 'From shop development to optimization and marketing - everything for your online success.'
  const pricingTitle = { de: 'Onlineshop-Pakete', en: 'Online Shop Packages', ru: 'Пакеты интернет-магазинов' }[locale as 'de' | 'en' | 'ru'] ?? 'Online Shop Packages'
  const pricingDescription = { de: 'Transparente Preise fuer professionelle Online-Shops.', en: 'Transparent pricing for professional online shops.', ru: 'Прозрачные цены на профессиональные интернет-магазины.' }[locale as 'de' | 'en' | 'ru'] ?? 'Transparent pricing for professional online shops.'
  const processTitle = { de: 'Unser Entwicklungsprozess', en: 'Our Development Process', ru: 'Наш процесс разработки' }[locale as 'de' | 'en' | 'ru'] ?? 'Our Development Process'
  const processDescription = { de: 'Strukturierter Prozess fuer erfolgreiche Shop-Projekte.', en: 'Structured process for successful shop projects.', ru: 'Структурированный процесс для успешных проектов магазинов.' }[locale as 'de' | 'en' | 'ru'] ?? 'Structured process for successful shop projects.'
  const faqTitle = { de: 'Haeufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale as 'de' | 'en' | 'ru'] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale as 'de' | 'en' | 'ru'] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer Ihren Online-Shop?', en: 'Ready for Your Online Shop?', ru: 'Готовы к своему интернет-магазину?' }[locale as 'de' | 'en' | 'ru'] ?? 'Ready for Your Online Shop?'
  const ctaDescription = { de: 'Lassen Sie uns ueber Ihr E-Commerce-Projekt sprechen. Kostenloses Erstgespraech.', en: 'Let\'s discuss your e-commerce project. Free initial consultation.', ru: 'Давайте обсудим ваш E-Commerce проект. Бесплатная первичная консультация.' }[locale as 'de' | 'en' | 'ru'] ?? 'Let\'s discuss your e-commerce project. Free initial consultation.'
  const ctaButton = { de: 'Kostenlose Beratung anfordern', en: 'Request Free Consultation', ru: 'Запросить бесплатную консультацию' }[locale as 'de' | 'en' | 'ru'] ?? 'Request Free Consultation'
  const uspsTitle = { de: 'Warum wir', en: 'Why Choose Us', ru: 'Почему мы' }[locale as 'de' | 'en' | 'ru'] ?? 'Why Choose Us'
  const techTitle = { de: 'Technologien & Integrationen', en: 'Technologies & Integrations', ru: 'Технологии и интеграции' }[locale as 'de' | 'en' | 'ru'] ?? 'Technologies & Integrations'
  const techDescription = { de: 'Wir arbeiten mit fuehrenden E-Commerce-Plattformen und Tools.', en: 'We work with leading e-commerce platforms and tools.', ru: 'Мы работаем с ведущими E-Commerce платформами и инструментами.' }[locale as 'de' | 'en' | 'ru'] ?? 'We work with leading e-commerce platforms and tools.'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Onlineshop Agentur Wien', en: 'E-Commerce Agency Vienna', ru: 'Агентство интернет-магазинов Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'E-Commerce Agency Vienna',
    alternateName: { de: 'Online-Shop Entwicklung Wien', en: 'Online Shop Development Vienna', ru: 'Разработка интернет-магазинов Вена' }[locale as 'de' | 'en' | 'ru'] ?? 'Online Shop Development Vienna',
    url: 'https://goldenwing.at/leistungen/onlineshop-agentur',
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
    description: { de: 'Professionelle Online-Shop-Entwicklung mit WooCommerce und Shopify in Wien.', en: 'Professional online shop development with WooCommerce and Shopify in Vienna.', ru: 'Профессиональная разработка интернет-магазинов на WooCommerce и Shopify в Вене.' }[locale as 'de' | 'en' | 'ru'] ?? 'Professional online shop development with WooCommerce and Shopify in Vienna.',
    offers: packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price.replace('.', '').replace(',', '').replace(' ', ''),
      priceCurrency: 'EUR',
      description: pkg.description,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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
                <NextLink href="#pakete">{heroData.ctaSecondary}</NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Results */}
      <section className="py-16 border-y bg-muted/30">
        <Container variant="block">
          <div className="grid md:grid-cols-3 gap-8">
            {results.map((result: { metric: string; label: string; client: string }) => (
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
            {usps.map((usp: { title: string; description: string }) => (
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
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{servicesTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{servicesDescription}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: { icon: string; title: string; description: string }) => {
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
      <section id="pakete" className="py-20 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{pricingTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{pricingDescription}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg: { name: string; price: string; priceType: string; description: string; popular: boolean; features: string[] }) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Am beliebtesten', en: 'Most Popular', ru: 'Самый популярный' }[locale as 'de' | 'en' | 'ru'] ?? 'Most Popular'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">{pkg.priceType} </span>
                    <span className="text-3xl font-bold">€{pkg.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature: string) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Anfragen', en: 'Request', ru: 'Запросить' }[locale as 'de' | 'en' | 'ru'] ?? 'Request'}</NextLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{techTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{techDescription}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <span key={tech} className="px-6 py-3 bg-background rounded-full font-medium border">
                {tech}
              </span>
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
          className="bg-muted/30"
        />
      )}

      {/* Related Services */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">{relatedServicesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedServices.map((service: { title: string; description: string; href: string }) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

                  {/* @ts-expect-error CMS data properly typed via satisfies */}

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
