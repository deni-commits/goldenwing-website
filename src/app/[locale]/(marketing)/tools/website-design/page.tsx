'use client'

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Palette, Smartphone, Image as ImageIcon, Share2 } from 'lucide-react'
import { ToolHero, ToolHeroCompact } from '@/components/tools/shared/tool-hero'
import { UrlInput } from '@/components/tools/shared/url-input'
import { AnalyzingState, ResultSkeleton } from '@/components/tools/shared/result-skeleton'
import { LeadCaptureModal, type LeadData } from '@/components/tools/shared/lead-capture-modal'
import { IssueList } from '@/components/tools/shared/issue-list'
import { ServiceRecommendations } from '@/components/tools/shared/service-recommendations'
import { ShareButton } from '@/components/tools/shared/share-button'
import { DesignResult } from '@/components/tools/design'
import { Button } from '@/components/ui/button'

type AnalysisState = 'idle' | 'analyzing' | 'complete' | 'error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnalysisResult = any

export default function WebsiteDesignPage() {
  const { locale } = useParams<{ locale: string }>()

  const [state, setState] = useState<AnalysisState>('idle')
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [analyzingUrl, setAnalyzingUrl] = useState<string | null>(null)

  const isGerman = locale === 'de'
  const isRussian = locale === 'ru'

  const t = {
    badge: 'Website & Design Check',
    title: 'Website & Design Check',
    description: isRussian
      ? 'Проверьте мобильную оптимизацию, favicon, Open Graph теги и превью для соцсетей вашего сайта.'
      : isGerman
        ? 'Prüfen Sie Mobile-Optimierung, Favicon, Open Graph Tags und Social Media Vorschauen Ihrer Website.'
        : 'Check mobile optimization, favicon, Open Graph tags, and social media previews of your website.',
    steps: isRussian
      ? [
          'Загрузка сайта...',
          'Проверка мобильной оптимизации...',
          'Анализ viewport...',
          'Поиск иконок...',
          'Проверка Open Graph тегов...',
          'Превью для соцсетей...',
          'Подготовка результатов...',
        ]
      : isGerman
        ? [
            'Website wird geladen...',
            'Mobile-Optimierung prüfen...',
            'Viewport analysieren...',
            'Icons werden gesucht...',
            'Open Graph Tags prüfen...',
            'Social Media Preview...',
            'Ergebnisse aufbereiten...',
          ]
        : [
            'Loading website...',
            'Checking mobile optimization...',
            'Analyzing viewport...',
            'Looking for icons...',
            'Checking Open Graph tags...',
            'Social media preview...',
            'Preparing results...',
          ],
    analyzing: isRussian ? 'Анализ дизайна...' : isGerman ? 'Analysiere Design...' : 'Analyzing design...',
    errorGeneric: isRussian ? 'Произошла ошибка. Попробуйте снова.' : isGerman ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' : 'An error occurred. Please try again.',
    tryAgain: isRussian ? 'Повторить' : isGerman ? 'Erneut versuchen' : 'Try Again',
    unlockReport: isRussian ? 'Получить полный отчет' : isGerman ? 'Vollständigen Report freischalten' : 'Unlock Full Report',
    lockedMessage: isRussian ? 'Введите email, чтобы увидеть все детали и решения' : isGerman ? 'Geben Sie Ihre E-Mail ein, um alle Details und Lösungen zu sehen' : 'Enter your email to see all details and solutions',
    issues: isRussian ? 'Найденные проблемы' : isGerman ? 'Gefundene Probleme' : 'Found Issues',
    startNew: isRussian ? 'Новый анализ' : isGerman ? 'Neue Analyse' : 'New Analysis',
    placeholder: isRussian ? 'https://ваш-сайт.com' : isGerman ? 'https://ihre-website.at' : 'https://your-website.com',
    buttonText: isRussian ? 'Проверить дизайн' : isGerman ? 'Design prüfen' : 'Check Design',
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
      currentProgress += Math.random() * 15
      if (currentProgress > 90) currentProgress = 90
      setProgress(currentProgress)

      const stepIndex = Math.min(Math.floor(currentProgress / (100 / steps.length)), steps.length - 1)
      setCurrentStep(steps[stepIndex])
    }, 400)

    try {
      const response = await fetch('/api/tools/design', {
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
      setCurrentStep(t.done)

      await new Promise(resolve => setTimeout(resolve, 500))

      setResult(data.result)
      setAnalysisId(data.id)
      setState('complete')
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : t.errorGeneric)
      setState('error')
    }
  }, [t.steps, t.errorGeneric, t.done])

  const handleUnlock = useCallback(async (data: LeadData) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'website-design',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit')
      }

      if (analysisId) {
        await fetch(`/api/tools/design?id=${analysisId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ unlocked: true }),
        }).catch(() => {})
      }

      // Send email report (don't block on this)
      if (result) {
        const issues = result.issues || []
        fetch('/api/tools/send-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            toolType: 'seo', // Use SEO template for now
            websiteUrl: result.url || analyzingUrl,
            score: result.score || 0,
            criticalIssues: issues.filter((i: { severity: string }) => i.severity === 'critical').length,
            warningIssues: issues.filter((i: { severity: string }) => i.severity === 'warning').length,
            passedChecks: issues.filter((i: { severity: string }) => i.severity === 'passed').length,
            issues: issues.map((issue: { severity: string; title?: string; description?: string }) => ({
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
  }, [analysisId, result, analyzingUrl])

  const handleReset = useCallback(() => {
    setState('idle')
    setProgress(0)
    setResult(null)
    setError(null)
    setIsUnlocked(false)
    setAnalysisId(null)
    setAnalyzingUrl(null)
  }, [])

  // Render based on state
  if (state === 'idle') {
    return (
      <>
        <ToolHero
          badge={t.badge}
          title={t.title}
          description={t.description}
          icon={<Palette className="h-5 w-5" />}
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
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Smartphone className="h-6 w-6" />,
                  label: isRussian ? 'Мобильная проверка' : isGerman ? 'Mobile-Check' : 'Mobile Check',
                  desc: 'Viewport & Responsive'
                },
                {
                  icon: <ImageIcon className="h-6 w-6" />,
                  label: 'Favicon & Icons',
                  desc: isRussian ? 'Проверка иконок приложения' : isGerman ? 'App-Icons prüfen' : 'Check app icons'
                },
                {
                  icon: <Share2 className="h-6 w-6" />,
                  label: 'Open Graph',
                  desc: isRussian ? 'Превью для соцсетей' : isGerman ? 'Social Media Vorschau' : 'Social Media Preview'
                },
                {
                  icon: <Palette className="h-6 w-6" />,
                  label: 'Theme Color',
                  desc: isRussian ? 'Стилизация браузера' : isGerman ? 'Browser-Styling' : 'Browser Styling'
                },
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-xl border hover:border-primary/50 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium mb-1">{feature.label}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Check Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              {isRussian ? 'Что мы проверяем' : isGerman ? 'Was wir prüfen' : 'What We Check'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-background rounded-xl border">
                <h3 className="font-bold mb-3">{isRussian ? 'Мобильная оптимизация' : isGerman ? 'Mobile-Optimierung' : 'Mobile Optimization'}</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>✓ Viewport Meta-Tag</li>
                  <li>✓ {isRussian ? 'Индикаторы адаптивного дизайна' : isGerman ? 'Responsive Design Indikatoren' : 'Responsive Design Indicators'}</li>
                  <li>✓ Touch-Friendly Elements</li>
                </ul>
              </div>
              <div className="p-6 bg-background rounded-xl border">
                <h3 className="font-bold mb-3">{isRussian ? 'Брендинг и иконки' : 'Branding & Icons'}</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>✓ Favicon</li>
                  <li>✓ Apple Touch Icon</li>
                  <li>✓ Theme Color</li>
                </ul>
              </div>
              <div className="p-6 bg-background rounded-xl border">
                <h3 className="font-bold mb-3">Open Graph Tags</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>✓ og:title, og:description</li>
                  <li>✓ og:image</li>
                  <li>✓ og:url, og:type</li>
                </ul>
              </div>
              <div className="p-6 bg-background rounded-xl border">
                <h3 className="font-bold mb-3">Twitter Card</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>✓ twitter:card</li>
                  <li>✓ twitter:title, twitter:description</li>
                  <li>✓ twitter:image</li>
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
        <AnalyzingState
          progress={progress}
          currentStep={currentStep}
          steps={t.steps}
          url={analyzingUrl || undefined}
        />
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
        score={result?.score}
        locale={locale}
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {result ? (
            <div className="space-y-8">
              <DesignResult
                result={result}
                isLocked={!isUnlocked}
                locale={locale}
              />

              {/* Issues List */}
              <div>
                <h2 className="text-xl font-bold mb-4">{t.issues}</h2>
                <IssueList
                  issues={result.issues?.map((issue: { id: string; severity: string; title: string; description: string; howToFix?: string; category?: string }, index: number) => ({
                    ...issue,
                    id: issue.id || `issue-${index}`,
                    category: issue.category || 'design',
                  })) || []}
                  isLocked={!isUnlocked}
                  lockedMessage={t.lockedMessage}
                  onUnlock={() => setShowLeadModal(true)}
                  maxVisible={isUnlocked ? undefined : 3}
                  locale={locale}
                />
              </div>

              {/* Service Recommendations */}
              <ServiceRecommendations
                score={result.score || 0}
                category="design"
                criticalIssues={result.criticalIssues || 0}
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
                  url={result?.url || ''}
                  title={isRussian ? 'Результат проверки дизайна' : isGerman ? 'Website & Design Ergebnis' : 'Website & Design Result'}
                  score={result?.score}
                  toolName="Website & Design Check"
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
        toolName="website-design"
        analyzedUrl={result?.url}
        locale={locale}
        benefits={isRussian ? [
          'Все детали дизайна',
          'Превью для соцсетей',
          'Советы по мобильной оптимизации',
          'Конкретные рекомендации по улучшению',
        ] : isGerman ? [
          'Alle Design-Details',
          'Social Media Vorschau',
          'Mobile-Optimierung Tipps',
          'Konkrete Verbesserungsvorschläge',
        ] : [
          'All design details',
          'Social media preview',
          'Mobile optimization tips',
          'Concrete improvement suggestions',
        ]}
      />
    </>
  )
}
