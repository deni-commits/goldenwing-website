'use client'

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Search, Gauge } from 'lucide-react'
import { ToolHero, ToolHeroCompact } from '@/components/tools/shared/tool-hero'
import { UrlInput } from '@/components/tools/shared/url-input'
import { AnalyzingState, ResultSkeleton } from '@/components/tools/shared/result-skeleton'
import { LeadCaptureModal, type LeadData } from '@/components/tools/shared/lead-capture-modal'
import { IssueList } from '@/components/tools/shared/issue-list'
import { ServiceRecommendations } from '@/components/tools/shared/service-recommendations'
import { ShareButton } from '@/components/tools/shared/share-button'
import { SeoResult } from '@/components/tools/seo/seo-result'
import { PerformanceResult } from '@/components/tools/performance'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type AnalysisState = 'idle' | 'analyzing' | 'complete' | 'error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnalysisResultData = any

interface CombinedResult {
  url: string
  overallScore: number
  seo: AnalysisResultData
  performance: AnalysisResultData
  issues: AnalysisResultData[]
  criticalIssues: number
  warningIssues: number
  passedChecks: number
}

export default function SeoPerformancePage() {
  const { locale } = useParams<{ locale: string }>()

  const [state, setState] = useState<AnalysisState>('idle')
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [result, setResult] = useState<CombinedResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [analyzingUrl, setAnalyzingUrl] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('seo')

  const isGerman = locale === 'de'
  const isRussian = locale === 'ru'

  const t = {
    badge: isRussian ? 'SEO & Performance анализ' : isGerman ? 'SEO & Performance Analyse' : 'SEO & Performance Analysis',
    title: 'SEO & Performance Check',
    description: isRussian
      ? 'Комплексный анализ SEO-факторов и производительности сайта. Мета-теги, Core Web Vitals и многое другое.'
      : isGerman
        ? 'Umfassende Analyse von SEO-Faktoren und Website-Performance. Meta-Tags, Core Web Vitals und mehr.'
        : 'Comprehensive analysis of SEO factors and website performance. Meta tags, Core Web Vitals and more.',
    steps: isRussian
      ? [
          'Загрузка сайта...',
          'Проверка мета-тегов...',
          'Анализ заголовков...',
          'Измерение Core Web Vitals...',
          'Анализ производительности...',
          'Проверка schema и sitemap...',
          'Подготовка результатов...',
        ]
      : isGerman
        ? [
            'Website wird geladen...',
            'Meta-Tags werden geprüft...',
            'Überschriften analysieren...',
            'Core Web Vitals messen...',
            'Performance analysieren...',
            'Schema & Sitemap prüfen...',
            'Ergebnisse aufbereiten...',
          ]
        : [
            'Loading website...',
            'Checking meta tags...',
            'Analyzing headings...',
            'Measuring Core Web Vitals...',
            'Analyzing performance...',
            'Checking schema & sitemap...',
            'Preparing results...',
          ],
    analyzing: isRussian ? 'Анализ SEO & Performance...' : isGerman ? 'Analysiere SEO & Performance...' : 'Analyzing SEO & Performance...',
    errorGeneric: isRussian ? 'Произошла ошибка. Попробуйте снова.' : isGerman ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' : 'An error occurred. Please try again.',
    tryAgain: isRussian ? 'Повторить' : isGerman ? 'Erneut versuchen' : 'Try Again',
    unlockReport: isRussian ? 'Получить полный отчет' : isGerman ? 'Vollständigen Report freischalten' : 'Unlock Full Report',
    lockedMessage: isRussian ? 'Введите email, чтобы увидеть все детали и решения' : isGerman ? 'Geben Sie Ihre E-Mail ein, um alle Details und Lösungen zu sehen' : 'Enter your email to see all details and solutions',
    issues: isRussian ? 'Найденные проблемы' : isGerman ? 'Gefundene Probleme' : 'Found Issues',
    startNew: isRussian ? 'Новый анализ' : isGerman ? 'Neue Analyse' : 'New Analysis',
    longAnalysis: isRussian ? 'Анализ может занять до 90 секунд...' : isGerman ? 'Die Analyse kann bis zu 90 Sekunden dauern...' : 'Analysis can take up to 90 seconds...',
    tabSeo: 'SEO',
    tabPerformance: 'Performance',
    overallScore: isRussian ? 'Общий балл' : isGerman ? 'Gesamt-Score' : 'Overall Score',
    placeholder: isRussian ? 'https://ваш-сайт.com' : isGerman ? 'https://ihre-website.at' : 'https://your-website.com',
    buttonText: isRussian ? 'Анализировать' : isGerman ? 'Analysieren' : 'Analyze',
    done: isRussian ? 'Готово!' : isGerman ? 'Fertig!' : 'Done!',
    analysisFailed: isRussian ? 'Анализ не удался' : isGerman ? 'Analyse fehlgeschlagen' : 'Analysis Failed',
  }

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
    }, 600)

    try {
      // Run both analyses in parallel
      const [seoResponse, performanceResponse] = await Promise.all([
        fetch('/api/tools/seo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        }),
        fetch('/api/tools/performance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        }),
      ])

      const seoContentType = seoResponse.headers.get('content-type') || ''
      const perfContentType = performanceResponse.headers.get('content-type') || ''
      if (!seoContentType.includes('application/json') || !perfContentType.includes('application/json')) {
        throw new Error(t.errorGeneric)
      }

      const [seoData, performanceData] = await Promise.all([
        seoResponse.json(),
        performanceResponse.json(),
      ])

      // Check for HTTP errors
      if (!seoResponse.ok) {
        throw new Error(seoData.error || t.errorGeneric)
      }
      if (!performanceResponse.ok) {
        throw new Error(performanceData.error || t.errorGeneric)
      }

      // Check for API-level errors (success: false)
      if (seoData.success === false) {
        throw new Error(seoData.error || t.errorGeneric)
      }
      if (performanceData.success === false) {
        throw new Error(performanceData.error || t.errorGeneric)
      }

      clearInterval(progressInterval)
      setProgress(100)
      setCurrentStep(t.done)

      await new Promise(resolve => setTimeout(resolve, 500))

      // Combine results
      const seoIssues = (seoData.result.issues || []).map((issue: { category?: string }) => ({
        ...issue,
        category: issue.category || 'seo',
      }))
      const perfIssues = (performanceData.result.issues || []).map((issue: { category?: string }) => ({
        ...issue,
        category: issue.category || 'performance',
      }))
      const allIssues = [...seoIssues, ...perfIssues]

      // Calculate combined score (60% SEO, 40% Performance)
      const overallScore = Math.round(
        (seoData.result.score || 0) * 0.6 +
        (performanceData.result.score || 0) * 0.4
      )

      const combinedResult: CombinedResult = {
        url: seoData.result.url || url,
        overallScore,
        seo: seoData.result,
        performance: performanceData.result,
        issues: allIssues,
        criticalIssues: allIssues.filter((i: { severity: string }) => i.severity === 'critical').length,
        warningIssues: allIssues.filter((i: { severity: string }) => i.severity === 'warning').length,
        passedChecks: allIssues.filter((i: { severity: string }) => i.severity === 'passed' || i.severity === 'info').length,
      }

      setResult(combinedResult)
      setState('complete')
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : t.errorGeneric)
      setState('error')
    }
  }, [t.steps, t.errorGeneric, t.done])

  const handleUnlock = useCallback(async (data: LeadData) => {
    try {
      // Save lead
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'seo-performance',
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
            score: result.overallScore,
            criticalIssues: result.criticalIssues,
            warningIssues: result.warningIssues,
            passedChecks: result.passedChecks,
            issues: result.issues.map((issue: { severity: string; title?: string; description?: string }) => ({
              severity: issue.severity,
              title: issue.title || '',
              description: issue.description || '',
            })),
            title: result.seo?.metaTags?.title ? {
              value: result.seo.metaTags.title.value,
              length: result.seo.metaTags.title.length,
              status: result.seo.metaTags.title.status,
            } : undefined,
            description: result.seo?.metaTags?.description ? {
              value: result.seo.metaTags.description.value,
              length: result.seo.metaTags.description.length,
              status: result.seo.metaTags.description.status,
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
    setActiveTab('seo')
  }, [])

  // Render based on state
  if (state === 'idle') {
    return (
      <>
        <ToolHero
          badge={t.badge}
          title={t.title}
          description={t.description}
          icon={
            <div className="flex gap-1">
              <Search className="h-4 w-4" />
              <Gauge className="h-4 w-4" />
            </div>
          }
        >
          <UrlInput
            onSubmit={handleAnalyze}
            placeholder={t.placeholder}
            buttonText={t.buttonText}
            locale={locale}
          />
        </ToolHero>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* SEO Features */}
              <div className="p-6 rounded-xl border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">SEO {isRussian ? 'Анализ' : isGerman ? 'Analyse' : 'Analysis'}</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Meta-Tags (Title, Description)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {isRussian ? 'Структура заголовков' : isGerman ? 'Überschriften-Struktur' : 'Heading Structure'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {isRussian ? 'Изображения и Alt-тексты' : isGerman ? 'Bilder & Alt-Texte' : 'Images & Alt Texts'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Schema Markup & JSON-LD
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Sitemap & Robots.txt
                  </li>
                </ul>
              </div>

              {/* Performance Features */}
              <div className="p-6 rounded-xl border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Gauge className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">Performance {isRussian ? 'Анализ' : isGerman ? 'Analyse' : 'Analysis'}</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Core Web Vitals (LCP, FCP, CLS)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {isRussian ? 'Анализ времени загрузки' : isGerman ? 'Ladezeit-Analyse' : 'Load Time Analysis'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {isRussian ? 'Размер страницы и запросы' : isGerman ? 'Seitengröße & Requests' : 'Page Size & Requests'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> {isRussian ? 'Рекомендации по оптимизации' : isGerman ? 'Optimierungs-Empfehlungen' : 'Optimization Recommendations'}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Google PageSpeed Insights
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

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

  if (state === 'error') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-6xl">❌</div>
          <h2 className="text-2xl font-bold">{t.analysisFailed}</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={handleReset} size="lg">
            {t.tryAgain}
          </Button>
        </div>
      </div>
    )
  }

  // Complete state
  return (
    <>
      <ToolHeroCompact
        title={t.title}
        url={result?.url}
        score={result?.overallScore}
        locale={locale}
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {result ? (
            <div className="space-y-8">
              {/* Score Overview */}
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${activeTab === 'seo' ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setActiveTab('seo')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Search className="h-5 w-5" />
                      <span className="font-medium">SEO Score</span>
                    </div>
                    <span className={`text-2xl font-bold ${
                      result.seo.score >= 80 ? 'text-green-500' :
                      result.seo.score >= 60 ? 'text-yellow-500' :
                      result.seo.score >= 40 ? 'text-orange-500' : 'text-red-500'
                    }`}>
                      {result.seo.score}/100
                    </span>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${activeTab === 'performance' ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => setActiveTab('performance')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gauge className="h-5 w-5" />
                      <span className="font-medium">Performance Score</span>
                    </div>
                    <span className={`text-2xl font-bold ${
                      result.performance.score >= 80 ? 'text-green-500' :
                      result.performance.score >= 60 ? 'text-yellow-500' :
                      result.performance.score >= 40 ? 'text-orange-500' : 'text-red-500'
                    }`}>
                      {result.performance.score}/100
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabbed Results */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="seo" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    {t.tabSeo}
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    {t.tabPerformance}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="seo" className="mt-6">
                  <SeoResult
                    result={result.seo}
                    isLocked={!isUnlocked}
                    locale={locale}
                  />
                </TabsContent>
                <TabsContent value="performance" className="mt-6">
                  <PerformanceResult
                    result={result.performance}
                    isLocked={!isUnlocked}
                    locale={locale}
                  />
                </TabsContent>
              </Tabs>

              {/* Combined Issues List */}
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
                score={result.overallScore}
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
                  title={isRussian ? 'Результат SEO & Performance' : isGerman ? 'SEO & Performance Ergebnis' : 'SEO & Performance Result'}
                  score={result.overallScore}
                  toolName="SEO & Performance Check"
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
        toolName="seo-performance"
        analyzedUrl={result?.url}
        locale={locale}
        benefits={isRussian ? [
          'Все детали SEO & Performance',
          'Конкретные советы по оптимизации',
          'Приоритетные рекомендации',
          'Анализ Core Web Vitals',
        ] : isGerman ? [
          'Alle SEO & Performance Details',
          'Konkrete Optimierungstipps',
          'Priorisierte Empfehlungen',
          'Core Web Vitals Analyse',
        ] : [
          'All SEO & Performance details',
          'Concrete optimization tips',
          'Prioritized recommendations',
          'Core Web Vitals analysis',
        ]}
      />
    </>
  )
}
