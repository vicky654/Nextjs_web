'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, Globe, FileCheck, ChevronRight } from 'lucide-react';

const FLOATING_ICONS = [
  { icon: Shield,    label: 'GDPR',   top: '20%', right: '8%',  delay: 0 },
  { icon: Lock,      label: 'DPDP',   top: '50%', right: '2%',  delay: 0.4 },
  { icon: Globe,     label: 'Global', top: '70%', right: '12%', delay: 0.8 },
  { icon: FileCheck, label: 'Comply', top: '35%', right: '22%', delay: 1.2 },
];

/* Apple-style: expo-out on enter, faster ease-in on exit */
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.11,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--hp-gradient-hero)',
        paddingTop: 86,
      }}
    >
      {/* Background grid */}
      <div className="hp-grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Ambient gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '10%', left: '5%',
          width: 520, height: 520,
          background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '10%', right: '15%',
          width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 1.5rem', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>

          {/* Left: Text content */}
          <div style={{ maxWidth: 720 }}>

            {/* Trust badge with pulsing live dot */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: 100, padding: '6px 16px', marginBottom: '1.75rem',
              }}
            >
              <span
                className="hp-live-dot"
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#10b981', display: 'inline-block',
                }}
              />
              <span style={{ color: '#94b3ff', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                Trusted by 500+ businesses worldwide
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', fontWeight: 900,
                lineHeight: 1.1, color: '#fff', marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              Secure Your Business{' '}
              <br className="d-none d-md-block" />
              With Expert{' '}
              <span className="hp-gradient-text">Privacy Consulting</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                fontSize: '1.15rem', lineHeight: 1.75,
                color: 'var(--hp-text-muted)', marginBottom: '2.5rem', maxWidth: 580,
              }}
            >
              We help organizations navigate the complex landscape of data protection
              regulations including DPDP Act and GDPR. Our expert team ensures your
              business stays compliant while focusing on growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: '3.5rem' }}
            >
              {/* Primary CTA with shine sweep */}
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link
                  href="/contact-us/"
                  className="hp-btn-primary"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: '#fff', padding: '14px 28px', borderRadius: 12,
                    fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                    boxShadow: '0 8px 32px rgba(59,130,246,0.35)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 14px 44px rgba(59,130,246,0.55)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.35)'; }}
                >
                  Get Started
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link
                  href="/services/"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.08)', color: '#fff',
                    padding: '14px 28px', borderRadius: 12,
                    fontWeight: 600, fontSize: '1rem', textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                    transition: 'background 0.25s ease, border-color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.13)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                >
                  Our Services <ChevronRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}
            >
              {[
                { value: '500+', label: 'Clients Served' },
                { value: '98%',  label: 'Success Rate' },
                { value: '10+',  label: 'Years Experience' },
              ].map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  style={{ cursor: 'default' }}
                >
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--hp-text-muted)', marginTop: 4 }}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Shield illustration */}
          <div style={{ position: 'relative', width: 280, flexShrink: 0, display: 'none' }} className="hp-hero-illustration">
            {/* Central shield — gentle bob */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.04 }}
              style={{
                width: 180, height: 200, margin: '0 auto',
                background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(6,182,212,0.15))',
                border: '2px solid rgba(59,130,246,0.4)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 60px rgba(59,130,246,0.2)',
                backdropFilter: 'blur(10px)',
                willChange: 'transform',
              }}
            >
              <Shield size={72} style={{ color: '#60a5fa', opacity: 0.9 }} />
            </motion.div>

            {/* Floating chip icons */}
            {FLOATING_ICONS.map(({ icon: Icon, label, top, right, delay }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay }}
                whileHover={{ scale: 1.06, borderColor: 'rgba(59,130,246,0.6)' }}
                style={{
                  position: 'absolute', top, right,
                  background: 'rgba(30,58,95,0.8)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  borderRadius: 12, padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: 6,
                  backdropFilter: 'blur(10px)',
                  willChange: 'transform',
                  transition: 'border-color 0.2s ease',
                  cursor: 'default',
                }}
              >
                <Icon size={16} style={{ color: '#60a5fa' }} />
                <span style={{ color: '#e2e8f0', fontSize: '0.75rem', fontWeight: 600 }}>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade to dark surface */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(to bottom, transparent, var(--hp-dark-surface))',
      }} />

      <style jsx>{`
        @media (min-width: 992px) {
          .hp-hero-illustration { display: block !important; }
        }
      `}</style>
    </section>
  );
}
