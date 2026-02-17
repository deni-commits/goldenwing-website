import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Linkedin, Mail, Briefcase, GraduationCap, Target, CheckCircle, Building2, Globe, Lightbulb, Award, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getTeamMemberBySlug, getTeamMembers, getOtherTeamMembers, type SupportedLocale } from '@/lib/payload'
import { BreadcrumbSchema } from '@/components/seo/schemas'
import { getCanonicalUrl, getHreflangAlternates, getContactUrl } from '@/lib/utils'
import NextLink from 'next/link'
import { Container } from '@/components/ui/container'

interface MediaImage {
  url?: string
  alt?: string
}

interface SocialLinks {
  linkedin?: string
  twitter?: string
  instagram?: string
  github?: string
}

// Extended profile data for specific team members
const extendedProfiles: Record<string, {
  degree?: string
  summary: { de: string; en: string }
  stats?: Array<{
    value: string
    label: { de: string; en: string }
  }>
  notableProjects?: Array<{
    company: string
    description: { de: string; en: string }
  }>
  experience: Array<{
    title: { de: string; en: string }
    company: string
    period: string
    description: { de: string; en: string }
    icon: 'briefcase' | 'building' | 'globe' | 'lightbulb' | 'award'
  }>
  education: Array<{
    degree: { de: string; en: string }
    institution: string
    description: { de: string; en: string }
  }>
  expertise: Array<{ de: string; en: string }>
  focus: Array<{
    title: { de: string; en: string }
    description: { de: string; en: string }
  }>
}> = {
  'benedikt-hasibeder': {
    degree: 'DI (FH)',
    summary: {
      de: 'Benedikt Hasibeder ist Innovationsberater, strategischer Business Designer und erfahrener Manager mit fundiertem Hintergrund sowohl in globalen Unternehmensumgebungen als auch in unternehmerischen Projekten. Als Co-Founder von GoldenWing unterstützt er Organisationen dabei, Strategie, Innovation und Markteinblicke in skalierbare digitale, Marken- und Wachstumslösungen zu übersetzen.',
      en: 'Benedikt Hasibeder is an innovation consultant, strategic business designer, and experienced manager with a strong foundation in both global corporate environments and entrepreneurial ventures. As Co-Founder of GoldenWing, he supports organisations in translating strategy, innovation, and market insight into scalable digital, brand, and growth solutions.',
    },
    experience: [
      {
        title: { de: 'Co-Founder & Innovation Consultant', en: 'Co-Founder & Innovation Consultant' },
        company: 'GoldenWing',
        period: '2023 – heute',
        description: {
          de: 'Verantwortlich für Innovationsstrategie, Business Design und strategische Beratung. Beratung von Organisationen in ganz Europa bei der Entwicklung zukunftsfähiger Geschäftsmodelle, der Abstimmung von Marken- und digitalen Plattformen mit der Geschäftsstrategie und der Gestaltung effektiver Go-to-Market-Ansätze.',
          en: 'Responsible for innovation strategy, business design, and strategic consulting. Advising organisations across Europe on developing future-ready business models, aligning brand and digital platforms with business strategy, and designing effective go-to-market approaches.',
        },
        icon: 'briefcase',
      },
      {
        title: { de: 'Founder & CEO', en: 'Founder & CEO' },
        company: 'Point of New',
        period: '2018 – 2023',
        description: {
          de: 'Beratung von Unternehmen, Startups und Institutionen zu Geschäftsmodellinnovation, internationalem Markteintritt und strategischer Transformation. Durchführung von Innovationsworkshops, strategischen Roadmaps, Marktvalidierung und Wachstumsstrategien.',
          en: 'Advised companies, startups, and institutions on business model innovation, international market entry, and strategic transformation. Conducted innovation workshops, strategic roadmaps, market validation, and growth strategies.',
        },
        icon: 'lightbulb',
      },
      {
        title: { de: 'Global Management Positionen', en: 'Global Management Roles' },
        company: 'Siemens',
        period: '2012 – 2018',
        description: {
          de: 'Management-Positionen in einem internationalen Unternehmensumfeld. Umfangreiche Erfahrung in großen Organisationsstrukturen, grenzüberschreitender Zusammenarbeit und komplexem Stakeholder-Management.',
          en: 'Management roles within an international corporate environment. Extensive experience in large-scale organisational structures, cross-border collaboration, and complex stakeholder management.',
        },
        icon: 'building',
      },
      {
        title: { de: 'Innovation & Business Development', en: 'Innovation & Business Development' },
        company: 'Internationale Projekte',
        period: 'Laufend',
        description: {
          de: 'Zusammenarbeit mit Führungsteams, öffentlichen Institutionen und privaten Organisationen bei Innovationsinitiativen, digitalen Transformationsprogrammen und grenzüberschreitender Marktexpansion.',
          en: 'Collaboration with leadership teams, public institutions, and private organisations on innovation initiatives, digital transformation programs, and cross-border market expansion.',
        },
        icon: 'globe',
      },
    ],
    education: [
      {
        degree: { de: 'Innovation & Produktmanagement', en: 'Innovation & Product Management' },
        institution: 'FH Wels, Österreich',
        description: {
          de: 'Fundiertes Verständnis von Produktstrategie, Innovationsprozessen, Marktanalyse und Kommerzialisierung. Basis für analytische und geschäftsorientierte Perspektive auf Innovation.',
          en: 'Strong understanding of product strategy, innovation processes, market analysis, and commercialisation. Foundation for analytical and business-oriented perspective on innovation.',
        },
      },
      {
        degree: { de: 'Industrial Design', en: 'Industrial Design' },
        institution: 'Umeå University, Schweden',
        description: {
          de: 'Eine der weltweit führenden Design-Universitäten. Prägung des Design-Thinking-Mindsets, nutzerzentrierten Ansatzes und Sensibilität für Form, Funktion und Erlebnis.',
          en: 'Internationally recognised as one of the leading design universities worldwide. Shaped design thinking mindset, user-centric approach, and sensitivity for form, function, and experience.',
        },
      },
    ],
    expertise: [
      { de: 'Business Model Innovation & Strategic Design', en: 'Business Model Innovation & Strategic Design' },
      { de: 'Go-to-Market Strategy & Internationalisierung', en: 'Go-to-Market Strategy & Internationalisation' },
      { de: 'Digital Transformation & Platform Strategy', en: 'Digital Transformation & Platform Strategy' },
      { de: 'Innovation Facilitation & Workshop Design', en: 'Innovation Facilitation & Workshop Design' },
      { de: 'Brand Strategy, Value Proposition & Experience Design', en: 'Brand Strategy, Value Proposition & Experience Design' },
    ],
    focus: [
      {
        title: { de: 'Strategische Chancen identifizieren', en: 'Identify strategic opportunities' },
        description: { de: 'Innovationspotenziale und Marktchancen erkennen', en: 'Recognise innovation potential and market opportunities' },
      },
      {
        title: { de: 'Robuste Geschäftsmodelle designen', en: 'Design robust business models' },
        description: { de: 'Skalierbare und nachhaltige Modelle entwickeln', en: 'Develop scalable and sustainable models' },
      },
      {
        title: { de: 'Markt- und Wachstumsannahmen validieren', en: 'Validate market and growth assumptions' },
        description: { de: 'Datenbasierte Entscheidungsgrundlagen schaffen', en: 'Create data-driven decision foundations' },
      },
      {
        title: { de: 'Strategie in Ergebnisse übersetzen', en: 'Translate strategy into results' },
        description: { de: 'Konkrete, messbare Resultate erzielen', en: 'Achieve concrete, measurable results' },
      },
    ],
  },
  'deni-khachukaev': {
    degree: 'Mag.',
    summary: {
      de: 'Deni Khachukaev ist CEO, Executive Creative Director und digitaler Stratege mit über 13 Jahren internationaler Erfahrung in Wien, den VAE und Kalifornien. Als Gründer von GoldenWing Creative Studios unterstützt er Unternehmen dabei, Geschäftsziele in Premium-Branding, High-Performance Webdesign und skalierbare SEO-Plattformen zu übersetzen – mit messbarem Wachstum und nachhaltiger digitaler Präsenz.',
      en: 'Deni Khachukaev is a CEO, executive creative director, and digital strategist with 13+ years of international experience across Vienna, the UAE, and California. As founder of GoldenWing Creative Studios, he helps organisations translate business goals into premium branding, high-performing web design, and scalable SEO-driven digital platforms that build trust and generate measurable growth.',
    },
    stats: [
      { value: '300+', label: { de: 'Projekte realisiert', en: 'Projects delivered' } },
      { value: '40+', label: { de: 'Aktive Kunden', en: 'Active clients' } },
      { value: '13+', label: { de: 'Jahre Erfahrung', en: 'Years of experience' } },
      { value: '5', label: { de: 'Sprachen', en: 'Languages' } },
      { value: '3', label: { de: 'Kontinente', en: 'Continents' } },
    ],
    notableProjects: [
      {
        company: 'Emirates',
        description: {
          de: 'Entwicklung von Image-Konzepten und Executive-Präsentationen für die internationale Konferenz in Singapur – mit Fokus auf die Technologieplattform zur Betreuung des Personals.',
          en: 'Development of image concepts and executive presentations for the international conference in Singapore—focusing on the airline\'s technology platform for crew wellbeing.',
        },
      },
      {
        company: 'Microsoft',
        description: {
          de: 'Produktion von Copilot Training Videos in fünf Sprachen für den globalen Rollout.',
          en: 'Production of Copilot training videos in five languages for global rollout.',
        },
      },
      {
        company: 'PORR',
        description: {
          de: 'Entwicklung und Umsetzung eines Begrünungskonzepts für den österreichischen Baukonzern.',
          en: 'Development and implementation of a greening concept for the Austrian construction group.',
        },
      },
    ],
    experience: [
      {
        title: { de: 'Gründer & CEO', en: 'Founder & CEO' },
        company: 'GoldenWing Creative Studios',
        period: '2019 – heute',
        description: {
          de: 'Verantwortlich für Unternehmensstrategie, Kundenberatung und Qualitätsgovernance. Arbeit mit Gründern und Entscheidern zur Verzahnung von Markenidentität, Webdesign, Messaging und SEO-Grundlagen mit der Geschäftsstrategie.',
          en: 'Responsible for company strategy, client advisory, and quality governance. Working with founders and decision-makers to align brand identity, web design, messaging, and SEO foundations with business strategy.',
        },
        icon: 'briefcase',
      },
      {
        title: { de: 'Creative Director & Leiter Multimedia', en: 'Creative Director & Head of Multimedia' },
        company: 'Kulturministerium Tschetschenien',
        period: '2015 – 2019',
        description: {
          de: 'Leitung von Medienstrategie und interdisziplinärer Produktion über kulturelle Initiativen hinweg – Design, Film und Cinematographie. Aufbau von Produktionsstandards und Mentoring junger Fachkräfte.',
          en: 'Led media strategy and multidisciplinary production across cultural initiatives—design, film, and cinematography. Established production standards and mentored young professionals.',
        },
        icon: 'building',
      },
      {
        title: { de: 'Creative Art Director', en: 'Creative Art Director' },
        company: 'Unique Vision Arts',
        period: '2012 – 2015',
        description: {
          de: 'Führung von Teams, visuelle Strategien und Projektdelivery unter hohem Zeitdruck – Aufbau der operativen Disziplin und Führungsfähigkeiten.',
          en: 'Led teams, drove visual strategies, and delivered projects under tight timelines—building operational discipline and leadership capabilities.',
        },
        icon: 'lightbulb',
      },
      {
        title: { de: 'Internationale Projekte', en: 'International Projects' },
        company: 'Emirates, Microsoft, PORR',
        period: 'Laufend',
        description: {
          de: 'Zusammenarbeit mit internationalen Marken bei Image-Konzepten, Executive-Präsentationen, Training-Videos und strategischen Kommunikationsprojekten.',
          en: 'Collaboration with international brands on image concepts, executive presentations, training videos, and strategic communication projects.',
        },
        icon: 'globe',
      },
    ],
    education: [
      {
        degree: { de: 'Magister (M.A.) – Web Design', en: 'Master\'s (M.A.) – Web Design' },
        institution: 'SAE Institute Vienna',
        description: {
          de: 'Digital/Multimedia and Information Resources Design. Schwerpunkt: UX/UI, Web-Technologien, Multimedia-Kommunikation.',
          en: 'Digital/Multimedia and Information Resources Design. Focus: UX/UI, web technologies, multimedia communication.',
        },
      },
      {
        degree: { de: 'Digital Marketing Strategy', en: 'Digital Marketing Strategy' },
        institution: 'Harvard Business School Online',
        description: {
          de: 'HBS Online Graduate. Schwerpunkt: Data-driven Marketing, Customer Acquisition, Growth Frameworks.',
          en: 'HBS Online Graduate. Focus: Data-driven marketing, customer acquisition, growth frameworks.',
        },
      },
    ],
    expertise: [
      { de: 'Executive Advisory & Markenpositionierung', en: 'Executive Advisory & Brand Positioning' },
      { de: 'Webdesign Leadership & UX-Architektur', en: 'Web Design Leadership & UX Architecture' },
      { de: 'SEO-Strategie & Technical SEO', en: 'SEO Strategy & Technical SEO' },
      { de: 'Visual Communication & Brand Touchpoints', en: 'Visual Communication & Brand Touchpoints' },
      { de: 'Digital Growth & Performance Marketing', en: 'Digital Growth & Performance Marketing' },
    ],
    focus: [
      {
        title: { de: 'Premium Branding entwickeln', en: 'Develop premium branding' },
        description: { de: 'Markenidentität und Positionierung für nachhaltigen Erfolg', en: 'Brand identity and positioning for sustainable success' },
      },
      {
        title: { de: 'High-Performance Webdesign', en: 'High-performance web design' },
        description: { de: 'Conversion-optimierte UX und skalierbare Strukturen', en: 'Conversion-optimized UX and scalable structures' },
      },
      {
        title: { de: 'SEO-Sichtbarkeit maximieren', en: 'Maximize SEO visibility' },
        description: { de: 'Technische Grundlagen und Content-Strategie', en: 'Technical foundations and content strategy' },
      },
      {
        title: { de: 'Messbares Wachstum erzielen', en: 'Achieve measurable growth' },
        description: { de: 'Datenbasierte Strategien für nachhaltige Ergebnisse', en: 'Data-driven strategies for sustainable results' },
      },
    ],
  },
}

