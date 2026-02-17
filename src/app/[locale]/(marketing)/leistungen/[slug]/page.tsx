import type { ComponentType } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, Palette, Globe, Search, LineChart, Camera, Code, Target, Lightbulb, Pencil, FileText, Layout, Monitor, ShoppingCart, Zap, Users, Map, TrendingUp, Filter, MapPin, FileSearch, Key, Edit, Calendar, Video, Workflow, Lock, Cpu, Link as LinkIcon, Cloud, Smartphone, Layers, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { getServices, getServiceBySlug, getRelatedProjects, type SupportedLocale } from '@/lib/payload'
import Image from 'next/image'
import { getServiceTranslationRu, getSubServiceTranslationRu } from '@/lib/translations/services-ru'
import { BreadcrumbListSchema, ServiceSchema, HowToSchema, AggregateRatingSchema } from '@/components/seo/json-ld'
import { FAQSection } from '@/components/sections/faq-section'
import { ComparisonTable } from '@/components/seo/comparison-table'
import { getServiceFAQs } from '@/lib/faq-data'
import { getServiceComparison } from '@/lib/service-comparisons'
import { StatsSection } from '@/components/aeo'
import { KeyTakeaways } from '@/components/aeo'
import { getServiceStats, getServiceTakeaways } from '@/lib/aeo-data'
import { LogoPortfolio } from '@/components/sections/logo-portfolio'
import { ServiceProcessSection } from '@/components/sections/service-process-section'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { getServicePageData } from '@/lib/service-page-data'
import { getTranslations } from 'next-intl/server'
import { getCanonicalUrl, getHreflangAlternates, translateServiceSlugToEn, getSubServiceUrl, getReferenzCategoryUrl, getSchemaUrl, truncateMetaDescription, getServiceUrl, getMediaUrl } from '@/lib/utils'
import NextLink from 'next/link'
// Note: validateSlugOrRedirect removed - next-intl routing handles path translation

interface SubService {
  id: string
  title: string
  slug: string
  subtitle?: string
  description: string
  icon?: string
  featured?: boolean
}

interface ProcessStep {
  id?: string
  step: string
}

interface Feature {
  id?: string
  title: string
  description?: string
}

interface Service {
  id: string
  title: string
  slug: string
  subtitle?: string
  description: string
  icon: string
  features?: Feature[] | string[]
  process?: ProcessStep[] | string[]
  subServices?: SubService[]
}

// Icon mapping
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  palette: Palette,
  globe: Globe,
  search: Search,
  'line-chart': LineChart,
  camera: Camera,
  code: Code,
  target: Target,
  lightbulb: Lightbulb,
  pencil: Pencil,
  'file-text': FileText,
  layout: Layout,
  monitor: Monitor,
  'shopping-cart': ShoppingCart,
  zap: Zap,
  users: Users,
  map: Map,
  'trending-up': TrendingUp,
  filter: Filter,
  'map-pin': MapPin,
  'file-search': FileSearch,
  key: Key,
  edit: Edit,
  calendar: Calendar,
  video: Video,
  workflow: Workflow,
  lock: Lock,
  cpu: Cpu,
  link: LinkIcon,
  cloud: Cloud,
  smartphone: Smartphone,
  layers: Layers,
  'check-circle': CheckCircle,
}

// Map service slugs to referenzen categories for internal linking - NEW STRUCTURE 2025
const serviceToReferenzen: Record<string, string> = {
  'branding': 'branding',
  'webdesign': 'webdesign',
  'digital-marketing': 'marketing',
  'seo-content': 'seo',
  'web-app-entwicklung': 'entwicklung',
  'it-cloud-services': 'it-cloud',
  // Legacy mappings for redirects
  'digitales-marketing': 'marketing',
  'seo-sichtbarkeit': 'seo',
  'software-entwicklung': 'entwicklung',
  'technische-loesungen': 'it-cloud',
  'content-visuals': 'marketing',
}

// English translations for services (fallback when CMS doesn't have EN content) - NEW STRUCTURE 2025
const serviceTranslations: Record<string, { title: string; subtitle: string; description: string }> = {
  branding: {
    title: 'Branding',
    subtitle: 'Your Brand. Unmistakable.',
    description: 'We develop unique brand identity in Vienna. From brand strategy and positioning to visual identity and brand guidelines - everything from one source. Whether new branding or complete rebranding: Your brand becomes unmistakable.',
  },
  webdesign: {
    title: 'Web Design',
    subtitle: 'Websites That Convert.',
    description: 'Web design agency Vienna: Information architecture, UX concepts, UI design and CMS development. Accessible, performant websites that deliver results.',
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    subtitle: 'Campaigns That Deliver.',
    description: 'Digital marketing agency Vienna: Campaign strategy, paid media (Google Ads, Meta Ads), email automation and tracking optimization. Measurable results for more leads and sales.',
  },
  'seo-content': {
    title: 'SEO & Content',
    subtitle: 'Be Found. Grow.',
    description: 'SEO agency Vienna: Technical SEO, on-page and off-page optimization, local SEO, content strategy and production. Sustainable visibility through quality content and smart optimization.',
  },
  'web-app-entwicklung': {
    title: 'Web & App Development',
    subtitle: 'Custom Solutions. Built Right.',
    description: 'Software development Vienna: Technical architecture, web and mobile app development, API integrations, workflow automation and quality assurance. Modern technologies, reliable delivery.',
  },
  'it-cloud-services': {
    title: 'IT & Cloud Services',
    subtitle: 'Infrastructure That Scales.',
    description: 'IT services Vienna: Cloud architecture, monitoring and maintenance, security and backups, technical support. Keep your systems running smoothly.',
  },
  // Legacy translations for old slugs (for redirects)
  'digitale-strategie': {
    title: 'Digital Strategy',
    subtitle: 'Data-Driven Success.',
    description: 'Develop digital strategy: Customer journey mapping, persona creation and conversion funnel optimization.',
  },
  'seo-sichtbarkeit': {
    title: 'SEO & Visibility',
    subtitle: 'Be Found. Grow.',
    description: 'SEO agency Vienna: Technical SEO, Local SEO and content strategy for more organic visibility.',
  },
  'technische-loesungen': {
    title: 'Technical Solutions',
    subtitle: 'Automation & Integration.',
    description: 'Technical solutions: Website performance optimization, API integration, workflow automation.',
  },
  'software-entwicklung': {
    title: 'Software Development',
    subtitle: 'Web Apps, Mobile Apps & Cloud.',
    description: 'Software development Vienna: Next.js, React apps, mobile app development and cloud DevOps.',
  },
}

