'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';

interface TeamRow {
  id: string;
  name: string;
  designation: string;
  image: string;
  expertise: string[];
  order: number;
  is_active: boolean;
}

export default function AdminTeamsPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/teams');
      if (res.status === 401) { router.replace('/admin/login/'); return; }
      const data = await res.json() as TeamRow[];
      if (!res.ok) throw new Error((data as unknown as { error: string }).error ?? 'Failed to load');
      setMembers(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const handleDelete = async (member: TeamRow) => {
    if (!confirm(`Delete "${member.name}"? This cannot be undone.`)) return;
    setActionLoading(member.id);
    try {
      const res = await fetch(`/api/admin/teams/${member.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchMembers();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleActive = async (member: TeamRow) => {
    setActionLoading(member.id);
    try {
      const res = await fetch(`/api/admin/teams/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !member.is_active }),
      });
      if (!res.ok) throw new Error('Update failed');
      await fetchMembers();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 fw-bold" style={{ color: '#1e3a5f' }}>Team Members</h1>
        <Link href="/admin/teams/new" className="btn btn-primary btn-sm" style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }}>
          <i className="bi bi-plus me-1" />Add Member
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
                    <th className="ps-3" style={{ width: 50 }}>Photo</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Expertise</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th className="pe-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id}>
                      <td className="ps-3">
                        {m.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={m.image} alt={m.name} width={36} height={36} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#6c757d' }}>
                            <i className="bi bi-person" />
                          </div>
                        )}
                      </td>
                      <td className="fw-semibold small">{m.name}</td>
                      <td className="small text-muted">{m.designation}</td>
                      <td className="small">
                        <div className="d-flex flex-wrap gap-1">
                          {m.expertise.slice(0, 2).map((e) => (
                            <span key={e} className="badge bg-light text-dark" style={{ fontSize: '0.65rem' }}>{e}</span>
                          ))}
                          {m.expertise.length > 2 && <span className="badge bg-light text-muted" style={{ fontSize: '0.65rem' }}>+{m.expertise.length - 2}</span>}
                        </div>
                      </td>
                      <td className="small text-muted">{m.order}</td>
                      <td>
                        <span className={`badge ${m.is_active ? 'bg-success' : 'bg-secondary'}`}>
                          {m.is_active ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="pe-3 text-end">
                        <div className="d-flex gap-1 justify-content-end">
                          <Link href={`/admin/teams/${m.id}/edit`} className="btn btn-outline-secondary btn-sm">
                            <i className="bi bi-pencil" />
                          </Link>
                          <button className={`btn btn-sm ${m.is_active ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => handleToggleActive(m)} disabled={actionLoading === m.id}
                            title={m.is_active ? 'Hide' : 'Show'}>
                            {actionLoading === m.id ? <span className="spinner-border spinner-border-sm" /> : <i className={`bi ${m.is_active ? 'bi-eye-slash' : 'bi-eye'}`} />}
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(m)} disabled={actionLoading === m.id} title="Delete">
                            <i className="bi bi-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {members.length === 0 && (
                    <tr><td colSpan={7} className="text-center text-muted py-4 small">No team members yet.</td></tr>
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
