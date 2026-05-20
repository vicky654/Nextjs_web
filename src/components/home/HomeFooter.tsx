import Link from 'next/link';
import { COMPANY_INFO, FOOTER_LINKS } from '@/lib/constants';
import { Linkedin, Twitter, Mail, Shield } from 'lucide-react';

export default function HomeFooter() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#060d18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="hp-footer-grid">

          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: '1rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #1e3a5f, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={18} style={{ color: '#fff' }} />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                <span style={{ color: '#60a5fa' }}>DPDP</span> Consultants
              </span>
            </Link>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.65, maxWidth: 300, marginBottom: '1.5rem' }}>
              {COMPANY_INFO.description}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { href: COMPANY_INFO.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: COMPANY_INFO.twitter, icon: Twitter, label: 'Twitter' },
                { href: `mailto:${COMPANY_INFO.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  <Icon size={16} style={{ color: '#94a3b8' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}><Link href={link.href} style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}><Link href={link.href} style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#64748b', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Mail size={14} style={{ color: '#60a5fa' }} />{COMPANY_INFO.email}
              </a>
              <a href={`tel:${COMPANY_INFO.phone}`} style={{ color: '#64748b', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.8rem', color: '#60a5fa' }}>📞</span>{COMPANY_INFO.phone}
              </a>
              <span style={{ color: '#64748b', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ fontSize: '0.8rem', color: '#60a5fa', marginTop: 1 }}>📍</span>{COMPANY_INFO.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ color: '#475569', fontSize: '0.8rem' }}>
            © {year} DPDP Consultants. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.href} href={link.href} style={{ color: '#475569', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}>{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
