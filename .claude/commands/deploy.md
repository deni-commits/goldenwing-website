# /deploy

Deploye die aktuelle Version auf den VPS Server.

## ⚠️ Server Details
Server-Credentials sind in `.env.local` gespeichert (NICHT in Git!):
- `DEPLOY_HOST` - Server IP/Hostname
- `DEPLOY_USER` - SSH User
- `DEPLOY_PATH` - Remote Pfad
- `DEPLOY_PM2_NAME` - PM2 Prozessname

## Workflow

### 1. Pre-Deploy Checks
- [ ] `npm run build` erfolgreich
- [ ] Keine TypeScript Errors
- [ ] Keine ESLint Errors
- [ ] Keine offenen Critical Issues

### 2. Deploy Steps
```bash
# Lade Env-Variablen
source .env.local

# 1. Files synchronisieren
rsync -avz --exclude node_modules --exclude .next --exclude .git \
  ./ ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/

# 2. Auf Server verbinden und builden
ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH} && npm install && npm run build"

# 3. PM2 Prozess neustarten
ssh ${DEPLOY_USER}@${DEPLOY_HOST} "pm2 restart ${DEPLOY_PM2_NAME}"
```

### 3. Post-Deploy Verification
- [ ] https://goldenwing.at erreichbar
- [ ] Admin Panel funktioniert
- [ ] Keine Console Errors
- [ ] SSL Zertifikat gültig

## Rollback
Falls Probleme auftreten:
```bash
source .env.local
ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH} && git checkout HEAD~1 && npm install && npm run build && pm2 restart ${DEPLOY_PM2_NAME}"
```

## Output Format
```markdown
## Deploy Report

### Status: ✅ Erfolgreich / ❌ Fehlgeschlagen

### Deployed
- Zeit: [Timestamp]
- Commit: [Hash]

### Checks
- [ ] Website erreichbar
- [ ] Admin erreichbar
- [ ] Performance OK

### Notes
- ...
```
