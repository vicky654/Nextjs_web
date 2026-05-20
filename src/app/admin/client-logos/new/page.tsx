'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';

export default function NewClientLogoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState('');
  const [website, setWebsite] = useState('');
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async () => {
    if (!companyName.trim()) { setError('Company name is required.'); return; }
    setSaving(true);
    setError('');
    try {
      const payload = {
        company_name: companyName.trim(),
        logo: logo.trim(),
        website: website.trim(),
        order,
        is_active: isActive,
      };
      const res = await fetch('/api/admin/client-logos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setError(data.error ?? 'Failed to create logo'); return; }
      router.push('/admin/client-logos');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-start mb-4" style={{ borderBottom: '1px solid #e9ecef', paddingBottom: 16 }}>
        <div>
          <Link href="/admin/client-logos" className="text-muted small text-decoration-none d-inline-flex align-items-center gap-1 mb-1">
            <i className="bi bi-arrow-left" /> Client Logos
          </Link>
          <h1 className="h4 fw-bold mb-0" style={{ color: '#1e3a5f' }}>Add Client Logo</h1>
        </div>
        <div className="d-flex gap-2">
          <Link href="/admin/client-logos" className="btn btn-outline-secondary btn-sm">Cancel</Link>
          <button className="btn btn-sm text-white" style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }} disabled={saving} onClick={handleSubmit}>
            {saving ? <span className="spinner-border spinner-border-sm me-1" /> : <i className="bi bi-check2 me-1" />}
            Save Logo
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger small d-flex align-items-center gap-2">
          <i className="bi bi-exclamation-triangle-fill" /> {error}
        </div>
      )}

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label small fw-semibold">Company Name <span className="text-danger">*</span></label>
                <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Acme Corp" />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Logo URL</label>
                <input type="url" className="form-control" value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="https://example.com/logo.svg" />
                {logo && (
                  <div className="mt-2 p-3" style={{ background: '#f8f9fa', borderRadius: 8, border: '1px solid #e9ecef', display: 'inline-block' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo} alt="Logo preview" style={{ maxWidth: 200, maxHeight: 80, objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Website URL</label>
                <input type="url" className="form-control" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Display Order</label>
                <input type="number" className="form-control" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="is_active" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <label className="form-check-label small" htmlFor="is_active">Visible on website</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
