'use client';
import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

interface NavbarContainerProps {
  scrolled: boolean;
  children: ReactNode;
}

export default function NavbarContainer({ scrolled, children }: NavbarContainerProps) {
  const shellStyle: CSSProperties = {
    position: 'fixed',
    top: 16,
    left: 0,
    right: 0,
    zIndex: 999,
    padding: '0 16px',
  };

  const pillStyle: CSSProperties = {
    /* Layout — inline so styled-jsx scoping can't break it */
    position: 'relative',
    maxWidth: 1152,
    margin: '0 auto',
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    padding: '0 6px 0 22px',
    /* Visual */
    background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.94)',
    border: `1px solid ${scrolled ? 'rgba(0,0,0,0.11)' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: 9999,
    boxShadow: scrolled
      ? '0 2px 4px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.09), 0 24px 48px rgba(0,0,0,0.05)'
      : '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
    transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
    willChange: 'transform, opacity',
  };

  return (
    <header style={shellStyle} role="banner">
      <motion.div
        className="nav-glass-pill"
        style={pillStyle}
        initial={{ y: -72, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/*
        ::before provides backdrop-blur without placing backdrop-filter on the pill
        itself (which would create a stacking context trapping dropdown z-indices).
        Global scope ensures it applies regardless of styled-jsx hash resolution.
      */}
      <style jsx global>{`
        .nav-glass-pill {
          box-sizing: border-box;
        }
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
            padding: 0 10px !important;
          }
          .nav-glass-pill {
            height: 48px !important;
            padding: 0 4px 0 14px !important;
          }
        }
      `}</style>
    </header>
  );
}