// Default service data for additional info not in CMS - German - NEW STRUCTURE 2025
const serviceDefaultsDE: Record<string, { subtitle: string; process: string[] }> = {
  branding: {
    subtitle: 'Ihre Marke. Unverwechselbar.',
    process: [
      'Discovery Workshop & Briefing',
      'Markt- und Wettbewerbsanalyse',
      'Markenstrategie & Positionierung',
      'Visuelle Identität entwickeln',
      'Markenrichtlinien erstellen',
      'Finalisierung & Übergabe',
    ],
  },
  webdesign: {
    subtitle: 'Websites, die konvertieren.',
    process: [
      'Informationsarchitektur',
      'Wireframing & UX-Konzept',
      'UI-Design & Prototyping',
      'CMS-Entwicklung',
      'Barrierefreiheit & Performance',
      'Launch & Optimierung',
    ],
  },
  'digital-marketing': {
    subtitle: 'Kampagnen, die wirken.',
    process: [
      'Kampagnenstrategie entwickeln',
      'Zielgruppen & Kanäle definieren',
      'Paid Media Setup',
      'E-Mail-Automatisierung',
      'Tracking-Optimierung',
      'Analyse & Skalierung',
    ],
  },
  'seo-content': {
    subtitle: 'Gefunden werden. Wachsen.',
    process: [
      'Technical SEO Audit',
      'Keyword-Recherche',
      'On-Page Optimierung',
      'Content-Strategie',
      'Off-Page & Linkbuilding',
      'Monitoring & Reporting',
    ],
  },
  'web-app-entwicklung': {
    subtitle: 'Maßgeschneiderte Lösungen.',
    process: [
      'Requirements Engineering',
      'Technische Architektur',
      'Agile Entwicklung',
      'API-Integrationen',
      'Testing & QA',
      'Deployment & Support',
    ],
  },
  'it-cloud-services': {
    subtitle: 'Infrastruktur, die mitwächst.',
    process: [
      'Cloud-Architektur planen',
      'Setup & Migration',
      'Monitoring einrichten',
      'Sicherheit & Backups',
      'Laufende Wartung',
      'Technischer Support',
    ],
  },
}

