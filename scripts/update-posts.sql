-- Blog Post Enhancement SQL Script
-- Adds Expert Quotes, FAQs, Sources and Related Services for all 7 posts

-- First, backup tables
-- CREATE TABLE IF NOT EXISTS posts_expert_quotes_backup AS SELECT * FROM posts_expert_quotes;
-- CREATE TABLE IF NOT EXISTS posts_faqs_backup AS SELECT * FROM posts_faqs;
-- CREATE TABLE IF NOT EXISTS posts_sources_backup AS SELECT * FROM posts_sources;

-- Clear existing data (if any)
DELETE FROM posts_expert_quotes;
DELETE FROM posts_faqs;
DELETE FROM posts_sources;
DELETE FROM posts_sources_locales;
DELETE FROM posts_rels WHERE path = 'relatedServices';

-- ===========================================
-- POST 1: Website Kosten 2025
-- ===========================================

-- Expert Quotes DE
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 1, 'eq1-1-de', 'Design ist nicht nur, wie etwas aussieht und sich anfühlt. Design ist, wie es funktioniert.', 'Steve Jobs', 'Mitgründer, Apple Inc.', 'The New York Times, 2003', 'de'),
(2, 1, 'eq1-2-de', 'Ihre Website ist oft der erste Eindruck, den ein potenzieller Kunde von Ihrem Unternehmen bekommt. Investieren Sie entsprechend.', 'Neil Patel', 'Digital Marketing Experte', 'neilpatel.com', 'de');

-- Expert Quotes EN
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 1, 'eq1-1-en', 'Design is not just what it looks like and feels like. Design is how it works.', 'Steve Jobs', 'Co-founder, Apple Inc.', 'The New York Times, 2003', 'en'),
(2, 1, 'eq1-2-en', 'Your website is often the first impression a potential customer has of your business. Invest accordingly.', 'Neil Patel', 'Digital Marketing Expert', 'neilpatel.com', 'en');

-- FAQs DE
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 1, 'faq1-1-de', 'Wie viel kostet eine einfache Unternehmenswebsite in Österreich?', 'Eine professionelle Unternehmenswebsite mit 5-10 Seiten kostet in Österreich typischerweise zwischen €3.000 und €8.000. Der Preis hängt von Design-Komplexität, Funktionen und CMS-Wahl ab.', 'de'),
(2, 1, 'faq1-2-de', 'Was ist im Website-Preis normalerweise inkludiert?', 'Standardmäßig sind enthalten: Responsive Design, SEO-Grundoptimierung, SSL-Zertifikat, DSGVO-konforme Gestaltung, Kontaktformular und ein Content-Management-System zur selbstständigen Bearbeitung.', 'de'),
(3, 1, 'faq1-3-de', 'Welche laufenden Kosten fallen für eine Website an?', 'Laufende Kosten umfassen: Hosting (€20-100/Monat), Domain (€10-20/Jahr), SSL-Zertifikat (oft im Hosting inkludiert), und optional Wartung & Updates (€50-200/Monat).', 'de'),
(4, 1, 'faq1-4-de', 'Warum sind manche Websites so viel teurer als andere?', 'Preisunterschiede entstehen durch: Custom Design vs. Templates, Anzahl der Seiten, Funktionsumfang (E-Commerce, Buchungssysteme), Mehrsprachigkeit, und die Erfahrung der Agentur.', 'de');

-- FAQs EN
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 1, 'faq1-1-en', 'How much does a simple business website cost in Austria?', 'A professional business website with 5-10 pages typically costs between €3,000 and €8,000 in Austria. The price depends on design complexity, features, and CMS choice.', 'en'),
(2, 1, 'faq1-2-en', 'What is typically included in the website price?', 'Standard inclusions are: Responsive design, basic SEO optimization, SSL certificate, GDPR-compliant design, contact form, and a content management system for self-editing.', 'en'),
(3, 1, 'faq1-3-en', 'What ongoing costs are there for a website?', 'Ongoing costs include: Hosting (€20-100/month), Domain (€10-20/year), SSL certificate (often included in hosting), and optionally maintenance & updates (€50-200/month).', 'en'),
(4, 1, 'faq1-4-en', 'Why are some websites so much more expensive than others?', 'Price differences arise from: Custom design vs. templates, number of pages, feature scope (e-commerce, booking systems), multilingualism, and agency experience.', 'en');

