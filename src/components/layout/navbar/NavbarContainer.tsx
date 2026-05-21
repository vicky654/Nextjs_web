'use client';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface NavbarContainerProps {
  scrolled: boolean;
  children: ReactNode;
}

export default function NavbarContainer({ scrolled, children }: NavbarContainerProps) {
  return (
    <header className="nav-shell" role="banner">
      <motion.div
        className={`nav-pill${scrolled ? ' nav-pill--scrolled' : ''}`}
        initial={{ y: -72, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      <style jsx>{`
        /* Floating shell — sits 16px from viewport top, full-width */
        .nav-shell {
          position: fixed;
          top: 16px;
          left: 0;
          right: 0;
          z-index: 999;
          padding: 0 16px;
        }

        .nav-pill {
          position: relative;
          max-width: 1152px;
          margin: 0 auto;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
          padding: 0 6px 0 22px;

          /* Slightly translucent white — real glass shows through */
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.04),
            0 2px 8px rgba(0, 0, 0, 0.05),
            0 8px 24px rgba(0, 0, 0, 0.06);

          transition:
            box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        /*
         * Backdrop blur lives on ::before instead of the pill itself.
         * If backdrop-filter were on the pill, it would create a new stacking
         * context and trap dropdown z-indices inside it.
         * On ::before, only the pseudo-element creates the stacking context —
         * the pill's real children (dropdowns) remain unaffected.
         */
        .nav-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          z-index: -1;
          pointer-events: none;
        }

        .nav-pill--scrolled {
          background: rgba(255, 255, 255, 0.97);
          border-color: rgba(0, 0, 0, 0.11);
          box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.05),
            0 8px 24px rgba(0, 0, 0, 0.09),
            0 24px 48px rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 1200px) {
          .nav-shell { padding: 0 12px; }
        }
        @media (max-width: 640px) {
          .nav-shell { top: 10px; padding: 0 10px; }
          .nav-pill { height: 48px; padding: 0 4px 0 14px; gap: 0; }
        }
      `}</style>
    </header>
  );
}
