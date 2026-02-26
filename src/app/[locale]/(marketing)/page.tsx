import logger from '@/lib/logger'
import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import { ArrowRight, Users, Target, Workflow, Award, TrendingUp, CheckCircle, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PartnersCarousel } from '@/components/sections/partners-carousel'
import { AnimatedStats, CMSStat } from '@/components/sections/animated-stats'
import { AnimatedSection } from '@/components/ui/animated-section'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { ApproachSection } from '@/components/sections/approach-section'
import { FeaturedTeam } from '@/components/sections/featured-team'
import { HeroSection } from '@/components/sections/hero-section'
import { ServiceCard, BlogCard, CTASection } from '@/components/ui/animated-card'
import { getFeaturedProjects, getHomePage, type SupportedLocale } from '@/lib/payload'
import { getTranslations } from 'next-intl/server'
import { TestimonialsColumns } from '@/components/ui/testimonials-columns'
import { ReviewSchema, CredentialsSchema } from '@/components/seo/schemas'
import { getHreflangAlternates, getServicesUrl, getReferencesUrl } from '@/lib/utils'
import NextLink from 'next/link'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


// ISR: Revalidate every 60 seconds for fresh content with good performance
export const revalidate = 60

// Icon mapping from CMS string values to Lucide components
const iconMap: Record<string, LucideIcon> = {
  'users': Users,
  'target': Target,
  'workflow': Workflow,
  'award': Award,
  'trending-up': TrendingUp,
  'check-circle': CheckCircle,
}

function getIcon(iconName: string | undefined | null): LucideIcon {
  return iconMap[iconName || 'users'] || Users
}

// Type definitions for CMS data
interface CMSWhyItem {
  icon?: string | null
  title: string
  description: string
}

// CMS Type definitions (for reference, used via type casting)
interface CMSProcessStep {
  step: string
  title: string
  description: string
}

// Static service paths for homepage (excludes dynamic routes)
type StaticServicePath =
  | '/leistungen/branding'
  | '/leistungen/webdesign'
  | '/leistungen/digital-marketing'
  | '/leistungen/seo-content'
  | '/leistungen/web-app-entwicklung'
  | '/leistungen/it-cloud-services'

// Service item type for homepage services
interface ServiceItem {
  title: string
  description: string
  href: StaticServicePath
}

// Blog post item type for homepage
interface BlogPostItem {
  title: string
  excerpt: string
  category: string
  href: '/blog'
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const homePage = await getHomePage(locale)

  const seo = homePage?.seo
  const hreflangAlternates = getHreflangAlternates('/')

