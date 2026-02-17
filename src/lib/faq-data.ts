// FAQ data for service pages - Server-compatible (no 'use client')

export interface FAQItem {
  question: string
  answer: string
}

// German FAQs
const brandingFAQsDe: FAQItem[] = [
  {
    question: "Wie entwickle ich eine Markenidentität?",
    answer: "Eine Markenidentität entwickeln Sie in 5 Schritten: 1) Zielgruppe und Markt analysieren, 2) Markenwerte und Positionierung definieren, 3) Visuelle Identität (Logo, Farben, Typografie) gestalten, 4) Brand Voice und Messaging entwickeln, 5) Brand Guidelines dokumentieren. Wir begleiten Sie durch den gesamten Prozess."
  },
  {
    question: "Was gehört alles zum Branding?",
    answer: "Zum Branding gehören: Markenstrategie (Positionierung, Zielgruppe, USP), Naming (Firmenname, Slogan), Visual Identity (Logo, Farbschema, Typografie), Brand Voice (Tonalität, Messaging), Corporate Identity (Visitenkarten, Briefpapier) und Brand Guidelines für konsistente Anwendung."
  },
  {
    question: "Wie finde ich meinen Markennamen?",
    answer: "Ein guter Markenname ist einprägsam, aussprechbar und verfügbar (Domain, Markenrecht). Methoden: Brainstorming, Wortspiele, Akronyme, erfundene Wörter oder beschreibende Namen. Wir prüfen Verfügbarkeit und internationale Tauglichkeit vor der Entscheidung."
  },
  {
    question: "Wann sollte man ein Rebranding machen?",
    answer: "Ein Rebranding ist sinnvoll bei: veralteter Markenwahrnehmung, Zielgruppenwechsel, Fusion/Übernahme, negativem Image, Expansion in neue Märkte oder wenn die Marke nicht mehr zur Unternehmensstrategie passt. Der Prozess dauert typischerweise 3-6 Monate."
  },
  {
    question: "Wie erstelle ich Brand Guidelines?",
    answer: "Brand Guidelines dokumentieren: Logo-Verwendung (Größen, Abstände, Don'ts), Farbpalette mit Codes (HEX, RGB, CMYK), Typografie (Schriften, Hierarchie), Bildsprache, Tone of Voice und Anwendungsbeispiele. Ein typisches Brand Book hat 40-80 Seiten."
  },
  {
    question: "Was kostet ein professionelles Logo Design?",
    answer: "Professionelles Logo Design kostet zwischen €1.200 und €4.000, abhängig von Komplexität und Umfang. Inkludiert sind: Konzeption, mehrere Entwürfe, Revisionen, alle Dateiformate, Logo-Variationen und Basis-Guidelines. Billig-Logos für €50-200 sind meist Templates ohne Strategie."
  },
]

// English FAQs
const brandingFAQsEn: FAQItem[] = [
  {
    question: "How do I develop a brand identity?",
    answer: "Develop a brand identity in 5 steps: 1) Analyze target audience and market, 2) Define brand values and positioning, 3) Design visual identity (logo, colors, typography), 4) Develop brand voice and messaging, 5) Document brand guidelines. We guide you through the entire process."
  },
  {
    question: "What does branding include?",
    answer: "Branding includes: Brand strategy (positioning, target audience, USP), naming (company name, slogan), visual identity (logo, color scheme, typography), brand voice (tone, messaging), corporate identity (business cards, stationery), and brand guidelines for consistent application."
  },
  {
    question: "How do I find my brand name?",
    answer: "A good brand name is memorable, pronounceable, and available (domain, trademark). Methods: brainstorming, wordplay, acronyms, invented words, or descriptive names. We check availability and international suitability before deciding."
  },
  {
    question: "When should you do a rebranding?",
    answer: "Rebranding makes sense when: brand perception is outdated, target audience changes, merger/acquisition, negative image, expansion into new markets, or when the brand no longer fits the business strategy. The process typically takes 3-6 months."
  },
  {
    question: "How do I create brand guidelines?",
    answer: "Brand guidelines document: Logo usage (sizes, spacing, don'ts), color palette with codes (HEX, RGB, CMYK), typography (fonts, hierarchy), imagery style, tone of voice, and application examples. A typical brand book has 40-80 pages."
  },
  {
    question: "How much does professional logo design cost?",
    answer: "Professional logo design costs between €1,200 and €4,000, depending on complexity and scope. Included are: conception, multiple drafts, revisions, all file formats, logo variations, and basic guidelines. Cheap logos for €50-200 are usually templates without strategy."
  },
]

const webdesignFAQsDe: FAQItem[] = [
  {
    question: "Wie viel kostet eine professionelle Website?",
    answer: "Eine professionelle Website kostet zwischen €3.000 und €15.000+, abhängig von Umfang und Funktionen. Einfache Unternehmenswebsite: €3.000-5.000, Website mit CMS und Blog: €5.000-8.000, Webshop: €8.000-15.000+, Custom Web-App: ab €15.000. Wir erstellen transparente Angebote."
  },
  {
    question: "Was macht gutes Webdesign aus?",
    answer: "Gutes Webdesign vereint: klare Struktur und Navigation, schnelle Ladezeiten (Core Web Vitals), responsive Design für alle Geräte, barrierefreie Gestaltung, intuitive User Experience, konsistentes visuelles Design und SEO-Optimierung. Der Nutzer findet schnell, was er sucht."
  },
  {
    question: "WordPress oder Webflow - was ist besser?",
    answer: "WordPress eignet sich für: flexible Erweiterbarkeit, viele Plugins, Blog-Funktionen, WooCommerce-Shops. Webflow ist besser für: designer-freundliche Oberfläche, schnelle Ladezeiten, weniger Wartung, animationsreiche Websites. Wir beraten Sie basierend auf Ihren Anforderungen."
  },
  {
    question: "Wie mache ich meine Website schneller?",
    answer: "Website-Speed verbessern: Bilder komprimieren (WebP-Format), Caching aktivieren, unnötige Plugins entfernen, Code minifizieren, CDN nutzen, Hosting upgraden, Lazy Loading für Bilder. Ziel: Largest Contentful Paint unter 2.5 Sekunden."
  },
  {
    question: "Wie mache ich meine Website responsive?",
    answer: "Responsive Design bedeutet: flexible Grid-Layouts, relative Einheiten (%, rem, vw), Media Queries für Breakpoints, mobile-first Entwicklung, Touch-freundliche Buttons (min. 44px), lesbare Schriftgrößen (min. 16px) und optimierte Bilder für verschiedene Bildschirmgrößen."
  },
  {
    question: "Welches CMS ist am besten?",
    answer: "Das beste CMS hängt vom Projekt ab: WordPress (60% Marktanteil, flexibel, viele Plugins), Webflow (visueller Editor, schnell), Shopify (E-Commerce), Payload/Strapi (Headless für Entwickler). Für die meisten Unternehmenswebsites empfehlen wir WordPress oder Webflow."
  },
]

const webdesignFAQsEn: FAQItem[] = [
  {
    question: "How much does a professional website cost?",
    answer: "A professional website costs between €3,000 and €15,000+, depending on scope and features. Simple business website: €3,000-5,000, website with CMS and blog: €5,000-8,000, online shop: €8,000-15,000+, custom web app: from €15,000. We provide transparent quotes."
  },
  {
    question: "What makes good web design?",
    answer: "Good web design combines: clear structure and navigation, fast loading times (Core Web Vitals), responsive design for all devices, accessible design, intuitive user experience, consistent visual design, and SEO optimization. Users find what they're looking for quickly."
  },
  {
    question: "WordPress or Webflow - which is better?",
    answer: "WordPress is suitable for: flexible extensibility, many plugins, blog features, WooCommerce shops. Webflow is better for: designer-friendly interface, fast loading times, less maintenance, animation-rich websites. We advise you based on your requirements."
  },
  {
    question: "How do I make my website faster?",
    answer: "Improve website speed: compress images (WebP format), enable caching, remove unnecessary plugins, minify code, use CDN, upgrade hosting, lazy loading for images. Goal: Largest Contentful Paint under 2.5 seconds."
  },
  {
    question: "How do I make my website responsive?",
    answer: "Responsive design means: flexible grid layouts, relative units (%, rem, vw), media queries for breakpoints, mobile-first development, touch-friendly buttons (min. 44px), readable font sizes (min. 16px), and optimized images for different screen sizes."
  },
  {
    question: "Which CMS is best?",
    answer: "The best CMS depends on the project: WordPress (60% market share, flexible, many plugins), Webflow (visual editor, fast), Shopify (e-commerce), Payload/Strapi (headless for developers). For most business websites, we recommend WordPress or Webflow."
  },
]

const seoFAQsDe: FAQItem[] = [
  {
    question: "Wie komme ich auf Seite 1 bei Google?",
    answer: "Für Top-Rankings brauchen Sie: relevante Keywords mit Suchvolumen, hochwertigen Content der Nutzerfragen beantwortet, technisch optimierte Website (schnell, mobil-freundlich), Backlinks von vertrauenswürdigen Seiten und kontinuierliche Optimierung. SEO ist ein Marathon, kein Sprint."
  },
  {
    question: "Wie lange dauert SEO bis es wirkt?",
    answer: "Erste Ergebnisse sehen Sie nach 3-6 Monaten, signifikante Rankings nach 6-12 Monaten. Faktoren: Wettbewerbsstärke, Domain-Alter, Content-Qualität, Backlink-Aufbau. Local SEO wirkt oft schneller (1-3 Monate). Wir tracken Fortschritte monatlich."
  },
  {
    question: "Was sind Long Tail Keywords?",
    answer: "Long Tail Keywords sind längere, spezifischere Suchanfragen wie 'WordPress Website erstellen lassen Wien' statt 'Webdesign'. Sie haben weniger Suchvolumen, aber höhere Conversion-Raten und weniger Wettbewerb. Ideal für schnellere Rankings und qualifizierte Leads."
  },
  {
    question: "Wie schreibe ich SEO-optimierte Texte?",
    answer: "SEO-Texte: Keyword im Titel, in der H1 und natürlich im Text (2-3% Dichte), strukturierte Überschriften (H2, H3), kurze Absätze, interne Links, Meta-Description mit Keyword, Alt-Texte für Bilder. Wichtigster Faktor: echten Mehrwert für Leser bieten."
  },
  {
    question: "Wie bekomme ich Backlinks?",
    answer: "Backlinks aufbauen: hochwertigen Content erstellen (wird natürlich verlinkt), Gastbeiträge auf relevanten Blogs, Branchenverzeichnisse, PR und Pressemitteilungen, Broken Link Building, Partnerschaften. Kaufen Sie keine Links - Google bestraft das."
  },
  {
    question: "Was kostet SEO pro Monat?",
    answer: "SEO-Betreuung kostet €800-2.500/Monat für KMUs, abhängig vom Umfang: Local SEO ab €800, regionales SEO €1.200-1.800, nationales SEO €1.800-2.500+. Einmalige Audits €1.200-3.000. Wir empfehlen mindestens 6-12 Monate Laufzeit für messbare Ergebnisse."
  },
]

const seoFAQsEn: FAQItem[] = [
  {
    question: "How do I get on page 1 of Google?",
    answer: "For top rankings you need: relevant keywords with search volume, high-quality content that answers user questions, technically optimized website (fast, mobile-friendly), backlinks from trusted sites, and continuous optimization. SEO is a marathon, not a sprint."
  },
  {
    question: "How long does SEO take to work?",
    answer: "You'll see first results after 3-6 months, significant rankings after 6-12 months. Factors: competition strength, domain age, content quality, backlink building. Local SEO often works faster (1-3 months). We track progress monthly."
  },
  {
    question: "What are long tail keywords?",
    answer: "Long tail keywords are longer, more specific search queries like 'WordPress website design Vienna' instead of 'web design'. They have less search volume but higher conversion rates and less competition. Ideal for faster rankings and qualified leads."
  },
  {
    question: "How do I write SEO-optimized content?",
    answer: "SEO content: keyword in title, H1, and naturally in text (2-3% density), structured headings (H2, H3), short paragraphs, internal links, meta description with keyword, alt texts for images. Most important factor: provide real value to readers."
  },
  {
    question: "How do I get backlinks?",
    answer: "Build backlinks: create high-quality content (gets linked naturally), guest posts on relevant blogs, industry directories, PR and press releases, broken link building, partnerships. Don't buy links - Google penalizes that."
  },
  {
    question: "How much does SEO cost per month?",
    answer: "SEO services cost €800-2,500/month for SMBs, depending on scope: Local SEO from €800, regional SEO €1,200-1,800, national SEO €1,800-2,500+. One-time audits €1,200-3,000. We recommend at least 6-12 months for measurable results."
  },
]

const softwareFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine App Entwicklung?",
    answer: "App-Entwicklung kostet: Einfache App €15.000-30.000, mittlere Komplexität €30.000-60.000, komplexe Enterprise-App €60.000-150.000+. Cross-Platform (React Native, Flutter) ist 30-40% günstiger als native Entwicklung für iOS und Android separat."
  },
  {
    question: "Next.js oder React - was ist besser?",
    answer: "Next.js baut auf React auf und bietet: Server-Side Rendering (besser für SEO), automatisches Code-Splitting, API-Routes, Image-Optimierung. Für Websites und Web-Apps empfehlen wir Next.js. Für SPAs ohne SEO-Bedarf reicht oft reines React."
  },
  {
    question: "Was ist ein Headless CMS?",
    answer: "Ein Headless CMS (z.B. Payload, Contentful, Strapi) trennt Content-Verwaltung vom Frontend. Vorteile: flexibles Frontend (React, Vue), bessere Performance, Omnichannel-Nutzung (Web, App, IoT). Ideal für komplexe Projekte mit mehreren Ausgabekanälen."
  },
  {
    question: "Wie lange dauert Software-Entwicklung?",
    answer: "Entwicklungszeiten: MVP/Prototyp 2-3 Monate, Standard-Web-App 3-6 Monate, komplexe Software 6-12+ Monate. Wir arbeiten in 2-Wochen-Sprints mit regelmäßigen Demos. Genaue Schätzung nach Requirements-Analyse möglich."
  },
  {
    question: "Vercel oder AWS - was ist besser?",
    answer: "Vercel: optimal für Next.js, einfaches Deployment, automatische Skalierung, Edge-Functions. AWS: mehr Kontrolle, günstig bei Scale, komplexer zu verwalten. Für Next.js-Projekte empfehlen wir Vercel, für komplexe Infrastruktur AWS/GCP."
  },
  {
    question: "Was ist CI/CD?",
    answer: "CI/CD (Continuous Integration/Continuous Deployment) automatisiert: Code-Tests bei jedem Commit, automatische Builds, Deployment auf Staging/Production. Vorteile: weniger Fehler, schnellere Releases, konsistente Qualität. Tools: GitHub Actions, GitLab CI, CircleCI."
  },
]

const softwareFAQsEn: FAQItem[] = [
  {
    question: "How much does app development cost?",
    answer: "App development costs: Simple app €15,000-30,000, medium complexity €30,000-60,000, complex enterprise app €60,000-150,000+. Cross-platform (React Native, Flutter) is 30-40% cheaper than native development for iOS and Android separately."
  },
  {
    question: "Next.js or React - which is better?",
    answer: "Next.js is built on React and offers: Server-Side Rendering (better for SEO), automatic code splitting, API routes, image optimization. For websites and web apps, we recommend Next.js. For SPAs without SEO needs, pure React is often sufficient."
  },
  {
    question: "What is a headless CMS?",
    answer: "A headless CMS (e.g., Payload, Contentful, Strapi) separates content management from frontend. Benefits: flexible frontend (React, Vue), better performance, omnichannel use (web, app, IoT). Ideal for complex projects with multiple output channels."
  },
  {
    question: "How long does software development take?",
    answer: "Development times: MVP/prototype 2-3 months, standard web app 3-6 months, complex software 6-12+ months. We work in 2-week sprints with regular demos. Accurate estimates possible after requirements analysis."
  },
  {
    question: "Vercel or AWS - which is better?",
    answer: "Vercel: optimal for Next.js, simple deployment, automatic scaling, edge functions. AWS: more control, cost-effective at scale, more complex to manage. For Next.js projects, we recommend Vercel; for complex infrastructure, AWS/GCP."
  },
  {
    question: "What is CI/CD?",
    answer: "CI/CD (Continuous Integration/Continuous Deployment) automates: code tests on every commit, automatic builds, deployment to staging/production. Benefits: fewer errors, faster releases, consistent quality. Tools: GitHub Actions, GitLab CI, CircleCI."
  },
]

const strategieFAQsDe: FAQItem[] = [
  {
    question: "Was ist der Unterschied zwischen UI und UX?",
    answer: "UX (User Experience) ist das Gesamterlebnis: Wie fühlt sich die Nutzung an? Ist es intuitiv? UI (User Interface) ist die visuelle Gestaltung: Buttons, Farben, Layout. UX ist das 'Wie es funktioniert', UI ist das 'Wie es aussieht'. Beide müssen zusammenarbeiten."
  },
  {
    question: "Wie erstelle ich eine User Persona?",
    answer: "Persona erstellen: 1) Kundendaten sammeln (Interviews, Analytics, Umfragen), 2) Muster identifizieren (Demografie, Verhalten, Ziele), 3) Persona-Profil erstellen (Name, Foto, Background, Pain Points, Goals), 4) Mit Team validieren. 3-5 Personas sind typisch."
  },
  {
    question: "Was ist Customer Journey Mapping?",
    answer: "Customer Journey Mapping visualisiert alle Touchpoints eines Kunden: von Awareness (erste Berührung) über Consideration (Recherche) zu Decision (Kauf) und Retention (Loyalität). Zeigt Chancen und Probleme in der Kundenreise auf."
  },
  {
    question: "Wie verbessere ich die Conversion Rate?",
    answer: "Conversion-Optimierung: klare Value Proposition, reduzierte Formularfelder, Trust Signals (Testimonials, Logos), schnelle Ladezeiten, mobile Optimierung, A/B-Tests, Exit-Intent Popups, Social Proof. Typische Conversion-Rate: 2-5% (E-Commerce), 10-25% (Landing Pages)."
  },
  {
    question: "Was kostet eine Digitalstrategie?",
    answer: "Digitalstrategie-Projekte: Zielgruppenanalyse €1.500-4.000, Customer Journey Mapping €2.000-5.000, umfassende Digitalstrategie €5.000-15.000. ROI typischerweise 3-10x durch effizienteres Marketing und höhere Conversion-Rates."
  },
  {
    question: "Wie messe ich Marketing-Erfolg?",
    answer: "Wichtige KPIs: Traffic (Sessions, Users), Engagement (Bounce Rate, Time on Site), Conversions (Leads, Sales), Cost per Acquisition (CPA), Return on Ad Spend (ROAS), Customer Lifetime Value (CLV). Tools: Google Analytics 4, Search Console, HubSpot."
  },
]

const strategieFAQsEn: FAQItem[] = [
  {
    question: "What is the difference between UI and UX?",
    answer: "UX (User Experience) is the overall experience: How does using it feel? Is it intuitive? UI (User Interface) is the visual design: buttons, colors, layout. UX is 'how it works', UI is 'how it looks'. Both must work together."
  },
  {
    question: "How do I create a user persona?",
    answer: "Create a persona: 1) Collect customer data (interviews, analytics, surveys), 2) Identify patterns (demographics, behavior, goals), 3) Create persona profile (name, photo, background, pain points, goals), 4) Validate with team. 3-5 personas are typical."
  },
  {
    question: "What is customer journey mapping?",
    answer: "Customer journey mapping visualizes all customer touchpoints: from Awareness (first contact) through Consideration (research) to Decision (purchase) and Retention (loyalty). Shows opportunities and problems in the customer journey."
  },
  {
    question: "How do I improve conversion rate?",
    answer: "Conversion optimization: clear value proposition, reduced form fields, trust signals (testimonials, logos), fast loading times, mobile optimization, A/B tests, exit-intent popups, social proof. Typical conversion rate: 2-5% (e-commerce), 10-25% (landing pages)."
  },
  {
    question: "How much does a digital strategy cost?",
    answer: "Digital strategy projects: Target audience analysis €1,500-4,000, customer journey mapping €2,000-5,000, comprehensive digital strategy €5,000-15,000. ROI typically 3-10x through more efficient marketing and higher conversion rates."
  },
  {
    question: "How do I measure marketing success?",
    answer: "Important KPIs: Traffic (Sessions, Users), Engagement (Bounce Rate, Time on Site), Conversions (Leads, Sales), Cost per Acquisition (CPA), Return on Ad Spend (ROAS), Customer Lifetime Value (CLV). Tools: Google Analytics 4, Search Console, HubSpot."
  },
]

const contentFAQsDe: FAQItem[] = [
  {
    question: "Wie oft sollte man bloggen für SEO?",
    answer: "Qualität vor Quantität: 1-2 hochwertige Artikel pro Woche sind besser als täglich oberflächliche Posts. Für neue Websites: 4-8 Artikel/Monat zum Start, dann 2-4/Monat kontinuierlich. Wichtiger als Frequenz: Suchintent treffen und echten Mehrwert bieten."
  },
  {
    question: "Was kostet Copywriting pro Seite?",
    answer: "Copywriting-Preise: Website-Seite €150-500, Blog-Artikel (1000+ Wörter) €200-400, Landing Page €300-600, Produktbeschreibungen €50-150/Stück. Preise variieren nach Recherche-Aufwand, Branche und SEO-Anforderungen."
  },
  {
    question: "Wie optimiere ich Bilder für Web?",
    answer: "Bild-Optimierung: WebP-Format nutzen (30% kleiner als JPEG), maximale Breite 1920px, Kompression 80-85%, Lazy Loading aktivieren, beschreibende Dateinamen, Alt-Texte für SEO. Tools: Squoosh, TinyPNG, Next.js Image-Komponente."
  },
  {
    question: "Video oder Text - was funktioniert besser?",
    answer: "Beides hat seinen Platz: Text für SEO und schnelle Information, Video für Emotionen und komplexe Erklärungen. Video erhöht Verweildauer (+80%), Text ist besser indexierbar. Ideal: Kombination aus beiden mit Transkript für Videos."
  },
  {
    question: "Was macht guten Content aus?",
    answer: "Guter Content: beantwortet echte Fragen, ist besser als die Konkurrenz, gut strukturiert (Überschriften, Listen), visuell ansprechend, aktuell gehalten, teilbar. E-A-T beachten: Expertise, Authoritativeness, Trustworthiness."
  },
  {
    question: "Wie erstelle ich einen Content-Kalender?",
    answer: "Content-Kalender erstellen: 1) Ziele definieren (Traffic, Leads), 2) Keyword-Recherche für Themen, 3) Content-Formate festlegen, 4) Veröffentlichungsfrequenz planen, 5) Verantwortlichkeiten zuweisen. Tools: Notion, Asana, Google Sheets."
  },
]

const contentFAQsEn: FAQItem[] = [
  {
    question: "How often should you blog for SEO?",
    answer: "Quality over quantity: 1-2 high-quality articles per week are better than daily superficial posts. For new websites: 4-8 articles/month to start, then 2-4/month continuously. More important than frequency: meeting search intent and providing real value."
  },
  {
    question: "How much does copywriting cost per page?",
    answer: "Copywriting prices: Website page €150-500, blog article (1000+ words) €200-400, landing page €300-600, product descriptions €50-150/piece. Prices vary by research effort, industry, and SEO requirements."
  },
  {
    question: "How do I optimize images for web?",
    answer: "Image optimization: use WebP format (30% smaller than JPEG), maximum width 1920px, compression 80-85%, enable lazy loading, descriptive filenames, alt texts for SEO. Tools: Squoosh, TinyPNG, Next.js Image component."
  },
  {
    question: "Video or text - what works better?",
    answer: "Both have their place: Text for SEO and quick information, video for emotions and complex explanations. Video increases time on site (+80%), text is better indexable. Ideal: combination of both with transcript for videos."
  },
  {
    question: "What makes good content?",
    answer: "Good content: answers real questions, is better than competitors, well-structured (headings, lists), visually appealing, kept up-to-date, shareable. Consider E-A-T: Expertise, Authoritativeness, Trustworthiness."
  },
  {
    question: "How do I create a content calendar?",
    answer: "Create content calendar: 1) Define goals (traffic, leads), 2) Keyword research for topics, 3) Set content formats, 4) Plan publication frequency, 5) Assign responsibilities. Tools: Notion, Asana, Google Sheets."
  },
]

// Helper function to get FAQs by locale
export function getBrandingFAQs(locale: string): FAQItem[] {
  return locale === 'en' ? brandingFAQsEn : brandingFAQsDe
}

export function getWebdesignFAQs(locale: string): FAQItem[] {
  return locale === 'en' ? webdesignFAQsEn : webdesignFAQsDe
}

export function getSeoFAQs(locale: string): FAQItem[] {
  return locale === 'en' ? seoFAQsEn : seoFAQsDe
}

export function getSoftwareFAQs(locale: string): FAQItem[] {
  return locale === 'en' ? softwareFAQsEn : softwareFAQsDe
}

export function getStrategieFAQs(locale: string): FAQItem[] {
  return locale === 'en' ? strategieFAQsEn : strategieFAQsDe
}

export function getContentFAQs(locale: string): FAQItem[] {
  return locale === 'en' ? contentFAQsEn : contentFAQsDe
}

