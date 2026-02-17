# 🛡️ GOLDENWING CONTENT GUARDRAILS

> **Zweck:** Schutz vor Doorway Pages, Duplicate Content & Keyword-Kannibalisierung
> **Gilt für:** Alle Seiten im neuen Hub-and-Spoke Modell
> **Pflicht:** VOR jeder neuen Seite diese Checkliste durchgehen

---

## 🚨 DIE 3 TÖDLICHEN SEO-SÜNDEN

| Sünde | Was passiert | Google-Strafe |
|-------|-------------|---------------|
| **Doorway Pages** | Stadt-Seiten nur mit ausgetauschtem Ortsnamen | Manual Action / De-Index |
| **Duplicate Content** | >65% identischer Text zwischen Seiten | Ranking-Verlust, Crawl-Budget-Verschwendung |
| **Keyword-Kannibalisierung** | 2+ Seiten zielen auf gleiches Keyword | Beide Seiten ranken schlecht |

---

## 📋 MASTER-GUARDRAILS

### Guardrail 1: Unique Content Minimum

```
REGEL: Jede Stadt-Service-Seite braucht:
├── ≥ 35% unique Textanteil (nicht nur Stadt austauschen!)
├── ≥ 1 lokales Proof-Element (Case/Referenz/Partner aus der Region)
└── ≥ 1 lokaler FAQ-Block (stadt-spezifische Fragen)
```

**Test:** Wenn du "Wien" durch "Graz" ersetzt und der Text noch Sinn macht → FAIL

### Guardrail 2: Cross-Linking Limits

```
REGEL: Verhindert "Link-Farm"-Look

Service-Seiten (/leistungen/):
├── Max 2-3 Städte verlinken
├── NICHT: "Webdesign in Wien, Graz, Linz, Salzburg, Innsbruck, München..."
└── SONDERN: "Auch in Wien und München verfügbar"

Standort-Service (/standorte/wien/webdesign/):
├── Max 1 Vergleichsseite
├── Max 1 Service-Hub
├── Max 2 Stadt-Siblings (andere Services in Wien)
└── KEIN Städte-Megamenü im Footer

Standort-Hubs (/standorte/wien/):
├── Nur eigene Stadt-Services listen
├── KEINE "Alle Standorte"-Übersicht
└── KEIN Footer mit 20+ Städte-Links
```

### Guardrail 3: Keyword-Owner-Regel

```
REGEL: 1 Keyword = 1 Owner (exact match in Title + H1)

"Webdesign Wien"                    → /standorte/wien/webdesign/      ✅ OWNER
"Beste Webdesign Agenturen Wien"    → /vergleiche/webdesign-agenturen-wien/  ✅ OWNER
"Webdesign Agentur"                 → /leistungen/webdesign/          ✅ OWNER

VERBOTEN: /leistungen/webdesign/ darf NICHT "Webdesign Wien" im Title haben!
```

---

## 📄 SEITENTYP 1: SERVICE-SEITEN `/leistungen/[service]/`

### Risiken

| Risiko | Beschreibung | Vermeidung |
|--------|-------------|------------|
| **A) Kannibalisierung** | Service-Seite bedient "Wien" stark → verwischt Signal | Keine Stadt im Title/H1/Meta |
| **B) Zu generisch** | Standard-BlaBla ohne Proof | Cases + Methodik + Grenzen |
| **C) Standort-Farm** | 10+ Städte verlinkt | Max 2-3 Städte-Links |

### Pflicht-Content-Module

```
/leistungen/webdesign/ MUSS enthalten:

1. POSITIONIERUNG (1 klarer Satz)
   ├── Für wen: "Für B2B Tech-Unternehmen, die..."
   └── Differenzierung: "Wir fokussieren auf Performance, nicht nur Optik"

2. MINI-CASES (1-2 Stück)
   ├── Format: Ausgangslage → Lösung → Ergebnis
   ├── Messbar: "+180% Conversions", "4.2s → 1.1s Ladezeit"
   └── NICHT: "Kunde war zufrieden"

3. METHODIK (echte Details)
   ├── Tools: Figma, Next.js, Lighthouse, Hotjar
   ├── Prozess: Discovery → Design → Development → QA → Launch
   └── QA: "Wir testen auf 12 Geräten vor Launch"

4. LEISTUNGSGRENZEN (was ihr NICHT macht)
   ├── Beispiel: "Keine Baukasten-Websites"
   ├── Beispiel: "Kein reines Template-Customizing"
   └── Macht glaubwürdig!

5. FAQ (echte Kauf-Fragen)
   ├── NICHT: "Was ist Webdesign?"
   ├── SONDERN: "Was passiert, wenn mir das Design nicht gefällt?"
   ├── SONDERN: "Wie läuft die Zusammenarbeit ab?"
   └── SONDERN: "Was braucht ihr von mir vor Projektstart?"
```

