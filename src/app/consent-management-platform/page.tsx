import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import { buildPageMeta, buildBreadcrumbSchema, buildSoftwareAppSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'Consent Management Software for GDPR',
  description: 'Simplify GDPR compliance with our GDPR consent management software designed to manage, track, and safeguard user consents across the EU.',
  keywords: 'GDPR consent management, GDPR user consent software, GDPR compliance tools EU, consent tracking software',
  canonicalPath: '/consent-management-platform/',
});

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Compliance Tools', href: '#' },
  { label: 'Consent Management Platform' },
];

export default function ConsentManagementPlatformPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const softwareSchema = buildSoftwareAppSchema({
    name: 'Consent Management Platform',
    description: 'GDPR consent management software to manage, track, and safeguard user consents across the EU.',
    url: '/consent-management-platform/',
    features: [
      'Consent collection and storage',
      'Consent withdrawal management',
      'Audit trail and reporting',
      'Multi-language consent forms',
      'Third-party integration support',
    ],
  });

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, softwareSchema]} />
      <PageHero
        title="Consent Management Platform"
        subtitle="GDPR-compliant consent collection, storage, and lifecycle management for EU data controllers."
        breadcrumbs={breadcrumbs}
      />
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <h2 className="h3 mb-3">What is a Consent Management Platform?</h2>
              <p>
                Under the General Data Protection Regulation (GDPR), consent management is a critical requirement
                for protecting the fundamental rights of EU citizens. Our Consent Management Platform (CMP) empowers
                data controllers and processors to collect, store, and process personal data lawfully, ensuring that
                consent is always freely given, specific, informed, and unambiguous.
              </p>
              <p>
                Individuals retain full control over their personal data through the ability to grant, withdraw,
                or modify consent at any time. Our platform provides a complete audit trail so you can demonstrate
                compliance to regulators at any moment.
              </p>

              <h2 className="h3 mt-4 mb-3">Key Features</h2>
              <ul className="list-group list-group-flush mb-4">
                {[
                  'Granular consent collection with version history',
                  'Real-time consent withdrawal and modification',
                  'Automated proof-of-consent records for audits',
                  'Multi-channel consent capture (web, mobile, API)',
                  'Pre-built consent templates aligned with GDPR Article 7',
                  'Integration with existing CRM and marketing platforms',
                ].map((f) => (
                  <li key={f} className="list-group-item d-flex align-items-start gap-2">
                    <i className="bi bi-check-circle-fill text-success mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <h2 className="h3 mt-4 mb-3">GDPR Compliance Coverage</h2>
              <p>
                Our platform covers GDPR Articles 6, 7, 8, and 9 requirements for lawful bases including
                explicit consent. It supports consent for sensitive data categories and handles parental
                consent for minors in full alignment with EU data protection law.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 bg-light p-4">
                <h3 className="h5 mb-3">Ready to Get Started?</h3>
                <p className="text-muted small">
                  Deploy a fully GDPR-compliant consent management system tailored to your organisation.
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
