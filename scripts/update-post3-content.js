/**
 * Update Post 3 Content - Core Web Vitals Guide
 */

const Database = require('better-sqlite3');

// Helper functions
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

// German Content
const post3ContentDE = {
  root: {
    type: "root",
    children: [
      heading("h2", "Core Web Vitals: Warum sie 2025 über Ihren SEO-Erfolg entscheiden"),

      paragraph([
        text("Seit 2021 sind Core Web Vitals ein offizieller Google-Ranking-Faktor. Laut "),
        link("https://developers.google.com/search/docs/appearance/page-experience", "Google", true),
        text(" messen 73% der Nutzer die Qualität einer Website an ihrer Ladegeschwindigkeit. Eine langsame Website kostet Sie nicht nur Rankings, sondern auch Kunden – Amazon hat berechnet, dass jede 100ms Verzögerung 1% Umsatzverlust bedeutet.")
      ]),

      paragraph([
        text("In diesem Guide zeigen wir Ihnen Schritt für Schritt, wie Sie Ihre Core Web Vitals messen, verstehen und optimieren – mit praktischen Tipps, die wir bei "),
        link("/projekte", "dutzenden Kundenprojekten"),
        text(" erfolgreich umgesetzt haben.")
      ]),

      heading("h2", "Was sind Core Web Vitals? Die drei Metriken erklärt"),

      paragraph([
        text("Core Web Vitals sind drei spezifische Metriken, die die Nutzererfahrung Ihrer Website messen:")
      ]),

      heading("h3", "1. Largest Contentful Paint (LCP) – Ladezeit"),

      paragraph([
        text("Was es misst:", 1),
        text(" Wie lange es dauert, bis der größte sichtbare Content-Block geladen ist (meist ein Bild oder Textblock).")
      ]),

      paragraph([text("Bewertung:", 1)]),
      bulletList([
        [text("Gut:", 1), text(" unter 2,5 Sekunden")],
        [text("Verbesserungswürdig:", 1), text(" 2,5 bis 4,0 Sekunden")],
        [text("Schlecht:", 1), text(" über 4,0 Sekunden")]
      ]),

      paragraph([
        text("Warum es wichtig ist:", 1),
        text(" Der LCP zeigt, wann Nutzer den Hauptinhalt sehen können. Langsamer LCP = höhere Absprungrate.")
      ]),

      heading("h3", "2. First Input Delay (FID) → Interaction to Next Paint (INP)"),

      paragraph([
        text("Wichtig:", 1),
        text(" Seit März 2024 wurde FID durch INP ersetzt. INP ist strenger und misst die Reaktionsfähigkeit über die gesamte Session.")
      ]),

      paragraph([
        text("Was es misst:", 1),
        text(" Wie schnell die Seite auf Benutzerinteraktionen (Klicks, Tippen, Tastenanschläge) reagiert.")
      ]),

      paragraph([text("Bewertung:", 1)]),
      bulletList([
        [text("Gut:", 1), text(" unter 200 Millisekunden")],
        [text("Verbesserungswürdig:", 1), text(" 200 bis 500 Millisekunden")],
        [text("Schlecht:", 1), text(" über 500 Millisekunden")]
      ]),

      heading("h3", "3. Cumulative Layout Shift (CLS) – Visuelle Stabilität"),

      paragraph([
        text("Was es misst:", 1),
        text(" Wie stark sich Elemente auf der Seite während des Ladens verschieben (z.B. wenn Bilder oder Anzeigen nachladen).")
      ]),

      paragraph([text("Bewertung:", 1)]),
      bulletList([
        [text("Gut:", 1), text(" unter 0,1")],
        [text("Verbesserungswürdig:", 1), text(" 0,1 bis 0,25")],
        [text("Schlecht:", 1), text(" über 0,25")]
      ]),

      paragraph([
        text("Warum es wichtig ist:", 1),
        text(" Layout-Verschiebungen sind extrem frustrierend – z.B. wenn Sie auf einen Button klicken wollen und plötzlich eine Werbung einblendet.")
      ]),

      quote([
        paragraph([
          text("\"Speed is a feature, not a luxury. Users expect sites to be fast, and slow sites lose customers.\" — Addy Osmani, Engineering Manager bei Google Chrome", 2)
        ])
      ]),

      heading("h2", "So messen Sie Ihre Core Web Vitals"),

      paragraph("Es gibt mehrere Tools, um Ihre Werte zu überprüfen:"),

      heading("h3", "1. Google PageSpeed Insights (kostenlos)"),

      paragraph([
        text("Das wichtigste Tool. Unter "),
        link("https://pagespeed.web.dev", "pagespeed.web.dev", true),
        text(" geben Sie Ihre URL ein und erhalten Lab-Daten (simuliert) und Field-Daten (echte Nutzerdaten aus dem Chrome UX Report).")
      ]),

      paragraph([
        text("Pro-Tipp:", 1),
        text(" Field-Daten sind relevanter für Google, weil sie echte Nutzer widerspiegeln. Lab-Daten helfen beim Debugging.")
      ]),

      heading("h3", "2. Google Search Console"),

      paragraph([
        text("Unter \"Core Web Vitals\" im "),
        link("https://search.google.com/search-console", "Search Console", true),
        text(" sehen Sie, welche URLs Probleme haben. Google kategorisiert Ihre Seiten in: Gut, Verbesserungswürdig, Schlecht.")
      ]),

      heading("h3", "3. Lighthouse (in Chrome DevTools)"),

      paragraph("Öffnen Sie Chrome DevTools (F12), wechseln Sie zu \"Lighthouse\" und führen Sie einen Audit durch. Ideal für detaillierte technische Analysen."),

      heading("h3", "4. Web Vitals Chrome Extension"),

      paragraph([
        text("Die "),
        link("https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma", "Web Vitals Extension", true),
        text(" zeigt Echtzeit-Werte beim Browsen an.")
      ]),

      heading("h2", "LCP optimieren: Die 7 effektivsten Maßnahmen"),

      paragraph("Der Largest Contentful Paint ist oft das größte Problem. So verbessern Sie ihn:"),

      heading("h3", "1. Bilder optimieren"),

      paragraph([
        text("Bilder sind meist der Übeltäter. Unsere "),
        link("/blog/bilder-fuer-web-optimieren", "Anleitung zur Bildoptimierung"),
        text(" zeigt die Details, hier die Kurzversion:")
      ]),

      bulletList([
        [text("Moderne Formate:", 1), text(" WebP statt JPEG/PNG (30-50% kleiner)")],
        [text("Richtige Größe:", 1), text(" Bilder nicht größer als benötigt ausliefern")],
        [text("Lazy Loading:", 1), text(" Bilder außerhalb des Viewports verzögert laden")],
        [text("Preload:", 1), text(" Hero-Bild mit <link rel=\"preload\"> priorisieren")]
      ]),

      heading("h3", "2. Server Response Time verbessern (TTFB)"),

      paragraph("Time To First Byte sollte unter 200ms liegen:"),
      bulletList([
        "Besseres Hosting wählen (kein Shared Hosting für Business-Sites)",
        "CDN nutzen (Cloudflare, Fastly, AWS CloudFront)",
        "Caching aktivieren (Browser-Cache, Server-Cache)",
        "Datenbank-Queries optimieren"
      ]),

      heading("h3", "3. Critical CSS inline einbinden"),

      paragraph("Das CSS für den \"Above the fold\"-Bereich sollte direkt im HTML stehen, nicht in externen Dateien. Tools wie Critical CSS Generator helfen dabei."),

      heading("h3", "4. Render-Blocking Resources eliminieren"),

      paragraph([
        text("JavaScript und CSS, die das Rendering blockieren, verzögern den LCP:")
      ]),
      bulletList([
        "JS mit async oder defer laden",
        "Nicht kritisches CSS mit media-Attributen verzögern",
        "Third-Party-Scripts minimieren (Analytics, Chat-Widgets, etc.)"
      ]),

      heading("h3", "5. Font-Loading optimieren"),

      paragraph([
        text("Web-Fonts können den LCP stark beeinflussen:")
      ]),
      bulletList([
        "font-display: swap verwenden (Text sofort mit Fallback anzeigen)",
        "Fonts preloaden mit <link rel=\"preload\" as=\"font\">",
        "Nur benötigte Zeichensätze laden (subsetting)"
      ]),

      heading("h3", "6. Third-Party-Scripts aufräumen"),

      paragraph([
        text("Jedes externe Script kostet Performance: Analytics, Chatbots, Social Media Widgets, Retargeting Pixel... Fragen Sie sich: Brauche ich das wirklich?")
      ]),

      heading("h3", "7. Moderne Frameworks nutzen"),

      paragraph([
        text("Bei "),
        link("/leistungen/technische-loesungen", "GoldenWing"),
        text(" setzen wir auf Next.js und React Server Components für optimale Performance. Diese Website hat einen LCP unter 1,5 Sekunden.")
      ]),

      heading("h2", "INP optimieren: Reaktionsfähigkeit verbessern"),

      paragraph("Seit März 2024 ist INP der neue Standard. So optimieren Sie ihn:"),

      heading("h3", "1. JavaScript aufteilen (Code Splitting)"),

      paragraph("Laden Sie nicht den gesamten JS-Code auf einmal. Dynamische Imports und Route-basiertes Splitting helfen."),

      heading("h3", "2. Long Tasks vermeiden"),

      paragraph([
        text("JavaScript-Tasks über 50ms blockieren den Main Thread. Zerlegen Sie große Berechnungen mit requestIdleCallback oder Web Workers.")
      ]),

      heading("h3", "3. Event-Handler optimieren"),

      paragraph("Event-Handler sollten schnell sein. Schwere Operationen in requestAnimationFrame oder setTimeout auslagern."),

      heading("h3", "4. Third-Party-Scripts isolieren"),

      paragraph("Laden Sie Third-Party-Scripts in iframes oder mit Web Workers, um den Main Thread zu entlasten."),

      heading("h2", "CLS optimieren: Layout-Verschiebungen verhindern"),

      heading("h3", "1. Bildmaße immer angeben"),

      paragraph([
        text("Jedes <img> sollte width und height Attribute haben. Moderne Browser reservieren dann den Platz bevor das Bild lädt.")
      ]),

      heading("h3", "2. Platzhalter für dynamischen Content"),

      paragraph("Für Ads, Embeds und dynamisch geladene Inhalte: Reservieren Sie feste Bereiche mit min-height."),

      heading("h3", "3. Fonts stabilisieren"),

      paragraph([
        text("Mit font-display: optional oder swap und size-adjust verhindern Sie Font-bedingte Verschiebungen.")
      ]),

      heading("h3", "4. Animationen korrekt implementieren"),

      paragraph("Verwenden Sie transform und opacity statt width/height für Animationen. CSS containment (contain: layout) hilft zusätzlich."),

      heading("h2", "Quick Wins: Sofort umsetzbare Maßnahmen"),

      paragraph("Diese Optimierungen können Sie heute noch umsetzen:"),

      bulletList([
        [text("WebP-Bilder:", 1), text(" Konvertieren Sie alle Bilder zu WebP")],
        [text("Lazy Loading:", 1), text(" Fügen Sie loading=\"lazy\" zu allen Bildern hinzu")],
        [text("Preconnect:", 1), text(" <link rel=\"preconnect\"> für externe Domains")],
        [text("Gzip/Brotli:", 1), text(" Komprimierung auf dem Server aktivieren")],
        [text("Browser Caching:", 1), text(" Cache-Control Header setzen")]
      ]),

      heading("h2", "Case Study: GoldenWing Website Optimierung"),

      paragraph([
        text("Als wir unsere eigene Website auf Next.js 15 migriert haben, konnten wir die Core Web Vitals drastisch verbessern:")
      ]),

      paragraph([text("Vorher (WordPress):", 1)]),
      bulletList([
        "LCP: 4,2 Sekunden",
        "INP: 380ms",
        "CLS: 0,18"
      ]),

      paragraph([text("Nachher (Next.js 15):", 1)]),
      bulletList([
        "LCP: 1,4 Sekunden (-67%)",
        "INP: 95ms (-75%)",
        "CLS: 0,02 (-89%)"
      ]),

      paragraph([
        text("Das Ergebnis: Bessere Google-Rankings, niedrigere Bounce Rate und schnellere Seitenansichten. Wenn Sie ähnliche Ergebnisse wollen, sprechen Sie mit unseren "),
        link("/leistungen/seo-sichtbarkeit", "SEO-Experten"),
        text(".")
      ]),

      heading("h2", "Core Web Vitals und SEO: Der direkte Zusammenhang"),

      paragraph([
        text("Google hat bestätigt, dass Core Web Vitals ein Ranking-Faktor sind – aber wie stark?")
      ]),

      paragraph([
        text("Die Wahrheit:", 1),
        text(" Content-Qualität und Relevanz sind immer noch wichtiger. Aber bei zwei ähnlich relevanten Seiten gewinnt die schnellere. Außerdem: Gute Core Web Vitals → bessere User Experience → längere Verweildauer → bessere Rankings. Ein Kreislauf.")
      ]),

      paragraph([
        text("Unser Rat: Fixieren Sie sich nicht auf perfekte Scores, aber ignorieren Sie sie auch nicht. Alle drei Metriken im \"grünen Bereich\" sollte Ihr Ziel sein.")
      ]),

      heading("h2", "Häufig gestellte Fragen"),

      heading("h3", "Wie oft aktualisiert Google die Core Web Vitals Daten?"),
      paragraph("Field Data im Chrome UX Report wird monatlich aktualisiert, basiert aber auf einem 28-Tage-Rolling-Fenster. Änderungen brauchen also 4-6 Wochen, um sich in den Daten zu zeigen."),

      heading("h3", "Meine Lab-Daten sind gut, aber Field-Daten schlecht. Warum?"),
      paragraph("Lab-Daten werden unter idealen Bedingungen gemessen. Field-Daten kommen von echten Nutzern mit langsamen Geräten, schlechtem Internet oder vielen Tabs. Optimieren Sie für langsamere Geräte."),

      heading("h3", "Welche Core Web Vitals-Werte brauche ich für gute Rankings?"),
      paragraph([
        text("Google bewertet Seiten, bei denen mindestens 75% der Nutzer gute Werte haben, als \"bestanden\". Streben Sie an: LCP <2,5s, INP <200ms, CLS <0,1")
      ]),

      heading("h3", "Sind Core Web Vitals für Mobile und Desktop unterschiedlich?"),
      paragraph("Ja, Google bewertet Mobile und Desktop getrennt. Mobile-Werte sind oft schlechter wegen langsamerer Prozessoren und Netzwerke. Priorisieren Sie Mobile."),

      heading("h3", "Beeinflussen Third-Party-Widgets wie Chat-Bots die Core Web Vitals?"),
      paragraph("Absolut. Jedes Third-Party-Script kann LCP verzögern, INP verschlechtern und CLS verursachen. Laden Sie solche Widgets verzögert und außerhalb des kritischen Pfads."),

      heading("h3", "Was ist wichtiger: LCP, INP oder CLS?"),
      paragraph([
        text("Für SEO sind alle drei relevant. Für User Experience ist LCP oft am spürbarsten (langsames Laden nervt am meisten). CLS ist weniger häufig, aber extrem frustrierend wenn es passiert.")
      ]),

      heading("h3", "Kann ich Core Web Vitals mit einem Page Builder wie Elementor verbessern?"),
      paragraph([
        text("Schwierig. Page Builder erzeugen viel JavaScript und CSS. Sie können optimieren (Lazy Loading, Caching), aber werden nie so schnell wie eine custom-entwickelte Lösung. Für Performance-kritische Projekte empfehlen wir "),
        link("/leistungen/webdesign", "professionelle Webentwicklung"),
        text(".")
      ]),

      paragraph([
        text("Brauchen Sie Hilfe bei der Core Web Vitals Optimierung? "),
        link("/kontakt", "Kontaktieren Sie uns"),
        text(" für eine kostenlose Performance-Analyse Ihrer Website.")
      ])
    ],
    direction: "ltr", format: "", indent: 0, version: 1
  }
};

