/**
 * Update Post 7 Content - Bilder für Web optimieren
 */

const Database = require('better-sqlite3');

function text(content, format = 0) {
  return { type: "text", text: content, format, mode: "normal", style: "", detail: 0, version: 1 };
}

function link(url, linkText, isExternal = false) {
  return {
    type: "link", url, children: [text(linkText)], direction: "ltr", format: "", indent: 0, version: 1,
    rel: isExternal ? "noopener noreferrer" : null, target: isExternal ? "_blank" : null
  };
}

function heading(tag, children) {
  return { type: "heading", tag, children: Array.isArray(children) ? children : [text(children)], direction: "ltr", format: "", indent: 0, version: 1 };
}

function paragraph(children) {
  return { type: "paragraph", children: Array.isArray(children) ? children : [text(children)], direction: "ltr", format: "", indent: 0, textFormat: 0, version: 1 };
}

function bulletList(items) {
  return {
    type: "list", listType: "bullet",
    children: items.map((item, i) => ({ type: "listitem", children: Array.isArray(item) ? item : [text(item)], direction: "ltr", format: "", indent: 0, value: i + 1, version: 1 })),
    direction: "ltr", format: "", indent: 0, start: 1, tag: "ul", version: 1
  };
}

function quote(children) {
  return { type: "quote", children: Array.isArray(children) ? children : [paragraph(children)], direction: "ltr", format: "", indent: 0, version: 1 };
}

