-- GoldenWing Service Restructuring
-- Date: 2026-01-06

-- Step 1: Delete old services (keeps branding id=1, webdesign id=2)
DELETE FROM services WHERE id IN (3, 4, 5, 6, 7);

-- Step 2: Delete all existing sub_services (will be recreated)
DELETE FROM sub_services;

-- Step 3: Create 4 new main services
INSERT INTO services (id, slug, icon, "order") VALUES
(3, 'digital-marketing', 'megaphone', 3),
(4, 'seo-content', 'search', 4),
(5, 'web-app-entwicklung', 'code', 5),
(6, 'it-cloud-services', 'cloud', 6);

-- Step 4: Add locales for new services
INSERT INTO services_locales (title, subtitle, description, _locale, _parent_id) VALUES
-- Digital Marketing DE
('Digital Marketing', 'Kampagnen, die konvertieren', 'Von Strategie bis Tracking: Full-Funnel-Marketing, das messbare Ergebnisse liefert. Google Ads, Social Ads, E-Mail-Marketing und Marketing-Automatisierung.', 'de', 3),
-- Digital Marketing EN
('Digital Marketing', 'Campaigns that convert', 'From strategy to tracking: Full-funnel marketing that delivers measurable results. Google Ads, Social Ads, email marketing and marketing automation.', 'en', 3),
-- SEO & Content DE
('SEO & Content', 'Sichtbarkeit, die bleibt', 'Strategische Content-Planung, SEO-Optimierung und redaktionelle Workflows für nachhaltiges organisches Wachstum.', 'de', 4),
-- SEO & Content EN
('SEO & Content', 'Visibility that lasts', 'Strategic content planning, SEO optimization and editorial workflows for sustainable organic growth.', 'en', 4),
-- Web- & App-Entwicklung DE
('Web- & App-Entwicklung', 'Digitale Produkte, die skalieren', 'Von Websites bis Web-Apps: Moderne Entwicklung mit Next.js, React und Cloud-Technologien. Schnittstellen, Integrationen und individuelle Lösungen.', 'de', 5),
-- Web- & App-Entwicklung EN
('Web & App Development', 'Digital products that scale', 'From websites to web apps: Modern development with Next.js, React and cloud technologies. APIs, integrations and custom solutions.', 'en', 5),
-- IT- & Cloud-Services DE
('IT- & Cloud-Services', 'Infrastruktur, die trägt', 'Cloud-Architekturen, Hosting, Monitoring und technischer Support. Sichere und skalierbare Lösungen für Ihren digitalen Betrieb.', 'de', 6),
-- IT- & Cloud-Services EN
('IT & Cloud Services', 'Infrastructure that supports', 'Cloud architectures, hosting, monitoring and technical support. Secure and scalable solutions for your digital operations.', 'en', 6);

-- Update existing Branding service locales
UPDATE services_locales SET
  subtitle = 'Marken, die im Kopf bleiben',
  description = 'Von Markenstrategie bis Designsystem: Wir entwickeln Markenidentitäten, die Ihre Zielgruppe ansprechen und Ihr Unternehmen differenzieren.'
WHERE _parent_id = 1 AND _locale = 'de';

UPDATE services_locales SET
  subtitle = 'Brands that stick',
  description = 'From brand strategy to design systems: We develop brand identities that resonate with your audience and differentiate your business.'
WHERE _parent_id = 1 AND _locale = 'en';

-- Update existing Webdesign service locales
UPDATE services_locales SET
  subtitle = 'Websites, die wirken',
  description = 'Von UX-Konzept bis Go-Live: Moderne Websites und Online-Shops, die konvertieren. WordPress, WooCommerce, Next.js und maßgeschneiderte Lösungen.'
WHERE _parent_id = 2 AND _locale = 'de';

UPDATE services_locales SET
  subtitle = 'Websites that work',
  description = 'From UX concept to go-live: Modern websites and online shops that convert. WordPress, WooCommerce, Next.js and custom solutions.'
WHERE _parent_id = 2 AND _locale = 'en';

-- Step 5: Create Sub-Services

-- ========================================
-- BRANDING SUB-SERVICES (parent_id = 1)
-- ========================================

INSERT INTO sub_services (id, slug, parent_service_id, icon, "order") VALUES
(1, 'markenstrategie-positionierung', 1, 'target', 1),
(2, 'visuelle-identitaet', 1, 'palette', 2),
(3, 'markenrichtlinien-vorlagen', 1, 'file-text', 3),
(4, 'rebranding', 1, 'refresh-cw', 4);

