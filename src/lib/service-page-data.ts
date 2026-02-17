import type { ProcessStep } from '@/components/sections/process-timeline'
import type { Reason } from '@/components/sections/why-choose-us'

interface ServicePageData {
  process: ProcessStep[]
  whyChooseUs: Reason[]
}

// NEW STRUCTURE 2025: 6 main services + legacy slugs for backward compatibility
type ServiceSlug =
  | 'branding'
  | 'webdesign'
  | 'digital-marketing'
  | 'seo-content'
  | 'web-app-entwicklung'
  | 'it-cloud-services'
  // Legacy slugs for redirects
  | 'digitales-marketing'
  | 'seo-sichtbarkeit'
  | 'software-entwicklung'
  | 'technische-loesungen'
  | 'content-visuals'

// German content - NEW STRUCTURE 2025
const serviceDataDE: Record<ServiceSlug, ServicePageData> = {
  'branding': {
    process: [
      { step: '1', title: 'Discovery', description: 'Markenworkshop und Analyse Ihrer Positionierung' },
      { step: '2', title: 'Strategie', description: 'Markenstrategie und Positionierung entwickeln' },
      { step: '3', title: 'Identität', description: 'Visuelle Identität und Logo-Design' },
      { step: '4', title: 'Guidelines', description: 'Markenrichtlinien und Style Guide' },
      { step: '5', title: 'Launch', description: 'Implementierung über alle Touchpoints' },
    ],
    whyChooseUs: [
      { icon: 'lightbulb', title: 'Strategische Tiefe', description: 'Markenentwicklung basiert auf fundierter Analyse' },
      { icon: 'target', title: 'Ganzheitlicher Ansatz', description: 'Von der Positionierung bis zum Brand Book' },
      { icon: 'users', title: 'Workshop-Methodik', description: 'Interaktive Sessions für authentische Marken' },
      { icon: 'award', title: '100+ Marken entwickelt', description: 'Erfahrung aus erfolgreichen Branding-Projekten' },
    ],
  },
  'webdesign': {
    process: [
      { step: '1', title: 'Architektur', description: 'Informationsarchitektur und Seitenstruktur' },
      { step: '2', title: 'UX-Konzept', description: 'User Experience und Wireframes' },
      { step: '3', title: 'UI-Design', description: 'Visual Design und Prototypen' },
      { step: '4', title: 'Entwicklung', description: 'CMS-Entwicklung und Integration' },
      { step: '5', title: 'Launch', description: 'Performance-Optimierung und Go-Live' },
    ],
    whyChooseUs: [
      { icon: 'zap', title: 'Performance First', description: 'Core Web Vitals optimiert für beste Rankings' },
      { icon: 'trending-up', title: 'Conversion-Fokus', description: 'Design, das konvertiert' },
      { icon: 'shield', title: 'Barrierefreiheit', description: 'WCAG 2.1 AA konforme Websites' },
      { icon: 'heart-handshake', title: 'CMS-Expertise', description: 'WordPress, Payload, Headless CMS' },
    ],
  },
  'digital-marketing': {
    process: [
      { step: '1', title: 'Strategie', description: 'Kampagnenstrategie und Zielsetzung' },
      { step: '2', title: 'Setup', description: 'Paid Media Accounts und Tracking' },
      { step: '3', title: 'Launch', description: 'Kampagnen-Start und Optimierung' },
      { step: '4', title: 'Automation', description: 'E-Mail-Flows und Automatisierung' },
      { step: '5', title: 'Analyse', description: 'Reporting und kontinuierliche Optimierung' },
    ],
    whyChooseUs: [
      { icon: 'target', title: 'ROI-fokussiert', description: 'Jede Maßnahme auf Rendite ausgerichtet' },
      { icon: 'trending-up', title: 'Multi-Channel', description: 'Google Ads, Meta, LinkedIn & mehr' },
      { icon: 'zap', title: 'Automation', description: 'E-Mail-Flows, die automatisch konvertieren' },
      { icon: 'lightbulb', title: 'Data-Driven', description: 'Entscheidungen basierend auf echten Daten' },
    ],
  },
  'seo-content': {
    process: [
      { step: '1', title: 'Audit', description: 'Technical SEO Audit und Keyword-Analyse' },
      { step: '2', title: 'Strategie', description: 'Content-Strategie und Redaktionsplan' },
      { step: '3', title: 'On-Page', description: 'On-Page Optimierungen durchführen' },
      { step: '4', title: 'Content', description: 'SEO-optimierte Inhalte produzieren' },
      { step: '5', title: 'Off-Page', description: 'Linkbuilding und Authority Building' },
      { step: '6', title: 'Monitoring', description: 'Rankings tracken und optimieren' },
    ],
    whyChooseUs: [
      { icon: 'target', title: 'Datengetrieben', description: 'Entscheidungen basierend auf echten Daten' },
      { icon: 'trending-up', title: 'Nachweisbare Erfolge', description: 'Durchschnittlich 156% mehr Traffic' },
      { icon: 'clock', title: 'Langfristig', description: 'Nachhaltige Rankings statt Quick-Wins' },
      { icon: 'sparkles', title: 'AI-Ready', description: 'Optimiert für Google SGE und AI-Suche' },
    ],
  },
  'web-app-entwicklung': {
    process: [
      { step: '1', title: 'Discovery', description: 'Requirements und technische Spezifikation' },
      { step: '2', title: 'Architektur', description: 'Technische Architektur planen' },
      { step: '3', title: 'Development', description: 'Agile Entwicklung in Sprints' },
      { step: '4', title: 'Integration', description: 'APIs und Schnittstellen anbinden' },
      { step: '5', title: 'QA', description: 'Testing und Qualitätssicherung' },
      { step: '6', title: 'Deployment', description: 'Go-Live und Support' },
    ],
    whyChooseUs: [
      { icon: 'zap', title: 'Modern Stack', description: 'Next.js, React, TypeScript – Cutting-Edge' },
      { icon: 'shield', title: 'Clean Code', description: 'Wartbare, skalierbare Architektur' },
      { icon: 'users', title: 'Agile Methodik', description: 'Transparente Entwicklung mit Demos' },
      { icon: 'award', title: 'Full-Stack', description: 'Von der Cloud bis zur Mobile App' },
    ],
  },
  'it-cloud-services': {
    process: [
      { step: '1', title: 'Analyse', description: 'Infrastruktur-Analyse und Anforderungen' },
      { step: '2', title: 'Architektur', description: 'Cloud-Architektur planen' },
      { step: '3', title: 'Setup', description: 'Server-Setup und Migration' },
      { step: '4', title: 'Sicherheit', description: 'Security und Backup-Systeme' },
      { step: '5', title: 'Monitoring', description: 'Überwachung einrichten' },
      { step: '6', title: 'Support', description: 'Laufende Wartung und Support' },
    ],
    whyChooseUs: [
      { icon: 'cloud', title: 'Cloud-Native', description: 'AWS, Azure, Hetzner – alle Clouds' },
      { icon: 'shield', title: 'Security First', description: 'Enterprise-Sicherheit für Ihre Systeme' },
      { icon: 'trending-up', title: 'Skalierbar', description: 'Infrastruktur, die mitwächst' },
      { icon: 'clock', title: '24/7 Support', description: 'Zuverlässiger Support bei Problemen' },
    ],
  },
  // Legacy slugs - map to new services
  'digitales-marketing': {
    process: [
      { step: '1', title: 'Strategie', description: 'Kampagnenstrategie und Zielsetzung' },
      { step: '2', title: 'Setup', description: 'Paid Media Accounts und Tracking' },
      { step: '3', title: 'Launch', description: 'Kampagnen-Start und Optimierung' },
      { step: '4', title: 'Analyse', description: 'Reporting und Optimierung' },
    ],
    whyChooseUs: [
      { icon: 'target', title: 'ROI-fokussiert', description: 'Maßnahmen auf Rendite ausgerichtet' },
      { icon: 'trending-up', title: 'Multi-Channel', description: 'Google Ads, Meta, LinkedIn' },
      { icon: 'zap', title: 'Automation', description: 'E-Mail-Flows automatisieren' },
      { icon: 'lightbulb', title: 'Data-Driven', description: 'Datenbasierte Entscheidungen' },
    ],
  },
  'seo-sichtbarkeit': {
    process: [
      { step: '1', title: 'Audit', description: 'Technical SEO Audit' },
      { step: '2', title: 'Strategie', description: 'SEO-Roadmap entwickeln' },
      { step: '3', title: 'Optimierung', description: 'On-Page Optimierungen' },
      { step: '4', title: 'Content', description: 'SEO-Content erstellen' },
      { step: '5', title: 'Monitoring', description: 'Rankings tracken' },
    ],
    whyChooseUs: [
      { icon: 'target', title: 'Datengetrieben', description: 'Echte Daten, keine Vermutungen' },
      { icon: 'trending-up', title: 'Erfolge', description: '156% mehr organischer Traffic' },
      { icon: 'clock', title: 'Langfristig', description: 'Nachhaltige Rankings' },
      { icon: 'sparkles', title: 'AI-Ready', description: 'Optimiert für AI-Suche' },
    ],
  },
  'software-entwicklung': {
    process: [
      { step: '1', title: 'Discovery', description: 'Requirements Engineering' },
      { step: '2', title: 'Design', description: 'UX/UI und Prototyping' },
      { step: '3', title: 'Development', description: 'Agile Entwicklung' },
      { step: '4', title: 'Testing', description: 'QA und Testing' },
      { step: '5', title: 'Deployment', description: 'Go-Live und Support' },
    ],
    whyChooseUs: [
      { icon: 'zap', title: 'Modern Stack', description: 'Next.js, React, TypeScript' },
      { icon: 'shield', title: 'Clean Code', description: 'Wartbare Architektur' },
      { icon: 'users', title: 'Agile', description: 'Transparente Entwicklung' },
      { icon: 'award', title: 'Full-Stack', description: 'Cloud bis Mobile' },
    ],
  },
  'technische-loesungen': {
    process: [
      { step: '1', title: 'Analyse', description: 'Systemanalyse' },
      { step: '2', title: 'Architektur', description: 'Technische Planung' },
      { step: '3', title: 'Integration', description: 'Entwicklung und Anbindung' },
      { step: '4', title: 'Testing', description: 'QA und Go-Live' },
    ],
    whyChooseUs: [
      { icon: 'zap', title: 'Automatisierung', description: 'Effiziente Workflows' },
      { icon: 'shield', title: 'Sicherheit', description: 'Enterprise-Security' },
      { icon: 'trending-up', title: 'Skalierbar', description: 'Wächst mit Ihnen' },
      { icon: 'clock', title: '24/7 Support', description: 'Zuverlässiger Support' },
    ],
  },
  'content-visuals': {
    process: [
      { step: '1', title: 'Briefing', description: 'Kreativ-Briefing' },
      { step: '2', title: 'Produktion', description: 'Content-Erstellung' },
      { step: '3', title: 'Review', description: 'Feedback und Feinschliff' },
      { step: '4', title: 'Delivery', description: 'Auslieferung' },
    ],
    whyChooseUs: [
      { icon: 'sparkles', title: 'Premium', description: 'Content auf höchstem Niveau' },
      { icon: 'zap', title: 'Schnell', description: 'Effiziente Prozesse' },
      { icon: 'users', title: 'Full-Service', description: 'Idee bis Kampagne' },
      { icon: 'award', title: 'Storytelling', description: 'Emotionale Inhalte' },
    ],
  },
}

