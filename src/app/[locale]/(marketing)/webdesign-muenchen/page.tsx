import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { LandingPageTemplate, LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const CITY_SLUG = 'muenchen'

type SupportedLocale = 'de' | 'en' | 'ru'

// City-specific content (unique for Munich - Premium/Bavaria focus)
const pageContent: Record<SupportedLocale, { meta: { title: string; description: string; keywords: string[] }; content: LandingPageContent }> = {
  de: {
    meta: {
      title: 'Webdesign München · Premium Websites für Bayern | GoldenWing',
      description: 'Webdesign-Agentur für München und Bayern. Wir erstellen hochwertige Websites für Münchner Unternehmen. Von der Konzeption bis zum Launch.',
      keywords: ['webdesign münchen', 'webagentur münchen', 'website erstellen münchen', 'webdesigner münchen'],
    },
    content: {
      hero: {
        badge: 'Webdesign Agentur für München',
        title: 'Webdesign München',
        description: 'Premium-Websites für Münchner Unternehmen. Wir kombinieren Wiener Kreativität mit Verständnis für den bayerischen Markt – für Websites, die überzeugen.',
        ctaPrimary: 'Kostenloses Erstgespräch',
        ctaSecondary: 'Preise ansehen',
      },
      trustSignals: [
        { icon: 'award', text: 'Bayern-Erfahrung' },
        { icon: 'star', text: '4.9/5 Bewertung' },
        { icon: 'clock', text: 'Seit 2013' },
      ],
      benefits: [
        { icon: 'zap', title: 'Kulturelle Nähe', description: 'Wir verstehen den süddeutschen Markt und bayerische Unternehmen' },
        { icon: 'shield', title: 'Premium-Qualität', description: 'Hochwertige Websites für den anspruchsvollen Münchner Markt' },
        { icon: 'users', title: 'Persönliche Betreuung', description: 'Vor-Ort-Meetings möglich – nur 4 Stunden mit dem Zug' },
        { icon: 'star', title: 'Wettbewerbsfähig', description: 'Wiener Qualität zu fairen Preisen' },
      ],
      packages: [
        { name: 'Starter', price: '3.500', description: 'Perfekt für kleine Unternehmen', popular: false, features: ['Bis zu 5 Seiten', 'Responsive Design', 'Kontaktformular', 'SEO Grundoptimierung', 'SSL-Zertifikat', '1 Jahr Hosting inkl.'] },
        { name: 'Business', price: '7.000', description: 'Für den Mittelstand', popular: true, features: ['Bis zu 15 Seiten', 'CMS zur Selbstbearbeitung', 'Blog-Funktion', 'Erweiterte SEO für Bayern', 'Google Analytics Setup', 'Newsletter-Integration', 'Social Media Integration', '2 Jahre Support inkl.'] },
        { name: 'Enterprise', price: '15.000+', description: 'Für Premium-Ansprüche', popular: false, features: ['Unbegrenzte Seiten', 'Individuelle Entwicklung', 'E-Commerce Integration', 'Multi-Language Support', 'API-Integrationen', 'Performance Optimierung', 'Dedizierter Projektmanager', 'Premium Support'] },
      ],
      process: [
        { step: '01', title: 'Erstgespräch', description: 'Kostenlose Beratung per Video-Call oder vor Ort in München.' },
        { step: '02', title: 'Konzept & Design', description: 'Wireframes und Design-Entwürfe nach Ihren Wünschen.' },
        { step: '03', title: 'Entwicklung', description: 'Professionelle Umsetzung mit modernsten Technologien.' },
        { step: '04', title: 'Testing & Launch', description: 'Gründliche Tests und Go-Live Ihrer neuen Website.' },
        { step: '05', title: 'Support', description: 'Laufende Betreuung und Optimierung nach dem Launch.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
      faqs: [
        { question: 'Warum sollte ich eine Wiener Agentur für mein Münchner Unternehmen wählen?', answer: 'Wir kombinieren österreichische Kreativität mit Verständnis für den bayerischen Markt. Viele unserer Kunden schätzen den frischen Blick von außen, gepaart mit kultureller Nähe und gleicher Sprache.' },
        { question: 'Habt ihr bereits Erfahrung mit Münchner Unternehmen?', answer: 'Ja, wir haben bereits mehrere Projekte für Kunden aus München und dem Umland realisiert, darunter Unternehmen aus den Bereichen Technologie, Beratung und Einzelhandel.' },
        { question: 'Wie funktionieren Meetings mit einem Team in Wien?', answer: 'Wir arbeiten primär digital mit Video-Calls und Online-Präsentationen. Bei Bedarf kommen wir auch gerne persönlich nach München – die Zugfahrt dauert nur knapp 4 Stunden.' },
        { question: 'Versteht ihr die Anforderungen des bayerischen Marktes?', answer: 'Definitiv. Der süddeutsche Markt ist uns durch unsere Nähe bestens vertraut. Wir verstehen die Mentalität, die Branchenlandschaft und die Erwartungen bayerischer Unternehmen.' },
        { question: 'Was kostet eine Website für ein Münchner Mittelstandsunternehmen?', answer: 'Für mittelständische Unternehmen in München erstellen wir Websites typischerweise im Bereich von 5.000€ bis 20.000€, je nach Umfang und individuellen Anforderungen.' },
      ],
      relatedServices: [
        { title: 'Webdesign Deutschland', description: 'Für Unternehmen in ganz Deutschland.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'Webdesign Berlin', description: 'Websites für Startups und Tech-Unternehmen.', href: '/webdesign-berlin' as StaticAppPathname },
        { title: 'Branding', description: 'Corporate Identity und Logo-Design.', href: '/leistungen/branding' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Unsere Pakete für München',
        pricingDescription: 'Transparente Preise für Webdesign in München. Alle Pakete inklusive Hosting und Support.',
        processTitle: 'Unser Prozess',
        processSubtitle: 'Von der ersten Idee bis zum fertigen Projekt – so arbeiten wir mit Münchner Unternehmen.',
        technologiesTitle: 'Technologien',
        technologiesDescription: 'Wir setzen auf bewährte und moderne Technologien für beste Ergebnisse.',
        faqTitle: 'Häufige Fragen zu Webdesign München',
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
      title: 'Web Design Munich · Premium Websites for Bavaria | GoldenWing',
      description: 'Web design agency for Munich and Bavaria. We create high-quality websites for Munich-based companies. From concept to launch.',
      keywords: ['web design munich', 'web agency munich', 'munich web designer'],
    },
    content: {
      hero: {
        badge: 'Web Design Agency for Munich',
        title: 'Web Design Munich',
        description: 'Premium websites for Munich businesses. We combine Viennese creativity with understanding of the Bavarian market – for websites that convince.',
        ctaPrimary: 'Free Consultation',
        ctaSecondary: 'View Pricing',
      },
      trustSignals: [
        { icon: 'award', text: 'Bavaria Experience' },
        { icon: 'star', text: '4.9/5 Rating' },
        { icon: 'clock', text: 'Since 2013' },
      ],
      benefits: [
        { icon: 'zap', title: 'Cultural Proximity', description: 'We understand the Southern German market and Bavarian businesses' },
        { icon: 'shield', title: 'Premium Quality', description: 'High-quality websites for the demanding Munich market' },
        { icon: 'users', title: 'Personal Service', description: 'On-site meetings possible – just 4 hours by train' },
        { icon: 'star', title: 'Competitive', description: 'Vienna quality at fair prices' },
      ],
      packages: [
        { name: 'Starter', price: '3,500', description: 'Perfect for small businesses', popular: false, features: ['Up to 5 pages', 'Responsive design', 'Contact form', 'Basic SEO optimization', 'SSL certificate', '1 year hosting incl.'] },
        { name: 'Business', price: '7,000', description: 'For mid-sized companies', popular: true, features: ['Up to 15 pages', 'CMS for self-editing', 'Blog function', 'Advanced SEO for Bavaria', 'Google Analytics setup', 'Newsletter integration', 'Social media integration', '2 years support incl.'] },
        { name: 'Enterprise', price: '15,000+', description: 'For premium requirements', popular: false, features: ['Unlimited pages', 'Custom development', 'E-commerce integration', 'Multi-language support', 'API integrations', 'Performance optimization', 'Dedicated project manager', 'Premium support'] },
      ],
      process: [
        { step: '01', title: 'Initial Call', description: 'Free consultation via video call or on-site in Munich.' },
        { step: '02', title: 'Concept & Design', description: 'Wireframes and design drafts according to your wishes.' },
        { step: '03', title: 'Development', description: 'Professional implementation with the latest technologies.' },
        { step: '04', title: 'Testing & Launch', description: 'Thorough testing and go-live of your new website.' },
        { step: '05', title: 'Support', description: 'Ongoing support and optimization after launch.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
      faqs: [
        { question: 'Why choose a Vienna-based agency for my Munich business?', answer: 'We combine Austrian creativity with an understanding of the Bavarian market. Many clients appreciate our fresh perspective combined with cultural proximity and shared language.' },
        { question: 'Do you have experience with Munich-based companies?', answer: "Yes, we've completed several projects for clients in Munich and surrounding areas, including technology, consulting, and retail businesses." },
        { question: 'How do meetings work with a Vienna-based team?', answer: "We work primarily digitally with video calls and online presentations. If needed, we're happy to visit Munich in person – it's just a 4-hour train ride." },
        { question: 'Do you understand Bavarian market requirements?', answer: 'Definitely. The southern German market is very familiar to us due to our proximity. We understand the mentality, industry landscape, and expectations of Bavarian businesses.' },
        { question: 'What does a website cost for a Munich-based SME?', answer: 'For medium-sized companies in Munich, we typically create websites in the range of €5,000 to €20,000, depending on scope and individual requirements.' },
      ],
      relatedServices: [
        { title: 'Web Design Germany', description: 'For companies across Germany.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'Web Design Berlin', description: 'Websites for startups and tech companies.', href: '/webdesign-berlin' as StaticAppPathname },
        { title: 'Branding', description: 'Corporate identity and logo design.', href: '/leistungen/branding' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Our Munich Packages',
        pricingDescription: 'Transparent pricing for web design in Munich. All packages include hosting and support.',
        processTitle: 'Our Process',
        processSubtitle: 'From the first idea to the finished project – this is how we work with Munich companies.',
        technologiesTitle: 'Technologies',
        technologiesDescription: 'We rely on proven and modern technologies for best results.',
        faqTitle: 'Frequently Asked Questions about Web Design Munich',
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
  ru: {
    meta: {
      title: 'Веб-дизайн Мюнхен · Премиум сайты для Баварии | GoldenWing',
      description: 'Агентство веб-дизайна для Мюнхена и Баварии. Мы создаем качественные сайты для мюнхенских компаний. От концепции до запуска.',
      keywords: ['веб-дизайн мюнхен', 'веб-агентство мюнхен', 'создание сайта мюнхен', 'веб-дизайнер мюнхен'],
    },
    content: {
      hero: {
        badge: 'Агентство веб-дизайна для Мюнхена',
        title: 'Веб-дизайн Мюнхен',
        description: 'Премиум-сайты для мюнхенских компаний. Мы сочетаем венскую креативность с пониманием баварского рынка – для сайтов, которые убеждают.',
        ctaPrimary: 'Бесплатная консультация',
        ctaSecondary: 'Посмотреть цены',
      },
      trustSignals: [
        { icon: 'award', text: 'Опыт в Баварии' },
        { icon: 'star', text: 'Рейтинг 4.9/5' },
        { icon: 'clock', text: 'С 2013 года' },
      ],
      benefits: [
        { icon: 'zap', title: 'Культурная близость', description: 'Мы понимаем южногерманский рынок и баварские компании' },
        { icon: 'shield', title: 'Премиум-качество', description: 'Качественные сайты для требовательного мюнхенского рынка' },
        { icon: 'users', title: 'Персональное обслуживание', description: 'Возможны личные встречи – всего 4 часа на поезде' },
        { icon: 'star', title: 'Конкурентоспособность', description: 'Венское качество по справедливым ценам' },
      ],
      packages: [
        { name: 'Starter', price: '3 500', description: 'Идеально для малого бизнеса', popular: false, features: ['До 5 страниц', 'Адаптивный дизайн', 'Контактная форма', 'Базовая SEO-оптимизация', 'SSL-сертификат', '1 год хостинга вкл.'] },
        { name: 'Business', price: '7 000', description: 'Для среднего бизнеса', popular: true, features: ['До 15 страниц', 'CMS для самостоятельного редактирования', 'Функция блога', 'Расширенная SEO для Баварии', 'Настройка Google Analytics', 'Интеграция рассылки', 'Интеграция соцсетей', '2 года поддержки вкл.'] },
        { name: 'Enterprise', price: '15 000+', description: 'Для премиум-требований', popular: false, features: ['Неограниченное количество страниц', 'Индивидуальная разработка', 'Интеграция e-commerce', 'Мультиязычная поддержка', 'Интеграции API', 'Оптимизация производительности', 'Выделенный менеджер проекта', 'Премиум-поддержка'] },
      ],
      process: [
        { step: '01', title: 'Первичная консультация', description: 'Бесплатная консультация по видеозвонку или лично в Мюнхене.' },
        { step: '02', title: 'Концепция и дизайн', description: 'Прототипы и дизайн-макеты по вашим пожеланиям.' },
        { step: '03', title: 'Разработка', description: 'Профессиональная реализация с использованием новейших технологий.' },
        { step: '04', title: 'Тестирование и запуск', description: 'Тщательное тестирование и запуск вашего нового сайта.' },
        { step: '05', title: 'Поддержка', description: 'Постоянная поддержка и оптимизация после запуска.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WordPress', 'Webflow', 'Shopify', 'Node.js'],
      faqs: [
        { question: 'Почему стоит выбрать венское агентство для мюнхенского бизнеса?', answer: 'Мы сочетаем австрийскую креативность с пониманием баварского рынка. Многие клиенты ценят свежий взгляд со стороны в сочетании с культурной близостью и общим языком.' },
        { question: 'Есть ли у вас опыт работы с мюнхенскими компаниями?', answer: 'Да, мы реализовали несколько проектов для клиентов из Мюнхена и окрестностей, включая компании из сфер технологий, консалтинга и розничной торговли.' },
        { question: 'Как проходят встречи с командой из Вены?', answer: 'Мы работаем преимущественно дистанционно через видеозвонки и онлайн-презентации. При необходимости мы с удовольствием приедем в Мюнхен лично – это всего 4 часа на поезде.' },
        { question: 'Понимаете ли вы требования баварского рынка?', answer: 'Определенно. Южногерманский рынок нам хорошо знаком благодаря близости. Мы понимаем менталитет, отраслевой ландшафт и ожидания баварских компаний.' },
        { question: 'Сколько стоит сайт для мюнхенской компании среднего бизнеса?', answer: 'Для средних компаний в Мюнхене мы обычно создаем сайты в диапазоне от 5 000 до 20 000 евро, в зависимости от объема и индивидуальных требований.' },
      ],
      relatedServices: [
        { title: 'Веб-дизайн Германия', description: 'Для компаний по всей Германии.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'Веб-дизайн Берлин', description: 'Сайты для стартапов и tech-компаний.', href: '/webdesign-berlin' as StaticAppPathname },
        { title: 'Брендинг', description: 'Корпоративная идентичность и дизайн логотипа.', href: '/leistungen/branding' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Наши пакеты для Мюнхена',
        pricingDescription: 'Прозрачные цены на веб-дизайн в Мюнхене. Все пакеты включают хостинг и поддержку.',
        processTitle: 'Наш процесс',
        processSubtitle: 'От первой идеи до готового проекта – так мы работаем с мюнхенскими компаниями.',
        technologiesTitle: 'Технологии',
        technologiesDescription: 'Мы используем проверенные и современные технологии для лучших результатов.',
        faqTitle: 'Часто задаваемые вопросы о веб-дизайне Мюнхен',
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
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const { meta } = pageContent[locale as 'de' | 'en' | 'ru'] ?? pageContent['en']
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

export default async function WebdesignMuenchenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const { content, meta: _meta } = pageContent[locale as 'de' | 'en' | 'ru'] ?? pageContent['en']

  const seo: LandingPageSEO = {
    serviceName: { de: 'Webdesign München', en: 'Web Design Munich', ru: 'Веб-дизайн Мюнхен' }[locale] ?? 'Web Design Munich',
    cityName: { de: 'München', en: 'Munich', ru: 'Мюнхен' }[locale] ?? 'Munich',
    url: `/webdesign-${CITY_SLUG}`,
    breadcrumbs: [
      { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] ?? 'Home', url: 'https://goldenwing.at' },
      { name: { de: 'Webdesign München', en: 'Web Design Munich', ru: 'Веб-дизайн Мюнхен' }[locale] ?? 'Web Design Munich', url: `https://goldenwing.at${locale === 'en' ? '/en' : locale === 'ru' ? '/ru' : ''}/webdesign-${CITY_SLUG}` },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
