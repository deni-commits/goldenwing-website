# Claude Code CLI Prompt - GoldenWing GEO/SEO Implementation

Kopiere diesen Prompt und gib ihn Claude Code CLI:

---

## PROMPT START

Du übernimmst ein laufendes GEO/SEO-Projekt für GoldenWing Creative Studios (goldenwing.at).

### WAS BEREITS ERLEDIGT WURDE:

1. **20 Standort-Seiten erstellt** in `/src/app/[locale]/(marketing)/standorte/`:
   - Wien: Hub + Webdesign + SEO ✅
   - Graz: Hub + Webdesign + SEO + Online-Marketing ✅
   - Linz: Hub + Webdesign + SEO ✅
   - Salzburg: Hub + Webdesign ✅
   - Innsbruck: Hub + Webdesign ✅
   - München: Hub ✅
   - Berlin: Hub ✅
   - Zürich: Hub ✅

2. **Routing.ts erweitert** in `/src/i18n/routing.ts` mit allen neuen Pfaden

3. **Dokumentation aktualisiert**:
   - `IMPLEMENTIERUNGS-ROADMAP.md` - Fortschritt dokumentiert
   - `STANDORTE-DEPLOYMENT.md` - Deployment-Anleitung

### WAS NOCH ZU TUN IST:

**Phase 1: Restliche Service-Seiten (PRIORITÄT HOCH)**

Erstelle diese fehlenden Service-Seiten nach dem Muster der existierenden:

```
/standorte/wien/branding/page.tsx
/standorte/wien/google-ads/page.tsx
/standorte/wien/social-media/page.tsx
/standorte/wien/kreativagentur/page.tsx
/standorte/linz/online-marketing/page.tsx
/standorte/salzburg/seo/page.tsx
/standorte/innsbruck/seo/page.tsx
/standorte/muenchen/webdesign/page.tsx
/standorte/muenchen/seo/page.tsx
/standorte/berlin/webdesign/page.tsx
/standorte/berlin/seo/page.tsx
/standorte/zuerich/webdesign/page.tsx
/standorte/zuerich/seo/page.tsx
```

**WICHTIG - Schema-Regeln:**
- TIER 1 (Wien, Dubai): `LocalBusiness` Schema ✅
- TIER 2 (alle anderen): NUR `Service` Schema ❌ KEIN LocalBusiness!

**Unique Content pro Stadt (35% Minimum):**
- Wien: Wirtschaftsagentur 50% Förderung, Tourismus/Startups/Gesundheit
- Graz: SFG 30%, Automotive/Magna/AVL, B2B-Industrie
- Linz: Business Upper Austria 30%, Voestalpine/Stahl/Maschinenbau
- Salzburg: ITG 50% (!), Tourismus/Festspiele/Premium
- Innsbruck: Standortagentur Tirol 30%, Outdoor/Life Sciences/Uni
- München: 40% günstiger als lokale Agenturen, Auto/Tech/Finance
- Berlin: Startup-freundlich, Tech/Kreativ
- Zürich: 55% günstiger als CH-Agenturen, Finance/Pharma/Luxury

**Phase 2: Build testen**

```bash
npm run build
npm run start
```

**Phase 3: SEO-Footer in Layout einbauen**

Die Komponente `/src/components/layout/seo-footer.tsx` existiert bereits.
Baue sie in das Haupt-Layout ein.

### REFERENZ-DATEIEN:

Lies diese Dateien um das Muster zu verstehen:
- `/src/app/[locale]/(marketing)/standorte/graz/webdesign/page.tsx` - Beispiel TIER 2 Service
- `/src/app/[locale]/(marketing)/standorte/wien/webdesign/page.tsx` - Beispiel TIER 1 Service
- `/src/app/[locale]/(marketing)/standorte/graz/page.tsx` - Beispiel TIER 2 Hub
- `/src/components/templates/landing-page.tsx` - Template für Service-Seiten
- `/src/i18n/routing.ts` - Routing-Konfiguration

### NICHT VERGESSEN:

1. Jede Seite braucht **unique FAQs** (nicht kopieren!)
2. Jede Seite braucht **stadt-spezifische Preise**
3. Jede Seite braucht **regionale Förderungen** erwähnt
4. **Service Schema** für TIER 2 Städte (KEIN LocalBusiness!)
5. **hreflang** ist bereits in routing.ts konfiguriert

Starte mit: `npm run build` um zu prüfen ob alles kompiliert.

---

## PROMPT END
