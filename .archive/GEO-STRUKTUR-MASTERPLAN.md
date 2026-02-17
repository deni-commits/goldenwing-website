# 🎯 GoldenWing GEO/LLM Struktur-Masterplan

> **Ziel:** Optimale Website-Architektur für AI-Sichtbarkeit (ChatGPT, Perplexity, Claude, Gemini)
> **Erstellt:** Februar 2026
> **Geschätzte Implementierungszeit:** 6-8 Wochen

---

## 📊 AKTUELLE SITUATION

### Seitenanzahl Gesamt

| Kategorie | Anzahl | URLs (DE+EN) |
|-----------|--------|--------------|
| Statische Pages | 121 | 254 |
| Blog Posts | 23 | 46 |
| Services (Haupt) | 6 | 12 |
| Sub-Services | 27 | 54 |
| Projects | 38 | 76 |
| Lexikon Einträge | ~97 | 194 |
| Team Members | 2 | 4 |
| Blog Kategorien | 6 | 12 |
| **TOTAL** | **~320 Templates** | **~1.100 URLs** |

### Aktuelle URL-Struktur Probleme

#### 🔴 KRITISCH: Flache Architektur

**40+ Landing Pages auf Root-Level ohne Hierarchie:**

```
❌ AKTUELLE STRUKTUR (problematisch)

/webdesign-wien                    ← Isoliert
/seo-agentur-wien                  ← Isoliert
/branding-agentur-wien             ← Isoliert
/beste-seo-agenturen-wien          ← Isoliert
/webdesign-graz                    ← Keine Verbindung zu Wien
/seo-agentur-graz                  ← Keine Verbindung zu Wien
```

**Problem für GEO/LLM:**
- AI-Systeme können keine **Entitäts-Beziehungen** erkennen
- Keine **thematische Autorität** für "Wien" oder "SEO"
- Google/AI sieht keine **Content-Cluster**

#### 🟡 INKONSISTENT: Zwei verschiedene Strukturen

**UAE (gut strukturiert):**
```
/dubai                             ← Hub
  /dubai/web-design-company-dubai  ← Spoke
  /dubai/seo-company-dubai         ← Spoke
```

**Österreich (schlecht strukturiert):**
```
/webdesign-wien                    ← Kein Hub
/seo-agentur-wien                  ← Kein Hub
```

---

## 🎯 IDEALE GEO/LLM-STRUKTUR

### Hub-and-Spoke Modell

