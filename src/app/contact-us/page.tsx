import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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

const expertise = [
  { icon: 'bi-shield-check',    text: 'GDPR Compliance Programmes' },
  { icon: 'bi-people',          text: 'Data Protection Officer Services' },
  { icon: 'bi-clipboard-data',  text: 'Data Protection Impact Assessments' },
  { icon: 'bi-gear',            text: 'Compliance Software & Tools' },
  { icon: 'bi-file-text',       text: 'Policy and DPA Drafting' },
  { icon: 'bi-mortarboard',     text: 'GDPR Training Programmes' },
];

export default function ContactUsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const orgSchema = buildOrgSchema();

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, orgSchema]} />
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <span className="subtitle">Get in Touch</span>
                <h1>Contact GDPR Consultants EU</h1>
                <p className="lead">
                  Reach our team of GDPR experts for compliance tools, advisory services, and tailored data protection solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section">
          <div className="container">
            <div className="row g-5 align-items-start">
              {/* Form */}
              <div className="col-lg-7">
                <div className="card p-4 p-md-5" style={{ boxShadow: 'none', border: '1.5px solid #e2e8f0' }}>
                  <h2 className="h3 mb-1" style={{ color: '#1e3a5f' }}>Send us a Message</h2>
                  <p className="text-muted small mb-4">We typically respond within one business day.</p>

                  <form action="/api/contact" method="POST">
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label htmlFor="name" className="form-label">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="email" className="form-label">
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="you@company.com"
                          required
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="+44 000 000 0000"
                        />
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="subject" className="form-label">
                          Subject <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          placeholder="How can we help?"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">
                          Message <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          rows={5}
                          placeholder="Tell us about your data protection needs…"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100"
                        >
                          <i className="bi bi-send me-2" />
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-5">
                <div className="ps-lg-2">
                  <span className="subtitle">Our Expertise</span>
                  <h2 className="h3 mb-3">How We Can Help</h2>
                  <p className="text-muted mb-4">
                    Our team of GDPR specialists provides techno-legal expertise across all areas of EU data protection compliance.
                  </p>

                  <ul className="contact-feature-list">
                    {expertise.map(({ icon, text }) => (
                      <li key={text}>
                        <i className={`bi ${icon}`} />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-5 p-4 rounded-3"
                    style={{ background: 'rgba(30,58,95,0.04)', border: '1px solid rgba(30,58,95,0.08)' }}
                  >
                    <div className="d-flex gap-3 align-items-start mb-3">
                      <i className="bi bi-envelope-fill fs-5" style={{ color: '#00a8cc', marginTop: 2 }} />
                      <div>
                        <div className="fw-semibold small" style={{ color: '#1e3a5f' }}>Email</div>
                        <a href="mailto:info@gdprconsultants.in" className="small text-muted">info@gdprconsultants.in</a>
                      </div>
                    </div>
                    <div className="d-flex gap-3 align-items-start">
                      <i className="bi bi-clock-fill fs-5" style={{ color: '#00a8cc', marginTop: 2 }} />
                      <div>
                        <div className="fw-semibold small" style={{ color: '#1e3a5f' }}>Response Time</div>
                        <span className="small text-muted">Within 1 business day</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
