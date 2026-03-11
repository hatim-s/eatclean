# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun --bun next dev          # Start dev server
bun --bun next build        # Production build
bun lint                    # Run ESLint
bun tsc                     # Type-check without emitting
drizzle-kit generate        # Generate SQL migrations
drizzle-kit migrate         # Run migrations
bun --bun scripts/seed-foods.ts  # Populate foods database
```

**Important**: Always use Bun, not npm/yarn/pnpm.

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 16 with App Router (not Pages Router)
- **Language**: TypeScript (strict mode)
- **Database**: Turso (SQLite) with Drizzle ORM
- **Auth**: Better Auth with GitHub OAuth
- **AI**: Groq SDK (llama-3.3-70b-versatile) for NLP parsing
- **UI**: Tailwind CSS v4 + shadcn/ui (Base Nova style, RSC-enabled)

## Architecture

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `actions/` - Server Actions for all mutations (not API routes)
- `auth/` - Better Auth configuration and session utilities
- `db/` - Drizzle ORM schema and client
- `types/` - TypeScript type definitions
- `ui/` - Reusable UI components, hooks, and utilities
- `scripts/` - Database seeding and data processing scripts

### Core Data Flow (Food Logging Pipeline)
```
User Input → Groq LLM Parse → FTS5 Search → AI Best Match → Calculate Nutrition → Database
```

Located in `actions/createFoodLog.ts`, this pipeline:
1. Parses free-text food entries via Groq (`actions/ai/parseUserEntry.ts`)
2. Searches food database with FTS5 (`actions/db/semanticSearch.ts`)
3. Ranks candidates with AI (`actions/ai/selectBestMatch.ts`)
4. Calculates scaled nutrition (`actions/lib/calculateNutritionFromPortion.ts`)
5. Upserts food logs and daily summaries atomically

### Database Schema
- **foods**: ~90+ nutrition columns, includes embedding vectors for search
- **foodLog**: User entries with JSON items array, denormalized macros for query performance
- **dailySummary**: Aggregated nutrition per user per day (YYYY-MM-DD format)
- Auth tables: user, session, account, verification (managed by Better Auth)

## Code Conventions

### UI design
- Do not generate UI based on ai-slop UIs with purple gradients everywhere
- UI should be clean, minimal and follow aesthetic appeal

### Required Patterns
- Server Components by default, add `'use client'` only for interactivity
- Use Server Actions for mutations, not API routes
- Use `interface` for object shapes, `type` for unions
- Function declarations for components (not arrow functions)
- Named exports only (no default exports for components)

### Forbidden Patterns
- No `any` types
- No getServerSideProps/getStaticProps (use Server Components)
- No axios (use native fetch)
- No moment.js/dayjs (use date-fns or Temporal)
- No lodash
- No Redux/Jotai (Zustand is approved)

### Error Handling
Return `{ success: boolean, error?: string, data?: T }` from Server Actions.

### Performance
- Cache expensive queries with `unstable_cache`
- Use `loading.tsx` for Suspense boundaries
- Lazy load heavy components
- FTS5 search is preferred over semantic search for food matching

## Key Files

| File | Purpose |
|------|---------|
| `db/schema.ts` | All database table definitions |
| `auth/config.ts` | Better Auth with GitHub OAuth |
| `actions/createFoodLog.ts` | Main food logging pipeline |
| `middleware.ts` | Auth enforcement on protected routes |
| `actions/db/semanticSearch.ts` | FTS5 food search (raw SQL) |
