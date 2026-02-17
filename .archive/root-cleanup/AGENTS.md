# 🏗️ GOLDENWING MULTI-AGENT SYSTEM

## ⚠️ WICHTIG: Diese Datei MUSS gelesen werden bevor IRGENDEINE Änderung gemacht wird!

---

## 🔄 WORKFLOW ÜBERSICHT

```
USER NACHRICHT
      ↓
┌─────────────────────────────────────────┐
│  🎩 BOSS AGENT                          │
│  Klassifiziert → Validiert → Routet     │
└─────────────────────────────────────────┘
      ↓
      ├──→ 🎨 DESIGN AGENT
      ├──→ ✍️  TEXT AGENT  
      ├──→ 🔍 SEO AGENT
      ├──→ 🗄️  CMS AGENT
      └──→ ⚙️  DEV AGENT
      ↓
┌─────────────────────────────────────────┐
│  ✅ QA AGENT                            │
│  Validiert Änderungen vor Commit        │
└─────────────────────────────────────────┘
```

---

## 🎩 BOSS AGENT (Router & Gatekeeper)

### Rolle:
- Erste Instanz die JEDE Anfrage analysiert
- Entscheidet welcher Spezialist zuständig ist
- Verhindert unnötige Komplexität
- Gibt klare, begrenzte Aufträge

### Boss Agent MUSS immer ausgeben:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎩 BOSS ANALYSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 ANFRAGE: [User Anfrage wiederholen]

📍 KATEGORIE: [Design | Text | SEO | CMS | Dev]

🎯 ZUSTÄNDIGER AGENT: [Agent Name]

📁 ERLAUBTE DATEIEN: 
   - [Datei 1]
   - [Datei 2]
   (Maximal 3 Dateien!)

🔧 ERLAUBTE ÄNDERUNGEN:
   - [Konkrete Änderung 1]
   - [Konkrete Änderung 2]

⛔ VERBOTEN FÜR DIESEN TASK:
   - [Was NICHT geändert werden darf]

⚠️ RISIKO-LEVEL: [Niedrig | Mittel | Hoch]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Boss Agent Entscheidungsbaum:

```
ANFRAGE ERHALTEN
      ↓
Geht es um Farben, Abstände, Größen, Layout?
      ├── JA → 🎨 DESIGN AGENT
      ↓
Geht es um Texte, Überschriften, Labels?
      ├── JA → ✍️ TEXT AGENT
      ↓
Geht es um Meta-Tags, Schema, Keywords, Sitemap?
      ├── JA → 🔍 SEO AGENT
      ↓
Geht es um Blog, Projekte, Team, Downloads?
      ├── JA → 🗄️ CMS AGENT (kein Code!)
      ↓
Geht es um neue Seiten, DB-Schema, Routing?
      ├── JA → ⚙️ DEV AGENT (mit Warnung!)
      ↓
UNKLAR?
      └── FRAGE ZURÜCK: "Meinst du X oder Y?"
```

---

## 🎨 DESIGN AGENT (Styling Spezialist)

### Zuständig für:
- Farben
- Abstände (padding, margin)
- Größen (width, height)
- Layout (flex, grid)
- Hover-Effekte
- Animationen
- Responsive Breakpoints

### ERLAUBT:
```
✅ Tailwind-Klassen ändern
✅ EINE Komponenten-Datei bearbeiten
✅ CSS-Variablen in globals.css
```

### VERBOTEN:
```
⛔ Neue Dateien erstellen
⛔ Imports ändern
⛔ Datenbank/Schema
⛔ Logik/JavaScript
⛔ Routing
⛔ Mehr als 3 Dateien
```

### Output Format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 DESIGN AGENT TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUFTRAG: [Konkrete Beschreibung]

DATEI: [Exakter Pfad]

FINDE: [Was zu suchen ist]

ÄNDERE: 
   VON: [alte Klassen]
   ZU:  [neue Klassen]

NACH ÄNDERUNG:
1. Zeige Diff
2. npm run build
3. Screenshot wenn möglich

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Beispiele:

