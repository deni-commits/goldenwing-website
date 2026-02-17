# Changelog

Alle wichtigen Änderungen am GoldenWing Website Projekt werden hier dokumentiert.

---

## [2026-01-29] - SEO/GEO/LLM/E-E-A-T Komplettlösung

### 🔴 KRITISCH: Bot-Handling Fix
- **Middleware Bot-Handling korrigiert** (`src/middleware.ts`)
  - Bots auf `/en/*` URLs werden NICHT mehr zu `/de/*` umgeschrieben
  - EN-Seiten werden jetzt korrekt an Crawler ausgeliefert
  - Erwartung: ~299 EN-Seiten indexiert (statt nur 16)
  - Header `x-locale` wird für downstream components gesetzt

### 🔧 Single Source of Truth für Slugs
- **Neue Datei:** `src/config/slug-mappings.ts`
  - Zentrales Repository für ALLE Slug-Übersetzungen
  - SERVICE_SLUGS, SUB_SERVICE_SLUGS, REFERENCE_SLUGS, etc.
  - Helper-Funktionen: `translateServiceSlug()`, `translateSubServiceSlug()`, etc.
  - Build-Zeit-Validierung: `validateSlugMappings()`
  - Verhindert Duplikation und Inkonsistenzen

### 📊 E-E-A-T CMS-Erweiterungen
- **TeamMembers Collection erweitert:**
  - `credentials` (Array): Zertifizierungen & Qualifikationen
  - `expertise` (Array): Fachgebiete mit Jahren Erfahrung
  - `awards` (Array): Auszeichnungen & Preise
  - `extendedBio` (RichText): Detaillierte Biografie
  - `languages` (Array): Sprachkenntnisse
  - `notableClients` (Array): Namhafte Kunden

- **Posts Collection erweitert:**
  - `authorCredentials` (Text): Autor-Qualifikation für diesen Artikel
  - `lastReviewedAt` (Date): Wann wurde Inhalt zuletzt geprüft
  - `factCheckedBy` (Relationship): Wer hat geprüft
  - `contentRating` (Group): Für Schema.org AggregateRating

### 🤖 LLM/GEO Optimierung
- **Neue Datei:** `public/ai.txt`
  - AI-Crawler-Permissions (GPTBot, PerplexityBot, etc.)
  - Strukturierte Organisationsinformationen
  - Team-Expertise-Bereiche
  - Empfohlene Content-Sections für AI-Training
  - Zitierungs-Anforderungen

### 📈 Monitoring & Prävention
- **Neue Datei:** `src/scripts/validate-seo.ts`
  - Prüft bidirektionale Slug-Konsistenz
  - Zählt DE/EN Slug-Balance
  - Erkennt verwaiste Übersetzungen
  - Läuft via `npm run validate:seo`

- **Package.json aktualisiert:**
  - Neues Script: `validate:seo`

### 📁 Dateien erstellt/geändert
| Datei | Änderung |
|-------|----------|
| `src/config/slug-mappings.ts` | NEU - Single Source of Truth |
| `src/middleware.ts` | Bot-Handling für EN-Seiten gefixt |
| `src/lib/utils.ts` | Imports von slug-mappings.ts |
| `src/payload/collections/TeamMembers.ts` | E-E-A-T Felder |
| `src/payload/collections/Posts.ts` | E-E-A-T Felder |
| `public/ai.txt` | NEU - LLM-Kontext-Datei |
| `src/scripts/validate-seo.ts` | NEU - Validierungs-Script |
| `SEO-ROOT-CAUSE-ANALYSIS.md` | NEU - Analyse-Report |
| `package.json` | validate:seo Script |

### 🎯 Erwartete Ergebnisse nach Deployment
- EN-Seiten: ~299 indexiert (vorher: 16)
- Orphaned Seiten: 0 (vorher: 340)
- Konsistente Slug-Verwaltung
- Vollständige E-E-A-T Signale
- LLM/AI-Optimierung aktiv

---

## [2026-01-29] - Cowork Cleanup & Sicherheitsaudit

### 🔐 Sicherheit
- **KRITISCH:** Alle hardcodierten Server-Credentials entfernt aus:
  - `.claude/commands/deploy.md`
  - `.claude/commands/deploy-check.md`
  - `CLAUDE.md`
- Deployment-Credentials werden jetzt aus `.env.local` geladen:
  - `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`, `DEPLOY_PM2_NAME`, `SSH_KEY_PATH`
- **Team-E-Mail** jetzt konfigurierbar via `TEAM_EMAIL` und `REPLY_TO_EMAIL` Environment-Variablen
  - `src/lib/email/send.ts` - Zentrale E-Mail-Konfiguration
  - `src/app/api/chat-lead/route.ts` - Chat-Lead Notifications
  - Fallback auf Standard-Werte wenn nicht gesetzt

