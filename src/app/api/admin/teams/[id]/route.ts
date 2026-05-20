import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireAdminSession } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    await connectDB();
    const doc = await Team.findById(id).lean();
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({
      id: (doc._id as { toString(): string }).toString(),
      name: doc.name,
      designation: doc.designation,
      image: doc.image,
      bio: doc.bio,
      social_links: doc.social_links,
      expertise: doc.expertise,
      order: doc.order,
      is_active: doc.is_active,
    });
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    const body = await request.json() as Record<string, unknown>;
    await connectDB();
    const doc = await Team.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    revalidateTag('teams', {});
    return NextResponse.json({ id: doc._id.toString() });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    await connectDB();
    await Team.findByIdAndDelete(id);
    revalidateTag('teams', {});
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
