import { Metadata } from 'next'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Clock, Euro, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FAQSection } from '@/components/sections/faq-section'
import { Container } from '@/components/ui/container'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'

export const revalidate = 86400

interface GuideContent {
  title: string
  subtitle: string
  intro: string
  readTime: string
  updated: string
  sections: Array<{
    title: string
    content: string
    items?: string[]
    highlight?: { type: 'tip' | 'warning'; text: string }
  }>
  priceTable?: {
    title: string
    rows: Array<{ category: string; range: string; note: string }>
  }
  faqs: Array<{ question: string; answer: string }>
  cta: string
}

const guides: Record<string, {
  de: GuideContent
  en: GuideContent
  ru: GuideContent
}> = {
  'webdesign-kosten': {
    de: {
      title: 'Was kostet Webdesign 2026?',
      subtitle: 'Der komplette Preis-Guide für Websites in Österreich',
      intro: 'Die Kosten für professionelles Webdesign variieren stark — von €1.000 bis über €50.000. Dieser Guide hilft Ihnen, realistische Budgets zu planen und versteckte Kosten zu vermeiden.',
      readTime: '12 Min. Lesezeit',
      updated: 'Stand: Februar 2026',
      sections: [
        {
          title: 'Schnellübersicht: Webdesign Kosten 2026',
          content: 'Die wichtigsten Preisbereiche auf einen Blick:',
          items: [
            'Einfache Website (5-10 Seiten): €1.500 - €4.000',
            'Business-Website mit CMS: €4.000 - €10.000',
            'E-Commerce Shop: €8.000 - €25.000',
            'Enterprise/Individuelle Lösung: €20.000 - €100.000+',
          ],
        },
        {
          title: 'Was beeinflusst den Preis?',
          content: 'Die Kosten für Webdesign hängen von vielen Faktoren ab:',
          items: [
            'Anzahl der Seiten und Komplexität der Inhalte',
            'Individuelles Design vs. Template-Anpassung',
            'Funktionen: Shop, Buchungssystem, Mehrsprachigkeit',
            'CMS-Wahl: WordPress, Shopify, individuelle Lösung',
            'SEO-Optimierung und Performance-Tuning',
            'Laufende Wartung und Support',
          ],
          highlight: { type: 'tip', text: 'Tipp: Definieren Sie Ihre Anforderungen genau, bevor Sie Angebote einholen. Das spart Zeit und ermöglicht vergleichbare Angebote.' },
        },
        {
          title: 'Agentur vs. Freelancer',
          content: 'Beide Optionen haben Vor- und Nachteile:',
          items: [
            'Freelancer: €50-120/Stunde — gut für kleinere Projekte, flexibel, aber Ausfallrisiko',
            'Kleine Agentur: €80-150/Stunde — gutes Preis-Leistungs-Verhältnis, breitere Expertise',
            'Große Agentur: €120-200/Stunde — Enterprise-Qualität, umfassendes Team, höhere Kosten',
          ],
          highlight: { type: 'warning', text: 'Achtung: Der günstigste Anbieter ist nicht immer der beste. Achten Sie auf Referenzen und prüfen Sie die Qualität der bisherigen Arbeiten.' },
        },
        {
          title: 'Versteckte Kosten vermeiden',
          content: 'Diese Kosten werden oft vergessen:',
          items: [
            'Domain und Hosting: €100-500/Jahr',
            'SSL-Zertifikat: €0-200/Jahr (bei vielen Hostern kostenlos)',
            'Wartung und Updates: €50-300/Monat',
            'Content-Erstellung: €500-5.000',
            'Professionelle Fotos: €500-3.000',
            'Änderungen nach Go-Live: €80-150/Stunde',
          ],
        },
        {
          title: 'ROI: Wann lohnt sich die Investition?',
          content: 'Eine professionelle Website ist eine Investition, die sich rechnen sollte. Bei einem durchschnittlichen Kundenwert von €1.000 und einer Conversion-Rate von 2% brauchen Sie nur 50 Besucher pro Monat, um bei einer €5.000-Website innerhalb eines Jahres ROI zu erreichen.',
        },
      ],
      priceTable: {
        title: 'Preisübersicht Webdesign 2026',
        rows: [
          { category: 'One-Pager / Landingpage', range: '€1.000 - €3.000', note: 'Ideal für Freelancer, Events' },
          { category: 'Kleine Unternehmenswebsite', range: '€2.500 - €6.000', note: '5-10 Seiten, Kontaktformular' },
          { category: 'Mittlere Unternehmenswebsite', range: '€5.000 - €15.000', note: 'CMS, Blog, mehrere Sprachen' },
          { category: 'E-Commerce Shop (klein)', range: '€6.000 - €15.000', note: 'Bis 100 Produkte' },
          { category: 'E-Commerce Shop (mittel)', range: '€15.000 - €40.000', note: '100-1.000 Produkte, Anbindungen' },
          { category: 'Enterprise / Portal', range: '€30.000 - €150.000+', note: 'Individuelle Entwicklung' },
        ],
      },
      faqs: [
        { question: 'Kann ich die Website selbst pflegen?', answer: 'Ja, mit einem CMS wie WordPress können Sie Texte und Bilder selbst ändern. Wir schulen Sie im Umgang mit dem System.' },
        { question: 'Wie lange dauert die Erstellung?', answer: 'Eine einfache Website ist in 2-4 Wochen fertig. Komplexere Projekte dauern 2-6 Monate.' },
        { question: 'Was passiert nach dem Launch?', answer: 'Wir bieten Wartungsverträge ab €99/Monat inkl. Updates, Backups und kleiner Änderungen.' },
        { question: 'Ist SEO im Preis enthalten?', answer: 'Grundlegende OnPage-SEO ist bei uns immer inklusive. Für umfassende SEO-Betreuung bieten wir separate Pakete.' },
      ],
      cta: 'Kostenloses Angebot für Ihre Website',
    },
    en: {
      title: 'What does web design cost in 2026?',
      subtitle: 'The complete price guide for websites in Austria',
      intro: 'The costs for professional web design vary widely — from €1,000 to over €50,000. This guide helps you plan realistic budgets and avoid hidden costs.',
      readTime: '12 min read',
      updated: 'As of: February 2026',
      sections: [
        {
          title: 'Quick overview: Web design costs 2026',
          content: 'The main price ranges at a glance:',
          items: [
            'Simple website (5-10 pages): €1,500 - €4,000',
            'Business website with CMS: €4,000 - €10,000',
            'E-commerce shop: €8,000 - €25,000',
            'Enterprise/Custom solution: €20,000 - €100,000+',
          ],
        },
        {
          title: 'What influences the price?',
          content: 'The costs for web design depend on many factors:',
          items: [
            'Number of pages and content complexity',
            'Custom design vs. template customization',
            'Features: shop, booking system, multilingual',
            'CMS choice: WordPress, Shopify, custom solution',
            'SEO optimization and performance tuning',
            'Ongoing maintenance and support',
          ],
          highlight: { type: 'tip', text: 'Tip: Define your requirements precisely before requesting quotes. This saves time and enables comparable offers.' },
        },
        {
          title: 'Agency vs. Freelancer',
          content: 'Both options have pros and cons:',
          items: [
            'Freelancer: €50-120/hour — good for smaller projects, flexible, but risk of unavailability',
            'Small agency: €80-150/hour — good value, broader expertise',
            'Large agency: €120-200/hour — enterprise quality, comprehensive team, higher costs',
          ],
          highlight: { type: 'warning', text: 'Warning: The cheapest provider is not always the best. Check references and review the quality of previous work.' },
        },
        {
          title: 'Avoiding hidden costs',
          content: 'These costs are often forgotten:',
          items: [
            'Domain and hosting: €100-500/year',
            'SSL certificate: €0-200/year (free with many hosts)',
            'Maintenance and updates: €50-300/month',
            'Content creation: €500-5,000',
            'Professional photos: €500-3,000',
            'Changes after go-live: €80-150/hour',
          ],
        },
        {
          title: 'ROI: When does the investment pay off?',
          content: 'A professional website is an investment that should pay off. With an average customer value of €1,000 and a conversion rate of 2%, you only need 50 visitors per month to achieve ROI within a year on a €5,000 website.',
        },
      ],
      priceTable: {
        title: 'Web design price overview 2026',
        rows: [
          { category: 'One-pager / Landing page', range: '€1,000 - €3,000', note: 'Ideal for freelancers, events' },
          { category: 'Small business website', range: '€2,500 - €6,000', note: '5-10 pages, contact form' },
          { category: 'Medium business website', range: '€5,000 - €15,000', note: 'CMS, blog, multiple languages' },
          { category: 'E-commerce shop (small)', range: '€6,000 - €15,000', note: 'Up to 100 products' },
          { category: 'E-commerce shop (medium)', range: '€15,000 - €40,000', note: '100-1,000 products, integrations' },
          { category: 'Enterprise / Portal', range: '€30,000 - €150,000+', note: 'Custom development' },
        ],
      },
      faqs: [
        { question: 'Can I maintain the website myself?', answer: 'Yes, with a CMS like WordPress you can change texts and images yourself. We train you in using the system.' },
        { question: 'How long does creation take?', answer: 'A simple website is ready in 2-4 weeks. More complex projects take 2-6 months.' },
        { question: 'What happens after launch?', answer: 'We offer maintenance contracts from €99/month incl. updates, backups and minor changes.' },
        { question: 'Is SEO included in the price?', answer: 'Basic on-page SEO is always included with us. For comprehensive SEO support, we offer separate packages.' },
      ],
      cta: 'Free quote for your website',
    },
    ru: {
      title: 'Сколько стоит веб-дизайн в 2026?',
      subtitle: 'Полный прайс-гайд для сайтов в Австрии',
      intro: 'Стоимость профессионального веб-дизайна сильно варьируется — от €1 000 до более €50 000. Этот гайд поможет вам спланировать реалистичный бюджет и избежать скрытых расходов.',
      readTime: '12 мин чтения',
      updated: 'Актуально: Февраль 2026',
      sections: [
        {
          title: 'Быстрый обзор: Стоимость веб-дизайна 2026',
          content: 'Основные ценовые диапазоны на один взгляд:',
          items: [
            'Простой сайт (5-10 страниц): €1 500 - €4 000',
            'Бизнес-сайт с CMS: €4 000 - €10 000',
            'Интернет-магазин: €8 000 - €25 000',
            'Enterprise/Индивидуальное решение: €20 000 - €100 000+',
          ],
        },
        {
          title: 'Что влияет на цену?',
          content: 'Стоимость веб-дизайна зависит от многих факторов:',
          items: [
            'Количество страниц и сложность контента',
            'Индивидуальный дизайн vs. адаптация шаблона',
            'Функции: магазин, система бронирования, многоязычность',
            'Выбор CMS: WordPress, Shopify, индивидуальное решение',
            'SEO-оптимизация и настройка производительности',
            'Текущее обслуживание и поддержка',
          ],
          highlight: { type: 'tip', text: 'Совет: Определите свои требования точно, прежде чем запрашивать предложения. Это экономит время и позволяет сравнивать предложения.' },
        },
        {
          title: 'Агентство vs. Фрилансер',
          content: 'Оба варианта имеют свои плюсы и минусы:',
          items: [
            'Фрилансер: €50-120/час — хорошо для небольших проектов, гибко, но риск недоступности',
            'Малое агентство: €80-150/час — хорошее соотношение цена-качество, широкая экспертиза',
            'Крупное агентство: €120-200/час — enterprise-качество, полная команда, высокие затраты',
          ],
          highlight: { type: 'warning', text: 'Внимание: Самый дешевый исполнитель не всегда лучший. Проверяйте референсы и качество предыдущих работ.' },
        },
        {
          title: 'Избегайте скрытых расходов',
          content: 'Эти расходы часто забывают:',
          items: [
            'Домен и хостинг: €100-500/год',
            'SSL-сертификат: €0-200/год (у многих хостеров бесплатно)',
            'Обслуживание и обновления: €50-300/месяц',
            'Создание контента: €500-5 000',
            'Профессиональные фото: €500-3 000',
            'Изменения после запуска: €80-150/час',
          ],
        },
        {
          title: 'ROI: Когда инвестиция окупается?',
          content: 'Профессиональный сайт — это инвестиция, которая должна окупаться. При средней стоимости клиента €1 000 и конверсии 2% вам нужно всего 50 посетителей в месяц, чтобы достичь ROI в течение года при сайте за €5 000.',
        },
      ],
      priceTable: {
        title: 'Обзор цен на веб-дизайн 2026',
        rows: [
          { category: 'Одностраничник / Лендинг', range: '€1 000 - €3 000', note: 'Идеально для фрилансеров, мероприятий' },
          { category: 'Малый бизнес-сайт', range: '€2 500 - €6 000', note: '5-10 страниц, форма контакта' },
          { category: 'Средний бизнес-сайт', range: '€5 000 - €15 000', note: 'CMS, блог, несколько языков' },
          { category: 'Интернет-магазин (малый)', range: '€6 000 - €15 000', note: 'До 100 товаров' },
          { category: 'Интернет-магазин (средний)', range: '€15 000 - €40 000', note: '100-1 000 товаров, интеграции' },
          { category: 'Enterprise / Портал', range: '€30 000 - €150 000+', note: 'Индивидуальная разработка' },
        ],
      },
      faqs: [
        { question: 'Могу ли я сам обслуживать сайт?', answer: 'Да, с CMS типа WordPress вы можете сами менять тексты и изображения. Мы обучим вас работе с системой.' },
        { question: 'Сколько времени занимает создание?', answer: 'Простой сайт готов за 2-4 недели. Более сложные проекты занимают 2-6 месяцев.' },
        { question: 'Что происходит после запуска?', answer: 'Мы предлагаем контракты на обслуживание от €99/месяц включая обновления, бэкапы и мелкие изменения.' },
        { question: 'SEO включено в цену?', answer: 'Базовое OnPage-SEO всегда включено. Для комплексного SEO-сопровождения мы предлагаем отдельные пакеты.' },
      ],
      cta: 'Бесплатное предложение для вашего сайта',
    },
  },
  'seo-kosten': {
    de: {
      title: 'SEO Kosten & Budget 2026',
      subtitle: 'Was kostet professionelles SEO wirklich?',
      intro: 'SEO-Preise reichen von €500 bis €10.000+ pro Monat. Erfahren Sie, welches Budget für Ihre Ziele sinnvoll ist und wie Sie das Maximum aus Ihrer Investition herausholen.',
      readTime: '10 Min. Lesezeit',
      updated: 'Stand: Februar 2026',
      sections: [
        {
          title: 'SEO Kosten Übersicht',
          content: 'Die typischen Preisbereiche für SEO in Österreich:',
          items: [
            'Einmalige SEO-Analyse: €500 - €2.500',
            'Lokales SEO (kleine Unternehmen): €500 - €1.500/Monat',
            'Nationales SEO (KMU): €1.500 - €4.000/Monat',
            'Enterprise SEO: €5.000 - €15.000+/Monat',
          ],
        },
        {
          title: 'Was beeinflusst SEO-Kosten?',
          content: 'Diese Faktoren bestimmen Ihr SEO-Budget:',
          items: [
            'Wettbewerbsintensität Ihrer Branche',
            'Anzahl der Ziel-Keywords',
            'Aktueller Zustand Ihrer Website',
            'Lokales vs. nationales vs. internationales SEO',
            'Content-Erstellung vs. nur Optimierung',
            'Linkbuilding-Intensität',
          ],
          highlight: { type: 'tip', text: 'Tipp: SEO ist ein Marathon, kein Sprint. Planen Sie mindestens 6-12 Monate ein, bevor Sie signifikante Ergebnisse erwarten.' },
        },
        {
          title: 'Monatliche vs. einmalige Kosten',
          content: 'SEO hat zwei Kostenarten:',
          items: [
            'Einmalig: Technisches SEO, Website-Audit, Strategie-Entwicklung',
            'Monatlich: Content-Erstellung, Linkbuilding, Monitoring, Optimierung',
            'Empfehlung: Starten Sie mit einem Audit, dann monatliche Betreuung',
          ],
        },
        {
          title: 'Wann lohnt sich SEO?',
          content: 'SEO rechnet sich, wenn Ihre Kunden online suchen. Bei einem Kundenwert von €2.000 und einer Conversion-Rate von 3% brauchen Sie nur 17 organische Besucher pro Monat, um ein €1.000-SEO-Budget zu rechtfertigen.',
          highlight: { type: 'warning', text: 'Warnung: Vorsicht vor "Garantie"-Versprechen. Seriöse SEO-Agenturen können keine Rankings garantieren.' },
        },
      ],
      priceTable: {
        title: 'SEO Preisübersicht 2026',
        rows: [
          { category: 'SEO-Audit (einmalig)', range: '€500 - €2.500', note: 'Technische + OnPage Analyse' },
          { category: 'Lokales SEO', range: '€500 - €1.500/Monat', note: '1 Stadt, Google Business' },
          { category: 'Regionales SEO', range: '€1.000 - €2.500/Monat', note: 'Mehrere Städte/Bundesland' },
          { category: 'Nationales SEO', range: '€2.000 - €5.000/Monat', note: 'Österreich-weit, 20+ Keywords' },
          { category: 'E-Commerce SEO', range: '€2.500 - €8.000/Monat', note: 'Produkt-SEO, Kategorien' },
          { category: 'Enterprise SEO', range: '€5.000 - €20.000/Monat', note: 'Große Portale, International' },
        ],
      },
      faqs: [
        { question: 'Wie lange dauert SEO bis zu Ergebnissen?', answer: 'Erste Verbesserungen nach 3-6 Monaten, signifikante Ergebnisse nach 6-12 Monaten. SEO ist eine langfristige Strategie.' },
        { question: 'Kann ich SEO selbst machen?', answer: 'Grundlagen ja, aber für wettbewerbsintensive Keywords brauchen Sie Expertenwissen und Tools im Wert von €500+/Monat.' },
        { question: 'Was ist in einem SEO-Paket enthalten?', answer: 'Typisch: Technisches SEO, OnPage-Optimierung, Content-Erstellung, Linkbuilding, monatliches Reporting.' },
        { question: 'Warum sind die Preise so unterschiedlich?', answer: 'Je nach Wettbewerb, Umfang und Qualität. Billig-SEO kann sogar schaden (Spam-Links). Qualität hat ihren Preis.' },
      ],
      cta: 'Kostenlose SEO-Analyse anfordern',
    },
    en: {
      title: 'SEO Costs & Budget 2026',
      subtitle: 'What does professional SEO really cost?',
      intro: 'SEO prices range from €500 to €10,000+ per month. Learn which budget makes sense for your goals and how to get the maximum from your investment.',
      readTime: '10 min read',
      updated: 'As of: February 2026',
      sections: [
        {
          title: 'SEO costs overview',
          content: 'Typical price ranges for SEO in Austria:',
          items: [
            'One-time SEO analysis: €500 - €2,500',
            'Local SEO (small businesses): €500 - €1,500/month',
            'National SEO (SME): €1,500 - €4,000/month',
            'Enterprise SEO: €5,000 - €15,000+/month',
          ],
        },
        {
          title: 'What influences SEO costs?',
          content: 'These factors determine your SEO budget:',
          items: [
            'Competition intensity in your industry',
            'Number of target keywords',
            'Current state of your website',
            'Local vs. national vs. international SEO',
            'Content creation vs. optimization only',
            'Link building intensity',
          ],
          highlight: { type: 'tip', text: 'Tip: SEO is a marathon, not a sprint. Plan at least 6-12 months before expecting significant results.' },
        },
        {
          title: 'Monthly vs. one-time costs',
          content: 'SEO has two types of costs:',
          items: [
            'One-time: Technical SEO, website audit, strategy development',
            'Monthly: Content creation, link building, monitoring, optimization',
            'Recommendation: Start with an audit, then monthly support',
          ],
        },
        {
          title: 'When is SEO worth it?',
          content: 'SEO pays off when your customers search online. With a customer value of €2,000 and a conversion rate of 3%, you only need 17 organic visitors per month to justify a €1,000 SEO budget.',
          highlight: { type: 'warning', text: 'Warning: Beware of "guarantee" promises. Reputable SEO agencies cannot guarantee rankings.' },
        },
      ],
      priceTable: {
        title: 'SEO price overview 2026',
        rows: [
          { category: 'SEO audit (one-time)', range: '€500 - €2,500', note: 'Technical + OnPage analysis' },
          { category: 'Local SEO', range: '€500 - €1,500/month', note: '1 city, Google Business' },
          { category: 'Regional SEO', range: '€1,000 - €2,500/month', note: 'Multiple cities/region' },
          { category: 'National SEO', range: '€2,000 - €5,000/month', note: 'Austria-wide, 20+ keywords' },
          { category: 'E-Commerce SEO', range: '€2,500 - €8,000/month', note: 'Product SEO, categories' },
          { category: 'Enterprise SEO', range: '€5,000 - €20,000/month', note: 'Large portals, international' },
        ],
      },
      faqs: [
        { question: 'How long does SEO take to show results?', answer: 'First improvements after 3-6 months, significant results after 6-12 months. SEO is a long-term strategy.' },
        { question: 'Can I do SEO myself?', answer: 'Basics yes, but for competitive keywords you need expert knowledge and tools worth €500+/month.' },
        { question: 'What is included in an SEO package?', answer: 'Typically: Technical SEO, on-page optimization, content creation, link building, monthly reporting.' },
        { question: 'Why are prices so different?', answer: 'Depending on competition, scope and quality. Cheap SEO can even harm (spam links). Quality has its price.' },
      ],
      cta: 'Request free SEO analysis',
    },
    ru: {
      title: 'Стоимость SEO и бюджет 2026',
      subtitle: 'Сколько на самом деле стоит профессиональное SEO?',
      intro: 'Цены на SEO варьируются от €500 до €10 000+ в месяц. Узнайте, какой бюджет подходит для ваших целей и как получить максимум от инвестиций.',
      readTime: '10 мин чтения',
      updated: 'Актуально: Февраль 2026',
      sections: [
        {
          title: 'Обзор стоимости SEO',
          content: 'Типичные ценовые диапазоны для SEO в Австрии:',
          items: [
            'Разовый SEO-аудит: €500 - €2 500',
            'Локальное SEO (малый бизнес): €500 - €1 500/месяц',
            'Национальное SEO (СМБ): €1 500 - €4 000/месяц',
            'Enterprise SEO: €5 000 - €15 000+/месяц',
          ],
        },
        {
          title: 'Что влияет на стоимость SEO?',
          content: 'Эти факторы определяют ваш SEO-бюджет:',
          items: [
            'Интенсивность конкуренции в вашей отрасли',
            'Количество целевых ключевых слов',
            'Текущее состояние вашего сайта',
            'Локальное vs. национальное vs. международное SEO',
            'Создание контента vs. только оптимизация',
            'Интенсивность линкбилдинга',
          ],
          highlight: { type: 'tip', text: 'Совет: SEO — это марафон, не спринт. Планируйте минимум 6-12 месяцев до значительных результатов.' },
        },
        {
          title: 'Месячные vs. разовые расходы',
          content: 'SEO имеет два типа расходов:',
          items: [
            'Разовые: Техническое SEO, аудит сайта, разработка стратегии',
            'Месячные: Создание контента, линкбилдинг, мониторинг, оптимизация',
            'Рекомендация: Начните с аудита, затем ежемесячное сопровождение',
          ],
        },
        {
          title: 'Когда SEO окупается?',
          content: 'SEO окупается, когда ваши клиенты ищут онлайн. При среднем чеке €2 000 и конверсии 3% вам нужно всего 17 органических посетителей в месяц, чтобы оправдать бюджет SEO в €1 000.',
          highlight: { type: 'warning', text: 'Внимание: Остерегайтесь "гарантийных" обещаний. Серьезные SEO-агентства не могут гарантировать позиции.' },
        },
      ],
      priceTable: {
        title: 'Обзор цен на SEO 2026',
        rows: [
          { category: 'SEO-аудит (разово)', range: '€500 - €2 500', note: 'Технический + OnPage анализ' },
          { category: 'Локальное SEO', range: '€500 - €1 500/месяц', note: '1 город, Google Business' },
          { category: 'Региональное SEO', range: '€1 000 - €2 500/месяц', note: 'Несколько городов/регион' },
          { category: 'Национальное SEO', range: '€2 000 - €5 000/месяц', note: 'Вся Австрия, 20+ ключевиков' },
          { category: 'E-Commerce SEO', range: '€2 500 - €8 000/месяц', note: 'Продуктовое SEO, категории' },
          { category: 'Enterprise SEO', range: '€5 000 - €20 000/месяц', note: 'Большие порталы, международно' },
        ],
      },
      faqs: [
        { question: 'Сколько времени нужно для результатов SEO?', answer: 'Первые улучшения через 3-6 месяцев, значительные результаты через 6-12 месяцев. SEO — долгосрочная стратегия.' },
        { question: 'Могу ли я делать SEO сам?', answer: 'Основы да, но для конкурентных ключевиков нужны экспертные знания и инструменты на €500+/месяц.' },
        { question: 'Что входит в пакет SEO?', answer: 'Обычно: Техническое SEO, оптимизация страниц, создание контента, линкбилдинг, ежемесячная отчетность.' },
        { question: 'Почему цены так отличаются?', answer: 'В зависимости от конкуренции, объема и качества. Дешевое SEO может даже навредить (спам-ссылки). Качество имеет свою цену.' },
      ],
      cta: 'Запросить бесплатный SEO-анализ',
    },
  },
  'website-erstellen-lassen': {
    de: {
      title: 'Website erstellen lassen: Komplett-Guide',
      subtitle: 'Von der Idee zum erfolgreichen Launch',
      intro: 'Sie möchten eine professionelle Website erstellen lassen? Dieser Guide begleitet Sie durch den gesamten Prozess — von der Planung über die Agenturwahl bis zum Go-Live.',
      readTime: '15 Min. Lesezeit',
      updated: 'Stand: Februar 2026',
      sections: [
        {
          title: 'Schritt 1: Anforderungen definieren',
          content: 'Bevor Sie Angebote einholen, klären Sie:',
          items: [
            'Welches Ziel verfolgt die Website? (Leads, Verkäufe, Branding)',
            'Wer ist Ihre Zielgruppe?',
            'Welche Funktionen werden benötigt? (Shop, Blog, Buchung)',
            'Wie viele Seiten/Inhalte?',
            'In welchen Sprachen?',
            'Budget-Rahmen?',
          ],
          highlight: { type: 'tip', text: 'Tipp: Erstellen Sie ein kurzes Briefing-Dokument (1-2 Seiten) mit Ihren Anforderungen. Das spart Zeit bei Agentur-Gesprächen.' },
        },
        {
          title: 'Schritt 2: Den richtigen Partner finden',
          content: 'Optionen für die Umsetzung:',
          items: [
            'Freelancer: Für einfache Websites, Budget-orientiert',
            'Kleine Agentur (5-15 MA): Gutes Preis-Leistungs-Verhältnis',
            'Große Agentur (15+ MA): Enterprise-Projekte, volle Kapazität',
            'Achten Sie auf: Referenzen in Ihrer Branche, klare Kommunikation, realistisches Timing',
          ],
        },
        {
          title: 'Schritt 3: Das Briefing',
          content: 'Ein gutes Briefing enthält:',
          items: [
            'Unternehmensprofil und Zielgruppe',
            'Ziele der Website',
            'Funktionale Anforderungen',
            'Design-Vorstellungen (Beispielseiten)',
            'Inhalte (vorhanden oder zu erstellen?)',
            'Zeitrahmen und Budget',
          ],
        },
        {
          title: 'Schritt 4: Angebote vergleichen',
          content: 'Beim Vergleich beachten:',
          items: [
            'Was ist alles im Preis enthalten?',
            'Wie viele Korrekturschleifen?',
            'SEO-Grundoptimierung inklusive?',
            'Schulung für die Bedienung?',
            'Support nach Go-Live?',
            'Hosting-Kosten?',
          ],
          highlight: { type: 'warning', text: 'Achtung: Billig kann teuer werden. Ein €2.000-Pfusch führt oft zu €5.000+ Folgekosten für Reparaturen.' },
        },
        {
          title: 'Schritt 5: Projekt-Management',
          content: 'So läuft ein typisches Webprojekt ab:',
          items: [
            'Kick-off: Briefing-Abstimmung, Zeitplan',
            'Konzept: Wireframes, Struktur',
            'Design: Look & Feel, Abnahme',
            'Entwicklung: Technische Umsetzung',
            'Content: Texte, Bilder einpflegen',
            'Testing: QA, Browser-Tests',
            'Launch: Go-Live, Monitoring',
          ],
        },
      ],
      faqs: [
        { question: 'Wie lange dauert eine Website?', answer: 'Einfache Sites: 4-6 Wochen. Mittelgroße Projekte: 2-3 Monate. Komplexe Portale: 4-6+ Monate.' },
        { question: 'Was muss ich selbst beisteuern?', answer: 'Idealerweise: Texte, Logos, Bilder. Alternativ können wir Content-Erstellung mit anbieten.' },
        { question: 'Kann ich später Änderungen machen?', answer: 'Ja, mit einem CMS können Sie Inhalte selbst anpassen. Für größere Änderungen unterstützen wir Sie.' },
        { question: 'Was passiert nach dem Launch?', answer: 'Wir empfehlen einen Wartungsvertrag für Updates, Sicherheit und kleinere Anpassungen.' },
      ],
      cta: 'Jetzt Projekt besprechen',
    },
    en: {
      title: 'Having a website created: Complete guide',
      subtitle: 'From idea to successful launch',
      intro: 'You want to have a professional website created? This guide accompanies you through the entire process — from planning to agency selection to go-live.',
      readTime: '15 min read',
      updated: 'As of: February 2026',
      sections: [
        {
          title: 'Step 1: Define requirements',
          content: 'Before requesting quotes, clarify:',
          items: [
            'What goal does the website pursue? (Leads, sales, branding)',
            'Who is your target audience?',
            'What features are needed? (Shop, blog, booking)',
            'How many pages/content?',
            'In which languages?',
            'Budget range?',
          ],
          highlight: { type: 'tip', text: 'Tip: Create a short briefing document (1-2 pages) with your requirements. This saves time in agency discussions.' },
        },
        {
          title: 'Step 2: Find the right partner',
          content: 'Options for implementation:',
          items: [
            'Freelancer: For simple websites, budget-oriented',
            'Small agency (5-15 employees): Good value for money',
            'Large agency (15+ employees): Enterprise projects, full capacity',
            'Pay attention to: References in your industry, clear communication, realistic timing',
          ],
        },
        {
          title: 'Step 3: The briefing',
          content: 'A good briefing contains:',
          items: [
            'Company profile and target audience',
            'Website goals',
            'Functional requirements',
            'Design ideas (example sites)',
            'Content (existing or to be created?)',
            'Timeline and budget',
          ],
        },
        {
          title: 'Step 4: Compare offers',
          content: 'When comparing, consider:',
          items: [
            'What is all included in the price?',
            'How many revision rounds?',
            'Basic SEO optimization included?',
            'Training for operation?',
            'Support after go-live?',
            'Hosting costs?',
          ],
          highlight: { type: 'warning', text: 'Warning: Cheap can become expensive. A €2,000 botch often leads to €5,000+ follow-up costs for repairs.' },
        },
        {
          title: 'Step 5: Project management',
          content: 'This is how a typical web project runs:',
          items: [
            'Kick-off: Briefing coordination, schedule',
            'Concept: Wireframes, structure',
            'Design: Look & feel, approval',
            'Development: Technical implementation',
            'Content: Enter texts, images',
            'Testing: QA, browser tests',
            'Launch: Go-live, monitoring',
          ],
        },
      ],
      faqs: [
        { question: 'How long does a website take?', answer: 'Simple sites: 4-6 weeks. Medium projects: 2-3 months. Complex portals: 4-6+ months.' },
        { question: 'What do I need to contribute?', answer: 'Ideally: Texts, logos, images. Alternatively, we can offer content creation.' },
        { question: 'Can I make changes later?', answer: 'Yes, with a CMS you can adjust content yourself. For larger changes, we support you.' },
        { question: 'What happens after launch?', answer: 'We recommend a maintenance contract for updates, security and minor adjustments.' },
      ],
      cta: 'Discuss project now',
    },
    ru: {
      title: 'Заказать создание сайта: Полный гайд',
      subtitle: 'От идеи до успешного запуска',
      intro: 'Хотите заказать профессиональный сайт? Этот гайд проведет вас через весь процесс — от планирования через выбор агентства до запуска.',
      readTime: '15 мин чтения',
      updated: 'Актуально: Февраль 2026',
      sections: [
        {
          title: 'Шаг 1: Определите требования',
          content: 'Прежде чем запрашивать предложения, уточните:',
          items: [
            'Какую цель преследует сайт? (Лиды, продажи, брендинг)',
            'Кто ваша целевая аудитория?',
            'Какие функции нужны? (Магазин, блог, бронирование)',
            'Сколько страниц/контента?',
            'На каких языках?',
            'Бюджетные рамки?',
          ],
          highlight: { type: 'tip', text: 'Совет: Создайте короткий бриф (1-2 страницы) с вашими требованиями. Это экономит время при переговорах с агентством.' },
        },
        {
          title: 'Шаг 2: Найдите правильного партнера',
          content: 'Варианты реализации:',
          items: [
            'Фрилансер: Для простых сайтов, бюджетно',
            'Малое агентство (5-15 сотр.): Хорошее соотношение цена-качество',
            'Крупное агентство (15+ сотр.): Enterprise-проекты, полные мощности',
            'Обращайте внимание на: Референсы в вашей отрасли, четкую коммуникацию, реалистичные сроки',
          ],
        },
        {
          title: 'Шаг 3: Бриф',
          content: 'Хороший бриф содержит:',
          items: [
            'Профиль компании и целевая аудитория',
            'Цели сайта',
            'Функциональные требования',
            'Дизайн-идеи (примеры сайтов)',
            'Контент (есть или создавать?)',
            'Сроки и бюджет',
          ],
        },
        {
          title: 'Шаг 4: Сравните предложения',
          content: 'При сравнении учитывайте:',
          items: [
            'Что все включено в цену?',
            'Сколько раундов правок?',
            'Базовая SEO-оптимизация включена?',
            'Обучение по работе с сайтом?',
            'Поддержка после запуска?',
            'Стоимость хостинга?',
          ],
          highlight: { type: 'warning', text: 'Внимание: Дешево может стать дорого. Халтура за €2 000 часто приводит к €5 000+ расходов на исправления.' },
        },
        {
          title: 'Шаг 5: Управление проектом',
          content: 'Так проходит типичный веб-проект:',
          items: [
            'Kick-off: Согласование брифа, график',
            'Концепция: Wireframes, структура',
            'Дизайн: Look & feel, утверждение',
            'Разработка: Техническая реализация',
            'Контент: Добавление текстов, изображений',
            'Тестирование: QA, браузерные тесты',
            'Запуск: Go-live, мониторинг',
          ],
        },
      ],
      faqs: [
        { question: 'Сколько времени занимает создание сайта?', answer: 'Простые сайты: 4-6 недель. Средние проекты: 2-3 месяца. Сложные порталы: 4-6+ месяцев.' },
        { question: 'Что мне нужно предоставить?', answer: 'Идеально: Тексты, логотипы, изображения. Альтернативно мы можем предложить создание контента.' },
        { question: 'Могу ли я вносить изменения позже?', answer: 'Да, с CMS вы можете сами редактировать контент. Для крупных изменений мы вас поддержим.' },
        { question: 'Что происходит после запуска?', answer: 'Мы рекомендуем контракт на обслуживание для обновлений, безопасности и мелких корректировок.' },
      ],
      cta: 'Обсудить проект сейчас',
    },
  },
  'online-marketing-budget': {
    de: {
      title: 'Online Marketing Budget richtig planen',
      subtitle: 'Wie viel sollten Sie für digitales Marketing ausgeben?',
      intro: 'Die richtige Budget-Verteilung entscheidet über Erfolg oder Misserfolg Ihres Online-Marketings. Erfahren Sie, wie viel Unternehmen Ihrer Größe typischerweise investieren.',
      readTime: '8 Min. Lesezeit',
      updated: 'Stand: Februar 2026',
      sections: [
        {
          title: 'Marketing-Budget nach Unternehmensgröße',
          content: 'Typische monatliche Budgets in Österreich:',
          items: [
            'Kleinunternehmen (1-10 MA): €500 - €2.000/Monat',
            'Mittelstand (10-50 MA): €2.000 - €10.000/Monat',
            'Größere KMU (50-250 MA): €10.000 - €30.000/Monat',
            'Großunternehmen: €30.000 - €100.000+/Monat',
          ],
          highlight: { type: 'tip', text: 'Faustregel: 5-15% des Umsatzes für Marketing, davon 40-60% für Digital.' },
        },
        {
          title: 'Budget-Verteilung nach Kanal',
          content: 'Empfohlene Aufteilung für KMU:',
          items: [
            'SEO: 25-35% (nachhaltig, langfristig)',
            'Google Ads: 25-35% (schnelle Ergebnisse)',
            'Social Media: 15-25% (Branding + Ads)',
            'Content Marketing: 10-20% (Blog, Videos)',
            'E-Mail Marketing: 5-10% (Bestandskunden)',
          ],
        },
        {
          title: 'Branchen-Benchmarks',
          content: 'Typische Kosten pro Lead nach Branche:',
          items: [
            'E-Commerce: €5-30 pro Sale',
            'B2B Dienstleistung: €50-200 pro Lead',
            'Finanz/Versicherung: €100-500 pro Lead',
            'Gesundheit/Ärzte: €30-100 pro Termin',
            'Immobilien: €50-150 pro Anfrage',
            'Gastronomie: €2-10 pro Reservierung',
          ],
        },
        {
          title: 'Erfolgsmessung & ROI',
          content: 'Messen Sie diese KPIs:',
          items: [
            'Cost per Click (CPC)',
            'Cost per Lead (CPL)',
            'Cost per Acquisition (CPA)',
            'Return on Ad Spend (ROAS)',
            'Customer Lifetime Value (CLV)',
          ],
          highlight: { type: 'warning', text: 'Wichtig: Ohne Tracking kein ROI-Nachweis. Richten Sie Google Analytics und Conversion-Tracking ein.' },
        },
      ],
      priceTable: {
        title: 'Kanal-Budgets für KMU (€2.000-5.000/Monat)',
        rows: [
          { category: 'SEO-Betreuung', range: '€800 - €1.500', note: '~35% des Budgets' },
          { category: 'Google Ads', range: '€600 - €1.500', note: 'inkl. Management' },
          { category: 'Social Media', range: '€400 - €1.000', note: 'Ads + Content' },
          { category: 'Content/Blog', range: '€300 - €600', note: '2-4 Artikel/Monat' },
          { category: 'E-Mail Marketing', range: '€100 - €300', note: 'Newsletter-Tool + Kampagnen' },
          { category: 'Analytics/Tools', range: '€50 - €200', note: 'SEO-Tools, Reporting' },
        ],
      },
      faqs: [
        { question: 'Was ist ein guter ROAS?', answer: 'Branchenabhängig: E-Commerce 4-6x, B2B 3-5x, Dienstleistung 5-10x. Unter 3x sollten Sie optimieren.' },
        { question: 'Wann erhöhe ich das Budget?', answer: 'Wenn Ihr ROAS stimmt und Sie mehr Kapazität haben. Skalieren Sie sukzessive um 20-30%.' },
        { question: 'Soll ich alles auf einen Kanal setzen?', answer: 'Nein, Diversifikation reduziert Risiko. Aber starten Sie fokussiert und erweitern Sie dann.' },
        { question: 'Wie schnell sehe ich Ergebnisse?', answer: 'Paid Ads: Tage. SEO: Monate. Content: 3-6 Monate. Planen Sie einen Mix für kurz- und langfristigen Erfolg.' },
      ],
      cta: 'Marketing-Strategie besprechen',
    },
    en: {
      title: 'Planning online marketing budget correctly',
      subtitle: 'How much should you spend on digital marketing?',
      intro: 'The right budget allocation determines the success or failure of your online marketing. Learn how much companies of your size typically invest.',
      readTime: '8 min read',
      updated: 'As of: February 2026',
      sections: [
        {
          title: 'Marketing budget by company size',
          content: 'Typical monthly budgets in Austria:',
          items: [
            'Small business (1-10 employees): €500 - €2,000/month',
            'Medium-sized (10-50 employees): €2,000 - €10,000/month',
            'Larger SME (50-250 employees): €10,000 - €30,000/month',
            'Large enterprises: €30,000 - €100,000+/month',
          ],
          highlight: { type: 'tip', text: 'Rule of thumb: 5-15% of revenue for marketing, 40-60% of that for digital.' },
        },
        {
          title: 'Budget allocation by channel',
          content: 'Recommended split for SMEs:',
          items: [
            'SEO: 25-35% (sustainable, long-term)',
            'Google Ads: 25-35% (quick results)',
            'Social Media: 15-25% (branding + ads)',
            'Content Marketing: 10-20% (blog, videos)',
            'Email Marketing: 5-10% (existing customers)',
          ],
        },
        {
          title: 'Industry benchmarks',
          content: 'Typical cost per lead by industry:',
          items: [
            'E-commerce: €5-30 per sale',
            'B2B services: €50-200 per lead',
            'Finance/Insurance: €100-500 per lead',
            'Healthcare/Doctors: €30-100 per appointment',
            'Real estate: €50-150 per inquiry',
            'Restaurants: €2-10 per reservation',
          ],
        },
        {
          title: 'Success measurement & ROI',
          content: 'Measure these KPIs:',
          items: [
            'Cost per Click (CPC)',
            'Cost per Lead (CPL)',
            'Cost per Acquisition (CPA)',
            'Return on Ad Spend (ROAS)',
            'Customer Lifetime Value (CLV)',
          ],
          highlight: { type: 'warning', text: 'Important: Without tracking, no ROI proof. Set up Google Analytics and conversion tracking.' },
        },
      ],
      priceTable: {
        title: 'Channel budgets for SME (€2,000-5,000/month)',
        rows: [
          { category: 'SEO support', range: '€800 - €1,500', note: '~35% of budget' },
          { category: 'Google Ads', range: '€600 - €1,500', note: 'incl. management' },
          { category: 'Social Media', range: '€400 - €1,000', note: 'ads + content' },
          { category: 'Content/Blog', range: '€300 - €600', note: '2-4 articles/month' },
          { category: 'Email Marketing', range: '€100 - €300', note: 'newsletter tool + campaigns' },
          { category: 'Analytics/Tools', range: '€50 - €200', note: 'SEO tools, reporting' },
        ],
      },
      faqs: [
        { question: 'What is a good ROAS?', answer: 'Industry dependent: E-commerce 4-6x, B2B 3-5x, services 5-10x. Below 3x you should optimize.' },
        { question: 'When do I increase the budget?', answer: 'When your ROAS is right and you have more capacity. Scale successively by 20-30%.' },
        { question: 'Should I put everything on one channel?', answer: 'No, diversification reduces risk. But start focused and then expand.' },
        { question: 'How quickly do I see results?', answer: 'Paid ads: days. SEO: months. Content: 3-6 months. Plan a mix for short- and long-term success.' },
      ],
      cta: 'Discuss marketing strategy',
    },
    ru: {
      title: 'Правильное планирование бюджета на маркетинг',
      subtitle: 'Сколько тратить на цифровой маркетинг?',
      intro: 'Правильное распределение бюджета определяет успех или неудачу вашего онлайн-маркетинга. Узнайте, сколько обычно инвестируют компании вашего размера.',
      readTime: '8 мин чтения',
      updated: 'Актуально: Февраль 2026',
      sections: [
        {
          title: 'Маркетинговый бюджет по размеру компании',
          content: 'Типичные месячные бюджеты в Австрии:',
          items: [
            'Малый бизнес (1-10 сотр.): €500 - €2 000/месяц',
            'Средний бизнес (10-50 сотр.): €2 000 - €10 000/месяц',
            'Крупный СМБ (50-250 сотр.): €10 000 - €30 000/месяц',
            'Крупные предприятия: €30 000 - €100 000+/месяц',
          ],
          highlight: { type: 'tip', text: 'Правило: 5-15% от выручки на маркетинг, из них 40-60% на цифровой.' },
        },
        {
          title: 'Распределение бюджета по каналам',
          content: 'Рекомендуемое распределение для СМБ:',
          items: [
            'SEO: 25-35% (устойчиво, долгосрочно)',
            'Google Ads: 25-35% (быстрые результаты)',
            'Соцсети: 15-25% (брендинг + реклама)',
            'Контент-маркетинг: 10-20% (блог, видео)',
            'Email-маркетинг: 5-10% (существующие клиенты)',
          ],
        },
        {
          title: 'Отраслевые бенчмарки',
          content: 'Типичная стоимость лида по отраслям:',
          items: [
            'E-commerce: €5-30 за продажу',
            'B2B услуги: €50-200 за лид',
            'Финансы/Страхование: €100-500 за лид',
            'Здравоохранение/Врачи: €30-100 за запись',
            'Недвижимость: €50-150 за запрос',
            'Рестораны: €2-10 за бронь',
          ],
        },
        {
          title: 'Измерение успеха и ROI',
          content: 'Измеряйте эти KPI:',
          items: [
            'Cost per Click (CPC)',
            'Cost per Lead (CPL)',
            'Cost per Acquisition (CPA)',
            'Return on Ad Spend (ROAS)',
            'Customer Lifetime Value (CLV)',
          ],
          highlight: { type: 'warning', text: 'Важно: Без трекинга нет доказательства ROI. Настройте Google Analytics и отслеживание конверсий.' },
        },
      ],
      priceTable: {
        title: 'Бюджеты по каналам для СМБ (€2 000-5 000/месяц)',
        rows: [
          { category: 'SEO-сопровождение', range: '€800 - €1 500', note: '~35% бюджета' },
          { category: 'Google Ads', range: '€600 - €1 500', note: 'вкл. управление' },
          { category: 'Соцсети', range: '€400 - €1 000', note: 'реклама + контент' },
          { category: 'Контент/Блог', range: '€300 - €600', note: '2-4 статьи/месяц' },
          { category: 'Email-маркетинг', range: '€100 - €300', note: 'инструмент + кампании' },
          { category: 'Аналитика/Инструменты', range: '€50 - €200', note: 'SEO-инструменты, отчетность' },
        ],
      },
      faqs: [
        { question: 'Какой ROAS считается хорошим?', answer: 'Зависит от отрасли: E-commerce 4-6x, B2B 3-5x, услуги 5-10x. Меньше 3x — нужно оптимизировать.' },
        { question: 'Когда увеличивать бюджет?', answer: 'Когда ROAS в норме и есть мощности. Масштабируйте постепенно на 20-30%.' },
        { question: 'Ставить все на один канал?', answer: 'Нет, диверсификация снижает риск. Но начинайте сфокусировано и потом расширяйтесь.' },
        { question: 'Как быстро будут результаты?', answer: 'Платная реклама: дни. SEO: месяцы. Контент: 3-6 месяцев. Планируйте микс для краткосрочного и долгосрочного успеха.' },
      ],
      cta: 'Обсудить маркетинговую стратегию',
    },
  },
}

