import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { requireAdminSession } from '@/lib/adminAuth';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Props) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const result = await pool.query('SELECT * FROM blogs_gdpr WHERE id = $1', [Number(id)]);
    if (!result.rows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
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
      is_archived,
      faq_schema,
    } = body as {
      rectitle: string;
      recdesc: string;
      summary: string;
      metadesc: string;
      metakeyw: string;
      recimg: string;
      imgalt: string;
      slug: string;
      author: string;
      category: string;
      tags: string[];
      read_time: number | null;
      status: boolean;
      is_featured: boolean;
      is_archived: boolean;
      faq_schema: unknown;
    };

    await pool.query(
      `UPDATE blogs_gdpr
       SET rectitle=$1, recdesc=$2, summary=$3, metadesc=$4, metakeyw=$5,
           recimg=$6, imgalt=$7, slug=$8, author=$9, category=$10,
           tags=$11, read_time=$12, status=$13, is_featured=$14,
           is_archived=$15, faq_schema=$16, updated_at=NOW()
       WHERE id=$17`,
      [
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
        is_archived,
        faq_schema ? JSON.stringify(faq_schema) : null,
        Number(id),
      ]
    );
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Props) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await pool.query(
      'UPDATE blogs_gdpr SET is_archived=true, updated_at=NOW() WHERE id=$1',
      [Number(id)]
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
