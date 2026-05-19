import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import { buildPageMeta, buildBreadcrumbSchema, buildSoftwareAppSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'Cookie Consent Management Software for GDPR Compliance',
  description: 'Our GDPR cookie consent management software ensures EU compliance by simplifying consent banners, storage, and user privacy preferences.',
  keywords: 'GDPR cookie consent, GDPR cookie banner software, GDPR cookie compliance tools, EU privacy consent',
  canonicalPath: '/Cookie-Consent-Management/',
});

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Compliance Tools', href: '#' },
  { label: 'Cookie Consent Management' },
];

export default function CookieConsentManagementPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const softwareSchema = buildSoftwareAppSchema({
    name: 'Cookie Consent Management Software',
    description: 'GDPR cookie consent management software for EU compliance — consent banners, storage, and privacy preference management.',
    url: '/Cookie-Consent-Management/',
    features: [
      'GDPR-compliant cookie banner',
      'Granular cookie category control',
      'Consent storage and audit log',
      'Automatic cookie scanning',
      'Preference centre for users',
    ],
  });

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, softwareSchema]} />
      <PageHero
        title="Cookie Consent Management"
        subtitle="Deploy GDPR-compliant cookie banners and preference centres that actually protect user privacy."
        breadcrumbs={breadcrumbs}
      />
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <h2 className="h3 mb-3">GDPR Cookie Compliance Made Simple</h2>
              <p>
                Cookie consent is one of the most visible GDPR compliance requirements. Our Cookie Consent
                Management solution ensures that your website collects, records, and respects user cookie
                preferences in full compliance with GDPR and the ePrivacy Directive.
              </p>
              <p>
                We automate cookie scanning, categorisation, and banner generation so your organisation
                always presents accurate, up-to-date consent choices to your website visitors.
              </p>

              <h2 className="h3 mt-4 mb-3">Platform Features</h2>
              <ul className="list-group list-group-flush mb-4">
                {[
                  'Automatic cookie scanning and categorisation',
                  'Customisable consent banner with brand styling',
                  'Granular opt-in/opt-out by cookie category',
                  'Persistent consent records with timestamps',
                  'Automatic blocking of non-consented scripts',
                  'Support for IAB TCF 2.2 standard',
                  'Multi-domain and multi-language support',
                ].map((f) => (
                  <li key={f} className="list-group-item d-flex align-items-start gap-2">
                    <i className="bi bi-check-circle-fill text-success mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 bg-light p-4">
                <h3 className="h5 mb-3">Ready to Get Started?</h3>
                <p className="text-muted small">
                  Implement a fully compliant cookie consent solution for your EU-facing website today.
                </p>
                <a href="/contact-us/" className="btn btn-primary w-100">
                  Request a Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
