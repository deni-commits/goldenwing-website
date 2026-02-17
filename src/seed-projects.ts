/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload'
import config from '../../payload.config'

const projects = [
  {
    title: 'Domoferm - B2B Digitalstrategie',
    slug: 'domoferm',
    client: 'Domoferm',
    category: 'strategie',
    year: 2023,
    description: 'Von der digitalen Unsichtbarkeit zum B2B-Marktführer: Wie wir einen Industriegiganten ins digitale Zeitalter katapultiert haben. Eine Erfolgsgeschichte über strategisches Webdesign, SEO-Dominanz und messbare Lead-Generierung.',
    challenge: 'Domoferm – ein Hidden Champion im B2B-Industriesektor mit jahrzehntelanger Expertise – stand vor einem paradoxen Problem: Offline eine Institution, online praktisch unsichtbar. Die veraltete Website generierte kaum qualifizierte Anfragen. Potenzielle Geschäftspartner fanden statt Domoferm die Konkurrenz. Ein klassischer Fall von "Schuster, bleib bei deinen Leisten" – dabei war längst klar: Ohne digitale Präsenz keine Zukunft im modernen B2B-Geschäft.',
    solution: 'Wir entwickelten eine ganzheitliche Digitalstrategie, die Domoferm nicht nur sichtbar, sondern zum digitalen Thought Leader machte. Das Herzstück: Eine conversion-optimierte Website mit klarer B2B-Nutzerführung, technisches SEO auf Enterprise-Niveau und eine Content-Strategie, die komplexe Industriethemen in verdauliche Insights verwandelt. Das Ergebnis? Ein digitales Ökosystem, das rund um die Uhr qualifizierte Leads generiert – während der Vertrieb schläft.',
    services: [
      { service: 'Digitalstrategie & Beratung' },
      { service: 'B2B Lead-Generierung' },
      { service: 'Enterprise SEO-Optimierung' },
      { service: 'Content-Marketing Strategie' },
      { service: 'Conversion Rate Optimization' },
    ],
    tags: [
      { tag: 'B2B Marketing' },
      { tag: 'Industrie 4.0' },
      { tag: 'Lead-Generierung' },
      { tag: 'SEO Wien' },
      { tag: 'Digitalstrategie' },
    ],
    results: [
      { metric: '+180%', label: 'Qualifizierte Leads' },
      { metric: '+95%', label: 'Organischer Traffic' },
      { metric: '45%', label: 'Conversion Rate' },
    ],
    featured: true,
    order: 1,
  },
  {
    title: 'Atta Pallet - Digitale Marktpräsenz',
    slug: 'atta-pallet',
    client: 'Atta Pallet',
    category: 'webdesign',
    year: 2023,
    description: 'Vom lokalen Geheimtipp zum regionalen Marktführer: Wie strategisches Webdesign und lokales SEO ein traditionsreiches Handelsunternehmen in die digitale Champions League befördert haben.',
    challenge: 'Atta Pallet kannte jeder in der Branche – aber nur, wer schon Kunde war. Das Unternehmen lebte von Mundpropaganda und persönlichen Kontakten. Großartig für die Kundenbindung, katastrophal für das Wachstum. Die digitale Präsenz? Ein veralteter Onepager, der mehr Fragen aufwarf als beantwortete. Google? Kannte Atta Pallet nicht. Ein Unternehmen mit exzellentem Service, das im digitalen Niemandsland verschwand.',
    solution: 'Wir bauten Atta Pallet eine digitale Heimat, die den hohen Qualitätsanspruch des Unternehmens widerspiegelt. Eine moderne, mobiloptimierte Website mit klarem B2B-Fokus und intuitiver Kontaktaufnahme. Kombiniert mit einer lokalen SEO-Offensive und gezielten Google Ads eroberten wir die regionalen Suchergebnisse. Das Resultat: Wenn jemand in der Region nach Paletten sucht, führt kein Weg mehr an Atta vorbei.',
    services: [
      { service: 'Responsive Webdesign' },
      { service: 'Local SEO Optimierung' },
      { service: 'Google Ads Management' },
      { service: 'B2B Content-Erstellung' },
      { service: 'Conversion-Optimierung' },
    ],
    tags: [
      { tag: 'Webdesign Wien' },
      { tag: 'Local SEO' },
      { tag: 'B2B Website' },
      { tag: 'Google Ads' },
      { tag: 'Logistik Branche' },
    ],
    results: [
      { metric: '+250%', label: 'Website-Anfragen' },
      { metric: 'Top 3', label: 'Lokale Google Rankings' },
      { metric: '-40%', label: 'Kosten pro Lead' },
    ],
    featured: false,
    order: 2,
  },
  {
    title: 'Point of New - Marken-Relaunch',
    slug: 'point-of-new',
    client: 'Point of New',
    category: 'branding',
    year: 2023,
    description: 'Wenn eine Marke in die Jahre kommt: Wie wir Point of New mit einem mutigen Rebranding vom verstaubten Ladenhüter zur begehrten Lifestyle-Brand transformiert haben. Eine Metamorphose in Gold.',
    challenge: 'Point of New hatte ein Problem, das viele etablierte Unternehmen kennen: Die Marke war in die Jahre gekommen. Was einst frisch und innovativ wirkte, fühlte sich nun an wie ein Relikt aus vergangenen Zeiten. Die jüngere Zielgruppe? Lief vorbei. Die Stammkunden? Wurden älter. Der Wiener Einzelhandel ist gnadenlos – wer nicht mit der Zeit geht, geht mit der Zeit.',
    solution: 'Wir haben Point of New nicht einfach aufgehübscht – wir haben die Marke neu gedacht. Ein mutiges, zeitgemäßes Logo, eine vibrierende Farbpalette und eine Bildsprache, die Lust auf mehr macht. Die neue Website ist kein digitales Schaufenster, sondern ein Erlebnis. Social Media wurde vom Stiefkind zum Wachstumsmotor. Das Ergebnis: Eine Marke, die wieder relevant ist – und über die man spricht.',
    services: [
      { service: 'Strategisches Rebranding' },
      { service: 'Logo-Design & Visual Identity' },
      { service: 'Website-Design & Development' },
      { service: 'Brand Guidelines Entwicklung' },
      { service: 'Social Media Strategie' },
    ],
    tags: [
      { tag: 'Rebranding Agentur' },
      { tag: 'Logo Design Wien' },
      { tag: 'Brand Identity' },
      { tag: 'Retail Marketing' },
      { tag: 'Markenentwicklung' },
    ],
    results: [
      { metric: '+85%', label: 'Brand Awareness' },
      { metric: '+120%', label: 'Social Media Engagement' },
      { metric: '+40%', label: 'Neukunden unter 35' },
    ],
    featured: true,
    order: 3,
  },
  {
    title: 'LAMBERG - E-Commerce Erfolgsgeschichte',
    slug: 'lamberg',
    client: 'LAMBERG',
    category: 'software',
    year: 2022,
    description: 'Vom Marketplace-Gefangenen zum E-Commerce-Unternehmer: Wie wir LAMBERG einen Webshop bauten, der nicht nur gut aussieht, sondern auch verkauft. 300% mehr Umsatz sind kein Zufall.',
    challenge: 'LAMBERG verkaufte erfolgreich über Amazon und Co. – und zahlte dafür einen hohen Preis. Hohe Provisionen, null Kundendaten, totale Abhängigkeit. Jeder Algorithmus-Update war wie russisches Roulette. Der Traum vom eigenen Shop? Gescheitert an einem DIY-Webshop, der mehr Kunden vertrieb als anzog. LAMBERG brauchte nicht irgendeine Website – sie brauchten eine Verkaufsmaschine.',
    solution: 'Wir konzipierten einen Webshop, der Shopify-Vibes mit Enterprise-Power kombiniert. Conversion-optimierte Produktseiten, ein Checkout-Prozess so smooth wie Butter, Mobile-First Design für die Generation Smartphone. Dazu ein Backend, das mitwächst und Bestellungen automatisch verarbeitet. Keine Provisionen mehr, volle Kontrolle über Kundendaten – und endlich eine direkte Beziehung zu den Käufern.',
    services: [
      { service: 'E-Commerce Webshop Entwicklung' },
      { service: 'UX/UI Design für Online-Shops' },
      { service: 'Payment Gateway Integration' },
      { service: 'Automatisiertes Bestellmanagement' },
      { service: 'Mobile Commerce Optimierung' },
    ],
    tags: [
      { tag: 'E-Commerce Agentur Wien' },
      { tag: 'Webshop Entwicklung' },
      { tag: 'Online Shop erstellen' },
      { tag: 'D2C E-Commerce' },
      { tag: 'Shopify Alternative' },
    ],
    results: [
      { metric: '+300%', label: 'Online-Umsatz' },
      { metric: '3.2%', label: 'Conversion Rate' },
      { metric: '€85', label: 'Durchschn. Warenkorbwert' },
    ],
    featured: true,
    order: 4,
  },
  {
    title: 'Turbo Mango - Corporate Identity mit Charakter',
    slug: 'turbo-mango',
    client: 'Turbo Mango',
    category: 'branding',
    year: 2023,
    description: 'Wie gibt man einer Digital-Agentur eine Identität, die kreativ und professionell zugleich ist? Mit einem Corporate Design, das im Pitch-Meeting überzeugt und auf der Messe Köpfe dreht.',
    challenge: 'Turbo Mango – der Name ist Programm. Eine junge, hungrige Digital-Agentur mit großen Ambitionen, aber ohne visuellen Auftritt, der diese Energie transportiert. Visitenkarten? Zusammengebastelt. Präsentationen? Jedes Mal anders. Messestand? Lieber nicht drüber reden. Für eine Agentur, die anderen beim Branding hilft, ein bisschen peinlich – und ein echtes Business-Hindernis.',
    solution: 'Wir haben die Energie von Turbo Mango eingefangen und in ein CI-System gegossen, das genau so dynamisch ist wie das Team. Ein Logo, das man nicht vergisst. Farben, die aus der Masse herausstechen. Ein Messestand-Konzept, an dem niemand vorbeiläuft. Und Brand Guidelines, die sicherstellen, dass dieser Spirit in jeder Anwendung lebt – vom LinkedIn-Post bis zur Rechnung.',
    services: [
      { service: 'Corporate Identity Design' },
      { service: 'Logo-Entwicklung & Varianten' },
      { service: 'Umfassende Brand Guidelines' },
      { service: 'Messestand Konzeption & Design' },
      { service: 'Geschäftsausstattung Design' },
    ],
    tags: [
      { tag: 'Corporate Identity Wien' },
      { tag: 'Logo Design Agentur' },
      { tag: 'Messestand Design' },
      { tag: 'Brand Guidelines' },
      { tag: 'Startup Branding' },
    ],
    results: [
      { metric: '100%', label: 'Unique Brand Identity' },
      { metric: '+60%', label: 'Pitch Success Rate' },
      { metric: '3x', label: 'Messe-Kontakte' },
    ],
    clientFeedback: {
      quote: 'Goldenwing ist eine herausragende Grafik- und Webdesign-Agentur in Wien! Das Team ist äußerst professionell und kreativ. Sie haben meine Vision perfekt umgesetzt und dabei stets auf meine Wünsche gehört. Die Kommunikation war hervorragend und das Endergebnis hat meine Erwartungen übertroffen. Ich habe bereits positive Rückmeldungen von meinen Kunden erhalten.',
      author: 'Vadim Mikhailov',
      role: 'CEO, Turbo Mango',
    },
    featured: false,
    order: 5,
  },
  {
    title: 'INSPIRE - Recruiting-Kampagne mit Impact',
    slug: 'inspire',
    client: 'INSPIRE',
    category: 'content',
    year: 2023,
    description: 'Fachkräftemangel meets digitales Recruiting: Wie wir mit emotionalem Storytelling und datengetriebenem Marketing eine Brücke zwischen afrikanischen Talenten und deutschen Unternehmen gebaut haben.',
    challenge: 'INSPIRE hatte eine noble Mission: Qualifizierte Fachkräfte aus Afrika mit deutschen Industrieunternehmen zusammenbringen. Win-Win für alle – theoretisch. Praktisch? Null Reichweite, skeptische Zielgruppen auf beiden Seiten und ein Budget, das keine TV-Kampagne erlaubte. Wie erreicht man Menschen auf zwei Kontinenten, die noch nie von einem gehört haben?',
    solution: 'Wir setzten auf die Macht authentischer Geschichten. Video-Testimonials von erfolgreichen Vermittlungen, Behind-the-Scenes Content aus dem Alltag, eine Landing Page, die sowohl Talente als auch HR-Manager abholt. Gezielte Social Media Ads auf LinkedIn und Meta erreichten genau die richtigen Menschen. Das Ergebnis: Eine Community aus Unterstützern, Bewerbern und begeisterten Partnerunternehmen.',
    services: [
      { service: 'Multi-Channel Kampagnenstrategie' },
      { service: 'Social Media Advertising' },
      { service: 'Video & Content Produktion' },
      { service: 'Conversion-optimierte Landing Pages' },
      { service: 'Performance Marketing' },
    ],
    tags: [
      { tag: 'Recruiting Kampagne' },
      { tag: 'Social Media Marketing' },
      { tag: 'HR Marketing' },
      { tag: 'Content Marketing Wien' },
      { tag: 'Performance Marketing' },
    ],
    results: [
      { metric: '500+', label: 'Qualifizierte Bewerbungen' },
      { metric: '25', label: 'Erfolgreiche Vermittlungen' },
      { metric: '2M+', label: 'Menschen erreicht' },
    ],
    featured: false,
    order: 6,
  },
  {
    title: 'Alinea Partners - Vertrauen in Pixeln',
    slug: 'alinea-partners',
    client: 'Alinea Partners',
    category: 'webdesign',
    year: 2022,
    description: 'Wie baut man digitales Vertrauen für eine Branche, der viele misstrauen? Mit einer Website, die Kompetenz ausstrahlt, ohne arrogant zu wirken – und Menschen überzeugt, ihr Geld in gute Hände zu geben.',
    challenge: 'Finanzberatung ist Vertrauenssache. Aber wie vermittelt man Vertrauen auf einer Website, wenn der Besucher einen noch nie getroffen hat? Alinea Partners hatte ein weiteres Problem: Die alte Website wirkte wie von einem Buchhalter in den 90ern gebaut. Kalt, technisch, nichtssagend. Genau das Gegenteil dessen, was die warmherzigen Berater ausstrahlten, sobald man sie persönlich traf.',
    solution: 'Wir holten die Persönlichkeit von Alinea Partners ins Digitale. Authentische Teamfotos statt Stock-Bilder, warme Farben statt Corporate-Grau, menschliche Sprache statt Finanz-Jargon. Die Struktur führt Besucher intuitiv zu ihrem Thema und einem einfachen Kontaktweg. Das Ergebnis: Eine Website, die das erste Beratungsgespräch schon vorwegnimmt – persönlich, kompetent, vertrauenswürdig.',
    services: [
      { service: 'Strategisches Webdesign' },
      { service: 'Fotografie-Konzept & Art Direction' },
      { service: 'Conversion-Copywriting' },
      { service: 'SEO-Grundoptimierung' },
      { service: 'Vertrauensbildende UX-Elemente' },
    ],
    tags: [
      { tag: 'Webdesign Finanzbranche' },
      { tag: 'B2B Website Design' },
      { tag: 'Trust-Building Website' },
      { tag: 'Corporate Website Wien' },
      { tag: 'Beratung Website' },
    ],
    results: [
      { metric: '+150%', label: 'Kontaktanfragen' },
      { metric: '4.5 Min', label: 'Durchschn. Verweildauer' },
      { metric: '+65%', label: 'Termingespräche' },
    ],
    featured: false,
    order: 7,
  },
  {
    title: 'SiMAX - Technologie für Inklusion',
    slug: 'simax',
    client: 'SiMAX',
    category: 'software',
    year: 2023,
    description: 'Wenn Innovation auf Inklusion trifft: Wie wir einer bahnbrechenden Gebärdensprach-Technologie den Weg in Millionen von Apps geebnet haben. Ein SDK, das Barrieren abbaut.',
    challenge: 'SiMAX hatte Großes geschaffen: Eine KI-basierte Technologie, die gesprochene Sprache in Echtzeit in Gebärdensprache übersetzt. Das Problem? Kaum ein App-Entwickler konnte sie nutzen. Die Integration war komplex, die Dokumentation lückenhaft, der Support überlastet. Eine revolutionäre Technologie, die niemand implementieren konnte – das musste sich ändern.',
    solution: 'Wir entwickelten ein SDK, das Entwickler lieben. Klare API-Struktur, ausführliche Dokumentation mit echten Code-Beispielen, Copy-Paste-fertige Implementierungen für iOS und Android. Dazu eine Demo-App, die zeigt, was möglich ist, und ein Developer Portal, das Fragen beantwortet, bevor sie entstehen. Plötzlich war die Integration von "Projekt für nächstes Quartal" zu "geschafft an einem Nachmittag" geworden.',
    services: [
      { service: 'SDK-Architektur & Entwicklung' },
      { service: 'RESTful API Design' },
      { service: 'Developer Documentation' },
      { service: 'Demo-App Entwicklung' },
      { service: 'Developer Relations Strategie' },
    ],
    tags: [
      { tag: 'SDK Entwicklung' },
      { tag: 'API Development' },
      { tag: 'Accessibility Software' },
      { tag: 'Mobile Development' },
      { tag: 'Inklusion Technologie' },
    ],
    results: [
      { metric: '15+', label: 'App-Integrationen' },
      { metric: '50K+', label: 'Erreichte Endnutzer' },
      { metric: '95%', label: 'Developer Satisfaction' },
    ],
    featured: true,
    order: 8,
  },
  {
    title: 'Erkurt Gartengestaltung - Natur trifft Digital',
    slug: 'erkurt-gartengestaltung',
    client: 'Erkurt Gartengestaltung',
    category: 'branding',
    year: 2022,
    description: 'Vom Gärtner zum Gartenarchitekten: Wie ein traditionelles Handwerksunternehmen mit authentischem Branding und einer Portfolio-Website die Premium-Kundschaft erobert hat.',
    challenge: 'Herr Erkurt und sein Team machten exzellente Arbeit – aber für den falschen Preis. Als "der Gärtner ums Eck" wurde man für Rasenmähen gerufen, nicht für anspruchsvolle Gestaltungsprojekte. Die Marke spiegelte nicht wider, was Erkurt wirklich konnte: durchdachte Gartenkonzepte auf Architekten-Niveau. Die richtigen Kunden wussten schlicht nicht, dass es sie gibt.',
    solution: 'Wir positionierten Erkurt neu – vom Gärtner zum Gartenarchitekten. Eine naturinspirierte Markenidentität mit erdigen Tönen und organischen Formen signalisiert Premium ohne Überheblichkeit. Die neue Website ist eine visuelle Reise durch atemberaubende Projekte. Professionelle Projektfotografie zeigt, was Erkurt wirklich draufhat. Die Message: Das ist kein Gärtner – das ist ein Künstler, der mit Pflanzen arbeitet.',
    services: [
      { service: 'Premium Brand Identity' },
      { service: 'Logo-Design mit Naturästhetik' },
      { service: 'Portfolio Website Design' },
      { service: 'Professionelle Projektfotografie' },
      { service: 'Print-Materialien Design' },
    ],
    tags: [
      { tag: 'Handwerker Branding' },
      { tag: 'Portfolio Website' },
      { tag: 'Gartengestaltung Wien' },
      { tag: 'Premium Positionierung' },
      { tag: 'Handwerk Website' },
    ],
    results: [
      { metric: '+200%', label: 'Anfragen' },
      { metric: '+45%', label: 'Durchschn. Projektgröße' },
      { metric: 'Premium', label: 'Neue Positionierung' },
    ],
    featured: false,
    order: 9,
  },
  {
    title: 'TET Group - Brand Guidelines für Konsistenz',
    slug: 'tet-group',
    client: 'TET Group',
    category: 'branding',
    year: 2023,
    description: 'Wenn jeder macht, was er will: Wie ein 80-seitiges Brand Manual das kreative Chaos beendet und einer Unternehmensgruppe erstmals einen einheitlichen Auftritt gegeben hat.',
    challenge: 'Die TET Group war gewachsen – schnell und organisch. Das Problem: Jede Abteilung, jeder Standort hatte seine eigene Interpretation der Marke entwickelt. Hier ein anderes Logo-Blau, dort eine "kreative" Schriftart-Wahl, und bei Präsentationen war sowieso jeder Designer seines eigenen Glückes Schmied. Das Resultat? Außen Chaos, innen Frust, und ein Brand-Wert, der unter seinen Möglichkeiten blieb.',
    solution: 'Wir führten einen Brand-Audit durch, identifizierten die Kernelemente und entwickelten ein umfassendes Brand Manual, das keine Fragen offen lässt. Von Logo-Freizonen über Farbcodes bis zu Anwendungsbeispielen für jede erdenkliche Situation. Dazu Templates für Präsentationen, Dokumente und Social Media. Und das Beste: Wir schulten die Teams, damit das Manual nicht in der Schublade verstaubt.',
    services: [
      { service: 'Brand Audit & Analyse' },
      { service: 'Umfassendes Brand Manual' },
      { service: 'Design-System Entwicklung' },
      { service: 'Template-Bibliothek' },
      { service: 'Team-Workshops & Schulungen' },
    ],
    tags: [
      { tag: 'Brand Guidelines Entwicklung' },
      { tag: 'Design System' },
      { tag: 'Corporate Design Manual' },
      { tag: 'Brand Consistency' },
      { tag: 'Enterprise Branding' },
    ],
    results: [
      { metric: '100%', label: 'Brand Consistency' },
      { metric: '-70%', label: 'Design-Abstimmungszeit' },
      { metric: '50+', label: 'Ready-to-use Templates' },
    ],
    featured: false,
    order: 10,
  },
  {
    title: 'Umzugsreif - Marke auf Rädern',
    slug: 'umzugsreif',
    client: 'Umzugsreif',
    category: 'branding',
    year: 2022,
    description: 'Von der weißen Lieferwagen-Flotte zur fahrenden Werbetafel: Wie durchdachtes Branding ein Umzugsunternehmen unübersehbar gemacht hat – auf der Straße und im Kopf.',
    challenge: 'Umzugsreif hatte treue Kunden und solides Handwerk. Aber in einem Markt voller weißer Lieferwagen war man schlicht unsichtbar. Keine einheitliche Optik, kein Wiedererkennungswert, keine Marke, die im Gedächtnis bleibt. Wenn der LKW weg war, war auch die Erinnerung weg – fatal für ein Geschäft, das von Empfehlungen lebt.',
    solution: 'Wir machten Umzugsreif unübersehbar. Ein markantes Branding-Konzept, das auf LKWs, Kleintransportern und Arbeitskleidung gleichermaßen funktioniert. Kräftige Farben, die selbst im Regen leuchten, ein Logo, das man aus 50 Metern Entfernung erkennt. Jedes Fahrzeug ist jetzt eine mobile Werbetafel, jeder Mitarbeiter ein Markenbotschafter. Umzugsreif fährt nicht mehr durch die Stadt – Umzugsreif fällt auf.',
    services: [
      { service: 'Corporate Branding Komplett' },
      { service: 'Fahrzeugbeschriftung Design' },
      { service: 'Arbeitskleidung Design' },
      { service: 'Geschäftsausstattung' },
      { service: 'Schildersysteme & Werbemittel' },
    ],
    tags: [
      { tag: 'Fahrzeugbeschriftung Design' },
      { tag: 'Corporate Branding' },
      { tag: 'Arbeitskleidung Branding' },
      { tag: 'Umzugsunternehmen Marketing' },
      { tag: 'Fleet Branding' },
    ],
    results: [
      { metric: '+80%', label: 'Brand Recognition' },
      { metric: '+35%', label: 'Weiterempfehlungen' },
      { metric: '100%', label: 'Flotten-Einheitlichkeit' },
    ],
    featured: false,
    order: 11,
  },
  {
    title: 'DerBotaniker - Grüne Markenidentität',
    slug: 'derbotaniker',
    client: 'DerBotaniker',
    category: 'branding',
    year: 2022,
    description: 'Wenn Nachhaltigkeit keine leere Phrase sein soll: Wie wir für einen Lifestyle-Shop eine Marke schufen, die Umweltbewusstsein lebt – vom Logo bis zur kompostierbaren Verpackung.',
    challenge: 'DerBotaniker hatte einen klaren Purpose: Nachhaltige Produkte für urbane Menschen, die bewusster leben wollen. Das Problem: Die visuelle Identität sah aus wie jeder zweite "grüne" Shop – langweilig, beliebig, austauschbar. In einem Markt, der von Greenwashing überschwemmt wird, brauchte es Authentizität statt Klischees.',
    solution: 'Wir entwickelten eine Markenidentität, die Nachhaltigkeit nicht plakatiert, sondern lebt. Ein organisches Logo mit botanischen Elementen, eine Farbpalette inspiriert von echter Natur – nicht von Stock-Fotos. Die Verpackungen? Minimalistisch, kompostierbar, schön genug zum Aufheben. Jedes Touchpoint erzählt dieselbe Geschichte: Hier wird Nachhaltigkeit ernst genommen – aber ohne erhobenen Zeigefinger.',
    services: [
      { service: 'Nachhaltige Markenidentität' },
      { service: 'Organisches Logo-Design' },
      { service: 'Eco-Packaging Design' },
      { service: 'Social Media Template System' },
      { service: 'Nachhaltigkeits-Kommunikation' },
    ],
    tags: [
      { tag: 'Nachhaltiges Branding' },
      { tag: 'Eco Brand Design' },
      { tag: 'Packaging Design Wien' },
      { tag: 'Green Marketing' },
      { tag: 'Lifestyle Brand' },
    ],
    results: [
      { metric: 'Unique', label: 'Authentic Brand Identity' },
      { metric: '+150%', label: 'Social Media Growth' },
      { metric: 'Premium', label: 'Markenwahrnehmung' },
    ],
    featured: false,
    order: 12,
  },
  {
    title: 'Glaeser Law - Juristische Sichtbarkeit',
    slug: 'glaeser-law',
    client: 'Glaeser Law Tax Boutique',
    category: 'strategie',
    year: 2023,
    description: 'Von der Google-Wüste auf Seite 1: Wie Content-Marketing und SEO einer Spezialkanzlei zu digitaler Sichtbarkeit verholfen haben – ohne die anwaltliche Würde zu verlieren.',
    challenge: 'Glaeser Law war ein offenes Geheimnis in Fachkreisen: Exzellente Expertise im Steuer- und Wirtschaftsrecht. Aber digital? Praktisch nicht existent. Die Website war eine digitale Visitenkarte aus den 2000ern. SEO? Kein Ranking für relevante Keywords. Während Konkurrenten mit aggressivem Marketing warben, setzte Glaeser auf Qualität – und blieb unsichtbar.',
    solution: 'Wir entwickelten eine Content-Strategie, die Fachkompetenz zeigt, ohne in plumpe Werbung abzurutschen. Expertenbeiträge zu aktuellen Rechtsthemen, SEO-optimiert aber lesbar. Die Website wurde technisch und inhaltlich modernisiert. Auf LinkedIn positionierten wir die Anwälte als Thought Leader. Das Ergebnis: Sichtbarkeit, die zur Kanzlei passt – seriös, kompetent, modern.',
    services: [
      { service: 'Legal Content Marketing' },
      { service: 'SEO für Kanzleien' },
      { service: 'Website Modernisierung' },
      { service: 'LinkedIn Thought Leadership' },
      { service: 'Reputation Management' },
    ],
    tags: [
      { tag: 'Kanzlei Marketing' },
      { tag: 'SEO für Anwälte' },
      { tag: 'Legal Marketing Wien' },
      { tag: 'Steuerberater Marketing' },
      { tag: 'B2B Content Strategie' },
    ],
    results: [
      { metric: '+300%', label: 'Organischer Traffic' },
      { metric: 'Top 5', label: 'Rankings für Kernkeywords' },
      { metric: '+150%', label: 'Mandantenanfragen' },
    ],
    featured: false,
    order: 13,
  },
]

