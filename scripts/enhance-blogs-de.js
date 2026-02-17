const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'goldenwing.db'));

// Helper to create Lexical JSON
function createLexicalContent(elements) {
  return JSON.stringify({
    root: {
      type: 'root',
      children: elements,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1
    }
  });
}

function h2(text) {
  return {
    type: 'heading',
    tag: 'h2',
    children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  };
}

function h3(text) {
  return {
    type: 'heading',
    tag: 'h3',
    children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  };
}

function h4(text) {
  return {
    type: 'heading',
    tag: 'h4',
    children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  };
}

function p(text) {
  return {
    type: 'paragraph',
    children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1
  };
}

function pMixed(parts) {
  const children = parts.map(part => {
    if (typeof part === 'string') {
      return { type: 'text', text: part, format: 0, mode: 'normal', style: '', detail: 0, version: 1 };
    }
    if (part.bold) {
      return { type: 'text', text: part.bold, format: 1, mode: 'normal', style: '', detail: 0, version: 1 };
    }
    if (part.link) {
      return {
        type: 'link',
        children: [{ type: 'text', text: part.text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        rel: part.external ? 'noopener noreferrer' : '',
        target: part.external ? '_blank' : '',
        title: '',
        url: part.link,
        version: 1
      };
    }
    return part;
  });
  return {
    type: 'paragraph',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1
  };
}

function pBold(boldText, normalText = '') {
  const children = [{ type: 'text', text: boldText, format: 1, mode: 'normal', style: '', detail: 0, version: 1 }];
  if (normalText) {
    children.push({ type: 'text', text: normalText, format: 0, mode: 'normal', style: '', detail: 0, version: 1 });
  }
  return {
    type: 'paragraph',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1
  };
}

function ul(items) {
  return {
    type: 'list',
    listType: 'bullet',
    children: items.map((item, i) => {
      if (typeof item === 'string') {
        return {
          type: 'listitem',
          children: [{ type: 'text', text: item, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
          direction: 'ltr',
          format: '',
          indent: 0,
          value: i + 1,
          version: 1
        };
      }
      const children = item.parts.map(part => {
        if (typeof part === 'string') {
          return { type: 'text', text: part, format: 0, mode: 'normal', style: '', detail: 0, version: 1 };
        }
        if (part.bold) {
          return { type: 'text', text: part.bold, format: 1, mode: 'normal', style: '', detail: 0, version: 1 };
        }
        if (part.link) {
          return {
            type: 'link',
            children: [{ type: 'text', text: part.text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
            direction: 'ltr',
            format: '',
            indent: 0,
            rel: part.external ? 'noopener noreferrer' : '',
            target: part.external ? '_blank' : '',
            title: '',
            url: part.link,
            version: 1
          };
        }
        return part;
      });
      return {
        type: 'listitem',
        children,
        direction: 'ltr',
        format: '',
        indent: 0,
        value: i + 1,
        version: 1
      };
    }),
    direction: 'ltr',
    format: '',
    indent: 0,
    start: 1,
    tag: 'ul',
    version: 1
  };
}

function ol(items) {
  return {
    type: 'list',
    listType: 'number',
    children: items.map((text, i) => ({
      type: 'listitem',
      children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
      direction: 'ltr',
      format: '',
      indent: 0,
      value: i + 1,
      version: 1
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    start: 1,
    tag: 'ol',
    version: 1
  };
}

function quote(text) {
  return {
    type: 'quote',
    children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1
  };
}

function hr() {
  return {
    type: 'horizontalrule',
    version: 1
  };
}

// ============================================
// POST 1: Website Kosten - Deutsche Version
// ============================================
const post1Content = createLexicalContent([
  h2('Was kostet eine professionelle Website 2025?'),

  pMixed([
    'Die Kosten für eine professionelle Website reichen von ',
    { bold: '3.000 € für eine einfache Firmenwebsite' },
    ' bis zu ',
    { bold: '50.000 €+ für komplexe Webanwendungen' },
    '. Laut einer ',
    { text: 'Clutch-Studie aus 2024', link: 'https://clutch.co/web-designers/resources/how-much-does-cost-build-website', external: true },
    ' liegt der Durchschnittspreis für kleine Unternehmenswebsites zwischen 5.000 und 10.000 US-Dollar. Dieser umfassende Leitfaden schlüsselt alle Preisfaktoren auf – basierend auf unserer 8+ Jahre Erfahrung im Webdesign für österreichische Unternehmen.'
  ]),

  h3('Schnellantwort: Website-Preisübersicht'),

  p('Hier sind die typischen Kosten für verschiedene Website-Typen in Österreich und Europa:'),

  ul([
    'Einfache Landingpage: 1.500 – 3.000 €',
    'Firmenwebsite (5-10 Seiten): 3.000 – 8.000 €',
    'Unternehmenswebsite (10-20 Seiten): 8.000 – 15.000 €',
    'Online-Shop (bis 100 Produkte): 8.000 – 20.000 €',
    'Online-Shop (100+ Produkte): 15.000 – 40.000 €',
    'Individuelle Webanwendung: 20.000 – 100.000 €+',
    'Enterprise-Lösung: 50.000 €+'
  ]),

  h3('Wesentliche Faktoren, die Website-Kosten bestimmen'),

  h4('1. Design-Komplexität'),

  pMixed([
    'Das Design macht typischerweise 30-40% der Gesamtkosten aus. Bei ',
    { text: 'GoldenWing Webdesign', link: '/de/leistungen/webdesign' },
    ' bieten wir drei Ansätze:'
  ]),

  ul([
    'Template-basiertes Design (500-2.000 €): Vorgefertigte Templates, an Ihre Marke angepasst. Schnellere Lieferung, geringere Kosten, aber eingeschränkte Einzigartigkeit.',
    'Semi-individuelles Design (2.000-5.000 €): Kombination aus Template-Elementen und individuellen Komponenten. Gute Balance zwischen Kosten und Individualität.',
    'Vollständig individuelles Design (5.000-15.000 €+): Komplett einzigartiges Design von Grund auf. Maximale Markendifferenzierung und Flexibilität.'
  ]),

  h4('2. Funktionen & Features'),

  p('Jede Funktion erhöht den Entwicklungsaufwand und die Kosten. Typische Feature-Preise:'),

  ul([
    'Kontaktformular mit Validierung: 200-500 €',
    'Newsletter-Integration (Mailchimp, etc.): 300-800 €',
    'Blog/News-Bereich: 500-1.500 €',
    'Online-Buchungssystem: 1.500-4.000 €',
    'Kundenportal/Login-Bereich: 2.000-6.000 €',
    'Zahlungsintegration: 800-2.500 €',
    'Mehrsprachigkeit: +30-50% vom Grundpreis',
    'Individueller Rechner/Konfigurator: 2.000-8.000 €'
  ]),

  h4('3. Content Management System (CMS)'),

  pMixed([
    'Die CMS-Wahl beeinflusst sowohl anfängliche als auch laufende Kosten erheblich. Details finden Sie in unserem ',
    { text: 'WordPress vs. Webflow Vergleich', link: '/de/blog/wordpress-oder-webflow-vergleich' },
    '.'
  ]),

  ul([
    'WordPress: Kostenlose Software, aber Hosting (5-50 €/Monat), Sicherheits-Plugins und regelmäßige Updates erforderlich. Ideal für content-lastige Seiten.',
    'Webflow: Pläne ab 14-39 $/Monat. Visueller Editor, integriertes Hosting, exzellent für designorientierte Seiten.',
    'Shopify: 29-299 $/Monat. Optimal für E-Commerce mit minimalen technischen Anforderungen.',
    'Headless CMS: Höhere Anfangsinvestition (3.000-10.000 €+), aber maximale Flexibilität und Performance.'
  ]),

  h4('4. SEO & Performance-Optimierung'),

  pMixed([
    'Eine schöne Website bringt nichts, wenn niemand sie findet. ',
    { text: 'Unsere SEO-Leistungen', link: '/de/leistungen/seo-sichtbarkeit' },
    ' sorgen dafür, dass sich Ihre Investition auszahlt:'
  ]),

  ul([
    'Basis On-Page SEO (in den meisten Projekten enthalten): Technische Optimierung, Meta-Tags, Sitemap',
    'Erweitertes SEO-Setup (1.000-3.000 €): Keyword-Recherche, Content-Optimierung, Schema-Markup',
    'Laufende SEO-Betreuung (500-2.000 €/Monat): Linkaufbau, Content-Erstellung, Monitoring'
  ]),

  h3('Was ist bei GoldenWing Website-Projekten inklusive?'),

  p('Jedes Projekt, das wir liefern, enthält diese Essentials ohne Aufpreis:'),

  ul([
    'Responsive Design: Optimiert für Desktop, Tablet und Mobile',
    'SSL-Zertifikat: HTTPS-Sicherheit für alle Seiten',
    'Basis SEO-Setup: Meta-Titles, Descriptions, XML-Sitemap, robots.txt',
    'DSGVO-Konformität: Cookie-Consent, Datenschutzerklärung-Integration',
    'Performance-Optimierung: Bildkomprimierung, Lazy Loading, Caching',
    'Analytics-Setup: Google Analytics 4 oder datenschutzfreundliche Alternative',
    '30 Tage Support: Bugfixes und kleinere Anpassungen nach Launch',
    'Schulung: 1-2 Stunden CMS-Training für Ihr Team'
  ]),

  h3('Laufende Kosten nach dem Launch'),

  p('Planen Sie diese wiederkehrenden Ausgaben ein, um Ihre Website reibungslos zu betreiben:'),

  ul([
    'Domain-Registrierung: 10-30 €/Jahr (.at-Domains, .com etwas höher)',
    'Web-Hosting: 10-100 €/Monat je nach Traffic und Anforderungen',
    'SSL-Zertifikat: Oft im Hosting enthalten, sonst 50-200 €/Jahr',
    'CMS-Updates & Sicherheit: 50-200 €/Monat für WordPress-Wartung',
    'Content-Updates: 50-100 €/Stunde für professionelle Aktualisierungen',
    'Backups & Monitoring: 20-50 €/Monat'
  ]),

  h3('So erhalten Sie den besten Wert'),

  pMixed([
    'Basierend auf unserer Erfahrung mit über 100 Website-Projekten hier bewährte Strategien zur Budgetoptimierung:'
  ]),

  ol([
    'Starten Sie mit klaren Anforderungen: Ein detailliertes Briefing spart 20-30% bei Revisionskosten',
    'Priorisieren Sie Features: Launchen Sie mit dem Wesentlichen, erweitern Sie später',
    'Investieren Sie in Qualitätsfotografie: Professionelle Bilder steigern Conversions um 40%',
    'Planen Sie Mobile First: 60% des Web-Traffics kommt von Mobilgeräten',
    'Berücksichtigen Sie Langzeitkosten: Eine 5.000 € Website mit 200 €/Monat Wartung kostet im ersten Jahr 7.400 €'
  ]),

  h3('Warnsignale: Wenn billig teuer wird'),

  p('Seien Sie vorsichtig bei Angeboten, die zu gut klingen:'),

  ul([
    'Preise unter 1.000 € für "professionelle" Websites bedeuten oft Templates mit minimaler Anpassung',
    'Versteckte Kosten für "grundlegende" Features wie Kontaktformulare oder Responsive Design',
    'Keine Erwähnung von laufender Wartung oder Support',
    'Extrem kurze Lieferzeiten (Qualität braucht Zeit)',
    'Kein Portfolio oder Referenzen von ähnlichen Projekten'
  ]),

  quote('"Die Bitterkeit schlechter Qualität bleibt lange, nachdem die Süße des niedrigen Preises vergessen ist." – Benjamin Franklin'),

  h3('Häufig gestellte Fragen'),

  pBold('Wie lange dauert die Erstellung einer Website?'),
  p('Eine einfache Firmenwebsite dauert 4-6 Wochen. Komplexe Projekte mit individueller Funktionalität können 3-6 Monate in Anspruch nehmen. Die Timeline hängt von der Content-Bereitschaft, Feedback-Geschwindigkeit und Projektkomplexität ab.'),

  pBold('Muss ich alles im Voraus bezahlen?'),
  p('Die meisten Agenturen arbeiten mit Meilenstein-Zahlungen: 30-50% Anzahlung, 25-35% bei Design-Freigabe und der Rest bei Launch. Das schützt beide Seiten.'),

  pBold('Kann ich die Website selbst aktualisieren?'),
  p('Ja! Moderne CMS-Plattformen wie WordPress oder Webflow ermöglichen es auch technisch weniger versierten Nutzern, Inhalte zu aktualisieren, Blogbeiträge hinzuzufügen und grundlegende Änderungen vorzunehmen. Wir bieten bei jedem Projekt eine Schulung an.'),

  pBold('Was ist, wenn ich nach dem Launch Änderungen brauche?'),
  p('Wir bieten 30 Tage inkludierten Support für kleinere Anpassungen. Für laufende Bedürfnisse empfehlen wir ein Wartungspaket oder Stunden-basierte Unterstützung.'),

  hr(),

  h3('Individuelles Angebot für Ihr Projekt'),

  pMixed([
    'Jedes Projekt ist einzigartig. ',
    { text: 'Kontaktieren Sie uns für eine kostenlose Erstberatung', link: '/de/kontakt' },
    ' und erhalten Sie ein detailliertes Angebot innerhalb von 48 Stunden. Wir besprechen Ihre Ziele, empfehlen den besten Ansatz und bieten transparente Preise ohne versteckte Kosten.'
  ]),

  pMixed([
    'Entdecken Sie unsere ',
    { text: 'Webdesign-Leistungen', link: '/de/leistungen/webdesign' },
    ' oder sehen Sie sich unser ',
    { text: 'Portfolio', link: '/de/projekte' },
    ' an.'
  ])
]);

// ============================================
// POST 2: WordPress vs Webflow - Deutsche Version
// ============================================
const post2Content = createLexicalContent([
  h2('WordPress vs. Webflow: Welches CMS ist 2025 das Richtige für Sie?'),

  pMixed([
    'Die Wahl zwischen WordPress und Webflow ist eine der wichtigsten Entscheidungen für Ihre Website. Mit ',
    { text: 'WordPress, das 43% aller Websites betreibt', link: 'https://w3techs.com/technologies/details/cm-wordpress', external: true },
    ', und Webflow, das unter Designern und Agenturen rasant wächst, bieten beide Plattformen überzeugende Vorteile. Dieser umfassende Vergleich hilft Ihnen bei der richtigen Wahl.'
  ]),

  h3('Schnellantwort: WordPress vs. Webflow Zusammenfassung'),

  pBold('Wählen Sie WordPress, wenn: '),
  p('Sie umfangreiche E-Commerce-Funktionen (WooCommerce), komplexe Mitgliedersysteme, spezifische Plugins benötigen oder ein begrenztes Budget mit technischem Support haben.'),

  pBold('Wählen Sie Webflow, wenn: '),
  p('Designqualität Ihre oberste Priorität ist, Sie pixelgenaue Kontrolle ohne Programmierung wünschen oder eine All-in-One-Plattform mit integriertem Hosting bevorzugen.'),

  h3('Plattform-Überblick'),

  h4('WordPress: Der Industriestandard'),

  pMixed([
    { text: 'WordPress', link: 'https://wordpress.org', external: true },
    ' ist ein Open-Source Content Management System, das das Web seit 2003 dominiert.'
  ]),

  ul([
    'Marktanteil: 43% aller Websites weltweit',
    'Typ: Open-Source CMS (selbst gehostet oder verwaltet)',
    'Ideal für: Blogs, content-lastige Seiten, E-Commerce, Mitgliederseiten',
    'Lernkurve: Moderat (einfacher für Content, schwieriger für Design)',
    'Kostenrahmen: 0 € (Software) + 5-100 €/Monat (Hosting) + Plugins'
  ]),

  h4('Webflow: Die Designer-Plattform'),

  pMixed([
    { text: 'Webflow', link: 'https://webflow.com', external: true },
    ' ist eine visuelle Webdesign-Plattform, die Designfreiheit mit professionellem Hosting kombiniert.'
  ]),

  ul([
    'Marktanteil: ~1%, aber am schnellsten wachsend unter professionellen Designern',
    'Typ: SaaS-Plattform mit visuellem Builder',
    'Ideal für: Marketing-Seiten, Portfolios, Design-Agenturen, Startups',
    'Lernkurve: Anfangs steiler, aber intuitiver für Designer',
    'Kostenrahmen: 14-39 $/Monat (Websites) oder 29-212 $/Monat (E-Commerce)'
  ]),

  h3('Detaillierter Vergleich'),

  h4('1. Benutzerfreundlichkeit'),

  pBold('WordPress: '),
  p('Der Gutenberg Block-Editor hat die Inhaltsbearbeitung intuitiver gemacht, aber Design-Anpassungen erfordern weiterhin Theme-Kenntnisse oder Page Builder wie Elementor. Tausende Tutorials verfügbar. Nicht-technische Nutzer können nach der Einrichtung Inhalte leicht verwalten.'),

  pBold('Webflow: '),
  p('Anfangs steilere Lernkurve – rechnen Sie mit 20-40 Stunden bis zur Kompetenz. Einmal erlernt, haben Sie jedoch komplette Kontrolle über jeden Pixel. Die visuelle Oberfläche ist für Designer intuitiver als für Entwickler.'),

  pBold('Gewinner: '),
  p('WordPress für Content-Bearbeitung; Webflow für Design-Kontrolle.'),

  h4('2. Design-Flexibilität'),

  pBold('WordPress: '),
  p('Das Design hängt stark vom Theme ab. Kostenlose Themes bieten eingeschränkte Anpassung. Premium-Themes (50-200 €) bieten mehr Optionen. Vollständig individuelles Design erfordert Entwickler-Skills oder teure Page Builder.'),

  pBold('Webflow: '),
  p('Komplette Designfreiheit. Jedes Element kann mit CSS-ähnlichen Steuerelementen gestaltet werden. Keine Theme-Einschränkungen. Was Sie sehen, ist was Sie bekommen – designen Sie direkt im Browser.'),

  pBold('Gewinner: '),
  p('Webflow, mit deutlichem Vorsprung.'),

  h4('3. Performance & Geschwindigkeit'),

  pMixed([
    'Die Website-Geschwindigkeit beeinflusst direkt SEO und Conversions. Laut ',
    { text: 'Google-Forschung', link: 'https://web.dev/vitals/', external: true },
    ' reduziert eine 1-Sekunden-Verzögerung die Conversions um 7%.'
  ]),

  pBold('WordPress: '),
  p('Die Performance variiert stark. Eine gut optimierte WordPress-Seite kann 90+ Lighthouse-Scores erreichen. Allerdings können Plugin-Überladung, schlechte Themes und Shared Hosting Seiten erheblich verlangsamen. Erfordert laufende Optimierung.'),

  pBold('Webflow: '),
  p('Konstant exzellente Performance. Sauberer Code-Output, automatische Bildoptimierung und schnelles CDN-Hosting inklusive. Die meisten Webflow-Seiten erreichen 90+ auf Lighthouse ohne zusätzlichen Aufwand.'),

  pBold('Gewinner: '),
  p('Webflow für konsistente Performance; WordPress kann mit Expertise mithalten.'),

  h4('4. SEO-Fähigkeiten'),

  pMixed([
    'Beide Plattformen können exzellente SEO-Ergebnisse erzielen. Siehe unsere ',
    { text: 'SEO-Leistungen', link: '/de/leistungen/seo-sichtbarkeit' },
    ' für professionelle Optimierung.'
  ]),

  pBold('WordPress: '),
  p('Exzellent mit Plugins wie Yoast SEO oder RankMath (beide haben kostenlose Versionen). Volle Kontrolle über jedes SEO-Element. Riesige Community, die SEO-Tools und Ressourcen erstellt.'),

  pBold('Webflow: '),
  p('Gute integrierte SEO-Tools: individuelle Meta-Tags, automatisch generierte Sitemaps, 301-Weiterleitungen, saubere URLs. Keine Plugins nötig. Allerdings weniger fortgeschrittene SEO-Tools als das WordPress-Ökosystem.'),

  pBold('Gewinner: '),
  p('WordPress für fortgeschrittene SEO; Webflow ausreichend für die meisten Unternehmen.'),

  h4('5. E-Commerce'),

  pBold('WordPress + WooCommerce: '),
  p('WooCommerce betreibt 28% aller Online-Shops. Unbegrenzte Produkte, umfangreiche Zahlungsanbieter, tausende Erweiterungen. Kostenlos zum Start, aber Kosten summieren sich mit Premium-Plugins.'),

  pBold('Webflow E-Commerce: '),
  p('Sauberer, designerfreundlicher E-Commerce. Beschränkt auf 3 Zahlungsanbieter (Stripe, PayPal, Apple Pay). Produktlimits je nach Plan (500-3.000). Besser für kleinere Kataloge mit designorientierten Marken.'),

  pBold('Gewinner: '),
  p('WordPress/WooCommerce für ernsthaften E-Commerce; Webflow für kleine, designfokussierte Shops.'),

  h4('6. Gesamtkosten (TCO)'),

  p('5-Jahres-Kostenvergleich für eine typische Unternehmenswebsite:'),

  pBold('WordPress: '),
  ul([
    'Jahr 1: 3.000-8.000 € (Entwicklung) + 600 € (Hosting/Wartung) = 3.600-8.600 €',
    'Jahre 2-5: 600 €/Jahr × 4 = 2.400 €',
    '5-Jahres-Gesamt: 6.000-11.000 €'
  ]),

  pBold('Webflow: '),
  ul([
    'Jahr 1: 4.000-10.000 € (Entwicklung) + 200-470 € (Hosting) = 4.200-10.470 €',
    'Jahre 2-5: 200-470 €/Jahr × 4 = 800-1.880 €',
    '5-Jahres-Gesamt: 5.000-12.350 €'
  ]),

  pBold('Gewinner: '),
  p('Ähnliche Gesamtkosten; Webflow hat niedrigere laufende Wartungskosten.'),

  h3('Wann sollten Sie WordPress wählen?'),

  ul([
    'Sie brauchen WooCommerce\'s umfangreiche E-Commerce-Funktionen',
    'Ihre Seite erfordert spezifische Plugins (Mitglieder, LMS, komplexe Formulare)',
    'Sie haben interne technische Ressourcen für die Wartung',
    'Das Budget ist sehr begrenzt (Start mit kostenlosen Themes möglich)',
    'Sie benötigen volle Eigentümerschaft und Kontrolle über Ihre Daten',
    'Sie planen eine Skalierung auf Millionen von Seiten (News-Seiten, Verzeichnisse)'
  ]),

  h3('Wann sollten Sie Webflow wählen?'),

  ul([
    'Designqualität und Einzigartigkeit haben höchste Priorität',
    'Sie wollen visuell bearbeiten ohne Code zu berühren',
    'Schnelle, zuverlässige Performance ist kritisch',
    'Sie bevorzugen vorhersehbare Hosting-Kosten ohne Überraschungen',
    'Ihr Team beinhaltet Designer, die direkte Kontrolle wollen',
    'Sie bauen eine Marketing-Seite, ein Portfolio oder eine Startup-Website'
  ]),

  h3('Unsere Empfehlung'),

  pMixed([
    'Bei ',
    { text: 'GoldenWing', link: '/de/leistungen/webdesign' },
    ' arbeiten wir mit beiden Plattformen und empfehlen basierend auf Ihren spezifischen Bedürfnissen. Es gibt kein universell "besseres" CMS – nur die richtige Wahl für Ihr Projekt.'
  ]),

  p('Für die meisten kleinen bis mittleren Unternehmen, die sich auf Lead-Generierung und Markenpräsenz konzentrieren, bietet Webflow die beste Balance aus Designqualität, Performance und Wartbarkeit. Für E-Commerce oder content-lastige Seiten bleibt WordPress der Industriestandard.'),

  h3('Häufig gestellte Fragen'),

  pBold('Kann ich von WordPress zu Webflow migrieren (oder umgekehrt)?'),
  p('Ja, aber das Design muss neu aufgebaut werden. Inhalte können exportiert/importiert werden. Rechnen Sie mit 60-80% der Kosten einer neuen Website. Wir empfehlen eine Migration bei einem Redesign.'),

  pBold('Was ist sicherer?'),
  p('Webflow handhabt Sicherheit automatisch. WordPress erfordert regelmäßige Updates, Sicherheits-Plugins und ordentliches Hosting. Beide können bei richtiger Verwaltung sicher sein.'),

  pBold('Kann ich meine eigene Domain mit beiden nutzen?'),
  p('Ja, beide Plattformen unterstützen eigene Domains. SSL-Zertifikate sind enthalten oder leicht konfigurierbar.'),

  pBold('Welche hat besseren Support?'),
  p('WordPress hat eine riesige Community, aber keinen offiziellen Support. Webflow bietet E-Mail-Support bei kostenpflichtigen Plänen und exzellente Dokumentation.'),

  hr(),

  h3('Hilfe bei der Entscheidung?'),

  pMixed([
    { text: 'Kontaktieren Sie uns für eine kostenlose Beratung', link: '/de/kontakt' },
    '. Wir analysieren Ihre Anforderungen und empfehlen die beste Plattform für Ihre spezifischen Bedürfnisse – ohne Plattform-Bias.'
  ])
]);

// ============================================
// POST 4: Markenidentität - Deutsche Version
// ============================================
const post4Content = createLexicalContent([
  h2('Markenidentität entwickeln: Der komplette Leitfaden 2025'),

  pMixed([
    'Eine starke Markenidentität bedeutet ',
    { bold: '23% mehr Umsatz' },
    ', laut einer ',
    { text: 'Lucidpress-Studie', link: 'https://www.marq.com/blog/brand-consistency', external: true },
    '. Dieser umfassende Leitfaden führt Sie Schritt für Schritt durch die Entwicklung einer Markenidentität, die Ihre Zielgruppe begeistert und die Zeit überdauert – basierend auf unserer 8+ Jahre ',
    { text: 'Branding-Erfahrung', link: '/de/leistungen/branding' },
    '.'
  ]),

  h3('Was ist Markenidentität?'),

  p('Markenidentität ist die Gesamtheit aller visuellen und verbalen Elemente, die Ihr Unternehmen nach außen repräsentieren. Es ist, wie Sie aussehen, sprechen und welches Gefühl Sie vermitteln. Eine vollständige Markenidentität umfasst:'),

  ul([
    'Visuelle Identität: Logo, Farben, Typografie, Bildstil',
    'Verbale Identität: Tonalität, Messaging, Tagline',
    'Markenstrategie: Purpose, Werte, Positionierung, Zielgruppe',
    'Markenerlebnis: Wie Kunden an jedem Touchpoint mit Ihrer Marke interagieren'
  ]),

  p('Denken Sie an Markenidentität als die sichtbar gemachte Persönlichkeit Ihres Unternehmens. So wie Menschen Sie an Aussehen, Stimme und Verhalten erkennen, sollten Kunden Ihre Marke sofort wiedererkennen.'),

  h3('Warum Markenidentität wichtig ist'),

  p('Die Investition in Markenidentität liefert messbare Geschäftsergebnisse:'),

  ul([
    'Wiedererkennung: Konsistente Marken sind 3,5× sichtbarer für Konsumenten',
    'Vertrauen: 81% der Verbraucher müssen einer Marke vertrauen, bevor sie kaufen',
    'Premium-Preise: Starke Marken können 20-25% höhere Preise durchsetzen',
    'Loyalität: Emotional verbundene Kunden haben 306% höheren Lifetime Value',
    'Talentgewinnung: 75% der Jobsuchenden berücksichtigen die Arbeitgebermarke'
  ]),

  h3('Die 7 Kernelemente der Markenidentität'),

  h4('1. Markenstrategie (Fundament)'),

  p('Bevor Sie visuell gestalten, klären Sie Ihr strategisches Fundament:'),

  pBold('Vision: '),
  p('Welche Zukunft erschaffen Sie? Beispiel: "Eine Welt, in der jedes kleine Unternehmen Zugang zu Enterprise-Qualität im Design hat."'),

  pBold('Mission: '),
  p('Wie erreichen Sie Ihre Vision? Beispiel: "Wir befähigen Unternehmen durch strategisches Design und digitale Lösungen."'),

  pBold('Werte: '),
  p('Welche Prinzipien leiten Ihre Entscheidungen? Wählen Sie 3-5 authentische Werte, die den täglichen Betrieb beeinflussen.'),

  pBold('Positionierung: '),
  p('Wie unterscheiden Sie sich von der Konkurrenz? Vervollständigen Sie diesen Satz: "Für [Zielgruppe] sind wir die [Kategorie], die [einzigartiger Nutzen], weil [Grund zur Überzeugung]."'),

  pBold('Zielgruppe: '),
  pMixed([
    'An wen sprechen Sie? Erstellen Sie detaillierte ',
    { text: 'Buyer Personas', link: '/de/blog/customer-journey-mapping-guide' },
    ' mit Demografie, Zielen, Herausforderungen und Verhaltensweisen.'
  ]),

  h4('2. Markenname'),

  p('Ihr Name ist Ihr erster Eindruck. Effektive Markennamen sind:'),

  ul([
    'Einprägsam: Leicht zu merken nach einem Kontakt',
    'Aussprechbar: Funktioniert in den Sprachen Ihrer Zielmärkte',
    'Einzigartig: Von Wettbewerbern unterscheidbar',
    'Verfügbar: Domain, Marke und Social-Media-Handles prüfen',
    'Bedeutungsvoll: Verbindung zu Ihrem Wertversprechen (abstrakte Namen können auch funktionieren)'
  ]),

  p('Arten von Markennamen: Beschreibend (General Motors), Akronyme (IBM), Abstrakt (Apple), Gründer (Ford), Erfunden (Kodak), Metapher (Amazon).'),

  h4('3. Logo-Design'),

  p('Ihr Logo ist der visuelle Anker Ihrer Marke. Großartige Logos sind:'),

  ul([
    'Einfach: Erkennbar in jeder Größe, vom Favicon bis zur Plakatwand',
    'Vielseitig: Funktioniert in Farbe, Schwarz-Weiß, horizontal, gestapelt',
    'Zeitlos: Vermeidet trendige Elemente, die schnell veralten',
    'Relevant: Verbindung zur Branche ohne zu wörtlich zu sein',
    'Unverwechselbar: Hebt sich von der Konkurrenz ab'
  ]),

  p('Zu entwickelnde Logo-Varianten: Primäres Logo, sekundäre/alternative Version, nur Icon/Symbol, monochrome Versionen (schwarz, weiß, Einzelfarbe).'),

  h4('4. Farbpalette'),

  pMixed([
    'Farben wecken Emotionen und fördern die Wiedererkennung. ',
    { text: 'Farbpsychologie-Forschung', link: 'https://www.colorpsychology.org/', external: true },
    ' zeigt:'
  ]),

  ul([
    'Blau: Vertrauen, Stabilität, Professionalität (Finanzen, Tech, Gesundheit)',
    'Rot: Energie, Leidenschaft, Dringlichkeit (Essen, Unterhaltung, Retail)',
    'Grün: Wachstum, Gesundheit, Nachhaltigkeit (Bio, Finanzen, Wellness)',
    'Gelb: Optimismus, Kreativität, Wärme (Kinder, Essen, Kreativ)',
    'Lila: Luxus, Kreativität, Weisheit (Beauty, Bildung, Spiritualität)',
    'Orange: Enthusiasmus, Abenteuer, Selbstvertrauen (Sport, Tech, Jugend)',
    'Schwarz: Raffinesse, Luxus, Macht (Mode, Luxus, Tech)'
  ]),

  p('Bauen Sie Ihre Palette mit: 1-2 Primärfarben (am häufigsten verwendet), 2-3 Sekundärfarben (unterstützend), 2-3 Neutralfarben (Hintergründe, Text).'),

  h4('5. Typografie'),

  p('Schriften kommunizieren Persönlichkeit, bevor Worte gelesen werden. Definieren Sie:'),

  ul([
    'Primäre Headline-Schrift: Schafft Wirkung und Wiedererkennung',
    'Sekundäre Body-Schrift: Gewährleistet Lesbarkeit bei längeren Texten',
    'Optionale Akzent-Schrift: Für spezielle Elemente (sparsam verwenden)',
    'Schrift-Hierarchie: Konsistente Größen und Gewichte für H1-H6, Body, Captions'
  ]),

  p('Schriftpersönlichkeits-Guide: Serif (traditionell, etabliert), Sans-Serif (modern, clean), Script (elegant, persönlich), Display (kreativ, bold), Monospace (technisch, präzise).'),

  h4('6. Visuelle Sprache'),

  p('Über Logo und Farben hinaus definieren Sie Ihren visuellen Stil:'),

  ul([
    'Fotografie-Stil: Stimmung, Beleuchtung, Motive, Farbbehandlung',
    'Illustrations-Stil: Falls verwendet, welcher Ansatz? (minimal, detailliert, isometrisch)',
    'Ikonografie: Konsistenter Icon-Stil (Outline, gefüllt, abgerundet)',
    'Grafische Elemente: Muster, Formen, Texturen, die die Marke unterstützen',
    'Layout-Prinzipien: Rastersysteme, Abstände, Kompositionsregeln'
  ]),

  h4('7. Markenstimme'),

  p('Wie Ihre Marke über alle Kommunikationskanäle spricht:'),

  pBold('Ton-Dimensionen: '),
  p('Definieren Sie, wo Sie auf jedem Spektrum liegen: Formell ↔ Locker, Ernst ↔ Verspielt, Respektvoll ↔ Frech, Enthusiastisch ↔ Sachlich.'),

  pBold('Messaging-Framework: '),
  ul([
    'Tagline: Ein einprägsamer Satz, der Ihre Essenz einfängt',
    'Value Proposition: Was Sie anbieten und warum es wichtig ist',
    'Key Messages: 3-5 Kernbotschaften für verschiedene Zielgruppen',
    'Beweispunkte: Belege, die Ihre Behauptungen unterstützen'
  ]),

  h3('Das Brand Book: Ihre Identitäts-Bibel'),

  pMixed([
    'Dokumentieren Sie alles in einem Brand Book (Style Guide). Das gewährleistet Konsistenz und macht das Onboarding neuer Teammitglieder oder Agenturen effizient. Sehen Sie unsere ',
    { text: 'Branding-Leistungen', link: '/de/leistungen/branding' },
    ', wie wir umfassende Markenrichtlinien erstellen.'
  ]),

  p('Wesentliche Brand-Book-Abschnitte:'),

  ol([
    'Markengeschichte: Historie, Mission, Vision, Werte',
    'Logo-Richtlinien: Versionen, Schutzraum, Mindestgrößen, Don\'ts',
    'Farbpalette: Primär-, Sekundär-, Akzentfarben mit Codes (HEX, RGB, CMYK, Pantone)',
    'Typografie: Schriftfamilien, -gewichte, -größen, Hierarchie',
    'Fotografie: Stil-Richtlinien und Beispiele',
    'Stimme & Ton: Schreibrichtlinien mit Beispielen',
    'Anwendungen: Wie die Identität über alle Touchpoints angewendet wird'
  ]),

  h3('Häufige Branding-Fehler vermeiden'),

  ul([
    'Strategie überspringen: Direkt zum Visuellen springen ohne strategisches Fundament',
    'Wettbewerber kopieren: Verschmelzen, wenn Sie hervorstechen sollten',
    'Trends folgen: Trendiges statt Zeitlosem wählen',
    'Inkonsistente Anwendung: Unterschiedliche Looks über Kanäle hinweg',
    'Design per Komitee: Zu viele Meinungen verwässern die Unverwechselbarkeit',
    'Digital vernachlässigen: Nicht für Bildschirme und Social Media optimieren',
    'Evolution vergessen: Nie aktualisieren, wenn das Unternehmen wächst'
  ]),

  h3('Unser Markenentwicklungs-Prozess'),

  pMixed([
    'Bei ',
    { text: 'GoldenWing', link: '/de/leistungen/branding' },
    ' folgen wir einem bewährten Prozess:'
  ]),

  ol([
    'Discovery (Woche 1-2): Stakeholder-Interviews, Wettbewerbsanalyse, Zielgruppenforschung',
    'Strategie (Woche 2-3): Positionierung, Messaging-Framework, Creative Brief',
    'Exploration (Woche 3-4): Mehrere kreative Richtungen präsentiert',
    'Verfeinerung (Woche 4-5): Gewählte Richtung mit Feedback weiterentwickeln',
    'Finalisierung (Woche 5-6): Alle Identitätselemente vervollständigen',
    'Richtlinien (Woche 6-7): Umfassendes Brand Book',
    'Launch (Woche 7-8): Implementierungsunterstützung und Schulung'
  ]),

  h3('Häufig gestellte Fragen'),

  pBold('Was kostet Markenidentitäts-Entwicklung?'),
  p('Basis-Logodesign: 1.000-3.000 €. Komplette Markenidentität: 5.000-15.000 €. Enterprise-Branding: 15.000-50.000 €+. Kosten variieren nach Umfang, Komplexität und Agenturerfahrung.'),

  pBold('Wie lange dauert der Prozess?'),
  p('Mindestens 6-8 Wochen für Qualitätsarbeit. Rush-Projekte sind möglich, können aber Ergebnisse kompromittieren. Enterprise-Projekte können 3-6 Monate dauern.'),

  pBold('Wann sollte ich rebranden?'),
  p('Erwägen Sie ein Rebranding, wenn: Ihre Zielgruppe sich verschoben hat, Sie Ihrer Identität entwachsen sind, Sie neue Märkte betreten, Wettbewerber aufgeholt haben, oder Ihre Marke nicht mehr Ihre Werte widerspiegelt.'),

  pBold('Kann ich das selbst machen?'),
  p('Sie können grundlegende Markenelemente mit Tools wie Canva oder Looka entwickeln. Allerdings bietet professionelles Branding strategische Tiefe, Einzigartigkeit und Flexibilität, die DIY-Tools nicht erreichen können.'),

  hr(),

  h3('Bereit, Ihre Marke aufzubauen?'),

  pMixed([
    { text: 'Kontaktieren Sie uns für eine kostenlose Markenberatung', link: '/de/kontakt' },
    '. Wir besprechen Ihre Ziele, analysieren Ihre Marktposition und empfehlen den richtigen Ansatz für Ihr Unternehmen.'
  ]),

  pMixed([
    'Entdecken Sie unsere ',
    { text: 'Branding-Leistungen', link: '/de/leistungen/branding' },
    ' oder sehen Sie ',
    { text: 'Branding-Projekte in unserem Portfolio', link: '/de/referenzen/branding' },
    '.'
  ])
]);

// ============================================
// POST 6: Customer Journey - Deutsche Version
// ============================================
const post6Content = createLexicalContent([
  h2('Customer Journey Mapping: Der komplette Leitfaden zum Kundenverständnis'),

  pMixed([
    'Unternehmen, die im Kundenerlebnis excellieren, steigern ihren Umsatz ',
    { bold: '4-8% über dem Marktdurchschnitt' },
    ', laut ',
    { text: 'Bain & Company Forschung', link: 'https://www.bain.com/insights/the-value-of-customer-experience/', external: true },
    '. Customer Journey Mapping ist das Fundament für dieses Erlebnis. Dieser Leitfaden zeigt Ihnen genau, wie Sie Journey Maps erstellen, die echte Geschäftsverbesserungen bewirken.'
  ]),

  h3('Was ist eine Customer Journey Map?'),

  p('Eine Customer Journey Map ist eine visuelle Darstellung jeder Interaktion, die ein Kunde mit Ihrer Marke hat – von der ersten Wahrnehmung bis zum Kauf und darüber hinaus. Sie zeigt:'),

  ul([
    'Was Kunden in jeder Phase tun (Aktionen)',
    'Was sie denken und fühlen (Emotionen)',
    'Was sie erleben (Touchpoints)',
    'Wo sie kämpfen (Pain Points)',
    'Wo Sie verbessern können (Chancen)'
  ]),

  p('Journey Maps verschieben Ihre Perspektive von innen-nach-außen (was wir tun) zu außen-nach-innen (was Kunden erleben). Diese Verschiebung ist essentiell für kundenzentrisches Business.'),

  h3('Warum Customer Journey Mapping wichtig ist'),

  p('Der geschäftliche Impact von Journey Mapping ist erheblich:'),

  ul([
    'Umsatz: Journey-fokussierte Unternehmen sehen 10-15% Umsatzsteigerung',
    'Kosten: Reduziert Servicekosten um 15-20% durch Friktionseliminierung',
    'Zufriedenheit: Verbessert NPS-Scores durch Identifikation und Behebung von Pain Points',
    'Bindung: Erhöht Customer Lifetime Value durch verbessertes Erlebnis',
    'Alignment: Fokussiert Teams auf gemeinsame Kundenergebnisse'
  ]),

  pMixed([
    'Journey Mapping ist eine Kernkomponente unserer ',
    { text: 'Digital-Strategie-Leistungen', link: '/de/leistungen/digitale-strategie' },
    '.'
  ]),

  h3('Die 5 Phasen einer Customer Journey'),

  h4('Phase 1: Awareness (Bewusstsein)'),

  p('Der Kunde erkennt ein Problem oder Bedürfnis und entdeckt potenzielle Lösungen. Ihre Marke tritt in sein Bewusstsein.'),

  pBold('Kundenziele: '),
  p('Ihr Problem verstehen, Optionen entdecken, erste Informationen sammeln.'),

  pBold('Wichtige Touchpoints: '),
  ul([
    'Suchmaschinen-Ergebnisse (Google, Bing)',
    'Social-Media-Posts und Anzeigen',
    'Mundpropaganda und Empfehlungen',
    'Branchenpublikationen und Blogs',
    'Events, Webinare, Podcasts',
    'Display- und Video-Werbung'
  ]),

  pBold('Erfolgsmetriken: '),
  p('Markenbekanntheit, Website-Traffic, Social Reach, Share of Voice.'),

  h4('Phase 2: Consideration (Erwägung)'),

  p('Der Kunde recherchiert aktiv und bewertet Optionen. Er vergleicht Sie mit Alternativen.'),

  pBold('Kundenziele: '),
  p('Optionen bewerten, Unterschiede verstehen, Passung validieren.'),

  pBold('Wichtige Touchpoints: '),
  ul([
    'Website (besonders Service-/Produktseiten)',
    'Bewertungen und Testimonials',
    'Fallstudien und Portfolio',
    'Vergleichsinhalte',
    'E-Mail-Nurturing-Sequenzen',
    'Verkaufsgespräche',
    'Kostenlose Ressourcen (Guides, Tools)'
  ]),

  pBold('Erfolgsmetriken: '),
  p('Seiten pro Sitzung, Verweildauer, Content-Downloads, E-Mail-Engagement.'),

  h4('Phase 3: Decision (Entscheidung)'),

  p('Der Kunde entscheidet, ob er kauft. Hier werden Deals gewonnen oder verloren.'),

  pBold('Kundenziele: '),
  p('Entscheidung validieren, Risiko minimieren, beste Konditionen erhalten.'),

  pBold('Wichtige Touchpoints: '),
  ul([
    'Preis- und Angebotsseiten',
    'Verkaufspräsentationen',
    'Kostenlose Trials oder Demos',
    'Vertrags- und Checkout-Prozess',
    'Garantie- und Rückgabebedingungen',
    'Letzte Fragen und Einwandbehandlung'
  ]),

  pBold('Erfolgsmetriken: '),
  p('Conversion Rate, Angebotsannahme, Warenkorbabbruch, Sales Cycle Länge.'),

  h4('Phase 4: Retention (Bindung)'),

  p('Das Nach-Kauf-Erlebnis bestimmt, ob Kunden bleiben und wachsen. Akquise kostet 5-25× mehr als Bindung.'),

  pBold('Kundenziele: '),
  p('Wert aus dem Kauf erhalten, Probleme schnell lösen, sich unterstützt fühlen.'),

  pBold('Wichtige Touchpoints: '),
  ul([
    'Onboarding-Erlebnis',
    'Kundenservice-Kanäle',
    'Produkt-Updates und Verbesserungen',
    'Account Management',
    'Treueprogramme',
    'Regelmäßige Kommunikation'
  ]),

  pBold('Erfolgsmetriken: '),
  p('NPS, Kundenzufriedenheit, Support-Lösungszeit, Churn Rate.'),

  h4('Phase 5: Advocacy (Fürsprache)'),

  p('Zufriedene Kunden werden zu Markenbotschaftern, treiben Empfehlungen und organisches Wachstum.'),

  pBold('Kundenziele: '),
  p('Positive Erfahrungen teilen, anderen helfen, sich wertgeschätzt fühlen.'),

  pBold('Wichtige Touchpoints: '),
  ul([
    'Empfehlungsprogramme',
    'Bewertungsanfragen',
    'User-Generated Content Möglichkeiten',
    'Community-Teilnahme',
    'Fallstudien-Mitwirkung',
    'Social Sharing Aufforderungen'
  ]),

  pBold('Erfolgsmetriken: '),
  p('Empfehlungsrate, Bewertungsvolumen, Social Mentions, Customer Advocacy Score.'),

  h3('Wie Sie eine Customer Journey Map erstellen: Schritt für Schritt'),

  h4('Schritt 1: Definieren Sie Ihre Ziele'),

  p('Starten Sie mit klaren Zielen. Welche Entscheidungen wird diese Map informieren?'),

  ul([
    'Einen bestimmten Conversion-Punkt verbessern?',
    'Churn in einer bestimmten Phase reduzieren?',
    'Content-Lücken identifizieren?',
    'Teams auf Kundenbedürfnisse ausrichten?',
    'Ein neues Produkt oder Service planen?'
  ]),

  h4('Schritt 2: Erstellen Sie Buyer Personas'),

  p('Erstellen Sie detaillierte Profile Ihrer idealen Kunden:'),

  ul([
    'Demografie: Alter, Standort, Position, Unternehmensgröße',
    'Ziele: Was versuchen sie zu erreichen?',
    'Herausforderungen: Welche Hindernisse haben sie?',
    'Verhaltensweisen: Wie recherchieren und kaufen sie?',
    'Präferenzen: Welche Kanäle nutzen sie?'
  ]),

  p('Pro-Tipp: Interviewen Sie 5-10 echte Kunden. Personas basierend auf Annahmen sind oft falsch.'),

  h4('Schritt 3: Listen Sie alle Touchpoints auf'),

  p('Mappen Sie jeden Interaktionspunkt zwischen Kunden und Ihrer Marke:'),

  ul([
    'Digital: Website, Social Media, E-Mail, Anzeigen, App',
    'Menschlich: Verkaufsgespräche, Support, Events, Meetings',
    'Physisch: Laden, Verpackung, Direct Mail, Events',
    'Drittanbieter: Bewertungen, Partner-Seiten, Presse'
  ]),

  h4('Schritt 4: Mappen Sie die aktuelle Journey'),

  p('Dokumentieren Sie für jede Phase:'),

  ul([
    'Aktionen: Was tut der Kunde?',
    'Gedanken: Welche Fragen hat er?',
    'Emotionen: Wie fühlt er sich? (Frustriert? Selbstbewusst? Verwirrt?)',
    'Touchpoints: Wo findet Interaktion statt?',
    'Pain Points: Wo kämpft er?'
  ]),

  h4('Schritt 5: Identifizieren Sie Pain Points & Chancen'),

  p('Analysieren Sie die Map auf Verbesserungsbereiche:'),

  ul([
    'Friktionspunkte: Wo brechen Kunden ab?',
    'Emotions-Täler: Wo sinkt die Zufriedenheit?',
    'Lücken: Wo fehlen Informationen?',
    'Inkonsistenzen: Wo variiert das Erlebnis?',
    'Wettbewerbs-Schwächen: Wo machen andere es besser?'
  ]),

  h4('Schritt 6: Designen Sie die ideale Journey'),

  p('Erstellen Sie eine Vision für das verbesserte Erlebnis:'),

  ul([
    'Wie sollte sich jede Phase anfühlen?',
    'Welche Touchpoints brauchen Verbesserung?',
    'Welche neuen Touchpoints könnten helfen?',
    'Wie kann Technologie das Erlebnis verbessern?',
    'Welche internen Änderungen sind nötig?'
  ]),

  h4('Schritt 7: Priorisieren & Implementieren'),

  p('Nutzen Sie eine Impact/Aufwand-Matrix zur Priorisierung:'),

  ul([
    'Quick Wins: Hoher Impact, geringer Aufwand → Sofort umsetzen',
    'Big Bets: Hoher Impact, hoher Aufwand → Sorgfältig planen',
    'Fill-Ins: Geringer Impact, geringer Aufwand → Bei Gelegenheit',
    'Time Sinks: Geringer Impact, hoher Aufwand → Vermeiden oder zurückstellen'
  ]),

  h3('Tools für Journey Mapping'),

  pBold('Visuelles Mapping: '),
  ul([
    { parts: [{ text: 'Miro', link: 'https://miro.com', external: true }, ' – Kollaboratives Whiteboard mit Journey-Templates'] },
    { parts: [{ text: 'Figma', link: 'https://figma.com', external: true }, ' – Design-Tool mit Journey-Mapping-Fähigkeiten'] },
    'Lucidchart – Diagramm-Tool mit Customer Journey Templates',
    'Smaply – Dedizierte Journey Mapping Software'
  ]),

  pBold('Daten & Analytics: '),
  ul([
    'Google Analytics 4 – Verhaltensdaten über Touchpoints',
    { parts: [{ text: 'Hotjar', link: 'https://hotjar.com', external: true }, ' – Heatmaps, Recordings und Umfragen'] },
    'Mixpanel – Produktanalytics für digitale Journeys',
    'HubSpot – CRM-Daten über den gesamten Kundenlebenszyklus'
  ]),

  pBold('Research & Feedback: '),
  ul([
    'Umfragen (Typeform, SurveyMonkey) für direktes Feedback',
    'Nutzerinterviews für qualitative Einblicke',
    'Support-Ticket-Analyse zur Pain-Point-Identifikation',
    'Social Listening für ungefragtes Feedback'
  ]),

  h3('Best Practices für effektive Journey Maps'),

  ol([
    'Basieren Sie Maps auf echten Daten, nicht Annahmen. Interviewen Sie Kunden und analysieren Sie Verhalten.',
    'Inkludieren Sie die emotionale Journey, nicht nur Aktionen. Wie Kunden sich fühlen, treibt Entscheidungen.',
    'Erstellen Sie separate Maps für verschiedene Personas. One Size fits nicht all.',
    'Machen Sie es visuell und zugänglich. Eine Journey Map sollte leicht verständlich sein.',
    'Aktualisieren Sie regelmäßig. Customer Journeys entwickeln sich mit Ihrem Business und Markt.',
    'Involvieren Sie cross-funktionale Teams. Journey Maps brechen Silos auf.',
    'Verbinden Sie Maps mit Metriken. Tracken Sie Verbesserungen über Zeit.'
  ]),

  h3('Häufig gestellte Fragen'),

  pBold('Wie lange dauert Journey Mapping?'),
  p('Eine einfache Journey Map kann in 1-2 Tagen erstellt werden. Eine umfassende, forschungsbasierte Map dauert 2-4 Wochen inklusive Kundeninterviews und Datenanalyse.'),

  pBold('Wer sollte am Prozess beteiligt sein?'),
  p('Inkludieren Sie Vertreter aus Marketing, Vertrieb, Kundenservice, Produkt und Führung. Verschiedene Perspektiven offenbaren verschiedene Einblicke.'),

  pBold('Wie oft sollten wir unsere Journey Map aktualisieren?'),
  p('Überprüfen Sie vierteljährlich und aktualisieren Sie bei signifikanten Änderungen (neue Produkte, Marktverschiebungen, wichtige Feedback-Themen).'),

  pBold('Was ist der Unterschied zwischen Journey Maps und Service Blueprints?'),
  p('Journey Maps fokussieren auf Kundenerlebnis. Service Blueprints fügen interne Prozesse und Systeme hinzu, die jeden Touchpoint unterstützen.'),

  hr(),

  h3('Hilfe beim Mapping Ihrer Customer Journey?'),

  pMixed([
    { text: 'Kontaktieren Sie uns für eine kostenlose Beratung', link: '/de/kontakt' },
    '. Unser ',
    { text: 'Digital-Strategie-Team', link: '/de/leistungen/digitale-strategie' },
    ' ist spezialisiert auf Customer Journey Analyse und Optimierung.'
  ]),

  pMixed([
    'Bereit, Ihr digitales Kundenerlebnis zu verbessern? Entdecken Sie unsere ',
    { text: 'Webdesign-Leistungen', link: '/de/leistungen/webdesign' },
    ' und ',
    { text: 'SEO-Leistungen', link: '/de/leistungen/seo-sichtbarkeit' },
    ', um wichtige Touchpoints zu optimieren.'
  ])
]);

// ============================================
// Update Function
// ============================================
function updatePost(postId, content, seoTitle, seoDesc, seoKeywords) {
  const stmt = db.prepare(`
    UPDATE posts_locales
    SET content = ?,
        seo_meta_title = ?,
        seo_meta_description = ?,
        seo_keywords = ?
    WHERE _parent_id = ? AND _locale = 'de'
  `);

  stmt.run(content, seoTitle, seoDesc, seoKeywords, postId);
  console.log(`✅ Updated Post ${postId} (DE)`);
}

// ============================================
// Run Updates
// ============================================
console.log('Starting enhanced German blog content updates...\n');

updatePost(1, post1Content,
  'Website Kosten 2025: Komplette Preisübersicht für professionelle Websites | GoldenWing',
  'Was kostet eine professionelle Website 2025? Von 3.000 € für Firmenwebsites bis 50.000 €+ für Webanwendungen. Transparente Preisaufschlüsselung mit allen Faktoren.',
  'website kosten, was kostet eine website, webdesign preise österreich, website erstellen kosten, homepage kosten'
);

updatePost(2, post2Content,
  'WordPress vs Webflow 2025: Der komplette CMS-Vergleich | GoldenWing',
  'WordPress vs Webflow: Welches CMS ist besser für Ihr Unternehmen? Detaillierter Vergleich von Kosten, SEO, Performance, Design-Flexibilität und E-Commerce.',
  'wordpress vs webflow, cms vergleich 2025, bestes cms für unternehmen, webflow oder wordpress, website plattform vergleich'
);

updatePost(4, post4Content,
  'Markenidentität entwickeln: Der komplette Leitfaden 2025 | GoldenWing',
  'Erfahren Sie, wie Sie eine starke Markenidentität entwickeln. Schritt-für-Schritt Anleitung von der Strategie bis zum Brand Book mit Expertentipps.',
  'markenidentität entwickeln, branding guide, corporate identity erstellen, visuelle identität, markenstrategie'
);

updatePost(6, post6Content,
  'Customer Journey Mapping: Kompletter Leitfaden mit Vorlagen 2025 | GoldenWing',
  'Meistern Sie Customer Journey Mapping mit unserem umfassenden Leitfaden. Die 5 Phasen, Schritt-für-Schritt-Prozess, Tools und Best Practices.',
  'customer journey mapping, customer journey map vorlage, kundenreise phasen, kundenerlebnis optimierung, journey mapping anleitung'
);

console.log('\n✅ All German posts enhanced successfully!');
db.close();
