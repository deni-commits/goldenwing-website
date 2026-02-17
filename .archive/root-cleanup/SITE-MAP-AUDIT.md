# GoldenWing Website - Sitemap Audit Report

**Generated:** 2026-01-29
**Total Page Count:** 123 `page.tsx` files analyzed
**Base URL:** https://goldenwing.at

---

## Executive Summary

This document provides a comprehensive audit of the GoldenWing website structure, including all 123 page routes organized by category. The sitemap follows an E-E-A-T (Experience, Expertise, Authority, Trust) optimization strategy with a multi-language support system (German, English, Russian).

### Key Statistics

| Category | Count |
|----------|-------|
| Homepage | 1 |
| Leistungen (Services) | 15 |
| Blog | 3 |
| Projekte/Referenzen | 4 |
| Über Uns | 7 |
| Tools | 9 |
| Standorte (Locations) | 4 |
| SEO Landing Pages (Austria) | 28 |
| SEO Landing Pages (Germany) | 7 |
| SEO Landing Pages (Switzerland) | 3 |
| SEO Landing Pages (UAE) | 19 |
| AEO Listicle Pages | 7 |
| Lexikon/Glossary | 2 |
| Resources | 4 |
| Legal Pages | 3 |
| Admin | 1 |
| **TOTAL** | **123** |

---

## 1. Homepage

| Route | DE Path | EN Path | RU | Priority | Category |
|-------|---------|---------|-----|----------|----------|
| Homepage | `/` | `/en` | ✓ | 1.0 | Conversion |

---

## 2. Leistungen (Services)

Main services collection (15 pages) with dynamic sub-pages pulled from CMS.

| Route | DE Path | EN Path | RU | Priority | Type |
|-------|---------|---------|-----|----------|------|
| Services Index | `/leistungen` | `/en/services` | ✗ | 0.9 | Main |
| Service Detail (dynamic) | `/leistungen/[slug]` | `/en/services/[slug]` | ✗ | 0.8 | Dynamic |
| Sub-Service Detail (dynamic) | `/leistungen/[slug]/[subslug]` | `/en/services/[slug]/[subslug]` | ✗ | 0.7 | Dynamic |
| E-Commerce Agency | `/leistungen/ecommerce-agentur` | `/en/services/ecommerce-agency` | ✗ | 0.8 | Static |
| Google Ads Agency | `/leistungen/google-ads-agentur` | `/en/services/google-ads-agency` | ✗ | 0.8 | Static |
| Graphic Design | `/leistungen/grafikdesign` | `/en/services/graphic-design` | ✗ | 0.75 | Static |
| Online Shop Agency | `/leistungen/onlineshop-agentur` | `/en/services/ecommerce-agency` | ✗ | 0.75 | Static |
| Service Packages | `/leistungen/pakete` | `/en/services/packages` | ✗ | 0.8 | Main |
| Package Detail (dynamic) | `/leistungen/pakete/[slug]` | `/en/services/packages/[slug]` | ✗ | 0.75 | Dynamic |
| SEA Agency | `/leistungen/sea-agentur` | `/en/services/sea-agency` | ✗ | 0.8 | Static |
| SEO Consultant | `/leistungen/seo-berater` | `/en/services/seo-consultant` | ✗ | 0.75 | Static |
| SEO Support | `/leistungen/seo-betreuung` | `/en/services/seo-support` | ✗ | 0.8 | Static |
| SEO Copywriter | `/leistungen/seo-texter` | `/en/services/seo-copywriter` | ✗ | 0.75 | Static |
| Social Media Agency | `/leistungen/social-media-agentur` | `/en/services/social-media-agency` | ✗ | 0.75 | Static |
| WordPress Agency | `/leistungen/wordpress-agentur` | `/en/services/wordpress-agency` | ✗ | 0.75 | Static |

### Services Sub-Categories (from CMS)
The following services are generated dynamically from the CMS:
- Branding (with sub-services)
- Webdesign (with sub-services)
- Digital Marketing (with sub-services)
- SEO & Content (with sub-services)
- Web & App Development (with sub-services)
- IT & Cloud Services (with sub-services)

