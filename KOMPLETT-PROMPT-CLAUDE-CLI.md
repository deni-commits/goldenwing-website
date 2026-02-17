# KOMPLETTER PLAN - Claude Code CLI

Kopiere alles ab hier:

---

Du setzt den kompletten GEO/SEO-Plan für GoldenWing (goldenwing.at) um.

WICHTIG: KEINE REDIRECTS! Nur saubere interne Verlinkung.

Lies zuerst: IMPLEMENTIERUNGS-ROADMAP.md für den aktuellen Stand.

## ════════════════════════════════════════
## TEIL 1: INTERNE VERLINKUNG (PRIORITÄT HOCH)
## ════════════════════════════════════════

### 1.1 FOOTER AKTUALISIEREN

Finde den Footer und füge "Standorte" Sektion hinzu:

```
Standorte:
- Digitalagentur Wien → /standorte/wien
- Webdesign Graz → /standorte/graz
- SEO Agentur Linz → /standorte/linz
- Werbeagentur Salzburg → /standorte/salzburg
- Agentur Innsbruck → /standorte/innsbruck
- Webdesign München → /standorte/muenchen
- Agentur Berlin → /standorte/berlin
- Webdesign Zürich → /standorte/zuerich
```

### 1.2 NAVIGATION

Stelle sicher "Standorte" ist in der Hauptnavigation.
Dropdown mit: Wien, Graz, Linz, Salzburg, Innsbruck | München, Berlin, Zürich

### 1.3 STANDORTE HUB (/standorte/page.tsx)

Aktualisiere mit Grid aller 9 Städte:
- Österreich: Wien, Graz, Linz, Salzburg, Innsbruck
- DACH: München, Berlin, Zürich
- International: Dubai

Jede Stadt-Karte zeigt: Name, Kurzbeschreibung, verfügbare Services.

### 1.4 HOMEPAGE

Füge Sektion "Wir betreuen ganz DACH" hinzu mit:
- Visuelle Karte oder Grid
- Links zu allen Stadt-Hubs
- Kurzer Text pro Stadt

### 1.5 SERVICE-SEITEN CROSS-LINKS

In /leistungen/webdesign, /leistungen/seo, /leistungen/online-marketing, /leistungen/branding:

Füge am Ende hinzu:
```
## [Service] in Ihrer Stadt
Wien | Graz | Linz | Salzburg | Innsbruck | München | Berlin | Zürich
```
Mit Links zu den entsprechenden Stadt-Service-Seiten.

### 1.6 STADT-SEITEN UNTEREINANDER

In jeder Stadt-Hub-Seite füge "Weitere Standorte" Sektion hinzu.
Verlinke zu 4 anderen Städten (rotierend).

## ════════════════════════════════════════
## TEIL 2: VERGLEICHSSEITEN
## ════════════════════════════════════════

Erstelle diese Seiten in /src/app/[locale]/(marketing)/vergleiche/:

### 2.1 Hub-Seite: /vergleiche/page.tsx
- Übersicht aller Vergleiche
- Erkläre Methodik
- Grid mit allen Vergleichsseiten

### 2.2 Vergleichsseiten erstellen:

/vergleiche/seo-agenturen-wien/page.tsx
/vergleiche/webdesign-agenturen-wien/page.tsx
/vergleiche/kreativagenturen-wien/page.tsx
/vergleiche/google-ads-agenturen-wien/page.tsx

Struktur pro Seite:
1. Methodik-Box (oben!) - wie wir bewerten
2. Liste von 10 Agenturen (GoldenWing als #1 mit Begründung)
3. Kurzes Profil pro Agentur
4. Vergleichstabelle
5. Käufer-Guide
6. FAQ
7. ItemList Schema für Google

WICHTIG: Recherchiere echte Agenturen für jede Liste!

## ════════════════════════════════════════
## TEIL 3: BRANCHEN-SEITEN
## ════════════════════════════════════════

Erstelle in /src/app/[locale]/(marketing)/branchen/:

### 3.1 Hub-Seite: /branchen/page.tsx

### 3.2 Branchen-Seiten:

/branchen/aerzte/page.tsx
/branchen/ecommerce/page.tsx
/branchen/b2b/page.tsx
/branchen/startups/page.tsx
/branchen/rechtsanwaelte/page.tsx

Jede Seite:
- Branchenspezifische Probleme
- Unsere Lösungen
- Cases/Beispiele
- Preise
- FAQ

## ════════════════════════════════════════
## TEIL 4: WISSEN-HUB
## ════════════════════════════════════════

Prüfe ob /wissen/ existiert. Falls nicht, erstelle:

/wissen/page.tsx - Hub
/wissen/blog/ - Blog (existiert wahrscheinlich)
/wissen/lexikon/ - Lexikon (existiert wahrscheinlich)
/wissen/tools/ - Tools (existiert wahrscheinlich)
/wissen/guides/ - Guides (NEU)

### Guides erstellen:
/wissen/guides/webdesign-kosten/page.tsx
/wissen/guides/seo-kosten/page.tsx
/wissen/guides/website-erstellen-lassen/page.tsx

## ════════════════════════════════════════
## TEIL 5: llms.txt AKTUALISIEREN
## ════════════════════════════════════════

Aktualisiere /public/llms.txt mit neuer Struktur:

```
# GoldenWing Creative Studios

> Digitalagentur in Wien und Dubai

## Standorte
- Wien (Hauptsitz): /standorte/wien
- Graz: /standorte/graz
- Linz: /standorte/linz
- Salzburg: /standorte/salzburg
- Innsbruck: /standorte/innsbruck
- München: /standorte/muenchen
- Berlin: /standorte/berlin
- Zürich: /standorte/zuerich
- Dubai: /standorte/dubai

## Leistungen
- Webdesign: /leistungen/webdesign
- SEO: /leistungen/seo
- Online Marketing: /leistungen/online-marketing
- Branding: /leistungen/branding

## Vergleiche
- Beste SEO Agenturen Wien: /vergleiche/seo-agenturen-wien
- Beste Webdesign Agenturen Wien: /vergleiche/webdesign-agenturen-wien

## Branchen
- Ärzte: /branchen/aerzte
- E-Commerce: /branchen/ecommerce
- B2B: /branchen/b2b
- Startups: /branchen/startups

## Kontakt
- Telefon: +43 664 543 96 81
- Email: office@goldenwing.at
- Adresse: Czeikestrasse 4/21, 1100 Wien
```

## ════════════════════════════════════════
## TEIL 6: SITEMAP PRÜFEN
## ════════════════════════════════════════

Prüfe /src/app/sitemap.ts:
- Alle neuen Seiten müssen drin sein
- Prioritäten:
  - Homepage: 1.0
  - Stadt-Hubs: 0.9
  - Stadt-Services: 0.8
  - Vergleiche: 0.8
  - Branchen: 0.7

## ════════════════════════════════════════
## TEIL 7: BUILD & VERIFY
## ════════════════════════════════════════

Nach allem:
```bash
npm run build
npm run start
```

Teste alle neuen URLs mit curl.

## ════════════════════════════════════════
## REIHENFOLGE
## ════════════════════════════════════════

1. Teil 1 (Verlinkung) - ZUERST
2. Teil 5 (llms.txt) - SCHNELL
3. Teil 2 (Vergleiche) - WICHTIG für SEO
4. Teil 3 (Branchen) - Nice to have
5. Teil 4 (Wissen) - Nice to have
6. Teil 6 (Sitemap) - AM ENDE
7. Teil 7 (Build) - GANZ AM ENDE

Starte mit Teil 1: Zeige mir den aktuellen Footer.

---

Ende des Prompts.