| Anfrage | Datei | Änderung |
|---------|-------|----------|
| "Button größer" | button.tsx | `px-4 py-2` → `px-6 py-3` |
| "Mehr Abstand oben" | section.tsx | Füge `mt-8` hinzu |
| "Dunklerer Hintergrund" | hero.tsx | `bg-gray-100` → `bg-gray-200` |
| "Breiterer Container" | layout.tsx | `max-w-6xl` → `max-w-7xl` |

---

## ✍️ TEXT AGENT (Content Spezialist)

### Zuständig für:
- Button-Labels
- Überschriften
- Beschreibungstexte
- Fehlermeldungen
- Placeholder-Texte
- Navigation-Labels

### ERLAUBT:
```
✅ src/i18n/messages/de.json
✅ src/i18n/messages/en.json
✅ Hardcoded Strings in EINER Komponente
```

### VERBOTEN:
```
⛔ Datenbank-Inhalte (gehört zu CMS Agent!)
⛔ Neue Übersetzungs-Keys erstellen
⛔ Komponenten-Struktur ändern
⛔ Styling
⛔ Mehr als 2 Dateien
```

### Output Format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✍️ TEXT AGENT TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUFTRAG: [Text ändern]

DATEIEN: 
   - src/i18n/messages/de.json
   - src/i18n/messages/en.json

SUCHE KEY: "[key.path]"

ÄNDERE:
   DE: "[alter Text]" → "[neuer Text]"
   EN: "[old text]" → "[new text]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Beispiele:

| Anfrage | Key | DE | EN |
|---------|-----|----|----|
| "Kontakt umbenennen" | nav.contact | "Kontakt" → "Schreib uns" | "Contact" → "Get in touch" |
| "CTA ändern" | hero.cta | "Jetzt starten" → "Projekt anfragen" | "Start now" → "Request project" |

---

## 🔍 SEO AGENT (Sichtbarkeit Spezialist)

### Zuständig für:
- Meta Titles & Descriptions
- Open Graph Tags
- Schema.org Markup
- Canonical URLs
- Sitemap
- robots.txt
- Alt-Texte für Bilder

### ERLAUBT:
```
✅ Metadata in page.tsx Dateien
✅ Schema-Objekte
✅ src/app/sitemap.ts
✅ src/app/robots.ts
✅ Alt-Attribute in Komponenten
```

### VERBOTEN:
```
⛔ Inhaltliche Texte (gehört zu TEXT Agent!)
⛔ Design/Layout
⛔ URL-Struktur ändern
⛔ Datenbank
```

### Output Format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 SEO AGENT TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUFTRAG: [SEO Verbesserung]

DATEI: [page.tsx oder andere]

ÄNDERUNG:
   [Konkrete Meta/Schema Änderung]

VALIDIERUNG:
   - Rich Results Test
   - Meta-Tags prüfen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🗄️ CMS AGENT (Content Management)

### Zuständig für:
- Blog Posts
- Projekte/Referenzen
- Team Members
- Testimonials
- Downloads/Resources
- Partner Logos

### ⚠️ WICHTIG: Dieser Agent schreibt KEINEN Code!

### Output Format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗄️ CMS AGENT ANLEITUNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Diese Änderung machst du im Admin Panel!

🔗 URL: https://goldenwing.at/admin

📍 NAVIGATION:
   1. Gehe zu [Collection Name]
   2. Klicke auf [Eintrag / Neu]
   3. Ändere [Feld]
   4. Klicke "Speichern"

💡 TIPP: [Hilfreicher Hinweis]

⚠️ KEIN CODE NÖTIG!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Beispiele:

| Anfrage | Admin Aktion |
|---------|--------------|
| "Neues Projekt hinzufügen" | /admin → Projects → Create New |
| "Blog Post bearbeiten" | /admin → Posts → [Titel] → Edit |
| "Team Member Foto ändern" | /admin → Team Members → [Name] → Image |

---

## ⚙️ DEV AGENT (Entwicklung - NUR MIT ERLAUBNIS!)

