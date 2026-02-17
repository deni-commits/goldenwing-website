/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/templates/landing-page'
import { getCanonicalUrl, getHreflangAlternates, truncateMetaDescription } from '@/lib/utils'
import type { LandingPageContent, LandingPageSEO } from '@/components/templates/landing-page'
import { sharedLabels } from '@/lib/landing-pages-data'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }]
}

export const revalidate = 3600

const seoData = {
  de: {
    title: 'SEO Retainer Wien | Monatliche SEO-Betreuung | GoldenWing',
    description: 'SEO Retainer: Kontinuierliche Optimierung für nachhaltiges Wachstum. Keyword-Recherche, On-Page, Technical SEO, Link Building — ab €1.490/Monat.',
    keywords: ['SEO Retainer', 'Monatliche SEO', 'SEO Betreuung', 'SEO Agentur Wien', 'Laufende SEO', 'SEO Service'],
  },
  en: {
    title: 'SEO Retainer Vienna | Monthly SEO Service | GoldenWing',
    description: 'SEO Retainer: Continuous optimization for sustainable growth. Keyword research, on-page, technical SEO, link building — from €1,490/month.',
    keywords: ['SEO Retainer', 'Monthly SEO', 'SEO Service', 'SEO Agency Vienna', 'Ongoing SEO'],
  },
}

