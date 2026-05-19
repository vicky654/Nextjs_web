'use client';
import { useState, FormEvent, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';

const CATEGORIES = [
  'GDPR',
  'DPDP',
  'Data Protection',
  'Privacy',
  'Compliance',
  'Legal',
  'Technology',
  'Other',
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

interface BlogData {
  id: string;
  rectitle: string;
  slug: string;
  summary: string;
  category: string;
  author: string;
  tags: string[] | null;
  read_time: number | null;
  status: boolean;
  is_featured: boolean;
  is_archived: boolean;
  recdesc: string;
  metadesc: string;
  metakeyw: string;
  recimg: string;
  imgalt: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [loadingData, setLoadingData] = useState(true);

  const [rectitle, setRectitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('GDPR');
  const [author, setAuthor] = useState('GDPR Consultants');
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState('');
  const [status, setStatus] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [recdesc, setRecdesc] = useState('');
  const [metadesc, setMetadesc] = useState('');
  const [metakeyw, setMetakeyw] = useState('');
  const [recimg, setRecimg] = useState('');
  const [imgalt, setImgalt] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${id}`);
        if (!res.ok) {
          setLoadError('Blog post not found.');
          return;
        }
        const data: BlogData = await res.json();
        setRectitle(data.rectitle ?? '');
        setSlug(data.slug ?? '');
        setSummary(data.summary ?? '');
        setCategory(data.category ?? 'GDPR');
        setAuthor(data.author ?? 'GDPR Consultants');
        setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '');
        setReadTime(data.read_time != null ? String(data.read_time) : '');
        setStatus(data.status ?? false);
        setIsFeatured(data.is_featured ?? false);
        setIsArchived(data.is_archived ?? false);
        setRecdesc(data.recdesc ?? '');
        setMetadesc(data.metadesc ?? '');
        setMetakeyw(data.metakeyw ?? '');
        setRecimg(data.recimg ?? '');
        setImgalt(data.imgalt ?? '');
        setSlugManual(true); // keep existing slug as-is
      } catch {
        setLoadError('Failed to load blog post.');
      } finally {
        setLoadingData(false);
      }
    };
    load();
  }, [id]);

  // Only auto-update slug if user hasn't manually set it (and it's a new slug)
  useEffect(() => {
    if (!slugManual && rectitle) {
      setSlug(slugify(rectitle));
    }
  }, [rectitle, slugManual]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!rectitle.trim()) {
      setSaveError('Title is required.');
      return;
    }
    setSaving(true);
    setSaveError('');
    try {
      const payload = {
        rectitle: rectitle.trim(),
        slug: slug.trim() || slugify(rectitle),
        summary: summary.trim(),
        category,
        author: author.trim(),
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        read_time: readTime ? Number(readTime) : null,
        status,
        is_featured: isFeatured,
        is_archived: isArchived,
        recdesc: recdesc.trim(),
        metadesc: metadesc.trim(),
        metakeyw: metakeyw.trim(),
        recimg: recimg.trim(),
        imgalt: imgalt.trim(),
        faq_schema: null,
      };
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error ?? 'Failed to update post');
        return;
      }
      router.push('/admin/blogs');
    } catch {
      setSaveError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Archive this post? It will be hidden from the public site.')) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      router.push('/admin/blogs');
    } catch {
      setSaveError('Failed to archive post.');
    }
  };

  if (loadingData) {
    return (
      <AdminLayout>
        <div className="d-flex align-items-center gap-2 text-muted mt-4">
          <span className="spinner-border spinner-border-sm" />
          Loading post&hellip;
        </div>
      </AdminLayout>
    );
  }

  if (loadError) {
    return (
      <AdminLayout>
        <div className="alert alert-danger">{loadError}</div>
        <Link href="/admin/blogs" className="btn btn-outline-secondary btn-sm">
          &larr; Back to Blog Posts
        </Link>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link href="/admin/blogs" className="text-muted small text-decoration-none">
            <i className="bi bi-arrow-left me-1" />
            Blog Posts
          </Link>
          <h1 className="h3 mb-0 fw-bold mt-1" style={{ color: '#1e3a5f' }}>
            Edit Post #{id}
          </h1>
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
          <i className="bi bi-archive me-1" />
          Archive
        </button>
      </div>

      {saveError && (
        <div className="alert alert-danger small">
          <i className="bi bi-exclamation-triangle me-2" />
          {saveError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-4">
          {/* Left column — main content */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white border-0 pt-3 pb-0">
                <h5 className="h6 fw-semibold mb-0">Content</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={rectitle}
                    onChange={(e) => setRectitle(e.target.value)}
                    required
                    placeholder="Enter post title"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Slug (URL)</label>
                  <div className="input-group">
                    <span className="input-group-text text-muted small">/blog/</span>
                    <input
                      type="text"
                      className="form-control"
                      value={slug}
                      onChange={(e) => {
                        setSlugManual(true);
                        setSlug(e.target.value);
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => {
                        setSlugManual(false);
                        setSlug(slugify(rectitle));
                      }}
                      title="Regenerate from title"
                    >
                      <i className="bi bi-arrow-clockwise" />
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Summary / Excerpt</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Short description for cards and previews"
                  />
                </div>

                <div className="mb-0">
                  <label className="form-label small fw-semibold">Content (HTML)</label>
                  <textarea
                    className="form-control font-monospace"
                    rows={16}
                    value={recdesc}
                    onChange={(e) => setRecdesc(e.target.value)}
                    placeholder="<p>Your HTML content here…</p>"
                    style={{ fontSize: '0.82rem' }}
                  />
                </div>
              </div>
            </div>

            {/* SEO */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white border-0 pt-3 pb-0">
                <h5 className="h6 fw-semibold mb-0">SEO</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Meta Description</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={metadesc}
                    onChange={(e) => setMetadesc(e.target.value)}
                    maxLength={160}
                    placeholder="160 chars max"
                  />
                  <div className="text-muted small mt-1">{metadesc.length}/160</div>
                </div>
                <div className="mb-0">
                  <label className="form-label small fw-semibold">Meta Keywords</label>
                  <input
                    type="text"
                    className="form-control"
                    value={metakeyw}
                    onChange={(e) => setMetakeyw(e.target.value)}
                    placeholder="gdpr, compliance, data protection"
                  />
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 pt-3 pb-0">
                <h5 className="h6 fw-semibold mb-0">Featured Image</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={recimg}
                    onChange={(e) => setRecimg(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="mb-0">
                  <label className="form-label small fw-semibold">Image Alt Text</label>
                  <input
                    type="text"
                    className="form-control"
                    value={imgalt}
                    onChange={(e) => setImgalt(e.target.value)}
                    placeholder="Descriptive alt text"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column — settings */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white border-0 pt-3 pb-0">
                <h5 className="h6 fw-semibold mb-0">Publish</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Status</label>
                  <select
                    className="form-select"
                    value={status ? 'published' : 'draft'}
                    onChange={(e) => setStatus(e.target.value === 'published')}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="is_featured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <label className="form-check-label small" htmlFor="is_featured">
                    Featured post
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="is_archived"
                    checked={isArchived}
                    onChange={(e) => setIsArchived(e.target.checked)}
                  />
                  <label className="form-check-label small" htmlFor="is_archived">
                    Archived
                  </label>
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                    style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving&hellip;
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                  <Link href="/admin/blogs" className="btn btn-outline-secondary">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white border-0 pt-3 pb-0">
                <h5 className="h6 fw-semibold mb-0">Post Details</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Author</label>
                  <input
                    type="text"
                    className="form-control"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Tags <span className="text-muted fw-normal">(comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="gdpr, privacy, compliance"
                  />
                </div>
                <div className="mb-0">
                  <label className="form-label small fw-semibold">Read Time (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    min={1}
                    max={120}
                    placeholder="5"
                  />
                </div>
              </div>
            </div>

            {/* Danger zone */}
            <div className="card border-0 shadow-sm border-danger" style={{ borderColor: '#dc354520 !important' }}>
              <div className="card-header bg-white border-0 pt-3 pb-0">
                <h5 className="h6 fw-semibold mb-0 text-danger">Danger Zone</h5>
              </div>
              <div className="card-body">
                <p className="text-muted small mb-3">
                  Archiving hides the post from the public site but keeps the data.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm w-100"
                  onClick={handleDelete}
                >
                  <i className="bi bi-archive me-2" />
                  Archive This Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
