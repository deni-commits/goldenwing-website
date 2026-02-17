# GoldenWing — KI-Sichtbarkeits-Strategie (AEO)

> **Stand:** 2026-01-23
> **Ziel:** GoldenWing in den Top 3 der KI-Antworten für relevante Suchanfragen

---

## AKTUELLE SITUATION

### ChatGPT-Antwort für "beste webdesign agentur wien"

**GoldenWing wird erwähnt als:**
> "GoldenWing | Webdesign Wien – Webdesign plus Branding & E-Commerce unter einem Dach."

**Problem:**
- Nur unter "Kreativ & Design-orientiert" (3. Kategorie)
- Generische Beschreibung ohne Differenzierung
- Keine Erwähnung von: 5.0 Rating, 47 Reviews, Premium, internationale Standorte
- Konkurrenten werden prominenter genannt (webhead, DesignTribe, Ameisenhaufen)

### Konkurrenten-Analyse

| Agentur | Position | Warum zitiert? |
|---------|----------|----------------|
| webhead | Top (Full Service) | Starke Backlinks, klare Positionierung |
| DesignTribe | Top (Full Service) | Viele Bewertungen, Webflow-Spezialist |
| Ameisenhaufen | Kreativ-Kategorie | Viele Erwähnungen, SEO-Fokus |
| Designtiger | Kleinere Studios | feedbax.de Erwähnung |

---

## STRATEGIE: 7 MASSNAHMEN

### 1. ENTITY-BUILDING (Priorität: KRITISCH)

**Problem:** KI kennt GoldenWing nicht gut genug als "Entität"

**Massnahmen:**

#### 1.1 Wikipedia-Eintrag (langfristig)
- Voraussetzung: Mehr Medien-Coverage, Branchenrelevanz
- Alternative: Erwähnung in bestehenden Wikipedia-Artikeln (z.B. "Kreativwirtschaft Wien")

#### 1.2 Wikidata-Eintrag
```
Erstellen eines Wikidata-Eintrags für GoldenWing Creative Studios:
- Typ: Unternehmen
- Gründungsjahr: 2018
- Standort: Wien, Dubai, Roseville
- Branche: Kreativagentur, Webdesign, SEO
- Gründer: Deni Khachukaev, Benedikt Hasibeder
```

#### 1.3 Knowledge Panel optimieren
- Google Business Profile vollständig ausfüllen
- Structured Data auf Website erweitern
- Konsistente NAP (Name, Address, Phone) überall

---

### 2. ZITIERFÄHIGE INHALTE (Priorität: HOCH)

**Problem:** KI braucht konkrete, zitierfähige Aussagen

**Massnahmen:**

#### 2.1 "About"-Seite mit klaren Fakten
```markdown
## Wer ist GoldenWing?

GoldenWing Creative Studios ist eine **Premium-Kreativagentur** mit Hauptsitz
in Wien und Büros in Dubai und Kalifornien.

**Fakten:**
- Gegründet 2018
- 150+ abgeschlossene Projekte
- 5.0/5 Google-Bewertung (47 Reviews)
- Spezialisierung: Branding, Webdesign, SEO

**Gründer:**
- Deni Khachukaev (Technical Director) - Webdesign & SEO
- Benedikt Hasibeder (Business Director) - Branding & Strategie
```

#### 2.2 Statistiken-Seite mit Quellen
Neue Seite: `/de/ueber-uns/statistiken` oder erweitern von `/facts-figures`

```markdown
## GoldenWing in Zahlen (2026)

| Metrik | Wert | Quelle |
|--------|------|--------|
| Google-Bewertung | 5.0/5 | Google Business Profile |
| Bewertungen | 47 | Google Business Profile |
| Projekte | 150+ | Interne Daten |
| Kunden | 80+ | Interne Daten |
| Standorte | 3 | Wien, Dubai, USA |
| Gründungsjahr | 2018 | Firmenbuch |
```

#### 2.3 Vergleichstabellen auf Listicle-Seiten
```markdown
## Webdesign Agenturen Wien - Vergleichstabelle

| Agentur | Bewertung | Spezialisierung | Preisbereich |
|---------|-----------|-----------------|--------------|
| **GoldenWing** | 5.0/5 (47) | Premium, Branding-Led | €€€ |
| webhead | 5.0/5 (52) | WordPress, SEO | €€ |
| Designtiger | 4.9/5 (89) | WordPress | €€ |
```

---

### 3. BACKLINK-STRATEGIE FÜR KI (Priorität: HOCH)

