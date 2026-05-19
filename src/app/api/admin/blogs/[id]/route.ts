import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireAdminSession } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import mongoose from 'mongoose';
import type { FAQItem } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Props) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    await connectDB();
    const doc = await BlogPost.findById(id).lean();
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({
      id: (doc._id as { toString(): string }).toString(),
      ...doc,
      _id: undefined,
      __v: undefined,
    });
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const body = await request.json() as {
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
      faq_schema: FAQItem[] | null;
    };

    await connectDB();
    await BlogPost.findByIdAndUpdate(id, {
      $set: {
        rectitle: body.rectitle,
        recdesc: body.recdesc,
        summary: body.summary,
        metadesc: body.metadesc,
        metakeyw: body.metakeyw,
        recimg: body.recimg,
        imgalt: body.imgalt,
        slug: body.slug,
        author: body.author,
        category: body.category,
        tags: body.tags,
        read_time: body.read_time,
        status: body.status,
        is_featured: body.is_featured,
        is_archived: body.is_archived,
        faq_schema: body.faq_schema ?? null,
        updated_at: new Date(),
      },
    });

    revalidateTag('blogs', {});
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Props) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    await connectDB();
    await BlogPost.findByIdAndUpdate(id, {
      $set: { is_archived: true, updated_at: new Date() },
    });
    revalidateTag('blogs', {});
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
