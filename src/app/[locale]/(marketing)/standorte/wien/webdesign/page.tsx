import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO, LocalBusinessInfo } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// Vienna LocalBusiness Info (echte Adresse!)
const viennaLocalBusiness: LocalBusinessInfo = {
  name: 'GoldenWing Creative Studios Wien',
  address: 'Czeikestrasse 4/21',
  city: 'Wien',
  postalCode: '1100',
  country: 'AT',
  phone: '+43-664-543-96-81',
  latitude: 48.1676,
  longitude: 16.3795,
}

// SEO Data
const seoData = {
  de: {
    title: 'Webdesign Wien | Moderne Websites aus dem 10. Bezirk',
    description: 'Professionelles Webdesign in Wien. Persönliche Betreuung aus unserem Büro in 1100 Wien. Next.js, React, WordPress. Ab €3.500. Förderung bis 50% möglich.',
    keywords: ['Webdesign Wien', 'Website erstellen Wien', 'Webdesigner Wien', 'Webagentur Wien', 'Homepage Wien'],
  },
  en: {
    title: 'Web Design Vienna | Modern Websites from the 10th District',
    description: 'Professional web design in Vienna. Personal support from our office in 1100 Vienna. Next.js, React, WordPress. From €3,500. Up to 50% funding available.',
    keywords: ['Web Design Vienna', 'Website Development Vienna', 'Web Designer Vienna', 'Web Agency Vienna'],
  },
  ru: {
    title: 'Веб-дизайн Вена | Современные сайты из 10-го района',
    description: 'Профессиональный веб-дизайн в Вене. Личное сопровождение из нашего офиса в 1100 Вена. Next.js, React, WordPress. От €3 500.',
    keywords: ['Веб-дизайн Вена', 'Создание сайта Вена', 'Веб-дизайнер Вена'],
  },
}

