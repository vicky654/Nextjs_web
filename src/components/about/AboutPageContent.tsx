'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CheckCircle2, Target, Eye, ShieldCheck, Globe2, Zap,
  BarChart3, Headphones, ArrowRight, Users, TrendingUp, Award, Calendar,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const STATS = [
  { icon: Users, value: '500+', label: 'Clients Served', desc: 'Organizations protected worldwide' },
  { icon: TrendingUp, value: '98%', label: 'Success Rate', desc: 'Compliance achieved on first attempt' },
  { icon: Award, value: '50+', label: 'Expert Consultants', desc: 'Certified privacy professionals' },
  { icon: Calendar, value: '10+', label: 'Years Experience', desc: 'Deep regulatory expertise' },
];

const VALUES = [
  { icon: ShieldCheck, title: 'Certified Expertise', desc: 'Internationally recognized certifications — CIPP, CIPM, CIPT — across our entire consulting team.' },
  { icon: Globe2, title: 'Global Coverage', desc: 'GDPR, DPDP Act, PDPA, PIPEDA, and 15+ international privacy frameworks covered.' },
  { icon: Zap, title: 'Fast Implementation', desc: 'Our proven frameworks accelerate timelines — full DPDP compliance in as little as 90 days.' },
  { icon: BarChart3, title: 'Data-Driven', desc: 'Automated tools and analytics identify compliance gaps and track real-time progress.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Dedicated account managers and round-the-clock support — you\'re never alone in compliance.' },
  { icon: CheckCircle2, title: 'Proven Track Record', desc: '500+ organizations guided to compliance across 20+ industries without a single regulatory penalty.' },
];

export default function AboutPageContent() {
  return (
    <main style={{ background: 'var(--hp-dark)' }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--hp-gradient-hero)',
        paddingTop: 'clamp(7rem, 12vw, 10rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hp-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.45 }} />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '20%', right: '10%', width: 440, height: 440, background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}
        />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <div className="hp-section-badge" style={{ marginBottom: '1.5rem' }}>Who We Are</div>
          </motion.div>
          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em', maxWidth: 720 }}
          >
            India&apos;s Leading{' '}
            <span className="hp-gradient-text">Data Protection</span>{' '}
            Experts
          </motion.h1>
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontSize: '1.15rem', color: 'var(--hp-text-muted)', lineHeight: 1.75, maxWidth: 580, marginBottom: '2.5rem' }}
          >
            We protect the data rights of millions — and the reputation of the organizations entrusted with it. GDPR, DPDP Act, and beyond.
          </motion.p>
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/services/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff', padding: '13px 26px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 32px rgba(59,130,246,0.35)' }}>
              Our Services <ArrowRight size={16} />
            </Link>
            <Link href="/contact-us/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '13px 26px', borderRadius: 12, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────── */}
      <section style={{ background: 'var(--hp-dark-surface)', padding: 'var(--hp-section-gap) 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hp-about-grid">
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <div className="hp-section-badge" style={{ marginBottom: '1.25rem' }}>Our Story</div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                A Decade of <span className="hp-gradient-text">Privacy Excellence</span>
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--hp-text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
                DPDP Consultants was founded with a clear mission: make world-class data protection accessible to every organization, regardless of size or industry.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--hp-text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Our team of certified privacy professionals, legal experts, and technology specialists delivers comprehensive, practical compliance solutions — from gap assessments to full regulatory implementation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['ISO 27001 Certified Processes', 'Dedicated DPO Services Available', 'Multi-jurisdiction Compliance', 'End-to-End Implementation Support'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle2 size={17} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual: compliance coverage card grid */}
            <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'GDPR', sub: 'European Union', color: '#3b82f6' },
                  { label: 'DPDP Act', sub: 'India 2023', color: '#06b6d4' },
                  { label: 'PDPA', sub: 'Thailand & Singapore', color: '#10b981' },
                  { label: 'PIPEDA', sub: 'Canada', color: '#8b5cf6' },
                  { label: 'CCPA', sub: 'California, USA', color: '#f59e0b' },
                  { label: '15+ More', sub: 'Global coverage', color: '#ef4444' },
                ].map(({ label, sub, color }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -4, borderColor: `${color}60` }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    style={{ background: 'var(--hp-glass)', border: '1px solid var(--hp-border)', borderRadius: 12, padding: '1.25rem', transition: 'border-color 0.2s' }}
                  >
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--hp-text-muted)' }}>{sub}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .hp-about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          }
        `}</style>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section style={{ background: 'var(--hp-dark)', padding: '5rem 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {STATS.map(({ icon: Icon, value, label, desc }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{ background: 'var(--hp-glass)', border: '1px solid var(--hp-border)', borderRadius: 'var(--hp-radius)', padding: '2rem', textAlign: 'center' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <Icon size={22} style={{ color: '#60a5fa' }} />
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.02em' }}>{value}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--hp-text-muted)' }}>{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission / Vision ─────────────────────────────────── */}
      <section style={{ background: 'var(--hp-dark-surface)', padding: 'var(--hp-section-gap) 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="hp-section-badge">Our Purpose</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              Mission &amp; Vision
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="hp-mv-grid">
            {[
              {
                icon: Target,
                color: '#3b82f6',
                label: 'Our Mission',
                text: 'To empower organizations with practical, effective data protection strategies that enable business growth while ensuring regulatory compliance — making privacy a competitive advantage, not a burden.',
              },
              {
                icon: Eye,
                color: '#06b6d4',
                label: 'Our Vision',
                text: 'To be the most trusted partner for organizations seeking world-class data protection standards — building a future where privacy is respected, enforceable, and embedded in every business decision.',
              },
            ].map(({ icon: Icon, color, label, text }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="hp-glass-card"
                style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Icon size={24} style={{ color }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.875rem' }}>{label}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--hp-text-muted)', lineHeight: 1.75, margin: 0 }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 640px) {
            .hp-mv-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section style={{ background: 'var(--hp-dark)', padding: 'var(--hp-section-gap) 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="hp-section-badge">Why Choose Us</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
              The Standard in <span className="hp-gradient-text">Privacy Compliance</span>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="hp-glass-card"
                style={{ padding: '1.75rem' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 11, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <Icon size={20} style={{ color: '#60a5fa' }} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.5rem' }}>{title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--hp-text-muted)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #0d1b2a 0%, #1e3a5f 50%, #0d2137 100%)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="hp-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Partner with DPDP Consultants
            </h2>
            <p style={{ color: 'var(--hp-text-muted)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Ready to strengthen your data protection framework? Let&apos;s discuss your compliance needs.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact-us/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 32px rgba(59,130,246,0.35)' }}>
                Contact Us <ArrowRight size={16} />
              </Link>
              <Link href="/services/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
