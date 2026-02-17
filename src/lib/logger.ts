/**
 * Production-safe logger
 * - In development: logs to console
 * - In production: sends errors to Sentry
 */
import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === 'development'
const hasSentry = !!process.env.SENTRY_DSN || !!process.env.NEXT_PUBLIC_SENTRY_DSN

export const logger = {
  error: (message: string, error?: unknown) => {
    if (isDev) {
       
      console.error(`[ERROR] ${message}`, error)
    }
    
    if (hasSentry && !isDev) {
      Sentry.captureException(error || new Error(message), {
        extra: { message },
      })
    }
  },
  
  warn: (message: string, ...args: unknown[]) => {
    if (isDev) {
       
      console.warn(`[WARN] ${message}`, ...args)
    }
  },
  
  info: (message: string, ...args: unknown[]) => {
    if (isDev) {
       
      console.warn(`[INFO] ${message}`, ...args)
    }
  },
  
  debug: (message: string, ...args: unknown[]) => {
    if (isDev) {
       
      console.warn(`[DEBUG] ${message}`, ...args)
    }
  },
}

export default logger
