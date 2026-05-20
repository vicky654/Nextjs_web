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
          className={`ni__link${isActive ? ' ni__link--active' : ''}`}
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
         * li fills the full pill height (60px) via align-self:stretch.
         * position:relative here is the containing block for the dropdowns.
         * No explicit z-index — keeps it out of any stacking context so
         * the dropdown's z-index:1001 operates in the header context.
         */
        .ni {
          position: relative;
          list-style: none;
          display: flex;
          align-items: center;
          align-self: stretch;
        }

        /* ── Plain link ─────────────────────────────────────────── */
        .ni__link {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 14px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.15s ease, background 0.15s ease;
          outline: none;
          white-space: nowrap;
          letter-spacing: -0.01em;
          line-height: 1;
        }
        .ni__link:hover {
          color: #111827;
          background: rgba(0, 0, 0, 0.05);
        }
        .ni__link:focus-visible {
          color: #111827;
          background: rgba(0, 0, 0, 0.05);
          outline: 2px solid rgba(37, 99, 235, 0.5);
          outline-offset: -2px;
        }
        .ni__link--active {
          color: #2563eb;
          font-weight: 600;
        }
        /* Active indicator — bottom bar inside the pill */
        .ni__link--active::after {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 14px;
          right: 14px;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #0891b2);
          border-radius: 2px;
        }

        /* ── Dropdown trigger button ────────────────────────────── */
        .ni__btn {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 100%;
          padding: 0 14px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: color 0.15s ease, background 0.15s ease;
          outline: none;
          white-space: nowrap;
          letter-spacing: -0.01em;
          line-height: 1;
        }
        .ni__btn:hover {
          color: #111827;
          background: rgba(0, 0, 0, 0.05);
        }
        .ni--open .ni__btn {
          color: #111827;
          background: rgba(0, 0, 0, 0.06);
        }
        .ni__btn:focus-visible {
          color: #111827;
          background: rgba(0, 0, 0, 0.05);
          outline: 2px solid rgba(37, 99, 235, 0.5);
          outline-offset: -2px;
        }
        .ni__btn--active {
          color: #2563eb;
          font-weight: 600;
        }

        /* ── Caret icon ─────────────────────────────────────────── */
        .ni__caret {
          display: flex;
          align-items: center;
          color: rgba(0, 0, 0, 0.3);
          flex-shrink: 0;
          margin-top: 1px;
          transition: color 0.15s ease;
        }
        .ni__btn:hover .ni__caret,
        .ni--open .ni__caret {
          color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </li>
  );
}
