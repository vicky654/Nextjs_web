"use client";

/**
 * CTASection Component
 * Call to action section for conversions
 */

import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
}

export default function CTASection({
  title,
  description,
  primaryCTA = { label: "Get Started", href: "/contact" },
  secondaryCTA = { label: "Learn More", href: "/about" },
}: CTASectionProps) {
  return (
    <section className="cta-section">
      <div className="cta-background">
        <div className="cta-pattern"></div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="cta-content">
              <h2 className="cta-title">{title}</h2>
              <p className="cta-description">{description}</p>
              <div className="cta-buttons">
                <Link href={primaryCTA.href} className="btn btn-light btn-lg">
                  {primaryCTA.label}
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                <Link href={secondaryCTA.href} className="btn btn-outline-light btn-lg">
                  {secondaryCTA.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          position: relative;
          padding: 80px 0;
          overflow: hidden;
        }

        .cta-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8f 50%, #00a8cc 100%);
        }

        .cta-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.1) 1px,
            transparent 1px
          );
          background-size: 25px 25px;
        }

        .cta-content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: #fff;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: #fff;
        }

        .cta-description {
          font-size: 1.15rem;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.85);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-buttons .btn-light {
          color: #1e3a5f;
        }

        .cta-buttons .btn-light:hover {
          background: #00a8cc;
          border-color: #00a8cc;
          color: #fff;
        }

        .cta-buttons .btn-outline-light:hover {
          background: #fff;
          border-color: #fff;
          color: #1e3a5f;
        }

        @media (max-width: 767px) {
          .cta-section {
            padding: 60px 0;
          }

          .cta-title {
            font-size: 1.75rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-buttons .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
