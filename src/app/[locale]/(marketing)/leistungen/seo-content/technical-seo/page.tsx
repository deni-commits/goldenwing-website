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
    title: 'Technical SEO Wien | Core Web Vitals & Indexierung',
    description: 'Technical SEO Agentur Wien. Core Web Vitals, Crawlability, Schema Markup, Site Speed. Die technische Basis für Top-Rankings. Jetzt SEO-Audit anfragen.',
    keywords: ['Technical SEO Wien', 'Core Web Vitals Optimierung', 'SEO Audit'],
  },
  en: {
    title: 'Technical SEO Vienna | Core Web Vitals & Indexing',
    description: 'Technical SEO agency Vienna. Core Web Vitals, crawlability, schema markup, site speed. The technical foundation for top rankings. Request your SEO audit.',
    keywords: ['Technical SEO Vienna', 'Core Web Vitals Optimization', 'SEO Audit'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Technical SEO',
      title: 'Technical SEO Wien — Core Web Vitals & Indexierung',
      description: 'Die technische Basis für Ihre Rankings. Core Web Vitals, Crawlability, Schema Markup und Site Speed – damit Google Ihre Seiten liebt.',
      ctaPrimary: 'Technisches Audit anfragen',
      ctaSecondary: 'Leistungen ansehen',
    },
    trustSignals: [
      { icon: 'zap', text: 'Core Web Vitals Experten' },
      { icon: 'shield', text: 'Google-zertifiziert' },
      { icon: 'code', text: 'Entwickler-Team' },
      { icon: 'clock', text: 'Schnelle Fixes' },
    ],
    benefits: [
      {
        icon: 'zap',
        title: 'Core Web Vitals',
        description: 'LCP, FID, CLS optimieren – die Ranking-Faktoren seit 2021.',
      },
      {
        icon: 'search',
        title: 'Crawlability',
        description: 'Robots.txt, Sitemap, Canonicals – damit Google alles findet.',
      },
      {
        icon: 'code',
        title: 'Schema Markup',
        description: 'Strukturierte Daten für Rich Snippets und bessere CTR.',
      },
      {
        icon: 'globe',
        title: 'Internationales SEO',
        description: 'Hreflang-Tags und Multi-Language Setup richtig umsetzen.',
      },
    ],
    results: [
      { metric: '95+', label: 'PageSpeed Score', detail: 'Nach Optimierung' },
      { metric: '-60%', label: 'Ladezeit', detail: 'Durchschnittliche Verbesserung' },
      { metric: '+40%', label: 'Crawl Budget', detail: 'Effizientere Indexierung' },
    ],
    packages: [
      {
        name: 'Tech Audit',
        price: '790',
        priceType: 'einmalig',
        description: 'Vollständige Analyse.',
        popular: false,
        features: ['Technisches SEO-Audit', 'Crawl-Analyse', 'Speed-Test', 'Priorisierte Empfehlungen'],
      },
      {
        name: 'Tech Fix',
        price: '1.990',
        priceType: 'einmalig',
        description: 'Audit + Umsetzung.',
        popular: true,
        features: ['Alles aus Tech Audit', 'Core Web Vitals Fix', 'Schema Markup', 'Sitemap Optimierung', 'Robots.txt Setup'],
      },
      {
        name: 'Tech Laufend',
        price: '490',
        priceType: 'monatlich',
        description: 'Kontinuierliche Überwachung.',
        popular: false,
        features: ['Monatliches Monitoring', 'Sofortige Fehler-Alerts', 'Indexierungs-Reports', 'Laufende Optimierung'],
      },
    ],
    process: [
      { step: '01', title: 'Crawl', description: 'Vollständiger Site-Crawl.' },
      { step: '02', title: 'Analyse', description: 'Technische Fehler identifizieren.' },
      { step: '03', title: 'Priorisierung', description: 'Impact vs. Aufwand.' },
      { step: '04', title: 'Umsetzung', description: 'Fixes implementieren.' },
      { step: '05', title: 'Verifizierung', description: 'Erfolg messen.' },
    ],
    technologies: ['Screaming Frog', 'Google Search Console', 'PageSpeed Insights', 'Schema.org'],
    faqs: [
      {
        question: 'Was ist Technical SEO?',
        answer: 'Technical SEO umfasst alle technischen Aspekte, die beeinflussen, wie Suchmaschinen Ihre Website crawlen und indexieren: Site Speed, Crawlability, Schema Markup, HTTPS, Mobile-Friendliness.',
      },
      {
        question: 'Warum sind Core Web Vitals wichtig?',
        answer: 'Seit 2021 sind Core Web Vitals (LCP, FID/INP, CLS) offizielle Google-Ranking-Faktoren. Schlechte Werte bedeuten schlechtere Rankings und höhere Absprungraten.',
      },
      {
        question: 'Wie lange dauert ein Technical SEO Audit?',
        answer: 'Ein vollständiges Technical SEO Audit dauert je nach Website-Größe 3-5 Werktage. Die Umsetzung der Empfehlungen dann weitere 1-4 Wochen.',
      },
    ],
    relatedServices: [
      { title: 'On-Page SEO', description: 'Inhalte optimieren.', href: '/leistungen/seo-content/on-page-optimierung' as any },
      { title: 'Link Building', description: 'Autorität aufbauen.', href: '/leistungen/seo-content/offpage-linkbuilding' as any },
      { title: 'Webentwicklung', description: 'Performance-Website.', href: '/leistungen/webdesign' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Technical SEO Pakete',
      pricingDescription: 'Die technische Basis für Rankings.',
      faqTitle: 'Häufige Fragen zu Technical SEO',
      ctaTitle: 'Technische Probleme lösen?',
      ctaDescription: 'Kostenloses Technical SEO Audit.',
    },
  },
  en: {
    hero: {
      badge: 'Technical SEO',
      title: 'Technical SEO Vienna — Core Web Vitals & Indexing',
      description: 'The technical foundation for your rankings. Core Web Vitals, crawlability, schema markup and site speed – so Google loves your pages.',
      ctaPrimary: 'Request Technical Audit',
      ctaSecondary: 'View Services',
    },
    trustSignals: [
      { icon: 'zap', text: 'Core Web Vitals Experts' },
      { icon: 'shield', text: 'Google-Certified' },
      { icon: 'code', text: 'Developer Team' },
      { icon: 'clock', text: 'Fast Fixes' },
    ],
    benefits: [
      { icon: 'zap', title: 'Core Web Vitals', description: 'Optimize LCP, FID, CLS – the ranking factors since 2021.' },
      { icon: 'search', title: 'Crawlability', description: 'Robots.txt, sitemap, canonicals – so Google finds everything.' },
      { icon: 'code', title: 'Schema Markup', description: 'Structured data for rich snippets and better CTR.' },
      { icon: 'globe', title: 'International SEO', description: 'Properly implement hreflang tags and multi-language setup.' },
    ],
    results: [
      { metric: '95+', label: 'PageSpeed Score', detail: 'After optimization' },
      { metric: '-60%', label: 'Load Time', detail: 'Average improvement' },
    ],
    packages: [
      { name: 'Tech Audit', price: '790', priceType: 'one-time', description: 'Complete analysis.', popular: false, features: ['Technical SEO audit', 'Crawl analysis', 'Speed test'] },
      { name: 'Tech Fix', price: '1,990', priceType: 'one-time', description: 'Audit + implementation.', popular: true, features: ['Everything from Tech Audit', 'Core Web Vitals fix', 'Schema markup', 'Sitemap optimization'] },
      { name: 'Tech Ongoing', price: '490', priceType: 'monthly', description: 'Continuous monitoring.', popular: false, features: ['Monthly monitoring', 'Immediate error alerts', 'Indexing reports'] },
    ],
    process: [
      { step: '01', title: 'Crawl', description: 'Complete site crawl.' },
      { step: '02', title: 'Analysis', description: 'Identify technical errors.' },
      { step: '03', title: 'Prioritization', description: 'Impact vs. effort.' },
      { step: '04', title: 'Implementation', description: 'Implement fixes.' },
    ],
    technologies: ['Screaming Frog', 'Google Search Console', 'PageSpeed Insights'],
    faqs: [
      { question: 'What is Technical SEO?', answer: 'Technical SEO encompasses all technical aspects that affect how search engines crawl and index your website: site speed, crawlability, schema markup, HTTPS, mobile-friendliness.' },
      { question: 'Why are Core Web Vitals important?', answer: 'Since 2021, Core Web Vitals (LCP, FID/INP, CLS) are official Google ranking factors. Poor scores mean worse rankings and higher bounce rates.' },
    ],
    relatedServices: [
      { title: 'On-Page SEO', description: 'Optimize content.', href: '/services/seo-content/on-page-optimization' as any },
      { title: 'Link Building', description: 'Build authority.', href: '/services/seo-content/offpage-linkbuilding' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Technical SEO Packages',
      faqTitle: 'Technical SEO FAQ',
      ctaTitle: 'Solve technical issues?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/seo-content/technical-seo'
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

export default async function TechnicalSeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: 'Technical SEO',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/seo-content/technical-seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'SEO & Content', url: locale === 'de' ? 'https://goldenwing.at/leistungen/seo-content' : 'https://goldenwing.at/en/services/seo-content' },
      { name: 'Technical SEO', url: 'https://goldenwing.at/leistungen/seo-content/technical-seo' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
