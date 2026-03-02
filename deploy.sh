#!/bin/bash
# GoldenWing Website - Auto-Deploy Script
# Triggered by GitHub webhook or manually via: ssh root@72.62.52.70 'bash /var/www/goldenwing-website/deploy.sh'

set -e

APP_DIR="/var/www/goldenwing-website"
PM2_NAME="goldenwing"
LOG_FILE="/var/log/goldenwing-deploy.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

cd "$APP_DIR"

log "Starting deployment..."

# Pull latest changes
log "Pulling from GitHub..."
git fetch origin main
git reset --hard origin/main

# Install dependencies
log "Installing dependencies..."
npm ci --production=false 2>&1 | tail -5

# Build
log "Building Next.js + Payload..."
npm run build 2>&1 | tail -10

# Restart PM2
log "Restarting PM2 process..."
pm2 restart "$PM2_NAME" --update-env

# Wait for startup
sleep 3

# Health check
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3002 | grep -q "200\|301\|302"; then
  log "Deployment successful! Site is responding."
else
  log "WARNING: Site may not be responding correctly. Check logs: pm2 logs $PM2_NAME"
fi

log "Deploy complete."
