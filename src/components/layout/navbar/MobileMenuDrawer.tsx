'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import NavbarLogo from './NavbarLogo';
import MobileSubmenu from './MobileSubmenu';
import NavbarCTA from './NavbarCTA';
import type { NavConfigItem } from '@/config/navigation';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavConfigItem[];
  pathname: string;
}

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  items,
  pathname,
}: MobileMenuDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          id="mobile-menu-drawer"
          className="mdr"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          variants={drawerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.9 }}
        >
          {/* Header */}
          <div className="mdr__head">
            <NavbarLogo />
            <button
              className="mdr__close"
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Nav items */}
          <nav className="mdr__nav" aria-label="Mobile navigation">
            {items.map((item) => {
              if (item.children?.length) {
                return (
                  <MobileSubmenu
                    key={item.label}
                    item={item}
                    onClose={onClose}
                    pathname={pathname}
                  />
                );
              }
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mdr__link${isActive ? ' mdr__link--active' : ''}`}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer CTA */}
          <div className="mdr__footer">
            <NavbarCTA />
          </div>

          <style jsx>{`
            .mdr {
              position: fixed;
              top: 0;
              right: 0;
              bottom: 0;
              width: min(360px, 92vw);
              background: rgba(6, 11, 26, 0.99);
              border-left: 1px solid rgba(255, 255, 255, 0.07);
              z-index: 1000;
              display: flex;
              flex-direction: column;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
            }
            .mdr__head {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 18px 20px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.06);
              flex-shrink: 0;
            }
            .mdr__close {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 38px;
              height: 38px;
              background: rgba(255, 255, 255, 0.06);
              border: 1px solid rgba(255, 255, 255, 0.09);
              border-radius: 9px;
              cursor: pointer;
              color: rgba(255, 255, 255, 0.7);
              transition: background 0.14s ease, color 0.14s ease;
              outline: none;
            }
            .mdr__close:hover {
              background: rgba(255, 255, 255, 0.1);
              color: #ffffff;
            }
            .mdr__close:focus-visible {
              outline: 2px solid rgba(59, 130, 246, 0.5);
            }
            .mdr__nav {
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 2px;
              padding: 12px 12px 20px;
            }
            .mdr__link {
              display: flex;
              align-items: center;
              padding: 13px 16px;
              border-radius: 10px;
              text-decoration: none;
              font-size: 0.975rem;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.78);
              transition: background 0.14s ease, color 0.14s ease;
              outline: none;
            }
            .mdr__link:hover {
              background: rgba(255, 255, 255, 0.05);
              color: #ffffff;
            }
            .mdr__link:focus-visible {
              outline: 2px solid rgba(59, 130, 246, 0.5);
            }
            .mdr__link--active {
              color: #60a5fa;
              background: rgba(59, 130, 246, 0.08);
            }
            .mdr__footer {
              padding: 16px 20px 24px;
              border-top: 1px solid rgba(255, 255, 255, 0.06);
              flex-shrink: 0;
              display: flex;
            }
            .mdr__footer :global(.nav-cta) {
              flex: 1;
              justify-content: center;
            }
          `}</style>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
