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
  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
  const hasChildren = Boolean(item.children?.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(isOpen ? null : item.label);
    }
  };

  return (
    <li
      className={`nav-item${hasChildren ? ' nav-item--dd' : ''}${isOpen ? ' nav-item--open' : ''}`}
      role="none"
    >
      {!hasChildren ? (
        <Link
          href={item.href}
          className={`nav-link${isActive ? ' nav-link--active' : ''}`}
          role="menuitem"
        >
          {item.label}
        </Link>
      ) : (
        <>
          <button
            className={`nav-trigger${isActive ? ' nav-trigger--active' : ''}`}
            onClick={() => onToggle(isOpen ? null : item.label)}
            onKeyDown={handleKeyDown}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            role="menuitem"
          >
            {item.label}
            <motion.span
              className="nav-trigger__caret"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
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
        /* li fills full pill height via align-self:stretch inherited from flex parent */
        .nav-item {
          position: relative;
          list-style: none;
          display: flex;
          align-items: center;
          align-self: stretch;
        }

        /* Plain nav link — dark text on white pill */
        .nav-link {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 12px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          border-radius: 0;
          transition: color 0.15s ease, background 0.15s ease;
          outline: none;
          white-space: nowrap;
          letter-spacing: -0.01em;
        }
        .nav-link:hover {
          color: #0f172a;
          background: rgba(0, 0, 0, 0.04);
        }
        .nav-link:focus-visible {
          color: #0f172a;
          background: rgba(0, 0, 0, 0.05);
          outline: 2px solid rgba(37, 99, 235, 0.5);
          border-radius: 6px;
        }
        .nav-link--active {
          color: #2563eb;
          font-weight: 600;
        }
        .nav-link--active::after {
          content: '';
          position: absolute;
          bottom: 10px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #0891b2);
          border-radius: 2px;
        }

        /* Dropdown trigger button — dark text on white pill */
        .nav-trigger {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 100%;
          padding: 0 12px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #475569;
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 0;
          transition: color 0.15s ease, background 0.15s ease;
          outline: none;
          white-space: nowrap;
          letter-spacing: -0.01em;
        }
        .nav-trigger:hover {
          color: #0f172a;
          background: rgba(0, 0, 0, 0.04);
        }
        .nav-item--open .nav-trigger {
          color: #0f172a;
          background: rgba(0, 0, 0, 0.05);
        }
        .nav-trigger:focus-visible {
          color: #0f172a;
          background: rgba(0, 0, 0, 0.05);
          outline: 2px solid rgba(37, 99, 235, 0.5);
          border-radius: 6px;
        }
        .nav-trigger--active {
          color: #2563eb;
          font-weight: 600;
        }

        .nav-trigger__caret {
          display: flex;
          align-items: center;
          color: rgba(0, 0, 0, 0.3);
          flex-shrink: 0;
          margin-top: 1px;
          transition: color 0.15s ease;
        }
        .nav-trigger:hover .nav-trigger__caret,
        .nav-item--open .nav-trigger__caret {
          color: rgba(0, 0, 0, 0.55);
        }
      `}</style>
    </li>
  );
}
