#!/usr/bin/env python3
import sqlite3
import json
import os

db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'goldenwing.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

def create_richtext(text):
    """Convert plain text to Lexical JSON format"""
    return json.dumps({
        "root": {
            "type": "root",
            "children": [
                {
                    "type": "paragraph",
                    "children": [
                        {"type": "text", "text": text, "version": 1}
                    ],
                    "version": 1
                }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "version": 1
        }
    })

sub_services_data = [
    # BRANDING
    {
        "slug": "markenstrategie",
        "long_description": "Eine Markenstrategie ist kein Marketing-Dokument für die Schublade. Sie ist der Kompass für alle Ihre Entscheidungen – von der Produktentwicklung über die Kommunikation bis zur Preisgestaltung. In Workshops erarbeiten wir Ihre Brand Values, formulieren Ihr Versprechen an Ihre Kunden und schaffen ein Framework, das Ihr Team jeden Tag nutzen kann. Das Ergebnis: Klarheit über das, was Sie einzigartig macht, und ein Plan, wie Sie das kommunizieren."
    },
    {
        "slug": "naming",
        "long_description": "Namen sind schwieriger als sie aussehen. Sie müssen einzigartig sein, aber nicht zu kompliziert. Sie müssen passen, aber nicht langweilen. Unser Prozess kombiniert kreatives Brainstorming mit systematischer Prüfung. Wir generieren hunderte Optionen, filtern nach Kriterien wie Aussprechbarkeit, internationale Tauglichkeit und Markenverfügbarkeit, und präsentieren Ihnen eine Shortlist mit unseren besten Empfehlungen."
    },
    {
        "slug": "logo-design",
        "long_description": "Logo-Design beginnt nicht mit Skizzen, sondern mit Fragen. Was soll Ihr Logo kommunizieren? Wer sieht es, in welchem Kontext? Erst mit diesen Antworten starten wir den kreativen Prozess. Sie erhalten mehrere Konzepte mit unterschiedlichen Ansätzen. Das finale Logo liefern wir in allen Formaten, die Sie brauchen – für Print, Web, Social Media, hell und dunkel."
    },
    {
        "slug": "corporate-identity",
        "long_description": "Corporate Identity ist die visuelle Übersetzung Ihrer Markenstrategie in alles, was man anfassen oder sehen kann. Wir gestalten Visitenkarten, Briefköpfe, Präsentationsvorlagen, Social-Media-Templates und alles andere, was Sie im Alltag brauchen. Alles folgt einem System, das in Ihren Brand Guidelines dokumentiert ist."
    },
    {
        "slug": "brand-guidelines",
        "long_description": "Ein Brand Book ist mehr als eine PDF-Sammlung von Logos. Es ist das Nachschlagewerk für alle, die Ihre Marke kommunizieren. Wir dokumentieren nicht nur die visuellen Elemente, sondern auch den Ton Ihrer Kommunikation, Dos and Don'ts, und geben Beispiele für richtige und falsche Anwendung."
    },
    # WEBDESIGN
    {
        "slug": "ux-ui-design",
        "long_description": "UX-Design beginnt mit Empathie: Wer nutzt das Produkt? Was wollen sie erreichen? Wo stolpern sie? Mit diesem Verständnis entwickeln wir Wireframes und Prototypen, die wir testen, bevor eine Zeile Code geschrieben wird. Das visuelle Design folgt – aber immer im Dienst der Nutzererfahrung."
    },
    {
        "slug": "wordpress-webdesign",
        "long_description": "WordPress hat einen schlechten Ruf bei manchen Entwicklern – weil es oft schlecht gemacht wird. Wir machen es richtig: Schlanke Themes ohne Bloat, nur die Plugins, die Sie wirklich brauchen, optimiert für Performance und Sicherheit. Sie bekommen eine Website, die Sie selbst bedienen können."
    },
    {
        "slug": "webshops-woocommerce",
        "long_description": "E-Commerce ist komplex: Produktverwaltung, Lagerhaltung, Zahlungsanbieter, Versand, Steuern, Rechnungen. Wir kümmern uns um die technische Seite, damit Sie sich auf den Verkauf konzentrieren können. Unsere WooCommerce-Shops sind für Conversion optimiert, mit allen rechtlichen Anforderungen für Österreich und die EU."
    },
    {
        "slug": "landingpages",
        "long_description": "Eine Landingpage ist kein Miniatur-Website. Sie hat keine Navigation, keine Ablenkung, nur ein Ziel. Wir strukturieren den Inhalt nach bewährten Prinzipien: Problem ansprechen, Lösung präsentieren, Vertrauen aufbauen, zur Handlung auffordern. A/B-Testing zeigt, was funktioniert."
    },
    {
        "slug": "elementor-entwicklung",
        "long_description": "Elementor ist mächtig, aber auch gefährlich: Falsch eingesetzt führt es zu langsamen, aufgeblähten Websites. Wir nutzen Elementor strategisch – für die Bereiche, die Sie selbst bearbeiten wollen, mit sauberem Code dahinter. Sie bekommen die Flexibilität eines Baukastens mit der Performance einer professionellen Website."
    },
    # DIGITALE STRATEGIE
    {
        "slug": "zielgruppenanalyse",
        "long_description": "Personas sind mehr als demografische Steckbriefe. Wir gehen tiefer: Was hält Ihre Zielgruppe nachts wach? Welche Probleme wollen sie wirklich lösen? Wie informieren sie sich? Durch Interviews, Datenanalyse und Marktforschung entwickeln wir ein echtes Verständnis Ihrer Zielgruppe."
    },
    {
        "slug": "customer-journey-mapping",
        "long_description": "Eine Customer Journey Map zeigt nicht nur, was Kunden tun, sondern wie sie sich dabei fühlen. Wo sind sie begeistert? Wo frustriert? Wo verlieren Sie sie? Mit diesem Verständnis können wir gezielt verbessern – ob das die Website ist, der Onboarding-Prozess oder der Kundenservice."
    },
    {
        "slug": "positionierungsberatung",
        "long_description": "Positionierung ist Verzicht. Sie können nicht für jeden alles sein. Wir helfen Ihnen, die Nische zu finden, in der Sie gewinnen können, und eine Position einzunehmen, die Ihre Zielgruppe versteht und wertschätzt. Das ist keine einmalige Übung – wir begleiten Sie dabei, Ihre Positionierung in alle Touchpoints zu übersetzen."
    },
    {
        "slug": "funnel-strategien",
        "long_description": "Funnels sind kein Manipulation-Tool – sie sind strukturierte Kundenreisen. Wir definieren, welche Inhalte Menschen in welcher Phase brauchen, wie Sie Leads qualifizieren und wann der richtige Moment für den Verkauf ist. Das kann ein einfacher E-Mail-Funnel sein oder ein komplexes Multi-Touch-System."
    },
    # SEO
    {
        "slug": "seo-audit",
        "long_description": "Ein SEO-Audit ist keine automatische Checkliste. Wir analysieren Ihre Website technisch, inhaltlich und im Wettbewerbskontext. Was funktioniert? Was nicht? Wo liegen die größten Chancen? Sie erhalten einen detaillierten Bericht mit priorisierten Empfehlungen."
    },
    {
        "slug": "technisches-seo",
        "long_description": "Technisches SEO ist unsexy, aber fundamental. Wenn Google Ihre Seiten nicht crawlen kann, existieren sie nicht. Wenn sie langsam laden, ranken sie schlechter. Wir kümmern uns um Sitemap, Robots.txt, Canonical Tags, Schema Markup, Server-Konfiguration und alles andere, was unter der Haube passiert."
    },
    {
        "slug": "keywordstrategie",
        "long_description": "Keyword-Recherche ist mehr als ein Tool zu bedienen. Es geht darum zu verstehen, was hinter einer Suchanfrage steckt. Will jemand kaufen? Sich informieren? Vergleichen? Wir identifizieren nicht nur Keywords, sondern clustern sie nach Suchintention und entwickeln einen Plan, welche Inhalte Sie dafür brauchen."
    },
    {
        "slug": "local-seo",
        "long_description": "Lokales SEO ist ein eigenes Spielfeld. Google Business Profil, lokale Keywords, NAP-Konsistenz, Bewertungen, lokale Backlinks – alles muss zusammenspielen. Wir optimieren jeden dieser Faktoren und helfen Ihnen, einen Prozess aufzubauen, der kontinuierlich Bewertungen generiert."
    },
    # CONTENT
    {
        "slug": "copywriting",
        "long_description": "Copywriting ist keine Kunst – es ist Handwerk mit Methode. Wir verstehen, was Ihre Zielgruppe hören will, und formulieren es so, dass sie handeln. Ob emotionale Storytelling oder faktenbasierte Argumentation – der Ton passt zu Ihrer Marke und zur Situation."
    },
    {
        "slug": "content-planung",
        "long_description": "Ein guter Content-Plan verbindet SEO-Potenzial mit Ihrer Expertise und den Fragen Ihrer Zielgruppe. Wir definieren Themen, Formate, Frequenz und Zuständigkeiten. Sie bekommen einen Kalender, der realistisch umsetzbar ist und systematisch Ihre Online-Präsenz aufbaut."
    },
    {
        "slug": "business-fotografie",
        "long_description": "Wir arbeiten mit Fotografen, die verstehen, was Business-Fotos leisten müssen: Authentizität, Professionalität und Konsistenz mit Ihrer Marke. Ob Team-Porträts, Arbeitsszenen oder Produktfotos – alles wird geplant und art directed, damit es zu Ihrer visuellen Identität passt."
    },
    {
        "slug": "reels-social-video",
        "long_description": "Social Video ist ein eigenes Format: Kurz, vertikal, sofort packend. Wir entwickeln Konzepte, die zu Ihrer Marke passen und auf den Plattformen funktionieren. Von der Idee über die Produktion bis zum Schnitt und den Captions – Sie bekommen fertige Videos, die Sie nur noch posten müssen."
    },
    {
        "slug": "gated-content",
        "long_description": "Gated Content ist ein Tauschgeschäft: Wertvolle Information gegen Kontaktdaten. Damit das funktioniert, muss der Content wirklich gut sein – nicht nur ein umformatierter Blogartikel. Wir entwickeln Lead Magnets, die ein echtes Problem lösen oder eine echte Frage beantworten."
    },
    # TECH
    {
        "slug": "automatisierung",
        "long_description": "Automatisierung ist kein Tech-Projekt – es ist ein Business-Projekt. Wir starten mit der Frage: Was kostet Sie Zeit? Was geht schief? Dann entwickeln wir Lösungen, die diese Probleme beseitigen. Das kann ein einfacher Zapier-Flow sein oder ein komplexes Custom-System."
    },
    {
        "slug": "api-integration",
        "long_description": "In den meisten Unternehmen existieren Daten in Silos: CRM hier, Shop dort, Buchhaltung woanders. Das führt zu doppelter Dateneingabe, Fehlern und verpassten Chancen. Wir analysieren Ihre Tool-Landschaft und bauen Brücken – über native Integrationen, wo möglich, oder Custom-Code, wo nötig."
    },
    {
        "slug": "formular-logiken",
        "long_description": "Ein gutes Formular ist wie ein gutes Gespräch: Es fragt nur, was relevant ist, und passt sich den Antworten an. Wir entwickeln Formulare mit bedingter Logik, die den Nutzer durch einen Prozess führen, Leads qualifizieren oder sogar Angebote berechnen."
    },
    # SOFTWARE
    {
        "slug": "web-applications",
        "long_description": "Web-Applikationen sind Software, die im Browser läuft. Dashboards, Kundenportale, interne Tools, komplexe Workflows – was auch immer Sie brauchen. Wir entwickeln mit modernen Frameworks wie Next.js und React, mit sauberem Code und Fokus auf Nutzererfahrung."
    },
    {
        "slug": "mobile-apps",
        "long_description": "Mobile Apps sind ein großes Investment – technisch und finanziell. Wir beraten ehrlich, ob eine App wirklich nötig ist oder ob eine PWA reicht. Wenn App, dann entwickeln wir mit React Native für beide Plattformen gleichzeitig."
    },
    {
        "slug": "desktop-software",
        "long_description": "Desktop-Software ist nicht tot – für manche Anwendungsfälle ist sie die beste Lösung. Intensive Datenverarbeitung, Offline-Nutzung, Hardware-Integration. Wir entwickeln mit Electron und Tauri für Cross-Platform oder nativ, wenn Performance kritisch ist."
    },
    {
        "slug": "cloud-devops",
        "long_description": "DevOps ist die Brücke zwischen Entwicklung und Betrieb. Wir setzen CI/CD-Pipelines auf, konfigurieren Cloud-Infrastruktur bei AWS, Google Cloud oder Azure, und implementieren Monitoring, das Probleme meldet, bevor Nutzer sie bemerken."
    },
    {
        "slug": "ui-ux-software",
        "long_description": "Business-Software ist oft funktional, aber furchtbar zu benutzen. Das muss nicht sein. Wir bringen UX-Denken in Ihre Software: Nutzerzentriertes Design, klare Hierarchien, effiziente Workflows. Ihre Mitarbeiter werden es Ihnen danken – und produktiver sein."
    },
    {
        "slug": "qa-testing",
        "long_description": "QA ist mehr als einmal durchklicken. Wir entwickeln Testpläne, führen manuelle und automatisierte Tests durch und dokumentieren, was wir finden. Sie bekommen einen Bericht mit priorisierten Issues – kritisch, wichtig, nice-to-fix."
    }
]

for sub in sub_services_data:
    richtext = create_richtext(sub["long_description"])
    cursor.execute("""
        UPDATE sub_services SET
            long_description = ?
        WHERE slug = ?
    """, (richtext, sub["slug"]))
    print(f"Fixed: {sub['slug']}")

conn.commit()
conn.close()

print("\nAll long_descriptions converted to Lexical JSON format!")
