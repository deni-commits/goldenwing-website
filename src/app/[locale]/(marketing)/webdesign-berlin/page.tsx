import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { LandingPageTemplate, LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const CITY_SLUG = 'berlin'

type SupportedLocale = 'de' | 'en' | 'ru'

// City-specific content (unique for Berlin - Startup focus)
const pageContent: Record<SupportedLocale, { meta: { title: string; description: string; keywords: string[] }; content: LandingPageContent }> = {
  de: {
    meta: {
      title: 'Webdesign Berlin · Kreative Websites für Startups | GoldenWing',
      description: 'Webdesign für Berliner Startups und Tech-Unternehmen. Schnelle MVPs, skalierbare Plattformen & überzeugende Landingpages.',
      keywords: ['webdesign berlin', 'webagentur berlin', 'startup website berlin', 'webdesigner berlin'],
    },
    content: {
      hero: {
        badge: 'Webdesign Agentur für Berlin',
        title: 'Webdesign Berlin',
        description: 'Websites für die Berliner Startup-Szene und Tech-Unternehmen. Wir bauen schnelle MVPs, skalierbare Plattformen und überzeugende Landingpages, die Investoren begeistern.',
        ctaPrimary: 'Kostenloses Erstgespräch',
        ctaSecondary: 'Preise ansehen',
      },
      trustSignals: [
        { icon: 'award', text: 'Startup-Erfahrung' },
        { icon: 'star', text: '4.9/5 Bewertung' },
        { icon: 'clock', text: 'Schnelle MVPs' },
      ],
      benefits: [
        { icon: 'zap', title: 'Schnelle MVPs', description: 'In 2-3 Wochen zur vorzeigbaren Website für Ihren Pitch' },
        { icon: 'shield', title: 'Skalierbar', description: 'Architekturen, die mit Ihrem Startup mitwachsen' },
        { icon: 'users', title: 'Investor-Ready', description: 'Designs, die Investoren und Kunden überzeugen' },
        { icon: 'star', title: 'Tech-Stack', description: 'Moderne Technologien für beste Performance' },
      ],
      packages: [
        { name: 'MVP', price: '2.500', description: 'Schnell und fokussiert', popular: false, features: ['Landingpage', 'Responsive Design', 'Waitlist-Funktion', 'Analytics Setup', 'SSL-Zertifikat', '2-3 Wochen Lieferzeit'] },
        { name: 'Startup', price: '5.000', description: 'Für die nächste Funding-Runde', popular: true, features: ['Bis zu 10 Seiten', 'CMS für Blog/News', 'Conversion-optimiert', 'SEO-Grundlagen', 'Social Media Integration', 'A/B Testing Ready', 'Google Analytics', '4-6 Wochen Lieferzeit'] },
        { name: 'Scale-Up', price: '10.000+', description: 'Für wachsende Unternehmen', popular: false, features: ['Unbegrenzte Seiten', 'Custom Web-App', 'API-Integrationen', 'Multi-Language', 'Performance Optimierung', 'Dediziertes Team', 'Premium Support', 'Ongoing Development'] },
      ],
      process: [
        { step: '01', title: 'Quick Call', description: 'Kurzes Gespräch über Ihre Ziele und Timeline.' },
        { step: '02', title: 'Design Sprint', description: 'Schnelle Iteration zu einem überzeugenden Design.' },
        { step: '03', title: 'Entwicklung', description: 'Agile Entwicklung mit regelmäßigen Updates.' },
        { step: '04', title: 'Launch', description: 'Schnelles Deployment und Optimierung.' },
        { step: '05', title: 'Iteration', description: 'Kontinuierliche Verbesserung basierend auf Daten.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Supabase', 'Stripe', 'Node.js'],
      faqs: [
        { question: 'Arbeitet ihr auch mit Berliner Startups zusammen?', answer: 'Absolut! Wir lieben die Dynamik der Berliner Startup-Szene. Wir erstellen schnelle MVPs für Pitches, skalierbare Plattformen und überzeugende Landingpages für Investoren.' },
        { question: 'Könnt ihr schnelle Turnaround-Zeiten für Tech-Unternehmen einhalten?', answer: 'Ja, für Tech-Startups bieten wir agile Projektmodelle mit schnellen Iterationen. Eine MVP-Website kann in 2-3 Wochen stehen.' },
        { question: 'Versteht ihr die Bedürfnisse von VC-finanzierten Unternehmen?', answer: 'Definitiv. Wir wissen, dass Startups schnelle Ergebnisse brauchen, die Investoren überzeugen. Unsere Designs sind auf Conversion und professionelles Auftreten optimiert.' },
        { question: 'Bietet ihr auch Pitch-Deck-Design an?', answer: 'Ja, neben Websites erstellen wir auch Pitch-Decks und Investoren-Präsentationen, die zu Ihrem Webauftritt passen.' },
        { question: 'Habt ihr Erfahrung mit SaaS-Unternehmen?', answer: 'Ja, wir haben bereits mehrere SaaS-Websites und Web-Applikationen entwickelt, mit Fokus auf klare UX, Conversion-Optimierung und Skalierbarkeit.' },
      ],
      relatedServices: [
        { title: 'Webdesign Deutschland', description: 'Für Unternehmen in ganz Deutschland.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'Webdesign München', description: 'Premium-Websites für Bayern.', href: '/webdesign-muenchen' as StaticAppPathname },
        { title: 'Software-Entwicklung', description: 'Custom Web-Apps und Plattformen.', href: '/leistungen/web-app-entwicklung' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Pakete für Berliner Startups',
        pricingDescription: 'Faire Preise für schnelle Ergebnisse. Fokussiert auf das Wesentliche.',
        processTitle: 'Agiler Prozess',
        processSubtitle: 'Schnell, iterativ und fokussiert auf Ergebnisse – wie Startups arbeiten.',
        technologiesTitle: 'Moderner Tech-Stack',
        technologiesDescription: 'Die Technologien, die auch die erfolgreichsten Startups nutzen.',
        faqTitle: 'Häufige Fragen zu Webdesign Berlin',
        faqSubtitle: 'Antworten auf häufig gestellte Fragen.',
        relatedServicesTitle: 'Weitere Regionen',
        ctaTitle: 'Bereit für Ihren nächsten Pitch?',
        ctaDescription: 'Lassen Sie uns eine Website bauen, die Investoren überzeugt.',
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
      title: 'Web Design Berlin · Creative Websites for Startups | GoldenWing',
      description: 'Web design for Berlin startups and tech companies. Fast MVPs, scalable platforms & compelling landing pages that convert.',
      keywords: ['web design berlin', 'web agency berlin', 'startup website berlin'],
    },
    content: {
      hero: {
        badge: 'Web Design Agency for Berlin',
        title: 'Web Design Berlin',
        description: 'Websites for the Berlin startup scene and tech companies. We build fast MVPs, scalable platforms, and compelling landing pages that impress investors.',
        ctaPrimary: 'Free Consultation',
        ctaSecondary: 'View Pricing',
      },
      trustSignals: [
        { icon: 'award', text: 'Startup Experience' },
        { icon: 'star', text: '4.9/5 Rating' },
        { icon: 'clock', text: 'Fast MVPs' },
      ],
      benefits: [
        { icon: 'zap', title: 'Fast MVPs', description: 'Presentable website for your pitch in 2-3 weeks' },
        { icon: 'shield', title: 'Scalable', description: 'Architectures that grow with your startup' },
        { icon: 'users', title: 'Investor-Ready', description: 'Designs that convince investors and customers' },
        { icon: 'star', title: 'Tech Stack', description: 'Modern technologies for best performance' },
      ],
      packages: [
        { name: 'MVP', price: '2,500', description: 'Fast and focused', popular: false, features: ['Landing page', 'Responsive design', 'Waitlist function', 'Analytics setup', 'SSL certificate', '2-3 weeks delivery'] },
        { name: 'Startup', price: '5,000', description: 'For your next funding round', popular: true, features: ['Up to 10 pages', 'CMS for blog/news', 'Conversion-optimized', 'SEO basics', 'Social media integration', 'A/B testing ready', 'Google Analytics', '4-6 weeks delivery'] },
        { name: 'Scale-Up', price: '10,000+', description: 'For growing companies', popular: false, features: ['Unlimited pages', 'Custom web app', 'API integrations', 'Multi-language', 'Performance optimization', 'Dedicated team', 'Premium support', 'Ongoing development'] },
      ],
      process: [
        { step: '01', title: 'Quick Call', description: 'Brief discussion about your goals and timeline.' },
        { step: '02', title: 'Design Sprint', description: 'Fast iteration to a compelling design.' },
        { step: '03', title: 'Development', description: 'Agile development with regular updates.' },
        { step: '04', title: 'Launch', description: 'Quick deployment and optimization.' },
        { step: '05', title: 'Iteration', description: 'Continuous improvement based on data.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Supabase', 'Stripe', 'Node.js'],
      faqs: [
        { question: 'Do you work with Berlin startups?', answer: "Absolutely! We love the dynamics of Berlin's startup scene. We create fast MVPs for pitches, scalable platforms, and compelling investor-ready landing pages." },
        { question: 'Can you handle fast turnaround times for tech companies?', answer: 'Yes, for tech startups we offer agile project models with quick iterations. An MVP website can be ready in 2-3 weeks.' },
        { question: 'Do you understand VC-backed company needs?', answer: 'Definitely. We know startups need fast results that convince investors. Our designs are optimized for conversion and professional appearance.' },
        { question: 'Do you also offer pitch deck design?', answer: 'Yes, alongside websites we create pitch decks and investor presentations that match your web presence.' },
        { question: 'Do you have experience with SaaS companies?', answer: "Yes, we've developed several SaaS websites and web applications, focusing on clear UX, conversion optimization, and scalability." },
      ],
      relatedServices: [
        { title: 'Web Design Germany', description: 'For companies across Germany.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'Web Design Munich', description: 'Premium websites for Bavaria.', href: '/webdesign-muenchen' as StaticAppPathname },
        { title: 'Software Development', description: 'Custom web apps and platforms.', href: '/leistungen/web-app-entwicklung' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Packages for Berlin Startups',
        pricingDescription: 'Fair prices for fast results. Focused on what matters.',
        processTitle: 'Agile Process',
        processSubtitle: 'Fast, iterative, and focused on results – the way startups work.',
        technologiesTitle: 'Modern Tech Stack',
        technologiesDescription: 'The technologies that the most successful startups use.',
        faqTitle: 'Frequently Asked Questions about Web Design Berlin',
        faqSubtitle: 'Answers to frequently asked questions.',
        relatedServicesTitle: 'More Regions',
        ctaTitle: 'Ready for Your Next Pitch?',
        ctaDescription: "Let's build a website that convinces investors.",
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
      title: 'Веб-дизайн Берлин · Креативные сайты для стартапов | GoldenWing',
      description: 'Веб-дизайн для берлинских стартапов и технологических компаний. Быстрые MVP, масштабируемые платформы и убедительные лендинги.',
      keywords: ['веб-дизайн берлин', 'веб-агентство берлин', 'сайт для стартапа берлин', 'веб-дизайнер берлин'],
    },
    content: {
      hero: {
        badge: 'Агентство веб-дизайна для Берлина',
        title: 'Веб-дизайн Берлин',
        description: 'Сайты для берлинской стартап-сцены и технологических компаний. Мы создаем быстрые MVP, масштабируемые платформы и убедительные лендинги, которые впечатляют инвесторов.',
        ctaPrimary: 'Бесплатная консультация',
        ctaSecondary: 'Посмотреть цены',
      },
      trustSignals: [
        { icon: 'award', text: 'Опыт со стартапами' },
        { icon: 'star', text: 'Рейтинг 4.9/5' },
        { icon: 'clock', text: 'Быстрые MVP' },
      ],
      benefits: [
        { icon: 'zap', title: 'Быстрые MVP', description: 'Презентабельный сайт для вашего питча за 2-3 недели' },
        { icon: 'shield', title: 'Масштабируемость', description: 'Архитектуры, которые растут вместе с вашим стартапом' },
        { icon: 'users', title: 'Готово для инвесторов', description: 'Дизайны, которые убеждают инвесторов и клиентов' },
        { icon: 'star', title: 'Tech-стек', description: 'Современные технологии для лучшей производительности' },
      ],
      packages: [
        { name: 'MVP', price: '2 500', description: 'Быстро и фокусированно', popular: false, features: ['Лендинг', 'Адаптивный дизайн', 'Функция waitlist', 'Настройка аналитики', 'SSL-сертификат', 'Срок 2-3 недели'] },
        { name: 'Startup', price: '5 000', description: 'Для следующего раунда финансирования', popular: true, features: ['До 10 страниц', 'CMS для блога/новостей', 'Оптимизировано для конверсий', 'Основы SEO', 'Интеграция соцсетей', 'Готово для A/B-тестирования', 'Google Analytics', 'Срок 4-6 недель'] },
        { name: 'Scale-Up', price: '10 000+', description: 'Для растущих компаний', popular: false, features: ['Неограниченное количество страниц', 'Кастомное веб-приложение', 'Интеграции API', 'Мультиязычность', 'Оптимизация производительности', 'Выделенная команда', 'Премиум-поддержка', 'Непрерывная разработка'] },
      ],
      process: [
        { step: '01', title: 'Быстрый звонок', description: 'Краткое обсуждение ваших целей и сроков.' },
        { step: '02', title: 'Дизайн-спринт', description: 'Быстрая итерация до убедительного дизайна.' },
        { step: '03', title: 'Разработка', description: 'Гибкая разработка с регулярными обновлениями.' },
        { step: '04', title: 'Запуск', description: 'Быстрое развертывание и оптимизация.' },
        { step: '05', title: 'Итерация', description: 'Непрерывное улучшение на основе данных.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Supabase', 'Stripe', 'Node.js'],
      faqs: [
        { question: 'Вы работаете с берлинскими стартапами?', answer: 'Безусловно! Мы любим динамику берлинской стартап-сцены. Мы создаем быстрые MVP для питчей, масштабируемые платформы и убедительные лендинги для инвесторов.' },
        { question: 'Можете ли вы обеспечить быстрые сроки для tech-компаний?', answer: 'Да, для tech-стартапов мы предлагаем гибкие модели проектов с быстрыми итерациями. MVP-сайт может быть готов за 2-3 недели.' },
        { question: 'Вы понимаете потребности компаний с венчурным финансированием?', answer: 'Определенно. Мы знаем, что стартапам нужны быстрые результаты, которые убеждают инвесторов. Наши дизайны оптимизированы для конверсий и профессионального вида.' },
        { question: 'Вы также предлагаете дизайн питч-деков?', answer: 'Да, помимо сайтов мы создаем питч-деки и презентации для инвесторов, которые соответствуют вашему веб-присутствию.' },
        { question: 'У вас есть опыт с SaaS-компаниями?', answer: 'Да, мы разработали несколько SaaS-сайтов и веб-приложений, с фокусом на понятный UX, оптимизацию конверсий и масштабируемость.' },
      ],
      relatedServices: [
        { title: 'Веб-дизайн Германия', description: 'Для компаний по всей Германии.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'Веб-дизайн Мюнхен', description: 'Премиум-сайты для Баварии.', href: '/webdesign-muenchen' as StaticAppPathname },
        { title: 'Разработка ПО', description: 'Кастомные веб-приложения и платформы.', href: '/leistungen/web-app-entwicklung' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Пакеты для берлинских стартапов',
        pricingDescription: 'Справедливые цены для быстрых результатов. Фокус на главном.',
        processTitle: 'Гибкий процесс',
        processSubtitle: 'Быстро, итеративно и с фокусом на результат - как работают стартапы.',
        technologiesTitle: 'Современный tech-стек',
        technologiesDescription: 'Технологии, которые используют самые успешные стартапы.',
        faqTitle: 'Часто задаваемые вопросы о веб-дизайне в Берлине',
        faqSubtitle: 'Ответы на часто задаваемые вопросы.',
        relatedServicesTitle: 'Другие регионы',
        ctaTitle: 'Готовы к следующему питчу?',
        ctaDescription: 'Давайте создадим сайт, который убедит инвесторов.',
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

export default async function WebdesignBerlinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const { content, meta: _meta } = pageContent[locale as SupportedLocale] ?? pageContent['en']

  const seo: LandingPageSEO = {
    serviceName: { de: 'Webdesign Berlin', en: 'Web Design Berlin', ru: 'Веб-дизайн Берлин' }[locale] ?? 'Web Design Berlin',
    cityName: { de: 'Berlin', en: 'Berlin', ru: 'Берлин' }[locale] ?? 'Berlin',
    url: `/webdesign-${CITY_SLUG}`,
    breadcrumbs: [
      { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] ?? 'Home', url: 'https://goldenwing.at' },
      { name: { de: 'Webdesign Berlin', en: 'Web Design Berlin', ru: 'Веб-дизайн Берлин' }[locale] ?? 'Web Design Berlin', url: `https://goldenwing.at${locale === 'en' ? '/en' : locale === 'ru' ? '/ru' : ''}/webdesign-${CITY_SLUG}` },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
