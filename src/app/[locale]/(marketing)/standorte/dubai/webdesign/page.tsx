import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO, LocalBusinessInfo } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const dubaiLocalBusiness: LocalBusinessInfo = {
  name: 'GoldenWing Creative Studios Dubai',
  address: 'DAMAC Executive Bay Tower B, Office 1406',
  city: 'Dubai',
  postalCode: '',
  country: 'AE',
  phone: '+971-4-XXX-XXXX',
  latitude: 25.1857,
  longitude: 55.2744,
}

const seoData = {
  de: {
    title: 'Webdesign Dubai | Moderne Websites für MENA',
    description: 'Professionelles Webdesign in Dubai. Next.js, React, WordPress. Mehrsprachig (DE/EN/AR), SEO-optimiert, mobilfreundlich. Persönliche Betreuung. Ab €4.000.',
    keywords: ['Webdesign Dubai', 'Website erstellen Dubai', 'Webdesigner Dubai', 'Web Agentur Dubai', 'Homepage Dubai'],
  },
  en: {
    title: 'Web Design Dubai | Modern Websites for MENA',
    description: 'Professional web design in Dubai. Next.js, React, WordPress. Multilingual (DE/EN/AR), SEO-optimized, mobile-friendly. Personal support. From €4,000.',
    keywords: ['Web Design Dubai', 'Website Development Dubai', 'Web Designer Dubai', 'Web Agency Dubai', 'Homepage Dubai'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Webdesign Dubai',
      title: 'Webdesign Dubai',
      description: 'Moderne Websites für Unternehmen in Dubai und der MENA-Region – von der Konzeption bis zum Launch. Persönlich betreut aus unserem Büro in Dubai.',
      ctaPrimary: 'Projekt anfragen',
      ctaSecondary: 'Referenzen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '40+ MENA-Projekte' },
      { icon: 'star', text: '4.9/5 Kundenbewertung' },
      { icon: 'clock', text: 'Schnelle Reaktionszeit' },
      { icon: 'globe', text: 'DE/EN/AR möglich' },
    ],
    benefits: [
      {
        icon: 'users',
        title: 'Persönliche Betreuung',
        description: 'Kickoff-Workshops in unserem Dubai-Büro. Wir kennen Sie persönlich, nicht nur per E-Mail oder WhatsApp.',
      },
      {
        icon: 'zap',
        title: 'Schnelle Ladezeiten',
        description: 'Core Web Vitals optimiert. Ihre Website lädt in unter 2 Sekunden – wichtig für SEO und Conversions in der Region.',
      },
      {
        icon: 'globe',
        title: 'Mehrsprachig von Anfang an',
        description: 'Deutsch, Englisch, Arabisch – wir bauen Websites, die alle Sprachen perfekt unterstützen mit korrekter RTL-Unterstützung.',
      },
      {
        icon: 'search',
        title: 'SEO-optimiert',
        description: 'Jede Website wird für Suchmaschinen optimiert – lokal und regional. Damit Sie bei "Webdesign Dubai" gefunden werden.',
      },
    ],
    packages: [
      {
        name: 'Starter Dubai',
        price: '4.200',
        priceType: 'einmalig',
        description: 'Perfekt für kleine Unternehmen und Startups in Dubai.',
        popular: false,
        features: [
          '5 Seiten (Responsive)',
          'CMS (einfache Pflege)',
          'Kontaktformular',
          'SEO-Grundoptimierung',
          'SSL-Zertifikat',
          'Englisch & Arabisch',
          'Kickoff in Dubai',
        ],
      },
      {
        name: 'Business Dubai',
        price: '7.500',
        priceType: 'einmalig',
        description: 'Für etablierte Unternehmen mit MENA-Wachstum.',
        popular: true,
        features: [
          '10-15 Seiten',
          'Mehrsprachig (DE/EN/AR)',
          'Blog-Funktion',
          'Erweiterte SEO',
          'Google Analytics Setup',
          'Monatliches Reporting',
          '2 Workshops in Dubai',
          'RTL-Support',
        ],
      },
      {
        name: 'Premium Dubai',
        price: '15.000',
        priceType: 'einmalig',
        description: 'Maßgeschneiderte Lösungen für anspruchsvolle MENA-Projekte.',
        popular: false,
        features: [
          'Unbegrenzte Seiten',
          'E-Commerce möglich',
          'Individuelle Funktionen',
          'Premium Support',
          'Conversion-Optimierung',
          'Laufende Betreuung',
          'Vollständige Lokalisierung',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Erstgespräch', description: 'Kostenlose Besprechung in unserem Dubai-Büro oder per Video.' },
      { step: '02', title: 'Konzeption', description: 'Informationsarchitektur und UX-Konzept für MENA-Märkte.' },
      { step: '03', title: 'Design', description: 'Individuelles Design – keine Templates. Angepasst an lokale Standards und Erwartungen.' },
      { step: '04', title: 'Entwicklung', description: 'Technische Umsetzung mit Next.js, React oder WordPress mit RTL-Support.' },
      { step: '05', title: 'Launch', description: 'Abnahme, Einweisung und Go-Live. Gemeinsam feiern!' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify', 'Tailwind CSS', 'TypeScript', 'Arabic Typography'],
    faqs: [
      {
        question: 'Wie lange dauert ein Website-Projekt in Dubai?',
        answer: 'Starter-Websites: 4-6 Wochen. Business-Websites: 8-12 Wochen. Premium-Projekte: 12-16 Wochen. Kickoff-Workshop in unserem Dubai-Büro inklusive.',
      },
      {
        question: 'Was kostet Webdesign in Dubai?',
        answer: 'Seriöse Websites starten bei €4.200. Für €7.500 bekommen Sie eine professionelle mehrsprachige Business-Website. Premium-Projekte mit E-Commerce: ab €15.000.',
      },
      {
        question: 'Könnt ihr arabisches Webdesign?',
        answer: 'Ja! Wir entwickeln Websites mit vollständiger RTL-Unterstützung, arabischer Typografie und design-Standards für die MENA-Region.',
      },
      {
        question: 'Kann ich euch im Dubai-Büro besuchen?',
        answer: 'Ja! Unser Büro in DAMAC Executive Bay ist leicht erreichbar. Kickoff-Meetings und Workshops finden oft hier statt.',
      },
      {
        question: 'Arbeitet ihr mit WordPress?',
        answer: 'Wir können, aber wir empfehlen für die meisten Projekte Next.js oder ähnliche moderne Frameworks. Schneller, sicherer, besser für SEO, günstiger in der Wartung. WordPress auf Wunsch möglich.',
      },
    ],
    relatedServices: [
      { title: 'SEO Dubai', description: 'Damit Ihre Website auch gefunden wird.', href: '/standorte/dubai/seo' as any },
      { title: 'Branding Dubai', description: 'Logo und Corporate Design aus Dubai.', href: '/standorte/dubai/branding' as any },
      { title: 'Digital Marketing Dubai', description: 'Traffic für Ihre Website.', href: '/standorte/dubai/digital-marketing' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Webdesign Pakete für Dubai',
      pricingDescription: 'Transparente Preise mit MENA-Expertise!',
      processTitle: 'So entsteht Ihre Website',
      processSubtitle: 'Von der Idee zum Launch – persönlich betreut aus Dubai.',
      faqTitle: 'Webdesign Dubai – Häufige Fragen',
      faqSubtitle: 'Antworten auf die wichtigsten Fragen.',
      ctaTitle: 'Bereit für Ihre neue Website?',
      ctaDescription: 'Kostenloses Erstgespräch in unserem Dubai-Büro oder per Video.',
    },
  },
  en: {
    hero: {
      badge: 'Web Design Dubai',
      title: 'Web Design Dubai',
      description: 'Modern websites for businesses in Dubai and the MENA region – from concept to launch. Personally managed from our Dubai office.',
      ctaPrimary: 'Request Project',
      ctaSecondary: 'View References',
    },
    trustSignals: [
      { icon: 'award', text: '40+ MENA Projects' },
      { icon: 'star', text: '4.9/5 Customer Rating' },
      { icon: 'clock', text: 'Fast Response Time' },
      { icon: 'globe', text: 'DE/EN/AR Possible' },
    ],
    benefits: [
      { icon: 'users', title: 'Personal Support', description: 'Kickoff workshops at our Dubai office. We know you personally, not just via email or WhatsApp.' },
      { icon: 'zap', title: 'Fast Loading Times', description: 'Core Web Vitals optimized. Your website loads in under 2 seconds – important for SEO and conversions.' },
      { icon: 'globe', title: 'Multilingual from the Start', description: 'German, English, Arabic – we build websites that perfectly support all languages with correct RTL support.' },
      { icon: 'search', title: 'SEO Optimized', description: 'Every website is optimized for search engines. So you can be found for "Web Design Dubai".' },
    ],
    packages: [
      { name: 'Starter Dubai', price: '4,200', priceType: 'one-time', description: 'Perfect for small businesses and startups in Dubai.', popular: false, features: ['5 Pages (Responsive)', 'CMS', 'Contact Form', 'Basic SEO', 'SSL Certificate', 'English & Arabic', 'Kickoff in Dubai'] },
      { name: 'Business Dubai', price: '7,500', priceType: 'one-time', description: 'For established businesses with MENA growth.', popular: true, features: ['10-15 Pages', 'Multilingual (DE/EN/AR)', 'Blog Function', 'Advanced SEO', 'Analytics Setup', 'Monthly Reporting', 'RTL Support', '2 Workshops'] },
      { name: 'Premium Dubai', price: '15,000', priceType: 'one-time', description: 'Custom solutions for demanding MENA projects.', popular: false, features: ['Unlimited Pages', 'E-Commerce Possible', 'Custom Features', 'Premium Support', 'Conversion Optimization', 'Ongoing Support', 'Full Localization'] },
    ],
    process: [
      { step: '01', title: 'Initial Meeting', description: 'Free consultation at our Dubai office or via video.' },
      { step: '02', title: 'Conception', description: 'Information architecture and UX design for MENA markets.' },
      { step: '03', title: 'Design', description: 'Your individual design – no templates. Adapted to local standards.' },
      { step: '04', title: 'Development', description: 'Technical implementation with Next.js, React or WordPress with RTL support.' },
      { step: '05', title: 'Launch', description: 'Approval, training and go-live. Let\'s celebrate together!' },
    ],
    technologies: ['Next.js', 'React', 'WordPress', 'Shopify', 'Tailwind CSS', 'TypeScript', 'Arabic Typography'],
    faqs: [
      { question: 'How long does a website project take in Dubai?', answer: 'Starter websites: 4-6 weeks. Business websites: 8-12 weeks. Premium projects: 12-16 weeks. Kickoff workshop at our Dubai office included.' },
      { question: 'What does web design cost in Dubai?', answer: 'Professional websites start at €4,200. For €7,500 you get a professional multilingual business website. Premium projects with e-commerce start at €15,000.' },
      { question: 'Can you do Arabic web design?', answer: 'Yes! We develop websites with full RTL support, Arabic typography and MENA-standard design.' },
      { question: 'Can I visit your office?', answer: 'Yes! Our office at DAMAC Executive Bay is easily accessible. Kickoff meetings and workshops usually take place here.' },
    ],
    relatedServices: [
      { title: 'SEO Dubai', description: 'So your website gets found.', href: '/standorte/dubai/seo' as any },
      { title: 'Branding Dubai', description: 'Logo and corporate design from Dubai.', href: '/standorte/dubai/branding' as any },
      { title: 'Digital Marketing Dubai', description: 'Traffic for your website.', href: '/standorte/dubai/digital-marketing' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Web Design Packages for Dubai',
      pricingDescription: 'Transparent prices with MENA expertise!',
      processTitle: 'How Your Website is Created',
      processSubtitle: 'From idea to launch – personally managed from Dubai.',
      faqTitle: 'Web Design Dubai – FAQ',
      faqSubtitle: 'Answers to the most important questions.',
      ctaTitle: 'Ready for Your New Website?',
      ctaDescription: 'Free initial consultation at our Dubai office or via video.',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/dubai/webdesign')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getCanonicalUrl('/standorte/dubai/webdesign', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
    },
    alternates: {
      canonical: getCanonicalUrl('/standorte/dubai/webdesign', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortDubaiWebdesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Webdesign Dubai' : locale === 'en' ? 'Web Design Dubai' : 'Webdesign Dubai',
    cityName: 'Dubai',
    cityType: 'City',
    url: '/standorte/dubai/webdesign',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.ae' },
      { name: locale === 'de' ? 'Standorte' : locale === 'en' ? 'Locations' : 'Standorte', url: 'https://goldenwing.ae/standorte' },
      { name: 'Dubai', url: 'https://goldenwing.ae/standorte/dubai' },
      { name: 'Webdesign', url: 'https://goldenwing.ae/standorte/dubai/webdesign' },
    ],
    localBusiness: dubaiLocalBusiness,
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Unsere Leistungen', href: '/leistungen/webdesign' },
        { text: 'Webdesign Preise', href: '/webdesign-preise' },
        { text: 'Beste Webdesign Agenturen Dubai', href: '/beste-webdesign-agenturen-dubai' },
      ]
    : [
        { text: 'Our Services', href: '/services/web-design' },
        { text: 'Web Design Pricing', href: '/web-design-pricing' },
        { text: 'Best Web Design Agencies Dubai', href: '/best-web-design-agencies-dubai' },
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
