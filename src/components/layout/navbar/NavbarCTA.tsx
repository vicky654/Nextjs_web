'use client';
import Link from 'next/link';

export default function NavbarCTA() {
  return (
    <>
      <Link href="/contact-us/" className="nav-cta-btn" aria-label="Get started – contact us">
        Get Started
      </Link>

      {/* global so Turbopack applies it — scoped styled-jsx doesn't work with Turbopack */}
      <style jsx global>{`
        .nav-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff !important;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none !important;
          border-radius: 9999px;
          letter-spacing: 0.01em;
          white-space: nowrap;
          outline: none;
          position: relative;
          z-index: 0;
          margin-right: 4px;
          box-shadow: 0 1px 6px rgba(37,99,235,0.35), 0 4px 16px rgba(37,99,235,0.25);
          transition: box-shadow 0.22s ease, transform 0.18s ease, background 0.22s ease;
        }
        .nav-cta-btn:hover {
          transform: translateY(-1px);
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          box-shadow: 0 4px 12px rgba(37,99,235,0.45), 0 8px 28px rgba(37,99,235,0.3);
          color: #ffffff !important;
          text-decoration: none !important;
        }
        .nav-cta-btn:active {
          transform: translateY(0);
          box-shadow: 0 1px 6px rgba(37,99,235,0.3);
        }
        .nav-cta-btn:focus-visible {
          outline: 2px solid rgba(37,99,235,0.6);
          outline-offset: 3px;
        }
      `}</style>
    </>
  );
}
