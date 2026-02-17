/**
 * In-memory rate limiter with automatic cleanup
 *
 * SECURITY NOTE: This is an in-memory implementation that resets on server restart.
 * For high-security production environments, consider:
 * - Redis-backed rate limiting (upstash/redis, ioredis)
 * - Cloudflare Rate Limiting
 * - nginx rate limiting at the edge
 *
 * Current implementation is suitable for:
 * - Single-server deployments
 * - Protection against casual abuse
 * - Non-critical rate limiting (contact forms, chat)
 *
 * For PM2 cluster mode, use Redis for shared state.
 */

interface RateLimitEntry {
  count: number
  resetTime: number
  firstRequest: number // Track when rate limiting started
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetTime: number
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 60000 }
): RateLimitResult {
  const now = Date.now()
  const key = identifier

  let entry = rateLimitStore.get(key)

  // Create new entry or reset if window expired
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
      firstRequest: now,
    }
  }

  entry.count++
  rateLimitStore.set(key, entry)

  const remaining = Math.max(0, config.maxRequests - entry.count)
  const success = entry.count <= config.maxRequests

  return {
    success,
    remaining,
    resetTime: entry.resetTime,
  }
}

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback
  return 'unknown'
}
