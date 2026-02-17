# Standorte-Seiten Deployment Guide

## Was wurde erstellt

### 20 neue Seiten in `/standorte/`:

**TIER 1 (Echte Standorte - LocalBusiness Schema):**
- `/standorte/wien/` - Hub + Webdesign + SEO
- `/standorte/dubai/` - Hub (existierte bereits)

**TIER 2 (Service-Area - NUR Service Schema):**
- `/standorte/graz/` - Hub + Webdesign + SEO + Online-Marketing
- `/standorte/linz/` - Hub + Webdesign + SEO
- `/standorte/salzburg/` - Hub + Webdesign
- `/standorte/innsbruck/` - Hub + Webdesign
- `/standorte/muenchen/` - Hub
- `/standorte/berlin/` - Hub
- `/standorte/zuerich/` - Hub

## Deployment auf VPS

```bash
# 1. Zum Projekt navigieren
cd /pfad/zu/goldenwing-website

# 2. Dependencies installieren (falls nötig)
npm install

# 3. Build erstellen
npm run build

# 4. Starten
npm run start

# ODER für Development:
npm run dev
```

## Routing bereits konfiguriert

Die `routing.ts` wurde bereits mit allen neuen Pfaden erweitert:
- Deutsche URLs: `/standorte/[stadt]/[service]`
- Englische URLs: `/locations/[city]/[service]`
- Russische URLs: `/ofisy/[город]/[услуга]`

## Unique Content pro Stadt

Jede Stadt hat einzigartigen Content (35%+ unique):

| Stadt | Branchen-Fokus | Förderung |
|-------|---------------|-----------|
| Wien | Tourismus, Startups, Gesundheit | Wirtschaftsagentur 50% |
| Graz | Automotive, B2B-Industrie, Tech | SFG 30% |
| Linz | Stahl, Maschinenbau, Chemie | Business Upper Austria 30% |
| Salzburg | Tourismus, Kultur, Premium | ITG 50% (!!) |
| Innsbruck | Outdoor, Life Sciences, Uni | Standortagentur Tirol 30% |
| München | Automotive, Tech, Finance | Preisvorteil 40% |
| Berlin | Startups, Tech, Kreativ | Startup-freundlich |
| Zürich | Finance, Pharma, Luxury | Preisvorteil 55% |

## Schema.org Markup

- **TIER 1 (Wien, Dubai):** LocalBusiness Schema ✅
- **TIER 2 (alle anderen):** Service Schema ONLY ❌ kein LocalBusiness

Das ist wichtig für Google – wir behaupten nicht, Büros zu haben wo keine sind.

## Nach dem Deployment

1. Google Search Console: Neue Seiten zur Indexierung einreichen
2. Sitemap aktualisieren (sollte automatisch passieren)
3. Interne Verlinkungen prüfen
4. Schema mit Rich Results Test validieren

## Bei Problemen

Falls Build-Fehler auftreten:
```bash
# Cache löschen
rm -rf .next
npm run build
```

Falls TypeScript-Fehler:
```bash
npx tsc --noEmit
```