async function seed() {
  console.log('🌱 Seeding projects with creative descriptions...')
  console.log('⚠️  HINWEIS: Existierende Projekte werden AKTUALISIERT, nicht gelöscht!')
  console.log('   → Bilder und CMS-Änderungen bleiben erhalten.\n')

  const payload = await getPayload({ config })

  // Find existing projects (DO NOT DELETE - preserve images!)
  const existing = await payload.find({
    collection: 'projects',
    limit: 100,
  })

  const existingBySlug = new Map(
    existing.docs.map((doc) => [doc.slug, doc])
  )

  // Create or update projects
  for (const project of projects) {
    try {
      const existingProject = existingBySlug.get(project.slug)

      if (existingProject) {
        // UPDATE existing project - preserve main_image and gallery!
        await payload.update({
          collection: 'projects',
          id: existingProject.id,
          data: {
            ...project,
            // WICHTIG: Behalte existierende Bilder bei!
            main_image: existingProject.main_image,
            gallery: existingProject.gallery,
          } as any,
        })
        console.log(`🔄 Updated: ${project.title} (Bilder beibehalten)`)
      } else {
        // CREATE new project
        await payload.create({
          collection: 'projects',
          data: project as any,
        })
        console.log(`✅ Created: ${project.title}`)
      }
    } catch (error) {
      console.error(`❌ Error with ${project.title}:`, error)
    }
  }

  console.log('\n✨ Seeding complete!')
  console.log('💡 Tipp: Bilder über /admin → Projects hochladen.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