// Sub-service English translations - NEW STRUCTURE 2025
const subServiceTranslationsEN: Record<string, { title: string; subtitle?: string; description: string }> = {
  // Branding sub-services
  'markenstrategie-positionierung': {
    title: 'Brand Strategy & Positioning',
    subtitle: 'The foundation for everything',
    description: 'Strategic brand positioning for sustainable brand success: Value Proposition Workshop, target audience analysis, competitor research and messaging framework. We define what your brand stands for and how it communicates.',
  },
  'visuelle-identitaet': {
    title: 'Visual Identity & Design Systems',
    subtitle: 'The look that lasts',
    description: 'Unmistakable appearance for your brand: Logo design, color concept, typography selection and key visuals. We create visual identities that convey your brand values and create recognition.',
  },
  'markenrichtlinien-vorlagen': {
    title: 'Brand Guidelines & Templates',
    subtitle: 'Consistency at a click',
    description: 'Professional brand guidelines for consistent brand communication: Design guidelines, template systems and application-specific templates. Everything documented so your team can use the brand correctly.',
  },
  'rebranding': {
    title: 'Rebranding & Brand Evolution',
    subtitle: 'Evolution instead of revolution',
    description: 'Strategic brand evolution or complete rebranding: Brand audit, repositioning, visual refresh and relaunch support. We modernize your brand without losing established values.',
  },
  // Web Design sub-services
  'informationsarchitektur': {
    title: 'Information Architecture',
    subtitle: 'Structure that guides',
    description: 'Logical content structure for optimal user experience: Page hierarchy, navigation concepts, user flows and sitemap development. We create structures that users understand intuitively.',
  },
  'ux-konzepte-prototypen': {
    title: 'UX Concepts & Prototypes',
    subtitle: 'Test before you build',
    description: 'User-centered design concepts: Wireframing, interactive prototypes, usability testing and user research. We validate ideas before investing in development.',
  },
  'ui-design-designsysteme': {
    title: 'UI Design & Design Systems',
    subtitle: 'Pixels with purpose',
    description: 'Visual interface design: Custom UI components, responsive layouts, micro-interactions and design tokens. We create scalable design systems for consistent digital experiences.',
  },
  'cms-entwicklung': {
    title: 'CMS Development',
    subtitle: 'Content you control',
    description: 'Flexible content management solutions: WordPress, Payload CMS, Strapi or headless architectures. We build CMS solutions that your team actually wants to use.',
  },
  'barrierefreiheit-performance': {
    title: 'Accessibility & Performance',
    subtitle: 'Fast and for everyone',
    description: 'WCAG-compliant and lightning-fast: Accessibility audit, Core Web Vitals optimization, image optimization and lazy loading. We make websites accessible and performant.',
  },
  // Digital Marketing sub-services
  'kampagnenstrategie': {
    title: 'Campaign Strategy',
    subtitle: 'Goals, channels, message',
    description: 'Data-driven campaign planning: Goal definition, channel selection, budget allocation and KPI framework. We develop strategies that achieve measurable results.',
  },
  'paid-media': {
    title: 'Paid Media (Ads)',
    subtitle: 'Performance marketing',
    description: 'Targeted advertising on Google, Meta, LinkedIn and more: Ad creation, audience targeting, bid management and continuous optimization. We maximize your advertising budget.',
  },
  'email-automatisierung': {
    title: 'Email Automation',
    subtitle: 'Nurture and convert',
    description: 'Automated email journeys: Lead nurturing sequences, welcome flows, re-engagement campaigns and behavioral triggers. We build email systems that convert.',
  },
  'tracking-analytics': {
    title: 'Tracking & Analytics',
    subtitle: 'Measure what matters',
    description: 'Complete tracking setup: GA4 implementation, conversion tracking, custom events and dashboards. We create the data foundation for informed decisions.',
  },
  // SEO & Content sub-services
  'technical-seo': {
    title: 'Technical SEO',
    subtitle: 'The foundation for visibility',
    description: 'Technical website optimization: Crawlability, indexability, site architecture, schema markup and Core Web Vitals. We create the technical foundation for search rankings.',
  },
  'on-page-optimierung': {
    title: 'On-Page Optimization',
    subtitle: 'Content that ranks',
    description: 'Page-level optimization: Meta tags, headings, internal linking, content structure and keyword integration. We optimize every page for search engines and users.',
  },
  'local-seo': {
    title: 'Local SEO',
    subtitle: 'Be found locally',
    description: 'Local search optimization: Google Business Profile, local citations, review management and location pages. We make you visible in your region.',
  },
  'content-strategie-produktion': {
    title: 'Content Strategy & Production',
    subtitle: 'Content with purpose',
    description: 'Strategic content creation: Topic clusters, editorial calendars, blog articles, landing pages and content updates. We create content that attracts and converts.',
  },
  'offpage-linkbuilding': {
    title: 'Off-Page & Link Building',
    subtitle: 'Authority building',
    description: 'Sustainable link building: Digital PR, guest posts, resource link building and brand mentions. We build your domain authority through quality backlinks.',
  },
  // Web & App Development sub-services
  'technische-architektur': {
    title: 'Technical Architecture',
    subtitle: 'Built to scale',
    description: 'Scalable software architecture: System design, database modeling, API design and technology selection. We create architectures that grow with your business.',
  },
  'web-entwicklung': {
    title: 'Web Development',
    subtitle: 'Modern web apps',
    description: 'Full-stack web development: Next.js, React, TypeScript and Node.js. We build fast, SEO-friendly and maintainable web applications.',
  },
  'mobile-apps': {
    title: 'Mobile Apps',
    subtitle: 'Native and cross-platform',
    description: 'Mobile app development: React Native, Flutter or native iOS/Android. We create apps that users love and businesses rely on.',
  },
  'api-integrationen': {
    title: 'API Integrations',
    subtitle: 'Connect everything',
    description: 'System integration: REST APIs, GraphQL, webhooks and third-party integrations. We connect your systems for seamless data flow.',
  },
  'workflow-automatisierung': {
    title: 'Workflow Automation',
    subtitle: 'Automate repetitive tasks',
    description: 'Business process automation: Zapier, Make, custom scripts and internal tools. We automate workflows so you can focus on what matters.',
  },
  // IT & Cloud Services sub-services
  'cloud-architektur-migration': {
    title: 'Cloud Architecture & Migration',
    subtitle: 'Modern infrastructure',
    description: 'Cloud-native architecture: AWS, Azure, Google Cloud and hybrid solutions. We design and migrate to scalable cloud infrastructure.',
  },
  'monitoring-wartung': {
    title: 'Monitoring & Maintenance',
    subtitle: 'Always-on systems',
    description: '24/7 monitoring and proactive maintenance: Uptime monitoring, performance alerts, regular updates and security patches. We keep your systems running smoothly.',
  },
  'sicherheit-backups': {
    title: 'Security & Backups',
    subtitle: 'Protected and backed up',
    description: 'Enterprise security: Vulnerability scanning, security hardening, backup strategies and disaster recovery. We protect your data and systems.',
  },
  'technischer-support': {
    title: 'Technical Support',
    subtitle: 'Help when you need it',
    description: 'Professional IT support: Help desk, incident management, remote support and on-site assistance. We are your extended IT team.',
  },
}

// SEO-optimized meta titles for service pages - 2025
const serviceSeoTitles: Record<string, { de: string; en: string }> = {
  branding: {
    de: 'Branding Agentur Wien | Markenentwicklung & Corporate Identity',
    en: 'Branding Agency Vienna | Brand Strategy & Corporate Design',
  },
  webdesign: {
    de: 'Webdesign Agentur Wien | UX/UI Design & Entwicklung',
    en: 'Web Design Agency Vienna | UX/UI Design & Development',
  },
  'digital-marketing': {
    de: 'Digital Marketing Agentur Wien | Google Ads & Social Media',
    en: 'Digital Marketing Agency Vienna | Google Ads & Social Media',
  },
  'seo-content': {
    de: 'SEO Agentur Wien | Content-Strategie & Optimierung',
    en: 'SEO Agency Vienna | Content Strategy & Optimization',
  },
  'web-app-entwicklung': {
    de: 'Web & App Entwicklung Wien | Next.js & React Agentur',
    en: 'Web & App Development Vienna | Next.js & React Agency',
  },
  'it-cloud-services': {
    de: 'IT & Cloud Services Wien | Hosting & Managed Services',
    en: 'IT & Cloud Services Vienna | Hosting & Managed Services',
  },
}

