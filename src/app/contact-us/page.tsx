import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import { buildPageMeta, buildBreadcrumbSchema, buildOrgSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'Contact GDPR Consultants EU',
  description: 'Connect with our GDPR consultants in the EU to access GDPR compliance tools, techno-legal expertise, and tailored data protection solutions.',
  keywords: 'GDPR consultants EU, GDPR compliance experts, GDPR advisory, GDPR compliance services',
  canonicalPath: '/contact-us/',
});

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Contact Us' },
];

export default function ContactUsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const orgSchema = buildOrgSchema();

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, orgSchema]} />
      <Header />
      <main>
      <PageHero
        title="Contact GDPR Consultants EU"
        subtitle="Reach our team of GDPR experts for compliance tools, advisory services, and tailored data protection solutions."
        breadcrumbs={breadcrumbs}
      />
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <h2 className="h3 mb-4">Get in Touch</h2>
              <form action="/api/contact" method="POST">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address <span className="text-danger">*</span></label>
                  <input type="email" className="form-control" id="email" name="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" id="phone" name="phone" />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" id="subject" name="subject" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message <span className="text-danger">*</span></label>
                  <textarea className="form-control" id="message" name="message" rows={5} required />
                </div>
                <button type="submit" className="btn btn-primary px-5">
                  Send Message
                </button>
              </form>
            </div>
            <div className="col-lg-6">
              <h2 className="h3 mb-4">Our Expertise</h2>
              <p className="text-muted">
                Our team of GDPR specialists provides techno-legal expertise across all areas of EU data
                protection compliance. Whether you need compliance tools, advisory services, or a full
                GDPR programme, we&apos;re here to help.
              </p>
              <ul className="list-unstyled mt-3">
                {[
                  { icon: 'bi-shield-check', text: 'GDPR Compliance Programmes' },
                  { icon: 'bi-people', text: 'Data Protection Officer Services' },
                  { icon: 'bi-clipboard-data', text: 'Data Protection Impact Assessments' },
                  { icon: 'bi-gear', text: 'Compliance Software & Tools' },
                  { icon: 'bi-file-text', text: 'Policy and DPA Drafting' },
                  { icon: 'bi-mortarboard', text: 'GDPR Training Programmes' },
                ].map(({ icon, text }) => (
                  <li key={text} className="d-flex align-items-center gap-2 mb-3">
                    <i className={`bi ${icon} text-primary fs-5`} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
