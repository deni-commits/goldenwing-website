# 🎯 REVIDIERTE STANDORT-STRATEGIE

> **Erkenntnis:** GoldenWing hat nur in Wien + Dubai echte lokale Assets
> **Konsequenz:** Strategie muss angepasst werden, um Doorway Pages zu vermeiden

---

## ⚠️ DAS PROBLEM

**Ursprünglicher Plan:**
```
/standorte/wien/        ✅ Echte Assets
/standorte/graz/        ❌ Keine echten Assets
/standorte/linz/        ❌ Keine echten Assets
/standorte/salzburg/    ❌ Keine echten Assets
/standorte/innsbruck/   ❌ Keine echten Assets
/standorte/muenchen/    ❌ Keine echten Assets
/standorte/berlin/      ❌ Keine echten Assets
/standorte/zuerich/     ❌ Keine echten Assets
/standorte/dubai/       ✅ Echte Assets
```

**Risiko:** 8 von 10 Städten hätten keinen echten lokalen Content → **DOORWAY PAGES**

---

## ✅ REVIDIERTE STRATEGIE

### Tier 1: Vollständige Stadt-Hubs (echte Assets)

| Stadt | Status | Content-Tiefe |
|-------|--------|---------------|
| **Wien** | ✅ Büro + Kunden | Vollständig: Hub + alle Services |
| **Dubai** | ✅ Büro + Kunden | Vollständig: Hub + alle Services |

**Diese bekommen:**
- Stadt-Hub Seite (`/standorte/wien/`)
- Alle Service-Unterseiten (`/standorte/wien/webdesign/`, etc.)
- Voller lokaler Content (Cases, FAQ, Ansprechpartner)

---

### Tier 2: Länder-Hubs statt Stadt-Seiten

**STATT:**
```
/standorte/graz/
/standorte/linz/
/standorte/salzburg/
/standorte/innsbruck/
```

**BESSER:**
```
/standorte/oesterreich/
```

**STATT:**
```
/standorte/muenchen/
/standorte/berlin/
/standorte/hamburg/
/standorte/frankfurt/
```

**BESSER:**
```
/standorte/deutschland/
```

**STATT:**
```
/standorte/zuerich/
```

**BESSER:**
```
/standorte/schweiz/
```

---

## 📐 NEUE STRUKTUR

```
/standorte/                          ← Hub (Übersicht aller Märkte)
│
├── /standorte/wien/                 ← TIER 1: Vollständig
│   ├── /webdesign/
│   ├── /seo/
│   ├── /branding/
│   ├── /google-ads/
│   └── /kreativagentur/
│
├── /standorte/dubai/                ← TIER 1: Vollständig
│   ├── /webdesign/
│   ├── /seo/
│   ├── /branding/
│   ├── /digital-marketing/
│   └── /ecommerce/
│
├── /standorte/oesterreich/          ← TIER 2: Länder-Hub
│   ├── Kein City-Split
│   └── "Remote-Betreuung aus Wien für ganz Österreich"
│
├── /standorte/deutschland/          ← TIER 2: Länder-Hub
│   ├── Kein City-Split
│   └── "DACH-Expertise aus Wien"
│
└── /standorte/schweiz/              ← TIER 2: Länder-Hub
    ├── Kein City-Split
    └── "Schweizer Kunden, Wiener Qualität"
```

---

## 📝 CONTENT FÜR TIER 2 (LÄNDER-HUBS)

### `/standorte/oesterreich/` - Ehrlicher Ansatz

```markdown
# Digitalagentur für ganz Österreich

**Unser Hauptsitz ist in Wien, aber wir betreuen Kunden in ganz Österreich.**

## Wie wir mit österreichischen Kunden außerhalb Wiens arbeiten

**Kickoff:**
- Video-Call oder wir kommen zu Ihnen (Graz, Linz, Salzburg – kein Problem)
- Persönliches Kennenlernen ist uns wichtig

**Laufende Zusammenarbeit:**
- Wöchentliche Video-Updates
- Shared Workspace für Feedback
- Schnelle Reaktionszeiten (gleiche Zeitzone!)

**Bei Bedarf:**
- Workshops vor Ort
- Präsentationen bei Ihnen im Haus

## Warum eine Wiener Agentur für Ihr Bundesland?

**Qualitätsstandard:** Wien hat die höchste Agenturdichte – wir müssen gut sein, um zu bestehen.

**Preis-Leistung:** Oft günstiger als lokale Einzelkämpfer, aber mit mehr Ressourcen.

**Netzwerk:** Zugang zu Spezialisten für Fotografie, Video, Development.

## Branchen-Expertise in Österreich

Wir verstehen die regionalen Unterschiede:

| Region | Branchen-Fokus |
|--------|----------------|
| Steiermark | Automotive, Tech, Industrie |
| Oberösterreich | Stahl, Maschinenbau, Logistik |
| Salzburg | Tourismus, Einzelhandel, Events |
| Tirol | Wintersport, Outdoor, Tourismus |
| Kärnten | Tourismus, Elektronik |
| Vorarlberg | Textil, Industrie, Export |

## Förderungen in den Bundesländern

Jedes Bundesland hat eigene Digitalisierungsförderungen:
- **Wien:** Wirtschaftsagentur Wien
- **Steiermark:** SFG
- **Oberösterreich:** Business Upper Austria
- **Salzburg:** ITG Salzburg
- [etc.]

Wir beraten Sie gerne, welche Förderung für Ihr Projekt passt.

## Projekte außerhalb Wiens

[Hier 2-3 Projekte auflisten, die NICHT aus Wien sind – auch wenn remote betreut]
```

