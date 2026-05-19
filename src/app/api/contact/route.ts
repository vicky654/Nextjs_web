import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const subject = String(formData.get('subject') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Persist to MongoDB (non-blocking — user still redirects if DB is unavailable)
    try {
      const { default: connectDB } = await import('@/lib/mongodb');
      const { default: ContactSubmission } = await import('@/models/ContactSubmission');
      await connectDB();
      await ContactSubmission.create({ name, email, phone: phone || null, subject, message });
    } catch {
      // DB unavailable — don't block user
    }

    return NextResponse.redirect(new URL('/thanks/', request.url), { status: 303 });
  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
