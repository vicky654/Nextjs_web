'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';

interface TeamData {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio: string;
  social_links: { linkedin?: string; twitter?: string; email?: string };
  expertise: string[];
  order: number;
  is_active: boolean;
}

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [email, setEmail] = useState('');
  const [expertiseInput, setExpertiseInput] = useState('');
  const [expertise, setExpertise] = useState<string[]>([]);
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const fetchMember = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/teams/${id}`);
      if (res.status === 401) { router.replace('/admin/login/'); return; }
      const data = await res.json() as TeamData & { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Failed to load');
      setName(data.name ?? '');
      setDesignation(data.designation ?? '');
      setImage(data.image ?? '');
      setBio(data.bio ?? '');
      setLinkedin(data.social_links?.linkedin ?? '');
      setTwitter(data.social_links?.twitter ?? '');
      setEmail(data.social_links?.email ?? '');
      setExpertise(Array.isArray(data.expertise) ? data.expertise : []);
      setOrder(data.order ?? 0);
      setIsActive(data.is_active ?? true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => { if (id) fetchMember(); }, [id, fetchMember]);

  const addExpertise = () => {
    const val = expertiseInput.trim();
    if (val && !expertise.includes(val)) setExpertise((prev) => [...prev, val]);
    setExpertiseInput('');
  };

  const removeExpertise = (tag: string) =>
    setExpertise((prev) => prev.filter((t) => t !== tag));

  const handleSave = async () => {
    if (!name.trim()) { setError('Name is required.'); return; }
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: name.trim(),
        designation: designation.trim(),
        image: image.trim(),
        bio: bio.trim(),
        social_links: {
          linkedin: linkedin.trim(),
          twitter: twitter.trim(),
          email: email.trim(),
        },
        expertise,
        order,
        is_active: isActive,
      };
      const res = await fetch(`/api/admin/teams/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setError(data.error ?? 'Failed to save'); return; }
      router.push('/admin/teams');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/teams/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      router.push('/admin/teams');
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="d-flex align-items-center gap-2 text-muted p-4">
          <span className="spinner-border spinner-border-sm" />Loading&hellip;
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-start mb-4" style={{ borderBottom: '1px solid #e9ecef', paddingBottom: 16 }}>
        <div>
          <Link href="/admin/teams" className="text-muted small text-decoration-none d-inline-flex align-items-center gap-1 mb-1">
            <i className="bi bi-arrow-left" /> Team Members
          </Link>
          <h1 className="h4 fw-bold mb-0" style={{ color: '#1e3a5f' }}>Edit Team Member</h1>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger btn-sm" onClick={handleDelete} disabled={deleting || saving}>
            {deleting ? <span className="spinner-border spinner-border-sm me-1" /> : <i className="bi bi-trash me-1" />}
            Delete
          </button>
          <Link href="/admin/teams" className="btn btn-outline-secondary btn-sm">Cancel</Link>
          <button className="btn btn-sm text-white" style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }} disabled={saving || deleting} onClick={handleSave}>
            {saving ? <span className="spinner-border spinner-border-sm me-1" /> : <i className="bi bi-check2 me-1" />}
            Save Changes
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
                <label className="form-label small fw-semibold">Name <span className="text-danger">*</span></label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Designation</label>
                <input type="text" className="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g. Chief Privacy Officer" />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Photo URL</label>
                <input type="url" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/photo.jpg" />
                {image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={image} alt="Preview" style={{ marginTop: 10, maxWidth: 120, height: 120, objectFit: 'cover', borderRadius: '50%', border: '1px solid #e9ecef' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Bio</label>
                <textarea className="form-control" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short professional biography…" />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">LinkedIn URL</label>
                <input type="url" className="form-control" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/…" />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Twitter URL</label>
                <input type="url" className="form-control" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://twitter.com/…" />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Expertise</label>
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {expertise.map((tag) => (
                    <span key={tag} className="badge bg-light text-dark d-inline-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                      {tag}
                      <button type="button" className="btn-close btn-close-sm" style={{ fontSize: '0.55rem' }} onClick={() => removeExpertise(tag)} aria-label={`Remove ${tag}`} />
                    </span>
                  ))}
                </div>
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control" value={expertiseInput} onChange={(e) => setExpertiseInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addExpertise(); } }}
                    placeholder="Type and press Enter…" />
                  <button className="btn btn-outline-secondary" type="button" onClick={addExpertise}>Add</button>
                </div>
                <div className="text-muted" style={{ fontSize: '0.7rem', marginTop: 4 }}>Press Enter or comma to add</div>
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
