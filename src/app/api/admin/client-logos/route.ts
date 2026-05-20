import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireAdminSession } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import ClientLogo from '@/models/ClientLogo';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const docs = await ClientLogo.find({}).sort({ order: 1, created_at: -1 }).lean();
    const rows = docs.map((d) => ({
      id: (d._id as { toString(): string }).toString(),
      company_name: d.company_name,
      logo: d.logo,
      website: d.website,
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
      company_name: string;
      logo?: string;
      website?: string;
      order?: number;
      is_active?: boolean;
    };
    if (!body.company_name?.trim()) return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
    await connectDB();
    const doc = await ClientLogo.create({
      company_name: body.company_name.trim(),
      logo: body.logo?.trim() ?? '',
      website: body.website?.trim() ?? '',
      order: body.order ?? 0,
      is_active: body.is_active ?? true,
    });
    revalidateTag('client-logos', {});
    return NextResponse.json({ id: doc._id.toString() }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Server error' }, { status: 500 });
  }
}
