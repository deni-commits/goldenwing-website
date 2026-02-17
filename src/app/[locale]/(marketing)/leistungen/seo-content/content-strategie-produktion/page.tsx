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
    title: 'Content-Strategie & Produktion Wien | SEO-Content Agentur',
    description: 'Content-Strategie & Produktion für SEO in Wien. Keyword-optimierte Texte, Blog-Artikel, Landingpages. Mehr organischer Traffic durch strategischen Content.',
    keywords: ['Content-Strategie Wien', 'SEO Content Produktion', 'Content Marketing Agentur'],
  },
  en: {
    title: 'Content Strategy & Production Vienna | SEO Content Agency',
    description: 'Content strategy & production for SEO in Vienna. Keyword-optimized texts, blog articles, landing pages. More organic traffic through strategic content.',
    keywords: ['Content Strategy Vienna', 'SEO Content Production', 'Content Marketing Agency'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Content-Strategie & Produktion',
      title: 'Content-Strategie & Produktion Wien',
      description: 'Strategischer Content, der rankt und konvertiert. Von der Keyword-Recherche bis zum fertigen Text – wir produzieren SEO-optimierte Inhalte, die Ihre Zielgruppe erreichen.',
      ctaPrimary: 'Content-Strategie anfragen',
      ctaSecondary: 'Leistungen ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '500+ Artikel produziert' },
      { icon: 'globe', text: 'DE + EN Content' },
      { icon: 'clock', text: 'Schnelle Lieferung' },
      { icon: 'shield', text: 'SEO-optimiert' },
    ],
    benefits: [
      {
        icon: 'target',
        title: 'Keyword-Strategie',
        description: 'Datenbasierte Keyword-Recherche für maximale Sichtbarkeit.',
      },
      {
        icon: 'edit',
        title: 'Professionelle Texte',
        description: 'SEO-optimierte Texte von erfahrenen Content-Writern.',
      },
      {
        icon: 'layers',
        title: 'Content-Planung',
        description: 'Redaktionsplan und Content-Kalender für kontinuierliches Wachstum.',
      },
      {
        icon: 'trending-up',
        title: 'Performance-Tracking',
        description: 'Monatliche Reports mit Rankings und Traffic-Entwicklung.',
      },
    ],
    results: [
      { metric: '+180%', label: 'Organischer Traffic', detail: 'Durchschnitt nach 6 Monaten' },
      { metric: '50+', label: 'Keywords in Top 10', detail: 'Pro Kunde' },
      { metric: '4.8/5', label: 'Kundenzufriedenheit', detail: 'Durchschnittliche Bewertung' },
    ],
    packages: [
      {
        name: 'Content Starter',
        price: '490',
        priceType: 'monatlich',
        description: 'Für den Einstieg.',
        popular: false,
        features: ['2 Blog-Artikel/Monat', 'Keyword-Recherche', 'SEO-Optimierung', 'Bildrecherche'],
      },
      {
        name: 'Content Business',
        price: '990',
        priceType: 'monatlich',
        description: 'Für kontinuierliches Wachstum.',
        popular: true,
        features: ['4 Blog-Artikel/Monat', 'Content-Strategie', 'Landingpages', 'Monatlicher Report', 'Social Media Snippets'],
      },
      {
        name: 'Content Enterprise',
        price: '1.990',
        priceType: 'monatlich',
        description: 'Full-Service Content.',
        popular: false,
        features: ['8+ Artikel/Monat', 'Pillar Pages', 'Content Cluster', 'Video Scripts', 'Dedizierter Redakteur'],
      },
    ],
    process: [
      { step: '01', title: 'Analyse', description: 'Wettbewerb, Keywords, Zielgruppe.' },
      { step: '02', title: 'Strategie', description: 'Content-Plan und Themencluster.' },
      { step: '03', title: 'Produktion', description: 'SEO-optimierte Texte.' },
      { step: '04', title: 'Optimierung', description: 'Laufende Performance-Verbesserung.' },
    ],
    technologies: ['Ahrefs', 'SEMrush', 'Surfer SEO', 'Google Search Console'],
    faqs: [
      {
        question: 'Was ist eine Content-Strategie?',
        answer: 'Eine Content-Strategie definiert, welche Inhalte für welche Zielgruppe zu welchem Zeitpunkt erstellt werden – basierend auf Keyword-Daten und Geschäftszielen.',
      },
      {
        question: 'Wie lange dauert es bis Content rankt?',
        answer: 'Neue Artikel ranken typischerweise nach 3-6 Monaten. Mit einer durchdachten Strategie und internem Linking kann dies beschleunigt werden.',
      },
      {
        question: 'Schreiben Sie auch auf Englisch?',
        answer: 'Ja, wir produzieren Content auf Deutsch und Englisch – auch für internationale Märkte.',
      },
    ],
    relatedServices: [
      { title: 'SEO-Optimierung', description: 'On-Page SEO für Ihre Inhalte.', href: '/leistungen/seo-content/on-page-optimierung' as any },
      { title: 'Technical SEO', description: 'Die technische Basis.', href: '/leistungen/seo-content/technical-seo' as any },
      { title: 'Link Building', description: 'Autorität aufbauen.', href: '/leistungen/seo-content/offpage-linkbuilding' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Content-Pakete',
      pricingDescription: 'Skalierbare Content-Produktion.',
      faqTitle: 'Häufige Fragen zu Content-Strategie',
      ctaTitle: 'Content, der rankt?',
      ctaDescription: 'Lassen Sie uns Ihre Content-Strategie besprechen.',
    },
  },
  en: {
    hero: {
      badge: 'Content Strategy & Production',
      title: 'Content Strategy & Production Vienna',
      description: 'Strategic content that ranks and converts. From keyword research to finished text – we produce SEO-optimized content that reaches your target audience.',
      ctaPrimary: 'Request Content Strategy',
      ctaSecondary: 'View Services',
    },
    trustSignals: [
      { icon: 'award', text: '500+ Articles Produced' },
      { icon: 'globe', text: 'DE + EN Content' },
      { icon: 'clock', text: 'Fast Delivery' },
      { icon: 'shield', text: 'SEO-Optimized' },
    ],
    benefits: [
      { icon: 'target', title: 'Keyword Strategy', description: 'Data-driven keyword research for maximum visibility.' },
      { icon: 'edit', title: 'Professional Texts', description: 'SEO-optimized texts from experienced content writers.' },
      { icon: 'layers', title: 'Content Planning', description: 'Editorial calendar for continuous growth.' },
      { icon: 'trending-up', title: 'Performance Tracking', description: 'Monthly reports with rankings and traffic development.' },
    ],
    results: [
      { metric: '+180%', label: 'Organic Traffic', detail: 'Average after 6 months' },
      { metric: '50+', label: 'Keywords in Top 10', detail: 'Per client' },
    ],
    packages: [
      { name: 'Content Starter', price: '490', priceType: 'monthly', description: 'For getting started.', popular: false, features: ['2 blog articles/month', 'Keyword research', 'SEO optimization'] },
      { name: 'Content Business', price: '990', priceType: 'monthly', description: 'For continuous growth.', popular: true, features: ['4 blog articles/month', 'Content strategy', 'Landing pages', 'Monthly report'] },
      { name: 'Content Enterprise', price: '1,990', priceType: 'monthly', description: 'Full-service content.', popular: false, features: ['8+ articles/month', 'Pillar pages', 'Content clusters', 'Dedicated editor'] },
    ],
    process: [
      { step: '01', title: 'Analysis', description: 'Competition, keywords, audience.' },
      { step: '02', title: 'Strategy', description: 'Content plan and topic clusters.' },
      { step: '03', title: 'Production', description: 'SEO-optimized texts.' },
      { step: '04', title: 'Optimization', description: 'Ongoing performance improvement.' },
    ],
    technologies: ['Ahrefs', 'SEMrush', 'Surfer SEO', 'Google Search Console'],
    faqs: [
      { question: 'What is a content strategy?', answer: 'A content strategy defines what content to create for which audience and when – based on keyword data and business goals.' },
      { question: 'How long until content ranks?', answer: 'New articles typically rank after 3-6 months. With a thoughtful strategy and internal linking, this can be accelerated.' },
    ],
    relatedServices: [
      { title: 'SEO Optimization', description: 'On-page SEO for your content.', href: '/services/seo-content/on-page-optimization' as any },
      { title: 'Technical SEO', description: 'The technical foundation.', href: '/services/seo-content/technical-seo' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Content Packages',
      faqTitle: 'Content Strategy FAQ',
      ctaTitle: 'Content that ranks?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/seo-content/content-strategie-produktion'
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

export default async function ContentStrategieProduktionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Content-Strategie & Produktion' : 'Content Strategy & Production',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/seo-content/content-strategie-produktion',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'SEO & Content', url: locale === 'de' ? 'https://goldenwing.at/leistungen/seo-content' : 'https://goldenwing.at/en/services/seo-content' },
      { name: locale === 'de' ? 'Content-Strategie' : 'Content Strategy', url: 'https://goldenwing.at/leistungen/seo-content/content-strategie-produktion' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
