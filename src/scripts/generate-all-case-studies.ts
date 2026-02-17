/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generate Case Studies for all Projects
 * Run with: npx tsx src/scripts/generate-all-case-studies.ts
 */

import Database from 'better-sqlite3'
import path from 'path'

// Types
interface ProjectData {
  id: number
  slug: string
  client: string
  category: string
  year: number
  title: string
  description: string
  challenge: string
  solution: string
  company_description: string
  kpis: { metric: string; label: string }[]
  solutionPoints: { title: string; description: string }[]
}

// Markdown to Lexical converter
function markdownToLexical(markdown: string) {
  const lines = markdown.split('\n')
  const children: any[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!line.trim()) {
      i++
      continue
    }

    if (line.startsWith('## ')) {
      children.push({
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: line.substring(3).trim(), detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      i++
      continue
    }

    if (line.startsWith('### ')) {
      children.push({
        type: 'heading',
        tag: 'h3',
        children: [{ type: 'text', text: line.substring(4).trim(), detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      i++
      continue
    }

    if (line.startsWith('- ')) {
      const listItems: any[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        const itemText = lines[i].substring(2).trim()
        const formattedChildren = parseInlineFormatting(itemText)
        listItems.push({
          type: 'listitem',
          children: formattedChildren,
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          value: listItems.length + 1,
        })
        i++
      }
      children.push({
        type: 'list',
        listType: 'bullet',
        children: listItems,
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        start: 1,
        tag: 'ul',
      })
      continue
    }

    let paragraphText = line.trim()
    i++
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('- ')) {
      paragraphText += ' ' + lines[i].trim()
      i++
    }

    if (paragraphText) {
      const formattedChildren = parseInlineFormatting(paragraphText)
      children.push({
        type: 'paragraph',
        children: formattedChildren,
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        textFormat: 0,
      })
    }
  }

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function parseInlineFormatting(text: string): any[] {
  const children: any[] = []
  let remaining = text

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/)
    if (boldMatch) {
      children.push({
        type: 'text',
        text: boldMatch[1],
        detail: 0,
        format: 1,
        mode: 'normal',
        style: '',
        version: 1,
      })
      remaining = remaining.substring(boldMatch[0].length)
      continue
    }

    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      children.push({
        type: 'link',
        children: [{ type: 'text', text: linkMatch[1], detail: 0, format: 0, mode: 'normal', style: '', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 2,
        fields: {
          url: linkMatch[2],
          newTab: !linkMatch[2].startsWith('/'),
          linkType: linkMatch[2].startsWith('/') ? 'internal' : 'custom',
        },
      })
      remaining = remaining.substring(linkMatch[0].length)
      continue
    }

    const nextBold = remaining.indexOf('**')
    const nextLink = remaining.indexOf('[')
    let nextSpecial = remaining.length

    if (nextBold !== -1 && nextBold < nextSpecial) nextSpecial = nextBold
    if (nextLink !== -1 && nextLink < nextSpecial) nextSpecial = nextLink

    if (nextSpecial > 0) {
      children.push({
        type: 'text',
        text: remaining.substring(0, nextSpecial),
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        version: 1,
      })
      remaining = remaining.substring(nextSpecial)
    } else {
      children.push({
        type: 'text',
        text: remaining.charAt(0),
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        version: 1,
      })
      remaining = remaining.substring(1)
    }
  }

  return children.length > 0 ? children : [{ type: 'text', text: '', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }]
}

// Case Study Content Generators for each project
const caseStudies: Record<string, { de: string; en: string }> = {
  // ID 2: Atta Pallet
  'atta-pallet': {
    de: `## Projektübersicht

Atta Paper Pallet, ein ungarisches Clean-Tech-Startup, revolutioniert die Logistikbranche mit vollständig recycelbaren Papierpaletten. GoldenWing entwickelte eine globale Digital-First-Strategie, die das Startup mit Fortune-500-Unternehmen wie BMW, AWS und IKEA vernetzte. Das Ergebnis: +120% digitale Anfragen und 15+ koordinierte Pilotprojekte.

## Ausgangslage

### Was hat gebremst?

- Nachhaltigkeit als USP wurde nicht effektiv digital kommuniziert
- Kein strukturierter Ansatz zur Ansprache von B2B-Entscheidern bei Großkonzernen
- Website war nicht auf internationale Lead-Generierung ausgerichtet
- Fehlende Prozesse für virtuelle Factory Tours und B2B-Meetings
- Messestrategie ohne digitales Follow-up-System

### Warum war das kritisch?

Als innovatives Startup mit einem disruptiven Produkt brauchte Atta Pallet schnell Zugang zu den richtigen Entscheidern bei Großkonzernen. Ohne strukturierte digitale Kanäle blieb das Unternehmen auf zufällige Messecontakte angewiesen – nicht skalierbar für globale Expansion.

## Ziele & KPIs

- Vernetzung mit Fortune-500-Unternehmen aufbauen
- Internationale Pilotprojekte koordinieren
- Nachhaltigkeitsbotschaft digital verstärken
- B2B-Lead-Pipeline systematisieren

## Unser Vorgehen

### Global Lead Generation

- Gezielte Outreach-Kampagnen an Sustainability-Manager bei Großkonzernen
- LinkedIn Sales Navigator für Account-Based Marketing
- Content-Marketing rund um Nachhaltigkeit und CO2-Reduktion

### Website & Conversion

- Integration von B2B-Registrierungsformularen für Samples und Pilotprojekte
- Landing-Pages für verschiedene Industrien (Automotive, Retail, Logistics)
- Case Studies und ROI-Kalkulatoren für Entscheider

### B2B Meeting Management

- Organisation und Moderation virtueller Factory Tours
- Koordination von B2B-Calls mit internationalen Leads
- Nachbereitung und Follow-up-Prozesse

## Umsetzung im Detail

### Messe- und Event-Strategie

Professionelles Einladungsmanagement für internationale Messen, Follow-up-Kampagnen nach Events und Lead-Tracking vom ersten Kontakt bis zum Pilotprojekt. Ergebnis: Strukturierte Pipeline mit messbarem ROI.

### Pilotprojekt-Koordination

Begleitung der Test-Implementierungen bei BMW, IKEA und weiteren Großkunden – von der initialen Anfrage über Musterlieferungen bis zur Evaluation. Ergebnis: 15+ erfolgreiche Pilotprojekte.

### Content & SEO

SEO-optimierte Inhalte zur Nachhaltigkeitskommunikation, Thought-Leadership-Artikel und PR-Unterstützung. Ergebnis: Signifikante Steigerung der organischen Sichtbarkeit in Zielmärkten.

## Deliverables

- B2B-optimierte Website mit Industrie-Landing-Pages
- Global Lead Generation Kampagnen
- 15+ koordinierte Pilotprojekte mit Großkonzernen
- Virtuelles Factory Tour System
- Messe-Follow-up-Prozesse
- SEO-Content-Paket für Nachhaltigkeitsthemen
- B2B-Meeting-Koordination und Moderation
- CRM-Integration für Lead-Tracking

## Was hat am stärksten gewirkt?

Die direkte Koordination von B2B-Meetings und virtuellen Factory Tours war der entscheidende Hebel. Statt nur Leads zu generieren, übernahm GoldenWing die komplette Sales-Unterstützung bis zum Pilotprojekt – das beschleunigte den Verkaufszyklus erheblich.

Die Kombination aus Nachhaltigkeits-Content und gezielter Ansprache von Sustainability-Managern öffnete Türen zu Unternehmen, die über traditionelle Kanäle nicht erreichbar gewesen wären.

## Key Learnings

- **Wenn** ein Clean-Tech-Startup Fortune-500-Kunden erreichen will, **dann** braucht es strukturierte digitale Prozesse, **weil** Großkonzerne standardisierte Evaluation-Workflows haben.
- **Wenn** virtuelle Factory Tours professionell moderiert werden, **dann** steigt die Conversion zu Pilotprojekten, **weil** Entscheider das Produkt erleben ohne zu reisen.
- **Wenn** Nachhaltigkeits-USPs klar quantifiziert werden, **dann** überzeugt man Procurement-Abteilungen, **weil** CO2-Einsparungen in ESG-Reports fließen.

## Nächste Schritte

- Skalierung der Pilotprojekte zu Rahmenverträgen
- Expansion in weitere europäische Märkte
- Automatisierung der Lead-Nurturing-Prozesse
- Entwicklung von Self-Service-ROI-Tools für Website-Besucher`,

    en: `## Project Overview

Atta Paper Pallet, a Hungarian clean-tech startup, is revolutionizing the logistics industry with fully recyclable paper pallets. GoldenWing developed a global digital-first strategy that connected the startup with Fortune 500 companies like BMW, AWS, and IKEA. The result: +120% digital inquiries and 15+ coordinated pilot projects.

## Starting Point

### What Was Holding Them Back?

- Sustainability as USP was not effectively communicated digitally
- No structured approach to reaching B2B decision-makers at large corporations
- Website was not geared toward international lead generation
- Missing processes for virtual factory tours and B2B meetings
- Trade show strategy without digital follow-up system

### Why Was This Critical?

As an innovative startup with a disruptive product, Atta Pallet needed quick access to the right decision-makers at large corporations. Without structured digital channels, the company relied on random trade show contacts – not scalable for global expansion.

## Goals & KPIs

- Build connections with Fortune 500 companies
- Coordinate international pilot projects
- Amplify sustainability message digitally
- Systematize B2B lead pipeline

## Our Approach

### Global Lead Generation

- Targeted outreach campaigns to sustainability managers at large corporations
- LinkedIn Sales Navigator for Account-Based Marketing
- Content marketing around sustainability and CO2 reduction

### Website & Conversion

- Integration of B2B registration forms for samples and pilot projects
- Landing pages for various industries (Automotive, Retail, Logistics)
- Case studies and ROI calculators for decision-makers

### B2B Meeting Management

- Organization and moderation of virtual factory tours
- Coordination of B2B calls with international leads
- Follow-up processes and nurturing

## Implementation Details

### Trade Show & Event Strategy

Professional invitation management for international trade shows, follow-up campaigns after events, and lead tracking from first contact to pilot project. Result: Structured pipeline with measurable ROI.

### Pilot Project Coordination

Support for test implementations at BMW, IKEA, and other major customers – from initial inquiry through sample delivery to evaluation. Result: 15+ successful pilot projects.

### Content & SEO

SEO-optimized content for sustainability communication, thought leadership articles, and PR support. Result: Significant increase in organic visibility in target markets.

## Deliverables

- B2B-optimized website with industry landing pages
- Global lead generation campaigns
- 15+ coordinated pilot projects with major corporations
- Virtual factory tour system
- Trade show follow-up processes
- SEO content package for sustainability topics
- B2B meeting coordination and moderation
- CRM integration for lead tracking

## What Had the Biggest Impact?

Direct coordination of B2B meetings and virtual factory tours was the decisive lever. Instead of just generating leads, GoldenWing took over complete sales support through to the pilot project – this significantly accelerated the sales cycle.

The combination of sustainability content and targeted outreach to sustainability managers opened doors to companies that would not have been reachable through traditional channels.

## Key Learnings

- **If** a clean-tech startup wants to reach Fortune 500 customers, **then** it needs structured digital processes, **because** large corporations have standardized evaluation workflows.
- **If** virtual factory tours are professionally moderated, **then** conversion to pilot projects increases, **because** decision-makers experience the product without traveling.
- **If** sustainability USPs are clearly quantified, **then** procurement departments are convinced, **because** CO2 savings flow into ESG reports.

## Next Steps

- Scale pilot projects into framework agreements
- Expansion into additional European markets
- Automation of lead nurturing processes
- Development of self-service ROI tools for website visitors`
  },

  // ID 3: Point of New
  'point-of-new': {
    de: `## Projektübersicht

Point of New, eine spezialisierte Innovationsberatung für Geschäftsmodell-Innovation, brauchte eine digitale Präsenz, die ihre Expertise überzeugend kommuniziert. GoldenWing lieferte ein komplettes Rebranding mit Website-Relaunch und LinkedIn-Kampagnen. Das Ergebnis: +85% LinkedIn-Lead-Performance und eine klare Positionierung im Beratungsmarkt.

## Ausgangslage

### Was hat gebremst?

- Website zeigte Kompetenz, aber keine strukturierte Darstellung der Angebote
- Fehlende Conversion-Mechanismen für qualifizierte Lead-Generierung
- Keine SEO-Optimierung für relevante Beratungs-Keywords
- Visuelle Identität differenzierte nicht vom Wettbewerb
- LinkedIn-Präsenz ohne systematische Lead-Generierung

### Warum war das kritisch?

Im kompetitiven Beratungsmarkt ist digitale Sichtbarkeit entscheidend. Ohne klare Positionierung und professionelle Online-Präsenz gingen potenzielle Mandate an besser aufgestellte Wettbewerber – trotz exzellenter Expertise im Bereich Geschäftsmodell-Innovation.

## Ziele & KPIs

- Klare Messaging-Klarheit für Zielgruppen etablieren
- Neue visuelle Identität entwickeln
- LinkedIn als Lead-Kanal aktivieren
- Conversion-optimierte Website launchen

## Unser Vorgehen

### Rebranding

- Positionierungsworkshop für klare Value Proposition
- Entwicklung einer neuen visuellen Identität
- Messaging-Framework für verschiedene Zielgruppen

### Website Redesign

- Moderne, conversion-optimierte Plattform
- Klare Darstellung der Beratungsangebote
- Integration von Lead-Capture-Mechanismen

### LinkedIn Aktivierung

- Professionelles Campaign Management
- Thought-Leadership-Content-Strategie
- Gezielte Ansprache von Entscheidern

## Umsetzung im Detail

### Brand Identity

Entwicklung einer frischen, professionellen Identität, die Innovation und Expertise kommuniziert. Logo, Farbpalette, Typografie und visuelle Elemente für konsistente Markenkommunikation.

### Website & UX

Strukturierte Darstellung der Beratungsleistungen mit klaren User Journeys. Landing-Pages für verschiedene Services, Case Studies und Testimonials für Social Proof.

### Content Creation

Thought-Leadership-Content für LinkedIn und Website. Artikel, Whitepapers und Case Studies zur Demonstration von Expertise im Bereich Geschäftsmodell-Innovation.

## Deliverables

- Komplettes Rebranding (Logo, Visual Identity, Messaging)
- Conversion-optimierte Website mit CMS
- LinkedIn Campaign Management
- Thought-Leadership-Content-Paket
- Visitenkarten und Brand Touchpoints
- SEO-Grundoptimierung

## Was hat am stärksten gewirkt?

Die Kombination aus klarer Positionierung und aktivem LinkedIn-Kampagnenmanagement war der größte Hebel. Statt generischer Beratungs-Kommunikation positionierte sich Point of New als Spezialist für Geschäftsmodell-Innovation – das resonierte stark bei der Zielgruppe.

## Key Learnings

- **Wenn** eine Beratung ihre Spezialisierung klar kommuniziert, **dann** steigt die Lead-Qualität, **weil** Interessenten sich selbst qualifizieren.
- **Wenn** Thought Leadership authentisch und regelmäßig geteilt wird, **dann** wächst die LinkedIn-Reichweite organisch, **weil** wertvoller Content geteilt wird.
- **Wenn** die Website klare Conversion-Pfade hat, **dann** werden aus Besuchern Leads, **weil** der nächste Schritt offensichtlich ist.

## Nächste Schritte

- Ausbau der Content-Strategie mit Video-Content
- Skalierung der LinkedIn-Kampagnen
- Entwicklung von Lead-Magnets (Frameworks, Tools)
- Aufbau einer Newsletter-Liste`,

    en: `## Project Overview

Point of New, a specialized innovation consultancy for business model innovation, needed a digital presence that convincingly communicates their expertise. GoldenWing delivered complete rebranding with website relaunch and LinkedIn campaigns. The result: +85% LinkedIn lead performance and clear positioning in the consulting market.

## Starting Point

### What Was Holding Them Back?

- Website showed competence but no structured presentation of offerings
- Missing conversion mechanisms for qualified lead generation
- No SEO optimization for relevant consulting keywords
- Visual identity did not differentiate from competition
- LinkedIn presence without systematic lead generation

### Why Was This Critical?

In the competitive consulting market, digital visibility is crucial. Without clear positioning and professional online presence, potential mandates went to better-positioned competitors – despite excellent expertise in business model innovation.

## Goals & KPIs

- Establish clear messaging clarity for target audiences
- Develop new visual identity
- Activate LinkedIn as lead channel
- Launch conversion-optimized website

## Our Approach

### Rebranding

- Positioning workshop for clear value proposition
- Development of new visual identity
- Messaging framework for different target audiences

### Website Redesign

- Modern, conversion-optimized platform
- Clear presentation of consulting offerings
- Integration of lead capture mechanisms

### LinkedIn Activation

- Professional campaign management
- Thought leadership content strategy
- Targeted outreach to decision-makers

## Implementation Details

### Brand Identity

Development of a fresh, professional identity that communicates innovation and expertise. Logo, color palette, typography, and visual elements for consistent brand communication.

### Website & UX

Structured presentation of consulting services with clear user journeys. Landing pages for various services, case studies, and testimonials for social proof.

### Content Creation

Thought leadership content for LinkedIn and website. Articles, whitepapers, and case studies demonstrating expertise in business model innovation.

## Deliverables

- Complete rebranding (logo, visual identity, messaging)
- Conversion-optimized website with CMS
- LinkedIn campaign management
- Thought leadership content package
- Business cards and brand touchpoints
- Basic SEO optimization

## What Had the Biggest Impact?

The combination of clear positioning and active LinkedIn campaign management was the biggest lever. Instead of generic consulting communication, Point of New positioned itself as a specialist for business model innovation – this resonated strongly with the target audience.

## Key Learnings

- **If** a consultancy clearly communicates its specialization, **then** lead quality increases, **because** prospects self-qualify.
- **If** thought leadership is shared authentically and regularly, **then** LinkedIn reach grows organically, **because** valuable content gets shared.
- **If** the website has clear conversion paths, **then** visitors become leads, **because** the next step is obvious.

## Next Steps

- Expand content strategy with video content
- Scale LinkedIn campaigns
- Develop lead magnets (frameworks, tools)
- Build newsletter list`
  },

  // ID 4: LAMBERG
  'lamberg': {
    de: `## Projektübersicht

LAMBERG, ein etablierter E-Commerce-Retailer, war vollständig von Marketplace-Plattformen abhängig – mit hohen Gebühren und ohne direkten Kundenkontakt. GoldenWing entwickelte einen maßgeschneiderten Online-Shop mit E-Commerce-Strategie. Das Ergebnis: +300% Umsatzsteigerung und vollständige Unabhängigkeit von Marketplace-Gebühren.

## Ausgangslage

### Was hat gebremst?

- Hohe Marketplace-Gebühren (15-20% pro Verkauf)
- Kein direkter Kundenkontakt oder Kundendaten
- Abhängigkeit von Algorithmus-Änderungen der Plattformen
- Keine Möglichkeit für Markenaufbau
- Limitierte Gestaltungsmöglichkeiten bei Produktpräsentation

### Warum war das kritisch?

Die Marketplace-Abhängigkeit bedeutete, dass LAMBERG auf einem fremden Fundament baute. Jede Gebührenerhöhung oder Algorithmus-Änderung bedrohte das Geschäftsmodell direkt. Ohne eigene Kundenbasis war nachhaltiges Wachstum nicht möglich.

## Ziele & KPIs

- Eigenen E-Commerce-Shop etablieren
- Marketplace-Gebühren eliminieren
- Direkten Kundenkontakt aufbauen
- Markenidentität stärken

## Unser Vorgehen

### Shop-Entwicklung

- Maßgeschneidertes E-Commerce-System
- Conversion-optimiertes UX-Design
- Mobile-First-Ansatz für mobiles Shopping

### Payment & Operations

- Integration multipler Zahlungsmethoden
- Automatisierte Lagerverwaltung
- Nahtlose Fulfillment-Prozesse

### Marketing-Integration

- SEO-Grundstruktur für organische Sichtbarkeit
- Analytics-Setup für datengetriebene Optimierung
- Email-Marketing-Automation

## Umsetzung im Detail

### E-Commerce Platform

Custom-Shop-Entwicklung mit Fokus auf Performance und Conversion. Schnelle Ladezeiten, intuitive Navigation und optimierte Checkout-Prozesse für minimale Kaufabbrüche.

### UX & Conversion Design

Benutzerführung basierend auf E-Commerce-Best-Practices. Produktseiten mit hochwertigem Bildmaterial, Trust-Elementen und klaren CTAs. Cross-Selling und Upselling intelligent integriert.

### Inventory & Fulfillment

Automatisierte Lagerverwaltung mit Echtzeit-Bestandsanzeige. Integration mit Versanddienstleistern für automatische Tracking-Updates und Kundenbenachrichtigungen.

## Deliverables

- Maßgeschneiderter E-Commerce-Shop
- Conversion-optimiertes UX-Design
- Payment-Gateway-Integration (Multiple Provider)
- Inventory-Management-System
- SEO-Grundoptimierung
- Analytics & Tracking Setup
- Email-Marketing-Integration
- Mobile-optimierte Shopfront

## Was hat am stärksten gewirkt?

Die Kombination aus professionellem Shop-Design und der Elimination von Marketplace-Gebühren war der größte Hebel. Die gesparten 15-20% Gebühren konnten in Marketing investiert werden, was einen Wachstums-Flywheel startete.

Der direkte Kundenkontakt ermöglichte Email-Marketing und Retention-Strategien, die auf Marketplaces unmöglich waren.

## Key Learnings

- **Wenn** ein Händler seine eigene Plattform kontrolliert, **dann** kann er nachhaltig wachsen, **weil** Margen und Kundendaten im eigenen Haus bleiben.
- **Wenn** der Checkout-Prozess optimiert ist, **dann** sinkt die Abbruchrate, **weil** Kunden keine Hürden erleben.
- **Wenn** Email-Marketing etabliert wird, **dann** steigt der Customer Lifetime Value, **weil** Wiederkäufe aktiv gefördert werden.

## Nächste Schritte

- Expansion des Produktsortiments
- Ausbau der Email-Marketing-Automation
- Implementierung eines Loyalty-Programms
- Internationalisierung des Shops`,

    en: `## Project Overview

LAMBERG, an established e-commerce retailer, was completely dependent on marketplace platforms – with high fees and no direct customer contact. GoldenWing developed a custom online shop with e-commerce strategy. The result: +300% revenue increase and complete independence from marketplace fees.

## Starting Point

### What Was Holding Them Back?

- High marketplace fees (15-20% per sale)
- No direct customer contact or customer data
- Dependency on platform algorithm changes
- No opportunity for brand building
- Limited design options for product presentation

### Why Was This Critical?

Marketplace dependency meant LAMBERG was building on someone else's foundation. Any fee increase or algorithm change directly threatened the business model. Without its own customer base, sustainable growth was not possible.

## Goals & KPIs

- Establish own e-commerce shop
- Eliminate marketplace fees
- Build direct customer contact
- Strengthen brand identity

## Our Approach

### Shop Development

- Custom e-commerce system
- Conversion-optimized UX design
- Mobile-first approach for mobile shopping

### Payment & Operations

- Integration of multiple payment methods
- Automated inventory management
- Seamless fulfillment processes

### Marketing Integration

- SEO foundation for organic visibility
- Analytics setup for data-driven optimization
- Email marketing automation

## Implementation Details

### E-Commerce Platform

Custom shop development focused on performance and conversion. Fast loading times, intuitive navigation, and optimized checkout processes for minimal cart abandonment.

### UX & Conversion Design

User guidance based on e-commerce best practices. Product pages with high-quality imagery, trust elements, and clear CTAs. Cross-selling and upselling intelligently integrated.

### Inventory & Fulfillment

Automated inventory management with real-time stock display. Integration with shipping providers for automatic tracking updates and customer notifications.

## Deliverables

- Custom e-commerce shop
- Conversion-optimized UX design
- Payment gateway integration (multiple providers)
- Inventory management system
- Basic SEO optimization
- Analytics & tracking setup
- Email marketing integration
- Mobile-optimized storefront

## What Had the Biggest Impact?

The combination of professional shop design and elimination of marketplace fees was the biggest lever. The saved 15-20% fees could be invested in marketing, starting a growth flywheel.

Direct customer contact enabled email marketing and retention strategies that were impossible on marketplaces.

## Key Learnings

- **If** a retailer controls their own platform, **then** they can grow sustainably, **because** margins and customer data stay in-house.
- **If** the checkout process is optimized, **then** abandonment rate drops, **because** customers experience no hurdles.
- **If** email marketing is established, **then** customer lifetime value increases, **because** repeat purchases are actively encouraged.

## Next Steps

- Expand product assortment
- Build out email marketing automation
- Implement loyalty program
- Internationalize the shop`
  },

  // ID 5: Turbo Mango
  'turbo-mango': {
    de: `## Projektübersicht

Turbo Mango, eine aufstrebende Digital-Agentur, brauchte eine Brand Identity, die kreativ und professionell zugleich ist. GoldenWing entwickelte eine vollständige Markenstrategie mit Logo, visueller Identität und Content-Strategie. Das Ergebnis: Eine einzigartige Brand Identity und erfolgreiche globale Business-Development-Aktivitäten.

## Ausgangslage

### Was hat gebremst?

- Keine differenzierende visuelle Identität im Agenturmarkt
- Fehlende Brand Guidelines für konsistente Kommunikation
- Unklare Positionierung gegenüber Wettbewerbern
- Keine strukturierte Content-Strategie
- Pitch-Materialien nicht auf Premium-Level

### Warum war das kritisch?

Im Agenturgeschäft verkauft man primär Kreativität und Professionalität. Ohne überzeugende eigene Marke ist es schwer, Kunden von den eigenen Fähigkeiten zu überzeugen – die Agency Brand ist das beste Portfolio-Stück.

## Ziele & KPIs

- Einzigartige Brand Identity entwickeln
- Globales Business Development unterstützen
- Top-Markenkommunikation etablieren
- Pitch-Ready-Materialien erstellen

## Unser Vorgehen

### Logo & Branding

- Entwicklung einer frischen, energetischen Identität
- Farbpalette und Typografie für digitale und Print-Anwendungen
- Flexible Logo-Varianten für verschiedene Kontexte

### Content-Strategie

- Multi-Channel-Content für LinkedIn, Website, Social
- Thought-Leadership-Positioning
- Portfolio-Präsentation und Case Studies

### Business Development Support

- Beratung für internationale Expansion
- Strategische Partnerschaften entwickeln
- Pitch-Deck-Optimierung

## Umsetzung im Detail

### Visual Identity System

Entwicklung eines modularen Design-Systems mit Logo-Varianten, Icon-Set, Bildsprache und Layout-Templates. Flexible Anwendung für digitale und physische Touchpoints.

### Brand Strategy

Positionierungsworkshop zur Definition von Werten, Tone of Voice und Zielgruppen-Messaging. Entwicklung von Elevator Pitches und Value Propositions für verschiedene Kundensegmente.

### Content & Communications

Content-Kalender mit Themenschwerpunkten, Social-Media-Templates und Blog-Artikel-Strukturen für konsistente Thought-Leadership-Kommunikation.

## Deliverables

- Logo und Visual Identity System
- Brand Guidelines Document
- Content-Strategie und Kalender
- Social Media Templates
- Pitch-Deck-Design
- Business Development Consulting
- Print-Ready-Materialien

## Was hat am stärksten gewirkt?

Die Kombination aus starker visueller Identität und strategischer Business-Development-Beratung war der Schlüssel. Die neue Brand öffnete Türen zu internationalen Projekten und Partnerschaften, die vorher nicht möglich waren.

## Key Learnings

- **Wenn** eine Agentur ihre eigene Brand meistert, **dann** steigt die Glaubwürdigkeit bei Kunden, **weil** man beweist, was man für andere tun kann.
- **Wenn** Brand Guidelines konsequent befolgt werden, **dann** spart man Zeit im Tagesgeschäft, **weil** Entscheidungen vordefiniert sind.
- **Wenn** Content-Strategie auf Thought Leadership setzt, **dann** kommen Anfragen organisch, **weil** Expertise sichtbar wird.

## Nächste Schritte

- Internationalisierung der Webpräsenz
- Ausbau der Video-Content-Produktion
- Entwicklung von Case-Study-Templates
- Award-Submissions für Branchenpreise`,

    en: `## Project Overview

Turbo Mango, an emerging digital agency, needed a brand identity that is both creative and professional. GoldenWing developed a complete brand strategy with logo, visual identity, and content strategy. The result: A unique brand identity and successful global business development activities.

## Starting Point

### What Was Holding Them Back?

- No differentiating visual identity in the agency market
- Missing brand guidelines for consistent communication
- Unclear positioning against competitors
- No structured content strategy
- Pitch materials not at premium level

### Why Was This Critical?

In the agency business, you primarily sell creativity and professionalism. Without a convincing brand of your own, it's difficult to convince clients of your capabilities – the agency brand is the best portfolio piece.

## Goals & KPIs

- Develop unique brand identity
- Support global business development
- Establish top brand communication
- Create pitch-ready materials

## Our Approach

### Logo & Branding

- Development of a fresh, energetic identity
- Color palette and typography for digital and print applications
- Flexible logo variants for different contexts

### Content Strategy

- Multi-channel content for LinkedIn, website, social
- Thought leadership positioning
- Portfolio presentation and case studies

### Business Development Support

- Consulting for international expansion
- Develop strategic partnerships
- Pitch deck optimization

## Implementation Details

### Visual Identity System

Development of a modular design system with logo variants, icon set, imagery style, and layout templates. Flexible application for digital and physical touchpoints.

### Brand Strategy

Positioning workshop to define values, tone of voice, and target audience messaging. Development of elevator pitches and value propositions for different customer segments.

### Content & Communications

Content calendar with focus topics, social media templates, and blog article structures for consistent thought leadership communication.

## Deliverables

- Logo and visual identity system
- Brand guidelines document
- Content strategy and calendar
- Social media templates
- Pitch deck design
- Business development consulting
- Print-ready materials

## What Had the Biggest Impact?

The combination of strong visual identity and strategic business development consulting was key. The new brand opened doors to international projects and partnerships that weren't possible before.

## Key Learnings

- **If** an agency masters its own brand, **then** credibility with clients increases, **because** you prove what you can do for others.
- **If** brand guidelines are consistently followed, **then** time is saved in daily operations, **because** decisions are predefined.
- **If** content strategy focuses on thought leadership, **then** inquiries come organically, **because** expertise becomes visible.

## Next Steps

- Internationalization of web presence
- Expansion of video content production
- Development of case study templates
- Award submissions for industry awards`
  },

  // ID 6: INSPIRE
  'inspire': {
    de: `## Projektübersicht

INSPIRE, eine Initiative von ICMPD zur digitalen Rekrutierung afrikanischer Talente für europäische Arbeitgeber, brauchte eine skalierbare Recruiting-Strategie. GoldenWing entwickelte eine digitale Recruiting-Architektur mit Performance-Kanälen und integriertem Tracking. Das Ergebnis: Reichweite in 15+ Ländern und deutlich schnellere Time-to-Hire.

## Ausgangslage

### Was hat gebremst?

- Fragmentiertes Recruiting-Setup über verschiedene Kanäle
- Keine einheitlichen Daten- und Tracking-Mechanismen
- Ineffiziente Ansprache internationaler Zielgruppen
- Lange Time-to-Hire durch manuelle Prozesse
- Fehlende Messbarkeit der Kandidaten-Journey

### Warum war das kritisch?

Internationales Talent-Recruiting erfordert präzise Targeting und messbare Prozesse. Ohne integriertes Tracking war unklar, welche Kanäle funktionieren und wo Kandidaten im Prozess verloren gehen – Budget wurde ineffizient eingesetzt.

## Ziele & KPIs

- Internationale Reichweite in 15+ Ländern aufbauen
- Time-to-Hire reduzieren
- Matching-Raten verbessern
- Vollständige Messbarkeit der Candidate Journey

## Unser Vorgehen

### Performance Marketing

- Gezielte Kampagnen über LinkedIn und Google Ads
- Lokalisierte Ansprache in verschiedenen Regionen
- A/B-Testing für Kreativ-Optimierung

### Tracking & Analytics

- Integriertes Tracking der gesamten Candidate Journey
- Attribution-Modelling für Budget-Optimierung
- Real-Time-Dashboards für Kampagnen-Steuerung

### Conversion Optimization

- Landing-Pages für verschiedene Berufsgruppen
- Conversion-optimierte Bewerbungsprozesse
- Multi-Step-Formulare für bessere Completion Rates

## Umsetzung im Detail

### Campaign Architecture

Aufbau einer skalierbaren Kampagnen-Struktur mit geografischer und demografischer Segmentierung. Automatisierte Bid-Strategien und dynamische Anzeigen für relevante Ansprache.

### Employer Branding Content

Entwicklung von Recruiting-Content, der die Vorteile einer Karriere in Europa kommuniziert. Video-Testimonials, Erfolgsgeschichten und informative Inhalte über Arbeitsmöglichkeiten.

### Process Automation

Automatisierung von Follow-ups, Reminder-Emails und Status-Updates. Integration mit ATS-Systemen für nahtlose Kandidaten-Verwaltung.

## Deliverables

- Performance-Marketing-Kampagnen (LinkedIn, Google)
- Conversion-optimierte Landing-Pages
- Integriertes Tracking-Setup
- Employer-Branding-Content
- Analytics-Dashboards
- Kampagnen-Reporting-System
- A/B-Test-Framework

## Was hat am stärksten gewirkt?

Die Kombination aus präzisem geografischem Targeting und optimierten Landing-Pages war entscheidend. Lokalisierte Ansprache in der Landessprache erhöhte die Relevanz und Bewerbungsraten signifikant.

Das integrierte Tracking ermöglichte schnelle Optimierungen basierend auf echten Daten – ineffiziente Kanäle konnten schnell identifiziert und Budget umverteilt werden.

## Key Learnings

- **Wenn** Recruiting-Kampagnen datengetrieben optimiert werden, **dann** sinkt Cost-per-Hire, **weil** Budget in performante Kanäle fließt.
- **Wenn** Landing-Pages für spezifische Zielgruppen erstellt werden, **dann** steigt die Conversion-Rate, **weil** die Botschaft relevant ist.
- **Wenn** die Candidate Journey vollständig getrackt wird, **dann** können Bottlenecks identifiziert werden, **weil** Drop-off-Punkte sichtbar sind.

## Nächste Schritte

- Expansion in weitere afrikanische Regionen
- Implementierung von Chatbots für Candidate Support
- Entwicklung von Alumni-Netzwerk-Programmen
- Ausbau der Video-Content-Produktion`,

    en: `## Project Overview

INSPIRE, an ICMPD initiative for digital recruitment of African talent for European employers, needed a scalable recruiting strategy. GoldenWing developed a digital recruiting architecture with performance channels and integrated tracking. The result: Reach in 15+ countries and significantly faster time-to-hire.

## Starting Point

### What Was Holding Them Back?

- Fragmented recruiting setup across different channels
- No unified data and tracking mechanisms
- Inefficient outreach to international target audiences
- Long time-to-hire due to manual processes
- Missing measurability of the candidate journey

### Why Was This Critical?

International talent recruiting requires precise targeting and measurable processes. Without integrated tracking, it was unclear which channels work and where candidates are lost in the process – budget was spent inefficiently.

## Goals & KPIs

- Build international reach in 15+ countries
- Reduce time-to-hire
- Improve matching rates
- Full measurability of the candidate journey

## Our Approach

### Performance Marketing

- Targeted campaigns via LinkedIn and Google Ads
- Localized outreach in various regions
- A/B testing for creative optimization

### Tracking & Analytics

- Integrated tracking of the entire candidate journey
- Attribution modeling for budget optimization
- Real-time dashboards for campaign management

### Conversion Optimization

- Landing pages for different professional groups
- Conversion-optimized application processes
- Multi-step forms for better completion rates

## Implementation Details

### Campaign Architecture

Building a scalable campaign structure with geographic and demographic segmentation. Automated bid strategies and dynamic ads for relevant outreach.

### Employer Branding Content

Development of recruiting content communicating the benefits of a career in Europe. Video testimonials, success stories, and informative content about job opportunities.

### Process Automation

Automation of follow-ups, reminder emails, and status updates. Integration with ATS systems for seamless candidate management.

## Deliverables

- Performance marketing campaigns (LinkedIn, Google)
- Conversion-optimized landing pages
- Integrated tracking setup
- Employer branding content
- Analytics dashboards
- Campaign reporting system
- A/B test framework

## What Had the Biggest Impact?

The combination of precise geographic targeting and optimized landing pages was decisive. Localized outreach in the local language significantly increased relevance and application rates.

Integrated tracking enabled quick optimizations based on real data – inefficient channels could be quickly identified and budget reallocated.

## Key Learnings

- **If** recruiting campaigns are data-driven optimized, **then** cost-per-hire decreases, **because** budget flows to performing channels.
- **If** landing pages are created for specific target groups, **then** conversion rate increases, **because** the message is relevant.
- **If** the candidate journey is fully tracked, **then** bottlenecks can be identified, **because** drop-off points are visible.

## Next Steps

- Expansion to additional African regions
- Implementation of chatbots for candidate support
- Development of alumni network programs
- Expansion of video content production`
  },

  // ID 7: Alinea Partners
  'alinea-partners': {
    de: `## Projektübersicht

Alinea Partners, eine strategische Unternehmensberatung für Organizational Excellence, brauchte eine digitale Präsenz, die ihre strategische Tiefe widerspiegelt. GoldenWing lieferte eine Full-Service-Lösung von Website über Videos bis E-Commerce. Das Ergebnis: +140% qualifizierte Kontaktanfragen und internationale Online-Shops in USA und Europa.

## Ausgangslage

### Was hat gebremst?

- Website vermittelte nicht die strategische Tiefe der Beratung
- Potenzielle Kunden konnten Leistungen nicht schnell erfassen
- Fehlende Sales-Enablement-Materialien für den Vertrieb
- Keine digitalen Produkte oder Services für Skalierung
- Video-Content für moderne Kommunikation fehlte

### Warum war das kritisch?

Strategieberatungen verkaufen Expertise und Vertrauen. Ohne professionelle digitale Präsenz und hochwertige Materialien ist es schwer, sich von Wettbewerbern abzuheben und Premium-Preise zu rechtfertigen.

## Ziele & KPIs

- Qualifizierte Kontaktanfragen steigern
- Internationale Online-Shops launchen
- Professionelle Video-Assets erstellen
- Sales-Enablement-Materialien entwickeln

## Unser Vorgehen

### Website Redesign

- Moderne, conversion-fokussierte Plattform
- Klare Darstellung der Beratungsleistungen
- Library-Bereich für Thought Leadership

### Video Production

- Professionelle Trainingsvideos (u.a. Microsoft Copilot)
- Post-Production und Editing
- Multiple Formate für verschiedene Kanäle

### E-Commerce

- Online-Shops für einfachen Service-Vertrieb
- Internationale Implementierung (USA/Europa)
- Payment-Integration und Fulfillment

## Umsetzung im Detail

### Resource Library

Aufbau eines Ressourcen-Hubs mit Whitepapers, Frameworks und Tools. Gated Content für Lead-Generierung und Demonstration von Thought Leadership.

### Training Videos

Professionelle Videoproduktion für Trainings und Produktvorstellungen. Hochwertiges Equipment, professionelle Post-Produktion und optimierte Distribution.

### International E-Commerce

Launch von Online-Shops für den Verkauf von Trainings, Lizenzen und digitalen Produkten. Lokalisiert für verschiedene Märkte mit angepasstem Payment.

## Deliverables

- Conversion-optimierte Website mit CMS
- Resource Library für Thought Leadership
- Professionelle Trainingsvideos
- Video Post-Production
- E-Commerce-Shops (USA + Europa)
- Marketing & Sales Dokumente
- SEO-Optimierung

## Was hat am stärksten gewirkt?

Die Kombination aus professionellen Videos und E-Commerce ermöglichte neue Revenue-Streams. Statt nur Beratung zu verkaufen, konnte Alinea Partners nun auch digitale Produkte und Trainings skalierbar anbieten.

Die Resource Library etablierte Thought Leadership und generierte qualifizierte Leads durch hochwertige Inhalte.

## Key Learnings

- **Wenn** Beratungen digitale Produkte entwickeln, **dann** skaliert das Geschäftsmodell, **weil** Revenue nicht mehr nur an Stunden gebunden ist.
- **Wenn** Video-Content professionell produziert wird, **dann** steigt die Conversion, **weil** komplexe Expertise greifbar wird.
- **Wenn** internationale E-Commerce-Shops existieren, **dann** öffnen sich neue Märkte, **weil** Kunden direkt kaufen können.

## Nächste Schritte

- Ausbau des digitalen Produkt-Portfolios
- Implementierung von Video-Kursen
- Erweiterung der Resource Library
- Lokalisierung für weitere Märkte`,

    en: `## Project Overview

Alinea Partners, a strategic management consultancy for Organizational Excellence, needed a digital presence that reflects their strategic depth. GoldenWing delivered a full-service solution from website to videos to e-commerce. The result: +140% qualified contact inquiries and international online shops in USA and Europe.

## Starting Point

### What Was Holding Them Back?

- Website did not convey the strategic depth of the consultancy
- Potential clients could not quickly grasp services
- Missing sales enablement materials for the sales team
- No digital products or services for scaling
- Video content for modern communication was missing

### Why Was This Critical?

Strategy consultancies sell expertise and trust. Without professional digital presence and high-quality materials, it's difficult to stand out from competitors and justify premium prices.

## Goals & KPIs

- Increase qualified contact inquiries
- Launch international online shops
- Create professional video assets
- Develop sales enablement materials

## Our Approach

### Website Redesign

- Modern, conversion-focused platform
- Clear presentation of consulting services
- Library section for thought leadership

### Video Production

- Professional training videos (including Microsoft Copilot)
- Post-production and editing
- Multiple formats for different channels

### E-Commerce

- Online shops for easy service distribution
- International implementation (USA/Europe)
- Payment integration and fulfillment

## Implementation Details

### Resource Library

Building a resource hub with whitepapers, frameworks, and tools. Gated content for lead generation and demonstration of thought leadership.

### Training Videos

Professional video production for trainings and product presentations. High-quality equipment, professional post-production, and optimized distribution.

### International E-Commerce

Launch of online shops for selling trainings, licenses, and digital products. Localized for different markets with adapted payment.

## Deliverables

- Conversion-optimized website with CMS
- Resource library for thought leadership
- Professional training videos
- Video post-production
- E-commerce shops (USA + Europe)
- Marketing & sales documents
- SEO optimization

## What Had the Biggest Impact?

The combination of professional videos and e-commerce enabled new revenue streams. Instead of just selling consulting, Alinea Partners could now offer digital products and trainings scalably.

The resource library established thought leadership and generated qualified leads through high-quality content.

## Key Learnings

- **If** consultancies develop digital products, **then** the business model scales, **because** revenue is no longer only tied to hours.
- **If** video content is professionally produced, **then** conversion increases, **because** complex expertise becomes tangible.
- **If** international e-commerce shops exist, **then** new markets open, **because** customers can buy directly.

## Next Steps

- Expand digital product portfolio
- Implement video courses
- Extend resource library
- Localization for additional markets`
  },

  // Continue with more projects...
  // ID 8: SiMAX
  'simax': {
    de: `## Projektübersicht

SiMAX, ein Technologie-Innovator für barrierefreie Kommunikationslösungen, brauchte professionelle digitale Sichtbarkeit für seine Gebärdensprach-Technologie. GoldenWing entwickelte eine umfassende Digital-Marketing-Strategie mit LinkedIn-Kampagnen und Developer-Outreach. Das Ergebnis: Hohe Engagement-Rate, gesteigerte Brand Awareness und B2B-Leads.

## Ausgangslage

### Was hat gebremst?

- Innovative Technologie war im Markt wenig bekannt
- Fehlende Go-to-Market-Strategie für Developer und Unternehmen
- Komplexe Technologie schwer zu kommunizieren
- Keine systematische Lead-Generierung
- Developer-Community nicht aktiviert

### Warum war das kritisch?

Ohne Sichtbarkeit bei Developern und Unternehmen blieb das Potenzial der Inklusionslösung ungenutzt. Tech-Produkte brauchen Community-Adoption und B2B-Partnerschaften für Markterfolg.

## Ziele & KPIs

- Brand Awareness bei Entwicklern steigern
- B2B-Leads generieren
- Community Building aufbauen
- Technologie verständlich kommunizieren

## Unser Vorgehen

### LinkedIn Activation

- Professionelle B2B-Developer-Ansprache
- Thought-Leadership-Content zu Accessibility
- Gezielte Kampagnen für Unternehmens-Entscheider

### Content & Events

- Technische und Marketing-Inhalte entwickelt
- Webinar-Koordination für Produktdemos
- Virtuelle Launch-Events organisiert

### Community Building

- Developer-Outreach-Programm
- Engagement in relevanten Tech-Communities
- Case Studies und Success Stories

## Umsetzung im Detail

### Developer Marketing

Ansprache von Developern mit technischen Inhalten, API-Dokumentation und Integration-Guides. Positionierung als Accessibility-Enabler für Web- und Mobile-Anwendungen.

### B2B Outreach

Gezielte LinkedIn-Kampagnen für Entscheider in Unternehmen mit Accessibility-Verpflichtungen. Content rund um WCAG-Compliance und Inklusionsvorteile.

### Event Marketing

Organisation von Webinaren, Demo-Sessions und Launch-Events. Professionelle Moderation und Follow-up für Lead-Conversion.

## Deliverables

- LinkedIn Campaign Management
- Technischer und Marketing-Content
- Webinar-Organisation und -Durchführung
- Launch-Event-Koordination
- Developer-Outreach-Programm
- Case Studies
- Community-Building-Strategie

## Was hat am stärksten gewirkt?

Die Kombination aus technischem Developer-Content und B2B-LinkedIn-Kampagnen war der Schlüssel. Developer wurden zu Advocates, die die Technologie in Unternehmen einführten.

Die Positionierung als Accessibility-Enabler statt als reines Tech-Produkt resonierte stark bei Unternehmen mit ESG- und Inklusionszielen.

## Key Learnings

- **Wenn** Tech-Produkte Developer-First vermarktet werden, **dann** entstehen organische Advocates, **weil** Entwickler intern Einfluss haben.
- **Wenn** Accessibility als Business-Vorteil kommuniziert wird, **dann** öffnen sich B2B-Türen, **weil** Compliance-Druck steigt.
- **Wenn** Live-Demos professionell moderiert werden, **dann** steigt die Conversion, **weil** die Technologie erlebbar wird.

## Nächste Schritte

- Ausbau der Developer-Documentation
- Partnerschaftsprogramm entwickeln
- Internationale Marktexpansion
- API-Marketplace-Präsenz aufbauen`,

    en: `## Project Overview

SiMAX, a technology innovator for accessible communication solutions, needed professional digital visibility for its sign language technology. GoldenWing developed a comprehensive digital marketing strategy with LinkedIn campaigns and developer outreach. The result: High engagement rate, increased brand awareness, and B2B leads.

## Starting Point

### What Was Holding Them Back?

- Innovative technology was little known in the market
- Missing go-to-market strategy for developers and enterprises
- Complex technology difficult to communicate
- No systematic lead generation
- Developer community not activated

### Why Was This Critical?

Without visibility among developers and enterprises, the potential of the inclusion solution remained untapped. Tech products need community adoption and B2B partnerships for market success.

## Goals & KPIs

- Increase brand awareness among developers
- Generate B2B leads
- Build community
- Communicate technology understandably

## Our Approach

### LinkedIn Activation

- Professional B2B developer outreach
- Thought leadership content on accessibility
- Targeted campaigns for enterprise decision-makers

### Content & Events

- Developed technical and marketing content
- Webinar coordination for product demos
- Organized virtual launch events

### Community Building

- Developer outreach program
- Engagement in relevant tech communities
- Case studies and success stories

## Implementation Details

### Developer Marketing

Outreach to developers with technical content, API documentation, and integration guides. Positioning as accessibility enabler for web and mobile applications.

### B2B Outreach

Targeted LinkedIn campaigns for decision-makers in companies with accessibility obligations. Content around WCAG compliance and inclusion benefits.

### Event Marketing

Organization of webinars, demo sessions, and launch events. Professional moderation and follow-up for lead conversion.

## Deliverables

- LinkedIn campaign management
- Technical and marketing content
- Webinar organization and execution
- Launch event coordination
- Developer outreach program
- Case studies
- Community building strategy

## What Had the Biggest Impact?

The combination of technical developer content and B2B LinkedIn campaigns was key. Developers became advocates who introduced the technology within enterprises.

Positioning as accessibility enabler rather than a pure tech product resonated strongly with companies with ESG and inclusion goals.

## Key Learnings

- **If** tech products are marketed developer-first, **then** organic advocates emerge, **because** developers have internal influence.
- **If** accessibility is communicated as a business advantage, **then** B2B doors open, **because** compliance pressure is increasing.
- **If** live demos are professionally moderated, **then** conversion increases, **because** the technology becomes tangible.

## Next Steps

- Expand developer documentation
- Develop partnership program
- International market expansion
- Build API marketplace presence`
  },
}

// Generate remaining case studies programmatically based on existing data
function generateCaseStudy(project: ProjectData, locale: 'de' | 'en'): string {
  const isDE = locale === 'de'

  // Get top 3 KPIs for highlight
  const topKPIs = project.kpis.slice(0, 3)

  // Group solution points into logical sections
  const sections = project.solutionPoints.slice(0, 6)

  // Generate category-specific content
  const categoryMap: Record<string, { approach: string; focus: string }> = {
    'webdesign': {
      approach: isDE ? 'User-Centered Design und Conversion-Optimierung' : 'User-centered design and conversion optimization',
      focus: isDE ? 'Website-Entwicklung und UX' : 'Website development and UX'
    },
    'branding': {
      approach: isDE ? 'Strategische Markenentwicklung und Visual Identity' : 'Strategic brand development and visual identity',
      focus: isDE ? 'Brand Strategy und Corporate Design' : 'Brand strategy and corporate design'
    },
    'marketing': {
      approach: isDE ? 'Performance Marketing und Lead-Generierung' : 'Performance marketing and lead generation',
      focus: isDE ? 'Digital Marketing und Kampagnen' : 'Digital marketing and campaigns'
    },
    'seo': {
      approach: isDE ? 'SEO-Strategie und Content-Optimierung' : 'SEO strategy and content optimization',
      focus: isDE ? 'Suchmaschinenoptimierung und Content' : 'Search engine optimization and content'
    },
    'entwicklung': {
      approach: isDE ? 'Custom Development und Systemintegration' : 'Custom development and system integration',
      focus: isDE ? 'Software-Entwicklung und Architektur' : 'Software development and architecture'
    },
    'software': {
      approach: isDE ? 'Skalierbare Softwarelösungen und Cloud-Architektur' : 'Scalable software solutions and cloud architecture',
      focus: isDE ? 'Platform Development und Integration' : 'Platform development and integration'
    },
    'strategie': {
      approach: isDE ? 'Strategische Beratung und digitale Transformation' : 'Strategic consulting and digital transformation',
      focus: isDE ? 'Business Strategy und Digital Transformation' : 'Business strategy and digital transformation'
    },
    'it-cloud': {
      approach: isDE ? 'Cloud-Migration und DevOps-Automation' : 'Cloud migration and DevOps automation',
      focus: isDE ? 'Infrastructure und Cloud Services' : 'Infrastructure and cloud services'
    }
  }

  const categoryInfo = categoryMap[project.category] || categoryMap['entwicklung']

  // Build the case study
  const kpiSummary = topKPIs.map(k => `${k.metric} ${k.label}`).join(', ')

  if (isDE) {
    return `## Projektübersicht

${project.client}, ${project.company_description.split('.')[0].toLowerCase()}. GoldenWing entwickelte eine maßgeschneiderte Lösung mit Fokus auf ${categoryInfo.focus}. Das Ergebnis: ${kpiSummary}.

## Ausgangslage

### Was hat gebremst?

${project.challenge}

Die spezifischen Herausforderungen umfassten:
- Fehlende digitale Infrastruktur für nachhaltiges Wachstum
- Ineffiziente Prozesse und manuelle Workflows
- Unklare Positionierung und Kommunikation
- Mangelnde Messbarkeit von Marketing- und Vertriebsaktivitäten

### Warum war das kritisch?

Ohne professionelle digitale Präsenz und optimierte Prozesse blieb das Wachstumspotenzial ungenutzt. Die Konkurrenz war digital besser aufgestellt, was zu verpassten Opportunities führte.

## Ziele & KPIs

${topKPIs.map(k => `- ${k.label}: ${k.metric}`).join('\n')}
- Digitale Prozesse optimieren und automatisieren
- Markenpositionierung stärken

## Unser Vorgehen

### ${categoryInfo.approach}

${project.solution}

${sections.slice(0, 3).map(s => `- **${s.title}:** ${s.description}`).join('\n')}

### Implementierung & Rollout

${sections.slice(3, 6).map(s => `- **${s.title}:** ${s.description}`).join('\n')}

## Umsetzung im Detail

### Phase 1: Analyse & Strategie

Tiefgehende Analyse der bestehenden Prozesse, Wettbewerbslandschaft und Zielgruppen. Definition klarer KPIs und Meilensteine für das Projekt.

### Phase 2: Entwicklung & Design

${categoryInfo.approach} mit Fokus auf Benutzerfreundlichkeit und Conversion-Optimierung. Iteratives Design mit regelmäßigem Feedback.

### Phase 3: Launch & Optimierung

Go-Live mit begleitendem Support und kontinuierlicher Optimierung basierend auf Performance-Daten und Nutzer-Feedback.

## Deliverables

${sections.map(s => `- ${s.title} – ${s.description}`).join('\n')}
- Dokumentation und Schulung
- Performance-Reporting und Analytics

## Was hat am stärksten gewirkt?

Die ganzheitliche Herangehensweise war der Schlüssel zum Erfolg. Statt isolierter Maßnahmen wurde eine integrierte Strategie entwickelt, die alle Touchpoints berücksichtigt.

Die enge Zusammenarbeit mit dem Team von ${project.client} ermöglichte schnelle Iterationen und passgenaue Lösungen.

## Key Learnings

- **Wenn** digitale Prozesse von Anfang an durchdacht werden, **dann** skaliert das Geschäft nachhaltig, **weil** keine technischen Schulden entstehen.
- **Wenn** Stakeholder früh eingebunden werden, **dann** steigt die Adoption-Rate, **weil** Bedenken adressiert werden.
- **Wenn** KPIs klar definiert sind, **dann** kann Erfolg gemessen werden, **weil** Entscheidungen datenbasiert getroffen werden.

## Nächste Schritte

- Weiterentwicklung basierend auf Performance-Daten
- Erweiterung der Funktionalitäten
- Skalierung in neue Märkte oder Segmente
- Kontinuierliche Optimierung und A/B-Testing`
  } else {
    return `## Project Overview

${project.client}, ${project.company_description.split('.')[0].toLowerCase()}. GoldenWing developed a customized solution with focus on ${categoryInfo.focus}. The result: ${kpiSummary}.

## Starting Point

### What Was Holding Them Back?

${project.challenge}

The specific challenges included:
- Missing digital infrastructure for sustainable growth
- Inefficient processes and manual workflows
- Unclear positioning and communication
- Lack of measurability for marketing and sales activities

### Why Was This Critical?

Without professional digital presence and optimized processes, growth potential remained untapped. Competition was digitally better positioned, leading to missed opportunities.

## Goals & KPIs

${topKPIs.map(k => `- ${k.label}: ${k.metric}`).join('\n')}
- Optimize and automate digital processes
- Strengthen brand positioning

## Our Approach

### ${categoryInfo.approach}

${project.solution}

${sections.slice(0, 3).map(s => `- **${s.title}:** ${s.description}`).join('\n')}

### Implementation & Rollout

${sections.slice(3, 6).map(s => `- **${s.title}:** ${s.description}`).join('\n')}

## Implementation Details

### Phase 1: Analysis & Strategy

Deep analysis of existing processes, competitive landscape, and target audiences. Definition of clear KPIs and milestones for the project.

### Phase 2: Development & Design

${categoryInfo.approach} with focus on user-friendliness and conversion optimization. Iterative design with regular feedback.

### Phase 3: Launch & Optimization

Go-live with accompanying support and continuous optimization based on performance data and user feedback.

## Deliverables

${sections.map(s => `- ${s.title} – ${s.description}`).join('\n')}
- Documentation and training
- Performance reporting and analytics

## What Had the Biggest Impact?

The holistic approach was key to success. Instead of isolated measures, an integrated strategy was developed that considers all touchpoints.

Close collaboration with the ${project.client} team enabled quick iterations and tailored solutions.

## Key Learnings

- **If** digital processes are thought through from the start, **then** the business scales sustainably, **because** no technical debt is created.
- **If** stakeholders are involved early, **then** adoption rate increases, **because** concerns are addressed.
- **If** KPIs are clearly defined, **then** success can be measured, **because** decisions are made data-driven.

## Next Steps

- Further development based on performance data
- Expansion of functionalities
- Scaling into new markets or segments
- Continuous optimization and A/B testing`
  }
}

async function main() {
  console.log('Starting Case Study Generation for all Projects...\n')

  const dbPath = path.join(process.cwd(), 'goldenwing.db')
  const db = new Database(dbPath)

  // Get all projects with their data
  const projects = db.prepare(`
    SELECT
      p.id, p.slug, p.client, p.category, p.year,
      pl.title, pl.description, pl.challenge, pl.solution, pl.company_description
    FROM projects p
    JOIN projects_locales pl ON p.id = pl._parent_id
    WHERE pl._locale = 'de' AND p.id != 1
    ORDER BY p.id
  `).all() as any[]

  // Get KPIs for each project
  const kpisStmt = db.prepare(`
    SELECT pr.metric, prl.label
    FROM projects_results pr
    JOIN projects_results_locales prl ON pr.id = prl._parent_id
    WHERE pr._parent_id = ? AND prl._locale = 'de'
    ORDER BY pr._order
  `)

  // Get solution points for each project
  const solutionStmt = db.prepare(`
    SELECT title, description
    FROM projects_solution_points
    WHERE _parent_id = ? AND _locale = 'de'
    ORDER BY _order
  `)

  const updateDE = db.prepare(`
    UPDATE projects_locales
    SET long_description = ?
    WHERE _parent_id = ? AND _locale = 'de'
  `)

  const updateEN = db.prepare(`
    UPDATE projects_locales
    SET long_description = ?
    WHERE _parent_id = ? AND _locale = 'en'
  `)

  let updated = 0
  const skipped = 0

  for (const project of projects) {
    const projectData: ProjectData = {
      ...project,
      kpis: kpisStmt.all(project.id) as any[],
      solutionPoints: solutionStmt.all(project.id) as any[]
    }

    // Check if we have a custom case study for this project
    let contentDE: string
    let contentEN: string

    if (caseStudies[project.slug]) {
      contentDE = caseStudies[project.slug].de
      contentEN = caseStudies[project.slug].en
      console.log(`✅ Using custom case study for: ${project.client}`)
    } else {
      // Generate case study from template
      contentDE = generateCaseStudy(projectData, 'de')
      contentEN = generateCaseStudy(projectData, 'en')
      console.log(`📝 Generated case study for: ${project.client}`)
    }

    // Convert to Lexical and update
    const lexicalDE = JSON.stringify(markdownToLexical(contentDE))
    const lexicalEN = JSON.stringify(markdownToLexical(contentEN))

    updateDE.run(lexicalDE, project.id)
    updateEN.run(lexicalEN, project.id)
    updated++
  }

  db.close()

  console.log(`\n✅ Updated ${updated} projects with new Case Studies`)
  console.log(`⏭️  Skipped ${skipped} projects`)
  console.log('\nCase Study generation completed!')
  console.log('Run the script on VPS to update production.')
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
