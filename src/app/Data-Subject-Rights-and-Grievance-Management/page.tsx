import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import { buildPageMeta, buildBreadcrumbSchema, buildSoftwareAppSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMeta({
  title: 'Grievance Redressal Software for GDPR',
  description: 'Streamline GDPR compliance with our grievance redressal software that manages data subject access requests (DSARs) and complaints efficiently.',
  keywords: 'GDPR grievance redressal, DSAR management software, GDPR rights requests, GDPR compliance EU',
  canonicalPath: '/Data-Subject-Rights-and-Grievance-Management/',
});

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Compliance Tools', href: '#' },
  { label: 'Data Subject Rights & Grievance Management' },
];

export default function DataSubjectRightsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
  const softwareSchema = buildSoftwareAppSchema({
    name: 'Data Subject Rights and Grievance Management',
    description: 'GDPR DSAR management and grievance redressal software for handling data subject rights requests under Articles 15-22.',
    url: '/Data-Subject-Rights-and-Grievance-Management/',
    features: [
      'DSAR intake and tracking',
      'Automated identity verification workflows',
      'Response deadline monitoring',
      'Grievance escalation management',
      'Rights request audit trail',
    ],
  });

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, softwareSchema]} />
      <PageHero
        title="Data Subject Rights & Grievance Management"
        subtitle="Manage DSARs and grievances within GDPR timelines with automated workflows and full audit trails."
        breadcrumbs={breadcrumbs}
      />
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <h2 className="h3 mb-3">Upholding Data Subject Rights Under GDPR</h2>
              <p>
                GDPR Articles 15–22 grant individuals extensive rights over their personal data —
                access, rectification, erasure, restriction, portability, and objection. Organisations
                must respond to these requests within strict deadlines, typically one month.
              </p>
              <p>
                Our Data Subject Rights and Grievance Management platform automates the intake,
                verification, routing, and response process so you never miss a deadline and every
                response is fully documented.
              </p>

              <h2 className="h3 mt-4 mb-3">Supported Rights and Features</h2>
              <ul className="list-group list-group-flush mb-4">
                {[
                  'Right of Access (Article 15) — automated data retrieval workflows',
                  'Right to Erasure (Article 17) — deletion request processing',
                  'Right to Portability (Article 20) — structured data export',
                  'Right to Rectification (Article 16) — correction request tracking',
                  'Right to Restriction (Article 18) — processing limitation management',
                  'Automated identity verification before data disclosure',
                  'Escalation to DPO and supervisory authority where required',
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
                <h3 className="h5 mb-3">Handle DSARs Efficiently</h3>
                <p className="text-muted small">
                  Automate your data subject rights process and never miss a GDPR response deadline.
                </p>
                <a href="/contact-us/" className="btn btn-primary w-100">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
