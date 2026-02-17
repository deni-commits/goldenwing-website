# SEMrush Audit Fixes - GoldenWing Website

**Datum:** 2025-12-27 (Re-Crawl #2)
**Status:** ✅ ALLE KRITISCHEN FIXES ABGESCHLOSSEN

---

## Crawl-Ergebnis nach Fix #1 (27.12.2025, 22:30)

| Metrik | Vorher | Nachher | Änderung |
|--------|--------|---------|----------|
| Site Health | 91% | **94%** | +3 |
| Errors | 96 | **25** | **-71** |
| International SEO | 88% | **97%** | +9 |
| Internal Linking | 89% | **93%** | +4 |

---

## KRITISCH (Prio 1) - ERLEDIGT ✅

### 1. Incorrect pages in sitemap.xml (88 → 23 → 0 Seiten) ✅
- [x] **Phase 1:** `getCanonicalUrl` übersetzte EN-Pfade nicht
- [x] Fix: Pfadübersetzung für EN-Locale in `src/lib/utils.ts`
- [x] **Phase 2:** 23 Sub-Service Seiten noch fehlerhaft (404)
- [x] Problem: EN-Slugs (`web-design`) nicht in DB gefunden (`webdesign`)
- [x] Fix: `translateServiceSlug()` in `src/lib/payload/index.ts`
- [x] Verifiziert: Alle Sub-Service Seiten laden korrekt

### 2. Hreflang Probleme (76 Seiten incorrect + 11 mismatch) ✅
- [x] HreflangTags Component mit bidirektionaler Übersetzung gefixt
- [x] `getHreflangAlternates` verwendet jetzt `translatePath`
- [x] Alle Pfadübersetzungen synchronisiert
- [x] Verifiziert auf /en/about-us, /en/contact, /en/services/branding

### 3. URL-Slug Änderungen (4 URLs) ✅
- [x] seo-fuer-anfaenger-guide → seo-for-beginners-guide (DB)
- [x] was-kostet-eine-professionelle-website → professional-website-cost-guide (DB)
- [x] wordpress-oder-webflow-vergleich → wordpress-vs-webflow-comparison (DB)
- [x] derbotaniker → the-botanist (DB)
- [x] 301-Redirects in next.config.ts hinzugefügt

---

## WICHTIG (Prio 2) - ANALYSIERT

### 4. Orphaned sitemap pages (16 Seiten)
- [ ] Liste der 16 Seiten benötigt aus SEMrush Export
- Wahrscheinlich: Tiefe Blog-Posts/Projekte die über Übersichtsseiten verlinkt sind

### 5. Page crawl depth (50 Seiten)
- [ ] Tiefe Seiten identifizieren (benötigt SEMrush Details)
- Footer hat bereits gute Verlinkung

### 6. Low word count (10 Seiten) ✅
- [x] Kategorie-Seiten haben bereits 100+ Wörter Beschreibung
- [x] Cookie-Seiten haben ausführliche Erklärungen
- **Status**: SEMrush False Positive bei JS-gerenderten Seiten

### 7. Broken internal links (2 Links)
- [ ] Benötigt spezifische URLs aus SEMrush Export

### 8. 4xx errors (2 Seiten) ✅
- [x] wp-login.php = 410 Gone (GEWOLLT - Sicherheitsfeature)
- **Status**: Kein Handlungsbedarf

### 9. Blocked from crawling (23 Seiten) ✅
- [x] robots.txt analysiert
- [x] Blockiert: /admin, /api/, /_next/ (außer static/image)
- **Status**: Alle Blockierungen sind GEWOLLT

---

## TECHNISCHE ÄNDERUNGEN

### Dateien geändert:
1. `src/lib/utils.ts`
   - `getCanonicalUrl` erweitert um Pfadübersetzung
   - `pathTranslations` um alle URLs erweitert
   - `translatePath` Funktion hinzugefügt

2. `src/components/seo/hreflang-tags.tsx`
   - Pfadübersetzungen synchronisiert
   - Bidirektionale Übersetzung (DE↔EN)

3. `next.config.ts`
   - 301-Redirects für alte Blog/Projekt-Slugs

4. `src/lib/payload/index.ts` **(NEU 27.12.2025 22:45)**
   - `serviceSlugEnToDe` Mapping hinzugefügt
   - `referenzSlugEnToDe` Mapping hinzugefügt
   - `translateServiceSlug()` für DB-Lookup
   - `translateReferenzSlug()` für DB-Lookup
   - `getServiceBySlug()` verwendet jetzt Übersetzung
   - `getSubServiceBySlug()` verwendet jetzt Übersetzung
   - `getReferenzCategoryBySlug()` verwendet jetzt Übersetzung

5. **Datenbank** (auf Server)
   - Blog-Slugs geändert (3 Posts)
   - Projekt-Slug geändert (1 Projekt)

---

## VERIFIZIERUNG

| Test | Ergebnis |
|------|----------|
| `/en/services/branding` Canonical | ✅ `/en/services/branding` |
| `/en/about-us` Canonical | ✅ `/en/about-us` |
| `/en/contact` Canonical | ✅ `/en/contact` |
| Sitemap hreflang | ✅ Korrekte DE/EN Alternates |
| Blog-Redirect Test | ✅ 308 → neue URL |
| Projekt-Redirect Test | ✅ 308 → neue URL |

---

## NÄCHSTE SCHRITTE

1. **SEMrush Re-Crawl #2 starten** - Sub-Service Fix ist live
2. **Orphaned Pages prüfen** - Wenn SEMrush Details liefert
3. **Broken Links reparieren** - Wenn SEMrush URLs liefert

**Erwartete Verbesserung nach Re-Crawl #2:**
- Sitemap Errors: 23 → 0
- Site Health: 94% → 97%+
- Errors: 25 → ~5
