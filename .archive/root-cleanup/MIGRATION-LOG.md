# GoldenWing Website Migration Log

## Datum: 2025-01-09

---

## 1. Dubai LocalBusiness-Daten Update

### Problem
Die Dubai-Büro-Informationen waren veraltet oder falsch in mehreren Dateien:
- Falsche Telefonnummer: `+971 58 855 1816`
- Fehlende/falsche Koordinaten: `latitude: 25.1857`
- Unvollständige Adresse

### Korrekte Dubai-Daten (vom Benutzer bereitgestellt)
```
Telefon: +971 58 514 4360
Adresse: DAMAC Executive Bay Tower B, Office 1406, 14th Floor, Business Bay
Koordinaten: latitude: 25.1783747, longitude: 55.2615882
(aus Google Maps: https://www.google.com/maps/place/GoldenWing+-+Creative+Studios/@25.1783747,55.2615882)
```

### Aktualisierte Dateien (22 Stück)

#### Zentrale Konfiguration
1. `src/lib/landing-pages-data.ts` - `localBusinessDubai` Konstante

#### Landing Pages mit RegionalLandingPage-Template
2. `src/app/[locale]/(marketing)/webdesign-dubai/page.tsx`
3. `src/app/[locale]/(marketing)/webdesign-vae/page.tsx`
4. `src/app/[locale]/(marketing)/seo-agentur-dubai/page.tsx`
5. `src/app/[locale]/(marketing)/branding-agentur-dubai/page.tsx`
6. `src/app/[locale]/(marketing)/kreativagentur-dubai/page.tsx`
7. `src/app/[locale]/(marketing)/digitales-marketing-dubai/page.tsx`
8. `src/app/[locale]/(marketing)/ecommerce-agentur-dubai/page.tsx`
9. `src/app/[locale]/(marketing)/wordpress-agentur-dubai/page.tsx`
10. `src/app/[locale]/(marketing)/app-entwicklung-dubai/page.tsx`
11. `src/app/[locale]/(marketing)/webentwicklung-abu-dhabi/page.tsx`

#### Dubai Hub-Seiten (eigene Struktur)
12. `src/app/[locale]/(marketing)/standorte/dubai/page.tsx`
13. `src/app/[locale]/(marketing)/dubai/page.tsx` (Hub)
14. `src/app/[locale]/(marketing)/dubai/web-design-company-dubai/page.tsx`
15. `src/app/[locale]/(marketing)/dubai/seo-company-dubai/page.tsx`
16. `src/app/[locale]/(marketing)/dubai/branding-agency-dubai/page.tsx`
17. `src/app/[locale]/(marketing)/dubai/ecommerce-development-dubai/page.tsx`
18. `src/app/[locale]/(marketing)/dubai/digital-marketing-agency-dubai/page.tsx`

#### Standorte-Seiten
19. `src/app/[locale]/(marketing)/standorte/page.tsx` (Übersicht)

#### Homepage
20. `src/app/[locale]/(marketing)/page.tsx` (Organization Schema + LocalBusiness)

#### i18n Messages
21. `src/messages/de.json`
22. `src/messages/en.json`

### Änderungen pro Datei

Jede Datei wurde aktualisiert mit:
- `telephone: '+971-58-514-4360'` (oder `phone: '+971 58 514 4360'`)
- `streetAddress: 'DAMAC Executive Bay Tower B, Office 1406, 14th Floor'`
- `addressRegion: 'Business Bay'`
- `geo: { '@type': 'GeoCoordinates', latitude: 25.1783747, longitude: 55.2615882 }`

---

## 2. Aktueller Stand der Landing Page Migration

### Bereits migrierte Webdesign-Seiten (LandingPageTemplate)
Diese 12 Seiten verwenden das neue `LandingPageTemplate`:

1. `webdesign-wien/page.tsx`
2. `webdesign-graz/page.tsx`
3. `webdesign-linz/page.tsx`
4. `webdesign-salzburg/page.tsx`
5. `webdesign-innsbruck/page.tsx`
6. `webdesign-oesterreich/page.tsx`
7. `webdesign-deutschland/page.tsx`
8. `webdesign-berlin/page.tsx`
9. `webdesign-hamburg/page.tsx`
10. `webdesign-muenchen/page.tsx`
11. `webdesign-frankfurt/page.tsx`
12. `webdesign-schweiz/page.tsx`

### Seiten mit RegionalLandingPage-Template (15 Stück)
Diese Seiten verwenden das `RegionalLandingPage`-Template:

**Dubai/VAE:**
- `webdesign-dubai/page.tsx`
- `webdesign-vae/page.tsx`
- `seo-agentur-dubai/page.tsx`
- `branding-agentur-dubai/page.tsx`
- `kreativagentur-dubai/page.tsx`
- `digitales-marketing-dubai/page.tsx`
- `ecommerce-agentur-dubai/page.tsx`
- `wordpress-agentur-dubai/page.tsx`
- `app-entwicklung-dubai/page.tsx`
- `webentwicklung-abu-dhabi/page.tsx`

