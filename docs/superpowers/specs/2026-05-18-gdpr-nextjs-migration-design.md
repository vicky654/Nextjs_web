# GDPR/DPDP Website Migration — Technical Specification
**Date:** 2026-05-18  
**Project:** `dpdp-consultants-next`  
**Project Root:** `C:\Users\Vicky\Desktop\dpdp-consultants-next`  
**Legacy Reference:** `C:\Users\Vicky\Desktop\GDPR-website` (read-only)  
**Status:** Approved — ready for implementation planning

---

## 1. Project Summary

Migrate the legacy PHP/HTML GDPR Consultants website into the existing Next.js 16 project (`dpdp-consultants-next`) without breaking current architecture, components, or functionality.

**Primary constraint:** SEO preservation is the highest priority. All canonical URLs, meta titles, descriptions, schema markup, and indexed paths must be preserved exactly as they exist in the PHP site.

**Tech stack (preserved, no additions except `pg`):**
- Next.js 16 (App Router, `src/app/` flat structure)
- React 19 + TypeScript
- Bootstrap 5.3 + Sass (`src/styles/globals.scss`)
- GSAP (animations)
- `pg` + `@types/pg` added for PostgreSQL (server-side only)
- `isomorphic-dompurify` added for blog HTML sanitization (server-side only)

**Path alias:** `@/*` → `./src/*`

---

## 2. What Is Never Touched

| Item | Rule |
|---|---|
| `src/app/dashboard/` and all sub-routes | Completely untouched |
| `src/components/layout/Header.tsx` | Nav items updated only |
| `src/components/layout/Footer.tsx` | Links updated only |
| `src/components/sections/` (all 4 existing) | Reused as-is |
| `src/styles/globals.scss` | Extended at bottom only, never overwritten |
| `src/types/index.ts` | Extended with new types only |
| `src/data/blog.ts` | Kept as static fallback, superseded by DB layer |
| `next.config.ts` | `rewrites` array extended only |
| `src/lib/constants.ts` | Nav/footer data extended only |

---

## 3. Route Map

### Tier 1 — Existing pages (content + SEO update only)

| Route | PHP Source | Action |
|---|---|---|
| `/` | `index.php` | Update content, add `generateMetadata` + JSON-LD |
| `/about` | `about-us.php` | Update content, add `generateMetadata` |
| `/blog` | `blogs-07-san.php` | Wire to DB, add `generateMetadata` |
| `/blog/[slug]` | `blog.php` (DB-driven) | Wire to DB, add TOC + schema + ISR |
| `/services` | Existing | Update with PHP tool listing content |
| `/contact` | Existing | Add rewrite `/contact` → `/contact-us/` |
| `/privacy-policy` | `privacy-statement.php` | Update content |

### Tier 2 — New canonical route folders (exact PHP canonical paths)

Created as `src/app/<exact-canonical-path>/page.tsx`. Folder name matches the canonical URL path character-for-character including casing.

| Route (new folder) | PHP Page | SEO Canonical in PHP |
|---|---|---|
| `/contact-us/` | `contact.php` | `https://www.gdprconsultants.in/contact-us/` |
| `/consent-management-platform/` | `consent-management-tool.php` | PHP canonical #1 for `$page="ccm"` |
| `/Cookie-Consent-Management/` | `cookie-consent-management.php` | `https://www.gdprconsultants.in/Cookie-Consent-Management/` |
| `/Data-Protection-Third-Party-Processors-Assessment/` | `data-protection-third-party.php` | `https://www.gdprconsultants.in/Data-Protection-Third-Party-Processors-Assessment/` |
| `/Data-Subject-Rights-and-Grievance-Management/` | `data-subject-rights-and-grievance-management.php` | `https://www.gdprconsultants.in/Data-Subject-Rights-and-Grievance-Management/` |
| `/Data-Protection-Impact-Assessment/` | `data-protection-impact-assessment.php` | `https://www.gdprconsultants.in/Data-Protection-Impact-Assessment/` |

### Tier 3 — Nav-linked GDPR Issues pages (no PHP canonical, nav-linked)

