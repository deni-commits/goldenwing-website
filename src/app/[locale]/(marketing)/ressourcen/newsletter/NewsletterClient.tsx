'use client'

import { useState } from 'react'
import { Link } from '@/lib/i18n-navigation'
import { Mail, CheckCircle2, Gift, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { FAQSection } from '@/components/sections/faq-section'
import { Container } from '@/components/ui/container'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  gift: Gift,
  trendingUp: TrendingUp,
  zap: Zap,
  mail: Mail,
}

interface NewsletterClientProps {
  locale: string
  content: {
    heroTitle: string
    heroDescription: string
    benefits: Array<{ icon: string; title: string; description: string }>
    formTitle: string
    firstNameLabel: string
    emailLabel: string
    consentText: string
    submitButton: string
    formNote: string
    successTitle: string
    successDescription: string
    successSteps: Array<{ text: string }>
    whatToExpectTitle: string
    expectations: Array<{ title: string; description: string }>
    faqTitle: string
    faqs: Array<{ question: string; answer: string }>
  }
}

export default function NewsletterClient({ locale, content }: NewsletterClientProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !consent) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        const data = await response.json()
        alert(data.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
      }
    } catch {
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-500/10 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {content.successTitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {content.successDescription}
            </p>
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">
                {locale === 'de' ? 'Was passiert als Nächstes?' : 'What Happens Next?'}
              </h3>
              <ul className="text-left text-sm text-muted-foreground space-y-2">
                {content.successSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{step.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container variant="block">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {content.heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground">
              {content.heroDescription}
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="pb-16">
        <Container variant="block">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {content.benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || Gift
              return (
                <div key={index} className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Newsletter Form */}
      <section className="pb-20">
        <Container variant="block">
          <div className="max-w-xl mx-auto">
            <div className="bg-card rounded-2xl border p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {content.formTitle}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{content.firstNameLabel}</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder={locale === 'de' ? 'Max' : 'John'}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{content.emailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={locale === 'de' ? 'max@beispiel.at' : 'john@example.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                    required
                  />
                  <Label
                    htmlFor="consent"
                    className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                  >
                    {content.consentText}{' '}
                    <Link href="/datenschutz" className="text-primary hover:underline">
                      {locale === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                    </Link>
                    .
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!email || !consent || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      {locale === 'de' ? 'Wird angemeldet...' : 'Subscribing...'}
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      {content.submitButton}
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-6">
                {content.formNote}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-muted/50">
        <Container variant="block">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {content.whatToExpectTitle}
            </h2>

            <div className="space-y-4">
              {content.expectations.map((item, index) => (
                <div key={index} className="flex gap-4 bg-card rounded-lg p-6">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <FAQSection
          title={content.faqTitle}
          items={content.faqs}
        />
      )}
    </>
  )
}