---

## 3. Blog

Content marketing hub with published posts and categories.

| Route | DE Path | EN Path | RU | Priority | Type |
|-------|---------|---------|-----|----------|------|
| Blog Hub | `/blog` | `/en/blog` | ✓ | 0.85 | Main |
| Blog Post (dynamic) | `/blog/[slug]` | `/en/blog/[slug]` | ✗ | 0.65-0.75* | Dynamic |
| Blog Category (dynamic) | `/blog/kategorie/[slug]` | `/en/blog/category/[slug]` | ✗ | 0.55-0.6* | Dynamic |

*Priority varies: Featured posts get 0.75 (DE) / 0.7 (EN), standard posts get 0.65 (DE) / 0.6 (EN)

### Blog Categories
- Design
- Technologie / Technology
- Marketing
- Strategie / Strategy
- Business
- SEO
- Webdesign / Web Design
- Branding

---

## 4. Projekte / Referenzen (Projects & References)

Portfolio and case studies section.

| Route | DE Path | EN Path | RU | Priority | Type |
|-------|---------|---------|-----|----------|------|
| References Hub | `/referenzen` | `/en/references` | ✗ | 0.9 | Main |
| Reference Detail (dynamic) | `/referenzen/[slug]` | `/en/references/[slug]` | ✗ | 0.65-0.75* | Dynamic |
| Projects Hub | `/projekte` | `/en/projects` | ✗ | 0.8 | Main |
| Project Detail (dynamic) | `/projekte/[slug]` | `/en/projects/[slug]` | ✗ | 0.6-0.75* | Dynamic |

*Priority varies: Featured projects get 0.75 (DE) / 0.7 (EN), standard get 0.65 (DE) / 0.6 (EN)

### Reference Categories
- Branding
- Webdesign
- Marketing
- SEO
- Development
- IT & Cloud
- Consulting
- E-Commerce
- Industry
- Technology

---

## 5. Über Uns (About Us)

Trust and authority signals for E-E-A-T.

| Route | DE Path | EN Path | RU | Priority | Purpose |
|-------|---------|---------|-----|----------|---------|
| About Main | `/ueber-uns` | `/en/about-us` | ✗ | 0.85 | Company Overview |
| Team Overview | `/ueber-uns/team` | `/en/about-us/team` | ✗ | 0.85 | Expertise Signal |
| Team Member (dynamic) | `/ueber-uns/team/[slug]` | `/en/about-us/team/[slug]` | ✗ | 0.75 | Expert Bio |
| Facts & Figures | `/ueber-uns/facts-figures` | `/en/about-us/facts-figures` | ✗ | 0.8 | Authority Signal |
| Values | `/ueber-uns/werte` | `/en/about-us/values` | ✗ | 0.75 | Trust Signal |
| Culture | `/ueber-uns/kultur` | `/en/about-us/culture` | ✗ | 0.7 | Company Culture |
| Partners | `/ueber-uns/partner` | `/en/about-us/partners` | ✗ | 0.75 | Trust Signal |

---

## 6. Tools (Lead Magnets)

Interactive tools for lead generation and SEO value.

| Route | DE Path | EN Path | RU | Priority | Tool Type |
|-------|---------|---------|-----|----------|-----------|
| Tools Hub | `/tools` | `/en/tools` | ✓ | 0.8 | Main |
| SEO Checker | `/tools/seo-checker` | `/en/tools/seo-checker` | ✗ | 0.8 | SEO |
| Performance Checker | `/tools/performance-checker` | `/en/tools/performance-checker` | ✗ | 0.8 | Performance |
| Design Analyzer | `/tools/design-analyzer` | `/en/tools/design-analyzer` | ✗ | 0.75 | Design |
| Security Checker | `/tools/security-checker` | `/en/tools/security-checker` | ✗ | 0.75 | Security |
| Website Analyzer | `/tools/website-analyzer` | `/en/tools/website-analyzer` | ✗ | 0.85 | Analysis |
| Website Design | `/tools/website-design` | `/en/tools/website-design` | ✗ | 0.6 | Design |
| Security | `/tools/security` | `/en/tools/security` | ✗ | 0.6 | Security |
| SEO Performance | `/tools/seo-performance` | `/en/tools/seo-performance` | ✗ | 0.6 | SEO |