-- Sources
INSERT INTO posts_sources (_order, _parent_id, id, url, author, year) VALUES
(1, 1, 'src1-1', 'https://www.wko.at', NULL, '2025'),
(2, 1, 'src1-2', 'https://www.statista.com', NULL, '2024');

INSERT INTO posts_sources_locales (title, id, _locale, _parent_id) VALUES
('WKO Österreich - Webdesign Preise', 1, 'de', 'src1-1'),
('WKO Austria - Web Design Prices', 2, 'en', 'src1-1'),
('Statista - Website-Kosten Statistik', 3, 'de', 'src1-2'),
('Statista - Website Cost Statistics', 4, 'en', 'src1-2');

-- Related Services (webdesign = 2, branding = 1)
INSERT INTO posts_rels (parent_id, path, services_id, "order") VALUES
(1, 'relatedServices', 2, 1),
(1, 'relatedServices', 1, 2);

-- ===========================================
-- POST 2: WordPress vs Webflow
-- ===========================================

-- Expert Quotes DE
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 2, 'eq2-1-de', 'Die beste Technologie ist die, die Ihren Geschäftszielen am besten dient – nicht die populärste.', 'Matt Mullenweg', 'Mitgründer, WordPress', 'WordPress.org', 'de'),
(2, 2, 'eq2-2-de', 'No-Code-Tools wie Webflow demokratisieren das Web-Design und ermöglichen schnellere Iterationen.', 'Vlad Magdalin', 'CEO, Webflow', 'Webflow Blog', 'de');

-- Expert Quotes EN
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 2, 'eq2-1-en', 'The best technology is the one that serves your business goals best – not the most popular one.', 'Matt Mullenweg', 'Co-founder, WordPress', 'WordPress.org', 'en'),
(2, 2, 'eq2-2-en', 'No-code tools like Webflow democratize web design and enable faster iterations.', 'Vlad Magdalin', 'CEO, Webflow', 'Webflow Blog', 'en');

-- FAQs DE
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 2, 'faq2-1-de', 'Ist WordPress oder Webflow besser für SEO?', 'Beide Plattformen sind SEO-fähig. WordPress bietet mehr Plugins wie Yoast SEO, während Webflow saubereren Code und schnellere Ladezeiten hat. Für komplexe SEO-Anforderungen ist WordPress flexibler.', 'de'),
(2, 2, 'faq2-2-de', 'Welches CMS ist günstiger – WordPress oder Webflow?', 'WordPress ist bei den Lizenzkosten günstiger (Open Source), aber Hosting und Plugins kosten extra. Webflow hat feste Monatsgebühren (€12-36/Monat), inkludiert aber Hosting und SSL.', 'de'),
(3, 2, 'faq2-3-de', 'Kann ich von WordPress zu Webflow wechseln?', 'Ja, ein Wechsel ist möglich, erfordert aber eine Neu-Erstellung der Website. Inhalte können exportiert werden, aber Design und Funktionen müssen neu gebaut werden.', 'de');

