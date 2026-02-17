#!/usr/bin/env python3
"""Batch 2: Digitale Strategie, SEO & Content Services (IDs 11-22)"""
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
    # ========== 11: ZIELGRUPPENANALYSE ==========
    11: {
        "long_description": richtext([
            p("Wer sind Ihre Kunden wirklich? Nicht demografisch – das wissen Sie vielleicht. Sondern: Was treibt sie an? Welche Probleme wollen sie lösen? Wie treffen sie Entscheidungen? Ohne diese Antworten ist Marketing Rätselraten."),

            h2("Warum Personas mehr sind als Steckbriefe"),
            p("Die meisten Personas sind nutzlos. 'Maria, 35, verheiratet, zwei Kinder, interessiert sich für Nachhaltigkeit.' Das hilft niemandem. Echte Personas beschreiben Verhalten, Motivation und Entscheidungsprozesse."),
            p("Wir wollen wissen: Was hält Ihre Zielgruppe nachts wach? Welche Fragen googlen sie? Wem vertrauen sie? Was überzeugt sie – und was schreckt ab?"),

            h2("Wie wir Zielgruppen verstehen"),
            p("Daten sind ein Anfang. Google Analytics, CRM-Daten, Social-Media-Insights – sie zeigen, was Menschen tun. Aber nicht warum."),
            p("Deshalb führen wir Interviews. Mit Ihren bestehenden Kunden, mit Ihrem Vertriebsteam, manchmal mit Menschen, die nicht gekauft haben. Diese qualitativen Insights sind Gold wert."),
            p("Das Ergebnis sind Personas, die Ihr Team wirklich nutzen kann. Mit Zitaten, Szenarien und konkreten Handlungsempfehlungen für Marketing und Vertrieb."),

            h2("Was Sie erhalten"),
            ul([
                "3-5 detaillierte Buyer Personas",
                "Customer Journey für jede Persona",
                "Pain Points und Kaufmotive",
                "Kommunikationspräferenzen und Kanäle",
                "Konkrete Empfehlungen für Ihr Marketing"
            ])
        ]),
        "process": [
            ("Datenanalyse", "Auswertung vorhandener Daten: Analytics, CRM, Kundenfeedback, Marktforschung."),
            ("Qualitative Forschung", "Interviews mit Kunden, Nicht-Kunden und internen Stakeholdern."),
            ("Muster erkennen", "Synthese der Insights zu Verhaltensmustern und Entscheidungstypen."),
            ("Persona-Entwicklung", "Ausarbeitung vollständiger Personas mit allen relevanten Dimensionen."),
            ("Aktivierung", "Präsentation, Workshop zur Anwendung, Integration in Ihre Prozesse.")
        ],
        "deliverables": [
            "3-5 ausgearbeitete Buyer Personas",
            "Persona-Dokumente (Print & Digital)",
            "Customer Journey Maps",
            "Interview-Zusammenfassungen",
            "Handlungsempfehlungen",
            "Workshop zur Anwendung"
        ],
        "use_cases": [
            "Vor einer Website-Neugestaltung",
            "Bei der Entwicklung neuer Produkte/Services",
            "Für Content-Marketing-Strategie",
            "Nach Erschließung neuer Zielgruppen",
            "Bei stagnierendem Marketing-Erfolg"
        ],
        "benefits": [
            "Marketing, das die richtigen Menschen anspricht",
            "Content, der echte Fragen beantwortet",
            "Bessere Conversion durch relevante Botschaften",
            "Effizienterer Vertrieb mit klaren Zielprofilen",
            "Fundierte Entscheidungen statt Bauchgefühl"
        ]
    },

    # ========== 12: CUSTOMER JOURNEY MAPPING ==========
    12: {
        "long_description": richtext([
            p("Die Customer Journey zeigt, wie Menschen vom ersten Kontakt mit Ihrer Marke bis zum Kauf (und darüber hinaus) gelangen. Jeder Schritt ist eine Chance – oder ein Risiko."),

            h2("Warum Journey Mapping wichtig ist"),
            p("Kunden denken nicht in Abteilungen. Ihnen ist egal, ob Marketing, Vertrieb oder Support zuständig ist. Sie erleben Ihre Marke als Ganzes – und jede Lücke, jeder Bruch in der Experience fällt auf."),
            p("Journey Mapping macht diese Experience sichtbar. Sie sehen, wo Kunden begeistert sind und wo frustriert. Wo sie abspringen und warum. Das ist die Grundlage für echte Verbesserungen."),

            h2("Was wir sichtbar machen"),
            p("Touchpoints: Jeder Kontaktpunkt mit Ihrer Marke – Website, Social Media, E-Mail, Telefon, persönlich."),
            p("Emotionen: Wie fühlen sich Menschen an jedem Punkt? Begeistert, neutral, frustriert?"),
            p("Pain Points: Wo verlieren Sie Menschen? Was funktioniert nicht?"),
            p("Opportunities: Wo können Sie überraschen? Wo fehlt etwas, das den Unterschied macht?"),

            h2("Das Ergebnis"),
            ul([
                "Visuelle Customer Journey Map",
                "Identifizierte Pain Points mit Priorität",
                "Konkrete Verbesserungsvorschläge",
                "Quick Wins für sofortige Umsetzung",
                "Roadmap für längerfristige Optimierung"
            ])
        ]),
        "process": [
            ("Journey-Phasen definieren", "Von Awareness bis Loyalty – wir definieren die relevanten Phasen für Ihr Business."),
            ("Touchpoint-Inventur", "Alle Berührungspunkte sammeln und dokumentieren – online und offline."),
            ("Kunden-Perspektive", "Interviews und Daten: Was erleben Kunden wirklich an jedem Punkt?"),
            ("Mapping", "Visuelle Darstellung der Journey mit Emotionen, Pain Points und Opportunities."),
            ("Priorisierung", "Welche Verbesserungen haben den größten Impact? Was ist schnell umsetzbar?")
        ],
        "deliverables": [
            "Customer Journey Map (visuell)",
            "Touchpoint-Dokumentation",
            "Pain Point-Analyse mit Ursachen",
            "Opportunity-Liste priorisiert",
            "Verbesserungs-Roadmap",
            "Präsentation für Stakeholder"
        ],
        "use_cases": [
            "Verbesserung der Kundenzufriedenheit",
            "Reduzierung von Absprüngen im Funnel",
            "Optimierung des Onboardings",
            "Vor größeren Website-Projekten",
            "Bei Einführung neuer Services"
        ],
        "benefits": [
            "Klares Bild der gesamten Customer Experience",
            "Identifizierte Schwachstellen mit Lösungen",
            "Priorisierte Verbesserungsmaßnahmen",
            "Gemeinsames Verständnis im Team",
            "Basis für kontinuierliche Optimierung"
        ]
    },

    # ========== 13: POSITIONIERUNGSBERATUNG ==========
    13: {
        "long_description": richtext([
            p("Positionierung ist Verzicht. Sie können nicht für jeden alles sein. Die Frage ist: Wofür wollen Sie stehen? In wessen Kopf wollen Sie welchen Platz einnehmen?"),

            h2("Das Positionierungsproblem"),
            p("Die meisten Unternehmen sind austauschbar. Sie machen das Gleiche wie andere, reden genauso, sehen genauso aus. Der einzige Unterschied ist der Preis – und das ist ein Rennen nach unten."),
            p("Starke Positionierung macht Sie unvergleichbar. Sie konkurrieren nicht mehr, Sie sind die einzige Option für die Menschen, die zu Ihnen passen."),

            h2("Wie Positionierung funktioniert"),
            p("Positionierung passiert im Kopf Ihrer Zielgruppe – nicht in Ihrem Marketingmaterial. Sie können sie nicht erzwingen, nur beeinflussen. Durch konsistente Botschaften, durch einzigartige Erlebnisse, durch klare Entscheidungen."),
            p("Das bedeutet auch: Positionierung ist Arbeit. Es reicht nicht, einen Claim zu schreiben. Die Positionierung muss in jedem Touchpoint spürbar sein."),

            h2("Was wir gemeinsam erarbeiten"),
            ul([
                "Ihre einzigartige Position im Markt",
                "Klare Definition Ihrer Zielgruppe",
                "Differenzierung zum Wettbewerb",
                "Kernbotschaften, die diese Position kommunizieren",
                "Roadmap zur Umsetzung in allen Kanälen"
            ])
        ]),
        "process": [
            ("Marktanalyse", "Wie ist der Markt strukturiert? Wer sind die Player? Wo sind Lücken?"),
            ("Wettbewerbsanalyse", "Was machen andere? Wie positionieren sie sich? Was fehlt?"),
            ("Stärken-Analyse", "Was können Sie besonders gut? Was ist einzigartig? Was sagen Kunden?"),
            ("Positionierungs-Workshop", "Gemeinsam entwickeln wir Ihre Position – mit klaren Entscheidungen."),
            ("Umsetzungsplan", "Wie wird die Positionierung in Kommunikation und Verhalten spürbar?")
        ],
        "deliverables": [
            "Positionierungs-Statement",
            "Wettbewerbsanalyse",
            "Differenzierungsmerkmale",
            "Kernbotschaften-Framework",
            "Umsetzungs-Roadmap",
            "Präsentation für internes Alignment"
        ],
        "use_cases": [
            "Unternehmen in umkämpften Märkten",
            "Firmen mit unklarer Differenzierung",
            "Vor Rebranding-Projekten",
            "Bei Erschließung neuer Märkte",
            "Nach Fusionen oder Neuausrichtung"
        ],
        "benefits": [
            "Klare Differenzierung zum Wettbewerb",
            "Fokussiertes Marketing mit klarer Botschaft",
            "Höhere Preisdurchsetzung möglich",
            "Einfachere Entscheidungen für Ihr Team",
            "Grundlage für langfristigen Markenwert"
        ]
    },

    # ========== 14: FUNNEL-STRATEGIEN ==========
    14: {
        "long_description": richtext([
            p("Ein Funnel ist kein Manipulationswerkzeug – es ist eine strukturierte Kundenreise. Vom ersten Kontakt bis zum Kauf (und darüber hinaus) wissen Sie genau, welchen Content Menschen in welcher Phase brauchen."),

            h2("Das Funnel-Prinzip"),
            p("Nicht jeder, der Ihre Website besucht, ist kaufbereit. Manche recherchieren erst. Manche vergleichen Optionen. Manche brauchen mehr Vertrauen. Ein guter Funnel holt Menschen dort ab, wo sie sind."),
            p("Top of Funnel: Aufmerksamkeit gewinnen, Problem bewusst machen. Middle of Funnel: Lösungen zeigen, Vertrauen aufbauen. Bottom of Funnel: Kaufentscheidung ermöglichen, Einwände ausräumen."),

            h2("Funnel-Typen, die wir entwickeln"),
            p("Lead-Generierung: Vom Website-Besucher zum qualifizierten Lead. E-Book, Webinar, Beratungsgespräch – wir finden den richtigen Köder für Ihre Zielgruppe."),
            p("Nurturing: Leads pflegen, bis sie kaufbereit sind. Automatisierte E-Mail-Sequenzen, die Mehrwert liefern statt zu nerven."),
            p("Sales: Den Kaufprozess unterstützen. Einwände ausräumen, Vertrauen aufbauen, den letzten Anstoß geben."),

            h2("Was einen guten Funnel ausmacht"),
            ul([
                "Klare Ziele für jede Phase",
                "Content, der echten Mehrwert bietet",
                "Nahtlose Übergänge zwischen Phasen",
                "Messbarkeit und Optimierungsmöglichkeit",
                "Automatisierung, die persönlich wirkt"
            ])
        ]),
        "process": [
            ("Zieldefinition", "Was soll der Funnel erreichen? Leads, Sales, Anmeldungen? Wie messen wir Erfolg?"),
            ("Customer Journey", "Welche Phasen durchlaufen Ihre Kunden? Was brauchen sie in jeder Phase?"),
            ("Content-Konzeption", "Welche Inhalte brauchen wir? Lead Magnets, E-Mails, Landing Pages, Sales Pages."),
            ("Technische Umsetzung", "Setup in Ihrem E-Mail-Tool, CRM-Integration, Automatisierungen."),
            ("Launch & Optimierung", "Funnel live schalten, Performance messen, kontinuierlich verbessern.")
        ],
        "deliverables": [
            "Funnel-Strategie-Dokument",
            "Content-Plan für alle Phasen",
            "Lead Magnet (E-Book, Checkliste, o.ä.)",
            "E-Mail-Sequenzen (getextet)",
            "Landing Pages",
            "Tracking & Reporting Setup"
        ],
        "use_cases": [
            "B2B-Unternehmen mit längeren Verkaufszyklen",
            "Coaches und Berater mit Hochpreis-Angeboten",
            "SaaS-Unternehmen mit Free Trials",
            "E-Commerce mit erklärungsbedürftigen Produkten",
            "Dienstleister, die mehr Anfragen wollen"
        ],
        "benefits": [
            "Strukturierter Prozess statt Zufallstreffer",
            "Qualifiziertere Leads für den Vertrieb",
            "Automatisierte Kontaktpflege",
            "Messbare Marketing-Ergebnisse",
            "Skalierbare Lead-Generierung"
        ]
    },

    # ========== 15: TECHNISCHES SEO ==========
    15: {
        "long_description": richtext([
            p("Technisches SEO ist die Grundlage für alles andere. Wenn Google Ihre Seiten nicht richtig crawlen und indexieren kann, helfen die besten Inhalte nichts. Hier passieren die Fehler, die niemand sieht – aber Google schon."),

            h2("Was Technisches SEO umfasst"),
            p("Crawlbarkeit: Kann Google alle wichtigen Seiten finden und lesen? Blockiert etwas den Zugriff?"),
            p("Indexierung: Werden die richtigen Seiten indexiert? Gibt es Duplicate Content? Sind Canonical Tags korrekt?"),
            p("Performance: Wie schnell laden Ihre Seiten? Core Web Vitals – sind sie im grünen Bereich?"),
            p("Struktur: Ist die URL-Struktur logisch? Funktioniert die interne Verlinkung? Gibt es tote Links?"),

            h2("Typische Probleme, die wir finden"),
            p("Viele Websites haben technische Probleme, von denen die Betreiber nichts wissen. Seiten, die nicht indexiert werden. Massenhaft 404-Fehler. Langsame Server. Falsche Weiterleitungen. Mobile-Probleme."),
            p("Diese Probleme kosten Rankings – und damit Traffic und Umsatz. Sie zu beheben ist oft aufwändiger als gedacht, aber der Impact ist real."),

            h2("Unsere technischen SEO-Leistungen"),
            ul([
                "Vollständiger technischer SEO-Audit",
                "Crawlability- und Indexierungsanalyse",
                "Core Web Vitals Optimierung",
                "Sitemap- und Robots.txt-Optimierung",
                "Schema Markup Implementation",
                "Mobile-Optimierung"
            ])
        ]),
        "process": [
            ("Crawl-Analyse", "Wir crawlen Ihre Website wie Google und analysieren die Ergebnisse."),
            ("Search Console Audit", "Analyse der Google-Daten: Indexierung, Fehler, Performance."),
            ("Performance-Test", "Core Web Vitals, Ladezeiten, Server-Response messen und analysieren."),
            ("Priorisierung", "Welche Probleme haben den größten SEO-Impact? Was ist schnell behebbar?"),
            ("Umsetzung & Monitoring", "Behebung der Probleme, Verifizierung der Fixes, laufendes Monitoring.")
        ],
        "deliverables": [
            "Technischer SEO-Audit (ausführlicher Report)",
            "Priorisierte Maßnahmenliste",
            "Implementierung der Fixes",
            "Core Web Vitals Optimierung",
            "Schema Markup Setup",
            "Monitoring-Dashboard"
        ],
        "use_cases": [
            "Websites mit unklaren Ranking-Problemen",
            "Nach Website-Relaunches oder Migrationen",
            "Vor umfangreichen SEO-Kampagnen",
            "Bei Performance-Problemen",
            "Regelmäßige SEO-Hygiene"
        ],
        "benefits": [
            "Bessere Crawlbarkeit und Indexierung",
            "Schnellere Ladezeiten",
            "Saubere technische Basis für Content-SEO",
            "Identifizierte Probleme mit Lösungen",
            "Langfristig stabile Rankings"
        ]
    },

    # ========== 16: LOCAL SEO ==========
    16: {
        "long_description": richtext([
            p("Local SEO ist ein eigenes Spielfeld. Wenn jemand 'Bäcker in meiner Nähe' sucht, gelten andere Regeln als bei normaler Google-Suche. Google Business Profil, lokale Keywords, Bewertungen – alles muss zusammenspielen."),

            h2("Warum Local SEO anders funktioniert"),
            p("Bei lokalen Suchen zeigt Google das Map Pack – die drei lokalen Ergebnisse mit Karte. Hier zu erscheinen ist für lokale Unternehmen oft wichtiger als organische Rankings."),
            p("Die Ranking-Faktoren sind andere: Nähe zum Suchenden, Relevanz, Bekanntheit (gemessen an Bewertungen, Nennungen, Links). Das Google Business Profil ist zentral."),

            h2("Die Säulen von Local SEO"),
            p("Google Business Profil: Vollständig ausgefüllt, regelmäßig aktualisiert, mit Fotos und Posts aktiv gepflegt."),
            p("NAP-Konsistenz: Name, Adresse, Telefonnummer müssen überall im Web identisch sein."),
            p("Bewertungen: Mehr und bessere Google-Bewertungen verbessern das Ranking und die Klickrate."),
            p("Lokale Inhalte: Website-Content, der lokale Relevanz zeigt. Lokale Landing Pages für verschiedene Standorte."),

            h2("Was wir für Ihr lokales Ranking tun"),
            ul([
                "Google Business Profil Optimierung",
                "Lokale Keyword-Strategie",
                "NAP-Audit und Korrektur",
                "Bewertungs-Strategie und -Prozess",
                "Lokale Landing Pages",
                "Citation Building (Branchenverzeichnisse)"
            ])
        ]),
        "process": [
            ("Lokaler SEO-Audit", "Aktueller Stand: Google Business Profil, Rankings, NAP, Bewertungen."),
            ("GBP-Optimierung", "Profil vollständig optimieren: Kategorien, Beschreibung, Fotos, Services."),
            ("NAP-Cleanup", "Inkonsistenzen finden und korrigieren, wichtige Citations aufbauen."),
            ("Bewertungs-Strategie", "Prozess etablieren, um kontinuierlich echte Bewertungen zu generieren."),
            ("Content & Landing Pages", "Lokale Inhalte erstellen, ggf. Standort-spezifische Landing Pages.")
        ],
        "deliverables": [
            "Local SEO Audit Report",
            "Optimiertes Google Business Profil",
            "NAP-Korrektur-Report",
            "Citation-Liste (aufgebaut)",
            "Bewertungs-Anfrage-Prozess",
            "Lokale Landing Pages (optional)"
        ],
        "use_cases": [
            "Lokale Geschäfte und Dienstleister",
            "Restaurants und Gastronomie",
            "Ärzte, Anwälte, Berater",
            "Handwerker und lokale Services",
            "Unternehmen mit mehreren Standorten"
        ],
        "benefits": [
            "Sichtbarkeit im Google Map Pack",
            "Mehr lokale Anfragen und Besucher",
            "Bessere Google-Bewertungen",
            "Konsistente Online-Präsenz",
            "Wettbewerbsvorteil in der Region"
        ]
    },

    # ========== 17: SEO AUDIT ==========
    17: {
        "long_description": richtext([
            p("Ein SEO-Audit ist keine automatische Checkliste, die ein Tool ausspuckt. Es ist eine fundierte Analyse Ihrer Website durch erfahrene Experten – technisch, inhaltlich und im Wettbewerbskontext."),

            h2("Was wir analysieren"),
            p("Technisches SEO: Crawlbarkeit, Indexierung, Ladezeiten, Mobile-Freundlichkeit, Core Web Vitals, Sicherheit."),
            p("On-Page SEO: Title Tags, Meta Descriptions, Überschriften, Content-Qualität, interne Verlinkung."),
            p("Content: Keyword-Abdeckung, Content-Gaps, Suchintention, E-E-A-T-Signale."),
            p("Off-Page: Backlink-Profil, Domain Authority, Wettbewerbsvergleich."),

            h2("Wie ein Audit abläuft"),
            p("Wir starten mit einem automatisierten Crawl und Tool-Analysen. Aber das ist nur der Anfang. Die eigentliche Arbeit ist die manuelle Analyse: Muster erkennen, Ursachen verstehen, Prioritäten setzen."),
            p("Das Ergebnis ist kein 100-Seiten-Report, den niemand liest. Sondern eine klare Übersicht: Was ist der Ist-Zustand? Was sind die größten Probleme? Was sollten Sie zuerst angehen?"),

            h2("Was Sie bekommen"),
            ul([
                "Umfassender Audit-Report",
                "Executive Summary für Entscheider",
                "Priorisierte Maßnahmenliste",
                "Konkrete Handlungsempfehlungen",
                "Wettbewerbsvergleich",
                "Präsentation und Besprechung"
            ])
        ]),
        "process": [
            ("Kick-off", "Ziele klären, Zugänge einrichten (Search Console, Analytics), Wettbewerber definieren."),
            ("Technische Analyse", "Crawl, Indexierung, Performance, Mobile, Security."),
            ("Content-Analyse", "Keywords, Content-Qualität, Gaps, Suchintention."),
            ("Off-Page-Analyse", "Backlinks, Domain Authority, Wettbewerbsposition."),
            ("Report & Besprechung", "Ergebnisse dokumentieren, priorisieren, gemeinsam besprechen.")
        ],
        "deliverables": [
            "SEO-Audit-Report (30-50 Seiten)",
            "Executive Summary (2-3 Seiten)",
            "Technische Fehler-Liste",
            "Content-Opportunities",
            "Priorisierter Maßnahmenplan",
            "Besprechungs-Call"
        ],
        "use_cases": [
            "Vor SEO-Projekten als Basis",
            "Bei sinkenden Rankings ohne klare Ursache",
            "Nach Website-Relaunches",
            "Zur regelmäßigen SEO-Überprüfung (jährlich)",
            "Bei Übernahme einer bestehenden Website"
        ],
        "benefits": [
            "Klares Bild des SEO-Ist-Zustands",
            "Identifizierte Probleme und Chancen",
            "Priorisierte Maßnahmen für maximalen Impact",
            "Fundierte Grundlage für SEO-Strategie",
            "Keine versteckten Probleme mehr"
        ]
    },

    # ========== 18: KEYWORDSTRATEGIE ==========
    18: {
        "long_description": richtext([
            p("Keyword-Recherche ist mehr als ein Tool zu bedienen. Es geht darum zu verstehen, was hinter einer Suchanfrage steckt. Will jemand kaufen? Sich informieren? Vergleichen? Die richtige Antwort bestimmt, welchen Content Sie brauchen."),

            h2("Suchintention verstehen"),
            p("'Laufschuhe' und 'Laufschuhe kaufen' sind verschiedene Suchanfragen. Bei der ersten will jemand sich informieren, bei der zweiten kaufen. Wenn Sie das verwechseln, ranken Sie nicht – oder die falschen Leute kommen auf Ihre Seite."),
            p("Wir clustern Keywords nach Intention: Informational, Navigational, Commercial, Transactional. Für jede Intention brauchen Sie anderen Content."),

            h2("Von Keywords zu Content-Strategie"),
            p("Das Ergebnis einer Keyword-Recherche ist keine Liste mit Suchvolumen. Es ist ein Plan: Welche Themen sollten Sie abdecken? Welche Seiten brauchen Sie dafür? Wie hängen die Seiten zusammen?"),
            p("Wir identifizieren nicht nur Keywords, sondern zeigen, wie Sie damit arbeiten: Topic Clusters, Pillar Pages, Content-Lücken gegenüber Wettbewerbern."),

            h2("Was unsere Keyword-Strategie enthält"),
            ul([
                "Umfassende Keyword-Recherche",
                "Clustering nach Themen und Intention",
                "Wettbewerbsanalyse (wer rankt wofür)",
                "Content-Gap-Analyse",
                "Priorisierung nach Potenzial und Aufwand",
                "Content-Plan mit Seitenstruktur"
            ])
        ]),
        "process": [
            ("Seed Keywords", "Ihre Themen, Produkte, Services als Ausgangspunkt definieren."),
            ("Keyword-Recherche", "Umfassende Recherche mit Tools und manueller Analyse."),
            ("Clustering", "Gruppierung nach Themen und Suchintention."),
            ("Wettbewerbs-Check", "Wer rankt für diese Keywords? Wie stark ist der Wettbewerb?"),
            ("Strategie & Plan", "Priorisierung, Content-Mapping, Umsetzungsplan.")
        ],
        "deliverables": [
            "Keyword-Liste (Excel/Google Sheets)",
            "Keyword-Clustering nach Themen",
            "Suchintentions-Analyse",
            "Wettbewerbsmatrix",
            "Content-Plan mit Prioritäten",
            "Beratungs-Call zur Strategie"
        ],
        "use_cases": [
            "Vor Content-Produktion als Grundlage",
            "Bei Website-Neustrukturierung",
            "Zur Identifikation neuer Content-Chancen",
            "Für SEO-Strategie-Entwicklung",
            "Bei Expansion in neue Themenbereiche"
        ],
        "benefits": [
            "Content für echte Suchanfragen",
            "Fokus auf Keywords mit Potenzial",
            "Strukturierte Content-Planung",
            "Verständnis des Wettbewerbs",
            "Keine Ressourcen-Verschwendung"
        ]
    },

    # ========== 19: COPYWRITING ==========
    19: {
        "long_description": richtext([
            p("Copywriting ist kein kreatives Schreiben – es ist Handwerk mit Methode. Gute Texte verkaufen, weil sie verstehen, was die Zielgruppe hören will, und es so formulieren, dass sie handeln."),

            h2("Was Copywriting von Content unterscheidet"),
            p("Content informiert und unterhält. Copy verkauft. Das heißt nicht, dass Copy plump oder manipulativ sein muss. Aber jeder Satz hat einen Job: den Leser zum nächsten Satz bringen, Einwände ausräumen, zur Handlung führen."),
            p("Website-Headlines, Produktbeschreibungen, Landing Pages, E-Mails, Ads – das ist Copy. Blogartikel, Guides, Social Posts – das ist Content. Beides wichtig, beides unterschiedlich."),

            h2("Wie wir texten"),
            p("Wir starten nicht mit Worten, sondern mit Verstehen. Wer ist die Zielgruppe? Was ist ihr Problem? Was ist Ihre Lösung? Welche Einwände haben sie? Erst wenn wir das wissen, schreiben wir."),
            p("Dann strukturieren wir. Bevor ein Satz entsteht, steht die Logik: Welche Punkte in welcher Reihenfolge? Wie bauen wir Spannung auf? Wo setzen wir den CTA?"),
            p("Der Text selbst folgt. Klar, direkt, ohne Füllwörter. Wir schreiben, überarbeiten, kürzen. Bis jeder Satz seinen Job macht."),

            h2("Was wir texten"),
            ul([
                "Website-Texte (alle Seiten)",
                "Landing Pages",
                "E-Mail-Sequenzen",
                "Sales Pages",
                "Produktbeschreibungen",
                "Ad Copy (Google, Facebook, LinkedIn)"
            ])
        ]),
        "process": [
            ("Briefing", "Zielgruppe, Angebot, Tonalität, Ziel des Textes. Je besser das Briefing, desto besser der Text."),
            ("Recherche", "Wir verstehen Ihr Angebot, Ihre Kunden, Ihre Sprache. Ggf. Interviews oder Materialstudium."),
            ("Struktur", "Outline: Welche Punkte in welcher Reihenfolge? Logik vor Text."),
            ("Texten", "Der eigentliche Text entsteht. Erste Fassung, dann Überarbeitung."),
            ("Revision", "Eine Feedback-Runde inklusive. Finalisierung nach Ihren Anmerkungen.")
        ],
        "deliverables": [
            "Fertige Texte in gewünschtem Format",
            "SEO-optimiert (falls gewünscht)",
            "In Ihrer Marken-Tonalität",
            "Eine Revision inklusive",
            "Optional: Headline-Varianten für A/B-Tests"
        ],
        "use_cases": [
            "Neue Websites oder Relaunches",
            "Landing Pages für Kampagnen",
            "E-Mail-Marketing-Sequenzen",
            "Produktbeschreibungen für Shops",
            "Ad-Kampagnen"
        ],
        "benefits": [
            "Texte, die konvertieren",
            "Professioneller Auftritt",
            "Konsistente Marken-Stimme",
            "Zeit gespart gegenüber Selbstschreiben",
            "Externe Perspektive auf Ihr Angebot"
        ]
    },

    # ========== 20: CONTENT-PLANUNG ==========
    20: {
        "long_description": richtext([
            p("Ein guter Content-Plan verbindet SEO-Potenzial mit Ihrer Expertise und den Fragen Ihrer Zielgruppe. Er definiert nicht nur Themen, sondern auch Formate, Frequenz und Verantwortlichkeiten."),

            h2("Warum Content-Planung wichtig ist"),
            p("Ohne Plan ist Content-Marketing reaktiv und inkonsistent. Mal ein Blogartikel hier, ein Social Post dort – ohne roten Faden, ohne Strategie, ohne Ergebnisse."),
            p("Mit einem Plan wissen Sie immer, was als Nächstes kommt. Keine leeren Redaktionsmeetings, keine 'was posten wir diese Woche'-Panik. Stattdessen: systematischer Aufbau Ihrer Online-Präsenz."),

            h2("Was ein guter Content-Plan enthält"),
            p("Themen: Was interessiert Ihre Zielgruppe? Wonach suchen sie? Was können Sie besser beantworten als andere?"),
            p("Formate: Blog, Video, Podcast, Social, E-Mail? Nicht jedes Thema passt zu jedem Format."),
            p("Frequenz: Was ist realistisch für Ihre Ressourcen? Besser weniger und konsistent als viel und dann nichts."),
            p("Distribution: Wo veröffentlichen Sie? Wie promoten Sie? Wie recyclen Sie Content?"),

            h2("Was wir liefern"),
            ul([
                "Content-Strategie-Dokument",
                "Redaktionskalender (3-12 Monate)",
                "Themen mit SEO-Daten",
                "Format-Empfehlungen pro Thema",
                "Distribution-Plan",
                "Workflow-Definition"
            ])
        ]),
        "process": [
            ("Strategie", "Ziele, Zielgruppe, Themenfelder, Positionierung des Contents definieren."),
            ("Themenrecherche", "SEO-Potenzial, Wettbewerb, Fragen der Zielgruppe analysieren."),
            ("Kalender erstellen", "Themen zeitlich planen, Formate zuweisen, Verantwortlichkeiten klären."),
            ("Workflow definieren", "Wer macht was wann? Wie sieht der Prozess von Idee bis Veröffentlichung aus?"),
            ("Übergabe", "Kalender und Strategie übergeben, Tools einrichten, Team briefen.")
        ],
        "deliverables": [
            "Content-Strategie-Dokument",
            "Redaktionskalender (Notion, Excel, oder Ihr Tool)",
            "Themensammlung mit SEO-Daten",
            "Format- und Channel-Empfehlungen",
            "Workflow-Dokumentation",
            "Strategie-Präsentation"
        ],
        "use_cases": [
            "Start eines Corporate Blogs",
            "Professionalisierung des Content-Marketings",
            "Nach Einstellung eines Content-Teams",
            "Bei Ressourcen-Knappheit für Struktur",
            "Für konsistente Content-Produktion"
        ],
        "benefits": [
            "Struktur statt Ad-hoc-Content",
            "SEO-optimierte Themenauswahl",
            "Realistische Planung für Ihre Ressourcen",
            "Klare Verantwortlichkeiten",
            "Messbare Content-Ziele"
        ]
    },

    # ========== 21: REELS & SOCIAL VIDEO ==========
    21: {
        "long_description": richtext([
            p("Social Video ist ein eigenes Format: Kurz, vertikal, sofort packend. Die ersten Sekunden entscheiden, ob jemand weiterschaut oder weiterscrollt. Hier gelten andere Regeln als bei YouTube oder TV."),

            h2("Warum Reels und Short-Form Video funktionieren"),
            p("Die Aufmerksamkeitsspanne auf Social Media ist brutal kurz. Aber Videos, die funktionieren, können viral gehen und Reichweite generieren, die mit anderen Formaten unmöglich wäre."),
            p("Reels auf Instagram, TikToks, YouTube Shorts – die Plattformen pushen dieses Format aktiv. Wer es beherrscht, bekommt organische Reichweite, die es so bei statischen Posts nicht mehr gibt."),

            h2("Was Social Videos erfolgreich macht"),
            p("Hook: Die ersten 1-3 Sekunden müssen fesseln. Eine Frage, eine provokante Aussage, etwas Unerwartetes."),
            p("Struktur: Auch in 30 Sekunden braucht ein Video einen Bogen. Problem, Spannung, Lösung."),
            p("Authentizität: Hochglanz-Produktion kann funktionieren, aber oft performt Authentisches besser als Poliertes."),
            p("Untertitel: Die meisten schauen ohne Ton. Text muss den Inhalt tragen."),

            h2("Unser Video-Angebot"),
            ul([
                "Konzeptentwicklung für Video-Serien",
                "Scripting mit Hook und Story-Arc",
                "Video-Produktion (Dreh vor Ort oder remote)",
                "Editing mit Untertiteln und Grafiken",
                "Format-Optimierung für verschiedene Plattformen",
                "Performance-Analyse und Iteration"
            ])
        ]),
        "process": [
            ("Konzeption", "Zielgruppe, Plattformen, Content-Säulen für Videos definieren."),
            ("Ideenfindung", "Video-Ideen entwickeln, die zu Ihrer Marke passen und viral-Potenzial haben."),
            ("Scripting", "Hook, Story-Arc, Call-to-Action – jedes Video wird durchgeplant."),
            ("Produktion", "Dreh vor Ort oder Anleitung für Selbstaufnahme."),
            ("Editing", "Schnitt, Untertitel, Grafiken, Musik, Format-Anpassung.")
        ],
        "deliverables": [
            "Video-Content-Strategie",
            "Scripts für Video-Serie",
            "Fertige Videos (editiert)",
            "Versionen für verschiedene Plattformen",
            "Posting-Empfehlungen",
            "Performance-Review nach Veröffentlichung"
        ],
        "use_cases": [
            "Aufbau einer Social-Media-Präsenz",
            "Personal Branding für Gründer/Experten",
            "Produkt-Launches und Promotions",
            "Behind-the-Scenes und Employer Branding",
            "Educational Content für Expertise-Aufbau"
        ],
        "benefits": [
            "Organische Reichweite auf Social Media",
            "Persönliche Verbindung zur Zielgruppe",
            "Content, der teilbar ist",
            "Expertise sichtbar machen",
            "Plattform-Algorithmen nutzen"
        ]
    },

    # ========== 22: BUSINESS-FOTOGRAFIE ==========
    22: {
        "long_description": richtext([
            p("Stock-Fotos erkennt man sofort. Sie sind austauschbar, unpersönlich, und sagen nichts über Ihr Unternehmen aus. Professionelle Business-Fotografie zeigt, wer Sie wirklich sind."),

            h2("Warum eigene Fotos wichtig sind"),
            p("Menschen kaufen von Menschen. Echte Fotos von Ihrem Team, Ihrer Arbeit, Ihren Räumen schaffen Vertrauen und Authentizität, die Stock-Fotos nie erreichen können."),
            p("Auf Ihrer Website, in Social Media, in Präsentationen, auf Messen – überall, wo Sie sich zeigen, machen gute Fotos den Unterschied."),

            h2("Was wir fotografieren"),
            p("Team-Portraits: Professionelle Aufnahmen Ihrer Mitarbeiter, die Persönlichkeit zeigen und zu Ihrer Marke passen."),
            p("Arbeitsszenen: Menschen bei der Arbeit, authentisch aber inszeniert. Zeigt, was Sie tun und wie Sie arbeiten."),
            p("Office/Location: Ihre Räume, Ihre Umgebung. Für 'Über uns'-Seiten, Recruiting, Kundengewinnung."),
            p("Produkte: Falls relevant – Ihre Produkte professionell in Szene gesetzt."),

            h2("Unser Ansatz"),
            ul([
                "Konzeption vor dem Shooting",
                "Art Direction während des Shootings",
                "Abstimmung mit Ihrer visuellen Identität",
                "Professionelle Nachbearbeitung",
                "Lieferung in allen benötigten Formaten"
            ])
        ]),
        "process": [
            ("Briefing", "Was brauchen Sie? Welche Situationen, welche Personen, welcher Stil?"),
            ("Konzeption", "Shot-Liste erstellen, Locations besprechen, Styling-Hinweise geben."),
            ("Shooting", "Professionelles Fotoshooting mit Art Direction."),
            ("Auswahl", "Sie wählen aus den besten Aufnahmen, wir beraten."),
            ("Bearbeitung & Lieferung", "Professionelles Editing, Lieferung in gewünschten Formaten.")
        ],
        "deliverables": [
            "Professionelle Fotografie",
            "Bildauswahl mit Ihrer Freigabe",
            "Professionelle Nachbearbeitung",
            "Web-optimierte Versionen",
            "Hochauflösende Originale",
            "Nutzungsrechte für alle Kanäle"
        ],
        "use_cases": [
            "Neue Website oder Redesign",
            "Team-Vorstellungen",
            "Employer Branding und Recruiting",
            "Marketing-Materialien",
            "Social Media Content"
        ],
        "benefits": [
            "Authentische Darstellung Ihres Unternehmens",
            "Professioneller Eindruck auf allen Kanälen",
            "Einheitlicher visueller Auftritt",
            "Content für vielfältige Verwendung",
            "Differenzierung von Wettbewerbern mit Stock-Fotos"
        ]
    }
}

