/**
 * Update Post 6 Content - Customer Journey Mapping
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

const post6ContentDE = {
  root: {
    type: "root",
    children: [
      heading("h2", "Customer Journey Mapping: Verstehen Sie wirklich, wie Ihre Kunden kaufen?"),

      paragraph([
        text("Wissen Sie, welche Berührungspunkte ein Kunde mit Ihrem Unternehmen hat, bevor er kauft? Laut "),
        link("https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-consumer-decision-journey", "McKinsey", true),
        text(" durchläuft der durchschnittliche B2B-Käufer 70% seiner Entscheidungsreise, bevor er erstmals mit dem Vertrieb spricht. Im B2C-Bereich sind es oft 80%.")
      ]),

      paragraph([
        text("Customer Journey Mapping macht diese unsichtbare Reise sichtbar – und zeigt Ihnen, wo Sie Kunden gewinnen oder verlieren. In diesem Guide zeigen wir, wie Sie eine effektive Journey Map erstellen und für Ihr Wachstum nutzen.")
      ]),

      heading("h2", "Was ist Customer Journey Mapping?"),

      paragraph([
        text("Eine Customer Journey Map ist eine visuelle Darstellung aller Berührungspunkte, die ein Kunde mit Ihrem Unternehmen hat – von der ersten Wahrnehmung bis zur Loyalität nach dem Kauf.")
      ]),

      paragraph([
        text("Die Map zeigt nicht nur ", 1),
        text("was", 2),
        text(" Kunden tun, sondern auch ", 1),
        text("was sie denken und fühlen", 2),
        text(" in jedem Moment. Erst wenn Sie verstehen, warum Kunden an bestimmten Punkten abspringen, können Sie gezielt optimieren.")
      ]),

      quote([
        paragraph([
          text("\"Get closer than ever to your customers. So close that you tell them what they need well before they realize it themselves.\" — Steve Jobs", 2)
        ])
      ]),

      heading("h2", "Warum ist Customer Journey Mapping wichtig?"),

      bulletList([
        [text("Kundenperspektive einnehmen:", 1), text(" Sie sehen Ihr Unternehmen durch die Augen der Kunden")],
        [text("Pain Points identifizieren:", 1), text(" Wo hakt es? Wo verlieren Sie Kunden?")],
        [text("Silos aufbrechen:", 1), text(" Marketing, Vertrieb, Service sehen das große Ganze")],
        [text("Ressourcen fokussieren:", 1), text(" Investieren Sie dort, wo es den größten Impact hat")],
        [text("Konsistentes Erlebnis:", 1), text(" Jeder Touchpoint unterstützt die gesamte Journey")]
      ]),

      paragraph([
        text("Unternehmen mit kundenorientierten Ansätzen erzielen laut "),
        link("https://www.forrester.com", "Forrester", true),
        text(" 5-10% höhere Umsätze und 15-25% niedrigere Kosten.")
      ]),

      heading("h2", "Die 5 Phasen der Customer Journey"),

      heading("h3", "1. Awareness (Bewusstsein)"),

      paragraph([
        text("Der Kunde erkennt, dass er ein Problem oder Bedürfnis hat. Er weiß noch nicht, welche Lösungen es gibt.")
      ]),

      paragraph([text("Typische Touchpoints:", 1)]),
      bulletList([
        "Google-Suche (informativ)",
        "Social Media Posts",
        "Blog-Artikel",
        "Empfehlungen von Bekannten",
        "Werbeanzeigen"
      ]),

      paragraph([
        text("Ihre Aufgabe:", 1),
        text(" Sichtbar sein, Problembewusstsein schärfen, als Experte positionieren. SEO und Content Marketing sind hier entscheidend – siehe unseren "),
        link("/blog/seo-fuer-anfaenger-guide", "SEO-Guide"),
        text(".")
      ]),

      heading("h3", "2. Consideration (Erwägung)"),

      paragraph([
        text("Der Kunde kennt mögliche Lösungen und vergleicht Anbieter. Er recherchiert aktiv.")
      ]),

      paragraph([text("Typische Touchpoints:", 1)]),
      bulletList([
        "Produktseiten",
        "Vergleichsartikel",
        "Bewertungen und Testimonials",
        "Case Studies",
        "Preisseiten"
      ]),

      paragraph([
        text("Ihre Aufgabe:", 1),
        text(" Differenzierung zeigen, Vertrauen aufbauen, Mehrwert kommunizieren. Ihre "),
        link("/leistungen/webdesign", "Website"),
        text(" muss hier überzeugen.")
      ]),

      heading("h3", "3. Decision (Entscheidung)"),

      paragraph([
        text("Der Kunde ist kaufbereit und wählt zwischen wenigen Finalisten.")
      ]),

      paragraph([text("Typische Touchpoints:", 1)]),
      bulletList([
        "Angebotsanfrage",
        "Erstgespräch/Demo",
        "Checkout-Prozess",
        "Vertrag/AGB",
        "Zahlungsabwicklung"
      ]),

      paragraph([
        text("Ihre Aufgabe:", 1),
        text(" Reibungsloser Prozess, letzte Einwände beseitigen, Kaufrisiko minimieren. Garantien, Testimonials, einfache Prozesse.")
      ]),

      heading("h3", "4. Retention (Bindung)"),

      paragraph([
        text("Der Kauf ist abgeschlossen. Jetzt geht es darum, Erwartungen zu erfüllen oder zu übertreffen.")
      ]),

      paragraph([text("Typische Touchpoints:", 1)]),
      bulletList([
        "Onboarding-Prozess",
        "Lieferung/Projektstart",
        "Kundenservice",
        "Produkt-/Service-Nutzung",
        "Follow-up-Kommunikation"
      ]),

      paragraph([
        text("Ihre Aufgabe:", 1),
        text(" Wert liefern, Support bieten, regelmäßig kommunizieren. Ein zufriedener Kunde kauft wieder.")
      ]),

      heading("h3", "5. Advocacy (Weiterempfehlung)"),

      paragraph([
        text("Begeisterte Kunden werden zu Markenbotschaftern.")
      ]),

      paragraph([text("Typische Touchpoints:", 1)]),
      bulletList([
        "Bewertungsplattformen",
        "Social Media Shares",
        "Referral-Programme",
        "Fallstudien/Testimonials",
        "Mundpropaganda"
      ]),

      paragraph([
        text("Ihre Aufgabe:", 1),
        text(" Um Bewertungen bitten, Referral-Anreize schaffen, Erfolgsgeschichten dokumentieren.")
      ]),

      heading("h2", "So erstellen Sie eine Customer Journey Map"),

      heading("h3", "Schritt 1: Buyer Personas definieren"),

      paragraph([
        text("Wer sind Ihre typischen Kunden? Erstellen Sie detaillierte Profile mit:")
      ]),

      bulletList([
        "Demografische Daten (Alter, Position, Branche)",
        "Ziele und Motivationen",
        "Herausforderungen und Pain Points",
        "Informationsquellen",
        "Entscheidungskriterien"
      ]),

      paragraph([
        text("Tipp:", 1),
        text(" Führen Sie echte Kundeninterviews. Annahmen sind gefährlich. 5-10 Interviews liefern bereits wertvolle Erkenntnisse.")
      ]),

      heading("h3", "Schritt 2: Touchpoints sammeln"),

      paragraph([
        text("Listen Sie alle Berührungspunkte auf, die ein Kunde mit Ihrem Unternehmen haben kann:")
      ]),

      bulletList([
        "Digitale Touchpoints: Website, Social Media, E-Mails, Ads",
        "Persönliche Touchpoints: Telefon, Meetings, Events",
        "Indirekte Touchpoints: Bewertungen, Empfehlungen, Presse"
      ]),

      heading("h3", "Schritt 3: Kundenemotionen erfassen"),

      paragraph([
        text("Für jeden Touchpoint: Was fühlt der Kunde? Positiv, neutral, negativ? Wo sind die Frustpunkte?")
      ]),

      paragraph([
        text("Methoden:", 1)
      ]),
      bulletList([
        "Kundeninterviews und Umfragen",
        "Analyse von Supportanfragen",
        "Website-Analysen (wo springen Besucher ab?)",
        "Social Listening",
        "Mitarbeiter-Feedback (Vertrieb, Support)"
      ]),

      heading("h3", "Schritt 4: Die Map visualisieren"),

      paragraph([
        text("Bringen Sie alles zusammen in einer visuellen Darstellung:")
      ]),

      bulletList([
        "X-Achse: Die Phasen der Journey",
        "Y-Achse: Touchpoints, Aktionen, Gedanken, Emotionen",
        "Emotionskurve: Wo sind Hochs und Tiefs?"
      ]),

      paragraph([
        text("Tools:", 1),
        text(" Miro, Figma, Lucidchart, oder einfach Whiteboard und Post-its für den Anfang.")
      ]),

      heading("h3", "Schritt 5: Opportunities identifizieren"),

      paragraph([
        text("Analysieren Sie die Map und finden Sie:")
      ]),

      bulletList([
        [text("Pain Points:", 1), text(" Wo sind negative Emotionen? Wie können Sie diese beheben?")],
        [text("Gaps:", 1), text(" Welche Touchpoints fehlen? Wo können Sie präsenter sein?")],
        [text("Moments of Truth:", 1), text(" Welche Momente sind entscheidend für Kauf oder Absprung?")],
        [text("Quick Wins:", 1), text(" Was können Sie schnell verbessern?")]
      ]),

      heading("h2", "Customer Journey für verschiedene Branchen"),

      heading("h3", "B2B-Dienstleister (z.B. Agentur, Beratung)"),

      paragraph("Typische Journey:"),
      bulletList([
        "Awareness: Google-Suche, LinkedIn, Empfehlungen",
        "Consideration: Website, Case Studies, Blog, Erstgespräch",
        "Decision: Angebot, Referenzen, Vertrag",
        "Retention: Projektarbeit, regelmäßige Updates, QBRs",
        "Advocacy: Testimonials, Referrals, Fallstudien"
      ]),

      paragraph([
        text("Entscheidend:", 1),
        text(" Lange Sales Cycles, mehrere Entscheider, hoher Vertrauensbedarf. Content und Thought Leadership sind essenziell.")
      ]),

      heading("h3", "E-Commerce (Online-Shop)"),

      paragraph("Typische Journey:"),
      bulletList([
        "Awareness: Social Ads, Google Shopping, Influencer",
        "Consideration: Produktseiten, Bewertungen, Preisvergleiche",
        "Decision: Warenkorb, Checkout, Zahlungsoptionen",
        "Retention: Lieferung, Tracking, After-Sales-E-Mails",
        "Advocacy: Bewertungen, User-Generated Content"
      ]),

      paragraph([
        text("Entscheidend:", 1),
        text(" Kurze Zyklen, aber viele potenzielle Abbruchstellen. Optimierung des Checkouts ist kritisch.")
      ]),

      heading("h3", "Lokales Unternehmen (z.B. Handwerker, Arzt, Restaurant)"),

      paragraph("Typische Journey:"),
      bulletList([
        "Awareness: Google Maps, lokale Suche, Empfehlungen",
        "Consideration: Google Business Profile, Website, Bewertungen",
        "Decision: Terminbuchung, Anruf, Vor-Ort-Besuch",
        "Retention: Service-Erlebnis, Follow-up",
        "Advocacy: Google-Bewertungen, Weiterempfehlungen"
      ]),

      paragraph([
        text("Entscheidend:", 1),
        text(" Lokale Sichtbarkeit und Bewertungen sind alles. Siehe unser "),
        link("/leistungen/seo-sichtbarkeit", "Local SEO"),
        text(".")
      ]),

      heading("h2", "Häufige Fehler beim Journey Mapping"),

      bulletList([
        [text("Nur interne Perspektive:", 1), text(" Die Map spiegelt Ihre Prozesse, nicht die Kundenrealität")],
        [text("Zu generisch:", 1), text(" Eine Map für alle Kunden funktioniert nicht – unterschiedliche Personas haben unterschiedliche Journeys")],
        [text("Einmal und vergessen:", 1), text(" Die Journey ändert sich – regelmäßig aktualisieren")],
        [text("Keine Daten:", 1), text(" Bauchgefühl statt echter Kundeninsights")],
        [text("Keine Konsequenzen:", 1), text(" Map erstellen, aber nichts ändern")]
      ]),

      heading("h2", "Von der Map zur Aktion: Die Journey optimieren"),

      paragraph([
        text("Eine Customer Journey Map ist nur so wertvoll wie die Aktionen, die daraus folgen:")
      ]),

      heading("h3", "1. Priorisieren"),

      paragraph([
        text("Nicht alles auf einmal. Fokussieren Sie auf:")
      ]),

      bulletList([
        "Die größten Pain Points",
        "Momente mit höchstem Impact auf Conversion",
        "Quick Wins mit wenig Aufwand"
      ]),

      heading("h3", "2. Cross-funktional arbeiten"),

      paragraph([
        text("Die Journey gehört nicht einer Abteilung. Marketing, Vertrieb, Service, Produkt – alle müssen zusammenarbeiten.")
      ]),

      heading("h3", "3. Messen und iterieren"),

      paragraph([
        text("Definieren Sie KPIs für jeden Abschnitt der Journey:")
      ]),

      bulletList([
        "Awareness: Traffic, Impressionen, Brand Searches",
        "Consideration: Verweildauer, Seiten pro Sitzung, Anfragen",
        "Decision: Conversion Rate, Cart Abandonment",
        "Retention: NPS, Churn Rate, Wiederkaufsrate",
        "Advocacy: Bewertungen, Referrals"
      ]),

      heading("h2", "Customer Journey und Ihre Website"),

      paragraph([
        text("Ihre Website ist der wichtigste digitale Touchpoint. Sie muss die Journey unterstützen:")
      ]),

      bulletList([
        [text("Awareness:", 1), text(" Blog, SEO-optimierte Inhalte, die bei der Problemsuche gefunden werden")],
        [text("Consideration:", 1), text(" Leistungsseiten, Case Studies, Vergleiche, Testimonials")],
        [text("Decision:", 1), text(" Klare CTAs, einfache Kontaktmöglichkeiten, Vertrauenssignale")],
        [text("Retention:", 1), text(" Login-Bereich, Ressourcen, Support-Zugang")],
        [text("Advocacy:", 1), text(" Social Proof, einfache Sharing-Möglichkeiten")]
      ]),

      paragraph([
        text("Unsere "),
        link("/leistungen/webdesign", "Web-Projekte"),
        text(" basieren immer auf einer Analyse der Customer Journey.")
      ]),

      heading("h2", "Häufig gestellte Fragen"),

      heading("h3", "Wie lange dauert es, eine Customer Journey Map zu erstellen?"),
      paragraph("Ein einfaches Mapping für eine Persona dauert 2-4 Wochen mit Kundeninterviews. Ein umfassendes Mapping für mehrere Personas und Produkte kann 2-3 Monate dauern."),

      heading("h3", "Welche Tools eignen sich für Customer Journey Mapping?"),
      paragraph("Für den Einstieg: Whiteboard oder Miro. Für komplexere Maps: Smaply, UXPressia, Lucidchart. Für datengetriebenes Mapping: Google Analytics, Mixpanel, Hotjar."),

      heading("h3", "Wie oft sollte ich die Journey Map aktualisieren?"),
      paragraph("Mindestens jährlich, besser halbjährlich. Bei größeren Änderungen (neues Produkt, neuer Kanal, veränderte Kundenbedürfnisse) sofort."),

      heading("h3", "Wie binde ich mein Team in das Mapping ein?"),
      paragraph("Führen Sie einen Workshop durch mit Vertretern aus Marketing, Vertrieb, Service, Produkt. Jede Abteilung hat andere Einblicke in die Kundenrealität."),

      heading("h3", "Was ist der Unterschied zwischen Customer Journey und User Journey?"),
      paragraph("Customer Journey = gesamte Beziehung zum Unternehmen. User Journey = spezifische Interaktion mit einem Produkt oder digitalen Touchpoint. User Journeys sind Teil der Customer Journey."),

      heading("h3", "Brauche ich für jede Persona eine eigene Journey Map?"),
      paragraph("Idealerweise ja. Unterschiedliche Personas haben unterschiedliche Bedürfnisse, Pain Points und Entscheidungswege. Starten Sie mit Ihrer wichtigsten Persona."),

      heading("h3", "Wie messe ich den ROI von Customer Journey Mapping?"),
      paragraph("Indirekt über KPIs wie Conversion Rate, Customer Lifetime Value, NPS, Churn Rate. Direkt: Welche spezifischen Verbesserungen haben Sie basierend auf der Map umgesetzt?"),

      paragraph([
        text("Möchten Sie Ihre Customer Journey professionell analysieren? "),
        link("/kontakt", "Kontaktieren Sie uns"),
        text(" für ein Strategiegespräch.")
      ])
    ],
    direction: "ltr", format: "", indent: 0, version: 1
  }
};

const post6ContentEN = {
  root: {
    type: "root",
    children: [
      heading("h2", "Customer Journey Mapping: Do You Really Understand How Your Customers Buy?"),

      paragraph([
        text("Do you know which touchpoints a customer has with your company before they buy? According to "),
        link("https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-consumer-decision-journey", "McKinsey", true),
        text(", the average B2B buyer completes 70% of their decision journey before first speaking with sales. In B2C, it's often 80%.")
      ]),

      paragraph([
        text("Customer Journey Mapping makes this invisible journey visible – and shows you where you win or lose customers. In this guide, we show how to create an effective journey map and use it for your growth.")
      ]),

      heading("h2", "What is Customer Journey Mapping?"),

      paragraph([
        text("A Customer Journey Map is a visual representation of all touchpoints a customer has with your company – from first awareness to post-purchase loyalty.")
      ]),

      paragraph([
        text("The map shows not only ", 1),
        text("what", 2),
        text(" customers do, but also ", 1),
        text("what they think and feel", 2),
        text(" at each moment. Only when you understand why customers drop off at certain points can you optimize effectively.")
      ]),

      quote([
        paragraph([
          text("\"Get closer than ever to your customers. So close that you tell them what they need well before they realize it themselves.\" — Steve Jobs", 2)
        ])
      ]),

      heading("h2", "Why is Customer Journey Mapping Important?"),

      bulletList([
        [text("Take customer perspective:", 1), text(" See your company through customers' eyes")],
        [text("Identify pain points:", 1), text(" Where are the issues? Where do you lose customers?")],
        [text("Break down silos:", 1), text(" Marketing, sales, service see the big picture")],
        [text("Focus resources:", 1), text(" Invest where it has the biggest impact")],
        [text("Consistent experience:", 1), text(" Every touchpoint supports the overall journey")]
      ]),

      paragraph([
        text("According to "),
        link("https://www.forrester.com", "Forrester", true),
        text(", companies with customer-centric approaches achieve 5-10% higher revenues and 15-25% lower costs.")
      ]),

      heading("h2", "The 5 Phases of the Customer Journey"),

      heading("h3", "1. Awareness"),

      paragraph([
        text("The customer recognizes they have a problem or need. They don't yet know what solutions exist.")
      ]),

      paragraph([text("Typical touchpoints:", 1)]),
      bulletList([
        "Google search (informational)",
        "Social media posts",
        "Blog articles",
        "Recommendations from acquaintances",
        "Advertisements"
      ]),

      paragraph([
        text("Your task:", 1),
        text(" Be visible, sharpen problem awareness, position as expert. SEO and content marketing are decisive here – see our "),
        link("/blog/seo-for-beginners-guide", "SEO guide"),
        text(".")
      ]),

      heading("h3", "2. Consideration"),

      paragraph([
        text("The customer knows possible solutions and compares providers. They actively research.")
      ]),

      paragraph([text("Typical touchpoints:", 1)]),
      bulletList([
        "Product pages",
        "Comparison articles",
        "Reviews and testimonials",
        "Case studies",
        "Pricing pages"
      ]),

      paragraph([
        text("Your task:", 1),
        text(" Show differentiation, build trust, communicate value. Your "),
        link("/services/web-design", "website"),
        text(" must convince here.")
      ]),

      heading("h3", "3. Decision"),

      paragraph([
        text("The customer is ready to buy and chooses between a few finalists.")
      ]),

      paragraph([text("Typical touchpoints:", 1)]),
      bulletList([
        "Quote request",
        "Initial call/demo",
        "Checkout process",
        "Contract/Terms",
        "Payment processing"
      ]),

      paragraph([
        text("Your task:", 1),
        text(" Frictionless process, remove last objections, minimize purchase risk. Guarantees, testimonials, simple processes.")
      ]),

      heading("h3", "4. Retention"),

      paragraph([
        text("The purchase is complete. Now it's about meeting or exceeding expectations.")
      ]),

      paragraph([text("Typical touchpoints:", 1)]),
      bulletList([
        "Onboarding process",
        "Delivery/project kickoff",
        "Customer service",
        "Product/service usage",
        "Follow-up communication"
      ]),

      paragraph([
        text("Your task:", 1),
        text(" Deliver value, provide support, communicate regularly. A satisfied customer buys again.")
      ]),

      heading("h3", "5. Advocacy"),

      paragraph([
        text("Enthusiastic customers become brand ambassadors.")
      ]),

      paragraph([text("Typical touchpoints:", 1)]),
      bulletList([
        "Review platforms",
        "Social media shares",
        "Referral programs",
        "Case studies/testimonials",
        "Word of mouth"
      ]),

      paragraph([
        text("Your task:", 1),
        text(" Ask for reviews, create referral incentives, document success stories.")
      ]),

      heading("h2", "How to Create a Customer Journey Map"),

      heading("h3", "Step 1: Define Buyer Personas"),

      paragraph([
        text("Who are your typical customers? Create detailed profiles with:")
      ]),

      bulletList([
        "Demographic data (age, position, industry)",
        "Goals and motivations",
        "Challenges and pain points",
        "Information sources",
        "Decision criteria"
      ]),

      paragraph([
        text("Tip:", 1),
        text(" Conduct real customer interviews. Assumptions are dangerous. 5-10 interviews already provide valuable insights.")
      ]),

      heading("h3", "Step 2: Collect Touchpoints"),

      paragraph([
        text("List all touchpoints a customer can have with your company:")
      ]),

      bulletList([
        "Digital touchpoints: Website, social media, emails, ads",
        "Personal touchpoints: Phone, meetings, events",
        "Indirect touchpoints: Reviews, recommendations, press"
      ]),

      heading("h3", "Step 3: Capture Customer Emotions"),

      paragraph([
        text("For each touchpoint: What does the customer feel? Positive, neutral, negative? Where are the frustration points?")
      ]),

      paragraph([
        text("Methods:", 1)
      ]),
      bulletList([
        "Customer interviews and surveys",
        "Analysis of support requests",
        "Website analytics (where do visitors drop off?)",
        "Social listening",
        "Employee feedback (sales, support)"
      ]),

      heading("h3", "Step 4: Visualize the Map"),

      paragraph([
        text("Bring everything together in a visual representation:")
      ]),

      bulletList([
        "X-axis: The journey phases",
        "Y-axis: Touchpoints, actions, thoughts, emotions",
        "Emotion curve: Where are highs and lows?"
      ]),

      paragraph([
        text("Tools:", 1),
        text(" Miro, Figma, Lucidchart, or simply whiteboard and post-its to start.")
      ]),

      heading("h3", "Step 5: Identify Opportunities"),

      paragraph([
        text("Analyze the map and find:")
      ]),

      bulletList([
        [text("Pain points:", 1), text(" Where are negative emotions? How can you fix them?")],
        [text("Gaps:", 1), text(" Which touchpoints are missing? Where can you be more present?")],
        [text("Moments of truth:", 1), text(" Which moments are decisive for purchase or dropout?")],
        [text("Quick wins:", 1), text(" What can you improve quickly?")]
      ]),

      heading("h2", "Customer Journey for Different Industries"),

      heading("h3", "B2B Service Provider (e.g., Agency, Consulting)"),

      paragraph("Typical journey:"),
      bulletList([
        "Awareness: Google search, LinkedIn, referrals",
        "Consideration: Website, case studies, blog, initial call",
        "Decision: Proposal, references, contract",
        "Retention: Project work, regular updates, QBRs",
        "Advocacy: Testimonials, referrals, case studies"
      ]),

      paragraph([
        text("Critical:", 1),
        text(" Long sales cycles, multiple decision-makers, high trust requirement. Content and thought leadership are essential.")
      ]),

      heading("h3", "E-Commerce (Online Shop)"),

      paragraph("Typical journey:"),
      bulletList([
        "Awareness: Social ads, Google Shopping, influencers",
        "Consideration: Product pages, reviews, price comparisons",
        "Decision: Cart, checkout, payment options",
        "Retention: Delivery, tracking, after-sales emails",
        "Advocacy: Reviews, user-generated content"
      ]),

      paragraph([
        text("Critical:", 1),
        text(" Short cycles but many potential dropout points. Checkout optimization is critical.")
      ]),

      heading("h3", "Local Business (e.g., Tradesperson, Doctor, Restaurant)"),

      paragraph("Typical journey:"),
      bulletList([
        "Awareness: Google Maps, local search, recommendations",
        "Consideration: Google Business Profile, website, reviews",
        "Decision: Appointment booking, call, on-site visit",
        "Retention: Service experience, follow-up",
        "Advocacy: Google reviews, word of mouth"
      ]),

      paragraph([
        text("Critical:", 1),
        text(" Local visibility and reviews are everything. See our "),
        link("/services/seo-visibility", "Local SEO"),
        text(".")
      ]),

      heading("h2", "Common Mistakes in Journey Mapping"),

      bulletList([
        [text("Only internal perspective:", 1), text(" The map reflects your processes, not customer reality")],
        [text("Too generic:", 1), text(" One map for all customers doesn't work – different personas have different journeys")],
        [text("Once and forget:", 1), text(" The journey changes – update regularly")],
        [text("No data:", 1), text(" Gut feeling instead of real customer insights")],
        [text("No consequences:", 1), text(" Create map but change nothing")]
      ]),

      heading("h2", "From Map to Action: Optimizing the Journey"),

      paragraph([
        text("A Customer Journey Map is only as valuable as the actions that follow:")
      ]),

      heading("h3", "1. Prioritize"),

      paragraph([
        text("Not everything at once. Focus on:")
      ]),

      bulletList([
        "The biggest pain points",
        "Moments with highest conversion impact",
        "Quick wins with little effort"
      ]),

      heading("h3", "2. Work Cross-Functionally"),

      paragraph([
        text("The journey doesn't belong to one department. Marketing, sales, service, product – everyone must collaborate.")
      ]),

      heading("h3", "3. Measure and Iterate"),

      paragraph([
        text("Define KPIs for each journey section:")
      ]),

      bulletList([
        "Awareness: Traffic, impressions, brand searches",
        "Consideration: Time on site, pages per session, inquiries",
        "Decision: Conversion rate, cart abandonment",
        "Retention: NPS, churn rate, repurchase rate",
        "Advocacy: Reviews, referrals"
      ]),

      heading("h2", "Customer Journey and Your Website"),

      paragraph([
        text("Your website is the most important digital touchpoint. It must support the journey:")
      ]),

      bulletList([
        [text("Awareness:", 1), text(" Blog, SEO-optimized content found during problem searches")],
        [text("Consideration:", 1), text(" Service pages, case studies, comparisons, testimonials")],
        [text("Decision:", 1), text(" Clear CTAs, simple contact options, trust signals")],
        [text("Retention:", 1), text(" Login area, resources, support access")],
        [text("Advocacy:", 1), text(" Social proof, easy sharing options")]
      ]),

      paragraph([
        text("Our "),
        link("/services/web-design", "web projects"),
        text(" are always based on customer journey analysis.")
      ]),

      heading("h2", "Frequently Asked Questions"),

      heading("h3", "How long does it take to create a Customer Journey Map?"),
      paragraph("A simple mapping for one persona takes 2-4 weeks with customer interviews. Comprehensive mapping for multiple personas and products can take 2-3 months."),

      heading("h3", "Which tools are suitable for Customer Journey Mapping?"),
      paragraph("For beginners: Whiteboard or Miro. For more complex maps: Smaply, UXPressia, Lucidchart. For data-driven mapping: Google Analytics, Mixpanel, Hotjar."),

      heading("h3", "How often should I update the Journey Map?"),
      paragraph("At least annually, preferably semi-annually. With major changes (new product, new channel, changed customer needs) immediately."),

      heading("h3", "How do I involve my team in mapping?"),
      paragraph("Conduct a workshop with representatives from marketing, sales, service, product. Each department has different insights into customer reality."),

      heading("h3", "What's the difference between Customer Journey and User Journey?"),
      paragraph("Customer Journey = entire relationship with the company. User Journey = specific interaction with a product or digital touchpoint. User journeys are part of the customer journey."),

      heading("h3", "Do I need a separate Journey Map for each persona?"),
      paragraph("Ideally yes. Different personas have different needs, pain points and decision paths. Start with your most important persona."),

      heading("h3", "How do I measure ROI of Customer Journey Mapping?"),
      paragraph("Indirectly via KPIs like conversion rate, customer lifetime value, NPS, churn rate. Directly: What specific improvements have you implemented based on the map?"),

      paragraph([
        text("Want to analyze your customer journey professionally? "),
        link("/contact", "Contact us"),
        text(" for a strategy conversation.")
      ])
    ],
    direction: "ltr", format: "", indent: 0, version: 1
  }
};

async function updatePost6() {
  const dbPath = process.argv[2] || './goldenwing.db';
  console.log('🚀 Updating Post 6 Content (DE + EN)...');

  try {
    const db = new Database(dbPath);

    const stmtDE = db.prepare(`UPDATE posts_locales SET content = ? WHERE _parent_id = 6 AND _locale = 'de'`);
    const resultDE = stmtDE.run(JSON.stringify(post6ContentDE));
    console.log('✅ DE Updated rows:', resultDE.changes);

    const stmtEN = db.prepare(`UPDATE posts_locales SET content = ? WHERE _parent_id = 6 AND _locale = 'en'`);
    const resultEN = stmtEN.run(JSON.stringify(post6ContentEN));
    console.log('✅ EN Updated rows:', resultEN.changes);

    const verify = db.prepare(`SELECT _locale, length(content) as len FROM posts_locales WHERE _parent_id = 6`).all();
    verify.forEach(v => console.log(`📊 ${v._locale}: ${v.len} characters`));

    db.close();
    console.log('✅ Post 6 content updated successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePost6();
