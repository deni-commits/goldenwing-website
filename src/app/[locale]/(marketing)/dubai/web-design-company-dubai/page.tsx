import { Metadata } from 'next'
import type { StaticAppPathname } from '@/i18n/routing'
import NextLink from 'next/link'
import { Link } from '@/lib/i18n-navigation'
import { getCanonicalUrl, getHreflangAlternates } from '@/lib/utils'
import { ArrowRight, CheckCircle, Star, Clock, Shield, Zap, Users, Award, Phone, Globe, MessageCircle, Code, Palette, Smartphone, ShoppingCart, Layers, Settings, Gauge, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { FAQSchema, BreadcrumbListSchema } from '@/components/seo/json-ld'
import { Container } from '@/components/ui/container'
import { ProcessLargeNumber } from '@/components/process-sections/ProcessLargeNumber'

export async function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }, { locale: 'ru' }]
}


export const revalidate = 3600

const pageData = {
  de: {
    meta: {
      title: 'Webdesign Agentur Dubai | Professionelles Website Design VAE | GoldenWing',
      description: 'Premium Webdesign-Agentur in Dubai. Europäische Qualität, arabische RTL-Websites, moderne Technologien. ✓ Next.js ✓ React ✓ E-Commerce. Ab AED 15.000.',
      keywords: ['webdesign dubai', 'website design dubai', 'web design company dubai', 'webdesign agentur dubai', 'website erstellen dubai'],
    },
    hero: {
      badge: 'Webdesign Company Dubai',
      title: 'Web Design Company Dubai',
      subtitle: 'Professional Website Design UAE',
      description: 'Premium Webdesign-Services für Dubai Unternehmen. Wir kombinieren europäische Designstandards mit lokalem Marktverständnis für Websites, die konvertieren.',
      ctaPrimary: 'Kostenloses Angebot anfordern',
      ctaSecondary: 'Portfolio ansehen',
    },
    intro: {
      title: 'Was macht gutes Webdesign in Dubai aus?',
      content: 'In Dubais wettbewerbsintensivem Markt benötigen Sie eine Website, die heraussticht. Bei GoldenWing verbinden wir europäische Designpräzision mit tiefem Verständnis für den UAE-Markt. Unsere Websites sind nicht nur schön – sie sind strategisch aufgebaut, um Besucher in Kunden zu verwandeln. Mit Sitz in Business Bay sind wir Ihr lokaler Partner für erstklassiges Webdesign.',
    },
    services: {
      title: 'Unsere Webdesign Services in Dubai',
      items: [
        { icon: Globe, title: 'Corporate Websites', description: 'Professionelle Unternehmenswebsites, die Vertrauen aufbauen und Ihre Marke präsentieren.' },
        { icon: ShoppingCart, title: 'E-Commerce Websites', description: 'Online-Shops mit Payment-Integration für den UAE-Markt (Tabby, Tamara, etc.).' },
        { icon: Layers, title: 'Landing Pages', description: 'Conversion-optimierte Landing Pages für Ihre Marketing-Kampagnen.' },
        { icon: Code, title: 'Web Applications', description: 'Maßgeschneiderte Web-Apps für komplexe Geschäftsanforderungen.' },
        { icon: Smartphone, title: 'Mobile-First Design', description: 'Websites, die auf allen Geräten perfekt funktionieren.' },
        { icon: Palette, title: 'UI/UX Design', description: 'Benutzerfreundliche Interfaces, die Ihre Kunden lieben werden.' },
        { icon: Settings, title: 'Website Redesign', description: 'Modernisierung bestehender Websites für bessere Performance.' },
        { icon: Globe, title: 'Mehrsprachige Websites', description: 'Englisch, Arabisch (RTL) und mehr – für Ihre internationale Zielgruppe.' },
      ],
    },
    techStack: {
      title: 'Unsere Technologien',
      description: 'Wir setzen auf moderne, zukunftssichere Technologien statt veralteter WordPress-Templates.',
      items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Headless CMS', 'Shopify', 'WordPress (Custom)', 'AWS / Cloudflare'],
    },
    process: {
      title: 'Unser Webdesign-Prozess',
      steps: [
        { step: '01', title: 'Discovery & Strategie', description: 'Wir verstehen Ihre Ziele, Zielgruppe und den UAE-Markt.' },
        { step: '02', title: 'Wireframing & UX', description: 'Strukturierung der Inhalte für optimale Benutzerführung.' },
        { step: '03', title: 'Visual Design', description: 'Kreatives Design, das Ihre Marke perfekt repräsentiert.' },
        { step: '04', title: 'Entwicklung', description: 'Professionelle Umsetzung mit modernen Technologien.' },
        { step: '05', title: 'Testing & QA', description: 'Gründliche Tests auf allen Geräten und Browsern.' },
        { step: '06', title: 'Launch', description: 'Go-Live mit Performance-Optimierung.' },
        { step: '07', title: 'Support & Wartung', description: 'Laufende Betreuung und Updates.' },
      ],
    },
    pricing: {
      title: 'Webdesign Preise Dubai',
      description: 'Transparente Preise. Keine versteckten Kosten. Alle Pakete inklusive Hosting-Setup.',
      packages: [
        { name: 'Starter', price: 'AED 15,000', description: 'Für kleine Unternehmen', popular: false, features: ['5 Seiten', 'Responsive Design', 'Basis SEO', 'Kontaktformular', 'SSL-Zertifikat', 'UAE Hosting'] },
        { name: 'Business', price: 'AED 35,000', description: 'Für wachsende Unternehmen', popular: true, features: ['10 Seiten', 'CMS zur Selbstbearbeitung', 'Erweiterte SEO', 'Zweisprachig (EN/AR)', 'RTL Support', 'Google Analytics', 'Social Media Integration', '6 Monate Support'] },
        { name: 'Enterprise', price: 'AED 75,000+', description: 'Maßgeschneiderte Lösungen', popular: false, features: ['Unbegrenzte Seiten', 'Custom Development', 'E-Commerce Integration', 'Multi-Language', 'API Integrationen', 'Performance Optimierung', 'Dediziertes Team', '12 Monate Support'] },
      ],
    },
    industries: {
      title: 'Branchen die wir bedienen',
      items: ['Immobilien Dubai', 'Hotels & Restaurants', 'E-Commerce', 'Finanzen & Fintech', 'Healthcare', 'Professional Services', 'Luxury Brands', 'Tech Startups'],
    },
    whyUs: {
      title: 'Warum GoldenWing für Webdesign in Dubai wählen?',
      items: [
        { icon: Award, title: 'Europäische Design-Standards', description: 'Deutsche Präzision und Qualität in jedem Projekt.' },
        { icon: Zap, title: 'Moderne Technologien', description: 'Next.js, React – nicht veraltete WordPress-Themes.' },
        { icon: Users, title: 'Full-Service Agentur', description: 'Design + Entwicklung + Marketing aus einer Hand.' },
        { icon: HeadphonesIcon, title: 'Lokaler Support', description: 'Persönlicher Ansprechpartner in Business Bay.' },
        { icon: Gauge, title: 'Performance-fokussiert', description: 'Core Web Vitals optimiert für beste Rankings.' },
        { icon: Shield, title: 'Post-Launch Support', description: 'Wartung und Updates nach dem Go-Live.' },
      ],
    },
    faqs: [
      { question: 'Was kostet Webdesign in Dubai?', answer: 'Webdesign in Dubai kostet typischerweise zwischen AED 15.000 für eine einfache Website bis AED 100.000+ für komplexe E-Commerce- oder Custom-Lösungen. Bei GoldenWing bieten wir transparente Preise ab AED 15.000 an.' },
      { question: 'Wie lange dauert es, eine Website in Dubai zu erstellen?', answer: 'Ein typisches Website-Projekt dauert 4-8 Wochen. Einfache Landing Pages können in 2 Wochen fertig sein, während komplexe E-Commerce-Websites 12+ Wochen benötigen können.' },
      { question: 'Bieten Sie Website-Wartung an?', answer: 'Ja, wir bieten laufende Wartungspakete ab AED 1.500/Monat an, inklusive Updates, Sicherheit, Backups und Support.' },
      { question: 'Können Sie meine bestehende Website redesignen?', answer: 'Absolut! Wir sind auf Website-Redesigns spezialisiert, die Performance, User Experience und Conversions verbessern.' },
      { question: 'Erstellen Sie arabische Websites?', answer: 'Ja, wir erstellen vollständig zweisprachige Websites mit korrektem RTL (Right-to-Left) Support für arabische Inhalte.' },
      { question: 'Welche Technologien verwenden Sie?', answer: 'Wir setzen auf moderne Technologien wie Next.js, React und Headless CMS für beste Performance. WordPress nur auf Wunsch mit Custom-Entwicklung.' },
    ],
    relatedServices: [
      { title: 'SEO Dubai', description: 'Suchmaschinenoptimierung für Google.ae', href: '/dubai/seo-company-dubai' as StaticAppPathname },
      { title: 'Branding Dubai', description: 'Markenentwicklung für den Golfmarkt', href: '/dubai/branding-agency-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'Online-Shops für den UAE-Markt', href: '/dubai/ecommerce-development-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Bereit für Ihre neue Website?',
      description: 'Lassen Sie uns über Ihr Webdesign-Projekt in Dubai sprechen.',
      button: 'Kostenloses Angebot anfordern',
    },
  },
  en: {
    meta: {
      title: 'Web Design Company Dubai | Professional Website Design UAE | GoldenWing',
      description: 'Premium web design company in Dubai. European quality, Arabic RTL websites, modern technologies. ✓ Next.js ✓ React ✓ E-Commerce. From AED 15,000.',
      keywords: ['web design company dubai', 'website design dubai', 'web design dubai', 'web design agency dubai', 'website development dubai'],
    },
    hero: {
      badge: 'Web Design Company Dubai',
      title: 'Web Design Company Dubai',
      subtitle: 'Professional Website Design UAE',
      description: 'Premium web design services for Dubai businesses. We combine European design standards with local market understanding for websites that convert.',
      ctaPrimary: 'Get Free Quote',
      ctaSecondary: 'View Portfolio',
    },
    intro: {
      title: "What makes great web design in Dubai?",
      content: "In Dubai's competitive market, you need a website that stands out. At GoldenWing, we combine European design precision with deep understanding of the UAE market. Our websites aren't just beautiful – they're strategically built to convert visitors into customers. Based in Business Bay, we're your local partner for world-class web design.",
    },
    services: {
      title: 'Our Web Design Services in Dubai',
      items: [
        { icon: Globe, title: 'Corporate Websites', description: 'Professional business websites that build trust and showcase your brand.' },
        { icon: ShoppingCart, title: 'E-Commerce Websites', description: 'Online stores with payment integration for the UAE market (Tabby, Tamara, etc.).' },
        { icon: Layers, title: 'Landing Pages', description: 'Conversion-optimized landing pages for your marketing campaigns.' },
        { icon: Code, title: 'Web Applications', description: 'Custom web apps for complex business requirements.' },
        { icon: Smartphone, title: 'Mobile-First Design', description: 'Websites that work perfectly on all devices.' },
        { icon: Palette, title: 'UI/UX Design', description: 'User-friendly interfaces your customers will love.' },
        { icon: Settings, title: 'Website Redesign', description: 'Modernizing existing websites for better performance.' },
        { icon: Globe, title: 'Multilingual Websites', description: 'English, Arabic (RTL) and more – for your international audience.' },
      ],
    },
    techStack: {
      title: 'Our Tech Stack',
      description: 'We use modern, future-proof technologies instead of outdated WordPress templates.',
      items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Headless CMS', 'Shopify', 'WordPress (Custom)', 'AWS / Cloudflare'],
    },
    process: {
      title: 'Our Web Design Process',
      steps: [
        { step: '01', title: 'Discovery & Strategy', description: 'We understand your goals, target audience, and the UAE market.' },
        { step: '02', title: 'Wireframing & UX', description: 'Structuring content for optimal user experience.' },
        { step: '03', title: 'Visual Design', description: 'Creative design that perfectly represents your brand.' },
        { step: '04', title: 'Development', description: 'Professional implementation with modern technologies.' },
        { step: '05', title: 'Testing & QA', description: 'Thorough testing on all devices and browsers.' },
        { step: '06', title: 'Launch', description: 'Go-live with performance optimization.' },
        { step: '07', title: 'Support & Maintenance', description: 'Ongoing support and updates.' },
      ],
    },
    pricing: {
      title: 'Web Design Pricing Dubai',
      description: 'Transparent pricing. No hidden costs. All packages include hosting setup.',
      packages: [
        { name: 'Starter', price: 'AED 15,000', description: 'For small businesses', popular: false, features: ['5 pages', 'Responsive design', 'Basic SEO', 'Contact form', 'SSL certificate', 'UAE hosting'] },
        { name: 'Business', price: 'AED 35,000', description: 'For growing businesses', popular: true, features: ['10 pages', 'CMS for self-editing', 'Advanced SEO', 'Bilingual (EN/AR)', 'RTL support', 'Google Analytics', 'Social media integration', '6 months support'] },
        { name: 'Enterprise', price: 'AED 75,000+', description: 'Custom solutions', popular: false, features: ['Unlimited pages', 'Custom development', 'E-commerce integration', 'Multi-language', 'API integrations', 'Performance optimization', 'Dedicated team', '12 months support'] },
      ],
    },
    industries: {
      title: 'Industries We Serve',
      items: ['Real Estate Dubai', 'Hotels & Restaurants', 'E-Commerce', 'Finance & Fintech', 'Healthcare', 'Professional Services', 'Luxury Brands', 'Tech Startups'],
    },
    whyUs: {
      title: 'Why Choose GoldenWing for Web Design in Dubai?',
      items: [
        { icon: Award, title: 'European Design Standards', description: 'German precision and quality in every project.' },
        { icon: Zap, title: 'Modern Technologies', description: 'Next.js, React – not outdated WordPress themes.' },
        { icon: Users, title: 'Full-Service Agency', description: 'Design + development + marketing from one source.' },
        { icon: HeadphonesIcon, title: 'Local Support', description: 'Personal contact in Business Bay.' },
        { icon: Gauge, title: 'Performance-Focused', description: 'Core Web Vitals optimized for best rankings.' },
        { icon: Shield, title: 'Post-Launch Support', description: 'Maintenance and updates after go-live.' },
      ],
    },
    faqs: [
      { question: 'How much does web design cost in Dubai?', answer: 'Web design in Dubai typically ranges from AED 15,000 for a basic website to AED 100,000+ for complex e-commerce or custom solutions. At GoldenWing, we offer transparent pricing starting at AED 15,000.' },
      { question: 'How long does it take to build a website in Dubai?', answer: 'A typical website project takes 4-8 weeks. Simple landing pages can be done in 2 weeks, while complex e-commerce sites may take 12+ weeks.' },
      { question: 'Do you provide website maintenance?', answer: 'Yes, we offer ongoing maintenance packages starting at AED 1,500/month, including updates, security, backups, and support.' },
      { question: 'Can you redesign my existing website?', answer: 'Absolutely! We specialize in website redesigns that improve performance, user experience, and conversions.' },
      { question: 'Do you build Arabic websites?', answer: 'Yes, we create fully bilingual websites with proper RTL (right-to-left) support for Arabic content.' },
      { question: 'What technologies do you use?', answer: 'We use modern technologies like Next.js, React, and Headless CMS for best performance. WordPress only on request with custom development.' },
    ],
    relatedServices: [
      { title: 'SEO Dubai', description: 'Search engine optimization for Google.ae', href: '/dubai/seo-company-dubai' as StaticAppPathname },
      { title: 'Branding Dubai', description: 'Brand development for the Gulf market', href: '/dubai/branding-agency-dubai' as StaticAppPathname },
      { title: 'E-Commerce Dubai', description: 'Online stores for the UAE market', href: '/dubai/ecommerce-development-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Ready for Your New Website?',
      description: "Let's discuss your web design project in Dubai.",
      button: 'Get Free Quote',
    },
  },
  ru: {
    meta: {
      title: 'Веб-дизайн компания Дубай | Профессиональная разработка сайтов ОАЭ | GoldenWing',
      description: 'Премиум веб-дизайн агентство в Дубае. Европейское качество, арабские RTL-сайты, современные технологии. ✓ Next.js ✓ React ✓ E-Commerce. От AED 15,000.',
      keywords: ['веб-дизайн дубай', 'разработка сайтов дубай', 'web design company dubai', 'веб-агентство дубай', 'создание сайтов дубай'],
    },
    hero: {
      badge: 'Веб-дизайн компания Дубай',
      title: 'Web Design Company Dubai',
      subtitle: 'Профессиональный веб-дизайн ОАЭ',
      description: 'Премиум услуги веб-дизайна для бизнеса в Дубае. Мы сочетаем европейские стандарты дизайна с пониманием местного рынка для создания сайтов, которые конвертируют.',
      ctaPrimary: 'Получить бесплатную консультацию',
      ctaSecondary: 'Смотреть портфолио',
    },
    intro: {
      title: 'Что делает веб-дизайн в Дубае успешным?',
      content: 'На конкурентном рынке Дубая вам нужен сайт, который выделяется. В GoldenWing мы сочетаем европейскую точность дизайна с глубоким пониманием рынка ОАЭ. Наши сайты не просто красивы – они стратегически построены для превращения посетителей в клиентов. Расположенные в Business Bay, мы являемся вашим локальным партнером для веб-дизайна мирового класса.',
    },
    services: {
      title: 'Наши услуги веб-дизайна в Дубае',
      items: [
        { icon: Globe, title: 'Корпоративные сайты', description: 'Профессиональные бизнес-сайты, которые укрепляют доверие и демонстрируют ваш бренд.' },
        { icon: ShoppingCart, title: 'Интернет-магазины', description: 'Онлайн-магазины с интеграцией платежей для рынка ОАЭ (Tabby, Tamara и др.).' },
        { icon: Layers, title: 'Лендинги', description: 'Оптимизированные для конверсии посадочные страницы для ваших маркетинговых кампаний.' },
        { icon: Code, title: 'Веб-приложения', description: 'Индивидуальные веб-приложения для сложных бизнес-требований.' },
        { icon: Smartphone, title: 'Mobile-First дизайн', description: 'Сайты, которые идеально работают на всех устройствах.' },
        { icon: Palette, title: 'UI/UX дизайн', description: 'Удобные интерфейсы, которые полюбят ваши клиенты.' },
        { icon: Settings, title: 'Редизайн сайта', description: 'Модернизация существующих сайтов для лучшей производительности.' },
        { icon: Globe, title: 'Многоязычные сайты', description: 'Английский, арабский (RTL) и другие языки – для вашей международной аудитории.' },
      ],
    },
    techStack: {
      title: 'Наши технологии',
      description: 'Мы используем современные, перспективные технологии вместо устаревших WordPress-шаблонов.',
      items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Headless CMS', 'Shopify', 'WordPress (Custom)', 'AWS / Cloudflare'],
    },
    process: {
      title: 'Наш процесс веб-дизайна',
      steps: [
        { step: '01', title: 'Анализ и стратегия', description: 'Мы изучаем ваши цели, целевую аудиторию и рынок ОАЭ.' },
        { step: '02', title: 'Прототипирование и UX', description: 'Структурирование контента для оптимального пользовательского опыта.' },
        { step: '03', title: 'Визуальный дизайн', description: 'Креативный дизайн, который идеально представляет ваш бренд.' },
        { step: '04', title: 'Разработка', description: 'Профессиональная реализация с современными технологиями.' },
        { step: '05', title: 'Тестирование и QA', description: 'Тщательное тестирование на всех устройствах и браузерах.' },
        { step: '06', title: 'Запуск', description: 'Запуск с оптимизацией производительности.' },
        { step: '07', title: 'Поддержка и обслуживание', description: 'Постоянная поддержка и обновления.' },
      ],
    },
    pricing: {
      title: 'Цены на веб-дизайн в Дубае',
      description: 'Прозрачные цены. Никаких скрытых платежей. Все пакеты включают настройку хостинга.',
      packages: [
        { name: 'Starter', price: 'AED 15,000', description: 'Для малого бизнеса', popular: false, features: ['5 страниц', 'Адаптивный дизайн', 'Базовое SEO', 'Контактная форма', 'SSL-сертификат', 'Хостинг ОАЭ'] },
        { name: 'Business', price: 'AED 35,000', description: 'Для растущего бизнеса', popular: true, features: ['10 страниц', 'CMS для самостоятельного редактирования', 'Расширенное SEO', 'Двуязычный (EN/AR)', 'Поддержка RTL', 'Google Analytics', 'Интеграция соцсетей', '6 месяцев поддержки'] },
        { name: 'Enterprise', price: 'AED 75,000+', description: 'Индивидуальные решения', popular: false, features: ['Неограниченно страниц', 'Индивидуальная разработка', 'Интеграция e-commerce', 'Мультиязычность', 'API интеграции', 'Оптимизация производительности', 'Выделенная команда', '12 месяцев поддержки'] },
      ],
    },
    industries: {
      title: 'Отрасли, которые мы обслуживаем',
      items: ['Недвижимость Дубай', 'Отели и рестораны', 'E-Commerce', 'Финансы и Fintech', 'Здравоохранение', 'Профессиональные услуги', 'Люксовые бренды', 'Tech-стартапы'],
    },
    whyUs: {
      title: 'Почему выбирают GoldenWing для веб-дизайна в Дубае?',
      items: [
        { icon: Award, title: 'Европейские стандарты дизайна', description: 'Немецкая точность и качество в каждом проекте.' },
        { icon: Zap, title: 'Современные технологии', description: 'Next.js, React – а не устаревшие WordPress-темы.' },
        { icon: Users, title: 'Полный цикл услуг', description: 'Дизайн + разработка + маркетинг от одной команды.' },
        { icon: HeadphonesIcon, title: 'Локальная поддержка', description: 'Личный контакт в Business Bay.' },
        { icon: Gauge, title: 'Фокус на производительности', description: 'Оптимизация Core Web Vitals для лучших позиций.' },
        { icon: Shield, title: 'Поддержка после запуска', description: 'Обслуживание и обновления после запуска.' },
      ],
    },
    faqs: [
      { question: 'Сколько стоит веб-дизайн в Дубае?', answer: 'Веб-дизайн в Дубае обычно стоит от AED 15,000 за базовый сайт до AED 100,000+ за сложные e-commerce или индивидуальные решения. В GoldenWing мы предлагаем прозрачные цены от AED 15,000.' },
      { question: 'Сколько времени занимает создание сайта в Дубае?', answer: 'Типичный проект веб-сайта занимает 4-8 недель. Простые лендинги могут быть готовы за 2 недели, в то время как сложные e-commerce сайты могут потребовать 12+ недель.' },
      { question: 'Вы предоставляете обслуживание сайтов?', answer: 'Да, мы предлагаем пакеты постоянного обслуживания от AED 1,500/месяц, включая обновления, безопасность, резервное копирование и поддержку.' },
      { question: 'Можете ли вы сделать редизайн моего существующего сайта?', answer: 'Конечно! Мы специализируемся на редизайне сайтов, который улучшает производительность, пользовательский опыт и конверсии.' },
      { question: 'Вы создаёте арабские сайты?', answer: 'Да, мы создаём полностью двуязычные сайты с правильной поддержкой RTL (справа налево) для арабского контента.' },
      { question: 'Какие технологии вы используете?', answer: 'Мы используем современные технологии: Next.js, React и Headless CMS для лучшей производительности. WordPress только по запросу с индивидуальной разработкой.' },
    ],
    relatedServices: [
      { title: 'SEO Дубай', description: 'Поисковая оптимизация для Google.ae', href: '/dubai/seo-company-dubai' as StaticAppPathname },
      { title: 'Брендинг Дубай', description: 'Развитие бренда для рынка Персидского залива', href: '/dubai/branding-agency-dubai' as StaticAppPathname },
      { title: 'E-Commerce Дубай', description: 'Интернет-магазины для рынка ОАЭ', href: '/dubai/ecommerce-development-dubai' as StaticAppPathname },
    ],
    cta: {
      title: 'Готовы к новому сайту?',
      description: 'Давайте обсудим ваш проект веб-дизайна в Дубае.',
      button: 'Получить бесплатную консультацию',
    },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']
  const hreflangAlternates = getHreflangAlternates('/dubai/web-design-company-dubai', locale)

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    openGraph: {
      title: data.hero.title,
      description: data.meta.description,
      url: getCanonicalUrl('/dubai/web-design-company-dubai', locale),
      siteName: 'GoldenWing Creative Studios',
      locale: { de: 'de_AT', en: 'en_AE', ru: 'ru_RU' }[locale],
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl('/dubai/web-design-company-dubai', locale),
      languages: hreflangAlternates.languages,
    },
  }
}

export default async function WebDesignCompanyDubaiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam || 'de') as 'de' | 'en' | 'ru'
  const data = pageData[locale as 'de' | 'en' | 'ru'] ?? pageData['en']

  const breadcrumbs = [
    { name: { de: 'Startseite', en: 'Home', ru: 'Главная' }[locale], url: '/' },
    { name: 'Dubai', url: '/dubai' },
    { name: { de: 'Webdesign Agentur Dubai', en: 'Web Design Company Dubai', ru: 'Веб-дизайн компания Дубай' }[locale], url: '/dubai/web-design-company-dubai' },
  ]

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: { de: 'Webdesign Services Dubai', en: 'Web Design Services Dubai', ru: 'Услуги веб-дизайна Дубай' }[locale],
    serviceType: 'Web Design',
    url: 'https://goldenwing.at/en/dubai/web-design-company-dubai',
    provider: {
      '@type': 'LocalBusiness',
      name: 'GoldenWing Creative Studios Dubai',
      url: 'https://goldenwing.at',
      telephone: '+971-58-514-4360',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'DAMAC Executive Bay Tower B, Office 1406, 14th Floor',
        addressLocality: 'Dubai',
        addressRegion: 'Business Bay',
        addressCountry: 'AE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.1783747,
        longitude: 55.2615882,
      },
    },
    areaServed: { '@type': 'City', name: 'Dubai' },
    description: data.meta.description,
    offers: data.pricing.packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price.replace('AED ', '').replace(',', '').replace('+', ''),
      priceCurrency: 'AED',
      description: pkg.description,
    })),
  }

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <FAQSchema items={data.faqs} />
      <BreadcrumbListSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <Container variant="block">
          <div className="max-w-4xl">
            <Badge className="mb-4">{data.hero.badge}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {data.hero.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-primary mb-4">
              {data.hero.subtitle}
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              {data.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/kontakt">
                  {data.hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/referenzen">
                  {data.hero.ctaSecondary}
                </Link>
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="mt-12 flex flex-wrap gap-6 items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Google Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span>Clutch Top Agency</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>10+ {{ de: 'Jahre', en: 'Years', ru: 'лет' }[locale]}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-16 border-b">
        <Container variant="block">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{data.intro.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {data.intro.content}
            </p>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data?.services?.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.services?.items.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{data.techStack.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{data.techStack.description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {data.techStack.items.map((tech) => (
              <span key={tech} className="px-6 py-3 bg-muted rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Process - ProcessLargeNumber Layout */}
      <ProcessLargeNumber
        title={data.process.title}
        subtitle={{ de: 'Unsere bewährte Methodik für außergewöhnliche Websites.', en: 'Our proven methodology for delivering exceptional websites.', ru: 'Наша проверенная методология для создания исключительных сайтов.' }[locale]}
        steps={data.process.steps.map(item => ({ num: item.step, title: item.title, description: item.description }))}
      />

      {/* Pricing */}
      <section id="preise" className="py-20 scroll-mt-20">
        <Container variant="block">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{data.pricing.title}</h2>
            <p className="text-muted-foreground">{data.pricing.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.pricing.packages.map((pkg) => (
              <Card key={pkg.name} className={pkg.popular ? 'border-primary shadow-lg relative' : ''}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{{ de: 'Am beliebtesten', en: 'Most Popular', ru: 'Самый популярный' }[locale]}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                    {!pkg.price.includes('+') && <span className="text-muted-foreground text-sm"> {{ de: 'einmalig', en: 'one-time', ru: 'единоразово' }[locale]}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={pkg.popular ? 'default' : 'outline'} asChild>
                    <Link href="/kontakt">{{ de: 'Angebot anfordern', en: 'Get Quote', ru: 'Получить предложение' }[locale]}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.industries.title}</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {data.industries.items.map((industry) => (
              <span key={industry} className="px-5 py-2 bg-background border rounded-full text-sm">
                {industry}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Us */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">{data.whyUs.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.whyUs.items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {{ de: 'Häufig gestellte Fragen', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' }[locale]}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {data.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* Related Services */}
      <section className="py-20">
        <Container variant="block">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {{ de: 'Weitere Services in Dubai', en: 'Related Services in Dubai', ru: 'Дополнительные услуги в Дубае' }[locale]}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {data.relatedServices.map((service) => (
              <Card key={service.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <Link href={service.href as '/dubai/seo-company-dubai'} className="text-primary text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {{ de: 'Mehr erfahren', en: 'Learn more', ru: 'Подробнее' }[locale]} <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container variant="block" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {data.cta.title}
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {data.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/kontakt">
                {data.cta.button}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <NextLink href="https://wa.me/message/DTMCVZBIQJ3FH1" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </NextLink>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <NextLink href="tel:+436645439681">
                <Phone className="mr-2 h-4 w-4" />
                +43 664 543 96 81
              </NextLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* Internal Links */}
      <section className="py-12 border-t">
        <Container variant="block">
          <h3 className="font-semibold mb-6">{{ de: 'Weitere Dubai Services', en: 'More Dubai Services', ru: 'Другие услуги в Дубае' }[locale]}</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/dubai" className="text-muted-foreground hover:text-primary">
              {{ de: 'Dubai Übersicht', en: 'Dubai Hub', ru: 'Дубай обзор' }[locale]}
            </Link>
            <Link href="/dubai/seo-company-dubai" className="text-muted-foreground hover:text-primary">
              {{ de: 'SEO Agentur Dubai', en: 'SEO Company Dubai', ru: 'SEO компания Дубай' }[locale]}
            </Link>
            <Link href="/dubai/branding-agency-dubai" className="text-muted-foreground hover:text-primary">
              {{ de: 'Branding Agentur Dubai', en: 'Branding Agency Dubai', ru: 'Брендинг агентство Дубай' }[locale]}
            </Link>
            <Link href="/dubai/ecommerce-development-dubai" className="text-muted-foreground hover:text-primary">
              {{ de: 'E-Commerce Entwicklung Dubai', en: 'E-commerce Development Dubai', ru: 'Разработка E-commerce Дубай' }[locale]}
            </Link>
            <Link href="/dubai/digital-marketing-agency-dubai" className="text-muted-foreground hover:text-primary">
              {{ de: 'Digital Marketing Agentur Dubai', en: 'Digital Marketing Agency Dubai', ru: 'Агентство цифрового маркетинга Дубай' }[locale]}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