**WICHTIG:** Keine Stadt-spezifischen Keywords targeten!
- ❌ NICHT: "Webdesign Graz"
- ✅ SONDERN: "Webdesign für österreichische Unternehmen"

---

### `/standorte/deutschland/` - Ehrlicher Ansatz

```markdown
# Digitalagentur für deutsche Unternehmen

**GoldenWing ist eine österreichische Agentur mit DACH-Expertise.**

## Warum deutsche Kunden mit uns arbeiten

1. **Gleiche Sprache, gleiche Qualität** – Kein Offshore-Risiko
2. **Oft günstiger** als München/Berlin-Agenturen bei gleicher Qualität
3. **Persönliche Betreuung** statt Großagentur-Anonymität
4. **DSGVO-Expertise** gilt in AT genauso streng

## Wie wir mit deutschen Kunden arbeiten

**Kickoff:**
- Video-Call (90% der Projekte)
- Oder: Wir kommen nach Deutschland (für größere Projekte)

**Laufend:**
- Wöchentliche Video-Updates
- Deutsche Geschäftszeiten (gleiche Zeitzone)
- Schnelle Reaktion

**Rechnungsstellung:**
- In EUR
- Reverse Charge (innergemeinschaftlich)

## Deutsche Kunden, die wir betreuen

[2-3 deutsche Kunden/Cases – auch wenn remote]

## FAQ für deutsche Kunden

**Ist eine österreichische Agentur günstiger?**
Oft ja. Die Kostenstruktur in Wien ist niedriger als in München oder Berlin.

**Wie läuft das mit der Umsatzsteuer?**
Reverse Charge – Sie zahlen netto, wir weisen keine österreichische USt aus.

**Können wir uns persönlich treffen?**
Ja. Für Kickoffs oder wichtige Präsentationen kommen wir nach Deutschland.
```

---

## 🔄 KEYWORD-STRATEGIE (ANGEPASST)

### Welche Keywords targeten?

| Keyword | Seite | Machbar? |
|---------|-------|----------|
| "Webdesign Wien" | `/standorte/wien/webdesign/` | ✅ Ja (echte Assets) |
| "SEO Agentur Wien" | `/standorte/wien/seo/` | ✅ Ja (echte Assets) |
| "Web Design Dubai" | `/standorte/dubai/webdesign/` | ✅ Ja (echte Assets) |
| "Webdesign Graz" | ❌ NICHT TARGETEN | ❌ Keine echten Assets |
| "Webdesign Linz" | ❌ NICHT TARGETEN | ❌ Keine echten Assets |
| "Webdesign München" | ❌ NICHT TARGETEN | ❌ Keine echten Assets |
| "Webdesign Österreich" | `/standorte/oesterreich/` | ✅ Als Länder-Hub |
| "Agentur Deutschland" | `/standorte/deutschland/` | ✅ Als Länder-Hub |

### Was ist mit den lokalen Keywords?

**Ehrliche Antwort:** Ohne echte lokale Präsenz solltet ihr diese Keywords nicht aggressiv targeten.

