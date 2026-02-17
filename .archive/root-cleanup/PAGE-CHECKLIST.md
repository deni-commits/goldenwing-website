# Page Checklist - GoldenWing Website

Checkliste für jede neue Seite vor dem Go-Live.

---

## 1. META & SEO

### Metadata
- [ ] `title` - Einzigartig, 50-60 Zeichen, Keyword vorne
- [ ] `description` - 150-160 Zeichen, Call-to-Action
- [ ] `keywords` - Relevante Keywords (DE + EN)
- [ ] `canonical` - Korrekte URL ohne Trailing Slash
- [ ] `alternates` - hreflang für DE/EN Versionen

### Open Graph
- [ ] `og:title` - Titel für Social Sharing
- [ ] `og:description` - Beschreibung für Social Sharing
- [ ] `og:image` - 1200x630px Bild
- [ ] `og:url` - Absolute URL

### Twitter Card
- [ ] `twitter:card` - `summary_large_image`
- [ ] `twitter:title`
- [ ] `twitter:description`
- [ ] `twitter:image`

---

## 2. SCHEMA MARKUP (JSON-LD)

### Pflicht-Schemas
- [ ] **BreadcrumbList** - Navigationspfad
- [ ] **Haupt-Schema** je nach Seitentyp:
  - Service-Seite → `Service` Schema
  - Blog-Post → `BlogPosting` Schema
  - Team-Seite → `Person` / `Organization` Schema
  - Projekt → `CreativeWork` Schema
  - FAQ-Seite → `FAQPage` Schema
  - Kontakt → `LocalBusiness` Schema

### Schema Felder prüfen
- [ ] `url` - Absolute URL (`https://goldenwing.be/...`)
- [ ] `provider.url` - `https://goldenwing.be`
- [ ] `name` - Seitenname
- [ ] `description` - Beschreibung
- [ ] Keine `localhost` URLs!

### Optional aber empfohlen
- [ ] `FAQPage` Schema wenn FAQs vorhanden
- [ ] `AggregateRating` wenn Bewertungen vorhanden
- [ ] `Offer` wenn Preise vorhanden

---

## 3. CONTENT

### Struktur
- [ ] **H1** - Nur eine pro Seite, enthält Hauptkeyword
- [ ] **H2-H6** - Logische Hierarchie (kein Sprung von H2 zu H4)
- [ ] **Absätze** - Max. 3-4 Sätze pro Absatz
- [ ] **Listen** - Bullet Points für Scanbarkeit

### E-E-A-T Signale
- [ ] **Experience** - Praxisbeispiele, Case Studies
- [ ] **Expertise** - Fachbegriffe, detaillierte Erklärungen
- [ ] **Authority** - Zahlen, Fakten, Quellen
- [ ] **Trust** - Kontaktdaten, Impressum-Link, Testimonials

### Answer-First Format
- [ ] Hauptfrage wird in den ersten 2 Sätzen beantwortet
- [ ] Dann Details und Erklärungen
- [ ] Am Ende CTA

### Interne Verlinkung
- [ ] Min. 2-3 interne Links zu relevanten Seiten
- [ ] Anchor-Text enthält Keywords (nicht "hier klicken")
- [ ] Links zu Parent/Child Seiten

---

## 4. BILDER

- [ ] **Alt-Text** - Beschreibend, enthält Keyword
- [ ] **Dateiname** - Keyword-optimiert (z.B. `webdesign-wien-hero.jpg`)
- [ ] **Format** - WebP oder AVIF bevorzugt
- [ ] **Lazy Loading** - Für Bilder below the fold
- [ ] **Größe** - Optimiert, max. 200KB für Hero-Bilder
- [ ] **Next/Image** - Verwendet für automatische Optimierung

---

## 5. TECHNISCH

### Performance
- [ ] Keine ungenutzten Imports
- [ ] Komponenten sind lazy-loaded wenn möglich
- [ ] Keine blockierenden Ressourcen

