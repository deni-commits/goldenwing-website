import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NextLink from 'next/link'
import {
  ArrowRight, Palette, Globe, FileText, Rocket, CheckCircle, Target, Shield,
  TrendingUp, Users, Settings, Zap, Search, Calendar, BarChart3, Megaphone,
  Mail, Puzzle, Clock, Building2, LucideIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { FAQSection } from '@/components/sections/faq-section'
import { getPackageBySlug } from '@/lib/payload'
import type { SupportedLocale } from '@/lib/payload'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl, getContactUrl, getPackagesUrl } from '@/lib/utils'
import { Container } from '@/components/ui/container'
// Note: validateSlugOrRedirect removed - next-intl routing handles path translation

export const revalidate = 60

const iconMap: Record<string, LucideIcon> = {
  'palette': Palette,
  'globe': Globe,
  'file-text': FileText,
  'rocket': Rocket,
  'target': Target,
  'shield': Shield,
  'trending-up': TrendingUp,
  'users': Users,
  'settings': Settings,
  'zap': Zap,
  'search': Search,
  'calendar': Calendar,
  'bar-chart': BarChart3,
  'megaphone': Megaphone,
  'mail': Mail,
  'puzzle': Puzzle,
  'clock': Clock,
  'building2': Building2,
  'check-circle': CheckCircle,
}

// Valid package slugs
const validSlugs = ['brand-web-foundation', 'seo-content-growth', 'demand-gen-suite', 'individuelles-paket']

// Type definitions
interface Stat {
  value: string
  label: string
}

interface Section {
  icon: string
  title: string
  description: string
  items: string[]
}

interface Process {
  step: string
  title: string
  description: string
}

interface Benefit {
  icon: string
  title: string
  description: string
}

interface _FAQ {
  question: string
  answer: string
}

