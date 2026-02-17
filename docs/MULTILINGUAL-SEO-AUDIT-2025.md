# GoldenWing Multilingual SEO Audit Report
## Stand: Dezember 2025

---

## Executive Summary

**Gesamtbewertung: 72/100**

Die Website hat eine solide technische Grundlage mit gutem Schema Markup und funktionierender i18n-Infrastruktur. Die Hauptprobleme liegen im fehlenden zweisprachigen CMS-Content und der inkonsistenten Umsetzung der Mehrsprachigkeit.

### Kritische Lücken:
1. **CMS-Inhalte nur auf Deutsch** - Services, Projects, Blog, Team
2. **Homepage Metadata statisch** - wird nicht lokalisiert
3. **FAQs und Testimonials hardcoded** - nur Deutsch
4. **Keine Sitemap pro Sprache**
5. **JSON-LD Schema nur auf Deutsch**

---

## 1. AUDIT REPORT - Aktueller Stand

### A) Technisches SEO

| Check | Status | Details |
|-------|--------|---------|
| URL-Struktur | ✅ | Subdirectory-basiert: `/de/`, `/en/` |
| Locale Detection | ✅ | next-intl middleware funktioniert |
| Routing | ✅ | `[locale]/(marketing)/` korrekt |
| Meta-Tags (global) | ⚠️ | Vorhanden, aber teilweise statisch Deutsch |
| Open Graph | ⚠️ | Konfiguriert, aber locale nicht konsistent |
| hreflang Tags | ✅ | Im Layout: `de-AT`, `en-US`, `x-default` |
| Canonical URLs | ⚠️ | Vorhanden, aber ohne Locale-Prefix |
| Schema Markup | ✅ | Umfangreich auf Homepage |
| robots.txt | ⚠️ | Standard, keine Sprach-Konfiguration |
| Sitemap | ❌ | Keine lokalisierte Sitemap gefunden |
| Core Web Vitals | 🔍 | Nicht geprüft (Live-Site auf anderer IP) |

### B) Internationalization (i18n)

| Komponente | Status | Details |
|------------|--------|---------|
| i18n-Infrastruktur | ✅ | next-intl korrekt implementiert |
| Übersetzungsdateien | ✅ | de.json + en.json vollständig |
| Language Switcher | ✅ | Vorhanden und funktional |
| UI-Texte | ✅ | Alle übersetzt |
| CMS-Inhalte | ❌ | Nur Deutsch |
| Navigation | ✅ | Übersetzt |
| Footer | ✅ | Übersetzt |
| Formular-Labels | ✅ | Übersetzt |

### C) Content-Lokalisierung

| Content-Typ | DE | EN | Priorität |
|-------------|----|----|-----------|
| Homepage Hero | ✅ (CMS) | ❌ | Hoch |
| Services | ❌ (nur DE) | ❌ | Kritisch |
| Sub-Services | ❌ (nur DE) | ❌ | Kritisch |
| Projects | ❌ (nur DE) | ❌ | Hoch |
| Blog Posts | ❌ (nur DE) | ❌ | Mittel |
| Team Members | ❌ (nur DE) | ❌ | Niedrig |
| FAQs | ❌ (hardcoded) | ❌ | Hoch |
| Testimonials | ❌ (hardcoded) | ❌ | Mittel |
| Pillar Pages | ✅ (Übersetzungen) | ✅ | ✅ |
| Standorte | ✅ (Übersetzungen) | ✅ | ✅ |

### D) GEO/AEO Readiness

| Faktor | Status | Empfehlung |
|--------|--------|------------|
| Answer-First Format | ⚠️ | Teilweise - FAQs gut, aber nicht überall |
| FAQ Schema | ✅ | Auf Homepage vorhanden |
| Zitierfähige Fakten | ⚠️ | Wenige Statistiken mit Quellen |
| Tabellen/Vergleiche | ❌ | Keine Preistabellen auf Serviceseiten |
| Expert Authority | ⚠️ | Team vorhanden, aber keine Author Bios auf Blogposts |
| Entity Coverage | ✅ | Organization, LocalBusiness, Service gut |
| Multimodaler Content | ⚠️ | Wenig Video/Infografiken |

### E) Schema Markup Analyse

**Homepage Schema (sehr gut):**
- ✅ Organization mit allen Kontakten
- ✅ LocalBusiness für Wien, Dubai, Roseville
- ✅ WebSite
- ✅ FAQPage mit 6 FAQs
- ✅ AggregateRating
- ✅ Review Schema

**Fehlend:**
- ❌ Service Schema pro Leistungsseite
- ❌ Article/BlogPosting Schema
- ❌ BreadcrumbList Schema konsistent
- ❌ HowTo Schema für Prozesse
- ❌ Person Schema für Team

---

## 2. PRIORISIERTE TO-DO-LISTE

### PHASE 1: Kritisch (Woche 1-2)

#### 1.1 Payload CMS Zweisprachig erweitern
**Aufwand: L | Impact: Kritisch**