// Helper function to get localized FAQs for a service
export function getServiceFAQs(slug: string, locale: string): FAQItem[] | null {
  const faqGetters: Record<string, (locale: string) => FAQItem[]> = {
    'branding': getBrandingFAQs,
    'webdesign': getWebdesignFAQs,
    // NEW SLUGS (Jan 2025)
    'seo-content': getSeoFAQs,
    'web-app-entwicklung': getSoftwareFAQs,
    'digital-marketing': getStrategieFAQs,
    'it-cloud-services': getSoftwareFAQs,
    // LEGACY SLUGS (for backward compatibility during transition)
    'seo-sichtbarkeit': getSeoFAQs,
    'software-entwicklung': getSoftwareFAQs,
    'digitales-marketing': getStrategieFAQs,
    'content-visuals': getContentFAQs,
    'technische-loesungen': getSoftwareFAQs,
  }

  const getter = faqGetters[slug]
  return getter ? getter(locale) : null
}

// ==========================================
// SUBSERVICE FAQs
// ==========================================

// Markenstrategie FAQs
const markenstrategieFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine Markenstrategie-Entwicklung?",
    answer: "Eine professionelle Markenstrategie kostet typischerweise zwischen €5.000 und €25.000, abhängig von Umfang, Komplexität und Unternehmensgröße. Bei GoldenWing beginnen Projekte ab €7.500. In einem kostenlosen Erstgespräch erstellen wir ein individuelles Angebot."
  },
  {
    question: "Wie lange dauert die Entwicklung einer Markenstrategie?",
    answer: "Ein vollständiger Markenstrategie-Prozess dauert in der Regel 6-10 Wochen. Dies umfasst Research, Workshops, Strategieentwicklung und Dokumentation. Schnellere Timelines sind möglich, wenn Ressourcen gebündelt werden."
  },
  {
    question: "Brauche ich eine Markenstrategie, wenn ich schon ein Logo habe?",
    answer: "Ja, unbedingt. Ein Logo ist nur die visuelle Spitze des Eisbergs. Ohne strategisches Fundament fehlt Ihrem Logo die Bedeutung und Konsistenz. Viele Unternehmen haben ein Logo, aber keine Ahnung, wofür ihre Marke eigentlich steht."
  },
  {
    question: "Was ist der Unterschied zwischen Markenstrategie und Corporate Identity?",
    answer: "Markenstrategie ist das 'Warum' und 'Was' – die strategischen Grundlagen. Corporate Identity ist das 'Wie' – die visuelle und verbale Umsetzung dieser Strategie. Erst kommt die Strategie, dann die Identität."
  },
  {
    question: "Wie messe ich den Erfolg einer Markenstrategie?",
    answer: "Erfolg zeigt sich in: Markenbekanntheit (Surveys), Markenpräferenz, Net Promoter Score (NPS), Preis-Premium gegenüber Wettbewerbern, Mitarbeiterzufriedenheit und letztlich in Umsatz und Marktanteil. Wir definieren KPIs zu Beginn des Projekts."
  },
]

const markenstrategieFAQsEn: FAQItem[] = [
  {
    question: "How much does brand strategy development cost?",
    answer: "A professional brand strategy typically costs between €5,000 and €25,000, depending on scope, complexity, and company size. At GoldenWing, projects start from €7,500. We provide a customized quote in a free initial consultation."
  },
  {
    question: "How long does it take to develop a brand strategy?",
    answer: "A complete brand strategy process typically takes 6-10 weeks. This includes research, workshops, strategy development, and documentation. Faster timelines are possible when resources are consolidated."
  },
  {
    question: "Do I need a brand strategy if I already have a logo?",
    answer: "Yes, absolutely. A logo is just the visual tip of the iceberg. Without a strategic foundation, your logo lacks meaning and consistency. Many companies have a logo but no idea what their brand actually stands for."
  },
  {
    question: "What is the difference between brand strategy and corporate identity?",
    answer: "Brand strategy is the 'why' and 'what' – the strategic foundations. Corporate identity is the 'how' – the visual and verbal implementation of this strategy. Strategy comes first, then identity."
  },
  {
    question: "How do I measure the success of a brand strategy?",
    answer: "Success shows in: brand awareness (surveys), brand preference, Net Promoter Score (NPS), price premium over competitors, employee satisfaction, and ultimately in revenue and market share. We define KPIs at the start of the project."
  },
]

// Logo Design FAQs
const logoDesignFAQsDe: FAQItem[] = [
  {
    question: "Was kostet ein professionelles Logo?",
    answer: "Professionelles Logo Design kostet typischerweise zwischen €1.500 und €10.000. Bei GoldenWing starten Logo-Projekte ab €2.500 (inkl. 3 Konzepte, Varianten und alle Formate). Der Preis hängt von Komplexität und Umfang ab."
  },
  {
    question: "Wie lange dauert die Logo-Entwicklung?",
    answer: "Standardmäßig 3-4 Wochen vom Briefing bis zur Finalisierung. Express-Projekte in 1-2 Wochen sind möglich, aber nicht empfohlen – gutes Design braucht Zeit zum Reifen."
  },
  {
    question: "Wie viele Konzepte bekomme ich?",
    answer: "Bei GoldenWing erhalten Sie 3-5 ausgearbeitete Konzepte zur Auswahl. Mehr Konzepte bedeuten nicht bessere Ergebnisse – wir präsentieren nur, wovon wir überzeugt sind."
  },
  {
    question: "Erhalte ich alle Rechte am Logo?",
    answer: "Ja, nach vollständiger Bezahlung erhalten Sie alle Nutzungsrechte (Buy-out). Sie können das Logo uneingeschränkt nutzen und sind nicht an uns gebunden."
  },
  {
    question: "Muss ich das Logo als Marke anmelden?",
    answer: "Empfohlen, aber nicht zwingend. Eine Markenanmeldung schützt vor Nachahmern. Wir beraten Sie und vermitteln bei Bedarf einen Markenanwalt."
  },
]

const logoDesignFAQsEn: FAQItem[] = [
  {
    question: "How much does a professional logo cost?",
    answer: "Professional logo design typically costs between €1,500 and €10,000. At GoldenWing, logo projects start from €2,500 (including 3 concepts, variants, and all formats). Price depends on complexity and scope."
  },
  {
    question: "How long does logo development take?",
    answer: "Typically 3-4 weeks from briefing to finalization. Express projects in 1-2 weeks are possible but not recommended – good design needs time to mature."
  },
  {
    question: "How many concepts will I receive?",
    answer: "At GoldenWing, you receive 3-5 developed concepts to choose from. More concepts don't mean better results – we only present what we believe in."
  },
  {
    question: "Do I receive all rights to the logo?",
    answer: "Yes, after full payment you receive all usage rights (buy-out). You can use the logo without restrictions and are not bound to us."
  },
  {
    question: "Do I need to register the logo as a trademark?",
    answer: "Recommended but not mandatory. Trademark registration protects against imitators. We advise you and can connect you with a trademark attorney if needed."
  },
]

// UX/UI Design FAQs
const uxuiDesignFAQsDe: FAQItem[] = [
  {
    question: "Was kostet UX/UI Design?",
    answer: "UX/UI-Projekte variieren stark nach Umfang. Eine einfache Website: €5.000-15.000. Eine komplexe Web-App: €20.000-80.000+. Wir erstellen nach einem Discovery-Workshop ein detailliertes Angebot."
  },
  {
    question: "Wie lange dauert ein UX/UI-Projekt?",
    answer: "Eine Website: 4-8 Wochen. Eine Web-App: 8-16 Wochen. Ein umfassendes Produkt mit Research: 3-6 Monate. Agile Projekte laufen in Sprints."
  },
  {
    question: "Brauche ich UX Research, oder reicht das Design?",
    answer: "Research ist keine Kür, sondern Pflicht. Ohne zu verstehen, wer Ihre Nutzer sind und was sie brauchen, ist Design Raterei. Mindestens User Interviews empfehlen wir immer."
  },
  {
    question: "Was ist ein Design System und brauche ich eins?",
    answer: "Ein Design System ist eine Bibliothek wiederverwendbarer Komponenten (Buttons, Formulare, Cards). Es lohnt sich für Produkte, die wachsen oder von mehreren Teams genutzt werden. Für einzelne Websites ist es optional."
  },
  {
    question: "Macht ihr auch die Entwicklung?",
    answer: "Ja, wir können das Design auch implementieren (Next.js, WordPress, React). Oder wir arbeiten mit Ihren Entwicklern zusammen – Handoff erfolgt in Figma."
  },
]

const uxuiDesignFAQsEn: FAQItem[] = [
  {
    question: "How much does UX/UI design cost?",
    answer: "UX/UI projects vary greatly in scope. A simple website: €5,000-15,000. A complex web app: €20,000-80,000+. We provide a detailed quote after a discovery workshop."
  },
  {
    question: "How long does a UX/UI project take?",
    answer: "A website: 4-8 weeks. A web app: 8-16 weeks. A comprehensive product with research: 3-6 months. Agile projects run in sprints."
  },
  {
    question: "Do I need UX research, or is just the design enough?",
    answer: "Research is not optional, it's essential. Without understanding who your users are and what they need, design is guesswork. We always recommend at least user interviews."
  },
  {
    question: "What is a design system and do I need one?",
    answer: "A design system is a library of reusable components (buttons, forms, cards). It's worthwhile for products that grow or are used by multiple teams. For single websites, it's optional."
  },
  {
    question: "Do you also do the development?",
    answer: "Yes, we can also implement the design (Next.js, WordPress, React). Or we work with your developers – handoff is done in Figma."
  },
]

// WordPress Webdesign FAQs
const wordpressFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine WordPress Website?",
    answer: "Eine professionelle WordPress Website kostet typischerweise €3.000-15.000. Einfache Unternehmenswebsites (5-10 Seiten) starten bei ca. €4.000. Komplexe Projekte mit Shop, Mehrsprachigkeit oder Custom Features können €15.000-30.000 kosten. Wir erstellen nach einem Erstgespräch ein detailliertes Angebot."
  },
  {
    question: "Wie lange dauert die WordPress-Entwicklung?",
    answer: "Eine Standard-Unternehmenswebsite: 4-6 Wochen. Mit Shop (WooCommerce): 6-10 Wochen. Komplexe Portale: 10-16 Wochen. Die größte Variable ist meist die Content-Erstellung auf Kundenseite."
  },
  {
    question: "Kann ich meine WordPress Website selbst pflegen?",
    answer: "Ja, genau dafür ist WordPress gemacht. Sie können Texte, Bilder, Blog-Artikel und Seiten selbstständig bearbeiten. Wir schulen Ihr Team und liefern eine Dokumentation. Für technische Änderungen (neue Funktionen, Design-Anpassungen) sind wir da."
  },
  {
    question: "Ist WordPress sicher?",
    answer: "WordPress selbst ist sicher, wenn es richtig konfiguriert ist. Die meisten Sicherheitsprobleme entstehen durch veraltete Plugins, schwache Passwörter oder schlechtes Hosting. Wir implementieren Security Best Practices und bieten Wartungsverträge für Updates."
  },
  {
    question: "Was ist besser: WordPress oder ein Website-Baukasten wie Wix?",
    answer: "Für kurzfristige, einfache Projekte kann Wix ausreichen. Für professionelle Unternehmenswebsites empfehlen wir WordPress: mehr Flexibilität, bessere SEO, keine monatlichen Plattformgebühren, und Sie besitzen Ihre Website wirklich."
  },
]

const wordpressFAQsEn: FAQItem[] = [
  {
    question: "How much does a WordPress website cost?",
    answer: "A professional WordPress website typically costs €3,000-15,000. Simple business websites (5-10 pages) start at around €4,000. Complex projects with shop, multilingual features, or custom features can cost €15,000-30,000. We provide a detailed quote after an initial consultation."
  },
  {
    question: "How long does WordPress development take?",
    answer: "A standard business website: 4-6 weeks. With shop (WooCommerce): 6-10 weeks. Complex portals: 10-16 weeks. The biggest variable is usually content creation on the client side."
  },
  {
    question: "Can I maintain my WordPress website myself?",
    answer: "Yes, that's exactly what WordPress is made for. You can edit texts, images, blog articles, and pages independently. We train your team and provide documentation. For technical changes (new features, design adjustments), we're here to help."
  },
  {
    question: "Is WordPress secure?",
    answer: "WordPress itself is secure when properly configured. Most security issues arise from outdated plugins, weak passwords, or poor hosting. We implement security best practices and offer maintenance contracts for updates."
  },
  {
    question: "What's better: WordPress or a website builder like Wix?",
    answer: "For short-term, simple projects, Wix may suffice. For professional business websites, we recommend WordPress: more flexibility, better SEO, no monthly platform fees, and you truly own your website."
  },
]

