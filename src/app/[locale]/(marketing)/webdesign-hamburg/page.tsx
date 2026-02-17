import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { LandingPageTemplate, LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const CITY_SLUG = 'hamburg'

type SupportedLocale = 'de' | 'en' | 'ru'

// City-specific content (unique for Hamburg - E-Commerce & Hanseatic focus)
const pageContent: Record<SupportedLocale, { meta: { title: string; description: string; keywords: string[] }; content: LandingPageContent }> = {
  de: {
    meta: {
      title: 'Webdesign Hamburg · Websites für Norddeutschland | GoldenWing',
      description: 'Webdesign für Hamburger Unternehmen. Von E-Commerce bis Corporate Websites. Hanseatische Qualität, österreichische Präzision.',
      keywords: ['webdesign hamburg', 'webagentur hamburg', 'website erstellen hamburg'],
    },
    content: {
      hero: {
        badge: 'Webdesign Agentur für Hamburg',
        title: 'Webdesign Hamburg',
        description: 'Premium-Websites für die Hansestadt. Wir verbinden norddeutsche Klarheit mit österreichischer Präzision – für Websites, die Hamburger Unternehmen zum Erfolg führen.',
        ctaPrimary: 'Kostenloses Erstgespräch',
        ctaSecondary: 'Preise ansehen',
      },
      trustSignals: [
        { icon: 'award', text: 'DACH-Expertise' },
        { icon: 'star', text: 'E-Commerce Know-how' },
        { icon: 'clock', text: 'Remote-Zusammenarbeit' },
      ],
      benefits: [
        { icon: 'zap', title: 'Norddeutsche Klarheit', description: 'Design, das zur hanseatischen Geschäftskultur passt' },
        { icon: 'shield', title: 'E-Commerce Expertise', description: 'Online-Shops für Hamburgs Handelsunternehmen' },
        { icon: 'users', title: 'Internationale Reichweite', description: 'Mehrsprachig für Hamburgs globale Geschäfte' },
        { icon: 'star', title: 'Digitale Zusammenarbeit', description: 'Effizient auch über die Entfernung' },
      ],
      packages: [
        { name: 'Starter', price: '3.000', description: 'Für lokale Unternehmen', popular: false, features: ['Bis zu 5 Seiten', 'Responsive Design', 'Kontaktformular', 'SEO Grundoptimierung', 'DSGVO-konform', 'SSL-Zertifikat'] },
        { name: 'Business', price: '6.000', description: 'Für den Mittelstand', popular: true, features: ['Bis zu 12 Seiten', 'CMS zur Selbstbearbeitung', 'Blog-Funktion', 'Google Analytics', 'Newsletter-Integration', 'Social Media Integration', '1 Jahr Support', 'Performance-Optimierung'] },
        { name: 'E-Commerce', price: '12.000+', description: 'Online-Shops für Hamburg', popular: false, features: ['WooCommerce/Shopify', 'Produktmanagement', 'Zahlungsintegration', 'Versand-Anbindung', 'Warenwirtschaft', 'Kundenkonto', 'Marketing-Tools', 'Unbegrenzter Support'] },
      ],
      process: [
        { step: '01', title: 'Video-Call', description: 'Persönliches Kennenlernen per Videokonferenz.' },
        { step: '02', title: 'Konzept', description: 'Wireframes und Design-Konzept nach Ihren Wünschen.' },
        { step: '03', title: 'Design', description: 'Modernes Webdesign mit hanseatischem Flair.' },
        { step: '04', title: 'Entwicklung', description: 'Professionelle Umsetzung in Code.' },
        { step: '05', title: 'Launch', description: 'Go-Live und fortlaufende Betreuung.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'WordPress', 'WooCommerce', 'Shopify', 'Tailwind CSS', 'Node.js'],
      faqs: [
        { question: 'Betreut ihr auch Unternehmen in Norddeutschland?', answer: 'Ja, von Wien aus betreuen wir Kunden in ganz Deutschland, einschließlich Hamburg und der gesamten norddeutschen Region. Digitale Zusammenarbeit macht die Entfernung irrelevant.' },
        { question: 'Habt ihr Erfahrung mit der Hamburger Wirtschaft?', answer: 'Wir haben Erfahrung mit verschiedenen Branchen und passen unsere Designs an die spezifischen Anforderungen der Hamburger Wirtschaft an, sei es Hafen, Handel, Logistik oder Medien.' },
        { question: 'Könnt ihr auch für den skandinavischen Markt designen?', answer: 'Ja, Hamburg ist das Tor nach Skandinavien. Wir können mehrsprachige Websites erstellen, die auch den nordischen Markt ansprechen - Dänisch, Schwedisch, Norwegisch auf Anfrage.' },
        { question: 'Bietet ihr E-Commerce-Lösungen für Hamburger Händler?', answer: 'Absolut! Wir erstellen Online-Shops mit WooCommerce oder Shopify, die auch lokale Abholung, Click & Collect und regionale Versandoptionen unterstützen.' },
        { question: 'Wie funktioniert die Kommunikation über die Entfernung?', answer: 'Dank moderner Tools (Video-Calls, Slack, Projektportal) arbeiten wir genauso effizient mit Hamburger Kunden wie mit lokalen. Die meisten Kunden bevorzugen sogar die digitale Zusammenarbeit.' },
      ],
      relatedServices: [
        { title: 'Webdesign Deutschland', description: 'Für Unternehmen bundesweit.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'SEO Deutschland', description: 'Sichtbarkeit auf Google.de.', href: '/seo-agentur-deutschland' as StaticAppPathname },
        { title: 'Branding', description: 'Markenentwicklung für den deutschen Markt.', href: '/leistungen/branding' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Unsere Pakete für Hamburg',
        pricingDescription: 'Faire Preise für norddeutsche Qualitätsansprüche.',
        processTitle: 'Unser Prozess',
        processSubtitle: 'Klar strukturiert und effizient – hanseatisch eben.',
        technologiesTitle: 'Technologien',
        technologiesDescription: 'Moderne Technologien für zukunftssichere Websites.',
        faqTitle: 'Häufige Fragen zu Webdesign Hamburg',
        faqSubtitle: 'Antworten auf häufig gestellte Fragen.',
        relatedServicesTitle: 'Weitere Services',
        ctaTitle: 'Bereit für Ihre neue Website?',
        ctaDescription: 'Lassen Sie uns per Video-Call über Ihr Projekt sprechen.',
        ctaButton: 'Projekt anfragen',
        popular: 'Beliebt',
        oneTime: 'einmalig',
        sendRequest: 'Anfrage senden',
        learnMore: 'Mehr erfahren',
      },
    },
  },
  en: {
    meta: {
      title: 'Web Design Hamburg · Websites for Northern Germany | GoldenWing',
      description: 'Web design for Hamburg businesses. From e-commerce to corporate websites. Hanseatic quality, Austrian precision.',
      keywords: ['web design hamburg', 'web agency hamburg', 'website hamburg'],
    },
    content: {
      hero: {
        badge: 'Web Design Agency for Hamburg',
        title: 'Web Design Hamburg',
        description: 'Premium websites for the Hanseatic city. We combine northern German clarity with Austrian precision – for websites that lead Hamburg businesses to success.',
        ctaPrimary: 'Free Consultation',
        ctaSecondary: 'View Pricing',
      },
      trustSignals: [
        { icon: 'award', text: 'DACH Expertise' },
        { icon: 'star', text: 'E-Commerce Know-how' },
        { icon: 'clock', text: 'Remote Collaboration' },
      ],
      benefits: [
        { icon: 'zap', title: 'Northern German Clarity', description: 'Design that fits Hanseatic business culture' },
        { icon: 'shield', title: 'E-Commerce Expertise', description: 'Online shops for Hamburg trade companies' },
        { icon: 'users', title: 'International Reach', description: 'Multilingual for Hamburg\'s global businesses' },
        { icon: 'star', title: 'Digital Collaboration', description: 'Efficient even across distance' },
      ],
      packages: [
        { name: 'Starter', price: '3,000', description: 'For local businesses', popular: false, features: ['Up to 5 pages', 'Responsive design', 'Contact form', 'Basic SEO optimization', 'GDPR compliant', 'SSL certificate'] },
        { name: 'Business', price: '6,000', description: 'For mid-sized companies', popular: true, features: ['Up to 12 pages', 'CMS for self-editing', 'Blog feature', 'Google Analytics', 'Newsletter integration', 'Social media integration', '1 year support', 'Performance optimization'] },
        { name: 'E-Commerce', price: '12,000+', description: 'Online shops for Hamburg', popular: false, features: ['WooCommerce/Shopify', 'Product management', 'Payment integration', 'Shipping connection', 'Inventory system', 'Customer accounts', 'Marketing tools', 'Unlimited support'] },
      ],
      process: [
        { step: '01', title: 'Video Call', description: 'Personal introduction via video conference.' },
        { step: '02', title: 'Concept', description: 'Wireframes and design concept according to your wishes.' },
        { step: '03', title: 'Design', description: 'Modern web design with Hanseatic flair.' },
        { step: '04', title: 'Development', description: 'Professional implementation in code.' },
        { step: '05', title: 'Launch', description: 'Go-live and ongoing support.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'WordPress', 'WooCommerce', 'Shopify', 'Tailwind CSS', 'Node.js'],
      faqs: [
        { question: 'Do you serve businesses in Northern Germany?', answer: 'Yes, from Vienna we serve clients throughout Germany, including Hamburg and the entire northern region. Digital collaboration makes distance irrelevant.' },
        { question: 'Do you have experience with Hamburg\'s economy?', answer: 'We have experience across various industries and adapt our designs to the specific requirements of Hamburg\'s economy, whether port, trade, logistics, or media.' },
        { question: 'Can you design for Scandinavian markets as well?', answer: 'Yes, Hamburg is the gateway to Scandinavia. We can create multilingual websites that also appeal to Nordic markets - Danish, Swedish, Norwegian upon request.' },
        { question: 'Do you offer e-commerce solutions for Hamburg retailers?', answer: 'Absolutely! We create online shops with WooCommerce or Shopify that support local pickup, click & collect, and regional shipping options.' },
        { question: 'How does communication work despite the distance?', answer: 'Thanks to modern tools (video calls, Slack, project portal), we work just as efficiently with Hamburg clients as with local ones. Most clients actually prefer digital collaboration.' },
      ],
      relatedServices: [
        { title: 'Web Design Germany', description: 'For businesses nationwide.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'SEO Germany', description: 'Visibility on Google.de.', href: '/seo-agentur-deutschland' as StaticAppPathname },
        { title: 'Branding', description: 'Brand development for the German market.', href: '/leistungen/branding' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Our Packages for Hamburg',
        pricingDescription: 'Fair prices for Northern German quality standards.',
        processTitle: 'Our Process',
        processSubtitle: 'Clearly structured and efficient – Hanseatic style.',
        technologiesTitle: 'Technologies',
        technologiesDescription: 'Modern technologies for future-proof websites.',
        faqTitle: 'Frequently Asked Questions about Web Design Hamburg',
        faqSubtitle: 'Answers to frequently asked questions.',
        relatedServicesTitle: 'More Services',
        ctaTitle: 'Ready for Your New Website?',
        ctaDescription: 'Let\'s discuss your project via video call.',
        ctaButton: 'Request Project',
        popular: 'Popular',
        oneTime: 'one-time',
        sendRequest: 'Send Request',
        learnMore: 'Learn More',
      },
    },
  },
  ru: {
    meta: {
      title: 'Веб-дизайн Гамбург · Сайты для Северной Германии | GoldenWing',
      description: 'Веб-дизайн для гамбургских компаний. От интернет-магазинов до корпоративных сайтов. Ганзейское качество, австрийская точность.',
      keywords: ['веб-дизайн гамбург', 'веб-агентство гамбург', 'создание сайта гамбург'],
    },
    content: {
      hero: {
        badge: 'Агентство веб-дизайна для Гамбурга',
        title: 'Веб-дизайн Гамбург',
        description: 'Премиум-сайты для ганзейского города. Мы сочетаем северогерманскую ясность с австрийской точностью – для сайтов, которые приведут гамбургские компании к успеху.',
        ctaPrimary: 'Бесплатная консультация',
        ctaSecondary: 'Посмотреть цены',
      },
      trustSignals: [
        { icon: 'award', text: 'Экспертиза DACH' },
        { icon: 'star', text: 'Опыт E-Commerce' },
        { icon: 'clock', text: 'Удаленное сотрудничество' },
      ],
      benefits: [
        { icon: 'zap', title: 'Северогерманская ясность', description: 'Дизайн, соответствующий ганзейской бизнес-культуре' },
        { icon: 'shield', title: 'Экспертиза E-Commerce', description: 'Интернет-магазины для торговых компаний Гамбурга' },
        { icon: 'users', title: 'Международный охват', description: 'Многоязычность для глобального бизнеса Гамбурга' },
        { icon: 'star', title: 'Цифровое сотрудничество', description: 'Эффективность даже на расстоянии' },
      ],
      packages: [
        { name: 'Starter', price: '3 000', description: 'Для местных компаний', popular: false, features: ['До 5 страниц', 'Адаптивный дизайн', 'Контактная форма', 'Базовая SEO-оптимизация', 'Соответствие GDPR', 'SSL-сертификат'] },
        { name: 'Business', price: '6 000', description: 'Для среднего бизнеса', popular: true, features: ['До 12 страниц', 'CMS для самостоятельного редактирования', 'Функция блога', 'Google Analytics', 'Интеграция рассылки', 'Интеграция соцсетей', '1 год поддержки', 'Оптимизация производительности'] },
        { name: 'E-Commerce', price: '12 000+', description: 'Интернет-магазины для Гамбурга', popular: false, features: ['WooCommerce/Shopify', 'Управление товарами', 'Интеграция платежей', 'Подключение доставки', 'Система учета', 'Личный кабинет клиента', 'Маркетинговые инструменты', 'Неограниченная поддержка'] },
      ],
      process: [
        { step: '01', title: 'Видеозвонок', description: 'Личное знакомство через видеоконференцию.' },
        { step: '02', title: 'Концепция', description: 'Прототипы и дизайн-концепция по вашим пожеланиям.' },
        { step: '03', title: 'Дизайн', description: 'Современный веб-дизайн с ганзейским колоритом.' },
        { step: '04', title: 'Разработка', description: 'Профессиональная реализация в коде.' },
        { step: '05', title: 'Запуск', description: 'Запуск и постоянная поддержка.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'WordPress', 'WooCommerce', 'Shopify', 'Tailwind CSS', 'Node.js'],
      faqs: [
        { question: 'Вы обслуживаете компании в Северной Германии?', answer: 'Да, из Вены мы обслуживаем клиентов по всей Германии, включая Гамбург и весь северный регион. Цифровое сотрудничество делает расстояние несущественным.' },
        { question: 'У вас есть опыт работы с гамбургской экономикой?', answer: 'У нас есть опыт в различных отраслях, и мы адаптируем наши дизайны к специфическим требованиям гамбургской экономики, будь то порт, торговля, логистика или медиа.' },
        { question: 'Вы можете создавать дизайн для скандинавских рынков?', answer: 'Да, Гамбург – это ворота в Скандинавию. Мы можем создавать многоязычные сайты, ориентированные также на северные рынки – датский, шведский, норвежский по запросу.' },
        { question: 'Вы предлагаете решения для интернет-магазинов гамбургских ритейлеров?', answer: 'Безусловно! Мы создаем интернет-магазины на WooCommerce или Shopify с поддержкой самовывоза, Click & Collect и региональных вариантов доставки.' },
        { question: 'Как работает коммуникация на расстоянии?', answer: 'Благодаря современным инструментам (видеозвонки, Slack, проектный портал) мы работаем так же эффективно с клиентами из Гамбурга, как и с местными. Большинство клиентов даже предпочитают цифровое сотрудничество.' },
      ],
      relatedServices: [
        { title: 'Веб-дизайн Германия', description: 'Для компаний по всей стране.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'SEO Германия', description: 'Видимость в Google.de.', href: '/seo-agentur-deutschland' as StaticAppPathname },
        { title: 'Брендинг', description: 'Развитие бренда для немецкого рынка.', href: '/leistungen/branding' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Наши пакеты для Гамбурга',
        pricingDescription: 'Справедливые цены для северогерманских стандартов качества.',
        processTitle: 'Наш процесс',
        processSubtitle: 'Четко структурирован и эффективен – в ганзейском стиле.',
        technologiesTitle: 'Технологии',
        technologiesDescription: 'Современные технологии для перспективных сайтов.',
        faqTitle: 'Часто задаваемые вопросы о веб-дизайне в Гамбурге',
        faqSubtitle: 'Ответы на часто задаваемые вопросы.',
        relatedServicesTitle: 'Другие услуги',
        ctaTitle: 'Готовы к новому сайту?',
        ctaDescription: 'Давайте обсудим ваш проект по видеозвонку.',
        ctaButton: 'Заказать проект',
        popular: 'Популярный',
        oneTime: 'единоразово',
        sendRequest: 'Отправить запрос',
        learnMore: 'Узнать больше',
      },
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const { meta } = pageContent[locale] ?? pageContent['en']
  const hreflangAlternates = getHreflangAlternates(`/webdesign-${CITY_SLUG}`, locale)

  return {
    title: meta.title,
    description: truncateMetaDescription(meta.description),
    keywords: meta.keywords,
    openGraph: {
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      title: meta.title,
      description: truncateMetaDescription(meta.description),
      url: getCanonicalUrl(`/webdesign-${CITY_SLUG}`, locale),
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: truncateMetaDescription(meta.description),
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl(`/webdesign-${CITY_SLUG}`, locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WebdesignHamburgPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const { content, meta: _meta } = pageContent[locale] ?? pageContent['en']

  const seo: LandingPageSEO = {
    serviceName: { de: 'Webdesign Hamburg', en: 'Web Design Hamburg', ru: 'Веб-дизайн Гамбург' }[locale],
    cityName: 'Hamburg',
    url: `/webdesign-${CITY_SLUG}`,
    breadcrumbs: [
      { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: 'https://goldenwing.at' },
      { name: { de: 'Webdesign Hamburg', en: 'Web Design Hamburg', ru: 'Веб-дизайн Гамбург' }[locale], url: `https://goldenwing.at${locale === 'en' ? '/en' : locale === 'ru' ? '/ru' : ''}/webdesign-${CITY_SLUG}` },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
