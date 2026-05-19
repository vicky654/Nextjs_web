/**
 * Blog migration script
 * Usage:
 *   npx tsx scripts/migrate-blogs.ts --dry-run
 *   npx tsx scripts/migrate-blogs.ts --execute
 */
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT ?? 5432),
  ssl: { rejectUnauthorized: false },
});

const isDryRun = process.argv.includes('--dry-run');
const isExecute = process.argv.includes('--execute');

if (!isDryRun && !isExecute) {
  console.error('Usage: npx tsx scripts/migrate-blogs.ts --dry-run | --execute');
  process.exit(1);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100);
}

function wordCount(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
}

function addHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (_m, tag, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    const base = slugify(text) || 'heading';
    const count = seen.get(base) ?? 0;
    const id = count === 0 ? base : `${base}-${count + 1}`;
    seen.set(base, count + 1);
    const cleanAttrs = attrs.replace(/\s*id="[^"]*"/gi, '');
    return `<${tag}${cleanAttrs} id="${id}">${content}</${tag}>`;
  });
}

interface BlogRow {
  id: number;
  rectitle: string;
  recdesc: string;
  metakeyw: string | null;
  slug: string | null;
}

async function run() {
  const client = await pool.connect();
  try {
    console.log(`Mode: ${isDryRun ? 'DRY RUN' : 'EXECUTE'}`);

    // Step 1: Add columns if missing (always runs, idempotent)
    if (isExecute) {
      console.log('\n— Applying schema changes...');
      await client.query(`
        ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS slug         TEXT UNIQUE;
        ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS author       TEXT DEFAULT 'GDPR Consultants';
        ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS author_image TEXT;
        ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS category     TEXT DEFAULT 'GDPR';
        ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS tags         TEXT[] DEFAULT '{}';
        ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS read_time    INTEGER;
        ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS faq_schema   JSONB;
        ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS updated_at   TIMESTAMP;
        ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS is_featured  BOOLEAN DEFAULT false;
        ALTER TABLE blogs_gdpr ADD COLUMN IF NOT EXISTS is_archived  BOOLEAN DEFAULT false;
      `);
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_blogs_slug       ON blogs_gdpr(slug);
        CREATE INDEX IF NOT EXISTS idx_blogs_status_pub ON blogs_gdpr(status, recpub DESC);
        CREATE INDEX IF NOT EXISTS idx_blogs_category   ON blogs_gdpr(category);
      `);
      // Backup table
      await client.query(`
        CREATE TABLE IF NOT EXISTS blogs_gdpr_backup AS SELECT * FROM blogs_gdpr WHERE false;
      `);
      console.log('  Schema changes applied.');
    }

    // Step 2: Fetch all posts
    const result = await client.query<BlogRow>(
      `SELECT id, rectitle, recdesc, metakeyw, slug FROM blogs_gdpr WHERE status = true ORDER BY id`
    );
    const rows = result.rows;
    console.log(`\nFound ${rows.length} published posts`);

    const report: Record<string, unknown>[] = [];
    const slugMap = new Map<string, number>(); // slug → id

    for (const row of rows) {
      if (row.slug) {
        slugMap.set(row.slug, row.id);
      }
    }

    for (const row of rows) {
      if (row.slug) {
        console.log(`  [SKIP] id=${row.id} already has slug="${row.slug}"`);
        report.push({ id: row.id, action: 'skipped', slug: row.slug });
        continue;
      }

      // Generate slug
      let base = slugify(row.rectitle);
      if (!base) base = `post-${row.id}`;
      let slug = base;
      let attempt = 1;
      while (slugMap.has(slug) && slugMap.get(slug) !== row.id) {
        attempt++;
        slug = `${base}-${attempt}`;
        if (attempt > 99) { slug = `post-${row.id}`; break; }
      }
      slugMap.set(slug, row.id);

      const readTime = Math.ceil(wordCount(row.recdesc ?? '') / 200);
      const keywords = row.metakeyw?.split(',').map((k) => k.trim()).filter(Boolean) ?? [];
      const category = keywords[0] ?? 'GDPR';
      const tags = keywords.slice(0, 10);
      const enrichedHtml = addHeadingIds(row.recdesc ?? '');

      console.log(`  [${isDryRun ? 'WOULD UPDATE' : 'UPDATE'}] id=${row.id} slug="${slug}" read_time=${readTime}min`);

      if (isExecute) {
        // Backup first
        await client.query(
          `INSERT INTO blogs_gdpr_backup SELECT * FROM blogs_gdpr WHERE id=$1 ON CONFLICT DO NOTHING`,
          [row.id]
        );
        await client.query(
          `UPDATE blogs_gdpr SET slug=$1, read_time=$2, category=$3, tags=$4, recdesc=$5, updated_at=NOW() WHERE id=$6`,
          [slug, readTime, category, tags, enrichedHtml, row.id]
        );
      }

      report.push({ id: row.id, action: isDryRun ? 'would-update' : 'updated', slug, readTime, category, tags });
    }

    const reportPath = path.join(__dirname, '..', 'migration-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nReport written to ${reportPath}`);
    console.log(`Done. ${report.filter((r) => r.action !== 'skipped').length} posts processed.`);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
