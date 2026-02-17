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
    title: 'GEO Agentur Wien | Generative Engine Optimization | GoldenWing',
    description: 'GEO Agentur Wien: Optimierung für ChatGPT, Perplexity & Google AI Overviews. Werden Sie die Quelle, die KI-Systeme zitieren. Erste GEO-Agentur in Österreich.',
    keywords: ['GEO Agentur Wien', 'Generative Engine Optimization', 'AI SEO', 'ChatGPT Optimierung', 'Perplexity SEO', 'LLM Optimierung', 'GEO Österreich'],
  },
  en: {
    title: 'GEO Agency Vienna | Generative Engine Optimization | GoldenWing',
    description: 'GEO agency Vienna: Optimization for ChatGPT, Perplexity & Google AI Overviews. Become the source AI systems cite. First GEO agency in Austria.',
    keywords: ['GEO Agency Vienna', 'Generative Engine Optimization', 'AI SEO', 'ChatGPT Optimization', 'Perplexity SEO', 'LLM Optimization'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'GEO — Generative Engine Optimization',
      title: 'Die Zukunft der Suche hat begonnen',
      description: '40% der Gen-Z suchen bereits über ChatGPT statt Google. Wir optimieren Ihre Präsenz für KI-Suchsysteme — damit Sie nicht nur ranken, sondern zitiert werden.',
      ctaPrimary: 'GEO-Audit anfragen',
      ctaSecondary: 'Mehr erfahren',
    },
    trustSignals: [
      { icon: 'zap', text: 'Erste GEO-Agentur in AT' },
      { icon: 'brain', text: 'AI-Search Experten' },
      { icon: 'shield', text: 'E-E-A-T zertifiziert' },
      { icon: 'trending-up', text: 'Messbare Ergebnisse' },
    ],
    benefits: [
      {
        icon: 'brain',
        title: 'AI-Sichtbarkeit',
        description: 'Optimierung für ChatGPT, Perplexity, Google AI Overviews, Claude und alle generativen Suchsysteme. Werden Sie die Quelle, die KI zitiert.',
      },
      {
        icon: 'file-text',
        title: 'llms.txt Implementation',
        description: 'Die neue robots.txt für KI: Strukturierte Informationen über Ihr Unternehmen, die LLMs direkt verstehen und verwenden.',
      },
      {
        icon: 'code',
        title: 'Schema Markup & Structured Data',
        description: 'Erweiterte Schema.org-Implementierung, die Ihre Inhalte maschinenlesbar und zitierfähig macht.',
      },
      {
        icon: 'shield',
        title: 'E-E-A-T für LLMs',
        description: 'Experience, Expertise, Authoritativeness, Trustworthiness — optimiert nicht nur für Google, sondern für alle AI-Systeme.',
      },
      {
        icon: 'target',
        title: 'Citation Building',
        description: 'Strategischer Aufbau von Mentions und Zitaten in Quellen, die LLMs als vertrauenswürdig einstufen.',
      },
      {
        icon: 'bar-chart',
        title: 'AI-Search Monitoring',
        description: 'Tracking Ihrer Sichtbarkeit in ChatGPT, Perplexity und Google AI Overviews. Konkurrenzanalyse in der AI-Suche.',
      },
    ],
    results: [
      { metric: '25%', label: 'Aller Google-Suchen', detail: 'Zeigen AI Overviews' },
      { metric: '100M+', label: 'Perplexity-Anfragen', detail: 'Pro Monat weltweit' },
      { metric: '40%', label: 'Gen-Z nutzt AI', detail: 'Statt Google-Suche' },
    ],
    packages: [
      {
        name: 'GEO Audit',
        price: '990',
        priceType: 'einmalig',
        description: 'Wo stehen Sie in der AI-Suche?',
        popular: false,
        features: [
          'AI-Sichtbarkeits-Analyse',
          'Konkurrenz-Check in ChatGPT & Perplexity',
          'Schema Markup Audit',
          'llms.txt Empfehlung',
          'Actionable Roadmap',
        ],
      },
      {
        name: 'GEO Growth',
        price: '1.490',
        priceType: 'monatlich',
        description: 'Für aktive AI-Sichtbarkeit.',
        popular: true,
        features: [
          'Alles aus GEO Audit',
          'llms.txt Implementierung',
          'Schema Markup Optimierung',
          'Content-Optimierung für AI-Zitate',
          'Monatliches AI-Search Reporting',
          'Citation Building',
        ],
      },
      {
        name: 'GEO Enterprise',
        price: '2.990',
        priceType: 'monatlich',
        description: 'Für maximale AI-Dominanz.',
        popular: false,
        features: [
          'Alles aus GEO Growth',
          'AI-First Content-Strategie',
          'Mehrsprachige GEO-Optimierung',
          'Wettbewerber-Monitoring (AI-Suche)',
          'Strategische Beratung & Workshops',
          'Priority Support',
        ],
      },
    ],
    process: [
      { step: '01', title: 'AI-Audit', description: 'Wir prüfen Ihre aktuelle Sichtbarkeit in ChatGPT, Perplexity und Google AI Overviews.' },
      { step: '02', title: 'Strategie', description: 'Basierend auf dem Audit entwickeln wir Ihre individuelle GEO-Strategie.' },
      { step: '03', title: 'Technische Optimierung', description: 'llms.txt, Schema Markup, strukturierte Daten — die technische Basis.' },
      { step: '04', title: 'Content-Optimierung', description: 'Inhalte so formulieren, dass KI-Systeme sie als autoritative Quelle erkennen.' },
      { step: '05', title: 'Monitoring & Iteration', description: 'Kontinuierliches Tracking und Optimierung Ihrer AI-Sichtbarkeit.' },
    ],
    technologies: ['ChatGPT', 'Perplexity', 'Google AI Overviews', 'Claude', 'Schema.org', 'llms.txt', 'Semrush', 'Ahrefs'],
    faqs: [
      {
        question: 'Was ist GEO (Generative Engine Optimization)?',
        answer: 'GEO ist die Optimierung Ihrer Online-Präsenz für KI-gestützte Suchsysteme wie ChatGPT, Perplexity und Google AI Overviews. Während klassisches SEO auf Top-10-Rankings abzielt, sorgt GEO dafür, dass Ihr Unternehmen in AI-Antworten zitiert wird.',
      },
      {
        question: 'Ersetzt GEO klassisches SEO?',
        answer: 'Nein! GEO ergänzt SEO. Eine starke SEO-Basis (schnelle Website, guter Content, Backlinks) ist auch für GEO wichtig. GEO fügt eine neue Ebene hinzu: Optimierung speziell für AI-Systeme.',
      },
      {
        question: 'Wie messen Sie den Erfolg von GEO?',
        answer: 'Wir tracken Ihre Sichtbarkeit in AI-Suchsystemen: Werden Sie von ChatGPT genannt? Zitiert Perplexity Ihre Website? Erscheinen Sie in Google AI Overviews? Dazu messen wir Citation-Häufigkeit, Mention-Qualität und AI-referral Traffic.',
      },
      {
        question: 'Was ist llms.txt?',
        answer: 'llms.txt ist ein neuer Standard (ähnlich robots.txt), der KI-Systemen strukturierte Informationen über Ihre Website bereitstellt. Es hilft LLMs, Ihr Unternehmen korrekt zu verstehen und zu zitieren.',
      },
      {
        question: 'Warum sollte ich jetzt mit GEO starten?',
        answer: 'First-Mover-Vorteil: Die meisten Unternehmen optimieren noch nicht für AI-Suche. Wer jetzt anfängt, baut einen Vorsprung auf, der schwer aufzuholen ist. 40% der Gen-Z suchen bereits über AI statt Google — der Trend beschleunigt sich.',
      },
      {
        question: 'Für welche Branchen ist GEO relevant?',
        answer: 'Für jede Branche, in der potenzielle Kunden online nach Lösungen suchen. Besonders relevant: Professional Services, Gesundheitswesen, Recht, Beratung, Technologie, Immobilien und E-Commerce.',
      },
    ],
    relatedServices: [
      { title: 'SEO & Content', description: 'Klassisches SEO als Basis.', href: '/leistungen/seo-content' as any },
      { title: 'Content-Strategie', description: 'AI-optimierter Content.', href: '/leistungen/seo-content/content-strategie-produktion' as any },
      { title: 'Digital Marketing', description: 'Ganzheitliches Marketing.', href: '/leistungen/digital-marketing' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'GEO Pakete',
      pricingDescription: 'Sichtbar in der AI-Suche werden.',
      faqTitle: 'Häufige Fragen zu GEO',
      faqSubtitle: 'Alles über Generative Engine Optimization.',
      ctaTitle: 'Bereit für die Zukunft der Suche?',
      ctaDescription: 'Kostenloses GEO-Audit: Wir zeigen Ihnen, wie sichtbar Sie in ChatGPT, Perplexity und Google AI sind.',
      ctaButton: 'GEO-Audit anfragen',
    },
  },
  en: {
    hero: {
      badge: 'GEO — Generative Engine Optimization',
      title: 'The Future of Search Has Begun',
      description: '40% of Gen-Z already search via ChatGPT instead of Google. We optimize your presence for AI search systems — so you don\'t just rank, you get cited.',
      ctaPrimary: 'Request GEO Audit',
      ctaSecondary: 'Learn More',
    },
    trustSignals: [
      { icon: 'zap', text: 'First GEO Agency in AT' },
      { icon: 'brain', text: 'AI Search Experts' },
      { icon: 'shield', text: 'E-E-A-T Certified' },
      { icon: 'trending-up', text: 'Measurable Results' },
    ],
    benefits: [
      { icon: 'brain', title: 'AI Visibility', description: 'Optimization for ChatGPT, Perplexity, Google AI Overviews, Claude and all generative search systems.' },
      { icon: 'file-text', title: 'llms.txt Implementation', description: 'The new robots.txt for AI: Structured information about your business that LLMs understand and use directly.' },
      { icon: 'code', title: 'Schema Markup & Structured Data', description: 'Extended Schema.org implementation that makes your content machine-readable and citable.' },
      { icon: 'shield', title: 'E-E-A-T for LLMs', description: 'Experience, Expertise, Authoritativeness, Trustworthiness — optimized not just for Google, but for all AI systems.' },
      { icon: 'target', title: 'Citation Building', description: 'Strategic building of mentions and citations in sources that LLMs consider trustworthy.' },
      { icon: 'bar-chart', title: 'AI Search Monitoring', description: 'Tracking your visibility in ChatGPT, Perplexity and Google AI Overviews.' },
    ],
    results: [
      { metric: '25%', label: 'Of All Google Searches', detail: 'Show AI Overviews' },
      { metric: '100M+', label: 'Perplexity Queries', detail: 'Per Month Worldwide' },
      { metric: '40%', label: 'Gen-Z Uses AI', detail: 'Instead of Google Search' },
    ],
    packages: [
      { name: 'GEO Audit', price: '990', priceType: 'one-time', description: 'Where do you stand in AI search?', popular: false, features: ['AI Visibility Analysis', 'Competitor Check in ChatGPT & Perplexity', 'Schema Markup Audit', 'llms.txt Recommendation', 'Actionable Roadmap'] },
      { name: 'GEO Growth', price: '1,490', priceType: 'monthly', description: 'For active AI visibility.', popular: true, features: ['Everything from GEO Audit', 'llms.txt Implementation', 'Schema Markup Optimization', 'Content Optimization for AI Citations', 'Monthly AI Search Reporting', 'Citation Building'] },
      { name: 'GEO Enterprise', price: '2,990', priceType: 'monthly', description: 'For maximum AI dominance.', popular: false, features: ['Everything from GEO Growth', 'AI-First Content Strategy', 'Multilingual GEO Optimization', 'Competitor Monitoring (AI Search)', 'Strategic Consulting & Workshops', 'Priority Support'] },
    ],
    process: [
      { step: '01', title: 'AI Audit', description: 'We check your current visibility in ChatGPT, Perplexity and Google AI Overviews.' },
      { step: '02', title: 'Strategy', description: 'Based on the audit, we develop your individual GEO strategy.' },
      { step: '03', title: 'Technical Optimization', description: 'llms.txt, Schema Markup, structured data — the technical foundation.' },
      { step: '04', title: 'Content Optimization', description: 'Formulate content so AI systems recognize it as an authoritative source.' },
      { step: '05', title: 'Monitoring & Iteration', description: 'Continuous tracking and optimization of your AI visibility.' },
    ],
    technologies: ['ChatGPT', 'Perplexity', 'Google AI Overviews', 'Claude', 'Schema.org', 'llms.txt', 'Semrush', 'Ahrefs'],
    faqs: [
      { question: 'What is GEO (Generative Engine Optimization)?', answer: 'GEO is the optimization of your online presence for AI-powered search systems like ChatGPT, Perplexity and Google AI Overviews. While classic SEO targets top-10 rankings, GEO ensures your business gets cited in AI answers.' },
      { question: 'Does GEO replace classic SEO?', answer: 'No! GEO complements SEO. A strong SEO foundation is also important for GEO. GEO adds a new layer: optimization specifically for AI systems.' },
      { question: 'How do you measure GEO success?', answer: 'We track your visibility in AI search systems: citation frequency, mention quality, and AI-referral traffic.' },
      { question: 'What is llms.txt?', answer: 'llms.txt is a new standard (similar to robots.txt) that provides AI systems with structured information about your website.' },
      { question: 'Why should I start with GEO now?', answer: 'First-mover advantage: Most businesses don\'t optimize for AI search yet. Those who start now build a lead that\'s hard to catch up to.' },
    ],
    relatedServices: [
      { title: 'SEO & Content', description: 'Classic SEO as foundation.', href: '/services/seo-content' as any },
      { title: 'Content Strategy', description: 'AI-optimized content.', href: '/services/seo-content/content-strategy-production' as any },
      { title: 'Digital Marketing', description: 'Holistic marketing.', href: '/services/digital-marketing' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'GEO Packages',
      pricingDescription: 'Get visible in AI search.',
      faqTitle: 'GEO FAQ',
      faqSubtitle: 'Everything about Generative Engine Optimization.',
      ctaTitle: 'Ready for the Future of Search?',
      ctaDescription: 'Free GEO audit: We show you how visible you are in ChatGPT, Perplexity and Google AI.',
      ctaButton: 'Request GEO Audit',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/geo-optimierung'
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

export default async function GeoOptimierungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: 'GEO — Generative Engine Optimization',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/geo-optimierung',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'GEO', url: 'https://goldenwing.at/leistungen/geo-optimierung' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
