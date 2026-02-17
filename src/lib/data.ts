/**
 * Lexikon/Glossar Data - SEO High-Volume Terms
 *
 * Diese Datei enthält die Lexikon-Einträge für das GoldenWing Glossar.
 * Fokus auf hochvolumige SEO-Begriffe für maximalen organischen Traffic.
 */

export interface LexikonEntry {
  slug: string
  searchVolume: number
  difficulty: number
  de: {
    term: string
    shortDefinition: string
    fullDefinition: string
    relatedTerms: string[]
    usageExample?: string
    keyPoints: string[]
    externalLinks?: { title: string; url: string }[]
  }
  en: {
    term: string
    shortDefinition: string
    fullDefinition: string
    relatedTerms: string[]
    usageExample?: string
    keyPoints: string[]
    externalLinks?: { title: string; url: string }[]
  }
  category: 'seo' | 'marketing' | 'design' | 'development' | 'strategy'
}

export const lexikonEntries: LexikonEntry[] = [
  {
    slug: 'seo',
    searchVolume: 4400,
    difficulty: 35,
    category: 'seo',
    de: {
      term: 'SEO (Suchmaschinenoptimierung)',
      shortDefinition: 'SEO ist der Prozess, Websites für Suchmaschinen zu optimieren, um in den organischen Suchergebnissen besser zu ranken.',
      fullDefinition: 'Suchmaschinenoptimierung (SEO) umfasst alle Massnahmen, die darauf abzielen, die Sichtbarkeit einer Website in den unbezahlten Suchergebnissen von Suchmaschinen wie Google zu verbessern. SEO ist ein kontinuierlicher Prozess, der technische Optimierungen, Content-Erstellung und Linkaufbau kombiniert. Das Ziel ist es, für relevante Suchbegriffe auf den vorderen Positionen zu erscheinen und so qualifizierten Traffic zu generieren. SEO unterscheidet sich von SEA (Search Engine Advertising), da keine direkten Kosten pro Klick anfallen.',
      relatedTerms: ['Suchmaschinenoptimierung', 'OnPage-SEO', 'OffPage-SEO', 'Technisches SEO', 'Keywords'],
      usageExample: 'Durch gezielte SEO-Massnahmen konnten wir den organischen Traffic unseres Kunden um 200% steigern.',
      keyPoints: [
        'SEO ist nachhaltig - einmal erreichte Rankings bringen langfristig Traffic',
        'Die drei Säulen: Technik, Content und Backlinks',
        'Google nutzt über 200 Ranking-Faktoren',
        'SEO ist ein Marathon, kein Sprint - Ergebnisse brauchen Zeit',
        'Mobile-First: Google bewertet primär die mobile Version'
      ],
      externalLinks: [
        { title: 'Google Search Central', url: 'https://developers.google.com/search' },
        { title: 'Moz Beginner Guide', url: 'https://moz.com/beginners-guide-to-seo' }
      ]
    },
    en: {
      term: 'SEO (Search Engine Optimization)',
      shortDefinition: 'SEO is the process of optimizing websites to rank better in organic search engine results.',
      fullDefinition: 'Search Engine Optimization (SEO) encompasses all measures aimed at improving the visibility of a website in the unpaid search results of search engines like Google. SEO is a continuous process that combines technical optimizations, content creation, and link building. The goal is to appear in top positions for relevant search terms and generate qualified traffic. SEO differs from SEA (Search Engine Advertising) as there are no direct costs per click.',
      relatedTerms: ['Search Engine Optimization', 'OnPage SEO', 'OffPage SEO', 'Technical SEO', 'Keywords'],
      usageExample: 'Through targeted SEO measures, we were able to increase our client\'s organic traffic by 200%.',
      keyPoints: [
        'SEO is sustainable - once achieved, rankings bring long-term traffic',
        'The three pillars: Technology, Content, and Backlinks',
        'Google uses over 200 ranking factors',
        'SEO is a marathon, not a sprint - results take time',
        'Mobile-First: Google primarily evaluates the mobile version'
      ],
      externalLinks: [
        { title: 'Google Search Central', url: 'https://developers.google.com/search' },
        { title: 'Moz Beginner Guide', url: 'https://moz.com/beginners-guide-to-seo' }
      ]
    }
  },
  {
    slug: 'backlinks',
    searchVolume: 3600,
    difficulty: 28,
    category: 'seo',
    de: {
      term: 'Backlinks',
      shortDefinition: 'Backlinks sind eingehende Links von anderen Websites, die auf Ihre Website verweisen und als Vertrauenssignal für Suchmaschinen dienen.',
      fullDefinition: 'Backlinks (auch eingehende Links oder Inbound Links genannt) sind Hyperlinks von externen Websites, die auf Ihre Website verweisen. Sie gelten als einer der wichtigsten Ranking-Faktoren bei Google, da sie wie Empfehlungen oder Stimmen für Ihre Website fungieren. Nicht alle Backlinks sind gleich wertvoll - Links von thematisch relevanten, autoritativen Websites haben mehr Gewicht als Links von unbekannten oder thematisch unpassenden Seiten. Der Aufbau von Backlinks wird als Linkbuilding bezeichnet und ist ein zentraler Bestandteil der OffPage-SEO.',
      relatedTerms: ['Linkbuilding', 'OffPage-SEO', 'Domain Authority', 'Nofollow', 'Dofollow'],
      usageExample: 'Die Website erhielt einen Backlink von einem renommierten Fachmagazin, was ihre Sichtbarkeit deutlich verbesserte.',
      keyPoints: [
        'Qualität vor Quantität: Ein starker Backlink ist mehr wert als viele schwache',
        'Natürlicher Linkaufbau ist wichtiger als künstlicher',
        'Backlinks sollten thematisch relevant sein',
        'Ankertexte beeinflussen, wofür Sie ranken',
        'Google kann unnatürliche Link-Muster erkennen und abstrafen'
      ]
    },
    en: {
      term: 'Backlinks',
      shortDefinition: 'Backlinks are incoming links from other websites pointing to your website, serving as trust signals for search engines.',
      fullDefinition: 'Backlinks (also called incoming links or inbound links) are hyperlinks from external websites pointing to your website. They are considered one of the most important ranking factors for Google, as they function like recommendations or votes for your website. Not all backlinks are equally valuable - links from thematically relevant, authoritative websites carry more weight than links from unknown or thematically unrelated sites. Building backlinks is called link building and is a central component of off-page SEO.',
      relatedTerms: ['Link Building', 'Off-Page SEO', 'Domain Authority', 'Nofollow', 'Dofollow'],
      usageExample: 'The website received a backlink from a renowned trade magazine, significantly improving its visibility.',
      keyPoints: [
        'Quality over quantity: One strong backlink is worth more than many weak ones',
        'Natural link building is more important than artificial',
        'Backlinks should be thematically relevant',
        'Anchor texts influence what you rank for',
        'Google can detect and penalize unnatural link patterns'
      ]
    }
  },
  {
    slug: 'keywords',
    searchVolume: 2900,
    difficulty: 22,
    category: 'seo',
    de: {
      term: 'Keywords (Schlüsselwörter)',
      shortDefinition: 'Keywords sind Suchbegriffe, die Nutzer in Suchmaschinen eingeben und für die Sie Ihre Website optimieren sollten.',
      fullDefinition: 'Keywords (Schlüsselwörter) sind die Wörter und Phrasen, die Menschen in Suchmaschinen eingeben, wenn sie nach Informationen, Produkten oder Dienstleistungen suchen. Die Keyword-Recherche ist der Ausgangspunkt jeder SEO-Strategie. Sie hilft zu verstehen, wonach die Zielgruppe sucht, wie hoch das Suchvolumen ist und wie stark der Wettbewerb ist. Keywords werden nach Suchintention unterschieden: informational (Wissen), navigational (bestimmte Website finden), transactional (kaufen) und commercial (vergleichen). Die richtige Keyword-Strategie kombiniert Short-Tail-Keywords (kurz, hohes Volumen) mit Long-Tail-Keywords (länger, spezifischer, weniger Wettbewerb).',
      relatedTerms: ['Keyword-Recherche', 'Suchintention', 'Long-Tail-Keywords', 'Short-Tail-Keywords', 'Suchvolumen'],
      usageExample: 'Nach der Keyword-Recherche identifizierten wir "webdesign wien" als primäres Keyword für die Startseite.',
      keyPoints: [
        'Suchintention verstehen: Was will der Nutzer wirklich?',
        'Long-Tail-Keywords haben oft höhere Conversion-Raten',
        'Ein Keyword pro Seite als Hauptfokus',
        'Semantisch verwandte Begriffe miteinbeziehen',
        'Keywords natürlich in den Content integrieren, nicht "stopfen"'
      ]
    },
    en: {
      term: 'Keywords',
      shortDefinition: 'Keywords are search terms that users enter into search engines and for which you should optimize your website.',
      fullDefinition: 'Keywords are the words and phrases that people enter into search engines when looking for information, products, or services. Keyword research is the starting point of every SEO strategy. It helps understand what the target audience is searching for, how high the search volume is, and how strong the competition is. Keywords are differentiated by search intent: informational (knowledge), navigational (finding a specific website), transactional (buying), and commercial (comparing). The right keyword strategy combines short-tail keywords (short, high volume) with long-tail keywords (longer, more specific, less competition).',
      relatedTerms: ['Keyword Research', 'Search Intent', 'Long-Tail Keywords', 'Short-Tail Keywords', 'Search Volume'],
      usageExample: 'After keyword research, we identified "web design vienna" as the primary keyword for the homepage.',
      keyPoints: [
        'Understand search intent: What does the user really want?',
        'Long-tail keywords often have higher conversion rates',
        'One keyword per page as main focus',
        'Include semantically related terms',
        'Integrate keywords naturally into content, don\'t "stuff"'
      ]
    }
  },
  {
    slug: 'content-marketing',
    searchVolume: 2400,
    difficulty: 31,
    category: 'marketing',
    de: {
      term: 'Content Marketing',
      shortDefinition: 'Content Marketing ist eine Marketing-Strategie, die durch wertvolle Inhalte Kunden anzieht und bindet, anstatt direkt zu verkaufen.',
      fullDefinition: 'Content Marketing ist ein strategischer Marketing-Ansatz, der auf die Erstellung und Verbreitung wertvoller, relevanter und konsistenter Inhalte fokussiert ist, um eine klar definierte Zielgruppe anzuziehen und zu binden. Im Gegensatz zu traditioneller Werbung, die direkt zum Kauf auffordert, bietet Content Marketing echten Mehrwert für die Zielgruppe in Form von Informationen, Unterhaltung oder Problemlösungen. Dies baut Vertrauen und Expertise auf, was langfristig zu Kundenbeziehungen und Verkäufen führt. Content Marketing umfasst Blog-Artikel, Videos, Podcasts, Infografiken, E-Books, Webinare und mehr.',
      relatedTerms: ['Content-Strategie', 'Inbound Marketing', 'Blog', 'SEO', 'Storytelling'],
      usageExample: 'Unsere Content-Marketing-Strategie umfasst wöchentliche Blog-Artikel, monatliche Webinare und vierteljährliche E-Books.',
      keyPoints: [
        'Mehrwert statt Werbung: Inhalte müssen dem Leser nutzen',
        'Konsistenz ist entscheidend: Regelmässig veröffentlichen',
        'Inhalte sollten SEO-optimiert sein für organische Reichweite',
        'Content für jede Phase der Customer Journey erstellen',
        'Erfolg messen: Traffic, Engagement, Leads, Conversions'
      ]
    },
    en: {
      term: 'Content Marketing',
      shortDefinition: 'Content marketing is a marketing strategy that attracts and retains customers through valuable content instead of direct selling.',
      fullDefinition: 'Content marketing is a strategic marketing approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience. Unlike traditional advertising that directly prompts purchase, content marketing provides real value to the target audience in the form of information, entertainment, or problem-solving. This builds trust and expertise, leading to long-term customer relationships and sales. Content marketing includes blog articles, videos, podcasts, infographics, e-books, webinars, and more.',
      relatedTerms: ['Content Strategy', 'Inbound Marketing', 'Blog', 'SEO', 'Storytelling'],
      usageExample: 'Our content marketing strategy includes weekly blog articles, monthly webinars, and quarterly e-books.',
      keyPoints: [
        'Value over advertising: Content must benefit the reader',
        'Consistency is key: Publish regularly',
        'Content should be SEO-optimized for organic reach',
        'Create content for each phase of the customer journey',
        'Measure success: Traffic, engagement, leads, conversions'
      ]
    }
  },
  {
    slug: 'webdesign',
    searchVolume: 2400,
    difficulty: 45,
    category: 'design',
    de: {
      term: 'Webdesign',
      shortDefinition: 'Webdesign umfasst die visuelle Gestaltung, Struktur und Benutzerfreundlichkeit von Websites.',
      fullDefinition: 'Webdesign bezeichnet den Prozess der Planung und Erstellung von Websites, einschliesslich Layout, Farben, Schriftarten, Bilder und interaktive Elemente. Modernes Webdesign geht über reine Ästhetik hinaus und berücksichtigt User Experience (UX), Responsive Design für verschiedene Geräte, Barrierefreiheit, Performance und SEO. Ein gutes Webdesign vereint visuelle Anziehungskraft mit Funktionalität und Benutzerfreundlichkeit. Es folgt aktuellen Design-Trends, bleibt aber zeitlos genug, um nicht schnell veraltet zu wirken. Webdesign arbeitet eng mit Webentwicklung zusammen, wobei Design die visuelle Ebene und Entwicklung die technische Umsetzung übernimmt.',
      relatedTerms: ['UX Design', 'UI Design', 'Responsive Design', 'Webentwicklung', 'Landingpage'],
      usageExample: 'Das neue Webdesign verbesserte die Conversion Rate um 35% durch eine klarere Nutzerführung.',
      keyPoints: [
        'Mobile-First: Zuerst für Smartphones designen',
        'Weniger ist mehr: Klare, aufgeräumte Layouts',
        'Schnelle Ladezeiten sind Teil des Designs',
        'Konsistenz in Farben, Schriften und Elementen',
        'Call-to-Actions müssen klar erkennbar sein'
      ]
    },
    en: {
      term: 'Web Design',
      shortDefinition: 'Web design encompasses the visual design, structure, and usability of websites.',
      fullDefinition: 'Web design refers to the process of planning and creating websites, including layout, colors, fonts, images, and interactive elements. Modern web design goes beyond pure aesthetics and considers user experience (UX), responsive design for different devices, accessibility, performance, and SEO. Good web design combines visual appeal with functionality and usability. It follows current design trends but remains timeless enough not to look outdated quickly. Web design works closely with web development, where design handles the visual layer and development handles technical implementation.',
      relatedTerms: ['UX Design', 'UI Design', 'Responsive Design', 'Web Development', 'Landing Page'],
      usageExample: 'The new web design improved the conversion rate by 35% through clearer user guidance.',
      keyPoints: [
        'Mobile-First: Design for smartphones first',
        'Less is more: Clear, clean layouts',
        'Fast loading times are part of design',
        'Consistency in colors, fonts, and elements',
        'Call-to-actions must be clearly recognizable'
      ]
    }
  },
  {
    slug: 'branding',
    searchVolume: 2000,
    difficulty: 38,
    category: 'strategy',
    de: {
      term: 'Branding',
      shortDefinition: 'Branding ist der Prozess, eine einzigartige Markenidentität zu schaffen, die Ihr Unternehmen von der Konkurrenz unterscheidet.',
      fullDefinition: 'Branding umfasst alle Massnahmen zur Entwicklung und Pflege einer Marke. Es geht dabei nicht nur um Logo und Farben, sondern um die gesamte Wahrnehmung eines Unternehmens durch Kunden und Öffentlichkeit. Gutes Branding schafft Wiedererkennung, baut Vertrauen auf und kommuniziert Werte und Persönlichkeit des Unternehmens. Es umfasst visuelle Identität (Logo, Farben, Typografie), verbale Identität (Tonalität, Messaging), Markenwerte, Positionierung und Customer Experience. Starke Marken können höhere Preise verlangen, gewinnen leichter Kunden und haben loyalere Mitarbeiter.',
      relatedTerms: ['Markenidentität', 'Corporate Design', 'Positionierung', 'Logo', 'Markenstrategie'],
      usageExample: 'Durch ein umfassendes Rebranding konnte das Unternehmen eine jüngere Zielgruppe ansprechen.',
      keyPoints: [
        'Branding beginnt mit der Strategie, nicht mit dem Logo',
        'Konsistenz über alle Touchpoints ist entscheidend',
        'Emotionen spielen eine zentrale Rolle',
        'Branding ist ein langfristiger Prozess',
        'Intern und extern muss die Marke gelebt werden'
      ]
    },
    en: {
      term: 'Branding',
      shortDefinition: 'Branding is the process of creating a unique brand identity that differentiates your business from competitors.',
      fullDefinition: 'Branding encompasses all measures for developing and maintaining a brand. It\'s not just about logo and colors, but about the entire perception of a company by customers and the public. Good branding creates recognition, builds trust, and communicates the company\'s values and personality. It includes visual identity (logo, colors, typography), verbal identity (tone, messaging), brand values, positioning, and customer experience. Strong brands can charge higher prices, win customers more easily, and have more loyal employees.',
      relatedTerms: ['Brand Identity', 'Corporate Design', 'Positioning', 'Logo', 'Brand Strategy'],
      usageExample: 'Through comprehensive rebranding, the company was able to appeal to a younger target audience.',
      keyPoints: [
        'Branding starts with strategy, not the logo',
        'Consistency across all touchpoints is crucial',
        'Emotions play a central role',
        'Branding is a long-term process',
        'The brand must be lived internally and externally'
      ]
    }
  },
  {
    slug: 'conversion-rate',
    searchVolume: 1900,
    difficulty: 25,
    category: 'marketing',
    de: {
      term: 'Conversion Rate',
      shortDefinition: 'Die Conversion Rate ist der Prozentsatz der Website-Besucher, die eine gewünschte Aktion durchführen.',
      fullDefinition: 'Die Conversion Rate (Konversionsrate) ist eine der wichtigsten Kennzahlen im Online-Marketing. Sie gibt an, welcher Anteil der Website-Besucher eine gewünschte Aktion (Conversion) ausführt. Diese Aktion kann ein Kauf sein, aber auch eine Newsletter-Anmeldung, das Ausfüllen eines Kontaktformulars oder ein Download. Die Berechnung erfolgt nach der Formel: (Anzahl Conversions / Anzahl Besucher) × 100. Eine typische E-Commerce Conversion Rate liegt zwischen 1-3%, kann aber je nach Branche und Traffic-Quelle stark variieren. Die Optimierung der Conversion Rate wird als CRO (Conversion Rate Optimization) bezeichnet.',
      relatedTerms: ['CRO', 'Conversion', 'A/B-Testing', 'Landingpage', 'Call-to-Action'],
      usageExample: 'Nach der Optimierung der Checkout-Seite stieg die Conversion Rate von 2,1% auf 3,4%.',
      keyPoints: [
        'Berechnung: (Conversions / Besucher) × 100',
        'Verschiedene Conversion-Typen definieren (Makro/Mikro)',
        'Branchenbenchmarks kennen, aber eigene Ziele setzen',
        'A/B-Tests für datenbasierte Optimierung nutzen',
        'User Experience hat direkten Einfluss auf Conversion Rate'
      ]
    },
    en: {
      term: 'Conversion Rate',
      shortDefinition: 'The conversion rate is the percentage of website visitors who complete a desired action.',
      fullDefinition: 'The conversion rate is one of the most important metrics in online marketing. It indicates what proportion of website visitors performs a desired action (conversion). This action can be a purchase, but also a newsletter signup, filling out a contact form, or a download. The calculation follows the formula: (Number of Conversions / Number of Visitors) × 100. A typical e-commerce conversion rate is between 1-3%, but can vary significantly depending on industry and traffic source. Optimization of conversion rate is called CRO (Conversion Rate Optimization).',
      relatedTerms: ['CRO', 'Conversion', 'A/B Testing', 'Landing Page', 'Call-to-Action'],
      usageExample: 'After optimizing the checkout page, the conversion rate increased from 2.1% to 3.4%.',
      keyPoints: [
        'Calculation: (Conversions / Visitors) × 100',
        'Define different conversion types (macro/micro)',
        'Know industry benchmarks, but set your own goals',
        'Use A/B tests for data-driven optimization',
        'User experience directly impacts conversion rate'
      ]
    }
  },
  {
    slug: 'suchmaschinenoptimierung',
    searchVolume: 1300,
    difficulty: 28,
    category: 'seo',
    de: {
      term: 'Suchmaschinenoptimierung',
      shortDefinition: 'Suchmaschinenoptimierung ist der deutsche Begriff für SEO - die Optimierung von Websites für bessere Suchmaschinen-Rankings.',
      fullDefinition: 'Suchmaschinenoptimierung (SEO) ist der Oberbegriff für alle Massnahmen zur Verbesserung der Sichtbarkeit einer Website in den organischen Suchergebnissen. Der Begriff wird im deutschsprachigen Raum synonym mit SEO verwendet. Die Suchmaschinenoptimierung gliedert sich in drei Hauptbereiche: Technische SEO (Crawlability, Ladezeiten, Mobile-Optimierung), OnPage-SEO (Keywords, Content, Meta-Tags, interne Verlinkung) und OffPage-SEO (Backlinks, Brand Mentions). Professionelle Suchmaschinenoptimierung ist ein fortlaufender Prozess, da sich Suchmaschinen-Algorithmen ständig weiterentwickeln und der Wettbewerb nie schläft.',
      relatedTerms: ['SEO', 'OnPage-SEO', 'OffPage-SEO', 'Technisches SEO', 'Google-Ranking'],
      usageExample: 'Die Suchmaschinenoptimierung der Website führte zu einem Anstieg von Platz 15 auf Platz 3 für das Hauptkeyword.',
      keyPoints: [
        'Suchmaschinenoptimierung ist ein Marathon, kein Sprint',
        'Drei Säulen: Technik, OnPage, OffPage',
        'User-Signale werden immer wichtiger',
        'E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness',
        'Lokale Suchmaschinenoptimierung für regionale Unternehmen'
      ]
    },
    en: {
      term: 'Search Engine Optimization',
      shortDefinition: 'Search engine optimization is the full term for SEO - optimizing websites for better search engine rankings.',
      fullDefinition: 'Search Engine Optimization (SEO) is the umbrella term for all measures to improve a website\'s visibility in organic search results. The term is used synonymously with SEO. Search engine optimization is divided into three main areas: Technical SEO (crawlability, loading times, mobile optimization), OnPage SEO (keywords, content, meta tags, internal linking), and OffPage SEO (backlinks, brand mentions). Professional search engine optimization is an ongoing process, as search engine algorithms constantly evolve and competition never sleeps.',
      relatedTerms: ['SEO', 'OnPage SEO', 'OffPage SEO', 'Technical SEO', 'Google Ranking'],
      usageExample: 'The search engine optimization of the website led to a rise from position 15 to position 3 for the main keyword.',
      keyPoints: [
        'Search engine optimization is a marathon, not a sprint',
        'Three pillars: Technology, OnPage, OffPage',
        'User signals are becoming increasingly important',
        'E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness',
        'Local SEO for regional businesses'
      ]
    }
  },
  {
    slug: 'onpage-seo',
    searchVolume: 880,
    difficulty: 18,
    category: 'seo',
    de: {
      term: 'OnPage-SEO',
      shortDefinition: 'OnPage-SEO umfasst alle Optimierungsmassnahmen, die direkt auf der Website durchgeführt werden.',
      fullDefinition: 'OnPage-SEO (auch OnSite-SEO genannt) bezeichnet alle SEO-Massnahmen, die direkt auf der eigenen Website umgesetzt werden. Im Gegensatz zu OffPage-SEO (externe Faktoren wie Backlinks) hat man bei OnPage-SEO die volle Kontrolle. Zu den wichtigsten OnPage-Faktoren gehören: Keyword-optimierte Titles und Meta-Descriptions, strukturierte Überschriften (H1-H6), hochwertiger und relevanter Content, interne Verlinkung, URL-Struktur, Bildoptimierung (Alt-Tags, Komprimierung), strukturierte Daten (Schema Markup) und Page Experience Faktoren wie Core Web Vitals.',
      relatedTerms: ['Meta-Tags', 'Title-Tag', 'H1', 'Interne Verlinkung', 'Content-Optimierung'],
      usageExample: 'Durch OnPage-SEO-Massnahmen wie optimierte Titles und bessere interne Verlinkung stieg das Ranking um 12 Positionen.',
      keyPoints: [
        'Ein Fokus-Keyword pro Seite als Hauptziel',
        'Title-Tag: Wichtigster OnPage-Faktor',
        'Content muss Suchintention erfüllen',
        'Interne Links verteilen Linkjuice',
        'Strukturierte Daten für Rich Snippets nutzen'
      ]
    },
    en: {
      term: 'On-Page SEO',
      shortDefinition: 'On-Page SEO encompasses all optimization measures carried out directly on the website.',
      fullDefinition: 'On-Page SEO (also called On-Site SEO) refers to all SEO measures implemented directly on your own website. Unlike Off-Page SEO (external factors like backlinks), you have full control over On-Page SEO. Key On-Page factors include: keyword-optimized titles and meta descriptions, structured headings (H1-H6), high-quality and relevant content, internal linking, URL structure, image optimization (alt tags, compression), structured data (schema markup), and page experience factors like Core Web Vitals.',
      relatedTerms: ['Meta Tags', 'Title Tag', 'H1', 'Internal Linking', 'Content Optimization'],
      usageExample: 'Through On-Page SEO measures like optimized titles and better internal linking, the ranking rose by 12 positions.',
      keyPoints: [
        'One focus keyword per page as main goal',
        'Title tag: Most important On-Page factor',
        'Content must fulfill search intent',
        'Internal links distribute link juice',
        'Use structured data for rich snippets'
      ]
    }
  },
  {
    slug: 'sea',
    searchVolume: 1900,
    difficulty: 26,
    category: 'marketing',
    de: {
      term: 'SEA (Search Engine Advertising)',
      shortDefinition: 'SEA ist bezahlte Suchmaschinenwerbung, bei der Anzeigen in Suchergebnissen gegen Bezahlung pro Klick geschaltet werden.',
      fullDefinition: 'Search Engine Advertising (SEA), auch Suchmaschinenwerbung genannt, bezeichnet bezahlte Anzeigen in Suchmaschinen wie Google, Bing oder Yahoo. Im Gegensatz zu SEO (Suchmaschinenoptimierung), das organische Rankings verbessert, zahlt man bei SEA für jeden Klick auf die Anzeige (Pay-per-Click/PPC). Die bekannteste SEA-Plattform ist Google Ads (früher AdWords). SEA-Anzeigen erscheinen oberhalb und unterhalb der organischen Suchergebnisse und sind als "Gesponsert" gekennzeichnet. Der grosse Vorteil von SEA: Sofortige Sichtbarkeit. Während SEO Monate für Ergebnisse braucht, können SEA-Kampagnen sofort Traffic generieren. Die Kosten variieren stark je nach Keyword-Wettbewerb - von wenigen Cent bis zu mehreren Euro pro Klick.',
      relatedTerms: ['Google Ads', 'PPC', 'Pay-per-Click', 'SEM', 'Suchmaschinenwerbung', 'CPC'],
      usageExample: 'Durch eine SEA-Kampagne konnten wir sofort auf Position 1 für "Webdesign Wien" erscheinen und 50 qualifizierte Leads im ersten Monat generieren.',
      keyPoints: [
        'SEA = bezahlt, SEO = organisch - beide zusammen sind SEM',
        'Abrechnung nach CPC (Cost per Click) oder CPM (Cost per Mille)',
        'Google Ads ist die dominierende Plattform mit 90%+ Marktanteil',
        'Qualitätsfaktor beeinflusst Position und Kosten',
        'Conversion-Tracking ist essentiell für ROI-Messung',
        'A/B-Tests für Anzeigentexte und Landing Pages nutzen'
      ],
      externalLinks: [
        { title: 'Google Ads Hilfe', url: 'https://support.google.com/google-ads' },
        { title: 'Microsoft Advertising', url: 'https://ads.microsoft.com/' }
      ]
    },
    en: {
      term: 'SEA (Search Engine Advertising)',
      shortDefinition: 'SEA is paid search engine advertising where ads are placed in search results with payment per click.',
      fullDefinition: 'Search Engine Advertising (SEA), also called paid search advertising, refers to paid ads in search engines like Google, Bing, or Yahoo. Unlike SEO (Search Engine Optimization), which improves organic rankings, with SEA you pay for each click on your ad (Pay-per-Click/PPC). The most well-known SEA platform is Google Ads (formerly AdWords). SEA ads appear above and below organic search results and are marked as "Sponsored." The big advantage of SEA: Immediate visibility. While SEO takes months for results, SEA campaigns can generate traffic immediately. Costs vary significantly depending on keyword competition - from a few cents to several euros per click.',
      relatedTerms: ['Google Ads', 'PPC', 'Pay-per-Click', 'SEM', 'Paid Search', 'CPC'],
      usageExample: 'Through an SEA campaign, we could immediately appear in position 1 for "Web Design Vienna" and generate 50 qualified leads in the first month.',
      keyPoints: [
        'SEA = paid, SEO = organic - both together are SEM',
        'Billing by CPC (Cost per Click) or CPM (Cost per Mille)',
        'Google Ads is the dominant platform with 90%+ market share',
        'Quality Score influences position and costs',
        'Conversion tracking is essential for ROI measurement',
        'Use A/B tests for ad copy and landing pages'
      ],
      externalLinks: [
        { title: 'Google Ads Help', url: 'https://support.google.com/google-ads' },
        { title: 'Microsoft Advertising', url: 'https://ads.microsoft.com/' }
      ]
    }
  },
  {
    slug: 'pmax',
    searchVolume: 1300,
    difficulty: 22,
    category: 'marketing',
    de: {
      term: 'Performance Max (PMax)',
      shortDefinition: 'Performance Max ist ein KI-gesteuerter Google Ads Kampagnentyp, der automatisch über alle Google-Kanäle hinweg optimiert.',
      fullDefinition: 'Performance Max (kurz PMax) ist ein automatisierter Kampagnentyp von Google Ads, der 2021 eingeführt wurde. Im Gegensatz zu klassischen Kampagnen, die auf einen Kanal beschränkt sind, nutzt PMax Machine Learning, um Anzeigen über alle Google-Plattformen gleichzeitig auszuspielen: Google Suche, Shopping, Display-Netzwerk, YouTube, Gmail, Maps und Discover. Der Werbetreibende stellt Assets (Texte, Bilder, Videos) zur Verfügung, und Google kombiniert diese automatisch für die beste Performance. PMax ersetzt zunehmend Smart Shopping und lokale Kampagnen. Der Vorteil: Weniger manuelle Arbeit und Zugang zu allen Google-Kanälen. Der Nachteil: Weniger Kontrolle und Transparenz über die Ausspielung.',
      relatedTerms: ['Google Ads', 'Machine Learning', 'Smart Bidding', 'Asset Groups', 'Conversion-Optimierung'],
      usageExample: 'Nach der Migration von Smart Shopping zu Performance Max stieg unser ROAS um 35% bei gleichbleibendem Budget.',
      keyPoints: [
        'PMax nutzt alle Google-Kanäle in einer Kampagne',
        'Asset Groups mit Texten, Bildern und Videos erstellen',
        'Conversion-Ziele klar definieren (Lead, Kauf, etc.)',
        'Mindestbudget von ca. 50€/Tag für aussagekräftige Daten',
        'Audience Signals helfen dem Algorithmus beim Start',
        'Weniger Kontrolle, aber potenziell bessere Performance'
      ],
      externalLinks: [
        { title: 'Google Performance Max Guide', url: 'https://support.google.com/google-ads/answer/10724817' }
      ]
    },
    en: {
      term: 'Performance Max (PMax)',
      shortDefinition: 'Performance Max is an AI-powered Google Ads campaign type that automatically optimizes across all Google channels.',
      fullDefinition: 'Performance Max (PMax for short) is an automated campaign type from Google Ads, introduced in 2021. Unlike classic campaigns limited to one channel, PMax uses machine learning to serve ads across all Google platforms simultaneously: Google Search, Shopping, Display Network, YouTube, Gmail, Maps, and Discover. The advertiser provides assets (text, images, videos), and Google automatically combines them for best performance. PMax is increasingly replacing Smart Shopping and local campaigns. The advantage: Less manual work and access to all Google channels. The disadvantage: Less control and transparency over ad delivery.',
      relatedTerms: ['Google Ads', 'Machine Learning', 'Smart Bidding', 'Asset Groups', 'Conversion Optimization'],
      usageExample: 'After migrating from Smart Shopping to Performance Max, our ROAS increased by 35% with the same budget.',
      keyPoints: [
        'PMax uses all Google channels in one campaign',
        'Create asset groups with texts, images and videos',
        'Clearly define conversion goals (lead, purchase, etc.)',
        'Minimum budget of approx. €50/day for meaningful data',
        'Audience signals help the algorithm at launch',
        'Less control, but potentially better performance'
      ],
      externalLinks: [
        { title: 'Google Performance Max Guide', url: 'https://support.google.com/google-ads/answer/10724817' }
      ]
    }
  },
  // ============================================
  // BATCH 1: SEO & TECHNICAL TERMS
  // ============================================
  {
    slug: 'core-web-vitals',
    searchVolume: 2400,
    difficulty: 28,
    category: 'seo',
    de: {
      term: 'Core Web Vitals',
      shortDefinition: 'Core Web Vitals sind Googles Metriken für Ladegeschwindigkeit, Interaktivität und visuelle Stabilität einer Website.',
      fullDefinition: 'Core Web Vitals sind eine Reihe von Metriken, die Google 2021 als Ranking-Faktoren eingeführt hat. Sie messen die tatsächliche Nutzererfahrung auf einer Website in drei Bereichen: Largest Contentful Paint (LCP) misst die Ladegeschwindigkeit des größten sichtbaren Elements, First Input Delay (FID) bzw. Interaction to Next Paint (INP) misst die Reaktionsfähigkeit auf Nutzerinteraktionen, und Cumulative Layout Shift (CLS) misst die visuelle Stabilität während des Ladens. Gute Core Web Vitals sind nicht nur für SEO wichtig, sondern verbessern auch Conversion Rates und Nutzerzufriedenheit. Die Metriken können in Google Search Console, PageSpeed Insights und Chrome DevTools gemessen werden.',
      relatedTerms: ['PageSpeed', 'LCP', 'FID', 'CLS', 'Page Experience'],
      usageExample: 'Nach der Optimierung der Core Web Vitals verbesserte sich das LCP von 4,2s auf 1,8s und das Ranking stieg um 8 Positionen.',
      keyPoints: [
        'LCP (Largest Contentful Paint): Sollte unter 2,5 Sekunden liegen',
        'INP (Interaction to Next Paint): Sollte unter 200ms liegen',
        'CLS (Cumulative Layout Shift): Sollte unter 0,1 liegen',
        'Bild-Optimierung ist oft der größte Hebel für LCP',
        'JavaScript-Optimierung verbessert INP',
        'Reservierte Platzhalter verhindern Layout Shifts'
      ],
      externalLinks: [
        { title: 'Google Web Vitals', url: 'https://web.dev/vitals/' },
        { title: 'PageSpeed Insights', url: 'https://pagespeed.web.dev/' }
      ]
    },
    en: {
      term: 'Core Web Vitals',
      shortDefinition: 'Core Web Vitals are Google\'s metrics for loading speed, interactivity, and visual stability of a website.',
      fullDefinition: 'Core Web Vitals are a set of metrics that Google introduced as ranking factors in 2021. They measure the actual user experience on a website in three areas: Largest Contentful Paint (LCP) measures the loading speed of the largest visible element, First Input Delay (FID) or Interaction to Next Paint (INP) measures responsiveness to user interactions, and Cumulative Layout Shift (CLS) measures visual stability during loading. Good Core Web Vitals are not only important for SEO but also improve conversion rates and user satisfaction. The metrics can be measured in Google Search Console, PageSpeed Insights, and Chrome DevTools.',
      relatedTerms: ['PageSpeed', 'LCP', 'FID', 'CLS', 'Page Experience'],
      usageExample: 'After optimizing Core Web Vitals, LCP improved from 4.2s to 1.8s and ranking increased by 8 positions.',
      keyPoints: [
        'LCP (Largest Contentful Paint): Should be under 2.5 seconds',
        'INP (Interaction to Next Paint): Should be under 200ms',
        'CLS (Cumulative Layout Shift): Should be under 0.1',
        'Image optimization is often the biggest lever for LCP',
        'JavaScript optimization improves INP',
        'Reserved placeholders prevent layout shifts'
      ],
      externalLinks: [
        { title: 'Google Web Vitals', url: 'https://web.dev/vitals/' },
        { title: 'PageSpeed Insights', url: 'https://pagespeed.web.dev/' }
      ]
    }
  },
  {
    slug: 'google-ads',
    searchVolume: 6600,
    difficulty: 42,
    category: 'marketing',
    de: {
      term: 'Google Ads',
      shortDefinition: 'Google Ads ist die Werbeplattform von Google für bezahlte Anzeigen in der Suche, auf YouTube und im Display-Netzwerk.',
      fullDefinition: 'Google Ads (früher Google AdWords) ist die größte Online-Werbeplattform der Welt. Werbetreibende können Anzeigen schalten, die in den Google-Suchergebnissen, auf YouTube, in Gmail, auf Partner-Websites (Display-Netzwerk) und in Apps erscheinen. Das System basiert auf einem Auktionsmodell, bei dem Werbetreibende auf Keywords bieten. Die tatsächlichen Kosten hängen vom Qualitätsfaktor, dem Wettbewerb und dem maximalen Gebot ab. Google Ads bietet verschiedene Kampagnentypen: Search (Textanzeigen in der Suche), Display (Banneranzeigen), Video (YouTube), Shopping (Produktanzeigen) und Performance Max (KI-gesteuert über alle Kanäle). Der Vorteil: Sofortige Sichtbarkeit und präzises Targeting nach Keywords, Demografie, Interessen und Remarketing.',
      relatedTerms: ['SEA', 'PPC', 'Performance Max', 'Qualitätsfaktor', 'CPC'],
      usageExample: 'Mit einer Google Ads Kampagne für "Webdesign Wien" generieren wir monatlich 50 qualifizierte Leads bei einem CPA von 35€.',
      keyPoints: [
        'Kampagnentypen: Search, Display, Video, Shopping, Performance Max',
        'Qualitätsfaktor beeinflusst Position und Kosten (1-10 Skala)',
        'Conversion-Tracking ist essentiell für ROI-Messung',
        'Negative Keywords verhindern irrelevante Klicks',
        'Remarketing erreicht frühere Website-Besucher',
        'Smart Bidding nutzt Machine Learning für Gebotsoptimierung'
      ],
      externalLinks: [
        { title: 'Google Ads', url: 'https://ads.google.com/' },
        { title: 'Google Ads Hilfe', url: 'https://support.google.com/google-ads' }
      ]
    },
    en: {
      term: 'Google Ads',
      shortDefinition: 'Google Ads is Google\'s advertising platform for paid ads in search, on YouTube, and across the Display Network.',
      fullDefinition: 'Google Ads (formerly Google AdWords) is the world\'s largest online advertising platform. Advertisers can run ads that appear in Google search results, on YouTube, in Gmail, on partner websites (Display Network), and in apps. The system is based on an auction model where advertisers bid on keywords. Actual costs depend on quality score, competition, and maximum bid. Google Ads offers various campaign types: Search (text ads in search), Display (banner ads), Video (YouTube), Shopping (product ads), and Performance Max (AI-driven across all channels). The advantage: immediate visibility and precise targeting by keywords, demographics, interests, and remarketing.',
      relatedTerms: ['SEA', 'PPC', 'Performance Max', 'Quality Score', 'CPC'],
      usageExample: 'With a Google Ads campaign for "Web Design Vienna", we generate 50 qualified leads monthly at a CPA of €35.',
      keyPoints: [
        'Campaign types: Search, Display, Video, Shopping, Performance Max',
        'Quality Score influences position and costs (1-10 scale)',
        'Conversion tracking is essential for ROI measurement',
        'Negative keywords prevent irrelevant clicks',
        'Remarketing reaches previous website visitors',
        'Smart Bidding uses machine learning for bid optimization'
      ],
      externalLinks: [
        { title: 'Google Ads', url: 'https://ads.google.com/' },
        { title: 'Google Ads Help', url: 'https://support.google.com/google-ads' }
      ]
    }
  },
  {
    slug: 'meta-tags',
    searchVolume: 1600,
    difficulty: 18,
    category: 'seo',
    de: {
      term: 'Meta-Tags',
      shortDefinition: 'Meta-Tags sind HTML-Elemente im Head-Bereich einer Website, die Suchmaschinen wichtige Informationen über die Seite liefern.',
      fullDefinition: 'Meta-Tags sind HTML-Elemente, die im <head>-Bereich einer Webseite platziert werden und Metadaten über die Seite bereitstellen. Für SEO sind besonders wichtig: Der Title-Tag (erscheint als klickbare Überschrift in den Suchergebnissen), die Meta-Description (Beschreibungstext unter dem Title), Meta-Robots (steuert Indexierung und Link-Following), Canonical-Tag (definiert die Originalversion bei Duplicate Content) und Open Graph Tags (für Social Media Vorschauen). Obwohl Meta-Keywords von Google ignoriert werden, sind Title und Description nach wie vor entscheidend für Click-Through-Rate und indirekt für Rankings. Jede Seite sollte einzigartige, keyword-optimierte Meta-Tags haben.',
      relatedTerms: ['Title-Tag', 'Meta-Description', 'Canonical', 'Robots-Tag', 'Open Graph'],
      usageExample: 'Nach der Optimierung der Meta-Tags stieg die Click-Through-Rate von 2,1% auf 4,8%.',
      keyPoints: [
        'Title-Tag: 50-60 Zeichen, Hauptkeyword am Anfang',
        'Meta-Description: 150-160 Zeichen, Call-to-Action einbauen',
        'Jede Seite braucht einzigartige Meta-Tags',
        'Canonical-Tag verhindert Duplicate Content Probleme',
        'Meta-Robots: index/noindex, follow/nofollow steuern',
        'Open Graph für bessere Social Media Vorschauen'
      ]
    },
    en: {
      term: 'Meta Tags',
      shortDefinition: 'Meta tags are HTML elements in the head section of a website that provide search engines with important information about the page.',
      fullDefinition: 'Meta tags are HTML elements placed in the <head> section of a webpage that provide metadata about the page. For SEO, particularly important are: The title tag (appears as clickable headline in search results), meta description (description text below the title), meta robots (controls indexing and link following), canonical tag (defines the original version for duplicate content), and Open Graph tags (for social media previews). Although meta keywords are ignored by Google, title and description remain crucial for click-through rate and indirectly for rankings. Each page should have unique, keyword-optimized meta tags.',
      relatedTerms: ['Title Tag', 'Meta Description', 'Canonical', 'Robots Tag', 'Open Graph'],
      usageExample: 'After optimizing meta tags, click-through rate increased from 2.1% to 4.8%.',
      keyPoints: [
        'Title tag: 50-60 characters, main keyword at the beginning',
        'Meta description: 150-160 characters, include call-to-action',
        'Each page needs unique meta tags',
        'Canonical tag prevents duplicate content issues',
        'Meta robots: control index/noindex, follow/nofollow',
        'Open Graph for better social media previews'
      ]
    }
  },
  {
    slug: 'schema-markup',
    searchVolume: 1300,
    difficulty: 24,
    category: 'seo',
    de: {
      term: 'Schema Markup (Strukturierte Daten)',
      shortDefinition: 'Schema Markup ist ein Code-Format, das Suchmaschinen hilft, den Inhalt einer Website besser zu verstehen und Rich Snippets anzuzeigen.',
      fullDefinition: 'Schema Markup, auch strukturierte Daten genannt, ist ein standardisiertes Vokabular (schema.org), das Webseiteninhalte für Suchmaschinen maschinenlesbar macht. Durch die Implementierung von Schema Markup können Websites Rich Snippets in den Suchergebnissen erhalten - erweiterte Darstellungen mit Sternen, Preisen, Bildern, FAQs oder Event-Daten. Gängige Schema-Typen sind: Organization, LocalBusiness, Product, Article, FAQ, HowTo, Event, Recipe und Review. Schema kann in JSON-LD (empfohlen von Google), Microdata oder RDFa Format implementiert werden. Rich Snippets erhöhen die Klickrate erheblich, da sie mehr Platz in den Suchergebnissen einnehmen und mehr Informationen zeigen.',
      relatedTerms: ['Rich Snippets', 'JSON-LD', 'FAQ Schema', 'Strukturierte Daten', 'Knowledge Graph'],
      usageExample: 'Nach der Implementation von FAQ Schema erscheinen unsere Fragen direkt in den Google-Ergebnissen mit 35% höherer CTR.',
      keyPoints: [
        'JSON-LD ist das von Google bevorzugte Format',
        'FAQ Schema kann direkte Antworten in SERP zeigen',
        'LocalBusiness Schema für lokale Unternehmen essentiell',
        'Product Schema für E-Commerce mit Preis und Bewertungen',
        'Google Rich Results Test zum Validieren nutzen',
        'Nicht alle Schema-Typen generieren Rich Snippets'
      ],
      externalLinks: [
        { title: 'Schema.org', url: 'https://schema.org/' },
        { title: 'Google Rich Results Test', url: 'https://search.google.com/test/rich-results' }
      ]
    },
    en: {
      term: 'Schema Markup (Structured Data)',
      shortDefinition: 'Schema markup is a code format that helps search engines better understand website content and display rich snippets.',
      fullDefinition: 'Schema markup, also called structured data, is a standardized vocabulary (schema.org) that makes webpage content machine-readable for search engines. By implementing schema markup, websites can get rich snippets in search results - enhanced displays with stars, prices, images, FAQs, or event data. Common schema types are: Organization, LocalBusiness, Product, Article, FAQ, HowTo, Event, Recipe, and Review. Schema can be implemented in JSON-LD (recommended by Google), Microdata, or RDFa format. Rich snippets significantly increase click-through rate as they take up more space in search results and show more information.',
      relatedTerms: ['Rich Snippets', 'JSON-LD', 'FAQ Schema', 'Structured Data', 'Knowledge Graph'],
      usageExample: 'After implementing FAQ schema, our questions appear directly in Google results with 35% higher CTR.',
      keyPoints: [
        'JSON-LD is the format preferred by Google',
        'FAQ schema can show direct answers in SERP',
        'LocalBusiness schema essential for local businesses',
        'Product schema for e-commerce with price and reviews',
        'Use Google Rich Results Test for validation',
        'Not all schema types generate rich snippets'
      ],
      externalLinks: [
        { title: 'Schema.org', url: 'https://schema.org/' },
        { title: 'Google Rich Results Test', url: 'https://search.google.com/test/rich-results' }
      ]
    }
  },
  {
    slug: 'offpage-seo',
    searchVolume: 720,
    difficulty: 20,
    category: 'seo',
    de: {
      term: 'OffPage-SEO',
      shortDefinition: 'OffPage-SEO umfasst alle SEO-Maßnahmen außerhalb der eigenen Website, hauptsächlich Linkaufbau und Markenerwähnungen.',
      fullDefinition: 'OffPage-SEO (auch Off-Site SEO genannt) bezeichnet alle Optimierungsmaßnahmen, die außerhalb der eigenen Website stattfinden. Im Gegensatz zu OnPage-SEO, bei dem man die volle Kontrolle hat, geht es bei OffPage-SEO darum, externe Signale zu generieren, die Google die Relevanz und Autorität einer Website zeigen. Der wichtigste OffPage-Faktor sind Backlinks - Links von anderen Websites. Weitere Faktoren sind Brand Mentions (Erwähnungen ohne Link), Social Signals, Gastbeiträge, PR und Influencer-Kooperationen. Qualität ist wichtiger als Quantität: Ein Link von einer autoritativen, themenrelevanten Seite ist mehr wert als hundert Links von unbekannten Websites. OffPage-SEO ist oft der schwierigste Teil der Suchmaschinenoptimierung.',
      relatedTerms: ['Backlinks', 'Linkbuilding', 'Domain Authority', 'Brand Mentions', 'OnPage-SEO'],
      usageExample: 'Durch gezielte OffPage-SEO Maßnahmen wie Gastbeiträge und PR konnten wir 45 hochwertige Backlinks in 6 Monaten aufbauen.',
      keyPoints: [
        'Backlinks sind der wichtigste OffPage-Ranking-Faktor',
        'Qualität vor Quantität: Autoritäre, themenrelevante Links',
        'Natürlicher Linkaufbau durch wertvollen Content',
        'Brand Mentions werden zunehmend wichtiger',
        'Broken Link Building: Tote Links durch eigene ersetzen',
        'Digital PR für Links von Nachrichtenportalen'
      ]
    },
    en: {
      term: 'Off-Page SEO',
      shortDefinition: 'Off-Page SEO encompasses all SEO measures outside your own website, mainly link building and brand mentions.',
      fullDefinition: 'Off-Page SEO (also called Off-Site SEO) refers to all optimization measures that take place outside your own website. Unlike On-Page SEO, where you have full control, Off-Page SEO is about generating external signals that show Google the relevance and authority of a website. The most important Off-Page factor is backlinks - links from other websites. Other factors include brand mentions (mentions without links), social signals, guest posts, PR, and influencer collaborations. Quality is more important than quantity: A link from an authoritative, topically relevant site is worth more than a hundred links from unknown websites. Off-Page SEO is often the most difficult part of search engine optimization.',
      relatedTerms: ['Backlinks', 'Link Building', 'Domain Authority', 'Brand Mentions', 'On-Page SEO'],
      usageExample: 'Through targeted Off-Page SEO measures like guest posts and PR, we built 45 high-quality backlinks in 6 months.',
      keyPoints: [
        'Backlinks are the most important Off-Page ranking factor',
        'Quality over quantity: Authoritative, topically relevant links',
        'Natural link building through valuable content',
        'Brand mentions are becoming increasingly important',
        'Broken link building: Replace dead links with your own',
        'Digital PR for links from news portals'
      ]
    }
  },
  {
    slug: 'crawling',
    searchVolume: 590,
    difficulty: 15,
    category: 'seo',
    de: {
      term: 'Crawling',
      shortDefinition: 'Crawling ist der Prozess, bei dem Suchmaschinen-Bots Webseiten besuchen und deren Inhalte erfassen.',
      fullDefinition: 'Crawling ist der erste Schritt, den Suchmaschinen durchführen, um Webseiten zu entdecken und zu analysieren. Crawler (auch Spider oder Bots genannt) wie der Googlebot besuchen Websites, folgen Links und laden den Seiteninhalt herunter. Die gesammelten Daten werden dann indexiert und für die Suche verfügbar gemacht. Die Crawl-Frequenz hängt von verschiedenen Faktoren ab: Website-Autorität, Update-Häufigkeit, Servergeschwindigkeit und interne Verlinkung. Webmaster können das Crawling über die robots.txt Datei steuern - bestimmte Bereiche können vom Crawling ausgeschlossen werden. Die XML-Sitemap hilft Crawlern, alle wichtigen Seiten zu finden. Crawl-Budget ist bei großen Websites ein wichtiger Faktor.',
      relatedTerms: ['Googlebot', 'Indexierung', 'robots.txt', 'Sitemap', 'Crawl Budget'],
      usageExample: 'Nach der Optimierung der internen Verlinkung wurde die Website 3x häufiger gecrawlt und neue Seiten erschienen schneller im Index.',
      keyPoints: [
        'Googlebot ist der wichtigste Crawler für SEO',
        'robots.txt steuert, was gecrawlt werden darf',
        'XML-Sitemap zeigt Crawlern alle wichtigen URLs',
        'Crawl Budget bei großen Sites beachten',
        'Server-Antwortzeiten beeinflussen Crawl-Effizienz',
        'Google Search Console zeigt Crawling-Statistiken'
      ]
    },
    en: {
      term: 'Crawling',
      shortDefinition: 'Crawling is the process where search engine bots visit web pages and capture their content.',
      fullDefinition: 'Crawling is the first step search engines take to discover and analyze web pages. Crawlers (also called spiders or bots) like Googlebot visit websites, follow links, and download page content. The collected data is then indexed and made available for search. Crawl frequency depends on various factors: website authority, update frequency, server speed, and internal linking. Webmasters can control crawling via the robots.txt file - certain areas can be excluded from crawling. The XML sitemap helps crawlers find all important pages. Crawl budget is an important factor for large websites.',
      relatedTerms: ['Googlebot', 'Indexing', 'robots.txt', 'Sitemap', 'Crawl Budget'],
      usageExample: 'After optimizing internal linking, the website was crawled 3x more frequently and new pages appeared faster in the index.',
      keyPoints: [
        'Googlebot is the most important crawler for SEO',
        'robots.txt controls what can be crawled',
        'XML sitemap shows crawlers all important URLs',
        'Consider crawl budget for large sites',
        'Server response times affect crawl efficiency',
        'Google Search Console shows crawling statistics'
      ]
    }
  },
  {
    slug: 'indexierung',
    searchVolume: 480,
    difficulty: 16,
    category: 'seo',
    de: {
      term: 'Indexierung',
      shortDefinition: 'Indexierung ist der Prozess, bei dem Suchmaschinen gecrawlte Seiten in ihre Datenbank aufnehmen und für Suchanfragen verfügbar machen.',
      fullDefinition: 'Indexierung ist der Schritt nach dem Crawling, bei dem Suchmaschinen die gesammelten Webseiteninformationen analysieren und in ihren Index (Datenbank) aufnehmen. Nur indexierte Seiten können in den Suchergebnissen erscheinen. Google entscheidet basierend auf Qualität, Einzigartigkeit und technischen Faktoren, ob eine Seite indexiert wird. Probleme wie Duplicate Content, Thin Content, Noindex-Tags oder technische Fehler können die Indexierung verhindern. Die Google Search Console zeigt den Indexierungsstatus und eventuelle Probleme. Mit der URL-Prüfung kann man einzelne URLs zur Indexierung einreichen. Eine Seite kann gecrawlt, aber nicht indexiert werden, wenn Google sie als nicht wertvoll genug einstuft.',
      relatedTerms: ['Crawling', 'Google Index', 'Noindex', 'Search Console', 'Canonicalization'],
      usageExample: 'Durch das Entfernen von Noindex-Tags wurden 200 wichtige Produktseiten wieder indexiert und der Traffic stieg um 40%.',
      keyPoints: [
        'Nur indexierte Seiten erscheinen in Suchergebnissen',
        'Noindex-Tag verhindert Indexierung gezielt',
        'Duplicate Content kann Indexierung blockieren',
        'URL-Prüfung in Search Console für Status-Check',
        'Index-Coverage Report zeigt Indexierungsprobleme',
        'Nicht jede gecrawlte Seite wird indexiert'
      ]
    },
    en: {
      term: 'Indexing',
      shortDefinition: 'Indexing is the process where search engines add crawled pages to their database and make them available for search queries.',
      fullDefinition: 'Indexing is the step after crawling where search engines analyze collected webpage information and add it to their index (database). Only indexed pages can appear in search results. Google decides based on quality, uniqueness, and technical factors whether to index a page. Issues like duplicate content, thin content, noindex tags, or technical errors can prevent indexing. Google Search Console shows indexing status and any issues. With URL inspection, you can submit individual URLs for indexing. A page can be crawled but not indexed if Google considers it not valuable enough.',
      relatedTerms: ['Crawling', 'Google Index', 'Noindex', 'Search Console', 'Canonicalization'],
      usageExample: 'By removing noindex tags, 200 important product pages were re-indexed and traffic increased by 40%.',
      keyPoints: [
        'Only indexed pages appear in search results',
        'Noindex tag specifically prevents indexing',
        'Duplicate content can block indexing',
        'URL inspection in Search Console for status check',
        'Index coverage report shows indexing issues',
        'Not every crawled page gets indexed'
      ]
    }
  },
  {
    slug: 'domain-authority',
    searchVolume: 1900,
    difficulty: 26,
    category: 'seo',
    de: {
      term: 'Domain Authority (DA)',
      shortDefinition: 'Domain Authority ist eine von Moz entwickelte Metrik, die die Ranking-Stärke einer gesamten Domain auf einer Skala von 1-100 vorhersagt.',
      fullDefinition: 'Domain Authority (DA) ist ein Score von 1 bis 100, der von Moz entwickelt wurde, um die Wahrscheinlichkeit vorherzusagen, dass eine Website in Suchmaschinen gut rankt. Je höher der DA-Wert, desto größer das Ranking-Potenzial. Der Score basiert auf verschiedenen Faktoren, hauptsächlich auf der Qualität und Quantität der eingehenden Backlinks. Wichtig zu verstehen: DA ist keine Google-Metrik, sondern ein Drittanbieter-Tool zur Vergleichbarkeit. Ähnliche Metriken sind Domain Rating (DR) von Ahrefs und Authority Score von Semrush. DA sollte als relativer Vergleichswert genutzt werden, nicht als absolute Kennzahl. Der Aufbau von DA ist ein langfristiger Prozess, der hauptsächlich durch Backlinks von autoritativen Websites geschieht.',
      relatedTerms: ['Backlinks', 'Page Authority', 'Domain Rating', 'Link Juice', 'Authority Score'],
      usageExample: 'Unsere Website hat ihre Domain Authority von 25 auf 45 gesteigert, was zu deutlich besseren Rankings führte.',
      keyPoints: [
        'Skala von 1-100, höher ist besser',
        'Keine offizielle Google-Metrik, sondern Moz-Tool',
        'Hauptsächlich durch Backlink-Qualität beeinflusst',
        'Vergleichswert, keine absolute Wahrheit',
        'Neuen Domains haben typischerweise DA 1-10',
        'Top-Sites wie Google haben DA nahe 100'
      ],
      externalLinks: [
        { title: 'Moz Domain Authority', url: 'https://moz.com/domain-analysis' }
      ]
    },
    en: {
      term: 'Domain Authority (DA)',
      shortDefinition: 'Domain Authority is a metric developed by Moz that predicts the ranking strength of an entire domain on a scale of 1-100.',
      fullDefinition: 'Domain Authority (DA) is a score from 1 to 100 developed by Moz to predict the likelihood that a website will rank well in search engines. The higher the DA value, the greater the ranking potential. The score is based on various factors, mainly the quality and quantity of incoming backlinks. Important to understand: DA is not a Google metric but a third-party tool for comparability. Similar metrics are Domain Rating (DR) from Ahrefs and Authority Score from Semrush. DA should be used as a relative comparison value, not an absolute measure. Building DA is a long-term process that happens mainly through backlinks from authoritative websites.',
      relatedTerms: ['Backlinks', 'Page Authority', 'Domain Rating', 'Link Juice', 'Authority Score'],
      usageExample: 'Our website increased its Domain Authority from 25 to 45, leading to significantly better rankings.',
      keyPoints: [
        'Scale of 1-100, higher is better',
        'Not an official Google metric, but Moz tool',
        'Mainly influenced by backlink quality',
        'Comparison value, not absolute truth',
        'New domains typically have DA 1-10',
        'Top sites like Google have DA near 100'
      ],
      externalLinks: [
        { title: 'Moz Domain Authority', url: 'https://moz.com/domain-analysis' }
      ]
    }
  },
  {
    slug: 'featured-snippet',
    searchVolume: 880,
    difficulty: 22,
    category: 'seo',
    de: {
      term: 'Featured Snippet',
      shortDefinition: 'Ein Featured Snippet ist eine hervorgehobene Antwortbox in den Google-Suchergebnissen, die direkt eine Antwort auf die Suchanfrage zeigt.',
      fullDefinition: 'Featured Snippets, auch "Position 0" genannt, sind spezielle Suchergebnis-Boxen, die Google über den organischen Ergebnissen anzeigt. Sie enthalten einen Auszug einer Webseite, der direkt die Frage des Nutzers beantwortet. Es gibt verschiedene Typen: Paragraph-Snippets (Textantworten), Listen-Snippets (nummeriert oder mit Punkten), Tabellen-Snippets und Video-Snippets. Featured Snippets bieten enorme Sichtbarkeit und können die Click-Through-Rate erheblich steigern. Um für ein Featured Snippet zu ranken, sollte Content klar strukturiert sein, Fragen direkt beantworten und das entsprechende Keyword bereits in den Top 10 ranken. Nicht alle Suchanfragen lösen Featured Snippets aus.',
      relatedTerms: ['SERP', 'Position 0', 'Rich Snippets', 'People Also Ask', 'Knowledge Panel'],
      usageExample: 'Durch Optimierung unseres FAQ-Contents erscheinen wir im Featured Snippet für "Was ist SEO" mit 3x höherer CTR.',
      keyPoints: [
        'Erscheint über Position 1 (daher "Position 0")',
        'Typen: Paragraph, Liste, Tabelle, Video',
        'Content muss die Frage direkt beantworten',
        'Voraussetzung: Bereits in Top 10 für das Keyword',
        'Strukturierte Überschriften (H2, H3) helfen',
        'Kann Traffic steigern oder "Zero-Click" verursachen'
      ]
    },
    en: {
      term: 'Featured Snippet',
      shortDefinition: 'A featured snippet is a highlighted answer box in Google search results that directly shows an answer to the search query.',
      fullDefinition: 'Featured snippets, also called "Position 0", are special search result boxes that Google displays above organic results. They contain an excerpt from a webpage that directly answers the user\'s question. There are different types: paragraph snippets (text answers), list snippets (numbered or bulleted), table snippets, and video snippets. Featured snippets offer enormous visibility and can significantly increase click-through rate. To rank for a featured snippet, content should be clearly structured, answer questions directly, and already rank in the top 10 for that keyword. Not all search queries trigger featured snippets.',
      relatedTerms: ['SERP', 'Position 0', 'Rich Snippets', 'People Also Ask', 'Knowledge Panel'],
      usageExample: 'By optimizing our FAQ content, we appear in the featured snippet for "What is SEO" with 3x higher CTR.',
      keyPoints: [
        'Appears above position 1 (hence "Position 0")',
        'Types: Paragraph, list, table, video',
        'Content must directly answer the question',
        'Prerequisite: Already in top 10 for the keyword',
        'Structured headings (H2, H3) help',
        'Can increase traffic or cause "zero-click"'
      ]
    }
  },
  {
    slug: 'e-e-a-t',
    searchVolume: 1300,
    difficulty: 28,
    category: 'seo',
    de: {
      term: 'E-E-A-T',
      shortDefinition: 'E-E-A-T ist Googles Rahmenwerk zur Bewertung von Content-Qualität: Erfahrung, Expertise, Autorität und Vertrauenswürdigkeit.',
      fullDefinition: 'E-E-A-T steht für Experience (Erfahrung), Expertise (Fachwissen), Authoritativeness (Autorität) und Trustworthiness (Vertrauenswürdigkeit). Es ist ein Konzept aus Googles Search Quality Evaluator Guidelines, das beschreibt, wie Google die Qualität von Inhalten bewertet. Das zusätzliche "E" für Experience wurde 2022 hinzugefügt und betont die Bedeutung von Erfahrungen aus erster Hand. E-E-A-T ist besonders wichtig für YMYL-Themen (Your Money Your Life) wie Gesundheit, Finanzen und Recht. Google bewertet: Hat der Autor Erfahrung mit dem Thema? Ist er ein anerkannter Experte? Ist die Website eine Autorität in der Branche? Ist der Content vertrauenswürdig und akkurat? E-E-A-T ist kein direkter Ranking-Faktor, beeinflusst aber viele Signale.',
      relatedTerms: ['YMYL', 'Content-Qualität', 'Author Authority', 'Trust Signals', 'Google Guidelines'],
      usageExample: 'Durch Hinzufügen von Autoren-Biografien und Quellenangaben verbesserten wir unser E-E-A-T und stiegen für Gesundheits-Keywords.',
      keyPoints: [
        'Experience: Erfahrung aus erster Hand mit dem Thema',
        'Expertise: Fachwissen und Qualifikationen des Autors',
        'Authoritativeness: Anerkennung als Autorität in der Branche',
        'Trustworthiness: Vertrauenswürdigkeit und Genauigkeit',
        'Besonders wichtig für YMYL-Themen',
        'Autoren-Biografien und Quellenangaben helfen'
      ],
      externalLinks: [
        { title: 'Google Search Quality Guidelines', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content' }
      ]
    },
    en: {
      term: 'E-E-A-T',
      shortDefinition: 'E-E-A-T is Google\'s framework for evaluating content quality: Experience, Expertise, Authoritativeness, and Trustworthiness.',
      fullDefinition: 'E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. It\'s a concept from Google\'s Search Quality Evaluator Guidelines that describes how Google evaluates content quality. The additional "E" for Experience was added in 2022 and emphasizes the importance of first-hand experiences. E-E-A-T is particularly important for YMYL topics (Your Money Your Life) like health, finance, and legal matters. Google evaluates: Does the author have experience with the topic? Are they a recognized expert? Is the website an authority in the industry? Is the content trustworthy and accurate? E-E-A-T is not a direct ranking factor but influences many signals.',
      relatedTerms: ['YMYL', 'Content Quality', 'Author Authority', 'Trust Signals', 'Google Guidelines'],
      usageExample: 'By adding author biographies and source citations, we improved our E-E-A-T and rose for health keywords.',
      keyPoints: [
        'Experience: First-hand experience with the topic',
        'Expertise: Knowledge and qualifications of the author',
        'Authoritativeness: Recognition as an authority in the industry',
        'Trustworthiness: Trustworthiness and accuracy',
        'Especially important for YMYL topics',
        'Author biographies and source citations help'
      ],
      externalLinks: [
        { title: 'Google Search Quality Guidelines', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content' }
      ]
    }
  },
  // ============================================
  // BATCH 2: MARKETING TERMS
  // ============================================
  {
    slug: 'social-media-marketing',
    searchVolume: 2900,
    difficulty: 38,
    category: 'marketing',
    de: {
      term: 'Social Media Marketing',
      shortDefinition: 'Social Media Marketing nutzt soziale Netzwerke wie Instagram, LinkedIn und Facebook, um Marken aufzubauen und Kunden zu gewinnen.',
      fullDefinition: 'Social Media Marketing (SMM) bezeichnet alle Marketing-Aktivitäten auf sozialen Plattformen wie Facebook, Instagram, LinkedIn, TikTok, Twitter/X und YouTube. Es umfasst organische Inhalte (Posts, Stories, Reels) und bezahlte Werbung (Social Ads). Ziele können Markenbekanntheit, Community-Aufbau, Lead-Generierung, Kundenservice oder direkter Verkauf sein. Erfolgreiches SMM erfordert eine Strategie: Welche Plattformen nutzt die Zielgruppe? Welche Content-Formate funktionieren? Wie oft posten? Der Vorteil von Social Media: Direkter Dialog mit der Zielgruppe und virales Potenzial. Die Herausforderung: Hoher Content-Bedarf und sich ständig ändernde Algorithmen.',
      relatedTerms: ['Instagram Marketing', 'LinkedIn Marketing', 'Facebook Ads', 'Influencer Marketing', 'Community Management'],
      usageExample: 'Durch konsistentes Social Media Marketing auf LinkedIn generieren wir monatlich 30 B2B-Leads für unsere Agentur.',
      keyPoints: [
        'Plattform-Auswahl: Wo ist die Zielgruppe aktiv?',
        'Content-Mix: Informieren, unterhalten, verkaufen',
        'Konsistenz: Regelmäßig posten ist wichtiger als perfekt',
        'Engagement: Mit der Community interagieren',
        'Social Ads für gezielte Reichweite und Leads',
        'Analytics: Erfolg messen und optimieren'
      ]
    },
    en: {
      term: 'Social Media Marketing',
      shortDefinition: 'Social media marketing uses social networks like Instagram, LinkedIn, and Facebook to build brands and win customers.',
      fullDefinition: 'Social Media Marketing (SMM) refers to all marketing activities on social platforms like Facebook, Instagram, LinkedIn, TikTok, Twitter/X, and YouTube. It includes organic content (posts, stories, reels) and paid advertising (social ads). Goals can be brand awareness, community building, lead generation, customer service, or direct sales. Successful SMM requires a strategy: Which platforms does the target audience use? Which content formats work? How often to post? The advantage of social media: Direct dialogue with the target audience and viral potential. The challenge: High content demand and constantly changing algorithms.',
      relatedTerms: ['Instagram Marketing', 'LinkedIn Marketing', 'Facebook Ads', 'Influencer Marketing', 'Community Management'],
      usageExample: 'Through consistent social media marketing on LinkedIn, we generate 30 B2B leads monthly for our agency.',
      keyPoints: [
        'Platform selection: Where is the target audience active?',
        'Content mix: Inform, entertain, sell',
        'Consistency: Posting regularly is more important than perfect',
        'Engagement: Interact with the community',
        'Social ads for targeted reach and leads',
        'Analytics: Measure success and optimize'
      ]
    }
  },
  {
    slug: 'email-marketing',
    searchVolume: 2400,
    difficulty: 32,
    category: 'marketing',
    de: {
      term: 'E-Mail Marketing',
      shortDefinition: 'E-Mail Marketing ist der Versand gezielter E-Mails an Abonnenten, um Kundenbeziehungen aufzubauen und Conversions zu generieren.',
      fullDefinition: 'E-Mail Marketing ist einer der effektivsten und kosteneffizientesten Marketing-Kanäle mit einem durchschnittlichen ROI von 36:1. Es umfasst Newsletter, automatisierte E-Mail-Sequenzen (Drip Campaigns), Transaktions-E-Mails und personalisierte Kampagnen. Der Vorteil: Direkte Kommunikation mit einer Zielgruppe, die aktiv Interesse gezeigt hat (Opt-in). Moderne E-Mail Marketing Tools wie Mailchimp, Klaviyo oder HubSpot ermöglichen Segmentierung, Personalisierung und Automatisierung. Wichtige Metriken sind Öffnungsrate, Klickrate, Conversion Rate und Abmelderate. DSGVO-Konformität ist in der EU essentiell: Double Opt-in, Impressum und einfache Abmeldung.',
      relatedTerms: ['Newsletter', 'Marketing Automation', 'Drip Campaign', 'Lead Nurturing', 'Mailchimp'],
      usageExample: 'Unsere E-Mail Welcome-Sequenz hat eine Öffnungsrate von 65% und generiert 25% aller E-Commerce Verkäufe.',
      keyPoints: [
        'ROI von 36:1 - einer der effektivsten Kanäle',
        'Segmentierung für relevantere Inhalte',
        'Personalisierung erhöht Öffnungs- und Klickraten',
        'Automation für Willkommens-, Warenkorb-, Re-Engagement-E-Mails',
        'A/B-Tests für Subject Lines und Content',
        'DSGVO: Double Opt-in, Impressum, Abmeldelink'
      ]
    },
    en: {
      term: 'Email Marketing',
      shortDefinition: 'Email marketing is sending targeted emails to subscribers to build customer relationships and generate conversions.',
      fullDefinition: 'Email marketing is one of the most effective and cost-efficient marketing channels with an average ROI of 36:1. It includes newsletters, automated email sequences (drip campaigns), transactional emails, and personalized campaigns. The advantage: Direct communication with an audience that has actively shown interest (opt-in). Modern email marketing tools like Mailchimp, Klaviyo, or HubSpot enable segmentation, personalization, and automation. Important metrics are open rate, click rate, conversion rate, and unsubscribe rate. GDPR compliance is essential in the EU: double opt-in, imprint, and easy unsubscribe.',
      relatedTerms: ['Newsletter', 'Marketing Automation', 'Drip Campaign', 'Lead Nurturing', 'Mailchimp'],
      usageExample: 'Our email welcome sequence has a 65% open rate and generates 25% of all e-commerce sales.',
      keyPoints: [
        'ROI of 36:1 - one of the most effective channels',
        'Segmentation for more relevant content',
        'Personalization increases open and click rates',
        'Automation for welcome, cart, re-engagement emails',
        'A/B tests for subject lines and content',
        'GDPR: Double opt-in, imprint, unsubscribe link'
      ]
    }
  },
  {
    slug: 'remarketing',
    searchVolume: 1300,
    difficulty: 24,
    category: 'marketing',
    de: {
      term: 'Remarketing (Retargeting)',
      shortDefinition: 'Remarketing zeigt Werbeanzeigen gezielt an Nutzer, die bereits mit Ihrer Website oder App interagiert haben.',
      fullDefinition: 'Remarketing (auch Retargeting genannt) ist eine Werbestrategie, bei der Anzeigen gezielt an Nutzer ausgespielt werden, die bereits Ihre Website besucht, Produkte angesehen oder den Warenkorb gefüllt haben, ohne zu kaufen. Die Technologie basiert auf Cookies oder Pixel-Tracking. Remarketing ist hocheffektiv, da es "warme" Leads anspricht, die bereits Interesse gezeigt haben. Typische Conversion-Raten sind 2-3x höher als bei "kalten" Kampagnen. Remarketing kann über Google Ads, Facebook/Meta, LinkedIn und andere Plattformen erfolgen. Dynamisches Remarketing zeigt sogar die exakten Produkte, die ein Nutzer angesehen hat.',
      relatedTerms: ['Google Ads', 'Facebook Pixel', 'Conversion Rate', 'Customer Journey', 'Audience Targeting'],
      usageExample: 'Mit Remarketing-Anzeigen für Warenkorbabbrecher erreichen wir eine Conversion-Rate von 8% bei einem CPA von 12€.',
      keyPoints: [
        'Erreicht Nutzer die bereits Interesse gezeigt haben',
        '2-3x höhere Conversion-Rates als Cold Traffic',
        'Dynamisches Remarketing zeigt angesehene Produkte',
        'Frequency Capping verhindert Anzeigen-Müdigkeit',
        'Verschiedene Audience-Segmente: Besucher, Warenkorb, Käufer',
        'Cross-Platform: Google, Meta, LinkedIn kombinieren'
      ]
    },
    en: {
      term: 'Remarketing (Retargeting)',
      shortDefinition: 'Remarketing shows ads specifically to users who have already interacted with your website or app.',
      fullDefinition: 'Remarketing (also called retargeting) is an advertising strategy where ads are specifically shown to users who have already visited your website, viewed products, or filled their cart without purchasing. The technology is based on cookies or pixel tracking. Remarketing is highly effective because it targets "warm" leads who have already shown interest. Typical conversion rates are 2-3x higher than "cold" campaigns. Remarketing can be done through Google Ads, Facebook/Meta, LinkedIn, and other platforms. Dynamic remarketing even shows the exact products a user has viewed.',
      relatedTerms: ['Google Ads', 'Facebook Pixel', 'Conversion Rate', 'Customer Journey', 'Audience Targeting'],
      usageExample: 'With remarketing ads for cart abandoners, we achieve an 8% conversion rate at a CPA of €12.',
      keyPoints: [
        'Reaches users who have already shown interest',
        '2-3x higher conversion rates than cold traffic',
        'Dynamic remarketing shows viewed products',
        'Frequency capping prevents ad fatigue',
        'Different audience segments: Visitors, cart, buyers',
        'Cross-platform: Combine Google, Meta, LinkedIn'
      ]
    }
  },
  {
    slug: 'cpc',
    searchVolume: 1600,
    difficulty: 18,
    category: 'marketing',
    de: {
      term: 'CPC (Cost per Click)',
      shortDefinition: 'CPC ist der Preis, den ein Werbetreibender für jeden Klick auf seine Anzeige bezahlt.',
      fullDefinition: 'Cost per Click (CPC) ist ein Abrechnungsmodell im Online-Marketing, bei dem Werbetreibende nur bezahlen, wenn ein Nutzer tatsächlich auf ihre Anzeige klickt. Der CPC variiert stark je nach Plattform, Branche und Keyword-Wettbewerb - von wenigen Cent für generische Begriffe bis zu über 50€ für hochkompetitive Keywords wie "Versicherung" oder "Kredit". Bei Google Ads wird der tatsächliche CPC durch eine Auktion bestimmt und kann niedriger sein als das maximale Gebot. Der durchschnittliche CPC ist eine wichtige Metrik zur Budgetplanung und Kampagnenoptimierung. Zusammen mit der Conversion Rate ergibt sich der CPA (Cost per Acquisition).',
      relatedTerms: ['Google Ads', 'PPC', 'CPA', 'CPM', 'Qualitätsfaktor'],
      usageExample: 'Unser durchschnittlicher CPC für "Webdesign Wien" liegt bei 2,80€, bei einer Conversion-Rate von 5% ergibt das einen CPA von 56€.',
      keyPoints: [
        'Bezahlung nur bei tatsächlichem Klick',
        'CPC variiert stark nach Branche und Keyword',
        'Qualitätsfaktor beeinflusst den tatsächlichen CPC',
        'Durchschnittlicher CPC zur Budgetplanung',
        'CPC x Conversions = Werbekosten',
        'CPC / Conversion Rate = CPA'
      ]
    },
    en: {
      term: 'CPC (Cost per Click)',
      shortDefinition: 'CPC is the price an advertiser pays for each click on their ad.',
      fullDefinition: 'Cost per Click (CPC) is a billing model in online marketing where advertisers only pay when a user actually clicks on their ad. CPC varies greatly depending on platform, industry, and keyword competition - from a few cents for generic terms to over €50 for highly competitive keywords like "insurance" or "credit." In Google Ads, the actual CPC is determined by an auction and can be lower than the maximum bid. Average CPC is an important metric for budget planning and campaign optimization. Together with conversion rate, it yields CPA (Cost per Acquisition).',
      relatedTerms: ['Google Ads', 'PPC', 'CPA', 'CPM', 'Quality Score'],
      usageExample: 'Our average CPC for "Web Design Vienna" is €2.80, with a 5% conversion rate that yields a CPA of €56.',
      keyPoints: [
        'Payment only for actual clicks',
        'CPC varies greatly by industry and keyword',
        'Quality score influences actual CPC',
        'Average CPC for budget planning',
        'CPC x Conversions = Advertising costs',
        'CPC / Conversion rate = CPA'
      ]
    }
  },
  {
    slug: 'cpa',
    searchVolume: 880,
    difficulty: 20,
    category: 'marketing',
    de: {
      term: 'CPA (Cost per Acquisition)',
      shortDefinition: 'CPA ist der durchschnittliche Preis, den ein Werbetreibender für eine Conversion (Kauf, Lead, Anmeldung) bezahlt.',
      fullDefinition: 'Cost per Acquisition (CPA), auch Cost per Action genannt, ist eine zentrale Kennzahl im Performance Marketing. Sie gibt an, wie viel ein Unternehmen durchschnittlich für die Gewinnung eines Kunden oder einer Conversion ausgibt. Die Berechnung: Gesamte Werbekosten / Anzahl der Conversions = CPA. Im Gegensatz zum CPC (Kosten pro Klick) berücksichtigt der CPA die gesamte Customer Journey bis zur Conversion. Ein niedriger CPA bedeutet effizienteres Marketing. Der Ziel-CPA sollte unter dem Customer Lifetime Value (CLV) liegen, um profitabel zu sein. Google Ads bietet "Ziel-CPA Bidding" als automatisierte Gebotsstrategie.',
      relatedTerms: ['Conversion Rate', 'ROAS', 'CLV', 'CPC', 'Smart Bidding'],
      usageExample: 'Mit einem CPA von 45€ und einem durchschnittlichen Auftragswert von 2.000€ haben wir einen ROAS von 44:1.',
      keyPoints: [
        'Berechnung: Werbekosten / Conversions = CPA',
        'CPA sollte unter dem Customer Lifetime Value liegen',
        'Verschiedene Conversion-Typen haben verschiedene CPAs',
        'Ziel-CPA Bidding automatisiert die Optimierung',
        'Branchenbenchmarks als Orientierung nutzen',
        'Micro-Conversions haben niedrigeren CPA als Käufe'
      ]
    },
    en: {
      term: 'CPA (Cost per Acquisition)',
      shortDefinition: 'CPA is the average price an advertiser pays for a conversion (purchase, lead, signup).',
      fullDefinition: 'Cost per Acquisition (CPA), also called Cost per Action, is a central metric in performance marketing. It indicates how much a company spends on average to acquire a customer or conversion. The calculation: Total advertising costs / Number of conversions = CPA. Unlike CPC (cost per click), CPA considers the entire customer journey to conversion. A low CPA means more efficient marketing. The target CPA should be below Customer Lifetime Value (CLV) to be profitable. Google Ads offers "Target CPA bidding" as an automated bidding strategy.',
      relatedTerms: ['Conversion Rate', 'ROAS', 'CLV', 'CPC', 'Smart Bidding'],
      usageExample: 'With a CPA of €45 and an average order value of €2,000, we have a ROAS of 44:1.',
      keyPoints: [
        'Calculation: Advertising costs / Conversions = CPA',
        'CPA should be below customer lifetime value',
        'Different conversion types have different CPAs',
        'Target CPA bidding automates optimization',
        'Use industry benchmarks as guidance',
        'Micro-conversions have lower CPA than purchases'
      ]
    }
  },
  {
    slug: 'roas',
    searchVolume: 1300,
    difficulty: 22,
    category: 'marketing',
    de: {
      term: 'ROAS (Return on Ad Spend)',
      shortDefinition: 'ROAS ist der Umsatz, der pro ausgegebenem Euro für Werbung generiert wird - die wichtigste E-Commerce Werbe-Kennzahl.',
      fullDefinition: 'Return on Ad Spend (ROAS) misst die Effektivität von Werbekampagnen, indem er den generierten Umsatz ins Verhältnis zu den Werbekosten setzt. Die Berechnung: Umsatz aus Werbung / Werbekosten = ROAS. Ein ROAS von 4:1 bedeutet: Für jeden Euro Werbeausgaben werden 4 Euro Umsatz generiert. ROAS ist besonders im E-Commerce die zentrale Kennzahl. Im Gegensatz zum ROI berücksichtigt ROAS nicht die Produktkosten und Marge. Ein "guter" ROAS hängt von der Marge ab - bei 50% Marge muss der ROAS mindestens 2:1 sein, um Break-even zu erreichen. Google Ads bietet "Ziel-ROAS Bidding" als automatisierte Gebotsstrategie für E-Commerce.',
      relatedTerms: ['ROI', 'CPA', 'Conversion Value', 'Smart Bidding', 'E-Commerce'],
      usageExample: 'Unsere Google Shopping Kampagne erreicht einen ROAS von 8:1 - für jeden Euro Werbebudget generieren wir 8 Euro Umsatz.',
      keyPoints: [
        'Berechnung: Umsatz / Werbekosten = ROAS',
        'ROAS von 4:1 bedeutet 4€ Umsatz pro 1€ Ausgaben',
        'Break-even ROAS abhängig von Produktmarge',
        'ROAS ≠ ROI - berücksichtigt keine Produktkosten',
        'Ziel-ROAS Bidding für E-Commerce-Kampagnen',
        'Branchenüblich: E-Commerce 3:1 bis 5:1, B2B höher'
      ]
    },
    en: {
      term: 'ROAS (Return on Ad Spend)',
      shortDefinition: 'ROAS is the revenue generated per euro spent on advertising - the most important e-commerce advertising metric.',
      fullDefinition: 'Return on Ad Spend (ROAS) measures the effectiveness of advertising campaigns by comparing generated revenue to advertising costs. The calculation: Revenue from advertising / Advertising costs = ROAS. A ROAS of 4:1 means: For every euro of ad spend, 4 euros of revenue are generated. ROAS is particularly central in e-commerce. Unlike ROI, ROAS does not consider product costs and margin. A "good" ROAS depends on margin - with 50% margin, ROAS must be at least 2:1 to break even. Google Ads offers "Target ROAS bidding" as an automated bidding strategy for e-commerce.',
      relatedTerms: ['ROI', 'CPA', 'Conversion Value', 'Smart Bidding', 'E-Commerce'],
      usageExample: 'Our Google Shopping campaign achieves a ROAS of 8:1 - for every euro of ad budget, we generate 8 euros in revenue.',
      keyPoints: [
        'Calculation: Revenue / Advertising costs = ROAS',
        'ROAS of 4:1 means €4 revenue per €1 spend',
        'Break-even ROAS depends on product margin',
        'ROAS ≠ ROI - doesn\'t consider product costs',
        'Target ROAS bidding for e-commerce campaigns',
        'Industry standard: E-commerce 3:1 to 5:1, B2B higher'
      ]
    }
  },
  {
    slug: 'a-b-testing',
    searchVolume: 1600,
    difficulty: 24,
    category: 'marketing',
    de: {
      term: 'A/B-Testing',
      shortDefinition: 'A/B-Testing vergleicht zwei Versionen einer Webseite oder Anzeige, um herauszufinden, welche besser performt.',
      fullDefinition: 'A/B-Testing (auch Split-Testing genannt) ist eine Methode zur datenbasierten Optimierung, bei der zwei Varianten (A und B) miteinander verglichen werden. Der Traffic wird zufällig auf beide Versionen aufgeteilt, und die Version mit besserer Performance (mehr Conversions, höhere Klickrate, etc.) gewinnt. A/B-Tests können für alles durchgeführt werden: Headlines, Button-Farben, Bilder, Anzeigentexte, E-Mail-Betreffzeilen, Preise. Wichtig ist statistische Signifikanz - der Test muss lang genug laufen, um zuverlässige Ergebnisse zu liefern. Tools wie Google Optimize, Optimizely oder VWO ermöglichen A/B-Tests ohne Programmierung. Multivariate Tests testen mehrere Elemente gleichzeitig.',
      relatedTerms: ['Conversion Rate Optimization', 'Multivariate Testing', 'Statistical Significance', 'Landing Page', 'Hypothese'],
      usageExample: 'Durch A/B-Testing der Headline stieg die Conversion-Rate von 2,3% auf 3,8% - ein Uplift von 65%.',
      keyPoints: [
        'Nur ein Element pro Test ändern',
        'Statistische Signifikanz abwarten (mind. 100 Conversions)',
        'Hypothese vor dem Test formulieren',
        'Traffic 50/50 auf beide Varianten aufteilen',
        'Gewinner-Variante als neue Baseline',
        'Kontinuierlich testen: Es gibt immer Optimierungspotenzial'
      ]
    },
    en: {
      term: 'A/B Testing',
      shortDefinition: 'A/B testing compares two versions of a webpage or ad to find out which performs better.',
      fullDefinition: 'A/B testing (also called split testing) is a method for data-driven optimization where two variants (A and B) are compared. Traffic is randomly split between both versions, and the version with better performance (more conversions, higher click rate, etc.) wins. A/B tests can be conducted for anything: headlines, button colors, images, ad copy, email subject lines, prices. Statistical significance is important - the test must run long enough to provide reliable results. Tools like Google Optimize, Optimizely, or VWO enable A/B tests without programming. Multivariate tests test multiple elements simultaneously.',
      relatedTerms: ['Conversion Rate Optimization', 'Multivariate Testing', 'Statistical Significance', 'Landing Page', 'Hypothesis'],
      usageExample: 'Through A/B testing of the headline, conversion rate increased from 2.3% to 3.8% - an uplift of 65%.',
      keyPoints: [
        'Change only one element per test',
        'Wait for statistical significance (min. 100 conversions)',
        'Formulate hypothesis before test',
        'Split traffic 50/50 between both variants',
        'Winner variant becomes new baseline',
        'Test continuously: There\'s always optimization potential'
      ]
    }
  },
  {
    slug: 'influencer-marketing',
    searchVolume: 1900,
    difficulty: 30,
    category: 'marketing',
    de: {
      term: 'Influencer Marketing',
      shortDefinition: 'Influencer Marketing nutzt reichweitenstarke Personen auf Social Media, um Produkte oder Marken authentisch zu bewerben.',
      fullDefinition: 'Influencer Marketing ist eine Marketingstrategie, bei der Marken mit einflussreichen Personen (Influencern) auf sozialen Medien zusammenarbeiten, um ihre Produkte oder Dienstleistungen zu bewerben. Influencer haben eine engagierte Followerschaft auf Plattformen wie Instagram, YouTube, TikTok oder LinkedIn. Die Kategorien reichen von Mega-Influencern (1M+ Follower) über Macro (100K-1M), Micro (10K-100K) bis zu Nano-Influencern (1K-10K). Micro- und Nano-Influencer haben oft höhere Engagement-Rates und mehr Vertrauen ihrer Community. Influencer Marketing kann organisch (Produktgeschenke) oder bezahlt (gesponserte Posts) sein. Wichtig: Transparenz durch Kennzeichnung als Werbung ist gesetzlich vorgeschrieben.',
      relatedTerms: ['Social Media Marketing', 'Instagram Marketing', 'TikTok Marketing', 'Engagement Rate', 'Branded Content'],
      usageExample: 'Die Kooperation mit 5 Micro-Influencern generierte 200 qualifizierte Leads bei einem ROI von 6:1.',
      keyPoints: [
        'Authentizität wichtiger als reine Reichweite',
        'Micro-Influencer oft effektiver als Mega-Influencer',
        'Engagement-Rate prüfen, nicht nur Follower-Zahl',
        'Langfristige Partnerschaften vs. Einmal-Kooperationen',
        'Kennzeichnungspflicht: Werbung/Anzeige markieren',
        'Tracking mit individuellen Rabattcodes oder UTM-Links'
      ]
    },
    en: {
      term: 'Influencer Marketing',
      shortDefinition: 'Influencer marketing uses high-reach individuals on social media to authentically promote products or brands.',
      fullDefinition: 'Influencer marketing is a marketing strategy where brands collaborate with influential people (influencers) on social media to promote their products or services. Influencers have an engaged follower base on platforms like Instagram, YouTube, TikTok, or LinkedIn. Categories range from mega-influencers (1M+ followers) to macro (100K-1M), micro (10K-100K), to nano-influencers (1K-10K). Micro and nano-influencers often have higher engagement rates and more trust from their community. Influencer marketing can be organic (product gifts) or paid (sponsored posts). Important: Transparency through advertising disclosure is legally required.',
      relatedTerms: ['Social Media Marketing', 'Instagram Marketing', 'TikTok Marketing', 'Engagement Rate', 'Branded Content'],
      usageExample: 'The collaboration with 5 micro-influencers generated 200 qualified leads at an ROI of 6:1.',
      keyPoints: [
        'Authenticity more important than pure reach',
        'Micro-influencers often more effective than mega-influencers',
        'Check engagement rate, not just follower count',
        'Long-term partnerships vs. one-time collaborations',
        'Disclosure requirement: Mark as advertising/sponsored',
        'Tracking with individual discount codes or UTM links'
      ]
    }
  },
  {
    slug: 'lead-generation',
    searchVolume: 1600,
    difficulty: 32,
    category: 'marketing',
    de: {
      term: 'Lead Generation (Leadgenerierung)',
      shortDefinition: 'Lead Generation ist der Prozess, potenzielle Kunden (Leads) zu identifizieren und ihre Kontaktdaten zu gewinnen.',
      fullDefinition: 'Lead Generation (Leadgenerierung) umfasst alle Marketing-Aktivitäten, die darauf abzielen, Interessenten zu identifizieren und ihre Kontaktinformationen zu erfassen. Ein Lead ist ein potenzieller Kunde, der Interesse an einem Produkt oder einer Dienstleistung gezeigt hat. Typische Lead-Generation-Methoden sind: Landing Pages mit Formularen, Content-Downloads (E-Books, Whitepapers), Webinare, Quizze, kostenlose Testversionen oder Beratungsgespräche. Leads werden nach Qualität unterschieden: Marketing Qualified Leads (MQLs) zeigen erstes Interesse, Sales Qualified Leads (SQLs) sind bereit für den Vertrieb. Lead Nurturing pflegt Leads durch den Funnel bis zur Kaufentscheidung.',
      relatedTerms: ['Lead Magnet', 'MQL', 'SQL', 'Lead Nurturing', 'Landing Page', 'Marketing Funnel'],
      usageExample: 'Unser E-Book "SEO Guide" generiert monatlich 150 qualifizierte B2B-Leads bei Kosten von 8€ pro Lead.',
      keyPoints: [
        'Lead Magnet: Wertvoller Content im Tausch gegen Kontaktdaten',
        'MQL vs. SQL: Verschiedene Qualifizierungsstufen',
        'Landing Page optimiert für Conversions, nicht Navigation',
        'Progressive Profiling: Mehr Daten über Zeit sammeln',
        'Lead Scoring: Leads nach Kaufbereitschaft bewerten',
        'DSGVO: Einwilligung für Marketing-Kommunikation einholen'
      ]
    },
    en: {
      term: 'Lead Generation',
      shortDefinition: 'Lead generation is the process of identifying potential customers (leads) and capturing their contact information.',
      fullDefinition: 'Lead generation encompasses all marketing activities aimed at identifying prospects and capturing their contact information. A lead is a potential customer who has shown interest in a product or service. Typical lead generation methods are: landing pages with forms, content downloads (e-books, whitepapers), webinars, quizzes, free trials, or consultation calls. Leads are differentiated by quality: Marketing Qualified Leads (MQLs) show initial interest, Sales Qualified Leads (SQLs) are ready for sales. Lead nurturing guides leads through the funnel to purchase decision.',
      relatedTerms: ['Lead Magnet', 'MQL', 'SQL', 'Lead Nurturing', 'Landing Page', 'Marketing Funnel'],
      usageExample: 'Our e-book "SEO Guide" generates 150 qualified B2B leads monthly at a cost of €8 per lead.',
      keyPoints: [
        'Lead magnet: Valuable content in exchange for contact data',
        'MQL vs. SQL: Different qualification stages',
        'Landing page optimized for conversions, not navigation',
        'Progressive profiling: Collect more data over time',
        'Lead scoring: Rate leads by purchase readiness',
        'GDPR: Obtain consent for marketing communication'
      ]
    }
  },
  // ============================================
  // BATCH 3: DESIGN & UX TERMS
  // ============================================
  {
    slug: 'ui-design',
    searchVolume: 1600,
    difficulty: 28,
    category: 'design',
    de: {
      term: 'UI Design (User Interface Design)',
      shortDefinition: 'UI Design gestaltet die visuelle Oberfläche einer Website oder App - Layouts, Farben, Typografie und interaktive Elemente.',
      fullDefinition: 'User Interface Design (UI Design) befasst sich mit der visuellen Gestaltung von digitalen Benutzeroberflächen. Es umfasst alle Elemente, die ein Nutzer sieht und mit denen er interagiert: Layouts, Farbschemata, Typografie, Icons, Buttons, Formulare und Animationen. Gutes UI Design ist nicht nur ästhetisch ansprechend, sondern auch funktional und intuitiv. UI Designer arbeiten eng mit UX Designern zusammen - während UX die Nutzererfahrung und Informationsarchitektur definiert, bringt UI diese visuell zum Leben. Tools wie Figma, Sketch und Adobe XD sind Standard in der Branche. Ein konsistentes UI Design folgt einem Design System mit definierten Komponenten und Stilen.',
      relatedTerms: ['UX Design', 'Webdesign', 'Design System', 'Figma', 'Prototyping'],
      usageExample: 'Das neue UI Design mit konsistenter Farbsprache und klaren CTAs erhöhte die User Engagement um 40%.',
      keyPoints: [
        'UI = visuell, UX = Erfahrung - beide gehören zusammen',
        'Konsistenz: Einheitliche Farben, Fonts, Abstände',
        'Accessibility: Kontrastverhältnisse, Schriftgrößen beachten',
        'Design System für skalierbare, konsistente Interfaces',
        'Mobile-First: Zuerst für kleine Bildschirme designen',
        'Micro-Interactions für besseres Feedback'
      ]
    },
    en: {
      term: 'UI Design (User Interface Design)',
      shortDefinition: 'UI design shapes the visual surface of a website or app - layouts, colors, typography, and interactive elements.',
      fullDefinition: 'User Interface Design (UI Design) deals with the visual design of digital user interfaces. It encompasses all elements a user sees and interacts with: layouts, color schemes, typography, icons, buttons, forms, and animations. Good UI design is not only aesthetically pleasing but also functional and intuitive. UI designers work closely with UX designers - while UX defines the user experience and information architecture, UI brings this to life visually. Tools like Figma, Sketch, and Adobe XD are industry standard. Consistent UI design follows a design system with defined components and styles.',
      relatedTerms: ['UX Design', 'Web Design', 'Design System', 'Figma', 'Prototyping'],
      usageExample: 'The new UI design with consistent color language and clear CTAs increased user engagement by 40%.',
      keyPoints: [
        'UI = visual, UX = experience - both belong together',
        'Consistency: Uniform colors, fonts, spacing',
        'Accessibility: Consider contrast ratios, font sizes',
        'Design system for scalable, consistent interfaces',
        'Mobile-first: Design for small screens first',
        'Micro-interactions for better feedback'
      ]
    }
  },
  {
    slug: 'wireframe',
    searchVolume: 720,
    difficulty: 16,
    category: 'design',
    de: {
      term: 'Wireframe',
      shortDefinition: 'Ein Wireframe ist eine schematische Darstellung einer Webseite, die Struktur und Layout ohne visuelles Design zeigt.',
      fullDefinition: 'Wireframes sind grundlegende visuelle Darstellungen einer Webseite oder App, die die Struktur, das Layout und die Hierarchie der Inhalte zeigen - ohne Farben, Bilder oder finales Design. Sie sind wie ein Grundriss für ein Haus. Wireframes helfen, die Informationsarchitektur und Benutzerführung früh im Designprozess zu planen und abzustimmen. Es gibt verschiedene Detailstufen: Low-Fidelity Wireframes (einfache Skizzen), Mid-Fidelity (detaillierter mit Platzhaltern) und High-Fidelity (nah am finalen Design). Tools wie Figma, Balsamiq oder sogar Papier werden verwendet. Wireframes sparen Zeit und Kosten, da Änderungen in dieser Phase einfach sind.',
      relatedTerms: ['Prototyping', 'Mockup', 'UX Design', 'Informationsarchitektur', 'User Flow'],
      usageExample: 'Durch Wireframes konnten wir 3 verschiedene Layout-Varianten schnell mit dem Kunden testen, bevor wir ins Design gingen.',
      keyPoints: [
        'Fokus auf Struktur, nicht auf visuelles Design',
        'Low/Mid/High-Fidelity je nach Projektphase',
        'Frühe Abstimmung mit Stakeholdern möglich',
        'Änderungen in Wireframe-Phase sind kostengünstig',
        'Wireframe → Mockup → Prototyp → Entwicklung',
        'Tools: Figma, Balsamiq, Sketch, oder Papier'
      ]
    },
    en: {
      term: 'Wireframe',
      shortDefinition: 'A wireframe is a schematic representation of a webpage that shows structure and layout without visual design.',
      fullDefinition: 'Wireframes are basic visual representations of a webpage or app that show structure, layout, and content hierarchy - without colors, images, or final design. They are like a blueprint for a house. Wireframes help plan and align information architecture and user navigation early in the design process. There are different levels of detail: low-fidelity wireframes (simple sketches), mid-fidelity (more detailed with placeholders), and high-fidelity (close to final design). Tools like Figma, Balsamiq, or even paper are used. Wireframes save time and costs as changes at this stage are easy.',
      relatedTerms: ['Prototyping', 'Mockup', 'UX Design', 'Information Architecture', 'User Flow'],
      usageExample: 'Through wireframes, we could quickly test 3 different layout variants with the client before moving to design.',
      keyPoints: [
        'Focus on structure, not visual design',
        'Low/mid/high-fidelity depending on project phase',
        'Early alignment with stakeholders possible',
        'Changes in wireframe phase are cost-effective',
        'Wireframe → Mockup → Prototype → Development',
        'Tools: Figma, Balsamiq, Sketch, or paper'
      ]
    }
  },
  {
    slug: 'call-to-action',
    searchVolume: 1300,
    difficulty: 18,
    category: 'design',
    de: {
      term: 'Call-to-Action (CTA)',
      shortDefinition: 'Ein Call-to-Action ist eine Handlungsaufforderung - meist ein Button oder Link - die Nutzer zu einer bestimmten Aktion führt.',
      fullDefinition: 'Ein Call-to-Action (CTA) ist ein Element auf einer Webseite, das Nutzer zu einer gewünschten Handlung auffordert: "Jetzt kaufen", "Kostenlos testen", "Demo anfordern", "Newsletter abonnieren". CTAs sind entscheidend für Conversions und erscheinen typischerweise als Buttons, Links oder Formulare. Ein effektiver CTA ist visuell auffällig (kontrastierende Farbe), verwendet aktionsorientierte Sprache (Verben im Imperativ), kommuniziert einen klaren Nutzen und ist strategisch platziert (Above the Fold, am Ende von Content). A/B-Testing von CTAs kann Conversion-Raten erheblich verbessern. Jede Seite sollte einen primären CTA haben.',
      relatedTerms: ['Conversion Rate', 'Landing Page', 'Button Design', 'Above the Fold', 'Micro-Conversion'],
      usageExample: 'Die Änderung des CTA-Texts von "Absenden" zu "Kostenloses Angebot erhalten" steigerte Conversions um 35%.',
      keyPoints: [
        'Aktionsorientierte Sprache: Verben verwenden',
        'Visuell hervorheben: Kontrastfarbe, Größe',
        'Nutzen kommunizieren: Was bekommt der User?',
        'Strategische Platzierung: Above the Fold, nach Content',
        'Ein primärer CTA pro Seite/Abschnitt',
        'A/B-Testing für Text, Farbe, Platzierung'
      ]
    },
    en: {
      term: 'Call-to-Action (CTA)',
      shortDefinition: 'A call-to-action is a prompt - usually a button or link - that guides users to a specific action.',
      fullDefinition: 'A Call-to-Action (CTA) is an element on a webpage that prompts users to take a desired action: "Buy now", "Try for free", "Request demo", "Subscribe to newsletter". CTAs are crucial for conversions and typically appear as buttons, links, or forms. An effective CTA is visually prominent (contrasting color), uses action-oriented language (verbs in imperative), communicates a clear benefit, and is strategically placed (above the fold, at end of content). A/B testing of CTAs can significantly improve conversion rates. Every page should have one primary CTA.',
      relatedTerms: ['Conversion Rate', 'Landing Page', 'Button Design', 'Above the Fold', 'Micro-Conversion'],
      usageExample: 'Changing the CTA text from "Submit" to "Get Free Quote" increased conversions by 35%.',
      keyPoints: [
        'Action-oriented language: Use verbs',
        'Visual prominence: Contrast color, size',
        'Communicate benefit: What does user get?',
        'Strategic placement: Above the fold, after content',
        'One primary CTA per page/section',
        'A/B testing for text, color, placement'
      ]
    }
  },
  {
    slug: 'usability',
    searchVolume: 880,
    difficulty: 20,
    category: 'design',
    de: {
      term: 'Usability (Benutzerfreundlichkeit)',
      shortDefinition: 'Usability beschreibt, wie einfach und effizient Nutzer eine Website oder App bedienen können.',
      fullDefinition: 'Usability (Gebrauchstauglichkeit oder Benutzerfreundlichkeit) ist ein Qualitätsmerkmal, das beschreibt, wie einfach Benutzer eine Oberfläche nutzen können. Nach ISO 9241 umfasst Usability: Effektivität (Können Nutzer ihre Ziele erreichen?), Effizienz (Mit wie viel Aufwand?) und Zufriedenheit (Wie angenehm ist die Nutzung?). Gute Usability bedeutet: intuitive Navigation, klare Beschriftungen, konsistentes Design, schnelle Ladezeiten und hilfreiche Fehlermeldungen. Usability wird durch Nutzertests, Heatmaps, Session Recordings und Metriken wie Task Completion Rate gemessen. Jakob Nielsen definierte 10 Usability-Heuristiken als Bewertungsgrundlage.',
      relatedTerms: ['User Experience', 'Accessibility', 'Usability Testing', 'Heuristische Evaluation', 'User Research'],
      usageExample: 'Nach dem Usability-Test vereinfachten wir den Checkout von 5 auf 3 Schritte - die Abbruchrate sank um 40%.',
      keyPoints: [
        '3 Dimensionen: Effektivität, Effizienz, Zufriedenheit',
        'Nielsens 10 Usability-Heuristiken als Checkliste',
        'Usability Testing mit echten Nutzern',
        'Think-Aloud Protokoll: Nutzer verbalisieren Gedanken',
        '5-Sekunden-Test: Ist der Zweck sofort klar?',
        'Heatmaps zeigen Klick- und Scroll-Verhalten'
      ]
    },
    en: {
      term: 'Usability',
      shortDefinition: 'Usability describes how easily and efficiently users can operate a website or app.',
      fullDefinition: 'Usability is a quality attribute that describes how easy it is for users to use an interface. According to ISO 9241, usability encompasses: effectiveness (Can users achieve their goals?), efficiency (With how much effort?), and satisfaction (How pleasant is the experience?). Good usability means: intuitive navigation, clear labels, consistent design, fast loading times, and helpful error messages. Usability is measured through user tests, heatmaps, session recordings, and metrics like task completion rate. Jakob Nielsen defined 10 usability heuristics as evaluation criteria.',
      relatedTerms: ['User Experience', 'Accessibility', 'Usability Testing', 'Heuristic Evaluation', 'User Research'],
      usageExample: 'After usability testing, we simplified checkout from 5 to 3 steps - abandonment rate dropped by 40%.',
      keyPoints: [
        '3 dimensions: Effectiveness, efficiency, satisfaction',
        'Nielsen\'s 10 usability heuristics as checklist',
        'Usability testing with real users',
        'Think-aloud protocol: Users verbalize thoughts',
        '5-second test: Is the purpose immediately clear?',
        'Heatmaps show click and scroll behavior'
      ]
    }
  },
  {
    slug: 'accessibility',
    searchVolume: 1300,
    difficulty: 26,
    category: 'design',
    de: {
      term: 'Accessibility (Barrierefreiheit)',
      shortDefinition: 'Accessibility bedeutet, dass Websites und Apps auch für Menschen mit Behinderungen nutzbar sind.',
      fullDefinition: 'Web Accessibility (Barrierefreiheit) stellt sicher, dass Websites und digitale Produkte von allen Menschen genutzt werden können, einschließlich Menschen mit Behinderungen: Sehbehinderungen, Hörbehinderungen, motorischen Einschränkungen oder kognitiven Beeinträchtigungen. Die Web Content Accessibility Guidelines (WCAG) definieren internationale Standards mit drei Konformitätsstufen: A, AA und AAA. Wichtige Aspekte sind: ausreichende Farbkontraste, Tastaturnavigation, Alt-Texte für Bilder, Untertitel für Videos, klare Überschriftenstruktur und ARIA-Labels für Screenreader. In der EU wird mit dem European Accessibility Act (EAA) ab 2025 Barrierefreiheit für viele digitale Produkte gesetzlich vorgeschrieben.',
      relatedTerms: ['WCAG', 'Screenreader', 'ARIA', 'Kontrast', 'Tastaturnavigation', 'Inklusives Design'],
      usageExample: 'Nach der WCAG AA Optimierung können jetzt auch blinde Nutzer mit Screenreadern unseren Shop vollständig nutzen.',
      keyPoints: [
        'WCAG 2.1 AA ist der gängige Standard',
        'Kontrastverhältnis mindestens 4.5:1 für Text',
        'Alle Funktionen per Tastatur bedienbar',
        'Alt-Texte für alle informativen Bilder',
        'ARIA-Labels für interaktive Elemente',
        'EAA macht Barrierefreiheit ab 2025 zur Pflicht'
      ],
      externalLinks: [
        { title: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/WCAG21/quickref/' },
        { title: 'WAVE Accessibility Tool', url: 'https://wave.webaim.org/' }
      ]
    },
    en: {
      term: 'Accessibility',
      shortDefinition: 'Accessibility means that websites and apps are usable by people with disabilities.',
      fullDefinition: 'Web accessibility ensures that websites and digital products can be used by all people, including those with disabilities: visual impairments, hearing impairments, motor limitations, or cognitive impairments. The Web Content Accessibility Guidelines (WCAG) define international standards with three conformance levels: A, AA, and AAA. Important aspects include: sufficient color contrasts, keyboard navigation, alt texts for images, captions for videos, clear heading structure, and ARIA labels for screen readers. In the EU, the European Accessibility Act (EAA) will make accessibility legally required for many digital products starting in 2025.',
      relatedTerms: ['WCAG', 'Screen Reader', 'ARIA', 'Contrast', 'Keyboard Navigation', 'Inclusive Design'],
      usageExample: 'After WCAG AA optimization, blind users can now fully use our shop with screen readers.',
      keyPoints: [
        'WCAG 2.1 AA is the common standard',
        'Contrast ratio at least 4.5:1 for text',
        'All functions operable by keyboard',
        'Alt texts for all informative images',
        'ARIA labels for interactive elements',
        'EAA makes accessibility mandatory from 2025'
      ],
      externalLinks: [
        { title: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/WCAG21/quickref/' },
        { title: 'WAVE Accessibility Tool', url: 'https://wave.webaim.org/' }
      ]
    }
  },
  // ============================================
  // BATCH 4: DEVELOPMENT & TECH TERMS
  // ============================================
  {
    slug: 'cms',
    searchVolume: 2400,
    difficulty: 35,
    category: 'development',
    de: {
      term: 'CMS (Content Management System)',
      shortDefinition: 'Ein CMS ist eine Software zur Erstellung und Verwaltung von Website-Inhalten ohne Programmierkenntnisse.',
      fullDefinition: 'Ein Content Management System (CMS) ist eine Software-Plattform, die es ermöglicht, digitale Inhalte zu erstellen, zu bearbeiten und zu verwalten, ohne direkt Code schreiben zu müssen. Die bekanntesten CMS sind WordPress (43% aller Websites), Shopify (E-Commerce), Wix, Squarespace und für Unternehmen Drupal oder Adobe Experience Manager. Moderne "Headless CMS" wie Contentful, Sanity oder Strapi trennen Content-Verwaltung (Backend) von der Darstellung (Frontend), was mehr Flexibilität bietet. Bei der CMS-Wahl sind wichtig: Benutzerfreundlichkeit, Skalierbarkeit, SEO-Funktionen, Erweiterbarkeit durch Plugins, Sicherheit und Kosten.',
      relatedTerms: ['WordPress', 'Headless CMS', 'Backend', 'Frontend', 'WYSIWYG'],
      usageExample: 'Mit dem CMS kann das Marketing-Team Blog-Artikel selbst veröffentlichen, ohne auf die IT warten zu müssen.',
      keyPoints: [
        'WordPress dominiert mit 43% Marktanteil',
        'Headless CMS: Content-API für beliebige Frontends',
        'WYSIWYG-Editor für visuelles Bearbeiten',
        'Plugins/Extensions erweitern Funktionalität',
        'Hosting: Self-hosted vs. Cloud/SaaS',
        'Sicherheit: Updates und Backups wichtig'
      ]
    },
    en: {
      term: 'CMS (Content Management System)',
      shortDefinition: 'A CMS is software for creating and managing website content without programming knowledge.',
      fullDefinition: 'A Content Management System (CMS) is a software platform that enables creating, editing, and managing digital content without writing code directly. The most well-known CMS are WordPress (43% of all websites), Shopify (e-commerce), Wix, Squarespace, and for enterprises Drupal or Adobe Experience Manager. Modern "Headless CMS" like Contentful, Sanity, or Strapi separate content management (backend) from presentation (frontend), offering more flexibility. Important for CMS selection: user-friendliness, scalability, SEO features, extensibility through plugins, security, and cost.',
      relatedTerms: ['WordPress', 'Headless CMS', 'Backend', 'Frontend', 'WYSIWYG'],
      usageExample: 'With the CMS, the marketing team can publish blog articles themselves without waiting for IT.',
      keyPoints: [
        'WordPress dominates with 43% market share',
        'Headless CMS: Content API for any frontend',
        'WYSIWYG editor for visual editing',
        'Plugins/extensions extend functionality',
        'Hosting: Self-hosted vs. cloud/SaaS',
        'Security: Updates and backups important'
      ]
    }
  },
  {
    slug: 'wordpress',
    searchVolume: 6600,
    difficulty: 45,
    category: 'development',
    de: {
      term: 'WordPress',
      shortDefinition: 'WordPress ist das weltweit beliebteste CMS, das über 43% aller Websites betreibt - von Blogs bis zu komplexen Shops.',
      fullDefinition: 'WordPress ist ein Open-Source Content Management System, das 2003 als Blogging-Plattform startete und heute 43% aller Websites weltweit betreibt. Es gibt zwei Varianten: WordPress.com (gehostete SaaS-Lösung) und WordPress.org (selbst gehostete Open-Source-Software). Die Stärken von WordPress sind: riesiges Plugin-Ökosystem (60.000+), tausende Themes, große Community, SEO-freundlich und relativ einfache Bedienung. WordPress eignet sich für Blogs, Unternehmenswebsites, Online-Shops (mit WooCommerce), Membership-Sites und mehr. Nachteile können Performance-Probleme bei vielen Plugins, Sicherheitsrisiken bei veralteter Software und Einschränkungen bei sehr komplexen Anwendungen sein.',
      relatedTerms: ['CMS', 'WooCommerce', 'Plugins', 'Themes', 'Gutenberg'],
      usageExample: 'Die Website wurde mit WordPress und dem Elementor Page Builder erstellt - das Team kann alle Inhalte selbst pflegen.',
      keyPoints: [
        '43% aller Websites laufen auf WordPress',
        'Plugins für nahezu jede Funktion verfügbar',
        'WooCommerce macht WordPress zum Online-Shop',
        'Gutenberg Block Editor für modernes Editing',
        'Regelmäßige Updates für Sicherheit wichtig',
        'Hosting-Qualität beeinflusst Performance stark'
      ],
      externalLinks: [
        { title: 'WordPress.org', url: 'https://wordpress.org/' }
      ]
    },
    en: {
      term: 'WordPress',
      shortDefinition: 'WordPress is the world\'s most popular CMS, powering over 43% of all websites - from blogs to complex shops.',
      fullDefinition: 'WordPress is an open-source content management system that started as a blogging platform in 2003 and now powers 43% of all websites worldwide. There are two variants: WordPress.com (hosted SaaS solution) and WordPress.org (self-hosted open-source software). WordPress strengths include: huge plugin ecosystem (60,000+), thousands of themes, large community, SEO-friendly, and relatively easy to use. WordPress is suitable for blogs, business websites, online shops (with WooCommerce), membership sites, and more. Disadvantages can include performance issues with many plugins, security risks with outdated software, and limitations for very complex applications.',
      relatedTerms: ['CMS', 'WooCommerce', 'Plugins', 'Themes', 'Gutenberg'],
      usageExample: 'The website was built with WordPress and Elementor page builder - the team can manage all content themselves.',
      keyPoints: [
        '43% of all websites run on WordPress',
        'Plugins available for nearly every function',
        'WooCommerce turns WordPress into online shop',
        'Gutenberg block editor for modern editing',
        'Regular updates important for security',
        'Hosting quality strongly affects performance'
      ],
      externalLinks: [
        { title: 'WordPress.org', url: 'https://wordpress.org/' }
      ]
    }
  },
  {
    slug: 'api',
    searchVolume: 4400,
    difficulty: 30,
    category: 'development',
    de: {
      term: 'API (Application Programming Interface)',
      shortDefinition: 'Eine API ist eine Schnittstelle, über die verschiedene Software-Systeme miteinander kommunizieren und Daten austauschen können.',
      fullDefinition: 'Eine Application Programming Interface (API) ist ein Satz von Regeln und Protokollen, der es verschiedenen Software-Anwendungen ermöglicht, miteinander zu kommunizieren. APIs definieren, wie Anfragen gestellt und Antworten zurückgegeben werden. REST APIs sind der gängigste Standard im Web und nutzen HTTP-Methoden (GET, POST, PUT, DELETE). Beispiele für APIs: Google Maps API (Karten einbetten), Stripe API (Zahlungen), OpenAI API (KI-Funktionen), Social Media APIs (Posts abrufen). Für Websites sind APIs wichtig für Integrationen: CRM-Anbindung, Payment-Provider, Newsletter-Tools, Headless CMS und mehr.',
      relatedTerms: ['REST API', 'JSON', 'Endpoint', 'Webhook', 'Integration', 'Headless CMS'],
      usageExample: 'Über die HubSpot API werden neue Kontaktanfragen automatisch als Leads im CRM angelegt.',
      keyPoints: [
        'REST APIs nutzen HTTP-Methoden (GET, POST, etc.)',
        'JSON ist das gängigste Datenformat',
        'API-Keys für Authentifizierung und Zugriffskontrolle',
        'Rate Limits begrenzen Anfragen pro Zeiteinheit',
        'Dokumentation ist entscheidend für Integration',
        'Webhooks für Echtzeit-Benachrichtigungen'
      ]
    },
    en: {
      term: 'API (Application Programming Interface)',
      shortDefinition: 'An API is an interface through which different software systems can communicate and exchange data.',
      fullDefinition: 'An Application Programming Interface (API) is a set of rules and protocols that enables different software applications to communicate with each other. APIs define how requests are made and responses returned. REST APIs are the most common standard on the web and use HTTP methods (GET, POST, PUT, DELETE). Examples of APIs: Google Maps API (embed maps), Stripe API (payments), OpenAI API (AI features), social media APIs (fetch posts). For websites, APIs are important for integrations: CRM connection, payment providers, newsletter tools, headless CMS, and more.',
      relatedTerms: ['REST API', 'JSON', 'Endpoint', 'Webhook', 'Integration', 'Headless CMS'],
      usageExample: 'Via the HubSpot API, new contact requests are automatically created as leads in the CRM.',
      keyPoints: [
        'REST APIs use HTTP methods (GET, POST, etc.)',
        'JSON is the most common data format',
        'API keys for authentication and access control',
        'Rate limits restrict requests per time period',
        'Documentation is crucial for integration',
        'Webhooks for real-time notifications'
      ]
    }
  },
  {
    slug: 'ssl-zertifikat',
    searchVolume: 1900,
    difficulty: 18,
    category: 'development',
    de: {
      term: 'SSL-Zertifikat (HTTPS)',
      shortDefinition: 'Ein SSL-Zertifikat verschlüsselt die Verbindung zwischen Browser und Server und macht Websites sicher (https://).',
      fullDefinition: 'Ein SSL-Zertifikat (Secure Sockets Layer, heute technisch TLS) ermöglicht eine verschlüsselte, sichere Verbindung zwischen dem Webbrowser eines Nutzers und dem Webserver. Websites mit SSL-Zertifikat sind an "https://" und dem Schloss-Symbol im Browser erkennbar. SSL ist heute Standard und wird von Google als Ranking-Faktor berücksichtigt. Ohne SSL zeigen Browser Warnungen wie "Nicht sicher" an, was Nutzer abschreckt und die Conversion-Rate senkt. Es gibt verschiedene SSL-Typen: Domain Validation (DV) - einfach und günstig, Organization Validation (OV) - mit Unternehmensvalidierung, Extended Validation (EV) - höchste Validierung. Let\'s Encrypt bietet kostenlose DV-Zertifikate.',
      relatedTerms: ['HTTPS', 'Verschlüsselung', 'Sicherheit', 'Let\'s Encrypt', 'TLS'],
      usageExample: 'Nach der SSL-Implementation verschwand die "Nicht sicher" Warnung und die Conversions stiegen um 12%.',
      keyPoints: [
        'HTTPS ist Google Ranking-Faktor',
        'Browser zeigen Warnung ohne SSL',
        'Let\'s Encrypt bietet kostenlose Zertifikate',
        'DV, OV, EV: verschiedene Validierungsstufen',
        'Zertifikate müssen regelmäßig erneuert werden',
        'Mixed Content vermeiden (http-Ressourcen auf https-Seite)'
      ]
    },
    en: {
      term: 'SSL Certificate (HTTPS)',
      shortDefinition: 'An SSL certificate encrypts the connection between browser and server, making websites secure (https://).',
      fullDefinition: 'An SSL certificate (Secure Sockets Layer, technically now TLS) enables an encrypted, secure connection between a user\'s web browser and the web server. Websites with SSL certificates are recognizable by "https://" and the lock symbol in the browser. SSL is now standard and is considered a ranking factor by Google. Without SSL, browsers show warnings like "Not secure," which deters users and reduces conversion rate. There are different SSL types: Domain Validation (DV) - simple and cheap, Organization Validation (OV) - with company validation, Extended Validation (EV) - highest validation. Let\'s Encrypt offers free DV certificates.',
      relatedTerms: ['HTTPS', 'Encryption', 'Security', 'Let\'s Encrypt', 'TLS'],
      usageExample: 'After SSL implementation, the "Not secure" warning disappeared and conversions increased by 12%.',
      keyPoints: [
        'HTTPS is a Google ranking factor',
        'Browsers show warning without SSL',
        'Let\'s Encrypt offers free certificates',
        'DV, OV, EV: different validation levels',
        'Certificates must be renewed regularly',
        'Avoid mixed content (http resources on https page)'
      ]
    }
  },
  // ============================================
  // BATCH 5: STRATEGY & BRANDING TERMS
  // ============================================
  {
    slug: 'corporate-identity',
    searchVolume: 1600,
    difficulty: 28,
    category: 'strategy',
    de: {
      term: 'Corporate Identity (CI)',
      shortDefinition: 'Corporate Identity ist das Gesamtbild eines Unternehmens - von Logo und Design bis zu Werten und Kommunikation.',
      fullDefinition: 'Corporate Identity (CI) umfasst alle Merkmale, die ein Unternehmen einzigartig machen und von anderen unterscheiden. Sie besteht aus mehreren Bereichen: Corporate Design (visuelles Erscheinungsbild: Logo, Farben, Typografie), Corporate Communication (wie das Unternehmen kommuniziert), Corporate Behavior (wie sich Mitarbeiter verhalten) und Corporate Culture (Werte und Unternehmenskultur). Eine konsistente Corporate Identity schafft Wiedererkennbarkeit, baut Vertrauen auf und stärkt die Markenwahrnehmung. CI-Guidelines dokumentieren alle Regeln für die einheitliche Anwendung. Die CI beeinflusst alles: Website, Visitenkarten, Social Media, Büroeinrichtung bis hin zu E-Mail-Signaturen.',
      relatedTerms: ['Corporate Design', 'Branding', 'Markenidentität', 'Brand Guidelines', 'Logo'],
      usageExample: 'Die neue Corporate Identity mit modernisiertem Logo und frischen Farben positioniert das Unternehmen als innovativen Marktführer.',
      keyPoints: [
        'CI = Design + Communication + Behavior + Culture',
        'Corporate Design: Logo, Farben, Schriften, Bildsprache',
        'Konsistenz über alle Touchpoints',
        'CI-Manual/Guidelines dokumentieren alle Regeln',
        'Intern und extern einheitlich kommunizieren',
        'CI entwickelt sich - Rebranding bei Bedarf'
      ]
    },
    en: {
      term: 'Corporate Identity (CI)',
      shortDefinition: 'Corporate identity is the complete image of a company - from logo and design to values and communication.',
      fullDefinition: 'Corporate Identity (CI) encompasses all characteristics that make a company unique and distinguish it from others. It consists of several areas: Corporate Design (visual appearance: logo, colors, typography), Corporate Communication (how the company communicates), Corporate Behavior (how employees behave), and Corporate Culture (values and company culture). A consistent corporate identity creates recognition, builds trust, and strengthens brand perception. CI guidelines document all rules for uniform application. CI influences everything: website, business cards, social media, office design, down to email signatures.',
      relatedTerms: ['Corporate Design', 'Branding', 'Brand Identity', 'Brand Guidelines', 'Logo'],
      usageExample: 'The new corporate identity with modernized logo and fresh colors positions the company as an innovative market leader.',
      keyPoints: [
        'CI = Design + Communication + Behavior + Culture',
        'Corporate design: Logo, colors, fonts, imagery',
        'Consistency across all touchpoints',
        'CI manual/guidelines document all rules',
        'Communicate uniformly internally and externally',
        'CI evolves - rebranding when needed'
      ]
    }
  },
  {
    slug: 'buyer-persona',
    searchVolume: 1300,
    difficulty: 22,
    category: 'strategy',
    de: {
      term: 'Buyer Persona',
      shortDefinition: 'Eine Buyer Persona ist ein semi-fiktives Profil des idealen Kunden basierend auf Recherche und realen Daten.',
      fullDefinition: 'Eine Buyer Persona ist eine detaillierte, semi-fiktive Darstellung des idealen Kunden eines Unternehmens. Sie wird basierend auf Marktforschung, Kundeninterviews und realen Daten erstellt. Eine Persona umfasst: demografische Daten (Alter, Beruf, Einkommen), Ziele und Herausforderungen, Kaufverhalten, bevorzugte Kommunikationskanäle und typische Einwände. Gute Personas haben einen Namen und oft ein Foto, um sie greifbar zu machen. B2B-Unternehmen haben oft 3-5 verschiedene Personas für unterschiedliche Entscheider im Buying Center. Personas helfen bei der Erstellung zielgerichteter Marketing-Botschaften, Content-Planung und Produktentwicklung.',
      relatedTerms: ['Zielgruppe', 'Customer Journey', 'Ideal Customer Profile', 'B2B Marketing', 'Segmentierung'],
      usageExample: 'Für die Persona "Marketing-Maria" (35, Marketing-Leiterin, 80K+ Umsatzverantwortung) erstellen wir ROI-fokussierte Case Studies.',
      keyPoints: [
        'Basiert auf echten Daten und Interviews',
        'Name und Foto machen Persona greifbar',
        'Demografische + psychografische Merkmale',
        'Ziele, Herausforderungen, Einwände dokumentieren',
        'Verschiedene Personas für verschiedene Segmente',
        'Regelmäßig aktualisieren mit neuen Erkenntnissen'
      ]
    },
    en: {
      term: 'Buyer Persona',
      shortDefinition: 'A buyer persona is a semi-fictional profile of the ideal customer based on research and real data.',
      fullDefinition: 'A buyer persona is a detailed, semi-fictional representation of a company\'s ideal customer. It is created based on market research, customer interviews, and real data. A persona includes: demographic data (age, profession, income), goals and challenges, buying behavior, preferred communication channels, and typical objections. Good personas have a name and often a photo to make them tangible. B2B companies often have 3-5 different personas for different decision-makers in the buying center. Personas help create targeted marketing messages, content planning, and product development.',
      relatedTerms: ['Target Audience', 'Customer Journey', 'Ideal Customer Profile', 'B2B Marketing', 'Segmentation'],
      usageExample: 'For the persona "Marketing Maria" (35, marketing director, 80K+ revenue responsibility), we create ROI-focused case studies.',
      keyPoints: [
        'Based on real data and interviews',
        'Name and photo make persona tangible',
        'Demographic + psychographic characteristics',
        'Document goals, challenges, objections',
        'Different personas for different segments',
        'Regularly update with new insights'
      ]
    }
  },
  {
    slug: 'customer-journey',
    searchVolume: 1600,
    difficulty: 26,
    category: 'strategy',
    de: {
      term: 'Customer Journey',
      shortDefinition: 'Die Customer Journey beschreibt den gesamten Weg eines Kunden vom ersten Kontakt bis zum Kauf und darüber hinaus.',
      fullDefinition: 'Die Customer Journey (Kundenreise) ist die Gesamtheit aller Erfahrungen und Interaktionen, die ein Kunde mit einem Unternehmen hat - von der ersten Wahrnehmung über den Kauf bis zur Nachbetreuung und Weiterempfehlung. Sie wird oft in Phasen unterteilt: Awareness (Bewusstsein), Consideration (Erwägung), Decision (Entscheidung), Retention (Bindung) und Advocacy (Weiterempfehlung). An jedem Touchpoint (Berührungspunkt) interagiert der Kunde mit der Marke: Website, Social Media, E-Mail, Vertrieb, Support. Customer Journey Mapping visualisiert diesen Weg und hilft, Schwachstellen und Optimierungspotenziale zu identifizieren.',
      relatedTerms: ['Touchpoints', 'Marketing Funnel', 'Customer Experience', 'Buyer Persona', 'Customer Journey Mapping'],
      usageExample: 'Das Customer Journey Mapping zeigte: 60% der Interessenten brechen im Checkout ab - wir optimierten den Prozess und reduzierten Abbrüche um 40%.',
      keyPoints: [
        'Phasen: Awareness, Consideration, Decision, Retention, Advocacy',
        'Touchpoints: Alle Berührungspunkte mit der Marke',
        'Journey Mapping visualisiert den Kundenpfad',
        'Emotionen an jedem Touchpoint berücksichtigen',
        'Pain Points identifizieren und lösen',
        'Omnichannel: Konsistentes Erlebnis über alle Kanäle'
      ]
    },
    en: {
      term: 'Customer Journey',
      shortDefinition: 'The customer journey describes the entire path of a customer from first contact to purchase and beyond.',
      fullDefinition: 'The customer journey is the totality of all experiences and interactions a customer has with a company - from first awareness through purchase to after-sales care and referral. It is often divided into phases: Awareness, Consideration, Decision, Retention, and Advocacy. At each touchpoint, the customer interacts with the brand: website, social media, email, sales, support. Customer journey mapping visualizes this path and helps identify weaknesses and optimization potential.',
      relatedTerms: ['Touchpoints', 'Marketing Funnel', 'Customer Experience', 'Buyer Persona', 'Customer Journey Mapping'],
      usageExample: 'Customer journey mapping showed: 60% of prospects abandon at checkout - we optimized the process and reduced abandonment by 40%.',
      keyPoints: [
        'Phases: Awareness, Consideration, Decision, Retention, Advocacy',
        'Touchpoints: All contact points with the brand',
        'Journey mapping visualizes the customer path',
        'Consider emotions at each touchpoint',
        'Identify and solve pain points',
        'Omnichannel: Consistent experience across all channels'
      ]
    }
  },
  {
    slug: 'positionierung',
    searchVolume: 720,
    difficulty: 24,
    category: 'strategy',
    de: {
      term: 'Positionierung (Brand Positioning)',
      shortDefinition: 'Positionierung definiert, wie sich eine Marke im Markt von Wettbewerbern abhebt und in den Köpfen der Zielgruppe verankert.',
      fullDefinition: 'Markenpositionierung ist die strategische Festlegung, wie eine Marke im Vergleich zu Wettbewerbern wahrgenommen werden soll. Sie beantwortet: Was macht uns einzigartig? Für wen sind wir da? Warum sollten Kunden uns wählen? Eine klare Positionierung differenziert von Wettbewerbern und schafft einen unverwechselbaren Platz im Bewusstsein der Zielgruppe. Positionierungsstrategien können auf verschiedenen Attributen basieren: Preis (Premium vs. Budget), Qualität, Service, Innovation, Tradition oder emotionale Werte. Das Positioning Statement fasst die Positionierung in einem Satz zusammen: "Für [Zielgruppe] ist [Marke] die [Kategorie], die [Differenzierungsmerkmal], weil [Begründung]."',
      relatedTerms: ['Branding', 'Unique Selling Proposition', 'Wettbewerbsanalyse', 'Differenzierung', 'Markenstrategie'],
      usageExample: 'Die Positionierung als "Premium Agentur für nachhaltiges Webdesign" differenziert uns klar vom Massenmarkt.',
      keyPoints: [
        'Positionierung = Platz in den Köpfen der Zielgruppe',
        'USP: Was macht uns einzigartig?',
        'Wettbewerbsanalyse: Wo positionieren sich andere?',
        'Positioning Statement als Leitfaden',
        'Konsistent über alle Kommunikation hinweg',
        'Repositionierung bei Marktveränderungen möglich'
      ]
    },
    en: {
      term: 'Positioning (Brand Positioning)',
      shortDefinition: 'Positioning defines how a brand stands out from competitors in the market and anchors itself in the minds of the target audience.',
      fullDefinition: 'Brand positioning is the strategic determination of how a brand should be perceived compared to competitors. It answers: What makes us unique? Who are we for? Why should customers choose us? Clear positioning differentiates from competitors and creates a distinctive place in the target audience\'s consciousness. Positioning strategies can be based on different attributes: price (premium vs. budget), quality, service, innovation, tradition, or emotional values. The positioning statement summarizes positioning in one sentence: "For [target audience], [brand] is the [category] that [differentiator], because [reason]."',
      relatedTerms: ['Branding', 'Unique Selling Proposition', 'Competitive Analysis', 'Differentiation', 'Brand Strategy'],
      usageExample: 'The positioning as "Premium agency for sustainable web design" clearly differentiates us from the mass market.',
      keyPoints: [
        'Positioning = Place in target audience minds',
        'USP: What makes us unique?',
        'Competitive analysis: Where do others position?',
        'Positioning statement as guide',
        'Consistent across all communication',
        'Repositioning possible with market changes'
      ]
    }
  },
  {
    slug: 'kpi',
    searchVolume: 2400,
    difficulty: 22,
    category: 'strategy',
    de: {
      term: 'KPI (Key Performance Indicator)',
      shortDefinition: 'KPIs sind messbare Kennzahlen, die den Erfolg einer Strategie oder Kampagne in Bezug auf wichtige Geschäftsziele bewerten.',
      fullDefinition: 'Key Performance Indicators (KPIs) sind quantifizierbare Messwerte, die zeigen, wie effektiv ein Unternehmen seine wichtigsten Ziele erreicht. Im Marketing sind typische KPIs: Website-Traffic, Conversion Rate, Cost per Acquisition (CPA), Customer Lifetime Value (CLV), Return on Ad Spend (ROAS), Engagement Rate und Net Promoter Score (NPS). Gute KPIs sind SMART: Specific (spezifisch), Measurable (messbar), Achievable (erreichbar), Relevant (relevant) und Time-bound (zeitgebunden). KPIs sollten regelmäßig in Dashboards verfolgt werden. Wichtig: KPIs von Vanity Metrics unterscheiden - 10.000 Follower bedeuten nichts, wenn niemand kauft.',
      relatedTerms: ['Metriken', 'ROI', 'Conversion Rate', 'Dashboard', 'Analytics'],
      usageExample: 'Unsere wichtigsten Marketing-KPIs sind: 500 qualifizierte Leads/Monat, CPA unter 40€, ROAS über 4:1.',
      keyPoints: [
        'SMART: Spezifisch, Messbar, Erreichbar, Relevant, Zeitgebunden',
        'Leading Indicators vs. Lagging Indicators unterscheiden',
        'Vanity Metrics vs. actionable KPIs',
        'Weniger ist mehr: 5-7 Kern-KPIs pro Bereich',
        'Regelmäßiges Tracking in Dashboards',
        'KPIs an Geschäftszielen ausrichten'
      ]
    },
    en: {
      term: 'KPI (Key Performance Indicator)',
      shortDefinition: 'KPIs are measurable metrics that evaluate the success of a strategy or campaign against important business goals.',
      fullDefinition: 'Key Performance Indicators (KPIs) are quantifiable measurements that show how effectively a company achieves its most important goals. In marketing, typical KPIs are: website traffic, conversion rate, cost per acquisition (CPA), customer lifetime value (CLV), return on ad spend (ROAS), engagement rate, and Net Promoter Score (NPS). Good KPIs are SMART: Specific, Measurable, Achievable, Relevant, and Time-bound. KPIs should be tracked regularly in dashboards. Important: Distinguish KPIs from vanity metrics - 10,000 followers mean nothing if nobody buys.',
      relatedTerms: ['Metrics', 'ROI', 'Conversion Rate', 'Dashboard', 'Analytics'],
      usageExample: 'Our key marketing KPIs are: 500 qualified leads/month, CPA under €40, ROAS over 4:1.',
      keyPoints: [
        'SMART: Specific, Measurable, Achievable, Relevant, Time-bound',
        'Distinguish leading vs. lagging indicators',
        'Vanity metrics vs. actionable KPIs',
        'Less is more: 5-7 core KPIs per area',
        'Regular tracking in dashboards',
        'Align KPIs with business goals'
      ]
    }
  },

  // ===========================================
  // BATCH 6: SEO Advanced Terms (15 terms)
  // ===========================================

  {
    slug: 'serp',
    searchVolume: 2900,
    difficulty: 25,
    category: 'seo',
    de: {
      term: 'SERP (Search Engine Results Page)',
      shortDefinition: 'SERP ist die Ergebnisseite einer Suchmaschine, die nach einer Suchanfrage angezeigt wird.',
      fullDefinition: 'Search Engine Results Page (SERP) bezeichnet die Seite, die Google oder andere Suchmaschinen nach einer Suchanfrage anzeigen. Moderne SERPs bestehen aus verschiedenen Elementen: organische Ergebnisse (die klassischen blauen Links), bezahlte Anzeigen (Google Ads), Featured Snippets, Knowledge Panels, Local Packs, Image Carousels, Video-Ergebnisse und "People Also Ask"-Boxen. Die SERP-Landschaft hat sich stark verändert - heute ist die Position 1 nicht mehr so wertvoll wie früher, da Featured Snippets und andere Elemente oft mehr Aufmerksamkeit bekommen. SEOs sprechen von "Zero-Click Searches", wenn Nutzer ihre Antwort direkt in der SERP finden ohne zu klicken.',
      relatedTerms: ['Organische Suche', 'Featured Snippet', 'Knowledge Panel', 'Google Ads', 'CTR'],
      usageExample: 'Unser Ziel ist es, in der SERP für "Webdesign Wien" sowohl organisch als auch im Local Pack zu erscheinen.',
      keyPoints: [
        'SERPs sind dynamisch - sie ändern sich basierend auf Standort, Gerät und Suchhistorie',
        'Featured Snippets können mehr Traffic bringen als Position 1',
        'Local Pack ist entscheidend für lokale Unternehmen',
        'SERP-Features wie PAA können Click-Through-Rate beeinflussen',
        'Mobile SERPs unterscheiden sich von Desktop SERPs'
      ]
    },
    en: {
      term: 'SERP (Search Engine Results Page)',
      shortDefinition: 'SERP is the results page of a search engine displayed after a search query.',
      fullDefinition: 'Search Engine Results Page (SERP) refers to the page that Google or other search engines display after a search query. Modern SERPs consist of various elements: organic results (the classic blue links), paid ads (Google Ads), Featured Snippets, Knowledge Panels, Local Packs, Image Carousels, video results, and "People Also Ask" boxes. The SERP landscape has changed significantly - today position 1 is not as valuable as before, as Featured Snippets and other elements often get more attention. SEOs talk about "Zero-Click Searches" when users find their answer directly in the SERP without clicking.',
      relatedTerms: ['Organic Search', 'Featured Snippet', 'Knowledge Panel', 'Google Ads', 'CTR'],
      usageExample: 'Our goal is to appear in the SERP for "web design Vienna" both organically and in the Local Pack.',
      keyPoints: [
        'SERPs are dynamic - they change based on location, device, and search history',
        'Featured Snippets can bring more traffic than position 1',
        'Local Pack is crucial for local businesses',
        'SERP features like PAA can influence click-through rate',
        'Mobile SERPs differ from desktop SERPs'
      ]
    }
  },
  {
    slug: 'google-analytics',
    searchVolume: 8100,
    difficulty: 32,
    category: 'seo',
    de: {
      term: 'Google Analytics',
      shortDefinition: 'Google Analytics ist ein kostenloses Web-Analyse-Tool von Google zur Messung von Website-Traffic und Nutzerverhalten.',
      fullDefinition: 'Google Analytics (GA) ist das weltweit meistgenutzte Web-Analyse-Tool. Die aktuelle Version GA4 (Google Analytics 4) hat 2023 Universal Analytics abgelöst und basiert auf einem Event-basierten Tracking-Modell. GA4 trackt standardmäßig: Seitenaufrufe, Scrolltiefe, Outbound-Klicks, Suchen, Video-Engagement und Dateidownloads. Wichtige Metriken sind: Nutzer (Users), Sitzungen (Sessions), Engagement Rate, Absprungrate (Bounce Rate), durchschnittliche Sitzungsdauer und Conversions. GA4 bietet auch Machine-Learning-Funktionen für Prognosen und Anomalie-Erkennung. Für DSGVO-Konformität müssen Consent-Management und IP-Anonymisierung korrekt implementiert werden.',
      relatedTerms: ['GA4', 'Web Analytics', 'Tracking', 'Conversion', 'Bounce Rate'],
      usageExample: 'Laut Google Analytics kommen 60% unserer Besucher über organische Suche und haben eine Conversion Rate von 3,2%.',
      keyPoints: [
        'GA4 ist Event-basiert statt Session-basiert',
        'DSGVO-Konformität erfordert Cookie-Consent',
        'Verknüpfung mit Google Ads und Search Console möglich',
        'Custom Events und Conversions können definiert werden',
        'Audiences für Remarketing nutzbar',
        'Explorations für tiefere Analysen'
      ]
    },
    en: {
      term: 'Google Analytics',
      shortDefinition: 'Google Analytics is a free web analytics tool from Google for measuring website traffic and user behavior.',
      fullDefinition: 'Google Analytics (GA) is the world\'s most used web analytics tool. The current version GA4 (Google Analytics 4) replaced Universal Analytics in 2023 and is based on an event-based tracking model. GA4 tracks by default: page views, scroll depth, outbound clicks, searches, video engagement, and file downloads. Important metrics are: Users, Sessions, Engagement Rate, Bounce Rate, average session duration, and Conversions. GA4 also offers machine learning features for predictions and anomaly detection. For GDPR compliance, consent management and IP anonymization must be correctly implemented.',
      relatedTerms: ['GA4', 'Web Analytics', 'Tracking', 'Conversion', 'Bounce Rate'],
      usageExample: 'According to Google Analytics, 60% of our visitors come from organic search with a conversion rate of 3.2%.',
      keyPoints: [
        'GA4 is event-based instead of session-based',
        'GDPR compliance requires cookie consent',
        'Integration with Google Ads and Search Console possible',
        'Custom events and conversions can be defined',
        'Audiences usable for remarketing',
        'Explorations for deeper analysis'
      ]
    }
  },
  {
    slug: 'google-search-console',
    searchVolume: 5400,
    difficulty: 28,
    category: 'seo',
    de: {
      term: 'Google Search Console',
      shortDefinition: 'Die Google Search Console ist ein kostenloses Tool zur Überwachung und Optimierung der Website-Präsenz in Google-Suchergebnissen.',
      fullDefinition: 'Die Google Search Console (GSC, früher Webmaster Tools) ist ein unverzichtbares SEO-Tool direkt von Google. Sie zeigt, wie Google Ihre Website sieht und indexiert. Hauptfunktionen: Leistungsbericht (Klicks, Impressionen, CTR, Position für Keywords), Index-Abdeckung (welche Seiten indexiert sind und welche nicht), Core Web Vitals, Mobile Usability, Sicherheitsprobleme, manuelle Maßnahmen (Penalties) und Backlinks. Über GSC können Sie auch Sitemaps einreichen, einzelne URLs zur Indexierung anfordern und strukturierte Daten testen. Der Leistungsbericht ist Gold wert für SEO - er zeigt echte Daten, für welche Keywords Sie ranken.',
      relatedTerms: ['SEO', 'Indexierung', 'Sitemap', 'Core Web Vitals', 'Crawling'],
      usageExample: 'Die Search Console zeigt, dass wir für "SEO Agentur Wien" auf Position 4 ranken mit einer CTR von 8%.',
      keyPoints: [
        'Zeigt echte Google-Daten zu Ihrer Website',
        'Leistungsbericht: Keywords, Klicks, Impressionen, CTR, Position',
        'Index-Abdeckung deckt Crawling-Probleme auf',
        'URL-Prüftool für schnelle Indexierung',
        'Core Web Vitals Performance-Daten',
        'Backlink-Daten von Google selbst'
      ]
    },
    en: {
      term: 'Google Search Console',
      shortDefinition: 'Google Search Console is a free tool for monitoring and optimizing website presence in Google search results.',
      fullDefinition: 'Google Search Console (GSC, formerly Webmaster Tools) is an essential SEO tool directly from Google. It shows how Google sees and indexes your website. Main functions: Performance report (clicks, impressions, CTR, position for keywords), Index coverage (which pages are indexed and which aren\'t), Core Web Vitals, Mobile Usability, Security issues, manual actions (penalties), and backlinks. Through GSC you can also submit sitemaps, request indexing for individual URLs, and test structured data. The performance report is gold for SEO - it shows real data for which keywords you rank.',
      relatedTerms: ['SEO', 'Indexing', 'Sitemap', 'Core Web Vitals', 'Crawling'],
      usageExample: 'Search Console shows we rank position 4 for "SEO agency Vienna" with an 8% CTR.',
      keyPoints: [
        'Shows real Google data about your website',
        'Performance report: keywords, clicks, impressions, CTR, position',
        'Index coverage reveals crawling problems',
        'URL inspection tool for quick indexing',
        'Core Web Vitals performance data',
        'Backlink data from Google itself'
      ]
    }
  },
  {
    slug: 'sitemap',
    searchVolume: 3200,
    difficulty: 20,
    category: 'seo',
    de: {
      term: 'Sitemap',
      shortDefinition: 'Eine Sitemap ist eine XML-Datei, die Suchmaschinen alle wichtigen URLs einer Website auflistet zur besseren Indexierung.',
      fullDefinition: 'Eine XML-Sitemap ist eine strukturierte Liste aller URLs einer Website, die Suchmaschinen beim Crawling und bei der Indexierung hilft. Sie enthält Informationen wie: URL, letztes Änderungsdatum (lastmod), Änderungsfrequenz (changefreq) und Priorität (priority). Sitemaps sind besonders wichtig für: große Websites mit vielen Seiten, neue Websites ohne viele Backlinks, Websites mit tiefer Seitenstruktur und Websites mit dynamischen Inhalten. Die Sitemap sollte in der Google Search Console eingereicht werden. Neben XML-Sitemaps gibt es auch HTML-Sitemaps für Benutzer und spezielle Sitemaps für Bilder, Videos und News.',
      relatedTerms: ['Indexierung', 'Crawling', 'Google Search Console', 'robots.txt', 'SEO'],
      usageExample: 'Nach dem Website-Relaunch haben wir die neue Sitemap in der Search Console eingereicht.',
      keyPoints: [
        'XML-Format für Suchmaschinen, HTML für Benutzer',
        'Max. 50.000 URLs oder 50MB pro Sitemap',
        'Sitemap Index für große Websites',
        'In robots.txt verlinken',
        'Regelmäßig aktualisieren bei Änderungen',
        'Nur kanonische URLs aufnehmen'
      ]
    },
    en: {
      term: 'Sitemap',
      shortDefinition: 'A sitemap is an XML file that lists all important URLs of a website for search engines to improve indexing.',
      fullDefinition: 'An XML sitemap is a structured list of all URLs of a website that helps search engines with crawling and indexing. It contains information such as: URL, last modification date (lastmod), change frequency (changefreq), and priority. Sitemaps are especially important for: large websites with many pages, new websites without many backlinks, websites with deep page structure, and websites with dynamic content. The sitemap should be submitted in Google Search Console. Besides XML sitemaps, there are also HTML sitemaps for users and special sitemaps for images, videos, and news.',
      relatedTerms: ['Indexing', 'Crawling', 'Google Search Console', 'robots.txt', 'SEO'],
      usageExample: 'After the website relaunch, we submitted the new sitemap in Search Console.',
      keyPoints: [
        'XML format for search engines, HTML for users',
        'Max. 50,000 URLs or 50MB per sitemap',
        'Sitemap Index for large websites',
        'Link in robots.txt',
        'Update regularly when changes occur',
        'Only include canonical URLs'
      ]
    }
  },
  {
    slug: 'robots-txt',
    searchVolume: 2400,
    difficulty: 22,
    category: 'seo',
    de: {
      term: 'robots.txt',
      shortDefinition: 'Die robots.txt ist eine Textdatei, die Suchmaschinen-Crawlern Anweisungen gibt, welche Seiten gecrawlt werden dürfen.',
      fullDefinition: 'Die robots.txt ist eine Textdatei im Root-Verzeichnis einer Website, die das Crawling-Verhalten von Suchmaschinen steuert. Sie verwendet das Robots Exclusion Protocol und enthält Anweisungen wie: User-agent (welcher Bot), Disallow (nicht crawlen), Allow (crawlen erlaubt) und Sitemap (Verweis auf Sitemap). Wichtig: robots.txt verhindert nur das Crawling, nicht die Indexierung! Seiten können trotzdem in den Suchergebnissen erscheinen, wenn sie von anderen Seiten verlinkt werden. Für echtes Blockieren der Indexierung braucht man noindex-Meta-Tags oder X-Robots-Tag Header. Fehler in der robots.txt können fatale SEO-Auswirkungen haben.',
      relatedTerms: ['Crawling', 'Indexierung', 'Sitemap', 'noindex', 'SEO'],
      usageExample: 'Wir haben den Admin-Bereich in der robots.txt blockiert: Disallow: /admin/',
      keyPoints: [
        'Liegt immer unter domain.com/robots.txt',
        'Disallow verhindert Crawling, nicht Indexierung',
        'Wildcard (*) und $ für Muster möglich',
        'Crawl-delay nur von manchen Bots respektiert',
        'Sitemap-Verweis empfohlen',
        'Testen mit Google Search Console'
      ]
    },
    en: {
      term: 'robots.txt',
      shortDefinition: 'robots.txt is a text file that gives search engine crawlers instructions on which pages may be crawled.',
      fullDefinition: 'robots.txt is a text file in the root directory of a website that controls search engine crawling behavior. It uses the Robots Exclusion Protocol and contains instructions such as: User-agent (which bot), Disallow (don\'t crawl), Allow (crawling allowed), and Sitemap (reference to sitemap). Important: robots.txt only prevents crawling, not indexing! Pages can still appear in search results if linked from other pages. For actually blocking indexing, you need noindex meta tags or X-Robots-Tag headers. Errors in robots.txt can have fatal SEO consequences.',
      relatedTerms: ['Crawling', 'Indexing', 'Sitemap', 'noindex', 'SEO'],
      usageExample: 'We blocked the admin area in robots.txt: Disallow: /admin/',
      keyPoints: [
        'Always located at domain.com/robots.txt',
        'Disallow prevents crawling, not indexing',
        'Wildcards (*) and $ for patterns possible',
        'Crawl-delay only respected by some bots',
        'Sitemap reference recommended',
        'Test with Google Search Console'
      ]
    }
  },
  {
    slug: 'canonical-tag',
    searchVolume: 1900,
    difficulty: 24,
    category: 'seo',
    de: {
      term: 'Canonical Tag',
      shortDefinition: 'Ein Canonical Tag zeigt Suchmaschinen die bevorzugte URL einer Seite, um Duplicate Content zu vermeiden.',
      fullDefinition: 'Der Canonical Tag (rel="canonical") ist ein HTML-Element im Head-Bereich, das die kanonische (bevorzugte) URL einer Seite angibt. Er löst das Problem von Duplicate Content, wenn dieselbe Seite unter verschiedenen URLs erreichbar ist (z.B. mit/ohne www, mit/ohne Trailing Slash, mit URL-Parametern). Beispiel: <link rel="canonical" href="https://example.com/seite/" />. Der Canonical Tag ist ein Hinweis, keine Direktive - Google kann ihn ignorieren, wenn er inkonsistent mit anderen Signalen ist. Self-Referencing Canonicals (auf sich selbst zeigend) sind Best Practice. Bei paginierten Seiten: Jede Seite sollte auf sich selbst verweisen, nicht auf Seite 1.',
      relatedTerms: ['Duplicate Content', 'URL-Parameter', 'Indexierung', 'SEO', 'Hreflang'],
      usageExample: 'Die Produktseite hat einen Canonical Tag auf die URL ohne Tracking-Parameter.',
      keyPoints: [
        'Verhindert Duplicate Content Probleme',
        'Ist ein Hinweis, keine Direktive',
        'Self-Referencing Canonicals als Best Practice',
        'Muss im <head> stehen',
        'Bei Pagination: jede Seite auf sich selbst',
        'Cross-Domain Canonicals möglich'
      ]
    },
    en: {
      term: 'Canonical Tag',
      shortDefinition: 'A canonical tag shows search engines the preferred URL of a page to avoid duplicate content.',
      fullDefinition: 'The canonical tag (rel="canonical") is an HTML element in the head section that specifies the canonical (preferred) URL of a page. It solves the duplicate content problem when the same page is accessible under different URLs (e.g., with/without www, with/without trailing slash, with URL parameters). Example: <link rel="canonical" href="https://example.com/page/" />. The canonical tag is a hint, not a directive - Google can ignore it if inconsistent with other signals. Self-referencing canonicals (pointing to itself) are best practice. For paginated pages: Each page should reference itself, not page 1.',
      relatedTerms: ['Duplicate Content', 'URL Parameters', 'Indexing', 'SEO', 'Hreflang'],
      usageExample: 'The product page has a canonical tag to the URL without tracking parameters.',
      keyPoints: [
        'Prevents duplicate content problems',
        'Is a hint, not a directive',
        'Self-referencing canonicals as best practice',
        'Must be in <head>',
        'For pagination: each page to itself',
        'Cross-domain canonicals possible'
      ]
    }
  },
  {
    slug: 'hreflang',
    searchVolume: 1800,
    difficulty: 35,
    category: 'seo',
    de: {
      term: 'Hreflang',
      shortDefinition: 'Hreflang-Tags zeigen Suchmaschinen die Sprach- und Regionalversionen einer Seite für internationale SEO.',
      fullDefinition: 'Hreflang-Attribute sind HTML-Tags, die Google und Yandex (nicht Bing) mitteilen, welche Sprach- und Regionalversionen einer Seite existieren. Format: <link rel="alternate" hreflang="de-AT" href="..." />. Der Wert besteht aus Sprachcode (ISO 639-1) und optionalem Ländercode (ISO 3166-1 Alpha-2). Wichtig: Hreflang-Tags müssen bidirektional sein - wenn Seite A auf Seite B verweist, muss B auch auf A verweisen. x-default markiert die Standardversion. Implementierungsmöglichkeiten: HTML-Tags, HTTP-Header oder XML-Sitemap. Häufige Fehler: fehlende Gegenseitigkeit, falsche Sprachcodes, selbstreferenzierende Tags vergessen.',
      relatedTerms: ['Internationale SEO', 'Canonical Tag', 'Multilinguale Website', 'Lokalisierung'],
      usageExample: 'Für die österreichische und deutsche Version nutzen wir hreflang="de-AT" und hreflang="de-DE".',
      keyPoints: [
        'Nur von Google und Yandex unterstützt',
        'Bidirektionale Verweise erforderlich',
        'x-default für Standardversion',
        'Selbstreferenzierende Tags einschließen',
        'Kann in HTML, HTTP-Header oder Sitemap',
        'Häufige Fehlerquelle bei internationalen Sites'
      ]
    },
    en: {
      term: 'Hreflang',
      shortDefinition: 'Hreflang tags tell search engines about language and regional versions of a page for international SEO.',
      fullDefinition: 'Hreflang attributes are HTML tags that tell Google and Yandex (not Bing) which language and regional versions of a page exist. Format: <link rel="alternate" hreflang="de-AT" href="..." />. The value consists of language code (ISO 639-1) and optional country code (ISO 3166-1 Alpha-2). Important: Hreflang tags must be bidirectional - if page A points to page B, B must also point to A. x-default marks the default version. Implementation options: HTML tags, HTTP headers, or XML sitemap. Common errors: missing reciprocity, wrong language codes, forgetting self-referencing tags.',
      relatedTerms: ['International SEO', 'Canonical Tag', 'Multilingual Website', 'Localization'],
      usageExample: 'For the Austrian and German versions we use hreflang="de-AT" and hreflang="de-DE".',
      keyPoints: [
        'Only supported by Google and Yandex',
        'Bidirectional references required',
        'x-default for default version',
        'Include self-referencing tags',
        'Can be in HTML, HTTP header, or sitemap',
        'Common error source for international sites'
      ]
    }
  },
  {
    slug: 'alt-text',
    searchVolume: 2600,
    difficulty: 18,
    category: 'seo',
    de: {
      term: 'Alt-Text (Alternativtext)',
      shortDefinition: 'Alt-Text ist eine Bildbeschreibung, die Suchmaschinen und Screenreadern den Bildinhalt erklärt.',
      fullDefinition: 'Alt-Text (Alternativtext, Alt-Attribut) ist ein HTML-Attribut für Bilder, das den Bildinhalt beschreibt. Er hat zwei Hauptfunktionen: Barrierefreiheit (Screenreader lesen ihn für sehbehinderte Nutzer vor) und SEO (Suchmaschinen verstehen so den Bildinhalt). Best Practices: beschreibend und präzise sein, relevante Keywords natürlich einbauen, nicht mit "Bild von" beginnen (das weiß der Browser), bei dekorativen Bildern leeren Alt-Text (alt="") verwenden. Länge: 125 Zeichen oder weniger. Der Alt-Text erscheint auch, wenn das Bild nicht geladen werden kann. Er ist wichtiger als der Title-Tag des Bildes für SEO.',
      relatedTerms: ['Barrierefreiheit', 'Bilder-SEO', 'Screenreader', 'HTML', 'Accessibility'],
      usageExample: 'Guter Alt-Text: "Team von GoldenWing bei der Strategieentwicklung im Workshop" statt "team-foto.jpg"',
      keyPoints: [
        'Wichtig für SEO und Barrierefreiheit',
        'Beschreibend, nicht stuffed mit Keywords',
        'Max. 125 Zeichen empfohlen',
        'Leerer Alt für dekorative Bilder',
        'Nicht mit "Bild von" beginnen',
        'Erscheint bei nicht geladenen Bildern'
      ]
    },
    en: {
      term: 'Alt Text (Alternative Text)',
      shortDefinition: 'Alt text is an image description that explains image content to search engines and screen readers.',
      fullDefinition: 'Alt text (alternative text, alt attribute) is an HTML attribute for images that describes the image content. It has two main functions: Accessibility (screen readers read it for visually impaired users) and SEO (search engines understand the image content). Best practices: be descriptive and precise, naturally include relevant keywords, don\'t start with "image of" (the browser knows that), use empty alt text (alt="") for decorative images. Length: 125 characters or less. Alt text also appears when the image cannot load. It\'s more important than the image title tag for SEO.',
      relatedTerms: ['Accessibility', 'Image SEO', 'Screen Reader', 'HTML', 'A11y'],
      usageExample: 'Good alt text: "GoldenWing team during strategy development workshop" instead of "team-photo.jpg"',
      keyPoints: [
        'Important for SEO and accessibility',
        'Descriptive, not keyword stuffed',
        'Max. 125 characters recommended',
        'Empty alt for decorative images',
        'Don\'t start with "image of"',
        'Appears when images don\'t load'
      ]
    }
  },
  {
    slug: 'ladezeit',
    searchVolume: 2200,
    difficulty: 26,
    category: 'seo',
    de: {
      term: 'Ladezeit (Page Speed)',
      shortDefinition: 'Die Ladezeit misst, wie schnell eine Website vollständig geladen wird - ein wichtiger Ranking-Faktor.',
      fullDefinition: 'Die Ladezeit (Page Speed) bezeichnet die Zeit, die benötigt wird, bis eine Webseite vollständig geladen ist. Sie ist seit 2010 ein offizieller Google-Ranking-Faktor und seit 2021 Teil der Core Web Vitals. Wichtige Metriken: Time to First Byte (TTFB), First Contentful Paint (FCP), Largest Contentful Paint (LCP), Time to Interactive (TTI). Optimierungsmöglichkeiten: Bilder komprimieren (WebP-Format), Browser-Caching nutzen, JavaScript und CSS minimieren, CDN verwenden, kritisches CSS inline, Lazy Loading für Bilder, Server-Antwortzeit verbessern. Tools: Google PageSpeed Insights, GTmetrix, WebPageTest. Ziel: LCP unter 2,5 Sekunden.',
      relatedTerms: ['Core Web Vitals', 'LCP', 'PageSpeed Insights', 'Webhosting', 'CDN'],
      usageExample: 'Durch Bildoptimierung und CDN konnten wir die Ladezeit von 5 auf 1,8 Sekunden reduzieren.',
      keyPoints: [
        'Offizieller Google-Ranking-Faktor',
        'Teil der Core Web Vitals (LCP)',
        'Beeinflusst Bounce Rate und Conversions',
        '53% der Nutzer verlassen Seiten, die länger als 3s laden',
        'Mobile Ladezeit oft kritischer als Desktop',
        'Tools: PageSpeed Insights, GTmetrix'
      ]
    },
    en: {
      term: 'Page Speed (Loading Time)',
      shortDefinition: 'Page speed measures how quickly a website fully loads - an important ranking factor.',
      fullDefinition: 'Page speed refers to the time needed until a web page is fully loaded. It has been an official Google ranking factor since 2010 and part of Core Web Vitals since 2021. Important metrics: Time to First Byte (TTFB), First Contentful Paint (FCP), Largest Contentful Paint (LCP), Time to Interactive (TTI). Optimization options: compress images (WebP format), use browser caching, minify JavaScript and CSS, use CDN, inline critical CSS, lazy loading for images, improve server response time. Tools: Google PageSpeed Insights, GTmetrix, WebPageTest. Goal: LCP under 2.5 seconds.',
      relatedTerms: ['Core Web Vitals', 'LCP', 'PageSpeed Insights', 'Web Hosting', 'CDN'],
      usageExample: 'Through image optimization and CDN, we reduced loading time from 5 to 1.8 seconds.',
      keyPoints: [
        'Official Google ranking factor',
        'Part of Core Web Vitals (LCP)',
        'Affects bounce rate and conversions',
        '53% of users leave pages that take more than 3s to load',
        'Mobile speed often more critical than desktop',
        'Tools: PageSpeed Insights, GTmetrix'
      ]
    }
  },
  {
    slug: 'bounce-rate',
    searchVolume: 3100,
    difficulty: 20,
    category: 'seo',
    de: {
      term: 'Bounce Rate (Absprungrate)',
      shortDefinition: 'Die Bounce Rate zeigt den Prozentsatz der Besucher, die eine Website nach nur einer Seite verlassen.',
      fullDefinition: 'Die Bounce Rate (Absprungrate) ist der Prozentsatz der Website-Besucher, die die Seite verlassen, ohne eine weitere Aktion durchzuführen oder eine andere Seite zu besuchen. In Google Analytics 4 wurde die Bounce Rate durch die Engagement Rate ersetzt - ein Bounce ist jetzt eine Session unter 10 Sekunden ohne Conversion-Event oder zweite Seitenansicht. Hohe Bounce Rates sind nicht immer schlecht: Bei Blogartikeln oder Kontaktseiten kann sie normal sein, wenn Nutzer ihre Info gefunden haben. Typische Werte: Landing Pages 70-90%, Blogs 65-90%, Service-Seiten 10-30%, E-Commerce 20-45%. Zur Verbesserung: Ladezeit optimieren, Content auf Suchintention abstimmen, CTAs platzieren.',
      relatedTerms: ['Engagement Rate', 'Google Analytics', 'Verweildauer', 'User Experience', 'CTR'],
      usageExample: 'Unsere Blogbeiträge haben eine Bounce Rate von 75%, aber eine durchschnittliche Verweildauer von 4 Minuten.',
      keyPoints: [
        'In GA4 durch Engagement Rate ersetzt',
        'Hohe Bounce Rate nicht immer negativ',
        'Kontext wichtig: Blogpost vs. Produktseite',
        'Verweildauer als ergänzende Metrik',
        'Mobile Bounce Rate oft höher als Desktop',
        'Suchintention-Match ist entscheidend'
      ]
    },
    en: {
      term: 'Bounce Rate',
      shortDefinition: 'Bounce rate shows the percentage of visitors who leave a website after viewing only one page.',
      fullDefinition: 'Bounce rate is the percentage of website visitors who leave the page without taking any further action or visiting another page. In Google Analytics 4, bounce rate was replaced by engagement rate - a bounce is now a session under 10 seconds without a conversion event or second page view. High bounce rates aren\'t always bad: For blog articles or contact pages, it can be normal if users found their information. Typical values: Landing pages 70-90%, Blogs 65-90%, Service pages 10-30%, E-commerce 20-45%. For improvement: optimize loading time, align content with search intent, place CTAs.',
      relatedTerms: ['Engagement Rate', 'Google Analytics', 'Dwell Time', 'User Experience', 'CTR'],
      usageExample: 'Our blog posts have a bounce rate of 75% but an average dwell time of 4 minutes.',
      keyPoints: [
        'Replaced by engagement rate in GA4',
        'High bounce rate not always negative',
        'Context matters: blog post vs. product page',
        'Dwell time as complementary metric',
        'Mobile bounce rate often higher than desktop',
        'Search intent match is crucial'
      ]
    }
  },
  {
    slug: 'ctr',
    searchVolume: 2800,
    difficulty: 22,
    category: 'seo',
    de: {
      term: 'CTR (Click-Through-Rate)',
      shortDefinition: 'Die CTR ist das Verhältnis von Klicks zu Impressionen - ein Maß für die Effektivität von Suchergebnissen und Anzeigen.',
      fullDefinition: 'Die Click-Through-Rate (CTR) ist eine zentrale Metrik im SEO und Online-Marketing. Sie berechnet sich: (Klicks / Impressionen) × 100. Im SEO zeigt die CTR, wie oft Nutzer auf Ihr Suchergebnis klicken im Verhältnis dazu, wie oft es angezeigt wird. Eine hohe CTR signalisiert Google, dass Ihr Ergebnis relevant ist. Durchschnittliche organische CTR nach Position: Pos. 1: ~28%, Pos. 2: ~15%, Pos. 3: ~11%, Pos. 10: ~2,5%. CTR-Optimierung: Überzeugende Title-Tags mit Zahlen/Power Words, Meta-Descriptions mit Call-to-Action, strukturierte Daten für Rich Snippets, URL-Struktur mit Keywords.',
      relatedTerms: ['Impressionen', 'Klicks', 'Title-Tag', 'Meta-Description', 'SERP'],
      usageExample: 'Nach Optimierung der Title-Tags stieg unsere CTR für das Hauptkeyword von 3% auf 8%.',
      keyPoints: [
        'Formel: (Klicks / Impressionen) × 100',
        'Position 1 hat ~28% CTR durchschnittlich',
        'Title-Tag hat größten Einfluss',
        'Rich Snippets können CTR verdoppeln',
        'Hohe CTR kann Rankings verbessern',
        'In Search Console einsehbar'
      ]
    },
    en: {
      term: 'CTR (Click-Through Rate)',
      shortDefinition: 'CTR is the ratio of clicks to impressions - a measure of the effectiveness of search results and ads.',
      fullDefinition: 'Click-Through Rate (CTR) is a central metric in SEO and online marketing. It\'s calculated as: (Clicks / Impressions) × 100. In SEO, CTR shows how often users click on your search result relative to how often it\'s displayed. A high CTR signals to Google that your result is relevant. Average organic CTR by position: Pos. 1: ~28%, Pos. 2: ~15%, Pos. 3: ~11%, Pos. 10: ~2.5%. CTR optimization: Compelling title tags with numbers/power words, meta descriptions with call-to-action, structured data for rich snippets, URL structure with keywords.',
      relatedTerms: ['Impressions', 'Clicks', 'Title Tag', 'Meta Description', 'SERP'],
      usageExample: 'After optimizing title tags, our CTR for the main keyword increased from 3% to 8%.',
      keyPoints: [
        'Formula: (Clicks / Impressions) × 100',
        'Position 1 has ~28% CTR on average',
        'Title tag has the biggest influence',
        'Rich snippets can double CTR',
        'High CTR can improve rankings',
        'Visible in Search Console'
      ]
    }
  },
  {
    slug: 'linkbuilding',
    searchVolume: 2400,
    difficulty: 32,
    category: 'seo',
    de: {
      term: 'Linkbuilding',
      shortDefinition: 'Linkbuilding ist der strategische Aufbau von Backlinks zur Steigerung der Website-Autorität und Rankings.',
      fullDefinition: 'Linkbuilding bezeichnet alle Maßnahmen zum gezielten Aufbau von Backlinks (eingehenden Links) für eine Website. Es ist ein Kernbereich der OffPage-SEO, da Backlinks einer der wichtigsten Google-Ranking-Faktoren sind. Strategien: Content Marketing (linkwürdige Inhalte erstellen), Gastbeiträge auf relevanten Blogs, Broken Link Building (defekte Links durch eigene ersetzen), Digital PR (Pressemitteilungen, Expertenbeiträge), Skyscraper Technique (bessere Version bestehender Inhalte erstellen), Ressourcen-Seiten-Linkbuilding. Wichtig: Qualität vor Quantität, natürliches Linkprofil, keine gekauften Links (Google Penalty Risiko). Ein Link von einem autoritativen Branchenportal ist wertvoller als 100 Links von unbekannten Blogs.',
      relatedTerms: ['Backlinks', 'OffPage-SEO', 'Domain Authority', 'Gastbeitrag', 'Digital PR'],
      usageExample: 'Durch Gastbeiträge auf Branchenportalen konnten wir 15 hochwertige Backlinks aufbauen.',
      keyPoints: [
        'Qualität wichtiger als Quantität',
        'Natürliches Linkprofil aufbauen',
        'Keine gekauften Links (Penalty-Risiko)',
        'Anchor-Text-Diversität wichtig',
        'Relevanz der verlinkenden Seite zählt',
        'Regelmäßiger, kontinuierlicher Aufbau'
      ]
    },
    en: {
      term: 'Link Building',
      shortDefinition: 'Link building is the strategic acquisition of backlinks to increase website authority and rankings.',
      fullDefinition: 'Link building refers to all measures for the targeted acquisition of backlinks (incoming links) for a website. It\'s a core area of off-page SEO, as backlinks are one of the most important Google ranking factors. Strategies: Content marketing (creating link-worthy content), guest posts on relevant blogs, broken link building (replacing broken links with your own), digital PR (press releases, expert contributions), Skyscraper Technique (creating better versions of existing content), resource page link building. Important: Quality over quantity, natural link profile, no bought links (Google penalty risk). One link from an authoritative industry portal is more valuable than 100 links from unknown blogs.',
      relatedTerms: ['Backlinks', 'Off-Page SEO', 'Domain Authority', 'Guest Post', 'Digital PR'],
      usageExample: 'Through guest posts on industry portals, we built 15 high-quality backlinks.',
      keyPoints: [
        'Quality more important than quantity',
        'Build natural link profile',
        'No bought links (penalty risk)',
        'Anchor text diversity important',
        'Relevance of linking page matters',
        'Regular, continuous building'
      ]
    }
  },
  {
    slug: 'local-seo',
    searchVolume: 3400,
    difficulty: 28,
    category: 'seo',
    de: {
      term: 'Local SEO',
      shortDefinition: 'Local SEO optimiert die lokale Sichtbarkeit eines Unternehmens für standortbezogene Suchanfragen.',
      fullDefinition: 'Local SEO umfasst alle Maßnahmen zur Optimierung der lokalen Online-Sichtbarkeit. Ziel ist es, bei standortbezogenen Suchen wie "Restaurant in der Nähe" oder "Webdesign Wien" in Google Maps und im Local Pack zu erscheinen. Kernelemente: Google Business Profile (ehemals Google My Business) optimieren und aktuell halten, konsistente NAP-Daten (Name, Address, Phone) überall, lokale Citations in Branchenverzeichnissen, Bewertungen sammeln und beantworten, lokale Keywords in Content, lokale Backlinks aufbauen, Schema Markup für LocalBusiness. Für Multi-Location-Businesses: eigene Landing Page pro Standort. Mobile Optimierung ist kritisch, da viele lokale Suchen unterwegs stattfinden.',
      relatedTerms: ['Google Business Profile', 'NAP', 'Local Pack', 'Bewertungen', 'Citations'],
      usageExample: 'Durch Local SEO erscheinen wir jetzt im Google Maps 3-Pack für "SEO Agentur Wien".',
      keyPoints: [
        'Google Business Profile ist das Fundament',
        'NAP-Konsistenz über alle Plattformen',
        'Bewertungen sind ein Ranking-Faktor',
        'Lokale Keywords in Title und Content',
        'Mobile Optimierung kritisch',
        'Lokale Backlinks und Citations aufbauen'
      ]
    },
    en: {
      term: 'Local SEO',
      shortDefinition: 'Local SEO optimizes the local visibility of a business for location-based search queries.',
      fullDefinition: 'Local SEO encompasses all measures to optimize local online visibility. The goal is to appear in Google Maps and the Local Pack for location-based searches like "restaurant near me" or "web design Vienna". Core elements: Optimize and maintain Google Business Profile (formerly Google My Business), consistent NAP data (Name, Address, Phone) everywhere, local citations in business directories, collect and respond to reviews, local keywords in content, build local backlinks, Schema markup for LocalBusiness. For multi-location businesses: dedicated landing page per location. Mobile optimization is critical as many local searches happen on the go.',
      relatedTerms: ['Google Business Profile', 'NAP', 'Local Pack', 'Reviews', 'Citations'],
      usageExample: 'Through Local SEO, we now appear in the Google Maps 3-Pack for "SEO agency Vienna".',
      keyPoints: [
        'Google Business Profile is the foundation',
        'NAP consistency across all platforms',
        'Reviews are a ranking factor',
        'Local keywords in title and content',
        'Mobile optimization critical',
        'Build local backlinks and citations'
      ]
    }
  },
  {
    slug: 'long-tail-keywords',
    searchVolume: 2100,
    difficulty: 20,
    category: 'seo',
    de: {
      term: 'Long-Tail Keywords',
      shortDefinition: 'Long-Tail Keywords sind spezifische, längere Suchanfragen mit geringerem Suchvolumen aber höherer Conversion-Rate.',
      fullDefinition: 'Long-Tail Keywords sind Suchbegriffe aus drei oder mehr Wörtern, die spezifischer sind als generische Short-Tail Keywords. Beispiel: "Schuhe" (Short-Tail) vs. "rote Laufschuhe Damen Größe 39" (Long-Tail). Sie machen etwa 70% aller Suchanfragen aus. Vorteile: weniger Wettbewerb, höhere Conversion-Rate (klare Kaufabsicht), einfacher zu ranken, besserer ROI. Long-Tail Keywords spiegeln oft die natürliche Sprache wider und sind daher ideal für Voice Search Optimierung. Für die Recherche: Google Autocomplete, "People Also Ask", Answer the Public, Keyword-Tools mit Fragen-Filter. Strategie: Dedizierte Landing Pages oder FAQ-Sections für Long-Tail Queries.',
      relatedTerms: ['Keywords', 'Suchintention', 'Voice Search', 'Keyword-Recherche', 'SEO'],
      usageExample: 'Statt "SEO Agentur" targetieren wir das Long-Tail Keyword "SEO Agentur für kleine Unternehmen Wien".',
      keyPoints: [
        '70% aller Suchanfragen sind Long-Tail',
        'Höhere Conversion-Rate als Short-Tail',
        'Weniger Wettbewerb, einfacher zu ranken',
        'Ideal für Voice Search',
        'Spiegeln Kaufabsicht wider',
        'Google Autocomplete für Recherche nutzen'
      ]
    },
    en: {
      term: 'Long-Tail Keywords',
      shortDefinition: 'Long-tail keywords are specific, longer search queries with lower search volume but higher conversion rate.',
      fullDefinition: 'Long-tail keywords are search terms of three or more words that are more specific than generic short-tail keywords. Example: "shoes" (short-tail) vs. "red women\'s running shoes size 8" (long-tail). They make up about 70% of all search queries. Advantages: less competition, higher conversion rate (clear purchase intent), easier to rank, better ROI. Long-tail keywords often reflect natural language and are therefore ideal for voice search optimization. For research: Google Autocomplete, "People Also Ask", Answer the Public, keyword tools with question filter. Strategy: Dedicated landing pages or FAQ sections for long-tail queries.',
      relatedTerms: ['Keywords', 'Search Intent', 'Voice Search', 'Keyword Research', 'SEO'],
      usageExample: 'Instead of "SEO agency" we target the long-tail keyword "SEO agency for small businesses Vienna".',
      keyPoints: [
        '70% of all searches are long-tail',
        'Higher conversion rate than short-tail',
        'Less competition, easier to rank',
        'Ideal for voice search',
        'Reflect purchase intent',
        'Use Google Autocomplete for research'
      ]
    }
  },
  {
    slug: 'duplicate-content',
    searchVolume: 1900,
    difficulty: 24,
    category: 'seo',
    de: {
      term: 'Duplicate Content',
      shortDefinition: 'Duplicate Content bezeichnet identische oder sehr ähnliche Inhalte auf verschiedenen URLs, die SEO-Probleme verursachen können.',
      fullDefinition: 'Duplicate Content (doppelte Inhalte) liegt vor, wenn identischer oder sehr ähnlicher Content unter mehreren URLs erreichbar ist. Google muss entscheiden, welche Version zu indexieren ist - das kann zu Ranking-Problemen führen. Typen: Interne Duplikate (z.B. www vs. non-www, HTTP vs. HTTPS, URL-Parameter), externe Duplikate (Content auf mehreren Domains). Lösungen: Canonical Tags setzen, 301-Redirects einrichten, URL-Parameter in Search Console konfigurieren, robots.txt für nicht-kanonische Versionen, HTTPS und www-Version vereinheitlichen. Duplicate Content ist kein direkter Penalty, aber verwässert Link-Equity und kann zu Crawling-Verschwendung führen.',
      relatedTerms: ['Canonical Tag', 'Indexierung', 'Content', '301-Redirect', 'SEO'],
      usageExample: 'Durch Canonical Tags haben wir das Duplicate Content Problem unserer Produktvarianten gelöst.',
      keyPoints: [
        'Kein direkter Penalty, aber Ranking-Verwässerung',
        'Canonical Tags als Hauptlösung',
        '301-Redirects für permanente Duplikate',
        'URL-Parameter in Search Console konfigurieren',
        'www/non-www und HTTP/HTTPS vereinheitlichen',
        'Regelmäßig mit Tools prüfen'
      ]
    },
    en: {
      term: 'Duplicate Content',
      shortDefinition: 'Duplicate content refers to identical or very similar content on different URLs that can cause SEO problems.',
      fullDefinition: 'Duplicate content exists when identical or very similar content is accessible under multiple URLs. Google must decide which version to index - this can lead to ranking problems. Types: Internal duplicates (e.g., www vs. non-www, HTTP vs. HTTPS, URL parameters), external duplicates (content on multiple domains). Solutions: Set canonical tags, implement 301 redirects, configure URL parameters in Search Console, robots.txt for non-canonical versions, standardize HTTPS and www version. Duplicate content is not a direct penalty but dilutes link equity and can lead to crawl waste.',
      relatedTerms: ['Canonical Tag', 'Indexing', 'Content', '301 Redirect', 'SEO'],
      usageExample: 'Through canonical tags, we solved the duplicate content problem of our product variants.',
      keyPoints: [
        'No direct penalty, but ranking dilution',
        'Canonical tags as main solution',
        '301 redirects for permanent duplicates',
        'Configure URL parameters in Search Console',
        'Standardize www/non-www and HTTP/HTTPS',
        'Regularly check with tools'
      ]
    }
  },

  // ===========================================
  // BATCH 7: Marketing & Analytics Terms (15 terms)
  // ===========================================

  {
    slug: 'funnel',
    searchVolume: 2700,
    difficulty: 24,
    category: 'marketing',
    de: {
      term: 'Marketing Funnel (Trichter)',
      shortDefinition: 'Ein Marketing Funnel visualisiert die Customer Journey vom ersten Kontakt bis zur Conversion.',
      fullDefinition: 'Der Marketing Funnel (deutsch: Trichter) ist ein Modell, das die Customer Journey in Phasen unterteilt. Das klassische AIDA-Modell: Awareness (Aufmerksamkeit), Interest (Interesse), Desire (Verlangen), Action (Handlung). Modernere Modelle wie TOFU-MOFU-BOFU: Top of Funnel (Awareness, breite Reichweite), Middle of Funnel (Consideration, Evaluation), Bottom of Funnel (Decision, Conversion). In jeder Phase braucht der Nutzer anderen Content: TOFU - Blogposts, Social Media, Videos; MOFU - Whitepaper, Webinare, Case Studies; BOFU - Demos, Testimonials, Angebote. Der Funnel hilft bei der Content-Planung und Lead-Nurturing-Strategie.',
      relatedTerms: ['Customer Journey', 'Lead Generation', 'Conversion', 'Content Marketing', 'Nurturing'],
      usageExample: 'Unser Content-Funnel: Blogposts für Awareness, Whitepaper für Consideration, Demo-Angebote für Decision.',
      keyPoints: [
        'TOFU-MOFU-BOFU Modell weit verbreitet',
        'Jede Phase braucht spezifischen Content',
        'Conversion Rate sinkt mit jeder Phase',
        'Lead Nurturing führt durch den Funnel',
        'Messung mit Analytics und CRM',
        'Full-Funnel-Strategie für maximalen Impact'
      ]
    },
    en: {
      term: 'Marketing Funnel',
      shortDefinition: 'A marketing funnel visualizes the customer journey from first contact to conversion.',
      fullDefinition: 'The marketing funnel is a model that divides the customer journey into phases. The classic AIDA model: Awareness, Interest, Desire, Action. More modern models like TOFU-MOFU-BOFU: Top of Funnel (awareness, broad reach), Middle of Funnel (consideration, evaluation), Bottom of Funnel (decision, conversion). Each phase requires different content: TOFU - blog posts, social media, videos; MOFU - whitepapers, webinars, case studies; BOFU - demos, testimonials, offers. The funnel helps with content planning and lead nurturing strategy.',
      relatedTerms: ['Customer Journey', 'Lead Generation', 'Conversion', 'Content Marketing', 'Nurturing'],
      usageExample: 'Our content funnel: blog posts for awareness, whitepapers for consideration, demo offers for decision.',
      keyPoints: [
        'TOFU-MOFU-BOFU model widely used',
        'Each phase needs specific content',
        'Conversion rate decreases with each phase',
        'Lead nurturing guides through funnel',
        'Measurement with analytics and CRM',
        'Full-funnel strategy for maximum impact'
      ]
    }
  },
  {
    slug: 'roi',
    searchVolume: 4500,
    difficulty: 26,
    category: 'marketing',
    de: {
      term: 'ROI (Return on Investment)',
      shortDefinition: 'ROI misst den finanziellen Ertrag einer Investition im Verhältnis zu deren Kosten.',
      fullDefinition: 'Return on Investment (ROI) ist eine fundamentale Kennzahl zur Bewertung der Rentabilität von Investitionen. Formel: ROI = (Gewinn - Investition) / Investition × 100. Beispiel: 10.000€ Werbeausgaben bringen 50.000€ Umsatz bei 60% Marge = 30.000€ Gewinn. ROI = (30.000 - 10.000) / 10.000 × 100 = 200%. Im Marketing wird ROI oft mit ROAS (Return on Ad Spend) verwechselt - ROAS betrachtet nur Werbeausgaben vs. Umsatz, ROI alle Kosten vs. Gewinn. Für eine korrekte ROI-Berechnung müssen alle Kosten einbezogen werden: Arbeitszeit, Tools, Agenturkosten. Ein positiver ROI bedeutet Gewinn, ein negativer Verlust.',
      relatedTerms: ['ROAS', 'KPI', 'Conversion', 'Performance Marketing', 'Analytics'],
      usageExample: 'Unsere SEO-Investition von 20.000€ generierte 150.000€ zusätzlichen Umsatz - ein ROI von 350%.',
      keyPoints: [
        'Formel: (Gewinn - Investition) / Investition × 100',
        'Positiv = Gewinn, Negativ = Verlust',
        'ROI ≠ ROAS (verschiedene Berechnungen)',
        'Alle Kosten einbeziehen für echten ROI',
        'Zeitraum für Berechnung definieren',
        'Vergleichbarkeit zwischen Kanälen schaffen'
      ]
    },
    en: {
      term: 'ROI (Return on Investment)',
      shortDefinition: 'ROI measures the financial return of an investment relative to its cost.',
      fullDefinition: 'Return on Investment (ROI) is a fundamental metric for evaluating the profitability of investments. Formula: ROI = (Profit - Investment) / Investment × 100. Example: €10,000 ad spend generates €50,000 revenue at 60% margin = €30,000 profit. ROI = (30,000 - 10,000) / 10,000 × 100 = 200%. In marketing, ROI is often confused with ROAS (Return on Ad Spend) - ROAS only considers ad spend vs. revenue, ROI all costs vs. profit. For accurate ROI calculation, all costs must be included: labor time, tools, agency costs. A positive ROI means profit, a negative means loss.',
      relatedTerms: ['ROAS', 'KPI', 'Conversion', 'Performance Marketing', 'Analytics'],
      usageExample: 'Our SEO investment of €20,000 generated €150,000 additional revenue - an ROI of 350%.',
      keyPoints: [
        'Formula: (Profit - Investment) / Investment × 100',
        'Positive = profit, Negative = loss',
        'ROI ≠ ROAS (different calculations)',
        'Include all costs for true ROI',
        'Define time period for calculation',
        'Create comparability between channels'
      ]
    }
  },
  {
    slug: 'crm',
    searchVolume: 5400,
    difficulty: 30,
    category: 'marketing',
    de: {
      term: 'CRM (Customer Relationship Management)',
      shortDefinition: 'CRM bezeichnet Strategien und Software zur Verwaltung von Kundenbeziehungen und Interaktionen.',
      fullDefinition: 'Customer Relationship Management (CRM) umfasst alle Strategien, Prozesse und Technologien zur Verwaltung von Kundenbeziehungen. CRM-Software (wie HubSpot, Salesforce, Pipedrive) speichert Kontaktdaten, Interaktionshistorie, Deals und Aufgaben an einem zentralen Ort. Vorteile: 360°-Kundenansicht, automatisierte Follow-ups, Pipeline-Management, Reporting und Forecasting, verbesserte Team-Zusammenarbeit. Moderne CRMs integrieren Marketing-Automation, E-Mail-Marketing und Analytics. Wichtig: Ein CRM ist nur so gut wie die Datenqualität - regelmäßige Pflege und Schulung sind entscheidend. CRM-Daten sind Gold für personalisiertes Marketing.',
      relatedTerms: ['Lead Management', 'Sales Pipeline', 'Marketing Automation', 'Customer Data', 'HubSpot'],
      usageExample: 'Seit der CRM-Einführung haben wir den Überblick über 3.000 Leads und können Follow-ups automatisieren.',
      keyPoints: [
        'Zentraler Ort für alle Kundendaten',
        '360°-Ansicht auf jeden Kontakt',
        'Automatisierung von Follow-ups möglich',
        'Pipeline-Management für Sales',
        'Datenqualität entscheidend für Erfolg',
        'Integration mit Marketing-Tools wichtig'
      ]
    },
    en: {
      term: 'CRM (Customer Relationship Management)',
      shortDefinition: 'CRM refers to strategies and software for managing customer relationships and interactions.',
      fullDefinition: 'Customer Relationship Management (CRM) encompasses all strategies, processes, and technologies for managing customer relationships. CRM software (like HubSpot, Salesforce, Pipedrive) stores contact data, interaction history, deals, and tasks in one central place. Benefits: 360° customer view, automated follow-ups, pipeline management, reporting and forecasting, improved team collaboration. Modern CRMs integrate marketing automation, email marketing, and analytics. Important: A CRM is only as good as the data quality - regular maintenance and training are crucial. CRM data is gold for personalized marketing.',
      relatedTerms: ['Lead Management', 'Sales Pipeline', 'Marketing Automation', 'Customer Data', 'HubSpot'],
      usageExample: 'Since implementing CRM, we have oversight of 3,000 leads and can automate follow-ups.',
      keyPoints: [
        'Central place for all customer data',
        '360° view of every contact',
        'Automation of follow-ups possible',
        'Pipeline management for sales',
        'Data quality crucial for success',
        'Integration with marketing tools important'
      ]
    }
  },
  {
    slug: 'marketing-automation',
    searchVolume: 2900,
    difficulty: 32,
    category: 'marketing',
    de: {
      term: 'Marketing Automation',
      shortDefinition: 'Marketing Automation nutzt Software zur automatisierten Durchführung von wiederkehrenden Marketing-Aufgaben.',
      fullDefinition: 'Marketing Automation bezeichnet den Einsatz von Software-Plattformen zur Automatisierung wiederkehrender Marketing-Aufgaben. Typische Anwendungen: automatisierte E-Mail-Sequenzen (Nurturing-Kampagnen), Lead Scoring (automatische Bewertung von Leads), Trigger-basierte Aktionen (z.B. Warenkorb-Abbruch-E-Mails), Social Media Scheduling, dynamische Website-Personalisierung. Beliebte Tools: HubSpot, Mailchimp, ActiveCampaign, Marketo. Vorteile: Zeitersparnis, Skalierbarkeit, konsistente Kommunikation, besseres Lead Nurturing. Wichtig: Automation ersetzt nicht Strategie - schlechte Prozesse automatisieren bedeutet nur, schneller schlecht zu arbeiten.',
      relatedTerms: ['CRM', 'E-Mail Marketing', 'Lead Nurturing', 'Workflows', 'HubSpot'],
      usageExample: 'Unsere Marketing Automation sendet automatisch eine 5-teilige E-Mail-Serie nach Whitepaper-Download.',
      keyPoints: [
        'Automatisiert wiederkehrende Aufgaben',
        'Lead Nurturing über E-Mail-Sequenzen',
        'Lead Scoring für Priorisierung',
        'Trigger-basierte Aktionen möglich',
        'Spart Zeit und schafft Konsistenz',
        'Strategie zuerst, dann Automation'
      ]
    },
    en: {
      term: 'Marketing Automation',
      shortDefinition: 'Marketing automation uses software to automatically execute recurring marketing tasks.',
      fullDefinition: 'Marketing automation refers to using software platforms to automate recurring marketing tasks. Typical applications: automated email sequences (nurturing campaigns), lead scoring (automatic lead evaluation), trigger-based actions (e.g., cart abandonment emails), social media scheduling, dynamic website personalization. Popular tools: HubSpot, Mailchimp, ActiveCampaign, Marketo. Benefits: time savings, scalability, consistent communication, better lead nurturing. Important: Automation doesn\'t replace strategy - automating bad processes just means working badly faster.',
      relatedTerms: ['CRM', 'Email Marketing', 'Lead Nurturing', 'Workflows', 'HubSpot'],
      usageExample: 'Our marketing automation automatically sends a 5-part email series after whitepaper download.',
      keyPoints: [
        'Automates recurring tasks',
        'Lead nurturing via email sequences',
        'Lead scoring for prioritization',
        'Trigger-based actions possible',
        'Saves time and creates consistency',
        'Strategy first, then automation'
      ]
    }
  },
  {
    slug: 'landing-page',
    searchVolume: 4100,
    difficulty: 22,
    category: 'marketing',
    de: {
      term: 'Landing Page',
      shortDefinition: 'Eine Landing Page ist eine speziell für Marketing-Kampagnen optimierte Zielseite mit einem klaren Conversion-Ziel.',
      fullDefinition: 'Eine Landing Page ist eine eigenständige Webseite, die für einen spezifischen Marketing-Zweck erstellt wurde. Im Gegensatz zu normalen Website-Seiten hat sie ein einziges Ziel: Conversion (Lead-Generierung, Verkauf, Anmeldung). Best Practices: Klare Überschrift mit Nutzenversprechen, fokussierter Content ohne Ablenkung, starker Call-to-Action oberhalb des Folds, Social Proof (Testimonials, Logos), minimale Navigation (kein Hauptmenü), mobile Optimierung, schnelle Ladezeit. Für PPC-Kampagnen sollte die Landing Page die Anzeigen-Botschaft aufgreifen (Message Match). A/B-Testing zur kontinuierlichen Optimierung.',
      relatedTerms: ['Conversion Rate', 'CTA', 'A/B-Testing', 'Lead Generation', 'PPC'],
      usageExample: 'Unsere Landing Page für das SEO-Whitepaper hat eine Conversion Rate von 35%.',
      keyPoints: [
        'Ein Ziel, eine Handlung',
        'Keine Ablenkung durch Navigation',
        'CTA oberhalb des Folds',
        'Message Match mit Anzeige',
        'Mobile-First Design',
        'Kontinuierliches A/B-Testing'
      ]
    },
    en: {
      term: 'Landing Page',
      shortDefinition: 'A landing page is a destination page specifically optimized for marketing campaigns with a clear conversion goal.',
      fullDefinition: 'A landing page is a standalone web page created for a specific marketing purpose. Unlike regular website pages, it has a single goal: conversion (lead generation, sale, signup). Best practices: Clear headline with value proposition, focused content without distraction, strong call-to-action above the fold, social proof (testimonials, logos), minimal navigation (no main menu), mobile optimization, fast loading time. For PPC campaigns, the landing page should echo the ad message (message match). A/B testing for continuous optimization.',
      relatedTerms: ['Conversion Rate', 'CTA', 'A/B Testing', 'Lead Generation', 'PPC'],
      usageExample: 'Our landing page for the SEO whitepaper has a 35% conversion rate.',
      keyPoints: [
        'One goal, one action',
        'No distraction from navigation',
        'CTA above the fold',
        'Message match with ad',
        'Mobile-first design',
        'Continuous A/B testing'
      ]
    }
  },
  {
    slug: 'ppc',
    searchVolume: 3200,
    difficulty: 28,
    category: 'marketing',
    de: {
      term: 'PPC (Pay-Per-Click)',
      shortDefinition: 'PPC ist ein Werbemodell, bei dem Werbetreibende nur bezahlen, wenn auf ihre Anzeige geklickt wird.',
      fullDefinition: 'Pay-Per-Click (PPC) ist ein Online-Werbemodell, bei dem Kosten nur entstehen, wenn ein Nutzer auf die Anzeige klickt. Die bekannteste PPC-Plattform ist Google Ads (früher Google AdWords), aber auch Meta Ads (Facebook/Instagram), LinkedIn Ads und Microsoft Ads (Bing) arbeiten mit PPC. Die Kosten pro Klick (CPC) werden durch Auktionen bestimmt und variieren je nach Keyword-Wettbewerb, Qualitätsfaktor und Gebot. Vorteile: Sofortige Sichtbarkeit, messbare Ergebnisse, präzises Targeting, volle Kostenkontrolle. PPC ergänzt SEO gut: PPC für schnelle Ergebnisse, SEO für langfristigen organischen Traffic.',
      relatedTerms: ['Google Ads', 'CPC', 'SEA', 'Conversion', 'Qualitätsfaktor'],
      usageExample: 'Unsere PPC-Kampagne generiert 200 Leads pro Monat bei einem CPC von 2,50€.',
      keyPoints: [
        'Bezahlung nur bei Klick',
        'Google Ads ist die größte Plattform',
        'CPC durch Auktion bestimmt',
        'Qualitätsfaktor beeinflusst Kosten',
        'Sofortige Sichtbarkeit möglich',
        'Ergänzt SEO für Full-Funnel-Strategie'
      ]
    },
    en: {
      term: 'PPC (Pay-Per-Click)',
      shortDefinition: 'PPC is an advertising model where advertisers only pay when their ad is clicked.',
      fullDefinition: 'Pay-Per-Click (PPC) is an online advertising model where costs only occur when a user clicks on the ad. The most well-known PPC platform is Google Ads (formerly Google AdWords), but Meta Ads (Facebook/Instagram), LinkedIn Ads, and Microsoft Ads (Bing) also work with PPC. Cost per click (CPC) is determined by auctions and varies based on keyword competition, quality score, and bid. Benefits: Immediate visibility, measurable results, precise targeting, full cost control. PPC complements SEO well: PPC for quick results, SEO for long-term organic traffic.',
      relatedTerms: ['Google Ads', 'CPC', 'SEA', 'Conversion', 'Quality Score'],
      usageExample: 'Our PPC campaign generates 200 leads per month at a €2.50 CPC.',
      keyPoints: [
        'Payment only on click',
        'Google Ads is the largest platform',
        'CPC determined by auction',
        'Quality score affects costs',
        'Immediate visibility possible',
        'Complements SEO for full-funnel strategy'
      ]
    }
  },
  {
    slug: 'retargeting',
    searchVolume: 2300,
    difficulty: 26,
    category: 'marketing',
    de: {
      term: 'Retargeting',
      shortDefinition: 'Retargeting zeigt Werbeanzeigen an Nutzer, die bereits mit Ihrer Website oder App interagiert haben.',
      fullDefinition: 'Retargeting (auch Remarketing genannt) ist eine Form der Online-Werbung, die Anzeigen an Personen ausspielt, die bereits Ihre Website besucht oder mit Ihrer Marke interagiert haben. Technisch funktioniert es über Cookies oder Pixel (z.B. Facebook Pixel, Google Tag). Anwendungsfälle: Warenkorbabbrecher zurückholen, Produktbetrachter zum Kauf bewegen, Blog-Leser zu Leads konvertieren, bestehende Kunden zu Wiederkäufern machen. Plattformen: Google Display Network, Meta Ads, LinkedIn, Criteo. Best Practices: Frequency Capping (nicht nerven), segmentierte Audiences, unterschiedliche Creatives pro Funnel-Phase, Burn Pixel nach Conversion.',
      relatedTerms: ['Remarketing', 'Facebook Pixel', 'Google Ads', 'Conversion', 'Customer Journey'],
      usageExample: 'Unser Retargeting für Warenkorbabbrecher erzielt eine 5x höhere Conversion Rate als Cold Ads.',
      keyPoints: [
        'Richtet sich an Website-Besucher',
        'Höhere Conversion als Cold Traffic',
        'Basiert auf Cookies/Pixel-Tracking',
        'Frequency Capping wichtig',
        'Verschiedene Segmente erstellen',
        'Burn Pixel nach Conversion einsetzen'
      ]
    },
    en: {
      term: 'Retargeting',
      shortDefinition: 'Retargeting shows ads to users who have already interacted with your website or app.',
      fullDefinition: 'Retargeting (also called remarketing) is a form of online advertising that displays ads to people who have already visited your website or interacted with your brand. Technically it works via cookies or pixels (e.g., Facebook Pixel, Google Tag). Use cases: Bring back cart abandoners, move product viewers to purchase, convert blog readers to leads, turn existing customers into repeat buyers. Platforms: Google Display Network, Meta Ads, LinkedIn, Criteo. Best practices: Frequency capping (don\'t annoy), segmented audiences, different creatives per funnel phase, burn pixel after conversion.',
      relatedTerms: ['Remarketing', 'Facebook Pixel', 'Google Ads', 'Conversion', 'Customer Journey'],
      usageExample: 'Our retargeting for cart abandoners achieves 5x higher conversion rate than cold ads.',
      keyPoints: [
        'Targets website visitors',
        'Higher conversion than cold traffic',
        'Based on cookie/pixel tracking',
        'Frequency capping important',
        'Create different segments',
        'Use burn pixel after conversion'
      ]
    }
  },
  {
    slug: 'organic-traffic',
    searchVolume: 2600,
    difficulty: 20,
    category: 'marketing',
    de: {
      term: 'Organic Traffic (Organischer Traffic)',
      shortDefinition: 'Organischer Traffic bezeichnet Besucher, die über unbezahlte Suchergebnisse auf eine Website kommen.',
      fullDefinition: 'Organischer Traffic umfasst alle Website-Besucher, die über unbezahlte (organische) Suchergebnisse von Suchmaschinen wie Google kommen. Er ist das Hauptziel von SEO-Maßnahmen und unterscheidet sich von bezahltem Traffic (PPC/Ads), direktem Traffic (URL-Eingabe), Referral Traffic (Links von anderen Websites) und Social Traffic (Social Media). Vorteile: Nachhaltig (einmal erreicht, bringt kontinuierlich Besucher), kostenlos (keine Klickkosten), hohe Vertrauenswürdigkeit, gute Conversion Rates. Nachteile: Zeitaufwändig aufzubauen, Algorithmus-Änderungen können Einfluss haben. In Google Analytics unter Akquisition > Traffic-Akquisition einsehbar.',
      relatedTerms: ['SEO', 'Traffic', 'Google Analytics', 'SERP', 'Rankings'],
      usageExample: '65% unseres Website-Traffics ist organisch - das sind 50.000 Besucher pro Monat ohne Werbekosten.',
      keyPoints: [
        'Kommt von unbezahlten Suchergebnissen',
        'Hauptziel von SEO',
        'Nachhaltig und "kostenlos"',
        'Braucht Zeit zum Aufbauen',
        'In Google Analytics messbar',
        'Hohe Vertrauenswürdigkeit bei Nutzern'
      ]
    },
    en: {
      term: 'Organic Traffic',
      shortDefinition: 'Organic traffic refers to visitors who come to a website through unpaid search results.',
      fullDefinition: 'Organic traffic includes all website visitors who come through unpaid (organic) search results from search engines like Google. It is the main goal of SEO efforts and differs from paid traffic (PPC/Ads), direct traffic (URL entry), referral traffic (links from other websites), and social traffic (social media). Benefits: Sustainable (once achieved, brings continuous visitors), free (no click costs), high trustworthiness, good conversion rates. Disadvantages: Time-consuming to build, algorithm changes can have impact. Viewable in Google Analytics under Acquisition > Traffic Acquisition.',
      relatedTerms: ['SEO', 'Traffic', 'Google Analytics', 'SERP', 'Rankings'],
      usageExample: '65% of our website traffic is organic - that\'s 50,000 visitors per month without ad costs.',
      keyPoints: [
        'Comes from unpaid search results',
        'Main goal of SEO',
        'Sustainable and "free"',
        'Takes time to build',
        'Measurable in Google Analytics',
        'High trustworthiness with users'
      ]
    }
  },
  {
    slug: 'attribution',
    searchVolume: 1800,
    difficulty: 35,
    category: 'marketing',
    de: {
      term: 'Attribution',
      shortDefinition: 'Attribution ordnet Conversions den verschiedenen Marketing-Touchpoints der Customer Journey zu.',
      fullDefinition: 'Attribution im Marketing beschreibt den Prozess, Conversions den verschiedenen Kanälen und Touchpoints zuzuordnen, die ein Nutzer vor der Conversion berührt hat. Attributionsmodelle: Last-Click (100% an letzten Touchpoint), First-Click (100% an ersten), Linear (gleichmäßig verteilt), Time Decay (mehr Gewicht auf letzte Interaktionen), Position-based/U-shaped (40-20-40 Verteilung), Data-driven (algorithmusbasiert). Die Wahl des Modells beeinflusst Budget-Entscheidungen erheblich. GA4 verwendet standardmäßig Data-driven Attribution. Herausforderungen: Cross-Device Tracking, Cookie-Beschränkungen, View-through vs. Click-through. Multi-Touch-Attribution gibt das realistischste Bild.',
      relatedTerms: ['Customer Journey', 'Conversion', 'Google Analytics', 'Touchpoints', 'Marketing Mix'],
      usageExample: 'Mit Position-based Attribution sehen wir, dass Social Media wichtig für Awareness ist, obwohl es selten der letzte Klick ist.',
      keyPoints: [
        'Ordnet Conversions Touchpoints zu',
        'Verschiedene Modelle verfügbar',
        'Last-Click oft zu simplifizierend',
        'GA4 nutzt Data-driven Attribution',
        'Cross-Device Tracking ist Herausforderung',
        'Beeinflusst Budget-Entscheidungen stark'
      ]
    },
    en: {
      term: 'Attribution',
      shortDefinition: 'Attribution assigns conversions to the various marketing touchpoints in the customer journey.',
      fullDefinition: 'Attribution in marketing describes the process of assigning conversions to the different channels and touchpoints a user touched before converting. Attribution models: Last-click (100% to last touchpoint), First-click (100% to first), Linear (evenly distributed), Time decay (more weight on recent interactions), Position-based/U-shaped (40-20-40 distribution), Data-driven (algorithm-based). The choice of model significantly impacts budget decisions. GA4 uses data-driven attribution by default. Challenges: Cross-device tracking, cookie restrictions, view-through vs. click-through. Multi-touch attribution provides the most realistic picture.',
      relatedTerms: ['Customer Journey', 'Conversion', 'Google Analytics', 'Touchpoints', 'Marketing Mix'],
      usageExample: 'With position-based attribution, we see social media is important for awareness even though it\'s rarely the last click.',
      keyPoints: [
        'Assigns conversions to touchpoints',
        'Various models available',
        'Last-click often too simplistic',
        'GA4 uses data-driven attribution',
        'Cross-device tracking is challenging',
        'Strongly influences budget decisions'
      ]
    }
  },
  {
    slug: 'cpm',
    searchVolume: 2100,
    difficulty: 18,
    category: 'marketing',
    de: {
      term: 'CPM (Cost Per Mille)',
      shortDefinition: 'CPM ist der Preis für 1.000 Werbeeinblendungen (Impressionen) einer Anzeige.',
      fullDefinition: 'Cost Per Mille (CPM, auch TKP - Tausend-Kontakt-Preis genannt) bezeichnet die Kosten für 1.000 Impressionen einer Werbeanzeige. "Mille" ist lateinisch für 1.000. Formel: CPM = (Werbekosten / Impressionen) × 1.000. Beispiel: 500€ für 100.000 Impressionen = CPM von 5€. CPM wird hauptsächlich bei Display-Werbung, Social Media Ads und Video-Werbung verwendet, während Suchmaschinen-Werbung meist CPC (Cost Per Click) nutzt. Typische CPM-Werte: Facebook 5-15€, LinkedIn 25-50€, Google Display 1-5€. CPM eignet sich besonders für Brand-Awareness-Kampagnen, wo Sichtbarkeit wichtiger ist als sofortige Conversions.',
      relatedTerms: ['CPC', 'Impressionen', 'Display Ads', 'Brand Awareness', 'Media Buying'],
      usageExample: 'Unsere YouTube-Kampagne hat einen CPM von 12€ - günstiger als TV-Werbung mit vergleichbarer Reichweite.',
      keyPoints: [
        'Preis pro 1.000 Impressionen',
        'Mille = lateinisch für 1.000',
        'Hauptsächlich bei Display/Video Ads',
        'Ideal für Brand Awareness',
        'LinkedIn teurer als Facebook',
        'Nicht mit CPC verwechseln'
      ]
    },
    en: {
      term: 'CPM (Cost Per Mille)',
      shortDefinition: 'CPM is the price for 1,000 ad impressions (views) of an advertisement.',
      fullDefinition: 'Cost Per Mille (CPM) refers to the cost for 1,000 impressions of an advertisement. "Mille" is Latin for 1,000. Formula: CPM = (Ad Cost / Impressions) × 1,000. Example: €500 for 100,000 impressions = CPM of €5. CPM is mainly used in display advertising, social media ads, and video advertising, while search engine advertising typically uses CPC (Cost Per Click). Typical CPM values: Facebook €5-15, LinkedIn €25-50, Google Display €1-5. CPM is particularly suitable for brand awareness campaigns where visibility is more important than immediate conversions.',
      relatedTerms: ['CPC', 'Impressions', 'Display Ads', 'Brand Awareness', 'Media Buying'],
      usageExample: 'Our YouTube campaign has a €12 CPM - cheaper than TV advertising with comparable reach.',
      keyPoints: [
        'Price per 1,000 impressions',
        'Mille = Latin for 1,000',
        'Mainly for display/video ads',
        'Ideal for brand awareness',
        'LinkedIn more expensive than Facebook',
        'Don\'t confuse with CPC'
      ]
    }
  },
  {
    slug: 'seo-audit',
    searchVolume: 2400,
    difficulty: 25,
    category: 'marketing',
    de: {
      term: 'SEO Audit',
      shortDefinition: 'Ein SEO Audit ist eine umfassende Analyse einer Website zur Identifizierung von Optimierungspotenzialen.',
      fullDefinition: 'Ein SEO Audit ist eine systematische Überprüfung aller SEO-relevanten Faktoren einer Website. Analysebereiche: Technisches SEO (Crawlability, Indexierung, Ladezeit, Mobile-Friendliness, Core Web Vitals), OnPage SEO (Content-Qualität, Keywords, Meta-Tags, interne Verlinkung, URL-Struktur), OffPage SEO (Backlink-Profil, Domain Authority, Toxic Links), Content Audit (Thin Content, Duplicate Content, Content Gaps). Tools: Screaming Frog, Ahrefs, Semrush, Google Search Console, PageSpeed Insights. Ergebnis ist ein Maßnahmenplan mit priorisierten Empfehlungen. Regelmäßige Audits (halbjährlich) werden empfohlen, besonders nach Website-Relaunch oder Ranking-Verlusten.',
      relatedTerms: ['SEO', 'Technisches SEO', 'OnPage SEO', 'Backlinks', 'Screaming Frog'],
      usageExample: 'Unser SEO Audit deckte 45 technische Fehler auf, deren Behebung zu 30% mehr Traffic führte.',
      keyPoints: [
        'Umfassende Website-Analyse',
        'Technisch, OnPage und OffPage',
        'Ergebnis: Priorisierter Maßnahmenplan',
        'Tools: Screaming Frog, Ahrefs, Semrush',
        'Halbjährlich empfohlen',
        'Besonders wichtig nach Relaunch'
      ]
    },
    en: {
      term: 'SEO Audit',
      shortDefinition: 'An SEO audit is a comprehensive website analysis to identify optimization potential.',
      fullDefinition: 'An SEO audit is a systematic review of all SEO-relevant factors of a website. Analysis areas: Technical SEO (crawlability, indexing, loading time, mobile-friendliness, Core Web Vitals), OnPage SEO (content quality, keywords, meta tags, internal linking, URL structure), OffPage SEO (backlink profile, domain authority, toxic links), Content Audit (thin content, duplicate content, content gaps). Tools: Screaming Frog, Ahrefs, Semrush, Google Search Console, PageSpeed Insights. Result is an action plan with prioritized recommendations. Regular audits (semi-annually) are recommended, especially after website relaunch or ranking losses.',
      relatedTerms: ['SEO', 'Technical SEO', 'OnPage SEO', 'Backlinks', 'Screaming Frog'],
      usageExample: 'Our SEO audit uncovered 45 technical errors whose fixes led to 30% more traffic.',
      keyPoints: [
        'Comprehensive website analysis',
        'Technical, OnPage and OffPage',
        'Result: Prioritized action plan',
        'Tools: Screaming Frog, Ahrefs, Semrush',
        'Semi-annual recommended',
        'Especially important after relaunch'
      ]
    }
  },
  {
    slug: 'engagement-rate',
    searchVolume: 2000,
    difficulty: 20,
    category: 'marketing',
    de: {
      term: 'Engagement Rate',
      shortDefinition: 'Die Engagement Rate misst die Interaktionsrate von Nutzern mit Content im Verhältnis zur Reichweite.',
      fullDefinition: 'Die Engagement Rate ist eine Metrik, die zeigt, wie stark Nutzer mit Inhalten interagieren. Je nach Plattform unterschiedlich berechnet. Social Media: (Likes + Kommentare + Shares + Saves) / Follower × 100. Typische Werte: Instagram 1-5%, Facebook 0.5-1%, LinkedIn 2-5%. In Google Analytics 4 ersetzt die Engagement Rate die Bounce Rate: Sessions mit mindestens 10 Sekunden Dauer ODER Conversion-Event ODER 2+ Seitenaufrufe gelten als "engaged". Hohe Engagement Rates signalisieren relevanten Content und aktive Community. Influencer-Marketing: Engagement Rate wichtiger als Follower-Zahl.',
      relatedTerms: ['Social Media', 'KPI', 'Bounce Rate', 'Content Marketing', 'Analytics'],
      usageExample: 'Unsere Instagram-Posts haben eine durchschnittliche Engagement Rate von 4,5% - deutlich über dem Branchendurchschnitt.',
      keyPoints: [
        'Misst Interaktionen relativ zur Reichweite',
        'Plattform-spezifische Berechnung',
        'In GA4: ersetzt Bounce Rate',
        'Qualitätsindikator für Content',
        'Wichtiger als Follower-Zahl',
        'Benchmark: Instagram 1-5%'
      ]
    },
    en: {
      term: 'Engagement Rate',
      shortDefinition: 'Engagement rate measures the interaction rate of users with content relative to reach.',
      fullDefinition: 'Engagement rate is a metric that shows how strongly users interact with content. Calculated differently depending on platform. Social Media: (Likes + Comments + Shares + Saves) / Followers × 100. Typical values: Instagram 1-5%, Facebook 0.5-1%, LinkedIn 2-5%. In Google Analytics 4, engagement rate replaces bounce rate: Sessions with at least 10 seconds duration OR conversion event OR 2+ page views count as "engaged". High engagement rates signal relevant content and active community. Influencer marketing: Engagement rate more important than follower count.',
      relatedTerms: ['Social Media', 'KPI', 'Bounce Rate', 'Content Marketing', 'Analytics'],
      usageExample: 'Our Instagram posts have an average engagement rate of 4.5% - well above the industry average.',
      keyPoints: [
        'Measures interactions relative to reach',
        'Platform-specific calculation',
        'In GA4: replaces bounce rate',
        'Quality indicator for content',
        'More important than follower count',
        'Benchmark: Instagram 1-5%'
      ]
    }
  },
  {
    slug: 'suchintention',
    searchVolume: 1600,
    difficulty: 22,
    category: 'marketing',
    de: {
      term: 'Suchintention (Search Intent)',
      shortDefinition: 'Die Suchintention beschreibt das Ziel, das ein Nutzer mit einer Suchanfrage verfolgt.',
      fullDefinition: 'Search Intent (Suchintention, User Intent) beschreibt, was ein Nutzer tatsächlich finden oder erreichen möchte, wenn er eine Suchanfrage stellt. Vier Haupttypen: Informational (Information suchen: "wie funktioniert SEO"), Navigational (bestimmte Website finden: "Facebook Login"), Transactional (Kauf beabsichtigt: "iPhone 15 kaufen"), Commercial Investigation (Vergleich vor Kauf: "beste SEO Tools 2024"). Google optimiert SERPs für die erkannte Intention - wer dagegen arbeitet, rankt nicht. Content muss die Suchintention erfüllen: Für "SEO lernen" erwartet Google Guides, nicht Produktseiten. Intention analysieren durch: SERP-Analyse, "People Also Ask", Google Autocomplete.',
      relatedTerms: ['Keywords', 'SERP', 'Content Marketing', 'SEO', 'User Experience'],
      usageExample: 'Für "SEO Agentur Wien" ist die Intention Commercial - unsere Landingpage muss Dienstleistungen präsentieren, nicht nur informieren.',
      keyPoints: [
        '4 Typen: Informational, Navigational, Transactional, Commercial',
        'Google erkennt und priorisiert passenden Content',
        'SERP-Analyse zeigt erwartete Intention',
        'Mismatch = schlechte Rankings',
        'Content muss Intention erfüllen',
        'Beeinflusst Content-Format und -Struktur'
      ]
    },
    en: {
      term: 'Search Intent',
      shortDefinition: 'Search intent describes the goal a user pursues with a search query.',
      fullDefinition: 'Search Intent (also called user intent) describes what a user actually wants to find or achieve when making a search query. Four main types: Informational (seeking information: "how does SEO work"), Navigational (finding specific website: "Facebook login"), Transactional (purchase intended: "buy iPhone 15"), Commercial Investigation (comparison before purchase: "best SEO tools 2024"). Google optimizes SERPs for the recognized intent - working against it means no ranking. Content must fulfill search intent: For "learn SEO" Google expects guides, not product pages. Analyze intent through: SERP analysis, "People Also Ask", Google Autocomplete.',
      relatedTerms: ['Keywords', 'SERP', 'Content Marketing', 'SEO', 'User Experience'],
      usageExample: 'For "SEO agency Vienna" the intent is Commercial - our landing page must present services, not just inform.',
      keyPoints: [
        '4 types: Informational, Navigational, Transactional, Commercial',
        'Google recognizes and prioritizes matching content',
        'SERP analysis shows expected intent',
        'Mismatch = poor rankings',
        'Content must fulfill intent',
        'Influences content format and structure'
      ]
    }
  },
  {
    slug: 'personalisierung',
    searchVolume: 1900,
    difficulty: 28,
    category: 'marketing',
    de: {
      term: 'Personalisierung',
      shortDefinition: 'Personalisierung passt Marketing-Inhalte und Erlebnisse an individuelle Nutzer an.',
      fullDefinition: 'Personalisierung im Marketing bedeutet, Inhalte, Angebote und Erlebnisse auf Basis von Nutzerdaten individuell anzupassen. Ebenen: Basis (Name in E-Mail), Segment-basiert (nach Branche/Interesse), Verhaltens-basiert (basierend auf Aktionen), Echtzeit (dynamische Website-Inhalte). Datenquellen: CRM-Daten, Website-Verhalten, Kaufhistorie, Umfrage-Antworten, demografische Daten. Anwendungen: Personalisierte E-Mails, dynamische Website-Inhalte, Produktempfehlungen, retargeted Ads. Tools: HubSpot, Dynamic Yield, Optimizely. ROI: Personalisierte E-Mails haben 29% höhere Open Rates und 41% höhere Click Rates. Datenschutz (DSGVO) beachten.',
      relatedTerms: ['Marketing Automation', 'CRM', 'Customer Experience', 'Segmentierung', 'DSGVO'],
      usageExample: 'Durch personalisierte Produktempfehlungen basierend auf dem Surfverhalten stieg unser Umsatz um 15%.',
      keyPoints: [
        'Individuelle Anpassung von Inhalten',
        'Verschiedene Personalisierungs-Ebenen',
        'Datenqualität entscheidend',
        '29% höhere E-Mail Open Rates',
        'DSGVO-Konformität wichtig',
        'Balance: Relevant, nicht creepy'
      ]
    },
    en: {
      term: 'Personalization',
      shortDefinition: 'Personalization adapts marketing content and experiences to individual users.',
      fullDefinition: 'Personalization in marketing means adapting content, offers, and experiences based on user data. Levels: Basic (name in email), Segment-based (by industry/interest), Behavior-based (based on actions), Real-time (dynamic website content). Data sources: CRM data, website behavior, purchase history, survey responses, demographic data. Applications: Personalized emails, dynamic website content, product recommendations, retargeted ads. Tools: HubSpot, Dynamic Yield, Optimizely. ROI: Personalized emails have 29% higher open rates and 41% higher click rates. Consider data privacy (GDPR).',
      relatedTerms: ['Marketing Automation', 'CRM', 'Customer Experience', 'Segmentation', 'GDPR'],
      usageExample: 'Through personalized product recommendations based on browsing behavior, our revenue increased by 15%.',
      keyPoints: [
        'Individual adaptation of content',
        'Different personalization levels',
        'Data quality crucial',
        '29% higher email open rates',
        'GDPR compliance important',
        'Balance: Relevant, not creepy'
      ]
    }
  },
  {
    slug: 'viral-marketing',
    searchVolume: 1700,
    difficulty: 24,
    category: 'marketing',
    de: {
      term: 'Viral Marketing',
      shortDefinition: 'Viral Marketing zielt darauf ab, Inhalte zu erstellen, die sich wie ein Virus durch Teilen verbreiten.',
      fullDefinition: 'Viral Marketing bezeichnet Strategien, die darauf abzielen, dass Inhalte sich durch organisches Teilen exponentiell verbreiten. Der Begriff stammt von der Analogie zur Virusverbreitung. Faktoren für Viralität: Emotionen auslösen (Freude, Überraschung, Empörung), Social Currency (teilenswert erscheinen), praktischer Nutzen, Story-telling, Timing. Formate: Videos, Memes, interaktive Inhalte, Challenges. Risiken: Unkontrollierbare Verbreitung, potenzielle negative Viralität, schwer planbar. Bekannte Beispiele: Ice Bucket Challenge, Old Spice "The Man Your Man Could Smell Like". Viralität lässt sich nicht erzwingen, aber die Wahrscheinlichkeit durch richtige Elemente erhöhen.',
      relatedTerms: ['Social Media Marketing', 'Content Marketing', 'Word-of-Mouth', 'Brand Awareness', 'Memes'],
      usageExample: 'Das Weihnachtsvideo ging viral - 10 Millionen Views in 3 Tagen, ohne Werbebudget.',
      keyPoints: [
        'Exponentielles Wachstum durch Teilen',
        'Emotionen sind Treiber',
        'Nicht erzwingbar, nur förderbar',
        'Hohes Risiko, hohe Belohnung',
        'Timing ist entscheidend',
        'Authentizität wichtiger als Perfektion'
      ]
    },
    en: {
      term: 'Viral Marketing',
      shortDefinition: 'Viral marketing aims to create content that spreads like a virus through sharing.',
      fullDefinition: 'Viral marketing refers to strategies aimed at making content spread exponentially through organic sharing. The term comes from the analogy to virus spread. Factors for virality: Trigger emotions (joy, surprise, outrage), social currency (appear worth sharing), practical value, storytelling, timing. Formats: Videos, memes, interactive content, challenges. Risks: Uncontrollable spread, potential negative virality, hard to plan. Famous examples: Ice Bucket Challenge, Old Spice "The Man Your Man Could Smell Like". Virality cannot be forced but probability can be increased through right elements.',
      relatedTerms: ['Social Media Marketing', 'Content Marketing', 'Word-of-Mouth', 'Brand Awareness', 'Memes'],
      usageExample: 'The Christmas video went viral - 10 million views in 3 days, without ad budget.',
      keyPoints: [
        'Exponential growth through sharing',
        'Emotions are drivers',
        'Cannot be forced, only encouraged',
        'High risk, high reward',
        'Timing is crucial',
        'Authenticity more important than perfection'
      ]
    }
  },

  // ===========================================
  // BATCH 8: Design & UX Terms (10 terms)
  // ===========================================

  {
    slug: 'responsive-design',
    searchVolume: 3600,
    difficulty: 24,
    category: 'design',
    de: {
      term: 'Responsive Design',
      shortDefinition: 'Responsive Design passt Websites automatisch an verschiedene Bildschirmgrößen und Geräte an.',
      fullDefinition: 'Responsive Webdesign ist ein Gestaltungsansatz, bei dem sich eine Website automatisch an die Bildschirmgröße des jeweiligen Geräts anpasst - ob Desktop, Tablet oder Smartphone. Technisch basiert es auf flexiblen Grids, flexiblen Bildern und CSS Media Queries. Seit 2015 ist Mobile-Friendliness ein Google Ranking-Faktor (Mobilegeddon), seit 2018 gilt Mobile-First-Indexing. Breakpoints definieren, ab welcher Bildschirmbreite das Layout wechselt (typisch: 576px, 768px, 992px, 1200px). Best Practices: Mobile-First Entwicklung, Touch-Targets mindestens 44×44px, lesbare Schriftgrößen ohne Zoom, keine horizontalen Scrollbars. Responsive Design ist heute Standard - separate Mobile-Sites sind veraltet.',
      relatedTerms: ['Mobile-First', 'CSS', 'Media Queries', 'UX Design', 'Core Web Vitals'],
      usageExample: 'Unsere responsive Website passt sich nahtlos vom 27-Zoll-Desktop bis zum iPhone an.',
      keyPoints: [
        'Automatische Anpassung an Bildschirmgröße',
        'Basiert auf flexiblen Grids und Media Queries',
        'Mobile-First-Indexing seit 2018',
        'Breakpoints definieren Layout-Wechsel',
        'Touch-Targets mind. 44×44px',
        'Standard für moderne Websites'
      ]
    },
    en: {
      term: 'Responsive Design',
      shortDefinition: 'Responsive design automatically adapts websites to different screen sizes and devices.',
      fullDefinition: 'Responsive web design is a design approach where a website automatically adapts to the screen size of the respective device - whether desktop, tablet, or smartphone. Technically it\'s based on flexible grids, flexible images, and CSS media queries. Since 2015, mobile-friendliness is a Google ranking factor (Mobilegeddon), since 2018 mobile-first indexing applies. Breakpoints define at which screen width the layout changes (typical: 576px, 768px, 992px, 1200px). Best practices: Mobile-first development, touch targets at least 44×44px, readable font sizes without zoom, no horizontal scrollbars. Responsive design is standard today - separate mobile sites are outdated.',
      relatedTerms: ['Mobile-First', 'CSS', 'Media Queries', 'UX Design', 'Core Web Vitals'],
      usageExample: 'Our responsive website adapts seamlessly from 27-inch desktop to iPhone.',
      keyPoints: [
        'Automatic adaptation to screen size',
        'Based on flexible grids and media queries',
        'Mobile-first indexing since 2018',
        'Breakpoints define layout changes',
        'Touch targets min. 44×44px',
        'Standard for modern websites'
      ]
    }
  },
  {
    slug: 'user-experience',
    searchVolume: 4200,
    difficulty: 28,
    category: 'design',
    de: {
      term: 'User Experience (UX)',
      shortDefinition: 'User Experience beschreibt das gesamte Erlebnis eines Nutzers bei der Interaktion mit einem Produkt oder Service.',
      fullDefinition: 'User Experience (UX) umfasst alle Aspekte der Interaktion eines Nutzers mit einem Unternehmen, seinen Services und Produkten. Gute UX ist mehr als schönes Design - sie macht Produkte nützlich, nutzbar und angenehm. Die Honeycomb von Peter Morville definiert 7 UX-Facetten: Useful (nützlich), Usable (nutzbar), Findable (auffindbar), Credible (glaubwürdig), Desirable (attraktiv), Accessible (zugänglich), Valuable (wertvoll). UX-Prozess: User Research → Information Architecture → Wireframing → Prototyping → Testing → Iteration. Core Web Vitals machen UX-Metriken zu SEO-Faktoren. Gute UX steigert Conversions, reduziert Support-Anfragen und erhöht Kundenzufriedenheit.',
      relatedTerms: ['UI Design', 'Usability', 'User Research', 'Wireframe', 'Customer Journey'],
      usageExample: 'Die UX-Optimierung unseres Checkout-Prozesses reduzierte Kaufabbrüche um 40%.',
      keyPoints: [
        'Gesamterlebnis der Nutzer-Interaktion',
        'Mehr als nur Design: Utility + Usability',
        '7 Facetten: Useful, Usable, Findable, etc.',
        'Prozess: Research → Design → Test → Iterate',
        'Beeinflusst Conversions und Zufriedenheit',
        'Core Web Vitals machen UX zum SEO-Faktor'
      ]
    },
    en: {
      term: 'User Experience (UX)',
      shortDefinition: 'User experience describes the entire experience a user has when interacting with a product or service.',
      fullDefinition: 'User Experience (UX) encompasses all aspects of a user\'s interaction with a company, its services, and products. Good UX is more than beautiful design - it makes products useful, usable, and enjoyable. Peter Morville\'s Honeycomb defines 7 UX facets: Useful, Usable, Findable, Credible, Desirable, Accessible, Valuable. UX process: User Research → Information Architecture → Wireframing → Prototyping → Testing → Iteration. Core Web Vitals make UX metrics SEO factors. Good UX increases conversions, reduces support requests, and improves customer satisfaction.',
      relatedTerms: ['UI Design', 'Usability', 'User Research', 'Wireframe', 'Customer Journey'],
      usageExample: 'UX optimization of our checkout process reduced cart abandonment by 40%.',
      keyPoints: [
        'Total experience of user interaction',
        'More than design: Utility + Usability',
        '7 facets: Useful, Usable, Findable, etc.',
        'Process: Research → Design → Test → Iterate',
        'Influences conversions and satisfaction',
        'Core Web Vitals make UX an SEO factor'
      ]
    }
  },
  {
    slug: 'prototyping',
    searchVolume: 2100,
    difficulty: 22,
    category: 'design',
    de: {
      term: 'Prototyping',
      shortDefinition: 'Prototyping erstellt frühe Versionen eines Produkts zur Validierung von Design-Entscheidungen.',
      fullDefinition: 'Prototyping ist die Erstellung früher Produktversionen zur Validierung von Konzepten, Designs und Funktionen bevor die eigentliche Entwicklung beginnt. Prototypen-Typen: Low-Fidelity (Papier-Skizzen, Wireframes), Mid-Fidelity (klickbare Wireframes), High-Fidelity (pixelgenaue, interaktive Prototypen). Tools: Figma, Adobe XD, Sketch, InVision, Principle für Animationen. Vorteile: Frühe Fehlererkennung, günstiger als Änderungen im Code, Basis für User Testing, Stakeholder-Alignment. Der Prototyp ist nicht das finale Produkt - "Fake it till you make it". Je früher getestet wird, desto günstiger sind Korrekturen.',
      relatedTerms: ['Wireframe', 'UI Design', 'User Testing', 'Figma', 'Design Sprint'],
      usageExample: 'Mit einem klickbaren Figma-Prototyp testeten wir die neue Navigation mit 10 Nutzern vor der Entwicklung.',
      keyPoints: [
        'Frühe Produktversionen zur Validierung',
        'Low/Mid/High-Fidelity Stufen',
        'Tools: Figma, Adobe XD, Sketch',
        'Günstiger als Code-Änderungen',
        'Basis für User Testing',
        'Früh testen, früh korrigieren'
      ]
    },
    en: {
      term: 'Prototyping',
      shortDefinition: 'Prototyping creates early versions of a product to validate design decisions.',
      fullDefinition: 'Prototyping is creating early product versions to validate concepts, designs, and functions before actual development begins. Prototype types: Low-fidelity (paper sketches, wireframes), Mid-fidelity (clickable wireframes), High-fidelity (pixel-perfect, interactive prototypes). Tools: Figma, Adobe XD, Sketch, InVision, Principle for animations. Benefits: Early error detection, cheaper than code changes, basis for user testing, stakeholder alignment. The prototype is not the final product - "fake it till you make it". The earlier testing happens, the cheaper corrections are.',
      relatedTerms: ['Wireframe', 'UI Design', 'User Testing', 'Figma', 'Design Sprint'],
      usageExample: 'With a clickable Figma prototype, we tested the new navigation with 10 users before development.',
      keyPoints: [
        'Early product versions for validation',
        'Low/Mid/High-fidelity levels',
        'Tools: Figma, Adobe XD, Sketch',
        'Cheaper than code changes',
        'Basis for user testing',
        'Test early, correct early'
      ]
    }
  },
  {
    slug: 'design-system',
    searchVolume: 2400,
    difficulty: 30,
    category: 'design',
    de: {
      term: 'Design System',
      shortDefinition: 'Ein Design System ist eine Sammlung wiederverwendbarer Komponenten und Guidelines für konsistentes Design.',
      fullDefinition: 'Ein Design System ist eine dokumentierte Sammlung von Design-Prinzipien, UI-Komponenten, Patterns und Guidelines, die für konsistentes Design über alle Produkte und Plattformen sorgen. Bestandteile: Design Tokens (Farben, Typografie, Spacing), Komponenten-Bibliothek (Buttons, Forms, Cards), Pattern Library (Layouts, Navigation), Brand Guidelines, Dokumentation und Beispiele. Bekannte Design Systems: Material Design (Google), Human Interface Guidelines (Apple), Polaris (Shopify), Carbon (IBM). Vorteile: Konsistenz, Effizienz, Skalierbarkeit, bessere Zusammenarbeit zwischen Design und Development. Ein Design System ist ein lebendes Dokument, das kontinuierlich gepflegt werden muss.',
      relatedTerms: ['UI Design', 'Komponenten', 'Style Guide', 'Brand Guidelines', 'Figma'],
      usageExample: 'Mit unserem Design System können Designer und Entwickler neue Features 3x schneller umsetzen.',
      keyPoints: [
        'Sammlung wiederverwendbarer Komponenten',
        'Design Tokens + Komponenten + Patterns',
        'Schafft Konsistenz über alle Produkte',
        'Beschleunigt Design und Development',
        'Bekannt: Material Design, Apple HIG',
        'Lebende Dokumentation, kontinuierliche Pflege'
      ]
    },
    en: {
      term: 'Design System',
      shortDefinition: 'A design system is a collection of reusable components and guidelines for consistent design.',
      fullDefinition: 'A design system is a documented collection of design principles, UI components, patterns, and guidelines that ensure consistent design across all products and platforms. Components: Design tokens (colors, typography, spacing), component library (buttons, forms, cards), pattern library (layouts, navigation), brand guidelines, documentation and examples. Famous design systems: Material Design (Google), Human Interface Guidelines (Apple), Polaris (Shopify), Carbon (IBM). Benefits: Consistency, efficiency, scalability, better collaboration between design and development. A design system is a living document that needs continuous maintenance.',
      relatedTerms: ['UI Design', 'Components', 'Style Guide', 'Brand Guidelines', 'Figma'],
      usageExample: 'With our design system, designers and developers can implement new features 3x faster.',
      keyPoints: [
        'Collection of reusable components',
        'Design tokens + components + patterns',
        'Creates consistency across products',
        'Accelerates design and development',
        'Known: Material Design, Apple HIG',
        'Living documentation, continuous maintenance'
      ]
    }
  },
  {
    slug: 'information-architecture',
    searchVolume: 1800,
    difficulty: 28,
    category: 'design',
    de: {
      term: 'Informationsarchitektur',
      shortDefinition: 'Informationsarchitektur strukturiert und organisiert Website-Inhalte für optimale Auffindbarkeit und Navigation.',
      fullDefinition: 'Informationsarchitektur (IA) ist die Strukturierung und Organisation von Inhalten, sodass Nutzer finden, was sie suchen. Sie ist das Fundament einer guten User Experience und beeinflusst direkt SEO durch URL-Struktur und interne Verlinkung. Kernelemente: Organisationssysteme (Hierarchie, Kategorien), Labeling-Systeme (Navigation-Labels, Überschriften), Navigations-Systeme (Hauptmenü, Breadcrumbs, Sitemap), Such-Systeme (interne Suche, Filter). Methoden zur IA-Entwicklung: Card Sorting, Tree Testing, User Interviews. Eine flache IA (max. 3 Klicks zur Info) ist besser als tiefe Hierarchien.',
      relatedTerms: ['UX Design', 'Navigation', 'Sitemap', 'Card Sorting', 'Usability'],
      usageExample: 'Das Card Sorting mit 20 Nutzern zeigte, dass unsere Kategorien nicht ihrer mentalen Modelle entsprachen.',
      keyPoints: [
        'Strukturierung für optimale Auffindbarkeit',
        'Fundament für UX und SEO',
        'Organisation + Labeling + Navigation + Suche',
        'Methoden: Card Sorting, Tree Testing',
        'Max. 3 Klicks zur Information',
        'Orientiert sich an mentalen Modellen der Nutzer'
      ]
    },
    en: {
      term: 'Information Architecture',
      shortDefinition: 'Information architecture structures and organizes website content for optimal findability and navigation.',
      fullDefinition: 'Information Architecture (IA) is the structuring and organization of content so users find what they\'re looking for. It\'s the foundation of good user experience and directly influences SEO through URL structure and internal linking. Core elements: Organization systems (hierarchy, categories), Labeling systems (navigation labels, headings), Navigation systems (main menu, breadcrumbs, sitemap), Search systems (internal search, filters). Methods for IA development: Card sorting, tree testing, user interviews. A flat IA (max. 3 clicks to info) is better than deep hierarchies.',
      relatedTerms: ['UX Design', 'Navigation', 'Sitemap', 'Card Sorting', 'Usability'],
      usageExample: 'Card sorting with 20 users showed our categories didn\'t match their mental models.',
      keyPoints: [
        'Structuring for optimal findability',
        'Foundation for UX and SEO',
        'Organization + Labeling + Navigation + Search',
        'Methods: Card sorting, tree testing',
        'Max. 3 clicks to information',
        'Aligned with users\' mental models'
      ]
    }
  },
  {
    slug: 'above-the-fold',
    searchVolume: 1600,
    difficulty: 18,
    category: 'design',
    de: {
      term: 'Above the Fold',
      shortDefinition: 'Above the Fold bezeichnet den sichtbaren Bereich einer Website ohne Scrollen.',
      fullDefinition: 'Above the Fold (deutsch: über dem Falz) bezeichnet den Bereich einer Website, der ohne Scrollen sofort sichtbar ist. Der Begriff stammt aus dem Zeitungswesen, wo Schlagzeilen "über dem Falz" platziert wurden. Im Webdesign ist dieser Bereich entscheidend für den ersten Eindruck und die Bounce Rate. Best Practices: Klare Value Proposition, primärer Call-to-Action, keine Autoplay-Videos oder Pop-ups, schnelle Ladezeit für diesen Bereich (kritisches CSS). Herausforderung: "The Fold" variiert stark je nach Bildschirmgröße und Gerät. Desktop: ~600px Höhe, Mobile: ~500px. Der Mythos "alles Above the Fold" ist veraltet - Nutzer scrollen, wenn der Content interessant ist.',
      relatedTerms: ['CTA', 'Bounce Rate', 'Landing Page', 'UX Design', 'First Impression'],
      usageExample: 'Unser A/B-Test zeigte, dass der CTA Above the Fold 30% mehr Klicks bekam als Below the Fold.',
      keyPoints: [
        'Sichtbarer Bereich ohne Scrollen',
        'Entscheidend für ersten Eindruck',
        'Value Proposition + CTA hier platzieren',
        'Variiert je nach Gerät (Desktop ~600px)',
        'Kritisches CSS für schnelle Darstellung',
        'Nutzer scrollen - wenn Content interessiert'
      ]
    },
    en: {
      term: 'Above the Fold',
      shortDefinition: 'Above the fold refers to the visible area of a website without scrolling.',
      fullDefinition: 'Above the fold refers to the area of a website that is immediately visible without scrolling. The term comes from newspapers where headlines were placed "above the fold". In web design, this area is crucial for first impressions and bounce rate. Best practices: Clear value proposition, primary call-to-action, no autoplay videos or pop-ups, fast loading time for this area (critical CSS). Challenge: "The fold" varies greatly depending on screen size and device. Desktop: ~600px height, Mobile: ~500px. The myth "everything above the fold" is outdated - users scroll if content is interesting.',
      relatedTerms: ['CTA', 'Bounce Rate', 'Landing Page', 'UX Design', 'First Impression'],
      usageExample: 'Our A/B test showed the CTA above the fold got 30% more clicks than below the fold.',
      keyPoints: [
        'Visible area without scrolling',
        'Crucial for first impression',
        'Place value proposition + CTA here',
        'Varies by device (desktop ~600px)',
        'Critical CSS for fast rendering',
        'Users scroll - if content interests them'
      ]
    }
  },
  {
    slug: 'whitespace',
    searchVolume: 1400,
    difficulty: 16,
    category: 'design',
    de: {
      term: 'Whitespace (Weißraum)',
      shortDefinition: 'Whitespace ist der leere Raum zwischen Design-Elementen, der Lesbarkeit und Fokus verbessert.',
      fullDefinition: 'Whitespace (auch Negative Space oder Weißraum) bezeichnet den leeren Raum zwischen und um Design-Elemente. Er muss nicht weiß sein - jeder ungefüllte Raum zählt. Typen: Micro Whitespace (zwischen Zeilen, Buchstaben), Macro Whitespace (zwischen Sektionen, um Bilder). Funktionen: Verbessert Lesbarkeit, schafft visuelle Hierarchie, lenkt Aufmerksamkeit, vermittelt Premium-Gefühl, reduziert kognitive Belastung. Apple und Google sind Meister des Whitespace. Anfänger-Fehler: Angst vor "leerem" Raum führt zu überladenen Designs. Mehr Whitespace = nicht weniger Inhalt, sondern bessere Kommunikation.',
      relatedTerms: ['UI Design', 'Layout', 'Typografie', 'Visual Hierarchy', 'Minimalism'],
      usageExample: 'Durch mehr Whitespace um den CTA stieg die Klickrate um 20% - er fiel endlich auf.',
      keyPoints: [
        'Leerer Raum zwischen Elementen',
        'Muss nicht weiß sein',
        'Micro (Zeilen) vs. Macro (Sektionen)',
        'Verbessert Lesbarkeit und Fokus',
        'Premium-Feeling durch großzügigen Raum',
        'Weniger ist mehr - Apple als Vorbild'
      ]
    },
    en: {
      term: 'Whitespace',
      shortDefinition: 'Whitespace is the empty space between design elements that improves readability and focus.',
      fullDefinition: 'Whitespace (also negative space) refers to the empty space between and around design elements. It doesn\'t have to be white - any unfilled space counts. Types: Micro whitespace (between lines, letters), Macro whitespace (between sections, around images). Functions: Improves readability, creates visual hierarchy, directs attention, conveys premium feel, reduces cognitive load. Apple and Google are masters of whitespace. Beginner mistake: Fear of "empty" space leads to cluttered designs. More whitespace = not less content, but better communication.',
      relatedTerms: ['UI Design', 'Layout', 'Typography', 'Visual Hierarchy', 'Minimalism'],
      usageExample: 'By adding more whitespace around the CTA, click rate increased by 20% - it finally stood out.',
      keyPoints: [
        'Empty space between elements',
        'Doesn\'t have to be white',
        'Micro (lines) vs. Macro (sections)',
        'Improves readability and focus',
        'Premium feeling through generous space',
        'Less is more - Apple as role model'
      ]
    }
  },
  {
    slug: 'typography',
    searchVolume: 2800,
    difficulty: 20,
    category: 'design',
    de: {
      term: 'Typografie',
      shortDefinition: 'Typografie ist die Kunst der Schriftgestaltung für optimale Lesbarkeit und visuelle Wirkung.',
      fullDefinition: 'Typografie umfasst alle Aspekte der Schriftgestaltung: Schriftauswahl, Größen, Abstände und Hierarchien. Sie ist ein Kernbestandteil der visuellen Kommunikation und beeinflusst Lesbarkeit, Stimmung und Markenwahrnehmung. Web-Typografie-Grundlagen: Font-Pairing (max. 2-3 Schriften), Schriftgrößen-Skala (modular scale), Zeilenhöhe (1.4-1.6 für Fließtext), Zeilenlänge (45-75 Zeichen ideal), Kontrast zum Hintergrund. Schriftkategorien: Serif (klassisch, vertrauenswürdig), Sans-Serif (modern, clean), Display (dekorativ, sparsam einsetzen). Google Fonts und Adobe Fonts sind beliebte Web-Font-Quellen. Performance: Variable Fonts reduzieren Ladezeit.',
      relatedTerms: ['Design System', 'Branding', 'UI Design', 'Google Fonts', 'Lesbarkeit'],
      usageExample: 'Die Kombination aus Playfair Display für Überschriften und Inter für Fließtext verleiht unserer Marke Eleganz.',
      keyPoints: [
        'Schriftauswahl, Größen, Abstände',
        'Max. 2-3 Schriften kombinieren',
        'Zeilenhöhe 1.4-1.6 für Lesbarkeit',
        'Zeilenlänge 45-75 Zeichen optimal',
        'Serif = klassisch, Sans-Serif = modern',
        'Variable Fonts für Performance'
      ]
    },
    en: {
      term: 'Typography',
      shortDefinition: 'Typography is the art of type design for optimal readability and visual impact.',
      fullDefinition: 'Typography encompasses all aspects of type design: font selection, sizes, spacing, and hierarchies. It\'s a core component of visual communication and influences readability, mood, and brand perception. Web typography basics: Font pairing (max 2-3 fonts), font size scale (modular scale), line height (1.4-1.6 for body text), line length (45-75 characters ideal), contrast to background. Font categories: Serif (classic, trustworthy), Sans-serif (modern, clean), Display (decorative, use sparingly). Google Fonts and Adobe Fonts are popular web font sources. Performance: Variable fonts reduce loading time.',
      relatedTerms: ['Design System', 'Branding', 'UI Design', 'Google Fonts', 'Readability'],
      usageExample: 'The combination of Playfair Display for headlines and Inter for body text gives our brand elegance.',
      keyPoints: [
        'Font selection, sizes, spacing',
        'Max 2-3 fonts combined',
        'Line height 1.4-1.6 for readability',
        'Line length 45-75 characters optimal',
        'Serif = classic, Sans-serif = modern',
        'Variable fonts for performance'
      ]
    }
  },
  {
    slug: 'color-theory',
    searchVolume: 2200,
    difficulty: 22,
    category: 'design',
    de: {
      term: 'Farbtheorie',
      shortDefinition: 'Die Farbtheorie erklärt, wie Farben wirken, kombiniert werden und Emotionen auslösen.',
      fullDefinition: 'Die Farbtheorie ist ein Regelwerk für die effektive Verwendung von Farben im Design. Grundlagen: Farbkreis (Primär-, Sekundär-, Tertiärfarben), Farbharmonien (komplementär, analog, triadisch, split-komplementär), Farbtemperatur (warm/kalt), Farbpsychologie (Blau = Vertrauen, Rot = Energie, Grün = Natur). Für Webdesign: 60-30-10-Regel (60% Hauptfarbe, 30% Sekundärfarbe, 10% Akzentfarbe), Kontrastverhältnis für Accessibility (mind. 4.5:1 für Text), Farben für CTA-Buttons sollten sich abheben. Tools: Coolors, Adobe Color, Contrast Checker. Kulturelle Unterschiede beachten: Weiß bedeutet in Asien Trauer, nicht Reinheit.',
      relatedTerms: ['Branding', 'UI Design', 'Accessibility', 'Design System', 'Psychologie'],
      usageExample: 'Die 60-30-10-Regel: 60% Weiß, 30% Marineblau, 10% Neon-Gelb für unsere CTA-Buttons.',
      keyPoints: [
        'Farbkreis und Farbharmonien verstehen',
        '60-30-10-Regel für Balance',
        'Farbpsychologie: Blau=Vertrauen, Rot=Energie',
        'Accessibility: mind. 4.5:1 Kontrast',
        'Kulturelle Unterschiede beachten',
        'Tools: Coolors, Adobe Color'
      ]
    },
    en: {
      term: 'Color Theory',
      shortDefinition: 'Color theory explains how colors work, combine, and evoke emotions.',
      fullDefinition: 'Color theory is a set of rules for effective use of colors in design. Basics: Color wheel (primary, secondary, tertiary colors), Color harmonies (complementary, analogous, triadic, split-complementary), Color temperature (warm/cold), Color psychology (Blue = trust, Red = energy, Green = nature). For web design: 60-30-10 rule (60% main color, 30% secondary, 10% accent), Contrast ratio for accessibility (min 4.5:1 for text), CTA button colors should stand out. Tools: Coolors, Adobe Color, Contrast Checker. Consider cultural differences: White means mourning in Asia, not purity.',
      relatedTerms: ['Branding', 'UI Design', 'Accessibility', 'Design System', 'Psychology'],
      usageExample: 'The 60-30-10 rule: 60% white, 30% navy blue, 10% neon yellow for our CTA buttons.',
      keyPoints: [
        'Understand color wheel and harmonies',
        '60-30-10 rule for balance',
        'Color psychology: Blue=trust, Red=energy',
        'Accessibility: min 4.5:1 contrast',
        'Consider cultural differences',
        'Tools: Coolors, Adobe Color'
      ]
    }
  },
  {
    slug: 'mobile-first',
    searchVolume: 2600,
    difficulty: 24,
    category: 'design',
    de: {
      term: 'Mobile-First',
      shortDefinition: 'Mobile-First ist ein Design-Ansatz, bei dem zuerst für mobile Geräte entwickelt wird.',
      fullDefinition: 'Mobile-First ist eine Design- und Entwicklungs-Strategie, bei der die mobile Version einer Website oder App zuerst erstellt wird, bevor auf größere Bildschirme erweitert wird. Google indexiert seit 2018 primär die mobile Version (Mobile-First Indexing). Vorteile: Fokus auf das Wesentliche (begrenzter Platz zwingt zur Priorisierung), bessere Performance (optimiert für schwächere Geräte), zukunftssicher (Mobile-Traffic dominiert). Technisch: CSS beginnt mit Styles für kleine Screens, Media Queries erweitern für größere. Progressive Enhancement statt Graceful Degradation. Über 60% des Web-Traffics ist mittlerweile mobil.',
      relatedTerms: ['Responsive Design', 'Google Indexierung', 'Progressive Enhancement', 'UX Design'],
      usageExample: 'Seit wir Mobile-First entwickeln, haben wir keine Probleme mehr mit der mobilen Usability in der Search Console.',
      keyPoints: [
        'Mobile Version wird zuerst designt',
        'Google: Mobile-First Indexing seit 2018',
        'Fokus aufs Wesentliche durch begrenzten Platz',
        'Bessere Performance als Desktop-First',
        '60%+ des Traffics ist mobil',
        'Progressive Enhancement statt Degradation'
      ]
    },
    en: {
      term: 'Mobile-First',
      shortDefinition: 'Mobile-first is a design approach where development starts with mobile devices.',
      fullDefinition: 'Mobile-first is a design and development strategy where the mobile version of a website or app is created first, before expanding to larger screens. Google has been primarily indexing the mobile version since 2018 (Mobile-First Indexing). Benefits: Focus on essentials (limited space forces prioritization), better performance (optimized for weaker devices), future-proof (mobile traffic dominates). Technically: CSS starts with styles for small screens, media queries expand for larger ones. Progressive enhancement instead of graceful degradation. Over 60% of web traffic is now mobile.',
      relatedTerms: ['Responsive Design', 'Google Indexing', 'Progressive Enhancement', 'UX Design'],
      usageExample: 'Since we develop mobile-first, we no longer have mobile usability issues in Search Console.',
      keyPoints: [
        'Mobile version designed first',
        'Google: Mobile-First Indexing since 2018',
        'Focus on essentials due to limited space',
        'Better performance than desktop-first',
        '60%+ of traffic is mobile',
        'Progressive enhancement instead of degradation'
      ]
    }
  },

  // ===========================================
  // BATCH 9: Development & Technology Terms (10 terms)
  // ===========================================

  {
    slug: 'html',
    searchVolume: 5400,
    difficulty: 18,
    category: 'development',
    de: {
      term: 'HTML (HyperText Markup Language)',
      shortDefinition: 'HTML ist die Auszeichnungssprache für die Struktur und den Inhalt von Webseiten.',
      fullDefinition: 'HTML (HyperText Markup Language) ist die Standard-Auszeichnungssprache für Webseiten. Sie definiert die Struktur und den Inhalt einer Seite durch Tags wie <h1>, <p>, <a>, <img>. HTML ist keine Programmiersprache, sondern eine Markup-Sprache. Die aktuelle Version ist HTML5, die semantische Elemente wie <header>, <nav>, <article>, <footer> einführte. Semantisches HTML ist wichtig für SEO und Accessibility - Suchmaschinen und Screenreader verstehen die Bedeutung der Elemente. Jede Webseite braucht HTML als Grundgerüst, CSS für das Styling und optional JavaScript für Interaktivität.',
      relatedTerms: ['CSS', 'JavaScript', 'Semantisches HTML', 'DOM', 'Webentwicklung'],
      usageExample: 'Wir verwenden semantisches HTML5 mit <article> und <section> für bessere SEO und Accessibility.',
      keyPoints: [
        'Auszeichnungssprache für Webseiten-Struktur',
        'Aktuelle Version: HTML5 mit semantischen Tags',
        'Keine Programmiersprache',
        'Semantisches HTML für SEO wichtig',
        'Arbeitet mit CSS und JavaScript zusammen',
        'Grundlage jeder Website'
      ]
    },
    en: {
      term: 'HTML (HyperText Markup Language)',
      shortDefinition: 'HTML is the markup language for the structure and content of web pages.',
      fullDefinition: 'HTML (HyperText Markup Language) is the standard markup language for web pages. It defines the structure and content of a page through tags like <h1>, <p>, <a>, <img>. HTML is not a programming language but a markup language. The current version is HTML5, which introduced semantic elements like <header>, <nav>, <article>, <footer>. Semantic HTML is important for SEO and accessibility - search engines and screen readers understand the meaning of elements. Every web page needs HTML as the foundation, CSS for styling, and optionally JavaScript for interactivity.',
      relatedTerms: ['CSS', 'JavaScript', 'Semantic HTML', 'DOM', 'Web Development'],
      usageExample: 'We use semantic HTML5 with <article> and <section> for better SEO and accessibility.',
      keyPoints: [
        'Markup language for page structure',
        'Current version: HTML5 with semantic tags',
        'Not a programming language',
        'Semantic HTML important for SEO',
        'Works with CSS and JavaScript',
        'Foundation of every website'
      ]
    }
  },
  {
    slug: 'css',
    searchVolume: 4800,
    difficulty: 20,
    category: 'development',
    de: {
      term: 'CSS (Cascading Style Sheets)',
      shortDefinition: 'CSS ist die Stylesheet-Sprache zur visuellen Gestaltung von HTML-Elementen.',
      fullDefinition: 'CSS (Cascading Style Sheets) ist die Sprache zur visuellen Gestaltung von Webseiten. Sie definiert Farben, Schriften, Layouts, Abstände und Animationen. Das "Cascading" bedeutet, dass Styles von mehreren Quellen kommen können und nach Spezifität gewichtet werden. Moderne CSS-Features: Flexbox und Grid für Layouts, CSS Variables (Custom Properties), Media Queries für Responsive Design, CSS Animations und Transitions. CSS-Frameworks wie Tailwind CSS, Bootstrap beschleunigen die Entwicklung. CSS-Preprocessors wie Sass/SCSS erweitern CSS um Variablen, Nesting und Mixins. Kritisches CSS (above-the-fold) sollte inline sein für schnelle Darstellung.',
      relatedTerms: ['HTML', 'Tailwind CSS', 'Responsive Design', 'Flexbox', 'Grid'],
      usageExample: 'Mit Tailwind CSS und CSS Grid erstellen wir responsive Layouts ohne eigenes CSS schreiben zu müssen.',
      keyPoints: [
        'Stylesheet-Sprache für visuelles Design',
        'Cascading = Vererbung und Spezifität',
        'Flexbox und Grid für moderne Layouts',
        'Media Queries für Responsive Design',
        'Frameworks: Tailwind, Bootstrap',
        'Kritisches CSS inline für Performance'
      ]
    },
    en: {
      term: 'CSS (Cascading Style Sheets)',
      shortDefinition: 'CSS is the stylesheet language for visual styling of HTML elements.',
      fullDefinition: 'CSS (Cascading Style Sheets) is the language for visual styling of web pages. It defines colors, fonts, layouts, spacing, and animations. "Cascading" means styles can come from multiple sources and are weighted by specificity. Modern CSS features: Flexbox and Grid for layouts, CSS Variables (Custom Properties), Media Queries for responsive design, CSS Animations and Transitions. CSS frameworks like Tailwind CSS, Bootstrap accelerate development. CSS preprocessors like Sass/SCSS extend CSS with variables, nesting, and mixins. Critical CSS (above-the-fold) should be inline for fast rendering.',
      relatedTerms: ['HTML', 'Tailwind CSS', 'Responsive Design', 'Flexbox', 'Grid'],
      usageExample: 'With Tailwind CSS and CSS Grid, we create responsive layouts without writing custom CSS.',
      keyPoints: [
        'Stylesheet language for visual design',
        'Cascading = inheritance and specificity',
        'Flexbox and Grid for modern layouts',
        'Media Queries for responsive design',
        'Frameworks: Tailwind, Bootstrap',
        'Critical CSS inline for performance'
      ]
    }
  },
  {
    slug: 'javascript',
    searchVolume: 8100,
    difficulty: 26,
    category: 'development',
    de: {
      term: 'JavaScript',
      shortDefinition: 'JavaScript ist die Programmiersprache für interaktive und dynamische Web-Funktionalität.',
      fullDefinition: 'JavaScript (JS) ist die Programmiersprache des Webs, die Webseiten interaktiv macht. Sie läuft im Browser (Client-side) und seit Node.js auch auf Servern. JavaScript ermöglicht: DOM-Manipulation, Event-Handling, asynchrone Requests (AJAX/Fetch), Animationen, Single-Page-Applications (SPAs). Moderne JS-Frameworks: React, Vue.js, Angular, Svelte. TypeScript erweitert JS um statische Typisierung. Für SEO: JavaScript-Rendering kann problematisch sein - Server-Side Rendering (SSR) oder Static Site Generation (SSG) lösen dies. Frameworks wie Next.js (React) und Nuxt (Vue) machen SSR einfach. JavaScript ist auch für Web-Analytics (GA4, Tag Manager) unverzichtbar.',
      relatedTerms: ['React', 'Next.js', 'Node.js', 'TypeScript', 'DOM'],
      usageExample: 'Unsere Next.js-App nutzt Server-Side Rendering für SEO-Friendliness bei voller JavaScript-Interaktivität.',
      keyPoints: [
        'Programmiersprache für Web-Interaktivität',
        'Client-side (Browser) und Server-side (Node.js)',
        'Frameworks: React, Vue, Angular',
        'TypeScript für Typsicherheit',
        'SSR/SSG für SEO wichtig',
        'Basis für moderne Web-Apps'
      ]
    },
    en: {
      term: 'JavaScript',
      shortDefinition: 'JavaScript is the programming language for interactive and dynamic web functionality.',
      fullDefinition: 'JavaScript (JS) is the programming language of the web that makes web pages interactive. It runs in the browser (client-side) and since Node.js also on servers. JavaScript enables: DOM manipulation, event handling, asynchronous requests (AJAX/Fetch), animations, single-page applications (SPAs). Modern JS frameworks: React, Vue.js, Angular, Svelte. TypeScript extends JS with static typing. For SEO: JavaScript rendering can be problematic - Server-Side Rendering (SSR) or Static Site Generation (SSG) solves this. Frameworks like Next.js (React) and Nuxt (Vue) make SSR easy. JavaScript is also essential for web analytics (GA4, Tag Manager).',
      relatedTerms: ['React', 'Next.js', 'Node.js', 'TypeScript', 'DOM'],
      usageExample: 'Our Next.js app uses server-side rendering for SEO-friendliness with full JavaScript interactivity.',
      keyPoints: [
        'Programming language for web interactivity',
        'Client-side (browser) and server-side (Node.js)',
        'Frameworks: React, Vue, Angular',
        'TypeScript for type safety',
        'SSR/SSG important for SEO',
        'Foundation for modern web apps'
      ]
    }
  },
  {
    slug: 'cdn',
    searchVolume: 2400,
    difficulty: 24,
    category: 'development',
    de: {
      term: 'CDN (Content Delivery Network)',
      shortDefinition: 'Ein CDN verteilt Website-Inhalte über globale Server für schnellere Ladezeiten weltweit.',
      fullDefinition: 'Ein Content Delivery Network (CDN) ist ein Netzwerk geografisch verteilter Server, die Website-Inhalte (Bilder, CSS, JS, Videos) zwischenspeichern und vom nächstgelegenen Standort ausliefern. Vorteile: Schnellere Ladezeiten weltweit (weniger Latenz), reduzierte Server-Last, DDoS-Schutz, verbesserte Verfügbarkeit, bessere Core Web Vitals. Beliebte CDN-Anbieter: Cloudflare (auch kostenlos), Vercel Edge Network, AWS CloudFront, Akamai, Fastly. Implementierung: DNS-Umleitung oder Origin Pull. Für statische Websites können CDNs auch Edge Computing ermöglichen. Ein CDN ist besonders wichtig für internationale Websites und große Mediendateien.',
      relatedTerms: ['Ladezeit', 'Core Web Vitals', 'Cloudflare', 'Performance', 'Caching'],
      usageExample: 'Nach CDN-Implementierung sank unsere Ladezeit für US-Besucher von 3s auf 0,8s.',
      keyPoints: [
        'Globales Server-Netzwerk für Inhalte',
        'Reduziert Latenz durch Nähe zum Nutzer',
        'Entlastet Origin-Server',
        'DDoS-Schutz inklusive',
        'Anbieter: Cloudflare, Vercel, AWS',
        'Besonders wichtig für internationale Sites'
      ]
    },
    en: {
      term: 'CDN (Content Delivery Network)',
      shortDefinition: 'A CDN distributes website content across global servers for faster loading times worldwide.',
      fullDefinition: 'A Content Delivery Network (CDN) is a network of geographically distributed servers that cache website content (images, CSS, JS, videos) and deliver from the nearest location. Benefits: Faster loading times globally (less latency), reduced server load, DDoS protection, improved availability, better Core Web Vitals. Popular CDN providers: Cloudflare (also free), Vercel Edge Network, AWS CloudFront, Akamai, Fastly. Implementation: DNS redirect or origin pull. For static websites, CDNs can also enable edge computing. A CDN is especially important for international websites and large media files.',
      relatedTerms: ['Loading Time', 'Core Web Vitals', 'Cloudflare', 'Performance', 'Caching'],
      usageExample: 'After CDN implementation, our loading time for US visitors dropped from 3s to 0.8s.',
      keyPoints: [
        'Global server network for content',
        'Reduces latency through proximity',
        'Offloads origin server',
        'DDoS protection included',
        'Providers: Cloudflare, Vercel, AWS',
        'Especially important for international sites'
      ]
    }
  },
  {
    slug: 'git',
    searchVolume: 5400,
    difficulty: 24,
    category: 'development',
    de: {
      term: 'Git',
      shortDefinition: 'Git ist ein Versionskontrollsystem zur Nachverfolgung von Code-Änderungen und Team-Zusammenarbeit.',
      fullDefinition: 'Git ist das weltweit meistgenutzte verteilte Versionskontrollsystem (VCS). Es ermöglicht: Nachverfolgung aller Code-Änderungen, Zusammenarbeit im Team ohne Konflikte, Branching für parallele Entwicklung, Rollback zu früheren Versionen. Grundbegriffe: Repository (Projekt), Commit (gespeicherte Änderung), Branch (Entwicklungszweig), Merge (Zusammenführen), Pull Request (Code-Review). GitHub, GitLab und Bitbucket sind beliebte Hosting-Plattformen. Git-Workflow: Feature Branch → Commit → Push → Pull Request → Code Review → Merge. Git ist unverzichtbar für professionelle Softwareentwicklung und ermöglicht CI/CD-Pipelines.',
      relatedTerms: ['GitHub', 'Versionskontrolle', 'Repository', 'CI/CD', 'DevOps'],
      usageExample: 'Mit Git Feature Branches kann jeder Entwickler unabhängig arbeiten und wir mergen erst nach Code Review.',
      keyPoints: [
        'Verteiltes Versionskontrollsystem',
        'Nachverfolgung aller Code-Änderungen',
        'Branching für parallele Entwicklung',
        'Hosting: GitHub, GitLab, Bitbucket',
        'Basis für CI/CD-Pipelines',
        'Standard in der Softwareentwicklung'
      ]
    },
    en: {
      term: 'Git',
      shortDefinition: 'Git is a version control system for tracking code changes and team collaboration.',
      fullDefinition: 'Git is the world\'s most used distributed version control system (VCS). It enables: Tracking all code changes, team collaboration without conflicts, branching for parallel development, rollback to previous versions. Basic concepts: Repository (project), Commit (saved change), Branch (development branch), Merge (combining), Pull Request (code review). GitHub, GitLab, and Bitbucket are popular hosting platforms. Git workflow: Feature Branch → Commit → Push → Pull Request → Code Review → Merge. Git is essential for professional software development and enables CI/CD pipelines.',
      relatedTerms: ['GitHub', 'Version Control', 'Repository', 'CI/CD', 'DevOps'],
      usageExample: 'With Git feature branches, each developer can work independently and we only merge after code review.',
      keyPoints: [
        'Distributed version control system',
        'Tracking all code changes',
        'Branching for parallel development',
        'Hosting: GitHub, GitLab, Bitbucket',
        'Foundation for CI/CD pipelines',
        'Standard in software development'
      ]
    }
  },
  {
    slug: 'server-side-rendering',
    searchVolume: 1900,
    difficulty: 32,
    category: 'development',
    de: {
      term: 'Server-Side Rendering (SSR)',
      shortDefinition: 'SSR generiert HTML auf dem Server für bessere SEO und schnellere initiale Ladezeiten.',
      fullDefinition: 'Server-Side Rendering (SSR) bedeutet, dass HTML-Seiten auf dem Server generiert werden, bevor sie an den Browser gesendet werden. Im Gegensatz zu Client-Side Rendering (CSR), wo JavaScript erst im Browser läuft und Inhalte rendert. Vorteile für SEO: Suchmaschinen sehen sofort den vollständigen Content, ohne auf JavaScript-Ausführung warten zu müssen. Performance-Vorteile: Schnellerer First Contentful Paint (FCP), besserer Largest Contentful Paint (LCP). Frameworks: Next.js (React), Nuxt (Vue), SvelteKit, Astro. Trade-offs: Höhere Server-Last, komplexere Architektur. SSG (Static Site Generation) ist eine Alternative für Seiten, die sich selten ändern.',
      relatedTerms: ['Next.js', 'SEO', 'Core Web Vitals', 'JavaScript', 'Hydration'],
      usageExample: 'Mit Next.js SSR indexiert Google unsere React-App problemlos - ohne SSR war sie unsichtbar.',
      keyPoints: [
        'HTML wird auf Server generiert',
        'Sofort vollständiger Content für SEO',
        'Bessere Core Web Vitals (FCP, LCP)',
        'Frameworks: Next.js, Nuxt, SvelteKit',
        'Trade-off: Höhere Server-Last',
        'Alternative: Static Site Generation (SSG)'
      ]
    },
    en: {
      term: 'Server-Side Rendering (SSR)',
      shortDefinition: 'SSR generates HTML on the server for better SEO and faster initial loading times.',
      fullDefinition: 'Server-Side Rendering (SSR) means HTML pages are generated on the server before being sent to the browser. In contrast to Client-Side Rendering (CSR), where JavaScript runs in the browser first and renders content. SEO benefits: Search engines immediately see complete content without waiting for JavaScript execution. Performance benefits: Faster First Contentful Paint (FCP), better Largest Contentful Paint (LCP). Frameworks: Next.js (React), Nuxt (Vue), SvelteKit, Astro. Trade-offs: Higher server load, more complex architecture. SSG (Static Site Generation) is an alternative for pages that rarely change.',
      relatedTerms: ['Next.js', 'SEO', 'Core Web Vitals', 'JavaScript', 'Hydration'],
      usageExample: 'With Next.js SSR, Google indexes our React app without issues - without SSR it was invisible.',
      keyPoints: [
        'HTML generated on server',
        'Immediate full content for SEO',
        'Better Core Web Vitals (FCP, LCP)',
        'Frameworks: Next.js, Nuxt, SvelteKit',
        'Trade-off: Higher server load',
        'Alternative: Static Site Generation (SSG)'
      ]
    }
  },
  {
    slug: 'database',
    searchVolume: 3600,
    difficulty: 26,
    category: 'development',
    de: {
      term: 'Datenbank',
      shortDefinition: 'Eine Datenbank speichert und verwaltet strukturierte Daten für Anwendungen.',
      fullDefinition: 'Eine Datenbank ist ein organisiertes System zur Speicherung, Verwaltung und Abfrage von Daten. Haupttypen: Relationale Datenbanken (SQL) wie PostgreSQL, MySQL, SQLite - Daten in Tabellen mit Beziehungen; NoSQL-Datenbanken wie MongoDB (Dokumente), Redis (Key-Value), Neo4j (Graphen) - flexible Strukturen. CRUD-Operationen: Create, Read, Update, Delete. Für Websites speichern Datenbanken: Benutzerkonten, Content (CMS), Produkte (E-Commerce), Bestellungen, Analytics. ORM-Tools (Prisma, Drizzle) vereinfachen Datenbankzugriff in Code. Cloud-Datenbanken: Supabase, PlanetScale, Firebase. Backups und Indexierung sind kritisch für Performance und Sicherheit.',
      relatedTerms: ['SQL', 'PostgreSQL', 'MongoDB', 'Backend', 'API'],
      usageExample: 'Unser CMS nutzt SQLite für einfache Deployment und PostgreSQL in Production für Skalierbarkeit.',
      keyPoints: [
        'Organisierte Datenspeicherung',
        'SQL (relational) vs. NoSQL (flexibel)',
        'CRUD: Create, Read, Update, Delete',
        'ORM-Tools: Prisma, Drizzle',
        'Cloud: Supabase, PlanetScale',
        'Backups und Indexierung kritisch'
      ]
    },
    en: {
      term: 'Database',
      shortDefinition: 'A database stores and manages structured data for applications.',
      fullDefinition: 'A database is an organized system for storing, managing, and querying data. Main types: Relational databases (SQL) like PostgreSQL, MySQL, SQLite - data in tables with relationships; NoSQL databases like MongoDB (documents), Redis (key-value), Neo4j (graphs) - flexible structures. CRUD operations: Create, Read, Update, Delete. For websites, databases store: user accounts, content (CMS), products (e-commerce), orders, analytics. ORM tools (Prisma, Drizzle) simplify database access in code. Cloud databases: Supabase, PlanetScale, Firebase. Backups and indexing are critical for performance and security.',
      relatedTerms: ['SQL', 'PostgreSQL', 'MongoDB', 'Backend', 'API'],
      usageExample: 'Our CMS uses SQLite for easy deployment and PostgreSQL in production for scalability.',
      keyPoints: [
        'Organized data storage',
        'SQL (relational) vs. NoSQL (flexible)',
        'CRUD: Create, Read, Update, Delete',
        'ORM tools: Prisma, Drizzle',
        'Cloud: Supabase, PlanetScale',
        'Backups and indexing critical'
      ]
    }
  },
  {
    slug: 'hosting',
    searchVolume: 3400,
    difficulty: 22,
    category: 'development',
    de: {
      term: 'Webhosting',
      shortDefinition: 'Webhosting stellt Server-Infrastruktur bereit, um Websites im Internet zugänglich zu machen.',
      fullDefinition: 'Webhosting ist ein Service, der Server-Ressourcen für die Speicherung und Bereitstellung von Websites bietet. Hosting-Typen: Shared Hosting (günstig, mehrere Sites pro Server), VPS (Virtual Private Server - dedizierte Ressourcen), Dedicated Server (eigener physischer Server), Cloud Hosting (skalierbar, z.B. AWS, Google Cloud), JAMstack/Edge (Vercel, Netlify). Für Performance wichtig: Server-Standort (nah am Zielpublikum), SSD-Speicher, ausreichend RAM, CDN-Integration. Managed vs. Unmanaged: Managed nimmt Wartung ab. SSL-Zertifikat (HTTPS) ist Standard und Ranking-Faktor. Uptime (99.9%+), Support-Qualität und Backup-Optionen prüfen.',
      relatedTerms: ['Server', 'Domain', 'SSL', 'CDN', 'Performance'],
      usageExample: 'Wir nutzen Vercel für Next.js-Projekte - automatische Deployments, CDN und Edge Functions inklusive.',
      keyPoints: [
        'Server-Infrastruktur für Websites',
        'Typen: Shared, VPS, Dedicated, Cloud, Edge',
        'Server-Standort beeinflusst Ladezeit',
        'SSL/HTTPS ist Standard',
        'Uptime 99.9%+ anstreben',
        'Moderne Option: JAMstack (Vercel, Netlify)'
      ]
    },
    en: {
      term: 'Web Hosting',
      shortDefinition: 'Web hosting provides server infrastructure to make websites accessible on the internet.',
      fullDefinition: 'Web hosting is a service that provides server resources for storing and serving websites. Hosting types: Shared hosting (cheap, multiple sites per server), VPS (Virtual Private Server - dedicated resources), Dedicated server (own physical server), Cloud hosting (scalable, e.g., AWS, Google Cloud), JAMstack/Edge (Vercel, Netlify). For performance: Server location (close to target audience), SSD storage, sufficient RAM, CDN integration. Managed vs. Unmanaged: Managed handles maintenance. SSL certificate (HTTPS) is standard and ranking factor. Check uptime (99.9%+), support quality, and backup options.',
      relatedTerms: ['Server', 'Domain', 'SSL', 'CDN', 'Performance'],
      usageExample: 'We use Vercel for Next.js projects - automatic deployments, CDN, and edge functions included.',
      keyPoints: [
        'Server infrastructure for websites',
        'Types: Shared, VPS, Dedicated, Cloud, Edge',
        'Server location affects loading time',
        'SSL/HTTPS is standard',
        'Aim for 99.9%+ uptime',
        'Modern option: JAMstack (Vercel, Netlify)'
      ]
    }
  },
  {
    slug: 'framework',
    searchVolume: 2600,
    difficulty: 24,
    category: 'development',
    de: {
      term: 'Framework',
      shortDefinition: 'Ein Framework ist ein Software-Grundgerüst mit vorgefertigten Komponenten für effizientere Entwicklung.',
      fullDefinition: 'Ein Framework ist eine Sammlung von vorgefertigtem Code, Bibliotheken und Best Practices, die als Grundlage für die Softwareentwicklung dienen. Es gibt Struktur und Konventionen vor, sodass Entwickler sich auf die eigentliche Geschäftslogik konzentrieren können. Frontend-Frameworks: React, Vue.js, Angular, Svelte. Full-Stack-Frameworks: Next.js (React), Nuxt (Vue), SvelteKit, Remix. CSS-Frameworks: Tailwind CSS, Bootstrap. CMS-Frameworks: Payload CMS, Strapi. Unterschied zur Library: Ein Framework ruft deinen Code auf (Inversion of Control), eine Library rufst du auf. Die Framework-Wahl beeinflusst Entwicklungsgeschwindigkeit, Performance und Wartbarkeit.',
      relatedTerms: ['React', 'Next.js', 'Vue.js', 'Library', 'Full-Stack'],
      usageExample: 'Mit Next.js als Framework haben wir Routing, SSR und Image-Optimierung out-of-the-box.',
      keyPoints: [
        'Vorgefertigtes Code-Grundgerüst',
        'Gibt Struktur und Konventionen vor',
        'Frontend: React, Vue, Angular',
        'Full-Stack: Next.js, Nuxt',
        'CSS: Tailwind, Bootstrap',
        'Framework vs. Library: Inversion of Control'
      ]
    },
    en: {
      term: 'Framework',
      shortDefinition: 'A framework is a software foundation with pre-built components for more efficient development.',
      fullDefinition: 'A framework is a collection of pre-written code, libraries, and best practices that serve as a foundation for software development. It provides structure and conventions so developers can focus on actual business logic. Frontend frameworks: React, Vue.js, Angular, Svelte. Full-stack frameworks: Next.js (React), Nuxt (Vue), SvelteKit, Remix. CSS frameworks: Tailwind CSS, Bootstrap. CMS frameworks: Payload CMS, Strapi. Difference from library: A framework calls your code (Inversion of Control), you call a library. Framework choice affects development speed, performance, and maintainability.',
      relatedTerms: ['React', 'Next.js', 'Vue.js', 'Library', 'Full-Stack'],
      usageExample: 'With Next.js as a framework, we have routing, SSR, and image optimization out-of-the-box.',
      keyPoints: [
        'Pre-built code foundation',
        'Provides structure and conventions',
        'Frontend: React, Vue, Angular',
        'Full-stack: Next.js, Nuxt',
        'CSS: Tailwind, Bootstrap',
        'Framework vs. Library: Inversion of Control'
      ]
    }
  },
  {
    slug: 'seo-friendly-urls',
    searchVolume: 1800,
    difficulty: 18,
    category: 'development',
    de: {
      term: 'SEO-freundliche URLs',
      shortDefinition: 'SEO-freundliche URLs sind kurz, beschreibend und enthalten relevante Keywords.',
      fullDefinition: 'SEO-freundliche URLs (auch sprechende URLs genannt) sind Web-Adressen, die für Menschen und Suchmaschinen verständlich sind. Best Practices: Kurz halten (unter 60 Zeichen), Hauptkeyword einbauen, Kleinbuchstaben verwenden, Wörter mit Bindestrichen trennen, keine Umlaute oder Sonderzeichen, keine dynamischen Parameter wenn möglich, logische Hierarchie abbilden. Schlecht: /page.php?id=12345&cat=7. Gut: /seo-agentur-wien/. Die URL ist ein leichter Ranking-Faktor und beeinflusst die CTR in SERPs (Nutzer sehen die URL). Bei CMS wie WordPress oder Payload sollten Slug-Einstellungen optimiert werden.',
      relatedTerms: ['URL-Struktur', 'SEO', 'Slugs', 'Hierarchie', 'Keywords'],
      usageExample: 'Statt /services/item?id=15 nutzen wir /leistungen/seo-beratung/ - besser für SEO und Nutzer.',
      keyPoints: [
        'Kurz, beschreibend, keyword-reich',
        'Bindestriche zwischen Wörtern',
        'Keine Sonderzeichen oder Umlaute',
        'Logische Hierarchie abbilden',
        'Beeinflusst CTR in SERPs',
        'CMS-Slugs optimieren'
      ]
    },
    en: {
      term: 'SEO-Friendly URLs',
      shortDefinition: 'SEO-friendly URLs are short, descriptive, and contain relevant keywords.',
      fullDefinition: 'SEO-friendly URLs (also called speaking URLs) are web addresses that are understandable for humans and search engines. Best practices: Keep short (under 60 characters), include main keyword, use lowercase, separate words with hyphens, no umlauts or special characters, avoid dynamic parameters if possible, reflect logical hierarchy. Bad: /page.php?id=12345&cat=7. Good: /seo-agency-vienna/. The URL is a minor ranking factor and influences CTR in SERPs (users see the URL). In CMS like WordPress or Payload, slug settings should be optimized.',
      relatedTerms: ['URL Structure', 'SEO', 'Slugs', 'Hierarchy', 'Keywords'],
      usageExample: 'Instead of /services/item?id=15, we use /services/seo-consulting/ - better for SEO and users.',
      keyPoints: [
        'Short, descriptive, keyword-rich',
        'Hyphens between words',
        'No special characters',
        'Reflect logical hierarchy',
        'Influences CTR in SERPs',
        'Optimize CMS slugs'
      ]
    }
  },
  {
    slug: 'wix',
    searchVolume: 6600,
    difficulty: 42,
    category: 'design',
    de: {
      term: 'Wix',
      shortDefinition: 'Wix ist ein cloudbasierter Website-Baukasten für die Erstellung von Websites ohne Programmierkenntnisse.',
      fullDefinition: 'Wix ist ein israelisches Unternehmen (gegründet 2006), das einen Drag-and-Drop-Website-Baukasten anbietet. Mit über 200 Millionen Nutzern weltweit ist es einer der bekanntesten Homepage-Baukästen. Vorteile: Einfache Bedienung ohne technische Kenntnisse, hunderte vorgefertigte Templates, integriertes Hosting und Domain-Verwaltung, All-in-One-Lösung mit Apps und Plugins. Nachteile: Eingeschränkte SEO-Optimierungsmöglichkeiten, oftmals langsamere Ladezeiten als Custom-Websites, kein nachträglicher Template-Wechsel möglich, begrenzte Designfreiheit bei komplexen Anforderungen, Vendor Lock-in (keine Portabilität des Codes). Wix eignet sich für Hobby-Projekte und kleine Präsenzen. Für geschäftskritische Websites mit hohen SEO-Anforderungen sind professionelle Custom-Lösungen meist vorzuziehen.',
      relatedTerms: ['Website-Baukasten', 'Squarespace', 'WordPress', 'Homepage erstellen', 'Webdesign'],
      usageExample: 'Für einen schnellen Prototyp nutzte das Startup Wix, wechselte aber für die finale Website zu einer Custom-Lösung.',
      keyPoints: [
        'Drag-and-Drop Website-Erstellung',
        'Über 200 Millionen Nutzer weltweit',
        'Einfach für Einsteiger',
        'SEO-Limitierungen bei komplexen Anforderungen',
        'Kein Template-Wechsel nach Erstellung',
        'Vendor Lock-in: Code nicht portierbar'
      ]
    },
    en: {
      term: 'Wix',
      shortDefinition: 'Wix is a cloud-based website builder for creating websites without coding knowledge.',
      fullDefinition: 'Wix is an Israeli company (founded 2006) that offers a drag-and-drop website builder. With over 200 million users worldwide, it is one of the most well-known website builders. Advantages: Easy to use without technical knowledge, hundreds of pre-made templates, integrated hosting and domain management, all-in-one solution with apps and plugins. Disadvantages: Limited SEO optimization capabilities, often slower loading times than custom websites, no template switching after initial setup, limited design freedom for complex requirements, vendor lock-in (no code portability). Wix is suitable for hobby projects and small presences. For business-critical websites with high SEO requirements, professional custom solutions are usually preferable.',
      relatedTerms: ['Website Builder', 'Squarespace', 'WordPress', 'Create Website', 'Web Design'],
      usageExample: 'For a quick prototype, the startup used Wix but switched to a custom solution for the final website.',
      keyPoints: [
        'Drag-and-drop website creation',
        'Over 200 million users worldwide',
        'Easy for beginners',
        'SEO limitations for complex requirements',
        'No template switching after creation',
        'Vendor lock-in: Code not portable'
      ]
    }
  },
  {
    slug: 'squarespace',
    searchVolume: 4400,
    difficulty: 38,
    category: 'design',
    de: {
      term: 'Squarespace',
      shortDefinition: 'Squarespace ist ein Website-Baukasten mit Fokus auf hochwertiges Design und E-Commerce-Funktionen.',
      fullDefinition: 'Squarespace ist ein US-amerikanisches Unternehmen (gegründet 2003), bekannt für seine eleganten, modernen Design-Templates. Die Plattform wird häufig von Kreativen, Fotografen und kleinen Unternehmen genutzt. Vorteile: Elegante, professionelle Design-Templates, gute E-Commerce-Integration, bessere Performance als einige Konkurrenten, hochwertige Bildverarbeitung, integrierte Analytics. Nachteile: Höhere Preise als Wix, weniger flexibel bei individuellen Anpassungen, Support primär auf Englisch, eingeschränkte Plugin-Auswahl, Vendor Lock-in. Im Vergleich zu Custom-Websites bietet Squarespace weniger Kontrolle über SEO-Details und Performance-Optimierung. Für Portfolio-Websites und kleine Online-Shops mit Design-Fokus kann Squarespace eine gute Lösung sein.',
      relatedTerms: ['Wix', 'Website-Baukasten', 'E-Commerce', 'Portfolio-Website', 'Webdesign'],
      usageExample: 'Die Fotografin erstellte ihr Portfolio mit Squarespace wegen der hochwertigen Bilddarstellung.',
      keyPoints: [
        'Fokus auf hochwertiges Design',
        'Beliebt bei Kreativen und Fotografen',
        'Gute E-Commerce-Integration',
        'Höhere Preise als Wix',
        'Weniger flexibel als Custom-Lösungen',
        'Vendor Lock-in beachten'
      ]
    },
    en: {
      term: 'Squarespace',
      shortDefinition: 'Squarespace is a website builder focused on high-quality design and e-commerce functionality.',
      fullDefinition: 'Squarespace is a US company (founded 2003), known for its elegant, modern design templates. The platform is frequently used by creatives, photographers, and small businesses. Advantages: Elegant, professional design templates, good e-commerce integration, better performance than some competitors, high-quality image processing, integrated analytics. Disadvantages: Higher prices than Wix, less flexible for custom modifications, support primarily in English, limited plugin selection, vendor lock-in. Compared to custom websites, Squarespace offers less control over SEO details and performance optimization. For portfolio websites and small online shops with a design focus, Squarespace can be a good solution.',
      relatedTerms: ['Wix', 'Website Builder', 'E-Commerce', 'Portfolio Website', 'Web Design'],
      usageExample: 'The photographer created her portfolio with Squarespace due to its high-quality image display.',
      keyPoints: [
        'Focus on high-quality design',
        'Popular with creatives and photographers',
        'Good e-commerce integration',
        'Higher prices than Wix',
        'Less flexible than custom solutions',
        'Consider vendor lock-in'
      ]
    }
  },
  {
    slug: 'seo-beratung',
    searchVolume: 2900,
    difficulty: 32,
    category: 'seo',
    de: {
      term: 'SEO-Beratung',
      shortDefinition: 'SEO-Beratung ist professionelle Beratung zur Verbesserung der organischen Sichtbarkeit in Suchmaschinen.',
      fullDefinition: 'SEO-Beratung umfasst die professionelle Analyse und strategische Beratung zur Verbesserung der organischen Sichtbarkeit einer Website. Ein SEO-Berater analysiert den Ist-Zustand, identifiziert Potenziale und entwickelt eine massgeschneiderte Strategie. Typische Leistungen: SEO-Audit und Ist-Analyse, Keyword-Recherche und -Strategie, Wettbewerbsanalyse, technische SEO-Empfehlungen, Content-Strategie-Entwicklung, Massnahmenplan und Priorisierung, Schulungen und Workshops. Wann ist SEO-Beratung sinnvoll? Vor einem Website-Relaunch, bei stagnierendem organischem Traffic, vor dem Eintritt in neue Märkte, bei Abstrafungen durch Google, für interne Team-Weiterbildung. Unterschied zur SEO-Agentur: Beratung fokussiert auf Strategie und Empfehlungen, eine Agentur übernimmt auch die Umsetzung und laufende Betreuung.',
      relatedTerms: ['SEO', 'SEO-Audit', 'Keyword-Recherche', 'Content-Strategie', 'SEO-Agentur'],
      usageExample: 'Vor dem Relaunch holten wir uns eine SEO-Beratung, um keine Rankings zu verlieren.',
      keyPoints: [
        'Professionelle Analyse und Strategie',
        'SEO-Audit als Ausgangspunkt',
        'Keyword-Recherche und Wettbewerbsanalyse',
        'Technische und Content-Empfehlungen',
        'Sinnvoll vor Relaunches und bei Traffic-Problemen',
        'Beratung vs. Agentur: Strategie vs. Umsetzung'
      ]
    },
    en: {
      term: 'SEO Consulting',
      shortDefinition: 'SEO consulting is professional advice to improve organic search engine visibility.',
      fullDefinition: 'SEO consulting encompasses professional analysis and strategic advice to improve a website\'s organic visibility. An SEO consultant analyzes the current state, identifies opportunities, and develops a tailored strategy. Typical services: SEO audit and current state analysis, keyword research and strategy, competitor analysis, technical SEO recommendations, content strategy development, action plan and prioritization, training and workshops. When is SEO consulting useful? Before a website relaunch, when organic traffic stagnates, before entering new markets, after Google penalties, for internal team development. Difference from SEO agency: Consulting focuses on strategy and recommendations, an agency also handles implementation and ongoing support.',
      relatedTerms: ['SEO', 'SEO Audit', 'Keyword Research', 'Content Strategy', 'SEO Agency'],
      usageExample: 'Before the relaunch, we sought SEO consulting to avoid losing rankings.',
      keyPoints: [
        'Professional analysis and strategy',
        'SEO audit as starting point',
        'Keyword research and competitor analysis',
        'Technical and content recommendations',
        'Useful before relaunches and for traffic issues',
        'Consulting vs. Agency: Strategy vs. Implementation'
      ]
    }
  }
]

// Helper functions
export function getLexikonEntry(slug: string): LexikonEntry | undefined {
  return lexikonEntries.find(entry => entry.slug === slug)
}

export function getAllLexikonSlugs(): string[] {
  return lexikonEntries.map(entry => entry.slug)
}

export function getLexikonEntriesByCategory(category: LexikonEntry['category']): LexikonEntry[] {
  return lexikonEntries.filter(entry => entry.category === category)
}

export function getRelatedLexikonEntries(slug: string, limit: number = 3): LexikonEntry[] {
  const entry = getLexikonEntry(slug)
  if (!entry) return []

  // Find entries in the same category, excluding the current one
  return lexikonEntries
    .filter(e => e.slug !== slug && e.category === entry.category)
    .slice(0, limit)
}

export const lexikonCategories = {
  de: {
    seo: 'SEO & Suchmaschinen',
    marketing: 'Marketing & Strategie',
    design: 'Design & UX',
    development: 'Entwicklung & Technik',
    strategy: 'Strategie & Branding'
  },
  en: {
    seo: 'SEO & Search Engines',
    marketing: 'Marketing & Strategy',
    design: 'Design & UX',
    development: 'Development & Technology',
    strategy: 'Strategy & Branding'
  }
}
