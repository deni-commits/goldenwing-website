import { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Linkedin, Twitter, Instagram, Github, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getTeamMembers, type SupportedLocale } from '@/lib/payload'
import { BreadcrumbSchema, TeamSchema } from '@/components/seo/schemas'
import { JsonLd } from '@/components/seo/json-ld'
import { getCanonicalUrl, getHreflangAlternates, getMediaUrl, getContactUrl } from '@/lib/utils'
import NextLink from 'next/link'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


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

// UI Text translations
const uiText = {
  title: {
    de: 'Unser Team | GoldenWing Creative Studios',
    en: 'Our Team | GoldenWing Creative Studios',
    ru: 'Наша команда | GoldenWing Creative Studios',
  },
  description: {
    de: 'Lernen Sie das Team von GoldenWing Creative Studios kennen – kreative Köpfe mit Leidenschaft für digitales Design und innovative Lösungen.',
    en: 'Meet the team at GoldenWing Creative Studios – creative minds with a passion for digital design and innovative solutions.',
    ru: 'Познакомьтесь с командой GoldenWing Creative Studios – творческие люди, увлечённые цифровым дизайном и инновационными решениями.',
  },
  keywords: {
    de: ['Team Kreativagentur Wien', 'GoldenWing Mitarbeiter', 'Design Team Wien', 'Webdesign Team'],
    en: ['Creative Agency Team Vienna', 'GoldenWing Staff', 'Design Team Vienna', 'Web Design Team'],
    ru: ['Команда креативного агентства', 'Сотрудники GoldenWing', 'Команда дизайнеров', 'Команда веб-дизайна'],
  },
  ogDescription: {
    de: 'Kreative Köpfe, die mit Leidenschaft digitale Erlebnisse schaffen.',
    en: 'Creative minds who craft digital experiences with passion.',
    ru: 'Творческие умы, создающие цифровые впечатления с душой.',
  },
  heroTitle: {
    de: 'Unser Team',
    en: 'Our Team',
    ru: 'Наша команда',
  },
  heroSubtitle: {
    de: 'Kreative Köpfe, die mit Leidenschaft und Expertise digitale Erlebnisse schaffen. Lernen Sie die Menschen kennen, die hinter GoldenWing stehen.',
    en: 'Creative minds who craft digital experiences with passion and expertise. Meet the people behind GoldenWing.',
    ru: 'Творческие умы, создающие цифровые впечатления с душой и экспертизой. Познакомьтесь с людьми, стоящими за GoldenWing.',
  },
  emailAriaLabel: {
    de: 'E-Mail an',
    en: 'Email',
    ru: 'Написать',
  },
  joinTitle: {
    de: 'Teil des Teams werden?',
    en: 'Join Our Team?',
    ru: 'Хотите присоединиться к команде?',
  },
  joinDescription: {
    de: 'Wir sind immer auf der Suche nach talentierten und motivierten Menschen, die unsere Leidenschaft für herausragendes Design und digitale Innovation teilen.',
    en: 'We are always looking for talented and motivated people who share our passion for outstanding design and digital innovation.',
    ru: 'Мы всегда ищем талантливых и мотивированных людей, разделяющих нашу страсть к выдающемуся дизайну и цифровым инновациям.',
  },
  applyNow: {
    de: 'Jetzt bewerben',
    en: 'Apply Now',
    ru: 'Откликнуться',
  },
  ctaTitle: {
    de: 'Bereit, zusammenzuarbeiten?',
    en: 'Ready to Collaborate?',
    ru: 'Готовы к сотрудничеству?',
  },
  ctaDescription: {
    de: 'Lassen Sie uns gemeinsam Ihr nächstes Projekt realisieren. Kontaktieren Sie uns für ein unverbindliches Erstgespräch.',
    en: 'Let us realize your next project together. Contact us for a free initial consultation.',
    ru: 'Давайте вместе реализуем ваш следующий проект. Свяжитесь с нами для бесплатной консультации.',
  },
  startProject: {
    de: 'Projekt starten',
    en: 'Start Project',
    ru: 'Начать проект',
  },
  breadcrumbs: {
    de: { home: 'Home', about: 'Über uns', team: 'Team' },
    en: { home: 'Home', about: 'About Us', team: 'Team' },
    ru: { home: 'Главная', about: 'О нас', team: 'Команда' },
  },
  viewProfile: {
    de: 'Profil ansehen',
    en: 'View Profile',
    ru: 'Посмотреть профиль',
  },
}

