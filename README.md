# NorthStone Property — SEO Lead-Generation Platform

Production Next.js 15 website for NorthStone Property Inc. ("Real estate solutions built on trust"): programmatic city landing pages, a topical-authority blog, situation guides, high-conversion lead capture, and a full admin dashboard.

## Stack

Next.js 15 (App Router, Server Components, ISR) · TypeScript · Tailwind CSS v4 · Prisma · PostgreSQL (Supabase) · Supabase Auth + Storage · Vercel

## Getting started

```bash
npm install
cp .env.example .env        # fill in Supabase + database credentials
npx prisma db push          # create the schema
npm run db:seed             # provinces, 34 cities, situations, sample posts, FAQs
npm run dev
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` / `DIRECT_URL` | Supabase Postgres (pooled / direct) |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Auth + Storage |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, e.g. `https://www.northstoneproperty.ca` |
| `RESEND_API_KEY`, `LEAD_NOTIFICATION_FROM`, `LEAD_NOTIFICATION_TO` | Optional lead email alerts |

### Admin access

Create a user in Supabase Auth (email + password), then sign in at `/admin/login`. Middleware plus server-side session checks protect all admin routes and actions. For image uploads, create a **public Storage bucket named `images`**.

## Architecture notes

- **City pages** (`/sell-your-house-fast/[province]/[city]`) are 100% data-driven. Adding a row to `City` publishes a fully optimized landing page — hero, market insights, neighbourhoods, FAQs, testimonials, internal links — with zero code changes.
- **SEO**: per-page metadata via `lib/seo.ts`; JSON-LD (Organization, LocalBusiness, Article, FAQPage, BreadcrumbList) via `lib/schema.ts`; dynamic `sitemap.ts`, `robots.ts`, and RSS.
- **Leads**: every CTA posts to `/api/leads` (zod-validated) with a `sourcePath` recording the page *and placement* that converted — surfaced in the admin analytics.
- **ISR**: content pages revalidate hourly; admin actions revalidate affected paths instantly.
- **Scheduled posts** publish when `scheduledFor` passes (query-level filter — no cron needed).

## Brand

Design tokens live in `app/globals.css` and mirror `/brand-kit` (Midnight Navy `#081E34`, Stone `#736C63`, Source Serif 4 + Figtree). Full guidelines: `brand-kit/northstone-brand-guidelines.html`.

## Deploy (Vercel)

Import the repo, set the env vars above, and deploy. Then verify the domain in `NEXT_PUBLIC_SITE_URL`, submit `/sitemap.xml` to Google Search Console, and create the `images` bucket in Supabase.