// WooCommerce FAQs
const woocommerceFAQsDe: FAQItem[] = [
  {
    question: "Was kostet ein WooCommerce Shop?",
    answer: "Ein professioneller WooCommerce-Shop kostet €5.000-25.000, abhängig von: Anzahl Produkte, Komplexität (einfach vs. variable Produkte), Design-Anspruch, Integrationen (ERP, CRM). Einfache Shops starten bei ca. €6.000, umfangreiche B2B-Shops bei €15.000+."
  },
  {
    question: "Welche laufenden Kosten hat ein WooCommerce Shop?",
    answer: "Hosting: €20-100/Monat (je nach Traffic). SSL: meist inkludiert. Plugins: €0-500/Jahr (viele sind kostenlos). Payment: ca. 1.4-2.9% + €0.25 pro Transaktion. Wartung: €99-299/Monat (optional)."
  },
  {
    question: "Wie viele Produkte kann WooCommerce verwalten?",
    answer: "WooCommerce kann problemlos 10.000+ Produkte verwalten. Bei sehr großen Katalogen (50.000+) empfehlen wir optimiertes Hosting und eventuell Headless-Architekturen."
  },
  {
    question: "Ist WooCommerce DSGVO-konform?",
    answer: "Mit der richtigen Konfiguration ja. Wir implementieren: Cookie-Banner, Datenschutz-Checkbox, AV-Verträge mit Dienstleistern, IP-Anonymisierung. Rechtliche Texte sollten Sie mit einem Anwalt abstimmen."
  },
  {
    question: "Kann ich von Shopify zu WooCommerce wechseln?",
    answer: "Ja, wir migrieren Shops von Shopify, Magento oder anderen Plattformen. Produkte, Kunden, Bestellhistorie – alles wird übertragen."
  },
]

const woocommerceFAQsEn: FAQItem[] = [
  {
    question: "How much does a WooCommerce shop cost?",
    answer: "A professional WooCommerce shop costs €5,000-25,000, depending on: number of products, complexity (simple vs. variable products), design requirements, integrations (ERP, CRM). Simple shops start at around €6,000, comprehensive B2B shops at €15,000+."
  },
  {
    question: "What are the ongoing costs of a WooCommerce shop?",
    answer: "Hosting: €20-100/month (depending on traffic). SSL: usually included. Plugins: €0-500/year (many are free). Payment: approx. 1.4-2.9% + €0.25 per transaction. Maintenance: €99-299/month (optional)."
  },
  {
    question: "How many products can WooCommerce manage?",
    answer: "WooCommerce can easily manage 10,000+ products. For very large catalogs (50,000+), we recommend optimized hosting and possibly headless architectures."
  },
  {
    question: "Is WooCommerce GDPR compliant?",
    answer: "With proper configuration, yes. We implement: cookie banner, privacy checkbox, data processing agreements with service providers, IP anonymization. Legal texts should be coordinated with a lawyer."
  },
  {
    question: "Can I switch from Shopify to WooCommerce?",
    answer: "Yes, we migrate shops from Shopify, Magento, or other platforms. Products, customers, order history – everything is transferred."
  },
]

// Landingpage FAQs
const landingpageFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine Landingpage?",
    answer: "Eine professionelle Landingpage kostet €1.500-5.000. Einfache Lead-Gen-Pages starten bei ca. €1.500. Komplexe Sales Pages mit viel Copy und Animationen können €4.000-6.000 kosten. Wir bieten auch Landingpage-Pakete (3 Varianten für A/B-Test) an."
  },
  {
    question: "Wie lange dauert die Erstellung einer Landingpage?",
    answer: "Eine Landingpage kann in 1-2 Wochen fertig sein – deutlich schneller als eine komplette Website. Voraussetzung: schnelle Feedback-Zyklen und fertiger Content."
  },
  {
    question: "Was ist eine gute Conversion Rate für Landingpages?",
    answer: "Das hängt von Branche und Traffic-Quelle ab. Durchschnitt: 2-5%. Gute Landingpages: 5-10%. Top-Performer: 10-25%. Wir optimieren kontinuierlich, um Ihre Rate zu verbessern."
  },
  {
    question: "Brauche ich eine Landingpage pro Kampagne?",
    answer: "Idealerweise ja. Eine Landingpage sollte exakt auf die Zielgruppe und die Werbebotschaft abgestimmt sein. 'One size fits all' funktioniert selten. Wir erstellen Template-Systeme für effiziente Kampagnen."
  },
  {
    question: "Was ist A/B-Testing bei Landingpages?",
    answer: "Bei A/B-Testing zeigen Sie verschiedenen Besuchern unterschiedliche Versionen der Landingpage (z.B. andere Headline) und messen, welche besser konvertiert. Das ist der Schlüssel zur kontinuierlichen Optimierung."
  },
]

const landingpageFAQsEn: FAQItem[] = [
  {
    question: "How much does a landing page cost?",
    answer: "A professional landing page costs €1,500-5,000. Simple lead-gen pages start at around €1,500. Complex sales pages with lots of copy and animations can cost €4,000-6,000. We also offer landing page packages (3 variants for A/B testing)."
  },
  {
    question: "How long does it take to create a landing page?",
    answer: "A landing page can be ready in 1-2 weeks – much faster than a complete website. Prerequisites: quick feedback cycles and finished content."
  },
  {
    question: "What is a good conversion rate for landing pages?",
    answer: "This depends on industry and traffic source. Average: 2-5%. Good landing pages: 5-10%. Top performers: 10-25%. We continuously optimize to improve your rate."
  },
  {
    question: "Do I need a landing page per campaign?",
    answer: "Ideally yes. A landing page should be precisely tailored to the target audience and advertising message. 'One size fits all' rarely works. We create template systems for efficient campaigns."
  },
  {
    question: "What is A/B testing for landing pages?",
    answer: "In A/B testing, you show different visitors different versions of the landing page (e.g., different headline) and measure which converts better. This is the key to continuous optimization."
  },
]

// Technisches SEO FAQs
const technischesSeoFAQsDe: FAQItem[] = [
  {
    question: "Was kostet Technisches SEO?",
    answer: "Ein Technical SEO Audit: €1.500-3.000. Implementierung der Fixes: €2.000-8.000 (abhängig von CMS und Aufwand). Laufende technische Betreuung: €300-800/Monat."
  },
  {
    question: "Wie lange dauert die technische SEO Optimierung?",
    answer: "Der Audit: 1-2 Wochen. Die Implementierung: 2-8 Wochen, je nach Umfang. Core Web Vitals Verbesserungen wirken innerhalb von Wochen."
  },
  {
    question: "Was sind Core Web Vitals?",
    answer: "Googles Performance-Metriken: LCP (Largest Contentful Paint) < 2,5 Sekunden für Ladezeit, INP (Interaction to Next Paint) < 200ms für Reaktionsschnelligkeit, CLS (Cumulative Layout Shift) < 0,1 für Layout-Stabilität."
  },
  {
    question: "Was sind die häufigsten technischen SEO-Fehler?",
    answer: "Langsame Ladezeiten, fehlende mobile Optimierung, doppelte Inhalte (Duplicate Content), falsche Canonicals, nicht-indexierte wichtige Seiten, kaputte interne Links."
  },
  {
    question: "Kann ich Technisches SEO selbst machen?",
    answer: "Vieles ja – mit Tools wie Screaming Frog, Google Search Console und PageSpeed Insights. Die Interpretation der Daten und richtige Priorisierung erfordern aber Erfahrung."
  },
]

const technischesSeoFAQsEn: FAQItem[] = [
  {
    question: "How much does Technical SEO cost?",
    answer: "A Technical SEO Audit: €1,500-3,000. Implementation of fixes: €2,000-8,000 (depending on CMS and effort). Ongoing technical support: €300-800/month."
  },
  {
    question: "How long does technical SEO optimization take?",
    answer: "The audit: 1-2 weeks. Implementation: 2-8 weeks, depending on scope. Core Web Vitals improvements take effect within weeks."
  },
  {
    question: "What are Core Web Vitals?",
    answer: "Google's performance metrics: LCP (Largest Contentful Paint) < 2.5 seconds for loading time, INP (Interaction to Next Paint) < 200ms for responsiveness, CLS (Cumulative Layout Shift) < 0.1 for layout stability."
  },
  {
    question: "What are the most common technical SEO mistakes?",
    answer: "Slow loading times, missing mobile optimization, duplicate content, incorrect canonicals, non-indexed important pages, broken internal links."
  },
  {
    question: "Can I do Technical SEO myself?",
    answer: "Much of it, yes – with tools like Screaming Frog, Google Search Console, and PageSpeed Insights. However, interpreting data and proper prioritization requires experience."
  },
]

// Local SEO FAQs
const localSeoFAQsDe: FAQItem[] = [
  {
    question: "Wie wichtig ist Google Business Profile?",
    answer: "Extrem wichtig für lokale Unternehmen. Ein optimiertes Google Business Profile ist der wichtigste Faktor für Map Pack Rankings (die 3 Ergebnisse unter der Karte). 46% aller Google-Suchen haben lokale Intention."
  },
  {
    question: "Wie bekomme ich mehr Google-Bewertungen?",
    answer: "Aktiv nachfragen: Nach erfolgreichen Projekten Kunden per E-Mail oder QR-Code zur Bewertung einladen. Machen Sie es einfach (direkter Link). Auf alle Bewertungen antworten – auch negative professionell."
  },
  {
    question: "Was kostet Local SEO?",
    answer: "Local SEO Betreuung: €600-1.200/Monat. Einmalige Optimierung: €1.500-3.000. Preis hängt von Anzahl der Standorte und Wettbewerbssituation ab."
  },
  {
    question: "Wie lange dauert Local SEO?",
    answer: "Erste Ergebnisse oft bereits nach 4-8 Wochen (Google Business Optimierung wirkt schnell). Für stabile Top-Positionen planen Sie 3-6 Monate ein."
  },
  {
    question: "Brauche ich für jeden Standort eine eigene Website?",
    answer: "Nicht unbedingt. Separate Standort-Seiten auf einer Domain sind oft effektiver. Jeder Standort sollte eine eigene, lokal optimierte Seite mit NAP-Daten haben."
  },
]

const localSeoFAQsEn: FAQItem[] = [
  {
    question: "How important is Google Business Profile?",
    answer: "Extremely important for local businesses. An optimized Google Business Profile is the most important factor for Map Pack rankings (the 3 results below the map). 46% of all Google searches have local intent."
  },
  {
    question: "How do I get more Google reviews?",
    answer: "Ask actively: After successful projects, invite customers to review via email or QR code. Make it easy (direct link). Respond to all reviews – even negative ones professionally."
  },
  {
    question: "How much does Local SEO cost?",
    answer: "Local SEO services: €600-1,200/month. One-time optimization: €1,500-3,000. Price depends on number of locations and competitive situation."
  },
  {
    question: "How long does Local SEO take?",
    answer: "First results often already after 4-8 weeks (Google Business optimization works quickly). For stable top positions, plan for 3-6 months."
  },
  {
    question: "Do I need a separate website for each location?",
    answer: "Not necessarily. Separate location pages on one domain are often more effective. Each location should have its own, locally optimized page with NAP data."
  },
]

// ==========================================
// TEIL 3: Neue SubService FAQs
// ==========================================

// Naming FAQs
const namingFAQsDe: FAQItem[] = [
  {
    question: "Wie viele Namensvorschläge erhalte ich?",
    answer: "In unserem Standardprozess entwickeln wir 100-200+ Ideen intern, aus denen wir Ihnen die besten 10-15 Kandidaten präsentieren. Bei Bedarf können weitere Runden erfolgen."
  },
  {
    question: "Wie lange dauert ein Naming-Projekt?",
    answer: "Typischerweise 3-5 Wochen vom Briefing bis zur finalen Empfehlung. Express-Projekte in 1-2 Wochen sind gegen Aufpreis möglich."
  },
  {
    question: "Was kostet professionelles Naming?",
    answer: "Naming-Projekte bei GoldenWing starten ab €3.500. Der Preis hängt von Komplexität (national vs. international), Anzahl der Namen und Umfang der Recherche ab."
  },
  {
    question: "Ist die Markenanmeldung im Preis enthalten?",
    answer: "Die Markenanmeldung selbst (DPMA-Gebühren, Anwaltskosten) ist nicht enthalten, aber wir begleiten Sie durch den Prozess und arbeiten mit spezialisierten Markenanwälten zusammen."
  },
  {
    question: "Was, wenn mir keiner der Namen gefällt?",
    answer: "Das passiert selten, wenn das Briefing gut war. Aber: Wir bieten eine zusätzliche Kreativrunde an, falls die erste Präsentation nicht überzeugt."
  },
  {
    question: "Wie wichtig ist die .com-Domain?",
    answer: "Für internationale B2B-Unternehmen und Tech-Startups sehr wichtig. Für lokale Dienstleister kann .at oder .de ausreichen. Wir prüfen alle relevanten Domain-Endungen."
  },
]

const namingFAQsEn: FAQItem[] = [
  {
    question: "How many name suggestions will I receive?",
    answer: "In our standard process, we develop 100-200+ ideas internally, from which we present the best 10-15 candidates. Additional rounds can follow if needed."
  },
  {
    question: "How long does a naming project take?",
    answer: "Typically 3-5 weeks from briefing to final recommendation. Express projects in 1-2 weeks are possible for an additional fee."
  },
  {
    question: "How much does professional naming cost?",
    answer: "Naming projects at GoldenWing start at €3,500. The price depends on complexity (national vs. international), number of names, and scope of research."
  },
  {
    question: "Is trademark registration included?",
    answer: "Trademark registration itself (DPMA fees, attorney costs) is not included, but we guide you through the process and work with specialized trademark attorneys."
  },
  {
    question: "What if I don't like any of the names?",
    answer: "This rarely happens when the briefing was thorough. However, we offer an additional creative round if the first presentation doesn't convince."
  },
  {
    question: "How important is the .com domain?",
    answer: "Very important for international B2B companies and tech startups. For local service providers, .at or .de may suffice. We check all relevant domain extensions."
  },
]

