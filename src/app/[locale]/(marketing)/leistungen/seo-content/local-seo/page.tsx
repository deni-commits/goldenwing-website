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
    title: 'Local SEO Wien | Lokal bei Google gefunden werden',
    description: 'Local SEO Agentur Wien. Google Business Profile, lokale Keywords, Bewertungsmanagement. Mehr lokale Kunden durch bessere Sichtbarkeit in Ihrer Region.',
    keywords: ['Local SEO Wien', 'Google My Business Optimierung', 'Lokale Suchmaschinenoptimierung'],
  },
  en: {
    title: 'Local SEO Vienna | Get Found Locally on Google',
    description: 'Local SEO agency Vienna. Google Business Profile, local keywords, review management. More local customers through better visibility in your region.',
    keywords: ['Local SEO Vienna', 'Google My Business Optimization', 'Local Search Engine Optimization'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Local SEO',
      title: 'Local SEO Wien — Lokal gefunden werden',
      description: 'Werden Sie in Ihrer Region sichtbar. Google Business Profile, lokale Keywords und Bewertungsmanagement für mehr Laufkundschaft und lokale Anfragen.',
      ctaPrimary: 'Lokale SEO anfragen',
      ctaSecondary: 'Pakete ansehen',
    },
    trustSignals: [
      { icon: 'map-pin', text: 'Lokale Expertise' },
      { icon: 'star', text: 'Google Partner' },
      { icon: 'clock', text: 'Schnelle Ergebnisse' },
      { icon: 'shield', text: 'Nachweisbare Rankings' },
    ],
    benefits: [
      {
        icon: 'map-pin',
        title: 'Google Business Profile',
        description: 'Vollständige Optimierung Ihres Google Unternehmensprofils für maximale lokale Sichtbarkeit.',
      },
      {
        icon: 'star',
        title: 'Bewertungsmanagement',
        description: 'Strategien für mehr positive Bewertungen und professionelles Review-Management.',
      },
      {
        icon: 'target',
        title: 'Lokale Keywords',
        description: '"Zahnarzt Wien 1010", "Restaurant Favoriten" – wir finden Ihre lokalen Suchbegriffe.',
      },
      {
        icon: 'globe',
        title: 'Citations & Verzeichnisse',
        description: 'Konsistente NAP-Daten in allen relevanten Branchenverzeichnissen.',
      },
    ],
    results: [
      { metric: '+300%', label: 'Lokale Sichtbarkeit', detail: 'Im Google 3-Pack' },
      { metric: '+85%', label: 'Mehr Anrufe', detail: 'Über Google Business' },
      { metric: 'Top 3', label: 'Local Pack', detail: 'Für Haupt-Keywords' },
    ],
    packages: [
      {
        name: 'Local Starter',
        price: '390',
        priceType: 'monatlich',
        description: 'Für 1 Standort.',
        popular: false,
        features: ['Google Business Optimierung', '10 lokale Keywords', 'Monatlicher Report', 'Bewertungs-Monitoring'],
      },
      {
        name: 'Local Business',
        price: '690',
        priceType: 'monatlich',
        description: 'Für aktives Wachstum.',
        popular: true,
        features: ['Alles aus Starter', '30 lokale Keywords', 'Citations Management', 'Bewertungs-Strategie', 'Lokaler Content'],
      },
      {
        name: 'Local Multi',
        price: '1.290',
        priceType: 'monatlich',
        description: 'Für mehrere Standorte.',
        popular: false,
        features: ['Bis zu 5 Standorte', 'Standort-spezifische Landingpages', 'Zentrale Verwaltung', 'Wettbewerber-Monitoring'],
      },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analyse Ihrer lokalen Präsenz.' },
      { step: '02', title: 'Google Business', description: 'Profil-Optimierung.' },
      { step: '03', title: 'Citations', description: 'Verzeichnis-Einträge.' },
      { step: '04', title: 'Reviews', description: 'Bewertungs-Strategie.' },
      { step: '05', title: 'Monitoring', description: 'Laufende Optimierung.' },
    ],
    technologies: ['Google Business Profile', 'BrightLocal', 'Yext', 'Moz Local'],
    faqs: [
      {
        question: 'Was ist Local SEO?',
        answer: 'Local SEO optimiert Ihre Online-Präsenz für lokale Suchanfragen wie "Friseur in meiner Nähe" oder "Steuerberater Wien 1010". Das Ziel: Im Google 3-Pack und in Google Maps vorne erscheinen.',
      },
      {
        question: 'Wie wichtig ist Google Business Profile?',
        answer: 'Extrem wichtig! 46% aller Google-Suchen haben lokale Intention. Ein optimiertes Google Business Profile ist der Schlüssel zu lokaler Sichtbarkeit.',
      },
      {
        question: 'Wie schnell sehe ich Ergebnisse?',
        answer: 'Google Business Optimierungen wirken oft innerhalb von 2-4 Wochen. Für nachhaltige lokale Rankings rechnen Sie mit 3-6 Monaten.',
      },
    ],
    relatedServices: [
      { title: 'On-Page SEO', description: 'Website-Optimierung.', href: '/leistungen/seo-content/on-page-optimierung' as any },
      { title: 'Content-Strategie', description: 'Lokaler Content.', href: '/leistungen/seo-content/content-strategie-produktion' as any },
      { title: 'SEO Wien', description: 'Alle SEO-Leistungen.', href: '/leistungen/seo' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Local SEO Pakete',
      pricingDescription: 'Lokal sichtbar werden.',
      faqTitle: 'Häufige Fragen zu Local SEO',
      ctaTitle: 'Lokal durchstarten?',
      ctaDescription: 'Kostenlose Local SEO Analyse.',
    },
  },
  en: {
    hero: {
      badge: 'Local SEO',
      title: 'Local SEO Vienna — Get Found Locally',
      description: 'Become visible in your region. Google Business Profile, local keywords and review management for more walk-in customers and local inquiries.',
      ctaPrimary: 'Request Local SEO',
      ctaSecondary: 'View Packages',
    },
    trustSignals: [
      { icon: 'map-pin', text: 'Local Expertise' },
      { icon: 'star', text: 'Google Partner' },
      { icon: 'clock', text: 'Fast Results' },
      { icon: 'shield', text: 'Proven Rankings' },
    ],
    benefits: [
      { icon: 'map-pin', title: 'Google Business Profile', description: 'Complete optimization of your Google Business Profile for maximum local visibility.' },
      { icon: 'star', title: 'Review Management', description: 'Strategies for more positive reviews and professional review management.' },
      { icon: 'target', title: 'Local Keywords', description: 'We find your local search terms and optimize for them.' },
      { icon: 'globe', title: 'Citations & Directories', description: 'Consistent NAP data in all relevant business directories.' },
    ],
    results: [
      { metric: '+300%', label: 'Local Visibility', detail: 'In Google 3-Pack' },
      { metric: '+85%', label: 'More Calls', detail: 'Via Google Business' },
    ],
    packages: [
      { name: 'Local Starter', price: '390', priceType: 'monthly', description: 'For 1 location.', popular: false, features: ['Google Business Optimization', '10 local keywords', 'Monthly report'] },
      { name: 'Local Business', price: '690', priceType: 'monthly', description: 'For active growth.', popular: true, features: ['Everything from Starter', '30 local keywords', 'Citations management', 'Review strategy'] },
      { name: 'Local Multi', price: '1,290', priceType: 'monthly', description: 'For multiple locations.', popular: false, features: ['Up to 5 locations', 'Location-specific landing pages', 'Central management'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analysis of your local presence.' },
      { step: '02', title: 'Google Business', description: 'Profile optimization.' },
      { step: '03', title: 'Citations', description: 'Directory listings.' },
      { step: '04', title: 'Reviews', description: 'Review strategy.' },
    ],
    technologies: ['Google Business Profile', 'BrightLocal', 'Moz Local'],
    faqs: [
      { question: 'What is Local SEO?', answer: 'Local SEO optimizes your online presence for local search queries. The goal: appear in the Google 3-Pack and Google Maps.' },
      { question: 'How important is Google Business Profile?', answer: 'Extremely important! 46% of all Google searches have local intent.' },
    ],
    relatedServices: [
      { title: 'On-Page SEO', description: 'Website optimization.', href: '/services/seo-content/on-page-optimization' as any },
      { title: 'SEO Vienna', description: 'All SEO services.', href: '/services/seo' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Local SEO Packages',
      faqTitle: 'Local SEO FAQ',
      ctaTitle: 'Go local?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/seo-content/local-seo'
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

export default async function LocalSeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: 'Local SEO',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/seo-content/local-seo',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'SEO & Content', url: locale === 'de' ? 'https://goldenwing.at/leistungen/seo-content' : 'https://goldenwing.at/en/services/seo-content' },
      { name: 'Local SEO', url: 'https://goldenwing.at/leistungen/seo-content/local-seo' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