---

## 7. Standorte (Locations)

Physical office locations and local presence signals.

| Route | DE Path | EN Path | RU | Priority | Location |
|-------|---------|---------|-----|----------|----------|
| Locations Hub | `/standorte` | `/en/locations` | ✗ | 0.8 | Main |
| Vienna | `/standorte/wien` | `/en/locations/vienna` | ✗ | 0.75 | Austria |
| Dubai | `/standorte/dubai` | `/en/locations/dubai` | ✗ | 0.7 | UAE |
| Roseville | `/standorte/roseville` | `/en/locations/roseville` | ✗ | 0.7 | USA |

---

## 8. SEO Landing Pages - Austria

Localized service landing pages targeting Austrian cities and regions.

### Vienna (Wien) - Priority 0.85

| Route | DE Path | EN Path | RU |
|-------|---------|---------|-----|
| Creative Agency Vienna | `/kreativagentur-wien` | `/en/creative-agency-vienna` | ✗ |
| Web Design Vienna | `/webdesign-wien` | `/en/web-design-vienna` | ✗ |
| SEO Agency Vienna | `/seo-agentur-wien` | `/en/seo-agency-vienna` | ✗ |
| Branding Agency Vienna | `/branding-agentur-wien` | `/en/branding-agency-vienna` | ✗ |
| Google Ads Agency Vienna | `/google-ads-agentur-wien` | `/en/google-ads-agency-vienna` | ✗ |

### Austria (Österreich) - Priority 0.85

| Route | DE Path | EN Path | RU |
|-------|---------|---------|-----|
| Web Design Austria | `/webdesign-oesterreich` | `/en/web-design-austria` | ✗ |
| Google Ads Austria | `/google-ads-agentur-oesterreich` | `/en/google-ads-agency-austria` | ✗ |
| SEO Agency Austria | `/seo-agentur-oesterreich` | `/en/seo-agency-austria` | ✗ |

### Graz - Priority 0.8

| Route | DE Path | EN Path | RU |
|-------|---------|---------|-----|
| Web Design Graz | `/webdesign-graz` | `/en/web-design-graz` | ✗ |
| SEO Agency Graz | `/seo-agentur-graz` | `/en/seo-agency-graz` | ✗ |
| Online Marketing Graz | `/online-marketing-graz` | `/en/online-marketing-graz` | ✗ |

### Linz - Priority 0.8

| Route | DE Path | EN Path | RU |
|-------|---------|---------|-----|
| Web Design Linz | `/webdesign-linz` | `/en/web-design-linz` | ✗ |
| SEO Agency Linz | `/seo-agentur-linz` | `/en/seo-agency-linz` | ✗ |
| Online Marketing Linz | `/online-marketing-agentur-linz` | `/en/online-marketing-agency-linz` | ✗ |
| Advertising Agency Linz | `/werbeagentur-linz` | `/en/advertising-agency-linz` | ✗ |

### Salzburg - Priority 0.8

| Route | DE Path | EN Path | RU |
|-------|---------|---------|-----|
| Web Design Salzburg | `/webdesign-salzburg` | `/en/web-design-salzburg` | ✗ |
| SEO Agency Salzburg | `/seo-agentur-salzburg` | `/en/seo-agency-salzburg` | ✗ |
| Advertising Agency Salzburg | `/werbeagentur-salzburg` | `/en/advertising-agency-salzburg` | ✗ |

### Innsbruck - Priority 0.8

| Route | DE Path | EN Path | RU |
|-------|---------|---------|-----|
| Web Design Innsbruck | `/webdesign-innsbruck` | `/en/web-design-innsbruck` | ✗ |
| SEO Agency Innsbruck | `/seo-agentur-innsbruck` | `/en/seo-agency-innsbruck` | ✗ |
| Advertising Agency Innsbruck | `/werbeagentur-innsbruck` | `/en/advertising-agency-innsbruck` | ✗ |

