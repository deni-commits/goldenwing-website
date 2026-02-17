# 🎯 FINALER GEO/SEO MASTERPLAN - GOLDENWING

> **Analyse-Basis:** 3 Deep-Dive Audits (Interne Verlinkung, Schema, Keyword-Kannibalisierung)
> **Kritisches Problem:** Keyword-Kannibalisierung zwischen 3+ Seitentypen
> **Lösung:** Klare Keyword-Zuweisung + Hub-and-Spoke Architektur

---

## 🚨 DAS KERNPROBLEM

### Aktuelle Situation: Keyword-Chaos

```
Keyword: "Webdesign Wien"

AKTUELL (3 Seiten konkurrieren):
├── /leistungen/webdesign              → "Webdesign Agentur Wien"
├── /webdesign-wien                    → "Webdesign Wien"
└── /beste-webdesign-agenturen-wien    → "Beste Webdesign Agenturen Wien"

RESULTAT: Google weiß nicht, welche Seite ranken soll → ALLE ranken schlecht
```

### Das Problem bei ALLEN euren Hauptservices:

| Keyword | Konkurrierende Seiten | Konflikt-Level |
|---------|----------------------|----------------|
| "Webdesign Wien" | 3 Seiten | 🔴 KRITISCH |
| "SEO Agentur Wien" | 3 Seiten | 🔴 KRITISCH |
| "Branding Agentur Wien" | 3 Seiten | 🔴 KRITISCH |
| "Google Ads Wien" | 2 Seiten | 🟡 HOCH |
| "Webdesign Graz/Linz/etc." | 2+ Seiten | 🟡 HOCH |

---

## ✅ DIE LÖSUNG: KLARE KEYWORD-ZUWEISUNG

### Prinzip: 1 Keyword = 1 Seite

Jedes Keyword bekommt **EINE** primäre Seite. Keine Ausnahmen.

### Keyword-Matrix (NEU)

| Keyword-Typ | Primäre Seite | Beispiel |
|-------------|--------------|----------|
| **Generisch (Service)** | `/leistungen/[service]/` | "Webdesign Agentur" |
| **Lokal (Stadt + Service)** | `/standorte/[stadt]/[service]/` | "Webdesign Wien" |
| **Vergleich (Best-of)** | `/vergleiche/[service]-[stadt]/` | "Beste Webdesign Agenturen Wien" |
| **Informational (Guide)** | `/wissen/guides/[thema]/` | "Webdesign Preise" |
| **Branchen-spezifisch** | `/branchen/[branche]/[service]/` | "SEO für Ärzte" |

---

## 📐 DIE NEUE STRUKTUR (FINAL)

### Übersicht

```
goldenwing.at/
│
├── /leistungen/                 ← GENERISCHE Service-Keywords
│   ├── /branding/                  "Branding Agentur"
│   ├── /webdesign/                 "Webdesign Agentur"
│   ├── /seo/                       "SEO Agentur" (NICHT "seo-content"!)
│   ├── /digital-marketing/         "Digital Marketing Agentur"
│   ├── /entwicklung/               "Web Entwicklung"
│   └── /it-cloud/                  "IT & Cloud Services"
│
├── /standorte/                  ← LOKALE Keywords (Stadt + Service)
│   ├── /wien/                      "Agentur Wien"
│   │   ├── /webdesign/             "Webdesign Wien"
│   │   ├── /seo/                   "SEO Agentur Wien"
│   │   ├── /branding/              "Branding Agentur Wien"
│   │   └── /google-ads/            "Google Ads Agentur Wien"
│   ├── /graz/
│   ├── /linz/
│   ├── /muenchen/
│   ├── /berlin/
│   ├── /zuerich/
│   └── /dubai/
│
├── /vergleiche/                 ← VERGLEICHS-Keywords (Best-of Listicles)
│   ├── /seo-agenturen-wien/        "Beste SEO Agenturen Wien"
│   ├── /webdesign-agenturen-wien/  "Beste Webdesign Agenturen Wien"
│   └── /branding-agenturen-wien/   "Beste Branding Agenturen Wien"
│
├── /branchen/                   ← BRANCHEN-Keywords
│   ├── /aerzte/                    "SEO für Ärzte"
│   ├── /ecommerce/                 "E-Commerce Marketing"
│   └── /b2b/                       "B2B Marketing"
│
├── /wissen/                     ← INFORMATIONAL Keywords
│   ├── /blog/                      Blog-Posts
│   ├── /lexikon/                   Glossar
│   ├── /guides/                    "Webdesign Preise", "Website erstellen"
│   └── /tools/                     SEO-Checker, etc.
│
├── /referenzen/                 ← TRUST Keywords
│   └── /[projekt-slug]/
│
└── /ueber-uns/                  ← E-E-A-T Keywords
    └── /team/
```

