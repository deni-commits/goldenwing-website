/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Script to update Domoferm project with full Case Study content
 * Run with: npx tsx src/scripts/update-domoferm-case-study.ts
 */

import { getPayload } from 'payload'
import config from '../../payload.config'

// Convert markdown-like content to Lexical JSON format
function markdownToLexical(markdown: string) {
  const lines = markdown.split('\n')
  const children: any[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (!line.trim()) {
      i++
      continue
    }

    // H2 headers
    if (line.startsWith('## ')) {
      children.push({
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: line.substring(3).trim() }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      i++
      continue
    }

    // H3 headers
    if (line.startsWith('### ')) {
      children.push({
        type: 'heading',
        tag: 'h3',
        children: [{ type: 'text', text: line.substring(4).trim() }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      i++
      continue
    }

    // Bullet points - collect consecutive bullets into a list
    if (line.startsWith('- ')) {
      const listItems: any[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        const itemText = lines[i].substring(2).trim()
        // Handle bold text in list items
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

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteText = line.substring(2).trim()
      children.push({
        type: 'quote',
        children: [{ type: 'text', text: quoteText }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      i++
      continue
    }

    // Regular paragraph - collect until empty line or header
    let paragraphText = line.trim()
    i++
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('- ') && !lines[i].startsWith('> ')) {
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

// Parse inline formatting like **bold** and [links](/url)
function parseInlineFormatting(text: string): any[] {
  const children: any[] = []
  let remaining = text

  while (remaining.length > 0) {
    // Check for bold **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/)
    if (boldMatch) {
      children.push({
        type: 'text',
        text: boldMatch[1],
        format: 1, // Bold
        version: 1,
      })
      remaining = remaining.substring(boldMatch[0].length)
      continue
    }

    // Check for link [text](/url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      children.push({
        type: 'link',
        children: [{ type: 'text', text: linkMatch[1], version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        url: linkMatch[2],
        rel: linkMatch[2].startsWith('/') ? undefined : 'noopener noreferrer',
        target: linkMatch[2].startsWith('/') ? undefined : '_blank',
      })
      remaining = remaining.substring(linkMatch[0].length)
      continue
    }

    // Find next special character
    const nextBold = remaining.indexOf('**')
    const nextLink = remaining.indexOf('[')
    let nextSpecial = remaining.length

    if (nextBold !== -1 && nextBold < nextSpecial) nextSpecial = nextBold
    if (nextLink !== -1 && nextLink < nextSpecial) nextSpecial = nextLink

    // Add plain text up to next special character
    if (nextSpecial > 0) {
      children.push({
        type: 'text',
        text: remaining.substring(0, nextSpecial),
        version: 1,
      })
      remaining = remaining.substring(nextSpecial)
    } else {
      // No match found, add single character and continue
      children.push({
        type: 'text',
        text: remaining.charAt(0),
        version: 1,
      })
      remaining = remaining.substring(1)
    }
  }

  return children.length > 0 ? children : [{ type: 'text', text: '', version: 1 }]
}

// Case Study content in markdown format
const caseStudyDE = `## Die wichtigsten SEO-Tipps für 2025

Domoferm, ein führender europäischer Stahltüren-Hersteller, nutzte seine digitalen Kanäle nicht zur aktiven Lead-Generierung. GoldenWing entwickelte eine integrierte Strategie aus Website-Relaunch, Content-Produktion und Lead-Engineering. Das Ergebnis: +180% qualifizierte Leads und Expansion in 8 europäische Märkte.

## Kurzüberblick

Wir haben Domoferm's digitale Präsenz von einer Produkt-Broschüre zu einer Lead-Maschine transformiert, damit das Vertriebsteam qualifizierte Anfragen aus neuen Märkten erhält, und erzielten +180% mehr Leads bei gleichzeitiger Expansion in 8 Länder.

## Ausgangslage

### Was hat gebremst?

- Website war rein informativ – kein Conversion-Fokus, keine Lead-Capture-Mechanismen
- Entscheider fanden relevante Inhalte nicht oder zu spät im Kaufprozess
- Kein systematischer Ansatz zur digitalen Lead-Generierung im B2B-Bereich
- Content existierte, war aber nicht auf Buyer Journey ausgerichtet
- Internationales Potenzial blieb ungenutzt – keine lokalisierten Kampagnen

### Warum war das kritisch?

Domoferm verfügte über erstklassige Produkte und jahrzehntelange Expertise, verlor aber täglich potenzielle Partner an digital besser aufgestellte Wettbewerber. Die Vertriebspipeline war abhängig von Messen und persönlichen Kontakten – skalierbar war das nicht. Ohne digitale Lead-Generierung blieb das Wachstum in neuen Märkten dem Zufall überlassen.

## Ziele & KPIs

### Business-Ziele

- Digitale Kanäle als primären Lead-Generator etablieren
- Qualifizierte B2B-Anfragen aus bestehenden und neuen Märkten generieren
- Vertriebsteam mit besseren Leads und Sales-Materialien ausstatten
- Internationale Partner-Akquise systematisieren

## Vorgehen

### Conversion-Architektur

- Website-Struktur auf B2B-Buyer-Journey ausgerichtet (Awareness → Consideration → Decision)
- Thematische Landing-Pages für Produktkategorien und Anwendungsbereiche
- Klare CTAs und Lead-Capture-Formulare an strategischen Touchpoints
- Gated Content für qualifizierte Lead-Erfassung

### Demand Generation (SEO/Paid)

- Keyword-Strategie für B2B-relevante Suchbegriffe in DACH und CEE
- Content-Cluster rund um Kernthemen (Stahltüren, Sicherheit, Brandschutz)
- Gezielte Kampagnen zur B2B-Partner-Akquise in Zielmärkten
- LinkedIn und Google Ads für Account-Based-Marketing

### Sales Enablement & Tracking

- Professionelle Produktvideos und Fotomaterial für Vertrieb
- Mehrsprachige Sales-Präsentationen und Partner-Unterlagen
- Lead-Scoring und CRM-Integration für Vertriebsübergabe
- Tracking-Setup für Attribution und Kampagnen-Optimierung

## Umsetzung

### Website & UX

Kompletter Relaunch mit Fokus auf B2B-Conversion. Kundenorientierte Informationsarchitektur, thematische Landing-Pages pro Produktlinie, Mobile-First-Design, schnelle Ladezeiten. Output: B2B-optimierte Website mit 15+ Landing-Pages, integrierte Lead-Formulare, mehrsprachige Struktur.

### Content / SEO

Content-Strategie für organische Sichtbarkeit und Lead-Generierung. Keyword-Research für B2B-Kaufentscheidungen, Content-Produktion entlang der Buyer Journey, technische SEO-Optimierung. Output: 20+ SEO-optimierte Seiten, Blog-Artikel zu Fachthemen, FAQ-Bereiche.

### Content-Produktion

Professionelles Video- und Fotomaterial für digitale und Offline-Nutzung. Produktvideo-Drehs vor Ort, Studiofotografie der Produktlinien, Post-Produktion für verschiedene Formate. Output: 5+ Produktvideos, 100+ Produktfotos, Social-Media-Assets.

### Sales Enablement

Vertriebsmaterialien für internationale Partner-Akquise. Erstellung mehrsprachiger Präsentationen, Partner-Onboarding-Materialien, Schulungsunterlagen. Output: Sales-Deck in 4 Sprachen, Partner-Broschüren, Produktdatenblätter.

### Tracking & Lead-Handling

Lückenlose Erfassung und Qualifizierung von Leads. GA4-Setup mit Conversion-Tracking, CRM-Anbindung, Lead-Scoring-Modell, automatisierte Vertriebsbenachrichtigungen. Output: Dashboard für Marketing-Attribution, definierter Lead-Übergabe-Prozess, wöchentliches Reporting.

## Deliverables

- B2B-optimierte Website mit 15+ thematischen Landing-Pages
- 5 professionelle Produktvideos (Imagefilm + Produktdemos)
- 100+ Produktfotos für Web und Print
- SEO-Content-Paket (20+ optimierte Seiten)
- Mehrsprachige Sales-Präsentationen (DE, EN, PL, CZ)
- Partner-Onboarding-Materialien
- Lead-Scoring-Modell und CRM-Integration
- GA4 Tracking-Setup mit Custom Events
- Monatliches Performance-Reporting
- Moderation von 50+ B2B-Partner-Meetings

## Ergebnisse

### Was hat am stärksten gewirkt?

Die Kombination aus thematischen Landing-Pages und gezielter Lead-Generierung in neuen Märkten war der größte Hebel. Statt einer generischen Unternehmenswebsite fanden Entscheider jetzt exakt die Informationen, die sie in ihrer Kaufphase brauchten. Die professionellen Produktvideos erhöhten die Verweildauer und Conversion-Rate messbar. Besonders wirkungsvoll: Die direkte Moderation von B2B-Meetings durch GoldenWing – das beschleunigte den Sales-Cycle erheblich.

## Learnings

- **Wenn** die Website nur informiert statt konvertiert, **dann** bleiben Leads auf der Strecke, **weil** B2B-Entscheider klare nächste Schritte brauchen.
- **Wenn** Content nicht auf die Buyer Journey abgestimmt ist, **dann** verpufft Traffic wirkungslos, **weil** Besucher nicht zu Leads werden.
- **Wenn** Video-Content professionell produziert wird, **dann** steigt die Conversion-Rate messbar, **weil** komplexe Produkte erlebbar werden.
- **Wenn** Lead-Generierung und Sales-Enablement aus einer Hand kommen, **dann** verkürzt sich der Sales-Cycle, **weil** Übergaben reibungslos funktionieren.
- **Wenn** internationale Märkte systematisch erschlossen werden, **dann** skaliert das Wachstum, **weil** lokalisierte Kampagnen relevanter sind.

## Nächste Schritte

- Expansion der Content-Strategie auf weitere Produktkategorien
- Ausbau der Paid-Kampagnen in zusätzlichen CEE-Märkten
- Implementierung von Marketing Automation für Lead-Nurturing
- A/B-Testing der Landing-Pages zur Conversion-Optimierung
- Entwicklung eines Partner-Portals für Self-Service
`

const caseStudyEN = `## Key Insights from This Project

Domoferm, a leading European steel door manufacturer, was not using its digital channels for active lead generation. GoldenWing developed an integrated strategy combining website relaunch, content production, and lead engineering. The result: +180% qualified leads and expansion into 8 European markets.

## Overview

We transformed Domoferm's digital presence from a product brochure into a lead machine, enabling the sales team to receive qualified inquiries from new markets, achieving +180% more leads while expanding into 8 countries.

## Starting Point

### What Was Holding Them Back?

- Website was purely informational – no conversion focus, no lead capture mechanisms
- Decision-makers couldn't find relevant content or found it too late in the buying process
- No systematic approach to digital B2B lead generation
- Content existed but wasn't aligned with the buyer journey
- International potential remained untapped – no localized campaigns

### Why Was This Critical?

Domoferm had excellent products and decades of expertise but was losing potential partners daily to digitally better-positioned competitors. The sales pipeline depended on trade shows and personal contacts – not scalable. Without digital lead generation, growth in new markets was left to chance.

## Goals & KPIs

### Business Objectives

- Establish digital channels as the primary lead generator
- Generate qualified B2B inquiries from existing and new markets
- Equip the sales team with better leads and sales materials
- Systematize international partner acquisition

## Approach

### Conversion Architecture

- Website structure aligned to B2B buyer journey (Awareness → Consideration → Decision)
- Thematic landing pages for product categories and use cases
- Clear CTAs and lead capture forms at strategic touchpoints
- Gated content for qualified lead capture

### Demand Generation (SEO/Paid)

- Keyword strategy for B2B-relevant search terms in DACH and CEE
- Content clusters around core topics (steel doors, security, fire protection)
- Targeted campaigns for B2B partner acquisition in target markets
- LinkedIn and Google Ads for Account-Based Marketing

### Sales Enablement & Tracking

- Professional product videos and photo material for sales
- Multi-language sales presentations and partner materials
- Lead scoring and CRM integration for sales handover
- Tracking setup for attribution and campaign optimization

## Implementation

### Website & UX

Complete relaunch with focus on B2B conversion. Customer-oriented information architecture, thematic landing pages per product line, mobile-first design, fast load times. Output: B2B-optimized website with 15+ landing pages, integrated lead forms, multi-language structure.

### Content / SEO

Content strategy for organic visibility and lead generation. Keyword research for B2B purchase decisions, content production along the buyer journey, technical SEO optimization. Output: 20+ SEO-optimized pages, blog articles on specialist topics, FAQ sections.

### Content Production

Professional video and photo material for digital and offline use. Product video shoots on-site, studio photography of product lines, post-production for various formats. Output: 5+ product videos, 100+ product photos, social media assets.

### Sales Enablement

Sales materials for international partner acquisition. Creation of multi-language presentations, partner onboarding materials, training documents. Output: Sales deck in 4 languages, partner brochures, product data sheets.

### Tracking & Lead Handling

Complete lead capture and qualification. GA4 setup with conversion tracking, CRM integration, lead scoring model, automated sales notifications. Output: Marketing attribution dashboard, defined lead handover process, weekly reporting.

## Deliverables

- B2B-optimized website with 15+ thematic landing pages
- 5 professional product videos (brand film + product demos)
- 100+ product photos for web and print
- SEO content package (20+ optimized pages)
- Multi-language sales presentations (DE, EN, PL, CZ)
- Partner onboarding materials
- Lead scoring model and CRM integration
- GA4 tracking setup with custom events
- Monthly performance reporting
- Moderation of 50+ B2B partner meetings

## Results

### What Had the Biggest Impact?

The combination of thematic landing pages and targeted lead generation in new markets was the biggest lever. Instead of a generic corporate website, decision-makers now found exactly the information they needed at their buying stage. Professional product videos measurably increased dwell time and conversion rate. Particularly effective: GoldenWing's direct moderation of B2B meetings – this significantly accelerated the sales cycle.

## Learnings

- **If** the website only informs instead of converts, **then** leads are lost, **because** B2B decision-makers need clear next steps.
- **If** content isn't aligned with the buyer journey, **then** traffic is wasted, **because** visitors don't become leads.
- **If** video content is professionally produced, **then** conversion rate increases measurably, **because** complex products become tangible.
- **If** lead generation and sales enablement come from one source, **then** the sales cycle shortens, **because** handovers work smoothly.
- **If** international markets are systematically developed, **then** growth scales, **because** localized campaigns are more relevant.

## Next Steps

- Expand content strategy to additional product categories
- Scale paid campaigns in additional CEE markets
- Implement marketing automation for lead nurturing
- A/B testing of landing pages for conversion optimization
- Development of a partner portal for self-service
`

async function main() {
  console.log('Starting Domoferm Case Study Update...\n')

  const payload = await getPayload({ config })

  // Convert markdown to Lexical format
  const lexicalContentDE = markdownToLexical(caseStudyDE)
  const lexicalContentEN = markdownToLexical(caseStudyEN)

  // Find Domoferm project
  const projects = await payload.find({
    collection: 'projects',
    where: { slug: { equals: 'domoferm' } },
    limit: 1,
  })

  if (projects.docs.length === 0) {
    console.error('Domoferm project not found!')
    process.exit(1)
  }

  const projectId = projects.docs[0].id

  // Update German version
  await payload.update({
    collection: 'projects',
    id: projectId,
    locale: 'de',
    data: {
      longDescription: lexicalContentDE,
    },
  })
  console.log('✅ Updated German Case Study')

  // Update English version
  await payload.update({
    collection: 'projects',
    id: projectId,
    locale: 'en',
    data: {
      longDescription: lexicalContentEN,
    },
  })
  console.log('✅ Updated English Case Study')

  console.log('\nDomoferm Case Study update completed!')
  console.log('View at: /de/projekte/domoferm')

  process.exit(0)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
