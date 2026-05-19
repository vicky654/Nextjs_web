'use client';

import { useEffect, useRef, useState } from 'react';
import type { TOCItem } from '@/types';

interface TableOfContentsProps {
  headings: TOCItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!headings.length) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="toc-aside d-none d-lg-block">
      <details open>
        <summary className="fw-semibold mb-2" style={{ cursor: 'pointer', listStyle: 'none' }}>
          Table of Contents
        </summary>
        <nav>
          <ul className="list-unstyled mb-0">
            {headings.map((h) => (
              <li
                key={h.id}
                className={h.level === 3 ? 'ps-3' : ''}
                style={{ fontSize: '0.875rem' }}
              >
                <a
                  href={`#${h.id}`}
                  className={`d-block py-1 text-decoration-none ${activeId === h.id ? 'fw-semibold text-primary' : 'text-muted'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </aside>
  );
}
