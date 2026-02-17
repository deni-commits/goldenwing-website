# GoldenWing Website Audit Report
**Datum:** 26. Dezember 2025
**Geprüfte Seiten:** 107 (Deutsche Version)

---

## ZUSAMMENFASSUNG

| Issue | Anzahl | Priorität |
|-------|--------|-----------|
| Seiten OHNE JSON-LD Schema | 26 | HIGH |
| Seiten OHNE og:image | 92 | HIGH |
| Duplicate Title Pattern `| GoldenWing | GoldenWing` | 19 | MEDIUM |
| Title > 60 oder < 30 Zeichen | 67 | LOW |
| Seite OHNE H1 | 1 | HIGH |
| Seite OHNE meta description | 1 | HIGH |
| Seite OHNE canonical | 1 | HIGH |
| localhost URLs in Schema | 0 | ✅ OK |

---

## 1. SCHEMA MARKUP (26 Seiten ohne Schema)

### Blog Kategorien (6)
- /blog/kategorie/branding
- /blog/kategorie/marketing
- /blog/kategorie/seo
- /blog/kategorie/technologie
- /blog/kategorie/ui-ux
- /blog/kategorie/webdesign

### Projekte (13)
- /projekte (Übersicht)
- /projekte/alinea-partners
- /projekte/atta-pallet
- /projekte/derbotaniker
- /projekte/domoferm
- /projekte/erkurt-gartengestaltung
- /projekte/glaeser-law
- /projekte/inspire
- /projekte/lamberg
- /projekte/point-of-new
- /projekte/simax
- /projekte/tet-group
- /projekte/turbo-mango
- /projekte/umzugsreif

### Rechtliches & Ressourcen (5)
- /datenschutz
- /impressum
- /rechtliches/cookie-einstellungen
- /ressourcen/downloads
- /ressourcen/newsletter

### Sonstiges (1)
- /standorte

**Empfehlung:**
- Blog Kategorien → `CollectionPage` Schema
- Projekte → `CreativeWork` oder `WebPage` Schema
- Rechtliches → `WebPage` Schema (low priority)

---

## 2. OPEN GRAPH IMAGE (92 Seiten ohne og:image)

Fast alle Seiten haben kein explizites og:image Tag. Das Next.js opengraph-image.tsx sollte als Fallback dienen, aber es wäre besser, spezifische OG Images zu haben.

**Empfehlung:**
- Globales Fallback OG Image sicherstellen
- Für wichtige Seiten spezifische OG Images erstellen

---

## 3. DUPLICATE TITLE PATTERN (19 Seiten)

Folgende Seiten haben `| GoldenWing | GoldenWing` im Title:

- /haeufige-fragen
- /kontakt
- /kreativagentur-wien
- /leistungen/pakete/brand-web-foundation
- /leistungen/pakete/individuelles-paket
- /referenzen (und alle 10 Unterkategorien)
- /seo-agentur-wien
- /ueber-uns/standorte
- /webdesign-wien

**Empfehlung:** Titel-Template anpassen, doppeltes `| GoldenWing` entfernen

---

## 4. TITLE LÄNGE (67 Seiten außerhalb 30-60 Zeichen)

### Zu kurz (< 30 Zeichen):
- /blog/kategorie/seo (23 chars)
- /blog/kategorie/ui-ux (25 chars)
- /blog/kategorie/branding (28 chars)
- /blog/kategorie/marketing (29 chars)
- /blog/kategorie/webdesign (29 chars)

### Zu lang (> 60 Zeichen):
- Viele Blog Posts, Referenzen, Service-Seiten

**Empfehlung:**
- Kategorie-Titel erweitern: "Branding Tipps & Insights | Blog | GoldenWing"
- Lange Titel kürzen wo möglich

---

## 5. KRITISCHE EINZELFEHLER

### /standorte (Redirect-Seite?)
- ❌ Kein Title
- ❌ Keine Meta Description
- ❌ Kein H1
- ❌ Kein Canonical
- ❌ Kein Schema

**Empfehlung:** Diese Seite prüfen - ist sie ein 301 Redirect oder eine echte Seite?

---

## 6. WAS FUNKTIONIERT ✅

- Alle Service-Seiten haben Schema
- Keine localhost URLs in Schemas
- Alle Sub-Services haben korrekte URLs
- Local SEO Seiten (kreativagentur, webdesign, seo-agentur) haben Schema
- Blog Posts haben Schema
- Breadcrumbs funktionieren

---

## PRIORITÄTEN

### P1 - Sofort (heute)
1. `/standorte` Seite fixen oder als Redirect konfigurieren
2. Duplicate Title Pattern fixen (19 Seiten)

### P2 - Diese Woche
3. Schema für alle 13 Projekt-Seiten hinzufügen
4. Schema für Blog-Kategorien hinzufügen

### P3 - Nächste Woche
5. OG Images für wichtige Seiten
6. Title-Längen optimieren

### P4 - Nice to have
7. Schema für Rechtliches (optional)
8. Schema für Ressourcen-Seiten

---

## TECHNISCHE DETAILS

### Empfohlene Schemas nach Seitentyp:

```typescript
// Projekt-Seite
{
  "@type": "CreativeWork",
  "name": "Projektname",
  "description": "...",
  "url": "https://goldenwing.be/projekte/slug",
  "creator": { "@type": "Organization", "name": "GoldenWing Creative Studios" },
  "client": { "@type": "Organization", "name": "Kundenname" }
}

// Blog-Kategorie
{
  "@type": "CollectionPage",
  "name": "Kategorie Name",
  "description": "...",
  "url": "https://goldenwing.be/blog/kategorie/slug"
}
```

---

*Report generiert am 26.12.2025*