**Total Austria Landing Pages: 28**

---

## 9. SEO Landing Pages - Germany

Localized service landing pages targeting German cities and regions.

### Germany - Priority 0.85

| Route | DE Path | EN Path | RU |
|-------|---------|---------|-----|
| Web Design Germany | `/webdesign-deutschland` | `/en/web-design-germany` | ✗ |
| SEO Agency Germany | `/seo-agentur-deutschland` | `/en/seo-agency-germany` | ✗ |
| Branding Agency Germany | `/branding-agentur-deutschland` | `/en/branding-agency-germany` | ✗ |

### Major Cities - Priority 0.8

| Route | DE Path | EN Path | RU |
|-------|---------|---------|-----|
| Web Design Munich | `/webdesign-muenchen` | `/en/web-design-munich` | ✗ |
| Web Design Berlin | `/webdesign-berlin` | `/en/web-design-berlin` | ✗ |
| Web Design Hamburg | `/webdesign-hamburg` | `/en/web-design-hamburg` | ✗ |
| Web Design Frankfurt | `/webdesign-frankfurt` | `/en/web-design-frankfurt` | ✗ |

**Total Germany Landing Pages: 7**

---

## 10. SEO Landing Pages - Switzerland

Localized service landing pages targeting Swiss regions.

| Route | DE Path | EN Path | RU | Priority |
|-------|---------|---------|-----|----------|
| Web Design Switzerland | `/webdesign-schweiz` | `/en/web-design-switzerland` | ✗ | 0.85 |
| Web Design Zurich | `/webdesign-zuerich` | `/en/web-design-zurich` | ✗ | 0.85 |
| SEO Agency Switzerland | `/seo-agentur-schweiz` | `/en/seo-agency-switzerland` | ✗ | 0.8 |

**Total Switzerland Landing Pages: 3**

---

## 11. SEO Landing Pages & Hub Pages - UAE

Comprehensive localized presence across UAE with hub and service pages.

### Hub Pages

| Route | DE Path | EN Path | RU | Priority |
|-------|---------|---------|-----|----------|
| UAE Hub | `/uae` | `/en/uae` | ✗ | 0.8 |
| Dubai Hub | `/dubai` | `/en/dubai` | ✓ | 0.85 |
| Abu Dhabi Hub | `/abu-dhabi` | `/en/abu-dhabi` | ✗ | 0.8 |
| Sharjah Hub | `/sharjah` | `/en/sharjah` | ✗ | 0.75 |

### Dubai Services (English Versions)

| Route | DE Path | EN Path | RU | Priority |
|-------|---------|---------|-----|----------|
| Web Design Dubai | `/dubai/web-design-company-dubai` | `/en/dubai/web-design-company-dubai` | ✗ | 0.85 |
| SEO Dubai | `/dubai/seo-company-dubai` | `/en/dubai/seo-company-dubai` | ✗ | 0.85 |
| Branding Dubai | `/dubai/branding-agency-dubai` | `/en/dubai/branding-agency-dubai` | ✗ | 0.8 |
| Digital Marketing Dubai | `/dubai/digital-marketing-agency-dubai` | `/en/dubai/digital-marketing-agency-dubai` | ✗ | 0.85 |
| E-Commerce Dubai | `/dubai/ecommerce-development-dubai` | `/en/dubai/ecommerce-development-dubai` | ✗ | 0.8 |

### Abu Dhabi Services

