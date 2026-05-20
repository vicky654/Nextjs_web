import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireAdminSession } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import Team from '@/models/Team';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const docs = await Team.find({}).sort({ order: 1, created_at: -1 }).lean();
    const rows = docs.map((d) => ({
      id: (d._id as { toString(): string }).toString(),
      name: d.name,
      designation: d.designation,
      image: d.image,
      bio: d.bio,
      social_links: d.social_links,
      expertise: d.expertise,
      order: d.order,
      is_active: d.is_active,
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
      name: string;
      designation: string;
      image?: string;
      bio?: string;
      social_links?: { linkedin?: string; twitter?: string; email?: string };
      expertise?: string[];
      order?: number;
      is_active?: boolean;
    };
    if (!body.name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    await connectDB();
    const doc = await Team.create({
      name: body.name.trim(),
      designation: body.designation?.trim() ?? '',
      image: body.image?.trim() ?? '',
      bio: body.bio?.trim() ?? '',
      social_links: body.social_links ?? {},
      expertise: body.expertise ?? [],
      order: body.order ?? 0,
      is_active: body.is_active ?? true,
    });
    revalidateTag('teams', {});
    return NextResponse.json({ id: doc._id.toString() }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Server error' }, { status: 500 });
  }
}
