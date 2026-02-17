import { Metadata } from 'next'
import { Globe, Building2, CheckCircle } from 'lucide-react'
import { StandortPage } from '@/components/templates/standort-page'
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
    heroTitle: 'Kreativagentur in Dubai',
    heroDescription: 'Ihr kreativer Partner in den VAE. Webdesign, Branding und digitales Marketing für Unternehmen in Dubai, Abu Dhabi und der MENA-Region.',
    scheduleMeeting: 'Termin vereinbaren',
    callNow: 'Jetzt anrufen',
    contactTitle: 'Kontakt Dubai',
    addressLabel: 'Adresse',
    phoneLabel: 'Telefon',
    emailLabel: 'E-Mail',
    hoursLabel: 'Öffnungszeiten',
    hoursValue: 'So - Do: 9:00 - 18:00 Uhr GST',
    servicesTitle: 'Unsere Leistungen in Dubai',
    servicesSubtitle: 'Umfassende kreative Lösungen für den dynamischen VAE-Markt.',
    viewAllServices: 'Alle Leistungen ansehen',
    faqTitle: 'Häufig gestellte Fragen',
    ctaTitle: 'Bereit für Ihr Projekt?',
    ctaDescription: 'Vereinbaren Sie eine kostenlose Beratung in unserem Büro in Dubai oder online.',
    ctaButton: 'Kontakt aufnehmen',
    badge: 'MENA Hub',
    industriesTitle: 'Branchen, die wir betreuen',
    industriesSubtitle: 'Wir arbeiten mit Unternehmen aus verschiedenen Sektoren in den VAE und der MENA-Region und verstehen die einzigartigen Herausforderungen und Chancen jeder Branche.',
    whyChooseTitle: 'Warum GoldenWing Dubai?',
    whyChooseSubtitle: 'Internationale Expertise kombiniert mit lokalem Marktverständnis.',
    services: [
      { name: 'Webdesign & Entwicklung', description: 'Moderne, responsive Websites mit neuester Technologie' },
      { name: 'Branding & Identität', description: 'Vollständige Markenentwicklung vom Logo bis zu den Guidelines' },
      { name: 'Digitales Marketing', description: 'SEO, Social Media und Performance Marketing' },
      { name: 'E-Commerce Lösungen', description: 'Online-Shops und Marktplatz-Integrationen' },
      { name: 'UI/UX Design', description: 'Nutzerzentriertes Design für Apps und Plattformen' },
      { name: 'Content-Produktion', description: 'Fotografie, Videografie und Texterstellung' },
    ],
    industries: [
      { name: 'Immobilien' },
      { name: 'Hotellerie' },
      { name: 'Gastronomie' },
      { name: 'Einzelhandel' },
      { name: 'Gesundheit' },
      { name: 'Finanzen' },
      { name: 'Technologie' },
      { name: 'Tourismus' },
    ],
    faqs: [
      { question: 'Wo befindet sich Ihr Büro in Dubai?', answer: 'Unser Büro in Dubai befindet sich im DAMAC Executive Bay Tower B, Office 1406, Business Bay. Leicht erreichbar und zentral gelegen in einem der besten Geschäftsviertel Dubais.' },
      { question: 'Arbeiten Sie auch mit Unternehmen außerhalb Dubais?', answer: 'Ja, von unserem Büro in Dubai aus betreuen wir Kunden in den gesamten VAE (Abu Dhabi, Sharjah, Ajman) und der größeren MENA-Region einschließlich Saudi-Arabien, Katar, Kuwait, Bahrain und Oman.' },
      { question: 'Welche Sprachen unterstützen Sie?', answer: 'Unser Dubai-Team bietet Dienstleistungen auf Englisch und Arabisch an. Wir erstellen zweisprachige (RTL/LTR) Websites und Marketingmaterialien für den regionalen Markt.' },
      { question: 'Wie sind Ihre Öffnungszeiten?', answer: 'Unser Büro in Dubai ist von Sonntag bis Donnerstag, 9:00 bis 18:00 Uhr GST geöffnet. Wir arbeiten nach der VAE-Geschäftswoche.' },
    ],
    whyChooseItems: [
      { icon: 'globe', title: 'Zweisprachige Kompetenz', description: 'Englisch und Arabisch. RTL/LTR Websites und Marketingmaterialien.' },
      { icon: 'building', title: 'Lokale Präsenz', description: 'Physisches Büro in Business Bay. Persönliche Meetings möglich.' },
      { icon: 'check-circle', title: 'Europäische Qualität', description: 'Österreichische Präzision und Qualitätsstandards bei jedem Projekt.' },
    ],
  },
  en: {
    heroTitle: 'Creative Agency in Dubai',
    heroDescription: 'Your creative partner in the UAE. Web design, branding, and digital marketing for businesses in Dubai, Abu Dhabi, and the MENA region.',
    scheduleMeeting: 'Schedule a Meeting',
    callNow: 'Call Now',
    contactTitle: 'Contact Dubai',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    hoursLabel: 'Business Hours',
    hoursValue: 'Sun - Thu: 9:00 AM - 6:00 PM GST',
    servicesTitle: 'Our Services in Dubai',
    servicesSubtitle: 'Full-service creative solutions tailored for the dynamic UAE market.',
    viewAllServices: 'View All Services',
    faqTitle: 'Frequently Asked Questions',
    ctaTitle: 'Ready to Start Your Project?',
    ctaDescription: 'Schedule a free consultation at our Dubai office or online.',
    ctaButton: 'Get in Touch',
    badge: 'MENA Hub',
    industriesTitle: 'Industries We Serve',
    industriesSubtitle: 'We work with businesses across diverse sectors in the UAE and MENA region, understanding the unique challenges and opportunities of each industry.',
    whyChooseTitle: 'Why Choose GoldenWing Dubai?',
    whyChooseSubtitle: 'Combining international expertise with local market understanding.',
    services: [
      { name: 'Web Design & Development', description: 'Modern, responsive websites built with cutting-edge technology' },
      { name: 'Branding & Identity', description: 'Complete brand development from logo to guidelines' },
      { name: 'Digital Marketing', description: 'SEO, social media, and performance marketing' },
      { name: 'E-Commerce Solutions', description: 'Online stores and marketplace integrations' },
      { name: 'UI/UX Design', description: 'User-centered design for apps and platforms' },
      { name: 'Content Production', description: 'Photography, videography, and copywriting' },
    ],
    industries: [
      { name: 'Real Estate' },
      { name: 'Hospitality' },
      { name: 'F&B' },
      { name: 'Retail' },
      { name: 'Healthcare' },
      { name: 'Finance' },
      { name: 'Technology' },
      { name: 'Tourism' },
    ],
    faqs: [
      { question: 'Where is your Dubai office located?', answer: "Our Dubai office is located in DAMAC Executive Bay Tower B, Office 1406, Business Bay. Easily accessible and centrally located in one of Dubai's prime business districts." },
      { question: 'Do you work with businesses outside Dubai?', answer: 'Yes, from our Dubai office we serve clients across the UAE (Abu Dhabi, Sharjah, Ajman) and the broader MENA region including Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.' },
      { question: 'What languages do you support?', answer: 'Our Dubai team provides services in English and Arabic. We create bilingual (RTL/LTR) websites and marketing materials for the regional market.' },
      { question: 'What are your working hours?', answer: "Our Dubai office operates Sunday to Thursday, 9:00 AM to 6:00 PM GST. We're aligned with the UAE business week." },
    ],
    whyChooseItems: [
      { icon: 'globe', title: 'Bilingual Expertise', description: 'English and Arabic services. RTL/LTR websites and marketing materials.' },
      { icon: 'building', title: 'Local Presence', description: 'Physical office in Business Bay. Face-to-face meetings available.' },
      { icon: 'check-circle', title: 'European Quality', description: 'Austrian precision and quality standards applied to every project.' },
    ],
  },
  ru: {
    heroTitle: 'Креативное агентство в Дубае',
    heroDescription: 'Ваш креативный партнёр в ОАЭ. Веб-дизайн, брендинг и цифровой маркетинг для бизнеса в Дубае, Абу-Даби и регионе MENA.',
    scheduleMeeting: 'Назначить встречу',
    callNow: 'Позвонить сейчас',
    contactTitle: 'Контакты Дубай',
    addressLabel: 'Адрес',
    phoneLabel: 'Телефон',
    emailLabel: 'Эл. почта',
    hoursLabel: 'Часы работы',
    hoursValue: 'Вс - Чт: 9:00 - 18:00 GST',
    servicesTitle: 'Наши услуги в Дубае',
    servicesSubtitle: 'Комплексные креативные решения для динамичного рынка ОАЭ.',
    viewAllServices: 'Все услуги',
    faqTitle: 'Часто задаваемые вопросы',
    ctaTitle: 'Готовы начать проект?',
    ctaDescription: 'Запишитесь на бесплатную консультацию в нашем офисе в Дубае или онлайн.',
    ctaButton: 'Связаться с нами',
    badge: 'MENA Hub',
    industriesTitle: 'Отрасли, которые мы обслуживаем',
    industriesSubtitle: 'Мы работаем с компаниями из различных секторов в ОАЭ и регионе MENA, понимая уникальные вызовы и возможности каждой отрасли.',
    whyChooseTitle: 'Почему GoldenWing Дубай?',
    whyChooseSubtitle: 'Международный опыт в сочетании с пониманием местного рынка.',
    services: [
      { name: 'Веб-дизайн и разработка', description: 'Современные, адаптивные сайты с использованием передовых технологий' },
      { name: 'Брендинг и айдентика', description: 'Полная разработка бренда от логотипа до гайдлайнов' },
      { name: 'Цифровой маркетинг', description: 'SEO, социальные сети и перформанс-маркетинг' },
      { name: 'E-Commerce решения', description: 'Интернет-магазины и интеграции с маркетплейсами' },
      { name: 'UI/UX дизайн', description: 'Пользовательский дизайн для приложений и платформ' },
      { name: 'Контент-продакшн', description: 'Фотография, видеография и копирайтинг' },
    ],
    industries: [
      { name: 'Недвижимость' },
      { name: 'Гостиничный бизнес' },
      { name: 'Рестораны и кафе' },
      { name: 'Розничная торговля' },
      { name: 'Здравоохранение' },
      { name: 'Финансы' },
      { name: 'Технологии' },
      { name: 'Туризм' },
    ],
    faqs: [
      { question: 'Где находится ваш офис в Дубае?', answer: 'Наш офис в Дубае расположен в DAMAC Executive Bay Tower B, Office 1406, Business Bay. Легко доступен и расположен в центре одного из лучших деловых районов Дубая.' },
      { question: 'Работаете ли вы с компаниями за пределами Дубая?', answer: 'Да, из нашего офиса в Дубае мы обслуживаем клиентов по всем ОАЭ (Абу-Даби, Шарджа, Аджман) и в более широком регионе MENA, включая Саудовскую Аравию, Катар, Кувейт, Бахрейн и Оман.' },
      { question: 'Какие языки вы поддерживаете?', answer: 'Наша команда в Дубае предоставляет услуги на английском и арабском языках. Мы создаём двуязычные (RTL/LTR) сайты и маркетинговые материалы для регионального рынка.' },
      { question: 'Каковы ваши часы работы?', answer: 'Наш офис в Дубае работает с воскресенья по четверг, с 9:00 до 18:00 по GST. Мы работаем по рабочей неделе ОАЭ.' },
    ],
    whyChooseItems: [
      { icon: 'globe', title: 'Двуязычная экспертиза', description: 'Услуги на английском и арабском языках. RTL/LTR сайты и маркетинговые материалы.' },
      { icon: 'building', title: 'Локальное присутствие', description: 'Физический офис в Business Bay. Возможны личные встречи.' },
      { icon: 'check-circle', title: 'Европейское качество', description: 'Австрийская точность и стандарты качества в каждом проекте.' },
    ],
  },
}

