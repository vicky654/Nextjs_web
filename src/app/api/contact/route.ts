import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
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
    console.log('[Contact Form]', { name, email, subject, message: message.slice(0, 200) });

    // Redirect to thank-you page
    return NextResponse.redirect(new URL('/thanks/', request.url), { status: 303 });
  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
