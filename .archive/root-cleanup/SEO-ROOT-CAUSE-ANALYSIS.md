# SEO Root Cause Analysis: Schwankende SEMrush Seitenzahlen

**Datum:** 2026-01-29
**Problem:** SEMrush zeigt wechselnde Seitenzahlen (350 → 750 → 988 → 315)
**Analyse-Ergebnis:** 315 Seiten gecrawlt, nur 16 EN-Seiten statt ~299

---

## Executive Summary

Die schwankenden SEMrush-Zahlen haben **3 Hauptursachen**:

1. **Bot-Handling in Middleware** - Bots erhalten DE-Rewrites statt EN-Seiten
2. **Client-seitige HreflangTags** - `'use client'` Component wird von Bots nicht ausgeführt
3. **Fehlende interne Verlinkung** - EN-Seiten sind "orphaned" (nur via Sitemap erreichbar)

---

## Detaillierte Analyse

### 1. Middleware Bot-Handling (KRITISCH)

**Datei:** `src/middleware.ts` (Zeilen 544-580)

```typescript
if (BOT_PATTERN.test(userAgent)) {
  // Bots überspringen intlMiddleware
  const hasLocalePrefix = pathname.startsWith('/en') || ...

  if (!hasLocalePrefix && pathname !== '/') {
    // REWRITE zu DE!
    url.pathname = `/de${pathname}`  // ← PROBLEM
    return NextResponse.rewrite(url)
  }
}
```

**Problem:**
- Wenn ein Bot einen Link ohne Locale-Prefix folgt (z.B. `/kontakt`), wird er zu `/de/kontakt` umgeschrieben
- Der Bot "sieht" nie die EN-Version
- Die interne Verlinkung zeigt auf DE-Pfade

**Auswirkung:**
- DE-Seiten: 299 (korrekt)
- EN-Seiten: 16 (nur die mit direktem `/en/` Prefix in Sitemap)

### 2. HreflangTags Component (WICHTIG)

**Datei:** `src/components/seo/hreflang-tags.tsx`

```typescript
'use client'  // ← Client-Component!

export function HreflangTags() {
  // Generiert hreflang Tags
  return (
    <>
      <link rel="alternate" hrefLang="de" href={deUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
    </>
  )
}
```

**Problem:**
- `'use client'` bedeutet: JavaScript muss ausgeführt werden
- Die meisten SEO-Bots führen kein JavaScript aus
- Bots sehen die hreflang-Tags nicht im Server-gerenderten HTML

**Layout-Kommentar (Zeile 23-24):**
```typescript
// NOTE: Hreflang tags are handled by individual page metadata.alternates
// Do NOT use HreflangTags component to avoid duplicates
```

**Status:** Die Page-Metadata hat `alternates` - das ist korrekt. Aber die Verlinkung fehlt.

### 3. Interne Verlinkung (KRITISCH)

**Alle internen Links verwenden DE-Pfade:**

```typescript
// src/components/layout/header.tsx
<Link href="/kontakt">  // ← DE-Pfad

// src/components/sections/hero-section.tsx
<Link href="/leistungen">  // ← DE-Pfad
<Link href="/referenzen">  // ← DE-Pfad
```

**Problem:**
- Der `Link` Component von next-intl übersetzt diese zu EN-Pfaden **nur wenn JavaScript aktiv ist**
- Für SSR sollte die Übersetzung server-seitig erfolgen
- Bots sehen nur DE-Links

---

## SEMrush Crawl-Ergebnis erklärt

| Metrik | Wert | Erklärung |
|--------|------|-----------|
| Total URLs | 315 | Nur DE + wenige EN mit direktem /en/ Link |
| DE Seiten | 299 | Alle korrekt verlinkt |
| EN Seiten | 16 | Nur via Sitemap, keine internen Links |
| Orphaned | 340 | EN-Seiten ohne interne Verlinkung |
| Redirects | 32 | Legacy-Redirects funktionieren |

**Warum schwanken die Zahlen?**
- Crawl-Tiefe: Mehr Tiefe = mehr Seiten entdeckt
- Sitemap-Verarbeitung: Mal werden alle Sitemap-URLs gecrawlt, mal nicht
- JavaScript-Rendering: Gelegentlich führt SEMrush JS aus

---

## Lösungsvorschläge

### Quick Fix (Sofort)

1. **Server-seitige Hreflang-Tags in Layout:**
   ```typescript
   // src/app/[locale]/(marketing)/layout.tsx
   export async function generateMetadata({ params }) {
     return {
       alternates: {
         languages: {
           de: 'https://goldenwing.at',
           en: 'https://goldenwing.at/en',
         },
       },
     }
   }
   ```

### Mittelfristig (1-2 Wochen)

2. **Language Switcher prominent im Header:**
   - Füge sichtbare `/en/` Links hinzu
   - Bots können dann EN-Seiten via Navigation finden

3. **Footer mit Sprach-Links:**
   ```html
   <a href="/en">English</a>
   <a href="/">Deutsch</a>
   ```

### Langfristig (Best Practice)

4. **Middleware-Anpassung für Bots:**
   ```typescript
   // Für Bots: Wenn /en/ im Referer, bleibe bei EN
   if (BOT_PATTERN.test(userAgent)) {
     // Prüfe ob Bot von EN-Seite kommt
     const referer = request.headers.get('referer')
     if (referer?.includes('/en/')) {
       // Behalte EN-Kontext
     }
   }
   ```

5. **Separate EN-Sitemap:**
   - `sitemap-de.xml` für DE-Seiten
   - `sitemap-en.xml` für EN-Seiten
   - Bots crawlen gezielter

---

## Priorisierte Action Items

| Prio | Task | Aufwand | Impact |
|------|------|---------|--------|
| 🔴 HIGH | Language Switcher in Header/Footer | 2h | Hoch |
| 🔴 HIGH | Server-seitige hreflang im Layout | 1h | Mittel |
| 🟡 MED | Middleware Referer-Check | 4h | Mittel |
| 🟢 LOW | Separate Sitemaps | 2h | Gering |

---

## Verifizierung nach Fixes

1. **Sofort prüfen:**
   ```bash
   curl -A "SemrushBot" https://goldenwing.at/en/contact | grep hreflang
   ```

2. **Nach 1 Woche:**
   - SEMrush Site Audit neu starten
   - Erwartung: ~600 Seiten (299 DE + 299 EN + Lexikon)

3. **Nach 2 Wochen:**
   - Google Search Console prüfen
   - Coverage Report für EN-Seiten

---

## Technische Details

### Aktuelle Architektur (Vereinfacht)

```
User Request
     ↓
Middleware
     ↓ (Bot detected?)
     ├─ YES: Skip intlMiddleware, Rewrite to /de/
     └─ NO: Use intlMiddleware, proper locale
     ↓
Page Render
     ↓
<Link href="/kontakt">
     ↓ (JS enabled?)
     ├─ YES: Resolve to /en/contact
     └─ NO: Stay as /kontakt → Bot follows to DE
```

### Gewünschte Architektur

```
User Request
     ↓
Middleware
     ↓ (Bot detected?)
     ├─ YES: Keep locale prefix, SSR hreflang
     └─ NO: Use intlMiddleware
     ↓
Page Render (SSR)
     ↓
Server renders correct locale links
     ↓
Bot sees /en/contact links on EN pages
```

---

**Erstellt:** Claude, 2026-01-29
**Nächster Review:** Nach Implementierung der Fixes
