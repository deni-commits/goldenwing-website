import { getPayload } from 'payload'
import config from '@payload-config'

// Helper function to convert markdown to Lexical format
function markdownToLexical(markdown: string) {
  const lines = markdown.trim().split('\n')
  const children: unknown[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (line.trim() === '') {
      i++
      continue
    }

    // Headings
    if (line.startsWith('### ')) {
      children.push({
        type: 'heading',
        tag: 'h3',
        children: [{ type: 'text', text: line.slice(4).trim(), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      i++
      continue
    }

    if (line.startsWith('## ')) {
      children.push({
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: line.slice(3).trim(), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
      i++
      continue
    }

    // Lists (unordered)
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const listItems: unknown[] = []
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        const itemText = lines[i].trim().slice(2)
        listItems.push({
          type: 'listitem',
          children: [{ type: 'text', text: itemText, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          value: listItems.length + 1,
          version: 1,
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
        start: 1,
        tag: 'ul',
        version: 1,
      })
      continue
    }

    // Numbered lists
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: unknown[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^\d+\.\s/, '')
        listItems.push({
          type: 'listitem',
          children: [{ type: 'text', text: itemText, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          value: listItems.length + 1,
          version: 1,
        })
        i++
      }
      children.push({
        type: 'list',
        listType: 'number',
        children: listItems,
        direction: 'ltr',
        format: '',
        indent: 0,
        start: 1,
        tag: 'ol',
        version: 1,
      })
      continue
    }

    // Checkboxes
    if (line.trim().startsWith('✅ ')) {
      children.push({
        type: 'paragraph',
        children: [{ type: 'text', text: line.trim(), format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      })
      i++
      continue
    }

    // Tables - convert to formatted text representation
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim())
        i++
      }

      // Parse table: first line is header, second is separator, rest is data
      if (tableLines.length >= 2) {
        const parseRow = (row: string): string[] => {
          return row.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
        }

        const headers = parseRow(tableLines[0])
        const dataRows = tableLines.slice(2).map(parseRow) // Skip header and separator

        // Create header row
        const headerText = headers.join(' │ ')
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', text: '┌' + '─'.repeat(headerText.length + 2) + '┐', format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        })
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', text: '│ ' + headerText + ' │', format: 1, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        })
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', text: '├' + '─'.repeat(headerText.length + 2) + '┤', format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        })

        // Create data rows
        for (const row of dataRows) {
          const rowText = row.join(' │ ')
          children.push({
            type: 'paragraph',
            children: [{ type: 'text', text: '│ ' + rowText + ' │', format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          })
        }

        children.push({
          type: 'paragraph',
          children: [{ type: 'text', text: '└' + '─'.repeat(headerText.length + 2) + '┘', format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        })

        // Add empty line after table
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', text: '', format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        })
      }
      continue
    }

    // Code blocks
    if (line.trim().startsWith('```')) {
      i++ // skip opening
      let code = ''
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code += lines[i] + '\n'
        i++
      }
      i++ // skip closing
      children.push({
        type: 'paragraph',
        children: [{ type: 'text', text: code.trim(), format: 16, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      })
      continue
    }

    // Bold text handling - **text**
    const processText = (text: string) => {
      const parts: unknown[] = []
      const regex = /\*\*([^*]+)\*\*/g
      let lastIndex = 0
      let match

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ type: 'text', text: text.slice(lastIndex, match.index), format: 0, mode: 'normal', style: '', detail: 0, version: 1 })
        }
        parts.push({ type: 'text', text: match[1], format: 1, mode: 'normal', style: '', detail: 0, version: 1 }) // format: 1 = bold
        lastIndex = regex.lastIndex
      }

      if (lastIndex < text.length) {
        parts.push({ type: 'text', text: text.slice(lastIndex), format: 0, mode: 'normal', style: '', detail: 0, version: 1 })
      }

      return parts.length > 0 ? parts : [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }]
    }

    // Regular paragraph
    children.push({
      type: 'paragraph',
      children: processText(line),
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      version: 1,
    })
    i++
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

// SEO-optimierte Blog-Artikel basierend auf SEMRUSH Keyword-Recherche
const blogPosts = [
  // WEBDESIGN ARTICLES
  {
    title: 'Was kostet eine professionelle Website in 2025?',
    slug: 'was-kostet-eine-professionelle-website',
    excerpt: 'Transparente Preisübersicht für Websites in Österreich: Von der einfachen Unternehmensseite bis zum komplexen Webshop. Erfahren Sie, welche Faktoren den Preis beeinflussen.',
    categorySlug: 'webdesign',
    readTime: 8,
    featured: true,
    seo: {
      metaTitle: 'Was kostet eine professionelle Website 2025? | Preise & Faktoren',
      metaDescription: 'Website Kosten 2025: Unternehmenswebsite €3.000-5.000, Webshop €8.000-15.000+. Alle Preisfaktoren erklärt. Jetzt informieren!',
      keywords: 'website kosten, webdesign preise, homepage erstellen lassen kosten, webdesign stundensatz',
    },
    content: `
## Was kostet eine professionelle Website?

Die Kosten für eine professionelle Website variieren stark – von €3.000 für eine einfache Unternehmensseite bis zu €50.000+ für komplexe Web-Anwendungen. In diesem Artikel erklären wir alle Preisfaktoren transparent.

### Preisübersicht nach Website-Typ

| Website-Typ | Preisrahmen | Dauer |
|-------------|-------------|-------|
| Einfache Unternehmenswebsite | €3.000 - 5.000 | 4-6 Wochen |
| Website mit CMS & Blog | €5.000 - 8.000 | 6-8 Wochen |
| WooCommerce Webshop | €8.000 - 15.000 | 8-12 Wochen |
| Custom Web-Application | €15.000 - 50.000+ | 3-6 Monate |

### Faktoren, die den Preis beeinflussen

**1. Umfang und Anzahl der Seiten**
Jede zusätzliche Seite bedeutet mehr Design- und Entwicklungsaufwand. Eine 5-Seiten-Website kostet weniger als eine mit 20 Seiten.

**2. Design-Komplexität**
- Template-basiert: günstiger, aber weniger individuell
- Custom Design: einzigartig, aber aufwendiger
- Animationen und Interaktionen: erhöhen den Preis

**3. Funktionen und Features**
- Kontaktformulare: €200-500
- Newsletter-Integration: €300-600
- Booking-System: €1.000-3.000
- Mehrsprachigkeit: +30-50% Aufpreis

**4. CMS und Technologie**
- WordPress: bewährt, viele Plugins
- Webflow: visueller Editor, schnell
- Headless CMS: flexibel, zukunftssicher

### Was ist im Preis inkludiert?

Bei GoldenWing sind standardmäßig enthalten:
- Responsive Design (Desktop, Tablet, Mobile)
- SEO-Grundoptimierung
- SSL-Zertifikat
- DSGVO-konforme Gestaltung
- 30 Tage Support nach Launch

### Laufende Kosten

Neben den Entwicklungskosten fallen monatliche Kosten an:
- Hosting: €20-100/Monat
- Domain: €10-20/Jahr
- Wartung & Updates: €50-200/Monat
- SSL-Zertifikat: oft im Hosting inkludiert

### Unser Rat

Investieren Sie in Qualität. Eine billige Website für €500 wird Sie langfristig mehr kosten – durch schlechte Performance, Sicherheitsprobleme und entgangene Kunden.

**Nächster Schritt:** Kontaktieren Sie uns für ein kostenloses Erstgespräch und ein individuelles Angebot.
    `,
  },
  {
    title: 'WordPress oder Webflow: Welches CMS ist besser?',
    slug: 'wordpress-oder-webflow-vergleich',
    excerpt: 'Der ultimative Vergleich: WordPress vs. Webflow in 2025. Wir analysieren Kosten, Flexibilität, SEO und Benutzerfreundlichkeit für Ihre Entscheidung.',
    categorySlug: 'webdesign',
    readTime: 10,
    featured: false,
    seo: {
      metaTitle: 'WordPress vs Webflow 2025: Der ultimative Vergleich',
      metaDescription: 'WordPress oder Webflow? Vergleich von Kosten, SEO, Flexibilität und Benutzerfreundlichkeit. Welches CMS passt zu Ihrem Projekt?',
      keywords: 'wordpress vs webflow, cms vergleich, webflow oder wordpress, bestes cms 2025',
    },
    content: `
## WordPress vs. Webflow: Der große Vergleich

Die Wahl des richtigen CMS ist entscheidend für den Erfolg Ihrer Website. Beide Plattformen haben ihre Stärken – hier finden Sie alle Fakten für Ihre Entscheidung.

### Quick Facts

| Kriterium | WordPress | Webflow |
|-----------|-----------|---------|
| Marktanteil | 43% aller Websites | ~1% |
| Lernkurve | Mittel | Steil |
| Kosten (monatlich) | €0-50 + Hosting | €14-212 |
| SEO | Sehr gut (mit Plugins) | Sehr gut (nativ) |
| Performance | Variabel | Sehr gut |

### Detaillierter Feature-Vergleich

| Feature | WordPress | Webflow | Gewinner |
|---------|-----------|---------|----------|
| Visueller Editor | Gutenberg (gut) | Webflow Designer (exzellent) | Webflow |
| Code-Zugang | Vollständig | Eingeschränkt | WordPress |
| Plugins/Erweiterungen | 60.000+ | ~100 Apps | WordPress |
| E-Commerce | WooCommerce (sehr flexibel) | Webflow Ecommerce (begrenzt) | WordPress |
| Blog-Funktionen | Ursprünglicher Fokus | Solide CMS-Funktionen | WordPress |
| Animationen | Mit Plugins | Nativ, exzellent | Webflow |
| Hosting | Selbst wählen | Inklusive (AWS) | Unentschieden |
| Sicherheit | Selbst verwalten | Automatisch | Webflow |
| Backup | Plugin nötig | Automatisch | Webflow |
| Ladezeit | 2-5s (optimiert) | 0.5-1.5s | Webflow |

### Kosten im Detail

| Kostenfaktor | WordPress | Webflow |
|--------------|-----------|---------|
| CMS-Lizenz | Kostenlos | €14-39/Monat (Site) |
| Hosting | €5-50/Monat | Inklusive |
| Domain | €10-20/Jahr | €10-20/Jahr |
| Premium-Theme | €50-200 (einmalig) | Kostenlos |
| Wichtige Plugins | €0-200/Jahr | Meist inklusive |
| SSL-Zertifikat | €0-100/Jahr | Inklusive |
| Wartung/Updates | €50-200/Monat oder DIY | Automatisch |
| **Gesamtkosten Jahr 1** | **€500-2.000** | **€200-500** |
| **Laufende Kosten/Jahr** | **€300-1.500** | **€170-470** |

### WordPress: Der Klassiker

**Vorteile:**
- Riesiges Plugin-Ökosystem (60.000+ Plugins)
- Große Community und Ressourcen
- Günstig für einfache Websites
- WooCommerce für E-Commerce
- Vollständige Kontrolle über Code

**Nachteile:**
- Sicherheitsrisiken ohne Updates
- Performance-Probleme bei vielen Plugins
- Wartungsaufwand
- Plugin-Abhängigkeit

**Ideal für:**
- Blogs und Content-Websites
- E-Commerce mit WooCommerce
- Websites mit vielen Custom Features
- Budget-bewusste Projekte

### Webflow: Der Moderne

**Vorteile:**
- Visueller Editor ohne Code
- Exzellente Performance out-of-the-box
- Hosting inklusive
- Automatische Backups
- Sauberer, semantischer Code

**Nachteile:**
- Höhere monatliche Kosten
- Steile Lernkurve
- Weniger Drittanbieter-Integrationen
- E-Commerce limitiert

**Ideal für:**
- Marketing-Websites
- Portfolio-Seiten
- Design-fokussierte Projekte
- Agenturen und Freelancer

### Unsere Empfehlung

**Wählen Sie WordPress, wenn:**
- Sie einen Blog mit vielen Artikeln planen
- Sie WooCommerce für Ihren Shop brauchen
- Budget eine große Rolle spielt
- Sie viele spezifische Funktionen benötigen

**Wählen Sie Webflow, wenn:**
- Design und Animationen wichtig sind
- Sie schnelle Ladezeiten priorisieren
- Sie wenig technisches Know-how haben
- Marketing-Websites im Fokus stehen

### Fazit

Es gibt kein "besser" – nur "besser für Ihr Projekt". Wir beraten Sie gerne, welche Plattform zu Ihren Anforderungen passt.
    `,
  },
  {
    title: 'Core Web Vitals optimieren: Der komplette Guide 2025',
    slug: 'core-web-vitals-optimieren-guide',
    excerpt: 'Alles über LCP, FID und CLS: Wie Sie Ihre Website für Google\'s Core Web Vitals optimieren und bessere Rankings erzielen.',
    categorySlug: 'seo',
    readTime: 12,
    featured: true,
    seo: {
      metaTitle: 'Core Web Vitals optimieren 2025 | LCP, FID, CLS Guide',
      metaDescription: 'Core Web Vitals verbessern: LCP unter 2.5s, FID unter 100ms, CLS unter 0.1. Schritt-für-Schritt Anleitung für bessere Rankings.',
      keywords: 'core web vitals optimieren, lcp verbessern, cls reduzieren, website speed optimierung',
    },
    content: `
## Core Web Vitals: Was Sie wissen müssen

Core Web Vitals sind Googles Metriken für die Nutzererfahrung. Sie beeinflussen direkt Ihre Rankings – hier erfahren Sie, wie Sie alle drei Metriken optimieren.

### Die drei Core Web Vitals

**1. LCP (Largest Contentful Paint)**
- Misst: Ladezeit des größten sichtbaren Elements
- Ziel: Unter 2.5 Sekunden
- Gut: < 2.5s | Verbesserungswürdig: 2.5-4s | Schlecht: > 4s

**2. FID (First Input Delay) / INP (Interaction to Next Paint)**
- Misst: Reaktionszeit auf erste Interaktion
- Ziel: Unter 100ms
- Gut: < 100ms | Verbesserungswürdig: 100-300ms | Schlecht: > 300ms

**3. CLS (Cumulative Layout Shift)**
- Misst: Visuelle Stabilität (Layout-Verschiebungen)
- Ziel: Unter 0.1
- Gut: < 0.1 | Verbesserungswürdig: 0.1-0.25 | Schlecht: > 0.25

### LCP optimieren

**Hauptursachen für schlechten LCP:**
- Langsames Server-Response
- Große, unkomprimierte Bilder
- Render-blockierende Ressourcen
- Client-Side Rendering

**Lösungen:**
1. **Bilder optimieren**
   - WebP-Format verwenden
   - Lazy Loading für below-the-fold
   - Responsive Images mit srcset

2. **Server verbessern**
   - CDN nutzen (Cloudflare, Fastly)
   - Caching aktivieren
   - Hosting upgraden

3. **Kritischen Pfad optimieren**
   - CSS inlinen für above-the-fold
   - JavaScript defer/async
   - Preload für wichtige Ressourcen

### CLS vermeiden

**Hauptursachen:**
- Bilder ohne Dimensionen
- Dynamisch geladene Werbung
- Web Fonts (FOUT/FOIT)
- Dynamisch eingefügte Inhalte

**Lösungen:**
1. **Immer Dimensionen angeben**
   \`<img width="800" height="600" ...>\`

2. **Platzhalter reservieren**
   - Aspect-ratio CSS nutzen
   - Skeleton Loading

3. **Fonts optimieren**
   - font-display: swap
   - Preload für wichtige Fonts

### Tools zum Testen

- **PageSpeed Insights**: Googles offizielles Tool
- **WebPageTest**: Detaillierte Wasserfall-Analyse
- **Chrome DevTools**: Lighthouse-Audit
- **Search Console**: Echte Nutzerdaten

### Quick Wins

1. Bilder auf WebP umstellen (-30% Größe)
2. Unused CSS/JS entfernen
3. Browser-Caching aktivieren
4. GZIP/Brotli Kompression
5. Kritisches CSS inlinen

### Fazit

Core Web Vitals sind kein Nice-to-have – sie sind Ranking-Faktor. Investieren Sie in Performance, und Sie werden mit besseren Rankings belohnt.
    `,
  },

  // BRANDING ARTICLES
  {
    title: 'Markenidentität entwickeln: Der komplette Leitfaden',
    slug: 'markenidentitaet-entwickeln-leitfaden',
    excerpt: 'Von der Markenstrategie bis zum fertigen Brand Book: So entwickeln Sie eine einzigartige Markenidentität, die Ihre Zielgruppe begeistert.',
    categorySlug: 'branding',
    readTime: 15,
    featured: true,
    seo: {
      metaTitle: 'Markenidentität entwickeln | Der komplette Guide 2025',
      metaDescription: 'Markenidentität entwickeln in 7 Schritten: Strategie, Positionierung, Visual Identity, Brand Voice. Mit Beispielen und Checkliste.',
      keywords: 'markenidentität entwickeln, brand identity, markenstrategie, corporate identity',
    },
    content: `
## Was ist Markenidentität?

Die Markenidentität ist das Gesamtbild Ihrer Marke – wie Sie wahrgenommen werden wollen. Sie umfasst visuelle Elemente (Logo, Farben), verbale Elemente (Tone of Voice, Messaging) und die Markenwerte.

### Corporate Identity vs. Brand Identity vs. Corporate Design

| Begriff | Definition | Umfasst | Beispiel |
|---------|------------|---------|----------|
| Corporate Identity | Gesamtheit der Unternehmensidentität | Werte, Kultur, Kommunikation, Design | Unternehmenskultur bei Apple |
| Brand Identity | Wie die Marke wahrgenommen werden will | Logo, Farben, Stimme, Werte | Apple's "Think Different" |
| Corporate Design | Visueller Teil der Identität | Logo, Farben, Typografie | Apple's minimalistisches Design |

### Die 7 Bausteine der Markenidentität

| Baustein | Zweck | Lieferables |
|----------|-------|-------------|
| Vision & Mission | Richtung & Zweck | Mission Statement, Vision Board |
| Markenwerte | Handlungsleitlinien | 3-5 Kernwerte |
| Positionierung | Differenzierung | Positioning Statement, USP |
| Visual Identity | Wiedererkennung | Logo, Farben, Typografie |
| Brand Voice | Kommunikationsstil | Tone of Voice Guidelines |
| Messaging | Kernbotschaften | Tagline, Key Messages |
| Guidelines | Konsistenz | Brand Book, Style Guide |

**1. Markenvision & Mission**
- Vision: Wo wollen Sie hin?
- Mission: Warum existiert Ihr Unternehmen?
- Beispiel Apple: "Think Different" – Innovation als Kern

**2. Markenwerte**
Die 3-5 Kernwerte, die Ihre Marke ausmachen:
- Authentizität
- Innovation
- Qualität
- Nachhaltigkeit
- Kundenorientierung

**3. Zielgruppe & Positionierung**
- Wer ist Ihre ideale Zielgruppe?
- Was unterscheidet Sie vom Wettbewerb?
- Welches Problem lösen Sie?

**4. Visual Identity**
- Logo (Wortmarke, Bildmarke, Kombination)
- Farbpalette (Primary, Secondary, Accent)
- Typografie (Headline, Body, Akzent)
- Bildsprache (Fotostil, Illustrationen)

**5. Brand Voice**
- Tonalität (formal/informell)
- Sprache (Fachbegriffe ja/nein)
- Persönlichkeit (freundlich, professionell, verspielt)

**6. Brand Messaging**
- Tagline/Slogan
- Elevator Pitch
- Key Messages pro Zielgruppe

**7. Brand Guidelines**
Dokumentation aller Elemente für konsistente Anwendung.

### Der Prozess in 5 Schritten

| Phase | Dauer | Aktivitäten | Output |
|-------|-------|-------------|--------|
| 1. Research | 2-3 Wochen | Markt-, Wettbewerbsanalyse, Interviews | Insights Report |
| 2. Strategie | 1-2 Wochen | Positionierung, USP, Values | Brand Strategy |
| 3. Kreation | 3-4 Wochen | Logo, Farben, Typografie | Visual Identity |
| 4. Ausarbeitung | 2-3 Wochen | Templates, Voice Guidelines | Design System |
| 5. Dokumentation | 1-2 Wochen | Brand Book, Schulung | Style Guide |
| **Gesamt** | **9-14 Wochen** | | **Komplettes Branding** |

**Schritt 1: Research (2-3 Wochen)**
- Marktanalyse
- Wettbewerbsanalyse
- Kundeninterviews
- Stakeholder-Workshops

**Schritt 2: Strategie (1-2 Wochen)**
- Positionierung definieren
- USP herausarbeiten
- Brand Values festlegen

**Schritt 3: Kreation (3-4 Wochen)**
- Logo-Entwicklung
- Farbpalette & Typografie
- Erste Anwendungen

**Schritt 4: Ausarbeitung (2-3 Wochen)**
- Corporate Design Elemente
- Brand Voice Guidelines
- Templates erstellen

**Schritt 5: Dokumentation (1-2 Wochen)**
- Brand Book erstellen
- Team-Schulung
- Rollout planen

### Kosten einer Markenidentität

| Leistung | Preisrahmen |
|----------|-------------|
| Logo Design | €1.200 - 4.000 |
| Visual Identity komplett | €3.000 - 8.000 |
| Brand Strategy | €2.500 - 8.000 |
| Brand Guidelines | €2.500 - 8.000 |
| Komplettes Branding-Paket | €8.000 - 25.000 |

### Häufige Fehler vermeiden

1. **Trends statt Zeitlosigkeit**: Logos sollten 10+ Jahre halten
2. **Zielgruppe ignorieren**: Design für Kunden, nicht für sich
3. **Inkonsistenz**: Ohne Guidelines verliert die Marke Wirkung
4. **Zu schnell starten**: Strategie vor Design

### Fazit

Eine starke Markenidentität ist kein Luxus – sie ist Ihre Visitenkarte im Markt. Investieren Sie in eine professionelle Entwicklung, und Sie werden langfristig profitieren.
    `,
  },

  // SEO ARTICLES
  {
    title: 'SEO für Anfänger: Der ultimative Einsteiger-Guide 2025',
    slug: 'seo-fuer-anfaenger-guide',
    excerpt: 'Suchmaschinenoptimierung verständlich erklärt: Von Keywords bis Backlinks – alles, was Sie für bessere Google-Rankings wissen müssen.',
    categorySlug: 'seo',
    readTime: 18,
    featured: false,
    seo: {
      metaTitle: 'SEO für Anfänger 2025 | Der komplette Einsteiger-Guide',
      metaDescription: 'SEO lernen: Keywords, On-Page, Off-Page, technisches SEO. Schritt-für-Schritt Anleitung für bessere Google-Rankings.',
      keywords: 'seo für anfänger, seo lernen, suchmaschinenoptimierung guide, seo grundlagen',
    },
    content: `
## Was ist SEO?

SEO (Search Engine Optimization) umfasst alle Maßnahmen, die dazu beitragen, dass Ihre Website in den organischen Suchergebnissen von Google besser gefunden wird.

### SEO vs. SEA vs. SMM im Vergleich

| Kanal | Kosten | Zeitrahmen | Nachhaltigkeit | Conversion-Rate |
|-------|--------|------------|----------------|-----------------|
| SEO (Organisch) | Mittel | 3-12 Monate | Sehr hoch | 2-5% |
| SEA (Google Ads) | Hoch | Sofort | Niedrig | 1-3% |
| Social Media | Niedrig-Mittel | 1-6 Monate | Mittel | 0.5-2% |
| E-Mail Marketing | Niedrig | Sofort | Hoch | 2-5% |

### Warum ist SEO wichtig?

- 53% des Website-Traffics kommt von organischer Suche
- 75% der Nutzer klicken nie auf Seite 2
- SEO-Traffic ist "kostenlos" (nach anfänglicher Investition)
- Nutzer mit Suchintention konvertieren besser

### Die 3 Säulen des SEO

| Säule | Fokus | Wichtigste Maßnahmen | Zeitaufwand |
|-------|-------|---------------------|-------------|
| Technisches SEO | Website-Infrastruktur | Core Web Vitals, Mobile, SSL | Einmalig + Wartung |
| On-Page SEO | Einzelne Seiten | Keywords, Meta Tags, Content | Laufend |
| Off-Page SEO | Externe Signale | Backlinks, Brand Mentions | Laufend |

**1. Technisches SEO**
Die technische Basis Ihrer Website:
- Crawlability (kann Google Ihre Seite lesen?)
- Indexierung (ist Ihre Seite im Index?)
- Page Speed (Core Web Vitals)
- Mobile-Friendliness
- HTTPS/SSL
- Sitemap & Robots.txt

**2. On-Page SEO**
Optimierung einzelner Seiten:
- Keyword-Optimierung
- Title Tags & Meta Descriptions
- Heading-Struktur (H1, H2, H3)
- Content-Qualität
- Interne Verlinkung
- Bilder-SEO (Alt-Tags)

**3. Off-Page SEO**
Signale von außerhalb Ihrer Website:
- Backlinks (Links von anderen Websites)
- Domain Authority
- Brand Mentions
- Social Signals

### Keyword-Recherche: Der erste Schritt

**Keyword-Tools im Vergleich:**

| Tool | Preis | Stärken | Schwächen |
|------|-------|---------|-----------|
| Google Keyword Planner | Kostenlos | Echte Google-Daten | Nur für Ads-Nutzer |
| Ubersuggest | €0-29/Monat | Einfach, günstig | Begrenzte Daten |
| SEMRUSH | €120-450/Monat | Umfassend, genau | Teuer |
| Ahrefs | €99-999/Monat | Beste Backlink-Daten | Komplex |
| KWFinder | €49-129/Monat | Intuitive UI | Weniger Features |

**Worauf achten:**
- Suchvolumen (wie oft gesucht)
- Keyword Difficulty (wie schwer zu ranken)
- Search Intent (was will der Suchende?)

**Keyword-Typen im Überblick:**

| Keyword-Typ | Beispiel | Suchvolumen | Difficulty | Conversion |
|-------------|----------|-------------|------------|------------|
| Short-tail | "Webdesign" | Sehr hoch | Sehr schwer | Niedrig |
| Mid-tail | "Webdesign Wien" | Mittel | Mittel | Mittel |
| Long-tail | "Webdesign Agentur Wien Kosten" | Niedrig | Leicht | Hoch |
| Transaktional | "Webdesign beauftragen" | Niedrig | Mittel | Sehr hoch |

### On-Page SEO Checkliste

✅ **Title Tag (50-60 Zeichen)**
Primäres Keyword am Anfang, Brand am Ende

✅ **Meta Description (150-160 Zeichen)**
Keyword enthalten, zum Klicken animieren

✅ **H1 (1x pro Seite)**
Keyword enthalten, nicht identisch mit Title

✅ **Content**
- Mindestens 1000+ Wörter für wichtige Seiten
- Keyword-Dichte 1-2%
- Strukturiert mit H2, H3
- Mehrwert für den Leser

✅ **Bilder**
- Komprimiert (WebP)
- Beschreibende Dateinamen
- Alt-Tags mit Keywords

✅ **Interne Links**
- Zu relevanten Seiten verlinken
- Aussagekräftige Anchor-Texte

### Wie lange dauert SEO?

- **Erste Ergebnisse**: 3-6 Monate
- **Signifikante Rankings**: 6-12 Monate
- **Etablierte Authority**: 12-24 Monate

SEO ist ein Marathon, kein Sprint.

### Google Ranking-Faktoren 2025

| Faktor | Wichtigkeit | Trend |
|--------|-------------|-------|
| Content-Qualität & Relevanz | Sehr hoch | Steigend |
| Backlinks (Qualität) | Hoch | Stabil |
| Core Web Vitals | Hoch | Steigend |
| Mobile-Friendliness | Hoch | Stabil |
| HTTPS | Mittel | Stabil |
| User Experience (UX) | Hoch | Steigend |
| E-E-A-T (Expertise) | Sehr hoch | Steigend |
| Strukturierte Daten | Mittel | Steigend |

### Häufige SEO-Fehler

| Fehler | Problem | Lösung |
|--------|---------|--------|
| Keyword Stuffing | Unnatürlicher Text, Abstrafung | Natürlich schreiben, 1-2% Dichte |
| Duplicate Content | Verwirrung für Google | Canonical Tags, einzigartige Inhalte |
| Langsame Website | Schlechte Rankings, hohe Absprungrate | Core Web Vitals optimieren |
| Keine Mobile-Version | 60% Traffic verloren | Responsive Design |
| Fehlende Meta Tags | Schlechte CTR in SERPs | Title & Description optimieren |

### Nächste Schritte

1. Google Search Console einrichten
2. Website auf technische Fehler prüfen
3. Keyword-Recherche durchführen
4. Content erstellen/optimieren
5. Backlinks aufbauen

Brauchen Sie Unterstützung? Wir helfen Ihnen gerne mit einem SEO-Audit.
    `,
  },

  // DIGITAL STRATEGY
  {
    title: 'Customer Journey Mapping: So verstehen Sie Ihre Kunden',
    slug: 'customer-journey-mapping-guide',
    excerpt: 'Lernen Sie, wie Sie eine Customer Journey Map erstellen und damit die Erfahrung Ihrer Kunden an jedem Touchpoint verbessern.',
    categorySlug: 'ui-ux',
    readTime: 10,
    featured: false,
    seo: {
      metaTitle: 'Customer Journey Mapping | Anleitung & Vorlage 2025',
      metaDescription: 'Customer Journey Map erstellen: Schritt-für-Schritt Anleitung mit Vorlage. Touchpoints identifizieren und optimieren.',
      keywords: 'customer journey mapping, kundenreise, touchpoints, user journey',
    },
    content: `
## Was ist Customer Journey Mapping?

Customer Journey Mapping visualisiert die komplette Reise eines Kunden mit Ihrer Marke – von der ersten Wahrnehmung bis zur Loyalität und darüber hinaus.

### Warum Customer Journey Mapping?

- Kundenprobleme (Pain Points) identifizieren
- Touchpoints optimieren
- Conversion-Rate verbessern
- Kundenzufriedenheit steigern
- Marketing-Budget effektiver einsetzen

### Customer Journey vs. Sales Funnel vs. User Flow

| Konzept | Fokus | Perspektive | Anwendung |
|---------|-------|-------------|-----------|
| Customer Journey | Gesamte Kundenbeziehung | Kunde | Marketing & CX |
| Sales Funnel | Kaufprozess | Unternehmen | Vertrieb |
| User Flow | Einzelne Interaktion | Nutzer | UX Design |
| Buyer Journey | Kaufentscheidung | Käufer | Content Marketing |

### Die 5 Phasen der Customer Journey

| Phase | Englisch | Kundenverhalten | Wichtigste Kanäle | KPIs |
|-------|----------|----------------|-------------------|------|
| Bewusstsein | Awareness | Problem erkennen | SEO, Social Media, Ads | Reichweite, Impressions |
| Überlegung | Consideration | Lösungen recherchieren | Website, Reviews, Blog | Traffic, Verweildauer |
| Entscheidung | Decision | Anbieter wählen | Produktseiten, Kontakt | Leads, Anfragen |
| Bindung | Retention | Produkt nutzen | Onboarding, Support | NPS, Churn Rate |
| Empfehlung | Advocacy | Weiterempfehlen | Bewertungen, Social | Reviews, Referrals |

**1. Awareness (Bewusstsein)**
Der Kunde erkennt ein Problem oder Bedürfnis.
- Touchpoints: Google-Suche, Social Media, Werbung
- Fragen: "Was ist mein Problem?"

**2. Consideration (Überlegung)**
Der Kunde recherchiert Lösungen.
- Touchpoints: Website, Bewertungen, Vergleiche
- Fragen: "Welche Optionen habe ich?"

**3. Decision (Entscheidung)**
Der Kunde wählt eine Lösung.
- Touchpoints: Produktseite, Checkout, Kontakt
- Fragen: "Ist das die richtige Wahl?"

**4. Retention (Bindung)**
Der Kunde nutzt das Produkt/die Dienstleistung.
- Touchpoints: Onboarding, Support, Newsletter
- Fragen: "Erfüllt es meine Erwartungen?"

**5. Advocacy (Empfehlung)**
Der Kunde wird zum Fürsprecher.
- Touchpoints: Bewertungen, Empfehlungen, Social Media
- Fragen: "Würde ich es weiterempfehlen?"

### So erstellen Sie eine Customer Journey Map

**Schritt 1: Persona definieren**
Für wen erstellen Sie die Map?
- Name, Alter, Beruf
- Ziele und Motivationen
- Pain Points und Frustrationen

**Schritt 2: Phasen festlegen**
Welche Phasen durchläuft Ihr Kunde?
- Standardphasen oder angepasst?

**Schritt 3: Touchpoints identifizieren**
Wo interagiert der Kunde mit Ihrer Marke?
- Website, Social Media, Email
- Physische Touchpoints (Laden, Events)

**Schritt 4: Emotionen erfassen**
Wie fühlt sich der Kunde in jeder Phase?
- Positiv, neutral, negativ
- Konkrete Aussagen ("Das frustriert mich")

**Schritt 5: Opportunities identifizieren**
Wo können Sie verbessern?
- Quick Wins
- Langfristige Projekte

### Beispiel: Customer Journey für Webdesign

| Phase | Touchpoint | Aktion | Emotion | Opportunity |
|-------|------------|--------|---------|-------------|
| Awareness | Google | Sucht "Webdesign Wien" | Neugierig | SEO optimieren |
| Consideration | Website | Liest Leistungen | Interessiert | Case Studies |
| Decision | Kontakt | Füllt Formular aus | Gespannt | Schnelle Antwort |
| Retention | Projekt | Wöchentliche Updates | Zufrieden | Transparenz |
| Advocacy | Google | Schreibt Bewertung | Stolz | Review bitten |

### Tools für Customer Journey Mapping

| Tool | Preis | Stärken | Am besten für |
|------|-------|---------|---------------|
| Miro | Kostenlos / €8/Monat | Kollaboration, flexibel | Teams, Workshops |
| Figma | Kostenlos / €12/Monat | Design-fokussiert | Designer |
| Google Sheets | Kostenlos | Einfach, überall | Schnelle Maps |
| UXPressia | €16-36/Monat | Spezialisiert, Templates | Profis |
| Smaply | €19-39/Monat | Personas + Journeys | Agenturen |
| Custellence | €29-99/Monat | Insights-Integration | Enterprise |

### Fazit

Customer Journey Mapping ist keine einmalige Übung – es ist ein lebendiges Dokument, das regelmäßig aktualisiert werden sollte. Starten Sie mit einer einfachen Map und verfeinern Sie sie mit echten Kundendaten.
    `,
  },

  // CONTENT & VISUALS
  {
    title: 'Bilder für Web optimieren: Der komplette Guide',
    slug: 'bilder-fuer-web-optimieren',
    excerpt: 'WebP, Lazy Loading, Kompression: Alles, was Sie über Bildoptimierung für schnelle Websites wissen müssen.',
    categorySlug: 'webdesign',
    readTime: 8,
    featured: false,
    seo: {
      metaTitle: 'Bilder für Web optimieren | WebP, Lazy Loading Guide',
      metaDescription: 'Bilder optimieren für Web: WebP-Format, Kompression, Lazy Loading. Schnellere Ladezeiten und bessere Core Web Vitals.',
      keywords: 'bilder optimieren web, webp, lazy loading, bildkompression',
    },
    content: `
## Warum Bildoptimierung wichtig ist

Bilder machen durchschnittlich 50% der Seitengröße aus. Optimierte Bilder bedeuten:
- Schnellere Ladezeiten
- Bessere Core Web Vitals
- Niedrigere Hosting-Kosten
- Bessere User Experience

### Bildformate im Vergleich

| Format | Verwendung | Vorteile | Nachteile |
|--------|------------|----------|-----------|
| WebP | Fotos & Grafiken | 30% kleiner als JPEG | Ältere Browser |
| JPEG | Fotos | Universell | Kein Transparenz |
| PNG | Grafiken, Transparenz | Verlustfrei | Große Dateien |
| SVG | Icons, Logos | Skalierbar | Nicht für Fotos |
| AVIF | Zukunft | 50% kleiner | Noch nicht überall |

### WebP: Das beste Format 2025

WebP bietet das beste Verhältnis aus Qualität und Dateigröße:
- 30% kleiner als JPEG bei gleicher Qualität
- Unterstützt Transparenz (wie PNG)
- Unterstützt Animation (wie GIF)
- 97% Browser-Unterstützung

### Optimierungs-Checkliste

✅ **Richtige Größe**
- Nicht größer als nötig (max. 1920px Breite)
- Responsive Images mit srcset

✅ **Format wählen**
- Fotos: WebP (Fallback JPEG)
- Grafiken mit Transparenz: WebP oder PNG
- Icons/Logos: SVG

✅ **Kompression**
- Qualität 80-85% für Fotos
- Tools: Squoosh, TinyPNG, ImageOptim

✅ **Lazy Loading**
- Bilder below-the-fold lazy laden
- Native: loading="lazy"
- Above-the-fold: loading="eager"

✅ **Dimensionen angeben**
- Immer width und height
- Verhindert Layout Shifts (CLS)

### Tools für Bildoptimierung

| Tool | Typ | Preis | Stärken | Am besten für |
|------|-----|-------|---------|---------------|
| Squoosh.app | Online | Kostenlos | Alle Formate, live-Preview | Einzelbilder |
| TinyPNG | Online | Freemium | Batch, API | PNG/JPEG |
| ImageOptim | Desktop (Mac) | Kostenlos | Schnell, automatisch | Mac-Nutzer |
| ShortPixel | Plugin | €4.99/Monat | WordPress-Integration | WordPress |
| Cloudinary | Cloud | Freemium | CDN, Auto-Optimierung | Enterprise |
| Next.js Image | Framework | Kostenlos | Automatisch, responsive | Next.js Apps |

### Typische Dateigrößen-Reduktion

| Ursprung | Format | Kompression | Ergebnis | Ersparnis |
|----------|--------|-------------|----------|-----------|
| 500 KB JPEG | WebP | 85% | 150 KB | 70% |
| 300 KB PNG | WebP | Verlustfrei | 120 KB | 60% |
| 2 MB Foto | JPEG | 80% | 200 KB | 90% |
| 100 KB Icon | SVG | Optimiert | 10 KB | 90% |

### Next.js Image Best Practice

\`\`\`jsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Beschreibender Alt-Text"
  width={1200}
  height={630}
  priority // für above-the-fold
  quality={85}
/>
\`\`\`

### Fazit

Bildoptimierung ist einer der einfachsten Wege, Ihre Website schneller zu machen. Nutzen Sie WebP, komprimieren Sie richtig und implementieren Sie Lazy Loading – Ihre Nutzer und Google werden es Ihnen danken.
    `,
  },
  // WORDPRESS SEO GUIDE - High Volume Keyword (1.900)
  {
    title: 'WordPress SEO: Der komplette Guide für bessere Rankings [2025]',
    slug: 'wordpress-seo-guide',
    excerpt: 'WordPress SEO optimieren: Technisches SEO, OnPage-Optimierung, beste Plugins und Content-Strategien. Der ultimative Guide für WordPress-Sichtbarkeit.',
    categorySlug: 'seo',
    readTime: 15,
    featured: true,
    seo: {
      metaTitle: 'WordPress SEO Guide 2025: Komplette Anleitung | GoldenWing',
      metaDescription: 'WordPress Suchmaschinenoptimierung: Technisches SEO, beste Plugins (Rank Math vs Yoast), OnPage-Tipps und Checkliste. Jetzt Rankings verbessern!',
      keywords: 'wordpress suchmaschinenoptimierung, wordpress seo, wordpress seo plugin, yoast vs rank math, wordpress optimieren',
    },
    content: `
## WordPress SEO: Warum es so wichtig ist

WordPress betreibt über 40% aller Websites weltweit. Das bedeutet: Die Konkurrenz ist gross. Ohne gezielte SEO-Optimierung geht Ihre WordPress-Seite in der Masse unter.

Die gute Nachricht: WordPress ist von Haus aus SEO-freundlich. Mit der richtigen Konfiguration und den passenden Plugins können Sie Ihre Sichtbarkeit massiv steigern.

## Technisches WordPress SEO

### Permalink-Struktur optimieren

Die URL-Struktur ist ein grundlegender Ranking-Faktor. WordPress bietet verschiedene Optionen.

**Empfohlen:** Beitragsname (beispiel.de/mein-beitrag/)

So ändern Sie es: Einstellungen - Permalinks - Beitragsname auswählen - Speichern

**Wichtig:** Ändern Sie Permalinks nicht nachträglich ohne 301-Redirects!

### XML Sitemap einrichten

Eine Sitemap hilft Suchmaschinen, alle Seiten zu finden:

- Rank Math und Yoast erstellen Sitemaps automatisch
- URL: ihre-domain.de/sitemap_index.xml
- In Google Search Console einreichen

### Robots.txt konfigurieren

Die robots.txt steuert, was Suchmaschinen crawlen dürfen:

- Standardmässig von WordPress erstellt
- Prüfen unter: ihre-domain.de/robots.txt
- Sensible Bereiche (wp-admin) sind bereits blockiert

### SSL/HTTPS aktivieren

HTTPS ist seit 2014 ein Ranking-Faktor:

- Kostenloses SSL via Lets Encrypt
- In WordPress Einstellungen Allgemein auf https umstellen
- Mixed-Content-Probleme prüfen und beheben

### Page Speed optimieren

**SEHR HOHE PRIORITÄT** — Google nutzt Core Web Vitals als Ranking-Faktor:

- **Hosting:** Managed WordPress Hosting wählen (nicht Billig-Shared-Hosting)
- **Caching:** WP Rocket oder LiteSpeed Cache installieren
- **Bilder:** WebP-Format verwenden, Lazy Loading aktivieren
- **CSS/JS:** Minimieren und kombinieren

**HOHE PRIORITÄT** — Weitere Speed-Massnahmen:

- **CDN:** Cloudflare kostenlos nutzen
- **Datenbank:** Regelmässig optimieren (WP-Optimize)
- **Plugins:** Nur notwendige Plugins behalten

## OnPage SEO für WordPress

### Title Tags optimieren

Der Title ist der wichtigste OnPage-Faktor:

- Primäres Keyword am Anfang
- 50-60 Zeichen optimal
- Klick-Trigger einbauen (Zahlen, Jahr, Adjektive)

**Beispiel:** WordPress SEO Guide 2025: 15 Tipps für bessere Rankings

### Meta Descriptions schreiben

Meta Descriptions beeinflussen die Klickrate (CTR):

- 150-160 Zeichen optimal
- Keyword einbauen
- Call-to-Action am Ende
- Alleinstellungsmerkmal kommunizieren

### Überschriften-Struktur (H1-H6)

**Wichtige Regeln:**

- Nur eine H1 pro Seite (= Seitentitel)
- H2 für Hauptabschnitte
- H3 für Unterabschnitte
- Hierarchie einhalten (keine H4 ohne H3)
- Keywords natürlich einbauen

### Bilder SEO-optimieren

Bilder bieten grosses SEO-Potenzial:

- **Dateiname:** keyword-beschreibung.webp (nicht IMG_1234.jpg)
- **Alt-Text:** Beschreibend mit Keyword
- **Komprimierung:** TinyPNG oder ShortPixel
- **WebP-Format:** 25-30% kleinere Dateigrösse
- **Lazy Loading:** Native WordPress-Funktion nutzen

### Interne Verlinkung

Interne Links verteilen Link Juice und helfen Crawlern:

- Kontextuelle Links im Fliesstext
- 3-5 interne Links pro 1.000 Wörter
- Anchor-Texte variieren
- Wichtige Seiten öfter verlinken

## Die besten WordPress SEO Plugins

### Rank Math vs Yoast SEO: Der Vergleich

**Rank Math - Vorteile:**

- Mehr Funktionen in der kostenlosen Version
- 5 Keywords pro Seite (kostenlos)
- Integriertes Schema Markup
- Schneller (weniger Server-Last)

**Yoast SEO - Vorteile:**

- Etabliert seit 2010
- Mehr Tutorials und Support
- Bewährte Stabilität
- Einfachere Oberfläche

**Unsere Empfehlung:** Rank Math für neue Projekte, Yoast bei bestehenden Installationen nicht wechseln.

### Weitere hilfreiche Plugins

**Performance:**

- WP Rocket (Caching)
- ShortPixel (Bildoptimierung)
- Perfmatters (Script-Management)

**SEO-Erweiterungen:**

- Schema Pro (Advanced Schema)
- Redirection (301 Redirects)
- Broken Link Checker (404-Finder)

**Analytics:**

- MonsterInsights (GA4 Integration)
- Rank Math Analytics (Search Console in WP)

## Content-Optimierung in WordPress

### E-E-A-T für WordPress Content

Google bewertet Content nach Experience, Expertise, Authoritativeness, Trustworthiness:

- **Autor-Bio:** Experten-Profil mit Credentials
- **Quellen:** Externe Links zu autoritativen Seiten
- **Aktualisierung:** Datum zeigen, Content aktuell halten
- **About-Seite:** Team und Unternehmen vorstellen

### Content-Struktur für SEO

**Gut strukturierter WordPress-Content hat:**

- Einleitung mit Keyword (erste 100 Wörter)
- Klare H2/H3-Gliederung
- Kurze Absätze (max. 3-4 Sätze)
- Listen und Aufzählungen
- Bilder/Grafiken alle 300-500 Wörter
- FAQ-Bereich am Ende

### Content-Länge

**Empfohlene Wortanzahl nach Content-Typ:**

- Blog-Artikel: 1.500-2.500 Wörter
- Pillar Pages: 3.000-5.000 Wörter
- Produktseiten: 500-1.000 Wörter
- Landingpages: 1.000-2.000 Wörter

**Wichtig:** Qualität vor Quantität! Kein Wort-Padding.

## WordPress SEO Checkliste

### Vor dem Veröffentlichen

- Fokus-Keyword definiert?
- Title-Tag optimiert (50-60 Zeichen)?
- Meta Description geschrieben (150-160 Zeichen)?
- H1 mit Keyword?
- Bilder mit Alt-Tags?
- 3+ interne Links?
- 1-2 externe Links zu autoritativen Quellen?
- Permalink enthält Keyword?
- Inhalt erfüllt Suchintention?

### Nach dem Veröffentlichen

- In Search Console indexieren lassen
- Social Media teilen
- Interne Links von anderen Artikeln setzen
- Nach 2 Wochen: Rankings prüfen
- Nach 1 Monat: CTR in Search Console analysieren

### Monatliche SEO-Wartung

- Broken Links prüfen (Broken Link Checker)
- Rankings monitoren
- Top-10-Content aktualisieren
- Neue interne Verlinkungsmöglichkeiten finden
- Technische Fehler in Search Console beheben

## Häufige WordPress SEO Fehler

**Diese Fehler kosten Sie Rankings:**

1. **Doppelte Inhalte:** Kategorien/Tags ohne noindex
2. **Langsames Hosting:** Billig-Provider mit 3+ Sekunden Ladezeit
3. **Keine XML Sitemap:** Suchmaschinen finden Seiten nicht
4. **Falsche Permalink-Struktur:** Datum in URLs unnötig
5. **Zu viele Plugins:** 50+ Plugins = Performance-Killer
6. **Kein SSL:** Warnung im Browser = Vertrauensverlust
7. **Dünner Content:** 200-Wörter-Artikel ranken nicht
8. **Fehlende Alt-Tags:** Bilder sind nicht indexierbar

## Fazit: WordPress SEO in 5 Schritten

1. **Technik perfektionieren:** SSL, Speed, Sitemap
2. **SEO-Plugin installieren:** Rank Math oder Yoast
3. **OnPage optimieren:** Title, Meta, Überschriften
4. **Content erstellen:** E-E-A-T, Tiefe, Struktur
5. **Kontinuierlich pflegen:** Updates, Links, Monitoring

WordPress SEO ist ein fortlaufender Prozess. Mit den richtigen Grundlagen und kontinuierlicher Pflege werden Sie bessere Rankings erreichen – Geduld vorausgesetzt.

**Nächster Schritt:** Starten Sie mit der technischen Basis und arbeiten Sie die Checkliste ab.
    `,
  },
  // SEO KOSTEN GUIDE - Money Keyword (1.300 Volume, KD 16)
  {
    title: 'Was kostet SEO? Preise für Suchmaschinenoptimierung 2025',
    slug: 'seo-kosten-guide',
    excerpt: 'SEO Kosten transparent erklärt: Stundensätze, Monatspakete und Projektpreise. Was kostet SEO wirklich und wann lohnt sich die Investition?',
    categorySlug: 'seo',
    readTime: 10,
    featured: false,
    seo: {
      metaTitle: 'SEO Kosten 2025: Was kostet Suchmaschinenoptimierung? | Preise',
      metaDescription: 'SEO Preise: 500-5.000 Euro pro Monat je nach Umfang. Stundensatz 80-150 Euro. Alle Kostenfaktoren erklärt!',
      keywords: 'suchmaschinenoptimierung kosten, seo kosten, seo preise, was kostet seo, seo agentur preise',
    },
    content: `
## Was kostet SEO? Die ehrliche Antwort

Was kostet SEO? Diese Frage hören wir täglich. Die ehrliche Antwort: Es kommt darauf an. Aber dieser Guide gibt Ihnen konkrete Zahlen und zeigt, wovon die Kosten abhängen.

**Kurzfassung der SEO Preise:**

- **Stundensatz Freelancer:** 60-100 Euro/Stunde
- **Stundensatz Agentur:** 80-150 Euro/Stunde
- **Monatliche Betreuung:** 500-5.000+ Euro/Monat
- **Einmaliges SEO Audit:** 500-2.500 Euro

## SEO Preismodelle im Vergleich

### 1. Stundensatz (Time & Material)

**Wann sinnvoll:** Kleinere Projekte, einmalige Optimierungen

**FREELANCER:**

- Junior: 40-60 Euro/Stunde
- Mid-Level: 60-80 Euro/Stunde
- Senior: 80-120 Euro/Stunde

**AGENTUR:**

- Kleine Agentur: 80-100 Euro/Stunde
- Mittelgrosse Agentur: 100-130 Euro/Stunde
- Premium Agentur: 130-180 Euro/Stunde

### 2. Monatliche SEO-Betreuung

**Wann sinnvoll:** Langfristige Optimierung, kontinuierliches Wachstum

**STARTER-PAKET (500-1.000 Euro/Monat):**

- Keyword-Monitoring
- Monatliches Reporting
- Basis-OnPage-Optimierung
- Technische Fehlerbehebung
- Für: Kleine lokale Unternehmen

**BUSINESS-PAKET (1.000-2.500 Euro/Monat):**

- Alles aus Starter
- Content-Optimierung (2-4 Seiten/Monat)
- Linkbuilding (2-4 Links/Monat)
- Wettbewerbsanalyse
- Für: KMUs, regionale Unternehmen

**PREMIUM-PAKET (2.500-5.000+ Euro/Monat):**

- Alles aus Business
- Content-Erstellung (4-8 Artikel/Monat)
- Intensives Linkbuilding
- Technische SEO Betreuung
- Conversion-Optimierung
- Für: E-Commerce, nationale Unternehmen

### 3. Projektbasierte Preise

**Wann sinnvoll:** Einmalige Massnahmen, definierter Scope

- **SEO Audit (komplett):** 500-2.500 Euro
- **Keyword-Recherche:** 300-1.000 Euro
- **OnPage-Optimierung (10 Seiten):** 1.000-3.000 Euro
- **Technisches SEO Setup:** 1.500-4.000 Euro
- **Content-Strategie:** 1.000-3.000 Euro
- **Linkbuilding-Kampagne:** 2.000-10.000 Euro

## Was beeinflusst die SEO Kosten?

### 1. Wettbewerb in Ihrer Branche

**HOHER WETTBEWERB = Höhere Kosten:**

- Finanzen, Versicherungen: 3.000-10.000 Euro/Monat
- E-Commerce (Mode, Elektronik): 2.000-5.000 Euro/Monat
- Rechtsanwälte, Ärzte: 1.500-4.000 Euro/Monat

**NIEDRIGER WETTBEWERB:**

- Lokale Handwerker: 500-1.500 Euro/Monat
- Nischen-B2B: 800-2.000 Euro/Monat

### 2. Aktuelle Website-Situation

**GUT optimierte Website:** Weniger Aufwand nötig
**SCHLECHT optimierte Website:** Grundlagenarbeit erforderlich (höhere Kosten)

**Kostentreiber:**

- Technische Probleme (Ladezeit, Crawling)
- Dünner/veralteter Content
- Negative SEO-Historie (Penalties)
- Keine vorhandene Autorität

### 3. Ihre Ziele und Keywords

**LOKALE Keywords:** Einfacher, günstiger

- Installateur Wien: 500-1.500 Euro/Monat

**NATIONALE Keywords:** Aufwendiger, teurer

- Schuhe kaufen: 3.000-8.000 Euro/Monat

**INTERNATIONALE Keywords:** Sehr aufwendig

- Best CRM Software: 5.000-15.000 Euro/Monat

## SEO Kosten nach Leistung

### SEO Audit

- **Basis-Audit:** 300-500 Euro
- **Komplett-Audit:** 800-1.500 Euro
- **Enterprise-Audit:** 2.000-4.000 Euro

### OnPage Optimierung

- **5 Seiten:** 500-1.000 Euro
- **10-20 Seiten:** 1.000-2.500 Euro
- **50+ Seiten:** 3.000-8.000 Euro

### Content-Erstellung

- **Blog-Artikel (1.500 Wörter):** 200-500 Euro
- **Pillar Page (3.000+ Wörter):** 500-1.200 Euro
- **Landingpage (SEO-optimiert):** 400-1.000 Euro

### Linkbuilding

- **Qualitäts-Backlink:** 150-500 Euro/Link
- **Premium-Link (DA50+):** 500-1.500 Euro/Link
- **Linkbuilding-Kampagne:** 1.000-3.000 Euro/Monat

## Ist günstiges SEO sinnvoll?

**Vorsicht bei Billig-SEO unter 300 Euro/Monat:**

- Oft automatisierte Tools ohne echte Optimierung
- Riskante Linkbuilding-Praktiken
- Keine individuelle Strategie
- Mögliche Google-Abstrafungen

**Das bekommen Sie für 200 Euro/Monat realistisch:**

- Automatisierte Reports
- Basis-Keyword-Tracking
- Gelegentliche Tipps
- Kein aktives Linkbuilding
- Keine Content-Erstellung

**Fazit:** Unter 500 Euro/Monat ist echtes SEO kaum möglich.

## ROI von SEO: Lohnt sich die Investition?

### Beispielrechnung

**Ausgangslage:**

- Website-Traffic: 1.000 Besucher/Monat
- Conversion Rate: 2%
- Durchschnittlicher Auftragswert: 500 Euro

**Aktueller Umsatz:** 20 Kunden x 500 Euro = **10.000 Euro/Monat**

**Nach 12 Monaten SEO (1.500 Euro/Monat Investition):**

- Traffic: 3.000 Besucher/Monat (+200%)
- Conversion Rate: 2.5% (durch besseren Content)
- Durchschnittlicher Auftragswert: 500 Euro

**Neuer Umsatz:** 75 Kunden x 500 Euro = **37.500 Euro/Monat**

**ROI-Rechnung:**

- SEO-Kosten pro Jahr: 18.000 Euro
- Zusätzlicher Umsatz: 330.000 Euro/Jahr
- ROI: 1.733%

### Wann lohnt sich SEO?

**SEO lohnt sich WENN:**

- Ihre Zielgruppe bei Google sucht
- Customer Lifetime Value über 500 Euro
- Sie Zeit für 6-12 Monate Anlaufzeit haben
- Ihr Produkt/Service skalierbar ist

**SEO lohnt sich NICHT WENN:**

- Sehr kurzfristige Ziele (unter 3 Monate)
- Produkt/Service mit niedrigen Margen
- Keine Kapazität für Content-Pflege

## GoldenWing SEO Pakete

### SEO Starter (990 Euro/Monat)

- Technisches SEO Monitoring
- OnPage-Optimierung (2 Seiten/Monat)
- Keyword-Tracking (30 Keywords)
- Monatliches Reporting
- 4 Stunden Support

**Für:** Lokale Unternehmen, Freelancer

### SEO Business (1.990 Euro/Monat)

- Alles aus Starter
- Content-Optimierung (4 Seiten/Monat)
- Linkbuilding (3-5 Links/Monat)
- Wettbewerbsanalyse
- Keyword-Tracking (100 Keywords)
- 8 Stunden Support

**Für:** KMUs, regionale Player

### SEO Premium (3.490 Euro/Monat)

- Alles aus Business
- Content-Erstellung (2 Artikel/Monat)
- Intensives Linkbuilding (8-12 Links/Monat)
- Conversion-Optimierung
- Keyword-Tracking (unlimited)
- Dedizierter Account Manager
- Priority Support

**Für:** E-Commerce, nationale Unternehmen

## Häufige Fragen zu SEO Kosten

### Wie lange dauert SEO?

Erste Ergebnisse nach 3-6 Monaten, signifikante Verbesserungen nach 6-12 Monaten.

### Kann ich SEO selbst machen?

Ja, mit viel Zeitaufwand. Rechnen Sie mit 10-20 Stunden/Woche für professionelle Ergebnisse.

### Einmalkosten vs. laufende Kosten?

SEO ist ein Prozess, keine einmalige Aktion. Budget für mindestens 6-12 Monate einplanen.

### Garantie auf Rankings?

Seriöse Agenturen geben keine Ranking-Garantien. Google-Rankings sind nicht kontrollierbar.

## Fazit: So viel sollten Sie für SEO ausgeben

**Empfehlung nach Unternehmensgrösse:**

- **Solopreneur/Freelancer:** 500-800 Euro/Monat oder DIY
- **Kleines Unternehmen (5-20 MA):** 800-1.500 Euro/Monat
- **Mittelstand (20-100 MA):** 1.500-3.500 Euro/Monat
- **Grossunternehmen:** 3.500-10.000+ Euro/Monat

**Faustformel:** 5-10% Ihres Marketing-Budgets für SEO.

**Nächster Schritt:** Kontaktieren Sie uns für ein kostenloses SEO-Audit und erfahren Sie, welches Budget für Ihre Ziele sinnvoll ist.
    `,
  },
  // GOOGLE ADS KOSTEN - Money Keyword (170 Volume, HIGHEST CPC)
  {
    title: 'Google Ads Kosten: Was kostet Werbung bei Google? [2025]',
    slug: 'google-ads-kosten-guide',
    excerpt: 'Google Ads Kosten verstehen: CPC nach Branche, Mindestbudget, Faktoren die den Preis beeinflussen und Tipps zum Kosten senken.',
    categorySlug: 'marketing',
    readTime: 12,
    featured: false,
    seo: {
      metaTitle: 'Google Ads Kosten 2025: Was kostet Werbung bei Google? | Guide',
      metaDescription: 'Google Ads Preise: 0.50-50 Euro pro Klick je nach Branche. Mindestbudget, Klickpreise nach Industrie und ROI-Berechnung!',
      keywords: 'google ads kosten, google werbung kosten, google ads preise, adwords kosten, google klickpreise',
    },
    content: `
## Was kostet Google Ads?

Die Kurzantwort: 0.50-50+ Euro pro Klick, je nach Branche und Keyword. Aber die Kosten allein sagen wenig aus - entscheidend ist der Return on Investment (ROI).

**Google Ads Kosten Übersicht:**

- **Durchschnittlicher CPC Deutschland/Österreich:** 1-3 Euro
- **B2B-Keywords:** 3-15 Euro/Klick
- **Rechtsanwälte/Finanzen:** 10-50+ Euro/Klick
- **E-Commerce (Mode):** 0.30-1.50 Euro/Klick
- **Lokale Dienstleister:** 1-5 Euro/Klick

## Wie funktioniert die Google Ads Abrechnung?

### Pay-per-Click (CPC)

Sie zahlen nur, wenn jemand auf Ihre Anzeige klickt:

- **Maximales CPC-Gebot:** Was Sie maximal zahlen würden
- **Tatsächlicher CPC:** Oft niedriger als Ihr Maximum
- **Qualitätsfaktor:** Beeinflusst Position UND Preis

### CPM (Cost per Mille)

Für Display-Kampagnen zahlen Sie pro 1.000 Impressionen:

- **Display-Netzwerk:** 0.50-5 Euro CPM
- **YouTube Video Ads:** 3-10 Euro CPM

### CPA (Cost per Acquisition)

Bei Smart Bidding zahlen Sie pro Conversion:

- Sie definieren Ihren Ziel-CPA
- Google optimiert automatisch
- Nur bei genügend Conversion-Daten sinnvoll

## Google Ads Klickpreise nach Branche

### Hohe Klickpreise (10-50+ Euro)

**RECHTSANWÄLTE UND ANWALTSKANZLEIEN:**

- Scheidungsanwalt Wien: 20-40 Euro/Klick
- Arbeitsrecht Anwalt: 15-35 Euro/Klick

**FINANZEN UND VERSICHERUNGEN:**

- Kredit aufnehmen: 15-30 Euro/Klick
- Versicherung vergleichen: 10-25 Euro/Klick

**B2B SOFTWARE:**

- CRM Software: 10-20 Euro/Klick
- ERP System: 15-30 Euro/Klick

### Mittlere Klickpreise (3-10 Euro)

**GESUNDHEIT:**

- Zahnarzt Wien: 3-8 Euro/Klick
- Physiotherapie: 2-5 Euro/Klick

**HANDWERKER:**

- Installateur Notdienst: 5-15 Euro/Klick
- Elektriker Wien: 3-8 Euro/Klick

**B2B DIENSTLEISTUNGEN:**

- Steuerberater: 5-12 Euro/Klick
- Unternehmensberatung: 8-15 Euro/Klick

### Niedrige Klickpreise (0.30-3 Euro)

**E-COMMERCE (MODE):**

- Sneaker kaufen: 0.30-1.50 Euro/Klick
- Sommerkleid: 0.20-0.80 Euro/Klick

**GASTRONOMIE:**

- Restaurant Wien: 0.50-2 Euro/Klick
- Pizza liefern: 0.80-2.50 Euro/Klick

**TOURISMUS:**

- Hotel Wien buchen: 1-4 Euro/Klick
- Ferienwohnung Österreich: 0.50-2 Euro/Klick

## Mindestbudget für Google Ads

### Wie viel sollten Sie mindestens investieren?

**TÄGLICHES MINDESTBUDGET:**

- **Zum Testen:** 20-30 Euro/Tag
- **Für aussagekräftige Daten:** 50-100 Euro/Tag
- **Für ernsthafte Ergebnisse:** 100+ Euro/Tag

**MONATLICHES BUDGET nach Ziel:**

- **Markenbekanntheit testen:** 500-1.000 Euro/Monat
- **Lead-Generierung (lokal):** 1.000-2.500 Euro/Monat
- **E-Commerce Umsatz:** 2.500-10.000+ Euro/Monat
- **B2B Lead Gen (kompetitiv):** 3.000-10.000+ Euro/Monat

### Warum kein 100-Euro-Budget?

Mit 100 Euro/Monat bekommen Sie:

- Bei 2 Euro CPC: 50 Klicks
- Bei 2% Conversion Rate: 1 Conversion

Zu wenig Daten für Optimierung, zu wenig Conversions für ROI.

## Faktoren die Google Ads Kosten beeinflussen

### 1. Qualitätsfaktor (1-10)

Der wichtigste Kostenfaktor:

**Qualitätsfaktor 8-10:**

- Bis zu 50% günstigere Klicks
- Bessere Anzeigenpositionen

**Qualitätsfaktor 1-5:**

- Bis zu 400% teurere Klicks
- Schlechtere Positionen

**So verbessern Sie den Qualitätsfaktor:**

- Relevante Keywords in Anzeigentext
- Hohe erwartete Klickrate (CTR)
- Optimierte Landing Pages

### 2. Wettbewerb

**Mehr Wettbewerber = Höhere Preise:**

- Hauptgeschäftszeiten teurer
- Dezember für E-Commerce teuer
- B2B Montag-Freitag teurer

### 3. Standort-Targeting

**Städte teurer als Land:**

- Wien, München, Zürich: Premium-Preise
- Ländliche Gebiete: Günstiger

### 4. Geräte-Targeting

**Mobile vs Desktop:**

- Mobile oft günstiger
- Desktop-Conversion-Raten oft höher
- Anpassung über Gebot-Modifikatoren

## Google Ads Budget berechnen

### Formel zur Budget-Berechnung

**Schritt 1: Conversion-Wert bestimmen**

Wie viel ist ein Kunde wert? (z.B. 500 Euro)

**Schritt 2: Ziel-CPA festlegen**

Was darf ein Kunde maximal kosten? (z.B. 50 Euro)

**Schritt 3: Conversion Rate schätzen**

Website-Conversion-Rate (z.B. 2%)

**Schritt 4: CPC berechnen**

Ziel-CPA mal Conversion Rate = Max CPC (50 x 2% = 1 Euro CPC)

**Schritt 5: Budget bestimmen**

Gewünschte Conversions mal Ziel-CPA = Budget (10 Kunden x 50 Euro = 500 Euro/Monat)

## Tipps um Google Ads Kosten zu senken

### 1. Negative Keywords hinzufügen

Ausschluss irrelevanter Suchbegriffe:

- kostenlos, gratis (wenn Sie verkaufen)
- Stellenangebot, Jobs (für Produkte)
- Wettbewerber-Namen (falls nicht gewollt)

**Ersparnis:** 15-30% Budget

### 2. Long-Tail-Keywords nutzen

Statt Schuhe verwenden Sie Rote Nike Air Max Damen Grösse 38

**Vorteile:**

- Günstiger pro Klick
- Höhere Conversion Rate
- Weniger Wettbewerb

### 3. Anzeigengruppen granular strukturieren

Eine Anzeigengruppe = Ein Thema

**Gut:**

- Anzeigengruppe Laufschuhe Herren
- Anzeigengruppe Laufschuhe Damen

**Schlecht:**

- Anzeigengruppe Schuhe mit allen Keywords

### 4. Landing Pages optimieren

**Relevanz steigert Qualitätsfaktor:**

- Keyword in H1 und Text
- Schnelle Ladezeit
- Klarer Call-to-Action
- Mobile-optimiert

### 5. Zeitplanung nutzen

**Nur werben wenn sinnvoll:**

- B2B: Montag-Freitag 8-18 Uhr
- B2C: Abends und Wochenende testen
- Analyse nach Tageszeit im Account

### 6. Smart Bidding erst mit Daten

**Nicht sofort automatisieren:**

- Erst manuell CPC testen
- Nach 30+ Conversions: Smart Bidding
- Ziel-CPA erst setzen wenn CPA bekannt

## Häufige Fragen zu Google Ads Kosten

### Gibt es ein Mindestbudget?

Technisch nein, praktisch ja: Unter 500 Euro/Monat fehlen Daten für Optimierung.

### Sind die Kosten fix?

Nein, Sie setzen Tagesbudgets. Google überschreitet maximal 2x täglich, aber gleicht monatlich aus.

### Was kostet eine Google Ads Agentur?

Setup: 500-2.000 Euro einmalig. Laufend: 10-20% des Werbebudgets oder 500-2.000 Euro/Monat pauschal.

### Google Ads vs Facebook Ads Kosten?

Facebook oft günstiger pro Klick, aber Google hat höhere Kaufintention. ROI oft bei Google besser für B2B.

## Fazit: Google Ads Kosten richtig einschätzen

**Zusammenfassung:**

1. **Kein Mindestbudget** - aber unter 500 Euro/Monat unrealistisch
2. **CPC variiert stark** - 0.30 bis 50+ Euro je nach Branche
3. **Qualitätsfaktor entscheidend** - kann Kosten halbieren
4. **ROI wichtiger als Kosten** - 10 Euro/Klick bei 500 Euro Conversion-Wert ist profitabel

**Empfehlung für Einsteiger:**

1. Mit 1.000-1.500 Euro/Monat starten
2. 4-6 Wochen testen und Daten sammeln
3. Conversion-Tracking unbedingt einrichten
4. Erst dann skalieren oder optimieren

**Nächster Schritt:** Kostenloses Google Ads Audit anfordern - wir zeigen Ihnen Ihr Potenzial und realistische Budgets.
    `,
  },
]

// Blog-Kategorien für das Seeding
const categories = [
  { title: 'Webdesign', slug: 'webdesign', description: 'Artikel über Website-Gestaltung, UX/UI und Web-Entwicklung' },
  { title: 'Branding', slug: 'branding', description: 'Markenentwicklung, Corporate Identity und Visual Design' },
  { title: 'SEO', slug: 'seo', description: 'Suchmaschinenoptimierung und Online-Sichtbarkeit' },
  { title: 'UI/UX', slug: 'ui-ux', description: 'User Experience und Interface Design' },
  { title: 'Technologie', slug: 'technologie', description: 'Web-Technologien, Tools und Entwicklung' },
  { title: 'Marketing', slug: 'marketing', description: 'Digital Marketing und Content-Strategien' },
]

async function seedBlog() {
  console.log('Starting blog seed...')

  const payload = await getPayload({ config })

  // Create categories first
  console.log('Creating categories...')
  const categoryMap: Record<string, number | string> = {}

  for (const cat of categories) {
    // Check if category exists
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
    })

    if (existing.docs.length > 0) {
      categoryMap[cat.slug] = existing.docs[0].id
      console.log(`  Category "${cat.title}" already exists`)
    } else {
      const created = await payload.create({
        collection: 'categories',
        data: cat,
      })
      categoryMap[cat.slug] = created.id
      console.log(`  Created category: ${cat.title}`)
    }
  }

  // Find existing posts (DO NOT DELETE - preserve images!)
  console.log('Finding existing blog posts...')
  console.log('⚠️  HINWEIS: Existierende Posts werden AKTUALISIERT, nicht gelöscht!')
  console.log('   → Bilder und CMS-Änderungen bleiben erhalten.\n')

  const existingPosts = await payload.find({
    collection: 'posts',
    limit: 100,
  })

  const existingBySlug = new Map(
    existingPosts.docs.map((doc) => [doc.slug, doc])
  )

  // Create or update blog posts
  console.log('Processing blog posts...')

  for (const post of blogPosts) {

    const categoryId = categoryMap[post.categorySlug]

    if (!categoryId) {
      console.log(`  Warning: Category "${post.categorySlug}" not found for post "${post.title}" - skipping`)
      continue
    }

    try {
      const existingPost = existingBySlug.get(post.slug)

      if (existingPost) {
        // UPDATE existing post - preserve featured_image!
        await payload.update({
          collection: 'posts',
          id: existingPost.id,
          data: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            status: 'published',
            content: markdownToLexical(post.content),
            category: categoryId || undefined,
            readTime: post.readTime,
            featured: post.featured || false,
            seo: post.seo,
            // WICHTIG: Behalte existierende Bilder bei!
            featured_image: existingPost.featured_image,
          },
        })
        console.log(`  🔄 Updated: ${post.title} (Bilder beibehalten)`)
      } else {
        // CREATE new post
        await payload.create({
          collection: 'posts',
          data: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            status: 'published',
            content: markdownToLexical(post.content),
            category: categoryId || undefined,
            publishedAt: new Date().toISOString(),
            readTime: post.readTime,
            featured: post.featured || false,
            seo: post.seo,
          },
        })
        console.log(`  ✅ Created: ${post.title}`)
      }
    } catch (err) {
      const error = err as { message?: string; data?: { errors?: unknown[] } }
      console.error(`  ❌ Error with post "${post.title}":`, error.message)
      if (error.data?.errors) {
        console.error(`  Validation errors:`, JSON.stringify(error.data.errors, null, 2))
      }
    }
  }

  console.log('Blog seed completed!')
  process.exit(0)
}

seedBlog().catch((error) => {
  console.error('Blog seed error:', error)
  process.exit(1)
})
