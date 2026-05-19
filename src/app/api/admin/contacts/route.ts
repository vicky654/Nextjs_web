import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { requireAdminSession } from '@/lib/adminAuth';

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at TIMESTAMPTZ DEFAULT now()
    )`);
    const result = await pool.query(
      'SELECT * FROM contact_submissions ORDER BY submitted_at DESC LIMIT 200'
    );
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });
  }
}
