import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { requireAdminSession } from '@/lib/adminAuth';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const result = await pool.query(
      `SELECT id, status, recdate, recpub, rectitle, summary, slug, category, author, is_featured, is_archived, read_time
       FROM blogs_gdpr ORDER BY recdate DESC LIMIT 200`
    );
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const {
      rectitle,
      recdesc,
      summary,
      metadesc,
      metakeyw,
      recimg,
      imgalt,
      slug,
      author,
      category,
      tags,
      read_time,
      status,
      is_featured,
      faq_schema,
    } = body as {
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
      faq_schema?: unknown;
    };

    if (!rectitle) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const result = await pool.query(
      `INSERT INTO blogs_gdpr (rectitle, recdesc, summary, metadesc, metakeyw, recimg, imgalt, slug, author, category, tags, read_time, status, is_featured, faq_schema, recdate, recpub, is_archived, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,NOW(),NOW(),false,NOW())
       RETURNING id, slug`,
      [
        rectitle,
        recdesc ?? '',
        summary ?? '',
        metadesc ?? '',
        metakeyw ?? '',
        recimg ?? '',
        imgalt ?? '',
        slug ?? slugify(rectitle),
        author ?? 'GDPR Consultants',
        category ?? 'GDPR',
        tags ?? [],
        read_time ?? null,
        status ?? false,
        is_featured ?? false,
        faq_schema ? JSON.stringify(faq_schema) : null,
      ]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (e: unknown) {
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
