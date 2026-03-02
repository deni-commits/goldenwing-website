#!/usr/bin/env node
/**
 * GitHub Webhook Server for auto-deployment
 * Listens on port 9001 for push events to main branch
 *
 * Setup: pm2 start webhook-server.mjs --name goldenwing-webhook
 * GitHub: Settings > Webhooks > Add webhook
 *   - URL: http://72.62.52.70:9001/deploy
 *   - Content type: application/json
 *   - Secret: (set WEBHOOK_SECRET env var)
 *   - Events: Just the push event
 */

import http from 'http'
import crypto from 'crypto'
import { execSync } from 'child_process'

const PORT = 9001
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || ''
const DEPLOY_SCRIPT = '/var/www/goldenwing-website/deploy.sh'

function verifySignature(payload, signature) {
  if (!WEBHOOK_SECRET) return true // Skip verification if no secret set
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET)
  const digest = 'sha256=' + hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/deploy') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      // Verify signature
      const signature = req.headers['x-hub-signature-256'] || ''
      if (WEBHOOK_SECRET && !verifySignature(body, signature)) {
        console.log(`[${new Date().toISOString()}] Invalid signature, rejecting`)
        res.writeHead(401)
        res.end('Invalid signature')
        return
      }

      try {
        const payload = JSON.parse(body)

        // Only deploy on push to main
        if (payload.ref !== 'refs/heads/main') {
          console.log(`[${new Date().toISOString()}] Push to ${payload.ref}, skipping (only main triggers deploy)`)
          res.writeHead(200)
          res.end('Skipped: not main branch')
          return
        }

        console.log(`[${new Date().toISOString()}] Push to main detected, deploying...`)
        res.writeHead(200)
        res.end('Deploying...')

        // Run deploy async (don't block the response)
        try {
          execSync(`bash ${DEPLOY_SCRIPT}`, { timeout: 300000, stdio: 'inherit' })
          console.log(`[${new Date().toISOString()}] Deploy completed successfully`)
        } catch (err) {
          console.error(`[${new Date().toISOString()}] Deploy failed:`, err.message)
        }
      } catch (err) {
        console.error(`[${new Date().toISOString()}] Error:`, err.message)
        res.writeHead(400)
        res.end('Bad request')
      }
    })
  } else if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200)
    res.end('OK')
  } else {
    res.writeHead(404)
    res.end('Not found')
  }
})

server.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Webhook server listening on port ${PORT}`)
})
