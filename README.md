# GoldenWing Creative Studios - Website

Agentur-Website gebaut mit **Payload CMS v3** + **Next.js 15** + **Tailwind CSS v4**.

## Setup

```bash
npm install
cp .env.example .env  # Fill in real values
npm run dev
```

Payload Admin: http://localhost:3000/admin

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run generate:types` - Generate Payload TypeScript types

## Architecture

- `src/app/(website)/` - Public website pages
- `src/app/(portal)/` - Client portal (authenticated)
- `src/payload/collections/` - Payload CMS collections
- `src/payload/blocks/` - Reusable content blocks
- `src/payload/globals/` - Site-wide settings
- `src/components/` - React components

## Environment Variables

See `.env.example` for all required variables.