### 🐛 Bug Fixes
- **robots.txt:** `Host:` Direktive korrigiert (Protokoll entfernt per Spezifikation)

### 📁 Dateien geändert

#### `.claude/commands/deploy.md`
- Server-Details durch Environment-Variablen ersetzt
- Deploy-Commands verwenden jetzt `${DEPLOY_*}` Variablen

#### `.claude/commands/deploy-check.md`
- Deployment Commands auf Environment-Variablen umgestellt

#### `.claude/commands/code.md`
- Hardcodierten Pfad `/Users/denikhachukaev/...` entfernt
- Inline-Anweisungen hinzugefügt (kein externer Agent-File mehr nötig)
- Tech Stack und Key Directories dokumentiert

#### `.claude/commands/design.md`
- Hardcodierten Pfad entfernt
- Brand Colors und Design-Richtlinien inline dokumentiert
- Key Directories hinzugefügt

#### `.claude/commands/team.md`
- Alle externen Agent-Pfade entfernt
- Verweise auf lokale `.claude/commands/` Dateien

#### `.claude/commands/blog.md`
- Hardcodierten Pfad entfernt
- SEO-optimierte Blog-Struktur dokumentiert
- Mehrsprachigkeit (DE/EN) betont

#### `.claude/commands/seo.md`
- Hardcodierten Pfad entfernt
- GEO/AEO Best Practices hinzugefügt
- Key Files dokumentiert

#### `.claude/commands/perf.md`
- Hardcodierten Pfad entfernt
- INP statt FID (aktueller Web Vitals Standard)
- Known Issues aus früheren Audits dokumentiert

#### `.claude/settings.local.json`
- Hardcodierten Benutzer-Pfad entfernt
- Git-Permissions erweitert (`git:*` statt `git pull:*`)

#### `CLAUDE.md`
- **KOMPLETT NEU GESCHRIEBEN**
- Alle Credentials entfernt
- Klare Struktur: Quick Context → Deployment → Commands → Struktur → Protected Files
- Changelog-Sektion hinzugefügt
- Troubleshooting-Sektion hinzugefügt

### 🗑️ Dateien archiviert (nach `.archive/`)
- `AUDIT-REPORT-2025-12-26.md` - Ersetzt durch neuere Reports
- `BENE-FEEDBACK-TODO.md` - Temporäre Feedback-Datei
- `SUBSERVICES_SAMPLE_DATA.md` - Sample-Daten
- `CASE_STUDIES_RAW.md` - Rohdaten

### 📊 Analyse-Ergebnis

| Kategorie | Vorher | Nachher |
|-----------|--------|---------|
| Hardcodierte Credentials | 5+ Stellen | 0 |
| Hardcodierte Pfade | 8 Dateien | 0 |
| Veraltete MD-Dateien | 4 | Archiviert |
| Claude Commands | Teils unvollständig | Alle vollständig |

---

## [2026-01-29] - SEMrush Audit Fixes

### Geändert
- `middleware.ts`: Bot Redirect Loop gefixt
  - Problem: SEMrush bekam HTTP 307 "redirect limit reached"
  - Fix: `BOT_PATTERN` RegEx erkennt Crawler, überspringt `intlMiddleware`
- `pakete/[slug]/page.tsx`: Optional chaining + `notFound()` check

### Hinzugefügt
- `public/siteaudit-MDZhMjFkMj.txt`: SEMrush Verification File

---

## [2026-01-28] - Google Search Console Fixes

### Geändert
- FAQ Schema Duplikate entfernt (27+ Seiten)
- `ueber-uns/team/[slug]/page.tsx`: ProfilePage dateModified Fix
  - Vorher: `new Date().toISOString().split('T')[0]`
  - Nachher: `new Date().toISOString()`

---

## [2026-01-27] - Google Indexing API

### Hinzugefügt
- `/api/indexing` Route für sofortige Crawl-Anfragen
- Unterstützt einzelne URL oder Array von URLs
- Authentifizierung via `x-indexing-secret` Header

---

## [2026-01-13] - Website Tools Suite

### Hinzugefügt
- 5 kostenlose Analyse-Tools unter `/tools`:
  - SEO Checker
  - Performance Checker
  - Design Analyzer
  - Security Checker
  - Website Analyzer (kombiniert)
- Lead Capture Modal + PDF Reports
- Rate Limiting + Security Layer

---

## Ältere Änderungen

Siehe `FIX-REPORT.md` und `FIX-REPORT-2.md` für detaillierte Reports früherer Änderungen.
