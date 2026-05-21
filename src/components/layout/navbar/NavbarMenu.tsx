'use client';
import NavbarItem from './NavbarItem';
import type { NavConfigItem } from '@/config/navigation';

interface NavbarMenuProps {
  items: NavConfigItem[];
  openDropdown: string | null;
  onDropdownToggle: (label: string | null) => void;
  pathname: string;
}

export default function NavbarMenu({
  items,
  openDropdown,
  onDropdownToggle,
  pathname,
}: NavbarMenuProps) {
  return (
    <nav className="navmenu" aria-label="Main navigation" role="navigation">
      <ul className="navmenu-list" role="menubar">
        {items.map((item) => (
          <NavbarItem
            key={item.label}
            item={item}
            isOpen={openDropdown === item.label}
            onToggle={onDropdownToggle}
            pathname={pathname}
          />
        ))}
      </ul>

      {/* global — scoped styled-jsx doesn't apply with Turbopack */}
      <style jsx global>{`
        .navmenu {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-width: 0;
        }
        .navmenu-list {
          display: flex;
          align-items: center;
          height: 100%;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 1023px) {
          .navmenu { display: none; }
        }
      `}</style>
    </nav>
  );
}
