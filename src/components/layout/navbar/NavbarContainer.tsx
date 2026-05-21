'use client';
import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

interface NavbarContainerProps {
  scrolled: boolean;
  hidden: boolean;
  children: ReactNode;
}

export default function NavbarContainer({ scrolled, hidden, children }: NavbarContainerProps) {
  const shellStyle: CSSProperties = {
    position: 'fixed',
    top: 16,
    left: 0,
    right: 0,
    zIndex: 999,
    padding: '0 20px',
  };

  const pillStyle: CSSProperties = {
    /* Layout */
    position: 'relative',
    maxWidth: 1200,
    margin: '0 auto',
    height: 62,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    padding: '0 16px 0 28px',
    /* Visual */
    background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)',
    border: `1px solid ${scrolled ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: 9999,
    boxShadow: scrolled
      ? '0 4px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.1), 0 32px 64px rgba(0,0,0,0.05)'
      : '0 1px 3px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.07)',
    transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
    willChange: 'transform, opacity',
  };

  return (
    <header style={shellStyle} role="banner">
      <motion.div
        className="nav-glass-pill"
        style={pillStyle}
        initial={{ y: -80, opacity: 0, scale: 0.97 }}
        animate={hidden ? { y: -110, opacity: 0, scale: 0.97 } : { y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: hidden ? 0.3 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      <style jsx global>{`
        .nav-glass-pill {
          box-sizing: border-box;
        }
        /* Backdrop blur on ::before keeps stacking context off the pill,
           so dropdown z-indices remain unrestricted. */
        .nav-glass-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          z-index: -1;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          header[role="banner"] {
            top: 10px !important;
            padding: 0 12px !important;
          }
          .nav-glass-pill {
            height: 54px !important;
            padding: 0 10px 0 18px !important;
          }
        }
      `}</style>
    </header>
  );
}
