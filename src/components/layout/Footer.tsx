"use client";

/**
 * Footer Component
 * Site footer with company info, quick links, services, and contact details
 */

import Link from "next/link";
import { COMPANY_INFO, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="row g-4">
            {/* Company Info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <Link href="/" className="footer-logo">
                  <span className="logo-text">
                    <span className="logo-highlight">DPDP</span> Consultants
                  </span>
                </Link>
                <p className="footer-description">
                  {COMPANY_INFO.description}
                </p>
                <div className="footer-social">
                  <a
                    href={COMPANY_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a
                    href={COMPANY_INFO.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    aria-label="Email"
                  >
                    <i className="bi bi-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget">
                <h5 className="footer-title">Quick Links</h5>
                <ul className="footer-links">
                  {FOOTER_LINKS.quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Services */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h5 className="footer-title">Services</h5>
                <ul className="footer-links">
                  {FOOTER_LINKS.services.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h5 className="footer-title">Contact Us</h5>
                <ul className="footer-contact">
                  <li>
                    <i className="bi bi-geo-alt"></i>
                    <span>{COMPANY_INFO.address}</span>
                  </li>
                  <li>
                    <i className="bi bi-telephone"></i>
                    <a href={`tel:${COMPANY_INFO.phone}`}>
                      {COMPANY_INFO.phone}
                    </a>
                  </li>
                  <li>
                    <i className="bi bi-envelope"></i>
                    <a href={`mailto:${COMPANY_INFO.email}`}>
                      {COMPANY_INFO.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">
                &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <ul className="footer-legal">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #1e3a5f;
          color: #fff;
        }

        .footer-main {
          padding: 60px 0;
        }

        .footer-logo {
          display: inline-block;
          margin-bottom: 20px;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }

        .logo-highlight {
          color: #00a8cc;
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
          line-height: 1.8;
        }

        .footer-social {
          display: flex;
          gap: 12px;
        }

        .footer-social a {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          transition: all 0.3s ease;
        }

        .footer-social a:hover {
          background: #00a8cc;
          transform: translateY(-3px);
        }

        .footer-title {
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }

        .footer-title::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: #00a8cc;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }

        .footer-links a:hover {
          color: #00a8cc;
          padding-left: 5px;
        }

        .footer-contact {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-contact li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          color: rgba(255, 255, 255, 0.7);
        }

        .footer-contact i {
          color: #00a8cc;
          font-size: 1.1rem;
          margin-top: 3px;
        }

        .footer-contact a {
          color: rgba(255, 255, 255, 0.7);
        }

        .footer-contact a:hover {
          color: #00a8cc;
        }

        .footer-bottom {
          background: rgba(0, 0, 0, 0.2);
          padding: 20px 0;
        }

        .copyright {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .footer-legal {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: flex-end;
          gap: 20px;
        }

        .footer-legal a {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .footer-legal a:hover {
          color: #00a8cc;
        }

        @media (max-width: 767px) {
          .footer-main {
            padding: 40px 0;
          }

          .footer-bottom {
            text-align: center;
          }

          .copyright {
            margin-bottom: 10px;
          }

          .footer-legal {
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
          }
        }
      `}</style>
    </footer>
  );
}
