'use client'

import NextLink from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowRight, Search, Star, Award, TrendingUp, Palette, ShoppingCart, Megaphone, Share2, Code, FileText, PenTool, Layout } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'

const comparisons = {
  de: {
    title: 'Agenturvergleiche Wien 2026',
    subtitle: 'Finden Sie die beste Agentur für Ihr Projekt',
    description: 'Unsere unabhängigen Vergleiche helfen Ihnen, die richtige Agentur in Wien zu finden. Basierend auf Kundenbewertungen, Expertise und Preis-Leistungs-Verhältnis.',
    categories: [
      {
        title: 'SEO & Online Marketing',
        items: [
          { name: 'Beste SEO Agenturen Wien', href: '/beste-seo-agenturen-wien', icon: Search, count: 10, badge: 'Top 10' },
          { name: 'Beste SEO Agenturen Österreich', href: '/beste-seo-agenturen-oesterreich', icon: TrendingUp, count: 10, badge: 'Landesweit' },
          { name: 'Beste Online Marketing Agenturen', href: '/beste-online-marketing-agenturen-wien', icon: Megaphone, count: 10, badge: 'Top 10' },
          { name: 'Beste Google Ads Agenturen', href: '/beste-google-ads-agenturen-wien', icon: TrendingUp, count: 10, badge: 'Top 10' },
          { name: 'Beste Content Marketing Agenturen', href: '/beste-content-marketing-agenturen-wien', icon: FileText, count: 10, badge: 'Top 10' },
          { name: 'Beste Social Media Agenturen', href: '/beste-social-media-agenturen-wien', icon: Share2, count: 10, badge: 'Top 10' },
        ],
      },
      {
        title: 'Design & Entwicklung',
        items: [
          { name: 'Beste Webdesign Agenturen Wien', href: '/beste-webdesign-agenturen-wien', icon: Layout, count: 10, badge: 'Top 10' },
          { name: 'Beste Kreativagenturen Wien', href: '/beste-kreativagenturen-wien', icon: Palette, count: 10, badge: 'Top 10' },
          { name: 'Beste Branding Agenturen Wien', href: '/beste-branding-agenturen-wien', icon: Award, count: 10, badge: 'Top 10' },
          { name: 'Beste Grafikdesign Agenturen', href: '/beste-grafikdesign-agenturen-wien', icon: PenTool, count: 10, badge: 'Top 10' },
          { name: 'Beste WordPress Agenturen', href: '/beste-wordpress-agenturen-wien', icon: Code, count: 10, badge: 'Top 10' },
          { name: 'Beste App Entwicklung Agenturen', href: '/beste-app-entwicklung-agenturen-wien', icon: Code, count: 10, badge: 'Top 10' },
        ],
      },
      {
        title: 'E-Commerce & Spezial',
        items: [
          { name: 'Beste E-Commerce Agenturen Wien', href: '/beste-ecommerce-agenturen-wien', icon: ShoppingCart, count: 10, badge: 'Top 10' },
          { name: 'Beste Onlineshop Agenturen', href: '/beste-onlineshop-agenturen-wien', icon: ShoppingCart, count: 10, badge: 'Top 10' },
          { name: 'Beste Digital Marketing Agenturen', href: '/beste-digital-marketing-agenturen-wien', icon: TrendingUp, count: 10, badge: 'Top 10' },
          { name: 'Beste Website Relaunch Agenturen', href: '/beste-website-relaunch-agenturen', icon: Layout, count: 10, badge: 'Spezialist' },
          { name: 'Beste SEO Agenturen für Ärzte', href: '/beste-seo-agenturen-fuer-aerzte', icon: Search, count: 10, badge: 'Branche' },
        ],
      },
    ],
    cta: {
      title: 'Kostenlose Beratung',
      description: 'Sie wissen nicht, welche Agentur die richtige ist? Wir helfen Ihnen gerne bei der Entscheidung.',
      button: 'Jetzt beraten lassen',
    },
    methodology: {
      title: 'Unsere Bewertungsmethodik',
      items: [
        'Google Bewertungen & Rezensionen',
        'Qualität der Referenzprojekte',
        'Branchenerfahrung & Spezialisierung',
        'Preis-Leistungs-Verhältnis',
        'Reaktionszeit & Kundenservice',
        'Transparenz der Arbeitsweise',
      ],
    },
  },
  en: {
    title: 'Agency Comparisons Vienna 2026',
    subtitle: 'Find the best agency for your project',
    description: 'Our independent comparisons help you find the right agency in Vienna. Based on customer reviews, expertise, and value for money.',
    categories: [
      {
        title: 'SEO & Online Marketing',
        items: [
          { name: 'Best SEO Agencies Vienna', href: '/beste-seo-agenturen-wien', icon: Search, count: 10, badge: 'Top 10' },
          { name: 'Best SEO Agencies Austria', href: '/beste-seo-agenturen-oesterreich', icon: TrendingUp, count: 10, badge: 'Nationwide' },
          { name: 'Best Online Marketing Agencies', href: '/beste-online-marketing-agenturen-wien', icon: Megaphone, count: 10, badge: 'Top 10' },
          { name: 'Best Google Ads Agencies', href: '/beste-google-ads-agenturen-wien', icon: TrendingUp, count: 10, badge: 'Top 10' },
          { name: 'Best Content Marketing Agencies', href: '/beste-content-marketing-agenturen-wien', icon: FileText, count: 10, badge: 'Top 10' },
          { name: 'Best Social Media Agencies', href: '/beste-social-media-agenturen-wien', icon: Share2, count: 10, badge: 'Top 10' },
        ],
      },
      {
        title: 'Design & Development',
        items: [
          { name: 'Best Web Design Agencies Vienna', href: '/beste-webdesign-agenturen-wien', icon: Layout, count: 10, badge: 'Top 10' },
          { name: 'Best Creative Agencies Vienna', href: '/beste-kreativagenturen-wien', icon: Palette, count: 10, badge: 'Top 10' },
          { name: 'Best Branding Agencies Vienna', href: '/beste-branding-agenturen-wien', icon: Award, count: 10, badge: 'Top 10' },
          { name: 'Best Graphic Design Agencies', href: '/beste-grafikdesign-agenturen-wien', icon: PenTool, count: 10, badge: 'Top 10' },
          { name: 'Best WordPress Agencies', href: '/beste-wordpress-agenturen-wien', icon: Code, count: 10, badge: 'Top 10' },
          { name: 'Best App Development Agencies', href: '/beste-app-entwicklung-agenturen-wien', icon: Code, count: 10, badge: 'Top 10' },
        ],
      },
      {
        title: 'E-Commerce & Specialty',
        items: [
          { name: 'Best E-Commerce Agencies Vienna', href: '/beste-ecommerce-agenturen-wien', icon: ShoppingCart, count: 10, badge: 'Top 10' },
          { name: 'Best Online Shop Agencies', href: '/beste-onlineshop-agenturen-wien', icon: ShoppingCart, count: 10, badge: 'Top 10' },
          { name: 'Best Digital Marketing Agencies', href: '/beste-digital-marketing-agenturen-wien', icon: TrendingUp, count: 10, badge: 'Top 10' },
          { name: 'Best Website Relaunch Agencies', href: '/beste-website-relaunch-agenturen', icon: Layout, count: 10, badge: 'Specialist' },
          { name: 'Best SEO Agencies for Doctors', href: '/beste-seo-agenturen-fuer-aerzte', icon: Search, count: 10, badge: 'Industry' },
        ],
      },
    ],
    cta: {
      title: 'Free Consultation',
      description: "Not sure which agency is right for you? We're happy to help you decide.",
      button: 'Get advice now',
    },
    methodology: {
      title: 'Our Evaluation Methodology',
      items: [
        'Google reviews & ratings',
        'Quality of reference projects',
        'Industry experience & specialization',
        'Value for money',
        'Response time & customer service',
        'Transparency of approach',
      ],
    },
  },
  ru: {
    title: 'Сравнение агентств Вена 2026',
    subtitle: 'Найдите лучшее агентство для вашего проекта',
    description: 'Наши независимые сравнения помогут вам найти подходящее агентство в Вене. На основе отзывов клиентов, экспертизы и соотношения цена-качество.',
    categories: [
      {
        title: 'SEO и онлайн-маркетинг',
        items: [
          { name: 'Лучшие SEO агентства Вены', href: '/beste-seo-agenturen-wien', icon: Search, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие SEO агентства Австрии', href: '/beste-seo-agenturen-oesterreich', icon: TrendingUp, count: 10, badge: 'По стране' },
          { name: 'Лучшие агентства онлайн-маркетинга', href: '/beste-online-marketing-agenturen-wien', icon: Megaphone, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие Google Ads агентства', href: '/beste-google-ads-agenturen-wien', icon: TrendingUp, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие агентства контент-маркетинга', href: '/beste-content-marketing-agenturen-wien', icon: FileText, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие агентства социальных сетей', href: '/beste-social-media-agenturen-wien', icon: Share2, count: 10, badge: 'Топ 10' },
        ],
      },
      {
        title: 'Дизайн и разработка',
        items: [
          { name: 'Лучшие веб-дизайн агентства', href: '/beste-webdesign-agenturen-wien', icon: Layout, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие креативные агентства', href: '/beste-kreativagenturen-wien', icon: Palette, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие брендинговые агентства', href: '/beste-branding-agenturen-wien', icon: Award, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие агентства графического дизайна', href: '/beste-grafikdesign-agenturen-wien', icon: PenTool, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие WordPress агентства', href: '/beste-wordpress-agenturen-wien', icon: Code, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие агентства разработки приложений', href: '/beste-app-entwicklung-agenturen-wien', icon: Code, count: 10, badge: 'Топ 10' },
        ],
      },
      {
        title: 'E-Commerce и специализация',
        items: [
          { name: 'Лучшие E-Commerce агентства', href: '/beste-ecommerce-agenturen-wien', icon: ShoppingCart, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие агентства интернет-магазинов', href: '/beste-onlineshop-agenturen-wien', icon: ShoppingCart, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие агентства цифрового маркетинга', href: '/beste-digital-marketing-agenturen-wien', icon: TrendingUp, count: 10, badge: 'Топ 10' },
          { name: 'Лучшие агентства редизайна сайтов', href: '/beste-website-relaunch-agenturen', icon: Layout, count: 10, badge: 'Специалист' },
          { name: 'Лучшие SEO агентства для врачей', href: '/beste-seo-agenturen-fuer-aerzte', icon: Search, count: 10, badge: 'Отрасль' },
        ],
      },
    ],
    cta: {
      title: 'Бесплатная консультация',
      description: 'Не знаете, какое агентство вам подходит? Мы с радостью поможем вам с выбором.',
      button: 'Получить консультацию',
    },
    methodology: {
      title: 'Наша методология оценки',
      items: [
        'Отзывы и рейтинги Google',
        'Качество референсных проектов',
        'Отраслевой опыт и специализация',
        'Соотношение цена-качество',
        'Время отклика и обслуживание клиентов',
        'Прозрачность подхода',
      ],
    },
  },
}

export default function VergleichePage() {
  const params = useParams()
  const locale = (params?.locale as 'de' | 'en' | 'ru') || 'de'
  const content = comparisons[locale] || comparisons.de

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3 w-3 mr-1" />
              {locale === 'de' ? '17 Vergleiche' : locale === 'ru' ? '17 сравнений' : '17 Comparisons'}
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

      {/* Methodology Box */}
      <section className="py-8 border-y bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">{content.methodology.title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {content.methodology.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-16">
        <Container>
          <div className="space-y-16">
            {content.categories.map((category) => (
              <div key={category.title}>
                <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <NextLink key={item.href} href={item.href}>
                        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                              </div>
                              <Badge variant="outline">{item.badge}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                              {item.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              {item.count} {locale === 'de' ? 'Agenturen verglichen' : locale === 'ru' ? 'агентств сравнено' : 'agencies compared'}
                              <ArrowRight className="h-3 w-3 ml-auto group-hover:translate-x-1 transition-transform" />
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </NextLink>
                    )
                  })}
                </div>
              </div>
            ))}
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
