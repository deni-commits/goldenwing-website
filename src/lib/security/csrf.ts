/**
 * CSRF Protection for API Routes
 *
 * Validates that requests originate from the same site.
 * Uses Origin and Referer headers for validation.
 */

const ALLOWED_ORIGINS = [
  'https://goldenwing.at',
  'https://www.goldenwing.at',
  'https://goldenwing.at',
  'https://www.goldenwing.at',
  'https://goldenwing.site',
  'https://www.goldenwing.site',
]

// Allow localhost in development
if (process.env.NODE_ENV === 'development') {
  ALLOWED_ORIGINS.push('http://localhost:3000')
  ALLOWED_ORIGINS.push('http://127.0.0.1:3000')
}

/**
 * Validate that the request comes from an allowed origin
 * @param request - The incoming request
 * @returns true if the origin is valid, false otherwise
 */
export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  // Check Origin header first (preferred)
  if (origin) {
    return ALLOWED_ORIGINS.includes(origin)
  }

  // Fall back to Referer header
  if (referer) {
    try {
      const refererUrl = new URL(referer)
      const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`
      return ALLOWED_ORIGINS.includes(refererOrigin)
    } catch {
      return false
    }
  }

  // No Origin or Referer - could be a direct API call or server-to-server
  // Strict mode: reject requests without Origin/Referer headers
  return false
}

/**
 * Get the origin from the request for logging purposes
 */
export function getRequestOrigin(request: Request): string {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  if (origin) return origin
  if (referer) {
    try {
      const url = new URL(referer)
      return `${url.protocol}//${url.host}`
    } catch {
      return 'unknown'
    }
  }
  return 'none'
}
