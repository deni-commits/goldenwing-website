import { Metadata } from 'next'
import { getNewsletterPage, type SupportedLocale } from '@/lib/payload'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl } from '@/lib/utils'
import { BreadcrumbListSchema, JsonLd } from '@/components/seo/json-ld'
import NewsletterClient from './NewsletterClient'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 60

// Default content
const defaultContent = {
  de: {
    heroTitle: 'Newsletter',
    heroDescription: 'Exklusive Insights, praktische Tipps und die neuesten Trends aus der Welt des digitalen Marketings – direkt in Ihr Postfach. Kein Spam, nur Mehrwert.',
    benefits: [
      { icon: 'gift', title: 'Exklusive Inhalte', description: 'Erhalten Sie Zugang zu exklusiven Guides, Templates und Downloads' },
      { icon: 'trendingUp', title: 'Aktuelle Trends', description: 'Bleiben Sie auf dem neuesten Stand mit aktuellen Branchentrends' },
      { icon: 'zap', title: 'Praxisnahe Tipps', description: 'Sofort umsetzbare Strategien für Ihr digitales Marketing' },
    ],
    formTitle: 'Jetzt anmelden',
    firstNameLabel: 'Vorname (optional)',
    emailLabel: 'E-Mail-Adresse *',
    consentText: 'Ich stimme zu, dass GoldenWing 360 meine E-Mail-Adresse speichert und mir Newsletter zusendet. Ich kann mich jederzeit abmelden. Weitere Informationen finden Sie in unserer',
    submitButton: 'Newsletter abonnieren',
    formNote: 'Wir versenden etwa 2-4 Newsletter pro Monat. Kein Spam, versprochen.',
    successTitle: 'Vielen Dank für Ihre Anmeldung!',
    successDescription: 'Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Bitte klicken Sie auf den Link in der E-Mail, um Ihre Anmeldung abzuschließen.',
    successSteps: [
      { text: 'Überprüfen Sie Ihr Postfach (und ggf. Spam-Ordner)' },
      { text: 'Klicken Sie auf den Bestätigungslink in der E-Mail' },
      { text: 'Erhalten Sie wertvolle Insights direkt in Ihr Postfach' },
    ],
    whatToExpectTitle: 'Das erwartet Sie',
    expectations: [
      { title: 'Wöchentliche Insights', description: 'Jeden Dienstag erhalten Sie die wichtigsten Trends und Strategien aus der digitalen Welt, kompakt aufbereitet.' },
      { title: 'Exklusive Downloads', description: 'Zugriff auf Templates, Checklisten und Guides, die nur Newsletter-Abonnenten zur Verfügung stehen.' },
      { title: 'Case Studies & Erfolgsgeschichten', description: 'Lernen Sie aus realen Projekten und erfolgreichen Kampagnen mit detaillierten Analysen und Learnings.' },
      { title: 'Frühzeitige Ankündigungen', description: 'Erfahren Sie als Erster von neuen Leistungen, Events und besonderen Angeboten.' },
    ],
    faqTitle: 'Häufige Fragen',
    faqs: [
      { question: 'Wie oft erhalte ich Newsletter?', answer: 'In der Regel versenden wir 2-4 Newsletter pro Monat, abhängig von aktuellen Trends und relevanten Themen. Sie werden niemals mit E-Mails überflutet.' },
      { question: 'Kann ich mich jederzeit abmelden?', answer: 'Ja, selbstverständlich. Jeder Newsletter enthält einen Abmelde-Link, mit dem Sie sich mit einem Klick abmelden können. Keine Fragen gestellt.' },
      { question: 'Was passiert mit meinen Daten?', answer: 'Wir nehmen Datenschutz sehr ernst. Ihre E-Mail-Adresse wird ausschließlich für den Newsletter-Versand verwendet und niemals an Dritte weitergegeben. Mehr dazu in unserer Datenschutzerklärung.' },
      { question: 'Ist der Newsletter wirklich kostenlos?', answer: 'Ja, zu 100%. Es gibt keine versteckten Kosten oder Premium-Versionen. Alle Inhalte und Downloads sind komplett kostenlos für alle Abonnenten.' },
    ],
    metaTitle: 'Newsletter abonnieren | GoldenWing Creative Studios',
    metaDescription: 'Abonnieren Sie unseren Newsletter für exklusive Insights, praktische Tipps und die neuesten Trends im digitalen Marketing.',
  },
  en: {
    heroTitle: 'Newsletter',
    heroDescription: 'Exclusive insights, practical tips and the latest trends from the world of digital marketing – straight to your inbox. No spam, just value.',
    benefits: [
      { icon: 'gift', title: 'Exclusive Content', description: 'Get access to exclusive guides, templates and downloads' },
      { icon: 'trendingUp', title: 'Latest Trends', description: 'Stay up to date with current industry trends' },
      { icon: 'zap', title: 'Practical Tips', description: 'Immediately actionable strategies for your digital marketing' },
    ],
    formTitle: 'Subscribe Now',
    firstNameLabel: 'First Name (optional)',
    emailLabel: 'Email Address *',
    consentText: 'I agree that GoldenWing 360 may store my email address and send me newsletters. I can unsubscribe at any time. For more information, see our',
    submitButton: 'Subscribe to Newsletter',
    formNote: 'We send about 2-4 newsletters per month. No spam, we promise.',
    successTitle: 'Thank You for Subscribing!',
    successDescription: 'We have sent you a confirmation email. Please click the link in the email to complete your subscription.',
    successSteps: [
      { text: 'Check your inbox (and spam folder if necessary)' },
      { text: 'Click the confirmation link in the email' },
      { text: 'Receive valuable insights straight to your inbox' },
    ],
    whatToExpectTitle: 'What to Expect',
    expectations: [
      { title: 'Weekly Insights', description: 'Every Tuesday you receive the most important trends and strategies from the digital world, compactly prepared.' },
      { title: 'Exclusive Downloads', description: 'Access to templates, checklists and guides available only to newsletter subscribers.' },
      { title: 'Case Studies & Success Stories', description: 'Learn from real projects and successful campaigns with detailed analyses and learnings.' },
      { title: 'Early Announcements', description: 'Be the first to learn about new services, events and special offers.' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { question: 'How often will I receive newsletters?', answer: 'We typically send 2-4 newsletters per month, depending on current trends and relevant topics. You will never be flooded with emails.' },
      { question: 'Can I unsubscribe at any time?', answer: 'Yes, of course. Every newsletter contains an unsubscribe link that allows you to unsubscribe with one click. No questions asked.' },
      { question: 'What happens to my data?', answer: 'We take data protection very seriously. Your email address is used exclusively for sending newsletters and is never shared with third parties. More in our Privacy Policy.' },
      { question: 'Is the newsletter really free?', answer: 'Yes, 100%. There are no hidden costs or premium versions. All content and downloads are completely free for all subscribers.' },
    ],
    metaTitle: 'Subscribe to Newsletter | GoldenWing Creative Studios',
    metaDescription: 'Subscribe to our newsletter for exclusive insights, practical tips and the latest trends in digital marketing.',
  },
  ru: {
    heroTitle: 'Рассылка',
    heroDescription: 'Эксклюзивные инсайты, практические советы и новейшие тренды из мира цифрового маркетинга — прямо в ваш почтовый ящик. Никакого спама, только ценность.',
    benefits: [
      { icon: 'gift', title: 'Эксклюзивный контент', description: 'Получите доступ к эксклюзивным руководствам, шаблонам и материалам для скачивания' },
      { icon: 'trendingUp', title: 'Актуальные тренды', description: 'Будьте в курсе последних отраслевых трендов' },
      { icon: 'zap', title: 'Практические советы', description: 'Стратегии для вашего цифрового маркетинга, готовые к немедленному применению' },
    ],
    formTitle: 'Подписаться сейчас',
    firstNameLabel: 'Имя (необязательно)',
    emailLabel: 'Электронная почта *',
    consentText: 'Я согласен с тем, что GoldenWing 360 может хранить мой адрес электронной почты и отправлять мне рассылки. Я могу отписаться в любое время. Подробнее см. в нашей',
    submitButton: 'Подписаться на рассылку',
    formNote: 'Мы отправляем около 2-4 писем в месяц. Никакого спама, обещаем.',
    successTitle: 'Спасибо за подписку!',
    successDescription: 'Мы отправили вам письмо для подтверждения. Пожалуйста, перейдите по ссылке в письме, чтобы завершить подписку.',
    successSteps: [
      { text: 'Проверьте ваш почтовый ящик (и папку «Спам» при необходимости)' },
      { text: 'Перейдите по ссылке подтверждения в письме' },
      { text: 'Получайте ценные инсайты прямо в ваш почтовый ящик' },
    ],
    whatToExpectTitle: 'Что вас ждёт',
    expectations: [
      { title: 'Еженедельные инсайты', description: 'Каждый вторник вы получаете самые важные тренды и стратегии из цифрового мира в компактном формате.' },
      { title: 'Эксклюзивные материалы', description: 'Доступ к шаблонам, чек-листам и руководствам, доступным только подписчикам рассылки.' },
      { title: 'Кейсы и истории успеха', description: 'Учитесь на реальных проектах и успешных кампаниях с подробным анализом и выводами.' },
      { title: 'Ранние анонсы', description: 'Узнавайте первыми о новых услугах, мероприятиях и специальных предложениях.' },
    ],
    faqTitle: 'Часто задаваемые вопросы',
    faqs: [
      { question: 'Как часто я буду получать рассылку?', answer: 'Как правило, мы отправляем 2-4 письма в месяц, в зависимости от актуальных трендов и релевантных тем. Вы никогда не будете завалены письмами.' },
      { question: 'Могу ли я отписаться в любое время?', answer: 'Да, конечно. Каждое письмо содержит ссылку для отписки, по которой вы можете отписаться одним кликом. Без лишних вопросов.' },
      { question: 'Что происходит с моими данными?', answer: 'Мы очень серьёзно относимся к защите данных. Ваш адрес электронной почты используется исключительно для отправки рассылки и никогда не передаётся третьим лицам. Подробнее в нашей Политике конфиденциальности.' },
      { question: 'Рассылка действительно бесплатна?', answer: 'Да, на 100%. Нет скрытых платежей или премиум-версий. Весь контент и материалы для скачивания полностью бесплатны для всех подписчиков.' },
    ],
    metaTitle: 'Подписаться на рассылку | GoldenWing Creative Studios',
    metaDescription: 'Подпишитесь на нашу рассылку, чтобы получать эксклюзивные инсайты, практические советы и последние тренды цифрового маркетинга.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const cmsPage = await getNewsletterPage(locale)
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  const title = cmsPage?.seo?.metaTitle || defaults.metaTitle
  const description = cmsPage?.seo?.metaDescription || defaults.metaDescription
  const canonicalUrl = getCanonicalUrl('/ressourcen/newsletter', locale)
  const hreflangAlternates = getHreflangAlternates('/ressourcen/newsletter', locale)

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

export default async function NewsletterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as SupportedLocale
  const cmsPage = await getNewsletterPage(locale)
  const defaults = (defaultContent as Record<string, typeof defaultContent['de']>)[locale] ?? defaultContent['en']

  // Merge CMS data with defaults
  const content = {
    heroTitle: cmsPage?.hero?.title || defaults.heroTitle,
    heroDescription: cmsPage?.hero?.description || defaults.heroDescription,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    benefits: (cmsPage?.benefits as any[])?.length > 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (cmsPage?.benefits as any[]).map((b: any) => ({
          icon: b.icon || 'gift',
          title: b.title,
          description: b.description,
        }))
      : defaults.benefits,
    formTitle: cmsPage?.formTitle || defaults.formTitle,
    firstNameLabel: cmsPage?.firstNameLabel || defaults.firstNameLabel,
    emailLabel: cmsPage?.emailLabel || defaults.emailLabel,
    consentText: cmsPage?.consentText || defaults.consentText,
    submitButton: cmsPage?.submitButton || defaults.submitButton,
    formNote: cmsPage?.formNote || defaults.formNote,
    successTitle: cmsPage?.successTitle || defaults.successTitle,
    successDescription: cmsPage?.successDescription || defaults.successDescription,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    successSteps: (cmsPage?.successSteps as any[])?.length > 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (cmsPage?.successSteps as any[]).map((s: any) => ({ text: s.text }))
      : defaults.successSteps,
    whatToExpectTitle: cmsPage?.whatToExpectTitle || defaults.whatToExpectTitle,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectations: (cmsPage?.expectations as any[])?.length > 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (cmsPage?.expectations as any[]).map((e: any) => ({
          title: e.title,
          description: e.description,
        }))
      : defaults.expectations,
    faqTitle: cmsPage?.faqTitle || defaults.faqTitle,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    faqs: (cmsPage?.faqs as any[])?.length > 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? (cmsPage?.faqs as any[]).map((f: any) => ({
          question: f.question,
          answer: f.answer,
        }))
      : defaults.faqs,
  }

  const metaTitle = cmsPage?.seo?.metaTitle || defaults.metaTitle
  const metaDescription = cmsPage?.seo?.metaDescription || defaults.metaDescription

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metaTitle,
    description: metaDescription,
    url: getCanonicalUrl('/ressourcen/newsletter', locale),
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
          { name: { de: 'Ressourcen', en: 'Resources', ru: 'Ресурсы' }[locale] || 'Resources', url: getSchemaUrl('/ressourcen', locale) },
          { name: 'Newsletter', url: getSchemaUrl('/ressourcen/newsletter', locale) },
        ]}
      />
      <JsonLd data={webPageSchema} />
      <NewsletterClient locale={locale} content={content} />
    </>
  )
}
