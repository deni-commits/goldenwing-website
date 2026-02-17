import Database from 'better-sqlite3';

const db = new Database('./goldenwing.db');

// Get current content
const row = db.prepare("SELECT content FROM posts_locales WHERE _parent_id = 5 AND _locale = 'de'").get();
const content = JSON.parse(row.content);

// Helper to create text node
const text = (t, format = 0) => ({ type: "text", text: t, format, mode: "normal", style: "", detail: 0, version: 1 });
const bold = (t) => text(t, 1);

// Helper to create paragraph
const para = (children) => ({
  type: "paragraph",
  children: Array.isArray(children) ? children : [children],
  direction: "ltr",
  format: "",
  indent: 0,
  textFormat: 0,
  version: 1
});

// Helper to create heading
const heading = (tag, t) => ({
  type: "heading",
  tag,
  children: [text(t)],
  direction: "ltr",
  format: "",
  indent: 0,
  version: 1
});

// Create glossary section
const glossary = [
  heading("h2", "SEO-Glossar für Anfänger"),
  para(text("Die wichtigsten Begriffe aus diesem Artikel einfach erklärt:")),
  
  heading("h3", "A"),
  para([bold("Alt-Tag: "), text("Ein Alternativtext für Bilder, der beschreibt was auf dem Bild zu sehen ist. Wichtig für Suchmaschinen und sehbehinderte Nutzer. Beispiel: alt=\"Webdesigner arbeitet am Laptop\"")]),
  para([bold("Analytics: "), text("Werkzeuge zur Messung von Website-Daten wie Besucherzahlen, Verweildauer und Herkunft der Besucher. Google Analytics ist das bekannteste Tool.")]),
  para([bold("Anchor-Text: "), text("Der klickbare Text eines Links. Statt \"Klicken Sie hier\" sollte er beschreiben, wohin der Link führt, z.B. \"SEO-Tipps für Anfänger\".")]),
  
  heading("h3", "B"),
  para([bold("Backlink: "), text("Ein Link von einer anderen Website zu Ihrer. Je mehr hochwertige Backlinks, desto vertrauenswürdiger erscheint Ihre Seite für Google.")]),
  para([bold("Brand Mention: "), text("Wenn jemand Ihre Marke online erwähnt – auch ohne Link. Google erkennt diese Erwähnungen als Vertrauenssignal.")]),
  
  heading("h3", "C"),
  para([bold("Content: "), text("Alle Inhalte Ihrer Website – Texte, Bilder, Videos. Guter Content beantwortet Fragen Ihrer Besucher und bietet echten Mehrwert.")]),
  para([bold("Conversion: "), text("Wenn ein Besucher eine gewünschte Aktion durchführt – z.B. Kontaktformular ausfüllen, Produkt kaufen oder Newsletter abonnieren.")]),
  para([bold("Core Web Vitals: "), text("Googles Messwerte für Nutzererfahrung: Ladezeit (LCP), Interaktivität (INP) und visuelle Stabilität (CLS). Diese Werte beeinflussen das Ranking.")]),
  para([bold("Crawlability: "), text("Die Fähigkeit von Suchmaschinen, Ihre Website zu durchsuchen. Wenn Seiten nicht gecrawlt werden können, erscheinen sie nicht in Google.")]),
  para([bold("Crawler: "), text("Auch \"Bot\" oder \"Spider\" genannt. Programme von Google, die das Internet durchsuchen und Websites analysieren.")]),
  
  heading("h3", "D"),
  para([bold("Domain Authority (DA): "), text("Ein Wert von 0-100, der die Stärke einer Website einschätzt. Höhere Werte bedeuten bessere Ranking-Chancen. Wird von SEO-Tools wie Moz berechnet.")]),
  para([bold("Duplicate Content: "), text("Identischer oder sehr ähnlicher Inhalt auf verschiedenen URLs. Verwirrend für Google – vermeiden Sie es, den gleichen Text auf mehreren Seiten zu haben.")]),
  
  heading("h3", "H"),
  para([bold("Heading-Struktur: "), text("Die Hierarchie Ihrer Überschriften (H1, H2, H3...). Wie ein Inhaltsverzeichnis – hilft Lesern und Google, Ihren Content zu verstehen.")]),
  para([bold("HTTPS/SSL: "), text("Verschlüsselte Datenübertragung. Das Schloss-Symbol in der Browserleiste. Google bevorzugt sichere Websites und markiert HTTP-Seiten als \"nicht sicher\".")]),
  
  heading("h3", "I"),
  para([bold("Indexierung: "), text("Das Aufnehmen Ihrer Seite in Googles Datenbank. Nur indexierte Seiten können in Suchergebnissen erscheinen.")]),
  para([bold("Interne Verlinkung: "), text("Links innerhalb Ihrer eigenen Website. Hilft Besuchern und Google, weitere relevante Seiten zu finden.")]),
  
  heading("h3", "K"),
  para([bold("Keyword: "), text("Ein Suchbegriff, für den Sie gefunden werden möchten. Beispiel: \"Webdesign Wien\" oder \"SEO lernen\".")]),
  para([bold("Keyword Difficulty: "), text("Wie schwer es ist, für einen Begriff zu ranken. \"Webdesign\" (sehr schwer) vs. \"Webdesign Agentur Wien Ottakring\" (leichter).")]),
  para([bold("Keyword-Dichte: "), text("Wie oft ein Keyword im Verhältnis zum Gesamttext vorkommt. 1-2% ist ein guter Richtwert – mehr wirkt unnatürlich.")]),
  para([bold("Keyword Stuffing: "), text("Das übermäßige Verwenden von Keywords. Google erkennt und bestraft dies. Schreiben Sie natürlich für Menschen, nicht für Maschinen.")]),
  
  heading("h3", "L"),
  para([bold("Long-tail Keyword: "), text("Längere, spezifischere Suchbegriffe. \"Webdesign Agentur für Ärzte in Wien\" statt nur \"Webdesign\". Weniger Suchvolumen, aber höhere Conversion.")]),
  
  heading("h3", "M"),
  para([bold("Meta Description: "), text("Die Kurzbeschreibung unter dem Titel in Google-Ergebnissen. 150-160 Zeichen, die zum Klicken animieren sollen.")]),
  para([bold("Mobile-Friendliness: "), text("Wie gut Ihre Website auf Smartphones funktioniert. Google indexiert primär die mobile Version Ihrer Seite.")]),
  
  heading("h3", "O"),
  para([bold("On-Page SEO: "), text("Alle Optimierungen direkt auf Ihrer Website – Texte, Meta-Tags, Bilder, interne Links.")]),
  para([bold("Off-Page SEO: "), text("Optimierungen außerhalb Ihrer Website – hauptsächlich Backlinks und Markenerwähnungen.")]),
  para([bold("Organischer Traffic: "), text("Besucher, die über unbezahlte Suchergebnisse kommen. Im Gegensatz zu bezahlter Werbung (Google Ads).")]),
  
  heading("h3", "P-R"),
  para([bold("Page Speed: "), text("Wie schnell Ihre Website lädt. Langsame Seiten verlieren Besucher und ranken schlechter.")]),
  para([bold("Ranking: "), text("Ihre Position in den Suchergebnissen. Platz 1 bekommt ca. 30% aller Klicks, Platz 10 nur noch 2%.")]),
  para([bold("Robots.txt: "), text("Eine Datei, die Crawlern sagt, welche Bereiche Ihrer Website sie durchsuchen dürfen und welche nicht.")]),
  
  heading("h3", "S"),
  para([bold("Search Console: "), text("Kostenloses Google-Tool, das zeigt, wie Google Ihre Website sieht. Unverzichtbar für jeden Website-Betreiber.")]),
  para([bold("Search Intent: "), text("Die Absicht hinter einer Suchanfrage. Will jemand kaufen, sich informieren oder eine bestimmte Website finden?")]),
  para([bold("SERP: "), text("Search Engine Results Page – die Seite mit den Suchergebnissen bei Google.")]),
  para([bold("Sitemap: "), text("Eine XML-Datei, die alle wichtigen URLs Ihrer Website auflistet. Hilft Google, Ihre Seiten zu finden.")]),
  para([bold("Suchvolumen: "), text("Wie oft ein Begriff pro Monat gesucht wird. \"Webdesign\" hat mehr Suchvolumen als \"Webdesign Wien\".")]),
  
  heading("h3", "T-W"),
  para([bold("Title Tag: "), text("Der Seitentitel, der in Browser-Tabs und Google-Ergebnissen erscheint. Sehr wichtig für Rankings – Keyword am Anfang platzieren.")]),
  para([bold("Traffic: "), text("Die Anzahl der Besucher auf Ihrer Website.")]),
  para([bold("WebP: "), text("Ein modernes Bildformat von Google. Kleinere Dateien bei gleicher Qualität = schnellere Ladezeiten.")])
];

// Add glossary to content
content.root.children.push(...glossary);

// Update database
const newContent = JSON.stringify(content);
db.prepare("UPDATE posts_locales SET content = ? WHERE _parent_id = 5 AND _locale = 'de'").run(newContent);

console.log('German SEO post updated with glossary!');
console.log('Total sections:', content.root.children.length);

db.close();
