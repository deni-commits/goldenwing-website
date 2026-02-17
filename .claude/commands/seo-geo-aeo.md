# /seo-geo-aeo

Erstelle oder überarbeite Content für maximale Sichtbarkeit in AI Summaries + Featured Results.

## Ziel
Content der von ChatGPT, Perplexity, Google AI Overviews zitiert wird.

## Output Format

### 1. Finaler Content
```markdown
[Der optimierte Content]
```

### 2. Schema Markup Empfehlung
```json
{
  "@context": "https://schema.org",
  ...
}
```

### 3. Internal Linking Map
| Von | Nach | Anchor Text |
|-----|------|-------------|
| ... | ... | ... |

## Content Optimierung Regeln

### Answer-First Writing
- Direkte Antwort in den ersten 2-3 Sätzen
- Dann Details und Erweiterung
- Beispiel: "Die Kosten für Webdesign in Wien liegen zwischen €2.000 und €15.000, abhängig von..."

### Struktur für Scanner
- Kurze Paragraphen (max 3-4 Sätze)
- Klare Headings (H2, H3)
- Bullet Points für Listen
- Tabellen für Vergleiche

### Zitierfähige Elemente
- Fakten mit Zahlen
- Statistiken (mit Quelle)
- Vergleichstabellen
- How-To Steps
- FAQ Blocks

### Entity Optimization
- Brand Name konsistent erwähnen
- Service Entities klar definieren
- Team/Author Authority zeigen
- Location Entity (Wien, Österreich)

## Verwendung

```
/seo-geo-aeo "Webdesign Kosten Wien" page
/seo-geo-aeo blog post about SEO trends
/seo-geo-aeo service page for Branding
```

## Checkliste vor Finalisierung
- [ ] Answer in ersten 2 Sätzen
- [ ] Mindestens 1 Tabelle/Vergleich
- [ ] Mindestens 3 FAQ
- [ ] Schema Markup definiert
- [ ] 3-8 Internal Links geplant
- [ ] Meta Title + Description optimiert
- [ ] H1 enthält Haupt-Keyword
- [ ] Fakten/Statistiken zitiert