INSERT INTO sub_services_locales (title, subtitle, description, _locale, _parent_id) VALUES
-- Markenstrategie DE
('Markenstrategie & Positionierung', 'Die Basis für alles, was folgt', 'Markenanalyse, Wettbewerbsabgleich, Value Proposition, Messaging Framework, Markenarchitektur und strategische Namensentwicklung.', 'de', 1),
('Brand Strategy & Positioning', 'The foundation for everything that follows', 'Brand analysis, competitive benchmarking, value proposition, messaging framework, brand architecture and strategic naming.', 'en', 1),
-- Visuelle Identität DE
('Visuelle Identität & Designsysteme', 'Der Look, der bleibt', 'Logo-Design, Farbkonzepte, Typografie-Systeme, Key Visuals und konsistente Bildwelten für alle Kanäle.', 'de', 2),
('Visual Identity & Design Systems', 'The look that lasts', 'Logo design, color concepts, typography systems, key visuals and consistent imagery for all channels.', 'en', 2),
-- Markenrichtlinien DE
('Markenrichtlinien & Vorlagen', 'Konsistenz auf Knopfdruck', 'Brand Guidelines, Social-Media-Templates, Präsentations- und Angebotsvorlagen für interne und externe Kommunikation.', 'de', 3),
('Brand Guidelines & Templates', 'Consistency at the push of a button', 'Brand guidelines, social media templates, presentation and proposal templates for internal and external communication.', 'en', 3),
-- Rebranding DE
('Rebranding & Markenweiterentwicklung', 'Evolution statt Revolution', 'Marken-Audit, visuelle und inhaltliche Weiterentwicklung, Re-Positionierung bestehender Marken.', 'de', 4),
('Rebranding & Brand Evolution', 'Evolution, not revolution', 'Brand audit, visual and content development, repositioning of existing brands.', 'en', 4);

-- ========================================
-- WEBDESIGN SUB-SERVICES (parent_id = 2)
-- ========================================

INSERT INTO sub_services (id, slug, parent_service_id, icon, "order") VALUES
(5, 'informationsarchitektur', 2, 'sitemap', 1),
(6, 'ux-konzepte-prototypen', 2, 'layout', 2),
(7, 'ui-design-designsysteme', 2, 'panels-top-left', 3),
(8, 'webentwicklung-cms', 2, 'globe', 4),
(9, 'barrierefreiheit-performance', 2, 'zap', 5);

INSERT INTO sub_services_locales (title, subtitle, description, _locale, _parent_id) VALUES
-- Informationsarchitektur DE
('Informationsarchitektur & Seitenstruktur', 'Ordnung schafft Klarheit', 'Seitenbaum- und Navigationskonzepte, Content-Hierarchien und Conversion-Logik für optimale User Journeys.', 'de', 5),
('Information Architecture & Site Structure', 'Order creates clarity', 'Sitemap and navigation concepts, content hierarchies and conversion logic for optimal user journeys.', 'en', 5),
-- UX-Konzepte DE
('UX-Konzepte & Prototypen', 'Testen bevor es teuer wird', 'Wireframes, Nutzerflows und interaktive Prototypen für validierte Design-Entscheidungen.', 'de', 6),
('UX Concepts & Prototypes', 'Test before it gets expensive', 'Wireframes, user flows and interactive prototypes for validated design decisions.', 'en', 6),
-- UI-Design DE
('UI-Design & Designsysteme', 'Interfaces, die begeistern', 'Interface-Design, Komponenten-Bibliotheken, Responsive Design und UI/UX für Software und komplexe Produkte.', 'de', 7),
('UI Design & Design Systems', 'Interfaces that inspire', 'Interface design, component libraries, responsive design and UI/UX for software and complex products.', 'en', 7),
-- Webentwicklung DE
('Webentwicklung & CMS', 'Code, der funktioniert', 'WordPress, Elementor, WooCommerce-Shops, Landingpages und Next.js/Headless CMS-Entwicklung.', 'de', 8),
('Web Development & CMS', 'Code that works', 'WordPress, Elementor, WooCommerce shops, landing pages and Next.js/Headless CMS development.', 'en', 8),
-- Barrierefreiheit DE
('Barrierefreiheit & Performance', 'Schnell und für alle', 'WCAG-Grundlagen, Performance-Optimierung und Usability-Checks für inklusive Websites.', 'de', 9),
('Accessibility & Performance', 'Fast and for everyone', 'WCAG basics, performance optimization and usability checks for inclusive websites.', 'en', 9);

-- ========================================
-- DIGITAL MARKETING SUB-SERVICES (parent_id = 3)
-- ========================================