Created as `src/app/<filename-without-php>/page.tsx`. Canonical set to own route URL.

```
/administrative-fines-and-penalties/
/data-transfer-issues/
/GDPR-and-rest-of-the-world/
/GDPR-and-business-development/
/GDPR-and-hotel-Industry/
/GDPR-and-software-development/
/GDPR-and-elearning-business/
/subcontract-and-third-party-issues/
/GDPR-and-BIO/
/GDPR-and-crypto-world/
/gdpr-certification/
/business-discontinuity/
/GDPR-and-EU-Representation/
/GDPR-and-NGO/
```

### Tier 4 — Supporting pages

```
/thanks/         → post-contact confirmation, noindex
/not-found       → custom 404 via src/app/not-found.tsx
```

---

## 4. New Infrastructure Files

```
src/lib/db.ts                          PostgreSQL pool connection
src/lib/blog.ts                        Server-side blog data functions
src/lib/seo.ts                         Centralized metadata generation
src/lib/sanitize.ts                    Blog HTML sanitization (DOMPurify)
src/middleware.ts                      Legacy blog.php?id=XXX → /blog/[slug] redirect
src/app/sitemap.ts                     Dynamic sitemap (all routes + blog slugs)
src/app/robots.ts                      Robots.txt
src/app/not-found.tsx                  Custom 404
src/components/ui/Breadcrumb.tsx       Reusable breadcrumb
src/components/ui/SchemaMarkup.tsx     JSON-LD <script> injector
src/components/sections/PageHero.tsx   Inner-page hero with breadcrumb
src/components/blog/TableOfContents.tsx  Sticky TOC + IntersectionObserver
src/components/blog/ReadingProgress.tsx  Fixed top reading progress bar
src/components/blog/ShareButtons.tsx     Copy link + social share
scripts/migrate-blogs.ts               One-time PostgreSQL blog migration script
docs/migration-checklist.md            Per-page migration tracking document
```

---

## 5. Blog System Architecture

### 5.1 Existing Database

- **Host:** AWS RDS PostgreSQL (ap-south-1)
- **Database:** `dbcontactforms`
- **Blog table:** `blogs_gdpr`
- **Credentials:** stored in `.env.local` only, never in source

**Confirmed columns in `blogs_gdpr`:**
```
id         SERIAL PK
status     BOOLEAN          -- true = published
recdate    TIMESTAMP        -- creation date
recpub     TIMESTAMP        -- publication date
rectitle   TEXT             -- post title
recdesc    TEXT             -- full HTML content
summary    TEXT             -- excerpt
metadesc   TEXT             -- SEO meta description
metakeyw   TEXT             -- SEO keywords (comma-separated)
recimg     TEXT             -- featured image URL/path
imgalt     TEXT             -- image alt text
recfile    TEXT             -- attached file reference
```

### 5.2 Non-Destructive Schema Extension

```sql
ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS slug          TEXT UNIQUE;
ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS author        TEXT DEFAULT 'GDPR Consultants';
ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS author_image  TEXT;
ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS category      TEXT DEFAULT 'GDPR';
ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS tags          TEXT[] DEFAULT '{}';
ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS read_time     INTEGER;
ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS faq_schema    JSONB;
ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS updated_at    TIMESTAMP;
ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS is_featured   BOOLEAN DEFAULT false;
ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS is_archived   BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_blogs_slug        ON blogs_gdpr(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status_pub  ON blogs_gdpr(status, recpub DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_category    ON blogs_gdpr(category);
CREATE INDEX IF NOT EXISTS idx_blogs_fulltext    ON blogs_gdpr USING gin(to_tsvector('english', rectitle || ' ' || COALESCE(recdesc,'')));
```

Original PHP columns are never dropped. PHP site continues operating unchanged.

**Rollback SQL** (generated by migration script as `scripts/rollback-schema.sql`):
```sql
ALTER TABLE blogs_gdpr DROP COLUMN IF EXISTS slug;
ALTER TABLE blogs_gdpr DROP COLUMN IF EXISTS author;
-- ... one DROP per added column
```

