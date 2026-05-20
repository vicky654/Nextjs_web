'use client';
import { useState } from 'react';

interface LogoItem {
  id: string;
  company_name: string;
  logo: string;
  website: string;
}

interface LogosBarProps {
  logos: LogoItem[];
}

const FALLBACK_COMPANIES: LogoItem[] = [
  { id: 'f0', company_name: 'Accenture',  logo: '', website: '#' },
  { id: 'f1', company_name: 'Deloitte',   logo: '', website: '#' },
  { id: 'f2', company_name: 'KPMG',       logo: '', website: '#' },
  { id: 'f3', company_name: 'PwC',        logo: '', website: '#' },
  { id: 'f4', company_name: 'EY',         logo: '', website: '#' },
  { id: 'f5', company_name: 'McKinsey',   logo: '', website: '#' },
  { id: 'f6', company_name: 'BCG',        logo: '', website: '#' },
  { id: 'f7', company_name: 'Bain',       logo: '', website: '#' },
  { id: 'f8', company_name: 'IBM',        logo: '', website: '#' },
  { id: 'f9', company_name: 'Capgemini',  logo: '', website: '#' },
];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// Deterministic hue from company name for the initials badge
function nameToBadgeStyle(name: string): { bg: string; color: string } {
  const hues = [210, 230, 195, 260, 170, 280, 220, 245, 200, 150, 300];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  const hue = hues[Math.abs(hash) % hues.length];
  return {
    bg: `hsl(${hue} 55% 18%)`,
    color: `hsl(${hue} 80% 72%)`,
  };
}

function LogoCard({ item }: { item: LogoItem }) {
  const [imgFailed, setImgFailed] = useState(false);
  const { bg, color } = nameToBadgeStyle(item.company_name);
  const initials = getInitials(item.company_name);
  const hasRealLogo = Boolean(item.logo) && !imgFailed;

  const cardContent = (
    <div className="lc-card">
      <div className="lc-avatar" style={{ background: bg }}>
        {hasRealLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.logo}
            alt={item.company_name}
            className="lc-img"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="lc-initials" style={{ color }}>{initials}</span>
        )}
      </div>
      <span className="lc-name">{item.company_name}</span>

      <style jsx>{`
        .lc-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px 10px 10px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(255, 255, 255, 0.03);
          white-space: nowrap;
          transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
          cursor: default;
          user-select: none;
        }
        .lc-card:hover {
          background: rgba(59, 130, 246, 0.07);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 4px 24px rgba(59, 130, 246, 0.1);
          transform: translateY(-1px);
        }
        .lc-avatar {
          width: 40px;
          height: 40px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .lc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .lc-initials {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .lc-name {
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: 0.01em;
          transition: color 0.22s ease;
        }
        .lc-card:hover .lc-name {
          color: rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );

  if (item.website && item.website !== '#') {
    return (
      <a
        href={item.website}
        target="_blank"
        rel="noopener noreferrer"
        className="lc-link"
        title={item.company_name}
      >
        {cardContent}
        <style jsx>{`
          .lc-link {
            text-decoration: none;
            outline: none;
            display: block;
            flex-shrink: 0;
          }
          .lc-link .lc-card {
            cursor: pointer;
          }
        `}</style>
      </a>
    );
  }

  return <div className="lc-wrap" title={item.company_name}>{cardContent}<style jsx>{`.lc-wrap{flex-shrink:0}`}</style></div>;
}

export default function LogosBar({ logos }: LogosBarProps) {
  const items: LogoItem[] = logos.length > 0 ? logos : FALLBACK_COMPANIES;

  // Triplicate so the marquee fills even very wide viewports
  const track = [...items, ...items, ...items];

  return (
    <section className="lb-section" aria-label="Trusted by">
      <div className="lb-header">
        <span className="lb-label">Trusted by leading organizations</span>
      </div>

      <div className="lb-viewport">
        <div className="lb-fade lb-fade--left" aria-hidden="true" />
        <div className="lb-track" aria-hidden="true">
          {track.map((item, idx) => (
            <LogoCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
        <div className="lb-fade lb-fade--right" aria-hidden="true" />
      </div>

      {/* Screen-reader-accessible list (hidden visually) */}
      <ul className="lb-sr-list">
        {items.map((item) => (
          <li key={item.id}>
            {item.website && item.website !== '#' ? (
              <a href={item.website} target="_blank" rel="noopener noreferrer">{item.company_name}</a>
            ) : (
              item.company_name
            )}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .lb-section {
          background: #07111f;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          padding: 44px 0 48px;
          overflow: hidden;
        }

        .lb-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .lb-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.28);
        }

        .lb-viewport {
          position: relative;
          overflow: hidden;
        }

        .lb-track {
          display: flex;
          align-items: center;
          gap: 12px;
          width: max-content;
          /* 3 copies — move by 1/3 for seamless loop */
          animation: lb-scroll 45s linear infinite;
        }

        .lb-track:hover {
          animation-play-state: paused;
        }

        .lb-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 140px;
          z-index: 2;
          pointer-events: none;
        }

        .lb-fade--left {
          left: 0;
          background: linear-gradient(to right, #07111f 0%, transparent 100%);
        }

        .lb-fade--right {
          right: 0;
          background: linear-gradient(to left, #07111f 0%, transparent 100%);
        }

        .lb-sr-list {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
          list-style: none;
        }

        @keyframes lb-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @media (max-width: 640px) {
          .lb-section {
            padding: 36px 0 40px;
          }
          .lb-fade {
            width: 60px;
          }
        }
      `}</style>
    </section>
  );
}
