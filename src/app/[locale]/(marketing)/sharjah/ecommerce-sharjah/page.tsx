import { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, CheckCircle, ShoppingCart, CreditCard, Truck, Globe, Package, BarChart3, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Container } from '@/components/ui/container'
import { FAQSchema, BreadcrumbListSchema } from '@/components/seo/json-ld'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const pageData = {
  de: {
    meta: {
      title: 'E-Commerce Entwicklung Sharjah | Online Shop VAE | GoldenWing',
      description: 'E-Commerce Agentur in Sharjah. Wir entwickeln Online-Shops mit UAE Payment Gateway Integration. ✓ Shopify ✓ WooCommerce ✓ Custom Solutions ✓ Mehrsprachig',
      keywords: ['ecommerce sharjah', 'online shop sharjah', 'ecommerce entwicklung sharjah', 'shopify sharjah'],
    },
    hero: {
      badge: 'E-Commerce Sharjah',
      title: 'E-Commerce Entwicklung für Sharjah',
      subtitle: 'Online verkaufen. Lokal verstehen. Global wachsen.',
      description: 'GoldenWing entwickelt leistungsstarke Online-Shops für den Sharjah Markt. Mit UAE Payment Integration, Logistik-Anbindung und mehrsprachigem Support.',
      ctaPrimary: 'Kostenlose Beratung',
      ctaSecondary: 'Referenzen ansehen',
    },
    services: {
      title: 'Unsere E-Commerce Services',
      items: [
        { icon: ShoppingCart, title: 'Online Shop Entwicklung', description: 'Maßgeschneiderte E-Commerce-Lösungen für Sharjah Unternehmen.' },
        { icon: CreditCard, title: 'UAE Payment Integration', description: 'Tabby, Tamara, Network International, PayBy und mehr.' },
        { icon: Globe, title: 'Mehrsprachige Shops', description: 'EN/AR Shops mit RTL-Support für den arabischen Markt.' },
        { icon: Truck, title: 'Logistik Integration', description: 'Aramex, Fetchr, Emirates Post und lokale Anbieter.' },
        { icon: Package, title: 'Inventory Management', description: 'Bestandsverwaltung und Warehouse-Anbindung.' },
        { icon: BarChart3, title: 'Analytics & Reporting', description: 'Umsatz-Tracking und Conversion-Optimierung.' },
      ],
    },
    platforms: {
      title: 'Plattformen',
      items: ['Shopify Plus', 'WooCommerce', 'Magento', 'Custom Development', 'Headless Commerce'],
    },
    pricing: {
      title: 'E-Commerce Pakete für Sharjah',
      packages: [
        { name: 'Starter', price: 'AED 18.000', description: 'Für kleine Online-Shops', features: ['Bis zu 100 Produkte', 'Basis Payment Gateway', '1 Sprache', 'Responsive Design', 'Basis SEO'] },
        { name: 'Business', price: 'AED 45.000', description: 'Für wachsende Händler', features: ['Unbegrenzte Produkte', 'Multi-Payment Gateway', '2 Sprachen (EN/AR)', 'RTL Support', 'Logistik Integration', 'Advanced Analytics'], popular: true },
        { name: 'Enterprise', price: 'Auf Anfrage', description: 'Für große Händler', features: ['Custom Development', 'Multi-Store Setup', 'ERP Integration', 'B2B & B2C Features', 'Dedicated Support', '24/7 Monitoring'] },
      ],
    },
    faqs: [
      { question: 'Welche Payment Gateways unterstützen Sie in den VAE?', answer: 'Wir integrieren alle gängigen UAE Payment Gateways: Network International, Telr, PayTabs, Checkout.com sowie Buy Now Pay Later Optionen wie Tabby und Tamara.' },
      { question: 'Können Sie bestehende Shops migrieren?', answer: 'Ja, wir migrieren bestehende Shops von allen Plattformen. Ihre Produkte, Kunden und Bestellhistorie werden sicher übertragen.' },
      { question: 'Bieten Sie auch Wartung und Support?', answer: 'Ja, wir bieten Wartungspakete mit regelmäßigen Updates, Sicherheitspatches und technischem Support.' },
      { question: 'Wie lange dauert die Entwicklung eines Online-Shops?', answer: 'Ein typischer Online-Shop dauert 6-12 Wochen. Einfache Shopify-Setups können in 3-4 Wochen fertig sein, während komplexe Custom-Lösungen länger dauern.' },
      { question: 'Unterstützen Sie auch B2B E-Commerce?', answer: 'Ja, wir entwickeln B2B E-Commerce Plattformen mit kundenspezifischen Preisen, Mengenrabatten und Bestell-Workflows.' },
    ],
    cta: {
      title: 'Bereit für Ihren Online-Shop?',
      description: 'Lassen Sie uns über Ihr E-Commerce Projekt in Sharjah sprechen.',
      button: 'Kostenlose Beratung',
    },
  },
  en: {
    meta: {
      title: 'E-Commerce Development Sharjah | Online Store UAE | GoldenWing',
      description: 'E-Commerce agency in Sharjah. We develop online stores with UAE payment gateway integration. ✓ Shopify ✓ WooCommerce ✓ Custom Solutions ✓ Multilingual',
      keywords: ['ecommerce sharjah', 'online store sharjah', 'ecommerce development sharjah', 'shopify sharjah'],
    },
    hero: {
      badge: 'E-Commerce Sharjah',
      title: 'E-Commerce Development for Sharjah',
      subtitle: 'Sell online. Understand locally. Grow globally.',
      description: 'GoldenWing develops powerful online stores for the Sharjah market. With UAE payment integration, logistics connection, and multilingual support.',
      ctaPrimary: 'Get Free Consultation',
      ctaSecondary: 'View Case Studies',
    },
    services: {
      title: 'Our E-Commerce Services',
      items: [
        { icon: ShoppingCart, title: 'Online Store Development', description: 'Custom e-commerce solutions for Sharjah businesses.' },
        { icon: CreditCard, title: 'UAE Payment Integration', description: 'Tabby, Tamara, Network International, PayBy and more.' },
        { icon: Globe, title: 'Multilingual Stores', description: 'EN/AR stores with RTL support for the Arabic market.' },
        { icon: Truck, title: 'Logistics Integration', description: 'Aramex, Fetchr, Emirates Post and local providers.' },
        { icon: Package, title: 'Inventory Management', description: 'Stock management and warehouse connection.' },
        { icon: BarChart3, title: 'Analytics & Reporting', description: 'Revenue tracking and conversion optimization.' },
      ],
    },
    platforms: {
      title: 'Platforms',
      items: ['Shopify Plus', 'WooCommerce', 'Magento', 'Custom Development', 'Headless Commerce'],
    },
    pricing: {
      title: 'E-Commerce Packages for Sharjah',
      packages: [
        { name: 'Starter', price: 'AED 18,000', description: 'For small online stores', features: ['Up to 100 products', 'Basic payment gateway', '1 language', 'Responsive design', 'Basic SEO'] },
        { name: 'Business', price: 'AED 45,000', description: 'For growing merchants', features: ['Unlimited products', 'Multi-payment gateway', '2 languages (EN/AR)', 'RTL support', 'Logistics integration', 'Advanced analytics'], popular: true },
        { name: 'Enterprise', price: 'On Request', description: 'For large merchants', features: ['Custom development', 'Multi-store setup', 'ERP integration', 'B2B & B2C features', 'Dedicated support', '24/7 monitoring'] },
      ],
    },
    faqs: [
      { question: 'Which payment gateways do you support in the UAE?', answer: 'We integrate all common UAE payment gateways: Network International, Telr, PayTabs, Checkout.com as well as Buy Now Pay Later options like Tabby and Tamara.' },
      { question: 'Can you migrate existing stores?', answer: 'Yes, we migrate existing stores from all platforms. Your products, customers, and order history are transferred securely.' },
      { question: 'Do you offer maintenance and support?', answer: 'Yes, we offer maintenance packages with regular updates, security patches, and technical support.' },
      { question: 'How long does it take to develop an online store?', answer: 'A typical online store takes 6-12 weeks. Simple Shopify setups can be done in 3-4 weeks, while complex custom solutions take longer.' },
      { question: 'Do you support B2B e-commerce?', answer: 'Yes, we develop B2B e-commerce platforms with customer-specific pricing, volume discounts, and order workflows.' },
    ],
    cta: {
      title: 'Ready for Your Online Store?',
      description: "Let's discuss your e-commerce project in Sharjah.",
      button: 'Get Free Consultation',
    },
  },
  ru: {
    meta: {
      title: 'Разработка интернет-магазинов Шарджа | Электронная коммерция ОАЭ | GoldenWing',
      description: 'Агентство электронной коммерции в Шардже. Разрабатываем интернет-магазины с интеграцией платёжных систем ОАЭ. ✓ Shopify ✓ WooCommerce ✓ Индивидуальные решения ✓ Многоязычность',
      keywords: ['электронная коммерция шарджа', 'интернет-магазин шарджа', 'разработка ecommerce шарджа', 'shopify шарджа'],
    },
    hero: {
      badge: 'E-Commerce Шарджа',
      title: 'Разработка интернет-магазинов для Шарджи',
      subtitle: 'Продавайте онлайн. Понимайте локально. Растите глобально.',
      description: 'GoldenWing разрабатывает мощные интернет-магазины для рынка Шарджи. С интеграцией платёжных систем ОАЭ, логистикой и многоязычной поддержкой.',
      ctaPrimary: 'Бесплатная консультация',
      ctaSecondary: 'Смотреть портфолио',
    },
    services: {
      title: 'Наши услуги электронной коммерции',
      items: [
        { icon: ShoppingCart, title: 'Разработка интернет-магазинов', description: 'Индивидуальные e-commerce решения для бизнеса в Шардже.' },
        { icon: CreditCard, title: 'Интеграция платёжных систем ОАЭ', description: 'Tabby, Tamara, Network International, PayBy и другие.' },
        { icon: Globe, title: 'Многоязычные магазины', description: 'EN/AR магазины с поддержкой RTL для арабского рынка.' },
        { icon: Truck, title: 'Интеграция логистики', description: 'Aramex, Fetchr, Emirates Post и локальные провайдеры.' },
        { icon: Package, title: 'Управление складом', description: 'Управление запасами и интеграция со складом.' },
        { icon: BarChart3, title: 'Аналитика и отчётность', description: 'Отслеживание выручки и оптимизация конверсии.' },
      ],
    },
    platforms: {
      title: 'Платформы',
      items: ['Shopify Plus', 'WooCommerce', 'Magento', 'Индивидуальная разработка', 'Headless Commerce'],
    },
    pricing: {
      title: 'Пакеты электронной коммерции для Шарджи',
      packages: [
        { name: 'Стартовый', price: 'AED 18 000', description: 'Для небольших интернет-магазинов', features: ['До 100 товаров', 'Базовый платёжный шлюз', '1 язык', 'Адаптивный дизайн', 'Базовое SEO'] },
        { name: 'Бизнес', price: 'AED 45 000', description: 'Для растущих продавцов', features: ['Неограниченное количество товаров', 'Мульти-платёжный шлюз', '2 языка (EN/AR)', 'Поддержка RTL', 'Интеграция логистики', 'Расширенная аналитика'], popular: true },
        { name: 'Корпоративный', price: 'По запросу', description: 'Для крупных продавцов', features: ['Индивидуальная разработка', 'Мульти-магазин', 'Интеграция ERP', 'B2B и B2C функции', 'Выделенная поддержка', 'Мониторинг 24/7'] },
      ],
    },
    faqs: [
      { question: 'Какие платёжные шлюзы вы поддерживаете в ОАЭ?', answer: 'Мы интегрируем все популярные платёжные шлюзы ОАЭ: Network International, Telr, PayTabs, Checkout.com, а также опции рассрочки Tabby и Tamara.' },
      { question: 'Можете ли вы мигрировать существующие магазины?', answer: 'Да, мы мигрируем существующие магазины со всех платформ. Ваши товары, клиенты и история заказов переносятся безопасно.' },
      { question: 'Предлагаете ли вы обслуживание и поддержку?', answer: 'Да, мы предлагаем пакеты обслуживания с регулярными обновлениями, патчами безопасности и технической поддержкой.' },
      { question: 'Сколько времени занимает разработка интернет-магазина?', answer: 'Типичный интернет-магазин занимает 6-12 недель. Простые настройки Shopify могут быть выполнены за 3-4 недели, в то время как сложные индивидуальные решения требуют больше времени.' },
      { question: 'Поддерживаете ли вы B2B электронную коммерцию?', answer: 'Да, мы разрабатываем B2B e-commerce платформы с индивидуальными ценами, оптовыми скидками и рабочими процессами заказов.' },
    ],
    cta: {
      title: 'Готовы к своему интернет-магазину?',
      description: 'Давайте обсудим ваш e-commerce проект в Шардже.',
      button: 'Бесплатная консультация',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/sharjah/ecommerce-sharjah', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/sharjah/ecommerce-sharjah', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: { de: 'de_AT', en: 'en_AE', ru: 'ru_RU' }[locale],
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl('/sharjah/ecommerce-sharjah', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function EcommerceSharjahPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: '/' },
    { name: { de: 'Sharjah', en: 'Sharjah', ru: 'Шарджа' }[locale], url: '/sharjah' },
    { name: 'E-Commerce', url: '/sharjah/ecommerce-sharjah' },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.hero.title,
    description: data.meta.description,
    url: `https://goldenwing.at/${locale}/sharjah/ecommerce-sharjah`,
    provider: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'DAMAC Executive Bay Tower B, Office 1406',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Sharjah',
      containedInPlace: {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
    },
    serviceType: { de: 'E-Commerce Entwicklung', en: 'E-Commerce Development', ru: 'Разработка интернет-магазинов' }[locale],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FAQSchema items={data.faqs} />
      <BreadcrumbListSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50/50 to-background dark:from-[#0a0a0a]/20">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-muted text-foreground dark:bg-[#0a0a0a] dark:text-gold">{data.hero.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {data.hero.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-foreground dark:text-foreground mb-4">
              {data.hero.subtitle}
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              {data.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/kontakt">
                  {data.hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/referenzen">
                  {data.hero.ctaSecondary}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Platforms */}
      <section className="py-12 bg-primary text-white">
        <Container variant="block">
          <h2 className="text-xl font-semibold mb-6 text-center">{data.platforms.title}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.platforms.items.map((platform) => (
              <span key={platform} className="px-4 py-2 bg-white/10 rounded-full text-sm">
                {platform}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.services.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.items.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow hover:border-border dark:hover:border-primary">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-muted dark:bg-[#0a0a0a]/50 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-foreground dark:text-foreground" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.pricing.title}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.pricing.packages.map((pkg) => (
              <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-primary shadow-lg' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    {{ de: 'Beliebteste Wahl', en: 'Most Popular', ru: 'Самый популярный' }[locale]}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-foreground dark:text-foreground mt-2">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-foreground dark:text-foreground shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-6 ${pkg.popular ? 'bg-primary hover:bg-primary/90' : ''}`} variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <Link href="/kontakt">
                      {{ de: 'Jetzt starten', en: 'Get Started', ru: 'Начать' }[locale]}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {{ de: 'Häufig gestellte Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale]}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {data.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.cta.title}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{data.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/kontakt">
                {data.cta.button}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10" asChild>
              <NextLink href="https://wa.me/message/DTMCVZBIQJ3FH1" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* Related Links */}
      <section className="py-12 border-t">
        <Container variant="block">
          <h3 className="font-semibold mb-6">{{ de: 'Verwandte Services', en: 'Related Services', ru: 'Связанные услуги' }[locale]}</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/sharjah" className="text-muted-foreground hover:text-foreground">
              {{ de: 'Alle Sharjah Services', en: 'All Sharjah Services', ru: 'Все услуги в Шардже' }[locale]}
            </Link>
            <NextLink href={`/${locale}/sharjah/web-design-sharjah`} className="text-muted-foreground hover:text-foreground">
              {{ de: 'Webdesign Sharjah', en: 'Web Design Sharjah', ru: 'Веб-дизайн Шарджа' }[locale]}
            </NextLink>
            <NextLink href={`/${locale}/sharjah/seo-sharjah`} className="text-muted-foreground hover:text-foreground">
              SEO Sharjah
            </NextLink>
            <Link href="/dubai/ecommerce-development-dubai" className="text-muted-foreground hover:text-foreground">
              {{ de: 'E-Commerce Dubai', en: 'E-Commerce Dubai', ru: 'E-Commerce Дубай' }[locale]}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