-- FAQs EN
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 2, 'faq2-1-en', 'Is WordPress or Webflow better for SEO?', 'Both platforms are SEO-capable. WordPress offers more plugins like Yoast SEO, while Webflow has cleaner code and faster loading times. For complex SEO requirements, WordPress is more flexible.', 'en'),
(2, 2, 'faq2-2-en', 'Which CMS is cheaper – WordPress or Webflow?', 'WordPress is cheaper in licensing (open source), but hosting and plugins cost extra. Webflow has fixed monthly fees (€12-36/month), but includes hosting and SSL.', 'en'),
(3, 2, 'faq2-3-en', 'Can I switch from WordPress to Webflow?', 'Yes, switching is possible but requires rebuilding the website. Content can be exported, but design and functionality need to be recreated.', 'en');

-- Sources
INSERT INTO posts_sources (_order, _parent_id, id, url, author, year) VALUES
(1, 2, 'src2-1', 'https://w3techs.com/technologies/overview/content_management', NULL, '2025'),
(2, 2, 'src2-2', 'https://webflow.com/vs/wordpress', NULL, '2024');

INSERT INTO posts_sources_locales (title, id, _locale, _parent_id) VALUES
('W3Techs - CMS Marktanteile', 5, 'de', 'src2-1'),
('W3Techs - CMS Market Share', 6, 'en', 'src2-1'),
('Webflow vs WordPress Vergleich', 7, 'de', 'src2-2'),
('Webflow vs WordPress Comparison', 8, 'en', 'src2-2');

-- Related Services (webdesign = 2, technische-loesungen = 6)
INSERT INTO posts_rels (parent_id, path, services_id, "order") VALUES
(2, 'relatedServices', 2, 1),
(2, 'relatedServices', 6, 2);

-- ===========================================
-- POST 3: Core Web Vitals
-- ===========================================

-- Expert Quotes DE
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 3, 'eq3-1-de', 'Geschwindigkeit ist kein Feature, sie ist eine Grundvoraussetzung.', 'Marissa Mayer', 'Ehemalige VP, Google', 'Google I/O Konferenz', 'de'),
(2, 3, 'eq3-2-de', 'Eine Verzögerung von 100 Millisekunden bei der Ladezeit kann die Conversion-Rate um 7% senken.', 'Akamai Research', 'Performance Studie', 'Akamai State of Online Retail Performance Report', 'de');

-- Expert Quotes EN
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 3, 'eq3-1-en', 'Speed is not a feature, it''s a fundamental requirement.', 'Marissa Mayer', 'Former VP, Google', 'Google I/O Conference', 'en'),
(2, 3, 'eq3-2-en', 'A 100-millisecond delay in load time can decrease conversion rates by 7%.', 'Akamai Research', 'Performance Study', 'Akamai State of Online Retail Performance Report', 'en');

-- FAQs DE
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 3, 'faq3-1-de', 'Was sind Core Web Vitals und warum sind sie wichtig?', 'Core Web Vitals sind drei Google-Metriken (LCP, INP, CLS), die die Nutzererfahrung messen. Sie sind seit 2021 ein Ranking-Faktor und beeinflussen direkt Ihre Position in den Suchergebnissen.', 'de'),
(2, 3, 'faq3-2-de', 'Was ist ein guter LCP-Wert?', 'Ein guter LCP (Largest Contentful Paint) liegt unter 2,5 Sekunden. 2,5-4 Sekunden gilt als verbesserungswürdig, über 4 Sekunden als schlecht. LCP misst, wie schnell der Hauptinhalt lädt.', 'de'),
(3, 3, 'faq3-3-de', 'Wie verbessere ich meinen CLS-Score?', 'Für einen guten CLS (unter 0,1): Geben Sie Bildern feste Größen, laden Sie Schriften mit font-display: swap, vermeiden Sie dynamisch eingefügte Inhalte über dem Fold.', 'de'),
(4, 3, 'faq3-4-de', 'Beeinflussen Core Web Vitals das Google-Ranking?', 'Ja, seit Mai 2021 sind Core Web Vitals ein offizieller Ranking-Faktor. Bei gleicher Content-Qualität bevorzugt Google Seiten mit besseren Performance-Werten.', 'de');

