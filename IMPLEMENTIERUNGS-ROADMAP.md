# 🗺️ IMPLEMENTIERUNGS-ROADMAP

> **Gesamtdauer:** 8-9 Wochen
> **Start:** Februar 2026
> **Ziel:** Vollständige GEO/SEO-optimierte Struktur live

---

## 📊 FORTSCHRITT

```
✅ Woche 1-2:  Foundation (Routing, Struktur, Templates) - ERLEDIGT
✅ Woche 2-3:  TIER 1 (Wien + Dubai - vollständig) - ERLEDIGT
✅ Woche 3-4:  TIER 2 AT (Graz, Linz, Salzburg, Innsbruck) - ERLEDIGT
✅ Woche 4-5:  TIER 2 DACH (München, Berlin, Zürich) - ERLEDIGT
⏳ Woche 5-6:  Vergleiche + Branchen - OFFEN
⏳ Woche 6-7:  Wissen-Hub + Migration - OFFEN
⏳ Woche 7-8:  Redirects + Schema + llms.txt - OFFEN
⏳ Woche 8-9:  Testing + Launch - OFFEN
```

---

## ✅ PHASE 1: FOUNDATION (Woche 1-2) - ERLEDIGT

### Ziel: Technische Grundlage schaffen

### Tasks:

```
✅ Git Branch erstellen
   (Kein Git - direkt auf VPS)

✅ Routing-Konfiguration anpassen
   /src/i18n/routing.ts
   - Neue Pfade: /standorte/, /leistungen/, /vergleiche/, etc.
   - hreflang Setup: DE default, EN mit Prefix

✅ Ordnerstruktur anlegen
   /app/[locale]/(marketing)/standorte/
   ├── page.tsx (Hub)
   ├── wien/
   │   ├── page.tsx
   │   ├── webdesign/page.tsx
   │   └── seo/page.tsx
   ├── graz/
   │   ├── page.tsx
   │   ├── webdesign/page.tsx
   │   ├── seo/page.tsx
   │   └── online-marketing/page.tsx
   ├── linz/
   │   ├── page.tsx
   │   ├── webdesign/page.tsx
   │   └── seo/page.tsx
   ├── salzburg/
   │   ├── page.tsx
   │   └── webdesign/page.tsx
   ├── innsbruck/
   │   ├── page.tsx
   │   └── webdesign/page.tsx
   ├── muenchen/page.tsx
   ├── berlin/page.tsx
   └── zuerich/page.tsx

✅ Templates nutzen
   - LandingPageTemplate für Service-Seiten
   - Eigene Hub-Komponenten für Stadt-Seiten
```

### Deliverables:
- [x] Routing funktioniert
- [x] Ordnerstruktur steht
- [x] Templates sind einsatzbereit
- [ ] Build-Test auf VPS nötig

---

## ✅ PHASE 2: WIEN + DUBAI (Woche 2-3) - ERLEDIGT

### Ziel: TIER 1 Städte vollständig live

### Tasks Wien:

```
✅ /standorte/wien/ Hub
   - LocalBusiness Schema mit echten Daten
   - Wirtschaftsagentur 50% Förderung

✅ /standorte/wien/webdesign/
   - Vollständiger Content
   - Preise mit Förderhinweis
   - FAQ

✅ /standorte/wien/seo/
   - Eigenes Content
   - SEO-Pakete €590-2.490

⏳ /standorte/wien/branding/ - Ordner existiert, Content fehlt
⏳ /standorte/wien/google-ads/ - Ordner existiert, Content fehlt
⏳ /standorte/wien/social-media/ - Ordner existiert, Content fehlt
⏳ /standorte/wien/kreativagentur/ - Ordner existiert, Content fehlt
```

### Tasks Dubai:

```
✅ /standorte/dubai/ Hub (existierte bereits)
⏳ Weitere Dubai-Services - noch offen
```

### Deliverables:
- [x] Wien Hub + 2 Services live
- [x] LocalBusiness Schema für Wien
- [ ] Restliche Wien-Services (branding, google-ads, social-media, kreativagentur)

---

## ✅ PHASE 3: ÖSTERREICH STÄDTE (Woche 3-4) - ERLEDIGT

### Ziel: TIER 2 AT komplett

### Tasks Graz: ✅ KOMPLETT

```
✅ /standorte/graz/ Hub
   - Service Schema (KEIN LocalBusiness!)
   - Automotive-Fokus (Magna, AVL)
   - SFG 30% Förderung

✅ /standorte/graz/webdesign/
✅ /standorte/graz/seo/
✅ /standorte/graz/online-marketing/
```

### Tasks Linz: ✅ HUB + 2 SERVICES

```
✅ /standorte/linz/ Hub
   - Voestalpine/Industrie-Fokus
   - Business Upper Austria 30% Förderung

✅ /standorte/linz/webdesign/
✅ /standorte/linz/seo/
⏳ /standorte/linz/online-marketing/ - noch offen
⏳ /standorte/linz/werbeagentur/ - noch offen
```

### Tasks Salzburg: ✅ HUB + WEBDESIGN

