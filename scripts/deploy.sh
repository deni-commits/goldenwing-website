#!/bin/bash
set -euo pipefail

ENV="${1:-dev}"
LOG="/var/log/goldenwing-deploy.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

if [ "$ENV" = "prod" ]; then
  APP_DIR="/var/www/goldenwing-v2"
  PM2_NAME="goldenwing"
  PORT=3002
else
  APP_DIR="/var/www/goldenwing-v2"
  PM2_NAME="goldenwing-dev"
  PORT=3003
fi

log() { echo "[$TIMESTAMP] $1" | tee -a "$LOG"; }

log "=== Deploy $ENV started ==="

cd "$APP_DIR"

# Save current commit for rollback
PREV_COMMIT=$(git rev-parse HEAD)
log "Previous commit: $PREV_COMMIT"

# Pull latest
git pull origin main 2>&1 | tee -a "$LOG"

# Install dependencies
npm install 2>&1 | tee -a "$LOG"

# Build
NODE_OPTIONS='--max-old-space-size=4096' npm run build 2>&1 | tee -a "$LOG"

# Restart PM2
pm2 restart "$PM2_NAME" 2>&1 | tee -a "$LOG"

# Health check (wait up to 30s)
HEALTHY=false
for i in $(seq 1 15); do
  sleep 2
  if curl -sf "http://localhost:$PORT/de" > /dev/null 2>&1; then
    HEALTHY=true
    break
  fi
done

if [ "$HEALTHY" = true ]; then
  log "Health check passed — deploy $ENV successful"
else
  log "Health check FAILED — rolling back to $PREV_COMMIT"
  git checkout "$PREV_COMMIT"
  npm ci --omit=dev 2>&1 | tee -a "$LOG"
  NODE_OPTIONS='--max-old-space-size=4096' npm run build 2>&1 | tee -a "$LOG"
  pm2 restart "$PM2_NAME" 2>&1 | tee -a "$LOG"
  log "Rollback complete"
  exit 1
fi

log "=== Deploy $ENV finished ==="