### 5.3 Migration Script (`scripts/migrate-blogs.ts`)

Operates in two modes:
- `--dry-run` — reads DB, logs what would change, makes zero writes
- `--execute` — applies changes, writes migration-report.json

**Steps per row:**
1. Generate slug from `rectitle` using `slugify()`
2. Detect collision → append `-2`, `-3`... up to `-99`, else flag as FAILED
3. Estimate `read_time` = `Math.ceil(wordCount(recdesc) / 200)`
4. Extract `category` from first keyword in `metakeyw` or default `'GDPR'`
5. Extract `tags[]` from `metakeyw` split by comma, max 10 tags
6. Add `id="..."` attributes to all `<h2>` and `<h3>` tags in `recdesc` for TOC anchors
7. Detect duplicate heading IDs → append `-2`, `-3`
8. Backup row to `blogs_gdpr_backup` table before UPDATE
9. `UPDATE blogs_gdpr SET slug=..., read_time=..., category=..., tags=..., updated_at=NOW() WHERE id=...`
10. Log outcome to `migration-report.json`

### 5.4 Data-Fetch Functions (`src/lib/blog.ts`)

All functions are server-side only. No API routes for blog — Server Components call these directly.

```typescript
getPublishedBlogs(page: number, limit: number): Promise<{ posts: DbBlogPost[], total: number }>
getBlogBySlug(slug: string): Promise<DbBlogPost | null>
getBlogById(id: number): Promise<DbBlogPost | null>         // legacy ID lookup
getAllBlogSlugs(): Promise<{ slug: string }[]>              // for generateStaticParams
getBlogsByCategory(cat: string, page: number, limit: number): Promise<DbBlogPost[]>
getRelatedBlogs(slug: string, limit?: number): Promise<DbBlogPost[]>
getBlogCount(): Promise<number>                             // for sitemap
getFeaturedBlogs(limit?: number): Promise<DbBlogPost[]>
extractHeadings(html: string): TOCItem[]                   // parse h2/h3 → [{id, text, level}]
addHeadingIds(html: string): string                        // inject id="" into h2/h3 tags
```

Query pagination limits enforced: `LIMIT` capped at 100 per query, never unbounded.

### 5.5 Caching Strategy

```typescript
export const revalidate = 3600; // ISR: 1 hour on all blog pages

// DB query memoization via unstable_cache
import { unstable_cache } from 'next/cache';

export const getCachedBlogs = unstable_cache(
  getPublishedBlogs, ['published-blogs'], { revalidate: 3600, tags: ['blogs'] }
);
```

`generateMetadata` and page data share the same cached DB call — no duplicate queries per request.

On-demand revalidation: future admin action calls `revalidateTag('blogs')` without a full rebuild.

### 5.6 Blog Page Layout (`/blog/[slug]`)

```
ReadingProgress        (Client Component — fixed top bar)
PageHero               (Server — title + breadcrumb)
<Image>                (Next.js Image — priority, blur placeholder)
  ┌─────────────────────────────────┬──────────────────┐
  │  Content (sanitized HTML)       │  TableOfContents  │
  │  (Server renders, client reads) │  (Client, sticky) │
  └─────────────────────────────────┴──────────────────┘
PrevNext               (Server — previous/next post)
ShareButtons           (Client — copy link + social)
RelatedPosts           (Server — lazy loaded via Suspense)
SchemaMarkup           (Server — Article + Breadcrumb + FAQ)
```

**TOC behaviour:**
- Depth: `h2` and `h3` only (never h4+)
- Active tracking: `IntersectionObserver` with `rootMargin: '-20% 0px -70% 0px'`
- Mobile: collapsible accordion (`<details>/<summary>`)
- Heading IDs: injected server-side in `addHeadingIds()`, validated for uniqueness
- Copy-link buttons: injected client-side on mount beside each heading

### 5.7 Middleware (`src/middleware.ts`)

Handles `blog.php?id=XXX` legacy redirect without hitting DB on every request:

