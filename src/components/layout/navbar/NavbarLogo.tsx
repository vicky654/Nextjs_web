'use client';
import Link from 'next/link';

export default function NavbarLogo() {
  return (
    <Link href="/" className="nav-logo" aria-label="DPDP Consultants – Home">
      <div className="nav-logo__icon">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="18" cy="18" r="17" stroke="url(#lg1)" strokeWidth="2" />
          <path d="M9 13h7c2.8 0 5 2.2 5 5s-2.2 5-5 5H9V13z" fill="url(#lg1)" />
          <rect x="23" y="13" width="4" height="10" rx="1" fill="url(#lg1)" opacity="0.55" />
          <defs>
            <linearGradient id="lg1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="nav-logo__text">
        <span className="nav-logo__brand">DPDP</span>
        <span className="nav-logo__sub">Consultants</span>
      </div>
      <style jsx>{`
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
          outline: none;
        }
        .nav-logo:focus-visible {
          outline: 2px solid rgba(59, 130, 246, 0.7);
          border-radius: 6px;
        }
        .nav-logo__icon {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-logo__icon svg {
          width: 100%;
          height: 100%;
        }
        .nav-logo__text {
          display: flex;
          flex-direction: column;
          line-height: 1;
          gap: 3px;
        }
        .nav-logo__brand {
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-logo__sub {
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }
      `}</style>
    </Link>
  );
}
