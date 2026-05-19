import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You | GDPR Consultants',
  description: 'Thank you for contacting GDPR Consultants. We will be in touch shortly.',
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <section className="py-5 text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }} />
            <h1 className="h2 mt-4 mb-3">Thank You!</h1>
            <p className="text-muted mb-4">
              Your message has been received. One of our GDPR consultants will be in touch with you shortly.
            </p>
            <Link href="/" className="btn btn-primary me-2">Back to Home</Link>
            <Link href="/blog" className="btn btn-outline-secondary">Read Our Blog</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