// Corporate Identity FAQs
const corporateIdentityFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine vollständige Corporate Identity?",
    answer: "Eine umfassende CI-Entwicklung kostet €5.000-25.000, abhängig vom Umfang. Bei GoldenWing beginnen CI-Projekte ab €7.500 (Logo + Geschäftsausstattung + CD Manual)."
  },
  {
    question: "Wie lange dauert die CI-Entwicklung?",
    answer: "Rechnen Sie mit 6-10 Wochen für eine vollständige Corporate Identity. Schnellere Timelines sind möglich, aber nicht empfohlen."
  },
  {
    question: "Brauche ich zuerst eine Markenstrategie?",
    answer: "Idealerweise ja. Die Markenstrategie definiert, wofür Ihre Marke steht. Das Corporate Design visualisiert diese Strategie. Wir können beides in einem Projekt kombinieren."
  },
  {
    question: "Was ist der Unterschied zwischen CI und CD?",
    answer: "Corporate Identity (CI) ist das Gesamtkonzept der Unternehmensidentität. Corporate Design (CD) ist der visuelle Teil davon. Oft werden die Begriffe synonym verwendet."
  },
  {
    question: "Was ist im CD Manual enthalten?",
    answer: "Logo-Richtlinien, Farbsystem, Typografie, Bildsprache, Anwendungsbeispiele für Print und Digital – typischerweise 50-100 Seiten."
  },
]

const corporateIdentityFAQsEn: FAQItem[] = [
  {
    question: "How much does a complete Corporate Identity cost?",
    answer: "Comprehensive CI development costs €5,000-25,000, depending on scope. At GoldenWing, CI projects start at €7,500 (logo + stationery + CD manual)."
  },
  {
    question: "How long does CI development take?",
    answer: "Expect 6-10 weeks for a complete Corporate Identity. Faster timelines are possible but not recommended."
  },
  {
    question: "Do I need a brand strategy first?",
    answer: "Ideally yes. Brand strategy defines what your brand stands for. Corporate Design visualizes this strategy. We can combine both in one project."
  },
  {
    question: "What's the difference between CI and CD?",
    answer: "Corporate Identity (CI) is the overall concept of company identity. Corporate Design (CD) is the visual part of it. The terms are often used synonymously."
  },
  {
    question: "What's included in the CD manual?",
    answer: "Logo guidelines, color system, typography, imagery style, application examples for print and digital – typically 50-100 pages."
  },
]

// Brand Guidelines FAQs
const brandGuidelinesFAQsDe: FAQItem[] = [
  {
    question: "Was kosten Brand Guidelines?",
    answer: "Brand Guidelines als eigenständiges Projekt kosten €2.000-5.000, abhängig vom Umfang. Bei einem vollständigen CI-Projekt sind sie typischerweise inklusive."
  },
  {
    question: "Wie umfangreich sollten Brand Guidelines sein?",
    answer: "Ein Startup braucht 20-30 Seiten. Ein mittelständisches Unternehmen 50-80 Seiten. Konzerne haben oft 100+ Seiten."
  },
  {
    question: "Wer sollte die Guidelines nutzen?",
    answer: "Marketing-Team, Designer, PR-Agentur, Social Media Manager, Druckereien, Webentwickler, HR, Vertrieb – jeder, der mit Ihrer Marke arbeitet."
  },
  {
    question: "Wie halte ich die Guidelines aktuell?",
    answer: "Guidelines sollten jährlich überprüft werden. Bei einem Online-Portal können Updates laufend eingepflegt werden."
  },
  {
    question: "In welchem Format liefern Sie die Guidelines?",
    answer: "Standard: PDF (druckbar, interaktiv). Premium: Online Brand Portal. Zusätzlich alle Assets als Download-Paket."
  },
]

const brandGuidelinesFAQsEn: FAQItem[] = [
  {
    question: "How much do Brand Guidelines cost?",
    answer: "Brand Guidelines as a standalone project cost €2,000-5,000, depending on scope. In a complete CI project, they're typically included."
  },
  {
    question: "How comprehensive should Brand Guidelines be?",
    answer: "A startup needs 20-30 pages. A mid-sized company 50-80 pages. Corporations often have 100+ pages."
  },
  {
    question: "Who should use the guidelines?",
    answer: "Marketing team, designers, PR agency, social media managers, print shops, web developers, HR, sales – everyone working with your brand."
  },
  {
    question: "How do I keep the guidelines current?",
    answer: "Guidelines should be reviewed annually. With an online portal, updates can be made continuously."
  },
  {
    question: "What format do you deliver the guidelines in?",
    answer: "Standard: PDF (printable, interactive). Premium: Online Brand Portal. Plus all assets as a download package."
  },
]

// Elementor FAQs
const elementorFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine Elementor-Website?",
    answer: "Elementor-Websites sind oft günstiger als komplett custom-codierte Seiten. Rechnen Sie mit €2.500-10.000 für eine Unternehmenswebsite."
  },
  {
    question: "Ist Elementor langsam?",
    answer: "Elementor kann Performance-Probleme verursachen, wenn es falsch eingesetzt wird. Mit richtiger Konfiguration erreichen wir PageSpeed-Scores von 90+."
  },
  {
    question: "Kann ich die Seite selbst bearbeiten?",
    answer: "Ja, das ist der große Vorteil. Elementor ist intuitiv – nach einer kurzen Schulung können Sie Texte, Bilder und sogar Layouts selbst anpassen."
  },
  {
    question: "Elementor oder Gutenberg?",
    answer: "Gutenberg ist WordPress' nativer Editor. Für komplexe Layouts und maximale Design-Kontrolle ist Elementor Pro überlegen."
  },
  {
    question: "Brauche ich Elementor Pro oder reicht Free?",
    answer: "Für professionelle Websites empfehlen wir Pro. Der Theme Builder allein ist das Geld wert. Kosten: €59/Jahr für 1 Website."
  },
]

const elementorFAQsEn: FAQItem[] = [
  {
    question: "How much does an Elementor website cost?",
    answer: "Elementor websites are often cheaper than fully custom-coded sites. Expect €2,500-10,000 for a business website."
  },
  {
    question: "Is Elementor slow?",
    answer: "Elementor can cause performance issues when misused. With proper configuration, we achieve PageSpeed scores of 90+."
  },
  {
    question: "Can I edit the site myself?",
    answer: "Yes, that's the big advantage. Elementor is intuitive – after a short training, you can adjust texts, images, and even layouts yourself."
  },
  {
    question: "Elementor or Gutenberg?",
    answer: "Gutenberg is WordPress' native editor. For complex layouts and maximum design control, Elementor Pro is superior."
  },
  {
    question: "Do I need Elementor Pro or is Free enough?",
    answer: "For professional websites, we recommend Pro. The Theme Builder alone is worth the money. Cost: €59/year for 1 website."
  },
]

// E-Mail Marketing FAQs
const emailMarketingFAQsDe: FAQItem[] = [
  {
    question: "Was kostet E-Mail-Marketing?",
    answer: "Setup und Strategie: €2.000-5.000 einmalig. Laufende Betreuung: €500-1.500/Monat. Tool-Kosten: €0-300/Monat."
  },
  {
    question: "Welches Tool empfehlen Sie?",
    answer: "Mailchimp (Einsteiger), ActiveCampaign (gute Automation), Klaviyo (E-Commerce), HubSpot (All-in-one)."
  },
  {
    question: "Wie baue ich eine E-Mail-Liste auf?",
    answer: "Lead Magnets (E-Books, Checklisten), Newsletter-Anmeldung auf Website, Exit-Intent-Popups, Social Media Promotion."
  },
  {
    question: "Was ist eine gute Öffnungsrate?",
    answer: "Durchschnitt: 20-25%. Gute Listen: 30-40%. Unter 15% deutet auf Probleme hin."
  },
  {
    question: "Ist E-Mail-Marketing DSGVO-konform möglich?",
    answer: "Ja, mit Double-Opt-in, klarer Einwilligung, einfacher Abmeldung und Datenschutzerklärung."
  },
]

const emailMarketingFAQsEn: FAQItem[] = [
  {
    question: "How much does email marketing cost?",
    answer: "Setup and strategy: €2,000-5,000 one-time. Ongoing management: €500-1,500/month. Tool costs: €0-300/month."
  },
  {
    question: "Which tool do you recommend?",
    answer: "Mailchimp (beginners), ActiveCampaign (good automation), Klaviyo (e-commerce), HubSpot (all-in-one)."
  },
  {
    question: "How do I build an email list?",
    answer: "Lead magnets (e-books, checklists), newsletter signup on website, exit-intent popups, social media promotion."
  },
  {
    question: "What is a good open rate?",
    answer: "Average: 20-25%. Good lists: 30-40%. Below 15% indicates problems."
  },
  {
    question: "Is email marketing GDPR compliant?",
    answer: "Yes, with double opt-in, clear consent, easy unsubscribe, and privacy policy."
  },
]

// Copywriting FAQs
const copywritingFAQsDe: FAQItem[] = [
  {
    question: "Was kostet Copywriting?",
    answer: "Website-Texte (5-10 Seiten): €1.500-4.000. Einzelne Blogartikel: €200-500. Landingpage-Copy: €500-1.500."
  },
  {
    question: "Wie lange dauert die Texterstellung?",
    answer: "Eine komplette Website: 2-4 Wochen. Ein Blogartikel: 3-5 Tage. Landingpage: 1 Woche."
  },
  {
    question: "Schreiben Sie auch SEO-Texte?",
    answer: "Ja, alle unsere Texte sind SEO-optimiert mit Keywords, Struktur und Meta-Daten."
  },
  {
    question: "In welchen Sprachen bieten Sie Copywriting an?",
    answer: "Deutsch und Englisch als Muttersprache. Andere Sprachen über Partnerübersetzer."
  },
  {
    question: "Wie viele Korrekturschleifen sind inklusive?",
    answer: "Standard: 2 Korrekturschleifen. Weitere gegen Aufpreis."
  },
]

const copywritingFAQsEn: FAQItem[] = [
  {
    question: "How much does copywriting cost?",
    answer: "Website copy (5-10 pages): €1,500-4,000. Individual blog articles: €200-500. Landing page copy: €500-1,500."
  },
  {
    question: "How long does text creation take?",
    answer: "Complete website: 2-4 weeks. Blog article: 3-5 days. Landing page: 1 week."
  },
  {
    question: "Do you also write SEO texts?",
    answer: "Yes, all our texts are SEO-optimized with keywords, structure, and meta data."
  },
  {
    question: "Which languages do you offer copywriting in?",
    answer: "German and English as native. Other languages through partner translators."
  },
  {
    question: "How many revision rounds are included?",
    answer: "Standard: 2 revision rounds. Additional rounds for extra fee."
  },
]

// Content-Planung FAQs
const contentPlanungFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine Content-Strategie?",
    answer: "Content-Strategie mit Redaktionsplan: €2.000-5.000. Mit SEO-Keyword-Research: €3.000-7.000."
  },
  {
    question: "Für welchen Zeitraum planen Sie?",
    answer: "Standard: 3-6 Monate. Wir empfehlen Quartalsplanung mit monatlicher Überprüfung."
  },
  {
    question: "Erstellen Sie auch die Inhalte?",
    answer: "Ja, optional. Die Strategie kann auch als Briefing für Ihr Team dienen."
  },
  {
    question: "Wie oft sollte ich Content veröffentlichen?",
    answer: "Für SEO-Wirkung: mindestens 2-4 Blogartikel/Monat. Für Social Media: 3-5 Posts/Woche."
  },
  {
    question: "Was ist ein Themencluster?",
    answer: "Ein Haupt-Thema (Pillar Page) mit verlinkten Unter-Themen. Dieser Ansatz stärkt Ihre SEO-Autorität."
  },
]

const contentPlanungFAQsEn: FAQItem[] = [
  {
    question: "How much does a content strategy cost?",
    answer: "Content strategy with editorial plan: €2,000-5,000. With SEO keyword research: €3,000-7,000."
  },
  {
    question: "What time period do you plan for?",
    answer: "Standard: 3-6 months. We recommend quarterly planning with monthly review."
  },
  {
    question: "Do you also create the content?",
    answer: "Yes, optionally. The strategy can also serve as a briefing for your team."
  },
  {
    question: "How often should I publish content?",
    answer: "For SEO impact: at least 2-4 blog articles/month. For social media: 3-5 posts/week."
  },
  {
    question: "What is a topic cluster?",
    answer: "A main topic (pillar page) with linked sub-topics. This approach strengthens your SEO authority."
  },
]