-- FAQs EN
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 3, 'faq3-1-en', 'What are Core Web Vitals and why are they important?', 'Core Web Vitals are three Google metrics (LCP, INP, CLS) that measure user experience. They''ve been a ranking factor since 2021 and directly influence your position in search results.', 'en'),
(2, 3, 'faq3-2-en', 'What is a good LCP value?', 'A good LCP (Largest Contentful Paint) is under 2.5 seconds. 2.5-4 seconds needs improvement, over 4 seconds is poor. LCP measures how quickly the main content loads.', 'en'),
(3, 3, 'faq3-3-en', 'How do I improve my CLS score?', 'For a good CLS (under 0.1): Give images fixed dimensions, load fonts with font-display: swap, avoid dynamically inserted content above the fold.', 'en'),
(4, 3, 'faq3-4-en', 'Do Core Web Vitals affect Google ranking?', 'Yes, since May 2021, Core Web Vitals are an official ranking factor. With equal content quality, Google prefers pages with better performance scores.', 'en');

-- Sources
INSERT INTO posts_sources (_order, _parent_id, id, url, author, year) VALUES
(1, 3, 'src3-1', 'https://web.dev/vitals/', NULL, '2024'),
(2, 3, 'src3-2', 'https://developer.chrome.com/docs/crux/', NULL, '2025');

INSERT INTO posts_sources_locales (title, id, _locale, _parent_id) VALUES
('Google - Web Vitals Dokumentation', 9, 'de', 'src3-1'),
('Google - Web Vitals Documentation', 10, 'en', 'src3-1'),
('Chrome UX Report', 11, 'de', 'src3-2'),
('Chrome UX Report', 12, 'en', 'src3-2');

-- Related Services (webdesign = 2, seo = 4, technische-loesungen = 6)
INSERT INTO posts_rels (parent_id, path, services_id, "order") VALUES
(3, 'relatedServices', 2, 1),
(3, 'relatedServices', 4, 2),
(3, 'relatedServices', 6, 3);

-- ===========================================
-- POST 4: Brand Identity
-- ===========================================

-- Expert Quotes DE
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 4, 'eq4-1-de', 'Ihre Marke ist das, was andere Leute über Sie sagen, wenn Sie nicht im Raum sind.', 'Jeff Bezos', 'Gründer, Amazon', 'Amazon Shareholder Letter', 'de'),
(2, 4, 'eq4-2-de', 'Design ist der stille Botschafter Ihrer Marke.', 'Paul Rand', 'Legendärer Grafikdesigner', 'Design, Form, and Chaos', 'de');

-- Expert Quotes EN
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 4, 'eq4-1-en', 'Your brand is what other people say about you when you''re not in the room.', 'Jeff Bezos', 'Founder, Amazon', 'Amazon Shareholder Letter', 'en'),
(2, 4, 'eq4-2-en', 'Design is the silent ambassador of your brand.', 'Paul Rand', 'Legendary Graphic Designer', 'Design, Form, and Chaos', 'en');

-- FAQs DE
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 4, 'faq4-1-de', 'Was ist der Unterschied zwischen Marke und Logo?', 'Ein Logo ist nur ein visuelles Symbol, während eine Marke die gesamte Wahrnehmung umfasst: Werte, Ton, Erfahrung, Emotionen und Versprechen, die Ihr Unternehmen verkörpert.', 'de'),
(2, 4, 'faq4-2-de', 'Wie lange dauert die Entwicklung einer Brand Identity?', 'Ein vollständiges Brand Identity Projekt dauert typischerweise 4-8 Wochen. Das umfasst Research, Strategie, Logo-Design, Farbpalette, Typografie und Brand Guidelines.', 'de'),
(3, 4, 'faq4-3-de', 'Wann sollte ich meine Marke überarbeiten?', 'Ein Rebranding ist sinnvoll bei: Strategischer Neuausrichtung, veralteter visueller Identität, Merger/Akquisition, negativen Assoziationen, oder wenn die Marke die Zielgruppe nicht mehr anspricht.', 'de');

