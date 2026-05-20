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

  if (!hasChildren) {
    return (
      <li className="nav-item" role="none">
        <Link
          href={item.href}
          className={`nav-link${isActive ? ' nav-link--active' : ''}`}
          role="menuitem"
        >
          {item.label}
        </Link>
        <style jsx>{`
          .nav-item {
            position: relative;
            list-style: none;
          }
          .nav-link {
            display: flex;
            align-items: center;
            padding: 6px 14px;
            font-size: 0.9rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.75);
            text-decoration: none;
            border-radius: 8px;
            transition: color 0.16s ease, background 0.16s ease;
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
          }
          .nav-link--active {
            color: #60a5fa;
            background: rgba(59, 130, 246, 0.08);
          }
        `}</style>
      </li>
    );
  }

  return (
    <li className={`nav-item nav-item--dd${isOpen ? ' nav-item--open' : ''}`} role="none">
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
          <ChevronDown size={14} strokeWidth={2.2} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && item.children && (
          item.isMegaMenu
            ? <NavbarMegaMenu items={item.children} />
            : <NavbarDropdown items={item.children} />
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-item {
          position: relative;
          list-style: none;
        }
        .nav-trigger {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 14px;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.75);
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: color 0.16s ease, background 0.16s ease;
          outline: none;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .nav-trigger:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }
        .nav-item--open .nav-trigger,
        .nav-trigger:focus-visible {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }
        .nav-trigger:focus-visible {
          outline: 2px solid rgba(59, 130, 246, 0.5);
        }
        .nav-trigger--active {
          color: #60a5fa;
          background: rgba(59, 130, 246, 0.08);
        }
        .nav-trigger__caret {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </li>
  );
}
