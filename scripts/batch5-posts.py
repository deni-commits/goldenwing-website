#!/usr/bin/env python3
import sqlite3
import json
import os

db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'goldenwing.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

def create_content(children):
    return json.dumps({"root":{"type":"root","children":children,"direction":"ltr","format":"","indent":0,"version":1}})

def p(text):
    return {"type":"paragraph","children":[{"type":"text","text":text,"version":1}],"version":1}

def h2(text):
    return {"type":"heading","tag":"h2","children":[{"type":"text","text":text,"version":1}],"version":1}

def h3(text):
    return {"type":"heading","tag":"h3","children":[{"type":"text","text":text,"version":1}],"version":1}

def li(text):
    return {"type":"listitem","children":[{"type":"text","text":text,"version":1}],"version":1}

def ul(items):
    return {"type":"list","listType":"bullet","children":[li(item) for item in items],"version":1}

# Post 41: website-security-hackerangriffe-schutz
post41 = create_content([
    p("Jeden Tag werden tausende Websites gehackt. Nicht von Geheimdiensten, sondern von automatisierten Bots, die nach bekannten Schwachstellen suchen. Die Frage ist nicht ob, sondern wann Ihre Website angegriffen wird."),
    p("In diesem Guide zeigen wir, wie Sie Ihre Website schützen."),

    h2("Warum Websites gehackt werden"),
    ul([
        "Spam-Verteilung: Ihre Website verschickt plötzlich Spam",
        "Malware: Besucher werden infiziert",
        "SEO-Spam: Versteckte Links zu dubiosen Seiten",
        "Krypto-Mining: Ihre Server schürfen Bitcoin",
        "Datendiebstahl: Kundendaten werden gestohlen",
        "Erpressung: Daten verschlüsselt, Lösegeld gefordert"
    ]),
    p("Hacker greifen automatisiert an. Kleine Websites sind genauso Ziele wie große."),

    h2("Die häufigsten Angriffsvektoren"),

    h3("Veraltete Software"),
    p("WordPress, Plugins, Themes – jede nicht aktualisierte Software ist ein Einfallstor. Die meisten Hacks nutzen bekannte Schwachstellen, für die es längst Updates gibt."),

    h3("Schwache Passwörter"),
    p("'admin123' ist kein Passwort. Bots probieren automatisch Standard-Kombinationen durch. Weak passwords sind Einladungen."),

    h3("Unsichere Plugins/Themes"),
    p("Besonders bei WordPress: Kostenlose oder 'nulled' (raubkopierte) Plugins enthalten oft Malware oder haben Sicherheitslücken."),

    h3("Fehlkonfiguration"),
    p("Offene Verzeichnisse, Debug-Modi im Live-Betrieb, ungeschützte Admin-Bereiche."),

    h2("Grundlegende Schutzmaßnahmen"),

    h3("Updates, Updates, Updates"),
    ul([
        "CMS (WordPress, etc.) immer aktuell halten",
        "Plugins und Themes regelmäßig updaten",
        "PHP-Version aktuell halten",
        "Automatische Updates wo sinnvoll aktivieren"
    ]),

    h3("Starke Passwörter"),
    ul([
        "Mindestens 12 Zeichen, besser mehr",
        "Kombination aus Buchstaben, Zahlen, Sonderzeichen",
        "Unique für jeden Dienst",
        "Passwort-Manager verwenden"
    ]),

    h3("Zwei-Faktor-Authentifizierung"),
    p("Selbst wenn das Passwort geknackt wird – ohne zweiten Faktor kein Zugang. Für Admin-Bereiche Pflicht."),

    h3("HTTPS"),
    p("SSL-Verschlüsselung ist Standard. Schützt Daten während der Übertragung."),

    h2("WordPress-spezifische Sicherheit"),

    h3("Sicherheits-Plugins"),
    ul([
        "Wordfence: Firewall und Malware-Scanner",
        "Sucuri Security: Monitoring und Cleanup",
        "iThemes Security: Umfassende Härtung"
    ]),

    h3("Admin-Bereich schützen"),
    ul([
        "Anderen Login-Pfad verwenden (nicht /wp-admin)",
        "Login-Versuche begrenzen",
        "IP-Whitelist für Admin wenn möglich",
        "Benutzername 'admin' vermeiden"
    ]),

    h3("Themes und Plugins"),
    ul([
        "Nur aus vertrauenswürdigen Quellen",
        "Keine nulled/raubkopierten Versionen",
        "Ungenutzte Plugins löschen (nicht nur deaktivieren)",
        "Vor Installation Bewertungen prüfen"
    ]),

    h2("Server-Sicherheit"),
    ul([
        "SSH statt FTP verwenden",
        "Firewall konfigurieren",
        "Fail2ban gegen Brute-Force",
        "Regelmäßige Server-Updates",
        "Backups (3-2-1 Regel)"
    ]),

    h2("Monitoring"),
    ul([
        "Uptime-Monitoring: Wissen, wenn die Seite down ist",
        "File-Integrity-Monitoring: Änderungen erkennen",
        "Traffic-Anomalien: Ungewöhnliche Spitzen bemerken",
        "Google Search Console: Warnung bei Malware"
    ]),

    h2("Wenn es passiert ist"),
    p("Ihre Website wurde gehackt. Was tun?"),
    ul([
        "Ruhe bewahren",
        "Website offline nehmen (Maintenance Mode)",
        "Backups prüfen (wann war der letzte saubere Zustand?)",
        "Malware-Scan durchführen",
        "Alle Passwörter ändern",
        "Sauberes Backup wiederherstellen",
        "Sicherheitslücke finden und schließen",
        "Google informieren (falls Seite geblacklisted)"
    ]),
    p("Wenn Sie es nicht selbst können: Professionelle Hilfe holen. Schnell handeln ist wichtig."),

    h2("Sicherheits-Checkliste"),
    ul([
        "CMS und alle Komponenten aktuell?",
        "Starke, einzigartige Passwörter?",
        "Zwei-Faktor-Authentifizierung aktiv?",
        "HTTPS überall?",
        "Backups funktionieren?",
        "Sicherheits-Plugin installiert?",
        "Login-Versuche begrenzt?",
        "Ungenutzte Plugins entfernt?"
    ]),

    h2("Fazit"),
    p("Website-Sicherheit ist kein einmaliges Projekt, sondern ein kontinuierlicher Prozess. Die gute Nachricht: Die meisten Angriffe nutzen bekannte Schwachstellen. Wer die Basics beherrscht, ist zu 90% sicher."),
    p("Investieren Sie Zeit in Sicherheit – bevor es zu spät ist. Ein gehackter Shop, eine infizierte Website, gestohlene Kundendaten sind teuer und rufschädigend."),
    p("Sie möchten Ihre Website professionell absichern? Wir führen Security-Audits durch und implementieren Schutzmaßnahmen.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website Security: Wie Sie Ihre Website vor Hackern schützen – mit konkreten Maßnahmen und Checkliste.' WHERE slug = 'website-security-hackerangriffe-schutz'""", (post41,))

# Post 42: website-selbst-erstellen-oder-machen-lassen
post42 = create_content([
    p("Die ehrliche Frage, die niemand stellt: Brauchen Sie wirklich eine Agentur? Oder reicht für Ihre Anforderungen ein DIY-Website-Builder? Die Antwort ist nicht für alle gleich."),
    p("In diesem Artikel geben wir Ihnen – als Agentur – eine ehrliche Einschätzung."),

    h2("Selbst erstellen: Die Möglichkeiten"),

    h3("Website-Builder (Wix, Squarespace, Jimdo)"),
    p("Sie ziehen Elemente per Drag & Drop zusammen, wählen ein Template, tippen Ihre Texte. In wenigen Stunden ist eine Website fertig."),
    ul([
        "Kosten: 10-30€/Monat",
        "Zeitaufwand: 1-3 Tage",
        "Technische Kenntnisse: Minimal",
        "Ergebnis: Solide für einfache Zwecke"
    ]),

    h3("WordPress mit Theme"),
    p("Mehr Kontrolle als Builder, aber auch mehr Aufwand. Theme kaufen, anpassen, Content einpflegen."),
    ul([
        "Kosten: Hosting (5-20€/Monat) + Theme (50-100€)",
        "Zeitaufwand: 2-7 Tage",
        "Technische Kenntnisse: Mittel",
        "Ergebnis: Professioneller als Builder, wenn gut gemacht"
    ]),

    h2("Wann DIY reicht"),
    ul([
        "Sie brauchen eine einfache Präsenz (5-10 Seiten)",
        "Keine speziellen Funktionen nötig",
        "Budget ist sehr begrenzt",
        "Sie haben Zeit zum Lernen",
        "Design muss nicht einzigartig sein",
        "Die Website ist nicht geschäftskritisch"
    ]),
    p("Beispiele: Freiberufler-Portfolio, kleiner Verein, persönlicher Blog, erste MVP-Version."),

    h2("Wann Sie eine Agentur brauchen"),
    ul([
        "Die Website soll Kunden gewinnen (nicht nur informieren)",
        "Design soll Ihre Marke widerspiegeln (nicht ein Template)",
        "Spezielle Funktionen nötig (Shop, Buchungen, Integrationen)",
        "SEO ist wichtig für Ihr Business",
        "Keine Zeit oder Interesse, sich einzuarbeiten",
        "Die Website ist geschäftskritisch"
    ]),
    p("Beispiele: Unternehmenswebsite, E-Commerce, Lead-Generierung, komplexe Anwendungen."),

    h2("Die versteckten Kosten von DIY"),

    h3("Zeit"),
    p("Ihre Zeit hat einen Wert. 40 Stunden an einer Website basteln, die eine Agentur in 20 macht – was kostet das Sie wirklich?"),

    h3("Lernkurve"),
    p("Sie lernen das Tool, nicht Webdesign. Grundlagen wie Typografie, Farbtheorie, UX fehlen. Das sieht man dem Ergebnis an."),

    h3("Opportunitätskosten"),
    p("Zeit für die Website ist Zeit, die Sie nicht in Ihr Kerngeschäft stecken."),

    h3("Nachbesserungen"),
    p("Viele DIY-Websites werden nach 1-2 Jahren komplett neu gemacht – weil sie dann doch nicht ausreichen."),

    h2("Die Mittelweg-Optionen"),

    h3("Template von Agentur anpassen lassen"),
    p("Sie kaufen ein Theme, die Agentur passt es an. Günstiger als Custom, besser als rein DIY."),

    h3("Grundgerüst von Agentur, selbst pflegen"),
    p("Agentur erstellt die Website, Sie pflegen den Content. Häufiges Modell."),

    h3("Beratung + DIY"),
    p("Agentur berät bei Strategie und Konzept, Sie setzen selbst um."),

    h2("Fragen zur Entscheidung"),
    ul([
        "Wie wichtig ist die Website für Ihr Geschäft?",
        "Haben Sie Zeit und Interesse, sich einzuarbeiten?",
        "Brauchen Sie ein einzigartiges Design?",
        "Welche Funktionen brauchen Sie wirklich?",
        "Was ist Ihr realistisches Budget?",
        "Wie schnell muss es gehen?"
    ]),

    h2("Unser ehrlicher Rat"),
    p("Als Agentur könnten wir sagen: 'Sie brauchen unbedingt professionelle Hilfe.' Aber das wäre nicht ehrlich."),
    p("Wenn Sie ein kleines Budget haben, eine einfache Website brauchen und Zeit mitbringen: Probieren Sie einen Website-Builder. Vielleicht reicht das."),
    p("Wenn die Website wichtig für Ihr Business ist, Kunden gewinnen soll und Ihre Marke repräsentieren muss: Investieren Sie in professionelle Arbeit. Der Unterschied ist real und messbar."),

    h2("Fazit"),
    p("Es gibt kein Richtig oder Falsch. Es gibt nur: Was passt zu Ihrer Situation? Seien Sie ehrlich bei der Einschätzung, und treffen Sie eine informierte Entscheidung."),
    p("Sie sind unsicher, was für Sie passt? In einem kostenlosen Erstgespräch schätzen wir Ihre Situation ein – auch wenn das Ergebnis ist, dass Sie uns nicht brauchen.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website selbst erstellen oder machen lassen? Eine ehrliche Analyse, wann DIY reicht und wann Sie eine Agentur brauchen.' WHERE slug = 'website-selbst-erstellen-oder-machen-lassen'""", (post42,))

# Post 43: website-startups-guide-2025
post43 = create_content([
    p("Als Startup haben Sie wenig Geld, wenig Zeit und viel zu tun. Die Website muss funktionieren, ohne ein Vermögen zu kosten. Gleichzeitig ist sie oft der erste Eindruck bei Investoren, Kunden und Partnern."),
    p("Dieser Guide zeigt, wie Sie als Startup eine effektive Website erstellen."),

    h2("Was Startups wirklich brauchen"),
    p("Nicht das, was große Unternehmen haben. Sondern:"),
    ul([
        "Schnell online (kein monatelanges Projekt)",
        "Flexibel änderbar (Pivot = neue Website-Botschaft)",
        "Kosteneffizient (Cash ist knapp)",
        "Überzeugend (für Kunden und Investoren)",
        "Skalierbar (wächst mit Ihnen)"
    ]),

    h2("Phase 1: MVP-Website"),
    p("Beim Start brauchen Sie keine perfekte Website. Sie brauchen eine, die funktioniert."),

    h3("Minimum Viable Website"),
    ul([
        "Eine Seite (Onepager) reicht oft",
        "Klare Value Proposition",
        "Problem und Lösung erklärt",
        "Call-to-Action (E-Mail sammeln, Kontakt)",
        "Vielleicht: Preise, Team"
    ]),

    h3("Tools für den Start"),
    ul([
        "Carrd: Schnelle Onepager, ab 19$/Jahr",
        "Webflow: Mehr Kontrolle, ab 14$/Monat",
        "Framer: Modern, schnell, ab 10$/Monat",
        "Notion + Super: Notion-Seiten als Website"
    ]),

    h2("Phase 2: Wachstums-Website"),
    p("Wenn Product-Market Fit gefunden ist und Sie skalieren:"),
    ul([
        "Mehr Seiten (Features, Use Cases, Preise)",
        "Blog für Content Marketing und SEO",
        "Customer Stories / Case Studies",
        "Besseres Design (jetzt lohnt sich die Investition)",
        "Analytics und Conversion-Tracking"
    ]),

    h2("Was auf die Startup-Homepage gehört"),

    h3("Above the Fold"),
    ul([
        "Was Sie tun (in einem Satz)",
        "Für wen (Zielgruppe klar)",
        "Warum es wichtig ist",
        "CTA (Demo buchen, Zugang anfordern)"
    ]),

    h3("Der Rest"),
    ul([
        "Problem/Lösung darstellen",
        "Wie es funktioniert",
        "Social Proof (Kunden, Testimonials, Logos)",
        "Team (optional, wichtiger für B2B/Investoren)",
        "Kontakt"
    ]),

    h2("Für Investoren"),
    p("Investoren schauen auf Ihre Website. Was sie sehen wollen:"),
    ul([
        "Dass Sie das Problem verstehen",
        "Dass die Lösung Sinn macht",
        "Dass es Traction gibt (Kunden, Nutzer, Wachstum)",
        "Dass das Team kompetent ist",
        "Dass Sie kommunizieren können"
    ]),
    p("Keine übertriebenen Claims, keine Buzzword-Suppe. Klarheit gewinnt."),

    h2("SEO für Startups"),
    ul([
        "Fokus auf Long-Tail Keywords (weniger Wettbewerb)",
        "Content Marketing: Blog mit Mehrwert",
        "Früh anfangen (SEO braucht Zeit)",
        "Technische Basics: Schnell, mobile-friendly, indexierbar"
    ]),

    h2("Häufige Startup-Fehler"),
    ul([
        "Zu viel bauen: MVP heißt minimal. Nicht 20 Seiten für Tag 1.",
        "Zu generisch: 'Wir revolutionieren X' sagt nichts",
        "Kein CTA: Besucher wissen nicht, was sie tun sollen",
        "Perfektionismus: Lieber schnell live als ewig polieren",
        "Tech-Fokus statt Nutzen: Features statt Ergebnisse kommunizieren"
    ]),

    h2("Budget-Realität für Startups"),
    ul([
        "MVP-Onepager (DIY): 100-500€",
        "MVP-Website (Agentur): 2.000-5.000€",
        "Wachstums-Website: 5.000-15.000€",
        "Premium Startup-Website: 15.000-30.000€"
    ]),
    p("Pre-Seed: DIY oder günstiger Freelancer. Seed: Professionelle Website sinnvoll. Series A+: Investieren Sie ordentlich."),

    h2("Wann neu machen?"),
    p("Typische Trigger für Website-Überarbeitung:"),
    ul([
        "Pivot: Neues Produkt = neue Botschaft",
        "Funding: Mehr Budget = bessere Präsenz",
        "Wachstum: MVP reicht nicht mehr",
        "Feedback: Kunden verstehen nicht, was Sie tun"
    ]),

    h2("Fazit"),
    p("Als Startup brauchen Sie keine perfekte Website. Sie brauchen eine, die heute funktioniert und morgen anpassbar ist."),
    p("Starten Sie lean, messen Sie, iterieren Sie. Die perfekte Website entsteht durch Feedback, nicht durch Planung am grünen Tisch."),
    p("Sie sind Startup und brauchen eine Website, die überzeugt – ohne Ihr Runway zu verbrennen? Wir verstehen Startup-Realitäten und liefern effizient.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website für Startups: MVP-Ansatz, was wirklich wichtig ist und wie Sie mit begrenztem Budget überzeugen.' WHERE slug = 'website-startups-guide-2025'""", (post43,))

# Post 44: website-wartung-monatlich-checkliste
post44 = create_content([
    p("Eine Website ist kein 'fire and forget'-Projekt. Sie braucht regelmäßige Pflege – für Sicherheit, Performance und Aktualität. Diese Checkliste zeigt, was Sie monatlich tun sollten."),

    h2("Warum regelmäßige Wartung wichtig ist"),
    ul([
        "Sicherheit: Updates schließen Sicherheitslücken",
        "Performance: Datenbank und Cache optimieren",
        "SEO: Probleme früh erkennen",
        "Nutzererfahrung: Broken Links, veraltete Inhalte finden",
        "Rechtliches: Datenschutz-Texte aktuell halten"
    ]),

    h2("Wöchentliche Aufgaben (5 Minuten)"),
    ul([
        "Backup prüfen: Läuft das automatische Backup?",
        "Uptime checken: War die Seite erreichbar?",
        "Spam prüfen: Kommentare, Formular-Spam",
        "Kritische Updates: Sicherheits-Updates sofort installieren"
    ]),

    h2("Monatliche Aufgaben"),

    h3("Updates (15 Minuten)"),
    ul([
        "CMS-Version aktualisieren",
        "Plugins/Extensions updaten",
        "Theme updaten",
        "Nach Update: Kurztest der wichtigsten Funktionen"
    ]),
    p("Tipp: Erst Backup machen, dann updaten. Bei kritischen Updates: Staging-Test."),

    h3("Sicherheits-Check (10 Minuten)"),
    ul([
        "Security-Plugin-Bericht prüfen",
        "Benutzerkonten prüfen (unbekannte Accounts?)",
        "Login-Versuche checken",
        "Malware-Scan durchführen"
    ]),

    h3("Performance-Check (10 Minuten)"),
    ul([
        "Ladezeit messen (PageSpeed Insights)",
        "Core Web Vitals prüfen",
        "Cache leeren und neu aufbauen",
        "Datenbank optimieren"
    ]),

    h3("Content-Check (15 Minuten)"),
    ul([
        "Broken Links finden (Tool: Broken Link Checker)",
        "Veraltete Inhalte identifizieren",
        "Bilder ohne Alt-Text finden",
        "Kontaktformular testen"
    ]),

    h3("SEO-Check (15 Minuten)"),
    ul([
        "Google Search Console: Fehler und Warnungen",
        "Indexierungsstatus prüfen",
        "Rankings wichtiger Keywords checken",
        "Neue Backlinks prüfen"
    ]),

    h3("Rechtliches (5 Minuten)"),
    ul([
        "Impressum noch korrekt?",
        "Datenschutzerklärung aktuell?",
        "Cookie-Banner funktioniert?"
    ]),

    h2("Vierteljährliche Aufgaben"),
    ul([
        "Vollständiger Backup-Test (Wiederherstellung testen)",
        "Hosting/Server-Performance prüfen",
        "Analytics-Bericht analysieren",
        "Content-Audit: Was performt, was nicht?",
        "Wettbewerbs-Check: Was machen andere?"
    ]),

    h2("Jährliche Aufgaben"),
    ul([
        "SSL-Zertifikat prüfen (falls nicht auto-renewal)",
        "Domain-Verlängerung sicherstellen",
        "Hosting-Vertrag prüfen (bessere Optionen?)",
        "Umfassender SEO-Audit",
        "Design-Review: Noch zeitgemäß?",
        "Rechtliche Texte durch Anwalt prüfen lassen"
    ]),

    h2("Tools für die Wartung"),

    h3("Monitoring"),
    ul([
        "UptimeRobot: Kostenlose Uptime-Überwachung",
        "Google Search Console: SEO-Monitoring",
        "Google Analytics: Traffic-Überwachung"
    ]),

    h3("Sicherheit"),
    ul([
        "Wordfence/Sucuri: Malware-Scans (WordPress)",
        "Have I Been Pwned: E-Mail-Kompromittierung prüfen"
    ]),

    h3("Performance"),
    ul([
        "PageSpeed Insights: Google's Messung",
        "GTmetrix: Detaillierte Analyse"
    ]),

    h2("Wartung outsourcen?"),
    p("Wann macht das Sinn?"),
    ul([
        "Sie haben keine Zeit/Lust",
        "Technisches Verständnis fehlt",
        "Die Website ist geschäftskritisch",
        "Sie wollen Garantie bei Problemen"
    ]),
    p("Wartungsverträge kosten typischerweise 50-200€/Monat, je nach Umfang."),

    h2("Wenn Sie nichts anderes tun"),
    p("Das absolute Minimum:"),
    ul([
        "Backups sicherstellen",
        "Sicherheits-Updates installieren",
        "Einmal im Monat prüfen, ob alles funktioniert"
    ]),
    p("Das dauert 15 Minuten pro Monat. Diese 15 Minuten können Sie vor großen Problemen bewahren."),

    h2("Fazit"),
    p("Regelmäßige Wartung ist wie Zähneputzen: Langweilig, aber wichtig. Die Alternative – Probleme ignorieren, bis etwas kaputtgeht – ist teurer."),
    p("Erstellen Sie einen Kalender-Eintrag, arbeiten Sie die Checkliste ab, dokumentieren Sie, was Sie getan haben. Ihr zukünftiges Ich wird dankbar sein."),
    p("Keine Zeit oder Lust auf Wartung? Wir bieten Wartungsverträge, die Ihnen die Arbeit abnehmen – für ruhigen Schlaf und eine funktionierende Website.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website Wartung: Was Sie monatlich tun sollten – die komplette Checkliste für Sicherheit, Performance und Aktualität.' WHERE slug = 'website-wartung-monatlich-checkliste'""", (post44,))

# Post 45: wix-squarespace-wordpress-custom-vergleich
post45 = create_content([
    p("Welche Plattform ist die richtige für Ihre Website? Wix, Squarespace, WordPress oder eine Custom-Entwicklung? Die Antwort hängt von Ihren Anforderungen ab."),
    p("Dieser Vergleich hilft Ihnen bei der Entscheidung."),

    h2("Wix"),

    h3("Was es ist"),
    p("Ein Website-Builder mit Drag & Drop-Editor. Sie wählen ein Template und passen es visuell an."),

    h3("Vorteile"),
    ul([
        "Extrem einfach zu nutzen",
        "Schnell: Website in Stunden fertig",
        "All-inclusive: Hosting, SSL, Support inklusive",
        "Viele Templates",
        "App-Markt für Zusatzfunktionen"
    ]),

    h3("Nachteile"),
    ul([
        "Template-Wechsel nicht möglich nach Start",
        "SEO-Einschränkungen",
        "Performance oft mittelmäßig",
        "Begrenzte Anpassbarkeit",
        "Vendor Lock-in: Export schwierig"
    ]),

    h3("Ideal für"),
    p("Kleine Unternehmen, Portfolios, einfache Websites ohne technische Ressourcen."),

    h3("Kosten"),
    p("14-39€/Monat (ohne Werbung)."),

    h2("Squarespace"),

    h3("Was es ist"),
    p("Website-Builder mit Fokus auf Design. Bekannt für ästhetische Templates."),

    h3("Vorteile"),
    ul([
        "Sehr schöne Templates",
        "Gute E-Commerce-Integration",
        "Einfacher Editor",
        "Zuverlässiges Hosting",
        "Guter Support"
    ]),

    h3("Nachteile"),
    ul([
        "Weniger Flexibilität als WordPress",
        "Begrenzte Drittanbieter-Integrationen",
        "Kein Export der Website möglich",
        "Teurer als WordPress-Hosting"
    ]),

    h3("Ideal für"),
    p("Kreative, Fotografen, Designer, kleine E-Commerce-Shops."),

    h3("Kosten"),
    p("12-40€/Monat."),

    h2("WordPress"),

    h3("Was es ist"),
    p("Open-Source CMS, das 40%+ aller Websites betreibt. Kostenlos, aber erfordert eigenes Hosting."),

    h3("Vorteile"),
    ul([
        "Maximale Flexibilität",
        "Riesiges Plugin-Ökosystem (60.000+)",
        "Tausende Themes",
        "Volle Kontrolle über Code",
        "Kein Vendor Lock-in",
        "Starke SEO-Möglichkeiten"
    ]),

    h3("Nachteile"),
    ul([
        "Lernkurve steiler",
        "Eigenes Hosting nötig",
        "Updates selbst managen",
        "Sicherheit in eigener Verantwortung",
        "Qualität von Themes/Plugins variiert stark"
    ]),

    h3("Ideal für"),
    p("Die meisten Unternehmenswebsites, Blogs, E-Commerce (WooCommerce), komplexere Projekte."),

    h3("Kosten"),
    p("Software kostenlos. Hosting: 5-50€/Monat. Themes: 0-100€. Plugins: meist kostenlos."),

    h2("Custom-Entwicklung"),

    h3("Was es ist"),
    p("Maßgeschneiderte Website, von Grund auf entwickelt oder mit modernen Frameworks (React, Next.js, etc.)."),

    h3("Vorteile"),
    ul([
        "100% an Ihre Anforderungen angepasst",
        "Beste Performance möglich",
        "Keine Kompromisse bei Funktionen",
        "Einzigartig",
        "Skalierbar für komplexe Anwendungen"
    ]),

    h3("Nachteile"),
    ul([
        "Teuer (ab 10.000€+)",
        "Längere Entwicklungszeit",
        "Änderungen erfordern Entwickler",
        "Wartung komplexer"
    ]),

    h3("Ideal für"),
    p("Web-Applikationen, komplexe E-Commerce-Systeme, Unternehmen mit speziellen Anforderungen, Startups mit Tech-Fokus."),

    h3("Kosten"),
    p("10.000€ - 150.000€+ je nach Komplexität."),

    h2("Vergleichstabelle"),

    h3("Einfachheit"),
    ul([
        "Wix: 5/5 (sehr einfach)",
        "Squarespace: 4/5 (einfach)",
        "WordPress: 3/5 (Lernkurve)",
        "Custom: 1/5 (Entwickler nötig)"
    ]),

    h3("Flexibilität"),
    ul([
        "Wix: 2/5",
        "Squarespace: 2/5",
        "WordPress: 4/5",
        "Custom: 5/5"
    ]),

    h3("SEO-Potenzial"),
    ul([
        "Wix: 3/5",
        "Squarespace: 3/5",
        "WordPress: 5/5",
        "Custom: 5/5"
    ]),

    h3("Kosten (3 Jahre)"),
    ul([
        "Wix: 500-1.500€",
        "Squarespace: 450-1.500€",
        "WordPress: 200-2.000€",
        "Custom: 15.000-50.000€+"
    ]),

    h2("Unsere Empfehlung"),
    ul([
        "Einzelperson, kleines Budget, einfache Seite: Wix oder Squarespace",
        "Kreative/Designer: Squarespace",
        "Unternehmen, Blog, E-Commerce: WordPress",
        "Komplexe Anwendung, große Firma: Custom"
    ]),

    h2("Fazit"),
    p("Es gibt keine 'beste' Plattform – nur die beste für Ihre Situation. Seien Sie ehrlich bei der Einschätzung Ihrer Anforderungen und Ressourcen."),
    p("Wenn Sie unsicher sind: Starten Sie einfach, skalieren Sie später. Eine Squarespace-Site lässt sich später zu WordPress migrieren, wenn Sie herauswachsen."),
    p("Sie brauchen Beratung zur Plattformwahl? Wir analysieren Ihre Anforderungen und empfehlen die passende Lösung – auch wenn das bedeutet, dass Sie uns nicht brauchen.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Wix vs. Squarespace vs. WordPress vs. Custom: Der große CMS-Vergleich mit Vor- und Nachteilen.' WHERE slug = 'wix-squarespace-wordpress-custom-vergleich'""", (post45,))

conn.commit()
conn.close()

print("Batch 5 complete: 5 posts updated")
print("Posts updated:")
print("41. website-security-hackerangriffe-schutz")
print("42. website-selbst-erstellen-oder-machen-lassen")
print("43. website-startups-guide-2025")
print("44. website-wartung-monatlich-checkliste")
print("45. wix-squarespace-wordpress-custom-vergleich")
print("")
print("ALL 45 POSTS COMPLETE!")
