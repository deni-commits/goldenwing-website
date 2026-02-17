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

# Post 31: website-aerzte-praxen-2025
post31 = create_content([
    p("Patienten googeln, bevor sie einen Arzt aufsuchen. 77% der Patienten suchen online nach Gesundheitsinformationen und Ärzten. Ihre Website ist oft der erste Eindruck – und kann der Unterschied sein zwischen einem neuen Patienten und einem, der zur Konkurrenz geht."),

    h2("Was Patienten auf einer Arzt-Website suchen"),
    ul([
        "Kontaktdaten und Öffnungszeiten (sofort sichtbar)",
        "Online-Terminbuchung (immer wichtiger)",
        "Leistungsspektrum (Was behandeln Sie?)",
        "Informationen zum Arzt/Team (Vertrauen aufbauen)",
        "Anfahrt und Parkmöglichkeiten",
        "Barrierefreiheit der Praxis"
    ]),
    p("All das muss schnell auffindbar sein. Patienten sind oft gestresst oder krank – sie haben keine Geduld für komplizierte Navigation."),

    h2("Die wichtigsten Elemente"),

    h3("Startseite"),
    ul([
        "Praxisname und Fachrichtung sofort erkennbar",
        "Telefonnummer groß und klickbar",
        "Button zur Terminbuchung prominent platziert",
        "Öffnungszeiten auf einen Blick",
        "Vertrauenssignale (Kassenärztliche Zulassung, Zertifikate)"
    ]),

    h3("Über uns / Das Team"),
    p("Patienten wollen wissen, wem sie sich anvertrauen:"),
    ul([
        "Professionelle Fotos (keine Stockbilder)",
        "Qualifikationen und Werdegang",
        "Spezialisierungen",
        "Menschliche Note (Hobbys, Philosophie)"
    ]),

    h3("Leistungen"),
    p("Beschreiben Sie Ihre Leistungen verständlich:"),
    ul([
        "Keine Fachsprache ohne Erklärung",
        "Was bedeutet die Behandlung für den Patienten?",
        "Welche Probleme lösen Sie?",
        "Kassenleistung oder Privatleistung?"
    ]),

    h3("Online-Terminbuchung"),
    p("Pflicht in 2025. Möglichkeiten:"),
    ul([
        "Doctolib, Jameda, Doctena (etablierte Plattformen)",
        "Eigene Lösung integriert in PVS",
        "Simpler Terminanfrage-Formulare (Minimum)"
    ]),

    h2("Rechtliche Anforderungen"),
    p("Arzt-Websites unterliegen besonderen Regeln:"),
    ul([
        "Impressumspflicht mit Zulassungsbehörde",
        "Berufsbezeichnung und Kammer",
        "Keine Werbung, die gegen das Heilmittelwerbegesetz verstößt",
        "Keine Erfolgsversprechen",
        "Datenschutz besonders wichtig (Gesundheitsdaten)"
    ]),

    h2("SEO für Ärzte"),
    p("Lokales SEO ist entscheidend:"),
    ul([
        "Google Business Profil vollständig und aktuell",
        "NAP konsistent (Name, Adresse, Telefon)",
        "Keywords: 'Zahnarzt Wien 1010', 'Hautarzt Graz Umgebung'",
        "Bewertungen aktiv sammeln und beantworten"
    ]),

    h2("Häufige Fehler bei Praxis-Websites"),
    ul([
        "Keine Mobile-Optimierung: Patienten suchen am Handy",
        "Veraltete Informationen: Öffnungszeiten, die nicht stimmen",
        "Keine Online-Terminbuchung: Hürde für neue Patienten",
        "Stock-Fotos statt echte Team-Bilder: Wirkt unpersönlich",
        "Medizinjargon: Patienten verstehen 'Parodontitis-Prophylaxe' nicht"
    ]),

    h2("Was eine Praxis-Website kostet"),
    ul([
        "Einfache Website (5-7 Seiten, Template): 2.000 - 5.000€",
        "Professionelle Website (individuell, Terminbuchung): 5.000 - 12.000€",
        "Komplexe Lösung (Multi-Standort, eigene Buchungslösung): 12.000€+"
    ]),
    p("Dazu: Laufende Kosten für Hosting (20-50€/Monat), Terminbuchungssystem, Wartung."),

    h2("Fazit"),
    p("Eine professionelle Praxis-Website ist keine Luxus-Investition – sie ist das digitale Äquivalent zum gepflegten Wartezimmer. Sie vermittelt den ersten Eindruck und kann der Grund sein, warum Patienten Sie wählen."),
    p("Investieren Sie in eine Website, die Vertrauen schafft und den Praxisalltag erleichtert – für Sie und Ihre Patienten."),
    p("Sie möchten eine moderne Praxis-Website? Wir verstehen die besonderen Anforderungen im Gesundheitswesen und entwickeln Websites, die Patienten gewinnen.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website für Ärzte und Praxen: Was Patienten erwarten, rechtliche Anforderungen und wie Sie mehr Patienten gewinnen.' WHERE slug = 'website-aerzte-praxen-2025'""", (post31,))

# Post 32: website-backup-strategie-2025
post32 = create_content([
    p("Ihre Website ist weg. Gehackt, Server-Crash, oder jemand hat aus Versehen alles gelöscht. Ohne Backup bedeutet das: Alles neu machen. Wochen Arbeit, tausende Euro, verlorene Daten. Mit Backup: Eine Stunde Wiederherstellung."),
    p("In diesem Guide zeigen wir, wie Sie Ihre Website richtig sichern."),

    h2("Warum Backups lebensnotwendig sind"),
    ul([
        "Hackerangriffe: WordPress-Seiten werden täglich angegriffen",
        "Menschliche Fehler: Jemand löscht versehentlich die Datenbank",
        "Server-Probleme: Hardware stirbt, Hoster macht Fehler",
        "Updates: Ein fehlerhaftes Plugin zerschießt die Seite",
        "Malware: Schadcode infiziert Ihre Website"
    ]),
    p("Die Frage ist nicht ob, sondern wann etwas passiert. Backups sind Ihre Versicherung."),

    h2("Was muss gesichert werden?"),

    h3("Dateien"),
    ul([
        "Alle Website-Dateien (PHP, HTML, CSS, JS)",
        "Hochgeladene Medien (Bilder, PDFs, Videos)",
        "Theme-Dateien und Plugins",
        "Konfigurationsdateien"
    ]),

    h3("Datenbank"),
    ul([
        "Alle Inhalte (Posts, Seiten, Produkte)",
        "Einstellungen",
        "Benutzerkonten",
        "Kommentare, Bestellungen, etc."
    ]),
    p("Ohne Datenbank-Backup sind Ihre Inhalte verloren, auch wenn die Dateien noch da sind."),

    h2("Die 3-2-1 Backup-Regel"),
    ul([
        "3 Kopien: Original + 2 Backups",
        "2 verschiedene Medien: Z.B. Server + Cloud",
        "1 Off-Site: Mindestens ein Backup außerhalb des Hosters"
    ]),
    p("Wenn Ihr einziges Backup beim gleichen Hoster liegt wie die Website, und der Hoster hat ein Problem, sind beide weg."),

    h2("Backup-Frequenz"),
    ul([
        "Tägliche Backups: Für Websites mit häufigen Änderungen, Shops",
        "Wöchentliche Backups: Für Websites mit wenig Aktivität",
        "Vor jedem Update: Bevor Sie Plugins, Themes oder Core updaten"
    ]),
    p("Je öfter sich Ihre Website ändert, desto häufiger sollten Sie sichern."),

    h2("Backup-Lösungen für WordPress"),

    h3("Plugins"),
    ul([
        "UpdraftPlus: Kostenlose Version ausreichend, Cloud-Integration",
        "BackWPup: Solide Alternative",
        "VaultPress/Jetpack: Von Automattic, Premium",
        "All-in-One WP Migration: Einfach, gut für Umzüge"
    ]),

    h3("Hosting-Backups"),
    p("Die meisten guten Hoster bieten automatische Backups:"),
    ul([
        "Prüfen Sie: Wie oft? Wie lange aufbewahrt?",
        "Können Sie selbst wiederherstellen?",
        "Sind Datenbank-Backups inkludiert?"
    ]),
    p("Verlassen Sie sich nicht nur darauf – machen Sie eigene Backups zusätzlich."),

    h3("Cloud-Speicher"),
    ul([
        "Google Drive, Dropbox, OneDrive",
        "Amazon S3 (technischer, günstiger bei viel Speicher)",
        "Eigener Server (nur wenn Sie wissen, was Sie tun)"
    ]),

    h2("Backups testen"),
    p("Ein Backup, das Sie nicht wiederherstellen können, ist nutzlos. Testen Sie regelmäßig:"),
    ul([
        "Laden Sie ein Backup herunter",
        "Stellen Sie es auf einer Test-Umgebung wieder her",
        "Prüfen Sie, ob alles funktioniert"
    ]),
    p("Mindestens einmal pro Quartal sollten Sie das machen."),

    h2("Im Ernstfall: Wiederherstellung"),
    p("Wenn es soweit ist:"),
    ul([
        "Ruhe bewahren",
        "Schadenausmaß prüfen (komplett oder teilweise?)",
        "Aktuellstes Backup identifizieren",
        "Wiederherstellung durchführen",
        "Nach der Wiederherstellung: Ursache finden und beheben"
    ]),

    h2("Backup-Checkliste"),
    ul([
        "Automatische Backups eingerichtet?",
        "Dateien UND Datenbank gesichert?",
        "Mindestens ein Backup Off-Site/Cloud?",
        "Backup-Frequenz angemessen?",
        "Wiederherstellung getestet?",
        "Benachrichtigung bei Fehlern?"
    ]),

    h2("Fazit"),
    p("Backups sind langweilig – bis Sie sie brauchen. Dann sind sie unbezahlbar. Investieren Sie eine Stunde in eine solide Backup-Strategie, und Sie können ruhig schlafen."),
    p("Die beste Backup-Strategie ist die, die Sie tatsächlich umsetzen. Lieber ein einfaches, automatisches System als ein komplexes, das nie eingerichtet wird."),
    p("Sie brauchen Hilfe beim Einrichten einer Backup-Lösung? Wir konfigurieren zuverlässige Backups und zeigen Ihnen, wie Sie im Ernstfall wiederherstellen.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website Backup: Die 3-2-1 Strategie, die besten Tools und wie Sie Ihre Daten richtig sichern.' WHERE slug = 'website-backup-strategie-2025'""", (post32,))

# Post 33: website-coaches-berater-2025
post33 = create_content([
    p("Als Coach oder Berater ist Ihre Website Ihr digitales Büro. Sie ist oft der erste Kontaktpunkt mit potenziellen Klienten – und entscheidet darüber, ob jemand Sie als vertrauenswürdig wahrnimmt oder weiterzieht."),
    p("In diesem Guide zeigen wir, was eine erfolgreiche Website für Coaches und Berater ausmacht."),

    h2("Die Herausforderung: Vertrauen über den Bildschirm"),
    p("Coaching und Beratung sind persönliche Dienstleistungen. Klienten müssen Ihnen vertrauen, bevor sie mit Ihnen arbeiten. Ihre Website muss dieses Vertrauen aufbauen, ohne dass Sie persönlich da sind."),
    p("Das bedeutet: Mehr zeigen, weniger behaupten. Authentizität statt Hochglanz."),

    h2("Die wichtigsten Seiten"),

    h3("Startseite"),
    ul([
        "Klare Positionierung: Wem helfen Sie wobei?",
        "Ihr Gesicht: Professionelles, sympathisches Foto",
        "Social Proof: Testimonials, Logos, Zahlen",
        "Klarer Call-to-Action: Was soll der Besucher tun?"
    ]),

    h3("Über mich"),
    p("Die wichtigste Seite für Coaches. Menschen kaufen Menschen:"),
    ul([
        "Ihre Geschichte: Warum tun Sie, was Sie tun?",
        "Qualifikationen: Ohne zu prahlen, aber nachweisbar",
        "Persönlichkeit: Was macht Sie besonders?",
        "Werte: Wofür stehen Sie?"
    ]),
    p("Schreiben Sie in der Ich-Form, persönlich und authentisch."),

    h3("Angebot/Leistungen"),
    ul([
        "Klare Beschreibung: Was bekommen Klienten konkret?",
        "Ergebnisse: Was erreichen Klienten durch die Arbeit mit Ihnen?",
        "Für wen: Für wen ist das Angebot gedacht (und für wen nicht)?",
        "Preise: Transparent oder zumindest 'ab'-Preise"
    ]),

    h3("Testimonials/Erfolgsgeschichten"),
    p("Nichts überzeugt mehr als Erfahrungen anderer:"),
    ul([
        "Echte Namen und Fotos (mit Erlaubnis)",
        "Konkrete Ergebnisse statt vager Lobhudelei",
        "Verschiedene Kliententypen abdecken",
        "Video-Testimonials sind Gold"
    ]),

    h3("Kontakt/Erstgespräch"),
    ul([
        "Niedrige Hürde: Kostenloses Erstgespräch anbieten",
        "Einfaches Formular: Nur nötige Felder",
        "Calendly oder ähnliches: Direkte Buchung ermöglichen",
        "Was passiert danach: Erwartungsmanagement"
    ]),

    h2("Content, der Klienten gewinnt"),

    h3("Blog/Artikel"),
    p("Zeigen Sie Expertise durch hilfreichen Content:"),
    ul([
        "Beantworten Sie Fragen Ihrer Zielgruppe",
        "Teilen Sie Methoden und Frameworks",
        "Geben Sie echten Mehrwert (nicht nur Teaser)",
        "SEO-optimiert für relevante Suchanfragen"
    ]),

    h3("Ressourcen/Downloads"),
    p("Lead Magnets funktionieren besonders gut:"),
    ul([
        "Checklisten und Workbooks",
        "Mini-Kurse oder Video-Serien",
        "E-Books zu Ihren Kernthemen",
        "Assessments und Tests"
    ]),

    h2("Was bei Coach-Websites oft falsch läuft"),
    ul([
        "Zu viel 'Ich': Weniger über sich, mehr über den Klienten",
        "Vage Formulierungen: 'Ich begleite Sie zu mehr Erfolg' sagt nichts",
        "Keine Spezialisierung: Wer alles kann, ist für niemanden relevant",
        "Stock-Fotos: Nutzen Sie eigene, authentische Bilder",
        "Kein Call-to-Action: Besucher wissen nicht, was sie tun sollen"
    ]),

    h2("SEO für Coaches und Berater"),
    ul([
        "Lokale Keywords: 'Business Coach Wien', 'Karriereberatung Graz'",
        "Nischen-Keywords: 'Burnout-Coaching Führungskräfte'",
        "Fragen-Keywords: 'Wie finde ich den richtigen Coach?'",
        "Google Business Profil: Unverzichtbar für lokale Sichtbarkeit"
    ]),

    h2("Was eine Coach-Website kostet"),
    ul([
        "Einfach (Template, selbst gepflegt): 1.500 - 4.000€",
        "Professionell (individuell, Buchungssystem): 5.000 - 12.000€",
        "Premium (Personal Brand, E-Learning Integration): 12.000 - 25.000€"
    ]),

    h2("Fazit"),
    p("Ihre Website ist Ihr stärkster Akquise-Kanal – wenn sie richtig gemacht ist. Investieren Sie in eine Website, die Ihre Persönlichkeit transportiert und Vertrauen aufbaut."),
    p("Konzentrieren Sie sich auf das, was Ihre idealen Klienten brauchen und wollen. Zeigen Sie, dass Sie verstehen, wo sie stehen – und wohin sie wollen."),
    p("Sie brauchen eine Website, die Klienten gewinnt? Wir entwickeln Websites für Coaches und Berater, die Persönlichkeit zeigen und konvertieren.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website für Coaches und Berater: Wie Sie online Vertrauen aufbauen und Klienten gewinnen.' WHERE slug = 'website-coaches-berater-2025'""", (post33,))

# Post 34: website-guide-2025-planung-bis-launch
post34 = create_content([
    p("Eine Website zu erstellen ist ein Projekt. Wie jedes Projekt braucht es Planung, klare Schritte und realistische Erwartungen. Dieser Guide führt Sie durch den gesamten Prozess – von der ersten Idee bis zum Launch."),

    h2("Phase 1: Strategie und Planung"),

    h3("Ziele definieren"),
    p("Was soll die Website erreichen? Konkret:"),
    ul([
        "Leads generieren (wie viele pro Monat?)",
        "Produkte verkaufen (welcher Umsatz?)",
        "Informieren (über was?)",
        "Marke aufbauen (bei wem?)"
    ]),
    p("Vage Ziele wie 'online präsent sein' helfen nicht. Je konkreter, desto besser."),

    h3("Zielgruppe analysieren"),
    ul([
        "Wer sind Ihre idealen Besucher?",
        "Was suchen sie? Welche Probleme haben sie?",
        "Wie suchen sie? (Desktop, Mobile, welche Keywords?)",
        "Was ist ihnen wichtig bei der Entscheidung?"
    ]),

    h3("Wettbewerb anschauen"),
    ul([
        "Was machen Konkurrenten gut?",
        "Was fehlt deren Websites?",
        "Wie können Sie sich differenzieren?"
    ]),

    h3("Budget festlegen"),
    p("Realistische Orientierung:"),
    ul([
        "Einfache Website (5-10 Seiten): 3.000 - 8.000€",
        "Professionelle Unternehmenswebsite: 8.000 - 25.000€",
        "E-Commerce: 10.000 - 50.000€",
        "Komplexe Webanwendung: 30.000€+"
    ]),

    h2("Phase 2: Konzeption"),

    h3("Sitemap erstellen"),
    p("Welche Seiten brauchen Sie? Typische Struktur:"),
    ul([
        "Startseite",
        "Über uns",
        "Leistungen/Produkte",
        "Referenzen/Portfolio",
        "Blog",
        "Kontakt",
        "Rechtliches (Impressum, Datenschutz)"
    ]),

    h3("Content planen"),
    ul([
        "Welche Texte brauchen Sie?",
        "Wer schreibt sie? (Intern, Agentur, Texter)",
        "Welche Bilder und Videos?",
        "Woher kommen die Medien?"
    ]),
    p("Content ist oft der Engpass. Planen Sie früh."),

    h3("Funktionen definieren"),
    ul([
        "Kontaktformular",
        "Newsletter-Anmeldung",
        "Blog mit Kategorien",
        "Shop-Funktionalität",
        "Buchungssystem",
        "Mehrsprachigkeit"
    ]),

    h2("Phase 3: Design"),

    h3("Wireframes"),
    p("Grobe Skizzen der Seitenstruktur. Zeigen Layout und Hierarchie ohne visuelle Details. Wichtig für die Abstimmung."),

    h3("Visuelles Design"),
    p("Basierend auf CI/Branding:"),
    ul([
        "Farbschema",
        "Typografie",
        "Bildsprache",
        "UI-Elemente (Buttons, Formulare)"
    ]),

    h3("Prototyp"),
    p("Klickbarer Prototyp zum Testen der Nutzererfahrung. Besser jetzt Probleme finden als nach der Entwicklung."),

    h2("Phase 4: Entwicklung"),

    h3("Technologie wählen"),
    ul([
        "CMS: WordPress, Webflow, Custom",
        "Hosting: Wo wird die Seite liegen?",
        "Integrationen: Analytics, CRM, Newsletter"
    ]),

    h3("Entwicklung"),
    ul([
        "Staging-Umgebung: Entwicklung auf Testserver",
        "Responsive Design: Desktop, Tablet, Mobile",
        "Cross-Browser Testing: Chrome, Firefox, Safari, Edge",
        "Performance-Optimierung"
    ]),

    h3("Content einpflegen"),
    p("Texte, Bilder, Videos werden eingepflegt und formatiert. Oft unterschätzt – braucht Zeit."),

    h2("Phase 5: Testing"),
    ul([
        "Funktionstest: Alle Links, Formulare, Buttons funktionieren",
        "Cross-Device: Alle Bildschirmgrößen",
        "Cross-Browser: Alle relevanten Browser",
        "Performance: Ladezeiten prüfen",
        "SEO-Check: Meta-Tags, Struktur, Sitemap",
        "Rechtliches: Impressum, Datenschutz, Cookie-Banner"
    ]),

    h2("Phase 6: Launch"),

    h3("Vor dem Launch"),
    ul([
        "Backup der alten Website (falls Relaunch)",
        "DNS-Einstellungen vorbereiten",
        "301-Redirects einrichten (falls URLs sich ändern)",
        "Google Analytics und Search Console einrichten"
    ]),

    h3("Launch"),
    ul([
        "DNS umstellen",
        "SSL-Zertifikat prüfen",
        "Wichtigste Seiten testen",
        "Sitemap bei Google einreichen"
    ]),

    h3("Nach dem Launch"),
    ul([
        "Monitoring: Rankings, Traffic, Fehler",
        "Feedback sammeln",
        "Bugs fixen",
        "Erste Optimierungen"
    ]),

    h2("Zeitplan (realistisch)"),
    ul([
        "Planung und Konzeption: 2-4 Wochen",
        "Design: 2-4 Wochen",
        "Entwicklung: 4-8 Wochen",
        "Content: Parallel, oft der Engpass",
        "Testing: 1-2 Wochen",
        "Gesamt: 2-4 Monate für eine professionelle Website"
    ]),

    h2("Fazit"),
    p("Eine gute Website braucht Zeit und Planung. Rushing führt zu mittelmäßigen Ergebnissen. Investieren Sie in den Prozess – es zahlt sich aus."),
    p("Der wichtigste Erfolgsfaktor: Klare Kommunikation zwischen allen Beteiligten. Definieren Sie Verantwortlichkeiten und Deadlines früh."),
    p("Sie planen ein Website-Projekt? Wir begleiten Sie von der Strategie bis zum Launch – strukturiert, transparent und termingerecht.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website erstellen: Der komplette Guide von Planung über Design und Entwicklung bis zum Launch.' WHERE slug = 'website-guide-2025-planung-bis-launch'""", (post34,))

# Post 35: website-handwerker-2025
post35 = create_content([
    p("'Ich brauche keine Website, meine Kunden kommen über Empfehlung.' Das mag heute noch stimmen. Aber die Empfehlung führt zum Googeln. Und wer Sie dann nicht findet oder eine schlechte Website sieht, ruft vielleicht doch den Konkurrenten an."),
    p("In diesem Guide zeigen wir, was eine gute Handwerker-Website ausmacht und wie Sie damit neue Aufträge gewinnen."),

    h2("Warum Handwerker eine Website brauchen"),
    ul([
        "97% der Verbraucher suchen online nach lokalen Dienstleistern",
        "Empfehlungen werden gegoogelt: 'Haben die gute Bewertungen?'",
        "Ohne Website wirken Sie unprofessionell",
        "24/7 erreichbar: Kunden können nachts anfragen"
    ]),

    h2("Was auf eine Handwerker-Website gehört"),

    h3("Startseite"),
    ul([
        "Sofort klar: Was machen Sie, wo?",
        "Telefonnummer groß und klickbar",
        "Kurze Vorstellung mit Foto",
        "Wichtigste Leistungen",
        "Vertrauenssignale (Jahre im Geschäft, Meisterbetrieb)"
    ]),

    h3("Leistungen"),
    p("Beschreiben Sie konkret, was Sie anbieten:"),
    ul([
        "Einzelne Leistungen auf eigenen Unterseiten",
        "Was ist inkludiert?",
        "Für wen ist das gedacht?",
        "Beispielbilder wenn möglich"
    ]),

    h3("Referenzen/Projekte"),
    p("Zeigen Sie, was Sie können:"),
    ul([
        "Vorher/Nachher-Bilder",
        "Kurze Projektbeschreibungen",
        "Ortsangaben (baut lokales Vertrauen)",
        "Verschiedene Projekttypen"
    ]),

    h3("Über uns"),
    ul([
        "Foto von Ihnen/dem Team",
        "Wie lange im Geschäft",
        "Qualifikationen (Meisterbrief)",
        "Was macht Sie besonders?"
    ]),

    h3("Kontakt"),
    ul([
        "Telefon (am wichtigsten!)",
        "E-Mail",
        "Kontaktformular (einfach halten)",
        "Einzugsgebiet",
        "Reaktionszeit ('Wir melden uns innerhalb von 24h')"
    ]),

    h2("Lokales SEO: Der Schlüssel für Handwerker"),

    h3("Google Business Profil"),
    p("Kostenlos und unverzichtbar:"),
    ul([
        "Vollständig ausfüllen",
        "Regelmäßig Fotos hochladen",
        "Auf Bewertungen antworten",
        "Beiträge posten"
    ]),

    h3("Lokale Keywords"),
    p("Optimieren Sie für:"),
    ul([
        "'Elektriker Wien 1020'",
        "'Installateur Notdienst Graz'",
        "'Malerarbeiten Salzburg'",
        "Kombinationen aus Leistung + Ort"
    ]),

    h3("Bewertungen"),
    ul([
        "Aktiv um Bewertungen bitten",
        "Google-Bewertungen sind am wichtigsten",
        "Auf alle Bewertungen antworten",
        "Negative professionell behandeln"
    ]),

    h2("Wichtige Features"),

    h3("Click-to-Call"),
    p("Telefonnummern müssen auf Mobile klickbar sein. Ein Tippen = Anruf."),

    h3("Schnelle Ladezeit"),
    p("Handwerker-Websites werden oft unterwegs aufgerufen, mit schlechtem Netz. Schnell = wichtig."),

    h3("WhatsApp-Integration"),
    p("Viele Kunden bevorzugen WhatsApp. Ein Button zur direkten Nachricht senkt die Hürde."),

    h2("Was eine Handwerker-Website kostet"),
    ul([
        "Einfach (5 Seiten, Template): 1.500 - 3.500€",
        "Professionell (individuell, SEO): 3.500 - 8.000€",
        "Mit Buchungssystem: 6.000 - 12.000€"
    ]),
    p("Laufende Kosten: Hosting 10-30€/Monat, optional: SEO-Betreuung."),

    h2("Häufige Fehler"),
    ul([
        "Keine Website: 'Ich hab ja keine Zeit' – kostet mehr, als es spart",
        "Veraltete Informationen: Falsche Telefonnummer, alter Firmensitz",
        "Keine Bilder: Stock-Fotos statt eigener Arbeit",
        "Nicht mobil-optimiert: Die Hälfte der Anfragen geht verloren",
        "Kein Google Business: Verschenkte lokale Sichtbarkeit"
    ]),

    h2("Fazit"),
    p("Eine gute Handwerker-Website ist keine Raketenwissenschaft. Klar, professionell, mit Ihren Kontaktdaten und Referenzen – das reicht für den Anfang."),
    p("Der wichtigste Schritt: Anfangen. Eine einfache Website ist besser als keine Website."),
    p("Sie brauchen eine Website, die Aufträge bringt? Wir erstellen Websites speziell für Handwerksbetriebe – pragmatisch, effektiv und bezahlbar.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website für Handwerker: Was drauf muss, wie Sie lokal gefunden werden und neue Aufträge gewinnen.' WHERE slug = 'website-handwerker-2025'""", (post35,))

# Post 36: website-keine-kunden-fehler-loesungen
post36 = create_content([
    p("Ihre Website ist online. Aber die Anfragen bleiben aus. Das ist frustrierend – und leider häufig. Die gute Nachricht: Die Ursachen sind meist identifizierbar und lösbar."),
    p("Hier sind die sieben häufigsten Gründe, warum Websites keine Kunden bringen, und was Sie dagegen tun können."),

    h2("Fehler 1: Niemand findet Ihre Website"),
    p("Die schönste Website bringt nichts, wenn sie unsichtbar ist."),

    h3("Das Problem"),
    ul([
        "Keine SEO-Optimierung",
        "Für kein relevantes Keyword auf Seite 1",
        "Google kennt die Seite nicht"
    ]),

    h3("Die Lösung"),
    ul([
        "Keyword-Recherche: Wonach suchen Ihre Kunden?",
        "On-Page SEO: Titel, Beschreibungen, Content optimieren",
        "Google Search Console einrichten und Sitemap einreichen",
        "Content Marketing: Regelmäßig relevante Inhalte publizieren"
    ]),

    h2("Fehler 2: Besucher verstehen nicht, was Sie anbieten"),
    p("Sie haben 5 Sekunden, um zu überzeugen. Wenn Besucher nicht sofort verstehen, was Sie tun, sind sie weg."),

    h3("Das Problem"),
    ul([
        "Unklare Headline",
        "Zu viel Fachjargon",
        "Keine klare Positionierung"
    ]),

    h3("Die Lösung"),
    ul([
        "Headline: Was bieten Sie wem?",
        "Subheadline: Wie lösen Sie das Problem?",
        "Einfache Sprache: Kein Insider-Vokabular"
    ]),

    h2("Fehler 3: Keine Handlungsaufforderung"),
    p("Besucher wissen nicht, was sie tun sollen."),

    h3("Das Problem"),
    ul([
        "Kein klarer Call-to-Action",
        "CTA versteckt oder unklar",
        "Zu viele konkurrierende Aktionen"
    ]),

    h3("Die Lösung"),
    ul([
        "Ein primärer CTA pro Seite",
        "Auffällig gestaltet (Farbe, Größe)",
        "Klarer Text ('Jetzt Beratung anfragen' statt 'Mehr erfahren')",
        "Mehrfach platzieren (nicht nur ganz unten)"
    ]),

    h2("Fehler 4: Kein Vertrauen"),
    p("Menschen kaufen von Menschen und Unternehmen, denen sie vertrauen."),

    h3("Das Problem"),
    ul([
        "Keine Testimonials oder Referenzen",
        "Keine Gesichter, kein Team",
        "Unprofessionelles Design"
    ]),

    h3("Die Lösung"),
    ul([
        "Echte Kundenstimmen mit Namen und Fotos",
        "Logos bekannter Kunden",
        "Team-Fotos und Über-uns-Seite",
        "Zertifikate und Auszeichnungen zeigen",
        "Professionelles, aktuelles Design"
    ]),

    h2("Fehler 5: Schlechte Mobile-Experience"),
    p("Mehr als die Hälfte Ihrer Besucher kommt vom Smartphone."),

    h3("Das Problem"),
    ul([
        "Website nicht responsive",
        "Zu kleine Buttons",
        "Langsame Ladezeit auf Mobile",
        "Horizontales Scrollen nötig"
    ]),

    h3("Die Lösung"),
    ul([
        "Responsive Design (Standard 2025)",
        "Mobile-First denken",
        "Touch-freundliche Elemente",
        "Performance optimieren"
    ]),

    h2("Fehler 6: Zu komplizierter Kontaktweg"),
    p("Je mehr Hürden, desto weniger Anfragen."),

    h3("Das Problem"),
    ul([
        "Kontaktformular mit 15 Feldern",
        "Keine Telefonnummer sichtbar",
        "Nur E-Mail-Adresse (Copy-Paste auf Mobile)",
        "Versteckte Kontaktseite"
    ]),

    h3("Die Lösung"),
    ul([
        "Telefonnummer prominent und klickbar",
        "Kurzes Formular (3-5 Felder)",
        "Kontakt in der Navigation",
        "Alternative Kanäle (WhatsApp, Chat)"
    ]),

    h2("Fehler 7: Falsche Zielgruppe"),
    p("Sie sprechen die falschen Menschen an – oder die richtigen Menschen falsch an."),

    h3("Das Problem"),
    ul([
        "Content für alle statt für jemanden",
        "Sprache passt nicht zur Zielgruppe",
        "Falsche Kanäle/Keywords"
    ]),

    h3("Die Lösung"),
    ul([
        "Zielgruppe klar definieren",
        "Sprache anpassen (formell/informell, Fachsprache/einfach)",
        "Content aus Kundenperspektive denken",
        "Keywords recherchieren, die Ihre Kunden nutzen"
    ]),

    h2("So finden Sie Ihre Probleme"),
    ul([
        "Google Analytics: Wo steigen Besucher aus?",
        "Heatmaps (Hotjar, Clarity): Wie interagieren Nutzer?",
        "User Tests: 5 Personen aus der Zielgruppe die Seite testen lassen",
        "Feedback fragen: Kunden direkt fragen, wie sie die Website finden"
    ]),

    h2("Fazit"),
    p("Websites, die keine Kunden bringen, haben fast immer identifizierbare Probleme. Die Lösung beginnt mit der ehrlichen Analyse: Was funktioniert nicht?"),
    p("Gehen Sie die sieben Punkte durch. Oft sind es kleine Änderungen, die große Wirkung haben."),
    p("Sie brauchen einen frischen Blick auf Ihre Website? Wir analysieren, wo es hakt, und zeigen konkrete Verbesserungen auf.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Warum Ihre Website keine Kunden bringt: 7 häufige Fehler und wie Sie sie beheben.' WHERE slug = 'website-keine-kunden-fehler-loesungen'""", (post36,))

# Post 37: website-performance-optimieren-guide
post37 = create_content([
    p("Geschwindigkeit ist Geld. Amazon hat berechnet: 100ms längere Ladezeit kostet 1% Umsatz. Für kleinere Websites gilt: Langsame Seiten verlieren Besucher, ranken schlechter bei Google und frustrieren Nutzer."),
    p("In diesem Guide zeigen wir, wie Sie Ihre Website schneller machen."),

    h2("Warum Performance wichtig ist"),
    ul([
        "Nutzererfahrung: 53% verlassen Seiten, die länger als 3 Sekunden laden",
        "SEO: Core Web Vitals sind Ranking-Faktor",
        "Conversion: Jede Sekunde weniger = mehr Conversions",
        "Mobile: Schlechtes Netz macht langsame Seiten unbenutzbar"
    ]),

    h2("Performance messen"),

    h3("Tools"),
    ul([
        "Google PageSpeed Insights: Schneller Check mit Empfehlungen",
        "GTmetrix: Detaillierte Analyse",
        "WebPageTest: Waterfall-Ansicht, verschiedene Standorte",
        "Lighthouse (Chrome DevTools): Umfassender Audit"
    ]),

    h3("Die wichtigsten Metriken"),
    ul([
        "LCP (Largest Contentful Paint): Hauptinhalt sichtbar (Ziel: <2.5s)",
        "FCP (First Contentful Paint): Erster Inhalt sichtbar (Ziel: <1.8s)",
        "TTFB (Time to First Byte): Server-Antwortzeit (Ziel: <200ms)",
        "Total Page Size: Gesamtgröße (Ziel: <2MB)"
    ]),

    h2("Bilder optimieren"),
    p("Bilder sind meist der größte Performance-Killer. Maßnahmen:"),

    h3("Richtige Formate"),
    ul([
        "WebP: Beste Kompression, von allen modernen Browsern unterstützt",
        "AVIF: Noch besser, aber weniger Unterstützung",
        "SVG: Für Icons und einfache Grafiken"
    ]),

    h3("Richtige Größen"),
    ul([
        "Nicht größer als nötig (keine 4000px-Bilder für 400px-Container)",
        "srcset für responsive Bilder",
        "Art Direction: Verschiedene Bilder für verschiedene Viewports"
    ]),

    h3("Kompression"),
    ul([
        "Tools: TinyPNG, Squoosh, ImageOptim",
        "Qualität 80-85% ist meist nicht sichtbar unterschiedlich zu 100%",
        "Automatisierung: Build-Process, CDN-Integration"
    ]),

    h3("Lazy Loading"),
    p("Bilder unter dem Fold erst laden, wenn der Nutzer scrollt. Einfach mit loading='lazy' Attribut."),

    h2("Code optimieren"),

    h3("CSS"),
    ul([
        "Critical CSS inline: Das für Above-the-Fold nötige CSS direkt im HTML",
        "Rest async laden",
        "Unused CSS entfernen (Tools: PurgeCSS)",
        "Minification: Whitespace und Kommentare entfernen"
    ]),

    h3("JavaScript"),
    ul([
        "Defer/Async: Render-Blocking vermeiden",
        "Code Splitting: Nur laden, was gebraucht wird",
        "Third-Party Scripts minimieren: Jedes externe Script kostet",
        "Minification und Bundling"
    ]),

    h2("Server-Optimierung"),

    h3("Hosting"),
    p("Billiges Shared Hosting ist oft langsam. Optionen:"),
    ul([
        "Managed WordPress (Kinsta, WP Engine)",
        "VPS mit SSD-Storage",
        "Cloud Hosting (AWS, Google Cloud)"
    ]),

    h3("Caching"),
    ul([
        "Browser Caching: Statische Dateien im Browser speichern",
        "Server Caching: Generierte Seiten cachen",
        "Object Caching: Datenbank-Abfragen cachen"
    ]),

    h3("CDN (Content Delivery Network)"),
    p("Statische Inhalte von Servern weltweit ausliefern. Beispiele: Cloudflare, Bunny CDN, AWS CloudFront."),

    h3("Gzip/Brotli"),
    p("Server-seitige Kompression. Brotli ist besser als Gzip, aber nicht überall verfügbar."),

    h2("WordPress-spezifisch"),
    ul([
        "Caching-Plugin: WP Rocket, W3 Total Cache",
        "Bildoptimierung: Imagify, ShortPixel",
        "Datenbank aufräumen: WP-Optimize",
        "Plugins minimieren: Jedes Plugin kostet Performance",
        "Theme wählen: Schlanke Themes statt Page Builder"
    ]),

    h2("Quick Wins"),
    ul([
        "Bilder komprimieren und richtig dimensionieren",
        "Caching aktivieren",
        "CDN nutzen",
        "Unused CSS/JS entfernen",
        "Webfonts optimieren (Preloading, font-display: swap)"
    ]),

    h2("Fazit"),
    p("Website-Performance ist kein einmaliges Projekt, sondern ein laufender Prozess. Messen Sie regelmäßig, identifizieren Sie Bottlenecks, optimieren Sie kontinuierlich."),
    p("Die gute Nachricht: Die größten Verbesserungen kommen oft von den einfachsten Maßnahmen – optimierte Bilder und Caching bringen schon viel."),
    p("Ihre Website ist langsam und Sie wissen nicht, wo anfangen? Wir analysieren die Ursachen und optimieren Ihre Website für bessere Performance.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website Performance optimieren: Bilder, Code, Server und Quick Wins für schnellere Ladezeiten.' WHERE slug = 'website-performance-optimieren-guide'""", (post37,))

# Post 38: website-relaunch-checkliste-2025
post38 = create_content([
    p("Ein Website-Relaunch ist ein großes Projekt mit vielen beweglichen Teilen. Ohne Checkliste ist es leicht, etwas zu vergessen – und Fehler beim Relaunch können SEO-Rankings, Traffic und Umsatz kosten."),
    p("Diese Checkliste deckt alles Wichtige ab."),

    h2("Vor dem Relaunch"),

    h3("Strategie und Planung"),
    ul([
        "Ziele definiert: Was soll der Relaunch erreichen?",
        "Budget festgelegt und genehmigt",
        "Timeline realistisch geplant",
        "Verantwortlichkeiten geklärt",
        "Stakeholder informiert"
    ]),

    h3("Bestandsaufnahme"),
    ul([
        "Alle URLs der alten Website dokumentiert",
        "Aktuelle Rankings notiert",
        "Traffic-Daten gesichert",
        "Backlink-Profil analysiert",
        "Top-performende Seiten identifiziert",
        "Bestehender Content inventarisiert"
    ]),

    h3("SEO-Vorbereitung"),
    ul([
        "URL-Mapping erstellt (alt → neu)",
        "301-Redirects geplant",
        "Keine wichtigen Seiten vergessen",
        "Keyword-Strategie für neue Struktur"
    ]),

    h3("Content"),
    ul([
        "Neuer Content erstellt und freigegeben",
        "Bilder und Medien vorbereitet",
        "Texte korrekturgelesen",
        "Rechtliche Texte aktualisiert (Impressum, Datenschutz)"
    ]),

    h2("Entwicklung und Testing"),

    h3("Entwicklung"),
    ul([
        "Staging-Umgebung eingerichtet",
        "Design-Umsetzung abgeschlossen",
        "Alle Seiten implementiert",
        "Responsive Design funktioniert",
        "Formulare funktionieren",
        "Integrationen (Analytics, CRM, Newsletter) eingerichtet"
    ]),

    h3("Testing"),
    ul([
        "Alle Seiten auf Fehler geprüft",
        "Cross-Browser Testing (Chrome, Firefox, Safari, Edge)",
        "Mobile Testing (iOS, Android)",
        "Funktionstest: Formulare, Suche, Shop",
        "Performance-Test: Ladezeiten akzeptabel?",
        "Broken Links geprüft",
        "Redirects getestet"
    ]),

    h3("SEO-Checks"),
    ul([
        "Title Tags und Meta Descriptions vorhanden",
        "H1 auf jeder Seite",
        "Alt-Tags für Bilder",
        "XML-Sitemap generiert",
        "Robots.txt korrekt",
        "Canonical Tags gesetzt",
        "Strukturierte Daten implementiert"
    ]),

    h2("Launch-Tag"),

    h3("Vorbereitung"),
    ul([
        "Backup der alten Website erstellt",
        "DNS-Änderungen vorbereitet",
        "Launch-Zeitpunkt gewählt (nicht Freitag Nachmittag!)",
        "Team informiert und verfügbar"
    ]),

    h3("Durchführung"),
    ul([
        "Staging → Live übertragen",
        "DNS umgestellt (falls nötig)",
        "SSL-Zertifikat aktiv und funktioniert",
        "301-Redirects aktiviert",
        "Cache geleert"
    ]),

    h3("Sofort-Checks"),
    ul([
        "Startseite erreichbar",
        "HTTPS funktioniert",
        "Wichtigste Seiten erreichbar",
        "Formulare funktionieren",
        "Tracking läuft"
    ]),

    h2("Nach dem Launch"),

    h3("Tag 1"),
    ul([
        "Alle Redirects funktionieren",
        "Google Search Console: Neue Sitemap eingereicht",
        "404-Fehler überwachen",
        "Performance überwachen"
    ]),

    h3("Erste Woche"),
    ul([
        "Rankings überwachen (kleine Schwankungen normal)",
        "Search Console auf Fehler prüfen",
        "Nutzer-Feedback sammeln",
        "Bugs beheben"
    ]),

    h3("Erste Monate"),
    ul([
        "Traffic-Entwicklung analysieren",
        "Conversion-Rate vergleichen",
        "Rankings beobachten",
        "Kontinuierliche Optimierung basierend auf Daten"
    ]),

    h2("Häufige Relaunch-Fehler"),
    ul([
        "Kein URL-Mapping: Traffic-Verlust durch fehlende Redirects",
        "Launch ohne Testing: Bugs im Live-Betrieb",
        "Zeitdruck: Qualität leidet",
        "Stakeholder-Überraschungen: Freigaben fehlen",
        "Kein Backup: Bei Problemen kein Zurück"
    ]),

    h2("Fazit"),
    p("Ein Relaunch ist komplex, aber mit guter Planung beherrschbar. Diese Checkliste ist Ihr Sicherheitsnetz – gehen Sie sie Punkt für Punkt durch."),
    p("Der wichtigste Rat: Nehmen Sie sich genug Zeit. Ein verschobener Relaunch ist besser als ein vermasselter."),
    p("Sie planen einen Website-Relaunch? Wir begleiten Sie durch den gesamten Prozess und stellen sicher, dass nichts schiefgeht.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website Relaunch Checkliste: Alles Wichtige vor, während und nach dem Launch.' WHERE slug = 'website-relaunch-checkliste-2025'""", (post38,))

# Post 39: website-relaunch-planung-anleitung
post39 = create_content([
    p("Ein Website-Relaunch ist mehr als ein neues Design. Es ist die Chance, Ihre Online-Präsenz strategisch neu auszurichten. Aber schlecht geplant kann es auch Rankings, Traffic und Kunden kosten."),
    p("Diese Anleitung führt Sie durch die richtige Planung."),

    h2("Wann ist ein Relaunch sinnvoll?"),
    ul([
        "Die Website ist technisch veraltet (nicht responsive, langsam)",
        "Das Design entspricht nicht mehr der Marke",
        "Die Nutzerführung funktioniert nicht",
        "Conversion-Rates sind schlecht",
        "Das CMS ist nicht mehr wartbar",
        "Sicherheitsprobleme"
    ]),
    p("Nicht sinnvoll: Nur weil das Design 'langweilig' ist oder der Geschäftsführer einen neuen Geschmack hat."),

    h2("Phase 1: Analyse und Zieldefinition"),

    h3("Aktuelle Website analysieren"),
    ul([
        "Was funktioniert gut? (Nicht wegwerfen)",
        "Was funktioniert nicht?",
        "Welche Seiten performen am besten?",
        "Wo steigen Nutzer aus?"
    ]),

    h3("Ziele definieren"),
    p("Konkret und messbar:"),
    ul([
        "Conversion-Rate von X auf Y steigern",
        "Ladezeit unter 2 Sekunden",
        "Mobile-Nutzung verbessern",
        "Support-Anfragen zu Thema X reduzieren"
    ]),

    h3("Stakeholder einbeziehen"),
    ul([
        "Wer muss die Website nutzen? (Intern)",
        "Wer muss sie freigeben?",
        "Welche Abteilungen haben Anforderungen?"
    ]),

    h2("Phase 2: Konzeption"),

    h3("Content-Strategie"),
    ul([
        "Welche Inhalte bleiben?",
        "Was muss neu geschrieben werden?",
        "Wer erstellt die Inhalte?",
        "Wer gibt sie frei?"
    ]),

    h3("Sitemap und Struktur"),
    ul([
        "Wie soll die neue Navigation aussehen?",
        "Welche Seiten brauchen Sie wirklich?",
        "Wie finden Nutzer, was sie suchen?"
    ]),

    h3("Funktionale Anforderungen"),
    ul([
        "Welche Features braucht die neue Website?",
        "Integrationen (CRM, Newsletter, Shop)?",
        "Backend-Anforderungen (wer pflegt wie?)"
    ]),

    h2("Phase 3: SEO-Planung"),
    p("SEO beim Relaunch ist kritisch. Falsch gemacht verlieren Sie Rankings."),

    h3("URL-Mapping"),
    ul([
        "Jede alte URL braucht ein Ziel",
        "Neue URL-Struktur planen",
        "301-Redirects dokumentieren"
    ]),

    h3("Content-Erhaltung"),
    ul([
        "Gut rankende Inhalte nicht grundlos ändern",
        "Keywords beibehalten",
        "Interne Verlinkung neu planen"
    ]),

    h3("Technisches SEO"),
    ul([
        "Sitemap vorbereiten",
        "Robots.txt korrekt",
        "Canonical-Strategie",
        "Strukturierte Daten"
    ]),

    h2("Phase 4: Design und Entwicklung"),

    h3("Design-Prozess"),
    ul([
        "Wireframes für wichtige Seiten",
        "Design-Konzept entwickeln",
        "Feedback-Schleifen einplanen",
        "Finale Freigabe vor Entwicklung"
    ]),

    h3("Entwicklung"),
    ul([
        "Staging-Umgebung nutzen",
        "Regelmäßige Abstimmungen",
        "Testing während der Entwicklung",
        "Code-Review"
    ]),

    h2("Phase 5: Testing"),
    ul([
        "Funktionales Testing: Alles funktioniert",
        "Cross-Browser/Device Testing",
        "Performance Testing",
        "SEO-Audit vor Launch",
        "User Testing wenn möglich"
    ]),

    h2("Phase 6: Launch und danach"),

    h3("Launch vorbereiten"),
    ul([
        "Backup der alten Seite",
        "Launch-Zeitpunkt festlegen",
        "Team informiert",
        "Monitoring eingerichtet"
    ]),

    h3("Nach dem Launch"),
    ul([
        "Sofort-Checks durchführen",
        "Rankings monitoren",
        "Feedback sammeln",
        "Bugs beheben",
        "Kontinuierlich optimieren"
    ]),

    h2("Zeitplanung (realistisch)"),
    ul([
        "Analyse und Konzeption: 3-6 Wochen",
        "Design: 4-8 Wochen",
        "Entwicklung: 6-12 Wochen",
        "Content (parallel): Oft der Engpass",
        "Testing: 2-4 Wochen",
        "Gesamt: 4-8 Monate für einen professionellen Relaunch"
    ]),

    h2("Fazit"),
    p("Ein Relaunch ist eine Chance – wenn er richtig geplant wird. Investieren Sie Zeit in die Vorbereitung, und der Launch wird erfolgreich."),
    p("Der häufigste Fehler: Zu wenig Zeit einplanen. Rushing führt zu Problemen, die später teuer werden."),
    p("Sie planen einen Relaunch? Wir begleiten Sie von der Analyse bis zum Launch und darüber hinaus.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website-Relaunch richtig planen: Analyse, Konzeption, SEO-Sicherung und Launch Schritt für Schritt.' WHERE slug = 'website-relaunch-planung-anleitung'""", (post39,))

# Post 40: website-restaurants-2025
post40 = create_content([
    p("Gäste googeln, bevor sie reservieren. 90% der Gäste recherchieren Restaurants online. Ihre Website ist oft der erste Eindruck – und entscheidet darüber, ob jemand bei Ihnen bucht oder beim Mitbewerber."),

    h2("Was Gäste auf einer Restaurant-Website suchen"),
    p("In der Reihenfolge der Wichtigkeit:"),
    ul([
        "Speisekarte (mit Preisen!)",
        "Öffnungszeiten",
        "Reservierungsmöglichkeit",
        "Adresse und Anfahrt",
        "Fotos (Essen, Ambiente)",
        "Kontakt"
    ]),
    p("Das muss in Sekunden auffindbar sein. Hungrige Gäste haben keine Geduld."),

    h2("Die wichtigsten Elemente"),

    h3("Startseite"),
    ul([
        "Atmosphärisches Bild oder Video",
        "Name und Küchenstil sofort erkennbar",
        "Reservieren-Button prominent",
        "Öffnungszeiten sichtbar",
        "Adresse mit Maps-Link"
    ]),

    h3("Speisekarte"),
    p("Die wichtigste Seite. Best Practices:"),
    ul([
        "Als Text, nicht nur als PDF",
        "Mit Preisen (Pflicht und Erwartung)",
        "Allergen-Kennzeichnung",
        "Fotos bei ausgewählten Gerichten",
        "Regelmäßig aktualisiert"
    ]),
    p("PDF-only-Speisekarten sind ein UX-Desaster auf Mobile und schlecht für SEO."),

    h3("Reservierung"),
    p("Optionen:"),
    ul([
        "Online-Reservierungssystem (OpenTable, Quandoo, Resmio)",
        "WhatsApp/Telefon-Link",
        "Einfaches Formular",
        "Google-Reservierung aktivieren"
    ]),
    p("Je weniger Klicks bis zur Reservierung, desto besser."),

    h3("Fotos"),
    ul([
        "Professionelle Food-Fotos (lohnt sich!)",
        "Ambiente und Einrichtung",
        "Team (optional, macht sympathisch)",
        "Keine Stock-Fotos"
    ]),

    h3("Über uns"),
    ul([
        "Geschichte des Restaurants",
        "Philosophie und Konzept",
        "Team vorstellen",
        "Was macht Sie besonders?"
    ]),

    h2("Google Business Profil"),
    p("Für Restaurants fast wichtiger als die Website:"),
    ul([
        "Vollständig ausgefüllt",
        "Korrekte Öffnungszeiten (auch Feiertage!)",
        "Speisekarte verlinkt",
        "Reservierungs-Button aktiviert",
        "Regelmäßig Fotos hochladen",
        "Auf alle Bewertungen antworten"
    ]),

    h2("Lokales SEO"),
    ul([
        "Keywords: 'Italiener Wien 1010', 'Brunch Graz'",
        "NAP konsistent (Name, Adresse, Telefon)",
        "In lokalen Verzeichnissen eintragen",
        "Bewertungen aktiv sammeln"
    ]),

    h2("Mobile First"),
    p("Die meisten Restaurant-Suchen passieren mobil, oft unterwegs:"),
    ul([
        "Schnelle Ladezeit (ungeduldig!)",
        "Große, tippbare Buttons",
        "Telefon klickbar",
        "Adresse klickbar (öffnet Maps)"
    ]),

    h2("Häufige Fehler"),
    ul([
        "Speisekarte nur als PDF: Schlecht auf Mobile, schlecht für SEO",
        "Keine Preise: Wirkt unseriös",
        "Veraltete Informationen: Ruhetag, der nicht stimmt",
        "Kein Reservierungs-Button: Hürde für potenzielle Gäste",
        "Langsame Website: Zu viele große Bilder",
        "Flash/Musik: Niemand will das"
    ]),

    h2("Was eine Restaurant-Website kostet"),
    ul([
        "Einfach (Template, selbst gepflegt): 1.500 - 3.500€",
        "Professionell (individuell, Reservierung): 4.000 - 10.000€",
        "Premium (mit Event-Buchung, Shop): 10.000€+"
    ]),
    p("Dazu: Hosting, Domain, ggf. Reservierungssystem-Gebühren."),

    h2("Quick Wins"),
    ul([
        "Google Business Profil optimieren (kostenlos, hoher Impact)",
        "Speisekarte als Text auf die Website",
        "Professionelle Fotos machen lassen",
        "Öffnungszeiten überall aktuell halten",
        "Reservierungs-Button prominent platzieren"
    ]),

    h2("Fazit"),
    p("Eine gute Restaurant-Website muss keine Raketen-Wissenschaft sein. Klar, schnell, mit allen wichtigen Informationen – das reicht für den Anfang."),
    p("Das Wichtigste: Halten Sie die Informationen aktuell. Eine veraltete Website schadet mehr als keine Website."),
    p("Sie brauchen eine Website, die Gäste bringt? Wir entwickeln Websites für Restaurants, die appetitlich aussehen und Reservierungen generieren.")
])

cursor.execute("""UPDATE posts SET content = ?, excerpt = 'Website für Restaurants: Was Gäste erwarten, wie Sie Reservierungen steigern und welche Fehler Sie vermeiden sollten.' WHERE slug = 'website-restaurants-2025'""", (post40,))

conn.commit()
conn.close()

print("Batch 4 complete: 10 posts updated")
print("Posts updated:")
print("31. website-aerzte-praxen-2025")
print("32. website-backup-strategie-2025")
print("33. website-coaches-berater-2025")
print("34. website-guide-2025-planung-bis-launch")
print("35. website-handwerker-2025")
print("36. website-keine-kunden-fehler-loesungen")
print("37. website-performance-optimieren-guide")
print("38. website-relaunch-checkliste-2025")
print("39. website-relaunch-planung-anleitung")
print("40. website-restaurants-2025")