### Checkliste (vor Publish)

- [ ] H1 rein generisch, OHNE Stadt
- [ ] Title ohne Stadt: "[Service] Agentur | GoldenWing"
- [ ] City-Keywords nur als interne Links, nicht als Text-Fokus
- [ ] Max 2-3 interne Links zu Standorten
- [ ] Min 1 Case mit messbarem Ergebnis
- [ ] Min 1 Testimonial oder Logo
- [ ] Schema: Service + FAQPage + BreadcrumbList
- [ ] KEINE Fake-Ratings (nur echte Reviews verwenden)

---

## 📄 SEITENTYP 2: STANDORT-HUBS `/standorte/[stadt]/`

### Risiken

| Risiko | Beschreibung | Vermeidung |
|--------|-------------|------------|
| **A) Doorway Page** | Nur "Wir bieten X in Stadt Y" | 30-40% stadt-spezifischer Content |
| **B) Duplicate** | Gleiche Absätze, nur Stadt ausgetauscht | Lokale Proof-Punkte |

### Pflicht-Content-Module

```
/standorte/wien/ MUSS enthalten:

1. LOKALE PROOF-PUNKTE
   ├── Kunden aus Wien: "Wir betreuen 15+ Unternehmen in Wien"
   ├── Projekte: "Darunter [Firma X] und [Firma Y]"
   └── Oder: "Remote-First, aber regelmäßige Workshops in Wien"

2. LOKALES BRANCHENPROFIL
   ├── 3-5 Branchen, die in Wien stark sind
   ├── Beispiel Wien: "Tourismus, Startups, Kreativwirtschaft"
   ├── Beispiel Graz: "Automotive, Tech-Startups, Industrie"
   └── WARUM ihr für diese Branchen passt

3. TEAM/ANSPRECHPARTNER
   ├── Echtes Gesicht + Name
   ├── "Ihr Ansprechpartner für Wien: [Name]"
   └── Auch wenn remote: Zuständigkeit klar machen

4. LOKALE FAQ
   ├── Anfahrt/Meeting-Options
   ├── Workshops vor Ort möglich?
   ├── Förderungen in der Region (Wien: Wirtschaftsagentur)
   └── Zeitzonen (für Dubai!)

5. LOKALES WORK-MODELL
   ├── "Vor Ort / Remote / Hybrid"
   ├── Konkret: "Kickoff-Workshop in Wien, danach remote"
   └── Meeting-Frequenz: "Wöchentliche Video-Calls"
```

### Checkliste (vor Publish)

- [ ] 30-40% Text ist stadt-spezifisch (nicht austauschbar!)
- [ ] Min 3 lokale Proof-Punkte (Kunden/Projekte/Partner)
- [ ] Lokale Branchen genannt
- [ ] Ansprechpartner mit Gesicht
- [ ] 3 interne Links auf Stadt-Services
- [ ] 1 Link auf Referenzen-Filter (?filter=wien)
- [ ] KEIN "Alle Städte"-Footer-Linkblock
- [ ] Schema: LocalBusiness nur wenn echte NAP (Name, Address, Phone)

### Unique-Test

**Ersetze "Wien" durch "Graz" im Text:**
- Macht der Text noch Sinn? → ❌ FAIL → Mehr lokale Details
- Macht der Text keinen Sinn mehr? → ✅ PASS

---

## 📄 SEITENTYP 3: STANDORT-SERVICE-SEITEN `/standorte/[stadt]/[service]/`

### ⚠️ HÖCHSTES RISIKO - Diese Seiten sind am gefährlichsten!

### Risiken

| Risiko | Beschreibung | Vermeidung |
|--------|-------------|------------|
| **A) Kannibalisierung** | "beste"/"top" spielt → greift /vergleiche/ vor | Intent sauber trennen |
| **B) Duplicate-Templates** | Google erkennt Muster sofort | 35%+ unique pro Seite |
| **C) NAP-Chaos** | Dubai/USA/AT vermischt | Nur lokale NAP |

### Pflicht-Content-Module

