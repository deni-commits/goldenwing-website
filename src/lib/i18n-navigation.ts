import { createNavigation } from 'next-intl/navigation'
import { routing } from '@/i18n/routing'

/**
 * Internationalized Navigation Utilities
 *
 * These components and hooks automatically handle locale-specific pathnames.
 *
 * Usage:
 *   <Link href="/leistungen">Services</Link>
 *
 * Result:
 *   DE: /leistungen
 *   EN: /en/services
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
