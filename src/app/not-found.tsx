import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { absolute: '404 — Page Not Found | GDPR Consultants' },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="py-5 text-center" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="h3 mb-3">Page Not Found</h2>
            <p className="text-muted mb-4">
              The page you are looking for does not exist or has been moved.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link href="/" className="btn btn-primary">Back to Home</Link>
              <Link href="/blog/" className="btn btn-outline-secondary">Read Our Blog</Link>
              <Link href="/contact-us/" className="btn btn-outline-primary">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
