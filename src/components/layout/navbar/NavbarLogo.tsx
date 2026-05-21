'use client';
import Link from 'next/link';

export default function NavbarLogo() {
  return (
    <Link
      href="/"
      aria-label="DPDP Consultants – Home"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        textDecoration: 'none',
        flexShrink: 0,
        outline: 'none',
        lineHeight: 1,
      }}
    >
      {/* Icon */}
      <div style={{ width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="18" cy="18" r="17" stroke="url(#nlg1)" strokeWidth="2" />
          <path d="M9 13h7c2.8 0 5 2.2 5 5s-2.2 5-5 5H9V13z" fill="url(#nlg1)" />
          <rect x="23" y="13" width="4" height="10" rx="1" fill="url(#nlg1)" opacity="0.55" />
          <defs>
            <linearGradient id="nlg1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: 3 }}>
        <span style={{
          fontSize: '1.05rem',
          fontWeight: 800,
          letterSpacing: '0.07em',
          background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          DPDP
        </span>
        <span style={{
          fontSize: '0.57rem',
          fontWeight: 600,
          letterSpacing: '0.16em',
          color: '#64748b',
          textTransform: 'uppercase',
        }}>
          Consultants
        </span>
      </div>
    </Link>
  );
}
