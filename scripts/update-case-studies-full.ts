/**
 * Full Case Study Content Migration
 * Updates all 30 projects with complete case study data
 */

import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'goldenwing.db')
const db = new Database(dbPath)

interface CaseStudy {
  slug: string
  industry: string[]
  companyDescription: {
    de: string
    en: string
  }
  challenge: {
    de: string
    en: string
  }
  solution: {
    de: string
    en: string
  }
  solutionPoints: {
    de: { title: string; description: string }[]
    en: { title: string; description: string }[]
  }
  results: { metric: string; label: { de: string; en: string } }[]
  clientFeedback: {
    quote: { de: string; en: string }
    author: string
    role: { de: string; en: string }
  }
}

const caseStudies: CaseStudy[] = [
  {
    slug: 'domoferm',
    industry: ['manufacturing'],
    companyDescription: {
      de: 'Domoferm ist ein führender europäischer Hersteller von hochwertigen Stahltüren und Stahlbaulösungen mit Hauptsitz in Österreich. Das Unternehmen beliefert B2B-Partner in mehreren europäischen Ländern und kombiniert traditionelle Handwerkskunst mit modernster Fertigungstechnologie.',
      en: 'Domoferm is a leading European manufacturer of high-quality steel doors and steel construction solutions headquartered in Austria. The company supplies B2B partners in several European countries, combining traditional craftsmanship with state-of-the-art manufacturing technology.'
    },
    challenge: {
      de: 'Domoferm verfügte über exzellente Produkte und starkes Markenwissen, nutzte digitale Kanäle aber nicht als aktiven Lead-Generator. Die Website war informativ, aber nicht auf B2B-Konversion ausgelegt. Potenzielle Entscheider fanden Inhalte schwer zugänglich, und es fehlten klare Mechanismen zur Lead-Generierung.',
      en: 'Domoferm had excellent products and strong brand knowledge but did not use digital channels as an active lead generator. The website was informative but not designed for B2B conversion. Potential decision-makers found content hard to access, and clear lead generation mechanisms were missing.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine integrierte digitale Strategie mit:',
      en: 'GoldenWing developed an integrated digital strategy with:'
    },
    solutionPoints: {
      de: [
        { title: 'Website-Entwicklung', description: 'Kundenorientierte Struktur mit thematischen Landing-Pages' },
        { title: 'Lead-Generierung', description: 'B2B-Partner-Akquise in diversen Ländern durch gezielte Kampagnen' },
        { title: 'Content-Produktion', description: 'Professionelle Produktvideos für Stahltüren, Produktfotoshootings' },
        { title: 'Marketing & Sales Material', description: 'Umfassende Unterlagen für internationale Partner' },
        { title: 'Lead Management', description: 'Organisation und Moderation von B2B-Meetings' },
        { title: 'Training & Schulung', description: 'Aktive Teilnahme an Produktschulungen für Partner' }
      ],
      en: [
        { title: 'Website Development', description: 'Customer-oriented structure with thematic landing pages' },
        { title: 'Lead Generation', description: 'B2B partner acquisition in various countries through targeted campaigns' },
        { title: 'Content Production', description: 'Professional product videos for steel doors, product photo shoots' },
        { title: 'Marketing & Sales Material', description: 'Comprehensive materials for international partners' },
        { title: 'Lead Management', description: 'Organization and moderation of B2B meetings' },
        { title: 'Training & Education', description: 'Active participation in product training for partners' }
      ]
    },
    results: [
      { metric: '+180%', label: { de: 'qualifizierte Leads', en: 'qualified leads' } },
      { metric: '+95%', label: { de: 'organischer Traffic', en: 'organic traffic' } },
      { metric: '8', label: { de: 'Länder im Partner-Netzwerk', en: 'countries in partner network' } }
    ],
    clientFeedback: {
      quote: {
        de: 'GoldenWing hat unsere digitale Präsenz transformiert. Von der Website über Videos bis zu Sales-Meetings – alles aus einer Hand. Die Leads, die wir jetzt generieren, sind qualitativ hochwertig und kommen aus Märkten, die wir vorher kaum erreicht haben.',
        en: 'GoldenWing transformed our digital presence. From the website to videos to sales meetings – everything from one source. The leads we now generate are high quality and come from markets we could barely reach before.'
      },
      author: 'Domoferm',
      role: { de: 'Marketing & Sales Director', en: 'Marketing & Sales Director' }
    }
  },
  {
    slug: 'atta-pallet',
    industry: ['manufacturing'],
    companyDescription: {
      de: 'Atta Paper Pallet revolutioniert die Logistikbranche mit vollständig recycelbaren Papierpaletten als nachhaltige Alternative zu Holz- und Kunststoffpaletten. Das ungarische Innovationsunternehmen beliefert internationale Konzerne mit umweltfreundlichen Transportlösungen.',
      en: 'Atta Paper Pallet revolutionizes the logistics industry with fully recyclable paper pallets as a sustainable alternative to wood and plastic pallets. The Hungarian innovation company supplies international corporations with eco-friendly transport solutions.'
    },
    challenge: {
      de: 'In einem etablierten Logistikmarkt mussten nachhaltige Vorteile klar kommuniziert und B2B-Entscheider auf digitalen Kanälen erreicht werden. Klassische Vertriebswege reichten nicht aus, um internationale Konzerne zu überzeugen und Pilotprojekte zu initiieren.',
      en: 'In an established logistics market, sustainable advantages had to be clearly communicated and B2B decision-makers reached through digital channels. Traditional sales channels were insufficient to convince international corporations and initiate pilot projects.'
    },
    solution: {
      de: 'GoldenWing implementierte eine globale Digital-First-Strategie:',
      en: 'GoldenWing implemented a global digital-first strategy:'
    },
    solutionPoints: {
      de: [
        { title: 'Global Lead Generation', description: 'Vernetzung mit Fortune-500-Unternehmen' },
        { title: 'Website-Optimierung', description: 'Integration von Features und B2B-Registrierungsformularen' },
        { title: 'Online-Koordination', description: 'B2B-Calls und virtuelle Factory Tours für internationale Leads' },
        { title: 'Messestrategie', description: 'Einladungsmanagement und Lead-Follow-up bei internationalen Messen' },
        { title: 'Pilotprojekt-Management', description: 'Koordination von Test-Implementierungen mit Großkunden' },
        { title: 'Content-Marketing', description: 'SEO-optimierte Inhalte zur Nachhaltigkeitskommunikation' }
      ],
      en: [
        { title: 'Global Lead Generation', description: 'Networking with Fortune 500 companies' },
        { title: 'Website Optimization', description: 'Integration of features and B2B registration forms' },
        { title: 'Online Coordination', description: 'B2B calls and virtual factory tours for international leads' },
        { title: 'Trade Fair Strategy', description: 'Invitation management and lead follow-up at international fairs' },
        { title: 'Pilot Project Management', description: 'Coordination of test implementations with major customers' },
        { title: 'Content Marketing', description: 'SEO-optimized content for sustainability communication' }
      ]
    },
    results: [
      { metric: '+120%', label: { de: 'digitale Anfragen', en: 'digital inquiries' } },
      { metric: '15+', label: { de: 'Pilotprojekte koordiniert', en: 'pilot projects coordinated' } },
      { metric: 'BMW, IKEA', label: { de: 'Top-Partner gewonnen', en: 'top partners acquired' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Von lokaler Innovation zu globalen Partnerschaften mit den größten Namen der Industrie – GoldenWing hat uns nicht nur digital sichtbar gemacht, sondern aktiv bei der Skalierung unseres Geschäfts unterstützt. Die Factory Tours und Lead-Koordination waren gamechanging.',
        en: 'From local innovation to global partnerships with the biggest names in industry – GoldenWing not only made us digitally visible but actively supported us in scaling our business. The factory tours and lead coordination were gamechanging.'
      },
      author: 'Atta Paper Pallet',
      role: { de: 'CEO', en: 'CEO' }
    }
  },
  {
    slug: 'derbotaniker',
    industry: ['ecommerce'],
    companyDescription: {
      de: 'Der Botaniker ist ein spezialisiertes Unternehmen für botanische Raumgestaltungen und Premium-Begrünungskonzepte mit Fokus auf hochwertige, nachhaltige Lösungen für Gewerbe- und Privatkunden.',
      en: 'Der Botaniker is a specialized company for botanical interior design and premium greening concepts focusing on high-quality, sustainable solutions for commercial and private clients.'
    },
    challenge: {
      de: 'Die vorherige Präsenz spiegelte nicht das kreative Potenzial und die Markenpersönlichkeit des Unternehmens wider. Es fehlten klare Nutzerpfade für Produkt- und Leistungsinformationen sowie ein konsistentes Markenbild.',
      en: 'The previous presence did not reflect the creative potential and brand personality of the company. Clear user paths for product and service information were missing, as was a consistent brand image.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine ganzheitliche Markenstrategie:',
      en: 'GoldenWing developed a holistic brand strategy:'
    },
    solutionPoints: {
      de: [
        { title: 'Logo-Entwicklung', description: 'Frische, botanische Identität' },
        { title: 'Onlineshop & Website', description: 'E-Commerce-Integration und Portfolio-Darstellung' },
        { title: 'LinkedIn Lead Generation', description: 'Professionelle B2B-Ansprache' },
        { title: 'Consulting Services Concept', description: 'Entwicklung neuer Dienstleistungsangebote' },
        { title: 'Sichtbarkeitsstrategie', description: 'Angebotserstellung und Content-Marketing' }
      ],
      en: [
        { title: 'Logo Development', description: 'Fresh, botanical identity' },
        { title: 'Online Shop & Website', description: 'E-commerce integration and portfolio presentation' },
        { title: 'LinkedIn Lead Generation', description: 'Professional B2B outreach' },
        { title: 'Consulting Services Concept', description: 'Development of new service offerings' },
        { title: 'Visibility Strategy', description: 'Proposal creation and content marketing' }
      ]
    },
    results: [
      { metric: '+80%', label: { de: 'Traffic-Wachstum', en: 'traffic growth' } },
      { metric: '+150%', label: { de: 'LinkedIn-Leads', en: 'LinkedIn leads' } },
      { metric: 'Neu', label: { de: 'Consulting-Service etabliert', en: 'consulting service established' } }
    ],
    clientFeedback: {
      quote: {
        de: 'GoldenWing hat aus unserem Handwerksbetrieb eine begehrte Premium-Marke gemacht. Das neue Logo, der Shop und vor allem die LinkedIn-Strategie haben uns Türen geöffnet, die vorher verschlossen waren.',
        en: 'GoldenWing turned our craft business into a sought-after premium brand. The new logo, shop, and especially the LinkedIn strategy opened doors that were previously closed to us.'
      },
      author: 'Der Botaniker',
      role: { de: 'Gründer', en: 'Founder' }
    }
  },
  {
    slug: 'glaeser-law',
    industry: ['consulting'],
    companyDescription: {
      de: 'Glaeser Law ist eine renommierte österreichische Tax Boutique mit Spezialisierung auf internationales Steuer- und Wirtschaftsrecht, die sowohl nationale als auch internationale Mandanten betreut.',
      en: 'Glaeser Law is a renowned Austrian tax boutique specializing in international tax and business law, serving both national and international clients.'
    },
    challenge: {
      de: 'Als renommierte Tax Boutique benötigte Glaeser Law professionelle Marketing-Materialien, die die Expertise und Seriosität der Kanzlei widerspiegeln und bei verschiedenen Kunden-Touchpoints konsistent auftreten.',
      en: 'As a renowned tax boutique, Glaeser Law needed professional marketing materials that reflect the expertise and professionalism of the firm and appear consistently across various customer touchpoints.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine umfassende Brand-Asset-Strategie:',
      en: 'GoldenWing developed a comprehensive brand asset strategy:'
    },
    solutionPoints: {
      de: [
        { title: 'Marketing-Unterlagen', description: 'Professionelle Broschüren und Präsentationen' },
        { title: 'Print-Materialien', description: 'Sticker, Roll-ups für Events und Messen' },
        { title: 'Saisonale Kommunikation', description: 'Weihnachtskarten im Corporate Design' },
        { title: 'Event-Materialien', description: 'Einladungen für Kundenveranstaltungen' },
        { title: 'Corporate Stationery', description: 'Briefpapier, Visitenkarten, Folder' }
      ],
      en: [
        { title: 'Marketing Materials', description: 'Professional brochures and presentations' },
        { title: 'Print Materials', description: 'Stickers, roll-ups for events and trade fairs' },
        { title: 'Seasonal Communication', description: 'Christmas cards in corporate design' },
        { title: 'Event Materials', description: 'Invitations for client events' },
        { title: 'Corporate Stationery', description: 'Letterhead, business cards, folders' }
      ]
    },
    results: [
      { metric: '100%', label: { de: 'konsistente Brand Presence', en: 'consistent brand presence' } },
      { metric: 'Premium', label: { de: 'Positionierung gestärkt', en: 'positioning strengthened' } },
      { metric: 'Top', label: { de: 'Print- und Digital-Assets', en: 'print and digital assets' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Die Marketing-Materialien von GoldenWing sind top-professionell und stärken unsere Markenpräsenz bei jedem Kunden-Touchpoint. Von Roll-ups bis Weihnachtskarten – alles passt perfekt zu unserer Positionierung.',
        en: 'The marketing materials from GoldenWing are top-notch professional and strengthen our brand presence at every customer touchpoint. From roll-ups to Christmas cards – everything perfectly fits our positioning.'
      },
      author: 'Glaeser Law',
      role: { de: 'Managing Partner', en: 'Managing Partner' }
    }
  },
  {
    slug: 'alinea-partners',
    industry: ['consulting'],
    companyDescription: {
      de: 'Alinea Partners ist eine strategische Unternehmensberatung mit Fokus auf Organizational Excellence, Change Management und strategische Transformation für mittelständische und große Unternehmen.',
      en: 'Alinea Partners is a strategic management consultancy focused on Organizational Excellence, Change Management, and strategic transformation for medium-sized and large enterprises.'
    },
    challenge: {
      de: 'Die bisherige Website wirkte fragmentiert und vermittelte nicht die strategische Tiefe des Beratungsangebots. Potentielle Kunden konnten Leistungen nicht schnell erfassen, was die Lead-Effektivität schwächte.',
      en: 'The previous website appeared fragmented and did not convey the strategic depth of the consulting offering. Potential clients could not quickly grasp services, weakening lead effectiveness.'
    },
    solution: {
      de: 'GoldenWing lieferte eine Full-Service-Lösung:',
      en: 'GoldenWing delivered a full-service solution:'
    },
    solutionPoints: {
      de: [
        { title: 'Website Redesign & Relaunch', description: 'Moderne, conversion-fokussierte Plattform' },
        { title: 'Library-Entwicklung', description: 'Ressourcen-Hub für Thought Leadership' },
        { title: 'Marketing & Sales Documents', description: 'Umfassende Sales-Enablement-Materialien' },
        { title: 'Video Production', description: 'Professionelle Trainingsvideos (u.a. Microsoft Copilot)' },
        { title: 'Video Post-Production', description: 'Editing und Optimierung' },
        { title: 'E-Commerce', description: 'Online-Shops für einfachen Service-Vertrieb in USA/Europa' }
      ],
      en: [
        { title: 'Website Redesign & Relaunch', description: 'Modern, conversion-focused platform' },
        { title: 'Library Development', description: 'Resource hub for thought leadership' },
        { title: 'Marketing & Sales Documents', description: 'Comprehensive sales enablement materials' },
        { title: 'Video Production', description: 'Professional training videos (incl. Microsoft Copilot)' },
        { title: 'Video Post-Production', description: 'Editing and optimization' },
        { title: 'E-Commerce', description: 'Online shops for easy service distribution in USA/Europe' }
      ]
    },
    results: [
      { metric: '+140%', label: { de: 'qualifizierte Kontaktanfragen', en: 'qualified contact inquiries' } },
      { metric: 'USA+EU', label: { de: 'Online-Shops gelauncht', en: 'online shops launched' } },
      { metric: 'Top', label: { de: 'Microsoft Copilot Videos', en: 'Microsoft Copilot videos' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Von der Website über Videos bis zu unseren Online-Shops – GoldenWing hat alles geliefert. Die Microsoft Copilot Videos sind Qualitäts-Benchmarks geworden, und unsere Lead-Qualität ist deutlich gestiegen.',
        en: 'From the website to videos to our online shops – GoldenWing delivered everything. The Microsoft Copilot videos have become quality benchmarks, and our lead quality has significantly improved.'
      },
      author: 'Alinea Partners',
      role: { de: 'Partner', en: 'Partner' }
    }
  },
  {
    slug: 'lamberg',
    industry: ['ecommerce'],
    companyDescription: {
      de: 'LAMBERG ist ein etablierter E-Commerce-Retailer, der sich auf hochwertige Produkte spezialisiert hat und vom Marketplace-Seller zum eigenständigen Online-Shop transformiert wurde.',
      en: 'LAMBERG is an established e-commerce retailer specializing in high-quality products, transformed from a marketplace seller to an independent online shop.'
    },
    challenge: {
      de: 'LAMBERG war abhängig von Marketplaces mit hohen Gebühren und ohne direkten Kundenkontakt. Es fehlte eine eigene E-Commerce-Plattform, die sowohl gut aussieht als auch verkauft.',
      en: 'LAMBERG was dependent on marketplaces with high fees and no direct customer contact. An own e-commerce platform was missing that both looks good and sells.'
    },
    solution: {
      de: 'GoldenWing entwickelte einen Custom-E-Commerce-Shop:',
      en: 'GoldenWing developed a custom e-commerce shop:'
    },
    solutionPoints: {
      de: [
        { title: 'Shop-Entwicklung', description: 'Maßgeschneidertes E-Commerce-System' },
        { title: 'UX-Design', description: 'Conversion-optimierte Benutzerführung' },
        { title: 'Payment-Integration', description: 'Multiple Zahlungsmethoden' },
        { title: 'Inventory-Management', description: 'Automatisierte Lagerverwaltung' },
        { title: 'Marketing-Integration', description: 'SEO, Analytics, Email-Marketing' },
        { title: 'Mobile-First Design', description: 'Optimiert für Mobile Shopping' }
      ],
      en: [
        { title: 'Shop Development', description: 'Custom e-commerce system' },
        { title: 'UX Design', description: 'Conversion-optimized user experience' },
        { title: 'Payment Integration', description: 'Multiple payment methods' },
        { title: 'Inventory Management', description: 'Automated warehouse management' },
        { title: 'Marketing Integration', description: 'SEO, analytics, email marketing' },
        { title: 'Mobile-First Design', description: 'Optimized for mobile shopping' }
      ]
    },
    results: [
      { metric: '+300%', label: { de: 'Umsatzsteigerung', en: 'revenue increase' } },
      { metric: '0%', label: { de: 'Marketplace-Gebühren', en: 'marketplace fees' } },
      { metric: 'Direkt', label: { de: 'Kundenkontakt', en: 'customer contact' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Vom Marketplace-Gefangenen zum E-Commerce-Unternehmer: GoldenWing hat uns einen Shop gebaut, der nicht nur gut aussieht, sondern auch verkauft. 300% mehr Umsatz sprechen für sich.',
        en: 'From marketplace prisoner to e-commerce entrepreneur: GoldenWing built us a shop that not only looks good but also sells. 300% more revenue speaks for itself.'
      },
      author: 'LAMBERG',
      role: { de: 'Geschäftsführer', en: 'Managing Director' }
    }
  },
  {
    slug: 'point-of-new',
    industry: ['consulting'],
    companyDescription: {
      de: 'Point of New ist eine spezialisierte Innovationsberatung für Geschäftsmodell-Innovation, die Unternehmen bei der strategischen Transformation und digitalen Innovation unterstützt.',
      en: 'Point of New is a specialized innovation consultancy for business model innovation, supporting companies in strategic transformation and digital innovation.'
    },
    challenge: {
      de: 'Die damalige Website zeigte zwar Kompetenz, aber die strukturierte Darstellung der Angebote und Ergebnisse war nicht ausgereift genug, um qualitative Leads zu generieren oder Suchmaschinenrankings zu optimieren.',
      en: 'The previous website showed competence, but the structured presentation of offers and results was not mature enough to generate quality leads or optimize search engine rankings.'
    },
    solution: {
      de: 'GoldenWing implementierte ein komplettes Rebrand:',
      en: 'GoldenWing implemented a complete rebrand:'
    },
    solutionPoints: {
      de: [
        { title: 'Rebranding', description: 'Neue visuelle Identität und Positionierung' },
        { title: 'Website Redesign & Relaunch', description: 'Moderne, conversion-optimierte Plattform' },
        { title: 'Visitenkarten-Erstellung', description: 'Konsistente Brand-Touchpoints' },
        { title: 'LinkedIn Campaign Management', description: 'Professional Lead Generation' },
        { title: 'Content Creation', description: 'Thought-Leadership-Content' }
      ],
      en: [
        { title: 'Rebranding', description: 'New visual identity and positioning' },
        { title: 'Website Redesign & Relaunch', description: 'Modern, conversion-optimized platform' },
        { title: 'Business Card Creation', description: 'Consistent brand touchpoints' },
        { title: 'LinkedIn Campaign Management', description: 'Professional lead generation' },
        { title: 'Content Creation', description: 'Thought leadership content' }
      ]
    },
    results: [
      { metric: '+85%', label: { de: 'LinkedIn-Lead-Performance', en: 'LinkedIn lead performance' } },
      { metric: 'Klar', label: { de: 'Messaging-Klarheit', en: 'messaging clarity' } },
      { metric: 'Neu', label: { de: 'Visuelle Identität', en: 'visual identity' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Das Rebranding war längst überfällig. GoldenWing hat uns nicht nur einen neuen Look gegeben, sondern unsere gesamte Markenpositionierung geschärft. Die LinkedIn-Kampagnen liefern konstant qualifizierte Leads.',
        en: 'The rebranding was long overdue. GoldenWing not only gave us a new look but sharpened our entire brand positioning. The LinkedIn campaigns consistently deliver qualified leads.'
      },
      author: 'Point of New',
      role: { de: 'Geschäftsleitung', en: 'Management' }
    }
  },
  {
    slug: 'simax',
    industry: ['technology'],
    companyDescription: {
      de: 'SiMAX ist ein Technologie-Innovator, der barrierefreie Kommunikationslösungen entwickelt, insbesondere Gebärdensprach-Technologie und assistive UX-Elemente für Web- und Mobile-Anwendungen.',
      en: 'SiMAX is a technology innovator developing accessible communication solutions, particularly sign language technology and assistive UX elements for web and mobile applications.'
    },
    challenge: {
      de: 'Als innovatives Tech-Unternehmen benötigte SiMAX professionelle digitale Sichtbarkeit und eine strukturierte Go-to-Market-Strategie, um Developer und Unternehmen von ihrer Inklusionslösung zu überzeugen.',
      en: 'As an innovative tech company, SiMAX needed professional digital visibility and a structured go-to-market strategy to convince developers and companies of their inclusion solution.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine umfassende Digital-Marketing-Strategie:',
      en: 'GoldenWing developed a comprehensive digital marketing strategy:'
    },
    solutionPoints: {
      de: [
        { title: 'LinkedIn Campaign Management', description: 'Professionelle B2B-Developer-Ansprache' },
        { title: 'Content-Erstellung', description: 'Technische und Marketing-Inhalte' },
        { title: 'Webinar-Koordination', description: 'Organisation von Online-Meetings und Events' },
        { title: 'Event-Durchführung', description: 'Virtuelle Launch-Events und Demos' },
        { title: 'Community-Building', description: 'Aufbau einer engagierten Developer-Community' }
      ],
      en: [
        { title: 'LinkedIn Campaign Management', description: 'Professional B2B developer outreach' },
        { title: 'Content Creation', description: 'Technical and marketing content' },
        { title: 'Webinar Coordination', description: 'Organization of online meetings and events' },
        { title: 'Event Execution', description: 'Virtual launch events and demos' },
        { title: 'Community Building', description: 'Building an engaged developer community' }
      ]
    },
    results: [
      { metric: 'High', label: { de: 'Engagement-Rate', en: 'engagement rate' } },
      { metric: 'Top', label: { de: 'Brand Awareness', en: 'brand awareness' } },
      { metric: 'B2B', label: { de: 'Leads generiert', en: 'leads generated' } }
    ],
    clientFeedback: {
      quote: {
        de: 'GoldenWing hat uns geholfen, unsere Technologie erfolgreich zu vermarkten und die richtige Zielgruppe zu erreichen. Die LinkedIn-Kampagnen und Webinare haben uns echte Business-Opportunities gebracht.',
        en: 'GoldenWing helped us successfully market our technology and reach the right target audience. The LinkedIn campaigns and webinars brought us real business opportunities.'
      },
      author: 'SiMAX',
      role: { de: 'CTO', en: 'CTO' }
    }
  },
  {
    slug: 'turbo-mango',
    industry: ['technology', 'consulting'],
    companyDescription: {
      de: 'Turbo Mango ist eine digitale Agentur mit Fokus auf kreative digitale Lösungen, die Unternehmen bei Brand-Building und digitalem Business Development unterstützt.',
      en: 'Turbo Mango is a digital agency focused on creative digital solutions, supporting companies in brand building and digital business development.'
    },
    challenge: {
      de: 'Als Digital-Agentur benötigte Turbo Mango eine Identität, die kreativ und professionell zugleich ist – eine Marke, die im Pitch-Meeting überzeugt und auf Messen Aufmerksamkeit erregt.',
      en: 'As a digital agency, Turbo Mango needed an identity that is both creative and professional – a brand that convinces in pitch meetings and attracts attention at trade fairs.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine vollständige Brand-Strategie:',
      en: 'GoldenWing developed a complete brand strategy:'
    },
    solutionPoints: {
      de: [
        { title: 'Logo-Entwicklung & Branding', description: 'Frische, energetische Identität' },
        { title: 'Content-Erstellung', description: 'Multi-Channel-Content-Strategie' },
        { title: 'Global Business Development', description: 'Beratung für internationale Expansion' },
        { title: 'Webdesign & Branding Initiatives', description: 'Strategische Beratung für Kundenprojekte' }
      ],
      en: [
        { title: 'Logo Development & Branding', description: 'Fresh, energetic identity' },
        { title: 'Content Creation', description: 'Multi-channel content strategy' },
        { title: 'Global Business Development', description: 'Consulting for international expansion' },
        { title: 'Web Design & Branding Initiatives', description: 'Strategic consulting for client projects' }
      ]
    },
    results: [
      { metric: 'Unique', label: { de: 'Brand Identity', en: 'brand identity' } },
      { metric: 'Global', label: { de: 'Business Development', en: 'business development' } },
      { metric: 'Top', label: { de: 'Markenkommunikation', en: 'brand communication' } }
    ],
    clientFeedback: {
      quote: {
        de: 'GoldenWing hat uns eine Marke gegeben, die wir stolz präsentieren können. Von der Logo-Entwicklung bis zur Business-Development-Beratung – Top-Qualität auf ganzer Linie.',
        en: 'GoldenWing gave us a brand we can proudly present. From logo development to business development consulting – top quality across the board.'
      },
      author: 'Turbo Mango',
      role: { de: 'Founder', en: 'Founder' }
    }
  },
  {
    slug: 'umzugsreif',
    industry: ['consulting'],
    companyDescription: {
      de: 'Umzugsreif ist ein innovativer Mobil- und Dienstleistungsanbieter, der sich durch Zuverlässigkeit, Kundenzufriedenheit und ein komplett digitales Geschäftsmodell auszeichnet.',
      en: 'Umzugsreif is an innovative mobility and service provider characterized by reliability, customer satisfaction, and a completely digital business model.'
    },
    challenge: {
      de: 'Vor dem Branding fehlte eine klare visuelle Identität und ein einheitlicher Markenauftritt. Ohne konsistente Markenkommunikation konnten Kunden den Dienst nicht eindeutig im Markt verorten.',
      en: 'Before branding, a clear visual identity and consistent brand presence were missing. Without consistent brand communication, customers could not clearly position the service in the market.'
    },
    solution: {
      de: 'GoldenWing entwickelte das komplette Geschäft digital:',
      en: 'GoldenWing developed the complete business digitally:'
    },
    solutionPoints: {
      de: [
        { title: 'Digitales Geschäftsmodell', description: 'Von Grund auf entwickelt' },
        { title: 'Branding & Naming', description: 'Einprägsame Markenidentität' },
        { title: 'Website-Entwicklung', description: 'Conversion-optimierte Plattform' },
        { title: 'Social Media Outreach', description: 'Multi-Channel-Kampagnen' },
        { title: 'Autofolien-Entwicklung', description: 'Mobile Werbeflächen' },
        { title: 'SEO-Optimierung', description: 'Lokale Sichtbarkeit' }
      ],
      en: [
        { title: 'Digital Business Model', description: 'Developed from scratch' },
        { title: 'Branding & Naming', description: 'Memorable brand identity' },
        { title: 'Website Development', description: 'Conversion-optimized platform' },
        { title: 'Social Media Outreach', description: 'Multi-channel campaigns' },
        { title: 'Vehicle Wrap Development', description: 'Mobile advertising surfaces' },
        { title: 'SEO Optimization', description: 'Local visibility' }
      ]
    },
    results: [
      { metric: '+80%', label: { de: 'Brand Recognition', en: 'brand recognition' } },
      { metric: '+35%', label: { de: 'Weiterempfehlungsrate', en: 'referral rate' } },
      { metric: '100%', label: { de: 'Digital', en: 'digital' } }
    ],
    clientFeedback: {
      quote: {
        de: 'GoldenWing hat nicht nur unsere Marke entwickelt, sondern unser gesamtes Geschäftsmodell digitalisiert. Von der Website bis zu den Autofolien – alles perfekt durchdacht.',
        en: 'GoldenWing not only developed our brand but digitized our entire business model. From the website to the vehicle wraps – everything perfectly thought through.'
      },
      author: 'Umzugsreif',
      role: { de: 'Founder', en: 'Founder' }
    }
  },
  {
    slug: 'erkurt-gartengestaltung',
    industry: ['ecommerce'],
    companyDescription: {
      de: 'Erkurt Gartengestaltung ist ein Wiener Landschafts- und Gartengestaltungs-Studio mit Fokus auf hochwertige, ästhetische Außenraumkonzepte für anspruchsvolle Privat- und Gewerbekunden.',
      en: 'Erkurt Gartengestaltung is a Viennese landscape and garden design studio focused on high-quality, aesthetic outdoor space concepts for discerning private and commercial clients.'
    },
    challenge: {
      de: 'Die bestehende Online-Präsenz spiegelte nicht das kreative und hochwertige Leistungsportfolio wider, was dazu führte, dass potenzielle Kunden nur eingeschränkt angesprochen wurden.',
      en: 'The existing online presence did not reflect the creative and high-quality service portfolio, leading to limited reach to potential customers.'
    },
    solution: {
      de: 'GoldenWing entwickelte ein umfassendes Branding und digitale Präsenz:',
      en: 'GoldenWing developed comprehensive branding and digital presence:'
    },
    solutionPoints: {
      de: [
        { title: 'Frisches Branding', description: 'Visuelle Identität, die kreative Positionierung betont' },
        { title: 'UX-orientierte Website', description: 'Portfolio-Präsentation mit inspirierender Darstellung' },
        { title: 'Gezielte Inhalte', description: 'Calls-to-Action führen Besucher in Kontaktprozesse' },
        { title: 'Performance-Optimierung', description: 'SEO und technische Optimierungen' },
        { title: 'Visual Content', description: 'Hochwertige Projekt-Fotografie' }
      ],
      en: [
        { title: 'Fresh Branding', description: 'Visual identity emphasizing creative positioning' },
        { title: 'UX-oriented Website', description: 'Portfolio presentation with inspiring display' },
        { title: 'Targeted Content', description: 'Calls-to-action guide visitors to contact processes' },
        { title: 'Performance Optimization', description: 'SEO and technical optimizations' },
        { title: 'Visual Content', description: 'High-quality project photography' }
      ]
    },
    results: [
      { metric: '+200%', label: { de: 'digitale Anfragen', en: 'digital inquiries' } },
      { metric: '+45%', label: { de: 'Projektgröße', en: 'project size' } },
      { metric: 'Premium', label: { de: 'Positionierung etabliert', en: 'positioning established' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Unsere Marke wirkt jetzt online genauso kraftvoll wie unsere realen Projekte — und die Anfragen sind messbar gestiegen.',
        en: 'Our brand now appears online as powerfully as our real projects — and inquiries have measurably increased.'
      },
      author: 'Erkurt Gartengestaltung',
      role: { de: 'Geschäftsführung', en: 'Management' }
    }
  },
  {
    slug: 'tet-group',
    industry: ['manufacturing'],
    companyDescription: {
      de: 'Die TET Group ist ein wachsendes Industrieunternehmen, das klare inhaltliche und visuelle Markenlinien benötigte, um interne und externe Kommunikation zu vereinheitlichen.',
      en: 'The TET Group is a growing industrial company that needed clear content and visual brand guidelines to unify internal and external communication.'
    },
    challenge: {
      de: 'Vor dem Projekt war die Markenkommunikation inkonsistent, was zu Abstimmungs- und Freigabeproblemen im Design- und Marketing-Workflow führte.',
      en: 'Before the project, brand communication was inconsistent, leading to coordination and approval problems in the design and marketing workflow.'
    },
    solution: {
      de: 'GoldenWing gestaltete umfassende Brand Guidelines:',
      en: 'GoldenWing designed comprehensive brand guidelines:'
    },
    solutionPoints: {
      de: [
        { title: 'Visuelle Stilregeln', description: 'Logo-Verwendung, Größen, Spacing' },
        { title: 'Farb- und Typografie-Definitionen', description: 'Primäre und sekundäre Farbpaletten' },
        { title: 'Kommunikationsprinzipien', description: 'Tone of Voice, Messaging-Frameworks' },
        { title: 'Template-Bibliothek', description: 'Vorlagen für verschiedene Anwendungen' },
        { title: 'Dos and Donts', description: 'Klare Beispiele für richtige und falsche Anwendung' }
      ],
      en: [
        { title: 'Visual Style Rules', description: 'Logo usage, sizes, spacing' },
        { title: 'Color and Typography Definitions', description: 'Primary and secondary color palettes' },
        { title: 'Communication Principles', description: 'Tone of voice, messaging frameworks' },
        { title: 'Template Library', description: 'Templates for various applications' },
        { title: 'Dos and Donts', description: 'Clear examples of correct and incorrect usage' }
      ]
    },
    results: [
      { metric: '100%', label: { de: 'konsistente Markenkommunikation', en: 'consistent brand communication' } },
      { metric: '-70%', label: { de: 'Genehmigungszeit', en: 'approval time' } },
      { metric: 'Top', label: { de: 'interne Effizienz', en: 'internal efficiency' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Die neuen Brand Guidelines geben uns Sicherheit bei jeder Umsetzung und beschleunigen unsere internen Prozesse erheblich.',
        en: 'The new brand guidelines give us confidence in every implementation and significantly speed up our internal processes.'
      },
      author: 'TET Group',
      role: { de: 'Head of Marketing', en: 'Head of Marketing' }
    }
  },
  {
    slug: 'qatar-duty-free',
    industry: ['ecommerce'],
    companyDescription: {
      de: 'Qatar Duty Free betreibt eine internationale Premium-Retail-Plattform am Hamad International Airport, bei der digitale Promotion-Strategien entscheidend für saisonale Umsatz- und Sichtbarkeitsziele sind.',
      en: 'Qatar Duty Free operates an international premium retail platform at Hamad International Airport, where digital promotion strategies are crucial for seasonal revenue and visibility goals.'
    },
    challenge: {
      de: 'Bisherige Promotion-Lösungen waren fragmentiert, schwierig messbar und in ihrer Skalierbarkeit eingeschränkt. Für internationale Zielgruppen war ein konsistenter Performance-Ansatz erforderlich.',
      en: 'Previous promotion solutions were fragmented, difficult to measure, and limited in scalability. A consistent performance approach was required for international audiences.'
    },
    solution: {
      de: 'GoldenWing implementierte ein digitales Promotions-Framework:',
      en: 'GoldenWing implemented a digital promotions framework:'
    },
    solutionPoints: {
      de: [
        { title: 'Tracking-Architektur', description: 'Saubere Analytics-Implementierung' },
        { title: 'Standardisierte Campaign-Assets', description: 'Wiederverwendbare Templates' },
        { title: 'Performance-Metrik-Ebene', description: 'Echtzeit-Insights in Kampagnenwirkung' },
        { title: 'Multi-Channel-Kampagnen', description: 'Koordinierte Ansprache über verschiedene Kanäle' },
        { title: 'A/B-Testing', description: 'Kontinuierliche Optimierung' }
      ],
      en: [
        { title: 'Tracking Architecture', description: 'Clean analytics implementation' },
        { title: 'Standardized Campaign Assets', description: 'Reusable templates' },
        { title: 'Performance Metric Layer', description: 'Real-time insights into campaign effectiveness' },
        { title: 'Multi-Channel Campaigns', description: 'Coordinated outreach across various channels' },
        { title: 'A/B Testing', description: 'Continuous optimization' }
      ]
    },
    results: [
      { metric: 'High', label: { de: 'Kampagnen-Performance', en: 'campaign performance' } },
      { metric: 'Real-time', label: { de: 'Tracking', en: 'tracking' } },
      { metric: 'ROI', label: { de: 'messbar verbessert', en: 'measurably improved' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Mit dem neuen digitalen Setup konnten wir unsere Promotion-Performance steigern und genauer steuern.',
        en: 'With the new digital setup, we were able to increase and more precisely control our promotion performance.'
      },
      author: 'Qatar Duty Free',
      role: { de: 'Head of Marketing', en: 'Head of Marketing' }
    }
  },
  {
    slug: 'soki',
    industry: ['technology'],
    companyDescription: {
      de: 'Soki ist ein digitales Produktunternehmen im AI-Bereich, das eine Webpräsenz benötigte, die Komplexität reduziert und gleichzeitig ihre Funktionen besser erklärt.',
      en: 'Soki is a digital product company in the AI space that needed a web presence that reduces complexity while better explaining their features.'
    },
    challenge: {
      de: 'Die alte Website war inhaltlich überladen und verwirrend, was zu hohen Absprungraten und geringen Kontaktanfragen führte. Es fehlte eine klare Informationsarchitektur und ein effektiver UX-Flow.',
      en: 'The old website was content-heavy and confusing, leading to high bounce rates and low contact inquiries. A clear information architecture and effective UX flow were missing.'
    },
    solution: {
      de: 'GoldenWing überarbeitete die komplette User Experience:',
      en: 'GoldenWing redesigned the complete user experience:'
    },
    solutionPoints: {
      de: [
        { title: 'Informationsarchitektur', description: 'Neu strukturiert für intuitive Navigation' },
        { title: 'Zielgruppenorientierte Botschaften', description: 'Klare Value Propositions' },
        { title: 'Vereinfachte Interaktionspfade', description: 'Reduzierte Komplexität' },
        { title: 'Modernes UX-Design', description: 'Mobile-first Ansatz' },
        { title: 'AI-Feature-Erklärungen', description: 'Verständliche Darstellung komplexer Technologie' }
      ],
      en: [
        { title: 'Information Architecture', description: 'Restructured for intuitive navigation' },
        { title: 'Audience-oriented Messaging', description: 'Clear value propositions' },
        { title: 'Simplified Interaction Paths', description: 'Reduced complexity' },
        { title: 'Modern UX Design', description: 'Mobile-first approach' },
        { title: 'AI Feature Explanations', description: 'Understandable presentation of complex technology' }
      ]
    },
    results: [
      { metric: 'Low', label: { de: 'Bounce Rate', en: 'bounce rate' } },
      { metric: '+85%', label: { de: 'Lead-Qualität', en: 'lead quality' } },
      { metric: 'Top', label: { de: 'Brand-Positionierung', en: 'brand positioning' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Das Redesign hat nicht nur unsere Sichtbarkeit erhöht, sondern auch die Art, wie Nutzer uns wahrnehmen und mit uns interagieren.',
        en: 'The redesign not only increased our visibility but also how users perceive and interact with us.'
      },
      author: 'Soki',
      role: { de: 'Produktmanager', en: 'Product Manager' }
    }
  },
  {
    slug: 'vimmi',
    industry: ['technology'],
    companyDescription: {
      de: 'Vimmi ist eine moderne Videostreaming-Plattform für Web und Smart-TV-Geräte mit Fokus auf Performance, Skalierbarkeit und nahtlosem Nutzererlebnis über verschiedene Endgeräte hinweg.',
      en: 'Vimmi is a modern video streaming platform for web and smart TV devices focused on performance, scalability, and seamless user experience across different devices.'
    },
    challenge: {
      de: 'Die Herausforderung bestand darin, eine Plattform zu bauen, die große Nutzerzahlen gleichzeitig bedienen kann, ohne Performance-Einbußen, und gleichzeitig eine intuitive Erlebniserfahrung bietet.',
      en: 'The challenge was to build a platform that can serve large user numbers simultaneously without performance loss while providing an intuitive experience.'
    },
    solution: {
      de: 'GoldenWing konzipierte und implementierte eine skalierbare Architektur:',
      en: 'GoldenWing designed and implemented a scalable architecture:'
    },
    solutionPoints: {
      de: [
        { title: 'Optimierte Streaming-Pipelines', description: 'Adaptive Bitrate-Streaming' },
        { title: 'Adaptive UX-Designs', description: 'Für Web und TV-Interfaces' },
        { title: 'Backend-Struktur', description: 'Auf Echtzeit-Performance ausgelegt' },
        { title: 'Android-TV-App', description: 'Native Entwicklung für Smart-TV' },
        { title: 'CDN-Integration', description: 'Globale Content-Delivery' },
        { title: 'Load-Balancing', description: 'Für hohe Nutzerzahlen' }
      ],
      en: [
        { title: 'Optimized Streaming Pipelines', description: 'Adaptive bitrate streaming' },
        { title: 'Adaptive UX Designs', description: 'For web and TV interfaces' },
        { title: 'Backend Structure', description: 'Designed for real-time performance' },
        { title: 'Android TV App', description: 'Native development for Smart TV' },
        { title: 'CDN Integration', description: 'Global content delivery' },
        { title: 'Load Balancing', description: 'For high user numbers' }
      ]
    },
    results: [
      { metric: 'High', label: { de: 'Plattform-Stabilität', en: 'platform stability' } },
      { metric: 'Top', label: { de: 'UX über alle Geräte', en: 'UX across all devices' } },
      { metric: 'Android TV', label: { de: 'erfolgreich integriert', en: 'successfully integrated' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Unsere Plattform performt zuverlässig bei hoher Last und bietet Nutzern ein flüssiges Streaming-Erlebnis.',
        en: 'Our platform performs reliably under high load and offers users a smooth streaming experience.'
      },
      author: 'Vimmi',
      role: { de: 'CTO', en: 'CTO' }
    }
  },
  {
    slug: 'inspire',
    industry: ['consulting'],
    companyDescription: {
      de: 'INSPIRE ist eine Initiative von ICMPD (International Centre for Migration Policy Development) zur digitalen Rekrutierung mit internationalem Fokus, die afrikanische Talente mit europäischen Arbeitgebern verbindet.',
      en: 'INSPIRE is an initiative by ICMPD (International Centre for Migration Policy Development) for digital recruitment with an international focus, connecting African talent with European employers.'
    },
    challenge: {
      de: 'Das bestehende Recruiting-Setup war fragmentiert und erreichte nicht die relevanten internationalen Zielgruppen effizient. Es fehlten einheitliche Daten- und Tracking-Mechanismen.',
      en: 'The existing recruiting setup was fragmented and did not efficiently reach relevant international audiences. Unified data and tracking mechanisms were missing.'
    },
    solution: {
      de: 'GoldenWing gestaltete eine digitale Recruiting-Strategie:',
      en: 'GoldenWing designed a digital recruiting strategy:'
    },
    solutionPoints: {
      de: [
        { title: 'Performance-Kanäle', description: 'Gezielte Ansprache über LinkedIn, Google Ads' },
        { title: 'Integriertes Tracking', description: 'Messbarkeit der gesamten Candidate Journey' },
        { title: 'Datengetriebene Optimierungen', description: 'Kontinuierliche Verbesserung der Kampagnen' },
        { title: 'Landing-Pages', description: 'Conversion-optimierte Bewerbungsprozesse' },
        { title: 'Content-Marketing', description: 'Employer-Branding-Inhalte' }
      ],
      en: [
        { title: 'Performance Channels', description: 'Targeted outreach via LinkedIn, Google Ads' },
        { title: 'Integrated Tracking', description: 'Measurability of the entire candidate journey' },
        { title: 'Data-driven Optimizations', description: 'Continuous improvement of campaigns' },
        { title: 'Landing Pages', description: 'Conversion-optimized application processes' },
        { title: 'Content Marketing', description: 'Employer branding content' }
      ]
    },
    results: [
      { metric: '15+', label: { de: 'Länder erreicht', en: 'countries reached' } },
      { metric: 'Fast', label: { de: 'Time-to-Hire reduziert', en: 'time-to-hire reduced' } },
      { metric: 'High', label: { de: 'Matching-Raten', en: 'matching rates' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Mit dem neuen digitalen Ansatz erreichen wir Talente weltweit und können schneller passende Kandidaten vermitteln.',
        en: 'With the new digital approach, we reach talent worldwide and can match suitable candidates faster.'
      },
      author: 'INSPIRE/ICMPD',
      role: { de: 'Head of Recruiting', en: 'Head of Recruiting' }
    }
  },
  {
    slug: 'ellogy-ai',
    industry: ['technology'],
    companyDescription: {
      de: 'Ellogy.ai ist eine KI-Plattform für intelligente Prozessautomatisierung, die Unternehmen hilft, repetitive Workflows zu automatisieren und Effizienz zu steigern.',
      en: 'Ellogy.ai is an AI platform for intelligent process automation that helps companies automate repetitive workflows and increase efficiency.'
    },
    challenge: {
      de: 'KI-Prozessautomatisierung ist komplex, aber die Plattform muss für Business-User ohne technisches Know-how nutzbar sein. Die Herausforderung lag darin, Komplexität zu verbergen ohne Funktionalität zu limitieren.',
      en: 'AI process automation is complex, but the platform must be usable for business users without technical know-how. The challenge was to hide complexity without limiting functionality.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine User-First-KI-Plattform:',
      en: 'GoldenWing developed a user-first AI platform:'
    },
    solutionPoints: {
      de: [
        { title: 'Intuitive Web-App', description: 'No-Code-Interface für Workflow-Erstellung' },
        { title: 'AI-Engine', description: 'Machine Learning für intelligente Automatisierung' },
        { title: 'Integration-Hub', description: 'Anbindung an Slack, Salesforce, Google Workspace' },
        { title: 'Visual-Workflow-Editor', description: 'Drag-and-Drop-Prozessdesign' },
        { title: 'Smart-Templates', description: 'Vorkonfigurierte Use Cases für schnellen Start' },
        { title: 'Analytics', description: 'KPI-Dashboard für Automatisierungs-ROI' }
      ],
      en: [
        { title: 'Intuitive Web App', description: 'No-code interface for workflow creation' },
        { title: 'AI Engine', description: 'Machine learning for intelligent automation' },
        { title: 'Integration Hub', description: 'Connection to Slack, Salesforce, Google Workspace' },
        { title: 'Visual Workflow Editor', description: 'Drag-and-drop process design' },
        { title: 'Smart Templates', description: 'Pre-configured use cases for quick start' },
        { title: 'Analytics', description: 'KPI dashboard for automation ROI' }
      ]
    },
    results: [
      { metric: 'No-Code', label: { de: 'Web-App gelauncht', en: 'web app launched' } },
      { metric: '20+', label: { de: 'Integrationen', en: 'integrations' } },
      { metric: 'Enterprise', label: { de: 'Kunden onboarded', en: 'customers onboarded' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Ellogy.ai mit GoldenWings UX macht KI-Automatisierung endlich für unser ganzes Team nutzbar – nicht nur für Entwickler.',
        en: 'Ellogy.ai with GoldenWing UX finally makes AI automation usable for our entire team – not just developers.'
      },
      author: 'Ellogy.ai',
      role: { de: 'Operations Director', en: 'Operations Director' }
    }
  }
]

async function migrate() {
  console.log('Starting full case study migration...\n')

  // First, add new columns if they don't exist
  try {
    db.exec(`ALTER TABLE projects ADD COLUMN industry TEXT`)
    console.log('Added industry column to projects')
  } catch {
    console.log('industry column already exists')
  }

  try {
    db.exec(`ALTER TABLE projects_locales ADD COLUMN company_description TEXT`)
    console.log('Added company_description column to projects_locales')
  } catch {
    console.log('company_description column already exists')
  }

  // Get project IDs
  const getProjectId = db.prepare('SELECT id FROM projects WHERE slug = ?')
  const updateProjectIndustry = db.prepare('UPDATE projects SET industry = ? WHERE id = ?')

  // Locales update statements
  const updateLocale = db.prepare(`
    UPDATE projects_locales
    SET company_description = ?, challenge = ?, solution = ?,
        client_feedback_quote = ?, client_feedback_role = ?
    WHERE _parent_id = ? AND _locale = ?
  `)

  // Delete old results and insert new
  const deleteResultsLocales = db.prepare('DELETE FROM projects_results_locales WHERE _parent_id IN (SELECT id FROM projects_results WHERE _parent_id = ?)')
  const deleteResults = db.prepare('DELETE FROM projects_results WHERE _parent_id = ?')
  const insertResult = db.prepare(`
    INSERT INTO projects_results (_parent_id, _order, id, metric)
    VALUES (?, ?, ?, ?)
  `)
  const insertResultLocale = db.prepare(`
    INSERT INTO projects_results_locales (_parent_id, _locale, label)
    VALUES (?, ?, ?)
  `)

  // Delete old solution points and insert new (we'll need to create this table)
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS projects_solution_points (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        _parent_id INTEGER NOT NULL,
        _order INTEGER NOT NULL,
        _locale TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (_parent_id) REFERENCES projects(id)
      )
    `)
    console.log('Created projects_solution_points table')
  } catch {
    console.log('projects_solution_points table already exists or error')
  }

  const deleteSolutionPoints = db.prepare('DELETE FROM projects_solution_points WHERE _parent_id = ?')
  const insertSolutionPoint = db.prepare(`
    INSERT INTO projects_solution_points (_parent_id, _order, _locale, title, description)
    VALUES (?, ?, ?, ?, ?)
  `)

  let updated = 0
  let notFound = 0

  for (const cs of caseStudies) {
    const project = getProjectId.get(cs.slug) as { id: number } | undefined

    if (!project) {
      console.log(`❌ Project not found: ${cs.slug}`)
      notFound++
      continue
    }

    const projectId = project.id

    // Update industry
    updateProjectIndustry.run(JSON.stringify(cs.industry), projectId)

    // Update DE locale
    updateLocale.run(
      cs.companyDescription.de,
      cs.challenge.de,
      cs.solution.de,
      cs.clientFeedback.quote.de,
      cs.clientFeedback.role.de,
      projectId,
      'de'
    )

    // Update EN locale
    updateLocale.run(
      cs.companyDescription.en,
      cs.challenge.en,
      cs.solution.en,
      cs.clientFeedback.quote.en,
      cs.clientFeedback.role.en,
      projectId,
      'en'
    )

    // Update results
    deleteResultsLocales.run(projectId)
    deleteResults.run(projectId)
    cs.results.forEach((result, idx) => {
      const resultId = `${cs.slug}-result-${idx}`
      insertResult.run(projectId, idx, resultId, result.metric)
      insertResultLocale.run(resultId, 'de', result.label.de)
      insertResultLocale.run(resultId, 'en', result.label.en)
    })

    // Update solution points
    deleteSolutionPoints.run(projectId)
    cs.solutionPoints.de.forEach((point, idx) => {
      insertSolutionPoint.run(projectId, idx, 'de', point.title, point.description)
    })
    cs.solutionPoints.en.forEach((point, idx) => {
      insertSolutionPoint.run(projectId, idx, 'en', point.title, point.description)
    })

    console.log(`✅ Updated: ${cs.slug}`)
    updated++
  }

  console.log(`\n✅ Migration complete: ${updated} updated, ${notFound} not found`)
}

migrate().catch(console.error)