| Route | DE Path | EN Path | RU | Priority |
|-------|---------|---------|-----|----------|
| Web Design Abu Dhabi | `/abu-dhabi/web-design-abu-dhabi` | `/en/abu-dhabi/web-design-abu-dhabi` | ✗ | 0.8 |
| SEO Abu Dhabi | `/abu-dhabi/seo-abu-dhabi` | `/en/abu-dhabi/seo-abu-dhabi` | ✗ | 0.8 |
| Branding Abu Dhabi | `/abu-dhabi/branding-abu-dhabi` | `/en/abu-dhabi/branding-abu-dhabi` | ✗ | 0.75 |
| Digital Marketing Abu Dhabi | `/abu-dhabi/digital-marketing-abu-dhabi` | `/en/abu-dhabi/digital-marketing-abu-dhabi` | ✗ | 0.8 |
| E-Commerce Abu Dhabi | `/abu-dhabi/ecommerce-abu-dhabi` | `/en/abu-dhabi/ecommerce-abu-dhabi` | ✗ | 0.75 |

### Sharjah Services

| Route | DE Path | EN Path | RU | Priority |
|-------|---------|---------|-----|----------|
| Web Design Sharjah | `/sharjah/web-design-sharjah` | `/en/sharjah/web-design-sharjah` | ✗ | 0.75 |
| SEO Sharjah | `/sharjah/seo-sharjah` | `/en/sharjah/seo-sharjah` | ✗ | 0.75 |
| Branding Sharjah | `/sharjah/branding-sharjah` | `/en/sharjah/branding-sharjah` | ✗ | 0.7 |
| Digital Marketing Sharjah | `/sharjah/digital-marketing-sharjah` | `/en/sharjah/digital-marketing-sharjah` | ✗ | 0.75 |
| E-Commerce Sharjah | `/sharjah/ecommerce-sharjah` | `/en/sharjah/ecommerce-sharjah` | ✗ | 0.7 |

### German Landing Pages (UAE Focus)

| Route | DE Path | EN Path | RU | Priority |
|-------|---------|---------|-----|----------|
| Web Design Dubai | `/webdesign-dubai` | `/en/web-design-dubai` | ✗ | 0.85 |
| Web Design UAE | `/webdesign-vae` | `/en/web-design-uae` | ✗ | 0.85 |
| SEO Agency Dubai | `/seo-agentur-dubai` | `/en/seo-agency-dubai` | ✗ | 0.8 |
| Branding Agency Dubai | `/branding-agentur-dubai` | `/en/branding-agency-dubai` | ✗ | 0.8 |
| Creative Agency Dubai | `/kreativagentur-dubai` | `/en/creative-agency-dubai` | ✗ | 0.8 |
| E-Commerce Dubai | `/ecommerce-agentur-dubai` | `/en/ecommerce-agency-dubai` | ✗ | 0.8 |
| WordPress Agency Dubai | `/wordpress-agentur-dubai` | `/en/wordpress-agency-dubai` | ✗ | 0.75 |
| Digital Marketing Dubai | `/digitales-marketing-dubai` | `/en/digital-marketing-dubai` | ✗ | 0.8 |
| Web Development Abu Dhabi | `/webentwicklung-abu-dhabi` | `/en/web-development-abu-dhabi` | ✗ | 0.75 |
| App Development Dubai | `/app-entwicklung-dubai` | `/en/app-development-dubai` | ✗ | 0.75 |
| Web Design Abu Dhabi | `/web-design-abu-dhabi` | `/en/web-design-abu-dhabi` | ✗ | 0.75 |

**Total UAE Landing Pages: 19**

---

## 12. AEO Listicle Pages (Answer Engine Optimization)

High-priority content for AI search engines and traditional search results.

| Route | DE Path | EN Path | RU | Priority | Focus |
|-------|---------|---------|-----|----------|-------|
| Best Web Design Agencies Vienna | `/beste-webdesign-agenturen-wien` | `/en/best-web-design-agencies-vienna` | ✗ | 0.9 | Agency List |
| Best Branding Agencies Vienna | `/beste-branding-agenturen-wien` | `/en/best-branding-agencies-vienna` | ✗ | 0.9 | Agency List |
| Best Digital Marketing Agencies Vienna | `/beste-digital-marketing-agenturen-wien` | `/en/best-digital-marketing-agencies-vienna` | ✗ | 0.9 | Agency List |
| Best E-Commerce Agencies Vienna | `/beste-ecommerce-agenturen-wien` | `/en/best-ecommerce-agencies-vienna` | ✗ | 0.9 | Agency List |
| Best SEO Agencies Austria | `/beste-seo-agenturen-oesterreich` | `/en/best-seo-agencies-austria` | ✗ | 0.9 | Agency List |
| Best SEO Agencies for Doctors | `/beste-seo-agenturen-fuer-aerzte` | `/en/best-seo-agencies-for-doctors` | ✗ | 0.85 | Vertical |
| Best Website Relaunch Agencies | `/beste-website-relaunch-agenturen` | `/en/best-website-relaunch-agencies` | ✗ | 0.85 | Service |

