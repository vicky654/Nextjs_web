"use client";

/**
 * DashboardLayout Component
 * Layout wrapper for dashboard pages with sidebar navigation
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAV_ITEMS, COMPANY_INFO } from "@/lib/constants";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo">
            <span className="logo-highlight">DPDP</span> Consultants
          </Link>
          <button
            className="sidebar-close d-lg-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {DASHBOARD_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? "active" : ""}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <i className={`bi ${getIconForPage(item.href)}`}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link href="/" className="back-link">
            <i className="bi bi-arrow-left"></i>
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <button
            className="sidebar-toggle d-lg-none"
            onClick={() => setIsSidebarOpen(true)}
          >
            <i className="bi bi-list"></i>
          </button>

          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">
                <span>JD</span>
              </div>
              <div className="user-details d-none d-md-block">
                <span className="user-name">John Doe</span>
                <span className="user-role">Client</span>
              </div>
            </div>
            <button className="btn-logout">
              <i className="bi bi-box-arrow-right"></i>
              <span className="d-none d-md-inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">{children}</main>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 260px;
          background: #1e3a5f;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .sidebar-header {
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-logo {
          color: #fff;
          font-weight: 700;
          font-size: 1.2rem;
        }

        .logo-highlight {
          color: #00a8cc;
        }

        .sidebar-close {
          background: none;
          border: none;
          color: #fff;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
          overflow-y: auto;
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          background: rgba(0, 168, 204, 0.1);
          color: #00a8cc;
          border-left: 3px solid #00a8cc;
        }

        .nav-link i {
          font-size: 1.2rem;
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .back-link:hover {
          color: #00a8cc;
        }

        .dashboard-main {
          flex: 1;
          margin-left: 260px;
          display: flex;
          flex-direction: column;
        }

        .dashboard-header {
          background: #fff;
          padding: 15px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #1e3a5f;
          cursor: pointer;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #00a8cc;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          color: #1e3a5f;
        }

        .user-role {
          font-size: 0.8rem;
          color: #6c757d;
        }

        .btn-logout {
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .dashboard-content {
          flex: 1;
          padding: 30px;
          background: #f8f9fa;
        }

        .sidebar-overlay {
          display: none;
        }

        @media (max-width: 991px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .dashboard-main {
            margin-left: 0;
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
          }
        }

        @media (max-width: 767px) {
          .dashboard-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}

function getIconForPage(href: string): string {
  const icons: Record<string, string> = {
    "/dashboard": "bi-grid-1x2",
    "/dashboard/documents": "bi-folder",
    "/dashboard/tickets": "bi-chat-dots",
    "/dashboard/profile": "bi-person",
  };
  return icons[href] || "bi-circle";
}
