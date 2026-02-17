import logger from '@/lib/logger'
import { NextRequest, NextResponse } from 'next/server'
import { GoogleAuth } from 'google-auth-library'

// Google Indexing API endpoint
const INDEXING_API_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish'

// Get credentials from environment variable (base64 encoded)
function getCredentials() {
  const base64Credentials = process.env.GOOGLE_INDEXING_CREDENTIALS
  if (!base64Credentials) {
    throw new Error('GOOGLE_INDEXING_CREDENTIALS not set')
  }
  const jsonString = Buffer.from(base64Credentials, 'base64').toString('utf-8')
  return JSON.parse(jsonString)
}

// Submit URL to Google Indexing API
async function submitUrl(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED') {
  const credentials = getCredentials()

  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  })

  const client = await auth.getClient()
  const accessToken = await client.getAccessToken()

  const response = await fetch(INDEXING_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken.token}`,
    },
    body: JSON.stringify({ url, type }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to submit URL')
  }

  return data
}

// POST /api/indexing - Submit URL(s) to Google
export async function POST(request: NextRequest) {
  try {
    // Simple auth check - only allow from localhost or with secret header
    const authHeader = request.headers.get('x-indexing-secret')
    const expectedSecret = process.env.PAYLOAD_SECRET // reuse existing secret

    if (authHeader !== expectedSecret) {
      // Check if request is from server-side
      const host = request.headers.get('host') || ''
      if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const body = await request.json()
    const { url, urls, type = 'URL_UPDATED' } = body

    // Handle single URL
    if (url) {
      const result = await submitUrl(url, type)
      return NextResponse.json({
        success: true,
        result,
        message: `URL submitted: ${url}`,
      })
    }

    // Handle multiple URLs
    if (urls && Array.isArray(urls)) {
      const results = []
      const errors = []

      for (const u of urls) {
        try {
          const result = await submitUrl(u, type)
          results.push({ url: u, success: true, result })
        } catch (error) {
          errors.push({ url: u, success: false, error: (error as Error).message })
        }
        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      return NextResponse.json({
        success: errors.length === 0,
        submitted: results.length,
        failed: errors.length,
        results,
        errors,
      })
    }

    return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
  } catch (error) {
    logger.error('Indexing API error:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}

// GET /api/indexing - Check status / info
export async function GET() {
  return NextResponse.json({
    service: 'Google Indexing API',
    endpoints: {
      'POST /api/indexing': {
        description: 'Submit URL(s) to Google for indexing',
        body: {
          url: 'Single URL to submit',
          urls: 'Array of URLs to submit (bulk)',
          type: 'URL_UPDATED (default) or URL_DELETED',
        },
      },
    },
    quota: '~200 URLs per day',
    docs: 'https://developers.google.com/search/apis/indexing-api/v3/quickstart',
  })
}
