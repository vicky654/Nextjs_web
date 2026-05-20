'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import AdminLayout from '@/components/layout/AdminLayout';
import Link from 'next/link';
import type { EditorStats } from '@/components/admin/blog-editor/RichTextEditor';

// Lazy-load TipTap editor to avoid SSR issues
const RichTextEditor = dynamic(
  () => import('@/components/admin/blog-editor/RichTextEditor'),
  { ssr: false, loading: () => <div className="border rounded p-4 text-muted small">Loading editor…</div> }
);

const CATEGORIES = ['GDPR', 'DPDP', 'Data Protection', 'Privacy', 'Compliance', 'Legal', 'Technology', 'Other'];
const DRAFT_KEY = 'blog-draft-new';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
}

function getReadabilityLabel(words: number): { label: string; color: string } {
  if (words < 100) return { label: 'Too short', color: '#dc3545' };
  if (words < 300) return { label: 'Short', color: '#fd7e14' };
  if (words < 800) return { label: 'Good', color: '#198754' };
  if (words < 2000) return { label: 'Excellent', color: '#0d6efd' };
  return { label: 'Long-form', color: '#6f42c1' };
}

export default function NewBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saved' | 'saving'>('idle');
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [rectitle, setRectitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('GDPR');
  const [author, setAuthor] = useState('GDPR Consultants');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [status, setStatus] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [recdesc, setRecdesc] = useState('');
  const [metadesc, setMetadesc] = useState('');
  const [metakeyw, setMetakeyw] = useState('');
  const [recimg, setRecimg] = useState('');
  const [imgalt, setImgalt] = useState('');
  const [stats, setStats] = useState<EditorStats>({ words: 0, characters: 0, paragraphs: 0, headings: 0, readingTime: 0 });
  const [activeTab, setActiveTab] = useState<'write' | 'seo' | 'preview'>('write');
  const [draftRestored, setDraftRestored] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual) setSlug(slugify(rectitle));
  }, [rectitle, slugManual]);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as Record<string, unknown>;
      if (draft.rectitle) setRectitle(draft.rectitle as string);
      if (draft.slug) { setSlug(draft.slug as string); setSlugManual(true); }
      if (draft.summary) setSummary(draft.summary as string);
      if (draft.category) setCategory(draft.category as string);
      if (draft.author) setAuthor(draft.author as string);
      if (draft.tags) setTags(draft.tags as string[]);
      if (draft.recdesc) setRecdesc(draft.recdesc as string);
      if (draft.metadesc) setMetadesc(draft.metadesc as string);
      if (draft.metakeyw) setMetakeyw(draft.metakeyw as string);
      if (draft.recimg) setRecimg(draft.recimg as string);
      if (draft.imgalt) setImgalt(draft.imgalt as string);
      if (draft.isFeatured !== undefined) setIsFeatured(draft.isFeatured as boolean);
      setDraftRestored(true);
    } catch { /* ignore */ }
  }, []);

  // Auto-save to localStorage every 30 seconds
  const saveDraft = useCallback(() => {
    if (!rectitle && !recdesc) return;
    setAutoSaveStatus('saving');
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ rectitle, slug, summary, category, author, tags, recdesc, metadesc, metakeyw, recimg, imgalt, isFeatured, savedAt: Date.now() }));
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 3000);
    } catch { setAutoSaveStatus('idle'); }
  }, [rectitle, slug, summary, category, author, tags, recdesc, metadesc, metakeyw, recimg, imgalt, isFeatured]);

  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(saveDraft, 30000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [saveDraft]);

  const addTag = () => {
    const val = tagInput.trim();
    if (val && !tags.includes(val)) setTags((prev) => [...prev, val]);
    setTagInput('');
  };

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

  const handleSubmit = async (publish: boolean) => {
    if (!rectitle.trim()) { setError('Title is required.'); return; }
    setSaving(true);
    setError('');
    try {
      const payload = {
        rectitle: rectitle.trim(),
        slug: slug.trim() || slugify(rectitle),
        summary: summary.trim(),
        category,
        author: author.trim(),
        tags,
        read_time: stats.readingTime || null,
        status: publish,
        is_featured: isFeatured,
        recdesc: recdesc.trim(),
        metadesc: metadesc.trim(),
        metakeyw: metakeyw.trim(),
        recimg: recimg.trim(),
        imgalt: imgalt.trim(),
      };
      const res = await fetch('/api/admin/blogs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setError(data.error ?? 'Failed to create post'); return; }
      localStorage.removeItem(DRAFT_KEY);
      router.push('/admin/blogs');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const readability = getReadabilityLabel(stats.words);
  const seoScore = Math.min(100, Math.round(
    (rectitle.length > 20 ? 25 : 0) +
    (metadesc.length > 50 ? 25 : 0) +
    (slug.length > 5 ? 15 : 0) +
    (tags.length > 0 ? 10 : 0) +
    (stats.words > 300 ? 25 : 0)
  ));
  const seoColor = seoScore >= 75 ? '#198754' : seoScore >= 50 ? '#fd7e14' : '#dc3545';

  return (
    <AdminLayout>
      <style jsx>{`
        .page-header { border-bottom: 1px solid #e9ecef; padding-bottom: 16px; margin-bottom: 24px; }
        .section-card { background: #fff; border: 1px solid #e9ecef; border-radius: 10px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); margin-bottom: 20px; overflow: hidden; }
        .section-card-header { padding: 14px 20px 12px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; justify-content: space-between; }
        .section-card-title { font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6c757d; margin: 0; }
        .section-card-body { padding: 18px 20px; }
        .title-input { font-size: 1.5rem; font-weight: 700; border: none; outline: none; width: 100%; padding: 0; color: #1e3a5f; background: transparent; }
        .title-input::placeholder { color: #adb5bd; font-weight: 400; }
        .title-input:focus { box-shadow: none; }
        .slug-bar { font-size: 0.8rem; color: #6c757d; background: #f8f9fa; border-radius: 6px; padding: 6px 12px; display: flex; align-items: center; gap: 8px; }
        .slug-edit { flex: 1; border: none; outline: none; background: transparent; font-size: 0.8rem; color: #495057; min-width: 0; }
        .sticky-sidebar { position: sticky; top: 80px; }
        .status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }
        .status-pill.published { background: #d1e7dd; color: #0a3622; }
        .status-pill.draft { background: #e2e3e5; color: #41464b; }
        .tag-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; background: #e7f0fb; color: #1e3a5f; border-radius: 20px; font-size: 0.76rem; font-weight: 500; }
        .tag-remove { cursor: pointer; color: #6c757d; font-size: 0.7rem; line-height: 1; background: none; border: none; padding: 0; }
        .serp-preview { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 14px 16px; margin-top: 12px; }
        .serp-title { color: #1a0dab; font-size: 1rem; font-weight: 400; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .serp-url { color: #006621; font-size: 0.78rem; margin-bottom: 4px; }
        .serp-desc { color: #545454; font-size: 0.82rem; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .stat-item { display: flex; flex-direction: column; align-items: center; padding: 10px 6px; border-radius: 8px; background: #f8f9fa; }
        .stat-value { font-size: 1.25rem; font-weight: 700; color: #1e3a5f; line-height: 1; }
        .stat-label { font-size: 0.68rem; color: #6c757d; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 4px; }
        .autosave-indicator { font-size: 0.75rem; color: #6c757d; display: flex; align-items: center; gap: 4px; }
        .img-preview { max-width: 100%; border-radius: 8px; border: 1px solid #e9ecef; margin-top: 10px; }
        .seo-score-bar { height: 4px; border-radius: 2px; margin-top: 6px; transition: width 0.3s; }
        .char-counter { font-size: 0.72rem; color: #6c757d; text-align: right; margin-top: 3px; }
        .char-counter.warn { color: #fd7e14; }
        .char-counter.over { color: #dc3545; }
        .tab-nav { display: flex; gap: 4px; padding: 4px; background: #f8f9fa; border-radius: 8px; }
        .tab-btn { flex: 1; padding: 6px 12px; border: none; background: none; border-radius: 6px; font-size: 0.8rem; font-weight: 500; color: #6c757d; cursor: pointer; transition: all 0.15s; }
        .tab-btn.active { background: #fff; color: #1e3a5f; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      `}</style>

      {/* Page Header */}
      <div className="page-header d-flex justify-content-between align-items-start">
        <div>
          <Link href="/admin/blogs" className="text-muted small text-decoration-none d-inline-flex align-items-center gap-1 mb-1">
            <i className="bi bi-arrow-left" /> Blog Posts
          </Link>
          <h1 className="h4 fw-bold mb-0" style={{ color: '#1e3a5f' }}>New Blog Post</h1>
        </div>
        <div className="d-flex align-items-center gap-2">
          {autoSaveStatus !== 'idle' && (
            <span className="autosave-indicator">
              {autoSaveStatus === 'saving' ? <><span className="spinner-border spinner-border-sm" /> Saving…</> : <><i className="bi bi-check-circle-fill text-success" /> Draft saved</>}
            </span>
          )}
          <button className="btn btn-outline-secondary btn-sm" onClick={() => { saveDraft(); setAutoSaveStatus('saved'); }}>
            <i className="bi bi-floppy me-1" /> Save Draft
          </button>
          <button className="btn btn-sm text-white" style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }} disabled={saving} onClick={() => handleSubmit(true)}>
            {saving ? <span className="spinner-border spinner-border-sm me-1" /> : <i className="bi bi-send me-1" />}
            Publish
          </button>
        </div>
      </div>

      {draftRestored && (
        <div className="alert alert-info alert-dismissible small py-2 d-flex align-items-center gap-2" role="alert">
          <i className="bi bi-info-circle-fill" />
          Unsaved draft restored from your last session.
          <button type="button" className="btn-close btn-sm ms-auto" style={{ fontSize: '0.7rem' }} onClick={() => { localStorage.removeItem(DRAFT_KEY); setDraftRestored(false); }} aria-label="Dismiss" />
        </div>
      )}

      {error && (
        <div className="alert alert-danger small d-flex align-items-center gap-2">
          <i className="bi bi-exclamation-triangle-fill" /> {error}
        </div>
      )}

      {/* Tab navigation (mobile) */}
      <div className="d-lg-none mb-3">
        <div className="tab-nav">
          {(['write', 'seo', 'preview'] as const).map((tab) => (
            <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-3">
        {/* ── Main Column ── */}
        <div className={`col-lg-8${activeTab !== 'write' ? ' d-none d-lg-block' : ''}`}>

          {/* Title + Slug */}
          <div className="section-card">
            <div className="section-card-body">
              <input
                type="text"
                className="title-input form-control-plaintext mb-3"
                placeholder="Post title…"
                value={rectitle}
                onChange={(e) => setRectitle(e.target.value)}
              />
              <div className="slug-bar">
                <span style={{ color: '#adb5bd' }}>/blog/</span>
                <input
                  className="slug-edit"
                  value={slug}
                  onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }}
                  placeholder="url-slug"
                />
                {slugManual && (
                  <button className="btn btn-link btn-sm p-0 text-muted" title="Regenerate from title" onClick={() => { setSlugManual(false); setSlug(slugify(rectitle)); }}>
                    <i className="bi bi-arrow-clockwise" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">Excerpt / Summary</span>
            </div>
            <div className="section-card-body">
              <textarea
                className="form-control"
                rows={2}
                placeholder="Short description shown in listing cards and meta previews…"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                style={{ resize: 'none', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="section-card">
            <div className="section-card-header">
              <span className="section-card-title">Content</span>
              <span className="d-flex align-items-center gap-2" style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                <span style={{ color: readability.color, fontWeight: 600 }}>{readability.label}</span>
                <span>·</span>
                <span>{stats.words.toLocaleString()} words</span>
              </span>
            </div>
            <div className="section-card-body p-0">
              <RichTextEditor
                value={recdesc}
                onChange={setRecdesc}
                onStatsChange={setStats}
                placeholder="Start writing… Use the toolbar above or type / for quick commands"
                minHeight={500}
              />
            </div>
          </div>

          {/* SEO Card */}
          <div className={`section-card${activeTab === 'seo' ? '' : ' d-none d-lg-block'}`}>
            <div className="section-card-header">
              <span className="section-card-title">SEO Settings</span>
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: '0.75rem', color: seoColor, fontWeight: 600 }}>Score {seoScore}/100</span>
                <div style={{ width: 60, height: 4, background: '#e9ecef', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${seoScore}%`, height: '100%', background: seoColor, borderRadius: 2, transition: 'width 0.3s' }} />
                </div>
              </div>
            </div>
            <div className="section-card-body">
              <div className="mb-3">
                <label className="form-label small fw-semibold">Meta Title <span className="text-muted fw-normal">(leave blank to use post title)</span></label>
                <input type="text" className="form-control form-control-sm" value={rectitle} readOnly style={{ background: '#f8f9fa', color: '#495057', fontSize: '0.85rem' }} />
                <div className={`char-counter${rectitle.length > 60 ? ' over' : rectitle.length > 50 ? ' warn' : ''}`}>{rectitle.length}/60</div>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Meta Description</label>
                <textarea className="form-control form-control-sm" rows={2} value={metadesc} onChange={(e) => setMetadesc(e.target.value)} maxLength={160} placeholder="Compelling description for search results (50–160 chars)" style={{ resize: 'none', fontSize: '0.85rem' }} />
                <div className={`char-counter${metadesc.length > 160 ? ' over' : metadesc.length > 145 ? ' warn' : ''}`}>{metadesc.length}/160</div>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Focus Keywords</label>
                <input type="text" className="form-control form-control-sm" value={metakeyw} onChange={(e) => setMetakeyw(e.target.value)} placeholder="gdpr, compliance, data protection" />
              </div>

              {/* SERP Preview */}
              <label className="form-label small fw-semibold">Search Result Preview</label>
              <div className="serp-preview">
                <div className="serp-title">{rectitle || 'Your post title'}</div>
                <div className="serp-url">https://www.gdprconsultants.in/blog/{slug || 'your-post-slug'}/</div>
                <div className="serp-desc">{metadesc || summary || 'Add a meta description to control how your post appears in search results.'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className={`col-lg-4${activeTab === 'write' ? ' d-none d-lg-block' : ''}`}>
          <div className="sticky-sidebar">

            {/* Publish Card */}
            <div className="section-card">
              <div className="section-card-header">
                <span className="section-card-title">Publish</span>
                <span className={`status-pill ${status ? 'published' : 'draft'}`}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: status ? '#198754' : '#6c757d', display: 'inline-block' }} />
                  {status ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="section-card-body">
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Status</label>
                  <div className="d-flex gap-2">
                    {[{ label: 'Draft', value: false }, { label: 'Published', value: true }].map(({ label, value }) => (
                      <button key={label} type="button" className={`btn btn-sm flex-fill${status === value ? ' btn-primary' : ' btn-outline-secondary'}`}
                        style={status === value ? { background: '#1e3a5f', borderColor: '#1e3a5f' } : {}}
                        onClick={() => setStatus(value)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="is_featured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                  <label className="form-check-label small" htmlFor="is_featured">
                    <i className="bi bi-star me-1 text-warning" />Featured post
                  </label>
                </div>
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn-primary" disabled={saving} style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }} onClick={() => handleSubmit(true)}>
                    {saving ? <><span className="spinner-border spinner-border-sm me-1" />Saving…</> : <><i className="bi bi-send me-1" />Publish Now</>}
                  </button>
                  <button type="button" className="btn btn-outline-secondary" disabled={saving} onClick={() => handleSubmit(false)}>
                    <i className="bi bi-floppy me-1" />Save as Draft
                  </button>
                  <Link href="/admin/blogs" className="btn btn-link text-muted btn-sm text-decoration-none">Cancel</Link>
                </div>
              </div>
            </div>

            {/* Post Details */}
            <div className="section-card">
              <div className="section-card-header">
                <span className="section-card-title">Post Details</span>
              </div>
              <div className="section-card-body">
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Category</label>
                  <select className="form-select form-select-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Author</label>
                  <input type="text" className="form-control form-control-sm" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="mb-0">
                  <label className="form-label small fw-semibold">Tags</label>
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {tags.map((tag) => (
                      <span key={tag} className="tag-badge">
                        {tag}
                        <button className="tag-remove" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>✕</button>
                      </span>
                    ))}
                  </div>
                  <div className="input-group input-group-sm">
                    <input type="text" className="form-control" placeholder="Add tag…" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } }} />
                    <button className="btn btn-outline-secondary" type="button" onClick={addTag}>+</button>
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.7rem', marginTop: 4 }}>Press Enter or comma to add</div>
                </div>
              </div>
            </div>

            {/* Content Stats */}
            <div className="section-card">
              <div className="section-card-header">
                <span className="section-card-title">Content Statistics</span>
              </div>
              <div className="section-card-body">
                <div className="row g-2">
                  {[
                    { label: 'Words', value: stats.words.toLocaleString() },
                    { label: 'Chars', value: stats.characters.toLocaleString() },
                    { label: 'Paragraphs', value: stats.paragraphs },
                    { label: 'Headings', value: stats.headings },
                  ].map(({ label, value }) => (
                    <div key={label} className="col-6">
                      <div className="stat-item">
                        <span className="stat-value">{value}</span>
                        <span className="stat-label">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 rounded" style={{ background: '#f0f4f8', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e3a5f' }}>{stats.readingTime} min</div>
                  <div style={{ fontSize: '0.72rem', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estimated Read Time</div>
                </div>
                <div className="mt-2 d-flex align-items-center justify-content-between">
                  <span style={{ fontSize: '0.75rem', color: '#6c757d' }}>Readability</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: readability.color }}>{readability.label}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="section-card">
              <div className="section-card-header">
                <span className="section-card-title">Featured Image</span>
              </div>
              <div className="section-card-body">
                {recimg && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={recimg} alt={imgalt || 'Preview'} className="img-preview d-block mb-3" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
                <div className="mb-2">
                  <label className="form-label small fw-semibold">Image URL</label>
                  <input type="url" className="form-control form-control-sm" value={recimg} onChange={(e) => setRecimg(e.target.value)} placeholder="https://example.com/image.jpg" />
                </div>
                <div>
                  <label className="form-label small fw-semibold">Alt Text</label>
                  <input type="text" className="form-control form-control-sm" value={imgalt} onChange={(e) => setImgalt(e.target.value)} placeholder="Describe the image" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