```
/standorte/wien/webdesign/ MUSS enthalten:

1. LOKALES PROBLEM-SZENARIO
   ├── Wien-spezifisch: "In Wien konkurriert ihr mit 200+ Agenturen"
   ├── Wien-spezifisch: "Wiener Kunden erwarten Qualität, nicht billig"
   ├── Graz-spezifisch: "Graz: Tech-Hub, aber Design oft vernachlässigt"
   └── Dubai-spezifisch: "UAE: Englisch + Arabisch + schnelle Deadlines"

2. LOKALE LEISTUNGSAUSPRÄGUNG
   ├── Was macht ihr in Wien häufiger?
   ├── Beispiel: "In Wien: Viele Startup-Launches, schnelle MVPs"
   ├── Beispiel Graz: "Mehr Industrie-Websites, komplexe Produktkonfiguratoren"
   └── NICHT: "Wir machen alles überall gleich"

3. LOKALES CASE-FRAGMENT
   ├── Auch mini, aber ECHT
   ├── Format: "[Firma aus Wien]: Von 0 auf 500 Leads/Monat"
   ├── Oder: "Wiener Startup [X]: Launch in 6 Wochen"
   └── NICHT: Generisches Case ohne Ortsbezug

4. LOKALE PACKAGES/PREISE (optional)
   ├── Nur wenn ihr dazu steht
   ├── "Webdesign Wien: ab €3.500"
   └── Oder: "Preise auf Anfrage" (ist auch OK)

5. VERGLEICHS-WEITERLEITUNG (Intent-Trennung!)
   ├── "Wenn du mehrere Agenturen vergleichen willst:"
   ├── → Link zu /vergleiche/webdesign-agenturen-wien/
   └── Trennt transactional von informational Intent
```

### Checkliste (vor Publish)

- [ ] H1 = "[Service] [Stadt]" (exakt, z.B. "Webdesign Wien")
- [ ] Min 5 Absätze, die NUR für diese Stadt passen
- [ ] Lokales Problem-Szenario beschrieben
- [ ] Min 1 lokales Case-Fragment
- [ ] Interne Links: 1× Service-Hub, 2× Stadt-Siblings, 1× Vergleichsseite
- [ ] Schema: Service + LocalBusiness + FAQPage
- [ ] Offer/AggregateOffer nur wenn Preise plausibel
- [ ] KEINE "beste"/"top"-Formulierungen (das ist /vergleiche/ Intent!)

### Unique-Test

**35% Unique Content Test:**
```
Gesamttext: 1000 Wörter
Davon unique (nur Wien): min 350 Wörter

Unique = Text, der nicht auf Graz/Linz/etc. passt
```

---

## 📄 SEITENTYP 4: VERGLEICHSSEITEN `/vergleiche/[service]-[stadt]/`

### Risiken

| Risiko | Beschreibung | Vermeidung |
|--------|-------------|------------|
| **A) Self-serving** | GoldenWing #1 ohne echte Kriterien | Transparente Methodik |
| **B) Schema-Probleme** | Fake-Ratings → Rich Results weg | Nur verifizierbare Quellen |
| **C) Thin Content** | "Top 10" ohne Profile | Echte Agentur-Profile |

### Pflicht-Content-Module

```
/vergleiche/seo-agenturen-wien/ MUSS enthalten:

1. METHODIK-BOX (prominent!)
   ├── Kriterien: "Bewertet nach: Referenzen, Spezialisierung, Preistransparenz"
   ├── Gewichtung: "Referenzen 40%, Spezialisierung 30%, Preis 30%"
   ├── Datenbasis: "Basierend auf öffentlichen Infos, Stand: Feb 2026"
   └── Update-Datum: "Zuletzt aktualisiert: 05.02.2026"

2. AGENTUR-PROFILE (für JEDE der 10)
   ├── USP: "Spezialisiert auf..."
   ├── Fokus: "B2B / E-Commerce / Local"
   ├── Preisspanne: "ab €500/Monat" (wenn bekannt)
   ├── Idealer Fit: "Für mittelständische Unternehmen mit..."
   └── NICHT: Nur Name + "Gute Agentur"

3. KÄUFER-GUIDE
   ├── "So wählst du die richtige SEO Agentur"
   ├── Kriterien-Erklärung
   ├── Red Flags: "Vorsicht bei Garantien wie 'Platz 1 in 30 Tagen'"
   └── Briefing-Tipps

4. FAQ (Vergleichs-Intent)
   ├── "Was kostet SEO in Wien?"
   ├── "Wie lange dauert es bis zu Ergebnissen?"
   ├── "Brauche ich einen langen Vertrag?"
   ├── "Was muss ich der Agentur liefern?"
   └── "Wem gehören die Rankings nach Vertragsende?"
```

### Checkliste (vor Publish)

