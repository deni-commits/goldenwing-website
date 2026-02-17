import { NextResponse } from 'next/server'

/**
 * Returns 410 Gone for deprecated/non-existent paths
 * Used for WordPress attack paths to signal search engines
 * that these pages never existed and never will
 */
export async function GET() {
  return new NextResponse('Gone', {
    status: 410,
    statusText: 'Gone',
    headers: {
      'Content-Type': 'text/plain',
    }
  })
}

export async function POST() {
  return new NextResponse('Gone', {
    status: 410,
    statusText: 'Gone',
    headers: {
      'Content-Type': 'text/plain',
    }
  })
}
