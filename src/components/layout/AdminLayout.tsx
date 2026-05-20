'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: 'bi-grid' },
    { label: 'Blog Posts', href: '/admin/blogs', icon: 'bi-file-text' },
    { label: 'Contacts', href: '/admin/contacts', icon: 'bi-envelope' },
    { label: 'Team Members', href: '/admin/teams', icon: 'bi-people' },
    { label: 'Client Logos', href: '/admin/client-logos', icon: 'bi-building' },
  ];

  const isActive = (href: string) =>
    href === '/admin'
      ? pathname === '/admin'
      : pathname.startsWith(href);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <aside
        style={{
          width: 240,
          background: '#1e3a5f',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '20px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            flexShrink: 0,
          }}
        >
          <Link
            href="/admin"
            style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.15rem',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            <span style={{ color: '#00a8cc' }}>DPDP</span> Admin
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 20px',
                color: isActive(item.href) ? '#00a8cc' : 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                background: isActive(item.href) ? 'rgba(0,168,204,0.1)' : 'transparent',
                borderLeft: isActive(item.href)
                  ? '3px solid #00a8cc'
                  : '3px solid transparent',
                transition: 'all 0.15s ease',
                fontSize: '0.92rem',
              }}
            >
              <i className={`bi ${item.icon}`} style={{ fontSize: '1rem', width: 18, textAlign: 'center' }} />
              {item.label}
            </Link>
          ))}

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 20px',
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              borderLeft: '3px solid transparent',
              fontSize: '0.92rem',
            }}
          >
            <i className="bi bi-box-arrow-up-right" style={{ fontSize: '1rem', width: 18, textAlign: 'center' }} />
            View Site
          </a>
        </nav>

        {/* Logout */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            flexShrink: 0,
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: 0,
              fontSize: '0.92rem',
            }}
          >
            <i className="bi bi-box-arrow-right" style={{ fontSize: '1rem' }} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          marginLeft: 240,
          flex: 1,
          background: '#f8f9fa',
          minHeight: '100vh',
          padding: '30px',
        }}
      >
        {children}
      </main>
    </div>
  );
}
