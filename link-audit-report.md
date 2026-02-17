# GoldenWing.at English Pages Link Audit Report

**Date:** February 7, 2026
**Scope:** All English (/en/) pages on goldenwing.at
**Total URLs in Sitemap:** 130+

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total English URLs Checked | 130+ |
| Pages Loading Successfully (200 OK) | 122+ |
| **404 Errors (Broken Links)** | **8** |
| 301/302 Redirects | 0 |
| 5xx Server Errors | 0 |
| Timeouts | 0 |

---

## Critical Issues Found

### 1. Broken Links (404 Errors)

The following URLs from the sitemap return **404 Not Found** errors:

| URL | Status | Notes |
|-----|--------|-------|
| `https://goldenwing.at/en/industries/healthcare` | 404 | Listed in sitemap but page doesn't exist |
| `https://goldenwing.at/en/industries/legal` | 404 | Listed in sitemap but page doesn't exist |
| `https://goldenwing.at/en/industries/ecommerce` | 404 | Listed in sitemap but page doesn't exist |
| `https://goldenwing.at/en/industries/b2b` | 404 | Listed in sitemap but page doesn't exist |
| `https://goldenwing.at/en/industries/startups` | 404 | Listed in sitemap but page doesn't exist |
| `https://goldenwing.at/en/industries/hospitality` | 404 | Listed in sitemap but page doesn't exist |
| `https://goldenwing.at/en/industries/real-estate` | 404 | Listed in sitemap but page doesn't exist |
| `https://goldenwing.at/en/industries/services` | 404 | Listed in sitemap but page doesn't exist |

**Impact:** These 8 URLs are included in the sitemap but do not exist. This can negatively affect SEO as search engines will encounter 404 errors when crawling.

---

### 2. Language Inconsistency Issues

Several English pages contain links to German URLs instead of English equivalents. This creates a poor user experience for English-speaking visitors.

#### On `/en/services/branding` page:
Links pointing to German pages instead of English:
- `/leistungen/branding` (should be `/en/services/branding`)
- `/leistungen/webdesign` (should be `/en/services/web-design`)
- `/leistungen/digital-marketing` (should be `/en/services/digital-marketing`)
- `/leistungen/seo-content` (should be `/en/services/seo-content`)
- `/leistungen/web-app-entwicklung` (should be `/en/services/web-app-development`)
- `/leistungen/it-cloud-services` (should be `/en/services/it-cloud-services`)
- `/standorte/wien/branding` (should be `/en/locations/vienna/branding`)
- `/projekte/viridiuslab-holding` (should be `/en/projects/viridiuslab-holding`)
- `/projekte/derbotaniker` (should be `/en/projects/derbotaniker`)
- `/projekte/umzugsreif` (should be `/en/projects/umzugsreif`)
- `/projekte/tet-group` (should be `/en/projects/tet-group`)

#### On `/en/services/web-design` page:
- `/projekte/soki` (should be `/en/projects/soki`)
- `/projekte/alinea-partners` (should be `/en/projects/alinea-partners`)
- `/projekte/atta-pallet` (should be `/en/projects/atta-pallet`)
- `/standorte/wien/webdesign` (should be `/en/locations/vienna/web-design`)
- `/standorte/graz/webdesign` (should be `/en/locations/graz/web-design`)
- And similar patterns for other cities

#### On `/en/services/digital-marketing` page:
- `/standorte/wien/google-ads` (should be `/en/locations/vienna/google-ads`)
- `/standorte/graz/online-marketing` (should be `/en/locations/graz/online-marketing`)

#### On `/en/services/seo-content` page:
- `/projekte/peba` (should be `/en/projects/peba`)
- `/projekte/novum-analytik` (should be `/en/projects/novum-analytik`)
- `/projekte/iul-vorpommern` (should be `/en/projects/iul-vorpommern`)
- `/projekte/fader` (should be `/en/projects/fader`)
- `/standorte/wien/seo` (should be `/en/locations/vienna/seo`)
- And similar patterns for other cities

#### On `/en/services/web-app-development` page:
- `/projekte/ellogy-ai` (should be `/en/projects/ellogy-ai`)
- `/projekte/banking-analytics` (should be `/en/projects/banking-analytics`)
- `/projekte/vpn-billing-integration` (should be `/en/projects/vpn-billing-integration`)
- `/projekte/healthcare-app` (should be `/en/projects/healthcare-app`)

#### On `/en/about-us/team` page:
- `/ueber-uns/team/deni-khachukaev` (should be `/en/about-us/team/deni-khachukaev`)
- `/ueber-uns/team/benedikt-hasibeder` (should be `/en/about-us/team/benedikt-hasibeder`)

