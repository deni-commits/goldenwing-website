#!/usr/bin/env python3
"""Batch 3: Tech & Software Services (IDs 23-32)"""
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
    # ========== 23: FORMULAR-LOGIKEN ==========
    23: {
        "long_description": richtext([
            p("Ein gutes Formular ist wie ein gutes Gespräch: Es fragt nur, was relevant ist, und passt sich den Antworten an. Bedingte Logik macht das möglich – dynamische Formulare, die intelligenter sind als statische Felder."),

            h2("Warum smarte Formulare wichtig sind"),
            p("Jedes zusätzliche Feld kostet Conversion. Menschen brechen ab, wenn Formulare zu lang oder irrelevant wirken. Mit konditioneller Logik zeigen Sie nur, was für den jeweiligen Nutzer relevant ist."),
            p("Aber es geht nicht nur um Kürze. Smarte Formulare können Leads qualifizieren, Angebote berechnen, oder Nutzer durch komplexe Prozesse führen – alles automatisch."),

            h2("Was wir mit Formularen machen können"),
            p("Bedingte Felder: Felder erscheinen oder verschwinden basierend auf vorherigen Antworten."),
            p("Lead-Qualifizierung: Automatische Bewertung basierend auf Antworten. Hot Leads direkt zum Vertrieb, kalte in die Nurturing-Sequenz."),
            p("Preisrechner: Nutzer konfigurieren ihr Angebot, sehen live den Preis, können direkt anfragen."),
            p("Mehrstufige Formulare: Komplexe Anfragen in verdauliche Schritte aufgeteilt, mit Fortschrittsanzeige."),

            h2("Technische Umsetzung"),
            ul([
                "Integration mit CRM und E-Mail-Tools",
                "Automatische Datenübergabe an Ihr System",
                "DSGVO-konforme Umsetzung",
                "Mobile-optimiertes Design",
                "A/B-Testing-Möglichkeiten",
                "Analytics und Conversion-Tracking"
            ])
        ]),
        "process": [
            ("Anforderungen", "Was soll das Formular leisten? Welche Daten brauchen Sie? Welche Integrationen?"),
            ("Logik-Design", "Welche Bedingungen? Welche Verzweigungen? Mapping der gesamten Formular-Logik."),
            ("UI-Design", "Das Formular muss nicht nur funktionieren, sondern auch gut aussehen und sich gut anfühlen."),
            ("Entwicklung", "Umsetzung mit geeigneter Technologie, Integration in Ihre Systeme."),
            ("Testing", "Alle Pfade testen, Mobile-Check, Integrationen verifizieren.")
        ],
        "deliverables": [
            "Fertiges Formular mit Logik",
            "CRM/E-Mail-Integration",
            "Mobile-responsive Design",
            "Bestätigungs-E-Mails",
            "Analytics Setup",
            "Dokumentation der Logik"
        ],
        "use_cases": [
            "Lead-Generierung mit Qualifizierung",
            "Angebotsanfragen mit Preisrechner",
            "Bewerbungsformulare mit Vorselektion",
            "Konfiguratoren für Produkte/Services",
            "Komplexe Buchungs- oder Anmeldeprozesse"
        ],
        "benefits": [
            "Höhere Formular-Conversion",
            "Qualifiziertere Leads",
            "Automatisierte Datenverarbeitung",
            "Bessere User Experience",
            "Reduzierter manueller Aufwand"
        ]
    },

    # ========== 24: GATED CONTENT ==========
    24: {
        "long_description": richtext([
            p("Gated Content ist ein Tauschgeschäft: Wertvolle Information gegen Kontaktdaten. Damit das funktioniert, muss der Content wirklich wertvoll sein – nicht nur ein umformatierter Blogartikel mit E-Mail-Schranke davor."),

            h2("Was guten Gated Content ausmacht"),
            p("Echter Mehrwert: Der Content muss ein Problem lösen oder eine Frage beantworten, die Ihre Zielgruppe wirklich hat. Oberflächliches wird sofort als Lead-Magnet-Falle erkannt."),
            p("Das richtige Format: E-Books, Checklisten, Templates, Webinare, Tools – das Format muss zum Inhalt und zur Zielgruppe passen."),
            p("Professionelle Aufmachung: Der erste Eindruck zählt. Wenn das E-Book aussieht wie ein Word-Dokument, wirft das kein gutes Licht auf Ihre Expertise."),

            h2("Gated Content Typen"),
            p("E-Books & Guides: Tiefgehende Inhalte zu einem Thema. Positioniert Sie als Experte."),
            p("Checklisten & Templates: Praktische Tools, die sofort anwendbar sind. Hohe Conversion."),
            p("Webinare & Videos: Persönlicher, interaktiv möglich, zeigt Expertise live."),
            p("Tools & Rechner: Interaktive Inhalte, die einen konkreten Nutzen haben."),

            h2("Was wir liefern"),
            ul([
                "Content-Konzeption mit Zielgruppen-Fokus",
                "Recherche und Text-Erstellung",
                "Professionelles Design und Layout",
                "Landing Page für den Download",
                "E-Mail-Automation nach Download",
                "Promotion-Strategie"
            ])
        ]),
        "process": [
            ("Konzeption", "Welches Thema? Welches Format? Welche Zielgruppe? Was passiert nach dem Download?"),
            ("Recherche & Text", "Inhalte recherchieren, strukturieren und schreiben."),
            ("Design", "Professionelles Layout, das Ihre Marke repräsentiert."),
            ("Landing Page", "Überzeugende Seite, die zum Download motiviert."),
            ("Automation", "E-Mail-Sequenz nach Download: Mehrwert, Nurturing, nächster Schritt.")
        ],
        "deliverables": [
            "Fertiger Gated Content (PDF/Video/Tool)",
            "Landing Page",
            "Danke-Seite",
            "E-Mail-Sequenz (3-5 E-Mails)",
            "Social-Media-Grafiken zur Promotion",
            "Tracking Setup"
        ],
        "use_cases": [
            "Lead-Generierung für B2B",
            "Aufbau einer E-Mail-Liste",
            "Positionierung als Experte",
            "Content für Paid Campaigns",
            "Sales Enablement für Vertrieb"
        ],
        "benefits": [
            "Qualifizierte Leads mit echtem Interesse",
            "E-Mail-Adressen für Nurturing",
            "Expertise-Positionierung",
            "Content mit langer Lebensdauer",
            "Messbarer Marketing-ROI"
        ]
    },

    # ========== 25: AUTOMATISIERUNG ==========
    25: {
        "long_description": richtext([
            p("Automatisierung ist kein Tech-Projekt – es ist ein Business-Projekt. Die Frage ist nicht 'was können wir automatisieren?' sondern 'was kostet uns Zeit, Nerven und Geld, das eine Maschine besser könnte?'"),

            h2("Was wir automatisieren können"),
            p("Manuelle Dateneingabe: Informationen, die von System A nach System B übertragen werden, gehören automatisiert."),
            p("E-Mail-Workflows: Willkommens-Sequenzen, Follow-ups, Reminder – alles, was regelmäßig und vorhersehbar ist."),
            p("Reporting: Daten aus verschiedenen Quellen sammeln, aufbereiten, verteilen – automatisch."),
            p("Prozesse: Genehmigungen, Benachrichtigungen, Eskalationen – Workflows, die heute manuell ablaufen."),

            h2("Unser Ansatz"),
            p("Wir starten nicht mit Tools, sondern mit Problemen. Was nervt Sie? Was geht schief? Wo verlieren Sie Zeit? Erst wenn wir das verstehen, suchen wir die passende Lösung."),
            p("Die kann simpel sein – ein Zapier-Workflow, der zwei Tools verbindet. Oder komplex – eine maßgeschneiderte Integration mit eigener Logik. Wir empfehlen, was für Ihr Problem am sinnvollsten ist."),

            h2("Typische Automatisierungen"),
            ul([
                "CRM-Einträge automatisch aus Formularen erstellen",
                "Follow-up-E-Mails nach Anfragen",
                "Slack-Benachrichtigungen bei wichtigen Events",
                "Automatische Rechnungserstellung",
                "Social-Media-Posting aus Content-Kalender",
                "Report-Erstellung und -Versand"
            ])
        ]),
        "process": [
            ("Analyse", "Welche Prozesse kosten Sie Zeit? Wo passieren Fehler? Was ist repetitiv?"),
            ("Priorisierung", "Welche Automatisierungen haben den größten Impact? Was ist schnell umsetzbar?"),
            ("Konzeption", "Workflows definieren: Trigger, Aktionen, Bedingungen, Fehlerbehandlung."),
            ("Umsetzung", "Implementation mit geeigneten Tools – Zapier, Make, n8n oder Custom Code."),
            ("Testing & Doku", "Alle Szenarien testen, Dokumentation für Ihr Team.")
        ],
        "deliverables": [
            "Prozess-Analyse-Dokument",
            "Implementierte Automatisierungen",
            "Dokumentation aller Workflows",
            "Fehlerbehandlung und Alerts",
            "Schulung für Ihr Team",
            "30 Tage Support nach Go-Live"
        ],
        "use_cases": [
            "Vertriebsprozesse beschleunigen",
            "Marketing-Workflows automatisieren",
            "Backoffice-Aufgaben reduzieren",
            "Kundenservice-Prozesse optimieren",
            "Reporting automatisieren"
        ],
        "benefits": [
            "Zeit für wichtigere Aufgaben",
            "Weniger menschliche Fehler",
            "Konsistente Prozesse",
            "Skalierbarkeit ohne mehr Personal",
            "Schnellere Reaktionszeiten"
        ]
    },

    # ========== 26: API-INTEGRATION ==========
    26: {
        "long_description": richtext([
            p("In den meisten Unternehmen existieren Daten in Silos: CRM hier, Shop dort, Buchhaltung woanders. Das führt zu doppelter Dateneingabe, Fehlern und verpassten Chancen. API-Integration baut die Brücken."),

            h2("Was API-Integration bedeutet"),
            p("APIs (Application Programming Interfaces) erlauben es verschiedenen Software-Systemen, miteinander zu kommunizieren. Wenn Ihr Shop einen Verkauf meldet, kann das automatisch im CRM landen, in der Buchhaltung, im Lager."),
            p("Nicht jede Integration ist gleich. Manchmal reicht eine fertige Zapier-Verbindung. Manchmal braucht es Custom Code, weil die Standard-Lösung nicht passt oder nicht existiert."),

            h2("Typische Integrations-Szenarien"),
            p("CRM + Website: Formulare füttern direkt ins CRM. Lead-Scoring, automatische Zuweisung, Follow-up-Trigger."),
            p("Shop + ERP: Bestellungen, Lagerbestände, Kundendaten synchron halten."),
            p("Marketing + Vertrieb: Wenn ein Lead eine E-Mail öffnet, weiß der Vertrieb Bescheid."),
            p("Analytics + Reporting: Daten aus verschiedenen Quellen in einem Dashboard zusammenführen."),

            h2("Unser Integrations-Angebot"),
            ul([
                "Analyse Ihrer Tool-Landschaft",
                "Integrations-Architektur definieren",
                "Native Integrationen nutzen, wo möglich",
                "Custom Integrationen entwickeln, wo nötig",
                "Fehlerbehandlung und Monitoring",
                "Dokumentation und Wartung"
            ])
        ]),
        "process": [
            ("Bestandsaufnahme", "Welche Systeme haben Sie? Welche Daten müssen fließen? Was sind die Probleme?"),
            ("Architektur", "Wie sollen die Systeme verbunden werden? Was ist technisch möglich?"),
            ("Entwicklung", "Integration bauen – mit vorhandenen Connectoren oder Custom Code."),
            ("Testing", "Datenflüsse testen, Edge Cases prüfen, Fehlerbehandlung verifizieren."),
            ("Go-Live & Monitoring", "Integration aktivieren, Monitoring einrichten, Support für die Eingewöhnung.")
        ],
        "deliverables": [
            "Integrations-Architektur-Dokument",
            "Implementierte Integrationen",
            "Daten-Mapping-Dokumentation",
            "Fehlerbehandlung und Logging",
            "Monitoring und Alerts",
            "Technische Dokumentation"
        ],
        "use_cases": [
            "CRM mit Marketing-Tools verbinden",
            "Shop mit Buchhaltung synchronisieren",
            "Kundendaten zentralisieren",
            "Automatische Datensynchronisation",
            "Custom Dashboards aus mehreren Quellen"
        ],
        "benefits": [
            "Keine doppelte Dateneingabe mehr",
            "Konsistente Daten über alle Systeme",
            "Weniger manuelle Fehler",
            "Echtzeit-Informationen",
            "Bessere Entscheidungsgrundlage"
        ]
    },

    # ========== 27: CLOUD & DEVOPS ==========
    27: {
        "long_description": richtext([
            p("DevOps ist die Brücke zwischen Entwicklung und Betrieb. Es geht darum, Software schneller, zuverlässiger und sicherer auszuliefern. Cloud-Infrastruktur ist oft die Grundlage dafür."),

            h2("Was DevOps für Sie bedeutet"),
            p("Schnellere Releases: Änderungen können in Stunden statt Wochen live gehen – sicher und getestet."),
            p("Weniger Ausfälle: Automatisierte Tests und Deployments reduzieren menschliche Fehler."),
            p("Skalierbarkeit: Ihre Infrastruktur wächst mit Ihren Anforderungen – automatisch."),
            p("Transparenz: Sie wissen jederzeit, wie Ihre Systeme performen und wo Probleme sind."),

            h2("Unsere DevOps-Leistungen"),
            p("CI/CD-Pipelines: Automatisierte Build-, Test- und Deployment-Prozesse."),
            p("Cloud-Infrastruktur: Setup und Management bei AWS, Google Cloud, Azure oder anderen Anbietern."),
            p("Containerisierung: Docker und Kubernetes für portable, skalierbare Anwendungen."),
            p("Monitoring & Alerting: Überwachung Ihrer Systeme, Benachrichtigung bei Problemen."),

            h2("Was wir aufbauen"),
            ul([
                "CI/CD-Pipelines (GitHub Actions, GitLab CI, Jenkins)",
                "Cloud-Infrastruktur (AWS, GCP, Azure)",
                "Container-Orchestrierung (Docker, Kubernetes)",
                "Infrastructure as Code (Terraform, Pulumi)",
                "Monitoring (Datadog, New Relic, Grafana)",
                "Security und Compliance"
            ])
        ]),
        "process": [
            ("Assessment", "Aktuelle Infrastruktur und Prozesse analysieren. Wo sind die Engpässe?"),
            ("Architektur", "Ziel-Infrastruktur definieren. Was brauchen Sie jetzt, was in Zukunft?"),
            ("Aufbau", "Infrastruktur einrichten, Pipelines bauen, Tools konfigurieren."),
            ("Migration", "Bestehende Systeme migrieren – ohne Ausfälle."),
            ("Übergabe", "Dokumentation, Schulung, Übergabe an Ihr Team oder managed Service.")
        ],
        "deliverables": [
            "Dokumentierte Infrastruktur",
            "CI/CD-Pipelines",
            "Monitoring-Setup",
            "Runbooks für häufige Szenarien",
            "Team-Schulung",
            "Optional: Managed Service"
        ],
        "use_cases": [
            "Modernisierung der Entwicklungs-Infrastruktur",
            "Migration in die Cloud",
            "Skalierung bei wachsenden Anforderungen",
            "Verbesserung der Deployment-Frequenz",
            "Erhöhung der Systemstabilität"
        ],
        "benefits": [
            "Schnellere Time-to-Market",
            "Höhere Systemverfügbarkeit",
            "Automatisierte, sichere Deployments",
            "Skalierbare Infrastruktur",
            "Transparenz durch Monitoring"
        ]
    },

    # ========== 28: MOBILE APPS ==========
    28: {
        "long_description": richtext([
            p("Mobile Apps sind ein großes Investment – technisch und finanziell. Bevor Sie anfangen, sollten Sie sicher sein, dass eine App wirklich die beste Lösung ist. Manchmal reicht eine PWA, manchmal ist eine Website besser."),

            h2("Wann Sie eine App brauchen"),
            p("Native Funktionen: Push-Notifications, Kamera, GPS, Offline-Nutzung – wenn Sie das brauchen, brauchen Sie eine App."),
            p("Regelmäßige Nutzung: Apps sind für Dinge, die Menschen regelmäßig nutzen. Für einmalige Interaktionen reicht meist eine Website."),
            p("Markenpräsenz: Eine App im App Store ist auch ein Touchpoint. Aber nur, wenn sie auch genutzt wird."),

            h2("Unser Tech-Stack"),
            p("Wir entwickeln mit React Native – eine Technologie, die es ermöglicht, mit einer Codebase Apps für iOS und Android zu bauen. Das spart Zeit und Geld, ohne bei der Qualität Kompromisse zu machen."),
            p("Für besonders performance-kritische Anwendungen oder spezielle Hardware-Anforderungen kann native Entwicklung (Swift/Kotlin) sinnvoller sein. Wir beraten ehrlich."),

            h2("Was wir liefern"),
            ul([
                "iOS und Android aus einer Codebase",
                "UI/UX-Design speziell für Mobile",
                "Backend-Integration (oder Backend-Entwicklung)",
                "App Store Submission",
                "Push-Notification-System",
                "Analytics-Integration"
            ])
        ]),
        "process": [
            ("Discovery", "Brauchen Sie wirklich eine App? Was soll sie können? Wer nutzt sie?"),
            ("Konzeption", "Features definieren, Screens planen, technische Architektur."),
            ("Design", "Mobile-UI/UX-Design in Figma, Prototyp für Feedback."),
            ("Entwicklung", "Agile Entwicklung in Sprints mit regelmäßigen Demos."),
            ("Testing & Launch", "QA, Beta-Testing, App Store Submission, Launch.")
        ],
        "deliverables": [
            "Native App für iOS und Android",
            "UI/UX-Design",
            "Backend (falls benötigt)",
            "App Store Submission",
            "Admin-Panel zur Inhaltspflege",
            "Dokumentation und Übergabe"
        ],
        "use_cases": [
            "B2C-Apps mit regelmäßiger Nutzung",
            "Interne Unternehmens-Apps",
            "E-Commerce mit App-Erweiterung",
            "Service-Apps für Kunden",
            "Community- und Social-Apps"
        ],
        "benefits": [
            "Präsenz in App Stores",
            "Push-Notifications für Engagement",
            "Native Performance",
            "Offline-Fähigkeit",
            "Tiefere User-Bindung"
        ]
    },

    # ========== 29: WEB APPLICATIONS ==========
    29: {
        "long_description": richtext([
            p("Web-Applikationen sind Software, die im Browser läuft. Dashboards, Kundenportale, interne Tools, komplexe Workflows – alles, was über eine statische Website hinausgeht und echte Funktionalität bietet."),

            h2("Web-Apps vs. Websites"),
            p("Eine Website zeigt Informationen. Eine Web-App tut etwas. Nutzer loggen sich ein, interagieren, erstellen Dinge, verwalten Daten. Die Grenzen sind fließend, aber die Komplexität ist eine andere."),
            p("Web-Apps brauchen Backend-Logik, Datenbanken, Authentifizierung, oft Echtzeit-Funktionen. Sie müssen sicher sein, performen, skalieren. Das erfordert andere Architektur und andere Expertise."),

            h2("Was wir entwickeln"),
            p("Kundenportale: Bereiche, in denen Ihre Kunden Daten einsehen, Aktionen durchführen, mit Ihnen interagieren."),
            p("Interne Tools: Software für Ihr Team – Prozesse digitalisieren, Daten verwalten, Workflows abbilden."),
            p("SaaS-Produkte: Wenn Ihre Geschäftsidee eine Software ist, entwickeln wir den MVP oder das Full Product."),
            p("Dashboards: Daten aus verschiedenen Quellen visualisieren, Entscheidungen unterstützen."),

            h2("Unser Tech-Stack"),
            ul([
                "Frontend: React, Next.js, TypeScript",
                "Backend: Node.js, Python, oder nach Anforderung",
                "Datenbanken: PostgreSQL, MongoDB, je nach Use Case",
                "Cloud: AWS, Google Cloud, Vercel",
                "Real-Time: WebSockets, Server-Sent Events",
                "Authentifizierung: Auth0, Firebase Auth, Custom"
            ])
        ]),
        "process": [
            ("Discovery", "Was soll die App können? Wer nutzt sie? Welche Integrationen?"),
            ("Konzeption", "Features priorisieren, Architektur definieren, Tech-Stack wählen."),
            ("Design", "UI/UX für die Anwendung – funktional und benutzerfreundlich."),
            ("Entwicklung", "Agile Entwicklung mit regelmäßigen Releases und Feedback-Schleifen."),
            ("Launch & Iteration", "Go-Live, Monitoring, kontinuierliche Verbesserung.")
        ],
        "deliverables": [
            "Funktionierende Web-Applikation",
            "Frontend und Backend",
            "Datenbank und Infrastruktur",
            "Admin-Bereich zur Verwaltung",
            "API-Dokumentation",
            "Deployment-Pipeline"
        ],
        "use_cases": [
            "Kundenportale und Self-Service",
            "Interne Business-Tools",
            "SaaS-Produkte und MVPs",
            "Daten-Dashboards",
            "Komplexe Buchungs- oder Verwaltungssysteme"
        ],
        "benefits": [
            "Maßgeschneiderte Lösung für Ihr Problem",
            "Prozesse digitalisiert und optimiert",
            "Skalierbar für wachsende Anforderungen",
            "Moderne, wartbare Architektur",
            "Eigenes Produkt statt SaaS-Abhängigkeit"
        ]
    },

    # ========== 30: DESKTOP SOFTWARE ==========
    30: {
        "long_description": richtext([
            p("Desktop-Software ist nicht tot – für manche Anwendungsfälle ist sie die beste Lösung. Intensive Datenverarbeitung, Offline-Nutzung, Hardware-Integration – manchmal muss Software lokal laufen."),

            h2("Wann Desktop-Software sinnvoll ist"),
            p("Performance: Für rechenintensive Aufgaben wie Videobearbeitung, 3D-Rendering oder große Datenmengen ist lokale Verarbeitung oft schneller."),
            p("Offline: Wenn Ihre Software auch ohne Internet funktionieren muss."),
            p("Hardware: Wenn Sie mit lokaler Hardware interagieren müssen – Drucker, Scanner, spezielle Geräte."),
            p("Sicherheit: Wenn sensible Daten das lokale Netzwerk nicht verlassen sollen."),

            h2("Unsere Technologien"),
            p("Electron: Web-Technologien für Desktop-Apps. Schnelle Entwicklung, Cross-Platform, aber höherer Ressourcenverbrauch."),
            p("Tauri: Moderne Alternative zu Electron. Kleiner, schneller, sicherer – verwendet native Webviews."),
            p("Native: Swift für macOS, C#/.NET für Windows, wenn Performance oder Plattform-Integration kritisch ist."),

            h2("Was wir entwickeln"),
            ul([
                "Business-Tools und Verwaltungssoftware",
                "Produktivitäts-Anwendungen",
                "Datenverarbeitungs-Tools",
                "Hardware-Steuerungssoftware",
                "Desktop-Companions für Web-Apps",
                "Spezialisierte Branchenlösungen"
            ])
        ]),
        "process": [
            ("Anforderungsanalyse", "Warum Desktop? Welche Plattformen? Welche Anforderungen?"),
            ("Tech-Entscheidung", "Electron, Tauri oder nativ? Wir empfehlen basierend auf Ihren Anforderungen."),
            ("Design", "Desktop-UI/UX – andere Patterns als Web oder Mobile."),
            ("Entwicklung", "Iterative Entwicklung mit regelmäßigen Builds zum Testen."),
            ("Distribution", "Installer, Auto-Updates, ggf. Code-Signing und Notarisierung.")
        ],
        "deliverables": [
            "Desktop-Anwendung für gewünschte Plattformen",
            "Installer-Pakete",
            "Auto-Update-System",
            "Dokumentation",
            "Quellcode und Build-Pipeline",
            "Support für erste Updates"
        ],
        "use_cases": [
            "Offline-fähige Business-Tools",
            "Datenintensive Anwendungen",
            "Hardware-Steuerung",
            "Spezialisierte Branchensoftware",
            "Desktop-Clients für bestehende Systeme"
        ],
        "benefits": [
            "Volle Performance lokaler Hardware",
            "Offline-Fähigkeit",
            "Hardware-Integration möglich",
            "Daten bleiben lokal",
            "Unabhängigkeit von Browser-Limitationen"
        ]
    },

    # ========== 31: UI/UX FÜR SOFTWARE ==========
    31: {
        "long_description": richtext([
            p("Business-Software ist oft funktional, aber furchtbar zu benutzen. Komplexe Interfaces, unlogische Workflows, steile Lernkurven. Das kostet Zeit, Nerven und letztlich Geld. Es muss nicht so sein."),

            h2("Warum Software-UX anders ist"),
            p("Consumer-Apps haben einen Job: Nutzer bei Laune halten. Business-Software hat einen anderen: Aufgaben effizient erledigen. Das verändert alles – vom Information Design bis zur Interaktion."),
            p("Nutzer von Business-Software verbringen Stunden am Tag damit. Jede Sekunde, die ein Workflow kostet, multipliziert sich. Jeder Klick zu viel summiert sich zu verlorener Produktivität."),

            h2("Unser UX-Ansatz für Software"),
            p("Verstehen: Wir beobachten echte Nutzer bei echten Aufgaben. Wo kämpfen sie? Was ist umständlich? Was fehlt?"),
            p("Vereinfachen: Komplexität reduzieren, ohne Funktionalität zu opfern. Progressive Disclosure, smarte Defaults, kontextuelle Hilfe."),
            p("Systematisieren: Design-Systeme für konsistente, effiziente Interfaces. Einmal lernen, überall anwenden."),

            h2("Was wir liefern"),
            ul([
                "UX-Audit bestehender Software",
                "User Research und Workflow-Analyse",
                "Redesign von Interfaces und Workflows",
                "Design-System für konsistente UI",
                "Prototypen für User-Testing",
                "Specs für Entwickler-Übergabe"
            ])
        ]),
        "process": [
            ("Discovery", "Nutzer verstehen, Workflows analysieren, Pain Points identifizieren."),
            ("Konzeption", "Information Architecture, User Flows, Wireframes."),
            ("Design", "Visual Design mit Design-System-Ansatz."),
            ("Prototyping", "Interaktive Prototypen für Testing und Feedback."),
            ("Handoff", "Design-Specs und Assets für die Entwicklung.")
        ],
        "deliverables": [
            "UX-Audit-Report (bei Redesigns)",
            "Wireframes und User Flows",
            "UI-Design in Figma",
            "Design-System mit Komponenten",
            "Interaktiver Prototyp",
            "Developer Handoff mit Specs"
        ],
        "use_cases": [
            "Redesign bestehender Business-Software",
            "Neue Software-Produkte",
            "Enterprise-Anwendungen",
            "SaaS-Produkte",
            "Interne Tools und Dashboards"
        ],
        "benefits": [
            "Höhere Produktivität der Nutzer",
            "Kürzere Einarbeitungszeit",
            "Weniger Support-Aufwand",
            "Höhere Nutzerakzeptanz",
            "Wettbewerbsvorteil durch bessere UX"
        ]
    },

    # ========== 32: QA & TESTING ==========
    32: {
        "long_description": richtext([
            p("QA ist mehr als einmal durchklicken. Systematisches Testing findet Probleme, bevor Ihre Nutzer sie finden. Das spart Geld, schützt Ihre Reputation und gibt Ihnen Vertrauen in Ihre Releases."),

            h2("Warum professionelles Testing wichtig ist"),
            p("Entwickler sind nicht die besten Tester ihrer eigenen Software. Sie wissen, wie es funktionieren soll, und testen unbewusst so. Ein frischer Blick findet die Probleme, die im Alltag auftreten."),
            p("Je später ein Bug gefunden wird, desto teurer ist die Behebung. In der Entwicklung: günstig. Im Testing: okay. In Produktion: teuer. Beim Kunden: sehr teuer."),

            h2("Unsere Testing-Leistungen"),
            p("Manuelles Testing: Exploratives Testing durch erfahrene QA-Spezialisten. Findet Probleme, die automatisierte Tests übersehen."),
            p("Automatisiertes Testing: Unit Tests, Integration Tests, E2E-Tests. Für kontinuierliche Qualitätssicherung."),
            p("Performance Testing: Wie verhält sich Ihre Anwendung unter Last? Wo sind die Bottlenecks?"),
            p("Security Testing: Grundlegende Sicherheitsprüfung. Für tiefgehende Audits empfehlen wir Spezialisten."),

            h2("Was Sie bekommen"),
            ul([
                "Testplan basierend auf Ihren Anforderungen",
                "Systematische Test-Durchführung",
                "Dokumentierte Bug-Reports mit Priorität",
                "Regression-Testing nach Fixes",
                "Test-Automatisierung (optional)",
                "Empfehlungen für Testing-Prozesse"
            ])
        ]),
        "process": [
            ("Test-Planung", "Was wird getestet? Welche Szenarien? Welche Prioritäten?"),
            ("Test-Case-Erstellung", "Systematische Test-Cases dokumentieren."),
            ("Test-Durchführung", "Manuelle und/oder automatisierte Tests durchführen."),
            ("Reporting", "Bugs dokumentieren, priorisieren, an Entwicklung übergeben."),
            ("Regression", "Nach Fixes erneut testen, Qualität verifizieren.")
        ],
        "deliverables": [
            "Testplan-Dokument",
            "Test-Cases-Katalog",
            "Bug-Reports mit Priorität",
            "Test-Execution-Report",
            "Empfehlungen für Verbesserungen",
            "Optional: Automatisierte Tests"
        ],
        "use_cases": [
            "Vor wichtigen Releases",
            "Neue Features absichern",
            "Nach größeren Änderungen",
            "Kontinuierliche Qualitätssicherung",
            "Abnahme-Testing für Projekte"
        ],
        "benefits": [
            "Weniger Bugs in Produktion",
            "Höhere Software-Qualität",
            "Zufriedenere Nutzer",
            "Geringere Support-Kosten",
            "Vertrauen in Releases"
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
print("\nBatch 3 complete: Tech & Software (IDs 23-32)")
