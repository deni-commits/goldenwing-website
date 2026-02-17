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
    title: 'Digital Marketing Agentur Dubai | SEO, SEM, Social Media',
    description: 'Digital Marketing für Unternehmen in Dubai & VAE. SEO, Google Ads, Social Media, Content Marketing. Messbarer ROI. Büro in Dubai mit MENA-Expertise.',
    keywords: ['Digital Marketing Agentur Dubai', 'Online Marketing Dubai', 'Digital Agency Dubai', 'Marketing Agentur UAE'],
  },
  en: {
    title: 'Digital Marketing Agency Dubai | SEO, SEM, Social Media',
    description: 'Digital marketing for businesses in Dubai & UAE. SEO, Google Ads, social media, content marketing. Measurable ROI. Office in Dubai with MENA expertise.',
    keywords: ['Digital Marketing Agency Dubai', 'Online Marketing Dubai', 'Digital Agency Dubai', 'Marketing Agency UAE'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'Digital Marketing Agentur Dubai',
      title: 'Digital Marketing Agentur Dubai',
      description: 'Integriertes Digital Marketing mit MENA-Expertise. SEO, Google Ads, Social Media, Content – alles aus einer Hand, um Ihre Online-Präsenz auszubauen.',
      ctaPrimary: 'Beratungsgespräch buchen',
      ctaSecondary: 'Case Studies ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '50+ erfolgreiche Kampagnen' },
      { icon: 'globe', text: 'MENA & International' },
      { icon: 'trendingUp', text: 'Ø +250% Traffic-Wachstum' },
      { icon: 'mapPin', text: 'Büro in Dubai' },
    ],
    benefits: [
      {
        icon: 'search',
        title: 'SEO für MENA-Märkte',
        description: 'Suchmaschinenoptimierung in Deutsch, Englisch und Arabisch. Wir verstehen lokale Suchtrends und Wettbewerb in der Region.',
      },
      {
        icon: 'zap',
        title: 'Google Ads & SEM',
        description: 'Sofort sichtbar mit Google Werbung. Search, Shopping, Display – wir optimieren jeden Dirham für maximale Conversions.',
      },
      {
        icon: 'share2',
        title: 'Social Media Marketing',
        description: 'Facebook, Instagram, TikTok, LinkedIn – genau da, wo Ihre Zielgruppe ist. Inhalte, die funktionieren und engagieren.',
      },
      {
        icon: 'fileText',
        title: 'Content Marketing',
        description: 'Inhalte, die ranken UND konvertieren. Blog-Artikel, Whitepapers, Video – für Suchmaschinen und Ihre Zielgruppe.',
      },
    ],
    packages: [
      {
        name: 'Starter Digital',
        price: '2.000',
        priceType: 'pro Monat',
        description: 'Für kleine Unternehmen mit lokaler Reichweite.',
        popular: false,
        features: [
          'SEO-Grundoptimierung',
          'Google Ads-Kampagne (€500 Budget)',
          'Social Media Management (1 Kanal)',
          'Monatliches Reporting',
          'E-Mail Support',
        ],
      },
      {
        name: 'Business Digital',
        price: '4.500',
        priceType: 'pro Monat',
        description: 'Für wachsende Unternehmen in der MENA-Region.',
        popular: true,
        features: [
          'SEO mit Keyword-Strategie',
          'Google Ads (€1.500 Budget)',
          'Social Media (3 Kanäle)',
          '2 Content-Artikel/Monat',
          'Conversion-Optimierung',
          'Wöchentliche Reports',
        ],
      },
      {
        name: 'Premium Digital',
        price: '8.000',
        priceType: 'pro Monat',
        description: 'Für ambitionierte Unternehmen mit regionalem Wachstum.',
        popular: false,
        features: [
          'Alles aus Business+',
          'Google Ads (€3.000+ Budget)',
          'Unbegrenzte Kanäle',
          '4 Content-Artikel/Monat',
          'Dedizierter Ansprechpartner',
          'Wöchentliche Calls',
          'A/B Testing & Optimierung',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Analyse', description: 'Wettbewerbs- und Marktanalyse in der MENA-Region.' },
      { step: '02', title: 'Strategie', description: 'Digital-Strategie mit lokalen und internationalen Kanälen.' },
      { step: '03', title: 'Umsetzung', description: 'Kampagnen-Setup, Content-Erstellung, Anzeichen-Launch.' },
      { step: '04', title: 'Optimierung', description: 'Kontinuierliche Verbesserung basierend auf echten Daten.' },
      { step: '05', title: 'Skalierung', description: 'Erfolgreiches Scaling in neue Märkte und Kanäle.' },
    ],
    technologies: ['Google Search Console', 'Google Analytics 4', 'Meta Business Suite', 'SEMrush', 'Ahrefs', 'Google Ads'],
    faqs: [
      {
        question: 'Wie lange dauert es, bis Digital Marketing wirkt?',
        answer: 'SEO: 3-6 Monate für erste Ergebnisse. Google Ads: sofort. Social Media: 2-4 Wochen für erste Engagement. Wir messen alles transparent.',
      },
      {
        question: 'Warum ist MENA-Expertise wichtig?',
        answer: 'Der arabische Markt funktioniert anders. Andere Keywords, andere Plattformen, andere Inhalte. Wir verstehen die lokale Kultur und Suchverhalten.',
      },
      {
        question: 'Könnt ihr mehrsprachige Kampagnen managen?',
        answer: 'Ja! SEO und Ads in Deutsch, Englisch und Arabisch. Wir haben Teams, die die lokalen Märkte verstehen.',
      },
      {
        question: 'Wo beginnen wir – mit SEO oder Ads?',
        answer: 'Das hängt von Ihren Zielen ab. Neue Websites: erst Ads für schnelle Traction, dann SEO aufbauen. Bestehende Websites: SEO optimieren, Ads dazu.',
      },
      {
        question: 'Garantiert ihr Rankings oder Conversions?',
        answer: 'Nein. Aber wir garantieren professionelle Arbeit, transparente Reports und konstante Optimierung. Keine Zauberformeln – nur echte Arbeit.',
      },
    ],
    relatedServices: [
      { title: 'SEO Dubai', description: 'Organische Sichtbarkeit aufbauen.', href: '/standorte/dubai/seo' as any },
      { title: 'Webdesign Dubai', description: 'Websites, optimiert für Marketing.', href: '/standorte/dubai/webdesign' as any },
      { title: 'E-Commerce Dubai', description: 'Online-Shops mit Marketing-Fokus.', href: '/standorte/dubai/ecommerce' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'Digital Marketing Pakete Dubai',
      pricingDescription: 'Transparente Preise mit nachgewiesenen Ergebnissen!',
      processTitle: 'Unser Digital Marketing Prozess',
      processSubtitle: 'Von der Analyse zur skalierender Kampagne.',
      faqTitle: 'Digital Marketing Dubai – Häufige Fragen',
      faqSubtitle: 'Alles rund um Online Marketing in der MENA-Region.',
      ctaTitle: 'Online präsent sein?',
      ctaDescription: 'Kostenloses Strategiegespräch mit unserem Dubai-Team.',
    },
  },
  en: {
    hero: {
      badge: 'Digital Marketing Agency Dubai',
      title: 'Digital Marketing Agency Dubai',
      description: 'Integrated digital marketing with MENA expertise. SEO, Google Ads, social media, content – everything from one agency to boost your online presence.',
      ctaPrimary: 'Book Consultation',
      ctaSecondary: 'View Case Studies',
    },
    trustSignals: [
      { icon: 'award', text: '50+ Successful Campaigns' },
      { icon: 'globe', text: 'MENA & International' },
      { icon: 'trendingUp', text: 'Avg +250% Traffic Growth' },
      { icon: 'mapPin', text: 'Office in Dubai' },
    ],
    benefits: [
      { icon: 'search', title: 'SEO for MENA Markets', description: 'Search engine optimization in German, English, and Arabic. We understand local search trends and regional competition.' },
      { icon: 'zap', title: 'Google Ads & SEM', description: 'Instant visibility with Google advertising. Search, shopping, display – every dirham optimized for maximum conversions.' },
      { icon: 'share2', title: 'Social Media Marketing', description: 'Facebook, Instagram, TikTok, LinkedIn – where your audience is. Content that engages and converts.' },
      { icon: 'fileText', title: 'Content Marketing', description: 'Content that ranks AND converts. Blog articles, whitepapers, video – for search engines and your audience.' },
    ],
    packages: [
      { name: 'Starter Digital', price: '2,000', priceType: 'per month', description: 'For small businesses with local reach.', popular: false, features: ['Basic SEO', 'Google Ads (€500 budget)', 'Social Media (1 channel)', 'Monthly Reporting'] },
      { name: 'Business Digital', price: '4,500', priceType: 'per month', description: 'For growing MENA businesses.', popular: true, features: ['SEO with keyword strategy', 'Google Ads (€1,500 budget)', 'Social Media (3 channels)', '2 articles/month', 'Weekly Reports'] },
      { name: 'Premium Digital', price: '8,000', priceType: 'per month', description: 'For ambitious regional businesses.', popular: false, features: ['Everything in Business+', 'Google Ads (€3,000+ budget)', 'All channels', '4 articles/month', 'Dedicated manager', 'Weekly calls'] },
    ],
    process: [
      { step: '01', title: 'Analysis', description: 'Competitive and market analysis in the MENA region.' },
      { step: '02', title: 'Strategy', description: 'Digital strategy with local and international channels.' },
      { step: '03', title: 'Implementation', description: 'Campaign setup, content creation, ads launch.' },
      { step: '04', title: 'Optimization', description: 'Continuous improvement based on real data.' },
      { step: '05', title: 'Scaling', description: 'Successful scaling into new markets and channels.' },
    ],
    technologies: ['Google Search Console', 'Google Analytics 4', 'Meta Business Suite', 'SEMrush', 'Ahrefs', 'Google Ads'],
    faqs: [
      { question: 'How long until digital marketing shows results?', answer: 'SEO: 3-6 months for first results. Google Ads: immediate. Social: 2-4 weeks for engagement. We track everything transparently.' },
      { question: 'Why is MENA expertise important?', answer: 'The Arabic market works differently. Different keywords, platforms, content. We understand local culture and search behavior.' },
      { question: 'Can you manage multilingual campaigns?', answer: 'Yes! SEO and ads in German, English, and Arabic. We have teams that understand local markets.' },
      { question: 'Should we start with SEO or ads?', answer: 'Depends on your goals. New websites: ads for quick traction, then build SEO. Existing sites: optimize SEO, add ads.' },
    ],
    relatedServices: [
      { title: 'SEO Dubai', description: 'Build organic visibility.', href: '/standorte/dubai/seo' as any },
      { title: 'Web Design Dubai', description: 'Websites optimized for marketing.', href: '/standorte/dubai/webdesign' as any },
      { title: 'E-Commerce Dubai', description: 'Online shops with marketing focus.', href: '/standorte/dubai/ecommerce' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'Digital Marketing Packages Dubai',
      pricingDescription: 'Transparent prices with proven results!',
      processTitle: 'Our Digital Marketing Process',
      processSubtitle: 'From analysis to scaling campaigns.',
      faqTitle: 'Digital Marketing Dubai – FAQ',
      faqSubtitle: 'Everything about online marketing in the MENA region.',
      ctaTitle: 'Be Online?',
      ctaDescription: 'Free strategy consultation with our Dubai team.',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/dubai/digital-marketing')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/dubai/digital-marketing', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortDubaiDigitalMarketingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'Digital Marketing Agentur Dubai' : 'Digital Marketing Agency Dubai',
    cityName: 'Dubai',
    cityType: 'City',
    url: '/standorte/dubai/digital-marketing',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.ae' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.ae/standorte' },
      { name: 'Dubai', url: 'https://goldenwing.ae/standorte/dubai' },
      { name: 'Digital Marketing', url: 'https://goldenwing.ae/standorte/dubai/digital-marketing' },
    ],
    localBusiness: dubaiLocalBusiness,
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'Digitales Marketing', href: '/leistungen/digitales-marketing' },
        { text: 'SEO Agentur', href: '/leistungen/seo' },
        { text: 'Google Ads Agentur', href: '/leistungen/google-ads' },
      ]
    : [
        { text: 'Digital Marketing Services', href: '/services/digital-marketing' },
        { text: 'SEO Agency', href: '/services/seo' },
        { text: 'Google Ads Services', href: '/services/google-ads' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
