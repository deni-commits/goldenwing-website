# /backlink-attack - Backlink Opportunities finden

## Zweck
Analysiert Backlink-Profile der Konkurrenz und findet Möglichkeiten für eigene Backlinks.

## Workflow

### 1. GoldenWing Backlink-Status
```
semrush_backlinks domain=goldenwing.at
semrush_backlinks_domains domain=goldenwing.at
→ Aktuelle verweisende Domains
```

### 2. Konkurrenten-Backlinks analysieren
```
Für Top 3 Konkurrenten:
semrush_backlinks domain=[konkurrent]
semrush_backlinks_domains domain=[konkurrent]
→ Deren Backlink-Quellen
```

### 3. Opportunities identifizieren

**A) Gemeinsame Links**
- Domains die zu 2+ Konkurrenten linken
- Aber NICHT zu GoldenWing
- → Hohe Erfolgswahrscheinlichkeit

**B) Broken Links**
- 404-Seiten bei Konkurrenten
- Mit eingehenden Backlinks
- → Outreach: "Hey, der Link ist kaputt, wir haben besseren Content"

**C) Guest Post Möglichkeiten**
- Blogs in der Branche
- Die Konkurrenten-Artikel haben
- → Eigene Gastbeiträge pitchen

**D) Directories & Listen**
- Branchenverzeichnisse
- "Top Agenturen" Listen
- → Eintragen lassen

### 4. Qualitäts-Filter
```
Nur Domains mit:
- Domain Authority > 30
- Kein Spam
- Deutsch oder International relevant
- Follow-Links
```

## Output: Outreach-Liste

| Domain | DA | Type | Konkurrenten | Priority | Kontakt |
|--------|-----|------|--------------|----------|---------|
| ... | 45 | Guest Post | 2/3 | HIGH | ... |
| ... | 38 | Directory | 3/3 | HIGH | ... |

**Priorisierung:**
- 🔴 HIGH - Mehrere Konkurrenten haben Link, hohe DA
- 🟡 MEDIUM - Ein Konkurrent, mittlere DA
- 🟢 LOW - Nice to have

## Verwendung
```
/backlink-attack
/backlink-attack --competitors domain1.at,domain2.at
```

## API Units
Ca. 200-400 Units
