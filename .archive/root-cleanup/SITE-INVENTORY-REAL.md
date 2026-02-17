# GoldenWing Website - ECHTE Seiten-Inventur

**Erstellt:** 2026-01-29
**Quelle:** Lokale Datenbank (goldenwing.db) + Code

---

## 📊 ECHTE ZAHLEN AUS DATENBANK

### CMS Content (Payload)

| Collection | Anzahl | × 2 (DE+EN) | URLs |
|------------|--------|-------------|------|
| **Blog Posts** | 22 | × 2 | **44** |
| **Projects** | 38 | × 2 | **76** |
| **Services** | 6 | × 2 | **12** |
| **Sub-Services** | 27 | × 2 | **54** |
| **Categories** | 6 | × 2 | **12** |
| **Team Members** | 2 | × 2 | **4** |
| **CMS TOTAL** | **101** | | **202** |

### Code-basierter Content

| Quelle | Anzahl | × 2 (DE+EN) | URLs |
|--------|--------|-------------|------|
| **Lexikon Einträge** | 103 | × 2 | **206** |

### Statische Routes (sitemap.ts)

| Kategorie | Anzahl | × 2 (DE+EN) | URLs |
|-----------|--------|-------------|------|
| Homepage + Navigation | 6 | × 2 | 12 |
| Über Uns | 6 | × 2 | 12 |
| Standorte | 4 | × 2 | 8 |
| SEO Landing - Wien | 7 | × 2 | 14 |
| SEO Landing - Graz | 3 | × 2 | 6 |
| SEO Landing - Linz | 4 | × 2 | 8 |
| SEO Landing - Salzburg | 3 | × 2 | 6 |
| SEO Landing - Innsbruck | 3 | × 2 | 6 |
| SEO Landing - Deutschland | 7 | × 2 | 14 |
| SEO Landing - Schweiz | 3 | × 2 | 6 |
| SEO Landing - UAE/Dubai | 10 | × 2 | 20 |
| UAE Hub Pages | 4 | × 2 | 8 |
| Dubai Services | 5 | × 2 | 10 |
| Abu Dhabi Services | 5 | × 2 | 10 |
| Sharjah Services | 5 | × 2 | 10 |
| AEO Listicle Pages | 7 | × 2 | 14 |
| Tools | 6 | × 2 | 12 |
| Service Pakete | 5 | × 2 | 10 |
| Referenzen Kategorien | 10 | × 2 | 20 |
| Zusätzliche Service-Seiten | 10 | × 2 | 20 |
| Ressourcen | 4 | × 2 | 8 |
| Rechtliches | 3 | × 2 | 6 |
| **STATISCH TOTAL** | **~120** | | **~240** |

---

## 📈 GESAMT-BERECHNUNG

| Kategorie | URLs |
|-----------|------|
| Statische Routes | ~240 |
| CMS Dynamic (Posts, Projects, etc.) | 202 |
| Lexikon | 206 |
| **GESAMT** | **~648** |

---

## ⚠️ DIFFERENZ ZU "700+"

Du sagtest 700+ Seiten. Mögliche Gründe für die Differenz:

1. **Live-Datenbank hat mehr Content** als lokale DB
   - Lokale DB: 22 Posts → Live könnte mehr haben
   - Lokale DB: 38 Projects → Live könnte mehr haben

2. **Zusätzliche Seiten die ich nicht gezählt habe:**
   - Blog Pagination (`/blog/page/2`, `/blog/page/3`, etc.)
   - Projekt-Galerie-Seiten
   - Partner-Detail-Seiten

3. **RU-Übersetzungen** (falls live aktiv)
   - Würde die Zahlen ×1.5 multiplizieren

---

## 🔍 WAS MUSS GEPRÜFT WERDEN

### 1. Live vs. Lokal vergleichen

Die lokale Datenbank ist vom **17. Januar 2026**. Die Live-DB könnte mehr Content haben.

**Prüfen:**
```bash
# SSH auf Server und DB abfragen
ssh user@server "sqlite3 /var/www/goldenwing/goldenwing.db 'SELECT COUNT(*) FROM posts'"
```

### 2. Fehlende Seiten-Typen

Gibt es Seiten die nicht in der Sitemap sind?
- `/blog/page/[n]` - Pagination?
- `/referenzen/[kategorie]/page/[n]` - Pagination?
- `/suche` - Suchseite?

### 3. RU-Status klären

Ist Russisch live aktiv? Dann wären es:
- 648 × 1.5 = **972 URLs**

---

## 📋 EMPFEHLUNG

Um die **exakte Zahl** zu bekommen:

1. **Sitemap vom Server holen** (nicht über Web, sondern direkt):
   ```bash
   ssh user@server "cat /var/www/goldenwing/.next/server/sitemap.xml | grep -c '<url>'"
   ```

2. **Oder Build lokal ausführen** und Sitemap zählen:
   ```bash
   npm run build
   # Dann sitemap.xml prüfen
   ```

3. **Oder Screaming Frog / Ahrefs Crawl** auf der Live-Site

---

## 📁 DATENBANK-DETAILS

**Datei:** `goldenwing.db`
**Größe:** 4.5 MB
**Stand:** 2026-01-17

### Alle Tabellen mit Content:

| Tabelle | Einträge |
|---------|----------|
| posts | 22 |
| posts_locales | 44 |
| projects | 38 |
| projects_locales | 76 |
| services | 6 |
| services_locales | 12 |
| sub_services | 27 |
| sub_services_locales | 54 |
| categories | 6 |
| categories_locales | 12 |
| team_members | 2 |
| team_members_locales | 4 |
| media | 20 |
| testimonials | 1 |
| leads | 4 |
