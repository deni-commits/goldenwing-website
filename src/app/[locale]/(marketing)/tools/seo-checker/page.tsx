'use client'

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Search, FileText, Hash, Image as ImageIcon, Code, Globe, Link2 } from 'lucide-react'
import { ToolHero, ToolHeroCompact } from '@/components/tools/shared/tool-hero'
import { UrlInput } from '@/components/tools/shared/url-input'
import { AnalyzingState, ResultSkeleton } from '@/components/tools/shared/result-skeleton'
import { LeadCaptureModal, type LeadData } from '@/components/tools/shared/lead-capture-modal'
import { IssueList } from '@/components/tools/shared/issue-list'
import { ServiceRecommendations } from '@/components/tools/shared/service-recommendations'
import { ShareButton } from '@/components/tools/shared/share-button'
import { SeoResult } from '@/components/tools/seo/seo-result'
import { Button } from '@/components/ui/button'
import { ToolFaq } from '@/components/tools/shared/tool-faq'

type AnalysisState = 'idle' | 'analyzing' | 'complete' | 'error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnalysisResultData = any

interface SeoAnalysisResult {
  url: string
  score: number
  result: AnalysisResultData
  issues: AnalysisResultData[]
  criticalIssues: number
  warningIssues: number
  passedChecks: number
}