```
1. Match pathname === '/blog.php' AND searchParams has 'id'
2. Read cached ID→slug map (populated at build time, refreshed hourly via edge cache)
3. If slug found: 301 redirect to /blog/[slug]
4. If not found (deleted/archived): 410 Gone response
5. If map miss (very new post): fall through to /blog listing
```

The ID→slug map is populated by `getAllBlogSlugs()` and stored in an edge-compatible cache. No DB query on every middleware execution.

---

## 6. SEO Architecture

### 6.1 `src/lib/seo.ts` — Exported API

```typescript
buildPageMeta(config: PageMetaConfig): Metadata
buildBlogMeta(post: DbBlogPost): Metadata
buildArticleSchema(post: DbBlogPost, url: string): WithContext<Article>
buildBreadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList>
buildFAQSchema(faqs: FAQItem[]): WithContext<FAQPage>
buildOrgSchema(): WithContext<Organization>
buildSoftwareAppSchema(tool: ToolConfig): WithContext<SoftwareApplication>
buildWebPageSchema(page: PageConfig): WithContext<WebPage>
getCanonicalUrl(path: string): string
getFallbackOGImage(): string
```

### 6.2 Canonical URL Rules

```
Base:            NEXT_PUBLIC_SITE_URL (no trailing slash in env var)
Join:            base + path — never produces double slash
Trailing slash:  preserved exactly as passed in canonicalPath
                 Tool pages: with slash  (/consent-management-platform/)
                 Blog posts: no slash    (/blog/slug)
                 Root:       with slash  (/)
Pagination:      /blog?page=2 → canonical = /blog (page 1 is canonical)
                 rel="prev"/"next" added via <link> in <head>
```

### 6.3 Per-Page Meta Source (from PHP `head-meta.php`)

| Route | PHP Title (exact) | Has PHP Canonical |
|---|---|---|
| `/` | EU's Best GDPR Compliance Management Software | Yes |
| `/consent-management-platform/` | Consent Management Software for GDPR | Implied |
| `/Cookie-Consent-Management/` | Cookie Consent Management Software for GDPR Compliance | Yes |
| `/Data-Protection-Third-Party-Processors-Assessment/` | Third-Party Risk Assessment Software for GDPR | Yes |
| `/Data-Subject-Rights-and-Grievance-Management/` | Grievance Redressal Software for GDPR | Yes |
| `/Data-Protection-Impact-Assessment/` | Impact Assessment Software for GDPR | Yes |
| `/contact-us/` | Contact GDPR Consultants EU | Yes |
| `/blog` | Blogs updates on DPDP Act compliance | No — use route |
| `/blog/[slug]` | `{rectitle}` from DB | No — use `/blog/{slug}` |
| `/privacy-policy` | Privacy Policy | No |
| `/thanks` | Thank You | No — noindex |
| GDPR Issues (14) | Derived from page content | No — use route |

**Meta fallback chain:**
```
title       → page config → SEO_DEFAULTS.title
description → page config → SEO_DEFAULTS.description
keywords    → page config → omitted
ogImage     → page config → recimg → '/images/og-image.jpg'
canonical   → explicit path → auto from route
```

### 6.4 JSON-LD Schema Per Page Type

| Route | Schemas Injected |
|---|---|
| `/` | Organization + WebSite |
| Tool pages (5) | SoftwareApplication + BreadcrumbList |
| GDPR Issues (14) | WebPage + BreadcrumbList |
| `/blog` | Blog + BreadcrumbList |
| `/blog/[slug]` | Article + BreadcrumbList + FAQPage (if populated) |
| `/contact-us/` | ContactPage + Organization |
| `/about` | AboutPage + Organization |

### 6.5 OpenGraph + Twitter

- `ogType`: `'website'` for static pages, `'article'` for blog posts
- `locale`: `'en_IN'`
- Image size: always `1200×630`
- Blog posts additionally set: `publishedTime`, `modifiedTime`, `authors`, `tags`

### 6.6 Robots