**Alternativen:**
1. **Blog-Posts:** "Webdesign Tipps für Grazer Unternehmen" (informational)
2. **Vergleichsseiten:** "Beste Webdesign Agenturen Graz" (ihr seid nicht #1, aber verlinkt)
3. **Warten:** Wenn ihr Kunden in Graz gewinnt → dann Stadt-Seite erstellen

---

## 📊 VERGLEICH: ALT VS. NEU

### Alt (Risiko: Doorway Pages)

| Seiten | Echter Content | Risiko |
|--------|---------------|--------|
| 10 Stadt-Hubs | 2 von 10 | 🔴 HOCH |
| 50+ Stadt-Service-Seiten | 10 von 50 | 🔴 HOCH |
| Gesamt: ~60 Seiten | 12 mit echtem Content | 80% Doorway-Risiko |

### Neu (Sicher)

| Seiten | Echter Content | Risiko |
|--------|---------------|--------|
| 2 Stadt-Hubs (Wien, Dubai) | 2 von 2 | 🟢 KEIN |
| 3 Länder-Hubs (AT, DE, CH) | 3 von 3 (ehrlich) | 🟢 KEIN |
| ~15 Stadt-Service-Seiten | 15 von 15 | 🟢 KEIN |
| Gesamt: ~20 Seiten | 20 mit echtem Content | 0% Doorway-Risiko |

**Weniger Seiten, aber alle ECHT = besseres Ranking**

---

## 🎯 EMPFEHLUNG

### Sofort umsetzen:

1. **Wien vollständig ausbauen**
   - Hub + 5-6 Service-Seiten
   - Alle echten Cases nutzen
   - Ansprechpartner: Deni

2. **Dubai vollständig ausbauen**
   - Hub + 5 Service-Seiten
   - Büro-Infos nutzen
   - UAE-Markt-Expertise zeigen

3. **Länder-Hubs erstellen (ehrlich)**
   - `/standorte/oesterreich/` → "Remote aus Wien"
   - `/standorte/deutschland/` → "DACH-Expertise"
   - `/standorte/schweiz/` → "Schweizer Kunden"

### NICHT umsetzen:

1. ❌ Keine Graz/Linz/Salzburg/Innsbruck Stadt-Seiten
2. ❌ Keine München/Berlin/Frankfurt Stadt-Seiten
3. ❌ Keine Zürich Stadt-Seite

### Später (wenn echte Assets vorhanden):

Sobald ihr echte Kunden in einer Stadt habt:
1. Case dokumentieren
2. Lokalen Ansprechpartner benennen
3. DANN Stadt-Seite erstellen

---

## 💡 ALTERNATIVEN FÜR LOKALE KEYWORDS

Wie könnt ihr trotzdem für "Webdesign Graz" ranken?

### Option 1: Vergleichsseite

```
/vergleiche/webdesign-agenturen-graz/

"Die besten Webdesign Agenturen in Graz"

1. [Lokale Grazer Agentur]
2. [Lokale Grazer Agentur]
3. GoldenWing (Wien) – "Auch für Grazer Unternehmen"
...
```

→ Ihr seid nicht #1, aber ihr taucht auf + ihr verlinkt zu euch

### Option 2: Blog-Post

```
/wissen/blog/webdesign-tipps-fuer-grazer-unternehmen/

"Webdesign für Grazer Unternehmen: Worauf achten?"

- Lokale Besonderheiten (Industrie, Automotive)
- Tipps für die Agenturwahl
- Am Ende: "Wir betreuen auch Grazer Unternehmen – remote aus Wien"
```

→ Informational Intent, aber mit Conversion-Möglichkeit

### Option 3: Google Ads

Für Keywords ohne organische Präsenz:
- Google Ads auf "Webdesign Graz"
- Landing Page: `/standorte/oesterreich/?city=graz`
- Ehrliche Message: "Wiener Qualität für Grazer Unternehmen"

---

## ✅ FINALE STRUKTUR (SAUBER)

```
/standorte/
│
├── /standorte/wien/                 ✅ VOLLSTÄNDIG
│   ├── /webdesign/                  ✅ Echte Cases
│   ├── /seo/                        ✅ Echte Cases
│   ├── /branding/                   ✅ Echte Cases
│   ├── /google-ads/                 ✅ Echte Cases
│   └── /kreativagentur/             ✅ Echte Cases
│
├── /standorte/dubai/                ✅ VOLLSTÄNDIG
│   ├── /webdesign/                  ✅ Büro + Markt
│   ├── /seo/                        ✅ Büro + Markt
│   ├── /branding/                   ✅ Büro + Markt
│   └── /digital-marketing/          ✅ Büro + Markt
│
├── /standorte/oesterreich/          ✅ EHRLICH
│   └── "Remote aus Wien für ganz AT"
│
├── /standorte/deutschland/          ✅ EHRLICH
│   └── "DACH-Expertise für DE"
│
└── /standorte/schweiz/              ✅ EHRLICH
    └── "Schweizer Kunden willkommen"

GESAMT: 15 Seiten, alle mit echtem Content
```

---

## 📈 LANGFRISTIGE STRATEGIE

### Jahr 1 (jetzt):
- Wien + Dubai vollständig
- 3 Länder-Hubs
- Keine Fake-Stadt-Seiten

### Jahr 2 (wenn Wachstum):
- Kunde in Graz gewonnen? → Graz-Seite erstellen
- Kunde in München gewonnen? → München-Seite erstellen
- Organisch wachsen statt Doorway-Spam

### Jahr 3+:
- Evtl. echtes Büro in München/Berlin?
- Dann vollständige Deutschland-Präsenz

---

*Revidierte Standort-Strategie v1.0*
*Februar 2026*
*Basierend auf: Nur Wien + Dubai haben echte Assets*
