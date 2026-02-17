# GoldenWing Multilingual SEO - Priorisierte To-Do-Liste

## PHASE 1: KRITISCH (Woche 1-2)

### 1.1 Payload CMS Lokalisierung aktivieren
- [ ] `payload.config.ts` - Localization konfigurieren
- [ ] Services Collection - Felder lokalisierbar machen
- [ ] SubServices Collection - Felder lokalisierbar machen
- [ ] Projects Collection - Felder lokalisierbar machen
- [ ] Posts Collection - Felder lokalisierbar machen
- [ ] TeamMembers Collection - bio, role lokalisierbar
- [ ] Migration Script für bestehende DE-Inhalte

### 1.2 Homepage lokalisieren
- [ ] `page.tsx` - Metadata dynamisch machen (`generateMetadata`)
- [ ] FAQs in Übersetzungsdateien verschieben
- [ ] Testimonials lokalisieren oder CMS-basiert
- [ ] JSON-LD Schema dynamisch pro Locale generieren
- [ ] Review Schema mit lokalisierten Texten

### 1.3 Layout & Navigation
- [ ] Canonical URLs mit Locale-Prefix
- [ ] Meta OG:locale dynamisch
- [ ] Sitemap mit hreflang erstellen (`src/app/sitemap.ts`)

---

## PHASE 2: HOCH (Woche 3-4)

### 2.1 Service-Seiten
- [ ] Services aus CMS mit Locale laden
- [ ] Service Schema pro Seite
- [ ] FAQ Schema lokalisiert
- [ ] Preistabellen hinzufügen (GEO-optimiert)
- [ ] HowTo Schema für Prozess-Sektion

### 2.2 Pillar Pages
- [ ] `/webdesign-wien` → `/en/web-design-vienna` oder ähnlich
- [ ] `/seo-agentur-wien` → EN Version
- [ ] `/kreativagentur-wien` → EN Version
- [ ] Lokalisierte URLs oder gleiche Slugs?

### 2.3 Standorte
- [ ] Bereits übersetzt - QA Check
- [ ] LocalBusiness Schema pro Standort/Locale prüfen

---

## PHASE 3: MITTEL (Woche 5-6)

### 3.1 Content-Übersetzung
- [ ] 7 Services übersetzen (professionell)
- [ ] 35 SubServices übersetzen
- [ ] Pillar Pages EN-Texte finalisieren
- [ ] Homepage CMS-Inhalte übersetzen

### 3.2 GEO/AEO Optimierung
- [ ] Answer-First Format auf Hauptseiten
- [ ] Statistiken mit Quellen hinzufügen
- [ ] Vergleichstabellen (Preise, Features)
- [ ] FAQ-Blöcke erweitern

### 3.3 Team & Authority
- [ ] Person Schema für Team
- [ ] Author Bios auf Blog-Posts
- [ ] Credentials/Zertifikate erwähnen

---

## PHASE 4: OPTIMIERUNG (Woche 7-8)

### 4.1 Blog
- [ ] Top 10 Posts übersetzen
- [ ] Article/BlogPosting Schema
- [ ] Author Attribution pro Post
- [ ] Kategorien lokalisieren

### 4.2 Projects
- [ ] Projekt-Beschreibungen übersetzen
- [ ] CreativeWork Schema
- [ ] Case Study Format für Top-Projekte

### 4.3 Tracking
- [ ] Google Search Console einrichten (beide Domains)
- [ ] hreflang Validation Report
- [ ] GA4 Events pro Sprache
- [ ] Ubersuggest AI-Visibility

---

## SCHNELLSTART-BEFEHLE

```bash
# Payload CMS Types neu generieren
npm run payload generate:types

# Dev Server starten
npm run dev

# Build testen
npm run build

# Deployment
rsync -avz --exclude node_modules --exclude .next ./ root@72.62.52.70:/var/www/goldenwing/
ssh root@72.62.52.70 "cd /var/www/goldenwing && npm install && npm run build && pm2 restart goldenwing"
```

---

## NOTIZEN

### Entscheidungen getroffen:
- [x] Sprachen: DE + EN
- [x] Content-Strategie: Payload CMS zweisprachig
- [ ] URL-Struktur für EN: Gleiche Slugs oder übersetzt?
- [ ] goldenwing.us: Redirect zu .at/en oder eigenständig?

### Offene Fragen:
1. Sollen Testimonials aus CMS kommen oder statisch bleiben?
2. Wie soll mit bestehenden Blog-Posts umgegangen werden? Alle übersetzen oder nur Top 10?
3. Gibt es Budget für professionelle Übersetzung oder AI+Review?

---

*Aktualisiert: 17. Dezember 2025*
