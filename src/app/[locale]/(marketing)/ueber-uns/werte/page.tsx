import { Metadata } from 'next'
import { ArrowRight, Target, Eye, Heart, Sparkles, Users, Award, Shield, Lightbulb, Zap, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { getCanonicalUrl, getHreflangAlternates, getSchemaUrl, getContactUrl, getAboutUrl } from '@/lib/utils'
import NextLink from 'next/link'
import { Container } from '@/components/ui/container'
import { FAQSection } from '@/components/sections/faq-section'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


const metaTitles: Record<string, string> = {
  de: 'Unsere Werte | Prinzipien von GoldenWing Creative Studios',
  en: 'Our Values | Principles of GoldenWing Creative Studios',
  ru: 'Наши ценности | Принципы GoldenWing Creative Studios',
}
const metaDescriptions: Record<string, string> = {
  de: 'Die Werte und Prinzipien, die GoldenWing Creative Studios leiten: Zielorientierung, Kreativität, Leidenschaft, Partnerschaft, Exzellenz, Verlässlichkeit, Vision und Agilität.',
  en: 'The values and principles that guide GoldenWing Creative Studios: Goal-orientation, creativity, passion, partnership, excellence, reliability, vision and agility.',
  ru: 'Ценности и принципы, которыми руководствуется GoldenWing Creative Studios: целеустремлённость, креативность, страсть, партнёрство, совершенство, надёжность, видение и гибкость.',
}
const metaKeywords: Record<string, string[]> = {
  de: ['Agentur Werte Wien', 'GoldenWing Philosophie', 'Kreativagentur Prinzipien', 'Unternehmenswerte', 'Zusammenarbeit'],
  en: ['Agency Values Vienna', 'GoldenWing Philosophy', 'Creative Agency Principles', 'Company Values', 'Collaboration'],
  ru: ['Ценности агентства', 'Философия GoldenWing', 'Принципы креативного агентства', 'Корпоративные ценности', 'Сотрудничество'],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'
  const hreflangAlternates = getHreflangAlternates('/ueber-uns/werte')

  const title = metaTitles[locale] || metaTitles.en
  const description = metaDescriptions[locale] || metaDescriptions.en

  return {
    title,
    description,
    keywords: metaKeywords[locale] || metaKeywords.en,
    openGraph: { title, description },
    alternates: {
      canonical: getCanonicalUrl('/ueber-uns/werte', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function ValuesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = localeParam || 'de'

  const content = locale === 'de' ? {
    heroTitle: 'Unsere Werte',
    heroDescription: 'Die Prinzipien und Werte, die uns leiten. Sie prägen unsere Kultur, beeinflussen unsere Entscheidungen und definieren, wie wir mit unseren Kunden und Partnern zusammenarbeiten.',
    introTitle: 'Werte als Kompass',
    introText: 'Werte sind für uns kein Wandschmuck im Büro. Sie sind der Kompass für unsere täglichen Entscheidungen – von der Projektauswahl bis zur Art, wie wir kommunizieren. Wenn Sie mit uns arbeiten, arbeiten Sie mit einem Team, das diese Werte lebt, nicht nur aufschreibt.',
    coreValuesTitle: 'Unsere Kernwerte',
    coreValuesSubtitle: 'Diese acht Werte bilden das Fundament unserer Arbeit und Unternehmenskultur.',
    coreValues: [
      { icon: Target, title: 'Zielorientiert', description: 'Wir konzentrieren uns auf messbare Ergebnisse, die Ihr Business voranbringen. Jedes Projekt beginnt mit klaren Zielen und endet mit nachweisbarem Erfolg.', color: 'text-blue-500', bgColor: 'bg-blue-500/10', example: 'Wir definieren KPIs vor Projektstart und messen den Erfolg regelmäßig.' },
      { icon: Sparkles, title: 'Kreativ', description: 'Innovation und frische Ideen sind der Motor für herausragende Projekte. Wir denken über den Tellerrand hinaus und schaffen einzigartige Lösungen.', color: 'text-foreground', bgColor: 'bg-primary/10', example: 'Kreativ-Workshops mit dem Kunden statt Designs im stillen Kämmerlein.' },
      { icon: Heart, title: 'Leidenschaftlich', description: 'Wir lieben, was wir tun – und das sieht man in jedem Detail. Unsere Begeisterung für Design und Technologie treibt uns zu Höchstleistungen an.', color: 'text-red-500', bgColor: 'bg-red-500/10', example: 'Wir feiern Launches mit unseren Kunden und freuen uns über jeden Erfolg.' },
      { icon: Users, title: 'Partnerschaftlich', description: 'Echte Zusammenarbeit auf Augenhöhe für langfristigen Erfolg. Wir sehen uns als Teil Ihres Teams und arbeiten gemeinsam an Ihren Zielen.', color: 'text-green-500', bgColor: 'bg-green-500/10', example: '85% unserer Kunden arbeiten langfristig mit uns – manche seit über 5 Jahren.' },
      { icon: Award, title: 'Exzellent', description: 'Höchste Qualitätsstandards in allem, was wir tun. Von der Strategie bis zur Umsetzung streben wir nach Perfektion und übertreffen Erwartungen.', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', example: 'Jedes Deliverable durchläuft unseren internen Quality-Check.' },
      { icon: Shield, title: 'Verlässlich', description: 'Transparenz, Ehrlichkeit und Verlässlichkeit bilden das Fundament unserer Arbeit. Wir halten, was wir versprechen – pünktlich und im Budget.', color: 'text-foreground', bgColor: 'bg-primary/10', example: '95% der Projekte werden pünktlich abgeliefert, 92% im Budget.' },
      { icon: Lightbulb, title: 'Visionär', description: 'Wir denken voraus und antizipieren zukünftige Trends. Unsere Lösungen sind zukunftssicher und skalierbar für nachhaltigen Erfolg.', color: 'text-foreground', bgColor: 'bg-primary/10', example: 'Wir beraten proaktiv zu neuen Technologien und Markttrends.' },
      { icon: Zap, title: 'Agil', description: 'Schnelle Reaktion auf Veränderungen und flexible Anpassung an neue Anforderungen. Wir arbeiten effizient und iterativ für optimale Ergebnisse.', color: 'text-foreground', bgColor: 'bg-primary/10', example: '2-Wochen-Sprints mit regelmäßigem Feedback statt langer Entwicklungszyklen.' },
    ],
    principlesTitle: 'Unsere Arbeitsprinzipien',
    principlesSubtitle: 'Diese Grundsätze bestimmen, wie wir arbeiten und Entscheidungen treffen.',
    principles: [
      { title: 'Kundenorientierung', description: 'Der Kunde steht im Mittelpunkt unseres Handelns. Wir hören zu, verstehen die Bedürfnisse und entwickeln maßgeschneiderte Lösungen.', details: ['Aktives Zuhören in jedem Gespräch', 'Regelmäßiges Feedback einholen', 'Lösungen an Geschäftszielen ausrichten'] },
      { title: 'Kontinuierliche Verbesserung', description: 'Wir lernen aus jedem Projekt und optimieren unsere Prozesse kontinuierlich. Stillstand ist Rückschritt – wir entwickeln uns ständig weiter.', details: ['Retrospektiven nach jedem Projekt', 'Weiterbildungszeit für das Team', 'Prozesse regelmäßig hinterfragen'] },
      { title: 'Nachhaltigkeit', description: 'Langfristige Lösungen statt Quick Fixes. Wir schaffen digitale Produkte, die wachsen und sich mit Ihrem Unternehmen entwickeln können.', details: ['Skalierbare Architekturen', 'Dokumentation für Langlebigkeit', 'Wartbare und erweiterbare Systeme'] },
      { title: 'Teamwork', description: 'Erfolg entsteht durch Zusammenarbeit. Wir fördern eine Kultur des Austauschs, des gegenseitigen Respekts und der gemeinsamen Zielerreichung.', details: ['Cross-funktionale Teams', 'Offene Kommunikation', 'Gemeinsame Verantwortung'] },
    ],
    benefitsTitle: 'Was das für Sie bedeutet',
    benefitsSubtitle: 'Unsere Werte sind nicht nur intern relevant – sie prägen direkt, wie wir mit Ihnen arbeiten.',
    benefits: [
      { title: 'Klare Erwartungen', description: 'Durch Zielorientierung und Transparenz wissen Sie immer, wo Ihr Projekt steht und was als Nächstes kommt.' },
      { title: 'Echte Partnerschaft', description: 'Wir sind kein Dienstleister, der Aufträge abarbeitet. Wir sind ein Partner, der Ihre Ziele zu seinen macht.' },
      { title: 'Qualität, auf die Sie sich verlassen können', description: 'Unsere Standards und Prozesse sorgen für konsistent hohe Qualität in jedem Projekt.' },
      { title: 'Zukunftssichere Lösungen', description: 'Durch visionäres Denken und technische Exzellenz erhalten Sie Lösungen, die nicht nach einem Jahr veraltet sind.' },
    ],
    missionTitle: 'Unsere Mission',
    missionText1: 'Wir helfen Unternehmen, ihre digitale Präsenz zu transformieren. Durch strategisches Design und innovative Technologie schaffen wir Erlebnisse, die begeistern und konvertieren.',
    missionText2: 'Unser Ziel ist es, jedes Projekt zu einem Erfolg zu machen – messbar und nachhaltig. Wir glauben an die Kraft von herausragendem Design, das nicht nur schön aussieht, sondern auch Ergebnisse liefert.',
    visionTitle: 'Unsere Vision',
    visionText1: 'Eine Welt, in der jedes Unternehmen – unabhängig von seiner Größe – Zugang zu erstklassigem Design und digitaler Strategie hat.',
    visionText2: 'Wir wollen die erste Wahl sein für Unternehmen, die mehr wollen als Standard und bereit sind, ihre Branche zu prägen. Durch Innovation, Kreativität und technische Exzellenz setzen wir neue Maßstäbe.',
    cultureTitle: 'Unsere Unternehmenskultur',
    cultureText1: 'Bei GoldenWing schaffen wir eine Umgebung, in der Kreativität gedeiht, Innovation gefördert wird und jeder sein Bestes geben kann. Wir glauben an flache Hierarchien, offene Kommunikation und die Kraft von diversen Teams.',
    cultureText2: 'Work-Life-Balance, persönliche Weiterentwicklung und ein unterstützendes Umfeld sind für uns keine Buzzwords, sondern gelebte Realität. Wir investieren in unsere Mitarbeiter, weil wir wissen: Zufriedene Teams schaffen herausragende Arbeit.',
    faqTitle: 'Häufige Fragen zu unseren Werten',
    faqs: [
      {
        question: 'Wie stellt ihr sicher, dass eure Werte nicht nur auf dem Papier existieren?',
        answer: 'Wir leben unsere Werte durch konkrete Praktiken: Retrospektiven nach jedem Projekt, regelmäßige Feedback-Gespräche, dokumentierte Prozesse und messbare Ziele. Neue Mitarbeiter werden von Anfang an in diese Kultur eingeführt, und wir reflektieren regelmäßig, ob unser Handeln unseren Werten entspricht.'
      },
      {
        question: 'Was passiert, wenn ein Projekt nicht zu euren Werten passt?',
        answer: 'Wir sind selektiv bei der Projektauswahl. Wenn wir merken, dass ein Projekt oder eine Zusammenarbeit nicht zu unseren Werten passt – etwa weil unrealistische Erwartungen bestehen oder die Chemie nicht stimmt – sprechen wir das offen an. Manchmal ist es besser, ehrlich abzulehnen als enttäuschte Erwartungen zu riskieren.'
      },
      {
        question: 'Wie zeigt sich Partnerschaftlichkeit in der täglichen Arbeit?',
        answer: 'Wir sehen uns als Erweiterung Ihres Teams, nicht als externer Dienstleister. Das bedeutet: Wir denken mit, geben ehrliches Feedback (auch wenn es unbequem ist), teilen Wissen und feiern Erfolge gemeinsam. Viele unserer Kundenbeziehungen bestehen seit Jahren – das zeigt, dass dieser Ansatz funktioniert.'
      },
      {
        question: 'Wie messt ihr "Exzellenz"?',
        answer: 'Exzellenz ist für uns nicht subjektiv. Wir messen sie an: Kundenzufriedenheit (98% positive Bewertungen), Projektpünktlichkeit (95%), Budget-Einhaltung (92%) und langfristigen Kundenbeziehungen (85% Wiederkehr-Rate). Zusätzlich durchläuft jedes Deliverable unseren internen Quality-Check.'
      },
    ],
    ctaTitle: 'Teilen Sie unsere Werte?',
    ctaDescription: 'Wenn Sie einen Partner suchen, der Ihre Vision versteht und Ihre Werte teilt, dann lassen Sie uns sprechen. Gemeinsam erschaffen wir etwas Besonderes.',
    ctaButton: 'Jetzt Kontakt aufnehmen',
  } : locale === 'ru' ? {
    heroTitle: 'Наши ценности',
    heroDescription: 'Принципы и ценности, которые нас направляют. Они формируют нашу культуру, влияют на наши решения и определяют, как мы работаем с клиентами и партнёрами.',
    introTitle: 'Ценности как компас',
    introText: 'Для нас ценности — это не украшение стен офиса. Они — компас для наших ежедневных решений: от выбора проектов до способа коммуникации. Работая с нами, вы работаете с командой, которая живёт этими ценностями, а не просто их записывает.',
    coreValuesTitle: 'Наши ключевые ценности',
    coreValuesSubtitle: 'Эти восемь ценностей составляют фундамент нашей работы и корпоративной культуры.',
    coreValues: [
      { icon: Target, title: 'Целеустремлённость', description: 'Мы сосредоточены на измеримых результатах, которые двигают ваш бизнес вперёд. Каждый проект начинается с чётких целей и заканчивается доказуемым успехом.', color: 'text-blue-500', bgColor: 'bg-blue-500/10', example: 'Мы определяем KPI до начала проекта и регулярно измеряем успех.' },
      { icon: Sparkles, title: 'Креативность', description: 'Инновации и свежие идеи — двигатель выдающихся проектов. Мы мыслим нестандартно и создаём уникальные решения.', color: 'text-foreground', bgColor: 'bg-primary/10', example: 'Креативные воркшопы с клиентом вместо дизайна в изоляции.' },
      { icon: Heart, title: 'Страсть', description: 'Мы любим то, что делаем — и это видно в каждой детали. Наш энтузиазм к дизайну и технологиям толкает нас к максимальным результатам.', color: 'text-red-500', bgColor: 'bg-red-500/10', example: 'Мы празднуем запуски с клиентами и радуемся каждому успеху.' },
      { icon: Users, title: 'Партнёрство', description: 'Настоящее сотрудничество на равных для долгосрочного успеха. Мы видим себя частью вашей команды и работаем вместе над вашими целями.', color: 'text-green-500', bgColor: 'bg-green-500/10', example: '85% наших клиентов работают с нами долгосрочно — некоторые более 5 лет.' },
      { icon: Award, title: 'Совершенство', description: 'Высочайшие стандарты качества во всём, что мы делаем. От стратегии до реализации мы стремимся к совершенству и превосходим ожидания.', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', example: 'Каждый результат проходит наш внутренний контроль качества.' },
      { icon: Shield, title: 'Надёжность', description: 'Прозрачность, честность и надёжность — фундамент нашей работы. Мы выполняем обещания — вовремя и в рамках бюджета.', color: 'text-foreground', bgColor: 'bg-primary/10', example: '95% проектов сдаются вовремя, 92% — в рамках бюджета.' },
      { icon: Lightbulb, title: 'Видение', description: 'Мы думаем наперёд и предвидим будущие тренды. Наши решения готовы к будущему и масштабируемы для устойчивого успеха.', color: 'text-foreground', bgColor: 'bg-primary/10', example: 'Мы проактивно консультируем по новым технологиям и трендам рынка.' },
      { icon: Zap, title: 'Гибкость', description: 'Быстрая реакция на изменения и гибкая адаптация к новым требованиям. Мы работаем эффективно и итеративно для оптимальных результатов.', color: 'text-foreground', bgColor: 'bg-primary/10', example: '2-недельные спринты с регулярной обратной связью вместо долгих циклов разработки.' },
    ],
    principlesTitle: 'Наши рабочие принципы',
    principlesSubtitle: 'Эти принципы определяют, как мы работаем и принимаем решения.',
    principles: [
      { title: 'Клиентоориентированность', description: 'Клиент в центре всего, что мы делаем. Мы слушаем, понимаем потребности и разрабатываем индивидуальные решения.', details: ['Активное слушание в каждом разговоре', 'Регулярный сбор обратной связи', 'Решения в соответствии с бизнес-целями'] },
      { title: 'Непрерывное совершенствование', description: 'Мы учимся на каждом проекте и постоянно оптимизируем процессы. Стоять на месте — значит отставать.', details: ['Ретроспективы после каждого проекта', 'Время на обучение для команды', 'Регулярный пересмотр процессов'] },
      { title: 'Устойчивость', description: 'Долгосрочные решения вместо быстрых исправлений. Мы создаём цифровые продукты, которые могут расти и развиваться вместе с вашим бизнесом.', details: ['Масштабируемые архитектуры', 'Документация для долговечности', 'Поддерживаемые и расширяемые системы'] },
      { title: 'Командная работа', description: 'Успех приходит через сотрудничество. Мы поддерживаем культуру обмена, взаимного уважения и совместного достижения целей.', details: ['Кросс-функциональные команды', 'Открытая коммуникация', 'Общая ответственность'] },
    ],
    benefitsTitle: 'Что это значит для вас',
    benefitsSubtitle: 'Наши ценности важны не только внутри компании — они напрямую влияют на то, как мы работаем с вами.',
    benefits: [
      { title: 'Чёткие ожидания', description: 'Благодаря целеустремлённости и прозрачности вы всегда знаете, на каком этапе ваш проект и что будет дальше.' },
      { title: 'Настоящее партнёрство', description: 'Мы не поставщик услуг, выполняющий заказы. Мы партнёр, который делает ваши цели своими.' },
      { title: 'Качество, на которое можно положиться', description: 'Наши стандарты и процессы обеспечивают стабильно высокое качество в каждом проекте.' },
      { title: 'Решения, готовые к будущему', description: 'Благодаря дальновидному мышлению и техническому совершенству вы получаете решения, которые не устареют через год.' },
    ],
    missionTitle: 'Наша миссия',
    missionText1: 'Мы помогаем компаниям трансформировать их цифровое присутствие. Через стратегический дизайн и инновационные технологии мы создаём опыт, который вдохновляет и конвертирует.',
    missionText2: 'Наша цель — сделать каждый проект успешным — измеримо и устойчиво. Мы верим в силу выдающегося дизайна, который не только красиво выглядит, но и приносит результаты.',
    visionTitle: 'Наше видение',
    visionText1: 'Мир, где каждый бизнес — независимо от размера — имеет доступ к первоклассному дизайну и цифровой стратегии.',
    visionText2: 'Мы хотим быть первым выбором для компаний, которые хотят большего, чем стандарт, и готовы формировать свою отрасль. Через инновации, креативность и техническое совершенство мы устанавливаем новые стандарты.',
    cultureTitle: 'Наша корпоративная культура',
    cultureText1: 'В GoldenWing мы создаём среду, где креативность процветает, инновации поощряются и каждый может проявить себя наилучшим образом. Мы верим в плоские иерархии, открытую коммуникацию и силу разнообразных команд.',
    cultureText2: 'Баланс работы и жизни, личное развитие и поддерживающая среда для нас не модные слова, а живая реальность. Мы инвестируем в наших сотрудников, потому что знаем: довольные команды создают выдающуюся работу.',
    faqTitle: 'Часто задаваемые вопросы о наших ценностях',
    faqs: [
      {
        question: 'Как вы убеждаетесь, что ваши ценности не только на бумаге?',
        answer: 'Мы живём нашими ценностями через конкретные практики: ретроспективы после каждого проекта, регулярные беседы с обратной связью, документированные процессы и измеримые цели. Новые сотрудники знакомятся с этой культурой с первого дня, и мы регулярно рефлексируем, соответствуют ли наши действия нашим ценностям.'
      },
      {
        question: 'Что происходит, когда проект не соответствует вашим ценностям?',
        answer: 'Мы избирательны в выборе проектов. Если мы замечаем, что проект или сотрудничество не соответствует нашим ценностям — например, из-за нереалистичных ожиданий или плохой химии — мы открыто это обсуждаем. Иногда лучше честно отказаться, чем рисковать разочарованными ожиданиями.'
      },
      {
        question: 'Как партнёрство проявляется в повседневной работе?',
        answer: 'Мы видим себя продолжением вашей команды, а не внешним поставщиком услуг. Это значит: мы думаем вместе с вами, даём честную обратную связь (даже когда это неудобно), делимся знаниями и вместе празднуем успехи. Многие наши клиентские отношения длятся годами — это показывает, что такой подход работает.'
      },
      {
        question: 'Как вы измеряете «совершенство»?',
        answer: 'Для нас совершенство не субъективно. Мы измеряем его по: удовлетворённости клиентов (98% положительных оценок), пунктуальности проектов (95%), соблюдению бюджета (92%) и долгосрочным отношениям с клиентами (85% возвращаются). Кроме того, каждый результат проходит наш внутренний контроль качества.'
      },
    ],
    ctaTitle: 'Разделяете наши ценности?',
    ctaDescription: 'Если вы ищете партнёра, который понимает ваше видение и разделяет ваши ценности, давайте поговорим. Вместе мы создадим что-то особенное.',
    ctaButton: 'Связаться с нами',
  } : {
    heroTitle: 'Our Values',
    heroDescription: 'The principles and values that guide us. They shape our culture, influence our decisions and define how we work with our clients and partners.',
    introTitle: 'Values as a Compass',
    introText: 'Values are not office wall decoration for us. They are the compass for our daily decisions – from project selection to how we communicate. When you work with us, you work with a team that lives these values, not just writes them down.',
    coreValuesTitle: 'Our Core Values',
    coreValuesSubtitle: 'These eight values form the foundation of our work and company culture.',
    coreValues: [
      { icon: Target, title: 'Goal-Oriented', description: 'We focus on measurable results that drive your business forward. Every project begins with clear goals and ends with demonstrable success.', color: 'text-blue-500', bgColor: 'bg-blue-500/10', example: 'We define KPIs before project start and measure success regularly.' },
      { icon: Sparkles, title: 'Creative', description: 'Innovation and fresh ideas are the engine for outstanding projects. We think outside the box and create unique solutions.', color: 'text-foreground', bgColor: 'bg-primary/10', example: 'Creative workshops with the client instead of designs in isolation.' },
      { icon: Heart, title: 'Passionate', description: 'We love what we do – and it shows in every detail. Our enthusiasm for design and technology drives us to peak performance.', color: 'text-red-500', bgColor: 'bg-red-500/10', example: 'We celebrate launches with our clients and share every success.' },
      { icon: Users, title: 'Partnership', description: 'True collaboration at eye level for long-term success. We see ourselves as part of your team and work together on your goals.', color: 'text-green-500', bgColor: 'bg-green-500/10', example: '85% of our clients work with us long-term – some for over 5 years.' },
      { icon: Award, title: 'Excellent', description: 'Highest quality standards in everything we do. From strategy to implementation, we strive for perfection and exceed expectations.', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', example: 'Every deliverable goes through our internal quality check.' },
      { icon: Shield, title: 'Reliable', description: 'Transparency, honesty and reliability form the foundation of our work. We deliver what we promise – on time and on budget.', color: 'text-foreground', bgColor: 'bg-primary/10', example: '95% of projects delivered on time, 92% on budget.' },
      { icon: Lightbulb, title: 'Visionary', description: 'We think ahead and anticipate future trends. Our solutions are future-proof and scalable for sustainable success.', color: 'text-foreground', bgColor: 'bg-primary/10', example: 'We proactively advise on new technologies and market trends.' },
      { icon: Zap, title: 'Agile', description: 'Quick response to changes and flexible adaptation to new requirements. We work efficiently and iteratively for optimal results.', color: 'text-foreground', bgColor: 'bg-primary/10', example: '2-week sprints with regular feedback instead of long development cycles.' },
    ],
    principlesTitle: 'Our Work Principles',
    principlesSubtitle: 'These principles determine how we work and make decisions.',
    principles: [
      { title: 'Customer Focus', description: 'The customer is at the center of everything we do. We listen, understand needs and develop tailored solutions.', details: ['Active listening in every conversation', 'Regular feedback collection', 'Solutions aligned with business goals'] },
      { title: 'Continuous Improvement', description: 'We learn from every project and continuously optimize our processes. Standing still means falling behind – we constantly evolve.', details: ['Retrospectives after every project', 'Learning time for the team', 'Regular process reviews'] },
      { title: 'Sustainability', description: 'Long-term solutions instead of quick fixes. We create digital products that can grow and evolve with your business.', details: ['Scalable architectures', 'Documentation for longevity', 'Maintainable and extensible systems'] },
      { title: 'Teamwork', description: 'Success comes through collaboration. We foster a culture of exchange, mutual respect and shared goal achievement.', details: ['Cross-functional teams', 'Open communication', 'Shared responsibility'] },
    ],
    benefitsTitle: 'What This Means for You',
    benefitsSubtitle: 'Our values are not just internally relevant – they directly shape how we work with you.',
    benefits: [
      { title: 'Clear Expectations', description: 'Through goal-orientation and transparency, you always know where your project stands and what comes next.' },
      { title: 'True Partnership', description: 'We are not a service provider processing orders. We are a partner who makes your goals their own.' },
      { title: 'Quality You Can Rely On', description: 'Our standards and processes ensure consistently high quality in every project.' },
      { title: 'Future-Proof Solutions', description: 'Through visionary thinking and technical excellence, you get solutions that won\'t be outdated in a year.' },
    ],
    missionTitle: 'Our Mission',
    missionText1: 'We help companies transform their digital presence. Through strategic design and innovative technology, we create experiences that inspire and convert.',
    missionText2: 'Our goal is to make every project a success – measurable and sustainable. We believe in the power of outstanding design that not only looks beautiful but also delivers results.',
    visionTitle: 'Our Vision',
    visionText1: 'A world where every business – regardless of size – has access to first-class design and digital strategy.',
    visionText2: 'We want to be the first choice for companies that want more than standard and are ready to shape their industry. Through innovation, creativity and technical excellence, we set new standards.',
    cultureTitle: 'Our Company Culture',
    cultureText1: 'At GoldenWing, we create an environment where creativity thrives, innovation is encouraged and everyone can give their best. We believe in flat hierarchies, open communication and the power of diverse teams.',
    cultureText2: 'Work-life balance, personal development and a supportive environment are not buzzwords for us, but lived reality. We invest in our employees because we know: satisfied teams create outstanding work.',
    faqTitle: 'Frequently Asked Questions About Our Values',
    faqs: [
      {
        question: 'How do you ensure your values don\'t just exist on paper?',
        answer: 'We live our values through concrete practices: retrospectives after every project, regular feedback conversations, documented processes and measurable goals. New employees are introduced to this culture from day one, and we regularly reflect on whether our actions align with our values.'
      },
      {
        question: 'What happens when a project doesn\'t fit your values?',
        answer: 'We are selective in project selection. If we notice that a project or collaboration doesn\'t fit our values – for example due to unrealistic expectations or poor chemistry – we address it openly. Sometimes it\'s better to honestly decline than risk disappointed expectations.'
      },
      {
        question: 'How does partnership show in daily work?',
        answer: 'We see ourselves as an extension of your team, not an external service provider. That means: We think along, give honest feedback (even when uncomfortable), share knowledge and celebrate successes together. Many of our client relationships span years – showing this approach works.'
      },
      {
        question: 'How do you measure "excellence"?',
        answer: 'Excellence is not subjective for us. We measure it by: Client satisfaction (98% positive ratings), project punctuality (95%), budget compliance (92%) and long-term client relationships (85% return rate). Additionally, every deliverable goes through our internal quality check.'
      },
    ],
    ctaTitle: 'Do You Share Our Values?',
    ctaDescription: 'If you are looking for a partner who understands your vision and shares your values, then let\'s talk. Together we create something special.',
    ctaButton: 'Get in Touch',
  }

  const aboutLabels: Record<string, string> = { de: 'Über uns', en: 'About Us', ru: 'О нас' }
  const valuesLabels: Record<string, string> = { de: 'Werte', en: 'Values', ru: 'Ценности' }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': getSchemaUrl('/', locale) },
      { '@type': 'ListItem', 'position': 2, 'name': aboutLabels[locale] || aboutLabels.en, 'item': getSchemaUrl('/ueber-uns', locale) },
      { '@type': 'ListItem', 'position': 3, 'name': valuesLabels[locale] || valuesLabels.en, 'item': getSchemaUrl('/ueber-uns/werte', locale) }
    ]
  }

  const schemaNames: Record<string, string> = {
    de: 'Unsere Werte - GoldenWing Creative Studios',
    en: 'Our Values - GoldenWing Creative Studios',
    ru: 'Наши ценности - GoldenWing Creative Studios',
  }
  const schemaDescriptions: Record<string, string> = {
    de: 'Die Werte und Prinzipien, die GoldenWing Creative Studios leiten: Zielorientierung, Kreativität, Leidenschaft, Partnerschaft, Exzellenz, Verlässlichkeit, Vision und Agilität.',
    en: 'The values and principles that guide GoldenWing Creative Studios: Goal-orientation, creativity, passion, partnership, excellence, reliability, vision and agility.',
    ru: 'Ценности и принципы, которыми руководствуется GoldenWing Creative Studios: целеустремлённость, креативность, страсть, партнёрство, совершенство, надёжность, видение и гибкость.',
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': schemaNames[locale] || schemaNames.en,
    'description': schemaDescriptions[locale] || schemaDescriptions.en,
    'url': getSchemaUrl('/ueber-uns/werte', locale),
    'publisher': {
      '@type': 'Organization',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
      'logo': 'https://goldenwing.at/logo.png',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Czeikestrasse 4/21',
        'addressLocality': 'Wien',
        'postalCode': '1100',
        'addressCountry': 'AT',
      },
    },
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'GoldenWing Creative Studios',
      'url': 'https://goldenwing.at',
    },
  }

  return (
    <>
      <JsonLd data={breadcrumbData} />
      <JsonLd data={webPageSchema} />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground">
              {content.heroDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="py-16 bg-muted/30">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.introTitle}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{content.introText}</p>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.coreValuesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.coreValuesSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.coreValues.map((value) => (
              <div key={value.title} className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all duration-300">
                <div className={`flex h-14 w-14 items-center justify-center rounded-lg ${value.bgColor} ${value.color} mb-4`}>
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{value.description}</p>
                <p className="text-xs text-primary italic">{value.example}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Client Benefits */}
      <section className="py-16 md:py-24 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.benefitsTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.benefitsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.benefits.map((benefit, index) => (
              <div key={index} className="bg-card rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <Container variant="block">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card rounded-xl border p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">{content.missionTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{content.missionText1}</p>
              <p className="text-muted-foreground leading-relaxed">{content.missionText2}</p>
            </div>
            <div className="bg-card rounded-xl border p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6">
                <Eye className="h-7 w-7" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">{content.visionTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{content.visionText1}</p>
              <p className="text-muted-foreground leading-relaxed">{content.visionText2}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.principlesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.principlesSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {content.principles.map((principle, index) => (
              <div key={principle.title} className="bg-card rounded-xl border p-6 relative overflow-hidden">
                <span className="text-7xl font-bold text-primary/5 absolute -top-4 -right-4">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{principle.description}</p>
                  <ul className="space-y-2">
                    {principle.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Culture */}
      <section className="py-20">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.cultureTitle}</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{content.cultureText1}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{content.cultureText2}</p>
          </div>
        </Container>
      </section>

      {/* FAQ Section - Accordion Style */}
      <FAQSection
        title={content.faqTitle}
        subtitle={{ de: 'Antworten auf die häufigsten Fragen.', en: 'Answers to the most common questions.', ru: 'Ответы на самые частые вопросы.' }[locale] || 'Answers to the most common questions.'}
        items={content.faqs}
        className="bg-muted/30"
      />

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.ctaTitle}</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">{content.ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <NextLink href={getContactUrl(locale)}>
                {content.ctaButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
              <NextLink href={getAboutUrl(locale)}>
                {{ de: 'Mehr über uns', en: 'More About Us', ru: 'Подробнее о нас' }[locale] || 'More About Us'}
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
