'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';

interface LogoRow {
  id: string;
  company_name: string;
  logo: string;
  website: string;
  order: number;
  is_active: boolean;
}

export default function AdminClientLogosPage() {
  const router = useRouter();
  const [logos, setLogos] = useState<LogoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchLogos = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/client-logos');
      if (res.status === 401) { router.replace('/admin/login/'); return; }
      const data = await res.json() as LogoRow[];
      if (!res.ok) throw new Error((data as unknown as { error: string }).error ?? 'Failed to load');
      setLogos(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchLogos(); }, [fetchLogos]);

  const handleDelete = async (logo: LogoRow) => {
    if (!confirm(`Delete "${logo.company_name}"? This cannot be undone.`)) return;
    setActionLoading(logo.id);
    try {
      const res = await fetch(`/api/admin/client-logos/${logo.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchLogos();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleActive = async (logo: LogoRow) => {
    setActionLoading(logo.id);
    try {
      const res = await fetch(`/api/admin/client-logos/${logo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !logo.is_active }),
      });
      if (!res.ok) throw new Error('Update failed');
      await fetchLogos();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 fw-bold" style={{ color: '#1e3a5f' }}>Client Logos</h1>
        <Link href="/admin/client-logos/new" className="btn btn-primary btn-sm" style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }}>
          <i className="bi bi-plus me-1" />Add Logo
        </Link>
      </div>

      {error && <div className="alert alert-danger small"><i className="bi bi-exclamation-triangle me-2" />{error}</div>}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="d-flex align-items-center gap-2 text-muted p-4">
              <span className="spinner-border spinner-border-sm" />Loading&hellip;
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-3" style={{ width: 70 }}>Logo</th>
                    <th>Company</th>
                    <th>Website</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th className="pe-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {logos.map((l) => (
                    <tr key={l.id}>
                      <td className="ps-3">
                        {l.logo ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={l.logo} alt={l.company_name} width={40} height={20} style={{ objectFit: 'contain' }} />
                        ) : (
                          <div style={{ width: 40, height: 20, background: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#6c757d', borderRadius: 4 }}>
                            <i className="bi bi-image" />
                          </div>
                        )}
                      </td>
                      <td className="fw-semibold small">{l.company_name}</td>
                      <td className="small text-muted">
                        {l.website ? (
                          <a href={l.website} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            {l.website.replace(/^https?:\/\//, '').slice(0, 40)}
                          </a>
                        ) : '—'}
                      </td>
                      <td className="small text-muted">{l.order}</td>
                      <td>
                        <span className={`badge ${l.is_active ? 'bg-success' : 'bg-secondary'}`}>
                          {l.is_active ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="pe-3 text-end">
                        <div className="d-flex gap-1 justify-content-end">
                          <Link href={`/admin/client-logos/${l.id}/edit`} className="btn btn-outline-secondary btn-sm">
                            <i className="bi bi-pencil" />
                          </Link>
                          <button className={`btn btn-sm ${l.is_active ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => handleToggleActive(l)} disabled={actionLoading === l.id}
                            title={l.is_active ? 'Hide' : 'Show'}>
                            {actionLoading === l.id ? <span className="spinner-border spinner-border-sm" /> : <i className={`bi ${l.is_active ? 'bi-eye-slash' : 'bi-eye'}`} />}
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(l)} disabled={actionLoading === l.id} title="Delete">
                            <i className="bi bi-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {logos.length === 0 && (
                    <tr><td colSpan={6} className="text-center text-muted py-4 small">No client logos yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