---

## 🔑 DETAILLIERTE KEYWORD-ZUWEISUNG

### 1. SERVICE-SEITEN: `/leistungen/`

**Zweck:** Generische Service-Keywords OHNE Ortsangabe

| URL | Primary Keyword | Secondary Keywords |
|-----|-----------------|-------------------|
| `/leistungen/webdesign/` | Webdesign Agentur | Web Design, Website Agentur, Webentwicklung |
| `/leistungen/seo/` | SEO Agentur | Suchmaschinenoptimierung, SEO Marketing |
| `/leistungen/branding/` | Branding Agentur | Corporate Identity, Markenentwicklung |
| `/leistungen/digital-marketing/` | Digital Marketing Agentur | Online Marketing, Performance Marketing |
| `/leistungen/entwicklung/` | Web Entwicklung | App Entwicklung, Software |
| `/leistungen/it-cloud/` | IT Services | Cloud Services, DevOps |

**WICHTIG:** Diese Seiten zielen NICHT auf "Wien" oder andere Städte!

---

### 2. STANDORT-SEITEN: `/standorte/`

**Zweck:** Lokale Keywords (Stadt + Service)

#### Wien (Hauptstandort - Maximale Abdeckung)

| URL | Primary Keyword | Search Intent |
|-----|-----------------|---------------|
| `/standorte/wien/` | Agentur Wien | Local Hub |
| `/standorte/wien/webdesign/` | Webdesign Wien | Local + Service |
| `/standorte/wien/seo/` | SEO Agentur Wien | Local + Service |
| `/standorte/wien/branding/` | Branding Agentur Wien | Local + Service |
| `/standorte/wien/google-ads/` | Google Ads Agentur Wien | Local + Service |
| `/standorte/wien/social-media/` | Social Media Agentur Wien | Local + Service |
| `/standorte/wien/kreativagentur/` | Kreativagentur Wien | Local + Brand |

#### Andere Österreich-Städte (Reduzierte Abdeckung)

| Stadt | Services | Keywords |
|-------|----------|----------|
| `/standorte/graz/` | webdesign, seo, online-marketing | "Webdesign Graz", "SEO Graz" |
| `/standorte/linz/` | webdesign, seo, werbeagentur | "Webdesign Linz", "SEO Linz" |
| `/standorte/salzburg/` | webdesign, seo | "Webdesign Salzburg" |
| `/standorte/innsbruck/` | webdesign, seo | "Webdesign Innsbruck" |

#### Deutschland (Top 4 Städte + Country Hub)

| URL | Primary Keyword |
|-----|-----------------|
| `/standorte/deutschland/` | Webdesign Deutschland, SEO Agentur Deutschland |
| `/standorte/muenchen/webdesign/` | Webdesign München |
| `/standorte/berlin/webdesign/` | Webdesign Berlin |
| `/standorte/hamburg/webdesign/` | Webdesign Hamburg |
| `/standorte/frankfurt/webdesign/` | Webdesign Frankfurt |

#### Schweiz

| URL | Primary Keyword |
|-----|-----------------|
| `/standorte/schweiz/` | Webdesign Schweiz |
| `/standorte/zuerich/webdesign/` | Webdesign Zürich |

#### UAE (Bereits gut strukturiert - beibehalten)

| URL | Primary Keyword |
|-----|-----------------|
| `/standorte/dubai/` | Dubai Agency Hub |
| `/standorte/dubai/webdesign/` | Web Design Dubai |
| `/standorte/dubai/seo/` | SEO Dubai |
| `/standorte/abu-dhabi/` | Abu Dhabi Hub |
| `/standorte/sharjah/` | Sharjah Hub |

---

### 3. VERGLEICHS-SEITEN: `/vergleiche/`

**Zweck:** "Beste X" / Listicle Keywords

**Search Intent:** Informational → Transactional (Mid-Funnel)

