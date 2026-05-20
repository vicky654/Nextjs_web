'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, Globe, FileCheck, ChevronRight } from 'lucide-react';

const FLOATING_ICONS = [
  { icon: Shield, label: 'GDPR', top: '20%', right: '8%', delay: 0 },
  { icon: Lock, label: 'DPDP', top: '50%', right: '2%', delay: 0.4 },
  { icon: Globe, label: 'Global', top: '70%', right: '12%', delay: 0.8 },
  { icon: FileCheck, label: 'Comply', top: '35%', right: '22%', delay: 1.2 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--hp-gradient-hero)', paddingTop: 80 }}>

      {/* Background grid pattern */}
      <div className="hp-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Gradient orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '15%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>

          {/* Left: Text content */}
          <div style={{ maxWidth: 720 }}>

            {/* Trust badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 100, padding: '6px 16px', marginBottom: '1.75rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
              <span style={{ color: '#94b3ff', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em' }}>Trusted by 500+ businesses worldwide</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Secure Your Business{' '}
              <br className="d-none d-md-block" />
              With Expert{' '}
              <span className="hp-gradient-text">Privacy Consulting</span>
            </motion.h1>

            {/* Description */}
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: '1.15rem', lineHeight: 1.75, color: 'var(--hp-text-muted)', marginBottom: '2.5rem', maxWidth: 580 }}>
              We help organizations navigate the complex landscape of data protection regulations including DPDP Act and GDPR. Our expert team ensures your business stays compliant while focusing on growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <Link href="/contact-us/"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#3b82f6', color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 8px 32px rgba(59,130,246,0.35)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(59,130,246,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.35)'; }}>
                Get Started <ArrowRight size={18} />
              </Link>
              <Link href="/services/"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}>
                Our Services <ChevronRight size={16} />
              </Link>
            </motion.div>

            {/* Quick stats row */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {[
                { value: '500+', label: 'Clients Served' },
                { value: '98%', label: 'Success Rate' },
                { value: '10+', label: 'Years Experience' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--hp-text-muted)', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Shield illustration (hidden on small screens) */}
          <div style={{ position: 'relative', width: 280, flexShrink: 0, display: 'none' }} className="hp-hero-illustration">
            {/* Central shield */}
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 180, height: 200, margin: '0 auto', background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(6,182,212,0.15))', border: '2px solid rgba(59,130,246,0.4)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 60px rgba(59,130,246,0.2)', backdropFilter: 'blur(10px)' }}>
              <Shield size={72} style={{ color: '#60a5fa', opacity: 0.9 }} />
            </motion.div>

            {/* Floating icons */}
            {FLOATING_ICONS.map(({ icon: Icon, label, top, right, delay }) => (
              <motion.div key={label} animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
                style={{ position: 'absolute', top, right, background: 'rgba(30,58,95,0.8)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, backdropFilter: 'blur(10px)' }}>
                <Icon size={16} style={{ color: '#60a5fa' }} />
                <span style={{ color: '#e2e8f0', fontSize: '0.75rem', fontWeight: 600 }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, transparent, var(--hp-dark-surface))' }} />

      <style jsx>{`
        @media (min-width: 992px) {
          .hp-hero-illustration { display: block !important; }
        }
      `}</style>
    </section>
  );
}