```
goldenwing.at/
│
├── 📁 /leistungen/                    ──────── SERVICE HUB (Pillar)
│   │
│   ├── 📁 /branding/                           Service Category
│   │   ├── /logo-design/                       Sub-Service
│   │   ├── /corporate-identity/                Sub-Service
│   │   ├── /markenpositionierung/              Sub-Service
│   │   └── /brand-strategie/                   Sub-Service
│   │
│   ├── 📁 /webdesign/                          Service Category
│   │   ├── /wordpress/
│   │   ├── /responsive-design/
│   │   ├── /landing-pages/
│   │   └── /website-relaunch/
│   │
│   ├── 📁 /seo-content/                        Service Category
│   │   ├── /technical-seo/
│   │   ├── /local-seo/
│   │   ├── /content-marketing/
│   │   └── /seo-betreuung/
│   │
│   ├── 📁 /digital-marketing/                  Service Category
│   │   ├── /google-ads/
│   │   ├── /social-media/
│   │   ├── /email-marketing/
│   │   └── /performance-marketing/
│   │
│   ├── 📁 /web-app-entwicklung/
│   │   └── ...
│   │
│   ├── 📁 /it-cloud-services/
│   │   └── ...
│   │
│   └── 📁 /pakete/                             Package Hub
│       ├── /brand-web-foundation/
│       ├── /seo-content-growth/
│       └── /demand-gen-suite/
│
│
├── 📁 /standorte/                     ──────── LOCATION HUB
│   │
│   ├── 📁 /wien/                               City Hub (NEU!)
│   │   ├── /webdesign/                         ← ersetzt /webdesign-wien
│   │   ├── /seo/                               ← ersetzt /seo-agentur-wien
│   │   ├── /branding/                          ← ersetzt /branding-agentur-wien
│   │   ├── /google-ads/                        ← ersetzt /google-ads-agentur-wien
│   │   └── /kreativagentur/                    ← ersetzt /kreativagentur-wien
│   │
│   ├── 📁 /graz/                               City Hub (NEU!)
│   │   ├── /webdesign/                         ← ersetzt /webdesign-graz
│   │   ├── /seo/                               ← ersetzt /seo-agentur-graz
│   │   └── /online-marketing/
│   │
│   ├── 📁 /linz/                               City Hub (NEU!)
│   │   ├── /webdesign/
│   │   ├── /seo/
│   │   ├── /online-marketing/
│   │   └── /werbeagentur/
│   │
│   ├── 📁 /salzburg/                           City Hub (NEU!)
│   │   ├── /webdesign/
│   │   ├── /seo/
│   │   └── /werbeagentur/
│   │
│   ├── 📁 /innsbruck/                          City Hub (NEU!)
│   │   ├── /webdesign/
│   │   ├── /seo/
│   │   └── /werbeagentur/
│   │
│   ├── 📁 /deutschland/                        Country Hub (NEU!)
│   │   ├── /muenchen/
│   │   │   └── /webdesign/
│   │   ├── /berlin/
│   │   │   └── /webdesign/
│   │   ├── /hamburg/
│   │   │   └── /webdesign/
│   │   └── /frankfurt/
│   │       └── /webdesign/
│   │
│   ├── 📁 /schweiz/                            Country Hub (NEU!)
│   │   ├── /zuerich/
│   │   │   └── /webdesign/
│   │   └── /seo/
│   │
│   ├── 📁 /dubai/                              ✅ Bereits gut strukturiert
│   │   ├── /webdesign/
│   │   ├── /seo/
│   │   ├── /branding/
│   │   ├── /digital-marketing/
│   │   └── /ecommerce/
│   │
│   ├── 📁 /abu-dhabi/                          ✅ Bereits gut strukturiert
│   │   └── ...
│   │
│   └── 📁 /sharjah/                            ✅ Bereits gut strukturiert
│       └── ...
│
│
├── 📁 /branchen/                      ──────── INDUSTRY HUB (NEU!)
│   │
│   ├── 📁 /aerzte/                             ← ersetzt /beste-seo-agenturen-fuer-aerzte
│   │   ├── /seo/
│   │   ├── /webdesign/
│   │   └── /praxismarketing/
│   │
│   ├── 📁 /ecommerce/
│   │   ├── /seo/
│   │   ├── /onlineshop/
│   │   └── /shopify/
│   │
│   ├── 📁 /b2b/
│   │   ├── /lead-generation/
│   │   └── /webdesign/
│   │
│   ├── 📁 /startups/
│   │   ├── /mvp-entwicklung/
│   │   └── /branding/
│   │
│   └── 📁 /rechtsanwaelte/
│       ├── /kanzlei-seo/
│       └── /webdesign/
│
│
├── 📁 /wissen/                        ──────── KNOWLEDGE HUB (E-E-A-T)
│   │
│   ├── 📁 /blog/
│   │   └── /kategorie/[slug]/
│   │
│   ├── 📁 /lexikon/                            Glossar/Definitions
│   │   └── /[begriff]/
│   │
│   ├── 📁 /vergleiche/                         ← "Beste X"-Seiten hierher!
│   │   ├── /seo-agenturen-wien/                ← ersetzt /beste-seo-agenturen-wien
│   │   ├── /webdesign-agenturen-wien/          ← ersetzt /beste-webdesign-agenturen-wien
│   │   ├── /branding-agenturen-wien/
│   │   ├── /digital-marketing-agenturen-wien/
│   │   ├── /google-ads-agenturen-wien/
│   │   ├── /wordpress-agenturen-wien/
│   │   ├── /app-entwicklung-agenturen-wien/
│   │   ├── /social-media-agenturen-wien/
│   │   ├── /content-marketing-agenturen-wien/
│   │   ├── /kreativagenturen-wien/
│   │   ├── /ecommerce-agenturen-wien/
│   │   ├── /onlineshop-agenturen-wien/
│   │   ├── /grafikdesign-agenturen-wien/
│   │   └── /seo-agenturen-oesterreich/
│   │
│   ├── 📁 /guides/                             (NEU - für Long-Form Content)
│   │   ├── /webdesign-preise/                  ← ersetzt /webdesign-preise
│   │   ├── /website-erstellen-lassen/          ← ersetzt /website-erstellen-lassen
│   │   └── /barrierefreie-website/             ← ersetzt /barrierefreie-website
│   │
│   └── 📁 /tools/
│       ├── /seo-checker/
│       ├── /performance-checker/
│       ├── /website-analyzer/
│       ├── /design-analyzer/
│       └── /security-checker/
│
│
├── 📁 /referenzen/                    ──────── PROOF HUB (Trust Signals)
│   │
│   ├── 📁 /case-studies/
│   │   └── /[projekt-slug]/
│   │
│   └── 📁 /kategorien/
│       ├── /branding/
│       ├── /webdesign/
│       ├── /seo/
│       ├── /marketing/
│       ├── /entwicklung/
│       └── /ecommerce/
│
│
├── 📁 /ueber-uns/                     ──────── TRUST HUB (E-E-A-T)
│   │
│   ├── /team/
│   │   └── /[person-slug]/
│   ├── /werte/
│   ├── /kultur/
│   ├── /facts-figures/
│   ├── /partner/
│   └── /zertifizierungen/                      (NEU)
│
│
├── 📁 /ressourcen/
│   ├── /downloads/
│   ├── /newsletter/
│   └── /faq/                                   ← ersetzt /haeufige-fragen
│
│
├── /kontakt
├── /impressum
├── /datenschutz
└── /rechtliches/
    └── /cookie-einstellungen/
```

