/**
 * Update Post 1 Content - German Version
 * Converts rich content to Lexical JSON and updates database
 */

const Database = require('better-sqlite3');
const path = require('path');

// Helper functions for Lexical JSON
function text(content, format = 0) {
  return {
    type: "text",
    text: content,
    format, // 0=normal, 1=bold, 2=italic, 3=bold+italic
    mode: "normal",
    style: "",
    detail: 0,
    version: 1
  };
}

function link(url, linkText, isExternal = false) {
  return {
    type: "link",
    url,
    children: [text(linkText)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
    rel: isExternal ? "noopener noreferrer" : null,
    target: isExternal ? "_blank" : null
  };
}

function heading(tag, children) {
  return {
    type: "heading",
    tag,
    children: Array.isArray(children) ? children : [text(children)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1
  };
}

function paragraph(children) {
  return {
    type: "paragraph",
    children: Array.isArray(children) ? children : [text(children)],
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    version: 1
  };
}

function bulletList(items) {
  return {
    type: "list",
    listType: "bullet",
    children: items.map((item, i) => ({
      type: "listitem",
      children: Array.isArray(item) ? item : [text(item)],
      direction: "ltr",
      format: "",
      indent: 0,
      value: i + 1,
      version: 1
    })),
    direction: "ltr",
    format: "",
    indent: 0,
    start: 1,
    tag: "ul",
    version: 1
  };
}

function quote(children) {
  return {
    type: "quote",
    children: Array.isArray(children) ? children : [paragraph(children)],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1
  };
}

// Build the complete content for Post 1 DE
const post1ContentDE = {
  root: {
    type: "root",
    children: [
      // Intro
      heading("h2", "Was kostet eine professionelle Website in Österreich 2025?"),

      paragraph([
        text("Sie planen eine neue Website und fragen sich: Was wird das kosten? Diese Frage hören wir bei GoldenWing täglich. Die ehrliche Antwort: Es kommt darauf an – aber keine Sorge, in diesem umfassenden Guide erklären wir Ihnen transparent alle Preisfaktoren.")
      ]),

      paragraph([
        text("Die Kurzversion:", 1),
        text(" Eine professionelle Unternehmenswebsite kostet in Österreich zwischen "),
        text("3.000€ und 15.000€", 1),
        text(". Einfache One-Pager starten ab 1.500€, komplexe Webshops können 30.000€ und mehr kosten. Warum die Spanne so groß ist und was Sie für Ihr Budget erwarten können, erfahren Sie in den nächsten Minuten.")
      ]),

      // Section: Die Wahrheit
      heading("h2", "Die Wahrheit über Website-Preise in Österreich"),

      paragraph([
        text("Bevor wir in die Details einsteigen, ein wichtiger Punkt: Der billigste Anbieter ist selten der beste. Laut einer Erhebung der "),
        link("https://www.wko.at", "Wirtschaftskammer Österreich (WKO)", true),
        text(" scheitern über 40% der Webprojekte an mangelhafter Planung oder billiger Umsetzung – oft mit teuren Folgekosten.")
      ]),

      quote([
        paragraph([
          text("\"Wenn Sie denken, dass gutes Design teuer ist, sollten Sie mal sehen, was schlechtes Design kostet.\" — Dr. Ralf Speth, ehemaliger CEO von Jaguar Land Rover", 2)
        ])
      ]),

      paragraph([
        text("Bei "),
        link("/ueber-uns", "GoldenWing"),
        text(" arbeiten wir nach dem Prinzip: "),
        text("Qualität vor Quantität", 1),
        text(". Eine Website, die keine Kunden bringt, ist verschwendetes Geld – egal wie günstig sie war. Deshalb investieren wir Zeit in Strategie und Konzeption, bevor eine Zeile Code geschrieben wird.")
      ]),

      // Section: Preisübersicht
      heading("h2", "Website-Kosten nach Projekttyp (Österreich 2025)"),

      paragraph("Die folgende Übersicht basiert auf aktuellen Marktpreisen und unserer Projekterfahrung:"),

      paragraph([
        text("One-Pager / Landing Page:", 1),
        text(" 1.500 – 3.500€ | 1-2 Wochen | Für Freelancer, Startups, Kampagnen")
      ]),
      paragraph([
        text("Unternehmenswebsite (5-10 Seiten):", 1),
        text(" 3.500 – 8.000€ | 3-6 Wochen | Für KMUs, Handwerker, Dienstleister")
      ]),
      paragraph([
        text("Corporate Website (10-25 Seiten):", 1),
        text(" 8.000 – 20.000€ | 6-12 Wochen | Für Mittelstand, größere Unternehmen")
      ]),
      paragraph([
        text("E-Commerce / Webshop:", 1),
        text(" 6.000 – 30.000€ | 4-12 Wochen | Für Online-Händler, Retail")
      ]),
      paragraph([
        text("Custom Web-Applikation:", 1),
        text(" 15.000 – 100.000€+ | 3-12 Monate | Für Startups, SaaS, Spezialanwendungen")
      ]),

      paragraph([
        text("Wichtig:", 1),
        text(" Diese Preise gelten für professionelle Agenturen und Freelancer in Österreich. Laut "),
        link("https://www.statista.com", "Statista", true),
        text(" investieren erfolgreiche KMUs in der DACH-Region durchschnittlich 5.000-10.000€ in ihre Unternehmenswebsite.")
      ]),

      // Section: 6 Preisfaktoren
      heading("h2", "Die 6 wichtigsten Preisfaktoren im Detail"),

      heading("h3", "1. Umfang und Seitenanzahl"),

      paragraph("Jede zusätzliche Seite bedeutet:"),
      bulletList([
        "Mehr Konzeptionsaufwand",
        "Mehr Design-Arbeit",
        "Mehr Entwicklungszeit",
        "Mehr Inhalte, die erstellt werden müssen"
      ]),

      paragraph([
        text("Faustregel:", 1),
        text(" Pro zusätzliche Seite können Sie mit 300-800€ Mehrkosten rechnen, je nach Komplexität.")
      ]),

      paragraph([
        text("Tipp:", 1),
        text(" Überlegen Sie genau, welche Seiten Sie wirklich brauchen. In unserer "),
        link("/leistungen/webdesign", "Webdesign-Beratung"),
        text(" helfen wir Ihnen, die optimale Struktur zu finden.")
      ]),

      heading("h3", "2. Design-Komplexität"),

      paragraph([
        text("Das Design macht typischerweise "),
        text("30-40% der Gesamtkosten", 1),
        text(" aus. Es gibt drei Ansätze:")
      ]),

      paragraph([
        text("Template-basiert (1.000-3.000€):", 1),
        text(" Vorgefertigtes Theme wird angepasst. Schnell umsetzbar, aber sieht aus wie tausend andere Websites.")
      ]),

      paragraph([
        text("Semi-Custom (3.000-8.000€):", 1),
        text(" Template als Basis mit starker Individualisierung. Guter Kompromiss aus Zeit und Einzigartigkeit.")
      ]),

      paragraph([
        text("Full Custom Design (8.000€+):", 1),
        text(" Komplett individuelles Design nach Ihren Vorgaben. Einzigartige User Experience, längere Entwicklungszeit.")
      ]),

      quote([
        paragraph([
          text("\"Design ist nicht nur, wie etwas aussieht und sich anfühlt. Design ist, wie es funktioniert.\" — Steve Jobs, Mitgründer von Apple", 2)
        ])
      ]),

      paragraph([
        text("Bei GoldenWing setzen wir auf "),
        link("/leistungen/branding", "individuelles Branding"),
        text(" – weil Ihre Website Ihre digitale Visitenkarte ist.")
      ]),

      heading("h3", "3. Funktionen und Features"),

      paragraph("Zusätzliche Funktionen erhöhen den Preis erheblich:"),

      bulletList([
        "Kontaktformular (Standard): 200 – 500€",
        "Kontaktformular (mit CRM-Anbindung): 500 – 1.500€",
        "Newsletter-Integration: 300 – 800€",
        "Buchungs-/Terminkalender: 1.000 – 3.500€",
        "Mitgliederbereich: 2.000 – 5.000€",
        "Mehrsprachigkeit: +30-50% Aufpreis",
        "E-Commerce (Grundfunktion): 3.000 – 8.000€",
        "Individuelle Schnittstellen (API): 1.500 – 10.000€+"
      ]),

      paragraph([
        text("Unser Rat:", 1),
        text(" Starten Sie mit den wichtigsten Features und erweitern Sie später. Eine "),
        link("/leistungen/digitale-strategie", "digitale Strategie"),
        text(" hilft Ihnen, Prioritäten zu setzen.")
      ]),

      heading("h3", "4. Content Management System (CMS)"),

      paragraph("Die Wahl des CMS beeinflusst sowohl Entwicklungskosten als auch laufende Kosten:"),

      paragraph([
        text("WordPress", 1),
        text(" – Lizenzkosten: 0€, Entwicklung: 2.000 – 15.000€. Marktanteil: 43% aller Websites weltweit laut "),
        link("https://w3techs.com/technologies/details/cm-wordpress", "W3Techs", true),
        text(". Pro: Riesiges Ökosystem, viele Plugins. Contra: Sicherheitsupdates wichtig.")
      ]),

      paragraph([
        text("Webflow", 1),
        text(" – Lizenzkosten: 14-39€/Monat, Entwicklung: 2.500 – 12.000€. Pro: Visueller Editor, schnelle Ladezeiten. Contra: Weniger flexibel.")
      ]),

      paragraph([
        text("Mehr dazu in unserem Vergleich: "),
        link("/blog/wordpress-oder-webflow-vergleich", "WordPress oder Webflow – welches CMS ist besser?")
      ]),

      paragraph([
        text("Headless CMS", 1),
        text(" (Payload, Strapi, Contentful) – Entwicklung: 5.000 – 30.000€. Maximale Flexibilität, beste Performance. Wir nutzen "),
        link("/leistungen/technische-loesungen", "moderne Technologien"),
        text(" für beste Ergebnisse.")
      ]),

      heading("h3", "5. SEO und Performance"),

      paragraph("Eine Website ohne SEO ist wie ein Geschäft ohne Schild:"),

      paragraph([
        text("Basis-SEO (meist inkludiert):", 1),
        text(" Meta-Tags, saubere URL-Struktur, Mobile Optimierung, schnelle Ladezeiten.")
      ]),

      paragraph([
        text("Professionelles SEO (zusätzlich 1.500-5.000€):", 1),
        text(" Keyword-Recherche, Content-Strategie, technische Optimierung ("),
        link("/blog/core-web-vitals-optimieren", "Core Web Vitals"),
        text("), lokales SEO.")
      ]),

      paragraph([
        text("Laut "),
        link("https://developers.google.com/search/docs/fundamentals/seo-starter-guide", "Google", true),
        text(" haben Websites mit guter SEO bis zu 50% mehr organischen Traffic. Unsere "),
        link("/leistungen/seo-sichtbarkeit", "SEO-Experten"),
        text(" unterstützen Sie dabei.")
      ]),

      heading("h3", "6. Texte, Bilder und Content-Erstellung"),

      paragraph("Oft unterschätzt, aber ein kritischer Kostenfaktor:"),

      bulletList([
        "Texterstellung: 80 – 150€ pro Seite (professioneller Texter)",
        "SEO-optimierte Inhalte: 200 – 400€ pro Seite",
        "Stockfotos: 10 – 50€ pro Bild",
        "Professionelles Fotoshooting: 500 – 2.000€",
        "Custom Illustrationen: 200 – 1.000€ pro Grafik"
      ]),

      paragraph([
        text("Wir bieten "),
        link("/leistungen/content-visuals", "Content & Visual Services"),
        text(" aus einer Hand – damit Ihre Website nicht nur gut aussieht, sondern auch überzeugt.")
      ]),

      // Section: Inkludiert
      heading("h2", "Was ist bei GoldenWing im Preis inkludiert?"),

      paragraph([
        text("Bei unseren "),
        link("/leistungen/webdesign", "Webdesign-Projekten"),
        text(" erhalten Sie standardmäßig:")
      ]),

      bulletList([
        "Konzeption & Strategie: Zielgruppenanalyse, Sitemap, Wireframes",
        "Individuelles Design: Kein Template von der Stange",
        "Responsive Umsetzung: Perfekt auf Desktop, Tablet und Mobile",
        "SEO-Grundoptimierung: Meta-Tags, schnelle Ladezeiten, strukturierte Daten",
        "CMS-Einrichtung: Sie können Inhalte selbst bearbeiten",
        "SSL-Zertifikat: Sichere HTTPS-Verbindung",
        "DSGVO-konform: Cookie-Banner, Datenschutzerklärung, Impressum",
        "Schulung: 60-minütige Einweisung in Ihr CMS",
        "30 Tage Support: Nach Launch stehen wir für Fragen bereit"
      ]),

      paragraph([
        text("Nicht inkludiert (optional buchbar):", 1),
        text(" Texterstellung, professionelle Fotografie, laufende Wartung, erweiterte SEO-Maßnahmen, Hosting.")
      ]),

      // Section: Laufende Kosten
      heading("h2", "Laufende Kosten: Was kommt nach dem Launch?"),

      paragraph("Eine Website verursacht laufende Kosten – planen Sie diese von Anfang an ein:"),

      bulletList([
        "Hosting: 10 – 50€ monatlich (120 – 600€ jährlich)",
        "Domain (.at / .com): 10 – 30€ jährlich",
        "SSL-Zertifikat: Oft im Hosting inkludiert",
        "Wartung & Updates: 50 – 200€ monatlich",
        "SEO-Betreuung (optional): 300 – 1.500€ monatlich"
      ]),

      paragraph([
        text("Wichtig:", 1),
        text(" Vernachlässigen Sie die Wartung nicht! Laut einer "),
        link("https://sucuri.net/reports/website-threat-research-report/", "Studie von Sucuri", true),
        text(" sind 90% der gehackten Websites WordPress-Seiten mit veralteten Plugins.")
      ]),

      // Section: Preisunterschiede
      heading("h2", "Warum manche Websites 2.000€ kosten und andere 20.000€"),

      paragraph("Die Preisunterschiede lassen sich auf wenige Faktoren herunterbrechen:"),

      paragraph([
        text("Günstig (Freelancer, kleine Agentur):", 1),
        text(" Template-basiert, Standardfunktionen, wenig Beratung/Strategie, oft keine laufende Betreuung.")
      ]),

      paragraph([
        text("Premium (etablierte Agentur):", 1),
        text(" Individuelles Design und Konzept, strategische Beratung, UX/UI-Expertise, professionelles Projektmanagement, langfristige Partnerschaft.")
      ]),

      quote([
        paragraph([
          text("\"Ihre Website ist oft der erste Eindruck, den ein potenzieller Kunde von Ihrem Unternehmen bekommt. Investieren Sie entsprechend.\" — Neil Patel, Digital Marketing Experte", 2)
        ])
      ]),

      paragraph([
        text("Die Frage ist nicht: \"Wie viel kostet eine Website?\" Sondern: "),
        text("\"Was ist mir ein neuer Kunde wert?\"", 1),
        text(" Eine Website für 2.000€, die keine Kunden bringt, ist teurer als eine für 10.000€, die regelmäßig Anfragen generiert.")
      ]),

      // Section: Fehler
      heading("h2", "5 häufige Fehler bei der Budgetplanung"),

      bulletList([
        [text("Nur den Initialpreis sehen:", 1), text(" Vergessen Sie nicht Hosting, Wartung und Updates")],
        [text("Am Content sparen:", 1), text(" Schlechte Texte ruinieren jedes Design")],
        [text("SEO ignorieren:", 1), text(" Eine unsichtbare Website bringt keine Kunden")],
        [text("Zu viele Features auf einmal:", 1), text(" Starten Sie lean und erweitern Sie später")],
        [text("Billig-Anbieter vertrauen:", 1), text(" Offshore-Entwicklung = oft DSGVO-Probleme und kein Support")]
      ]),

      // Section: CTA
      heading("h2", "Ihr nächster Schritt"),

      paragraph("Sie haben jetzt einen guten Überblick über Website-Kosten in Österreich. Möchten Sie wissen, was Ihre individuelle Website kosten würde?"),

      paragraph([
        text("Wir bieten Ihnen:", 1)
      ]),
      bulletList([
        "Kostenlose Erstberatung (30 Minuten)",
        "Unverbindliches Angebot innerhalb von 48 Stunden",
        "Transparente Preisgestaltung ohne versteckte Kosten"
      ]),

      paragraph([
        text("→ "),
        link("/kontakt", "Jetzt Kontakt aufnehmen")
      ]),

      paragraph([
        text("Oder sehen Sie sich unsere "),
        link("/projekte", "bisherigen Projekte"),
        text(" an, um einen Eindruck von unserer Arbeit zu bekommen.")
      ]),

      // Section: FAQs
      heading("h2", "Häufig gestellte Fragen"),

      heading("h3", "Was kostet eine einfache 5-seitige Unternehmenswebsite in Wien?"),
      paragraph("Eine professionelle Website mit Home, Über uns, Leistungen, Referenzen und Kontakt kostet bei einer Agentur wie GoldenWing zwischen 3.500€ und 6.500€. Inkludiert sind: Konzept, individuelles Design, responsive Umsetzung, Basis-SEO, CMS-Einrichtung und Schulung."),

      heading("h3", "Warum ist ein 50€-WordPress-Theme keine gute Idee für Unternehmen?"),
      paragraph("Fertige Themes sind generisch, werden von tausenden Websites genutzt und bieten keine Differenzierung. Zudem sind sie oft schlecht optimiert, was zu langsamen Ladezeiten führt. Für private Blogs okay – für Unternehmen, die Kunden gewinnen wollen, nicht empfehlenswert."),

      heading("h3", "Wie lange dauert die Erstellung einer professionellen Website?"),
      paragraph("Rechnen Sie mit 4-8 Wochen für eine typische Unternehmenswebsite. Ein One-Pager kann in 1-2 Wochen fertig sein, komplexe Webshops dauern 3-6 Monate. Die Timeline hängt stark davon ab, wie schnell Sie Feedback geben und Inhalte liefern."),

      heading("h3", "Macht ein Baukasten wie Wix oder Squarespace für KMUs Sinn?"),
      paragraph("Für absolute Anfänger mit Kleinstbudget: Ja, als Übergangslösung. Langfristig limitieren Baukästen aber stark: Kein Eigentum am Code, begrenzte SEO-Möglichkeiten, schlechte Performance, Abhängigkeit vom Anbieter. Sobald Sie wachsen wollen, stoßen Sie an Grenzen."),

      heading("h3", "Was kostet eine zweisprachige Website (Deutsch/Englisch)?"),
      paragraph("Planen Sie mit einem Aufpreis von 30-50% gegenüber der einsprachigen Version. Bei einer 5.000€-Website wären das also 6.500-7.500€. Die Mehrkosten entstehen durch: Plugin-/System-Setup, Übersetzung aller Texte, SEO für beide Sprachen, Testing."),

      heading("h3", "Brauche ich einen Wartungsvertrag?"),
      paragraph("Dringend empfohlen. Websites ohne regelmäßige Updates werden zum Sicherheitsrisiko. Ein Wartungsvertrag (50-200€/Monat) beinhaltet: Software-Updates, Sicherheits-Backups, Performance-Monitoring und kleinen Support. Die Alternative – ein Hack – kostet schnell mehrere tausend Euro."),

      heading("h3", "Was ist der Unterschied zwischen Webdesign und Webentwicklung?"),
      paragraph([
        text("Webdesign", 1),
        text(" bezieht sich auf das visuelle Erscheinungsbild: Layout, Farben, Typografie, User Interface. "),
        text("Webentwicklung", 1),
        text(" ist die technische Umsetzung: Programmierung, CMS-Integration, Datenbanken, Schnittstellen. Bei GoldenWing bekommen Sie beides aus einer Hand.")
      ])
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1
  }
};

// Main function
async function updatePost1DE() {
  const dbPath = process.argv[2] || './goldenwing.db';

  console.log('🚀 Updating Post 1 Content (DE)...');
  console.log('Database:', dbPath);

  try {
    const db = new Database(dbPath);

    // Convert to JSON string
    const contentJson = JSON.stringify(post1ContentDE);

    // Update the database
    const stmt = db.prepare(`
      UPDATE posts_locales
      SET content = ?
      WHERE _parent_id = 1 AND _locale = 'de'
    `);

    const result = stmt.run(contentJson);

    console.log('✅ Updated rows:', result.changes);

    // Verify
    const verify = db.prepare(`
      SELECT length(content) as len
      FROM posts_locales
      WHERE _parent_id = 1 AND _locale = 'de'
    `).get();

    console.log('📊 New content length:', verify.len, 'characters');

    db.close();
    console.log('✅ Post 1 DE content updated successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePost1DE();