# Update database
for service_id, data in services_data.items():
    cursor.execute("UPDATE sub_services SET long_description = ? WHERE id = ?",
                   (data["long_description"], service_id))

    cursor.execute("DELETE FROM sub_services_process WHERE _parent_id = ?", (service_id,))
    for order, (title, desc) in enumerate(data["process"], 1):
        cursor.execute("INSERT INTO sub_services_process (_order, _parent_id, id, title, description) VALUES (?, ?, ?, ?, ?)",
                       (order, service_id, uid(), title, desc))

    cursor.execute("DELETE FROM sub_services_deliverables WHERE _parent_id = ?", (service_id,))
    for order, deliverable in enumerate(data["deliverables"], 1):
        cursor.execute("INSERT INTO sub_services_deliverables (_order, _parent_id, id, deliverable) VALUES (?, ?, ?, ?)",
                       (order, service_id, uid(), deliverable))

    cursor.execute("DELETE FROM sub_services_use_cases WHERE _parent_id = ?", (service_id,))
    for order, use_case in enumerate(data["use_cases"], 1):
        cursor.execute("INSERT INTO sub_services_use_cases (_order, _parent_id, id, use_case) VALUES (?, ?, ?, ?)",
                       (order, service_id, uid(), use_case))

    cursor.execute("DELETE FROM sub_services_benefits WHERE _parent_id = ?", (service_id,))
    for order, benefit in enumerate(data["benefits"], 1):
        cursor.execute("INSERT INTO sub_services_benefits (_order, _parent_id, id, benefit) VALUES (?, ?, ?, ?)",
                       (order, service_id, uid(), benefit))

    print(f"✓ Updated: ID {service_id}")

conn.commit()
conn.close()
print("\nBatch 2 complete: Digitale Strategie, SEO & Content (IDs 11-22)")
