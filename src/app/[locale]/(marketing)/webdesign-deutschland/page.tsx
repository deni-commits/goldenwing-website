import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { LandingPageTemplate, LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const CITY_SLUG = 'deutschland'

type SupportedLocale = 'de' | 'en' | 'ru'

// City-specific content (unique for Germany)
const pageContent: Record<SupportedLocale, { meta: { title: string; description: string; keywords: string[] }; content: LandingPageContent }> = {
  ru: {
    meta: {
      title: 'Веб-дизайн Германия · Австрийское качество | GoldenWing',
      description: 'Веб-дизайн для немецких компаний. Креативное агентство из Вены с экспертизой DACH. Современные сайты для стартапов, малого и среднего бизнеса, корпораций.',
      keywords: ['веб-дизайн германия', 'веб-агентство германия', 'создание сайта германия'],
    },
    content: {
      hero: {
        badge: 'Веб-дизайн агентство для Германии',
        title: 'Веб-дизайн Германия',
        description: 'Австрийская креативность встречает немецкий рынок. Мы создаём современные, высокопроизводительные сайты для компаний по всей Германии — от стартапов до корпораций.',
        ctaPrimary: 'Бесплатная консультация',
        ctaSecondary: 'Посмотреть цены',
      },
      trustSignals: [
        { icon: 'award', text: '120+ проектов DACH' },
        { icon: 'star', text: 'Рейтинг 4.9/5' },
        { icon: 'clock', text: 'С 2013 года' },
      ],
      benefits: [
        { icon: 'zap', title: 'Экспертиза DACH', description: 'Мы понимаем немецкий рынок и его требования' },
        { icon: 'shield', title: 'Соответствие GDPR', description: 'Все сайты соответствуют немецким стандартам защиты данных' },
        { icon: 'users', title: 'Немецкие ключевые слова', description: 'SEO-оптимизация специально для Google.de' },
        { icon: 'star', title: 'Один часовой пояс', description: 'Быстрая коммуникация без разницы во времени' },
      ],
      packages: [
        { name: 'Starter', price: '3 000', description: 'Идеально для малого бизнеса', popular: false, features: ['До 5 страниц', 'Адаптивный дизайн', 'Контактная форма', 'Базовая SEO-оптимизация', 'SSL-сертификат', '1 год хостинга вкл.'] },
        { name: 'Business', price: '6 000', description: 'Для растущих компаний', popular: true, features: ['До 15 страниц', 'CMS для самостоятельного редактирования', 'Функция блога', 'Расширенная SEO', 'Настройка Google Analytics', 'Интеграция рассылки', 'Интеграция соцсетей', '2 года поддержки вкл.'] },
        { name: 'Enterprise', price: '12 000+', description: 'Индивидуальные решения', popular: false, features: ['Неограниченное количество страниц', 'Индивидуальная разработка', 'Интеграция e-commerce', 'Мультиязычная поддержка', 'Интеграции API', 'Оптимизация производительности', 'Выделенный менеджер проекта', 'Премиум-поддержка'] },
      ],
      process: [
        { step: '01', title: 'Первичная консультация', description: 'Бесплатная консультация по видеосвязи о ваших целях.' },
        { step: '02', title: 'Концепция и дизайн', description: 'Прототипы и дизайн-макеты по вашим пожеланиям.' },
        { step: '03', title: 'Разработка', description: 'Профессиональная реализация с использованием новейших технологий.' },
        { step: '04', title: 'Тестирование и запуск', description: 'Тщательное тестирование и запуск вашего нового сайта.' },
        { step: '05', title: 'Поддержка', description: 'Постоянная поддержка и оптимизация после запуска.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
      faqs: [
        { question: 'Почему стоит выбрать австрийское агентство для немецкого бизнеса?', answer: 'Мы сочетаем австрийскую креативность с пониманием немецкого рынка. Один язык, один часовой пояс, но часто более свежие перспективы и конкурентные цены.' },
        { question: 'Есть ли у вас опыт работы с немецким рынком?', answer: 'Да, мы уже обслуживаем несколько клиентов в Германии, от Мюнхена до Гамбурга. Регион DACH — наш основной рынок.' },
        { question: 'Как работает коммуникация через границу?', answer: 'Благодаря цифровым инструментам (видеозвонки, управление проектами, облачное хранилище) мы работаем с немецкими клиентами так же эффективно, как и с местными.' },
        { question: 'Оптимизированы ли ваши сайты для немецкого рынка?', answer: 'Абсолютно. Мы оптимизируем под немецкие ключевые слова, немецкую орфографию и специфические требования Google.de.' },
        { question: 'Сколько стоит веб-дизайн для немецких компаний?', answer: 'Наши цены для немецких клиентов идентичны нашим австрийским тарифам. Бизнес-сайты от 3 000 евро, сложные проекты от 8 000 евро+.' },
      ],
      relatedServices: [
        { title: 'Веб-дизайн Мюнхен', description: 'Специально для баварских компаний.', href: '/webdesign-muenchen' as StaticAppPathname },
        { title: 'Веб-дизайн Берлин', description: 'Сайты для стартапов и технологических компаний.', href: '/webdesign-berlin' as StaticAppPathname },
        { title: 'SEO Германия', description: 'Поисковая оптимизация для Google.de.', href: '/leistungen/seo-content' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Наши пакеты',
        pricingDescription: 'Прозрачные цены на веб-дизайн в Германии. Все пакеты включают хостинг и поддержку.',
        processTitle: 'Наш процесс',
        processSubtitle: 'От первой идеи до готового проекта — так мы работаем с нашими немецкими клиентами.',
        technologiesTitle: 'Технологии',
        technologiesDescription: 'Мы используем проверенные и современные технологии для лучших результатов.',
        faqTitle: 'Часто задаваемые вопросы о веб-дизайне в Германии',
        faqSubtitle: 'Ответы на часто задаваемые вопросы.',
        relatedServicesTitle: 'Другие регионы',
        ctaTitle: 'Готовы к вашему новому сайту?',
        ctaDescription: 'Давайте обсудим ваш проект. Бесплатная первичная консультация без обязательств.',
        ctaButton: 'Заказать проект',
        popular: 'Популярный',
        oneTime: 'единоразово',
        sendRequest: 'Отправить запрос',
        learnMore: 'Узнать больше',
      },
    },
  },
  de: {
    meta: {
      title: 'Webdesign Deutschland · Österreichische Qualität | GoldenWing',
      description: 'Webdesign für deutsche Unternehmen. Wiener Kreativagentur mit DACH-Expertise. Moderne Websites für Startups, KMU & Konzerne.',
      keywords: ['webdesign deutschland', 'webagentur deutschland', 'website erstellen deutschland'],
    },
    content: {
      hero: {
        badge: 'Webdesign Agentur für Deutschland',
        title: 'Webdesign Deutschland',
        description: 'Österreichische Kreativität trifft deutschen Markt. Wir erstellen moderne, performante Websites für Unternehmen in ganz Deutschland – von Startups bis Konzerne.',
        ctaPrimary: 'Kostenloses Erstgespräch',
        ctaSecondary: 'Preise ansehen',
      },
      trustSignals: [
        { icon: 'award', text: '120+ DACH-Projekte' },
        { icon: 'star', text: '4.9/5 Bewertung' },
        { icon: 'clock', text: 'Seit 2013' },
      ],
      benefits: [
        { icon: 'zap', title: 'DACH-Expertise', description: 'Wir verstehen den deutschen Markt und seine Anforderungen' },
        { icon: 'shield', title: 'DSGVO-konform', description: 'Alle Websites entsprechen deutschen Datenschutzstandards' },
        { icon: 'users', title: 'Deutsche Keywords', description: 'SEO-Optimierung speziell für Google.de' },
        { icon: 'star', title: 'Gleiche Zeitzone', description: 'Schnelle Kommunikation ohne Zeitverschiebung' },
      ],
      packages: [
        { name: 'Starter', price: '3.000', description: 'Perfekt für kleine Unternehmen', popular: false, features: ['Bis zu 5 Seiten', 'Responsive Design', 'Kontaktformular', 'SEO Grundoptimierung', 'SSL-Zertifikat', '1 Jahr Hosting inkl.'] },
        { name: 'Business', price: '6.000', description: 'Für wachsende Unternehmen', popular: true, features: ['Bis zu 15 Seiten', 'CMS zur Selbstbearbeitung', 'Blog-Funktion', 'Erweiterte SEO', 'Google Analytics Setup', 'Newsletter-Integration', 'Social Media Integration', '2 Jahre Support inkl.'] },
        { name: 'Enterprise', price: '12.000+', description: 'Maßgeschneiderte Lösungen', popular: false, features: ['Unbegrenzte Seiten', 'Individuelle Entwicklung', 'E-Commerce Integration', 'Multi-Language Support', 'API-Integrationen', 'Performance Optimierung', 'Dedizierter Projektmanager', 'Premium Support'] },
      ],
      process: [
        { step: '01', title: 'Erstgespräch', description: 'Kostenlose Beratung per Video-Call zu Ihren Zielen.' },
        { step: '02', title: 'Konzept & Design', description: 'Wireframes und Design-Entwürfe nach Ihren Wünschen.' },
        { step: '03', title: 'Entwicklung', description: 'Professionelle Umsetzung mit modernsten Technologien.' },
        { step: '04', title: 'Testing & Launch', description: 'Gründliche Tests und Go-Live Ihrer neuen Website.' },
        { step: '05', title: 'Support', description: 'Laufende Betreuung und Optimierung nach dem Launch.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
      faqs: [
        { question: 'Warum eine österreichische Agentur für mein deutsches Unternehmen?', answer: 'Wir kombinieren österreichische Kreativität mit Verständnis für den deutschen Markt. Gleiche Sprache, gleiche Zeitzone, aber oft frischere Perspektiven und wettbewerbsfähige Preise.' },
        { question: 'Habt ihr Erfahrung mit dem deutschen Markt?', answer: 'Ja, wir betreuen bereits mehrere Kunden in Deutschland, von München bis Hamburg. Der DACH-Raum ist unser Kernmarkt.' },
        { question: 'Wie funktioniert die Kommunikation über die Landesgrenzen?', answer: 'Dank digitaler Tools (Video-Calls, Projektmanagement, Cloud-Speicher) arbeiten wir genauso effizient mit deutschen Kunden wie mit lokalen.' },
        { question: 'Sind eure Websites für den deutschen Markt optimiert?', answer: 'Absolut. Wir optimieren für deutsche Keywords, deutsche Rechtschreibung und die spezifischen Anforderungen von Google.de.' },
        { question: 'Was kostet Webdesign für deutsche Unternehmen?', answer: 'Unsere Preise für deutsche Kunden sind identisch mit unseren österreichischen Tarifen. Business-Websites starten bei 3.000€, komplexe Projekte bei 8.000€+.' },
      ],
      relatedServices: [
        { title: 'Webdesign München', description: 'Speziell für bayerische Unternehmen.', href: '/webdesign-muenchen' as StaticAppPathname },
        { title: 'Webdesign Berlin', description: 'Websites für Startups und Tech-Unternehmen.', href: '/webdesign-berlin' as StaticAppPathname },
        { title: 'SEO Deutschland', description: 'Suchmaschinenoptimierung für Google.de.', href: '/leistungen/seo-content' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Unsere Pakete',
        pricingDescription: 'Transparente Preise für Webdesign in Deutschland. Alle Pakete inklusive Hosting und Support.',
        processTitle: 'Unser Prozess',
        processSubtitle: 'Von der ersten Idee bis zum fertigen Projekt – so arbeiten wir mit unseren deutschen Kunden.',
        technologiesTitle: 'Technologien',
        technologiesDescription: 'Wir setzen auf bewährte und moderne Technologien für beste Ergebnisse.',
        faqTitle: 'Häufige Fragen zu Webdesign Deutschland',
        faqSubtitle: 'Antworten auf häufig gestellte Fragen.',
        relatedServicesTitle: 'Weitere Regionen',
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
      title: 'Web Design Germany · Austrian Quality Craftsmanship | GoldenWing',
      description: 'Web design for German businesses. Vienna-based creative agency with DACH expertise. Modern websites for startups, SMEs & enterprises.',
      keywords: ['web design germany', 'web agency germany', 'german web design'],
    },
    content: {
      hero: {
        badge: 'Web Design Agency for Germany',
        title: 'Web Design Germany',
        description: 'Austrian creativity meets the German market. We create modern, high-performance websites for companies across Germany – from startups to enterprises.',
        ctaPrimary: 'Free Consultation',
        ctaSecondary: 'View Pricing',
      },
      trustSignals: [
        { icon: 'award', text: '120+ DACH Projects' },
        { icon: 'star', text: '4.9/5 Rating' },
        { icon: 'clock', text: 'Since 2013' },
      ],
      benefits: [
        { icon: 'zap', title: 'DACH Expertise', description: 'We understand the German market and its requirements' },
        { icon: 'shield', title: 'GDPR Compliant', description: 'All websites meet German data protection standards' },
        { icon: 'users', title: 'German Keywords', description: 'SEO optimization specifically for Google.de' },
        { icon: 'star', title: 'Same Timezone', description: 'Fast communication without time differences' },
      ],
      packages: [
        { name: 'Starter', price: '3,000', description: 'Perfect for small businesses', popular: false, features: ['Up to 5 pages', 'Responsive design', 'Contact form', 'Basic SEO optimization', 'SSL certificate', '1 year hosting incl.'] },
        { name: 'Business', price: '6,000', description: 'For growing companies', popular: true, features: ['Up to 15 pages', 'CMS for self-editing', 'Blog function', 'Advanced SEO', 'Google Analytics setup', 'Newsletter integration', 'Social media integration', '2 years support incl.'] },
        { name: 'Enterprise', price: '12,000+', description: 'Tailored solutions', popular: false, features: ['Unlimited pages', 'Custom development', 'E-commerce integration', 'Multi-language support', 'API integrations', 'Performance optimization', 'Dedicated project manager', 'Premium support'] },
      ],
      process: [
        { step: '01', title: 'Initial Call', description: 'Free consultation via video call about your goals.' },
        { step: '02', title: 'Concept & Design', description: 'Wireframes and design drafts according to your wishes.' },
        { step: '03', title: 'Development', description: 'Professional implementation with the latest technologies.' },
        { step: '04', title: 'Testing & Launch', description: 'Thorough testing and go-live of your new website.' },
        { step: '05', title: 'Support', description: 'Ongoing support and optimization after launch.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
      faqs: [
        { question: 'Why choose an Austrian agency for my German business?', answer: 'We combine Austrian creativity with an understanding of the German market. Same language, same timezone, but often fresher perspectives and competitive prices.' },
        { question: 'Do you have experience with the German market?', answer: 'Yes, we already serve several clients in Germany, from Munich to Hamburg. The DACH region is our core market.' },
        { question: 'How does cross-border communication work?', answer: 'Thanks to digital tools (video calls, project management, cloud storage), we work just as efficiently with German clients as with local ones.' },
        { question: 'Are your websites optimized for the German market?', answer: 'Absolutely. We optimize for German keywords, German spelling, and the specific requirements of Google.de.' },
        { question: 'What does web design cost for German companies?', answer: 'Our prices for German clients are identical to our Austrian rates. Business websites start at €3,000, complex projects at €8,000+.' },
      ],
      relatedServices: [
        { title: 'Web Design Munich', description: 'Specifically for Bavarian companies.', href: '/webdesign-muenchen' as StaticAppPathname },
        { title: 'Web Design Berlin', description: 'Websites for startups and tech companies.', href: '/webdesign-berlin' as StaticAppPathname },
        { title: 'SEO Germany', description: 'Search engine optimization for Google.de.', href: '/leistungen/seo-content' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Our Packages',
        pricingDescription: 'Transparent pricing for web design in Germany. All packages include hosting and support.',
        processTitle: 'Our Process',
        processSubtitle: 'From the first idea to the finished project – this is how we work with our German clients.',
        technologiesTitle: 'Technologies',
        technologiesDescription: 'We rely on proven and modern technologies for best results.',
        faqTitle: 'Frequently Asked Questions about Web Design Germany',
        faqSubtitle: 'Answers to frequently asked questions.',
        relatedServicesTitle: 'More Regions',
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

export default async function WebdesignDeutschlandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const { content } = pageContent[locale] ?? pageContent['en']

  const seo: LandingPageSEO = {
    serviceName: { de: 'Webdesign Deutschland', en: 'Web Design Germany', ru: 'Веб-дизайн Германия' }[locale] ?? 'Web Design Germany',
    cityName: { de: 'Deutschland', en: 'Germany', ru: 'Германия' }[locale] ?? 'Germany',
    url: `/webdesign-${CITY_SLUG}`,
    breadcrumbs: [
      { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] ?? 'Home', url: 'https://goldenwing.at' },
      { name: { de: 'Webdesign Deutschland', en: 'Web Design Germany', ru: 'Веб-дизайн Германия' }[locale] ?? 'Web Design Germany', url: `https://goldenwing.at${locale === 'en' ? '/en' : locale === 'ru' ? '/ru' : ''}/webdesign-${CITY_SLUG}` },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
