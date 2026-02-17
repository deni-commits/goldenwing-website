# GoldenWing Deployment Guide

## ⚠️ WICHTIG: Niemals die Datenbank überschreiben!

Die Produktions-Datenbank (`goldenwing.db`) auf dem Server enthält:
- Alle Media-Einträge (Bilder, Dateien)
- Projekt-Bild-Zuweisungen
- Blog-Artikel und Inhalte
- Team-Mitglieder und Testimonials
- Alle CMS-Inhalte

**NIEMALS** manuell die Datenbank vom lokalen System auf den Server kopieren!

---

## 🚀 Sicherer Deploy

### Empfohlene Methode: Deploy Script

```bash
./scripts/deploy.sh
```

Das Script:
1. ✅ Erstellt automatisch ein Backup der Server-Datenbank
2. ✅ Synchronisiert alle Dateien OHNE die Datenbank zu überschreiben
3. ✅ Baut die Anwendung auf dem Server
4. ✅ Startet PM2 neu

### Manueller Deploy (falls nötig)

Wenn du manuell deployen musst, verwende **IMMER** diese Excludes:

```bash
rsync -avz \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude goldenwing.db \
  --exclude '*.db' \
  --exclude backups \
  -e "ssh -i ~/.ssh/id_ed25519_numbers_uae" \
  ./ root@72.62.52.70:/var/www/goldenwing/
```

---

## 💾 Backup-System

### Automatische Backups

- **Tägliche Backups** um 3:00 Uhr morgens
- Speicherort: `/var/www/goldenwing/backups/`
- Behalten: Letzte 30 Backups

### Manuelles Backup erstellen

```bash
ssh -i ~/.ssh/id_ed25519_numbers_uae root@72.62.52.70 \
  "cd /var/www/goldenwing && cp goldenwing.db backups/manual-$(date +%Y%m%d_%H%M%S).db"
```

### Backup wiederherstellen

```bash
ssh -i ~/.ssh/id_ed25519_numbers_uae root@72.62.52.70 << 'EOF'
cd /var/www/goldenwing
# Liste verfügbare Backups
ls -la backups/*.db

# Wiederherstellen (ersetze BACKUP_NAME mit dem gewünschten Backup)
cp backups/BACKUP_NAME.db goldenwing.db
pm2 restart goldenwing
EOF
```

---

## 🖼️ Bilder-Verwaltung

### Bilder hochladen

**Methode 1: Payload CMS Admin (empfohlen)**
1. https://goldenwing.at/admin öffnen
2. "Media" → "Create New"
3. Bild hochladen
4. Bei Projekt/Post das Bild zuweisen

**Methode 2: Manuell per SSH**
```bash
# Bild auf Server kopieren
scp -i ~/.ssh/id_ed25519_numbers_uae mein-bild.webp \
  root@72.62.52.70:/var/www/goldenwing/public/media/

# In Datenbank registrieren
ssh -i ~/.ssh/id_ed25519_numbers_uae root@72.62.52.70 << 'EOF'
sqlite3 /var/www/goldenwing/goldenwing.db "
INSERT INTO media (filename, alt, mime_type, created_at, updated_at)
VALUES ('mein-bild.webp', 'Beschreibung', 'image/webp', datetime('now'), datetime('now'));
"
EOF
```

### Bilder-Probleme beheben

Falls Bilder verschwunden sind:

```bash
ssh -i ~/.ssh/id_ed25519_numbers_uae root@72.62.52.70 << 'EOF'
cd /var/www/goldenwing

# 1. Zeige Dateien auf Disk
ls -la public/media/

# 2. Zeige Einträge in DB
sqlite3 goldenwing.db "SELECT id, filename FROM media;"

# 3. Zeige Projekte ohne Bild
sqlite3 goldenwing.db "SELECT slug FROM projects WHERE main_image_id IS NULL;"

# 4. Letztes Backup wiederherstellen falls nötig
# cp backups/daily-YYYYMMDD.db goldenwing.db
# pm2 restart goldenwing
EOF
```

---

## 🔧 Server-Zugang

| Was | Wert |
|-----|------|
| SSH | `ssh -i ~/.ssh/id_ed25519_numbers_uae root@72.62.52.70` |
| Website | https://goldenwing.at |
| Admin | https://goldenwing.at/admin |
| Pfad | `/var/www/goldenwing` |
| PM2 Process | `goldenwing` |
| Database | `/var/www/goldenwing/goldenwing.db` |
| Backups | `/var/www/goldenwing/backups/` |

---

## 🚨 Bei Problemen

### Website lädt nicht

```bash
ssh -i ~/.ssh/id_ed25519_numbers_uae root@72.62.52.70 "pm2 logs goldenwing --lines 50"
```

### Bilder fehlen

1. Prüfe ob Dateien auf Disk existieren: `ls public/media/`
2. Prüfe DB-Einträge: `sqlite3 goldenwing.db "SELECT * FROM media;"`
3. Ggf. Backup wiederherstellen

### Build schlägt fehl

```bash
ssh -i ~/.ssh/id_ed25519_numbers_uae root@72.62.52.70 "cd /var/www/goldenwing && npm run build"
```

---

## 📋 Checkliste vor Deploy

- [ ] Lokaler Build funktioniert (`npm run build`)
- [ ] Keine TypeScript-Fehler
- [ ] Keine ESLint-Fehler
- [ ] Deploy-Script verwenden: `./scripts/deploy.sh`
- [ ] Nach Deploy: Website testen
