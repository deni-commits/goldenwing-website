import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import { LandingPageTemplate, LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const CITY_SLUG = 'frankfurt'

type SupportedLocale = 'de' | 'en' | 'ru'

// City-specific content (unique for Frankfurt - Finance sector focus)
const pageContent: Record<SupportedLocale, { meta: { title: string; description: string; keywords: string[] }; content: LandingPageContent }> = {
  de: {
    meta: {
      title: 'Webdesign Frankfurt · Websites für den Finanzplatz | GoldenWing',
      description: 'Webdesign für Frankfurter Unternehmen. Spezialisiert auf Finanzdienstleister, Beratungen & internationale Konzerne.',
      keywords: ['webdesign frankfurt', 'webagentur frankfurt', 'website erstellen frankfurt'],
    },
    content: {
      hero: {
        badge: 'Webdesign Agentur für Frankfurt',
        title: 'Webdesign Frankfurt',
        description: 'Premium-Websites für Deutschlands Finanzmetropole. Wir verstehen die hohen Ansprüche der Frankfurter Wirtschaft – von Banken über FinTech bis zu internationalen Konzernen.',
        ctaPrimary: 'Kostenloses Erstgespräch',
        ctaSecondary: 'Preise ansehen',
      },
      trustSignals: [
        { icon: 'award', text: 'Finanzsektor-Expertise' },
        { icon: 'star', text: 'Compliance-konform' },
        { icon: 'clock', text: 'Mehrsprachig' },
      ],
      benefits: [
        { icon: 'zap', title: 'Finanzsektor-Erfahrung', description: 'Websites für Banken, Versicherungen und FinTech' },
        { icon: 'shield', title: 'Compliance & Sicherheit', description: 'DSGVO-konform und regulierungsgerecht' },
        { icon: 'users', title: 'International', description: 'Mehrsprachige Websites für globale Zielgruppen' },
        { icon: 'star', title: 'Enterprise-Ready', description: 'Skalierbare Lösungen für große Organisationen' },
      ],
      packages: [
        { name: 'Professional', price: '5.000', description: 'Für lokale Dienstleister', popular: false, features: ['Bis zu 8 Seiten', 'Responsive Design', 'CMS-Integration', 'SEO-Optimierung', 'SSL & DSGVO', 'Kontaktformular'] },
        { name: 'Business', price: '10.000', description: 'Für den Finanzsektor', popular: true, features: ['Bis zu 20 Seiten', 'Mehrsprachig (DE/EN)', 'Compliance-konform', 'Kundenportal-Option', 'Analytics & Reporting', 'API-Integrationen', 'Security-Audit', '2 Jahre Support'] },
        { name: 'Enterprise', price: '20.000+', description: 'Für Konzerne', popular: false, features: ['Unbegrenzte Seiten', 'Alle Sprachen', 'Custom Development', 'Intranet-Lösungen', 'Höchste Sicherheit', 'Dediziertes Team', 'SLA-Garantien', '24/7 Support'] },
      ],
      process: [
        { step: '01', title: 'Anforderungsanalyse', description: 'Tiefgehendes Verständnis Ihrer Branche und Ziele.' },
        { step: '02', title: 'Konzept & UX', description: 'User Experience Design mit Fokus auf Vertrauen.' },
        { step: '03', title: 'Design', description: 'Professionelles Design, das Seriosität ausstrahlt.' },
        { step: '04', title: 'Entwicklung', description: 'Sichere, performante Umsetzung.' },
        { step: '05', title: 'Launch & Support', description: 'Go-Live mit fortlaufender Betreuung.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'WordPress', 'Node.js', 'AWS', 'Azure', 'Vercel'],
      faqs: [
        { question: 'Habt ihr Erfahrung mit Finanzdienstleistern?', answer: 'Ja, wir haben bereits Websites für Finanzberater, Vermögensverwalter und FinTech-Startups erstellt. Wir kennen die Anforderungen an Seriosität, Compliance und Vertrauensaufbau.' },
        { question: 'Versteht ihr die regulatorischen Anforderungen im Finanzsektor?', answer: 'Wir achten auf DSGVO-Konformität und rechtskonforme Gestaltung. Bei spezifischen Regulierungen (BaFin etc.) empfehlen wir die Abstimmung mit Ihrem Compliance-Team.' },
        { question: 'Könnt ihr mehrsprachige Websites für internationale Konzerne erstellen?', answer: 'Absolut! Frankfurt als internationales Finanzzentrum erfordert oft mehrsprachige Auftritte. Wir erstellen Websites in Deutsch, Englisch, Französisch und weiteren Sprachen.' },
        { question: 'Bietet ihr auch Intranet- oder Kundenportal-Entwicklung an?', answer: 'Ja, wir entwickeln geschützte Bereiche, Kundenportale und Intranets mit sicherer Authentifizierung, Dokumentenmanagement und individuellen Dashboards.' },
        { question: 'Wie schnell könnt ihr auf dringende Änderungen reagieren?', answer: 'Für Bestandskunden bieten wir Priority-Support mit Reaktionszeiten unter 24 Stunden für kritische Änderungen. Reguläre Änderungen werden innerhalb von 2-3 Werktagen umgesetzt.' },
      ],
      relatedServices: [
        { title: 'Webdesign Deutschland', description: 'Für Unternehmen bundesweit.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'SEO Deutschland', description: 'Sichtbarkeit auf Google.de.', href: '/seo-agentur-deutschland' as StaticAppPathname },
        { title: 'Branding Deutschland', description: 'Markenentwicklung für den deutschen Markt.', href: '/branding-agentur-deutschland' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Unsere Pakete für Frankfurt',
        pricingDescription: 'Enterprise-Qualität für die Finanzmetropole.',
        processTitle: 'Unser Prozess',
        processSubtitle: 'Strukturiert und professionell – wie die Frankfurter Wirtschaft es erwartet.',
        technologiesTitle: 'Technologien',
        technologiesDescription: 'Enterprise-Technologien für höchste Ansprüche.',
        faqTitle: 'Häufige Fragen zu Webdesign Frankfurt',
        faqSubtitle: 'Antworten auf häufig gestellte Fragen.',
        relatedServicesTitle: 'Weitere Services',
        ctaTitle: 'Bereit für Ihre neue Website?',
        ctaDescription: 'Lassen Sie uns über Ihr Projekt sprechen. Kostenlose Erstberatung per Video-Call.',
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
      title: 'Web Design Frankfurt · Websites for Finance Hub | GoldenWing',
      description: 'Web design for Frankfurt businesses. Specialized in financial services, consultancies & international corporations.',
      keywords: ['web design frankfurt', 'web agency frankfurt', 'website frankfurt'],
    },
    content: {
      hero: {
        badge: 'Web Design Agency for Frankfurt',
        title: 'Web Design Frankfurt',
        description: 'Premium websites for Germany\'s financial metropolis. We understand the high standards of Frankfurt\'s business world – from banks to FinTech to international corporations.',
        ctaPrimary: 'Free Consultation',
        ctaSecondary: 'View Pricing',
      },
      trustSignals: [
        { icon: 'award', text: 'Finance Sector Expertise' },
        { icon: 'star', text: 'Compliance-Ready' },
        { icon: 'clock', text: 'Multilingual' },
      ],
      benefits: [
        { icon: 'zap', title: 'Finance Sector Experience', description: 'Websites for banks, insurance, and FinTech' },
        { icon: 'shield', title: 'Compliance & Security', description: 'GDPR compliant and regulation-ready' },
        { icon: 'users', title: 'International', description: 'Multilingual websites for global audiences' },
        { icon: 'star', title: 'Enterprise-Ready', description: 'Scalable solutions for large organizations' },
      ],
      packages: [
        { name: 'Professional', price: '5,000', description: 'For local service providers', popular: false, features: ['Up to 8 pages', 'Responsive design', 'CMS integration', 'SEO optimization', 'SSL & GDPR', 'Contact form'] },
        { name: 'Business', price: '10,000', description: 'For the finance sector', popular: true, features: ['Up to 20 pages', 'Multilingual (DE/EN)', 'Compliance-ready', 'Customer portal option', 'Analytics & reporting', 'API integrations', 'Security audit', '2 years support'] },
        { name: 'Enterprise', price: '20,000+', description: 'For corporations', popular: false, features: ['Unlimited pages', 'All languages', 'Custom development', 'Intranet solutions', 'Highest security', 'Dedicated team', 'SLA guarantees', '24/7 support'] },
      ],
      process: [
        { step: '01', title: 'Requirements Analysis', description: 'Deep understanding of your industry and goals.' },
        { step: '02', title: 'Concept & UX', description: 'User experience design with focus on trust.' },
        { step: '03', title: 'Design', description: 'Professional design that radiates credibility.' },
        { step: '04', title: 'Development', description: 'Secure, high-performance implementation.' },
        { step: '05', title: 'Launch & Support', description: 'Go-live with ongoing support.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'WordPress', 'Node.js', 'AWS', 'Azure', 'Vercel'],
      faqs: [
        { question: 'Do you have experience with financial services?', answer: 'Yes, we\'ve created websites for financial advisors, asset managers, and FinTech startups. We understand the requirements for professionalism, compliance, and trust-building.' },
        { question: 'Do you understand regulatory requirements in the financial sector?', answer: 'We ensure GDPR compliance and legally compliant design. For specific regulations (BaFin etc.), we recommend coordination with your compliance team.' },
        { question: 'Can you create multilingual websites for international corporations?', answer: 'Absolutely! Frankfurt as an international financial center often requires multilingual presences. We create websites in German, English, French, and other languages.' },
        { question: 'Do you offer intranet or customer portal development?', answer: 'Yes, we develop protected areas, customer portals, and intranets with secure authentication, document management, and custom dashboards.' },
        { question: 'How quickly can you respond to urgent changes?', answer: 'For existing clients, we offer priority support with response times under 24 hours for critical changes. Regular changes are implemented within 2-3 business days.' },
      ],
      relatedServices: [
        { title: 'Web Design Germany', description: 'For businesses nationwide.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'SEO Germany', description: 'Visibility on Google.de.', href: '/seo-agentur-deutschland' as StaticAppPathname },
        { title: 'Branding Germany', description: 'Brand development for the German market.', href: '/branding-agentur-deutschland' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Our Packages for Frankfurt',
        pricingDescription: 'Enterprise quality for the financial metropolis.',
        processTitle: 'Our Process',
        processSubtitle: 'Structured and professional – as Frankfurt\'s business world expects.',
        technologiesTitle: 'Technologies',
        technologiesDescription: 'Enterprise technologies for highest standards.',
        faqTitle: 'Frequently Asked Questions about Web Design Frankfurt',
        faqSubtitle: 'Answers to frequently asked questions.',
        relatedServicesTitle: 'More Services',
        ctaTitle: 'Ready for Your New Website?',
        ctaDescription: 'Let\'s discuss your project. Free initial consultation via video call.',
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
      title: 'Веб-дизайн Франкфурт · Сайты для финансового центра | GoldenWing',
      description: 'Веб-дизайн для компаний Франкфурта. Специализация на финансовых услугах, консалтинге и международных корпорациях.',
      keywords: ['веб-дизайн франкфурт', 'веб-агентство франкфурт', 'создание сайта франкфурт'],
    },
    content: {
      hero: {
        badge: 'Агентство веб-дизайна для Франкфурта',
        title: 'Веб-дизайн Франкфурт',
        description: 'Премиум-сайты для финансовой столицы Германии. Мы понимаем высокие стандарты франкфуртского бизнеса – от банков до FinTech и международных корпораций.',
        ctaPrimary: 'Бесплатная консультация',
        ctaSecondary: 'Смотреть цены',
      },
      trustSignals: [
        { icon: 'award', text: 'Экспертиза в финансовом секторе' },
        { icon: 'star', text: 'Соответствие требованиям' },
        { icon: 'clock', text: 'Мультиязычность' },
      ],
      benefits: [
        { icon: 'zap', title: 'Опыт в финансовом секторе', description: 'Сайты для банков, страховых компаний и FinTech' },
        { icon: 'shield', title: 'Комплаенс и безопасность', description: 'Соответствие GDPR и регуляторным требованиям' },
        { icon: 'users', title: 'Международный охват', description: 'Мультиязычные сайты для глобальной аудитории' },
        { icon: 'star', title: 'Enterprise-уровень', description: 'Масштабируемые решения для крупных организаций' },
      ],
      packages: [
        { name: 'Professional', price: '5 000', description: 'Для местных поставщиков услуг', popular: false, features: ['До 8 страниц', 'Адаптивный дизайн', 'Интеграция CMS', 'SEO-оптимизация', 'SSL и GDPR', 'Контактная форма'] },
        { name: 'Business', price: '10 000', description: 'Для финансового сектора', popular: true, features: ['До 20 страниц', 'Мультиязычность (DE/EN)', 'Соответствие комплаенсу', 'Опция клиентского портала', 'Аналитика и отчетность', 'API-интеграции', 'Аудит безопасности', '2 года поддержки'] },
        { name: 'Enterprise', price: '20 000+', description: 'Для корпораций', popular: false, features: ['Неограниченно страниц', 'Все языки', 'Индивидуальная разработка', 'Интранет-решения', 'Максимальная безопасность', 'Выделенная команда', 'Гарантии SLA', 'Поддержка 24/7'] },
      ],
      process: [
        { step: '01', title: 'Анализ требований', description: 'Глубокое понимание вашей отрасли и целей.' },
        { step: '02', title: 'Концепция и UX', description: 'Дизайн пользовательского опыта с фокусом на доверие.' },
        { step: '03', title: 'Дизайн', description: 'Профессиональный дизайн, излучающий надежность.' },
        { step: '04', title: 'Разработка', description: 'Безопасная, высокопроизводительная реализация.' },
        { step: '05', title: 'Запуск и поддержка', description: 'Запуск с постоянной поддержкой.' },
      ],
      technologies: ['Next.js', 'React', 'TypeScript', 'WordPress', 'Node.js', 'AWS', 'Azure', 'Vercel'],
      faqs: [
        { question: 'Есть ли у вас опыт работы с финансовыми услугами?', answer: 'Да, мы создавали сайты для финансовых консультантов, управляющих активами и FinTech-стартапов. Мы понимаем требования к профессионализму, комплаенсу и построению доверия.' },
        { question: 'Понимаете ли вы регуляторные требования в финансовом секторе?', answer: 'Мы обеспечиваем соответствие GDPR и юридически корректный дизайн. Для специфических регуляций (BaFin и др.) рекомендуем согласование с вашей командой комплаенса.' },
        { question: 'Можете ли вы создать мультиязычные сайты для международных корпораций?', answer: 'Безусловно! Франкфурт как международный финансовый центр часто требует мультиязычного присутствия. Мы создаем сайты на немецком, английском, французском и других языках.' },
        { question: 'Предлагаете ли вы разработку интранета или клиентских порталов?', answer: 'Да, мы разрабатываем защищенные зоны, клиентские порталы и интранеты с безопасной аутентификацией, управлением документами и индивидуальными дашбордами.' },
        { question: 'Как быстро вы можете реагировать на срочные изменения?', answer: 'Для существующих клиентов мы предлагаем приоритетную поддержку с временем реакции менее 24 часов для критических изменений. Обычные изменения выполняются в течение 2-3 рабочих дней.' },
      ],
      relatedServices: [
        { title: 'Веб-дизайн Германия', description: 'Для компаний по всей стране.', href: '/webdesign-deutschland' as StaticAppPathname },
        { title: 'SEO Германия', description: 'Видимость в Google.de.', href: '/seo-agentur-deutschland' as StaticAppPathname },
        { title: 'Брендинг Германия', description: 'Развитие бренда для немецкого рынка.', href: '/branding-agentur-deutschland' as StaticAppPathname },
      ],
      labels: {
        pricingTitle: 'Наши пакеты для Франкфурта',
        pricingDescription: 'Enterprise-качество для финансовой столицы.',
        processTitle: 'Наш процесс',
        processSubtitle: 'Структурированный и профессиональный – как ожидает франкфуртский бизнес.',
        technologiesTitle: 'Технологии',
        technologiesDescription: 'Enterprise-технологии для высочайших стандартов.',
        faqTitle: 'Часто задаваемые вопросы о веб-дизайне Франкфурт',
        faqSubtitle: 'Ответы на часто задаваемые вопросы.',
        relatedServicesTitle: 'Другие услуги',
        ctaTitle: 'Готовы к новому сайту?',
        ctaDescription: 'Давайте обсудим ваш проект. Бесплатная первичная консультация по видеосвязи.',
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

export default async function WebdesignFrankfurtPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const { content, meta: _meta } = pageContent[locale as 'de' | 'en' | 'ru'] ?? pageContent['en']

  const seo: LandingPageSEO = {
    serviceName: { de: 'Webdesign Frankfurt', en: 'Web Design Frankfurt', ru: 'Веб-дизайн Франкфурт' }[locale] || 'Web Design Frankfurt',
    cityName: 'Frankfurt',
    url: `/webdesign-${CITY_SLUG}`,
    breadcrumbs: [
      { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] || 'Home', url: 'https://goldenwing.at' },
      { name: { de: 'Webdesign Frankfurt', en: 'Web Design Frankfurt', ru: 'Веб-дизайн Франкфурт' }[locale] || 'Web Design Frankfurt', url: `https://goldenwing.at${locale === 'en' ? '/en' : locale === 'ru' ? '/ru' : ''}/webdesign-${CITY_SLUG}` },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
