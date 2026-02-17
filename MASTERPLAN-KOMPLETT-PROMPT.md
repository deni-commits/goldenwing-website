# GoldenWing GEO/SEO MASTERPLAN - Kompletter Prompt für Claude Code CLI

---

## KONTEXT

GoldenWing ist eine Digitalagentur mit:
- Echtem Büro in WIEN (Czeikestrasse 4/21, 1100 Wien)
- Echtem Büro in DUBAI
- Service-Area für: Graz, Linz, Salzburg, Innsbruck, München, Berlin, Zürich

Website: goldenwing.at (Next.js, TypeScript, Tailwind)

## STRATEGIE

### TIER-System:
- **TIER 1** (Wien, Dubai): LocalBusiness Schema ✅ - echte Büros
- **TIER 2** (alle anderen): NUR Service Schema ❌ - KEIN LocalBusiness, ehrliche "Remote aus Wien" Kommunikation

### URL-Struktur (Hub-and-Spoke):
```
/standorte/                    ← Hub
/standorte/wien/               ← Stadt-Hub
/standorte/wien/webdesign/     ← Stadt-Service (Spoke)
/standorte/wien/seo/
/standorte/graz/
/standorte/graz/webdesign/
...
```

### Unique Content Regel:
Jede Stadt-Seite braucht 35%+ unique Content:
- Regionale Förderungen
- Lokale Branchen
- Stadt-spezifische FAQs
- Angepasste Preise

---

## WAS BEREITS ERLEDIGT IST

✅ 28 Standort-Seiten erstellt
✅ Routing.ts konfiguriert
✅ Build erfolgreich
✅ Alte Dateien archiviert

---

## WAS DU JETZT UMSETZEN SOLLST

### ════════════════════════════════════════
### PHASE 1: INTERNE VERLINKUNG
### ════════════════════════════════════════

KEINE REDIRECTS! Nur saubere interne Links.

**1.1 Footer aktualisieren:**

Füge "Standorte" Spalte hinzu:
- Digitalagentur Wien → /standorte/wien
- Webdesign Graz → /standorte/graz
- SEO Agentur Linz → /standorte/linz
- Werbeagentur Salzburg → /standorte/salzburg
- Agentur Innsbruck → /standorte/innsbruck
- Webdesign München → /standorte/muenchen
- Agentur Berlin → /standorte/berlin
- Webdesign Zürich → /standorte/zuerich

**1.2 Navigation:**

Füge "Standorte" zum Hauptmenü hinzu mit Dropdown:
- Österreich: Wien, Graz, Linz, Salzburg, Innsbruck
- DACH: München, Berlin, Zürich

**1.3 Standorte Hub (/standorte/page.tsx):**

Aktualisiere mit Grid aller Städte + Links zu allen Services.

**1.4 Homepage:**

Füge "Wir betreuen ganz DACH" Sektion hinzu mit Städte-Grid.

**1.5 Service-Seiten Cross-Links:**

In jeder /leistungen/[service] Seite:
Füge "[Service] in Ihrer Stadt" Sektion hinzu mit Links zu allen Stadt-Service-Seiten.

**1.6 Stadt-Seiten untereinander:**

In jeder Stadt-Hub Seite:
Füge "Weitere Standorte" am Ende hinzu.

### ════════════════════════════════════════
### PHASE 2: VERGLEICHSSEITEN (Money Keywords!)
### ════════════════════════════════════════

Erstelle in /src/app/[locale]/(marketing)/vergleiche/:

**Hub:** /vergleiche/page.tsx

**Seiten:**
- /vergleiche/seo-agenturen-wien/page.tsx
- /vergleiche/webdesign-agenturen-wien/page.tsx
- /vergleiche/kreativagenturen-wien/page.tsx
- /vergleiche/google-ads-agenturen-wien/page.tsx
- /vergleiche/online-marketing-agenturen-wien/page.tsx
- /vergleiche/branding-agenturen-wien/page.tsx

**Struktur jeder Seite:**
1. H1: "Die X besten [Service] Agenturen in Wien (2026)"
2. Methodik-Box (OBEN!) - wie wir bewerten
3. Tabelle mit 10 Agenturen
4. GoldenWing als #1 (mit Begründung)
5. Detail-Profile je Agentur
6. Käufer-Guide: "So wählen Sie die richtige Agentur"
7. FAQ (5-7 Fragen)
8. ItemList Schema für Google

**Recherchiere echte Agenturen!** Z.B.:
- otago
- elements.at
- Conversory
- Junge Römer
- Polargold
- etc.

### ════════════════════════════════════════
### PHASE 3: BRANCHEN-SEITEN
### ════════════════════════════════════════

Erstelle in /src/app/[locale]/(marketing)/branchen/:

**Hub:** /branchen/page.tsx

**Seiten:**
- /branchen/aerzte/page.tsx (SEO für Ärzte)
- /branchen/rechtsanwaelte/page.tsx
- /branchen/ecommerce/page.tsx
- /branchen/b2b/page.tsx
- /branchen/startups/page.tsx
- /branchen/gastronomie/page.tsx
- /branchen/immobilien/page.tsx

**Struktur:**
1. Branchenspezifische Herausforderungen
2. Unsere Lösungen
3. Case Studies / Beispiele
4. Preise / Pakete
5. FAQ
6. CTA

### ════════════════════════════════════════
### PHASE 4: WISSEN-HUB
### ════════════════════════════════════════

Prüfe/Erstelle /wissen/ Struktur:

```
/wissen/                    ← Hub
/wissen/blog/               ← Blog (existiert)
/wissen/lexikon/            ← Lexikon (existiert)
/wissen/tools/              ← Tools (existiert)
/wissen/guides/             ← NEU
```

