import { getPayload } from 'payload'
import config from '../src/payload/payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding GoldenWing CMS...')

  // ─── Site Settings ───
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: 'GoldenWing Creative Studios',
      contact: {
        address: 'Neubaugasse 25/3\n1070 Wien\nÖsterreich',
        phone: '+43 1 234 5678',
        email: 'hello@goldenwing.at',
      },
      social: {
        instagram: 'https://instagram.com/goldenwing.at',
        linkedin: 'https://linkedin.com/company/goldenwing-creative-studios',
      },
      analyticsId: '',
    },
  })
  console.log('✓ Site Settings')

  // ─── Navigation ───
  await payload.updateGlobal({
    slug: 'navigation',
    locale: 'de',
    data: {
      mainMenu: [
        { label: 'Services', link: '/de/services', children: [] },
        { label: 'Referenzen', link: '/de/referenzen', children: [] },
        { label: 'Blog', link: '/de/blog', children: [] },
        { label: 'Über uns', link: '/de/ueber-uns', children: [] },
        { label: 'Kontakt', link: '/de/kontakt', children: [] },
      ],
      ctaButton: { label: 'Projekt starten', link: '/de/kontakt' },
    },
  })
  await payload.updateGlobal({
    slug: 'navigation',
    locale: 'en',
    data: {
      mainMenu: [
        { label: 'Services', link: '/en/services', children: [] },
        { label: 'Portfolio', link: '/en/referenzen', children: [] },
        { label: 'Blog', link: '/en/blog', children: [] },
        { label: 'About', link: '/en/ueber-uns', children: [] },
        { label: 'Contact', link: '/en/kontakt', children: [] },
      ],
      ctaButton: { label: 'Start Project', link: '/en/kontakt' },
    },
  })
  console.log('✓ Navigation')

  // ─── Footer ───
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'de',
    data: {
      columns: [
        {
          heading: 'Services',
          links: [
            { label: 'Webdesign & Entwicklung', link: '/de/services/webdesign-entwicklung' },
            { label: 'SEO & Online Marketing', link: '/de/services/seo-online-marketing' },
            { label: 'Branding & Corporate Design', link: '/de/services/branding-corporate-design' },
            { label: 'Content Marketing', link: '/de/services/content-marketing' },
          ],
        },
        {
          heading: 'Unternehmen',
          links: [
            { label: 'Über uns', link: '/de/ueber-uns' },
            { label: 'Referenzen', link: '/de/referenzen' },
            { label: 'Blog', link: '/de/blog' },
            { label: 'Kontakt', link: '/de/kontakt' },
          ],
        },
      ],
      copyright: '© {year} GoldenWing Creative Studios. Alle Rechte vorbehalten.',
      legalLinks: [
        { label: 'Impressum', link: '/de/impressum' },
        { label: 'Datenschutz', link: '/de/datenschutz' },
        { label: 'AGB', link: '/de/agb' },
      ],
    },
  })
  console.log('✓ Footer')

  // ─── Pages ───
  const heroBlock = (heading: string, subheading: string, ctaLabel: string, ctaLink: string) => ({
    blockType: 'hero',
    heading,
    subheading,
    style: 'fullscreen' as const,
    ctaLabel,
    ctaLink,
  })

  // Homepage
  const homepage = await payload.create({
    collection: 'pages',
    locale: 'de',
    data: {
      title: 'Startseite',
      slug: 'home',
      layout: [
        heroBlock(
          'Ihre Marke. Digital transformiert.',
          'GoldenWing Creative Studios — Marketing, Branding & Webentwicklung aus Wien.',
          'Jetzt Beratung anfragen',
          '/de/kontakt',
        ),
        {
          blockType: 'feature-grid',
          heading: 'Unsere Leistungen',
          features: [
            { title: 'Webdesign & Entwicklung', description: 'Moderne, performante Websites mit Next.js und Headless CMS.', icon: 'monitor' },
            { title: 'SEO & Online Marketing', description: 'Mehr Sichtbarkeit durch datengetriebene SEO-Strategien.', icon: 'search' },
            { title: 'Branding & Corporate Design', description: 'Einzigartige Markenidentitäten, die im Gedächtnis bleiben.', icon: 'palette' },
            { title: 'Content Marketing', description: 'Inhalte, die Ihre Zielgruppe erreichen und überzeugen.', icon: 'file-text' },
          ],
        },
        {
          blockType: 'stats',
          stats: [
            { value: '50+', label: 'Projekte abgeschlossen' },
            { value: '98%', label: 'Kundenzufriedenheit' },
            { value: '5+', label: 'Jahre Erfahrung' },
            { value: '3', label: 'Sprachen' },
          ],
        },
        {
          blockType: 'cta',
          heading: 'Bereit für Ihr nächstes Projekt?',
          text: 'Lassen Sie uns gemeinsam etwas Großartiges schaffen.',
          buttonLabel: 'Kontakt aufnehmen',
          buttonLink: '/de/kontakt',
          style: 'dark',
        },
      ],
    },
  })
  console.log('✓ Homepage (DE)')

  await payload.update({
    collection: 'pages',
    id: homepage.id,
    locale: 'en',
    data: {
      title: 'Home',
      layout: [
        heroBlock(
          'Your Brand. Digitally Transformed.',
          'GoldenWing Creative Studios — Marketing, Branding & Web Development from Vienna.',
          'Get a Free Consultation',
          '/en/kontakt',
        ),
        {
          blockType: 'feature-grid',
          heading: 'Our Services',
          features: [
            { title: 'Web Design & Development', description: 'Modern, high-performance websites with Next.js and Headless CMS.', icon: 'monitor' },
            { title: 'SEO & Online Marketing', description: 'More visibility through data-driven SEO strategies.', icon: 'search' },
            { title: 'Branding & Corporate Design', description: 'Unique brand identities that stick in people\'s minds.', icon: 'palette' },
            { title: 'Content Marketing', description: 'Content that reaches and convinces your target audience.', icon: 'file-text' },
          ],
        },
        {
          blockType: 'stats',
          stats: [
            { value: '50+', label: 'Projects completed' },
            { value: '98%', label: 'Client satisfaction' },
            { value: '5+', label: 'Years experience' },
            { value: '3', label: 'Languages' },
          ],
        },
        {
          blockType: 'cta',
          heading: 'Ready for your next project?',
          text: 'Let\'s create something great together.',
          buttonLabel: 'Get in Touch',
          buttonLink: '/en/kontakt',
          style: 'dark',
        },
      ],
    },
  })
  console.log('✓ Homepage (EN)')

  // Impressum
  const impressum = await payload.create({
    collection: 'pages',
    locale: 'de',
    data: {
      title: 'Impressum',
      slug: 'impressum',
      layout: [
        {
          blockType: 'image-text',
          heading: 'Impressum',
          text: {
            root: {
              type: 'root',
              children: [
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Angaben gemäß § 5 ECG' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'GoldenWing Creative Studios\nNeubaugasse 25/3\n1070 Wien\nÖsterreich' }] },
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Kontakt' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'Telefon: +43 1 234 5678\nE-Mail: hello@goldenwing.at' }] },
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Unternehmensgegenstand' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'Marketing, Branding und Webentwicklung' }] },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          layout: 'textOnly',
        },
      ],
    },
  })
  console.log('✓ Impressum')

  // Datenschutz
  const datenschutz = await payload.create({
    collection: 'pages',
    locale: 'de',
    data: {
      title: 'Datenschutzerklärung',
      slug: 'datenschutz',
      layout: [
        {
          blockType: 'image-text',
          heading: 'Datenschutzerklärung',
          text: {
            root: {
              type: 'root',
              children: [
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '1. Datenschutz auf einen Blick' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.' }] },
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '2. Verantwortliche Stelle' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'GoldenWing Creative Studios\nNeubaugasse 25/3\n1070 Wien\nÖsterreich\nE-Mail: datenschutz@goldenwing.at' }] },
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '3. Datenerfassung auf dieser Website' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten können Sie dem Impressum dieser Website entnehmen.' }] },
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '4. Hosting' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'Wir hosten die Inhalte unserer Website bei Hostinger. Anbieter ist die Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Zypern.' }] },
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '5. Ihre Rechte' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.' }] },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          layout: 'textOnly',
        },
      ],
    },
  })
  console.log('✓ Datenschutz')

  // AGB
  await payload.create({
    collection: 'pages',
    locale: 'de',
    data: {
      title: 'Allgemeine Geschäftsbedingungen',
      slug: 'agb',
      layout: [
        {
          blockType: 'image-text',
          heading: 'Allgemeine Geschäftsbedingungen',
          text: {
            root: {
              type: 'root',
              children: [
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '1. Geltungsbereich' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen GoldenWing Creative Studios und dem Auftraggeber.' }] },
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '2. Leistungsumfang' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'Der Umfang der zu erbringenden Leistungen ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung.' }] },
                { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '3. Vergütung' }] },
                { type: 'paragraph', children: [{ type: 'text', text: 'Die Vergütung richtet sich nach dem vereinbarten Angebot. Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer.' }] },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          layout: 'textOnly',
        },
      ],
    },
  })
  console.log('✓ AGB')

  // ─── Services ───
  const services = [
    {
      de: { title: 'Webdesign & Entwicklung', excerpt: 'Moderne, blitzschnelle Websites mit Next.js, Headless CMS und responsivem Design.' },
      en: { title: 'Web Design & Development', excerpt: 'Modern, lightning-fast websites with Next.js, Headless CMS and responsive design.' },
      slug: 'webdesign-entwicklung',
      icon: 'monitor',
      category: 'web-development' as const,
      features_de: [
        { title: 'Next.js & React', description: 'Server-Side Rendering für optimale Performance und SEO.' },
        { title: 'Headless CMS', description: 'Payload CMS für flexible, mehrsprachige Content-Verwaltung.' },
        { title: 'Responsive Design', description: 'Perfekte Darstellung auf allen Geräten — Mobil, Tablet, Desktop.' },
        { title: 'Performance-Optimierung', description: 'Core Web Vitals im grünen Bereich für bessere Rankings.' },
      ],
      features_en: [
        { title: 'Next.js & React', description: 'Server-side rendering for optimal performance and SEO.' },
        { title: 'Headless CMS', description: 'Payload CMS for flexible, multilingual content management.' },
        { title: 'Responsive Design', description: 'Perfect display on all devices — Mobile, Tablet, Desktop.' },
        { title: 'Performance Optimization', description: 'Core Web Vitals in the green zone for better rankings.' },
      ],
    },
    {
      de: { title: 'SEO & Online Marketing', excerpt: 'Datengetriebene SEO-Strategien für nachhaltige Sichtbarkeit in Suchmaschinen und KI-Suche.' },
      en: { title: 'SEO & Online Marketing', excerpt: 'Data-driven SEO strategies for sustainable visibility in search engines and AI search.' },
      slug: 'seo-online-marketing',
      icon: 'search',
      category: 'seo' as const,
      features_de: [
        { title: 'Technical SEO', description: 'Schema Markup, Core Web Vitals, Crawl-Optimierung.' },
        { title: 'Content-Strategie', description: 'Keyword-Research und Content-Planung für Ihre Zielgruppe.' },
        { title: 'Local SEO', description: 'Google Business Profile und lokale Rankings für Wien und Österreich.' },
        { title: 'GEO & AEO', description: 'Optimierung für KI-gestützte Suche — ChatGPT, Perplexity, Google SGE.' },
      ],
      features_en: [
        { title: 'Technical SEO', description: 'Schema markup, Core Web Vitals, crawl optimization.' },
        { title: 'Content Strategy', description: 'Keyword research and content planning for your audience.' },
        { title: 'Local SEO', description: 'Google Business Profile and local rankings for Vienna and Austria.' },
        { title: 'GEO & AEO', description: 'Optimization for AI-powered search — ChatGPT, Perplexity, Google SGE.' },
      ],
    },
    {
      de: { title: 'Branding & Corporate Design', excerpt: 'Einzigartige Markenidentitäten, die Vertrauen schaffen und im Gedächtnis bleiben.' },
      en: { title: 'Branding & Corporate Design', excerpt: 'Unique brand identities that build trust and stick in people\'s minds.' },
      slug: 'branding-corporate-design',
      icon: 'palette',
      category: 'branding' as const,
      features_de: [
        { title: 'Logo-Design', description: 'Unverwechselbare Logos, die Ihre Marke repräsentieren.' },
        { title: 'Corporate Identity', description: 'Farbpalette, Typografie und Designsystem aus einem Guss.' },
        { title: 'Brand Guidelines', description: 'Umfassende Markenrichtlinien für konsistente Kommunikation.' },
        { title: 'Print & Digital', description: 'Visitenkarten, Briefpapier, Social-Media-Templates.' },
      ],
      features_en: [
        { title: 'Logo Design', description: 'Distinctive logos that represent your brand.' },
        { title: 'Corporate Identity', description: 'Color palette, typography and design system all in one.' },
        { title: 'Brand Guidelines', description: 'Comprehensive brand guidelines for consistent communication.' },
        { title: 'Print & Digital', description: 'Business cards, stationery, social media templates.' },
      ],
    },
    {
      de: { title: 'Content Marketing', excerpt: 'Strategische Inhalte, die Ihre Zielgruppe ansprechen, informieren und konvertieren.' },
      en: { title: 'Content Marketing', excerpt: 'Strategic content that engages, informs and converts your target audience.' },
      slug: 'content-marketing',
      icon: 'file-text',
      category: 'marketing' as const,
      features_de: [
        { title: 'Blog & Artikel', description: 'SEO-optimierte Fachbeiträge für Ihre Branche.' },
        { title: 'Social Media', description: 'Content-Planung und Erstellung für alle Plattformen.' },
        { title: 'E-Mail Marketing', description: 'Newsletter-Strategien mit hohen Öffnungsraten.' },
        { title: 'Video & Multimedia', description: 'Professionelle Video-Produktion und Animationen.' },
      ],
      features_en: [
        { title: 'Blog & Articles', description: 'SEO-optimized expert articles for your industry.' },
        { title: 'Social Media', description: 'Content planning and creation for all platforms.' },
        { title: 'Email Marketing', description: 'Newsletter strategies with high open rates.' },
        { title: 'Video & Multimedia', description: 'Professional video production and animations.' },
      ],
    },
  ]

  for (let i = 0; i < services.length; i++) {
    const s = services[i]
    const created = await payload.create({
      collection: 'services',
      locale: 'de',
      data: {
        title: s.de.title,
        slug: s.slug,
        excerpt: s.de.excerpt,
        icon: s.icon,
        category: s.category,
        order: i + 1,
        features: s.features_de,
      },
    })
    await payload.update({
      collection: 'services',
      id: created.id,
      locale: 'en',
      data: {
        title: s.en.title,
        excerpt: s.en.excerpt,
        features: s.features_en,
      },
    })
    console.log(`✓ Service: ${s.de.title}`)
  }

  // ─── Blog Posts ───
  const posts = [
    {
      de: {
        title: 'Warum Next.js 15 die Zukunft der Webentwicklung ist',
        excerpt: 'Next.js 15 bringt Server Components, verbesserte Performance und neue Features. Erfahren Sie, warum wir bei GoldenWing auf Next.js setzen.',
      },
      en: {
        title: 'Why Next.js 15 is the Future of Web Development',
        excerpt: 'Next.js 15 brings Server Components, improved performance and new features. Learn why we at GoldenWing rely on Next.js.',
      },
      slug: 'next-js-15-zukunft-webentwicklung',
      category: 'web' as const,
      tags: [{ tag: 'Next.js' }, { tag: 'React' }, { tag: 'Webentwicklung' }],
    },
    {
      de: {
        title: 'SEO 2026: Die wichtigsten Trends für Unternehmen',
        excerpt: 'Von GEO über E-E-A-T bis hin zu KI-Suche — diese SEO-Trends sollten Sie 2026 kennen.',
      },
      en: {
        title: 'SEO 2026: The Most Important Trends for Businesses',
        excerpt: 'From GEO to E-E-A-T to AI search — these are the SEO trends you need to know in 2026.',
      },
      slug: 'seo-2026-trends-unternehmen',
      category: 'seo' as const,
      tags: [{ tag: 'SEO' }, { tag: 'GEO' }, { tag: 'KI-Suche' }],
    },
    {
      de: {
        title: 'Headless CMS vs. WordPress: Was passt besser?',
        excerpt: 'Ein Vergleich zwischen Headless CMS (Payload) und WordPress für moderne Webprojekte.',
      },
      en: {
        title: 'Headless CMS vs. WordPress: Which Fits Better?',
        excerpt: 'A comparison between Headless CMS (Payload) and WordPress for modern web projects.',
      },
      slug: 'headless-cms-vs-wordpress',
      category: 'tech' as const,
      tags: [{ tag: 'CMS' }, { tag: 'Payload' }, { tag: 'WordPress' }],
    },
  ]

  for (const p of posts) {
    const created = await payload.create({
      collection: 'posts',
      locale: 'de',
      data: {
        title: p.de.title,
        slug: p.slug,
        excerpt: p.de.excerpt,
        category: p.category,
        tags: p.tags,
        publishedDate: new Date().toISOString(),
        _status: 'published',
      },
    })
    await payload.update({
      collection: 'posts',
      id: created.id,
      locale: 'en',
      data: {
        title: p.en.title,
        excerpt: p.en.excerpt,
      },
    })
    console.log(`✓ Post: ${p.de.title}`)
  }

  // ─── Team ───
  const team = [
    { name: 'Deni Khachukaev', role_de: 'Gründer & Creative Director', role_en: 'Founder & Creative Director', bio_de: 'Deni vereint strategisches Marketing-Know-how mit technischer Expertise. Mit über 5 Jahren Erfahrung im digitalen Marketing leitet er das Team von GoldenWing.', bio_en: 'Deni combines strategic marketing know-how with technical expertise. With over 5 years of experience in digital marketing, he leads the GoldenWing team.', sortOrder: 1 },
  ]

  for (const t of team) {
    const created = await payload.create({
      collection: 'team',
      locale: 'de',
      data: {
        name: t.name,
        role: t.role_de,
        bio: t.bio_de,
        sortOrder: t.sortOrder,
        socialLinks: [
          { platform: 'linkedin', url: 'https://linkedin.com/in/deni-khachukaev' },
          { platform: 'instagram', url: 'https://instagram.com/goldenwing.at' },
        ],
      },
    })
    await payload.update({
      collection: 'team',
      id: created.id,
      locale: 'en',
      data: {
        role: t.role_en,
        bio: t.bio_en,
      },
    })
    console.log(`✓ Team: ${t.name}`)
  }

  // ─── Testimonials ───
  const testimonials = [
    {
      de: { quote: 'GoldenWing hat unsere Website komplett neu gestaltet. Die Performance ist hervorragend und unser SEO-Ranking hat sich deutlich verbessert.' },
      en: { quote: 'GoldenWing completely redesigned our website. The performance is excellent and our SEO ranking has improved significantly.' },
      author: 'Thomas M.',
      company: 'Tech-Startup Wien',
      role_de: 'Geschäftsführer',
      role_en: 'CEO',
      rating: 5,
    },
    {
      de: { quote: 'Professionell, kreativ und immer erreichbar. Das Branding-Paket hat unsere Marke auf ein neues Level gehoben.' },
      en: { quote: 'Professional, creative and always available. The branding package has taken our brand to a new level.' },
      author: 'Sarah K.',
      company: 'Boutique Hotel Salzburg',
      role_de: 'Marketing Managerin',
      role_en: 'Marketing Manager',
      rating: 5,
    },
    {
      de: { quote: 'Dank der SEO-Optimierung durch GoldenWing haben wir unseren organischen Traffic in 6 Monaten verdreifacht.' },
      en: { quote: 'Thanks to SEO optimization by GoldenWing, we tripled our organic traffic in 6 months.' },
      author: 'Michael R.',
      company: 'E-Commerce Plattform',
      role_de: 'Head of Digital',
      role_en: 'Head of Digital',
      rating: 5,
    },
  ]

  for (const t of testimonials) {
    const created = await payload.create({
      collection: 'testimonials',
      locale: 'de',
      data: {
        quote: t.de.quote,
        author: t.author,
        company: t.company,
        role: t.role_de,
        rating: t.rating,
      },
    })
    await payload.update({
      collection: 'testimonials',
      id: created.id,
      locale: 'en',
      data: {
        quote: t.en.quote,
        role: t.role_en,
      },
    })
    console.log(`✓ Testimonial: ${t.author}`)
  }

  console.log('\n✅ Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
