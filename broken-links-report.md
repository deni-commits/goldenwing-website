# GoldenWing.at - Broken Links & Redirects Report

**Date:** 2026-02-07
**Domain:** https://goldenwing.at
**Scope:** All German pages (excluding /en/)

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Total Pages Checked | 200+ |
| Working Pages (200 OK) | 195+ |
| Redirects Found | 3 |
| Broken Links (404) | 0 |
| Broken Resources (Images) | 7+ |
| Server Errors (5xx) | 0 |
| Timeouts | 0 |

---

## Redirects Found

The following URLs redirect to different destinations:

| Source URL | Redirects To | Type |
|------------|--------------|------|
| `/uae` | `/vae` | 301/302 |
| `/leistungen/wordpress-agentur` | `/leistungen/web-app-entwicklung` | 301/302 |
| `/web-design-abu-dhabi` | `/webdesign-abu-dhabi` | 301/302 |

### Redirect Details

1. **`/uae` -> `/vae`**
   - Status: Working redirect
   - Comment: URL normalization (UAE to VAE in German)
   - **Recommendation:** Update sitemap and internal links to use `/vae` directly

2. **`/leistungen/wordpress-agentur` -> `/leistungen/web-app-entwicklung`**
   - Status: Working redirect
   - Found on: `/leistungen` page
   - **Recommendation:** Either create a dedicated WordPress service page OR update the link on the /leistungen page to point directly to `/leistungen/web-app-entwicklung`

3. **`/web-design-abu-dhabi` -> `/webdesign-abu-dhabi`**
   - Status: Working redirect
   - Comment: URL normalization (hyphen vs no hyphen)
   - **Recommendation:** Update sitemap to use the canonical URL `/webdesign-abu-dhabi`

---

## Broken Resources (Images)

The following image files are returning errors on multiple pages:

| Resource | Error | Pages Affected |
|----------|-------|----------------|
| `Point-of-New-Portfolio-image.webp` | Failed to load | Homepage, Referenzen |
| `TubroMango-Branding.webp` | Failed to load | Referenzen |
| `Lamberg-Portfolio-image.webp` | Failed to load | Referenzen |
| `core-web-vitals-guide.webp` | Failed to load | Blog listing |
| `moodboard-design-prozess.webp` | Failed to load | Blog listing, About pages |
| `markenidentitaet-leitfaden.webp` | Failed to load | Blog listing |
| `bilder-web-optimieren-guide.webp` | Failed to load | Blog listing |
| `seo-anfaenger-guide.webp` | Failed to load | Blog listing |
| `wordpress-vs-webflow.webp` | Failed to load | Blog listing |
| `kundengespraech-budget.webp` | Failed to load | Blog listing |

**Recommendation:** Check the media storage and CDN configuration. These appear to be Next.js image optimization failures.

---

## Pages Verified Working (200 OK)

### Core Pages
- `/` (Homepage)
- `/kontakt`
- `/leistungen`
- `/referenzen`
- `/blog`
- `/ueber-uns`
- `/lexikon`
- `/haeufige-fragen`
- `/impressum`
- `/datenschutz`
- `/rechtliches/cookie-einstellungen`
- `/standorte`
- `/tools`
- `/branchen`
- `/vergleiche`

### Service Pages (/leistungen/*)
- `/leistungen/branding`
- `/leistungen/webdesign`
- `/leistungen/digital-marketing`
- `/leistungen/seo-content`
- `/leistungen/web-app-entwicklung`
- `/leistungen/it-cloud-services`
- `/leistungen/grafikdesign`
- `/leistungen/seo-texter`
- `/leistungen/seo-berater`
- `/leistungen/seo-betreuung`
- `/leistungen/sea-agentur`
- `/leistungen/google-ads-agentur`
- `/leistungen/ecommerce-agentur`
- `/leistungen/onlineshop-agentur`
- `/leistungen/social-media-agentur`
- `/leistungen/pakete`
- `/leistungen/pakete/brand-web-foundation`
- `/leistungen/pakete/seo-content-growth`
- `/leistungen/pakete/demand-gen-suite`
- `/leistungen/pakete/individuelles-paket`

