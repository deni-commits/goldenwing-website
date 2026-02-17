# /keyword-gap - Keyword-Lücken finden

## Zweck
Findet Keywords wo Konkurrenten ranken aber GoldenWing nicht. Priorisiert nach Potential.

## Workflow

### 1. GoldenWing Keywords holen
```
semrush_domain_organic_keywords domain=goldenwing.at
→ Speichere alle aktuellen Rankings
```

### 2. Top-Konkurrenten identifizieren
```
semrush_competitors domain=goldenwing.at
→ Top 5 organische Konkurrenten
```

### 3. Konkurrenten-Keywords sammeln
```
Für jeden Konkurrenten:
semrush_domain_organic_keywords domain=[konkurrent]
→ Sammle alle Keywords
```

### 4. Gap-Analyse
```
Finde Keywords die:
- Mindestens 2 Konkurrenten haben
- GoldenWing NICHT hat
- Volumen > 100/Monat
- Difficulty < 60
```

### 5. Keyword-Details holen
```
semrush_batch_keyword_overview keywords=[gap-keywords]
→ Volumen, Difficulty, CPC, Trend
```

## Output: Priorisierte Keyword-Liste

| Keyword | Volumen | Difficulty | Konkurrenten | Aktion |
|---------|---------|------------|--------------|--------|
| ... | ... | ... | 3/5 | Neue Seite |
| ... | ... | ... | 2/5 | Blog Post |

**Kategorien:**
- **Neue Service-Seite nötig** - Keyword passt zu neuem Service
- **Blog-Artikel** - Informational Intent
- **Bestehende Seite erweitern** - Zu existierender Seite hinzufügen
- **FAQ hinzufügen** - Als FAQ-Schema

## Verwendung
```
/keyword-gap
/keyword-gap --min-volume 200 --max-difficulty 50
```

## API Units
Ca. 300-500 Units (abhängig von Anzahl Konkurrenten)
