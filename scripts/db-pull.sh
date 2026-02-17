#!/bin/bash
# Pulls database from VPS to local (for local development)

VPS="root@72.62.52.70"
VPS_PATH="/var/www/goldenwing"
SSH_KEY="~/.ssh/id_ed25519_numbers_uae"

echo "========================================"
echo "  Database Pull (VPS -> Local)"
echo "========================================"
echo ""
echo "This will OVERWRITE your local database!"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  # Backup local database first (if exists)
  if [ -f "goldenwing.db" ]; then
    BACKUP_NAME="goldenwing_local_backup_$(date +%Y%m%d_%H%M%S).db"
    echo "Backing up local DB to $BACKUP_NAME..."
    cp goldenwing.db "$BACKUP_NAME"
  fi

  echo "Pulling database from VPS..."
  scp -i $SSH_KEY $VPS:$VPS_PATH/goldenwing.db ./goldenwing.db

  echo ""
  echo "Database pulled successfully!"
  echo "Local dev server will use the production data."
else
  echo "Aborted."
fi