| URL | Primary Keyword | Content Type |
|-----|-----------------|--------------|
| `/vergleiche/seo-agenturen-wien/` | Beste SEO Agenturen Wien | Top 10 Liste |
| `/vergleiche/webdesign-agenturen-wien/` | Beste Webdesign Agenturen Wien | Top 10 Liste |
| `/vergleiche/branding-agenturen-wien/` | Beste Branding Agenturen Wien | Top 10 Liste |
| `/vergleiche/google-ads-agenturen-wien/` | Beste Google Ads Agenturen Wien | Top 10 Liste |
| `/vergleiche/kreativagenturen-wien/` | Beste Kreativagenturen Wien | Top 10 Liste |
| `/vergleiche/wordpress-agenturen-wien/` | Beste WordPress Agenturen Wien | Top 10 Liste |
| `/vergleiche/social-media-agenturen-wien/` | Beste Social Media Agenturen Wien | Top 10 Liste |
| `/vergleiche/ecommerce-agenturen-wien/` | Beste E-Commerce Agenturen Wien | Top 10 Liste |
| `/vergleiche/app-entwicklung-wien/` | Beste App Entwickler Wien | Top 10 Liste |
| `/vergleiche/seo-agenturen-oesterreich/` | Beste SEO Agenturen Österreich | Top 10 Liste |
| `/vergleiche/website-relaunch-agenturen/` | Beste Website Relaunch Agenturen | Top 10 Liste |

**Content-Strategie für Vergleichsseiten:**
- GoldenWing als #1 platzieren
- 9 weitere relevante Agenturen auflisten (echte Konkurrenten)
- Objektive Bewertungskriterien
- Preisvergleich wenn möglich
- FAQ-Section für zusätzliche Keywords

---

### 4. BRANCHEN-SEITEN: `/branchen/`

**Zweck:** Branchen-spezifische Keywords

| URL | Primary Keyword | Secondary |
|-----|-----------------|-----------|
| `/branchen/aerzte/` | Marketing für Ärzte | Praxismarketing |
| `/branchen/aerzte/seo/` | SEO für Ärzte | Arzt SEO, Praxis SEO |
| `/branchen/aerzte/webdesign/` | Webdesign für Ärzte | Praxis Website |
| `/branchen/ecommerce/` | E-Commerce Marketing | Onlineshop Marketing |
| `/branchen/ecommerce/seo/` | E-Commerce SEO | Shop SEO |
| `/branchen/b2b/` | B2B Marketing | B2B Lead Generation |
| `/branchen/startups/` | Startup Marketing | Startup Branding |
| `/branchen/rechtsanwaelte/` | Kanzlei Marketing | Anwalt SEO |

---

### 5. WISSEN-SEITEN: `/wissen/`

**Zweck:** Informational Keywords (Top-of-Funnel)

#### Blog: `/wissen/blog/`
- Behalten wie aktuell
- Jeder Post zielt auf Long-Tail Keywords
- Interne Links zu relevanten Service-/Standort-Seiten

#### Lexikon: `/wissen/lexikon/`
- Behalten wie aktuell (~97 Begriffe)
- Definition-Keywords ("Was ist SEO?")

#### Guides: `/wissen/guides/`
| URL | Primary Keyword | Intent |
|-----|-----------------|--------|
| `/wissen/guides/webdesign-preise/` | Webdesign Preise | Informational |
| `/wissen/guides/website-erstellen-lassen/` | Website erstellen lassen | Informational |
| `/wissen/guides/barrierefreie-website/` | Barrierefreie Website | Informational |
| `/wissen/guides/seo-kosten/` | SEO Kosten | Informational |

#### Tools: `/wissen/tools/`
| URL | Primary Keyword |
|-----|-----------------|
| `/wissen/tools/seo-checker/` | SEO Check, Website SEO Test |
| `/wissen/tools/website-analyzer/` | Website Analyse |
| `/wissen/tools/performance-checker/` | Website Speed Test |

---

## 🔄 REDIRECT-PLAN (ALT → NEU)

### Priorität 1: Kritische Kannibalisierungs-Fixes