// English Content
const post3ContentEN = {
  root: {
    type: "root",
    children: [
      heading("h2", "Core Web Vitals: Why They Decide Your SEO Success in 2025"),

      paragraph([
        text("Since 2021, Core Web Vitals have been an official Google ranking factor. According to "),
        link("https://developers.google.com/search/docs/appearance/page-experience", "Google", true),
        text(", 73% of users measure website quality by loading speed. A slow website costs you not just rankings, but customers – Amazon calculated that every 100ms delay means 1% revenue loss.")
      ]),

      paragraph([
        text("In this guide, we'll show you step by step how to measure, understand, and optimize your Core Web Vitals – with practical tips we've successfully implemented in "),
        link("/projects", "dozens of client projects"),
        text(".")
      ]),

      heading("h2", "What Are Core Web Vitals? The Three Metrics Explained"),

      paragraph([
        text("Core Web Vitals are three specific metrics that measure your website's user experience:")
      ]),

      heading("h3", "1. Largest Contentful Paint (LCP) – Loading Time"),

      paragraph([
        text("What it measures:", 1),
        text(" How long it takes until the largest visible content block is loaded (usually an image or text block).")
      ]),

      paragraph([text("Rating:", 1)]),
      bulletList([
        [text("Good:", 1), text(" under 2.5 seconds")],
        [text("Needs Improvement:", 1), text(" 2.5 to 4.0 seconds")],
        [text("Poor:", 1), text(" over 4.0 seconds")]
      ]),

      paragraph([
        text("Why it matters:", 1),
        text(" LCP shows when users can see the main content. Slower LCP = higher bounce rate.")
      ]),

      heading("h3", "2. First Input Delay (FID) → Interaction to Next Paint (INP)"),

      paragraph([
        text("Important:", 1),
        text(" Since March 2024, FID has been replaced by INP. INP is stricter and measures responsiveness across the entire session.")
      ]),

      paragraph([
        text("What it measures:", 1),
        text(" How quickly the page responds to user interactions (clicks, taps, keystrokes).")
      ]),

      paragraph([text("Rating:", 1)]),
      bulletList([
        [text("Good:", 1), text(" under 200 milliseconds")],
        [text("Needs Improvement:", 1), text(" 200 to 500 milliseconds")],
        [text("Poor:", 1), text(" over 500 milliseconds")]
      ]),

      heading("h3", "3. Cumulative Layout Shift (CLS) – Visual Stability"),

      paragraph([
        text("What it measures:", 1),
        text(" How much elements on the page shift during loading (e.g., when images or ads load in).")
      ]),

      paragraph([text("Rating:", 1)]),
      bulletList([
        [text("Good:", 1), text(" under 0.1")],
        [text("Needs Improvement:", 1), text(" 0.1 to 0.25")],
        [text("Poor:", 1), text(" over 0.25")]
      ]),

      paragraph([
        text("Why it matters:", 1),
        text(" Layout shifts are extremely frustrating – e.g., when you want to click a button and suddenly an ad appears.")
      ]),

      quote([
        paragraph([
          text("\"Speed is a feature, not a luxury. Users expect sites to be fast, and slow sites lose customers.\" — Addy Osmani, Engineering Manager at Google Chrome", 2)
        ])
      ]),

      heading("h2", "How to Measure Your Core Web Vitals"),

      paragraph("There are several tools to check your values:"),

      heading("h3", "1. Google PageSpeed Insights (free)"),

      paragraph([
        text("The most important tool. At "),
        link("https://pagespeed.web.dev", "pagespeed.web.dev", true),
        text(" enter your URL and receive Lab Data (simulated) and Field Data (real user data from Chrome UX Report).")
      ]),

      paragraph([
        text("Pro tip:", 1),
        text(" Field data is more relevant for Google because it reflects real users. Lab data helps with debugging.")
      ]),

      heading("h3", "2. Google Search Console"),

      paragraph([
        text("Under \"Core Web Vitals\" in "),
        link("https://search.google.com/search-console", "Search Console", true),
        text(" you can see which URLs have problems. Google categorizes your pages into: Good, Needs Improvement, Poor.")
      ]),

      heading("h3", "3. Lighthouse (in Chrome DevTools)"),

      paragraph("Open Chrome DevTools (F12), switch to \"Lighthouse\" and run an audit. Ideal for detailed technical analysis."),

      heading("h3", "4. Web Vitals Chrome Extension"),

      paragraph([
        text("The "),
        link("https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma", "Web Vitals Extension", true),
        text(" shows real-time values while browsing.")
      ]),

      heading("h2", "Optimizing LCP: The 7 Most Effective Measures"),

      paragraph("Largest Contentful Paint is often the biggest problem. Here's how to improve it:"),

      heading("h3", "1. Optimize Images"),

      paragraph([
        text("Images are usually the culprit. Our "),
        link("/blog/image-optimization-for-web", "image optimization guide"),
        text(" shows the details, here's the short version:")
      ]),

      bulletList([
        [text("Modern formats:", 1), text(" WebP instead of JPEG/PNG (30-50% smaller)")],
        [text("Right size:", 1), text(" Don't serve images larger than needed")],
        [text("Lazy loading:", 1), text(" Load images outside viewport delayed")],
        [text("Preload:", 1), text(" Prioritize hero image with <link rel=\"preload\">")]
      ]),

      heading("h3", "2. Improve Server Response Time (TTFB)"),

      paragraph("Time To First Byte should be under 200ms:"),
      bulletList([
        "Choose better hosting (no shared hosting for business sites)",
        "Use CDN (Cloudflare, Fastly, AWS CloudFront)",
        "Enable caching (browser cache, server cache)",
        "Optimize database queries"
      ]),

      heading("h3", "3. Inline Critical CSS"),

      paragraph("CSS for the \"above the fold\" area should be directly in HTML, not in external files. Tools like Critical CSS Generator help with this."),

      heading("h3", "4. Eliminate Render-Blocking Resources"),

      paragraph([
        text("JavaScript and CSS that block rendering delay LCP:")
      ]),
      bulletList([
        "Load JS with async or defer",
        "Delay non-critical CSS with media attributes",
        "Minimize third-party scripts (analytics, chat widgets, etc.)"
      ]),

      heading("h3", "5. Optimize Font Loading"),

      paragraph([
        text("Web fonts can significantly affect LCP:")
      ]),
      bulletList([
        "Use font-display: swap (show text immediately with fallback)",
        "Preload fonts with <link rel=\"preload\" as=\"font\">",
        "Only load required character sets (subsetting)"
      ]),

      heading("h3", "6. Clean Up Third-Party Scripts"),

      paragraph([
        text("Every external script costs performance: analytics, chatbots, social media widgets, retargeting pixels... Ask yourself: Do I really need this?")
      ]),

      heading("h3", "7. Use Modern Frameworks"),

      paragraph([
        text("At "),
        link("/services/technical-solutions", "GoldenWing"),
        text(" we use Next.js and React Server Components for optimal performance. This website has an LCP under 1.5 seconds.")
      ]),

      heading("h2", "Optimizing INP: Improving Responsiveness"),

      paragraph("Since March 2024, INP is the new standard. Here's how to optimize it:"),

      heading("h3", "1. Split JavaScript (Code Splitting)"),

      paragraph("Don't load all JS code at once. Dynamic imports and route-based splitting help."),

      heading("h3", "2. Avoid Long Tasks"),

      paragraph([
        text("JavaScript tasks over 50ms block the main thread. Break up large calculations with requestIdleCallback or Web Workers.")
      ]),

      heading("h3", "3. Optimize Event Handlers"),

      paragraph("Event handlers should be fast. Offload heavy operations to requestAnimationFrame or setTimeout."),

      heading("h3", "4. Isolate Third-Party Scripts"),

      paragraph("Load third-party scripts in iframes or with Web Workers to relieve the main thread."),

      heading("h2", "Optimizing CLS: Preventing Layout Shifts"),

      heading("h3", "1. Always Specify Image Dimensions"),

      paragraph([
        text("Every <img> should have width and height attributes. Modern browsers then reserve space before the image loads.")
      ]),

      heading("h3", "2. Placeholders for Dynamic Content"),

      paragraph("For ads, embeds and dynamically loaded content: Reserve fixed areas with min-height."),

      heading("h3", "3. Stabilize Fonts"),

      paragraph([
        text("With font-display: optional or swap and size-adjust you prevent font-related shifts.")
      ]),

      heading("h3", "4. Implement Animations Correctly"),

      paragraph("Use transform and opacity instead of width/height for animations. CSS containment (contain: layout) also helps."),

      heading("h2", "Quick Wins: Measures You Can Implement Today"),

      paragraph("You can implement these optimizations today:"),

      bulletList([
        [text("WebP images:", 1), text(" Convert all images to WebP")],
        [text("Lazy loading:", 1), text(" Add loading=\"lazy\" to all images")],
        [text("Preconnect:", 1), text(" <link rel=\"preconnect\"> for external domains")],
        [text("Gzip/Brotli:", 1), text(" Enable compression on server")],
        [text("Browser caching:", 1), text(" Set Cache-Control headers")]
      ]),

      heading("h2", "Case Study: GoldenWing Website Optimization"),

      paragraph([
        text("When we migrated our own website to Next.js 15, we drastically improved Core Web Vitals:")
      ]),

      paragraph([text("Before (WordPress):", 1)]),
      bulletList([
        "LCP: 4.2 seconds",
        "INP: 380ms",
        "CLS: 0.18"
      ]),

      paragraph([text("After (Next.js 15):", 1)]),
      bulletList([
        "LCP: 1.4 seconds (-67%)",
        "INP: 95ms (-75%)",
        "CLS: 0.02 (-89%)"
      ]),

      paragraph([
        text("The result: Better Google rankings, lower bounce rate and faster page views. If you want similar results, talk to our "),
        link("/services/seo-visibility", "SEO experts"),
        text(".")
      ]),

      heading("h2", "Core Web Vitals and SEO: The Direct Connection"),

      paragraph([
        text("Google has confirmed that Core Web Vitals are a ranking factor – but how strong?")
      ]),

      paragraph([
        text("The truth:", 1),
        text(" Content quality and relevance are still more important. But between two similarly relevant pages, the faster one wins. Also: Good Core Web Vitals → better user experience → longer time on site → better rankings. A cycle.")
      ]),

      paragraph([
        text("Our advice: Don't obsess over perfect scores, but don't ignore them either. All three metrics in the \"green zone\" should be your goal.")
      ]),

      heading("h2", "Frequently Asked Questions"),

      heading("h3", "How often does Google update Core Web Vitals data?"),
      paragraph("Field Data in Chrome UX Report is updated monthly but is based on a 28-day rolling window. Changes need 4-6 weeks to show in the data."),

      heading("h3", "My Lab data is good, but Field data is poor. Why?"),
      paragraph("Lab data is measured under ideal conditions. Field data comes from real users with slow devices, poor internet, or many tabs. Optimize for slower devices."),

      heading("h3", "What Core Web Vitals values do I need for good rankings?"),
      paragraph([
        text("Google rates pages where at least 75% of users have good values as \"passing\". Aim for: LCP <2.5s, INP <200ms, CLS <0.1")
      ]),

      heading("h3", "Are Core Web Vitals different for Mobile and Desktop?"),
      paragraph("Yes, Google evaluates Mobile and Desktop separately. Mobile values are often worse due to slower processors and networks. Prioritize Mobile."),

      heading("h3", "Do third-party widgets like chatbots affect Core Web Vitals?"),
      paragraph("Absolutely. Every third-party script can delay LCP, worsen INP and cause CLS. Load such widgets delayed and outside the critical path."),

      heading("h3", "What's more important: LCP, INP or CLS?"),
      paragraph([
        text("For SEO, all three are relevant. For user experience, LCP is often most noticeable (slow loading annoys most). CLS is less frequent but extremely frustrating when it happens.")
      ]),

      heading("h3", "Can I improve Core Web Vitals with a page builder like Elementor?"),
      paragraph([
        text("Difficult. Page builders generate a lot of JavaScript and CSS. You can optimize (lazy loading, caching), but will never be as fast as a custom-developed solution. For performance-critical projects, we recommend "),
        link("/services/web-design", "professional web development"),
        text(".")
      ]),

      paragraph([
        text("Need help with Core Web Vitals optimization? "),
        link("/contact", "Contact us"),
        text(" for a free performance analysis of your website.")
      ])
    ],
    direction: "ltr", format: "", indent: 0, version: 1
  }
};

// Main function
async function updatePost3() {
  const dbPath = process.argv[2] || './goldenwing.db';
  console.log('🚀 Updating Post 3 Content (DE + EN)...');

  try {
    const db = new Database(dbPath);

    const stmtDE = db.prepare(`UPDATE posts_locales SET content = ? WHERE _parent_id = 3 AND _locale = 'de'`);
    const resultDE = stmtDE.run(JSON.stringify(post3ContentDE));
    console.log('✅ DE Updated rows:', resultDE.changes);

    const stmtEN = db.prepare(`UPDATE posts_locales SET content = ? WHERE _parent_id = 3 AND _locale = 'en'`);
    const resultEN = stmtEN.run(JSON.stringify(post3ContentEN));
    console.log('✅ EN Updated rows:', resultEN.changes);

    const verify = db.prepare(`SELECT _locale, length(content) as len FROM posts_locales WHERE _parent_id = 3`).all();
    verify.forEach(v => console.log(`📊 ${v._locale}: ${v.len} characters`));

    db.close();
    console.log('✅ Post 3 content updated successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePost3();
