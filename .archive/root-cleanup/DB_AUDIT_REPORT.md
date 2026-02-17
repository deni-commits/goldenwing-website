# GoldenWing - Datenbank & CMS Audit

**Erstellt:** 2025-12-30
**Payload CMS Version:** 3.x
**Datenbank:** SQLite (goldenwing.db)

---

## Executive Summary

| Metrik | Anzahl |
|--------|--------|
| Collections | 14 |
| Globals | 0 (config) / 20+ (DB Tabellen) |
| Felder total | ~180 |
| Relationen | 8 |
| LEERE COLLECTIONS | 5 |
| UNGENUTZTE FELDER | 12+ |
| INKONSISTENZEN | 3 |

---

## KRITISCH - Sofort handeln

| Typ | Was | Wo | Empfehlung |
|-----|-----|-----|-----------|
| Leere Collection | Partners | 0 Eintraege | Logo-Carousel funktioniert nicht - befuellen oder entfernen |
| Leere Collection | Resources | 0 Eintraege | Downloads-Seite leer - befuellen oder entfernen |
| Leere Collection | LocationDetails | 0 Eintraege | Standort-Daten kommen aus Defaults - entscheiden ob CMS oder Code |
| Leere Collection | Packages | 0 Eintraege | Paket-Seiten nutzen Defaults - entscheiden ob CMS oder Code |
| Leere Collection | ReferenzCategories | 0 Eintraege | Referenz-Kategorien nutzen Defaults - entscheiden ob CMS oder Code |
| Ungenutztes Feld | expertQuotes | Posts (0 Eintraege) | Entfernen oder nutzen |
| Ungenutztes Feld | sources | Posts (0 Eintraege) | Entfernen oder nutzen |
| Ungenutztes Feld | tableOfContents | Posts (0 Eintraege) | Entfernen oder nutzen |
| Ungenutztes Feld | faqs | Posts (0 Eintraege) | Entfernen oder nutzen |
| Ungenutztes Feld | color | Categories (alle NULL) | Wird im Code nicht verwendet - entfernen |
| Ungenutztes Feld | testimonial | Projects (Legacy) | Kein Projekt hat Testimonial - entfernen |
| Config Diskrepanz | Globals | payload.config.ts vs DB | 20+ Global-Tabellen existieren aber `globals: []` in Config |

---

## WARNUNG

| Typ | Was | Wo | Empfehlung |
|-----|-----|-----|-----------|
| Wenig Daten | Testimonials | 1 Eintrag | Mehr Testimonials sammeln |
| Wenig Daten | TeamMembers | 2 Eintraege | Team erweitern |
| Wenig Daten | Media | 3 Eintraege | Bilder fehlen fuer Posts/Projects |
| Leere Arrays | services.features | 0 Eintraege | Features befuellen oder entfernen |
| Leere Arrays | services.process | 0 Eintraege | Process befuellen oder entfernen |
| Leere Arrays | sub_services.benefits | 0 Eintraege | Benefits befuellen oder entfernen |
| Leere Arrays | sub_services.deliverables | 0 Eintraege | Deliverables befuellen oder entfernen |
| Leere Arrays | sub_services.useCases | 0 Eintraege | UseCases befuellen oder entfernen |
| Leere Arrays | projects.tags | 0 Eintraege | Tags befuellen oder entfernen |
| Leere Arrays | projects.services | 0 Eintraege (Text-Array) | Services befuellen - ACHTUNG: Text-Array, nicht Relation! |

---

## VERBESSERUNGSVORSCHLAEGE

| Prioritaet | Vorschlag | Begruendung |
|------------|-----------|-------------|
| Hoch | Globals reaktivieren oder entfernen | 20+ Tabellen in DB aber nicht in Config registriert |
| Hoch | Datenmodell vereinfachen | Viele leere Array-Felder die nie genutzt werden |
| Mittel | Projects.testimonial entfernen | Legacy-Feld, clientFeedback Group existiert bereits |
| Mittel | Categories.color entfernen | Im Code wird hardcoded categoryColors Map verwendet |
| Mittel | Pricing in SubServices ueberdenken | Komplexes Feld (from/to/unit/description) - evtl. vereinfachen |
| Niedrig | Array-Felder konsolidieren | projects.services (Text[]) vs Posts.relatedServices (Relation) |