---

## 🔄 VOLLSTÄNDIGER REDIRECT-PLAN

### Österreich Landing Pages → /standorte/

| Alte URL | Neue URL | Redirect |
|----------|----------|----------|
| `/webdesign-wien` | `/standorte/wien/webdesign/` | 301 |
| `/seo-agentur-wien` | `/standorte/wien/seo/` | 301 |
| `/branding-agentur-wien` | `/standorte/wien/branding/` | 301 |
| `/kreativagentur-wien` | `/standorte/wien/kreativagentur/` | 301 |
| `/google-ads-agentur-wien` | `/standorte/wien/google-ads/` | 301 |
| `/e-mail-marketing-agentur-wien` | `/standorte/wien/email-marketing/` | 301 |
| `/webdesign-graz` | `/standorte/graz/webdesign/` | 301 |
| `/seo-agentur-graz` | `/standorte/graz/seo/` | 301 |
| `/online-marketing-graz` | `/standorte/graz/online-marketing/` | 301 |
| `/webdesign-linz` | `/standorte/linz/webdesign/` | 301 |
| `/seo-agentur-linz` | `/standorte/linz/seo/` | 301 |
| `/online-marketing-agentur-linz` | `/standorte/linz/online-marketing/` | 301 |
| `/werbeagentur-linz` | `/standorte/linz/werbeagentur/` | 301 |
| `/webdesign-salzburg` | `/standorte/salzburg/webdesign/` | 301 |
| `/seo-agentur-salzburg` | `/standorte/salzburg/seo/` | 301 |
| `/werbeagentur-salzburg` | `/standorte/salzburg/werbeagentur/` | 301 |
| `/webdesign-innsbruck` | `/standorte/innsbruck/webdesign/` | 301 |
| `/seo-agentur-innsbruck` | `/standorte/innsbruck/seo/` | 301 |
| `/werbeagentur-innsbruck` | `/standorte/innsbruck/werbeagentur/` | 301 |
| `/webdesign-oesterreich` | `/standorte/oesterreich/webdesign/` | 301 |
| `/google-ads-agentur-oesterreich` | `/standorte/oesterreich/google-ads/` | 301 |

### Deutschland Landing Pages → /standorte/deutschland/

