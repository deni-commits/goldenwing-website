# Payload CMS Lokalisierungs-Plan

## Strategie: Payload Built-in Localization

Payload CMS unterstützt native Lokalisierung mit `localized: true` auf Feldebene.

### Vorteile:
- Saubere API-Struktur
- Admin-Panel zeigt Sprach-Tabs automatisch
- Einfacher Wechsel zwischen Sprachen
- Fallback-Unterstützung

### Konfiguration:
- Default Locale: `de`
- Fallback Locale: `de`
- Verfügbare Locales: `de`, `en`

---

## Collections & Felder Übersicht

### 1. Services Collection
| Feld | Typ | Lokalisiert |
|------|-----|-------------|
| title | text | ✅ Ja |
| slug | text | ❌ Nein (URL-stabil) |
| subtitle | text | ✅ Ja |
| description | textarea | ✅ Ja |
| icon | select | ❌ Nein |
| features[].title | text | ✅ Ja |
| features[].description | textarea | ✅ Ja |
| process[].step | text | ✅ Ja |
| order | number | ❌ Nein |

### 2. SubServices Collection
| Feld | Typ | Lokalisiert |
|------|-----|-------------|
| title | text | ✅ Ja |
| slug | text | ❌ Nein |
| parentService | relationship | ❌ Nein |
| subtitle | text | ✅ Ja |
| description | textarea | ✅ Ja |
| longDescription | richText | ✅ Ja |
| icon | select | ❌ Nein |
| features[].title | text | ✅ Ja |
| features[].description | textarea | ✅ Ja |
| benefits[].benefit | text | ✅ Ja |
| process[].title | text | ✅ Ja |
| process[].description | textarea | ✅ Ja |
| useCases[].useCase | text | ✅ Ja |
| deliverables[].deliverable | text | ✅ Ja |
| pricing.from | number | ❌ Nein |
| pricing.to | number | ❌ Nein |
| pricing.unit | text | ✅ Ja |
| pricing.description | textarea | ✅ Ja |
| duration | text | ✅ Ja |
| relatedProjects | relationship | ❌ Nein |
| featured | checkbox | ❌ Nein |
| order | number | ❌ Nein |
| seo.metaTitle | text | ✅ Ja |
| seo.metaDescription | textarea | ✅ Ja |
| seo.keywords | text | ✅ Ja |

### 3. Projects Collection
| Feld | Typ | Lokalisiert |
|------|-----|-------------|
| title | text | ✅ Ja |
| slug | text | ❌ Nein |
| client | text | ❌ Nein (Firmenname) |
| category | select | ❌ Nein |
| year | number | ❌ Nein |
| description | textarea | ✅ Ja |
| longDescription | richText | ✅ Ja |
| challenge | textarea | ✅ Ja |
| solution | textarea | ✅ Ja |
| mainImage | upload | ❌ Nein |
| gallery[].image | upload | ❌ Nein |
| gallery[].caption | text | ✅ Ja |
| tags[].tag | text | ✅ Ja |
| services[].service | text | ✅ Ja |
| results[].metric | text | ❌ Nein (Zahlen) |
| results[].label | text | ✅ Ja |
| liveUrl | text | ❌ Nein |
| clientFeedback.quote | textarea | ✅ Ja |
| clientFeedback.author | text | ❌ Nein |
| clientFeedback.role | text | ✅ Ja |
| testimonial | relationship | ❌ Nein |
| featured | checkbox | ❌ Nein |
| order | number | ❌ Nein |

### 4. Posts Collection
| Feld | Typ | Lokalisiert |
|------|-----|-------------|
| title | text | ✅ Ja |
| slug | text | ❌ Nein |
| status | select | ❌ Nein |
| excerpt | textarea | ✅ Ja |
| content | richText | ✅ Ja |
| mainImage | upload | ❌ Nein |
| category | relationship | ❌ Nein |
| author | relationship | ❌ Nein |
| relatedServices | relationship | ❌ Nein |
| publishedAt | date | ❌ Nein |
| readTime | number | ❌ Nein |
| featured | checkbox | ❌ Nein |
| expertQuotes[].quote | textarea | ✅ Ja |
| expertQuotes[].author | text | ❌ Nein |
| expertQuotes[].role | text | ✅ Ja |
| expertQuotes[].source | text | ❌ Nein |
| faqs[].question | text | ✅ Ja |
| faqs[].answer | textarea | ✅ Ja |
| sources[].title | text | ✅ Ja |
| sources[].url | text | ❌ Nein |
| sources[].author | text | ❌ Nein |
| sources[].year | text | ❌ Nein |
| tableOfContents[].heading | text | ✅ Ja |
| tableOfContents[].anchor | text | ❌ Nein |
| seo.metaTitle | text | ✅ Ja |
| seo.metaDescription | textarea | ✅ Ja |
| seo.keywords | text | ✅ Ja |
| seo.canonicalUrl | text | ❌ Nein |