---

## COLLECTION-DETAILS

### 1. Posts (7 Eintraege)

| Feld | Typ | Required | Localized | Im Code? | In DB? |
|------|-----|----------|-----------|----------|--------|
| title | text | Ja | Ja | Ja | Ja |
| slug | text | Ja | Nein | Ja | Ja |
| status | select | Nein | Nein | Ja | Ja |
| excerpt | textarea | Ja | Ja | Ja | Ja |
| content | richText | Ja | Ja | Ja | Ja |
| mainImage | upload | Nein | Nein | Nein (placeholder) | 0 refs |
| category | relationship | Nein | Nein | Ja | Ja |
| author | relationship | Nein | Nein | Ja | Ja |
| relatedServices | relationship[] | Nein | Nein | Ja | via rels |
| publishedAt | date | Ja | Nein | Ja | Ja |
| readTime | number | Nein | Nein | Ja | Ja |
| featured | checkbox | Nein | Nein | Ja | Ja |
| **expertQuotes** | array | Nein | Ja | Ja (code exists) | **0 Eintraege** |
| **faqs** | array | Nein | Ja | Ja (code exists) | **0 Eintraege** |
| **sources** | array | Nein | Nein | Ja (code exists) | **0 Eintraege** |
| **tableOfContents** | array | Nein | Ja | Ja (code exists) | **0 Eintraege** |
| seo | group | Nein | Ja | Ja | Ja |

**Fazit Posts:** 4 Array-Felder definiert aber nie befuellt. Code existiert zur Anzeige, aber keine Daten.

---

### 2. Projects (13 Eintraege)

| Feld | Typ | Required | Localized | Im Code? | In DB? |
|------|-----|----------|-----------|----------|--------|
| title | text | Ja | Ja | Ja | Ja |
| slug | text | Ja | Nein | Ja | Ja |
| client | text | Ja | Nein | Ja | Ja |
| category | select | Nein | Nein | Ja | Ja |
| year | number | Nein | Nein | Ja | Ja |
| description | textarea | Ja | Ja | Ja | Ja |
| longDescription | richText | Nein | Ja | ? | ? |
| challenge | textarea | Nein | Ja | Ja | Ja |
| solution | textarea | Nein | Ja | Ja | Ja |
| mainImage | upload | Nein | Nein | Ja | 0 refs |
| gallery | array | Nein | Ja | ? | 1 Eintrag |
| **tags** | array | Nein | Ja | ? | **0 Eintraege** |
| **services** | array (Text) | Nein | Ja | ? | **0 Eintraege** |
| results | array | Nein | Ja | Ja | 39 Eintraege |
| liveUrl | text | Nein | Nein | Ja | ? |
| clientFeedback | group | Nein | Ja | Ja | Ja |
| **testimonial** | relationship | Nein | Nein | Nein | **0 refs - LEGACY** |
| featured | checkbox | Nein | Nein | Ja | Ja |
| order | number | Nein | Nein | Ja | Ja |

**Fazit Projects:** `testimonial` ist Legacy (clientFeedback Group ersetzt es). tags/services Arrays leer.

---

### 3. Services (7 Eintraege)

| Feld | Typ | Required | Localized | Im Code? | In DB? |
|------|-----|----------|-----------|----------|--------|
| title | text | Ja | Ja | Ja | Ja |
| slug | text | Ja | Nein | Ja | Ja |
| subtitle | text | Nein | Ja | Ja | ? |
| description | textarea | Ja | Ja | Ja | Ja |
| icon | select | Nein | Nein | Ja | Ja |
| **features** | array | Nein | Ja | ? | **0 Eintraege** |
| **process** | array | Nein | Ja | ? | **0 Eintraege** |
| order | number | Nein | Nein | Ja | Ja |

