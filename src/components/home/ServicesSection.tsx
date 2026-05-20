'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Globe, ClipboardList, Users, MessageSquare, Cookie } from 'lucide-react';
import type { ComponentType, CSSProperties } from 'react';

// Map Bootstrap icon names to Lucide icons for the redesign
const ICON_MAP: Record<string, ComponentType<{ size?: number; style?: CSSProperties }>> = {
  'bi-shield-check': Shield,
  'bi-globe': Globe,
  'bi-clipboard-data': ClipboardList,
  'bi-people': Users,
  'bi-chat-dots': MessageSquare,
  'bi-cookie': Cookie,
};

const SERVICE_LINKS: Record<string, string> = {
  '1': '/Data-Protection-Impact-Assessment/',
  '2': '/services/',
  '3': '/Data-Protection-Impact-Assessment/',
  '4': '/Data-Protection-Third-Party-Processors-Assessment/',
  '5': '/Data-Subject-Rights-and-Grievance-Management/',
  '6': '/Cookie-Consent-Management/',
};

const CARD_COLORS = [
  { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.25)', icon: '#60a5fa' },
  { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.25)', icon: '#22d3ee' },
  { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)', icon: '#34d399' },
  { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', icon: '#a78bfa' },
  { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', icon: '#fbbf24' },
  { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)', icon: '#f87171' },
];

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section style={{ background: 'var(--hp-dark)', padding: 'var(--hp-section-gap) 0' }} className="hp-grid-bg">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="hp-section-badge">Our Services</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Comprehensive Data Protection Solutions
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--hp-text-muted)', maxWidth: 560, margin: '0 auto' }}>
            End-to-end consulting services to help your organization achieve and maintain compliance with data protection regulations.
          </p>
        </motion.div>

        {/* Service cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {services.map((service, i) => {
            const IconComp = ICON_MAP[service.icon] || Shield;
            const colors = CARD_COLORS[i % CARD_COLORS.length];
            const link = SERVICE_LINKS[service.id] || '/services/';
            return (
              <motion.div key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{
                  opacity: { delay: i * 0.07, duration: 0.6, ease: 'easeOut' },
                  y: { type: 'spring', stiffness: 350, damping: 22 },
                }}
                className="hp-glass-card"
                style={{ padding: '1.75rem' }}>

                {/* Icon */}
                <div style={{ width: 48, height: 48, borderRadius: 12, background: colors.bg, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <IconComp size={22} style={{ color: colors.icon }} />
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem' }}>{service.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--hp-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{service.description}</p>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {service.features.slice(0, 3).map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#94a3b8' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: colors.icon, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={link}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600, color: colors.icon, textDecoration: 'none', transition: 'gap 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '10px'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '6px'; }}>
                  Learn More <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/services/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.15)', color: '#e2e8f0', padding: '12px 28px', borderRadius: 10, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.color = '#60a5fa'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#e2e8f0'; }}>
            View All Services <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
