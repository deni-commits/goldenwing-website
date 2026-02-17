#!/bin/bash
# =============================================================================
# GOLDENWING DATABASE BACKUP SCRIPT
# =============================================================================
# Runs daily via cron to backup the SQLite database
# =============================================================================

BACKUP_DIR="/var/www/goldenwing/backups"
DB_PATH="/var/www/goldenwing/goldenwing.db"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/daily-$(date +%Y%m%d).db"

# Create backup directory if not exists
mkdir -p $BACKUP_DIR

# Create backup (overwrite daily backup)
cp $DB_PATH $BACKUP_FILE

# Also create timestamped backup every 3 days
if [ $(($(date +%d) % 3)) -eq 0 ]; then
    cp $DB_PATH "$BACKUP_DIR/db_$TIMESTAMP.db"
fi

# Keep only last 30 backups
ls -t $BACKUP_DIR/db_*.db 2>/dev/null | tail -n +31 | xargs rm -f 2>/dev/null
ls -t $BACKUP_DIR/daily-*.db 2>/dev/null | tail -n +8 | xargs rm -f 2>/dev/null

echo "$(date): Backup created - $BACKUP_FILE"