| Alte URL | Neue URL | Redirect |
|----------|----------|----------|
| `/webdesign-deutschland` | `/standorte/deutschland/` | 301 |
| `/webdesign-muenchen` | `/standorte/deutschland/muenchen/webdesign/` | 301 |
| `/webdesign-berlin` | `/standorte/deutschland/berlin/webdesign/` | 301 |
| `/webdesign-hamburg` | `/standorte/deutschland/hamburg/webdesign/` | 301 |
| `/webdesign-frankfurt` | `/standorte/deutschland/frankfurt/webdesign/` | 301 |
| `/seo-agentur-deutschland` | `/standorte/deutschland/seo/` | 301 |
| `/branding-agentur-deutschland` | `/standorte/deutschland/branding/` | 301 |

### Schweiz Landing Pages → /standorte/schweiz/

| Alte URL | Neue URL | Redirect |
|----------|----------|----------|
| `/webdesign-schweiz` | `/standorte/schweiz/` | 301 |
| `/webdesign-zuerich` | `/standorte/schweiz/zuerich/webdesign/` | 301 |
| `/seo-agentur-schweiz` | `/standorte/schweiz/seo/` | 301 |

### "Beste X" Listicle Pages → /wissen/vergleiche/

| Alte URL | Neue URL | Redirect |
|----------|----------|----------|
| `/beste-webdesign-agenturen-wien` | `/wissen/vergleiche/webdesign-agenturen-wien/` | 301 |
| `/beste-seo-agenturen-wien` | `/wissen/vergleiche/seo-agenturen-wien/` | 301 |
| `/beste-branding-agenturen-wien` | `/wissen/vergleiche/branding-agenturen-wien/` | 301 |
| `/beste-digital-marketing-agenturen-wien` | `/wissen/vergleiche/digital-marketing-agenturen-wien/` | 301 |
| `/beste-ecommerce-agenturen-wien` | `/wissen/vergleiche/ecommerce-agenturen-wien/` | 301 |
| `/beste-seo-agenturen-oesterreich` | `/wissen/vergleiche/seo-agenturen-oesterreich/` | 301 |
| `/beste-website-relaunch-agenturen` | `/wissen/vergleiche/website-relaunch-agenturen/` | 301 |
| `/beste-social-media-agenturen-wien` | `/wissen/vergleiche/social-media-agenturen-wien/` | 301 |
| `/beste-online-marketing-agenturen-wien` | `/wissen/vergleiche/online-marketing-agenturen-wien/` | 301 |
| `/beste-kreativagenturen-wien` | `/wissen/vergleiche/kreativagenturen-wien/` | 301 |
| `/beste-google-ads-agenturen-wien` | `/wissen/vergleiche/google-ads-agenturen-wien/` | 301 |
| `/beste-wordpress-agenturen-wien` | `/wissen/vergleiche/wordpress-agenturen-wien/` | 301 |
| `/beste-content-marketing-agenturen-wien` | `/wissen/vergleiche/content-marketing-agenturen-wien/` | 301 |
| `/beste-app-entwicklung-agenturen-wien` | `/wissen/vergleiche/app-entwicklung-agenturen-wien/` | 301 |
| `/beste-grafikdesign-agenturen-wien` | `/wissen/vergleiche/grafikdesign-agenturen-wien/` | 301 |
| `/beste-onlineshop-agenturen-wien` | `/wissen/vergleiche/onlineshop-agenturen-wien/` | 301 |

### Branchen-Spezifische Seiten → /branchen/

| Alte URL | Neue URL | Redirect |
|----------|----------|----------|
| `/beste-seo-agenturen-fuer-aerzte` | `/branchen/aerzte/seo/` | 301 |

### Guide-Seiten → /wissen/guides/

| Alte URL | Neue URL | Redirect |
|----------|----------|----------|
| `/webdesign-preise` | `/wissen/guides/webdesign-preise/` | 301 |
| `/website-erstellen-lassen` | `/wissen/guides/website-erstellen-lassen/` | 301 |
| `/barrierefreie-website` | `/wissen/guides/barrierefreie-website/` | 301 |