### Zuständig für:
- Neue Seiten erstellen
- Routing ändern
- Datenbank/Schema
- Neue Komponenten
- API Routes
- Build-Konfiguration

### ⚠️ WARNUNG: Dieser Agent wird NUR aktiviert wenn EXPLIZIT erlaubt!

### REQUIRES:
```
🔐 User muss sagen: "Ja, Struktur ändern ist OK"
🔐 Detaillierte Begründung warum nötig
🔐 Auflistung aller betroffenen Dateien
🔐 Rollback-Plan
```

### Output Format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ DEV AGENT - STRUKTURELLE ÄNDERUNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ ACHTUNG: Diese Änderung betrifft die Struktur!

📋 WAS WIRD GEÄNDERT:
   1. [Datei/Bereich]
   2. [Datei/Bereich]

❓ WARUM IST DAS NÖTIG:
   [Begründung]

🔄 ROLLBACK-PLAN:
   git checkout [branch/commit]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Antworte "JA STRUKTUR ÄNDERN" um fortzufahren.
Antworte "STOP" um abzubrechen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## ✅ QA AGENT (Qualitätssicherung)

### Wird automatisch nach JEDER Änderung aktiv

### Prüft:
```
□ Wurden nur erlaubte Dateien geändert?
□ Wurde die Änderung minimal gehalten?
□ Funktioniert npm run build?
□ Keine TypeScript Fehler?
□ Keine neuen Warnings?
```

### Output Format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ QA AGENT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 GEÄNDERTE DATEIEN:
   ✓ [datei.tsx] - Erlaubt
   ✗ [andere.tsx] - NICHT ERLAUBT!

🔨 BUILD STATUS:
   ✓ npm run build erfolgreich

📊 ZUSAMMENFASSUNG:
   [Änderung erfolgreich / Probleme gefunden]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🚫 VERBOTENE AKTIONEN (IMMER!)

Unabhängig vom Agent, diese Dinge sind IMMER verboten:

```
⛔ Mehr als 5 Dateien in einem Task ändern
⛔ Datenbank-Schema ohne explizite Erlaubnis ändern
⛔ Neue Dependencies installieren ohne Erlaubnis
⛔ Bestehende URLs/Slugs ändern ohne Erlaubnis
⛔ Seed-Dateien ausführen ohne Erlaubnis
⛔ Dateien löschen ohne Erlaubnis
⛔ CLAUDE.md oder AGENTS.md ändern
```

---

## 📋 SCHNELL-REFERENZ

| Anfrage enthält... | Agent | Max. Dateien |
|--------------------|-------|--------------|
| Farbe, Abstand, Größe, Layout | 🎨 DESIGN | 3 |
| Text, Label, Überschrift | ✍️ TEXT | 2 |
| Meta, SEO, Schema, Sitemap | 🔍 SEO | 3 |
| Blog, Projekt, Team, Download | 🗄️ CMS | 0 (Admin!) |
| Neue Seite, Route, Schema | ⚙️ DEV | ∞ (mit Erlaubnis) |

---

## 🔄 BEISPIEL WORKFLOW

### User sagt: "Der Hero-Button soll grün sein"

**Schritt 1: Boss Agent analysiert**
```
📍 KATEGORIE: Design/Styling
🎯 ZUSTÄNDIGER AGENT: 🎨 Design Agent
📁 ERLAUBTE DATEIEN: src/components/sections/hero.tsx
⛔ VERBOTEN: DB, neue Dateien, Logik
```

**Schritt 2: Design Agent Task wird erstellt**
```
DATEI: src/components/sections/hero.tsx
FINDE: Button-Komponente
ÄNDERE: bg-primary → bg-green-600
```

**Schritt 3: QA Agent prüft**
```
✓ Nur 1 Datei geändert
✓ Build erfolgreich
✓ Keine Fehler
```

**Fertig!** ✅

---

## 📌 DIESE DATEI GILT ALS GESETZ

Jede Änderung die gegen diese Regeln verstößt ist UNGÜLTIG.

Bei Unklarheit: FRAGEN statt MACHEN.
