'use client';
import { useEffect, useState, useMemo } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';

interface BlogRow {
  id: string;
  rectitle: string;
  status: boolean;
  category: string;
  author: string;
  recdate: string;
  slug: string;
  is_featured: boolean;
  is_archived: boolean;
  summary: string;
  recdesc: string;
  metadesc: string;
  metakeyw: string;
  recimg: string;
  imgalt: string;
  tags: string[];
  read_time: number | null;
  faq_schema: unknown;
  recpub: string;
  updated_at: string;
}

const PAGE_SIZE = 20;

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to load');
      setBlogs(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return blogs;
    const q = search.toLowerCase();
    return blogs.filter(
      (b) =>
        b.rectitle?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q)
    );
  }, [blogs, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async (blog: BlogRow) => {
    if (!confirm(`Archive "${blog.rectitle}"? It will be marked as archived.`)) return;
    setActionLoading(blog.id);
    try {
      const res = await fetch(`/api/admin/blogs/${blog.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      await fetchBlogs();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (blog: BlogRow) => {
    setActionLoading(blog.id);
    try {
      const res = await fetch(`/api/admin/blogs/${blog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...blog, status: !blog.status }),
      });
      if (!res.ok) throw new Error('Update failed');
      await fetchBlogs();
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 fw-bold" style={{ color: '#1e3a5f' }}>
          Blog Posts
        </h1>
        <Link
          href="/admin/blogs/new"
          className="btn btn-primary btn-sm"
          style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }}
        >
          <i className="bi bi-plus me-1" />
          New Post
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger small">
          <i className="bi bi-exclamation-triangle me-2" />
          {error}
        </div>
      )}

      {/* Search */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group" style={{ maxWidth: 400 }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by title, category, author…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            {search && (
              <button className="btn btn-outline-secondary" onClick={() => setSearch('')}>
                <i className="bi bi-x" />
              </button>
            )}
          </div>
          {search && (
            <div className="text-muted small mt-2">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="d-flex align-items-center gap-2 text-muted p-4">
              <span className="spinner-border spinner-border-sm" />
              Loading posts&hellip;
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-3" style={{ width: 50 }}>
                      ID
                    </th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="pe-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((b) => (
                    <tr key={b.id} style={{ opacity: b.is_archived ? 0.5 : 1 }}>
                      <td className="ps-3 text-muted small">{b.id}</td>
                      <td>
                        <div className="fw-semibold small" style={{ maxWidth: 300 }}>
                          {b.rectitle}
                          {b.is_featured && (
                            <span className="badge bg-warning text-dark ms-2" style={{ fontSize: '0.65rem' }}>
                              Featured
                            </span>
                          )}
                          {b.is_archived && (
                            <span className="badge bg-dark ms-2" style={{ fontSize: '0.65rem' }}>
                              Archived
                            </span>
                          )}
                        </div>
                        {b.slug && (
                          <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                            /{b.slug}
                          </div>
                        )}
                      </td>
                      <td className="small">{b.category || '—'}</td>
                      <td className="small">{b.author || '—'}</td>
                      <td>
                        <span className={`badge ${b.status ? 'bg-success' : 'bg-secondary'}`}>
                          {b.status ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="small text-muted">
                        {b.recdate ? new Date(b.recdate).toLocaleDateString() : '—'}
                      </td>
                      <td className="pe-3 text-end">
                        <div className="d-flex gap-1 justify-content-end">
                          <Link
                            href={`/admin/blogs/${b.id}/edit`}
                            className="btn btn-outline-secondary btn-sm"
                          >
                            <i className="bi bi-pencil" />
                          </Link>
                          <button
                            className={`btn btn-sm ${b.status ? 'btn-outline-warning' : 'btn-outline-success'}`}
                            onClick={() => handleToggleStatus(b)}
                            disabled={actionLoading === b.id}
                            title={b.status ? 'Unpublish' : 'Publish'}
                          >
                            {actionLoading === b.id ? (
                              <span className="spinner-border spinner-border-sm" />
                            ) : (
                              <i className={`bi ${b.status ? 'bi-eye-slash' : 'bi-eye'}`} />
                            )}
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(b)}
                            disabled={actionLoading === b.id || b.is_archived}
                            title="Archive"
                          >
                            <i className="bi bi-archive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center text-muted py-4 small">
                        {search ? 'No posts match your search.' : 'No blog posts yet.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
            <div className="text-muted small">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of{' '}
              {filtered.length}
            </div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage((p) => p - 1)}>
                    &laquo;
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                  .map((p, idx, arr) => (
                    <>
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <li key={`ellipsis-${p}`} className="page-item disabled">
                          <span className="page-link">&hellip;</span>
                        </li>
                      )}
                      <li key={p} className={`page-item ${page === p ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setPage(p)}>
                          {p}
                        </button>
                      </li>
                    </>
                  ))}
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage((p) => p + 1)}>
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
