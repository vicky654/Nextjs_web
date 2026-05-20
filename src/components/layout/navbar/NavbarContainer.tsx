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
        /* Fixed transparent shell — provides the floating gap above the pill */
        .nav-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          padding: 12px 16px 0;
        }

        /*
         * The visible floating pill.
         * - NO backdrop-filter (it creates a CSS stacking context that
         *   traps dropdown z-indices, causing overlap)
         * - Explicit height:60px so <li> children can use height:100%
         *   reliably without needing the fragile align-self:stretch chain
         * - position:relative is the containing block for mega menu only;
         *   individual dropdowns use the <li> as their containing block
         */
        .nav-pill {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 0 8px 0 24px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 9999px;
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.04),
            0 4px 16px rgba(0, 0, 0, 0.07);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .nav-pill--scrolled {
          border-color: #d1d5db;
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.06),
            0 8px 24px rgba(0, 0, 0, 0.09);
        }

        @media (max-width: 1280px) {
          .nav-shell {
            padding: 12px 12px 0;
          }
        }

        @media (max-width: 640px) {
          .nav-shell {
            padding: 8px 10px 0;
          }
          .nav-pill {
            height: 54px;
            padding: 0 6px 0 16px;
          }
        }
      `}</style>
    </header>
  );
}