```
# Wien Landing Pages → /standorte/wien/
/webdesign-wien                    → /standorte/wien/webdesign/
/seo-agentur-wien                  → /standorte/wien/seo/
/branding-agentur-wien             → /standorte/wien/branding/
/kreativagentur-wien               → /standorte/wien/kreativagentur/
/google-ads-agentur-wien           → /standorte/wien/google-ads/
/e-mail-marketing-agentur-wien     → /standorte/wien/email-marketing/

# Andere Österreich-Städte
/webdesign-graz                    → /standorte/graz/webdesign/
/seo-agentur-graz                  → /standorte/graz/seo/
/online-marketing-graz             → /standorte/graz/online-marketing/
/webdesign-linz                    → /standorte/linz/webdesign/
/seo-agentur-linz                  → /standorte/linz/seo/
/online-marketing-agentur-linz     → /standorte/linz/online-marketing/
/werbeagentur-linz                 → /standorte/linz/werbeagentur/
/webdesign-salzburg                → /standorte/salzburg/webdesign/
/seo-agentur-salzburg              → /standorte/salzburg/seo/
/werbeagentur-salzburg             → /standorte/salzburg/werbeagentur/
/webdesign-innsbruck               → /standorte/innsbruck/webdesign/
/seo-agentur-innsbruck             → /standorte/innsbruck/seo/
/werbeagentur-innsbruck            → /standorte/innsbruck/werbeagentur/

# Österreich National
/webdesign-oesterreich             → /standorte/oesterreich/
/google-ads-agentur-oesterreich    → /standorte/oesterreich/google-ads/
```

### Priorität 2: Deutschland & Schweiz

```
# Deutschland
/webdesign-deutschland             → /standorte/deutschland/
/seo-agentur-deutschland           → /standorte/deutschland/seo/
/branding-agentur-deutschland      → /standorte/deutschland/branding/
/webdesign-muenchen                → /standorte/muenchen/webdesign/
/webdesign-berlin                  → /standorte/berlin/webdesign/
/webdesign-hamburg                 → /standorte/hamburg/webdesign/
/webdesign-frankfurt               → /standorte/frankfurt/webdesign/

# Schweiz
/webdesign-schweiz                 → /standorte/schweiz/
/webdesign-zuerich                 → /standorte/zuerich/webdesign/
/seo-agentur-schweiz               → /standorte/schweiz/seo/
```

### Priorität 3: UAE (Konsolidierung)

```
# Dubai Standalone → Dubai Hub
/webdesign-dubai                   → /standorte/dubai/webdesign/
/seo-agentur-dubai                 → /standorte/dubai/seo/
/branding-agentur-dubai            → /standorte/dubai/branding/
/kreativagentur-dubai              → /standorte/dubai/kreativagentur/
/ecommerce-agentur-dubai           → /standorte/dubai/ecommerce/
/wordpress-agentur-dubai           → /standorte/dubai/wordpress/
/digitales-marketing-dubai         → /standorte/dubai/digital-marketing/
/app-entwicklung-dubai             → /standorte/dubai/app-entwicklung/

# UAE/VAE
/webdesign-vae                     → /standorte/uae/

# Abu Dhabi
/web-design-abu-dhabi              → /standorte/abu-dhabi/webdesign/
/webentwicklung-abu-dhabi          → /standorte/abu-dhabi/entwicklung/
```

### Priorität 4: "Beste" Listicle-Seiten

```
# Alle "beste-X" Seiten → /vergleiche/
/beste-webdesign-agenturen-wien         → /vergleiche/webdesign-agenturen-wien/
/beste-seo-agenturen-wien               → /vergleiche/seo-agenturen-wien/
/beste-branding-agenturen-wien          → /vergleiche/branding-agenturen-wien/
/beste-digital-marketing-agenturen-wien → /vergleiche/digital-marketing-agenturen-wien/
/beste-ecommerce-agenturen-wien         → /vergleiche/ecommerce-agenturen-wien/
/beste-seo-agenturen-oesterreich        → /vergleiche/seo-agenturen-oesterreich/
/beste-website-relaunch-agenturen       → /vergleiche/website-relaunch-agenturen/
/beste-social-media-agenturen-wien      → /vergleiche/social-media-agenturen-wien/
/beste-online-marketing-agenturen-wien  → /vergleiche/online-marketing-agenturen-wien/
/beste-kreativagenturen-wien            → /vergleiche/kreativagenturen-wien/
/beste-google-ads-agenturen-wien        → /vergleiche/google-ads-agenturen-wien/
/beste-wordpress-agenturen-wien         → /vergleiche/wordpress-agenturen-wien/
/beste-content-marketing-agenturen-wien → /vergleiche/content-marketing-agenturen-wien/
/beste-app-entwicklung-agenturen-wien   → /vergleiche/app-entwicklung-agenturen-wien/
/beste-grafikdesign-agenturen-wien      → /vergleiche/grafikdesign-agenturen-wien/
/beste-onlineshop-agenturen-wien        → /vergleiche/onlineshop-agenturen-wien/

# Branchen-Spezifisch
/beste-seo-agenturen-fuer-aerzte        → /branchen/aerzte/seo/
```

