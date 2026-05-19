import { redirect, notFound } from 'next/navigation';
import { getBlogById } from '@/lib/blog';

interface Props {
  params: Promise<{ id: string }>;
}

// Permanently redirect /blog/id-123 → /blog/[slug]
export default async function BlogByIdPage({ params }: Props) {
  const { id } = await params;
  const numId = Number(id);

  if (isNaN(numId)) notFound();

  let post = null;
  try {
    post = await getBlogById(numId);
  } catch {
    notFound();
  }

  if (!post) notFound();

  // If slug exists, redirect permanently
  if (post.slug) {
    redirect(`/blog/${post.slug}`);
  }

  // No slug yet (pre-migration) — redirect to blog listing
  redirect('/blog');
}
