# GoldenWing Media Persistence Setup

## Problem
Bei jedem Deployment werden die CMS-Bilder überschrieben, weil `/public/media/` im Git-Repository liegt und bei `git pull` ersetzt wird.

## Lösung
Media-Dateien in einem **persistenten Ordner** speichern, der außerhalb des Deploy-Verzeichnisses liegt.

---

## 🚀 Einmalige Einrichtung (SSH auf VPS)

```bash
#!/bin/bash
# ================================================
# GOLDENWING MEDIA PERSISTENCE SETUP
# Einmalig auf dem VPS ausführen
# ================================================

# Variablen (anpassen falls nötig)
DEPLOY_DIR="/var/www/goldenwing"
PERSISTENT_MEDIA="/var/www/goldenwing-uploads/media"
WEB_USER="www-data"

echo "=== GoldenWing Media Persistence Setup ==="

# 1. Persistenten Ordner erstellen
echo "[1/5] Erstelle persistenten Media-Ordner..."
sudo mkdir -p $PERSISTENT_MEDIA
sudo chown -R $WEB_USER:$WEB_USER /var/www/goldenwing-uploads

# 2. Bestehende Bilder sichern (falls vorhanden)
echo "[2/5] Sichere bestehende Bilder..."
if [ -d "$DEPLOY_DIR/public/media" ] && [ ! -L "$DEPLOY_DIR/public/media" ]; then
    sudo cp -r $DEPLOY_DIR/public/media/* $PERSISTENT_MEDIA/ 2>/dev/null || true
    echo "    → Bilder kopiert"
else
    echo "    → Keine Bilder zu kopieren oder bereits Symlink"
fi

# 3. Original-Ordner entfernen
echo "[3/5] Entferne Original-Ordner..."
sudo rm -rf $DEPLOY_DIR/public/media

# 4. Symlink erstellen
echo "[4/5] Erstelle Symlink..."
sudo ln -sf $PERSISTENT_MEDIA $DEPLOY_DIR/public/media
sudo chown -h $WEB_USER:$WEB_USER $DEPLOY_DIR/public/media

# 5. Berechtigungen setzen
echo "[5/5] Setze Berechtigungen..."
sudo chmod -R 755 $PERSISTENT_MEDIA

# Verifizierung
echo ""
echo "=== Verifizierung ==="
ls -la $DEPLOY_DIR/public/media
echo ""
echo "✅ Setup abgeschlossen!"
echo ""
echo "Der Symlink zeigt auf: $PERSISTENT_MEDIA"
echo "Bilder werden dort dauerhaft gespeichert."
```

---

## 🔄 Deploy-Script Anpassung

Füge diese Zeilen am **Ende** deines Deploy-Scripts hinzu:

```bash
# ================================================
# MEDIA SYMLINK WIEDERHERSTELLEN
# (nach git pull / deployment)
# ================================================

DEPLOY_DIR="/var/www/goldenwing"
PERSISTENT_MEDIA="/var/www/goldenwing-uploads/media"

# Prüfen ob Symlink existiert, wenn nicht → wiederherstellen
if [ ! -L "$DEPLOY_DIR/public/media" ]; then
    echo "⚠️  Media-Symlink fehlt, stelle wieder her..."
    rm -rf $DEPLOY_DIR/public/media 2>/dev/null
    ln -sf $PERSISTENT_MEDIA $DEPLOY_DIR/public/media
    chown -h www-data:www-data $DEPLOY_DIR/public/media
    echo "✅ Media-Symlink wiederhergestellt"
fi
```

---

## 📁 Ordnerstruktur nach Setup

```
/var/www/
├── goldenwing/                    ← Deploy-Verzeichnis (wird überschrieben)
│   ├── public/
│   │   ├── media → /var/www/goldenwing-uploads/media  ← SYMLINK
│   │   └── ...
│   └── ...
│
└── goldenwing-uploads/            ← PERSISTENT (wird nie gelöscht)
    └── media/
        ├── team-member-1.jpg
        ├── project-image.png
        └── ...
```

---

## 🛡️ Backup-Strategie

Zusätzlich empfohlen: Regelmäßiges Backup des Media-Ordners

```bash
# Cronjob für tägliches Backup (optional)
# crontab -e
0 3 * * * tar -czf /var/www/backups/media-$(date +\%Y\%m\%d).tar.gz /var/www/goldenwing-uploads/media
```

---

## ✅ Checkliste

- [ ] Einmalige Einrichtung auf VPS durchgeführt
- [ ] Symlink erstellt und verifiziert
- [ ] Deploy-Script angepasst
- [ ] Test-Deployment durchgeführt
- [ ] Bilder laden nach Deployment noch ✓

---

## 🔧 Troubleshooting

### Bilder laden nicht
```bash
# Symlink prüfen
ls -la /var/www/goldenwing/public/media

# Sollte zeigen:
# media -> /var/www/goldenwing-uploads/media
```

### Berechtigungsfehler
```bash
sudo chown -R www-data:www-data /var/www/goldenwing-uploads
sudo chmod -R 755 /var/www/goldenwing-uploads
```

### Symlink nach Deploy weg
→ Deploy-Script prüfen, ob die Symlink-Wiederherstellung am Ende steht

---

## 📞 Support

Bei Fragen: office@goldenwing.at
