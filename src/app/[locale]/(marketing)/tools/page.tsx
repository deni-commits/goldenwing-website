import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Search, Gauge, Palette, Shield, Layers } from 'lucide-react'
import { ToolHero } from '@/components/tools/shared/tool-hero'
import { ToolCard, ToolCardGrid } from '@/components/tools/shared/tool-card'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const isGerman = locale === 'de'
  const isRussian = locale === 'ru'
  const baseUrl = 'https://goldenwing.at'

  return {
    title: isGerman
      ? 'Kostenlose Website-Tools | SEO, Performance & Security Check'
      : isRussian
        ? 'Бесплатные инструменты для сайта | SEO, Performance и Security проверка'
        : 'Free Website Tools | SEO, Performance & Security Check',
    description: isGerman
      ? 'Analysieren Sie Ihre Website kostenlos: SEO Check, Performance Test, Design Analyse und Security Check. Sofort-Ergebnisse ohne Registrierung.'
      : isRussian
        ? 'Анализируйте свой сайт бесплатно: SEO проверка, тест скорости, анализ дизайна и проверка безопасности. Мгновенные результаты без регистрации.'
        : 'Analyze your website for free: SEO check, performance test, design analysis and security check. Instant results, no registration.',
    keywords: isGerman
      ? ['SEO Check', 'Website Analyse', 'Performance Test', 'Security Check', 'kostenlose Tools']
      : isRussian
        ? ['SEO проверка', 'анализ сайта', 'тест скорости', 'проверка безопасности', 'бесплатные инструменты']
        : ['SEO Check', 'Website Analysis', 'Performance Test', 'Security Check', 'free tools'],
    alternates: {
      canonical: isGerman ? `${baseUrl}/tools` : `${baseUrl}/${locale}/tools`,
      languages: {
        de: `${baseUrl}/tools`,
        en: `${baseUrl}/en/tools`,
        ru: `${baseUrl}/ru/tools`,
      },
    },
    openGraph: {
      title: isGerman ? 'Kostenlose Website-Tools' : isRussian ? 'Бесплатные инструменты для сайта' : 'Free Website Tools',
      description: isGerman
        ? 'Analysieren Sie Ihre Website kostenlos mit unseren professionellen Tools.'
        : isRussian
          ? 'Анализируйте свой сайт бесплатно с помощью наших профессиональных инструментов.'
          : 'Analyze your website for free with our professional tools.',
      url: isGerman ? `${baseUrl}/tools` : `${baseUrl}/${locale}/tools`,
      siteName: 'GoldenWing Creative Studios',
      locale: isGerman ? 'de_AT' : isRussian ? 'ru_RU' : 'en_US',
      type: 'website',
    },
  }
}

