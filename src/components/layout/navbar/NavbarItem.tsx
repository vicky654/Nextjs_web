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

/* Pill height tokens — must stay in sync with NavbarContainer */
const PILL_H = 60;
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
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <ChevronDown size={12} strokeWidth={2.5} />
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
         * Explicit height matches the pill so that top:100% on the
         * dropdown always lands exactly at the pill's bottom edge —
         * no reliance on the fragile align-self:stretch chain.
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
          height: 100%;
          padding: 0 13px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: -0.01em;
          line-height: 1;
          border-radius: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          outline: none;
          transition: color 0.14s ease, background 0.14s ease;
        }

        /* ── Hover ─────────────────────────────────────────────── */
        .ni__a:hover,
        .ni__btn:hover,
        .ni--open .ni__btn {
          color: #111827;
          background: rgba(0, 0, 0, 0.05);
        }

        /* ── Focus ─────────────────────────────────────────────── */
        .ni__a:focus-visible,
        .ni__btn:focus-visible {
          color: #111827;
          background: rgba(0, 0, 0, 0.05);
          outline: 2px solid rgba(37, 99, 235, 0.5);
          outline-offset: -2px;
        }

        /* ── Active state ──────────────────────────────────────── */
        .ni__a--active,
        .ni__btn--active {
          color: #2563eb;
          font-weight: 600;
        }

        /* Active underline bar — sits 8px from pill bottom */
        .ni__a--active::after,
        .ni__btn--active::after {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 13px;
          right: 13px;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #0891b2);
          border-radius: 2px;
        }

        /* ── Dropdown caret ────────────────────────────────────── */
        .ni__btn {
          gap: 3px;
        }
        .ni__caret {
          display: flex;
          align-items: center;
          color: rgba(0, 0, 0, 0.3);
          flex-shrink: 0;
          margin-top: 1px;
          transition: color 0.14s ease;
        }
        .ni__btn:hover .ni__caret,
        .ni--open .ni__caret {
          color: rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 640px) {
          .ni {
            height: ${PILL_H_MOBILE}px;
          }
        }
      `}</style>
    </li>
  );
}
