import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BreadcrumbListSchema, JsonLd } from '@/components/seo/json-ld'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl } from '@/lib/utils'
import { getDatenschutzPage, type SupportedLocale } from '@/lib/payload'
import { Container } from '@/components/ui/container'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// Default content
const defaultContent = {
  de: {
    title: 'Datenschutzerklärung',
    lastUpdated: 'Stand: Dezember 2024',
    responsible: {
      sectionTitle: '1. Verantwortlicher',
      intro: 'Verantwortlich für die Datenverarbeitung auf dieser Website ist:',
      companyName: 'GOLDENWING Creative Studios e.U.',
      personName: 'Mag. Deni Khachukaev',
      street: 'Czeikestrasse 4/21',
      postalCode: '1100',
      city: 'Wien',
      country: 'Österreich',
      email: 'deni@goldenwing.at',
      phone: '+43 664 543 96 81',
    },
    dataCollection: {
      sectionTitle: '2. Datenerhebung auf dieser Website',
      contactForm: {
        title: 'Kontaktformular',
        intro: 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden folgende Daten erhoben:',
        items: ['Name', 'E-Mail-Adresse', 'Telefonnummer (optional)', 'Gewünschte Leistung', 'Ihre Nachricht', 'Budget (optional)'],
        legal: 'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).',
      },
      serverLogs: {
        title: 'Server-Logfiles',
        intro: 'Der Provider der Seiten erhebt automatisch Informationen in sogenannten Server-Logfiles:',
        items: ['IP-Adresse (anonymisiert)', 'Datum und Uhrzeit der Anfrage', 'Aufgerufene Seite', 'Referrer URL', 'Browser und Betriebssystem'],
        retention: 'Diese Daten werden nach 7 Tagen automatisch gelöscht.',
      },
    },
    analytics: {
      sectionTitle: '3. Analyse- und Tracking-Tools',
      intro: 'Wir setzen folgende Analyse-Tools ein, um unsere Website zu verbessern:',
      tools: [
        {
          name: 'Hotjar',
          provider: 'Hotjar Ltd., Dragonara Business Centre, 5th Floor, Dragonara Road, Paceville St Julian\'s STJ 3141, Malta',
          purpose: 'Hotjar erstellt Heatmaps, Session Recordings und Feedback-Umfragen, um das Nutzerverhalten zu analysieren und die User Experience zu verbessern.',
          data: 'Anonymisierte Klick- und Scrolldaten, Geräteinformationen, Bildschirmgröße. IP-Adressen werden automatisch anonymisiert.',
          legal: 'Art. 6 Abs. 1 lit. a DSGVO (Einwilligung via Cookie-Banner).',
          optout: 'Opt-Out: https://www.hotjar.com/legal/compliance/opt-out',
        },
        {
          name: 'Ahrefs Analytics',
          provider: 'Ahrefs Pte. Ltd., 16 Raffles Quay, #33-03 Hong Leong Building, Singapur 048581',
          purpose: 'Ahrefs Analytics erfasst aggregierte Website-Statistiken wie Seitenaufrufe, Besucherquellen und technische Informationen.',
          data: 'Anonymisierte Seitenaufruf-Daten, Referrer-URLs, Geräteinformationen. Keine persönlich identifizierbaren Daten.',
          legal: 'Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Analyse der Websitenutzung).',
          optout: '',
        },
      ],
    },
    cookies: {
      sectionTitle: '4. Cookies',
      intro: 'Unsere Website verwendet Cookies, kleine Textdateien, die auf Ihrem Gerät gespeichert werden.',
      types: 'Wir verwenden folgende Cookie-Arten:',
      cookieTypes: [
        { label: 'Technisch notwendige Cookies', description: 'Für den Betrieb der Website erforderlich' },
        { label: 'Analyse-Cookies', description: 'Zur Verbesserung unserer Website (nur mit Einwilligung)' },
      ],
      tableTitle: 'Cookie-Übersicht',
      cookieTable: [
        { name: '_hjSessionUser_*', provider: 'Hotjar', purpose: 'Eindeutige Besucher-ID für Hotjar', duration: '1 Jahr', type: 'Analyse' },
        { name: '_hjSession_*', provider: 'Hotjar', purpose: 'Aktuelle Session-Daten', duration: 'Session', type: 'Analyse' },
        { name: '_hjIncludedInSessionSample', provider: 'Hotjar', purpose: 'Session-Sampling', duration: '2 Minuten', type: 'Analyse' },
        { name: 'ahrefs_analytics_*', provider: 'Ahrefs', purpose: 'Website-Nutzungsstatistiken', duration: '1 Jahr', type: 'Analyse' },
        { name: '__next_*', provider: 'Next.js', purpose: 'Technische Website-Funktionalität', duration: 'Session', type: 'Notwendig' },
        { name: 'sb-*', provider: 'Supabase', purpose: 'Authentifizierung (Cockpit)', duration: 'Session', type: 'Notwendig' },
      ],
    },
    rights: {
      sectionTitle: '5. Ihre Rechte',
      intro: 'Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:',
      rightsList: [
        { label: 'Auskunft', description: 'Sie können Auskunft über Ihre gespeicherten Daten verlangen.' },
        { label: 'Berichtigung', description: 'Sie können die Berichtigung unrichtiger Daten verlangen.' },
        { label: 'Löschung', description: 'Sie können die Löschung Ihrer Daten verlangen.' },
        { label: 'Einschränkung', description: 'Sie können die Einschränkung der Verarbeitung verlangen.' },
        { label: 'Datenübertragbarkeit', description: 'Sie können die Übertragung Ihrer Daten verlangen.' },
        { label: 'Widerspruch', description: 'Sie können der Verarbeitung Ihrer Daten widersprechen.' },
      ],
    },
    thirdCountry: {
      sectionTitle: '6. Datenübermittlung in Drittländer',
      content: 'Wir übermitteln Ihre Daten grundsätzlich nicht in Länder außerhalb der EU/EWR. Sollte dies im Einzelfall erforderlich sein, erfolgt die Übermittlung nur auf Basis von Standardvertragsklauseln oder anderen geeigneten Garantien.',
    },
    storage: {
      sectionTitle: '7. Speicherdauer',
      content: 'Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorsehen.',
    },
    complaint: {
      sectionTitle: '8. Beschwerderecht',
      intro: 'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die für uns zuständige Behörde ist:',
      authorityName: 'Österreichische Datenschutzbehörde',
      authorityStreet: 'Barichgasse 40-42',
      authorityPostalCode: '1030',
      authorityCity: 'Wien',
      authorityEmail: 'dsb@dsb.gv.at',
    },
    contactSection: {
      sectionTitle: '9. Kontakt',
      intro: 'Bei Fragen zum Datenschutz können Sie uns kontaktieren:',
    },
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: December 2024',
    responsible: {
      sectionTitle: '1. Data Controller',
      intro: 'The data controller for this website is:',
      companyName: 'GOLDENWING Creative Studios e.U.',
      personName: 'Mag. Deni Khachukaev',
      street: 'Czeikestrasse 4/21',
      postalCode: '1100',
      city: 'Vienna',
      country: 'Austria',
      email: 'deni@goldenwing.at',
      phone: '+43 664 543 96 81',
    },
    dataCollection: {
      sectionTitle: '2. Data Collection on This Website',
      contactForm: {
        title: 'Contact Form',
        intro: 'When you submit inquiries via the contact form, the following data is collected:',
        items: ['Name', 'Email address', 'Phone number (optional)', 'Desired service', 'Your message', 'Budget (optional)'],
        legal: 'Legal basis: Art. 6(1)(b) GDPR (contract initiation) and Art. 6(1)(f) GDPR (legitimate interest).',
      },
      serverLogs: {
        title: 'Server Log Files',
        intro: 'The hosting provider automatically collects information in so-called server log files:',
        items: ['IP address (anonymized)', 'Date and time of request', 'Page accessed', 'Referrer URL', 'Browser and operating system'],
        retention: 'This data is automatically deleted after 7 days.',
      },
    },
    analytics: {
      sectionTitle: '3. Analytics and Tracking Tools',
      intro: 'We use the following analytics tools to improve our website:',
      tools: [
        {
          name: 'Hotjar',
          provider: 'Hotjar Ltd., Dragonara Business Centre, 5th Floor, Dragonara Road, Paceville St Julian\'s STJ 3141, Malta',
          purpose: 'Hotjar creates heatmaps, session recordings and feedback surveys to analyze user behavior and improve user experience.',
          data: 'Anonymized click and scroll data, device information, screen size. IP addresses are automatically anonymized.',
          legal: 'Art. 6(1)(a) GDPR (consent via cookie banner).',
          optout: 'Opt-Out: https://www.hotjar.com/legal/compliance/opt-out',
        },
        {
          name: 'Ahrefs Analytics',
          provider: 'Ahrefs Pte. Ltd., 16 Raffles Quay, #33-03 Hong Leong Building, Singapore 048581',
          purpose: 'Ahrefs Analytics collects aggregated website statistics such as page views, visitor sources and technical information.',
          data: 'Anonymized page view data, referrer URLs, device information. No personally identifiable data.',
          legal: 'Art. 6(1)(f) GDPR (legitimate interest in analyzing website usage).',
          optout: '',
        },
      ],
    },
    cookies: {
      sectionTitle: '4. Cookies',
      intro: 'Our website uses cookies, small text files stored on your device.',
      types: 'We use the following types of cookies:',
      cookieTypes: [
        { label: 'Technically necessary cookies', description: 'Required for website operation' },
        { label: 'Analytics cookies', description: 'To improve our website (only with consent)' },
      ],
      tableTitle: 'Cookie Overview',
      cookieTable: [
        { name: '_hjSessionUser_*', provider: 'Hotjar', purpose: 'Unique visitor ID for Hotjar', duration: '1 year', type: 'Analytics' },
        { name: '_hjSession_*', provider: 'Hotjar', purpose: 'Current session data', duration: 'Session', type: 'Analytics' },
        { name: '_hjIncludedInSessionSample', provider: 'Hotjar', purpose: 'Session sampling', duration: '2 minutes', type: 'Analytics' },
        { name: 'ahrefs_analytics_*', provider: 'Ahrefs', purpose: 'Website usage statistics', duration: '1 year', type: 'Analytics' },
        { name: '__next_*', provider: 'Next.js', purpose: 'Technical website functionality', duration: 'Session', type: 'Necessary' },
        { name: 'sb-*', provider: 'Supabase', purpose: 'Authentication (Cockpit)', duration: 'Session', type: 'Necessary' },
      ],
    },
    rights: {
      sectionTitle: '4. Your Rights',
      intro: 'You have the following rights regarding your personal data:',
      rightsList: [
        { label: 'Access', description: 'You may request information about your stored data.' },
        { label: 'Rectification', description: 'You may request the correction of inaccurate data.' },
        { label: 'Erasure', description: 'You may request the deletion of your data.' },
        { label: 'Restriction', description: 'You may request restriction of processing.' },
        { label: 'Data portability', description: 'You may request the transfer of your data.' },
        { label: 'Objection', description: 'You may object to the processing of your data.' },
      ],
    },
    thirdCountry: {
      sectionTitle: '6. Data Transfer to Third Countries',
      content: 'We generally do not transfer your data to countries outside the EU/EEA. If this is necessary in individual cases, the transfer only takes place on the basis of standard contractual clauses or other appropriate safeguards.',
    },
    storage: {
      sectionTitle: '6. Storage Duration',
      content: 'We only store your personal data for as long as is necessary for the respective purposes or as required by statutory retention periods.',
    },
    complaint: {
      sectionTitle: '8. Right to Complain',
      intro: 'You have the right to lodge a complaint with a data protection supervisory authority. The authority responsible for us is:',
      authorityName: 'Austrian Data Protection Authority',
      authorityStreet: 'Barichgasse 40-42',
      authorityPostalCode: '1030',
      authorityCity: 'Vienna',
      authorityEmail: 'dsb@dsb.gv.at',
    },
    contactSection: {
      sectionTitle: '9. Contact',
      intro: 'If you have questions about data protection, you can contact us:',
    },
  },
  ru: {
    title: 'Политика конфиденциальности',
    lastUpdated: 'Последнее обновление: декабрь 2024',
    responsible: {
      sectionTitle: '1. Ответственное лицо',
      intro: 'Ответственным за обработку данных на этом сайте является:',
      companyName: 'GOLDENWING Creative Studios e.U.',
      personName: 'Маг. Дени Хачукаев',
      street: 'Czeikestrasse 4/21',
      postalCode: '1100',
      city: 'Вена',
      country: 'Австрия',
      email: 'deni@goldenwing.at',
      phone: '+43 664 543 96 81',
    },
    dataCollection: {
      sectionTitle: '2. Сбор данных на этом сайте',
      contactForm: {
        title: 'Контактная форма',
        intro: 'При отправке запросов через контактную форму собираются следующие данные:',
        items: ['Имя', 'Адрес электронной почты', 'Номер телефона (по желанию)', 'Желаемая услуга', 'Ваше сообщение', 'Бюджет (по желанию)'],
        legal: 'Правовое основание: ст. 6(1)(b) GDPR (заключение договора) и ст. 6(1)(f) GDPR (законный интерес).',
      },
      serverLogs: {
        title: 'Серверные журналы',
        intro: 'Хостинг-провайдер автоматически собирает информацию в так называемых серверных журналах:',
        items: ['IP-адрес (анонимизированный)', 'Дата и время запроса', 'Посещённая страница', 'URL источника перехода', 'Браузер и операционная система'],
        retention: 'Эти данные автоматически удаляются через 7 дней.',
      },
    },
    analytics: {
      sectionTitle: '3. Инструменты аналитики и отслеживания',
      intro: 'Мы используем следующие инструменты аналитики для улучшения нашего сайта:',
      tools: [
        {
          name: 'Hotjar',
          provider: 'Hotjar Ltd., Dragonara Business Centre, 5th Floor, Dragonara Road, Paceville St Julian\'s STJ 3141, Мальта',
          purpose: 'Hotjar создаёт тепловые карты, записи сессий и опросы для анализа поведения пользователей и улучшения UX.',
          data: 'Анонимизированные данные кликов и прокрутки, информация об устройстве, размер экрана. IP-адреса автоматически анонимизируются.',
          legal: 'Ст. 6 п. 1 лит. a GDPR (согласие через баннер cookie).',
          optout: 'Opt-Out: https://www.hotjar.com/legal/compliance/opt-out',
        },
        {
          name: 'Ahrefs Analytics',
          provider: 'Ahrefs Pte. Ltd., 16 Raffles Quay, #33-03 Hong Leong Building, Сингапур 048581',
          purpose: 'Ahrefs Analytics собирает агрегированную статистику сайта: просмотры страниц, источники посетителей и техническую информацию.',
          data: 'Анонимизированные данные просмотров, URL-адреса источников, информация об устройстве. Никаких персональных данных.',
          legal: 'Ст. 6 п. 1 лит. f GDPR (законный интерес в анализе использования сайта).',
          optout: '',
        },
      ],
    },
    cookies: {
      sectionTitle: '4. Файлы cookie',
      intro: 'Наш сайт использует файлы cookie — небольшие текстовые файлы, сохраняемые на вашем устройстве.',
      types: 'Мы используем следующие типы файлов cookie:',
      cookieTypes: [
        { label: 'Технически необходимые файлы cookie', description: 'Необходимы для работы сайта' },
        { label: 'Аналитические файлы cookie', description: 'Для улучшения нашего сайта (только с согласия)' },
      ],
      tableTitle: 'Обзор файлов cookie',
      cookieTable: [
        { name: '_hjSessionUser_*', provider: 'Hotjar', purpose: 'Уникальный ID посетителя для Hotjar', duration: '1 год', type: 'Аналитика' },
        { name: '_hjSession_*', provider: 'Hotjar', purpose: 'Данные текущей сессии', duration: 'Сессия', type: 'Аналитика' },
        { name: '_hjIncludedInSessionSample', provider: 'Hotjar', purpose: 'Выборка сессий', duration: '2 минуты', type: 'Аналитика' },
        { name: 'ahrefs_analytics_*', provider: 'Ahrefs', purpose: 'Статистика использования сайта', duration: '1 год', type: 'Аналитика' },
        { name: '__next_*', provider: 'Next.js', purpose: 'Техническая функциональность сайта', duration: 'Сессия', type: 'Необходимый' },
        { name: 'sb-*', provider: 'Supabase', purpose: 'Аутентификация (Cockpit)', duration: 'Сессия', type: 'Необходимый' },
      ],
    },
    rights: {
      sectionTitle: '4. Ваши права',
      intro: 'Вы имеете следующие права в отношении ваших персональных данных:',
      rightsList: [
        { label: 'Доступ', description: 'Вы можете запросить информацию о ваших сохранённых данных.' },
        { label: 'Исправление', description: 'Вы можете запросить исправление неточных данных.' },
        { label: 'Удаление', description: 'Вы можете запросить удаление ваших данных.' },
        { label: 'Ограничение', description: 'Вы можете запросить ограничение обработки.' },
        { label: 'Переносимость данных', description: 'Вы можете запросить передачу ваших данных.' },
        { label: 'Возражение', description: 'Вы можете возразить против обработки ваших данных.' },
      ],
    },
    thirdCountry: {
      sectionTitle: '6. Передача данных в третьи страны',
      content: 'Как правило, мы не передаём ваши данные в страны за пределами ЕС/ЕЭЗ. Если это необходимо в отдельных случаях, передача осуществляется только на основании стандартных договорных условий или других надлежащих гарантий.',
    },
    storage: {
      sectionTitle: '7. Срок хранения',
      content: 'Мы храним ваши персональные данные только до тех пор, пока это необходимо для соответствующих целей или пока это предусмотрено законодательными сроками хранения.',
    },
    complaint: {
      sectionTitle: '7. Право на подачу жалобы',
      intro: 'Вы имеете право подать жалобу в надзорный орган по защите данных. Ответственным за нас органом является:',
      authorityName: 'Австрийский орган по защите данных',
      authorityStreet: 'Barichgasse 40-42',
      authorityPostalCode: '1030',
      authorityCity: 'Вена',
      authorityEmail: 'dsb@dsb.gv.at',
    },
    contactSection: {
      sectionTitle: '9. Контакт',
      intro: 'Если у вас есть вопросы по защите данных, вы можете связаться с нами:',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const datenschutzPage = await getDatenschutzPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = datenschutzPage as Record<string, any> | null
  const t = await getTranslations({ locale, namespace: 'privacy' })
  const hreflangAlternates = getHreflangAlternates('/datenschutz')

  const title = cp?.seo?.metaTitle || t('metaTitle')
  const description = cp?.seo?.metaDescription || t('metaDescription')
  const keywords = cp?.seo?.keywords || t('keywords')

  return {
    title,
    description,
    keywords: keywords.split(',').map((k: string) => k.trim()),
    openGraph: {
      title,
      description,
      url: getCanonicalUrl('/datenschutz', locale),
      type: 'website',
      siteName: 'GoldenWing Creative Studios',
      images: [
        {
          url: 'https://goldenwing.at/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
    alternates: {
      canonical: getCanonicalUrl('/datenschutz', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const datenschutzPage = await getDatenschutzPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = datenschutzPage as Record<string, any> | null
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Extract CMS arrays
  type DataItem = { text: string }
  type CookieType = { label: string; description: string }
  type Right = { label: string; description: string }

  const cmsContactFormItems = cp?.dataCollection?.contactForm?.items as DataItem[] | undefined
  const cmsServerLogItems = cp?.dataCollection?.serverLogs?.items as DataItem[] | undefined
  const cmsCookieTypes = cp?.cookies?.cookieTypes as CookieType[] | undefined
  const cmsRightsList = cp?.rights?.rightsList as Right[] | undefined

  // Build content with CMS data or fallbacks
  const content = {
    title: cp?.title || defaults.title,
    lastUpdated: cp?.lastUpdated || defaults.lastUpdated,
    responsible: {
      sectionTitle: cp?.responsible?.sectionTitle || defaults.responsible.sectionTitle,
      intro: cp?.responsible?.intro || defaults.responsible.intro,
      companyName: cp?.responsible?.companyName || defaults.responsible.companyName,
      personName: cp?.responsible?.personName || defaults.responsible.personName,
      street: cp?.responsible?.street || defaults.responsible.street,
      postalCode: cp?.responsible?.postalCode || defaults.responsible.postalCode,
      city: cp?.responsible?.city || defaults.responsible.city,
      country: cp?.responsible?.country || defaults.responsible.country,
      email: cp?.responsible?.email || defaults.responsible.email,
      phone: cp?.responsible?.phone || defaults.responsible.phone,
    },
    dataCollection: {
      sectionTitle: cp?.dataCollection?.sectionTitle || defaults.dataCollection.sectionTitle,
      contactForm: {
        title: cp?.dataCollection?.contactForm?.title || defaults.dataCollection.contactForm.title,
        intro: cp?.dataCollection?.contactForm?.intro || defaults.dataCollection.contactForm.intro,
        items: cmsContactFormItems?.length ? cmsContactFormItems.map(i => i.text) : defaults.dataCollection.contactForm.items,
        legal: cp?.dataCollection?.contactForm?.legal || defaults.dataCollection.contactForm.legal,
      },
      serverLogs: {
        title: cp?.dataCollection?.serverLogs?.title || defaults.dataCollection.serverLogs.title,
        intro: cp?.dataCollection?.serverLogs?.intro || defaults.dataCollection.serverLogs.intro,
        items: cmsServerLogItems?.length ? cmsServerLogItems.map(i => i.text) : defaults.dataCollection.serverLogs.items,
        retention: cp?.dataCollection?.serverLogs?.retention || defaults.dataCollection.serverLogs.retention,
      },
    },
    analytics: defaults.analytics,
    cookies: {
      sectionTitle: cp?.cookies?.sectionTitle || defaults.cookies.sectionTitle,
      intro: cp?.cookies?.intro || defaults.cookies.intro,
      types: cp?.cookies?.types || defaults.cookies.types,
      cookieTypes: cmsCookieTypes?.length ? cmsCookieTypes : defaults.cookies.cookieTypes,
    },
    rights: {
      sectionTitle: cp?.rights?.sectionTitle || defaults.rights.sectionTitle,
      intro: cp?.rights?.intro || defaults.rights.intro,
      rightsList: cmsRightsList?.length ? cmsRightsList : defaults.rights.rightsList,
    },
    thirdCountry: {
      sectionTitle: cp?.thirdCountry?.sectionTitle || defaults.thirdCountry.sectionTitle,
      content: cp?.thirdCountry?.content || defaults.thirdCountry.content,
    },
    storage: {
      sectionTitle: cp?.storage?.sectionTitle || defaults.storage.sectionTitle,
      content: cp?.storage?.content || defaults.storage.content,
    },
    complaint: {
      sectionTitle: cp?.complaint?.sectionTitle || defaults.complaint.sectionTitle,
      intro: cp?.complaint?.intro || defaults.complaint.intro,
      authorityName: cp?.complaint?.authorityName || defaults.complaint.authorityName,
      authorityStreet: cp?.complaint?.authorityStreet || defaults.complaint.authorityStreet,
      authorityPostalCode: cp?.complaint?.authorityPostalCode || defaults.complaint.authorityPostalCode,
      authorityCity: cp?.complaint?.authorityCity || defaults.complaint.authorityCity,
      authorityEmail: cp?.complaint?.authorityEmail || defaults.complaint.authorityEmail,
    },
    contactSection: {
      sectionTitle: cp?.contactSection?.sectionTitle || defaults.contactSection.sectionTitle,
      intro: cp?.contactSection?.intro || defaults.contactSection.intro,
    },
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: { de: 'Datenschutzerklärung', en: 'Privacy Policy', ru: 'Политика конфиденциальности' }[locale] || 'Privacy Policy',
    description: {
      de: 'Datenschutzerklärung von GoldenWing Creative Studios – Informationen zur Datenverarbeitung gemäß DSGVO',
      en: 'Privacy Policy of GoldenWing Creative Studios – Information on data processing according to GDPR',
      ru: 'Политика конфиденциальности GoldenWing Creative Studios — информация об обработке данных в соответствии с GDPR'
    }[locale] || 'Privacy Policy of GoldenWing Creative Studios – Information on data processing according to GDPR',
    url: getSchemaUrl('/datenschutz', locale),
    inLanguage: { de: 'de-AT', en: 'en', ru: 'ru' }[locale] || 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
    publisher: {
      '@type': 'Organization',
      name: content.responsible.companyName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: content.responsible.street,
        addressLocality: content.responsible.city,
        postalCode: content.responsible.postalCode,
        addressCountry: 'AT',
      },
    },
  }

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: getSchemaUrl('/', locale) },
          { name: { de: 'Datenschutz', en: 'Privacy', ru: 'Конфиденциальность' }[locale] || 'Privacy', url: getSchemaUrl('/datenschutz', locale) },
        ]}
      />
      <JsonLd data={webPageSchema} />

      <section className="py-16 md:py-24">
      <Container variant="block">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            {content.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              {content.lastUpdated}
            </p>

            {/* Section 1: Responsible Party */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.responsible.sectionTitle}</h2>
            <p className="text-muted-foreground mb-4">
              {content.responsible.intro}
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>{content.responsible.companyName}</strong><br />
              {content.responsible.personName}<br />
              {content.responsible.street}<br />
              {content.responsible.postalCode} {content.responsible.city}, {content.responsible.country}<br />
              {{ de: 'E-Mail', en: 'Email', ru: 'Эл. почта' }[locale] || 'Email'}: <a href={`mailto:${content.responsible.email}`} className="text-primary hover:underline">{content.responsible.email}</a><br />
              {{ de: 'Telefon', en: 'Phone', ru: 'Телефон' }[locale] || 'Phone'}: <a href={`tel:${content.responsible.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">{content.responsible.phone}</a>
            </p>

            {/* Section 2: Data Collection */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.dataCollection.sectionTitle}</h2>

            <h3 className="text-lg font-medium mt-6 mb-3">{content.dataCollection.contactForm.title}</h3>
            <p className="text-muted-foreground mb-4">
              {content.dataCollection.contactForm.intro}
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              {content.dataCollection.contactForm.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mb-4">
              {content.dataCollection.contactForm.legal}
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">{content.dataCollection.serverLogs.title}</h3>
            <p className="text-muted-foreground mb-4">
              {content.dataCollection.serverLogs.intro}
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              {content.dataCollection.serverLogs.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground mb-4">
              {content.dataCollection.serverLogs.retention}
            </p>

            {/* Section 3: Analytics & Tracking Tools */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.analytics.sectionTitle}</h2>
            <p className="text-muted-foreground mb-4">{content.analytics.intro}</p>
            {content.analytics.tools.map((tool, i) => (
              <div key={i} className="mb-6 pl-4 border-l-2 border-primary/20">
                <h3 className="text-lg font-medium mb-2">{tool.name}</h3>
                <p className="text-muted-foreground text-sm mb-1"><strong>{{ de: 'Anbieter', en: 'Provider', ru: 'Поставщик' }[locale] || 'Provider'}:</strong> {tool.provider}</p>
                <p className="text-muted-foreground text-sm mb-1"><strong>{{ de: 'Zweck', en: 'Purpose', ru: 'Цель' }[locale] || 'Purpose'}:</strong> {tool.purpose}</p>
                <p className="text-muted-foreground text-sm mb-1"><strong>{{ de: 'Verarbeitete Daten', en: 'Data processed', ru: 'Обрабатываемые данные' }[locale] || 'Data processed'}:</strong> {tool.data}</p>
                <p className="text-muted-foreground text-sm mb-1"><strong>{{ de: 'Rechtsgrundlage', en: 'Legal basis', ru: 'Правовая основа' }[locale] || 'Legal basis'}:</strong> {tool.legal}</p>
                {tool.optout && <p className="text-muted-foreground text-sm"><strong>Opt-Out:</strong> <a href={tool.optout.replace('Opt-Out: ', '')} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{tool.optout.replace('Opt-Out: ', '')}</a></p>}
              </div>
            ))}

            {/* Section 4: Cookies */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.cookies.sectionTitle}</h2>
            <p className="text-muted-foreground mb-4">
              {content.cookies.intro}
            </p>
            <p className="text-muted-foreground mb-4">
              {content.cookies.types}
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              {content.cookies.cookieTypes.map((cookie, i) => (
                <li key={i}><strong>{cookie.label}:</strong> {cookie.description}</li>
              ))}
            </ul>

            {/* Cookie Table */}
            {'cookieTable' in defaults.cookies && (
              <>
                <h3 className="text-lg font-medium mt-6 mb-3">{defaults.cookies.tableTitle}</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4 font-medium">Cookie</th>
                        <th className="text-left py-2 pr-4 font-medium">{{ de: 'Anbieter', en: 'Provider', ru: 'Поставщик' }[locale] || 'Provider'}</th>
                        <th className="text-left py-2 pr-4 font-medium">{{ de: 'Zweck', en: 'Purpose', ru: 'Цель' }[locale] || 'Purpose'}</th>
                        <th className="text-left py-2 pr-4 font-medium">{{ de: 'Dauer', en: 'Duration', ru: 'Срок' }[locale] || 'Duration'}</th>
                        <th className="text-left py-2 font-medium">{{ de: 'Typ', en: 'Type', ru: 'Тип' }[locale] || 'Type'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {defaults.cookies.cookieTable.map((cookie, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs">{cookie.name}</td>
                          <td className="py-2 pr-4">{cookie.provider}</td>
                          <td className="py-2 pr-4">{cookie.purpose}</td>
                          <td className="py-2 pr-4">{cookie.duration}</td>
                          <td className="py-2">{cookie.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* Section 5: Your Rights */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.rights.sectionTitle}</h2>
            <p className="text-muted-foreground mb-4">
              {content.rights.intro}
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
              {content.rights.rightsList.map((right, i) => (
                <li key={i}><strong>{right.label}:</strong> {right.description}</li>
              ))}
            </ul>

            {/* Section 6: Third Country Transfers */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.thirdCountry.sectionTitle}</h2>
            <p className="text-muted-foreground mb-4">
              {content.thirdCountry.content}
            </p>

            {/* Section 7: Storage Duration */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.storage.sectionTitle}</h2>
            <p className="text-muted-foreground mb-4">
              {content.storage.content}
            </p>

            {/* Section 8: Complaint Right */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.complaint.sectionTitle}</h2>
            <p className="text-muted-foreground mb-4">
              {content.complaint.intro}
            </p>
            <p className="text-muted-foreground mb-4">
              {content.complaint.authorityName}<br />
              {content.complaint.authorityStreet}<br />
              {content.complaint.authorityPostalCode} {content.complaint.authorityCity}<br />
              <a href={`mailto:${content.complaint.authorityEmail}`} className="text-primary hover:underline">{content.complaint.authorityEmail}</a>
            </p>

            {/* Section 9: Contact */}
            <h2 className="text-3xl md:text-4xl font-semibold mt-8 mb-4">{content.contactSection.sectionTitle}</h2>
            <p className="text-muted-foreground mb-4">
              {content.contactSection.intro}
            </p>
            <p className="text-muted-foreground">
              {{ de: 'E-Mail', en: 'Email', ru: 'Эл. почта' }[locale] || 'Email'}: <a href={`mailto:${content.responsible.email}`} className="text-primary hover:underline">{content.responsible.email}</a><br />
              {{ de: 'Telefon', en: 'Phone', ru: 'Телефон' }[locale] || 'Phone'}: <a href={`tel:${content.responsible.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">{content.responsible.phone}</a>
            </p>
          </div>
        </div>
      </Container>
    </section>
    </>
  )
}
