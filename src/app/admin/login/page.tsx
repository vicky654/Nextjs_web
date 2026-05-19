'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Login failed');
        return;
      }
      router.push('/admin');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3a5f 0%, #00a8cc 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="card shadow" style={{ width: '100%', maxWidth: 400, padding: '2rem', borderRadius: 12 }}>
        <div className="text-center mb-4">
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1e3a5f', marginBottom: 4 }}>
            <span style={{ color: '#00a8cc' }}>DPDP</span> Admin
          </h1>
          <p className="text-muted small mb-0">Sign in to manage content</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="admin-email" className="form-label small fw-semibold">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@dpdpconsultants.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="admin-password" className="form-label small fw-semibold">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
            style={{ background: '#1e3a5f', borderColor: '#1e3a5f', fontWeight: 600 }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Signing in&hellip;
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link href="/" className="text-muted small">
            &larr; Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
