-- Migration Script: Restore German Data to Locales Tables
-- Run with: sqlite3 goldenwing.db < migrations/restore-german-data.sql

BEGIN TRANSACTION;

-- 1. Restore services_locales
INSERT OR REPLACE INTO services_locales (_locale, _parent_id, title, subtitle, description)
SELECT 'de', id, title, subtitle, description FROM (
  SELECT * FROM services_backup
);

-- Note: Since we can't easily access JSON in SQLite, we'll use a Node.js script instead

COMMIT;
