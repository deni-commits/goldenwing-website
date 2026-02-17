'use client'

import NextLink from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowRight, Calculator, Clock, CheckCircle, Euro, Palette, Search, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'

const guides = {
  de: {
    title: 'Praxis-Guides',
    subtitle: 'Kosten, Planung und Umsetzung',
    description: 'Ausführliche Anleitungen mit konkreten Preisen, Checklisten und Experten-Tipps. Alles, was Sie für fundierte Entscheidungen brauchen.',
    items: [
      {
        slug: 'webdesign-kosten',
        title: 'Was kostet Webdesign 2026?',
        description: 'Der komplette Preis-Guide: Von der einfachen Website bis zur Enterprise-Lösung. Mit Preistabellen und ROI-Rechner.',
        icon: Euro,
        readTime: '12 Min.',
        topics: ['Preisfaktoren', 'Kostentabelle', 'Agentur vs. Freelancer', 'Versteckte Kosten'],
        highlight: 'Bestseller',
      },
      {
        slug: 'seo-kosten',
        title: 'SEO Kosten & Budget planen',
        description: 'Was kostet professionelles SEO? Monatliche vs. einmalige Kosten, Agenturpreise und wie Sie Ihr Budget optimal einsetzen.',
        icon: Search,
        readTime: '10 Min.',
        topics: ['Monatliche Kosten', 'Einmalkosten', 'ROI berechnen', 'Budget-Empfehlungen'],
        highlight: 'Praktisch',
      },
      {
        slug: 'website-erstellen-lassen',
        title: 'Website erstellen lassen: Komplett-Guide',
        description: 'Schritt-für-Schritt Anleitung: Von der Planung über die Agenturwahl bis zum erfolgreichen Launch.',
        icon: Palette,
        readTime: '15 Min.',
        topics: ['Anforderungen definieren', 'Agentur finden', 'Briefing erstellen', 'Projekt managen'],
        highlight: 'Umfassend',
      },
      {
        slug: 'online-marketing-budget',
        title: 'Online Marketing Budget richtig planen',
        description: 'Wie viel sollten Sie für Google Ads, SEO und Social Media ausgeben? Mit Branchen-Benchmarks und Budget-Rechner.',
        icon: Calculator,
        readTime: '8 Min.',
        topics: ['Budget-Verteilung', 'Kanal-Auswahl', 'Branchen-Benchmarks', 'Erfolgsmessung'],
        highlight: 'Strategisch',
      },
    ],
    features: {
      title: 'Warum unsere Guides?',
      items: [
        { icon: CheckCircle, text: 'Konkrete Preise und Zahlen aus der Praxis' },
        { icon: Clock, text: 'Regelmäßig aktualisiert (Stand 2026)' },
        { icon: Users, text: 'Von Experten mit 10+ Jahren Erfahrung' },
      ],
    },
  },
  en: {
    title: 'Practice Guides',
    subtitle: 'Costs, planning and implementation',
    description: 'Detailed guides with concrete prices, checklists and expert tips. Everything you need for informed decisions.',
    items: [
      {
        slug: 'webdesign-kosten',
        title: 'What does web design cost in 2026?',
        description: 'The complete price guide: From simple website to enterprise solution. With price tables and ROI calculator.',
        icon: Euro,
        readTime: '12 Min.',
        topics: ['Price factors', 'Cost table', 'Agency vs. Freelancer', 'Hidden costs'],
        highlight: 'Bestseller',
      },
      {
        slug: 'seo-kosten',
        title: 'SEO costs & budget planning',
        description: 'What does professional SEO cost? Monthly vs. one-time costs, agency prices and how to use your budget optimally.',
        icon: Search,
        readTime: '10 Min.',
        topics: ['Monthly costs', 'One-time costs', 'Calculate ROI', 'Budget recommendations'],
        highlight: 'Practical',
      },
      {
        slug: 'website-erstellen-lassen',
        title: 'Having a website created: Complete guide',
        description: 'Step-by-step guide: From planning to agency selection to successful launch.',
        icon: Palette,
        readTime: '15 Min.',
        topics: ['Define requirements', 'Find agency', 'Create briefing', 'Manage project'],
        highlight: 'Comprehensive',
      },
      {
        slug: 'online-marketing-budget',
        title: 'Planning online marketing budget correctly',
        description: 'How much should you spend on Google Ads, SEO and social media? With industry benchmarks and budget calculator.',
        icon: Calculator,
        readTime: '8 Min.',
        topics: ['Budget allocation', 'Channel selection', 'Industry benchmarks', 'Success measurement'],
        highlight: 'Strategic',
      },
    ],
    features: {
      title: 'Why our guides?',
      items: [
        { icon: CheckCircle, text: 'Concrete prices and figures from practice' },
        { icon: Clock, text: 'Regularly updated (as of 2026)' },
        { icon: Users, text: 'By experts with 10+ years experience' },
      ],
    },
  },
  ru: {
    title: 'Практические гайды',
    subtitle: 'Стоимость, планирование и реализация',
    description: 'Подробные руководства с конкретными ценами, чек-листами и советами экспертов. Все, что нужно для принятия обоснованных решений.',
    items: [
      {
        slug: 'webdesign-kosten',
        title: 'Сколько стоит веб-дизайн в 2026?',
        description: 'Полный прайс-гайд: от простого сайта до enterprise-решения. С таблицами цен и калькулятором ROI.',
        icon: Euro,
        readTime: '12 мин.',
        topics: ['Факторы цены', 'Таблица стоимости', 'Агентство vs. Фрилансер', 'Скрытые расходы'],
        highlight: 'Бестселлер',
      },
      {
        slug: 'seo-kosten',
        title: 'Стоимость SEO и планирование бюджета',
        description: 'Сколько стоит профессиональное SEO? Месячные vs. разовые расходы, цены агентств и как оптимально использовать бюджет.',
        icon: Search,
        readTime: '10 мин.',
        topics: ['Месячные расходы', 'Разовые расходы', 'Расчет ROI', 'Рекомендации по бюджету'],
        highlight: 'Практично',
      },
      {
        slug: 'website-erstellen-lassen',
        title: 'Заказать создание сайта: Полный гайд',
        description: 'Пошаговое руководство: от планирования через выбор агентства до успешного запуска.',
        icon: Palette,
        readTime: '15 мин.',
        topics: ['Определить требования', 'Найти агентство', 'Создать бриф', 'Управлять проектом'],
        highlight: 'Комплексно',
      },
      {
        slug: 'online-marketing-budget',
        title: 'Правильное планирование бюджета на маркетинг',
        description: 'Сколько тратить на Google Ads, SEO и соцсети? С отраслевыми бенчмарками и калькулятором бюджета.',
        icon: Calculator,
        readTime: '8 мин.',
        topics: ['Распределение бюджета', 'Выбор каналов', 'Отраслевые бенчмарки', 'Измерение успеха'],
        highlight: 'Стратегически',
      },
    ],
    features: {
      title: 'Почему наши гайды?',
      items: [
        { icon: CheckCircle, text: 'Конкретные цены и цифры из практики' },
        { icon: Clock, text: 'Регулярно обновляются (актуально на 2026)' },
        { icon: Users, text: 'От экспертов с 10+ лет опыта' },
      ],
    },
  },
}

export default function GuidesPage() {
  const params = useParams()
  const locale = (params?.locale as 'de' | 'en' | 'ru') || 'de'
  const c = guides[locale] || guides.de

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <TrendingUp className="h-3 w-3 mr-1" />
              {locale === 'de' ? '4 ausführliche Guides' : locale === 'ru' ? '4 подробных гайда' : '4 detailed guides'}
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

      {/* Features */}
      <section className="py-8 border-y bg-muted/30">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {c.features.items.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.text} className="flex items-center gap-2 text-sm">
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{feature.text}</span>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {c.items.map((guide) => {
              const Icon = guide.icon
              return (
                <NextLink key={guide.slug} href={`/wissen/guides/${guide.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{guide.readTime}</Badge>
                          <Badge variant="secondary" className="text-xs">{guide.highlight}</Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {guide.title}
                      </CardTitle>
                      <CardDescription>
                        {guide.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {guide.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs font-normal">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-primary font-medium">
                        {locale === 'de' ? 'Guide lesen' : locale === 'ru' ? 'Читать гайд' : 'Read guide'}
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
    </>
  )
}