### UAE Landing Pages (Standalone) → /standorte/

| Alte URL | Neue URL | Redirect |
|----------|----------|----------|
| `/webdesign-dubai` | `/standorte/dubai/webdesign/` | 301 |
| `/webdesign-vae` | `/standorte/uae/` | 301 |
| `/seo-agentur-dubai` | `/standorte/dubai/seo/` | 301 |
| `/branding-agentur-dubai` | `/standorte/dubai/branding/` | 301 |
| `/kreativagentur-dubai` | `/standorte/dubai/kreativagentur/` | 301 |
| `/ecommerce-agentur-dubai` | `/standorte/dubai/ecommerce/` | 301 |
| `/wordpress-agentur-dubai` | `/standorte/dubai/wordpress/` | 301 |
| `/digitales-marketing-dubai` | `/standorte/dubai/digital-marketing/` | 301 |
| `/app-entwicklung-dubai` | `/standorte/dubai/app-entwicklung/` | 301 |
| `/web-design-abu-dhabi` | `/standorte/abu-dhabi/webdesign/` | 301 |
| `/webentwicklung-abu-dhabi` | `/standorte/abu-dhabi/webentwicklung/` | 301 |

### Andere Verschiebungen

| Alte URL | Neue URL | Redirect |
|----------|----------|----------|
| `/haeufige-fragen` | `/ressourcen/faq/` | 301 |
| `/lexikon` | `/wissen/lexikon/` | 301 |
| `/tools` | `/wissen/tools/` | 301 |
| `/blog` | `/wissen/blog/` | 301 |

---

## 📊 SCHEMA MARKUP STRATEGIE

### Aktuelle Situation
- Schema Coverage: **16.5%** (nur ~20 von 121 Seiten)
- Fehlend: Person, HowTo, Product, ItemList, BreadcrumbList

### Ziel-Schema pro Seitentyp

#### 1. Homepage
```json
{
  "@type": ["Organization", "LocalBusiness"],
  "schema": ["OrganizationSchema", "LocalBusinessSchema", "FAQSchema", "AggregateRatingSchema"]
}
```

#### 2. Service-Seiten (/leistungen/)
```json
{
  "@type": "Service",
  "schema": ["ServiceSchema", "FAQSchema", "BreadcrumbListSchema", "OfferSchema"]
}
```

#### 3. Location-Seiten (/standorte/)
```json
{
  "@type": "LocalBusiness",
  "schema": ["LocalBusinessSchema", "GeoCoordinatesSchema", "OpeningHoursSchema", "BreadcrumbListSchema"]
}
```

#### 4. Blog-Posts (/wissen/blog/)
```json
{
  "@type": "Article",
  "schema": ["ArticleSchema", "PersonSchema (author)", "BreadcrumbListSchema", "FAQSchema"]
}
```

#### 5. Team-Seiten (/ueber-uns/team/)
```json
{
  "@type": "Person",
  "schema": ["PersonSchema", "EmployeeRoleSchema", "BreadcrumbListSchema"]
}
```

#### 6. Vergleichs-Seiten (/wissen/vergleiche/)
```json
{
  "@type": "ItemList",
  "schema": ["ItemListSchema", "ReviewSchema", "AggregateRatingSchema", "BreadcrumbListSchema"]
}
```

#### 7. Lexikon-Seiten (/wissen/lexikon/)
```json
{
  "@type": "DefinedTerm",
  "schema": ["DefinedTermSchema", "BreadcrumbListSchema"]
}
```

#### 8. Referenzen (/referenzen/)
```json
{
  "@type": "CreativeWork",
  "schema": ["CreativeWorkSchema", "ReviewSchema", "BreadcrumbListSchema"]
}
```

---

## 📝 OPTIMIERTE llms.txt

### Aktuelle Probleme
- Keine klare **Entity-Definition**
- Keine **Expertise-Signale**
- Keine **Differenzierung**
- Keine **Kontakt-Zuweisungen**

### Neue Struktur