type LocaleKey = 'de' | 'en' | 'ru'
const getText = <K extends keyof typeof uiText>(key: K, locale: string): typeof uiText[K][LocaleKey] => {
  return uiText[key][locale as LocaleKey] || uiText[key].en
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const hreflangAlternates = getHreflangAlternates('/ueber-uns/team')

  const title = getText('title', locale) as string
  const description = getText('description', locale) as string

  return {
    title,
    description,
    keywords: getText('keywords', locale) as string[],
    openGraph: {
      title,
      description: getText('ogDescription', locale) as string,
    },
    alternates: {
      canonical: getCanonicalUrl('/ueber-uns/team', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const teamMembers = await getTeamMembers(locale)

  // Prepare team members for schema
  const teamForSchema = teamMembers.map((member) => {
    const imageData = member.image as MediaImage | undefined
    return {
      name: member.name as string,
      jobTitle: member.role as string,
      description: member.bio as string | undefined,
      image: getMediaUrl(imageData?.url, true) || undefined,
    }
  })

  const breadcrumbs = getText('breadcrumbs', locale) as { home: string; about: string; team: string }
  const breadcrumbItems = [
    { name: breadcrumbs.home, url: '/' },
    { name: breadcrumbs.about, url: '/ueber-uns' },
    { name: breadcrumbs.team, url: '/ueber-uns/team' },
  ]

  // WebPage schema for the team page
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': getText('title', locale) as string,
    'description': getText('description', locale) as string,
    'url': getCanonicalUrl('/ueber-uns/team', locale),
    'publisher': {
      '@type': 'Organization',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
    },
    'mainEntity': {
      '@type': 'Organization',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
      'employee': teamForSchema.map(member => ({
        '@type': 'Person',
        'name': member.name,
        'jobTitle': member.jobTitle,
        'description': member.description,
        'image': member.image,
      })),
    },
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
    },
  }

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* WebPage Schema */}
      <JsonLd data={webPageSchema} />

      {/* Team Schema for E-E-A-T */}
      <TeamSchema members={teamForSchema} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getText('heroTitle', locale)}
            </h1>
            <p className="text-xl text-muted-foreground">
              {getText('heroSubtitle', locale)}
            </p>
          </div>
        </Container>
      </section>

      {/* Team Members Grid */}
      <section className="pb-20">
        <Container variant="block">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => {
              const imageData = member.image as MediaImage | undefined
              const socialLinks = member.social as SocialLinks | undefined
              const memberName = member.name as string
              const memberRole = member.role as string
              const memberBio = member.bio as string | undefined
              const memberEmail = member.email as string | undefined
              const memberSlug = member.slug as string | undefined

              const cardContent = (
                <>
                  {/* Image */}
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    {imageData?.url ? (
                      <Image
                        src={imageData.url}
                        alt={imageData.alt || memberName}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-6xl font-bold text-muted-foreground">
                        {memberName.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{memberName}</h3>
                    <p className="text-primary font-medium mb-4">{memberRole}</p>

                    {memberBio && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {memberBio}
                      </p>
                    )}

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                      {memberEmail && (
                        <a
                          href={`mailto:${memberEmail}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`${getText('emailAriaLabel', locale)} ${memberName}`}
                        >
                          <span className="sr-only">{getText('emailAriaLabel', locale)} {memberName}</span>
                          <Mail className="h-4 w-4" />
                        </a>
                      )}
                      {socialLinks?.linkedin && (
                        <a
                          href={socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`LinkedIn ${memberName}`}
                        >
                          <span className="sr-only">LinkedIn {memberName}</span>
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {socialLinks?.twitter && (
                        <a
                          href={socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`Twitter ${memberName}`}
                        >
                          <span className="sr-only">Twitter {memberName}</span>
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {socialLinks?.instagram && (
                        <a
                          href={socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`Instagram ${memberName}`}
                        >
                          <span className="sr-only">Instagram {memberName}</span>
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                      {socialLinks?.github && (
                        <a
                          href={socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`GitHub ${memberName}`}
                        >
                          <span className="sr-only">GitHub {memberName}</span>
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    {/* View Profile Link */}
                    {memberSlug && (
                      <div className="mt-4 text-primary font-medium text-sm">
                        {getText('viewProfile', locale)} →
                      </div>
                    )}
                  </div>
                </>
              )

              // If member has a slug, wrap in link
              if (memberSlug) {
                return (
                  <NextLink
                    key={member.id}
                    href={`/ueber-uns/team/${memberSlug}`}
                    className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 block"
                  >
                    {cardContent}
                  </NextLink>
                )
              }

              return (
                <div
                  key={member.id}
                  className="group bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {cardContent}
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-muted/50">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {getText('joinTitle', locale)}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {getText('joinDescription', locale)}
            </p>
            <Button size="lg" asChild>
              <NextLink href={getContactUrl(locale)}>
                {getText('applyNow', locale)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {getText('ctaTitle', locale)}
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
    </>
  )
}
