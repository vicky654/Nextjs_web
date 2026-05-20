'use client';
import { motion } from 'framer-motion';
import { useState, type FormEvent, type CSSProperties } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError('Please fill in all required fields.'); return; }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setError(data.error ?? 'Something went wrong'); return; }
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
    } catch { setError('Network error. Please try again.'); }
    finally { setSubmitting(false); }
  };

  const inputStyle: CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 14px', color: '#e2e8f0', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit' };

  return (
    <section id="contact" style={{ background: 'var(--hp-dark)', padding: 'var(--hp-section-gap) 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="hp-section-badge">Contact Us</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            Ready to Get <span className="hp-gradient-text">Compliant?</span>
          </h2>
          <p style={{ color: 'var(--hp-text-muted)', maxWidth: 520, margin: '0.75rem auto 0' }}>
            Talk to our experts today. Free 30-minute consultation to assess your compliance needs.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3rem', alignItems: 'start' }} className="hp-contact-grid">

          {/* Left: Contact info */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {[
              { icon: Mail, label: 'Email Us', value: 'info@dpdpconsultants.com', href: 'mailto:info@dpdpconsultants.com' },
              { icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
              { icon: MapPin, label: 'Office', value: 'Mumbai, Maharashtra, India', href: '#' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', textDecoration: 'none', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(4px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateX(0)'; }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} style={{ color: '#60a5fa' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--hp-text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
                  <div style={{ color: '#e2e8f0', fontSize: '0.92rem', fontWeight: 500, marginTop: 2 }}>{value}</div>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="hp-glass-card" style={{ padding: '2rem' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle2 size={48} style={{ color: '#10b981', margin: '0 auto 1rem', display: 'block' }} />
                <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--hp-text-muted)' }}>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => setSuccess(false)} style={{ marginTop: '1.5rem', background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: '1.25rem', color: '#f87171', fontSize: '0.85rem' }}>{error}</div>}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '0.875rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Name *</label>
                    <input style={inputStyle} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Email *</label>
                    <input type="email" style={inputStyle} placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Phone</label>
                    <input type="tel" style={inputStyle} placeholder="+91 9876543210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Company</label>
                    <input style={inputStyle} placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                      onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
                  </div>
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>Message *</label>
                  <textarea rows={4} style={{ ...inputStyle, resize: 'none' }} placeholder="Tell us about your compliance needs…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
                </div>
                <button type="submit" disabled={submitting}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#3b82f6', color: '#fff', border: 'none', padding: '13px 28px', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, transition: 'all 0.2s', width: '100%', justifyContent: 'center' }}>
                  {submitting ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />Sending…</> : <><Send size={16} />Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) { .hp-contact-grid { grid-template-columns: 1fr !important; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
