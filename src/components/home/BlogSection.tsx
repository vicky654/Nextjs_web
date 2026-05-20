'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  rectitle: string;
  slug: string | null;
  summary?: string | null;
  category?: string | null;
  recdate: string | Date;
  read_time?: number | null;
  recimg?: string | null;
  imgalt?: string | null;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

function formatDate(date: string | Date): string {
  try { return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return ''; }
}

export default function BlogSection({ posts }: BlogSectionProps) {
  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section style={{ background: 'var(--hp-dark-surface)', padding: 'var(--hp-section-gap) 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="hp-section-badge">Latest Insights</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
              Recent Blog Posts
            </h2>
          </div>
          <Link href="/blog/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#60a5fa', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, border: '1px solid rgba(59,130,246,0.3)', padding: '8px 18px', borderRadius: 8, transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            View All Posts <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: rest.length > 0 ? '2fr 1fr' : '1fr', gap: '1.25rem' }} className="hp-blog-grid">

          {/* Featured post */}
          <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="hp-glass-card" style={{ overflow: 'hidden' }}>
            {featured.recimg?.startsWith('http') && (
              <div style={{ position: 'relative', height: 260 }}>
                <Image src={featured.recimg} alt={featured.imgalt ?? featured.rectitle} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)' }} />
              </div>
            )}
            <div style={{ padding: '1.75rem' }}>
              {featured.category && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 100, padding: '3px 10px', fontSize: '0.72rem', color: '#60a5fa', fontWeight: 600, marginBottom: '0.875rem' }}>
                  <Tag size={10} /> {featured.category}
                </div>
              )}
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                <Link href={`/blog/${featured.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#60a5fa'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#e2e8f0'; }}>
                  {featured.rectitle}
                </Link>
              </h2>
              {featured.summary && <p style={{ fontSize: '0.9rem', color: 'var(--hp-text-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{featured.summary.slice(0, 160)}…</p>}
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: 'var(--hp-text-dim)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={13} />{formatDate(featured.recdate)}</span>
                {featured.read_time && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={13} />{featured.read_time} min read</span>}
              </div>
            </div>
          </motion.article>

          {/* Secondary posts */}
          {rest.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {rest.map((post, i) => (
                <motion.article key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 1) * 0.1 }}
                  className="hp-glass-card"
                  style={{ padding: '1.25rem', flex: 1 }}>
                  {post.category && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(59,130,246,0.12)', borderRadius: 100, padding: '2px 8px', fontSize: '0.68rem', color: '#60a5fa', fontWeight: 600, marginBottom: '0.6rem' }}>
                      <Tag size={9} /> {post.category}
                    </div>
                  )}
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    <Link href={`/blog/${post.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#60a5fa'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#e2e8f0'; }}>
                      {post.rectitle}
                    </Link>
                  </h3>
                  <div style={{ display: 'flex', gap: '0.875rem', fontSize: '0.75rem', color: 'var(--hp-text-dim)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} />{formatDate(post.recdate)}</span>
                    {post.read_time && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} />{post.read_time} min</span>}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hp-blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