### Location Pages (/standorte/*)
All 27 location pages verified working:
- Wien, Graz, Linz, Salzburg, Innsbruck
- Muenchen, Berlin, Zuerich
- Dubai, Abu Dhabi, Sharjah, Roseville
- All sub-service pages (webdesign, seo, branding, etc.)

### Project Pages (/projekte/*)
All 38 project pages verified working, including:
- domoferm, atta-pallet, point-of-new, lamberg
- turbo-mango, inspire, alinea-partners, simax
- erkurt-gartengestaltung, tet-group, umzugsreif, derbotaniker
- And 26 more...

### Blog Pages (/blog/*)
All 21+ blog articles verified working:
- youtube-seo-guide
- wordpress-website-erstellen-anleitung
- webdesign-und-seo-kombinieren
- suchmaschinenoptimierung-tipps
- seo-kosten-guide
- wordpress-seo-guide
- google-ranking-verbessern
- website-optimieren-guide
- content-marketing-strategie-guide
- core-web-vitals-optimieren-guide
- And more...

All 6 blog category pages working:
- `/blog/kategorie/seo`
- `/blog/kategorie/webdesign`
- `/blog/kategorie/branding`
- `/blog/kategorie/ui-ux`
- `/blog/kategorie/marketing`
- `/blog/kategorie/technologie`

### Lexikon Pages (/lexikon/*)
All 97+ lexikon entries verified working.

### Industry Pages (/branchen/*)
All 9 industry pages verified working:
- aerzte, rechtsanwaelte, ecommerce, b2b
- startups, gastronomie, immobilien, dienstleister

### Comparison Pages (/beste-*-agenturen-wien)
All 17 comparison pages verified working.

### Regional Service Pages
All 50+ regional service pages verified working:
- webdesign-wien, seo-agentur-wien, branding-agentur-wien
- webdesign-graz, seo-agentur-graz, online-marketing-graz
- webdesign-deutschland, webdesign-schweiz
- And many more...

### Tools Pages (/tools/*)
All 5 tool pages verified working:
- `/tools`
- `/tools/seo-checker`
- `/tools/performance-checker`
- `/tools/design-analyzer`
- `/tools/security-checker`

### About Pages (/ueber-uns/*)
All 5 about sub-pages verified working:
- `/ueber-uns/team`
- `/ueber-uns/facts-figures`
- `/ueber-uns/werte`
- `/ueber-uns/kultur`
- `/ueber-uns/partner`

---

## Potential Issues to Investigate

### 1. Soft 404s Detected
Some dynamic routes return HTTP 200 even for non-existent content:
- `/projekte/[non-existent]` returns 200 with generic page
- `/blog/[non-existent]` returns 200 with generic page

**Recommendation:** Implement proper 404 handling for dynamic routes.

### 2. Sitemap Inconsistencies
The sitemap at `https://goldenwing.at/sitemap.xml` includes URLs that redirect:
- `/uae` should be `/vae`
- `/web-design-abu-dhabi` should be `/webdesign-abu-dhabi`

**Recommendation:** Update sitemap to use canonical URLs only.

---

## Action Items

1. **HIGH PRIORITY:** Fix broken image resources (10+ images failing to load)
2. **MEDIUM:** Update internal link from `/leistungen/wordpress-agentur` to `/leistungen/web-app-entwicklung` on the leistungen page
3. **MEDIUM:** Update sitemap to use canonical URLs (remove redirect sources)
4. **LOW:** Implement proper 404 responses for non-existent dynamic content

---

## Conclusion

The website is in good overall health with **no true broken links (404 errors)** detected. The main issues are:
- 3 working redirects that should be cleaned up for SEO
- Multiple broken image resources that need attention
- Soft 404 handling could be improved

All 200+ German pages checked are returning proper HTTP 200 responses.
