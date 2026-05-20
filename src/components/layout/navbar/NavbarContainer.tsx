'use client';
import type { ReactNode } from 'react';

interface NavbarContainerProps {
  scrolled: boolean;
  children: ReactNode;
}

export default function NavbarContainer({ scrolled, children }: NavbarContainerProps) {
  return (
    <header
      className={`nav-header${scrolled ? ' nav-header--scrolled' : ''}`}
      role="banner"
    >
      <div className="nav-inner">
        {children}
      </div>
      <style jsx>{`
        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          height: 72px;
          background: rgba(8, 13, 24, 0);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          border-bottom: 1px solid transparent;
          transition:
            background 0.35s ease,
            backdrop-filter 0.35s ease,
            -webkit-backdrop-filter 0.35s ease,
            height 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }
        .nav-header--scrolled {
          background: rgba(8, 13, 24, 0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: rgba(255, 255, 255, 0.06);
          box-shadow: 0 1px 40px rgba(0, 0, 0, 0.35);
          height: 62px;
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 28px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        @media (max-width: 768px) {
          .nav-inner {
            padding: 0 16px;
            gap: 12px;
          }
        }
      `}</style>
    </header>
  );
}