// Reels & Social Video FAQs
const reelsFAQsDe: FAQItem[] = [
  {
    question: "Was kostet ein Social Video?",
    answer: "Einzelnes Reel: €300-800. Monatspaket (4-8 Videos): €1.500-3.500. Inkl. Konzept, Dreh, Schnitt."
  },
  {
    question: "Wie lange dauert die Produktion?",
    answer: "Von Briefing bis fertigem Video: 1-2 Wochen. Bei regelmäßiger Zusammenarbeit schneller."
  },
  {
    question: "Muss ich selbst vor die Kamera?",
    answer: "Nicht zwingend. Wir arbeiten auch mit B-Roll, Produktvideos, Animationen oder Sprechern."
  },
  {
    question: "Welche Formate produzieren Sie?",
    answer: "Instagram Reels, TikTok, YouTube Shorts, LinkedIn Video, Facebook Stories – alle gängigen Formate."
  },
  {
    question: "Erstellen Sie auch den Content-Plan dazu?",
    answer: "Ja, optional bieten wir Social Media Redaktionspläne an."
  },
]

const reelsFAQsEn: FAQItem[] = [
  {
    question: "How much does a social video cost?",
    answer: "Single reel: €300-800. Monthly package (4-8 videos): €1,500-3,500. Incl. concept, shooting, editing."
  },
  {
    question: "How long does production take?",
    answer: "From briefing to finished video: 1-2 weeks. Faster with regular collaboration."
  },
  {
    question: "Do I have to be on camera myself?",
    answer: "Not necessarily. We also work with B-roll, product videos, animations, or speakers."
  },
  {
    question: "Which formats do you produce?",
    answer: "Instagram Reels, TikTok, YouTube Shorts, LinkedIn Video, Facebook Stories – all common formats."
  },
  {
    question: "Do you also create the content plan?",
    answer: "Yes, optionally we offer social media editorial plans."
  },
]

// Business-Fotografie FAQs
const fotografieFAQsDe: FAQItem[] = [
  {
    question: "Was kostet ein Business-Fotoshooting?",
    answer: "Halber Tag (4 Stunden): €800-1.500. Ganzer Tag: €1.500-2.500. Inkl. Bildbearbeitung."
  },
  {
    question: "Wie viele Bilder erhalte ich?",
    answer: "Halber Tag: 30-50 bearbeitete Bilder. Ganzer Tag: 60-100 bearbeitete Bilder."
  },
  {
    question: "Wo findet das Shooting statt?",
    answer: "Bei Ihnen im Büro/Unternehmen oder an einem passenden Location. Studiomiete optional."
  },
  {
    question: "Wie lange dauert die Nachbearbeitung?",
    answer: "1-2 Wochen nach dem Shooting für die vollständige Bearbeitung."
  },
  {
    question: "Erhalte ich die Nutzungsrechte?",
    answer: "Ja, nach Bezahlung erhalten Sie alle Nutzungsrechte für Web, Print und Social Media."
  },
]

const fotografieFAQsEn: FAQItem[] = [
  {
    question: "How much does a business photo shoot cost?",
    answer: "Half day (4 hours): €800-1,500. Full day: €1,500-2,500. Including image editing."
  },
  {
    question: "How many images will I receive?",
    answer: "Half day: 30-50 edited images. Full day: 60-100 edited images."
  },
  {
    question: "Where does the shoot take place?",
    answer: "At your office/company or a suitable location. Studio rental optional."
  },
  {
    question: "How long does post-processing take?",
    answer: "1-2 weeks after the shoot for complete editing."
  },
  {
    question: "Do I receive usage rights?",
    answer: "Yes, after payment you receive all usage rights for web, print, and social media."
  },
]

// Formular-Logiken FAQs
const formularFAQsDe: FAQItem[] = [
  {
    question: "Was kostet ein intelligentes Formular?",
    answer: "Einfaches Formular mit Logik: €300-800. Komplexes mehrstufiges Formular: €1.000-3.000. Mit CRM-Integration: +€500-1.500."
  },
  {
    question: "Welche Tools nutzen Sie?",
    answer: "WPForms Pro, Gravity Forms, Custom JavaScript/React – je nach Anforderung."
  },
  {
    question: "Kann das Formular Berechnungen durchführen?",
    answer: "Ja, z.B. Preiskalkulator, ROI-Rechner, Angebotsanfrage mit dynamischer Preisberechnung."
  },
  {
    question: "Werden die Daten in mein CRM übertragen?",
    answer: "Ja, wir integrieren HubSpot, Pipedrive, Salesforce, Mailchimp oder per Webhook/API."
  },
  {
    question: "Sind die Formulare DSGVO-konform?",
    answer: "Ja, mit Checkbox für Datenschutz-Einwilligung, SSL-Verschlüsselung und optionaler Datenanonymisierung."
  },
]

const formularFAQsEn: FAQItem[] = [
  {
    question: "How much does an intelligent form cost?",
    answer: "Simple form with logic: €300-800. Complex multi-step form: €1,000-3,000. With CRM integration: +€500-1,500."
  },
  {
    question: "Which tools do you use?",
    answer: "WPForms Pro, Gravity Forms, Custom JavaScript/React – depending on requirements."
  },
  {
    question: "Can the form perform calculations?",
    answer: "Yes, e.g., price calculator, ROI calculator, quote request with dynamic price calculation."
  },
  {
    question: "Is the data transferred to my CRM?",
    answer: "Yes, we integrate HubSpot, Pipedrive, Salesforce, Mailchimp, or via webhook/API."
  },
  {
    question: "Are the forms GDPR compliant?",
    answer: "Yes, with checkbox for privacy consent, SSL encryption, and optional data anonymization."
  },
]

// Gated Content FAQs
const gatedContentFAQsDe: FAQItem[] = [
  {
    question: "Was kostet ein Gated Content System?",
    answer: "Einfacher Download nach E-Mail-Eingabe: €500-1.000. Vollständiger Kundenbereich: €3.000-10.000."
  },
  {
    question: "Welche Systeme nutzen Sie?",
    answer: "WordPress mit MemberPress/LearnDash, Supabase für Custom-Lösungen, oder bestehende CRM-Integrationen."
  },
  {
    question: "Kann ich sehen, wer was heruntergeladen hat?",
    answer: "Ja, alle Downloads werden getrackt und können an Ihr CRM übergeben werden."
  },
  {
    question: "Ist das System DSGVO-konform?",
    answer: "Ja, mit Double-Opt-in, klaren Einwilligungen und automatischer Datenlöschung nach Wunsch."
  },
  {
    question: "Können Kunden ihre Daten selbst verwalten?",
    answer: "Ja, mit Self-Service-Portal für Passwortänderung, Datendownload und Account-Löschung."
  },
]

const gatedContentFAQsEn: FAQItem[] = [
  {
    question: "How much does a gated content system cost?",
    answer: "Simple download after email entry: €500-1,000. Complete customer portal: €3,000-10,000."
  },
  {
    question: "Which systems do you use?",
    answer: "WordPress with MemberPress/LearnDash, Supabase for custom solutions, or existing CRM integrations."
  },
  {
    question: "Can I see who downloaded what?",
    answer: "Yes, all downloads are tracked and can be passed to your CRM."
  },
  {
    question: "Is the system GDPR compliant?",
    answer: "Yes, with double opt-in, clear consent, and automatic data deletion on request."
  },
  {
    question: "Can customers manage their own data?",
    answer: "Yes, with self-service portal for password change, data download, and account deletion."
  },
]

// Automatisierung FAQs
const automatisierungFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine Automatisierung?",
    answer: "Einfache Automatisierung (2-3 Apps): €300-800. Komplexe Workflows: €1.500-5.000. Laufende Betreuung: €100-300/Monat."
  },
  {
    question: "Welche Tools können verbunden werden?",
    answer: "Über 5.000 Apps: CRM, E-Mail, Kalender, Buchhaltung, Social Media, Projektmanagement, etc."
  },
  {
    question: "Brauche ich Programmierkenntnisse?",
    answer: "Nein, wir richten alles ein. Einfache Anpassungen können Sie danach selbst vornehmen."
  },
  {
    question: "Was sind typische Automatisierungen?",
    answer: "Lead zu CRM, Rechnung nach Bestellung, Willkommens-E-Mail, Social Media Posting, Reporting."
  },
  {
    question: "Wie viel Zeit spare ich?",
    answer: "Typischerweise 5-20 Stunden/Monat pro automatisiertem Prozess."
  },
]

const automatisierungFAQsEn: FAQItem[] = [
  {
    question: "How much does an automation cost?",
    answer: "Simple automation (2-3 apps): €300-800. Complex workflows: €1,500-5,000. Ongoing support: €100-300/month."
  },
  {
    question: "Which tools can be connected?",
    answer: "Over 5,000 apps: CRM, email, calendar, accounting, social media, project management, etc."
  },
  {
    question: "Do I need programming skills?",
    answer: "No, we set everything up. Simple adjustments you can make yourself afterward."
  },
  {
    question: "What are typical automations?",
    answer: "Lead to CRM, invoice after order, welcome email, social media posting, reporting."
  },
  {
    question: "How much time do I save?",
    answer: "Typically 5-20 hours/month per automated process."
  },
]

// API-Integration FAQs
const apiFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine API-Integration?",
    answer: "Standard-Integration (z.B. Payment): €1.000-3.000. Custom API-Entwicklung: €3.000-15.000+."
  },
  {
    question: "Welche APIs können Sie anbinden?",
    answer: "Nahezu alle modernen APIs: Zahlungsanbieter, CRM, ERP, Social Media, Versand, Buchhaltung."
  },
  {
    question: "Wie lange dauert eine Integration?",
    answer: "Standard-Integration: 1-2 Wochen. Komplexe Custom-Entwicklung: 4-12 Wochen."
  },
  {
    question: "Was passiert, wenn die API sich ändert?",
    answer: "Wir bieten Wartungsverträge für laufende Anpassungen und Monitoring."
  },
  {
    question: "Können Sie auch eigene APIs entwickeln?",
    answer: "Ja, wir entwickeln Custom APIs für Ihre Anwendungen."
  },
]

const apiFAQsEn: FAQItem[] = [
  {
    question: "How much does an API integration cost?",
    answer: "Standard integration (e.g., payment): €1,000-3,000. Custom API development: €3,000-15,000+."
  },
  {
    question: "Which APIs can you connect?",
    answer: "Almost all modern APIs: payment providers, CRM, ERP, social media, shipping, accounting."
  },
  {
    question: "How long does an integration take?",
    answer: "Standard integration: 1-2 weeks. Complex custom development: 4-12 weeks."
  },
  {
    question: "What happens if the API changes?",
    answer: "We offer maintenance contracts for ongoing adjustments and monitoring."
  },
  {
    question: "Can you also develop custom APIs?",
    answer: "Yes, we develop custom APIs for your applications."
  },
]

// Cloud & DevOps FAQs
const cloudFAQsDe: FAQItem[] = [
  {
    question: "Was kostet Cloud-Beratung?",
    answer: "Cloud-Strategie und Migration: €5.000-20.000. Laufende Verwaltung: €500-3.000/Monat."
  },
  {
    question: "AWS oder Azure?",
    answer: "Abhängig von Ihren Anforderungen. AWS für Flexibilität, Azure für Microsoft-Integration."
  },
  {
    question: "Was ist CI/CD?",
    answer: "Continuous Integration/Continuous Deployment – automatisierte Tests und Deployments bei jeder Code-Änderung."
  },
  {
    question: "Wie viel kann ich durch Cloud-Optimierung sparen?",
    answer: "Typischerweise 20-50% durch richtige Instanz-Größen, Reserved Instances und Auto-Scaling."
  },
  {
    question: "Bieten Sie 24/7 Support?",
    answer: "Ja, gegen Aufpreis. Standard: Geschäftszeiten-Support."
  },
]

const cloudFAQsEn: FAQItem[] = [
  {
    question: "How much does cloud consulting cost?",
    answer: "Cloud strategy and migration: €5,000-20,000. Ongoing management: €500-3,000/month."
  },
  {
    question: "AWS or Azure?",
    answer: "Depends on your requirements. AWS for flexibility, Azure for Microsoft integration."
  },
  {
    question: "What is CI/CD?",
    answer: "Continuous Integration/Continuous Deployment – automated tests and deployments with every code change."
  },
  {
    question: "How much can I save through cloud optimization?",
    answer: "Typically 20-50% through proper instance sizing, reserved instances, and auto-scaling."
  },
  {
    question: "Do you offer 24/7 support?",
    answer: "Yes, for an additional fee. Standard: business hours support."
  },
]

// Mobile Apps FAQs
const mobileFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine App-Entwicklung?",
    answer: "Einfache App: €15.000-40.000. Mittlere Komplexität: €40.000-100.000. Enterprise: €100.000+."
  },
  {
    question: "Native oder Cross-Platform?",
    answer: "Cross-Platform (React Native, Flutter) spart Kosten bei 90% der Funktionalität. Native für maximale Performance."
  },
  {
    question: "Wie lange dauert die Entwicklung?",
    answer: "MVP: 3-4 Monate. Vollständige App: 6-12 Monate."
  },
  {
    question: "Übernehmen Sie auch die Veröffentlichung?",
    answer: "Ja, wir kümmern uns um App Store und Google Play Submission."
  },
  {
    question: "Wie funktioniert Support nach Launch?",
    answer: "Wir bieten Wartungsverträge für Updates, Bug-Fixes und neue Features."
  },
]

