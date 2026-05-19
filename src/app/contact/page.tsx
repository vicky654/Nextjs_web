import { redirect } from 'next/navigation';

// Permanently redirect /contact → /contact-us/ for SEO canonical consolidation
export default function ContactPage() {
  redirect('/contact-us/');
}
