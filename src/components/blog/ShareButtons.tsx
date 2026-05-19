'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  const encoded = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="share-buttons d-flex align-items-center gap-2 my-4 flex-wrap">
      <span className="fw-semibold me-1">Share:</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank" rel="noopener noreferrer"
        className="btn btn-sm btn-outline-primary"
      >
        <i className="bi bi-linkedin me-1" />LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank" rel="noopener noreferrer"
        className="btn btn-sm btn-outline-dark"
      >
        <i className="bi bi-twitter-x me-1" />Twitter
      </a>
      <button onClick={copy} className="btn btn-sm btn-outline-secondary">
        <i className={`bi ${copied ? 'bi-check2' : 'bi-link-45deg'} me-1`} />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