const validSlugs = Object.keys(guides)

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const guide = guides[slug]
  if (!guide) return { title: 'Not Found' }

  const loc = (locale as 'de' | 'en' | 'ru') || 'de'
  const content = guide[loc] || guide.de
  const hreflangAlternates = getHreflangAlternates(`/wissen/guides/${slug}`, locale)

  return {
    title: `${content.title} | GoldenWing`,
    description: content.intro,
    alternates: {
      canonical: getCanonicalUrl(`/wissen/guides/${slug}`, locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const guide = guides[slug]
  if (!guide) notFound()

  const loc = (locale as 'de' | 'en' | 'ru') || 'de'
  const content = guide[loc] || guide.de

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-muted/50 to-background">
        <Container>
          <div className="max-w-3xl mx-auto">
            <NextLink
              href="/wissen/guides"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {loc === 'de' ? 'Alle Guides' : loc === 'ru' ? 'Все гайды' : 'All Guides'}
            </NextLink>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {content.readTime}
              </Badge>
              <Badge variant="secondary">{content.updated}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {content.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {content.intro}
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            {content.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-muted-foreground mb-4">{section.content}</p>
                {section.items && (
                  <ul className="space-y-2 mb-4">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.highlight && (
                  <div className={`p-4 rounded-lg border ${section.highlight.type === 'tip' ? 'bg-primary/5 border-primary/20' : 'bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900'}`}>
                    <div className="flex items-start gap-3">
                      {section.highlight.type === 'tip' ? (
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                      )}
                      <span className={section.highlight.type === 'warning' ? 'text-orange-800 dark:text-orange-200' : ''}>
                        {section.highlight.text}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Price Table */}
            {content.priceTable && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Euro className="h-6 w-6 text-primary" />
                  {content.priceTable.title}
                </h2>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 font-medium">{loc === 'de' ? 'Kategorie' : loc === 'ru' ? 'Категория' : 'Category'}</th>
                        <th className="text-left p-3 font-medium">{loc === 'de' ? 'Preis' : loc === 'ru' ? 'Цена' : 'Price'}</th>
                        <th className="text-left p-3 font-medium hidden sm:table-cell">{loc === 'de' ? 'Hinweis' : loc === 'ru' ? 'Примечание' : 'Note'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.priceTable.rows.map((row, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-3">{row.category}</td>
                          <td className="p-3 font-medium text-primary">{row.range}</td>
                          <td className="p-3 text-muted-foreground text-sm hidden sm:table-cell">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-muted/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FAQSection
              title={loc === 'de' ? 'Häufige Fragen' : loc === 'ru' ? 'Частые вопросы' : 'Frequently Asked Questions'}
              items={content.faqs}
            />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Calculator className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.cta}</h2>
            <p className="mb-6 opacity-90">
              {loc === 'de' ? 'Wir erstellen Ihnen ein individuelles Angebot — kostenlos und unverbindlich.' : loc === 'ru' ? 'Мы создадим для вас индивидуальное предложение — бесплатно и без обязательств.' : 'We create an individual offer for you — free and non-binding.'}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <NextLink href="/kontakt">
                {loc === 'de' ? 'Jetzt Angebot anfordern' : loc === 'ru' ? 'Запросить предложение' : 'Request offer now'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