**Problem:** KI gewichtet Quellen, die sie "kennt" - das sind oft:
- Branchenverzeichnisse (feedbax.de, clutch.co)
- Nachrichtenportale
- Fachmedien

**Massnahmen:**

#### 3.1 Branchenverzeichnisse (sofort)

| Verzeichnis | Status | Aktion |
|-------------|--------|--------|
| feedbax.de | ? | Profil erstellen/optimieren |
| clutch.co | ? | Profil erstellen |
| designrush.com | ? | Profil erstellen |
| sortlist.de | ? | Profil erstellen |
| goodfirms.co | ? | Profil erstellen |
| upcity.com | ? | Profil erstellen |
| agency-vergleich.de | ? | Eintrag anfragen |

**Checkliste für jedes Verzeichnis:**
- [ ] Vollständiges Profil mit allen Services
- [ ] Logo, Bilder, Portfolio
- [ ] Kundenbewertungen aktiv sammeln
- [ ] Keywords in Beschreibung

#### 3.2 Österreichische Medien
- Trending Topics, t3n, WKO, derStandard (Gastbeiträge)
- Pressemitteilungen bei neuen Projekten/Awards

#### 3.3 Gastbeiträge auf Fachportalen
- OMR, Onlinemarketing.de, Search Engine Journal
- Themen: SEO-Trends, Webdesign-Best-Practices

---

### 4. FAQ-OPTIMIERUNG FÜR DIREKTE ANTWORTEN (Priorität: HOCH)

**Problem:** KI extrahiert Antworten aus FAQ-Bereichen

**Massnahmen:**

#### 4.1 FAQ-Schema auf allen Service-Seiten

