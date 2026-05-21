import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import HomeFooter from '@/components/home/HomeFooter';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import { buildPageMeta, buildBreadcrumbSchema, getCanonicalUrl } from '@/lib/seo';
import { getCachedBlogs } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page } = await searchParams;
  const pageNum = Number(page ?? 1);
  const base = buildPageMeta({
    title: 'Blogs updates on DPDP Act compliance',
    description:
      'Explore articles on DPDP Act updates, privacy enforcement, best practices and guides to strengthen compliance.',
    keywords:
      'data privacy blogs, compliance insights, DPDP Act updates, data protection tips, privacy compliance trends, expert data regulations advice, best practices for data protection',
    canonicalPath: pageNum > 1 ? `/blog/?page=${pageNum}` : '/blog/',
  });
  return {
    ...base,
    alternates: {
      canonical:
        pageNum > 1
          ? getCanonicalUrl(`/blog/?page=${pageNum}`)
          : getCanonicalUrl('/blog/'),
    },
  };
}

const POSTS_PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, Number(page ?? 1));

  let posts: Awaited<ReturnType<typeof getCachedBlogs>>['posts'] = [];
  let total = 0;
  let dbError = false;

  try {
    const result = await getCachedBlogs(pageNum, POSTS_PER_PAGE);
    posts = result.posts;
    total = result.total;
  } catch (err) {
    dbError = true;
    console.error('[Blog] DB fetch failed:', err instanceof Error ? err.message : err);
  }

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Blog' }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <Header />
      <main style={{ background: 'var(--hp-dark)', minHeight: '100vh' }}>
        {/* Hero */}
        <section
          style={{
            background: 'linear-gradient(160deg, #060d18 0%, #0d1f3c 50%, #060d18 100%)',
            padding: '7rem 1.5rem 5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 700,
              height: 500,
              background: 'radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.25)',
                borderRadius: 100,
                padding: '0.35rem 1rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#60a5fa',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '1.5rem',
              }}
            >
              Latest Insights
            </div>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              Blog &amp;{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Resources
              </span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
              DPDP Act updates, GDPR compliance insights, and data protection best practices from our experts.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section style={{ padding: '4rem 1.5rem 6rem' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            {dbError && process.env.NODE_ENV === 'development' && (
              <div
                style={{
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  borderRadius: 10,
                  padding: '1rem 1.25rem',
                  color: '#fbbf24',
                  fontSize: '0.875rem',
                  marginBottom: '2rem',
                }}
              >
                <strong>Dev:</strong> Database not connected. Set <code>MONGODB_URI</code> in <code>.env.local</code>.
              </div>
            )}

            {posts.length > 0 ? (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: 16,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'border-color 0.2s, transform 0.2s',
                      }}
                    >
                      {/* Image or gradient bar */}
                      {post.recimg?.startsWith('http') ? (
                        <div style={{ position: 'relative', height: 200, flexShrink: 0 }}>
                          <Image
                            src={post.recimg}
                            alt={post.imgalt ?? post.rectitle}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            height: 4,
                            background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                            flexShrink: 0,
                          }}
                        />
                      )}

                      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {/* Category badge */}
                        {post.category && (
                          <span
                            style={{
                              display: 'inline-block',
                              background: 'rgba(59,130,246,0.1)',
                              border: '1px solid rgba(59,130,246,0.2)',
                              color: '#60a5fa',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              padding: '0.3em 0.75em',
                              borderRadius: 100,
                              marginBottom: '0.875rem',
                              width: 'fit-content',
                            }}
                          >
                            {post.category}
                          </span>
                        )}

                        <h2
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: '#f1f5f9',
                            lineHeight: 1.45,
                            marginBottom: '0.75rem',
                          }}
                        >
                          <Link
                            href={`/blog/${post.slug}/`}
                            style={{ color: 'inherit', textDecoration: 'none' }}
                          >
                            {post.rectitle}
                          </Link>
                        </h2>

                        {post.summary && (
                          <p
                            style={{
                              fontSize: '0.875rem',
                              color: '#64748b',
                              lineHeight: 1.65,
                              flex: 1,
                              marginBottom: '1.25rem',
                            }}
                          >
                            {post.summary.length > 130
                              ? post.summary.slice(0, 130) + '…'
                              : post.summary}
                          </p>
                        )}

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '1rem',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            marginTop: 'auto',
                          }}
                        >
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#475569', fontSize: '0.78rem' }}>
                              <Calendar size={12} />
                              {formatDate(post.recdate)}
                            </span>
                            {post.read_time && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#475569', fontSize: '0.78rem' }}>
                                <Clock size={12} />
                                {post.read_time} min
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/blog/${post.slug}/`}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                              color: '#3b82f6',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              textDecoration: 'none',
                            }}
                          >
                            Read <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav
                    style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: '3rem' }}
                    aria-label="Blog pagination"
                  >
                    {pageNum > 1 && (
                      <Link
                        href={`/blog/?page=${pageNum - 1}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#94a3b8',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                        }}
                      >
                        ‹
                      </Link>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={p === 1 ? '/blog/' : `/blog/?page=${p}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background:
                            p === pageNum
                              ? 'rgba(59,130,246,0.15)'
                              : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${p === pageNum ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.1)'}`,
                          color: p === pageNum ? '#60a5fa' : '#94a3b8',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          fontWeight: p === pageNum ? 700 : 400,
                        }}
                      >
                        {p}
                      </Link>
                    ))}
                    {pageNum < totalPages && (
                      <Link
                        href={`/blog/?page=${pageNum + 1}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#94a3b8',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                        }}
                      >
                        ›
                      </Link>
                    )}
                  </nav>
                )}
              </>
            ) : !dbError ? (
              /* Empty state */
              <div
                style={{
                  textAlign: 'center',
                  padding: '5rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.25rem',
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <BookOpen size={32} style={{ color: '#3b82f6' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>No Posts Yet</h3>
                <p style={{ color: '#64748b', maxWidth: 420, lineHeight: 1.65 }}>
                  We&apos;re working on insightful content about data protection, DPDP Act compliance,
                  and privacy best practices. Check back soon.
                </p>
                <Link
                  href="/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: '#fff',
                    padding: '0.75rem 1.75rem',
                    borderRadius: 100,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                  }}
                >
                  Back to Home
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <HomeFooter />
    </>
  );
}
