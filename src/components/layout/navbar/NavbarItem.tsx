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
        /* li fills full header height so top:100% == header bottom */
        .nav-item {
          position: relative;
          list-style: none;
          display: flex;
          align-items: center;
          align-self: stretch;
        }

        /* Plain link */
        .nav-link {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 13px;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.78);
          text-decoration: none;
          border-radius: 0;
          transition: color 0.15s ease, background 0.15s ease;
          outline: none;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }
        .nav-link:focus-visible {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          outline: 2px solid rgba(59, 130, 246, 0.5);
          border-radius: 6px;
        }
        .nav-link--active {
          color: #60a5fa;
        }
        .nav-link--active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 13px;
          right: 13px;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          border-radius: 2px 2px 0 0;
        }

        /* Dropdown trigger button */
        .nav-trigger {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 100%;
          padding: 0 13px;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.78);
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 0;
          transition: color 0.15s ease, background 0.15s ease;
          outline: none;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .nav-trigger:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }
        .nav-item--open .nav-trigger {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.07);
        }
        .nav-trigger:focus-visible {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          outline: 2px solid rgba(59, 130, 246, 0.5);
          border-radius: 6px;
        }
        .nav-trigger--active {
          color: #60a5fa;
        }
        .nav-trigger__caret {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.38);
          flex-shrink: 0;
        }
      `}</style>
    </li>
  );
}