INSERT INTO sub_services (id, slug, parent_service_id, icon, "order") VALUES
(10, 'kampagnenstrategie-funnel', 3, 'target', 1),
(11, 'paid-media-content-kampagnen', 3, 'megaphone', 2),
(12, 'email-marketing-automatisierung', 3, 'mail', 3),
(13, 'tracking-optimierung', 3, 'bar-chart', 4);

INSERT INTO sub_services_locales (title, subtitle, description, _locale, _parent_id) VALUES
-- Kampagnenstrategie DE
('Kampagnenstrategie & Funnel-Design', 'Der Plan für messbare Ergebnisse', 'Zieldefinition, KPI-Setups, Funnel-Architektur, Customer Journey Mapping und Persona-Entwicklung.', 'de', 10),
('Campaign Strategy & Funnel Design', 'The plan for measurable results', 'Goal definition, KPI setups, funnel architecture, customer journey mapping and persona development.', 'en', 10),
-- Paid Media DE
('Paid Media & Content-Kampagnen', 'Reichweite, die konvertiert', 'Google Ads, Social Ads, Kampagnen-Creatives und conversion-orientierte Landingpages.', 'de', 11),
('Paid Media & Content Campaigns', 'Reach that converts', 'Google Ads, Social Ads, campaign creatives and conversion-oriented landing pages.', 'en', 11),
-- Email Marketing DE
('E-Mail- & Marketing-Automatisierung', 'Der direkte Draht', 'Newsletter-Strategien, Automationen, Sequences und CRM-Integration für effektives Lead Nurturing.', 'de', 12),
('Email & Marketing Automation', 'The direct line', 'Newsletter strategies, automations, sequences and CRM integration for effective lead nurturing.', 'en', 12),
-- Tracking DE
('Tracking & Optimierung', 'Daten, die entscheiden', 'Conversion-Tracking, Dashboards, Reporting und datenbasierte Kampagnen-Optimierung.', 'de', 13),
('Tracking & Optimization', 'Data that decides', 'Conversion tracking, dashboards, reporting and data-driven campaign optimization.', 'en', 13);

-- ========================================
-- SEO & CONTENT SUB-SERVICES (parent_id = 4)
-- ========================================

INSERT INTO sub_services (id, slug, parent_service_id, icon, "order") VALUES
(14, 'content-strategie-themenplanung', 4, 'file-text', 1),
(15, 'content-strukturierung', 4, 'layers', 2),
(16, 'redaktionsplaene-content-systeme', 4, 'calendar', 3),
(17, 'content-produktion', 4, 'video', 4),
(18, 'seo-messung-wirkung', 4, 'trending-up', 5);

INSERT INTO sub_services_locales (title, subtitle, description, _locale, _parent_id) VALUES
-- Content-Strategie DE
('Content-Strategie & Themenplanung', 'Der rote Faden', 'Keyword- und Themencluster-Analyse, Suchintentionen, Content-Formate und SEO-Roadmaps.', 'de', 14),
('Content Strategy & Topic Planning', 'The common thread', 'Keyword and topic cluster analysis, search intents, content formats and SEO roadmaps.', 'en', 14),
-- Content-Strukturierung DE
('Strukturierung bestehender Inhalte', 'Ordnung im Content-Chaos', 'Content-Audits, Seiten- und Blog-Optimierung sowie interne Verlinkungsstrategien.', 'de', 15),
('Structuring Existing Content', 'Order in the content chaos', 'Content audits, page and blog optimization and internal linking strategies.', 'en', 15),
-- Redaktionspläne DE
('Redaktionspläne & Content-Systeme', 'Planung, die funktioniert', 'Redaktionspläne (monatlich/quartalsweise), Content-Workflows und CMS-Strukturen.', 'de', 16),
('Editorial Plans & Content Systems', 'Planning that works', 'Editorial plans (monthly/quarterly), content workflows and CMS structures.', 'en', 16),
-- Content-Produktion DE
('Content-Produktion', 'Content, der wirkt', 'Copywriting, Social Media Content, Reels & Videos, Business-Fotografie und Website-Animationen.', 'de', 17),
('Content Production', 'Content that works', 'Copywriting, social media content, reels & videos, business photography and website animations.', 'en', 17),
-- SEO-Messung DE
('Messung & Wirkung', 'Erfolge sichtbar machen', 'SEO-Monitoring, Ranking- und Traffic-Reports sowie Content-Performance-Analysen.', 'de', 18),
('Measurement & Impact', 'Making success visible', 'SEO monitoring, ranking and traffic reports and content performance analysis.', 'en', 18);

