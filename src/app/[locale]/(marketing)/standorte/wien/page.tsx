import { Metadata } from 'next'
import { Train, Car } from 'lucide-react'
import { StandortPage } from '@/components/templates/standort-page'
import { WeitereStandorte } from '@/components/sections/weitere-standorte'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { getLocationBySlug, type SupportedLocale } from '@/lib/payload'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenwing.at'

export const revalidate = 60

// Default content for fallback
const defaultContent = {
  de: {
    heroTitle: 'Kreativagentur in Wien',
    heroDescription: 'Ihr kreativer Partner in Wien. Webdesign, Branding und digitales Marketing für Unternehmen in Österreich, Deutschland und der Schweiz.',
    scheduleMeeting: 'Termin vereinbaren',
    callNow: 'Jetzt anrufen',
    contactTitle: 'Kontakt Wien',
    addressLabel: 'Adresse',
    phoneLabel: 'Telefon',
    emailLabel: 'E-Mail',
    hoursLabel: 'Öffnungszeiten',
    hoursValue: 'Mo - Fr: 09:00 - 18:00 Uhr',
    servicesTitle: 'Unsere Leistungen in Wien',
    servicesSubtitle: 'Von unserem Wiener Hauptsitz aus bieten wir das komplette Spektrum kreativer Dienstleistungen für den DACH-Raum.',
    viewAllServices: 'Alle Leistungen ansehen',
    projectsTitle: 'Projekte aus Wien',
    projectsSubtitle: 'Einige Erfolgsgeschichten unserer Wiener Kunden.',
    viewAllProjects: 'Alle Projekte ansehen',
    faqTitle: 'Häufige Fragen',
    ctaTitle: 'Projekt besprechen?',
    ctaDescription: 'Vereinbaren Sie ein kostenloses Erstgespräch in unserem Wiener Büro oder online.',
    ctaButton: 'Termin vereinbaren',
    directionsTitle: 'Anfahrt',
    directionsSubtitle: 'Unser Büro ist verkehrsgünstig im 10. Bezirk gelegen.',
    mapPlaceholder: 'Czeikestrasse 4/21\n1100 Wien',
    mapButtonText: 'In Google Maps öffnen',
    badge: 'Hauptsitz',
    services: [
      { name: 'Webdesign & Entwicklung', description: 'Moderne Websites mit Next.js und React' },
      { name: 'Branding & Corporate Design', description: 'Markenentwicklung von Logo bis Guidelines' },
      { name: 'SEO & Online Marketing', description: 'Suchmaschinenoptimierung für lokale Sichtbarkeit' },
      { name: 'Software-Entwicklung', description: 'Individuelle Web-Apps und Business-Software' },
      { name: 'Content Creation', description: 'Texte, Fotos und Videos für Ihre Marke' },
      { name: 'E-Commerce', description: 'Online-Shops und Shopsystem-Integration' },
    ],
    projects: [
      { client: 'Wiener Traditionsunternehmen', category: 'Branding', result: 'Kompletter Markenrelaunch' },
      { client: 'Tech-Startup Wien', category: 'Webdesign', result: '+200% mehr Anfragen' },
      { client: 'Gastronomiebetrieb', category: 'SEO', result: 'Top 3 bei Google Wien' },
    ],
    faqs: [
      { question: 'Wo genau befindet sich das Büro in Wien?', answer: 'Unser Wiener Büro befindet sich in der Czeikestrasse 4/21, 1100 Wien (Favoriten). Gut erreichbar mit U1 (Reumannplatz) und den Straßenbahnlinien 6 und 11.' },
      { question: 'Kann ich einen Termin vor Ort vereinbaren?', answer: 'Ja, wir bieten persönliche Beratungsgespräche in unserem Wiener Büro an. Termine können telefonisch oder über unser Kontaktformular vereinbart werden.' },
      { question: 'Welche Kunden betreut ihr von Wien aus?', answer: 'Von Wien aus betreuen wir Kunden im gesamten DACH-Raum – Österreich, Deutschland und die Schweiz.' },
      { question: 'Was kostet Webdesign in Wien?', answer: 'Unsere Webdesign-Projekte starten ab €2.000 für einfache Websites. Komplexere Projekte mit CMS und E-Commerce liegen zwischen €5.000 und €15.000.' },
    ],
    transportOptions: [
      { icon: 'train', title: 'Öffentliche Verkehrsmittel', description: 'U1 Station Reumannplatz (5 Min. Fußweg)\nStraßenbahn 6, 11 (Haltestelle Quellenstraße)' },
      { icon: 'car', title: 'Mit dem Auto', description: 'Parkplätze in der Umgebung verfügbar\nKurzparkzone Mo-Fr 9-22 Uhr' },
    ],
  },
  en: {
    heroTitle: 'Creative Agency in Vienna',
    heroDescription: 'Your creative partner in Vienna. Web design, branding, and digital marketing for businesses in Austria, Germany, and Switzerland.',
    scheduleMeeting: 'Schedule Meeting',
    callNow: 'Call Now',
    contactTitle: 'Contact Vienna',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    hoursLabel: 'Opening Hours',
    hoursValue: 'Mon - Fri: 9:00 AM - 6:00 PM',
    servicesTitle: 'Our Services in Vienna',
    servicesSubtitle: 'From our Vienna headquarters, we offer the full spectrum of creative services for the DACH region.',
    viewAllServices: 'View All Services',
    projectsTitle: 'Projects from Vienna',
    projectsSubtitle: 'Some success stories of our Viennese clients.',
    viewAllProjects: 'View All Projects',
    faqTitle: 'Frequently Asked Questions',
    ctaTitle: 'Discuss Project?',
    ctaDescription: 'Schedule a free initial consultation at our Vienna office or online.',
    ctaButton: 'Schedule Meeting',
    directionsTitle: 'Directions',
    directionsSubtitle: 'Our office is conveniently located in the 10th district.',
    mapPlaceholder: 'Czeikestrasse 4/21\n1100 Vienna',
    mapButtonText: 'Open in Google Maps',
    badge: 'Headquarters',
    services: [
      { name: 'Web Design & Development', description: 'Modern websites with Next.js and React' },
      { name: 'Branding & Corporate Design', description: 'Brand development from logo to guidelines' },
      { name: 'SEO & Online Marketing', description: 'Search engine optimization for local visibility' },
      { name: 'Software Development', description: 'Custom web apps and business software' },
      { name: 'Content Creation', description: 'Texts, photos and videos for your brand' },
      { name: 'E-Commerce', description: 'Online shops and shop system integration' },
    ],
    projects: [
      { client: 'Viennese Traditional Company', category: 'Branding', result: 'Complete brand relaunch' },
      { client: 'Tech Startup Vienna', category: 'Webdesign', result: '+200% more inquiries' },
      { client: 'Restaurant Business', category: 'SEO', result: 'Top 3 on Google Vienna' },
    ],
    faqs: [
      { question: 'Where exactly is the office in Vienna located?', answer: 'Our Vienna office is located at Czeikestrasse 4/21, 1100 Vienna (Favoriten). Easily accessible via U1 (Reumannplatz) and tram lines 6 and 11.' },
      { question: 'Can I schedule an on-site appointment?', answer: 'Yes, we offer personal consultations at our Vienna office. Appointments can be made by phone or via our contact form.' },
      { question: 'Which clients do you serve from Vienna?', answer: 'From Vienna, we serve clients throughout the DACH region – Austria, Germany and Switzerland.' },
      { question: 'What does web design cost in Vienna?', answer: 'Our web design projects start from €2,000 for simple websites. More complex projects with CMS and e-commerce range between €5,000 and €15,000.' },
    ],
    transportOptions: [
      { icon: 'train', title: 'Public Transport', description: 'U1 Station Reumannplatz (5 min walk)\nTram lines 6, 11 (Quellenstraße stop)' },
      { icon: 'car', title: 'By Car', description: 'Parking available in the area\nShort-term parking zone Mon-Fri 9am-10pm' },
    ],
  },
  ru: {
    heroTitle: 'Креативное агентство в Вене',
    heroDescription: 'Ваш креативный партнер в Вене. Веб-дизайн, брендинг и цифровой маркетинг для компаний в Австрии, Германии и Швейцарии.',
    scheduleMeeting: 'Записаться на встречу',
    callNow: 'Позвонить сейчас',
    contactTitle: 'Контакты Вена',
    addressLabel: 'Адрес',
    phoneLabel: 'Телефон',
    emailLabel: 'Эл. почта',
    hoursLabel: 'Часы работы',
    hoursValue: 'Пн - Пт: 09:00 - 18:00',
    servicesTitle: 'Наши услуги в Вене',
    servicesSubtitle: 'Из нашей венской штаб-квартиры мы предлагаем полный спектр креативных услуг для региона DACH.',
    viewAllServices: 'Посмотреть все услуги',
    projectsTitle: 'Проекты из Вены',
    projectsSubtitle: 'Некоторые истории успеха наших венских клиентов.',
    viewAllProjects: 'Посмотреть все проекты',
    faqTitle: 'Часто задаваемые вопросы',
    ctaTitle: 'Обсудить проект?',
    ctaDescription: 'Запишитесь на бесплатную первичную консультацию в нашем венском офисе или онлайн.',
    ctaButton: 'Записаться на встречу',
    directionsTitle: 'Как добраться',
    directionsSubtitle: 'Наш офис удобно расположен в 10-м районе.',
    mapPlaceholder: 'Czeikestrasse 4/21\n1100 Вена',
    mapButtonText: 'Открыть в Google Maps',
    badge: 'Штаб-квартира',
    services: [
      { name: 'Веб-дизайн и разработка', description: 'Современные сайты на Next.js и React' },
      { name: 'Брендинг и корпоративный дизайн', description: 'Разработка бренда от логотипа до руководства' },
      { name: 'SEO и онлайн-маркетинг', description: 'Поисковая оптимизация для локальной видимости' },
      { name: 'Разработка программного обеспечения', description: 'Индивидуальные веб-приложения и бизнес-софт' },
      { name: 'Создание контента', description: 'Тексты, фото и видео для вашего бренда' },
      { name: 'Электронная коммерция', description: 'Интернет-магазины и интеграция торговых систем' },
    ],
    projects: [
      { client: 'Венская традиционная компания', category: 'Брендинг', result: 'Полный ребрендинг' },
      { client: 'Технологический стартап Вена', category: 'Веб-дизайн', result: '+200% больше заявок' },
      { client: 'Ресторанный бизнес', category: 'SEO', result: 'Топ-3 в Google Вена' },
    ],
    faqs: [
      { question: 'Где именно находится офис в Вене?', answer: 'Наш венский офис расположен по адресу Czeikestrasse 4/21, 1100 Вена (Фаворитен). Легко добраться на метро U1 (Reumannplatz) и трамваях 6 и 11.' },
      { question: 'Могу ли я записаться на личную встречу?', answer: 'Да, мы проводим личные консультации в нашем венском офисе. Записаться можно по телефону или через контактную форму.' },
      { question: 'Каких клиентов вы обслуживаете из Вены?', answer: 'Из Вены мы обслуживаем клиентов по всему региону DACH — Австрия, Германия и Швейцария.' },
      { question: 'Сколько стоит веб-дизайн в Вене?', answer: 'Наши проекты по веб-дизайну начинаются от €2 000 за простые сайты. Более сложные проекты с CMS и электронной коммерцией стоят от €5 000 до €15 000.' },
    ],
    transportOptions: [
      { icon: 'train', title: 'Общественный транспорт', description: 'Станция метро U1 Reumannplatz (5 мин пешком)\nТрамваи 6, 11 (остановка Quellenstraße)' },
      { icon: 'car', title: 'На автомобиле', description: 'Парковка доступна в районе\nЗона краткосрочной парковки Пн-Пт 9:00-22:00' },
    ],
  },
}