- [ ] H1 mit Jahr: "Beste [Service] Agenturen [Stadt] 2026"
- [ ] Methodik-Box sichtbar (oberhalb der Liste)
- [ ] "Last updated" Datum im Content
- [ ] Jede Agentur: Name, USP, Fokus, Preis (wenn bekannt), Idealer Fit
- [ ] GoldenWing als #1 → aber mit echten Gründen
- [ ] CTA zu eigenen Services → aber nicht überall dominant
- [ ] Käufer-Guide Section
- [ ] FAQ mit Vergleichs-Fragen
- [ ] Schema: ItemList + FAQPage
- [ ] KEINE Ratings ohne verifizierbare Quelle

### Glaubwürdigkeits-Test

**Würde ein Journalist das als "objektiv" bezeichnen?**
- Ja → ✅ PASS
- "Das ist offensichtlich Eigenwerbung" → ❌ FAIL

---

## 📄 SEITENTYP 5: BRANCHEN-SEITEN `/branchen/[branche]/[service]/`

### Risiken

| Risiko | Beschreibung | Vermeidung |
|--------|-------------|------------|
| **A) Doppel-Intent** | Wie Service-Seite, nur "für Ärzte" angehängt | Branchen-spezifische Szenarien |
| **B) Zu theoretisch** | Keine konkreten Use-Cases | Regulatorik + KPIs + Beispiele |

### Pflicht-Content-Module

```
/branchen/aerzte/seo/ MUSS enthalten:

1. BRANCHEN-USE-CASES (3-4 konkret)
   ├── "Zahnarzt will mehr Implantologie-Patienten"
   ├── "Physiotherapie will Selbstzahler gewinnen"
   ├── "Klinik will Fachärzte rekrutieren"
   └── NICHT: "Ärzte brauchen SEO"

2. REGULATORIK/CONSTRAINTS
   ├── Heilmittelwerbegesetz (DE/AT)
   ├── Berufsordnung (keine Werbung für bestimmte Behandlungen)
   ├── Datenschutz (Patientendaten!)
   ├── Claims: Was darf man sagen, was nicht?
   └── "Wir kennen die Grenzen und arbeiten compliant"

3. BRANCHEN-KPIS
   ├── Leads → Terminbuchungen
   ├── Calls (Tracking wichtig!)
   ├── Directions (Google Maps)
   ├── CAC (Cost per Acquired Patient)
   └── NICHT: "Mehr Traffic" (zu generisch)

4. BRANCHEN-ASSETS
   ├── Beispiel-Seitenstruktur für Praxis-Website
   ├── Beispiel-Landingpage (Screenshot/Wireframe)
   ├── Beispiel-Anzeige (Google Ads für Ärzte)
   └── Checkliste: "SEO für Ärzte in 10 Schritten"

5. WAS NICHT FUNKTIONIERT
   ├── "Billige Stockfotos von lächelnden Ärzten"
   ├── "Zu viel Fachsprache"
   ├── "Keine Online-Terminbuchung"
   └── Macht TRUST
```

### Checkliste (vor Publish)

- [ ] H1 = "[Service] für [Branche]" (z.B. "SEO für Ärzte")
- [ ] Min 3 konkrete Use-Cases
- [ ] Regulatorik/Constraints erwähnt
- [ ] Branchen-KPIs definiert
- [ ] Min 1 Asset (Beispiel/Template/Checkliste)
- [ ] Section "Was NICHT funktioniert"
- [ ] Interne Links: Service + 1-2 Standorte + 1 Case
- [ ] Schema: Service + FAQPage + BreadcrumbList

### Expertise-Test

**Würde ein Arzt das als "die verstehen meine Branche" empfinden?**
- Ja → ✅ PASS
- "Das könnte jede Agentur schreiben" → ❌ FAIL

---

## 📄 SEITENTYP 6: WISSEN-SEITEN `/wissen/...`

### Risiken

| Risiko | Beschreibung | Vermeidung |
|--------|-------------|------------|
| **A) Kannibalisierung** | "SEO Kosten" = Pricing-Section der Service-Seite | Klare Intent-Trennung |
| **B) AI-Generic** | Generischer Content ohne Mehrwert | Echte Beispiele + Rechenmodelle |

### Pflicht-Content-Module

