import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import { buildPageMeta, buildBreadcrumbSchema, getCanonicalUrl } from '@/lib/seo';
import { getCachedBlogs } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

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
    description: 'Explore articles on DPDP Act updates, privacy enforcement, best practices and guides to strengthen compliance.',
    keywords: 'data privacy blogs, compliance insights, DPDP Act updates, data protection tips, privacy compliance trends, expert data regulations advice, best practices for data protection',
    canonicalPath: pageNum > 1 ? `/blog/?page=${pageNum}` : '/blog/',
  });
  return {
    ...base,
    alternates: {
      canonical: pageNum > 1 ? getCanonicalUrl(`/blog/?page=${pageNum}`) : getCanonicalUrl('/blog/'),
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
      <main>
        {/* Hero Banner */}
        <section className="page-hero">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <span className="subtitle">Latest Insights</span>
                <h1>Blog &amp; Resources</h1>
                <p className="lead">
                  DPDP Act updates, GDPR compliance insights, and data protection best practices from our experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {dbError && process.env.NODE_ENV === 'development' && (
              <div className="alert alert-warning small mb-4">
                <i className="bi bi-exclamation-triangle me-2" />
                <strong>Dev:</strong> Database not connected. Set <code>MONGODB_URI</code> in <code>.env.local</code>.
              </div>
            )}

            {/* Posts Grid */}
            {posts.length > 0 ? (
              <>
                <div className="row g-4">
                  {posts.map((post) => (
                    <div className="col-md-6 col-lg-4" key={post.id}>
                      <article className="card h-100">
                        {post.recimg?.startsWith('http') && (
                          <div style={{ position: 'relative', height: '200px' }}>
                            <Image
                              src={post.recimg}
                              alt={post.imgalt ?? post.rectitle}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="card-img-top"
                            />
                          </div>
                        )}
                        {!post.recimg?.startsWith('http') && (
                          <div
                            style={{
                              height: '8px',
                              background: 'linear-gradient(90deg, #1e3a5f, #00a8cc)',
                            }}
                          />
                        )}
                        <div className="card-body d-flex flex-column p-4">
                          {post.category && (
                            <span
                              className="badge mb-3"
                              style={{
                                background: 'rgba(30,58,95,0.08)',
                                color: '#1e3a5f',
                                width: 'fit-content',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                letterSpacing: '0.5px',
                                textTransform: 'uppercase',
                                padding: '0.4em 0.8em',
                                borderRadius: '4px',
                              }}
                            >
                              {post.category}
                            </span>
                          )}
                          <h2 className="h5 card-title mb-2" style={{ lineHeight: 1.4 }}>
                            <Link
                              href={`/blog/${post.slug}/`}
                              className="stretched-link text-decoration-none"
                              style={{ color: '#1e3a5f' }}
                            >
                              {post.rectitle}
                            </Link>
                          </h2>
                          {post.summary && (
                            <p className="card-text small text-muted flex-grow-1" style={{ lineHeight: 1.65 }}>
                              {post.summary.length > 130 ? post.summary.slice(0, 130) + '…' : post.summary}
                            </p>
                          )}
                          <div
                            className="mt-auto pt-3 d-flex justify-content-between align-items-center small text-muted"
                            style={{ borderTop: '1px solid #e2e8f0' }}
                          >
                            <span>
                              <i className="bi bi-calendar3 me-1" />
                              {formatDate(post.recdate)}
                            </span>
                            {post.read_time && (
                              <span>
                                <i className="bi bi-clock me-1" />
                                {post.read_time} min
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="d-flex justify-content-center mt-5" aria-label="Blog pagination">
                    <ul className="pagination">
                      {pageNum > 1 && (
                        <li className="page-item">
                          <Link className="page-link" href={`/blog/?page=${pageNum - 1}`}>
                            <i className="bi bi-chevron-left" />
                          </Link>
                        </li>
                      )}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <li key={p} className={`page-item${p === pageNum ? ' active' : ''}`}>
                          <Link className="page-link" href={p === 1 ? '/blog/' : `/blog/?page=${p}`}>
                            {p}
                          </Link>
                        </li>
                      ))}
                      {pageNum < totalPages && (
                        <li className="page-item">
                          <Link className="page-link" href={`/blog/?page=${pageNum + 1}`}>
                            <i className="bi bi-chevron-right" />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </nav>
                )}
              </>
            ) : !dbError ? (
              /* Premium empty state */
              <div className="empty-state">
                <div className="empty-state-icon">
                  <i className="bi bi-newspaper" />
                </div>
                <h3>No Posts Yet</h3>
                <p>
                  We&apos;re working on insightful content about data protection, DPDP Act compliance, and privacy best practices. Check back soon.
                </p>
                <Link href="/" className="btn btn-primary">
                  <i className="bi bi-house me-2" />
                  Back to Home
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
