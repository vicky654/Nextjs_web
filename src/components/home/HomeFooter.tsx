'use client';
import Link from 'next/link';
import { COMPANY_INFO, FOOTER_LINKS } from '@/lib/constants';
import { Linkedin, Twitter, Mail, Shield, Phone, MapPin } from 'lucide-react';

export default function HomeFooter() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#060d18', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }} className="hp-footer-grid">

          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: '1.25rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #1e3a5f, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Shield size={19} style={{ color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
                  <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>DPDP</span>
                  {' '}Consultants
                </div>
                <div style={{ fontSize: '0.6rem', color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Privacy & Compliance</div>
              </div>
            </Link>
            <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 280, marginBottom: '1.5rem' }}>
              {COMPANY_INFO.description}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { href: COMPANY_INFO.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: COMPANY_INFO.twitter, icon: Twitter, label: 'Twitter' },
                { href: `mailto:${COMPANY_INFO.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="footer-social-btn">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-nav-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-nav-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={`mailto:${COMPANY_INFO.email}`} className="footer-contact-item">
                <Mail size={14} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <a href={`tel:${COMPANY_INFO.phone}`} className="footer-contact-item">
                <Phone size={14} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <div className="footer-contact-item" style={{ cursor: 'default' }}>
                <MapPin size={14} style={{ color: '#3b82f6', flexShrink: 0, marginTop: 2 }} />
                <span style={{ lineHeight: 1.5 }}>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ color: '#334155', fontSize: '0.8rem' }}>
            © {year} DPDP Consultants. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.href} href={link.href} className="footer-legal-link">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-nav-link {
          color: #475569;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
          display: block;
        }
        .footer-nav-link:hover { color: #e2e8f0; }

        .footer-social-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .footer-social-btn:hover {
          background: rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.3);
          color: #60a5fa;
        }

        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: #475569;
          font-size: 0.84rem;
          text-decoration: none;
          transition: color 0.2s ease;
          line-height: 1.4;
        }
        .footer-contact-item:hover { color: #94a3b8; }

        .footer-legal-link {
          color: #334155;
          font-size: 0.8rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-legal-link:hover { color: #94a3b8; }

        @media (max-width: 1023px) {
          .hp-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .hp-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