const post7ContentDE = {
  root: {
    type: "root",
    children: [
      heading("h2", "Bilder für Web optimieren: Der komplette Praxis-Guide 2025"),

      paragraph([
        text("Bilder machen durchschnittlich 50% des Gesamtgewichts einer Website aus. Laut "),
        link("https://httparchive.org/reports/page-weight", "HTTP Archive", true),
        text(" liegt die durchschnittliche Bildgröße pro Seite bei 900 KB. Nicht optimierte Bilder sind der häufigste Grund für langsame Websites – und langsame Websites verlieren Kunden.")
      ]),

      paragraph([
        text("In diesem Guide zeigen wir Ihnen Schritt für Schritt, wie Sie Bilder optimal für das Web aufbereiten – für bessere Performance, bessere "),
        link("/blog/core-web-vitals-optimieren-guide", "Core Web Vitals"),
        text(" und bessere Google-Rankings.")
      ]),

      heading("h2", "Warum Bildoptimierung so wichtig ist"),

      bulletList([
        [text("Ladezeit:", 1), text(" Google bestätigt: 53% der mobilen Nutzer verlassen Seiten, die länger als 3 Sekunden laden")],
        [text("SEO:", 1), text(" Core Web Vitals sind Ranking-Faktor, und LCP wird oft von Bildern beeinflusst")],
        [text("Conversion:", 1), text(" Jede Sekunde zusätzliche Ladezeit reduziert Conversions um ca. 7%")],
        [text("Mobile Daten:", 1), text(" Nicht jeder hat unbegrenztes Datenvolumen – schonen Sie Ihre Nutzer")],
        [text("Hosting-Kosten:", 1), text(" Weniger Datenvolumen = niedrigere Kosten")]
      ]),

      quote([
        paragraph([
          text("\"The fastest HTTP request is the one not made.\" — Steve Souders, Performance-Experte", 2)
        ])
      ]),

      heading("h2", "Die richtigen Bildformate verstehen"),

      heading("h3", "JPEG (.jpg, .jpeg)"),

      paragraph([
        text("Bestes Format für:", 1),
        text(" Fotografien, komplexe Bilder mit vielen Farben und Farbverläufen.")
      ]),

      paragraph([text("Eigenschaften:", 1)]),
      bulletList([
        "Verlustbehaftete Komprimierung (Qualität vs. Dateigröße)",
        "Keine Transparenz möglich",
        "Gut für Hintergrundbilder, Produktfotos, Teamfotos"
      ]),

      paragraph([
        text("Qualitätsempfehlung:", 1),
        text(" 70-85% Qualität ist meist der Sweet Spot – kaum sichtbarer Unterschied, deutlich kleinere Dateien.")
      ]),

      heading("h3", "PNG (.png)"),

      paragraph([
        text("Bestes Format für:", 1),
        text(" Grafiken mit Transparenz, Screenshots, Logos, Bilder mit Text.")
      ]),

      paragraph([text("Eigenschaften:", 1)]),
      bulletList([
        "Verlustfreie Komprimierung",
        "Unterstützt Transparenz (Alpha-Kanal)",
        "Größere Dateien als JPEG bei Fotos",
        "Ideal für: Logos, Icons, Screenshots"
      ]),

      paragraph([
        text("Tipp:", 1),
        text(" Nutzen Sie PNG-8 statt PNG-24 wenn möglich (8-Bit = 256 Farben reichen oft).")
      ]),

      heading("h3", "WebP"),

      paragraph([
        text("Das moderne Format:", 1),
        text(" Von Google entwickelt, kombiniert das Beste aus JPEG und PNG.")
      ]),

      paragraph([text("Eigenschaften:", 1)]),
      bulletList([
        "25-35% kleiner als JPEG bei gleicher Qualität",
        "Unterstützt Transparenz (wie PNG)",
        "Unterstützt Animation (wie GIF)",
        "Wird von allen modernen Browsern unterstützt"
      ]),

      paragraph([
        text("Empfehlung:", 1),
        text(" WebP sollte Ihr Standard-Format für Web sein. Fallback auf JPEG/PNG für ältere Browser.")
      ]),

      heading("h3", "AVIF"),

      paragraph([
        text("Das Format der Zukunft:", 1),
        text(" Noch effizienter als WebP, aber weniger Browser-Support.")
      ]),

      paragraph([text("Eigenschaften:", 1)]),
      bulletList([
        "50% kleiner als JPEG",
        "Bessere Qualität bei extremer Komprimierung",
        "Langsamere Kodierung",
        "Unterstützung: Chrome, Firefox, Safari 16+"
      ]),

      paragraph([
        text("Einsatz:", 1),
        text(" Als primäres Format mit WebP und JPEG als Fallback. Ideal für Performance-kritische Seiten.")
      ]),

      heading("h3", "SVG"),

      paragraph([
        text("Für Vektorgrafiken:", 1),
        text(" Logos, Icons, Illustrationen, die skalierbar sein müssen.")
      ]),

      paragraph([text("Eigenschaften:", 1)]),
      bulletList([
        "Vektorgrafik (skaliert ohne Qualitätsverlust)",
        "Oft sehr kleine Dateigröße",
        "Kann mit CSS gestylt werden",
        "Nicht für Fotos geeignet"
      ]),

      heading("h2", "Schritt-für-Schritt: Bilder richtig optimieren"),

      heading("h3", "Schritt 1: Die richtige Größe wählen"),

      paragraph([
        text("Regel Nr. 1:", 1),
        text(" Laden Sie nie ein größeres Bild als benötigt. Ein 5000x3000px Bild für einen 800px-Container ist Verschwendung.")
      ]),

      paragraph([text("Richtwerte für typische Anwendungsfälle:", 1)]),
      bulletList([
        "Hero-Bild (Full-Width): max. 2000px breit",
        "Blog-Artikelbild: max. 1200px breit",
        "Produktbild: max. 800px breit",
        "Thumbnail: max. 400px breit"
      ]),

      paragraph([
        text("Profi-Tipp:", 1),
        text(" Responsive Images nutzen. Liefern Sie verschiedene Größen je nach Bildschirm (srcset-Attribut).")
      ]),

      heading("h3", "Schritt 2: Format wählen"),

      paragraph([text("Entscheidungsbaum:", 1)]),
      bulletList([
        "Foto/komplexes Bild → WebP (Fallback: JPEG)",
        "Grafik mit Transparenz → WebP (Fallback: PNG)",
        "Einfaches Logo/Icon → SVG",
        "Animation → WebP oder optimiertes GIF"
      ]),

      heading("h3", "Schritt 3: Komprimieren"),

      paragraph([
        text("Tools für die Bildkomprimierung:", 1)
      ]),

      paragraph([text("Online-Tools (kostenlos):", 1)]),
      bulletList([
        [link("https://squoosh.app", "Squoosh.app", true), text(" – Google's Tool, sehr flexibel")],
        [link("https://tinypng.com", "TinyPNG", true), text(" – Einfach, gut für Batch-Verarbeitung")],
        [link("https://imageoptim.com", "ImageOptim", true), text(" – Mac Desktop App")]
      ]),

      paragraph([text("Automatisierte Lösungen:", 1)]),
      bulletList([
        "Cloudinary – CDN mit automatischer Optimierung",
        "Imgix – Bild-CDN mit Transformationen",
        "Next.js Image Component – Automatische Optimierung"
      ]),

      paragraph([text("Komprimierungseinstellungen:", 1)]),
      bulletList([
        "JPEG: 70-85% Qualität",
        "WebP: 75-85% Qualität",
        "PNG: Maximale Komprimierung (verlustfrei)"
      ]),

      heading("h3", "Schritt 4: Responsive Images implementieren"),

      paragraph([
        text("Nutzen Sie das srcset-Attribut für responsive Bilder:")
      ]),

      paragraph([
        text("<img src=\"bild-800.jpg\" srcset=\"bild-400.jpg 400w, bild-800.jpg 800w, bild-1200.jpg 1200w\" sizes=\"(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px\">", 2)
      ]),

      paragraph([
        text("Der Browser wählt automatisch die passende Größe basierend auf Bildschirmgröße und Pixel-Dichte.")
      ]),

      heading("h3", "Schritt 5: Lazy Loading aktivieren"),

      paragraph([
        text("Bilder, die nicht sofort sichtbar sind, sollten verzögert laden:")
      ]),

      paragraph([
        text("<img src=\"bild.jpg\" loading=\"lazy\">", 2)
      ]),

      paragraph([
        text("Wichtig:", 1),
        text(" Das Hero-Bild (Above the Fold) sollte NICHT lazy loaded werden – es beeinflusst den LCP.")
      ]),

      heading("h3", "Schritt 6: Bildmaße angeben"),

      paragraph([
        text("Immer width und height angeben, um "),
        link("/blog/core-web-vitals-optimieren-guide", "CLS (Layout Shifts)"),
        text(" zu vermeiden:")
      ]),

      paragraph([
        text("<img src=\"bild.jpg\" width=\"800\" height=\"600\">", 2)
      ]),

      paragraph([
        text("Alternativ: CSS aspect-ratio Property nutzen.")
      ]),

      heading("h2", "Spezialfälle und Best Practices"),

      heading("h3", "Hero-Bilder optimieren"),

      paragraph([
        text("Das Hero-Bild ist oft der LCP-Kandidat. So optimieren Sie es:")
      ]),

      bulletList([
        [text("Preload:", 1), text(" <link rel=\"preload\" as=\"image\" href=\"hero.webp\">")],
        [text("Priorität:", 1), text(" fetchpriority=\"high\" setzen")],
        [text("Kein Lazy Loading:", 1), text(" Das Hero muss sofort laden")],
        [text("Richtige Größe:", 1), text(" Nicht größer als 2000px breit")],
        [text("WebP mit JPEG-Fallback:", 1), text(" <picture>-Element nutzen")]
      ]),

      heading("h3", "Hintergrundbilder optimieren"),

      paragraph([
        text("CSS-Hintergrundbilder sind schwieriger zu optimieren:")
      ]),

      bulletList([
        "image-set() für responsive Hintergründe nutzen",
        "Komprimiertes WebP bevorzugen",
        "Bei großen Hintergründen: CSS-Gradient als Fallback während des Ladens"
      ]),

      heading("h3", "Icons und Logos"),

      paragraph([
        text("Für Icons und Logos ist SVG fast immer die beste Wahl:")
      ]),

      bulletList([
        "SVG-Sprites für viele Icons",
        "Inline SVG für wichtige Icons (spart HTTP-Request)",
        "Icon-Fonts als Alternative (aber größere Dateigröße)"
      ]),

      heading("h3", "E-Commerce: Produktbilder"),

      paragraph([
        text("Produktbilder sind conversion-kritisch:")
      ]),

      bulletList([
        "Hohe Qualität beibehalten (80-90%)",
        "Zoom-Funktion: Größere Version bei Bedarf nachladen",
        "Mehrere Ansichten: Lazy Loading für nicht-primäre Bilder",
        "Schema Markup für Produktbilder nicht vergessen"
      ]),

      heading("h2", "Tools und Workflow für effiziente Bildoptimierung"),

      heading("h3", "Workflow für Design-Teams"),

      bulletList([
        "Export aus Figma/Photoshop in 2x Größe",
        "Durch Squoosh oder Ähnliches laufen lassen",
        "In WebP und JPEG exportieren",
        "Im CMS: Automatische Größen-Generierung"
      ]),

      heading("h3", "Automatisierung mit Build-Tools"),

      paragraph([
        text("Für Entwickler:", 1),
        text(" Integrieren Sie Bildoptimierung in Ihren Build-Prozess:")
      ]),

      bulletList([
        "sharp (Node.js) – Schnelle Bildverarbeitung",
        "imagemin (webpack) – Plugin für Build-Prozess",
        "Next.js Image – Automatische Optimierung"
      ]),

      heading("h3", "CMS-Integration"),

      paragraph([
        text("Moderne CMS optimieren Bilder automatisch. Bei "),
        link("/leistungen/webdesign", "unseren Website-Projekten"),
        text(" nutzen wir:")
      ]),

      bulletList([
        "Next.js Image Component mit automatischer WebP-Konvertierung",
        "Payload CMS mit eingebauter Bildverarbeitung",
        "Cloudinary für größere Projekte"
      ]),

      heading("h2", "Checkliste: Bild-Optimierung"),

      bulletList([
        "[ ] Richtige Größe (nicht größer als nötig)",
        "[ ] Modernes Format (WebP mit Fallback)",
        "[ ] Komprimiert (70-85% Qualität)",
        "[ ] Responsive Images (srcset)",
        "[ ] Lazy Loading für Below-the-Fold",
        "[ ] width/height Attribute gesetzt",
        "[ ] Hero-Bild preloaded",
        "[ ] Alt-Texte für SEO und Accessibility",
        "[ ] Dateinamen aussagekräftig (SEO)"
      ]),

      heading("h2", "Häufig gestellte Fragen"),

      heading("h3", "Wie stark kann ich Bilder komprimieren, ohne sichtbaren Qualitätsverlust?"),
      paragraph("Bei JPEG und WebP sind 70-85% Qualität meist der Sweet Spot. Testen Sie visuell – manche Bilder vertragen mehr Komprimierung als andere. Fotos mit vielen Details brauchen höhere Qualität als einfache Grafiken."),

      heading("h3", "Sollte ich alle Bilder auf WebP umstellen?"),
      paragraph("Ja, WebP sollte Ihr Standard sein. Aber liefern Sie immer einen JPEG/PNG-Fallback für ältere Browser (unter 1% Marktanteil, aber besser als kaputte Bilder)."),

      heading("h3", "Wie teste ich, ob meine Bilder gut optimiert sind?"),
      paragraph([
        text("Nutzen Sie "),
        link("https://pagespeed.web.dev", "PageSpeed Insights", true),
        text(". Es zeigt konkret, welche Bilder zu groß sind und wie viel Sie sparen können.")
      ]),

      heading("h3", "Was ist mit Retina/HiDPI-Displays?"),
      paragraph("Liefern Sie 2x-Bilder für Retina, aber in komprimierter Qualität (60-70%). Ein 2x-Bild in niedriger Qualität sieht oft besser aus als ein 1x-Bild in hoher Qualität."),

      heading("h3", "Beeinflusst Bildoptimierung SEO?"),
      paragraph([
        text("Absolut. Core Web Vitals sind Ranking-Faktor, und LCP wird oft von Bildern bestimmt. Plus: Optimierte Bilder verbessern User Experience, was indirekt SEO beeinflusst. Vergessen Sie auch nicht Alt-Texte für Bild-SEO.")
      ]),

      heading("h3", "Wie optimiere ich Bilder für Social Media Sharing?"),
      paragraph("Open Graph Images sollten 1200x630px sein (Facebook/LinkedIn) oder 1200x600px (Twitter). Diese können größer sein als normale Website-Bilder, da sie gecacht werden."),

      heading("h3", "Was ist das <picture>-Element und wann nutze ich es?"),
      paragraph([
        text("Das <picture>-Element ermöglicht Art Direction (verschiedene Bilder für verschiedene Bildschirmgrößen) und Format-Fallbacks. Nutzen Sie es, wenn Sie AVIF > WebP > JPEG Fallbacks brauchen oder unterschiedliche Bildausschnitte für Mobile/Desktop.")
      ]),

      paragraph([
        text("Brauchen Sie Hilfe bei der Performance-Optimierung Ihrer Website? "),
        link("/kontakt", "Kontaktieren Sie uns"),
        text(" für eine kostenlose Analyse.")
      ])
    ],
    direction: "ltr", format: "", indent: 0, version: 1
  }
};

