"use client";

/**
 * HeroSection Component
 * Hero section with GSAP animations
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

interface HeroSectionProps {
  title: string;
  subtitle: string;
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

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA = { label: "Get Started", href: "/contact" },
  secondaryCTA = { label: "Our Services", href: "/services" },
}: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-8">
            <div className="hero-content">
              <span className="hero-subtitle" ref={subtitleRef}>
                {subtitle}
              </span>
              <h1 className="hero-title" ref={titleRef}>
                {title}
              </h1>
              <p className="hero-description" ref={descRef}>
                {description}
              </p>
              <div className="hero-buttons" ref={buttonsRef}>
                <Link href={primaryCTA.href} className="btn btn-primary btn-lg">
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

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            #1e3a5f 0%,
            #2d5a8f 50%,
            #00a8cc 100%
          );
        }

        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.1) 1px,
            transparent 1px
          );
          background-size: 30px 30px;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          color: #fff;
        }

        .hero-subtitle {
          display: inline-block;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #00a8cc;
          margin-bottom: 1rem;
          background: rgba(0, 168, 204, 0.1);
          padding: 8px 16px;
          border-radius: 4px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: #fff;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.8;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.85);
          max-width: 600px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-buttons .btn-primary {
          background: #00a8cc;
          border-color: #00a8cc;
        }

        .hero-buttons .btn-primary:hover {
          background: #008aad;
          border-color: #008aad;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 168, 204, 0.3);
        }

        .hero-buttons .btn-outline-light {
          border-color: rgba(255, 255, 255, 0.5);
          color: #fff;
        }

        .hero-buttons .btn-outline-light:hover {
          background: #fff;
          border-color: #fff;
          color: #1e3a5f;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
        }

        .mouse {
          width: 26px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.6);
          border-radius: 20px;
          position: relative;
        }

        .wheel {
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 2px;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll 2s infinite;
        }

        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
        }

        @media (max-width: 991px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 767px) {
          .hero-section {
            padding-top: 80px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .hero-buttons .btn {
            width: 100%;
            text-align: center;
          }

          .scroll-indicator {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