-- FAQs EN
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 4, 'faq4-1-en', 'What is the difference between a brand and a logo?', 'A logo is just a visual symbol, while a brand encompasses the entire perception: values, tone, experience, emotions, and promises that your company embodies.', 'en'),
(2, 4, 'faq4-2-en', 'How long does brand identity development take?', 'A complete brand identity project typically takes 4-8 weeks. This includes research, strategy, logo design, color palette, typography, and brand guidelines.', 'en'),
(3, 4, 'faq4-3-en', 'When should I rebrand?', 'Rebranding makes sense for: Strategic realignment, outdated visual identity, merger/acquisition, negative associations, or when the brand no longer resonates with the target audience.', 'en');

-- Sources
INSERT INTO posts_sources (_order, _parent_id, id, url, author, year) VALUES
(1, 4, 'src4-1', 'https://www.martyneumeier.com/the-brand-gap', 'Marty Neumeier', '2006'),
(2, 4, 'src4-2', 'https://interbrand.com/best-brands/', NULL, '2024');

INSERT INTO posts_sources_locales (title, id, _locale, _parent_id) VALUES
('Marty Neumeier - The Brand Gap', 13, 'de', 'src4-1'),
('Marty Neumeier - The Brand Gap', 14, 'en', 'src4-1'),
('Interbrand - Best Global Brands', 15, 'de', 'src4-2'),
('Interbrand - Best Global Brands', 16, 'en', 'src4-2');

-- Related Services (branding = 1, webdesign = 2, content-visuals = 5)
INSERT INTO posts_rels (parent_id, path, services_id, "order") VALUES
(4, 'relatedServices', 1, 1),
(4, 'relatedServices', 2, 2),
(4, 'relatedServices', 5, 3);

-- ===========================================
-- POST 5: SEO für Anfänger
-- ===========================================

-- Expert Quotes DE
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 5, 'eq5-1-de', 'Der beste Ort, eine Leiche zu verstecken, ist Seite 2 der Google-Suchergebnisse.', 'Unbekannt', 'SEO-Branchenwitz', '', 'de'),
(2, 5, 'eq5-2-de', 'SEO ist keine Taktik mehr, es ist eine Geschäftsstrategie.', 'Rand Fishkin', 'Gründer, SparkToro & Moz', 'Whiteboard Friday', 'de');

-- Expert Quotes EN
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 5, 'eq5-1-en', 'The best place to hide a dead body is page 2 of Google search results.', 'Unknown', 'SEO Industry Joke', '', 'en'),
(2, 5, 'eq5-2-en', 'SEO is no longer a tactic, it''s a business strategy.', 'Rand Fishkin', 'Founder, SparkToro & Moz', 'Whiteboard Friday', 'en');

-- FAQs DE
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 5, 'faq5-1-de', 'Wie lange dauert es, bis SEO Ergebnisse zeigt?', 'SEO ist ein Marathon, kein Sprint. Erste Verbesserungen sehen Sie nach 3-6 Monaten, signifikante Ranking-Veränderungen nach 6-12 Monaten. Für kompetitive Keywords kann es länger dauern.', 'de'),
(2, 5, 'faq5-2-de', 'Was sind die wichtigsten SEO-Ranking-Faktoren 2025?', 'Die Top-Faktoren sind: Hochwertiger Content (E-E-A-T), Backlinks von vertrauenswürdigen Seiten, Core Web Vitals, Mobile-First Indexing, und User Experience Signale.', 'de'),
(3, 5, 'faq5-3-de', 'Brauche ich für SEO einen Experten oder kann ich das selbst machen?', 'Basis-SEO (Meta-Tags, Struktur, Content) können Sie selbst umsetzen. Für technisches SEO, Linkbuilding und Wettbewerbsanalyse empfehlen wir professionelle Unterstützung.', 'de'),
(4, 5, 'faq5-4-de', 'Was kostet SEO-Optimierung?', 'SEO-Pakete kosten zwischen €500-2.000/Monat für KMUs. Einmalige Audits starten bei €500-1.500. Der ROI ist langfristig oft höher als bei bezahlter Werbung.', 'de');