// Default content for all packages
const defaultPackages: Record<string, Record<string, {
  title: string
  subtitle: string
  goal: string
  description: string
  stats: Array<{ value: string; label: string }>
  introTitle: string
  introText: string
  introHighlights?: string[]
  sections: Array<{ icon: string; title: string; description: string; items: string[] }>
  process: Array<{ step: string; title: string; description: string }>
  benefits: Array<{ icon: string; title: string; description: string }>
  idealFor: string[]
  investmentTitle: string
  investmentText: string
  investmentNote: string
  faqTitle: string
  faqs: Array<{ question: string; answer: string }>
  ctaTitle: string
  ctaDescription: string
  ctaPrimaryButton: string
  ctaSecondaryButton: string
  backLink: string
  includedTitle: string
  processTitle: string
  benefitsTitle: string
  idealForTitle: string
  seo: { metaTitle: string; metaDescription: string; keywords: string }
}>> = {
  'brand-web-foundation': {
    de: {
      title: 'Brand & Web Foundation',
      subtitle: 'Das Fundament für Ihren digitalen Auftritt',
      goal: 'Eine klare Marke und eine Website, die Orientierung schafft',
      description: 'Mit dem Brand & Web Foundation Paket entwickeln wir Ihre Markenidentität und setzen sie in einer professionellen Website um. Sie erhalten ein konsistentes Erscheinungsbild, das Vertrauen schafft und Ihre Zielgruppe anspricht.',
      stats: [
        { value: '60+', label: 'Marken entwickelt' },
        { value: '85+', label: 'Websites gelauncht' },
        { value: '13+', label: 'Jahre Erfahrung' },
        { value: '98%', label: 'Kundenzufriedenheit' },
      ],
      introTitle: 'Warum Marke und Website zusammengehören',
      introText: 'Viele Unternehmen starten mit einer Website ohne klare Markenstrategie – oder haben eine Marke, die online nicht konsequent umgesetzt wird. Das führt zu inkonsistenten Botschaften und verpassten Chancen. Mit unserem integrierten Ansatz entwickeln wir beides zusammen: Eine starke Markenidentität, die in Ihrer Website konsistent zum Leben kommt.',
      introHighlights: [
        'Keine Brüche zwischen Marke und Website',
        'Konsistente Botschaften auf allen Kanälen',
        'Schnellerer Launch durch parallele Entwicklung',
        'Langfristig geringere Kosten als getrennte Projekte',
      ],
      sections: [
        { icon: 'palette', title: 'Markenpositionierung und visuelle Identität', description: 'Wir definieren, wofür Ihre Marke steht, und geben ihr ein unverwechselbares Gesicht.', items: ['Markenworkshop und Strategieentwicklung', 'Wettbewerbsanalyse und Positionierung', 'Logo-Design und Farbkonzept', 'Typografie und Bildsprache', 'Brand Guidelines Dokument'] },
        { icon: 'globe', title: 'Webseitenstruktur und Design', description: 'Wir gestalten eine Website, die Ihre Marke widerspiegelt und Besucher überzeugt.', items: ['Informationsarchitektur und Sitemap', 'Wireframes für alle Seitentypen', 'Responsive Design (Desktop, Tablet, Mobile)', 'Interaktive Prototypen zur Abstimmung', 'Barrierefreiheit und Usability'] },
        { icon: 'file-text', title: 'Grundlegende Inhalte und Templates', description: 'Wir erstellen die Texte und Templates, die Ihre Website zum Leben erwecken.', items: ['Content-Strategie und Seitenstruktur', 'Texterstellung für Kernseiten', 'SEO-optimierte Inhalte', 'Bildauswahl und -bearbeitung', 'Wiederverwendbare Content-Templates'] },
        { icon: 'rocket', title: 'Technischer Setup und Go-Live', description: 'Wir setzen alles technisch um und begleiten Sie bis zum erfolgreichen Launch.', items: ['CMS-Einrichtung (Next.js, WordPress o.ä.)', 'SEO-Grundkonfiguration', 'Performance-Optimierung', 'Analytics-Integration', 'Launch und Einweisung'] },
      ],
      process: [
        { step: '1', title: 'Discovery', description: 'Briefing, Markenworkshop und Zieldefinition' },
        { step: '2', title: 'Strategie', description: 'Positionierung und Konzeptentwicklung' },
        { step: '3', title: 'Design', description: 'Logo, Identität und Web-Design' },
        { step: '4', title: 'Content', description: 'Texte, Bilder und Templates' },
        { step: '5', title: 'Entwicklung', description: 'Technische Umsetzung' },
        { step: '6', title: 'Launch', description: 'Go-Live und Einweisung' },
      ],
      benefits: [
        { icon: 'target', title: 'Klare Positionierung', description: 'Ihre Marke hebt sich ab und kommuniziert klar, wofür sie steht.' },
        { icon: 'shield', title: 'Konsistentes Erscheinungsbild', description: 'Von der Visitenkarte bis zur Website – alles aus einem Guss.' },
        { icon: 'trending-up', title: 'Conversion-optimiert', description: 'Die Website ist nicht nur schön, sondern bringt auch Ergebnisse.' },
        { icon: 'users', title: 'Zukunftssicher', description: 'Flexibles System, das mit Ihrem Unternehmen wächst.' },
      ],
      idealFor: ['Startups und Neugründungen', 'Unternehmen vor einem Rebranding', 'Businesses ohne professionellen Webauftritt', 'Unternehmen, die Marke und Website vereinheitlichen möchten', 'Scale-ups mit wachsenden Anforderungen'],
      investmentTitle: 'Investment',
      investmentText: 'Das Brand & Web Foundation Paket startet ab €12.000 für kleinere Projekte. Typische Projekte mit umfassender Markenentwicklung und mehrseitiger Website bewegen sich zwischen €15.000 und €35.000, abhängig von Umfang und Komplexität.',
      investmentNote: 'Ratenzahlung möglich. Optional: Laufende Wartung und Content-Updates ab €500/Monat.',
      faqTitle: 'Häufige Fragen zum Brand & Web Foundation Paket',
      faqs: [
        { question: 'Wie lange dauert ein Brand & Web Foundation Projekt?', answer: 'Ein typisches Projekt dauert 8-12 Wochen von Kick-off bis Launch. Die genaue Dauer hängt von der Komplexität der Markenentwicklung und dem Umfang der Website ab. Im Erstgespräch geben wir Ihnen eine realistische Einschätzung für Ihr konkretes Projekt.' },
        { question: 'Kann ich das Paket auch nur für Branding oder nur für die Website buchen?', answer: 'Ja, wir bieten auch separate Branding- und Website-Projekte an. Der Vorteil des kombinierten Pakets ist die nahtlose Integration und der effizientere Prozess. Bei getrennten Projekten empfehlen wir, mit dem Branding zu starten.' },
        { question: 'Was ist, wenn ich bereits ein Logo habe?', answer: 'Kein Problem. Wir können mit Ihrem bestehenden Logo arbeiten und darauf aufbauend die visuelle Identität erweitern. Alternativ analysieren wir Ihr Logo und empfehlen bei Bedarf eine Überarbeitung – die Entscheidung liegt bei Ihnen.' },
        { question: 'Welches CMS wird verwendet?', answer: 'Wir setzen primär auf moderne Headless-Lösungen wie Next.js mit Payload CMS für maximale Performance und Flexibilität. Alternativ arbeiten wir auch mit WordPress, Webflow oder anderen Systemen – je nach Ihren Anforderungen und dem Wissen Ihres Teams.' },
      ],
      ctaTitle: 'Bereit für Ihr Brand & Web Foundation?',
      ctaDescription: 'Lassen Sie uns gemeinsam Ihre Marke und Website entwickeln. Vereinbaren Sie ein kostenloses Erstgespräch.',
      ctaPrimaryButton: 'Erstgespräch vereinbaren',
      ctaSecondaryButton: 'Andere Pakete ansehen',
      backLink: 'Alle Pakete',
      includedTitle: 'Was im Paket enthalten ist',
      processTitle: 'Unser Vorgehen',
      benefitsTitle: 'Warum Brand & Web Foundation?',
      idealForTitle: 'Ideal für',
      seo: { metaTitle: 'Brand & Web Foundation | Branding + Website Paket', metaDescription: 'Das Fundament für Ihren digitalen Auftritt: Markenpositionierung, visuelle Identität und professionelle Website aus einer Hand. Von der Strategie bis zum Launch.', keywords: 'Branding Paket, Website Paket, Markenentwicklung, Corporate Design, Web Foundation' },
    },
    en: {
      title: 'Brand & Web Foundation',
      subtitle: 'The Foundation for Your Digital Presence',
      goal: 'A clear brand and a website that creates orientation',
      description: 'With the Brand & Web Foundation package, we develop your brand identity and implement it in a professional website. You receive a consistent appearance that builds trust and appeals to your target audience.',
      stats: [
        { value: '60+', label: 'Brands Developed' },
        { value: '85+', label: 'Websites Launched' },
        { value: '13+', label: 'Years Experience' },
        { value: '98%', label: 'Client Satisfaction' },
      ],
      introTitle: 'Why Brand and Website Belong Together',
      introText: 'Many companies start with a website without a clear brand strategy – or have a brand that isn\'t consistently implemented online. This leads to inconsistent messages and missed opportunities. With our integrated approach, we develop both together: A strong brand identity that consistently comes to life on your website.',
      introHighlights: [
        'No gaps between brand and website',
        'Consistent messages across all channels',
        'Faster launch through parallel development',
        'Lower long-term costs than separate projects',
      ],
      sections: [
        { icon: 'palette', title: 'Brand Positioning and Visual Identity', description: 'We define what your brand stands for and give it a distinctive face.', items: ['Brand workshop and strategy development', 'Competitive analysis and positioning', 'Logo design and color concept', 'Typography and visual language', 'Brand guidelines document'] },
        { icon: 'globe', title: 'Website Structure and Design', description: 'We design a website that reflects your brand and convinces visitors.', items: ['Information architecture and sitemap', 'Wireframes for all page types', 'Responsive design (desktop, tablet, mobile)', 'Interactive prototypes for approval', 'Accessibility and usability'] },
        { icon: 'file-text', title: 'Basic Content and Templates', description: 'We create the copy and templates that bring your website to life.', items: ['Content strategy and page structure', 'Copywriting for core pages', 'SEO-optimized content', 'Image selection and editing', 'Reusable content templates'] },
        { icon: 'rocket', title: 'Technical Setup and Go-Live', description: 'We implement everything technically and guide you to a successful launch.', items: ['CMS setup (Next.js, WordPress, etc.)', 'SEO base configuration', 'Performance optimization', 'Analytics integration', 'Launch and training'] },
      ],
      process: [
        { step: '1', title: 'Discovery', description: 'Briefing, brand workshop, and goal definition' },
        { step: '2', title: 'Strategy', description: 'Positioning and concept development' },
        { step: '3', title: 'Design', description: 'Logo, identity, and web design' },
        { step: '4', title: 'Content', description: 'Copy, images, and templates' },
        { step: '5', title: 'Development', description: 'Technical implementation' },
        { step: '6', title: 'Launch', description: 'Go-live and training' },
      ],
      benefits: [
        { icon: 'target', title: 'Clear Positioning', description: 'Your brand stands out and clearly communicates what it represents.' },
        { icon: 'shield', title: 'Consistent Appearance', description: 'From business cards to website – everything from one mold.' },
        { icon: 'trending-up', title: 'Conversion-optimized', description: 'The website is not only beautiful but also delivers results.' },
        { icon: 'users', title: 'Future-proof', description: 'Flexible system that grows with your business.' },
      ],
      idealFor: ['Startups and new businesses', 'Companies before a rebranding', 'Businesses without professional web presence', 'Companies that want to unify brand and website', 'Scale-ups with growing requirements'],
      investmentTitle: 'Investment',
      investmentText: 'The Brand & Web Foundation package starts from €12,000 for smaller projects. Typical projects with comprehensive brand development and multi-page websites range between €15,000 and €35,000, depending on scope and complexity.',
      investmentNote: 'Installment payments possible. Optional: Ongoing maintenance and content updates from €500/month.',
      faqTitle: 'Frequently Asked Questions About Brand & Web Foundation',
      faqs: [
        { question: 'How long does a Brand & Web Foundation project take?', answer: 'A typical project takes 8-12 weeks from kick-off to launch. The exact duration depends on the complexity of brand development and the scope of the website. In the initial consultation, we\'ll give you a realistic estimate for your specific project.' },
        { question: 'Can I book the package for branding only or website only?', answer: 'Yes, we also offer separate branding and website projects. The advantage of the combined package is seamless integration and a more efficient process. For separate projects, we recommend starting with branding.' },
        { question: 'What if I already have a logo?', answer: 'No problem. We can work with your existing logo and expand the visual identity based on it. Alternatively, we analyze your logo and recommend a revision if needed – the decision is yours.' },
        { question: 'Which CMS is used?', answer: 'We primarily use modern headless solutions like Next.js with Payload CMS for maximum performance and flexibility. Alternatively, we also work with WordPress, Webflow, or other systems – depending on your requirements and your team\'s knowledge.' },
      ],
      ctaTitle: 'Ready for Your Brand & Web Foundation?',
      ctaDescription: 'Let\'s develop your brand and website together. Schedule a free initial consultation.',
      ctaPrimaryButton: 'Schedule Consultation',
      ctaSecondaryButton: 'View Other Packages',
      backLink: 'All Packages',
      includedTitle: 'What\'s Included',
      processTitle: 'Our Process',
      benefitsTitle: 'Why Brand & Web Foundation?',
      idealForTitle: 'Ideal For',
      seo: { metaTitle: 'Brand & Web Foundation | Branding + Website Package', metaDescription: 'The foundation for your digital presence: Brand positioning, visual identity, and professional website from one source. From strategy to launch.', keywords: 'Branding Package, Website Package, Brand Development, Corporate Design, Web Foundation' },
    },
  },
  'seo-content-growth': {
    de: {
      title: 'SEO & Content Growth',
      subtitle: 'Nachhaltig wachsen durch organische Sichtbarkeit',
      goal: 'Nachhaltige Sichtbarkeit und planbarer organischer Traffic',
      description: 'Mit dem SEO & Content Growth Paket entwickeln wir eine langfristige Strategie für Ihre organische Reichweite. Wir erstellen relevanten Content, optimieren Ihre Website und etablieren Prozesse für kontinuierliches Wachstum.',
      stats: [
        { value: '+150%', label: 'Mehr organischer Traffic' },
        { value: '45+', label: 'SEO-Projekte umgesetzt' },
        { value: 'Top 10', label: 'Rankings in 3-6 Monaten' },
        { value: '€2M+', label: 'Generierter Traffic-Wert' },
      ],
      introTitle: 'Warum organisches Wachstum der nachhaltigste Kanal ist',
      introText: 'Paid Ads bringen schnelle Ergebnisse, aber sobald Sie aufhören zu zahlen, stoppt der Traffic. Organische Sichtbarkeit hingegen baut einen dauerhaften Vermögenswert auf: hochwertige Inhalte, die über Jahre Traffic und Leads generieren. Unsere SEO & Content Growth Suite kombiniert tiefgreifende Keyword-Analyse mit strategischer Content-Erstellung – für Sichtbarkeit, die bleibt.',
      sections: [
        { icon: 'search', title: 'Themen- und Content-Strategie', description: 'Datenbasierte Grundlage für relevante Inhalte', items: ['Keyword-Recherche mit Suchvolumen und Wettbewerb', 'Themencluster und Pillar-Page-Architektur', 'Wettbewerbsanalyse (Content Gap, Backlinks)', 'Suchintention-Mapping (informational, transactional)', 'Content-Scoring und Priorisierung'] },
        { icon: 'file-text', title: 'Strukturierte Inhalte und Seitenlogik', description: 'Technische Grundlage für maximale Sichtbarkeit', items: ['URL-Struktur und Seitenarchitektur', 'Interne Verlinkungsstrategie (Topical Authority)', 'Meta-Tags, Title-Optimierung, Schema Markup', 'Core Web Vitals und Page Speed', 'Mobile-First Optimierung'] },
        { icon: 'calendar', title: 'Redaktionspläne und Prozesse', description: 'Skalierbare Systeme für kontinuierlichen Output', items: ['Redaktionskalender mit Veröffentlichungszeitplan', 'Detaillierte Content-Briefings für Writer', 'Qualitätssicherung und SEO-Review', 'Publishing-Workflows und Freigaben', 'Content-Updates und Refresh-Zyklen'] },
        { icon: 'trending-up', title: 'Kontinuierliche Optimierung', description: 'Datengetriebene Verbesserung für nachhaltigen Erfolg', items: ['Ranking-Monitoring (täglich, wöchentlich)', 'Traffic-Analyse und User-Behavior', 'Content-Performance und Conversion-Tracking', 'Monatliche Reports und Quartals-Reviews', 'Algorithmische Updates und Anpassungen'] },
      ],
      process: [
        { step: '1', title: 'Audit', description: 'Technische Analyse, Content-Audit und Wettbewerbsrecherche' },
        { step: '2', title: 'Strategie', description: 'Keyword-Mapping, Themencluster und Redaktionsplan' },
        { step: '3', title: 'Content', description: 'Briefings, Erstellung und SEO-Optimierung' },
        { step: '4', title: 'Launch', description: 'Publishing, Indexierung und interne Verlinkung' },
        { step: '5', title: 'Monitor', description: 'Ranking-Tracking und Performance-Analyse' },
        { step: '6', title: 'Optimize', description: 'Content-Updates und kontinuierliche Verbesserung' },
      ],
      benefits: [
        { icon: 'trending-up', title: 'Nachhaltiger Traffic', description: 'Organischer Traffic, der nicht aufhört, wenn das Budget endet.' },
        { icon: 'target', title: 'Qualifizierte Besucher', description: 'Nutzer mit echtem Suchinteresse – höhere Conversion-Wahrscheinlichkeit.' },
        { icon: 'shield', title: 'Content-Asset', description: 'Jeder Artikel ist ein dauerhafter Vermögenswert für Ihr Unternehmen.' },
        { icon: 'bar-chart', title: 'Messbare Ergebnisse', description: 'Klare KPIs, monatliche Reports und nachvollziehbarer ROI.' },
      ],
      idealFor: ['Unternehmen mit bestehender Website', 'B2B und B2C mit komplexen Themen', 'Langfristig orientierte Marketing-Teams', 'Content-getriebene Geschäftsmodelle'],
      investmentTitle: 'Investition',
      investmentText: 'Die SEO & Content Growth Suite startet ab €2.500/Monat. Der Umfang richtet sich nach Ihren Zielen, dem Wettbewerb und der gewünschten Content-Frequenz.',
      investmentNote: 'Alle Preise verstehen sich netto zzgl. gesetzlicher MwSt.',
      faqTitle: 'Häufige Fragen',
      faqs: [
        { question: 'Wie lange dauert es, bis wir SEO-Ergebnisse sehen?', answer: 'SEO ist ein langfristiges Investment. Erste Rankings und Traffic-Steigerungen zeigen sich typischerweise nach 3-6 Monaten. Signifikante Ergebnisse und ein etabliertes Content-Asset entstehen über 6-12 Monate. Wir setzen realistische Erwartungen und kommunizieren transparent den Fortschritt.' },
        { question: 'Erstellen Sie auch den Content oder nur die Strategie?', answer: 'Beides. Wir entwickeln die Strategie, erstellen detaillierte Briefings und können den Content komplett übernehmen – oder mit Ihrem Team zusammenarbeiten. Unsere Writer haben Erfahrung mit B2B, Tech, Finance und anderen anspruchsvollen Branchen.' },
        { question: 'Wie unterscheidet sich Ihr Ansatz von anderen SEO-Agenturen?', answer: 'Wir fokussieren auf nachhaltiges Wachstum statt kurzfristiger Tricks. Das bedeutet: White-Hat-Methoden, E-E-A-T-konforme Inhalte, echte Expertise in den Texten. Keine Keyword-Stuffing, keine Link-Schemes. Unser Ansatz übersteht jedes Google-Update.' },
        { question: 'Können Sie auch bei technischem SEO unterstützen?', answer: 'Absolut. Technisches SEO ist die Basis für Content-Erfolg. Wir analysieren und optimieren Core Web Vitals, Site-Architecture, Crawlability, Schema Markup und mehr. Bei größeren technischen Projekten arbeiten wir eng mit Ihrem Entwicklungsteam zusammen.' },
      ],
      ctaTitle: 'Bereit für organisches Wachstum?',
      ctaDescription: 'Lassen Sie uns in einem kostenlosen SEO-Audit analysieren, wo Ihre größten Potenziale liegen.',
      ctaPrimaryButton: 'Kostenloses SEO-Audit',
      ctaSecondaryButton: 'Alle Pakete',
      backLink: 'Alle Pakete',
      includedTitle: 'Was im Paket enthalten ist',
      processTitle: 'Unser Vorgehen',
      benefitsTitle: 'Ihre Vorteile',
      idealForTitle: 'Ideal für',
      seo: { metaTitle: 'SEO & Content Growth Suite | Organisches Wachstum Wien', metaDescription: 'Nachhaltige SEO-Strategie für organisches Wachstum: Keyword-Strategie, Content-Erstellung, technische Optimierung. Durchschnittlich +150% organischer Traffic. Jetzt anfragen.', keywords: 'SEO Agentur Wien, Content Marketing, Organisches Wachstum, Keyword Strategie, Content Strategie' },
    },
    en: {
      title: 'SEO & Content Growth',
      subtitle: 'Grow Sustainably Through Organic Visibility',
      goal: 'Sustainable visibility and predictable organic traffic',
      description: 'With the SEO & Content Growth package, we develop a long-term strategy for your organic reach. We create relevant content, optimize your website, and establish processes for continuous growth.',
      stats: [
        { value: '+150%', label: 'More organic traffic' },
        { value: '45+', label: 'SEO projects completed' },
        { value: 'Top 10', label: 'Rankings in 3-6 months' },
        { value: '€2M+', label: 'Generated traffic value' },
      ],
      introTitle: 'Why Organic Growth is the Most Sustainable Channel',
      introText: 'Paid ads bring quick results, but once you stop paying, traffic stops. Organic visibility, on the other hand, builds a permanent asset: high-quality content that generates traffic and leads for years. Our SEO & Content Growth Suite combines deep keyword analysis with strategic content creation – for visibility that lasts.',
      sections: [
        { icon: 'search', title: 'Topic and Content Strategy', description: 'Data-based foundation for relevant content', items: ['Keyword research with search volume and competition', 'Topic clusters and pillar page architecture', 'Competitive analysis (content gap, backlinks)', 'Search intent mapping (informational, transactional)', 'Content scoring and prioritization'] },
        { icon: 'file-text', title: 'Structured Content and Page Logic', description: 'Technical foundation for maximum visibility', items: ['URL structure and site architecture', 'Internal linking strategy (topical authority)', 'Meta tags, title optimization, schema markup', 'Core Web Vitals and page speed', 'Mobile-first optimization'] },
        { icon: 'calendar', title: 'Editorial Plans and Processes', description: 'Scalable systems for continuous output', items: ['Editorial calendar with publication schedule', 'Detailed content briefings for writers', 'Quality assurance and SEO review', 'Publishing workflows and approvals', 'Content updates and refresh cycles'] },
        { icon: 'trending-up', title: 'Continuous Optimization', description: 'Data-driven improvement for lasting success', items: ['Ranking monitoring (daily, weekly)', 'Traffic analysis and user behavior', 'Content performance and conversion tracking', 'Monthly reports and quarterly reviews', 'Algorithm updates and adjustments'] },
      ],
      process: [
        { step: '1', title: 'Audit', description: 'Technical analysis, content audit and competitive research' },
        { step: '2', title: 'Strategy', description: 'Keyword mapping, topic clusters and editorial plan' },
        { step: '3', title: 'Content', description: 'Briefings, creation and SEO optimization' },
        { step: '4', title: 'Launch', description: 'Publishing, indexing and internal linking' },
        { step: '5', title: 'Monitor', description: 'Ranking tracking and performance analysis' },
        { step: '6', title: 'Optimize', description: 'Content updates and continuous improvement' },
      ],
      benefits: [
        { icon: 'trending-up', title: 'Sustainable Traffic', description: 'Organic traffic that doesn\'t stop when the budget ends.' },
        { icon: 'target', title: 'Qualified Visitors', description: 'Users with real search intent – higher conversion probability.' },
        { icon: 'shield', title: 'Content Asset', description: 'Every article is a permanent asset for your company.' },
        { icon: 'bar-chart', title: 'Measurable Results', description: 'Clear KPIs, monthly reports and traceable ROI.' },
      ],
      idealFor: ['Companies with existing website', 'B2B and B2C with complex topics', 'Long-term oriented marketing teams', 'Content-driven business models'],
      investmentTitle: 'Investment',
      investmentText: 'The SEO & Content Growth Suite starts at €2,500/month. Scope depends on your goals, competition and desired content frequency.',
      investmentNote: 'All prices are net plus applicable VAT.',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        { question: 'How long until we see SEO results?', answer: 'SEO is a long-term investment. First rankings and traffic increases typically show after 3-6 months. Significant results and an established content asset develop over 6-12 months. We set realistic expectations and communicate progress transparently.' },
        { question: 'Do you also create the content or just the strategy?', answer: 'Both. We develop the strategy, create detailed briefings and can handle content completely – or work with your team. Our writers have experience with B2B, tech, finance and other demanding industries.' },
        { question: 'How does your approach differ from other SEO agencies?', answer: 'We focus on sustainable growth rather than short-term tricks. That means: white-hat methods, E-E-A-T compliant content, real expertise in the texts. No keyword stuffing, no link schemes. Our approach survives every Google update.' },
        { question: 'Can you also help with technical SEO?', answer: 'Absolutely. Technical SEO is the foundation for content success. We analyze and optimize Core Web Vitals, site architecture, crawlability, schema markup and more. For larger technical projects, we work closely with your development team.' },
      ],
      ctaTitle: 'Ready for Organic Growth?',
      ctaDescription: 'Let\'s analyze your biggest potential in a free SEO audit.',
      ctaPrimaryButton: 'Free SEO Audit',
      ctaSecondaryButton: 'All Packages',
      backLink: 'All Packages',
      includedTitle: 'What\'s Included',
      processTitle: 'Our Process',
      benefitsTitle: 'Your Benefits',
      idealForTitle: 'Ideal For',
      seo: { metaTitle: 'SEO & Content Growth Suite | Organic Growth Vienna', metaDescription: 'Sustainable SEO strategy for organic growth: Keyword strategy, content creation, technical optimization. Average +150% organic traffic. Get in touch.', keywords: 'SEO Agency Vienna, Content Marketing, Organic Growth, Keyword Strategy, Content Strategy' },
    },
  },
  'demand-gen-suite': {
    de: {
      title: 'Demand Gen Suite',
      subtitle: 'Full-Funnel-Marketing für messbare Ergebnisse',
      goal: 'Messbare Nachfrage und qualifizierte Anfragen',
      description: 'Mit der Demand Gen Suite generieren wir qualifizierte Leads durch strategische Kampagnen, Paid Media und Marketing-Automatisierung. Von der ersten Berührung bis zur Conversion – wir optimieren Ihren gesamten Funnel.',
      stats: [
        { value: '+180%', label: 'Mehr qualifizierte Leads' },
        { value: '-35%', label: 'Niedrigere Akquisekosten' },
        { value: '3x', label: 'Höhere Conversion-Rate' },
        { value: '12+', label: 'Demand Gen Projekte' },
      ],
      introTitle: 'Warum Demand Generation wichtig ist',
      introText: 'Klassisches Marketing reicht heute nicht mehr aus. Moderne B2B-Entscheider recherchieren selbstständig, vergleichen Anbieter und erwarten personalisierte Kommunikation. Die Demand Gen Suite verbindet strategisches Funnel-Denken mit datengetriebenem Performance-Marketing – für messbare Pipeline und vorhersagbare Revenue.',
      sections: [
        { icon: 'target', title: 'Funnel- und Kampagnenkonzepte', description: 'Strategische Grundlage für nachhaltiges Wachstum', items: ['Customer Journey Mapping mit Touchpoint-Analyse', 'Funnel-Design (TOFU/MOFU/BOFU)', 'Kampagnenplanung und Content-Strategie', 'Zielgruppen-Segmentierung und Personas', 'Competitive Analysis und Positionierung'] },
        { icon: 'megaphone', title: 'Paid Media und Content-Produktion', description: 'Reichweite und Engagement auf den richtigen Kanälen', items: ['Google Ads (Search, Display, YouTube)', 'LinkedIn Ads für B2B-Targeting', 'Meta Ads für Awareness und Retargeting', 'Landing Pages mit Conversion-Fokus', 'Creatives, Ad-Texte und A/B-Testing'] },
        { icon: 'mail', title: 'Automatisierung und Lead-Nurturing', description: 'Skalierbare Prozesse für konsistente Ergebnisse', items: ['E-Mail-Sequenzen (Welcome, Nurturing, Re-Engagement)', 'CRM-Integration (HubSpot, Salesforce, Pipedrive)', 'Lead Scoring und Qualifizierung', 'Retargeting-Workflows', 'Sales-Übergabe-Prozesse'] },
        { icon: 'bar-chart', title: 'Tracking und laufende Optimierung', description: 'Datenbasierte Entscheidungen für kontinuierliche Verbesserung', items: ['Server-Side Tracking und GA4-Setup', 'Conversion-Tracking über alle Kanäle', 'Attribution Modeling (Multi-Touch)', 'Live-Dashboards und Reporting', 'Wöchentliche Optimierungszyklen'] },
      ],
      process: [
        { step: '1', title: 'Analyse', description: 'Funnel-Audit, Zielgruppen-Research und Wettbewerbsanalyse' },
        { step: '2', title: 'Strategie', description: 'Kampagnenkonzept, Channel-Mix und KPI-Definition' },
        { step: '3', title: 'Setup', description: 'Tracking, Ads-Konten, Automation und Landing Pages' },
        { step: '4', title: 'Launch', description: 'Kampagnenstart mit initaler Testphase' },
        { step: '5', title: 'Optimize', description: 'Datenanalyse und Performance-Optimierung' },
        { step: '6', title: 'Scale', description: 'Erfolgreiche Ansätze skalieren' },
      ],
      benefits: [
        { icon: 'trending-up', title: 'Messbare Pipeline', description: 'Keine Blackbox – Sie sehen exakt, welche Maßnahmen Leads und Revenue generieren.' },
        { icon: 'users', title: 'Qualifizierte Leads', description: 'Lead Scoring und Nurturing stellen sicher, dass nur kaufbereite Kontakte an Sales gehen.' },
        { icon: 'zap', title: 'Schnelle Iteration', description: 'Wöchentliche Optimierungszyklen basierend auf echten Performance-Daten.' },
        { icon: 'shield', title: 'Volle Transparenz', description: 'Live-Dashboards, detaillierte Reports und Zugang zu allen Konten.' },
      ],
      idealFor: ['B2B-Unternehmen mit Sales-Team', 'SaaS und Tech-Startups', 'Dienstleister mit hohen CLVs', 'E-Commerce mit Repeat-Kunden'],
      investmentTitle: 'Investition',
      investmentText: 'Die Demand Gen Suite ist modular aufgebaut. Einstieg ab €3.500/Monat zzgl. Media-Budget. Konkrete Preise nach individuellem Scoping.',
      investmentNote: 'Alle Preise verstehen sich netto zzgl. gesetzlicher MwSt.',
      faqTitle: 'Häufige Fragen',
      faqs: [
        { question: 'Wie schnell sehen wir erste Ergebnisse?', answer: 'Erste Daten und Learnings haben wir nach 2-4 Wochen. Signifikante Ergebnisse (mehr Leads, niedrigere CPL) zeigen sich typischerweise nach 6-8 Wochen, wenn die Optimierungszyklen greifen. Für nachhaltige Pipeline-Steigerung planen wir mit 3-6 Monaten.' },
        { question: 'Welche Kanäle sind für B2B am effektivsten?', answer: 'Das hängt von Ihrer Zielgruppe und Buying Journey ab. Für die meisten B2B-Unternehmen empfehlen wir eine Kombination aus LinkedIn Ads (Targeting), Google Search (Intent) und Retargeting. Bei größeren Budgets ergänzen wir YouTube und programmatische Display-Kampagnen.' },
        { question: 'Wie integrieren Sie sich in unser bestehendes CRM?', answer: 'Wir arbeiten mit allen gängigen CRMs (HubSpot, Salesforce, Pipedrive, etc.). Die Integration umfasst automatische Lead-Übergabe, Bidirectional Sync für Lead-Status, und gemeinsame Dashboards für Marketing und Sales. So wird Ihre Pipeline transparent und messbar.' },
        { question: 'Was ist der Unterschied zur SEO Content Growth Suite?', answer: 'Die Demand Gen Suite fokussiert auf bezahlte Kanäle und schnelle Ergebnisse. Die SEO Content Growth Suite baut langfristig organische Sichtbarkeit auf. Für maximale Wirkung empfehlen wir oft eine Kombination: Kurzfristig Leads über Ads, langfristig über SEO.' },
      ],
      ctaTitle: 'Bereit für mehr qualifizierte Leads?',
      ctaDescription: 'Lassen Sie uns in einem kostenlosen Strategiegespräch analysieren, wie wir Ihren Marketing-Funnel optimieren können.',
      ctaPrimaryButton: 'Kostenloses Strategiegespräch',
      ctaSecondaryButton: 'Alle Pakete',
      backLink: 'Alle Pakete',
      includedTitle: 'Was im Paket enthalten ist',
      processTitle: 'Unser Vorgehen',
      benefitsTitle: 'Ihre Vorteile',
      idealForTitle: 'Ideal für',
      seo: { metaTitle: 'Demand Gen Suite | Lead-Generierung & Automation', metaDescription: 'Full-Funnel-Marketing für messbare Nachfrage: Google Ads, LinkedIn Ads, Marketing Automation und Lead-Nurturing. Durchschnittlich +180% mehr qualifizierte Leads. Jetzt anfragen.', keywords: 'Lead Generierung Wien, Marketing Automation, Demand Generation, B2B Marketing, Google Ads Agentur' },
    },
    en: {
      title: 'Demand Gen Suite',
      subtitle: 'Full-Funnel Marketing for Measurable Results',
      goal: 'Measurable demand and qualified inquiries',
      description: 'With the Demand Gen Suite, we generate qualified leads through strategic campaigns, paid media, and marketing automation. From first touch to conversion – we optimize your entire funnel.',
      stats: [
        { value: '+180%', label: 'More qualified leads' },
        { value: '-35%', label: 'Lower acquisition costs' },
        { value: '3x', label: 'Higher conversion rate' },
        { value: '12+', label: 'Demand gen projects' },
      ],
      introTitle: 'Why Demand Generation Matters',
      introText: 'Traditional marketing is no longer enough. Modern B2B decision-makers research independently, compare providers, and expect personalized communication. The Demand Gen Suite combines strategic funnel thinking with data-driven performance marketing – for measurable pipeline and predictable revenue.',
      sections: [
        { icon: 'target', title: 'Funnel and Campaign Concepts', description: 'Strategic foundation for sustainable growth', items: ['Customer journey mapping with touchpoint analysis', 'Funnel design (TOFU/MOFU/BOFU)', 'Campaign planning and content strategy', 'Audience segmentation and personas', 'Competitive analysis and positioning'] },
        { icon: 'megaphone', title: 'Paid Media and Content Production', description: 'Reach and engagement on the right channels', items: ['Google Ads (Search, Display, YouTube)', 'LinkedIn Ads for B2B targeting', 'Meta Ads for awareness and retargeting', 'Landing pages with conversion focus', 'Creatives, ad copy and A/B testing'] },
        { icon: 'mail', title: 'Automation and Lead Nurturing', description: 'Scalable processes for consistent results', items: ['Email sequences (welcome, nurturing, re-engagement)', 'CRM integration (HubSpot, Salesforce, Pipedrive)', 'Lead scoring and qualification', 'Retargeting workflows', 'Sales handoff processes'] },
        { icon: 'bar-chart', title: 'Tracking and Ongoing Optimization', description: 'Data-based decisions for continuous improvement', items: ['Server-side tracking and GA4 setup', 'Conversion tracking across all channels', 'Attribution modeling (multi-touch)', 'Live dashboards and reporting', 'Weekly optimization cycles'] },
      ],
      process: [
        { step: '1', title: 'Analysis', description: 'Funnel audit, audience research and competitive analysis' },
        { step: '2', title: 'Strategy', description: 'Campaign concept, channel mix and KPI definition' },
        { step: '3', title: 'Setup', description: 'Tracking, ad accounts, automation and landing pages' },
        { step: '4', title: 'Launch', description: 'Campaign start with initial test phase' },
        { step: '5', title: 'Optimize', description: 'Data analysis and performance optimization' },
        { step: '6', title: 'Scale', description: 'Scale successful approaches' },
      ],
      benefits: [
        { icon: 'trending-up', title: 'Measurable Pipeline', description: 'No black box – you see exactly which measures generate leads and revenue.' },
        { icon: 'users', title: 'Qualified Leads', description: 'Lead scoring and nurturing ensure only purchase-ready contacts go to sales.' },
        { icon: 'zap', title: 'Fast Iteration', description: 'Weekly optimization cycles based on real performance data.' },
        { icon: 'shield', title: 'Full Transparency', description: 'Live dashboards, detailed reports and access to all accounts.' },
      ],
      idealFor: ['B2B companies with sales team', 'SaaS and tech startups', 'Service providers with high CLVs', 'E-commerce with repeat customers'],
      investmentTitle: 'Investment',
      investmentText: 'The Demand Gen Suite is modular. Starting from €3,500/month plus media budget. Specific pricing after individual scoping.',
      investmentNote: 'All prices are net plus applicable VAT.',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        { question: 'How quickly will we see results?', answer: 'First data and learnings after 2-4 weeks. Significant results (more leads, lower CPL) typically show after 6-8 weeks when optimization cycles take effect. For sustainable pipeline growth, we plan with 3-6 months.' },
        { question: 'Which channels are most effective for B2B?', answer: 'This depends on your target audience and buying journey. For most B2B companies, we recommend a combination of LinkedIn Ads (targeting), Google Search (intent) and retargeting. With larger budgets, we add YouTube and programmatic display campaigns.' },
        { question: 'How do you integrate with our existing CRM?', answer: 'We work with all common CRMs (HubSpot, Salesforce, Pipedrive, etc.). Integration includes automatic lead handoff, bidirectional sync for lead status, and shared dashboards for marketing and sales. This makes your pipeline transparent and measurable.' },
        { question: 'What\'s the difference to the SEO Content Growth Suite?', answer: 'The Demand Gen Suite focuses on paid channels and fast results. The SEO Content Growth Suite builds long-term organic visibility. For maximum impact, we often recommend a combination: Short-term leads via ads, long-term via SEO.' },
      ],
      ctaTitle: 'Ready for More Qualified Leads?',
      ctaDescription: 'Let\'s analyze in a free strategy session how we can optimize your marketing funnel.',
      ctaPrimaryButton: 'Free Strategy Session',
      ctaSecondaryButton: 'All Packages',
      backLink: 'All Packages',
      includedTitle: 'What\'s Included',
      processTitle: 'Our Process',
      benefitsTitle: 'Your Benefits',
      idealForTitle: 'Ideal For',
      seo: { metaTitle: 'Demand Gen Suite | Lead Generation & Automation', metaDescription: 'Full-funnel marketing for measurable demand: Google Ads, LinkedIn Ads, marketing automation and lead nurturing. Average +180% more qualified leads. Get in touch.', keywords: 'Lead Generation Vienna, Marketing Automation, Demand Generation, B2B Marketing, Google Ads Agency' },
    },
  },
  'individuelles-paket': {
    de: {
      title: 'Individuelles Paket',
      subtitle: 'Maximale Passgenauigkeit für Ihre Anforderungen',
      goal: 'Maximale Passgenauigkeit für komplexe Anforderungen',
      description: 'Nicht jedes Projekt passt in ein Standard-Paket. Mit dem individuellen Paket kombinieren wir unsere Services genau nach Ihren Bedürfnissen – für eine Lösung, die perfekt zu Ihren Zielen passt.',
      stats: [
        { value: '40+', label: 'Individuelle Projekte' },
        { value: '6+', label: 'Kombinierbare Services' },
        { value: '100%', label: 'Passgenaue Lösungen' },
        { value: '3', label: 'Standorte für lokale Betreuung' },
      ],
      introTitle: 'Warum maßgeschneiderte Lösungen?',
      introText: 'Standard-Pakete decken die häufigsten Anforderungen ab – aber manche Projekte erfordern mehr. Ob Sie eine komplette digitale Transformation planen, mehrere Geschäftsbereiche gleichzeitig modernisieren oder spezifische technische Anforderungen haben: Mit unserem individuellen Paket erhalten Sie genau die Services, die Sie brauchen – nicht mehr und nicht weniger.',
      introHighlights: [
        'Kombination aus allen Servicebereichen möglich',
        'Flexible Budgetierung nach Prioritäten',
        'Ein Ansprechpartner für alle Bereiche',
        'Nahtlose Integration aller Maßnahmen',
      ],
      sections: [
        { icon: 'puzzle', title: 'Kombination aller Services nach Bedarf', description: 'Wählen Sie aus unserem kompletten Portfolio die Services, die Ihr Projekt voranbringen.', items: ['Branding & Design', 'Webdesign & UX', 'SEO & Content Marketing', 'Digitales Marketing', 'Web- & App-Entwicklung', 'IT- & Cloud-Services'] },
        { icon: 'settings', title: 'Klare Roadmap und Priorisierung', description: 'Wir erstellen einen detaillierten Projektplan mit klaren Meilensteinen und Business-Fokus.', items: ['Projektplan mit Meilensteinen', 'Priorisierung nach Business Impact', 'Flexibles Scope Management', 'Transparente Zeitplanung'] },
        { icon: 'users', title: 'Enge Abstimmung mit internen Teams', description: 'Wir arbeiten Hand in Hand mit Ihren Teams – für maximale Effizienz und Wissenstransfer.', items: ['Regelmäßige Status-Meetings', 'Einbindung Ihrer Stakeholder', 'Knowledge Transfer', 'Gemeinsame Workshops'] },
        { icon: 'clock', title: 'Langfristige Begleitung und Betrieb', description: 'Nach dem Launch begleiten wir Sie weiter – mit Support, Wartung und strategischer Beratung.', items: ['Laufender Support', 'Wartung und Updates', 'Performance-Monitoring', 'Strategische Beratung'] },
      ],
      process: [
        { step: '1', title: 'Erstgespräch', description: 'Wir verstehen Ihre Herausforderungen, Ziele und aktuelle Situation' },
        { step: '2', title: 'Bedarfsanalyse', description: 'Wir identifizieren die relevanten Services und erstellen eine Empfehlung' },
        { step: '3', title: 'Angebot', description: 'Sie erhalten ein detailliertes, transparentes Angebot mit klaren Leistungen' },
        { step: '4', title: 'Kick-off', description: 'Gemeinsamer Workshop zur Feinabstimmung und Teamvorstellung' },
        { step: '5', title: 'Umsetzung', description: 'Agile Entwicklung mit regelmäßigen Sprints und Feedback-Schleifen' },
        { step: '6', title: 'Launch & Support', description: 'Go-Live mit Schulung und optionaler langfristiger Betreuung' },
      ],
      benefits: [
        { icon: 'target', title: 'Perfekte Passform', description: 'Kein Service zu viel, keiner zu wenig – exakt auf Ihre Anforderungen zugeschnitten.' },
        { icon: 'shield', title: 'Ein Partner, alle Services', description: 'Keine Koordination zwischen verschiedenen Agenturen – alles aus einer Hand.' },
        { icon: 'zap', title: 'Schnellere Umsetzung', description: 'Durch interne Abstimmung vermeiden wir Reibungsverluste zwischen Disziplinen.' },
        { icon: 'building2', title: 'Enterprise-ready', description: 'Auch für komplexe Anforderungen mit mehreren Stakeholdern und Compliance-Vorgaben.' },
      ],
      idealFor: ['Komplexe Transformationsprojekte', 'Unternehmen mit spezifischen Anforderungen', 'Laufende Betreuung und Weiterentwicklung', 'Multi-Disziplin-Projekte', 'Digitalisierungsinitiativen', 'Rebranding mit neuem Webauftritt'],
      investmentTitle: 'Investment',
      investmentText: 'Individuelle Pakete starten ab €5.000 für kleinere Kombinationen. Komplexe Transformationsprojekte bewegen sich typischerweise zwischen €15.000 und €100.000+, abhängig von Umfang und Dauer. Wir erstellen immer ein transparentes Angebot nach dem Erstgespräch.',
      investmentNote: 'Monatliche Retainer für laufende Betreuung ab €2.500/Monat möglich.',
      faqTitle: 'Häufige Fragen zum individuellen Paket',
      faqs: [
        { question: 'Wie unterscheidet sich das individuelle Paket von den Standard-Paketen?', answer: 'Die Standard-Pakete (Brand & Web Foundation, SEO & Content Growth, Demand Gen Suite) decken jeweils einen spezifischen Fokusbereich ab. Das individuelle Paket kombiniert Services aus allen Bereichen nach Bedarf – ideal für Projekte, die mehrere Disziplinen gleichzeitig erfordern oder besondere Anforderungen haben.' },
        { question: 'Wie lange dauert ein individuelles Projekt typischerweise?', answer: 'Die Dauer variiert stark nach Umfang: Ein kombiniertes Branding + Website-Projekt dauert ca. 3-4 Monate. Komplexe Transformationsprojekte mit mehreren Phasen können 6-12 Monate umfassen. Nach dem Erstgespräch erhalten Sie eine realistische Zeitschätzung.' },
        { question: 'Kann ich auch nur einzelne Services buchen?', answer: 'Ja, natürlich. Das individuelle Paket eignet sich sowohl für die Kombination mehrerer Services als auch für einzelne, komplexere Projekte, die nicht in die Standard-Pakete passen. Wir beraten Sie gerne, welche Option für Ihre Situation optimal ist.' },
        { question: 'Wie funktioniert die Zusammenarbeit bei Multi-Disziplin-Projekten?', answer: 'Sie erhalten einen dedizierten Projektmanager als zentralen Ansprechpartner. Dieser koordiniert alle internen Spezialisten (Designer, Entwickler, Marketing-Experten) und sorgt für nahtlose Übergaben zwischen den Disziplinen. Regelmäßige Status-Meetings halten Sie informiert.' },
      ],
      ctaTitle: 'Lassen Sie uns über Ihr Projekt sprechen',
      ctaDescription: 'In einem kostenlosen Erstgespräch finden wir gemeinsam die optimale Lösung für Ihre Anforderungen.',
      ctaPrimaryButton: 'Kostenloses Erstgespräch',
      ctaSecondaryButton: 'Alle Services ansehen',
      backLink: 'Alle Pakete',
      includedTitle: 'Was wir bieten',
      processTitle: 'So funktioniert\'s',
      benefitsTitle: 'Warum individuelle Pakete?',
      idealForTitle: 'Ideal für',
      seo: { metaTitle: 'Individuelles Paket | Maßgeschneiderte Lösungen', metaDescription: 'Maßgeschneiderte Service-Kombination für komplexe Anforderungen. Wir kombinieren unsere Leistungen genau nach Ihren Bedürfnissen – von Branding bis IT-Services.', keywords: 'Individuelles Paket, Maßgeschneiderte Lösungen, Digital Agentur Wien, Full-Service, Transformation' },
    },
    en: {
      title: 'Custom Package',
      subtitle: 'Maximum Precision for Your Requirements',
      goal: 'Maximum precision for complex requirements',
      description: 'Not every project fits into a standard package. With the custom package, we combine our services exactly according to your needs – for a solution that perfectly fits your goals.',
      stats: [
        { value: '40+', label: 'Custom Projects' },
        { value: '6+', label: 'Combinable Services' },
        { value: '100%', label: 'Tailored Solutions' },
        { value: '3', label: 'Locations for Local Support' },
      ],
      introTitle: 'Why Tailored Solutions?',
      introText: 'Standard packages cover the most common requirements – but some projects require more. Whether you\'re planning a complete digital transformation, modernizing multiple business areas simultaneously, or have specific technical requirements: With our custom package, you get exactly the services you need – no more, no less.',
      introHighlights: [
        'Combination from all service areas possible',
        'Flexible budgeting by priority',
        'One contact person for all areas',
        'Seamless integration of all measures',
      ],
      sections: [
        { icon: 'puzzle', title: 'Combination of All Services as Needed', description: 'Choose from our complete portfolio the services that advance your project.', items: ['Branding & Design', 'Web Design & UX', 'SEO & Content Marketing', 'Digital Marketing', 'Web & App Development', 'IT & Cloud Services'] },
        { icon: 'settings', title: 'Clear Roadmap and Prioritization', description: 'We create a detailed project plan with clear milestones and business focus.', items: ['Project plan with milestones', 'Prioritization by business impact', 'Flexible scope management', 'Transparent scheduling'] },
        { icon: 'users', title: 'Close Coordination with Internal Teams', description: 'We work hand in hand with your teams – for maximum efficiency and knowledge transfer.', items: ['Regular status meetings', 'Involvement of your stakeholders', 'Knowledge transfer', 'Joint workshops'] },
        { icon: 'clock', title: 'Long-term Support and Operations', description: 'After launch, we continue to support you – with support, maintenance, and strategic consulting.', items: ['Ongoing support', 'Maintenance and updates', 'Performance monitoring', 'Strategic consulting'] },
      ],
      process: [
        { step: '1', title: 'Initial Talk', description: 'We understand your challenges, goals, and current situation' },
        { step: '2', title: 'Needs Analysis', description: 'We identify relevant services and create a recommendation' },
        { step: '3', title: 'Proposal', description: 'You receive a detailed, transparent offer with clear deliverables' },
        { step: '4', title: 'Kick-off', description: 'Joint workshop for fine-tuning and team introduction' },
        { step: '5', title: 'Implementation', description: 'Agile development with regular sprints and feedback loops' },
        { step: '6', title: 'Launch & Support', description: 'Go-live with training and optional long-term support' },
      ],
      benefits: [
        { icon: 'target', title: 'Perfect Fit', description: 'No service too many, none too few – exactly tailored to your requirements.' },
        { icon: 'shield', title: 'One Partner, All Services', description: 'No coordination between different agencies – everything from a single source.' },
        { icon: 'zap', title: 'Faster Implementation', description: 'Through internal coordination, we avoid friction between disciplines.' },
        { icon: 'building2', title: 'Enterprise-ready', description: 'Also for complex requirements with multiple stakeholders and compliance requirements.' },
      ],
      idealFor: ['Complex transformation projects', 'Companies with specific requirements', 'Ongoing support and development', 'Multi-discipline projects', 'Digitalization initiatives', 'Rebranding with new web presence'],
      investmentTitle: 'Investment',
      investmentText: 'Custom packages start from €5,000 for smaller combinations. Complex transformation projects typically range between €15,000 and €100,000+, depending on scope and duration. We always create a transparent offer after the initial consultation.',
      investmentNote: 'Monthly retainers for ongoing support from €2,500/month available.',
      faqTitle: 'Frequently Asked Questions About Custom Package',
      faqs: [
        { question: 'How does the custom package differ from standard packages?', answer: 'The standard packages (Brand & Web Foundation, SEO & Content Growth, Demand Gen Suite) each cover a specific focus area. The custom package combines services from all areas as needed – ideal for projects that require multiple disciplines simultaneously or have special requirements.' },
        { question: 'How long does a custom project typically take?', answer: 'Duration varies greatly by scope: A combined branding + website project takes about 3-4 months. Complex transformation projects with multiple phases can span 6-12 months. After the initial consultation, you receive a realistic time estimate.' },
        { question: 'Can I also book individual services?', answer: 'Yes, of course. The custom package is suitable for both combining multiple services and for individual, more complex projects that don\'t fit into standard packages. We\'re happy to advise which option is optimal for your situation.' },
        { question: 'How does collaboration work on multi-discipline projects?', answer: 'You receive a dedicated project manager as your central contact. They coordinate all internal specialists (designers, developers, marketing experts) and ensure seamless handoffs between disciplines. Regular status meetings keep you informed.' },
      ],
      ctaTitle: 'Let\'s Talk About Your Project',
      ctaDescription: 'In a free initial consultation, we\'ll find the optimal solution for your requirements together.',
      ctaPrimaryButton: 'Free Consultation',
      ctaSecondaryButton: 'View All Services',
      backLink: 'All Packages',
      includedTitle: 'What We Offer',
      processTitle: 'How It Works',
      benefitsTitle: 'Why Custom Packages?',
      idealForTitle: 'Ideal For',
      seo: { metaTitle: 'Custom Package | Tailored Solutions', metaDescription: 'Tailored service combination for complex requirements. We combine our services exactly according to your needs – from branding to IT services.', keywords: 'Custom Package, Tailored Solutions, Digital Agency Vienna, Full-Service, Transformation' },
    },
  },
}

