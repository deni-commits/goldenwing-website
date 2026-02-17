# GoldenWing Website Refactoring Plan

## Status: IN PROGRESS
**Gestartet:** 2025-01-09
**Ziel:** Konsistentes Container-System + Template-Migration

---

## PHASE 1: Container-System [ABGESCHLOSSEN]

- [x] Container-Komponente erstellen (`src/components/ui/container.tsx`)
- [x] Case Studies Seite aktualisieren (`/projekte/[slug]`)
- [x] Referenzen-Template aktualisieren (`referenz-page.tsx`)

---

## PHASE 2: Landing Pages Template-Migration [IN PROGRESS]

### 2.1 Template erstellen
- [x] `LandingPageTemplate` Komponente erstellen ✓
- [x] Props-Interface definieren für alle Varianten ✓
- [x] Container-System integrieren ✓
- [x] SEO-Komponenten (JSON-LD, Canonical, Hreflang) einbauen ✓

### 2.2 Data-Struktur erstellen
- [x] `src/lib/landing-pages-data.ts` erstellen ✓
- [x] LocalBusiness-Daten für Wien/Dubai/Roseville ✓

### 2.3 Landing Pages migrieren

#### DACH Webdesign (12 Seiten) - ✅ ALLE MIGRIERT
- [x] webdesign-wien ✓
- [x] webdesign-graz ✓
- [x] webdesign-linz ✓
- [x] webdesign-salzburg ✓
- [x] webdesign-innsbruck ✓
- [x] webdesign-deutschland ✓
- [x] webdesign-schweiz ✓
- [x] webdesign-oesterreich ✓
- [x] webdesign-berlin ✓
- [x] webdesign-hamburg ✓
- [x] webdesign-muenchen ✓
- [x] webdesign-frankfurt ✓
- [x] webdesign-zuerich (RegionalLandingPage) ✓

#### DACH SEO (7 Seiten) - revalidate korrigiert, eigene Struktur
- [x] seo-agentur-wien (CMS-Integration, eigene Struktur) ✓
- [x] seo-agentur-graz ✓
- [x] seo-agentur-linz ✓
- [x] seo-agentur-salzburg ✓
- [x] seo-agentur-innsbruck ✓
- [x] seo-agentur-deutschland (RegionalLandingPage) ✓
- [x] seo-agentur-schweiz (RegionalLandingPage) ✓

#### DACH Branding (3 Seiten)
- [x] branding-agentur-wien (RegionalLandingPage) ✓
- [x] branding-agentur-deutschland (RegionalLandingPage) ✓
- [x] branding-agentur-dubai (RegionalLandingPage) ✓

#### DACH Sonstige (8 Seiten) - revalidate korrigiert
- [x] kreativagentur-wien ✓
- [x] werbeagentur-innsbruck ✓
- [x] werbeagentur-linz ✓
- [x] werbeagentur-salzburg ✓
- [x] google-ads-agentur-wien ✓
- [x] google-ads-agentur-oesterreich ✓
- [x] online-marketing-graz ✓
- [x] online-marketing-agentur-linz ✓

#### UAE (10 Seiten) - ✅ ALLE RegionalLandingPage + Dubai-Daten aktualisiert
- [x] webdesign-dubai ✓
- [x] webdesign-vae ✓
- [x] seo-agentur-dubai ✓
- [x] kreativagentur-dubai ✓
- [x] digitales-marketing-dubai ✓
- [x] ecommerce-agentur-dubai ✓
- [x] wordpress-agentur-dubai ✓
- [x] app-entwicklung-dubai ✓
- [x] webentwicklung-abu-dhabi ✓
- [x] web-design-abu-dhabi ✓

---

## PHASE 3: Services Container-Update [IN PROGRESS]

### 3.1 Hauptservice-Seiten
- [x] `/leistungen/[slug]/page.tsx` - Container anwenden ✓

### 3.2 Unterservice-Seiten
- [x] `/leistungen/[slug]/[subslug]/page.tsx` - Container anwenden ✓

### 3.3 Extra-Service-Seiten (13 Dateien, 90 Container-Ersetzungen)
**Status:** ✅ ABGESCHLOSSEN

