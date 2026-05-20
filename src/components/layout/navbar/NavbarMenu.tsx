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
          align-items: center;
          justify-content: center;
          height: 100%;
          min-width: 0;
        }
        .nav-menu__list {
          display: flex;
          align-items: center;
          height: 100%;
          /* gap:4px creates a tiny visual break between item hover areas;
             combined with padding:0 13px on each item this gives 13+4+13=30px
             between text edges — comfortably within the 24-32px target */
          gap: 4px;
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