// Default service data - English - NEW STRUCTURE 2025
const serviceDefaultsEN: Record<string, { subtitle: string; process: string[] }> = {
  branding: {
    subtitle: 'Your Brand. Unmistakable.',
    process: [
      'Discovery Workshop & Briefing',
      'Market & Competitor Analysis',
      'Brand Strategy & Positioning',
      'Visual Identity Development',
      'Brand Guidelines Creation',
      'Finalization & Handover',
    ],
  },
  webdesign: {
    subtitle: 'Websites That Convert.',
    process: [
      'Information Architecture',
      'Wireframing & UX Concept',
      'UI Design & Prototyping',
      'CMS Development',
      'Accessibility & Performance',
      'Launch & Optimization',
    ],
  },
  'digital-marketing': {
    subtitle: 'Campaigns That Deliver.',
    process: [
      'Campaign Strategy Development',
      'Target Audiences & Channels',
      'Paid Media Setup',
      'Email Automation',
      'Tracking Optimization',
      'Analysis & Scaling',
    ],
  },
  'seo-content': {
    subtitle: 'Be Found. Grow.',
    process: [
      'Technical SEO Audit',
      'Keyword Research',
      'On-Page Optimization',
      'Content Strategy',
      'Off-Page & Link Building',
      'Monitoring & Reporting',
    ],
  },
  'web-app-entwicklung': {
    subtitle: 'Custom Solutions. Built Right.',
    process: [
      'Requirements Engineering',
      'Technical Architecture',
      'Agile Development',
      'API Integrations',
      'Testing & QA',
      'Deployment & Support',
    ],
  },
  'it-cloud-services': {
    subtitle: 'Infrastructure That Scales.',
    process: [
      'Cloud Architecture Planning',
      'Setup & Migration',
      'Monitoring Setup',
      'Security & Backups',
      'Ongoing Maintenance',
      'Technical Support',
    ],
  },
}

function getIcon(iconName?: string) {
  if (!iconName) return Palette
  return iconMap[iconName] || Palette
}

export const dynamic = 'force-static'
export const dynamicParams = false // Only pre-defined slugs, no dynamic rendering
export const revalidate = 60

