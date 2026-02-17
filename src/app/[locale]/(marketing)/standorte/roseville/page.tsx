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
    heroTitle: 'Kreativagentur in Kalifornien',
    heroDescription: 'Ihr Kreativpartner in den USA. Webentwicklung, Branding und digitale Lösungen für Unternehmen in Nordamerika.',
    scheduleMeeting: 'Beratungsgespräch',
    callNow: 'Jetzt anrufen',
    contactTitle: 'Kontakt USA',
    addressLabel: 'Adresse',
    phoneLabel: 'Telefon',
    emailLabel: 'E-Mail',
    hoursLabel: 'Öffnungszeiten',
    hoursValue: 'Mo - Fr: 9:00 - 17:00 Uhr PST',
    servicesTitle: 'Unsere Leistungen in den USA',
    servicesSubtitle: 'Full-Service Kreativ- und Entwicklungslösungen für amerikanische Unternehmen.',
    viewAllServices: 'Alle Leistungen ansehen',
    faqTitle: 'Häufig gestellte Fragen',
    ctaTitle: 'Lassen Sie uns etwas Großartiges bauen',
    ctaDescription: 'Vereinbaren Sie ein kostenloses Beratungsgespräch für Ihr Projekt.',
    ctaButton: 'Jetzt starten',
    badge: 'Nordamerika',
    industriesTitle: 'Kunden in ganz Amerika',
    industriesSubtitle: 'Obwohl wir in Nordkalifornien ansässig sind, arbeiten wir mit Unternehmen in den gesamten USA zusammen. Unser Remote-Kollaborationsprozess ist für nahtlose Partnerschaften optimiert.',
    whyChooseTitle: 'Warum GoldenWing USA?',
    whyChooseSubtitle: 'Das Beste aus beiden Welten: Europäische Design-Expertise trifft amerikanisches Marktverständnis.',
    services: [
      { name: 'Webentwicklung', description: 'Maßgeschneiderte Websites und Webanwendungen mit React & Next.js' },
      { name: 'Markenstrategie', description: 'Komplette Markenentwicklung und Positionierung' },
      { name: 'UI/UX Design', description: 'Nutzerzentriertes Design für digitale Produkte' },
      { name: 'Softwarelösungen', description: 'Individuelle Software- und SaaS-Entwicklung' },
      { name: 'Digitales Marketing', description: 'SEO, PPC und Content Marketing' },
      { name: 'E-Commerce', description: 'Shopify, WooCommerce und individuelle Lösungen' },
    ],
    industries: [
      { name: 'Sacramento' },
      { name: 'San Francisco Bay Area' },
      { name: 'Los Angeles' },
      { name: 'San Diego' },
      { name: 'Pacific Northwest' },
      { name: 'Alle 50 Bundesstaaten' },
    ],
    faqs: [
      { question: 'Wo befindet sich Ihr Roseville-Büro?', answer: 'Unser US-Büro befindet sich in 2700 N Hayden Pkwy, Roseville, CA 95747. Wir sind in der Sacramento-Region und damit ideal für Kunden in ganz Nordkalifornien erreichbar.' },
      { question: 'Arbeiten Sie auch mit Kunden außerhalb Kaliforniens?', answer: 'Absolut! Obwohl unser Büro in Roseville ist, arbeiten wir mit Kunden in allen 50 Bundesstaaten. Unsere Projektmanagement-Tools ermöglichen nahtlose Remote-Zusammenarbeit.' },
      { question: 'Welchen Vorteil hat die Zusammenarbeit mit einer internationalen Agentur?', answer: 'Mit Büros in Europa (Wien), dem Nahen Osten (Dubai) und Nordamerika (Roseville) bringen wir vielfältige Perspektiven ein und können Kunden über Zeitzonen hinweg betreuen. Unser europäisches Designerbe kombiniert mit amerikanischem Marktverständnis schafft einzigartigen Mehrwert.' },
      { question: 'Wie sind Ihre Preise im Vergleich zu Bay Area Agenturen?', answer: 'Unser Standort in Roseville ermöglicht es uns, wettbewerbsfähige Preise im Vergleich zu San Francisco oder Silicon Valley Agenturen anzubieten, bei gleichbleibend hohen Qualitätsstandards. Kontaktieren Sie uns für ein individuelles Angebot.' },
    ],
    whyChooseItems: [
      { icon: 'globe', title: 'Internationale Perspektive', description: 'Europäisches Designerbe mit amerikanischem Geschäftssinn.' },
      { icon: 'building', title: 'Wettbewerbsfähige Preise', description: 'Bay Area Qualität zu Sacramento-Preisen.' },
      { icon: 'check-circle', title: 'Zeitzonen-Flexibilität', description: 'Mit Büros in Wien, Dubai und Roseville decken wir alle Zeitzonen ab.' },
    ],
  },
  en: {
    heroTitle: 'Creative Studio in California',
    heroDescription: 'Your creative partner in the United States. Web development, branding, and digital solutions for businesses across North America.',
    scheduleMeeting: 'Schedule a Call',
    callNow: 'Call Now',
    contactTitle: 'Contact USA',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    hoursLabel: 'Business Hours',
    hoursValue: 'Mon - Fri: 9:00 AM - 5:00 PM PST',
    servicesTitle: 'Our Services in the US',
    servicesSubtitle: 'Full-service creative and development solutions for American businesses.',
    viewAllServices: 'View All Services',
    faqTitle: 'Frequently Asked Questions',
    ctaTitle: "Let's Build Something Great",
    ctaDescription: 'Schedule a free consultation call to discuss your project.',
    ctaButton: 'Get Started',
    badge: 'North America',
    industriesTitle: 'Serving Clients Nationwide',
    industriesSubtitle: 'While based in Northern California, we work with businesses across the entire United States. Our remote collaboration process is refined for seamless coast-to-coast partnerships.',
    whyChooseTitle: 'Why Choose GoldenWing USA?',
    whyChooseSubtitle: 'The best of both worlds: European design expertise meets American market understanding.',
    services: [
      { name: 'Web Development', description: 'Custom websites and web applications with React & Next.js' },
      { name: 'Brand Strategy', description: 'Complete brand development and positioning' },
      { name: 'UI/UX Design', description: 'User-centered design for digital products' },
      { name: 'Software Solutions', description: 'Custom software and SaaS development' },
      { name: 'Digital Marketing', description: 'SEO, PPC, and content marketing' },
      { name: 'E-Commerce', description: 'Shopify, WooCommerce, and custom solutions' },
    ],
    industries: [
      { name: 'Sacramento' },
      { name: 'San Francisco Bay Area' },
      { name: 'Los Angeles' },
      { name: 'San Diego' },
      { name: 'Pacific Northwest' },
      { name: 'All 50 States' },
    ],
    faqs: [
      { question: 'Where is your Roseville office located?', answer: "Our US office is located at 2700 N Hayden Pkwy, Roseville, CA 95747. We're in the greater Sacramento area, conveniently located for clients throughout Northern California." },
      { question: 'Do you work with clients outside California?', answer: 'Absolutely! While our physical office is in Roseville, we work with clients across all 50 states. Remote collaboration works seamlessly with our project management tools.' },
      { question: "What's the advantage of working with an international agency?", answer: 'With offices in Europe (Vienna), Middle East (Dubai), and North America (Roseville), we bring diverse perspectives and can serve clients across time zones. Our European design heritage combined with American market understanding creates unique value.' },
      { question: 'What are your rates compared to Bay Area agencies?', answer: 'Our Roseville location allows us to offer competitive rates compared to San Francisco or Silicon Valley agencies, while maintaining the same quality standards. Contact us for a custom quote.' },
    ],
    whyChooseItems: [
      { icon: 'globe', title: 'International Perspective', description: 'European design heritage with American business acumen.' },
      { icon: 'building', title: 'Competitive Rates', description: 'Bay Area quality at Sacramento area prices.' },
      { icon: 'check-circle', title: 'Timezone Flexibility', description: 'With offices in Vienna, Dubai, and Roseville, we cover all time zones.' },
    ],
  },
  ru: {
    heroTitle: 'Креативная студия в Калифорнии',
    heroDescription: 'Ваш креативный партнёр в США. Веб-разработка, брендинг и цифровые решения для бизнеса по всей Северной Америке.',
    scheduleMeeting: 'Запланировать звонок',
    callNow: 'Позвонить сейчас',
    contactTitle: 'Контакты США',
    addressLabel: 'Адрес',
    phoneLabel: 'Телефон',
    emailLabel: 'Эл. почта',
    hoursLabel: 'Часы работы',
    hoursValue: 'Пн - Пт: 9:00 - 17:00 PST',
    servicesTitle: 'Наши услуги в США',
    servicesSubtitle: 'Комплексные креативные и технические решения для американского бизнеса.',
    viewAllServices: 'Все услуги',
    faqTitle: 'Часто задаваемые вопросы',
    ctaTitle: 'Давайте создадим что-то великое',
    ctaDescription: 'Запишитесь на бесплатную консультацию для обсуждения вашего проекта.',
    ctaButton: 'Начать',
    badge: 'Северная Америка',
    industriesTitle: 'Работаем с клиентами по всей стране',
    industriesSubtitle: 'Хотя наш офис находится в Северной Калифорнии, мы работаем с компаниями по всей территории США. Наш процесс удалённого сотрудничества отлажен для бесперебойного партнёрства.',
    whyChooseTitle: 'Почему GoldenWing USA?',
    whyChooseSubtitle: 'Лучшее из двух миров: европейский дизайн-опыт и понимание американского рынка.',
    services: [
      { name: 'Веб-разработка', description: 'Индивидуальные сайты и веб-приложения на React и Next.js' },
      { name: 'Бренд-стратегия', description: 'Комплексное развитие и позиционирование бренда' },
      { name: 'UI/UX дизайн', description: 'Дизайн цифровых продуктов с фокусом на пользователя' },
      { name: 'Программные решения', description: 'Разработка индивидуального ПО и SaaS' },
      { name: 'Цифровой маркетинг', description: 'SEO, контекстная реклама и контент-маркетинг' },
      { name: 'Электронная коммерция', description: 'Shopify, WooCommerce и индивидуальные решения' },
    ],
    industries: [
      { name: 'Сакраменто' },
      { name: 'Район залива Сан-Франциско' },
      { name: 'Лос-Анджелес' },
      { name: 'Сан-Диего' },
      { name: 'Тихоокеанский Северо-Запад' },
      { name: 'Все 50 штатов' },
    ],
    faqs: [
      { question: 'Где находится ваш офис в Розвилле?', answer: 'Наш американский офис расположен по адресу 2700 N Hayden Pkwy, Roseville, CA 95747. Мы находимся в районе большого Сакраменто, что удобно для клиентов по всей Северной Калифорнии.' },
      { question: 'Работаете ли вы с клиентами за пределами Калифорнии?', answer: 'Безусловно! Хотя наш физический офис находится в Розвилле, мы работаем с клиентами во всех 50 штатах. Удалённое сотрудничество прекрасно работает благодаря нашим инструментам управления проектами.' },
      { question: 'В чём преимущество работы с международным агентством?', answer: 'С офисами в Европе (Вена), на Ближнем Востоке (Дубай) и в Северной Америке (Розвилл) мы привносим разнообразные перспективы и можем обслуживать клиентов в разных часовых поясах. Наше европейское дизайн-наследие в сочетании с пониманием американского рынка создаёт уникальную ценность.' },
      { question: 'Каковы ваши цены по сравнению с агентствами Bay Area?', answer: 'Наше расположение в Розвилле позволяет предлагать конкурентоспособные цены по сравнению с агентствами Сан-Франциско или Кремниевой долины при сохранении тех же стандартов качества. Свяжитесь с нами для индивидуального предложения.' },
    ],
    whyChooseItems: [
      { icon: 'globe', title: 'Международная перспектива', description: 'Европейское дизайн-наследие с американской деловой хваткой.' },
      { icon: 'building', title: 'Конкурентные цены', description: 'Качество Bay Area по ценам района Сакраменто.' },
      { icon: 'check-circle', title: 'Гибкость часовых поясов', description: 'С офисами в Вене, Дубае и Розвилле мы охватываем все часовые пояса.' },
    ],
  },
}

