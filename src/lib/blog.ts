import { pool } from './db';
import { unstable_cache } from 'next/cache';
import type { DbBlogPost, TOCItem } from '@/types';
import { addHeadingIds } from './sanitize';

const PAGE_LIMIT_MAX = 100;

export async function getPublishedBlogs(
  page = 1,
  limit = 10
): Promise<{ posts: DbBlogPost[]; total: number }> {
  const safeLimit = Math.min(limit, PAGE_LIMIT_MAX);
  const offset = (page - 1) * safeLimit;
  const [rows, countRow] = await Promise.all([
    pool.query<DbBlogPost>(
      `SELECT * FROM blogs_gdpr WHERE status = true AND is_archived = false
       ORDER BY recpub DESC NULLS LAST, recdate DESC
       LIMIT $1 OFFSET $2`,
      [safeLimit, offset]
    ),
    pool.query<{ count: string }>(`SELECT COUNT(*) FROM blogs_gdpr WHERE status = true AND is_archived = false`),
  ]);
  return { posts: rows.rows, total: parseInt(countRow.rows[0].count, 10) };
}

export async function getBlogBySlug(slug: string): Promise<DbBlogPost | null> {
  const result = await pool.query<DbBlogPost>(
    `SELECT * FROM blogs_gdpr WHERE slug = $1 AND status = true LIMIT 1`,
    [slug]
  );
  return result.rows[0] ?? null;
}

export async function getBlogById(id: number): Promise<DbBlogPost | null> {
  const result = await pool.query<DbBlogPost>(
    `SELECT * FROM blogs_gdpr WHERE id = $1 AND status = true LIMIT 1`,
    [id]
  );
  return result.rows[0] ?? null;
}

export async function getAllBlogSlugs(): Promise<{ id: number; slug: string }[]> {
  const result = await pool.query<{ id: number; slug: string }>(
    `SELECT id, slug FROM blogs_gdpr WHERE status = true AND slug IS NOT NULL`
  );
  return result.rows;
}

export async function getBlogCount(): Promise<number> {
  const result = await pool.query<{ count: string }>(
    `SELECT COUNT(*) FROM blogs_gdpr WHERE status = true AND is_archived = false`
  );
  return parseInt(result.rows[0].count, 10);
}

export async function getRelatedBlogs(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<DbBlogPost[]> {
  const result = await pool.query<DbBlogPost>(
    `SELECT * FROM blogs_gdpr
     WHERE status = true AND slug != $1 AND category = $2 AND is_archived = false
     ORDER BY recpub DESC NULLS LAST
     LIMIT $3`,
    [currentSlug, category, limit]
  );
  return result.rows;
}

export async function getFeaturedBlogs(limit = 5): Promise<DbBlogPost[]> {
  const result = await pool.query<DbBlogPost>(
    `SELECT * FROM blogs_gdpr WHERE status = true AND is_featured = true AND is_archived = false
     ORDER BY recpub DESC NULLS LAST LIMIT $1`,
    [limit]
  );
  return result.rows;
}

export async function getPrevNextBlog(
  currentId: number
): Promise<{ prev: DbBlogPost | null; next: DbBlogPost | null }> {
  const [prevResult, nextResult] = await Promise.all([
    pool.query<DbBlogPost>(
      `SELECT id, slug, rectitle FROM blogs_gdpr WHERE status = true AND id < $1 ORDER BY id DESC LIMIT 1`,
      [currentId]
    ),
    pool.query<DbBlogPost>(
      `SELECT id, slug, rectitle FROM blogs_gdpr WHERE status = true AND id > $1 ORDER BY id ASC LIMIT 1`,
      [currentId]
    ),
  ]);
  return { prev: prevResult.rows[0] ?? null, next: nextResult.rows[0] ?? null };
}

export function extractHeadingsFromHtml(html: string): TOCItem[] {
  const headings: TOCItem[] = [];
  const regex = /<h([23])[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, '').trim(),
      level: Number(match[1]) as 2 | 3,
    });
  }
  return headings;
}

export function prepareContentHtml(html: string): string {
  return addHeadingIds(html ?? '');
}

// Cached wrappers
export const getCachedBlogs = unstable_cache(
  getPublishedBlogs,
  ['published-blogs'],
  { revalidate: 3600, tags: ['blogs'] }
);

export const getCachedBlogSlugs = unstable_cache(
  getAllBlogSlugs,
  ['blog-slugs'],
  { revalidate: 3600, tags: ['blogs'] }
);
