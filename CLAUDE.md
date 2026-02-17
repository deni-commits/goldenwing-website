# GoldenWing Creative Studios — Claude Code Operating Rules

## 🚨 LIES DAS ZUERST - IMMER!

**Letzte Aktualisierung:** 2026-01-29
**Bereinigt durch:** Cowork Audit

---

## 📋 Quick Context

**Was ist GoldenWing?**
- Premium Kreativagentur Website (Branding, Webdesign, SEO, Marketing)
- 3 Standorte: Wien, Dubai, Roseville CA
- Next.js 15 + Payload CMS + SQLite

**Deployment:** VPS via SSH (NICHT Vercel!) - siehe unten

---

## 🔐 Deployment (WICHTIG!)

### Server-Credentials
**⚠️ NIEMALS Credentials in Code oder Dokumentation hardcoden!**

Alle Server-Details sind in `.env.local` gespeichert:
```bash
DEPLOY_HOST=         # Server IP
DEPLOY_USER=         # SSH User
DEPLOY_PATH=         # Remote Pfad
DEPLOY_PM2_NAME=     # PM2 Prozessname
SSH_KEY_PATH=        # Pfad zum SSH Key
```

### Deploy Commands
```bash
# 1. Env-Variablen laden
source .env.local

# 2. Media synchronisieren (IMMER ZUERST!)
rsync -avz --progress -e "ssh -i $SSH_KEY_PATH" ./public/media/ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/public/media/

# 3. Code synchronisieren
rsync -avz --exclude-from='.rsyncignore' -e "ssh -i $SSH_KEY_PATH" ./ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/

# 4. Build + Restart
ssh -i $SSH_KEY_PATH ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH} && npm install && npm run build && pm2 restart ${DEPLOY_PM2_NAME}"
```

### Deployment Checkliste
- [ ] `.env.local` vorhanden mit allen DEPLOY_* Variablen?
- [ ] Media synchronisiert? (`public/media/`)
- [ ] Build lokal erfolgreich? (`npm run build`)
- [ ] Server Build erfolgreich?
- [ ] Website erreichbar?

---

## 🛠️ Verfügbare Claude Commands

Alle Commands sind in `.claude/commands/` definiert:

| Command | Beschreibung |
|---------|--------------|
| `/code` | Backend, API, Payload CMS Tasks |
| `/design` | UI/UX, Components, Styling |
| `/blog` | Blog Content Research & Creation |
| `/seo` | SEO Optimierung mit **SEMrush API** |
| `/competitor-destroy` | **NEU** Konkurrenten analysieren & Angriffsplan |
| `/keyword-gap` | **NEU** Fehlende Keywords vs. Konkurrenz finden |
| `/backlink-attack` | **NEU** Backlink Opportunities finden |
| `/perf` | Performance Audit (kann Deployment blocken!) |
| `/audit` | Vollständiger Website-Audit |
| `/seo-report` | **NEU** Weekly SEO Report mit SEMrush Daten |
| `/seo-nuke` | **NEU** Full-Site SEO Optimierung (alle Seiten) |
| `/deploy` | Deployment vorbereiten |
| `/deploy-check` | Pre-Deployment Checks |
| `/team` | Mehrere Agents parallel koordinieren |

**Verwendung:** Einfach `/command` eingeben

---

## 🔍 SEMrush API Integration

**API Key:** In `.env.local` als `SEMRUSH_API_KEY`
**MCP Server:** Global in `~/.claude.json` konfiguriert

### Verfügbare SEMrush Tools
```
semrush_domain_overview          # Domain-Metriken
semrush_domain_organic_keywords  # Rankings
semrush_keyword_overview         # Keyword-Daten (Volumen, Difficulty)
semrush_related_keywords         # LSI Keywords
semrush_phrase_questions         # FAQ-Fragen für Schema
semrush_competitors              # Konkurrenten finden
semrush_backlinks                # Backlink-Profil
semrush_traffic_summary          # Traffic-Daten
semrush_api_units_balance        # API Units prüfen
```

### API Units Verbrauch
- Keyword/Domain Overview: 10 Units
- Related Keywords, Phrase Questions: 40 Units
- Keyword Difficulty: 50 Units

---

## 📁 Projekt-Struktur

```
goldenwing-website/
├── .claude/                 # Claude Code Konfiguration
│   ├── commands/            # Verfügbare Commands
│   ├── agents/              # Agent-Konfigurationen
│   └── settings.local.json  # Lokale Einstellungen
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [locale]/        # i18n Routing (de/en)
│   │   └── api/             # API Routes
│   ├── components/          # React Components
│   ├── lib/                 # Utilities & Helpers
│   ├── payload/             # Payload CMS Collections
│   ├── i18n/                # Internationalisierung
│   └── messages/            # Übersetzungen (de.json, en.json)
├── public/                  # Static Assets
├── docs/                    # Dokumentation
└── .archive/                # Archivierte alte Dateien
```

---

## 🚫 PROTECTED FILES - NIEMALS ÄNDERN

Diese Dateien sind stabil und getestet. Bei Text-/Design-Änderungen NICHT berühren:

### i18n & Routing
- `src/i18n/routing.ts` - Locale-spezifische Pfade
- `src/i18n/config.ts` - Locale Konfiguration
- `src/middleware.ts` - Slug-Validierung, Redirects, Bot-Detection
- `src/lib/slug-registry/**` - Slug Mappings (DE ↔ EN)

### Payload CMS Data Layer
- `src/lib/payload/index.ts` - Datenabfragen
- `src/lib/utils.ts` - Path-Translation Funktionen

### Security Critical
- `payload.config.ts` - Hat localhost-Schutz
- `src/lib/security/**` - Rate Limiting, CSRF, XSS

**Bei Text-/Design-Änderungen:**
1. NUR Content in `src/messages/*.json` ändern
2. NUR Styling/Layout in Komponenten ändern
3. NIEMALS imports oder Routing-Logik anfassen

---

## 🎨 Design System

### Brand Colors
```css
--primary: #f2fb31          /* Neon-Gelb */
--primary-foreground: #000  /* Schwarz für Kontrast */
--background: oklch(1 0 0)  /* Clean White */
--foreground: oklch(0.145 0 0)  /* Near Black */
```

### Design Principles
- Clean Layout, großzügiger Whitespace
- Subtile Tiefe (soft shadows), rounded corners
- Mobile-first, responsive
- Accessibility (WCAG 2.1 AA)

### Standorte
- **Wien** (Hauptsitz): Czeikestrasse 4/21, 1100 Wien
- **Dubai**: DAMAC Executive Bay Tower B, Office 1406, Business Bay
- **Roseville, CA**: 2700 N Hayden Pkwy, Roseville, CA 95747

---

## 📊 SEO / GEO / AEO Rules

### Content Principles
- **Answer-First**: Direkte Antwort im ersten Satz
- **Zitierfähige Fakten**: Zahlen, Statistiken, Quellen
- **FAQ Blocks**: Für Featured Snippets
- **Schema Markup**: FAQ, HowTo, Organization, LocalBusiness, Service

### Keywords (German Market)
- KI Lösungen Deutschland/Österreich
- KI Agentur Wien
- Webdesign Wien
- SEO Agentur Wien

---

## 🔧 Tech Stack

| Technology | Version | Zweck |
|------------|---------|-------|
| Next.js | 15.5.x | App Router, SSR/SSG |
| React | 19 | UI Framework |
| TypeScript | strict | Type Safety |
| TailwindCSS | 4 | Styling |
| shadcn/ui | latest | UI Components |
| Payload CMS | 3.x | Headless CMS |
| SQLite | - | Datenbank |

---

## 📝 Changelog (Wichtige Änderungen)

### 2026-01-29 - SEMrush API Integration
- SEMrush MCP Server global konfiguriert
- 3 neue Commands: `/competitor-destroy`, `/keyword-gap`, `/backlink-attack`
- `/seo` Command mit SEMrush Tools erweitert
- API Key in `.env.local`

### 2026-01-29 - Cowork Cleanup
- **Sicherheit:** Credentials aus allen MD-Dateien entfernt → `.env.local`
- **Pfade:** Alle hardcodierten Pfade durch relative ersetzt
- **Commands:** `.claude/commands/*.md` überarbeitet und verbessert
- **Cleanup:** Veraltete MD-Dateien nach `.archive/` verschoben
- **Dokumentation:** CLAUDE.md komplett überarbeitet

### 2026-01-29 - SEMrush Audit Fixes
- Bot Redirect Loop in middleware.ts gefixt
- Runtime Error Fixes in pakete/[slug]/page.tsx
- SEMrush Verification File deployed

### 2026-01-28 - Google Search Console
- FAQ Schema Duplikate entfernt (27+ Seiten)
- ProfilePage dateModified Fix

### 2026-01-27 - Google Indexing API
- API Route `/api/indexing` für sofortige Crawl-Anfragen

### 2026-01-13 - Website Tools Suite
- 5 kostenlose Analyse-Tools (SEO, Performance, Design, Security)
- Lead Capture + PDF Reports
- Rate Limiting + Security Layer

---

## ✅ Quality Gates

Before committing:
- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Responsive design works
- [ ] German content grammatically correct
- [ ] SEO metadata set

---

## 📚 Weitere Dokumentation

| Datei | Inhalt |
|-------|--------|
| `docs/GOLDENWING-MEGA-DOKUMENTATION.md` | Vollständige Projekt-Dokumentation |
| `docs/SEO-GEO-AEO-RULES.md` | SEO Best Practices |
| `docs/DEPLOYMENT.md` | Deployment Details |
| `TODO.md` | Aktuelle Tasks |
| `FIX-REPORT.md` | Letzte größere Fixes |

---

## 🆘 Troubleshooting

### Build Fehler
```bash
npm run build 2>&1 | grep -i error
```

### Server Logs
```bash
source .env.local
ssh -i $SSH_KEY_PATH ${DEPLOY_USER}@${DEPLOY_HOST} "pm2 logs ${DEPLOY_PM2_NAME} --lines 100"
```

### TypeScript Types neu generieren
```bash
npm run payload generate:types
```

---

## 👥 Gründer

- **Deni Khachukaev** - Technical Director (Webdesign, SEO, Entwicklung)
- **Benedikt Hasibeder** - Business Director (Branding, Marketing, Strategie)