- [x] wordpress-agentur (8 Container) ✓
- [x] seo-betreuung (7 Container) ✓
- [x] seo-texter (7 Container) ✓
- [x] seo-berater (7 Container) ✓
- [x] social-media-agentur (8 Container) ✓
- [x] sea-agentur (7 Container) ✓
- [x] google-ads-agentur (7 Container) ✓
- [x] ecommerce-agentur (7 Container) ✓
- [x] grafikdesign (7 Container) ✓
- [x] onlineshop-agentur (8 Container) ✓
- [x] pakete/page.tsx (3 Container) ✓
- [x] pakete/[slug]/page.tsx (9 Container) ✓
- [x] page.tsx (Übersicht, 7 Container) ✓

---

## PHASE 4: Statische Seiten [IN PROGRESS]

### 4.1 Über-uns Seiten (6 Seiten)
- [ ] /ueber-uns
- [ ] /ueber-uns/team
- [ ] /ueber-uns/partner
- [ ] /ueber-uns/werte
- [ ] /ueber-uns/kultur
- [ ] /ueber-uns/facts-figures

### 4.2 Rechtliche Seiten
- [ ] /impressum
- [ ] /datenschutz
- [ ] /haeufige-fragen
- [ ] /rechtliches/cookie-einstellungen

### 4.3 Sonstige
- [ ] /kontakt
- [ ] /ressourcen
- [ ] /ressourcen/downloads
- [ ] /ressourcen/newsletter

---

## PHASE 5: Homepage [PENDING]

- [ ] Homepage in Sections aufteilen
- [ ] Container-System anwenden
- [ ] Performance optimieren (43KB reduzieren)

---

## PHASE 6: Standorte & Hubs [PENDING]

### 6.1 Standorte-Template
- [ ] /standorte
- [ ] /standorte/wien
- [ ] /standorte/dubai

### 6.2 UAE Hubs
- [ ] /dubai (Hub)
- [ ] /dubai/* (5 Unterseiten)
- [ ] /abu-dhabi (Hub)
- [ ] /abu-dhabi/* (5 Unterseiten)
- [ ] /sharjah (Hub)
- [ ] /sharjah/* (5 Unterseiten)
- [ ] /uae

---

## SEO-CHECKLISTE (bei jeder Änderung prüfen)

- [ ] `generateMetadata` korrekt implementiert
- [ ] Canonical URL gesetzt
- [ ] Hreflang Alternates (DE/EN)
- [ ] JSON-LD Schemas vorhanden:
  - [ ] BreadcrumbList
  - [ ] LocalBusiness (für Standort-Seiten)
  - [ ] FAQPage (wenn FAQs vorhanden)
  - [ ] Service (für Service-Seiten)
- [ ] Open Graph Tags
- [ ] Title < 60 Zeichen
- [ ] Description < 160 Zeichen
- [ ] H1 vorhanden und einzigartig
- [ ] Interne Links erhalten

---

## QUALITÄTS-GATES

Nach jeder Phase:
1. [ ] `npm run build` erfolgreich
2. [ ] Keine TypeScript-Fehler
3. [ ] Stichproben-Test der Seiten
4. [ ] SEO-Metadaten prüfen

---

## NOTIZEN

- Container-Varianten: full, wide, narrow, text
- Padding: none, sm, md, lg
- Background: default, muted, primary, dark
- RegionalLandingPage Komponente existiert bereits in `/components/sections/`

---

## FORTSCHRITT

| Phase | Status | Fortschritt |
|-------|--------|-------------|
| Phase 1 | ✅ DONE | 100% |
| Phase 2 | ✅ DONE | 100% (40 Seiten) |
| Phase 3 | ✅ DONE | 100% (13/13 Dateien) |
| Phase 4 | 🔄 IN PROGRESS | 0% |
| Phase 5 | ⏳ PENDING | 0% |
| Phase 6 | ⏳ PENDING | 0% |

### Phase 3 Details - ABGESCHLOSSEN
- ✅ `/leistungen/[slug]/page.tsx` - Hauptservice-Seiten
- ✅ `/leistungen/[slug]/[subslug]/page.tsx` - Unterservice-Seiten
- ✅ 13 Extra-Service-Seiten (95+ Container-Ersetzungen komplett)