const post7ContentEN = {
  root: {
    type: "root",
    children: [
      heading("h2", "Optimizing Images for Web: The Complete Practical Guide 2025"),

      paragraph([
        text("Images make up an average of 50% of a website's total weight. According to "),
        link("https://httparchive.org/reports/page-weight", "HTTP Archive", true),
        text(", the average image size per page is 900 KB. Unoptimized images are the most common reason for slow websites – and slow websites lose customers.")
      ]),

      paragraph([
        text("In this guide, we show you step by step how to optimally prepare images for the web – for better performance, better "),
        link("/blog/core-web-vitals-optimization-guide", "Core Web Vitals"),
        text(" and better Google rankings.")
      ]),

      heading("h2", "Why Image Optimization is So Important"),

      bulletList([
        [text("Loading time:", 1), text(" Google confirms: 53% of mobile users leave pages that take longer than 3 seconds to load")],
        [text("SEO:", 1), text(" Core Web Vitals are a ranking factor, and LCP is often influenced by images")],
        [text("Conversion:", 1), text(" Every additional second of loading time reduces conversions by about 7%")],
        [text("Mobile data:", 1), text(" Not everyone has unlimited data – spare your users")],
        [text("Hosting costs:", 1), text(" Less data volume = lower costs")]
      ]),

      quote([
        paragraph([
          text("\"The fastest HTTP request is the one not made.\" — Steve Souders, Performance Expert", 2)
        ])
      ]),

      heading("h2", "Understanding the Right Image Formats"),

      heading("h3", "JPEG (.jpg, .jpeg)"),

      paragraph([
        text("Best format for:", 1),
        text(" Photographs, complex images with many colors and gradients.")
      ]),

      paragraph([text("Characteristics:", 1)]),
      bulletList([
        "Lossy compression (quality vs. file size)",
        "No transparency possible",
        "Good for background images, product photos, team photos"
      ]),

      paragraph([
        text("Quality recommendation:", 1),
        text(" 70-85% quality is usually the sweet spot – barely visible difference, significantly smaller files.")
      ]),

      heading("h3", "PNG (.png)"),

      paragraph([
        text("Best format for:", 1),
        text(" Graphics with transparency, screenshots, logos, images with text.")
      ]),

      paragraph([text("Characteristics:", 1)]),
      bulletList([
        "Lossless compression",
        "Supports transparency (alpha channel)",
        "Larger files than JPEG for photos",
        "Ideal for: Logos, icons, screenshots"
      ]),

      paragraph([
        text("Tip:", 1),
        text(" Use PNG-8 instead of PNG-24 when possible (8-bit = 256 colors often sufficient).")
      ]),

      heading("h3", "WebP"),

      paragraph([
        text("The modern format:", 1),
        text(" Developed by Google, combines the best of JPEG and PNG.")
      ]),

      paragraph([text("Characteristics:", 1)]),
      bulletList([
        "25-35% smaller than JPEG at same quality",
        "Supports transparency (like PNG)",
        "Supports animation (like GIF)",
        "Supported by all modern browsers"
      ]),

      paragraph([
        text("Recommendation:", 1),
        text(" WebP should be your standard format for web. Fallback to JPEG/PNG for older browsers.")
      ]),

      heading("h3", "AVIF"),

      paragraph([
        text("The format of the future:", 1),
        text(" Even more efficient than WebP, but less browser support.")
      ]),

      paragraph([text("Characteristics:", 1)]),
      bulletList([
        "50% smaller than JPEG",
        "Better quality at extreme compression",
        "Slower encoding",
        "Support: Chrome, Firefox, Safari 16+"
      ]),

      paragraph([
        text("Usage:", 1),
        text(" As primary format with WebP and JPEG as fallback. Ideal for performance-critical pages.")
      ]),

      heading("h3", "SVG"),

      paragraph([
        text("For vector graphics:", 1),
        text(" Logos, icons, illustrations that need to be scalable.")
      ]),

      paragraph([text("Characteristics:", 1)]),
      bulletList([
        "Vector graphic (scales without quality loss)",
        "Often very small file size",
        "Can be styled with CSS",
        "Not suitable for photos"
      ]),

      heading("h2", "Step by Step: Properly Optimizing Images"),

      heading("h3", "Step 1: Choose the Right Size"),

      paragraph([
        text("Rule #1:", 1),
        text(" Never load a larger image than needed. A 5000x3000px image for an 800px container is waste.")
      ]),

      paragraph([text("Guidelines for typical use cases:", 1)]),
      bulletList([
        "Hero image (full-width): max. 2000px wide",
        "Blog article image: max. 1200px wide",
        "Product image: max. 800px wide",
        "Thumbnail: max. 400px wide"
      ]),

      paragraph([
        text("Pro tip:", 1),
        text(" Use responsive images. Deliver different sizes depending on screen (srcset attribute).")
      ]),

      heading("h3", "Step 2: Choose Format"),

      paragraph([text("Decision tree:", 1)]),
      bulletList([
        "Photo/complex image → WebP (fallback: JPEG)",
        "Graphic with transparency → WebP (fallback: PNG)",
        "Simple logo/icon → SVG",
        "Animation → WebP or optimized GIF"
      ]),

      heading("h3", "Step 3: Compress"),

      paragraph([
        text("Tools for image compression:", 1)
      ]),

      paragraph([text("Online tools (free):", 1)]),
      bulletList([
        [link("https://squoosh.app", "Squoosh.app", true), text(" – Google's tool, very flexible")],
        [link("https://tinypng.com", "TinyPNG", true), text(" – Simple, good for batch processing")],
        [link("https://imageoptim.com", "ImageOptim", true), text(" – Mac desktop app")]
      ]),

      paragraph([text("Automated solutions:", 1)]),
      bulletList([
        "Cloudinary – CDN with automatic optimization",
        "Imgix – Image CDN with transformations",
        "Next.js Image Component – Automatic optimization"
      ]),

      paragraph([text("Compression settings:", 1)]),
      bulletList([
        "JPEG: 70-85% quality",
        "WebP: 75-85% quality",
        "PNG: Maximum compression (lossless)"
      ]),

      heading("h3", "Step 4: Implement Responsive Images"),

      paragraph([
        text("Use the srcset attribute for responsive images:")
      ]),

      paragraph([
        text("<img src=\"image-800.jpg\" srcset=\"image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w\" sizes=\"(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px\">", 2)
      ]),

      paragraph([
        text("The browser automatically chooses the appropriate size based on screen size and pixel density.")
      ]),

      heading("h3", "Step 5: Enable Lazy Loading"),

      paragraph([
        text("Images not immediately visible should load delayed:")
      ]),

      paragraph([
        text("<img src=\"image.jpg\" loading=\"lazy\">", 2)
      ]),

      paragraph([
        text("Important:", 1),
        text(" The hero image (above the fold) should NOT be lazy loaded – it affects LCP.")
      ]),

      heading("h3", "Step 6: Specify Image Dimensions"),

      paragraph([
        text("Always specify width and height to avoid "),
        link("/blog/core-web-vitals-optimization-guide", "CLS (Layout Shifts)"),
        text(":")
      ]),

      paragraph([
        text("<img src=\"image.jpg\" width=\"800\" height=\"600\">", 2)
      ]),

      paragraph([
        text("Alternatively: Use CSS aspect-ratio property.")
      ]),

      heading("h2", "Special Cases and Best Practices"),

      heading("h3", "Optimizing Hero Images"),

      paragraph([
        text("The hero image is often the LCP candidate. Here's how to optimize it:")
      ]),

      bulletList([
        [text("Preload:", 1), text(" <link rel=\"preload\" as=\"image\" href=\"hero.webp\">")],
        [text("Priority:", 1), text(" Set fetchpriority=\"high\"")],
        [text("No lazy loading:", 1), text(" Hero must load immediately")],
        [text("Right size:", 1), text(" No wider than 2000px")],
        [text("WebP with JPEG fallback:", 1), text(" Use <picture> element")]
      ]),

      heading("h3", "Optimizing Background Images"),

      paragraph([
        text("CSS background images are harder to optimize:")
      ]),

      bulletList([
        "Use image-set() for responsive backgrounds",
        "Prefer compressed WebP",
        "For large backgrounds: CSS gradient as fallback while loading"
      ]),

      heading("h3", "Icons and Logos"),

      paragraph([
        text("For icons and logos, SVG is almost always the best choice:")
      ]),

      bulletList([
        "SVG sprites for many icons",
        "Inline SVG for important icons (saves HTTP request)",
        "Icon fonts as alternative (but larger file size)"
      ]),

      heading("h3", "E-Commerce: Product Images"),

      paragraph([
        text("Product images are conversion-critical:")
      ]),

      bulletList([
        "Maintain high quality (80-90%)",
        "Zoom function: Load larger version on demand",
        "Multiple views: Lazy loading for non-primary images",
        "Don't forget schema markup for product images"
      ]),

      heading("h2", "Tools and Workflow for Efficient Image Optimization"),

      heading("h3", "Workflow for Design Teams"),

      bulletList([
        "Export from Figma/Photoshop at 2x size",
        "Run through Squoosh or similar",
        "Export in WebP and JPEG",
        "In CMS: Automatic size generation"
      ]),

      heading("h3", "Automation with Build Tools"),

      paragraph([
        text("For developers:", 1),
        text(" Integrate image optimization into your build process:")
      ]),

      bulletList([
        "sharp (Node.js) – Fast image processing",
        "imagemin (webpack) – Plugin for build process",
        "Next.js Image – Automatic optimization"
      ]),

      heading("h3", "CMS Integration"),

      paragraph([
        text("Modern CMS optimize images automatically. In "),
        link("/services/web-design", "our website projects"),
        text(" we use:")
      ]),

      bulletList([
        "Next.js Image Component with automatic WebP conversion",
        "Payload CMS with built-in image processing",
        "Cloudinary for larger projects"
      ]),

      heading("h2", "Checklist: Image Optimization"),

      bulletList([
        "[ ] Right size (not larger than necessary)",
        "[ ] Modern format (WebP with fallback)",
        "[ ] Compressed (70-85% quality)",
        "[ ] Responsive images (srcset)",
        "[ ] Lazy loading for below-the-fold",
        "[ ] width/height attributes set",
        "[ ] Hero image preloaded",
        "[ ] Alt texts for SEO and accessibility",
        "[ ] Descriptive file names (SEO)"
      ]),

      heading("h2", "Frequently Asked Questions"),

      heading("h3", "How much can I compress images without visible quality loss?"),
      paragraph("For JPEG and WebP, 70-85% quality is usually the sweet spot. Test visually – some images tolerate more compression than others. Photos with many details need higher quality than simple graphics."),

      heading("h3", "Should I convert all images to WebP?"),
      paragraph("Yes, WebP should be your standard. But always provide a JPEG/PNG fallback for older browsers (under 1% market share, but better than broken images)."),

      heading("h3", "How do I test if my images are well optimized?"),
      paragraph([
        text("Use "),
        link("https://pagespeed.web.dev", "PageSpeed Insights", true),
        text(". It specifically shows which images are too large and how much you can save.")
      ]),

      heading("h3", "What about Retina/HiDPI displays?"),
      paragraph("Deliver 2x images for Retina, but at compressed quality (60-70%). A 2x image at low quality often looks better than a 1x image at high quality."),

      heading("h3", "Does image optimization affect SEO?"),
      paragraph([
        text("Absolutely. Core Web Vitals are a ranking factor, and LCP is often determined by images. Plus: Optimized images improve user experience, which indirectly affects SEO. Don't forget alt texts for image SEO either.")
      ]),

      heading("h3", "How do I optimize images for social media sharing?"),
      paragraph("Open Graph images should be 1200x630px (Facebook/LinkedIn) or 1200x600px (Twitter). These can be larger than regular website images since they get cached."),

      heading("h3", "What is the <picture> element and when do I use it?"),
      paragraph([
        text("The <picture> element enables art direction (different images for different screen sizes) and format fallbacks. Use it when you need AVIF > WebP > JPEG fallbacks or different image crops for mobile/desktop.")
      ]),

      paragraph([
        text("Need help with your website's performance optimization? "),
        link("/contact", "Contact us"),
        text(" for a free analysis.")
      ])
    ],
    direction: "ltr", format: "", indent: 0, version: 1
  }
};

async function updatePost7() {
  const dbPath = process.argv[2] || './goldenwing.db';
  console.log('🚀 Updating Post 7 Content (DE + EN)...');

  try {
    const db = new Database(dbPath);

    const stmtDE = db.prepare(`UPDATE posts_locales SET content = ? WHERE _parent_id = 7 AND _locale = 'de'`);
    const resultDE = stmtDE.run(JSON.stringify(post7ContentDE));
    console.log('✅ DE Updated rows:', resultDE.changes);

    const stmtEN = db.prepare(`UPDATE posts_locales SET content = ? WHERE _parent_id = 7 AND _locale = 'en'`);
    const resultEN = stmtEN.run(JSON.stringify(post7ContentEN));
    console.log('✅ EN Updated rows:', resultEN.changes);

    const verify = db.prepare(`SELECT _locale, length(content) as len FROM posts_locales WHERE _parent_id = 7`).all();
    verify.forEach(v => console.log(`📊 ${v._locale}: ${v.len} characters`));

    db.close();
    console.log('✅ Post 7 content updated successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePost7();
