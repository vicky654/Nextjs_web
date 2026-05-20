'use client';
import Link from 'next/link';

export default function NavbarCTA() {
  return (
    <Link href="/contact-us/" className="nav-cta" aria-label="Get started – contact us">
      Get Started
      <style jsx>{`
        .nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 22px;
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 8px;
          letter-spacing: 0.01em;
          transition: box-shadow 0.22s ease, transform 0.18s ease;
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          white-space: nowrap;
          outline: none;
          position: relative;
          z-index: 0;
        }
        .nav-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%);
          opacity: 0;
          transition: opacity 0.22s ease;
          z-index: -1;
        }
        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(59, 130, 246, 0.45);
          color: #ffffff;
        }
        .nav-cta:hover::before {
          opacity: 1;
        }
        .nav-cta:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }
        .nav-cta:focus-visible {
          outline: 2px solid rgba(59, 130, 246, 0.7);
          outline-offset: 3px;
        }
      `}</style>
    </Link>
  );
}
