import { Metadata } from 'next'
import { getCookieSettingsPage, type SupportedLocale } from '@/lib/payload'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl } from '@/lib/utils'
import { BreadcrumbListSchema, JsonLd } from '@/components/seo/json-ld'
import CookieSettingsClient from './client'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// Default content for CMS fallback
const defaultContent = {
  de: {
    title: 'Cookie-Einstellungen',
    description: 'Verwalten Sie Ihre Cookie-Präferenzen. Sie können Ihre Einstellungen jederzeit ändern.',
    whatAreCookiesTitle: 'Was sind Cookies?',
    whatAreCookiesText1: 'Cookies sind kleine Textdateien, die von Websites auf Ihrem Computer oder Mobilgerät gespeichert werden. Sie dienen dazu, Ihre Präferenzen zu speichern, die Website-Funktionalität zu verbessern und uns zu helfen, zu verstehen, wie Sie unsere Website nutzen. Bei GoldenWing Creative Studios respektieren wir Ihre Privatsphäre und geben Ihnen die volle Kontrolle über die Cookies, die wir verwenden.',
    whatAreCookiesText2: 'Auf dieser Seite können Sie genau festlegen, welche Arten von Cookies Sie zulassen möchten. Notwendige Cookies sind für die grundlegende Funktionalität der Website erforderlich und können nicht deaktiviert werden. Analyse- und Marketing-Cookies sind optional und helfen uns, unsere Website zu verbessern und Ihnen relevantere Inhalte anzubieten.',
    whatAreCookiesText3: 'Wir halten uns an die DSGVO (Datenschutz-Grundverordnung) und das österreichische Datenschutzgesetz. Ihre Einwilligung wird protokolliert und Sie können Ihre Einstellungen jederzeit ändern oder widerrufen.',
    necessaryTitle: 'Notwendige Cookies',
    necessaryAlwaysOn: 'Immer aktiv',
    necessaryDescription: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
    necessaryDetailedText: 'Notwendige Cookies ermöglichen grundlegende Funktionen wie Seitennavigation und den Zugriff auf sichere Bereiche der Website. Die Website kann ohne diese Cookies nicht richtig funktionieren.',
    necessaryPurposeLabel: 'Verwendungszweck:',
    necessaryPurposes: ['Speicherung Ihrer Cookie-Einstellungen', 'Sitzungsverwaltung', 'Sicherheit und Authentifizierung'],
    analyticsTitle: 'Analyse-Cookies',
    analyticsDescription: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.',
    analyticsDetailedText: 'Analyse-Cookies sammeln Informationen darüber, wie Sie unsere Website nutzen. Alle gesammelten Daten werden anonymisiert und können nicht verwendet werden, um Sie persönlich zu identifizieren.',
    analyticsPurposeLabel: 'Verwendungszweck:',
    analyticsPurposes: ['Verständnis der Nutzerinteraktion', 'Verbesserung der Website-Performance', 'Optimierung der Benutzererfahrung', 'Erstellung anonymisierter Statistiken'],
    marketingTitle: 'Marketing-Cookies',
    marketingDescription: 'Diese Cookies werden verwendet, um Ihnen relevante Werbung und personalisierte Inhalte anzuzeigen.',
    marketingDetailedText: 'Marketing-Cookies verfolgen Ihre Aktivitäten auf unserer Website, um Ihnen personalisierte Werbung zu zeigen. Sie können auch verwendet werden, um die Effektivität von Werbekampagnen zu messen.',
    marketingPurposeLabel: 'Verwendungszweck:',
    marketingPurposes: ['Anzeige relevanter Werbung', 'Personalisierung von Inhalten', 'Messung der Werbeeffektivität', 'Retargeting auf anderen Plattformen'],
    saveButton: 'Einstellungen speichern',
    acceptAllButton: 'Alle akzeptieren',
    savedSuccessTitle: 'Cookie-Einstellungen gespeichert',
    savedSuccessDescription: 'Ihre Präferenzen wurden erfolgreich aktualisiert.',
    savedErrorTitle: 'Fehler beim Speichern',
    savedErrorDescription: 'Ihre Einstellungen konnten nicht gespeichert werden.',
    footerText: 'Weitere Informationen zur Verarbeitung Ihrer Daten finden Sie in unserer',
    privacyLinkText: 'Datenschutzerklärung',
    footerText2: '. Bei Fragen zu unseren Cookie-Richtlinien können Sie uns jederzeit',
    contactLinkText: 'kontaktieren',
  },
  en: {
    title: 'Cookie Settings',
    description: 'Manage your cookie preferences. You can change your settings at any time.',
    whatAreCookiesTitle: 'What are Cookies?',
    whatAreCookiesText1: 'Cookies are small text files that are stored on your computer or mobile device by websites. They are used to remember your preferences, improve website functionality, and help us understand how you use our website. At GoldenWing Creative Studios, we respect your privacy and give you full control over the cookies we use.',
    whatAreCookiesText2: 'On this page, you can specify exactly which types of cookies you want to allow. Essential cookies are required for basic website functionality and cannot be disabled. Analytics and marketing cookies are optional and help us improve our website and offer you more relevant content.',
    whatAreCookiesText3: 'We comply with the GDPR (General Data Protection Regulation) and Austrian data protection laws. Your consent is logged and you can change or revoke your settings at any time.',
    necessaryTitle: 'Essential Cookies',
    necessaryAlwaysOn: 'Always active',
    necessaryDescription: 'These cookies are required for basic website functionality and cannot be disabled.',
    necessaryDetailedText: 'Essential cookies enable basic functions such as page navigation and access to secure areas of the website. The website cannot function properly without these cookies.',
    necessaryPurposeLabel: 'Purpose:',
    necessaryPurposes: ['Storing your cookie preferences', 'Session management', 'Security and authentication'],
    analyticsTitle: 'Analytics Cookies',
    analyticsDescription: 'These cookies help us understand how visitors interact with our website.',
    analyticsDetailedText: 'Analytics cookies collect information about how you use our website. All collected data is anonymized and cannot be used to personally identify you.',
    analyticsPurposeLabel: 'Purpose:',
    analyticsPurposes: ['Understanding user interaction', 'Improving website performance', 'Optimizing user experience', 'Creating anonymized statistics'],
    marketingTitle: 'Marketing Cookies',
    marketingDescription: 'These cookies are used to show you relevant advertising and personalized content.',
    marketingDetailedText: 'Marketing cookies track your activities on our website to show you personalized advertising. They may also be used to measure the effectiveness of advertising campaigns.',
    marketingPurposeLabel: 'Purpose:',
    marketingPurposes: ['Displaying relevant advertising', 'Personalizing content', 'Measuring advertising effectiveness', 'Retargeting on other platforms'],
    saveButton: 'Save Settings',
    acceptAllButton: 'Accept All',
    savedSuccessTitle: 'Cookie Settings Saved',
    savedSuccessDescription: 'Your preferences have been successfully updated.',
    savedErrorTitle: 'Error Saving',
    savedErrorDescription: 'Your settings could not be saved.',
    footerText: 'For more information about how we process your data, see our',
    privacyLinkText: 'Privacy Policy',
    footerText2: '. If you have questions about our cookie policy, feel free to',
    contactLinkText: 'contact us',
  },
  ru: {
    title: 'Настройки cookies',
    description: 'Управляйте своими предпочтениями cookies. Вы можете изменить настройки в любое время.',
    whatAreCookiesTitle: 'Что такое cookies?',
    whatAreCookiesText1: 'Cookies - это небольшие текстовые файлы, которые сохраняются на вашем компьютере или мобильном устройстве веб-сайтами. Они используются для запоминания ваших предпочтений, улучшения функциональности сайта и помогают нам понять, как вы используете наш сайт. В GoldenWing Creative Studios мы уважаем вашу конфиденциальность и предоставляем вам полный контроль над используемыми нами cookies.',
    whatAreCookiesText2: 'На этой странице вы можете точно указать, какие типы cookies вы хотите разрешить. Необходимые cookies требуются для базовой функциональности сайта и не могут быть отключены. Аналитические и маркетинговые cookies являются опциональными и помогают нам улучшать наш сайт и предлагать вам более релевантный контент.',
    whatAreCookiesText3: 'Мы соблюдаем GDPR (Общий регламент по защите данных) и австрийские законы о защите данных. Ваше согласие фиксируется, и вы можете изменить или отозвать свои настройки в любое время.',
    necessaryTitle: 'Необходимые cookies',
    necessaryAlwaysOn: 'Всегда активны',
    necessaryDescription: 'Эти cookies необходимы для базовой функциональности сайта и не могут быть отключены.',
    necessaryDetailedText: 'Необходимые cookies обеспечивают базовые функции, такие как навигация по страницам и доступ к защищённым разделам сайта. Сайт не может корректно работать без этих cookies.',
    necessaryPurposeLabel: 'Назначение:',
    necessaryPurposes: ['Сохранение ваших настроек cookies', 'Управление сессией', 'Безопасность и аутентификация'],
    analyticsTitle: 'Аналитические cookies',
    analyticsDescription: 'Эти cookies помогают нам понять, как посетители взаимодействуют с нашим сайтом.',
    analyticsDetailedText: 'Аналитические cookies собирают информацию о том, как вы используете наш сайт. Все собранные данные анонимизированы и не могут быть использованы для вашей личной идентификации.',
    analyticsPurposeLabel: 'Назначение:',
    analyticsPurposes: ['Понимание взаимодействия пользователей', 'Улучшение производительности сайта', 'Оптимизация пользовательского опыта', 'Создание анонимизированной статистики'],
    marketingTitle: 'Маркетинговые cookies',
    marketingDescription: 'Эти cookies используются для показа вам релевантной рекламы и персонализированного контента.',
    marketingDetailedText: 'Маркетинговые cookies отслеживают вашу активность на нашем сайте для показа персонализированной рекламы. Они также могут использоваться для измерения эффективности рекламных кампаний.',
    marketingPurposeLabel: 'Назначение:',
    marketingPurposes: ['Показ релевантной рекламы', 'Персонализация контента', 'Измерение эффективности рекламы', 'Ретаргетинг на других платформах'],
    saveButton: 'Сохранить настройки',
    acceptAllButton: 'Принять все',
    savedSuccessTitle: 'Настройки cookies сохранены',
    savedSuccessDescription: 'Ваши предпочтения были успешно обновлены.',
    savedErrorTitle: 'Ошибка сохранения',
    savedErrorDescription: 'Не удалось сохранить ваши настройки.',
    footerText: 'Для получения дополнительной информации об обработке ваших данных см. нашу',
    privacyLinkText: 'Политику конфиденциальности',
    footerText2: '. Если у вас есть вопросы о нашей политике cookies, вы можете',
    contactLinkText: 'связаться с нами',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const cookieSettingsPage = await getCookieSettingsPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = cookieSettingsPage as Record<string, any> | null

  const title = cp?.seo?.metaTitle || ({
    de: 'Cookie-Einstellungen | GoldenWing Creative Studios',
    en: 'Cookie Settings | GoldenWing Creative Studios',
    ru: 'Настройки cookies | GoldenWing Creative Studios'
  }[locale] || 'Cookie Settings | GoldenWing Creative Studios')
  const description = cp?.seo?.metaDescription || ({
    de: 'Verwalten Sie Ihre Cookie-Präferenzen auf goldenwing.at. DSGVO-konform. Notwendige, Analyse- und Marketing-Cookies individuell einstellen.',
    en: 'Manage your cookie preferences on goldenwing.at. GDPR compliant. Set essential, analytics and marketing cookies individually.',
    ru: 'Управляйте настройками cookies на goldenwing.at. Соответствует GDPR. Настройте необходимые, аналитические и маркетинговые cookies индивидуально.'
  }[locale] || 'Manage your cookie preferences on goldenwing.at. GDPR compliant. Set essential, analytics and marketing cookies individually.')
  const canonicalUrl = getCanonicalUrl('/rechtliches/cookie-einstellungen', locale)
  const hreflangAlternates = getHreflangAlternates('/rechtliches/cookie-einstellungen', locale)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function CookieSettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const cookieSettingsPage = await getCookieSettingsPage(locale)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = cookieSettingsPage as Record<string, any> | null
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Build content with CMS data or fallbacks
  const content = {
    title: cp?.title || defaults.title,
    description: cp?.description || defaults.description,
    whatAreCookiesTitle: defaults.whatAreCookiesTitle,
    whatAreCookiesText1: defaults.whatAreCookiesText1,
    whatAreCookiesText2: defaults.whatAreCookiesText2,
    whatAreCookiesText3: defaults.whatAreCookiesText3,
    necessaryTitle: cp?.necessaryTitle || defaults.necessaryTitle,
    necessaryAlwaysOn: cp?.necessaryAlwaysOn || defaults.necessaryAlwaysOn,
    necessaryDescription: cp?.necessaryDescription || defaults.necessaryDescription,
    necessaryDetailedText: defaults.necessaryDetailedText,
    necessaryPurposeLabel: defaults.necessaryPurposeLabel,
    necessaryPurposes: defaults.necessaryPurposes,
    analyticsTitle: cp?.analyticsTitle || defaults.analyticsTitle,
    analyticsDescription: cp?.analyticsDescription || defaults.analyticsDescription,
    analyticsDetailedText: defaults.analyticsDetailedText,
    analyticsPurposeLabel: defaults.analyticsPurposeLabel,
    analyticsPurposes: defaults.analyticsPurposes,
    marketingTitle: cp?.marketingTitle || defaults.marketingTitle,
    marketingDescription: cp?.marketingDescription || defaults.marketingDescription,
    marketingDetailedText: defaults.marketingDetailedText,
    marketingPurposeLabel: defaults.marketingPurposeLabel,
    marketingPurposes: defaults.marketingPurposes,
    saveButton: cp?.saveButton || defaults.saveButton,
    acceptAllButton: defaults.acceptAllButton,
    savedSuccessTitle: defaults.savedSuccessTitle,
    savedSuccessDescription: defaults.savedSuccessDescription,
    savedErrorTitle: defaults.savedErrorTitle,
    savedErrorDescription: defaults.savedErrorDescription,
    footerText: defaults.footerText,
    privacyLinkText: cp?.privacyLinkText || defaults.privacyLinkText,
    footerText2: defaults.footerText2,
    contactLinkText: defaults.contactLinkText,
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.title,
    description: content.description,
    url: getSchemaUrl('/rechtliches/cookie-einstellungen', locale),
    inLanguage: { de: 'de-AT', en: 'en', ru: 'ru' }[locale] || 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GoldenWing Creative Studios',
      url: 'https://goldenwing.at',
    },
  }

  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: getSchemaUrl('/', locale) },
          { name: { de: 'Rechtliches', en: 'Legal', ru: 'Правовая информация' }[locale] || 'Legal', url: getSchemaUrl('/', locale) },
          { name: { de: 'Cookie-Einstellungen', en: 'Cookie Settings', ru: 'Настройки cookies' }[locale] || 'Cookie Settings', url: getSchemaUrl('/rechtliches/cookie-einstellungen', locale) },
        ]}
      />
      <JsonLd data={webPageSchema} />
      <CookieSettingsClient content={content} />
    </>
  )
}
