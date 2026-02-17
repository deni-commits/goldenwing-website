'use client'

import NextLink from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowRight, BookOpen, FileText, Wrench, GraduationCap, Search, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'

const content = {
  de: {
    title: 'Wissen & Ressourcen',
    subtitle: 'Kostenlose Guides, Tools und Fachwissen',
    description: 'Lernen Sie von unseren Experten. Praxisnahe Anleitungen, SEO-Lexikon und kostenlose Analyse-Tools für Ihren digitalen Erfolg.',
    sections: [
      {
        title: 'Blog',
        description: 'Aktuelle Artikel zu Webdesign, SEO und digitalem Marketing',
        href: '/blog',
        icon: FileText,
        badge: '50+ Artikel',
        highlight: 'Aktuell',
      },
      {
        title: 'SEO Lexikon',
        description: 'Alle wichtigen Begriffe aus SEO und Online-Marketing erklärt',
        href: '/lexikon',
        icon: BookOpen,
        badge: '100+ Begriffe',
        highlight: 'Nachschlagen',
      },
      {
        title: 'Kostenlose Tools',
        description: 'SEO-Checker, Performance-Analyse und mehr — völlig kostenlos',
        href: '/tools',
        icon: Wrench,
        badge: '5 Tools',
        highlight: 'Gratis',
      },
      {
        title: 'Praxis-Guides',
        description: 'Ausführliche Anleitungen zu Kosten, Planung und Umsetzung',
        href: '/wissen/guides',
        icon: GraduationCap,
        badge: '4 Guides',
        highlight: 'Neu',
      },
    ],
    popularTopics: {
      title: 'Beliebte Themen',
      topics: [
        { name: 'Was kostet Webdesign?', href: '/wissen/guides/webdesign-kosten' },
        { name: 'SEO Kosten & Budget', href: '/wissen/guides/seo-kosten' },
        { name: 'Website erstellen lassen', href: '/wissen/guides/website-erstellen-lassen' },
        { name: 'Marketing Budget planen', href: '/wissen/guides/online-marketing-budget' },
      ],
    },
    cta: {
      title: 'Individuelle Beratung gewünscht?',
      description: 'Unsere Experten helfen Ihnen gerne bei Ihren spezifischen Fragen.',
      button: 'Kostenlose Beratung',
    },
  },
  en: {
    title: 'Knowledge & Resources',
    subtitle: 'Free guides, tools and expertise',
    description: 'Learn from our experts. Practical guides, SEO glossary and free analysis tools for your digital success.',
    sections: [
      {
        title: 'Blog',
        description: 'Current articles on web design, SEO and digital marketing',
        href: '/blog',
        icon: FileText,
        badge: '50+ Articles',
        highlight: 'Current',
      },
      {
        title: 'SEO Glossary',
        description: 'All important terms from SEO and online marketing explained',
        href: '/lexikon',
        icon: BookOpen,
        badge: '100+ Terms',
        highlight: 'Reference',
      },
      {
        title: 'Free Tools',
        description: 'SEO checker, performance analysis and more — completely free',
        href: '/tools',
        icon: Wrench,
        badge: '5 Tools',
        highlight: 'Free',
      },
      {
        title: 'Practice Guides',
        description: 'Detailed guides on costs, planning and implementation',
        href: '/wissen/guides',
        icon: GraduationCap,
        badge: '4 Guides',
        highlight: 'New',
      },
    ],
    popularTopics: {
      title: 'Popular Topics',
      topics: [
        { name: 'What does web design cost?', href: '/wissen/guides/webdesign-kosten' },
        { name: 'SEO costs & budget', href: '/wissen/guides/seo-kosten' },
        { name: 'Having a website created', href: '/wissen/guides/website-erstellen-lassen' },
        { name: 'Planning marketing budget', href: '/wissen/guides/online-marketing-budget' },
      ],
    },
    cta: {
      title: 'Want individual advice?',
      description: 'Our experts are happy to help with your specific questions.',
      button: 'Free Consultation',
    },
  },
  ru: {
    title: 'Знания и ресурсы',
    subtitle: 'Бесплатные гайды, инструменты и экспертиза',
    description: 'Учитесь у наших экспертов. Практические руководства, SEO-глоссарий и бесплатные инструменты анализа для вашего цифрового успеха.',
    sections: [
      {
        title: 'Блог',
        description: 'Актуальные статьи о веб-дизайне, SEO и цифровом маркетинге',
        href: '/blog',
        icon: FileText,
        badge: '50+ статей',
        highlight: 'Актуально',
      },
      {
        title: 'SEO Глоссарий',
        description: 'Все важные термины из SEO и онлайн-маркетинга с объяснениями',
        href: '/lexikon',
        icon: BookOpen,
        badge: '100+ терминов',
        highlight: 'Справочник',
      },
      {
        title: 'Бесплатные инструменты',
        description: 'SEO-проверка, анализ производительности и многое другое — бесплатно',
        href: '/tools',
        icon: Wrench,
        badge: '5 инструментов',
        highlight: 'Бесплатно',
      },
      {
        title: 'Практические гайды',
        description: 'Подробные руководства по стоимости, планированию и реализации',
        href: '/wissen/guides',
        icon: GraduationCap,
        badge: '4 гайда',
        highlight: 'Новое',
      },
    ],
    popularTopics: {
      title: 'Популярные темы',
      topics: [
        { name: 'Сколько стоит веб-дизайн?', href: '/wissen/guides/webdesign-kosten' },
        { name: 'Стоимость SEO и бюджет', href: '/wissen/guides/seo-kosten' },
        { name: 'Заказать создание сайта', href: '/wissen/guides/website-erstellen-lassen' },
        { name: 'Планирование маркетингового бюджета', href: '/wissen/guides/online-marketing-budget' },
      ],
    },
    cta: {
      title: 'Нужна индивидуальная консультация?',
      description: 'Наши эксперты с радостью помогут с вашими конкретными вопросами.',
      button: 'Бесплатная консультация',
    },
  },
}

export default function WissenPage() {
  const params = useParams()
  const locale = (params?.locale as 'de' | 'en' | 'ru') || 'de'
  const c = content[locale] || content.de

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <GraduationCap className="h-3 w-3 mr-1" />
              {locale === 'de' ? 'Kostenlos lernen' : locale === 'ru' ? 'Бесплатное обучение' : 'Learn for free'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {c.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {c.subtitle}
            </p>
            <p className="text-muted-foreground">
              {c.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Sections Grid */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {c.sections.map((section) => {
              const Icon = section.icon
              return (
                <NextLink key={section.href} href={section.href}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">{section.highlight}</Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {section.title}
                      </CardTitle>
                      <CardDescription>
                        {section.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{section.badge}</Badge>
                        <span className="text-sm text-primary font-medium flex items-center">
                          {locale === 'de' ? 'Entdecken' : locale === 'ru' ? 'Открыть' : 'Explore'}
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </NextLink>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">{c.popularTopics.title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {c.popularTopics.topics.map((topic) => (
                <NextLink
                  key={topic.href}
                  href={topic.href}
                  className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-sm transition-all group"
                >
                  <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  <span className="group-hover:text-primary transition-colors">{topic.name}</span>
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{c.cta.title}</h2>
            <p className="mb-6 opacity-90">{c.cta.description}</p>
            <NextLink
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {c.cta.button}
              <ArrowRight className="h-4 w-4" />
            </NextLink>
          </div>
        </Container>
      </section>
    </>
  )
}
