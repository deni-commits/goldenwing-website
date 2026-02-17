# Link-Audit Report — 2026-02-07

## Zusammenfassung

| Kategorie | Anzahl |
|-----------|--------|
| DE Seiten geprüft | 200+ |
| EN Seiten geprüft | 130+ |
| Hub Pages geprüft | 18 |
| **Gesamt geprüft** | **350+** |

---

## Gefundene Probleme

### 1. ✅ BEHOBEN: 8 EN Industry Links

Die `/en/industries/*` Seiten sind jetzt erreichbar:

| URL | Status |
|-----|--------|
| `/en/industries/healthcare` | ✅ 200 |
| `/en/industries/legal` | ✅ 200 |
| `/en/industries/ecommerce` | ✅ 200 |
| `/en/industries/b2b` | ✅ 200 |
| `/en/industries/startups` | ✅ 200 |
| `/en/industries/hospitality` | ✅ 200 |
| `/en/industries/real-estate` | ✅ 200 |
| `/en/industries/services` | ✅ 200 |

**Ursache war:** Fehlende path translations in `src/i18n/routing.ts`

**Fix (deployed 2026-02-07):**
- 7 fehlende Branchen-Routes zu routing.ts hinzugefügt
- aerzte: `doctors` → `healthcare` korrigiert (Sitemap-Konsistenz)

---

### 2. Redirects (3x)

| Von | Nach | Typ |
|-----|------|-----|
| `/uae` | `/vae` | URL-Normalisierung |
| `/leistungen/wordpress-agentur` | `/leistungen/web-app-entwicklung` | Service-Konsolidierung |
| `/web-design-abu-dhabi` | `/webdesign-abu-dhabi` | URL-Normalisierung |

**Empfehlung:** Sitemap aktualisieren, um nur kanonische URLs zu verwenden.

---

### 3. ✅ BEHOBEN: Kaputte Bilder (38 Dateien)

Bilder waren in `/var/www/goldenwing-uploads/media/` statt `/var/www/goldenwing/public/media/`.

**Fix (deployed 2026-02-07):**
1. 38 Bilder von Backup-Ordner kopiert
2. Dateinamen-Case-Mismatches korrigiert (DB vs. Filesystem)
3. Cloudflare Cache gepurged

Alle Bilder laden jetzt korrekt ✅

---

### 4. Soft 404 Problem

Nicht-existierende URLs unter `/projekte/` und `/blog/` geben HTTP 200 statt 404 zurück.

**Beispiel:** `/projekte/fake-project` → 200 OK (zeigt generische Seite)

**SEO-Impact:** Kann zu Crawl-Problemen führen.

**Fix:** Proper 404 handling in dynamischen Routes implementieren.

---

### 5. Sprach-Inkonsistenz (EN Seiten)

Viele EN-Seiten enthalten Links zu DE-URLs statt EN-Äquivalenten:

- `/en/services/*` → Links zu `/leistungen/*`
- `/en/industries` → Links zu `/branchen/*`
- `/en/comparisons` → Links zu `/beste-*`
- `/en/about-us/team` → Links zu `/ueber-uns/team/*`

**Fix:** Link-Komponenten locale-aware machen.

---

## Was funktioniert ✅

### DE Seiten (alle OK)
- Homepage, Kontakt, Leistungen, Referenzen, Blog
- 22 Service-Seiten unter /leistungen/
- 38 Projekt-Seiten unter /projekte/
- 27 Standort-Seiten unter /standorte/
- 21+ Blog-Artikel
- 97+ Lexikon-Einträge
- 9 Branchen-Seiten unter /branchen/
- 17 Vergleichs-Seiten (/beste-*-agenturen-wien)
- 50+ regionale Service-Seiten
- 5 Tool-Seiten
- 5 Über-uns Unterseiten

### EN Seiten (größtenteils OK)
- Alle Hauptseiten
- Alle Service-Seiten
- Alle Projekt-Seiten
- Alle Standort-Seiten
- Blog und Glossar

### Hub Pages (alle OK)
- /wissen + /wissen/guides + 4 Guide-Seiten
- /branchen + 8 Branchen-Seiten
- /vergleiche
- /standorte + alle Unter-Seiten

---

## Prioritäten

| Prio | Problem | Status |
|------|---------|--------|
| ~~1~~ | ~~8 EN Industry 404s fixen~~ | ✅ BEHOBEN |
| ~~2~~ | ~~Kaputte Bilder reparieren~~ | ✅ BEHOBEN |
| 3 | Sitemap Redirects entfernen | Offen |
| 4 | Sprach-Links korrigieren | Offen |
| 5 | Soft 404 implementieren | Offen |

---

## Generierte Reports

- `broken-links-report.md` — Detaillierter DE-Audit
- `link-audit-report.md` — Detaillierter EN-Audit
- `docs/LINK-AUDIT-2026-02-07.md` — Diese Zusammenfassung

---

*Audit durchgeführt am 2026-02-07 mit Claude Code*