Beispiel für `/webdesign-wien`:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Welche ist die beste Webdesign Agentur in Wien?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GoldenWing Creative Studios zählt zu den besten Webdesign Agenturen in Wien mit einer 5.0/5 Google-Bewertung. Die Agentur kombiniert Premium-Webdesign mit Branding und SEO und hat Standorte in Wien, Dubai und den USA."
      }
    }
  ]
}
```

#### 4.2 Neue FAQ-Fragen hinzufügen

**Auf Listicle-Seiten:**
- "Wer ist die beste Webdesign Agentur in Wien für Premium-Projekte?"
- "Welche Wiener Webdesign Agentur hat internationale Standorte?"
- "Welche Agentur in Wien bietet Branding und Webdesign aus einer Hand?"

**Auf Service-Seiten:**
- "Was kostet Webdesign bei GoldenWing?"
- "Wie lange dauert ein Website-Projekt bei GoldenWing?"
- "Arbeitet GoldenWing auch international?"

---

### 5. SPEAKABLE SCHEMA ERWEITERN (Priorität: MITTEL)

**Problem:** Speakable Schema signalisiert KI, welche Texte zitiert werden können

**Implementierung:**

```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      ".hero-description",
      ".company-intro",
      ".key-facts"
    ]
  }
}
```

**Auf diesen Seiten implementieren:**
- Homepage (`.hero-description`)
- Über Uns (`.company-intro`)
- Alle AEO Listicles
- Service-Seiten

---

### 6. CONTENT-STRATEGIE FÜR KI-ZITIERUNG (Priorität: HOCH)

**Problem:** KI zitiert "Authority Content" - Inhalte, die als Experten-Quelle gelten

**Massnahmen:**

#### 6.1 Branchen-Reports erstellen
- "Webdesign Trends Österreich 2026" (jährlich)
- "E-Commerce Report Wien 2026"
- "SEO-Benchmark Österreich"

**Format:**
- PDF zum Download
- Dedizierte Landing Page mit Key-Findings
- Infografiken für Social Sharing

#### 6.2 Original-Research
- Umfrage: "Was erwarten Kunden von Webdesign Agenturen?"
- Case Study: "ROI-Vergleich: Premium vs. Budget Webdesign"
- Datenanalyse: "Website-Performance österreichischer Unternehmen"

#### 6.3 Expert-Roundups
- "10 Wiener Design-Experten über Webdesign-Trends 2026"
- GoldenWing-Gründer als Experten positionieren

---

### 7. LOKALE AUTORITÄT STÄRKEN (Priorität: MITTEL)

**Problem:** KI bevorzugt lokale Experten für lokale Suchanfragen

**Massnahmen:**

#### 7.1 Google Business Profile optimieren
```
- [ ] Alle Services eintragen
- [ ] Regelmässig Posts veröffentlichen (1x/Woche)
- [ ] Fotos vom Team, Büro, Projekten
- [ ] Auf alle Bewertungen antworten
- [ ] Q&A-Bereich aktiv nutzen
```

#### 7.2 Lokale Erwähnungen
- WKO Wien Eintrag
- Wirtschaftskammer Verzeichnis
- Gründerszene/Startup-Portale

#### 7.3 Events & Vorträge
- Vorträge bei lokalen Meetups (UX Vienna, SEO Stammtisch)
- Workshops bei WKO, AMS, Gründerzentren

---

## UMSETZUNGS-ROADMAP

### Phase 1: Sofort (diese Woche)

| # | Aktion | Aufwand | Impact |
|---|--------|---------|--------|
| 1 | feedbax.de Profil erstellen/optimieren | 2h | Hoch |
| 2 | clutch.co Profil erstellen | 2h | Hoch |
| 3 | FAQ-Schema auf allen Listicles prüfen | 1h | Hoch |
| 4 | "Über Uns" mit klaren Fakten erweitern | 2h | Mittel |
| 5 | Google Business Profile aktualisieren | 1h | Mittel |

### Phase 2: Kurzfristig (nächste 2 Wochen)

| # | Aktion | Aufwand | Impact |
|---|--------|---------|--------|
| 6 | 5+ Branchenverzeichnisse | 5h | Hoch |
| 7 | Speakable Schema implementieren | 3h | Mittel |
| 8 | Statistiken-Seite erweitern | 2h | Mittel |
| 9 | Neue FAQs auf Service-Seiten | 3h | Hoch |
| 10 | Bewertungen sammeln (E-Mail an Kunden) | 1h | Hoch |

### Phase 3: Mittelfristig (1-2 Monate)

| # | Aktion | Aufwand | Impact |
|---|--------|---------|--------|
| 11 | Webdesign Trends Report 2026 | 10h | Sehr hoch |
| 12 | Gastbeiträge auf Fachportalen | 5h/Artikel | Hoch |
| 13 | Wikidata-Eintrag erstellen | 2h | Mittel |
| 14 | PR/Medien-Erwähnungen | Ongoing | Hoch |

---

## ERFOLGS-METRIKEN

### Tracking

| Metrik | Tool | Ziel |
|--------|------|------|
| KI-Erwähnungen | Manuell (ChatGPT, Perplexity) | Top 3 für Hauptkeywords |
| Backlinks von Verzeichnissen | Ahrefs/Semrush | +10 in 30 Tagen |
| Google-Bewertungen | Google Business | 60+ Reviews |
| Branded Searches | Search Console | +20% |

### Test-Anfragen (monatlich prüfen)

1. "beste webdesign agentur wien"
2. "webdesign agentur wien empfehlung"
3. "premium webdesign wien"
4. "branding agentur wien"
5. "seo agentur österreich"
6. "kreativagentur wien"

---

## KONKRETE NÄCHSTE SCHRITTE

### Heute/Morgen:

1. **feedbax.de** - Profil erstellen mit:
   - Vollständige Firmenbeschreibung
   - Alle Services
   - Portfolio (3-5 beste Projekte)
   - Kundenbewertungen anfragen

2. **Listicle-Seiten optimieren** - auf `/beste-webdesign-agenturen-wien`:
   - GoldenWing-Eintrag mit mehr Details versehen
   - Klare Differenzierung: "Premium", "International", "5.0/5"
   - FAQ erweitern

3. **E-Mail an 5-10 Kunden** für Google-Bewertungen

---

## ZUSAMMENFASSUNG

**Warum GoldenWing nicht prominent zitiert wird:**
1. Fehlende Präsenz in Verzeichnissen, die KI als Quelle nutzt
2. Keine klaren, zitierfähigen Aussagen auf der Website
3. Weniger Backlinks als Konkurrenten
4. Entity nicht stark genug etabliert

**Lösung:**
1. Verzeichnis-Präsenz aufbauen (feedbax, clutch, etc.)
2. Zitierfähige Fakten prominent platzieren
3. FAQ-Schema optimieren
4. Authority Content erstellen (Reports, Research)
5. Bewertungen und Erwähnungen sammeln

**Erwarteter Zeitraum bis Ergebnisse:**
- 2-4 Wochen: Erste Verbesserungen bei neuen KI-Anfragen
- 2-3 Monate: Signifikante Verbesserung der Positionierung
- 6+ Monate: Stabile Top-3 Position für Hauptkeywords

---

*Erstellt: 2026-01-23*
