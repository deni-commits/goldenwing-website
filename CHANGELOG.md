# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Removed 8 production console.log statements leaking to browser
- Added ESLint no-console rule (error level)
- nginx config: robots.txt, llms.txt, llms-full.txt now serving from correct path
- **Sitemap duplicate URL** - `/en/services/ecommerce-agency` appeared twice (ecommerce-agentur + onlineshop-agentur both translated to same EN URL)
- Added sitemap URL deduplication with priority-based conflict resolution

### Added
- Pre-commit hooks (husky + lint-staged) to prevent console.log in commits
- CHANGELOG.md to track all changes

### Security
- Git history scanned for secrets — none found
- All env vars properly in .env files (not committed)

---

## [1.0.0] - 2026-02-09

### Initial State (Audit)
- 198 console.log statements (fixed: 8 in production code)
- 12 npm vulnerabilities (PayloadCMS — requires major upgrade)
- 168 pages without generateStaticParams
- 419-line middleware (needs refactoring)
- 30+ hardcoded goldenwing.at URLs
