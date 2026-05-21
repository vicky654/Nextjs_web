'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { NavConfigItem } from '@/config/navigation';

interface NavbarMegaMenuProps {
  items: NavConfigItem[];
}

const variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function NavbarMegaMenu({ items }: NavbarMegaMenuProps) {
  const mid = Math.ceil(items.length / 2);
  const col1 = items.slice(0, mid);
  const col2 = items.slice(mid);

  return (
    <>
      <motion.div
        className="nav-mega"
        role="menu"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-mega-header">
          <span className="nav-mega-title">GDPR Topics</span>
          <span className="nav-mega-sub">Compliance guidance by industry &amp; subject area</span>
        </div>
        <div className="nav-mega-grid">
          {[col1, col2].map((col, ci) => (
            <div key={ci} className="nav-mega-col">
              {col.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-mega-item"
                    role="menuitem"
                  >
                    {Icon && (
                      <span className="nav-mega-icon" aria-hidden="true">
                        <Icon size={13} strokeWidth={1.8} />
                      </span>
                    )}
                    <span className="nav-mega-label">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>

      <style jsx global>{`
        .nav-mega {
          position: absolute;
          top: calc(100% + 10px);
          right: -20px;
          left: auto;
          width: 600px;
          max-width: calc(100vw - 32px);
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          overflow: hidden;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.04),
            0 20px 64px rgba(0,0,0,0.1),
            0 40px 100px rgba(0,0,0,0.06);
          z-index: 1001;
        }
        .nav-mega-header {
          padding: 14px 18px 12px;
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
        }
        .nav-mega-title {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2563eb;
        }
        .nav-mega-sub {
          display: block;
          font-size: 0.72rem;
          color: #6b7280;
          margin-top: 3px;
        }
        .nav-mega-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 8px 6px 10px;
        }
        .nav-mega-col { display: flex; flex-direction: column; }
        .nav-mega-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px;
          border-radius: 8px;
          text-decoration: none !important;
          transition: background 0.12s ease;
          outline: none;
        }
        .nav-mega-item:hover { background: #f1f5f9; }
        .nav-mega-item:focus-visible {
          background: #eff6ff;
          outline: 2px solid rgba(37,99,235,0.35);
        }
        .nav-mega-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background: rgba(37,99,235,0.08);
          color: #2563eb;
          flex-shrink: 0;
        }
        .nav-mega-label {
          font-size: 0.8rem;
          font-weight: 450;
          color: #374151 !important;
          line-height: 1.3;
          transition: color 0.12s ease;
        }
        .nav-mega-item:hover .nav-mega-label { color: #1d4ed8 !important; }
      `}</style>
    </>
  );
}
