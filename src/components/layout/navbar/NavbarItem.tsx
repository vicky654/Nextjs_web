'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import NavbarDropdown from './NavbarDropdown';
import NavbarMegaMenu from './NavbarMegaMenu';
import type { NavConfigItem } from '@/config/navigation';

interface NavbarItemProps {
  item: NavConfigItem;
  isOpen: boolean;
  onToggle: (label: string | null) => void;
  pathname: string;
}

const PILL_H = 62;
const PILL_H_MOBILE = 54;

export default function NavbarItem({ item, isOpen, onToggle, pathname }: NavbarItemProps) {
  const isActive =
    pathname === item.href ||
    (item.href !== '/' && item.href !== '#' && pathname.startsWith(item.href));
  const hasChildren = Boolean(item.children?.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(isOpen ? null : item.label);
    }
  };

  return (
    <li
      className={`nli${hasChildren ? ' nli--dd' : ''}${isOpen ? ' nli--open' : ''}`}
      role="none"
    >
      {!hasChildren ? (
        <Link
          href={item.href}
          className={`nli-a${isActive ? ' nli-a--active' : ''}`}
          role="menuitem"
        >
          {item.label}
        </Link>
      ) : (
        <>
          <button
            className={`nli-btn${isActive ? ' nli-btn--active' : ''}`}
            onClick={() => onToggle(isOpen ? null : item.label)}
            onKeyDown={handleKeyDown}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            role="menuitem"
          >
            {item.label}
            <motion.span
              className="nli-caret"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <ChevronDown size={13} strokeWidth={2.5} />
            </motion.span>
          </button>

          <AnimatePresence>
            {isOpen && item.children && (
              item.isMegaMenu
                ? <NavbarMegaMenu items={item.children} />
                : <NavbarDropdown items={item.children} />
            )}
          </AnimatePresence>
        </>
      )}

      {/* Use jsx global — scoped styled-jsx doesn't apply with Next.js Turbopack */}
      <style jsx global>{`
        .nli {
          position: relative;
          height: ${PILL_H}px;
          display: flex;
          align-items: center;
          list-style: none;
          flex-shrink: 0;
        }

        /* ── Shared base ──────────────────────────────────────── */
        .nli-a,
        .nli-btn {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 15px;
          font-size: 0.95rem;
          font-weight: 500;
          color: #374151 !important;
          text-decoration: none !important;
          white-space: nowrap;
          letter-spacing: -0.01em;
          line-height: 1;
          border-radius: 9px;
          border: none;
          background: transparent;
          cursor: pointer;
          outline: none;
          transition: color 0.15s ease, background 0.15s ease;
          font-family: inherit;
        }

        /* ── Hover / open ─────────────────────────────────────── */
        .nli-a:hover,
        .nli-btn:hover,
        .nli--open .nli-btn {
          color: #2563eb !important;
          background: rgba(37, 99, 235, 0.07);
          text-decoration: none !important;
        }

        /* ── Focus ────────────────────────────────────────────── */
        .nli-a:focus-visible,
        .nli-btn:focus-visible {
          color: #2563eb !important;
          background: rgba(37, 99, 235, 0.07);
          outline: 2px solid rgba(37, 99, 235, 0.35);
          outline-offset: -1px;
        }

        /* ── Active ───────────────────────────────────────────── */
        .nli-a--active,
        .nli-btn--active {
          color: #1d4ed8 !important;
          font-weight: 600;
        }
        .nli-a--active::after,
        .nli-btn--active::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 15px;
          right: 15px;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #0891b2);
          border-radius: 2px;
        }

        /* ── Caret ────────────────────────────────────────────── */
        .nli-btn { gap: 5px; }
        .nli-caret {
          display: flex;
          align-items: center;
          color: #9ca3af;
          flex-shrink: 0;
          margin-top: 1px;
          transition: color 0.15s ease;
        }
        .nli-btn:hover .nli-caret,
        .nli--open .nli-caret { color: #2563eb; }

        @media (max-width: 640px) {
          .nli { height: ${PILL_H_MOBILE}px; }
        }
      `}</style>
    </li>
  );
}
