 
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
    title: 'Online Marketing Agentur München | Google Ads, Social Media, SEO',
    description: 'Online Marketing Agentur für Münchner Unternehmen. Google Ads, Social Media Marketing, SEO. Performance-Marketing mit messbaren Ergebnissen.',
    keywords: ['Online Marketing Agentur München', 'Google Ads München', 'Social Media Marketing München'],
  },
  en: {
    title: 'Online Marketing Agency Munich | Google Ads, Social Media, SEO',
    description: 'Online marketing agency for Munich companies. Google Ads, social media marketing, SEO. Performance marketing with measurable results.',
    keywords: ['Online Marketing Agency Munich', 'Google Ads Munich', 'Social Media Marketing Munich'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Online Marketing Agentur München',
      title: 'Online Marketing Agentur München',
      description: 'Performance-Marketing für Bayerns Wirtschaftsmetropole. Google Ads, Social Media, SEO – messbare Ergebnisse für Münchner Unternehmen.',
      ctaPrimary: 'Marketing-Audit anfragen',
      ctaSecondary: 'Leistungen ansehen',
    },
    trustSignals: [
      { icon: 'trending-up', text: 'Ø +180% ROI' },
      { icon: 'award', text: 'Google Partner' },
      { icon: 'shield', text: 'Meta Partner' },
      { icon: 'clock', text: 'Wöchentliche Reports' },
    ],
    benefits: [
      {
        icon: 'target',
        title: 'Google Ads',
        description: 'Search, Display, Shopping, YouTube – wir holen das Maximum aus Ihrem Budget.',
      },
      {
        icon: 'users',
        title: 'Social Media Ads',
        description: 'Meta (Facebook/Instagram), LinkedIn, TikTok – zielgerichtete Werbung.',
      },
      {
        icon: 'search',
        title: 'SEO',
        description: 'Organische Sichtbarkeit für nachhaltiges Wachstum.',
      },
      {
        icon: 'bar-chart',
        title: 'Analytics & Tracking',
        description: 'Conversion-Tracking, Attribution, datenbasierte Optimierung.',
      },
    ],
    results: [
      { metric: '+180%', label: 'ROI', detail: 'Durchschnitt Paid Ads' },
      { metric: '-35%', label: 'CPA', detail: 'Kosten pro Akquisition' },
      { metric: '+250%', label: 'Lead-Wachstum', detail: 'Nach 6 Monaten' },
    ],
    packages: [
      {
        name: 'Marketing Starter',
        price: '990',
        priceType: 'monatlich',
        description: 'Für den Einstieg.',
        popular: false,
        features: ['1 Kanal (Google oder Social)', 'Bis €2.000 Ad Spend', 'Wöchentliche Optimierung', 'Monatlicher Report'],
      },
      {
        name: 'Marketing Business',
        price: '1.990',
        priceType: 'monatlich',
        description: 'Multi-Channel Marketing.',
        popular: true,
        features: ['Google Ads + Social Ads', 'Bis €10.000 Ad Spend', 'Conversion Tracking', 'A/B Testing', 'Wöchentliche Calls'],
      },
      {
        name: 'Marketing Enterprise',
        price: '3.990+',
        priceType: 'monatlich',
        description: 'Full-Service Performance.',
        popular: false,
        features: ['Alle Kanäle', 'Unbegrenzter Ad Spend', 'Dedizierter Manager', 'Custom Dashboards', 'Strategie-Workshops'],
      },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analyse bestehender Kampagnen.' },
      { step: '02', title: 'Strategie', description: 'Kanalauswahl und Budget.' },
      { step: '03', title: 'Setup', description: 'Kampagnen und Tracking.' },
      { step: '04', title: 'Optimierung', description: 'Laufende Performance-Steigerung.' },
      { step: '05', title: 'Skalierung', description: 'Profitable Kampagnen ausbauen.' },
    ],
    technologies: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4', 'Looker Studio'],
    faqs: [
      {
        question: 'Was kostet Online Marketing in München?',
        answer: 'Unsere Management-Fee beginnt bei €990/Monat. Dazu kommt Ihr Werbebudget. Für München empfehlen wir mindestens €2.000-5.000 Ad Spend für signifikante Ergebnisse.',
      },
      {
        question: 'Welcher Kanal ist der richtige?',
        answer: 'B2B: LinkedIn + Google Search. B2C/E-Commerce: Google Shopping + Meta. Lokale Dienstleister: Google Local + Reviews. Wir beraten individuell.',
      },
      {
        question: 'Wie schnell sehe ich Ergebnisse?',
        answer: 'Google Ads: Erste Daten nach 1-2 Wochen, Optimierung nach 4-6 Wochen. SEO: Erste Rankings nach 3-4 Monaten. Social Ads: Schnelle Tests möglich.',
      },
    ],
    relatedServices: [
      { title: 'SEO München', description: 'Organische Sichtbarkeit.', href: '/standorte/muenchen/seo' as any },
      { title: 'Webdesign München', description: 'Landing Pages.', href: '/standorte/muenchen/webdesign' as any },
      { title: 'Digitalagentur München', description: 'Alle Leistungen.', href: '/standorte/muenchen' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Online Marketing Pakete München',
      pricingDescription: 'Performance-Marketing mit ROI-Fokus.',
      faqTitle: 'Online Marketing München – Häufige Fragen',
      ctaTitle: 'Marketing für München starten?',
      ctaDescription: 'Kostenloses Marketing-Audit.',
    },
  },
  en: {
    hero: {
      badge: 'Online Marketing Agency Munich',
      title: 'Online Marketing Agency Munich',
      description: 'Performance marketing for Bavaria\'s economic metropolis. Google Ads, social media, SEO – measurable results for Munich companies.',
      ctaPrimary: 'Request Marketing Audit',
      ctaSecondary: 'View Services',
    },
    trustSignals: [
      { icon: 'trending-up', text: 'Avg +180% ROI' },
      { icon: 'award', text: 'Google Partner' },
      { icon: 'shield', text: 'Meta Partner' },
      { icon: 'clock', text: 'Weekly Reports' },
    ],
    benefits: [
      { icon: 'target', title: 'Google Ads', description: 'Search, Display, Shopping, YouTube – we maximize your budget.' },
      { icon: 'users', title: 'Social Media Ads', description: 'Meta (Facebook/Instagram), LinkedIn, TikTok – targeted advertising.' },
      { icon: 'search', title: 'SEO', description: 'Organic visibility for sustainable growth.' },
      { icon: 'bar-chart', title: 'Analytics & Tracking', description: 'Conversion tracking, attribution, data-driven optimization.' },
    ],
    results: [
      { metric: '+180%', label: 'ROI', detail: 'Average paid ads' },
      { metric: '-35%', label: 'CPA', detail: 'Cost per acquisition' },
    ],
    packages: [
      { name: 'Marketing Starter', price: '990', priceType: 'monthly', description: 'For getting started.', popular: false, features: ['1 channel (Google or Social)', 'Up to €2,000 ad spend', 'Weekly optimization'] },
      { name: 'Marketing Business', price: '1,990', priceType: 'monthly', description: 'Multi-channel marketing.', popular: true, features: ['Google Ads + Social Ads', 'Up to €10,000 ad spend', 'Conversion tracking', 'A/B testing'] },
      { name: 'Marketing Enterprise', price: '3,990+', priceType: 'monthly', description: 'Full-service performance.', popular: false, features: ['All channels', 'Unlimited ad spend', 'Dedicated manager'] },
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Analyze existing campaigns.' },
      { step: '02', title: 'Strategy', description: 'Channel selection and budget.' },
      { step: '03', title: 'Setup', description: 'Campaigns and tracking.' },
      { step: '04', title: 'Optimization', description: 'Ongoing performance improvement.' },
    ],
    technologies: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4'],
    faqs: [
      { question: 'What does online marketing cost in Munich?', answer: 'Our management fee starts at €990/month. Plus your advertising budget. For Munich, we recommend at least €2,000-5,000 ad spend for significant results.' },
      { question: 'Which channel is right?', answer: 'B2B: LinkedIn + Google Search. B2C/E-Commerce: Google Shopping + Meta. We advise individually.' },
    ],
    relatedServices: [
      { title: 'SEO Munich', description: 'Organic visibility.', href: '/locations/munich/seo' as any },
      { title: 'Digital Agency Munich', description: 'All services.', href: '/locations/munich' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Online Marketing Packages Munich',
      faqTitle: 'Online Marketing Munich – FAQ',
      ctaTitle: 'Start marketing for Munich?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/muenchen/online-marketing')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/muenchen/online-marketing', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortMuenchenOnlineMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Online Marketing Agentur München' : 'Online Marketing Agency Munich',
    cityName: 'München',
    cityType: 'City',
    url: '/standorte/muenchen/online-marketing',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.at/standorte' },
      { name: 'München', url: 'https://goldenwing.at/standorte/muenchen' },
      { name: 'Online Marketing', url: 'https://goldenwing.at/standorte/muenchen/online-marketing' },
    ],
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitalagentur München', href: '/standorte/muenchen' },
        { text: 'Online Marketing Leistungen', href: '/leistungen/online-marketing' },
        { text: 'Google Ads Guide', href: '/wissen/guides/google-ads' },
      ]
    : [
        { text: 'Digital Agency Munich', href: '/locations/munich' },
        { text: 'Online Marketing Services', href: '/services/online-marketing' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
