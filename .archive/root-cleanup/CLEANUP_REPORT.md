# Database Cleanup Report

**Datum**: 2025-12-30
**Branch**: `cleanup/database-simplification`
**Status**: Erfolgreich abgeschlossen

## Zusammenfassung

| Metrik | Vorher | Nachher | Reduktion |
|--------|--------|---------|-----------|
| Tabellen | 195+ | 46 | -149 (76%) |
| DB-Größe | 3.7 MB | 1.1 MB | -70% |
| Collections | 14 | 11 | -3 |
| Globals | 20+ | 0 | -100% |

## Entfernte Collections

### 1. LocationDetails (Commit: 0f945b8)
- **Grund**: 0 Einträge, Standortseiten verwenden Defaults aus translations
- **Dateien entfernt**: `src/payload/collections/LocationDetails.ts`
- **Code angepasst**: `getLocationBySlug()` → returns `null`

### 2. Packages (Commit: 12b534c)
- **Grund**: 0 Einträge, Paketseiten verwenden Defaults aus translations
- **Dateien entfernt**: `src/payload/collections/Packages.ts`
- **Code angepasst**: `getPackages()`, `getPackageBySlug()` → returns `null`/`[]`

### 3. ReferenzCategories (Commit: 8eef1ab)
- **Grund**: 0 Einträge, Referenzseiten verwenden Defaults
- **Dateien entfernt**: `src/payload/collections/ReferenzCategories.ts`
- **Code angepasst**: `getReferenzCategoryBySlug()` → returns `null`

## Entfernte Felder

### Categories.color (Commit: 6055711)
- **Grund**: Alle Werte NULL, Farben sind hardcoded in Blog-Komponente
- **Feld-Definition entfernt** aus `Categories.ts`

### Projects.testimonial (Commit: 91646f3)
- **Grund**: Legacy-Feld, ersetzt durch `clientFeedback` Gruppe
- **Feld-Definition entfernt** aus `Projects.ts`

## Ghost-Globals Bereinigung

### Entfernte Tabellen (121 Stück)
Alle nicht-registrierten Global-Tabellen wurden aus der lokalen DB gelöscht:

- `home_page_*` (10 Tabellen)
- `about_page_*` (8 Tabellen)
- `contact_page_*` (5 Tabellen)
- `services_overview_page_*` (6 Tabellen)
- `blog_listing_page_*` (2 Tabellen)
- `projekte_listing_page_*` (2 Tabellen)
- `referenzen_overview_page_*` (5 Tabellen)
- `impressum_page_*` (2 Tabellen)
- `datenschutz_page_*` (5 Tabellen)
- `faq_page_*` (4 Tabellen)
- `newsletter_page_*` (8 Tabellen)
- `downloads_page_*` (4 Tabellen)
- `cookie_settings_page_*` (2 Tabellen)
- `culture_page_*` (7 Tabellen)
- `facts_figures_page_*` (4 Tabellen)
- `values_page_*` (6 Tabellen)
- `locations_overview_page_*` (4 Tabellen)
- `packages_overview_page_*` (2 Tabellen)
- `ressourcen_overview_page_*` (4 Tabellen)
- `kreativagentur_wien_page_*` (12 Tabellen)
- `webdesign_wien_page_*` (11 Tabellen)
- `seo_agentur_wien_page_*` (9 Tabellen)

### Entfernte Collection-Tabellen (28 Stück)
Orphaned Tables der entfernten Collections:

- `location_details_*` (9 Tabellen)
- `packages_*` (11 Tabellen)
- `referenz_categories_*` (8 Tabellen)

## Verbleibende Struktur

### 11 Aktive Collections
1. **Users** - Admin-Benutzer
2. **Media** - Bilder und Dateien
3. **Posts** - Blog-Artikel
4. **Projects** - Portfolio-Projekte
5. **Services** - Hauptleistungen
6. **SubServices** - Unterleistungen
7. **Categories** - Blog-Kategorien
8. **TeamMembers** - Team-Mitglieder
9. **Partners** - Partner-Logos (bereit für Daten)
10. **Testimonials** - Kundenstimmen
11. **Resources** - Downloads (bereit für Daten)

### 46 Datenbank-Tabellen
Alle Tabellen sind registriert und in Verwendung:
- Collection-Tabellen: 38
- Payload-System-Tabellen: 8

## Commits

| Commit | Beschreibung |
|--------|--------------|
| `0f945b8` | Remove LocationDetails collection |
| `12b534c` | Remove Packages collection |
| `8eef1ab` | Remove ReferenzCategories collection |
| `6055711` | Remove Categories.color field |
| `91646f3` | Remove Projects.testimonial field |

## Production Deployment

Die Schema-Änderungen sind committed. Für die Production-DB:

1. **Automatisch**: Payload ignoriert nicht-registrierte Tabellen
2. **Optional Cleanup**: Das gleiche SQL-Script lokal ausführen

```bash
# Backup erstellen
ssh root@72.62.52.70 "cp /var/www/goldenwing/goldenwing.db /var/www/goldenwing/goldenwing.db.backup"

# Oder: Frische DB deployen (überschreibt Inhalte!)
# scp goldenwing.db root@72.62.52.70:/var/www/goldenwing/
```

## Verifizierung

- [x] TypeScript Kompilierung: OK
- [x] Alle Pages verwenden Defaults: OK
- [x] Keine Breaking Changes: OK
- [x] Git Branch erstellt: `cleanup/database-simplification`

## Nächste Schritte

1. Branch nach main mergen
2. Normal deployen (nur Code, nicht DB)
3. Optional: Production-DB manuell bereinigen
4. Partners und Resources mit Daten füllen (wenn gewünscht)