const defaultSEO = {
  de: {
    title: 'Kreativagentur Roseville CA | Webdesign Kalifornien',
    description: 'GoldenWing Creative Studios Roseville - Ihr Kreativpartner in Kalifornien. Webdesign, Branding und digitales Marketing für Unternehmen in den USA.',
    keywords: ['Kreativagentur Roseville', 'Webdesign Kalifornien', 'Branding Agentur USA', 'Digital Marketing Sacramento', 'Website Design Roseville CA'],
  },
  en: {
    title: 'Creative Studio Roseville CA | Web Design California',
    description: 'GoldenWing Creative Studios Roseville - Your creative partner in California. Web design, branding, and digital marketing for businesses across the United States.',
    keywords: ['Creative Agency Roseville', 'Web Design California', 'Branding Agency USA', 'Digital Marketing Sacramento', 'Website Design Roseville CA'],
  },
  ru: {
    title: 'Креативная студия Розвилл CA | Веб-дизайн Калифорния',
    description: 'GoldenWing Creative Studios Розвилл - ваш креативный партнёр в Калифорнии. Веб-дизайн, брендинг и цифровой маркетинг для бизнеса в США.',
    keywords: ['Креативное агентство Розвилл', 'Веб-дизайн Калифорния', 'Брендинг агентство США', 'Цифровой маркетинг Сакраменто'],
  },
}

