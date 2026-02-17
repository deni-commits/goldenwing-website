import { Metadata } from 'next'
import NextLink from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n-navigation'
import { getHreflangAlternates, getCanonicalUrl } from '@/lib/utils'
import { FAQSchema, BreadcrumbListSchema, ServiceSchema } from '@/components/seo/json-ld'
import {
  ShoppingCart, CreditCard, Package, Globe, Truck, Shield,
  CheckCircle, ArrowRight, TrendingUp,
  Smartphone, Phone, MapPin, BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


// Page data for both languages
const pageData = {
  de: {
    title: 'E-Commerce Entwicklung Abu Dhabi | Online Shop Agentur UAE',
    description: 'Professionelle E-Commerce Entwicklung in Abu Dhabi. Shopify, WooCommerce und Custom Online Shops mit lokalen Zahlungsmethoden für den UAE-Markt.',
    h1: 'E-Commerce Entwicklung Abu Dhabi',
    subtitle: 'Erfolgreiche Online-Shops für den UAE-Markt entwickeln',
    intro: 'Als führende E-Commerce Agentur in Abu Dhabi entwickeln wir maßgeschneiderte Online-Shops, die den Anforderungen des arabischen Marktes gerecht werden. Von lokalen Zahlungsmethoden bis mehrsprachigen Interfaces – wir machen Ihr E-Commerce-Projekt erfolgreich.',

    services: [
      {
        icon: 'ShoppingCart',
        title: 'Online Shop Entwicklung',
        description: 'Maßgeschneiderte E-Commerce-Lösungen mit Shopify, WooCommerce oder Custom Development für den UAE-Markt.',
        features: ['Shopify Plus', 'WooCommerce', 'Magento', 'Custom Solutions']
      },
      {
        icon: 'CreditCard',
        title: 'UAE Payment Integration',
        description: 'Integration aller relevanten Zahlungsmethoden für den UAE-Markt inkl. Cash on Delivery.',
        features: ['Tabby (BNPL)', 'Apple Pay', 'Cash on Delivery', 'Bank Transfer']
      },
      {
        icon: 'Globe',
        title: 'Mehrsprachige Shops',
        description: 'Vollständig lokalisierte Shops in Arabisch und Englisch mit RTL-Unterstützung.',
        features: ['Arabisch (RTL)', 'Englisch', 'Automatische Übersetzung', 'Kulturelle Anpassung']
      },
      {
        icon: 'Truck',
        title: 'Logistik Integration',
        description: 'Nahtlose Integration mit UAE-Logistikpartnern für zuverlässige Lieferung.',
        features: ['Aramex', 'Fetchr', 'SMSA', 'Same-Day Delivery']
      }
    ],

    stats: [
      { value: '50+', label: 'E-Commerce Projekte' },
      { value: 'AED 100M+', label: 'Umsatz generiert' },
      { value: '99.9%', label: 'Uptime Garantie' },
      { value: '24/7', label: 'Support' }
    ],

    features: [
      {
        title: 'UAE-optimierte Checkout',
        description: 'Checkout-Prozess optimiert für arabische Kunden mit allen lokalen Zahlungs- und Lieferoptionen.',
        icon: 'ShoppingCart'
      },
      {
        title: 'Mobile-First Design',
        description: '85% der UAE-Käufer shoppen mobil. Unsere Shops sind für perfekte Mobile-Performance optimiert.',
        icon: 'Smartphone'
      },
      {
        title: 'Skalierbare Architektur',
        description: 'Von 100 bis 100.000 Bestellungen täglich – unsere Shops wachsen mit Ihrem Erfolg.',
        icon: 'TrendingUp'
      },
      {
        title: 'Sichere Transaktionen',
        description: 'PCI-DSS-konforme Zahlungsabwicklung und SSL-Verschlüsselung für maximale Sicherheit.',
        icon: 'Shield'
      }
    ],

    platforms: [
      { name: 'Shopify Plus', description: 'Enterprise E-Commerce für große Marken' },
      { name: 'WooCommerce', description: 'Flexibel und kosteneffizient' },
      { name: 'Magento', description: 'Für komplexe B2B-Anforderungen' },
      { name: 'Custom Solution', description: 'Maßgeschneidert für Ihre Bedürfnisse' }
    ],

    process: [
      {
        step: '01',
        title: 'Discovery & Strategie',
        description: 'Analyse Ihrer Anforderungen, Zielgruppe und des UAE-Marktes.'
      },
      {
        step: '02',
        title: 'Design & UX',
        description: 'Arabisch/Englisch UI/UX Design optimiert für Conversion.'
      },
      {
        step: '03',
        title: 'Entwicklung',
        description: 'Agile Entwicklung mit regelmäßigen Demos und Feedback.'
      },
      {
        step: '04',
        title: 'Launch & Support',
        description: 'Go-Live Begleitung und kontinuierlicher Support.'
      }
    ],

    packages: [
      {
        name: 'Starter Shop',
        price: 'ab AED 30.000',
        period: 'einmalig',
        features: [
          'Shopify/WooCommerce Setup',
          'Bis zu 100 Produkte',
          'UAE Payment Gateway',
          'Responsive Design',
          'Arabisch & Englisch',
          '3 Monate Support'
        ],
        popular: false
      },
      {
        name: 'Business Shop',
        price: 'ab AED 75.000',
        period: 'einmalig',
        features: [
          'Custom Shop Design',
          'Unbegrenzte Produkte',
          'Multi-Payment Integration',
          'Logistik-Integration',
          'SEO Optimierung',
          '6 Monate Support'
        ],
        popular: true
      },
      {
        name: 'Enterprise Shop',
        price: 'ab AED 150.000',
        period: 'einmalig',
        features: [
          'Custom Development',
          'B2B & B2C Features',
          'ERP Integration',
          'Multi-Store Setup',
          'Dediziertes Team',
          '12 Monate Support'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'Welche E-Commerce-Plattform ist die beste für den UAE-Markt?',
        answer: 'Die beste Plattform hängt von Ihren Anforderungen ab. Shopify ist ideal für schnellen Start und einfache Verwaltung. WooCommerce bietet maximale Flexibilität. Magento eignet sich für komplexe B2B-Anforderungen. Wir beraten Sie individuell.'
      },
      {
        question: 'Welche Zahlungsmethoden brauche ich für UAE E-Commerce?',
        answer: 'Für den UAE-Markt sind essenziell: Kreditkarten (Visa/Mastercard), Apple Pay, Tabby (Buy Now Pay Later) und Cash on Delivery (COD). COD macht in UAE bis zu 50% der Zahlungen aus. Wir integrieren alle relevanten Payment Gateways.'
      },
      {
        question: 'Wie lange dauert die Entwicklung eines Online-Shops?',
        answer: 'Ein Starter-Shop ist in 4-6 Wochen fertig. Business-Shops mit Custom Design benötigen 8-12 Wochen. Enterprise-Projekte mit komplexen Integrationen können 3-6 Monate dauern. Wir erstellen einen detaillierten Zeitplan nach dem Discovery-Workshop.'
      },
      {
        question: 'Unterstützt ihr arabische Shops mit RTL-Layout?',
        answer: 'Ja, alle unsere E-Commerce-Lösungen unterstützen vollständiges RTL (Right-to-Left) für Arabisch. Das umfasst nicht nur das Layout, sondern auch angepasste User Flows, arabische Produktbeschreibungen und kulturell angemessene Bildsprache.'
      },
      {
        question: 'Wie integriert ihr Logistik-Partner in UAE?',
        answer: 'Wir haben fertige Integrationen für alle großen UAE-Logistiker: Aramex, Fetchr, SMSA, Emirates Post und viele mehr. Die Integration ermöglicht automatische Versandberechnung, Echtzeit-Tracking und Same-Day-Delivery in Abu Dhabi.'
      }
    ],

    cta: {
      title: 'Kostenloses E-Commerce Beratungsgespräch',
      description: 'Lassen Sie uns über Ihr E-Commerce-Projekt sprechen. Unverbindliche Beratung für Ihren Online-Shop in Abu Dhabi.',
      button: 'Beratung anfordern',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/ecommerce-development-dubai', label: 'E-Commerce Dubai' },
      { href: '/abu-dhabi', label: 'Alle Abu Dhabi Services' },
      { href: '/leistungen/webdesign', label: 'Webdesign' },
      { href: '/abu-dhabi/web-design-abu-dhabi', label: 'Webdesign Abu Dhabi' }
    ]
  },

  en: {
    title: 'E-Commerce Development Abu Dhabi | Online Shop Agency UAE',
    description: 'Professional e-commerce development in Abu Dhabi. Shopify, WooCommerce and custom online shops with local payment methods for the UAE market.',
    h1: 'E-Commerce Development Abu Dhabi',
    subtitle: 'Build Successful Online Shops for the UAE Market',
    intro: 'As a leading e-commerce agency in Abu Dhabi, we develop custom online shops that meet the requirements of the Arab market. From local payment methods to multilingual interfaces – we make your e-commerce project successful.',

    services: [
      {
        icon: 'ShoppingCart',
        title: 'Online Shop Development',
        description: 'Custom e-commerce solutions with Shopify, WooCommerce or custom development for the UAE market.',
        features: ['Shopify Plus', 'WooCommerce', 'Magento', 'Custom Solutions']
      },
      {
        icon: 'CreditCard',
        title: 'UAE Payment Integration',
        description: 'Integration of all relevant payment methods for the UAE market including Cash on Delivery.',
        features: ['Tabby (BNPL)', 'Apple Pay', 'Cash on Delivery', 'Bank Transfer']
      },
      {
        icon: 'Globe',
        title: 'Multilingual Shops',
        description: 'Fully localized shops in Arabic and English with RTL support.',
        features: ['Arabic (RTL)', 'English', 'Auto Translation', 'Cultural Adaptation']
      },
      {
        icon: 'Truck',
        title: 'Logistics Integration',
        description: 'Seamless integration with UAE logistics partners for reliable delivery.',
        features: ['Aramex', 'Fetchr', 'SMSA', 'Same-Day Delivery']
      }
    ],

    stats: [
      { value: '50+', label: 'E-Commerce Projects' },
      { value: 'AED 100M+', label: 'Revenue Generated' },
      { value: '99.9%', label: 'Uptime Guarantee' },
      { value: '24/7', label: 'Support' }
    ],

    features: [
      {
        title: 'UAE-Optimized Checkout',
        description: 'Checkout process optimized for Arab customers with all local payment and delivery options.',
        icon: 'ShoppingCart'
      },
      {
        title: 'Mobile-First Design',
        description: '85% of UAE shoppers buy on mobile. Our shops are optimized for perfect mobile performance.',
        icon: 'Smartphone'
      },
      {
        title: 'Scalable Architecture',
        description: 'From 100 to 100,000 orders daily – our shops grow with your success.',
        icon: 'TrendingUp'
      },
      {
        title: 'Secure Transactions',
        description: 'PCI-DSS compliant payment processing and SSL encryption for maximum security.',
        icon: 'Shield'
      }
    ],

    platforms: [
      { name: 'Shopify Plus', description: 'Enterprise e-commerce for big brands' },
      { name: 'WooCommerce', description: 'Flexible and cost-effective' },
      { name: 'Magento', description: 'For complex B2B requirements' },
      { name: 'Custom Solution', description: 'Tailored to your needs' }
    ],

    process: [
      {
        step: '01',
        title: 'Discovery & Strategy',
        description: 'Analysis of your requirements, target audience and the UAE market.'
      },
      {
        step: '02',
        title: 'Design & UX',
        description: 'Arabic/English UI/UX design optimized for conversion.'
      },
      {
        step: '03',
        title: 'Development',
        description: 'Agile development with regular demos and feedback.'
      },
      {
        step: '04',
        title: 'Launch & Support',
        description: 'Go-live support and continuous maintenance.'
      }
    ],

    packages: [
      {
        name: 'Starter Shop',
        price: 'from AED 30,000',
        period: 'one-time',
        features: [
          'Shopify/WooCommerce Setup',
          'Up to 100 Products',
          'UAE Payment Gateway',
          'Responsive Design',
          'Arabic & English',
          '3 Months Support'
        ],
        popular: false
      },
      {
        name: 'Business Shop',
        price: 'from AED 75,000',
        period: 'one-time',
        features: [
          'Custom Shop Design',
          'Unlimited Products',
          'Multi-Payment Integration',
          'Logistics Integration',
          'SEO Optimization',
          '6 Months Support'
        ],
        popular: true
      },
      {
        name: 'Enterprise Shop',
        price: 'from AED 150,000',
        period: 'one-time',
        features: [
          'Custom Development',
          'B2B & B2C Features',
          'ERP Integration',
          'Multi-Store Setup',
          'Dedicated Team',
          '12 Months Support'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'Which e-commerce platform is best for the UAE market?',
        answer: 'The best platform depends on your requirements. Shopify is ideal for quick launch and easy management. WooCommerce offers maximum flexibility. Magento is suitable for complex B2B requirements. We advise you individually.'
      },
      {
        question: 'Which payment methods do I need for UAE e-commerce?',
        answer: 'Essential for the UAE market: Credit cards (Visa/Mastercard), Apple Pay, Tabby (Buy Now Pay Later) and Cash on Delivery (COD). COD accounts for up to 50% of payments in UAE. We integrate all relevant payment gateways.'
      },
      {
        question: 'How long does it take to develop an online shop?',
        answer: 'A starter shop is ready in 4-6 weeks. Business shops with custom design require 8-12 weeks. Enterprise projects with complex integrations can take 3-6 months. We create a detailed timeline after the discovery workshop.'
      },
      {
        question: 'Do you support Arabic shops with RTL layout?',
        answer: 'Yes, all our e-commerce solutions support full RTL (Right-to-Left) for Arabic. This includes not only the layout, but also adapted user flows, Arabic product descriptions and culturally appropriate imagery.'
      },
      {
        question: 'How do you integrate logistics partners in UAE?',
        answer: 'We have ready integrations for all major UAE logistics providers: Aramex, Fetchr, SMSA, Emirates Post and many more. Integration enables automatic shipping calculation, real-time tracking and same-day delivery in Abu Dhabi.'
      }
    ],

    cta: {
      title: 'Free E-Commerce Consultation',
      description: 'Let\'s talk about your e-commerce project. No-obligation consultation for your online shop in Abu Dhabi.',
      button: 'Request Consultation',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/ecommerce-development-dubai', label: 'E-Commerce Dubai' },
      { href: '/abu-dhabi', label: 'All Abu Dhabi Services' },
      { href: '/leistungen/webdesign', label: 'Web Design' },
      { href: '/abu-dhabi/web-design-abu-dhabi', label: 'Web Design Abu Dhabi' }
    ]
  },

  ru: {
    title: 'Разработка интернет-магазинов Абу-Даби | Агентство электронной коммерции ОАЭ',
    description: 'Профессиональная разработка интернет-магазинов в Абу-Даби. Shopify, WooCommerce и индивидуальные решения с локальными способами оплаты для рынка ОАЭ.',
    h1: 'Разработка интернет-магазинов Абу-Даби',
    subtitle: 'Создаём успешные интернет-магазины для рынка ОАЭ',
    intro: 'Как ведущее агентство электронной коммерции в Абу-Даби, мы разрабатываем индивидуальные интернет-магазины, отвечающие требованиям арабского рынка. От локальных способов оплаты до многоязычных интерфейсов — мы делаем ваш проект электронной коммерции успешным.',

    services: [
      {
        icon: 'ShoppingCart',
        title: 'Разработка интернет-магазина',
        description: 'Индивидуальные решения электронной коммерции на Shopify, WooCommerce или собственная разработка для рынка ОАЭ.',
        features: ['Shopify Plus', 'WooCommerce', 'Magento', 'Индивидуальные решения']
      },
      {
        icon: 'CreditCard',
        title: 'Интеграция платежей ОАЭ',
        description: 'Интеграция всех актуальных способов оплаты для рынка ОАЭ, включая оплату при доставке.',
        features: ['Tabby (BNPL)', 'Apple Pay', 'Оплата при доставке', 'Банковский перевод']
      },
      {
        icon: 'Globe',
        title: 'Многоязычные магазины',
        description: 'Полностью локализованные магазины на арабском и английском языках с поддержкой RTL.',
        features: ['Арабский (RTL)', 'Английский', 'Автоперевод', 'Культурная адаптация']
      },
      {
        icon: 'Truck',
        title: 'Интеграция логистики',
        description: 'Бесшовная интеграция с логистическими партнёрами ОАЭ для надёжной доставки.',
        features: ['Aramex', 'Fetchr', 'SMSA', 'Доставка в тот же день']
      }
    ],

    stats: [
      { value: '50+', label: 'Проектов электронной коммерции' },
      { value: 'AED 100M+', label: 'Сгенерированный доход' },
      { value: '99.9%', label: 'Гарантия доступности' },
      { value: '24/7', label: 'Поддержка' }
    ],

    features: [
      {
        title: 'Оптимизированное оформление заказа',
        description: 'Процесс оформления заказа, оптимизированный для арабских клиентов со всеми локальными способами оплаты и доставки.',
        icon: 'ShoppingCart'
      },
      {
        title: 'Mobile-First дизайн',
        description: '85% покупателей в ОАЭ совершают покупки с мобильных устройств. Наши магазины оптимизированы для идеальной мобильной производительности.',
        icon: 'Smartphone'
      },
      {
        title: 'Масштабируемая архитектура',
        description: 'От 100 до 100 000 заказов в день — наши магазины растут вместе с вашим успехом.',
        icon: 'TrendingUp'
      },
      {
        title: 'Безопасные транзакции',
        description: 'Обработка платежей в соответствии с PCI-DSS и SSL-шифрование для максимальной безопасности.',
        icon: 'Shield'
      }
    ],

    platforms: [
      { name: 'Shopify Plus', description: 'Корпоративная электронная коммерция для крупных брендов' },
      { name: 'WooCommerce', description: 'Гибкое и экономичное решение' },
      { name: 'Magento', description: 'Для сложных B2B-требований' },
      { name: 'Индивидуальное решение', description: 'Разработано под ваши потребности' }
    ],

    process: [
      {
        step: '01',
        title: 'Исследование и стратегия',
        description: 'Анализ ваших требований, целевой аудитории и рынка ОАЭ.'
      },
      {
        step: '02',
        title: 'Дизайн и UX',
        description: 'UI/UX дизайн на арабском и английском, оптимизированный для конверсии.'
      },
      {
        step: '03',
        title: 'Разработка',
        description: 'Гибкая разработка с регулярными демонстрациями и обратной связью.'
      },
      {
        step: '04',
        title: 'Запуск и поддержка',
        description: 'Сопровождение запуска и постоянная техническая поддержка.'
      }
    ],

    packages: [
      {
        name: 'Стартовый магазин',
        price: 'от AED 30 000',
        period: 'единоразово',
        features: [
          'Настройка Shopify/WooCommerce',
          'До 100 товаров',
          'Платёжный шлюз ОАЭ',
          'Адаптивный дизайн',
          'Арабский и английский',
          '3 месяца поддержки'
        ],
        popular: false
      },
      {
        name: 'Бизнес-магазин',
        price: 'от AED 75 000',
        period: 'единоразово',
        features: [
          'Индивидуальный дизайн',
          'Неограниченное количество товаров',
          'Мульти-платёжная интеграция',
          'Интеграция логистики',
          'SEO-оптимизация',
          '6 месяцев поддержки'
        ],
        popular: true
      },
      {
        name: 'Корпоративный магазин',
        price: 'от AED 150 000',
        period: 'единоразово',
        features: [
          'Индивидуальная разработка',
          'B2B и B2C функции',
          'Интеграция ERP',
          'Мультимагазинная настройка',
          'Выделенная команда',
          '12 месяцев поддержки'
        ],
        popular: false
      }
    ],

    faqs: [
      {
        question: 'Какая платформа электронной коммерции лучше всего подходит для рынка ОАЭ?',
        answer: 'Лучшая платформа зависит от ваших требований. Shopify идеально подходит для быстрого запуска и простого управления. WooCommerce предлагает максимальную гибкость. Magento подходит для сложных B2B-требований. Мы консультируем индивидуально.'
      },
      {
        question: 'Какие способы оплаты нужны для электронной коммерции в ОАЭ?',
        answer: 'Необходимые для рынка ОАЭ: Кредитные карты (Visa/Mastercard), Apple Pay, Tabby (Купи сейчас — плати потом) и оплата при доставке (COD). COD составляет до 50% платежей в ОАЭ. Мы интегрируем все актуальные платёжные шлюзы.'
      },
      {
        question: 'Сколько времени занимает разработка интернет-магазина?',
        answer: 'Стартовый магазин готов за 4-6 недель. Бизнес-магазины с индивидуальным дизайном требуют 8-12 недель. Корпоративные проекты со сложными интеграциями могут занять 3-6 месяцев. Мы составляем детальный план после воркшопа по исследованию.'
      },
      {
        question: 'Поддерживаете ли вы арабские магазины с RTL-версткой?',
        answer: 'Да, все наши решения электронной коммерции поддерживают полный RTL (справа налево) для арабского языка. Это включает не только вёрстку, но и адаптированные пользовательские потоки, арабские описания товаров и культурно соответствующие изображения.'
      },
      {
        question: 'Как вы интегрируете логистических партнёров в ОАЭ?',
        answer: 'У нас есть готовые интеграции для всех крупных логистических провайдеров ОАЭ: Aramex, Fetchr, SMSA, Emirates Post и многих других. Интеграция обеспечивает автоматический расчёт доставки, отслеживание в реальном времени и доставку в тот же день в Абу-Даби.'
      }
    ],

    cta: {
      title: 'Бесплатная консультация по электронной коммерции',
      description: 'Давайте обсудим ваш проект электронной коммерции. Бесплатная консультация для вашего интернет-магазина в Абу-Даби.',
      button: 'Запросить консультацию',
      phone: '+971 50 123 4567'
    },

    relatedLinks: [
      { href: '/dubai/ecommerce-development-dubai', label: 'Электронная коммерция Дубай' },
      { href: '/abu-dhabi', label: 'Все услуги Абу-Даби' },
      { href: '/leistungen/webdesign', label: 'Веб-дизайн' },
      { href: '/abu-dhabi/web-design-abu-dhabi', label: 'Веб-дизайн Абу-Даби' }
    ]
  }
}

const iconMap = {
  ShoppingCart,
  CreditCard,
  Globe,
  Truck,
  Smartphone,
  TrendingUp,
  Shield,
  Package
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const data = locale === 'ru' ? pageData.ru : locale === 'en' ? pageData.en : pageData.de
  const hreflangAlternates = getHreflangAlternates('/abu-dhabi/ecommerce-abu-dhabi', locale)

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: getCanonicalUrl('/abu-dhabi/ecommerce-abu-dhabi', locale),
      languages: hreflangAlternates.languages,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: getCanonicalUrl('/abu-dhabi/ecommerce-abu-dhabi', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: locale === 'ru' ? 'ru_RU' : locale === 'en' ? 'en_AE' : 'de_AT',
      type: 'website',
      images: [{ url: 'https://goldenwing.at/og-image.jpg', width: 1200, height: 630, alt: 'GoldenWing Creative Studios' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['https://goldenwing.at/og-image.jpg'],
    },
  }
}

export default async function EcommerceAbuDhabiPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const data = locale === 'ru' ? pageData.ru : locale === 'en' ? pageData.en : pageData.de

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale] || 'Startseite', url: '/' },
    { name: 'Abu Dhabi', url: '/abu-dhabi' },
    { name: { de: 'E-Commerce', en: 'E-Commerce', ru: 'Электронная коммерция' }[locale] || 'E-Commerce', url: '/abu-dhabi/ecommerce-abu-dhabi' },
  ]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'GoldenWing 360 - E-Commerce Development Abu Dhabi',
    description: data.description,
    url: 'https://goldenwing.at/abu-dhabi/ecommerce-abu-dhabi',
    telephone: '+971 50 123 4567',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abu Dhabi',
      addressCountry: 'AE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.4539,
      longitude: 54.3773
    },
    areaServed: [
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'Country', name: 'United Arab Emirates' }
    ],
    priceRange: 'AED 30,000 - AED 200,000+',
    serviceType: 'E-Commerce Development'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <BreadcrumbListSchema items={breadcrumbs} />
      <ServiceSchema
        name={{ de: 'E-Commerce Entwicklung Abu Dhabi', en: 'E-Commerce Development Abu Dhabi', ru: 'Разработка интернет-магазинов Абу-Даби' }[locale] || 'E-Commerce Entwicklung Abu Dhabi'}
        description={data.description}
        slug="abu-dhabi/ecommerce-abu-dhabi"
      />
      <FAQSchema items={data.faqs} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#1a1a1a] text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-gold mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Abu Dhabi, UAE</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {data.h1}
            </h1>
            <p className="text-xl md:text-2xl text-gold/80 mb-4">
              {data.subtitle}
            </p>
            <p className="text-lg text-gold/80 mb-8 max-w-2xl">
              {data.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-foreground hover:bg-muted">
                <Link href="/kontakt" className="flex items-center gap-2">
                  {data.cta.button}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="h-5 w-5 mr-2" />
                {data.cta.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'Unsere E-Commerce Leistungen', en: 'Our E-Commerce Services', ru: 'Наши услуги электронной коммерции' }[locale]}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ de: 'Komplette E-Commerce-Lösungen für den UAE-Markt', en: 'Complete e-commerce solutions for the UAE market', ru: 'Комплексные решения электронной коммерции для рынка ОАЭ' }[locale]}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data.services.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || ShoppingCart
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <Icon className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-foreground flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'UAE E-Commerce Features', en: 'UAE E-Commerce Features', ru: 'Возможности электронной коммерции ОАЭ' }[locale]}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ de: 'Essentielle Features für Erfolg im UAE-Markt', en: 'Essential features for success in the UAE market', ru: 'Ключевые функции для успеха на рынке ОАЭ' }[locale]}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.features.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap] || ShoppingCart
              return (
                <Card key={index} className="text-center p-6">
                  <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {{ de: 'E-Commerce Plattformen', en: 'E-Commerce Platforms We Work With', ru: 'Платформы электронной коммерции' }[locale]}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {{ de: 'Wir arbeiten mit den führenden E-Commerce-Plattformen und wählen die beste Lösung für Ihre spezifischen Anforderungen und Ihr Budget.', en: 'We work with the leading e-commerce platforms and choose the best solution for your specific needs and budget.', ru: 'Мы работаем с ведущими платформами электронной коммерции и выбираем лучшее решение для ваших конкретных потребностей и бюджета.' }[locale]}
              </p>
              <div className="space-y-4">
                {data.platforms.map((platform, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{platform.name}</h3>
                      <p className="text-sm text-gray-600">{platform.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-muted/50 to-muted/50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">
                {{ de: 'UAE Markt Statistiken', en: 'UAE Market Statistics', ru: 'Статистика рынка ОАЭ' }[locale]}
              </h3>
              <ul className="space-y-4">
                {[
                  { de: '85% der UAE-Konsumenten kaufen mobil ein', en: '85% of UAE consumers shop on mobile devices', ru: '85% потребителей ОАЭ совершают покупки с мобильных устройств' }[locale],
                  { de: 'E-Commerce Marktwachstum von 23% pro Jahr', en: 'E-commerce market growth of 23% per year', ru: 'Рост рынка электронной коммерции на 23% в год' }[locale],
                  { de: '50% der Zahlungen über Nachnahme', en: '50% of payments via Cash on Delivery', ru: '50% платежей — оплата при доставке' }[locale],
                  { de: 'Abu Dhabi unter Top 10 E-Commerce Märkten in MENA', en: 'Abu Dhabi among top 10 e-commerce markets in MENA', ru: 'Абу-Даби в топ-10 рынков электронной коммерции региона MENA' }[locale],
                  { de: 'Durchschnittlicher Bestellwert AED 350 in UAE', en: 'Average order value AED 350 in UAE', ru: 'Средняя стоимость заказа AED 350 в ОАЭ' }[locale]
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'Unser Entwicklungsprozess', en: 'Our Development Process', ru: 'Наш процесс разработки' }[locale]}
            </h2>
            <p className="text-xl text-gold/80 max-w-2xl mx-auto">
              {{ de: 'Eine bewährte Methodik für erfolgreiche E-Commerce-Projekte', en: 'A proven methodology for successful e-commerce projects', ru: 'Проверенная методология для успешных проектов электронной коммерции' }[locale]}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {data.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-gold mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gold/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {{ de: 'E-Commerce Pakete', en: 'E-Commerce Packages', ru: 'Пакеты электронной коммерции' }[locale]}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {{ de: 'Transparente Preise für Ihr Online-Shop Projekt', en: 'Transparent pricing for your online shop project', ru: 'Прозрачные цены для вашего проекта интернет-магазина' }[locale]}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative ${pkg.popular ? 'border-primary border-2 shadow-xl' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">
                      {{ de: 'Beliebt', en: 'Most Popular', ru: 'Популярный' }[locale]}
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-foreground">
                    {pkg.price}
                  </div>
                  <div className="text-gray-500">{pkg.period}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-foreground flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${pkg.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    <Link href="/kontakt">
                      {{ de: 'Angebot anfordern', en: 'Get Quote', ru: 'Запросить предложение' }[locale]}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8">
            {{ de: 'Alle Preise in AED, exkl. MwSt. Individuelle Pakete auf Anfrage.', en: 'All prices in AED, excluding VAT. Custom packages available on request.', ru: 'Все цены в AED, без НДС. Индивидуальные пакеты по запросу.' }[locale]}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {{ de: 'Häufige Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale]}
            </h2>
            <div className="space-y-6">
              {data.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.cta.title}</h2>
          <p className="text-xl text-gold/80 mb-8 max-w-2xl mx-auto">
            {data.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-foreground hover:bg-muted">
              <Link href="/kontakt" className="flex items-center gap-2">
                {data.cta.button}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Phone className="h-5 w-5 mr-2" />
              {data.cta.phone}
            </Button>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {{ de: 'Verwandte Leistungen', en: 'Related Services', ru: 'Связанные услуги' }[locale]}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.relatedLinks.map((link, index) => (
              <NextLink
                key={index}
                href={`/${locale}${link.href}`}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-primary hover:text-foreground transition-colors"
              >
                {link.label}
              </NextLink>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