```
/wissen/guides/seo-kosten/ MUSS enthalten:

1. ECHTE BEISPIELE & RECHENMODELLE
   ├── "Was kostet SEO? Rechenbeispiel:"
   ├── Beispiel 1: "Lokales Business, 3 Keywords → €590/Mo"
   ├── Beispiel 2: "E-Commerce, 50 Keywords → €1.990/Mo"
   ├── Beispiel 3: "Einmaliger SEO-Audit → €1.500"
   └── NICHT: "SEO kostet zwischen €500 und €10.000"

2. SCREENSHOTS/FRAMEWORKS
   ├── Checkliste: "Was ist in einem SEO-Paket enthalten?"
   ├── Timeline: "Was passiert in Monat 1, 3, 6, 12?"
   ├── Template: "SEO-Budget-Rechner"
   └── Visuals machen unique

3. HARSH TRUTHS
   ├── "Wann sich SEO NICHT lohnt"
   ├── "Wenn Budget < €500/Mo → DIY besser"
   ├── "Wenn Markt zu klein → Paid Ads effizienter"
   └── Macht TRUST

4. STARKE INTERNE LINKS
   ├── 1× Service: /leistungen/seo/
   ├── 1× Standort: /standorte/wien/seo/
   ├── 1× Case: /referenzen/[seo-projekt]/
   └── Führt Leser weiter im Funnel
```

### Checkliste (vor Publish)

- [ ] Informational Intent (nicht Commercial!)
- [ ] Echte Zahlen/Rechenmodelle
- [ ] Min 1 Visual (Checkliste/Timeline/Screenshot)
- [ ] "Harsh Truth" Section
- [ ] "Next Step" CTA: Beratung/Check/Tool
- [ ] FAQ nur wenn neue Longtails abgedeckt werden
- [ ] Schema: Article + Person (Author)
- [ ] Author mit Foto + Bio + LinkedIn

### Unique-Test

**Würde jemand das bookmarken oder teilen?**
- Ja → ✅ PASS
- "Das steht überall" → ❌ FAIL

---

## 🔍 PRE-PUBLISH QUALITY GATE

### Jede neue Seite muss durch:

```
┌─────────────────────────────────────────────────────┐
│                QUALITY GATE CHECKLIST               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  □ 1. Keyword-Owner geprüft                        │
│     → Gibt es bereits eine Seite für dieses KW?    │
│                                                     │
│  □ 2. Unique Content Test bestanden                │
│     → 35%+ unique bei Stadt-Service-Seiten         │
│                                                     │
│  □ 3. Cross-Link Limit eingehalten                 │
│     → Max 2-3 Städte auf Service-Seiten            │
│                                                     │
│  □ 4. Schema korrekt                               │
│     → Passend zum Seitentyp, keine Fake-Ratings    │
│                                                     │
│  □ 5. Intent-Trennung klar                         │
│     → Informational vs. Commercial vs. Comparison  │
│                                                     │
│  □ 6. Seitentyp-Checkliste erfüllt                │
│     → Alle Pflicht-Module vorhanden                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📊 KEYWORD-OWNER MATRIX

### Wien (Beispiel)

| Keyword | Owner-Seite | Andere Seiten dürfen... |
|---------|-------------|------------------------|
| "Webdesign Wien" | `/standorte/wien/webdesign/` | Nur verlinken, nicht targeten |
| "SEO Agentur Wien" | `/standorte/wien/seo/` | Nur verlinken, nicht targeten |
| "Beste Webdesign Agenturen Wien" | `/vergleiche/webdesign-agenturen-wien/` | Nur verlinken |
| "Webdesign Agentur" | `/leistungen/webdesign/` | Keine Stadt im Title! |
| "Webdesign Preise" | `/wissen/guides/webdesign-preise/` | Service-Seite darf Preise zeigen, aber nicht KW targeten |

### Verbotene Kombinationen

```
❌ VERBOTEN:
├── /leistungen/webdesign/ mit Title "Webdesign Wien"
├── /standorte/wien/webdesign/ mit "beste" oder "top" im Text
├── /vergleiche/webdesign-agenturen-wien/ ohne Methodik-Box
└── /wissen/guides/webdesign-preise/ identisch mit Pricing auf Service-Seite
```

---

## 🚦 AMPEL-SYSTEM FÜR CONTENT-REVIEW

### 🟢 GRÜN = Publish Ready

- Alle Checklisten erfüllt
- Unique Content Test bestanden
- Keyword-Owner bestätigt
- Schema validiert

### 🟡 GELB = Needs Work

- 1-2 Punkte fehlen
- Unique Content knapp unter 35%
- Minor Schema-Fehler

### 🔴 ROT = Do Not Publish

- Doorway-Page Risiko
- Keyword-Kannibalisierung
- <20% Unique Content
- Fake-Ratings oder unsauberes Schema

---

*Content Guardrails v1.0*
*Februar 2026*
*Für: GoldenWing Creative Studios*