const mobileFAQsEn: FAQItem[] = [
  {
    question: "How much does app development cost?",
    answer: "Simple app: €15,000-40,000. Medium complexity: €40,000-100,000. Enterprise: €100,000+."
  },
  {
    question: "Native or cross-platform?",
    answer: "Cross-platform (React Native, Flutter) saves costs with 90% of functionality. Native for maximum performance."
  },
  {
    question: "How long does development take?",
    answer: "MVP: 3-4 months. Complete app: 6-12 months."
  },
  {
    question: "Do you also handle publication?",
    answer: "Yes, we take care of App Store and Google Play submission."
  },
  {
    question: "How does post-launch support work?",
    answer: "We offer maintenance contracts for updates, bug fixes, and new features."
  },
]

// Web Applications FAQs
const webAppFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine Web-Applikation?",
    answer: "MVP: €20.000-50.000. Vollständige SaaS-Plattform: €50.000-200.000+."
  },
  {
    question: "Welche Technologien nutzen Sie?",
    answer: "React/Next.js (Frontend), Node.js/Python (Backend), PostgreSQL/MongoDB (Datenbank)."
  },
  {
    question: "Wie lange dauert die Entwicklung?",
    answer: "MVP: 2-4 Monate. Vollständige Plattform: 6-18 Monate."
  },
  {
    question: "Können Sie bestehende Systeme erweitern?",
    answer: "Ja, wir integrieren in bestehende Infrastruktur oder modernisieren Legacy-Systeme."
  },
  {
    question: "Wie sieht die Zusammenarbeit aus?",
    answer: "Agil in 2-Wochen-Sprints mit regelmäßigen Demos und Feedback-Runden."
  },
]

const webAppFAQsEn: FAQItem[] = [
  {
    question: "How much does a web application cost?",
    answer: "MVP: €20,000-50,000. Complete SaaS platform: €50,000-200,000+."
  },
  {
    question: "Which technologies do you use?",
    answer: "React/Next.js (frontend), Node.js/Python (backend), PostgreSQL/MongoDB (database)."
  },
  {
    question: "How long does development take?",
    answer: "MVP: 2-4 months. Complete platform: 6-18 months."
  },
  {
    question: "Can you extend existing systems?",
    answer: "Yes, we integrate into existing infrastructure or modernize legacy systems."
  },
  {
    question: "What does collaboration look like?",
    answer: "Agile in 2-week sprints with regular demos and feedback rounds."
  },
]

// Desktop Software FAQs
const desktopFAQsDe: FAQItem[] = [
  {
    question: "Was kostet Desktop-Software Entwicklung?",
    answer: "Einfache Anwendung: €20.000-50.000. Komplexe Software: €50.000-150.000+."
  },
  {
    question: "Electron oder Native?",
    answer: "Electron für schnelle Entwicklung und Cross-Platform. Native für maximale Performance."
  },
  {
    question: "Können Sie bestehende Software modernisieren?",
    answer: "Ja, wir migrieren Legacy-Systeme auf moderne Technologien."
  },
  {
    question: "Wie funktioniert die Verteilung?",
    answer: "Über eigene Website, App Stores (Windows/Mac) oder Enterprise-Deployment."
  },
  {
    question: "Bieten Sie Auto-Updates?",
    answer: "Ja, mit automatischer Update-Funktionalität für nahtlose Aktualisierungen."
  },
]

const desktopFAQsEn: FAQItem[] = [
  {
    question: "How much does desktop software development cost?",
    answer: "Simple application: €20,000-50,000. Complex software: €50,000-150,000+."
  },
  {
    question: "Electron or native?",
    answer: "Electron for rapid development and cross-platform. Native for maximum performance."
  },
  {
    question: "Can you modernize existing software?",
    answer: "Yes, we migrate legacy systems to modern technologies."
  },
  {
    question: "How does distribution work?",
    answer: "Via own website, app stores (Windows/Mac), or enterprise deployment."
  },
  {
    question: "Do you offer auto-updates?",
    answer: "Yes, with automatic update functionality for seamless updates."
  },
]

// UI/UX für Software FAQs
const softwareUxFAQsDe: FAQItem[] = [
  {
    question: "Was kostet UI/UX für Software?",
    answer: "Design Sprint (1 Woche): €5.000-10.000. Vollständiges Design-System: €15.000-50.000."
  },
  {
    question: "Wie läuft der Prozess ab?",
    answer: "User Research → Wireframes → Prototyp → Usability Testing → Final Design → Handoff."
  },
  {
    question: "Arbeiten Sie mit unseren Entwicklern zusammen?",
    answer: "Ja, Handoff in Figma mit Spezifikationen und Komponenten-Bibliothek."
  },
  {
    question: "Was ist ein Design-System?",
    answer: "Eine Bibliothek wiederverwendbarer UI-Komponenten für konsistentes Design über die gesamte Anwendung."
  },
  {
    question: "Führen Sie auch Usability-Tests durch?",
    answer: "Ja, mit echten Nutzern, um Probleme früh zu identifizieren."
  },
]

const softwareUxFAQsEn: FAQItem[] = [
  {
    question: "How much does UI/UX for software cost?",
    answer: "Design sprint (1 week): €5,000-10,000. Complete design system: €15,000-50,000."
  },
  {
    question: "How does the process work?",
    answer: "User research → Wireframes → Prototype → Usability testing → Final design → Handoff."
  },
  {
    question: "Do you work with our developers?",
    answer: "Yes, handoff in Figma with specifications and component library."
  },
  {
    question: "What is a design system?",
    answer: "A library of reusable UI components for consistent design across the entire application."
  },
  {
    question: "Do you also conduct usability tests?",
    answer: "Yes, with real users to identify problems early."
  },
]

// QA & Testing FAQs
const qaFAQsDe: FAQItem[] = [
  {
    question: "Was kostet QA?",
    answer: "Manuelles Testing: €50-80/Stunde. Test-Automatisierung Setup: €5.000-20.000."
  },
  {
    question: "Welche Test-Arten bieten Sie an?",
    answer: "Funktionstests, Regression, Performance, Security, Usability, API-Tests."
  },
  {
    question: "Welche Tools nutzen Sie?",
    answer: "Selenium, Cypress, Playwright, Jest, Postman – je nach Technologie-Stack."
  },
  {
    question: "Können Sie in unsere CI/CD-Pipeline integrieren?",
    answer: "Ja, automatisierte Tests bei jedem Commit/Deploy."
  },
  {
    question: "Bieten Sie auch Security-Testing?",
    answer: "Ja, Penetration-Tests und Vulnerability-Scans."
  },
]

const qaFAQsEn: FAQItem[] = [
  {
    question: "How much does QA cost?",
    answer: "Manual testing: €50-80/hour. Test automation setup: €5,000-20,000."
  },
  {
    question: "What types of testing do you offer?",
    answer: "Functional tests, regression, performance, security, usability, API tests."
  },
  {
    question: "Which tools do you use?",
    answer: "Selenium, Cypress, Playwright, Jest, Postman – depending on technology stack."
  },
  {
    question: "Can you integrate into our CI/CD pipeline?",
    answer: "Yes, automated tests with every commit/deploy."
  },
  {
    question: "Do you also offer security testing?",
    answer: "Yes, penetration tests and vulnerability scans."
  },
]

// ==========================================
// Digitale Strategie FAQs (Teil 4 - Ergänzung)
// ==========================================

// Zielgruppenanalyse FAQs
const zielgruppenanalyseFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine Zielgruppenanalyse?",
    answer: "Eine professionelle Zielgruppenanalyse kostet €3.000-8.000, abhängig von Tiefe und Methodik. Workshops mit Buyer Personas starten ab €3.500, umfangreiche Marktforschung mit Interviews bei €6.000+."
  },
  {
    question: "Wie lange dauert eine Zielgruppenanalyse?",
    answer: "Ein kompakter Workshop: 1-2 Tage. Eine vollständige Analyse mit Recherche, Interviews und Auswertung: 3-6 Wochen."
  },
  {
    question: "Was ist eine Buyer Persona?",
    answer: "Eine Buyer Persona ist ein semi-fiktives Profil Ihres idealen Kunden, basierend auf realen Daten: demografische Merkmale, Ziele, Herausforderungen, Kaufverhalten und Mediennutzung."
  },
  {
    question: "Woher kommen die Daten für die Analyse?",
    answer: "Aus mehreren Quellen: bestehende Kundendaten, CRM-Auswertungen, Website-Analytics, Kundeninterviews, Umfragen, Social Media Insights und Wettbewerbsanalyse."
  },
  {
    question: "Wie viele Personas brauche ich?",
    answer: "Die meisten Unternehmen arbeiten effektiv mit 2-4 Hauptpersonas. Mehr ist selten sinnvoll – Fokus schlägt Vollständigkeit."
  },
  {
    question: "Was mache ich mit den Ergebnissen?",
    answer: "Die Personas fließen in alle Marketing-Aktivitäten ein: Content-Strategie, Anzeigentexte, Website-Struktur, Produktentwicklung und Vertriebsgespräche."
  },
]

const zielgruppenanalyseFAQsEn: FAQItem[] = [
  {
    question: "How much does a target audience analysis cost?",
    answer: "A professional target audience analysis costs €3,000-8,000, depending on depth and methodology. Workshops with buyer personas start at €3,500, comprehensive market research with interviews at €6,000+."
  },
  {
    question: "How long does a target audience analysis take?",
    answer: "A compact workshop: 1-2 days. A complete analysis with research, interviews, and evaluation: 3-6 weeks."
  },
  {
    question: "What is a Buyer Persona?",
    answer: "A Buyer Persona is a semi-fictional profile of your ideal customer, based on real data: demographic characteristics, goals, challenges, buying behavior, and media usage."
  },
  {
    question: "Where does the data for the analysis come from?",
    answer: "From multiple sources: existing customer data, CRM evaluations, website analytics, customer interviews, surveys, social media insights, and competitive analysis."
  },
  {
    question: "How many personas do I need?",
    answer: "Most companies work effectively with 2-4 main personas. More is rarely useful – focus beats completeness."
  },
  {
    question: "What do I do with the results?",
    answer: "The personas flow into all marketing activities: content strategy, ad copy, website structure, product development, and sales conversations."
  },
]

// Customer Journey Mapping FAQs
const journeyMappingFAQsDe: FAQItem[] = [
  {
    question: "Was kostet Customer Journey Mapping?",
    answer: "Ein Journey Mapping Workshop: €3.000-6.000. Eine vollständige Analyse mit allen Touchpoints und Optimierungsempfehlungen: €5.000-12.000."
  },
  {
    question: "Wie lange dauert die Erstellung einer Customer Journey Map?",
    answer: "Workshop-basiert: 1-2 Tage. Mit Datenanalyse und Interviews: 3-6 Wochen für eine vollständige Map mit Handlungsempfehlungen."
  },
  {
    question: "Was ist eine Customer Journey?",
    answer: "Die Customer Journey beschreibt alle Berührungspunkte (Touchpoints) eines Kunden mit Ihrem Unternehmen – von der ersten Wahrnehmung bis zum Wiederkauf und der Weiterempfehlung."
  },
  {
    question: "Welche Phasen hat eine typische Customer Journey?",
    answer: "Awareness (Aufmerksamkeit), Consideration (Überlegung), Decision (Entscheidung), Purchase (Kauf), Retention (Bindung), Advocacy (Empfehlung). Jede Phase hat eigene Touchpoints und Bedürfnisse."
  },
  {
    question: "Brauche ich mehrere Journey Maps?",
    answer: "Oft ja – verschiedene Personas haben unterschiedliche Journeys. Auch B2B und B2C Kunden oder verschiedene Produktlinien können separate Maps erfordern."
  },
  {
    question: "Wie nutze ich die Journey Map praktisch?",
    answer: "Zur Identifikation von Pain Points, Optimierung von Touchpoints, Content-Planung für jede Phase, Verbesserung der Conversion Rate und Priorisierung von Marketing-Maßnahmen."
  },
]

const journeyMappingFAQsEn: FAQItem[] = [
  {
    question: "How much does Customer Journey Mapping cost?",
    answer: "A Journey Mapping workshop: €3,000-6,000. A complete analysis with all touchpoints and optimization recommendations: €5,000-12,000."
  },
  {
    question: "How long does it take to create a Customer Journey Map?",
    answer: "Workshop-based: 1-2 days. With data analysis and interviews: 3-6 weeks for a complete map with action recommendations."
  },
  {
    question: "What is a Customer Journey?",
    answer: "The Customer Journey describes all touchpoints of a customer with your company – from first awareness to repeat purchase and referral."
  },
  {
    question: "What phases does a typical Customer Journey have?",
    answer: "Awareness, Consideration, Decision, Purchase, Retention, Advocacy. Each phase has its own touchpoints and needs."
  },
  {
    question: "Do I need multiple Journey Maps?",
    answer: "Often yes – different personas have different journeys. B2B and B2C customers or different product lines may also require separate maps."
  },
  {
    question: "How do I use the Journey Map practically?",
    answer: "To identify pain points, optimize touchpoints, plan content for each phase, improve conversion rate, and prioritize marketing measures."
  },
]

