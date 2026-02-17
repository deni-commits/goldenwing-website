'use client'

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Gauge, Zap, Clock, TrendingUp, HardDrive, Globe } from 'lucide-react'
import { ToolHero, ToolHeroCompact } from '@/components/tools/shared/tool-hero'
import { UrlInput } from '@/components/tools/shared/url-input'
import { AnalyzingState, ResultSkeleton } from '@/components/tools/shared/result-skeleton'
import { LeadCaptureModal, type LeadData } from '@/components/tools/shared/lead-capture-modal'
import { IssueList } from '@/components/tools/shared/issue-list'
import { ServiceRecommendations } from '@/components/tools/shared/service-recommendations'
import { ShareButton } from '@/components/tools/shared/share-button'
import { PerformanceResult } from '@/components/tools/performance'
import { Button } from '@/components/ui/button'
import { ToolFaq } from '@/components/tools/shared/tool-faq'

type AnalysisState = 'idle' | 'analyzing' | 'complete' | 'error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnalysisResultData = any

interface PerformanceAnalysisResult {
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
    badge: 'Kostenloser Performance Test',
    title: 'Website Speed Test',
    description: 'Testen Sie die Ladegeschwindigkeit Ihrer Website mit Core Web Vitals. Erhalten Sie detaillierte Analysen und konkrete Optimierungsvorschläge.',
    steps: [
      'Website wird geladen...',
      'Core Web Vitals messen...',
      'LCP analysieren...',
      'CLS messen...',
      'JavaScript-Ausführung prüfen...',
      'Ressourcen analysieren...',
      'Ergebnisse aufbereiten...',
    ],
    analyzing: 'Messe Website-Performance...',
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    errorUnreachable: 'Die Website konnte nicht erreicht werden. Bitte prüfen Sie die URL.',
    tryAgain: 'Erneut versuchen',
    unlockReport: 'Vollständigen Report freischalten',
    lockedMessage: 'Geben Sie Ihre E-Mail ein, um alle Details und Optimierungstipps zu sehen',
    issues: 'Performance-Probleme',
    startNew: 'Neue Analyse',
    longAnalysis: 'Die Analyse kann bis zu 60 Sekunden dauern...',
    performanceScore: 'Performance Score',
    placeholder: 'https://ihre-website.at',
    buttonText: 'Speed testen',
    features: {
      cwv: 'Core Web Vitals',
      cwvDesc: 'LCP, FCP, CLS, TBT',
      speed: 'Ladezeit',
      speedDesc: 'Speed Index & TTFB',
      size: 'Seitengröße',
      sizeDesc: 'Ressourcen-Analyse',
      mobile: 'Mobile Test',
      mobileDesc: 'Google PageSpeed Insights',
      opportunities: 'Optimierungen',
      opportunitiesDesc: 'Konkrete Verbesserungsvorschläge',
      diagnostics: 'Diagnose',
      diagnosticsDesc: 'Detaillierte Analysen',
    },
    faq: [
      {
        question: 'Was sind Core Web Vitals?',
        answer: 'Core Web Vitals sind Google-Metriken, die die Nutzererfahrung messen: LCP (Largest Contentful Paint) misst die Ladezeit des größten Elements, FCP (First Contentful Paint) die erste sichtbare Anzeige, CLS (Cumulative Layout Shift) die visuelle Stabilität, und TBT (Total Blocking Time) wie lange die Seite blockiert ist.',
      },
      {
        question: 'Warum ist Website-Geschwindigkeit wichtig?',
        answer: 'Schnelle Websites haben bessere Google-Rankings, niedrigere Absprungraten und höhere Conversion-Raten. Studien zeigen: Jede Sekunde Verzögerung kann die Conversion um 7% reduzieren. Seit 2021 sind Core Web Vitals ein offizieller Google-Rankingfaktor.',
      },
      {
        question: 'Was ist ein guter LCP-Wert?',
        answer: 'Ein guter LCP-Wert liegt unter 2,5 Sekunden. Werte zwischen 2,5-4 Sekunden benötigen Verbesserung, über 4 Sekunden sind kritisch. LCP misst, wie schnell der größte sichtbare Inhalt (Hero-Bild, Haupt-Text) geladen wird.',
      },
      {
        question: 'Wie kann ich meine Website schneller machen?',
        answer: 'Die wichtigsten Maßnahmen sind: Bilder optimieren (WebP-Format, Komprimierung), Browser-Caching aktivieren, CSS/JavaScript minimieren, ein CDN nutzen, Server-Antwortzeiten verbessern. Lazy Loading für Bilder unter dem Fold kann auch erheblich helfen.',
      },
      {
        question: 'Werden Mobile und Desktop separat getestet?',
        answer: 'Unser Tool testet standardmäßig die Mobile-Performance, da Google Mobile-First-Indexierung verwendet und über 60% des Traffics von mobilen Geräten kommt. Mobile-Performance ist meist schlechter und daher kritischer für Ihr Ranking.',
      },
    ],
  },
  en: {
    badge: 'Free Performance Test',
    title: 'Website Speed Test',
    description: 'Test your website\'s loading speed with Core Web Vitals. Get detailed analysis and concrete optimization suggestions.',
    steps: [
      'Loading website...',
      'Measuring Core Web Vitals...',
      'Analyzing LCP...',
      'Measuring CLS...',
      'Checking JavaScript execution...',
      'Analyzing resources...',
      'Preparing results...',
    ],
    analyzing: 'Measuring website performance...',
    errorGeneric: 'An error occurred. Please try again.',
    errorUnreachable: 'Could not reach the website. Please check the URL.',
    tryAgain: 'Try Again',
    unlockReport: 'Unlock Full Report',
    lockedMessage: 'Enter your email to see all details and optimization tips',
    issues: 'Performance Issues',
    startNew: 'New Analysis',
    longAnalysis: 'Analysis can take up to 60 seconds...',
    performanceScore: 'Performance Score',
    placeholder: 'https://your-website.com',
    buttonText: 'Test Speed',
    features: {
      cwv: 'Core Web Vitals',
      cwvDesc: 'LCP, FCP, CLS, TBT',
      speed: 'Load Time',
      speedDesc: 'Speed Index & TTFB',
      size: 'Page Size',
      sizeDesc: 'Resource Analysis',
      mobile: 'Mobile Test',
      mobileDesc: 'Google PageSpeed Insights',
      opportunities: 'Optimizations',
      opportunitiesDesc: 'Concrete improvement suggestions',
      diagnostics: 'Diagnostics',
      diagnosticsDesc: 'Detailed analyses',
    },
    faq: [
      {
        question: 'What are Core Web Vitals?',
        answer: 'Core Web Vitals are Google metrics that measure user experience: LCP (Largest Contentful Paint) measures loading time of the largest element, FCP (First Contentful Paint) the first visible display, CLS (Cumulative Layout Shift) visual stability, and TBT (Total Blocking Time) how long the page is blocked.',
      },
      {
        question: 'Why is website speed important?',
        answer: 'Fast websites have better Google rankings, lower bounce rates, and higher conversion rates. Studies show: Every second of delay can reduce conversions by 7%. Since 2021, Core Web Vitals are an official Google ranking factor.',
      },
      {
        question: 'What is a good LCP value?',
        answer: 'A good LCP value is under 2.5 seconds. Values between 2.5-4 seconds need improvement, over 4 seconds is critical. LCP measures how quickly the largest visible content (hero image, main text) loads.',
      },
      {
        question: 'How can I make my website faster?',
        answer: 'The most important measures are: optimize images (WebP format, compression), enable browser caching, minimize CSS/JavaScript, use a CDN, improve server response times. Lazy loading for images below the fold can also help significantly.',
      },
      {
        question: 'Are Mobile and Desktop tested separately?',
        answer: 'Our tool tests mobile performance by default, as Google uses mobile-first indexing and over 60% of traffic comes from mobile devices. Mobile performance is usually worse and therefore more critical for your ranking.',
      },
    ],
  },
  ru: {
    badge: 'Бесплатный тест скорости',
    title: 'Тест скорости сайта',
    description: 'Проверьте скорость загрузки вашего сайта с Core Web Vitals. Получите детальный анализ и конкретные рекомендации по оптимизации.',
    steps: [
      'Загрузка сайта...',
      'Измерение Core Web Vitals...',
      'Анализ LCP...',
      'Измерение CLS...',
      'Проверка выполнения JavaScript...',
      'Анализ ресурсов...',
      'Подготовка результатов...',
    ],
    analyzing: 'Измерение производительности...',
    errorGeneric: 'Произошла ошибка. Пожалуйста, попробуйте снова.',
    errorUnreachable: 'Не удалось связаться с сайтом. Проверьте URL.',
    tryAgain: 'Повторить',
    unlockReport: 'Получить полный отчет',
    lockedMessage: 'Введите email, чтобы увидеть все детали и советы по оптимизации',
    issues: 'Проблемы производительности',
    startNew: 'Новый анализ',
    longAnalysis: 'Анализ может занять до 60 секунд...',
    performanceScore: 'Performance Score',
    placeholder: 'https://ваш-сайт.com',
    buttonText: 'Тестировать',
    features: {
      cwv: 'Core Web Vitals',
      cwvDesc: 'LCP, FCP, CLS, TBT',
      speed: 'Время загрузки',
      speedDesc: 'Speed Index и TTFB',
      size: 'Размер страницы',
      sizeDesc: 'Анализ ресурсов',
      mobile: 'Мобильный тест',
      mobileDesc: 'Google PageSpeed Insights',
      opportunities: 'Оптимизации',
      opportunitiesDesc: 'Конкретные предложения по улучшению',
      diagnostics: 'Диагностика',
      diagnosticsDesc: 'Детальный анализ',
    },
    faq: [
      {
        question: 'Что такое Core Web Vitals?',
        answer: 'Core Web Vitals — это метрики Google для измерения пользовательского опыта: LCP (Largest Contentful Paint) измеряет время загрузки самого большого элемента, FCP (First Contentful Paint) — первое отображение, CLS (Cumulative Layout Shift) — визуальную стабильность, TBT (Total Blocking Time) — время блокировки.',
      },
      {
        question: 'Почему важна скорость сайта?',
        answer: 'Быстрые сайты имеют лучшие позиции в Google, меньший показатель отказов и более высокую конверсию. Исследования показывают: каждая секунда задержки может снизить конверсию на 7%. С 2021 года Core Web Vitals — официальный фактор ранжирования Google.',
      },
      {
        question: 'Какое значение LCP считается хорошим?',
        answer: 'Хорошее значение LCP — менее 2,5 секунд. Значения 2,5-4 секунды требуют улучшения, более 4 секунд — критично. LCP измеряет, как быстро загружается самый большой видимый контент (hero-изображение, основной текст).',
      },
      {
        question: 'Как сделать сайт быстрее?',
        answer: 'Основные меры: оптимизация изображений (формат WebP, сжатие), включение кэширования браузера, минификация CSS/JavaScript, использование CDN, улучшение времени ответа сервера. Ленивая загрузка изображений также помогает.',
      },
      {
        question: 'Тестируются ли мобильная и десктопная версии отдельно?',
        answer: 'Наш инструмент по умолчанию тестирует мобильную производительность, так как Google использует mobile-first индексацию и более 60% трафика приходится на мобильные устройства. Мобильная производительность обычно хуже и критичнее для рейтинга.',
      },
    ],
  },
}

