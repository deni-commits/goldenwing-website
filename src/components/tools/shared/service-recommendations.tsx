'use client'

import { ArrowRight, AlertTriangle, Trophy, TrendingUp } from 'lucide-react'
import { Link } from '@/lib/i18n-navigation'
import { cn } from '@/lib/utils'

interface ServiceRecommendation {
  title: string
  description: string
  href: string
  icon: string
  priority: 'high' | 'medium' | 'low'
}

interface ServiceRecommendationsProps {
  score: number
  category: 'seo' | 'performance' | 'design' | 'security' | 'combined'
  criticalIssues?: number
  locale?: string
  className?: string
}

// Get personalized message and styling based on score
function getScoreContext(score: number, criticalIssues: number, isGerman: boolean) {
  if (score >= 90) {
    return {
      icon: Trophy,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-500/10',
      heading: isGerman ? 'Ausgezeichnet!' : 'Excellent!',
      message: isGerman
        ? 'Ihre Website ist in Top-Zustand. Hier sind optionale Verbesserungen:'
        : 'Your website is in top condition. Here are optional improvements:',
      urgency: 'low' as const,
    }
  }
  if (score >= 70) {
    return {
      icon: TrendingUp,
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      heading: isGerman ? 'Gut, aber Potenzial vorhanden' : 'Good, but potential available',
      message: isGerman
        ? 'Mit gezielten Optimierungen können Sie Ihre Rankings deutlich verbessern:'
        : 'With targeted optimizations, you can significantly improve your rankings:',
      urgency: 'medium' as const,
    }
  }
  if (score >= 50) {
    return {
      icon: AlertTriangle,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      heading: isGerman ? 'Verbesserungsbedarf erkannt' : 'Improvement needed',
      message: isGerman
        ? `${criticalIssues > 0 ? `${criticalIssues} kritische Probleme gefunden. ` : ''}Diese Services helfen Ihnen am meisten:`
        : `${criticalIssues > 0 ? `${criticalIssues} critical issues found. ` : ''}These services will help you the most:`,
      urgency: 'high' as const,
    }
  }
  return {
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-500/10',
    heading: isGerman ? 'Dringender Handlungsbedarf!' : 'Urgent action needed!',
    message: isGerman
      ? `Ihre Website hat ${criticalIssues > 0 ? criticalIssues + ' kritische' : 'erhebliche'} Probleme. Wir empfehlen dringend:`
      : `Your website has ${criticalIssues > 0 ? criticalIssues + ' critical' : 'significant'} issues. We strongly recommend:`,
    urgency: 'critical' as const,
  }
}