// Positionierungsberatung FAQs
const positionierungFAQsDe: FAQItem[] = [
  {
    question: "Was kostet Positionierungsberatung?",
    answer: "Positionierungs-Workshops starten bei €5.000. Eine vollständige Positionierungsstrategie mit Wettbewerbsanalyse und Implementierungsplan kostet €8.000-15.000."
  },
  {
    question: "Wie lange dauert ein Positionierungsprojekt?",
    answer: "Ein intensiver Workshop: 2-3 Tage. Ein vollständiges Projekt mit Analyse, Strategie und Implementierungsbegleitung: 4-8 Wochen."
  },
  {
    question: "Was ist Markenpositionierung?",
    answer: "Positionierung definiert, wofür Ihre Marke im Kopf der Zielgruppe steht – was Sie einzigartig macht und warum Kunden Sie statt der Konkurrenz wählen sollten."
  },
  {
    question: "Brauche ich eine Neupositionierung?",
    answer: "Typische Anzeichen: sinkende Margen, austauschbares Angebot, unklare Differenzierung, neue Wettbewerber, verändertes Kundenverhalten oder Wachstumsstagnation."
  },
  {
    question: "Was ist ein Positionierungsstatement?",
    answer: "Ein prägnanter Satz, der Ihre Zielgruppe, Kategorie, Differenzierung und den Kundennutzen auf den Punkt bringt – die Essenz Ihrer Marke in 1-2 Sätzen."
  },
  {
    question: "Wie setze ich die Positionierung um?",
    answer: "Die Positionierung fließt in alle Bereiche: Messaging, Website, Marketing-Materialien, Vertrieb, Produktentwicklung und interne Kommunikation."
  },
]

const positionierungFAQsEn: FAQItem[] = [
  {
    question: "How much does positioning consulting cost?",
    answer: "Positioning workshops start at €5,000. A complete positioning strategy with competitive analysis and implementation plan costs €8,000-15,000."
  },
  {
    question: "How long does a positioning project take?",
    answer: "An intensive workshop: 2-3 days. A complete project with analysis, strategy, and implementation support: 4-8 weeks."
  },
  {
    question: "What is brand positioning?",
    answer: "Positioning defines what your brand stands for in the minds of your target audience – what makes you unique and why customers should choose you over competitors."
  },
  {
    question: "Do I need repositioning?",
    answer: "Typical signs: declining margins, interchangeable offerings, unclear differentiation, new competitors, changed customer behavior, or growth stagnation."
  },
  {
    question: "What is a positioning statement?",
    answer: "A concise sentence that captures your target audience, category, differentiation, and customer benefit – the essence of your brand in 1-2 sentences."
  },
  {
    question: "How do I implement the positioning?",
    answer: "Positioning flows into all areas: messaging, website, marketing materials, sales, product development, and internal communication."
  },
]

// Funnel-Strategien FAQs
const funnelFAQsDe: FAQItem[] = [
  {
    question: "Was kostet eine Funnel-Strategie?",
    answer: "Funnel-Konzeption: €3.000-8.000. Vollständige Implementierung mit Landingpages, E-Mails und Automation: €8.000-20.000+, je nach Komplexität."
  },
  {
    question: "Wie lange dauert die Funnel-Erstellung?",
    answer: "Strategie und Konzept: 2-4 Wochen. Vollständige Implementierung: 6-12 Wochen, abhängig von Umfang und Content-Erstellung."
  },
  {
    question: "Was ist ein Marketing Funnel?",
    answer: "Ein Funnel ist der systematische Weg, den Interessenten vom ersten Kontakt bis zum Kauf (und darüber hinaus) durchlaufen – optimiert für maximale Conversion in jeder Phase."
  },
  {
    question: "Was bedeutet TOFU, MOFU, BOFU?",
    answer: "Top of Funnel (Awareness), Middle of Funnel (Consideration), Bottom of Funnel (Decision). Jede Phase braucht anderen Content: informativ → vergleichend → überzeugend."
  },
  {
    question: "Welche Tools brauche ich für Funnels?",
    answer: "Landingpage-Builder, E-Mail-Marketing-Tool mit Automation, CRM, Analytics. Wir empfehlen oft: WordPress + ActiveCampaign oder HubSpot für All-in-one."
  },
  {
    question: "Wie messe ich den Funnel-Erfolg?",
    answer: "Conversion Rate pro Phase, Cost per Lead, Customer Acquisition Cost, Time to Conversion, Funnel Velocity. Wir richten Tracking und Reporting ein."
  },
]

const funnelFAQsEn: FAQItem[] = [
  {
    question: "How much does a funnel strategy cost?",
    answer: "Funnel conception: €3,000-8,000. Complete implementation with landing pages, emails, and automation: €8,000-20,000+, depending on complexity."
  },
  {
    question: "How long does funnel creation take?",
    answer: "Strategy and concept: 2-4 weeks. Complete implementation: 6-12 weeks, depending on scope and content creation."
  },
  {
    question: "What is a Marketing Funnel?",
    answer: "A funnel is the systematic path prospects take from first contact to purchase (and beyond) – optimized for maximum conversion at each phase."
  },
  {
    question: "What does TOFU, MOFU, BOFU mean?",
    answer: "Top of Funnel (Awareness), Middle of Funnel (Consideration), Bottom of Funnel (Decision). Each phase needs different content: informative → comparative → persuasive."
  },
  {
    question: "Which tools do I need for funnels?",
    answer: "Landing page builder, email marketing tool with automation, CRM, analytics. We often recommend: WordPress + ActiveCampaign or HubSpot for all-in-one."
  },
  {
    question: "How do I measure funnel success?",
    answer: "Conversion rate per phase, cost per lead, customer acquisition cost, time to conversion, funnel velocity. We set up tracking and reporting."
  },
]

// Helper function to get SubService FAQs
export function getSubServiceFAQs(slug: string, locale: string): FAQItem[] | null {
  const subServiceFAQs: Record<string, { de: FAQItem[]; en: FAQItem[] }> = {
    // ========================================
    // NEW STRUCTURE (Jan 2025) - Current Slugs
    // ========================================
    // Branding (4 sub-services)
    'markenstrategie-positionierung': { de: markenstrategieFAQsDe, en: markenstrategieFAQsEn },
    'visuelle-identitaet': { de: corporateIdentityFAQsDe, en: corporateIdentityFAQsEn },
    'markenrichtlinien-vorlagen': { de: brandGuidelinesFAQsDe, en: brandGuidelinesFAQsEn },
    'rebranding': { de: markenstrategieFAQsDe, en: markenstrategieFAQsEn }, // Use brand strategy FAQs
    // Webdesign (5 sub-services)
    'informationsarchitektur': { de: uxuiDesignFAQsDe, en: uxuiDesignFAQsEn },
    'ux-konzepte-prototypen': { de: uxuiDesignFAQsDe, en: uxuiDesignFAQsEn },
    'ui-design-designsysteme': { de: uxuiDesignFAQsDe, en: uxuiDesignFAQsEn },
    'webentwicklung-cms': { de: wordpressFAQsDe, en: wordpressFAQsEn },
    'barrierefreiheit-performance': { de: webdesignFAQsDe, en: webdesignFAQsEn },
    // Digital Marketing (4 sub-services)
    'kampagnenstrategie-funnel': { de: funnelFAQsDe, en: funnelFAQsEn },
    'paid-media-content-kampagnen': { de: strategieFAQsDe, en: strategieFAQsEn },
    'email-marketing-automatisierung': { de: emailMarketingFAQsDe, en: emailMarketingFAQsEn },
    'tracking-optimierung': { de: technischesSeoFAQsDe, en: technischesSeoFAQsEn },
    // SEO & Content (5 sub-services)
    'content-strategie-themenplanung': { de: contentPlanungFAQsDe, en: contentPlanungFAQsEn },
    'content-strukturierung': { de: contentPlanungFAQsDe, en: contentPlanungFAQsEn },
    'redaktionsplaene-content-systeme': { de: contentPlanungFAQsDe, en: contentPlanungFAQsEn },
    'content-produktion': { de: copywritingFAQsDe, en: copywritingFAQsEn },
    'seo-messung-wirkung': { de: technischesSeoFAQsDe, en: technischesSeoFAQsEn },
    // Web- & App-Entwicklung (4 sub-services)
    'technische-architektur': { de: apiFAQsDe, en: apiFAQsEn },
    'entwicklung': { de: webAppFAQsDe, en: webAppFAQsEn },
    'schnittstellen-integrationen': { de: apiFAQsDe, en: apiFAQsEn },
    'qualitaetssicherung-testing': { de: qaFAQsDe, en: qaFAQsEn },
    // IT & Cloud Services (5 sub-services)
    'cloud-architektur-migration': { de: cloudFAQsDe, en: cloudFAQsEn },
    'monitoring-wartung': { de: cloudFAQsDe, en: cloudFAQsEn },
    'sicherheit-backups': { de: cloudFAQsDe, en: cloudFAQsEn },
    'technischer-betrieb-support': { de: cloudFAQsDe, en: cloudFAQsEn },
    'workflow-automation': { de: automatisierungFAQsDe, en: automatisierungFAQsEn },
    // ========================================
    // LEGACY SLUGS (backwards compatibility)
    // ========================================
    'markenstrategie': { de: markenstrategieFAQsDe, en: markenstrategieFAQsEn },
    'naming': { de: namingFAQsDe, en: namingFAQsEn },
    'logo-design': { de: logoDesignFAQsDe, en: logoDesignFAQsEn },
    'corporate-identity': { de: corporateIdentityFAQsDe, en: corporateIdentityFAQsEn },
    'brand-guidelines': { de: brandGuidelinesFAQsDe, en: brandGuidelinesFAQsEn },
    'ux-ui-design': { de: uxuiDesignFAQsDe, en: uxuiDesignFAQsEn },
    'wordpress-webdesign': { de: wordpressFAQsDe, en: wordpressFAQsEn },
    'elementor-entwicklung': { de: elementorFAQsDe, en: elementorFAQsEn },
    'webshops-woocommerce': { de: woocommerceFAQsDe, en: woocommerceFAQsEn },
    'landingpages': { de: landingpageFAQsDe, en: landingpageFAQsEn },
    'zielgruppenanalyse': { de: zielgruppenanalyseFAQsDe, en: zielgruppenanalyseFAQsEn },
    'customer-journey-mapping': { de: journeyMappingFAQsDe, en: journeyMappingFAQsEn },
    'positionierungsberatung': { de: positionierungFAQsDe, en: positionierungFAQsEn },
    'funnel-strategien': { de: funnelFAQsDe, en: funnelFAQsEn },
    'e-mail-marketing': { de: emailMarketingFAQsDe, en: emailMarketingFAQsEn },
    'technisches-seo': { de: technischesSeoFAQsDe, en: technischesSeoFAQsEn },
    'local-seo': { de: localSeoFAQsDe, en: localSeoFAQsEn },
    'copywriting': { de: copywritingFAQsDe, en: copywritingFAQsEn },
    'content-planung': { de: contentPlanungFAQsDe, en: contentPlanungFAQsEn },
    'reels-social-video': { de: reelsFAQsDe, en: reelsFAQsEn },
    'business-fotografie': { de: fotografieFAQsDe, en: fotografieFAQsEn },
    'formular-logiken': { de: formularFAQsDe, en: formularFAQsEn },
    'gated-content': { de: gatedContentFAQsDe, en: gatedContentFAQsEn },
    'automatisierung': { de: automatisierungFAQsDe, en: automatisierungFAQsEn },
    'api-integration': { de: apiFAQsDe, en: apiFAQsEn },
    'cloud-devops': { de: cloudFAQsDe, en: cloudFAQsEn },
    'mobile-apps': { de: mobileFAQsDe, en: mobileFAQsEn },
    'web-applications': { de: webAppFAQsDe, en: webAppFAQsEn },
    'desktop-software': { de: desktopFAQsDe, en: desktopFAQsEn },
    'ui-ux-software': { de: softwareUxFAQsDe, en: softwareUxFAQsEn },
    'qa-testing': { de: qaFAQsDe, en: qaFAQsEn },
  }

  const faqs = subServiceFAQs[slug]
  if (!faqs) return null
  return locale === 'en' ? faqs.en : faqs.de
}

// Backwards compatibility - export German as default
export const brandingFAQs = brandingFAQsDe
export const webdesignFAQs = webdesignFAQsDe
export const seoFAQs = seoFAQsDe
export const softwareFAQs = softwareFAQsDe
export const strategieFAQs = strategieFAQsDe
export const contentFAQs = contentFAQsDe
