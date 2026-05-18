# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Siyaram Associates (`artifacts/siyaram-associates`)
- **Preview path**: `/`
- **Kind**: React + Vite web app
- **Purpose**: Professional financial services website + CRM admin panel

**Website Pages:**
- `/` — Main landing page with Navbar, Hero, Services, About, EMI Calculator, Testimonials, Contact sections
- `/admin/login` — Admin CRM login (username: admin, password: admin123)
- `/admin` — CRM dashboard showing customer leads with status management

**Features:**
- Deep green + gold color theme
- Smooth scroll navigation, hover animations, framer-motion transitions
- Floating WhatsApp button linking to wa.me/919923071737
- EMI Calculator with real EMI formula
- Contact form submits leads to backend API
- CRM admin dashboard with lead status tracking (new/contacted/approved)

**Backend API (`artifacts/api-server`):**
- `GET /api/leads` — list all leads
- `POST /api/leads` — create new lead (from contact form)
- `GET /api/leads/:id` — get single lead
- `PATCH /api/leads/:id` — update lead status
- `GET /api/leads/summary` — stats summary for dashboard

**Database Schema (`lib/db/src/schema/leads.ts`):**
- `leads` table: id, name, phone, email, message, interest, status (new/contacted/approved), created_at

## Contact Details (Siyaram Associates)
- Phone/WhatsApp: 9923071737
- Address: Office no 1 Ground floor, Amisa building, Bharati Vidyapeeth Rd, Shriram Nagar, Ambegaon BK, Pune - 411073