-- FAQs EN
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 5, 'faq5-1-en', 'How long does it take for SEO to show results?', 'SEO is a marathon, not a sprint. You''ll see initial improvements after 3-6 months, significant ranking changes after 6-12 months. For competitive keywords, it may take longer.', 'en'),
(2, 5, 'faq5-2-en', 'What are the most important SEO ranking factors in 2025?', 'Top factors are: High-quality content (E-E-A-T), backlinks from trusted sites, Core Web Vitals, Mobile-First Indexing, and user experience signals.', 'en'),
(3, 5, 'faq5-3-en', 'Do I need an SEO expert or can I do it myself?', 'Basic SEO (meta tags, structure, content) you can implement yourself. For technical SEO, link building, and competitive analysis, we recommend professional support.', 'en'),
(4, 5, 'faq5-4-en', 'What does SEO optimization cost?', 'SEO packages cost between €500-2,000/month for SMEs. One-time audits start at €500-1,500. The long-term ROI is often higher than paid advertising.', 'en');

-- Sources
INSERT INTO posts_sources (_order, _parent_id, id, url, author, year) VALUES
(1, 5, 'src5-1', 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', NULL, '2024'),
(2, 5, 'src5-2', 'https://moz.com/beginners-guide-to-seo', NULL, '2024');

INSERT INTO posts_sources_locales (title, id, _locale, _parent_id) VALUES
('Google Search Central - SEO Starter Guide', 17, 'de', 'src5-1'),
('Google Search Central - SEO Starter Guide', 18, 'en', 'src5-1'),
('Moz - Beginner''s Guide to SEO', 19, 'de', 'src5-2'),
('Moz - Beginner''s Guide to SEO', 20, 'en', 'src5-2');

-- Related Services (seo = 4, content-visuals = 5, digitale-strategie = 3)
INSERT INTO posts_rels (parent_id, path, services_id, "order") VALUES
(5, 'relatedServices', 4, 1),
(5, 'relatedServices', 5, 2),
(5, 'relatedServices', 3, 3);

-- ===========================================
-- POST 6: Customer Journey Mapping
-- ===========================================

-- Expert Quotes DE
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 6, 'eq6-1-de', 'Menschen kaufen keine Produkte, sie kaufen bessere Versionen von sich selbst.', 'Samuel Hulick', 'User Onboarding Experte', 'UserOnboard.com', 'de'),
(2, 6, 'eq6-2-de', 'Der Kunde hat immer recht – außer er liegt falsch über seine eigenen Bedürfnisse.', 'Steve Blank', 'Startup-Mentor, Stanford', 'The Startup Owner''s Manual', 'de');

-- Expert Quotes EN
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 6, 'eq6-1-en', 'People don''t buy products, they buy better versions of themselves.', 'Samuel Hulick', 'User Onboarding Expert', 'UserOnboard.com', 'en'),
(2, 6, 'eq6-2-en', 'The customer is always right – except when they''re wrong about their own needs.', 'Steve Blank', 'Startup Mentor, Stanford', 'The Startup Owner''s Manual', 'en');

