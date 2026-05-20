'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { NavConfigItem } from '@/config/navigation';

interface NavbarDropdownProps {
  items: NavConfigItem[];
}

const variants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function NavbarDropdown({ items }: NavbarDropdownProps) {
  return (
    <motion.div
      className="nav-dd"
      role="menu"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="nav-dd__item"
            role="menuitem"
          >
            {Icon && (
              <span className="nav-dd__icon" aria-hidden="true">
                <Icon size={15} strokeWidth={1.8} />
              </span>
            )}
            <span className="nav-dd__body">
              <span className="nav-dd__label">{item.label}</span>
              {item.description && (
                <span className="nav-dd__desc">{item.description}</span>
              )}
            </span>
          </Link>
        );
      })}
      <style jsx>{`
        /* Positioned relative to the <li> which now fills the full header height */
        .nav-dd {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 320px;
          background: rgba(6, 11, 26, 0.99);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          padding: 6px;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.6),
            0 4px 16px rgba(0, 0, 0, 0.4),
            inset 0 0 0 1px rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 1001;
          overflow: visible;
        }
        .nav-dd__item {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 10px 12px;
          border-radius: 9px;
          text-decoration: none;
          transition: background 0.13s ease;
          outline: none;
        }
        .nav-dd__item:hover {
          background: rgba(59, 130, 246, 0.09);
        }
        .nav-dd__item:focus-visible {
          background: rgba(59, 130, 246, 0.12);
        }
        .nav-dd__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(59, 130, 246, 0.12);
          color: #60a5fa;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .nav-dd__body {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }
        .nav-dd__label {
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.3;
        }
        .nav-dd__desc {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.38);
          line-height: 1.4;
        }
      `}</style>
    </motion.div>
  );
}
