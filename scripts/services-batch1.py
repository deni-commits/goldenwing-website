#!/usr/bin/env python3
"""Batch 1: Branding & Webdesign Services (IDs 1-10)"""
import sqlite3
import json
import os
import uuid

db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'goldenwing.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

def uid():
    return uuid.uuid4().hex[:24]

def richtext(children):
    return json.dumps({"root":{"type":"root","children":children,"direction":"ltr","format":"","indent":0,"version":1}})

def p(text):
    return {"type":"paragraph","children":[{"type":"text","text":text,"version":1}],"version":1}

def h2(text):
    return {"type":"heading","tag":"h2","children":[{"type":"text","text":text,"version":1}],"version":1}

def li(text):
    return {"type":"listitem","children":[{"type":"text","text":text,"version":1}],"version":1}

def ul(items):
    return {"type":"list","listType":"bullet","children":[li(item) for item in items],"version":1}

services_data = {
    # ========== 1: MARKENSTRATEGIE ==========
    1: {
        "long_description": richtext([
            p("Eine Markenstrategie ist das Fundament, auf dem alles andere aufbaut. Ohne sie ist jede Marketing-Maßnahme ein Schuss ins Blaue. Mit ihr wird jede Entscheidung einfacher – von der Farbwahl bis zur Preisgestaltung."),

            h2("Was ist eine Markenstrategie?"),
            p("Eine Markenstrategie definiert, wer Sie sind, wofür Sie stehen und warum Kunden Sie wählen sollten. Sie ist kein Marketing-Dokument für die Schublade, sondern ein lebendiges Framework, das Ihr gesamtes Team im Alltag nutzt."),
            p("Sie beantwortet fundamentale Fragen: Was ist Ihr Versprechen an Ihre Kunden? Was unterscheidet Sie vom Wettbewerb? Welche Werte leiten Ihr Handeln? Wie sollen Menschen sich fühlen, wenn sie mit Ihrer Marke interagieren?"),

            h2("Unser Ansatz"),
            p("Wir beginnen nicht mit Brainstorming, sondern mit Analyse. Wir schauen uns Ihren Markt an, Ihre Wettbewerber, Ihre bestehenden Kunden. Wir führen Interviews – mit Ihnen, Ihrem Team, und wenn möglich mit Ihren Kunden."),
            p("In Workshops erarbeiten wir dann gemeinsam Ihre Positionierung. Das ist keine theoretische Übung, sondern harte Arbeit: Wir zwingen Sie zu Entscheidungen. Weil eine Marke, die für alles steht, für nichts steht."),

            h2("Das Ergebnis"),
            p("Am Ende haben Sie ein Strategie-Dokument, das Ihr Team wirklich nutzen kann. Brand Purpose, Vision, Mission, Werte, Positionierung, Zielgruppen-Personas, Tonalität – alles an einem Ort, klar formuliert und mit Beispielen illustriert."),
            ul([
                "Klare Positionierung, die Sie vom Wettbewerb abhebt",
                "Definierte Markenwerte, die Entscheidungen leiten",
                "Zielgruppen-Personas mit echten Insights",
                "Messaging-Framework für konsistente Kommunikation",
                "Grundlage für alle weiteren Branding-Maßnahmen"
            ])
        ]),
        "process": [
            ("Discovery & Analyse", "Wir analysieren Ihren Markt, Wettbewerb und bestehende Markenwahrnehmung. Interviews mit Stakeholdern und Kunden liefern wertvolle Insights."),
            ("Strategie-Workshop", "In einem intensiven Workshop erarbeiten wir gemeinsam Positionierung, Werte und Kernbotschaften. Hier werden die wichtigen Entscheidungen getroffen."),
            ("Konzeptentwicklung", "Wir verdichten die Workshop-Ergebnisse zu einem kohärenten Strategie-Framework mit Purpose, Vision, Mission und Messaging."),
            ("Dokumentation", "Alle Ergebnisse werden in einem nutzbaren Strategie-Dokument zusammengefasst – klar strukturiert und mit Anwendungsbeispielen."),
            ("Übergabe & Schulung", "Wir präsentieren die Strategie Ihrem Team und zeigen, wie sie im Alltag angewendet wird.")
        ],
        "deliverables": [
            "Markenpositionierung & Differenzierung",
            "Brand Purpose, Vision & Mission Statements",
            "Markenwerte mit Verhaltensbeispielen",
            "Zielgruppen-Personas (3-5 Stück)",
            "Messaging-Framework & Tonalität",
            "Strategie-Präsentation für Stakeholder"
        ],
        "use_cases": [
            "Neugründungen, die von Anfang an strategisch aufbauen wollen",
            "Etablierte Unternehmen vor einem Rebranding",
            "Unternehmen mit unklarer oder veralteter Positionierung",
            "Firmen vor wichtigen Wachstumsphasen",
            "Teams, die mehr Klarheit in der Kommunikation brauchen"
        ],
        "benefits": [
            "Klarheit über Ihre einzigartige Position im Markt",
            "Konsistente Kommunikation über alle Kanäle",
            "Einfachere Entscheidungen bei Design und Marketing",
            "Stärkere emotionale Bindung zu Ihrer Zielgruppe",
            "Fundament für langfristigen Markenwert"
        ]
    },

    # ========== 2: NAMING ==========
    2: {
        "long_description": richtext([
            p("Ein Name ist oft das Erste, was Menschen von Ihrer Marke erfahren. Er muss in Sekundenbruchteilen funktionieren – einprägsam sein, die richtige Assoziation wecken und in zehn Jahren noch passen."),

            h2("Warum Naming so schwierig ist"),
            p("Die guten Namen sind vergeben. Die offensichtlichen sowieso. Was bleibt, ist die Kunst, etwas zu finden, das einzigartig ist, aber nicht bizarr. Das merkbar ist, aber nicht banal. Das zur Marke passt, aber nicht einengt."),
            p("Dazu kommt die praktische Seite: Ist die Domain frei? Gibt es Markenrechtskonflikte? Funktioniert der Name international? Kann man ihn am Telefon buchstabieren?"),

            h2("Unser Prozess"),
            p("Wir starten mit einem Briefing, das über 'was soll der Name aussagen' hinausgeht. Wir wollen verstehen, wie Ihr Unternehmen in 10 Jahren aussehen soll. Welche Assoziationen hilfreich sind – und welche schädlich."),
            p("Dann generieren wir. Nicht 10 Namen, sondern 100+. Mit verschiedenen Techniken: Wortschöpfungen, Metaphern, Akronyme, fremdsprachige Begriffe, Kombinationen. Die meisten werden verworfen – das ist Teil des Prozesses."),
            p("Die Shortlist wird dann rigoros geprüft: Domain-Verfügbarkeit, Markenrecht, Google-Suche, internationale Bedeutungen. Was übrig bleibt, präsentieren wir Ihnen mit unserer Einschätzung."),

            h2("Was Sie bekommen"),
            ul([
                "3-5 finale Namensvorschläge mit Begründung",
                "Domain-Verfügbarkeit geprüft",
                "Erste Markenrechts-Recherche",
                "Empfehlung für die finale Entscheidung",
                "Optional: Logo-Konzepte für den gewählten Namen"
            ])
        ]),
        "process": [
            ("Strategie-Briefing", "Wir klären Positionierung, Zielgruppe und langfristige Vision. Je besser das Briefing, desto besser die Namen."),
            ("Kreativphase", "Wir generieren 100+ Namensideen mit verschiedenen Techniken – von rational bis kreativ, von beschreibend bis abstrakt."),
            ("Erste Filterung", "Die besten 20-30 Namen werden auf Domain-Verfügbarkeit und offensichtliche Konflikte geprüft."),
            ("Shortlist & Recherche", "5-10 Finalisten durchlaufen eine gründliche Prüfung: Markenrecht, Google, internationale Bedeutungen."),
            ("Präsentation", "Wir stellen 3-5 finale Vorschläge vor – mit Begründung, Vor- und Nachteilen, und unserer Empfehlung.")
        ],
        "deliverables": [
            "3-5 finale Namensvorschläge",
            "Begründung und Herleitung für jeden Namen",
            "Domain-Verfügbarkeitsprüfung (.at, .com, .de)",
            "Erste Markenrechts-Recherche (AT/EU)",
            "Präsentation mit Empfehlung"
        ],
        "use_cases": [
            "Neugründungen auf der Suche nach dem perfekten Namen",
            "Produkt-Launches, die einen eigenen Namen brauchen",
            "Rebranding-Projekte mit Namenswechsel",
            "Internationale Expansion mit Namensanpassung",
            "Startups vor der Gründung"
        ],
        "benefits": [
            "Professioneller Prozess statt endloser interner Diskussionen",
            "Rechtliche Absicherung durch Vorab-Recherche",
            "Namen, die strategisch zur Marke passen",
            "Berücksichtigung internationaler Aspekte",
            "Zeitersparnis durch strukturierten Prozess"
        ]
    },

    # ========== 3: LOGO DESIGN ==========
    3: {
        "long_description": richtext([
            p("Ein Logo ist nicht Ihre Marke – aber es ist das Gesicht Ihrer Marke. Es muss auf einen Blick funktionieren, auf der Visitenkarte genauso wie auf dem Firmengebäude. Es muss heute modern wirken und in 20 Jahren noch zeitlos sein."),

            h2("Was ein gutes Logo ausmacht"),
            p("Einfachheit. Die besten Logos der Welt sind erschreckend simpel. Apple. Nike. McDonald's. Sie funktionieren in jeder Größe, in Farbe und Schwarz-Weiß, auf jedem Medium."),
            p("Einzigartigkeit. Ihr Logo muss sich von der Konkurrenz unterscheiden – nicht um anders zu sein, sondern um erkennbar zu sein. Wenn man es mit anderen verwechseln kann, hat es seinen Job nicht gemacht."),
            p("Relevanz. Ein Logo sollte etwas über Ihre Marke aussagen – aber nicht alles. Es ist ein Zeichen, kein Erklärstück. Die Bedeutung wächst mit der Zeit durch die Erfahrungen, die Menschen mit Ihrer Marke machen."),

            h2("Unser Design-Prozess"),
            p("Wir beginnen nicht mit Skizzen, sondern mit Fragen. Was soll Ihr Logo kommunizieren? Wer sieht es, wo, in welchem Kontext? Welche Logos in Ihrer Branche funktionieren – und warum?"),
            p("Dann skizzieren wir. Dutzende von Ideen, meist auf Papier. Die vielversprechendsten werden digital ausgearbeitet. Sie sehen mehrere Konzepte mit unterschiedlichen Ansätzen – nicht Variationen eines Themas, sondern echte Alternativen."),
            p("Das finale Logo wird in allen Varianten und Formaten geliefert, die Sie brauchen. Mit klaren Regeln, wie es verwendet werden soll – und wie nicht."),

            h2("Was Sie bekommen"),
            ul([
                "3 unterschiedliche Logo-Konzepte zur Auswahl",
                "Finales Logo in allen gängigen Formaten (AI, EPS, SVG, PNG, JPG)",
                "Farbvarianten (Vollfarbe, Schwarz-Weiß, invertiert)",
                "Responsive Versionen für verschiedene Größen",
                "Logo-Guidelines mit Verwendungsregeln"
            ])
        ]),
        "process": [
            ("Briefing & Research", "Wir analysieren Ihre Marke, Zielgruppe und Wettbewerb. Was soll das Logo kommunizieren? Wo wird es eingesetzt?"),
            ("Konzeptentwicklung", "Wir entwickeln verschiedene Designrichtungen – nicht Variationen, sondern echte Alternativen mit unterschiedlichen Ansätzen."),
            ("Präsentation", "Sie sehen 3 ausgearbeitete Konzepte mit Begründung. Wir erklären die Idee hinter jedem Entwurf."),
            ("Verfeinerung", "Das gewählte Konzept wird optimiert. Farben, Proportionen, Details – bis alles perfekt sitzt."),
            ("Finalisierung", "Das finale Logo wird in allen benötigten Formaten und Varianten exportiert und mit Guidelines übergeben.")
        ],
        "deliverables": [
            "3 Logo-Konzepte zur Auswahl",
            "Finales Logo in Vektorformaten (AI, EPS, SVG)",
            "Web-optimierte Versionen (PNG, JPG, WebP)",
            "Farbvarianten (CMYK für Print, RGB für Digital)",
            "Responsive Logo-Versionen",
            "Logo-Guidelines (Abstände, Mindestgrößen, Don'ts)"
        ],
        "use_cases": [
            "Neugründungen ohne bestehendes Logo",
            "Unternehmen mit veraltetem Logo",
            "Rebranding-Projekte",
            "Ausgründungen und Spin-offs",
            "Produkte oder Services, die ein eigenes Logo brauchen"
        ],
        "benefits": [
            "Professionelles Design, das Vertrauen schafft",
            "Zeitloses Logo, das nicht in 2 Jahren veraltet wirkt",
            "Alle Formate für jeden Anwendungsfall",
            "Klare Guidelines für konsistente Verwendung",
            "Strategisch fundiert, nicht nur ästhetisch"
        ]
    },

    # ========== 4: CORPORATE IDENTITY ==========
    4: {
        "long_description": richtext([
            p("Corporate Identity ist die visuelle Übersetzung Ihrer Marke in alles, was man sehen und anfassen kann. Vom Briefkopf bis zur PowerPoint, von der Visitenkarte bis zum Messestand – alles folgt einem System."),

            h2("Warum Konsistenz so wichtig ist"),
            p("Jeder Touchpoint mit Ihrer Marke hinterlässt einen Eindruck. Wenn diese Eindrücke konsistent sind, verstärken sie sich gegenseitig. Wenn sie inkonsistent sind, verwirren sie – und Verwirrung schafft kein Vertrauen."),
            p("Eine durchdachte Corporate Identity macht es einfach, konsistent zu sein. Ihr Team muss nicht jedes Mal neu erfinden, wie etwas aussehen soll. Es gibt ein System, das funktioniert."),

            h2("Was wir gestalten"),
            p("Wir entwickeln alle Materialien, die Sie im Geschäftsalltag brauchen. Das beginnt bei den Basics – Visitenkarten, Briefpapier, E-Mail-Signaturen – und geht bis zu komplexeren Anwendungen wie Präsentationsvorlagen oder Social-Media-Templates."),
            p("Alles folgt Ihrem Designsystem: Die gleichen Farben, Schriften, Gestaltungsprinzipien. So entsteht ein wiedererkennbares Erscheinungsbild, das Ihre Marke stärkt."),

            h2("Umfang nach Ihren Bedürfnissen"),
            p("Nicht jedes Unternehmen braucht alles. Ein Freelancer braucht andere Materialien als ein Konzern. Wir schnüren das Paket, das zu Ihnen passt – von der Basis-Ausstattung bis zum kompletten Corporate-Design-Manual."),
            ul([
                "Geschäftsausstattung (Visitenkarten, Briefpapier, Umschläge)",
                "Digitale Vorlagen (E-Mail-Signatur, PowerPoint/Keynote)",
                "Social-Media-Templates (Posts, Stories, Header)",
                "Dokument-Vorlagen (Angebote, Rechnungen, Reports)",
                "Marketing-Materialien (Flyer, Broschüren, Roll-ups)"
            ])
        ]),
        "process": [
            ("Bestandsaufnahme", "Welche Materialien brauchen Sie? Welche existieren bereits? Wir definieren den Umfang und priorisieren."),
            ("Designsystem", "Basierend auf Ihrem Logo entwickeln wir das visuelle System: Farben, Schriften, Gestaltungsraster, Bildsprache."),
            ("Gestaltung", "Wir gestalten alle definierten Materialien – jedes einzeln durchdacht, aber alle Teil des Systems."),
            ("Review & Anpassung", "Sie prüfen die Entwürfe, wir optimieren. Bei Drucksachen koordinieren wir mit der Druckerei."),
            ("Übergabe", "Sie erhalten alle Dateien in den richtigen Formaten – druckfertig, bearbeitbar, und dokumentiert.")
        ],
        "deliverables": [
            "Visitenkarten (druckfertig)",
            "Briefpapier & Zweitbogen",
            "E-Mail-Signatur (HTML)",
            "PowerPoint/Keynote-Template",
            "Word-Vorlagen für Dokumente",
            "Social-Media-Templates (editierbar)"
        ],
        "use_cases": [
            "Unternehmen nach Logo-Entwicklung oder Rebranding",
            "Firmen mit inkonsistenter Außendarstellung",
            "Schnell wachsende Teams, die Struktur brauchen",
            "Unternehmen vor wichtigen Anlässen (Messen, Pitches)",
            "Gründer, die professionell auftreten wollen"
        ],
        "benefits": [
            "Professioneller Auftritt an jedem Touchpoint",
            "Zeitersparnis durch fertige Vorlagen",
            "Konsistenz auch bei wachsendem Team",
            "Druckfertige Dateien ohne Extra-Kosten",
            "Editierbare Templates für Eigenanpassungen"
        ]
    },

    # ========== 5: BRAND GUIDELINES ==========
    5: {
        "long_description": richtext([
            p("Brand Guidelines sind das Regelwerk Ihrer Marke. Sie dokumentieren, wie Ihre Marke aussehen und klingen soll – nicht nur für Designer, sondern für jeden, der Ihre Marke nach außen vertritt."),

            h2("Mehr als eine Logo-Sammlung"),
            p("Viele Brand Guidelines sind nur PDF-Sammlungen mit Logo-Versionen und Hex-Codes. Das ist ein Anfang, aber nicht genug. Gute Guidelines erklären das Warum hinter den Regeln und geben Beispiele für richtige und falsche Anwendung."),
            p("Sie decken nicht nur visuelle Elemente ab, sondern auch die verbale Identität: Wie spricht Ihre Marke? Welchen Ton trifft sie? Welche Wörter verwendet sie – und welche nicht?"),

            h2("Was gute Guidelines auszeichnet"),
            p("Praktisch nutzbar. Ihre Guidelines sollen im Alltag verwendet werden, nicht im Regal verstauben. Deshalb strukturieren wir sie so, dass man schnell findet, was man sucht."),
            p("Klar, aber nicht einengend. Regeln ja, Zwangsjacke nein. Gute Guidelines lassen Raum für Kreativität innerhalb eines definierten Rahmens."),
            p("Vollständig, aber nicht überwältigend. Alles Wichtige ist dokumentiert, aber in verdaulichen Häppchen. Nicht jeder muss alles lesen – nur das, was für seine Aufgabe relevant ist."),

            h2("Inhalte Ihrer Brand Guidelines"),
            ul([
                "Markengeschichte & Positionierung",
                "Logo: Versionen, Verwendung, Schutzraum, Don'ts",
                "Farbpalette mit allen Farbcodes",
                "Typografie: Schriften, Hierarchien, Anwendung",
                "Bildsprache & Fotografie-Richtlinien",
                "Icons & grafische Elemente",
                "Tonalität & Schreibstil",
                "Beispiele für korrekte Anwendung"
            ])
        ]),
        "process": [
            ("Audit", "Wir sammeln alle bestehenden Marken-Assets und identifizieren Lücken. Was existiert? Was fehlt? Was ist inkonsistent?"),
            ("Strukturierung", "Wir definieren den Aufbau der Guidelines – angepasst an Ihre Bedürfnisse und die Nutzer des Dokuments."),
            ("Dokumentation", "Wir dokumentieren alle Markenelemente mit Erklärungen, Regeln und Beispielen."),
            ("Design", "Die Guidelines selbst werden gestaltet – als Dokument, das Ihre Marke repräsentiert."),
            ("Review & Finalisierung", "Gemeinsame Durchsicht, letzte Anpassungen, Übergabe in gewünschten Formaten.")
        ],
        "deliverables": [
            "Brand Guidelines als PDF (print-optimiert)",
            "Digitale Version für schnellen Zugriff",
            "Alle Marken-Assets als Download-Paket",
            "Logo-Dateien in allen Formaten",
            "Farbpaletten für Design-Tools",
            "Font-Dateien (falls Lizenz erlaubt)"
        ],
        "use_cases": [
            "Unternehmen nach Abschluss eines Branding-Projekts",
            "Firmen, die mit externen Agenturen arbeiten",
            "Wachsende Teams mit neuen Mitarbeitern",
            "Franchise-Unternehmen mit mehreren Standorten",
            "Unternehmen vor Marketingkampagnen"
        ],
        "benefits": [
            "Konsistenter Markenauftritt über alle Kanäle",
            "Schnellere Einarbeitung neuer Mitarbeiter/Partner",
            "Weniger Abstimmungsaufwand bei Design-Entscheidungen",
            "Professionelle Grundlage für externe Dienstleister",
            "Schutz der Markenidentität bei Wachstum"
        ]
    },

    # ========== 6: UX/UI DESIGN ==========
    6: {
        "long_description": richtext([
            p("UX/UI Design ist keine Dekoration – es entscheidet, ob Ihre Website oder App genutzt wird oder nicht. Gutes Design führt Nutzer intuitiv zum Ziel. Schlechtes Design frustriert und vertreibt."),

            h2("UX vs. UI – der Unterschied"),
            p("User Experience (UX) ist das Gesamterlebnis: Wie fühlt sich die Nutzung an? Finden Menschen, was sie suchen? Erreichen sie ihr Ziel ohne Frustration? UX ist unsichtbar, wenn es gut gemacht ist."),
            p("User Interface (UI) ist die visuelle Oberfläche: Buttons, Farben, Typografie, Animationen. UI macht UX sichtbar und beeinflusst, wie Menschen Ihr Produkt wahrnehmen."),
            p("Beides muss zusammenspielen. Ein schönes Interface mit schlechter UX frustriert. Eine gute UX mit hässlichem Interface schafft kein Vertrauen."),

            h2("Unser Design-Prozess"),
            p("Wir starten mit Verstehen: Wer nutzt das Produkt? Was wollen sie erreichen? Wo stolpern sie heute? Mit User Research und Analyse schaffen wir die Grundlage für gute Entscheidungen."),
            p("Dann strukturieren wir: Information Architecture, User Flows, Wireframes. Hier testen wir Ideen schnell und günstig – bevor wir in visuelles Design investieren."),
            p("Schließlich gestalten wir: Das visuelle Design folgt der UX, nicht umgekehrt. Prototypen ermöglichen Testing mit echten Nutzern. Iteration ist Teil des Prozesses."),

            h2("Ergebnis"),
            ul([
                "Interfaces, die Nutzer verstehen ohne Anleitung",
                "Höhere Conversion durch optimierte User Flows",
                "Konsistentes Design durch UI-System",
                "Prototypen für Testing und Entwickler-Übergabe",
                "Design, das zu Ihrer Marke passt"
            ])
        ]),
        "process": [
            ("Research & Analyse", "User Interviews, Wettbewerbsanalyse, Analyse bestehender Daten. Verstehen, bevor wir gestalten."),
            ("Information Architecture", "Strukturierung der Inhalte, Definition von User Flows, Erstellung von Wireframes."),
            ("UI Design", "Visuelles Design basierend auf der UX-Grundlage. Entwicklung eines konsistenten UI-Systems."),
            ("Prototyping", "Interaktive Prototypen für Testing und Entwickler-Übergabe."),
            ("Testing & Iteration", "Tests mit echten Nutzern, Optimierung basierend auf Feedback.")
        ],
        "deliverables": [
            "User Research Report mit Insights",
            "Wireframes für alle wichtigen Screens",
            "Visuelles Design in Figma",
            "UI Component Library",
            "Interaktiver Prototyp",
            "Design Specs für Entwickler"
        ],
        "use_cases": [
            "Neue Websites oder Apps vor der Entwicklung",
            "Bestehende Produkte mit UX-Problemen",
            "Redesign von veralteten Interfaces",
            "MVPs und Startup-Produkte",
            "Komplexe B2B-Software"
        ],
        "benefits": [
            "Höhere Nutzerzufriedenheit und -bindung",
            "Bessere Conversion-Rates",
            "Weniger Support-Anfragen durch intuitive UX",
            "Schnellere Entwicklung durch klare Specs",
            "Design-System für konsistente Weiterentwicklung"
        ]
    },

    # ========== 7: WORDPRESS WEBDESIGN ==========
    7: {
        "long_description": richtext([
            p("WordPress betreibt über 40% aller Websites weltweit – aus gutem Grund. Es ist flexibel, erweiterbar und lässt sich von Nicht-Technikern bedienen. Aber: WordPress ist nur so gut wie die Umsetzung."),

            h2("WordPress richtig gemacht"),
            p("Viele WordPress-Seiten sind langsam, unsicher oder schwer zu bedienen. Das liegt nicht an WordPress, sondern an schlechter Umsetzung: überladene Themes, zu viele Plugins, keine Optimierung."),
            p("Wir machen es anders: Schlanke, schnelle Websites mit nur den Features, die Sie wirklich brauchen. Sorgfältig ausgewählte Plugins. Sicherheit von Anfang an. Und ein Admin-Bereich, den Sie verstehen."),

            h2("Für wen WordPress die richtige Wahl ist"),
            p("WordPress eignet sich ideal für Business-Websites, Blogs, und kleinere bis mittlere Online-Shops. Sie können Inhalte selbst pflegen, ohne Entwickler zu brauchen. Updates sind einfach."),
            p("Für hochkomplexe Webanwendungen oder sehr spezifische Anforderungen gibt es bessere Lösungen. Wir beraten ehrlich, ob WordPress für Ihr Projekt das Richtige ist."),

            h2("Was wir liefern"),
            ul([
                "Individuelles Design, kein Theme von der Stange",
                "Schnelle Ladezeiten durch Optimierung",
                "Responsive Design für alle Geräte",
                "SEO-Grundlagen bereits integriert",
                "Schulung zur Selbstverwaltung",
                "DSGVO-konform mit Cookie-Management"
            ])
        ]),
        "process": [
            ("Konzeption", "Wir definieren Struktur, Funktionen und Inhalte. Was braucht die Website? Was nicht?"),
            ("Design", "Individuelles Webdesign in Figma – basierend auf Ihrer Marke, optimiert für Conversion."),
            ("Entwicklung", "Umsetzung als WordPress-Website mit sauberem Code und ausgewählten Plugins."),
            ("Content & SEO", "Inhalte einpflegen, SEO-Grundlagen einrichten, Performance optimieren."),
            ("Launch & Schulung", "Website live schalten, Team schulen, Übergabe aller Zugänge.")
        ],
        "deliverables": [
            "Fertige WordPress-Website",
            "Individuelles Theme (keine gekauften Templates)",
            "Responsive Design für alle Geräte",
            "SEO-Grundkonfiguration",
            "DSGVO-konforme Cookie-Lösung",
            "Admin-Schulung (Video oder live)"
        ],
        "use_cases": [
            "Business-Websites für KMUs",
            "Portfolios für Kreative und Freelancer",
            "Unternehmens-Blogs",
            "Landing Pages für Kampagnen",
            "Einfache Mitglieder-Bereiche"
        ],
        "benefits": [
            "Inhalte selbst pflegen ohne Entwickler",
            "Große Plugin-Auswahl für Erweiterungen",
            "Kostengünstig in Entwicklung und Wartung",
            "Bewährtes System mit großer Community",
            "Einfache Updates und Backups"
        ]
    },

    # ========== 8: ELEMENTOR ENTWICKLUNG ==========
    8: {
        "long_description": richtext([
            p("Elementor ist der beliebteste Page Builder für WordPress. Er ermöglicht visuelles Bearbeiten per Drag-and-Drop – ohne Programmierkenntnisse. Aber wie bei allem: Die Qualität hängt von der Umsetzung ab."),

            h2("Elementor: Mächtig, aber gefährlich"),
            p("In den falschen Händen führt Elementor zu aufgeblähten, langsamen Websites. Zu viele Widgets, kein Plan, keine Struktur. Das Ergebnis: Seiten, die ewig laden und auf mobilen Geräten nicht funktionieren."),
            p("Wir nutzen Elementor strategisch: Für die Bereiche, die Sie selbst bearbeiten wollen. Mit sauberem Code dahinter. Mit globalen Styles für Konsistenz. Mit Performance im Blick."),

            h2("Wann Elementor die richtige Wahl ist"),
            p("Elementor ist ideal, wenn Sie Ihre Website regelmäßig anpassen wollen – ohne auf einen Entwickler warten zu müssen. Neue Seiten erstellen, Texte ändern, Bilder tauschen – alles visuell und intuitiv."),
            p("Für sehr komplexe Websites oder wenn Performance absolut kritisch ist, gibt es bessere Alternativen. Wir beraten Sie ehrlich."),

            h2("So nutzen wir Elementor"),
            ul([
                "Saubere Struktur mit Elementor Theme Builder",
                "Globale Widgets für wiederverwendbare Elemente",
                "Performance-Optimierung von Anfang an",
                "Mobile-First-Ansatz für responsive Design",
                "Schulung, damit Sie das System voll nutzen können"
            ])
        ]),
        "process": [
            ("Planung", "Welche Bereiche sollen editierbar sein? Wir definieren die Struktur und Template-Logik."),
            ("Design-System", "Globale Farben, Schriften und Styles in Elementor einrichten für Konsistenz."),
            ("Template-Entwicklung", "Header, Footer, Archive, Single-Templates – das Grundgerüst Ihrer Website."),
            ("Seiten-Design", "Die einzelnen Seiten werden mit optimierten Widgets gestaltet."),
            ("Optimierung & Schulung", "Performance-Tuning und ausführliche Einweisung in die Bearbeitung.")
        ],
        "deliverables": [
            "WordPress-Website mit Elementor Pro",
            "Template-System für alle Seitentypen",
            "Globales Design-System",
            "Wiederverwendbare Widget-Bibliothek",
            "Performance-Optimierung",
            "Video-Schulung zur Selbstbearbeitung"
        ],
        "use_cases": [
            "Websites, die Sie selbst aktualisieren möchten",
            "Kleine Teams ohne technische Ressourcen",
            "Landing Pages mit häufigen Updates",
            "Marketing-Websites mit wechselnden Inhalten",
            "Portfolios mit regelmäßig neuen Projekten"
        ],
        "benefits": [
            "Volle Kontrolle über Ihre Website-Inhalte",
            "Keine Entwickler-Kosten für kleine Änderungen",
            "Schnelle Anpassungen in Echtzeit",
            "Visuelles Bearbeiten ohne Code-Kenntnisse",
            "Flexibilität für zukünftige Erweiterungen"
        ]
    },

    # ========== 9: WEBSHOPS & WOOCOMMERCE ==========
    9: {
        "long_description": richtext([
            p("E-Commerce ist komplex. Produktverwaltung, Lagerhaltung, Zahlungsanbieter, Versand, Steuern, Rechnungen – alles muss reibungslos zusammenspielen. WooCommerce macht das möglich, ohne dass Sie ein Vermögen ausgeben."),

            h2("Warum WooCommerce?"),
            p("WooCommerce ist das meistgenutzte E-Commerce-System der Welt. Es basiert auf WordPress, ist flexibel erweiterbar und lässt sich an fast jede Anforderung anpassen. Von kleinen Shops bis zu Händlern mit tausenden Produkten."),
            p("Im Vergleich zu Shopify oder anderen SaaS-Lösungen: Sie sind nicht an monatliche Gebühren gebunden, haben volle Kontrolle über Ihre Daten und können alles anpassen."),

            h2("Was einen guten Online-Shop ausmacht"),
            p("Conversion. Besucher müssen zu Käufern werden. Das bedeutet: Schnelle Ladezeiten, klare Produktdarstellung, reibungsloser Checkout, Vertrauen durch Sicherheit und Transparenz."),
            p("Usability. Kunden müssen finden, was sie suchen. Sinnvolle Kategorien, gute Suche, hilfreiche Filter. Auf allen Geräten."),
            p("Backend. Sie müssen den Shop effizient verwalten können. Produkte anlegen, Bestellungen bearbeiten, Lagerbestände pflegen – ohne Informatik-Studium."),

            h2("Unser E-Commerce-Angebot"),
            ul([
                "Individuelles Shop-Design für Ihre Marke",
                "Optimierter Checkout für höhere Conversion",
                "Anbindung an Zahlungsanbieter (Stripe, PayPal, Klarna...)",
                "Versand-Integration (Post, DHL, DPD...)",
                "DSGVO-konform und rechtssicher für AT/EU",
                "Schulung zur Shop-Verwaltung"
            ])
        ]),
        "process": [
            ("Anforderungsanalyse", "Produkttypen, Varianten, Versandoptionen, Zahlungsarten – wir klären alle Anforderungen."),
            ("Konzeption", "Shop-Struktur, Kategorien, Filter, User Flow vom Produkt bis zur Bestellung."),
            ("Design", "Individuelles Shop-Design mit Fokus auf Conversion und Markenerlebnis."),
            ("Entwicklung", "WooCommerce-Setup, Theme-Entwicklung, Plugin-Konfiguration, Schnittstellen."),
            ("Testing & Launch", "Testbestellungen, Payment-Tests, Performance-Check, Go-Live.")
        ],
        "deliverables": [
            "Vollständiger WooCommerce-Shop",
            "Individuelles Shop-Theme",
            "Zahlungsanbieter-Integration",
            "Versand-Konfiguration",
            "Rechtlich notwendige Seiten (AGB, Widerruf...)",
            "Shop-Manager-Schulung"
        ],
        "use_cases": [
            "Händler, die online verkaufen wollen",
            "Hersteller mit Direktvertrieb",
            "Dienstleister mit buchbaren Services",
            "Unternehmen mit digitalen Produkten",
            "Lokale Geschäfte mit Online-Erweiterung"
        ],
        "benefits": [
            "Keine monatlichen Plattform-Gebühren",
            "Volle Kontrolle über Shop und Daten",
            "Unbegrenzt erweiterbar",
            "Bekannte WordPress-Oberfläche",
            "Große Auswahl an Erweiterungen"
        ]
    },

    # ========== 10: LANDINGPAGES ==========
    10: {
        "long_description": richtext([
            p("Eine Landingpage ist keine Miniatur-Website. Sie hat keine Navigation, keine Ablenkung, nur ein Ziel: Besucher zu einer Handlung bewegen. Anmeldung, Anfrage, Kauf – fokussiert und effektiv."),

            h2("Was Landingpages von Websites unterscheidet"),
            p("Eine Website informiert. Eine Landingpage konvertiert. Sie hat ein einziges Ziel und entfernt alles, was davon ablenkt. Keine Menüleiste, die zum Stöbern einlädt. Keine Links, die wegführen."),
            p("Der Aufbau folgt einer bewährten Struktur: Problem ansprechen, Lösung präsentieren, Vertrauen aufbauen, zur Handlung auffordern. Jedes Element hat seinen Platz und seinen Zweck."),

            h2("Wann Sie eine Landingpage brauchen"),
            p("Für Werbekampagnen. Google Ads, Facebook Ads, Newsletter – wenn Sie für Traffic bezahlen, brauchen Sie eine Seite, die diesen Traffic in Leads oder Kunden verwandelt."),
            p("Für Produkt-Launches. Ein neues Angebot verdient eine eigene Bühne, ohne Ablenkung durch Ihr restliches Portfolio."),
            p("Für Lead-Generierung. E-Book-Download, Webinar-Anmeldung, Beratungsgespräch – eine Landingpage macht das Angebot klar und den nächsten Schritt einfach."),

            h2("Unser Landingpage-Ansatz"),
            ul([
                "Conversion-optimierte Struktur nach bewährten Prinzipien",
                "Headlines, die Aufmerksamkeit fangen",
                "Überzeugende Texte, die zum Handeln bewegen",
                "Mobile-First-Design für alle Geräte",
                "Schnelle Ladezeiten für bessere Ad-Performance",
                "A/B-Testing-Setup für kontinuierliche Optimierung"
            ])
        ]),
        "process": [
            ("Zieldefinition", "Was soll die Landingpage erreichen? Welche Zielgruppe? Welches Angebot?"),
            ("Content-Konzept", "Struktur, Headlines, Texte – der Inhalt wird vor dem Design definiert."),
            ("Design", "Visuelles Design mit Fokus auf Conversion. Klare Hierarchie, starke CTAs."),
            ("Entwicklung", "Schnelle, responsive Umsetzung. Tracking-Integration, Formular-Setup."),
            ("Optimierung", "A/B-Testing-Setup, Performance-Optimierung, Analytics-Einrichtung.")
        ],
        "deliverables": [
            "Conversion-optimierte Landingpage",
            "Mobile-responsive Design",
            "Lead-Capture-Formular",
            "Tracking & Analytics Setup",
            "A/B-Testing-Grundlage",
            "Performance-Optimierung"
        ],
        "use_cases": [
            "Google Ads und Facebook Ads Kampagnen",
            "Produkt-Launches und Neuheiten",
            "Lead-Generierung (E-Books, Webinare)",
            "Event-Anmeldungen",
            "Spezielle Angebote und Promotions"
        ],
        "benefits": [
            "Höhere Conversion-Rate als normale Seiten",
            "Messbare Ergebnisse für Marketing-Budget",
            "Fokussierte Botschaft ohne Ablenkung",
            "Optimiert für bezahlten Traffic",
            "Grundlage für kontinuierliche Verbesserung"
        ]
    }
}