export default function PerformanceCheckerPage() {
  const { locale } = useParams<{ locale: string }>()

  const [state, setState] = useState<AnalysisState>('idle')
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [result, setResult] = useState<PerformanceAnalysisResult | null>(null)
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
      currentProgress += Math.random() * 8
      if (currentProgress > 90) currentProgress = 90
      setProgress(currentProgress)

      const stepIndex = Math.min(Math.floor(currentProgress / (100 / steps.length)), steps.length - 1)
      setCurrentStep(steps[stepIndex])
    }, 700)

    try {
      const response = await fetch('/api/tools/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error(t.errorGeneric)
      }
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t.errorGeneric)
      }

      clearInterval(progressInterval)
      setProgress(100)
      setCurrentStep(locale === 'de' ? 'Fertig!' : locale === 'ru' ? 'Готово!' : 'Done!')

      await new Promise(resolve => setTimeout(resolve, 500))

      const perfResult: PerformanceAnalysisResult = {
        url: data.result.url || url,
        score: data.result.score,
        result: data.result,
        issues: data.result.issues || [],
        criticalIssues: data.result.criticalIssues || 0,
        warningIssues: data.result.warningIssues || 0,
        passedChecks: data.result.passedChecks || 0,
      }

      setResult(perfResult)
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
          source: 'performance-checker',
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
            toolType: 'seo', // Use SEO template for now
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
          icon={<Gauge className="h-4 w-4" />}
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
              {/* Core Web Vitals */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Gauge className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.cwv}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.cwvDesc}</p>
              </div>

              {/* Load Time */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.speed}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.speedDesc}</p>
              </div>

              {/* Page Size */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <HardDrive className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.size}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.sizeDesc}</p>
              </div>

              {/* Mobile Test */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.mobile}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.mobileDesc}</p>
              </div>

              {/* Opportunities */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.opportunities}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.opportunitiesDesc}</p>
              </div>

              {/* Diagnostics */}
              <div className="p-6 rounded-xl border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{t.features.diagnostics}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.features.diagnosticsDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ToolFaq
          title={locale === 'de' ? 'Häufige Fragen zum Performance Test' : locale === 'ru' ? 'Частые вопросы о тесте скорости' : 'Performance Test FAQ'}
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
              {/* Performance Result Component */}
              <PerformanceResult
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
                    category: issue.category || 'performance',
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
                category="performance"
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
                  title={locale === 'de' ? 'Performance Test Ergebnis' : locale === 'ru' ? 'Результат теста скорости' : 'Performance Test Result'}
                  score={result.score}
                  toolName="Performance Checker"
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
        toolName="performance-checker"
        analyzedUrl={result?.url}
        locale={locale}
        benefits={
          locale === 'de' ? [
            'Alle Core Web Vitals im Detail',
            'Konkrete Optimierungstipps',
            'Priorisierte Empfehlungen',
            'Einsparpotenziale aufgezeigt',
          ] : locale === 'ru' ? [
            'Все Core Web Vitals подробно',
            'Конкретные советы по оптимизации',
            'Приоритетные рекомендации',
            'Показаны возможности экономии',
          ] : [
            'All Core Web Vitals in detail',
            'Concrete optimization tips',
            'Prioritized recommendations',
            'Savings potential shown',
          ]
        }
      />
    </>
  )
}
