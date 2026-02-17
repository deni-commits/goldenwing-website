'use client'

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Palette } from 'lucide-react'
import { ToolHero, ToolHeroCompact } from '@/components/tools/shared/tool-hero'
import { UrlInput } from '@/components/tools/shared/url-input'
import { AnalyzingState, ResultSkeleton } from '@/components/tools/shared/result-skeleton'
import { LeadCaptureModal, type LeadData } from '@/components/tools/shared/lead-capture-modal'
import { IssueList } from '@/components/tools/shared/issue-list'
import { ToolFaq, designAnalyzerFaqs } from '@/components/tools/shared/tool-faq'
import { ServiceRecommendations } from '@/components/tools/shared/service-recommendations'
import { ShareButton } from '@/components/tools/shared/share-button'
import { DesignResult } from '@/components/tools/design'
import { Button } from '@/components/ui/button'

type AnalysisState = 'idle' | 'analyzing' | 'complete' | 'error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnalysisResult = any

export default function DesignAnalyzerPage() {
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

  const t = locale === 'de' ? {
    badge: 'Kostenloser Design Check',
    title: 'Design Analyzer',
    description: 'Prüfen Sie Favicon, Open Graph Tags, Mobile-Optimierung und Social Media Preview Ihrer Website.',
    steps: [
      'Website wird geladen...',
      'Viewport wird geprüft...',
      'Icons werden gesucht...',
      'Open Graph Tags analysieren...',
      'Twitter Card prüfen...',
      'Ergebnisse aufbereiten...',
    ],
    analyzing: 'Analysiere Design...',
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    tryAgain: 'Erneut versuchen',
    unlockReport: 'Vollständigen Report freischalten',
    lockedMessage: 'Geben Sie Ihre E-Mail ein, um alle Details und Lösungen zu sehen',
    issues: 'Gefundene Probleme',
    startNew: 'Neue Analyse',
  } : {
    badge: 'Free Design Check',
    title: 'Design Analyzer',
    description: 'Check your favicon, Open Graph tags, mobile optimization, and social media preview.',
    steps: [
      'Loading website...',
      'Checking viewport...',
      'Looking for icons...',
      'Analyzing Open Graph tags...',
      'Checking Twitter Card...',
      'Preparing results...',
    ],
    analyzing: 'Analyzing design...',
    errorGeneric: 'An error occurred. Please try again.',
    tryAgain: 'Try Again',
    unlockReport: 'Unlock Full Report',
    lockedMessage: 'Enter your email to see all details and solutions',
    issues: 'Found Issues',
    startNew: 'New Analysis',
  }

  const handleAnalyze = useCallback(async (url: string) => {
    setState('analyzing')
    setProgress(0)
    setError(null)
    setResult(null)
    setIsUnlocked(false)
    setAnalyzingUrl(url)

    // Simulate progress
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
      setCurrentStep(locale === 'de' ? 'Fertig!' : 'Done!')

      // Small delay before showing results
      await new Promise(resolve => setTimeout(resolve, 500))

      setResult(data.result)
      setAnalysisId(data.id)
      setState('complete')
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : t.errorGeneric)
      setState('error')
    }
  }, [locale, t.steps, t.errorGeneric])

  const handleUnlock = useCallback(async (data: LeadData) => {
    try {
      // Submit lead data
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'design-analyzer',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit')
      }

      // Unlock the analysis
      if (analysisId) {
        await fetch(`/api/tools/design?id=${analysisId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ unlocked: true }),
        }).catch(() => {
          // Non-critical, continue anyway
        })
      }

      setIsUnlocked(true)
      setShowLeadModal(false)
    } catch (err) {
      throw err
    }
  }, [analysisId])

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
            placeholder={locale === 'de' ? 'https://ihre-website.at' : 'https://your-website.com'}
            buttonText={locale === 'de' ? 'Design prüfen' : 'Check Design'}
          />
        </ToolHero>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: '📱', label: locale === 'de' ? 'Mobile Check' : 'Mobile Check' },
                { icon: '🖼️', label: 'Open Graph' },
                { icon: '🎨', label: 'Favicon & Icons' },
                { icon: '🐦', label: 'Twitter Card' },
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-xl border">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-medium">{feature.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ToolFaq
          title={locale === 'de' ? 'Häufige Fragen zum Design Check' : 'Design Check FAQ'}
          subtitle={locale === 'de'
            ? 'Antworten auf die wichtigsten Fragen zu Mobile-Optimierung und Social Media Previews.'
            : 'Answers to the most common questions about mobile optimization and social media previews.'}
          faqs={designAnalyzerFaqs}
        />
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
          <h2 className="text-2xl font-bold">{locale === 'de' ? 'Analyse fehlgeschlagen' : 'Analysis Failed'}</h2>
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
                  title={locale === 'de' ? 'Design Analyse Ergebnis' : 'Design Analysis Result'}
                  score={result?.score}
                  toolName="Design Analyzer"
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
        toolName="design-analyzer"
        analyzedUrl={result?.url}
        benefits={locale === 'de' ? [
          'Alle Design-Details',
          'Social Media Vorschau',
          'Konkrete Optimierungstipps',
        ] : [
          'All design details',
          'Social media preview',
          'Concrete optimization tips',
        ]}
      />
    </>
  )
}