#### On `/en/industries` page:
The industry cards link to German URLs:
- `/branchen/aerzte` (should be `/en/industries/healthcare`)
- `/branchen/rechtsanwaelte` (should be `/en/industries/legal`)
- `/branchen/ecommerce` (should be `/en/industries/ecommerce`)
- `/branchen/b2b` (should be `/en/industries/b2b`)
- `/branchen/startups` (should be `/en/industries/startups`)
- `/branchen/gastronomie` (should be `/en/industries/hospitality`)
- `/branchen/immobilien` (should be `/en/industries/real-estate`)
- `/branchen/dienstleister` (should be `/en/industries/services`)

#### On `/en/comparisons` page:
All comparison links point to German URLs:
- `/beste-seo-agenturen-wien` (should be `/en/best-seo-agencies-vienna`)
- `/beste-webdesign-agenturen-wien` (should be `/en/best-web-design-agencies-vienna`)
- And 15+ similar links

#### On `/en/blog` page:
- `/blog` and `/blog?page=2` (should be `/en/blog` and `/en/blog?page=2`)

---

## Pages Loading Successfully

All of the following page categories were verified as loading correctly (200 OK):

### Main Pages
- `/en` (Homepage)
- `/en/contact`
- `/en/services`
- `/en/references`
- `/en/blog`
- `/en/about-us`
- `/en/glossary`
- `/en/faq`
- `/en/imprint`
- `/en/privacy-policy`
- `/en/legal/cookie-settings`
- `/en/comparisons`
- `/en/industries` (main page)
- `/en/locations`
- `/en/tools`

### Service Pages (All OK)
- `/en/services/branding` and all sub-pages
- `/en/services/web-design` and all sub-pages
- `/en/services/digital-marketing` and all sub-pages
- `/en/services/seo-content` and all sub-pages
- `/en/services/web-app-development` and all sub-pages
- `/en/services/it-cloud-services` and all sub-pages
- `/en/services/graphic-design`
- `/en/services/seo-copywriter`
- `/en/services/seo-consultant`
- `/en/services/seo-support`
- `/en/services/sea-agency`
- `/en/services/google-ads-agency`
- `/en/services/ecommerce-agency`
- `/en/services/wordpress-agency`
- `/en/services/social-media-agency`

### Package Pages (All OK)
- `/en/services/packages/brand-web-foundation`
- `/en/services/packages/seo-content-growth`
- `/en/services/packages/demand-gen-suite`
- `/en/services/packages/custom-package`

### Location Pages (All OK)
- All 8 main location pages
- All location sub-pages (Vienna, Graz, etc.)

### Reference/Category Pages (All OK)
- `/en/references/branding`
- `/en/references/web-design`
- `/en/references/marketing`
- `/en/references/seo`
- `/en/references/development`
- `/en/references/it-cloud`
- `/en/references/consulting`
- `/en/references/e-commerce`
- `/en/references/industry`
- `/en/references/technology`

### Project Pages (All OK)
All 35+ project pages loaded successfully including:
- `/en/projects/domoferm`
- `/en/projects/simax`
- `/en/projects/lamberg`
- `/en/projects/viridiuslab-holding`
- And all others...

### About Pages (All OK)
- `/en/about-us/team`
- `/en/about-us/values`
- `/en/about-us/culture`
- `/en/about-us/facts-figures`
- `/en/about-us/partners`

### Tools Pages (All OK)
- `/en/tools/seo-checker`
- `/en/tools/performance-checker`
- `/en/tools/design-analyzer`
- `/en/tools/security-checker`

### Comparison Pages (All OK)
All 17+ comparison pages loaded successfully.

### Regional Landing Pages (All OK)
All Austria, Germany, Switzerland, and UAE landing pages loaded successfully.

### Blog Posts (All OK)
All blog posts and category pages loaded successfully.

### Glossary Entries (All OK)
All glossary term pages loaded successfully.

---

## Recommendations

### Priority 1: Fix 404 Errors (Critical)
1. Either create the 8 missing industry pages in English:
   - `/en/industries/healthcare`
   - `/en/industries/legal`
   - `/en/industries/ecommerce`
   - `/en/industries/b2b`
   - `/en/industries/startups`
   - `/en/industries/hospitality`
   - `/en/industries/real-estate`
   - `/en/industries/services`

2. OR remove these URLs from the sitemap if the pages are not intended to exist.

### Priority 2: Fix Language Inconsistencies (High)
Update the following pages to use English URLs instead of German:
- `/en/services/branding`
- `/en/services/web-design`
- `/en/services/digital-marketing`
- `/en/services/seo-content`
- `/en/services/web-app-development`
- `/en/services/it-cloud-services`
- `/en/about-us/team`
- `/en/industries`
- `/en/comparisons`
- `/en/blog`

### Priority 3: Sitemap Cleanup (Medium)
- Update the sitemap to remove 404 URLs
- Ensure all URLs in the sitemap return 200 status codes

---

## Technical Notes

- **Framework:** Next.js with React Server Components
- **Internationalization:** Proper locale handling detected (EN/DE)
- **Schema Markup:** Comprehensive structured data implementation
- **SSL:** All pages properly served over HTTPS
- **Performance:** No timeout issues encountered during crawl

---

*Report generated by Claude Code audit on February 7, 2026*
