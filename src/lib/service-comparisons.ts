import type { ComparisonColumn, ComparisonRow } from '@/components/seo/comparison-table'

interface ServiceComparison {
  title: string
  subtitle: string
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
  footerNote?: string
}

type ServiceComparisonData = Record<string, Record<'de' | 'en', ServiceComparison>>

const serviceComparisons: ServiceComparisonData = {
  branding: {
    de: {
      title: 'Branding-Ansätze im Vergleich',
      subtitle: 'Was unterscheidet professionelles Branding von günstigen Alternativen?',
      columns: [
        { name: 'DIY / Canva', description: 'Selbst gemacht' },
        { name: 'Freelancer', description: 'Einzelkämpfer' },
        { name: 'GoldenWing', description: 'Full-Service', highlighted: true },
      ],
      rows: [
        { feature: 'Strategische Markenanalyse', values: [false, 'partial', true] },
        { feature: 'Wettbewerbsrecherche', values: [false, 'partial', true] },
        { feature: 'Positionierung & Messaging', values: [false, 'partial', true] },
        { feature: 'Logo-Design', values: ['Basic', '1-2 Konzepte', '3+ Konzepte'] },
        { feature: 'Visual Identity System', values: [false, 'partial', true] },
        { feature: 'Brand Guidelines', values: [false, 'partial', '60+ Seiten'] },
        { feature: 'Geschäftsausstattung', values: [false, 'partial', true] },
        { feature: 'Social Media Templates', values: ['Basic', 'partial', true] },
        { feature: 'Revisionsrunden', values: ['1-2', '2-3', 'Unbegrenzt'] },
        { feature: 'Langfristiger Support', values: [false, false, true] },
      ],
      footerNote: 'Basierend auf durchschnittlichen Marktangeboten. GoldenWing-Leistungen variieren je nach Paket.',
    },
    en: {
      title: 'Branding Approaches Compared',
      subtitle: 'What sets professional branding apart from cheaper alternatives?',
      columns: [
        { name: 'DIY / Canva', description: 'Self-made' },
        { name: 'Freelancer', description: 'Solo designer' },
        { name: 'GoldenWing', description: 'Full-Service', highlighted: true },
      ],
      rows: [
        { feature: 'Strategic Brand Analysis', values: [false, 'partial', true] },
        { feature: 'Competitor Research', values: [false, 'partial', true] },
        { feature: 'Positioning & Messaging', values: [false, 'partial', true] },
        { feature: 'Logo Design', values: ['Basic', '1-2 concepts', '3+ concepts'] },
        { feature: 'Visual Identity System', values: [false, 'partial', true] },
        { feature: 'Brand Guidelines', values: [false, 'partial', '60+ pages'] },
        { feature: 'Business Stationery', values: [false, 'partial', true] },
        { feature: 'Social Media Templates', values: ['Basic', 'partial', true] },
        { feature: 'Revision Rounds', values: ['1-2', '2-3', 'Unlimited'] },
        { feature: 'Long-term Support', values: [false, false, true] },
      ],
      footerNote: 'Based on average market offerings. GoldenWing services vary by package.',
    },
  },
  webdesign: {
    de: {
      title: 'Webdesign-Lösungen im Vergleich',
      subtitle: 'Template vs. Custom Design – was passt zu Ihrem Unternehmen?',
      columns: [
        { name: 'Template', description: 'Fertiglösung' },
        { name: 'Freelancer', description: 'Einzelentwickler' },
        { name: 'GoldenWing', description: 'Full-Service', highlighted: true },
      ],
      rows: [
        { feature: 'UX-Konzept & Wireframes', values: [false, 'partial', true] },
        { feature: 'Individuelles Design', values: [false, 'partial', true] },
        { feature: 'Responsive (Mobile-first)', values: [true, true, true] },
        { feature: 'SEO-Grundoptimierung', values: ['Basic', 'partial', true] },
        { feature: 'Performance-Optimierung', values: [false, 'partial', true] },
        { feature: 'CMS-Integration', values: ['Basic', true, true] },
        { feature: 'Barrierefreiheit (WCAG)', values: [false, 'partial', true] },
        { feature: 'Analytics-Setup', values: [false, 'partial', true] },
        { feature: 'DSGVO-Konformität', values: ['partial', 'partial', true] },
        { feature: 'Laufende Wartung', values: [false, 'partial', true] },
      ],
      footerNote: 'Templates können für einfache Projekte ausreichen. Für Unternehmen mit Wachstumszielen empfehlen wir maßgeschneiderte Lösungen.',
    },
    en: {
      title: 'Web Design Solutions Compared',
      subtitle: 'Template vs. Custom Design – what fits your business?',
      columns: [
        { name: 'Template', description: 'Ready-made' },
        { name: 'Freelancer', description: 'Solo developer' },
        { name: 'GoldenWing', description: 'Full-Service', highlighted: true },
      ],
      rows: [
        { feature: 'UX Concept & Wireframes', values: [false, 'partial', true] },
        { feature: 'Custom Design', values: [false, 'partial', true] },
        { feature: 'Responsive (Mobile-first)', values: [true, true, true] },
        { feature: 'Basic SEO Optimization', values: ['Basic', 'partial', true] },
        { feature: 'Performance Optimization', values: [false, 'partial', true] },
        { feature: 'CMS Integration', values: ['Basic', true, true] },
        { feature: 'Accessibility (WCAG)', values: [false, 'partial', true] },
        { feature: 'Analytics Setup', values: [false, 'partial', true] },
        { feature: 'GDPR Compliance', values: ['partial', 'partial', true] },
        { feature: 'Ongoing Maintenance', values: [false, 'partial', true] },
      ],
      footerNote: 'Templates may suffice for simple projects. For growth-oriented businesses, we recommend custom solutions.',
    },
  },
  'seo-content': {
    de: {
      title: 'SEO-Ansätze im Vergleich',
      subtitle: 'Einmal-Optimierung vs. kontinuierliche SEO-Strategie',
      columns: [
        { name: 'DIY-SEO', description: 'Selbst gemacht' },
        { name: 'Einmal-Audit', description: 'Punktuell' },
        { name: 'GoldenWing', description: 'Full-Service', highlighted: true },
      ],
      rows: [
        { feature: 'Technical SEO Audit', values: ['Basic Tools', true, true] },
        { feature: 'Keyword-Strategie', values: ['partial', 'partial', true] },
        { feature: 'On-Page Optimierung', values: ['partial', true, true] },
        { feature: 'Content-Strategie', values: [false, false, true] },
        { feature: 'Content-Produktion', values: [false, false, true] },
        { feature: 'Linkbuilding', values: [false, false, true] },
        { feature: 'Local SEO', values: ['partial', 'partial', true] },
        { feature: 'Monatliches Reporting', values: [false, false, true] },
        { feature: 'Ranking-Monitoring', values: ['Basic', 'partial', true] },
        { feature: 'Kontinuierliche Optimierung', values: [false, false, true] },
      ],
      footerNote: 'SEO ist ein Marathon, kein Sprint. Nachhaltige Ergebnisse erfordern kontinuierliche Arbeit.',
    },
    en: {
      title: 'SEO Approaches Compared',
      subtitle: 'One-time optimization vs. continuous SEO strategy',
      columns: [
        { name: 'DIY SEO', description: 'Self-made' },
        { name: 'One-time Audit', description: 'Point-in-time' },
        { name: 'GoldenWing', description: 'Full-Service', highlighted: true },
      ],
      rows: [
        { feature: 'Technical SEO Audit', values: ['Basic Tools', true, true] },
        { feature: 'Keyword Strategy', values: ['partial', 'partial', true] },
        { feature: 'On-Page Optimization', values: ['partial', true, true] },
        { feature: 'Content Strategy', values: [false, false, true] },
        { feature: 'Content Production', values: [false, false, true] },
        { feature: 'Link Building', values: [false, false, true] },
        { feature: 'Local SEO', values: ['partial', 'partial', true] },
        { feature: 'Monthly Reporting', values: [false, false, true] },
        { feature: 'Ranking Monitoring', values: ['Basic', 'partial', true] },
        { feature: 'Continuous Optimization', values: [false, false, true] },
      ],
      footerNote: 'SEO is a marathon, not a sprint. Sustainable results require continuous effort.',
    },
  },
  'digital-marketing': {
    de: {
      title: 'Marketing-Ansätze im Vergleich',
      subtitle: 'Organisch, Paid oder beides? Die richtige Strategie für Ihr Wachstum.',
      columns: [
        { name: 'Nur Organisch', description: 'Social + SEO' },
        { name: 'Nur Paid', description: 'Ads-fokussiert' },
        { name: 'GoldenWing', description: 'Integriert', highlighted: true },
      ],
      rows: [
        { feature: 'Kampagnenstrategie', values: ['partial', 'partial', true] },
        { feature: 'Zielgruppen-Analyse', values: ['partial', true, true] },
        { feature: 'Paid Social (Meta, LinkedIn)', values: [false, true, true] },
        { feature: 'Google Ads (Search, Display)', values: [false, true, true] },
        { feature: 'E-Mail Marketing', values: ['partial', false, true] },
        { feature: 'Marketing Automation', values: [false, false, true] },
        { feature: 'Conversion Tracking', values: ['Basic', true, true] },
        { feature: 'A/B Testing', values: [false, 'partial', true] },
        { feature: 'Attribution Modeling', values: [false, 'partial', true] },
        { feature: 'ROAS-Optimierung', values: [false, true, true] },
      ],
      footerNote: 'Der beste Marketing-Mix hängt von Ihren Zielen, Budget und Branche ab.',
    },
    en: {
      title: 'Marketing Approaches Compared',
      subtitle: 'Organic, Paid, or both? The right strategy for your growth.',
      columns: [
        { name: 'Organic Only', description: 'Social + SEO' },
        { name: 'Paid Only', description: 'Ads-focused' },
        { name: 'GoldenWing', description: 'Integrated', highlighted: true },
      ],
      rows: [
        { feature: 'Campaign Strategy', values: ['partial', 'partial', true] },
        { feature: 'Audience Analysis', values: ['partial', true, true] },
        { feature: 'Paid Social (Meta, LinkedIn)', values: [false, true, true] },
        { feature: 'Google Ads (Search, Display)', values: [false, true, true] },
        { feature: 'Email Marketing', values: ['partial', false, true] },
        { feature: 'Marketing Automation', values: [false, false, true] },
        { feature: 'Conversion Tracking', values: ['Basic', true, true] },
        { feature: 'A/B Testing', values: [false, 'partial', true] },
        { feature: 'Attribution Modeling', values: [false, 'partial', true] },
        { feature: 'ROAS Optimization', values: [false, true, true] },
      ],
      footerNote: 'The best marketing mix depends on your goals, budget, and industry.',
    },
  },
  'web-app-entwicklung': {
    de: {
      title: 'Entwicklungs-Ansätze im Vergleich',
      subtitle: 'No-Code, Low-Code oder Custom Development?',
      columns: [
        { name: 'No-Code', description: 'Bubble, Webflow' },
        { name: 'Offshore', description: 'Günstiges Team' },
        { name: 'GoldenWing', description: 'Premium Dev', highlighted: true },
      ],
      rows: [
        { feature: 'Requirements Engineering', values: [false, 'partial', true] },
        { feature: 'Skalierbare Architektur', values: [false, 'partial', true] },
        { feature: 'Custom UI/UX', values: ['partial', 'partial', true] },
        { feature: 'API-Integrationen', values: ['partial', true, true] },
        { feature: 'Security Best Practices', values: ['partial', 'partial', true] },
        { feature: 'Automatisierte Tests', values: [false, 'partial', true] },
        { feature: 'CI/CD Pipeline', values: [false, 'partial', true] },
        { feature: 'Code-Dokumentation', values: [false, 'partial', true] },
        { feature: 'Direkte Kommunikation', values: [false, 'partial', true] },
        { feature: 'Langfristige Wartung', values: ['partial', 'partial', true] },
      ],
      footerNote: 'No-Code eignet sich für MVPs. Für skalierbare Business-Apps empfehlen wir Custom Development.',
    },
    en: {
      title: 'Development Approaches Compared',
      subtitle: 'No-Code, Low-Code, or Custom Development?',
      columns: [
        { name: 'No-Code', description: 'Bubble, Webflow' },
        { name: 'Offshore', description: 'Budget team' },
        { name: 'GoldenWing', description: 'Premium Dev', highlighted: true },
      ],
      rows: [
        { feature: 'Requirements Engineering', values: [false, 'partial', true] },
        { feature: 'Scalable Architecture', values: [false, 'partial', true] },
        { feature: 'Custom UI/UX', values: ['partial', 'partial', true] },
        { feature: 'API Integrations', values: ['partial', true, true] },
        { feature: 'Security Best Practices', values: ['partial', 'partial', true] },
        { feature: 'Automated Testing', values: [false, 'partial', true] },
        { feature: 'CI/CD Pipeline', values: [false, 'partial', true] },
        { feature: 'Code Documentation', values: [false, 'partial', true] },
        { feature: 'Direct Communication', values: [false, 'partial', true] },
        { feature: 'Long-term Maintenance', values: ['partial', 'partial', true] },
      ],
      footerNote: 'No-Code suits MVPs. For scalable business apps, we recommend custom development.',
    },
  },
  'it-cloud-services': {
    de: {
      title: 'IT & Cloud-Lösungen im Vergleich',
      subtitle: 'Selbst verwalten oder professionell betreuen lassen?',
      columns: [
        { name: 'Self-Managed', description: 'Eigenes Team' },
        { name: 'Standard Hosting', description: 'Shared/VPS' },
        { name: 'GoldenWing', description: 'Managed Cloud', highlighted: true },
      ],
      rows: [
        { feature: 'Cloud-Architektur', values: ['partial', false, true] },
        { feature: 'Migration Support', values: [false, false, true] },
        { feature: '24/7 Monitoring', values: ['partial', 'partial', true] },
        { feature: 'Automatische Skalierung', values: ['partial', false, true] },
        { feature: 'Security Hardening', values: ['partial', 'partial', true] },
        { feature: 'Backup-Strategie', values: ['partial', 'Basic', true] },
        { feature: 'Disaster Recovery', values: ['partial', false, true] },
        { feature: 'Performance-Optimierung', values: ['partial', false, true] },
        { feature: 'Kostenoptimierung', values: [false, false, true] },
        { feature: 'Technischer Support', values: [false, 'partial', true] },
      ],
      footerNote: 'Managed Cloud Services lohnen sich ab einer gewissen Unternehmensgröße oder Komplexität.',
    },
    en: {
      title: 'IT & Cloud Solutions Compared',
      subtitle: 'Self-manage or professionally managed?',
      columns: [
        { name: 'Self-Managed', description: 'Own team' },
        { name: 'Standard Hosting', description: 'Shared/VPS' },
        { name: 'GoldenWing', description: 'Managed Cloud', highlighted: true },
      ],
      rows: [
        { feature: 'Cloud Architecture', values: ['partial', false, true] },
        { feature: 'Migration Support', values: [false, false, true] },
        { feature: '24/7 Monitoring', values: ['partial', 'partial', true] },
        { feature: 'Auto-Scaling', values: ['partial', false, true] },
        { feature: 'Security Hardening', values: ['partial', 'partial', true] },
        { feature: 'Backup Strategy', values: ['partial', 'Basic', true] },
        { feature: 'Disaster Recovery', values: ['partial', false, true] },
        { feature: 'Performance Optimization', values: ['partial', false, true] },
        { feature: 'Cost Optimization', values: [false, false, true] },
        { feature: 'Technical Support', values: [false, 'partial', true] },
      ],
      footerNote: 'Managed Cloud Services pay off from a certain company size or complexity.',
    },
  },
}

export function getServiceComparison(slug: string, locale: 'de' | 'en' | 'ru'): ServiceComparison | null {
  const data = serviceComparisons[slug]
  if (!data) return null
  return data[locale as 'de' | 'en'] ?? data['en']
}
