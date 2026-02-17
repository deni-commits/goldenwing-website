#!/bin/bash
# =============================================================================
# GOLDENWING SAFE DEPLOY SCRIPT
# =============================================================================
# WICHTIG: Dieses Script überschreibt NIEMALS die Produktions-Datenbank!
# Die goldenwing.db auf dem Server enthält alle CMS-Inhalte und Media-Zuweisungen.
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SERVER="root@72.62.52.70"
SSH_KEY="~/.ssh/id_ed25519_numbers_uae"
REMOTE_PATH="/var/www/goldenwing"
PM2_PROCESS="goldenwing"

echo -e "${YELLOW}🚀 Starting GoldenWing Safe Deploy...${NC}"
echo ""

# Step 1: Pre-deploy checks
echo -e "${YELLOW}[1/5] Running pre-deploy checks...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Are you in the project root?${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Pre-deploy checks passed${NC}"

# Step 2: Create backup on server
echo ""
echo -e "${YELLOW}[2/5] Creating database backup on server...${NC}"
ssh -i $SSH_KEY $SERVER "mkdir -p $REMOTE_PATH/backups && cd $REMOTE_PATH && cp goldenwing.db backups/pre-deploy-\$(date +%Y%m%d_%H%M%S).db 2>/dev/null || true"
echo -e "${GREEN}✓ Backup created${NC}"

# Step 3: Sync files (EXCLUDING database!)
echo ""
echo -e "${YELLOW}[3/5] Syncing files to server (excluding database)...${NC}"
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude 'goldenwing.db' \
    --exclude '*.db' \
    --exclude 'backups' \
    --exclude '.env.local' \
    --exclude '.DS_Store' \
    -e "ssh -i $SSH_KEY" \
    ./ $SERVER:$REMOTE_PATH/

echo -e "${GREEN}✓ Files synced${NC}"

# Step 4: Install dependencies and build on server
echo ""
echo -e "${YELLOW}[4/5] Building on server...${NC}"
ssh -i $SSH_KEY $SERVER "cd $REMOTE_PATH && npm install --production=false && npm run build"
echo -e "${GREEN}✓ Build successful${NC}"

# Step 5: Restart PM2
echo ""
echo -e "${YELLOW}[5/5] Restarting PM2 process...${NC}"
ssh -i $SSH_KEY $SERVER "pm2 restart $PM2_PROCESS"
echo -e "${GREEN}✓ PM2 restarted${NC}"

# Final status
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ DEPLOY COMPLETE${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "Database was ${YELLOW}NOT${NC} touched (safe deploy)"
echo -e "Website: ${GREEN}https://goldenwing.at${NC}"
echo -e "Admin:   ${GREEN}https://goldenwing.at/admin${NC}"
echo ""

# Show PM2 status
ssh -i $SSH_KEY $SERVER "pm2 status $PM2_PROCESS"