```typescript
// src/app/robots.ts
rules: [
  { userAgent: '*', allow: '/', disallow: ['/dashboard/', '/api/', '/auth/'] }
],
sitemap: `${SITE_URL}/sitemap.xml`
```

Individual page `robots` metadata:
- `/thanks`: `{ index: false, follow: true }`
- `/dashboard/*`: `{ index: false, follow: false }`
- All production pages: `{ index: true, follow: true }`

### 6.7 Sitemap (`src/app/sitemap.ts`)

```typescript
// Static entries: all Tier 1–4 routes with lastModified
// Dynamic entries: all /blog/[slug] from getAllBlogSlugs()
//   → lastModified from updated_at column
//   → priority: 0.8 for tools, 0.6 for blog, 0.5 for GDPR issues
// Supports generateSitemaps() split if count > 50,000 (future-proof)
```

### 6.8 Pagination Canonical Strategy

```typescript
// /blog?page=1 → canonical: /blog  (page 1 is root)
// /blog?page=2 → canonical: /blog?page=2
// <link rel="prev" href="/blog" /> on page 2
// <link rel="next" href="/blog?page=3" /> on page 2
```

### 6.9 hreflang Readiness

```typescript
alternates: {
  canonical: getCanonicalUrl(canonicalPath),
  languages: { 'en': getCanonicalUrl(canonicalPath), 'x-default': getCanonicalUrl(canonicalPath) }
}
```

Expands to multilingual routes without touching any other code.

### 6.10 HTML Security (Blog Content)

```typescript
// src/lib/sanitize.ts — DOMPurify server-side
ALLOWED_TAGS: ['p','h1'–'h6','ul','ol','li','strong','em','a','img',
               'figure','figcaption','blockquote','pre','code',
               'table','thead','tbody','tr','th','td','br','hr']
ALLOWED_ATTR: ['href','src','alt','title','id','class','target','rel',
               'width','height','loading']
FORBID_TAGS:  ['script','style','iframe','object','embed','form']
FORBID_ATTR:  ['onclick','onload','onerror','style']
```

External links: `rel="noopener noreferrer"` enforced via DOMPurify `ADD_ATTR`.  
External image URLs: validated against known-safe domains. Unknown → fallback image.  
Hidden tracking scripts in legacy HTML: stripped by FORBID_TAGS rule above.

---

## 7. New Components

### Server Components
| Component | Location | Purpose |
|---|---|---|
| `PageHero` | `src/components/sections/PageHero.tsx` | Inner-page hero with breadcrumb + title |
| `Breadcrumb` | `src/components/ui/Breadcrumb.tsx` | Reusable breadcrumb nav |
| `SchemaMarkup` | `src/components/ui/SchemaMarkup.tsx` | JSON-LD `<script>` injector |

### Client Components
| Component | Location | Purpose |
|---|---|---|
| `TableOfContents` | `src/components/blog/TableOfContents.tsx` | Sticky TOC, IntersectionObserver active tracking, mobile collapse |
| `ReadingProgress` | `src/components/blog/ReadingProgress.tsx` | Fixed top progress bar |
| `ShareButtons` | `src/components/blog/ShareButtons.tsx` | Copy link + social share |

### TOC Details
- Tracks `h2` and `h3` only (depth limit enforced)
- `IntersectionObserver` with `rootMargin: '-20% 0px -70% 0px'`
- Mobile: `<details>/<summary>` collapsible
- Copy-link buttons injected client-side beside each heading
- Heading IDs validated for uniqueness: duplicates get `-2`, `-3` suffix

---

## 8. `next.config.ts` Extensions (rewrites only)