// UI Text translations
const uiText = {
  backToTeam: {
    de: 'Zurück zum Team',
    en: 'Back to Team',
    ru: 'Назад к команде',
  },
  about: {
    de: 'Über',
    en: 'About',
    ru: 'О',
  },
  experience: {
    de: 'Berufserfahrung',
    en: 'Work Experience',
    ru: 'Опыт работы',
  },
  education: {
    de: 'Ausbildung',
    en: 'Education',
    ru: 'Образование',
  },
  expertise: {
    de: 'Expertise & Zertifizierungen',
    en: 'Expertise & Certifications',
    ru: 'Экспертиза',
  },
  focus: {
    de: 'Beratungsfokus',
    en: 'Professional Focus',
    ru: 'Профессиональный фокус',
  },
  focusIntro: {
    de: '{name}s Arbeitsstil ist strukturiert, analytisch und ergebnisorientiert. Er arbeitet eng mit Entscheidungsträgern zusammen, um:',
    en: '{name}\'s working style is structured, analytical, and outcome-oriented. He works closely with decision-makers to:',
    ru: 'Стиль работы {name} структурирован, аналитичен и ориентирован на результат.',
  },
  notableProjects: {
    de: 'Ausgewählte Projekte',
    en: 'Selected Projects',
    ru: 'Избранные проекты',
  },
  notableProjectsIntro: {
    de: 'Im Laufe seiner Karriere hat {name} an Projekten für internationale Marken und Organisationen mitgewirkt:',
    en: 'Throughout his career, {name} has contributed to projects for international brands and organisations:',
    ru: 'На протяжении своей карьеры {name} участвовал в проектах для международных брендов:',
  },
  startProject: {
    de: 'Projekt starten',
    en: 'Start Project',
    ru: 'Начать проект',
  },
  ctaTitle: {
    de: 'Projekt mit {name} starten?',
    en: 'Start a project with {name}?',
    ru: 'Начать проект с {name}?',
  },
  ctaDescription: {
    de: 'Kontaktieren Sie uns für ein unverbindliches Erstgespräch und erfahren Sie, wie wir Ihnen helfen können.',
    en: 'Contact us for a free consultation and discover how we can help you.',
    ru: 'Свяжитесь с нами для бесплатной консультации и узнайте, как мы можем вам помочь.',
  },
  otherMembers: {
    de: 'Weitere Teammitglieder',
    en: 'More Team Members',
    ru: 'Другие члены команды',
  },
  viewProfile: {
    de: 'Profil ansehen',
    en: 'View Profile',
    ru: 'Посмотреть профиль',
  },
  emailAriaLabel: {
    de: 'E-Mail an',
    en: 'Email',
    ru: 'Написать',
  },
  breadcrumbs: {
    de: { home: 'Home', about: 'Über uns', team: 'Team' },
    en: { home: 'Home', about: 'About Us', team: 'Team' },
    ru: { home: 'Главная', about: 'О нас', team: 'Команда' },
  },
  notFoundTitle: {
    de: 'Teammitglied nicht gefunden',
    en: 'Team member not found',
    ru: 'Член команды не найден',
  },
}

