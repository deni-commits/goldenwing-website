/**
 * In-memory cache for tool analysis results
 *
 * Caches analysis results by URL for 1 hour to:
 * - Reduce API calls and server load
 * - Speed up repeated analyses of the same URL
 * - Improve user experience
 *
 * NOTE: This is an in-memory implementation that resets on server restart.
 * For production with multiple instances, consider Redis.
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
}

const analysisCache = new Map<string, CacheEntry<unknown>>()

// Default TTL: 1 hour
const DEFAULT_TTL_MS = 60 * 60 * 1000

// Clean up expired entries every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of analysisCache.entries()) {
    if (entry.expiresAt < now) {
      analysisCache.delete(key)
    }
  }
}, 10 * 60 * 1000)

/**
 * Generate a cache key for a tool analysis
 */
export function getCacheKey(toolType: string, url: string): string {
  // Normalize URL: lowercase, remove trailing slash, remove protocol
  const normalizedUrl = url
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')

  return `${toolType}:${normalizedUrl}`
}

/**
 * Get cached analysis result
 */
export function getCachedAnalysis<T>(toolType: string, url: string): T | null {
  const key = getCacheKey(toolType, url)
  const entry = analysisCache.get(key) as CacheEntry<T> | undefined

  if (!entry) {
    return null
  }

  // Check if expired
  if (entry.expiresAt < Date.now()) {
    analysisCache.delete(key)
    return null
  }

  return entry.data
}

/**
 * Cache an analysis result
 */
export function setCachedAnalysis<T>(
  toolType: string,
  url: string,
  data: T,
  ttlMs: number = DEFAULT_TTL_MS
): void {
  const key = getCacheKey(toolType, url)
  const now = Date.now()

  analysisCache.set(key, {
    data,
    timestamp: now,
    expiresAt: now + ttlMs,
  })
}

/**
 * Check if a URL is cached
 */
export function isCached(toolType: string, url: string): boolean {
  const key = getCacheKey(toolType, url)
  const entry = analysisCache.get(key)

  if (!entry) return false
  if (entry.expiresAt < Date.now()) {
    analysisCache.delete(key)
    return false
  }

  return true
}

/**
 * Get cache age in seconds
 */
export function getCacheAge(toolType: string, url: string): number | null {
  const key = getCacheKey(toolType, url)
  const entry = analysisCache.get(key)

  if (!entry) return null
  if (entry.expiresAt < Date.now()) return null

  return Math.floor((Date.now() - entry.timestamp) / 1000)
}

/**
 * Invalidate cache for a specific URL
 */
export function invalidateCache(toolType: string, url: string): void {
  const key = getCacheKey(toolType, url)
  analysisCache.delete(key)
}

/**
 * Clear all cached analyses
 */
export function clearAllCache(): void {
  analysisCache.clear()
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  size: number
  oldestEntry: number | null
  newestEntry: number | null
} {
  const now = Date.now()
  let oldestEntry: number | null = null
  let newestEntry: number | null = null

  for (const entry of analysisCache.values()) {
    const age = now - entry.timestamp
    if (oldestEntry === null || age > oldestEntry) {
      oldestEntry = age
    }
    if (newestEntry === null || age < newestEntry) {
      newestEntry = age
    }
  }

  return {
    size: analysisCache.size,
    oldestEntry: oldestEntry ? Math.floor(oldestEntry / 1000) : null,
    newestEntry: newestEntry ? Math.floor(newestEntry / 1000) : null,
  }
}