```typescript
// Added to existing rewrites array
{ source: '/consent-management-tool.php',                          destination: '/consent-management-platform/' },
{ source: '/cookie-consent-management.php',                        destination: '/Cookie-Consent-Management/' },
{ source: '/data-protection-third-party.php',                      destination: '/Data-Protection-Third-Party-Processors-Assessment/' },
{ source: '/data-subject-rights-and-grievance-management.php',     destination: '/Data-Subject-Rights-and-Grievance-Management/' },
{ source: '/data-protection-impact-assessment.php',                destination: '/Data-Protection-Impact-Assessment/' },
{ source: '/contact.php',                                          destination: '/contact-us/' },
{ source: '/about-us.php',                                         destination: '/about' },
{ source: '/index.php',                                            destination: '/' },
{ source: '/blogs.php',                                            destination: '/blog' },
{ source: '/blog-page-01.php',                                     destination: '/blog' },
{ source: '/blog.php',                                             destination: '/blog' },
{ source: '/privacy-statement.php',                                destination: '/privacy-policy' },
{ source: '/administrative-fines-and-penalties.php',               destination: '/administrative-fines-and-penalties/' },
{ source: '/data-transfer-issues.php',                             destination: '/data-transfer-issues/' },
{ source: '/GDPR-and-rest-of-the-world.php',                       destination: '/GDPR-and-rest-of-the-world/' },
{ source: '/GDPR-and-business-development.php',                    destination: '/GDPR-and-business-development/' },
{ source: '/GDPR-and-hotel-Industry.php',                          destination: '/GDPR-and-hotel-Industry/' },
{ source: '/GDPR-and-software-development.php',                    destination: '/GDPR-and-software-development/' },
{ source: '/GDPR-and-elearning-business.php',                      destination: '/GDPR-and-elearning-business/' },
{ source: '/subcontract-and-third-party-issues.php',               destination: '/subcontract-and-third-party-issues/' },
{ source: '/GDPR-and-BIO.php',                                     destination: '/GDPR-and-BIO/' },
{ source: '/GDPR-and-crypto-world.php',                            destination: '/GDPR-and-crypto-world/' },
{ source: '/gdpr-certification.php',                               destination: '/gdpr-certification/' },
{ source: '/business-discontinuity.php',                           destination: '/business-discontinuity/' },
{ source: '/GDPR-and-EU-Representation.php',                       destination: '/GDPR-and-EU-Representation/' },
{ source: '/GDPR-and-NGO.php',                                     destination: '/GDPR-and-NGO/' },
```

Rewrites are transparent to Google (URL stays as `.php` in browser only if page is cached with the .php URL — the canonical tag in the Next.js page always points to the clean URL).

---

## 9. `src/lib/constants.ts` Navigation Update

```typescript
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Compliance Tools', href: '#',
    children: [
      { label: 'Consent Management Platform', href: '/consent-management-platform/' },
      { label: 'Cookie Consent Management', href: '/Cookie-Consent-Management/' },
      { label: 'Data Protection Impact Assessment', href: '/Data-Protection-Impact-Assessment/' },
      { label: 'Third Party Risk Assessment', href: '/Data-Protection-Third-Party-Processors-Assessment/' },
      { label: 'Data Subject Rights & Grievance', href: '/Data-Subject-Rights-and-Grievance-Management/' },
    ]
  },
  {
    label: 'GDPR Issues', href: '#',
    children: [
      { label: 'Administrative Fines and Penalties', href: '/administrative-fines-and-penalties/' },
      { label: 'Data Transfer Issues', href: '/data-transfer-issues/' },
      { label: 'GDPR and Rest of The World', href: '/GDPR-and-rest-of-the-world/' },
      { label: 'GDPR and Business Development', href: '/GDPR-and-business-development/' },
      { label: 'GDPR and Hotel Industry', href: '/GDPR-and-hotel-Industry/' },
      { label: 'GDPR and Software Development', href: '/GDPR-and-software-development/' },
      { label: 'GDPR and Elearning Business', href: '/GDPR-and-elearning-business/' },
      { label: 'Subcontract and Third Party Issues', href: '/subcontract-and-third-party-issues/' },
      { label: 'GDPR and BIO', href: '/GDPR-and-BIO/' },
      { label: 'GDPR and Crypto World', href: '/GDPR-and-crypto-world/' },
      { label: 'GDPR Certification', href: '/gdpr-certification/' },
      { label: 'Business Discontinuity', href: '/business-discontinuity/' },
      { label: 'GDPR and EU Representation', href: '/GDPR-and-EU-Representation/' },
      { label: 'GDPR and NGO', href: '/GDPR-and-NGO/' },
    ]
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact-us/' },
];
```

