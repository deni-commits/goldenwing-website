/**
 * Tool Usage Tracking → Supabase (GoldenWing Cockpit)
 * Sends tool analysis data to the Cockpit database for lead tracking
 */

import { createHash } from 'crypto'
import logger from '@/lib/logger'

const SUPABASE_URL = 'https://gzhvvwkoglylibvrtiqo.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || ''

interface TrackingData {
  url: string
  toolType: 'seo' | 'performance' | 'design' | 'security' | 'combined'
  scores?: {
    overall?: number
    seo?: number
    performance?: number
    design?: number
    security?: number
  }
  criticalIssues?: number
  warningIssues?: number
  passedChecks?: number
  email?: string
  clientIP?: string
  userAgent?: string
  referrer?: string
  payloadId?: string
  unlocked?: boolean
}

function hashIP(ip: string): string {
  return createHash('sha256').update(ip + 'goldenwing-salt').digest('hex').substring(0, 16)
}

export async function trackToolUsage(data: TrackingData): Promise<void> {
  if (!SUPABASE_KEY) {
    logger.warn('SUPABASE_SERVICE_KEY not set, skipping tool usage tracking')
    return
  }

  try {
    const payload = {
      url: data.url,
      tool_type: data.toolType,
      score_overall: data.scores?.overall ?? null,
      score_seo: data.scores?.seo ?? null,
      score_performance: data.scores?.performance ?? null,
      score_design: data.scores?.design ?? null,
      score_security: data.scores?.security ?? null,
      critical_issues: data.criticalIssues ?? 0,
      warning_issues: data.warningIssues ?? 0,
      passed_checks: data.passedChecks ?? 0,
      email: data.email ?? null,
      ip_hash: data.clientIP ? hashIP(data.clientIP) : null,
      user_agent: data.userAgent?.substring(0, 500) ?? null,
      referrer: data.referrer?.substring(0, 500) ?? null,
      payload_id: data.payloadId ?? null,
      unlocked: data.unlocked ?? false,
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/tool_usage`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      logger.error(`Tool tracking failed: ${response.status} ${text}`)
    }
  } catch (error) {
    // Never let tracking errors break the main flow
    logger.error('Tool tracking error:', error)
  }
}
