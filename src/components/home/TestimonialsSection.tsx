'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Priya Sharma',
    designation: 'Chief Privacy Officer',
    company: 'TechCorp India',
    initial: 'P',
    color: '#3b82f6',
    quote: 'DPDP Consultants transformed our entire approach to data privacy. Their expertise in the new DPDP Act saved us months of confusion and helped us achieve compliance ahead of schedule.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Weber',
    designation: 'Data Protection Officer',
    company: 'European Media Group',
    initial: 'M',
    color: '#06b6d4',
    quote: 'Best GDPR consulting team we have worked with. Professional, thorough, and genuinely invested in our compliance outcomes. They treated our challenges as their own.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Ananya Krishnan',
    designation: 'VP Legal & Compliance',
    company: 'FinServe Startup',
    initial: 'A',
    color: '#10b981',
    quote: 'Their expertise in DPDP Act compliance was exactly what we needed. The team guided us through every step with clarity and confidence. Highly recommended for any organization.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((c) => (c + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActive((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section style={{ background: 'var(--hp-dark)', padding: 'var(--hp-section-gap) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="hp-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="hp-section-badge">Testimonials</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Trusted by Leading Organizations
          </h2>
          <p style={{ color: 'var(--hp-text-muted)', maxWidth: 500, margin: '0 auto' }}>
            See what compliance leaders say about working with us.
          </p>
        </motion.div>

        {/* Desktop: 3 cards */}
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(i)}
              style={{
                background: i === active ? 'rgba(59,130,246,0.08)' : 'var(--hp-glass)',
                border: `1px solid ${i === active ? 'rgba(59,130,246,0.4)' : 'var(--hp-border)'}`,
                borderRadius: 'var(--hp-radius)',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {i === active && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }} />
              )}

              <Quote size={24} style={{ color: i === active ? '#3b82f6' : 'rgba(255,255,255,0.15)', marginBottom: '1rem' }} />

              <div style={{ display: 'flex', gap: 2, marginBottom: '1rem' }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                ))}
              </div>

              <p style={{ fontSize: '0.9rem', color: i === active ? '#e2e8f0' : 'var(--hp-text-muted)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${t.color}22`, border: `2px solid ${t.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: t.color, flexShrink: 0 }}>
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem' }}>{t.name}</div>
                  <div style={{ color: '#60a5fa', fontSize: '0.75rem', marginTop: 1 }}>{t.designation}, {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: single + controls */}
        <div className="testi-mobile">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.4)',
              borderRadius: 'var(--hp-radius)',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }} />
            <Quote size={24} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
            <div style={{ display: 'flex', gap: 2, marginBottom: '1rem' }}>
              {Array.from({ length: TESTIMONIALS[active].rating }).map((_, j) => (
                <Star key={j} size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
              ))}
            </div>
            <p style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>
              &ldquo;{TESTIMONIALS[active].quote}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${TESTIMONIALS[active].color}22`, border: `2px solid ${TESTIMONIALS[active].color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: TESTIMONIALS[active].color, flexShrink: 0 }}>
                {TESTIMONIALS[active].initial}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem' }}>{TESTIMONIALS[active].name}</div>
                <div style={{ color: '#60a5fa', fontSize: '0.75rem', marginTop: 1 }}>{TESTIMONIALS[active].designation}, {TESTIMONIALS[active].company}</div>
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: '1.5rem' }}>
            <button onClick={prev} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              <ChevronLeft size={16} />
            </button>
            <div style={{ display: 'flex', gap: 6 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  style={{ width: i === active ? 20 : 6, height: 6, borderRadius: 100, border: 'none', background: i === active ? '#3b82f6' : 'rgba(255,255,255,0.2)', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
              ))}
            </div>
            <button onClick={next} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .testi-mobile { display: none; }
        @media (max-width: 1023px) {
          .testi-grid { display: none; }
          .testi-mobile { display: block; }
        }
      `}</style>
    </section>
  );
}
