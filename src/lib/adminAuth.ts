import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// Use a global Map so sessions survive Turbopack / HMR module reloads.
// A plain `const sessions = new Map()` at module scope is reset to empty
// every time the module is hot-reloaded, which invalidates all cookies.
declare global {
    var _adminSessions: Map<string, { email: string; createdAt: number }> | undefined;
}
if (!global._adminSessions) {
  global._adminSessions = new Map();
}
const sessions = global._adminSessions;

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

export function destroySession(token: string): void {
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
