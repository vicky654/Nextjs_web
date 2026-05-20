'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { NavConfigItem } from '@/config/navigation';

interface MobileSubmenuProps {
  item: NavConfigItem;
  onClose: () => void;
  pathname: string;
}

export default function MobileSubmenu({ item, onClose, pathname }: MobileSubmenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="msub">
      <button
        className="msub__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`msub-${item.label}`}
      >
        <span>{item.label}</span>
        <motion.span
          className="msub__chevron"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ChevronDown size={16} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`msub-${item.label}`}
            className="msub__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="msub__inner">
              {item.children?.map((child) => {
                const Icon = child.icon;
                const isActive = pathname === child.href;
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`msub__link${isActive ? ' msub__link--active' : ''}`}
                    onClick={onClose}
                  >
                    {Icon && (
                      <span className="msub__icon" aria-hidden="true">
                        <Icon size={13} strokeWidth={1.8} />
                      </span>
                    )}
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .msub {
          border-radius: 10px;
          overflow: hidden;
        }
        .msub__trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 0.975rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.82);
          border-radius: 10px;
          transition: background 0.14s ease, color 0.14s ease;
          text-align: left;
          outline: none;
        }
        .msub__trigger:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }
        .msub__trigger:focus-visible {
          outline: 2px solid rgba(59, 130, 246, 0.5);
        }
        .msub__chevron {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.4);
        }
        .msub__panel {
        }
        .msub__inner {
          display: flex;
          flex-direction: column;
          gap: 1px;
          padding: 4px 8px 8px;
        }
        .msub__link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          transition: background 0.13s ease, color 0.13s ease;
          outline: none;
        }
        .msub__link:hover {
          background: rgba(59, 130, 246, 0.09);
          color: rgba(255, 255, 255, 0.9);
        }
        .msub__link--active {
          color: #60a5fa;
          background: rgba(59, 130, 246, 0.08);
        }
        .msub__icon {
          display: flex;
          align-items: center;
          color: #60a5fa;
          opacity: 0.75;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
