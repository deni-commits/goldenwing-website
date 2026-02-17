'use client'

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Globe } from 'lucide-react'
import { ToolHero, ToolHeroCompact } from '@/components/tools/shared/tool-hero'
import { UrlInput } from '@/components/tools/shared/url-input'
import { AnalyzingState, ResultSkeleton } from '@/components/tools/shared/result-skeleton'
import { LeadCaptureModal, type LeadData } from '@/components/tools/shared/lead-capture-modal'
import { IssueList } from '@/components/tools/shared/issue-list'
import { ToolFaq, websiteAnalyzerFaqs } from '@/components/tools/shared/tool-faq'
import { ServiceRecommendations } from '@/components/tools/shared/service-recommendations'
import { ShareButton } from '@/components/tools/shared/share-button'
import { FullAnalysisResult } from '@/components/tools/combined'
import { Button } from '@/components/ui/button'

type AnalysisState = 'idle' | 'analyzing' | 'complete' | 'error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnalysisResult = any

export default function WebsiteAnalyzerPage() {
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
    badge: 'Komplette Website Analyse',
    title: 'Website Analyzer',
    description: 'SEO, Performance, Design und Security - alles in einer umfassenden Analyse.',
    steps: [
      'Verbindung wird aufgebaut...',
      'SEO analysieren...',
      'Performance messen...',
      'Design prüfen...',
      'Security testen...',
      'Ergebnisse aufbereiten...',
    ],
    analyzing: 'Analysiere Website...',
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    tryAgain: 'Erneut versuchen',
    unlockReport: 'Vollständigen Report freischalten',
    lockedMessage: 'Geben Sie Ihre E-Mail ein, um alle Details und Lösungen zu sehen',
    issues: 'Gefundene Probleme',
    startNew: 'Neue Analyse',
    features: {
      seo: { label: 'SEO Analyse', desc: 'Meta-Tags, Struktur, Schema' },
      perf: { label: 'Performance', desc: 'Core Web Vitals, Speed' },
      design: { label: 'Design Check', desc: 'Mobile, Social Previews' },
      security: { label: 'Security', desc: 'SSL, Headers, HTTPS' },
    },
  } : {
    badge: 'Complete Website Analysis',
    title: 'Website Analyzer',
    description: 'SEO, Performance, Design and Security - all in one comprehensive analysis.',
    steps: [
      'Establishing connection...',
      'Analyzing SEO...',
      'Measuring performance...',
      'Checking design...',
      'Testing security...',
      'Preparing results...',
    ],
    analyzing: 'Analyzing website...',
    errorGeneric: 'An error occurred. Please try again.',
    tryAgain: 'Try Again',
    unlockReport: 'Unlock Full Report',
    lockedMessage: 'Enter your email to see all details and solutions',
    issues: 'Found Issues',
    startNew: 'New Analysis',
    features: {
      seo: { label: 'SEO Analysis', desc: 'Meta tags, structure, schema' },
      perf: { label: 'Performance', desc: 'Core Web Vitals, Speed' },
      design: { label: 'Design Check', desc: 'Mobile, social previews' },
      security: { label: 'Security', desc: 'SSL, headers, HTTPS' },
    },
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
      currentProgress += Math.random() * 12
      if (currentProgress > 90) currentProgress = 90
      setProgress(currentProgress)

      const stepIndex = Math.min(Math.floor(currentProgress / (100 / steps.length)), steps.length - 1)
      setCurrentStep(steps[stepIndex])
    }, 600)

    try {
      const response = await fetch('/api/tools/analyze', {
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
          source: 'website-analyzer',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit')
      }

      // Unlock the analysis
      if (analysisId) {
        await fetch(`/api/tools/analyze?id=${analysisId}`, {
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
          icon={<Globe className="h-5 w-5" />}
        >
          <UrlInput
            onSubmit={handleAnalyze}
            placeholder={locale === 'de' ? 'https://ihre-website.at' : 'https://your-website.com'}
            buttonText={locale === 'de' ? 'Website analysieren' : 'Analyze Website'}
          />
        </ToolHero>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: '🔍', ...t.features.seo },
                { icon: '⚡', ...t.features.perf },
                { icon: '🎨', ...t.features.design },
                { icon: '🔒', ...t.features.security },
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-xl border hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-medium mb-1">{feature.label}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <ToolFaq
          title={locale === 'de' ? 'Häufige Fragen zum Website Analyzer' : 'Website Analyzer FAQ'}
          subtitle={locale === 'de'
            ? 'Antworten auf die wichtigsten Fragen zu unserer umfassenden Website-Analyse.'
            : 'Answers to the most common questions about our comprehensive website analysis.'}
          faqs={websiteAnalyzerFaqs}
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
        score={result?.overallScore}
        locale={locale}
      />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {result ? (
            <div className="space-y-8">
              <FullAnalysisResult
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
                    category: issue.category || 'general',
                  })) || []}
                  isLocked={!isUnlocked}
                  lockedMessage={t.lockedMessage}
                  onUnlock={() => setShowLeadModal(true)}
                  maxVisible={isUnlocked ? undefined : 3}
                />
              </div>

              {/* Service Recommendations */}
              <ServiceRecommendations
                score={result.overallScore || 0}
                category="combined"
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
                  title={locale === 'de' ? 'Website Analyse Ergebnis' : 'Website Analysis Result'}
                  score={result?.overallScore}
                  toolName="Website Analyzer"
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
        toolName="website-analyzer"
        analyzedUrl={result?.url}
        benefits={locale === 'de' ? [
          'Vollständige SEO-Analyse',
          'Performance-Optimierungen',
          'Design-Empfehlungen',
          'Security-Details',
        ] : [
          'Complete SEO analysis',
          'Performance optimizations',
          'Design recommendations',
          'Security details',
        ]}
      />
    </>
  )
}
