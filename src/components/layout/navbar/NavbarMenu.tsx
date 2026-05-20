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
    <nav className="nav-menu" aria-label="Main navigation" role="navigation">
      <ul className="nav-menu__list" role="menubar">
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
      <style jsx>{`
        .nav-menu {
          flex: 1;
          display: flex;
          align-items: stretch;
          justify-content: center;
          align-self: stretch;
          position: relative;
        }
        .nav-menu__list {
          display: flex;
          align-items: stretch;
          align-self: stretch;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 1023px) {
          .nav-menu {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
