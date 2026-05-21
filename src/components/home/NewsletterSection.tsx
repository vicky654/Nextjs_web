'use client';
import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <section style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1e3a5f 50%, #0d2137 100%)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="hp-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 1.5rem', position: 'relative', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Mail size={24} style={{ color: '#60a5fa' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#fff', marginBottom: '0.875rem', letterSpacing: '-0.02em' }}>
            Stay Ahead of Compliance
          </h2>
          <p style={{ color: 'var(--hp-text-muted)', marginBottom: '2rem', lineHeight: 1.65 }}>
            Get expert insights on DPDP Act updates, GDPR changes, and compliance strategies delivered to your inbox.
          </p>
          {done ? (
            <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, padding: '1rem 2rem', color: '#34d399', fontWeight: 600 }}>
              You&apos;re subscribed! Welcome aboard.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, maxWidth: 460, margin: '0 auto' }}>
              <input type="email" required placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
                onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }} />
              <button type="submit"
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#3b82f6', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: 10, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          )}
          <p style={{ fontSize: '0.75rem', color: 'var(--hp-text-dim)', marginTop: '1rem' }}>
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
