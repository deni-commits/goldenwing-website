/**
 * Update Post 5 Content - SEO für Anfänger Guide
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

const post5ContentDE = {
  root: {
    type: "root",
    children: [
      heading("h2", "SEO verstehen: Der ultimative Einsteiger-Guide für 2025"),

      paragraph([
        text("93% aller Online-Erfahrungen beginnen mit einer Suchmaschine. Wenn Ihre Website nicht auf der ersten Google-Seite erscheint, existieren Sie für potenzielle Kunden praktisch nicht. "),
        link("https://www.brightedge.com/resources/research-reports", "Laut BrightEdge", true),
        text(" kommen 53% des Website-Traffics aus organischer Suche – mehr als aus allen anderen Quellen zusammen.")
      ]),

      paragraph([
        text("Die gute Nachricht: SEO ist keine Raketenwissenschaft. In diesem Guide erklären wir Ihnen alles, was Sie als Einsteiger wissen müssen – von den Grundlagen bis zu konkreten Maßnahmen, die Sie sofort umsetzen können.")
      ]),

      heading("h2", "Was ist SEO? Die Grundlagen einfach erklärt"),

      paragraph([
        text("SEO steht für ", 1),
        text("Search Engine Optimization", 2),
        text(" (Suchmaschinenoptimierung). Ziel ist es, Ihre Website so zu gestalten, dass sie bei relevanten Suchanfragen möglichst weit oben in den Ergebnissen erscheint.")
      ]),

      paragraph([
        text("Google verarbeitet täglich über "),
        link("https://blog.google", "8,5 Milliarden Suchanfragen", true),
        text(". Der Algorithmus bewertet jede Website anhand von über 200 Faktoren. Die wichtigsten Kategorien sind:")
      ]),

      bulletList([
        [text("On-Page SEO:", 1), text(" Alles, was Sie auf Ihrer Website kontrollieren (Content, Keywords, Meta-Tags)")],
        [text("Off-Page SEO:", 1), text(" Externe Signale (Backlinks, Social Signals, Erwähnungen)")],
        [text("Technisches SEO:", 1), text(" Wie gut Suchmaschinen Ihre Seite crawlen und verstehen können")],
        [text("User Experience:", 1), text(" Wie Nutzer mit Ihrer Website interagieren")]
      ]),

      quote([
        paragraph([
          text("\"The best place to hide a dead body is page 2 of Google search results.\" — Unbekannter SEO-Experte", 2)
        ])
      ]),

      heading("h2", "Wie funktioniert Google? Der Algorithmus verstehen"),

      paragraph("Google arbeitet in drei Schritten:"),

      heading("h3", "1. Crawling – Die Website entdecken"),

      paragraph([
        text("Googlebots (Spider) durchsuchen das Internet und finden neue Seiten über Links. Je mehr qualitative Links auf Ihre Seite zeigen, desto öfter wird sie gecrawlt.")
      ]),

      heading("h3", "2. Indexierung – Die Seite verstehen"),

      paragraph([
        text("Google analysiert den Inhalt jeder Seite: Text, Bilder, Videos. Die Informationen werden im Index gespeichert – einer gigantischen Datenbank aller bekannten Webseiten.")
      ]),

      heading("h3", "3. Ranking – Die Reihenfolge bestimmen"),

      paragraph([
        text("Bei jeder Suchanfrage wählt Google aus Milliarden von Seiten die relevantesten aus. Die Reihenfolge basiert auf Hunderten von Ranking-Faktoren.")
      ]),

      paragraph([
        text("Wichtig:", 1),
        text(" Google will die beste Antwort auf die Suchanfrage des Nutzers liefern. Wenn Sie das verstehen, verstehen Sie SEO.")
      ]),

      heading("h2", "On-Page SEO: Die wichtigsten Maßnahmen"),

      heading("h3", "1. Keywords richtig einsetzen"),

      paragraph([
        text("Keywords sind die Begriffe, nach denen Ihre Zielgruppe sucht. So finden Sie die richtigen:")
      ]),

      bulletList([
        [text("Google Autocomplete:", 1), text(" Tippen Sie einen Begriff ein und sehen Sie, was Google vorschlägt")],
        [text("Google Keyword Planner:", 1), text(" Kostenloses Tool mit Suchvolumen-Daten")],
        [text("Wettbewerber analysieren:", 1), text(" Für welche Keywords ranken Ihre Konkurrenten?")],
        [text("Kundenumfragen:", 1), text(" Fragen Sie Kunden, wie sie nach Ihren Leistungen suchen würden")]
      ]),

      paragraph([
        text("Das Keyword sollte erscheinen in:", 1)
      ]),
      bulletList([
        "Title Tag (H1) – einmal am Anfang",
        "Meta Description – natürlich eingebunden",
        "URL – kurz und prägnant",
        "Ersten 100 Wörtern des Textes",
        "H2/H3 Überschriften – wo sinnvoll",
        "Alt-Texten von Bildern"
      ]),

      paragraph([
        text("Warnung:", 1),
        text(" Keyword-Stuffing (übermäßige Wiederholung) schadet mehr als es nutzt. Schreiben Sie für Menschen, nicht für Bots.")
      ]),

      heading("h3", "2. Title Tags und Meta Descriptions optimieren"),

      paragraph([
        text("Der Title Tag ist der wichtigste On-Page-Faktor. Er erscheint als klickbare Überschrift in den Suchergebnissen.")
      ]),

      paragraph([text("Best Practices für Title Tags:", 1)]),
      bulletList([
        "Länge: 50-60 Zeichen (nicht abgeschnitten)",
        "Keyword möglichst am Anfang",
        "Einzigartig für jede Seite",
        "Markenname am Ende (optional)"
      ]),

      paragraph([
        text("Die Meta Description ist der beschreibende Text unter dem Title. Sie beeinflusst nicht direkt das Ranking, aber die Klickrate (CTR).")
      ]),

      paragraph([text("Best Practices für Meta Descriptions:", 1)]),
      bulletList([
        "Länge: 150-160 Zeichen",
        "Klaren Mehrwert kommunizieren",
        "Call-to-Action einbauen",
        "Keyword natürlich verwenden"
      ]),

      heading("h3", "3. Content erstellen, der rankt"),

      paragraph([
        text("\"Content is King\" – dieses Mantra gilt immer noch. Aber nicht irgendein Content:")
      ]),

      paragraph([text("E-E-A-T: Googles Qualitätsstandard", 1)]),
      bulletList([
        [text("Experience:", 1), text(" Haben Sie Erfahrung mit dem Thema?")],
        [text("Expertise:", 1), text(" Sind Sie qualifiziert, darüber zu schreiben?")],
        [text("Authoritativeness:", 1), text(" Werden Sie als Autorität anerkannt?")],
        [text("Trustworthiness:", 1), text(" Ist Ihre Website vertrauenswürdig?")]
      ]),

      paragraph([text("Content-Regeln für gutes Ranking:", 1)]),
      bulletList([
        "Mindestens 1.500 Wörter für umfassende Themen",
        "Klare Struktur mit H2/H3 Überschriften",
        "Antworten Sie direkt auf die Suchanfrage",
        "Nutzen Sie Listen, Tabellen, Bilder",
        "Aktualisieren Sie regelmäßig ältere Inhalte"
      ]),

      paragraph([
        text("Mehr dazu in unserem "),
        link("/leistungen/content-visuals", "Content-Service"),
        text(".")
      ]),

      heading("h3", "4. Interne Verlinkung"),

      paragraph([
        text("Interne Links helfen Google, die Struktur Ihrer Website zu verstehen. Sie verteilen außerdem \"Link-Power\" auf verschiedene Seiten.")
      ]),

      bulletList([
        "Verlinken Sie thematisch relevante Seiten miteinander",
        "Nutzen Sie aussagekräftige Ankertexte (nicht \"hier klicken\")",
        "Wichtige Seiten sollten mehr interne Links erhalten",
        "Vermeiden Sie verwaiste Seiten ohne interne Links"
      ]),

      heading("h2", "Technisches SEO: Die Grundlagen"),

      heading("h3", "1. Website-Geschwindigkeit"),

      paragraph([
        text("Ladezeit ist ein Ranking-Faktor. Laut Google verlassen 53% der mobilen Nutzer Seiten, die länger als 3 Sekunden laden. Unsere "),
        link("/blog/core-web-vitals-optimieren-guide", "Core Web Vitals Anleitung"),
        text(" zeigt, wie Sie Ihre Website beschleunigen.")
      ]),

      heading("h3", "2. Mobile-Optimierung"),

      paragraph([
        text("Google nutzt \"Mobile First Indexing\" – die mobile Version Ihrer Website ist ausschlaggebend. Prüfen Sie mit Googles "),
        link("https://search.google.com/test/mobile-friendly", "Mobile-Friendly Test", true),
        text(", ob Ihre Seite optimiert ist.")
      ]),

      heading("h3", "3. SSL/HTTPS"),

      paragraph([
        text("Eine sichere Verbindung (HTTPS statt HTTP) ist Pflicht. Ohne SSL-Zertifikat zeigt Chrome eine Warnung an – und Google straft Sie im Ranking ab.")
      ]),

      heading("h3", "4. XML Sitemap und Robots.txt"),

      paragraph([
        text("Die XML Sitemap zeigt Google alle Seiten Ihrer Website. Die robots.txt-Datei sagt Suchmaschinen, welche Bereiche sie crawlen dürfen.")
      ]),

      heading("h3", "5. Strukturierte Daten (Schema Markup)"),

      paragraph([
        text("Schema Markup hilft Google, Ihre Inhalte besser zu verstehen. Es kann zu Rich Snippets führen (Sterne, Preise, FAQs in den Suchergebnissen).")
      ]),

      heading("h2", "Off-Page SEO: Backlinks aufbauen"),

      paragraph([
        text("Backlinks sind Links von anderen Websites zu Ihrer. Google sieht sie als \"Empfehlungen\". Je mehr hochwertige Backlinks, desto höher Ihre Autorität.")
      ]),

      heading("h3", "Wie bekomme ich gute Backlinks?"),

      bulletList([
        [text("Erstklassiger Content:", 1), text(" Wenn Ihr Content wertvoll ist, verlinken andere natürlich")],
        [text("Gastbeiträge:", 1), text(" Schreiben Sie für relevante Blogs in Ihrer Branche")],
        [text("Branchenverzeichnisse:", 1), text(" Lokale und branchenspezifische Verzeichnisse")],
        [text("Pressemitteilungen:", 1), text(" Bei echten Neuigkeiten")],
        [text("Partnerschaften:", 1), text(" Lieferanten, Kunden, Verbände")]
      ]),

      paragraph([
        text("Warnung:", 1),
        text(" Kaufen Sie keine Backlinks! Google erkennt das und bestraft Sie mit Ranking-Verlust oder Ausschluss aus dem Index.")
      ]),

      heading("h2", "Local SEO: Für lokale Unternehmen unverzichtbar"),

      paragraph([
        text("Wenn Sie ein lokales Unternehmen sind (Geschäft, Dienstleister, Restaurant), ist Local SEO essenziell. 46% aller Google-Suchen haben lokalen Bezug.")
      ]),

      heading("h3", "Google Business Profile optimieren"),

      paragraph([
        text("Ihr "),
        link("https://business.google.com", "Google Business Profile", true),
        text(" ist der wichtigste Local SEO Faktor:")
      ]),

      bulletList([
        "Vollständige Angaben (Name, Adresse, Telefon, Website)",
        "Richtige Kategorie wählen",
        "Öffnungszeiten aktuell halten",
        "Hochwertige Fotos hochladen",
        "Auf Bewertungen antworten",
        "Regelmäßig Posts veröffentlichen"
      ]),

      heading("h3", "NAP-Konsistenz"),

      paragraph([
        text("NAP = Name, Address, Phone. Diese Informationen müssen auf allen Plattformen identisch sein (Website, Google, Social Media, Verzeichnisse).")
      ]),

      heading("h3", "Lokale Bewertungen"),

      paragraph([
        text("Positive Google-Bewertungen verbessern Ihr Ranking und Ihre Klickrate. Bitten Sie zufriedene Kunden aktiv um Bewertungen.")
      ]),

      paragraph([
        text("Unsere "),
        link("/leistungen/seo-sichtbarkeit", "Local SEO Experten"),
        text(" helfen Ihnen, in Ihrer Region gefunden zu werden.")
      ]),

      heading("h2", "SEO Tools für Einsteiger"),

      paragraph("Diese kostenlosen Tools sollten Sie kennen:"),

      paragraph([text("Google Search Console:", 1), text(" Pflicht! Zeigt Ihre Rankings, Klicks, technische Probleme.")]),

      paragraph([text("Google Analytics:", 1), text(" Traffic-Analyse, Nutzerverhalten, Conversions.")]),

      paragraph([text("Google Keyword Planner:", 1), text(" Suchvolumen und Keyword-Ideen.")]),

      paragraph([
        text("PageSpeed Insights:", 1),
        link("https://pagespeed.web.dev", " pagespeed.web.dev", true),
        text(" – Ladezeit-Analyse.")
      ]),

      paragraph([text("Screaming Frog:", 1), text(" Technisches SEO Audit (kostenlos bis 500 URLs).")]),

      heading("h2", "SEO-Fehler, die Sie vermeiden sollten"),

      bulletList([
        [text("Duplicate Content:", 1), text(" Gleicher Inhalt auf mehreren URLs")],
        [text("Keyword-Stuffing:", 1), text(" Keywords unnatürlich oft wiederholen")],
        [text("Schlechte Links kaufen:", 1), text(" Führt zu Abstrafung")],
        [text("Mobile ignorieren:", 1), text(" Mobile First ist Standard")],
        [text("Langsame Website:", 1), text(" Schadet Ranking und Conversion")],
        [text("Keine HTTPS:", 1), text(" Unsichere Websites werden abgestraft")],
        [text("Content ohne Strategie:", 1), text(" Random schreiben bringt nichts")]
      ]),

      heading("h2", "SEO Strategie: Ihr Aktionsplan"),

      paragraph("So starten Sie mit SEO:"),

      paragraph([text("Monat 1:", 1)]),
      bulletList([
        "Google Search Console und Analytics einrichten",
        "Technisches Audit durchführen",
        "Keyword-Recherche für Hauptseiten",
        "Google Business Profile optimieren"
      ]),

      paragraph([text("Monat 2-3:", 1)]),
      bulletList([
        "Title Tags und Meta Descriptions optimieren",
        "Wichtigste Seiten mit Content überarbeiten",
        "Interne Verlinkung verbessern",
        "Core Web Vitals optimieren"
      ]),

      paragraph([text("Monat 4-6:", 1)]),
      bulletList([
        "Blog starten oder ausbauen",
        "Backlink-Aufbau beginnen",
        "Lokale Verzeichnisse eintragen",
        "Ergebnisse analysieren und optimieren"
      ]),

      paragraph([
        text("Realistische Erwartung:", 1),
        text(" SEO braucht Zeit. Erste Ergebnisse sind nach 3-6 Monaten sichtbar, signifikante Verbesserungen nach 6-12 Monaten.")
      ]),

      heading("h2", "Häufig gestellte Fragen"),

      heading("h3", "Wie lange dauert es, bis SEO wirkt?"),
      paragraph("Je nach Wettbewerb und Ausgangslage: 3-6 Monate für erste sichtbare Ergebnisse, 6-12 Monate für signifikante Verbesserungen. SEO ist ein Marathon, kein Sprint."),

      heading("h3", "Was kostet professionelle SEO?"),
      paragraph([
        text("In Österreich zahlen Sie für laufende SEO-Betreuung zwischen 500€ und 3.000€ monatlich, abhängig vom Umfang. Einmalige Audits kosten 1.000-5.000€. Mehr dazu in unserem "),
        link("/blog/was-kostet-eine-professionelle-website", "Kosten-Guide"),
        text(".")
      ]),

      heading("h3", "Kann ich SEO selbst machen?"),
      paragraph("Grundlagen ja. Mit diesem Guide können Sie vieles selbst umsetzen. Für fortgeschrittene Strategien und technisches SEO empfehlen wir professionelle Unterstützung."),

      heading("h3", "Ist SEO noch relevant bei AI-Suche?"),
      paragraph([
        text("Absolut. Google bleibt dominant, und AI-Ergebnisse basieren auf den gleichen Content-Signalen. Guter Content für SEO ist auch guter Content für AI. Lesen Sie mehr in unserem "),
        link("/blog", "Blog"),
        text(".")
      ]),

      heading("h3", "SEO vs. Google Ads – was ist besser?"),
      paragraph("Beides hat seine Berechtigung. SEO ist nachhaltig und kostet langfristig weniger, braucht aber Zeit. Google Ads liefert sofortigen Traffic, kostet aber kontinuierlich. Ideal ist eine Kombination."),

      heading("h3", "Was ist der Unterschied zwischen SEO und SEM?"),
      paragraph("SEO (Search Engine Optimization) = organische, unbezahlte Ergebnisse. SEM (Search Engine Marketing) = bezahlte Werbung (Google Ads). Zusammen bilden sie Search Marketing."),

      heading("h3", "Wie wichtig sind Backlinks wirklich?"),
      paragraph("Sehr wichtig, aber Qualität vor Quantität. Ein Link von einer relevanten, autoritativen Seite ist mehr wert als 100 Links von Spam-Seiten."),

      paragraph([
        text("Brauchen Sie Unterstützung bei Ihrer SEO-Strategie? "),
        link("/kontakt", "Kontaktieren Sie uns"),
        text(" für eine kostenlose Erstberatung.")
      ])
    ],
    direction: "ltr", format: "", indent: 0, version: 1
  }
};

const post5ContentEN = {
  root: {
    type: "root",
    children: [
      heading("h2", "Understanding SEO: The Ultimate Beginner's Guide for 2025"),

      paragraph([
        text("93% of all online experiences begin with a search engine. If your website doesn't appear on the first page of Google, you practically don't exist for potential customers. "),
        link("https://www.brightedge.com/resources/research-reports", "According to BrightEdge", true),
        text(", 53% of website traffic comes from organic search – more than from all other sources combined.")
      ]),

      paragraph([
        text("The good news: SEO is not rocket science. In this guide, we explain everything you need to know as a beginner – from the basics to concrete measures you can implement immediately.")
      ]),

      heading("h2", "What is SEO? The Basics Simply Explained"),

      paragraph([
        text("SEO stands for ", 1),
        text("Search Engine Optimization", 2),
        text(". The goal is to design your website so that it appears as high as possible in results for relevant search queries.")
      ]),

      paragraph([
        text("Google processes over "),
        link("https://blog.google", "8.5 billion searches daily", true),
        text(". The algorithm evaluates each website based on over 200 factors. The most important categories are:")
      ]),

      bulletList([
        [text("On-Page SEO:", 1), text(" Everything you control on your website (content, keywords, meta tags)")],
        [text("Off-Page SEO:", 1), text(" External signals (backlinks, social signals, mentions)")],
        [text("Technical SEO:", 1), text(" How well search engines can crawl and understand your site")],
        [text("User Experience:", 1), text(" How users interact with your website")]
      ]),

      quote([
        paragraph([
          text("\"The best place to hide a dead body is page 2 of Google search results.\" — Unknown SEO Expert", 2)
        ])
      ]),

      heading("h2", "How Does Google Work? Understanding the Algorithm"),

      paragraph("Google works in three steps:"),

      heading("h3", "1. Crawling – Discovering the Website"),

      paragraph([
        text("Googlebots (spiders) search the internet and find new pages through links. The more quality links point to your page, the more often it gets crawled.")
      ]),

      heading("h3", "2. Indexing – Understanding the Page"),

      paragraph([
        text("Google analyzes each page's content: text, images, videos. The information is stored in the index – a gigantic database of all known web pages.")
      ]),

      heading("h3", "3. Ranking – Determining the Order"),

      paragraph([
        text("For each search query, Google selects the most relevant pages from billions. The order is based on hundreds of ranking factors.")
      ]),

      paragraph([
        text("Important:", 1),
        text(" Google wants to deliver the best answer to the user's search query. If you understand that, you understand SEO.")
      ]),

      heading("h2", "On-Page SEO: The Most Important Measures"),

      heading("h3", "1. Using Keywords Correctly"),

      paragraph([
        text("Keywords are the terms your target audience searches for. Here's how to find the right ones:")
      ]),

      bulletList([
        [text("Google Autocomplete:", 1), text(" Type a term and see what Google suggests")],
        [text("Google Keyword Planner:", 1), text(" Free tool with search volume data")],
        [text("Analyze competitors:", 1), text(" What keywords do your competitors rank for?")],
        [text("Customer surveys:", 1), text(" Ask customers how they would search for your services")]
      ]),

      paragraph([
        text("The keyword should appear in:", 1)
      ]),
      bulletList([
        "Title Tag (H1) – once at the beginning",
        "Meta Description – naturally integrated",
        "URL – short and concise",
        "First 100 words of text",
        "H2/H3 headings – where relevant",
        "Alt texts of images"
      ]),

      paragraph([
        text("Warning:", 1),
        text(" Keyword stuffing (excessive repetition) hurts more than it helps. Write for humans, not bots.")
      ]),

      heading("h3", "2. Optimizing Title Tags and Meta Descriptions"),

      paragraph([
        text("The title tag is the most important on-page factor. It appears as the clickable headline in search results.")
      ]),

      paragraph([text("Best practices for title tags:", 1)]),
      bulletList([
        "Length: 50-60 characters (not truncated)",
        "Keyword preferably at the beginning",
        "Unique for each page",
        "Brand name at the end (optional)"
      ]),

      paragraph([
        text("The meta description is the descriptive text below the title. It doesn't directly affect ranking but does affect click-through rate (CTR).")
      ]),

      paragraph([text("Best practices for meta descriptions:", 1)]),
      bulletList([
        "Length: 150-160 characters",
        "Communicate clear value",
        "Include call-to-action",
        "Use keyword naturally"
      ]),

      heading("h3", "3. Creating Content That Ranks"),

      paragraph([
        text("\"Content is King\" – this mantra still applies. But not just any content:")
      ]),

      paragraph([text("E-E-A-T: Google's Quality Standard", 1)]),
      bulletList([
        [text("Experience:", 1), text(" Do you have experience with the topic?")],
        [text("Expertise:", 1), text(" Are you qualified to write about it?")],
        [text("Authoritativeness:", 1), text(" Are you recognized as an authority?")],
        [text("Trustworthiness:", 1), text(" Is your website trustworthy?")]
      ]),

      paragraph([text("Content rules for good ranking:", 1)]),
      bulletList([
        "At least 1,500 words for comprehensive topics",
        "Clear structure with H2/H3 headings",
        "Answer the search query directly",
        "Use lists, tables, images",
        "Regularly update older content"
      ]),

      paragraph([
        text("More on this in our "),
        link("/services/content-visuals", "Content Service"),
        text(".")
      ]),

      heading("h3", "4. Internal Linking"),

      paragraph([
        text("Internal links help Google understand your website structure. They also distribute \"link power\" across different pages.")
      ]),

      bulletList([
        "Link thematically relevant pages together",
        "Use meaningful anchor texts (not \"click here\")",
        "Important pages should receive more internal links",
        "Avoid orphan pages without internal links"
      ]),

      heading("h2", "Technical SEO: The Basics"),

      heading("h3", "1. Website Speed"),

      paragraph([
        text("Loading time is a ranking factor. According to Google, 53% of mobile users leave pages that take longer than 3 seconds to load. Our "),
        link("/blog/core-web-vitals-optimization-guide", "Core Web Vitals guide"),
        text(" shows how to speed up your website.")
      ]),

      heading("h3", "2. Mobile Optimization"),

      paragraph([
        text("Google uses \"Mobile First Indexing\" – the mobile version of your website is decisive. Check with Google's "),
        link("https://search.google.com/test/mobile-friendly", "Mobile-Friendly Test", true),
        text(" if your page is optimized.")
      ]),

      heading("h3", "3. SSL/HTTPS"),

      paragraph([
        text("A secure connection (HTTPS instead of HTTP) is mandatory. Without an SSL certificate, Chrome shows a warning – and Google penalizes you in ranking.")
      ]),

      heading("h3", "4. XML Sitemap and Robots.txt"),

      paragraph([
        text("The XML sitemap shows Google all pages of your website. The robots.txt file tells search engines which areas they may crawl.")
      ]),

      heading("h3", "5. Structured Data (Schema Markup)"),

      paragraph([
        text("Schema markup helps Google better understand your content. It can lead to rich snippets (stars, prices, FAQs in search results).")
      ]),

      heading("h2", "Off-Page SEO: Building Backlinks"),

      paragraph([
        text("Backlinks are links from other websites to yours. Google sees them as \"recommendations.\" The more high-quality backlinks, the higher your authority.")
      ]),

      heading("h3", "How Do I Get Good Backlinks?"),

      bulletList([
        [text("Excellent content:", 1), text(" If your content is valuable, others will link naturally")],
        [text("Guest posts:", 1), text(" Write for relevant blogs in your industry")],
        [text("Industry directories:", 1), text(" Local and industry-specific directories")],
        [text("Press releases:", 1), text(" For real news")],
        [text("Partnerships:", 1), text(" Suppliers, customers, associations")]
      ]),

      paragraph([
        text("Warning:", 1),
        text(" Don't buy backlinks! Google recognizes this and punishes you with ranking loss or exclusion from the index.")
      ]),

      heading("h2", "Local SEO: Essential for Local Businesses"),

      paragraph([
        text("If you're a local business (store, service provider, restaurant), Local SEO is essential. 46% of all Google searches have local intent.")
      ]),

      heading("h3", "Optimizing Google Business Profile"),

      paragraph([
        text("Your "),
        link("https://business.google.com", "Google Business Profile", true),
        text(" is the most important Local SEO factor:")
      ]),

      bulletList([
        "Complete information (name, address, phone, website)",
        "Choose the right category",
        "Keep opening hours current",
        "Upload high-quality photos",
        "Respond to reviews",
        "Publish posts regularly"
      ]),

      heading("h3", "NAP Consistency"),

      paragraph([
        text("NAP = Name, Address, Phone. This information must be identical across all platforms (website, Google, social media, directories).")
      ]),

      heading("h3", "Local Reviews"),

      paragraph([
        text("Positive Google reviews improve your ranking and click-through rate. Actively ask satisfied customers for reviews.")
      ]),

      paragraph([
        text("Our "),
        link("/services/seo-visibility", "Local SEO experts"),
        text(" help you get found in your region.")
      ]),

      heading("h2", "SEO Tools for Beginners"),

      paragraph("You should know these free tools:"),

      paragraph([text("Google Search Console:", 1), text(" Essential! Shows your rankings, clicks, technical issues.")]),
      paragraph([text("Google Analytics:", 1), text(" Traffic analysis, user behavior, conversions.")]),
      paragraph([text("Google Keyword Planner:", 1), text(" Search volume and keyword ideas.")]),
      paragraph([
        text("PageSpeed Insights:", 1),
        link("https://pagespeed.web.dev", " pagespeed.web.dev", true),
        text(" – Loading time analysis.")
      ]),
      paragraph([text("Screaming Frog:", 1), text(" Technical SEO audit (free up to 500 URLs).")]),

      heading("h2", "SEO Mistakes You Should Avoid"),

      bulletList([
        [text("Duplicate content:", 1), text(" Same content on multiple URLs")],
        [text("Keyword stuffing:", 1), text(" Repeating keywords unnaturally often")],
        [text("Buying bad links:", 1), text(" Leads to penalties")],
        [text("Ignoring mobile:", 1), text(" Mobile first is standard")],
        [text("Slow website:", 1), text(" Hurts ranking and conversion")],
        [text("No HTTPS:", 1), text(" Insecure websites are penalized")],
        [text("Content without strategy:", 1), text(" Random writing achieves nothing")]
      ]),

      heading("h2", "SEO Strategy: Your Action Plan"),

      paragraph("Here's how to start with SEO:"),

      paragraph([text("Month 1:", 1)]),
      bulletList([
        "Set up Google Search Console and Analytics",
        "Conduct technical audit",
        "Keyword research for main pages",
        "Optimize Google Business Profile"
      ]),

      paragraph([text("Month 2-3:", 1)]),
      bulletList([
        "Optimize title tags and meta descriptions",
        "Revise most important pages with content",
        "Improve internal linking",
        "Optimize Core Web Vitals"
      ]),

      paragraph([text("Month 4-6:", 1)]),
      bulletList([
        "Start or expand blog",
        "Begin backlink building",
        "Register in local directories",
        "Analyze results and optimize"
      ]),

      paragraph([
        text("Realistic expectation:", 1),
        text(" SEO takes time. First results visible after 3-6 months, significant improvements after 6-12 months.")
      ]),

      heading("h2", "Frequently Asked Questions"),

      heading("h3", "How long does it take for SEO to work?"),
      paragraph("Depending on competition and starting point: 3-6 months for first visible results, 6-12 months for significant improvements. SEO is a marathon, not a sprint."),

      heading("h3", "What does professional SEO cost?"),
      paragraph([
        text("In Austria, you pay between €500 and €3,000 monthly for ongoing SEO support, depending on scope. One-time audits cost €1,000-5,000. More in our "),
        link("/blog/what-does-a-professional-website-cost", "cost guide"),
        text(".")
      ]),

      heading("h3", "Can I do SEO myself?"),
      paragraph("Basics yes. With this guide you can implement a lot yourself. For advanced strategies and technical SEO, we recommend professional support."),

      heading("h3", "Is SEO still relevant with AI search?"),
      paragraph([
        text("Absolutely. Google remains dominant, and AI results are based on the same content signals. Good content for SEO is also good content for AI. Read more in our "),
        link("/blog", "Blog"),
        text(".")
      ]),

      heading("h3", "SEO vs. Google Ads – which is better?"),
      paragraph("Both have their place. SEO is sustainable and costs less long-term but takes time. Google Ads delivers immediate traffic but costs continuously. Ideally, combine both."),

      heading("h3", "What's the difference between SEO and SEM?"),
      paragraph("SEO (Search Engine Optimization) = organic, unpaid results. SEM (Search Engine Marketing) = paid advertising (Google Ads). Together they form Search Marketing."),

      heading("h3", "How important are backlinks really?"),
      paragraph("Very important, but quality over quantity. One link from a relevant, authoritative site is worth more than 100 links from spam sites."),

      paragraph([
        text("Need support with your SEO strategy? "),
        link("/contact", "Contact us"),
        text(" for a free initial consultation.")
      ])
    ],
    direction: "ltr", format: "", indent: 0, version: 1
  }
};

async function updatePost5() {
  const dbPath = process.argv[2] || './goldenwing.db';
  console.log('🚀 Updating Post 5 Content (DE + EN)...');

  try {
    const db = new Database(dbPath);

    const stmtDE = db.prepare(`UPDATE posts_locales SET content = ? WHERE _parent_id = 5 AND _locale = 'de'`);
    const resultDE = stmtDE.run(JSON.stringify(post5ContentDE));
    console.log('✅ DE Updated rows:', resultDE.changes);

    const stmtEN = db.prepare(`UPDATE posts_locales SET content = ? WHERE _parent_id = 5 AND _locale = 'en'`);
    const resultEN = stmtEN.run(JSON.stringify(post5ContentEN));
    console.log('✅ EN Updated rows:', resultEN.changes);

    const verify = db.prepare(`SELECT _locale, length(content) as len FROM posts_locales WHERE _parent_id = 5`).all();
    verify.forEach(v => console.log(`📊 ${v._locale}: ${v.len} characters`));

    db.close();
    console.log('✅ Post 5 content updated successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePost5();