-- ========================================
-- WEB- & APP-ENTWICKLUNG SUB-SERVICES (parent_id = 5)
-- ========================================

INSERT INTO sub_services (id, slug, parent_service_id, icon, "order") VALUES
(19, 'technische-architektur', 5, 'server', 1),
(20, 'web-app-entwicklung', 5, 'code', 2),
(21, 'schnittstellen-integrationen', 5, 'link', 3),
(22, 'qualitaetssicherung-testing', 5, 'check-circle', 4);

INSERT INTO sub_services_locales (title, subtitle, description, _locale, _parent_id) VALUES
-- Technische Architektur DE
('Technische Architektur & Systemdesign', 'Das Fundament', 'CMS-Auswahl, System-Konzeption und Skalierbarkeitsplanung für zukunftssichere Lösungen.', 'de', 19),
('Technical Architecture & System Design', 'The foundation', 'CMS selection, system conception and scalability planning for future-proof solutions.', 'en', 19),
-- Web-App-Entwicklung DE
('Web- & App-Entwicklung', 'Digitale Produkte', 'Website-Entwicklung (Next.js, React), Web-Apps, Mobile Apps und Desktop-Software.', 'de', 20),
('Web & App Development', 'Digital products', 'Website development (Next.js, React), web apps, mobile apps and desktop software.', 'en', 20),
-- Schnittstellen DE
('Schnittstellen & Integrationen', 'Alles verbunden', 'CRM-Anbindungen, API-Integrationen (REST, GraphQL, Webhooks) und Marketing-Tool-Integrationen.', 'de', 21),
('APIs & Integrations', 'Everything connected', 'CRM connections, API integrations (REST, GraphQL, Webhooks) and marketing tool integrations.', 'en', 21),
-- QA DE
('Qualitätssicherung & Testing', 'Qualität vor Launch', 'UI/UX-Usability Tests, Funktionstests, Performance-Tests und Bugfixing.', 'de', 22),
('Quality Assurance & Testing', 'Quality before launch', 'UI/UX usability tests, functional tests, performance tests and bugfixing.', 'en', 22);

-- ========================================
-- IT- & CLOUD-SERVICES SUB-SERVICES (parent_id = 6)
-- ========================================

INSERT INTO sub_services (id, slug, parent_service_id, icon, "order") VALUES
(23, 'cloud-architektur-migration', 6, 'cloud', 1),
(24, 'monitoring-wartung', 6, 'activity', 2),
(25, 'sicherheit-backups', 6, 'shield', 3),
(26, 'technischer-betrieb-support', 6, 'headphones', 4),
(27, 'workflow-automation', 6, 'workflow', 5);

INSERT INTO sub_services_locales (title, subtitle, description, _locale, _parent_id) VALUES
-- Cloud-Architektur DE
('Cloud-Architekturen & Migration', 'In die Cloud, richtig gemacht', 'Hosting-Konzepte, Cloud-Migration und Skalierungsstrategien für wachsende Anforderungen.', 'de', 23),
('Cloud Architectures & Migration', 'To the cloud, done right', 'Hosting concepts, cloud migration and scaling strategies for growing requirements.', 'en', 23),
-- Monitoring DE
('Monitoring & Wartung', 'Immer im Blick', 'System-Monitoring, Updates, Wartung und Verfügbarkeits-Kontrollen für stabilen Betrieb.', 'de', 24),
('Monitoring & Maintenance', 'Always in sight', 'System monitoring, updates, maintenance and availability controls for stable operations.', 'en', 24),
-- Sicherheit DE
('Sicherheit & Backups', 'Geschützt und gesichert', 'Backup-Strategien, Sicherheits-Checks und Datenschutz-Grundlagen für Ihre Systeme.', 'de', 25),
('Security & Backups', 'Protected and secured', 'Backup strategies, security checks and data protection basics for your systems.', 'en', 25),
-- Support DE
('Technischer Betrieb & Support', 'Wenn Sie uns brauchen', 'Laufender Support, Incident-Management und technische Betreuung für Ihre digitale Infrastruktur.', 'de', 26),
('Technical Operations & Support', 'When you need us', 'Ongoing support, incident management and technical support for your digital infrastructure.', 'en', 26),
-- Workflow DE
('Workflow & Automation', 'Prozesse, die laufen', 'Automatisierung (Zapier, Make, n8n), Workflow-Optimierung, Member Areas und intelligente Formular-Logiken.', 'de', 27),
('Workflow & Automation', 'Processes that run', 'Automation (Zapier, Make, n8n), workflow optimization, member areas and smart form logic.', 'en', 27);