**DACH:**
- `webdesign-zuerich/page.tsx`
- `seo-agentur-deutschland/page.tsx`
- `seo-agentur-schweiz/page.tsx`
- `branding-agentur-deutschland/page.tsx`
- `branding-agentur-wien/page.tsx`

### SEO-Seiten mit eigener Struktur (8 Stück)
Diese Seiten haben ihre eigene Struktur (kein Template):

- `seo-agentur-wien/page.tsx` (mit CMS-Integration)
- `seo-agentur-graz/page.tsx`
- `seo-agentur-linz/page.tsx`
- `seo-agentur-salzburg/page.tsx`
- `seo-agentur-innsbruck/page.tsx`

### Weitere Landing Pages
- `kreativagentur-wien/page.tsx`
- `werbeagentur-innsbruck/page.tsx`
- `werbeagentur-linz/page.tsx`
- `werbeagentur-salzburg/page.tsx`
- `online-marketing-agentur-linz/page.tsx`
- `online-marketing-graz/page.tsx`

---

## 3. revalidate-Werte korrigiert

Alle Webdesign-Landing Pages wurden von `revalidate = 60` auf `revalidate = 3600` geändert:
- Das entspricht 1 Stunde Cache statt 1 Minute
- Wichtig für ISR (Incremental Static Regeneration)
- Reduziert Server-Last bei statischen Landing Pages

---

## 4. Build-Verifizierung

Nach allen Änderungen wurde `npm run build` erfolgreich ausgeführt:
- 539 Seiten generiert
- Keine TypeScript-Fehler
- Nur ESLint-Warnungen (acorn-jsx dependency) und metadataBase-Warnungen

---

## 5. Prüfungsergebnisse

### Leistungen-Seiten
- [x] `revalidate = 60` ✓ (CMS-gesteuert, korrekt für dynamische Inhalte)
- [x] JSON-LD Schema vorhanden ✓
- [x] Canonical URLs und hreflang korrekt ✓

### Statische Seiten (Impressum, Datenschutz)
- [x] `revalidate = 60` ✓ (CMS-gesteuert, korrekt)
- [x] WebPage Schema vorhanden ✓
- [x] BreadcrumbListSchema vorhanden ✓
- [x] Canonical URLs und hreflang korrekt ✓

### Homepage Schema
- [x] Organization Schema mit korrekten ContactPoints ✓
- [x] LocalBusiness Wien: +43-664-543-96-81 ✓
- [x] LocalBusiness Dubai: +971-58-514-4360, GeoCoordinates korrekt ✓
- [x] LocalBusiness Roseville: +1-916-667-4629 ✓
- [x] FAQPage Schema ✓
- [x] SiteNavigationElement ✓
- [x] SearchAction für Sitelinks Searchbox ✓

### Standorte-Seiten
- [x] Wien: Adresse, Telefon, GeoCoordinates korrekt ✓
- [x] Dubai: +971 58 514 4360, GeoCoordinates (25.1783747, 55.2615882) ✓
- [x] Alle StandortPage-Templates korrekt ✓

### Noch optional
- [ ] SEO-Seiten auf LandingPageTemplate migrieren (bei Bedarf)
- [ ] Container-System für weitere Seiten (bei Bedarf)

---

## 6. Wichtige Hinweise

### SEO-Preservation
- Alle `canonical` URLs bleiben unverändert
- Alle `hreflang` Alternates bleiben unverändert
- Schema.org Markup wurde erweitert (nicht entfernt)
- LocalBusiness-Schema enthält jetzt GeoCoordinates

### Schema-Markup Struktur
```json
{
  "@type": "LocalBusiness",
  "name": "GoldenWing Creative Studios Dubai",
  "telephone": "+971-58-514-4360",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "DAMAC Executive Bay Tower B, Office 1406, 14th Floor",
    "addressLocality": "Dubai",
    "addressRegion": "Business Bay",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.1783747,
    "longitude": 55.2615882
  }
}
```

---

## Änderungshistorie

| Datum | Änderung | Dateien |
|-------|----------|---------|
| 2025-01-09 | Dubai LocalBusiness-Daten aktualisiert | 22 Dateien |
| 2025-01-09 | revalidate von 60 auf 3600 (Webdesign) | 12 Seiten |
| 2025-01-09 | revalidate von 60 auf 3600 (SEO/Marketing) | 13 Seiten |

### revalidate Update (13 zusätzliche Seiten)
- `seo-agentur-wien/page.tsx`
- `seo-agentur-graz/page.tsx`
- `seo-agentur-linz/page.tsx`
- `seo-agentur-salzburg/page.tsx`
- `seo-agentur-innsbruck/page.tsx`
- `werbeagentur-innsbruck/page.tsx`
- `werbeagentur-salzburg/page.tsx`
- `werbeagentur-linz/page.tsx`
- `online-marketing-graz/page.tsx`
- `online-marketing-agentur-linz/page.tsx`
- `google-ads-agentur-wien/page.tsx`
- `google-ads-agentur-oesterreich/page.tsx`
- `kreativagentur-wien/page.tsx`