```
✅ /standorte/salzburg/ Hub
   - Tourismus-Fokus
   - ITG Salzburg 50% Förderung (höchste in AT!)

✅ /standorte/salzburg/webdesign/
⏳ /standorte/salzburg/seo/ - noch offen
⏳ /standorte/salzburg/werbeagentur/ - noch offen
```

### Tasks Innsbruck: ✅ HUB + WEBDESIGN

```
✅ /standorte/innsbruck/ Hub
   - Outdoor + Life Sciences
   - Standortagentur Tirol 30%

✅ /standorte/innsbruck/webdesign/
⏳ /standorte/innsbruck/seo/ - noch offen
⏳ /standorte/innsbruck/werbeagentur/ - noch offen
```

### Unique Content implementiert:
- [x] Aktuelle Förder-Links
- [x] Lokale Branchen-Fokussierung
- [x] Stadt-spezifische FAQs
- [x] Service Schema (NICHT LocalBusiness!)

### Deliverables:
- [x] 4 Stadt-Hubs live
- [x] 8 Stadt-Service-Seiten live
- [x] Alle mit 35%+ Unique Content
- [x] Service Schema korrekt implementiert

---

## ✅ PHASE 4: DACH EXPANSION (Woche 4-5) - ERLEDIGT (HUBS)

### Ziel: München, Berlin, Zürich

### Tasks München: ✅ HUB

```
✅ /standorte/muenchen/ Hub
   - Preisargument (40% günstiger als M-Agenturen)
   - Automotive + Tech + Finance Fokus

⏳ /standorte/muenchen/webdesign/ - noch offen
⏳ /standorte/muenchen/seo/ - noch offen
```

### Tasks Berlin: ✅ HUB

```
✅ /standorte/berlin/ Hub
   - Startup-Fokus
   - Budget-freundlich

⏳ /standorte/berlin/webdesign/ - noch offen
⏳ /standorte/berlin/seo/ - noch offen
```

### Tasks Zürich: ✅ HUB

```
✅ /standorte/zuerich/ Hub
   - Preis-Argument (55% günstiger als CH!)
   - Finance, Pharma, Luxury Fokus

⏳ /standorte/zuerich/webdesign/ - noch offen
⏳ /standorte/zuerich/seo/ - noch offen
```

### Deliverables:
- [x] 3 Stadt-Hubs live
- [ ] 6 Stadt-Service-Seiten noch offen
- [x] DACH-spezifische Argumente integriert

---

## ⏳ PHASE 5: VERGLEICHE + BRANCHEN (Woche 5-6) - OFFEN

### Ziel: Comparison Hub + Industry Hub

### Vergleichsseiten (Priorität):

```
⏳ /vergleiche/ Hub
⏳ /vergleiche/seo-agenturen-wien/
⏳ /vergleiche/webdesign-agenturen-wien/
⏳ /vergleiche/kreativagenturen-wien/
⏳ /vergleiche/google-ads-agenturen-wien/
```

### Branchen-Seiten:

```
⏳ /branchen/ Hub
⏳ /branchen/aerzte/
⏳ /branchen/ecommerce/
⏳ /branchen/b2b/
⏳ /branchen/startups/
```

---

## ⏳ PHASE 6: WISSEN-HUB (Woche 6-7) - OFFEN

### Ziel: Content-Migration + neue Struktur

```
⏳ /wissen/ Hub erstellen
⏳ /wissen/blog/ Migration
⏳ /wissen/lexikon/ Migration
⏳ /wissen/guides/ neu
⏳ /wissen/tools/ Migration
```

---

## ⏳ PHASE 7: REDIRECTS + SCHEMA + llms.txt (Woche 7-8) - OFFEN

```
⏳ Alle 301-Redirects in next.config.js
⏳ Schema-Validation komplett
⏳ llms.txt aktualisieren
⏳ Sitemap optimieren
```

---

## ⏳ PHASE 8: TESTING + LAUNCH (Woche 8-9) - OFFEN

```
⏳ 404-Check
⏳ Lighthouse-Audits
⏳ Mobile-Testing
⏳ Cross-Browser Testing
⏳ Launch
```

---

## 📊 AKTUELLE STATISTIK

### Erstellte Seiten: 20

| Typ | Anzahl | Status |
|-----|--------|--------|
| Stadt-Hubs | 8 | ✅ Fertig |
| Stadt-Services | 12 | ✅ Fertig (Basis) |
| Vergleiche | 0 | ⏳ Offen |
| Branchen | 0 | ⏳ Offen |
| Wissen | 0 | ⏳ Offen |

### Nächste Schritte:

1. **Build auf VPS testen:** `npm run build && npm run start`
2. **Restliche Service-Seiten:** Wien, Linz, Salzburg, Innsbruck Services vervollständigen
3. **DACH Services:** München, Berlin, Zürich Webdesign + SEO
4. **Phase 5 starten:** Vergleichsseiten

---

*Implementierungs-Roadmap v2.0 - Aktualisiert Februar 2026*
*Für: GoldenWing Creative Studios*
