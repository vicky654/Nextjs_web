'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import NavbarContainer from './NavbarContainer';
import NavbarLogo from './NavbarLogo';
import NavbarMenu from './NavbarMenu';
import NavbarCTA from './NavbarCTA';
import NavbarMobile from './NavbarMobile';
import NavbarOverlay from './NavbarOverlay';
import MobileMenuDrawer from './MobileMenuDrawer';
import { NAV_CONFIG } from '@/config/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Scroll detector
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Keyboard: Escape closes everything
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  // Click outside header → close desktop dropdown
  useEffect(() => {
    const handle = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('pointerdown', handle);
    return () => document.removeEventListener('pointerdown', handle);
  }, []);

  // Route change → close everything
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleDropdownToggle = useCallback((label: string | null) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }, []);

  return (
    <>
      <div ref={headerRef}>
        <NavbarContainer scrolled={scrolled}>
          <NavbarLogo />
          <NavbarMenu
            items={NAV_CONFIG}
            openDropdown={openDropdown}
            onDropdownToggle={handleDropdownToggle}
            pathname={pathname}
          />
          <div className="nav-actions">
            <NavbarCTA />
            <NavbarMobile
              isOpen={mobileOpen}
              onToggle={() => setMobileOpen((o) => !o)}
            />
          </div>
        </NavbarContainer>
      </div>

      <NavbarOverlay isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <MobileMenuDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={NAV_CONFIG}
        pathname={pathname}
      />

      <style jsx global>{`
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
}
