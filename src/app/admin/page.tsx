'use client';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';

interface BlogRow {
  id: string;
  rectitle: string;
  status: boolean;
  category: string;
  recdate: string;
  slug: string;
}

interface ContactRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  submitted_at: string;
}

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/blogs').then((r) => r.json()),
      fetch('/api/admin/contacts').then((r) => r.json()),
    ])
      .then(([b, c]) => {
        if (Array.isArray(b)) setBlogs(b.slice(0, 100));
        else setDbError(true);
        if (Array.isArray(c)) setContacts(c.slice(0, 5));
      })
      .catch(() => setDbError(true))
      .finally(() => setLoading(false));
  }, []);

  const published = blogs.filter((b) => b.status).length;
  const drafts = blogs.filter((b) => !b.status).length;

  const stats = [
    { label: 'Total Posts', value: blogs.length, icon: 'bi-file-text', color: '#1e3a5f' },
    { label: 'Published', value: published, icon: 'bi-check-circle', color: '#198754' },
    { label: 'Drafts', value: drafts, icon: 'bi-pencil', color: '#fd7e14' },
    { label: 'Contacts', value: contacts.length, icon: 'bi-envelope', color: '#00a8cc' },
  ];

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 fw-bold" style={{ color: '#1e3a5f' }}>
          Dashboard
        </h1>
        <Link
          href="/admin/blogs/new"
          className="btn btn-primary btn-sm"
          style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }}
        >
          <i className="bi bi-plus me-1" />
          New Blog Post
        </Link>
      </div>

      {dbError && (
        <div className="alert alert-warning small">
          <i className="bi bi-exclamation-triangle me-2" />
          Database unavailable. Make sure DB env vars are configured.
        </div>
      )}

      {loading ? (
        <div className="d-flex align-items-center gap-2 text-muted">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          Loading&hellip;
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            {stats.map((s) => (
              <div key={s.label} className="col-6 col-md-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center gap-3">
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: s.color + '20',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: s.color,
                        fontSize: '1.3rem',
                        flexShrink: 0,
                      }}
                    >
                      <i className={`bi ${s.icon}`} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color, lineHeight: 1.2 }}>
                        {s.value}
                      </div>
                      <div className="text-muted small">{s.label}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4">
            {/* Recent Blog Posts */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-3 pb-2">
                  <h5 className="mb-0 h6 fw-semibold">Recent Blog Posts</h5>
                  <Link href="/admin/blogs" className="btn btn-outline-primary btn-sm">
                    View All
                  </Link>
                </div>
                <div className="card-body p-0">
                  <table className="table table-hover mb-0">
                    <tbody>
                      {blogs.slice(0, 5).map((b) => (
                        <tr key={b.id}>
                          <td className="ps-3 py-2">
                            <div className="fw-semibold small text-truncate" style={{ maxWidth: 320 }}>
                              {b.rectitle}
                            </div>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                              {b.category} &middot;{' '}
                              {b.recdate ? new Date(b.recdate).toLocaleDateString() : '—'}
                            </div>
                          </td>
                          <td className="align-middle py-2">
                            <span className={`badge ${b.status ? 'bg-success' : 'bg-secondary'}`}>
                              {b.status ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="align-middle pe-3 py-2">
                            <Link
                              href={`/admin/blogs/${b.id}/edit`}
                              className="btn btn-outline-secondary btn-sm"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                      {blogs.length === 0 && (
                        <tr>
                          <td colSpan={3} className="text-center text-muted py-4 small">
                            No posts yet.{' '}
                            <Link href="/admin/blogs/new" className="text-primary">
                              Create your first post
                            </Link>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Contacts */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-3 pb-2">
                  <h5 className="mb-0 h6 fw-semibold">Recent Contacts</h5>
                  <Link href="/admin/contacts" className="btn btn-outline-primary btn-sm">
                    View All
                  </Link>
                </div>
                <div className="card-body p-0">
                  {contacts.length === 0 ? (
                    <p className="text-muted small p-3 mb-0">No submissions yet.</p>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {contacts.map((c) => (
                        <li key={c.id} className="list-group-item px-3 py-2">
                          <div className="fw-semibold small">{c.name}</div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                            {c.email} &middot; {c.subject}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
