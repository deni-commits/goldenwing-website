import { Metadata } from 'next'
import { Link } from '@/lib/i18n-navigation'
import Image from 'next/image'
import { ArrowRight, Target, Eye, Heart, Sparkles, Users, Building2, Globe, Clock, Shield, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BreadcrumbSchema } from '@/components/seo/schemas'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/seo/json-ld'
import { getCanonicalUrl, getHreflangAlternates, getContactUrl, getServicesUrl } from '@/lib/utils'
import NextLink from 'next/link'
import { Container } from '@/components/ui/container'
import { TestimonialsColumns, type Testimonial } from '@/components/ui/testimonials-columns'
import { WorldMapLocations } from '@/components/sections/world-map-locations'
import { HowWeWorkSection } from '@/components/sections/how-we-work-section'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


const metaContent = {
  de: {
    title: 'Über uns | Das Team hinter GoldenWing Creative Studios',
    description: 'Lernen Sie GoldenWing Creative Studios kennen: Kreativagentur mit Standorten in Wien, Dubai und California. 120+ Projekte, 13+ Jahre Erfahrung.',
    keywords: ['Über uns Agentur', 'Team Kreativagentur Wien', 'GoldenWing Geschichte', 'Digitalagentur Österreich'],
    ogTitle: 'Über uns | GoldenWing Creative Studios',
    ogDescription: 'Das Team, die Vision und die Werte hinter GoldenWing.',
    ogUrl: 'https://goldenwing.at/ueber-uns',
  },
  en: {
    title: 'About Us | The Team Behind GoldenWing Creative Studios',
    description: 'Meet GoldenWing Creative Studios: Creative agency with locations in Vienna, Dubai, and California. 120+ projects, 13+ years of experience.',
    keywords: ['About Agency', 'Creative Agency Team', 'GoldenWing Story', 'Digital Agency Austria'],
    ogTitle: 'About Us | GoldenWing Creative Studios',
    ogDescription: 'The team, vision, and values behind GoldenWing.',
    ogUrl: 'https://goldenwing.at/en/about-us',
  },
  ru: {
    title: 'О нас | Команда GoldenWing Creative Studios',
    description: 'Познакомьтесь с GoldenWing Creative Studios: Креативное агентство с офисами в Вене, Дубае и Калифорнии. 120+ проектов, 13+ лет опыта.',
    keywords: ['О нас агентство', 'Команда креативного агентства Вена', 'История GoldenWing', 'Цифровое агентство Австрия'],
    ogTitle: 'О нас | GoldenWing Creative Studios',
    ogDescription: 'Команда, видение и ценности GoldenWing.',
    ogUrl: 'https://goldenwing.at/ru/o-nas',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as keyof typeof metaContent
  const hreflangAlternates = getHreflangAlternates('/ueber-uns')
  const meta = metaContent[locale] || metaContent.en

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: meta.ogUrl,
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: meta.ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/ueber-uns', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const t = await getTranslations({ locale, namespace: 'about' })
  const tValues = await getTranslations({ locale, namespace: 'values' })

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'GoldenWing Creative Studios',
    'url': 'https://goldenwing.at',
    'logo': 'https://goldenwing.at/logo.png',
    'description': locale === 'de'
      ? 'Kreativagentur für Branding, Webdesign und digitales Marketing mit Standorten in Wien, Dubai und California.'
      : locale === 'ru'
      ? 'Креативное агентство по брендингу, веб-дизайну и цифровому маркетингу с офисами в Вене, Дубае и Калифорнии.'
      : 'Creative agency for branding, web design, and digital marketing with locations in Vienna, Dubai, and California.',
    'foundingDate': '2013',
    'areaServed': ['AT', 'DE', 'CH', 'AE', 'US'],
    'sameAs': [
      'https://www.linkedin.com/company/goldenwing-creative-studios',
      'https://www.instagram.com/goldenwing.at'
    ],
    'address': [
      {
        '@type': 'PostalAddress',
        'streetAddress': 'Czeikestrasse 4/21',
        'addressLocality': 'Wien',
        'postalCode': '1100',
        'addressCountry': 'AT'
      },
      {
        '@type': 'PostalAddress',
        'streetAddress': 'DAMAC Executive Bay Tower B, Office 1406',
        'addressLocality': 'Dubai',
        'addressCountry': 'AE'
      },
      {
        '@type': 'PostalAddress',
        'streetAddress': '2700 N Hayden Pkwy',
        'addressLocality': 'Roseville',
        'addressRegion': 'CA',
        'postalCode': '95747',
        'addressCountry': 'US'
      }
    ]
  }

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': locale === 'de' ? 'Über uns - GoldenWing Creative Studios' : locale === 'ru' ? 'О нас - GoldenWing Creative Studios' : 'About Us - GoldenWing Creative Studios',
    'description': locale === 'de'
      ? 'Lernen Sie GoldenWing Creative Studios kennen. Das Team, die Vision und die Werte hinter unserer Kreativagentur.'
      : locale === 'ru'
      ? 'Познакомьтесь с GoldenWing Creative Studios. Команда, видение и ценности нашего креативного агентства.'
      : 'Meet GoldenWing Creative Studios. The team, vision, and values behind our creative agency.',
    'url': locale === 'de' ? 'https://goldenwing.at/ueber-uns' : locale === 'ru' ? 'https://goldenwing.at/ru/o-nas' : 'https://goldenwing.at/en/about-us',
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
    },
  }

  const contentData = {
    de: {
      storyTitle: 'Unsere Geschichte',
      storyText: 'GoldenWing Creative Studios wurde 2013 in Wien gegründet – mit einer klaren Vision: Unternehmen dabei zu unterstützen, ihre digitale Präsenz auf ein neues Level zu heben. Was als kleines Designstudio begann, ist heute eine Full-Service-Digitalagentur mit Standorten in Wien, Dubai und California.',
      storySecondText: 'Unser Gründer, selbst Unternehmer mit technischem Hintergrund, wusste aus eigener Erfahrung, wie schwer es ist, eine Agentur zu finden, die nicht nur schöne Designs liefert, sondern auch versteht, wie digitale Strategien zum Geschäftserfolg beitragen. Diese Lücke zu schließen ist bis heute unser Antrieb.',
      locationsTitle: 'Unsere Standorte',
      locationsSubtitle: 'Global aufgestellt, lokal verwurzelt',
      locations: [
        { id: 'roseville', city: 'Roseville, CA', country: 'USA', role: 'Nordamerika', address: '2700 N Hayden Pkwy, Roseville, CA 95747', coordinates: { x: 15, y: 42 } },
        { id: 'vienna', city: 'Wien', country: 'Österreich', role: 'Hauptsitz', address: 'Czeikestrasse 4/21, 1100 Wien', coordinates: { x: 52, y: 35 } },
        { id: 'dubai', city: 'Dubai', country: 'UAE', role: 'Naher Osten', address: 'DAMAC Executive Bay Tower B, Office 1406', coordinates: { x: 62, y: 48 } },
      ],
      whyTitle: 'Warum GoldenWing?',
      whySubtitle: 'Was uns von anderen Agenturen unterscheidet',
      whyPoints: [
        { icon: Shield, title: 'Transparenz', description: 'Keine versteckten Kosten, klare Kommunikation und ehrliche Beratung – auch wenn es bedeutet, von einem Projekt abzuraten.' },
        { icon: Clock, title: 'Verlässlichkeit', description: 'Deadlines halten wir ein. Punkt. Und wenn es eng wird, informieren wir Sie proaktiv statt zu überraschen.' },
        { icon: Globe, title: 'Internationale Perspektive', description: 'Mit Standorten in Europa, dem Nahen Osten und Nordamerika verstehen wir verschiedene Märkte und Kulturen.' },
        { icon: Building2, title: 'Unternehmer-Mindset', description: 'Wir denken in ROI und Geschäftsergebnissen, nicht nur in Pixeln und Klicks.' },
      ],
      ourStoryShort: 'GoldenWing wurde 2013 in Wien mit einem Ziel gegründet: Unternehmen dabei zu helfen, digital zu gewinnen. Heute sind wir eine Full-Service-Agentur mit Teams in Wien, Dubai und Kalifornien.',
      ourStoryShort2: 'Unser Gründer wusste aus eigener Erfahrung, wie schwer es ist, eine Agentur zu finden, die großartiges Design UND Business-Strategie versteht. Diese Lücke zu schließen, treibt uns bis heute an.',
    },
    en: {
      storyTitle: 'Our Story',
      storyText: 'GoldenWing Creative Studios was founded in Vienna in 2013 – with a clear vision: to help companies take their digital presence to the next level. What started as a small design studio has become a full-service digital agency with locations in Vienna, Dubai, and California.',
      storySecondText: 'Our founder, an entrepreneur with a technical background, knew from his own experience how difficult it is to find an agency that not only delivers beautiful designs but also understands how digital strategies contribute to business success. Closing this gap remains our drive to this day.',
      locationsTitle: 'Our Locations',
      locationsSubtitle: 'Globally positioned, locally rooted',
      locations: [
        { id: 'roseville', city: 'Roseville, CA', country: 'USA', role: 'North America', address: '2700 N Hayden Pkwy, Roseville, CA 95747', coordinates: { x: 15, y: 42 } },
        { id: 'vienna', city: 'Vienna', country: 'Austria', role: 'Headquarters', address: 'Czeikestrasse 4/21, 1100 Vienna', coordinates: { x: 52, y: 35 } },
        { id: 'dubai', city: 'Dubai', country: 'UAE', role: 'Middle East', address: 'DAMAC Executive Bay Tower B, Office 1406', coordinates: { x: 62, y: 48 } },
      ],
      whyTitle: 'Why GoldenWing?',
      whySubtitle: 'What sets us apart from other agencies',
      whyPoints: [
        { icon: Shield, title: 'Transparency', description: 'No hidden costs, clear communication, and honest advice – even if it means advising against a project.' },
        { icon: Clock, title: 'Reliability', description: 'We meet deadlines. Period. And if things get tight, we inform you proactively instead of surprising you.' },
        { icon: Globe, title: 'International Perspective', description: 'With locations in Europe, the Middle East, and North America, we understand different markets and cultures.' },
        { icon: Building2, title: 'Entrepreneur Mindset', description: 'We think in terms of ROI and business results, not just pixels and clicks.' },
      ],
      ourStoryShort: 'GoldenWing was founded in Vienna in 2013 with one goal: help businesses win in the digital world. Today, we\'re a full-service agency with teams in Vienna, Dubai, and California.',
      ourStoryShort2: 'Our founder knew from experience how hard it is to find an agency that delivers great design AND understands business strategy. Closing this gap remains our drive to this day.',
    },
    ru: {
      storyTitle: 'Наша история',
      storyText: 'GoldenWing Creative Studios была основана в Вене в 2013 году с ясной целью: помочь компаниям поднять своё цифровое присутствие на новый уровень. Из маленькой дизайн-студии мы выросли в агентство полного цикла с офисами в Вене, Дубае и Калифорнии.',
      storySecondText: 'Наш основатель, предприниматель с техническим бэкграундом, на собственном опыте знал, как сложно найти агентство, которое создаёт красивый дизайн и понимает, как цифровые стратегии влияют на успех бизнеса. Закрыть этот пробел — наша цель по сей день.',
      locationsTitle: 'Наши офисы',
      locationsSubtitle: 'Глобальное присутствие, локальный подход',
      locations: [
        { id: 'roseville', city: 'Розвилл, CA', country: 'США', role: 'Северная Америка', address: '2700 N Hayden Pkwy, Roseville, CA 95747', coordinates: { x: 15, y: 42 } },
        { id: 'vienna', city: 'Вена', country: 'Австрия', role: 'Главный офис', address: 'Czeikestrasse 4/21, 1100 Vienna', coordinates: { x: 52, y: 35 } },
        { id: 'dubai', city: 'Дубай', country: 'ОАЭ', role: 'Ближний Восток', address: 'DAMAC Executive Bay Tower B, Office 1406', coordinates: { x: 62, y: 48 } },
      ],
      whyTitle: 'Почему GoldenWing?',
      whySubtitle: 'Что отличает нас от других агентств',
      whyPoints: [
        { icon: Shield, title: 'Прозрачность', description: 'Никаких скрытых расходов, чёткая коммуникация и честные рекомендации — даже если это означает отговорить от проекта.' },
        { icon: Clock, title: 'Надёжность', description: 'Мы соблюдаем дедлайны. Точка. А если сроки поджимают — сообщаем заранее, а не удивляем.' },
        { icon: Globe, title: 'Международная перспектива', description: 'С офисами в Европе, на Ближнем Востоке и в Северной Америке мы понимаем разные рынки и культуры.' },
        { icon: Building2, title: 'Мышление предпринимателя', description: 'Мы думаем категориями ROI и бизнес-результатов, а не только пикселей и кликов.' },
      ],
      ourStoryShort: 'GoldenWing основана в Вене в 2013 году с одной целью: помочь бизнесу побеждать в цифровом мире. Сегодня мы — агентство полного цикла с командами в Вене, Дубае и Калифорнии.',
      ourStoryShort2: 'Наш основатель на собственном опыте знал, как сложно найти агентство, которое создаёт отличный дизайн И понимает бизнес-стратегию. Закрыть этот пробел — наша цель по сей день.',
    },
  }
  const content = contentData[locale as keyof typeof contentData] || contentData.en

  const values = [
    {
      icon: Target,
      title: tValues('goalOriented.title'),
      description: tValues('goalOriented.description'),
    },
    {
      icon: Sparkles,
      title: tValues('creative.title'),
      description: tValues('creative.description'),
    },
    {
      icon: Heart,
      title: tValues('passionate.title'),
      description: tValues('passionate.description'),
    },
    {
      icon: Users,
      title: tValues('partnership.title'),
      description: tValues('partnership.description'),
    },
  ]

  const statsLabels = {
    de: { projects: 'Erfolgreiche Projekte', satisfaction: 'Kundenzufriedenheit', experience: 'Jahre Erfahrung', locations: 'Standorte weltweit' },
    en: { projects: 'Successful Projects', satisfaction: 'Client Satisfaction', experience: 'Years Experience', locations: 'Locations Worldwide' },
    ru: { projects: 'Успешных проектов', satisfaction: 'Удовлетворённость клиентов', experience: 'Лет опыта', locations: 'Офисов по миру' },
  }
  const statLabels = statsLabels[locale as keyof typeof statsLabels] || statsLabels.en
  const stats = [
    { value: '120+', label: statLabels.projects },
    { value: '98%', label: statLabels.satisfaction },
    { value: '13+', label: statLabels.experience },
    { value: '3', label: statLabels.locations },
  ]

  const testimonialsData = {
    de: [
      { text: 'GoldenWing hat unser komplettes Branding und die Website auf ein neues Level gebracht. Die Zusammenarbeit war professionell, kreativ und immer lösungsorientiert.', name: 'Christian', role: 'Partner', company: 'Alinea Partners' },
      { text: 'Von der ersten Idee bis zur fertigen Umsetzung – das Team hat unsere Vision perfekt verstanden und umgesetzt. Absolute Empfehlung!', name: 'Benedikt', role: 'Gründer', company: 'Point of New' },
      { text: 'Das Pflanzendesign-Konzept und die digitale Präsentation waren genau das, was wir brauchten. Kreativ, modern und auf den Punkt.', name: 'Natalia', role: 'Projektleiterin', company: 'PORR' },
      { text: 'Unsere Türen- und Tore-Präsentation hat durch GoldenWing eine komplett neue Dimension bekommen. Professionell und detailverliebt.', name: 'Markus', role: 'Marketing', company: 'Domoferm' },
      { text: 'Die Zusammenarbeit mit GoldenWing hat unsere Erwartungen übertroffen. Von Microsoft bis Alinea – immer erstklassige Ergebnisse.', name: 'Lehanne', role: 'Consultant', company: 'Alinea Partners & Microsoft' },
      { text: 'Das Präsentationsbuch für Emirates war ein voller Erfolg. Qualität und Liebe zum Detail auf höchstem Niveau.', name: 'Hava', role: 'Project Manager', company: 'Emirates' },
      { text: 'Numbers.ae wurde durch GoldenWing zur führenden Plattform für UAE-Nummernschilder. Technisch perfekt und visuell beeindruckend.', name: 'Kerim', role: 'Founder', company: 'Numbers.ae' },
      { text: 'Trully Golden Dubai erstrahlt dank GoldenWing in neuem Glanz. Das Branding und die Website sind genau das, was wir uns vorgestellt haben.', name: 'Rahim', role: 'Inhaber', company: 'Trully Golden Dubai' },
      { text: 'Kraftpack hat durch die neue Website deutlich mehr Anfragen generiert. Die Investition hat sich schnell ausgezahlt.', name: 'Ramzan', role: 'Geschäftsführer', company: 'Kraftpack' },
      { text: 'VIPROTECT ist durch GoldenWing digital sichtbar geworden. Professionelle Umsetzung mit echtem Verständnis für unsere Branche.', name: 'Martin Wagner', role: 'Geschäftsführer', company: 'VIPROTECT GmbH' },
      { text: 'Der Online-Shop für viridiusLAB läuft hervorragend. Das Team hat unsere technischen Anforderungen perfekt umgesetzt.', name: 'Sandra', role: 'CEO', company: 'viridiusLAB AG' },
      { text: 'Der neue Online-Shop für Weingut Habsburg verkauft sich von selbst. Elegantes Design trifft auf benutzerfreundliche Technik.', name: 'Inna', role: 'Inhaberin', company: 'Weingut Habsburg' },
      { text: 'Von der botanischen Beratung zur digitalen Präsenz – GoldenWing versteht, wie man komplexe Themen einfach kommuniziert.', name: 'David', role: 'Gründer', company: 'Der Botaniker' },
      { text: 'Sharq GmbH hat durch GoldenWing den perfekten digitalen Auftritt bekommen. Schnell, professionell und mit Blick fürs Detail.', name: 'Vadim', role: 'Geschäftsführer', company: 'Sharq GmbH' },
    ],
    en: [
      { text: 'GoldenWing took our complete branding and website to a new level. The collaboration was professional, creative and always solution-oriented.', name: 'Christian', role: 'Partner', company: 'Alinea Partners' },
      { text: 'From the first idea to the finished implementation – the team perfectly understood and implemented our vision. Highly recommended!', name: 'Benedikt', role: 'Founder', company: 'Point of New' },
      { text: 'The plant design concept and digital presentation were exactly what we needed. Creative, modern and to the point.', name: 'Natalia', role: 'Project Manager', company: 'PORR' },
      { text: 'Our door and gate presentation gained a completely new dimension through GoldenWing. Professional and detail-oriented.', name: 'Markus', role: 'Marketing', company: 'Domoferm' },
      { text: 'Working with GoldenWing exceeded our expectations. From Microsoft to Alinea – always first-class results.', name: 'Lehanne', role: 'Consultant', company: 'Alinea Partners & Microsoft' },
      { text: 'The presentation book for Emirates was a complete success. Quality and attention to detail at the highest level.', name: 'Hava', role: 'Project Manager', company: 'Emirates' },
      { text: 'Numbers.ae became the leading platform for UAE license plates through GoldenWing. Technically perfect and visually impressive.', name: 'Kerim', role: 'Founder', company: 'Numbers.ae' },
      { text: 'Trully Golden Dubai shines in new splendor thanks to GoldenWing. The branding and website are exactly what we envisioned.', name: 'Rahim', role: 'Owner', company: 'Trully Golden Dubai' },
      { text: 'Kraftpack has generated significantly more inquiries through the new website. The investment paid off quickly.', name: 'Ramzan', role: 'CEO', company: 'Kraftpack' },
      { text: 'VIPROTECT became digitally visible through GoldenWing. Professional implementation with real understanding of our industry.', name: 'Martin Wagner', role: 'CEO', company: 'VIPROTECT GmbH' },
      { text: 'The online shop for viridiusLAB runs excellently. The team perfectly implemented our technical requirements.', name: 'Sandra', role: 'CEO', company: 'viridiusLAB AG' },
      { text: 'The new online shop for Weingut Habsburg sells itself. Elegant design meets user-friendly technology.', name: 'Inna', role: 'Owner', company: 'Weingut Habsburg' },
      { text: 'From botanical consulting to digital presence – GoldenWing understands how to communicate complex topics simply.', name: 'David', role: 'Founder', company: 'Der Botaniker' },
      { text: 'Sharq GmbH got the perfect digital presence through GoldenWing. Fast, professional and with an eye for detail.', name: 'Vadim', role: 'CEO', company: 'Sharq GmbH' },
    ],
    ru: [
      { text: 'GoldenWing вывели наш брендинг и сайт на новый уровень. Сотрудничество было профессиональным, креативным и всегда ориентированным на решение.', name: 'Christian', role: 'Партнёр', company: 'Alinea Partners' },
      { text: 'От первой идеи до готовой реализации — команда идеально поняла и воплотила наше видение. Однозначно рекомендую!', name: 'Benedikt', role: 'Основатель', company: 'Point of New' },
      { text: 'Концепция растительного дизайна и цифровая презентация — именно то, что нам было нужно. Креативно, современно и по делу.', name: 'Natalia', role: 'Руководитель проекта', company: 'PORR' },
      { text: 'Наша презентация дверей и ворот обрела совершенно новое измерение благодаря GoldenWing. Профессионально и с любовью к деталям.', name: 'Markus', role: 'Маркетинг', company: 'Domoferm' },
      { text: 'Сотрудничество с GoldenWing превзошло наши ожидания. От Microsoft до Alinea — всегда первоклассные результаты.', name: 'Lehanne', role: 'Консультант', company: 'Alinea Partners & Microsoft' },
      { text: 'Презентационная книга для Emirates стала полным успехом. Качество и внимание к деталям на высшем уровне.', name: 'Hava', role: 'Менеджер проекта', company: 'Emirates' },
      { text: 'Numbers.ae стала ведущей платформой для автономеров ОАЭ благодаря GoldenWing. Технически безупречно и визуально впечатляюще.', name: 'Kerim', role: 'Основатель', company: 'Numbers.ae' },
      { text: 'Trully Golden Dubai засиял новым блеском благодаря GoldenWing. Брендинг и сайт — именно то, что мы представляли.', name: 'Rahim', role: 'Владелец', company: 'Trully Golden Dubai' },
      { text: 'Kraftpack получил значительно больше заявок благодаря новому сайту. Инвестиция быстро окупилась.', name: 'Ramzan', role: 'Генеральный директор', company: 'Kraftpack' },
      { text: 'VIPROTECT стала видимой в цифровом мире благодаря GoldenWing. Профессиональная реализация с настоящим пониманием нашей отрасли.', name: 'Martin Wagner', role: 'Генеральный директор', company: 'VIPROTECT GmbH' },
      { text: 'Интернет-магазин viridiusLAB работает отлично. Команда идеально реализовала наши технические требования.', name: 'Sandra', role: 'CEO', company: 'viridiusLAB AG' },
      { text: 'Новый интернет-магазин Weingut Habsburg продаёт сам себя. Элегантный дизайн и удобная технология.', name: 'Inna', role: 'Владелица', company: 'Weingut Habsburg' },
      { text: 'От ботанического консалтинга до цифрового присутствия — GoldenWing понимает, как просто донести сложные темы.', name: 'David', role: 'Основатель', company: 'Der Botaniker' },
      { text: 'Sharq GmbH получила идеальное цифровое присутствие благодаря GoldenWing. Быстро, профессионально и с вниманием к деталям.', name: 'Vadim', role: 'Генеральный директор', company: 'Sharq GmbH' },
    ],
  }
  const testimonials: Testimonial[] = testimonialsData[locale as keyof typeof testimonialsData] || testimonialsData.en

  return (
    <>
      {/* Schema Markup */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: t('pageTitle'), url: '/ueber-uns' },
        ]}
      />
      <JsonLd data={organizationSchema} />
      <JsonLd data={aboutPageSchema} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {t('heroDescription')}
              </p>
              <p className="text-muted-foreground mb-8">
                {t('heroSecondary')}
              </p>
              <Button size="lg" asChild>
                <NextLink href={getContactUrl(locale)}>
                  {t('startProject')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NextLink>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/team/founders.webp"
                  alt={locale === 'de' ? 'Die Gründer von GoldenWing Creative Studios' : locale === 'ru' ? 'Основатели GoldenWing Creative Studios' : 'The founders of GoldenWing Creative Studios'}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/50">
        <Container variant="block">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Story - Clean & Simple */}
      <section className="py-24">
        <Container variant="block" className="text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.storyTitle}
          </h2>

          {/* Lime underline */}
          <div
            className="w-16 h-1 mb-8 mx-auto"
            style={{ backgroundColor: '#f2fb31' }}
          />

          {/* Text */}
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed text-left">
            <p>{content.ourStoryShort}</p>
            <p>{content.ourStoryShort2}</p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/50">
        <Container variant="block">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card rounded-xl border p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">{t('missionTitle')}</h2>
              <p className="text-muted-foreground">
                {t('missionDescription')}
              </p>
            </div>
            <div className="bg-card rounded-xl border p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">{t('visionTitle')}</h2>
              <p className="text-muted-foreground">
                {t('visionDescription')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Locations - Interactive World Map */}
      <WorldMapLocations
        title={content.locationsTitle}
        subtitle={content.locationsSubtitle}
        locations={content.locations}
      />

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('valuesTitle')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('valuesSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-background rounded-xl border p-6 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why GoldenWing */}
      <section className="py-20">
        <Container variant="block">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12 items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 sticky top-24">{content.whyTitle}</h2>
              <p className="text-muted-foreground">
                {content.whySubtitle}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {content.whyPoints.map((point) => (
                <div key={point.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <point.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <Container variant="block">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              {locale === 'de' ? 'Kundenstimmen' : locale === 'ru' ? 'Отзывы клиентов' : 'Testimonials'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'de' ? 'Was unsere Kunden sagen' : locale === 'ru' ? 'Что говорят наши клиенты' : 'What Our Clients Say'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === 'de'
                ? 'Echte Stimmen von echten Partnern – langfristige Zusammenarbeit durch Vertrauen und Ergebnisse.'
                : locale === 'ru'
                ? 'Настоящие отзывы от настоящих партнёров — долгосрочное сотрудничество благодаря доверию и результатам.'
                : 'Real voices from real partners – long-term collaboration through trust and results.'}
            </p>
          </div>
        </Container>
        <TestimonialsColumns testimonials={testimonials} />
      </section>

      {/* How We Work - Process Timeline */}
      <HowWeWorkSection
        title={locale === 'de' ? 'Wie wir arbeiten' : locale === 'ru' ? 'Как мы работаем' : 'How We Work'}
        subtitle={locale === 'de'
          ? 'Ein strukturierter Prozess für konsistent herausragende Ergebnisse.'
          : locale === 'ru'
          ? 'Структурированный процесс для стабильно выдающихся результатов.'
          : 'A structured process for consistently outstanding results.'}
        steps={locale === 'de' ? [
          {
            number: '01',
            title: 'Verstehen',
            description: 'Wir tauchen tief in dein Business ein – Ziele, Zielgruppe, Wettbewerb.',
          },
          {
            number: '02',
            title: 'Planen',
            description: 'Aus Insights wird ein klarer Fahrplan für messbaren Erfolg.',
          },
          {
            number: '03',
            title: 'Umsetzen',
            description: 'Design, Code, Content – alles aus einer Hand, alles aufeinander abgestimmt.',
          },
          {
            number: '04',
            title: 'Wachsen',
            description: 'Wir gehen live, messen Ergebnisse und optimieren kontinuierlich.',
          },
        ] : locale === 'ru' ? [
          {
            number: '01',
            title: 'Понимание',
            description: 'Мы глубоко погружаемся в ваш бизнес — цели, аудитория, конкуренты.',
          },
          {
            number: '02',
            title: 'Планирование',
            description: 'Из инсайтов создаём чёткий план для измеримого успеха.',
          },
          {
            number: '03',
            title: 'Реализация',
            description: 'Дизайн, код, контент — всё из одних рук, всё согласовано.',
          },
          {
            number: '04',
            title: 'Рост',
            description: 'Запускаем, отслеживаем результаты и постоянно оптимизируем.',
          },
        ] : [
          {
            number: '01',
            title: 'Discover',
            description: 'We dive deep into your business – goals, audience, competition.',
          },
          {
            number: '02',
            title: 'Strategize',
            description: 'Insights become a clear roadmap for measurable success.',
          },
          {
            number: '03',
            title: 'Create',
            description: 'Design, code, content – all in-house, all aligned.',
          },
          {
            number: '04',
            title: 'Launch & Grow',
            description: 'We go live, track results, and optimize continuously.',
          },
        ]}
      />

      {/* More About Us - Internal Links to Sub-Pages */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'de' ? 'Mehr über uns' : locale === 'ru' ? 'Подробнее о нас' : 'More About Us'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === 'de'
                ? 'Entdecken Sie weitere Einblicke in unser Team, unsere Werte und Kultur.'
                : locale === 'ru'
                ? 'Узнайте больше о нашей команде, ценностях и культуре.'
                : 'Discover more insights into our team, values, and culture.'}
            </p>
          </div>
          {/* 3+2 Layout: 3 Cards oben, 2 unten zentriert */}
          <div className="grid md:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {/* Erste Reihe: 3 Cards */}
            <Link href="/ueber-uns/team" className="group md:col-span-2">
              <div className="bg-card rounded-xl border p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {locale === 'de' ? 'Unser Team' : locale === 'ru' ? 'Наша команда' : 'Our Team'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {locale === 'de' ? 'Lernen Sie die Menschen hinter GoldenWing kennen.' : locale === 'ru' ? 'Познакомьтесь с людьми за GoldenWing.' : 'Meet the people behind GoldenWing.'}
                </p>
              </div>
            </Link>
            <Link href="/ueber-uns/werte" className="group md:col-span-2">
              <div className="bg-card rounded-xl border p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {locale === 'de' ? 'Unsere Werte' : locale === 'ru' ? 'Наши ценности' : 'Our Values'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {locale === 'de' ? 'Wofür wir stehen und was uns antreibt.' : locale === 'ru' ? 'За что мы стоим и что нас движет.' : 'What we stand for and what drives us.'}
                </p>
              </div>
            </Link>
            <Link href="/ueber-uns/kultur" className="group md:col-span-2">
              <div className="bg-card rounded-xl border p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {locale === 'de' ? 'Unsere Kultur' : locale === 'ru' ? 'Наша культура' : 'Our Culture'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {locale === 'de' ? 'Wie wir arbeiten und zusammenarbeiten.' : locale === 'ru' ? 'Как мы работаем и сотрудничаем.' : 'How we work and collaborate.'}
                </p>
              </div>
            </Link>
            {/* Zweite Reihe: 2 Cards zentriert */}
            <Link href="/ueber-uns/facts-figures" className="group md:col-start-2 md:col-span-2">
              <div className="bg-card rounded-xl border p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {locale === 'de' ? 'Facts & Figures' : locale === 'ru' ? 'Факты и цифры' : 'Facts & Figures'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {locale === 'de' ? 'Zahlen, Daten und Erfolge.' : locale === 'ru' ? 'Цифры, данные и достижения.' : 'Numbers, data, and achievements.'}
                </p>
              </div>
            </Link>
            <Link href="/ueber-uns/partner" className="group md:col-span-2">
              <div className="bg-card rounded-xl border p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {locale === 'de' ? 'Unsere Partner' : locale === 'ru' ? 'Наши партнёры' : 'Our Partners'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {locale === 'de' ? 'Mit wem wir zusammenarbeiten.' : locale === 'ru' ? 'С кем мы сотрудничаем.' : 'Who we work with.'}
                </p>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {t('ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <NextLink href={getContactUrl(locale)}>
                {t('ctaButton')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
              <NextLink href={getServicesUrl(locale)}>
                {locale === 'de' ? 'Unsere Leistungen' : locale === 'ru' ? 'Наши услуги' : 'Our Services'}
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
