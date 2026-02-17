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
    title: 'UI Design & Design Systems Wien | Digitale Produkte gestalten',
    description: 'UI Design Agentur Wien. Design Systems, Component Libraries, Figma. Konsistente User Interfaces für Web und App. Jetzt Design-Beratung anfragen.',
    keywords: ['UI Design Wien', 'Design System Agentur', 'User Interface Design'],
  },
  en: {
    title: 'UI Design & Design Systems Vienna | Digital Product Design',
    description: 'UI design agency Vienna. Design systems, component libraries, Figma. Consistent user interfaces for web and app. Request design consultation.',
    keywords: ['UI Design Vienna', 'Design System Agency', 'User Interface Design'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'UI Design & Design Systems',
      title: 'UI Design & Design Systems Wien',
      description: 'Konsistente, skalierbare User Interfaces. Von der ersten Komponente bis zum vollständigen Design System – wir gestalten digitale Produkte, die Nutzer lieben.',
      ctaPrimary: 'Design-Workshop buchen',
      ctaSecondary: 'Portfolio ansehen',
    },
    trustSignals: [
      { icon: 'palette', text: '50+ Design Systems' },
      { icon: 'figma', text: 'Figma-Experten' },
      { icon: 'layers', text: 'Skalierbar' },
      { icon: 'users', text: 'User-Centered' },
    ],
    benefits: [
      {
        icon: 'layers',
        title: 'Design System',
        description: 'Wiederverwendbare Komponenten für konsistentes Design über alle Produkte.',
      },
      {
        icon: 'palette',
        title: 'UI Design',
        description: 'Pixel-perfekte Interfaces, die gut aussehen und funktionieren.',
      },
      {
        icon: 'users',
        title: 'UX Research',
        description: 'Nutzerforschung und Testing für evidenzbasierte Designentscheidungen.',
      },
      {
        icon: 'code',
        title: 'Dev Handoff',
        description: 'Figma-to-Code: Saubere Übergabe an Entwickler mit Specs und Assets.',
      },
    ],
    results: [
      { metric: '-60%', label: 'Design-Zeit', detail: 'Durch Design System' },
      { metric: '+40%', label: 'Conversion', detail: 'Durch bessere UX' },
      { metric: '100%', label: 'Konsistenz', detail: 'Über alle Touchpoints' },
    ],
    services: [
      {
        icon: 'layers',
        title: 'Design System Entwicklung',
        description: 'Vollständiges Design System mit Tokens, Komponenten, Pattern Library und Styleguide.',
      },
      {
        icon: 'palette',
        title: 'UI Design',
        description: 'User Interface Design für Web-Apps, Mobile Apps und SaaS-Produkte. Wireframes bis High-Fidelity.',
      },
      {
        icon: 'users',
        title: 'UX Design',
        description: 'User Experience Design mit Nutzerforschung, User Flows und Usability Testing.',
      },
    ],
    packages: [
      {
        name: 'UI Starter',
        price: '2.990',
        priceType: 'einmalig',
        description: 'Für einzelne Screens.',
        popular: false,
        features: ['Bis zu 10 Screens', 'Responsive Design', 'Figma Übergabe', 'Basis-Komponenten'],
      },
      {
        name: 'Design System',
        price: '9.990',
        priceType: 'einmalig',
        description: 'Vollständiges System.',
        popular: true,
        features: ['Design Tokens', 'Component Library', 'Pattern Documentation', 'Figma Library', 'Storybook-ready'],
      },
      {
        name: 'Product Design',
        price: '4.990',
        priceType: 'monatlich',
        description: 'Laufende Betreuung.',
        popular: false,
        features: ['Dedicated Designer', 'Unbegrenzte Screens', 'Wöchentliche Calls', 'Rapid Prototyping', 'User Testing'],
      },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Anforderungen verstehen.' },
      { step: '02', title: 'Audit', description: 'Bestehendes Design analysieren.' },
      { step: '03', title: 'Foundation', description: 'Design Tokens definieren.' },
      { step: '04', title: 'Components', description: 'Komponenten erstellen.' },
      { step: '05', title: 'Documentation', description: 'Styleguide dokumentieren.' },
    ],
    technologies: ['Figma', 'Storybook', 'Tailwind CSS', 'shadcn/ui', 'Framer'],
    faqs: [
      {
        question: 'Was ist ein Design System?',
        answer: 'Ein Design System ist eine Sammlung von wiederverwendbaren Komponenten, Designrichtlinien und Tokens (Farben, Typografie, Spacing), die konsistentes Design über alle Produkte ermöglichen.',
      },
      {
        question: 'Wann lohnt sich ein Design System?',
        answer: 'Ein Design System lohnt sich, sobald Sie mehrere Produkte, ein größeres Team oder langfristige Entwicklung haben. Es spart Zeit, reduziert Inkonsistenzen und beschleunigt die Entwicklung.',
      },
      {
        question: 'Arbeiten Sie mit Figma?',
        answer: 'Ja, Figma ist unser Haupttool. Wir erstellen vollständige Figma Libraries mit Auto-Layout, Variants und Design Tokens, die direkt in die Entwicklung übernommen werden können.',
      },
    ],
    relatedServices: [
      { title: 'Webdesign', description: 'Websites gestalten.', href: '/leistungen/webdesign' as any },
      { title: 'Branding', description: 'Markenidentität entwickeln.', href: '/leistungen/branding' as any },
      { title: 'App Entwicklung', description: 'Mobile Apps designen.', href: '/leistungen/app-entwicklung' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'UI Design Pakete',
      pricingDescription: 'Design, das skaliert.',
      faqTitle: 'Häufige Fragen zu UI Design',
      ctaTitle: 'Design System entwickeln?',
      ctaDescription: 'Kostenloser Design-Workshop.',
    },
  },
  en: {
    hero: {
      badge: 'UI Design & Design Systems',
      title: 'UI Design & Design Systems Vienna',
      description: 'Consistent, scalable user interfaces. From the first component to a complete design system – we create digital products that users love.',
      ctaPrimary: 'Book Design Workshop',
      ctaSecondary: 'View Portfolio',
    },
    trustSignals: [
      { icon: 'palette', text: '50+ Design Systems' },
      { icon: 'figma', text: 'Figma Experts' },
      { icon: 'layers', text: 'Scalable' },
      { icon: 'users', text: 'User-Centered' },
    ],
    benefits: [
      { icon: 'layers', title: 'Design System', description: 'Reusable components for consistent design across all products.' },
      { icon: 'palette', title: 'UI Design', description: 'Pixel-perfect interfaces that look good and work well.' },
      { icon: 'users', title: 'UX Research', description: 'User research and testing for evidence-based design decisions.' },
      { icon: 'code', title: 'Dev Handoff', description: 'Figma-to-code: Clean handoff to developers with specs and assets.' },
    ],
    results: [
      { metric: '-60%', label: 'Design Time', detail: 'Through design system' },
      { metric: '+40%', label: 'Conversion', detail: 'Through better UX' },
    ],
    services: [
      { icon: 'layers', title: 'Design System Development', description: 'Complete design system with tokens, components, pattern library and styleguide.' },
      { icon: 'palette', title: 'UI Design', description: 'User interface design for web apps, mobile apps and SaaS products. Wireframes to high-fidelity.' },
      { icon: 'users', title: 'UX Design', description: 'User experience design with user research, user flows and usability testing.' },
    ],
    packages: [
      { name: 'UI Starter', price: '2,990', priceType: 'one-time', description: 'For individual screens.', popular: false, features: ['Up to 10 screens', 'Responsive design', 'Figma handoff'] },
      { name: 'Design System', price: '9,990', priceType: 'one-time', description: 'Complete system.', popular: true, features: ['Design tokens', 'Component library', 'Pattern documentation', 'Figma library'] },
      { name: 'Product Design', price: '4,990', priceType: 'monthly', description: 'Ongoing support.', popular: false, features: ['Dedicated designer', 'Unlimited screens', 'Weekly calls', 'Rapid prototyping'] },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Understand requirements.' },
      { step: '02', title: 'Audit', description: 'Analyze existing design.' },
      { step: '03', title: 'Foundation', description: 'Define design tokens.' },
      { step: '04', title: 'Components', description: 'Create components.' },
    ],
    technologies: ['Figma', 'Storybook', 'Tailwind CSS', 'shadcn/ui'],
    faqs: [
      { question: 'What is a design system?', answer: 'A design system is a collection of reusable components, design guidelines and tokens (colors, typography, spacing) that enable consistent design across all products.' },
      { question: 'When is a design system worth it?', answer: 'A design system is worth it as soon as you have multiple products, a larger team or long-term development.' },
    ],
    relatedServices: [
      { title: 'Web Design', description: 'Design websites.', href: '/services/webdesign' as any },
      { title: 'Branding', description: 'Develop brand identity.', href: '/services/branding' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'UI Design Packages',
      faqTitle: 'UI Design FAQ',
      ctaTitle: 'Develop design system?',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/webdesign/ui-design-design-systems'
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

export default async function UiDesignDesignSystemsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: 'UI Design & Design Systems',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/webdesign/ui-design-design-systems',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'Webdesign', url: locale === 'de' ? 'https://goldenwing.at/leistungen/webdesign' : 'https://goldenwing.at/en/services/webdesign' },
      { name: 'UI Design & Design Systems', url: 'https://goldenwing.at/leistungen/webdesign/ui-design-design-systems' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
