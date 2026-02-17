/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import config from '@payload-config'

// SEO-optimierte Service-Daten mit Keywords aus SEMRUSH-Recherche
const servicesData = [
  {
    title: 'Branding',
    slug: 'branding',
    subtitle: 'Markenstrategie & Corporate Identity entwickeln in Wien',
    description: 'Wir entwickeln einzigartige Brand Identity und Corporate Identity in Wien. Von der Markenstrategie bis zum fertigen Brand Book und Styleguide - alles aus einer Hand. Ob Logo Design, Visual Identity oder komplettes Rebranding: Ihre Marke wird unverwechselbar.',
    icon: 'palette',
    order: 1,
    features: [
      { title: 'Markenstrategie entwickeln', description: 'Strategische Markenpositionierung und Differenzierung im Wettbewerb' },
      { title: 'Visual Identity Design', description: 'Logo, Farbschema, Typografie und Brand Guidelines' },
      { title: 'Brand Book erstellen', description: 'Umfassende Dokumentation für konsistente Markenführung' },
      { title: 'Corporate Identity Entwicklung', description: 'Ganzheitliches Erscheinungsbild von Visitenkarten bis Geschäftsausstattung' },
    ],
    process: [
      { step: 'Brand Audit & Wettbewerbsanalyse' },
      { step: 'Markenstrategie & Positionierung' },
      { step: 'Kreative Konzeption & Naming' },
      { step: 'Logo Design & Visual Identity' },
      { step: 'Brand Guidelines & Styleguide' },
    ],
    subServices: [
      {
        title: 'Markenstrategie',
        slug: 'markenstrategie',
        description: 'Eine starke Markenstrategie bildet das Fundament für alle Ihre Marketingaktivitäten. Wir analysieren Ihren Markt, identifizieren Ihre Zielgruppe und entwickeln eine klare Positionierung, die Sie vom Wettbewerb abhebt. Von der Definition Ihrer Brand Values über die Entwicklung Ihres USP bis hin zum kompletten Brand Messaging Framework - wir liefern die strategische Grundlage für nachhaltigen Markenerfolg.',
        icon: 'target',
        seo: {
          metaTitle: 'Markenstrategie entwickeln Wien | Brand Positioning',
          metaDescription: 'Markenstrategie entwickeln lassen in Wien. Markenpositionierung, USP und Brand Values professionell definieren. Jetzt Brand Audit anfragen!',
          keywords: ['markenstrategie entwickeln', 'markenpositionierung', 'brand values definieren', 'usp entwickeln', 'brand audit']
        },
        benefits: [
          { benefit: 'Klare Differenzierung vom Wettbewerb' },
          { benefit: 'Definierte Markenpositionierung und USP' },
          { benefit: 'Fundierte Zielgruppen- und Wettbewerbsanalyse' },
          { benefit: 'Strategische Grundlage für alle Marketing-Maßnahmen' },
        ],
        features: [
          { title: 'Brand Audit durchführen', description: 'Analyse Ihrer aktuellen Markenwahrnehmung' },
          { title: 'Wettbewerbsanalyse Branding', description: 'Positionierung im Marktumfeld' },
          { title: 'Zielgruppe definieren', description: 'Persona-Entwicklung und Kundenverständnis' },
          { title: 'Brand Messaging Framework', description: 'Kernbotschaften und Tone of Voice' },
        ],
        process: [
          { title: 'Discovery Workshop', description: 'Gemeinsame Analyse Ihrer Marke, Ziele und Werte' },
          { title: 'Marktanalyse', description: 'Wettbewerbs- und Zielgruppenanalyse' },
          { title: 'Positionierung', description: 'Entwicklung Ihrer einzigartigen Markenposition' },
          { title: 'Strategie-Dokument', description: 'Umfassende Dokumentation mit Handlungsempfehlungen' },
        ],
        useCases: [
          { useCase: 'Neugründungen und Startups' },
          { useCase: 'Unternehmen vor dem Rebranding' },
          { useCase: 'Marken mit unklarer Positionierung' },
          { useCase: 'Unternehmen in wettbewerbsintensiven Märkten' },
        ],
        deliverables: [
          { deliverable: 'Brand Strategy Document (30-50 Seiten)' },
          { deliverable: 'Wettbewerbsanalyse & Marktübersicht' },
          { deliverable: 'Zielgruppen-Personas' },
          { deliverable: 'Brand Messaging Framework' },
        ],
        duration: '3-6 Wochen',
      },
      {
        title: 'Naming',
        slug: 'naming',
        description: 'Der richtige Name kann den Unterschied zwischen Erfolg und Vergessen ausmachen. Unser kreativer Naming-Prozess kombiniert strategisches Denken mit linguistischer Expertise. Wir entwickeln Firmennamen, die Ihre Markenessenz transportieren, Produktnamen, die Begehrlichkeit wecken, und Slogans, die im Gedächtnis bleiben. Jeder Vorschlag wird auf Domain-Verfügbarkeit, internationale Tauglichkeit und markenrechtliche Aspekte geprüft.',
        icon: 'lightbulb',
        seo: {
          metaTitle: 'Naming Agentur Wien | Firmenname & Slogan entwickeln',
          metaDescription: 'Firmenname finden und Slogan entwickeln lassen. Professionelles Naming mit Markenrecherche. Kreative Namen für Ihre Marke!',
          keywords: ['firmenname finden', 'produktname entwickeln', 'slogan entwickeln', 'tagline erstellen', 'claim entwickeln']
        },
        benefits: [
          { benefit: 'Einprägsamer, merkbarer Markenname' },
          { benefit: 'Domain- und Markenrechts-Prüfung inklusive' },
          { benefit: 'Internationale Tauglichkeit geprüft' },
          { benefit: 'Multiple Namensvorschläge zur Auswahl' },
        ],
        features: [
          { title: 'Firmenname finden', description: 'Kreative Namensentwicklung für Unternehmen' },
          { title: 'Produktname entwickeln', description: 'Einprägsame Namen für Produkte und Services' },
          { title: 'Slogan & Claim entwickeln', description: 'Taglines die Ihre Marke auf den Punkt bringen' },
          { title: 'Verfügbarkeitsprüfung', description: 'Domain, Social Media und Markenrecht' },
        ],
        useCases: [
          { useCase: 'Neugründung eines Unternehmens' },
          { useCase: 'Produktlaunch und Markteinführung' },
          { useCase: 'Rebranding und Neupositionierung' },
        ],
        duration: '2-4 Wochen',
      },
      {
        title: 'Logo Design',
        slug: 'logo-design',
        description: 'Ihr Logo ist das visuelle Herzstück Ihrer Marke - es muss auf einen Blick vermitteln, wofür Sie stehen. Wir gestalten zeitlose Logos, die Persönlichkeit zeigen und in jeder Größe funktionieren. Ob klassische Wortmarke, prägnante Bildmarke oder flexibles Kombinationslogo: Unser Designprozess stellt sicher, dass Ihr Logo auf Visitenkarten genauso überzeugt wie auf Plakaten. Inklusive aller Dateiformate, Farbvarianten und Anwendungsrichtlinien.',
        icon: 'pencil',
        seo: {
          metaTitle: 'Logo Design Wien | Professionelles Logo erstellen lassen',
          metaDescription: 'Logo Design Agentur Wien. Wortmarke, Bildmarke, Kombinationslogo professionell gestalten. Logo Animation und Favicon inklusive!',
          keywords: ['logo design', 'wortmarke vs bildmarke', 'kombinationslogo design', 'logo responsive design', 'logo animation', 'favicon erstellen']
        },
        benefits: [
          { benefit: 'Einzigartiges, unverwechselbares Logo' },
          { benefit: 'Alle Dateiformate und Variationen inklusive' },
          { benefit: 'Responsive Logo für alle Größen' },
          { benefit: 'Unbegrenzte Revisionen bis zur Zufriedenheit' },
        ],
        features: [
          { title: 'Logo Design Arten', description: 'Wortmarke, Bildmarke, Kombinationslogo, Emblem' },
          { title: 'Logo Variationen erstellen', description: 'Primary, Secondary, Icon, Monochrom' },
          { title: 'Animated Logo erstellen', description: 'Bewegte Logos für digitale Anwendungen' },
          { title: 'Favicon & App Icon Design', description: 'Optimiert für Web und Mobile' },
        ],
        useCases: [
          { useCase: 'Unternehmensgründung' },
          { useCase: 'Logo Redesign / Rebranding' },
          { useCase: 'Submarken und Produktlinien' },
        ],
        deliverables: [
          { deliverable: 'Logo in allen Formaten (AI, EPS, SVG, PNG, JPG)' },
          { deliverable: 'Logo Variationen (Farbe, Monochrom, Negativ)' },
          { deliverable: 'Favicon und App Icons' },
          { deliverable: 'Logo Usage Guidelines' },
        ],
        duration: '2-4 Wochen',
      },
      {
        title: 'Corporate Identity',
        slug: 'corporate-identity',
        description: 'Eine durchdachte Corporate Identity macht Ihr Unternehmen auf allen Kanälen sofort erkennbar. Wir entwickeln Ihr komplettes visuelles Erscheinungsbild - von hochwertigen Visitenkarten über professionelles Briefpapier bis hin zu digitalen Vorlagen für Präsentationen und Social Media. Jedes Element folgt Ihren Brand Guidelines und vermittelt Professionalität. Das Ergebnis: Ein konsistenter Auftritt, der Vertrauen schafft und Ihre Marke stärkt.',
        icon: 'layout',
        seo: {
          metaTitle: 'Corporate Identity Entwicklung Wien | CI Design',
          metaDescription: 'Corporate Identity entwickeln lassen. Visitenkarten, Briefpapier, Geschäftsausstattung Design. Visual Identity Agentur Wien!',
          keywords: ['corporate identity entwicklung', 'visual identity design', 'visitenkarten design', 'briefpapier design', 'geschäftsausstattung design']
        },
        benefits: [
          { benefit: 'Konsistentes Erscheinungsbild auf allen Kanälen' },
          { benefit: 'Professioneller erster Eindruck' },
          { benefit: 'Druckfertige Dateien für alle Materialien' },
          { benefit: 'Wiedererkennungswert bei Kunden und Partnern' },
        ],
        features: [
          { title: 'Geschäftsausstattung Design', description: 'Visitenkarten, Briefpapier, Umschläge' },
          { title: 'Email Signatur Design', description: 'Professionelle digitale Signaturen' },
          { title: 'Social Media Branding', description: 'Templates und Profile Graphics' },
          { title: 'Präsentations-Templates', description: 'PowerPoint und Pitch Deck Design' },
        ],
        useCases: [
          { useCase: 'Neugründungen mit Bedarf an kompletter Ausstattung' },
          { useCase: 'Unternehmen mit uneinheitlichem Erscheinungsbild' },
          { useCase: 'Rebranding bestehender Unternehmen' },
        ],
        deliverables: [
          { deliverable: 'Visitenkarten (druckfertig)' },
          { deliverable: 'Briefpapier und Umschläge' },
          { deliverable: 'Email-Signatur Templates' },
          { deliverable: 'Social Media Templates' },
          { deliverable: 'PowerPoint/Keynote Template' },
        ],
        duration: '3-5 Wochen',
      },
      {
        title: 'Brand Guidelines',
        slug: 'brand-guidelines',
        description: 'Brand Guidelines sind das Regelwerk Ihrer Marke - sie stellen sicher, dass jeder Touchpoint Ihre Markenidentität korrekt repräsentiert. Wir erstellen umfassende Brand Books mit klaren Anweisungen zur Logo-Verwendung, Farbpalette, Typografie, Bildsprache und Tonalität. Ob interne Teams oder externe Agenturen: Mit unseren Styleguides kann jeder Ihre Marke konsistent und professionell kommunizieren.',
        icon: 'file-text',
        seo: {
          metaTitle: 'Brand Guidelines erstellen | Styleguide Wien',
          metaDescription: 'Brand Book und Styleguide erstellen lassen. Design System Entwicklung für konsistente Markenführung. Brand Guidelines Agentur Wien!',
          keywords: ['brand guidelines erstellen', 'styleguide erstellen', 'brand book erstellen', 'design system erstellen', 'brand guidelines beispiele']
        },
        benefits: [
          { benefit: 'Konsistente Markenführung im gesamten Unternehmen' },
          { benefit: 'Klare Regeln für interne und externe Partner' },
          { benefit: 'Zeitersparnis bei der Content-Erstellung' },
          { benefit: 'Professionelle Dokumentation Ihrer Marke' },
        ],
        features: [
          { title: 'Brand Book erstellen', description: 'Umfassende Markendokumentation' },
          { title: 'Styleguide erstellen', description: 'Visuelle Richtlinien und Beispiele' },
          { title: 'Design System erstellen', description: 'Komponenten-Bibliothek für digitale Anwendungen' },
          { title: 'Brand Voice Guide', description: 'Tone of Voice und Messaging Guidelines' },
        ],
        useCases: [
          { useCase: 'Unternehmen mit wachsendem Team' },
          { useCase: 'Marken mit vielen externen Partnern' },
          { useCase: 'Franchise- und Lizenzgeber' },
        ],
        deliverables: [
          { deliverable: 'Brand Guidelines PDF (40-80 Seiten)' },
          { deliverable: 'Logo Usage Guidelines' },
          { deliverable: 'Farb- und Typografie-Dokumentation' },
          { deliverable: 'Design Assets und Templates' },
        ],
        duration: '3-6 Wochen',
      },
    ],
  },
  {
    title: 'Webdesign',
    slug: 'webdesign',
    subtitle: 'Moderne Websites & Online-Shops aus Wien',
    description: 'Webdesign Agentur Wien: Wir gestalten moderne, responsive Websites die konvertieren. Von minimalistischem Webdesign bis zum Premium Website Design - UX/UI, WordPress, WooCommerce und maßgeschneiderte Lösungen.',
    icon: 'globe',
    order: 2,
    features: [
      { title: 'UX/UI Design', description: 'User Experience und Interface Design nach aktuellen Standards' },
      { title: 'Responsive Design', description: 'Perfekte Darstellung auf Desktop, Tablet und Mobile' },
      { title: 'CMS-Integration', description: 'WordPress, Webflow oder Headless CMS' },
      { title: 'Conversion Optimierung', description: 'Landing Pages und CTAs die konvertieren' },
    ],
    process: [
      { step: 'Anforderungsanalyse & Wireframing' },
      { step: 'UX/UI Design & Prototyping' },
      { step: 'Entwicklung & CMS-Setup' },
      { step: 'Content-Integration' },
      { step: 'Testing, SEO & Launch' },
    ],
    subServices: [
      {
        title: 'UX/UI Design',
        slug: 'ux-ui-design',
        description: 'Gutes UX Design macht komplexe Dinge einfach - und sorgt dafür, dass Besucher zu Kunden werden. Unser nutzerzentrierter Designprozess beginnt mit dem Verstehen Ihrer Zielgruppe und endet mit getesteten, optimierten Interfaces. Von User Research über Wireframes und interaktive Prototypen bis zum finalen UI Design: Wir gestalten digitale Erlebnisse, die intuitiv funktionieren und begeistern.',
        icon: 'layout',
        seo: {
          metaTitle: 'UX/UI Design Wien | User Experience Agentur',
          metaDescription: 'UX/UI Design Agentur Wien. User Experience Design, Wireframing, Prototyping. Benutzerfreundliche Websites gestalten!',
          keywords: ['user experience design', 'ux design prozess', 'wireframe erstellen', 'prototyping website', 'user journey mapping']
        },
        benefits: [
          { benefit: 'Höhere Conversion-Rate durch optimierte UX' },
          { benefit: 'Geringere Absprungrate' },
          { benefit: 'Positive Nutzererfahrung und Kundenbindung' },
          { benefit: 'Datenbasierte Design-Entscheidungen' },
        ],
        features: [
          { title: 'User Journey Mapping', description: 'Visualisierung der Kundenreise' },
          { title: 'Wireframe erstellen', description: 'Strukturelle Website-Konzeption' },
          { title: 'Interactive Prototype', description: 'Klickbare Prototypen zum Testen' },
          { title: 'Usability Testing', description: 'Nutzertests und Optimierung' },
        ],
        duration: '2-4 Wochen',
      },
      {
        title: 'WordPress Webdesign',
        slug: 'wordpress-webdesign',
        description: 'WordPress betreibt über 40% aller Websites weltweit - und das aus gutem Grund. Wir entwickeln individuelle WordPress-Websites, die schnell laden, einfach zu pflegen sind und perfekt auf Ihre Bedürfnisse zugeschnitten sind. Keine Templates von der Stange, sondern maßgeschneidertes Design mit Custom Themes. Sie erhalten eine SEO-optimierte Website mit intuitivem Backend, die Sie selbstständig aktualisieren können.',
        icon: 'globe',
        seo: {
          metaTitle: 'WordPress Webdesign Wien | WordPress Agentur',
          metaDescription: 'WordPress Webdesign Agentur Wien. Professionelle WordPress Websites, Custom Themes, Elementor Entwicklung. Jetzt anfragen!',
          keywords: ['wordpress webdesign', 'wordpress vs webflow', 'elementor entwicklung', 'wordpress theme erstellen']
        },
        benefits: [
          { benefit: 'Einfache Content-Pflege ohne Programmierkenntnisse' },
          { benefit: 'SEO-freundliche Struktur' },
          { benefit: 'Tausende Erweiterungen verfügbar' },
          { benefit: 'Bewährtes, sicheres CMS' },
        ],
        features: [
          { title: 'Custom WordPress Theme', description: 'Individuelles Design, kein Template' },
          { title: 'Elementor Entwicklung', description: 'Flexibler Page Builder' },
          { title: 'Plugin-Integration', description: 'Formulare, SEO, Sicherheit' },
          { title: 'Performance-Optimierung', description: 'Core Web Vitals optimiert' },
        ],
        duration: '4-8 Wochen',
      },
      {
        title: 'Elementor Entwicklung',
        slug: 'elementor-entwicklung',
        description: 'Elementor Website Entwicklung: Flexible, schnelle Websites mit dem beliebtesten WordPress Page Builder. Custom Widgets, Theme Builder und Landing Pages.',
        icon: 'code',
        seo: {
          metaTitle: 'Elementor Entwicklung Wien | Page Builder Experten',
          metaDescription: 'Elementor Entwicklung und Webdesign Wien. Custom Widgets, Theme Builder, schnelle Websites. Elementor Agentur!',
          keywords: ['elementor entwicklung', 'elementor webdesign', 'page builder website']
        },
        features: [
          { title: 'Custom Elementor Widgets', description: 'Individuelle Funktionen' },
          { title: 'Theme Builder Nutzung', description: 'Header, Footer, Archive' },
          { title: 'Landing Page Design', description: 'Conversion-optimierte Seiten' },
          { title: 'Template-System', description: 'Wiederverwendbare Layouts' },
        ],
        duration: '3-6 Wochen',
      },
      {
        title: 'Webshops & WooCommerce',
        slug: 'webshops-woocommerce',
        description: 'Ein erfolgreicher Online-Shop braucht mehr als nur schöne Produktbilder. Wir entwickeln WooCommerce-Shops, die verkaufen: mit psychologisch optimierten Produktseiten, einem reibungslosen Checkout-Prozess und allen gängigen Zahlungsarten. Sie behalten die volle Kontrolle über Ihre Daten - ohne monatliche Plattformgebühren wie bei Shopify. Perfekt für Unternehmen, die online wachsen wollen.',
        icon: 'shopping-cart',
        seo: {
          metaTitle: 'WooCommerce Entwicklung Wien | Online Shop erstellen',
          metaDescription: 'WooCommerce Shop erstellen lassen. Webshop Design, Checkout Optimierung, Produktseiten. E-Commerce Agentur Wien!',
          keywords: ['woocommerce entwicklung', 'webshop erstellen', 'checkout prozess optimieren', 'produktseite optimierung', 'shopify vs woocommerce']
        },
        benefits: [
          { benefit: 'Verkaufsstarker Online-Shop' },
          { benefit: 'Optimierter Checkout-Prozess' },
          { benefit: 'Flexible Zahlungsoptionen' },
          { benefit: 'Keine monatlichen Plattformgebühren' },
        ],
        features: [
          { title: 'Produktseite Optimierung', description: 'Conversion-optimierte Produktdarstellung' },
          { title: 'Checkout Optimierung', description: 'Weniger Kaufabbrüche' },
          { title: 'Zahlungsarten Integration', description: 'PayPal, Stripe, Klarna' },
          { title: 'Trust Badges & Social Proof', description: 'Vertrauenssignale' },
        ],
        duration: '6-12 Wochen',
      },
      {
        title: 'Landingpages',
        slug: 'landingpages',
        description: 'Eine Landingpage hat ein Ziel: Besucher zu Kunden machen. Wir entwickeln hochkonvertierende Landingpages mit klarer Nutzerführung, überzeugenden Headlines und starken Call-to-Actions. Jedes Element ist strategisch platziert, um die Conversion-Rate zu maximieren. Von der Squeeze Page für Lead-Generierung bis zur Sales Page für Produktverkäufe - wir wissen, was funktioniert.',
        icon: 'zap',
        seo: {
          metaTitle: 'Landingpage erstellen Wien | Conversion Optimierung',
          metaDescription: 'Landingpages erstellen lassen die konvertieren. Sales Pages, Squeeze Pages, A/B Testing. Landing Page Agentur Wien!',
          keywords: ['landingpage erstellen', 'sales page erstellen', 'conversion rate optimierung', 'squeeze page design', 'a b testing website']
        },
        benefits: [
          { benefit: 'Höhere Conversion-Rate' },
          { benefit: 'Fokussierte Nutzerführung' },
          { benefit: 'Schnelle Ladezeiten' },
          { benefit: 'A/B Testing möglich' },
        ],
        features: [
          { title: 'Conversion Optimierung', description: 'CRO Best Practices' },
          { title: 'CTA Button Gestaltung', description: 'Handlungsaufforderungen die wirken' },
          { title: 'Social Proof Section', description: 'Testimonials und Trust Badges' },
          { title: 'Lead-Formulare', description: 'Optimierte Kontaktformulare' },
        ],
        duration: '1-2 Wochen',
      },
    ],
  },
  {
    title: 'Digitale Strategie',
    slug: 'digitale-strategie',
    subtitle: 'Zielgruppenanalyse & Customer Journey Wien',
    description: 'Digitale Strategie entwickeln: Customer Journey Mapping, Persona erstellen und Conversion Funnels optimieren. Datenbasierte Strategien für mehr Leads und Verkäufe.',
    icon: 'line-chart',
    order: 3,
    features: [
      { title: 'Zielgruppenanalyse', description: 'User Personas und Kundenverständnis entwickeln' },
      { title: 'Customer Journey Mapping', description: 'Alle Touchpoints der Kundenreise visualisieren' },
      { title: 'Funnel-Optimierung', description: 'Conversion Funnels analysieren und verbessern' },
      { title: 'KPI & Analytics', description: 'Messbare Erfolgskriterien definieren' },
    ],
    process: [
      { step: 'Ist-Analyse & Analytics Review' },
      { step: 'Zielgruppen & Persona Definition' },
      { step: 'Customer Journey Mapping' },
      { step: 'Strategie & Maßnahmenplanung' },
      { step: 'Monitoring & Optimierung' },
    ],
    subServices: [
      {
        title: 'Zielgruppenanalyse',
        slug: 'zielgruppenanalyse',
        description: 'Professionelle Zielgruppenanalyse und User Persona erstellen. Wir analysieren Ihre Kunden mit Daten und entwickeln detaillierte Buyer Personas für Ihr Marketing.',
        icon: 'users',
        seo: {
          metaTitle: 'Zielgruppenanalyse Wien | Persona erstellen',
          metaDescription: 'Zielgruppenanalyse und Persona erstellen lassen. User Research, Buyer Personas, Zielgruppe definieren. Strategieberatung Wien!',
          keywords: ['zielgruppenanalyse', 'persona erstellen', 'user persona template', 'zielgruppe definieren branding']
        },
        benefits: [
          { benefit: 'Tiefes Kundenverständnis' },
          { benefit: 'Zielgerichtetes Marketing' },
          { benefit: 'Höhere Conversion-Rates' },
          { benefit: 'Effizientere Werbeausgaben' },
        ],
        features: [
          { title: 'Persona erstellen', description: 'Detaillierte Kundenprofile' },
          { title: 'Datenanalyse', description: 'Analytics und Marktforschung' },
          { title: 'Bedürfnis-Mapping', description: 'Pain Points und Wünsche' },
          { title: 'Segmentierung', description: 'Zielgruppen-Cluster' },
        ],
        duration: '2-3 Wochen',
      },
      {
        title: 'Customer Journey Mapping',
        slug: 'customer-journey-mapping',
        description: 'Customer Journey Website visualisieren: Alle Touchpoints Ihrer Kundenreise erfassen, analysieren und optimieren. Von Awareness bis Loyalty.',
        icon: 'map',
        seo: {
          metaTitle: 'Customer Journey Mapping Wien | Touchpoint Analyse',
          metaDescription: 'Customer Journey Mapping und User Journey Analyse. Touchpoints optimieren, Conversion verbessern. Strategieberatung Wien!',
          keywords: ['customer journey website', 'user journey mapping', 'touchpoint optimierung']
        },
        benefits: [
          { benefit: 'Sichtbarkeit aller Kundenkontaktpunkte' },
          { benefit: 'Optimierungspotenziale erkennen' },
          { benefit: 'Bessere Kundenerfahrung' },
          { benefit: 'Höhere Kundenbindung' },
        ],
        features: [
          { title: 'Journey Mapping', description: 'Visuelle Darstellung der Kundenreise' },
          { title: 'Touchpoint-Analyse', description: 'Bewertung aller Kontaktpunkte' },
          { title: 'Pain Point Identifikation', description: 'Probleme erkennen' },
          { title: 'Opportunity Mapping', description: 'Verbesserungspotenziale' },
        ],
        duration: '2-4 Wochen',
      },
      {
        title: 'Positionierungsberatung',
        slug: 'positionierungsberatung',
        description: 'Strategische Markenpositionierung im Wettbewerbsumfeld. Wir helfen Ihnen, Ihre einzigartige Position zu finden und zu kommunizieren.',
        icon: 'target',
        seo: {
          metaTitle: 'Positionierungsberatung Wien | Markenpositionierung',
          metaDescription: 'Strategische Positionierung und Markenpositionierung entwickeln. Differenzierung vom Wettbewerb. Strategieberatung Wien!',
          keywords: ['markenpositionierung entwickeln', 'wettbewerbsanalyse', 'usp entwickeln']
        },
        features: [
          { title: 'Wettbewerbsanalyse', description: 'Marktumfeld verstehen' },
          { title: 'Positionierungsmatrix', description: 'Einordnung im Markt' },
          { title: 'USP Entwicklung', description: 'Alleinstellungsmerkmale' },
          { title: 'Positionierungsstatement', description: 'Klare Markenaussage' },
        ],
        duration: '2-3 Wochen',
      },
      {
        title: 'Funnel-Strategien',
        slug: 'funnel-strategien',
        description: 'Conversion Funnels analysieren und optimieren. Von der Funnel-Analyse über A/B Testing bis zur Checkout-Optimierung für mehr Leads und Verkäufe.',
        icon: 'trending-up',
        seo: {
          metaTitle: 'Funnel Optimierung Wien | Conversion Strategie',
          metaDescription: 'Conversion Funnel optimieren und mehr Leads generieren. Funnel Analyse, A/B Testing, CRO. Marketing Strategie Wien!',
          keywords: ['conversion rate optimierung', 'funnel analyse website', 'a b testing website', 'checkout optimierung']
        },
        benefits: [
          { benefit: 'Mehr Leads und Conversions' },
          { benefit: 'Optimierte Customer Journey' },
          { benefit: 'Weniger Kaufabbrüche' },
          { benefit: 'Höherer ROI' },
        ],
        features: [
          { title: 'Funnel Analyse', description: 'Schwachstellen identifizieren' },
          { title: 'A/B Testing', description: 'Datenbasierte Optimierung' },
          { title: 'Heatmap Analyse', description: 'Nutzerverhalten verstehen' },
          { title: 'Conversion Tracking', description: 'Erfolge messen' },
        ],
        duration: '3-4 Wochen',
      },
    ],
  },
  {
    title: 'SEO & Sichtbarkeit',
    slug: 'seo-sichtbarkeit',
    subtitle: 'Suchmaschinenoptimierung Wien',
    description: 'SEO Agentur Wien: Technisches SEO, Local SEO und Content-Strategie für mehr organische Sichtbarkeit. Core Web Vitals Optimierung, Schema Markup und nachhaltige SEO-Strategien.',
    icon: 'search',
    order: 4,
    features: [
      { title: 'Technisches SEO', description: 'Crawlability, Indexierung und Core Web Vitals' },
      { title: 'On-Page SEO', description: 'Meta Tags, Heading Struktur und Content-Optimierung' },
      { title: 'Local SEO', description: 'Google My Business und lokale Sichtbarkeit' },
      { title: 'Content-Strategie', description: 'Keyword-basierte Content-Planung' },
    ],
    process: [
      { step: 'SEO Audit & Analyse' },
      { step: 'Keyword-Recherche & Strategie' },
      { step: 'Technische Optimierung' },
      { step: 'On-Page & Content' },
      { step: 'Monitoring & Reporting' },
    ],
    subServices: [
      {
        title: 'Technisches SEO',
        slug: 'technisches-seo',
        description: 'Technisches SEO bildet das Fundament für alle Ihre Ranking-Bemühungen. Ohne saubere technische Basis verpuffen selbst die besten Inhalte. Wir optimieren Ihre Website-Architektur, verbessern Core Web Vitals, implementieren Schema Markup für Rich Snippets und stellen sicher, dass Google Ihre Seiten optimal crawlen und indexieren kann. Das Ergebnis: Schnellere Ladezeiten, bessere Rankings und mehr organischer Traffic.',
        icon: 'code',
        seo: {
          metaTitle: 'Technisches SEO Wien | SEO Audit & Optimierung',
          metaDescription: 'Technisches SEO Audit Wien. Core Web Vitals, Schema Markup, Crawlability optimieren. SEO Agentur für technische Optimierung!',
          keywords: ['technisches seo audit', 'core web vitals optimierung', 'schema markup erstellen', 'xml sitemap erstellen', 'website crawlability']
        },
        benefits: [
          { benefit: 'Bessere Crawlbarkeit für Suchmaschinen' },
          { benefit: 'Schnellere Ladezeiten' },
          { benefit: 'Rich Snippets in Suchergebnissen' },
          { benefit: 'Solide technische Basis für Rankings' },
        ],
        features: [
          { title: 'Technisches SEO Audit', description: 'Umfassende technische Analyse' },
          { title: 'Core Web Vitals Optimierung', description: 'LCP, FID, CLS verbessern' },
          { title: 'Schema Markup erstellen', description: 'Structured Data für Rich Results' },
          { title: 'XML Sitemap & Robots.txt', description: 'Crawling-Steuerung' },
        ],
        useCases: [
          { useCase: 'Websites mit technischen Problemen' },
          { useCase: 'Langsam ladende Websites' },
          { useCase: 'Seiten ohne Rich Snippets' },
        ],
        duration: '2-4 Wochen',
      },
      {
        title: 'Local SEO',
        slug: 'local-seo',
        description: 'Wenn Ihre Kunden "in der Nähe" suchen, müssen Sie gefunden werden. Local SEO bringt Ihr Unternehmen in die Top-Positionen bei lokalen Suchanfragen und Google Maps. Wir optimieren Ihr Google Business Profil, bauen lokale Citations auf und sorgen dafür, dass Sie bei relevanten Suchanfragen in Ihrer Region ganz oben erscheinen. Mehr Anrufe, mehr Laufkundschaft, mehr Umsatz.',
        icon: 'map',
        seo: {
          metaTitle: 'Local SEO Wien | Lokale Suchmaschinenoptimierung',
          metaDescription: 'Local SEO Agentur Wien. Google My Business Optimierung, lokale Keywords, Brancheneinträge. Lokal gefunden werden!',
          keywords: ['local seo', 'google my business optimierung', 'lokale seo strategie', 'lokale sichtbarkeit']
        },
        benefits: [
          { benefit: 'Mehr lokale Kunden' },
          { benefit: 'Top-Platzierung in Google Maps' },
          { benefit: 'Verbesserte lokale Sichtbarkeit' },
          { benefit: 'Mehr Anrufe und Besuche' },
        ],
        features: [
          { title: 'Google My Business Optimierung', description: 'Vollständiges, optimiertes Profil' },
          { title: 'Lokale Keywords', description: 'Stadt- und regionsbezogene Optimierung' },
          { title: 'Brancheneinträge', description: 'Citations und Verzeichnisse' },
          { title: 'Bewertungsmanagement', description: 'Reviews und Reputation' },
        ],
        duration: 'Laufend',
      },
      {
        title: 'SEO Audit',
        slug: 'seo-audit',
        description: 'Bevor Sie SEO-Maßnahmen ergreifen, müssen Sie wissen, wo Sie stehen. Unser umfassender SEO Audit analysiert Ihre Website von allen Seiten: technische Struktur, On-Page-Faktoren, Content-Qualität und Backlink-Profil. Sie erhalten einen priorisierten Maßnahmenplan mit Quick Wins und langfristigen Strategien. Der perfekte Startpunkt für Ihre SEO-Reise.',
        icon: 'search',
        seo: {
          metaTitle: 'SEO Audit Wien | Umfassende SEO Analyse',
          metaDescription: 'SEO Audit und umfassende Website-Analyse. Technisches SEO, On-Page, Content prüfen. SEO Beratung Wien!',
          keywords: ['seo audit', 'website analyse seo', 'seo beratung']
        },
        benefits: [
          { benefit: 'Kompletter Überblick über SEO-Status' },
          { benefit: 'Priorisierte Maßnahmenliste' },
          { benefit: 'Konkrete Handlungsempfehlungen' },
          { benefit: 'Basis für SEO-Strategie' },
        ],
        features: [
          { title: 'Technische Analyse', description: 'Crawling, Indexierung, Speed' },
          { title: 'On-Page Analyse', description: 'Content, Meta Tags, Struktur' },
          { title: 'Off-Page Analyse', description: 'Backlinks, Authority' },
          { title: 'Wettbewerbsvergleich', description: 'Benchmark mit Konkurrenz' },
        ],
        deliverables: [
          { deliverable: 'SEO Audit Report (30-50 Seiten PDF)' },
          { deliverable: 'Priorisierte Maßnahmenliste' },
          { deliverable: 'Quick Wins Empfehlungen' },
          { deliverable: 'Strategie-Präsentation' },
        ],
        duration: '1-2 Wochen',
      },
      {
        title: 'Keywordstrategie',
        slug: 'keywordstrategie',
        description: 'Die richtigen Keywords zu finden ist eine Kunst und Wissenschaft zugleich. Mit professionellen Tools wie SEMRUSH und Ahrefs analysieren wir Suchvolumen, Wettbewerb und Suchintention. Wir identifizieren High-Potential Keywords, die erreichbar sind und echte Kaufabsicht zeigen. Das Ergebnis: Eine Content-Roadmap, die Ihre SEO-Bemühungen für Monate im Voraus plant.',
        icon: 'target',
        seo: {
          metaTitle: 'Keyword Recherche Wien | Keyword Strategie',
          metaDescription: 'Keyword Recherche und SEO Content Strategie. Long Tail Keywords, Suchvolumen Analyse. Keyword Beratung Wien!',
          keywords: ['keyword recherche', 'keywordstrategie', 'long tail keywords', 'seo content strategie']
        },
        benefits: [
          { benefit: 'Relevante Keywords mit Suchvolumen' },
          { benefit: 'Keywords mit Kaufabsicht' },
          { benefit: 'Content-Roadmap für 6-12 Monate' },
          { benefit: 'Wettbewerbsvorteile durch Nischen-Keywords' },
        ],
        features: [
          { title: 'Keyword-Recherche', description: 'Umfassende Keyword-Analyse' },
          { title: 'Suchvolumen-Analyse', description: 'Daten aus SEMRUSH, Ahrefs' },
          { title: 'Intent-Analyse', description: 'Informational vs Commercial' },
          { title: 'Topic Cluster Strategie', description: 'Themencluster für Content' },
        ],
        duration: '1-2 Wochen',
      },
    ],
  },
  {
    title: 'Content & Visuals',
    slug: 'content-visuals',
    subtitle: 'Content Marketing & Visuelle Inhalte Wien',
    description: 'Content Marketing Agentur Wien: Copywriting, Website Animationen, Video-Content und Fotografie. Wir erstellen Inhalte, die Ihre Zielgruppe begeistern und konvertieren.',
    icon: 'camera',
    order: 5,
    features: [
      { title: 'Copywriting', description: 'SEO-optimierte Texte die verkaufen' },
      { title: 'Website Animationen', description: 'Scroll Animations, Micro Interactions' },
      { title: 'Video-Content', description: 'Reels, Erklärvideos, Produktvideos' },
      { title: 'Business-Fotografie', description: 'Professionelle Bildwelten' },
    ],
    process: [
      { step: 'Content-Strategie & Briefing' },
      { step: 'Konzeption & Storyboard' },
      { step: 'Produktion & Erstellung' },
      { step: 'Post-Production & Optimierung' },
      { step: 'Distribution & Analyse' },
    ],
    subServices: [
      {
        title: 'Copywriting',
        slug: 'copywriting',
        description: 'Worte haben Macht - die richtigen Texte können den Unterschied zwischen einem Klick und einer Conversion ausmachen. Wir schreiben Website-Texte, die bei Google ranken und Besucher überzeugen. Von SEO-optimierten Blogartikeln über emotionale Sales Copy bis hin zu präzisem UX Writing: Jeder Text ist strategisch durchdacht und auf Ihre Zielgruppe zugeschnitten.',
        icon: 'pencil',
        seo: {
          metaTitle: 'Copywriting Wien | SEO Texte schreiben lassen',
          metaDescription: 'Copywriting Agentur Wien. SEO Texte, Website Texte, Sales Copy professionell schreiben lassen. Content Writing!',
          keywords: ['copywriting', 'seo texte schreiben', 'website texte', 'ux writing']
        },
        benefits: [
          { benefit: 'Texte die bei Google ranken' },
          { benefit: 'Höhere Conversion-Rate' },
          { benefit: 'Konsistente Markensprache' },
          { benefit: 'Professionelle Kommunikation' },
        ],
        features: [
          { title: 'Website-Texte', description: 'Alle Seiten Ihrer Website' },
          { title: 'SEO Content', description: 'Keyword-optimierte Blogartikel' },
          { title: 'Sales Copy', description: 'Verkaufstexte für Landing Pages' },
          { title: 'UX Writing', description: 'Mikrotexte und CTAs' },
        ],
        duration: '1-2 Wochen',
      },
      {
        title: 'Content-Planung',
        slug: 'content-planung',
        description: 'Strategische Content-Planung und Redaktionskalender. Wir entwickeln Ihre Content-Strategie für Blog, Social Media und Newsletter.',
        icon: 'file-text',
        seo: {
          metaTitle: 'Content Planung Wien | Redaktionskalender erstellen',
          metaDescription: 'Content Strategie und Redaktionskalender erstellen. Blog-Planung, Social Media Content. Content Marketing Wien!',
          keywords: ['content planung', 'redaktionskalender', 'content strategie', 'blog planung']
        },
        features: [
          { title: 'Content-Strategie', description: 'Ziele und Zielgruppen' },
          { title: 'Redaktionskalender', description: '3-12 Monate Planung' },
          { title: 'Topic Cluster', description: 'Themencluster für SEO' },
          { title: 'Content-Formate', description: 'Blog, Video, Social' },
        ],
        duration: '2-3 Wochen',
      },
      {
        title: 'Reels & Social Video',
        slug: 'reels-social-video',
        description: 'Social Media Video-Content: Instagram Reels, TikTok Videos und YouTube Shorts. Kurze, packende Videos die viral gehen können.',
        icon: 'video',
        seo: {
          metaTitle: 'Reels Produktion Wien | Social Media Videos',
          metaDescription: 'Instagram Reels und TikTok Videos produzieren lassen. Social Media Video Content. Video Agentur Wien!',
          keywords: ['reels produktion', 'social media video', 'tiktok video', 'video content']
        },
        features: [
          { title: 'Instagram Reels', description: 'Trending Formate' },
          { title: 'TikTok Videos', description: 'Plattform-optimiert' },
          { title: 'YouTube Shorts', description: 'Kurz-Content' },
          { title: 'Motion Graphics', description: 'Animierte Elemente' },
        ],
        duration: '1-2 Wochen',
      },
      {
        title: 'Business-Fotografie',
        slug: 'business-fotografie',
        description: 'Professionelle Business-Fotografie Wien: Teamfotos, Produkt-Shootings und Unternehmensfotos. Authentische Bilder für Ihre Marke.',
        icon: 'camera',
        seo: {
          metaTitle: 'Business Fotografie Wien | Unternehmensfotos',
          metaDescription: 'Business Fotografie und Teamfotos Wien. Professionelle Unternehmensfotos, Produktfotografie. Fotograf buchen!',
          keywords: ['business fotografie', 'teamfotos', 'produktfotografie', 'unternehmensfotos']
        },
        features: [
          { title: 'Teamfotos', description: 'Professionelle Mitarbeiterfotos' },
          { title: 'Produktfotografie', description: 'Produkte in Szene setzen' },
          { title: 'Unternehmensfotos', description: 'Büro, Produktion, Events' },
          { title: 'Bildbearbeitung', description: 'Professionelles Retouching' },
        ],
        duration: '1-2 Tage',
      },
    ],
  },
  {
    title: 'Technische Lösungen',
    slug: 'technische-loesungen',
    subtitle: 'Automatisierung & Integration Wien',
    description: 'Technische Lösungen für Ihr Business: Website Performance Optimierung, API-Integration, Workflow-Automatisierung und Custom Development. Wir verbinden Ihre Systeme.',
    icon: 'zap',
    order: 6,
    features: [
      { title: 'Workflow-Automatisierung', description: 'Zapier, Make und Custom Automations' },
      { title: 'API-Integration', description: 'Systeme und Tools verbinden' },
      { title: 'Performance Optimierung', description: 'Core Web Vitals und Ladezeiten' },
      { title: 'Custom Development', description: 'Individuelle technische Lösungen' },
    ],
    process: [
      { step: 'Anforderungsanalyse & Konzept' },
      { step: 'Technische Spezifikation' },
      { step: 'Entwicklung & Integration' },
      { step: 'Testing & QA' },
      { step: 'Deployment & Support' },
    ],
    subServices: [
      {
        title: 'Formular-Logiken',
        slug: 'formular-logiken',
        description: 'Intelligente Formulare mit bedingter Logik, mehrstufigen Prozessen und Validierung. Kontaktformular Design und Multi Step Form Design.',
        icon: 'workflow',
        seo: {
          metaTitle: 'Formular Entwicklung Wien | Intelligente Formulare',
          metaDescription: 'Formular Entwicklung mit bedingter Logik. Multi Step Forms, Validierung, CRM Integration. Formular Agentur Wien!',
          keywords: ['kontaktformular design', 'multi step form design', 'formular gestaltung website']
        },
        features: [
          { title: 'Bedingte Logik', description: 'Dynamische Formularfelder' },
          { title: 'Multi Step Forms', description: 'Mehrstufige Formulare' },
          { title: 'Validierung', description: 'Inline Validation und Fehlerhandling' },
          { title: 'CRM Integration', description: 'Automatische Datenübertragung' },
        ],
        duration: '1-2 Wochen',
      },
      {
        title: 'Gated Content',
        slug: 'gated-content',
        description: 'Gated Content für Lead-Generierung: Geschützte Downloads, Whitepaper, Webinar-Anmeldungen mit automatisierter E-Mail-Sequenz.',
        icon: 'lock',
        seo: {
          metaTitle: 'Gated Content Wien | Lead Generierung',
          metaDescription: 'Gated Content und Lead Magnets erstellen. Geschützte Downloads, automatisierte Emails. Lead Gen Agentur Wien!',
          keywords: ['gated content', 'lead generierung', 'lead magnets', 'email automation']
        },
        features: [
          { title: 'Content Protection', description: 'Passwort oder Email-Gate' },
          { title: 'Lead Capture', description: 'Formulare und Landing Pages' },
          { title: 'Email Automation', description: 'Automatische Follow-ups' },
          { title: 'Analytics', description: 'Download und Conversion Tracking' },
        ],
        duration: '1-2 Wochen',
      },
      {
        title: 'Automatisierung',
        slug: 'automatisierung',
        description: 'Zeit ist Ihre wertvollste Ressource. Wir automatisieren wiederkehrende Aufgaben und verbinden Ihre Tools zu nahtlosen Workflows. Mit Zapier, Make oder n8n erstellen wir Automatisierungen, die im Hintergrund arbeiten - während Sie sich auf Ihr Kerngeschäft konzentrieren. Von einfachen Benachrichtigungen bis zu komplexen Multi-Step-Workflows: Wir machen Ihr Business effizienter.',
        icon: 'zap',
        seo: {
          metaTitle: 'Workflow Automatisierung Wien | Zapier & Make',
          metaDescription: 'Workflow Automatisierung mit Zapier, Make, n8n. Prozesse automatisieren, Tools verbinden. Automation Agentur Wien!',
          keywords: ['workflow automatisierung', 'zapier integration', 'make integration', 'prozesse automatisieren']
        },
        benefits: [
          { benefit: 'Zeitersparnis bei wiederkehrenden Aufgaben' },
          { benefit: 'Weniger manuelle Fehler' },
          { benefit: 'Nahtlose Tool-Integration' },
          { benefit: 'Skalierbare Prozesse' },
        ],
        features: [
          { title: 'Zapier Workflows', description: 'No-Code Automatisierung' },
          { title: 'Make Scenarios', description: 'Komplexe Automatisierungen' },
          { title: 'n8n Self-hosted', description: 'Eigene Infrastruktur' },
          { title: 'Custom Scripts', description: 'Maßgeschneiderte Lösungen' },
        ],
        duration: '1-3 Wochen',
      },
      {
        title: 'API-Integration',
        slug: 'api-integration',
        description: 'API-Integration und Custom Development: Wir verbinden Ihre Systeme - CRM, ERP, Payment, Shipping und mehr. REST APIs und Webhooks.',
        icon: 'code',
        seo: {
          metaTitle: 'API Integration Wien | System Integration',
          metaDescription: 'API Integration und System-Verbindung. CRM, ERP, Payment Integration. Entwickler Agentur Wien!',
          keywords: ['api integration', 'system integration', 'crm integration', 'custom development']
        },
        features: [
          { title: 'REST API Integration', description: 'Standard API Anbindungen' },
          { title: 'Webhook Setup', description: 'Event-basierte Kommunikation' },
          { title: 'Custom Middleware', description: 'Individuelle Schnittstellen' },
          { title: 'Data Sync', description: 'Automatische Datensynchronisation' },
        ],
        duration: '2-6 Wochen',
      },
    ],
  },
  {
    title: 'Software-Entwicklung',
    slug: 'software-entwicklung',
    subtitle: 'Web Apps, Mobile Apps & Cloud - FiveSysDev',
    description: 'Software-Entwicklung Wien: Next.js Website Entwicklung, React Apps, Mobile App Entwicklung und Cloud DevOps. Maßgeschneiderte Enterprise Solutions mit modernen Technologien.',
    icon: 'code',
    order: 7,
    features: [
      { title: 'Web Applications', description: 'Next.js, React, Vue.js - skalierbare Web-Apps' },
      { title: 'Mobile Apps', description: 'React Native, Flutter - iOS & Android' },
      { title: 'Cloud & DevOps', description: 'Vercel, AWS, Azure - moderne Infrastruktur' },
      { title: 'Headless CMS', description: 'Payload, Contentful, Strapi - flexible Content-Systeme' },
    ],
    process: [
      { step: 'Discovery & Requirements' },
      { step: 'Architecture & Design' },
      { step: 'Agile Development (Sprints)' },
      { step: 'QA & Testing' },
      { step: 'Deployment & Maintenance' },
    ],
    subServices: [
      {
        title: 'Cloud & DevOps',
        slug: 'cloud-devops',
        description: 'Cloud-Infrastruktur und DevOps: Vercel Hosting, Netlify, AWS und CI/CD Pipelines. Moderne Cloud-Lösungen für skalierbare Anwendungen.',
        icon: 'cloud',
        seo: {
          metaTitle: 'Cloud & DevOps Wien | Vercel, AWS Hosting',
          metaDescription: 'Cloud Hosting und DevOps Wien. Vercel, Netlify, AWS Deployment. CI/CD Pipelines, Infrastructure as Code. Cloud Agentur!',
          keywords: ['vercel hosting', 'netlify hosting', 'cloud devops', 'ci cd pipeline']
        },
        features: [
          { title: 'Vercel Deployment', description: 'Next.js optimiertes Hosting' },
          { title: 'Netlify Hosting', description: 'JAMstack Deployment' },
          { title: 'CI/CD Pipelines', description: 'Automatisierte Deployments' },
          { title: 'Infrastructure as Code', description: 'Terraform, Pulumi' },
        ],
        duration: '2-8 Wochen',
      },
      {
        title: 'Mobile Apps',
        slug: 'mobile-apps',
        description: 'Eine App für iOS und Android zu entwickeln muss nicht doppelte Kosten bedeuten. Mit React Native und Flutter entwickeln wir Cross-Platform Apps, die auf beiden Systemen nativ laufen - mit einer einzigen Codebase. Sie sparen Entwicklungszeit und Wartungskosten, ohne Kompromisse bei Performance oder User Experience einzugehen. Von Push Notifications bis Offline-Support: Alles ist möglich.',
        icon: 'smartphone',
        seo: {
          metaTitle: 'Mobile App Entwicklung Wien | iOS & Android',
          metaDescription: 'Mobile App Entwicklung Wien. React Native, Flutter Apps für iOS und Android. App Agentur!',
          keywords: ['mobile app entwicklung', 'react native app', 'flutter app', 'ios android app']
        },
        benefits: [
          { benefit: 'Eine Codebase für iOS und Android' },
          { benefit: 'Native Performance' },
          { benefit: 'Schnellere Entwicklung' },
          { benefit: 'Kostengünstiger als native Entwicklung' },
        ],
        features: [
          { title: 'React Native Apps', description: 'JavaScript-basierte Apps' },
          { title: 'Flutter Apps', description: 'Dart-basierte Apps' },
          { title: 'Push Notifications', description: 'Engagement Features' },
          { title: 'Offline Support', description: 'Funktioniert ohne Internet' },
        ],
        duration: '3-6 Monate',
      },
      {
        title: 'Web Applications',
        slug: 'web-applications',
        description: 'Moderne Web Applications sind schnell, skalierbar und bieten ein natives App-Feeling im Browser. Wir entwickeln mit Next.js, React und Vue.js - Technologien, die von Unternehmen wie Netflix, Airbnb und GitHub eingesetzt werden. Von komplexen SaaS-Produkten bis zu internen Enterprise-Tools: Wir bauen Web Apps, die Ihre Geschäftsprozesse digitalisieren und vereinfachen.',
        icon: 'globe',
        seo: {
          metaTitle: 'Web App Entwicklung Wien | Next.js, React',
          metaDescription: 'Web Application Entwicklung Wien. Next.js, React, Vue.js Apps. SaaS Entwicklung, Enterprise Software!',
          keywords: ['next.js website entwicklung', 'react website entwicklung', 'vue.js website', 'saas website design', 'web application']
        },
        features: [
          { title: 'Next.js Apps', description: 'Server-side Rendering, SEO-optimiert' },
          { title: 'React Applications', description: 'Komplexe User Interfaces' },
          { title: 'Vue.js/Nuxt.js', description: 'Progressive Web Apps' },
          { title: 'Headless CMS Integration', description: 'Payload, Contentful' },
        ],
        duration: '2-4 Monate',
      },
      {
        title: 'Desktop Software',
        slug: 'desktop-software',
        description: 'Desktop-Anwendungen mit Electron und Tauri. Cross-Platform Desktop Apps für Windows, Mac und Linux.',
        icon: 'monitor',
        seo: {
          metaTitle: 'Desktop Software Entwicklung Wien | Electron',
          metaDescription: 'Desktop Software Entwicklung. Electron, Tauri Apps für Windows, Mac, Linux. Software Agentur Wien!',
          keywords: ['desktop software entwicklung', 'electron app', 'cross platform desktop']
        },
        features: [
          { title: 'Electron Apps', description: 'Web-Technologien für Desktop' },
          { title: 'Tauri Apps', description: 'Leichtgewichtige Alternative' },
          { title: 'Auto-Updates', description: 'Automatische Aktualisierung' },
          { title: 'System Integration', description: 'Native OS Features' },
        ],
        duration: '2-4 Monate',
      },
      {
        title: 'UI/UX für Software',
        slug: 'ui-ux-software',
        description: 'UI/UX Design für komplexe Software-Anwendungen. Benutzerfreundliche Interfaces für Enterprise Tools, Dashboards und Data-heavy Applications.',
        icon: 'layout',
        seo: {
          metaTitle: 'Software UI/UX Design Wien | Application Design',
          metaDescription: 'UI/UX Design für Software und Enterprise Anwendungen. Dashboard Design, Complex Applications. UX Agentur Wien!',
          keywords: ['software ui design', 'enterprise ux', 'dashboard design', 'application design']
        },
        features: [
          { title: 'Dashboard Design', description: 'Daten übersichtlich darstellen' },
          { title: 'Complex Forms', description: 'Benutzerfreundliche Eingabemasken' },
          { title: 'Data Visualization', description: 'Charts und Grafiken' },
          { title: 'Design System', description: 'Konsistente UI Components' },
        ],
        duration: '3-8 Wochen',
      },
      {
        title: 'QA & Testing',
        slug: 'qa-testing',
        description: 'Qualitätssicherung und Testing: Unit Tests, E2E Tests, Performance Testing und Code Reviews. Fehlerfreie Software durch systematisches Testen.',
        icon: 'search',
        seo: {
          metaTitle: 'QA & Testing Wien | Software Testing',
          metaDescription: 'QA und Software Testing Wien. Unit Tests, E2E Testing, Performance Tests. Quality Assurance Agentur!',
          keywords: ['qa testing', 'software testing', 'unit tests', 'e2e testing']
        },
        features: [
          { title: 'Unit Testing', description: 'Komponenten-Tests' },
          { title: 'E2E Testing', description: 'End-to-End Tests mit Playwright' },
          { title: 'Performance Testing', description: 'Load und Stress Tests' },
          { title: 'Code Review', description: 'Qualitätsprüfung des Codes' },
        ],
        duration: '1-4 Wochen',
      },
    ],
  },
]

