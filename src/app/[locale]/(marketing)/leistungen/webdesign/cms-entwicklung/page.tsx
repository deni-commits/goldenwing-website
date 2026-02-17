/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const seoData = {
  de: {
    title: 'CMS Entwicklung Wien | WordPress, Payload, Headless CMS',
    description: 'CMS Entwicklung Agentur Wien. WordPress, Payload CMS, Headless Systeme. Maßgeschneiderte Content-Management-Lösungen für Ihre Website.',
    keywords: ['CMS Entwicklung Wien', 'WordPress Agentur', 'Headless CMS'],
  },
  en: {
    title: 'CMS Development Vienna | WordPress, Payload, Headless CMS',
    description: 'CMS development agency Vienna. WordPress, Payload CMS, headless systems. Custom content management solutions for your website.',
    keywords: ['CMS Development Vienna', 'WordPress Agency', 'Headless CMS'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'CMS Entwicklung',
      title: 'CMS Entwicklung Wien',
      description: 'Das richtige Content-Management-System für Ihr Projekt. WordPress, Payload CMS oder Headless – wir entwickeln maßgeschneiderte CMS-Lösungen.',
      ctaPrimary: 'CMS-Beratung anfragen',
      ctaSecondary: 'Systeme vergleichen',
    },
    trustSignals: [
      { icon: 'code', text: '100+ CMS-Projekte' },
      { icon: 'shield', text: 'Sicherheits-Fokus' },
      { icon: 'zap', text: 'Performance-optimiert' },
      { icon: 'users', text: 'Benutzerfreundlich' },
    ],
    benefits: [
      {
        icon: 'edit',
        title: 'Einfache Bearbeitung',
        description: 'Intuitive Oberfläche – Inhalte selbst bearbeiten ohne Programmierkenntnisse.',
      },
      {
        icon: 'layers',
        title: 'Flexible Strukturen',
        description: 'Custom Post Types, Felder und Taxonomien nach Ihren Anforderungen.',
      },
      {
        icon: 'shield',
        title: 'Sicherheit',
        description: 'Gehärtete Systeme, regelmäßige Updates, sichere Hosting-Umgebung.',
      },
      {
        icon: 'zap',
        title: 'Performance',
        description: 'Caching, CDN-Integration und optimierte Datenbank-Abfragen.',
      },
    ],
    results: [
      { metric: '-80%', label: 'Bearbeitungszeit', detail: 'Für Content-Updates' },
      { metric: '99.9%', label: 'Uptime', detail: 'Zuverlässiger Betrieb' },
      { metric: '100%', label: 'Individuell', detail: 'Maßgeschneiderte Lösungen' },
    ],
    services: [
      {
        icon: 'globe',
        title: 'WordPress',
        description: 'Das weltweit beliebteste CMS. Gutenberg Editor, WooCommerce, Custom Themes.',
      },
      {
        icon: 'code',
        title: 'Payload CMS',
        description: 'Modernes Headless CMS mit TypeScript. GraphQL & REST, selbst-gehostet.',
      },
      {
        icon: 'layers',
        title: 'Headless CMS',
        description: 'Backend entkoppelt vom Frontend. API-first, skalierbar, zukunftssicher.',
      },
    ],
    packages: [
      {
        name: 'CMS Basic',
        price: '1.990',
        priceType: 'einmalig',
        description: 'WordPress Standard.',
        popular: false,
        features: ['WordPress Installation', 'Theme-Anpassung', 'Basis-Plugins', 'Einschulung'],
      },
      {
        name: 'CMS Custom',
        price: '4.990',
        priceType: 'einmalig',
        description: 'Individuelle Entwicklung.',
        popular: true,
        features: ['Custom Theme/System', 'Individuelle Felder', 'API-Integrationen', 'Performance-Optimierung', 'Dokumentation'],
      },
      {
        name: 'CMS Enterprise',
        price: '9.990+',
        priceType: 'einmalig',
        description: 'Komplexe Anforderungen.',
        popular: false,
        features: ['Headless Architektur', 'Multi-Site Setup', 'CI/CD Pipeline', 'Load Balancing', 'Dedizierter Support'],
      },
    ],
    process: [
      { step: '01', title: 'Anforderungen', description: 'Welche Inhalte, welche Nutzer?' },
      { step: '02', title: 'System-Wahl', description: 'Das richtige CMS auswählen.' },
      { step: '03', title: 'Entwicklung', description: 'Custom Theme oder System.' },
      { step: '04', title: 'Migration', description: 'Bestehende Inhalte übernehmen.' },
      { step: '05', title: 'Schulung', description: 'Ihr Team einweisen.' },
    ],
    technologies: ['WordPress', 'Payload CMS', 'Strapi', 'Sanity', 'Next.js', 'React'],
    faqs: [
      {
        question: 'WordPress oder Headless CMS?',
        answer: 'WordPress ist ideal für klassische Websites und Shops. Headless CMS empfehlen wir bei hohen Performance-Anforderungen, Multi-Channel-Strategie oder wenn Sie bereits ein modernes Frontend haben.',
      },
      {
        question: 'Was kostet CMS-Entwicklung?',
        answer: 'Eine WordPress-Standardlösung beginnt bei €1.990. Custom-Entwicklung mit individuellen Anforderungen ab €4.990. Komplexe Enterprise-Projekte werden individuell kalkuliert.',
      },
      {
        question: 'Kann ich Inhalte selbst bearbeiten?',
        answer: 'Absolut! Das ist der Hauptzweck eines CMS. Wir gestalten die Benutzeroberfläche so, dass Ihr Team ohne technische Kenntnisse Inhalte pflegen kann.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign', description: 'Design für Ihr CMS.', href: '/leistungen/webdesign' as any },
      { title: 'E-Commerce', description: 'WooCommerce & Shopify.', href: '/leistungen/ecommerce-agentur' as any },
      { title: 'WordPress Agentur', description: 'WordPress-Spezialist.', href: '/leistungen/wordpress-agentur' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'CMS-Entwicklung Pakete',
      pricingDescription: 'Das richtige System für Ihr Projekt.',
      faqTitle: 'Häufige Fragen zu CMS-Entwicklung',
      ctaTitle: 'Welches CMS ist das richtige?',
      ctaDescription: 'Kostenlose CMS-Beratung.',
    },
  },
  en: {
    hero: {
      badge: 'CMS Development',
      title: 'CMS Development Vienna',
      description: 'The right content management system for your project. WordPress, Payload CMS or headless – we develop custom CMS solutions.',
      ctaPrimary: 'Request CMS Consultation',
      ctaSecondary: 'Compare Systems',
    },
    trustSignals: [
      { icon: 'code', text: '100+ CMS Projects' },
      { icon: 'shield', text: 'Security Focus' },
      { icon: 'zap', text: 'Performance-Optimized' },
      { icon: 'users', text: 'User-Friendly' },
    ],
    benefits: [
      { icon: 'edit', title: 'Easy Editing', description: 'Intuitive interface – edit content yourself without coding knowledge.' },
      { icon: 'layers', title: 'Flexible Structures', description: 'Custom post types, fields and taxonomies to your requirements.' },
      { icon: 'shield', title: 'Security', description: 'Hardened systems, regular updates, secure hosting environment.' },
      { icon: 'zap', title: 'Performance', description: 'Caching, CDN integration and optimized database queries.' },
    ],
    results: [
      { metric: '-80%', label: 'Editing Time', detail: 'For content updates' },
      { metric: '99.9%', label: 'Uptime', detail: 'Reliable operation' },
    ],
    services: [
      { icon: 'globe', title: 'WordPress', description: 'The world\'s most popular CMS. Gutenberg Editor, WooCommerce, Custom Themes.' },
      { icon: 'code', title: 'Payload CMS', description: 'Modern headless CMS with TypeScript. Self-hosted, maximum control.' },
      { icon: 'layers', title: 'Headless CMS', description: 'Backend decoupled from frontend. API-first, scalable, future-proof.' },
    ],
    packages: [
      { name: 'CMS Basic', price: '1,990', priceType: 'one-time', description: 'WordPress standard.', popular: false, features: ['WordPress installation', 'Theme customization', 'Basic plugins'] },
      { name: 'CMS Custom', price: '4,990', priceType: 'one-time', description: 'Custom development.', popular: true, features: ['Custom theme/system', 'Custom fields', 'API integrations', 'Performance optimization'] },
      { name: 'CMS Enterprise', price: '9,990+', priceType: 'one-time', description: 'Complex requirements.', popular: false, features: ['Headless architecture', 'Multi-site setup', 'CI/CD pipeline'] },
    ],
    process: [
      { step: '01', title: 'Requirements', description: 'What content, which users?' },
      { step: '02', title: 'System Selection', description: 'Choose the right CMS.' },
      { step: '03', title: 'Development', description: 'Custom theme or system.' },
      { step: '04', title: 'Migration', description: 'Transfer existing content.' },
    ],
    technologies: ['WordPress', 'Payload CMS', 'Strapi', 'Next.js'],
    faqs: [
      { question: 'WordPress or Headless CMS?', answer: 'WordPress is ideal for classic websites and shops. We recommend headless CMS for high performance requirements or multi-channel strategy.' },
      { question: 'What does CMS development cost?', answer: 'A WordPress standard solution starts at €1,990. Custom development from €4,990. Complex enterprise projects are individually calculated.' },
    ],
    relatedServices: [
      { title: 'Web Design', description: 'Design for your CMS.', href: '/services/webdesign' as any },
      { title: 'E-Commerce', description: 'WooCommerce & Shopify.', href: '/services/ecommerce' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'CMS Development Packages',
      faqTitle: 'CMS Development FAQ',
      ctaTitle: 'Which CMS is right?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/webdesign/cms-entwicklung'
  const hreflangAlternates = getHreflangAlternates(basePath)

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl(basePath, locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function CmsEntwicklungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'CMS Entwicklung' : 'CMS Development',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/webdesign/cms-entwicklung',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'Webdesign', url: locale === 'de' ? 'https://goldenwing.at/leistungen/webdesign' : 'https://goldenwing.at/en/services/webdesign' },
      { name: locale === 'de' ? 'CMS Entwicklung' : 'CMS Development', url: 'https://goldenwing.at/leistungen/webdesign/cms-entwicklung' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
