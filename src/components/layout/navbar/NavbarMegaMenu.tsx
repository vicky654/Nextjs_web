'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { NavConfigItem } from '@/config/navigation';

interface NavbarMegaMenuProps {
  items: NavConfigItem[];
}

const variants = {
  hidden: { opacity: 0, y: -10, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function NavbarMegaMenu({ items }: NavbarMegaMenuProps) {
  const mid = Math.ceil(items.length / 2);
  const col1 = items.slice(0, mid);
  const col2 = items.slice(mid);

  return (
    <motion.div
      className="nav-mega"
      role="menu"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-mega__header">
        <span className="nav-mega__title">GDPR Topics</span>
        <span className="nav-mega__sub">Explore compliance guidance by industry &amp; subject area</span>
      </div>
      <div className="nav-mega__grid">
        {[col1, col2].map((col, ci) => (
          <div key={ci} className="nav-mega__col">
            {col.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-mega__item"
                  role="menuitem"
                >
                  {Icon && (
                    <span className="nav-mega__icon" aria-hidden="true">
                      <Icon size={13} strokeWidth={1.8} />
                    </span>
                  )}
                  <span className="nav-mega__label">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <style jsx>{`
        .nav-mega {
          position: absolute;
          top: calc(100% + 8px);
          right: -20px;
          left: auto;
          width: 640px;
          max-width: calc(100vw - 32px);
          background: rgba(10, 15, 28, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          overflow: hidden;
          box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.05),
            0 20px 64px rgba(0, 0, 0, 0.55),
            0 40px 100px rgba(0, 0, 0, 0.3),
            inset 0 0 0 1px rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 1001;
        }
        .nav-mega__header {
          padding: 14px 18px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }
        .nav-mega__title {
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #60a5fa;
        }
        .nav-mega__sub {
          display: block;
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.33);
          margin-top: 3px;
        }
        .nav-mega__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 8px 6px 10px;
        }
        .nav-mega__col {
          display: flex;
          flex-direction: column;
        }
        .nav-mega__item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.12s ease;
          outline: none;
        }
        .nav-mega__item:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        .nav-mega__item:focus-visible {
          background: rgba(255, 255, 255, 0.08);
          outline: 2px solid rgba(59, 130, 246, 0.5);
        }
        .nav-mega__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          flex-shrink: 0;
        }
        .nav-mega__label {
          font-size: 0.8rem;
          font-weight: 450;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.3;
        }
      `}</style>
    </motion.div>
  );
}
