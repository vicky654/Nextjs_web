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
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
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
        .nav-dd {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 300px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 6px;
          box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.04),
            0 16px 48px rgba(0, 0, 0, 0.1),
            0 32px 80px rgba(0, 0, 0, 0.06);
          z-index: 1001;
          overflow: visible;
        }
        .nav-dd__item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.12s ease;
          outline: none;
        }
        .nav-dd__item:hover {
          background: #f8fafc;
        }
        .nav-dd__item:focus-visible {
          background: #eff6ff;
          outline: 2px solid rgba(37, 99, 235, 0.35);
        }
        .nav-dd__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(37, 99, 235, 0.08);
          color: #2563eb;
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
          color: #111827;
          line-height: 1.3;
        }
        .nav-dd__item:hover .nav-dd__label {
          color: #2563eb;
        }
        .nav-dd__desc {
          font-size: 0.74rem;
          color: #6b7280;
          line-height: 1.4;
        }
      `}</style>
    </motion.div>
  );
}