const contactInfo = {
  address: ['2700 N Hayden Pkwy', 'Roseville, CA 95747', 'United States'],
  phone: '+1 916 667 4629',
  phoneDisplay: '+1 916 667 4629',
  email: 'usa@goldenwing.at',
}

const geoCoordinates = { latitude: 38.7521, longitude: -121.2880 }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as SupportedLocale
  const location = await getLocationBySlug('roseville', loc)
   
  const lp = location as Record<string, any> | null
  const defaults = defaultSEO[loc] || defaultSEO.de
  const hreflangAlternates = getHreflangAlternates('/standorte/roseville', locale)

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
      url: getCanonicalUrl('/standorte/roseville', locale),
      locale: loc === 'en' ? 'en_US' : 'de_AT',
    },
    alternates: {
      canonical: getCanonicalUrl('/standorte/roseville', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function RosevillePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as SupportedLocale
  const location = await getLocationBySlug('roseville', loc)
   
  const lp = location as Record<string, any> | null
  const defaults = defaultContent[loc as 'de' | 'en' | 'ru'] || defaultContent.en

  // Build services array from CMS or defaults
  const services = lp?.services?.length
    ? lp.services.map((s: { name: string; description: string }) => ({
        name: s.name,
        description: s.description,
      }))
    : defaults.services

  // Build industries/regions array from CMS or defaults
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
    : contactInfo.address

  const contact = {
    address: contactAddress,
    phone: lp?.contact?.phone || contactInfo.phone,
    phoneDisplay: lp?.contact?.phoneDisplay || contactInfo.phoneDisplay,
    email: lp?.contact?.email || contactInfo.email,
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/standorte/roseville/#localbusiness`,
    name: 'GoldenWing Creative Studios USA',
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: '$$',
    address: { '@type': 'PostalAddress', streetAddress: '2700 N Hayden Pkwy', addressLocality: 'Roseville', addressRegion: 'CA', postalCode: '95747', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: lp?.geo?.latitude || geoCoordinates.latitude, longitude: lp?.geo?.longitude || geoCoordinates.longitude },
    url: `${SITE_URL}/standorte/roseville`,
    telephone: '+1-916-667-4629',
    email: 'usa@goldenwing.at',
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
    areaServed: { '@type': 'Country', name: 'United States' },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: { question: string; answer: string }) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  }

  return (
    <StandortPage
      locale={locale}
      flag={lp?.flag || '🇺🇸'}
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