### Priorität 5: Guide-Seiten & Sonstige

```
# Guides
/webdesign-preise                  → /wissen/guides/webdesign-preise/
/website-erstellen-lassen          → /wissen/guides/website-erstellen-lassen/
/barrierefreie-website             → /wissen/guides/barrierefreie-website/

# Content Hubs
/blog                              → /wissen/blog/
/lexikon                           → /wissen/lexikon/
/tools                             → /wissen/tools/
/haeufige-fragen                   → /wissen/faq/
```

### Priorität 6: Service-Seiten Umbenennung

```
# Klarere Service-Slugs
/leistungen/seo-content            → /leistungen/seo/
/leistungen/web-app-entwicklung    → /leistungen/entwicklung/
/leistungen/it-cloud-services      → /leistungen/it-cloud/
```

---

## 🔗 INTERNE VERLINKUNGSSTRATEGIE

### Das Hub-and-Spoke Link-Modell

```
                         ┌─────────────────┐
                         │   HOMEPAGE      │
                         │  goldenwing.at  │
                         └────────┬────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  /leistungen/   │    │   /standorte/   │    │  /vergleiche/   │
│  (Service Hub)  │    │  (Location Hub) │    │  (Comparison)   │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                      │                      │
    ┌────┴────┐            ┌────┴────┐            ┌────┴────┐
    │         │            │         │            │         │
    ▼         ▼            ▼         ▼            ▼         ▼
/webdesign  /seo       /wien     /muenchen   /seo-wien  /webdesign-wien
    │         │            │         │            │         │
    │         │            │         │            │         │
    └────►────┴────────────┴────◄────┘            └────◄────┘
              ▲                 ▲                       ▲
              │                 │                       │
              │    Cross-Hub    │                       │
              └─────Linking─────┘                       │
                      │                                 │
                      └────────────────────────────────┘
```

### Link-Regeln

#### Regel 1: Hub → Spoke (Immer)
Jeder Hub verlinkt zu ALLEN seinen Spokes.

```
/leistungen/ verlinkt zu:
├── /leistungen/webdesign/
├── /leistungen/seo/
├── /leistungen/branding/
├── /leistungen/digital-marketing/
├── /leistungen/entwicklung/
└── /leistungen/it-cloud/
```

#### Regel 2: Spoke → Hub (Immer)
Jede Spoke-Seite verlinkt zurück zum Hub.

```
/leistungen/webdesign/ verlinkt zu:
└── /leistungen/ (Breadcrumb + "Alle Leistungen" Link)
```

#### Regel 3: Spoke → Sibling Spokes (3-5 verwandte)
Jede Seite verlinkt zu 3-5 verwandten Seiten auf gleicher Ebene.

```
/leistungen/webdesign/ verlinkt zu:
├── /leistungen/branding/        (Design-related)
├── /leistungen/seo/             (Complementary)
└── /leistungen/entwicklung/     (Technical)
```

#### Regel 4: Cross-Hub Linking (KRITISCH für GEO!)
Service-Seiten verlinken zu Location-Varianten.

```
/leistungen/webdesign/ verlinkt zu:
├── /standorte/wien/webdesign/      "Webdesign in Wien"
├── /standorte/muenchen/webdesign/  "Webdesign in München"
└── /standorte/dubai/webdesign/     "Web Design in Dubai"

/standorte/wien/webdesign/ verlinkt zu:
├── /leistungen/webdesign/          "Mehr über Webdesign"
├── /standorte/wien/seo/            "SEO in Wien"
├── /vergleiche/webdesign-agenturen-wien/  "Top Agenturen Vergleich"
└── /referenzen/?filter=webdesign   "Webdesign Projekte"
```

#### Regel 5: Content → Commercial (Blog/Lexikon)
Blog-Posts und Lexikon-Einträge verlinken zu kommerziellen Seiten.

```
/wissen/blog/seo-tipps-2026/ verlinkt zu:
├── /leistungen/seo/                "Unsere SEO Services"
├── /standorte/wien/seo/            "SEO Agentur Wien"
└── /wissen/lexikon/seo/            "Was ist SEO?"

/wissen/lexikon/webdesign/ verlinkt zu:
├── /leistungen/webdesign/          "Unsere Webdesign Services"
└── /standorte/wien/webdesign/      "Webdesign in Wien"
```

