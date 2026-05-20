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
        /*
         * Transparent fixed shell — creates the floating gap above the pill.
         * The shell itself has NO background and NO backdrop-filter so that
         * it does not create a stacking context. Stacking contexts on the
         * pill container would trap dropdown z-indices inside them.
         */
        .nav-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          padding: 14px 20px 0;
        }

        /*
         * The visible pill.
         * IMPORTANT: No backdrop-filter here — it would create a stacking
         * context that confines child dropdown z-indices.
         * The frosted look comes from a semi-opaque white + box-shadow.
         */
        .nav-pill {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          height: 60px;
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          gap: 8px;
          padding: 0 8px 0 20px;
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.04),
            0 4px 16px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          transition:
            box-shadow 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease;
        }

        .nav-pill--scrolled {
          background: #ffffff;
          border-color: rgba(0, 0, 0, 0.1);
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.06),
            0 8px 28px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 1280px) {
          .nav-shell {
            padding: 12px 16px 0;
          }
        }

        @media (max-width: 640px) {
          .nav-shell {
            padding: 8px 10px 0;
          }
          .nav-pill {
            height: 54px;
            padding: 0 6px 0 14px;
            gap: 4px;
          }
        }
      `}</style>
    </header>
  );
}