---

## 10. Environment Variables

```
# .env.local (never committed)
DB_HOST=ls-2afec7242274ab00d3a094e8e0d24d7301187cb4.cnvivecdrcxm.ap-south-1.rds.amazonaws.com
DB_NAME=dbcontactforms
DB_USER=dbdpdp1username
DB_PASSWORD=<from db.pgsql.php>
DB_PORT=5432
NEXT_PUBLIC_SITE_URL=https://www.gdprconsultants.in
```

---

## 11. Migration Validation Checklist

Tracked in `docs/migration-checklist.md`. Status per page:

```
pending → migrated → verified → seo-validated
```

**Per-page checks:**
- [ ] Title matches PHP head-meta.php exactly
- [ ] Meta description matches PHP exactly
- [ ] Canonical URL matches PHP canonical exactly (including trailing slash)
- [ ] OpenGraph title, description, image present
- [ ] Twitter card present
- [ ] JSON-LD schema valid (Rich Results Test)
- [ ] Breadcrumb schema valid
- [ ] All internal links resolve (no 404)
- [ ] Featured image loads (200 response)
- [ ] Page is indexable (not accidentally noindexed)
- [ ] Mobile rendering passes visual check

**Migration QA reports generated by scripts:**
1. `url-parity-report.json` — PHP URL → Next.js route mapping table
2. `broken-image-report.json` — blog posts where `recimg` returns non-200
3. `orphan-page-report.json` — pages with no internal links pointing to them
4. `internal-link-validation.json` — all internal hrefs checked for 200/301
5. `duplicate-meta-report.json` — duplicate titles or descriptions across pages

---

## 12. Migration Phases

### Phase 1 — Infrastructure & Shared Components
Install `pg`, add `.env.local`, create `db.ts`, `seo.ts`, `sanitize.ts`, `blog.ts`, `Breadcrumb`, `SchemaMarkup`, `PageHero`, `sitemap.ts`, `robots.ts`, `not-found.tsx`. Update `constants.ts` nav. Update `next.config.ts` rewrites.

### Phase 2 — Static SEO Pages
Update: Home (`/`), About (`/about`), Privacy Policy (`/privacy-policy`).  
Create: `/contact-us/`, `/thanks/`.  
Each page: `generateMetadata` + JSON-LD + breadcrumb.

### Phase 3 — Compliance Tools Pages (Tier 2)
Create 5 canonical route folders. Each: Server Component, full SEO metadata, `SoftwareApplication` schema, `PageHero`, content from PHP, `CTASection`.

### Phase 4 — GDPR Issues Pages (Tier 3)
Create 14 nav-linked route folders. Each: Server Component, `WebPage` schema, breadcrumb, content from PHP, `CTASection`.

### Phase 5 — Blog System
Run migration script (dry-run first), apply schema changes, wire `/blog` and `/blog/[slug]` to DB, add TOC + ReadingProgress + ShareButtons + PrevNext, middleware for legacy ID redirects.

### Phase 6 — SEO Validation & Launch Prep
Run all QA reports, fill migration checklist, Lighthouse audit, sitemap submission, staging domain validation, rollback plan documented.

---

## 13. Pre-Launch Checklist

- [ ] Migration script dry-run passed (zero errors)
- [ ] Schema ALTER applied with backup
- [ ] All blog slugs generated, zero collisions
- [ ] All 6 canonical tool/contact routes created and verified
- [ ] All 14 GDPR Issues pages created
- [ ] Sitemap.xml generated and all URLs return 200
- [ ] Rich Results Test passes for: Article, SoftwareApplication, Organization, BreadcrumbList
- [ ] Lighthouse score ≥ 90 on Performance, 100 on SEO (staging)
- [ ] No duplicate canonical warnings in Google Search Console
- [ ] Rollback SQL script exists and tested
- [ ] `.env.local` backed up securely, not committed
- [ ] Staging domain validated before DNS switch