export async function generateStaticParams() {
  const locales = ['de', 'en'] as const
  // Generate params for both locales - slugs are translated by routing.ts
  return locales.flatMap(locale =>
    validSlugs.map(slug => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  // No RU package detail content exists — would show DE fallback → duplicate
  if (locale === 'ru') {
    notFound()
  }

  if (!validSlugs.includes(slug)) {
    return { title: 'Package Not Found' }
  }

  const cmsPackage = await getPackageBySlug(slug, locale)
  const defaultPkg = defaultPackages[slug]?.[locale]

  const seo = cmsPackage?.seo || defaultPkg?.seo
  const canonicalUrl = getCanonicalUrl(`/leistungen/pakete/${slug}`, locale)
  const hreflangAlternates = getHreflangAlternates(`/leistungen/pakete/${slug}`, locale)

  return {
    title: seo?.metaTitle || defaultPkg?.title || 'Package',
    description: seo?.metaDescription || defaultPkg?.description,
    keywords: (seo?.keywords || defaultPkg?.seo?.keywords || '').split(',').map((k: string) => k.trim()),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function PackageDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale

  // RU package pages not yet available — would show fallback DE content (duplicate)
  if (locale === 'ru') {
    notFound()
  }

  // Note: slug validation removed - next-intl routing handles path translation
  // The slug received here is always the German slug from the database

  if (!validSlugs.includes(slug)) {
    notFound()
  }

  const cmsPackage = await getPackageBySlug(slug, locale)
  const defaultPkg = defaultPackages[slug]?.[locale]

  // If no CMS package and no default, return 404
  if (!cmsPackage && !defaultPkg) {
    notFound()
  }

  // Build content from CMS or defaults (with optional chaining for safety)
  const content = {
    title: cmsPackage?.title || defaultPkg?.title || 'Package',
    subtitle: cmsPackage?.introTitle || defaultPkg?.subtitle || '',
    goal: cmsPackage?.goal || defaultPkg?.goal || '',
    description: cmsPackage?.description || defaultPkg?.description || '',
    stats: cmsPackage?.stats?.map((s: { value: string; label: string }) => ({ value: s.value, label: s.label })) || defaultPkg?.stats || [],
    introTitle: cmsPackage?.introTitle || defaultPkg?.introTitle || '',
    introText: cmsPackage?.introText || defaultPkg?.introText || '',
    introHighlights: cmsPackage?.introHighlights?.map((h: { text: string }) => h.text) || defaultPkg?.introHighlights || [],
    sections: cmsPackage?.sections?.map((s: { icon?: string; title: string; description: string; items?: Array<{ text: string }> }) => ({
      icon: s.icon || 'settings',
      title: s.title,
      description: s.description,
      items: s.items?.map((i) => i.text) || [],
    })) || defaultPkg?.sections || [],
    process: cmsPackage?.process?.map((p: { step: string; title: string; description: string }) => ({
      step: p.step,
      title: p.title,
      description: p.description,
    })) || defaultPkg?.process || [],
    benefits: cmsPackage?.benefits?.map((b: { icon?: string; title: string; description: string }) => ({
      icon: b.icon || 'check-circle',
      title: b.title,
      description: b.description,
    })) || defaultPkg?.benefits || [],
    idealFor: cmsPackage?.idealForTags?.map((t: { text: string }) => t.text) || defaultPkg?.idealFor || [],
    investmentTitle: cmsPackage?.investmentTitle || defaultPkg?.investmentTitle || '',
    investmentText: cmsPackage?.investmentText || defaultPkg?.investmentText || '',
    investmentNote: cmsPackage?.investmentNote || defaultPkg?.investmentNote || '',
    faqTitle: cmsPackage?.faqTitle || defaultPkg?.faqTitle || 'FAQ',
    faqs: cmsPackage?.faqs?.map((f: { question: string; answer: string }) => ({
      question: f.question,
      answer: f.answer,
    })) || defaultPkg?.faqs || [],
    ctaTitle: cmsPackage?.ctaTitle || defaultPkg?.ctaTitle || '',
    ctaDescription: cmsPackage?.ctaDescription || defaultPkg?.ctaDescription || '',
    ctaPrimaryButton: cmsPackage?.ctaPrimaryButton || defaultPkg?.ctaPrimaryButton || '',
    ctaSecondaryButton: cmsPackage?.ctaSecondaryButton || defaultPkg?.ctaSecondaryButton || '',
    backLink: defaultPkg?.backLink || (locale === 'de' ? '← Zurück zu Paketen' : '← Back to Packages'),
    includedTitle: defaultPkg?.includedTitle || (locale === 'de' ? 'Was enthalten ist' : 'What\'s Included'),
    processTitle: defaultPkg?.processTitle || (locale === 'de' ? 'Unser Prozess' : 'Our Process'),
    benefitsTitle: defaultPkg?.benefitsTitle || (locale === 'de' ? 'Ihre Vorteile' : 'Your Benefits'),
    idealForTitle: defaultPkg?.idealForTitle || (locale === 'de' ? 'Ideal für' : 'Ideal For'),
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': getSchemaUrl('/', locale) },
      { '@type': 'ListItem', 'position': 2, 'name': locale === 'de' ? 'Leistungen' : 'Services', 'item': getSchemaUrl('/leistungen', locale) },
      { '@type': 'ListItem', 'position': 3, 'name': locale === 'de' ? 'Service-Pakete' : 'Service Packages', 'item': getSchemaUrl('/leistungen/pakete', locale) },
      { '@type': 'ListItem', 'position': 4, 'name': content.title, 'item': getSchemaUrl(`/leistungen/pakete/${slug}`, locale) }
    ]
  }

  // Vienna office provider for Service schema
  const viennaOfficeProvider = {
    '@type': 'LocalBusiness',
    '@id': 'https://goldenwing.at/#organization',
    name: 'GoldenWing Creative Studios',
    url: 'https://goldenwing.at',
    telephone: '+43-664-543-96-81',
    email: 'office@goldenwing.at',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Czeikestrasse 4/21',
      addressLocality: 'Wien',
      postalCode: '1100',
      addressRegion: 'Wien',
      addressCountry: 'AT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.1676,
      longitude: 16.3795,
    },
    priceRange: '$$',
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': content.title,
    'description': content.description,
    'url': getSchemaUrl(`/leistungen/pakete/${slug}`, locale),
    'provider': viennaOfficeProvider,
    'areaServed': [
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <JsonLd data={serviceSchema} />

      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <Container variant="block">
          <div className="max-w-3xl">
            <NextLink href={getPackagesUrl(locale)} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />{content.backLink}
            </NextLink>
            <span className="block text-sm font-medium text-primary mb-4">{content.goal}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">{content.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{content.description}</p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      {content.stats && content.stats.length > 0 && (
        <section className="py-12 bg-muted/30">
          <Container variant="block">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.stats.map((stat: Stat, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Intro Section */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{content.introTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{content.introText}</p>
            </div>
            {content.introHighlights && content.introHighlights.length > 0 && (
              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold mb-4">{locale === 'de' ? 'Ihre Vorteile:' : 'Your Benefits:'}</h3>
                <ul className="space-y-3">
                  {content.introHighlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">{content.includedTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {content.sections.map((section: Section, index: number) => {
              const SectionIcon = iconMap[section.icon] || Settings
              return (
                <div key={index} className="p-6 rounded-xl bg-background border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <SectionIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">{content.processTitle}</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {content.process.map((phase: Process, index: number) => (
              <div key={index} className="text-center p-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {phase.step}
                </div>
                <h3 className="font-semibold mb-1">{phase.title}</h3>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">{content.benefitsTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.benefits.map((benefit: Benefit, index: number) => {
              const BenefitIcon = iconMap[benefit.icon] || CheckCircle
              return (
                <div key={index} className="p-6 rounded-xl bg-background border text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <BenefitIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Ideal For */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">{content.idealForTitle}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {content.idealFor.map((item: string, index: number) => (
                <span key={index} className="px-4 py-2 rounded-full bg-muted text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Investment Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{content.investmentTitle}</h2>
            <p className="text-lg text-muted-foreground mb-4">{content.investmentText}</p>
            <p className="text-sm text-muted-foreground italic">{content.investmentNote}</p>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title={content.faqTitle}
        items={content.faqs}
      />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.ctaTitle}</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">{content.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NextLink href={getContactUrl(locale)}>
                <Button size="lg" variant="secondary">
                  {content.ctaPrimaryButton}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </NextLink>
              <NextLink href={getPackagesUrl(locale)}>
                <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10">
                  {content.ctaSecondaryButton}
                </Button>
              </NextLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
