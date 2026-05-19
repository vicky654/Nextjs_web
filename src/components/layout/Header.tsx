"use client";

/**
 * Header Component
 * Sticky navigation header with logo, navigation links, and CTA button
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""}`}
      id="main-header"
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Logo */}
          <Link href="/" className="navbar-brand">
            <span className="logo-text">
              <span className="logo-highlight">DPDP</span> Consultants
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              {isMobileMenuOpen ? (
                <i className="bi bi-x-lg"></i>
              ) : (
                <i className="bi bi-list"></i>
              )}
            </span>
          </button>

          {/* Navigation */}
          <div
            className={`navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto">
              {NAV_ITEMS.map((item) =>
                item.children?.length ? (
                  <li className="nav-item dropdown" key={`dropdown-${item.label}`}>
                    <button
                      className="nav-link dropdown-toggle border-0 bg-transparent"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: 'inherit' }}
                    >
                      {item.label}
                    </button>
                    <ul className="dropdown-menu">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="dropdown-item"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item" key={`nav-${item.label}`}>
                    <Link
                      href={item.href}
                      className="nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* CTA Button */}
            <div className="header-cta d-none d-lg-block">
              <Link href="/contact-us/" className="btn btn-primary">
                Get Started
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: transparent;
          transition: all 0.3s ease;
          padding: 15px 0;
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          padding: 10px 0;
        }

        .navbar {
          padding: 0;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .logo-text {
          color: white;
        }

        .logo-highlight {
          color: #00a8cc;
        }

        .header.scrolled .navbar-brand,
        .header.scrolled .logo-text {
          color: #1e3a5f;
        }

        .nav-link {
          font-weight: 500;
          color: white;
          padding: 8px 16px !important;
          position: relative;
          transition: color 0.3s ease;
        }

        .header.scrolled .nav-link {
          color: #1e3a5f;
        }

        .nav-link:hover {
          color: #00a8cc;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #00a8cc;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 60%;
        }

        .navbar-toggler {
          border: none;
          padding: 8px;
          font-size: 1.5rem;
          color: white;
        }

        .header.scrolled .navbar-toggler {
          color: #1e3a5f;
        }

        .dropdown-menu .dropdown-item {
          color: #1e3a5f;
        }

        .navbar-toggler:focus {
          box-shadow: none;
        }

        .navbar-collapse {
          flex-grow: 0;
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            display: none;
          }

          .navbar-collapse.show {
            display: block;
          }

          .navbar-nav {
            margin-bottom: 15px;
          }

          .nav-item {
            margin: 5px 0;
          }
        }
      `}</style>
    </header>
  );
}
