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
  } catch {
    dbError = true;
  }

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Blog' }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <Header />
      <main>
        <section
          className="py-5 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8f 50%, #00a8cc 100%)', paddingTop: '140px' }}
        >
          <div className="container">
            <h1 className="display-4 fw-bold">Blog</h1>
            <p className="lead opacity-75">DPDP Act updates, GDPR insights, and data protection best practices</p>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            {dbError && (
              <div className="alert alert-warning">Blog posts temporarily unavailable. Please try again shortly.</div>
            )}
            <div className="row g-4">
              {posts.map((post) => (
                <div className="col-md-6 col-lg-4" key={post.id}>
                  <article className="card h-100 border-0 shadow-sm">
                    {post.recimg && (
                      <div style={{ position: 'relative', height: '200px' }}>
                        <Image
                          src={post.recimg}
                          alt={post.imgalt ?? post.rectitle}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="card-img-top rounded-top"
                        />
                      </div>
                    )}
                    <div className="card-body d-flex flex-column">
                      {post.category && (
                        <span className="badge bg-primary mb-2" style={{ width: 'fit-content' }}>{post.category}</span>
                      )}
                      <h2 className="h5 card-title">
                        <Link href={`/blog/${post.slug}`} className="text-decoration-none text-dark stretched-link">
                          {post.rectitle}
                        </Link>
                      </h2>
                      {post.summary && (
                        <p className="card-text text-muted small flex-grow-1">
                          {post.summary.length > 120 ? post.summary.slice(0, 120) + '…' : post.summary}
                        </p>
                      )}
                      <div className="mt-auto pt-2 d-flex justify-content-between align-items-center small text-muted border-top">
                        <span><i className="bi bi-calendar3 me-1" />{formatDate(post.recpub ?? post.recdate)}</span>
                        {post.read_time && <span><i className="bi bi-clock me-1" />{post.read_time} min</span>}
                      </div>
                    </div>
                  </article>
                </div>
              ))}

              {posts.length === 0 && !dbError && (
                <div className="col-12 text-center text-muted py-5">No posts found.</div>
              )}
            </div>

            {totalPages > 1 && (
              <nav className="d-flex justify-content-center mt-5" aria-label="Blog pagination">
                <ul className="pagination">
                  {pageNum > 1 && (
                    <li className="page-item">
                      <Link className="page-link" href={`/blog/?page=${pageNum - 1}`}>Previous</Link>
                    </li>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <li key={p} className={`page-item${p === pageNum ? ' active' : ''}`}>
                      <Link className="page-link" href={p === 1 ? '/blog/' : `/blog/?page=${p}`}>{p}</Link>
                    </li>
                  ))}
                  {pageNum < totalPages && (
                    <li className="page-item">
                      <Link className="page-link" href={`/blog/?page=${pageNum + 1}`}>Next</Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