### 5. TeamMembers Collection
| Feld | Typ | Lokalisiert |
|------|-----|-------------|
| name | text | ❌ Nein |
| role | text | ✅ Ja |
| image | upload | ❌ Nein |
| bio | textarea | ✅ Ja |
| email | email | ❌ Nein |
| social.* | text | ❌ Nein |
| featured | checkbox | ❌ Nein |
| order | number | ❌ Nein |

### 6. Testimonials Collection
| Feld | Typ | Lokalisiert |
|------|-----|-------------|
| name | text | ❌ Nein |
| role | text | ✅ Ja |
| company | text | ❌ Nein |
| quote | textarea | ✅ Ja |
| image | upload | ❌ Nein |
| rating | number | ❌ Nein |
| featured | checkbox | ❌ Nein |

### 7. HomePage Global
**Alle Text-Felder lokalisieren:**
- hero.badge ✅
- hero.headline.line1 ✅
- hero.headline.highlight ✅
- hero.headline.line2 ✅
- hero.subheadline ✅
- hero.locations[].city ✅
- hero.ctaPrimary ✅
- hero.ctaSecondary ✅
- hero.trustText ✅
- services.title ✅
- services.subtitle ✅
- services.ctaText ✅
- usp.title ✅
- usp.subtitle ✅
- usp.items[].title ✅
- usp.items[].description ✅
- usp.quote ✅
- usp.quoteAuthor ✅
- testimonials.title ✅
- testimonials.subtitle ✅
- process.title ✅
- process.subtitle ✅
- process.steps[].title ✅
- process.steps[].description ✅
- logoCarousel.title ✅
- logoCarousel.subtitle ✅
- faq.title ✅
- faq.subtitle ✅
- faq.ctaText ✅
- faq.ctaButton ✅
- faq.items[].question ✅
- faq.items[].answer ✅
- cta.title ✅
- cta.subtitle ✅
- cta.primaryButton ✅
- stats.items[].label ✅

---

## Implementierungs-Schritte

### Phase 1: Payload Config
1. Localization in `payload.config.ts` aktivieren
2. Fallback-Verhalten definieren

### Phase 2: Collections anpassen
1. Services - `localized: true` hinzufügen
2. SubServices - `localized: true` hinzufügen
3. Projects - `localized: true` hinzufügen
4. Posts - `localized: true` hinzufügen
5. TeamMembers - `localized: true` hinzufügen
6. Testimonials - `localized: true` hinzufügen

### Phase 3: Globals anpassen
1. HomePage - `localized: true` hinzufügen

### Phase 4: Frontend anpassen
1. API-Aufrufe mit `?locale=de` oder `?locale=en`
2. `getServices(locale)` etc.

---

## API Änderungen

### Vorher:
```typescript
const services = await payload.find({
  collection: 'services'
})
```

### Nachher:
```typescript
const services = await payload.find({
  collection: 'services',
  locale: 'en',      // Gewünschte Sprache
  fallbackLocale: 'de' // Fallback wenn EN fehlt
})
```

---

## Migration bestehender Daten

Da Payload's Localization bereits bestehende Daten beibehält und sie als Default-Locale behandelt, ist keine manuelle Migration nötig.

**Nach der Aktivierung:**
1. Bestehende DE-Inhalte bleiben erhalten
2. EN-Felder sind zunächst leer
3. Im Admin-Panel können EN-Texte eingegeben werden
4. API liefert DE als Fallback wenn EN fehlt

---

## Risiken & Mitigation

| Risiko | Mitigation |
|--------|------------|
| Datenbank-Migration | Backup vor Änderungen erstellen |
| Breaking Changes | Fallback auf DE aktivieren |
| Admin-Verwirrung | Dokumentation für Content-Editors |

---

*Stand: Dezember 2025*