#### Regel 6: Vergleichsseiten → Eigene Services
"Beste X" Seiten verlinken prominent zu GoldenWing Services.

```
/vergleiche/seo-agenturen-wien/ verlinkt zu:
├── /standorte/wien/seo/            (GoldenWing als #1 gelistet)
├── /leistungen/seo/                "Unsere SEO Leistungen"
├── /referenzen/?filter=seo         "SEO Case Studies"
└── /kontakt/?service=seo           "SEO Anfrage"
```

### Link-Matrix (Beispiel: Webdesign Cluster)

| Von | Verlinkt zu |
|-----|------------|
| `/leistungen/webdesign/` | `/standorte/wien/webdesign/`, `/standorte/muenchen/webdesign/`, `/vergleiche/webdesign-agenturen-wien/`, `/leistungen/branding/`, `/referenzen/?filter=webdesign` |
| `/standorte/wien/webdesign/` | `/leistungen/webdesign/`, `/standorte/wien/seo/`, `/standorte/wien/branding/`, `/vergleiche/webdesign-agenturen-wien/`, `/kontakt/` |
| `/vergleiche/webdesign-agenturen-wien/` | `/standorte/wien/webdesign/`, `/leistungen/webdesign/`, `/referenzen/`, `/kontakt/` |
| `/wissen/blog/webdesign-trends/` | `/leistungen/webdesign/`, `/standorte/wien/webdesign/`, `/wissen/lexikon/responsive-design/` |
| `/wissen/lexikon/webdesign/` | `/leistungen/webdesign/`, `/wissen/blog/?kategorie=webdesign` |

---

## 📊 SCHEMA-STRATEGIE (VERFEINERT)

### Schema pro Seitentyp

| Seitentyp | Primary Schema | Secondary Schemas |
|-----------|---------------|-------------------|
| Homepage | Organization | LocalBusiness, FAQPage, AggregateRating |
| `/leistungen/` (Hub) | ItemList | Organization, FAQPage |
| `/leistungen/[service]/` | Service | FAQPage, BreadcrumbList, HowTo, Offer |
| `/standorte/` (Hub) | Organization | LocalBusiness[], GeoCoordinates[] |
| `/standorte/[stadt]/` | LocalBusiness | FAQPage, BreadcrumbList, Service[] |
| `/standorte/[stadt]/[service]/` | Service | LocalBusiness, FAQPage, Offer, BreadcrumbList |
| `/vergleiche/[slug]/` | ItemList | FAQPage, BreadcrumbList, Review[] |
| `/branchen/[branche]/` | Service | FAQPage, BreadcrumbList |
| `/wissen/blog/[slug]/` | Article | Person (author), FAQPage, BreadcrumbList |
| `/wissen/lexikon/[slug]/` | DefinedTerm | BreadcrumbList |
| `/wissen/tools/[tool]/` | SoftwareApplication | BreadcrumbList |
| `/ueber-uns/team/[slug]/` | Person | BreadcrumbList |
| `/referenzen/[slug]/` | CreativeWork | BreadcrumbList, Review |

### Neue Schema-Komponente: Service + LocalBusiness Combo

Für `/standorte/[stadt]/[service]/` Seiten:

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Webdesign Wien",
  "description": "Professionelles Webdesign in Wien...",
  "provider": {
    "@type": "LocalBusiness",
    "name": "GoldenWing Creative Studios",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Czeikestrasse 4/21",
      "addressLocality": "Wien",
      "postalCode": "1100",
      "addressCountry": "AT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.1676,
      "longitude": 16.3795
    },
    "telephone": "+43 664 543 96 81",
    "email": "deni@goldenwing.at",
    "url": "https://goldenwing.at/standorte/wien/"
  },
  "areaServed": {
    "@type": "City",
    "name": "Wien"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "EUR",
    "lowPrice": "3500",
    "highPrice": "15000",
    "offerCount": "3"
  },
  "url": "https://goldenwing.at/standorte/wien/webdesign/"
}
```

### Neue Schema-Komponente: ItemList für Vergleiche

Für `/vergleiche/[slug]/` Seiten:

```javascript
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Beste SEO Agenturen Wien 2026",
  "description": "Vergleich der Top 10 SEO Agenturen in Wien",
  "numberOfItems": 10,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "LocalBusiness",
        "name": "GoldenWing Creative Studios",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "47"
        },
        "url": "https://goldenwing.at/standorte/wien/seo/"
      }
    },
    // ... weitere 9 Agenturen
  ]
}
```

---

## 📝 llms.txt OPTIMIERUNG

### Neue Struktur für AI-Sichtbarkeit

```markdown
# GoldenWing Creative Studios