export async function generateStaticParams() {
  const services = await getServices()
  const locales = ['de', 'en'] as const

  return locales.flatMap((locale) =>
    services.map((service) => ({
      locale,
      slug: service.slug,
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  // Payload CMS only has 'de' and 'en' locales — use 'de' fallback for 'ru'
  const cmsLocale = (locale === 'ru' ? 'de' : locale) as SupportedLocale
  const service = await getServiceBySlug(slug, cmsLocale) as Service | null

  if (!service) {
    notFound()
  }

  // Use English or Russian translations when available
  const enTranslation = locale === 'en' ? serviceTranslations[service.slug] : null
  const ruTranslation = locale === 'ru' ? getServiceTranslationRu(service.slug) : null
  const title = ruTranslation?.title || enTranslation?.title || service.title
  const rawDescription = truncateMetaDescription(ruTranslation?.description || enTranslation?.description || service.description || '')

  // SEMrush On-Page: keyword-optimized meta descriptions per service
  const seoDescriptions: Record<string, Record<string, string>> = {
    branding: {
      de: 'Branding Agentur in Wien ✓ Markenentwicklung ✓ Corporate Identity ✓ Logo Design ✓ Rebranding. Für Startups & Unternehmen. Jetzt Beratung anfragen!',
      en: 'Branding Agency Vienna ✓ Brand Development ✓ Corporate Identity ✓ Logo Design ✓ Rebranding. For startups & enterprises. Get a free consultation!',
    },
    webdesign: {
      de: 'Webdesign Agentur Wien ✓ UX/UI Design ✓ Responsive Websites ✓ CMS-Entwicklung ✓ Barrierefreiheit. Moderne Websites, die konvertieren. Jetzt anfragen!',
      en: 'Web Design Agency Vienna ✓ UX/UI Design ✓ Responsive Websites ✓ CMS Development ✓ Accessibility. Modern websites that convert. Get started!',
    },
    'seo-content': {
      de: 'SEO Agentur Wien ✓ Technisches SEO ✓ Content-Strategie ✓ Local SEO ✓ Linkbuilding. Nachhaltig mehr Sichtbarkeit & organischen Traffic. Jetzt Audit anfragen!',
      en: 'SEO Agency Vienna ✓ Technical SEO ✓ Content Strategy ✓ Local SEO ✓ Link Building. Sustainable visibility & organic traffic. Request your audit!',
    },
    'digital-marketing': {
      de: 'Digital Marketing Agentur Wien ✓ Google Ads ✓ Social Media ✓ E-Mail-Marketing ✓ Tracking. Datengetriebene Kampagnen für mehr Leads & Umsatz!',
      en: 'Digital Marketing Agency Vienna ✓ Google Ads ✓ Social Media ✓ Email Marketing ✓ Tracking. Data-driven campaigns for more leads & revenue!',
    },
    'web-app-entwicklung': {
      de: 'Web & App Entwicklung Wien ✓ Next.js ✓ React ✓ Mobile Apps ✓ API-Integrationen. Maßgeschneiderte Software für Ihr Unternehmen. Jetzt Projekt starten!',
      en: 'Web & App Development Vienna ✓ Next.js ✓ React ✓ Mobile Apps ✓ API Integrations. Custom software for your business. Start your project!',
    },
    'it-cloud-services': {
      de: 'IT & Cloud Services Wien ✓ Cloud-Migration ✓ Monitoring ✓ Sicherheit ✓ Managed Hosting. Zuverlässige Infrastruktur für Ihr Unternehmen!',
      en: 'IT & Cloud Services Vienna ✓ Cloud Migration ✓ Monitoring ✓ Security ✓ Managed Hosting. Reliable infrastructure for your business!',
    },
  }
  const description = seoDescriptions[service.slug]?.[locale] || rawDescription

  const locationKeyword = locale === 'de' ? 'Wien' : locale === 'ru' ? 'Вена' : 'Vienna'
  const agencyKeyword = locale === 'de' ? 'Agentur' : locale === 'ru' ? 'Агентство' : 'Agency'
  const countryKeyword = locale === 'de' ? 'Österreich' : locale === 'ru' ? 'Австрия' : 'Austria'

  // Use the correct path structure based on locale
  // slug from params is always German (from DB), translate to English for EN locale
  const enSlug = translateServiceSlugToEn(slug)
  const basePath = locale === 'en' ? `/services/${enSlug}` : `/leistungen/${slug}`
  const canonicalUrl = getCanonicalUrl(basePath, locale)
  const hreflangAlternates = getHreflangAlternates(basePath, locale)

  // Get SEO-optimized title or fallback to basic format
  const seoTitle = serviceSeoTitles[service.slug]?.[locale as 'de' | 'en'] || `${title} ${locationKeyword}`

  return {
    title: seoTitle,
    description: description,
    keywords: [`${title} ${locationKeyword}`, `${title} ${agencyKeyword}`, `${title} ${countryKeyword}`, 'GoldenWing'],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: seoTitle,
      description: description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  // Payload CMS only has 'de' and 'en' locales — use 'de' fallback for 'ru'
  const cmsLocale = (locale === 'ru' ? 'de' : locale) as SupportedLocale
  // Note: slug validation removed - next-intl routing handles path translation
  // The slug received here is always the German slug from the database

  const t = await getTranslations({ locale, namespace: 'servicesPage' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })
  const service = await getServiceBySlug(slug, cmsLocale) as Service | null

  if (!service) {
    notFound()
  }

  const ServiceIcon = iconMap[service.icon] || Target
  const serviceDefaults = locale === 'en' ? serviceDefaultsEN : serviceDefaultsDE
  const defaults = serviceDefaults[service.slug] || { subtitle: '', process: [] }

  // Get enhanced service page data with GSAP animations
  const servicePageData = getServicePageData(service.slug, locale)

  // Use English or Russian translations when CMS doesn't have localized content
  const enTranslation = locale === 'en' ? serviceTranslations[service.slug] : null
  const ruTranslation = locale === 'ru' ? getServiceTranslationRu(service.slug) : null
  const title = ruTranslation?.title || enTranslation?.title || service.title
  const subtitle = ruTranslation?.subtitle || enTranslation?.subtitle || service.subtitle || defaults.subtitle
  const description = ruTranslation?.description || enTranslation?.description || service.description

  // Convert process to proper format (handle both string[] and {step: string}[])
  const rawProcess = service.process || defaults.process
  const process = rawProcess.map((p: string | ProcessStep) =>
    typeof p === 'string' ? p : p.step
  )

  // Convert features to proper format
  const features = service.features?.map((f: string | Feature) =>
    typeof f === 'string' ? { title: f, description: '' } : f
  ) || []

  // SEMrush On-Page: keyword-optimized H1 per service
  const seoH1: Record<string, Record<string, string>> = {
    branding: {
      de: 'Branding Agentur Wien – Markenentwicklung & Corporate Identity',
      en: 'Branding Agency Vienna – Brand Development & Corporate Identity',
    },
    webdesign: {
      de: 'Webdesign Agentur Wien — UX/UI Design & Entwicklung',
      en: 'Web Design Agency Vienna — UX/UI Design & Development',
    },
    'seo-content': {
      de: 'SEO Agentur Wien — Content-Strategie & Optimierung',
      en: 'SEO Agency Vienna — Content Strategy & Optimization',
    },
    'digital-marketing': {
      de: 'Digital Marketing Agentur Wien — Google Ads & Social Media',
      en: 'Digital Marketing Agency Vienna — Google Ads & Social Media',
    },
    'web-app-entwicklung': {
      de: 'Web & App Entwicklung Wien — Next.js & React',
      en: 'Web & App Development Vienna — Next.js & React',
    },
    'it-cloud-services': {
      de: 'IT & Cloud Services Wien — Hosting & Managed Services',
      en: 'IT & Cloud Services Vienna — Hosting & Managed Services',
    },
  }
  const h1 = seoH1[service.slug]?.[locale] || title

  // Fetch related projects for this service category
  const projectCategory = serviceToReferenzen[service.slug]
  const relatedProjects = projectCategory
    ? await getRelatedProjects(projectCategory, '', cmsLocale, 4)
    : []

  return (
    <>
      {/* SEO Schemas */}
      <AggregateRatingSchema ratingValue={4.9} ratingCount={47} />
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: getSchemaUrl('/', locale) },
          { name: { de: 'Leistungen', en: 'Services', ru: 'Услуги' }[locale] || 'Services', url: getSchemaUrl('/leistungen', locale) },
          { name: title, url: getSchemaUrl(`/leistungen/${service.slug}`, locale) },
        ]}
      />
      <ServiceSchema
        name={title}
        description={description}
        slug={service.slug}
      />
      {/* HowTo Schema for Process - Rich Results */}
      {(servicePageData?.process || process.length > 0) && (
        <HowToSchema
          name={{ de: `${title} - Unser Prozess`, en: `${title} - Our Process`, ru: `${title} - Наш процесс` }[locale] || `${title} - Our Process`}
          description={{ de: `So arbeiten wir gemeinsam an Ihrem ${title}-Projekt.`, en: `How we work together on your ${title} project.`, ru: `Как мы работаем над вашим проектом ${title}.` }[locale] || `How we work together on your ${title} project.`}
          steps={(servicePageData?.process || process.map((step, index) => ({
            step: String(index + 1),
            title: step,
            description: '',
          }))).map((step) => ({
            name: step.title,
            text: step.description || step.title,
          }))}
        />
      )}

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
              <ServiceIcon className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {h1}
            </h1>
            {subtitle && (
              <p className="text-2xl text-primary font-medium mb-4">
                {subtitle}
              </p>
            )}
            <p className="text-xl text-muted-foreground">
              {description}
            </p>
          </div>
        </Container>
      </section>

      {/* SEO Intro Text — keyword-rich paragraph with semantic keywords */}
      {(() => {
        const seoIntros: Record<string, Record<string, string>> = {
          branding: {
            de: 'Als erfahrene Branding Agentur in Wien entwickeln wir Ihre Markenidentität von Grund auf. Unser Team verbindet Markenstrategie mit visuellem Erscheinungsbild und schafft eine Corporate Identity, die Ihre Zielgruppe anspricht. Von der Markenpositionierung über das Corporate Design bis hin zu umfassenden Brand Guidelines — wir begleiten den gesamten Prozess der Markenentwicklung. Ob Sie ein neues Brand Identity Projekt starten oder ein Rebranding planen: Wir sorgen dafür, dass Ihre Marke in Wien und darüber hinaus unverwechselbar wird.',
            en: 'As an experienced branding agency in Vienna, we develop your brand identity from the ground up. Our team combines brand strategy with visual identity to create a corporate design that resonates with your audience. From brand positioning and corporate identity to comprehensive brand guidelines — we guide the entire brand development process. Whether you are starting a new brand identity project or planning a rebrand: we ensure your brand becomes unmistakable in Vienna and beyond.',
          },
          webdesign: {
            de: 'Unsere Webdesign Agentur in Wien verbindet UX-Design mit moderner Webentwicklung. Wir erstellen responsive Websites mit durchdachter Informationsarchitektur, die Besucher zu Kunden konvertieren. Von der User Experience über UI-Design bis zur CMS-Entwicklung — unsere Webdesigner setzen auf Performance, Barrierefreiheit und Suchmaschinenoptimierung. Das Ergebnis: Websites, die nicht nur gut aussehen, sondern messbare Ergebnisse liefern.',
            en: 'Our web design agency in Vienna combines UX design with modern web development. We create responsive websites with thoughtful information architecture that convert visitors into customers. From user experience and UI design to CMS development — our web designers focus on performance, accessibility and search engine optimization. The result: websites that not only look great, but deliver measurable results.',
          },
          'seo-content': {
            de: 'Als SEO Agentur in Wien steigern wir Ihre organische Sichtbarkeit nachhaltig. Unser Ansatz verbindet technisches SEO mit einer datengetriebenen Content-Strategie. Von der Keyword-Recherche über On-Page-Optimierung und Local SEO bis zum strategischen Linkbuilding — wir optimieren jeden Aspekt Ihrer Suchmaschinenoptimierung. Mit professionellem SEO-Content und technischer Exzellenz sorgen wir dafür, dass Ihre Website bei Google gefunden wird.',
            en: 'As an SEO agency in Vienna, we sustainably increase your organic visibility. Our approach combines technical SEO with a data-driven content strategy. From keyword research and on-page optimization to local SEO and strategic link building — we optimize every aspect of your search engine optimization. With professional SEO content and technical excellence, we ensure your website gets found on Google.',
          },
          'digital-marketing': {
            de: 'Unsere Digital Marketing Agentur in Wien entwickelt datengetriebene Kampagnen, die Leads und Umsatz steigern. Von Google Ads und Social Media Marketing über E-Mail-Automatisierung bis zur Conversion-Optimierung — wir setzen auf Performance Marketing mit messbaren Ergebnissen. Unser Team plant und optimiert Ihre Online-Marketing-Strategie über alle relevanten Kanäle hinweg.',
            en: 'Our digital marketing agency in Vienna develops data-driven campaigns that increase leads and revenue. From Google Ads and social media marketing to email automation and conversion optimization — we focus on performance marketing with measurable results. Our team plans and optimizes your online marketing strategy across all relevant channels.',
          },
          'web-app-entwicklung': {
            de: 'Als Agentur für Web- und App-Entwicklung in Wien setzen wir auf moderne Technologien wie Next.js, React und TypeScript. Von der technischen Architektur über die agile Entwicklung bis zu API-Integrationen — wir entwickeln maßgeschneiderte Webanwendungen und Mobile Apps, die skalieren. Unser Entwicklerteam kombiniert Clean Code mit Performance-Optimierung für zuverlässige digitale Produkte.',
            en: 'As a web and app development agency in Vienna, we leverage modern technologies like Next.js, React and TypeScript. From technical architecture and agile development to API integrations — we build custom web applications and mobile apps that scale. Our development team combines clean code with performance optimization for reliable digital products.',
          },
          'it-cloud-services': {
            de: 'Unsere IT & Cloud Services in Wien bieten Ihnen eine zuverlässige digitale Infrastruktur. Von der Cloud-Architektur und -Migration über Monitoring und Wartung bis zu Sicherheitslösungen und Backups — wir sorgen dafür, dass Ihre Systeme rund um die Uhr stabil laufen. Als Managed-Services-Partner übernehmen wir das technische Hosting und den Support für Ihr Unternehmen.',
            en: 'Our IT & Cloud services in Vienna provide you with reliable digital infrastructure. From cloud architecture and migration to monitoring, maintenance, security solutions and backups — we ensure your systems run smoothly around the clock. As your managed services partner, we handle the technical hosting and support for your business.',
          },
        }
        const intro = seoIntros[service.slug]?.[locale]
        if (!intro) return null
        return (
          <section className="pb-12">
            <Container variant="block">
              <div className="max-w-3xl">
                <p className="text-muted-foreground leading-relaxed">
                  {intro}
                </p>
              </div>
            </Container>
          </section>
        )
      })()}

      {/* Sub-Services */}
      {service.subServices && service.subServices.length > 0 && (
        <section className="pb-20">
          <Container variant="block">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('detailTitle')}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {t('detailDescription')}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.subServices.map((subService) => {
                const SubIcon = getIcon(subService.icon)
                // Get English or Russian translation for sub-service if available
                const subServiceEN = locale === 'en' ? subServiceTranslationsEN[subService.slug] : null
                const subServiceRU = locale === 'ru' ? getSubServiceTranslationRu(subService.slug) : null
                const subTitle = subServiceRU?.title || subServiceEN?.title || subService.title
                const subSubtitle = subServiceRU?.subtitle || subServiceEN?.subtitle || subService.subtitle
                const subDescription = subServiceRU?.description || subServiceEN?.description || subService.description
                return (
                  <NextLink
                    key={subService.id}
                    href={getSubServiceUrl(service.slug, subService.slug, locale)}
                    className="group"
                  >
                    <div className="bg-card rounded-lg border p-6 h-full hover:border-primary hover:shadow-lg transition-all">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <SubIcon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {subTitle}
                      </h3>
                      {subSubtitle && (
                        <p className="text-sm text-primary font-medium mb-2">
                          {subSubtitle}
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {subDescription}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        {tCommon('learnMore')}
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </NextLink>
                )
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="pb-20">
          <Container variant="block">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">{t('whatWeOffer')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-card rounded-lg border p-6"
                >
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  {feature.description && (
                    <p className="text-muted-foreground">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Process Section with different layouts per service */}
      {(servicePageData?.process || process.length > 0) && (
        <ServiceProcessSection
          serviceSlug={service.slug}
          title={t('ourProcess')}
          subtitle={{ de: 'So arbeiten wir gemeinsam an Ihrem Erfolg.', en: 'How we work together for your success.', ru: 'Как мы работаем вместе над вашим успехом.' }[locale] || 'How we work together for your success.'}
          steps={servicePageData?.process || process.map((step, index) => ({
            step: String(index + 1),
            title: step,
            description: '',
          }))}
          locale={locale as 'de' | 'en'}
        />
      )}

      {/* Why Choose Us Section */}
      {servicePageData?.whyChooseUs && (
        <WhyChooseUs
          title={{ de: 'Warum GoldenWing?', en: 'Why GoldenWing?', ru: 'Почему GoldenWing?' }[locale] || 'Why GoldenWing?'}
          subtitle={{ de: 'Was uns von anderen unterscheidet.', en: 'What sets us apart from others.', ru: 'Что отличает нас от других.' }[locale] || 'What sets us apart from others.'}
          reasons={servicePageData.whyChooseUs}
        />
      )}

      {/* Comparison Table - SEO optimized */}
      {getServiceComparison(service.slug, locale) && (
        <ComparisonTable
          {...getServiceComparison(service.slug, locale)!}
          className="bg-muted/30"
          locale={locale}
        />
      )}

      {/* Logo Portfolio - only for branding */}
      {service.slug === 'branding' && (
        <LogoPortfolio locale={locale} />
      )}

      {/* Stats Section - AEO optimized with sources */}
      {getServiceStats(service.slug, locale) && (
        <StatsSection
          title={{ de: 'Warum das wichtig ist', en: 'Why This Matters', ru: 'Почему это важно' }[locale] || 'Why This Matters'}
          subtitle={{ de: 'Fakten und Statistiken, die für sich sprechen.', en: 'Facts and statistics that speak for themselves.', ru: 'Факты и статистика, которые говорят сами за себя.' }[locale] || 'Facts and statistics that speak for themselves.'}
          stats={getServiceStats(service.slug, locale)!}
          className="bg-muted/30"
        />
      )}

      {/* FAQ Section */}
      {getServiceFAQs(service.slug, locale) && (
        <FAQSection
          title={t('faqTitle')}
          subtitle={t('faqSubtitle', { service: service.title })}
          items={getServiceFAQs(service.slug, locale)!}
          className="bg-muted/30"
        />
      )}

      {/* Key Takeaways - AEO summary block */}
      {getServiceTakeaways(service.slug, locale) && (
        <section className="py-16 md:py-20">
          <Container variant="block">
            <KeyTakeaways
              points={getServiceTakeaways(service.slug, locale)!}
              title={{ de: 'Das Wichtigste zusammengefasst', en: 'Key Takeaways', ru: 'Ключевые выводы' }[locale] || 'Key Takeaways'}
              variant="highlight"
            />
          </Container>
        </section>
      )}

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="py-16">
          <Container variant="block">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              {{ de: `${title} Projekte`, en: `${title} Projects`, ru: `Проекты: ${title}` }[locale] || `${title} Projects`}
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              {{ de: 'Ausgewählte Projekte aus diesem Bereich.', en: 'Selected projects from this area.', ru: 'Избранные проекты в этой области.' }[locale] || 'Selected projects from this area.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProjects.slice(0, 4).map((project) => {
                const p = project as unknown as { id: string; slug: string; title: string; client?: string; mainImage?: { url?: string; alt?: string } }
                return (
                  <NextLink
                    key={p.id}
                    href={`/projekte/${p.slug}`}
                    className="group block overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow"
                  >
                    {p.mainImage?.url && (
                      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                        <Image
                          src={getMediaUrl(p.mainImage.url)}
                          alt={p.mainImage.alt || p.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">{p.title}</h3>
                      {p.client && (
                        <p className="text-xs text-muted-foreground mt-1">{p.client}</p>
                      )}
                    </div>
                  </NextLink>
                )
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Referenzen Link Section */}
      {serviceToReferenzen[service.slug] && (
        <section className="py-16 bg-muted/30">
          <Container variant="block">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {{ de: `${title} Referenzen`, en: `${title} References`, ru: `${title} — Референсы` }[locale] || `${title} References`}
                </h2>
                <p className="text-muted-foreground">
                  {{ de: 'Entdecken Sie unsere erfolgreichen Projekte in diesem Bereich.', en: 'Discover our successful projects in this area.', ru: 'Ознакомьтесь с нашими успешными проектами в этой области.' }[locale] || 'Discover our successful projects in this area.'}
                </p>
              </div>
              <Button variant="outline" size="lg" asChild>
                <NextLink href={getReferenzCategoryUrl(serviceToReferenzen[service.slug], locale)}>
                  {{ de: 'Referenzen ansehen', en: 'View References', ru: 'Смотреть референсы' }[locale] || 'View References'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Related Services - Internal Linking */}
      <section className="py-16">
        <Container variant="block">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            {{ de: 'Weitere Leistungen', en: 'More Services', ru: 'Другие услуги' }[locale] || 'More Services'}
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            {{ de: 'Entdecken Sie unsere weiteren Leistungen für ganzheitliche digitale Lösungen.', en: 'Discover our other services for comprehensive digital solutions.', ru: 'Откройте для себя другие наши услуги для комплексных цифровых решений.' }[locale] || 'Discover our other services for comprehensive digital solutions.'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { slugDe: 'branding', title: { de: 'Branding', en: 'Branding', ru: 'Брендинг' }[locale] || 'Branding' },
              { slugDe: 'webdesign', title: { de: 'Webdesign', en: 'Web Design', ru: 'Веб-дизайн' }[locale] || 'Web Design' },
              { slugDe: 'digital-marketing', title: { de: 'Digital Marketing', en: 'Digital Marketing', ru: 'Цифровой маркетинг' }[locale] || 'Digital Marketing' },
              { slugDe: 'seo-content', title: { de: 'SEO & Content', en: 'SEO & Content', ru: 'SEO и контент' }[locale] || 'SEO & Content' },
              { slugDe: 'web-app-entwicklung', title: { de: 'Web-Entwicklung', en: 'Web Development', ru: 'Веб-разработка' }[locale] || 'Web Development' },
              { slugDe: 'it-cloud-services', title: { de: 'IT & Cloud', en: 'IT & Cloud', ru: 'IT и облако' }[locale] || 'IT & Cloud' },
            ].filter(s => s.slugDe !== service.slug).map((s) => (
              <NextLink
                key={s.slugDe}
                href={getServiceUrl(s.slugDe, locale)}
                className="group flex items-center justify-center p-4 bg-card rounded-lg border hover:border-primary hover:shadow-md transition-all text-center"
              >
                <span className="font-medium group-hover:text-primary transition-colors">{s.title}</span>
              </NextLink>
            ))}
          </div>
        </Container>
      </section>

      {/* Service in Your City - GEO/SEO Hub-and-Spoke Links */}
      {(() => {
        // Map service slugs to city-service pages that exist
        const serviceToLocationPages: Record<string, Array<{ city: string; cityDe: string; slug: string }>> = {
          webdesign: [
            { city: locale === 'en' ? 'Vienna' : locale === 'ru' ? 'Вена' : 'Wien', cityDe: 'wien', slug: 'webdesign' },
            { city: 'Graz', cityDe: 'graz', slug: 'webdesign' },
            { city: 'Linz', cityDe: 'linz', slug: 'webdesign' },
            { city: 'Salzburg', cityDe: 'salzburg', slug: 'webdesign' },
            { city: 'Innsbruck', cityDe: 'innsbruck', slug: 'webdesign' },
            { city: locale === 'en' ? 'Munich' : locale === 'ru' ? 'Мюнхен' : 'München', cityDe: 'muenchen', slug: 'webdesign' },
            { city: locale === 'ru' ? 'Берлин' : 'Berlin', cityDe: 'berlin', slug: 'webdesign' },
            { city: locale === 'en' ? 'Zurich' : locale === 'ru' ? 'Цюрих' : 'Zürich', cityDe: 'zuerich', slug: 'webdesign' },
          ],
          'seo-content': [
            { city: locale === 'en' ? 'Vienna' : locale === 'ru' ? 'Вена' : 'Wien', cityDe: 'wien', slug: 'seo' },
            { city: 'Graz', cityDe: 'graz', slug: 'seo' },
            { city: 'Linz', cityDe: 'linz', slug: 'seo' },
            { city: locale === 'en' ? 'Munich' : locale === 'ru' ? 'Мюнхен' : 'München', cityDe: 'muenchen', slug: 'seo' },
            { city: locale === 'ru' ? 'Берлин' : 'Berlin', cityDe: 'berlin', slug: 'seo' },
            { city: locale === 'en' ? 'Zurich' : locale === 'ru' ? 'Цюрих' : 'Zürich', cityDe: 'zuerich', slug: 'seo' },
          ],
          branding: [
            { city: locale === 'en' ? 'Vienna' : locale === 'ru' ? 'Вена' : 'Wien', cityDe: 'wien', slug: 'branding' },
          ],
          'digital-marketing': [
            { city: locale === 'en' ? 'Vienna' : locale === 'ru' ? 'Вена' : 'Wien', cityDe: 'wien', slug: 'google-ads' },
            { city: 'Graz', cityDe: 'graz', slug: 'online-marketing' },
          ],
        }
        const locationPages = serviceToLocationPages[service.slug]
        if (!locationPages || locationPages.length === 0) return null

        return (
          <section className="py-16 bg-muted/30">
            <Container variant="block">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                {{ de: `${title} in Ihrer Stadt`, en: `${title} in Your City`, ru: `${title} в вашем городе` }[locale] || `${title} in Your City`}
              </h2>
              <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                {{ de: 'Von Wien aus betreuen wir Kunden in ganz Österreich, Deutschland und der Schweiz.', en: 'From Vienna, we serve clients across Austria, Germany, and Switzerland.', ru: 'Из Вены мы обслуживаем клиентов по всей Австрии, Германии и Швейцарии.' }[locale] || 'From Vienna, we serve clients across Austria, Germany, and Switzerland.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {locationPages.map((loc) => (
                  <NextLink
                    key={loc.cityDe}
                    href={`/standorte/${loc.cityDe}/${loc.slug}`}
                    className="group flex items-center gap-2 px-5 py-3 bg-background rounded-lg border hover:border-primary hover:shadow-md transition-all"
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {{ de: `${title} ${loc.city}`, en: `${title} ${loc.city}`, ru: `${title} ${loc.city}` }[locale] || `${title} ${loc.city}`}
                    </span>
                  </NextLink>
                ))}
              </div>
            </Container>
          </section>
        )
      })()}

      {/* CTA */}
      <section className="py-20">
        <Container variant="block">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('interestedTitle')}
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t('interestedDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <NextLink href="/kontakt">
                  {t('inquireNow')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
                <NextLink href="/leistungen">
                  {t('allServices')}
                </NextLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