const translations = {
  de: {
    badge: 'Kostenloser SEO Check',
    title: 'SEO Checker',
    description: 'Analysieren Sie die SEO-Faktoren Ihrer Website: Meta-Tags, Überschriften, Bilder, Schema Markup und mehr. Sofortige Ergebnisse ohne Registrierung.',
    steps: [
      'Website wird geladen...',
      'Meta-Tags werden geprüft...',
      'Überschriften analysieren...',
      'Bilder prüfen...',
      'Schema Markup analysieren...',
      'Sitemap & Robots.txt prüfen...',
      'Ergebnisse aufbereiten...',
    ],
    analyzing: 'Analysiere SEO-Faktoren...',
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    errorUnreachable: 'Die Website konnte nicht erreicht werden. Bitte prüfen Sie die URL.',
    tryAgain: 'Erneut versuchen',
    unlockReport: 'Vollständigen Report freischalten',
    lockedMessage: 'Geben Sie Ihre E-Mail ein, um alle Details und Lösungsvorschläge zu sehen',
    issues: 'Gefundene Probleme',
    startNew: 'Neue Analyse',
    longAnalysis: 'Die Analyse kann bis zu 30 Sekunden dauern...',
    seoScore: 'SEO Score',
    placeholder: 'https://ihre-website.at',
    buttonText: 'SEO prüfen',
    features: {
      metaTags: 'Meta-Tags',
      metaTagsDesc: 'Title, Description, Keywords',
      headings: 'Überschriften',
      headingsDesc: 'H1-H6 Struktur und Hierarchie',
      images: 'Bilder',
      imagesDesc: 'Alt-Texte und Optimierung',
      schema: 'Schema Markup',
      schemaDesc: 'JSON-LD strukturierte Daten',
      technical: 'Technisch',
      technicalDesc: 'Canonical, Sitemap, Robots.txt',
      social: 'Social Media',
      socialDesc: 'Open Graph & Twitter Cards',
    },
    faq: [
      {
        question: 'Was ist ein SEO Check?',
        answer: 'Ein SEO Check analysiert die wichtigsten SEO-Faktoren Ihrer Website, wie Meta-Tags, Überschriften-Struktur, Bilder-Optimierung und technische SEO-Elemente. Das Tool identifiziert Probleme, die Ihre Suchmaschinen-Rankings negativ beeinflussen könnten.',
      },
      {
        question: 'Welche SEO-Faktoren werden geprüft?',
        answer: 'Unser SEO Checker prüft: Meta Title & Description, H1-H6 Überschriften-Struktur, Alt-Texte bei Bildern, Schema Markup (JSON-LD), Canonical URLs, Sitemap.xml, Robots.txt, Open Graph Tags für Social Media, Interne Verlinkung, Keyword-Dichte und Lesbarkeit.',
      },
      {
        question: 'Wie wird der SEO Score berechnet?',
        answer: 'Der SEO Score basiert auf einer gewichteten Bewertung aller geprüften Faktoren. Kritische Fehler wie fehlende Meta-Tags oder H1-Überschriften haben mehr Gewicht als kleinere Optimierungsmöglichkeiten. Ein Score von 80+ bedeutet, dass Ihre Seite gut optimiert ist.',
      },
      {
        question: 'Was bedeuten die verschiedenen Farben?',
        answer: 'Grün (90-100): Ausgezeichnet - keine Maßnahmen erforderlich. Gelb (70-89): Gut, aber Optimierungspotenzial vorhanden. Orange (50-69): Verbesserungsbedarf - wichtige SEO-Faktoren sollten optimiert werden. Rot (0-49): Kritisch - dringende Maßnahmen erforderlich.',
      },
      {
        question: 'Wie oft sollte ich einen SEO Check durchführen?',
        answer: 'Wir empfehlen, nach jeder größeren Änderung an Ihrer Website einen SEO Check durchzuführen. Zusätzlich sollten Sie regelmäßig (monatlich) prüfen, ob alle SEO-Faktoren noch optimal sind, besonders wenn Sie neue Inhalte veröffentlichen.',
      },
    ],
  },
  en: {
    badge: 'Free SEO Check',
    title: 'SEO Checker',
    description: 'Analyze your website\'s SEO factors: meta tags, headings, images, schema markup and more. Instant results without registration.',
    steps: [
      'Loading website...',
      'Checking meta tags...',
      'Analyzing headings...',
      'Checking images...',
      'Analyzing schema markup...',
      'Checking sitemap & robots.txt...',
      'Preparing results...',
    ],
    analyzing: 'Analyzing SEO factors...',
    errorGeneric: 'An error occurred. Please try again.',
    errorUnreachable: 'Could not reach the website. Please check the URL.',
    tryAgain: 'Try Again',
    unlockReport: 'Unlock Full Report',
    lockedMessage: 'Enter your email to see all details and solutions',
    issues: 'Found Issues',
    startNew: 'New Analysis',
    longAnalysis: 'Analysis can take up to 30 seconds...',
    seoScore: 'SEO Score',
    placeholder: 'https://your-website.com',
    buttonText: 'Check SEO',
    features: {
      metaTags: 'Meta Tags',
      metaTagsDesc: 'Title, Description, Keywords',
      headings: 'Headings',
      headingsDesc: 'H1-H6 structure and hierarchy',
      images: 'Images',
      imagesDesc: 'Alt texts and optimization',
      schema: 'Schema Markup',
      schemaDesc: 'JSON-LD structured data',
      technical: 'Technical',
      technicalDesc: 'Canonical, Sitemap, Robots.txt',
      social: 'Social Media',
      socialDesc: 'Open Graph & Twitter Cards',
    },
    faq: [
      {
        question: 'What is an SEO check?',
        answer: 'An SEO check analyzes the most important SEO factors of your website, such as meta tags, heading structure, image optimization, and technical SEO elements. The tool identifies issues that could negatively affect your search engine rankings.',
      },
      {
        question: 'Which SEO factors are checked?',
        answer: 'Our SEO Checker analyzes: Meta Title & Description, H1-H6 heading structure, image alt texts, Schema Markup (JSON-LD), Canonical URLs, Sitemap.xml, Robots.txt, Open Graph tags for social media, internal linking, keyword density, and readability.',
      },
      {
        question: 'How is the SEO Score calculated?',
        answer: 'The SEO Score is based on a weighted evaluation of all checked factors. Critical errors like missing meta tags or H1 headings carry more weight than minor optimization opportunities. A score of 80+ means your page is well optimized.',
      },
      {
        question: 'What do the different colors mean?',
        answer: 'Green (90-100): Excellent - no action required. Yellow (70-89): Good, but optimization potential exists. Orange (50-69): Needs improvement - important SEO factors should be optimized. Red (0-49): Critical - urgent action required.',
      },
      {
        question: 'How often should I run an SEO check?',
        answer: 'We recommend running an SEO check after every major change to your website. Additionally, you should regularly (monthly) verify that all SEO factors remain optimal, especially when publishing new content.',
      },
    ],
  },
  ru: {
    badge: 'Бесплатная SEO проверка',
    title: 'SEO Checker',
    description: 'Проанализируйте SEO-факторы вашего сайта: мета-теги, заголовки, изображения, разметку Schema и многое другое. Мгновенные результаты без регистрации.',
    steps: [
      'Загрузка сайта...',
      'Проверка мета-тегов...',
      'Анализ заголовков...',
      'Проверка изображений...',
      'Анализ Schema разметки...',
      'Проверка sitemap и robots.txt...',
      'Подготовка результатов...',
    ],
    analyzing: 'Анализ SEO-факторов...',
    errorGeneric: 'Произошла ошибка. Пожалуйста, попробуйте снова.',
    errorUnreachable: 'Не удалось связаться с сайтом. Пожалуйста, проверьте URL.',
    tryAgain: 'Повторить',
    unlockReport: 'Получить полный отчет',
    lockedMessage: 'Введите email, чтобы увидеть все детали и решения',
    issues: 'Найденные проблемы',
    startNew: 'Новый анализ',
    longAnalysis: 'Анализ может занять до 30 секунд...',
    seoScore: 'SEO Score',
    placeholder: 'https://ваш-сайт.com',
    buttonText: 'Проверить SEO',
    features: {
      metaTags: 'Мета-теги',
      metaTagsDesc: 'Title, Description, Keywords',
      headings: 'Заголовки',
      headingsDesc: 'Структура H1-H6',
      images: 'Изображения',
      imagesDesc: 'Alt-тексты и оптимизация',
      schema: 'Schema разметка',
      schemaDesc: 'JSON-LD структурированные данные',
      technical: 'Техническое',
      technicalDesc: 'Canonical, Sitemap, Robots.txt',
      social: 'Соцсети',
      socialDesc: 'Open Graph и Twitter Cards',
    },
    faq: [
      {
        question: 'Что такое SEO проверка?',
        answer: 'SEO проверка анализирует важнейшие SEO-факторы вашего сайта: мета-теги, структуру заголовков, оптимизацию изображений и технические SEO-элементы. Инструмент выявляет проблемы, которые могут негативно влиять на позиции в поисковых системах.',
      },
      {
        question: 'Какие SEO-факторы проверяются?',
        answer: 'Наш SEO Checker анализирует: Meta Title и Description, структуру заголовков H1-H6, alt-тексты изображений, Schema Markup (JSON-LD), Canonical URL, Sitemap.xml, Robots.txt, Open Graph теги, внутреннюю перелинковку, плотность ключевых слов и читабельность.',
      },
      {
        question: 'Как рассчитывается SEO Score?',
        answer: 'SEO Score основан на взвешенной оценке всех проверенных факторов. Критические ошибки, такие как отсутствие мета-тегов или заголовков H1, имеют больший вес. Оценка 80+ означает, что страница хорошо оптимизирована.',
      },
      {
        question: 'Что означают разные цвета?',
        answer: 'Зеленый (90-100): Отлично - действий не требуется. Желтый (70-89): Хорошо, но есть потенциал для оптимизации. Оранжевый (50-69): Требуются улучшения. Красный (0-49): Критично - требуются срочные действия.',
      },
      {
        question: 'Как часто нужно проводить SEO проверку?',
        answer: 'Рекомендуем проводить SEO проверку после каждого значительного изменения на сайте. Также стоит регулярно (ежемесячно) проверять, что все SEO-факторы остаются оптимальными, особенно при публикации нового контента.',
      },
    ],
  },
}

