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
      {/* Slide-down + fade-in on initial page load. Runs once — the
          navbar lives in root layout so it only mounts on first visit. */}
      <motion.div
        className={`nav-pill${scrolled ? ' nav-pill--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      <style jsx>{`
        .nav-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          padding: 12px 16px 0;
        }

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
          transition:
            box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        .nav-pill--scrolled {
          border-color: #d1d5db;
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.06),
            0 12px 32px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 1280px) {
          .nav-shell { padding: 12px 12px 0; }
        }
        @media (max-width: 640px) {
          .nav-shell { padding: 8px 10px 0; }
          .nav-pill { height: 54px; padding: 0 6px 0 16px; }
        }
      `}</style>
    </header>
  );
}