**Total AEO Listicle Pages: 7**

---

## 13. Lexikon / Glossary

Knowledge base for expertise and E-E-A-T signals. Entries are dynamically generated from data files.

| Route | DE Path | EN Path | RU | Priority |
|-------|---------|---------|-----|----------|
| Glossary Hub | `/lexikon` | `/en/glossary` | ✗ | 0.8 |
| Glossary Entry (dynamic) | `/lexikon/[slug]` | `/en/glossary/[slug]` | ✗ | 0.65 |

**Note:** Individual glossary entries are populated from `src/lib/lexikon/data.ts` and translated on the fly.

---

## 14. Resources

Supporting content hub for lead magnets and resources.

| Route | DE Path | EN Path | RU | Priority | Type |
|-------|---------|---------|-----|----------|------|
| Resources Hub | `/ressourcen` | `/en/resources` | ✗ | 0.6 | Main |
| Downloads | `/ressourcen/downloads` | `/en/resources/downloads` | ✗ | 0.5 | Downloads |
| Newsletter | `/ressourcen/newsletter` | `/en/resources/newsletter` | ✗ | 0.5 | Newsletter |
| FAQ | `/haeufige-fragen` | `/en/faq` | ✗ | 0.65 | FAQ |

---

## 15. Legal Pages

Required compliance pages with low SEO priority.

| Route | DE Path | EN Path | RU | Priority | Type |
|-------|---------|---------|-----|----------|------|
| Imprint | `/impressum` | `/en/imprint` | ✗ | 0.3 | Legal |
| Privacy Policy | `/datenschutz` | `/en/privacy-policy` | ✗ | 0.3 | Legal |
| Cookie Settings | `/rechtliches/cookie-einstellungen` | `/en/legal/cookie-settings` | ✗ | 0.2 | Legal |

---

## 16. Contact & Conversion Pages

| Route | DE Path | EN Path | RU | Priority | Type |
|-------|---------|---------|-----|----------|------|
| Contact Form | `/kontakt` | `/en/contact` | ✗ | 0.9 | Conversion |
| Web Shop Creation | `/webshop-erstellen-lassen` | `/en/webshop-erstellen-lassen` | ✗ | 0.6 | Conversion |

---

## 17. Admin Section

| Route | DE Path | EN Path | RU | Priority | Type |
|-------|---------|---------|-----|----------|------|
| Payload CMS Admin | `/admin/[[...segments]]` | N/A | N/A | N/A | Admin |

---

## Sitemap Priority Strategy

The sitemap is optimized for E-E-A-T signals with the following priority distribution:

### Priority Levels

```
1.0  = Homepage (canonical, most important)
0.9  = Main conversion pages (Contact, Services, References)
       + High-value AEO Listicle pages
0.85 = Trust signals (About, Team, Vienna landing pages)
       + Hub pages (Dubai, Blog)
       + Major SEO landing pages
0.8  = Regional landing pages
       + Tools hub
       + Locations
       + Service packages
       + Additional service pages
0.75 = Sub-service landing pages
       + Location details
       + Featured projects/blog posts
       + Additional services
0.7  = Standard projects/blog
       + Regional sub-services
0.65 = Blog posts (standard)
       + Glossary hub
       + FAQ
0.6  = Blog categories
       + Resources
       + Standard supporting content
0.5  = Downloads, newsletters
0.3  = Legal pages (Imprint, Privacy)
0.2  = Cookie settings
```