// Content Data - UNIQUE für Wien!
const contentData: Record<'de' | 'en' | 'ru', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Webdesign Wien',
      title: 'Webdesign Wien',
      description: 'Moderne Websites für Wiener Unternehmen – von der Konzeption bis zum Launch. Persönlich betreut aus unserem Büro im 10. Bezirk.',
      ctaPrimary: 'Projekt anfragen',
      ctaSecondary: 'Referenzen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '50+ Wiener Projekte' },
      { icon: 'star', text: '4.9/5 Kundenbewertung' },
      { icon: 'clock', text: 'Schnelle Reaktionszeit' },
      { icon: 'shield', text: 'DSGVO-konform' },
    ],
    benefits: [
      {
        icon: 'users',
        title: 'Persönliche Betreuung',
        description: 'Kickoff-Workshops in unserem Wiener Büro. Wir kennen Sie persönlich, nicht nur per E-Mail.',
      },
      {
        icon: 'zap',
        title: 'Schnelle Ladezeiten',
        description: 'Core Web Vitals optimiert. Ihre Website lädt in unter 2 Sekunden – wichtig für SEO und Conversions.',
      },
      {
        icon: 'globe',
        title: 'Mehrsprachig von Anfang an',
        description: 'Wien ist international. Wir bauen Websites, die DE, EN und weitere Sprachen perfekt unterstützen.',
      },
      {
        icon: 'search',
        title: 'SEO-optimiert',
        description: 'Jede Website wird für Suchmaschinen optimiert. Damit Sie bei "Webdesign Wien" gefunden werden.',
      },
    ],
    // UNIQUE: Wien-spezifische Pakete
    packages: [
      {
        name: 'Starter Wien',
        price: '3.500',
        priceType: 'einmalig',
        description: 'Perfekt für kleine Wiener Unternehmen und Gründer.',
        popular: false,
        features: [
          '5 Seiten (Responsive)',
          'CMS (einfache Pflege)',
          'Kontaktformular',
          'SEO-Grundoptimierung',
          'SSL-Zertifikat',
          'Kickoff in Wien',
        ],
      },
      {
        name: 'Business Wien',
        price: '6.500',
        priceType: 'einmalig',
        description: 'Für etablierte Wiener Unternehmen mit Wachstumsambitionen.',
        popular: true,
        features: [
          '10-15 Seiten',
          'Mehrsprachig (DE/EN)',
          'Blog-Funktion',
          'Erweiterte SEO',
          'Google Analytics Setup',
          'Monatliches Reporting',
          '2 Workshops in Wien',
        ],
      },
      {
        name: 'Premium Wien',
        price: '12.000',
        priceType: 'einmalig',
        description: 'Maßgeschneiderte Lösungen für anspruchsvolle Wiener Projekte.',
        popular: false,
        features: [
          'Unbegrenzte Seiten',
          'E-Commerce möglich',
          'Individuelle Funktionen',
          'Premium Support',
          'Conversion-Optimierung',
          'Laufende Betreuung',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Erstgespräch', description: 'Kostenloses Kennenlernen in unserem Wiener Büro oder per Video.' },
      { step: '02', title: 'Konzeption', description: 'Wir entwickeln die Informationsarchitektur und das UX-Konzept.' },
      { step: '03', title: 'Design', description: 'Ihr individuelles Design – keine Templates, sondern maßgeschneidert.' },
      { step: '04', title: 'Entwicklung', description: 'Technische Umsetzung mit Next.js, React oder WordPress.' },
      { step: '05', title: 'Launch', description: 'Abnahme, Einweisung und Go-Live. Wir stoßen gemeinsam an! 🍾' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify', 'Tailwind CSS', 'TypeScript'],
    // UNIQUE: Wien-spezifische FAQs
    faqs: [
      {
        question: 'Wie lange dauert ein Website-Projekt in Wien?',
        answer: 'Starter-Websites: 4-6 Wochen. Business-Websites: 8-12 Wochen. Premium-Projekte: 12-16 Wochen. Kickoff-Workshop in unserem Wiener Büro inklusive.',
      },
      {
        question: 'Was kostet Webdesign in Wien?',
        answer: 'Seriöse Websites starten bei €3.500. Für €6.500-8.000 bekommen Sie eine professionelle Business-Website. Premium-Projekte mit E-Commerce beginnen bei €12.000.',
      },
      {
        question: 'Kann ich Förderungen für meine Website nutzen?',
        answer: 'Ja! Die Wirtschaftsagentur Wien fördert Digitalisierungsprojekte mit bis zu 50% (max. €10.000). Das bedeutet: Eine €6.000-Website kostet Sie effektiv nur €3.000. Wir helfen beim Antrag.',
      },
      {
        question: 'Kann ich euch im Büro besuchen?',
        answer: 'Ja! Unser Büro in der Czeikestrasse (1100 Wien) ist mit U1 Reumannplatz gut erreichbar. Kickoff-Workshops finden meist hier statt.',
      },
      {
        question: 'Arbeitet ihr mit WordPress?',
        answer: 'Wir können, aber wir empfehlen für die meisten Projekte Next.js oder ähnliche moderne Frameworks. Warum? Schneller, sicherer, besser für SEO, günstiger in der Wartung. WordPress auf Wunsch möglich.',
      },
      {
        question: 'Was braucht ihr von mir vor Projektstart?',
        answer: 'Logo + CI-Farben (falls vorhanden), Texte oder Stichpunkte, Fotos (wir organisieren auch Shootings), Zugang zur Domain, und einen Ansprechpartner mit Entscheidungsbefugnis.',
      },
    ],
    relatedServices: [
      { title: 'SEO Wien', description: 'Damit Ihre Website auch gefunden wird.', href: '/standorte/wien/seo' as any },
      { title: 'Branding Wien', description: 'Logo und Corporate Design aus Wien.', href: '/standorte/wien/branding' as any },
      { title: 'Google Ads Wien', description: 'Sofort sichtbar mit bezahlter Werbung.', href: '/standorte/wien/google-ads' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Webdesign Pakete für Wien',
      pricingDescription: 'Transparente Preise – Förderung bis 50% möglich!',
      processTitle: 'So entsteht Ihre Website',
      processSubtitle: 'Von der Idee zum Launch – persönlich betreut aus Wien.',
      faqTitle: 'Webdesign Wien – Häufige Fragen',
      faqSubtitle: 'Antworten auf die wichtigsten Fragen.',
      ctaTitle: 'Bereit für Ihre neue Website?',
      ctaDescription: 'Kostenloses Erstgespräch in unserem Wiener Büro oder per Video.',
    },
  },
  en: {
    hero: {
      badge: 'Web Design Vienna',
      title: 'Web Design Vienna',
      description: 'Modern websites for Viennese businesses – from concept to launch. Personally managed from our office in the 10th district.',
      ctaPrimary: 'Request Project',
      ctaSecondary: 'View References',
    },
    trustSignals: [
      { icon: 'award', text: '50+ Vienna Projects' },
      { icon: 'star', text: '4.9/5 Customer Rating' },
      { icon: 'clock', text: 'Fast Response Time' },
      { icon: 'shield', text: 'GDPR Compliant' },
    ],
    benefits: [
      {
        icon: 'users',
        title: 'Personal Support',
        description: 'Kickoff workshops at our Vienna office. We know you personally, not just via email.',
      },
      {
        icon: 'zap',
        title: 'Fast Loading Times',
        description: 'Core Web Vitals optimized. Your website loads in under 2 seconds – important for SEO and conversions.',
      },
      {
        icon: 'globe',
        title: 'Multilingual from the Start',
        description: 'Vienna is international. We build websites that perfectly support DE, EN and more languages.',
      },
      {
        icon: 'search',
        title: 'SEO Optimized',
        description: 'Every website is optimized for search engines. So you can be found for "Web Design Vienna".',
      },
    ],
    packages: [
      {
        name: 'Starter Vienna',
        price: '3,500',
        priceType: 'one-time',
        description: 'Perfect for small Viennese businesses and founders.',
        popular: false,
        features: [
          '5 Pages (Responsive)',
          'CMS (Easy Maintenance)',
          'Contact Form',
          'Basic SEO',
          'SSL Certificate',
          'Kickoff in Vienna',
        ],
      },
      {
        name: 'Business Vienna',
        price: '6,500',
        priceType: 'one-time',
        description: 'For established Viennese companies with growth ambitions.',
        popular: true,
        features: [
          '10-15 Pages',
          'Multilingual (DE/EN)',
          'Blog Function',
          'Advanced SEO',
          'Google Analytics Setup',
          'Monthly Reporting',
          '2 Workshops in Vienna',
        ],
      },
      {
        name: 'Premium Vienna',
        price: '12,000',
        priceType: 'one-time',
        description: 'Custom solutions for demanding Viennese projects.',
        popular: false,
        features: [
          'Unlimited Pages',
          'E-Commerce Possible',
          'Custom Features',
          'Premium Support',
          'Conversion Optimization',
          'Ongoing Support',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Initial Meeting', description: 'Free introduction at our Vienna office or via video.' },
      { step: '02', title: 'Conception', description: 'We develop the information architecture and UX concept.' },
      { step: '03', title: 'Design', description: 'Your individual design – no templates, but custom-made.' },
      { step: '04', title: 'Development', description: 'Technical implementation with Next.js, React or WordPress.' },
      { step: '05', title: 'Launch', description: 'Approval, training and go-live. Let\'s celebrate together! 🍾' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify', 'Tailwind CSS', 'TypeScript'],
    faqs: [
      {
        question: 'How long does a website project take in Vienna?',
        answer: 'Starter websites: 4-6 weeks. Business websites: 8-12 weeks. Premium projects: 12-16 weeks. Kickoff workshop at our Vienna office included.',
      },
      {
        question: 'What does web design cost in Vienna?',
        answer: 'Professional websites start at €3,500. For €6,500-8,000 you get a professional business website. Premium projects with e-commerce start at €12,000.',
      },
      {
        question: 'Can I use funding for my website?',
        answer: 'Yes! The Vienna Business Agency funds digitalization projects with up to 50% (max. €10,000). We help with the application.',
      },
      {
        question: 'Can I visit your office?',
        answer: 'Yes! Our office at Czeikestrasse (1100 Vienna) is easily accessible via U1 Reumannplatz. Kickoff workshops usually take place here.',
      },
    ],
    relatedServices: [
      { title: 'SEO Vienna', description: 'So your website gets found.', href: '/standorte/wien/seo' as any },
      { title: 'Branding Vienna', description: 'Logo and corporate design from Vienna.', href: '/standorte/wien/branding' as any },
      { title: 'Google Ads Vienna', description: 'Instant visibility with paid advertising.', href: '/standorte/wien/google-ads' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Web Design Packages for Vienna',
      pricingDescription: 'Transparent prices – up to 50% funding available!',
      processTitle: 'How Your Website is Created',
      processSubtitle: 'From idea to launch – personally managed from Vienna.',
      faqTitle: 'Web Design Vienna – FAQ',
      faqSubtitle: 'Answers to the most important questions.',
      ctaTitle: 'Ready for Your New Website?',
      ctaDescription: 'Free initial meeting at our Vienna office or via video.',
    },
  },
  ru: {
    hero: {
      badge: 'Веб-дизайн Вена',
      title: 'Веб-дизайн Вена',
      description: 'Современные сайты для венских компаний – от концепции до запуска. Личное сопровождение из нашего офиса в 10-м районе.',
      ctaPrimary: 'Заказать проект',
      ctaSecondary: 'Посмотреть работы',
    },
    trustSignals: [
      { icon: 'award', text: '50+ проектов в Вене' },
      { icon: 'star', text: 'Оценка 4.9/5' },
      { icon: 'clock', text: 'Быстрый отклик' },
      { icon: 'shield', text: 'Соответствие GDPR' },
    ],
    benefits: [
      {
        icon: 'users',
        title: 'Личное сопровождение',
        description: 'Воркшопы в нашем венском офисе. Мы знаем вас лично.',
      },
      {
        icon: 'zap',
        title: 'Быстрая загрузка',
        description: 'Оптимизация Core Web Vitals. Ваш сайт загружается менее чем за 2 секунды.',
      },
      {
        icon: 'globe',
        title: 'Многоязычность',
        description: 'Вена международна. Мы создаем сайты с поддержкой DE, EN и других языков.',
      },
      {
        icon: 'search',
        title: 'SEO-оптимизация',
        description: 'Каждый сайт оптимизирован для поисковых систем.',
      },
    ],
    packages: [
      {
        name: 'Стартовый Вена',
        price: '3 500',
        priceType: 'единоразово',
        description: 'Идеально для малых венских компаний.',
        popular: false,
        features: ['5 страниц', 'CMS', 'Форма обратной связи', 'Базовое SEO', 'SSL-сертификат'],
      },
      {
        name: 'Бизнес Вена',
        price: '6 500',
        priceType: 'единоразово',
        description: 'Для развивающихся венских компаний.',
        popular: true,
        features: ['10-15 страниц', 'Многоязычность', 'Блог', 'Расширенное SEO', 'Аналитика'],
      },
      {
        name: 'Премиум Вена',
        price: '12 000',
        priceType: 'единоразово',
        description: 'Индивидуальные решения для требовательных проектов.',
        popular: false,
        features: ['Без ограничений', 'E-Commerce', 'Кастомные функции', 'Премиум поддержка'],
      },
    ],
    process: [
      { step: '01', title: 'Знакомство', description: 'Бесплатная встреча в офисе или онлайн.' },
      { step: '02', title: 'Концепция', description: 'Разработка архитектуры и UX-концепции.' },
      { step: '03', title: 'Дизайн', description: 'Индивидуальный дизайн без шаблонов.' },
      { step: '04', title: 'Разработка', description: 'Техническая реализация.' },
      { step: '05', title: 'Запуск', description: 'Приемка и запуск. 🍾' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify'],
    faqs: [
      {
        question: 'Сколько времени занимает проект в Вене?',
        answer: 'Стартовые сайты: 4-6 недель. Бизнес: 8-12 недель. Премиум: 12-16 недель.',
      },
      {
        question: 'Сколько стоит веб-дизайн в Вене?',
        answer: 'От €3 500 за стартовый сайт. Бизнес-сайты: €6 500-8 000. Премиум: от €12 000.',
      },
    ],
    relatedServices: [
      { title: 'SEO Вена', description: 'Чтобы ваш сайт находили.', href: '/standorte/wien/seo' as any },
      { title: 'Брендинг Вена', description: 'Логотип и фирменный стиль.', href: '/standorte/wien/branding' as any },
    ],
    labels: {
      ...sharedLabels.ru,
      pricingTitle: 'Пакеты веб-дизайна для Вены',
      faqTitle: 'Веб-дизайн Вена – Вопросы',
      ctaTitle: 'Готовы к новому сайту?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/wien/webdesign')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getCanonicalUrl('/standorte/wien/webdesign', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
    },
    alternates: {
      canonical: getCanonicalUrl('/standorte/wien/webdesign', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortWienWebdesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'

  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Webdesign Wien' : locale === 'en' ? 'Web Design Vienna' : 'Веб-дизайн Вена',
    cityName: 'Wien',
    cityType: 'City',
    url: '/standorte/wien/webdesign',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : locale === 'en' ? 'Locations' : 'Офисы', url: 'https://goldenwing.at/standorte' },
      { name: 'Wien', url: 'https://goldenwing.at/standorte/wien' },
      { name: 'Webdesign', url: 'https://goldenwing.at/standorte/wien/webdesign' },
    ],
    localBusiness: viennaLocalBusiness,
  }

  // Contextual Links für SEO
  const contextualLinks = locale === 'de'
    ? [
        { text: 'Unsere Leistungen', href: '/leistungen/webdesign' },
        { text: 'Webdesign Preise', href: '/webdesign-preise' },
        { text: 'Beste Webdesign Agenturen Wien', href: '/beste-webdesign-agenturen-wien' },
      ]
    : [
        { text: 'Our Services', href: '/services/web-design' },
        { text: 'Web Design Pricing', href: '/web-design-pricing' },
        { text: 'Best Web Design Agencies Vienna', href: '/best-web-design-agencies-vienna' },
      ]

  return (
    <LandingPageTemplate
      locale={locale}
      content={content}
      seo={seo}
      contextualLinks={contextualLinks}
    />
  )
}