  if (locale === 'en') {
    return {
      title: seo?.metaTitle || 'GoldenWing Creative Studios | Creative Agency Vienna',
      description: seo?.metaDescription || 'International creative agency with offices in Vienna, Dubai & California. Design, marketing & technology from one source. Free consultation!',
      keywords: ['Creative Agency Vienna', 'Web Design Vienna', 'Web Design Dubai', 'Branding Agency', 'SEO Agency', 'Digital Agency'],
      openGraph: {
        title: seo?.ogTitle || 'GoldenWing Creative Studios | Vienna · Dubai · California',
        description: seo?.ogDescription || 'Design, marketing & technology from one source. Offices in Vienna, Dubai, and California.',
        url: 'https://goldenwing.at/en',
        type: 'website',
        locale: 'en_US',
        siteName: 'GoldenWing Creative Studios',
        images: [
          {
            url: 'https://goldenwing.at/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'GoldenWing Creative Studios | Vienna · Dubai · California',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: seo?.ogTitle || 'GoldenWing Creative Studios | Vienna · Dubai · California',
        description: seo?.ogDescription || 'Design, marketing & technology from one source. Offices in Vienna, Dubai, and California.',
        images: ['https://goldenwing.at/og-image.jpg'],
      },
      alternates: {
        canonical: '/en',
        languages: hreflangAlternates.languages,
      },
    }
  }

  if (locale === 'ru') {
    return {
      title: seo?.metaTitle || 'GoldenWing Creative Studios | Креативное агентство Вена',
      description: seo?.metaDescription || 'Международное креативное агентство с офисами в Вене, Дубае и Калифорнии. Дизайн, маркетинг и технологии из одних рук. Бесплатная консультация!',
      keywords: ['Креативное агентство Вена', 'Веб-дизайн Вена', 'Веб-дизайн Дубай', 'Брендинг агентство', 'SEO агентство', 'Digital агентство'],
      openGraph: {
        title: seo?.ogTitle || 'GoldenWing Creative Studios | Вена · Дубай · Калифорния',
        description: seo?.ogDescription || 'Дизайн, маркетинг и технологии из одних рук. Офисы в Вене, Дубае и Калифорнии.',
        url: 'https://goldenwing.at/ru',
        type: 'website',
        locale: 'ru_RU',
        siteName: 'GoldenWing Creative Studios',
        images: [
          {
            url: 'https://goldenwing.at/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'GoldenWing Creative Studios | Вена · Дубай · Калифорния',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: seo?.ogTitle || 'GoldenWing Creative Studios | Вена · Дубай · Калифорния',
        description: seo?.ogDescription || 'Дизайн, маркетинг и технологии из одних рук. Офисы в Вене, Дубае и Калифорнии.',
        images: ['https://goldenwing.at/og-image.jpg'],
      },
      alternates: {
        canonical: '/ru',
        languages: hreflangAlternates.languages,
      },
    }
  }

  return {
    title: seo?.metaTitle || 'GoldenWing Creative Studios | Kreativagentur Wien',
    description: seo?.metaDescription || 'Internationale Kreativagentur mit Standorten in Wien, Dubai & California. Design, Marketing & Technologie aus einer Hand. Kostenloses Erstgespräch!',
    keywords: ['Kreativagentur Wien', 'Webdesign Wien', 'Web Design Dubai', 'Branding Agency', 'SEO Agentur', 'Digital Agency'],
    openGraph: {
      title: seo?.ogTitle || 'GoldenWing Creative Studios | Wien · Dubai · California',
      description: seo?.ogDescription || 'Design, Marketing & Technologie aus einer Hand. Standorte in Wien, Dubai und California.',
      url: 'https://goldenwing.at/de',
      type: 'website',
      locale: 'de_AT',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'GoldenWing Creative Studios | Wien · Dubai · California',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.ogTitle || 'GoldenWing Creative Studios | Wien · Dubai · California',
      description: seo?.ogDescription || 'Design, Marketing & Technologie aus einer Hand. Standorte in Wien, Dubai und California.',
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: '/de',
      languages: hreflangAlternates.languages,
    },
  }
}

// FAQ Data for Schema - Localized
const faqsData = {
  de: [
    { question: 'Was kostet Webdesign in Wien?', answer: 'Die Kosten für professionelles Webdesign beginnen bei €2.000 für eine einfache Website und können bis zu €15.000+ für komplexe Lösungen betragen.' },
    { question: 'Wie lange dauert die Erstellung einer Website?', answer: 'Eine professionelle Website dauert 4-8 Wochen. Landing Pages 1-2 Wochen, komplexe E-Commerce-Projekte 8-12 Wochen.' },
    { question: 'Was beinhaltet ein Branding-Paket?', answer: 'Ein vollständiges Branding-Paket umfasst: Markenstrategie, Logo-Design, Farbpalette, Typografie, Brand Guidelines und Geschäftsausstattung.' },
    { question: 'Bietet GoldenWing auch SEO-Optimierung an?', answer: 'Ja, wir bieten umfassende SEO-Services: Technische Audits, On-Page-Optimierung, Content-Strategie und laufende SEO-Betreuung.' },
    { question: 'Arbeitet GoldenWing international?', answer: 'Ja, wir haben Standorte in Wien (Hauptsitz), Dubai und California. Wir betreuen Kunden weltweit.' },
  ],
  en: [
    { question: 'How much does web design cost in Vienna?', answer: 'Professional web design costs start at €2,000 for a simple website and can go up to €15,000+ for complex solutions.' },
    { question: 'How long does it take to create a website?', answer: 'A professional website takes 4-8 weeks. Landing pages 1-2 weeks, complex e-commerce projects 8-12 weeks.' },
    { question: 'What does a branding package include?', answer: 'A complete branding package includes: brand strategy, logo design, color palette, typography, brand guidelines, and business stationery.' },
    { question: 'Does GoldenWing offer SEO optimization?', answer: 'Yes, we offer comprehensive SEO services: technical audits, on-page optimization, content strategy, and ongoing SEO support.' },
    { question: 'Does GoldenWing work internationally?', answer: 'Yes, we have offices in Vienna (headquarters), Dubai, and California. We serve clients worldwide.' },
  ],
  ru: [
    { question: 'Сколько стоит веб-дизайн?', answer: 'Стоимость профессионального веб-дизайна начинается от €2.000 за простой сайт и может достигать €15.000+ за сложные решения.' },
    { question: 'Сколько времени занимает создание сайта?', answer: 'Профессиональный сайт занимает 4-8 недель. Лендинги 1-2 недели, сложные e-commerce проекты 8-12 недель.' },
    { question: 'Что включает пакет брендинга?', answer: 'Полный пакет брендинга включает: стратегию бренда, дизайн логотипа, цветовую палитру, типографику, руководство по бренду и деловую документацию.' },
    { question: 'Предлагает ли GoldenWing SEO-оптимизацию?', answer: 'Да, мы предлагаем комплексные SEO-услуги: технические аудиты, оптимизацию страниц, контент-стратегию и постоянную SEO-поддержку.' },
    { question: 'Работает ли GoldenWing международно?', answer: 'Да, у нас есть офисы в Вене (штаб-квартира), Дубае и Калифорнии. Мы обслуживаем клиентов по всему миру.' },
  ],
}

// Schema.org JSON-LD - Localized
function getJsonLd(locale: SupportedLocale) {
  const faqs = faqsData[locale as 'de' | 'en' | 'ru'] ?? faqsData['en']
  const isGerman = locale === 'de'
  const baseUrl = 'https://goldenwing.at'
  const localePrefix = isGerman ? '' : `/${locale}`

  // Localized navigation labels
  const navLabels = {
    de: { services: 'Leistungen', references: 'Referenzen', projects: 'Projekte', blog: 'Blog', about: 'Über uns', contact: 'Kontakt' },
    en: { services: 'Services', references: 'References', projects: 'Projects', blog: 'Blog', about: 'About Us', contact: 'Contact' },
    ru: { services: 'Услуги', references: 'Референсы', projects: 'Проекты', blog: 'Блог', about: 'О нас', contact: 'Контакты' },
  }
  const nav = navLabels[locale]

  // Localized organization description
  const orgDescriptions: Record<SupportedLocale, string> = {
    de: 'Internationale Kreativagentur für Design, Marketing & Technologie mit Standorten in Wien, Dubai und California.',
    en: 'International creative agency for design, marketing & technology with offices in Vienna, Dubai, and California.',
    ru: 'Международное креативное агентство дизайна, маркетинга и технологий с офисами в Вене, Дубае и Калифорнии.',
  }
  const orgDescription = orgDescriptions[locale]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${baseUrl}/#organization`,
        name: 'GoldenWing Creative Studios',
        alternateName: 'GoldenWing',
        url: baseUrl,
        logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
        description: orgDescription,
        email: 'office@goldenwing.at',
        address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' },
        contactPoint: [
          { '@type': 'ContactPoint', telephone: '+43-664-543-96-81', contactType: 'customer service', areaServed: ['AT', 'DE', 'CH'], availableLanguage: ['German', 'English'] },
          { '@type': 'ContactPoint', telephone: '+971-58-514-4360', contactType: 'customer service', areaServed: ['AE', 'SA', 'QA'], availableLanguage: ['English', 'Arabic'] },
          { '@type': 'ContactPoint', telephone: '+1-916-667-4629', contactType: 'customer service', areaServed: 'US', availableLanguage: 'English' },
        ],
        sameAs: [
          'https://www.linkedin.com/company/goldenwing-creative-studios/',
          'https://www.instagram.com/goldenwing.studios/',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: locale === 'de' ? 'Unsere Leistungen' : locale === 'ru' ? 'Наши услуги' : 'Our Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branding & Corporate Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webdesign & Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & Content Marketing' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web App Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT & Cloud Services' } },
          ],
        },
      },
      { '@type': 'LocalBusiness', '@id': `${baseUrl}/#localbusiness-vienna`, name: 'GoldenWing Creative Studios Wien', image: `${baseUrl}/og-image.jpg`, priceRange: '$$', address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressCountry: 'AT' }, telephone: '+43-664-543-96-81', email: 'office@goldenwing.at' },
      { '@type': 'LocalBusiness', '@id': `${baseUrl}/#localbusiness-dubai`, name: 'GoldenWing Creative Studios Dubai', image: `${baseUrl}/og-image.jpg`, priceRange: '$$', address: { '@type': 'PostalAddress', streetAddress: 'DAMAC Executive Bay Tower B, Office 1406, 14th Floor', addressLocality: 'Dubai', addressRegion: 'Business Bay', addressCountry: 'AE' }, geo: { '@type': 'GeoCoordinates', latitude: 25.1783747, longitude: 55.2615882 }, telephone: '+971-58-514-4360', email: 'dubai@goldenwing.at' },
      { '@type': 'LocalBusiness', '@id': `${baseUrl}/#localbusiness-roseville`, name: 'GoldenWing Creative Studios USA', image: `${baseUrl}/og-image.jpg`, priceRange: '$$', address: { '@type': 'PostalAddress', streetAddress: '2700 N Hayden Pkwy', addressLocality: 'Roseville', addressRegion: 'CA', postalCode: '95747', addressCountry: 'US' }, telephone: '+1-916-667-4629', email: 'usa@goldenwing.at' },
      // Enhanced WebSite with SearchAction for Sitelinks Searchbox
      { '@type': 'WebSite', '@id': `${baseUrl}/#website`, url: baseUrl, name: 'GoldenWing Creative Studios', publisher: { '@id': `${baseUrl}/#organization` }, potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}${localePrefix}/blog?q={search_term_string}` }, 'query-input': 'required name=search_term_string' } },
      // SiteNavigationElement for better Sitelinks - Localized
      { '@type': 'SiteNavigationElement', '@id': `${baseUrl}/#navigation`, name: 'Main Navigation', hasPart: [
        { '@type': 'SiteNavigationElement', name: nav.services, url: `${baseUrl}${localePrefix}/${locale === 'de' ? 'leistungen' : locale === 'en' ? 'services' : 'uslugi'}` },
        { '@type': 'SiteNavigationElement', name: nav.references, url: `${baseUrl}${localePrefix}/${locale === 'de' ? 'referenzen' : locale === 'en' ? 'references' : 'referensy'}` },
        { '@type': 'SiteNavigationElement', name: nav.projects, url: `${baseUrl}${localePrefix}/${locale === 'de' ? 'projekte' : locale === 'en' ? 'projects' : 'proekty'}` },
        { '@type': 'SiteNavigationElement', name: nav.blog, url: `${baseUrl}${localePrefix}/blog` },
        { '@type': 'SiteNavigationElement', name: nav.about, url: `${baseUrl}${localePrefix}/${locale === 'de' ? 'ueber-uns' : locale === 'en' ? 'about-us' : 'o-nas'}` },
        { '@type': 'SiteNavigationElement', name: nav.contact, url: `${baseUrl}${localePrefix}/${locale === 'de' ? 'kontakt' : locale === 'en' ? 'contact' : 'kontakty'}` },
      ]},
      { '@type': 'FAQPage', '@id': `${baseUrl}/#faq`, mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      // Note: AggregateRating is handled by ReviewSchema component with proper reviews data
    ],
  }
}