**Fazit Services:** features und process nie befuellt.

---

### 4. SubServices (32 Eintraege)

| Feld | Typ | Required | Localized | Im Code? | In DB? |
|------|-----|----------|-----------|----------|--------|
| title | text | Ja | Ja | Ja | Ja |
| slug | text | Ja | Nein | Ja | Ja |
| parentService | relationship | Ja | Nein | Ja | Ja |
| subtitle | text | Nein | Ja | Ja | ? |
| description | textarea | Ja | Ja | Ja | Ja |
| longDescription | richText | Nein | Ja | Ja | Ja |
| icon | select | Nein | Nein | Ja | ? |
| features | array | Nein | Ja | Ja | ? |
| **benefits** | array | Nein | Ja | Ja (code) | **0 Eintraege** |
| process | array | Nein | Ja | Ja | ? |
| **useCases** | array | Nein | Ja | Ja (code) | **0 Eintraege** |
| **deliverables** | array | Nein | Ja | Ja (code) | **0 Eintraege** |
| pricing | group | Nein | Ja | ? | ? |
| duration | text | Nein | Ja | Ja | ? |
| relatedProjects | relationship[] | Nein | Nein | ? | ? |
| featured | checkbox | Nein | Nein | ? | ? |
| order | number | Nein | Nein | Ja | Ja |
| seo | group | Nein | Ja | Ja | ? |

**Fazit SubServices:** Komplexeste Collection. benefits, useCases, deliverables haben Code aber keine Daten.

---

### 5. Categories (6 Eintraege)

| Feld | Typ | Required | Localized | Im Code? | In DB? |
|------|-----|----------|-----------|----------|--------|
| title | text | Ja | Ja | Ja | Ja |
| slug | text | Ja | Nein | Ja | Ja |
| description | textarea | Nein | Ja | ? | ? |
| **color** | select | Nein | Nein | **NEIN** | **Alle NULL** |

**Fazit Categories:** `color` Feld ist komplett ungenutzt. Im Code wird `categoryColors` Map hardcoded verwendet (blog/page.tsx:69-76).

---

### 6. TeamMembers (2 Eintraege)

| Feld | Typ | Required | Localized | Im Code? | In DB? |
|------|-----|----------|-----------|----------|--------|
| name | text | Ja | Nein | Ja | Ja |
| role | text | Ja | Ja | Ja | Ja |
| image | upload | Nein | Nein | Ja | 2 refs |
| bio | textarea | Nein | Ja | Ja | ? |
| email | email | Nein | Nein | ? | ? |
| social | group | Nein | Nein | ? | ? |
| featured | checkbox | Nein | Nein | Ja | Ja |
| order | number | Nein | Nein | Ja | Ja |

**Fazit TeamMembers:** Minimal aber funktional. Nur 2 Team-Mitglieder.

---

### 7. Partners (0 Eintraege) - LEER

| Feld | Typ | Required | Localized | Im Code? |
|------|-----|----------|-----------|----------|
| name | text | Ja | Ja | Ja (carousel) |
| logo | upload | Nein | Nein | Ja |
| description | textarea | Nein | Ja | ? |
| website | text | Nein | Nein | ? |
| category | select | Nein | Nein | ? |
| row | select | Nein | Nein | Ja (carousel rows) |
| featured | checkbox | Nein | Nein | ? |
| showInCarousel | checkbox | Nein | Nein | Ja |
| order | number | Nein | Nein | Ja |

**Fazit Partners:** Collection komplett leer. Logo-Carousel auf Homepage funktioniert nicht korrekt.

---

### 8. Testimonials (1 Eintrag)

| Feld | Typ | Required | Localized | Im Code? | In DB? |
|------|-----|----------|-----------|----------|--------|
| name | text | Ja | Nein | Ja | Ja |
| role | text | Nein | Ja | Ja | ? |
| company | text | Nein | Nein | Ja | ? |
| quote | textarea | Ja | Ja | Ja | Ja |
| image | upload | Nein | Nein | Ja | ? |
| rating | number | Nein | Nein | ? | ? |
| featured | checkbox | Nein | Nein | Ja | ? |

