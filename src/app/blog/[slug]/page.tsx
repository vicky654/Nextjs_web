import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import TableOfContents from '@/components/blog/TableOfContents';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ShareButtons from '@/components/blog/ShareButtons';
import {
  buildBlogMeta,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  getCanonicalUrl,
} from '@/lib/seo';
import {
  getBlogBySlug,
  getCachedBlogSlugs,
  getRelatedBlogs,
  getPrevNextBlog,
  prepareContentHtml,
  extractHeadingsFromHtml,
} from '@/lib/blog';
import { sanitizeBlogHtml } from '@/lib/sanitize';
import { formatDate } from '@/lib/utils';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getCachedBlogSlugs();
    return slugs.map((s) => ({ slug: s.slug ?? String(s.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug).catch(() => null);
  if (!post) return { title: 'Post Not Found' };
  return buildBlogMeta(post);
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug).catch(() => null);
  if (!post) notFound();

  const rawHtml = prepareContentHtml(post.recdesc ?? '');
  const safeHtml = sanitizeBlogHtml(rawHtml);
  const headings = extractHeadingsFromHtml(rawHtml);

  const [{ prev, next }, related] = await Promise.all([
    getPrevNextBlog(post.id).catch(() => ({ prev: null, next: null })),
    getRelatedBlogs(post.slug ?? '', post.category ?? 'GDPR', 3).catch(() => []),
  ]);

  const canonical = getCanonicalUrl(`/blog/${post.slug}`);
  const ogImage = post.recimg ? getCanonicalUrl(post.recimg) : undefined;

  const schemas = [
    buildBreadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.rectitle }]),
    buildArticleSchema(post, canonical),
    ...(post.faq_schema?.length ? [buildFAQSchema(post.faq_schema)] : []),
  ];

  return (
    <>
      <ReadingProgress />
      <SchemaMarkup schema={schemas} />
      <Header />
      <main>
        <section
          className="py-5 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8f 50%, #00a8cc 100%)', paddingTop: '140px' }}
        >
          <div className="container">
            {post.category && (
              <span className="badge bg-info text-dark mb-3">{post.category}</span>
            )}
            <h1 className="display-5 fw-bold mb-3">{post.rectitle}</h1>
            <div className="d-flex justify-content-center gap-4 flex-wrap opacity-75 small">
              <span><i className="bi bi-person me-1" />{post.author ?? 'GDPR Consultants'}</span>
              <span><i className="bi bi-calendar3 me-1" />{formatDate(post.recpub ?? post.recdate)}</span>
              {post.read_time && <span><i className="bi bi-clock me-1" />{post.read_time} min read</span>}
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-8">
                {ogImage && (
                  <div className="mb-4" style={{ position: 'relative', height: '400px' }}>
                    <Image
                      src={ogImage}
                      alt={post.imgalt ?? post.rectitle}
                      fill
                      priority
                      style={{ objectFit: 'cover', borderRadius: '12px' }}
                    />
                  </div>
                )}

                <article
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: safeHtml }}
                  style={{ lineHeight: '1.8', color: '#495057' }}
                />

                {post.tags?.length > 0 && (
                  <div className="mt-4 pt-4 border-top d-flex gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="badge bg-light text-dark border">{tag}</span>
                    ))}
                  </div>
                )}

                <ShareButtons title={post.rectitle} url={canonical} />

                <nav className="d-flex justify-content-between mt-4 pt-4 border-top gap-2">
                  {prev?.slug ? (
                    <Link href={`/blog/${prev.slug}`} className="btn btn-outline-secondary btn-sm">
                      <i className="bi bi-arrow-left me-1" />Prev
                    </Link>
                  ) : <span />}
                  {next?.slug ? (
                    <Link href={`/blog/${next.slug}`} className="btn btn-outline-secondary btn-sm">
                      Next<i className="bi bi-arrow-right ms-1" />
                    </Link>
                  ) : <span />}
                </nav>
              </div>

              <div className="col-lg-4">
                {headings.length > 0 && (
                  <div className="sticky-top" style={{ top: '100px' }}>
                    <div className="card border-0 bg-light p-3 mb-4">
                      <TableOfContents headings={headings} />
                    </div>
                  </div>
                )}

                {related.length > 0 && (
                  <div className="card border-0 bg-light p-3">
                    <h3 className="h6 fw-bold mb-3">Related Articles</h3>
                    <ul className="list-unstyled mb-0">
                      {related.map((r) => (
                        <li key={r.id} className="mb-2">
                          <Link href={`/blog/${r.slug}`} className="text-decoration-none small text-muted">
                            {r.rectitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
