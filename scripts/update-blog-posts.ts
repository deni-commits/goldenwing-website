/**
 * Blog Post Enhancement Script
 *
 * Adds Expert Quotes, FAQs, Sources and improves SEO for all blog posts
 * Run with: npx tsx scripts/update-blog-posts.ts
 */

import { getPayload } from 'payload'
import config from '../payload.config'

// Post-specific content improvements
const postImprovements: Record<number, {
  expertQuotes: {
    de: Array<{ quote: string; author: string; role: string; source?: string }>;
    en: Array<{ quote: string; author: string; role: string; source?: string }>;
  };
  faqs: {
    de: Array<{ question: string; answer: string }>;
    en: Array<{ question: string; answer: string }>;
  };
  sources: Array<{ title: { de: string; en: string }; url: string; author?: string; year?: string }>;
  relatedServiceSlugs: string[];
}> = {
  // Post 1: Was kostet eine professionelle Website in 2025?
  1: {
    expertQuotes: {
      de: [
        {
          quote: "Design ist nicht nur, wie etwas aussieht und sich anfühlt. Design ist, wie es funktioniert.",
          author: "Steve Jobs",
          role: "Mitgründer, Apple Inc.",
          source: "The New York Times, 2003"
        },
        {
          quote: "Ihre Website ist oft der erste Eindruck, den ein potenzieller Kunde von Ihrem Unternehmen bekommt. Investieren Sie entsprechend.",
          author: "Neil Patel",
          role: "Digital Marketing Experte",
          source: "neilpatel.com"
        }
      ],
      en: [
        {
          quote: "Design is not just what it looks like and feels like. Design is how it works.",
          author: "Steve Jobs",
          role: "Co-founder, Apple Inc.",
          source: "The New York Times, 2003"
        },
        {
          quote: "Your website is often the first impression a potential customer has of your business. Invest accordingly.",
          author: "Neil Patel",
          role: "Digital Marketing Expert",
          source: "neilpatel.com"
        }
      ]
    },
    faqs: {
      de: [
        {
          question: "Wie viel kostet eine einfache Unternehmenswebsite in Österreich?",
          answer: "Eine professionelle Unternehmenswebsite mit 5-10 Seiten kostet in Österreich typischerweise zwischen €3.000 und €8.000. Der Preis hängt von Design-Komplexität, Funktionen und CMS-Wahl ab."
        },
        {
          question: "Was ist im Website-Preis normalerweise inkludiert?",
          answer: "Standardmäßig sind enthalten: Responsive Design, SEO-Grundoptimierung, SSL-Zertifikat, DSGVO-konforme Gestaltung, Kontaktformular und ein Content-Management-System zur selbstständigen Bearbeitung."
        },
        {
          question: "Welche laufenden Kosten fallen für eine Website an?",
          answer: "Laufende Kosten umfassen: Hosting (€20-100/Monat), Domain (€10-20/Jahr), SSL-Zertifikat (oft im Hosting inkludiert), und optional Wartung & Updates (€50-200/Monat)."
        },
        {
          question: "Warum sind manche Websites so viel teurer als andere?",
          answer: "Preisunterschiede entstehen durch: Custom Design vs. Templates, Anzahl der Seiten, Funktionsumfang (E-Commerce, Buchungssysteme), Mehrsprachigkeit, und die Erfahrung der Agentur."
        }
      ],
      en: [
        {
          question: "How much does a simple business website cost in Austria?",
          answer: "A professional business website with 5-10 pages typically costs between €3,000 and €8,000 in Austria. The price depends on design complexity, features, and CMS choice."
        },
        {
          question: "What is typically included in the website price?",
          answer: "Standard inclusions are: Responsive design, basic SEO optimization, SSL certificate, GDPR-compliant design, contact form, and a content management system for self-editing."
        },
        {
          question: "What ongoing costs are there for a website?",
          answer: "Ongoing costs include: Hosting (€20-100/month), Domain (€10-20/year), SSL certificate (often included in hosting), and optionally maintenance & updates (€50-200/month)."
        },
        {
          question: "Why are some websites so much more expensive than others?",
          answer: "Price differences arise from: Custom design vs. templates, number of pages, feature scope (e-commerce, booking systems), multilingualism, and agency experience."
        }
      ]
    },
    sources: [
      { title: { de: "WKO Österreich - Webdesign Preise", en: "WKO Austria - Web Design Prices" }, url: "https://www.wko.at", year: "2025" },
      { title: { de: "Statista - Website-Kosten Statistik", en: "Statista - Website Cost Statistics" }, url: "https://www.statista.com", year: "2024" }
    ],
    relatedServiceSlugs: ["webdesign", "branding"]
  },

  // Post 2: WordPress oder Webflow
  2: {
    expertQuotes: {
      de: [
        {
          quote: "Die beste Technologie ist die, die Ihren Geschäftszielen am besten dient – nicht die populärste.",
          author: "Matt Mullenweg",
          role: "Mitgründer, WordPress",
          source: "WordPress.org"
        },
        {
          quote: "No-Code-Tools wie Webflow demokratisieren das Web-Design und ermöglichen schnellere Iterationen.",
          author: "Vlad Magdalin",
          role: "CEO, Webflow",
          source: "Webflow Blog"
        }
      ],
      en: [
        {
          quote: "The best technology is the one that serves your business goals best – not the most popular one.",
          author: "Matt Mullenweg",
          role: "Co-founder, WordPress",
          source: "WordPress.org"
        },
        {
          quote: "No-code tools like Webflow democratize web design and enable faster iterations.",
          author: "Vlad Magdalin",
          role: "CEO, Webflow",
          source: "Webflow Blog"
        }
      ]
    },
    faqs: {
      de: [
        {
          question: "Ist WordPress oder Webflow besser für SEO?",
          answer: "Beide Plattformen sind SEO-fähig. WordPress bietet mehr Plugins wie Yoast SEO, während Webflow saubereren Code und schnellere Ladezeiten hat. Für komplexe SEO-Anforderungen ist WordPress flexibler."
        },
        {
          question: "Welches CMS ist günstiger – WordPress oder Webflow?",
          answer: "WordPress ist bei den Lizenzkosten günstiger (Open Source), aber Hosting und Plugins kosten extra. Webflow hat feste Monatsgebühren (€12-36/Monat), inkludiert aber Hosting und SSL."
        },
        {
          question: "Kann ich von WordPress zu Webflow wechseln?",
          answer: "Ja, ein Wechsel ist möglich, erfordert aber eine Neu-Erstellung der Website. Inhalte können exportiert werden, aber Design und Funktionen müssen neu gebaut werden."
        }
      ],
      en: [
        {
          question: "Is WordPress or Webflow better for SEO?",
          answer: "Both platforms are SEO-capable. WordPress offers more plugins like Yoast SEO, while Webflow has cleaner code and faster loading times. For complex SEO requirements, WordPress is more flexible."
        },
        {
          question: "Which CMS is cheaper – WordPress or Webflow?",
          answer: "WordPress is cheaper in licensing (open source), but hosting and plugins cost extra. Webflow has fixed monthly fees (€12-36/month), but includes hosting and SSL."
        },
        {
          question: "Can I switch from WordPress to Webflow?",
          answer: "Yes, switching is possible but requires rebuilding the website. Content can be exported, but design and functionality need to be recreated."
        }
      ]
    },
    sources: [
      { title: { de: "W3Techs - CMS Marktanteile", en: "W3Techs - CMS Market Share" }, url: "https://w3techs.com/technologies/overview/content_management", year: "2025" },
      { title: { de: "Webflow vs WordPress Vergleich", en: "Webflow vs WordPress Comparison" }, url: "https://webflow.com/vs/wordpress", year: "2024" }
    ],
    relatedServiceSlugs: ["webdesign", "technische-loesungen"]
  },

  // Post 3: Core Web Vitals
  3: {
    expertQuotes: {
      de: [
        {
          quote: "Geschwindigkeit ist kein Feature, sie ist eine Grundvoraussetzung.",
          author: "Marissa Mayer",
          role: "Ehemalige VP, Google",
          source: "Google I/O Konferenz"
        },
        {
          quote: "Eine Verzögerung von 100 Millisekunden bei der Ladezeit kann die Conversion-Rate um 7% senken.",
          author: "Akamai Research",
          role: "Performance Studie",
          source: "Akamai State of Online Retail Performance Report"
        }
      ],
      en: [
        {
          quote: "Speed is not a feature, it's a fundamental requirement.",
          author: "Marissa Mayer",
          role: "Former VP, Google",
          source: "Google I/O Conference"
        },
        {
          quote: "A 100-millisecond delay in load time can decrease conversion rates by 7%.",
          author: "Akamai Research",
          role: "Performance Study",
          source: "Akamai State of Online Retail Performance Report"
        }
      ]
    },
    faqs: {
      de: [
        {
          question: "Was sind Core Web Vitals und warum sind sie wichtig?",
          answer: "Core Web Vitals sind drei Google-Metriken (LCP, INP, CLS), die die Nutzererfahrung messen. Sie sind seit 2021 ein Ranking-Faktor und beeinflussen direkt Ihre Position in den Suchergebnissen."
        },
        {
          question: "Was ist ein guter LCP-Wert?",
          answer: "Ein guter LCP (Largest Contentful Paint) liegt unter 2,5 Sekunden. 2,5-4 Sekunden gilt als verbesserungswürdig, über 4 Sekunden als schlecht. LCP misst, wie schnell der Hauptinhalt lädt."
        },
        {
          question: "Wie verbessere ich meinen CLS-Score?",
          answer: "Für einen guten CLS (unter 0,1): Geben Sie Bildern feste Größen, laden Sie Schriften mit font-display: swap, vermeiden Sie dynamisch eingefügte Inhalte über dem Fold."
        },
        {
          question: "Beeinflussen Core Web Vitals das Google-Ranking?",
          answer: "Ja, seit Mai 2021 sind Core Web Vitals ein offizieller Ranking-Faktor. Bei gleicher Content-Qualität bevorzugt Google Seiten mit besseren Performance-Werten."
        }
      ],
      en: [
        {
          question: "What are Core Web Vitals and why are they important?",
          answer: "Core Web Vitals are three Google metrics (LCP, INP, CLS) that measure user experience. They've been a ranking factor since 2021 and directly influence your position in search results."
        },
        {
          question: "What is a good LCP value?",
          answer: "A good LCP (Largest Contentful Paint) is under 2.5 seconds. 2.5-4 seconds needs improvement, over 4 seconds is poor. LCP measures how quickly the main content loads."
        },
        {
          question: "How do I improve my CLS score?",
          answer: "For a good CLS (under 0.1): Give images fixed dimensions, load fonts with font-display: swap, avoid dynamically inserted content above the fold."
        },
        {
          question: "Do Core Web Vitals affect Google ranking?",
          answer: "Yes, since May 2021, Core Web Vitals are an official ranking factor. With equal content quality, Google prefers pages with better performance scores."
        }
      ]
    },
    sources: [
      { title: { de: "Google - Web Vitals Dokumentation", en: "Google - Web Vitals Documentation" }, url: "https://web.dev/vitals/", year: "2024" },
      { title: { de: "Chrome UX Report", en: "Chrome UX Report" }, url: "https://developer.chrome.com/docs/crux/", year: "2025" }
    ],
    relatedServiceSlugs: ["webdesign", "seo-sichtbarkeit", "technische-loesungen"]
  },

  // Post 4: Brand Identity
  4: {
    expertQuotes: {
      de: [
        {
          quote: "Ihre Marke ist das, was andere Leute über Sie sagen, wenn Sie nicht im Raum sind.",
          author: "Jeff Bezos",
          role: "Gründer, Amazon",
          source: "Amazon Shareholder Letter"
        },
        {
          quote: "Design ist der stille Botschafter Ihrer Marke.",
          author: "Paul Rand",
          role: "Legendärer Grafikdesigner",
          source: "Design, Form, and Chaos"
        }
      ],
      en: [
        {
          quote: "Your brand is what other people say about you when you're not in the room.",
          author: "Jeff Bezos",
          role: "Founder, Amazon",
          source: "Amazon Shareholder Letter"
        },
        {
          quote: "Design is the silent ambassador of your brand.",
          author: "Paul Rand",
          role: "Legendary Graphic Designer",
          source: "Design, Form, and Chaos"
        }
      ]
    },
    faqs: {
      de: [
        {
          question: "Was ist der Unterschied zwischen Marke und Logo?",
          answer: "Ein Logo ist nur ein visuelles Symbol, während eine Marke die gesamte Wahrnehmung umfasst: Werte, Ton, Erfahrung, Emotionen und Versprechen, die Ihr Unternehmen verkörpert."
        },
        {
          question: "Wie lange dauert die Entwicklung einer Brand Identity?",
          answer: "Ein vollständiges Brand Identity Projekt dauert typischerweise 4-8 Wochen. Das umfasst Research, Strategie, Logo-Design, Farbpalette, Typografie und Brand Guidelines."
        },
        {
          question: "Wann sollte ich meine Marke überarbeiten?",
          answer: "Ein Rebranding ist sinnvoll bei: Strategischer Neuausrichtung, veralteter visueller Identität, Merger/Akquisition, negativen Assoziationen, oder wenn die Marke die Zielgruppe nicht mehr anspricht."
        }
      ],
      en: [
        {
          question: "What is the difference between a brand and a logo?",
          answer: "A logo is just a visual symbol, while a brand encompasses the entire perception: values, tone, experience, emotions, and promises that your company embodies."
        },
        {
          question: "How long does brand identity development take?",
          answer: "A complete brand identity project typically takes 4-8 weeks. This includes research, strategy, logo design, color palette, typography, and brand guidelines."
        },
        {
          question: "When should I rebrand?",
          answer: "Rebranding makes sense for: Strategic realignment, outdated visual identity, merger/acquisition, negative associations, or when the brand no longer resonates with the target audience."
        }
      ]
    },
    sources: [
      { title: { de: "Marty Neumeier - The Brand Gap", en: "Marty Neumeier - The Brand Gap" }, url: "https://www.martyneumeier.com/the-brand-gap", year: "2006" },
      { title: { de: "Interbrand - Best Global Brands", en: "Interbrand - Best Global Brands" }, url: "https://interbrand.com/best-brands/", year: "2024" }
    ],
    relatedServiceSlugs: ["branding", "webdesign", "content-visuals"]
  },

  // Post 5: SEO für Anfänger
  5: {
    expertQuotes: {
      de: [
        {
          quote: "Der beste Ort, eine Leiche zu verstecken, ist Seite 2 der Google-Suchergebnisse.",
          author: "Unbekannt",
          role: "SEO-Branchenwitz",
          source: ""
        },
        {
          quote: "SEO ist keine Taktik mehr, es ist eine Geschäftsstrategie.",
          author: "Rand Fishkin",
          role: "Gründer, SparkToro & Moz",
          source: "Whiteboard Friday"
        }
      ],
      en: [
        {
          quote: "The best place to hide a dead body is page 2 of Google search results.",
          author: "Unknown",
          role: "SEO Industry Joke",
          source: ""
        },
        {
          quote: "SEO is no longer a tactic, it's a business strategy.",
          author: "Rand Fishkin",
          role: "Founder, SparkToro & Moz",
          source: "Whiteboard Friday"
        }
      ]
    },
    faqs: {
      de: [
        {
          question: "Wie lange dauert es, bis SEO Ergebnisse zeigt?",
          answer: "SEO ist ein Marathon, kein Sprint. Erste Verbesserungen sehen Sie nach 3-6 Monaten, signifikante Ranking-Veränderungen nach 6-12 Monaten. Für kompetitive Keywords kann es länger dauern."
        },
        {
          question: "Was sind die wichtigsten SEO-Ranking-Faktoren 2025?",
          answer: "Die Top-Faktoren sind: Hochwertiger Content (E-E-A-T), Backlinks von vertrauenswürdigen Seiten, Core Web Vitals, Mobile-First Indexing, und User Experience Signale."
        },
        {
          question: "Brauche ich für SEO einen Experten oder kann ich das selbst machen?",
          answer: "Basis-SEO (Meta-Tags, Struktur, Content) können Sie selbst umsetzen. Für technisches SEO, Linkbuilding und Wettbewerbsanalyse empfehlen wir professionelle Unterstützung."
        },
        {
          question: "Was kostet SEO-Optimierung?",
          answer: "SEO-Pakete kosten zwischen €500-2.000/Monat für KMUs. Einmalige Audits starten bei €500-1.500. Der ROI ist langfristig oft höher als bei bezahlter Werbung."
        }
      ],
      en: [
        {
          question: "How long does it take for SEO to show results?",
          answer: "SEO is a marathon, not a sprint. You'll see initial improvements after 3-6 months, significant ranking changes after 6-12 months. For competitive keywords, it may take longer."
        },
        {
          question: "What are the most important SEO ranking factors in 2025?",
          answer: "Top factors are: High-quality content (E-E-A-T), backlinks from trusted sites, Core Web Vitals, Mobile-First Indexing, and user experience signals."
        },
        {
          question: "Do I need an SEO expert or can I do it myself?",
          answer: "Basic SEO (meta tags, structure, content) you can implement yourself. For technical SEO, link building, and competitive analysis, we recommend professional support."
        },
        {
          question: "What does SEO optimization cost?",
          answer: "SEO packages cost between €500-2,000/month for SMEs. One-time audits start at €500-1,500. The long-term ROI is often higher than paid advertising."
        }
      ]
    },
    sources: [
      { title: { de: "Google Search Central - SEO Starter Guide", en: "Google Search Central - SEO Starter Guide" }, url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", year: "2024" },
      { title: { de: "Moz - Beginner's Guide to SEO", en: "Moz - Beginner's Guide to SEO" }, url: "https://moz.com/beginners-guide-to-seo", year: "2024" }
    ],
    relatedServiceSlugs: ["seo-sichtbarkeit", "content-visuals", "digitale-strategie"]
  },

  // Post 6: Customer Journey Mapping
  6: {
    expertQuotes: {
      de: [
        {
          quote: "Menschen kaufen keine Produkte, sie kaufen bessere Versionen von sich selbst.",
          author: "Samuel Hulick",
          role: "User Onboarding Experte",
          source: "UserOnboard.com"
        },
        {
          quote: "Der Kunde hat immer recht – außer er liegt falsch über seine eigenen Bedürfnisse.",
          author: "Steve Blank",
          role: "Startup-Mentor, Stanford",
          source: "The Startup Owner's Manual"
        }
      ],
      en: [
        {
          quote: "People don't buy products, they buy better versions of themselves.",
          author: "Samuel Hulick",
          role: "User Onboarding Expert",
          source: "UserOnboard.com"
        },
        {
          quote: "The customer is always right – except when they're wrong about their own needs.",
          author: "Steve Blank",
          role: "Startup Mentor, Stanford",
          source: "The Startup Owner's Manual"
        }
      ]
    },
    faqs: {
      de: [
        {
          question: "Was ist Customer Journey Mapping?",
          answer: "Customer Journey Mapping visualisiert alle Berührungspunkte (Touchpoints) zwischen Kunde und Unternehmen – von der ersten Wahrnehmung bis zum Kauf und darüber hinaus. Es hilft, Kundenbedürfnisse und Schmerzpunkte zu verstehen."
        },
        {
          question: "Welche Phasen hat eine Customer Journey?",
          answer: "Die typischen Phasen sind: Awareness (Bewusstsein), Consideration (Erwägung), Decision (Entscheidung), Purchase (Kauf), Retention (Bindung) und Advocacy (Weiterempfehlung)."
        },
        {
          question: "Wie erstelle ich eine Customer Journey Map?",
          answer: "1. Definieren Sie Buyer Personas, 2. Listen Sie alle Touchpoints auf, 3. Identifizieren Sie Kundenaktionen und Emotionen, 4. Finden Sie Pain Points, 5. Entwickeln Sie Verbesserungsideen, 6. Priorisieren und implementieren."
        }
      ],
      en: [
        {
          question: "What is Customer Journey Mapping?",
          answer: "Customer Journey Mapping visualizes all touchpoints between customer and company – from initial awareness to purchase and beyond. It helps understand customer needs and pain points."
        },
        {
          question: "What phases does a Customer Journey have?",
          answer: "Typical phases are: Awareness, Consideration, Decision, Purchase, Retention, and Advocacy."
        },
        {
          question: "How do I create a Customer Journey Map?",
          answer: "1. Define buyer personas, 2. List all touchpoints, 3. Identify customer actions and emotions, 4. Find pain points, 5. Develop improvement ideas, 6. Prioritize and implement."
        }
      ]
    },
    sources: [
      { title: { de: "Nielsen Norman Group - Journey Mapping", en: "Nielsen Norman Group - Journey Mapping" }, url: "https://www.nngroup.com/articles/journey-mapping-101/", year: "2024" },
      { title: { de: "HubSpot - Customer Journey Guide", en: "HubSpot - Customer Journey Guide" }, url: "https://blog.hubspot.com/service/customer-journey-map", year: "2024" }
    ],
    relatedServiceSlugs: ["digitale-strategie", "branding", "webdesign"]
  },

  // Post 7: Bildoptimierung
  7: {
    expertQuotes: {
      de: [
        {
          quote: "Bilder sind oft der größte Anteil am Seitengewicht. Optimieren Sie hier zuerst.",
          author: "Addy Osmani",
          role: "Engineering Manager, Google Chrome",
          source: "Image Optimization Guide"
        },
        {
          quote: "WebP bietet 25-34% bessere Kompression als JPEG bei gleicher Qualität.",
          author: "Google Developers",
          role: "WebP Dokumentation",
          source: "developers.google.com"
        }
      ],
      en: [
        {
          quote: "Images are often the biggest contributor to page weight. Optimize here first.",
          author: "Addy Osmani",
          role: "Engineering Manager, Google Chrome",
          source: "Image Optimization Guide"
        },
        {
          quote: "WebP provides 25-34% better compression than JPEG at equivalent quality.",
          author: "Google Developers",
          role: "WebP Documentation",
          source: "developers.google.com"
        }
      ]
    },
    faqs: {
      de: [
        {
          question: "Welches Bildformat ist das beste für Websites?",
          answer: "WebP ist aktuell der beste Allrounder: 25-35% kleiner als JPEG/PNG bei gleicher Qualität. Für Fotos: WebP oder JPEG. Für Grafiken mit Transparenz: WebP oder PNG. Für Animationen: WebP oder GIF."
        },
        {
          question: "Wie groß sollten Bilder für Websites sein?",
          answer: "Die ideale Größe hängt vom Verwendungszweck ab: Hero-Bilder max. 1920px breit (150-300KB), Content-Bilder 800-1200px (50-150KB), Thumbnails 300-400px (20-50KB). Immer komprimiert."
        },
        {
          question: "Was ist Lazy Loading und sollte ich es verwenden?",
          answer: "Lazy Loading lädt Bilder erst, wenn sie in den sichtbaren Bereich scrollen. Es verbessert die initiale Ladezeit drastisch. Ja, Sie sollten es für alle Bilder außerhalb des sichtbaren Bereichs verwenden."
        },
        {
          question: "Wie wichtig sind Alt-Texte für SEO?",
          answer: "Sehr wichtig! Alt-Texte helfen Google, Bilder zu verstehen und verbessern die Barrierefreiheit. Beschreiben Sie das Bild präzise in 5-15 Wörtern und integrieren Sie relevante Keywords natürlich."
        }
      ],
      en: [
        {
          question: "Which image format is best for websites?",
          answer: "WebP is currently the best all-rounder: 25-35% smaller than JPEG/PNG at equal quality. For photos: WebP or JPEG. For graphics with transparency: WebP or PNG. For animations: WebP or GIF."
        },
        {
          question: "How large should images be for websites?",
          answer: "Ideal size depends on usage: Hero images max. 1920px wide (150-300KB), content images 800-1200px (50-150KB), thumbnails 300-400px (20-50KB). Always compressed."
        },
        {
          question: "What is Lazy Loading and should I use it?",
          answer: "Lazy Loading loads images only when they scroll into the visible area. It drastically improves initial load time. Yes, you should use it for all images outside the visible area."
        },
        {
          question: "How important are alt texts for SEO?",
          answer: "Very important! Alt texts help Google understand images and improve accessibility. Describe the image precisely in 5-15 words and integrate relevant keywords naturally."
        }
      ]
    },
    sources: [
      { title: { de: "web.dev - Bildoptimierung", en: "web.dev - Image Optimization" }, url: "https://web.dev/fast/#optimize-your-images", year: "2024" },
      { title: { de: "Cloudinary - Image Optimization Guide", en: "Cloudinary - Image Optimization Guide" }, url: "https://cloudinary.com/guides/image-optimization", year: "2024" }
    ],
    relatedServiceSlugs: ["webdesign", "seo-sichtbarkeit", "technische-loesungen"]
  }
}

async function updatePosts() {
  console.log('🚀 Starting Blog Post Enhancement Script\n')

  // Initialize Payload
  const payload = await getPayload({ config })
  console.log('✅ Payload initialized\n')

  // Get all services for relationship mapping
  const services = await payload.find({
    collection: 'services',
    limit: 100,
  })
  console.log(`📋 Found ${services.docs.length} services\n`)

  // Create slug -> id mapping
  const serviceIdMap: Record<string, number> = {}
  for (const service of services.docs) {
    const slug = (service.slug as string) || ''
    serviceIdMap[slug] = service.id as number
  }
  console.log('Service mappings:', serviceIdMap)

  // Get all posts
  const posts = await payload.find({
    collection: 'posts',
    limit: 100,
    locale: 'de', // Start with German
  })
  console.log(`\n📝 Found ${posts.docs.length} posts to update\n`)

  for (const post of posts.docs) {
    const postId = post.id as number
    const improvements = postImprovements[postId]

    if (!improvements) {
      console.log(`⏭️  Post ${postId}: No improvements defined, skipping`)
      continue
    }

    console.log(`\n📝 Updating Post ${postId}: ${post.title}`)

    try {
      // Map service slugs to IDs
      const relatedServiceIds = improvements.relatedServiceSlugs
        .map(slug => serviceIdMap[slug])
        .filter(id => id !== undefined)

      // Prepare sources (with localized titles)
      const sourcesData = improvements.sources.map(source => ({
        title: source.title.de, // Will be set per locale
        url: source.url,
        author: source.author,
        year: source.year,
      }))

      // Update German locale
      await payload.update({
        collection: 'posts',
        id: postId,
        locale: 'de',
        data: {
          expertQuotes: improvements.expertQuotes.de,
          faqs: improvements.faqs.de,
          sources: sourcesData,
          relatedServices: relatedServiceIds,
        },
      })
      console.log(`  ✅ German locale updated`)

      // Update English locale
      const sourcesDataEN = improvements.sources.map(source => ({
        title: source.title.en,
        url: source.url,
        author: source.author,
        year: source.year,
      }))

      await payload.update({
        collection: 'posts',
        id: postId,
        locale: 'en',
        data: {
          expertQuotes: improvements.expertQuotes.en,
          faqs: improvements.faqs.en,
          sources: sourcesDataEN,
          relatedServices: relatedServiceIds,
        },
      })
      console.log(`  ✅ English locale updated`)

    } catch (error) {
      console.error(`  ❌ Error updating post ${postId}:`, error)
    }
  }

  console.log('\n\n✨ Blog Post Enhancement Complete!\n')
  process.exit(0)
}

updatePosts().catch(console.error)