### Accessibility
- [ ] **Fokus-States** - Alle interaktiven Elemente
- [ ] **Kontrast** - Min. 4.5:1 für Text
- [ ] **ARIA Labels** - Für Icons und Buttons ohne Text
- [ ] **Skip-Link** - Zum Hauptinhalt (im Layout)
- [ ] **Semantisches HTML** - `<main>`, `<nav>`, `<article>`, `<section>`

### Mobile
- [ ] Responsive Design getestet (390px, 768px, 1440px)
- [ ] Touch-Targets min. 44x44px
- [ ] Kein horizontales Scrollen

---

## 6. CTA & CONVERSION

- [ ] **Primary CTA** - Klar sichtbar, above the fold
- [ ] **Secondary CTA** - Alternative Aktion
- [ ] **CTA am Ende** - Nach dem Content
- [ ] **Kontakt-Möglichkeiten** - Telefon, E-Mail, Formular

---

## 7. INTERNATIONALISIERUNG

- [ ] **DE Content** - Grammatik geprüft
- [ ] **EN Content** - Native-Level Übersetzung
- [ ] **Translations** - In `messages/de.json` und `messages/en.json`
- [ ] **hreflang** - Korrekt in Metadata
- [ ] **Sitemap** - Beide Sprachen mit alternates

---

## 8. LEGAL

- [ ] **Impressum** - Link im Footer
- [ ] **Datenschutz** - Link im Footer
- [ ] **Cookie-Banner** - Falls Tracking aktiv

---

## 9. PRE-DEPLOY CHECK

```bash
# Build testen
npm run build

# TypeScript Fehler
npx tsc --noEmit

# Lint
npm run lint

# Schema validieren (Google Rich Results Test)
https://search.google.com/test/rich-results?url=https://goldenwing.be/[seite]

# Mobile-Friendly Test
https://search.google.com/test/mobile-friendly?url=https://goldenwing.be/[seite]

# PageSpeed Insights
https://pagespeed.web.dev/analysis?url=https://goldenwing.be/[seite]
```

---

## 10. POST-DEPLOY CHECK

- [ ] Seite lädt ohne Fehler
- [ ] Schema URLs sind korrekt (nicht localhost)
- [ ] Canonical URL stimmt
- [ ] hreflang Links funktionieren
- [ ] Bilder laden
- [ ] Interne Links funktionieren
- [ ] In Sitemap enthalten

---

## Quick Reference: Schema URLs

```typescript
// RICHTIG
url: 'https://goldenwing.be/leistungen/branding'
provider: { url: 'https://goldenwing.be' }

// FALSCH
url: 'http://localhost:3000/leistungen/branding'
url: '/leistungen/branding'  // Relativ
```

## Quick Reference: Metadata

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Keyword vorne | GoldenWing',
    description: '150-160 Zeichen mit Call-to-Action.',
    alternates: {
      canonical: '/seiten-pfad',
      languages: {
        'de-AT': '/seiten-pfad',
        'en-AT': '/en/seiten-pfad',
      },
    },
    openGraph: {
      title: 'Titel für Social',
      description: 'Beschreibung für Social',
      url: '/seiten-pfad',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  }
}
```

---

## Seitentyp-spezifische Anforderungen

### Service-Seite (`/leistungen/*`)
- [ ] Service Schema mit `url`, `provider`, `areaServed`
- [ ] FAQ Schema wenn FAQs vorhanden
- [ ] Offers mit Preisen wenn verfügbar
- [ ] Verwandte Services verlinkt

### Blog-Post (`/blog/*`)
- [ ] BlogPosting Schema
- [ ] `datePublished` und `dateModified`
- [ ] Author mit Name
- [ ] Kategorie zugewiesen
- [ ] Lesezeit angegeben

### Landing Page (Local SEO)
- [ ] LocalBusiness oder Service Schema
- [ ] Stadt im Title und H1
- [ ] Lokale Keywords
- [ ] Google Maps Einbettung (optional)
- [ ] Lokale Telefonnummer

### Team-Seite
- [ ] Person Schema für jedes Teammitglied
- [ ] Foto mit Alt-Text
- [ ] Rolle/Position
- [ ] Optional: LinkedIn Link

---

*Letzte Aktualisierung: 2025-12-26*
