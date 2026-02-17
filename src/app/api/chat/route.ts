import { createGroq } from '@ai-sdk/groq'
import { streamText } from 'ai'
import { z } from 'zod'
import { systemPrompt } from '@/lib/openai/prompts'
import { rateLimit, getClientIP } from '@/lib/security/rate-limit'
import { sanitizeString, containsXSS } from '@/lib/security/sanitize'
import { logRateLimitExceeded, logXSSAttempt } from '@/lib/security/logging'

// Initialize Groq client
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export const maxDuration = 30

// Validate message structure
const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(2000), // Limit message length
})

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20), // Limit conversation length
})

export async function POST(req: Request) {
  try {
    const clientIP = getClientIP(req)

    // Strict rate limiting for chat API: 10 requests per minute
    const rateLimitResult = rateLimit(`chat:${clientIP}`, {
      maxRequests: 10,
      windowMs: 60000, // 1 minute
    })

    if (!rateLimitResult.success) {
      logRateLimitExceeded(clientIP, '/api/chat', 10 - rateLimitResult.remaining)
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait before sending another message.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
          },
        }
      )
    }

    const body = await req.json()

    // Validate request structure
    const validationResult = chatRequestSchema.safeParse(body)
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { messages } = validationResult.data

    // Sanitize and check messages for malicious content
    const sanitizedMessages = messages.map((msg) => {
      const sanitizedContent = sanitizeString(msg.content)

      // Check for XSS or injection attempts
      if (containsXSS(msg.content)) {
        logXSSAttempt(clientIP, '/api/chat', msg.content)
        throw new Error('Invalid content detected')
      }

      return {
        role: msg.role,
        content: sanitizedContent,
      }
    })

    // Check last message isn't too long (prevent token abuse)
    const lastMessage = sanitizedMessages[sanitizedMessages.length - 1]
    if (lastMessage.content.length > 1000) {
      return new Response(
        JSON.stringify({ error: 'Message too long. Please shorten your message.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt + '\n\nWICHTIG: Halte deine Antworten kurz und prägnant (maximal 2-3 Absätze).',
      messages: sanitizedMessages,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid content detected') {
      return new Response(
        JSON.stringify({ error: 'Invalid content detected' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
