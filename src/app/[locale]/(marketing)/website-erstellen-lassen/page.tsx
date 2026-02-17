import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import type { StaticAppPathname } from '@/i18n/routing'
import {
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Zap,
  Users,
  Code,
  Palette,
  Globe,
  Layers,
  Monitor,
  Smartphone,
  LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { ProcessVerticalStepper } from '@/components/process-sections/ProcessVerticalStepper'
import { FAQSection } from '@/components/sections/faq-section'
import { BreadcrumbListSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import {
  getCanonicalUrl,
  getHreflangAlternates,
  truncateMetaDescription,
  getContactUrl,
  getContentLocale,
} from '@/lib/utils'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

// ---------------------------------------------------------------------------
// Icon map
// ---------------------------------------------------------------------------
const iconMap: Record<string, LucideIcon> = {
  palette: Palette,
  globe: Globe,
  layers: Layers,
  monitor: Monitor,
  smartphone: Smartphone,
  code: Code,
  star: Star,
  shield: Shield,
  zap: Zap,
  users: Users,
}

// ---------------------------------------------------------------------------
// Content – hero
// ---------------------------------------------------------------------------
const heroContent = {
  de: {
    badge: 'Professionelle Webentwicklung',
    title: 'Website erstellen lassen \u2014 Ihr digitaler Erfolg beginnt hier',
    description:
      'Sie erhalten eine individuell gestaltete, SEO-optimierte und responsive Website \u2014 von der Konzeption bis zum Launch. Unsere Experten in Wien entwickeln ma\u00dfgeschneiderte Webl\u00f6sungen, die Besucher in Kunden verwandeln. Fixpreise ab \u20ac990, pers\u00f6nliche Betreuung und modernste Technologien inklusive.',
    ctaPrimary: 'Kostenloses Erstgespr\u00e4ch',
    ctaSecondary: 'Unsere Pakete ansehen',
  },
  en: {
    badge: 'Professional Web Development',
    title: 'Have Your Website Created \u2014 Your Digital Success Starts Here',
    description:
      'Get a custom-designed, SEO-optimized, and responsive website \u2014 from concept to launch. Our experts in Vienna develop tailored web solutions that turn visitors into customers. Fixed prices from \u20ac990, dedicated project management, and cutting-edge technologies included.',
    ctaPrimary: 'Free Initial Consultation',
    ctaSecondary: 'View Our Packages',
  },
} as const

// ---------------------------------------------------------------------------
// Content – benefits
// ---------------------------------------------------------------------------
const benefits = {
  de: [
    {
      icon: 'palette',
      title: 'Individuelles Design',
      description:
        'Kein Template von der Stange \u2014 Ihre Website wird komplett nach Ihren W\u00fcnschen und Ihrer Markenidentit\u00e4t gestaltet.',
    },
    {
      icon: 'globe',
      title: 'SEO von Anfang an',
      description:
        'Suchmaschinenoptimierung ist bei uns kein Add-on, sondern fest in den Entwicklungsprozess integriert.',
    },
    {
      icon: 'smartphone',
      title: 'Responsive & Schnell',
      description:
        'Optimale Darstellung und Ladezeiten auf allen Ger\u00e4ten \u2014 Desktop, Tablet und Smartphone.',
    },
    {
      icon: 'users',
      title: 'Pers\u00f6nliche Betreuung',
      description:
        'Ein fester Ansprechpartner begleitet Sie durch das gesamte Projekt \u2014 von der Idee bis zum Launch.',
    },
  ],
  en: [
    {
      icon: 'palette',
      title: 'Custom Design',
      description:
        'No off-the-shelf templates \u2014 your website is designed entirely to match your brand identity and vision.',
    },
    {
      icon: 'globe',
      title: 'Built-in SEO',
      description:
        'Search engine optimization is not an add-on for us \u2014 it\u2019s integrated into the entire development process.',
    },
    {
      icon: 'smartphone',
      title: 'Responsive & Fast',
      description:
        'Optimal display and load times on all devices \u2014 desktop, tablet, and smartphone.',
    },
    {
      icon: 'users',
      title: 'Dedicated Support',
      description:
        'A dedicated project manager guides you through the entire project \u2014 from idea to launch.',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// Content – results
// ---------------------------------------------------------------------------
const results = {
  de: [
    { metric: '+250%', label: 'Mehr Anfragen', client: 'E-Commerce Kunde' },
    { metric: '4.9/5', label: 'Kundenzufriedenheit', client: '47+ Projekte' },
    { metric: '<2 Sek.', label: 'Ladezeit', client: 'Performance-First' },
  ],
  en: [
    { metric: '+250%', label: 'More Inquiries', client: 'E-Commerce Client' },
    { metric: '4.9/5', label: 'Client Satisfaction', client: '47+ Projects' },
    { metric: '<2 sec', label: 'Load Time', client: 'Performance-First' },
  ],
} as const

// ---------------------------------------------------------------------------
// Content – services (6 website types)
// ---------------------------------------------------------------------------
const services = {
  de: [
    {
      icon: 'monitor',
      title: 'Corporate Website',
      description:
        'Professionelle Unternehmenswebsite, die Vertrauen schafft und Ihre Marke optimal pr\u00e4sentiert.',
    },
    {
      icon: 'layers',
      title: 'E-Commerce / Webshop',
      description:
        'Leistungsstarke Online-Shops mit nahtloser Benutzererfahrung und sicheren Zahlungssystemen.',
    },
    {
      icon: 'zap',
      title: 'Landing Pages',
      description:
        'Conversion-optimierte Landingpages f\u00fcr Kampagnen, Produktlaunches und Lead-Generierung.',
    },
    {
      icon: 'globe',
      title: 'Website Relaunch',
      description:
        'Bestehende Website modernisieren \u2014 neues Design, bessere Performance und aktuelle Technologien.',
    },
    {
      icon: 'code',
      title: 'WordPress Website',
      description:
        'Individuelle WordPress-Entwicklung mit ma\u00dfgeschneiderten Themes und Plugins.',
    },
    {
      icon: 'shield',
      title: 'Custom Web App',
      description:
        'Ma\u00dfgeschneiderte Webanwendungen f\u00fcr komplexe Gesch\u00e4ftsprozesse und individuelle Anforderungen.',
    },
  ],
  en: [
    {
      icon: 'monitor',
      title: 'Corporate Website',
      description:
        'Professional company website that builds trust and showcases your brand effectively.',
    },
    {
      icon: 'layers',
      title: 'E-Commerce / Webshop',
      description:
        'High-performance online shops with seamless user experience and secure payment systems.',
    },
    {
      icon: 'zap',
      title: 'Landing Pages',
      description:
        'Conversion-optimized landing pages for campaigns, product launches, and lead generation.',
    },
    {
      icon: 'globe',
      title: 'Website Relaunch',
      description:
        'Modernize your existing website \u2014 new design, better performance, and up-to-date technologies.',
    },
    {
      icon: 'code',
      title: 'WordPress Website',
      description:
        'Custom WordPress development with tailored themes and plugins.',
    },
    {
      icon: 'shield',
      title: 'Custom Web App',
      description:
        'Tailored web applications for complex business processes and individual requirements.',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// Content – packages
// ---------------------------------------------------------------------------
const packages = {
  de: [
    {
      name: 'Starter',
      price: '990',
      priceType: 'einmalig',
      description: 'Perfekt f\u00fcr kleine Unternehmen und Selbstst\u00e4ndige',
      popular: false,
      features: [
        'Bis zu 5 Seiten',
        'Responsive Design',
        'Basis-SEO Setup',
        'Kontaktformular',
        'SSL-Zertifikat',
        '1 Monat Support',
      ],
    },
    {
      name: 'Business',
      price: '2.490',
      priceType: 'einmalig',
      description: 'F\u00fcr wachsende Unternehmen mit h\u00f6heren Anspr\u00fcchen',
      popular: true,
      features: [
        'Bis zu 15 Seiten',
        'Content Management System',
        'Blog-Integration',
        'Erweiterte SEO-Optimierung',
        'Google Analytics Setup',
        '3 Monate Support',
      ],
    },
    {
      name: 'Enterprise',
      price: '4.990',
      priceType: 'ab, einmalig',
      description: 'Individuelle L\u00f6sungen f\u00fcr gro\u00dfe Projekte',
      popular: false,
      features: [
        'Individuelle Seitenanzahl',
        'E-Commerce Funktionalit\u00e4t',
        'Custom Development',
        'API-Integration',
        'Performance-Optimierung',
        '6+ Monate Support',
      ],
    },
  ],
  en: [
    {
      name: 'Starter',
      price: '990',
      priceType: 'one-time',
      description: 'Perfect for small businesses and freelancers',
      popular: false,
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Basic SEO setup',
        'Contact form',
        'SSL certificate',
        '1 month support',
      ],
    },
    {
      name: 'Business',
      price: '2,490',
      priceType: 'one-time',
      description: 'For growing companies with higher demands',
      popular: true,
      features: [
        'Up to 15 pages',
        'Content Management System',
        'Blog integration',
        'Advanced SEO optimization',
        'Google Analytics setup',
        '3 months support',
      ],
    },
    {
      name: 'Enterprise',
      price: '4,990',
      priceType: 'from, one-time',
      description: 'Custom solutions for large projects',
      popular: false,
      features: [
        'Custom number of pages',
        'E-Commerce functionality',
        'Custom development',
        'API integration',
        'Performance optimization',
        '6+ months support',
      ],
    },
  ],
} as const

// ---------------------------------------------------------------------------
// Content – process (6 steps)
// ---------------------------------------------------------------------------
const processSteps = {
  de: [
    { step: '01', title: 'Erstgespr\u00e4ch & Analyse', description: 'Anforderungen, Ziele und Zielgruppe gemeinsam definieren.' },
    { step: '02', title: 'Konzept & Wireframes', description: 'Seitenstruktur und Benutzerfuhrung ausarbeiten.' },
    { step: '03', title: 'Design-Entwurf', description: 'Visuelles Design erstellen und mit Ihnen abstimmen.' },
    { step: '04', title: 'Entwicklung', description: 'Frontend und Backend mit modernsten Technologien umsetzen.' },
    { step: '05', title: 'Testing & Qualit\u00e4tssicherung', description: 'Auf allen Ger\u00e4ten testen, Performance und SEO pr\u00fcfen.' },
    { step: '06', title: 'Launch & Nachbetreuung', description: 'Go-Live, Einweisung und fortlaufender Support.' },
  ],
  en: [
    { step: '01', title: 'Consultation & Analysis', description: 'Define requirements, goals, and target audience together.' },
    { step: '02', title: 'Concept & Wireframes', description: 'Develop page structure and user flow.' },
    { step: '03', title: 'Design Draft', description: 'Create visual design and coordinate with you.' },
    { step: '04', title: 'Development', description: 'Implement frontend and backend with cutting-edge technologies.' },
    { step: '05', title: 'Testing & QA', description: 'Test on all devices, check performance and SEO.' },
    { step: '06', title: 'Launch & Aftercare', description: 'Go-live, training, and ongoing support.' },
  ],
} as const

// ---------------------------------------------------------------------------
// Content – technologies
// ---------------------------------------------------------------------------
const technologies = [
  'Next.js',
  'React',
  'WordPress',
  'Shopify',
  'Tailwind CSS',
  'TypeScript',
  'Node.js',
  'Payload CMS',
]

// ---------------------------------------------------------------------------
// Content – FAQs (8 items)
// ---------------------------------------------------------------------------
const faqs = {
  de: [
    {
      question: 'Wie lange dauert es, eine Website erstellen zu lassen?',
      answer:
        'Je nach Umfang dauert die Erstellung einer Website zwischen 2 und 8 Wochen. Eine einfache Unternehmenswebsite mit 5 Seiten ist in ca. 2\u20133 Wochen fertig. Komplexere Projekte mit E-Commerce oder individuellen Funktionen ben\u00f6tigen 6\u20138 Wochen.',
    },
    {
      question: 'Was kostet es, eine Website erstellen zu lassen?',
      answer:
        'Unsere Pakete beginnen bei \u20ac990 f\u00fcr eine Starter-Website mit bis zu 5 Seiten. Business-Websites mit CMS und erweiterter SEO liegen bei \u20ac2.490. Enterprise-L\u00f6sungen mit E-Commerce und Custom Development starten ab \u20ac4.990. Alle Preise sind Fixpreise \u2014 keine versteckten Kosten.',
    },
    {
      question: 'Kann ich meine Website selbst bearbeiten?',
      answer:
        'Ja! Ab dem Business-Paket erhalten Sie ein benutzerfreundliches Content Management System (CMS), mit dem Sie Texte, Bilder und Blogbeitr\u00e4ge selbst verwalten k\u00f6nnen. Wir schulen Sie umfassend in der Bedienung.',
    },
    {
      question: 'Ist die Website f\u00fcr Mobilger\u00e4te optimiert?',
      answer:
        'Selbstverst\u00e4ndlich. Alle unsere Websites werden nach dem Mobile-First-Prinzip entwickelt und sind vollst\u00e4ndig responsive \u2014 optimale Darstellung auf Smartphones, Tablets und Desktops garantiert.',
    },
    {
      question: 'Ist SEO im Preis enthalten?',
      answer:
        'Ja, grundlegende SEO-Optimierung ist in jedem Paket enthalten: saubere URL-Strukturen, Meta-Tags, Seitengeschwindigkeit, mobile Optimierung und strukturierte Daten. Das Business- und Enterprise-Paket bietet zus\u00e4tzlich erweiterte SEO-Ma\u00dfnahmen.',
    },
    {
      question: 'Was passiert nach dem Launch?',
      answer:
        'Nach dem Launch erhalten Sie je nach Paket 1\u20136+ Monate Support. Wir k\u00fcmmern uns um technische Fragen, kleinere Anpassungen und Sicherheitsupdates. Danach bieten wir optionale Wartungsvertr\u00e4ge an.',
    },
    {
      question: 'Kann ich eine bestehende Website umbauen lassen?',
      answer:
        'Ja, Website-Relaunches geh\u00f6ren zu unseren Kernkompetenzen. Wir analysieren Ihre bestehende Seite, \u00fcbernehmen bew\u00e4hrte Inhalte und setzen ein modernes Design mit aktueller Technologie um \u2014 ohne SEO-Rankings zu verlieren.',
    },
    {
      question: 'Welches CMS wird verwendet?',
      answer:
        'Wir arbeiten je nach Anforderung mit WordPress, Payload CMS oder Shopify. F\u00fcr maximale Performance und Flexibilit\u00e4t setzen wir bevorzugt auf Next.js mit Payload CMS. Bei der Beratung empfehlen wir die beste L\u00f6sung f\u00fcr Ihr Projekt.',
    },
  ],
  en: [
    {
      question: 'How long does it take to have a website created?',
      answer:
        'Depending on the scope, creating a website takes between 2 and 8 weeks. A simple company website with 5 pages is ready in about 2\u20133 weeks. More complex projects with e-commerce or custom features require 6\u20138 weeks.',
    },
    {
      question: 'How much does it cost to have a website created?',
      answer:
        'Our packages start at \u20ac990 for a starter website with up to 5 pages. Business websites with CMS and advanced SEO are \u20ac2,490. Enterprise solutions with e-commerce and custom development start from \u20ac4,990. All prices are fixed \u2014 no hidden costs.',
    },
    {
      question: 'Can I edit my website myself?',
      answer:
        'Yes! From the Business package onwards, you receive a user-friendly Content Management System (CMS) that lets you manage texts, images, and blog posts on your own. We provide comprehensive training on how to use it.',
    },
    {
      question: 'Is the website optimized for mobile devices?',
      answer:
        'Absolutely. All our websites are developed with a mobile-first approach and are fully responsive \u2014 optimal display on smartphones, tablets, and desktops guaranteed.',
    },
    {
      question: 'Is SEO included in the price?',
      answer:
        'Yes, basic SEO optimization is included in every package: clean URL structures, meta tags, page speed, mobile optimization, and structured data. The Business and Enterprise packages offer additional advanced SEO measures.',
    },
    {
      question: 'What happens after launch?',
      answer:
        'After launch, you receive 1\u20136+ months of support depending on the package. We take care of technical questions, minor adjustments, and security updates. Afterwards, we offer optional maintenance contracts.',
    },
    {
      question: 'Can I have an existing website redesigned?',
      answer:
        'Yes, website relaunches are one of our core competencies. We analyze your existing site, retain proven content, and implement a modern design with current technology \u2014 without losing SEO rankings.',
    },
    {
      question: 'Which CMS is used?',
      answer:
        'We work with WordPress, Payload CMS, or Shopify depending on requirements. For maximum performance and flexibility, we prefer Next.js with Payload CMS. During consultation, we recommend the best solution for your project.',
    },
  ],
} as const

// ---------------------------------------------------------------------------
// Content – related services
// ---------------------------------------------------------------------------
const relatedServices = {
  de: [
    {
      title: 'Webdesign Preise',
      description: 'Detaillierte Preis\u00fcbersicht f\u00fcr alle unsere Webdesign-Pakete und Leistungen.',
      href: '/webdesign-preise' as const,
    },
    {
      title: 'Webdesign Wien',
      description: 'Kreatives Webdesign aus Wien \u2014 ma\u00dfgeschneidert f\u00fcr Ihre Marke.',
      href: '/webdesign-wien' as const,
    },
    {
      title: 'SEO Agentur Wien',
      description: 'Professionelle Suchmaschinenoptimierung f\u00fcr mehr Sichtbarkeit bei Google.',
      href: '/seo-agentur-wien' as const,
    },
  ],
  en: [
    {
      title: 'Web Design Pricing',
      description: 'Detailed pricing overview for all our web design packages and services.',
      href: '/webdesign-preise' as const,
    },
    {
      title: 'Web Design Vienna',
      description: 'Creative web design from Vienna \u2014 tailored to your brand.',
      href: '/webdesign-wien' as const,
    },
    {
      title: 'SEO Agency Vienna',
      description: 'Professional search engine optimization for more Google visibility.',
      href: '/seo-agentur-wien' as const,
    },
  ],
} as const satisfies Record<'de' | 'en', Array<{ title: string; description: string; href: StaticAppPathname }>>

// ---------------------------------------------------------------------------
// Section labels
// ---------------------------------------------------------------------------
const sectionLabels = {
  de: {
    benefitsTitle: 'Warum Website vom Profi erstellen lassen?',
    benefitsDescription: 'Vier gute Gr\u00fcnde, die Erstellung Ihrer Website in professionelle H\u00e4nde zu geben.',
    resultsTitle: 'Unsere Ergebnisse sprechen f\u00fcr sich',
    servicesTitle: 'Welche Website d\u00fcrfen wir f\u00fcr Sie erstellen?',
    servicesDescription: 'Von der Corporate Website bis zur individuellen Web-App \u2014 wir setzen Ihr Projekt um.',
    pricingTitle: 'Transparente Fixpreise',
    pricingDescription: 'Klare Pakete, faire Preise \u2014 ohne versteckte Kosten.',
    pricingDetailLink: 'Detaillierte Preis\u00fcbersicht \u2192',
    processTitle: 'So entsteht Ihre Website',
    processDescription: 'In 6 strukturierten Schritten von der Idee zum fertigen Webauftritt.',
    technologiesTitle: 'Unsere Technologien',
    technologiesDescription: 'Wir setzen auf bew\u00e4hrte und moderne Technologien f\u00fcr beste Ergebnisse.',
    faqTitle: 'H\u00e4ufige Fragen zum Thema Website erstellen lassen',
    relatedServicesTitle: 'Verwandte Leistungen',
    ctaTitle: 'Bereit f\u00fcr Ihre neue Website?',
    ctaDescription: 'Lassen Sie uns in einem kostenlosen Erstgespr\u00e4ch \u00fcber Ihr Projekt sprechen. Wir beraten Sie unverbindlich und erstellen Ihnen ein ma\u00dfgeschneidertes Angebot.',
    ctaButton: 'Kostenloses Erstgespr\u00e4ch vereinbaren',
    learnMore: 'Mehr erfahren',
    inquire: 'Anfragen',
    recommended: 'Empfohlen',
  },
  en: {
    benefitsTitle: 'Why Have Your Website Professionally Created?',
    benefitsDescription: 'Four compelling reasons to put your website creation in professional hands.',
    resultsTitle: 'Our Results Speak for Themselves',
    servicesTitle: 'What Type of Website Can We Create for You?',
    servicesDescription: 'From corporate websites to custom web apps \u2014 we bring your project to life.',
    pricingTitle: 'Transparent Fixed Prices',
    pricingDescription: 'Clear packages, fair prices \u2014 no hidden costs.',
    pricingDetailLink: 'Detailed pricing overview \u2192',
    processTitle: 'How Your Website Is Built',
    processDescription: 'In 6 structured steps from idea to finished website.',
    technologiesTitle: 'Our Technologies',
    technologiesDescription: 'We rely on proven and modern technologies for best results.',
    faqTitle: 'Frequently Asked Questions About Website Creation',
    relatedServicesTitle: 'Related Services',
    ctaTitle: 'Ready for Your New Website?',
    ctaDescription: 'Let\u2019s discuss your project in a free consultation. We\u2019ll advise you with no obligation and create a tailored offer for you.',
    ctaButton: 'Schedule Free Consultation',
    learnMore: 'Learn more',
    inquire: 'Inquire',
    recommended: 'Recommended',
  },
} as const

// ============================================================================
// Metadata
// ============================================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const cl = getContentLocale(locale)

  const metaTitle =
    cl === 'de'
      ? 'Website erstellen lassen ab €990 | GoldenWing Wien'
      : 'Have Your Website Created from €990 | GoldenWing'

  const metaDescription = truncateMetaDescription(
    cl === 'de'
      ? 'Website erstellen lassen von Experten in Wien. \u2713 Individuelle Designs \u2713 SEO-optimiert \u2713 Responsive \u2713 Fixpreise ab \u20ac990. Jetzt Angebot anfordern.'
      : 'Have your website professionally created by experts in Vienna. \u2713 Custom designs \u2713 SEO-optimized \u2713 Responsive \u2713 Fixed prices from \u20ac990.',
  )

  const hreflangAlternates = getHreflangAlternates('/website-erstellen-lassen', locale)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords:
      cl === 'de'
        ? [
            'Website erstellen lassen',
            'Webseite erstellen lassen',
            'Homepage erstellen lassen',
            'Webdesign Agentur Wien',
            'Professionelle Website',
          ]
        : [
            'Have Website Created',
            'Professional Website Development',
            'Web Design Agency Vienna',
            'Custom Website',
          ],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: getCanonicalUrl('/website-erstellen-lassen', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'GoldenWing - Website erstellen lassen',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/website-erstellen-lassen', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

// ============================================================================
// Page component
// ============================================================================
export default async function WebsiteErstellenLassenPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const cl = getContentLocale(locale)

  const hero = heroContent[cl]
  const benefitItems = benefits[cl]
  const resultItems = results[cl]
  const serviceItems = services[cl]
  const packageItems = packages[cl]
  const process = processSteps[cl]
  const faqItems = faqs[cl]
  const related = relatedServices[cl]
  const labels = sectionLabels[cl]

  // ---------------------------------------------------------------------------
  // Breadcrumbs
  // ---------------------------------------------------------------------------
  const breadcrumbs = [
    { name: cl === 'de' ? 'Startseite' : 'Home', url: 'https://goldenwing.at' },
    {
      name: cl === 'de' ? 'Website erstellen lassen' : 'Have Website Created',
      url:
        cl === 'de'
          ? 'https://goldenwing.at/website-erstellen-lassen'
          : 'https://goldenwing.at/en/have-website-created',
    },
  ]

  // ---------------------------------------------------------------------------
  // Schema – Service
  // ---------------------------------------------------------------------------
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: cl === 'de' ? 'Website erstellen lassen' : 'Website Development',
    alternateName: cl === 'de' ? 'Professionelle Webentwicklung' : 'Professional Web Development',
    url: 'https://goldenwing.at/website-erstellen-lassen',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Czeikestrasse 4/21',
        addressLocality: 'Wien',
        postalCode: '1100',
        addressCountry: 'AT',
      },
    },
    areaServed: { '@type': 'City', name: 'Wien' },
    description:
      cl === 'de'
        ? 'Professionelle Website erstellen lassen von Experten in Wien. Individuelles Design, SEO-optimiert, responsive. Fixpreise ab \u20ac990.'
        : 'Have your website professionally created by experts in Vienna. Custom design, SEO-optimized, responsive. Fixed prices from \u20ac990.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '990',
      highPrice: '4990',
      priceCurrency: 'EUR',
    },
  }

  // ---------------------------------------------------------------------------
  // Schema – HowTo
  // ---------------------------------------------------------------------------
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name:
      cl === 'de'
        ? 'Wie entsteht Ihre professionelle Website?'
        : 'How Is Your Professional Website Created?',
    description:
      cl === 'de'
        ? 'In 6 Schritten zur fertigen Website \u2014 von der Analyse bis zum Launch.'
        : 'In 6 steps to a finished website \u2014 from analysis to launch.',
    step: process.map((item, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: item.title,
      text: item.description,
    })),
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BreadcrumbListSchema items={breadcrumbs} />
      <AggregateRatingSchema ratingValue={4.9} ratingCount={47} />

      {/* ================================================================ */}
      {/* Hero */}
      {/* ================================================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div>
            <Badge className="mb-4">{hero.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <NextLink href="#pakete">{hero.ctaSecondary}</NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* Benefits */}
      {/* ================================================================ */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.benefitsTitle}</h2>
            <p className="text-muted-foreground">
              {labels.benefitsDescription}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitItems.map((benefit) => {
              const IconComponent = iconMap[benefit.icon] || Star
              return (
                <Card key={benefit.title}>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* Results */}
      {/* ================================================================ */}
      <section className="py-16 border-y bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-10 text-center">{labels.resultsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resultItems.map((result) => (
              <div key={result.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {result.metric}
                </div>
                <div className="font-medium mb-1">{result.label}</div>
                <div className="text-sm text-muted-foreground">{result.client}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* Services – website types */}
      {/* ================================================================ */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.servicesTitle}</h2>
            <p className="text-muted-foreground">
              {labels.servicesDescription}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceItems.map((service) => {
              const IconComponent = iconMap[service.icon] || Code
              return (
                <Card key={service.title}>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* Pricing */}
      {/* ================================================================ */}
      <section id="pakete" className="py-20 bg-muted/30 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.pricingTitle}</h2>
            <p className="text-muted-foreground">
              {labels.pricingDescription}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {packageItems.map((pkg) => (
              <Card
                key={pkg.name}
                className={pkg.popular ? 'border-primary shadow-lg relative' : ''}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{labels.recommended}</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">&euro;{pkg.price}</span>
                    <span className="text-muted-foreground text-sm"> {pkg.priceType}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    variant={pkg.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <NextLink href={getContactUrl(locale)}>{labels.inquire}</NextLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={'/webdesign-preise' as StaticAppPathname}
              className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              {labels.pricingDetailLink}
            </Link>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* Process – ProcessVerticalStepper */}
      {/* ================================================================ */}
      <ProcessVerticalStepper
        title={labels.processTitle}
        subtitle={labels.processDescription}
        steps={process.map((item) => ({
          num: item.step,
          title: item.title,
          description: item.description,
        }))}
      />

      {/* ================================================================ */}
      {/* Technologies */}
      {/* ================================================================ */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{labels.technologiesTitle}</h2>
            <p className="text-muted-foreground">
              {labels.technologiesDescription}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="flex items-center justify-center p-4 rounded-lg border bg-background font-medium text-sm"
              >
                {tech}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* FAQ */}
      {/* ================================================================ */}
      {faqItems.length > 0 && (
        <FAQSection
          title={labels.faqTitle}
          items={[...faqItems]}
          className=""
        />
      )}

      {/* ================================================================ */}
      {/* Related Services */}
      {/* ================================================================ */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {labels.relatedServicesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((service) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    {labels.learnMore} <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* CTA */}
      {/* ================================================================ */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{labels.ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8">
            {labels.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <NextLink href={getContactUrl(locale)}>
                {labels.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <NextLink href="tel:+436645439681">+43 664 543 96 81</NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
