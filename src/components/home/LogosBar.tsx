'use client';

interface LogoItem { id: string; company_name: string; logo: string; website: string; }

interface LogosBarProps { logos: LogoItem[]; }

const FALLBACK_COMPANIES = ['Accenture', 'Deloitte', 'KPMG', 'PwC', 'EY', 'McKinsey', 'BCG', 'Bain'];

export default function LogosBar({ logos }: LogosBarProps) {
  const items: LogoItem[] = logos.length > 0
    ? logos
    : FALLBACK_COMPANIES.map((name, i) => ({ id: String(i), company_name: name, logo: '', website: '#' }));

  return (
    <div style={{ background: 'var(--hp-dark-surface)', borderTop: '1px solid var(--hp-border)', borderBottom: '1px solid var(--hp-border)', padding: '1.25rem 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '0.5rem' }}>
        <div style={{ flexShrink: 0, paddingLeft: '1.5rem', color: 'var(--hp-text-dim)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Trusted by
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', animation: 'hp-marquee 30s linear infinite', width: 'max-content', gap: '3rem' }}>
            {[...items, ...items].map((item, idx) => (
              <div key={`${item.id}-${idx}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexShrink: 0, opacity: 0.5, transition: 'opacity 0.2s', cursor: 'default' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '1'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '0.5'; }}>
                {item.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={item.logo} alt={item.company_name} style={{ height: 24, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                ) : (
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.03em' }}>{item.company_name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
