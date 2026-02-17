import { getPayload } from 'payload'
import config from '@payload-config'

const teamMembers = [
  {
    name: 'Deni Khachukaev',
    role: 'Gründer & Creative Director',
    bio: 'Mit über 5 Jahren Erfahrung in der digitalen Branche leitet Deni die strategische und kreative Ausrichtung von GoldenWing. Seine Leidenschaft: Marken zu schaffen, die nicht nur gut aussehen, sondern auch Ergebnisse liefern.',
    email: 'deni@goldenwing.at',
    social: {
      linkedin: 'https://www.linkedin.com/in/deni-khachukaev/',
      instagram: 'https://www.instagram.com/goldenwing.at',
    },
    featured: true,
    order: 1,
  },
  {
    name: 'Maria Schmidt',
    role: 'UX/UI Designerin',
    bio: 'Maria verwandelt komplexe Anforderungen in intuitive Nutzererlebnisse. Ihr Fokus liegt auf user-centered Design und barrierefreien Interfaces.',
    social: {
      linkedin: 'https://www.linkedin.com/in/maria-schmidt/',
    },
    featured: true,
    order: 2,
  },
  {
    name: 'Thomas Weber',
    role: 'Full-Stack Entwickler',
    bio: 'Thomas ist Experte für moderne Web-Technologien wie Next.js, React und Node.js. Er sorgt dafür, dass unsere Projekte technisch auf dem neuesten Stand sind.',
    social: {
      github: 'https://github.com/thomasweber',
      linkedin: 'https://www.linkedin.com/in/thomas-weber-dev/',
    },
    featured: true,
    order: 3,
  },
  {
    name: 'Sarah Müller',
    role: 'SEO & Content Strategin',
    bio: 'Sarah entwickelt Content-Strategien, die Rankings verbessern und Zielgruppen ansprechen. Ihr datengetriebener Ansatz sorgt für messbare Ergebnisse.',
    social: {
      linkedin: 'https://www.linkedin.com/in/sarah-mueller-seo/',
    },
    featured: false,
    order: 4,
  },
]

const projects = [
  {
    title: 'TechStart GmbH - Corporate Website',
    slug: 'techstart-corporate-website',
    client: 'TechStart GmbH',
    category: 'webdesign',
    year: 2024,
    description: 'Komplettes Redesign der Corporate Website mit Fokus auf Lead-Generierung und modernem Design. Die neue Website steigerte die Anfragen um 150%.',
    challenge: 'TechStart hatte eine veraltete Website, die weder mobil optimiert war noch ihre innovative Unternehmenskultur widerspiegelte. Die Conversion-Rate lag bei unter 1%.',
    solution: 'Wir entwickelten eine moderne, responsive Website mit Next.js und Headless CMS. Klare CTAs, optimierte Ladezeiten und ein frisches Design transformierten die Online-Präsenz.',
    tags: [{ tag: 'Webdesign' }, { tag: 'Next.js' }, { tag: 'Headless CMS' }],
    services: [{ service: 'UX/UI Design' }, { service: 'Entwicklung' }, { service: 'SEO' }],
    results: [
      { metric: '+150%', label: 'Mehr Anfragen' },
      { metric: '2.5s', label: 'Ladezeit' },
      { metric: '+85%', label: 'Mobile Traffic' },
    ],
    featured: true,
    order: 1,
  },
  {
    title: 'Boutique Hotel Wien - Brand Identity',
    slug: 'boutique-hotel-wien-branding',
    client: 'Boutique Hotel Wien',
    category: 'branding',
    year: 2024,
    description: 'Entwicklung einer vollständigen Brand Identity für ein neues Boutique Hotel in der Wiener Innenstadt.',
    challenge: 'Das Hotel brauchte eine unverwechselbare Markenidentität, die Eleganz und Wiener Charme vereint und sich von internationalen Hotelketten abhebt.',
    solution: 'Wir entwickelten eine zeitlose Brand Identity mit Logo, Farbpalette, Typografie und Brand Guidelines. Das Design verbindet klassische Wiener Ästhetik mit modernem Minimalismus.',
    tags: [{ tag: 'Branding' }, { tag: 'Logo Design' }, { tag: 'Corporate Identity' }],
    services: [{ service: 'Markenstrategie' }, { service: 'Logo Design' }, { service: 'Brand Guidelines' }],
    results: [
      { metric: '100%', label: 'Markenkonformität' },
      { metric: '50+', label: 'Brand Assets' },
      { metric: '4.8', label: 'Kundenbewertung' },
    ],
    featured: true,
    order: 2,
  },
  {
    title: 'BioMarkt Wien - E-Commerce Shop',
    slug: 'biomarkt-wien-ecommerce',
    client: 'BioMarkt Wien',
    category: 'webdesign',
    year: 2023,
    description: 'Entwicklung eines WooCommerce-Webshops für einen lokalen Bio-Supermarkt mit Online-Bestellung und Lieferservice.',
    challenge: 'Der Bio-Markt wollte in den Online-Handel einsteigen, hatte aber keine Erfahrung mit E-Commerce und benötigte eine benutzerfreundliche Lösung.',
    solution: 'Wir entwickelten einen WooCommerce-Shop mit lokalem Lieferservice-Integration, automatischer Lagerverwaltung und einfachem Backend für das Team.',
    tags: [{ tag: 'E-Commerce' }, { tag: 'WooCommerce' }, { tag: 'WordPress' }],
    services: [{ service: 'Shop-Design' }, { service: 'WooCommerce' }, { service: 'SEO' }],
    results: [
      { metric: '+200%', label: 'Online-Umsatz' },
      { metric: '500+', label: 'Produkte' },
      { metric: '4.9', label: 'Shop-Bewertung' },
    ],
    featured: true,
    order: 3,
  },
  {
    title: 'FitLife Wien - SEO Kampagne',
    slug: 'fitlife-wien-seo',
    client: 'FitLife Wien',
    category: 'seo',
    year: 2024,
    description: 'Umfassende SEO-Optimierung für ein Fitnessstudio in Wien mit Fokus auf Local SEO.',
    challenge: 'FitLife war online kaum sichtbar und verlor potenzielle Kunden an Mitbewerber, die besser rankten.',
    solution: 'Wir implementierten eine Local SEO Strategie mit Google My Business Optimierung, technischem SEO und Content-Marketing.',
    tags: [{ tag: 'SEO' }, { tag: 'Local SEO' }, { tag: 'Content Marketing' }],
    services: [{ service: 'SEO Audit' }, { service: 'Local SEO' }, { service: 'Content' }],
    results: [
      { metric: '#1', label: 'Google Ranking' },
      { metric: '+300%', label: 'Organischer Traffic' },
      { metric: '+180%', label: 'Anfragen' },
    ],
    featured: false,
    order: 4,
  },
  {
    title: 'FinTech Vienna - SaaS Dashboard',
    slug: 'fintech-vienna-saas',
    client: 'FinTech Vienna',
    category: 'software',
    year: 2024,
    description: 'Entwicklung eines modernen SaaS-Dashboards für Finanzanalysen mit React und Node.js.',
    challenge: 'Das FinTech-Startup benötigte ein benutzerfreundliches Dashboard zur Visualisierung komplexer Finanzdaten.',
    solution: 'Wir entwickelten eine React-basierte Web-Application mit Echtzeit-Datenvisualisierung, intuitiver UX und sicherer API-Integration.',
    tags: [{ tag: 'SaaS' }, { tag: 'React' }, { tag: 'Dashboard' }],
    services: [{ service: 'UX/UI Design' }, { service: 'Frontend Entwicklung' }, { service: 'Backend API' }],
    results: [
      { metric: '10k+', label: 'Aktive User' },
      { metric: '99.9%', label: 'Uptime' },
      { metric: '4.7', label: 'App Store Rating' },
    ],
    featured: true,
    order: 5,
  },
]

