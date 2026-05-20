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
          padding: 9px 20px;
          background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
          color: #ffffff;
          font-size: 0.845rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 9999px;
          letter-spacing: 0.01em;
          white-space: nowrap;
          outline: none;
          position: relative;
          z-index: 0;
          margin-right: 2px;
          box-shadow: 0 1px 6px rgba(37, 99, 235, 0.3), 0 4px 16px rgba(37, 99, 235, 0.2);
          transition: box-shadow 0.22s ease, transform 0.18s ease;
        }
        .nav-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
          opacity: 0;
          transition: opacity 0.22s ease;
          z-index: -1;
        }
        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4), 0 8px 24px rgba(37, 99, 235, 0.25);
          color: #ffffff;
        }
        .nav-cta:hover::before {
          opacity: 1;
        }
        .nav-cta:active {
          transform: translateY(0);
          box-shadow: 0 1px 6px rgba(37, 99, 235, 0.3);
        }
        .nav-cta:focus-visible {
          outline: 2px solid rgba(37, 99, 235, 0.6);
          outline-offset: 3px;
        }
      `}</style>
    </Link>
  );
}