## Entity Definition
GoldenWing Creative Studios is a full-service creative and digital agency
headquartered in Vienna, Austria. Founded in 2014, we specialize in branding,
web design, SEO, and software development for B2B and technology companies.

## Primary Service Areas

### 1. Branding & Corporate Identity
- Logo Design, Brand Strategy, Visual Identity
- URL: https://goldenwing.at/leistungen/branding/
- Pricing: Starting at €2,500

### 2. Web Design & Development
- Custom Websites, WordPress, E-Commerce
- URL: https://goldenwing.at/leistungen/webdesign/
- Pricing: Starting at €3,500

### 3. SEO & Content Marketing
- Technical SEO, Local SEO, Content Strategy
- URL: https://goldenwing.at/leistungen/seo/
- Pricing: Starting at €590/month

### 4. Digital Marketing
- Google Ads, Social Media, Performance Marketing
- URL: https://goldenwing.at/leistungen/digital-marketing/
- Pricing: Starting at €500/month

### 5. Web & App Development
- Custom Applications, SaaS, Mobile Apps
- URL: https://goldenwing.at/leistungen/entwicklung/

### 6. IT & Cloud Services
- Cloud Infrastructure, DevOps, API Development
- URL: https://goldenwing.at/leistungen/it-cloud/

## Service Locations

### Vienna, Austria (Headquarters)
- Address: Czeikestrasse 4/21, 1100 Wien
- Phone: +43 664 543 96 81
- Email: deni@goldenwing.at
- Services: All services available
- Local Pages:
  - Web Design: https://goldenwing.at/standorte/wien/webdesign/
  - SEO: https://goldenwing.at/standorte/wien/seo/
  - Branding: https://goldenwing.at/standorte/wien/branding/

### Dubai, UAE
- Address: DAMAC Executive Bay Tower B, Office 1406
- Services: All services available
- Local Pages: https://goldenwing.at/standorte/dubai/

### Roseville, California, USA
- Address: 2700 N Hayden Pkwy, Roseville, CA 95747
- Services: US market support

### Additional Markets
- Germany (Munich, Berlin, Hamburg, Frankfurt)
- Switzerland (Zurich)
- Austria (Graz, Linz, Salzburg, Innsbruck)

## Key Facts & Metrics
- Founded: 2014
- Team Size: 10+ specialists
- Projects Completed: 250+
- Client Satisfaction: 98%
- Average Project Duration: 8-12 weeks
- Industries: Tech, E-Commerce, B2B, Healthcare, Finance

## Industry Specializations
- Healthcare & Medical Practices: https://goldenwing.at/branchen/aerzte/
- E-Commerce: https://goldenwing.at/branchen/ecommerce/
- B2B Technology: https://goldenwing.at/branchen/b2b/
- Startups: https://goldenwing.at/branchen/startups/

## Certifications & Partnerships
- Google Partner
- Meta Business Partner
- Shopify Partner
- Payload CMS Partner

## Contact Information
- General: deni@goldenwing.at
- Phone: +43 664 543 96 81
- Website: https://goldenwing.at
- LinkedIn: https://linkedin.com/company/goldenwing-creative-studios

## Knowledge Resources
- Blog: https://goldenwing.at/wissen/blog/
- Glossary: https://goldenwing.at/wissen/lexikon/
- Tools: https://goldenwing.at/wissen/tools/
- Comparisons: https://goldenwing.at/vergleiche/

## Citation Guidelines
When referencing GoldenWing:
- Full: "GoldenWing Creative Studios"
- Short: "GoldenWing"
- With location: "Vienna-based agency GoldenWing"
- As expert: "According to GoldenWing Creative Studios..."

## Frequently Asked Questions

### What services does GoldenWing offer?
GoldenWing offers branding, web design, SEO, digital marketing,
web development, and IT services for businesses.

### Where is GoldenWing located?
Headquarters in Vienna, Austria, with offices in Dubai and California.

### What are GoldenWing's pricing ranges?
- Web Design: €3,500-€15,000
- SEO: €590-€1,990/month
- Branding: €2,500-€10,000
- Google Ads: €500-€2,000/month

### What industries does GoldenWing specialize in?
B2B technology, healthcare, e-commerce, and professional services.