export default function SeoCheckerPage() {
  const { locale } = useParams<{ locale: string }>()

  const [state, setState] = useState<AnalysisState>('idle')
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [result, setResult] = useState<SeoAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [analyzingUrl, setAnalyzingUrl] = useState<string | null>(null)

  const t = translations[locale as keyof typeof translations] || translations.de

  const handleAnalyze = useCallback(async (url: string) => {
    setState('analyzing')
    setProgress(0)
    setError(null)
    setResult(null)
    setIsUnlocked(false)
    setAnalyzingUrl(url)

    const steps = t.steps
    let currentProgress = 0

    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 12
      if (currentProgress > 90) currentProgress = 90
      setProgress(currentProgress)

      const stepIndex = Math.min(Math.floor(currentProgress / (100 / steps.length)), steps.length - 1)
      setCurrentStep(steps[stepIndex])
    }, 500)

    try {
      const response = await fetch('/api/tools/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t.errorGeneric)
      }

      clearInterval(progressInterval)
      setProgress(100)
      setCurrentStep(locale === 'de' ? 'Fertig!' : locale === 'ru' ? 'Готово!' : 'Done!')

      await new Promise(resolve => setTimeout(resolve, 500))

      const seoResult: SeoAnalysisResult = {
        url: data.result.url || url,
        score: data.result.score,
        result: data.result,
        issues: data.result.issues || [],
        criticalIssues: data.result.criticalIssues || 0,
        warningIssues: data.result.warningIssues || 0,
        passedChecks: data.result.passedChecks || 0,
      }

      setResult(seoResult)
      setState('complete')
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : t.errorGeneric)
      setState('error')
    }
  }, [locale, t.steps, t.errorGeneric])

  const handleUnlock = useCallback(async (data: LeadData) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'seo-checker',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit')
      }

      // Send email report (don't block on this)
      if (result) {
        fetch('/api/tools/send-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            toolType: 'seo',
            websiteUrl: result.url,
            score: result.score,
            criticalIssues: result.criticalIssues,
            warningIssues: result.warningIssues,
            passedChecks: result.passedChecks,
            issues: result.issues.map((issue: { severity: string; title?: string; description?: string }) => ({
              severity: issue.severity,
              title: issue.title || '',
              description: issue.description || '',
            })),
            title: result.result?.metaTags?.title ? {
              value: result.result.metaTags.title.value,
              length: result.result.metaTags.title.length,
              status: result.result.metaTags.title.status,
            } : undefined,
            description: result.result?.metaTags?.description ? {
              value: result.result.metaTags.description.value,
              length: result.result.metaTags.description.length,
              status: result.result.metaTags.description.status,
            } : undefined,
          }),
        }).catch(err => console.error('Failed to send email report:', err))
      }

      setIsUnlocked(true)
      setShowLeadModal(false)
    } catch (err) {
      throw err
    }
  }, [result])

  const handleReset = useCallback(() => {
    setState('idle')
    setProgress(0)
    setResult(null)
    setError(null)
    setIsUnlocked(false)
    setAnalyzingUrl(null)
  }, [])

  // Idle state - show input form
  if (state === 'idle') {
    return (
      <>
        <ToolHero
          badge={t.badge}
          title={t.title}
          description={t.description}
          icon={<Search className="h-4 w-4" />}
        >
          <UrlInput
            onSubmit={handleAnalyze}
            placeholder={t.placeholder}
            buttonText={t.buttonText}
            locale={locale}
          />
        </ToolHero>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Meta Tags */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.metaTags}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.metaTagsDesc}</p>
              </div>

              {/* Headings */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Hash className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.headings}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.headingsDesc}</p>
              </div>

              {/* Images */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ImageIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.images}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.imagesDesc}</p>
              </div>

              {/* Schema */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.schema}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.schemaDesc}</p>
              </div>

              {/* Technical */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Link2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.technical}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.technicalDesc}</p>
              </div>

              {/* Social */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.social}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.socialDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ToolFaq
          title={locale === 'de' ? 'Häufige Fragen zum SEO Check' : locale === 'ru' ? 'Частые вопросы о SEO проверке' : 'SEO Check FAQ'}
          faqs={t.faq}
        />
      </>
    )
  }

  // Analyzing state
  if (state === 'analyzing') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16">
        <div className="text-center">
          <AnalyzingState
            progress={progress}
            currentStep={currentStep}
            steps={t.steps}
            url={analyzingUrl || undefined}
          />
          <p className="text-sm text-muted-foreground mt-4">{t.longAnalysis}</p>
        </div>
      </div>
    )
  }

  // Error state
  if (state === 'error') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-6xl">❌</div>
          <h2 className="text-2xl font-bold">
            {locale === 'de' ? 'Analyse fehlgeschlagen' : locale === 'ru' ? 'Анализ не удался' : 'Analysis Failed'}
          </h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={handleReset} size="lg">
            {t.tryAgain}
          </Button>
        </div>
      </div>
    )
  }

  // Complete state - show results
  return (
    <>
      <ToolHeroCompact
        title={t.title}
        url={result?.url}
        score={result?.score}
        locale={locale}
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {result ? (
            <div className="space-y-8">
              {/* SEO Result Component */}
              <SeoResult
                result={result.result}
                isLocked={!isUnlocked}
                locale={locale}
              />

              {/* Issues List */}
              <div>
                <h2 className="text-xl font-bold mb-4">{t.issues}</h2>
                <IssueList
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  issues={result.issues.map((issue: any, index: number) => ({
                    ...issue,
                    id: issue.id || `issue-${index}`,
                    category: issue.category || 'seo',
                  }))}
                  isLocked={!isUnlocked}
                  lockedMessage={t.lockedMessage}
                  onUnlock={() => setShowLeadModal(true)}
                  maxVisible={isUnlocked ? undefined : 3}
                  locale={locale}
                />
              </div>

              {/* Service Recommendations */}
              <ServiceRecommendations
                score={result.score}
                category="seo"
                criticalIssues={result.criticalIssues}
                locale={locale}
              />

              {/* Actions */}
              <div className="flex flex-wrap gap-4 justify-center pt-8 border-t">
                {!isUnlocked && (
                  <Button onClick={() => setShowLeadModal(true)} size="lg">
                    {t.unlockReport}
                  </Button>
                )}
                <ShareButton
                  url={result.url}
                  title={locale === 'de' ? 'SEO Check Ergebnis' : locale === 'ru' ? 'Результат SEO проверки' : 'SEO Check Result'}
                  score={result.score}
                  toolName="SEO Checker"
                  locale={locale}
                />
                <Button onClick={handleReset} variant="outline" size="lg">
                  {t.startNew}
                </Button>
              </div>
            </div>
          ) : (
            <ResultSkeleton />
          )}
        </div>
      </section>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSubmit={handleUnlock}
        toolName="seo-checker"
        analyzedUrl={result?.url}
        locale={locale}
        benefits={
          locale === 'de' ? [
            'Alle SEO-Probleme im Detail',
            'Konkrete Lösungsvorschläge',
            'Priorisierte Empfehlungen',
            'How-to-Fix Anleitungen',
          ] : locale === 'ru' ? [
            'Все SEO-проблемы в деталях',
            'Конкретные решения',
            'Приоритетные рекомендации',
            'Инструкции по исправлению',
          ] : [
            'All SEO issues in detail',
            'Concrete solutions',
            'Prioritized recommendations',
            'How-to-fix guides',
          ]
        }
      />
    </>
  )
}
