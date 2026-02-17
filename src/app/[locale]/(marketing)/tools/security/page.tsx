'use client'

import { useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Shield, Lock, Key, AlertTriangle } from 'lucide-react'
import { ToolHero, ToolHeroCompact } from '@/components/tools/shared/tool-hero'
import { UrlInput } from '@/components/tools/shared/url-input'
import { AnalyzingState, ResultSkeleton } from '@/components/tools/shared/result-skeleton'
import { LeadCaptureModal, type LeadData } from '@/components/tools/shared/lead-capture-modal'
import { IssueList } from '@/components/tools/shared/issue-list'
import { ServiceRecommendations } from '@/components/tools/shared/service-recommendations'
import { ShareButton } from '@/components/tools/shared/share-button'
import { SecurityResult } from '@/components/tools/security'
import { Button } from '@/components/ui/button'

type AnalysisState = 'idle' | 'analyzing' | 'complete' | 'error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnalysisResult = any

export default function SecurityPage() {
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
    badge: 'Cyber Security Check',
    title: 'Cyber Security Check',
    description: isRussian
      ? 'Проверьте SSL-сертификат, заголовки безопасности, HTTPS-конфигурацию и безопасность cookies вашего сайта.'
      : isGerman
        ? 'Prüfen Sie SSL-Zertifikat, Security Headers, HTTPS-Konfiguration und Cookie-Sicherheit Ihrer Website.'
        : 'Check SSL certificate, security headers, HTTPS configuration, and cookie security of your website.',
    steps: isRussian
      ? [
          'Установка соединения...',
          'Проверка HTTPS...',
          'Анализ SSL-сертификата...',
          'Проверка заголовков безопасности...',
          'Поиск смешанного контента...',
          'Проверка безопасности cookies...',
          'Подготовка результатов...',
        ]
      : isGerman
        ? [
            'Verbindung wird aufgebaut...',
            'HTTPS-Verbindung prüfen...',
            'SSL-Zertifikat analysieren...',
            'Security Headers prüfen...',
            'Mixed Content suchen...',
            'Cookie-Sicherheit prüfen...',
            'Ergebnisse aufbereiten...',
          ]
        : [
            'Establishing connection...',
            'Checking HTTPS connection...',
            'Analyzing SSL certificate...',
            'Checking security headers...',
            'Looking for mixed content...',
            'Checking cookie security...',
            'Preparing results...',
          ],
    analyzing: isRussian ? 'Анализ безопасности...' : isGerman ? 'Analysiere Sicherheit...' : 'Analyzing security...',
    errorGeneric: isRussian ? 'Произошла ошибка. Попробуйте снова.' : isGerman ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' : 'An error occurred. Please try again.',
    tryAgain: isRussian ? 'Повторить' : isGerman ? 'Erneut versuchen' : 'Try Again',
    unlockReport: isRussian ? 'Получить полный отчет' : isGerman ? 'Vollständigen Report freischalten' : 'Unlock Full Report',
    lockedMessage: isRussian ? 'Введите email, чтобы увидеть все детали и решения' : isGerman ? 'Geben Sie Ihre E-Mail ein, um alle Details und Lösungen zu sehen' : 'Enter your email to see all details and solutions',
    issues: isRussian ? 'Найденные проблемы' : isGerman ? 'Gefundene Probleme' : 'Found Issues',
    startNew: isRussian ? 'Новый анализ' : isGerman ? 'Neue Analyse' : 'New Analysis',
    placeholder: isRussian ? 'https://ваш-сайт.com' : isGerman ? 'https://ihre-website.at' : 'https://your-website.com',
    buttonText: isRussian ? 'Проверить безопасность' : isGerman ? 'Sicherheit prüfen' : 'Check Security',
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
      const response = await fetch('/api/tools/security', {
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
          source: 'security-check',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit')
      }

      if (analysisId) {
        await fetch(`/api/tools/security?id=${analysisId}`, {
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
          icon={<Shield className="h-5 w-5" />}
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
                  icon: <Lock className="h-6 w-6" />,
                  label: 'HTTPS',
                  desc: isRussian ? 'Проверка шифрования' : isGerman ? 'Verschlüsselung prüfen' : 'Check encryption'
                },
                {
                  icon: <Key className="h-6 w-6" />,
                  label: isRussian ? 'SSL-сертификат' : 'SSL-Zertifikat',
                  desc: isRussian ? 'Действительность и издатель' : isGerman ? 'Gültigkeit & Issuer' : 'Validity & Issuer'
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  label: isRussian ? 'Заголовки безопасности' : 'Security Headers',
                  desc: 'CSP, HSTS, etc.'
                },
                {
                  icon: <AlertTriangle className="h-6 w-6" />,
                  label: 'Mixed Content',
                  desc: isRussian ? 'Небезопасные ресурсы' : isGerman ? 'Unsichere Ressourcen' : 'Insecure resources'
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

        {/* Security Headers Explained */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              {isRussian ? 'Проверяемые заголовки безопасности' : isGerman ? 'Geprüfte Security Headers' : 'Checked Security Headers'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                {
                  name: 'Strict-Transport-Security (HSTS)',
                  desc: isRussian ? 'Принудительное HTTPS-соединение' : isGerman ? 'Erzwingt HTTPS-Verbindung' : 'Forces HTTPS connection'
                },
                {
                  name: 'Content-Security-Policy (CSP)',
                  desc: isRussian ? 'Защита от XSS-атак' : isGerman ? 'Schutz vor XSS-Angriffen' : 'Protection against XSS attacks'
                },
                {
                  name: 'X-Frame-Options',
                  desc: isRussian ? 'Предотвращает кликджекинг' : isGerman ? 'Verhindert Clickjacking' : 'Prevents clickjacking'
                },
                {
                  name: 'X-Content-Type-Options',
                  desc: isRussian ? 'Предотвращает MIME-снифинг' : isGerman ? 'Verhindert MIME-Sniffing' : 'Prevents MIME sniffing'
                },
                {
                  name: 'Referrer-Policy',
                  desc: isRussian ? 'Контролирует информацию о реферере' : isGerman ? 'Kontrolliert Referrer-Infos' : 'Controls referrer info'
                },
                {
                  name: 'Permissions-Policy',
                  desc: isRussian ? 'Управляет функциями браузера' : isGerman ? 'Steuert Browser-Features' : 'Controls browser features'
                },
              ].map((header, index) => (
                <div key={index} className="p-4 bg-background rounded-xl border">
                  <h3 className="font-mono text-sm font-bold text-primary mb-1">{header.name}</h3>
                  <p className="text-sm text-muted-foreground">{header.desc}</p>
                </div>
              ))}
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
              <SecurityResult
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
                    category: issue.category || 'security',
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
                category="security"
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
                  title={isRussian ? 'Результат проверки безопасности' : isGerman ? 'Security Check Ergebnis' : 'Security Check Result'}
                  score={result?.score}
                  toolName="Cyber Security Check"
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
        toolName="security-check"
        analyzedUrl={result?.url}
        locale={locale}
        benefits={isRussian ? [
          'Все детали безопасности',
          'Конфигурация заголовков',
          'Информация о SSL-сертификате',
          'Конкретные рекомендации по улучшению',
        ] : isGerman ? [
          'Alle Sicherheitsdetails',
          'Header-Konfiguration',
          'SSL-Zertifikat Info',
          'Konkrete Verbesserungsvorschläge',
        ] : [
          'All security details',
          'Header configuration',
          'SSL certificate info',
          'Concrete improvement suggestions',
        ]}
      />
    </>
  )
}