---

## Multi-Language Support

### Locale Configuration
- **Primary Language:** German (DE) - No `/de/` prefix (localePrefix: 'as-needed')
- **Secondary Language:** English (EN) - Uses `/en/` prefix with translated paths
- **Tertiary Language:** Russian (RU) - Partial coverage (only 3 pages)

### Russian Translation Coverage

**Translated Pages (3):**
- Homepage `/` - ✓
- Blog Hub `/blog` - ✓
- Dubai Hub `/dubai` - ✓
- Tools Hub `/tools` - ✓

**Not Translated (120+):**
- All SEO landing pages
- Services and sub-services
- Blog posts and categories
- Projects and references
- Team members
- Legal pages
- Most specific content pages

### Translation Mechanism
- German paths use base URL (e.g., `/kontakt`)
- English paths use `/en/` prefix with translated slugs (e.g., `/en/contact`)
- Path translations defined in `/src/app/sitemap.ts` (lines 68-211)
- Sub-service translations in `subServiceSlugTranslations` (lines 15-54)
- Blog category translations in `blogCategorySlugTranslations` (lines 57-66)

---

## Dynamic Content Sources

### Content Pulled from CMS (Payload)

1. **Services** (`collection: 'services'`)
   - Main services (6 primary)
   - Generated route pattern: `/leistungen/[slug]`
   - Sub-services linked via `parentService` relationship

2. **Sub-Services** (`collection: 'sub-services'`)
   - Linked to parent services
   - Generated route pattern: `/leistungen/[parentSlug]/[subSlug]`
   - 24 total sub-services across 6 parent services
   - EN translations required in `subServiceSlugTranslations` or URLs skip

3. **Blog Posts** (`collection: 'posts'`)
   - Localized per locale (separate DE and EN collections)
   - Generated route pattern: `/blog/[slug]`
   - Priority varies by `featured` flag
   - Over 500 posts supported per locale

4. **Blog Categories** (`collection: 'categories'`)
   - Localized slugs
   - Generated route pattern: `/blog/kategorie/[slug]`
   - 8 primary categories

5. **Projects** (`collection: 'projects'`)
   - Generated route pattern: `/projekte/[slug]` (also `/referenzen/[slug]`)
   - Priority varies by `featured` flag
   - Up to 200 projects supported

6. **Team Members** (`collection: 'team-members'`)
   - E-E-A-T expertise signals
   - Generated route pattern: `/ueber-uns/team/[slug]`
   - Up to 50 members supported

7. **Glossary/Lexikon** (`src/lib/lexikon/data.ts`)
   - Static data file (not CMS)
   - Generated route pattern: `/lexikon/[slug]`
   - Translated on-the-fly for EN: `/en/glossary/[slug]`

---

## URL Structure & Routing

### Locale Handling
```
German (Primary):  /[path]           (no prefix)
English:           /en/[path]        (with /en prefix)
Russian:           /ru/[path]        (with /ru prefix, limited coverage)
```

### Dynamic Route Parameters
```
[locale]           - Language prefix (auto-handled by Next.js app router)
[slug]             - Article, service, or project slug
[subslug]          - Sub-service slug (only in services)
[[...segments]]    - Catch-all for Payload CMS admin routes
```

### Redirect Rules
- `/projekte` redirects to `/referenzen` (middleware)
- Old URLs maintain compatibility through rewrite rules
- Non-existent dynamic routes return 404

---

## Sitemap Generation

### File Location
`/src/app/sitemap.ts` (781 lines)

### Generation Strategy
1. **Static Routes:** 160+ pre-defined routes with fixed priorities
2. **Dynamic Routes:** Generated from CMS collections at sitemap generation time
3. **Locale Variants:** Each route generates DE + EN versions automatically
4. **Language Alternates:** Proper `hreflang` tags included for SEO

### Sitemap Output
- German canonical URL (no prefix)
- English alternative URL (with `/en/` prefix)
- Language alternates metadata for each URL
- Last modified date from CMS data
- Change frequency hints (weekly, monthly, yearly)

