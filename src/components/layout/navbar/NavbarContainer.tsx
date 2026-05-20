'use client';
import type { ReactNode } from 'react';

interface NavbarContainerProps {
  scrolled: boolean;
  children: ReactNode;
}

export default function NavbarContainer({ scrolled, children }: NavbarContainerProps) {
  return (
    <header className="nav-shell" role="banner">
      <div className={`nav-pill${scrolled ? ' nav-pill--scrolled' : ''}`}>
        {children}
      </div>

      <style jsx>{`
        /* Transparent fixed shell — creates the gap above the pill */
        .nav-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          padding: 14px 20px 0;
        }

        /* The actual floating pill */
        .nav-pill {
          max-width: 1200px;
          margin: 0 auto;
          height: 60px;
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          gap: 4px;
          padding: 0 8px 0 20px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.05),
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 0 0 0.5px rgba(255, 255, 255, 0.9) inset;
          transition:
            box-shadow 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease;
        }

        .nav-pill--scrolled {
          background: rgba(255, 255, 255, 0.97);
          border-color: rgba(0, 0, 0, 0.1);
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.07),
            0 12px 40px rgba(0, 0, 0, 0.1),
            0 0 0 0.5px rgba(255, 255, 255, 0.9) inset;
        }

        @media (max-width: 1023px) {
          .nav-shell {
            padding: 10px 14px 0;
          }
        }

        @media (max-width: 640px) {
          .nav-shell {
            padding: 8px 10px 0;
          }
          .nav-pill {
            height: 54px;
            padding: 0 6px 0 14px;
          }
        }
      `}</style>
    </header>
  );
}