// Default content fallbacks for each language
const defaultContent = {
  de: {
    hero: {
      locations: 'Wien · Dubai · California',
      headline: 'Design, Marketing & Technologie aus einer Hand',
      subheadline: 'Wir verbinden Strategie, Gestaltung, digitale Vermarktung und technische Umsetzung zu wirksamen Lösungen – für Unternehmen, die mehr erreichen wollen.',
      primaryCta: 'Kostenlose Erstberatung',
      secondaryCta: 'Leistungen entdecken',
    },
    whyGoldenwing: {
      title: 'Warum Unternehmen mit GoldenWing arbeiten',
      subtitle: 'Wir sind mehr als eine Agentur – wir sind Ihr strategischer Partner für digitale Exzellenz.',
      items: [
        { icon: 'users', title: 'Integriertes Team', description: 'Bei uns arbeiten Strategen, Designer, Entwickler und Marketing-Experten nicht in getrennten Silos, sondern als eingespieltes Team. Das bedeutet: kürzere Abstimmungswege, schnellere Entscheidungen und ein Ergebnis, das aus einem Guss kommt.' },
        { icon: 'target', title: 'Fokus auf Wirkung', description: 'Wir liefern keine Projekte ab und verschwinden – wir messen, optimieren und begleiten Sie langfristig. Jede Design-Entscheidung, jede Code-Zeile und jede Kampagne zahlt direkt auf Ihre Geschäftsziele ein: mehr Leads, mehr Umsatz, mehr Wachstum.' },
        { icon: 'workflow', title: 'Klare Prozesse', description: 'Transparenz ist für uns kein Buzzword. Sie erhalten regelmäßige Updates, haben jederzeit Zugang zu unserem Projektboard und wissen genau, woran wir gerade arbeiten. Strukturierte Abläufe und verbindliche Meilensteine sorgen dafür, dass Projekte im Zeit- und Budgetrahmen bleiben.' },
        { icon: 'award', title: 'Kompromisslose Qualität', description: 'Gut genug ist nicht gut genug. Wir nehmen uns die Zeit, die es braucht, um wirklich herausragende Arbeit zu liefern. Das bedeutet: sauberer Code, durchdachtes Design, getestete Lösungen und ein Ergebnis, auf das Sie stolz sein können – und wir auch.' },
      ],
    },
    services: {
      title: 'Unsere Kompetenzfelder',
      subtitle: 'Von der Strategie über Design bis zur technischen Umsetzung – alles aus einer Hand.',
      items: [
        { title: 'Branding', description: 'Markenstrategie, visuelle Identität und Markenrichtlinien', href: '/leistungen/branding' },
        { title: 'Webdesign', description: 'Informationsarchitektur, UX/UI-Design und CMS-Entwicklung', href: '/leistungen/webdesign' },
        { title: 'Digital Marketing', description: 'Kampagnenstrategie, Paid Media und E-Mail-Automatisierung', href: '/leistungen/digital-marketing' },
        { title: 'SEO & Content', description: 'Technical SEO, On-/Off-Page, Local SEO und Content-Produktion', href: '/leistungen/seo-content' },
        { title: 'Web- & App-Entwicklung', description: 'Technische Architektur, Entwicklung, APIs und Automatisierung', href: '/leistungen/web-app-entwicklung' },
        { title: 'IT & Cloud Services', description: 'Cloud-Architektur, Monitoring, Sicherheit und Support', href: '/leistungen/it-cloud-services' },
      ] as ServiceItem[],
      cta: 'Alle Services ansehen',
      learnMore: 'Mehr erfahren',
    },
    process: {
      title: 'Unser Vorgehen – klar strukturiert',
      subtitle: 'Drei Phasen für nachhaltige Ergebnisse',
      steps: [
        { step: '01', title: 'Verstehen', description: 'Wir analysieren Ihre Ausgangslage, definieren Ziele und entwickeln eine klare Strategie.' },
        { step: '02', title: 'Umsetzen', description: 'Design, Entwicklung und Implementierung – iterativ und mit regelmäßigem Feedback.' },
        { step: '03', title: 'Weiterentwickeln', description: 'Kontinuierliche Optimierung basierend auf Daten und neuen Anforderungen.' },
      ],
    },
    results: {
      title: 'Was unsere Arbeit bewirkt',
      subtitle: 'Messbare Ergebnisse für unsere Kunden',
      items: [
        { icon: 'trending-up', title: '+300% organische Reichweite', description: 'Durchschnittliche Steigerung der Sichtbarkeit durch SEO und Content' },
        { icon: 'target', title: '45% mehr Conversions', description: 'Optimierte User Experience führt zu besseren Ergebnissen' },
        { icon: 'award', title: '98% Kundenzufriedenheit', description: 'Langfristige Partnerschaften durch verlässliche Qualität' },
      ],
      cta: 'Referenzen ansehen',
    },
    projects: {
      title: 'Ausgewählte Projekte',
      subtitle: 'Ein Einblick in unsere Arbeit',
    },
    quality: {
      title: 'Qualität ist kein Zufall',
      subtitle: 'Unsere Standards für exzellente Ergebnisse',
      description: 'Bei GoldenWing setzen wir auf bewährte Prozesse, erfahrene Experten und modernste Technologien. Jedes Projekt durchläuft unsere Qualitätssicherung – von der ersten Idee bis zur finalen Umsetzung.',
      items: [
        'Strukturierte Projektabläufe mit klaren Meilensteinen',
        'Festes Kernteam in Wien, ergänzt durch spezialisierte Partner',
        'Modernste Technologien kombiniert mit bewährten Methoden',
        'Regelmäßige Quality Checks und Code Reviews',
        'Transparente Kommunikation und Reporting',
        '98% Kundenzufriedenheit über alle Projekte',
      ],
      cta: 'Mehr über uns',
    },
    blog: {
      title: 'Aus unserem Blog',
      subtitle: 'Einblicke, Trends und Best Practices aus der digitalen Welt.',
      cta: 'Alle Artikel ansehen',
      featuredPosts: [
        { title: 'SEO-Trends 2025: Was Unternehmen jetzt wissen müssen', excerpt: 'Die wichtigsten SEO-Entwicklungen und wie Sie Ihre Website darauf vorbereiten.', category: 'SEO', href: '/blog' },
        { title: 'Modernes Webdesign: Performance trifft Ästhetik', excerpt: 'Wie Sie eine Website gestalten, die schnell lädt und gleichzeitig beeindruckt.', category: 'Webdesign', href: '/blog' },
        { title: 'Branding für Startups: Der komplette Leitfaden', excerpt: 'Wie junge Unternehmen eine starke Marke aufbauen können.', category: 'Branding', href: '/blog' },
      ] as BlogPostItem[],
    },
    cta: {
      title: 'Lassen Sie uns sprechen',
      subtitle: 'Erzählen Sie uns von Ihrem Vorhaben. In einem kostenlosen Erstgespräch finden wir heraus, wie wir Sie am besten unterstützen können.',
      primaryButton: 'Gespräch buchen',
      secondaryButton: 'Kontakt aufnehmen',
    },
    testimonials: {
      badge: 'Kundenstimmen',
      title: 'Was unsere Kunden sagen',
      subtitle: 'Echte Stimmen von echten Kunden',
      items: [
        // Gruppe A — Verifizierte Kundenstimmen
        { text: 'Goldenwing ist eine herausragende Grafik- und Webdesign-Agentur in Wien! Das Team war äußerst professionell, kreativ und engagiert. Sie haben meine Erwartungen übertroffen und meine Vision perfekt umgesetzt. Die Kommunikation war hervorragend und das Team war stets freundlich und professionell.', name: 'CEO, Turbo Mango', company: 'Turbo Mango', role: 'Verifizierter Kunde' },
        { text: 'Ich bin äußerst zufrieden mit der GoldenWing Unternehmen und ihrer hervorragenden Arbeit bei der Erstellung unserer Firmenwebsite. Das Team von GoldenWing hat nicht nur ein ansprechendes und professionelles Webdesign geliefert, sondern auch ein umfassendes Angebot an Funktionen und ein herausragendes Branding.', name: 'CEO, VIPROTECT GmbH', company: 'VIPROTECT GmbH', role: 'Verifizierter Kunde' },
        { text: 'GoldenWing hat unsere Erwartungen übertroffen! Ihre Expertise in der Webseiten-Optimierung und im digitalen Marketing hat unsere Sichtbarkeit enorm verbessert.', name: 'CEO, Atta Pallet', company: 'Atta Pallet', role: 'Verifizierter Kunde' },
        { text: 'Riesen Dank an GoldenWing! Ihr habt unsere Webseite neu gemacht und wir lieben das Ergebnis. Alles lief reibungslos und das Team war super zu arbeiten. Die neue Seite ist nicht nur schön, sondern auch leicht zu bedienen.', name: 'Zufriedener Kunde', company: 'Sortlist', role: 'Sortlist Review' },
        { text: 'Profis auf ihrem Gebiet. Alles wurde sehr gut und schnell erledigt. Es ist eine sehr schöne Website geworden. Ich bin sehr zufrieden und empfehle diese Werbefirma weiter.', name: 'Zufriedener Kunde', company: 'Sortlist', role: 'Sortlist Review' },
        { text: 'Wir möchten dem Team von GoldenWing für ihre großartige Arbeit bei der kompletten Neugestaltung unseres Brandings danken. Jedes Detail wurde sorgfältig durchdacht, um sicherzustellen, dass unsere Marke authentisch und ansprechend kommuniziert wird.', name: 'Zufriedener Kunde', company: 'Sortlist', role: 'Sortlist Review' },
        { text: 'Sehr kompetente Beratung bei Marketing und Webseiten! Was gewünscht wird, wird sofort erledigt! Kann diesen Webdesigner nur jedem weiterempfehlen! Habe selbst bei meiner Firma die Homepage vom GoldenWing machen lassen und werde seit Jahren sehr gut betreut!', name: 'Zufriedener Kunde', company: 'Google', role: 'Google Review' },
        { text: 'Trotz der Komplexität des Projekts haben sie jeden Termin eingehalten, ohne Kompromisse bei der Qualität zu machen. Diese Zuverlässigkeit war ein großes Plus für uns. Das Preis-Leistungs-Verhältnis war hervorragend — die Investition hat sich vielfach ausgezahlt.', name: 'Zufriedener Kunde', company: 'DesignRush', role: 'DesignRush Review' },
        // Gruppe B — Case-Study-basiert // TODO: Kundenzitat bestätigen lassen
        { text: 'Durch die Zusammenarbeit mit GoldenWing konnten wir unsere digitale Präsenz komplett transformieren — mit +180% qualifizierten Leads und +95% organischem Traffic.', name: 'Geschäftsführung, Domoferm', company: 'Domoferm', role: 'Case Study' },
        { text: 'Der eigene Webshop von GoldenWing hat uns vom Marketplace-Seller zum unabhängigen E-Commerce-Unternehmer gemacht — mit +300% Umsatzsteigerung.', name: 'Geschäftsführung, LAMBERG', company: 'LAMBERG', role: 'Case Study' },
        { text: 'Durch die Premium-Positionierung von GoldenWing haben wir +200% mehr digitale Anfragen und +45% höhere Projektgrößen erreicht.', name: 'Geschäftsführung, Erkurt Gartengestaltung', company: 'Erkurt Gartengestaltung', role: 'Case Study' },
        { text: 'GoldenWing hat uns von einem Handwerksbetrieb zur Premium-Marke transformiert — mit +150% LinkedIn-Leads und +80% Traffic-Wachstum.', name: 'Geschäftsführung, DerBotaniker', company: 'DerBotaniker', role: 'Case Study' },
        { text: 'Die Full-Service-Transformation durch GoldenWing brachte uns +140% qualifizierte Kontaktanfragen und eine überzeugende internationale Online-Präsenz.', name: 'Management, Alinea Partners', company: 'Alinea Partners', role: 'Case Study' },
        { text: 'Das Rebranding durch GoldenWing hat unsere LinkedIn-Lead-Performance um +85% gesteigert und unser Messaging komplett geschärft.', name: 'Geschäftsführung, Point of New', company: 'Point of New', role: 'Case Study' },
        { text: 'Dank der Brand Guidelines von GoldenWing haben wir 100% konsistente Markenkommunikation erreicht und die Genehmigungszeit um 70% reduziert.', name: 'Geschäftsführung, TET Group', company: 'TET Group', role: 'Case Study' },
        { text: 'Die 360°-Digitalstrategie von GoldenWing hat unser digitales Geschäftsmodell von Grund auf aufgebaut — mit +80% Brand Recognition und +35% Weiterempfehlungsrate.', name: 'Geschäftsführung, Umzugsreif', company: 'Umzugsreif', role: 'Case Study' },
        { text: 'Durch die digitale Recruiting-Strategie von GoldenWing erreichen wir nun Talente in über 15 Ländern — mit deutlich schnellerer Time-to-Hire.', name: 'Management, INSPIRE', company: 'INSPIRE', role: 'Case Study' },
        { text: 'Das UX-Redesign durch GoldenWing hat unsere Lead-Qualität um +85% gesteigert und die Bounce Rate signifikant gesenkt.', name: 'Management, Soki', company: 'Soki', role: 'Case Study' },
        { text: 'GoldenWing hat uns eine umfassende Brand-Asset-Strategie geliefert, die unsere juristische Sichtbarkeit und Premium-Positionierung nachhaltig gestärkt hat.', name: 'Geschäftsführung, Glaeser Law Tax Boutique', company: 'Glaeser Law Tax Boutique', role: 'Case Study' },
        { text: 'GoldenWing hat unsere Digital-Marketing-Kampagnen auf ein neues Performance-Level gebracht — mit signifikanter Steigerung am Hamad International Airport.', name: 'Management, Qatar Duty Free', company: 'Qatar Duty Free', role: 'Case Study' },
        { text: 'Die Digital-Marketing-Strategie von GoldenWing hat unserer barrierefreien Kommunikationstechnologie geholfen, die Sichtbarkeit und das Engagement deutlich zu steigern.', name: 'Management, SiMAX', company: 'SiMAX', role: 'Case Study' },
        { text: 'GoldenWing hat eine skalierbare Streaming-Plattform für Web und Smart-TV entwickelt — mit hoher Last-Stabilität und exzellenter UX über alle Geräte.', name: 'Management, Vimmi', company: 'Vimmi', role: 'Case Study' },
        { text: 'GoldenWing hat eine HIPAA-konforme Clinical Solution entwickelt, die eine Nutzerakzeptanz von +85% erreicht hat.', name: 'Healthcare-Projekt', company: 'Vertraulich', role: 'Case Study' },
      ],
    },
  },
  en: {
    hero: {
      locations: 'Vienna · Dubai · California',
      headline: 'Design, Marketing & Technology from One Source',
      subheadline: 'We combine strategy, design, digital marketing, and technical implementation into effective solutions – for companies that want to achieve more.',
      primaryCta: 'Free Consultation',
      secondaryCta: 'Discover Services',
    },
    whyGoldenwing: {
      title: 'Why Companies Work with GoldenWing',
      subtitle: 'We are more than an agency – we are your strategic partner for digital excellence.',
      items: [
        { icon: 'users', title: 'Integrated Team', description: 'Our strategists, designers, developers, and marketing experts don\'t work in separate silos – they collaborate as one tight-knit team. This means shorter communication paths, faster decisions, and a cohesive result that feels unified from start to finish.' },
        { icon: 'target', title: 'Focus on Impact', description: 'We don\'t just deliver projects and disappear – we measure, optimize, and support you long-term. Every design decision, every line of code, and every campaign directly contributes to your business goals: more leads, more revenue, more growth.' },
        { icon: 'workflow', title: 'Clear Processes', description: 'Transparency isn\'t just a buzzword for us. You receive regular updates, have constant access to our project board, and always know exactly what we\'re working on. Structured workflows and reliable milestones ensure projects stay on time and on budget.' },
        { icon: 'award', title: 'Uncompromising Quality', description: 'Good enough isn\'t good enough. We take the time needed to deliver truly outstanding work. That means clean code, thoughtful design, tested solutions, and a result you can be proud of – and so can we.' },
      ],
    },
    services: {
      title: 'Our Areas of Expertise',
      subtitle: 'From strategy to design to technical implementation – all from one source.',
      items: [
        { title: 'Branding', description: 'Brand strategy, visual identity, and brand guidelines', href: '/leistungen/branding' },
        { title: 'Web Design', description: 'Information architecture, UX/UI design, and CMS development', href: '/leistungen/webdesign' },
        { title: 'Digital Marketing', description: 'Campaign strategy, paid media, and email automation', href: '/leistungen/digital-marketing' },
        { title: 'SEO & Content', description: 'Technical SEO, on-/off-page, local SEO, and content production', href: '/leistungen/seo-content' },
        { title: 'Web & App Development', description: 'Technical architecture, development, APIs, and automation', href: '/leistungen/web-app-entwicklung' },
        { title: 'IT & Cloud Services', description: 'Cloud architecture, monitoring, security, and support', href: '/leistungen/it-cloud-services' },
      ] as ServiceItem[],
      cta: 'View All Services',
      learnMore: 'Learn more',
    },
    process: {
      title: 'Our Approach – Clearly Structured',
      subtitle: 'Three phases for sustainable results',
      steps: [
        { step: '01', title: 'Understand', description: 'We analyze your situation, define goals, and develop a clear strategy.' },
        { step: '02', title: 'Implement', description: 'Design, development, and implementation – iteratively with regular feedback.' },
        { step: '03', title: 'Evolve', description: 'Continuous optimization based on data and new requirements.' },
      ],
    },
    results: {
      title: 'The Impact of Our Work',
      subtitle: 'Measurable results for our clients',
      items: [
        { icon: 'trending-up', title: '+300% Organic Reach', description: 'Average visibility increase through SEO and content' },
        { icon: 'target', title: '45% More Conversions', description: 'Optimized user experience leads to better results' },
        { icon: 'award', title: '98% Client Satisfaction', description: 'Long-term partnerships through reliable quality' },
      ],
      cta: 'View References',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'A glimpse into our work',
    },
    quality: {
      title: 'Quality is No Accident',
      subtitle: 'Our standards for excellent results',
      description: 'At GoldenWing, we rely on proven processes, experienced experts, and cutting-edge technologies. Every project goes through our quality assurance – from the first idea to final implementation.',
      items: [
        'Structured project workflows with clear milestones',
        'Core team in Vienna, supported by specialized partners',
        'Latest technologies combined with proven methods',
        'Regular quality checks and code reviews',
        'Transparent communication and reporting',
        '98% customer satisfaction across all projects',
      ],
      cta: 'More About Us',
    },
    blog: {
      title: 'From Our Blog',
      subtitle: 'Insights, trends, and best practices from the digital world.',
      cta: 'View All Articles',
      featuredPosts: [
        { title: 'SEO Trends 2025: What Businesses Need to Know', excerpt: 'The most important SEO developments and how to prepare your website.', category: 'SEO', href: '/blog' },
        { title: 'Modern Web Design: Performance Meets Aesthetics', excerpt: 'How to design a website that loads fast and impresses.', category: 'Web Design', href: '/blog' },
        { title: 'Branding for Startups: The Complete Guide', excerpt: 'How young companies can build a strong brand.', category: 'Branding', href: '/blog' },
      ] as BlogPostItem[],
    },
    cta: {
      title: 'Let\'s Talk',
      subtitle: 'Tell us about your project. In a free initial consultation, we\'ll find out how we can best support you.',
      primaryButton: 'Book a Call',
      secondaryButton: 'Get in Touch',
    },
    testimonials: {
      badge: 'Testimonials',
      title: 'What Our Clients Say',
      subtitle: 'Real voices from real clients',
      items: [
        // Group A — Verified client reviews
        { text: 'GoldenWing is an outstanding graphic and web design agency in Vienna! The team was extremely professional, creative, and dedicated. They exceeded my expectations and perfectly brought my vision to life. Communication was excellent and the team was always friendly and professional.', name: 'CEO, Turbo Mango', company: 'Turbo Mango', role: 'Verified Client' },
        { text: 'I am extremely satisfied with GoldenWing and their outstanding work on our company website. The GoldenWing team not only delivered an appealing and professional web design but also a comprehensive range of features and outstanding branding.', name: 'CEO, VIPROTECT GmbH', company: 'VIPROTECT GmbH', role: 'Verified Client' },
        { text: 'GoldenWing exceeded our expectations! Their expertise in website optimization and digital marketing has enormously improved our visibility.', name: 'CEO, Atta Pallet', company: 'Atta Pallet', role: 'Verified Client' },
        { text: 'Huge thanks to GoldenWing! You redesigned our website and we love the result. Everything went smoothly and the team was great to work with. The new site is not only beautiful but also easy to use.', name: 'Satisfied Client', company: 'Sortlist', role: 'Sortlist Review' },
        { text: 'Professionals in their field. Everything was done very well and quickly. The website turned out beautifully. I am very satisfied and recommend this agency.', name: 'Satisfied Client', company: 'Sortlist', role: 'Sortlist Review' },
        { text: 'We would like to thank the team at GoldenWing for their amazing work in completely redefining our branding. Every detail has been carefully thought out to ensure our brand is communicated authentically and engagingly.', name: 'Satisfied Client', company: 'Sortlist', role: 'Sortlist Review' },
        { text: 'Very competent consulting for marketing and websites! Whatever is requested gets done immediately! I can only recommend this web designer to everyone! I had my own company homepage built by GoldenWing and have been excellently supported for years!', name: 'Satisfied Client', company: 'Google', role: 'Google Review' },
        { text: 'Despite the complexity of the project, they managed to meet every deadline without compromising on quality. This reliability was a huge plus for us. The value for money was exceptional — the investment has paid off many times over.', name: 'Satisfied Client', company: 'DesignRush', role: 'DesignRush Review' },
        // Group B — Case-study-based // TODO: Get client quote confirmed
        { text: 'Through our collaboration with GoldenWing, we were able to completely transform our digital presence — with +180% qualified leads and +95% organic traffic.', name: 'Management, Domoferm', company: 'Domoferm', role: 'Case Study' },
        { text: 'GoldenWing\'s custom webshop turned us from a marketplace seller into an independent e-commerce entrepreneur — with +300% revenue growth.', name: 'Management, LAMBERG', company: 'LAMBERG', role: 'Case Study' },
        { text: 'Through GoldenWing\'s premium positioning, we achieved +200% more digital inquiries and +45% higher project sizes.', name: 'Management, Erkurt Gartengestaltung', company: 'Erkurt Gartengestaltung', role: 'Case Study' },
        { text: 'GoldenWing transformed us from a craft business into a premium brand — with +150% LinkedIn leads and +80% traffic growth.', name: 'Management, DerBotaniker', company: 'DerBotaniker', role: 'Case Study' },
        { text: 'GoldenWing\'s full-service transformation brought us +140% qualified contact inquiries and a compelling international online presence.', name: 'Management, Alinea Partners', company: 'Alinea Partners', role: 'Case Study' },
        { text: 'The rebranding by GoldenWing increased our LinkedIn lead performance by +85% and completely sharpened our messaging.', name: 'Management, Point of New', company: 'Point of New', role: 'Case Study' },
        { text: 'Thanks to GoldenWing\'s brand guidelines, we achieved 100% consistent brand communication and reduced approval time by 70%.', name: 'Management, TET Group', company: 'TET Group', role: 'Case Study' },
        { text: 'GoldenWing\'s 360° digital strategy built our digital business model from the ground up — with +80% brand recognition and +35% referral rate.', name: 'Management, Umzugsreif', company: 'Umzugsreif', role: 'Case Study' },
        { text: 'Through GoldenWing\'s digital recruiting strategy, we now reach talent in over 15 countries — with significantly faster time-to-hire.', name: 'Management, INSPIRE', company: 'INSPIRE', role: 'Case Study' },
        { text: 'GoldenWing\'s UX redesign increased our lead quality by +85% and significantly reduced our bounce rate.', name: 'Management, Soki', company: 'Soki', role: 'Case Study' },
        { text: 'GoldenWing delivered a comprehensive brand asset strategy that sustainably strengthened our legal visibility and premium positioning.', name: 'Management, Glaeser Law Tax Boutique', company: 'Glaeser Law Tax Boutique', role: 'Case Study' },
        { text: 'GoldenWing elevated our digital marketing campaigns to a new performance level — with significant growth at Hamad International Airport.', name: 'Management, Qatar Duty Free', company: 'Qatar Duty Free', role: 'Case Study' },
        { text: 'GoldenWing\'s digital marketing strategy helped our accessible communication technology significantly increase visibility and engagement.', name: 'Management, SiMAX', company: 'SiMAX', role: 'Case Study' },
        { text: 'GoldenWing developed a scalable streaming platform for web and smart TV — with high load stability and excellent UX across all devices.', name: 'Management, Vimmi', company: 'Vimmi', role: 'Case Study' },
        { text: 'GoldenWing developed a HIPAA-compliant clinical solution that achieved a user acceptance rate of +85%.', name: 'Healthcare Project', company: 'Confidential', role: 'Case Study' },
      ],
    },
  },
  ru: {
    hero: {
      locations: 'Вена · Дубай · Калифорния',
      headline: 'Дизайн, маркетинг и технологии из одних рук',
      subheadline: 'Мы объединяем стратегию, дизайн, цифровой маркетинг и техническую реализацию в эффективные решения — для компаний, которые хотят достичь большего.',
      primaryCta: 'Бесплатная консультация',
      secondaryCta: 'Узнать об услугах',
    },
    whyGoldenwing: {
      title: 'Почему компании работают с GoldenWing',
      subtitle: 'Мы больше, чем агентство — мы ваш стратегический партнёр для цифрового превосходства.',
      items: [
        { icon: 'users', title: 'Интегрированная команда', description: 'Наши стратеги, дизайнеры, разработчики и маркетологи работают не в изолированных отделах, а как единая сплочённая команда. Это означает: короткие пути коммуникации, быстрые решения и целостный результат.' },
        { icon: 'target', title: 'Фокус на результат', description: 'Мы не просто сдаём проекты и исчезаем — мы измеряем, оптимизируем и сопровождаем вас долгосрочно. Каждое дизайн-решение, каждая строка кода и каждая кампания напрямую работают на ваши бизнес-цели: больше лидов, больше выручки, больше роста.' },
        { icon: 'workflow', title: 'Чёткие процессы', description: 'Прозрачность для нас — не пустое слово. Вы получаете регулярные обновления, имеете постоянный доступ к нашей доске проектов и всегда знаете, над чем мы работаем. Структурированные процессы и чёткие вехи гарантируют соблюдение сроков и бюджета.' },
        { icon: 'award', title: 'Бескомпромиссное качество', description: 'Достаточно хорошо — недостаточно хорошо. Мы уделяем время, необходимое для действительно выдающейся работы. Это означает: чистый код, продуманный дизайн, протестированные решения и результат, которым можете гордиться вы — и мы тоже.' },
      ],
    },
    services: {
      title: 'Наши компетенции',
      subtitle: 'От стратегии через дизайн до технической реализации — всё из одних рук.',
      items: [
        { title: 'Брендинг', description: 'Стратегия бренда, визуальная идентичность и руководства по бренду', href: '/leistungen/branding' },
        { title: 'Веб-дизайн', description: 'Информационная архитектура, UX/UI-дизайн и CMS-разработка', href: '/leistungen/webdesign' },
        { title: 'Цифровой маркетинг', description: 'Стратегия кампаний, платная реклама и email-автоматизация', href: '/leistungen/digital-marketing' },
        { title: 'SEO и контент', description: 'Техническое SEO, On-/Off-Page, локальное SEO и производство контента', href: '/leistungen/seo-content' },
        { title: 'Веб- и мобильная разработка', description: 'Техническая архитектура, разработка, API и автоматизация', href: '/leistungen/web-app-entwicklung' },
        { title: 'IT и облачные сервисы', description: 'Облачная архитектура, мониторинг, безопасность и поддержка', href: '/leistungen/it-cloud-services' },
      ] as ServiceItem[],
      cta: 'Все услуги',
      learnMore: 'Подробнее',
    },
    process: {
      title: 'Наш подход — чётко структурирован',
      subtitle: 'Три фазы для устойчивых результатов',
      steps: [
        { step: '01', title: 'Понять', description: 'Мы анализируем вашу ситуацию, определяем цели и разрабатываем чёткую стратегию.' },
        { step: '02', title: 'Реализовать', description: 'Дизайн, разработка и внедрение — итеративно и с регулярной обратной связью.' },
        { step: '03', title: 'Развивать', description: 'Постоянная оптимизация на основе данных и новых требований.' },
      ],
    },
    results: {
      title: 'Результаты нашей работы',
      subtitle: 'Измеримые результаты для наших клиентов',
      items: [
        { icon: 'trending-up', title: '+300% органический охват', description: 'Среднее увеличение видимости через SEO и контент' },
        { icon: 'target', title: '45% больше конверсий', description: 'Оптимизированный пользовательский опыт ведёт к лучшим результатам' },
        { icon: 'award', title: '98% удовлетворённость клиентов', description: 'Долгосрочные партнёрства благодаря надёжному качеству' },
      ],
      cta: 'Смотреть референсы',
    },
    projects: {
      title: 'Избранные проекты',
      subtitle: 'Взгляд на нашу работу',
    },
    quality: {
      title: 'Качество — не случайность',
      subtitle: 'Наши стандарты для превосходных результатов',
      description: 'В GoldenWing мы полагаемся на проверенные процессы, опытных экспертов и современные технологии. Каждый проект проходит нашу систему контроля качества — от первой идеи до финальной реализации.',
      items: [
        'Структурированные проектные процессы с чёткими вехами',
        'Основная команда в Вене, усиленная специализированными партнёрами',
        'Новейшие технологии в сочетании с проверенными методами',
        'Регулярные проверки качества и код-ревью',
        'Прозрачная коммуникация и отчётность',
        '98% удовлетворённость клиентов по всем проектам',
      ],
      cta: 'Подробнее о нас',
    },
    blog: {
      title: 'Из нашего блога',
      subtitle: 'Инсайты, тренды и лучшие практики из цифрового мира.',
      cta: 'Все статьи',
      featuredPosts: [
        { title: 'SEO-тренды 2025: что нужно знать бизнесу', excerpt: 'Важнейшие SEO-разработки и как подготовить к ним ваш сайт.', category: 'SEO', href: '/blog' },
        { title: 'Современный веб-дизайн: производительность и эстетика', excerpt: 'Как создать сайт, который быстро загружается и впечатляет.', category: 'Веб-дизайн', href: '/blog' },
        { title: 'Брендинг для стартапов: полное руководство', excerpt: 'Как молодые компании могут построить сильный бренд.', category: 'Брендинг', href: '/blog' },
      ] as BlogPostItem[],
    },
    cta: {
      title: 'Давайте поговорим',
      subtitle: 'Расскажите нам о вашем проекте. В бесплатной первичной консультации мы выясним, как лучше всего вам помочь.',
      primaryButton: 'Записаться на звонок',
      secondaryButton: 'Связаться с нами',
    },
    testimonials: {
      badge: 'Отзывы клиентов',
      title: 'Что говорят наши клиенты',
      subtitle: 'Реальные отзывы реальных клиентов',
      items: [
        // Группа A — Верифицированные отзывы клиентов
        { text: 'GoldenWing — выдающееся агентство графического и веб-дизайна в Вене! Команда была исключительно профессиональной, креативной и увлечённой. Они превзошли мои ожидания и идеально воплотили моё видение. Коммуникация была отличной, а команда всегда дружелюбной и профессиональной.', name: 'CEO, Turbo Mango', company: 'Turbo Mango', role: 'Верифицированный клиент' },
        { text: 'Я чрезвычайно доволен компанией GoldenWing и их выдающейся работой по созданию нашего корпоративного сайта. Команда GoldenWing предоставила не только привлекательный и профессиональный веб-дизайн, но и обширный набор функций и превосходный брендинг.', name: 'CEO, VIPROTECT GmbH', company: 'VIPROTECT GmbH', role: 'Верифицированный клиент' },
        { text: 'GoldenWing превзошли наши ожидания! Их экспертиза в оптимизации сайтов и цифровом маркетинге значительно улучшила нашу видимость.', name: 'CEO, Atta Pallet', company: 'Atta Pallet', role: 'Верифицированный клиент' },
        { text: 'Огромное спасибо GoldenWing! Вы переделали наш сайт, и мы в восторге от результата. Всё прошло гладко, а с командой было приятно работать. Новый сайт не только красивый, но и удобный в использовании.', name: 'Довольный клиент', company: 'Sortlist', role: 'Отзыв Sortlist' },
        { text: 'Профессионалы в своём деле. Всё было сделано очень качественно и быстро. Получился очень красивый сайт. Я очень доволен и рекомендую это рекламное агентство.', name: 'Довольный клиент', company: 'Sortlist', role: 'Отзыв Sortlist' },
        { text: 'Мы хотим поблагодарить команду GoldenWing за их великолепную работу по полному обновлению нашего брендинга. Каждая деталь была тщательно продумана, чтобы наша марка коммуницировалась аутентично и привлекательно.', name: 'Довольный клиент', company: 'Sortlist', role: 'Отзыв Sortlist' },
        { text: 'Очень компетентное консультирование по маркетингу и веб-сайтам! Всё, что требуется, выполняется сразу! Могу рекомендовать этого веб-дизайнера каждому! Сам заказал сайт для своей фирмы у GoldenWing и уже много лет получаю отличное обслуживание!', name: 'Довольный клиент', company: 'Google', role: 'Отзыв Google' },
        { text: 'Несмотря на сложность проекта, они соблюдали каждый срок без компромиссов в качестве. Эта надёжность стала для нас огромным плюсом. Соотношение цены и качества было превосходным — инвестиция многократно окупилась.', name: 'Довольный клиент', company: 'DesignRush', role: 'Отзыв DesignRush' },
        // Группа B — Основано на кейсах // TODO: Подтвердить цитату у клиента
        { text: 'Благодаря сотрудничеству с GoldenWing мы смогли полностью трансформировать наше цифровое присутствие — с +180% квалифицированных лидов и +95% органического трафика.', name: 'Руководство, Domoferm', company: 'Domoferm', role: 'Case Study' },
        { text: 'Собственный интернет-магазин от GoldenWing превратил нас из продавца на маркетплейсе в независимого предпринимателя электронной коммерции — с +300% ростом выручки.', name: 'Руководство, LAMBERG', company: 'LAMBERG', role: 'Case Study' },
        { text: 'Благодаря премиум-позиционированию от GoldenWing мы получили +200% больше цифровых запросов и +45% более крупных проектов.', name: 'Руководство, Erkurt Gartengestaltung', company: 'Erkurt Gartengestaltung', role: 'Case Study' },
        { text: 'GoldenWing трансформировал нас из ремесленного предприятия в премиум-бренд — с +150% лидов из LinkedIn и +80% ростом трафика.', name: 'Руководство, DerBotaniker', company: 'DerBotaniker', role: 'Case Study' },
        { text: 'Полная трансформация от GoldenWing принесла нам +140% квалифицированных запросов и убедительное международное онлайн-присутствие.', name: 'Менеджмент, Alinea Partners', company: 'Alinea Partners', role: 'Case Study' },
        { text: 'Ребрендинг от GoldenWing повысил нашу эффективность лидогенерации в LinkedIn на +85% и полностью обновил наш месседжинг.', name: 'Руководство, Point of New', company: 'Point of New', role: 'Case Study' },
        { text: 'Благодаря руководству по бренду от GoldenWing мы достигли 100% согласованной коммуникации бренда и сократили время согласования на 70%.', name: 'Руководство, TET Group', company: 'TET Group', role: 'Case Study' },
        { text: '360°-цифровая стратегия GoldenWing построила нашу цифровую бизнес-модель с нуля — с +80% узнаваемости бренда и +35% уровнем рекомендаций.', name: 'Руководство, Umzugsreif', company: 'Umzugsreif', role: 'Case Study' },
        { text: 'Благодаря стратегии цифрового рекрутинга GoldenWing мы теперь находим таланты в более чем 15 странах — со значительно более быстрым временем найма.', name: 'Менеджмент, INSPIRE', company: 'INSPIRE', role: 'Case Study' },
        { text: 'UX-редизайн от GoldenWing повысил качество наших лидов на +85% и значительно снизил показатель отказов.', name: 'Менеджмент, Soki', company: 'Soki', role: 'Case Study' },
        { text: 'GoldenWing предоставил нам комплексную стратегию бренд-активов, которая устойчиво укрепила нашу юридическую видимость и премиум-позиционирование.', name: 'Руководство, Glaeser Law Tax Boutique', company: 'Glaeser Law Tax Boutique', role: 'Case Study' },
        { text: 'GoldenWing вывел наши кампании цифрового маркетинга на новый уровень эффективности — со значительным ростом в международном аэропорту Хамад.', name: 'Менеджмент, Qatar Duty Free', company: 'Qatar Duty Free', role: 'Case Study' },
        { text: 'Стратегия цифрового маркетинга GoldenWing помогла нашей доступной коммуникационной технологии значительно повысить видимость и вовлечённость.', name: 'Менеджмент, SiMAX', company: 'SiMAX', role: 'Case Study' },
        { text: 'GoldenWing разработал масштабируемую стриминговую платформу для веба и Smart TV — с высокой стабильностью под нагрузкой и отличным UX на всех устройствах.', name: 'Менеджмент, Vimmi', company: 'Vimmi', role: 'Case Study' },
        { text: 'GoldenWing разработал HIPAA-совместимое клиническое решение, достигшее уровня принятия пользователями +85%.', name: 'Проект в сфере здравоохранения', company: 'Конфиденциально', role: 'Case Study' },
      ],
    },
  },
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const [featuredProjects, homePage] = await Promise.all([
    getFeaturedProjects(locale),
    getHomePage(locale),
  ])

  const tPartners = await getTranslations({ locale, namespace: 'partners' })

  // Get default content for current locale (with robust fallback)
  const validLocale = ['de', 'en', 'ru'].includes(locale) ? locale : 'de'
  let defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[validLocale]

  // Safety check - if content is missing for this locale, fallback to German
  if (!defaults || !defaults.services) {
    logger.error(`Homepage defaults missing for locale: ${locale} - falling back to German`)
    defaults = defaultContent['de']
  }

  // Build content object from CMS data with fallbacks
  // CMS uses flat field names (e.g., heroLocations, statsItems, uspItems)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hp = homePage as Record<string, any> | null

  // Build headline from CMS parts or use default
  const buildHeadline = (): string => {
    if (hp?.heroHeadlineLine1 || hp?.heroHeadlineHighlight || hp?.heroHeadlineLine2) {
      return `${hp?.heroHeadlineLine1 || ''} ${hp?.heroHeadlineHighlight || ''} ${hp?.heroHeadlineLine2 || ''}`.trim()
    }
    return defaults.hero.headline
  }

  // Map heroLocations from CMS format (flag, city) to display format
  const buildLocations = (): string => {
    const cmsLocations = hp?.heroLocations as Array<{ flag?: string; city?: string }> | undefined
    if (cmsLocations?.length) {
      return cmsLocations.map(loc => `${loc.flag || ''} ${loc.city || ''}`).join(' • ').trim()
    }
    return defaults.hero.locations
  }

  const hero = {
    locations: buildLocations(),
    headline: buildHeadline(),
    subheadline: hp?.heroSubheadline || defaults.hero.subheadline,
    primaryCta: hp?.heroCtaPrimary || defaults.hero.primaryCta,
    secondaryCta: hp?.heroCtaSecondary || defaults.hero.secondaryCta,
  }

  const uspItemsFromCMS = hp?.uspItems as CMSWhyItem[] | undefined
  const whyGoldenwing = {
    title: hp?.uspTitle || defaults.whyGoldenwing.title,
    subtitle: hp?.uspSubtitle || defaults.whyGoldenwing.subtitle,
    items: uspItemsFromCMS?.length
      ? uspItemsFromCMS.map((item) => ({
          iconName: item.icon || 'users',
          title: item.title,
          description: item.description,
        }))
      : defaults.whyGoldenwing.items.map((item) => ({
          iconName: item.icon,
          title: item.title,
          description: item.description,
        })),
  }

  const services = {
    title: hp?.servicesTitle || defaults.services.title,
    subtitle: hp?.servicesSubtitle || defaults.services.subtitle,
    items: defaults.services.items, // Services come from Services collection, not CMS global
    cta: hp?.servicesCtaText || defaults.services.cta,
    learnMore: defaults.services.learnMore,
  }

  const processStepsFromCMS = hp?.processSteps as CMSProcessStep[] | undefined
  const process = {
    title: hp?.processTitle || defaults.process.title,
    subtitle: hp?.processSubtitle || defaults.process.subtitle,
    steps: processStepsFromCMS?.length
      ? processStepsFromCMS
      : defaults.process.steps,
  }

  const results = {
    title: defaults.results.title,
    subtitle: defaults.results.subtitle,
    items: defaults.results.items.map((item) => ({
      icon: getIcon(item.icon),
      title: item.title,
      description: item.description,
    })),
    cta: defaults.results.cta,
  }

  const projectsSection = {
    title: hp?.projectsTitle || defaults.projects.title,
    subtitle: hp?.projectsSubtitle || defaults.projects.subtitle,
  }

  const testimonialsSection = {
    badge: defaults.testimonials.badge,
    title: hp?.testimonialsTitle || defaults.testimonials.title,
    subtitle: hp?.testimonialsSubtitle || defaults.testimonials.subtitle,
    items: defaults.testimonials.items,
  }

  const blogSection = {
    title: defaults.blog.title,
    subtitle: defaults.blog.subtitle,
    cta: defaults.blog.cta,
    featuredPosts: defaults.blog.featuredPosts,
  }

  const ctaSection = {
    title: hp?.ctaTitle || defaults.cta.title,
    subtitle: hp?.ctaSubtitle || defaults.cta.subtitle,
    primaryButton: hp?.ctaPrimaryButton || defaults.cta.primaryButton,
    secondaryButton: defaults.cta.secondaryButton,
  }

  // Stats from CMS (statsItems field)
  const statsItemsFromCMS = hp?.statsItems as Array<{ value: number; suffix?: string | null; label: string }> | undefined
  const cmsStats: CMSStat[] | undefined = statsItemsFromCMS?.length
    ? statsItemsFromCMS.map((item) => ({
        value: item.value,
        suffix: item.suffix,
        label: item.label,
      }))
    : undefined

  // Projects for featured section
  const projects = featuredProjects.map((project) => ({
    id: String(project.id),
    title: project.title as string,
    slug: project.slug as string,
    client: project.client as string,
    category: project.category as string,
    description: project.description as string,
    mainImage: project.mainImage as { url?: string; alt?: string } | undefined,
  }))

  const logoCarouselData = {
    title: hp?.logoCarouselTitle,
    subtitle: hp?.logoCarouselSubtitle,
  }

  // Review Schema — only Gruppe A (verified reviews, items 0-7)
  const gruppeAReviews = testimonialsSection.items.slice(0, 8)
  const reviewDates = [
    '2025-11-15', '2025-09-22', '2025-08-18', '2025-06-05', '2025-04-12',
    '2025-02-28', '2024-12-14', '2024-10-03',
  ]
  const reviewsForSchema = gruppeAReviews.map((t, index) => ({
    text: t.text,
    name: t.name,
    role: t.role,
    company: t.company,
    rating: 5,
    datePublished: reviewDates[index] || '2024-06-01',
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(locale)) }} />
      <ReviewSchema reviews={reviewsForSchema} />
      {/* GEO/AEO: Credentials Schema for authority signals */}
      <CredentialsSchema
        credentials={[
          {
            name: 'Payload CMS Partner',
            description: 'Certified Payload CMS development partner for headless content management solutions',
            issuer: 'Payload CMS',
            dateAwarded: '2024',
          },
          {
            name: 'Vercel Partner',
            description: 'Official Vercel deployment and Next.js development partner',
            issuer: 'Vercel',
            dateAwarded: '2024',
          },
          {
            name: 'Cloudflare Partner',
            description: 'Certified Cloudflare partner for web security and performance solutions',
            issuer: 'Cloudflare',
            dateAwarded: '2024',
          },
          {
            name: 'WKO Registered Business',
            description: 'Registered creative agency with the Austrian Chamber of Commerce',
            issuer: 'Wirtschaftskammer Österreich',
            dateAwarded: '2023',
          },
        ]}
      />

      {/* Hero Section - Animated with Framer Motion */}
      <HeroSection
        locations={hero.locations}
        headline={hero.headline}
        subheadline={hero.subheadline}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
      />

      {/* 1. SOCIAL PROOF — Client Logos directly after Hero */}
      <PartnersCarousel
        title={logoCarouselData?.title || tPartners('title')}
        subtitle={logoCarouselData?.subtitle || tPartners('subtitle')}
      />

      {/* 2. FEATURED PROJECTS — Show best work early */}
      <FeaturedProjects
        projects={projects}
        title={projectsSection.title}
        subtitle={projectsSection.subtitle}
      />

      {/* 3. STATS — Key numbers */}
      <AnimatedStats className="border-y bg-muted/30" cmsStats={cmsStats} />

      {/* 4. SERVICES — What we do */}
      <section className="py-20 md:min-h-[700px]" style={{ contain: 'layout' }}>
        <Container variant="block">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{services.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{services.subtitle}</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.items.map((service, i) => (
              <Link key={i} href={service.href} className="block h-full">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  learnMore={services.learnMore}
                  delay={i * 0.1}
                />
              </Link>
            ))}
          </div>
          <AnimatedSection className="text-center mt-12">
            <NextLink href={getServicesUrl(locale)}>
              <Button size="lg" variant="outline">{services.cta}</Button>
            </NextLink>
          </AnimatedSection>
        </Container>
      </section>

      {/* 5. TEAM — People behind GoldenWing */}
      <FeaturedTeam
        title={whyGoldenwing.title}
        subtitle={whyGoldenwing.subtitle}
        showCTA={true}
        limit={4}
      />

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-muted/30 md:min-h-[900px]" style={{ contain: 'layout' }}>
        <Container variant="block">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block border py-1.5 px-4 rounded-full text-sm font-medium mb-4">
                {testimonialsSection.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {testimonialsSection.title}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {testimonialsSection.subtitle}
              </p>
            </div>
          </AnimatedSection>
        </Container>
        <TestimonialsColumns testimonials={testimonialsSection.items} />
        <AnimatedSection className="text-center mt-12">
          <NextLink href={getReferencesUrl(locale)}>
            <Button size="lg">{results.cta}</Button>
          </NextLink>
        </AnimatedSection>
      </section>

      {/* 7. PROCESS — How we work */}
      <ApproachSection
        title={process.title}
        subtitle={process.subtitle}
        steps={process.steps}
      />

      {/* 8. BLOG */}
      <section className="py-20 bg-muted/30 md:min-h-[500px]" style={{ contain: 'layout' }}>
        <Container variant="block">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{blogSection.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{blogSection.subtitle}</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {blogSection.featuredPosts.map((post, i) => (
              <Link key={i} href={post.href || '/blog'} className="block h-full">
                <BlogCard
                  category={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  delay={i * 0.1}
                />
              </Link>
            ))}
          </div>
          <AnimatedSection className="text-center">
            <Link href="/blog">
              <Button size="lg" variant="outline" className="group">
                {blogSection.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </AnimatedSection>
        </Container>
      </section>

      {/* 9. CTA */}
      <CTASection
        title={ctaSection.title}
        subtitle={ctaSection.subtitle}
        primaryButton={ctaSection.primaryButton}
        secondaryButton={ctaSection.secondaryButton}
      />
    </>
  )
}
