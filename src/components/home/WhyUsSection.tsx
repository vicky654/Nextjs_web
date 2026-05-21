'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Globe2, Headphones, BarChart3, ShieldCheck } from 'lucide-react';

const FEATURES = [
  { icon: ShieldCheck, title: 'Certified Expertise', desc: 'Our team holds internationally recognized data protection and privacy certifications (CIPP, CIPM, CIPT).' },
  { icon: Globe2, title: 'Global Compliance Coverage', desc: 'We cover GDPR, DPDP Act, PDPA, PIPEDA, and 15+ other international privacy frameworks.' },
  { icon: Zap, title: 'Fast Implementation', desc: 'Our proven frameworks accelerate compliance timelines — achieve full DPDP compliance in as little as 90 days.' },
  { icon: BarChart3, title: 'Data-Driven Approach', desc: 'We use automated tools and analytics to identify compliance gaps and track your progress in real time.' },
  { icon: Headphones, title: '24/7 Expert Support', desc: 'Dedicated account managers and around-the-clock support ensure you\'re never alone in your compliance journey.' },
  { icon: CheckCircle2, title: 'Proven Track Record', desc: 'Over 500 organizations across 20+ industries successfully guided to compliance without a single regulatory penalty.' },
];

export default function WhyUsSection() {
  return (
    <section style={{ background: 'var(--hp-dark-surface)', padding: 'var(--hp-section-gap) 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="hp-why-grid">

          {/* Left: heading + description */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }}>
            <div className="hp-section-badge">Why Choose Us</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              The Standard in{' '}
              <span className="hp-gradient-text">Privacy Compliance</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--hp-text-muted)', lineHeight: 1.75, marginBottom: '2rem' }}>
              We combine deep regulatory expertise with modern technology to deliver compliance solutions that are efficient, scalable, and built to last.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['ISO 27001 Certified Processes', 'Dedicated DPO Services Available', 'Multi-jurisdiction Compliance'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span style={{ color: '#cbd5e1', fontSize: '0.92rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: feature grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.08 }}
                className="hp-glass-card"
                style={{ padding: '1.25rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem' }}>
                  <Icon size={18} style={{ color: '#60a5fa' }} />
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.4rem' }}>{title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--hp-text-muted)', lineHeight: 1.55, margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .hp-why-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
