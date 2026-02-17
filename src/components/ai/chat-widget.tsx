'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { MessageCircle, X, Send, Loader2, Bot, User, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

// Batched update interval to prevent TBT spikes from per-chunk state updates
const STREAM_UPDATE_INTERVAL = 50 // ms

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface LeadData {
  name: string
  contact: string
}

type LeadCaptureStep = 'idle' | 'asking-name' | 'asking-contact' | 'submitting' | 'success'

export function ChatWidget() {
  const t = useTranslations('chat')

  // Delay loading by 5 seconds to improve initial TBT (Total Blocking Time)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [leadCaptureStep, setLeadCaptureStep] = useState<LeadCaptureStep>('idle')
  const [leadData, setLeadData] = useState<LeadData>({ name: '', contact: '' })
  const [leadError, setLeadError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, leadCaptureStep])

  // Start lead capture flow
  function startLeadCapture() {
    setLeadCaptureStep('asking-name')
    setLeadData({ name: '', contact: '' })
    setLeadError('')

    // Add bot message asking for name
    const botMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Gerne leite ich Ihre Anfrage weiter! Wie darf ich Sie ansprechen?',
    }
    setMessages((prev) => [...prev, botMessage])
  }

  // Handle lead form submission
  async function handleLeadSubmit(e: FormEvent) {
    e.preventDefault()
    setLeadError('')

    if (leadCaptureStep === 'asking-name') {
      if (!leadData.name.trim()) {
        setLeadError('Bitte geben Sie Ihren Namen ein')
        return
      }
      setLeadCaptureStep('asking-contact')

      // Add user message with name
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: leadData.name,
      }
      // Add bot message asking for contact
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Danke ${leadData.name.split(' ')[0]}! Wie erreichen wir Sie am besten – Email oder Telefon?`,
      }
      setMessages((prev) => [...prev, userMessage, botMessage])
      return
    }

    if (leadCaptureStep === 'asking-contact') {
      if (!leadData.contact.trim()) {
        setLeadError('Bitte geben Sie Ihre Email oder Telefonnummer ein')
        return
      }

      // Add user message with contact
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: leadData.contact,
      }
      setMessages((prev) => [...prev, userMessage])

      setLeadCaptureStep('submitting')

      try {
        // Generate summary from chat history
        const summary = generateSummary(messages)

        const response = await fetch('/api/chat-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: leadData.name.trim(),
            contact: leadData.contact.trim(),
            summary,
            chatHistory: messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to submit lead')
        }

        setLeadCaptureStep('success')

        // Add success message
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `✅ Perfekt! Ich habe Ihre Anfrage weitergeleitet.\n\nDeni oder Benedikt meldet sich in der Regel innerhalb von 24 Stunden bei Ihnen.\n\nDanke für Ihr Interesse an GoldenWing!`,
        }
        setMessages((prev) => [...prev, botMessage])
      } catch {
        setLeadError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
        setLeadCaptureStep('asking-contact')
      }
    }
  }

  // Generate a summary of the conversation
  function generateSummary(msgs: Message[]): string {
    const userMessages = msgs.filter((m) => m.role === 'user')
    if (userMessages.length === 0) return ''

    // Take first few user messages to understand intent
    const intent = userMessages.slice(0, 3).map((m) => m.content).join(' | ')
    return intent.substring(0, 500)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Check if user wants to be contacted
    const contactTriggers = [
      'kontakt', 'anrufen', 'email', 'anfrage', 'termin',
      'erreichen', 'melden', 'zurückrufen', 'call', 'contact',
      'ja gerne', 'ja bitte', 'ja, gerne', 'ja, bitte'
    ]
    const lowerInput = input.toLowerCase()
    const wantsContact = contactTriggers.some((trigger) => lowerInput.includes(trigger))

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error('Chat request failed')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''
      let lastUpdateTime = 0

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Batched update function to prevent TBT spikes
      const updateMessageContent = (content: string, force = false) => {
        const now = Date.now()
        if (force || now - lastUpdateTime >= STREAM_UPDATE_INTERVAL) {
          lastUpdateTime = now
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id ? { ...m, content } : m
            )
          )
        }
      }

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        assistantContent += decoder.decode(value, { stream: true })
        updateMessageContent(assistantContent)
      }

      // Final update to ensure all content is shown
      updateMessageContent(assistantContent, true)

      // After 3+ messages and user shows interest, offer lead capture
      if (messages.length >= 4 && wantsContact && leadCaptureStep === 'idle') {
        setTimeout(() => {
          startLeadCapture()
        }, 1500)
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: t('errorMessage'),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSuggestionClick(suggestion: string) {
    setInput(suggestion)
  }

  // Render lead capture form input
  function renderLeadInput() {
    if (leadCaptureStep === 'idle' || leadCaptureStep === 'success') {
      return null
    }

    return (
      <form onSubmit={handleLeadSubmit} className="p-4 border-t bg-background">
        {leadError && (
          <p className="text-xs text-destructive mb-2">{leadError}</p>
        )}
        <div className="flex gap-2">
          {leadCaptureStep === 'asking-name' && (
            <Input
              value={leadData.name}
              onChange={(e) => setLeadData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Ihr Name"
              autoFocus
              className="flex-1"
            />
          )}
          {leadCaptureStep === 'asking-contact' && (
            <Input
              value={leadData.contact}
              onChange={(e) => setLeadData((prev) => ({ ...prev, contact: e.target.value }))}
              placeholder="Email oder Telefon"
              autoFocus
              className="flex-1"
            />
          )}
          {leadCaptureStep === 'submitting' && (
            <div className="flex-1 flex items-center justify-center py-2">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Wird gesendet...</span>
            </div>
          )}
          {leadCaptureStep !== 'submitting' && (
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    )
  }

  // Don't render anything until 5 seconds after page load (TBT optimization)
  if (!mounted) return null

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className={cn(
          'fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg',
          'bg-primary hover:bg-primary/90',
          'transition-[transform,opacity] duration-300',
          isOpen && 'scale-0 opacity-0'
        )}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">{t('openChat')}</span>
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]',
          'bg-background border rounded-2xl shadow-2xl',
          'flex flex-col overflow-hidden',
          'transition-[transform,opacity] duration-300 origin-bottom-right',
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        )}
        style={{ height: 'min(600px, calc(100vh - 6rem))' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{t('assistantName')}</h3>
              <p className="text-xs opacity-80">{t('assistantStatus')}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t('closeChat')}</span>
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                {t('welcomeMessage')}
              </p>
              <div className="mt-4 space-y-2">
                <SuggestionChip onClick={() => handleSuggestionClick(t('suggestions.services'))}>
                  {t('suggestions.services')}
                </SuggestionChip>
                <SuggestionChip onClick={() => handleSuggestionClick(t('suggestions.process'))}>
                  {t('suggestions.process')}
                </SuggestionChip>
                <SuggestionChip onClick={() => handleSuggestionClick(t('suggestions.pricing'))}>
                  {t('suggestions.pricing')}
                </SuggestionChip>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={cn(
                  'rounded-2xl px-4 py-2 max-w-[80%]',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted rounded-bl-md'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-foreground/30 animate-bounce" />
                </div>
              </div>
            </div>
          )}

          {/* Contact Button - show after some messages if not in lead capture */}
          {messages.length >= 2 && leadCaptureStep === 'idle' && (
            <div className="flex justify-center pt-2">
              <button
                onClick={startLeadCapture}
                className="flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              >
                <Mail className="h-3 w-3" />
                Kontakt aufnehmen
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input - show lead form or regular input */}
        {leadCaptureStep !== 'idle' && leadCaptureStep !== 'success' ? (
          renderLeadInput()
        ) : (
          <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('placeholder')}
                disabled={isLoading || leadCaptureStep === 'success'}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim() || leadCaptureStep === 'success'}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">{t('send')}</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

function SuggestionChip({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-block text-xs px-3 py-1.5 rounded-full border hover:bg-muted transition-colors"
    >
      {children}
    </button>
  )
}
