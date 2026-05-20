'use client';
import { motion } from 'framer-motion';

interface NavbarMobileProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function NavbarMobile({ isOpen, onToggle }: NavbarMobileProps) {
  return (
    <button
      className="nav-hamburger"
      onClick={onToggle}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu-drawer"
    >
      <svg
        width="20"
        height="14"
        viewBox="0 0 20 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.line
          x1="0"
          y1="1"
          x2="20"
          y2="1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          animate={isOpen ? { rotate: 45, y: 6, x: 0 } : { rotate: 0, y: 0, x: 0 }}
          style={{ transformOrigin: '10px 1px' }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.line
          x1="0"
          y1="7"
          x2="20"
          y2="7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          animate={isOpen ? { opacity: 0, x: 6 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        <motion.line
          x1="0"
          y1="13"
          x2="20"
          y2="13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          style={{ transformOrigin: '10px 13px' }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <style jsx>{`
        .nav-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          cursor: pointer;
          color: #475569;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
          outline: none;
          flex-shrink: 0;
          margin-right: 2px;
        }
        .nav-hamburger:hover {
          background: rgba(0, 0, 0, 0.08);
          border-color: rgba(0, 0, 0, 0.12);
          color: #0f172a;
        }
        .nav-hamburger:focus-visible {
          outline: 2px solid rgba(37, 99, 235, 0.5);
          outline-offset: 2px;
        }
        @media (max-width: 1023px) {
          .nav-hamburger {
            display: flex;
          }
        }
      `}</style>
    </button>
  );
}