# Update database
for service_id, data in services_data.items():
    # Update long_description
    cursor.execute("UPDATE sub_services SET long_description = ? WHERE id = ?",
                   (data["long_description"], service_id))

    # Clear and insert process steps
    cursor.execute("DELETE FROM sub_services_process WHERE _parent_id = ?", (service_id,))
    for order, (title, desc) in enumerate(data["process"], 1):
        cursor.execute("INSERT INTO sub_services_process (_order, _parent_id, id, title, description) VALUES (?, ?, ?, ?, ?)",
                       (order, service_id, uid(), title, desc))

    # Clear and insert deliverables
    cursor.execute("DELETE FROM sub_services_deliverables WHERE _parent_id = ?", (service_id,))
    for order, deliverable in enumerate(data["deliverables"], 1):
        cursor.execute("INSERT INTO sub_services_deliverables (_order, _parent_id, id, deliverable) VALUES (?, ?, ?, ?)",
                       (order, service_id, uid(), deliverable))

    # Clear and insert use_cases
    cursor.execute("DELETE FROM sub_services_use_cases WHERE _parent_id = ?", (service_id,))
    for order, use_case in enumerate(data["use_cases"], 1):
        cursor.execute("INSERT INTO sub_services_use_cases (_order, _parent_id, id, use_case) VALUES (?, ?, ?, ?)",
                       (order, service_id, uid(), use_case))

    # Clear and insert benefits
    cursor.execute("DELETE FROM sub_services_benefits WHERE _parent_id = ?", (service_id,))
    for order, benefit in enumerate(data["benefits"], 1):
        cursor.execute("INSERT INTO sub_services_benefits (_order, _parent_id, id, benefit) VALUES (?, ?, ?, ?)",
                       (order, service_id, uid(), benefit))

    print(f"✓ Updated: ID {service_id}")

conn.commit()
conn.close()
print("\nBatch 1 complete: Branding & Webdesign (IDs 1-10)")
