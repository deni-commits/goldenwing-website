#!/bin/bash
# DANGEROUS - Pushes local database to VPS
# Only use this if you know what you're doing!

VPS="root@72.62.52.70"
VPS_PATH="/var/www/goldenwing"
SSH_KEY="~/.ssh/id_ed25519_numbers_uae"

echo "========================================"
echo "  Database Push (Local -> VPS)"
echo "========================================"
echo ""
echo "WARNING: This will OVERWRITE the LIVE database!"
echo "All content changes made on the live site will be LOST!"
echo ""
echo "This should only be used for:"
echo "  - Initial setup"
echo "  - Schema migrations"
echo "  - Disaster recovery"
echo ""
read -p "Are you SURE? Type 'yes' to confirm: " -r
echo

if [[ $REPLY == "yes" ]]; then
  echo "Creating backup on VPS before push..."
  ssh -i $SSH_KEY $VPS "mkdir -p $VPS_PATH/backups && cp $VPS_PATH/goldenwing.db $VPS_PATH/backups/before-push-\$(date +%Y%m%d_%H%M%S).db"

  echo "Pushing local database to VPS..."
  scp -i $SSH_KEY ./goldenwing.db $VPS:$VPS_PATH/goldenwing.db

  echo "Restarting PM2..."
  ssh -i $SSH_KEY $VPS "pm2 restart goldenwing"

  echo ""
  echo "Database pushed successfully!"
  echo "The live site now uses your local database."
else
  echo "Aborted. Database was NOT changed."
fi
