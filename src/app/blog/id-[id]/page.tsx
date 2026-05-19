import { permanentRedirect, notFound } from 'next/navigation';
import { getBlogBySlug } from '@/lib/blog';

interface Props {
  params: Promise<{ id: string }>;
}

// Legacy /blog/id-[id] route — old PostgreSQL numeric IDs can't be resolved
// Redirect to blog listing; slug-based routes are canonical
export default async function BlogByIdPage({ params }: Props) {
  const { id } = await params;

  // If the id looks like a slug (not numeric), try slug lookup
  if (isNaN(Number(id))) {
    let post = null;
    try { post = await getBlogBySlug(id); } catch { /* ignore */ }
    if (post?.slug) permanentRedirect(`/blog/${post.slug}/`);
  }

  // Numeric IDs are legacy PostgreSQL references — redirect to blog listing
  notFound();
}
