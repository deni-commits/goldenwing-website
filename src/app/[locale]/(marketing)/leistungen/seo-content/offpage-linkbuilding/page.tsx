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
    title: 'Link Building & OffPage SEO Wien | Backlinks aufbauen',
    description: 'OffPage SEO & Link Building Agentur Wien. Hochwertige Backlinks, Digital PR, Gastbeiträge. Mehr Domain-Autorität für bessere Rankings.',
    keywords: ['Link Building Wien', 'OffPage SEO Agentur', 'Backlinks aufbauen'],
  },
  en: {
    title: 'Link Building & OffPage SEO Vienna | Build Backlinks',
    description: 'OffPage SEO & link building agency Vienna. High-quality backlinks, digital PR, guest posts. More domain authority for better rankings.',
    keywords: ['Link Building Vienna', 'OffPage SEO Agency', 'Build Backlinks'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'OffPage SEO & Link Building',
      title: 'Link Building & OffPage SEO Wien',
      description: 'Hochwertige Backlinks für mehr Domain-Autorität. Digital PR, Gastbeiträge und strategischer Linkaufbau – nachhaltig und Google-konform.',
      ctaPrimary: 'Linkbuilding anfragen',
      ctaSecondary: 'Strategie besprechen',
    },
    trustSignals: [
      { icon: 'link', text: '1.000+ Links aufgebaut' },
      { icon: 'shield', text: 'White-Hat Only' },
      { icon: 'globe', text: 'DACH + International' },
      { icon: 'award', text: 'Premium Domains' },
    ],
    benefits: [
      {
        icon: 'link',
        title: 'Qualitäts-Backlinks',
        description: 'Nur Links von themenrelevanten Domains mit echtem Traffic und Autorität.',
      },
      {
        icon: 'edit',
        title: 'Digital PR',
        description: 'Pressearbeit und Erwähnungen in relevanten Online-Medien.',
      },
      {
        icon: 'users',
        title: 'Gastbeiträge',
        description: 'Hochwertige Artikel auf Branchen-Blogs und Fachportalen.',
      },
      {
        icon: 'shield',
        title: 'Risikofrei',
        description: '100% White-Hat Methoden. Keine PBNs, keine Spam-Links.',
      },
    ],
    results: [
      { metric: '+65%', label: 'Domain Rating', detail: 'Durchschnittliche Steigerung' },
      { metric: 'DR 50+', label: 'Link-Quellen', detail: 'Minimum Domain Rating' },
      { metric: '100%', label: 'White-Hat', detail: 'Nachhaltige Methoden' },
    ],
    packages: [
      {
        name: 'Link Starter',
        price: '790',
        priceType: 'monatlich',
        description: 'Für erste Autorität.',
        popular: false,
        features: ['5 Backlinks/Monat', 'DR 30+ Domains', 'Anchor-Text Strategie', 'Monatlicher Report'],
      },
      {
        name: 'Link Business',
        price: '1.490',
        priceType: 'monatlich',
        description: 'Für sichtbares Wachstum.',
        popular: true,
        features: ['10 Backlinks/Monat', 'DR 50+ Domains', 'Digital PR inkl.', 'Gastbeiträge', 'Wettbewerber-Analyse'],
      },
      {
        name: 'Link Enterprise',
        price: '2.990',
        priceType: 'monatlich',
        description: 'Für Marktführer.',
        popular: false,
        features: ['20+ Backlinks/Monat', 'DR 70+ Premium-Links', 'Medien-Outreach', 'Broken Link Building', 'Dedizierter Manager'],
      },
    ],
    process: [
      { step: '01', title: 'Analyse', description: 'Backlink-Profil & Wettbewerber.' },
      { step: '02', title: 'Strategie', description: 'Link-Ziele und Anchor-Texte.' },
      { step: '03', title: 'Outreach', description: 'Kontakt zu relevanten Seiten.' },
      { step: '04', title: 'Platzierung', description: 'Content-Erstellung & Veröffentlichung.' },
      { step: '05', title: 'Reporting', description: 'Monatliche Link-Reports.' },
    ],
    technologies: ['Ahrefs', 'Majestic', 'Pitchbox', 'Hunter.io'],
    faqs: [
      {
        question: 'Warum ist Link Building wichtig?',
        answer: 'Backlinks sind einer der Top-3 Ranking-Faktoren bei Google. Hochwertige Links von autoritären Domains signalisieren Vertrauen und verbessern Ihre Rankings nachhaltig.',
      },
      {
        question: 'Was ist White-Hat Link Building?',
        answer: 'White-Hat bedeutet Google-konforme Methoden: echte redaktionelle Erwähnungen, Gastbeiträge mit Mehrwert, Digital PR. Keine gekauften Links, keine PBNs, keine Spam-Taktiken.',
      },
      {
        question: 'Wie schnell wirken Backlinks?',
        answer: 'Die Wirkung von Backlinks zeigt sich typischerweise nach 4-8 Wochen. Für nachhaltigen Autoritätsaufbau empfehlen wir kontinuierliches Link Building über 6-12 Monate.',
      },
    ],
    relatedServices: [
      { title: 'Content-Strategie', description: 'Content für Linkbait.', href: '/leistungen/seo-content/content-strategie-produktion' as any },
      { title: 'On-Page SEO', description: 'Ihre Seiten optimieren.', href: '/leistungen/seo-content/on-page-optimierung' as any },
      { title: 'Technical SEO', description: 'Die technische Basis.', href: '/leistungen/seo-content/technical-seo' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Link Building Pakete',
      pricingDescription: 'Autorität aufbauen.',
      faqTitle: 'Häufige Fragen zu Link Building',
      ctaTitle: 'Autorität aufbauen?',
      ctaDescription: 'Kostenlose Backlink-Analyse.',
    },
  },
  en: {
    hero: {
      badge: 'OffPage SEO & Link Building',
      title: 'Link Building & OffPage SEO Vienna',
      description: 'High-quality backlinks for more domain authority. Digital PR, guest posts and strategic link building – sustainable and Google-compliant.',
      ctaPrimary: 'Request Link Building',
      ctaSecondary: 'Discuss Strategy',
    },
    trustSignals: [
      { icon: 'link', text: '1,000+ Links Built' },
      { icon: 'shield', text: 'White-Hat Only' },
      { icon: 'globe', text: 'DACH + International' },
      { icon: 'award', text: 'Premium Domains' },
    ],
    benefits: [
      { icon: 'link', title: 'Quality Backlinks', description: 'Only links from topically relevant domains with real traffic and authority.' },
      { icon: 'edit', title: 'Digital PR', description: 'Press work and mentions in relevant online media.' },
      { icon: 'users', title: 'Guest Posts', description: 'High-quality articles on industry blogs and portals.' },
      { icon: 'shield', title: 'Risk-Free', description: '100% white-hat methods. No PBNs, no spam links.' },
    ],
    results: [
      { metric: '+65%', label: 'Domain Rating', detail: 'Average increase' },
      { metric: 'DR 50+', label: 'Link Sources', detail: 'Minimum domain rating' },
    ],
    packages: [
      { name: 'Link Starter', price: '790', priceType: 'monthly', description: 'For initial authority.', popular: false, features: ['5 backlinks/month', 'DR 30+ domains', 'Anchor text strategy'] },
      { name: 'Link Business', price: '1,490', priceType: 'monthly', description: 'For visible growth.', popular: true, features: ['10 backlinks/month', 'DR 50+ domains', 'Digital PR incl.', 'Guest posts'] },
      { name: 'Link Enterprise', price: '2,990', priceType: 'monthly', description: 'For market leaders.', popular: false, features: ['20+ backlinks/month', 'DR 70+ premium links', 'Media outreach'] },
    ],
    process: [
      { step: '01', title: 'Analysis', description: 'Backlink profile & competitors.' },
      { step: '02', title: 'Strategy', description: 'Link goals and anchor texts.' },
      { step: '03', title: 'Outreach', description: 'Contact relevant sites.' },
      { step: '04', title: 'Placement', description: 'Content creation & publication.' },
    ],
    technologies: ['Ahrefs', 'Majestic', 'Pitchbox'],
    faqs: [
      { question: 'Why is link building important?', answer: 'Backlinks are one of the top 3 ranking factors at Google. Quality links from authoritative domains signal trust and sustainably improve your rankings.' },
      { question: 'What is white-hat link building?', answer: 'White-hat means Google-compliant methods: genuine editorial mentions, valuable guest posts, digital PR. No bought links, no PBNs, no spam tactics.' },
    ],
    relatedServices: [
      { title: 'Content Strategy', description: 'Content for linkbait.', href: '/services/seo-content/content-strategy-production' as any },
      { title: 'On-Page SEO', description: 'Optimize your pages.', href: '/services/seo-content/on-page-optimization' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Link Building Packages',
      faqTitle: 'Link Building FAQ',
      ctaTitle: 'Build authority?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/seo-content/offpage-linkbuilding'
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

export default async function OffpageLinkbuildingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'OffPage SEO & Link Building' : 'OffPage SEO & Link Building',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/seo-content/offpage-linkbuilding',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'SEO & Content', url: locale === 'de' ? 'https://goldenwing.at/leistungen/seo-content' : 'https://goldenwing.at/en/services/seo-content' },
      { name: 'Link Building', url: 'https://goldenwing.at/leistungen/seo-content/offpage-linkbuilding' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
