import { cookies } from 'next/headers';
import crypto from 'crypto';

// In-memory session store (ok for single-server; survives hot reload in dev)
const sessions = new Map<string, { email: string; createdAt: number }>();
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8h

export function createSession(email: string): string {
  const token = crypto.randomUUID();
  sessions.set(token, { email, createdAt: Date.now() });
  return token;
}

export function getSession(token: string): { email: string } | null {
  const s = sessions.get(token);
  if (!s) return null;
  if (Date.now() - s.createdAt > SESSION_TTL_MS) {
    sessions.delete(token);
    return null;
  }
  return { email: s.email };
}

export function destroySession(token: string) {
  sessions.delete(token);
}

export async function requireAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;
  return getSession(token);
}

export function hashPassword(pass: string): string {
  return crypto.createHash('sha256').update(pass + 'dpdp_salt_2025').digest('hex');
}
