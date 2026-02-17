'use client'

import NextLink from 'next/link'
import { useLocale } from 'next-intl'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getContactUrl, getServicesUrl, getAboutUrl, getProjectsUrl, getBlogUrl } from '@/lib/utils'

// Translations for 404 page
const translations = {
  de: {
    title: 'Seite nicht gefunden',
    description: 'Die gesuchte Seite existiert nicht oder wurde verschoben. Vielleicht finden Sie, was Sie suchen, auf unserer Startseite.',
    goHome: 'Zur Startseite',
    discoverServices: 'Leistungen entdecken',
    backToPrevious: 'Zurück zur vorherigen Seite',
    popularPages: 'Beliebte Seiten:',
    projects: 'Projekte',
    aboutUs: 'Über uns',
    contact: 'Kontakt',
  },
  en: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved. You may find what you are looking for on our homepage.',
    goHome: 'Go to Homepage',
    discoverServices: 'Discover Services',
    backToPrevious: 'Back to previous page',
    popularPages: 'Popular Pages:',
    projects: 'Projects',
    aboutUs: 'About Us',
    contact: 'Contact',
  },
  ru: {
    title: 'Страница не найдена',
    description: 'Запрашиваемая страница не существует или была перемещена. Возможно, вы найдёте нужную информацию на главной странице.',
    goHome: 'На главную',
    discoverServices: 'Смотреть услуги',
    backToPrevious: 'Вернуться назад',
    popularPages: 'Популярные страницы:',
    projects: 'Проекты',
    aboutUs: 'О нас',
    contact: 'Контакты',
  },
}

export default function NotFound() {
  const locale = useLocale() as 'de' | 'en' | 'ru'
  const t = translations[locale] || translations.de
  const homeUrl = locale === 'en' ? '/en' : locale === 'ru' ? '/ru' : '/'

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <div className="mb-8">
          <span className="text-[120px] md:text-[180px] font-bold leading-none text-muted-foreground/20">
            404
          </span>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          {t.title}
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {t.description}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <NextLink href={homeUrl}>
              <Home className="mr-2 h-4 w-4" />
              {t.goHome}
            </NextLink>
          </Button>
          <Button asChild variant="outline" size="lg">
            <NextLink href={getServicesUrl(locale)}>
              <Search className="mr-2 h-4 w-4" />
              {t.discoverServices}
            </NextLink>
          </Button>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            {t.backToPrevious}
          </button>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">{t.popularPages}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <NextLink href={getProjectsUrl(locale)} className="text-sm text-primary hover:underline">
              {t.projects}
            </NextLink>
            <span className="text-muted-foreground">•</span>
            <NextLink href={getBlogUrl(locale)} className="text-sm text-primary hover:underline">
              Blog
            </NextLink>
            <span className="text-muted-foreground">•</span>
            <NextLink href={getAboutUrl(locale)} className="text-sm text-primary hover:underline">
              {t.aboutUs}
            </NextLink>
            <span className="text-muted-foreground">•</span>
            <NextLink href={getContactUrl(locale)} className="text-sm text-primary hover:underline">
              {t.contact}
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  )
}