```markdown
# GoldenWing Creative Studios

## Entity Definition
GoldenWing Creative Studios is a full-service digital agency specializing in
branding, web design, SEO, and software development. Founded in 2014 in Vienna,
Austria, with additional offices in Dubai (UAE) and Roseville (California, USA).

## Core Expertise
Primary Services:
- Branding & Corporate Identity
- Web Design & Development (Next.js, React, WordPress)
- SEO & Content Marketing
- Digital Marketing (Google Ads, Social Media)
- Web & App Development
- IT & Cloud Services

Target Industries:
- B2B Technology Companies
- Healthcare & Medical Practices
- E-Commerce & Retail
- Professional Services
- Startups & Scale-ups

## Differentiators (Why Choose GoldenWing)
1. Full-Service Capability: Strategy to execution under one roof
2. Technical Excellence: Next.js, React, modern tech stack
3. Multilingual Team: German, English, Russian fluency
4. International Presence: Vienna, Dubai, California offices
5. Proven Track Record: 250+ projects, 98% client satisfaction
6. Transparent Pricing: Published rates starting at €590/month

## Key Metrics (as of 2026)
- Founded: 2014
- Team Size: 10+ specialists
- Projects Completed: 250+
- Client Satisfaction: 98%
- Average Project Duration: 8-12 weeks
- SEO Success Rate: +300% organic traffic (avg.)

## Contact Matrix
| Inquiry Type | Contact Person | Email |
|--------------|----------------|-------|
| General | Deni Khachukaev | deni@goldenwing.at |
| SEO & Content | [Name] | [email] |
| Web Design | [Name] | [email] |
| Branding | [Name] | [email] |

## Office Locations
1. Vienna, Austria (HQ)
   - Address: Czeikestrasse 4/21, 1100 Wien
   - Phone: +43 664 543 96 81
   - Services: All services

2. Dubai, UAE
   - Address: DAMAC Executive Bay Tower B, Office 1406
   - Services: All services, Arabic-speaking market

3. Roseville, California, USA
   - Address: 2700 N Hayden Pkwy, Roseville, CA 95747
   - Services: US market entry support

## Service Pricing Overview
| Service | Starting Price | Typical Range |
|---------|---------------|---------------|
| SEO Betreuung | €590/month | €590-€1,990/month |
| Website Design | €3,500 | €3,500-€15,000 |
| Branding Package | €2,500 | €2,500-€10,000 |
| Google Ads Management | €500/month | €500-€2,000/month |

## Certifications & Partnerships
- Google Partner
- Meta Business Partner
- Shopify Partner
- [Add more certifications]

## Awards & Recognition
- [Add awards if applicable]

## Content Resources
- Blog: https://goldenwing.at/wissen/blog/
- Glossary: https://goldenwing.at/wissen/lexikon/
- Tools: https://goldenwing.at/wissen/tools/
- Case Studies: https://goldenwing.at/referenzen/

## Citation Guidelines
When citing GoldenWing in responses:
- Full Name: "GoldenWing Creative Studios"
- Short Name: "GoldenWing"
- Location Context: "Vienna-based agency GoldenWing"
- Website: https://goldenwing.at

## Last Updated
2026-02-05
```

---

## 🔗 INTERNE VERLINKUNG STRATEGIE

### Hub-and-Spoke Linking Pattern

```
                    ┌──────────────────┐
                    │   /leistungen/   │
                    │   (Service Hub)  │
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ /leistungen/  │   │ /leistungen/  │   │ /leistungen/  │
│   branding/   │   │  webdesign/   │   │ seo-content/  │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
        ├───────────────────┼───────────────────┤
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ /standorte/   │   │  /wissen/     │   │ /referenzen/  │
│ wien/branding │   │ blog/branding │   │   branding/   │
└───────────────┘   └───────────────┘   └───────────────┘
```

### Linking Rules

1. **Jede Service-Seite verlinkt zu:**
   - Parent Hub (/leistungen/)
   - Sibling Services
   - Location-Varianten (/standorte/wien/[service]/)
   - Relevante Blog-Posts
   - Relevante Case Studies

