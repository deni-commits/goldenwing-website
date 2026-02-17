import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import { ArrowRight, Code, Palette, Settings, Shield, Zap, Wrench, CheckCircle, Phone, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription, getContactUrl } from '@/lib/utils'
import { SupportedLocale } from '@/lib/payload'
import { BreadcrumbListSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import { ProcessExpandingRows } from '@/components/process-sections/ProcessExpandingRows'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

const iconMap: Record<string, LucideIcon> = {
  'code': Code,
  'palette': Palette,
  'settings': Settings,
  'shield': Shield,
  'zap': Zap,
  'wrench': Wrench,
}

// Default content for WordPress Agentur page
const defaultServices = {
  de: [
    { icon: 'code', title: 'WordPress Entwicklung', description: 'Individuelle WordPress-Websites nach Mass. Vom Blog bis zur komplexen Unternehmenswebsite mit allen Funktionen.' },
    { icon: 'palette', title: 'Theme-Anpassung', description: 'Bestehende Themes individualisieren oder komplett neue Custom Themes entwickeln. Pixel-perfektes Design.' },
    { icon: 'settings', title: 'Plugin-Entwicklung', description: 'Individuelle WordPress-Plugins fuer spezielle Anforderungen. Integration von Drittsystemen und APIs.' },
    { icon: 'wrench', title: 'Wartung & Updates', description: 'Regelmaessige Updates, Backups, Sicherheitschecks und Performance-Optimierung. Sorgenfreier Betrieb.' },
    { icon: 'zap', title: 'Performance-Optimierung', description: 'Schnelle Ladezeiten durch Caching, Bildoptimierung, Code-Bereinigung und Server-Tuning.' },
    { icon: 'shield', title: 'Sicherheit & Migration', description: 'WordPress-Sicherheit, Malware-Entfernung, SSL-Einrichtung und sichere Migrationen.' },
  ],
  en: [
    { icon: 'code', title: 'WordPress Development', description: 'Custom WordPress websites tailored to your needs. From blogs to complex corporate websites with all features.' },
    { icon: 'palette', title: 'Theme Customization', description: 'Customize existing themes or develop completely new custom themes. Pixel-perfect design.' },
    { icon: 'settings', title: 'Plugin Development', description: 'Custom WordPress plugins for special requirements. Integration of third-party systems and APIs.' },
    { icon: 'wrench', title: 'Maintenance & Updates', description: 'Regular updates, backups, security checks, and performance optimization. Worry-free operation.' },
    { icon: 'zap', title: 'Performance Optimization', description: 'Fast loading times through caching, image optimization, code cleanup, and server tuning.' },
    { icon: 'shield', title: 'Security & Migration', description: 'WordPress security, malware removal, SSL setup, and secure migrations.' },
  ],
  ru: [
    { icon: 'code', title: 'Разработка WordPress', description: 'Индивидуальные сайты на WordPress под ваши задачи. От блога до сложного корпоративного сайта со всеми функциями.' },
    { icon: 'palette', title: 'Настройка темы', description: 'Индивидуализация существующих тем или разработка полностью новых. Пиксельно-точный дизайн.' },
    { icon: 'settings', title: 'Разработка плагинов', description: 'Индивидуальные плагины WordPress для особых требований. Интеграция сторонних систем и API.' },
    { icon: 'wrench', title: 'Обслуживание и обновления', description: 'Регулярные обновления, резервные копии, проверки безопасности и оптимизация производительности. Беззаботная эксплуатация.' },
    { icon: 'zap', title: 'Оптимизация производительности', description: 'Быстрая загрузка благодаря кэшированию, оптимизации изображений, очистке кода и настройке сервера.' },
    { icon: 'shield', title: 'Безопасность и миграция', description: 'Безопасность WordPress, удаление вредоносного ПО, настройка SSL и безопасная миграция.' },
  ],
}

const defaultPackages = {
  de: [
    { name: 'Website', price: '2.490', priceType: 'ab', description: 'WordPress Website', popular: false, features: ['Custom oder Premium Theme', 'Bis zu 10 Seiten', 'Responsive Design', 'Kontaktformular', 'SEO-Grundlagen', 'DSGVO-konform', 'Admin-Schulung', '3 Monate Support'] },
    { name: 'Business Website', price: '4.990', priceType: 'ab', description: 'Erweiterte WordPress Seite', popular: true, features: ['Custom Theme-Entwicklung', 'Bis zu 25 Seiten', 'Blog-Funktionalitaet', 'Mehrsprachigkeit (WPML)', 'Performance-Optimierung', 'SEO-Erweiterungen', 'Formular-Builder', '6 Monate Support'] },
    { name: 'Theme-Entwicklung', price: '990', priceType: 'ab', description: 'Custom WordPress Theme', popular: false, features: ['Individuelles Design', 'Responsive Development', 'ACF Pro Integration', 'Gutenberg-Bloecke', 'Performance-optimiert', 'Dokumentation', 'Quelldateien', 'Installationssupport'] },
    { name: 'Wartung', price: '99', priceType: 'ab/Monat', description: 'Laufende Betreuung', popular: false, features: ['WordPress Core Updates', 'Plugin Updates', 'Theme Updates', 'Taegliche Backups', 'Sicherheits-Monitoring', 'Performance-Checks', 'Uptime-Ueberwachung', 'E-Mail-Support'] },
  ],
  en: [
    { name: 'Website', price: '2,490', priceType: 'from', description: 'WordPress website', popular: false, features: ['Custom or premium theme', 'Up to 10 pages', 'Responsive design', 'Contact form', 'SEO basics', 'GDPR compliant', 'Admin training', '3 months support'] },
    { name: 'Business Website', price: '4,990', priceType: 'from', description: 'Extended WordPress site', popular: true, features: ['Custom theme development', 'Up to 25 pages', 'Blog functionality', 'Multilingual (WPML)', 'Performance optimization', 'SEO extensions', 'Form builder', '6 months support'] },
    { name: 'Theme Development', price: '990', priceType: 'from', description: 'Custom WordPress theme', popular: false, features: ['Individual design', 'Responsive development', 'ACF Pro integration', 'Gutenberg blocks', 'Performance optimized', 'Documentation', 'Source files', 'Installation support'] },
    { name: 'Maintenance', price: '99', priceType: 'from/month', description: 'Ongoing support', popular: false, features: ['WordPress core updates', 'Plugin updates', 'Theme updates', 'Daily backups', 'Security monitoring', 'Performance checks', 'Uptime monitoring', 'Email support'] },
  ],
  ru: [
    { name: 'Сайт', price: '2 490', priceType: 'от', description: 'WordPress сайт', popular: false, features: ['Кастомная или премиум тема', 'До 10 страниц', 'Адаптивный дизайн', 'Контактная форма', 'Основы SEO', 'Соответствие GDPR', 'Обучение администрированию', '3 месяца поддержки'] },
    { name: 'Бизнес-сайт', price: '4 990', priceType: 'от', description: 'Расширенный WordPress сайт', popular: true, features: ['Разработка кастомной темы', 'До 25 страниц', 'Функционал блога', 'Мультиязычность (WPML)', 'Оптимизация производительности', 'SEO-расширения', 'Конструктор форм', '6 месяцев поддержки'] },
    { name: 'Разработка темы', price: '990', priceType: 'от', description: 'Кастомная тема WordPress', popular: false, features: ['Индивидуальный дизайн', 'Адаптивная разработка', 'Интеграция ACF Pro', 'Блоки Gutenberg', 'Оптимизация производительности', 'Документация', 'Исходные файлы', 'Поддержка установки'] },
    { name: 'Обслуживание', price: '99', priceType: 'от/мес', description: 'Постоянная поддержка', popular: false, features: ['Обновления ядра WordPress', 'Обновления плагинов', 'Обновления темы', 'Ежедневные резервные копии', 'Мониторинг безопасности', 'Проверки производительности', 'Мониторинг доступности', 'Поддержка по email'] },
  ],
}

const defaultResults = {
  de: [
    { metric: '300+', label: 'WordPress Projekte', client: 'Seit 2014' },
    { metric: '< 2s', label: 'Durchschnittliche Ladezeit', client: 'Unserer Websites' },
    { metric: '99.9%', label: 'Uptime', client: 'Bei Wartungskunden' },
  ],
  en: [
    { metric: '300+', label: 'WordPress projects', client: 'Since 2014' },
    { metric: '< 2s', label: 'Average loading time', client: 'Of our websites' },
    { metric: '99.9%', label: 'Uptime', client: 'For maintenance clients' },
  ],
  ru: [
    { metric: '300+', label: 'WordPress проектов', client: 'С 2014 года' },
    { metric: '< 2с', label: 'Среднее время загрузки', client: 'Наших сайтов' },
    { metric: '99.9%', label: 'Uptime', client: 'Для клиентов на обслуживании' },
  ],
}

const defaultFaqs = {
  de: [
    { question: 'Was kostet eine WordPress Website?', answer: 'Eine professionelle WordPress Website startet bei uns ab 2.490 Euro. Business-Websites mit erweitertem Funktionsumfang beginnen bei 4.990 Euro. Die genauen Kosten haengen von Umfang, Design und Funktionen ab.' },
    { question: 'Wie lange dauert die Entwicklung?', answer: 'Eine Standard-Website ist in 4-6 Wochen fertig. Business-Websites benoetigen 6-10 Wochen. Die Dauer haengt von Komplexitaet und Ihrer Zulieferung (Texte, Bilder) ab.' },
    { question: 'Brauche ich technisches Wissen?', answer: 'Nein, wir schulen Sie im Umgang mit WordPress. Nach der Schulung koennen Sie selbststaendig Inhalte aendern, Bilder tauschen und Seiten erstellen - ohne Programmierkenntnisse.' },
    { question: 'Ist WordPress sicher?', answer: 'Ja, wenn es richtig eingerichtet und gewartet wird. Wir setzen auf Sicherheits-Plugins, regelmaessige Updates, Backups und Best Practices. Mit unserem Wartungsvertrag sind Sie optimal geschuetzt.' },
    { question: 'Koennt ihr bestehende WordPress-Seiten optimieren?', answer: 'Ja, wir analysieren Ihre bestehende WordPress-Seite und erstellen einen Optimierungsplan. Typische Verbesserungen sind Performance, Sicherheit, SEO und Benutzerfreundlichkeit.' },
    { question: 'Was ist der Unterschied zu Baukasten-Systemen?', answer: 'WordPress bietet mehr Flexibilitaet, bessere SEO-Moeglichkeiten und ist unabhaengig von einem Anbieter. Sie besitzen Ihre Website und koennen jederzeit den Hosting-Anbieter wechseln.' },
  ],
  en: [
    { question: 'How much does a WordPress website cost?', answer: 'A professional WordPress website starts at 2,490 euros with us. Business websites with extended functionality start at 4,990 euros. Exact costs depend on scope, design, and features.' },
    { question: 'How long does development take?', answer: 'A standard website is ready in 4-6 weeks. Business websites take 6-10 weeks. Duration depends on complexity and your delivery (texts, images).' },
    { question: 'Do I need technical knowledge?', answer: 'No, we train you on using WordPress. After training, you can independently change content, swap images, and create pages - without programming skills.' },
    { question: 'Is WordPress secure?', answer: 'Yes, when properly set up and maintained. We use security plugins, regular updates, backups, and best practices. With our maintenance contract, you are optimally protected.' },
    { question: 'Can you optimize existing WordPress sites?', answer: 'Yes, we analyze your existing WordPress site and create an optimization plan. Typical improvements include performance, security, SEO, and usability.' },
    { question: 'What is the difference to website builders?', answer: 'WordPress offers more flexibility, better SEO options, and is independent of a provider. You own your website and can switch hosting providers at any time.' },
  ],
  ru: [
    { question: 'Сколько стоит сайт на WordPress?', answer: 'Профессиональный сайт на WordPress у нас начинается от 2 490 евро. Бизнес-сайты с расширенным функционалом - от 4 990 евро. Точная стоимость зависит от объема, дизайна и функций.' },
    { question: 'Сколько времени занимает разработка?', answer: 'Стандартный сайт готов за 4-6 недель. Бизнес-сайты требуют 6-10 недель. Сроки зависят от сложности и вашей готовности предоставить материалы (тексты, изображения).' },
    { question: 'Нужны ли мне технические знания?', answer: 'Нет, мы обучим вас работе с WordPress. После обучения вы сможете самостоятельно менять контент, заменять изображения и создавать страницы - без навыков программирования.' },
    { question: 'Безопасен ли WordPress?', answer: 'Да, при правильной настройке и обслуживании. Мы используем плагины безопасности, регулярные обновления, резервные копии и лучшие практики. С нашим договором на обслуживание вы оптимально защищены.' },
    { question: 'Можете ли вы оптимизировать существующие сайты на WordPress?', answer: 'Да, мы проанализируем ваш существующий сайт на WordPress и составим план оптимизации. Типичные улучшения включают производительность, безопасность, SEO и удобство использования.' },
    { question: 'В чем отличие от конструкторов сайтов?', answer: 'WordPress предлагает больше гибкости, лучшие возможности SEO и независимость от провайдера. Вы владеете своим сайтом и можете сменить хостинг-провайдера в любое время.' },
  ],
}

const defaultProcess = {
  de: [
    { step: '01', title: 'Anforderungen', description: 'Ziele, Funktionen und Design besprechen' },
    { step: '02', title: 'Konzept', description: 'Struktur und Wireframes erstellen' },
    { step: '03', title: 'Design', description: 'Visuelles Design entwickeln' },
    { step: '04', title: 'Entwicklung', description: 'WordPress aufsetzen und entwickeln' },
    { step: '05', title: 'Launch', description: 'Testing, Go-Live und Schulung' },
  ],
  en: [
    { step: '01', title: 'Requirements', description: 'Discuss goals, features, and design' },
    { step: '02', title: 'Concept', description: 'Create structure and wireframes' },
    { step: '03', title: 'Design', description: 'Develop visual design' },
    { step: '04', title: 'Development', description: 'Set up and develop WordPress' },
    { step: '05', title: 'Launch', description: 'Testing, go-live, and training' },
  ],
  ru: [
    { step: '01', title: 'Требования', description: 'Обсуждение целей, функций и дизайна' },
    { step: '02', title: 'Концепция', description: 'Создание структуры и wireframes' },
    { step: '03', title: 'Дизайн', description: 'Разработка визуального дизайна' },
    { step: '04', title: 'Разработка', description: 'Настройка и разработка WordPress' },
    { step: '05', title: 'Запуск', description: 'Тестирование, запуск и обучение' },
  ],
}

const defaultRelatedServices = {
  de: [
    { title: 'Webdesign', description: 'Individuelles Webdesign fuer Ihre WordPress-Seite.', href: '/leistungen/webdesign' },
    { title: 'SEO', description: 'Suchmaschinenoptimierung fuer WordPress.', href: '/leistungen/seo-content' },
    { title: 'Onlineshop', description: 'WooCommerce E-Commerce-Loesungen.', href: '/leistungen/onlineshop-agentur' },
  ],
  en: [
    { title: 'Web Design', description: 'Custom web design for your WordPress site.', href: '/leistungen/webdesign' },
    { title: 'SEO', description: 'Search engine optimization for WordPress.', href: '/leistungen/seo-content' },
    { title: 'Online Shop', description: 'WooCommerce e-commerce solutions.', href: '/leistungen/onlineshop-agentur' },
  ],
  ru: [
    { title: 'Веб-дизайн', description: 'Индивидуальный веб-дизайн для вашего сайта на WordPress.', href: '/leistungen/webdesign' },
    { title: 'SEO', description: 'Поисковая оптимизация для WordPress.', href: '/leistungen/seo-content' },
    { title: 'Интернет-магазин', description: 'Решения для электронной коммерции на WooCommerce.', href: '/leistungen/onlineshop-agentur' },
  ],
} as const satisfies Record<'de' | 'en' | 'ru', Array<{ title: string; description: string; href: StaticAppPathname }>>

const defaultUsps = {
  de: [
    { title: '10+ Jahre WordPress', description: 'Tiefgreifende Expertise seit den Anfaengen.' },
    { title: 'Custom Development', description: 'Individuelle Themes und Plugins statt Templates.' },
    { title: 'Performance First', description: 'Schnelle Websites sind unser Standard.' },
    { title: 'Langfristige Betreuung', description: 'Wartung und Support fuer sorgenfreien Betrieb.' },
  ],
  en: [
    { title: '10+ Years WordPress', description: 'Deep expertise since the beginning.' },
    { title: 'Custom Development', description: 'Custom themes and plugins instead of templates.' },
    { title: 'Performance First', description: 'Fast websites are our standard.' },
    { title: 'Long-term Support', description: 'Maintenance and support for worry-free operation.' },
  ],
  ru: [
    { title: '10+ лет с WordPress', description: 'Глубокая экспертиза с самого начала.' },
    { title: 'Кастомная разработка', description: 'Индивидуальные темы и плагины вместо шаблонов.' },
    { title: 'Производительность прежде всего', description: 'Быстрые сайты - наш стандарт.' },
    { title: 'Долгосрочная поддержка', description: 'Обслуживание и поддержка для беззаботной эксплуатации.' },
  ],
}

const defaultTechnologies = {
  de: ['WordPress', 'WooCommerce', 'Elementor Pro', 'ACF Pro', 'WPML', 'Yoast SEO', 'WP Rocket', 'Gutenberg', 'PHP 8', 'MySQL'],
  en: ['WordPress', 'WooCommerce', 'Elementor Pro', 'ACF Pro', 'WPML', 'Yoast SEO', 'WP Rocket', 'Gutenberg', 'PHP 8', 'MySQL'],
  ru: ['WordPress', 'WooCommerce', 'Elementor Pro', 'ACF Pro', 'WPML', 'Yoast SEO', 'WP Rocket', 'Gutenberg', 'PHP 8', 'MySQL'],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  const metaTitle = { de: 'WordPress Agentur Wien - Entwicklung, Themes & Wartung | GoldenWing', en: 'WordPress Agency Vienna - Development, Themes & Maintenance | GoldenWing', ru: 'WordPress Агентство Вена - Разработка, Темы и Обслуживание | GoldenWing' }[locale] ?? 'WordPress Agency Vienna - Development, Themes & Maintenance | GoldenWing'

  const metaDescription = truncateMetaDescription(
    { de: 'WordPress Agentur aus Wien: Website ab 2.490 Euro, Theme ab 990 Euro, Wartung ab 99 Euro/Monat. 300+ WordPress Projekte. Custom Development & Support!', en: 'WordPress agency from Vienna: Website from 2,490 euros, theme from 990 euros, maintenance from 99 euros/month. 300+ WordPress projects. Custom development & support!', ru: 'WordPress агентство из Вены: сайт от 2 490 евро, тема от 990 евро, обслуживание от 99 евро/месяц. 300+ WordPress проектов. Кастомная разработка и поддержка!' }[locale] ?? 'WordPress agency from Vienna: Website from 2,490 euros, theme from 990 euros, maintenance from 99 euros/month. 300+ WordPress projects. Custom development & support!'
  )

  const hreflangAlternates = getHreflangAlternates('/leistungen/wordpress-agentur', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: { de: ['WordPress Agentur', 'WordPress Agentur Wien', 'WordPress Entwicklung', 'WordPress Theme', 'WordPress Plugin', 'WordPress Wartung'], en: ['WordPress Agency', 'WordPress Agency Vienna', 'WordPress Development', 'WordPress Theme', 'WordPress Plugin', 'WordPress Maintenance'], ru: ['WordPress Агентство', 'WordPress Агентство Вена', 'WordPress Разработка', 'WordPress Тема', 'WordPress Плагин', 'WordPress Обслуживание'] }[locale] ?? ['WordPress Agency', 'WordPress Agency Vienna', 'WordPress Development', 'WordPress Theme', 'WordPress Plugin', 'WordPress Maintenance'],
    openGraph: {
      title: { de: 'WordPress Agentur Wien', en: 'WordPress Agency Vienna', ru: 'WordPress Агентство Вена' }[locale] ?? 'WordPress Agency Vienna',
      description: metaDescription,
      url: getCanonicalUrl('/leistungen/wordpress-agentur', locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing - WordPress Agentur' }],
    },
    alternates: {
      canonical: getCanonicalUrl('/leistungen/wordpress-agentur', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WordPressAgenturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const t = await getTranslations({ locale, namespace: 'common' })
  const _isEn = locale === 'en'

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] ?? 'Home', url: 'https://goldenwing.at' },
    { name: { de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale] ?? 'Services', url: { de: 'https://goldenwing.at/leistungen', en: 'https://goldenwing.at/en/services', ru: 'https://goldenwing.at/ru/services' }[locale] ?? 'https://goldenwing.at/en/services' },
    { name: { de: 'WordPress Agentur', en: 'WordPress Agency', ru: 'WordPress Агентство' }[locale] ?? 'WordPress Agency', url: { de: 'https://goldenwing.at/leistungen/wordpress-agentur', en: 'https://goldenwing.at/en/services/wordpress-agency', ru: 'https://goldenwing.at/ru/services/wordpress-agency' }[locale] ?? 'https://goldenwing.at/en/services/wordpress-agency' },
  ]

  const heroData = {
    badge: { de: 'WordPress Agentur', en: 'WordPress Agency', ru: 'WordPress Агентство' }[locale] ?? 'WordPress Agency',
    title: { de: 'WordPress Agentur Wien', en: 'WordPress Agency Vienna', ru: 'WordPress Агентство Вена' }[locale] ?? 'WordPress Agency Vienna',
    subtitle: { de: 'WordPress richtig gemacht.', en: 'WordPress done right.', ru: 'WordPress сделано правильно.' }[locale] ?? 'WordPress done right.',
    description: { de: 'Professionelle WordPress-Entwicklung aus Wien. Custom Themes, Plugin-Entwicklung und laufende Wartung. 300+ Projekte seit 2014 - performance-optimiert und sicher.', en: 'Professional WordPress development from Vienna. Custom themes, plugin development, and ongoing maintenance. 300+ projects since 2014 - performance-optimized and secure.', ru: 'Профессиональная разработка WordPress из Вены. Кастомные темы, разработка плагинов и постоянное обслуживание. 300+ проектов с 2014 года - оптимизированные и безопасные.' }[locale] ?? 'Professional WordPress development from Vienna. Custom themes, plugin development, and ongoing maintenance. 300+ projects since 2014 - performance-optimized and secure.',
    ctaPrimary: { de: 'Kostenlose Beratung', en: 'Free Consultation', ru: 'Бесплатная консультация' }[locale] ?? 'Free Consultation',
    ctaSecondary: { de: 'Pakete ansehen', en: 'View Packages', ru: 'Смотреть пакеты' }[locale] ?? 'View Packages',
  }

  const results = defaultResults[locale as 'de' | 'en' | 'ru'] ?? defaultResults['en']
  const services = defaultServices[locale as 'de' | 'en' | 'ru'] ?? defaultServices['en']
  const packages = defaultPackages[locale as 'de' | 'en' | 'ru'] ?? defaultPackages['en']
  const process = defaultProcess[locale as 'de' | 'en' | 'ru'] ?? defaultProcess['en']
  const faqs = defaultFaqs[locale as 'de' | 'en' | 'ru'] ?? defaultFaqs['en']
  const relatedServices = defaultRelatedServices[locale as 'de' | 'en' | 'ru'] ?? defaultRelatedServices['en']
  const usps = defaultUsps[locale as 'de' | 'en' | 'ru'] ?? defaultUsps['en']
  const technologies = defaultTechnologies[locale as 'de' | 'en' | 'ru'] ?? defaultTechnologies['en']

  const servicesTitle = { de: 'Unsere WordPress Leistungen', en: 'Our WordPress Services', ru: 'Наши услуги WordPress' }[locale] ?? 'Our WordPress Services'
  const servicesDescription = { de: 'Von Entwicklung bis laufende Wartung - alles fuer Ihren WordPress-Erfolg.', en: 'From development to ongoing maintenance - everything for your WordPress success.', ru: 'От разработки до постоянного обслуживания - все для вашего успеха с WordPress.' }[locale] ?? 'From development to ongoing maintenance - everything for your WordPress success.'
  const pricingTitle = { de: 'WordPress Pakete', en: 'WordPress Packages', ru: 'Пакеты WordPress' }[locale] ?? 'WordPress Packages'
  const pricingDescription = { de: 'Transparente Preise fuer professionelle WordPress-Leistungen.', en: 'Transparent pricing for professional WordPress services.', ru: 'Прозрачные цены на профессиональные услуги WordPress.' }[locale] ?? 'Transparent pricing for professional WordPress services.'
  const processTitle = { de: 'Unser Entwicklungsprozess', en: 'Our Development Process', ru: 'Наш процесс разработки' }[locale] ?? 'Our Development Process'
  const processDescription = { de: 'Strukturierter Prozess fuer erfolgreiche WordPress-Projekte.', en: 'Structured process for successful WordPress projects.', ru: 'Структурированный процесс для успешных проектов WordPress.' }[locale] ?? 'Structured process for successful WordPress projects.'
  const faqTitle = { de: 'Haeufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale] ?? 'Frequently Asked Questions'
  const relatedServicesTitle = { de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale] ?? 'Related Services'
  const ctaTitle = { de: 'Bereit fuer Ihr WordPress-Projekt?', en: 'Ready for Your WordPress Project?', ru: 'Готовы к вашему проекту WordPress?' }[locale] ?? 'Ready for Your WordPress Project?'
  const ctaDescription = { de: 'Lassen Sie uns ueber Ihre WordPress-Anforderungen sprechen. Kostenloses Erstgespraech.', en: 'Let\'s discuss your WordPress needs. Free initial consultation.', ru: 'Давайте обсудим ваши потребности в WordPress. Бесплатная первичная консультация.' }[locale] ?? 'Let\'s discuss your WordPress needs. Free initial consultation.'
  const ctaButton = { de: 'Kostenlose Beratung anfordern', en: 'Request Free Consultation', ru: 'Запросить бесплатную консультацию' }[locale] ?? 'Request Free Consultation'
  const uspsTitle = { de: 'Warum wir', en: 'Why Choose Us', ru: 'Почему мы' }[locale] ?? 'Why Choose Us'
  const techTitle = { de: 'Technologien, die wir nutzen', en: 'Technologies We Use', ru: 'Технологии, которые мы используем' }[locale] ?? 'Technologies We Use'
  const techDescription = { de: 'WordPress-Oekosystem-Expertise fuer professionelle Ergebnisse.', en: 'WordPress ecosystem expertise for professional results.', ru: 'Экспертиза экосистемы WordPress для профессиональных результатов.' }[locale] ?? 'WordPress ecosystem expertise for professional results.'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'WordPress Agentur Wien', en: 'WordPress Agency Vienna', ru: 'WordPress Агентство Вена' }[locale] ?? 'WordPress Agency Vienna',
    alternateName: { de: 'WordPress Entwicklung Wien', en: 'WordPress Development Vienna', ru: 'WordPress Разработка Вена' }[locale] ?? 'WordPress Development Vienna',
    url: 'https://goldenwing.at/leistungen/wordpress-agentur',
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
    description: { de: 'Professionelle WordPress-Entwicklung in Wien. Custom Themes, Plugin-Entwicklung und laufende Wartung.', en: 'Professional WordPress development in Vienna. Custom themes, plugin development, and ongoing maintenance.', ru: 'Профессиональная разработка WordPress в Вене. Кастомные темы, разработка плагинов и постоянное обслуживание.' }[locale] ?? 'Professional WordPress development in Vienna. Custom themes, plugin development, and ongoing maintenance.',
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
              const IconComponent = iconMap[service.icon] || Code
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg: { name: string; price: string; priceType: string; description: string; popular: boolean; features: string[] }) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Beliebt', en: 'Popular', ru: 'Популярный' }[locale] ?? 'Popular'}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
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
                    <NextLink href={getContactUrl(locale)}>{{ de: 'Anfragen', en: 'Request', ru: 'Запросить' }[locale] ?? 'Request'}</NextLink>
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