const defaultSEO = {
  de: {
    title: 'Kreativagentur Wien | Webdesign & Branding in 1100 Wien',
    description: 'GoldenWing Creative Studios Wien - Ihre Kreativagentur für Webdesign, Branding und SEO in Wien. Persönliche Beratung in 1100 Wien.',
    keywords: ['Kreativagentur Wien', 'Webdesign Wien', 'Branding Agentur Wien', 'SEO Wien'],
  },
  en: {
    title: 'Creative Agency Vienna | Web Design & Branding in 1100 Vienna',
    description: 'GoldenWing Creative Studios Vienna - Your creative agency for web design, branding and SEO in Vienna. Personal consultation in 1100 Vienna.',
    keywords: ['Creative Agency Vienna', 'Web Design Vienna', 'Branding Agency Vienna', 'SEO Vienna'],
  },
  ru: {
    title: 'Креативное агентство Вена | Веб-дизайн и брендинг в 1100 Вене',
    description: 'GoldenWing Creative Studios Вена - ваше креативное агентство по веб-дизайну, брендингу и SEO в Вене.',
    keywords: ['Креативное агентство Вена', 'Веб-дизайн Вена', 'Брендинг агентство Вена', 'SEO Вена'],
  },
}

const contactInfo = {
  address: {
    de: ['Czeikestrasse 4/21', '1100 Wien, Österreich'],
    en: ['Czeikestrasse 4/21', '1100 Vienna, Austria'],
    ru: ['Czeikestrasse 4/21', '1100 Вена, Австрия'],
  },
  phone: '+43 664 543 96 81',
  phoneDisplay: '+43 664 543 96 81',
  email: 'office@goldenwing.at',
}