type LocaleKey = 'de' | 'en' | 'ru'
const getText = <K extends keyof typeof uiText>(key: K, locale: string): (typeof uiText)[K][LocaleKey] => {
  return uiText[key][locale as LocaleKey] || uiText[key].en
}

const getLocalizedText = (text: { de: string; en: string }, locale: string): string => {
  return locale === 'de' ? text.de : text.en
}

interface TeamMemberPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const members = await getTeamMembers('de')
  const locales = ['de', 'en', 'ru']

  const params: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    for (const member of members) {
      if (member.slug) {
        params.push({ locale, slug: member.slug as string })
      }
    }
  }

  return params
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const member = await getTeamMemberBySlug(slug, locale)
  const extendedProfile = extendedProfiles[slug]

  if (!member) {
    return {
      title: getText('notFoundTitle', locale) as string,
    }
  }

  const memberName = member.name as string
  const memberRole = member.role as string
  const fullName = extendedProfile?.degree ? `${extendedProfile.degree} ${memberName}` : memberName
  const description = extendedProfile
    ? getLocalizedText(extendedProfile.summary, locale).substring(0, 160)
    : `${memberName} - ${memberRole} bei GoldenWing Creative Studios`
  const hreflangAlternates = getHreflangAlternates(`/ueber-uns/team/${slug}`)

  return {
    title: `${fullName} - ${memberRole} | GoldenWing`,
    description,
    openGraph: {
      title: `${fullName} - ${memberRole}`,
      description,
      type: 'profile',
    },
    alternates: {
      canonical: getCanonicalUrl(`/ueber-uns/team/${slug}`, locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const member = await getTeamMemberBySlug(slug, locale)

  if (!member) {
    notFound()
  }

  const imageData = member.image as MediaImage | undefined
  const socialLinks = member.social as SocialLinks | undefined
  const memberName = member.name as string
  const memberRole = member.role as string
  const memberEmail = member.email as string | undefined
  const extendedProfile = extendedProfiles[slug]

  const fullName = extendedProfile?.degree ? `${extendedProfile.degree} ${memberName}` : memberName
  const otherMembers = await getOtherTeamMembers(slug, locale, 3)

  const breadcrumbs = getText('breadcrumbs', locale) as { home: string; about: string; team: string }
  const breadcrumbItems = [
    { name: breadcrumbs.home, url: '/' },
    { name: breadcrumbs.about, url: '/ueber-uns' },
    { name: breadcrumbs.team, url: '/ueber-uns/team' },
    { name: memberName, url: `/ueber-uns/team/${slug}` },
  ]

  const canonicalUrl = getCanonicalUrl(`/ueber-uns/team/${slug}`, locale)

  // Enhanced Person Schema for E-E-A-T & GEO/AEO
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `https://goldenwing.at/ueber-uns/team/${slug}#person`,
    'name': fullName,
    'givenName': memberName.split(' ')[0],
    'familyName': memberName.split(' ').slice(1).join(' '),
    'jobTitle': memberRole,
    'description': extendedProfile ? getLocalizedText(extendedProfile.summary, locale) : `${memberName} - ${memberRole} bei GoldenWing Creative Studios`,
    'url': canonicalUrl,
    'image': imageData?.url ? {
      '@type': 'ImageObject',
      'url': imageData.url,
      'caption': `${fullName} - ${memberRole}`,
    } : undefined,
    'email': memberEmail,
    'alumniOf': extendedProfile?.education.map(edu => ({
      '@type': 'CollegeOrUniversity',
      'name': edu.institution,
    })),
    'hasCredential': extendedProfile?.degree ? {
      '@type': 'EducationalOccupationalCredential',
      'credentialCategory': 'degree',
      'name': extendedProfile.degree,
    } : undefined,
    'hasOccupation': {
      '@type': 'Occupation',
      'name': memberRole,
      'occupationLocation': {
        '@type': 'Country',
        'name': 'Austria',
      },
      'skills': extendedProfile?.expertise.map(e => getLocalizedText(e, locale)).join(', '),
    },
    'knowsAbout': extendedProfile?.expertise.map(e => getLocalizedText(e, locale)),
    'worksFor': {
      '@type': 'Organization',
      '@id': 'https://goldenwing.at/#organization',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
      'logo': 'https://goldenwing.at/logo.png',
    },
    'sameAs': [
      socialLinks?.linkedin,
    ].filter(Boolean),
  }

  // ProfilePage Schema for the page itself
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': canonicalUrl,
    'name': `${fullName} - ${memberRole}`,
    'description': extendedProfile ? getLocalizedText(extendedProfile.summary, locale) : `${memberName} - ${memberRole} bei GoldenWing Creative Studios`,
    'url': canonicalUrl,
    'mainEntity': {
      '@id': `https://goldenwing.at/ueber-uns/team/${slug}#person`,
    },
    'isPartOf': {
      '@type': 'WebSite',
      '@id': 'https://goldenwing.at/#website',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
    },
    'publisher': {
      '@type': 'Organization',
      '@id': 'https://goldenwing.at/#organization',
      'name': 'GoldenWing Creative Studios',
    },
    'dateModified': new Date().toISOString(),
  }

  const firstName = memberName.split(' ')[0]

  const iconMap = {
    briefcase: Briefcase,
    building: Building2,
    globe: Globe,
    lightbulb: Lightbulb,
    award: Award,
  }

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* ProfilePage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />

      {/* Back Link */}
      <section className="pt-8">
        <Container variant="block">
          <NextLink
            href="/ueber-uns/team"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {getText('backToTeam', locale)}
          </NextLink>
        </Container>
      </section>

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <Container variant="block">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Photo */}
            <div className="md:col-span-1">
              <div className="aspect-square bg-muted rounded-2xl overflow-hidden relative">
                {imageData?.url ? (
                  <Image
                    src={imageData.url}
                    alt={imageData.alt || memberName}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-8xl font-bold text-muted-foreground">
                    {memberName.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{fullName}</h1>
              <p className="text-xl text-primary font-semibold mb-6">{memberRole}</p>

              {/* Contact Links */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                {memberEmail && (
                  <a
                    href={`mailto:${memberEmail}`}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${getText('emailAriaLabel', locale)} ${memberName}`}
                  >
                    <Mail className="h-5 w-5" />
                    {memberEmail}
                  </a>
                )}
                {socialLinks?.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>
                )}
              </div>

              {/* Summary */}
              {extendedProfile && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {getLocalizedText(extendedProfile.summary, locale)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section (only for profiles with stats) */}
      {extendedProfile?.stats && extendedProfile.stats.length > 0 && (
        <section className="py-12 border-b">
          <Container variant="block">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {extendedProfile.stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{getLocalizedText(stat.label, locale)}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Extended Profile Sections */}
      {extendedProfile && (
        <>
          {/* Expertise Badges */}
          <section className="py-12 bg-muted/30">
            <Container variant="block">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                {getText('expertise', locale)}
              </h2>
              <div className="flex flex-wrap gap-3">
                {extendedProfile.expertise.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
                    {getLocalizedText(item, locale)}
                  </Badge>
                ))}
              </div>
            </Container>
          </section>

          {/* Notable Projects (only for profiles with notableProjects) */}
          {extendedProfile.notableProjects && extendedProfile.notableProjects.length > 0 && (
            <section className="py-16">
              <Container variant="block">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Star className="h-6 w-6 text-primary" />
                  {getText('notableProjects', locale)}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-3xl">
                  {(getText('notableProjectsIntro', locale) as string).replace('{name}', firstName)}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {extendedProfile.notableProjects.map((project, index) => (
                    <div key={index} className="bg-card rounded-lg p-6 border hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">{project.company}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">{getLocalizedText(project.description, locale)}</p>
                    </div>
                  ))}
                </div>
              </Container>
            </section>
          )}

          {/* Work Experience Timeline */}
          <section className="py-16 bg-muted/30">
            <Container variant="block">
              <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-primary" />
                {getText('experience', locale)}
              </h2>
              <div className="space-y-8">
                {extendedProfile.experience.map((exp, index) => {
                  const IconComponent = iconMap[exp.icon]
                  return (
                    <div key={index} className="relative pl-8 pb-8 border-l-2 border-muted last:pb-0">
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <IconComponent className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <div className="bg-card rounded-lg p-6 border">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{getLocalizedText(exp.title, locale)}</h3>
                          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-primary font-medium mb-3">{exp.company}</p>
                        <p className="text-muted-foreground">{getLocalizedText(exp.description, locale)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Container>
          </section>

          {/* Education */}
          <section className="py-16 bg-muted/30">
            <Container variant="block">
              <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-primary" />
                {getText('education', locale)}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {extendedProfile.education.map((edu, index) => (
                  <div key={index} className="bg-card rounded-lg p-6 border">
                    <h3 className="text-xl font-semibold mb-1">{getLocalizedText(edu.degree, locale)}</h3>
                    <p className="text-primary font-medium mb-3">{edu.institution}</p>
                    <p className="text-muted-foreground text-sm">{getLocalizedText(edu.description, locale)}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          {/* Professional Focus */}
          <section className="py-16">
            <Container variant="block">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                {getText('focus', locale)}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                {(getText('focusIntro', locale) as string).replace('{name}', firstName)}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {extendedProfile.focus.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{getLocalizedText(item.title, locale)}</h3>
                      <p className="text-muted-foreground text-sm">{getLocalizedText(item.description, locale)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {(getText('ctaTitle', locale) as string).replace('{name}', firstName)}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {getText('ctaDescription', locale)}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <NextLink href={getContactUrl(locale)}>
              {getText('startProject', locale)}
              <ArrowRight className="ml-2 h-4 w-4" />
            </NextLink>
          </Button>
        </Container>
      </section>

      {/* Other Team Members */}
      {otherMembers.length > 0 && (
        <section className="py-20">
          <Container variant="block">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {getText('otherMembers', locale)}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {otherMembers.map((otherMember) => {
                const otherImageData = otherMember.image as MediaImage | undefined
                const otherName = otherMember.name as string
                const otherRole = otherMember.role as string
                const otherSlug = otherMember.slug as string

                return (
                  <NextLink
                    key={otherMember.id}
                    href={`/ueber-uns/team/${otherSlug}`}
                    className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      {otherImageData?.url ? (
                        <Image
                          src={otherImageData.url}
                          alt={otherImageData.alt || otherName}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-6xl font-bold text-muted-foreground">
                          {otherName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                        {otherName}
                      </h3>
                      <p className="text-muted-foreground">{otherRole}</p>
                      <span className="inline-block mt-4 text-primary font-medium text-sm">
                        {getText('viewProfile', locale)} →
                      </span>
                    </div>
                  </NextLink>
                )
              })}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
