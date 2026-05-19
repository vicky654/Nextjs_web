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

    // Log submission server-side (replace with email/CRM integration as needed)
    console.log('[Contact Form]', { name, email, phone, subject, message: message.slice(0, 200) });

    // Persist to database (non-blocking — user still redirects if DB is unavailable)
    try {
      const { pool } = await import('@/lib/db');
      await pool.query(`CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        submitted_at TIMESTAMPTZ DEFAULT now()
      )`);
      await pool.query(
        'INSERT INTO contact_submissions (name, email, phone, subject, message) VALUES ($1,$2,$3,$4,$5)',
        [name, email, phone, subject, message]
      );
    } catch {
      // DB unavailable — still redirect to thanks page (don't block user)
    }

    // Redirect to thank-you page
    return NextResponse.redirect(new URL('/thanks/', request.url), { status: 303 });
  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