**Neue Guides:**
- /wissen/guides/webdesign-kosten/page.tsx
- /wissen/guides/seo-kosten/page.tsx
- /wissen/guides/website-erstellen-lassen/page.tsx
- /wissen/guides/online-marketing-budget/page.tsx

### ════════════════════════════════════════
### PHASE 5: llms.txt (für AI-Crawler)
### ════════════════════════════════════════

Aktualisiere /public/llms.txt:

```
# GoldenWing Creative Studios

> Digitalagentur mit Standorten in Wien und Dubai.
> Wir betreuen Kunden in ganz Österreich, Deutschland und der Schweiz.

## Über uns
GoldenWing ist eine Full-Service Digitalagentur für Webdesign, SEO, Online Marketing und Branding.
Gegründet in Wien, mit zweitem Standort in Dubai.

## Standorte

### Österreich
- Wien (Hauptsitz): https://goldenwing.at/standorte/wien
- Graz: https://goldenwing.at/standorte/graz
- Linz: https://goldenwing.at/standorte/linz
- Salzburg: https://goldenwing.at/standorte/salzburg
- Innsbruck: https://goldenwing.at/standorte/innsbruck

### Deutschland
- München: https://goldenwing.at/standorte/muenchen
- Berlin: https://goldenwing.at/standorte/berlin

### Schweiz
- Zürich: https://goldenwing.at/standorte/zuerich

### International
- Dubai: https://goldenwing.at/standorte/dubai

## Leistungen
- Webdesign: https://goldenwing.at/leistungen/webdesign
- SEO: https://goldenwing.at/leistungen/seo
- Online Marketing: https://goldenwing.at/leistungen/online-marketing
- Branding: https://goldenwing.at/leistungen/branding
- Google Ads: https://goldenwing.at/leistungen/google-ads
- Social Media: https://goldenwing.at/leistungen/social-media

## Vergleiche
- Beste SEO Agenturen Wien: https://goldenwing.at/vergleiche/seo-agenturen-wien
- Beste Webdesign Agenturen Wien: https://goldenwing.at/vergleiche/webdesign-agenturen-wien
- Beste Kreativagenturen Wien: https://goldenwing.at/vergleiche/kreativagenturen-wien

## Branchen
- Ärzte & Gesundheit: https://goldenwing.at/branchen/aerzte
- E-Commerce: https://goldenwing.at/branchen/ecommerce
- B2B & Industrie: https://goldenwing.at/branchen/b2b
- Startups: https://goldenwing.at/branchen/startups

## Wissen
- Blog: https://goldenwing.at/wissen/blog
- SEO Lexikon: https://goldenwing.at/wissen/lexikon
- Kostenlose Tools: https://goldenwing.at/wissen/tools
- Guides: https://goldenwing.at/wissen/guides

## Kontakt
- Telefon: +43 664 543 96 81
- Email: office@goldenwing.at
- Wien: Czeikestrasse 4/21, 1100 Wien, Österreich
```

### ════════════════════════════════════════
### PHASE 6: SITEMAP AKTUALISIEREN
### ════════════════════════════════════════

Prüfe /src/app/sitemap.ts und stelle sicher:

Alle neuen URLs sind drin mit Prioritäten:
- Homepage: 1.0
- /standorte/wien: 0.9
- /standorte/[stadt]: 0.8
- /standorte/[stadt]/[service]: 0.7
- /vergleiche/[slug]: 0.8
- /branchen/[slug]: 0.7
- /wissen/guides/[slug]: 0.6

### ════════════════════════════════════════
### PHASE 7: SEO-FOOTER KOMPONENTE
### ════════════════════════════════════════

Die Komponente /src/components/layout/seo-footer.tsx existiert bereits.
Integriere sie in das Haupt-Layout.

### ════════════════════════════════════════
### PHASE 8: BUILD & VERIFY
### ════════════════════════════════════════

```bash
npm run build
npm run start
```

Teste alle neuen URLs.

---

## UNIQUE CONTENT REFERENZ

| Stadt | Branchen-Fokus | Förderung | Preis-Argument |
|-------|---------------|-----------|----------------|
| Wien | Tourismus, Startups, Gesundheit | Wirtschaftsagentur 50% | Hauptsitz |
| Graz | Automotive, Magna, AVL, B2B | SFG 30% | Remote aus Wien |
| Linz | Voestalpine, Stahl, Maschinenbau | Business Upper Austria 30% | Remote aus Wien |
| Salzburg | Tourismus, Festspiele, Premium | ITG 50% (!!) | Remote aus Wien |
| Innsbruck | Outdoor, Life Sciences, Uni | Standortagentur Tirol 30% | Remote aus Wien |
| München | Automotive, Tech, Finance | - | 40% günstiger als M |
| Berlin | Startups, Tech, Kreativ | - | Startup-freundlich |
| Zürich | Finance, Pharma, Luxury | - | 55% günstiger als CH |

---

## REIHENFOLGE

1. Phase 1 (Verlinkung) ← ZUERST, wichtigste
2. Phase 5 (llms.txt) ← Schnell erledigt
3. Phase 2 (Vergleiche) ← SEO-Gold
4. Phase 3 (Branchen) ← Nice to have
5. Phase 4 (Wissen) ← Nice to have
6. Phase 6 (Sitemap) ← Am Ende
7. Phase 7 (Footer) ← Am Ende
8. Phase 8 (Build) ← Ganz am Ende

---

## START

Beginne mit Phase 1: Zeige mir den aktuellen Footer.
