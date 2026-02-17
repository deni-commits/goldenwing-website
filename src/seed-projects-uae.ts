/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * UAE Case Studies Seed Script
 *
 * Creates UAE-focused project case studies for the GoldenWing portfolio.
 * These showcase work done for clients in Dubai, Abu Dhabi, and Sharjah.
 *
 * Run with: npx tsx src/scripts/seed-projects-uae.ts
 */

import { getPayload } from 'payload'
import config from '../../payload.config'

const uaeProjects = [
  {
    title: 'Emirates Luxury Properties - Digital Transformation',
    slug: 'emirates-luxury-properties',
    client: 'Emirates Luxury Properties',
    category: 'webdesign',
    year: 2024,
    description: 'Vom lokalen Immobilienbüro zum digitalen Marktführer im Dubai Luxury Real Estate: Wie wir einen Premium-Makler mit zweisprachiger Website, Virtual Tours und SEO-Dominanz in die digitale Champions League katapultiert haben.',
    challenge: 'Emirates Luxury Properties verfügte über ein beeindruckendes Portfolio an Luxusimmobilien in Dubai Marina, Palm Jumeirah und Downtown Dubai – aber online war davon kaum etwas zu sehen. Die veraltete Website war weder mobiloptimiert noch RTL-fähig für arabische Kunden. In einem Markt, wo 90% der Immobiliensuchen online beginnen, war das ein existenzielles Problem.',
    solution: 'Wir entwickelten eine vollständig zweisprachige (EN/AR) Immobilienplattform mit RTL-Support, integrierten 360°-Virtual-Tours und einer fortschrittlichen Filtersuche. Das SEO-Konzept zielte auf hochkompetitive Keywords wie "luxury villa Dubai" und "Palm Jumeirah apartments". Die Google Ads Kampagne wurde kulturell für den GCC-Markt optimiert. Das Ergebnis: Ein digitales Schaufenster, das rund um die Uhr Millionen-Deals anbahnt.',
    services: [
      { service: 'Bilingual Website (EN/AR)' },
      { service: 'Real Estate Platform Development' },
      { service: 'Virtual Tour Integration' },
      { service: 'UAE SEO Optimization' },
      { service: 'Google Ads UAE' },
    ],
    tags: [
      { tag: 'Dubai Real Estate' },
      { tag: 'Luxury Property' },
      { tag: 'RTL Website' },
      { tag: 'UAE SEO' },
      { tag: 'Virtual Tours' },
    ],
    results: [
      { metric: '+320%', label: 'Qualified Property Inquiries' },
      { metric: 'Page 1', label: 'Google.ae Rankings' },
      { metric: '45%', label: 'International Buyers' },
    ],
    featured: true,
    order: 10,
  },
  {
    title: 'Khalifa Fintech - Corporate Branding',
    slug: 'khalifa-fintech',
    client: 'Khalifa Fintech Solutions',
    category: 'branding',
    year: 2024,
    description: 'Fintech-Startup aus Abu Dhabi erobert den GCC-Markt: Wie wir einer jungen Payment-Lösung mit strategischem Branding und kulturell sensitivem Design Glaubwürdigkeit und Vertrauen verliehen haben.',
    challenge: 'Khalifa Fintech hatte eine revolutionäre Payment-App entwickelt, aber das visuelle Erscheinungsbild schrie "Garage Startup" statt "vertrauenswürdiger Finanzpartner". Im konservativen Finanzsektor der VAE ist Vertrauen alles – und das beginnt beim ersten Eindruck. Das bestehende Logo wirkte amateurhaft, die Markenidentität war inkonsistent, und die Investoren wurden ungeduldig.',
    solution: 'Wir schufen eine Markenidentität, die Innovation und Solidität vereint. Das neue Logo verbindet arabische Kalligraphie-Elemente mit moderner Fintech-Ästhetik. Die Farbpalette aus Gold und Deep Blue signalisiert Vertrauen und Premium-Qualität. Die Brand Guidelines definieren jeden Touchpoint – von der App bis zum Investoren-Pitch-Deck. Die Website vermittelt Sicherheit und UAE Central Bank Compliance auf den ersten Blick.',
    services: [
      { service: 'Brand Strategy & Positioning' },
      { service: 'Logo Design (Arabic & English)' },
      { service: 'Visual Identity System' },
      { service: 'Brand Guidelines' },
      { service: 'Website Design' },
    ],
    tags: [
      { tag: 'Fintech Branding' },
      { tag: 'Abu Dhabi Startup' },
      { tag: 'Arabic Logo Design' },
      { tag: 'Corporate Identity' },
      { tag: 'UAE Finance' },
    ],
    results: [
      { metric: '$2.5M', label: 'Series A Raised' },
      { metric: '+200%', label: 'App Downloads' },
      { metric: '3', label: 'GCC Markets Launched' },
    ],
    featured: true,
    order: 11,
  },
  {
    title: 'Sharjah Heritage Academy - Digital Strategy',
    slug: 'sharjah-heritage-academy',
    client: 'Sharjah Heritage Academy',
    category: 'strategie',
    year: 2024,
    description: 'Tradition trifft Digitalisierung: Wie wir einer renommierten Bildungsinstitution in Sharjah geholfen haben, internationale Studierende zu gewinnen, ohne ihre kulturellen Werte zu kompromittieren.',
    challenge: 'Die Sharjah Heritage Academy – bekannt für ihre exzellenten Programme in arabischer Sprache und Kultur – hatte ein Generationenproblem. Die Zielgruppe war global, aber die digitale Präsenz sprach nur Lokale an. Internationale Interessenten konnten keine Informationen finden, das Bewerbungsportal war veraltet, und in Social Media war die Institution praktisch unsichtbar. In einem Markt, wo Elite-Universitäten um internationale Talente buhlen, ein schwerer Nachteil.',
    solution: 'Wir entwickelten eine digitale Strategie, die Sharjahs Status als UNESCO-Kulturhauptstadt nutzt. Eine neue mehrsprachige Website (AR/EN/FR) mit virtuellem Campus-Rundgang. Ein komplett digitalisierter Bewerbungsprozess. Eine Content-Strategie, die arabische Kultur für internationale Zielgruppen zugänglich macht. Instagram und TikTok-Kampagnen, die Tradition cool machen. SEO-Optimierung für Education-Keywords im GCC und MENA-Raum.',
    services: [
      { service: 'Digital Strategy Development' },
      { service: 'Multilingual Website (AR/EN/FR)' },
      { service: 'Student Portal Integration' },
      { service: 'Social Media Marketing' },
      { service: 'Education SEO' },
    ],
    tags: [
      { tag: 'Sharjah Education' },
      { tag: 'University Marketing' },
      { tag: 'Multilingual Website' },
      { tag: 'Cultural Institution' },
      { tag: 'Student Recruitment' },
    ],
    results: [
      { metric: '+85%', label: 'International Applications' },
      { metric: '15K+', label: 'Social Media Followers' },
      { metric: '12', label: 'Countries Represented' },
    ],
    featured: false,
    order: 12,
  },
  {
    title: 'Al Haramain Boutique - E-Commerce Launch',
    slug: 'al-haramain-boutique',
    client: 'Al Haramain Boutique',
    category: 'ecommerce',
    year: 2024,
    description: 'Vom Souk ins Smartphone: Wie ein traditionelles Parfüm- und Oud-Geschäft aus Dubai mit E-Commerce und Digital Marketing den GCC-Markt erobert hat.',
    challenge: 'Al Haramain Boutique war seit 30 Jahren eine Institution in den Dubai Souks – bekannt für exquisite arabische Parfüms und authentischen Oud. Aber während Touristen zurückkehrten, ging der Trend zum Online-Shopping. Die Stammkunden wurden älter, und die jüngere Generation kaufte bei internationalen E-Commerce-Riesen. Ein digitaler Shop musste her – aber einer, der die Seele des traditionellen Handels bewahrt.',
    solution: 'Wir lancierten eine E-Commerce-Plattform, die das Souk-Erlebnis digitalisiert. Eine immersive Website mit Story-Telling zu jedem Produkt. Integration von Tabby und Tamara für Buy-Now-Pay-Later. Shipping-Integration mit Aramex für GCC-weite Lieferung. Influencer-Marketing mit regionalen Beauty-Bloggern. Google Shopping Ads optimiert für den Golfmarkt. Das Ergebnis: Ein Online-Shop, der das Erbe ehrt und die Zukunft erobert.',
    services: [
      { service: 'E-Commerce Development' },
      { service: 'UAE Payment Integration' },
      { service: 'Logistics Setup (Aramex)' },
      { service: 'Influencer Marketing' },
      { service: 'Google Shopping UAE' },
    ],
    tags: [
      { tag: 'Dubai E-Commerce' },
      { tag: 'Arabic Perfume' },
      { tag: 'Shopify Plus' },
      { tag: 'GCC Shipping' },
      { tag: 'Luxury Retail' },
    ],
    results: [
      { metric: 'AED 2M+', label: 'First Year Revenue' },
      { metric: '6', label: 'GCC Countries Served' },
      { metric: '4.9★', label: 'Customer Rating' },
    ],
    featured: true,
    order: 13,
  },
]

async function seedUAEProjects() {
  console.log('🇦🇪 Starting UAE Projects Seed...')

  const payload = await getPayload({ config })

  for (const project of uaeProjects) {
    // Check if project already exists
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: project.slug } },
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭️  Project "${project.title}" already exists, skipping...`)
      continue
    }

    try {
      await payload.create({
        collection: 'projects',
        data: {
          title: project.title,
          slug: project.slug,
          client: project.client,
          category: project.category,
          year: project.year,
          description: project.description,
          challenge: project.challenge,
          solution: project.solution,
          services: project.services,
          tags: project.tags,
          results: project.results,
          featured: project.featured,
          order: project.order,
          status: 'published',
        } as any,
      })
      console.log(`  ✅ Created: ${project.title}`)
    } catch (error) {
      console.error(`  ❌ Error creating ${project.title}:`, error)
    }
  }

  console.log('\n🎉 UAE Projects Seed Complete!')
  console.log(`   Total: ${uaeProjects.length} projects`)
  process.exit(0)
}

seedUAEProjects().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