const defaultSEO = {
  de: {
    title: 'Kreativagentur Dubai | Webdesign & Branding VAE',
    description: 'GoldenWing Creative Studios Dubai - Ihr kreativer Partner in den VAE. Webdesign, Branding und digitales Marketing für Unternehmen in Dubai, Abu Dhabi und der MENA-Region.',
    keywords: ['Kreativagentur Dubai', 'Webdesign Dubai', 'Branding Agentur VAE', 'Digital Marketing Dubai', 'Website Design Dubai', 'Grafikdesign Dubai'],
  },
  en: {
    title: 'Creative Agency Dubai | Web Design & Branding UAE',
    description: 'GoldenWing Creative Studios Dubai - Your creative partner in the UAE. Web design, branding, and digital marketing for businesses in Dubai, Abu Dhabi, and the MENA region.',
    keywords: ['Creative Agency Dubai', 'Web Design Dubai', 'Branding Agency UAE', 'Digital Marketing Dubai', 'Website Design Dubai', 'Graphic Design Dubai'],
  },
  ru: {
    title: 'Креативное агентство Дубай | Веб-дизайн и брендинг ОАЭ',
    description: 'GoldenWing Creative Studios Дубай - ваш креативный партнёр в ОАЭ. Веб-дизайн, брендинг и цифровой маркетинг для бизнеса в Дубае, Абу-Даби и регионе MENA.',
    keywords: ['Креативное агентство Дубай', 'Веб-дизайн Дубай', 'Брендинг агентство ОАЭ', 'Цифровой маркетинг Дубай'],
  },
}