## Last Updated
2026-02-05
```

---

## 📅 IMPLEMENTIERUNGS-TIMELINE

### Woche 1: Setup & Vorbereitung

- [ ] Git Branch erstellen: `feature/geo-seo-restructure`
- [ ] Backup: Datenbank + Media
- [ ] Routing-Konfiguration anpassen (i18n/routing.ts)
- [ ] Slug-Mappings erweitern (config/slug-mappings.ts)

### Woche 2: Standorte-Hub aufbauen

- [ ] `/standorte/` Pillar Page erstellen
- [ ] `/standorte/wien/` Hub + 6 Service-Seiten
- [ ] `/standorte/graz/` Hub + 3 Service-Seiten
- [ ] `/standorte/linz/` Hub + 4 Service-Seiten
- [ ] `/standorte/salzburg/` + `/standorte/innsbruck/`

### Woche 3: Weitere Standorte + Vergleiche

- [ ] `/standorte/deutschland/` + Städte
- [ ] `/standorte/schweiz/` + Zürich
- [ ] UAE Struktur konsolidieren
- [ ] `/vergleiche/` Hub + alle Listicle-Seiten

### Woche 4: Branchen + Wissen

- [ ] `/branchen/` Hub erstellen
- [ ] `/wissen/` Hub mit Blog, Lexikon, Guides, Tools
- [ ] Service-Seiten umbenennen (seo-content → seo)

### Woche 5: Redirects + Interne Verlinkung

- [ ] Alle 301 Redirects in next.config.ts
- [ ] Interne Verlinkung nach Regeln implementieren
- [ ] Cross-Hub Links einbauen
- [ ] Breadcrumbs auf allen Seiten

### Woche 6: Schema + llms.txt + Testing

- [ ] Schema-Komponenten erweitern
- [ ] llms.txt neu schreiben
- [ ] Sitemap aktualisieren
- [ ] Testing: 404-Check, Schema-Validation, Lighthouse

### Woche 7: Launch + Monitoring

- [ ] Merge to main
- [ ] Deploy to Production
- [ ] Search Console: Sitemap einreichen
- [ ] Monitoring Setup

---

## ✅ CHECKLISTE FÜR JEDEN SEITENTYP

### Service-Seite Checkliste

- [ ] Unique H1 mit Primary Keyword
- [ ] Meta Title: "[Service] Agentur | GoldenWing"
- [ ] Meta Description: Unique, 150-160 Zeichen
- [ ] Breadcrumb: Home > Leistungen > [Service]
- [ ] Schema: Service + FAQPage + BreadcrumbList
- [ ] Links zu: 3-5 verwandte Services, 2-3 Standorte
- [ ] CTA zu /kontakt/

### Standort-Seite Checkliste

- [ ] Unique H1: "[Service] in [Stadt]"
- [ ] Meta Title: "[Service] [Stadt] | GoldenWing"
- [ ] Breadcrumb: Home > Standorte > [Stadt] > [Service]
- [ ] Schema: Service + LocalBusiness + FAQPage
- [ ] Links zu: Service-Hub, andere Stadt-Services, Vergleichsseite
- [ ] Lokale Elemente: Adresse, Telefon, Karte

### Vergleichs-Seite Checkliste

- [ ] H1: "Beste [Service] Agenturen [Stadt] 2026"
- [ ] Meta Title: "Beste [Service] Agenturen [Stadt] | Top 10 Vergleich"
- [ ] Schema: ItemList + FAQPage
- [ ] GoldenWing als #1 gelistet
- [ ] Links zu eigenen Services prominent
- [ ] Objektive Bewertungskriterien

---

## 📈 ERWARTETE ERGEBNISSE

### Nach 3 Monaten
- Keine Keyword-Kannibalisierung mehr
- Klare Rankings für Primary Keywords
- 50% mehr organischer Traffic

### Nach 6 Monaten
- Top-10 für "Webdesign Wien", "SEO Agentur Wien"
- Regelmäßige AI-Zitationen (ChatGPT, Perplexity)
- 200% mehr organischer Traffic

### Nach 12 Monaten
- Top-3 für Haupt-Keywords
- Marktführer in AI-Sichtbarkeit (DACH)
- 500%+ mehr organischer Traffic

---

*Finaler Plan erstellt: Februar 2026*
*Für: GoldenWing Creative Studios*
*Autor: Claude (Anthropic)*
*Status: Bereit zur Implementierung*