**Fazit Testimonials:** Funktional, aber nur 1 Eintrag. Wird auch in Landing Pages referenziert.

---

### 9. Resources (0 Eintraege) - LEER

| Feld | Typ | Required | Localized | Im Code? |
|------|-----|----------|-----------|----------|
| title | text | Ja | Nein | Ja (downloads page) |
| slug | text | Ja | Nein | Ja |
| description | textarea | Ja | Nein | Ja |
| type | select | Ja | Nein | Ja |
| category | select | Nein | Nein | Ja |
| file | upload | Nein | Nein | Ja |
| thumbnail | upload | Nein | Nein | ? |
| downloadCount | number | Nein | Nein | ? |
| publishedAt | date | Nein | Nein | ? |
| featured | checkbox | Nein | Nein | Ja |

**Fazit Resources:** Collection leer. Downloads-Seite zeigt "Keine Ressourcen" an.

---

### 10. Media (3 Eintraege)

| Feld | Typ | Required | Im Code? | In DB? |
|------|-----|----------|----------|--------|
| alt | text | Ja | Ja | Ja (domoferm, 2x Team) |
| caption | text | Nein | ? | ? |

**Fazit Media:** Minimal. Keine Bilder fuer Blog-Posts oder Projects hochgeladen.

---

### 11. Users (1 Eintrag)

| Feld | Typ | Required | Im Code? |
|------|-----|----------|----------|
| email | text (auth) | Ja | Ja |
| name | text | Nein | ? |
| role | select | Nein | Ja (access control) |

**Fazit Users:** Funktional mit sicherem Access Control.

---

### 12. LocationDetails (0 Eintraege) - LEER

Collection mit 35+ Feldern fuer Standort-Detailseiten.

**Fazit:** Extrem komplexe Collection, aber leer. Code verwendet Defaults aus Page-Komponenten.

---

### 13. Packages (0 Eintraege) - LEER

Collection mit 25+ Feldern fuer Service-Pakete.

**Fazit:** Komplexe Collection, aber leer. Code verwendet Defaults.

---

### 14. ReferenzCategories (0 Eintraege) - LEER

Collection mit 25+ Feldern fuer Referenz-Kategorien.

**Fazit:** Komplexe Collection, aber leer. Code verwendet Defaults.

---

## RELATIONS-MAP

```
Posts ─────┬──> Categories (many-to-one via category_id)
           ├──> TeamMembers (many-to-one via author_id)
           ├──> Media (many-to-one via main_image_id)
           └──> Services (many-to-many via posts_rels)

Projects ──┬──> Media (many-to-one via main_image_id)
           └──> Testimonials (many-to-one via testimonial_id) [UNUSED/LEGACY]

SubServices ┬──> Services (many-to-one via parentService)
            └──> Projects (many-to-many via sub_services_rels)

TeamMembers ──> Media (many-to-one via image)

Partners ──> Media (many-to-one via logo)

Testimonials ──> Media (many-to-one via image)

Resources ──┬──> Media (many-to-one via file)
            └──> Media (many-to-one via thumbnail)
```

### Orphan Collections (keine eingehenden Relationen)
- Categories (nur ausgehend von Posts)
- Users (System-Collection)
- LocationDetails (standalone)
- Packages (standalone)
- ReferenzCategories (standalone)

### Zirkulaere Relationen
- Keine gefunden

### Fehlende Relationen
- Projects.services ist Text-Array statt Relation zu Services
- Projects.tags ist Text-Array statt separate Tags Collection
- ReferenzCategories ist nicht mit Projects verknuepft (nutzt category String-Match)

---

## GLOBALS DISKREPANZ

### In payload.config.ts
```typescript
globals: [] // LEER!
```

