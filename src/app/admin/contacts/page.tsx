'use client';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

interface ContactRow {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  submitted_at: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setContacts(data);
        else setError(data.error ?? 'Failed to load contacts');
      })
      .catch(() => setError('Network error loading contacts'))
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 fw-bold" style={{ color: '#1e3a5f' }}>
          Contact Submissions
        </h1>
        <span className="badge bg-secondary">{contacts.length} total</span>
      </div>

      {error && (
        <div className="alert alert-danger small">
          <i className="bi bi-exclamation-triangle me-2" />
          {error}
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="d-flex align-items-center gap-2 text-muted p-4">
              <span className="spinner-border spinner-border-sm" />
              Loading submissions&hellip;
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="bi bi-inbox display-4 d-block mb-2" />
              <p className="mb-0 small">No contact submissions yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-3">Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <>
                      <tr
                        key={c.id}
                        onClick={() => toggleExpand(c.id)}
                        style={{ cursor: 'pointer' }}
                        className={expandedId === c.id ? 'table-active' : ''}
                      >
                        <td className="ps-3">
                          <div className="fw-semibold small">{c.name}</div>
                        </td>
                        <td>
                          <a
                            href={`mailto:${c.email}`}
                            className="text-decoration-none small"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {c.email}
                          </a>
                        </td>
                        <td className="small text-muted">{c.phone ?? '—'}</td>
                        <td className="small">{c.subject}</td>
                        <td className="small text-muted">
                          {expandedId === c.id ? (
                            <span className="text-primary small">
                              <i className="bi bi-chevron-up me-1" />
                              Click to collapse
                            </span>
                          ) : (
                            <span className="text-truncate d-inline-block" style={{ maxWidth: 200 }}>
                              {c.message.slice(0, 80)}
                              {c.message.length > 80 && '…'}
                            </span>
                          )}
                        </td>
                        <td className="small text-muted pe-3">
                          {formatDate(c.submitted_at)}
                        </td>
                      </tr>
                      {expandedId === c.id && (
                        <tr key={`${c.id}-expanded`} className="table-active">
                          <td colSpan={6} className="ps-3 pe-3 pb-3">
                            <div
                              className="p-3 rounded"
                              style={{
                                background: '#f8f9fa',
                                border: '1px solid #dee2e6',
                                whiteSpace: 'pre-wrap',
                                fontSize: '0.875rem',
                                lineHeight: 1.6,
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <span className="fw-semibold text-primary small">
                                  <i className="bi bi-chat-text me-1" />
                                  Full Message
                                </span>
                                <a
                                  href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}`}
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <i className="bi bi-reply me-1" />
                                  Reply
                                </a>
                              </div>
                              {c.message}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
