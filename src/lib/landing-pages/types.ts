export type Locale = 'de' | 'en' | 'ru'

export interface CityConfig {
  slug: string
  cityName: Record<Locale, string>
  regionName?: Record<Locale, string>
  country: 'AT' | 'DE' | 'CH' | 'AE'
}

export interface IndustryConfig {
  slug: string
  name: Record<Locale, string>
  icon: string
}

export interface TrustSignal {
  icon: string
  text: string
}

export interface Benefit {
  icon: string
  title: string
  description: string
}

export interface Result {
  metric: string
  label: string
  detail: string
}

export interface Service {
  icon: string
  title: string
  description: string
}

export interface Package {
  name: string
  price: string
  priceType?: string
  description: string
  popular: boolean
  features: string[]
}

export interface ProcessStep {
  step: string
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface RelatedService {
  title: string
  description: string
  href: string
}

export interface LandingPageLabels {
  pricingTitle: string
  pricingDescription: string
  processTitle: string
  processSubtitle: string
  technologiesTitle: string
  technologiesDescription: string
  servicesTitle: string
  servicesDescription: string
  resultsTitle: string
  faqTitle: string
  faqSubtitle: string
  relatedServicesTitle: string
  ctaTitle: string
  ctaDescription: string
  ctaButton: string
  popular: string
  oneTime: string
  sendRequest: string
  learnMore: string
}

export interface LandingPageHero {
  badge: string
  title: string
  description: string
  ctaPrimary: string
  ctaSecondary: string
}

export interface LandingPageContent {
  hero: LandingPageHero
  trustSignals?: TrustSignal[]
  benefits?: Benefit[]
  results?: Result[]
  services?: Service[]
  packages?: Package[]
  process?: ProcessStep[]
  technologies?: string[]
  faqs?: FAQ[]
  relatedServices?: RelatedService[]
  labels: LandingPageLabels
}

export interface LandingPageSEO {
  serviceName: string
  alternateName?: string
  cityName: string
  cityType: 'City' | 'Country'
  url: string
  localBusiness: LocalBusinessInfo
  breadcrumbs: Array<{ name: string; url: string }>
}

export interface LocalBusinessInfo {
  name: string
  address: string
  city: string
  country: string
  phone?: string
  email: string
}

export type ServiceType = 'webdesign' | 'seo' | 'branding' | 'marketing'
