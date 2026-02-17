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
    title: 'On-Page SEO Optimierung Wien | Content & Meta Tags',
    description: 'On-Page SEO Agentur Wien. Title Tags, Meta Descriptions, Content-Optimierung, interne Verlinkung. Bessere Rankings durch optimierte Inhalte.',
    keywords: ['On-Page SEO Wien', 'SEO Optimierung', 'Meta Tags Optimierung'],
  },
  en: {
    title: 'On-Page SEO Optimization Vienna | Content & Meta Tags',
    description: 'On-page SEO agency Vienna. Title tags, meta descriptions, content optimization, internal linking. Better rankings through optimized content.',
    keywords: ['On-Page SEO Vienna', 'SEO Optimization', 'Meta Tags Optimization'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'On-Page SEO',
      title: 'On-Page SEO Optimierung Wien',
      description: 'Jede Seite Ihrer Website für Google optimiert. Title Tags, Meta Descriptions, Content-Struktur und interne Verlinkung – die Basis für Top-Rankings.',
      ctaPrimary: 'SEO-Audit anfragen',
      ctaSecondary: 'Pakete ansehen',
    },
    trustSignals: [
      { icon: 'check', text: '200+ Seiten optimiert' },
      { icon: 'trending-up', text: '+150% Rankings' },
      { icon: 'clock', text: 'Schnelle Ergebnisse' },
      { icon: 'shield', text: 'Google-konform' },
    ],
    benefits: [
      {
        icon: 'file-text',
        title: 'Meta-Optimierung',
        description: 'Title Tags und Meta Descriptions, die klicken und ranken.',
      },
      {
        icon: 'edit',
        title: 'Content-Optimierung',
        description: 'Keyword-optimierte Texte mit der richtigen Struktur (H1-H6).',
      },
      {
        icon: 'link',
        title: 'Interne Verlinkung',
        description: 'Strategische interne Links für bessere Crawlability und Link-Juice.',
      },
      {
        icon: 'image',
        title: 'Bild-SEO',
        description: 'Alt-Tags, Dateinamen und Komprimierung für alle Bilder.',
      },
    ],
    results: [
      { metric: '+180%', label: 'Organische Klicks', detail: 'Durch bessere CTR' },
      { metric: '+95%', label: 'Keywords in Top 20', detail: 'Nach Optimierung' },
      { metric: '-40%', label: 'Bounce Rate', detail: 'Durch besseren Content' },
    ],
    packages: [
      {
        name: 'OnPage Starter',
        price: '490',
        priceType: 'einmalig',
        description: 'Für kleine Websites.',
        popular: false,
        features: ['Bis zu 10 Seiten', 'Meta-Optimierung', 'H-Tag Struktur', 'Keyword-Mapping'],
      },
      {
        name: 'OnPage Business',
        price: '1.290',
        priceType: 'einmalig',
        description: 'Für größere Websites.',
        popular: true,
        features: ['Bis zu 50 Seiten', 'Content-Optimierung', 'Interne Verlinkung', 'Bild-SEO', 'Schema Markup'],
      },
      {
        name: 'OnPage Laufend',
        price: '590',
        priceType: 'monatlich',
        description: 'Kontinuierliche Optimierung.',
        popular: false,
        features: ['Unbegrenzte Seiten', 'Neue Inhalte optimieren', 'Monatliche Reports', 'Ranking-Monitoring', 'Wettbewerber-Check'],
      },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analyse aller Seiten.' },
      { step: '02', title: 'Keyword-Mapping', description: 'Ziel-Keywords pro Seite.' },
      { step: '03', title: 'Optimierung', description: 'Meta, Content, Struktur.' },
      { step: '04', title: 'Verlinkung', description: 'Interne Link-Strategie.' },
      { step: '05', title: 'Review', description: 'Qualitätskontrolle.' },
    ],
    technologies: ['Screaming Frog', 'Surfer SEO', 'Ahrefs', 'Google Search Console'],
    faqs: [
      {
        question: 'Was ist On-Page SEO?',
        answer: 'On-Page SEO umfasst alle Optimierungen direkt auf Ihrer Website: Title Tags, Meta Descriptions, Content, Überschriften, interne Links, Bilder und URL-Struktur.',
      },
      {
        question: 'Wie wichtig sind Meta Tags?',
        answer: 'Meta Tags (Title, Description) beeinflussen direkt Ihre Klickrate in den Suchergebnissen. Ein guter Title kann die CTR um 20-30% steigern – auch ohne bessere Position.',
      },
      {
        question: 'Einmalig oder laufend optimieren?',
        answer: 'Eine einmalige Grundoptimierung ist der erste Schritt. Für nachhaltigen Erfolg empfehlen wir laufende Optimierung, da Google-Algorithmen und Wettbewerber sich ständig ändern.',
      },
    ],
    relatedServices: [
      { title: 'Technical SEO', description: 'Die technische Basis.', href: '/leistungen/seo-content/technical-seo' as any },
      { title: 'Content-Strategie', description: 'Neue Inhalte erstellen.', href: '/leistungen/seo-content/content-strategie-produktion' as any },
      { title: 'Link Building', description: 'OffPage-Autorität.', href: '/leistungen/seo-content/offpage-linkbuilding' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'On-Page SEO Pakete',
      pricingDescription: 'Jede Seite optimiert.',
      faqTitle: 'Häufige Fragen zu On-Page SEO',
      ctaTitle: 'Seiten optimieren?',
      ctaDescription: 'Kostenloses SEO-Audit.',
    },
  },
  en: {
    hero: {
      badge: 'On-Page SEO',
      title: 'On-Page SEO Optimization Vienna',
      description: 'Every page of your website optimized for Google. Title tags, meta descriptions, content structure and internal linking – the foundation for top rankings.',
      ctaPrimary: 'Request SEO Audit',
      ctaSecondary: 'View Packages',
    },
    trustSignals: [
      { icon: 'check', text: '200+ Pages Optimized' },
      { icon: 'trending-up', text: '+150% Rankings' },
      { icon: 'clock', text: 'Fast Results' },
      { icon: 'shield', text: 'Google-Compliant' },
    ],
    benefits: [
      { icon: 'file-text', title: 'Meta Optimization', description: 'Title tags and meta descriptions that click and rank.' },
      { icon: 'edit', title: 'Content Optimization', description: 'Keyword-optimized texts with the right structure (H1-H6).' },
      { icon: 'link', title: 'Internal Linking', description: 'Strategic internal links for better crawlability and link juice.' },
      { icon: 'image', title: 'Image SEO', description: 'Alt tags, file names and compression for all images.' },
    ],
    results: [
      { metric: '+180%', label: 'Organic Clicks', detail: 'Through better CTR' },
      { metric: '+95%', label: 'Keywords in Top 20', detail: 'After optimization' },
    ],
    packages: [
      { name: 'OnPage Starter', price: '490', priceType: 'one-time', description: 'For small websites.', popular: false, features: ['Up to 10 pages', 'Meta optimization', 'H-tag structure'] },
      { name: 'OnPage Business', price: '1,290', priceType: 'one-time', description: 'For larger websites.', popular: true, features: ['Up to 50 pages', 'Content optimization', 'Internal linking', 'Image SEO'] },
      { name: 'OnPage Ongoing', price: '590', priceType: 'monthly', description: 'Continuous optimization.', popular: false, features: ['Unlimited pages', 'Optimize new content', 'Monthly reports'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analysis of all pages.' },
      { step: '02', title: 'Keyword Mapping', description: 'Target keywords per page.' },
      { step: '03', title: 'Optimization', description: 'Meta, content, structure.' },
      { step: '04', title: 'Linking', description: 'Internal link strategy.' },
    ],
    technologies: ['Screaming Frog', 'Surfer SEO', 'Ahrefs'],
    faqs: [
      { question: 'What is on-page SEO?', answer: 'On-page SEO includes all optimizations directly on your website: title tags, meta descriptions, content, headings, internal links, images and URL structure.' },
      { question: 'How important are meta tags?', answer: 'Meta tags (title, description) directly affect your click-through rate in search results. A good title can increase CTR by 20-30%.' },
    ],
    relatedServices: [
      { title: 'Technical SEO', description: 'The technical foundation.', href: '/services/seo-content/technical-seo' as any },
      { title: 'Content Strategy', description: 'Create new content.', href: '/services/seo-content/content-strategy-production' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'On-Page SEO Packages',
      faqTitle: 'On-Page SEO FAQ',
      ctaTitle: 'Optimize pages?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/seo-content/on-page-optimierung'
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

export default async function OnPageOptimierungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'On-Page SEO Optimierung' : 'On-Page SEO Optimization',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/seo-content/on-page-optimierung',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'SEO & Content', url: locale === 'de' ? 'https://goldenwing.at/leistungen/seo-content' : 'https://goldenwing.at/en/services/seo-content' },
      { name: 'On-Page SEO', url: 'https://goldenwing.at/leistungen/seo-content/on-page-optimierung' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