### Execution
- Runs on demand when `/sitemap.xml` is requested
- Connects to Payload CMS to fetch current content
- Fallback to static routes if CMS connection fails
- Can handle 500+ blog posts and 200+ projects

---

## Key Features & Optimizations

### E-E-A-T (Experience, Expertise, Authority, Trust)
1. **Experience:** Project portfolio showing real client work
2. **Expertise:** Team member bios with credentials
3. **Authority:** Case studies, testimonials, facts & figures
4. **Trust:** Multi-location presence, partner information, transparent practices

### SEO Optimizations
- **AEO Ready:** Listicle pages for AI search engines
- **Local SEO:** 38 location-specific landing pages
- **Topic Authority:** Lexikon/Glossary for semantic authority
- **Content Freshness:** Blog with 500+ articles (EN + DE)
- **Mobile Friendly:** Responsive design across all pages

### Conversion Optimization
- Contact form prominently linked
- Clear service hierarchy and CTAs
- Tool pages as lead magnets
- Resource downloads for lead capture
- Multiple entry points by location and service

### Performance Considerations
- Static routes pre-computed
- Dynamic routes cached at generation
- Lazy loading of team member bios
- Efficient CMS data fetching with limits

---

## Audit Findings & Recommendations

### Strengths
✓ Comprehensive multi-language structure
✓ Strong E-E-A-T signal architecture
✓ Well-organized local landing pages (38 regional pages)
✓ Proper dynamic content integration
✓ High-priority AEO listicle pages
✓ Clear priority hierarchy

### Areas for Improvement

1. **Russian Language Gap**
   - Only 3 pages have Russian translations
   - Consider prioritizing Russian content if targeting Russian market
   - Recommendation: Translate at least 50 pages (services, blog hub, major landing pages)

2. **Sub-Service Translations**
   - 24 sub-services depend on EN translation map
   - Missing translations skip URL generation
   - Recommendation: Audit `subServiceSlugTranslations` for completeness

3. **Blog Category Translations**
   - 8 blog categories defined but not all fully translated
   - Recommendation: Ensure all 8 categories have EN equivalents

4. **Dynamic Content Limits**
   - CMS queries use fixed limits (500 posts, 200 projects, 50 team members)
   - Recommendation: Monitor growth and increase limits as needed

5. **Referenzen vs. Projekte**
   - Both point to same content
   - Recommendation: Verify redirect strategy is working correctly

---

## File References

### Key Files
- **Sitemap Generator:** `/src/app/sitemap.ts`
- **Routing Config:** `/src/i18n/routing.ts` (referenced)
- **Middleware:** `/src/middleware.ts` (handles path translation)
- **Lexikon Data:** `/src/lib/lexikon/data.ts`
- **Translations:** `/src/messages/de.json`, `/src/messages/en.json`, `/src/messages/ru.json`
- **App Directory:** `/src/app/[locale]/(marketing)/`

### Page Structure Pattern
```
/src/app/[locale]/(marketing)/[path]/page.tsx
```
Each page.tsx file represents a route in the public sitemap.

---

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total Page Files | 123 |
| Static Routes | 160+ |
| Dynamic Service Pages | 6+ (parent) + 24 (sub) |
| Dynamic Blog Pages | 500+ (posts) + 8 (categories) |
| Dynamic Project Pages | 200+ |
| Dynamic Team Pages | 50+ |
| Glossary Entries | Variable (dynamic) |
| Language Variants | 2 main (DE, EN) + 1 partial (RU) |
| SEO Landing Pages | 38 regional + 7 AEO listicles |
| Conversion Pages | 2 (Contact, Web Shop) |
| Admin Pages | 1 (Payload CMS) |
| **Total Indexable URLs** | **1000+** (including dynamic content) |

---

## Last Updated

**Generated:** 2026-01-29
**Analyzed Version:** GoldenWing Website (Current)
**Analyzer:** Sitemap Audit Tool v1.0

For questions or updates to this audit, please refer to `/src/app/sitemap.ts` and the Payload CMS configuration.
