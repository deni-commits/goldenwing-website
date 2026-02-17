#!/usr/bin/env python3
import sqlite3
import os

db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'goldenwing.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

sub_services_data = [
    # BRANDING (parent_service_id = 1)
    {
        "slug": "markenstrategie",
        "subtitle": "Das Fundament Ihrer Marke",
        "description": "Bevor das erste Pixel gesetzt wird, braucht es Klarheit. Wer sind Sie? Wofür stehen Sie? Warum sollte jemand Sie wählen? Wir erarbeiten gemeinsam Ihre Positionierung, definieren Ihre Zielgruppe und entwickeln eine Strategie, die alle weiteren Entscheidungen leitet.",
        "long_description": "Eine Markenstrategie ist kein Marketing-Dokument für die Schublade. Sie ist der Kompass für alle Ihre Entscheidungen – von der Produktentwicklung über die Kommunikation bis zur Preisgestaltung. In Workshops erarbeiten wir Ihre Brand Values, formulieren Ihr Versprechen an Ihre Kunden und schaffen ein Framework, das Ihr Team jeden Tag nutzen kann. Das Ergebnis: Klarheit über das, was Sie einzigartig macht, und ein Plan, wie Sie das kommunizieren."
    },
    {
        "slug": "naming",
        "subtitle": "Der Name, der bleibt",
        "description": "Ein guter Name ist kurz, merkbar und transportiert, wofür Sie stehen. Wir entwickeln Namen, die funktionieren – kreativ, aber strategisch. Inklusive Verfügbarkeitsprüfung für Domains und Markenrecht.",
        "long_description": "Namen sind schwieriger als sie aussehen. Sie müssen einzigartig sein, aber nicht zu kompliziert. Sie müssen passen, aber nicht langweilen. Unser Prozess kombiniert kreatives Brainstorming mit systematischer Prüfung. Wir generieren hunderte Optionen, filtern nach Kriterien wie Aussprechbarkeit, internationale Tauglichkeit und Markenverfügbarkeit, und präsentieren Ihnen eine Shortlist mit unseren besten Empfehlungen. Jeder Name kommt mit einer Begründung, warum er funktioniert."
    },
    {
        "slug": "logo-design",
        "subtitle": "Mehr als ein hübsches Zeichen",
        "description": "Ein Logo muss auf einen Blick funktionieren – auf der Visitenkarte und auf dem Gebäude. Wir gestalten Logos, die zeitlos sind, Persönlichkeit zeigen und in jeder Anwendung überzeugen.",
        "long_description": "Logo-Design beginnt nicht mit Skizzen, sondern mit Fragen. Was soll Ihr Logo kommunizieren? Wer sieht es, in welchem Kontext? Erst mit diesen Antworten starten wir den kreativen Prozess. Sie erhalten mehrere Konzepte mit unterschiedlichen Ansätzen. Das finale Logo liefern wir in allen Formaten, die Sie brauchen – für Print, Web, Social Media, hell und dunkel. Plus Anleitungen, wie es richtig eingesetzt wird."
    },
    {
        "slug": "corporate-identity",
        "subtitle": "Konsistenz auf allen Kanälen",
        "description": "Vom Briefpapier bis zur PowerPoint: Jeder Touchpoint sollte Ihre Marke repräsentieren. Wir entwickeln Ihr komplettes visuelles Erscheinungsbild – einheitlich, professionell und sofort erkennbar.",
        "long_description": "Corporate Identity ist die visuelle Übersetzung Ihrer Markenstrategie in alles, was man anfassen oder sehen kann. Wir gestalten Visitenkarten, Briefköpfe, Präsentationsvorlagen, Social-Media-Templates und alles andere, was Sie im Alltag brauchen. Alles folgt einem System, das in Ihren Brand Guidelines dokumentiert ist. So kann jeder in Ihrem Team – und jede externe Agentur – Ihre Marke konsistent darstellen."
    },
    {
        "slug": "brand-guidelines",
        "subtitle": "Das Regelwerk Ihrer Marke",
        "description": "Brand Guidelines dokumentieren, wie Ihre Marke aussehen und klingen soll. Logo-Verwendung, Farben, Schriften, Tonalität – alles an einem Ort, für jeden zugänglich.",
        "long_description": "Ein Brand Book ist mehr als eine PDF-Sammlung von Logos. Es ist das Nachschlagewerk für alle, die Ihre Marke kommunizieren. Wir dokumentieren nicht nur die visuellen Elemente, sondern auch den Ton Ihrer Kommunikation, Dos and Don'ts, und geben Beispiele für richtige und falsche Anwendung. Digital, durchsuchbar, und aktualisierbar, wenn Ihre Marke wächst."
    },

    # WEBDESIGN (parent_service_id = 2)
    {
        "slug": "ux-ui-design",
        "subtitle": "Design, das funktioniert",
        "description": "Schön allein reicht nicht. Gutes Design führt Nutzer intuitiv zum Ziel, ohne dass sie nachdenken müssen. Wir gestalten Interfaces, die gut aussehen UND gut funktionieren.",
        "long_description": "UX-Design beginnt mit Empathie: Wer nutzt das Produkt? Was wollen sie erreichen? Wo stolpern sie? Mit diesem Verständnis entwickeln wir Wireframes und Prototypen, die wir testen, bevor eine Zeile Code geschrieben wird. Das visuelle Design folgt – aber immer im Dienst der Nutzererfahrung. Das Ergebnis: Interfaces, die nicht nur preisverdächtig aussehen, sondern messbar besser konvertieren."
    },
    {
        "slug": "wordpress-webdesign",
        "subtitle": "Das CMS, das alles kann",
        "description": "WordPress ist nicht ohne Grund das meistgenutzte CMS der Welt. Flexibel, erweiterbar und einfach zu bedienen. Wir entwickeln WordPress-Websites, die schnell laden, sicher sind und die Sie selbst pflegen können.",
        "long_description": "WordPress hat einen schlechten Ruf bei manchen Entwicklern – weil es oft schlecht gemacht wird. Wir machen es richtig: Schlanke Themes ohne Bloat, nur die Plugins, die Sie wirklich brauchen, optimiert für Performance und Sicherheit. Sie bekommen eine Website, die Sie selbst bedienen können, ohne für jeden Textaustausch einen Entwickler rufen zu müssen. Plus Schulung, damit Sie sofort loslegen können."
    },
    {
        "slug": "webshops-woocommerce",
        "subtitle": "Verkaufen, ohne Kompromisse",
        "description": "Ein Online-Shop muss mehr können als Produkte zeigen. Nahtloser Checkout, sichere Zahlung, einfache Verwaltung. Wir bauen WooCommerce-Shops, die konvertieren und die Sie selbst managen können.",
        "long_description": "E-Commerce ist komplex: Produktverwaltung, Lagerhaltung, Zahlungsanbieter, Versand, Steuern, Rechnungen. Wir kümmern uns um die technische Seite, damit Sie sich auf den Verkauf konzentrieren können. Unsere WooCommerce-Shops sind für Conversion optimiert, mit allen rechtlichen Anforderungen für Österreich und die EU. Von der Produktpräsentation bis zum Checkout – jeder Schritt ist auf minimale Reibung ausgelegt."
    },
    {
        "slug": "landingpages",
        "subtitle": "Eine Seite, ein Ziel",
        "description": "Landingpages haben eine Aufgabe: Besucher zur Handlung bewegen. Ob Anmeldung, Anfrage oder Kauf – wir gestalten Seiten, die fokussiert sind und konvertieren.",
        "long_description": "Eine Landingpage ist kein Miniatur-Website. Sie hat keine Navigation, keine Ablenkung, nur ein Ziel. Wir strukturieren den Inhalt nach bewährten Prinzipien: Problem ansprechen, Lösung präsentieren, Vertrauen aufbauen, zur Handlung auffordern. A/B-Testing zeigt, was funktioniert. Das Ergebnis: Conversion-Rates, die sich sehen lassen können."
    },
    {
        "slug": "elementor-entwicklung",
        "subtitle": "WordPress mit visuellem Editor",
        "description": "Elementor macht WordPress zum Drag-and-Drop-Baukasten. Wir entwickeln damit Websites, die Sie selbst anpassen können – ohne Code zu berühren.",
        "long_description": "Elementor ist mächtig, aber auch gefährlich: Falsch eingesetzt führt es zu langsamen, aufgeblähten Websites. Wir nutzen Elementor strategisch – für die Bereiche, die Sie selbst bearbeiten wollen, mit sauberem Code dahinter. Sie bekommen die Flexibilität eines Baukastens mit der Performance einer professionellen Website. Plus Schulung, damit Sie das volle Potenzial nutzen können."
    },

    # DIGITALE STRATEGIE (parent_service_id = 3)
    {
        "slug": "zielgruppenanalyse",
        "subtitle": "Wissen, wen Sie ansprechen",
        "description": "Marketing ohne Zielgruppenverständnis ist Gießkanne. Wir identifizieren, wer Ihre idealen Kunden sind, was sie bewegt und wo Sie sie erreichen.",
        "long_description": "Personas sind mehr als demografische Steckbriefe. Wir gehen tiefer: Was hält Ihre Zielgruppe nachts wach? Welche Probleme wollen sie wirklich lösen? Wie informieren sie sich? Durch Interviews, Datenanalyse und Marktforschung entwickeln wir ein echtes Verständnis Ihrer Zielgruppe – und nutzen das, um Ihre gesamte Kommunikation darauf auszurichten."
    },
    {
        "slug": "customer-journey-mapping",
        "subtitle": "Jeden Schritt verstehen",
        "description": "Vom ersten Kontakt bis zum Kauf (und darüber hinaus): Wir visualisieren die Reise Ihrer Kunden und identifizieren, wo Sie sie besser begleiten können.",
        "long_description": "Eine Customer Journey Map zeigt nicht nur, was Kunden tun, sondern wie sie sich dabei fühlen. Wo sind sie begeistert? Wo frustriert? Wo verlieren Sie sie? Mit diesem Verständnis können wir gezielt verbessern – ob das die Website ist, der Onboarding-Prozess oder der Kundenservice. Das Ergebnis: Weniger Reibung, mehr Zufriedenheit, höhere Conversion."
    },
    {
        "slug": "positionierungsberatung",
        "subtitle": "Sich abheben, statt mitschwimmen",
        "description": "In jedem Markt gibt es Konkurrenz. Positionierung bedeutet, bewusst zu wählen, womit Sie sich unterscheiden – und das konsequent zu kommunizieren.",
        "long_description": "Positionierung ist Verzicht. Sie können nicht für jeden alles sein. Wir helfen Ihnen, die Nische zu finden, in der Sie gewinnen können, und eine Position einzunehmen, die Ihre Zielgruppe versteht und wertschätzt. Das ist keine einmalige Übung – wir begleiten Sie dabei, Ihre Positionierung in alle Touchpoints zu übersetzen."
    },
    {
        "slug": "funnel-strategien",
        "subtitle": "Vom Besucher zum Kunden",
        "description": "Nicht jeder Besucher ist kaufbereit. Funnels führen Menschen schrittweise von Awareness zu Interesse zu Entscheidung. Wir entwickeln Funnel-Strategien, die zu Ihrem Business passen.",
        "long_description": "Funnels sind kein Manipulation-Tool – sie sind strukturierte Kundenreisen. Wir definieren, welche Inhalte Menschen in welcher Phase brauchen, wie Sie Leads qualifizieren und wann der richtige Moment für den Verkauf ist. Das kann ein einfacher E-Mail-Funnel sein oder ein komplexes Multi-Touch-System. Was zählt: Es muss zu Ihrem Geschäftsmodell passen."
    },

    # SEO & SICHTBARKEIT (parent_service_id = 4)
    {
        "slug": "seo-audit",
        "subtitle": "Wissen, wo Sie stehen",
        "description": "Bevor wir optimieren, analysieren wir. Ein SEO-Audit zeigt Ihre Stärken, Schwächen und die größten Hebel für mehr Sichtbarkeit.",
        "long_description": "Ein SEO-Audit ist keine automatische Checkliste. Wir analysieren Ihre Website technisch, inhaltlich und im Wettbewerbskontext. Was funktioniert? Was nicht? Wo liegen die größten Chancen? Sie erhalten einen detaillierten Bericht mit priorisierten Empfehlungen – nicht hundert kleine Punkte, sondern die fünf bis zehn Dinge, die wirklich einen Unterschied machen."
    },
    {
        "slug": "technisches-seo",
        "subtitle": "Die Basis für Rankings",
        "description": "Ohne technisch saubere Website keine Rankings. Wir optimieren Ladezeit, Crawlbarkeit, Struktur und Core Web Vitals – damit Google Ihre Inhalte findet und liebt.",
        "long_description": "Technisches SEO ist unsexy, aber fundamental. Wenn Google Ihre Seiten nicht crawlen kann, existieren sie nicht. Wenn sie langsam laden, ranken sie schlechter. Wir kümmern uns um Sitemap, Robots.txt, Canonical Tags, Schema Markup, Server-Konfiguration und alles andere, was unter der Haube passiert. Das Ergebnis: Eine technisch einwandfreie Basis für Ihren Content."
    },
    {
        "slug": "keywordstrategie",
        "subtitle": "Die richtigen Suchbegriffe finden",
        "description": "Nicht jedes Keyword lohnt sich. Wir recherchieren, was Ihre Zielgruppe sucht, und entwickeln eine Content-Strategie, die Suchvolumen und Wettbewerb berücksichtigt.",
        "long_description": "Keyword-Recherche ist mehr als ein Tool zu bedienen. Es geht darum zu verstehen, was hinter einer Suchanfrage steckt. Will jemand kaufen? Sich informieren? Vergleichen? Wir identifizieren nicht nur Keywords, sondern clustern sie nach Suchintention und entwickeln einen Plan, welche Inhalte Sie dafür brauchen. Das Ergebnis: Ein Redaktionsplan, der langfristig Traffic bringt."
    },
    {
        "slug": "local-seo",
        "subtitle": "In Ihrer Region gefunden werden",
        "description": "Lokale Suchen haben hohe Kaufabsicht. Wir optimieren Ihr Google Business Profil und Ihre Website, damit Sie bei 'XY in meiner Nähe' ganz oben stehen.",
        "long_description": "Lokales SEO ist ein eigenes Spielfeld. Google Business Profil, lokale Keywords, NAP-Konsistenz, Bewertungen, lokale Backlinks – alles muss zusammenspielen. Wir optimieren jeden dieser Faktoren und helfen Ihnen, einen Prozess aufzubauen, der kontinuierlich Bewertungen generiert. Für lokale Unternehmen ist das oft der wichtigste Marketing-Kanal überhaupt."
    },

    # CONTENT & VISUALS (parent_service_id = 5)
    {
        "slug": "copywriting",
        "subtitle": "Worte, die verkaufen",
        "description": "Gute Texte informieren nicht nur – sie überzeugen. Wir schreiben Website-Texte, Headlines, E-Mails und alles andere, was Ihre Botschaft transportiert.",
        "long_description": "Copywriting ist keine Kunst – es ist Handwerk mit Methode. Wir verstehen, was Ihre Zielgruppe hören will, und formulieren es so, dass sie handeln. Ob emotionale Storytelling oder faktenbasierte Argumentation – der Ton passt zu Ihrer Marke und zur Situation. Jeder Text hat ein Ziel und wird daran gemessen."
    },
    {
        "slug": "content-planung",
        "subtitle": "Der Plan hinter dem Content",
        "description": "Content ohne Strategie ist Zeitverschwendung. Wir entwickeln Redaktionspläne, die Ihre Ziele unterstützen und langfristig Traffic und Leads generieren.",
        "long_description": "Ein guter Content-Plan verbindet SEO-Potenzial mit Ihrer Expertise und den Fragen Ihrer Zielgruppe. Wir definieren Themen, Formate, Frequenz und Zuständigkeiten. Sie bekommen einen Kalender, der realistisch umsetzbar ist und systematisch Ihre Online-Präsenz aufbaut. Kein Chaos mehr, kein 'Was posten wir diese Woche?'"
    },
    {
        "slug": "business-fotografie",
        "subtitle": "Echte Bilder für echte Marken",
        "description": "Stock-Fotos erkennt jeder. Professionelle Fotos Ihres Teams, Ihrer Räume, Ihrer Produkte machen den Unterschied zwischen austauschbar und authentisch.",
        "long_description": "Wir arbeiten mit Fotografen, die verstehen, was Business-Fotos leisten müssen: Authentizität, Professionalität und Konsistenz mit Ihrer Marke. Ob Team-Porträts, Arbeitsszenen oder Produktfotos – alles wird geplant und art directed, damit es zu Ihrer visuellen Identität passt. Sie erhalten bearbeitete Bilder in allen Formaten, die Sie brauchen."
    },
    {
        "slug": "reels-social-video",
        "subtitle": "Video-Content für Social Media",
        "description": "Reels und Stories sind nicht mehr optional. Wir produzieren Video-Content, der in den Feeds stoppt und Engagement generiert – von Konzept bis Schnitt.",
        "long_description": "Social Video ist ein eigenes Format: Kurz, vertikal, sofort packend. Wir entwickeln Konzepte, die zu Ihrer Marke passen und auf den Plattformen funktionieren. Von der Idee über die Produktion bis zum Schnitt und den Captions – Sie bekommen fertige Videos, die Sie nur noch posten müssen. Regelmäßig, damit Ihr Feed lebendig bleibt."
    },
    {
        "slug": "gated-content",
        "subtitle": "Leads mit Mehrwert gewinnen",
        "description": "E-Books, Whitepapers, Checklisten – wir erstellen Content, der so wertvoll ist, dass Menschen ihre E-Mail-Adresse dafür geben.",
        "long_description": "Gated Content ist ein Tauschgeschäft: Wertvolle Information gegen Kontaktdaten. Damit das funktioniert, muss der Content wirklich gut sein – nicht nur ein umformatierter Blogartikel. Wir entwickeln Lead Magnets, die ein echtes Problem lösen oder eine echte Frage beantworten. Design und Inhalt aus einer Hand, ready für Ihre Lead-Generierung."
    },

    # TECHNISCHE LÖSUNGEN (parent_service_id = 6)
    {
        "slug": "automatisierung",
        "subtitle": "Weniger Klicks, mehr Ergebnisse",
        "description": "Manuelle Prozesse kosten Zeit und produzieren Fehler. Wir automatisieren wiederkehrende Aufgaben – von E-Mail-Workflows bis zur Datensynchronisation.",
        "long_description": "Automatisierung ist kein Tech-Projekt – es ist ein Business-Projekt. Wir starten mit der Frage: Was kostet Sie Zeit? Was geht schief? Dann entwickeln wir Lösungen, die diese Probleme beseitigen. Das kann ein einfacher Zapier-Flow sein oder ein komplexes Custom-System. Was zählt: Sie sparen Zeit und können sich auf Wichtigeres konzentrieren."
    },
    {
        "slug": "api-integration",
        "subtitle": "Systeme verbinden",
        "description": "Ihre Tools sollten miteinander sprechen. Wir verbinden CRM, E-Mail-Marketing, Shop, Buchhaltung und alles andere über APIs – für nahtlose Workflows.",
        "long_description": "In den meisten Unternehmen existieren Daten in Silos: CRM hier, Shop dort, Buchhaltung woanders. Das führt zu doppelter Dateneingabe, Fehlern und verpassten Chancen. Wir analysieren Ihre Tool-Landschaft und bauen Brücken – über native Integrationen, wo möglich, oder Custom-Code, wo nötig. Das Ergebnis: Daten fließen automatisch, Sie haben den Überblick."
    },
    {
        "slug": "formular-logiken",
        "subtitle": "Intelligente Formulare",
        "description": "Formulare können mehr als nur Daten sammeln. Conditional Logic, Berechnungen, mehrstufige Prozesse – wir bauen Formulare, die arbeiten.",
        "long_description": "Ein gutes Formular ist wie ein gutes Gespräch: Es fragt nur, was relevant ist, und passt sich den Antworten an. Wir entwickeln Formulare mit bedingter Logik, die den Nutzer durch einen Prozess führen, Leads qualifizieren oder sogar Angebote berechnen. Integration in Ihr CRM inklusive."
    },

    # SOFTWARE-ENTWICKLUNG (parent_service_id = 7)
    {
        "slug": "web-applications",
        "subtitle": "Mehr als eine Website",
        "description": "Wenn Standard-Software nicht reicht, entwickeln wir maßgeschneiderte Web-Applikationen. Von internen Tools bis zu kundenorientierten Plattformen.",
        "long_description": "Web-Applikationen sind Software, die im Browser läuft. Dashboards, Kundenportale, interne Tools, komplexe Workflows – was auch immer Sie brauchen. Wir entwickeln mit modernen Frameworks wie Next.js und React, mit sauberem Code und Fokus auf Nutzererfahrung. Agil, iterativ, mit Ihrem Feedback in jeder Phase."
    },
    {
        "slug": "mobile-apps",
        "subtitle": "Ihre App für iOS und Android",
        "description": "Manchmal muss es eine App sein. Wir entwickeln native und Cross-Platform Apps, die performant laufen und Nutzer begeistern.",
        "long_description": "Mobile Apps sind ein großes Investment – technisch und finanziell. Wir beraten ehrlich, ob eine App wirklich nötig ist oder ob eine PWA reicht. Wenn App, dann entwickeln wir mit React Native für beide Plattformen gleichzeitig. Sie bekommen eine App, die in den Stores besteht und Ihre Nutzer nicht enttäuscht."
    },
    {
        "slug": "desktop-software",
        "subtitle": "Software für Ihren Arbeitsplatz",
        "description": "Für manche Anwendungsfälle braucht es Desktop-Software. Wir entwickeln Anwendungen für Windows und Mac mit modernen Technologien.",
        "long_description": "Desktop-Software ist nicht tot – für manche Anwendungsfälle ist sie die beste Lösung. Intensive Datenverarbeitung, Offline-Nutzung, Hardware-Integration. Wir entwickeln mit Electron und Tauri für Cross-Platform oder nativ, wenn Performance kritisch ist."
    },
    {
        "slug": "cloud-devops",
        "subtitle": "Infrastruktur, die mitwächst",
        "description": "Skalierbare Cloud-Infrastruktur, automatisierte Deployments, Monitoring – wir kümmern uns um alles, was Ihre Software am Laufen hält.",
        "long_description": "DevOps ist die Brücke zwischen Entwicklung und Betrieb. Wir setzen CI/CD-Pipelines auf, konfigurieren Cloud-Infrastruktur bei AWS, Google Cloud oder Azure, und implementieren Monitoring, das Probleme meldet, bevor Nutzer sie bemerken. Das Ergebnis: Schnellere Releases, weniger Downtime, ruhigerer Schlaf."
    },
    {
        "slug": "ui-ux-software",
        "subtitle": "Interfaces für komplexe Software",
        "description": "Software-UX ist eine eigene Disziplin. Wir gestalten Interfaces, die komplexe Funktionen zugänglich machen – ohne Kompromisse bei der Power.",
        "long_description": "Business-Software ist oft funktional, aber furchtbar zu benutzen. Das muss nicht sein. Wir bringen UX-Denken in Ihre Software: Nutzerzentriertes Design, klare Hierarchien, effiziente Workflows. Ihre Mitarbeiter werden es Ihnen danken – und produktiver sein."
    },
    {
        "slug": "qa-testing",
        "subtitle": "Qualität vor dem Launch",
        "description": "Bugs kosten Vertrauen. Wir testen systematisch – funktional, visuell, auf verschiedenen Geräten – damit Ihre Software beim Launch funktioniert.",
        "long_description": "QA ist mehr als einmal durchklicken. Wir entwickeln Testpläne, führen manuelle und automatisierte Tests durch und dokumentieren, was wir finden. Sie bekommen einen Bericht mit priorisierten Issues – kritisch, wichtig, nice-to-fix. Und wir testen erneut, bis es passt."
    }
]

for sub in sub_services_data:
    cursor.execute("""
        UPDATE sub_services SET
            subtitle = ?,
            description = ?,
            long_description = ?
        WHERE slug = ?
    """, (sub["subtitle"], sub["description"], sub["long_description"], sub["slug"]))
    print(f"Updated: {sub['slug']}")

conn.commit()
conn.close()

print("\n32 sub-services updated!")