-- FAQs DE
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 6, 'faq6-1-de', 'Was ist Customer Journey Mapping?', 'Customer Journey Mapping visualisiert alle Berührungspunkte (Touchpoints) zwischen Kunde und Unternehmen – von der ersten Wahrnehmung bis zum Kauf und darüber hinaus. Es hilft, Kundenbedürfnisse und Schmerzpunkte zu verstehen.', 'de'),
(2, 6, 'faq6-2-de', 'Welche Phasen hat eine Customer Journey?', 'Die typischen Phasen sind: Awareness (Bewusstsein), Consideration (Erwägung), Decision (Entscheidung), Purchase (Kauf), Retention (Bindung) und Advocacy (Weiterempfehlung).', 'de'),
(3, 6, 'faq6-3-de', 'Wie erstelle ich eine Customer Journey Map?', '1. Definieren Sie Buyer Personas, 2. Listen Sie alle Touchpoints auf, 3. Identifizieren Sie Kundenaktionen und Emotionen, 4. Finden Sie Pain Points, 5. Entwickeln Sie Verbesserungsideen, 6. Priorisieren und implementieren.', 'de');

-- FAQs EN
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 6, 'faq6-1-en', 'What is Customer Journey Mapping?', 'Customer Journey Mapping visualizes all touchpoints between customer and company – from initial awareness to purchase and beyond. It helps understand customer needs and pain points.', 'en'),
(2, 6, 'faq6-2-en', 'What phases does a Customer Journey have?', 'Typical phases are: Awareness, Consideration, Decision, Purchase, Retention, and Advocacy.', 'en'),
(3, 6, 'faq6-3-en', 'How do I create a Customer Journey Map?', '1. Define buyer personas, 2. List all touchpoints, 3. Identify customer actions and emotions, 4. Find pain points, 5. Develop improvement ideas, 6. Prioritize and implement.', 'en');

-- Sources
INSERT INTO posts_sources (_order, _parent_id, id, url, author, year) VALUES
(1, 6, 'src6-1', 'https://www.nngroup.com/articles/journey-mapping-101/', NULL, '2024'),
(2, 6, 'src6-2', 'https://blog.hubspot.com/service/customer-journey-map', NULL, '2024');

INSERT INTO posts_sources_locales (title, id, _locale, _parent_id) VALUES
('Nielsen Norman Group - Journey Mapping', 21, 'de', 'src6-1'),
('Nielsen Norman Group - Journey Mapping', 22, 'en', 'src6-1'),
('HubSpot - Customer Journey Guide', 23, 'de', 'src6-2'),
('HubSpot - Customer Journey Guide', 24, 'en', 'src6-2');

-- Related Services (digitale-strategie = 3, branding = 1, webdesign = 2)
INSERT INTO posts_rels (parent_id, path, services_id, "order") VALUES
(6, 'relatedServices', 3, 1),
(6, 'relatedServices', 1, 2),
(6, 'relatedServices', 2, 3);

-- ===========================================
-- POST 7: Bildoptimierung
-- ===========================================

-- Expert Quotes DE
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 7, 'eq7-1-de', 'Bilder sind oft der größte Anteil am Seitengewicht. Optimieren Sie hier zuerst.', 'Addy Osmani', 'Engineering Manager, Google Chrome', 'Image Optimization Guide', 'de'),
(2, 7, 'eq7-2-de', 'WebP bietet 25-34% bessere Kompression als JPEG bei gleicher Qualität.', 'Google Developers', 'WebP Dokumentation', 'developers.google.com', 'de');

-- Expert Quotes EN
INSERT INTO posts_expert_quotes (_order, _parent_id, id, quote, author, role, source, _locale) VALUES
(1, 7, 'eq7-1-en', 'Images are often the biggest contributor to page weight. Optimize here first.', 'Addy Osmani', 'Engineering Manager, Google Chrome', 'Image Optimization Guide', 'en'),
(2, 7, 'eq7-2-en', 'WebP provides 25-34% better compression than JPEG at equivalent quality.', 'Google Developers', 'WebP Documentation', 'developers.google.com', 'en');

