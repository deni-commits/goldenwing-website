'use client'

import NextLink from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowRight, Stethoscope, Scale, ShoppingBag, Building2, Rocket, UtensilsCrossed, Home, Factory, Briefcase } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'

const industries = {
  de: {
    title: 'Branchenlösungen',
    subtitle: 'Digitale Expertise für Ihre Branche',
    description: 'Wir verstehen die spezifischen Anforderungen Ihrer Branche. Mit maßgeschneiderten Lösungen für Webdesign, SEO und digitales Marketing.',
    industries: [
      {
        name: 'Ärzte & Gesundheit',
        slug: 'aerzte',
        icon: Stethoscope,
        description: 'Praxis-Websites, Patientengewinnung und medizinisches SEO',
        services: ['Praxis-Website', 'Local SEO', 'Google Business'],
        badge: 'Healthcare',
      },
      {
        name: 'Rechtsanwälte & Kanzleien',
        slug: 'rechtsanwaelte',
        icon: Scale,
        description: 'Seriöse Online-Präsenz und Mandantenakquise',
        services: ['Kanzlei-Website', 'Content Marketing', 'Reputation'],
        badge: 'Legal',
      },
      {
        name: 'E-Commerce & Online-Shops',
        slug: 'ecommerce',
        icon: ShoppingBag,
        description: 'Shop-Entwicklung, Conversion-Optimierung und Performance-Marketing',
        services: ['Shopify/WooCommerce', 'Google Shopping', 'CRO'],
        badge: 'Retail',
      },
      {
        name: 'B2B & Industrie',
        slug: 'b2b',
        icon: Factory,
        description: 'Lead-Generierung und digitale Transformation für B2B-Unternehmen',
        services: ['Lead Generation', 'LinkedIn Marketing', 'Account-Based Marketing'],
        badge: 'B2B',
      },
      {
        name: 'Startups & Tech',
        slug: 'startups',
        icon: Rocket,
        description: 'Schnelle Markteinführung und Growth Hacking für Startups',
        services: ['MVP Design', 'Growth Marketing', 'Pitch Decks'],
        badge: 'Tech',
      },
      {
        name: 'Gastronomie & Hotels',
        slug: 'gastronomie',
        icon: UtensilsCrossed,
        description: 'Reservierungssysteme, Local SEO und Bewertungsmanagement',
        services: ['Restaurant-Website', 'Google Maps SEO', 'Bewertungen'],
        badge: 'Hospitality',
      },
      {
        name: 'Immobilien',
        slug: 'immobilien',
        icon: Home,
        description: 'Immobilien-Websites, Exposés und Lead-Generierung',
        services: ['Makler-Website', 'Property Listings', 'Lead Capture'],
        badge: 'Real Estate',
      },
      {
        name: 'Dienstleister & Berater',
        slug: 'dienstleister',
        icon: Briefcase,
        description: 'Personal Branding und Kundenakquise für Freelancer und Berater',
        services: ['Personal Branding', 'Landing Pages', 'Funnel Marketing'],
        badge: 'Services',
      },
    ],
    cta: {
      title: 'Ihre Branche nicht dabei?',
      description: 'Wir entwickeln individuelle Lösungen für jede Branche. Sprechen Sie mit uns über Ihre spezifischen Anforderungen.',
      button: 'Kostenlose Beratung',
    },
  },
  en: {
    title: 'Industry Solutions',
    subtitle: 'Digital expertise for your industry',
    description: 'We understand the specific requirements of your industry. With tailored solutions for web design, SEO, and digital marketing.',
    industries: [
      {
        name: 'Doctors & Healthcare',
        slug: 'aerzte',
        icon: Stethoscope,
        description: 'Practice websites, patient acquisition and medical SEO',
        services: ['Practice Website', 'Local SEO', 'Google Business'],
        badge: 'Healthcare',
      },
      {
        name: 'Lawyers & Law Firms',
        slug: 'rechtsanwaelte',
        icon: Scale,
        description: 'Professional online presence and client acquisition',
        services: ['Law Firm Website', 'Content Marketing', 'Reputation'],
        badge: 'Legal',
      },
      {
        name: 'E-Commerce & Online Shops',
        slug: 'ecommerce',
        icon: ShoppingBag,
        description: 'Shop development, conversion optimization and performance marketing',
        services: ['Shopify/WooCommerce', 'Google Shopping', 'CRO'],
        badge: 'Retail',
      },
      {
        name: 'B2B & Industry',
        slug: 'b2b',
        icon: Factory,
        description: 'Lead generation and digital transformation for B2B companies',
        services: ['Lead Generation', 'LinkedIn Marketing', 'Account-Based Marketing'],
        badge: 'B2B',
      },
      {
        name: 'Startups & Tech',
        slug: 'startups',
        icon: Rocket,
        description: 'Fast market launch and growth hacking for startups',
        services: ['MVP Design', 'Growth Marketing', 'Pitch Decks'],
        badge: 'Tech',
      },
      {
        name: 'Restaurants & Hotels',
        slug: 'gastronomie',
        icon: UtensilsCrossed,
        description: 'Reservation systems, local SEO and review management',
        services: ['Restaurant Website', 'Google Maps SEO', 'Reviews'],
        badge: 'Hospitality',
      },
      {
        name: 'Real Estate',
        slug: 'immobilien',
        icon: Home,
        description: 'Real estate websites, exposés and lead generation',
        services: ['Agent Website', 'Property Listings', 'Lead Capture'],
        badge: 'Real Estate',
      },
      {
        name: 'Service Providers & Consultants',
        slug: 'dienstleister',
        icon: Briefcase,
        description: 'Personal branding and client acquisition for freelancers and consultants',
        services: ['Personal Branding', 'Landing Pages', 'Funnel Marketing'],
        badge: 'Services',
      },
    ],
    cta: {
      title: "Your industry not listed?",
      description: 'We develop individual solutions for every industry. Talk to us about your specific requirements.',
      button: 'Free Consultation',
    },
  },
  ru: {
    title: 'Отраслевые решения',
    subtitle: 'Цифровая экспертиза для вашей отрасли',
    description: 'Мы понимаем специфические требования вашей отрасли. С индивидуальными решениями для веб-дизайна, SEO и цифрового маркетинга.',
    industries: [
      {
        name: 'Врачи и здравоохранение',
        slug: 'aerzte',
        icon: Stethoscope,
        description: 'Сайты клиник, привлечение пациентов и медицинское SEO',
        services: ['Сайт клиники', 'Локальное SEO', 'Google Business'],
        badge: 'Медицина',
      },
      {
        name: 'Юристы и адвокаты',
        slug: 'rechtsanwaelte',
        icon: Scale,
        description: 'Профессиональное онлайн-присутствие и привлечение клиентов',
        services: ['Сайт юрфирмы', 'Контент-маркетинг', 'Репутация'],
        badge: 'Право',
      },
      {
        name: 'E-Commerce и интернет-магазины',
        slug: 'ecommerce',
        icon: ShoppingBag,
        description: 'Разработка магазинов, оптимизация конверсий и performance-маркетинг',
        services: ['Shopify/WooCommerce', 'Google Shopping', 'CRO'],
        badge: 'Ритейл',
      },
      {
        name: 'B2B и промышленность',
        slug: 'b2b',
        icon: Factory,
        description: 'Генерация лидов и цифровая трансформация для B2B-компаний',
        services: ['Генерация лидов', 'LinkedIn маркетинг', 'ABM'],
        badge: 'B2B',
      },
      {
        name: 'Стартапы и технологии',
        slug: 'startups',
        icon: Rocket,
        description: 'Быстрый выход на рынок и growth hacking для стартапов',
        services: ['MVP дизайн', 'Growth маркетинг', 'Pitch Decks'],
        badge: 'Tech',
      },
      {
        name: 'Рестораны и отели',
        slug: 'gastronomie',
        icon: UtensilsCrossed,
        description: 'Системы бронирования, локальное SEO и управление отзывами',
        services: ['Сайт ресторана', 'Google Maps SEO', 'Отзывы'],
        badge: 'HoReCa',
      },
      {
        name: 'Недвижимость',
        slug: 'immobilien',
        icon: Home,
        description: 'Сайты недвижимости, экспозе и генерация лидов',
        services: ['Сайт агента', 'Листинги объектов', 'Lead Capture'],
        badge: 'Недвижимость',
      },
      {
        name: 'Услуги и консалтинг',
        slug: 'dienstleister',
        icon: Briefcase,
        description: 'Персональный брендинг и привлечение клиентов для фрилансеров',
        services: ['Персональный бренд', 'Лендинги', 'Воронки продаж'],
        badge: 'Услуги',
      },
    ],
    cta: {
      title: 'Вашей отрасли нет в списке?',
      description: 'Мы разрабатываем индивидуальные решения для любой отрасли. Расскажите нам о ваших специфических требованиях.',
      button: 'Бесплатная консультация',
    },
  },
}

export default function BranchenPage() {
  const params = useParams()
  const locale = (params?.locale as 'de' | 'en' | 'ru') || 'de'
  const content = industries[locale] || industries.de

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Building2 className="h-3 w-3 mr-1" />
              {locale === 'de' ? '8 Branchen' : locale === 'ru' ? '8 отраслей' : '8 Industries'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {content.subtitle}
            </p>
            <p className="text-muted-foreground">
              {content.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Industries Grid */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {content.industries.map((industry) => {
              const Icon = industry.icon
              return (
                <NextLink key={industry.slug} href={`/branchen/${industry.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="outline" className="text-xs">{industry.badge}</Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {industry.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {industry.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1.5">
                        {industry.services.map((service) => (
                          <Badge key={service} variant="secondary" className="text-xs font-normal">
                            {service}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center text-sm text-primary font-medium">
                        {locale === 'de' ? 'Mehr erfahren' : locale === 'ru' ? 'Подробнее' : 'Learn more'}
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </NextLink>
              )
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.cta.title}</h2>
            <p className="mb-6 opacity-90">{content.cta.description}</p>
            <NextLink
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {content.cta.button}
              <ArrowRight className="h-4 w-4" />
            </NextLink>
          </div>
        </Container>
      </section>
    </>
  )
}
