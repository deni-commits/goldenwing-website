'use client'

import { FAQSection, type FAQItem } from '@/components/sections/faq-section'

interface ToolFaqProps {
  title: string
  subtitle?: string
  faqs: FAQItem[]
  className?: string
}

export function ToolFaq({ title, subtitle, faqs, className }: ToolFaqProps) {
  return (
    <FAQSection
      title={title}
      subtitle={subtitle}
      items={faqs}
      className={className}
    />
  )
}

// Re-export FAQItem type for convenience
export type { FAQItem }

// Pre-defined FAQs for each tool
export const seoCheckerFaqs: FAQItem[] = [
  {
    question: 'Was wird beim SEO Check analysiert?',
    answer: 'Unser SEO Checker analysiert Meta-Tags (Title, Description), Überschriften-Struktur (H1-H6), Bilder und Alt-Texte, Schema Markup, Canonical URLs, Sitemap, Robots.txt sowie Open Graph Tags für Social Media.',
  },
  {
    question: 'Ist der SEO Check wirklich kostenlos?',
    answer: 'Ja, der SEO Check ist 100% kostenlos und ohne Registrierung nutzbar. Sie erhalten sofort Ergebnisse zu den wichtigsten SEO-Faktoren Ihrer Website.',
  },
  {
    question: 'Wie oft sollte ich meine Website prüfen?',
    answer: 'Wir empfehlen, Ihre Website mindestens einmal pro Monat zu prüfen, oder nach größeren Änderungen an Inhalten oder Struktur. Regelmäßige Checks helfen, SEO-Probleme frühzeitig zu erkennen.',
  },
  {
    question: 'Was bedeuten die verschiedenen Scores?',
    answer: '90-100 Punkte: Ausgezeichnet - Ihre SEO ist sehr gut optimiert. 70-89 Punkte: Gut - Es gibt noch Optimierungspotenzial. 50-69 Punkte: Verbesserungsbedarf - Wichtige SEO-Faktoren fehlen. Unter 50 Punkte: Kritisch - Dringende Optimierung empfohlen.',
  },
  {
    question: 'Wie kann ich meinen SEO Score verbessern?',
    answer: 'Beheben Sie zunächst kritische Probleme wie fehlende Meta-Descriptions oder H1-Überschriften. Optimieren Sie dann Ihre Titel auf 50-60 Zeichen und Descriptions auf 150-160 Zeichen. Fügen Sie Alt-Texte zu allen Bildern hinzu und implementieren Sie Schema Markup.',
  },
]

export const performanceCheckerFaqs: FAQItem[] = [
  {
    question: 'Was sind Core Web Vitals?',
    answer: 'Core Web Vitals sind Google-Metriken für Nutzererfahrung: LCP (Largest Contentful Paint) misst Ladezeit, FCP (First Contentful Paint) die erste Anzeige, CLS (Cumulative Layout Shift) die visuelle Stabilität, und TBT (Total Blocking Time) die Interaktivität.',
  },
  {
    question: 'Warum ist Website-Geschwindigkeit wichtig?',
    answer: 'Schnelle Websites haben bessere Rankings bei Google, niedrigere Absprungraten und höhere Conversion-Raten. Studien zeigen: Jede Sekunde Verzögerung kann die Conversion um 7% reduzieren.',
  },
  {
    question: 'Was ist ein guter LCP-Wert?',
    answer: 'Ein guter LCP-Wert liegt unter 2,5 Sekunden. Werte zwischen 2,5-4 Sekunden benötigen Verbesserung, über 4 Sekunden sind kritisch. LCP misst, wie schnell der größte sichtbare Inhalt geladen wird.',
  },
  {
    question: 'Wie kann ich meine Website schneller machen?',
    answer: 'Optimieren Sie Bilder (WebP-Format, Komprimierung), aktivieren Sie Browser-Caching, minimieren Sie CSS/JavaScript, nutzen Sie ein CDN, und reduzieren Sie Server-Antwortzeiten. Lazy Loading für Bilder kann ebenfalls helfen.',
  },
  {
    question: 'Werden Mobile und Desktop separat getestet?',
    answer: 'Ja, unser Performance Checker testet beide Varianten. Mobile-Performance ist besonders wichtig, da Google Mobile-First-Indexierung verwendet und über 60% des Traffics von mobilen Geräten kommt.',
  },
]