async function seed() {
  console.log('Starting team & projects seed...')
  console.log('⚠️  HINWEIS: Existierende Einträge werden AKTUALISIERT, nicht gelöscht!')
  console.log('   → Bilder und CMS-Änderungen bleiben erhalten.\n')

  const payload = await getPayload({ config })

  // Find existing team members (DO NOT DELETE - preserve images!)
  console.log('Finding existing team members...')
  const existingTeam = await payload.find({ collection: 'team-members', limit: 100 })
  const existingTeamByName = new Map(
    existingTeam.docs.map((doc) => [doc.name, doc])
  )

  // Find existing projects (DO NOT DELETE - preserve images!)
  console.log('Finding existing projects...')
  const existingProjects = await payload.find({ collection: 'projects', limit: 100 })
  const existingProjectsBySlug = new Map(
    existingProjects.docs.map((doc) => [doc.slug, doc])
  )

  // Create or update team members
  console.log('Processing team members...')
  for (const member of teamMembers) {
    const existingMember = existingTeamByName.get(member.name)

    if (existingMember) {
      // UPDATE existing - preserve image!
      await payload.update({
        collection: 'team-members',
        id: existingMember.id,
        data: {
          ...member,
          // WICHTIG: Behalte existierende Bilder bei!
          image: existingMember.image,
        },
      })
      console.log(`  🔄 Updated: ${member.name} (Bild beibehalten)`)
    } else {
      // CREATE new
      await payload.create({
        collection: 'team-members',
        data: member,
      })
      console.log(`  ✅ Created: ${member.name}`)
    }
  }

  // Create or update projects
  console.log('Processing projects...')
  for (const project of projects) {
    const existingProject = existingProjectsBySlug.get(project.slug)

    if (existingProject) {
      // UPDATE existing - preserve images!
      await payload.update({
        collection: 'projects',
        id: existingProject.id,
        data: {
          ...project,
          // WICHTIG: Behalte existierende Bilder bei!
          main_image: existingProject.main_image,
          gallery: existingProject.gallery,
        },
      })
      console.log(`  🔄 Updated: ${project.title} (Bilder beibehalten)`)
    } else {
      // CREATE new
      await payload.create({
        collection: 'projects',
        data: project,
      })
      console.log(`  ✅ Created: ${project.title}`)
    }
  }

  console.log('\n✨ Team & projects seed completed!')
  console.log('💡 Tipp: Bilder über /admin hochladen.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed error:', error)
  process.exit(1)
})