async function seed() {
  console.log('Starting SEO-optimized seed...')
  console.log('⚠️  HINWEIS: Existierende Einträge werden AKTUALISIERT, nicht gelöscht!')
  console.log('   → Bilder und CMS-Änderungen bleiben erhalten.\n')

  const payload = await getPayload({ config })

  // Find existing services and sub-services (DO NOT DELETE!)
  console.log('Finding existing services...')
  const existingServices = await payload.find({ collection: 'services', limit: 100 })
  const existingServicesBySlug = new Map(
    existingServices.docs.map((doc) => [doc.slug, doc])
  )

  console.log('Finding existing sub-services...')
  const existingSubServices = await payload.find({ collection: 'sub-services', limit: 200 })
  const existingSubServicesBySlug = new Map(
    existingSubServices.docs.map((doc) => [doc.slug, doc])
  )

  // Create or update services and sub-services
  for (const serviceData of servicesData) {
    const { subServices, ...serviceFields } = serviceData
    const existingService = existingServicesBySlug.get(serviceData.slug)

    let service: { id: string | number }

    if (existingService) {
      // UPDATE existing service - preserve images!
      await payload.update({
        collection: 'services',
        id: existingService.id,
        data: {
          ...serviceFields,
          // Behalte existierende Bilder bei
          icon_image: existingService.icon_image,
          featured_image: existingService.featured_image,
        },
      })
      service = existingService
      console.log(`🔄 Updated service: ${serviceData.title}`)
    } else {
      // CREATE new service
      service = await payload.create({
        collection: 'services',
        data: serviceFields,
      })
      console.log(`✅ Created service: ${serviceData.title}`)
    }

    // Create or update sub-services
    for (let i = 0; i < subServices.length; i++) {
      const subService = subServices[i] as any
      const existingSubService = existingSubServicesBySlug.get(subService.slug)

      const subServiceData = {
        title: subService.title,
        slug: subService.slug,
        description: subService.description,
        icon: subService.icon,
        parentService: service.id,
        order: i + 1,
        seo: subService.seo,
        features: subService.features || [
          { title: 'Professionelle Umsetzung', description: 'Erfahrene Spezialisten' },
          { title: 'Individuelle Beratung', description: 'Maßgeschneidert auf Ihre Bedürfnisse' },
        ],
        benefits: subService.benefits || [
          { benefit: 'Schnelle Ergebnisse' },
          { benefit: 'Transparente Kommunikation' },
          { benefit: 'Langfristige Partnerschaft' },
        ],
        process: subService.process,
        useCases: subService.useCases,
        deliverables: subService.deliverables,
        pricing: subService.pricing,
        duration: subService.duration,
      }

      if (existingSubService) {
        // UPDATE existing - preserve images!
        await payload.update({
          collection: 'sub-services',
          id: existingSubService.id,
          data: {
            ...subServiceData,
            // Behalte existierende Bilder bei
            icon_image: existingSubService.icon_image,
            featured_image: existingSubService.featured_image,
          },
        })
        console.log(`  🔄 Updated: ${subService.title}`)
      } else {
        // CREATE new
        await payload.create({
          collection: 'sub-services',
          data: subServiceData,
        })
        console.log(`  ✅ Created: ${subService.title}`)
      }
    }
  }

  console.log('\n✨ SEO-optimized seed completed!')
  console.log('💡 Tipp: Bilder über /admin hochladen.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed error:', error)
  process.exit(1)
})