### In Datenbank existieren (20+ Tabellen)
- home_page
- contact_page
- about_page
- culture_page
- values_page
- facts_figures_page
- locations_overview_page
- impressum_page
- datenschutz_page
- faq_page
- cookie_settings_page
- services_overview_page
- packages_overview_page
- referenzen_overview_page
- blog_listing_page
- projekte_listing_page
- ressourcen_overview_page
- downloads_page
- newsletter_page
- kreativagentur_wien_page
- seo_agentur_wien_page
- webdesign_wien_page

### Konsequenz
- Globals werden via `payload.findGlobal()` abgefragt (src/lib/payload/index.ts)
- Aber ohne Registrierung in config sind sie im Admin-Panel NICHT sichtbar!
- Entweder: Globals in config hinzufuegen ODER Tabellen loeschen

---

## NAMENSKONVENTIONEN

| Problem | Beispiele | Empfehlung |
|---------|-----------|------------|
| Mixed Slug Style | `sub-services` vs `referenz-categories` | Einheitlich kebab-case |
| German/English Mix | `testimonial` vs `Kundenfeedback` | Einheitlich Englisch fuer Slugs |
| Inconsistent Casing | `mainImage` vs `main_image_id` (DB) | Normal - Payload konvertiert |
| Legacy Field Names | `testimonial` (Projects) | Entfernen |

---

## EMPFOHLENE AKTIONEN

### Prioritaet 1 (Sofort)
1. **Entscheidung: CMS vs Hardcoded**
   - LocationDetails, Packages, ReferenzCategories sind leer
   - Code nutzt Defaults - entweder befuellen oder Collections entfernen

2. **Partners befuellen oder entfernen**
   - Logo-Carousel ist sichtbar auf Homepage
   - Ohne Partner-Daten funktioniert es nicht

3. **Globals entweder registrieren oder loeschen**
   - 20+ Global-Tabellen in DB
   - Nicht im Admin sichtbar weil nicht in config

### Prioritaet 2 (Diese Woche)
4. **Legacy-Feld Projects.testimonial entfernen**
   - clientFeedback Group existiert bereits
   - testimonial wird nicht verwendet

5. **Categories.color entfernen**
   - Hardcoded categoryColors Map wird verwendet
   - Feld ist ueberfluessig

6. **Leere Array-Felder ueberdenken**
   - expertQuotes, sources, tableOfContents, faqs in Posts
   - benefits, useCases, deliverables in SubServices
   - features, process in Services
   - **Entweder befuellen oder entfernen**

### Prioritaet 3 (Spaeter)
7. **Media/Images befuellen**
   - Keine Post-Bilder
   - Keine Project-Hauptbilder
   - Gradient-Placeholders werden gezeigt

8. **Testimonials erweitern**
   - Nur 1 Eintrag
   - Fuer Glaubwuerdigkeit mehr sammeln

9. **Datenmodell vereinfachen**
   - LocationDetails hat 35+ Felder
   - Packages hat 25+ Felder
   - Vieles davon scheint nie genutzt zu werden

---

## TECHNISCHE DETAILS

### Collection Counts (Stand: 2025-12-30)
| Collection | Eintraege |
|------------|-----------|
| posts | 7 |
| projects | 13 |
| services | 7 |
| sub_services | 32 |
| categories | 6 |
| testimonials | 1 |
| team_members | 2 |
| partners | 0 |
| resources | 0 |
| packages | 0 |
| referenz_categories | 0 |
| location_details | 0 |
| media | 3 |
| users | 1 |

### Array-Field Counts
| Tabelle | Eintraege |
|---------|-----------|
| posts_expert_quotes | 0 |
| posts_sources | 0 |
| posts_table_of_contents | 0 |
| posts_faqs | 0 |
| projects_gallery | 1 |
| projects_tags | 0 |
| projects_services | 0 |
| projects_results | 39 |
| services_features | 0 |
| services_process | 0 |
| sub_services_benefits | 0 |
| sub_services_deliverables | 0 |
| sub_services_use_cases | 0 |

---

## AUDIT ABGESCHLOSSEN

Bericht erstellt: DB_AUDIT_REPORT.md