// English content - NEW STRUCTURE 2025
const serviceDataEN: Record<ServiceSlug, ServicePageData> = {
  'branding': {
    process: [
      { step: '1', title: 'Discovery', description: 'Brand workshop and positioning analysis' },
      { step: '2', title: 'Strategy', description: 'Develop brand strategy and positioning' },
      { step: '3', title: 'Identity', description: 'Visual identity and logo design' },
      { step: '4', title: 'Guidelines', description: 'Brand guidelines and style guide' },
      { step: '5', title: 'Launch', description: 'Implementation across all touchpoints' },
    ],
    whyChooseUs: [
      { icon: 'lightbulb', title: 'Strategic Depth', description: 'Brand development based on solid analysis' },
      { icon: 'target', title: 'Holistic Approach', description: 'From positioning to brand book' },
      { icon: 'users', title: 'Workshop Methodology', description: 'Interactive sessions for authentic brands' },
      { icon: 'award', title: '100+ Brands Created', description: 'Experience from successful branding projects' },
    ],
  },
  'webdesign': {
    process: [
      { step: '1', title: 'Architecture', description: 'Information architecture and site structure' },
      { step: '2', title: 'UX Concept', description: 'User experience and wireframes' },
      { step: '3', title: 'UI Design', description: 'Visual design and prototypes' },
      { step: '4', title: 'Development', description: 'CMS development and integration' },
      { step: '5', title: 'Launch', description: 'Performance optimization and go-live' },
    ],
    whyChooseUs: [
      { icon: 'zap', title: 'Performance First', description: 'Core Web Vitals optimized for best rankings' },
      { icon: 'trending-up', title: 'Conversion Focus', description: 'Design that converts' },
      { icon: 'shield', title: 'Accessibility', description: 'WCAG 2.1 AA compliant websites' },
      { icon: 'heart-handshake', title: 'CMS Expertise', description: 'WordPress, Payload, Headless CMS' },
    ],
  },
  'digital-marketing': {
    process: [
      { step: '1', title: 'Strategy', description: 'Campaign strategy and goal setting' },
      { step: '2', title: 'Setup', description: 'Paid media accounts and tracking' },
      { step: '3', title: 'Launch', description: 'Campaign launch and optimization' },
      { step: '4', title: 'Automation', description: 'Email flows and automation' },
      { step: '5', title: 'Analysis', description: 'Reporting and continuous optimization' },
    ],
    whyChooseUs: [
      { icon: 'target', title: 'ROI-Focused', description: 'Every measure aligned with returns' },
      { icon: 'trending-up', title: 'Multi-Channel', description: 'Google Ads, Meta, LinkedIn & more' },
      { icon: 'zap', title: 'Automation', description: 'Email flows that convert automatically' },
      { icon: 'lightbulb', title: 'Data-Driven', description: 'Decisions based on real data' },
    ],
  },
  'seo-content': {
    process: [
      { step: '1', title: 'Audit', description: 'Technical SEO audit and keyword analysis' },
      { step: '2', title: 'Strategy', description: 'Content strategy and editorial plan' },
      { step: '3', title: 'On-Page', description: 'Execute on-page optimizations' },
      { step: '4', title: 'Content', description: 'Produce SEO-optimized content' },
      { step: '5', title: 'Off-Page', description: 'Link building and authority building' },
      { step: '6', title: 'Monitoring', description: 'Track and optimize rankings' },
    ],
    whyChooseUs: [
      { icon: 'target', title: 'Data-Driven', description: 'Decisions based on real data' },
      { icon: 'trending-up', title: 'Proven Results', description: 'Average 156% traffic increase' },
      { icon: 'clock', title: 'Long-Term', description: 'Sustainable rankings, not quick wins' },
      { icon: 'sparkles', title: 'AI-Ready', description: 'Optimized for Google SGE and AI search' },
    ],
  },
  'web-app-entwicklung': {
    process: [
      { step: '1', title: 'Discovery', description: 'Requirements and technical specification' },
      { step: '2', title: 'Architecture', description: 'Plan technical architecture' },
      { step: '3', title: 'Development', description: 'Agile development in sprints' },
      { step: '4', title: 'Integration', description: 'Connect APIs and interfaces' },
      { step: '5', title: 'QA', description: 'Testing and quality assurance' },
      { step: '6', title: 'Deployment', description: 'Go-live and support' },
    ],
    whyChooseUs: [
      { icon: 'zap', title: 'Modern Stack', description: 'Next.js, React, TypeScript – cutting-edge' },
      { icon: 'shield', title: 'Clean Code', description: 'Maintainable, scalable architecture' },
      { icon: 'users', title: 'Agile Methodology', description: 'Transparent development with demos' },
      { icon: 'award', title: 'Full-Stack', description: 'From cloud to mobile app' },
    ],
  },
  'it-cloud-services': {
    process: [
      { step: '1', title: 'Analysis', description: 'Infrastructure analysis and requirements' },
      { step: '2', title: 'Architecture', description: 'Plan cloud architecture' },
      { step: '3', title: 'Setup', description: 'Server setup and migration' },
      { step: '4', title: 'Security', description: 'Security and backup systems' },
      { step: '5', title: 'Monitoring', description: 'Set up monitoring' },
      { step: '6', title: 'Support', description: 'Ongoing maintenance and support' },
    ],
    whyChooseUs: [
      { icon: 'cloud', title: 'Cloud-Native', description: 'AWS, Azure, Hetzner – all clouds' },
      { icon: 'shield', title: 'Security First', description: 'Enterprise security for your systems' },
      { icon: 'trending-up', title: 'Scalable', description: 'Infrastructure that grows with you' },
      { icon: 'clock', title: '24/7 Support', description: 'Reliable support when you need it' },
    ],
  },
  // Legacy slugs - map to new services (English)
  'digitales-marketing': {
    process: [
      { step: '1', title: 'Strategy', description: 'Campaign strategy' },
      { step: '2', title: 'Setup', description: 'Paid media and tracking' },
      { step: '3', title: 'Launch', description: 'Campaign optimization' },
      { step: '4', title: 'Analysis', description: 'Reporting' },
    ],
    whyChooseUs: [
      { icon: 'target', title: 'ROI-Focused', description: 'Return-focused measures' },
      { icon: 'trending-up', title: 'Multi-Channel', description: 'Google, Meta, LinkedIn' },
      { icon: 'zap', title: 'Automation', description: 'Automated email flows' },
      { icon: 'lightbulb', title: 'Data-Driven', description: 'Data-based decisions' },
    ],
  },
  'seo-sichtbarkeit': {
    process: [
      { step: '1', title: 'Audit', description: 'Technical SEO audit' },
      { step: '2', title: 'Strategy', description: 'SEO roadmap' },
      { step: '3', title: 'Optimization', description: 'On-page work' },
      { step: '4', title: 'Content', description: 'SEO content' },
      { step: '5', title: 'Monitoring', description: 'Track rankings' },
    ],
    whyChooseUs: [
      { icon: 'target', title: 'Data-Driven', description: 'Real data, not guesses' },
      { icon: 'trending-up', title: 'Results', description: '156% more traffic' },
      { icon: 'clock', title: 'Long-Term', description: 'Sustainable rankings' },
      { icon: 'sparkles', title: 'AI-Ready', description: 'Optimized for AI search' },
    ],
  },
  'software-entwicklung': {
    process: [
      { step: '1', title: 'Discovery', description: 'Requirements' },
      { step: '2', title: 'Design', description: 'UX/UI and prototyping' },
      { step: '3', title: 'Development', description: 'Agile development' },
      { step: '4', title: 'Testing', description: 'QA and testing' },
      { step: '5', title: 'Deployment', description: 'Go-live and support' },
    ],
    whyChooseUs: [
      { icon: 'zap', title: 'Modern Stack', description: 'Next.js, React, TypeScript' },
      { icon: 'shield', title: 'Clean Code', description: 'Maintainable architecture' },
      { icon: 'users', title: 'Agile', description: 'Transparent development' },
      { icon: 'award', title: 'Full-Stack', description: 'Cloud to mobile' },
    ],
  },
  'technische-loesungen': {
    process: [
      { step: '1', title: 'Analysis', description: 'System analysis' },
      { step: '2', title: 'Architecture', description: 'Technical planning' },
      { step: '3', title: 'Integration', description: 'Development' },
      { step: '4', title: 'Testing', description: 'QA and go-live' },
    ],
    whyChooseUs: [
      { icon: 'zap', title: 'Automation', description: 'Efficient workflows' },
      { icon: 'shield', title: 'Security', description: 'Enterprise security' },
      { icon: 'trending-up', title: 'Scalable', description: 'Grows with you' },
      { icon: 'clock', title: '24/7 Support', description: 'Reliable support' },
    ],
  },
  'content-visuals': {
    process: [
      { step: '1', title: 'Briefing', description: 'Creative briefing' },
      { step: '2', title: 'Production', description: 'Content creation' },
      { step: '3', title: 'Review', description: 'Feedback and fine-tuning' },
      { step: '4', title: 'Delivery', description: 'Final delivery' },
    ],
    whyChooseUs: [
      { icon: 'sparkles', title: 'Premium', description: 'Top-tier content' },
      { icon: 'zap', title: 'Fast', description: 'Efficient processes' },
      { icon: 'users', title: 'Full Service', description: 'Idea to campaign' },
      { icon: 'award', title: 'Storytelling', description: 'Emotional content' },
    ],
  },
}

export function getServicePageData(slug: string, locale: 'de' | 'en' | 'ru'): ServicePageData | null {
  // Russian falls back to English
  const data = (locale === 'en' || locale === 'ru') ? serviceDataEN : serviceDataDE
  return data[slug as ServiceSlug] || null
}
