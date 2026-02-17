import logger from '@/lib/logger'
/**
 * Security Event Logging
 *
 * Centralized logging for security-relevant events.
 * In production, integrate with:
 * - Sentry for error tracking
 * - LogDNA/Datadog for log aggregation
 * - SIEM systems for security monitoring
 */

export type SecurityEventType =
  | 'rate_limit_exceeded'
  | 'xss_attempt'
  | 'spam_detected'
  | 'bot_detected'
  | 'auth_failure'
  | 'suspicious_input'
  | 'csrf_violation'
  | 'validation_failure'

interface SecurityEvent {
  type: SecurityEventType
  ip: string
  path?: string
  details?: Record<string, unknown>
  timestamp: string
}

/**
 * Log a security event
 * Currently logs to console with structured format
 * Can be extended to send to external services
 */
export function logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
  const securityEvent: SecurityEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  }

  // Structured logging for easier parsing
  logger.warn('[SECURITY]', JSON.stringify(securityEvent))

  // In production, you could:
  // - Send to Sentry: Sentry.captureMessage('Security Event', { extra: securityEvent })
  // - Send to a logging service: await fetch(LOG_ENDPOINT, { body: JSON.stringify(securityEvent) })
  // - Write to a file for SIEM ingestion
}

/**
 * Log rate limit exceeded event
 */
export function logRateLimitExceeded(ip: string, endpoint: string, count: number): void {
  logSecurityEvent({
    type: 'rate_limit_exceeded',
    ip,
    path: endpoint,
    details: { requestCount: count },
  })
}

/**
 * Log XSS attempt
 */
export function logXSSAttempt(ip: string, path: string, payload?: string): void {
  logSecurityEvent({
    type: 'xss_attempt',
    ip,
    path,
    details: { payload: payload?.substring(0, 200) }, // Truncate for safety
  })
}

/**
 * Log bot/honeypot detection
 */
export function logBotDetected(ip: string, path: string, method: string): void {
  logSecurityEvent({
    type: 'bot_detected',
    ip,
    path,
    details: { method },
  })
}

/**
 * Log spam detection
 */
export function logSpamDetected(ip: string, path: string): void {
  logSecurityEvent({
    type: 'spam_detected',
    ip,
    path,
  })
}

/**
 * Log authentication failure
 */
export function logAuthFailure(ip: string, email?: string, reason?: string): void {
  logSecurityEvent({
    type: 'auth_failure',
    ip,
    details: {
      email: email ? email.substring(0, 3) + '***' : undefined, // Partial for privacy
      reason,
    },
  })
}
