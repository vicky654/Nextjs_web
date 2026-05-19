"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) {
        setIsMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMobile = () => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (key: string) =>
    setOpenDropdown((prev) => (prev === key ? null : key));

  return (
    <header
      ref={headerRef}
      id="main-header"
      className={`site-header${isScrolled ? " scrolled" : ""}`}
    >
      <div className="container">
        {/* ── Desktop / Mobile bar ── */}
        <div className="hdr-bar">
          {/* Logo */}
          <Link href="/" className="hdr-logo" onClick={closeMobile}>
            <span className="hdr-logo__accent">DPDP</span> Consultants
          </Link>

          {/* Desktop nav (centre) */}
          <nav className="hdr-nav" aria-label="Main navigation">
            <ul className="hdr-nav__list">
              {NAV_ITEMS.map((item) =>
                item.children?.length ? (
                  <li className="hdr-nav__item hdr-nav__item--drop" key={item.label}>
                    <button
                      className={`hdr-nav__btn${openDropdown === item.label ? " is-open" : ""}`}
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={openDropdown === item.label}
                    >
                      {item.label}
                      <svg
                        className="hdr-nav__caret"
                        viewBox="0 0 12 12"
                        aria-hidden="true"
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {openDropdown === item.label && (
                      <ul className="hdr-drop">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="hdr-drop__link"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li className="hdr-nav__item" key={item.label}>
                    <Link href={item.href} className="hdr-nav__link">
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Right side: CTA + hamburger */}
          <div className="hdr-actions">
            <Link href="/contact-us/" className="hdr-cta">
              Get Started
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </Link>

            <button
              className="hdr-toggle"
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              <i className={`bi ${isMobileOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {isMobileOpen && (
          <nav className="hdr-mobile" aria-label="Mobile navigation">
            <ul className="hdr-mobile__list">
              {NAV_ITEMS.map((item) =>
                item.children?.length ? (
                  <li key={item.label}>
                    <button
                      className={`hdr-mobile__toggle${openDropdown === `m-${item.label}` ? " is-open" : ""}`}
                      onClick={() => toggleDropdown(`m-${item.label}`)}
                    >
                      {item.label}
                      <i
                        className={`bi bi-chevron-${openDropdown === `m-${item.label}` ? "up" : "down"}`}
                        aria-hidden="true"
                      />
                    </button>
                    {openDropdown === `m-${item.label}` && (
                      <ul className="hdr-mobile__sub">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="hdr-mobile__sub-link"
                              onClick={closeMobile}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link href={item.href} className="hdr-mobile__link" onClick={closeMobile}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <div className="hdr-mobile__cta">
              <Link href="/contact-us/" className="hdr-cta hdr-cta--full" onClick={closeMobile}>
                Get Started
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </nav>
        )}
      </div>

      <style jsx>{`
        /* ── Base ── */
        .site-header {
          position: fixed;
          inset: 0 0 auto;
          z-index: 1000;
          background: transparent;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .site-header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(8px);
        }

        /* ── Main bar ── */
        .hdr-bar {
          display: flex;
          align-items: center;
          height: 72px;
          gap: 0;
        }

        /* ── Logo ── */
        .hdr-logo {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          font-size: 1.45rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
          letter-spacing: -0.02em;
          line-height: 1;
          transition: color 0.3s ease;
          margin-right: 8px;
        }
        .site-header.scrolled .hdr-logo {
          color: #1e3a5f;
        }
        .hdr-logo__accent {
          color: #00a8cc;
          margin-right: 0.25em;
        }

        /* ── Desktop nav ── */
        .hdr-nav {
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }
        .hdr-nav__list {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 2px;
          flex-wrap: nowrap;
        }
        .hdr-nav__item {
          position: relative;
        }

        /* shared link / button styles */
        .hdr-nav__link,
        .hdr-nav__btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          height: 38px;
          padding: 0 12px;
          font-family: inherit;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1;
          color: rgba(255, 255, 255, 0.92);
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .site-header.scrolled .hdr-nav__link,
        .site-header.scrolled .hdr-nav__btn {
          color: #334155;
        }
        .hdr-nav__link:hover,
        .hdr-nav__btn:hover,
        .hdr-nav__btn.is-open {
          color: #00a8cc;
          background: rgba(0, 168, 204, 0.08);
        }
        .site-header.scrolled .hdr-nav__link:hover,
        .site-header.scrolled .hdr-nav__btn:hover,
        .site-header.scrolled .hdr-nav__btn.is-open {
          color: #00a8cc;
          background: rgba(0, 168, 204, 0.08);
        }

        /* caret SVG (no ::after conflicts) */
        .hdr-nav__caret {
          width: 10px;
          height: 10px;
          flex-shrink: 0;
          transition: transform 0.2s ease;
          opacity: 0.7;
        }
        .hdr-nav__btn.is-open .hdr-nav__caret {
          transform: rotate(180deg);
          opacity: 1;
        }

        /* ── Dropdown panel ── */
        .hdr-drop {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 260px;
          max-width: 320px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(0, 0, 0, 0.06);
          padding: 6px;
          list-style: none;
          margin: 0;
          z-index: 200;
          animation: dropIn 0.15s ease both;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .hdr-drop__link {
          display: block;
          padding: 8px 12px;
          font-size: 0.85rem;
          font-weight: 400;
          color: #1e3a5f;
          text-decoration: none;
          border-radius: 6px;
          transition: background 0.15s ease, color 0.15s ease;
          white-space: normal;
          line-height: 1.4;
        }
        .hdr-drop__link:hover {
          background: rgba(30, 58, 95, 0.05);
          color: #00a8cc;
        }

        /* ── Right-side actions ── */
        .hdr-actions {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 8px;
        }

        /* ── CTA button ── */
        .hdr-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 38px;
          padding: 0 18px;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          background: #1e3a5f;
          border: none;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          letter-spacing: 0.01em;
          line-height: 1;
        }
        .hdr-cta:hover {
          background: #00a8cc;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0, 168, 204, 0.35);
        }
        .hdr-cta--full {
          width: 100%;
          justify-content: center;
          height: 44px;
          font-size: 0.9rem;
          border-radius: 8px;
        }

        /* ── Hamburger ── */
        .hdr-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
          font-size: 1.4rem;
          color: white;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
          line-height: 1;
        }
        .site-header.scrolled .hdr-toggle {
          color: #1e3a5f;
        }
        .hdr-toggle:hover {
          background: rgba(255, 255, 255, 0.12);
        }
        .site-header.scrolled .hdr-toggle:hover {
          background: rgba(30, 58, 95, 0.06);
        }
        .hdr-toggle:focus-visible {
          outline: 2px solid #00a8cc;
          outline-offset: 2px;
        }

        /* ── Mobile drawer ── */
        .hdr-mobile {
          background: white;
          border-top: 1px solid #e2e8f0;
          border-radius: 0 0 12px 12px;
          padding: 8px 0 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.10);
        }
        .hdr-mobile__list {
          list-style: none;
          margin: 0;
          padding: 0 8px;
        }
        .hdr-mobile__link,
        .hdr-mobile__toggle {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 10px 12px;
          font-family: inherit;
          font-size: 0.9375rem;
          font-weight: 500;
          color: #1e3a5f;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          text-align: left;
          transition: background 0.15s ease, color 0.15s ease;
          line-height: 1;
        }
        .hdr-mobile__link:hover,
        .hdr-mobile__toggle:hover,
        .hdr-mobile__toggle.is-open {
          background: rgba(30, 58, 95, 0.05);
          color: #00a8cc;
        }
        .hdr-mobile__toggle .bi {
          margin-left: auto;
          font-size: 0.75rem;
          opacity: 0.6;
        }
        .hdr-mobile__sub {
          list-style: none;
          margin: 2px 0 4px 8px;
          padding: 0 0 0 12px;
          border-left: 2px solid #e2e8f0;
        }
        .hdr-mobile__sub-link {
          display: block;
          padding: 8px 12px;
          font-size: 0.875rem;
          font-weight: 400;
          color: #475569;
          text-decoration: none;
          border-radius: 6px;
          transition: background 0.15s ease, color 0.15s ease;
          line-height: 1.4;
        }
        .hdr-mobile__sub-link:hover {
          background: rgba(30, 58, 95, 0.04);
          color: #00a8cc;
        }
        .hdr-mobile__cta {
          padding: 12px 8px 4px;
          margin-top: 8px;
          border-top: 1px solid #e2e8f0;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 991px) {
          /* hide desktop nav and desktop CTA, show hamburger */
          .hdr-nav { display: none; }
          .hdr-cta:not(.hdr-cta--full) { display: none; }
          .hdr-toggle { display: inline-flex; }

          /* tighter bar on mobile */
          .hdr-bar { height: 64px; }
        }

        @media (min-width: 992px) {
          /* hide hamburger and mobile drawer on desktop */
          .hdr-toggle { display: none; }
          .hdr-mobile { display: none; }
        }

        /* tablet: slightly smaller nav text */
        @media (min-width: 992px) and (max-width: 1199px) {
          .hdr-nav__link,
          .hdr-nav__btn {
            font-size: 0.825rem;
            padding: 0 9px;
          }
          .hdr-logo { font-size: 1.3rem; }
          .hdr-cta { padding: 0 14px; font-size: 0.825rem; }
        }
      `}</style>
    </header>
  );
}
