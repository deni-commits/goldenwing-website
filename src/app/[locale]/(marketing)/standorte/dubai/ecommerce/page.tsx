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
    title: 'E-Commerce Agentur Dubai | Online Shops für VAE',
    description: 'E-Commerce-Entwicklung in Dubai. Shopify, WooCommerce, Custom Shops. VAE-Zahlungen (COD, Tabby), lokale Logistik, EN/AR-Support. Büro in Dubai.',
    keywords: ['E-Commerce Agentur Dubai', 'Online Shop Dubai', 'Shopify Dubai', 'E-Commerce Entwicklung'],
  },
  en: {
    title: 'E-Commerce Agency Dubai | Online Shops for UAE',
    description: 'E-commerce development in Dubai. Shopify, WooCommerce, custom shops. UAE payments (COD, Tabby), local logistics, EN/AR support. Office in Dubai.',
    keywords: ['E-Commerce Agency Dubai', 'Online Shop Dubai', 'Shopify Dubai', 'E-Commerce Development'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'E-Commerce Agentur Dubai',
      title: 'E-Commerce Agentur Dubai',
      description: 'Online-Shops, die im VAE-Markt verkaufen. Mit lokalen Zahlungsmethoden, Versand-Integration und kultureller Anpassung. Von unserem Büro in Dubai.',
      ctaPrimary: 'Shop anfragen',
      ctaSecondary: 'Preise ansehen',
    },
    trustSignals: [
      { icon: 'award', text: '30+ E-Commerce Projekte' },
      { icon: 'star', text: 'COD & Tabby integriert' },
      { icon: 'globe', text: 'EN/AR vollständig' },
      { icon: 'mapPin', text: 'Büro in Dubai' },
    ],
    benefits: [
      {
        icon: 'zap',
        title: 'VAE-Zahlungen',
        description: 'Cash on Delivery (COD), Tabby (Buy Now Pay Later), Apple Pay, Kreditkarten, lokale Payment-Gateways – alle Zahlungsarten für maximale Conversions.',
      },
      {
        icon: 'shield',
        title: 'Versand-Integration',
        description: 'Aramex, Fetchr, Quiqup, DHL – direkt angebunden. Echtzeit-Tracking, automatische Label-Generierung, Retouren-Management.',
      },
      {
        icon: 'globe',
        title: 'Zweisprachig EN/AR',
        description: 'Vollständige E-Commerce-Lösungen in Englisch und Arabisch. Korrekte RTL-Unterstützung, separate Produktbeschreibungen, kulturelle Anpassung.',
      },
      {
        icon: 'barChart3',
        title: 'Conversion-optimiert',
        description: 'Große Größentabellen, detaillierte Produktfotos, Kundenreviews, einfacher Checkout. Wir minimieren Retouren und maximieren Umsatz.',
      },
    ],
    packages: [
      {
        name: 'Starter Shop',
        price: '8.500',
        priceType: 'einmalig',
        description: 'Für den Start mit bis zu 50 Produkten.',
        popular: false,
        features: [
          'Shopify oder WooCommerce',
          'Bis zu 50 Produkte',
          'Responsive Design',
          'Payment-Setup (COD, Karten)',
          'Versand-Integration',
          'SSL & Security',
          'Kickoff Support',
        ],
      },
      {
        name: 'Business Shop',
        price: '16.500',
        priceType: 'einmalig',
        description: 'Für wachsende Händler mit unbegrenzt Produkten.',
        popular: true,
        features: [
          'Alles aus Starter+',
          'Unbegrenzte Produkte',
          'Zweisprachig (EN/AR)',
          'Erweiterte Filter & Suche',
          'Kundenkonten & Wishlist',
          'Newsletter Integration',
          'Inventory Management',
          '3 Monate Support',
        ],
      },
      {
        name: 'Enterprise Shop',
        price: '35.000+',
        priceType: 'einmalig',
        description: 'Maßgeschneidert für große Handelsbetriebe.',
        popular: false,
        features: [
          'Custom Development',
          'Multi-Warehouse Support',
          'ERP-Integration',
          'Advanced Analytics',
          'B2B-Features',
          'API-Entwicklung',
          'Laufende Betreuung',
          'Dediziertes Team',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Anforderungen', description: 'Analyse Ihrer Produkte, Zielgruppe, lokale Zahlungsanforderungen.' },
      { step: '02', title: 'Plattformwahl', description: 'Shopify für schnellen Start, WooCommerce für Individualisierung, oder Custom für Spezialfälle.' },
      { step: '03', title: 'Design & UX', description: 'Conversion-optimiertes Shop-Design für VAE-Konsumenten.' },
      { step: '04', title: 'Integrationen', description: 'Payment, Versand, Inventory – alles gekoppelt und automatisiert.' },
      { step: '05', title: 'Launch & Training', description: 'Go-Live, Team-Einweisung, Verkaufsoptimierung.' },
    ],
    technologies: ['Shopify', 'WooCommerce', 'Custom Next.js Commerce', 'Stripe', 'Tabby API', 'Aramex', 'Fetchr', 'Google Analytics 4'],
    faqs: [
      {
        question: 'Welche E-Commerce-Plattformen empfehlt ihr?',
        answer: 'Shopify: einfach, schnell, alle Payment-Gateways. WooCommerce: mehr Kontrolle, flexibler, günstiger Hosting. Custom: für spezielle Anforderungen und hohe Transaktionsmengen.',
      },
      {
        question: 'Unterstützt ihr lokale Zahlungsmethoden wie COD?',
        answer: 'Ja! Wir integrieren Cash on Delivery, Tabby, Kreditkarten, Apple Pay und lokale Payment-Gateways. Alle gängigen Methoden für die VAE.',
      },
      {
        question: 'Wie steht es um Versand und Logistik?',
        answer: 'Wir integrieren Aramex, Fetchr, Quiqup, DHL für nahtlose Logistik mit Echtzeit-Tracking und automatischer Label-Generierung.',
      },
      {
        question: 'Könnt ihr zweisprachige Shops (EN/AR) erstellen?',
        answer: 'Absolut! Vollständig zweisprachige E-Commerce mit korrekter RTL-Unterstützung, separaten Beschreibungen und kultureller Anpassung.',
      },
      {
        question: 'Wie geht ihr mit hohem Retourenaufkommen um?',
        answer: 'Große Größentabellen, hochwertige Fotos, detaillierte Beschreibungen, Kundenreviews, einfacher Rückgabeprozess. Prävention statt Reparatur.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign Dubai', description: 'Corporate Websites für Dubai.', href: '/standorte/dubai/webdesign' as any },
      { title: 'Digital Marketing Dubai', description: 'Traffic für Ihren Shop.', href: '/standorte/dubai/digital-marketing' as any },
      { title: 'SEO Dubai', description: 'Sichtbarkeit für Produkte.', href: '/standorte/dubai/seo' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'E-Commerce Pakete Dubai',
      pricingDescription: 'Shops, optimiert für den VAE-Markt!',
      processTitle: 'Unser E-Commerce Prozess',
      processSubtitle: 'Vom Konzept zum verkaufenden Online-Shop.',
      faqTitle: 'E-Commerce Dubai – Häufige Fragen',
      faqSubtitle: 'Alles rund um Online-Shops in der MENA-Region.',
      ctaTitle: 'Online verkaufen?',
      ctaDescription: 'Kostenloses Strategiegespräch für Ihren Shop.',
    },
  },
  en: {
    hero: {
      badge: 'E-Commerce Agency Dubai',
      title: 'E-Commerce Agency Dubai',
      description: 'Online shops that sell in the UAE market. With local payment methods, shipping integration, and cultural adaptation. From our Dubai office.',
      ctaPrimary: 'Request Shop',
      ctaSecondary: 'View Pricing',
    },
    trustSignals: [
      { icon: 'award', text: '30+ E-Commerce Projects' },
      { icon: 'star', text: 'COD & Tabby Integrated' },
      { icon: 'globe', text: 'EN/AR Complete' },
      { icon: 'mapPin', text: 'Office in Dubai' },
    ],
    benefits: [
      { icon: 'zap', title: 'UAE Payments', description: 'Cash on Delivery, Tabby, Apple Pay, credit cards, local gateways – all methods for maximum conversions.' },
      { icon: 'shield', title: 'Shipping Integration', description: 'Aramex, Fetchr, Quiqup, DHL – directly connected. Real-time tracking, auto label generation, returns management.' },
      { icon: 'globe', title: 'Bilingual EN/AR', description: 'Complete e-commerce solutions in English and Arabic. Correct RTL support, separate descriptions, cultural adaptation.' },
      { icon: 'barChart3', title: 'Conversion Optimized', description: 'Large size charts, detailed photos, customer reviews, simple checkout. We minimize returns and maximize sales.' },
    ],
    packages: [
      { name: 'Starter Shop', price: '8,500', priceType: 'one-time', description: 'For getting started with up to 50 products.', popular: false, features: ['Shopify or WooCommerce', 'Up to 50 products', 'Responsive design', 'Payment setup', 'Shipping integration', 'SSL & security'] },
      { name: 'Business Shop', price: '16,500', priceType: 'one-time', description: 'For growing merchants with unlimited products.', popular: true, features: ['Everything in Starter+', 'Unlimited products', 'Bilingual (EN/AR)', 'Advanced filters', 'Customer accounts', 'Newsletter integration', 'Inventory management', '3 months support'] },
      { name: 'Enterprise Shop', price: '35,000+', priceType: 'one-time', description: 'Customized for large merchants.', popular: false, features: ['Custom development', 'Multi-warehouse', 'ERP integration', 'Advanced analytics', 'B2B features', 'API development', 'Dedicated team'] },
    ],
    process: [
      { step: '01', title: 'Requirements', description: 'Analysis of your products, audience, local payment needs.' },
      { step: '02', title: 'Platform Choice', description: 'Shopify for speed, WooCommerce for flexibility, custom for special needs.' },
      { step: '03', title: 'Design & UX', description: 'Conversion-optimized design for UAE consumers.' },
      { step: '04', title: 'Integrations', description: 'Payment, shipping, inventory – all connected and automated.' },
      { step: '05', title: 'Launch & Training', description: 'Go-live, team training, sales optimization.' },
    ],
    technologies: ['Shopify', 'WooCommerce', 'Custom Next.js Commerce', 'Stripe', 'Tabby API', 'Aramex', 'Fetchr', 'Google Analytics 4'],
    faqs: [
      { question: 'Which e-commerce platforms do you recommend?', answer: 'Shopify: simple, fast, all payment gateways. WooCommerce: more control, flexible, cheaper hosting. Custom: for special requirements and high transaction volumes.' },
      { question: 'Do you support local payment methods like COD?', answer: 'Yes! We integrate Cash on Delivery, Tabby, credit cards, Apple Pay, and local gateways. All common UAE methods.' },
      { question: 'What about shipping and logistics?', answer: 'We integrate Aramex, Fetchr, Quiqup, DHL for seamless logistics with real-time tracking and automatic label generation.' },
      { question: 'Can you create bilingual shops (EN/AR)?', answer: 'Absolutely! Fully bilingual e-commerce with correct RTL support, separate descriptions, and cultural adaptation.' },
    ],
    relatedServices: [
      { title: 'Web Design Dubai', description: 'Corporate websites for Dubai.', href: '/standorte/dubai/webdesign' as any },
      { title: 'Digital Marketing Dubai', description: 'Traffic for your shop.', href: '/standorte/dubai/digital-marketing' as any },
      { title: 'SEO Dubai', description: 'Visibility for products.', href: '/standorte/dubai/seo' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'E-Commerce Packages Dubai',
      pricingDescription: 'Shops optimized for the UAE market!',
      processTitle: 'Our E-Commerce Process',
      processSubtitle: 'From concept to selling online shop.',
      faqTitle: 'E-Commerce Dubai – FAQ',
      faqSubtitle: 'Everything about online shops in the MENA region.',
      ctaTitle: 'Sell Online?',
      ctaDescription: 'Free strategy consultation for your shop.',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const hreflangAlternates = getHreflangAlternates('/standorte/dubai/ecommerce')

  return {
    title: seo.title,
    description: truncateMetaDescription(seo.description),
    keywords: seo.keywords,
    alternates: {
      canonical: getCanonicalUrl('/standorte/dubai/ecommerce', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function StandortDubaiEcommerceP ({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'

  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: locale === 'de' ? 'E-Commerce Agentur Dubai' : 'E-Commerce Agency Dubai',
    cityName: 'Dubai',
    cityType: 'City',
    url: '/standorte/dubai/ecommerce',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.ae' },
      { name: locale === 'de' ? 'Standorte' : 'Locations', url: 'https://goldenwing.ae/standorte' },
      { name: 'Dubai', url: 'https://goldenwing.ae/standorte/dubai' },
      { name: 'E-Commerce', url: 'https://goldenwing.ae/standorte/dubai/ecommerce' },
    ],
    localBusiness: dubaiLocalBusiness,
  }

  const contextualLinks = locale === 'de'
    ? [
        { text: 'E-Commerce Agentur', href: '/leistungen/ecommerce-agentur' },
        { text: 'Shopify Entwicklung', href: '/leistungen/shopify' },
        { text: 'Online Shop Preise', href: '/ecommerce-preise' },
      ]
    : [
        { text: 'E-Commerce Services', href: '/services/ecommerce' },
        { text: 'Shopify Development', href: '/services/shopify' },
        { text: 'Online Shop Pricing', href: '/ecommerce-pricing' },
      ]

  return <LandingPageTemplate locale={locale} content={content} seo={seo} contextualLinks={contextualLinks} />
}