export default async function ToolsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const isGerman = locale === 'de'
  const isRussian = locale === 'ru'

  const tools = [
    {
      key: 'seoChecker',
      href: `/${locale}/tools/seo-checker`,
      icon: <Search className="h-6 w-6" />,
      title: 'SEO Checker',
      description: isGerman
        ? 'Analysieren Sie Meta-Tags, Überschriften, Bilder, Schema Markup und mehr. Der umfassende SEO Check für Ihre Website.'
        : isRussian
          ? 'Анализируйте мета-теги, заголовки, изображения, Schema разметку и многое другое. Полная SEO проверка для вашего сайта.'
          : 'Analyze meta tags, headings, images, schema markup and more. The comprehensive SEO check for your website.',
      badge: isGerman ? 'Beliebt' : isRussian ? 'Популярно' : 'Popular',
      features: isGerman
        ? ['Meta-Tags & Headings', 'Bilder & Alt-Texte', 'Schema Markup', 'Sitemap & Robots.txt']
        : isRussian
          ? ['Мета-теги и заголовки', 'Изображения и alt-тексты', 'Schema разметка', 'Sitemap и Robots.txt']
          : ['Meta Tags & Headings', 'Images & Alt Texts', 'Schema Markup', 'Sitemap & Robots.txt'],
    },
    {
      key: 'performanceChecker',
      href: `/${locale}/tools/performance-checker`,
      icon: <Gauge className="h-6 w-6" />,
      title: isGerman ? 'Website Speed Test' : isRussian ? 'Тест скорости сайта' : 'Website Speed Test',
      description: isGerman
        ? 'Messen Sie Core Web Vitals, Ladezeiten und Performance. Powered by Google PageSpeed Insights.'
        : isRussian
          ? 'Измерьте Core Web Vitals, время загрузки и производительность. Работает на Google PageSpeed Insights.'
          : 'Measure Core Web Vitals, load times and performance. Powered by Google PageSpeed Insights.',
      features: isGerman
        ? ['Core Web Vitals', 'LCP, FCP, CLS, TBT', 'Seitengröße', 'Optimierungstipps']
        : isRussian
          ? ['Core Web Vitals', 'LCP, FCP, CLS, TBT', 'Размер страницы', 'Советы по оптимизации']
          : ['Core Web Vitals', 'LCP, FCP, CLS, TBT', 'Page Size', 'Optimization Tips'],
    },
    {
      key: 'websiteDesign',
      href: `/${locale}/tools/website-design`,
      icon: <Palette className="h-6 w-6" />,
      title: isGerman ? 'Website & Design Check' : isRussian ? 'Проверка дизайна сайта' : 'Website & Design Check',
      description: isGerman
        ? 'Prüfen Sie Mobile-Optimierung, Favicon, Open Graph Tags und Social Media Vorschauen.'
        : isRussian
          ? 'Проверьте мобильную оптимизацию, фавикон, Open Graph теги и превью для соцсетей.'
          : 'Check mobile optimization, favicon, Open Graph tags, and social media previews.',
      features: isGerman
        ? ['Mobile-Optimierung', 'Open Graph Tags', 'Favicon & Icons', 'Twitter Cards']
        : isRussian
          ? ['Мобильная оптимизация', 'Open Graph теги', 'Фавикон и иконки', 'Twitter Cards']
          : ['Mobile Optimization', 'Open Graph Tags', 'Favicon & Icons', 'Twitter Cards'],
    },
    {
      key: 'security',
      href: `/${locale}/tools/security`,
      icon: <Shield className="h-6 w-6" />,
      title: isGerman ? 'Cyber Security Check' : isRussian ? 'Проверка безопасности' : 'Cyber Security Check',
      description: isGerman
        ? 'Prüfen Sie SSL-Zertifikat, Security Headers, HTTPS und Cookie-Sicherheit Ihrer Website.'
        : isRussian
          ? 'Проверьте SSL-сертификат, заголовки безопасности, HTTPS и безопасность cookies вашего сайта.'
          : 'Check SSL certificate, security headers, HTTPS, and cookie security of your website.',
      features: isGerman
        ? ['SSL-Zertifikat', 'Security Headers', 'HTTPS Check', 'Mixed Content']
        : isRussian
          ? ['SSL-сертификат', 'Заголовки безопасности', 'HTTPS проверка', 'Смешанный контент']
          : ['SSL Certificate', 'Security Headers', 'HTTPS Check', 'Mixed Content'],
    },
    {
      key: 'seoPerformance',
      href: `/${locale}/tools/seo-performance`,
      icon: (
        <div className="flex gap-1">
          <Layers className="h-6 w-6" />
        </div>
      ),
      title: isGerman ? 'SEO & Performance (Kombi)' : isRussian ? 'SEO & Performance (Комбо)' : 'SEO & Performance (Combined)',
      description: isGerman
        ? 'Kombinierte Analyse von SEO-Faktoren und Website-Performance in einem Tool.'
        : isRussian
          ? 'Комбинированный анализ SEO-факторов и производительности сайта в одном инструменте.'
          : 'Combined analysis of SEO factors and website performance in one tool.',
      features: isGerman
        ? ['Meta-Tags', 'Core Web Vitals', 'Schema Markup', 'PageSpeed']
        : isRussian
          ? ['Мета-теги', 'Core Web Vitals', 'Schema разметка', 'PageSpeed']
          : ['Meta Tags', 'Core Web Vitals', 'Schema Markup', 'PageSpeed'],
    },
  ]

  return (
    <>
      <ToolHero
        badge={isGerman ? 'Kostenlose Tools' : isRussian ? 'Бесплатные инструменты' : 'Free Tools'}
        title={isGerman ? 'Website Analyse Tools' : isRussian ? 'Инструменты анализа сайта' : 'Website Analysis Tools'}
        description={isGerman
          ? 'Analysieren Sie Ihre Website kostenlos und sofort. Keine Registrierung erforderlich.'
          : isRussian
            ? 'Анализируйте свой сайт бесплатно и мгновенно. Регистрация не требуется.'
            : 'Analyze your website for free and instantly. No registration required.'}
        icon="🛠️"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {isGerman ? 'Wählen Sie ein Tool' : isRussian ? 'Выберите инструмент' : 'Choose a Tool'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isGerman
                ? 'Jedes Tool analysiert einen spezifischen Aspekt Ihrer Website und liefert konkrete Verbesserungsvorschläge.'
                : isRussian
                  ? 'Каждый инструмент анализирует определенный аспект вашего сайта и предоставляет конкретные рекомендации.'
                  : 'Each tool analyzes a specific aspect of your website and provides concrete improvement suggestions.'}
            </p>
          </div>

          <ToolCardGrid>
            {tools.map((tool) => (
              <ToolCard
                key={tool.key}
                title={tool.title}
                description={tool.description}
                href={tool.href}
                icon={tool.icon}
                badge={tool.badge}
                features={tool.features}
              />
            ))}
          </ToolCardGrid>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10.000+</div>
              <p className="text-muted-foreground">
                {isGerman ? 'Analysen durchgeführt' : isRussian ? 'Проведенных анализов' : 'Analyses performed'}
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">
                {isGerman ? 'Kostenlos & ohne Registrierung' : isRussian ? 'Бесплатно и без регистрации' : 'Free & no registration'}
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">&lt;60s</div>
              <p className="text-muted-foreground">
                {isGerman ? 'Durchschnittliche Analysezeit' : isRussian ? 'Среднее время анализа' : 'Average analysis time'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isGerman
              ? 'Bereit für professionelle Optimierung?'
              : isRussian
                ? 'Готовы к профессиональной оптимизации?'
                : 'Ready for professional optimization?'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {isGerman
              ? 'Unsere Experten helfen Ihnen, die gefundenen Probleme zu beheben und Ihre Website auf das nächste Level zu bringen.'
              : isRussian
                ? 'Наши эксперты помогут вам исправить найденные проблемы и вывести ваш сайт на новый уровень.'
                : 'Our experts help you fix the issues found and take your website to the next level.'}
          </p>
          <a
            href={`/${locale}/kontakt`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
          >
            {isGerman ? 'Kostenloses Erstgespräch' : isRussian ? 'Бесплатная консультация' : 'Free Consultation'}
          </a>
        </div>
      </section>
    </>
  )
}