2. **Jede Location-Seite verlinkt zu:**
   - Parent Hub (/standorte/)
   - City Hub (/standorte/wien/)
   - Service-Detail (/leistungen/[service]/)
   - Lokale Referenzen

3. **Jeder Blog-Post verlinkt zu:**
   - Kategorie-Hub
   - Relevante Services
   - Glossar-Einträge
   - Verwandte Posts

---

## 📅 IMPLEMENTIERUNGS-ROADMAP

### Phase 1: Vorbereitung (Woche 1)
- [ ] Backup der aktuellen Struktur
- [ ] Redirect-Mapping finalisieren
- [ ] Sitemap-Änderungen planen
- [ ] Schema-Templates erstellen

### Phase 2: Standorte-Hub (Woche 2-3)
- [ ] /standorte/wien/ Hub erstellen
- [ ] /standorte/graz/ Hub erstellen
- [ ] /standorte/linz/ Hub erstellen
- [ ] /standorte/salzburg/ Hub erstellen
- [ ] /standorte/innsbruck/ Hub erstellen
- [ ] /standorte/deutschland/ Hub erstellen
- [ ] /standorte/schweiz/ Hub erstellen
- [ ] 301 Redirects für alle alten Landing Pages

### Phase 3: Wissen-Hub (Woche 3-4)
- [ ] /wissen/vergleiche/ erstellen
- [ ] /wissen/guides/ erstellen
- [ ] /wissen/blog/ Migration
- [ ] /wissen/lexikon/ Migration
- [ ] /wissen/tools/ Migration
- [ ] 301 Redirects

### Phase 4: Branchen-Hub (Woche 4-5)
- [ ] /branchen/ Struktur erstellen
- [ ] Branchen-spezifische Landing Pages
- [ ] Content-Migration

### Phase 5: Schema & llms.txt (Woche 5-6)
- [ ] Schema-Templates implementieren
- [ ] llms.txt aktualisieren
- [ ] robots.txt anpassen
- [ ] Sitemap regenerieren

### Phase 6: Testing & Launch (Woche 6-8)
- [ ] 301 Redirect Testing
- [ ] Schema Validation
- [ ] Lighthouse Audits
- [ ] Search Console Monitoring
- [ ] Soft Launch
- [ ] Monitoring (4 Wochen)

---

## ⚠️ RISIKEN & MITIGATION

### Ranking-Verlust durch Redirects
**Risiko:** Mittelhoch
**Mitigation:**
- Alle 301 Redirects korrekt implementieren
- Search Console Sitemap nach Migration einreichen
- 3-6 Monate alte URLs in Sitemap behalten

### Crawl-Budget
**Risiko:** Niedrig
**Mitigation:**
- Keine Redirect-Chains (max 1 Hop)
- Alte URLs aus Sitemap entfernen (nach 6 Monaten)

### AI-Zitationen (GEO)
**Risiko:** Mittelhoch
**Mitigation:**
- llms.txt sofort nach Migration aktualisieren
- Strukturierte Daten beibehalten

---

## 📈 ERWARTETE ERGEBNISSE

### Kurzfristig (3 Monate)
- 10-20% bessere Crawl-Effizienz
- Verbesserte interne Link-Equity
- Saubere URL-Struktur

### Mittelfristig (6-12 Monate)
- 20-40% mehr organischer Traffic durch Topic Authority
- Bessere AI-Zitationen (GEO)
- Höhere CTR durch Rich Snippets

### Langfristig (12+ Monate)
- Top-3 Positionierung für "SEO Agentur Wien", "Webdesign Wien"
- Regelmäßige AI-Zitationen in ChatGPT, Perplexity
- Marktführer-Position in DACH-Region

---

## 📚 ANHANG

### Vollständige URL-Liste (Alt → Neu)
Siehe separates Dokument: `REDIRECT-MAPPING.csv`

### Schema-Templates
Siehe separates Dokument: `SCHEMA-TEMPLATES.md`

### Sitemap-Konfiguration
Siehe: `src/app/sitemap.ts`

---

*Erstellt: Februar 2026*
*Version: 1.0*
*Autor: Claude (Anthropic)*
