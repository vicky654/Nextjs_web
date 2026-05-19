import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import type { FAQItem } from '@/types';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const docs = await BlogPost.find({})
      .sort({ recdate: -1 })
      .limit(200)
      .select({
        _id: 1,
        status: 1,
        recdate: 1,
        rectitle: 1,
        summary: 1,
        slug: 1,
        category: 1,
        author: 1,
        is_featured: 1,
        is_archived: 1,
        read_time: 1,
      })
      .lean();

    const rows = docs.map((d) => ({
      id: (d._id as { toString(): string }).toString(),
      status: d.status,
      recdate: d.recdate,
      rectitle: d.rectitle,
      summary: d.summary,
      slug: d.slug,
      category: d.category,
      author: d.author,
      is_featured: d.is_featured,
      is_archived: d.is_archived,
      read_time: d.read_time,
    }));

    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json() as {
      rectitle: string;
      recdesc?: string;
      summary?: string;
      metadesc?: string;
      metakeyw?: string;
      recimg?: string;
      imgalt?: string;
      slug?: string;
      author?: string;
      category?: string;
      tags?: string[];
      read_time?: number | null;
      status?: boolean;
      is_featured?: boolean;
      faq_schema?: FAQItem[] | null;
    };

    const { rectitle } = body;
    if (!rectitle) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    await connectDB();

    const slug = body.slug?.trim() || slugify(rectitle);

    const doc = await BlogPost.create({
      rectitle,
      recdesc: body.recdesc ?? '',
      summary: body.summary ?? null,
      metadesc: body.metadesc ?? null,
      metakeyw: body.metakeyw ?? null,
      recimg: body.recimg ?? null,
      imgalt: body.imgalt ?? null,
      slug,
      author: body.author ?? 'GDPR Consultants',
      category: body.category ?? 'GDPR',
      tags: body.tags ?? [],
      read_time: body.read_time ?? null,
      status: body.status ?? false,
      is_featured: body.is_featured ?? false,
      faq_schema: body.faq_schema ?? null,
      recdate: new Date(),
      is_archived: false,
    });

    return NextResponse.json({ id: doc._id.toString(), slug: doc.slug }, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}