const contactInfo = {
  address: {
    de: ['DAMAC Executive Bay Tower B', 'Office 1406, 14th Floor, Business Bay', 'Dubai, VAE'],
    en: ['DAMAC Executive Bay Tower B', 'Office 1406, 14th Floor, Business Bay', 'Dubai, UAE'],
    ru: ['DAMAC Executive Bay Tower B', 'Office 1406, 14th Floor, Business Bay', 'Дубай, ОАЭ'],
  },
  phone: '+971 58 514 4360',
  phoneDisplay: '+971 58 514 4360',
  email: 'dubai@goldenwing.at',
}

const geoCoordinates = { latitude: 25.1783747, longitude: 55.2615882 }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as SupportedLocale
  const location = await getLocationBySlug('dubai', loc)
   
  const lp = location as Record<string, any> | null
  const defaults = defaultSEO[loc] || defaultSEO.de
  const hreflangAlternates = getHreflangAlternates('/standorte/dubai', locale)

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
      url: getCanonicalUrl('/standorte/dubai', locale),
      locale: loc === 'en' ? 'en_AE' : 'de_AE',
    },
    alternates: {
      canonical: getCanonicalUrl('/standorte/dubai', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function DubaiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as SupportedLocale
  const location = await getLocationBySlug('dubai', loc)
   
  const lp = location as Record<string, any> | null
  const defaults = defaultContent[loc as 'de' | 'en' | 'ru'] || defaultContent.en

  // Build services array from CMS or defaults
  const services = lp?.services?.length
    ? lp.services.map((s: { name: string; description: string }) => ({
        name: s.name,
        description: s.description,
      }))
    : defaults.services

  // Build industries array from CMS or defaults
  const industriesRaw = lp?.industries?.length ? lp.industries : defaults.industries
  const industries = industriesRaw.map((i: { name: string }) => i.name)

  // Build FAQs from CMS or defaults
  const faqs = lp?.faqs?.length
    ? lp.faqs.map((f: { question: string; answer: string }) => ({
        question: f.question,
        answer: f.answer,
      }))
    : defaults.faqs

  // Build why choose items from CMS or defaults
  const whyChooseItemsRaw = lp?.whyChooseItems?.length ? lp.whyChooseItems : defaults.whyChooseItems
  const iconMap: Record<string, typeof Globe> = { globe: Globe, building: Building2, 'check-circle': CheckCircle }
  const whyChooseItems = whyChooseItemsRaw.map((w: { icon: string; title: string; description: string }) => ({
    icon: iconMap[w.icon] || Globe,
    title: w.title,
    description: w.description,
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
    '@id': `${SITE_URL}/standorte/dubai/#localbusiness`,
    name: 'GoldenWing Creative Studios Dubai',
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', streetAddress: 'DAMAC Executive Bay Tower B, Office 1406, 14th Floor', addressLocality: 'Dubai', addressRegion: 'Business Bay', addressCountry: 'AE' },
    geo: { '@type': 'GeoCoordinates', latitude: lp?.geo?.latitude || geoCoordinates.latitude, longitude: lp?.geo?.longitude || geoCoordinates.longitude },
    url: `${SITE_URL}/standorte/dubai`,
    telephone: '+971-58-514-4360',
    email: 'dubai@goldenwing.at',
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '18:00' },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Country', name: 'Kuwait' },
      { '@type': 'Country', name: 'Bahrain' },
      { '@type': 'Country', name: 'Oman' },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: { question: string; answer: string }) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  }

  return (
    <StandortPage
      locale={locale}
      flag={lp?.flag || '🇦🇪'}
      badge={lp?.badge || defaults.badge}
      badgeVariant="muted"
      contact={contact}
      services={services}
      faqs={faqs}
      content={content}
      industries={industries}
      industriesTitle={lp?.industriesTitle || defaults.industriesTitle}
      industriesSubtitle={lp?.industriesSubtitle || defaults.industriesSubtitle}
      whyChoose={{
        title: lp?.whyChooseTitle || defaults.whyChooseTitle,
        subtitle: lp?.whyChooseSubtitle || defaults.whyChooseSubtitle,
        items: whyChooseItems,
      }}
      jsonLd={jsonLd}
      faqSchema={faqSchema}
    />
  )
}