const geoCoordinates = { latitude: 48.1676, longitude: 16.3795 }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as SupportedLocale
  const location = await getLocationBySlug('wien', loc)
   
  const lp = location as Record<string, any> | null
  const defaults = defaultSEO[loc] || defaultSEO.de
  const hreflangAlternates = getHreflangAlternates('/standorte/wien', locale)

  const title = lp?.seo?.metaTitle || defaults.title
  const description = lp?.seo?.metaDescription || defaults.description
  const keywords = lp?.seo?.keywords?.split(',').map((k: string) => k.trim()) || defaults.keywords

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: title.split(' | ')[0] + ' | GoldenWing Creative Studios',
      description,
      url: getCanonicalUrl('/standorte/wien', locale),
    },
    alternates: {
      canonical: getCanonicalUrl('/standorte/wien', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WienPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as SupportedLocale
  const location = await getLocationBySlug('wien', loc)
   
  const lp = location as Record<string, any> | null
  const defaults = defaultContent[loc as 'de' | 'en' | 'ru'] || defaultContent.en

  // Build services array from CMS or defaults
  const services = lp?.services?.length
    ? lp.services.map((s: { name: string; description: string }) => ({
        name: s.name,
        description: s.description,
      }))
    : defaults.services

  // Build projects array from CMS or defaults
  const projects = lp?.projects?.length
    ? lp.projects.map((p: { client: string; category: string; result: string }) => ({
        client: p.client,
        category: p.category,
        result: p.result,
      }))
    : defaults.projects

  // Build FAQs from CMS or defaults
  const faqs = lp?.faqs?.length
    ? lp.faqs.map((f: { question: string; answer: string }) => ({
        question: f.question,
        answer: f.answer,
      }))
    : defaults.faqs

  // Build transport options from CMS or defaults
  const transportOptionsRaw = lp?.transportOptions?.length ? lp.transportOptions : defaults.transportOptions
  const iconMap: Record<string, typeof Train> = { train: Train, car: Car }
  const transportOptions = transportOptionsRaw.map((t: { icon: string; title: string; description: string }) => ({
    icon: iconMap[t.icon] || Train,
    title: t.title,
    description: t.description,
  }))

  // Build content object from CMS or defaults
  const content = {
    heroTitle: lp?.heroTitle || defaults.heroTitle,
    heroDescription: lp?.heroDescription || defaults.heroDescription,
    scheduleMeeting: lp?.labels?.scheduleMeeting || defaults.scheduleMeeting,
    callNow: lp?.labels?.callNow || defaults.callNow,
    contactTitle: lp?.labels?.contactTitle || defaults.contactTitle,
    addressLabel: lp?.labels?.addressLabel || defaults.addressLabel,
    phoneLabel: lp?.labels?.phoneLabel || defaults.phoneLabel,
    emailLabel: lp?.labels?.emailLabel || defaults.emailLabel,
    hoursLabel: lp?.labels?.hoursLabel || defaults.hoursLabel,
    hoursValue: lp?.contact?.hours || defaults.hoursValue,
    servicesTitle: lp?.servicesTitle || defaults.servicesTitle,
    servicesSubtitle: lp?.servicesSubtitle || defaults.servicesSubtitle,
    viewAllServices: lp?.viewAllServicesLabel || defaults.viewAllServices,
    projectsTitle: lp?.projectsTitle || defaults.projectsTitle,
    projectsSubtitle: lp?.projectsSubtitle || defaults.projectsSubtitle,
    viewAllProjects: defaults.viewAllProjects,
    faqTitle: lp?.faqTitle || defaults.faqTitle,
    ctaTitle: lp?.ctaTitle || defaults.ctaTitle,
    ctaDescription: lp?.ctaDescription || defaults.ctaDescription,
    ctaButton: lp?.ctaButton || defaults.ctaButton,
  }

  // Build contact info from CMS or defaults
  const contactAddress = lp?.contact?.addressLines?.length
    ? lp.contact.addressLines.map((a: { line: string }) => a.line)
    : contactInfo.address[loc as 'de' | 'en' | 'ru'] || contactInfo.address.en

  const contact = {
    address: contactAddress,
    phone: lp?.contact?.phone || contactInfo.phone,
    phoneDisplay: lp?.contact?.phoneDisplay || contactInfo.phoneDisplay,
    email: lp?.contact?.email || contactInfo.email,
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/standorte/wien/#localbusiness`,
    name: 'GoldenWing Creative Studios Wien',
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', streetAddress: 'Czeikestrasse 4/21', addressLocality: 'Wien', postalCode: '1100', addressRegion: 'Wien', addressCountry: 'AT' },
    geo: { '@type': 'GeoCoordinates', latitude: lp?.geo?.latitude || geoCoordinates.latitude, longitude: lp?.geo?.longitude || geoCoordinates.longitude },
    url: `${SITE_URL}/standorte/wien`,
    telephone: '+43-664-543-96-81',
    email: 'office@goldenwing.at',
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    areaServed: [{ '@type': 'Country', name: 'Austria' }, { '@type': 'Country', name: 'Germany' }, { '@type': 'Country', name: 'Switzerland' }],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: { question: string; answer: string }) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  }

  return (
    <>
      <StandortPage
        locale={locale}
        flag={lp?.flag || '🇦🇹'}
        badge={lp?.badge || defaults.badge}
        badgeVariant="primary"
        contact={contact}
        services={services}
        projects={projects}
        faqs={faqs}
        content={content}
        transportOptions={transportOptions}
        directionsTitle={lp?.directionsTitle || defaults.directionsTitle}
        directionsSubtitle={lp?.directionsSubtitle || defaults.directionsSubtitle}
        mapPlaceholder={lp?.mapPlaceholder || defaults.mapPlaceholder}
        mapButtonText={lp?.mapButtonText || defaults.mapButtonText}
        mapUrl={lp?.mapUrl || 'https://maps.google.com/?q=Czeikestrasse+4,+1100+Wien'}
        jsonLd={jsonLd}
        faqSchema={faqSchema}
      />
      <WeitereStandorte currentCity="wien" locale={locale as 'de' | 'en' | 'ru'} />
    </>
  )
}
