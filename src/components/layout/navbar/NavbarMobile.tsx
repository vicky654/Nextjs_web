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
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <motion.line
          x1="0"
          y1="1"
          x2="22"
          y2="1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          animate={isOpen ? { rotate: 45, y: 7, x: 0 } : { rotate: 0, y: 0, x: 0 }}
          style={{ transformOrigin: '11px 1px' }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.line
          x1="0"
          y1="8"
          x2="22"
          y2="8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          animate={isOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        <motion.line
          x1="0"
          y1="15"
          x2="22"
          y2="15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          style={{ transformOrigin: '11px 15px' }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <style jsx>{`
        .nav-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 9px;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.85);
          transition: background 0.15s ease, border-color 0.15s ease;
          outline: none;
          flex-shrink: 0;
        }
        .nav-hamburger:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }
        .nav-hamburger:focus-visible {
          outline: 2px solid rgba(59, 130, 246, 0.6);
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