export const designAnalyzerFaqs: FAQItem[] = [
  {
    question: 'Was bedeutet "Mobile-Friendly"?',
    answer: 'Eine mobile-friendly Website passt sich automatisch an verschiedene Bildschirmgrößen an, hat gut lesbare Texte ohne Zoomen, ausreichend große Touch-Elemente und keine horizontalen Scrollbars auf mobilen Geräten.',
  },
  {
    question: 'Was sind Open Graph Tags?',
    answer: 'Open Graph Tags steuern, wie Ihre Website auf Social Media (Facebook, LinkedIn, etc.) angezeigt wird. Sie definieren Titel, Beschreibung und Vorschaubild für geteilte Links.',
  },
  {
    question: 'Warum brauche ich ein Favicon?',
    answer: 'Ein Favicon ist das kleine Icon in Browser-Tabs und Lesezeichen. Es stärkt Ihre Markenidentität, verbessert die Wiedererkennung und wirkt professioneller. Ohne Favicon erscheint ein generisches Symbol.',
  },
  {
    question: 'Was ist eine Twitter Card?',
    answer: 'Twitter Cards sind spezielle Meta-Tags, die bestimmen, wie Ihre Links auf Twitter/X angezeigt werden. Mit optimierten Cards bekommen Ihre Tweets mehr Aufmerksamkeit und Klicks.',
  },
  {
    question: 'Wie wichtig ist das OG-Image?',
    answer: 'Sehr wichtig! Posts mit ansprechenden Vorschaubildern erhalten bis zu 150% mehr Engagement. Das optimale Format ist 1200x630 Pixel. Ohne OG-Image wählt die Plattform ein zufälliges Bild.',
  },
]

export const securityCheckerFaqs: FAQItem[] = [
  {
    question: 'Warum ist HTTPS wichtig?',
    answer: 'HTTPS verschlüsselt die Datenübertragung zwischen Browser und Server, schützt sensible Daten und ist ein Google-Rankingfaktor. Browser markieren HTTP-Seiten als "Nicht sicher", was Besucher abschreckt.',
  },
  {
    question: 'Was sind Security Headers?',
    answer: 'Security Headers sind HTTP-Antwort-Header, die Sicherheitsrichtlinien definieren. Wichtige Header sind: Content-Security-Policy (verhindert XSS), X-Frame-Options (verhindert Clickjacking), und Strict-Transport-Security (erzwingt HTTPS).',
  },
  {
    question: 'Was ist Mixed Content?',
    answer: 'Mixed Content tritt auf, wenn eine HTTPS-Seite HTTP-Ressourcen (Bilder, Scripts) lädt. Dies ist ein Sicherheitsrisiko und wird von Browsern blockiert oder gewarnt. Alle Ressourcen sollten über HTTPS geladen werden.',
  },
  {
    question: 'Wie lange ist ein SSL-Zertifikat gültig?',
    answer: 'SSL-Zertifikate sind typischerweise 1-2 Jahre gültig. Let\'s Encrypt Zertifikate sind 90 Tage gültig, aber automatisch erneuerbar. Unser Check zeigt Ihnen das Ablaufdatum, damit Sie rechtzeitig erneuern können.',
  },
  {
    question: 'Was passiert bei abgelaufenem SSL?',
    answer: 'Bei abgelaufenem SSL-Zertifikat zeigen Browser eine Warnseite an, die Besucher abschreckt. Google stuft die Seite in Rankings herab. E-Commerce-Seiten können keine sicheren Zahlungen mehr verarbeiten.',
  },
]

export const websiteAnalyzerFaqs: FAQItem[] = [
  {
    question: 'Was analysiert der Website Analyzer?',
    answer: 'Der Website Analyzer führt vier umfassende Checks durch: SEO-Analyse (Meta-Tags, Struktur, Schema), Performance-Test (Core Web Vitals, Ladezeiten), Design-Check (Mobile, Social Preview) und Security-Audit (SSL, Headers).',
  },
  {
    question: 'Wie wird der Gesamt-Score berechnet?',
    answer: 'Der Gesamt-Score ist ein gewichteter Durchschnitt aller vier Kategorien: SEO (30%), Performance (30%), Design (20%) und Security (20%). So erhalten Sie einen umfassenden Überblick über den Zustand Ihrer Website.',
  },
  {
    question: 'Wie lange dauert die Analyse?',
    answer: 'Eine vollständige Analyse dauert etwa 30-60 Sekunden. Der Performance-Check benötigt die meiste Zeit, da er echte Ladezeiten über die Google PageSpeed API misst.',
  },
  {
    question: 'Kann ich den Report herunterladen?',
    answer: 'Ja! Nach Eingabe Ihrer E-Mail-Adresse erhalten Sie Zugang zum vollständigen Report mit allen Details und können ihn als PDF herunterladen. Der Report enthält auch konkrete Handlungsempfehlungen.',
  },
  {
    question: 'Für wen ist der Website Analyzer geeignet?',
    answer: 'Der Analyzer ist ideal für Website-Betreiber, Marketing-Manager, SEO-Spezialisten und Agenturen, die einen schnellen Überblick über den technischen Zustand einer Website benötigen.',
  },
]