```typescript
// Beispiel: Services Collection erweitern
const Services: CollectionConfig = {
  slug: 'services',
  fields: [
    // Deutsche Felder (default)
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'features', type: 'array', localized: true },
    // ... oder Payload's built-in Localization nutzen
  ]
}
```

**Tasks:**
- [ ] Payload CMS Localization aktivieren (`localization: { locales: ['de', 'en'], defaultLocale: 'de' }`)
- [ ] Services Collection: title, description, features lokalisierbar machen
- [ ] SubServices Collection anpassen
- [ ] Projects Collection anpassen
- [ ] Posts Collection anpassen
- [ ] TeamMembers Collection: bio, role lokalisierbar
- [ ] Bestehende DE-Inhalte migrieren
- [ ] EN-Übersetzungen erstellen/importieren

#### 1.2 Homepage Metadata lokalisieren
**Aufwand: S | Impact: Hoch**

```typescript
// src/app/[locale]/(marketing)/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations('meta.home')

  return {
    title: t('title'),
    description: t('description'),
    // ...
  }
}
```

#### 1.3 FAQs und Testimonials lokalisieren
**Aufwand: M | Impact: Hoch**

- [ ] FAQs in de.json/en.json verschieben
- [ ] Testimonials lokalisieren oder aus CMS laden
- [ ] JSON-LD Schema dynamisch generieren

---

### PHASE 2: Hoch (Woche 3-4)

#### 2.1 Lokalisierte Sitemap erstellen
**Aufwand: M | Impact: Hoch**

```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['de', 'en']
  const baseUrl = 'https://goldenwing.at'

  const routes = [
    '', '/leistungen', '/projekte', '/ueber-uns', '/kontakt', '/blog'
  ]

  const entries = locales.flatMap(locale =>
    routes.map(route => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          de: `${baseUrl}/de${route}`,
          en: `${baseUrl}/en${route}`,
        }
      }
    }))
  )

  return entries
}
```

#### 2.2 Service-Seiten Schema erweitern
**Aufwand: M | Impact: Hoch**

Für jede Leistungsseite:
- [ ] Service Schema hinzufügen
- [ ] HowTo Schema für Prozess
- [ ] FAQ Schema mit lokalisierten FAQs
- [ ] Preistabellen hinzufügen

#### 2.3 Canonical URLs mit Locale
**Aufwand: S | Impact: Mittel**

```typescript
// Layout oder Page
alternates: {
  canonical: `/${locale}/leistungen/${slug}`,
  languages: {
    de: `/de/leistungen/${slug}`,
    en: `/en/services/${slug}`, // oder gleiche Slugs
  }
}
```

---

### PHASE 3: Mittel (Woche 5-6)

#### 3.1 Content-Lokalisierung
**Aufwand: L | Impact: Mittel**

- [ ] EN-Übersetzungen für alle 7 Services erstellen
- [ ] EN-Übersetzungen für alle SubServices
- [ ] EN-Versionen der wichtigsten Blog-Posts
- [ ] Project-Beschreibungen übersetzen

#### 3.2 GEO/AEO Optimierung
**Aufwand: M | Impact: Mittel**

Pro Seite prüfen:
- [ ] Answer-First Format implementieren
- [ ] Zitierfähige Fakten mit Quellen
- [ ] Vergleichstabellen wo sinnvoll
- [ ] FAQ-Blöcke pro Thema

#### 3.3 Author/Team Schema
**Aufwand: S | Impact: Mittel**

- [ ] Person Schema für Teammitglieder
- [ ] Author Bios auf Blogposts
- [ ] Credentials verlinken

---

### PHASE 4: Optimierung (Woche 7-8)

#### 4.1 Blog lokalisieren
**Aufwand: L | Impact: Mittel**

- [ ] Top 10 Blog-Posts übersetzen
- [ ] Article/BlogPosting Schema
- [ ] Author Attribution

#### 4.2 Performance & Core Web Vitals
**Aufwand: M | Impact: Mittel**

- [ ] Lighthouse Audit auf Live-Site
- [ ] LCP optimieren (Hero-Bilder)
- [ ] CLS prüfen

#### 4.3 Tracking & Monitoring
**Aufwand: M | Impact: Niedrig**

- [ ] Google Search Console einrichten (beide Domains)
- [ ] hreflang Validation
- [ ] AI-Visibility Tracking (Ubersuggest)

---

## 3. TECHNISCHE CHECKLISTE (Copy-Paste Ready)

### hreflang Checkliste
```
✅ Alle Seiten haben hreflang Tags
✅ Bidirektionale Verlinkung (DE ↔ EN)
✅ x-default vorhanden
✅ ISO 639-1 Sprachcodes (de, en)
✅ ISO 3166-1 Alpha 2 Regionscodes (AT, US)
⬜ Sitemap enthält hreflang
⬜ Keine hreflang auf noindex Seiten
```

### Schema Markup Checkliste
```
✅ Organization (global)
✅ LocalBusiness (3x)
✅ WebSite
✅ FAQPage (Homepage)
⬜ Service (pro Leistung)
⬜ Article/BlogPosting (Blog)
⬜ BreadcrumbList (alle Seiten)
⬜ HowTo (Prozesse)
⬜ Person (Team)
⬜ AggregateOffer (Preise)
```

