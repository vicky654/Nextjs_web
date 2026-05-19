import { unstable_cache } from 'next/cache';
import type { DbBlogPost, TOCItem } from '@/types';
import { addHeadingIds } from './sanitize';
import connectDB from './mongodb';
import BlogPost from '@/models/BlogPost';

const PAGE_LIMIT_MAX = 100;

type RawDoc = { _id: { toString(): string }; [key: string]: unknown };

function mapBlog(doc: RawDoc): DbBlogPost {
  const { _id, __v, ...rest } = doc;
  return { id: _id.toString(), ...rest } as unknown as DbBlogPost;
}

export async function getPublishedBlogs(
  page = 1,
  limit = 10
): Promise<{ posts: DbBlogPost[]; total: number }> {
  await connectDB();
  const safeLimit = Math.min(limit, PAGE_LIMIT_MAX);
  const skip = (page - 1) * safeLimit;
  const filter = { status: true, is_archived: false };
  const [docs, total] = await Promise.all([
    BlogPost.find(filter).sort({ recdate: -1 }).skip(skip).limit(safeLimit).lean(),
    BlogPost.countDocuments(filter),
  ]);
  return { posts: (docs as unknown as RawDoc[]).map(mapBlog), total };
}

export async function getBlogBySlug(slug: string): Promise<DbBlogPost | null> {
  await connectDB();
  const doc = await BlogPost.findOne({ slug, status: true }).lean();
  return doc ? mapBlog(doc as unknown as RawDoc) : null;
}

export async function getBlogById(id: string): Promise<DbBlogPost | null> {
  await connectDB();
  try {
    const doc = await BlogPost.findById(id).lean();
    return doc ? mapBlog(doc as unknown as RawDoc) : null;
  } catch {
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<{ id: string; slug: string }[]> {
  await connectDB();
  const docs = await BlogPost.find(
    { status: true, slug: { $exists: true, $ne: null } },
    { _id: 1, slug: 1 }
  ).lean();
  return (docs as unknown as RawDoc[]).map((d) => ({
    id: d._id.toString(),
    slug: d.slug as string,
  }));
}

export async function getBlogCount(): Promise<number> {
  await connectDB();
  return BlogPost.countDocuments({ status: true, is_archived: false });
}

export async function getRelatedBlogs(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<DbBlogPost[]> {
  await connectDB();
  const docs = await BlogPost.find({
    status: true,
    is_archived: false,
    slug: { $ne: currentSlug },
    category,
  })
    .sort({ recdate: -1 })
    .limit(limit)
    .lean();
  return (docs as unknown as RawDoc[]).map(mapBlog);
}

export async function getFeaturedBlogs(limit = 5): Promise<DbBlogPost[]> {
  await connectDB();
  const docs = await BlogPost.find({ status: true, is_featured: true, is_archived: false })
    .sort({ recdate: -1 })
    .limit(limit)
    .lean();
  return (docs as unknown as RawDoc[]).map(mapBlog);
}

export async function getPrevNextBlog(
  currentId: string
): Promise<{ prev: DbBlogPost | null; next: DbBlogPost | null }> {
  await connectDB();
  try {
    const current = await BlogPost.findById(currentId, { recdate: 1 }).lean() as unknown as RawDoc | null;
    if (!current) return { prev: null, next: null };

    const currentDate = current.recdate as Date;
    const [prevDoc, nextDoc] = await Promise.all([
      BlogPost.findOne({ status: true, recdate: { $lt: currentDate } })
        .sort({ recdate: -1 })
        .select({ _id: 1, slug: 1, rectitle: 1 })
        .lean(),
      BlogPost.findOne({ status: true, recdate: { $gt: currentDate } })
        .sort({ recdate: 1 })
        .select({ _id: 1, slug: 1, rectitle: 1 })
        .lean(),
    ]);
    return {
      prev: prevDoc ? mapBlog(prevDoc as unknown as RawDoc) : null,
      next: nextDoc ? mapBlog(nextDoc as unknown as RawDoc) : null,
    };
  } catch {
    return { prev: null, next: null };
  }
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