export function ServiceRecommendations({
  score,
  category,
  criticalIssues = 0,
  locale = 'de',
  className,
}: ServiceRecommendationsProps) {
  const isGerman = locale === 'de'

  // Determine recommendations based on score and category
  const recommendations = getRecommendations(score, category, criticalIssues, isGerman)
  const scoreContext = getScoreContext(score, criticalIssues, isGerman)

  // Don't show if score is very high and no recommendations
  if (score >= 90 && recommendations.length === 0) return null
  if (recommendations.length === 0) return null

  const Icon = scoreContext.icon

  return (
    <section className={cn(
      'py-12 rounded-2xl',
      scoreContext.urgency === 'critical' ? 'bg-gradient-to-br from-red-500/10 via-background to-red-500/5' :
      scoreContext.urgency === 'high' ? 'bg-gradient-to-br from-orange-500/10 via-background to-orange-500/5' :
      'bg-gradient-to-br from-primary/5 via-background to-primary/10',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Personalized Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className={cn('p-3 rounded-xl', scoreContext.bgColor)}>
              <Icon className={cn('h-6 w-6', scoreContext.iconColor)} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{scoreContext.heading}</h2>
              <p className="text-muted-foreground">{scoreContext.message}</p>
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec, index) => (
              <Link
                key={index}
                href={rec.href as '/kontakt'}
                className={cn(
                  'group flex items-start gap-4 p-5 rounded-xl border bg-background hover:border-primary/50 hover:shadow-lg transition-all duration-300',
                  rec.priority === 'high' && 'border-primary/30 bg-primary/5'
                )}
              >
                <div className="text-2xl shrink-0">{rec.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {rec.title}
                    </h3>
                    {rec.priority === 'high' && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                        {isGerman ? 'Empfohlen' : 'Recommended'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {rec.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          {/* Personalized CTA */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              {score < 50
                ? (isGerman
                    ? 'Lassen Sie uns das Problem gemeinsam lösen – kostenlose Erstanalyse.'
                    : 'Let us solve the problem together – free initial analysis.')
                : score < 70
                  ? (isGerman
                      ? 'Wir zeigen Ihnen genau, wie Sie Ihre Scores verbessern können.'
                      : 'We\'ll show you exactly how to improve your scores.')
                  : (isGerman
                      ? 'Nicht sicher, was Sie brauchen? Wir beraten Sie gerne kostenlos.'
                      : 'Not sure what you need? We\'re happy to advise you for free.')
              }
            </p>
            <Link
              href="/kontakt"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors',
                score < 50
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : score < 70
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              {score < 50
                ? (isGerman ? 'Jetzt Hilfe anfordern' : 'Get Help Now')
                : score < 70
                  ? (isGerman ? 'Kostenlose Beratung' : 'Free Consultation')
                  : (isGerman ? 'Kostenloses Erstgespräch' : 'Free Consultation')
              }
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function getRecommendations(
  score: number,
  category: string,
  criticalIssues: number,
  isGerman: boolean
): ServiceRecommendation[] {
  const recommendations: ServiceRecommendation[] = []

  // SEO-related recommendations
  if (category === 'seo' || category === 'combined') {
    if (score < 70 || criticalIssues > 0) {
      recommendations.push({
        title: isGerman ? 'SEO Optimierung' : 'SEO Optimization',
        description: isGerman
          ? 'Professionelle On-Page SEO, Meta-Tag Optimierung und technisches SEO für bessere Rankings.'
          : 'Professional on-page SEO, meta tag optimization and technical SEO for better rankings.',
        href: '/leistungen/seo-content',
        icon: '🔍',
        priority: score < 50 ? 'high' : 'medium',
      })
    }
    if (score < 80) {
      recommendations.push({
        title: isGerman ? 'Content Strategie' : 'Content Strategy',
        description: isGerman
          ? 'Keyword-Recherche, Content-Planung und SEO-optimierte Texte für mehr organischen Traffic.'
          : 'Keyword research, content planning and SEO-optimized texts for more organic traffic.',
        href: '/leistungen/seo-content/content-strategie-themenplanung',
        icon: '📝',
        priority: 'medium',
      })
    }
  }

  // Performance-related recommendations
  if (category === 'performance' || category === 'combined') {
    if (score < 70) {
      recommendations.push({
        title: isGerman ? 'Performance Optimierung' : 'Performance Optimization',
        description: isGerman
          ? 'Ladezeit-Optimierung, Core Web Vitals Verbesserung und technische Website-Optimierung.'
          : 'Load time optimization, Core Web Vitals improvement and technical website optimization.',
        href: '/leistungen/webdesign/webentwicklung-cms',
        icon: '⚡',
        priority: score < 50 ? 'high' : 'medium',
      })
    }
  }

  // Design-related recommendations
  if (category === 'design' || category === 'combined') {
    if (score < 70) {
      recommendations.push({
        title: isGerman ? 'Webdesign & UX' : 'Web Design & UX',
        description: isGerman
          ? 'Modernes, responsives Design mit optimaler Nutzererfahrung auf allen Geräten.'
          : 'Modern, responsive design with optimal user experience on all devices.',
        href: '/leistungen/webdesign',
        icon: '🎨',
        priority: score < 50 ? 'high' : 'medium',
      })
    }
    if (score < 80) {
      recommendations.push({
        title: isGerman ? 'Brand Identity' : 'Brand Identity',
        description: isGerman
          ? 'Konsistente visuelle Identität, Logo-Design und Brand Guidelines.'
          : 'Consistent visual identity, logo design and brand guidelines.',
        href: '/leistungen/branding/visuelle-identitaet',
        icon: '✨',
        priority: 'low',
      })
    }
  }

  // Security-related recommendations
  if (category === 'security' || category === 'combined') {
    if (score < 70) {
      recommendations.push({
        title: isGerman ? 'Security & Hosting' : 'Security & Hosting',
        description: isGerman
          ? 'Sichere Hosting-Lösungen, SSL-Zertifikate und Security-Header Konfiguration.'
          : 'Secure hosting solutions, SSL certificates and security header configuration.',
        href: '/leistungen/it-cloud-services',
        icon: '🔒',
        priority: score < 50 ? 'high' : 'medium',
      })
    }
  }

  // General recommendations for low scores
  if (score < 60 && category === 'combined') {
    recommendations.unshift({
      title: isGerman ? 'Website Relaunch' : 'Website Relaunch',
      description: isGerman
        ? 'Kompletter Neustart mit modernem Design, optimaler Performance und SEO-Grundlage.'
        : 'Complete restart with modern design, optimal performance and SEO foundation.',
      href: '/leistungen/pakete/brand-web-foundation',
      icon: '🚀',
      priority: 'high',
    })
  }

  // Limit to 4 recommendations max
  return recommendations.slice(0, 4)
}