### Content Checkliste pro Seite
```
⬜ Title Tag < 60 Zeichen
⬜ Meta Description 120-160 Zeichen
⬜ H1 einmalig und beschreibend
⬜ H2-H6 logische Hierarchie
⬜ Alt-Tags für alle Bilder
⬜ Internal Links zu relevanten Seiten
⬜ CTA vorhanden
⬜ FAQ-Block wenn relevant
```

---

## 4. ÜBERSETZUNGS-MASTERPLAN

### Reihenfolge der Übersetzung

| Priorität | Content | Wörter (ca.) | Methode |
|-----------|---------|--------------|---------|
| 1 | Services (7) | 2.100 | Professionell |
| 2 | SubServices (35) | 5.250 | Professionell |
| 3 | Pillar Pages (3) | 3.000 | Professionell |
| 4 | Homepage CMS | 500 | Professionell |
| 5 | Top 10 Blog Posts | 8.000 | AI + Review |
| 6 | Projects (10+) | 2.000 | AI + Review |
| 7 | Team Bios | 500 | AI + Review |
| **Total** | | **~21.350** | |

### Übersetzungs-Workflow

```
1. Export aus Payload CMS (JSON)
   ↓
2. Professionelle Übersetzung für kritische Seiten
   - Services: Native Speaker mit Fachkenntnis
   - Legal: Muttersprachler zwingend
   ↓
3. AI-Übersetzung + Human Review für Volume-Content
   - Blog Posts: DeepL/ChatGPT → Human Review
   - Projects: AI → Kurze Prüfung
   ↓
4. Import in Payload CMS (EN-Felder)
   ↓
5. QA auf Staging
   - Link-Check
   - Layout-Check
   - Kulturelle Anpassungen
   ↓
6. Deploy & Monitor
```

### Lokalisierungs-Hinweise

**DE → EN Anpassungen:**
- Währung: €2.000 → €2,000 oder $2,000
- Datums-Format: 15. Dezember → December 15
- Uhrzeiten: 14:00 Uhr → 2:00 PM
- Messeinheiten: km → miles (für US)
- Anrede: "Sie" → "you" (formell bleibt gleich)
- Telefonnummern: Format anpassen

**Kulturelle Anpassungen:**
- Wien-spezifische Referenzen für EN abschwächen
- Dubai/USA Standorte für EN mehr betonen
- Testimonials: Internationale Namen hinzufügen

---

## 5. DOMAIN-STRATEGIE

### Aktuelle Konfiguration
```
goldenwing.at → DE (Hauptdomain)
goldenwing.us → EN (US-Domain)
goldenwing.ae → Geplant (Dubai)
```

### Empfehlung: Hybrid-Ansatz

```
goldenwing.at/      → DE (Default)
goldenwing.at/en/   → EN (Alternativ)
goldenwing.us/      → EN (Redirect zu .at/en oder eigenständig)
```

**Vorteile:**
- Zentralisierte Domain Authority
- Einfachere Verwaltung
- hreflang zwischen Domains möglich

**Alternativ (für späteren Ausbau):**
- goldenwing.us als eigenständige EN-Seite
- Mit eigener US-spezifischen Inhalten
- hreflang zur .at Domain

---

## 6. MONITORING & KPIs

### SEO KPIs pro Sprache
| KPI | Tool | Frequenz |
|-----|------|----------|
| Organic Traffic | GA4 | Wöchentlich |
| Keyword Rankings | Ahrefs/SEMrush | Wöchentlich |
| Impressions | GSC | Wöchentlich |
| CTR | GSC | Wöchentlich |
| hreflang Errors | GSC | Monatlich |

### GEO/AEO KPIs
| KPI | Tool | Frequenz |
|-----|------|----------|
| AI Citations | Ubersuggest | Monatlich |
| Featured Snippets | Ahrefs | Wöchentlich |
| PAA Rankings | SEMrush | Monatlich |
| AI Overview Visibility | Manuell | Monatlich |

---

## Quellen

- [Motionpoint: 2025 Multilingual SEO Guide](https://www.motionpoint.com/blog/2025-multilingual-seo-guide-key-tactics-to-boost-your-websites-global-reach/)
- [Search Engine Land: International SEO Guide](https://searchengineland.com/guide/international-seo)
- [Weglot: Hreflang Best Practices](https://www.weglot.com/guides/hreflang-tag)
- [Backlinko: Generative Engine Optimization](https://backlinko.com/generative-engine-optimization-geo)
- [SheAI: Ultimate Guide to GEO and AEO](https://www.sheai.co/blog/the-ultimate-guide-to-geo-and-aeo)
- [SEO Tuners: GEO 2025 Complete Playbook](https://seotuners.com/blog/seo/generative-engine-optimization-geo-in-2025-the-complete-playbook-to-win-ai-overviews-chatgpt-copilot-perplexity/)

---

*Report erstellt: 17. Dezember 2025*
*Nächste Überprüfung: Nach Phase 1 Implementierung*