const contentData: Record<'de' | 'en', LandingPageContent> = {
  de: {
    hero: {
      badge: 'SEO Retainer',
      title: 'Nachhaltiges Wachstum. Monat für Monat.',
      description: 'SEO ist kein Projekt, sondern ein Prozess. Mit unserem SEO Retainer bauen Sie kontinuierlich Sichtbarkeit auf — transparent, messbar, nachhaltig.',
      ctaPrimary: 'SEO Audit starten',
      ctaSecondary: 'Pakete ansehen',
    },
    trustSignals: [
      { icon: 'trending-up', text: '+245% Ø Traffic' },
      { icon: 'award', text: 'Google Certified' },
      { icon: 'bar-chart', text: 'White-Label Reports' },
      { icon: 'refresh-cw', text: 'Monatlich kündbar' },
    ],
    benefits: [
      {
        icon: 'search',
        title: 'Keyword-Strategie',
        description: 'Tiefgehende Recherche und kontinuierliche Überwachung Ihrer wichtigsten Keywords. Wir finden die Suchbegriffe, die wirklich Umsatz bringen.',
      },
      {
        icon: 'file-text',
        title: 'On-Page Optimierung',
        description: 'Title-Tags, Meta-Descriptions, Headings, interne Verlinkung — technisch und inhaltlich optimiert für maximale Relevanz.',
      },
      {
        icon: 'code',
        title: 'Technical SEO',
        description: 'Core Web Vitals, Crawlability, Schema Markup, Mobile-First — die technische Basis für Top-Rankings.',
      },
      {
        icon: 'link',
        title: 'Link Building',
        description: 'Aufbau hochwertiger Backlinks durch Content-Outreach, PR und Digital-PR-Strategien. Keine Black-Hat-Methoden.',
      },
      {
        icon: 'edit',
        title: 'Content-Optimierung',
        description: 'Bestehende Inhalte analysieren, verbessern und für User Intent optimieren. Neue Inhalte strategisch planen.',
      },
      {
        icon: 'bar-chart',
        title: 'Transparentes Reporting',
        description: 'Monatliche Reports mit allen wichtigen KPIs: Rankings, Traffic, Conversions, Backlinks. Voller Zugriff auf alle Tools.',
      },
    ],
    results: [
      { metric: '+245%', label: 'Organischer Traffic', detail: 'Durchschnitt nach 12 Monaten' },
      { metric: '87%', label: 'Keywords Top 10', detail: 'Nach 6 Monaten Retainer' },
      { metric: '3,2x', label: 'ROI', detail: 'Durchschnittlicher Return' },
    ],
    packages: [
      {
        name: 'SEO AUDIT',
        price: '990',
        priceType: 'einmalig',
        description: 'Der perfekte Start. Wo stehen Sie heute?',
        popular: false,
        features: [
          'Umfassendes SEO-Audit (50+ Seiten)',
          'Keyword-Recherche & Gap-Analyse',
          'Technical SEO Check',
          'Wettbewerber-Analyse (Top 3)',
          'On-Page Optimierungs-Roadmap',
          'Quick-Win Empfehlungen',
          'Persönliches Review-Gespräch',
        ],
      },
      {
        name: 'GROWTH',
        price: '1.490',
        priceType: 'monatlich',
        description: 'Für Unternehmen, die wachsen wollen.',
        popular: true,
        features: [
          'SEO Audit inklusive (Monat 1)',
          'Bis zu 50 Keywords aktiv optimiert',
          'On-Page Optimierung (10 Seiten/Monat)',
          'Technical SEO Wartung',
          'Monatliches Reporting',
          'Link Building (5 Backlinks/Monat)',
          'Content-Empfehlungen',
          'Google Search Console & Analytics Setup',
          '3h Beratung/Monat',
        ],
      },
      {
        name: 'SCALE',
        price: '2.990',
        priceType: 'monatlich',
        description: 'Für maximale Sichtbarkeit & Dominanz.',
        popular: false,
        features: [
          'Alles aus GROWTH',
          'Bis zu 150 Keywords optimiert',
          'On-Page Optimierung (25 Seiten/Monat)',
          'Link Building (15 Backlinks/Monat)',
          'Content-Erstellung (2 Artikel/Monat)',
          'Internationale SEO (Multi-Market)',
          'Conversion-Rate-Optimierung',
          'Dedizierter SEO Manager',
          'Weekly Status Updates',
          '6h Beratung/Monat',
        ],
      },
    ],
    process: [
      { step: '01', title: 'Audit & Analyse', description: 'Wir analysieren Ihre aktuelle Situation: Rankings, Traffic, Wettbewerb, technische Issues. Daraus entwickeln wir Ihre individuelle SEO-Strategie.' },
      { step: '02', title: 'Quick Wins', description: 'In den ersten 4 Wochen setzen wir schnelle Optimierungen um, die sofort Wirkung zeigen (Technical SEO, On-Page-Fixes).' },
      { step: '03', title: 'Keyword-Fokus', description: 'Wir priorisieren die wertvollsten Keywords und optimieren gezielt für diese Suchbegriffe.' },
      { step: '04', title: 'Content & Links', description: 'Laufende Content-Optimierung und strategischer Linkaufbau für nachhaltige Autorität.' },
      { step: '05', title: 'Monitoring & Iteration', description: 'Kontinuierliches Tracking, monatliche Reports und Anpassung der Strategie basierend auf Performance-Daten.' },
    ],
    technologies: ['Google Search Console', 'Google Analytics 4', 'Semrush', 'Ahrefs', 'Screaming Frog', 'Looker Studio', 'ChatGPT', 'Claude'],
    faqs: [
      {
        question: 'Warum SEO Retainer statt einmaliges Projekt?',
        answer: 'SEO ist ein kontinuierlicher Prozess. Ihre Wettbewerber optimieren ständig, Google-Algorithmen ändern sich, neue Keywords entstehen. Ein Retainer garantiert, dass Sie nicht nur Erfolge erzielen, sondern diese auch halten und ausbauen.',
      },
      {
        question: 'Wie schnell sehe ich Ergebnisse?',
        answer: 'Quick Wins (Technical SEO, On-Page) zeigen in 4-8 Wochen Wirkung. Spürbare Traffic-Steigerungen nach 3-6 Monaten. Maximale Wirkung nach 9-12 Monaten. SEO ist Marathon, kein Sprint.',
      },
      {
        question: 'Welches Paket ist das richtige für mich?',
        answer: 'AUDIT: Sie wollen erst verstehen, wo Sie stehen. GROWTH: Lokales/regionales Business, 1-2 Services, < 50 Ziel-Keywords. SCALE: Mehrere Services, nationale/internationale Märkte, hoher Wettbewerb.',
      },
      {
        question: 'Was ist, wenn ich schon SEO mache?',
        answer: 'Perfekt! Wir bauen auf Ihren Erfolgen auf. Das Audit zeigt, was gut läuft und wo Potenzial liegt. Viele Kunden wechseln zu uns, weil bisherige Agenturen nicht transparent genug waren.',
      },
      {
        question: 'Garantiert ihr Rankings?',
        answer: 'Niemand kann konkrete Rankings garantieren (Google Algorithmus). Wir garantieren aber: Best Practices, messbare Fortschritte, volle Transparenz. Unsere Kunden erzielen durchschnittlich +245% organischen Traffic nach 12 Monaten.',
      },
      {
        question: 'Ist Content-Erstellung inkludiert?',
        answer: 'AUDIT & GROWTH: Content-Empfehlungen und Optimierung bestehender Inhalte. SCALE: 2 SEO-optimierte Artikel pro Monat inkludiert. Extra Content: €350/Artikel (1.200+ Wörter).',
      },
    ],
    relatedServices: [
      { title: 'Website as a Service', description: 'Monatliche Website-Betreuung.', href: '/leistungen/website-as-a-service' as any },
      { title: 'SEO & Content', description: 'Einmaliges SEO-Projekt.', href: '/leistungen/seo-content' as any },
      { title: 'Digital Marketing', description: 'Performance Marketing.', href: '/leistungen/digital-marketing' as any },
    ],
    labels: {
      ...sharedLabels.de,
      pricingTitle: 'SEO Pakete',
      pricingDescription: 'Transparent, messbar, nachhaltig.',
      faqTitle: 'Häufige Fragen zu SEO Retainer',
      faqSubtitle: 'Alles über monatliche SEO-Betreuung.',
      ctaTitle: 'Bereit für mehr Sichtbarkeit?',
      ctaDescription: 'Kostenloses SEO-Audit: Wir zeigen Ihnen Ihr Potenzial und Quick Wins, die sofort Wirkung zeigen.',
      ctaButton: 'SEO Audit starten',
    },
  },
  en: {
    hero: {
      badge: 'SEO Retainer',
      title: 'Sustainable Growth. Month by Month.',
      description: 'SEO isn\'t a project, it\'s a process. With our SEO Retainer, you build visibility continuously — transparent, measurable, sustainable.',
      ctaPrimary: 'Start SEO Audit',
      ctaSecondary: 'View Packages',
    },
    trustSignals: [
      { icon: 'trending-up', text: '+245% Avg Traffic' },
      { icon: 'award', text: 'Google Certified' },
      { icon: 'bar-chart', text: 'White-Label Reports' },
      { icon: 'refresh-cw', text: 'Cancel Monthly' },
    ],
    benefits: [
      { icon: 'search', title: 'Keyword Strategy', description: 'In-depth research and continuous monitoring of your most important keywords. We find the search terms that actually drive revenue.' },
      { icon: 'file-text', title: 'On-Page Optimization', description: 'Title tags, meta descriptions, headings, internal linking — technically and content-wise optimized for maximum relevance.' },
      { icon: 'code', title: 'Technical SEO', description: 'Core Web Vitals, crawlability, schema markup, mobile-first — the technical foundation for top rankings.' },
      { icon: 'link', title: 'Link Building', description: 'Building high-quality backlinks through content outreach, PR and digital PR strategies. No black-hat methods.' },
      { icon: 'edit', title: 'Content Optimization', description: 'Analyze, improve and optimize existing content for user intent. Strategically plan new content.' },
      { icon: 'bar-chart', title: 'Transparent Reporting', description: 'Monthly reports with all important KPIs: rankings, traffic, conversions, backlinks. Full access to all tools.' },
    ],
    results: [
      { metric: '+245%', label: 'Organic Traffic', detail: 'Average after 12 months' },
      { metric: '87%', label: 'Keywords Top 10', detail: 'After 6 months retainer' },
      { metric: '3.2x', label: 'ROI', detail: 'Average return' },
    ],
    packages: [
      { name: 'SEO AUDIT', price: '990', priceType: 'one-time', description: 'The perfect start. Where are you today?', popular: false, features: ['Comprehensive SEO audit (50+ pages)', 'Keyword research & gap analysis', 'Technical SEO check', 'Competitor analysis (top 3)', 'On-page optimization roadmap', 'Quick-win recommendations', 'Personal review meeting'] },
      { name: 'GROWTH', price: '1,490', priceType: 'monthly', description: 'For businesses that want to grow.', popular: true, features: ['SEO audit included (month 1)', 'Up to 50 keywords actively optimized', 'On-page optimization (10 pages/month)', 'Technical SEO maintenance', 'Monthly reporting', 'Link building (5 backlinks/month)', 'Content recommendations', 'Google Search Console & Analytics setup', '3h consulting/month'] },
      { name: 'SCALE', price: '2,990', priceType: 'monthly', description: 'For maximum visibility & dominance.', popular: false, features: ['Everything from GROWTH', 'Up to 150 keywords optimized', 'On-page optimization (25 pages/month)', 'Link building (15 backlinks/month)', 'Content creation (2 articles/month)', 'International SEO (multi-market)', 'Conversion rate optimization', 'Dedicated SEO manager', 'Weekly status updates', '6h consulting/month'] },
    ],
    process: [
      { step: '01', title: 'Audit & Analysis', description: 'We analyze your current situation: rankings, traffic, competition, technical issues. From this, we develop your individual SEO strategy.' },
      { step: '02', title: 'Quick Wins', description: 'In the first 4 weeks, we implement quick optimizations that show immediate effect (technical SEO, on-page fixes).' },
      { step: '03', title: 'Keyword Focus', description: 'We prioritize the most valuable keywords and optimize specifically for these search terms.' },
      { step: '04', title: 'Content & Links', description: 'Ongoing content optimization and strategic link building for sustainable authority.' },
      { step: '05', title: 'Monitoring & Iteration', description: 'Continuous tracking, monthly reports and strategy adjustment based on performance data.' },
    ],
    technologies: ['Google Search Console', 'Google Analytics 4', 'Semrush', 'Ahrefs', 'Screaming Frog', 'Looker Studio', 'ChatGPT', 'Claude'],
    faqs: [
      { question: 'Why SEO Retainer instead of one-time project?', answer: 'SEO is a continuous process. Your competitors are constantly optimizing, Google algorithms change, new keywords emerge. A retainer guarantees that you not only achieve success but also maintain and expand it.' },
      { question: 'How quickly will I see results?', answer: 'Quick wins (technical SEO, on-page) show effects in 4-8 weeks. Noticeable traffic increases after 3-6 months. Maximum effect after 9-12 months. SEO is a marathon, not a sprint.' },
      { question: 'Which package is right for me?', answer: 'AUDIT: You want to understand where you stand first. GROWTH: Local/regional business, 1-2 services, < 50 target keywords. SCALE: Multiple services, national/international markets, high competition.' },
      { question: 'Do you guarantee rankings?', answer: 'No one can guarantee specific rankings (Google algorithm). But we guarantee: best practices, measurable progress, full transparency. Our clients achieve an average of +245% organic traffic after 12 months.' },
    ],
    relatedServices: [
      { title: 'Website as a Service', description: 'Monthly website management.', href: '/services/website-as-a-service' as any },
      { title: 'SEO & Content', description: 'One-time SEO project.', href: '/services/seo-content' as any },
      { title: 'Digital Marketing', description: 'Performance marketing.', href: '/services/digital-marketing' as any },
    ],
    labels: {
      ...sharedLabels.en,
      pricingTitle: 'SEO Packages',
      pricingDescription: 'Transparent, measurable, sustainable.',
      faqTitle: 'SEO Retainer FAQ',
      faqSubtitle: 'Everything about monthly SEO service.',
      ctaTitle: 'Ready for More Visibility?',
      ctaDescription: 'Free SEO audit: We show you your potential and quick wins that show immediate effect.',
      ctaButton: 'Start SEO Audit',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const seo = seoData[locale] || seoData.de
  const basePath = '/leistungen/seo-retainer'
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

export default async function SeoRetainerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en'
  const content = contentData[locale] || contentData.de

  const seo: LandingPageSEO = {
    serviceName: 'SEO Retainer',
    cityName: 'Wien',
    cityType: 'City',
    url: '/leistungen/seo-retainer',
    breadcrumbs: [
      { name: 'Home', url: 'https://goldenwing.at' },
      { name: locale === 'de' ? 'Leistungen' : 'Services', url: locale === 'de' ? 'https://goldenwing.at/leistungen' : 'https://goldenwing.at/en/services' },
      { name: 'SEO Retainer', url: 'https://goldenwing.at/leistungen/seo-retainer' },
    ],
  }

  return <LandingPageTemplate locale={locale} content={content} seo={seo} />
}
