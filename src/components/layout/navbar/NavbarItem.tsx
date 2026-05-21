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

/* Must stay in sync with NavbarContainer pill height */
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
      className={`ni${hasChildren ? ' ni--dd' : ''}${isOpen ? ' ni--open' : ''}`}
      role="none"
    >
      {!hasChildren ? (
        <Link
          href={item.href}
          className={`ni__a${isActive ? ' ni__a--active' : ''}`}
          role="menuitem"
        >
          {item.label}
        </Link>
      ) : (
        <>
          <button
            className={`ni__btn${isActive ? ' ni__btn--active' : ''}`}
            onClick={() => onToggle(isOpen ? null : item.label)}
            onKeyDown={handleKeyDown}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            role="menuitem"
          >
            {item.label}
            <motion.span
              className="ni__caret"
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

      <style jsx>{`
        /*
         * Explicit height matches pill height so top:100% on dropdowns
         * always resolves to the pill's exact bottom edge.
         */
        .ni {
          position: relative;
          height: ${PILL_H}px;
          display: flex;
          align-items: center;
          list-style: none;
          flex-shrink: 0;
        }

        /* ── Shared link / button base ─────────────────────────── */
        .ni__a,
        .ni__btn {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 14px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: -0.01em;
          line-height: 1;
          border-radius: 9px;
          border: none;
          background: transparent;
          cursor: pointer;
          outline: none;
          transition: color 0.15s ease, background 0.15s ease;
        }

        /* ── Hover ─────────────────────────────────────────────── */
        .ni__a:hover,
        .ni__btn:hover,
        .ni--open .ni__btn {
          color: #2563eb;
          background: rgba(37, 99, 235, 0.06);
        }

        /* ── Focus ─────────────────────────────────────────────── */
        .ni__a:focus-visible,
        .ni__btn:focus-visible {
          color: #2563eb;
          background: rgba(37, 99, 235, 0.07);
          outline: 2px solid rgba(37, 99, 235, 0.35);
          outline-offset: -1px;
        }

        /* ── Active ────────────────────────────────────────────── */
        .ni__a--active,
        .ni__btn--active {
          color: #1d4ed8;
          font-weight: 600;
        }

        /* Gradient underline tab indicator */
        .ni__a--active::after,
        .ni__btn--active::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 14px;
          right: 14px;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #0891b2);
          border-radius: 2px;
        }

        /* ── Caret ─────────────────────────────────────────────── */
        .ni__btn { gap: 4px; }
        .ni__caret {
          display: flex;
          align-items: center;
          color: #9ca3af;
          flex-shrink: 0;
          margin-top: 1px;
          transition: color 0.15s ease;
        }
        .ni__btn:hover .ni__caret,
        .ni--open .ni__caret { color: #2563eb; }

        @media (max-width: 640px) {
          .ni { height: ${PILL_H_MOBILE}px; }
        }
      `}</style>
    </li>
  );
}