-- FAQs DE
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 7, 'faq7-1-de', 'Welches Bildformat ist das beste für Websites?', 'WebP ist aktuell der beste Allrounder: 25-35% kleiner als JPEG/PNG bei gleicher Qualität. Für Fotos: WebP oder JPEG. Für Grafiken mit Transparenz: WebP oder PNG. Für Animationen: WebP oder GIF.', 'de'),
(2, 7, 'faq7-2-de', 'Wie groß sollten Bilder für Websites sein?', 'Die ideale Größe hängt vom Verwendungszweck ab: Hero-Bilder max. 1920px breit (150-300KB), Content-Bilder 800-1200px (50-150KB), Thumbnails 300-400px (20-50KB). Immer komprimiert.', 'de'),
(3, 7, 'faq7-3-de', 'Was ist Lazy Loading und sollte ich es verwenden?', 'Lazy Loading lädt Bilder erst, wenn sie in den sichtbaren Bereich scrollen. Es verbessert die initiale Ladezeit drastisch. Ja, Sie sollten es für alle Bilder außerhalb des sichtbaren Bereichs verwenden.', 'de'),
(4, 7, 'faq7-4-de', 'Wie wichtig sind Alt-Texte für SEO?', 'Sehr wichtig! Alt-Texte helfen Google, Bilder zu verstehen und verbessern die Barrierefreiheit. Beschreiben Sie das Bild präzise in 5-15 Wörtern und integrieren Sie relevante Keywords natürlich.', 'de');

-- FAQs EN
INSERT INTO posts_faqs (_order, _parent_id, id, question, answer, _locale) VALUES
(1, 7, 'faq7-1-en', 'Which image format is best for websites?', 'WebP is currently the best all-rounder: 25-35% smaller than JPEG/PNG at equal quality. For photos: WebP or JPEG. For graphics with transparency: WebP or PNG. For animations: WebP or GIF.', 'en'),
(2, 7, 'faq7-2-en', 'How large should images be for websites?', 'Ideal size depends on usage: Hero images max. 1920px wide (150-300KB), content images 800-1200px (50-150KB), thumbnails 300-400px (20-50KB). Always compressed.', 'en'),
(3, 7, 'faq7-3-en', 'What is Lazy Loading and should I use it?', 'Lazy Loading loads images only when they scroll into the visible area. It drastically improves initial load time. Yes, you should use it for all images outside the visible area.', 'en'),
(4, 7, 'faq7-4-en', 'How important are alt texts for SEO?', 'Very important! Alt texts help Google understand images and improve accessibility. Describe the image precisely in 5-15 words and integrate relevant keywords naturally.', 'en');

-- Sources
INSERT INTO posts_sources (_order, _parent_id, id, url, author, year) VALUES
(1, 7, 'src7-1', 'https://web.dev/fast/#optimize-your-images', NULL, '2024'),
(2, 7, 'src7-2', 'https://cloudinary.com/guides/image-optimization', NULL, '2024');

INSERT INTO posts_sources_locales (title, id, _locale, _parent_id) VALUES
('web.dev - Bildoptimierung', 25, 'de', 'src7-1'),
('web.dev - Image Optimization', 26, 'en', 'src7-1'),
('Cloudinary - Image Optimization Guide', 27, 'de', 'src7-2'),
('Cloudinary - Image Optimization Guide', 28, 'en', 'src7-2');

-- Related Services (webdesign = 2, seo = 4, technische-loesungen = 6)
INSERT INTO posts_rels (parent_id, path, services_id, "order") VALUES
(7, 'relatedServices', 2, 1),
(7, 'relatedServices', 4, 2),
(7, 'relatedServices', 6, 3);

-- Done!
SELECT 'Blog posts updated successfully!' as status;
SELECT 'Expert Quotes: ' || count(*) as count FROM posts_expert_quotes;
SELECT 'FAQs: ' || count(*) as count FROM posts_faqs;
SELECT 'Sources: ' || count(*) as count FROM posts_sources;
SELECT 'Related Services: ' || count(*) as count FROM posts_rels WHERE path = 'relatedServices';
