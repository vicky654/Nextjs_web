'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { id: '1', name: 'Priya Sharma', designation: 'Chief Privacy Officer', company: 'TechCorp India', quote: 'DPDP Consultants transformed our entire approach to data privacy. Their expertise in the new DPDP Act saved us months of confusion and helped us achieve compliance ahead of schedule.', rating: 5 },
  { id: '2', name: 'Marcus Weber', designation: 'DPO', company: 'European Media Group', quote: 'Best GDPR consulting team we have worked with. Professional, thorough, and genuinely invested in our compliance outcomes. They treated our challenges as their own.', rating: 5 },
  { id: '3', name: 'Ananya Krishnan', designation: 'VP Legal & Compliance', company: 'FinServe Startup', quote: 'Their expertise in DPDP Act compliance was exactly what we needed. The team guided us through every step with clarity and confidence. Highly recommended.', rating: 5 },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ background: 'var(--hp-dark)', padding: 'var(--hp-section-gap) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="hp-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="hp-section-badge">Testimonials</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
            What Our Clients Say
          </h2>
        </motion.div>

        <div style={{ position: 'relative', minHeight: 280 }}>
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="hp-glass-card"
              style={{ padding: '2.5rem 3rem', textAlign: 'center' }}>

              <Quote size={32} style={{ color: 'rgba(59,130,246,0.4)', margin: '0 auto 1.5rem' }} />

              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: '1.5rem' }}>
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <Star key={i} size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                ))}
              </div>

              <blockquote style={{ fontSize: '1.15rem', color: '#e2e8f0', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '2rem' }}>
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </blockquote>

              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{TESTIMONIALS[current].name}</div>
                <div style={{ color: '#60a5fa', fontSize: '0.85rem', marginTop: 2 }}>{TESTIMONIALS[current].designation}, {TESTIMONIALS[current].company}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: '2rem' }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Show testimonial ${i + 1}`}
              style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 100, border: 'none', background: i === current ? '#3b82f6' : 'rgba(255,255,255,0.2)', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
