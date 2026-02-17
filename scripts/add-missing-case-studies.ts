/**
 * Add Missing Case Studies from Bene's List
 * - Updates 4 existing "confidential" projects with content
 * - Creates 9 new projects
 */

import Database from 'better-sqlite3'
import path from 'path'
import { randomUUID } from 'crypto'

const dbPath = path.join(process.cwd(), 'goldenwing.db')
const db = new Database(dbPath)

interface CaseStudy {
  slug: string
  title: { de: string; en: string }
  client: string
  category: string
  year: number
  industry: string[]
  companyDescription: { de: string; en: string }
  description: { de: string; en: string }
  challenge: { de: string; en: string }
  solution: { de: string; en: string }
  solutionPoints: { de: { title: string; description: string }[]; en: { title: string; description: string }[] }
  results: { metric: string; label: { de: string; en: string } }[]
  clientFeedback: { quote: { de: string; en: string }; author: string; role: { de: string; en: string } }
  isNew?: boolean
}

const caseStudies: CaseStudy[] = [
  // === UPDATE EXISTING "CONFIDENTIAL" PROJECTS ===
  {
    slug: 'banking-analytics',
    title: { de: 'Banking Analytics Platform', en: 'Banking Analytics Platform' },
    client: 'Banking Institution',
    category: 'software',
    year: 2024,
    industry: ['finance'],
    companyDescription: {
      de: 'Eine spezialisierte Analytics-Plattform für Finanzinstitute, die komplexe Finanz-Datenanalyse mit höchsten Compliance- und Sicherheitsstandards verbindet.',
      en: 'A specialized analytics platform for financial institutions that combines complex financial data analysis with the highest compliance and security standards.'
    },
    description: {
      de: 'Compliance-First Analytics-Plattform für Finanzinstitute mit Real-Time-Transaktionsanalyse.',
      en: 'Compliance-first analytics platform for financial institutions with real-time transaction analysis.'
    },
    challenge: {
      de: 'Banken benötigen leistungsfähige Analytics, müssen aber strenge Regulierungen einhalten. Die Integration komplexer Analyse-Systeme im Finanzumfeld erfordert höchste Anforderungen an Compliance und Stabilität.',
      en: 'Banks need powerful analytics but must comply with strict regulations. Integrating complex analysis systems in the financial environment requires the highest compliance and stability requirements.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine Compliance-First-Analytics-Plattform:',
      en: 'GoldenWing developed a compliance-first analytics platform:'
    },
    solutionPoints: {
      de: [
        { title: 'Secure-by-Design-Architektur', description: 'Datenschutz und Verschlüsselung' },
        { title: 'Banking-System-Integration', description: 'Anbindung an Core-Banking über sichere APIs' },
        { title: 'Real-Time-Processing', description: 'Stream-Processing für Live-Analytics' },
        { title: 'Compliance-Reporting', description: 'Automatisierte Regulatory-Reports' },
        { title: 'Audit-Trail', description: 'Lückenlose Nachvollziehbarkeit aller Aktivitäten' }
      ],
      en: [
        { title: 'Secure-by-Design Architecture', description: 'Data protection and encryption' },
        { title: 'Banking System Integration', description: 'Connection to core banking via secure APIs' },
        { title: 'Real-Time Processing', description: 'Stream processing for live analytics' },
        { title: 'Compliance Reporting', description: 'Automated regulatory reports' },
        { title: 'Audit Trail', description: 'Complete traceability of all activities' }
      ]
    },
    results: [
      { metric: '-75%', label: { de: 'Reporting-Zeit reduziert', en: 'reporting time reduced' } },
      { metric: '99.9%', label: { de: 'System-Uptime', en: 'system uptime' } },
      { metric: '100%', label: { de: 'GDPR & Banking-Compliance', en: 'GDPR & banking compliance' } }
    ],
    clientFeedback: {
      quote: {
        de: 'GoldenWing versteht Banking-Compliance. Die Analytics-Plattform ist nicht nur leistungsstark, sondern erfüllt alle regulatorischen Anforderungen.',
        en: 'GoldenWing understands banking compliance. The analytics platform is not only powerful but meets all regulatory requirements.'
      },
      author: 'Banking Institution',
      role: { de: 'CTO', en: 'CTO' }
    }
  },
  {
    slug: 'cloud-devops',
    title: { de: 'Cloud & DevOps Infrastructure', en: 'Cloud & DevOps Infrastructure' },
    client: 'Diverse Kunden',
    category: 'software',
    year: 2024,
    industry: ['technology'],
    companyDescription: {
      de: 'Mehrere Enterprise-Kunden aus verschiedenen Branchen, die moderne Cloud-Infrastruktur und DevOps-Praktiken für skalierbare, zuverlässige Systeme benötigen.',
      en: 'Multiple enterprise clients from various industries who need modern cloud infrastructure and DevOps practices for scalable, reliable systems.'
    },
    description: {
      de: 'Cloud-Transformation und DevOps-Automatisierung für Enterprise-Kunden mit 90% Deployment-Automatisierung.',
      en: 'Cloud transformation and DevOps automation for enterprise clients with 90% deployment automation.'
    },
    challenge: {
      de: 'Unternehmen kämpfen mit Legacy-Infrastruktur, manuellen Prozessen und hohen Betriebskosten. Sie benötigen moderne Cloud-Architektur mit Automatisierung, Monitoring und Kostensteuerung.',
      en: 'Companies struggle with legacy infrastructure, manual processes and high operating costs. They need modern cloud architecture with automation, monitoring and cost control.'
    },
    solution: {
      de: 'GoldenWing implementierte umfassende Cloud-Transformationen:',
      en: 'GoldenWing implemented comprehensive cloud transformations:'
    },
    solutionPoints: {
      de: [
        { title: 'Cloud-Migration', description: 'AWS/Azure-Migration mit Zero-Downtime' },
        { title: 'Infrastructure-as-Code', description: 'Terraform für reproduzierbare Deployments' },
        { title: 'CI/CD-Pipelines', description: 'Automatisierte Build-, Test- und Deployment-Prozesse' },
        { title: 'Monitoring & Alerting', description: '24/7-Überwachung mit proaktiven Alerts' },
        { title: 'Disaster-Recovery', description: 'Automatisierte Backup- und Wiederherstellungsstrategien' }
      ],
      en: [
        { title: 'Cloud Migration', description: 'AWS/Azure migration with zero downtime' },
        { title: 'Infrastructure-as-Code', description: 'Terraform for reproducible deployments' },
        { title: 'CI/CD Pipelines', description: 'Automated build, test and deployment processes' },
        { title: 'Monitoring & Alerting', description: '24/7 monitoring with proactive alerts' },
        { title: 'Disaster Recovery', description: 'Automated backup and recovery strategies' }
      ]
    },
    results: [
      { metric: '90%', label: { de: 'Deployment-Automatisierung', en: 'deployment automation' } },
      { metric: '-45%', label: { de: 'Infrastrukturkosten', en: 'infrastructure costs' } },
      { metric: '99.9%', label: { de: 'System-Uptime', en: 'system uptime' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Von manuellen Deployments zu vollautomatisierten Pipelines – GoldenWing hat unsere Engineering-Produktivität verdoppelt.',
        en: 'From manual deployments to fully automated pipelines – GoldenWing doubled our engineering productivity.'
      },
      author: 'Enterprise Client',
      role: { de: 'VP Engineering', en: 'VP Engineering' }
    }
  },
  {
    slug: 'healthcare-app',
    title: { de: 'Healthcare Tablet App', en: 'Healthcare Tablet App' },
    client: 'Healthcare Provider',
    category: 'software',
    year: 2024,
    industry: ['healthcare', 'technology'],
    companyDescription: {
      de: 'Eine spezialisierte Healthcare-Lösung für klinische Datenerfassung und -verwaltung, die medizinisches Personal mit Cloud-basierten Tools für effiziente Patientenbetreuung unterstützt.',
      en: 'A specialized healthcare solution for clinical data collection and management that supports medical staff with cloud-based tools for efficient patient care.'
    },
    description: {
      de: 'Cloud-Integrated Clinical Solution für klinische Datenerfassung mit HIPAA-Compliance.',
      en: 'Cloud-integrated clinical solution for clinical data capture with HIPAA compliance.'
    },
    challenge: {
      de: 'Healthcare-Apps müssen strenge Anforderungen an Sicherheit, Performance und regulatorische Compliance erfüllen, dabei aber gleichzeitig ein intuitives UX-Erlebnis bieten, um klinische Abläufe nicht zu stören.',
      en: 'Healthcare apps must meet strict security, performance and regulatory compliance requirements while providing an intuitive UX experience that does not disrupt clinical workflows.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine Cloud-First-Architektur:',
      en: 'GoldenWing developed a cloud-first architecture:'
    },
    solutionPoints: {
      de: [
        { title: 'Android Tablet App', description: 'Native Entwicklung für klinische Umgebungen' },
        { title: 'Cloud-Synchronisation', description: 'Echtzeit-Datenerfassung und -speicherung' },
        { title: 'HIPAA Compliance', description: 'Sichere Datenverwaltung nach Healthcare-Standards' },
        { title: 'Offline-Fähigkeit', description: 'Datenerfassung ohne Internetverbindung' },
        { title: 'UX-Design', description: 'Klinisch-optimierte Benutzeroberfläche' }
      ],
      en: [
        { title: 'Android Tablet App', description: 'Native development for clinical environments' },
        { title: 'Cloud Synchronization', description: 'Real-time data capture and storage' },
        { title: 'HIPAA Compliance', description: 'Secure data management according to healthcare standards' },
        { title: 'Offline Capability', description: 'Data capture without internet connection' },
        { title: 'UX Design', description: 'Clinically optimized user interface' }
      ]
    },
    results: [
      { metric: '100%', label: { de: 'HIPAA-Compliant', en: 'HIPAA compliant' } },
      { metric: '+85%', label: { de: 'Nutzerakzeptanz', en: 'user acceptance' } },
      { metric: '24/7', label: { de: 'Cloud-Synchronisation', en: 'cloud synchronization' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Die Cloud-Integration macht unsere Datenarbeit effizienter – das spiegelt sich in der Nutzung und Zufriedenheit unseres Teams wider.',
        en: 'The cloud integration makes our data work more efficient – this is reflected in the usage and satisfaction of our team.'
      },
      author: 'Healthcare Provider',
      role: { de: 'Projektleiter', en: 'Project Lead' }
    }
  },
  {
    slug: 'vpn-billing-integration',
    title: { de: 'VPN & Billing Integration', en: 'VPN & Billing Integration' },
    client: 'VPN Provider',
    category: 'software',
    year: 2024,
    industry: ['technology'],
    companyDescription: {
      de: 'Eine Enterprise-VPN-Lösung mit integriertem Billing-System, die Unternehmen sichere Remote-Access-Lösungen mit automatisierter Abrechnung bietet.',
      en: 'An enterprise VPN solution with integrated billing system that provides companies with secure remote access solutions with automated billing.'
    },
    description: {
      de: 'Enterprise-VPN mit integriertem Billing-System für sichere Remote-Access-Lösungen.',
      en: 'Enterprise VPN with integrated billing system for secure remote access solutions.'
    },
    challenge: {
      de: 'Unternehmen benötigen sichere VPN-Infrastruktur, die gleichzeitig mit Billing-Systemen integriert ist, um Nutzung korrekt abzurechnen. Dies erfordert komplexe Sicherheits- und Compliance-Architekturen.',
      en: 'Companies need secure VPN infrastructure that is simultaneously integrated with billing systems to correctly charge for usage. This requires complex security and compliance architectures.'
    },
    solution: {
      de: 'GoldenWing implementierte eine sichere Enterprise-Lösung:',
      en: 'GoldenWing implemented a secure enterprise solution:'
    },
    solutionPoints: {
      de: [
        { title: 'VPN-Infrastructure', description: 'Multi-Region-Setup mit Failover' },
        { title: 'Billing-Integration', description: 'Automatisierte Nutzungserfassung und Abrechnung' },
        { title: 'Identity-Management', description: 'Rollenbasierte Zugriffskontrolle' },
        { title: 'Logging & Monitoring', description: 'Compliance-konforme Audit-Trails' },
        { title: 'Security-Layer', description: 'End-to-End-Verschlüsselung' }
      ],
      en: [
        { title: 'VPN Infrastructure', description: 'Multi-region setup with failover' },
        { title: 'Billing Integration', description: 'Automated usage capture and billing' },
        { title: 'Identity Management', description: 'Role-based access control' },
        { title: 'Logging & Monitoring', description: 'Compliance-compliant audit trails' },
        { title: 'Security Layer', description: 'End-to-end encryption' }
      ]
    },
    results: [
      { metric: '99.8%', label: { de: 'System-Uptime', en: 'system uptime' } },
      { metric: '100%', label: { de: 'Billing-Automatisierung', en: 'billing automation' } },
      { metric: 'Global', label: { de: 'VPN-Abdeckung', en: 'VPN coverage' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Die VPN-Billing-Integration hat unsere Remote-Access-Monetarisierung transformiert – sicher, skalierbar, automatisiert.',
        en: 'The VPN billing integration transformed our remote access monetization – secure, scalable, automated.'
      },
      author: 'VPN Provider',
      role: { de: 'Head of Infrastructure', en: 'Head of Infrastructure' }
    }
  },

  // === NEW PROJECTS TO CREATE ===
  {
    slug: 'fabi',
    title: { de: 'Frameworks for AI-Based Innovation', en: 'Frameworks for AI-Based Innovation' },
    client: 'FABI',
    category: 'strategie',
    year: 2024,
    industry: ['technology', 'consulting'],
    isNew: true,
    companyDescription: {
      de: 'FABI ist ein innovatives Beratungsframework, das Unternehmen bei der systematischen Einführung und Skalierung KI-gestützter Innovationsprozesse unterstützt. Das Framework kombiniert agile Methoden, KI-Technologien und digitale Tools.',
      en: 'FABI is an innovative consulting framework that helps companies systematically introduce and scale AI-supported innovation processes. The framework combines agile methods, AI technologies and digital tools.'
    },
    description: {
      de: 'Go-to-Market für KI-Innovations-Framework mit +200% LinkedIn Lead Generation.',
      en: 'Go-to-market for AI innovation framework with +200% LinkedIn lead generation.'
    },
    challenge: {
      de: 'Viele Unternehmen standen vor der Herausforderung, KI-gestützte Innovation systematisch einzuführen – ohne klares Framework oder datengestützte Prozesse. Es fehlte eine strukturierte Vorgehensweise zur Skalierung von Innovationsaktivitäten.',
      en: 'Many companies faced the challenge of systematically introducing AI-supported innovation – without a clear framework or data-driven processes. A structured approach to scaling innovation activities was missing.'
    },
    solution: {
      de: 'GoldenWing implementierte ein umfassendes Go-to-Market-Konzept:',
      en: 'GoldenWing implemented a comprehensive go-to-market concept:'
    },
    solutionPoints: {
      de: [
        { title: 'Branding & Business Model', description: 'Klare Positionierung im Innovationsmarkt' },
        { title: 'Website-Entwicklung', description: 'Conversion-optimierte Plattform' },
        { title: 'LinkedIn Campaign Management', description: 'Professionelle Lead-Generierung' },
        { title: 'Webinar-Erstellung', description: 'Content-basierte Thought-Leadership' },
        { title: 'B2B Workshops', description: 'Organisation und Durchführung' }
      ],
      en: [
        { title: 'Branding & Business Model', description: 'Clear positioning in the innovation market' },
        { title: 'Website Development', description: 'Conversion-optimized platform' },
        { title: 'LinkedIn Campaign Management', description: 'Professional lead generation' },
        { title: 'Webinar Creation', description: 'Content-based thought leadership' },
        { title: 'B2B Workshops', description: 'Organization and execution' }
      ]
    },
    results: [
      { metric: '+200%', label: { de: 'LinkedIn Lead Generation', en: 'LinkedIn lead generation' } },
      { metric: '25+', label: { de: 'Webinare durchgeführt', en: 'webinars conducted' } },
      { metric: 'Top', label: { de: 'Thought-Leadership Position', en: 'thought leadership position' } }
    ],
    clientFeedback: {
      quote: {
        de: 'GoldenWing hat FABI vom Konzept zur marktführenden Innovation-Methodology entwickelt. Die LinkedIn-Kampagnen bringen uns genau die richtigen Leads.',
        en: 'GoldenWing developed FABI from concept to market-leading innovation methodology. The LinkedIn campaigns bring us exactly the right leads.'
      },
      author: 'FABI',
      role: { de: 'Innovationsleiter', en: 'Innovation Lead' }
    }
  },
  {
    slug: 'nurses-for-future',
    title: { de: 'Globale Healthcare-Community', en: 'Global Healthcare Community' },
    client: 'Nurses for Future',
    category: 'strategie',
    year: 2024,
    industry: ['healthcare', 'consulting'],
    isNew: true,
    companyDescription: {
      de: 'Nurses for Future ist eine internationale Initiative für nachhaltige Arbeitsbedingungen, Sichtbarkeit und Vernetzung von Pflegekräften, die sich für bessere Healthcare-Standards weltweit einsetzt.',
      en: 'Nurses for Future is an international initiative for sustainable working conditions, visibility and networking of nurses, committed to better healthcare standards worldwide.'
    },
    description: {
      de: 'Globale Community-Generierung mit 30.000 Nurses aus 185 Ländern in 6 Monaten.',
      en: 'Global community generation with 30,000 nurses from 185 countries in 6 months.'
    },
    challenge: {
      de: 'Die Herausforderung lag in der Fragmentierung der Zielgruppe, hohen thematischen Anforderungen und der Notwendigkeit, eine konsistente, glaubwürdige Botschaft über unterschiedliche Medienkanäle zu transportieren.',
      en: 'The challenge lay in the fragmentation of the target group, high thematic requirements and the need to convey a consistent, credible message across different media channels.'
    },
    solution: {
      de: 'GoldenWing implementierte eine globale Community-Strategie:',
      en: 'GoldenWing implemented a global community strategy:'
    },
    solutionPoints: {
      de: [
        { title: 'Community-Generierung', description: '30.000 Healthcare Professionals aus 185 Ländern' },
        { title: 'Webinar-Organisation', description: '1000+ Teilnehmer pro Event' },
        { title: 'Feedback-Management', description: 'Systematische Sammlung und Auswertung' },
        { title: 'Content-Erstellung', description: 'Multi-Channel-Content-Strategie' },
        { title: 'LinkedIn Outreach', description: 'Professionelle Kampagnensteuerung' }
      ],
      en: [
        { title: 'Community Generation', description: '30,000 healthcare professionals from 185 countries' },
        { title: 'Webinar Organization', description: '1000+ participants per event' },
        { title: 'Feedback Management', description: 'Systematic collection and evaluation' },
        { title: 'Content Creation', description: 'Multi-channel content strategy' },
        { title: 'LinkedIn Outreach', description: 'Professional campaign management' }
      ]
    },
    results: [
      { metric: '30.000', label: { de: 'Nurses aus 185 Ländern', en: 'nurses from 185 countries' } },
      { metric: '1000+', label: { de: 'Teilnehmer pro Webinar', en: 'participants per webinar' } },
      { metric: '+150%', label: { de: 'Community-Wachstum', en: 'community growth' } }
    ],
    clientFeedback: {
      quote: {
        de: '30.000 Nurses in 6 Monaten – das hätten wir ohne GoldenWing nie geschafft. Die Webinare mit über 1000 Teilnehmern zeigen, dass wir eine echte globale Bewegung aufgebaut haben.',
        en: '30,000 nurses in 6 months – we would never have achieved that without GoldenWing. The webinars with over 1000 participants show that we have built a real global movement.'
      },
      author: 'Nurses for Future',
      role: { de: 'Community Lead', en: 'Community Lead' }
    }
  },
  {
    slug: 'freight-transportation',
    title: { de: 'Digitaler Logistik-Hub', en: 'Digital Logistics Hub' },
    client: 'Freight Transportation Platform',
    category: 'software',
    year: 2024,
    industry: ['manufacturing'],
    isNew: true,
    companyDescription: {
      de: 'Eine führende Freight-Transportation-Plattform, die innovative digitale Lösungen für Fracht- und Fahrzeugverfolgung inklusive Dokumentenmanagement im B2B-Logistikmarkt anbietet.',
      en: 'A leading freight transportation platform offering innovative digital solutions for freight and vehicle tracking including document management in the B2B logistics market.'
    },
    description: {
      de: 'Modulare Webarchitektur für Fracht-Tracking und Dokumentenmanagement.',
      en: 'Modular web architecture for freight tracking and document management.'
    },
    challenge: {
      de: 'In der Logistikbranche waren oftmals mehrere Insellösungen im Einsatz, die Tracking, Disposition, Dokumentation und Kundenkommunikation fragmentiert abbildeten. Die Herausforderung war eine einheitliche, schlanke Plattform.',
      en: 'In the logistics industry, several isolated solutions were often in use that depicted tracking, dispatching, documentation and customer communication in a fragmented way. The challenge was a unified, lean platform.'
    },
    solution: {
      de: 'GoldenWing setzte auf eine modulare Webarchitektur:',
      en: 'GoldenWing implemented a modular web architecture:'
    },
    solutionPoints: {
      de: [
        { title: 'Dashboard-Entwicklung', description: 'Intuitive Übersichten für operative Teams' },
        { title: 'Tracking-System', description: 'Echtzeit-Sendungsverfolgung' },
        { title: 'Order-Management', description: 'Digitale Frachtabwicklung' },
        { title: 'Dokumentenmanagement', description: 'Zentrale Verwaltung aller Transportdokumente' },
        { title: 'Cloud-Infrastructure', description: 'Skalierbare, performante Backend-Architektur' }
      ],
      en: [
        { title: 'Dashboard Development', description: 'Intuitive overviews for operational teams' },
        { title: 'Tracking System', description: 'Real-time shipment tracking' },
        { title: 'Order Management', description: 'Digital freight processing' },
        { title: 'Document Management', description: 'Central management of all transport documents' },
        { title: 'Cloud Infrastructure', description: 'Scalable, performant backend architecture' }
      ]
    },
    results: [
      { metric: '#1', label: { de: 'MVP ohne lokale Konkurrenz', en: 'MVP without local competition' } },
      { metric: '-30%', label: { de: 'Transportkosten reduziert', en: 'transport costs reduced' } },
      { metric: '100%', label: { de: 'Prozess-Digitalisierung', en: 'process digitization' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Unsere Transportprozesse sind jetzt digital verbindlich und nachvollziehbar – das schafft Effizienz und Transparenz für unser Team und unsere Kunden.',
        en: 'Our transport processes are now digitally binding and traceable – this creates efficiency and transparency for our team and our customers.'
      },
      author: 'Freight Transportation Platform',
      role: { de: 'CTO', en: 'CTO' }
    }
  },
  {
    slug: 'fintech-platform',
    title: { de: 'Utility & Mobile Banking', en: 'Utility & Mobile Banking' },
    client: 'FinTech Platform',
    category: 'software',
    year: 2024,
    industry: ['finance', 'technology'],
    isNew: true,
    companyDescription: {
      de: 'Eine innovative FinTech-Plattform, die Utility-Zahlungen mit modernem Mobile Banking kombiniert und Finanzdienstleistungen nahtlos in den Alltag der Nutzer integriert.',
      en: 'An innovative FinTech platform that combines utility payments with modern mobile banking and seamlessly integrates financial services into users everyday lives.'
    },
    description: {
      de: 'Duale Plattform-Architektur für Utility-Zahlungen und Mobile Banking mit +200% User-Growth.',
      en: 'Dual platform architecture for utility payments and mobile banking with +200% user growth.'
    },
    challenge: {
      de: 'FinTech- und Utility-Branchen stellen hohe Anforderungen an Sicherheit, Performance und Interoperabilität. Die Integration mit Zahlungsdienstleistern, Bank-APIs und Echtzeit-Verarbeitung erfordert robuste technische Grundlagen.',
      en: 'FinTech and utility industries place high demands on security, performance and interoperability. Integration with payment providers, bank APIs and real-time processing requires robust technical foundations.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine duale Plattform-Architektur:',
      en: 'GoldenWing developed a dual platform architecture:'
    },
    solutionPoints: {
      de: [
        { title: 'Web & Mobile Apps', description: 'Synchronisierter Zugriff auf Daten und Funktionen' },
        { title: 'Sichere Transaktionspipelines', description: 'Compliance mit FinTech-Standards' },
        { title: 'Payment-Integration', description: 'Multiple Zahlungsdienstleister' },
        { title: 'Cloud-Infrastructure', description: 'Skalierbare Backend-Services' },
        { title: 'Security-Layer', description: 'Multi-Factor-Authentication und Encryption' }
      ],
      en: [
        { title: 'Web & Mobile Apps', description: 'Synchronized access to data and functions' },
        { title: 'Secure Transaction Pipelines', description: 'Compliance with FinTech standards' },
        { title: 'Payment Integration', description: 'Multiple payment providers' },
        { title: 'Cloud Infrastructure', description: 'Scalable backend services' },
        { title: 'Security Layer', description: 'Multi-factor authentication and encryption' }
      ]
    },
    results: [
      { metric: '+200%', label: { de: 'User-Growth in 6 Monaten', en: 'user growth in 6 months' } },
      { metric: '100%', label: { de: 'FinTech-Compliance', en: 'FinTech compliance' } },
      { metric: '<50ms', label: { de: 'Transaktions-Latenz', en: 'transaction latency' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Unsere FinTech-Plattform liefert nicht nur Daten, sondern echte Geschäftsvorteile für unsere Nutzer – schnell, sicher und skalierbar.',
        en: 'Our FinTech platform delivers not just data but real business benefits for our users – fast, secure and scalable.'
      },
      author: 'FinTech Platform',
      role: { de: 'CTO', en: 'CTO' }
    }
  },
  {
    slug: 'ai-virtual-assistants',
    title: { de: 'AI Virtual Assistants Platform', en: 'AI Virtual Assistants Platform' },
    client: 'AI Platform',
    category: 'software',
    year: 2024,
    industry: ['technology'],
    isNew: true,
    companyDescription: {
      de: 'Eine innovative Plattform für maßgeschneiderte virtuelle AI-Assistenten, die Websites mit intelligenten Chatbot-Lösungen ausstattet und Kundeninteraktionen automatisiert.',
      en: 'An innovative platform for customized virtual AI assistants that equips websites with intelligent chatbot solutions and automates customer interactions.'
    },
    description: {
      de: 'Skalierbare AI-Plattform für intelligente Chatbot-Lösungen mit 50+ Website-Integrationen.',
      en: 'Scalable AI platform for intelligent chatbot solutions with 50+ website integrations.'
    },
    challenge: {
      de: 'Unternehmen benötigen intelligente Chatbot-Lösungen, die nicht nur vorgefertigte Antworten liefern, sondern kontextbezogen und personalisiert kommunizieren können. Die Herausforderung lag in der Entwicklung einer flexiblen, trainierbaren AI-Plattform.',
      en: 'Companies need intelligent chatbot solutions that not only deliver pre-made answers but can communicate contextually and personalized. The challenge was developing a flexible, trainable AI platform.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine AI-First-Plattform:',
      en: 'GoldenWing developed an AI-first platform:'
    },
    solutionPoints: {
      de: [
        { title: 'AI-Engine', description: 'Natural Language Processing mit Machine Learning' },
        { title: 'Training-Interface', description: 'Einfaches Training für verschiedene Use Cases' },
        { title: 'Website-Integration', description: 'Plug-and-Play SDK für schnelle Implementation' },
        { title: 'Analytics-Dashboard', description: 'Performance-Tracking und Optimierung' },
        { title: 'Multi-Language-Support', description: 'Internationale Einsatzfähigkeit' }
      ],
      en: [
        { title: 'AI Engine', description: 'Natural language processing with machine learning' },
        { title: 'Training Interface', description: 'Easy training for various use cases' },
        { title: 'Website Integration', description: 'Plug-and-play SDK for quick implementation' },
        { title: 'Analytics Dashboard', description: 'Performance tracking and optimization' },
        { title: 'Multi-Language Support', description: 'International deployment capability' }
      ]
    },
    results: [
      { metric: '50+', label: { de: 'Website-Integrationen', en: 'website integrations' } },
      { metric: '-85%', label: { de: 'Response-Zeiten reduziert', en: 'response times reduced' } },
      { metric: '24/7', label: { de: 'Kundensupport automatisiert', en: 'customer support automated' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Die AI-Plattform hat unseren Kundensupport revolutioniert. Schnelle Implementation, intelligente Antworten, messbare Ergebnisse.',
        en: 'The AI platform revolutionized our customer support. Fast implementation, intelligent answers, measurable results.'
      },
      author: 'AI Platform',
      role: { de: 'Head of Product', en: 'Head of Product' }
    }
  },
  {
    slug: 'crypto-trading',
    title: { de: 'Algorithmic Crypto Trading', en: 'Algorithmic Crypto Trading' },
    client: 'Crypto Trading Platform',
    category: 'software',
    year: 2024,
    industry: ['finance', 'technology'],
    isNew: true,
    companyDescription: {
      de: 'Eine fortschrittliche Plattform für algorithmisches Crypto-Trading, die professionelle Handelsstrategien automatisiert und Investoren Zugang zu institutionellen Trading-Tools gibt.',
      en: 'An advanced platform for algorithmic crypto trading that automates professional trading strategies and gives investors access to institutional trading tools.'
    },
    description: {
      de: 'Hochperformante Trading-Plattform mit Real-Time Trading Engine und <50ms Latenz.',
      en: 'High-performance trading platform with real-time trading engine and <50ms latency.'
    },
    challenge: {
      de: 'Crypto-Trading erfordert Echtzeit-Datenverarbeitung, höchste Sicherheitsstandards und komplexe Algorithmen. Die Plattform musste sowohl für Anfänger als auch für professionelle Trader nutzbar sein.',
      en: 'Crypto trading requires real-time data processing, highest security standards and complex algorithms. The platform had to be usable for both beginners and professional traders.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine hochperformante Trading-Plattform:',
      en: 'GoldenWing developed a high-performance trading platform:'
    },
    solutionPoints: {
      de: [
        { title: 'Trading-Engine', description: 'Echtzeit-Orderausführung mit minimaler Latenz' },
        { title: 'Security-First', description: 'Multi-Layer-Sicherheitsarchitektur' },
        { title: 'Algorithm-Framework', description: 'Modulare Trading-Strategien' },
        { title: 'Exchange-Integration', description: 'APIs zu major Crypto-Exchanges' },
        { title: 'Risk-Management', description: 'Automatisierte Stop-Loss und Portfolio-Protection' }
      ],
      en: [
        { title: 'Trading Engine', description: 'Real-time order execution with minimal latency' },
        { title: 'Security First', description: 'Multi-layer security architecture' },
        { title: 'Algorithm Framework', description: 'Modular trading strategies' },
        { title: 'Exchange Integration', description: 'APIs to major crypto exchanges' },
        { title: 'Risk Management', description: 'Automated stop-loss and portfolio protection' }
      ]
    },
    results: [
      { metric: '<50ms', label: { de: 'Trading-Latenz', en: 'trading latency' } },
      { metric: '100%', label: { de: 'Regulatory Compliance', en: 'regulatory compliance' } },
      { metric: 'Multi', label: { de: 'Exchange-Integration', en: 'exchange integration' } }
    ],
    clientFeedback: {
      quote: {
        de: 'GoldenWing hat eine Trading-Plattform entwickelt, die technisch auf Augenhöhe mit den großen Playern ist – aber für unsere Zielgruppe zugänglich bleibt.',
        en: 'GoldenWing developed a trading platform that is technically on par with the big players – but remains accessible to our target audience.'
      },
      author: 'Crypto Trading Platform',
      role: { de: 'CEO', en: 'CEO' }
    }
  },
  {
    slug: 'ecommerce-saas',
    title: { de: 'E-Commerce SaaS Transformation', en: 'E-Commerce SaaS Transformation' },
    client: 'E-Commerce SaaS',
    category: 'software',
    year: 2024,
    industry: ['technology', 'ecommerce'],
    isNew: true,
    companyDescription: {
      de: 'Eine E-Commerce-SaaS-Plattform, die kleine und mittelständische Online-Shops mit professionellen Tools für Produktmanagement, Bestellabwicklung und Marketing ausstattet.',
      en: 'An e-commerce SaaS platform that equips small and medium-sized online shops with professional tools for product management, order processing and marketing.'
    },
    description: {
      de: 'Cloud-Native SaaS-Transformation mit 99.9% Uptime und Skalierung auf 1000+ Shop-Kunden.',
      en: 'Cloud-native SaaS transformation with 99.9% uptime and scaling to 1000+ shop customers.'
    },
    challenge: {
      de: 'Die bestehende Legacy-Architektur limitierte Skalierung und verursachte hohe Betriebskosten. Es wurde eine moderne, cloud-native Lösung benötigt, die mit dem Kundenwachstum mithalten kann.',
      en: 'The existing legacy architecture limited scaling and caused high operating costs. A modern, cloud-native solution was needed that could keep up with customer growth.'
    },
    solution: {
      de: 'GoldenWing führte eine umfassende SaaS-Transformation durch:',
      en: 'GoldenWing conducted a comprehensive SaaS transformation:'
    },
    solutionPoints: {
      de: [
        { title: 'Cloud-Migration', description: 'Von On-Premise zu AWS Cloud-Infrastructure' },
        { title: 'Microservices-Architektur', description: 'Modulare, unabhängig skalierbare Services' },
        { title: 'API-First-Design', description: 'RESTful APIs für Integrationen' },
        { title: 'Multi-Tenancy', description: 'Effiziente Ressourcen-Nutzung für mehrere Kunden' },
        { title: 'DevOps-Pipeline', description: 'CI/CD für schnelle Feature-Releases' }
      ],
      en: [
        { title: 'Cloud Migration', description: 'From on-premise to AWS cloud infrastructure' },
        { title: 'Microservices Architecture', description: 'Modular, independently scalable services' },
        { title: 'API-First Design', description: 'RESTful APIs for integrations' },
        { title: 'Multi-Tenancy', description: 'Efficient resource usage for multiple customers' },
        { title: 'DevOps Pipeline', description: 'CI/CD for fast feature releases' }
      ]
    },
    results: [
      { metric: '99.9%', label: { de: 'System-Uptime', en: 'system uptime' } },
      { metric: '1000+', label: { de: 'Shop-Kunden', en: 'shop customers' } },
      { metric: '-40%', label: { de: 'Infrastrukturkosten', en: 'infrastructure costs' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Die Cloud-Transformation war der Game-Changer für unser Business. Wir können jetzt 10x schneller wachsen ohne Infrastruktur-Sorgen.',
        en: 'The cloud transformation was the game changer for our business. We can now grow 10x faster without infrastructure worries.'
      },
      author: 'E-Commerce SaaS',
      role: { de: 'CTO', en: 'CTO' }
    }
  },
  {
    slug: 'ailuvio',
    title: { de: 'Real-Time Translation Platform', en: 'Real-Time Translation Platform' },
    client: 'AiLuvio',
    category: 'software',
    year: 2024,
    industry: ['technology'],
    isNew: true,
    companyDescription: {
      de: 'AiLuvio ist eine AI-gestützte Echtzeit-Übersetzungsplattform, die Sprachbarrieren in Meetings, Konferenzen und internationaler Zusammenarbeit überwindet.',
      en: 'AiLuvio is an AI-powered real-time translation platform that overcomes language barriers in meetings, conferences and international collaboration.'
    },
    description: {
      de: 'AI-First Translation Platform mit Real-Time Translation und <2 Sekunden Latenz in 50+ Sprachen.',
      en: 'AI-first translation platform with real-time translation and <2 seconds latency in 50+ languages.'
    },
    challenge: {
      de: 'Echtzeit-Übersetzung erfordert nicht nur präzise AI-Modelle, sondern auch extrem niedrige Latenz und die Fähigkeit, kontextbezogen zu übersetzen. Die Plattform musste für Business-Meetings professionell nutzbar sein.',
      en: 'Real-time translation requires not only precise AI models but also extremely low latency and the ability to translate contextually. The platform had to be professionally usable for business meetings.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine AI-First-Translation-Platform:',
      en: 'GoldenWing developed an AI-first translation platform:'
    },
    solutionPoints: {
      de: [
        { title: 'AI-Engine', description: 'State-of-the-art Neural Machine Translation' },
        { title: 'Real-Time Processing', description: 'Stream-Processing für minimale Latenz' },
        { title: 'Context-Awareness', description: 'Berücksichtigung von Meeting-Kontext' },
        { title: 'Integration', description: 'Plugins für Zoom, Teams, Google Meet' },
        { title: 'Audio-Processing', description: 'Noise-Cancellation und Speaker-Identification' }
      ],
      en: [
        { title: 'AI Engine', description: 'State-of-the-art neural machine translation' },
        { title: 'Real-Time Processing', description: 'Stream processing for minimal latency' },
        { title: 'Context Awareness', description: 'Consideration of meeting context' },
        { title: 'Integration', description: 'Plugins for Zoom, Teams, Google Meet' },
        { title: 'Audio Processing', description: 'Noise cancellation and speaker identification' }
      ]
    },
    results: [
      { metric: '<2s', label: { de: 'Übersetzungs-Latenz', en: 'translation latency' } },
      { metric: '50+', label: { de: 'Sprachen integriert', en: 'languages integrated' } },
      { metric: '99%', label: { de: 'Accuracy Rate', en: 'accuracy rate' } }
    ],
    clientFeedback: {
      quote: {
        de: 'AiLuvio mit GoldenWings Technologie hat unsere internationale Zusammenarbeit transformiert. Sprachbarrieren existieren praktisch nicht mehr.',
        en: 'AiLuvio with GoldenWing technology transformed our international collaboration. Language barriers practically no longer exist.'
      },
      author: 'Enterprise Client',
      role: { de: 'VP International', en: 'VP International' }
    }
  },
  {
    slug: 'hiring-platform',
    title: { de: 'Manager-Focused Recruitment', en: 'Manager-Focused Recruitment' },
    client: 'Hiring Platform',
    category: 'software',
    year: 2024,
    industry: ['technology', 'consulting'],
    isNew: true,
    companyDescription: {
      de: 'Eine innovative Hiring-Plattform, die Managern unternehmensweit die Einstellung und Verwaltung von Talenten erleichtert – ohne HR-Bottlenecks.',
      en: 'An innovative hiring platform that makes it easier for managers company-wide to hire and manage talent – without HR bottlenecks.'
    },
    description: {
      de: 'Manager-First Hiring-Plattform mit -60% Time-to-Hire und 85% Manager-Adoption.',
      en: 'Manager-first hiring platform with -60% time-to-hire and 85% manager adoption.'
    },
    challenge: {
      de: 'Traditionelle Hiring-Prozesse sind zu zentralisiert und langsam. Manager benötigen die Autonomie, schnell Talente einzustellen, ohne durch HR-Prozesse ausgebremst zu werden – aber mit angemessenen Compliance-Guardrails.',
      en: 'Traditional hiring processes are too centralized and slow. Managers need the autonomy to quickly hire talent without being slowed down by HR processes – but with appropriate compliance guardrails.'
    },
    solution: {
      de: 'GoldenWing entwickelte eine Manager-First-Plattform:',
      en: 'GoldenWing developed a manager-first platform:'
    },
    solutionPoints: {
      de: [
        { title: 'Self-Service-Portal', description: 'Manager können eigenständig Jobs posten und screenen' },
        { title: 'Smart-Matching', description: 'AI-gestütztes Kandidaten-Matching' },
        { title: 'Compliance-Layer', description: 'Automatische Einhaltung von Hiring-Policies' },
        { title: 'ATS-Integration', description: 'Nahtlose Anbindung an bestehende Systeme' },
        { title: 'Analytics-Dashboard', description: 'Hiring-Metrics für Manager und HR' }
      ],
      en: [
        { title: 'Self-Service Portal', description: 'Managers can independently post jobs and screen' },
        { title: 'Smart Matching', description: 'AI-powered candidate matching' },
        { title: 'Compliance Layer', description: 'Automatic compliance with hiring policies' },
        { title: 'ATS Integration', description: 'Seamless connection to existing systems' },
        { title: 'Analytics Dashboard', description: 'Hiring metrics for managers and HR' }
      ]
    },
    results: [
      { metric: '-60%', label: { de: 'Time-to-Hire', en: 'time-to-hire' } },
      { metric: '85%', label: { de: 'Manager-Adoption', en: 'manager adoption' } },
      { metric: '15+', label: { de: 'ATS-Integrationen', en: 'ATS integrations' } }
    ],
    clientFeedback: {
      quote: {
        de: 'Als Manager kann ich jetzt in Tagen einstellen, nicht in Wochen. Die Plattform gibt mir Autonomie ohne Chaos.',
        en: 'As a manager, I can now hire in days, not weeks. The platform gives me autonomy without chaos.'
      },
      author: 'Tech Company',
      role: { de: 'Hiring Manager', en: 'Hiring Manager' }
    }
  }
]

function run() {
  console.log('Starting migration for missing case studies...\n')

  let updatedCount = 0
  let createdCount = 0

  for (const cs of caseStudies) {
    try {
      // Check if project exists
      const existing = db.prepare('SELECT id FROM projects WHERE slug = ?').get(cs.slug) as { id: number } | undefined

      if (existing) {
        // UPDATE existing project
        const projectId = existing.id

        // Update title in locales
        db.prepare(`
          UPDATE projects_locales
          SET title = ?, description = ?, company_description = ?, challenge = ?, solution = ?,
              client_feedback_quote = ?, client_feedback_role = ?
          WHERE _parent_id = ? AND _locale = 'de'
        `).run(
          cs.title.de, cs.description.de, cs.companyDescription.de, cs.challenge.de, cs.solution.de,
          cs.clientFeedback.quote.de, cs.clientFeedback.role.de, projectId
        )

        db.prepare(`
          UPDATE projects_locales
          SET title = ?, description = ?, company_description = ?, challenge = ?, solution = ?,
              client_feedback_quote = ?, client_feedback_role = ?
          WHERE _parent_id = ? AND _locale = 'en'
        `).run(
          cs.title.en, cs.description.en, cs.companyDescription.en, cs.challenge.en, cs.solution.en,
          cs.clientFeedback.quote.en, cs.clientFeedback.role.en, projectId
        )

        // Delete old solution points and results
        db.prepare('DELETE FROM projects_solution_points WHERE _parent_id = ?').run(projectId)
        db.prepare('DELETE FROM projects_results WHERE _parent_id = ?').run(projectId)

        // Insert new solution points (id is AUTOINCREMENT)
        cs.solutionPoints.de.forEach((point, idx) => {
          const enPoint = cs.solutionPoints.en[idx]
          db.prepare(`
            INSERT INTO projects_solution_points (_parent_id, _order, _locale, title, description)
            VALUES (?, ?, 'de', ?, ?)
          `).run(projectId, idx, point.title, point.description)
          db.prepare(`
            INSERT INTO projects_solution_points (_parent_id, _order, _locale, title, description)
            VALUES (?, ?, 'en', ?, ?)
          `).run(projectId, idx, enPoint.title, enPoint.description)
        })

        // Insert new results
        cs.results.forEach((result, idx) => {
          const resultId = randomUUID()
          db.prepare(`
            INSERT INTO projects_results (id, _parent_id, _order, metric)
            VALUES (?, ?, ?, ?)
          `).run(resultId, projectId, idx, result.metric)
          // results_locales id is AUTOINCREMENT
          db.prepare(`
            INSERT INTO projects_results_locales (_parent_id, _locale, label)
            VALUES (?, 'de', ?)
          `).run(resultId, result.label.de)
          db.prepare(`
            INSERT INTO projects_results_locales (_parent_id, _locale, label)
            VALUES (?, 'en', ?)
          `).run(resultId, result.label.en)
        })

        console.log(`✅ Updated: ${cs.slug}`)
        updatedCount++
      } else if (cs.isNew) {
        // CREATE new project
        const projectId = Math.floor(Math.random() * 1000000)
        const now = new Date().toISOString()

        // Insert main project
        db.prepare(`
          INSERT INTO projects (id, slug, client, category, year, client_feedback_author, featured, "order", updated_at, created_at)
          VALUES (?, ?, ?, ?, ?, ?, 0, 99, ?, ?)
        `).run(projectId, cs.slug, cs.client, cs.category, cs.year, cs.clientFeedback.author, now, now)

        // Insert locales (DE)
        db.prepare(`
          INSERT INTO projects_locales (_parent_id, _locale, title, description, company_description, challenge, solution, client_feedback_quote, client_feedback_role)
          VALUES (?, 'de', ?, ?, ?, ?, ?, ?, ?)
        `).run(projectId, cs.title.de, cs.description.de, cs.companyDescription.de, cs.challenge.de, cs.solution.de, cs.clientFeedback.quote.de, cs.clientFeedback.role.de)

        // Insert locales (EN)
        db.prepare(`
          INSERT INTO projects_locales (_parent_id, _locale, title, description, company_description, challenge, solution, client_feedback_quote, client_feedback_role)
          VALUES (?, 'en', ?, ?, ?, ?, ?, ?, ?)
        `).run(projectId, cs.title.en, cs.description.en, cs.companyDescription.en, cs.challenge.en, cs.solution.en, cs.clientFeedback.quote.en, cs.clientFeedback.role.en)

        // Insert solution points
        cs.solutionPoints.de.forEach((point, idx) => {
          const enPoint = cs.solutionPoints.en[idx]
          db.prepare(`
            INSERT INTO projects_solution_points (_parent_id, _order, _locale, title, description)
            VALUES (?, ?, 'de', ?, ?)
          `).run(projectId, idx, point.title, point.description)
          db.prepare(`
            INSERT INTO projects_solution_points (_parent_id, _order, _locale, title, description)
            VALUES (?, ?, 'en', ?, ?)
          `).run(projectId, idx, enPoint.title, enPoint.description)
        })

        // Insert results
        cs.results.forEach((result, idx) => {
          const resultId = randomUUID()
          db.prepare(`
            INSERT INTO projects_results (id, _parent_id, _order, metric)
            VALUES (?, ?, ?, ?)
          `).run(resultId, projectId, idx, result.metric)
          db.prepare(`
            INSERT INTO projects_results_locales (_parent_id, _locale, label)
            VALUES (?, 'de', ?)
          `).run(resultId, result.label.de)
          db.prepare(`
            INSERT INTO projects_results_locales (_parent_id, _locale, label)
            VALUES (?, 'en', ?)
          `).run(resultId, result.label.en)
        })

        // Insert industry
        cs.industry.forEach((ind, idx) => {
          db.prepare(`
            INSERT INTO projects_industry (id, parent_id, value, "order")
            VALUES (?, ?, ?, ?)
          `).run(randomUUID(), projectId, ind, idx)
        })

        console.log(`🆕 Created: ${cs.slug}`)
        createdCount++
      }
    } catch (err) {
      console.error(`❌ Error with ${cs.slug}:`, err)
    }
  }

  console.log(`\n✅ Migration complete: ${updatedCount} updated, ${createdCount} created`)
}

run()
