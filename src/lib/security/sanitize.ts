/**
 * Input sanitization utilities
 * Prevents XSS, SQL injection, and other malicious input
 */

/**
 * Sanitize a string by removing/escaping dangerous characters
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return ''

  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Escape HTML entities
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Remove potential script injections
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    // Trim whitespace
    .trim()
}

/**
 * Sanitize email - only allow valid email characters
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return ''

  // Remove any characters that aren't valid in emails
  return email
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9@._+-]/g, '')
}

/**
 * Sanitize phone number - only allow digits and common phone characters
 */
export function sanitizePhone(phone: string): string {
  if (typeof phone !== 'string') return ''

  return phone
    .trim()
    .replace(/[^0-9+\-\s()]/g, '')
}

/**
 * Check for common spam patterns
 */
export function isSpam(text: string): boolean {
  const spamPatterns = [
    // Common spam keywords
    /\b(viagra|cialis|casino|lottery|winner|prize|bitcoin|crypto|investment|earn money)\b/i,
    // Too many links
    /(https?:\/\/[^\s]+){3,}/i,
    // Suspicious character patterns
    /(.)\1{10,}/, // Same character repeated 10+ times
    // Russian/Cyrillic spam (common pattern)
    /[\u0400-\u04FF]{20,}/,
    // All caps text over 50 chars
    /[A-Z\s]{50,}/,
  ]

  return spamPatterns.some((pattern) => pattern.test(text))
}

/**
 * Validate that input doesn't contain script tags or event handlers
 */
export function containsXSS(input: string): boolean {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick=, onerror=, etc.
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /<link/gi,
    /<meta/gi,
    /expression\s*\(/gi, // CSS expression
    /url\s*\(\s*["']?\s*javascript:/gi,
  ]

  return xssPatterns.some((pattern) => pattern.test(input))
}

/**
 * Sanitize object recursively
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value)
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized as T
}
