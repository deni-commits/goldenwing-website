import { Metadata } from 'next'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle, Stethoscope, Scale, ShoppingBag, Factory, Rocket, UtensilsCrossed, Home, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FAQSection } from '@/components/sections/faq-section'
import { Container } from '@/components/ui/container'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'

export const revalidate = 86400

const industries: Record<string, {
  icon: typeof Stethoscope
  de: IndustryContent
  en: IndustryContent
  ru: IndustryContent
}> = {
  aerzte: {
    icon: Stethoscope,
    de: {
      title: 'Digitales Marketing für Ärzte & Arztpraxen',
      subtitle: 'Mehr Patienten durch professionelle Online-Präsenz',
      description: 'Spezialisierte Webdesign- und SEO-Lösungen für Arztpraxen, Kliniken und Gesundheitseinrichtungen in Wien und Österreich.',
      challenges: [
        'Neue Patienten im lokalen Einzugsgebiet gewinnen',
        'Google-Bewertungen aktiv managen',
        'Vertrauen durch professionelle Website aufbauen',
        'DSGVO-konforme Kontaktformulare und Online-Terminbuchung',
        'Bei Google Maps in der Nähe gefunden werden',
      ],
      solutions: [
        { title: 'Praxis-Website', description: 'Moderne, DSGVO-konforme Website mit Online-Terminbuchung und Patienteninformationen' },
        { title: 'Local SEO', description: 'Optimierung für lokale Suchanfragen wie "Zahnarzt Wien" oder "Hausarzt 1100"' },
        { title: 'Google Business Profil', description: 'Vollständig optimiertes Profil mit Fotos, Öffnungszeiten und Bewertungsmanagement' },
        { title: 'Bewertungsmanagement', description: 'Systematische Generierung positiver Bewertungen und professioneller Umgang mit Kritik' },
      ],
      stats: [
        { value: '85%', label: 'der Patienten suchen online nach Ärzten' },
        { value: '+200%', label: 'mehr Patientenanfragen durch Local SEO' },
        { value: '4.8★', label: 'durchschnittliche Bewertung nach 6 Monaten' },
      ],
      faqs: [
        { question: 'Was kostet eine Praxis-Website?', answer: 'Eine professionelle Praxis-Website mit Terminbuchung beginnt bei €2.500. Der genaue Preis hängt von Umfang und Funktionen ab.' },
        { question: 'Wie lange dauert die Umsetzung?', answer: 'Eine vollständige Praxis-Website ist in 4-6 Wochen einsatzbereit. Local SEO zeigt erste Ergebnisse nach 2-3 Monaten.' },
        { question: 'Ist die Website DSGVO-konform?', answer: 'Ja, alle unsere Praxis-Websites erfüllen die DSGVO-Anforderungen inkl. Datenschutzerklärung, Cookie-Banner und sicherer Datenübertragung.' },
        { question: 'Können Patienten online Termine buchen?', answer: 'Ja, wir integrieren gängige Terminbuchungssysteme wie Doctolib, Ordination Online oder entwickeln individuelle Lösungen.' },
      ],
      cta: 'Kostenlose Erstberatung für Ihre Praxis',
    },
    en: {
      title: 'Digital Marketing for Doctors & Medical Practices',
      subtitle: 'More patients through professional online presence',
      description: 'Specialized web design and SEO solutions for medical practices, clinics and healthcare facilities in Vienna and Austria.',
      challenges: [
        'Attracting new patients in the local catchment area',
        'Actively managing Google reviews',
        'Building trust through professional website',
        'GDPR-compliant contact forms and online appointment booking',
        'Being found on Google Maps nearby',
      ],
      solutions: [
        { title: 'Practice Website', description: 'Modern, GDPR-compliant website with online appointment booking and patient information' },
        { title: 'Local SEO', description: 'Optimization for local searches like "Dentist Vienna" or "GP 1100"' },
        { title: 'Google Business Profile', description: 'Fully optimized profile with photos, opening hours and review management' },
        { title: 'Review Management', description: 'Systematic generation of positive reviews and professional handling of criticism' },
      ],
      stats: [
        { value: '85%', label: 'of patients search for doctors online' },
        { value: '+200%', label: 'more patient inquiries through Local SEO' },
        { value: '4.8★', label: 'average rating after 6 months' },
      ],
      faqs: [
        { question: 'What does a practice website cost?', answer: 'A professional practice website with appointment booking starts at €2,500. The exact price depends on scope and features.' },
        { question: 'How long does implementation take?', answer: 'A complete practice website is ready in 4-6 weeks. Local SEO shows first results after 2-3 months.' },
        { question: 'Is the website GDPR compliant?', answer: 'Yes, all our practice websites meet GDPR requirements incl. privacy policy, cookie banner and secure data transmission.' },
        { question: 'Can patients book appointments online?', answer: 'Yes, we integrate common booking systems like Doctolib or develop custom solutions.' },
      ],
      cta: 'Free initial consultation for your practice',
    },
    ru: {
      title: 'Цифровой маркетинг для врачей и клиник',
      subtitle: 'Больше пациентов благодаря профессиональному онлайн-присутствию',
      description: 'Специализированные решения веб-дизайна и SEO для медицинских практик, клиник и учреждений здравоохранения в Вене и Австрии.',
      challenges: [
        'Привлечение новых пациентов в местном районе',
        'Активное управление отзывами Google',
        'Построение доверия через профессиональный сайт',
        'GDPR-совместимые формы и онлайн-запись',
        'Быть найденными на Google Maps поблизости',
      ],
      solutions: [
        { title: 'Сайт клиники', description: 'Современный, GDPR-совместимый сайт с онлайн-записью и информацией для пациентов' },
        { title: 'Локальное SEO', description: 'Оптимизация для локальных запросов типа "Стоматолог Вена"' },
        { title: 'Профиль Google Business', description: 'Полностью оптимизированный профиль с фото, часами работы и управлением отзывами' },
        { title: 'Управление отзывами', description: 'Систематическая генерация положительных отзывов и профессиональная работа с критикой' },
      ],
      stats: [
        { value: '85%', label: 'пациентов ищут врачей онлайн' },
        { value: '+200%', label: 'больше обращений через Local SEO' },
        { value: '4.8★', label: 'средний рейтинг через 6 месяцев' },
      ],
      faqs: [
        { question: 'Сколько стоит сайт клиники?', answer: 'Профессиональный сайт клиники с онлайн-записью начинается от €2 500. Точная цена зависит от объема и функций.' },
        { question: 'Сколько времени занимает реализация?', answer: 'Полноценный сайт клиники готов за 4-6 недель. Local SEO показывает первые результаты через 2-3 месяца.' },
        { question: 'Соответствует ли сайт GDPR?', answer: 'Да, все наши сайты клиник соответствуют требованиям GDPR включая политику конфиденциальности и безопасную передачу данных.' },
        { question: 'Могут ли пациенты записываться онлайн?', answer: 'Да, мы интегрируем системы бронирования типа Doctolib или разрабатываем индивидуальные решения.' },
      ],
      cta: 'Бесплатная консультация для вашей клиники',
    },
  },
  ecommerce: {
    icon: ShoppingBag,
    de: {
      title: 'E-Commerce & Online-Shop Lösungen',
      subtitle: 'Mehr Umsatz durch optimierte Shop-Erfahrung',
      description: 'Von Shop-Entwicklung über Conversion-Optimierung bis Performance-Marketing — alles für Ihren E-Commerce-Erfolg.',
      challenges: [
        'Hohe Warenkorbabbrüche reduzieren',
        'Sichtbarkeit bei Google Shopping verbessern',
        'Mobile Conversion Rate optimieren',
        'Retargeting und Kundenbindung aufbauen',
        'Wettbewerbsfähige Preise bei hoher Marge halten',
      ],
      solutions: [
        { title: 'Shop-Entwicklung', description: 'Shopify, WooCommerce oder individuelle Lösungen — perfekt auf Ihre Produkte abgestimmt' },
        { title: 'Google Shopping', description: 'Produktfeed-Optimierung und Shopping-Kampagnen für maximale Sichtbarkeit' },
        { title: 'Conversion-Optimierung', description: 'A/B-Testing, Checkout-Optimierung und Warenkorbabbruch-Recovery' },
        { title: 'Performance Marketing', description: 'Google Ads, Meta Ads und Remarketing für profitables Wachstum' },
      ],
      stats: [
        { value: '+45%', label: 'durchschnittliche Umsatzsteigerung' },
        { value: '-30%', label: 'weniger Warenkorbabbrüche' },
        { value: '3.2x', label: 'ROAS bei Google Shopping' },
      ],
      faqs: [
        { question: 'Welches Shopsystem empfehlt ihr?', answer: 'Das hängt von Ihren Anforderungen ab. Shopify für schnellen Start, WooCommerce für maximale Flexibilität, oder Shopware für B2B.' },
        { question: 'Was kostet ein Online-Shop?', answer: 'Einfache Shops starten bei €5.000, komplexe Enterprise-Lösungen ab €25.000. Wir erstellen ein individuelles Angebot.' },
        { question: 'Wie verbessert ihr die Conversion Rate?', answer: 'Durch Analyse des Nutzerverhaltens, A/B-Testing, Checkout-Optimierung und personalisierte Produktempfehlungen.' },
        { question: 'Bietet ihr auch laufende Betreuung?', answer: 'Ja, von technischem Support über Marketing-Kampagnen bis zur vollständigen Shop-Betreuung.' },
      ],
      cta: 'Shop-Potenzialanalyse anfordern',
    },
    en: {
      title: 'E-Commerce & Online Shop Solutions',
      subtitle: 'More revenue through optimized shop experience',
      description: 'From shop development to conversion optimization to performance marketing — everything for your e-commerce success.',
      challenges: [
        'Reducing high cart abandonment',
        'Improving visibility on Google Shopping',
        'Optimizing mobile conversion rate',
        'Building retargeting and customer loyalty',
        'Maintaining competitive prices with high margins',
      ],
      solutions: [
        { title: 'Shop Development', description: 'Shopify, WooCommerce or custom solutions — perfectly tailored to your products' },
        { title: 'Google Shopping', description: 'Product feed optimization and shopping campaigns for maximum visibility' },
        { title: 'Conversion Optimization', description: 'A/B testing, checkout optimization and cart abandonment recovery' },
        { title: 'Performance Marketing', description: 'Google Ads, Meta Ads and remarketing for profitable growth' },
      ],
      stats: [
        { value: '+45%', label: 'average revenue increase' },
        { value: '-30%', label: 'less cart abandonment' },
        { value: '3.2x', label: 'ROAS on Google Shopping' },
      ],
      faqs: [
        { question: 'Which shop system do you recommend?', answer: 'It depends on your requirements. Shopify for quick start, WooCommerce for maximum flexibility, or Shopware for B2B.' },
        { question: 'What does an online shop cost?', answer: 'Simple shops start at €5,000, complex enterprise solutions from €25,000. We create an individual offer.' },
        { question: 'How do you improve conversion rate?', answer: 'Through user behavior analysis, A/B testing, checkout optimization and personalized product recommendations.' },
        { question: 'Do you also offer ongoing support?', answer: 'Yes, from technical support to marketing campaigns to complete shop management.' },
      ],
      cta: 'Request shop potential analysis',
    },
    ru: {
      title: 'E-Commerce и интернет-магазины',
      subtitle: 'Больше продаж через оптимизированный опыт покупок',
      description: 'От разработки магазина до оптимизации конверсий и performance-маркетинга — все для вашего успеха в e-commerce.',
      challenges: [
        'Снижение высокого процента брошенных корзин',
        'Улучшение видимости в Google Shopping',
        'Оптимизация мобильной конверсии',
        'Построение ретаргетинга и лояльности клиентов',
        'Поддержание конкурентных цен при высокой марже',
      ],
      solutions: [
        { title: 'Разработка магазина', description: 'Shopify, WooCommerce или индивидуальные решения — идеально под ваши продукты' },
        { title: 'Google Shopping', description: 'Оптимизация продуктового фида и шоппинг-кампании для максимальной видимости' },
        { title: 'Оптимизация конверсий', description: 'A/B-тестирование, оптимизация чекаута и возврат брошенных корзин' },
        { title: 'Performance маркетинг', description: 'Google Ads, Meta Ads и ремаркетинг для прибыльного роста' },
      ],
      stats: [
        { value: '+45%', label: 'средний рост выручки' },
        { value: '-30%', label: 'меньше брошенных корзин' },
        { value: '3.2x', label: 'ROAS в Google Shopping' },
      ],
      faqs: [
        { question: 'Какую платформу вы рекомендуете?', answer: 'Зависит от ваших требований. Shopify для быстрого старта, WooCommerce для максимальной гибкости, Shopware для B2B.' },
        { question: 'Сколько стоит интернет-магазин?', answer: 'Простые магазины от €5 000, сложные enterprise-решения от €25 000. Мы создаем индивидуальное предложение.' },
        { question: 'Как вы улучшаете конверсию?', answer: 'Через анализ поведения пользователей, A/B-тестирование, оптимизацию чекаута и персонализированные рекомендации.' },
        { question: 'Предлагаете ли вы постоянную поддержку?', answer: 'Да, от технической поддержки до маркетинговых кампаний и полного управления магазином.' },
      ],
      cta: 'Запросить анализ потенциала магазина',
    },
  },
  b2b: {
    icon: Factory,
    de: {
      title: 'B2B Marketing & Lead-Generierung',
      subtitle: 'Qualifizierte Leads für Ihr B2B-Geschäft',
      description: 'Strategisches digitales Marketing für B2B-Unternehmen, Industriebetriebe und Dienstleister im DACH-Raum.',
      challenges: [
        'Qualifizierte Leads statt Massenanfragen generieren',
        'Lange Entscheidungszyklen verkürzen',
        'Komplexe Produkte verständlich präsentieren',
        'Entscheider auf LinkedIn erreichen',
        'Messbare Marketing-ROI nachweisen',
      ],
      solutions: [
        { title: 'Lead-Generierung', description: 'Landing Pages, Whitepapers und Webinare zur systematischen Lead-Erfassung' },
        { title: 'LinkedIn Marketing', description: 'Organisches Wachstum und LinkedIn Ads für präzises B2B-Targeting' },
        { title: 'Account-Based Marketing', description: 'Personalisierte Kampagnen für Ihre wichtigsten Zielkunden' },
        { title: 'Content Marketing', description: 'Fachartikel, Case Studies und Thought Leadership Content' },
      ],
      stats: [
        { value: '+180%', label: 'mehr qualifizierte Leads' },
        { value: '€45', label: 'durchschnittliche Kosten pro Lead' },
        { value: '23%', label: 'Lead-to-Opportunity Rate' },
      ],
      faqs: [
        { question: 'Wie generiert ihr B2B-Leads?', answer: 'Durch eine Kombination aus SEO, LinkedIn Marketing, Content Marketing und gezielten Paid-Kampagnen mit Lead-Magneten.' },
        { question: 'Was kostet B2B-Marketing?', answer: 'Je nach Umfang €2.000-10.000/Monat. Wir empfehlen ein Pilotprojekt zur Validierung der Strategie.' },
        { question: 'Wie lange bis zu ersten Leads?', answer: 'Mit Paid-Kampagnen ab Woche 2, organisch nach 3-6 Monaten. Wir optimieren kontinuierlich für bessere Ergebnisse.' },
        { question: 'Funktioniert das für komplexe Produkte?', answer: 'Besonders gut. Wir erstellen erklärende Inhalte, die komplexe Lösungen verständlich machen und Vertrauen aufbauen.' },
      ],
      cta: 'B2B-Marketing-Strategie besprechen',
    },
    en: {
      title: 'B2B Marketing & Lead Generation',
      subtitle: 'Qualified leads for your B2B business',
      description: 'Strategic digital marketing for B2B companies, industrial enterprises and service providers in the DACH region.',
      challenges: [
        'Generating qualified leads instead of mass inquiries',
        'Shortening long decision cycles',
        'Presenting complex products clearly',
        'Reaching decision-makers on LinkedIn',
        'Demonstrating measurable marketing ROI',
      ],
      solutions: [
        { title: 'Lead Generation', description: 'Landing pages, whitepapers and webinars for systematic lead capture' },
        { title: 'LinkedIn Marketing', description: 'Organic growth and LinkedIn Ads for precise B2B targeting' },
        { title: 'Account-Based Marketing', description: 'Personalized campaigns for your most important target accounts' },
        { title: 'Content Marketing', description: 'Expert articles, case studies and thought leadership content' },
      ],
      stats: [
        { value: '+180%', label: 'more qualified leads' },
        { value: '€45', label: 'average cost per lead' },
        { value: '23%', label: 'lead-to-opportunity rate' },
      ],
      faqs: [
        { question: 'How do you generate B2B leads?', answer: 'Through a combination of SEO, LinkedIn marketing, content marketing and targeted paid campaigns with lead magnets.' },
        { question: 'What does B2B marketing cost?', answer: 'Depending on scope €2,000-10,000/month. We recommend a pilot project to validate the strategy.' },
        { question: 'How long until first leads?', answer: 'With paid campaigns from week 2, organically after 3-6 months. We continuously optimize for better results.' },
        { question: 'Does this work for complex products?', answer: 'Especially well. We create explanatory content that makes complex solutions understandable and builds trust.' },
      ],
      cta: 'Discuss B2B marketing strategy',
    },
    ru: {
      title: 'B2B маркетинг и генерация лидов',
      subtitle: 'Качественные лиды для вашего B2B-бизнеса',
      description: 'Стратегический цифровой маркетинг для B2B-компаний, промышленных предприятий и поставщиков услуг в регионе DACH.',
      challenges: [
        'Генерация качественных лидов вместо массовых запросов',
        'Сокращение длинных циклов принятия решений',
        'Понятная презентация сложных продуктов',
        'Достижение ЛПР через LinkedIn',
        'Демонстрация измеримого ROI маркетинга',
      ],
      solutions: [
        { title: 'Генерация лидов', description: 'Лендинги, whitepapers и вебинары для систематического сбора лидов' },
        { title: 'LinkedIn маркетинг', description: 'Органический рост и LinkedIn Ads для точного B2B-таргетинга' },
        { title: 'Account-Based Marketing', description: 'Персонализированные кампании для ваших ключевых целевых клиентов' },
        { title: 'Контент-маркетинг', description: 'Экспертные статьи, кейсы и thought leadership контент' },
      ],
      stats: [
        { value: '+180%', label: 'больше качественных лидов' },
        { value: '€45', label: 'средняя стоимость лида' },
        { value: '23%', label: 'конверсия лид-возможность' },
      ],
      faqs: [
        { question: 'Как вы генерируете B2B-лиды?', answer: 'Через комбинацию SEO, LinkedIn маркетинга, контент-маркетинга и таргетированных платных кампаний с лид-магнитами.' },
        { question: 'Сколько стоит B2B-маркетинг?', answer: 'В зависимости от объема €2 000-10 000/месяц. Мы рекомендуем пилотный проект для валидации стратегии.' },
        { question: 'Сколько времени до первых лидов?', answer: 'С платными кампаниями со 2-й недели, органически через 3-6 месяцев. Мы постоянно оптимизируем.' },
        { question: 'Работает ли это для сложных продуктов?', answer: 'Особенно хорошо. Мы создаем объясняющий контент, который делает сложные решения понятными.' },
      ],
      cta: 'Обсудить B2B-маркетинг стратегию',
    },
  },
  startups: {
    icon: Rocket,
    de: {
      title: 'Startup Marketing & Growth',
      subtitle: 'Schneller wachsen mit datengetriebenem Marketing',
      description: 'Von MVP-Launch bis Series A — wir helfen Startups, schnell zu skalieren und effizient Nutzer zu gewinnen.',
      challenges: [
        'Mit begrenztem Budget maximale Wirkung erzielen',
        'Product-Market-Fit validieren',
        'Schnell iterieren und testen',
        'Investoren mit Metriken überzeugen',
        'Von 0 auf 1.000 Nutzer skalieren',
      ],
      solutions: [
        { title: 'MVP Design & Launch', description: 'Schnelle Entwicklung eines marktfähigen Produkts in Wochen statt Monaten' },
        { title: 'Growth Marketing', description: 'Datengetriebene Experimente für schnelles, nachhaltiges Wachstum' },
        { title: 'Pitch Deck Design', description: 'Überzeugende Präsentationen für Investoren und Partner' },
        { title: 'Brand Building', description: 'Starke Markenidentität von Anfang an' },
      ],
      stats: [
        { value: '4 Wochen', label: 'durchschnittliche Time-to-Market' },
        { value: '+500%', label: 'User-Wachstum in 6 Monaten' },
        { value: '€2M+', label: 'eingeworbenes Kapital unserer Kunden' },
      ],
      faqs: [
        { question: 'Arbeitet ihr mit Pre-Seed Startups?', answer: 'Ja, wir haben spezielle Pakete für frühe Phasen. Wir können auch gegen Equity oder Success-Fee arbeiten.' },
        { question: 'Was kostet Startup-Marketing?', answer: 'Unsere Startup-Pakete starten bei €1.500/Monat. Für frühe Phasen bieten wir reduzierte Raten.' },
        { question: 'Wie schnell könnt ihr starten?', answer: 'Innerhalb einer Woche. Wir verstehen, dass bei Startups Zeit kritisch ist.' },
        { question: 'Helft ihr auch bei Funding-Runden?', answer: 'Ja, von Pitch Deck Design über Data Room Vorbereitung bis zur Investorenansprache.' },
      ],
      cta: 'Growth-Strategie für Ihr Startup',
    },
    en: {
      title: 'Startup Marketing & Growth',
      subtitle: 'Grow faster with data-driven marketing',
      description: 'From MVP launch to Series A — we help startups scale quickly and efficiently acquire users.',
      challenges: [
        'Achieving maximum impact with limited budget',
        'Validating product-market fit',
        'Iterating and testing quickly',
        'Convincing investors with metrics',
        'Scaling from 0 to 1,000 users',
      ],
      solutions: [
        { title: 'MVP Design & Launch', description: 'Rapid development of market-ready product in weeks instead of months' },
        { title: 'Growth Marketing', description: 'Data-driven experiments for fast, sustainable growth' },
        { title: 'Pitch Deck Design', description: 'Compelling presentations for investors and partners' },
        { title: 'Brand Building', description: 'Strong brand identity from the start' },
      ],
      stats: [
        { value: '4 weeks', label: 'average time-to-market' },
        { value: '+500%', label: 'user growth in 6 months' },
        { value: '€2M+', label: 'capital raised by our clients' },
      ],
      faqs: [
        { question: 'Do you work with pre-seed startups?', answer: 'Yes, we have special packages for early stages. We can also work for equity or success fee.' },
        { question: 'What does startup marketing cost?', answer: 'Our startup packages start at €1,500/month. For early stages we offer reduced rates.' },
        { question: 'How quickly can you start?', answer: 'Within a week. We understand that time is critical for startups.' },
        { question: 'Do you also help with funding rounds?', answer: 'Yes, from pitch deck design to data room preparation to investor outreach.' },
      ],
      cta: 'Growth strategy for your startup',
    },
    ru: {
      title: 'Маркетинг и рост стартапов',
      subtitle: 'Быстрее расти с data-driven маркетингом',
      description: 'От запуска MVP до Series A — мы помогаем стартапам быстро масштабироваться и эффективно привлекать пользователей.',
      challenges: [
        'Достижение максимального эффекта при ограниченном бюджете',
        'Валидация product-market fit',
        'Быстрая итерация и тестирование',
        'Убеждение инвесторов метриками',
        'Масштабирование от 0 до 1 000 пользователей',
      ],
      solutions: [
        { title: 'MVP дизайн и запуск', description: 'Быстрая разработка готового к рынку продукта за недели вместо месяцев' },
        { title: 'Growth маркетинг', description: 'Data-driven эксперименты для быстрого, устойчивого роста' },
        { title: 'Дизайн питч-дека', description: 'Убедительные презентации для инвесторов и партнеров' },
        { title: 'Построение бренда', description: 'Сильная идентичность бренда с самого начала' },
      ],
      stats: [
        { value: '4 недели', label: 'среднее время выхода на рынок' },
        { value: '+500%', label: 'рост пользователей за 6 месяцев' },
        { value: '€2M+', label: 'привлеченный капитал нашими клиентами' },
      ],
      faqs: [
        { question: 'Работаете ли вы с pre-seed стартапами?', answer: 'Да, у нас есть специальные пакеты для ранних стадий. Мы также можем работать за equity или success fee.' },
        { question: 'Сколько стоит маркетинг для стартапов?', answer: 'Наши стартап-пакеты начинаются от €1 500/месяц. Для ранних стадий предлагаем сниженные ставки.' },
        { question: 'Как быстро вы можете начать?', answer: 'В течение недели. Мы понимаем, что для стартапов время критично.' },
        { question: 'Помогаете ли вы с раундами финансирования?', answer: 'Да, от дизайна питч-дека до подготовки data room и работы с инвесторами.' },
      ],
      cta: 'Growth-стратегия для вашего стартапа',
    },
  },
  rechtsanwaelte: {
    icon: Scale,
    de: {
      title: 'Marketing für Rechtsanwälte & Kanzleien',
      subtitle: 'Mehr Mandanten durch professionelle Online-Präsenz',
      description: 'Diskrete, seriöse Webauftritte und SEO-Strategien speziell für Anwaltskanzleien und Rechtsberatung.',
      challenges: [
        'Vertrauen und Seriosität online vermitteln',
        'Bei spezifischen Rechtsfragen gefunden werden',
        'Mandanten im richtigen Moment erreichen',
        'Berufsrechtliche Vorgaben einhalten',
        'Von der Konkurrenz abheben',
      ],
      solutions: [
        { title: 'Kanzlei-Website', description: 'Seriöse, vertrauenswürdige Online-Präsenz mit Anwaltsverzeichnis' },
        { title: 'SEO für Rechtsthemen', description: 'Spezialisiertes Content-SEO für Rechtsgebiete und lokale Suchen' },
        { title: 'Content Marketing', description: 'Fachartikel und Ratgeber für Thought Leadership' },
        { title: 'Reputation Management', description: 'Aufbau positiver Online-Reputation und Bewertungsmanagement' },
      ],
      stats: [
        { value: '+150%', label: 'mehr Mandantenanfragen' },
        { value: 'Top 5', label: 'Rankings für Rechtsthemen' },
        { value: '4.9★', label: 'durchschnittliche Kanzlei-Bewertung' },
      ],
      faqs: [
        { question: 'Was kostet eine Kanzlei-Website?', answer: 'Professionelle Kanzlei-Websites starten bei €3.500. Multi-Anwalt-Kanzleien mit Mandantenportal ab €8.000.' },
        { question: 'Beachtet ihr berufsrechtliche Vorgaben?', answer: 'Ja, alle unsere Lösungen entsprechen den berufsrechtlichen Anforderungen der Rechtsanwaltskammer.' },
        { question: 'Wie gewinnen wir mehr Mandanten?', answer: 'Durch lokales SEO, spezialisierte Landingpages für Rechtsgebiete und gezieltes Google Ads.' },
        { question: 'Betreut ihr auch große Kanzleien?', answer: 'Ja, von Einzelanwälten bis zu internationalen Wirtschaftskanzleien.' },
      ],
      cta: 'Beratung für Ihre Kanzlei',
    },
    en: {
      title: 'Marketing for Lawyers & Law Firms',
      subtitle: 'More clients through professional online presence',
      description: 'Discreet, professional web presence and SEO strategies specifically for law firms and legal advice.',
      challenges: [
        'Conveying trust and professionalism online',
        'Being found for specific legal questions',
        'Reaching clients at the right moment',
        'Complying with professional regulations',
        'Standing out from competition',
      ],
      solutions: [
        { title: 'Law Firm Website', description: 'Serious, trustworthy online presence with attorney directory' },
        { title: 'SEO for Legal Topics', description: 'Specialized content SEO for practice areas and local searches' },
        { title: 'Content Marketing', description: 'Expert articles and guides for thought leadership' },
        { title: 'Reputation Management', description: 'Building positive online reputation and review management' },
      ],
      stats: [
        { value: '+150%', label: 'more client inquiries' },
        { value: 'Top 5', label: 'rankings for legal topics' },
        { value: '4.9★', label: 'average firm rating' },
      ],
      faqs: [
        { question: 'What does a law firm website cost?', answer: 'Professional law firm websites start at €3,500. Multi-attorney firms with client portal from €8,000.' },
        { question: 'Do you consider professional regulations?', answer: 'Yes, all our solutions comply with the professional requirements of the bar association.' },
        { question: 'How do we get more clients?', answer: 'Through local SEO, specialized landing pages for practice areas and targeted Google Ads.' },
        { question: 'Do you also serve large firms?', answer: 'Yes, from solo practitioners to international business law firms.' },
      ],
      cta: 'Consultation for your firm',
    },
    ru: {
      title: 'Маркетинг для юристов и адвокатов',
      subtitle: 'Больше клиентов через профессиональное онлайн-присутствие',
      description: 'Дискретное, профессиональное веб-присутствие и SEO-стратегии специально для юридических фирм.',
      challenges: [
        'Передача доверия и профессионализма онлайн',
        'Быть найденными по конкретным правовым вопросам',
        'Достижение клиентов в нужный момент',
        'Соблюдение профессиональных требований',
        'Выделиться среди конкурентов',
      ],
      solutions: [
        { title: 'Сайт юрфирмы', description: 'Серьезное, надежное онлайн-присутствие со справочником юристов' },
        { title: 'SEO для правовых тем', description: 'Специализированное контент-SEO для практик и локальных запросов' },
        { title: 'Контент-маркетинг', description: 'Экспертные статьи и руководства для thought leadership' },
        { title: 'Управление репутацией', description: 'Построение положительной онлайн-репутации и управление отзывами' },
      ],
      stats: [
        { value: '+150%', label: 'больше обращений клиентов' },
        { value: 'Топ 5', label: 'рейтинги по правовым темам' },
        { value: '4.9★', label: 'средний рейтинг фирмы' },
      ],
      faqs: [
        { question: 'Сколько стоит сайт юрфирмы?', answer: 'Профессиональные сайты юрфирм от €3 500. Для многих юристов с клиентским порталом от €8 000.' },
        { question: 'Учитываете ли вы профессиональные требования?', answer: 'Да, все наши решения соответствуют профессиональным требованиям адвокатской палаты.' },
        { question: 'Как получить больше клиентов?', answer: 'Через локальное SEO, специализированные лендинги по практикам и таргетированную рекламу Google.' },
        { question: 'Обслуживаете ли вы крупные фирмы?', answer: 'Да, от частнопрактикующих юристов до международных бизнес-юрфирм.' },
      ],
      cta: 'Консультация для вашей фирмы',
    },
  },
  gastronomie: {
    icon: UtensilsCrossed,
    de: {
      title: 'Marketing für Restaurants & Hotels',
      subtitle: 'Mehr Gäste und Buchungen online',
      description: 'Digitale Lösungen für Gastronomie und Hotellerie — von der Speisekarte bis zum Bewertungsmanagement.',
      challenges: [
        'Online-Reservierungen steigern',
        'Bei Google Maps top platziert sein',
        'Positive Bewertungen generieren',
        'Saisonale Schwankungen ausgleichen',
        'Stammgäste binden',
      ],
      solutions: [
        { title: 'Restaurant-Website', description: 'Appetitliche Website mit Online-Reservierung und digitaler Speisekarte' },
        { title: 'Google Maps SEO', description: 'Optimierung für "Restaurant in der Nähe" und lokale Suchen' },
        { title: 'Bewertungsmarketing', description: 'Systematische Generierung und Management von Gästebewertungen' },
        { title: 'Social Media', description: 'Instagram und Facebook Marketing für Food-Content' },
      ],
      stats: [
        { value: '+80%', label: 'mehr Online-Reservierungen' },
        { value: 'Top 3', label: 'Google Maps Platzierung' },
        { value: '4.7★', label: 'durchschnittliche Google-Bewertung' },
      ],
      faqs: [
        { question: 'Was kostet eine Restaurant-Website?', answer: 'Restaurant-Websites mit Online-Reservierung starten bei €2.000. Hotels mit Buchungssystem ab €5.000.' },
        { question: 'Wie verbessern wir unsere Google-Bewertung?', answer: 'Durch proaktives Feedback-Management, QR-Code-Karten und schnelle Reaktion auf Bewertungen.' },
        { question: 'Funktioniert das auch für kleine Cafés?', answer: 'Ja, wir haben skalierbare Lösungen für jede Betriebsgröße.' },
        { question: 'Bietet ihr auch Fotografie an?', answer: 'Ja, wir vermitteln Food-Fotografen oder erstellen selbst appetitliche Bilder für Web und Social Media.' },
      ],
      cta: 'Beratung für Ihr Restaurant',
    },
    en: {
      title: 'Marketing for Restaurants & Hotels',
      subtitle: 'More guests and bookings online',
      description: 'Digital solutions for gastronomy and hospitality — from the menu to review management.',
      challenges: [
        'Increasing online reservations',
        'Being top-ranked on Google Maps',
        'Generating positive reviews',
        'Compensating for seasonal fluctuations',
        'Retaining regular guests',
      ],
      solutions: [
        { title: 'Restaurant Website', description: 'Appetizing website with online reservations and digital menu' },
        { title: 'Google Maps SEO', description: 'Optimization for "restaurant near me" and local searches' },
        { title: 'Review Marketing', description: 'Systematic generation and management of guest reviews' },
        { title: 'Social Media', description: 'Instagram and Facebook marketing for food content' },
      ],
      stats: [
        { value: '+80%', label: 'more online reservations' },
        { value: 'Top 3', label: 'Google Maps ranking' },
        { value: '4.7★', label: 'average Google rating' },
      ],
      faqs: [
        { question: 'What does a restaurant website cost?', answer: 'Restaurant websites with online reservations start at €2,000. Hotels with booking system from €5,000.' },
        { question: 'How do we improve our Google rating?', answer: 'Through proactive feedback management, QR code cards and quick response to reviews.' },
        { question: 'Does this work for small cafes too?', answer: 'Yes, we have scalable solutions for every business size.' },
        { question: 'Do you also offer photography?', answer: 'Yes, we connect you with food photographers or create appetizing images ourselves for web and social media.' },
      ],
      cta: 'Consultation for your restaurant',
    },
    ru: {
      title: 'Маркетинг для ресторанов и отелей',
      subtitle: 'Больше гостей и бронирований онлайн',
      description: 'Цифровые решения для гастрономии и гостеприимства — от меню до управления отзывами.',
      challenges: [
        'Увеличение онлайн-бронирований',
        'Быть в топе Google Maps',
        'Генерация положительных отзывов',
        'Компенсация сезонных колебаний',
        'Удержание постоянных гостей',
      ],
      solutions: [
        { title: 'Сайт ресторана', description: 'Аппетитный сайт с онлайн-бронированием и цифровым меню' },
        { title: 'Google Maps SEO', description: 'Оптимизация для "ресторан рядом" и локальных запросов' },
        { title: 'Маркетинг отзывов', description: 'Систематическая генерация и управление отзывами гостей' },
        { title: 'Социальные сети', description: 'Instagram и Facebook маркетинг для food-контента' },
      ],
      stats: [
        { value: '+80%', label: 'больше онлайн-бронирований' },
        { value: 'Топ 3', label: 'рейтинг в Google Maps' },
        { value: '4.7★', label: 'средний рейтинг Google' },
      ],
      faqs: [
        { question: 'Сколько стоит сайт ресторана?', answer: 'Сайты ресторанов с онлайн-бронированием от €2 000. Отели с системой бронирования от €5 000.' },
        { question: 'Как улучшить наш Google-рейтинг?', answer: 'Через проактивное управление обратной связью, QR-код карты и быструю реакцию на отзывы.' },
        { question: 'Работает ли это для маленьких кафе?', answer: 'Да, у нас есть масштабируемые решения для любого размера бизнеса.' },
        { question: 'Предлагаете ли вы фотосъемку?', answer: 'Да, мы связываем вас с food-фотографами или сами создаем аппетитные изображения для веба и соцсетей.' },
      ],
      cta: 'Консультация для вашего ресторана',
    },
  },
  immobilien: {
    icon: Home,
    de: {
      title: 'Marketing für Immobilienmakler',
      subtitle: 'Mehr Leads für Ihre Immobilien',
      description: 'Digitale Strategien für Immobilienmakler, Hausverwaltungen und Bauträger im DACH-Raum.',
      challenges: [
        'Qualifizierte Käufer- und Verkäufer-Leads gewinnen',
        'Objekte professionell präsentieren',
        'Sich von der Konkurrenz abheben',
        'Vertrauen bei Eigentümern aufbauen',
        'Beide Marktseiten bedienen',
      ],
      solutions: [
        { title: 'Makler-Website', description: 'Professionelle Website mit Objektlisting und Lead-Capture' },
        { title: 'Immobilien-SEO', description: 'Lokales SEO für "Immobilienmakler [Stadt]" und Objektsuchen' },
        { title: 'Exposé-Design', description: 'Hochwertige digitale Exposés für schnellere Vermarktung' },
        { title: 'Lead-Generierung', description: 'Kampagnen für Käufer- und Verkäufer-Leads' },
      ],
      stats: [
        { value: '+200%', label: 'mehr qualifizierte Leads' },
        { value: '-40%', label: 'kürzere Vermarktungsdauer' },
        { value: '15%', label: 'höhere Abschlussquote' },
      ],
      faqs: [
        { question: 'Was kostet eine Makler-Website?', answer: 'Professionelle Makler-Websites mit IDX-Integration starten bei €4.000. Enterprise-Lösungen ab €15.000.' },
        { question: 'Wie generiert ihr Leads?', answer: 'Durch SEO, Google Ads, Social Media Kampagnen und Immobilienportale. Wir tracken jeden Lead.' },
        { question: 'Bietet ihr auch Exposé-Design?', answer: 'Ja, von digitalen PDFs bis zu interaktiven Online-Exposés mit virtuellen Touren.' },
        { question: 'Funktioniert das für kleine Makler?', answer: 'Ja, wir haben skalierbare Lösungen vom Einzelmakler bis zum Franchisebüro.' },
      ],
      cta: 'Beratung für Ihr Maklerbüro',
    },
    en: {
      title: 'Marketing for Real Estate Agents',
      subtitle: 'More leads for your properties',
      description: 'Digital strategies for real estate agents, property managers and developers in the DACH region.',
      challenges: [
        'Acquiring qualified buyer and seller leads',
        'Presenting properties professionally',
        'Standing out from competition',
        'Building trust with property owners',
        'Serving both sides of the market',
      ],
      solutions: [
        { title: 'Agent Website', description: 'Professional website with property listings and lead capture' },
        { title: 'Real Estate SEO', description: 'Local SEO for "real estate agent [city]" and property searches' },
        { title: 'Exposé Design', description: 'High-quality digital exposés for faster marketing' },
        { title: 'Lead Generation', description: 'Campaigns for buyer and seller leads' },
      ],
      stats: [
        { value: '+200%', label: 'more qualified leads' },
        { value: '-40%', label: 'shorter marketing duration' },
        { value: '15%', label: 'higher closing rate' },
      ],
      faqs: [
        { question: 'What does an agent website cost?', answer: 'Professional agent websites with IDX integration start at €4,000. Enterprise solutions from €15,000.' },
        { question: 'How do you generate leads?', answer: 'Through SEO, Google Ads, social media campaigns and property portals. We track every lead.' },
        { question: 'Do you also offer exposé design?', answer: 'Yes, from digital PDFs to interactive online exposés with virtual tours.' },
        { question: 'Does this work for small agents?', answer: 'Yes, we have scalable solutions from solo agents to franchise offices.' },
      ],
      cta: 'Consultation for your agency',
    },
    ru: {
      title: 'Маркетинг для риелторов',
      subtitle: 'Больше лидов для вашей недвижимости',
      description: 'Цифровые стратегии для риелторов, управляющих компаний и застройщиков в регионе DACH.',
      challenges: [
        'Привлечение качественных лидов покупателей и продавцов',
        'Профессиональная презентация объектов',
        'Выделение среди конкурентов',
        'Построение доверия с собственниками',
        'Обслуживание обеих сторон рынка',
      ],
      solutions: [
        { title: 'Сайт агента', description: 'Профессиональный сайт с листингом объектов и сбором лидов' },
        { title: 'SEO для недвижимости', description: 'Локальное SEO для "риелтор [город]" и поиска объектов' },
        { title: 'Дизайн экспозе', description: 'Высококачественные цифровые экспозе для быстрой продажи' },
        { title: 'Генерация лидов', description: 'Кампании для лидов покупателей и продавцов' },
      ],
      stats: [
        { value: '+200%', label: 'больше качественных лидов' },
        { value: '-40%', label: 'короче срок продажи' },
        { value: '15%', label: 'выше конверсия сделок' },
      ],
      faqs: [
        { question: 'Сколько стоит сайт агента?', answer: 'Профессиональные сайты агентов с IDX интеграцией от €4 000. Enterprise-решения от €15 000.' },
        { question: 'Как вы генерируете лиды?', answer: 'Через SEO, Google Ads, кампании в соцсетях и порталы недвижимости. Мы отслеживаем каждый лид.' },
        { question: 'Предлагаете ли вы дизайн экспозе?', answer: 'Да, от цифровых PDF до интерактивных онлайн-экспозе с виртуальными турами.' },
        { question: 'Работает ли это для маленьких агентов?', answer: 'Да, у нас есть масштабируемые решения от частных агентов до франчайзинговых офисов.' },
      ],
      cta: 'Консультация для вашего агентства',
    },
  },
  dienstleister: {
    icon: Briefcase,
    de: {
      title: 'Marketing für Dienstleister & Berater',
      subtitle: 'Mehr Kunden durch starke Personal Brand',
      description: 'Von Personal Branding bis Lead-Generierung — für Freelancer, Coaches und Unternehmensberater.',
      challenges: [
        'Expertise sichtbar machen',
        'Sich als Experte positionieren',
        'Regelmäßig neue Kunden gewinnen',
        'Preise durchsetzen',
        'Von Empfehlungen unabhängiger werden',
      ],
      solutions: [
        { title: 'Personal Branding', description: 'Starke persönliche Marke mit authentischem Auftritt' },
        { title: 'Landing Pages', description: 'Konversionsoptimierte Seiten für Ihre Angebote' },
        { title: 'Content Marketing', description: 'Thought Leadership durch Fachartikel und LinkedIn' },
        { title: 'Funnel Marketing', description: 'Automatisierte Lead-Nurturing-Prozesse' },
      ],
      stats: [
        { value: '+300%', label: 'mehr Anfragen über Website' },
        { value: '5x', label: 'LinkedIn Engagement' },
        { value: '+40%', label: 'höhere Projektpreise' },
      ],
      faqs: [
        { question: 'Was kostet Personal Branding?', answer: 'Personal Branding Pakete starten bei €3.000 für Website + Logo. Vollständige Brand-Entwicklung ab €6.000.' },
        { question: 'Wie baue ich LinkedIn-Präsenz auf?', answer: 'Durch regelmäßigen Content, strategisches Networking und gezielte Thought-Leadership-Beiträge.' },
        { question: 'Bietet ihr auch Coaching-Funnels?', answer: 'Ja, von Webinar-Funnels über E-Mail-Sequenzen bis zu vollautomatisierten Verkaufssystemen.' },
        { question: 'Wie lange bis zu Ergebnissen?', answer: 'Erste Leads nach 4-6 Wochen mit Paid, organisch nach 3-6 Monaten. Wir kombinieren beides.' },
      ],
      cta: 'Beratung für Ihre Personal Brand',
    },
    en: {
      title: 'Marketing for Service Providers & Consultants',
      subtitle: 'More clients through strong personal brand',
      description: 'From personal branding to lead generation — for freelancers, coaches and business consultants.',
      challenges: [
        'Making expertise visible',
        'Positioning yourself as an expert',
        'Regularly acquiring new clients',
        'Commanding higher prices',
        'Becoming less dependent on referrals',
      ],
      solutions: [
        { title: 'Personal Branding', description: 'Strong personal brand with authentic presentation' },
        { title: 'Landing Pages', description: 'Conversion-optimized pages for your offers' },
        { title: 'Content Marketing', description: 'Thought leadership through expert articles and LinkedIn' },
        { title: 'Funnel Marketing', description: 'Automated lead nurturing processes' },
      ],
      stats: [
        { value: '+300%', label: 'more inquiries via website' },
        { value: '5x', label: 'LinkedIn engagement' },
        { value: '+40%', label: 'higher project prices' },
      ],
      faqs: [
        { question: 'What does personal branding cost?', answer: 'Personal branding packages start at €3,000 for website + logo. Complete brand development from €6,000.' },
        { question: 'How do I build LinkedIn presence?', answer: 'Through regular content, strategic networking and targeted thought leadership posts.' },
        { question: 'Do you also offer coaching funnels?', answer: 'Yes, from webinar funnels to email sequences to fully automated sales systems.' },
        { question: 'How long until results?', answer: 'First leads after 4-6 weeks with paid, organically after 3-6 months. We combine both.' },
      ],
      cta: 'Consultation for your personal brand',
    },
    ru: {
      title: 'Маркетинг для поставщиков услуг и консультантов',
      subtitle: 'Больше клиентов через сильный персональный бренд',
      description: 'От персонального брендинга до генерации лидов — для фрилансеров, коучей и бизнес-консультантов.',
      challenges: [
        'Сделать экспертизу видимой',
        'Позиционировать себя как эксперта',
        'Регулярно привлекать новых клиентов',
        'Устанавливать высокие цены',
        'Стать менее зависимым от рекомендаций',
      ],
      solutions: [
        { title: 'Персональный брендинг', description: 'Сильный личный бренд с аутентичной презентацией' },
        { title: 'Лендинги', description: 'Оптимизированные для конверсии страницы для ваших предложений' },
        { title: 'Контент-маркетинг', description: 'Thought leadership через экспертные статьи и LinkedIn' },
        { title: 'Воронки продаж', description: 'Автоматизированные процессы nurturing лидов' },
      ],
      stats: [
        { value: '+300%', label: 'больше запросов через сайт' },
        { value: '5x', label: 'вовлеченность в LinkedIn' },
        { value: '+40%', label: 'выше цены проектов' },
      ],
      faqs: [
        { question: 'Сколько стоит персональный брендинг?', answer: 'Пакеты персонального брендинга от €3 000 за сайт + логотип. Полная разработка бренда от €6 000.' },
        { question: 'Как построить присутствие в LinkedIn?', answer: 'Через регулярный контент, стратегический нетворкинг и целевые thought leadership посты.' },
        { question: 'Предлагаете ли вы воронки для коучей?', answer: 'Да, от вебинарных воронок до email-последовательностей и полностью автоматизированных систем продаж.' },
        { question: 'Сколько времени до результатов?', answer: 'Первые лиды через 4-6 недель с рекламой, органически через 3-6 месяцев. Мы комбинируем оба подхода.' },
      ],
      cta: 'Консультация по вашему личному бренду',
    },
  },
}

