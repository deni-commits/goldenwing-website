# Bilder für Web optimieren: Der komplette Guide 2025

## Warum Bildoptimierung wichtig ist

Bilder machen durchschnittlich **60% der Seitengröße** aus – sie sind damit der größte Hebel für Website-Performance. Optimierte Bilder bedeuten:

- **Schnellere Ladezeiten** – direkte Auswirkung auf Conversion Rate
- **Bessere Core Web Vitals** – besonders LCP (Largest Contentful Paint)
- **Niedrigere Hosting-Kosten** – weniger Bandbreite, weniger Speicher
- **Bessere User Experience** – niemand wartet gerne auf ladende Bilder
- **Bessere SEO** – Google belohnt schnelle Seiten

> **Fakt:** Durch moderne Formate wie WebP/AVIF und richtige Kompression kann die Bildlast um **50-80%** reduziert werden – ohne sichtbaren Qualitätsverlust.

---

## Core Web Vitals und Bilder

Die Core Web Vitals sind Googles wichtigste Metriken für User Experience. Bilder beeinflussen zwei davon direkt:

### LCP (Largest Contentful Paint)
Das größte sichtbare Element beim Laden – meist ein Bild. **Zielwert: unter 2,5 Sekunden.**

> **Google empfiehlt:** „Largest Contentful Paint (LCP) should occur within the first 2.5 seconds of the page starting to load" für eine gute User Experience.
> — [Google Search Central](https://developers.google.com/search/docs/appearance/core-web-vitals)

### CLS (Cumulative Layout Shift)
Layout-Verschiebungen durch Bilder ohne definierte Dimensionen. **Zielwert: unter 0,1.**

---

## Bildformate im Vergleich 2025

| Format | Kompression | Transparenz | Animation | Browser-Support | Ideal für |
|--------|-------------|-------------|-----------|-----------------|-----------|
| **AVIF** | ⭐⭐⭐⭐⭐ | ✅ | ✅ | 94% | Fotos, Hero-Bilder |
| **WebP** | ⭐⭐⭐⭐ | ✅ | ✅ | 97% | Allrounder |
| **JPEG** | ⭐⭐⭐ | ❌ | ❌ | 100% | Fallback |
| **PNG** | ⭐⭐ | ✅ | ❌ | 100% | Grafiken mit Transparenz |
| **SVG** | ⭐⭐⭐⭐⭐ | ✅ | ✅ | 100% | Icons, Logos, Illustrationen |

---

## AVIF: Das beste Format 2025

AVIF wurde als Nachfolger von WebP entwickelt und bietet die beste Kompression aller Bildformate:

- **50% kleiner** als JPEG bei gleicher visueller Qualität
- Unterstützt **HDR** und Wide Color Gamut
- **94% Browser-Unterstützung** (Stand 2025)
- Ideal für fotolastige Websites und Hero-Bilder

**Nachteil:** Längere Encoding-Zeit – daher im Build-Prozess einplanen, nicht on-the-fly konvertieren.

### WebP: Der zuverlässige Allrounder

WebP bleibt ein exzellentes Format mit breitester Unterstützung:

- **30% kleiner** als JPEG bei gleicher Qualität
- Unterstützt Transparenz (wie PNG)
- Unterstützt Animation (wie GIF)
- **97% Browser-Unterstützung** – der sicherste Allrounder

**Empfehlung:** AVIF als erste Wahl, WebP als Fallback, JPEG als letzter Fallback.

---

## Das picture-Element: Format-Fallbacks richtig implementieren

Moderne Browser können selbst das beste Format wählen:

```html
<picture>
  <source srcset="bild.avif" type="image/avif">
  <source srcset="bild.webp" type="image/webp">
  <img
    src="bild.jpg"
    alt="Beschreibender Alt-Text"
    width="800"
    height="600"
    loading="lazy"
  >
</picture>
```

Der Browser lädt automatisch das erste unterstützte Format – AVIF wenn möglich, sonst WebP, sonst JPEG.

---

## fetchpriority: Das unterschätzte LCP-Geheimnis

Für das wichtigste Bild (meist Hero-Image) sollten Sie die Lade-Priorität erhöhen:

```html
<img
  src="hero.webp"
  fetchpriority="high"
  width="1200"
  height="630"
  alt="Hero-Bild der Startseite"
>
```

> **Statistik:** Laut Web Almanac nutzen nur **15% der Websites** das fetchpriority-Attribut – **85% verpassen diese einfache Optimierung!**

**Wichtig:** Nur für 1-2 Bilder pro Seite verwenden. Wenn alles "high priority" hat, ist nichts priorisiert.

---

## Responsive Images mit srcset

Liefern Sie verschiedene Bildgrößen für verschiedene Bildschirme:

```html
<img
  src="bild-800.webp"
  srcset="
    bild-400.webp 400w,
    bild-800.webp 800w,
    bild-1200.webp 1200w,
    bild-1920.webp 1920w
  "
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Beschreibender Alt-Text"
  width="1920"
  height="1080"
  loading="lazy"
>
```

**sizes erklärt:**
- Auf Bildschirmen unter 600px: Bild nimmt 100% der Viewport-Breite ein
- Auf größeren Bildschirmen: Bild nimmt 50% der Viewport-Breite ein

Der Browser wählt dann automatisch die passende Bildgröße.

---

## Optimierungs-Checkliste

### ✅ Richtige Größe
- Nicht größer als nötig (max. 1920px Breite für Full-Width)
- Responsive Images mit srcset verwenden
- 2x Auflösung für Retina-Displays berücksichtigen

### ✅ Format wählen
- **Fotos:** AVIF → WebP → JPEG (Fallback-Kette)
- **Grafiken mit Transparenz:** WebP oder PNG
- **Icons/Logos:** SVG (immer!)
- **Animationen:** WebP oder optimiertes GIF

### ✅ Kompression
- Qualität 80-85% für Fotos (visuell kaum unterscheidbar)
- Tools: Squoosh, TinyPNG, ImageOptim
- Automatisierung: Next.js Image, Cloudinary, Imgix

### ✅ Lazy Loading richtig einsetzen
- Bilder **below-the-fold**: `loading="lazy"`
- Bilder **above-the-fold**: `loading="eager"` (oder Attribut weglassen)
- Hero-Bild: zusätzlich `fetchpriority="high"`

### ✅ Dimensionen immer angeben
- **Immer** width und height setzen
- Verhindert Layout Shifts (CLS)
- Ermöglicht Browser-Optimierungen

---

## Häufige Fehler vermeiden

### ⛔ NIEMALS das LCP-Bild lazy-loaden

> **Google Web.dev warnt:** „Never lazy-load your LCP image, as that will always lead to unnecessary resource load delay, and will have a negative impact on LCP."

**Diese Bilder sollten NICHT lazy-loaded werden:**
- Hero-Bilder
- Das größte sichtbare Bild (LCP-Element)
- Logo im Header

### ⚠️ Vorsicht bei Progressive JPEGs

Progressive JPEGs sehen beim Laden "schöner" aus, können aber LCP verschlechtern:

> **Hintergrund:** Google misst LCP erst, wenn das Bild **vollständig** geladen ist. Progressive JPEGs laden in mehreren Durchgängen – das verzögert den LCP-Zeitpunkt.

**Empfehlung:** Für Hero-Bilder besser Standard-JPEGs oder WebP/AVIF verwenden.

### ❌ Zu viele "high priority" Ressourcen

Wenn Sie `fetchpriority="high"` auf viele Bilder setzen, konkurrieren sie alle um Bandbreite. Das Ergebnis: keines lädt schnell.

**Regel:** Maximal 1-2 Bilder pro Seite mit high priority.

---

## Next.js Image Best Practice

```jsx
import Image from 'next/image'

// Hero-Bild (LCP-Element)
<Image
  src="/hero.jpg"
  alt="Beschreibender Alt-Text"
  width={1200}
  height={630}
  priority // lädt sofort, kein lazy loading
  quality={85}
  sizes="100vw"
/>

// Bilder weiter unten
<Image
  src="/feature.jpg"
  alt="Feature-Bild"
  width={600}
  height={400}
  loading="lazy" // Standard bei Next.js
  quality={80}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Next.js Image Vorteile:**
- Automatische WebP/AVIF-Konvertierung
- Automatisches srcset
- Blur-Placeholder während dem Laden
- Automatische Größenoptimierung

---

## Tools für Bildoptimierung

### Online (kostenlos)
- **[Squoosh.app](https://squoosh.app)** – Google's Tool, exzellente Qualitätskontrolle
- **[TinyPNG](https://tinypng.com)** – Einfach und effektiv
- **[Compressor.io](https://compressor.io)** – Unterstützt viele Formate

### Desktop
- **ImageOptim** (Mac) – Batch-Optimierung
- **FileOptimizer** (Windows) – Kostenloses Power-Tool
- **GIMP** – Export-Optionen für alle Formate

### Automatisiert
- **Next.js Image Component** – Beste Lösung für Next.js
- **Cloudinary** – CDN + Transformation on-the-fly
- **Imgix** – Professionelle Bild-API
- **Sharp** (Node.js) – Build-Zeit-Optimierung

---

## Fazit

Bildoptimierung ist einer der **einfachsten und effektivsten Wege**, Ihre Website schneller zu machen. Die wichtigsten Punkte:

1. **AVIF nutzen** – das beste Format 2025, mit WebP als Fallback
2. **fetchpriority="high"** für das Hero-Bild setzen
3. **LCP-Bilder niemals lazy-loaden**
4. **Immer width/height** angeben für CLS-Vermeidung
5. **srcset verwenden** für responsive Bilder

Implementieren Sie diese Best Practices und Sie werden sofortige Verbesserungen bei Core Web Vitals und User Experience sehen.

---

*Dieser Beitrag wurde zuletzt am 29. Dezember 2025 aktualisiert und enthält die neuesten Best Practices basierend auf Google Web.dev Dokumentation und aktuellen Browser-Standards.*
