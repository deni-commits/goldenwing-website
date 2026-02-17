import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { LandingPageTemplate, LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const CITY_SLUG = 'schweiz'

type SupportedLocale = 'de' | 'en' | 'ru'

// City-specific content (unique for Switzerland - DSG/CHF/multilingual focus)
const pageContent: Record<SupportedLocale, { meta: { title: string; description: string; keywords: string[] }; content: LandingPageContent }> = {
  de: {
    meta: {
      title: 'Webdesign Schweiz · Qualität für Schweizer KMU | GoldenWing',
      description: 'Webdesign für Schweizer Unternehmen. Premium-Websites mit Schweizer Hosting-Option. DSGVO & DSG konform. Jetzt anfragen!',
      keywords: ['webdesign schweiz', 'webagentur schweiz', 'website erstellen schweiz'],
    },
    content: {
      hero: {
        badge: 'Webdesign Agentur für die Schweiz',
        title: 'Webdesign Schweiz',
        description: 'Premium-Websites für Schweizer Unternehmen. Wir verstehen die hohen Qualitätsansprüche und liefern Websites, die überzeugen – in Deutsch, Französisch oder Italienisch.',
        ctaPrimary: 'Kostenloses Erstgespräch',
        ctaSecondary: 'Preise ansehen',
      },
      trustSignals: [
        { icon: 'award', text: 'DACH-Expertise' },
        { icon: 'star', text: 'Premium-Qualität' },
        { icon: 'shield', text: 'DSG-konform' },
      ],
      benefits: [
        { icon: 'zap', title: 'Schweizer Standards', description: 'Wir verstehen die hohen Qualitätsansprüche Schweizer Unternehmen' },
        { icon: 'shield', title: 'DSG & DSGVO', description: 'Vollständige Konformität mit Schweizer und EU-Datenschutz' },
        { icon: 'users', title: 'Mehrsprachig', description: 'Websites in DE, FR, IT – für alle Landesteile' },
        { icon: 'star', title: 'CH-Hosting', description: 'Auf Wunsch Hosting bei Schweizer Anbietern' },
      ],
      packages: [
        { name: 'Starter', price: '3.500', description: 'Für kleine Unternehmen', popular: false, features: ['Bis zu 5 Seiten', 'Responsive Design', 'Kontaktformular', 'SEO Grundoptimierung', 'SSL-Zertifikat', 'CH-Hosting Option'] },
        { name: 'Business', price: '7.500', description: 'Für den Mittelstand', popular: true, features: ['Bis zu 15 Seiten', 'CMS zur Selbstbearbeitung', 'Mehrsprachig (2 Sprachen)', 'Erweiterte SEO', 'Google Analytics', 'Newsletter-Integration', 'Social Media Integration', '2 Jahre Support inkl.'] },
        { name: 'Enterprise', price: '15.000+', description: 'Für Premium-Ansprüche', popular: false, features: ['Unbegrenzte Seiten', 'Alle 3 Landessprachen', 'Individuelle Entwicklung', 'E-Commerce Integration', 'API-Integrationen', 'Performance Optimierung', 'Dedizierter Projektmanager', 'Premium Support'] },
      ],
      process: [
        { step: '01', title: 'Erstgespräch', description: 'Kostenlose Beratung per Video-Call.' },
        { step: '02', title: 'Konzept & Design', description: 'Wireframes und Design-Entwürfe nach Ihren Wünschen.' },
        { step: '03', title: 'Entwicklung', description: 'Professionelle Umsetzung mit modernsten Technologien.' },
        { step: '04', title: 'Testing & Launch', description: 'Gründliche Tests und Go-Live Ihrer neuen Website.' },
        { step: '05', title: 'Support', description: 'Laufende Betreuung und Optimierung nach dem Launch.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
      faqs: [
        { question: 'Arbeitet ihr auch in Schweizer Franken ab?', answer: 'Ja, für Schweizer Kunden rechnen wir gerne in CHF ab. Die Umrechnung erfolgt zum aktuellen Tageskurs oder wir vereinbaren einen festen Wechselkurs für das Projekt.' },
        { question: 'Versteht ihr die Besonderheiten des Schweizer Marktes?', answer: 'Definitiv. Wir wissen, dass Schweizer Kunden höchste Qualitätsansprüche haben und Wert auf Präzision, Zuverlässigkeit und Diskretion legen.' },
        { question: 'Wie steht es mit dem Schweizer Datenschutzgesetz (DSG)?', answer: 'Wir achten auf Konformität sowohl mit der DSGVO als auch mit dem Schweizer DSG. Alle unsere Websites erfüllen die strengsten Datenschutzanforderungen.' },
        { question: 'Bietet ihr Hosting in der Schweiz an?', answer: 'Auf Wunsch können wir Hosting bei Schweizer Anbietern wie Hostpoint oder Infomaniak arrangieren, um maximale Datensicherheit und Schweizer Rechtskonformität zu gewährleisten.' },
        { question: 'Betreut ihr auch Kunden in der Romandie oder im Tessin?', answer: 'Ja, wir arbeiten schweizweit. Für die französische oder italienische Schweiz bieten wir auch muttersprachliche Content-Erstellung und Übersetzungen an.' },
      ],
      relatedServices: [
        { title: 'Webdesign Zürich', description: 'Speziell für Zürcher Unternehmen.', href: '/webdesign-zuerich' as StaticAppPathname },
        { title: 'SEO Schweiz', description: 'Suchmaschinenoptimierung für Google.ch.', href: '/seo-agentur-schweiz' as StaticAppPathname },
        { title: 'Branding', description: 'Corporate Identity für Schweizer Marken.', href: '/leistungen/branding' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Unsere Pakete für die Schweiz',
        pricingDescription: 'Premium-Qualität zu fairen Preisen. Abrechnung in EUR oder CHF möglich.',
        processTitle: 'Unser Prozess',
        processSubtitle: 'Von der ersten Idee bis zum fertigen Projekt – präzise und zuverlässig.',
        technologiesTitle: 'Technologien',
        technologiesDescription: 'Wir setzen auf bewährte und moderne Technologien für beste Ergebnisse.',
        faqTitle: 'Häufige Fragen zu Webdesign Schweiz',
        faqSubtitle: 'Antworten auf häufig gestellte Fragen.',
        relatedServicesTitle: 'Weitere Services',
        ctaTitle: 'Bereit für Ihre neue Website?',
        ctaDescription: 'Lassen Sie uns über Ihr Projekt sprechen. Kostenloses Erstgespräch ohne Verpflichtung.',
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
      title: 'Web Design Switzerland · Quality for Swiss SMEs | GoldenWing',
      description: 'Web design for Swiss businesses. Premium websites with Swiss hosting option. GDPR & DSG compliant. Get in touch today!',
      keywords: ['web design switzerland', 'web agency switzerland', 'website switzerland'],
    },
    content: {
      hero: {
        badge: 'Web Design Agency for Switzerland',
        title: 'Web Design Switzerland',
        description: 'Premium websites for Swiss businesses. We understand high quality standards and deliver websites that convince – in German, French, or Italian.',
        ctaPrimary: 'Free Consultation',
        ctaSecondary: 'View Pricing',
      },
      trustSignals: [
        { icon: 'award', text: 'DACH Expertise' },
        { icon: 'star', text: 'Premium Quality' },
        { icon: 'shield', text: 'DSG Compliant' },
      ],
      benefits: [
        { icon: 'zap', title: 'Swiss Standards', description: 'We understand the high quality standards of Swiss businesses' },
        { icon: 'shield', title: 'DSG & GDPR', description: 'Full compliance with Swiss and EU data protection' },
        { icon: 'users', title: 'Multilingual', description: 'Websites in DE, FR, IT – for all regions' },
        { icon: 'star', title: 'CH Hosting', description: 'Swiss hosting providers available on request' },
      ],
      packages: [
        { name: 'Starter', price: '3,500', description: 'For small businesses', popular: false, features: ['Up to 5 pages', 'Responsive design', 'Contact form', 'Basic SEO optimization', 'SSL certificate', 'CH hosting option'] },
        { name: 'Business', price: '7,500', description: 'For mid-sized companies', popular: true, features: ['Up to 15 pages', 'CMS for self-editing', 'Multilingual (2 languages)', 'Advanced SEO', 'Google Analytics', 'Newsletter integration', 'Social media integration', '2 years support incl.'] },
        { name: 'Enterprise', price: '15,000+', description: 'For premium requirements', popular: false, features: ['Unlimited pages', 'All 3 national languages', 'Custom development', 'E-commerce integration', 'API integrations', 'Performance optimization', 'Dedicated project manager', 'Premium support'] },
      ],
      process: [
        { step: '01', title: 'Initial Call', description: 'Free consultation via video call.' },
        { step: '02', title: 'Concept & Design', description: 'Wireframes and design drafts according to your wishes.' },
        { step: '03', title: 'Development', description: 'Professional implementation with the latest technologies.' },
        { step: '04', title: 'Testing & Launch', description: 'Thorough testing and go-live of your new website.' },
        { step: '05', title: 'Support', description: 'Ongoing support and optimization after launch.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
      faqs: [
        { question: 'Do you invoice in Swiss Francs?', answer: "Yes, for Swiss clients we're happy to invoice in CHF. Conversion is based on the current daily rate or we agree on a fixed exchange rate for the project." },
        { question: 'Do you understand Swiss market specifics?', answer: 'Definitely. We know that Swiss clients have the highest quality standards and value precision, reliability, and discretion.' },
        { question: 'What about the Swiss Data Protection Act (DSG)?', answer: 'We ensure compliance with both GDPR and Swiss DSG. All our websites meet the strictest data protection requirements.' },
        { question: 'Do you offer hosting in Switzerland?', answer: 'Upon request, we can arrange hosting with Swiss providers like Hostpoint or Infomaniak to ensure maximum data security and Swiss legal compliance.' },
        { question: 'Do you serve clients in Romandie or Ticino?', answer: 'Yes, we work throughout Switzerland. For French or Italian Switzerland, we offer native-language content creation and translations.' },
      ],
      relatedServices: [
        { title: 'Web Design Zurich', description: 'Specifically for Zurich businesses.', href: '/webdesign-zuerich' as StaticAppPathname },
        { title: 'SEO Switzerland', description: 'Search engine optimization for Google.ch.', href: '/seo-agentur-schweiz' as StaticAppPathname },
        { title: 'Branding', description: 'Corporate identity for Swiss brands.', href: '/leistungen/branding' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Our Packages for Switzerland',
        pricingDescription: 'Premium quality at fair prices. Billing in EUR or CHF possible.',
        processTitle: 'Our Process',
        processSubtitle: 'From the first idea to the finished project – precise and reliable.',
        technologiesTitle: 'Technologies',
        technologiesDescription: 'We rely on proven and modern technologies for best results.',
        faqTitle: 'Frequently Asked Questions about Web Design Switzerland',
        faqSubtitle: 'Answers to frequently asked questions.',
        relatedServicesTitle: 'More Services',
        ctaTitle: 'Ready for Your New Website?',
        ctaDescription: "Let's talk about your project. Free initial consultation with no obligation.",
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
      title: 'Веб-дизайн Швейцария · Качество для швейцарских МСП | GoldenWing',
      description: 'Веб-дизайн для швейцарских компаний. Премиум-сайты с возможностью швейцарского хостинга. Соответствие GDPR и DSG. Свяжитесь с нами!',
      keywords: ['веб-дизайн швейцария', 'веб-агентство швейцария', 'создание сайта швейцария'],
    },
    content: {
      hero: {
        badge: 'Агентство веб-дизайна для Швейцарии',
        title: 'Веб-дизайн Швейцария',
        description: 'Премиум-сайты для швейцарских компаний. Мы понимаем высокие стандарты качества и создаём сайты, которые убеждают – на немецком, французском или итальянском.',
        ctaPrimary: 'Бесплатная консультация',
        ctaSecondary: 'Посмотреть цены',
      },
      trustSignals: [
        { icon: 'award', text: 'Экспертиза DACH' },
        { icon: 'star', text: 'Премиум качество' },
        { icon: 'shield', text: 'Соответствие DSG' },
      ],
      benefits: [
        { icon: 'zap', title: 'Швейцарские стандарты', description: 'Мы понимаем высокие требования к качеству швейцарских компаний' },
        { icon: 'shield', title: 'DSG и GDPR', description: 'Полное соответствие швейцарской и европейской защите данных' },
        { icon: 'users', title: 'Многоязычность', description: 'Сайты на DE, FR, IT – для всех регионов' },
        { icon: 'star', title: 'CH-хостинг', description: 'Хостинг у швейцарских провайдеров по запросу' },
      ],
      packages: [
        { name: 'Starter', price: '3 500', description: 'Для малого бизнеса', popular: false, features: ['До 5 страниц', 'Адаптивный дизайн', 'Контактная форма', 'Базовая SEO-оптимизация', 'SSL-сертификат', 'Опция CH-хостинга'] },
        { name: 'Business', price: '7 500', description: 'Для среднего бизнеса', popular: true, features: ['До 15 страниц', 'CMS для самостоятельного редактирования', 'Многоязычность (2 языка)', 'Расширенная SEO', 'Google Analytics', 'Интеграция рассылки', 'Интеграция соцсетей', '2 года поддержки'] },
        { name: 'Enterprise', price: '15 000+', description: 'Для премиум-требований', popular: false, features: ['Неограниченное количество страниц', 'Все 3 национальных языка', 'Индивидуальная разработка', 'E-commerce интеграция', 'API интеграции', 'Оптимизация производительности', 'Выделенный менеджер проекта', 'Премиум поддержка'] },
      ],
      process: [
        { step: '01', title: 'Первый звонок', description: 'Бесплатная консультация по видеозвонку.' },
        { step: '02', title: 'Концепция и дизайн', description: 'Wireframes и дизайн-макеты по вашим пожеланиям.' },
        { step: '03', title: 'Разработка', description: 'Профессиональная реализация на современных технологиях.' },
        { step: '04', title: 'Тестирование и запуск', description: 'Тщательное тестирование и запуск вашего нового сайта.' },
        { step: '05', title: 'Поддержка', description: 'Постоянная поддержка и оптимизация после запуска.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
      faqs: [
        { question: 'Работаете ли вы в швейцарских франках?', answer: 'Да, для швейцарских клиентов мы с удовольствием выставляем счета в CHF. Конвертация происходит по текущему дневному курсу или мы согласовываем фиксированный курс для проекта.' },
        { question: 'Понимаете ли вы особенности швейцарского рынка?', answer: 'Безусловно. Мы знаем, что швейцарские клиенты предъявляют высочайшие требования к качеству и ценят точность, надёжность и конфиденциальность.' },
        { question: 'Как обстоят дела со швейцарским законом о защите данных (DSG)?', answer: 'Мы обеспечиваем соответствие как GDPR, так и швейцарскому DSG. Все наши сайты соответствуют строжайшим требованиям защиты данных.' },
        { question: 'Предлагаете ли вы хостинг в Швейцарии?', answer: 'По запросу мы можем организовать хостинг у швейцарских провайдеров, таких как Hostpoint или Infomaniak, для обеспечения максимальной безопасности данных и соответствия швейцарскому законодательству.' },
        { question: 'Обслуживаете ли вы клиентов в Романдии или Тичино?', answer: 'Да, мы работаем по всей Швейцарии. Для французской или итальянской Швейцарии мы предлагаем создание контента и переводы носителями языка.' },
      ],
      relatedServices: [
        { title: 'Веб-дизайн Цюрих', description: 'Специально для цюрихских компаний.', href: '/webdesign-zuerich' as StaticAppPathname },
        { title: 'SEO Швейцария', description: 'Поисковая оптимизация для Google.ch.', href: '/seo-agentur-schweiz' as StaticAppPathname },
        { title: 'Брендинг', description: 'Корпоративная идентичность для швейцарских брендов.', href: '/leistungen/branding' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Наши пакеты для Швейцарии',
        pricingDescription: 'Премиум-качество по справедливым ценам. Оплата в EUR или CHF.',
        processTitle: 'Наш процесс',
        processSubtitle: 'От первой идеи до готового проекта – точно и надёжно.',
        technologiesTitle: 'Технологии',
        technologiesDescription: 'Мы используем проверенные и современные технологии для лучших результатов.',
        faqTitle: 'Часто задаваемые вопросы о веб-дизайне в Швейцарии',
        faqSubtitle: 'Ответы на часто задаваемые вопросы.',
        relatedServicesTitle: 'Другие услуги',
        ctaTitle: 'Готовы к новому сайту?',
        ctaDescription: 'Давайте обсудим ваш проект. Бесплатная первичная консультация без обязательств.',
        ctaButton: 'Запросить проект',
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
  const { meta } = pageContent[locale as SupportedLocale] ?? pageContent['en']
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

export default async function WebdesignSchweizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const { content, meta: _meta } = pageContent[locale as SupportedLocale] ?? pageContent['en']

  const seo: LandingPageSEO = {
    serviceName: { de: 'Webdesign Schweiz', en: 'Web Design Switzerland', ru: 'Веб-дизайн Швейцария' }[locale] ?? 'Web Design Switzerland',
    cityName: { de: 'Schweiz', en: 'Switzerland', ru: 'Швейцария' }[locale] ?? 'Switzerland',
    url: `/webdesign-${CITY_SLUG}`,
    breadcrumbs: [
      { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] ?? 'Home', url: 'https://goldenwing.at' },
      { name: { de: 'Webdesign Schweiz', en: 'Web Design Switzerland', ru: 'Веб-дизайн Швейцария' }[locale] ?? 'Web Design Switzerland', url: `https://goldenwing.at${locale === 'en' ? '/en' : locale === 'ru' ? '/ru' : ''}/webdesign-${CITY_SLUG}` },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