interface IndustryContent {
  title: string
  subtitle: string
  description: string
  challenges: string[]
  solutions: Array<{ title: string; description: string }>
  stats: Array<{ value: string; label: string }>
  faqs: Array<{ question: string; answer: string }>
  cta: string
}

const validSlugs = Object.keys(industries)

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const industry = industries[slug]
  if (!industry) return { title: 'Not Found' }

  const loc = (locale as 'de' | 'en' | 'ru') || 'de'
  const content = industry[loc] || industry.de
  const hreflangAlternates = getHreflangAlternates(`/branchen/${slug}`, locale)

  return {
    title: `${content.title} | GoldenWing`,
    description: content.description,
    alternates: {
      canonical: getCanonicalUrl(`/branchen/${slug}`, locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const industry = industries[slug]
  if (!industry) notFound()

  const loc = (locale as 'de' | 'en' | 'ru') || 'de'
  const content = industry[loc] || industry.de
  const Icon = industry.icon

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-6">
              <Icon className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {content.subtitle}
            </p>
            <p className="text-muted-foreground mb-8">
              {content.description}
            </p>
            <Button size="lg" asChild>
              <NextLink href="/kontakt">
                {content.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-12 border-y bg-muted/30">
        <Container>
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {content.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Challenges */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {loc === 'de' ? 'Ihre Herausforderungen' : loc === 'ru' ? 'Ваши вызовы' : 'Your Challenges'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.challenges.map((challenge) => (
                <div key={challenge} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-muted/30">
        <Container>
          <h2 className="text-2xl font-bold mb-8 text-center">
            {loc === 'de' ? 'Unsere Lösungen' : loc === 'ru' ? 'Наши решения' : 'Our Solutions'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {content.solutions.map((solution) => (
              <Card key={solution.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <Container>
          <FAQSection
            title={loc === 'de' ? 'Häufige Fragen' : loc === 'ru' ? 'Частые вопросы' : 'Frequently Asked Questions'}
            items={content.faqs}
          />
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.cta}</h2>
            <p className="mb-6 opacity-90">
              {loc === 'de' ? 'Lassen Sie uns gemeinsam Ihre digitale Strategie entwickeln.' : loc === 'ru' ? 'Давайте вместе разработаем вашу цифровую стратегию.' : "Let's develop your digital strategy together."}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <NextLink href="/kontakt">
                {loc === 'de' ? 'Kostenlose Beratung' : loc === 'ru' ? 'Бесплатная консультация' : 'Free Consultation'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
