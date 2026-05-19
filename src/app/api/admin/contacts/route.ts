import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/adminAuth';
import connectDB from '@/lib/mongodb';
import ContactSubmission from '@/models/ContactSubmission';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const docs = await ContactSubmission.find({}).sort({ submitted_at: -1 }).limit(200).lean();
    const rows = docs.map((d) => ({
      id: (d._id as { toString(): string }).toString(),
      name: d.name,
      email: d.email,
      phone: d.phone,
      subject: d.subject,
      message: d.message,
      submitted_at: d.submitted_at,
    }));
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });
  }
}
